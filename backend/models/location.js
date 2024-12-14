const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    price_per_booking: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

LocationSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Добавляем id
        delete ret._id; // Убираем _id
        delete ret.__v; // Убираем служебное поле версии
    }
});

module.exports = mongoose.model('Location', LocationSchema);
