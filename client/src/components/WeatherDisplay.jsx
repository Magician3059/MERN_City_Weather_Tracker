import { addFavorite } from '../services/api';
import { toast } from 'react-toastify';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null; // safety check if no weather data
  
  const handleAddFavorite = async () => {
     const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Please login to add favorites');
      return;
    }

    try {
      await addFavorite(weather.name, weather.sys?.country);
      toast.success(`${weather.name} added to favorites`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add favorite');
    }
  };

 return (
    <div 
      className="card shadow-lg border-0 mb-4"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1.0)';
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      }}
    >
      <div 
        className="card-header text-white text-center"
        style={{
          background: 'linear-gradient(90deg, #007bff, #00c6ff)',
          fontSize: '1.25rem',
          fontWeight: '600'
        }}
      >
        {weather.name}, {weather.sys.country}
      </div>
      <div className="card-body text-start p-4">
        <p><strong>🌡 Temperature:</strong> {weather.main.temp}°C</p>
        <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>🌬 Wind:</strong> {weather.wind.speed} m/s</p>
        <p><strong>☁️ Condition:</strong> {weather.weather[0].description}</p>
        <button 
          className="btn btn-success w-100 mt-3"
          onClick={handleAddFavorite}
          style={{
            borderRadius: '12px',
            boxShadow: '0 3px 10px rgba(40, 167, 69, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')} 
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
        >
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;