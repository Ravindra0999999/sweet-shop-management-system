const express = require('express');
const router = express.Router();
const Sweet = require('../models/Sweet');
const { authenticate, isAdmin } = require('../middlewares/auth');

// Create sweet
router.post('/', authenticate, async (req, res) => {
  try {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
});

// List
router.get('/', async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

// Search
router.get('/search', async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  const sweets = await Sweet.find(filter);
  res.json(sweets);
});

// Update
router.put('/:id', authenticate, async (req, res) => {
  const updated = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Purchase
router.post('/:id/purchase', authenticate, async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: 'Not found' });
  if (sweet.quantity <= 0) return res.status(400).json({ message: 'Out of stock' });
  sweet.quantity -= 1;
  await sweet.save();
  res.json(sweet);
});

// Restock (admin only)
router.post('/:id/restock', authenticate, isAdmin, async (req, res) => {
  const { amount } = req.body;
  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) return res.status(404).json({ message: 'Not found' });
  sweet.quantity += Number(amount || 0);
  await sweet.save();
  res.json(sweet);
});

module.exports = router;
