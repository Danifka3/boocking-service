const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Добавляем id
        delete ret._id; // Убираем _id
        delete ret.__v; // Убираем служебное поле версии
    }
});

module.exports = mongoose.model('User', UserSchema);
