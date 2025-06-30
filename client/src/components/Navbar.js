import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>What2Wear</h1>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/saved-looks">Saved Looks</Link>
      </div>
    </nav>
  );
};

export default Navbar;
