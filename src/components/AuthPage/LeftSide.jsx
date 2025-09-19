import React from "react";
//import "./LeftSide.css";

const LeftSide = () => {
  return (
    <div className="left-side">
      <div className="logo">
        <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
        <h1 className="logo-text">Redseam Clothing</h1>
      </div>
      <img
        src="/auth-image.jpg"
        alt="Fashion showcase"
        className="background-image"
      />
    </div>
  );
};

export default LeftSide;
