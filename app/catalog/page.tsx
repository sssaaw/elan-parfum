import type { Metadata } from "next";
import { Suspense } from "react";
import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог парфюмерии",
  description:
    "Каталог мультибрендового бутика ÉLAN PARFUM: дизайнерская и нишевая парфюмерия, подарочные наборы. Фильтры по бренду, полу, нотам, объёму и цене.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1440px] px-5 py-24 text-center text-sm text-stone md:px-10">
          Загружаем каталог…
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
