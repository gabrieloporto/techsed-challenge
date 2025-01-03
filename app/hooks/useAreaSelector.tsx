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
  const [area, setArea] = useState<number | string>(
    initialQuantity * product.unitValue!
  );
  const [boxes, setBoxes] = useState<number | string>(initialQuantity);

  const maxArea = product.stock * product.unitValue!;

  useEffect(() => {
    setArea(initialQuantity * product.unitValue!);
    setBoxes(initialQuantity);
  }, [initialQuantity, product]);

  const validateArea = (value: number): number => {
    if (value < product.unitValue!) return product.unitValue!;
    if (value > maxArea) return maxArea;
    return Math.ceil(value / product.unitValue!) * product.unitValue!;
  };

  const validateBoxes = (value: number): number => {
    if (value < 1) return 1;
    if (value > product.stock) return product.stock;
    return Math.ceil(value);
  };

  const handleAreaBlur = () => {
    const numericArea = parseFloat(area.toString()) || 0;
    const validArea = validateArea(numericArea);
    setArea(validArea);
    const newBoxes = validArea / product.unitValue!;
    setBoxes(newBoxes);
    onQuantityChange(newBoxes);
  };

  const handleBoxesBlur = () => {
    const numericBoxes = parseInt(boxes.toString(), 10) || 0;
    const validBoxes = validateBoxes(numericBoxes);
    setBoxes(validBoxes);
    setArea(validBoxes * product.unitValue!);
    onQuantityChange(validBoxes);
  };

  const incrementBoxes = () => {
    const validBoxes = validateBoxes(Number(boxes) + 1);
    setBoxes(validBoxes);
    setArea(validBoxes * product.unitValue!);
    onQuantityChange(validBoxes);
  };

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
