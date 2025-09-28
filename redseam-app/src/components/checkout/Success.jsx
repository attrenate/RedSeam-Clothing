import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1 className="success-title">Congrats!</h1>
      <p className="success-message">Your order is placed successfully!</p>
      <button
        className="continue-btn"
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
