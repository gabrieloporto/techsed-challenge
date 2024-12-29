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
          className="flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 font-medium text-white transition hover:bg-black"
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
            className="w-full rounded-full border-2 border-primary  bg-white px-8 py-3 font-medium text-primary transition hover:border-black hover:bg-black hover:text-white"
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
