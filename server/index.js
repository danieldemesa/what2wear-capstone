const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const outfitRoutes = require('./routes/outfitRoutes');
const savedLookRoutes = require('./routes/savedLookRoutes');



const requireAuth = require('./middleware/authMiddleware');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/outfits', outfitRoutes);
app.use('/api/saved-looks', savedLookRoutes);



app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: `🔒 You are authorized, User ID: ${req.user.userId}` });
});


app.get('/', (req, res) => {
  res.send('🌤️ What2Wear API is running...');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
