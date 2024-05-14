// models/TimeSlot.js
const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    courtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true }, // Modified to string type
    endTime: { type: String, required: true }, // Modified to string type
    status: { type: String, enum: ['booked', 'available'], default: 'available' }
  });
  
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
