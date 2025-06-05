// RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import { FaShieldAlt } from 'react-icons/fa';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleGoogleSuccess(data) {
    setGoogleUserData(data);
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!googleUserData) {
      setError('Please sign in with Google first.');
      return;
    }

    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    const success = register(googleUserData, username.trim());
    if (success) {
      navigate('/');
    } else {
      setError('Registration failed.');
    }
  }

  return (
    <div className="auth-container">
      <h2>Register To DeepFakeGuard</h2>
       <div className="logo-container" style={{ marginBottom: '16px' }}>
      <FaShieldAlt className="logo-icon" /></div>
      <GoogleLoginButton onSuccess={handleGoogleSuccess} />

      {googleUserData && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <button type="submit">Complete Registration</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
