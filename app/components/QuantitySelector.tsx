import React, { useState, useEffect } from "react";
import { Product } from "../types";
import { calculateQuantity, isValidQuantity } from "../utils/productUtils";
import { MinusIcon, PlusIcon } from "./UI/Icons";

interface QuantitySelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  product,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [inputValue, setInputValue] = useState(initialQuantity.toString());

  useEffect(() => {
    setQuantity(initialQuantity);
    setInputValue(initialQuantity.toString());
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
    const newQuantity = quantity + 1;
    if (isValidQuantity(product, newQuantity)) {
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setInputValue(newQuantity.toString());
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="mt-1 flex items-center space-x-2">
      <button
        className="rounded border p-1 hover:bg-gray-100 focus:outline-none active:bg-gray-300"
        onClick={decrementQuantity}
      >
        <MinusIcon />
      </button>
      <input
        className="w-16 rounded border p-1 text-center border-gray-100"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        disabled
      />
      <button
        className="rounded border p-1 hover:bg-gray-100 focus:outline-none active:bg-gray-300"
        onClick={incrementQuantity}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default QuantitySelector;
