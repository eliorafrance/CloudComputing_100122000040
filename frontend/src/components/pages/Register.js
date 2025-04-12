import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const validateForm = () => {
    // Password validation
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Password strength validation
    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form inputs
    if (!validateForm()) {
      return;
    }
    
    try {
      // In a real app, this would be an API call to register the user
      console.log('Registering user:', userData);
      
      // Simulate successful registration
      // Replace with actual registration logic
      if (userData.name && userData.email && userData.password) {
        // For demo purposes - simulate successful registration
        // In reality, you would send this data to your backend API
        
        // Redirect to login page after successful registration
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">Register</button>
        </div>
        
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;