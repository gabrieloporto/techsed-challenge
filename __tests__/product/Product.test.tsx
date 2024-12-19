import Product from "@/app/components/Product/Product";
import { CartItem, Product as ProductType } from "@/app/types";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Product Component", () => {
  const mockProduct: ProductType = {
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
  };

  const mockCartItems: CartItem[] = [];
  const mockOnAddToCart = jest.fn();
  const mockOnRemoveFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the product's details correctly", () => {
    render(
      <Product
        product={mockProduct}
        cartItems={mockCartItems}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Aqui tenia un problema al verificar la imagen y era que next.js altera las URL de las imagenes
    // Solución: Verificar que `src` contenga la URL codificada
    const image = screen.getByAltText(mockProduct.title);
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent(mockProduct.imageUrl))
    );
  });

  it("disables the add button if stock is 0", () => {
    const productOutOfStock = { ...mockProduct, stock: 0 };

    render(
      <Product
        product={productOutOfStock}
        cartItems={mockCartItems}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const addButton = screen.getByRole("button", { name: /agregar/i });
    expect(addButton).toBeDisabled();
  });

  it("calls onAddToCart when 'Agregar' button is clicked", () => {
    render(
      <Product
        product={mockProduct}
        cartItems={mockCartItems}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    // Buscar el botón de incremento usando aria-label
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(incrementButton); // Incrementa `quantity` a 1

    const addButton = screen.getByRole("button", { name: /agregar/i });
    fireEvent.click(addButton);

    // Verificar que la función fue llamada correctamente
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("calls onRemoveFromCart when 'Eliminar del carrito' button is clicked", () => {
    const cartItemsWithProduct = [{ product: mockProduct, quantity: 2 }];

    render(
      <Product
        product={mockProduct}
        cartItems={cartItemsWithProduct}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    const removeButton = screen.getByRole("button", {
      name: /eliminar del carrito/i,
    });
    fireEvent.click(removeButton);

    expect(mockOnRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("renders 'Cambiar cantidad' if product is already in cart", () => {
    const cartItemsWithProduct = [{ product: mockProduct, quantity: 2 }];

    render(
      <Product
        product={mockProduct}
        cartItems={cartItemsWithProduct}
        onAddToCart={mockOnAddToCart}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    );

    expect(
      screen.getByRole("button", { name: /cambiar cantidad/i })
    ).toBeInTheDocument();
  });
});
