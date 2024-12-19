import { Product } from "@/app/types";
import { CartIcon } from "../UI/Icons";

interface ProductCheckoutButtonProps {
  product: Product;
  cartItemQuantity: number;
  quantity: number;
  handleAddToCart: () => void;
  handleRemoveFromCart: () => void;
}

export default function ProductCheckoutButton({
  product,
  cartItemQuantity,
  quantity,
  handleAddToCart,
  handleRemoveFromCart,
}: ProductCheckoutButtonProps) {
  return (
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
          disabled={product.stock === 0}
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
  );
}
