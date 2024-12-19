import Cart from "@/app/components/Cart/Cart";
import { CartItem } from "@/app/types";
import { render, screen } from "@testing-library/react";

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
    {
      product: {
        id: 2060,
        title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
        description:
          "Ceramica esmaltada36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
        price: 13031,
        stock: 5,
        salesUnit: "area",
        measurementUnit: "m2",
        unitValue: 2.68,
        imageUrl: "https://example.com/product2.jpg",
      },
      quantity: 3,
    },
  ];

  it("renders empty state correctly", () => {
    render(<Cart items={[]} />);
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
  });

  it("renders cart items correctly", () => {
    render(<Cart items={mockCartItems} />);

    mockCartItems.forEach((item) => {
      expect(screen.getByText(item.product.title)).toBeInTheDocument();
      expect(
        screen.getByText(`Cantidad: ${item.quantity}`)
      ).toBeInTheDocument();

      // Comparar precios con un matcher más flexible
      expect(
        screen.getByText((content) =>
          content.includes(item.product.price.toLocaleString())
        )
      ).toBeInTheDocument();
    });
  });

  it("calculates and displays the total correctly", () => {
    render(<Cart items={mockCartItems} />);

    // Calcular el total esperado
    const expectedTotal = mockCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Aquí se espera que el total se muestre correctamente
    expect(
      screen.getByText((content) =>
        content.includes(expectedTotal.toLocaleString())
      )
    ).toBeInTheDocument();
  });

  it("renders 'Finalizar compra' button correctly", () => {
    render(<Cart items={mockCartItems} />);

    const checkoutButton = screen.getByRole("button", {
      name: /finalizar compra/i,
    });
    expect(checkoutButton).toBeInTheDocument();
    expect(checkoutButton).toBeEnabled();
  });
});
