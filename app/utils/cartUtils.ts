import { CartItem } from "../types";

export const totalSum = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
