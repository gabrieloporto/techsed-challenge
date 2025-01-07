import { Product } from "../types";

// Calcula el porcentaje de ahorro
export const calculateSavingsPercentage = (product: Product) => {
  const savings = product.listingPrice! - product.price;
  const savingsPercentage = (savings / product.listingPrice!) * 100;

  return `${savingsPercentage.toFixed(0)}% OFF`;
};

// Formatea el precio de un producto
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0, // Elimina los decimales
  })
    .format(price)
    .replace(/\s/g, ""); // Elimina cualquier espacio en blanco
};
