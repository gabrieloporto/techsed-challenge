import { render, screen, fireEvent } from "@testing-library/react";
import GroupSelector from "@/app/components/Product/Selector/GroupSelector";
import { Product } from "@/app/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 60000,
  imageUrl: "https://example.com/test.jpg",
  salesUnit: "unit",
  unitValue: 10,
  measurementUnit: "pallet",
  stock: 100,
};

const mockOnQuantityChange = jest.fn();

describe("GroupSelector", () => {
  it("renders correctly with initial values", () => {
    render(
      <GroupSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    expect(screen.getByText("Cantidad de unidades")).toBeInTheDocument();
    expect(screen.getByText("Cantidad de pallets")).toBeInTheDocument();
    expect(screen.getByDisplayValue("20")).toBeInTheDocument(); // 2 * 10 unitValue
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("increments pallets correctly", () => {
    render(
      <GroupSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const incrementButton = screen.getByLabelText("Increment");
    fireEvent.click(incrementButton);

    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument(); // 3 * 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });

  it("decrements pallets correctly", () => {
    render(
      <GroupSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const decrementButton = screen.getByLabelText("Decrement");
    fireEvent.click(decrementButton);

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument(); // 1 * 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(1);
  });

  it("handles units input blur correctly", () => {
    render(
      <GroupSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const unitsInput = screen.getByDisplayValue("20");
    fireEvent.change(unitsInput, { target: { value: "25" } });
    fireEvent.blur(unitsInput);

    expect(screen.getByDisplayValue("30")).toBeInTheDocument(); // Rounded to nearest unitValue
    expect(screen.getByDisplayValue("3")).toBeInTheDocument(); // 30 / 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });

  it("handles pallets input blur correctly", () => {
    render(
      <GroupSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const palletsInput = screen.getByDisplayValue("2");
    fireEvent.change(palletsInput, { target: { value: "5" } });
    fireEvent.blur(palletsInput);

    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument(); // 5 * 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(5);
  });
});
