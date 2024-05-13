const { distributeMatches } = require("../Utility/distributeMatches");
const { teamsGenerator } = require('../teams');

function generateGroupTeamCombinationsKnockOut(teams, StartDate, EndDate, venues, times) {
    let matches = [];
    let vIndex = 0;
    let matchNumber = 1;
    for (let i = 0; i < teams.length / 2; i++, vIndex++) {
        matches.push(
            {
                'number': `${matchNumber++}`,
                'team1': `${teams[i]}`,
                'team2': `${teams[teams.length - i - 1]}`,
                'score1': 0,
                'score2': 0,
                'out1': 0,
                'out2': 0,
                'boundries1': 0,
                'boundries2': 0,
                'date': '',
                'venue': venues[vIndex % venues.length],
                'time': { startTime: '', endTime: '' }
            });
    }
    const remainingMatches = teams.length - 1 - matches.length;
    for (let i = 0; i < remainingMatches; i++, vIndex++) {
        matches.push(
            {
                'number': `${matchNumber++}`,
                'team1': `TBD`,
                'team2': `TBD`,
                'score1': 0,
                'score2': 0,
                'out1': 0,
                'out2': 0,
                'boundries1': 0,
                'boundries2': 0,
                'date': '',
                'venue': venues[vIndex % venues.length],
                'time': { startTime: '', endTime: '' }
            });
    }
    matches[matches.length - 1].team1 = 'Finalist 1';
    matches[matches.length - 1].team2 = 'Finalist 2';
    distributeMatches(matches, StartDate, EndDate, times);
    return matches;
}

function knockoutGroupGenerator(teams, currentStage) {
    const groups = [];
    
    let generatedTeams = [];
    for (let i = 0; i < teams.length; i++) {
        generatedTeams.push({ name: teams[i], points: 0, boundries: 0, matchesPlayed: 0, won: 0, lost: 0 });
    }
    
    groups.push({ name: `Stage ${currentStage}`, stage: currentStage, teams: generatedTeams });
    return groups;
}

function decideNextStageMatches(matches, teams, currentStage) {
    let stageFirstMatch = 0;

    for (let i = 1; i <= currentStage - 1; i++) {
        stageFirstMatch += teams.length / Math.pow(2, i);
    }

    let stageLastMatch = 0;
    for (let i = 1; i <= currentStage; i++) {
        stageLastMatch += teams.length / Math.pow(2, i);
    }

    let winnerTeams = [];
    for (let i = stageFirstMatch; i < stageLastMatch; i++) {
        winnerTeams.push(matches[i].winner);
    }

    const group = knockoutGroupGenerator(winnerTeams, currentStage + 1);

    for (let i = 0; i < winnerTeams.length / 2; i++) {
        matches[stageLastMatch + i].team1 = winnerTeams[i]
        matches[stageLastMatch + i].team2 = winnerTeams[winnerTeams.length - 1 - i];
    }
    return group;
}

module.exports = { generateGroupTeamCombinationsKnockOut, decideNextStageMatches };