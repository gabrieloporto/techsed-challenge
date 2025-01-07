import { useEffect, useState } from "react";
import { Product } from "@/app/types";

interface UseAreaSelectorProps {
  product: Product;
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export default function useAreaSelector({
  product,
  initialQuantity = 0,
  onQuantityChange,
}: UseAreaSelectorProps) {
  // Estado para el área calculada basado en la cantidad inicial y el valor unitario del producto
  const [area, setArea] = useState<number | string>(
    initialQuantity * product.unitValue!
  );
  // Estado para la cantidad de cajas basado en la cantidad inicial
  const [boxes, setBoxes] = useState<number | string>(initialQuantity);

  // Cálculo del área máxima disponible basado en el stock del producto y su valor unitario
  const maxArea = product.stock * product.unitValue!;

  // Efecto para actualizar el área y las cajas cuando cambian la cantidad inicial o el producto
  useEffect(() => {
    setArea(initialQuantity * product.unitValue!);
    setBoxes(initialQuantity);
  }, [initialQuantity, product]);

  // Función para validar el área ingresada
  const validateArea = (value: number): number => {
    if (value < product.unitValue!) return product.unitValue!;
    if (value > maxArea) return maxArea;
    return Math.ceil(value / product.unitValue!) * product.unitValue!;
  };

  // Función para validar la cantidad de cajas ingresada
  const validateBoxes = (value: number): number => {
    if (value < 1) return 1;
    if (value > product.stock) return product.stock;
    return Math.ceil(value);
  };

  // Maneja el evento blur del área, validando y actualizando el estado
  const handleAreaBlur = () => {
    const numericArea = parseFloat(area.toString()) || 0;
    const validArea = validateArea(numericArea);
    setArea(validArea);
    const newBoxes = validArea / product.unitValue!;
    setBoxes(newBoxes);
    onQuantityChange(newBoxes);
  };

  // Maneja el evento blur de las cajas, validando y actualizando el estado
  const handleBoxesBlur = () => {
    const numericBoxes = parseInt(boxes.toString(), 10) || 0;
    const validBoxes = validateBoxes(numericBoxes);
    setBoxes(validBoxes);
    setArea(validBoxes * product.unitValue!);
    onQuantityChange(validBoxes);
  };

  // Incrementa la cantidad de cajas, validando y actualizando el estado
  const incrementBoxes = () => {
    const validBoxes = validateBoxes(Number(boxes) + 1);
    setBoxes(validBoxes);
    setArea(validBoxes * product.unitValue!);
    onQuantityChange(validBoxes);
  };

  // Decrementa la cantidad de cajas, validando y actualizando el estado
  const decrementBoxes = () => {
    const validBoxes = validateBoxes(Number(boxes) - 1);
    setBoxes(validBoxes);
    setArea(validBoxes * product.unitValue!);
    onQuantityChange(validBoxes);
  };

  return {
    area,
    boxes,
    setArea,
    setBoxes,
    handleAreaBlur,
    handleBoxesBlur,
    incrementBoxes,
    decrementBoxes,
  };
}
