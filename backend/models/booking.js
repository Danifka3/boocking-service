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

BookingSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Добавляем id
        delete ret._id; // Убираем _id
        delete ret.__v; // Убираем служебное поле версии
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
