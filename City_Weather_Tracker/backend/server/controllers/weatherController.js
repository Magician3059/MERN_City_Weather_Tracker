import { fetchWeather } from '../services/weatherservice.js';


export const getWeather = async (req, res) => {
  const city = req.query.q;// Get city from query
  if (!city) return res.status(400).json({ error: 'City required' });

 try {
    const data = await fetchWeather(city);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
