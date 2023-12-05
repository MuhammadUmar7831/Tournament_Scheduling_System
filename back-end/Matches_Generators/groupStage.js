const { generateTeamCombinationsRR } = require('../Matches_Generators/roundRobin');
const { distributeMatches } = require('../Utility/distributeMatches');


function generateGroupTeamCombinations(groups, teams, startDate, endDate, venues) {
    const g = groups.length / 4;
    const combinations = [];

    for (let i = 0; i < g; i++) {
        const currentGroup = groups.slice(i * 4, (i + 1) * 4);
        const groupCombinations = generateTeamCombinations1(currentGroup, startDate, endDate, venues);
        combinations.push(...groupCombinations);
    }
    let venueIndex = 0;
    let matchNumber = 1;
    console.log("sad3");
    let g1 = groups.length / 2;
    g1 /= 2;
    console.log("sad4");
    while (g1 >= 1) {
        for (let j = 0; j < g1; j++) {
            combinations.push({
                number: matchNumber,
                team1: "TBD",
                team2: "TBD",
                winner: "",
                date: "",
                venue: venues[venueIndex++ % venues.length]
            });
            matchNumber++;
        }
        g1 /= 2;
    }

    return combinations;
}


function generateGroupTeamCombinationsGG(groups, teams, startDate, endDate, venues, times) {

    let separateMatches = [];
    for (let i = 0; i < groups.length; i++) {
        separateMatches.push(generateTeamCombinationsRR(groups[i].teams, startDate, endDate, venues, times).slice(0, -3));

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

    for (let i = 0; i < totalMatches; i++) {
        combinations.push({ number: number++, team1: "TBD", team2: "TBD", winner: '', date: '', time: { startDate: '', endTime: '' } });
    }
    combinations.push({ number: number++, team1: "Finalist 1", team2: "Finalist 2", winner: '', date: '', time: { startDate: '', endTime: '' } });

    distributeMatches(combinations, startDate, endDate, times);
    
    return combinations;
}

module.exports = { generateGroupTeamCombinationsGG };
