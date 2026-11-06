import type { Metadata } from "next";
import FavoritesView from "@/components/FavoritesView";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Избранные ароматы мультибрендового бутика ÉLAN PARFUM.",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-10 md:px-10">
      <h1 className="font-display text-4xl font-light md:text-5xl">Избранное</h1>
      <div className="mt-10">
        <FavoritesView />
      </div>
    </div>
  );
}
