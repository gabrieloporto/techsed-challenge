"use client";

import React, { useState } from "react";
import { Product as ProductType, Cart as CartType } from "./types";
import Product from "./components/Product";
import Cart from "./components/Cart";

const products: ProductType[] = [
  {
    id: 100012,
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382038/techsed_assets/yxazajhglqwdhzoalu6c.webp",
  },
  {
    id: 2060,
    title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
    description:
      "Ceramica esmaltada36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
    price: 13031,
    stock: 5,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.68,
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382031/techsed_assets/iuahvvphzwb6zbyhemaw.webp",
  },
  {
    id: 10035,
    title: "Hierro 25 mm x 12 m Acindar",
    description: "HIERRO 25 MM X 12M",
    price: 76293,
    listingPrice: 89757,
    stock: 5,
    salesUnit: "unit",
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382459/techsed_assets/eowj2dspjipmsacmpgpx.webp",
  },
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartType>({
    id: "1",
    items: [],
    createdAt: new Date(),
  });

  const handleAddToCart = (product: ProductType, quantity: number) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity,
        };
        return { ...prevCart, items: updatedItems };
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, { product, quantity }],
        };
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product.id !== productId),
    }));
  };

  return (
    <div className="container mx-auto lg:ml-[10%] lg:mr-[23%] px-4 py-8">
      <h1 className="text-3xl lg:ml-[10%] lg:mr-[23%] font-bold mb-8">
        Catálogo de Productos
      </h1>
      <div className="flex flex-col lg:ml-[10%] lg:mr-[23%] justify-center items-center">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            cartItems={cart.items}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
      <div className="mt-8">
        <Cart items={cart.items} />
      </div>
    </div>
  );
};

export default App;
