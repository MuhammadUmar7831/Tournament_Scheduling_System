const express = require('express');
const router = express.Router();

const Schedule = require('../models/Schedule');
const Detail = require('../models/Detail');

const { generateTeamCombinations } = require('../Matches_Generators/roundRobin');
const { teamsGenerator } = require('../teams');
const { generatePin } = require('../Utility/pinGenratot');
const { formatDate } = require('../Utility/dateFormat');

// Route to insert a new document into the schedules collection
router.post('/addSchedule', async (req, res) => {
    try {
        const { name, sport, teamNumber, startDate, endDate, venues, teams, format } = req.body;

        let pin = generatePin();
        let found = await Schedule.findOne({ pin: pin });
        while (found) {
            pin = generatePin();
            found = await Schedule.findOne({ pin: pin })
        }

        let StartDate = await formatDate(startDate);
        let EndDate = await formatDate(endDate);

        // Create a new Schedule instance
        const newSchedule = new Schedule({
            name,
            sport,
            teamNumber,
            startDate: StartDate,
            endDate: EndDate,
            venues,
            teams,
            format,
            pin
        });

        const generatedMatches = await generateTeamCombinations(teams, StartDate, EndDate, venues);
        const generatedTeams = await teamsGenerator(teams);
        const generatedGroups = [];

        const newDetail = new Detail({
            tournamentPin: pin,
            lastMatch: 0,
            teams: generatedTeams,
            groups: generatedGroups,
            matches: generatedMatches
        });

        // Save the new schedule to the database
        const savedSchedule = await newSchedule.save();
        const savedDetail = await newDetail.save();

        res.status(201).json(pin);  // 

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }
});

// edit route availbe only before tournament start
router.post('/editSchedule', async (req, res) => {
    try {
        const { name, teamNumber, startDate, endDate, venues, teams, format, pin } = req.body;

        let scheduleDocument = await Schedule.findOne({ pin: pin });
        let detailDocument = await Schedule.findOne({ pin: pin });

        let detailChange = false;

        let StartDate = await formatDate(startDate);
        let EndDate = await formatDate(endDate);

        if (scheduleDocument.name != name) {
            await Schedule.updateOne({ pin }, { $set: { name } });
        }
        if (scheduleDocument.teamNumber != teamNumber) {
            await Schedule.updateOne({ pin }, { $set: { teamNumber } });
            detailChange = true;
        }
        if (scheduleDocument.teams != teams) {
            await Schedule.updateOne({ pin }, { $set: { teams } });
            detailChange = true;
        }
        if (scheduleDocument.startDate != StartDate) {
            await Schedule.updateOne({ pin }, { $set: { startDate: StartDate } });
            detailChange = true;
        }
        if (scheduleDocument.endDate != EndDate) {
            await Schedule.updateOne({ pin }, { $set: { endDate: EndDate } });
            detailChange = true;
        }
        if (scheduleDocument.venues != venues) {
            await Schedule.updateOne({ pin }, { $set: { venues } });
            detailChange = true;
        }

        if (detailChange) {
            const generatedMatches = await generateTeamCombinations(teams, StartDate, EndDate, venues);
            const generatedTeams = await teamsGenerator(teams);
            const generatedGroups = [];

            await Detail.updateOne({ tournamentPin: pin }, {
                $set: {
                    teams: generatedTeams,
                    groups: generatedGroups,
                    matches: generatedMatches
                }
            });
        }

        res.status(201).json(pin);  // 
    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }
});

router.post('/updateMatchResult', async (req, res) => {

    try {
        const { matchNumber, score1, score2, out1, out2, boundries1, boundries2, pin } = req.body;

        let detailDocument = await Detail.findOne(
            { tournamentPin: pin, 'matches.number': matchNumber },
            { 'matches.$': 1 }
        );
        const isNewScore = detailDocument.matches[0].winner === "";

        let winnerScore = Math.max(score1, score2);
        let winner = detailDocument.matches[0].team1;

        if (winnerScore == score2) {
            winner = detailDocument.matches[0].team2;
        }
        if (score1 == score2) {
            winnerScore = Math.max(boundries1, boundries2);
            if (winnerScore == boundries2) {
                winner = detailDocument.matches[0].team2;
            }
        }

        const doc = await Detail.updateOne(
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
        await Detail.updateOne(
            { tournamentPin: pin }, { $set: { lastMatch: matchNumber } }
        );

        console.log(isNewScore);
        if (isNewScore) {
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
                        'teams.$.points': points + 2
                    }
                }
            );
        }

        res.status(201).json(pin);  // 

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });

    }

});

router.post('/updateMatchVenue', async (req, res) => {

    try {
        const { matchNumber, venue, pin } = req.body;

        const doc = await Detail.updateOne(
            { tournamentPin: pin, 'matches.number': matchNumber },
            {
                $set: {
                    'matches.$.venue': venue,
                }
            }
        );

        res.status(201).json(doc);  // 

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }

});

function parseDate(dateString) {
    // Parse date string in the format "DD-MM-YYYY"
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
}

router.post('/updateMatchDate', async (req, res) => {

    try {
        const { matchNumber, date, pin } = req.body;

        const formattedDate = await formatDate(date);


        const doc = await Detail.findOne({ tournamentPin: pin, 'matches.number': matchNumber }, { matches: 1, _id: 0 });

        const matches = doc.matches;
        const newDate = parseDate(formattedDate);
        let matchTobeChanged;
        let flag = true;

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            if (match.number == matchNumber) {
                matchTobeChanged = matches.splice(i, 1);
            }
        }


        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            match.number = i + 1;
            const currentDate = parseDate(match.date);
            if (flag && newDate <= currentDate) {
                matches.splice(i, 0, matchTobeChanged[0]);
                matchTobeChanged[0].number = i + 1;
                matchTobeChanged[0].date = formatDate(newDate);
                flag = false;
            }

        }

        await Detail.updateOne(
            { tournamentPin: pin, 'matches.number': matchNumber },
            {
                $set: {
                    'matches': matches,
                }
            }
        );

        res.status(201).json(pin);  // 

    } catch (error) {
        res.status(500).send({ "error": "Internal Server error" });
    }

});



module.exports = router;