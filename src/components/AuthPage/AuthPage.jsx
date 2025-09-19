import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
 import LeftSide from "./LeftSide";
 import RegisterForm from "./RegisterForm";

import "./AuthPage.css";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "register" : "login");
  };

  if (isLoggedIn) {
    return <h1>Welcome! You are logged in.</h1>;
  }

  return (
    <div className="auth-page">
      { <LeftSide /> }
      <div className="auth-form-container">
        {currentForm === "login" ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          
          <h2>Register Form Coming Soon</h2>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
