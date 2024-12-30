import { CartItem } from "@/app/types";
import { formatPrice } from "@/app/utils/productUtils";
import { useMemo } from "react";

export default function CartProductDetails({ item }: { item: CartItem }) {
  const price = useMemo(() => formatPrice(item.product.price), [item]);

  return (
    <div className="w-full h-full flex justify-between p-2 ml-4">
      <div>
        <p className="w-28 md:w-48 lg:w-full truncate text-sm font-medium text-gray-700">
          {item.product.title}
        </p>
        <div className="text-sm font-normal text-gray-500">
          Cantidad: {item.quantity}
        </div>
      </div>

      <p className="text-right text-sm font-medium text-gray-900">{price}</p>
    </div>
  );
}
