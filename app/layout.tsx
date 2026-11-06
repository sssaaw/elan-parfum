import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "ÉLAN PARFUM — мультибрендовый бутик парфюмерии",
    template: "%s — ÉLAN PARFUM",
  },
  description:
    "Мультибрендовый бутик нишевой и дизайнерской парфюмерии: культовые дома и независимые бренды, подбор аромата по нотам, подарочные наборы и миниатюры.",
  keywords: ["парфюмерия", "нишевая парфюмерия", "дизайнерская парфюмерия", "ароматы", "магазин духов"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${playfair.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
