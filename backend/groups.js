function groupStageGroupsGenerator(teams) {
    const groups = [];
    let charCode = 'A'.charCodeAt(0);

    for (let i = 0; i < teams.length; i += 4) {
        const groupName = String.fromCharCode(charCode++);
        groups.push({ name: `Group ${groupName}`, stage: 1, teams: teams.slice(i, i + 4) });
    }
    return groups;
}

function knockoutGroupGenerator(teams) {
    const groups = [];

    groups.push({ name: `Stage 1`, stage: 1, teams: teams });
    return groups;
}

module.exports = { groupStageGroupsGenerator, knockoutGroupGenerator };
