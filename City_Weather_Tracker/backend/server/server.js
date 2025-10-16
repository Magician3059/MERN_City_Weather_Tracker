import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import weatherRoutes from './routes/weather.js';
import favoriteRoutes from './routes/favorites.js';
import userRouter from './routes/user.js';
import { authorization } from './routes/authorization.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Health check for Render
app.get('/healthz', (req, res) => res.send('OK'));

// ✅ Apply authorization before protected routes
app.use(authorization);

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);

// ✅ Dynamic port (Render sets its own)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
