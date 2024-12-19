import Image from "next/image";
import { CartItem } from "../../types";
import CartProductDetails from "./CartProductDetails";

export default function CartProduct({ item }: { item: CartItem }) {
  return (
    <li
      className="flex py-4 sm:py-6 border-b border-t border-gray-200"
      key={item.product.id}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        <Image
          src={item.product.imageUrl}
          alt={item.product.title}
          width={50}
          height={50}
          className="rounded-lg object-cover object-center"
        />
      </div>

      <CartProductDetails item={item} />
    </li>
  );
}
