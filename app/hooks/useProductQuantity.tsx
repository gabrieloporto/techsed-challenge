import { useEffect, useState } from "react";
import { calculateQuantity, isValidQuantity } from "../utils/productUtils";
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
