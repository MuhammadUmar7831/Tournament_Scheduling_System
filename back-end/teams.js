function teamsGenerator(teams) {
    let returnArray = [];
    for (let i = 0; i < teams.length; i++) {
        returnArray.push({ name: teams[i], points: 0, lastMatch: "" });
    }

    return returnArray;
}

module.exports = { teamsGenerator };