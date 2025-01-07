import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductSelector from "@/app/components/Product/ProductSelector";
import { Product } from "@/app/types";

describe("ProductSelector Component", () => {
  const mockHandleQuantityChange = jest.fn();

  const mockUnitProduct: Product = {
    id: 100012,
    title: "Test Product",
    description: "Test Description",
    price: 60000,
    stock: 5,
    salesUnit: "unit",
    imageUrl: "https://example.com/test.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles unit quantity changes correctly", async () => {
    const user = userEvent.setup();
    render(
      <ProductSelector
        product={mockUnitProduct}
        cartItemQuantity={0}
        handleQuantityChange={mockHandleQuantityChange}
      />
    );

    const incrementButton = screen.getByLabelText("Increment");
    await user.click(incrementButton);

    expect(mockHandleQuantityChange).toHaveBeenCalledWith(1);
  });

  it("respects stock limits", async () => {
    const user = userEvent.setup();
    const limitedStockProduct = { ...mockUnitProduct, stock: 2 };

    render(
      <ProductSelector
        product={limitedStockProduct}
        cartItemQuantity={0}
        handleQuantityChange={mockHandleQuantityChange}
      />
    );

    const incrementButton = screen.getByLabelText("Increment");

    // Click tres veces, deberia llegar a 2(max stock)
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(mockHandleQuantityChange).toHaveBeenLastCalledWith(2);
  });
});
