import { useState } from 'react';
import { fetchWeather } from '../services/api';

const WeatherSearch = ({ onWeather }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    try {
      const data = await fetchWeather(city);
      onWeather(data); // Send data to parent
      setError('');
    } catch (err) {
      setError('City not found or API error');
      onWeather(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ padding: '10px', width: '250px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
        Search
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default WeatherSearch;
