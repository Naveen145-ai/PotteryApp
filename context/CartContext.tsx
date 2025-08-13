import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Default export required so Expo Router doesn’t complain
export default CartProvider;
