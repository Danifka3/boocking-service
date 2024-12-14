const Booking = require('../models/booking');
const Location = require('../models/location');

exports.createBooking = async (req, res) => {
    try {
        const { location_id, date, time } = req.body;
        const location = await Location.findById(location_id);
        if (!location) return res.status(404).json({ message: 'Location not found' });

        const booking = new Booking({
            user_id: req.user.id,
            location_id,
            date,
            time,
            price: location.price_per_booking,
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(400).json({ message: 'Error creating booking', error });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.user.id })
            .populate('location_id', 'name') // Добавляем информацию о локации (только имя)
            .populate('user_id', 'name');   // Добавляем информацию о пользователе (только имя)

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};


exports.getAllBookings = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const bookings = await Booking.find().populate('user_id', 'name email').populate('location_id', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all bookings', error });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(400).json({ message: 'Error updating booking', error });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user_id: req.user.id });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        booking.status = 'canceled';
        await booking.save();
        res.json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling booking', error });
    }
};
