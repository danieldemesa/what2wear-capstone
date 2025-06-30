import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#f3f4f6', padding: '1rem' }}>
      <h2>👕 What2Wear</h2>
      <div>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
