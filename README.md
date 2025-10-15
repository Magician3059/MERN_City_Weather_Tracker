
# Weather & City Tracker

## **Description**

A full-stack web application to check the current weather for any city and manage a list of favorite cities. Built with **React, Node.js, Express, and MongoDB**.

**Features:**

* Search for any city and view current weather data.
* Save, view, and delete favorite cities (CRUD operations).
* Responsive UI using **Bootstrap**.
* Backend consumes **OpenWeatherMap API** for live weather data.
* Error handling for invalid cities and API issues.

---

## **Tech Stack**

* **Frontend:** React, Vite, Bootstrap, Axios, React Router, React Toastify
* **Backend:** Node.js, Express.js, MongoDB
* **Hosting/Deployment:**

  * Frontend: [Vercel](https://mern-city-weather-tracker.vercel.app)
  * Backend: [Render](https://mern-city-weather-tracker-backend.onrender.com)

---

## **Project Structure**

```
/backend
  server.js
  routes/
  controllers/
  config/
  package.json
/client
  package.json
  src/
    components/
    pages/
    App.jsx
    main.jsx
  vite.config.js
.gitignore
README.md
```

---

## **Setup & Installation (Local)**

1. Clone the repository:

```bash
git clone https://github.com/Magician3059/MERN_City_Weather_Tracker.git
```

2. **Backend Setup:**

```bash
cd backend
npm install
cp .env.example .env
```

**Add these to `.env`:**

```
MONGO_URI=<Your MongoDB URI>
WEATHER_API_KEY=<Your OpenWeatherMap API key>
PORT=5000
```

Start backend:

```bash
npm run dev
```

3. **Frontend Setup:**

```bash
cd client
npm install
cp .env.example .env
```

**Add these to `.env`:**

```
VITE_API_URL=https://mern-city-weather-tracker-backend.onrender.com/api
```

Start frontend:

```bash
npm run dev
```

Open in browser: `http://localhost:5173`

---

## **Usage**

1. Enter a city name in the search bar.
2. Click **Search** to view current weather.
3. Click **Add to Favorites** to save a city.
4. View, delete, or refresh your favorite cities list.

---

## **Deployment**

* **Frontend (Vercel):** [https://mern-city-weather-tracker.vercel.app](https://mern-city-weather-tracker.vercel.app)
* **Backend (Render):** [https://mern-city-weather-tracker-backend.onrender.com](https://mern-city-weather-tracker-backend.onrender.com)

---

## **Environment Variables**

* **Backend (`.env`)**

```
MONGO_URI=<MongoDB connection string>
WEATHER_API_KEY=<OpenWeatherMap API key>
PORT=5000
```

* **Frontend (`.env`)**

```
VITE_API_URL=https://mern-city-weather-tracker-backend.onrender.com/api
```

---

## **License**

MIT License

---

This is **ready to save directly on GitHub**.

If you want, I can also **add a "Screenshots / Demo" section** to make your README look more professional for submission.


