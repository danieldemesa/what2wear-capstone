const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 🔗 Route Imports
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const outfitRoutes = require('./routes/outfitRoutes');

const requireAuth = require('./middleware/authMiddleware');

// 🔧 Load .env
dotenv.config();

// 🔨 App Setup
const app = express();
const PORT = process.env.PORT || 4000;

// 🔐 Middleware
app.use(cors());
app.use(express.json());

// 📦 Routes
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/outfits', outfitRoutes);

// 🔒 Test Protected Route
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: `🔒 Protected data: User ID = ${req.user.id}` });
});

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('What2Wear API is running...');
});

// ⚡ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
