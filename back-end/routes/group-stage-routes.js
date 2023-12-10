const express = require('express');
const router = express.Router();

const Detail = require('../models/Detail');
const { createNextStageGroups, decideNextStageMatches } = require('../Matches_Generators/groupStage')

router.post('/updateMatchResult', async (req, res) => {

    try {
        const { matchNumber, score1, score2, out1, out2, boundries1, boundries2, pin } = req.body;
        let detailDocument = await Detail.findOne(
            { tournamentPin: pin, 'matches.number': matchNumber },
            { 'matches.$': 1 }
        );

        const team1Prev = await Detail.findOne(
            { tournamentPin: pin, 'teams.name': detailDocument.matches[0].team1 },
            { 'teams.$': 1 }
        )
        const team2Prev = await Detail.findOne(
            { tournamentPin: pin, 'teams.name': detailDocument.matches[0].team2 },
            { 'teams.$': 1 }
        )

        const isNewScore = detailDocument.matches[0].winner === "";

        let winnerScore = Math.max(score1, score2);
        let winnerBoundries = boundries1;
        let loserBoundries = boundries2;
        let winner = detailDocument.matches[0].team1;
        let loser = detailDocument.matches[0].team2;

        if (winnerScore == score2) {

            winner = detailDocument.matches[0].team2;
            loser = detailDocument.matches[0].team1;
            winnerBoundries = boundries2;
            loserBoundries = boundries1;

        }
        if (score1 == score2) {

            winnerScore = Math.max(boundries1, boundries2);
            winnerBoundries = boundries1;
            loserBoundries = boundries2;

            if (winnerScore == boundries2) {
                winner = detailDocument.matches[0].team2;
                loser = detailDocument.matches[0].team1;
                winnerBoundries = boundries2;
                loserBoundries = boundries1;
            }
        }

        await Detail.updateOne(
            { tournamentPin: pin, 'matches.number': matchNumber },
            {
                $set: {
                    'matches.$.winner': winner,
                    'matches.$.score1': score1,
                    'matches.$.score2': score2,
                    'matches.$.out1': out1,
                    'matches.$.out2': out2,
                    'matches.$.boundries1': boundries1,
                    'matches.$.boundries2': boundries2,
                }
            }
        );

        const doc = await Detail.findOne({ tournamentPin: pin });

        // condition to check if the match is not final
        if (doc.matches.length !== matchNumber) {
            // consdition if the match is new match
            if (isNewScore) {
                // increase points of winner team by 2 and add winner boundries amd increase matches played and increase won
                const winnerTeam = await Detail.findOne({ tournamentPin: pin, 'teams.name': winner },
                    { 'teams.$': 1 }
                );
                const points = winnerTeam.teams[0].points;

                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': winner
                    },
                    {
                        $set: {
                            'teams.$.points': points + 2,
                            'teams.$.boundries': winnerTeam.teams[0].boundries + winnerBoundries,
                            'teams.$.matchesPlayed': winnerTeam.teams[0].matchesPlayed + 1,
                            'teams.$.won': winnerTeam.teams[0].won + 1,
                        }
                    }
                );
                // update same thing in groups
                await Detail.updateOne(
                    {
                        tournamentPin: pin,
                        'groups.stage': doc.currentStage,
                        'groups.teams.name': winner
                    },
                    {
                        $set: {
                            'groups.$[group].teams.$[team].points': points + 2,
                            'groups.$[group].teams.$[team].boundries': winnerTeam.teams[0].boundries + winnerBoundries,
                            'groups.$[group].teams.$[team].matchesPlayed': winnerTeam.teams[0].matchesPlayed + 1,
                            'groups.$[group].teams.$[team].won': winnerTeam.teams[0].won + 1,
                        }
                    },
                    {
                        arrayFilters: [
                            { 'team.name': winner },
                            { 'group.stage': doc.currentStage }
                        ]
                    }
                );

                // update loser boundries and lost and matchesPlayed
                const loserTeam = await Detail.findOne({ tournamentPin: pin, 'teams.name': loser },
                    { 'teams.$': 1 }
                );
                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': loser
                    },
                    {
                        $set: {
                            'teams.$.matchesPlayed': loserTeam.teams[0].matchesPlayed + 1,
                            'teams.$.lost': loserTeam.teams[0].lost + 1,
                            'teams.$.boundries': loserTeam.teams[0].boundries + loserBoundries
                        }
                    }
                );
                await Detail.updateOne(
                    {
                        tournamentPin: pin,
                        'groups.stage': doc.currentStage,
                        'groups.teams.name': loser
                    },
                    {
                        $set: {
                            'groups.$[group].teams.$[team].matchesPlayed': loserTeam.teams[0].matchesPlayed + 1,
                            'groups.$[group].teams.$[team].lost': loserTeam.teams[0].lost + 1,
                            'groups.$[group].teams.$[team].boundries': loserTeam.teams[0].boundries + loserBoundries,
                        }
                    },
                    {
                        arrayFilters: [
                            { 'team.name': loser },
                            { 'group.stage': doc.currentStage }
                        ]
                    }
                );
                console.log(loserTeam);
                await Detail.updateOne(
                    { tournamentPin: pin }, { $set: { lastMatch: matchNumber } }
                );
                // update winner team last match
                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': winner
                    },
                    {
                        $set: {
                            'teams.$.lastMatch': matchNumber
                        }
                    }
                );
                // update loser team last match
                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': loser
                    },
                    {
                        $set: {
                            'teams.$.lastMatch': matchNumber
                        }
                    }
                );
            }
            // if winner is different from previous update
            else if (detailDocument.matches[0].winner !== winner) {
                //if the match results was already updates decrease the loser point by 2 and increse winner points by 2
                // decreasing loser points and decreasing won and increasing lost
                const loserTeam = await Detail.findOne({ tournamentPin: pin, 'teams.name': detailDocument.matches[0].winner },
                    { 'teams.$': 1 }
                );
                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': loserTeam.teams[0].name
                    },
                    {
                        $set: {
                            'teams.$.points': loserTeam.teams[0].points - 2,
                            'teams.$.lost': loserTeam.teams[0].lost + 1,
                            'teams.$.won': loserTeam.teams[0].won - 1
                        }
                    }
                );
                // updating same thing for groups
                await Detail.updateOne(
                    {
                        tournamentPin: pin,
                        'groups.stage': doc.currentStage,
                        'groups.teams.name': loserTeam.teams[0].name
                    },
                    {
                        $set: {
                            'groups.$[group].teams.$[team].points': loserTeam.teams[0].points - 2,
                            'groups.$[group].teams.$[team].lost': loserTeam.teams[0].lost + 1,
                            'groups.$[group].teams.$[team].won': loserTeam.teams[0].won - 1,
                        }
                    },
                    {
                        arrayFilters: [
                            { 'team.name': loserTeam.teams[0].name },
                            { 'group.stage': doc.currentStage }
                        ]
                    }
                );

                // increasing winner points and won and decreading lost
                const winnerTeam = await Detail.findOne({ tournamentPin: pin, 'teams.name': winner },
                    { 'teams.$': 1 }
                );
                await Detail.updateOne(
                    {
                        tournamentPin: pin, 'teams.name': winner
                    },
                    {
                        $set: {
                            'teams.$.points': winnerTeam.teams[0].points + 2,
                            'teams.$.lost': winnerTeam.teams[0].lost - 1,
                            'teams.$.won': winnerTeam.teams[0].won + 1,
                        }
                    }
                );
                // updating same thing for groups
                await Detail.updateOne(
                    {
                        tournamentPin: pin,
                        'groups.stage': doc.currentStage,
                        'groups.teams.name': winner
                    },
                    {
                        $set: {
                            'groups.$[group].teams.$[team].points': winnerTeam.teams[0].points + 2,
                            'groups.$[group].teams.$[team].won': winnerTeam.teams[0].won + 1,
                            'groups.$[group].teams.$[team].lost': winnerTeam.teams[0].lost - 1,
                        }
                    },
                    {
                        arrayFilters: [
                            { 'team.name': winner },
                            { 'group.stage': doc.currentStage }
                        ]
                    }
                );

            }
            // increase the team1 boundries by current boundries and decrease the previously enter boundries1
            await Detail.updateOne(
                {
                    tournamentPin: pin, 'teams.name': detailDocument.matches[0].team1
                },
                {
                    $set: {
                        'teams.$.boundries': team1Prev.teams[0].boundries + parseInt(boundries1, 10) - detailDocument.matches[0].boundries1,
                    }
                }
            );
            // updating same thing for groups
            await Detail.updateOne(
                {
                    tournamentPin: pin,
                    'groups.stage': doc.currentStage,
                    'groups.teams.name': detailDocument.matches[0].team1
                },
                {
                    $set: {
                        'groups.$[group].teams.$[team].boundries': team1Prev.teams[0].boundries + parseInt(boundries1, 10) - detailDocument.matches[0].boundries1
                    }
                },
                {
                    arrayFilters: [
                        { 'team.name': detailDocument.matches[0].team1 },
                        { 'group.stage': doc.currentStage }
                    ]
                }
            );


            // increase the team2 boundries by current boundries and decrease the previously enter boundries2
            await Detail.updateOne(
                {
                    tournamentPin: pin, 'teams.name': detailDocument.matches[0].team2
                },
                {
                    $set: {
                        'teams.$.boundries': team2Prev.teams[0].boundries + parseInt(boundries2, 10) - detailDocument.matches[0].boundries2,
                    }
                }
            );
            // updating same thing for groups
            await Detail.updateOne(
                {
                    tournamentPin: pin,
                    'groups.stage': doc.currentStage,
                    'groups.teams.name': detailDocument.matches[0].team2
                },
                {
                    $set: {
                        'groups.$[group].teams.$[team].boundries': team2Prev.teams[0].boundries + parseInt(boundries2, 10) - detailDocument.matches[0].boundries2
                    }
                },
                {
                    arrayFilters: [
                        { 'team.name': detailDocument.matches[0].team2 },
                        { 'group.stage': doc.currentStage }
                    ]
                }
            );
        }

        res.status(201).json(pin);

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });

    }

});

