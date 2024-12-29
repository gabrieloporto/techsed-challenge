import { Product } from "@/app/types";
import Image from "next/image";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="mx-auto w-80">
      <div className="mb-4 overflow-hidden rounded-md">
        <Image
          alt={product.title}
          loading="lazy"
          width="400"
          height="400"
          decoding="async"
          className="max-w-80 cursor-pointer"
          src={product.imageUrl}
          style={{ color: "transparent" }}
        />
      </div>
    </div>
  );
}
