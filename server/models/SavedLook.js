const mongoose = require('mongoose');

const savedLookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('SavedLook', savedLookSchema);
