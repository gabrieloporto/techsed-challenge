import { useCart } from "@/app/hooks/useCart";
import { CartItem } from "@/app/types";
import { formatPrice } from "@/app/utils/productUtils";
import { useMemo } from "react";

export default function CartCheckout() {
  const { cart } = useCart();
  const items = cart.items;

  const totalSum = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = useMemo(() => totalSum(items), [items]);
  const totalPrice = useMemo(() => formatPrice(total), [total]);

  return (
    <div className="rounded-t-3xl bg-white p-6">
      <div className="mb-4">
        <div className="flex flex-row justify-between py-2">
          <p className="text-xl font-bold leading-6 text-black">Total</p>
          <p className="text-xl font-bold text-black">{totalPrice}</p>
        </div>
      </div>
      <button className="bg-primary hover:bg-black mb-2 h-12 w-full rounded-full px-4 py-2 text-white shadow-md focus:outline-none">
        Finalizar compra
      </button>
    </div>
  );
}
