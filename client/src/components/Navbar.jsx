import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName');
  const initial = firstName ? firstName.charAt(0).toUpperCase() : '';

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-info" to="/">
          🌤️ Weather Tracker
        </Link>

        <div className="d-flex align-items-center ms-auto">
          {/* ✅ Avatar + Name only when logged in */}
          {user && firstName && (
            <div className="d-flex align-items-center me-4">
              <div
                className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center me-2"
                style={{
                  width: '45px',
                  height: '45px',
                  fontSize: '1.3rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                }}
              >
                {initial}
              </div>
              <div className="text-light small fw-semibold">{firstName}</div>
            </div>
          )}

          {/* ✅ Common links */}
          <Link to="/" className="nav-link text-light me-3">
            Home
          </Link>

          {/* ✅ Show "Favorites" only if user is logged in */}
          {user && (
            <Link to="/favorites" className="nav-link text-light me-3">
              Favorites
            </Link>
          )}

          {/* ✅ If not logged in → show Login button instead of Favorites/Logout */}
          {!user && (
            <Link
              to="/login"
              className="btn btn-outline-info btn-sm px-3 fw-semibold"
              style={{
                borderRadius: '12px',
                transition: '0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
            >
              Login
            </Link>
          )}

          {/* ✅ If logged in → show Logout */}
          {user && (
            <button
              className="btn btn-danger btn-sm px-3 fw-semibold"
              onClick={handleLogout}
              style={{
                borderRadius: '12px',
                transition: '0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
