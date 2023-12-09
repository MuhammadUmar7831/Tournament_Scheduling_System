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

function generateTimeSlots(startingTime, slotDuration, numberOfSlots) {
    const startingTimeSlots = [];
    const endingTimeSlots = [];

    // Convert starting and ending times to Date objects for easier manipulation
    const startTime = new Date(`2023-01-01 ${startingTime}`);

    // Calculate the duration of each time slot in minutes
    const [durationHours, durationMinutes] = slotDuration.split(':');
    const totalSlotDuration = parseInt(durationHours) * 60 + parseInt(durationMinutes);

    // Generate time slots
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStart = new Date(startTime.getTime() + i * totalSlotDuration * 60 * 1000);
        const slotEnd = new Date(startTime.getTime() + (i + 1) * totalSlotDuration * 60 * 1000);

        // Format the time in HH:mm AM/PM
        const startFormatted = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endFormatted = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        startingTimeSlots.push(startFormatted);
        endingTimeSlots.push(endFormatted);
    }


    return { startingTimeSlots, endingTimeSlots };
}

function generateSlots(dayStartTime, noSlots, matchDuration, setStartingTimes, setEndingTimes) {
    // let copyStartingTimes = [...startingTimes];
    // let copyEndingTimes = [...endingTimes];

    const obj = generateTimeSlots(dayStartTime, matchDuration, noSlots);
    setStartingTimes(obj.startingTimeSlots);
    setEndingTimes(obj.endingTimeSlots);
    // console.log(dayStartTime, dayEndTime, matchDuration, copyStartingTimes, copyEndingTimes);
}

export { getDaysDifference, calculateNoMatches, generateSlots };