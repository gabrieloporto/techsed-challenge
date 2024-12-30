import { useMemo } from "react";
import { CartItem } from "../../types";
import CartList from "./CartList";
import CartCheckout from "./CartCheckout";

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const totalSum = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = useMemo(() => totalSum(items), [items]);

  return (
    <section className="border border-gray-300 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {items.map((item) => (
            <CartList item={item} key={item.product.id} />
          ))}
          <CartCheckout total={total} />
        </div>
      )}
    </section>
  );
};

export default Cart;