router.post('/gotoNextStage', async (req, res) => {
    try {
        const { tournamentPin, matchNumber } = req.body;

        const doc = await Detail.findOne({ tournamentPin });

        await Detail.updateOne(
            { tournamentPin },
            {
                $set: {
                    'currentStage': doc.currentStage + 1
                }
            }
        )

        const currentStageGroups = doc.groups.filter(group => group.stage === doc.currentStage);

        const copiedGroups = JSON.parse(JSON.stringify(currentStageGroups));

        const newGroups = createNextStageGroups(copiedGroups, doc.currentStage);
        const mergedGroups = [...doc.groups, ...newGroups];

        decideNextStageMatches(newGroups, doc.matches, matchNumber);

        await Detail.updateOne(
            { tournamentPin },
            {
                $set: {
                    'groups': mergedGroups,
                    'matches': doc.matches,
                    'teams.$[].points': 0,
                    'teams.$[].boundries': 0
                }
            }
        );

        res.status(200).send(tournamentPin);
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

router.post('/deActiveNextStage', async (req, res) => {

    try {
        const { pin } = req.body;

        await Detail.updateOne({ tournamentPin: pin }, {
            $set: {
                'nextStage': 0
            }
        });

        res.status(201).json(pin);

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }

});


router.post('/activateFinalStage', async (req, res) => {
    try {
        const { pin } = req.body;

        const doc = await Detail.findOne({ tournamentPin: pin });

        // Find the group with the current stage
        const currentStageGroup = doc.groups.find(group => group.stage === doc.currentStage);

        // Sort teams within the group based on points and match boundaries
        const sortedTeams = currentStageGroup.teams.sort((teamA, teamB) => {
            if (teamA.points !== teamB.points) {
                return teamB.points - teamA.points; // Sort by points in descending order
            } else {
                return teamB.boundries - teamA.boundries; // If points are equal, sort by match boundaries
            }
        });

        // Get the top two teams
        const team1 = sortedTeams[0].name;
        const team2 = sortedTeams[1].name;

        // Update the last match with the selected teams
        const lastMatchIndex = doc.matches.length - 1;
        doc.matches[lastMatchIndex].team1 = team1;
        doc.matches[lastMatchIndex].team2 = team2;

        // Update the document with the rearranged matches, next stage, and current stage
        await Detail.updateOne(
            { tournamentPin: pin },
            {
                $set: {
                    'matches': doc.matches,
                    'nextStage': 1,
                    'currentStage': doc.currentStage + 1
                }
            }
        );

        res.status(201).json(pin);
    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }
});


module.exports = router;