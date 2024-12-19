import { Product, CartItem } from "../types";

export const calculateQuantity = (product: Product, value: number): number => {
  if (product.salesUnit === "group")
    return Math.floor(value / product.unitValue!) * product.unitValue!;
  if (product.salesUnit === "area")
    return Math.ceil(value / product.unitValue!);
  return Math.floor(value);
};

export const calculateSavingsPercentage = (product: Product) => {
  const savings = product.listingPrice! - product.price;
  const savingsPercentage = (savings / product.listingPrice!) * 100;

  return `${savingsPercentage.toFixed(0)}% OFF`;
};

export const isValidQuantity = (
  product: Product,
  quantity: number
): boolean => {
  if (quantity > product.stock) return false;
  return true;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  })
    .format(price)
    .replace(",00", "");
};

export const getCartItemQuantity = (
  cart: CartItem[],
  productId: number
): number => {
  const item = cart.find((item) => item.product.id === productId);
  return item ? item.quantity : 0;
};
