import React, { useState } from "react";

const RegisterForm = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const newUser = { name, email, password };
    console.log("Registering:", newUser);

    // TODO: connect with API (POST /register)
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

      <button type="submit">Register</button>

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
