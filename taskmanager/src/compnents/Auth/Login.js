import React, { useState } from "react";
import { login } from "../../services/authService";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await login({ email, password });
      console.log("Login successful, response:", response);
      localStorage.setItem("token", response.jwt);
      alert("Login successful!");
      navigate("/tasks")
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  const navigateToRegister = () => {
    // Navigate to the login page
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Sign In
        </button>
        <div className="register-link">
          Dont have an account? 
          <a href="/register" onClick={(e) => {
            e.preventDefault();
            navigateToRegister();
          }}>
            {" "}Register Here
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;