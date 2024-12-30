import { useState } from "react";
import { ProductProps } from "../components/Product/Product";
import { CartItem } from "../types";

export default function useQuantity({
  product,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: ProductProps) {
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
      onAddToCart(product, quantity);
    }
  };

  // Maneja la acción de remover del carrito
  const handleRemoveFromCart = () => {
    if (cartItemQuantity > 0) {
      onRemoveFromCart(product.id);
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
