// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const Court = require('./models/Court');
const logoutRouter = require('./routes/logout');

// Mount the logout route handler
const bodyParser = require('body-parser');
const { requireLogin } = require('./middleware'); // Import middleware

const app = express();
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/node-authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static('public'));
// Routes
app.use('/', require('./routes/index'));

app.use('/bookslot',requireLogin, require('./routes/booking')); // Add this line
app.use('/api', requireLogin,require('./routes/api')); // Add this line for API routes
app.use('/api/reservations', requireLogin,require('./routes/reservations')); // Add
app.use('/logout', logoutRouter);

// Home page route
app.get('/', async (req, res) => {
  try {
    const loggedIn = !!req.session.userId; // Check if user is logged in
    const courts = await Court.find();
    res.render('home', { courts,loggedIn });
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
