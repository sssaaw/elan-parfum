import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ScentFinder from "@/components/ScentFinder";
import { brands, products } from "@/lib/products";

const CATEGORIES = [
  { title: "Для неё", href: "/catalog?gender=women", image: "/images/arden-roses.jpg", wide: false },
  { title: "Для него", href: "/catalog?gender=men", image: "/images/zara-duo.jpg", wide: false },
  { title: "Унисекс", href: "/catalog?gender=unisex", image: "/images/blank-label.jpg", wide: false },
  { title: "Нишевая парфюмерия", href: "/catalog?category=niche", image: "/images/niche-lineup.jpg", wide: false },
  { title: "Подарочные наборы", href: "/catalog?category=set", image: "/images/flatlay-classic.jpg", wide: false },
];

const ADVANTAGES = [
  {
    title: "Только оригиналы",
    text: "Каждый флакон проходит проверку при поступлении: батч-коды, качество упаковки, свежесть партии.",
  },
  {
    title: "Мультибрендовая коллекция",
    text: "Дизайнерские дома и независимые нишевые марки — в одном каталоге, с честными описаниями нот.",
  },
  {
    title: "Подбор по нотам",
    text: "Не знаете, с чего начать? Ответьте на три вопроса — и получите персональную подборку.",
  },
  {
    title: "Подарочная упаковка",
    text: "Флакон в фирменной коробке, лента и открытка с рукописной подписью — уже включены в цену.",
  },
];

