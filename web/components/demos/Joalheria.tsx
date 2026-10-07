"use client";

import { useState } from "react";
import { Gem as GemIcon, Heart, MessageCircle } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell, btn } from "./DemoShell";
import Jewel, { type Gem, type JewelKind, type Metal } from "./art/Jewel";

const cats = ["Todas", "Anéis", "Colares", "Brincos", "Pulseiras"];
const pecas: { id: number; nome: string; cat: string; preco: number; kind: JewelKind; metal: Metal; gem: Gem }[] = [
  { id: 1, nome: "Solitário Aurora", cat: "Anéis", preco: 4890, kind: "ring", metal: "gold", gem: "diamond" },
  { id: 2, nome: "Aliança Eterna", cat: "Anéis", preco: 2350, kind: "bands", metal: "rose", gem: "diamond" },
  { id: 3, nome: "Colar Lua Cheia", cat: "Colares", preco: 3290, kind: "pearls", metal: "gold", gem: "emerald" },
  { id: 4, nome: "Pingente Rubi", cat: "Colares", preco: 1790, kind: "necklace", metal: "silver", gem: "ruby" },
  { id: 5, nome: "Brinco Gota Safira", cat: "Brincos", preco: 1490, kind: "earrings", metal: "gold", gem: "sapphire" },
  { id: 6, nome: "Brinco Esmeralda", cat: "Brincos", preco: 990, kind: "earrings", metal: "silver", gem: "emerald" },
  { id: 7, nome: "Pulseira Riviera", cat: "Pulseiras", preco: 5290, kind: "bracelet", metal: "gold", gem: "diamond" },
  { id: 8, nome: "Bracelete Sol", cat: "Pulseiras", preco: 2790, kind: "bracelet", metal: "rose", gem: "ruby" },
];

export default function Joalheria({ t }: { t: Template }) {
  const [cat, setCat] = useState("Todas");
  const [fav, setFav] = useState<number[]>([]);
  const lista = pecas.filter((p) => cat === "Todas" || p.cat === cat);

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--c3)]/10 bg-[var(--c1)]/90 px-6 py-4 backdrop-blur">
        <span className="hidden w-24 text-[10px] uppercase tracking-[.25em] opacity-60 @xl:block">Coleções</span>
        <span className="mx-auto flex items-center gap-2 font-serif text-lg tracking-[.35em] @xl:mx-0"><GemIcon className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />MAISON LUMA</span>
        <span className="flex w-24 items-center justify-end gap-1.5 text-xs"><Heart className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />{fav.length}</span>
      </nav>

      <header className="relative flex flex-col items-center overflow-hidden px-6 pb-4 pt-14 text-center">
        <div className="absolute inset-0 opacity-50 [background:radial-gradient(ellipse_at_50%_0%,var(--c2),transparent_60%)]" aria-hidden="true" />
        <p className="relative mb-4 text-[10px] uppercase tracking-[.4em] text-[var(--c2)]">Nova coleção · Verão 26</p>
        <h3 className="relative mb-5 max-w-md font-serif text-4xl leading-tight @xl:text-6xl">Brilho que conta <em className="text-[var(--c2)]">a sua história</em></h3>
        <a className={`${btn} relative`}>Explorar coleção</a>
        <div className="relative mt-8 flex w-full max-w-xl items-end justify-center gap-2 @xl:gap-6">
          <Jewel kind="earrings" metal="gold" gem="sapphire" className="hidden w-28 -rotate-6 @xl:block" />
          <Jewel kind="ring" metal="gold" gem="diamond" className="w-44 drop-shadow-[0_20px_30px_rgba(0,0,0,.5)] @xl:w-60" />
          <Jewel kind="necklace" metal="rose" gem="ruby" className="hidden w-28 rotate-6 @xl:block" />
        </div>
      </header>

      <section className="px-6 py-10">
        <div className="mb-6 flex flex-wrap justify-center gap-5 text-[11px] uppercase tracking-[.2em]" role="group" aria-label="Categorias">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`min-h-9 cursor-pointer border-b pb-1 transition ${cat === c ? "border-[var(--c2)] text-[var(--c2)]" : "border-transparent opacity-60 hover:opacity-100"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 @xl:grid-cols-4">
          {lista.map((p) => {
            const on = fav.includes(p.id);
            return (
              <article key={p.id} className="group">
                <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-br from-[var(--c2)]/20 via-[var(--c3)]/[.04] to-transparent ring-1 ring-[var(--c3)]/10">
                  <Jewel kind={p.kind} metal={p.metal} gem={p.gem} className="absolute inset-0 m-auto w-[88%] transition duration-700 group-hover:scale-110" />
                  <button type="button" aria-label={on ? `Remover ${p.nome} dos favoritos` : `Favoritar ${p.nome}`} aria-pressed={on}
                    onClick={() => setFav((f) => (on ? f.filter((x) => x !== p.id) : [...f, p.id]))}
                    className="absolute right-2 top-2 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-black/40 backdrop-blur transition hover:scale-110">
                    <Heart className={`h-4 w-4 ${on ? "fill-[var(--c2)] text-[var(--c2)]" : "text-white"}`} aria-hidden="true" />
                  </button>
                </div>
                <h5 className="font-serif text-sm">{p.nome}</h5>
                <p className="text-xs text-[var(--c2)]">R$ {p.preco.toLocaleString("pt-BR")}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-6 mb-12 grid items-center gap-4 overflow-hidden rounded-2xl border border-[var(--c2)]/40 p-6 @xl:grid-cols-[1fr_auto] @xl:p-8">
        <div className="flex flex-col items-center gap-3 text-center @xl:items-start @xl:text-left">
          <h4 className="font-serif text-2xl">Peça sob encomenda</h4>
          <p className="max-w-xs text-xs opacity-70">Desenhe a joia dos seus sonhos com nossos ourives. Escolha o metal, a pedra e acompanhe cada etapa.</p>
          <a className={btn}><MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />Falar com consultor</a>
        </div>
        <Jewel kind="bands" metal="gold" gem="diamond" className="mx-auto w-40" />
      </section>
    </DemoShell>
  );
}
