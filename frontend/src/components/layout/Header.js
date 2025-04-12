// src/components/layout/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file

function Header() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Logout function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
    navigate('/Login'); // Redirect to login page after logout
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <h1>Contact Manager</h1>
        </div>

        <nav className="main-nav">
          <Link to="/">ContactList</Link>
          <Link to="/ContactForm">Add Contact</Link>

          {isLoggedIn ? ( // Conditionally render links based on login status
            <button onClick={handleLogout} className="logout-button">Logout</button> // Logout button
          ) : (
            <>
              <Link to="/Login">Login</Link>
              <Link to="/Register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;