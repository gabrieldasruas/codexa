"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  Clock,
  Container,
  DollarSign,
  Gauge,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const etapas = ["Coleta realizada", "Em trânsito", "Centro de distribuição", "Saiu para entrega", "Entregue"];
const cidades = ["São Paulo", "Campinas", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador"];
const numeros = [
  { icon: DollarSign, n: "+R$ 1,2 bi", l: "em mercadorias movimentadas em 2026" },
  { icon: Warehouse, n: "+40 mil m²", l: "de armazéns e centros de distribuição" },
  { icon: Truck, n: "+230", l: "veículos próprios e agregados" },
  { icon: Users, n: "+500", l: "empresas atendidas em todo o Brasil" },
  { icon: Gauge, n: "98%", l: "de pontualidade nas entregas" },
];
const servicos = [
  { icon: Truck, t: "Cargas dedicadas", d: "Veículo exclusivo para a sua carga, rota otimizada e entrega no prazo combinado." },
  { icon: Package, t: "Carga fracionada", d: "Envie volumes menores pagando só pelo espaço que usar, com a mesma segurança." },
  { icon: Container, t: "Transporte de contêiner", d: "Movimentação de importação, exportação e cabotagem nos principais portos." },
  { icon: ShieldCheck, t: "Transporte seguro", d: "Escolta, rastreamento 24h e seguro da coleta até a entrega final." },
  { icon: Boxes, t: "Armazém e WMS", d: "Armazenagem com gestão de estoque em tempo real e inventário digital." },
  { icon: BarChart3, t: "Cross-docking ágil", d: "Recebimento e expedição no mesmo dia, sem custo de estoque parado." },
];
const filiais = [
  { c: "Matriz · São Paulo", e: "SP" },
  { c: "Campinas", e: "SP" },
  { c: "Rio de Janeiro", e: "RJ" },
  { c: "Curitiba", e: "PR" },
  { c: "Belo Horizonte", e: "MG" },
  { c: "Porto Alegre", e: "RS" },
];
const selos = ["ISO 9001", "SASSMAQ", "ANTT regularizada", "Seguro RCTR-C"];

const OR = "#ff6a13";
const orangeBtn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,106,19,.4)] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95";
const ghostBtn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60";
const eyebrow = "mb-3 text-[11px] font-bold uppercase tracking-[.28em] text-[var(--c2)]";
const h2 = "text-3xl font-extrabold leading-[1.05] tracking-tight @xl:text-4xl";

function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex -space-x-1.5 text-[var(--c2)]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <svg key={i} viewBox="0 0 12 16" className="h-4 w-3" fill="currentColor" style={{ opacity: 0.55 + i * 0.22 }}>
            <path d="M0 0h5l7 8-7 8H0l7-8z" />
          </svg>
        ))}
      </span>
      <span className="leading-none">
        <span className="block text-sm font-extrabold tracking-wide">CODEXA</span>
        <span className="block text-[9px] font-semibold uppercase tracking-[.3em] opacity-60">Transportes</span>
      </span>
    </span>
  );
}

