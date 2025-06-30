const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const requireAuth = require('../middleware/authMiddleware');
require('dotenv').config(); // ✅ Load env variables here

const router = express.Router();

// 🔍 Debug: Check if Cloudinary env variables are present
console.log('Cloudinary config check:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ SET' : '❌ MISSING'
});

// 🔧 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📦 Set up multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'what2wear',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage });

// 🔒 POST /api/upload — Protected route
router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  res.status(200).json({
    message: '✅ Image uploaded successfully',
    imageUrl: req.file.path
  });
});

module.exports = router;
