import React, { createContext, useContext, useState } from "react";

// make a context
const CartContext = createContext();

// hook to use cart
export const useCart = () => useContext(CartContext);

// provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // add to cart
  const addToCart = (product, color, size) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.color === color &&
          item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.color === color &&
          item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, color, size, quantity: 1 }];
    });
  };

  // remove
  const removeFromCart = (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  // update qty
  const updateQuantity = (id, color, size, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
