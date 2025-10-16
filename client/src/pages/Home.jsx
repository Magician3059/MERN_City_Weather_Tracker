import { useState } from 'react';
import WeatherSearch from '../components/WeatherSearch';
import WeatherDisplay from '../components/WeatherDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [weather, setWeather] = useState(null);

 return (
    <div>
      <div className="container my-5 text-center">
        <div 
          className="card shadow-lg border-0 rounded-4 mx-auto fade-in"
          style={{ 
            maxWidth: '650px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          }}
        >
          <div className="card-body p-5">
            <WeatherSearch onWeather={setWeather} />
          </div>
        </div>

        {weather && (
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
              <WeatherDisplay weather={weather} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;