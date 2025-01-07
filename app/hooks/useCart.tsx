import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Cart, Product } from "../types";

interface UseCartProps {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const useCart = (): UseCartProps => {
  // Implementación de useCart
  const context = useContext(CartContext);
  // Si no se encuentra el contexto, lanzar un error
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};
