import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '' // ✅ renamed confirmPassword to confirm_password
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const { name, email, password, confirm_password } = userData; // ✅ use confirm_password
  
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password // ✅ send confirm_password as expected by backend
        })
      });
  
      const data = await response.json();
      console.log('Server response:', data);
  
      if (!response.ok) {
        setError(data.error || 'Registration failed'); // ✅ use data.error
      } else {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Register</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password:</label> 
          <input
            id="confirm_password"
            name="confirm_password"  
            type="password"
            value={userData.confirm_password}  
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
