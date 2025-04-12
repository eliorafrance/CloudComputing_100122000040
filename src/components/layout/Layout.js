// src/components/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Importing Outlet from react-router-dom
import Header from './Header'; // Importing Header component
import Footer from './Footer'; // Importing Footer component

function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="content-container">
        <Outlet /> {/* This will render the matched child route components */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;