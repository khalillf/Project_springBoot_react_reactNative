import React, { useState, useEffect } from 'react';
import '../css/LoginComponent.css';
import HeaderComponent from './Header';
import UserService from '../services/UserService'; 

function LoginComponent({ onLogin }) {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const storedId = localStorage.getItem('id');
    setId(storedId); 

    
    if (storedId) {
      UserService.getUserById(storedId)
        .then((res) => {
          const userData = res.data;
          setUsername(userData.username);
          setPassword(userData.password);
          setLoggedIn(true); 
        })
        .catch((error) => console.error('Error fetching user: ', error));
    }
  }, []); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, isadmin, id } = data; 
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id); 
        localStorage.setItem('isadmin', isadmin);
        setLoggedIn(true);
        onLogin(username);
        alert(data.message);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('isadmin'); 
    setLoggedIn(false);
  };

  return (
    <div className="container">
      <br />
      {loggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginComponent;
