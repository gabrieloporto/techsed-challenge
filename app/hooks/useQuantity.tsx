import { useState } from "react";
import { getCartItemQuantity } from "../utils/productUtils";
import { ProductProps } from "../components/Product/Product";

export default function useQuantity({
  product,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: ProductProps) {
  const [quantity, setQuantity] = useState(0);
  const cartItemQuantity = getCartItemQuantity(cartItems, product.id);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
    }
  };

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
