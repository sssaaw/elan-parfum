"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, minPrice, products } from "@/lib/products";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // сброс запроса при каждом открытии — синхронно с изменением пропа
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) =>
        [p.name, p.brand, p.family, ...p.noteTags, ...p.top, ...p.heart, ...p.base]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 8);
  }, [query]);

  if (!open) return null;

  const goToFirst = () => {
    if (results.length > 0) {
      onClose();
      router.push("/product/" + results[0].slug);
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Поиск по каталогу">
      <button type="button" aria-label="Закрыть поиск" onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto mt-0 w-full max-w-2xl bg-cream shadow-2xl">
        <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 md:px-8">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-stone">
            <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.3" />
            <path d="M13.75 13.75 18 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToFirst();
            }}
            placeholder="Аромат, бренд или нота — например, «роза» или «Chanel»"
            className="w-full bg-transparent py-1.5 text-[15px] outline-none placeholder:text-stone/70"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть поиск"
            className="shrink-0 text-[11px] tracking-[0.18em] text-stone hover:text-ink"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 md:px-8">
          {query.trim().length < 2 ? (
            <p className="py-6 text-center text-sm text-stone">
              Введите минимум два символа — поищем по названию аромата, бренду и нотам.
            </p>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-display text-xl">Ничего не нашлось</p>
              <p className="mt-2 text-sm text-stone">
                Попробуйте другое название или загляните в каталог — там точно есть что-то ваше.
              </p>
              <Link
                href="/catalog"
                onClick={onClose}
                className="btn-outline mt-5 inline-block px-6 py-2.5 text-[12px] tracking-[0.16em]"
              >
                ОТКРЫТЬ КАТАЛОГ
              </Link>
            </div>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={"/product/" + p.slug}
                    onClick={onClose}
                    className="flex items-center gap-4 border-b border-ink/5 py-3 last:border-0 hover:bg-sand/50"
                  >
                    <span className="img-frame h-16 w-14 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] tracking-[0.14em] text-stone">{p.brand}</span>
                      <span className="block truncate font-display text-lg leading-snug">{p.name}</span>
                    </span>
                    <span className="shrink-0 text-sm text-ink/80">от {formatPrice(minPrice(p))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
