"use client";

import { useState } from "react";
import { Truck as TruckIcon, Package, MapPin, Check, Search, Shield, Clock } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell, btn } from "./DemoShell";
import Truck, { type TruckKind } from "./art/Truck";

const etapas = ["Coletado", "Em trânsito", "No centro de distribuição", "Saiu para entrega", "Entregue"];
const cidades = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador", "Porto Alegre"];
const frota: { kind: TruckKind; nome: string; capacidade: string; uso: string }[] = [
  { kind: "van", nome: "Van de carga", capacidade: "até 1,5 t", uso: "Entregas urbanas e expressas" },
  { kind: "box", nome: "Caminhão baú", capacidade: "até 6 t", uso: "Mudanças e cargas fracionadas" },
  { kind: "semi", nome: "Carreta", capacidade: "até 28 t", uso: "Longas distâncias e lotação" },
];

export default function Transportadora({ t }: { t: Template }) {
  const [codigo, setCodigo] = useState("CDX-48213");
  const [etapa, setEtapa] = useState(-1);
  const [de, setDe] = useState("São Paulo");
  const [para, setPara] = useState("Salvador");
  const [peso, setPeso] = useState(120);

  const dist = Math.abs(cidades.indexOf(de) - cidades.indexOf(para)) + 1;
  const valor = Math.round(80 + dist * 140 + peso * 1.8);
  const prazo = 1 + dist;

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-10 flex items-center justify-between bg-[var(--c1)]/95 px-6 py-3.5 backdrop-blur">
        <span className="flex items-center gap-2 text-sm font-bold tracking-wide"><TruckIcon className="h-5 w-5 text-[var(--c2)]" aria-hidden="true" />TRANSNORTE</span>
        <span className="hidden gap-5 text-xs opacity-70 @xl:flex"><a>Rastreio</a><a>Cotação</a><a>Frota</a><a>Cobertura</a></span>
        <button type="button" className={btn}>Área do cliente</button>
      </nav>

      <header className="relative overflow-hidden px-6 py-12">
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_85%_30%,var(--c2),transparent_45%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[.07] [background:repeating-linear-gradient(90deg,#fff_0_1px,transparent_1px_48px)]" aria-hidden="true" />
        <div className="relative grid items-center gap-8 @xl:grid-cols-[1fr_1fr]">
          <div className="max-w-lg">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.25em] text-[var(--c2)]">Logística nacional</p>
            <h3 className="mb-4 text-3xl font-bold leading-tight @xl:text-5xl">Sua carga, <br />no prazo certo.</h3>
            <p className="mb-6 text-sm opacity-75">Rastreie sua encomenda em tempo real ou calcule um frete em segundos.</p>
            <form className="flex gap-2 rounded-xl bg-white p-1.5 text-[var(--c1)]" onSubmit={(e) => { e.preventDefault(); setEtapa(0); setTimeout(() => setEtapa(2), 500); }}>
              <label className="flex flex-1 items-center gap-2 px-3"><Search className="h-4 w-4 opacity-50" aria-hidden="true" /><span className="sr-only">Código de rastreio</span>
                <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full bg-transparent text-sm outline-none" /></label>
              <button type="submit" className={btn}>Rastrear</button>
            </form>
          </div>
          <Truck kind="semi" brand="TRANSNORTE" className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,.35)]" />
        </div>
      </header>

      {etapa >= 0 && (
        <section className="px-6 pt-8" aria-live="polite">
          <h4 className="mb-4 text-lg font-bold">Encomenda {codigo}</h4>
          <ol className="flex flex-col gap-3">
            {etapas.map((e, i) => (
              <li key={e} className={`flex items-center gap-3 text-sm transition ${i <= etapa ? "" : "opacity-35"}`}>
                <span className={`grid h-6 w-6 place-items-center rounded-full ${i <= etapa ? "bg-[var(--c2)] text-[var(--c1)]" : "border border-[var(--c3)]/30"}`}>{i <= etapa && <Check className="h-3.5 w-3.5" aria-hidden="true" />}</span>{e}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="px-6 py-10">
        <h4 className="mb-5 text-xl font-bold">Cotação de frete</h4>
        <div className="grid gap-4 rounded-2xl border border-[var(--c3)]/15 bg-[var(--c3)]/5 p-5 @xl:grid-cols-2">
          <div className="flex flex-col gap-3 text-xs">
            {[["Origem", de, setDe], ["Destino", para, setPara]].map(([l, v, set]) => (
              <label key={l as string} className="flex flex-col gap-1">{l as string}
                <select value={v as string} onChange={(e) => (set as (s: string) => void)(e.target.value)} className="min-h-10 cursor-pointer rounded-lg border border-[var(--c3)]/20 bg-[var(--c1)] px-3 text-sm">
                  {cidades.map((c) => <option key={c}>{c}</option>)}
                </select></label>
            ))}
            <label className="flex flex-col gap-1">Peso: {peso} kg
              <input type="range" min={10} max={1000} value={peso} onChange={(e) => setPeso(+e.target.value)} className="cursor-pointer accent-[var(--c2)]" /></label>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-[var(--c2)] p-5 text-[var(--c1)]">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Estimativa</span>
            <span className="text-4xl font-bold">R$ {valor.toLocaleString("pt-BR")}</span>
            <span className="mt-1 flex items-center gap-1 text-xs"><Clock className="h-3.5 w-3.5" aria-hidden="true" />Entrega em até {prazo} dias úteis</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <h4 className="mb-5 text-xl font-bold">Nossa frota</h4>
        <div className="grid gap-3 @xl:grid-cols-3">
          {frota.map((f) => (
            <article key={f.kind} className="group overflow-hidden rounded-2xl border border-[var(--c3)]/15 bg-gradient-to-b from-[var(--c3)]/10 to-transparent">
              <div className="px-3 pt-5">
                <Truck kind={f.kind} className="w-full transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between"><h5 className="font-bold">{f.nome}</h5><span className="rounded-full bg-[var(--c2)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--c1)]">{f.capacidade}</span></div>
                <p className="mt-1 text-xs opacity-65">{f.uso}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-3 px-6 pb-12 @xl:grid-cols-3">
        {[[Package, "+2 milhões", "encomendas entregues"], [MapPin, "1.200 cidades", "atendidas no país"], [Shield, "Carga segurada", "da coleta à entrega"]].map(([Icon, a, b]) => {
          const I = Icon as typeof Package;
          return <div key={a as string} className="rounded-xl border border-[var(--c3)]/15 p-4"><I className="mb-2 h-5 w-5 text-[var(--c2)]" aria-hidden="true" /><div className="font-bold">{a as string}</div><div className="text-xs opacity-65">{b as string}</div></div>;
        })}
      </section>
    </DemoShell>
  );
}
