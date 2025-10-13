import React from 'react';
import { addFavorite } from '../services/api';

const WeatherDisplay = ({ weather, onFavoriteAdded }) => {
  if (!weather) return null;

  const handleAddFavorite = async () => {
    try {
      await addFavorite(weather.name, weather.sys.country);
      alert(`${weather.name} added to favorites!`);
      if (onFavoriteAdded) onFavoriteAdded(); // optional callback to refresh list
      
       
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add favorite');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{weather.name}, {weather.sys.country}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>Weather: {weather.weather[0].description}</p>

      <button 
        onClick={handleAddFavorite} 
        style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer' }}
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default WeatherDisplay;
