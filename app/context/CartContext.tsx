"use client";

import { createContext, useState, ReactNode } from "react";
import { Product, Cart } from "../types";

interface CartContextProps {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider: React.FC<{
  children: ReactNode;
  initialCart?: Cart;
}> = ({ children, initialCart }) => {
  // Estado del carrito
  const [cart, setCart] = useState<Cart>(
    initialCart || { id: "1", items: [], createdAt: new Date() }
  );

  // Añade un producto al carrito
  const addToCart = (product: Product, quantity: number) => {
    // Si el producto ya está en el carrito, actualiza la cantidad
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );

      const adjustedQuantity = Math.min(quantity, product.stock);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: adjustedQuantity,
        };
        return { ...prevCart, items: updatedItems };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { product, quantity: adjustedQuantity }],
      };
    });
  };

  // Elimina un producto del carrito
  const removeFromCart = (productId: number) => {
    // Filtra los items que no sean el producto a eliminar
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
