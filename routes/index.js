// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('register', { messages: req.flash() });
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    req.flash('success', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Please choose another email');
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash() });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      req.session.userId = user._id;
      req.flash('success', 'You are now logged in');
      return res.redirect('/');
    }
    req.flash('error', 'Invalid email or password');
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Failed to log in');
    res.redirect('/login');
  }
});

module.exports = router;
