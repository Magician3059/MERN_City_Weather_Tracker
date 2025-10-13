import Favorite from '../models/Favorite.js';

export const getAllFavorites = async () => {
  return await Favorite.find().sort({ savedAt: -1 });
};

export const addFavorite = async ({ city, country }) => {
  if (!city) throw new Error('City required');

  const existing = await Favorite.findOne({ city: new RegExp(`^${city}$`, 'i') });
  if (existing) throw new Error('City already saved');

  const fav = new Favorite({ city, country });
  await fav.save();
  return fav;
};

export const deleteFavorite = async (id) => {
  await Favorite.findByIdAndDelete(id);
  return { success: true };
};
