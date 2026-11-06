"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  comment: string;
}

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  comment: "",
};

const PHONE_RE = /^\+?[\d\s()-]{10,18}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.firstName.trim().length < 2) errors.firstName = "Укажите имя";
  if (form.lastName.trim().length < 2) errors.lastName = "Укажите фамилию";
  if (!PHONE_RE.test(form.phone.trim())) errors.phone = "Укажите телефон в формате +7 (999) 123-45-67";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Укажите корректный e-mail";
  if (form.city.trim().length < 2) errors.city = "Укажите город";
  if (form.address.trim().length < 5) errors.address = "Укажите улицу, дом и квартиру";
  return errors;
}

export default function CheckoutView() {
  const { cartLines, cartTotal, cartCount, clearCart, hydrated } = useStore();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [confirmed, setConfirmed] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setConfirmed(true);
    clearCart();
  };

  if (!hydrated) {
    return <p className="py-24 text-center text-sm text-stone">Загружаем…</p>;
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="text-[11px] tracking-[0.24em] text-stone">ЗАКАЗ ОФОРМЛЕН</p>
        <h1 className="mt-4 font-display text-4xl font-light">Спасибо, {form.firstName}!</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/85">
          Мы получили ваши данные и в реальном магазине связались бы с вами для подтверждения заказа на{" "}
          <span className="font-medium">{form.phone}</span>.
        </p>
        <div className="mt-6 border border-ink/15 bg-sand/50 px-6 py-5 text-left text-[13px] leading-relaxed text-stone">
          Это демонстрационный проект-портфолио: оплата не производится, заказ никуда не отправляется, данные
          никуда не передаются и хранятся только на этой странице до её закрытия.
        </div>
        <Link href="/catalog" className="btn-solid mt-8 inline-block px-10 py-3.5 text-[12px] tracking-[0.18em]">
          ВЕРНУТЬСЯ В КАТАЛОГ
        </Link>
      </div>
    );
  }

  if (cartLines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl font-light">Корзина пуста</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone">
          Сначала добавьте ароматы в корзину — затем оформите заказ здесь.
        </p>
        <Link href="/catalog" className="btn-solid mt-8 inline-block px-10 py-3.5 text-[12px] tracking-[0.18em]">
          ПЕРЕЙТИ В КАТАЛОГ
        </Link>
      </div>
    );
  }

  const field = (
    key: keyof FormState,
    label: string,
    opts: { type?: string; placeholder?: string; half?: boolean } = {},
  ) => (
    <div className={opts.half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label htmlFor={"co-" + key} className="text-[11px] font-medium tracking-[0.18em] text-stone">
        {label.toUpperCase()}
      </label>
      <input
        id={"co-" + key}
        type={opts.type ?? "text"}
        value={form[key]}
        onChange={set(key)}
        placeholder={opts.placeholder}
        className={"field mt-1 " + (errors[key] ? "field-error" : "")}
        aria-invalid={Boolean(errors[key])}
      />
      {errors[key] && <p className="mt-1 text-[12px] text-[#b04a3a]">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
      <form onSubmit={submit} noValidate>
        <h2 className="font-display text-2xl">Данные получателя</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {field("firstName", "Имя", { half: true, placeholder: "Анна" })}
          {field("lastName", "Фамилия", { half: true, placeholder: "Смирнова" })}
          {field("phone", "Телефон", { type: "tel", placeholder: "+7 (999) 123-45-67" })}
          {field("email", "E-mail", { type: "email", placeholder: "anna@example.ru" })}
          {field("city", "Город", { placeholder: "Москва" })}
          {field("address", "Адрес доставки", { placeholder: "ул. Пятницкая, 25, кв. 12" })}
          <div className="sm:col-span-2">
            <label htmlFor="co-comment" className="text-[11px] font-medium tracking-[0.18em] text-stone">
              КОММЕНТАРИЙ К ЗАКАЗУ (НЕОБЯЗАТЕЛЬНО)
            </label>
            <textarea
              id="co-comment"
              value={form.comment}
              onChange={set("comment")}
              rows={3}
              className="field mt-1 resize-none"
            />
          </div>
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-stone">
          Нажимая «Подтвердить заказ», вы соглашаетесь с условиями демонстрационного проекта: реальные заказы не
          оформляются, оплата не принимается.
        </p>
        <button type="submit" className="btn-solid mt-4 px-10 py-4 text-[12px] tracking-[0.18em]">
          ПОДТВЕРДИТЬ ЗАКАЗ — {formatPrice(cartTotal)}
        </button>
      </form>

      <aside className="h-fit border border-ink/10 bg-sand/50 p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Ваш заказ</h2>
        <ul className="mt-5 space-y-3 text-[14px]">
          {cartLines.map((line) => (
            <li key={line.slug + "-" + line.ml} className="flex justify-between gap-3">
              <span className="min-w-0">
                {line.product.brand} {line.product.name}
                <span className="text-stone"> · {line.ml} мл × {line.qty}</span>
              </span>
              <span className="shrink-0">{formatPrice(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-between border-t border-ink/10 pt-4 text-[16px] font-medium">
          <span>К оплате</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <p className="mt-3 text-[12px] text-stone">Товаров в заказе: {cartCount}</p>
      </aside>
    </div>
  );
}
