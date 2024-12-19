"use client";

import React from "react";
import Cart from "./components/Cart/Cart";
import useCart from "./hooks/useCart";
import products from "./mocks/productData";
import Product from "./components/Product/Product";

export default function App() {
  const { cart, handleAddToCart, handleRemoveFromCart } = useCart();

  return (
    <main className="container mx-auto lg:ml-[10%] lg:mr-[23%] px-4 py-8">
      <h1 className="text-3xl lg:ml-[10%] lg:mr-[23%] font-bold mb-8">
        Catálogo de Productos
      </h1>

      <article className="flex flex-col lg:ml-[10%] lg:mr-[23%] justify-center items-center">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            cartItems={cart.items}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </article>

      <footer className="mt-8">
        <Cart items={cart.items} />
      </footer>
    </main>
  );
}
