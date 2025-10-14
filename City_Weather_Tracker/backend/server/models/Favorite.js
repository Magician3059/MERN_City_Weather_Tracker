import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  city: { type: String, required: true, index: true }, // 👈 adds index -> City name
  country: String,                                        // Country code
  savedAt: { type: Date, default: Date.now }             // Timestamp
});

// Export as default for ESM
const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
