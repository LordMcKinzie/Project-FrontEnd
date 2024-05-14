// routes/booking.js
const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const Category = require('../models/Category');
const CategoCourtry = require('../models/Court');
const { requireLogin } = require('../middleware'); // Adjust the path as needed
const Court = require('../models/Court');

// GET request to render the booking view page
router.get('/', requireLogin,async (req, res) => {
    try {
        const loggedIn = !!req.session.userId; // Check if user is logged in
        const courtId = req.query.courtId;
        const categories = await Category.find();
        // Fetch time slots based on the court ID
        const timeSlots = await TimeSlot.find({ courtId });
        const court = await Court.findOne({ _id: courtId });
                // Render the booking view page with the courtId and timeSlots parameters
        res.render('booking', { courtId, timeSlots , loggedIn,categories,court});
    } catch (error) {
        console.error('Error fetching time slots:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
