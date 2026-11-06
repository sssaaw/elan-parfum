"use client";

import { useState } from "react";
import {
  CHARACTERS,
  GENDER_LABELS,
  NOTE_TAGS,
  findByAnswers,
  type FinderAnswers,
  type Gender,
  type Product,
} from "@/lib/products";
import ProductCard from "./ProductCard";

const GENDER_OPTIONS: Array<{ value: Gender | "any"; label: string }> = [
  { value: "women", label: GENDER_LABELS.women },
  { value: "men", label: GENDER_LABELS.men },
  { value: "unisex", label: GENDER_LABELS.unisex },
  { value: "any", label: "Всё равно" },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        "border px-4 py-2 text-[13px] tracking-[0.04em] transition-colors " +
        (active
          ? "border-ink bg-ink text-cream"
          : "border-ink/25 text-ink/80 hover:border-ink hover:text-ink")
      }
    >
      {children}
    </button>
  );
}

export default function ScentFinder() {
  const [gender, setGender] = useState<Gender | "any">("any");
  const [notes, setNotes] = useState<string[]>([]);
  const [character, setCharacter] = useState<string | null>(null);
  const [results, setResults] = useState<Product[] | null>(null);

  const toggleNote = (tag: string) =>
    setNotes((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const find = () => {
    const answers: FinderAnswers = {
      gender: gender === "any" ? null : gender,
      noteTags: notes,
      character,
    };
    setResults(findByAnswers(answers));
  };

  const reset = () => {
    setGender("any");
    setNotes([]);
    setCharacter(null);
    setResults(null);
  };

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-3">
        <fieldset>
          <legend className="text-[11px] font-medium tracking-[0.22em] text-stone">01 — КОМУ</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {GENDER_OPTIONS.map((g) => (
              <Pill key={g.value} active={gender === g.value} onClick={() => setGender(g.value)}>
                {g.label}
              </Pill>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] font-medium tracking-[0.22em] text-stone">02 — КАКИЕ НОТЫ БЛИЗКИ</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {NOTE_TAGS.map((tag) => (
              <Pill key={tag} active={notes.includes(tag)} onClick={() => toggleNote(tag)}>
                {tag}
              </Pill>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] font-medium tracking-[0.22em] text-stone">03 — ХАРАКТЕР</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {CHARACTERS.map((c) => (
              <Pill key={c} active={character === c} onClick={() => setCharacter(character === c ? null : c)}>
                {c}
              </Pill>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="button" onClick={find} className="btn-solid px-8 py-3.5 text-[12px] tracking-[0.18em]">
          ПОДОБРАТЬ АРОМАТ
        </button>
        <button type="button" onClick={reset} className="link-line text-[13px] text-stone hover:text-ink">
          Сбросить
        </button>
      </div>

      {results !== null && (
        <div className="mt-10 border-t border-ink/10 pt-8">
          {results.length === 0 ? (
            <p className="text-sm text-stone">
              Под эти сочетания ничего не нашлось — попробуйте убрать часть ограничений или сбросить фильтры.
            </p>
          ) : (
            <>
              <p className="text-[11px] tracking-[0.22em] text-stone">ВАША ПОДБОРКА</p>
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-6">
                {results.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
