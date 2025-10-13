import { addFavorite } from '../services/api';

const WeatherDisplay = ({ weather, onFavoriteAdded }) => {
  if (!weather) return null;

  const handleAddFavorite = async () => {
    try {
      await addFavorite(weather.name, weather.sys.country);
      alert(`${weather.name} added to favorites!`);
      if (onFavoriteAdded) onFavoriteAdded();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add favorite');
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">{weather.name}, {weather.sys.country}</h3>
      </div>
      <div className="card-body">
        <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Weather:</strong> {weather.weather[0].description}</p>
        <button className="btn btn-success mt-3" onClick={handleAddFavorite}>
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
