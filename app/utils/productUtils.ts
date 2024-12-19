import { Product, CartItem } from "../types";

// Calcula la cantidad de productos a comprar
export const calculateQuantity = (product: Product, value: number): number => {
  if (product.salesUnit === "group")
    return Math.floor(value / product.unitValue!) * product.unitValue!;
  if (product.salesUnit === "area")
    return Math.ceil(value / product.unitValue!);
  return Math.floor(value);
};

// Calcula el porcentaje de ahorro
export const calculateSavingsPercentage = (product: Product) => {
  const savings = product.listingPrice! - product.price;
  const savingsPercentage = (savings / product.listingPrice!) * 100;

  return `${savingsPercentage.toFixed(0)}% OFF`;
};

// Verifica si la cantidad de productos a comprar es válida
export const isValidQuantity = (
  product: Product,
  quantity: number
): boolean => {
  if (quantity > product.stock) return false;
  return true;
};

// Formatea el precio de un producto
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  })
    .format(price)
    .replace(",00", ""); // Elimina los decimales si son 00
};

// Obtiene la cantidad de un producto en el carrito
export const getCartItemQuantity = (
  cart: CartItem[],
  productId: number
): number => {
  const item = cart.find((item) => item.product.id === productId);
  return item ? item.quantity : 0;
};
