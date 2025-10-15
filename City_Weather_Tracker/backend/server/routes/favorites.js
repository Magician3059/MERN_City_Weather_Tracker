import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// Default pagination limit
const DEFAULT_LIMIT = 5;

/**
 * 📄 GET /api/favorites
 * Fetch all favorite cities with pagination
 * Query params: ?page=1&limit=5
 */
router.get('/', async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const userId = req.headers.userId; // get userId from authorization middleware

  try {
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || DEFAULT_LIMIT, 1);
    const skip = (pageNum - 1) * limitNum;

    const data = await Favorite.find({ userId }) // filter by user
      .sort({ savedAt: -1 }) // Newest first
      .skip(skip)
      .limit(limitNum);

    const totalItems = await Favorite.countDocuments({ userId });
    const totalPages = Math.ceil(totalItems / limitNum);

    res.json({
      data,
      currentPage: pageNum,
      totalPages,
      totalItems,
      pageSize: limitNum,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ➕ POST /api/favorites
 * Add a new favorite city
 * Body: { city: "London", country: "UK" }
 */
router.post('/', async (req, res) => {
  const { city, country } = req.body;
  const userId = req.headers.userId; // attach userId

  try {
    if (!city) throw new Error('City required');

    // Case-insensitive city check per user
    const existing = await Favorite.findOne({
      city: new RegExp(`^${city}$`, 'i'),
      userId,
    });
    if (existing) throw new Error('City already saved');

    const fav = new Favorite({ userId, city, country }); // save with userId
    await fav.save();

    res.status(201).json(fav);
  } catch (err) {
    res
      .status(err.message === 'City already saved' ? 409 : 500)
      .json({ error: err.message });
  }
});

/**
 * ❌ DELETE /api/favorites/:id
 * Delete a favorite city by ID
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.headers.userId;

  try {
    await Favorite.findOneAndDelete({ _id: id, userId }); // only delete if belongs to user
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
