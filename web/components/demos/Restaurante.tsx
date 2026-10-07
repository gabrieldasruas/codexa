"use client";

import { useState } from "react";
import { UtensilsCrossed, Plus, Minus, ShoppingBag, Users } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell, btn } from "./DemoShell";
import Dish, { type DishKind } from "./art/Dish";

type Item = { id: string; nome: string; desc: string; preco: number; kind: DishKind };
const menu: Record<string, Item[]> = {
  Entradas: [
    { id: "e1", nome: "Burrata com tomate confit", desc: "Pão artesanal e manjericão", preco: 42, kind: "burrata" },
    { id: "e2", nome: "Carpaccio de filé", desc: "Alcaparras, parmesão e rúcula", preco: 46, kind: "carpaccio" },
  ],
  Pratos: [
    { id: "p1", nome: "Risoto de cogumelos", desc: "Arroz arbóreo e trufa negra", preco: 78, kind: "risoto" },
    { id: "p2", nome: "Filé ao molho madeira", desc: "Purê de batata baroa", preco: 92, kind: "file" },
    { id: "p3", nome: "Salmão grelhado", desc: "Legumes assados e limão siciliano", preco: 86, kind: "salmao" },
  ],
  Sobremesas: [
    { id: "s1", nome: "Petit gâteau", desc: "Sorvete de baunilha", preco: 34, kind: "petit" },
    { id: "s2", nome: "Tiramisù da casa", desc: "Café e mascarpone", preco: 32, kind: "tiramisu" },
  ],
  Bebidas: [
    { id: "b1", nome: "Negroni", desc: "Gin, vermute e Campari", preco: 38, kind: "negroni" },
    { id: "b2", nome: "Suco de laranja", desc: "Natural, 400 ml", preco: 14, kind: "suco" },
  ],
};
const destaques = ["p2", "p3", "e1"];

export default function Restaurante({ t }: { t: Template }) {
  const [aba, setAba] = useState("Pratos");
  const [carrinho, setCarrinho] = useState<Record<string, number>>({});
  const [pessoas, setPessoas] = useState(2);
  const todos = Object.values(menu).flat();
  const qtd = Object.values(carrinho).reduce((a, b) => a + b, 0);
  const total = todos.reduce((a, i) => a + i.preco * (carrinho[i.id] ?? 0), 0);
  const mudar = (id: string, d: number) => setCarrinho((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-10 flex items-center justify-between bg-[var(--c1)]/90 px-6 py-3.5 backdrop-blur">
        <span className="flex items-center gap-2 font-serif text-lg"><UtensilsCrossed className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />Casa Brasa</span>
        <span className="flex items-center gap-2 rounded-full bg-[var(--c2)] px-3.5 py-1.5 text-xs font-semibold text-white" aria-live="polite"><ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />{qtd} · R$ {total}</span>
      </nav>

      <header className="relative grid items-center gap-6 px-6 py-12 @xl:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[.3em] text-[var(--c2)]">Cozinha autoral</p>
          <h3 className="mb-4 font-serif text-4xl leading-tight @xl:text-5xl">Sabor que <em className="text-[var(--c2)]">acolhe</em>.</h3>
          <p className="mb-6 max-w-sm text-sm opacity-75">Ingredientes frescos, fogo de brasa e um ambiente feito para ficar. Monte seu pedido ou reserve sua mesa.</p>
        </div>
        <div className="relative mx-auto aspect-square w-60 @xl:w-72">
          <div className="absolute inset-0 rounded-full bg-[var(--c2)]/25 blur-3xl" aria-hidden="true" />
          <Dish kind="risoto" className="relative h-full w-full drop-shadow-[0_24px_30px_rgba(0,0,0,.5)]" />
        </div>
      </header>

      <section className="px-6 pb-4">
        <h4 className="mb-4 font-serif text-2xl">Destaques do chef</h4>
        <div className="grid gap-3 @xl:grid-cols-3">
          {destaques.map((id) => {
            const i = todos.find((x) => x.id === id)!;
            return (
              <article key={id} className="group overflow-hidden rounded-2xl border border-[var(--c3)]/12 bg-[var(--c3)]/[.04]">
                <div className="bg-gradient-to-b from-[var(--c2)]/15 to-transparent p-4"><Dish kind={i.kind} className="mx-auto w-40 transition duration-500 group-hover:scale-110 group-hover:rotate-6" /></div>
                <div className="flex items-center justify-between p-4 pt-1">
                  <div><div className="font-serif">{i.nome}</div><div className="text-xs opacity-60">{i.desc}</div></div>
                  <span className="text-sm font-semibold text-[var(--c2)]">R$ {i.preco}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-8">
        <h4 className="mb-4 font-serif text-2xl">Cardápio</h4>
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Categorias do cardápio">
          {Object.keys(menu).map((c) => <button key={c} type="button" role="tab" aria-selected={aba === c} onClick={() => setAba(c)} className={`min-h-9 cursor-pointer rounded-full border px-4 text-xs transition ${aba === c ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-[var(--c3)]/20 hover:border-[var(--c2)]"}`}>{c}</button>)}
        </div>
        <ul className="divide-y divide-[var(--c3)]/10">
          {menu[aba].map((i) => {
            const n = carrinho[i.id] ?? 0;
            return (
              <li key={i.id} className="flex items-center gap-4 py-4">
                <Dish kind={i.kind} className="h-16 w-16 shrink-0" />
                <div className="flex-1"><div className="font-serif text-base">{i.nome}</div><div className="text-xs opacity-60">{i.desc}</div></div>
                <span className="text-sm font-semibold text-[var(--c2)]">R$ {i.preco}</span>
                <div className="flex items-center gap-2">
                  {n > 0 && <><button type="button" aria-label={`Remover ${i.nome}`} onClick={() => mudar(i.id, -1)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[var(--c3)]/30 transition hover:border-[var(--c2)]"><Minus className="h-3.5 w-3.5" aria-hidden="true" /></button><span className="w-4 text-center text-sm">{n}</span></>}
                  <button type="button" aria-label={`Adicionar ${i.nome}`} onClick={() => mudar(i.id, 1)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-[var(--c2)] text-white transition hover:brightness-110 active:scale-90"><Plus className="h-3.5 w-3.5" aria-hidden="true" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="m-6 mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--c3)]/15 bg-[var(--c3)]/5 p-5">
        <div><h4 className="font-serif text-xl">Reserve sua mesa</h4><p className="text-xs opacity-60">Sex e Sáb, a partir das 19h</p></div>
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />
          <button type="button" aria-label="Menos pessoas" onClick={() => setPessoas((p) => Math.max(1, p - 1))} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[var(--c3)]/30"><Minus className="h-3.5 w-3.5" aria-hidden="true" /></button>
          <span className="w-16 text-center text-sm">{pessoas} pessoas</span>
          <button type="button" aria-label="Mais pessoas" onClick={() => setPessoas((p) => Math.min(12, p + 1))} className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[var(--c3)]/30"><Plus className="h-3.5 w-3.5" aria-hidden="true" /></button>
          <button type="button" className={`${btn} !text-white`}>Reservar</button>
        </div>
      </section>
    </DemoShell>
  );
}
