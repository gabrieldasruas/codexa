"use client";

import { useState } from "react";
import { Smile, CalendarDays, Star, ShieldCheck } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell, btn } from "./DemoShell";
import Dental, { type DentalKind } from "./art/Dental";
import Hair, { type HairStyle } from "./art/Hair";

const tratamentos: { id: string; nome: string; texto: string; itens: string[]; kind: DentalKind }[] = [
  { id: "clareamento", nome: "Clareamento", kind: "tooth", texto: "Sorriso mais branco em poucas sessões, com técnica segura e sem sensibilidade.", itens: ["A laser ou caseiro", "Resultado em 1 semana", "Acompanhamento incluso"] },
  { id: "orto", nome: "Ortodontia", kind: "aligner", texto: "Alinhadores transparentes e aparelhos modernos para todas as idades.", itens: ["Alinhadores invisíveis", "Planejamento digital", "Parcelamento facilitado"] },
  { id: "implante", nome: "Implantes", kind: "implant", texto: "Reabilitação completa com tecnologia 3D e recuperação rápida.", itens: ["Tomografia 3D", "Cirurgia guiada", "Garantia estendida"] },
  { id: "limpeza", nome: "Limpeza", kind: "clean", texto: "Prevenção e cuidado regular para manter a saúde bucal em dia.", itens: ["Profilaxia completa", "Aplicação de flúor", "Orientação personalizada"] },
];
const dias = ["Seg 12", "Ter 13", "Qua 14", "Qui 15", "Sex 16"];
const horas = ["08:30", "10:00", "14:00", "16:30"];
const convenios = ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Porto"];
const equipe: { nome: string; funcao: string; style: HairStyle; skin: string; hair: string; beard?: boolean }[] = [
  { nome: "Dra. Helena Duarte", funcao: "Ortodontia", style: "long", skin: "#f1c9a5", hair: "#4a2c1d" },
  { nome: "Dr. Rafael Moreira", funcao: "Implantes", style: "social", skin: "#d9a578", hair: "#1a1210", beard: true },
  { nome: "Dra. Camila Prado", funcao: "Estética e clareamento", style: "bun", skin: "#8d5524", hair: "#1a1210" },
];

