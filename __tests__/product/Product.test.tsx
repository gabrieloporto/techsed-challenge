import { render, screen } from "@testing-library/react";
import Product from "@/app/components/Product/Product";
import { CartProvider } from "@/app/context/CartContext";
import { Product as ProductType } from "@/app/types";

const renderWithProvider = (component: React.ReactNode) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe("Product Component", () => {
  const mockProduct: ProductType = {
    id: 100012,
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: "unit",
    imageUrl: "https://example.com/product.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    renderWithProvider(<Product product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    const priceText = screen.getByText((content) => content.includes("60.588"));
    expect(priceText).toBeInTheDocument();
  });

  it("handles out of stock products correctly", () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    renderWithProvider(<Product product={outOfStockProduct} />);

    const button = screen.getByRole("button", { name: /agregar/i });
    expect(button).toBeDisabled();
    expect(screen.getByText("Stock agotado")).toBeInTheDocument();
  });

  it("displays correct price information including discounts", () => {
    renderWithProvider(<Product product={mockProduct} />);

    expect(
      screen.getByText((content) => content.includes("60.588"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("OFF"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("67.320"))
    ).toBeInTheDocument();
  });
});
