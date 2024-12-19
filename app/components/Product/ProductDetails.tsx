import { Product } from "@/app/types";
import React from "react";
import { FailedIcon, SuccessIcon } from "../UI/Icons";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="py-4">
      <p className="text-xs text-gray-400">SKU: {product.id}</p>
      <h1 className="text-xl font-medium leading-8 text-gray-900">
        {product.title}
      </h1>
      <div className="flex items-center gap-1">
        {product.stock > 0 ? <SuccessIcon /> : <FailedIcon />}
        <p className="text-sm">{product.stock > 0 ? "Stock disponible" : "Stock agotado"}</p>
      </div>
    </div>
  );
}
