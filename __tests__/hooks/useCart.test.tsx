import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/app/hooks/useCart";
import { CartProvider } from "@/app/context/CartContext";
import { Product } from "@/app/types";

describe("useCart Hook", () => {
  const mockProduct: Product = {
    id: 100012,
    title: "Test Product",
    description: "Test Description",
    price: 1000,
    stock: 5,
    salesUnit: "unit",
    imageUrl: "https://example.com/test.jpg",
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("initializes with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart.items).toHaveLength(0);
  });

  it("adds items to cart correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.cart.items).toHaveLength(1);
    expect(result.current.cart.items[0].quantity).toBe(2);
    expect(result.current.cart.items[0].product).toEqual(mockProduct);
  });

  it("removes items from cart correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.cart.items).toHaveLength(0);
  });

  it("respects stock limits when adding items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, mockProduct.stock + 1);
    });

    expect(result.current.cart.items[0].quantity).toBe(mockProduct.stock);
  });
});
