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
      className="p-5 mx-auto text-center"
      style={{
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      <h2
        className="fw-bold mb-4"
        style={{
          color: '#007bff',
          letterSpacing: '1px',
        }}
      >
        🌤️ Search Weather
      </h2>

      <div
        className="d-flex justify-content-center align-items-center gap-2"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <input
          className="form-control form-control-lg shadow-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          disabled={loading}
          style={{
            borderRadius: '12px',
            border: '1px solid #dce3f0',
            padding: '14px 20px',
            flex: '1',
            fontSize: '1.1rem',
          }}
        />

        <button
          className="btn btn-primary btn-lg px-4"
          onClick={handleSearch}
          disabled={loading}
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(90deg, #007bff, #00c6ff)',
            boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
            fontWeight: '500',
            transition: '0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
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
