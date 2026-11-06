import Link from "next/link";

const NAV = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?gender=women", label: "Для неё" },
  { href: "/catalog?gender=men", label: "Для него" },
  { href: "/catalog?gender=unisex", label: "Унисекс" },
  { href: "/favorites", label: "Избранное" },
  { href: "/cart", label: "Корзина" },
];

const BRANDS = ["Chanel", "Dior", "Serge Lutens", "Kilian Paris", "Maison Élan"];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand/70">
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="ÉLAN PARFUM — на главную" className="inline-block">
              <span className="font-display text-2xl font-medium leading-none tracking-[0.14em]">ÉLAN</span>
              <span className="mt-0.5 block text-[9px] font-light tracking-[0.5em] text-stone">PARFUM</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
              Мультибрендовый бутик парфюмерии: дизайнерские и нишевые ароматы, подбор по нотам и подарочные наборы.
            </p>
          </div>

          <nav aria-label="Навигация по сайту">
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-stone">МАГАЗИН</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link-line text-ink/80 hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Популярные бренды">
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-stone">БРЕНДЫ</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {BRANDS.map((brand) => (
                <li key={brand}>
                  <Link
                    href={"/catalog?brand=" + encodeURIComponent(brand)}
                    className="link-line text-ink/80 hover:text-ink"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-medium tracking-[0.22em] text-stone">КОНТАКТЫ</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/80">
              <li>Москва, Столешников переулок, 7</li>
              <li>Ежедневно 11:00–21:00</li>
              <li>
                <a href="mailto:care@elan-parfum.example" className="link-line hover:text-ink">
                  care@elan-parfum.example
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-stone">
            ÉLAN PARFUM — демонстрационный проект-портфолио. Сайт не является официальным магазином и не продаёт
            товары: названия брендов и ароматов принадлежат их правообладателям и использованы исключительно в
            информационных целях. Ароматы вымышленных домов (Maison Élan, Atelier Verre, Solaire, Bois d&apos;Ombre,
            Élan Selection) — художественный вымысел.
          </p>
          <p className="mt-4 text-xs text-stone">© 2026 ÉLAN PARFUM. Демонстрационный проект.</p>
        </div>
      </div>
    </footer>
  );
}
