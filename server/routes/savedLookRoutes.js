const express = require('express');
const router = express.Router();
const SavedLook = require('../models/SavedLook');
const requireAuth = require('../middleware/authMiddleware');

// Save a look
router.post('/', requireAuth, async (req, res) => {
  const { top, bottom, shoes } = req.body;

  try {
    const savedLook = new SavedLook({
      user: req.user.userId,
      top,
      bottom,
      shoes,
    });
    await savedLook.save();
    res.status(201).json(savedLook);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to save look' });
  }
});

// Get all saved looks
router.get('/', requireAuth, async (req, res) => {
  try {
    const looks = await SavedLook.find({ user: req.user.userId });
    res.json(looks);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch saved looks' });
  }
});

module.exports = router;
