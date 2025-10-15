import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  // Reference to the user who saved the favorite city
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           // reference to User collection
    required: true,
  },
  city: { type: String, required: true, trim: true },
  country: String,
  savedAt: { type: Date, default: Date.now },
});

// Optional: unique index so a user can't save same city twice
favoriteSchema.index(
  { userId: 1, city: 1 }, // compound index on userId and city 
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
