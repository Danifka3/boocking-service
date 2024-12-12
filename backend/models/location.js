const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: String,
    description: String,
    capacity: Number,
    price_per_booking: Number,
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Location', LocationSchema);
