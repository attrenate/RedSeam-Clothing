import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total, setCart } = useCart();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Mock API call to pre-populate email
  useEffect(() => {
    const fetchUserEmail = async () => {
      // Simulate API call
      setTimeout(() => {
        setEmail("user@example.com");
      }, 500);
    };
    fetchUserEmail();
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !zipCode || !address) {
      alert("Please fill in all fields.");
      return;
    }

    setShowModal(true);
    setCart([]); // Clear cart
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Uh-oh, you've got nothin in your cart just yet!</p>
          <button
            onClick={() => navigate("/products")}
            className="shop-now-btn"
          >
            Start Shopping 🛒
          </button>
        </div>
      ) : (
        <>
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="cart-item"
                >
                  <img
                    src={item.cover_image || item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: ${item.price}</p>

                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.color,
                            item.size,
                            Math.max(item.quantity - 1, 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        removeFromCart(item.id, item.color, item.size)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Summary</h3>
              <p>Total items: {cart.length}</p>
              <p>Total price: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Checkout Form */}
          <form className="checkout-form" onSubmit={handleCheckout}>
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit" className="checkout-btn">
              Submit Order
            </button>
          </form>

          {/* Congratulatory Modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>🎉 Order Successful!</h2>
                <p>Thank you for your purchase, {firstName}!</p>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
