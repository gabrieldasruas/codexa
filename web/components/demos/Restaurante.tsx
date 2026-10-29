"use client";

import { useState } from "react";
import Image from "next/image";
import { Bike, CalendarDays, Clock, MapPin, Minus, Plus, ShoppingBag, Star, Users, UtensilsCrossed } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const F = (n: string) => `/modelos/restaurante/${n}.webp`;
type Item = { id: string; nome: string; desc: string; preco: number; foto: string; selo?: string };
const cardapio: Record<string, Item[]> = {
  Entradas: [
    { id: "salada", nome: "Salada da horta", desc: "Folhas orgânicas, legumes assados e molho de ervas", preco: 38, foto: F("salada") },
    { id: "camarao", nome: "Camarão na brasa", desc: "Camarões grelhados sobre vagem tostada e azeite de alho", preco: 59, foto: F("camarao"), selo: "Chef indica" },
  ],
  Principais: [
    { id: "lombo", nome: "Lombo envolto em bacon", desc: "Com camarões, vagem francesa e redução de vinho", preco: 98, foto: F("prato"), selo: "Assinatura" },
    { id: "bowl", nome: "Mesa da casa", desc: "Seleção de pratos para compartilhar, servida no centro", preco: 149, foto: F("mesa-esq") },
    { id: "burger", nome: "Burger artesanal", desc: "Blend da casa, queijo meia-cura e pão brioche", preco: 54, foto: F("mesa-dir") },
  ],
  "Drinks e doces": [{ id: "drinks", nome: "Sorbet e drinks", desc: "Sorbet de frutas vermelhas com drinks autorais da casa", preco: 42, foto: F("drinks") }],
};
const abas = Object.keys(cardapio);
const dias = [
  { d: "Qui", n: "15" },
  { d: "Sex", n: "16" },
  { d: "Sáb", n: "17" },
  { d: "Dom", n: "18" },
];
const horas = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;
const ouro = "text-[var(--c2)]";

