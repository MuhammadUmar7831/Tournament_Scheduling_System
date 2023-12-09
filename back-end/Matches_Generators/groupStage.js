const { generateTeamCombinationsRR } = require('../Matches_Generators/roundRobin');
const { distributeMatches } = require('../Utility/distributeMatches');

function generateGroupTeamCombinationsGG(groups, teams, startDate, endDate, venues, times) {

    let separateMatches = [];
    for (let i = 0; i < groups.length; i++) {
        const teamNames = groups[i].teams.map(team => team.name);
        separateMatches.push(generateTeamCombinationsRR(teamNames, startDate, endDate, venues, times).slice(0, -3));

    }
    let combinations = [];
    let number = 1;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < separateMatches.length; j++) {
            const match = separateMatches[j][i];
            match.number = number++;
            match.date = "";
            match.time = { startTime: "", endTime: "" };
            combinations.push(match);
        }
    }

    let count = (teams.length / 2) / 4;
    let totalMatches = 0;
    while (count > 0) {
        totalMatches += count * 6;
        count = Math.floor(count / 2);
    }

    let vIndex = 0;
    for (let i = 0; i < totalMatches; i++) {
        combinations.push({ number: number++, team1: "TBD", team2: "TBD", winner: '', date: '', venue: venues[vIndex++ % venues.length], time: { startDate: '', endTime: '' } });
    }
    combinations.push({ number: number++, team1: "Finalist 1", team2: "Finalist 2", winner: '', date: '', venue: venues[vIndex++ % venues.length], time: { startDate: '', endTime: '' } });

    distributeMatches(combinations, startDate, endDate, times);

    return combinations;
}

function createNextStageGroups(groups){

    let newGroups = [];
    for (let i = 0 ; i < groups.length; i++){
        console.log(groups[i]);
    }
}

module.exports = { generateGroupTeamCombinationsGG, createNextStageGroups };
