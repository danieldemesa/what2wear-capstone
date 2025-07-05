const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const requireAuth = require('../middleware/authMiddleware');
const Outfit = require('../models/Outfit');
require('dotenv').config();

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req) => ({
    folder: 'what2wear',
    format: 'jpg',
    public_id: `${Date.now()}`,
  }),
});

const upload = multer({ storage });

// Upload and save outfit
router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { category, season } = req.body;

    if (!req.file || !category || !season) {
      return res.status(400).json({ error: 'All fields are required (image, category, season)' });
    }

    const newOutfit = new Outfit({
      user: req.user.userId,
      imageUrl: req.file.path,
      category,
      season,
    });

    await newOutfit.save();

    res.status(201).json({ message: '✅ Upload and save successful!', outfit: newOutfit });
  } catch (err) {
    console.error('❌ Error uploading image:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
