// app.js
const mongoose = require('mongoose');
const Court = require('./models/Court');
const Category = require('./models/Category');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/node-authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB connected');
  await insertDummyTimeSlots();
}).catch(err => console.log(err));

// Function to insert dummy time slots
async function insertDummyTimeSlots() {
  // Fetch all courts

  // Array of dummy categories
  const dummyCategories = [
    { name: 'Football' },
    { name: 'Basketball' },
    { name: 'Tennis' },
    { name: 'Swimming' },
    // Add more dummy categories as needed
  ];

  // Insert dummy categories into the database
  Category.insertMany(dummyCategories)
    .then(() => {
      console.log('Dummy categories added successfully.');
    })
    .catch(error => {
      console.error('Error adding dummy categories:', error);
    });
}
