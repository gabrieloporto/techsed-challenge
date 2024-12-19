import { formatPrice } from "@/app/utils/productUtils";

export default function CartCheckout({ total }: { total: number }) {
  return (
    <div className="rounded-t-3xl bg-white p-6">
      <div className="mb-4">
        <div className="flex flex-row justify-between py-2">
          <p className="text-xl font-bold leading-6 text-black">Total</p>
          <p className="text-xl font-bold text-black">{formatPrice(total)}</p>
        </div>
      </div>
      <button className="border-[#264b97] bg-[#254A96] hover:bg-black mb-2 h-12 w-full rounded-full px-4 py-2 text-white shadow-md focus:outline-none hover:border-black">
        Finalizar compra
      </button>
    </div>
  );
}
