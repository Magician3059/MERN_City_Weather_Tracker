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
      const response  = await loginUser(email, password);
      

      if (response.status === 'success') {
        toast.success('Welcome to my weather app!');
   
       const userData = response.data || response; // works for both nested and direct
        console.log(" On Login we get Full Name : " + userData.firstName + " " + userData.lastName + " Token : " + userData.token);
        // const { token, firstName, lastName,email } = response.data;

        // ✅ Store user info + token in localStorage
        // localStorage.setItem('token', token);
        // localStorage.setItem('firstName', firstName);
        // localStorage.setItem('lastName', lastName);
        // localStorage.setItem('email', email);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('firstName', userData.firstName);
        localStorage.setItem('lastName', userData.lastName);
        localStorage.setItem('email', userData.email);

        // ✅ Update context
         // update context (fix variable references)
  setUser({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
  });

        navigate('/');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || 'Login error');
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
