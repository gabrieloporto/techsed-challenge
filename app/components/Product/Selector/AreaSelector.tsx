import { Product } from "@/app/types";
import { MinusIcon, PlusIcon } from "../../UI/Icons";
import useAreaSelector from "@/app/hooks/useAreaSelector";

interface AreaSelectorProps {
  product: Product;
  onQuantityChange: (quantity: number) => void;
  initialQuantity?: number;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({
  product,
  onQuantityChange,
  initialQuantity = 0,
}) => {
  const {
    area,
    setArea,
    boxes,
    setBoxes,
    handleAreaBlur,
    handleBoxesBlur,
    incrementBoxes,
    decrementBoxes,
  } = useAreaSelector({ product, onQuantityChange, initialQuantity });

  return (
    <div className="flex space-x-7">
      {/* Input para la superficie */}
      <div>
        <span className="text-sm font-medium">Superficie</span>
        <div className="mt-1">
          <input
            className="w-16 rounded border p-1 text-center border-gray-100"
            type="text"
            value={area === 0 ? product.unitValue : area}
            onChange={(e) => setArea(e.target.value)} // Permitir edición temporal
            onFocus={() => area === 0 && setArea("")} // Vaciar el campo al enfocar
            onBlur={handleAreaBlur} // Validar y ajustar al salir del input
          />
          <span className="ml-1 text-gray-400">{product.measurementUnit}</span>
        </div>
      </div>

      {/* Input para la cantidad de cajas */}
      <div>
        <span className="text-sm font-medium">Cantidad de cajas</span>
        <div className="mt-1 flex items-center space-x-2">
          <button
            className="rounded border p-1 hover:bg-gray-100"
            onClick={decrementBoxes}
            disabled={Number(boxes) <= 1}
            aria-label="Decrement"
          >
            <MinusIcon />
          </button>
          <input
            className="w-16 rounded border p-1 text-center border-gray-100"
            type="text"
            value={boxes}
            onChange={(e) => setBoxes(e.target.value)} // Permitir edición temporal
            onFocus={() => boxes === 0 && setBoxes("")} // Vaciar el campo al enfocar
            onBlur={handleBoxesBlur} // Validar y ajustar al salir del input
          />
          <button
            className="rounded border p-1 hover:bg-gray-100"
            onClick={incrementBoxes}
            disabled={Number(boxes) >= product.stock}
            aria-label="Increment"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaSelector;
