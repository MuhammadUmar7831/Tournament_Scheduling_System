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

const sortTeams = (teams) => {
    return teams.sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        return b.boundries - a.boundries;
    });
};

const selectTop2Teams = (groups) => {
    // return groups.map((group) => 
    let rtnArray = [];
    for (let j = 0; j < groups.length; j++) {
        const sortedTeams = sortTeams(groups[j].teams).slice(0, 2);
        for (let i = 0; i < sortedTeams.length; i++) {
            sortedTeams[i].points = 0;
            sortedTeams[i].boundries = 0;
            sortedTeams[i].won = 0;
            sortedTeams[i].lost = 0;
            sortedTeams[i].matchesPlayed = 0;
        }
        rtnArray.push(sortedTeams);
    };
    return rtnArray;
};

function createNextStageGroups(groups, stage) {

    let newGroups = [];
    const top2Teams = selectTop2Teams(groups);
    // Iterate over each pair of top teams and create a new group
    for (let i = 0; i < top2Teams.length; i += 2) {
        const groupLetter = String.fromCharCode('A'.charCodeAt(0) + i / 2); // Get letters A, B, C, ...
        const groupName = `Group-${groupLetter}-${stage}`;

        // Create a new group with 4 teams
        const newGroup = {
            name: groupName,
            stage: stage + 1,
            teams: [...top2Teams[i], ...top2Teams[i + 1]] // Combine top 2 teams from the pair
        };

        // Add the new group to the array
        newGroups.push(newGroup);
    }

    return newGroups;
}

function shuffle(array) {
    // Remove the last element and store it
    const lastElement = array.pop();

    // Insert the last element at the second position (index 1)
    array.splice(1, 0, lastElement);

    return array;
}

function generateRoundRobin(teams, matches, matchNumber) {

    if (teams.length % 2 !== 0) {
        teams.pus('bye');
    }

    for (let i = 0; i < teams.length - 1; i++) {
        let second = teams.length - 1;
        for (let j = 0; j < teams.length / 2; j++, second--) {
            if (teams[j] !== "bye" && teams[second] !== "bye") {
                matches[matchNumber - 1].team1 = teams[j].name;
                matches[matchNumber - 1].team2 = teams[second].name;
                matchNumber++;
            }
        }
        teams = shuffle(teams);
    }
}

function decideNextStageMatches(groups, matches, matchNumber) {

    for (let i = 0; i < groups.length; i++) {
        generateRoundRobin(groups[i].teams, matches, matchNumber)
        matchNumber += 6;
    }
}

module.exports = { generateGroupTeamCombinationsGG, createNextStageGroups, decideNextStageMatches };
