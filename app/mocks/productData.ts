import { Product as ProductType } from "../types";

const products: ProductType[] = [
  {
    id: 100012,
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382038/techsed_assets/yxazajhglqwdhzoalu6c.webp",
  },
  {
    id: 2060,
    title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
    description:
      "Ceramica esmaltada36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
    price: 13031,
    stock: 5,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.68,
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382031/techsed_assets/iuahvvphzwb6zbyhemaw.webp",
  },
  {
    id: 10035,
    title: "Hierro 25 mm x 12 m Acindar",
    description: "HIERRO 25 MM X 12M",
    price: 76293,
    listingPrice: 89757,
    stock: 5,
    salesUnit: "unit",
    imageUrl:
      "https://res.cloudinary.com/dfdvxotjz/image/upload/v1734382459/techsed_assets/eowj2dspjipmsacmpgpx.webp",
  },
];

export default products;
