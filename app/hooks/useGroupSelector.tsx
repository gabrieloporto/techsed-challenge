import { useEffect, useState } from "react";
import { Product } from "../types";

interface UseGroupSelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

export default function useGroupSelector({
  product,
  initialQuantity = 0,
  onQuantityChange,
}: UseGroupSelectorProps) {
  // Cantidad de unidades
  const [units, setUnits] = useState<number | string>(
    initialQuantity * product.unitValue!
  );
  // Cantidad de pallets
  const [pallets, setPallets] = useState<number | string>(initialQuantity);

  // Cantidad máxima de unidades
  const maxUnits = product.stock * product.unitValue!;

  // Actualizar unidades y pallets al cambiar la cantidad inicial
  useEffect(() => {
    setUnits(initialQuantity * product.unitValue!);
    setPallets(initialQuantity);
  }, [initialQuantity, product]);

  // Validación común para unidades
  const validateUnits = (value: number): number => {
    if (value < product.unitValue!) return product.unitValue!;
    if (value > maxUnits) return maxUnits;
    return Math.ceil(value / product.unitValue!) * product.unitValue!;
  };

  // Validación común para pallets
  const validatePallets = (value: number): number => {
    if (value < 1) return 1;
    if (value > product.stock) return product.stock;
    return Math.ceil(value);
  };

  // Manejo de unidades
  const handleUnitsBlur = () => {
    const numericUnits = parseInt(units.toString(), 10) || 0;
    const validUnits = validateUnits(numericUnits);
    setUnits(validUnits);
    const newPallets = validUnits / product.unitValue!;
    setPallets(newPallets);
    onQuantityChange(newPallets);
  };

  // Manejo de pallets
  const handlePalletsBlur = () => {
    const numericPallets = parseInt(pallets.toString(), 10) || 0;
    const validPallets = validatePallets(numericPallets);
    setPallets(validPallets);
    setUnits(validPallets * product.unitValue!);
    onQuantityChange(validPallets);
  };

  // Incrementar pallets
  const incrementPallets = () => {
    const validPallets = validatePallets(Number(pallets) + 1);
    setPallets(validPallets);
    setUnits(validPallets * product.unitValue!);
    onQuantityChange(validPallets);
  };

  // Decrementar pallets
  const decrementPallets = () => {
    const validPallets = validatePallets(Number(pallets) - 1);
    setPallets(validPallets);
    setUnits(validPallets * product.unitValue!);
    onQuantityChange(validPallets);
  };

  return {
    units,
    pallets,
    setUnits,
    setPallets,
    handleUnitsBlur,
    handlePalletsBlur,
    incrementPallets,
    decrementPallets,
  };
}
