export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: "group" | "unit" | "area";
  measurementUnit?: "m2" | "m" | "pallet" | "bolson";
  unitValue?: number;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
  createdAt: Date;
};
