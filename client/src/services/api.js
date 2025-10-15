import axios from 'axios';
import { config } from './config';

// 🔹 Fetch weather (public)
export const fetchWeather = async (city) => {
  
  try {
  const { data } = await axios.get(`${config.serverUrl}/weather?q=${city}`);
  return data.data;// send back the weather data
   } catch (err) {
  console.error(err);
  return null;
 }

};

// 🔹 Get favorites (protected)
export const getFavorites = async (page = 1) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const res = await axios.get(`${config.serverUrl}/favorites?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` } 
  });

  if (res.data && res.data.data) return res.data; // paginated response
  return res.data || [];
};

  
// 🔹 Add favorite (protected)
export const addFavorite = async (city, country) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const { data } = await axios.post(
    `${config.serverUrl}/favorites`,
    { city, country },
    { headers: { Authorization: `Bearer ${token}` } } // ✅ consistent
  );

  return data;
};

// 🔹 Delete favorite (protected)
export const deleteFavorite = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');

  const { data } = await axios.delete(`${config.serverUrl}/favorites/${id}`, {
    headers: { Authorization: `Bearer ${token}` } // ✅ consistent
  });

  return data;
};
