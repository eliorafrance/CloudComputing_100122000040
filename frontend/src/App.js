// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing Router, Routes, and Route
import './App.css'; // Link to your CSS file
import Layout from './components/layout/Layout'; // Path for Layout component
import ContactList from './components/pages/ContactList'; // Path for Contact List component
import ContactForm from './components/pages/ContactForm'; // Path for Contact Form component
import Login from './components/pages/Login'; // Path for Login component
import Register from './components/pages/Register'; // Path for Register component

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<ContactList />} /> {/* Display the list of contacts at home */}
                    <Route path="/ContactForm" element={<ContactForm />} /> {/* Route for adding contacts */}
                    <Route path="/Login" element={<Login />} /> {/* Route for login */}
                    <Route path="/Register" element={<Register />} /> {/* Route for registration */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;