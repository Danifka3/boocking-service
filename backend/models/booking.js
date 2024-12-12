const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    date: String,
    time: String,
    status: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' },
    price: Number,
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
