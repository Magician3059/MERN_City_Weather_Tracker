import 'dotenv/config'; // dotenv
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import weatherRoutes from './routes/weather.js';
import favoriteRoutes from './routes/favorites.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
