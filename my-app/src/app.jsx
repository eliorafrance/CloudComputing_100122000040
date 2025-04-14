import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Login from './Login';
import Register from './Register';

// Simplified auth check (just check if token exists)
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Return true if token exists, false if not
};

// PrivateRoute component to protect routes requiring authentication
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// PublicRoute component to prevent authenticated users from accessing auth pages
const PublicRoute = ({ children }) => {
  const location = useLocation();

  if (isAuthenticated()) {
    return <Navigate to="/contactList" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="/contactList" element={<ContactList />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/edit-contact/:id" element={<ContactForm />} /> {/* 👈 this handles editing */}
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={
          isAuthenticated() 
            ? <Navigate to="/contactList" replace /> 
            : <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
