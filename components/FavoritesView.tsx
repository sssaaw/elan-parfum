"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

export default function FavoritesView() {
  const { favorites, hydrated } = useStore();

  if (!hydrated) {
    return <p className="py-24 text-center text-sm text-stone">Загружаем избранное…</p>;
  }

  const list = products.filter((p) => favorites.includes(p.slug));

  if (list.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl font-light">В избранном пока пусто</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone">
          Отмечайте ароматы сердечком на карточках — они появятся здесь и сохранятся в вашем браузере.
        </p>
        <Link href="/catalog" className="btn-solid mt-8 inline-block px-10 py-3.5 text-[12px] tracking-[0.18em]">
          ПЕРЕЙТИ В КАТАЛОГ
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
      {list.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
