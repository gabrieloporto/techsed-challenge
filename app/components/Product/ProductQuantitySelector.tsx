import { Product } from "../../types";
import { MinusIcon, PlusIcon } from "../UI/Icons";
import useProductQuantity from "@/app/hooks/useProductQuantity";

interface ProductQuantitySelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  product,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const {
    inputValue,
    decrementQuantity,
    handleInputChange,
    incrementQuantity,
  } = useProductQuantity({ product, onQuantityChange, initialQuantity });

  return (
    <div className="mt-1 flex items-center space-x-2">
      <button
        className="rounded border p-1 hover:bg-gray-100 focus:outline-none active:bg-gray-300"
        onClick={decrementQuantity}
        disabled={product.stock === 0}
        aria-label="Decrement"
      >
        <MinusIcon />
      </button>
      <input
        className="w-16 rounded border p-1 text-center border-gray-100"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        disabled
      />
      <button
        className="rounded border p-1 hover:bg-gray-100 focus:outline-none active:bg-gray-300"
        onClick={incrementQuantity}
        disabled={product.stock === 0}
        aria-label="Increment"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default ProductQuantitySelector;
