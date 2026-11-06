import type { Metadata } from "next";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа в бутике ÉLAN PARFUM. Демонстрационный проект — без реальной оплаты.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 md:px-10">
      <h1 className="font-display text-4xl font-light md:text-5xl">Оформление заказа</h1>
      <div className="mt-10">
        <CheckoutView />
      </div>
    </div>
  );
}
