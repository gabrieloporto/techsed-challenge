import ProductSelector from "@/app/components/Product/ProductSelector";
import { Product } from "@/app/types";
import { render, screen } from "@testing-library/react";

describe("ProductSelector Component", () => {
  const mockHandleQuantityChange = jest.fn();

  const mockGroupProduct: Product = {
    id: 100012,
    title: "Ladrillo hueco",
    description: "Ladrillo hueco - Pallet",
    price: 60000,
    stock: 5,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
    imageUrl: "https://example.com/group.jpg",
  };

  it("renders correctly for 'group' products", () => {
    render(
      <ProductSelector
        product={mockGroupProduct}
        quantity={2}
        cartItemQuantity={1}
        handleQuantityChange={mockHandleQuantityChange}
      />
    );

    expect(screen.getByText("Cantidad de pallets")).toBeInTheDocument();
    expect(screen.getByText("Cantidad de unidades")).toBeInTheDocument();
    expect(screen.getByDisplayValue("396")).toBeInTheDocument(); // 198 * 2
  });

  it("renders correctly for 'area' products", () => {
    const mockAreaProduct: Product = {
      ...mockGroupProduct,
      salesUnit: "area",
      measurementUnit: "m2",
      unitValue: 2.68,
    };

    render(
      <ProductSelector
        product={mockAreaProduct}
        quantity={3}
        cartItemQuantity={2}
        handleQuantityChange={mockHandleQuantityChange}
      />
    );

    expect(screen.getByText("Superficie")).toBeInTheDocument();

    // Comparación aproximada para evitar errores de redondeo
    const input = screen.getByDisplayValue(
      (value) => Math.abs(parseFloat(value) - 8.04) < 0.01
    );
    expect(input).toBeInTheDocument();

    expect(screen.getByText("m²")).toBeInTheDocument();
  });

  it("renders correctly for 'unit' products", () => {
    const mockUnitProduct: Product = {
      ...mockGroupProduct,
      salesUnit: "unit",
      unitValue: undefined,
    };

    render(
      <ProductSelector
        product={mockUnitProduct}
        quantity={1}
        cartItemQuantity={3}
        handleQuantityChange={mockHandleQuantityChange}
      />
    );

    expect(screen.getByText("Cantidad")).toBeInTheDocument();
    expect(screen.queryByText("Superficie")).not.toBeInTheDocument();
    expect(screen.queryByText("Cantidad de unidades")).not.toBeInTheDocument();
  });
});
