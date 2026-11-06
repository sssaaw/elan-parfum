"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import SearchOverlay from "./SearchOverlay";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?gender=women", label: "Для неё", match: "women" },
  { href: "/catalog?gender=men", label: "Для него", match: "men" },
  { href: "/catalog?gender=unisex", label: "Унисекс", match: "unisex" },
  { href: "/#brands", label: "Бренды" },
  { href: "/#about", label: "О магазине" },
];

export default function Header() {
  const { cartCount, favorites, hydrated } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 md:h-20 md:px-10">
          {/* мобильное меню */}
          <button
            type="button"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>

          <Link href="/" className="shrink-0" aria-label="ÉLAN PARFUM — на главную">
            <span className="font-display text-[22px] font-medium leading-none tracking-[0.14em] md:text-2xl">
              ÉLAN
            </span>
            <span className="mt-0.5 block text-[9px] font-light tracking-[0.5em] text-stone">PARFUM</span>
          </Link>

          <nav className="ml-8 hidden items-center gap-8 text-[13px] tracking-[0.08em] text-ink/80 lg:flex lg:gap-10">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="link-line hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button
              type="button"
              aria-label="Поиск"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.3" />
                <path d="M13.75 13.75 18 18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              href="/favorites"
              aria-label="Избранное"
              className="relative flex h-11 w-11 items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 17s-6.5-4.35-6.5-9A3.7 3.7 0 0 1 10 5.6 3.7 3.7 0 0 1 16.5 8c0 4.65-6.5 9-6.5 9Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              {hydrated && favorites.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cacao px-1 text-[9px] font-medium text-cream">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="Корзина"
              className="relative flex h-11 w-11 items-center justify-center text-ink/80 transition-colors hover:text-ink"
            >
              <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 6.5h12l-.9 9.2a1.6 1.6 0 0 1-1.6 1.3H6.5a1.6 1.6 0 0 1-1.6-1.3L4 6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path d="M7.2 6.3V5.6a2.8 2.8 0 0 1 5.6 0v.7" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              {hydrated && cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cacao px-1 text-[9px] font-medium text-cream">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* мобильная навигация */}
        <div
          ref={menuRef}
          className={`overflow-hidden border-t border-ink/10 bg-cream transition-[max-height,opacity] duration-300 lg:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink/5 py-3.5 text-[15px] tracking-[0.06em] last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
