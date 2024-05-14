// middleware.js

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
    // Check if user ID is present in session
    if (req.session.userId) {
        // User is logged in, proceed to the next middleware/route handler
        next();
    } else {
        // User is not logged in, redirect to login page or return an error response
        res.status(401).send('Unauthorized');
    }
}

module.exports = { requireLogin };