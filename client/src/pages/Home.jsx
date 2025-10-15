import { useState } from 'react';
import WeatherSearch from '../components/WeatherSearch';
import WeatherDisplay from '../components/WeatherDisplay';

const Home = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Weather Tracker</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <WeatherSearch onWeather={setWeather} />
        </div>
      </div>

      {weather && (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <WeatherDisplay weather={weather} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
