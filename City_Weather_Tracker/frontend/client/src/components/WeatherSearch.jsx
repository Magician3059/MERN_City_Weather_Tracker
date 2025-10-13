import { useState } from 'react';
import { fetchWeather, addFavorite } from '../services/api';

const WeatherSearch = ({ onWeather }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) return setError('Please enter a city');
    try {
      const data = await fetchWeather(city);
      onWeather(data);
      setError('');
    } catch {
      setError('City not found');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSave = async (weather) => {
    try {
      await addFavorite(weather.name, weather.sys.country);
      alert('City added to favorites!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add favorite');
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="card-title mb-3 text-center text-primary">Search Weather</h3>
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
    </div>
  );
};

export default WeatherSearch;
