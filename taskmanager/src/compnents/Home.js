import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Home.css"

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Task Management App✨🧾!</h1>
      <p>Choose an option to get started:</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Welcome;
