const express = require('express');
const router = express.Router();
const Outfit = require('../models/Outfit');
const requireAuth = require('../middleware/authMiddleware');

// Save an outfit item
router.post('/', requireAuth, async (req, res) => {
  const { imageUrl, category, season } = req.body;
  try {
    const outfit = new Outfit({
      user: req.user.userId,
      imageUrl,
      category,
      season,
    });
    await outfit.save();
    res.status(201).json(outfit);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to save outfit' });
  }
});

// Get all outfit items
router.get('/', requireAuth, async (req, res) => {
  try {
    const outfits = await Outfit.find({ user: req.user.userId });
    res.json(outfits);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch outfits' });
  }
});

module.exports = router;
