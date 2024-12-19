import { useState } from "react";
import { Product as ProductType, Cart as CartType } from "../types";

export default function useCart() {
  // Estado para almacenar el carrito
  const [cart, setCart] = useState<CartType>({
    id: "1",
    items: [],
    createdAt: new Date(),
  });

  // Función para añadir un producto al carrito
  const handleAddToCart = (product: ProductType, quantity: number) => {
    setCart((prevCart) => {
      // Comprobar si el producto ya está en el carrito
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );
      // si el producto ya está en el carrito, actualizar la cantidad
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity,
        };
        return { ...prevCart, items: updatedItems };
      } else {
        // si el producto no está en el carrito, añadirlo
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity }],
        };
      }
    });
  };

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (productId: number) => {
    // Filtrar los productos que no coincidan con el id del producto a eliminar
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  return { cart, handleAddToCart, handleRemoveFromCart };
}
