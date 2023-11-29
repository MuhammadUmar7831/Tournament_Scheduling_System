const { formatDate } = require('../Utility/dateFormat');

function parseDate(dateString) {
    // Parse date string in the format "DD-MM-YYYY"
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
}


function distributeMatches(matches, startDate, endDate) {

    const startDateObj = parseDate(startDate);
    const endDateObj = parseDate(endDate);

    let totalDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)); // Calculate the total number of days
    totalDays++;

    let matchesPerDay = Math.round(matches.length / totalDays); // Calculate the number of matches per day

    let currentDate = new Date(startDateObj);

    let matchNumber = 0;
    let length = matches.length;

    while (totalDays > 0) {
        const matchesForDay = Math.min(matchesPerDay, length); // Handle the last day
        for (let i = 1; i <= matchesForDay; i++) {
            matches[matchNumber++].date = formatDate(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
        length -= matchesForDay;
        matchesPerDay = Math.round(length / --totalDays);
    }

    return matches;
}

module.exports = { distributeMatches };