export default function Transportadora({ t }: { t: Template }) {
  const [codigo, setCodigo] = useState("CDX-48213");
  const [etapa, setEtapa] = useState(-1);
  const [de, setDe] = useState("São Paulo");
  const [para, setPara] = useState("Curitiba");
  const [peso, setPeso] = useState(800);
  const [tipo, setTipo] = useState<"dedicada" | "fracionada">("fracionada");
  const [pedido, setPedido] = useState(false);

  const dist = Math.abs(cidades.indexOf(de) - cidades.indexOf(para)) + 1;
  const valor = Math.round((tipo === "dedicada" ? 1400 : 180) + dist * (tipo === "dedicada" ? 420 : 110) + peso * (tipo === "dedicada" ? 0.4 : 1.1));
  const prazo = Math.max(1, Math.ceil(dist * (tipo === "dedicada" ? 0.7 : 1.2)));
  const mexe = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setPedido(false);
  };

  return (
    <DemoShell t={t}>
      {/* menu */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-white/8 bg-[var(--c1)]/85 px-6 py-3.5 backdrop-blur-md">
        <Logo />
        <span className="hidden gap-6 text-xs font-medium opacity-70 @3xl:flex">
          <a>Soluções</a>
          <a>Rastreio</a>
          <a>Filiais</a>
          <a>Contato</a>
        </span>
        <button type="button" className={`${orangeBtn} !min-h-9 !px-4 !text-xs`} style={{ background: OR }}>
          Solicitar cotação
        </button>
      </nav>

      {/* hero com foto */}
      <header className="relative overflow-hidden">
        <Image src="/modelos/transportadora/estrada.webp" alt="Caminhões da Codexa Transportes na rodovia ao anoitecer" fill priority sizes="1000px" className="object-cover object-[50%_60%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[var(--c1)] via-[var(--c1)]/85 to-[var(--c1)]/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--c1)] via-transparent to-[var(--c1)]/40" />
        <div className="relative px-6 pb-10 pt-14 @3xl:pb-14 @3xl:pt-20">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: OR }} />
            Atendimento nacional · 24 horas
          </span>
          <h3 className="mb-5 max-w-xl text-[2.4rem] font-extrabold leading-[1.02] tracking-tight @xl:text-[3.3rem]">
            Logística inteligente que move o seu negócio para <span style={{ color: OR }}>frente</span>.
          </h3>
          <p className="mb-7 max-w-md text-sm leading-relaxed opacity-75">
            Transporte dedicado, carga fracionada e contêineres, com armazenagem e cross-docking nos principais polos do Sul e do Sudeste.
          </p>
          <div className="mb-8 flex flex-wrap gap-3">
            <button type="button" className={orangeBtn} style={{ background: OR }}>
              Solicitar cotação <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" className={ghostBtn}>
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              Diagnóstico logístico grátis
            </button>
          </div>

          {/* rastreio */}
          <form
            className="flex max-w-md items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-1.5 backdrop-blur-md"
            onSubmit={(e) => {
              e.preventDefault();
              setEtapa(1);
              setTimeout(() => setEtapa(2), 450);
            }}
          >
            <label className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 opacity-60" aria-hidden="true" />
              <span className="sr-only">Código de rastreio</span>
              <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50" placeholder="Código de rastreio" />
            </label>
            <button type="submit" className="min-h-10 cursor-pointer rounded-xl bg-white px-4 text-xs font-bold text-[var(--c1)] transition hover:bg-white/90">
              Rastrear
            </button>
          </form>
        </div>
      </header>

      {/* números */}
      <section className="px-6 pb-10">
        <ul className="grid grid-cols-2 gap-3 @3xl:grid-cols-5">
          {numeros.map((n) => (
            <li key={n.n} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:border-[var(--c2)]/60">
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-full text-white shadow-[0_6px_18px_rgba(255,106,19,.45)]" style={{ background: OR }}>
                <n.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="block text-xl font-extrabold">{n.n}</span>
              <span className="block text-[11px] leading-snug opacity-60">{n.l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* resultado do rastreio */}
      {etapa >= 0 && (
        <section className="px-6 pb-10" aria-live="polite">
          <div className="rounded-2xl border border-[var(--c2)]/40 bg-[var(--c2)]/[.06] p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-bold">Carga {codigo}</span>
              <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: OR }}>
                Previsão: amanhã, até 18h
              </span>
            </div>
            <ol className="grid gap-3 @xl:grid-cols-5">
              {etapas.map((e, i) => (
                <li key={e} className={`flex items-center gap-2 text-xs transition @xl:flex-col @xl:items-start ${i <= etapa ? "" : "opacity-35"}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${i <= etapa ? "text-white" : "border border-white/30"}`} style={i <= etapa ? { background: OR } : undefined}>
                    {i <= etapa ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  {e}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* serviços */}
      <section className="bg-white px-6 py-14 text-[var(--c1)]">
        <p className={eyebrow}>Soluções</p>
        <h4 className={`${h2} mb-8 max-w-md`}>Soluções logísticas sob medida</h4>
        <div className="grid gap-4 @3xl:grid-cols-[1.1fr_2fr]">
          <div className="relative min-h-64 overflow-hidden rounded-[22px]">
            <Image src="/modelos/transportadora/carga.webp" alt="Carga paletizada sendo embarcada no caminhão" fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover object-[78%_50%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="mb-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: OR }}>
                Destaque
              </span>
              <p className="text-lg font-extrabold leading-tight">Coleta em até 24h nas capitais</p>
            </div>
          </div>
          <ul className="grid gap-3 @xl:grid-cols-2">
            {servicos.map((s) => (
              <li key={s.t} className="group rounded-2xl border border-black/8 bg-[#f6f7f9] p-5 transition hover:-translate-y-0.5 hover:border-[var(--c2)] hover:bg-white hover:shadow-[0_18px_40px_rgba(10,13,18,.08)]">
                <s.icon className="mb-3 h-6 w-6 text-[var(--c2)]" aria-hidden="true" />
                <span className="mb-1 block text-sm font-bold">{s.t}</span>
                <span className="block text-xs leading-relaxed opacity-65">{s.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* cotação */}
      <section className="px-6 py-14">
        <p className={eyebrow}>Cotação online</p>
        <h4 className={`${h2} mb-8`}>
          Calcule seu frete em <span style={{ color: OR }}>segundos</span>
        </h4>
        <div className="grid gap-4 overflow-hidden rounded-[24px] border border-white/10 bg-white/[.03] p-5 @3xl:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-4 text-xs">
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Tipo de carga">
              {(["fracionada", "dedicada"] as const).map((x) => (
                <button
                  key={x}
                  type="button"
                  aria-pressed={tipo === x}
                  onClick={() => mexe(setTipo)(x)}
                  className={`min-h-11 cursor-pointer rounded-xl border text-xs font-bold capitalize transition ${tipo === x ? "border-[var(--c2)] bg-[var(--c2)]/15 text-[var(--c2)]" : "border-white/15 hover:border-white/40"}`}
                >
                  Carga {x}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["Origem", de, setDe],
                  ["Destino", para, setPara],
                ] as const
              ).map(([l, v, set]) => (
                <label key={l} className="flex flex-col gap-1.5 font-semibold opacity-90">
                  {l}
                  <select value={v} onChange={(e) => mexe(set)(e.target.value)} className="min-h-11 cursor-pointer rounded-xl border border-white/15 bg-[var(--c1)] px-3 text-sm font-normal">
                    {cidades.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <label className="flex flex-col gap-2 font-semibold">
              <span className="flex justify-between">
                Peso da carga <span style={{ color: OR }}>{peso.toLocaleString("pt-BR")} kg</span>
              </span>
              <input type="range" min={50} max={10000} step={50} value={peso} onChange={(e) => mexe(setPeso)(+e.target.value)} className="cursor-pointer accent-[var(--c2)]" />
            </label>
          </div>
          <div className="flex flex-col justify-between gap-5 rounded-2xl p-5 text-white" style={{ background: `linear-gradient(140deg, ${OR}, #c2410c)` }}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[.2em] opacity-80">Estimativa</span>
              <span className="mt-1 block text-4xl font-extrabold">R$ {valor.toLocaleString("pt-BR")}</span>
              <span className="mt-2 flex items-center gap-1.5 text-xs opacity-90">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Entrega em até {prazo} {prazo > 1 ? "dias úteis" : "dia útil"}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-xs opacity-90">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Seguro e rastreio 24h inclusos
              </span>
            </div>
            <button type="button" onClick={() => setPedido(true)} className="min-h-11 cursor-pointer rounded-xl bg-white text-sm font-bold text-[#c2410c] transition hover:bg-white/90">
              {pedido ? "✓ Cotação enviada! Retornamos em minutos" : "Fechar esta cotação"}
            </button>
          </div>
        </div>
      </section>

      {/* certificações */}
      <section className="px-6 pb-14">
        <div className="grid items-center gap-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[.06] to-transparent p-6 @3xl:grid-cols-[1fr_1.4fr]">
          <div>
            <p className={eyebrow}>Certificações</p>
            <h4 className="text-2xl font-extrabold leading-tight">Segurança e conformidade em cada viagem</h4>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {selos.map((s) => (
              <li key={s} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-3.5 py-3 text-xs font-bold">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* filiais */}
      <section className="px-6 pb-14">
        <p className={eyebrow}>Nossas filiais</p>
        <h4 className={`${h2} mb-6`}>Presença onde a sua carga precisa</h4>
        <ul className="grid grid-cols-2 gap-3 @3xl:grid-cols-3">
          {filiais.map((f, i) => (
            <li key={f.c} className={`flex items-center gap-3 rounded-2xl border p-4 ${i === 0 ? "border-[var(--c2)]/60 bg-[var(--c2)]/10" : "border-white/10 bg-white/[.03]"}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8">
                {i === 0 ? <Building2 className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" /> : <MapPin className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold">{f.c}</span>
                <span className="block text-[11px] opacity-55">{f.e}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* chamada final */}
      <section className="px-6 pb-14">
        <div className="relative overflow-hidden rounded-[24px] p-7 text-white" style={{ background: `linear-gradient(120deg, ${OR}, #b23a06)` }}>
          <div aria-hidden="true" className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div>
              <h4 className="mb-1 text-2xl font-extrabold">Faça sua cotação</h4>
              <p className="text-sm opacity-85">Resposta em minutos, com preço fechado e prazo garantido.</p>
            </div>
            <button type="button" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#b23a06] transition hover:-translate-y-0.5">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <span className="text-[11px] opacity-50">© 2026 Codexa Transportes · CNPJ 00.000.000/0001-00</span>
        </div>
      </footer>
    </DemoShell>
  );
}
