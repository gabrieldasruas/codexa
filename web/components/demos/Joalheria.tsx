"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Gift, Heart, RefreshCcw, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const COLAR = "/modelos/joalheria/colar.webp";
const ANEIS = "/modelos/joalheria/aneis.webp";

type Foto = { src: string; pos: string; zoom: number };
type Peca = { id: string; nome: string; cat: "Anéis" | "Colares" | "Kits"; preco: number; foto: Foto; selo?: string };

// as peças usam recortes ampliados das duas fotos (object-position + zoom)
const pecas: Peca[] = [
  { id: "gota", nome: "Colar Gota Rubi", cat: "Colares", preco: 1290, foto: { src: COLAR, pos: "62% 88%", zoom: 2 }, selo: "Mais vendido" },
  { id: "duo", nome: "Anel Rubi Duo", cat: "Anéis", preco: 690, foto: { src: COLAR, pos: "33% 36%", zoom: 2.6 } },
  { id: "halo", nome: "Anel Halo Rosé", cat: "Anéis", preco: 459, foto: { src: ANEIS, pos: "31% 52%", zoom: 2.6 }, selo: "Novo" },
  { id: "coracoes", nome: "Anel Corações", cat: "Anéis", preco: 329, foto: { src: ANEIS, pos: "50% 52%", zoom: 2.6 } },
  { id: "riviera", nome: "Colar Riviera", cat: "Colares", preco: 1890, foto: { src: COLAR, pos: "70% 58%", zoom: 1.5 } },
  { id: "solitario", nome: "Anel Solitário", cat: "Anéis", preco: 589, foto: { src: ANEIS, pos: "66% 50%", zoom: 2.6 } },
  { id: "esferas", nome: "Anel Esferas", cat: "Anéis", preco: 259, foto: { src: ANEIS, pos: "84% 50%", zoom: 2.6 } },
  { id: "kit", nome: "Kit Anéis Empilháveis", cat: "Kits", preco: 1190, foto: { src: ANEIS, pos: "55% 55%", zoom: 1.15 }, selo: "Presente" },
];
const cats = ["Todos", "Anéis", "Colares", "Kits"] as const;
const beneficios = [
  { icon: Truck, t: "Frete grátis", d: "acima de R$ 299" },
  { icon: Gift, t: "Embalagem presente", d: "em todas as peças" },
  { icon: RefreshCcw, t: "Troca em 30 dias", d: "sem complicação" },
  { icon: ShieldCheck, t: "Garantia de 1 ano", d: "prata 925 e ouro" },
];
const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Preenche o elemento pai (que precisa ser relative) com um recorte ampliado da foto. */
function Foto({ f, alt, sizes }: { f: Foto; alt: string; sizes: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={f.src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition duration-700 group-hover:scale-[1.06]"
        style={{ objectPosition: f.pos, transform: `scale(${f.zoom})`, transformOrigin: f.pos } as CSSProperties}
      />
    </div>
  );
}

export default function Joalheria({ t }: { t: Template }) {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const [sacola, setSacola] = useState<string[]>([]);
  const [fav, setFav] = useState<string[]>(["halo"]);
  const [aviso, setAviso] = useState<string | null>(null);
  const lista = pecas.filter((p) => cat === "Todos" || p.cat === cat);
  const total = sacola.reduce((s, id) => s + pecas.find((p) => p.id === id)!.preco, 0);

  const adicionar = (p: Peca) => {
    setSacola((s) => [...s, p.id]);
    setAviso(p.nome);
  };

  return (
    <DemoShell t={t} className="font-[family-name:var(--font-manrope)]">
      {/* faixa de promoção */}
      <div className="bg-[var(--c3)] px-6 py-2 text-center text-[11px] font-medium tracking-wide text-white">
        Frete grátis acima de R$ 299 · Embalagem de presente em todas as peças
      </div>

      {/* menu */}
      <nav className="sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center border-b border-[var(--c3)]/8 bg-[var(--c1)]/90 px-6 py-4 backdrop-blur-md">
        <span className="hidden gap-5 text-[11px] font-semibold uppercase tracking-[.18em] opacity-70 @3xl:flex">
          <a>Anéis</a>
          <a>Colares</a>
          <a>Coleções</a>
        </span>
        <span className="col-start-2 text-center font-serif text-xl tracking-[.35em]">
          AURUM
          <span className="block text-[8px] font-sans font-semibold tracking-[.5em] text-[var(--c2)]">JOIAS</span>
        </span>
        <span className="flex items-center justify-end gap-3">
          <Search className="hidden h-4 w-4 opacity-70 @xl:block" aria-hidden="true" />
          <Heart className="h-4 w-4 opacity-70" aria-hidden="true" />
          <span className="relative">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {sacola.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--c2)] px-1 text-[9px] font-bold text-white">{sacola.length}</span>
            )}
          </span>
        </span>
      </nav>

      {/* hero */}
      <header className="grid @3xl:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#f6e3e1] px-6 py-12 @3xl:px-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[.3em] text-[var(--c2)]">Nova coleção · Rubi</p>
          <h3 className="mb-5 font-serif text-[2.6rem] leading-[1.05] @xl:text-[3.2rem]">
            Brilho que conta a <em>sua</em> história.
          </h3>
          <p className="mb-7 max-w-sm text-sm leading-relaxed opacity-70">Peças em prata 925 e pedras selecionadas, feitas para marcar os momentos que importam.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setCat("Colares")} className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[var(--c3)] px-6 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[var(--c2)]">
              Comprar agora <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" className="inline-flex min-h-11 cursor-pointer items-center border border-[var(--c3)] px-6 text-xs font-bold uppercase tracking-[.15em] transition hover:bg-[var(--c3)] hover:text-white">
              Ver coleções
            </button>
          </div>
        </div>
        <div className="relative min-h-[380px] @3xl:min-h-[460px]">
          <Image src={COLAR} alt="Modelo usando colar com pingente de rubi e anel combinando" fill priority sizes="(max-width: 768px) 100vw, 500px" className="object-cover object-[50%_40%]" />
          <span className="absolute bottom-5 left-5 bg-white/90 px-4 py-2.5 text-[11px] backdrop-blur">
            <span className="block font-serif text-base">Colar Gota Rubi</span>
            <span className="font-semibold text-[var(--c2)]">{brl(1290)} · 10x sem juros</span>
          </span>
        </div>
      </header>

      {/* benefícios */}
      <ul className="grid grid-cols-2 gap-px border-b border-[var(--c3)]/8 bg-[var(--c3)]/8 @3xl:grid-cols-4">
        {beneficios.map((b) => (
          <li key={b.t} className="flex items-center gap-3 bg-[var(--c1)] px-5 py-4">
            <b.icon className="h-5 w-5 shrink-0 text-[var(--c2)]" aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-xs font-bold">{b.t}</span>
              <span className="block text-[11px] opacity-55">{b.d}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* vitrine */}
      <section className="px-6 py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[.3em] text-[var(--c2)]">Vitrine</p>
            <h4 className="font-serif text-3xl @xl:text-4xl">Peças em destaque</h4>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Categorias">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`min-h-9 cursor-pointer rounded-full border px-4 text-xs font-semibold transition ${cat === c ? "border-[var(--c3)] bg-[var(--c3)] text-white" : "border-[var(--c3)]/15 hover:border-[var(--c3)]"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 @3xl:grid-cols-4">
          {lista.map((p) => {
            const on = fav.includes(p.id);
            return (
              <li key={p.id} className="group">
                <div className="relative mb-3 aspect-square overflow-hidden bg-[#f3e6e3]">
                  <Foto f={p.foto} alt={p.nome} sizes="(max-width: 768px) 45vw, 230px" />
                  {p.selo && <span className="absolute left-2.5 top-2.5 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{p.selo}</span>}
                  <button
                    type="button"
                    aria-label={on ? `Remover ${p.nome} dos favoritos` : `Favoritar ${p.nome}`}
                    aria-pressed={on}
                    onClick={() => setFav((f) => (on ? f.filter((x) => x !== p.id) : [...f, p.id]))}
                    className="absolute right-2.5 top-2.5 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/90 transition hover:scale-110"
                  >
                    <Heart className={`h-4 w-4 ${on ? "fill-[var(--c2)] text-[var(--c2)]" : ""}`} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => adicionar(p)}
                    className="absolute inset-x-2.5 bottom-2.5 min-h-9 cursor-pointer bg-[var(--c3)] text-[11px] font-bold uppercase tracking-[.15em] text-white opacity-100 transition @3xl:translate-y-2 @3xl:opacity-0 @3xl:group-hover:translate-y-0 @3xl:group-hover:opacity-100"
                  >
                    Adicionar à sacola
                  </button>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] opacity-50">{p.cat}</p>
                <p className="text-sm font-semibold">{p.nome}</p>
                <p className="text-sm">
                  {brl(p.preco)} <span className="text-[11px] opacity-55">ou 10x de {brl(Math.ceil(p.preco / 10))}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* sacola */}
      {sacola.length > 0 && (
        <div className="sticky bottom-3 z-20 mx-6 mb-6 flex flex-wrap items-center justify-between gap-3 bg-[var(--c3)] px-5 py-3.5 text-white shadow-[0_20px_50px_rgba(30,26,26,.35)]" aria-live="polite">
          <span className="text-xs">
            {aviso && <span className="mb-0.5 block opacity-70">✓ {aviso} adicionado</span>}
            <span className="font-bold">
              Sacola ({sacola.length}) · {brl(total)}
            </span>
          </span>
          <button type="button" className="min-h-9 cursor-pointer bg-white px-4 text-[11px] font-bold uppercase tracking-[.15em] text-[var(--c3)]">
            Finalizar compra
          </button>
        </div>
      )}

      {/* banner presente */}
      <section className="px-6 pb-14">
        <div className="group relative grid overflow-hidden bg-[#f6e3e1] @3xl:grid-cols-2">
          <div className="relative min-h-64">
            <Image src={ANEIS} alt="Anéis de prata em caixa de presente rosa" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center p-8">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.3em] text-[var(--c2)]">Para presentear</p>
            <h4 className="mb-3 font-serif text-3xl leading-tight">
              O presente <em>perfeito</em> já vem embrulhado.
            </h4>
            <p className="mb-6 text-sm opacity-70">Caixa assinada, cartão escrito à mão e entrega no prazo para a data especial.</p>
            <button type="button" onClick={() => setCat("Kits")} className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 bg-[var(--c3)] px-6 text-xs font-bold uppercase tracking-[.15em] text-white transition hover:bg-[var(--c2)]">
              Ver kits presente <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* coleções */}
      <section className="px-6 pb-14">
        <h4 className="mb-6 text-center font-serif text-3xl">Coleções</h4>
        <div className="grid gap-3 @xl:grid-cols-3">
          {[
            { n: "Rubi", f: { src: COLAR, pos: "60% 80%", zoom: 1.4 } },
            { n: "Rosé", f: { src: ANEIS, pos: "30% 50%", zoom: 1.8 } },
            { n: "Clássicos", f: { src: ANEIS, pos: "70% 50%", zoom: 1.8 } },
          ].map((c) => (
            <button key={c.n} type="button" className="group relative aspect-[4/5] cursor-pointer overflow-hidden text-left @xl:aspect-[3/4]">
              <Foto f={c.f} alt={`Coleção ${c.n}`} sizes="(max-width: 768px) 90vw, 300px" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white">
                <span className="block font-serif text-2xl">{c.n}</span>
                <span className="text-[10px] font-bold uppercase tracking-[.2em] opacity-85">Explorar →</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* newsletter + rodapé */}
      <footer className="bg-[var(--c3)] px-6 py-10 text-white">
        <div className="mb-8 grid items-center gap-5 @3xl:grid-cols-2">
          <div>
            <p className="font-serif text-2xl">Ganhe 10% na primeira compra</p>
            <p className="text-xs opacity-60">Cadastre seu e-mail e receba as novidades antes de todo mundo.</p>
          </div>
          <div className="flex gap-2">
            <span className="flex min-h-11 flex-1 items-center border border-white/25 px-4 text-xs opacity-60">seu@email.com</span>
            <button type="button" className="min-h-11 cursor-pointer bg-white px-5 text-[11px] font-bold uppercase tracking-[.15em] text-[var(--c3)]">
              Quero
            </button>
          </div>
        </div>
        <p className="border-t border-white/10 pt-5 text-[11px] opacity-50">© 2026 Aurum Joias · Prata 925 e ouro 18k</p>
      </footer>
    </DemoShell>
  );
}
