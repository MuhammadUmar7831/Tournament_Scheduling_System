const Schedule = require("../models/Schedule");
const { distributeMatches } = require('../Utility/distributeMatches');

function shuffle(array) {
    // Remove the last element and store it
    const lastElement = array.pop();

    // Insert the last element at the second position (index 1)
    array.splice(1, 0, lastElement);

    return array;
}

// Helper function to generate all possible combinations of teams
function generateTeamCombinations(teams, startDate, endDate, venues) {

    let teamsCopy = [...teams];
    let venueIndex = 0;
    if (teamsCopy.length % 2 !== 0) {
        teamsCopy.push("bye");
    }

    const combinations = [];

    let matchNumber = 1;

    for (let i = 0; i < teamsCopy.length - 1; i++) {
        let second = teamsCopy.length - 1;

        for (let j = 0; j < teamsCopy.length / 2; j++, second--) {
            if (teamsCopy[j] !== "bye" && teamsCopy[second] !== "bye") {
                combinations.push({ number: matchNumber, team1: teamsCopy[j], team2: teamsCopy[second], winner: "", date: "", venue: venues[venueIndex++ % venues.length] })
                matchNumber++;
            }
        }
        teamsCopy = shuffle(teamsCopy);
    }

    combinations.push({ number: matchNumber++, team1: "Qualifier 1", team2: "Qualifier 4", date: "", venue: venues[venueIndex++ % venues.length] });
    combinations.push({ number: matchNumber++, team1: "Qualifier 2", team2: "Qualifier 3", date: "", venue: venues[venueIndex++ % venues.length] });

    distributeMatches(combinations, startDate, endDate);

    return combinations;
}


module.exports = { generateTeamCombinations };