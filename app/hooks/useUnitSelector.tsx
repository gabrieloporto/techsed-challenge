import { useEffect, useState } from "react";
import { Product } from "../types";

interface UseUnitSelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

export default function useUnitSelector({
  product,
  onQuantityChange,
  initialQuantity,
}: UseUnitSelectorProps) {
  // Inicializamos los estados con la cantidad inicial
  const [quantity, setQuantity] = useState(initialQuantity || 0);
  const [inputValue, setInputValue] = useState(
    initialQuantity?.toString() || "0"
  );

  // Calcula la cantidad válida de productos
  const calculateQuantity = (value: number): number => {
    if (value > product.stock) return product.stock; // No exceder el stock
    if (value < 0) return 0; // No permitir valores negativos
    return Math.floor(value); // Redondear a números enteros
  };

  // Manejar cambios manuales en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Solo permitir números
      setInputValue(value);
    }
  };

  // Validar y actualizar la cantidad al salir del input
  const handleInputBlur = () => {
    const numericValue = parseInt(inputValue, 10) || 0;
    const validQuantity = calculateQuantity(numericValue);
    setQuantity(validQuantity);
    setInputValue(validQuantity.toString());
    onQuantityChange(validQuantity); // Actualizar el carrito
  };

  // Incrementar la cantidad
  const incrementQuantity = () => {
    const newQuantity = calculateQuantity(quantity + 1);
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
    onQuantityChange(newQuantity);
  };

  // Decrementar la cantidad
  const decrementQuantity = () => {
    const newQuantity = calculateQuantity(quantity - 1);
    setQuantity(newQuantity);
    setInputValue(newQuantity.toString());
    onQuantityChange(newQuantity);
  };

  // Actualizar el estado si la cantidad inicial cambia
  useEffect(() => {
    setQuantity(initialQuantity || 0);
    setInputValue(initialQuantity?.toString() || "0");
  }, [initialQuantity]);

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleInputBlur,
    incrementQuantity,
    decrementQuantity,
  };
}
