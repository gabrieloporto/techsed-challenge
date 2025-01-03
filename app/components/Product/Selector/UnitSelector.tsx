import { Product } from "@/app/types";
import useUnitSelector from "@/app/hooks/useUnitSelector";
import { MinusIcon, PlusIcon } from "../../UI/Icons";

interface UnitSelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  product,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const {
    inputValue,
    decrementQuantity,
    handleInputChange,
    incrementQuantity,
  } = useUnitSelector({ product, onQuantityChange, initialQuantity });

  return (
    <div>
      <span className="text-sm font-medium">Cantidad</span>

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

        <span>unidades</span>
      </div>
    </div>
  );
};

export default UnitSelector;
