
## 🌤️ Weather & City Tracker

### **Description**

A full-stack web application to check the current weather for any city and manage a list of favorite cities.
Now includes **user authentication (Register & Login)** with secure access to favorites.

Built with **React, Node.js, Express, and MongoDB**.

---

### **✨ Features**

#### 🧭 Core Features

* Search for any city and view current weather data.
* Save, view, and delete favorite cities (**CRUD operations**).
* Responsive UI using Bootstrap.
* Backend consumes **OpenWeatherMap API** for live weather data.
* Error handling for invalid cities and API issues.

#### 🔐 Newly Added Features

* **User Authentication System (Login/Register)**

  * Secure registration and login using JWT (JSON Web Token).
  * Authenticated users can save personal favorite cities.
* **User Service Integration**

  * Frontend communicates with new `/user` routes via `user.js` service.
* **Improved Frontend Structure**

  * New pages: `Login.jsx` and `Register.jsx`.
  * Config file (`config.js`) manages environment-based API URLs.
* **Toast Notifications & Protected Features**

  * Success and error toasts via React Toastify.
  * Favorite management restricted to logged-in users.

---

### **🧰 Tech Stack**

#### Frontend

* React (Vite)
* Bootstrap
* Axios
* React Router
* React Toastify

#### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

### **☁️ Hosting / Deployment**

* **Frontend:** Vercel
* **Backend:** Render

---

### **📁 Project Structure**

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
      Login.jsx
      Register.jsx
    services/
      api.js
      user.js
      config.js
    App.jsx
    main.jsx
  vite.config.js

.gitignore
README.md
```

---

### **⚙️ Setup & Installation (Local)**

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/Magician3059/MERN_City_Weather_Tracker.git
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

**Add these to `.env`:**

```
MONGO_URI=<Your MongoDB URI>
WEATHER_API_KEY=<Your OpenWeatherMap API key>
JWT_SECRET=<Your Secret Key>
PORT=5000
```

**Start backend:**

```bash
npm run dev
```

---

#### 3️⃣ Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

**Add these to `.env`:**

```
VITE_API_URL=https://mern-city-weather-tracker-backend.onrender.com/api
```

**Start frontend:**

```bash
npm run dev
```

**Open in browser:**
👉 [http://localhost:5173](http://localhost:5173)

---

### **💡 Usage**

1. Register a new user or log in.
2. Enter a city name in the search bar.
3. View current weather details.
4. Add to favorites (available only when logged in).
5. View or remove cities from your favorite list.

---

### **🚀 Deployment**

* **Frontend (Vercel):** [https://mern-city-weather-tracker.vercel.app](https://mern-city-weather-tracker.vercel.app)
* **Backend (Render):** [https://mern-city-weather-tracker-backend.onrender.com](https://mern-city-weather-tracker-backend.onrender.com)

---

### **🔑 Environment Variables**

#### Backend (.env)

```
MONGO_URI=<MongoDB connection string>
WEATHER_API_KEY=<OpenWeatherMap API key>
JWT_SECRET=<Secret key for JWT>
PORT=5000
```

#### Frontend (.env)

```
VITE_API_URL=https://mern-city-weather-tracker-backend.onrender.com/api
```

---

### **📸 (Optional) Screenshots / Demo**

You can add app screenshots here later, e.g.:

```
/assets/screenshots/
  login.png
  dashboard.png
  favorites.png
```

---

### **📜 License**

MIT License © 2025 Rushikesh Patil

---

