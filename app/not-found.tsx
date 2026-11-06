import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <p className="text-[11px] tracking-[0.24em] text-stone">СТРАНИЦА НЕ НАЙДЕНА</p>
      <h1 className="mt-4 font-display text-5xl font-light">404</h1>
      <p className="mt-4 text-[15px] text-stone">
        Похоже, этот аромат улетучился. Вернитесь на главную или откройте каталог.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-solid px-8 py-3.5 text-[12px] tracking-[0.18em]">
          НА ГЛАВНУЮ
        </Link>
        <Link href="/catalog" className="btn-outline px-8 py-3.5 text-[12px] tracking-[0.18em]">
          В КАТАЛОГ
        </Link>
      </div>
    </div>
  );
}
