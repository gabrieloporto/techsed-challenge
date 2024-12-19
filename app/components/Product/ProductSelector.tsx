import { Product } from "@/app/types";
import React from "react";
import ProductQuantitySelector from "./ProductQuantitySelector";

interface ProductSelectorProps {
  product: Product;
  quantity: number;
  cartItemQuantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export default function ProductSelector({
  product,
  quantity,
  cartItemQuantity,
  handleQuantityChange,
}: ProductSelectorProps) {
  return (
    <div className="flex space-x-7">
      {product.salesUnit !== "unit" && (
        <div>
          <span className="text-sm font-medium">
            {product.salesUnit === "group"
              ? "Cantidad de unidades"
              : "Superficie"}
          </span>
          <div className="mt-1">
            <input
              className="w-16 rounded border p-1 text-center border-gray-100"
              type="text"
              defaultValue={
                quantity <= 1
                  ? product.unitValue
                  : product.unitValue! * quantity
              }
              disabled
              readOnly
            />
            <span className="ml-1 text-gray-400">
              {product.salesUnit === "area" ? "m²" : null}
            </span>
          </div>
        </div>
      )}
      <div>
        <span className="text-sm font-medium">
          {product.salesUnit === "group"
            ? "Cantidad de pallets"
            : product.salesUnit === "area"
            ? "Cantidad de cajas"
            : "Cantidad"}
        </span>
        <ProductQuantitySelector
          product={product}
          onQuantityChange={handleQuantityChange}
          initialQuantity={cartItemQuantity}
        />
      </div>
    </div>
  );
}
