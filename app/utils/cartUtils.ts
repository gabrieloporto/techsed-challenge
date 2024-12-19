import { CartItem } from "../types";

// Calcula la suma total de los productos en el carrito
export const totalSum = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
