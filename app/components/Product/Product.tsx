import { Product as ProductType, CartItem } from "../../types";
import useQuantity from "@/app/hooks/useQuantity";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductPrice from "./ProductPrice";
import ProductSelector from "./ProductSelector";
import ProductCheckoutButton from "./ProductCheckoutButton";

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
  const {
    quantity,
    handleAddToCart,
    handleRemoveFromCart,
    handleQuantityChange,
    cartItemQuantity,
  } = useQuantity({ product, cartItems, onAddToCart, onRemoveFromCart });

  return (
    <div
      className="flex w-full flex-col items-center justify-center md:flex-row border-b border-gray-300 mb-4"
      style={product.stock === 0 ? { opacity: 0.5 } : {}}
    >
      <ProductImage product={product} />

      <div className="flex h-auto w-full flex-col justify-between px-5">
        <div className="flex w-full flex-col items-start justify-between">
          <ProductDetails product={product} />

          <ProductPrice product={product} />

          <ProductSelector
            cartItemQuantity={cartItemQuantity}
            handleQuantityChange={handleQuantityChange}
            product={product}
            quantity={quantity}
          />
        </div>

        <p className="bg-yellow-10 self-start py-4 text-gray-400">
          {product.description}
        </p>

        <ProductCheckoutButton
          product={product}
          cartItemQuantity={cartItemQuantity}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          quantity={quantity}
        />
      </div>
    </div>
  );
};

export default Product;
