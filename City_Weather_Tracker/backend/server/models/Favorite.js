import mongoose from 'mongoose';

// Define the schema for a favorite city
const favoriteSchema = new mongoose.Schema({
  city: { type: String, required: true, trim: true },
  country: String,
  savedAt: { type: Date, default: Date.now }  // Timestamp
});
// Case-insensitive unique index on city name
favoriteSchema.index({ city: 1 }, { unique: true, collation: { locale: 'en', strength: 2 }}); // locale and strength f

// Export as default for ESM
const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
