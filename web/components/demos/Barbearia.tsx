"use client";

import { useState } from "react";
import { Scissors, Check, Clock, MapPin } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell, btn } from "./DemoShell";
import Hair, { type HairStyle } from "./art/Hair";

const servicos = [
  { id: "corte", nome: "Corte clássico", preco: 55, tempo: "40 min" },
  { id: "barba", nome: "Barba com toalha quente", preco: 40, tempo: "30 min" },
  { id: "combo", nome: "Corte + barba", preco: 85, tempo: "70 min" },
  { id: "sobrancelha", nome: "Sobrancelha", preco: 20, tempo: "15 min" },
];
const horarios = ["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"];

const estilos: { style: HairStyle; nome: string; skin: string; hair: string }[] = [
  { style: "fade", nome: "Degradê", skin: "#e8b896", hair: "#2b1d16" },
  { style: "pompadour", nome: "Pompadour", skin: "#c68642", hair: "#1a1210" },
  { style: "social", nome: "Social", skin: "#f1c9a5", hair: "#6b4423" },
  { style: "curly", nome: "Cacheado", skin: "#8d5524", hair: "#1a1210" },
  { style: "beard", nome: "Barba e bigode", skin: "#d9a578", hair: "#2b1d16" },
  { style: "buzz", nome: "Zero", skin: "#a9713f", hair: "#111111" },
];

const equipe = [
  { nome: "Rafael", funcao: "Degradê e navalha", style: "fade" as HairStyle, skin: "#e8b896", hair: "#2b1d16", beard: false },
  { nome: "Diego", funcao: "Barba e bigode", style: "bun" as HairStyle, skin: "#c68642", hair: "#3a2416", beard: true },
  { nome: "Caio", funcao: "Cortes clássicos", style: "social" as HairStyle, skin: "#8d5524", hair: "#111111", beard: false },
];

