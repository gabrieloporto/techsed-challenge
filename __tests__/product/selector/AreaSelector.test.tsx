import { render, screen, fireEvent } from "@testing-library/react";
import AreaSelector from "@/app/components/Product/Selector/AreaSelector";
import { Product } from "@/app/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 60000,
  imageUrl: "https://example.com/test.jpg",
  salesUnit: "unit",
  unitValue: 10,
  measurementUnit: "m2",
  stock: 100,
};

const mockOnQuantityChange = jest.fn();

describe("AreaSelector", () => {
  it("renders correctly with initial values", () => {
    render(
      <AreaSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    expect(screen.getByText("Superficie")).toBeInTheDocument();
    expect(screen.getByText("Cantidad de cajas")).toBeInTheDocument();
    expect(screen.getByDisplayValue("20")).toBeInTheDocument(); // 2 * 10 unitValue
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
  });

  it("increments boxes correctly", () => {
    render(
      <AreaSelector
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

  it("decrements boxes correctly", () => {
    render(
      <AreaSelector
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

  it("handles area input blur correctly", () => {
    render(
      <AreaSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const areaInput = screen.getByDisplayValue("20");
    fireEvent.change(areaInput, { target: { value: "25" } });
    fireEvent.blur(areaInput);

    expect(screen.getByDisplayValue("30")).toBeInTheDocument(); // Rounded to nearest unitValue
    expect(screen.getByDisplayValue("3")).toBeInTheDocument(); // 30 / 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });

  it("handles boxes input blur correctly", () => {
    render(
      <AreaSelector
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        initialQuantity={2}
      />
    );

    const boxesInput = screen.getByDisplayValue("2");
    fireEvent.change(boxesInput, { target: { value: "5" } });
    fireEvent.blur(boxesInput);

    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument(); // 5 * 10 unitValue
    expect(mockOnQuantityChange).toHaveBeenCalledWith(5);
  });
});
