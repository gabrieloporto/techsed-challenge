import React, { useState } from "react";
import { Product as ProductType, CartItem } from "../types";
import {
  calculateSavingsPercentage,
  formatPrice,
  getCartItemQuantity,
} from "../utils/productUtils";
import QuantitySelector from "./QuantitySelector";
import Image from "next/image";
import { CartIcon, SuccessIcon } from "./UI/Icons";

interface ProductProps {
  product: ProductType;
  cartItems: CartItem[];
  onAddToCart: (product: ProductType, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const Product: React.FC<ProductProps> = ({
  product,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [quantity, setQuantity] = useState(0);
  const cartItemQuantity = getCartItemQuantity(cartItems, product.id);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItemQuantity > 0) {
      onRemoveFromCart(product.id);
      setQuantity(0);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center md:flex-row border-b border-gray-300 mb-4">
      <div className="mx-auto w-80">
        <div className="mb-4 overflow-hidden rounded-md">
          <Image
            alt={product.title}
            loading="lazy"
            width="400"
            height="400"
            decoding="async"
            className="max-w-[300px] h-80 cursor-pointer"
            src={product.imageUrl}
            style={{ color: "transparent" }}
          />
        </div>
      </div>
      <div className="flex h-auto w-full flex-col justify-between px-5">
        <div className="py-4">
          <p className="text-xs text-gray-400">SKU: {product.id}</p>
          <h1 className="text-xl font-medium leading-8 text-gray-900">
            {product.title}
          </h1>
          <div className="flex items-center gap-1">
            <SuccessIcon />
            <p className="text-sm">Stock disponible</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between">
          <div className="mb-2">
            <div className="flex flex-col py-2">
              <div className="flex items-center justify-between font-semibold text-gray-900">
                <div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-xl font-bold">
                      {formatPrice(product.price)}
                    </p>
                    {product.listingPrice && (
                      <span className="text-xs text-white bg-[#3C83F7] rounded-lg py-[2px] px-3">
                        {calculateSavingsPercentage(product)}
                      </span>
                    )}
                  </div>
                  {product.salesUnit === "group" && product.unitValue && (
                    <p className="text-xs text-gray-600 font-bold">
                      PU: {product.price / product.unitValue}
                    </p>
                  )}
                  {product.listingPrice && (
                    <p className="text-sm text-gray-400 line-through mb-2 font-normal">
                      {formatPrice(product.listingPrice)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-7">
            {product.salesUnit !== "unit" && (
              <div>
                <span className="text-sm font-medium">
                  {product.salesUnit === "group"
                    ? "Cantidad de unidades"
                    : "Superficie"}
                </span>
                <div className="mt-1">
                  <input
                    className="w-16 rounded border p-1 text-center border-gray-100"
                    type="text"
                    defaultValue={
                      quantity <= 1
                        ? product.unitValue
                        : product.unitValue! * quantity
                    }
                    disabled
                    readOnly
                  />
                  <span className="ml-1 text-gray-400">
                    {product.salesUnit === "area" ? "m²" : null}
                  </span>
                </div>
              </div>
            )}
            <div>
              <span className="text-sm font-medium">
                {product.salesUnit === "group"
                  ? "Cantidad de pallets"
                  : product.salesUnit === "area"
                  ? "Cantidad de cajas"
                  : "Cantidad"}
              </span>
              <QuantitySelector
                product={product}
                onQuantityChange={handleQuantityChange}
                initialQuantity={cartItemQuantity}
              />
            </div>
          </div>
        </div>
        <p className="bg-yellow-10 self-start py-4 text-gray-400">
          {product.description}
        </p>
        <div className="w-full p-3">
          <div className="w-full">
            <button
              className="flex w-full items-center justify-center rounded-full border-2 border-[#264b97] bg-[#254A96] px-4 py-3 font-medium text-white transition hover:border-black hover:bg-black"
              style={
                cartItemQuantity <= 0
                  ? { marginBottom: "67px" }
                  : { marginBottom: "0" }
              }
              onClick={quantity < 1 ? handleRemoveFromCart : handleAddToCart}
            >
              <div className="flex items-center justify-center">
                {cartItemQuantity <= 0 ? (
                  <>
                    Agregar <CartIcon />
                  </>
                ) : (
                  "Cambiar cantidad"
                )}
              </div>
            </button>
          </div>
          {cartItemQuantity > 0 && (
            <div className="mt-4 w-full">
              <button
                type="button"
                className="w-full rounded-full border-2 border-[#264b97]  bg-white px-8 py-3 font-medium text-[#254A96] transition hover:border-black hover:bg-black hover:text-white"
                onClick={handleRemoveFromCart}
              >
                <div className="flex items-center justify-center">
                  Eliminar del carrito
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
