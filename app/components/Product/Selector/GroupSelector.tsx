import { Product } from "@/app/types";
import { MinusIcon, PlusIcon } from "../../UI/Icons";
import useGroupSelector from "@/app/hooks/useGroupSelector";

interface GroupSelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({
  product,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const {
    units,
    setUnits,
    handleUnitsBlur,
    decrementPallets,
    pallets,
    setPallets,
    handlePalletsBlur,
    incrementPallets,
  } = useGroupSelector({
    product,
    initialQuantity,
    onQuantityChange,
  });

  return (
    <div className="flex space-x-7">
      <div>
        <span className="text-sm font-medium">Cantidad de unidades</span>

        <div>
          <input
            className="w-16 rounded border p-1 text-center border-gray-100"
            type="text"
            value={units === 0 ? product.unitValue : units}
            onChange={(e) => setUnits(e.target.value)}
            onFocus={() => units === 0 && setUnits("")} // Vaciar si unidades es 0
            onBlur={handleUnitsBlur}
          />

          <span className="ml-1 text-gray-400">unidades</span>
        </div>
      </div>

      <div>
        <span className="text-sm font-medium">
          Cantidad de {product.measurementUnit}s
        </span>
        <div className="mt-1 flex items-center space-x-2">
          <button
            className="rounded border p-1 hover:bg-gray-100"
            onClick={decrementPallets}
            disabled={Number(pallets) <= 1}
            aria-label="Decrement"
          >
            <MinusIcon />
          </button>
          <input
            className="w-16 rounded border p-1 text-center border-gray-100"
            type="text"
            value={pallets}
            onChange={(e) => setPallets(e.target.value)}
            onFocus={() => pallets === 0 && setPallets("")}
            onBlur={handlePalletsBlur}
          />
          <button
            className="rounded border p-1 hover:bg-gray-100"
            onClick={incrementPallets}
            disabled={Number(pallets) >= product.stock}
            aria-label="Increment"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSelector;
