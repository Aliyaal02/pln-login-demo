import React from 'react';
import { useAuth } from '../utils/authContext';
import './Navbar.css';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            type="button"
            aria-label="Buka menu"
          >
            ☰
          </button>
          <div className="navbar-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">PLN</span>
          </div>
        </div>

        <div className="navbar-content">
          <span className="user-greeting">Halo, {user?.fullName}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
