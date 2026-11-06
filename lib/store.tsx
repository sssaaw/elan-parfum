"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export interface CartItem {
  slug: string;
  ml: number;
  qty: number;
}

interface StoreValue {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  cartTotal: number;
  cartLines: Array<CartItem & { product: Product; price: number }>;
  addToCart: (slug: string, ml: number, qty?: number) => void;
  removeFromCart: (slug: string, ml: number) => void;
  setQty: (slug: string, ml: number, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  hydrated: boolean;
}

const CART_KEY = "elan-cart-v1";
const FAV_KEY = "elan-fav-v1";

const StoreContext = createContext<StoreValue | null>(null);

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // разовая гидрация из localStorage — setState в эффекте здесь необходим
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(readJSON<CartItem[]>(CART_KEY, []));
    setFavorites(readJSON<string[]>(FAV_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const addToCart = useCallback((slug: string, ml: number, qty = 1) => {
    setCart((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.ml === ml);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { slug, ml, qty }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string, ml: number) => {
    setCart((prev) => prev.filter((l) => !(l.slug === slug && l.ml === ml)));
  }, []);

  const setQty = useCallback((slug: string, ml: number, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.ml === ml))
        : prev.map((l) => (l.slug === slug && l.ml === ml ? { ...l, qty } : l)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  const cartLines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = products.find((p) => p.slug === l.slug);
          if (!product) return null;
          const vol = product.volumes.find((v) => v.ml === l.ml) ?? product.volumes[0];
          return { ...l, product, price: vol.price };
        })
        .filter((x): x is CartItem & { product: Product; price: number } => x !== null),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((sum, l) => sum + l.qty, 0), [cart]);
  const cartTotal = useMemo(() => cartLines.reduce((sum, l) => sum + l.price * l.qty, 0), [cartLines]);

  const value = useMemo(
    () => ({
      cart,
      favorites,
      cartCount,
      cartTotal,
      cartLines,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleFavorite,
      isFavorite,
      hydrated,
    }),
    [cart, favorites, cartCount, cartTotal, cartLines, addToCart, removeFromCart, setQty, clearCart, toggleFavorite, isFavorite, hydrated],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
