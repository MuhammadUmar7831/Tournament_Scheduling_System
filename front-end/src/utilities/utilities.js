function getDaysDifference(startDateStr, endDateStr) {
    // Parse the date strings into Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the difference in milliseconds
    const differenceMillis = Math.abs(endDate - startDate);

    // Convert the difference to days
    const differenceDays = differenceMillis / (1000 * 60 * 60 * 24);

    return 1 + Math.floor(differenceDays); // Round down to the nearest whole number
}

function calculateNoMatches(noteam, format) {
    let totalMatches = 0;
    if (format === 'Round Robin') {
        for (let i = noteam - 1; i >= 0; i--) {
            totalMatches += i;
        }
    } else if (format === 'Group Stage') {
        let count = noteam / 4;
        totalMatches = 1;
        while (count > 0) {
            totalMatches += count * 6;
            count = Math.floor(count / 2);
        }
    } else if (format === 'Knock out') {
        let count = noteam / 2;
        while (count > 0) {
            totalMatches += count * 1;
            count = Math.floor(count / 2);
        }
    }

    return totalMatches;
}

export { getDaysDifference, calculateNoMatches };