export default function Barbearia({ t }: { t: Template }) {
  const [sel, setSel] = useState<string[]>(["corte"]);
  const [hora, setHora] = useState("13:00");
  const [estilo, setEstilo] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const total = servicos.filter((s) => sel.includes(s.id)).reduce((a, s) => a + s.preco, 0);
  const toggle = (id: string) => {
    setOk(false);
    setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--c3)]/10 bg-[var(--c1)]/90 px-6 py-3.5 backdrop-blur">
        <span className="flex items-center gap-2 font-serif text-sm tracking-[.2em]"><Scissors className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />BARBA &amp; NAVALHA</span>
        <span className="hidden gap-5 text-[11px] uppercase tracking-widest opacity-70 @xl:flex"><a>Estilos</a><a>Serviços</a><a>Equipe</a></span>
        <button type="button" className={btn}>Agendar</button>
      </nav>

      <header className="grid items-center gap-8 px-6 py-12 @xl:grid-cols-2">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[.3em] text-[var(--c2)]">Desde 2012 · São Paulo</p>
          <h3 className="mb-4 font-serif text-4xl leading-tight @xl:text-5xl">Tradição em cada <em className="text-[var(--c2)]">corte</em>.</h3>
          <p className="mb-6 max-w-sm text-sm opacity-70">Ambiente reservado, navalha afiada e atendimento com hora marcada. Escolha seu estilo, seus serviços e o horário abaixo.</p>
          <a className={btn}>Ver estilos</a>
        </div>
        <div className="relative mx-auto h-64 w-52 @xl:h-80 @xl:w-64">
          <div className="absolute inset-0 rounded-t-[999px] rounded-b-2xl bg-gradient-to-b from-[var(--c2)] to-[var(--c2)]/15" />
          <Hair style="pompadour" skin="#c68642" hair="#1a1210" className="absolute inset-x-0 bottom-0 h-[96%] w-full" />
          <div className="absolute -right-3 bottom-6 h-28 w-5 rounded-full border border-[var(--c3)]/30 [background:repeating-linear-gradient(45deg,#e5e5e5_0_8px,#c0392b_8px_16px,#2b4c9b_16px_24px)]" aria-hidden="true" />
        </div>
      </header>

      <section className="px-6 py-10">
        <h4 className="mb-1 font-serif text-2xl">Estilos da casa</h4>
        <p className="mb-5 text-xs opacity-60">Toque em um estilo para levá-lo ao seu agendamento.</p>
        <div className="grid grid-cols-2 gap-3 @xl:grid-cols-3">
          {estilos.map((e) => {
            const on = estilo === e.nome;
            return (
              <button key={e.nome} type="button" aria-pressed={on} onClick={() => { setEstilo(on ? null : e.nome); setOk(false); }}
                className={`group cursor-pointer overflow-hidden rounded-xl border text-left transition ${on ? "border-[var(--c2)] bg-[var(--c2)]/10" : "border-[var(--c3)]/12 bg-[var(--c3)]/[.04] hover:border-[var(--c2)]/60"}`}>
                <div className="aspect-[5/6] overflow-hidden bg-gradient-to-b from-[var(--c2)]/25 to-transparent">
                  <Hair style={e.style} skin={e.skin} hair={e.hair} className="h-full w-full translate-y-3 transition duration-500 group-hover:scale-110" />
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 text-xs font-medium">
                  {e.nome}
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${on ? "border-[var(--c2)] bg-[var(--c2)] text-[var(--c1)]" : "border-[var(--c3)]/30"}`}>{on && <Check className="h-2.5 w-2.5" aria-hidden="true" />}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-10">
        <h4 className="mb-1 font-serif text-2xl">Monte seu atendimento</h4>
        <p className="mb-5 text-xs opacity-60">Toque nos serviços e escolha um horário.</p>
        <div className="grid gap-3 @xl:grid-cols-2">
          {servicos.map((s) => {
            const on = sel.includes(s.id);
            return (
              <button key={s.id} type="button" aria-pressed={on} onClick={() => toggle(s.id)}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition ${on ? "border-[var(--c2)] bg-[var(--c2)]/10" : "border-[var(--c3)]/15 hover:border-[var(--c2)]/60"}`}>
                <span>
                  <span className="block text-sm font-medium">{s.nome}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[11px] opacity-60"><Clock className="h-3 w-3" aria-hidden="true" />{s.tempo}</span>
                </span>
                <span className="flex items-center gap-3 text-sm font-semibold text-[var(--c2)]">R$ {s.preco}
                  <span className={`grid h-5 w-5 place-items-center rounded-full border ${on ? "border-[var(--c2)] bg-[var(--c2)] text-[var(--c1)]" : "border-[var(--c3)]/30"}`}>{on && <Check className="h-3 w-3" aria-hidden="true" />}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Horários">
          {horarios.map((h) => (
            <button key={h} type="button" aria-pressed={hora === h} onClick={() => { setHora(h); setOk(false); }}
              className={`min-h-9 cursor-pointer rounded-full border px-4 text-xs transition ${hora === h ? "border-[var(--c2)] bg-[var(--c2)] text-[var(--c1)]" : "border-[var(--c3)]/20 hover:border-[var(--c2)]"}`}>{h}</button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--c3)]/5 p-4">
          <div className="text-xs"><span className="opacity-60">Total{estilo ? ` · ${estilo}` : ""}</span><div className="font-serif text-2xl text-[var(--c2)]">R$ {total}</div></div>
          <button type="button" disabled={!sel.length} onClick={() => setOk(true)} className={`${btn} disabled:opacity-40`}>{ok ? "Agendado ✓" : `Confirmar às ${hora}`}</button>
        </div>
      </section>

      <section className="px-6 py-10">
        <h4 className="mb-5 font-serif text-2xl">Nossa equipe</h4>
        <div className="grid gap-3 @xl:grid-cols-3">
          {equipe.map((m) => (
            <div key={m.nome} className="flex items-center gap-4 rounded-xl border border-[var(--c3)]/12 p-3">
              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[var(--c2)]/30 to-transparent">
                <Hair style={m.style} skin={m.skin} hair={m.hair} beard={m.beard} className="h-full w-full translate-y-2" />
              </div>
              <div><div className="font-serif text-lg">{m.nome}</div><div className="text-xs opacity-65">{m.funcao}</div></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex items-center gap-2 border-t border-[var(--c3)]/10 px-6 py-6 text-xs opacity-70"><MapPin className="h-4 w-4" aria-hidden="true" />Rua das Palmeiras, 120 · Seg a Sáb, 9h às 20h</footer>
    </DemoShell>
  );
}
