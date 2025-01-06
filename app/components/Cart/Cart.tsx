import CartList from "./CartList";
import CartCheckout from "./CartCheckout";
import { useCart } from "@/app/hooks/useCart";

const Cart = () => {
  const { cart } = useCart();
  const items = cart.items;

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
          <CartCheckout />
        </div>
      )}
    </section>
  );
};

export default Cart;
