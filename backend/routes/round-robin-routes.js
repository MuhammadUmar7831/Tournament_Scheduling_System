const express = require('express');
const router = express.Router();

const Detail = require('../models/Detail');

router.post('/SemiFinalsStage', async (req, res) => {

    try {
        const { pin, team1, team2, team3, team4 } = req.body;

        const doc = await Detail.findOne(
            { tournamentPin: pin },
            { 'matches': 1 }
        );

        doc.matches[doc.matches.length - 3].team1 = team1;
        doc.matches[doc.matches.length - 3].team2 = team4;

        doc.matches[doc.matches.length - 2].team1 = team2;
        doc.matches[doc.matches.length - 2].team2 = team3;

        await Detail.updateOne({ tournamentPin: pin }, {
            $set: {
                'matches': doc.matches
            }
        });

        res.status(201).json(pin); 

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Internal Server error" });
    }

});

router.post('/FinalsStage', async (req, res) => {

    try {
        const { pin } = req.body;

        const doc = await Detail.findOne(
            { tournamentPin: pin },
            { 'matches': 1 }
        );

        doc.matches[doc.matches.length - 1].team1 = doc.matches[doc.matches.length - 3].winner;
        doc.matches[doc.matches.length - 1].team2 = doc.matches[doc.matches.length - 2].winner;

        const dok = await Detail.updateOne({ tournamentPin: pin }, {
            $set: {
                'matches': doc.matches
            }
        });

        res.status(201).json(pin); 

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": "Internal Server error" });
    }

});

module.exports = router;