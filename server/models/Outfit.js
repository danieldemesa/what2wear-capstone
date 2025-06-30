const mongoose = require('mongoose');

const OutfitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  season: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Outfit', OutfitSchema);
