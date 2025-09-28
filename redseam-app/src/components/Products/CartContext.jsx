import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 const addToCart = (product, color, size, quantity) => {
  setCart((prev) => {
    const existingItem = prev.find(
      (item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) {
      // Update quantity if item already exists
      return prev.map((item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + Number(quantity) }
          : item
      );
    } else {
      // Add new item with correct quantity
      return [...prev, { ...product, color, size, quantity: Number(quantity) }];
    }
  });
};


 



  const removeFromCart = (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const updateQuantity = (id, color, size, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, total, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
