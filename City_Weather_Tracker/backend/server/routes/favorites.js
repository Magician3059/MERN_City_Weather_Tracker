// routes/favorites.js
import express from 'express';
import { getFavorites, addFavoriteController, deleteFavoriteController } from '../controllers/favoriteController.js';

const router = express.Router();

router.get('/', getFavorites);
router.post('/', addFavoriteController);
router.delete('/:id', deleteFavoriteController);

export default router;
