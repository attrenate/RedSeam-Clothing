import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const profilePic = "/pfp.jpg";

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://api.redberry.store/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        navigate("/"); // Redirect to login page
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <form className="login-form-content" onSubmit={handleRegister}>
      <h2 className="register-title">Registration</h2>
      <div className="register-profile-row">
        <img
          src={profilePic}
          alt="Profile"
          className="register-profile-pic"
        />
        <div className="register-profile-actions-horizontal">
          <div className="register-action upload">upload new</div>
          <div className="register-action remove">remove</div>
        </div>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="login-input"
        placeholder="Username *"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="login-input"
        placeholder="Email *"
      />
      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
          placeholder="Password *"
        />
        <img
          src="/eye.png"
          className="eye-icon"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </div>
      <div className="password-input-wrapper">
        <input
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="login-input"
          placeholder="Confirm password *"
        />
        <img
          src="/eye.png"
          className="eye-icon"
          onClick={() => setShowConfirm((prev) => !prev)}
        />
      </div>
      {message && <p>{message}</p>}
      <button type="submit" className="login-button">Register</button>
      <p>
        Already have an account?{" "}
        <span className="form-link" onClick={() => navigate("/")}>
          Log in
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
