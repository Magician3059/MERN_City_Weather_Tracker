import { useState } from 'react';
import WeatherSearch from '../components/WeatherSearch';
import WeatherDisplay from '../components/WeatherDisplay';

const Home = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <h1 className="text-center text-primary mb-4"> Weather Tracker</h1>

      {/* Weather Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <WeatherSearch onWeather={setWeather} />
        </div>
      </div>

      {/* Weather Display */}
      {weather && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <WeatherDisplay weather={weather} />  
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
