import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // ✅ Remove the correct token
    navigate('/login'); // ✅ Redirect to login page
  };

  // ✅ Check if user is logged in by checking authToken
  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <h1>Contact Manager</h1>
        </div>

        <nav className="main-nav">
          <Link to="/contactList">ContactList</Link>
          <Link to="/contact-form">Add Contact</Link>

          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
