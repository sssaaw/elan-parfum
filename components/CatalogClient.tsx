"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CATEGORY_LABELS,
  GENDER_LABELS,
  NOTE_TAGS,
  brands,
  formatPrice,
  maxPrice,
  minPrice,
  priceRange,
  products,
  type Category,
  type Gender,
} from "@/lib/products";
import ProductCard from "./ProductCard";

const SORTS = [
  { id: "popular", label: "Популярные" },
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
  { id: "name", label: "По названию" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const VOLUME_BUCKETS = [
  { id: "mini", label: "до 35 мл", test: (ml: number) => ml <= 35 },
  { id: "mid", label: "50–80 мл", test: (ml: number) => ml >= 50 && ml <= 80 },
  { id: "big", label: "90 мл и больше", test: (ml: number) => ml >= 90 },
];

const [MIN_PRICE, MAX_PRICE] = priceRange();

function SectionTitle({ children }: { children: string }) {
  return <h3 className="text-[11px] font-medium tracking-[0.22em] text-stone">{children}</h3>;
}

function Check({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-[14px] text-ink/85 hover:text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center border border-ink/35 transition-colors peer-checked:border-ink peer-checked:bg-ink [&::after]:hidden"
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5.2 4 7.7 8.5 2.5" stroke="#120b07" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {typeof count === "number" && <span className="text-xs text-stone">{count}</span>}
    </label>
  );
}

export default function CatalogClient() {
  const searchParams = useSearchParams();

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const b = searchParams.get("brand");
    return b && brands.includes(b) ? [b] : [];
  });
  const [gender, setGender] = useState<Gender | null>(() => {
    const g = searchParams.get("gender");
    return g === "women" || g === "men" || g === "unisex" ? g : null;
  });
  const [category, setCategory] = useState<Category | null>(() => {
    const c = searchParams.get("category");
    return c === "designer" || c === "niche" || c === "set" ? c : null;
  });
  const [notes, setNotes] = useState<string[]>([]);
  const [buckets, setBuckets] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState<number>(MAX_PRICE);
  const [query, setQuery] = useState<string>(() => searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortId>("popular");
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = <T,>(list: T[], value: T, set: (v: T[]) => void) =>
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeBuckets = VOLUME_BUCKETS.filter((b) => buckets.includes(b.id));
    const list = products.filter((p) => {
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (gender && p.gender !== gender) return false;
      if (category && p.category !== category) return false;
      if (notes.length && !p.noteTags.some((t) => notes.includes(t))) return false;
      if (activeBuckets.length && !p.volumes.some((v) => activeBuckets.some((b) => b.test(v.ml)))) return false;
      if (minPrice(p) > priceLimit) return false;
      if (q) {
        const haystack = [p.name, p.brand, p.family, ...p.noteTags, ...p.top, ...p.heart, ...p.base]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => minPrice(a) - minPrice(b));
      case "price-desc":
        return list.sort((a, b) => maxPrice(b) - maxPrice(a));
      case "name":
        return list.sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name, "ru"));
      default:
        return list.sort((a, b) => b.popularity - a.popularity);
    }
  }, [selectedBrands, gender, category, notes, buckets, priceLimit, query, sort]);

  const reset = () => {
    setSelectedBrands([]);
    setGender(null);
    setCategory(null);
    setNotes([]);
    setBuckets([]);
    setPriceLimit(MAX_PRICE);
    setQuery("");
    setSort("popular");
  };

  const filtersBody = (
    <div className="space-y-8">
      <div>
        <SectionTitle>ПОИСК</SectionTitle>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Название, бренд, нота…"
          className="field mt-3"
        />
      </div>

      <div>
        <SectionTitle>БРЕНД</SectionTitle>
        <div className="mt-2 max-h-64 overflow-y-auto pr-1">
          {brands.map((b) => (
            <Check
              key={b}
              label={b}
              count={products.filter((p) => p.brand === b).length}
              checked={selectedBrands.includes(b)}
              onChange={() => toggle(selectedBrands, b, setSelectedBrands)}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>ПОЛ</SectionTitle>
        <div className="mt-2">
          {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
            <Check
              key={g}
              label={GENDER_LABELS[g]}
              count={products.filter((p) => p.gender === g).length}
              checked={gender === g}
              onChange={() => setGender(gender === g ? null : g)}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>КАТЕГОРИЯ</SectionTitle>
        <div className="mt-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <Check
              key={c}
              label={CATEGORY_LABELS[c]}
              count={products.filter((p) => p.category === c).length}
              checked={category === c}
              onChange={() => setCategory(category === c ? null : c)}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>ЦЕНА, ДО</SectionTitle>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          className="mt-3 w-full accent-[#D26234]"
          aria-label="Максимальная цена"
        />
        <p className="mt-1 text-[13px] text-stone">до {formatPrice(priceLimit)}</p>
      </div>

      <div>
        <SectionTitle>ОБЪЁМ</SectionTitle>
        <div className="mt-2">
          {VOLUME_BUCKETS.map((b) => (
            <Check
              key={b.id}
              label={b.label}
              checked={buckets.includes(b.id)}
              onChange={() => toggle(buckets, b.id, setBuckets)}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>НОТЫ</SectionTitle>
        <div className="mt-2">
          {NOTE_TAGS.map((tag) => (
            <Check
              key={tag}
              label={tag}
              count={products.filter((p) => p.noteTags.includes(tag)).length}
              checked={notes.includes(tag)}
              onChange={() => toggle(notes, tag, setNotes)}
            />
          ))}
        </div>
      </div>

      <button type="button" onClick={reset} className="btn-outline w-full px-4 py-3 text-[12px] tracking-[0.16em]">
        СБРОСИТЬ ФИЛЬТРЫ
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-light md:text-5xl">Каталог</h1>
          <p className="mt-2 text-sm text-stone">
            {filtered.length === products.length
              ? products.length + " ароматов"
              : "Найдено: " + filtered.length + " из " + products.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="btn-outline px-5 py-2.5 text-[12px] tracking-[0.14em] lg:hidden"
          >
            ФИЛЬТРЫ
          </button>
          <label className="flex items-center gap-2 text-[13px] text-stone">
            <span className="hidden sm:inline">Сортировка:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="border border-ink/20 bg-cream px-3 py-2.5 text-[13px] text-ink outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto pr-2">{filtersBody}</div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="border border-ink/10 bg-sand/40 px-6 py-16 text-center">
              <p className="font-display text-2xl">Под эти фильтры ничего не нашлось</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-stone">
                Попробуйте расширить ценовой диапазон или убрать часть ограничений.
              </p>
              <button
                type="button"
                onClick={reset}
                className="btn-solid mt-6 px-8 py-3 text-[12px] tracking-[0.16em]"
              >
                СБРОСИТЬ ФИЛЬТРЫ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* мобильная панель фильтров */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Фильтры каталога">
          <button
            type="button"
            aria-label="Закрыть фильтры"
            onClick={() => setPanelOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto bg-cream px-5 py-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-2xl">Фильтры</p>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Закрыть фильтры"
                className="flex h-10 w-10 items-center justify-center text-2xl leading-none text-ink/70 hover:text-ink"
              >
                ×
              </button>
            </div>
            {filtersBody}
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="btn-solid mt-6 w-full px-4 py-3.5 text-[12px] tracking-[0.16em]"
            >
              ПОКАЗАТЬ {filtered.length ? "(" + filtered.length + ")" : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
