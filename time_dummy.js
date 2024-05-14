// app.js
const mongoose = require('mongoose');
const Court = require('./models/Court');
const TimeSlot = require('./models/TimeSlot');

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
  try {
    // Fetch all courts
    const courts = await Court.find();

   // Define dummy time slots
const dummyTimeSlots = [
  { courtId: courts[0]._id, date: "2024-05-14", startTime: "10:00", endTime: "12:00", status: 'available' },
  { courtId: courts[0]._id, date: "2024-05-14", startTime: "14:00", endTime: "16:00", status: 'available' },
  { courtId: courts[1]._id, date: "2024-05-15", startTime: "09:00", endTime: "11:00", status: 'available' },
  { courtId: courts[1]._id, date: "2024-05-15", startTime: "13:00", endTime: "15:00", status: 'available' }
  // Add more dummy time slots as needed
];

    // Insert dummy time slots
    await TimeSlot.create(dummyTimeSlots);
    console.log('Dummy time slots inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy time slots:', error);
  }
}
