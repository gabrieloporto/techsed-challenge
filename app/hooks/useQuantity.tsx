import { useState } from "react";
import { CartItem, Product } from "../types";
import { useCart } from "./useCart";

interface UseQuantityProps {
  product: Product;
}

export default function useQuantity({ product }: UseQuantityProps) {
  // Obtiene el carrito y las funciones para añadir y remover productos
  const { cart, addToCart, removeFromCart } = useCart();
  // Obtiene los productos del carrito
  const cartItems = cart.items;

  // Incializa el estado de la cantidad del producto en 0
  const [quantity, setQuantity] = useState(0);

  // Obtiene la cantidad de un producto en el carrito
  const getCartItemQuantity = (cart: CartItem[], productId: number): number => {
    const item = cart.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };
  const cartItemQuantity = getCartItemQuantity(cartItems, product.id);

  // Maneja el cambio de la cantidad del producto
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  // Maneja la acción de añadir al carrito
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  // Maneja la acción de remover del carrito
  const handleRemoveFromCart = () => {
    if (cartItemQuantity > 0) {
      removeFromCart(product.id);
      setQuantity(0);
    }
  };

  return {
    quantity,
    handleQuantityChange,
    handleAddToCart,
    handleRemoveFromCart,
    cartItemQuantity,
  };
}
