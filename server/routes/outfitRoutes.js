const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/authMiddleware');
const Outfit = require('../models/Outfit');

// 🔒 GET all outfits for the logged-in user
router.get('/', requireAuth, async (req, res) => {
  try {
    const outfits = await Outfit.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(outfits);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching outfits.' });
  }
});

// 🔒 POST a new outfit
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const newOutfit = new Outfit({
      user: req.user.id,
      title,
      description,
      imageUrl
    });

    const savedOutfit = await newOutfit.save();
    res.status(201).json(savedOutfit);
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving outfit.' });
  }
});

module.exports = router;
