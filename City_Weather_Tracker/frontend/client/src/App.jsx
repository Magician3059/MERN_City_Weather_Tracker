import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import FavoritesList from './components/FavoritesList';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container">
          <Link className="navbar-brand" to="/">City Weather Tracker</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">Favorites</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
