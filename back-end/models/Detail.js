const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    tournamentPin: {
        type: String,
        require: true
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
        lastMatch: {
            type: String
        }
    }],
    groups: [{
        name: {
            type: String
        },
        teams: [{
            name: {
                type: String
            },
            rank: {
                type: String
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
        score1:{
            type: Number,
            require: true,
            default: 0
        },
        score2:{
            type: Number,
            require: true,
            default: 0
        },
        out1:{
            type: Number,
            default: 0
        },
        out2:{
            type: Number,
            default: 0
        },
        boundries1:{
            type:Number,
            default: 0
        },
        boundries2:{
            type:Number,
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
        }
    }]
})

module.exports = mongoose.model('detail', DetailSchema);