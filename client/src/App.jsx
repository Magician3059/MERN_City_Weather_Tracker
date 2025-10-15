import React, { createContext, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import FavoritesList from './components/FavoritesList';
import Login from './pages/Login';
import Register from './pages/Register';

// ✅ Auth context
export const AuthContext = createContext();

// ✅ Helper to get user from localStorage
const getUserFromStorage = () => {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const email = localStorage.getItem('email');
  return firstName && email ? { firstName, lastName, email } : null;
};

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getUserFromStorage);

  const handleLogout = () => {
    localStorage.clear(); // clears token + user info
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container">
          <Link className="navbar-brand" to="/">City Weather Tracker</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favorites">Favorites</Link>
                  </li>
                  <li className="nav-item">
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={handleLogout}                // logout handler            
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected Route */}
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute user={user}>
                <FavoritesList />
              </PrivateRoute>
            } 
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* Toast notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
}

export default App;
