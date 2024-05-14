// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const Court = require('./models/Court'); // Add this line
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/node-authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  // Insert Dummy Data
  insertDummyData();
}).catch(err => console.log(err));

//
// Function to insert dummy data
async function insertDummyData() {
  try {
    // Check if courts collection is empty
    const count = await Court.countDocuments();
    if (count === 0) {
      // Insert dummy records
      await Court.create([
        { name: 'Court 1', category: 'Category A', location: 'Location 1' },
        { name: 'Court 2', category: 'Category B', location: 'Location 2' },
        { name: 'Court 3', category: 'Category C', location: 'Location 3' },
        { name: 'Court 4', category: 'Category A', location: 'Location 4' },
        { name: 'Court 5', category: 'Category B', location: 'Location 5' }
      ]);
      console.log('Dummy data inserted successfully');
    }
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
}