export default function HomePage() {
  const popular = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-cream">
        {/* тёплое свечение за композицией — как на референсе */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 hidden h-[820px] w-[820px] -translate-y-1/2 rounded-full lg:block"
          style={{ background: "radial-gradient(closest-side, rgba(151,74,26,0.22), transparent 72%)" }}
        />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-14 pt-10 md:px-10 lg:min-h-[calc(100svh-126px)] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-10 lg:pt-12">
          {/* типографика */}
          <div className="relative z-10 order-2 min-w-0 lg:order-1">
            <p
              className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-4 py-2 text-[10px] font-medium tracking-[0.24em] text-stone"
              style={{ animationDelay: "60ms" }}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cacao" />
              НОВАЯ КОЛЛЕКЦИЯ — 2026
            </p>

            <h1
              className="hero-rise mt-7 font-display text-[clamp(2.5rem,9vw,4.6rem)] font-medium leading-[1.04] text-ink lg:text-[clamp(2.9rem,4.7vw,4.4rem)]"
              style={{ animationDelay: "150ms" }}
            >
              Искусство быть <em className="italic text-cacao">запоминающимся</em>
            </h1>

            <p
              className="hero-rise mt-6 max-w-md text-[15px] leading-relaxed text-stone md:text-base"
              style={{ animationDelay: "240ms" }}
            >
              Коллекция ароматов от культовых парфюмерных домов и независимых нишевых брендов.
            </p>

            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: "330ms" }}
            >
              <Link
                href="/catalog"
                className="btn-accent group inline-flex items-center gap-3 px-9 py-4 text-[12px] font-medium tracking-[0.18em]"
              >
                ОТКРЫТЬ КАТАЛОГ
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-hidden="true"
                  className="btn-arrow"
                >
                  <path
                    d="M1 6h13.2M10.4 1.4 15 6l-4.6 4.6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="#finder"
                className="group inline-flex items-center gap-2.5 text-[13px] tracking-[0.06em] text-ink/85 transition-colors hover:text-ink"
              >
                <span className="link-line">Подобрать аромат</span>
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-hidden="true"
                  className="btn-arrow"
                >
                  <path
                    d="M1 6h13.2M10.4 1.4 15 6l-4.6 4.6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div
              className="hero-rise mt-12 grid max-w-xl grid-cols-3 divide-x divide-ink/15 border-y border-ink/15"
              style={{ animationDelay: "420ms" }}
            >
              <div className="flex items-start gap-3 py-4 pr-4">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-stone">
                  <path
                    d="M10 2.5C7.2 6.1 5.5 8.8 5.5 11a4.5 4.5 0 0 0 9 0c0-2.2-1.7-4.9-4.5-8.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="font-display text-[26px] leading-none text-ink">{products.length}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-stone">ароматов</p>
                </div>
              </div>
              <div className="flex items-start gap-3 px-4 py-4">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-stone">
                  <rect x="6" y="7" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8.5 7V4.5h3V7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-display text-[26px] leading-none text-ink">{brands.length}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-stone">домов</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-4 pl-4">
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-stone">
                  <path
                    d="m10 2.8 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 8.1l5-.7L10 2.8Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="font-display text-[26px] leading-none text-ink">100%</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-stone">оригинал</p>
                </div>
              </div>
            </div>
          </div>

          {/* флакон на деревянной подставке — композиция с референса */}
          <div className="relative order-1 min-w-0 lg:order-2">
            <div
              className="hero-img-in relative mx-auto aspect-[402/408] w-full max-w-[520px] overflow-hidden rounded-[26px] lg:ml-auto lg:mr-0 lg:max-w-[560px]"
              style={{ animationDelay: "150ms" }}
            >
              <Image
                src="/images/hero-composition.jpg"
                alt="Янтарный флакон духов на скульптурной коряге в окружении кленовых листьев и кусочков янтаря"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* низ hero: подсказка прокрутки */}
        <div className="relative border-t border-ink/10">
          <p className="mx-auto flex items-center justify-center gap-4 py-4 text-[10px] tracking-[0.32em] text-stone">
            <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
            ЛИСТАЙТЕ ВНИЗ
            <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
          </p>
        </div>

        {/* вертикальная подпись у правого края */}
        <p
          aria-hidden="true"
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.5em] text-stone/70 [writing-mode:vertical-rl] xl:block"
        >
          Élan Parfum — Essence Collection
        </p>
      </section>

      {/* ---------- КАТЕГОРИИ ---------- */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-light md:text-4xl">Категории</h2>
            <Link href="/catalog" className="link-line shrink-0 text-[13px] text-stone hover:text-ink">
              Весь каталог
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 70}>
              <Link href={cat.href} className="group block">
                <span className="img-frame relative block aspect-[3/4]">
                  <Image src={cat.image} alt="" fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                  <span className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/25" />
                </span>
                <span className="mt-3 block font-display text-lg leading-snug group-hover:text-cacao md:text-xl">
                  {cat.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- ПОПУЛЯРНОЕ ---------- */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10 md:pb-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-light md:text-4xl">Популярное сейчас</h2>
            <Link href="/catalog" className="link-line shrink-0 text-[13px] text-stone hover:text-ink">
              Показать все
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {popular.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- ПОДБОР ПО НОТАМ ---------- */}
      <section id="finder" className="bg-sand/70 py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.24em] text-stone">ПОДБОР АРОМАТА</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-light leading-tight md:text-4xl">
              Три вопроса — и ваша подборка готова
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <ScentFinder />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- БРЕНДЫ ---------- */}
      <section id="brands" className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.24em] text-stone">БРЕНДЫ</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-light leading-tight md:text-4xl">
            От культовых домов к независимым маркам
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={"/catalog?brand=" + encodeURIComponent(brand)}
                className="border border-ink/20 px-5 py-2.5 text-[13px] tracking-[0.06em] text-ink/85 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                {brand}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- EDITORIAL ---------- */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="img-frame relative aspect-[4/5] lg:aspect-[4/4.6]">
              <Image
                src="/images/editorial-spray.jpg"
                alt="Флакон парфюмерии в стиле editorial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="text-[11px] font-light tracking-[0.3em] text-cream/60">ÉDITORIAL</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
                Аромат — это часть вашей истории
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/80">
                Запахи хранят память точнее фотографий: первый город, чужой свитер, лето у моря. Мы относимся к
                парфюмерии как к дневнику — поэтому в нашем каталоге нет «просто товаров»: у каждого аромата свой
                характер, своя пирамида нот и своё настроение.
              </p>
              <Link
                href="/catalog"
                className="mt-8 inline-block border border-cream/50 px-8 py-4 text-[12px] tracking-[0.18em] transition-colors hover:bg-cream hover:text-ink"
              >
                НАЧАТЬ ИСТОРИЮ
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- ПРЕИМУЩЕСТВА / О МАГАЗИНЕ ---------- */}
      <section id="about" className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-light md:text-4xl">О магазине</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((adv, i) => (
            <Reveal key={adv.title} delay={i * 80}>
              <div>
                <p className="font-display text-2xl text-cacao">0{i + 1}</p>
                <h3 className="mt-3 font-display text-xl">{adv.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone">{adv.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
