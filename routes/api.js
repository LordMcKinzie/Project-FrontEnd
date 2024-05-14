// routes/api.js
const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const { requireLogin } = require('../middleware'); // Adjust the path as needed


// GET request to fetch time slots based on court ID and date
router.get('/timeslots',requireLogin, async (req, res) => {
    try {
        const { courtId, date } = req.query;
        // Fetch time slots based on court ID and date
        const timeSlots = await TimeSlot.find({ courtId:courtId,date:date });
        res.json({ success: true, timeSlots });
    } catch (error) {
        console.error('Error fetching time slots:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
