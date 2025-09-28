import React from "react";
import { useCart } from "../Products/CartContext";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, total } = useCart();
  const deliveryFee = total * 0.1;
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/success");
  };

  return (
    <div className="checkout-page">
      {/* Logo */}
      <div className="logo">
        <div className="logo-child">
          <img src="/Vector.png" alt="Redseam Logo" className="logo-icon" />
        </div>
        <h1 className="logo-text">Redseam Clothing</h1>
      </div>

      {/* Header */}
      <h1 className="checkout-header">Checkout</h1>

      {/* Order Details */}
      <div className="order-details">
        <h2>Order Details</h2>
        <div className="form-row">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
        </div>
        <input type="email" placeholder="Email" className="full-width-input" />
        <div className="form-row">
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Zip Code" />
        </div>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="cart-icons">
          <img src="/cart.png" alt="Cart" className="cart-icon" />
          <img src="/pfp.jpg" alt="Profile" className="profile-icon" />
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.cover_image || item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Summary */}
        <div className="price-summary">
          <p>Items subtotal: ${total.toFixed(2)}</p>
          <p>Delivery: ${deliveryFee.toFixed(2)}</p>
          <p className="total">Total: ${(total + deliveryFee).toFixed(2)}</p>
        </div>

        {/* Pay Button */}
        <button className="pay-btn" onClick={handlePay}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
