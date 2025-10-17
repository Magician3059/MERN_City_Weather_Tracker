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
      if (!data) {
        toast.error('City not found. Please try again.');
        return;
      }

      onWeather(data);
      toast.success(`Weather fetched for ${city.trim()}`);
      setCity('');
    } catch (err) {
      console.error('Error fetching weather:', err);
      toast.error('Failed to fetch weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) handleSearch();
  };

  return (
    <div
      className="p-4 p-md-5 mx-auto text-center"
      style={{
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}
    >
      <h2 className="fw-bold mb-4 text-primary">🌤️ Search Weather</h2>

      {/* ✅ Bootstrap responsive grid used here */}
      <div className="row g-3 justify-content-center">
        <div className="col-12 col-sm-8">
          <input
            className="form-control form-control-lg shadow-sm w-100"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter city name"
            disabled={loading}
            style={{
              borderRadius: '12px',
              border: '1px solid #dce3f0',
              padding: '14px 20px',
              fontSize: '1.1rem',
            }}
          />
        </div>

        <div className="col-12 col-sm-auto">
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={handleSearch}
            disabled={loading}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #007bff, #00c6ff)',
              boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
              fontWeight: '500',
              transition: '0.3s',
            }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Loading...
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
