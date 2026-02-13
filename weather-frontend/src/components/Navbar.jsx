// components/Navbar.js
import React from 'react';

export default function Navbar({ onLogout }) {
  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-lg d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="me-2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
            Weather App
          </a>
          <button type="button" className="btn logout-btn" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}
