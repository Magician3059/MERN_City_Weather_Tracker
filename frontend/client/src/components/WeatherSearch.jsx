import { useState } from 'react';
import { fetchWeather } from '../services/api';
import { toast } from 'react-toastify';

const WeatherSearch = ({ onWeather }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      toast.warning('Please enter a city name');
      return;
    }

    setLoading(true);

    try {
      const data = await fetchWeather(city.trim());
      onWeather(data);
      toast.success(`Weather fetched for ${city.trim()}`);
      // after successful search, clear input
      setCity('');
    } catch {
      toast.error('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) handleSearch();
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
          disabled={loading}
        />
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  );
};

export default WeatherSearch;
