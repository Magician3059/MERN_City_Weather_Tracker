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
      // Check if city exists in API response
      if(!data) { toast.error('City not found. Please try again.'); return;}

      onWeather(data);// Send data to parent/component
      toast.success(`Weather fetched for ${city.trim()}`);
      setCity('');
    } catch(err){
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
      className="card shadow-lg border-0 p-4 mb-4 mx-auto"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        transition: 'all 0.4s ease',
        maxWidth: '550px'
      }}
    >
      <h3 className="card-title mb-4 text-center fw-bold text-primary">🌦️ Search Weather</h3>
      <div className="row g-2">
        <div className="col-8 col-sm-9">
          <input
            className="form-control form-control-lg shadow-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter city"
            disabled={loading}
            style={{ borderRadius: '12px' }}
          />
        </div>
        <div className="col-4 col-sm-3 d-grid">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSearch}
            disabled={loading}
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(90deg, #007bff, #00c6ff)',
              boxShadow: '0 4px 10px rgba(0, 123, 255, 0.4)',
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
            ) : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
