function groupStageGroupsGenerator(teams) {
    const groups = [];
    let charCode = 'A'.charCodeAt(0);

    for (let i = 0; i < teams.length; i += 4) {
        const groupName = String.fromCharCode(charCode++);
        groups.push({ name: `Group ${groupName}`, teams: teams.slice(i, i + 4)});
    }
    return groups;
}

module.exports = { groupStageGroupsGenerator };
