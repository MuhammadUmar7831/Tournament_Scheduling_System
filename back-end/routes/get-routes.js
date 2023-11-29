const express = require('express');
const Schedule = require('../models/Schedule');
const Detail = require('../models/Detail');
const router = express.Router();

// ROUTE-2 end-point to get all notes of a user
router.get('/getSchedules', async (req, res) => {
    try {
        // finds the user with the id passed as token in request header decrypted in fetchUser
        const schedules = await Schedule.find({});

        // Check if there are schedules
        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ message: 'No schedules found.' });
        }

        // Send the schedules as a response
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

router.get('/getDetail', async (req, res) => {
    try {
        const { pin } = req.query;
        // finds the user with the id passed as token in request header decrypted in fetchUser
        const detail = await Detail.findOne({ tournamentPin: pin });

        // Check if there are schedules
        if (!detail || detail.length === 0) {
            return res.status(404).json({ message: 'No schedules found.' });
        }

        // Send the schedules as a response
        res.status(200).json(detail);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})


module.exports = router;  