import './login-styles.css'; // Import your login page stylesheet
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null); 

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/users/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User logged in successfully:', response.data);
      const userId = response.data.split("Login successful!")[1];
      console.log('user:', userId);
      window.location.href = `/listing?userId=${userId}`; 
    } catch (error) {
      console.error('Error logging in:', error);
      setError(error.response.data || 'Login failed'); 
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Username:
          <input type="text" name="username" onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <input type="submit" value="Login" />
      </form>

      <Link
       to="/register"
       onClick={() => {
         window.location.href = "/register";
       }}
      > Register here</Link>
    </div>
  );
};

export default LoginPage;
