import React, { createContext, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
      <div 
        className="d-flex flex-column min-vh-100 bg-light"
        style={{ 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
          transition: 'all 0.3s ease'
        }}
      >
        <Navbar user={user} setUser={setUser} />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/favorites"
              element={<PrivateRoute user={user}><FavoritesList /></PrivateRoute>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        {/*  To make footer stick to bottom we keep it outside the div  */}
         <Footer/> 
      </div>

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
