import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import "../../css/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Password strength check
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await register({ name, email, password });
      
      // Check if registration was successful
      if (response && response.data) {
        alert(response.data.message || "Registration successful!");
        
        // Automatically navigate to login page after successful registration
        navigateToLogin();
      }
    } catch (error) {
      // More detailed error handling
      const errorMsg = error.response?.data?.message || 
                       "Registration failed. Please try again.";
      setError(errorMsg);
    }
  };

  const navigateToLogin = () => {
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Create an Account</h2>
        
        {error && (
          <p style={{ 
            color: 'red', 
            textAlign: 'center', 
            marginBottom: '15px' 
          }}>
            {error}
          </p>
        )}
        
        <input
          className="register-input"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <input
          className="register-input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          className="register-input"
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button 
          className="register-button" 
          type="submit"
        >
          Register
        </button>
        
        <div className="login-link">
          Already have an account? 
          <a href="/login" onClick={(e) => {
            e.preventDefault();
            navigateToLogin();
          }}>
            {" "}Login here
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;