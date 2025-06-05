import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function GoogleLoginButton({ onSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      // Send token to backend
      const res = await axios.post('http://localhost:5000/google-login', { token: credential });
      
      // Call the onSuccess callback with user data
      onSuccess(res.data.user);
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
    </div>
  );
}
