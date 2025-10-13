import { useState } from 'react';
import WeatherSearch from '../components/WeatherSearch';
import WeatherDisplay from '../components/WeatherDisplay';

const Home = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1> Weather </h1>
      <WeatherSearch onWeather={setWeather} />
      <WeatherDisplay weather={weather} />
    </div>
  );
};

export default Home;
