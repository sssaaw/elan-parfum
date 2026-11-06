import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Корзина мультибрендового бутика ÉLAN PARFUM.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 md:px-10">
      <h1 className="font-display text-4xl font-light md:text-5xl">Корзина</h1>
      <div className="mt-10">
        <CartView />
      </div>
    </div>
  );
}
