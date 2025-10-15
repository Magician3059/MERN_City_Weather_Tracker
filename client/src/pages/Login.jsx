import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../services/user';
import { AuthContext } from '../App';

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [info, setInfo] = useState({ email: '', password: '' });

  const onLogin = async () => {
    if (!info.email) {
      toast.warn('Please enter email');
      return;
    }
    if (!info.password) {
      toast.warn('Please enter password');
      return;
    }

    try {
      const { email, password } = info;
      const result = await loginUser(email, password);

      if (result.status === 'success') {
        toast.success('Welcome to my weather app!');

        const { token, firstName, lastName } = result.data;

        // ✅ Store user info + token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);

        // ✅ Update context
        setUser({ firstName, lastName, email });

        navigate('/');
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'Login error');
    }
  };

  return (
    <div>
      <h1 className="page-header">Login</h1>
      <div className="container">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <div className="mb-3">
            Don't have an account yet? Register <Link to="/register">here</Link>
          </div>
          <button className="btn btn-success" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
