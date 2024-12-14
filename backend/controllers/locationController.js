const Location = require('../models/location');

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

exports.addLocation = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const { name, description, capacity, price_per_booking } = req.body;
        const location = new Location({ name, description, capacity, price_per_booking });
        await location.save();
        res.status(201).json({ message: 'Location created successfully', location });
    } catch (error) {
        res.status(400).json({ message: 'Error creating location', error });
    }
};

exports.updateLocation = async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) return res.status(404).json({ message: 'Location not found' });

        res.json({ message: 'Location updated successfully', location });
    } catch (error) {
        res.status(400).json({ message: 'Error updating location', error });
    }
};

exports.deleteLocation = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.json({ message: 'Location deleted successfully', location });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting location', error });
    }
};

