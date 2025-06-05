import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaSignInAlt,
  FaUserCircle,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsToggle = () => {
    setShowSettings((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/register');
  };

  return (
    <nav className="nav-gradient-animated">
      <div className="logo-container">
        <FaShieldAlt className="logo-icon" />
        <span className="logo-text">DeepfakeGuard</span>
      </div>

      <div>
        <NavLink to="/" className="nav-link" end>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/upload" className="nav-link">
          <FaUpload /> Upload
        </NavLink>
        <NavLink to="/history" className="nav-link">
          <FaHistory /> History
        </NavLink>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <span className="user-greeting">
              <FaUserCircle /> Hello, {user.username || user.email}
            </span>
            <button onClick={handleSettingsToggle} className="settings-button" title="Settings">
              <FaCog />
            </button>
            {showSettings && (
              <div className="settings-dropdown">
                <button onClick={handleLogout} className="settings-option">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link" onClick={() => navigate('/register')}>
              <FaSignInAlt /> Login
            </NavLink>
            <button onClick={handleSettingsToggle} className="settings-button" title="Settings">
              <FaCog />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
