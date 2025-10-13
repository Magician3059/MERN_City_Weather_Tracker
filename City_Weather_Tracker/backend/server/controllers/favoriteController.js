import { getAllFavorites, addFavorite, deleteFavorite } from '../services/favoriteService.js';

export const getFavorites = async (req, res) => {
  try {
    const favs = await getAllFavorites();
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addFavoriteController = async (req, res) => {
  const { city, country } = req.body;
  try {
    const fav = await addFavorite({ city, country });
    res.status(201).json(fav);
  } catch (err) {
    res.status(err.message === 'City already saved' ? 409 : 500).json({ error: err.message });
  }
};

export const deleteFavoriteController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteFavorite(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
