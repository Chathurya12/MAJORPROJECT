import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to RegisterPage, since LoginPage is removed
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
