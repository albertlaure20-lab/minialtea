import React, { useState } from 'react';
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sample login validation (replace this with actual login logic)
    const correctEmail = "admin@gmail.com";
    const correctPassword = "admin123";

    if (!email || !password) {
      setError('Please fill in all fields.');
    } else if (email !== correctEmail || password !== correctPassword) {
      setError('Incorrect email or password.');
    } else {
      setError('');
      onLogin(); // Proceed with login
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Mini Altea - Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="input-wrapper">
          <label htmlFor="email" className="input-label">Email</label>
          <div className="input-icon-wrapper">
            <FaUser className="input-icon" />
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="input-label">Password</label>
          <div className="input-icon-wrapper">
            <FaLock className="input-icon" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="*********"
              value={password}
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="options-row">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button className="btn login-btn" type="submit">Log In</button>

        <div className="social-login">
          <p className="social-text">Or log in with </p>
          <div className="social-icons">
            <FaGoogle className="icon google" title="Log in with Google" />
            <FaFacebookF className="icon facebook" title="Log in with Facebook" />
            <FaInstagram className="icon instagram" title="Log in with Instagram" />
          </div>
        </div>

        <p className="signup-text">
          Don't have an account yet? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
}
