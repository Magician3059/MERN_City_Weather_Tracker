import axios from 'axios';
import {API_BASE} from '../config/url'

// const API_BASE = "https://mern-city-weather-tracker-backend.onrender.com/api";
// const API_BASE = import.meta.env.VITE_API_URL; 
  //  const API_BASE = 'http://localhost:5000/api'; // for local testing
  

// 🔹 Helper: Get token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Unauthorized');
  return { Authorization: `Bearer ${token}` };
}


// 🔹 PUBLIC API: Fetch weather
export const fetchWeather = async (city) => {
  try {
    const { data } = await axios.get(`${API_BASE}/weather?q=${city}`);
    return data.data; // only the weather data
  } catch (err) {
    console.error('❌ Weather fetch failed:', err.message);
    return null;
  }
};


// 🔹 PROTECTED API: Get favorites (with pagination)
export const getFavorites = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/favorites?page=${page}`, {
      headers: getAuthHeaders(),
    });
    return res.data?.data ? res.data : res.data || [];
  } catch (err) {
    console.error('❌ Error fetching favorites:', err.message);
    return [];
  }
};

//---------------------------------------------------------------------
// 🔹 PROTECTED API: Add favorite city
export const addFavorite = async (city, country) => {
  try {
    const { data } = await axios.post(
      `${API_BASE}/favorites`,
      { city, country },
      { headers: getAuthHeaders() }
    );
    return data;
  } catch (err) {
    console.error('❌ Add favorite failed:', err.message);
    throw err;
  }
};


// 🔹 PROTECTED API: Delete favorite city
export const deleteFavorite = async (id) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE}/favorites/${id}`,
      { headers: getAuthHeaders() }
    );
    return data;
  } catch (err) {
    console.error('❌ Delete favorite failed:', err.message);
    throw err;
  }
};
