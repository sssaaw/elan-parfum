"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, minPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

interface Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addToCart, toggleFavorite, isFavorite, hydrated } = useStore();
  const [added, setAdded] = useState(false);
  const favorite = hydrated && isFavorite(product.slug);
  const price = minPrice(product);

  const handleAdd = () => {
    addToCart(product.slug, product.volumes[0].ml);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group relative flex flex-col">
      <Link href={"/product/" + product.slug} className="img-frame relative block aspect-[3/4]" aria-label={product.brand + " " + product.name}>
        <Image
          src={product.image}
          alt={product.brand + " " + product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className="object-cover"
        />
        {product.fictional && (
          <span className="absolute left-3 top-3 bg-cream/90 px-2 py-1 text-[9px] tracking-[0.18em] text-stone">
            ÉLAN SELECTION
          </span>
        )}
      </Link>

      <button
        type="button"
        aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
        aria-pressed={favorite}
        onClick={() => toggleFavorite(product.slug)}
        className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 text-ink/70 backdrop-blur-sm transition-colors hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill={favorite ? "currentColor" : "none"} aria-hidden="true">
          <path
            d="M10 17s-6.5-4.35-6.5-9A3.7 3.7 0 0 1 10 5.6 3.7 3.7 0 0 1 16.5 8c0 4.65-6.5 9-6.5 9Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] tracking-[0.16em] text-stone">{product.brand}</p>
        <Link href={"/product/" + product.slug} className="mt-1 font-display text-lg leading-snug hover:text-cacao">
          {product.name}
        </Link>
        <p className="mt-1 text-[13px] text-stone">{product.family}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p className="text-[15px]">
            от <span className="font-medium">{formatPrice(price)}</span>
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="btn-outline px-4 py-2 text-[11px] tracking-[0.14em]"
          >
            {added ? "ДОБАВЛЕНО ✓" : "В КОРЗИНУ"}
          </button>
        </div>
      </div>
    </article>
  );
}
