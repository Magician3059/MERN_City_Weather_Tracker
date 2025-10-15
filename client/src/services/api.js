import axios from 'axios';

// const API_BASE = "https://mern-city-weather-tracker-backend.onrender.com/api";
const API_BASE = import.meta.env.VITE_API_URL; 

export const fetchWeather = async (city) => {
  const { data } = await axios.get(`${API_BASE}/weather?q=${city}`);
  return data;
};
// export const getFavorites = async () => {
//   const { data } = await axios.get(`${API_BASE}/favorites`);
//   return data;
// };
// pagination
export const getFavorites = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/favorites?page=${page}`); // use API_BASE
    if (res.data && res.data.data) {
      return res.data; // paginated response
    }
    return res.data || []; // fallback for old behavior
  } catch (err) {
    console.error('API error:', err);
    return [];
  }
};

//---------------------------------------------------------------------
export const addFavorite = async (city, country) => {
  const { data } = await axios.post(`${API_BASE}/favorites`, { city, country });
  return data;
};

export const deleteFavorite = async (id) => {
  const { data } = await axios.delete(`${API_BASE}/favorites/${id}`);
  return data;
};
