

// local server
// export const config = {                       // local server
//   serverUrl:'http://localhost:5000/api',
// };

// deployed server :
export const config = {                       
  serverUrl: import.meta.env.VITE_API_URL
};

// deployed server :
// const API_BASE = "https://mern-city-weather-tracker-backend.onrender.com/api";
// const API_BASE = import.meta.env.VITE_API_URL;