import axios from 'axios';

const url = 'https://api.openweathermap.org/data/2.5/weather';


// Function to fetch weather data for a given city
export const fetchWeather = async (city) => {
  try {
     const resp = await axios.get(url, {
      params: { q: city, appid: process.env.OWM_KEY, units: 'metric' }
    });
    return resp.data;
  } catch (error) {
    console.error('Error fetching weather data:', error?.response?.data || error.message);
    throw new Error('Failed to fetch weather data');
  }
};

// export default { fetchWeather };
