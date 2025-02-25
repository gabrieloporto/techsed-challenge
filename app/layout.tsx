import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techsed Challenge",
  description: "Catalogo de productos con carrito de compras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} antialiased`}
        style={{ overflowX: "hidden" }}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
