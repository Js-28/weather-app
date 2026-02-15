// components/Navbar.js
import React from 'react';
import { FaCloudSun, FaSignOutAlt } from "react-icons/fa";

export default function Navbar({ onLogout }) {
  return (
    <header className="navbar-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-lg d-flex justify-content-between align-items-center">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#">
            <FaCloudSun size={32} />
            Weather App
          </a>
          <button type="button" className="btn logout-btn" onClick={onLogout}>
            <FaSignOutAlt size={20}/>
            <span className="ms-1">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
