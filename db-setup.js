const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/booking_system';

// Подключение к базе данных
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Определение схем
const UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const LocationSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    capacity: Number,
    price_per_booking: Number,
    created_at: { type: Date, default: Date.now }
});

const BookingSchema = new mongoose.Schema({
    _id: String,
    user_id: { type: String, ref: 'User' },
    location_id: { type: String, ref: 'Location' },
    date: String,
    time: String,
    status: { type: String, enum: ['confirmed', 'canceled'], default: 'confirmed' },
    price: Number,
    created_at: { type: Date, default: Date.now }
});

// Создание моделей
const User = mongoose.model('User', UserSchema);
const Location = mongoose.model('Location', LocationSchema);
const Booking = mongoose.model('Booking', BookingSchema);

// Вставка данных
async function seedDatabase() {
    await User.insertMany([
        { _id: "1", name: "Иван Иванов", email: "ivan@example.com", password: "user", role: "user" },
        { _id: "2", name: "Админ Админов", email: "admin@example.com", password: "admin", role: "admin" }
    ]);

    await Location.insertMany([
        { _id: "101", name: "Ресторан 'Уютный уголок'", description: "Ресторан с видом на реку", capacity: 50, price_per_booking: 1000 },
        { _id: "102", name: "Кафе 'Весна'", description: "Уютное кафе в центре города", capacity: 30, price_per_booking: 500 }
    ]);

    await Booking.insertMany([
        { _id: "1001", user_id: "1", location_id: "101", date: "2024-12-20", time: "19:00", status: "confirmed", price: 1000 },
        { _id: "1002", user_id: "1", location_id: "102", date: "2024-12-21", time: "18:00", status: "confirmed", price: 500 }
    ]);

    console.log('Database seeded successfully');
    await mongoose.connection.close();
}

seedDatabase();
