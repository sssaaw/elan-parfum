"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function CartView() {
  const { cartLines, cartTotal, cartCount, setQty, removeFromCart, clearCart, hydrated } = useStore();

  if (!hydrated) {
    return <p className="py-24 text-center text-sm text-stone">Загружаем корзину…</p>;
  }

  if (cartLines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl font-light">Корзина пуста</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone">
          Загляните в каталог или воспользуйтесь подбором аромата — там найдётся что-то ваше.
        </p>
        <Link href="/catalog" className="btn-solid mt-8 inline-block px-10 py-3.5 text-[12px] tracking-[0.18em]">
          ПЕРЕЙТИ В КАТАЛОГ
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {cartLines.map((line) => (
            <li key={line.slug + "-" + line.ml} className="flex gap-4 py-5 sm:gap-6">
              <Link href={"/product/" + line.slug} className="img-frame relative h-28 w-24 shrink-0 sm:h-32 sm:w-28">
                <Image src={line.product.image} alt="" fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[11px] tracking-[0.16em] text-stone">{line.product.brand}</p>
                <Link href={"/product/" + line.slug} className="mt-0.5 font-display text-xl leading-snug hover:text-cacao">
                  {line.product.name}
                </Link>
                <p className="mt-1 text-[13px] text-stone">{line.ml} мл</p>
                <div className="mt-auto flex items-center gap-4 pt-2">
                  <div className="flex items-center border border-ink/25">
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.ml, line.qty - 1)}
                      aria-label="Уменьшить количество"
                      className="px-3 py-2 leading-none text-ink/70 hover:text-ink"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-[14px]">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(line.slug, line.ml, line.qty + 1)}
                      aria-label="Увеличить количество"
                      className="px-3 py-2 leading-none text-ink/70 hover:text-ink"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.slug, line.ml)}
                    className="link-line text-[13px] text-stone hover:text-ink"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <p className="shrink-0 text-right text-[15px] font-medium">{formatPrice(line.price * line.qty)}</p>
            </li>
          ))}
        </ul>
        <button type="button" onClick={clearCart} className="link-line mt-4 text-[13px] text-stone hover:text-ink">
          Очистить корзину
        </button>
      </div>

      <aside className="h-fit border border-ink/10 bg-sand/50 p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Итого</h2>
        <dl className="mt-5 space-y-3 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-stone">Товаров</dt>
            <dd>{cartCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone">Доставка</dt>
            <dd className="text-stone">бесплатно</dd>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-3 text-[16px] font-medium">
            <dt>К оплате</dt>
            <dd>{formatPrice(cartTotal)}</dd>
          </div>
        </dl>
        <Link href="/checkout" className="btn-solid mt-6 block px-6 py-4 text-center text-[12px] tracking-[0.18em]">
          ОФОРМИТЬ ЗАКАЗ
        </Link>
        <Link href="/catalog" className="link-line mt-4 block text-center text-[13px] text-stone hover:text-ink">
          Продолжить покупки
        </Link>
      </aside>
    </div>
  );
}
