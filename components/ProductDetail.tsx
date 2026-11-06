"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  formatPrice,
  type Product,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const { addToCart, toggleFavorite, isFavorite, hydrated } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [ml, setMl] = useState(product.volumes[0].ml);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const favorite = hydrated && isFavorite(product.slug);
  const volume = product.volumes.find((v) => v.ml === ml) ?? product.volumes[0];
  const image = product.gallery[activeImage] ?? product.image;

  const handleAdd = () => {
    addToCart(product.slug, ml, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 md:px-10">
      <nav aria-label="Хлебные крошки" className="text-[13px] text-stone">
        <Link href="/" className="link-line hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="link-line hover:text-ink">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/70">
          {product.brand} {product.name}
        </span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* галерея */}
        <div>
          <div className="img-frame relative aspect-[4/5]">
            <Image
              src={image}
              alt={product.brand + " " + product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={"Фото " + (i + 1)}
                  aria-pressed={activeImage === i}
                  className={"img-frame relative h-24 w-20 border transition-colors " + (activeImage === i ? "border-ink" : "border-transparent hover:border-ink/30")}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* информация */}
        <div>
          <Link
            href={"/catalog?brand=" + encodeURIComponent(product.brand)}
            className="link-line text-[12px] tracking-[0.2em] text-stone hover:text-ink"
          >
            {product.brand.toUpperCase()}
          </Link>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-sm text-stone">
            {product.family} · {GENDER_LABELS[product.gender]} · {CATEGORY_LABELS[product.category]}
          </p>

          <p className="mt-6 font-display text-3xl">{formatPrice(volume.price)}</p>

          <div className="mt-6">
            <p className="text-[11px] font-medium tracking-[0.22em] text-stone">ОБЪЁМ</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.volumes.map((v) => (
                <button
                  key={v.ml}
                  type="button"
                  aria-pressed={ml === v.ml}
                  onClick={() => setMl(v.ml)}
                  className={
                    "border px-5 py-2.5 text-[14px] transition-colors " +
                    (ml === v.ml
                      ? "border-ink bg-ink text-cream"
                      : "border-ink/25 text-ink/85 hover:border-ink hover:text-ink")
                  }
                >
                  {v.ml} мл
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-ink/25">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Уменьшить количество"
                className="h-full px-4 py-3 text-lg leading-none text-ink/70 hover:text-ink"
              >
                −
              </button>
              <span aria-live="polite" className="min-w-10 text-center text-[15px]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
                aria-label="Увеличить количество"
                className="h-full px-4 py-3 text-lg leading-none text-ink/70 hover:text-ink"
              >
                +
              </button>
            </div>
            <button type="button" onClick={handleAdd} className="btn-solid flex-1 px-8 py-3.5 text-[12px] tracking-[0.18em] sm:flex-none">
              {added ? "ДОБАВЛЕНО ✓" : "В КОРЗИНУ — " + formatPrice(volume.price * qty)}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.slug)}
              aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
              aria-pressed={favorite}
              className="btn-outline flex w-14 items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill={favorite ? "currentColor" : "none"} aria-hidden="true">
                <path
                  d="M10 17s-6.5-4.35-6.5-9A3.7 3.7 0 0 1 10 5.6 3.7 3.7 0 0 1 16.5 8c0 4.65-6.5 9-6.5 9Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/85">{product.description}</p>

          {/* пирамида нот */}
          <div className="mt-10 border-t border-ink/10 pt-8">
            <p className="text-[11px] font-medium tracking-[0.22em] text-stone">ПИРАМИДА АРОМАТА</p>
            <dl className="mt-4 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Верхние ноты", items: product.top },
                { title: "Ноты сердца", items: product.heart },
                { title: "Базовые ноты", items: product.base },
              ].map((row) => (
                <div key={row.title}>
                  <dt className="text-[13px] font-medium">{row.title}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-stone">{row.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[13px] text-stone">
              Характер: <span className="text-ink/85">{product.character}</span> · Семейство:{" "}
              <span className="text-ink/85">{product.family}</span>
            </p>
          </div>
        </div>
      </div>

      {/* рекомендации */}
      <section className="mt-20 border-t border-ink/10 pt-12">
        <h2 className="font-display text-3xl font-light">Вам также может понравиться</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
