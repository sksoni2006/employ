import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="info-section">
          <div className="info-content">
            <h2>Welcome Back!</h2>
            <p>Log in to access your dashboard and manage your users efficiently.</p>
            <div className="feature-list">
              <div className="feature-item">
                <span>✓</span>
                <span>Manage user profiles</span>
              </div>
              <div className="feature-item">
                <span>✓</span>
                <span>Edit user information</span>
              </div>
              <div className="feature-item">
                <span>✓</span>
                <span>Secure authentication</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-header">
            <h1>Login</h1>
            <p>Please enter your credentials</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;