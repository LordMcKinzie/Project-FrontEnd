// routes/logout.js
const express = require('express');
const router = express.Router();

// GET request to handle user logout
router.get('/', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect the user to the home page after logout
            res.redirect('/');
        }
    });
});

module.exports = router;
