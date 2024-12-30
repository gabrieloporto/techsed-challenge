import { useEffect, useState } from "react";
import { Product } from "../types";

interface QuantitySelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

export default function useProductQuantity({
  product,
  onQuantityChange,
  initialQuantity,
}: QuantitySelectorProps) {
  // Inicializamos los estados con la cantidad inicial
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity!.toString());

  // Calcula la cantidad de productos a comprar
  const calculateQuantity = (product: Product, value: number): number => {
    if (product.salesUnit === "group")
      return Math.floor(value / product.unitValue!) * product.unitValue!;
    if (product.salesUnit === "area")
      return Math.ceil(value / product.unitValue!);
    return Math.floor(value);
  };

  // Verifica si la cantidad de productos a comprar es válida
  const isValidQuantity = (product: Product, quantity: number): boolean => {
    if (quantity > product.stock) return false;
    return true;
  };

  // Actualizamos los estados si la cantidad inicial cambia
  useEffect(() => {
    setQuantity(initialQuantity);
    setInputValue(initialQuantity!.toString());
  }, [initialQuantity]);

  // Manejamos el cambio de la cantidad
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numericValue = parseFloat(value);
    // Calculamos la cantidad y la validamos
    const calculatedQuantity = calculateQuantity(product, numericValue);
    if (isValidQuantity(product, calculatedQuantity)) {
      // Actualizamos la cantidad y llamamos a la función de cambio
      setQuantity(calculatedQuantity);
      onQuantityChange(calculatedQuantity);
    }
  };

  // Incrementamos la cantidad
  const incrementQuantity = () => {
    const newQuantity = quantity! + 1;
    if (isValidQuantity(product, newQuantity)) {
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

  // Decrementamos la cantidad
  const decrementQuantity = () => {
    const newQuantity = quantity! - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

  return {
    inputValue,
    handleInputChange,
    incrementQuantity,
    decrementQuantity,
  };
}