export default function Restaurante({ t }: { t: Template }) {
  const [aba, setAba] = useState(abas[1]);
  const [pedido, setPedido] = useState<Record<string, number>>({});
  const [pessoas, setPessoas] = useState(2);
  const [dia, setDia] = useState(dias[1].n);
  const [hora, setHora] = useState(horas[2]);
  const [reservado, setReservado] = useState(false);
  const todos = Object.values(cardapio).flat();
  const qtd = Object.values(pedido).reduce((a, b) => a + b, 0);
  const total = Object.entries(pedido).reduce((s, [id, q]) => s + todos.find((i) => i.id === id)!.preco * q, 0);
  const muda = (id: string, d: number) => setPedido((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) + d) }));
  const res = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setReservado(false);
  };

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--c3)]/10 bg-[var(--c1)]/90 px-6 py-3.5 backdrop-blur-md">
        <span className="font-serif text-xl tracking-[.18em]">
          CASA <em className={`${ouro} not-italic`}>·</em> OLIVA
        </span>
        <span className="hidden gap-6 text-[11px] uppercase tracking-[.2em] opacity-70 @3xl:flex">
          <a>Cardápio</a>
          <a>Reservas</a>
          <a>Delivery</a>
          <a>Contato</a>
        </span>
        <button type="button" className="min-h-9 cursor-pointer border border-[var(--c2)] px-4 text-[11px] font-semibold uppercase tracking-[.18em] text-[var(--c2)] transition hover:bg-[var(--c2)] hover:text-[var(--c1)]">
          Reservar
        </button>
      </nav>

      {/* hero */}
      <header className="relative overflow-hidden px-6 pb-14 pt-12">
        <div aria-hidden="true" className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[var(--c2)]/10 blur-3xl" />
        <div className="relative grid items-center gap-10 @3xl:grid-cols-[1fr_1fr]">
          <div>
            <p className={`mb-4 text-[11px] font-semibold uppercase tracking-[.35em] ${ouro}`}>Cozinha autoral · desde 2009</p>
            <h3 className="mb-5 font-serif text-[2.7rem] leading-[1.02] @xl:text-[3.6rem]">
              Sabores que ficam na <em className={ouro}>memória</em>.
            </h3>
            <p className="mb-7 max-w-sm text-sm leading-relaxed opacity-70">Ingredientes do dia, fogo baixo e uma carta de vinhos pensada prato a prato.</p>
            <div className="mb-8 flex flex-wrap gap-3">
              <button type="button" className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[var(--c2)] px-6 text-[11px] font-bold uppercase tracking-[.18em] text-[var(--c1)] transition hover:brightness-110">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Reservar mesa
              </button>
              <button type="button" onClick={() => setAba(abas[1])} className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--c3)]/30 px-6 text-[11px] font-bold uppercase tracking-[.18em] transition hover:border-[var(--c2)] hover:text-[var(--c2)]">
                <Bike className="h-4 w-4" aria-hidden="true" />
                Pedir delivery
              </button>
            </div>
            <div className="flex items-center gap-5 text-xs">
              <span className="flex items-center gap-1.5">
                <Star className={`h-4 w-4 fill-current ${ouro}`} aria-hidden="true" />
                <b>4,8</b> <span className="opacity-60">· 1.240 avaliações</span>
              </span>
              <span className="flex items-center gap-1.5 opacity-70">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Aberto hoje até 23h
              </span>
            </div>
          </div>

          {/* mosaico em arcos */}
          <div className="relative mx-auto grid h-[300px] w-full max-w-[400px] grid-cols-3 items-end gap-3">
            {[
              { f: "salada", h: "h-[200px]", a: "Salada da horta" },
              { f: "prato", h: "h-[290px]", a: "Lombo envolto em bacon com camarões" },
              { f: "camarao", h: "h-[230px]", a: "Camarão na brasa" },
            ].map((x) => (
              <div key={x.f} className={`relative ${x.h} overflow-hidden rounded-t-full border border-[var(--c2)]/30 shadow-[0_25px_60px_rgba(0,0,0,.55)]`}>
                <Image src={F(x.f)} alt={x.a} fill sizes="140px" className="object-cover" />
              </div>
            ))}
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap border border-[var(--c2)]/40 bg-[var(--c1)] px-4 py-2 font-serif text-sm italic text-[var(--c2)]">
              prato do dia · {brl(98)}
            </span>
          </div>
        </div>
      </header>

      {/* cardápio */}
      <section className="border-t border-[var(--c3)]/10 px-6 py-14">
        <div className="mb-8 text-center">
          <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[.35em] ${ouro}`}>Descubra</p>
          <h4 className="font-serif text-4xl">Nosso cardápio</h4>
        </div>
        <div className="mb-7 flex justify-center gap-1 border-b border-[var(--c3)]/10" role="tablist" aria-label="Seções do cardápio">
          {abas.map((a) => (
            <button
              key={a}
              type="button"
              role="tab"
              aria-selected={aba === a}
              onClick={() => setAba(a)}
              className={`-mb-px min-h-10 cursor-pointer border-b-2 px-4 text-[11px] font-semibold uppercase tracking-[.18em] transition ${aba === a ? "border-[var(--c2)] text-[var(--c2)]" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <ul className="grid gap-4 @3xl:grid-cols-2">
          {cardapio[aba].map((i) => {
            const q = pedido[i.id] ?? 0;
            return (
              <li key={i.id} className="flex gap-4 border border-[var(--c3)]/10 bg-[var(--c3)]/[.03] p-3 transition hover:border-[var(--c2)]/40">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                  <Image src={i.foto} alt={i.nome} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg leading-tight">{i.nome}</span>
                    <span className="mb-1 flex-1 border-b border-dotted border-[var(--c3)]/25" />
                    <span className={`font-serif text-lg ${ouro}`}>{brl(i.preco)}</span>
                  </div>
                  <p className="mb-2 text-xs leading-snug opacity-60">{i.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    {i.selo ? <span className={`text-[10px] font-semibold uppercase tracking-[.2em] ${ouro}`}>{i.selo}</span> : <span />}
                    {q === 0 ? (
                      <button type="button" onClick={() => muda(i.id, 1)} className="min-h-8 cursor-pointer border border-[var(--c2)]/60 px-3 text-[10px] font-bold uppercase tracking-[.15em] text-[var(--c2)] transition hover:bg-[var(--c2)] hover:text-[var(--c1)]">
                        Adicionar
                      </button>
                    ) : (
                      <span className="flex items-center gap-2">
                        <button type="button" aria-label={`Remover ${i.nome}`} onClick={() => muda(i.id, -1)} className="grid h-8 w-8 cursor-pointer place-items-center border border-[var(--c3)]/25">
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{q}</span>
                        <button type="button" aria-label={`Adicionar ${i.nome}`} onClick={() => muda(i.id, 1)} className="grid h-8 w-8 cursor-pointer place-items-center bg-[var(--c2)] text-[var(--c1)]">
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {qtd > 0 && (
          <div className="sticky bottom-3 z-10 mt-6 flex items-center justify-between gap-3 bg-[var(--c2)] px-5 py-3.5 text-[var(--c1)] shadow-[0_20px_50px_rgba(0,0,0,.5)]" aria-live="polite">
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {qtd} {qtd > 1 ? "itens" : "item"} · {brl(total)}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[.15em]">Pedir no delivery →</span>
          </div>
        )}
      </section>

      {/* ambiente */}
      <section className="grid gap-3 px-6 pb-14 @3xl:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col justify-center border border-[var(--c2)]/25 p-7">
          <UtensilsCrossed className={`mb-4 h-6 w-6 ${ouro}`} aria-hidden="true" />
          <h4 className="mb-3 font-serif text-3xl leading-tight">
            Uma mesa para <em className={ouro}>celebrar</em>
          </h4>
          <p className="text-sm leading-relaxed opacity-65">Salão aconchegante, varanda com jardim e espaço reservado para aniversários e eventos de até 40 pessoas.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["drinks", "Drinks autorais e sobremesas"],
            ["mesa-esq", "Pratos para compartilhar"],
          ].map(([f, a]) => (
            <div key={f} className="relative aspect-[4/5] overflow-hidden">
              <Image src={F(f)} alt={a} fill sizes="180px" className="object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* reserva */}
      <section className="px-6 pb-14">
        <div className="border border-[var(--c2)]/30 bg-[var(--c3)]/[.03] p-6">
          <div className="mb-6 text-center">
            <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[.35em] ${ouro}`}>Reservas</p>
            <h4 className="font-serif text-3xl">Garanta sua mesa</h4>
          </div>
          <div className="grid gap-5 @3xl:grid-cols-3">
            <fieldset>
              <legend className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.15em] opacity-70">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Pessoas
              </legend>
              <div className="flex items-center justify-between border border-[var(--c3)]/20 p-1.5">
                <button type="button" aria-label="Menos pessoas" onClick={() => res(setPessoas)(Math.max(1, pessoas - 1))} className="grid h-9 w-9 cursor-pointer place-items-center hover:text-[var(--c2)]">
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="font-serif text-2xl">{pessoas}</span>
                <button type="button" aria-label="Mais pessoas" onClick={() => res(setPessoas)(Math.min(12, pessoas + 1))} className="grid h-9 w-9 cursor-pointer place-items-center hover:text-[var(--c2)]">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.15em] opacity-70">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                Dia
              </legend>
              <div className="grid grid-cols-4 gap-1.5">
                {dias.map((x) => (
                  <button
                    key={x.n}
                    type="button"
                    aria-pressed={dia === x.n}
                    onClick={() => res(setDia)(x.n)}
                    className={`flex cursor-pointer flex-col items-center border py-1.5 transition ${dia === x.n ? "border-[var(--c2)] bg-[var(--c2)] text-[var(--c1)]" : "border-[var(--c3)]/20 hover:border-[var(--c2)]"}`}
                  >
                    <span className="text-[9px] uppercase opacity-70">{x.d}</span>
                    <span className="font-serif text-lg leading-none">{x.n}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.15em] opacity-70">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Horário
              </legend>
              <div className="grid grid-cols-3 gap-1.5">
                {horas.map((h) => (
                  <button
                    key={h}
                    type="button"
                    aria-pressed={hora === h}
                    onClick={() => res(setHora)(h)}
                    className={`min-h-9 cursor-pointer border text-xs transition ${hora === h ? "border-[var(--c2)] bg-[var(--c2)] text-[var(--c1)]" : "border-[var(--c3)]/20 hover:border-[var(--c2)]"}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <button type="button" onClick={() => setReservado(true)} className="mt-6 min-h-12 w-full cursor-pointer bg-[var(--c2)] text-[11px] font-bold uppercase tracking-[.2em] text-[var(--c1)] transition hover:brightness-110">
            {reservado ? `✓ Mesa para ${pessoas} reservada · ${dias.find((x) => x.n === dia)!.d} ${dia} às ${hora}` : `Reservar para ${pessoas} ${pessoas > 1 ? "pessoas" : "pessoa"}`}
          </button>
        </div>
      </section>

      <footer className="border-t border-[var(--c3)]/10 px-6 py-8">
        <div className="grid gap-5 text-xs @3xl:grid-cols-3">
          <span className="font-serif text-lg tracking-[.18em]">CASA · OLIVA</span>
          <span className="flex items-center gap-2 opacity-70">
            <MapPin className={`h-4 w-4 ${ouro}`} aria-hidden="true" />
            Rua Aspicuelta, 210 · Vila Madalena · SP
          </span>
          <span className="flex items-center gap-2 opacity-70">
            <Clock className={`h-4 w-4 ${ouro}`} aria-hidden="true" />
            Ter a dom · 12h às 15h e 19h às 23h
          </span>
        </div>
      </footer>
    </DemoShell>
  );
}
