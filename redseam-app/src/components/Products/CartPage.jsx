import React from "react";
import { useCart } from "../Products/CartContext"; 
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              
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
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${total}</h3>
          <button className="checkout-btn">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
