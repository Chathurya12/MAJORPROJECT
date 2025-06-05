import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';  // or './style.css' depending on your file name

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="334546713322-nqfkppmr7qfehs0gmd8r84uc4i2eu20s.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
