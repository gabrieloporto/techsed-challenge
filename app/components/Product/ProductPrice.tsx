import { Product } from "@/app/types";
import {
  calculateSavingsPercentage,
  formatPrice,
} from "@/app/utils/productUtils";

interface ProductPriceProps {
  product: Product;
}

export default function ProductPrice({ product }: ProductPriceProps) {
  return (
    <div className="mb-2">
      <div className="flex flex-col py-2">
        <div className="flex items-center justify-between font-semibold text-gray-900">
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-xl font-bold">{formatPrice(product.price)}</p>
              {product.listingPrice && (
                <span className="text-xs text-white bg-[#3C83F7] rounded-lg py-[2px] px-3">
                  {calculateSavingsPercentage(product)}
                </span>
              )}
            </div>
            {product.salesUnit === "group" && product.unitValue && (
              <p className="text-xs text-gray-600 font-bold">
                PU: {product.price / product.unitValue}
              </p>
            )}
            {product.listingPrice && (
              <p className="text-sm text-gray-400 line-through mb-2 font-normal">
                {formatPrice(product.listingPrice)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
