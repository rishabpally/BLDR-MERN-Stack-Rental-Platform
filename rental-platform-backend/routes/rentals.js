const express = require('express');
const { backupToJSON } = require('./backupUtility');


module.exports = (Item) => {
  const router = express.Router();

  // Add a new item
  router.post('/list', async (req, res) => {
    const { name, description, pricePerDay } = req.body;

    if (!name || !description || !pricePerDay) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newItem = new Item({
      name,
      description,
      pricePerDay,
      available: true,
      rentals: [],
    });

    try {
      await newItem.save();
      res.status(201).json({ message: 'Item listed successfully!', item: newItem });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save item.', details: error });
    }
  });

  // Search items by name or price range
  router.get('/search', async (req, res) => {
    const { name, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerDay.$lte = parseFloat(maxPrice);
    }

    try {
      const items = await Item.find(query);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search items.', details: error });
    }
  });

  // Rent an item
  router.patch('/rent/:id', async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    try {
      const item = await Item.findById(id);

      if (!item) return res.status(404).json({ error: 'Item not found.' });

      // Check for overlapping dates
      const overlap = item.rentals.some(
        (rental) =>
          new Date(startDate) <= new Date(rental.endDate) &&
          new Date(endDate) >= new Date(rental.startDate)
      );

      if (overlap) {
        return res.status(400).json({ error: 'Dates overlap with an existing rental.' });
      }

      // Add the rental dates
      item.rentals.push({ startDate, endDate });
      await item.save();
      res.json({ message: 'Item rented successfully!', item });
    } catch (error) {
      res.status(500).json({ error: 'Failed to rent item.', details: error });
    }
  });

  // Return an item
  router.patch('/return/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const item = await Item.findById(id);

      if (!item) return res.status(404).json({ error: 'Item not found.' });

      // Clear rentals
      item.rentals = [];
      item.available = true;
      await item.save();
      res.json({ message: 'Item returned successfully!', item });
    } catch (error) {
      res.status(500).json({ error: 'Failed to return item.', details: error });
    }
  });

  // Trigger a backup
  router.get('/backup', async (req, res) => {
    try {
      await backupToJSON();
      res.json({ message: 'Backup completed!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create backup.', details: error });
    }
  });

  return router;
};
