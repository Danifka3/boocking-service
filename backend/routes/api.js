const express = require('express');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { getLocations, addLocation, updateLocation } = require('../controllers/locationController');
const { createBooking, getUserBookings, getAllBookings, cancelBooking, updateBooking } = require('../controllers/bookingController');
const authenticateToken = require('./middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', authenticateToken, getCurrentUser);

// Location routes
router.get('/locations', getLocations);
router.post('/locations', authenticateToken, addLocation);
router.put('/locations/:id', authenticateToken, updateLocation);

// Booking routes
router.post('/bookings', authenticateToken, createBooking);
router.get('/bookings', authenticateToken, getUserBookings);
router.get('/bookings/all', authenticateToken, getAllBookings);
router.patch('/bookings/:id', authenticateToken, updateBooking);
router.delete('/bookings/:id', authenticateToken, cancelBooking);

module.exports = router;
