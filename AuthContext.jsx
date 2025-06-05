// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, username, ... }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, get user from localStorage (simulate persistent login)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Simulate Google login success and returning user data
  // googleUserData should contain at least { id, email }
  function login(googleUserData) {
    // For returning user: no username required
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (
      savedUser &&
      savedUser.id === googleUserData.id &&
      savedUser.email === googleUserData.email
    ) {
      setUser(savedUser);
      return true;
    }
    // If no saved user found, force register (you can customize)
    return false;
  }

  // Register: googleUserData + username
  function register(googleUserData, username) {
    if (!username) return false;

    // Create user object and save to localStorage (simulate backend)
    const newUser = {
      id: googleUserData.id,
      email: googleUserData.email,
      username,
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
