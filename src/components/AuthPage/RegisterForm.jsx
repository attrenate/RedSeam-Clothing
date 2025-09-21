import React, { useState } from "react";

const RegisterForm = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.redberry.store/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        toggleForm(); 
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Create an Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
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

      {message && <p>{message}</p>}

      <button type="submit" className="reg-btn">Register</button>

      <p>
        Already have an account?{" "}
        <span className="form-link" onClick={toggleForm}>
          Log in
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
