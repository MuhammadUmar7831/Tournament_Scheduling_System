const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    teamNumber: { type: Number, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    venues: { type: [String], default: [] },
    teams: { type: [String], default: [] },
    format: { type: String, required: true },
    times: {
        startingTimes: [{
            type: String,
            required: true
        }],
        endingTimes: [{
            type: String,
            required: true
        }]
    },
    pin: { type: String, required: true },
})

module.exports = mongoose.model('schedule', ScheduleSchema);