import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.redberry.store/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <div className="login-form">
      <form className="login-form-content" onSubmit={handleLogin}>
        <h2 className="login-title">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <img
            src="/eye.png"
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {message && <p className="error">{message}</p>}
        <button type="submit" className="login-button">
          Log in
        </button>
        <p className="login-register-link">
          Not a member?{" "}
          <span
            className="form-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
