import { render, screen, fireEvent } from "@testing-library/react";
import UnitSelector from "@/app/components/Product/Selector/UnitSelector";
import { Product } from "@/app/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 60000,
  imageUrl: "https://example.com/test.jpg",
  salesUnit: "unit",
  unitValue: 1,
  measurementUnit: "m2",
  stock: 100,
};

const mockOnQuantityChange = jest.fn();

describe("UnitSelector", () => {
  it("renders correctly with initial values", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    expect(screen.getByText("Cantidad")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("increments quantity correctly", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const incrementButton = screen.getByLabelText("Increment");
    fireEvent.click(incrementButton);

    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });

  it("decrements quantity correctly", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const decrementButton = screen.getByLabelText("Decrement");
    fireEvent.click(decrementButton);

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(mockOnQuantityChange).toHaveBeenCalledWith(1);
  });

  it("handles input change correctly", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const input = screen.getByDisplayValue("2");
    fireEvent.change(input, { target: { value: "5" } });

    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
  });

  it("handles input blur correctly", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const input = screen.getByDisplayValue("2");
    fireEvent.change(input, { target: { value: "105" } });
    fireEvent.blur(input);

    expect(screen.getByDisplayValue("100")).toBeInTheDocument(); // Should be capped at stock
    expect(mockOnQuantityChange).toHaveBeenCalledWith(100);
  });

  it("disables decrement button when quantity is 0", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={0}
      />
    );

    const decrementButton = screen.getByLabelText("Decrement");
    expect(decrementButton).toBeDisabled();
  });

  it("disables increment button when quantity is at stock limit", () => {
    render(
      <UnitSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={100}
      />
    );

    const incrementButton = screen.getByLabelText("Increment");
    expect(incrementButton).toBeDisabled();
  });
});
