const express = require('express');
const router = express.Router();

const { decideNextStageMatches } = require('../Matches_Generators/knockout');

const Detail = require('../models/Detail');

router.post('/gotoNextStage', async (req, res) => {
    try {
        const { tournamentPin } = req.body;

        const doc = await Detail.findOne({ tournamentPin });

        await Detail.updateOne(
            { tournamentPin },
            {
                $set: {
                    'currentStage': doc.currentStage + 1
                }
            }
        )

        decideNextStageMatches(doc.matches, doc.teams, doc.currentStage);
        
        await Detail.updateOne(
            { tournamentPin },
            {
                $set: {
                    'matches': doc.matches
                }
            }
        );

        res.status(200).send(tournamentPin);
    } catch (error) {
        res.status(500).send({ error: error });
    }
})

module.exports = router;