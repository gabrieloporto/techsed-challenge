"use client";

import Cart from "./components/Cart/Cart";
import products from "./data/productData";
import Product from "./components/Product/Product";
import { useCart } from "./hooks/useCart";

export default function App() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <main className="mx-auto lg:mx-32 xl:mx-60 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
      <article className="flex flex-col justify-center items-center">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            cartItems={cart.items}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </article>

      <footer className="mt-8">
        <Cart items={cart.items} />
      </footer>
    </main>
  );
}
