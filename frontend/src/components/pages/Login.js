import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // In a real app, this would be an API call to authenticate
      console.log('Logging in with:', credentials);
      
      // Simulate successful login
      // Replace with actual authentication logic
      if (credentials.email && credentials.password) {
        // For demo purposes - validate a test email/password
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          // Store auth token or user info in localStorage/sessionStorage
          localStorage.setItem('isLoggedIn', 'true');
          
          // Redirect to contacts list
          navigate('/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Please enter email and password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">Login</button>
        </div>
        
        <div className="auth-links">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;