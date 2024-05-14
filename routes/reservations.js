// routes/reservations.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { requireLogin } = require('../middleware'); // Adjust the path as needed

// POST request to create a new reservation
router.post('/', requireLogin,async (req, res) => {
    try {

        console.log(req.body);
        console.log("============================");

        const { reservationId, category,courtId, timeSlotId } = req.body;

        const userId =   req.session.userId;
        
        // Create a new reservation
        const reservation = new Reservation({
            reservationId,
            userId,
            category,
            courtId,
            timeSlotId
        });

        // Save the reservation to the database
        await reservation.save();

        res.status(201).json({ success: true, reservation });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;