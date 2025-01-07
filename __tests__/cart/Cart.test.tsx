import { render, screen, within } from "@testing-library/react";
import Cart from "@/app/components/Cart/Cart";
import { CartProvider } from "@/app/context/CartContext";
import { CartItem, Cart as CartType } from "@/app/types";
import { formatPrice } from "@/app/utils/productUtils";

// Función auxiliar para renderizar con el proveedor
const renderWithProvider = (
  component: React.ReactNode,
  initialCart: CartType = {
    id: "1",
    items: [],
    createdAt: new Date(),
  }
) => {
  return render(
    <CartProvider initialCart={initialCart}>{component}</CartProvider>
  );
};

describe("Cart Component", () => {
  const mockCartItems: CartItem[] = [
    {
      product: {
        id: 100012,
        title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
        description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
        price: 60588,
        listingPrice: 67320,
        stock: 5,
        salesUnit: "group",
        measurementUnit: "pallet",
        unitValue: 198,
        imageUrl: "https://example.com/product.jpg",
      },
      quantity: 2,
    },
  ];

  const mockCart: CartType = {
    id: "1",
    items: mockCartItems,
    createdAt: new Date(),
  };

  it("renders empty state correctly", () => {
    renderWithProvider(<Cart />);
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
  });

  it("renders cart items with correct quantities and prices", () => {
    renderWithProvider(<Cart />, mockCart);

    const productContainer = screen
      .getByText(mockCartItems[0].product.title)
      .closest("li");
    expect(productContainer).toBeInTheDocument();

    const quantity = within(productContainer!).getByText(
      `Cantidad: ${mockCartItems[0].quantity}`
    );
    expect(quantity).toBeInTheDocument();

    const price = within(productContainer!).getByText(
      formatPrice(mockCartItems[0].product.price)
    );
    expect(price).toBeInTheDocument();
  });

  it("calculates and displays the total correctly", () => {
    renderWithProvider(<Cart />, mockCart);

    const total = mockCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const totalElement = screen.getByText("Total");
    const totalValueElement = totalElement.nextElementSibling;

    expect(totalValueElement?.textContent).toBe(formatPrice(total));
  });

  it("renders checkout button when cart has items", () => {
    renderWithProvider(<Cart />, mockCart);

    const button = screen.getByRole("button", { name: /finalizar compra/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
