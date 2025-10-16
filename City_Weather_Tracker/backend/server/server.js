import 'dotenv/config'; // dotenv
import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import weatherRoutes from './routes/weather.js';
import favoriteRoutes from './routes/favorites.js';
import userRouter from './routes/user.js';
import {authorization} from './routes/authorization.js';
import dotenv from 'dotenv';


// dotenv.config(); // ✅ load .env
// DB Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(authorization);
// Routes
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);


// // Global error handler (must be last)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(result.createErrorResult('Something went wrong!'));
// });
console.log(app._router.stack
  .filter(r => r.route)
  .map(r => r.route.path));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
