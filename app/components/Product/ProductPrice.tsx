import { Product } from "@/app/types";
import {
  calculateSavingsPercentage,
  formatPrice,
} from "@/app/utils/productUtils";
import { useMemo } from "react";

interface ProductPriceProps {
  product: Product;
}

export default function ProductPrice({ product }: ProductPriceProps) {
  const savingsPercentage = useMemo(
    () => calculateSavingsPercentage(product),
    [product]
  );

  const price = useMemo(() => formatPrice(product.listingPrice!), [product]);

  const unitPrice = useMemo(
    () => product.price / product.unitValue!,
    [product]
  );

  return (
    <div className="mb-2">
      <div className="flex flex-col py-2">
        <div className="flex items-center justify-between font-semibold text-gray-900">
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold">{formatPrice(product.price)}</p>
              {product.listingPrice && (
                <span className="text-xs text-white bg-secondary rounded-lg py-1 px-3">
                  {savingsPercentage}
                </span>
              )}
            </div>
            {product.salesUnit === "group" && product.unitValue && (
              <p className="text-xs text-gray-600 font-bold">PU: {unitPrice}</p>
            )}
            {product.listingPrice && (
              <p className="text-sm text-gray-400 line-through mb-2 font-normal">
                {price}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
