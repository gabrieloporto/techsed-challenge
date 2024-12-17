import React from "react";
import { CartItem } from "../types";
import { formatPrice } from "../utils/productUtils";
import Image from "next/image";

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="border lg:ml-[10%] lg:mr-[23%] border-gray-300 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {items.map((item) => (
            <ul
              key={item.product.id}
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              <li className="flex py-4 sm:py-6">
                <div className="flex flex-shrink-0 items-center justify-center">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                  />
                </div>
                <div className="relative ml-4 flex h-full w-full flex-col justify-between">
                  <div className="flex h-[128px] flex-col justify-between p-2">
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex w-full justify-between">
                        <div className="pr-6">
                          <p className="w-28 md:w-48 lg:w-full truncate text-sm font-medium text-gray-700">
                            {item.product.title}
                          </p>
                          <div className="text-sm font-normal text-gray-500">
                            Cantidad: {item.quantity}
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-right text-sm font-medium text-gray-900">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
          <div className="rounded-t-3xl bg-white p-6">
            <div className="mb-4">
              <div className="flex flex-row justify-between py-2">
                <p className="text-xl font-bold leading-6 text-black">Total</p>
                <p className="text-xl font-bold text-black">
                  {formatPrice(total)}
                </p>
              </div>
            </div>
            <button className="border-[#264b97] bg-[#254A96] hover:bg-black mb-2 h-12 w-full rounded-full px-4 py-2 text-white shadow-md focus:outline-none hover:border-black">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
