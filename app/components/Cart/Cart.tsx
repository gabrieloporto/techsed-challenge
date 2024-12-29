import React from "react";
import { CartItem } from "../../types";
import { totalSum } from "../../utils/cartUtils";
import CartList from "./CartList";
import CartCheckout from "./CartCheckout";

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const total = totalSum(items);

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
