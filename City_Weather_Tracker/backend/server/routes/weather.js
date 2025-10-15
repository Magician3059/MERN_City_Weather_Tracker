import express from 'express';
import axios from 'axios';
import result from '../utils/result.js';

const router = express.Router();

// 🔹 Get Weather by City
router.get('/', async (req, res) => {
  const city = req.query.q; // Get city from query
  if (!city) return res.status(400).json(result.createErrorResult('City is required'));

  try {
    // Fetch weather data directly here (no separate service)
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
     params: {
        q: city,
        appid: process.env.OWM_KEY, // ✅ from .env
        units: 'metric',
      },
    });

    res.send(result.createSuccessResult(resp.data));
  } catch (error) {
    console.error('Error fetching weather data:', error?.response?.data || error.message);

    if (error.response?.status === 404) {
      res.send(result.createErrorResult('City not found. Please check the name and try again.'));
    } else {
      res.send(result.createErrorResult('Failed to fetch weather data. Please try again later.'));
    }
  }
});

export default router;
