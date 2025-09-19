import React, { useState } from "react";
//import "./LoginForm.css";

const LoginForm = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        
        window.location.reload(); 
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("Network error");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <p className="toggle-link">
        Don't have an account? <span onClick={toggleForm}>Register</span>
      </p>
    </div>
  );
};

export default LoginForm;
