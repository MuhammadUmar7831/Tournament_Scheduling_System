const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    tournamentPin: {
        type: String,
        require: true
    },
    lastMatch: {
        type: Number,
        require: true,
        default: 0
    },
    nextStage: {
        type: Number,
        default: 0
    },
    currentStage: {
        type: Number,
        default: 1
    },
    teams: [{
        name: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            default: 0
        },
        boundries: {
            type: Number,
            default: 0
        },
        lastMatch: {
            type: Number,
            require: true,
            default: 0
        },
        matchesPlayed: {
            type: Number,
            default: 0
        },
        won: {
            type: Number,
            default: 0
        },
        lost: {
            type: Number,
            default: 0
        }
    }],
    groups: [{
        name: {
            type: String
        },
        stage: {
            type: Number,
            default: 1
        },
        teams: [{
            name: {
                type: String,
                required: true
            },
            points: {
                type: Number,
                default: 0
            },
            boundries: {
                type: Number,
                default: 0
            },
            matchesPlayed: {
                type: Number,
                default: 0
            },
            won: {
                type: Number,
                default: 0
            },
            lost: {
                type: Number,
                default: 0
            }
        }]
    }],
    matches: [{
        number: {
            type: Number,
            required: true
        },
        team1: {
            type: String,
            required: true
        },
        team2: {
            type: String,
            required: true
        },
        score1: {
            type: Number,
            require: true,
            default: 0
        },
        score2: {
            type: Number,
            require: true,
            default: 0
        },
        out1: {
            type: Number,
            default: 0
        },
        out2: {
            type: Number,
            default: 0
        },
        boundries1: {
            type: Number,
            default: 0
        },
        boundries2: {
            type: Number,
            default: 0
        },
        winner: {
            type: String,
            default: ""
        },
        date: {
            type: String
        },
        venue: {
            type: String
        },
        time: {
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            }
        }
    }]
})

module.exports = mongoose.model('detail', DetailSchema);