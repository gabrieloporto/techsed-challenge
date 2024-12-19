import { CartItem } from "@/app/types";
import CartProduct from "./CartProduct";

export default function CartList({ item }: { item: CartItem }) {
  return (
    <ul role="list">
      <CartProduct item={item} key={item.product.id} />
    </ul>
  );
}
