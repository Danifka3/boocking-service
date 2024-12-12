const express = require('express');
const Item = require('../models/item');

const router = express.Router();

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item created successfully
 */
router.post('/create', async (req, res) => {
    try {
        const { name, value } = req.body;
        const item = new Item({ name, value });
        await item.save();
        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
