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
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity!.toString());

  useEffect(() => {
    setQuantity(initialQuantity);
    setInputValue(initialQuantity!.toString());
  }, [initialQuantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numericValue = parseFloat(value);
    const calculatedQuantity = calculateQuantity(product, numericValue);
    if (isValidQuantity(product, calculatedQuantity)) {
      setQuantity(calculatedQuantity);
      onQuantityChange(calculatedQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity! + 1;
    if (isValidQuantity(product, newQuantity)) {
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

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
