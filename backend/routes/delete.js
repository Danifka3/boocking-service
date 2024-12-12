const express = require('express');
const Item = require('../models/item');

const router = express.Router();

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.json({ success: true, message: `Item with ID ${id} deleted` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
