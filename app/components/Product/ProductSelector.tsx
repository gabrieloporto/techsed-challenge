import { Product } from "@/app/types";
import React from "react";
import UnitSelector from "./Selector/UnitSelector";
import GroupSelector from "./Selector/GroupSelector";
import AreaSelector from "./Selector/AreaSelector";

interface ProductSelectorProps {
  product: Product;
  quantity: number;
  cartItemQuantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export default function ProductSelector({
  product,
  cartItemQuantity,
  handleQuantityChange,
}: ProductSelectorProps) {
  return (
    <>
      {product.salesUnit === "group" ? (
        <GroupSelector
          product={product}
          onQuantityChange={handleQuantityChange}
          initialQuantity={cartItemQuantity}
        />
      ) : product.salesUnit === "area" ? (
        <AreaSelector
          product={product}
          onQuantityChange={handleQuantityChange}
          initialQuantity={cartItemQuantity}
        />
      ) : (
        <UnitSelector
          product={product}
          onQuantityChange={handleQuantityChange}
          initialQuantity={cartItemQuantity}
        />
      )}
    </>
  );
}
