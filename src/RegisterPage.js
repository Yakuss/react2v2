import './register-styles.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const RegisterPage = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const history = useHistory(); // Get history object for redirection

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/users/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User created successfully:', response.data);
      setIsRegistered(true);
      history.push('/'); // Redirect to login page
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {isRegistered ? (
        <p>Registration successful! Please proceed to Login. 

        </p>
      ) : (
        <form onSubmit={handleSubmit} className="user-form">
          <label>
            Username:
            <input type="text" name="username" onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <input type="submit" value="Register" />
        </form>
      )}
      <Link
       to="/"
       onClick={() => {
         window.location.href = "/";
       }}
      > Login page</Link>
    </div>
    
  );
};

export default RegisterPage;
