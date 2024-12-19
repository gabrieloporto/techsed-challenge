import { useState } from "react";
import { Product as ProductType, Cart as CartType } from "../types";

export default function useCart() {
  const [cart, setCart] = useState<CartType>({
    id: "1",
    items: [],
    createdAt: new Date(),
  });

  const handleAddToCart = (product: ProductType, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity,
        };
        return { ...prevCart, items: updatedItems };
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity }],
        };
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  return { cart, handleAddToCart, handleRemoveFromCart };
}