export default function Clinica({ t }: { t: Template }) {
  const [tr, setTr] = useState(tratamentos[0].id);
  const [dia, setDia] = useState(dias[1]);
  const [hora, setHora] = useState(horas[1]);
  const [ok, setOk] = useState(false);
  const atual = tratamentos.find((x) => x.id === tr)!;

  return (
    <DemoShell t={t}>
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--c3)]/10 bg-[var(--c1)]/90 px-6 py-3.5 backdrop-blur">
        <span className="flex items-center gap-2 text-sm font-bold"><Smile className="h-5 w-5 text-[var(--c2)]" aria-hidden="true" />Clínica Sorriso</span>
        <span className="hidden gap-5 text-xs opacity-70 @xl:flex"><a>Tratamentos</a><a>Equipe</a><a>Convênios</a></span>
        <button type="button" className={`${btn} !text-white`}>Marcar consulta</button>
      </nav>

      <header className="grid items-center gap-8 px-6 py-12 @xl:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--c2)]/10 px-3 py-1 text-[11px] font-semibold text-[var(--c2)]"><Star className="h-3 w-3 fill-current" aria-hidden="true" />4,9 · +1.800 avaliações</p>
          <h3 className="mb-4 text-4xl font-bold leading-tight @xl:text-5xl">O sorriso que você <span className="text-[var(--c2)]">merece</span>.</h3>
          <p className="mb-5 max-w-sm text-sm opacity-70">Odontologia moderna, atendimento humano e sem dor. Escolha o melhor dia e horário.</p>
          <div className="relative w-56 rounded-3xl bg-gradient-to-br from-[var(--c2)]/20 to-[var(--c2)]/5 p-4">
            <Dental kind="smile" className="w-full" />
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--c3)]/10 bg-white p-5 shadow-xl shadow-[var(--c2)]/10">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />Agende sua consulta</h4>
          <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Dia">
            {dias.map((d) => <button key={d} type="button" aria-pressed={dia === d} onClick={() => { setDia(d); setOk(false); }} className={`min-h-9 cursor-pointer rounded-lg px-3 text-xs transition ${dia === d ? "bg-[var(--c2)] text-white" : "bg-[var(--c1)] hover:bg-[var(--c2)]/15"}`}>{d}</button>)}
          </div>
          <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Horário">
            {horas.map((h) => <button key={h} type="button" aria-pressed={hora === h} onClick={() => { setHora(h); setOk(false); }} className={`min-h-9 cursor-pointer rounded-lg px-3 text-xs transition ${hora === h ? "bg-[var(--c3)] text-white" : "bg-[var(--c1)] hover:bg-[var(--c3)]/10"}`}>{h}</button>)}
          </div>
          <button type="button" onClick={() => setOk(true)} className={`${btn} w-full !text-white`}>{ok ? `Confirmado: ${dia} às ${hora} ✓` : "Confirmar horário"}</button>
        </div>
      </header>

      <section className="px-6 py-10">
        <h4 className="mb-5 text-2xl font-bold">Tratamentos</h4>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tratamentos">
          {tratamentos.map((x) => <button key={x.id} role="tab" aria-selected={tr === x.id} type="button" onClick={() => setTr(x.id)} className={`min-h-10 cursor-pointer rounded-full px-5 text-sm transition ${tr === x.id ? "bg-[var(--c2)] text-white" : "border border-[var(--c3)]/15 hover:border-[var(--c2)]"}`}>{x.nome}</button>)}
        </div>
        <div role="tabpanel" className="mt-5 grid items-center gap-5 rounded-2xl bg-[var(--c2)]/8 p-5 @xl:grid-cols-[1fr_200px]">
          <div><h5 className="mb-2 text-lg font-semibold">{atual.nome}</h5><p className="mb-3 text-sm opacity-75">{atual.texto}</p>
            <ul className="space-y-1.5 text-sm">{atual.itens.map((i) => <li key={i} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />{i}</li>)}</ul></div>
          <div className="mx-auto w-44 rounded-2xl bg-white p-2 @xl:w-full"><Dental key={atual.id} kind={atual.kind} className="w-full" /></div>
        </div>
      </section>

      <section className="px-6 pb-10">
        <h4 className="mb-5 text-2xl font-bold">Antes e depois</h4>
        <div className="grid gap-3 @xl:grid-cols-2">
          {[["Antes", "#d9cd86"], ["Depois", "#ffffff"]].map(([label, shade]) => (
            <figure key={label} className="overflow-hidden rounded-2xl border border-[var(--c3)]/10 bg-white">
              <div className="bg-gradient-to-b from-[var(--c2)]/10 to-transparent p-5"><Dental kind="smile" shade={shade} className="mx-auto w-52" /></div>
              <figcaption className="flex items-center justify-between border-t border-[var(--c3)]/10 px-4 py-2.5 text-xs"><span className="font-semibold">{label}</span><span className="opacity-60">Clareamento · 2 sessões</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <h4 className="mb-5 text-2xl font-bold">Nossa equipe</h4>
        <div className="grid gap-3 @xl:grid-cols-3">
          {equipe.map((m) => (
            <div key={m.nome} className="flex items-center gap-4 rounded-2xl border border-[var(--c3)]/10 bg-white p-3">
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-[var(--c2)]/25 to-transparent">
                <Hair style={m.style} skin={m.skin} hair={m.hair} beard={m.beard} outfit="coat" outfitColor="#f4f8fb" className="h-full w-full translate-y-2" />
              </div>
              <div><div className="text-sm font-semibold">{m.nome}</div><div className="text-xs opacity-65">{m.funcao}</div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-50">Convênios aceitos</p>
        <div className="flex flex-wrap gap-2">{convenios.map((c) => <span key={c} className="rounded-lg border border-[var(--c3)]/15 px-4 py-2 text-xs font-medium">{c}</span>)}</div>
      </section>
    </DemoShell>
  );
}
