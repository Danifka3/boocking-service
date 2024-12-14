const express = require('express');
const { registerUser, loginUser, getCurrentUser, getAllUsers, deleteUser, updateUser } = require('../controllers/userController');
const { getLocations, addLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const { createBooking, getUserBookings, getAllBookings, cancelBooking, updateBooking } = require('../controllers/bookingController');
const { getAvailableSlots } = require('../controllers/additionalController');
const authenticateToken = require('./middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', authenticateToken, getCurrentUser);
router.patch('/users/me', authenticateToken, updateUser);
router.get('/users', authenticateToken, getAllUsers);
router.delete('/users/:id', authenticateToken, deleteUser);

// Location routes
router.get('/locations', getLocations);
router.post('/locations', authenticateToken, addLocation);
router.put('/locations/:id', authenticateToken, updateLocation);
router.delete('/locations/:id', authenticateToken, deleteLocation);

// Booking routes
router.post('/bookings', authenticateToken, createBooking);
router.get('/bookings', authenticateToken, getUserBookings);
router.get('/bookings/all', authenticateToken, getAllBookings);
router.patch('/bookings/:id', authenticateToken, updateBooking);
router.delete('/bookings/:id', authenticateToken, cancelBooking);

router.get('/available-slots', authenticateToken, getAvailableSlots);
module.exports = router;
