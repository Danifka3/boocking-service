const express = require('express');
const { json2xml } = require('xml-js');
const Item = require('../models/item');

const router = express.Router();

/**
 * @swagger
 * /read:
 *   get:
 *     summary: Retrieve all items
 *     parameters:
 *       - name: format
 *         in: query
 *         description: Format of the response (json or xml)
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of items
 */
router.get('/read', async (req, res) => {
    try {
        const items = await Item.find();
        const format = req.query.format || 'json';

        if (format === 'xml') {
            const xml = json2xml({ items: items.map((item) => item.toObject()) }, { compact: true });
            res.set('Content-Type', 'application/xml');
            res.send(xml);
        } else {
            res.json(items);
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
