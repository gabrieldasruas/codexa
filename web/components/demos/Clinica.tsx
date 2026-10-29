"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Clock, MapPin, MessageCircle, ShieldCheck, Smile, Sparkles, Star } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const WA = "#25d366";
const tratamentos = [
  { id: "clareamento", nome: "Clareamento", texto: "Sorriso até 8 tons mais branco, com técnica segura e sem sensibilidade.", itens: ["A laser ou caseiro supervisionado", "Resultado em 1 semana", "Retoque incluso no 1º ano"], tempo: "2 a 3 sessões" },
  { id: "implante", nome: "Implantes", texto: "Reabilitação completa com planejamento 3D e cirurgia guiada, para voltar a sorrir sem medo.", itens: ["Tomografia 3D no consultório", "Cirurgia guiada e rápida", "Garantia estendida"], tempo: "a partir de 1 dia" },
  { id: "orto", nome: "Alinhadores", texto: "Alinhadores transparentes e aparelhos modernos, com simulação digital do resultado.", itens: ["Simulação antes de começar", "Quase invisíveis", "Consultas de acompanhamento"], tempo: "6 a 18 meses" },
  { id: "lentes", nome: "Lentes de contato", texto: "Lentes em porcelana ultrafinas para corrigir cor, forma e tamanho dos dentes.", itens: ["Desenho do sorriso digital", "Mínimo desgaste", "Resultado natural"], tempo: "2 a 3 consultas" },
];
const convenios = ["Odontoprev", "Amil Dental", "SulAmérica", "Bradesco Dental", "Porto"];
const dias = [
  { d: "Seg", n: "12" },
  { d: "Ter", n: "13" },
  { d: "Qua", n: "14" },
  { d: "Qui", n: "15" },
  { d: "Sex", n: "16" },
];
const horas = ["08:30", "10:00", "11:30", "14:00", "15:30", "17:00"];
const depoimentos = [
  { n: "Juliana R.", t: "Fiz lentes e o resultado ficou super natural. Atendimento impecável do início ao fim." },
  { n: "Marcos P.", t: "Tinha pavor de dentista. A equipe teve paciência e o implante foi tranquilo." },
  { n: "Fernanda L.", t: "Clareamento rápido e sem sensibilidade. Agendei pelo WhatsApp em minutos." },
];

const eyebrow = "mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.25em] text-[var(--c2)]";
const h2 = "text-3xl font-extrabold leading-[1.08] tracking-tight @xl:text-4xl";
const waBtn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,.35)] transition hover:-translate-y-0.5 hover:brightness-105 active:scale-95";
const chip = (on: boolean) =>
  `min-h-9 cursor-pointer rounded-full border px-4 text-xs font-semibold transition ${on ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-[var(--c3)]/15 bg-white hover:border-[var(--c2)]/60"}`;

export default function Clinica({ t }: { t: Template }) {
  const [tr, setTr] = useState(tratamentos[0].id);
  const [dia, setDia] = useState(dias[1].n);
  const [hora, setHora] = useState(horas[3]);
  const [conv, setConv] = useState("Particular");
  const [ok, setOk] = useState(false);
  const atual = tratamentos.find((x) => x.id === tr)!;
  const d = dias.find((x) => x.n === dia)!;

  return (
    <DemoShell t={t} className="font-[family-name:var(--font-manrope)]">
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--c3)]/8 bg-white/85 px-6 py-3 backdrop-blur-md">
        <span className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--c2)] text-white">
            <Smile className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-extrabold">Sorriso Prime</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[.22em] text-[var(--c2)]">Odontologia</span>
          </span>
        </span>
        <span className="hidden gap-6 text-xs font-medium opacity-70 @3xl:flex">
          <a>Tratamentos</a>
          <a>Clínica</a>
          <a>Depoimentos</a>
          <a>Contato</a>
        </span>
        <button type="button" className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--c3)] px-4 text-xs font-bold text-white transition hover:bg-[var(--c2)]">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Agendar
        </button>
      </nav>

      {/* hero */}
      <header className="relative overflow-hidden px-6 pb-14 pt-10">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--c2)]/15 blur-3xl" />
        <div className="relative grid items-center gap-10 @3xl:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--c2)]/10 px-3 py-1.5 text-[11px] font-bold text-[var(--c2)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Avaliação inicial gratuita
            </span>
            <h3 className="mb-5 text-[2.5rem] font-extrabold leading-[1.02] tracking-tight @xl:text-[3.2rem]">
              O sorriso que você quer, com o <span className="font-serif font-normal italic text-[var(--c2)]">cuidado</span> que você merece.
            </h3>
            <p className="mb-7 max-w-md text-sm leading-relaxed opacity-70">Clareamento, implantes, alinhadores e lentes, com tecnologia digital e uma equipe que explica cada passo.</p>
            <div className="mb-8 flex flex-wrap gap-3">
              <button type="button" className={waBtn} style={{ background: WA }}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Agendar avaliação
              </button>
              <button type="button" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[var(--c3)]/15 bg-white px-5 text-sm font-bold transition hover:border-[var(--c2)] hover:text-[var(--c2)]">
                Ver tratamentos <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex -space-x-2">
                {["J", "M", "F", "+"].map((x, i) => (
                  <span key={x} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white text-xs font-bold text-white" style={{ background: ["#0f766e", "#14b8a6", "#0e7490", "#0b2530"][i] }}>
                    {x}
                  </span>
                ))}
              </span>
              <span className="text-xs leading-snug">
                <span className="flex items-center gap-1 font-bold">
                  4,9 <Star className="h-3.5 w-3.5 fill-[#e2a93b] text-[#e2a93b]" aria-hidden="true" /> no Google
                </span>
                <span className="opacity-60">+3.000 sorrisos transformados</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(11,37,48,.2)]">
              <Image src="/modelos/clinica/consultorio.webp" alt="Dentista atendendo paciente no consultório" fill priority sizes="(max-width: 768px) 90vw, 500px" className="object-cover object-[45%_50%]" />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_rgba(11,37,48,.18)] @xl:-left-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--c2)]/10 text-[var(--c2)]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-extrabold">Biossegurança total</span>
                <span className="block text-[11px] opacity-60">Esterilização certificada</span>
              </span>
            </div>
            <div className="absolute -top-4 right-4 rounded-2xl bg-[var(--c3)] px-4 py-3 text-white shadow-[0_18px_40px_rgba(11,37,48,.3)]">
              <span className="block text-2xl font-extrabold leading-none">15</span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">anos de clínica</span>
            </div>
          </div>
        </div>
      </header>

      {/* convênios */}
      <div className="border-y border-[var(--c3)]/8 bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-bold opacity-50">
          <span className="text-[10px] uppercase tracking-[.25em]">Convênios</span>
          {convenios.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      {/* tratamentos */}
      <section className="px-6 py-14">
        <p className={eyebrow}>Tratamentos</p>
        <h4 className={`${h2} mb-6 max-w-lg`}>Tudo para o seu sorriso em um só lugar</h4>
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Tratamentos">
          {tratamentos.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={tr === x.id} onClick={() => setTr(x.id)} className={chip(tr === x.id)}>
              {x.nome}
            </button>
          ))}
        </div>
        <div className="grid overflow-hidden rounded-[26px] border border-[var(--c3)]/8 bg-white shadow-[0_20px_60px_rgba(11,37,48,.07)] @3xl:grid-cols-[1fr_1fr]">
          <div className="relative min-h-60">
            <Image src="/modelos/clinica/dentista.webp" alt="Paciente em atendimento odontológico" fill sizes="(max-width: 768px) 90vw, 450px" className="object-cover object-[50%_35%]" />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold backdrop-blur">
              <Clock className="h-3.5 w-3.5 text-[var(--c2)]" aria-hidden="true" />
              {atual.tempo}
            </span>
          </div>
          <div key={atual.id} className="p-6">
            <h5 className="mb-2 text-2xl font-extrabold">{atual.nome}</h5>
            <p className="mb-5 text-sm leading-relaxed opacity-70">{atual.texto}</p>
            <ul className="mb-6 flex flex-col gap-2.5">
              {atual.itens.map((i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--c2)]/12 text-[var(--c2)]">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <button type="button" className={waBtn} style={{ background: WA }}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Quero esse tratamento
            </button>
          </div>
        </div>
      </section>

      {/* números */}
      <section className="bg-[var(--c3)] px-6 py-12 text-white">
        <ul className="grid grid-cols-2 gap-6 @3xl:grid-cols-4">
          {[
            ["+3.000", "sorrisos transformados"],
            ["15 anos", "de experiência"],
            ["4,9 ★", "nota no Google"],
            ["100%", "planejamento digital"],
          ].map(([n, l]) => (
            <li key={l}>
              <span className="block text-3xl font-extrabold text-[#5eead4]">{n}</span>
              <span className="text-xs opacity-65">{l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* depoimentos */}
      <section className="px-6 py-14">
        <p className={eyebrow}>Depoimentos</p>
        <h4 className={`${h2} mb-7`}>Quem sorri com a gente</h4>
        <div className="grid gap-4 @3xl:grid-cols-3">
          {depoimentos.map((x) => (
            <figure key={x.n} className="rounded-2xl border border-[var(--c3)]/8 bg-white p-5">
              <span className="flex gap-0.5 text-[#e2a93b]">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </span>
              <blockquote className="my-4 text-sm leading-relaxed opacity-80">&ldquo;{x.t}&rdquo;</blockquote>
              <figcaption className="text-xs font-bold">{x.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* agendamento */}
      <section className="px-6 pb-14">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(11,37,48,.1)] @3xl:grid @3xl:grid-cols-[.85fr_1.15fr]">
          <div className="bg-gradient-to-br from-[var(--c2)] to-[var(--c3)] p-7 text-white">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.25em] text-white/70">Agendamento</p>
            <h4 className="mb-4 text-3xl font-extrabold leading-tight">Sua avaliação gratuita</h4>
            <p className="mb-6 text-sm text-white/75">Escolha o dia e o horário. Confirmamos pelo WhatsApp.</p>
            <div className="rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
              <p className="font-bold">{atual.nome}</p>
              <p className="text-white/80">{conv}</p>
              <p className="text-white/80">
                {d.d}, {d.n} às {hora}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-6">
            <fieldset>
              <legend className="mb-2 text-xs font-bold">Convênio</legend>
              <div className="flex flex-wrap gap-2">
                {["Particular", ...convenios].map((c) => (
                  <button key={c} type="button" aria-pressed={conv === c} onClick={() => { setConv(c); setOk(false); }} className={chip(conv === c)}>
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-xs font-bold">Dia e horário</legend>
              <div className="mb-2 grid grid-cols-5 gap-2">
                {dias.map((x) => (
                  <button
                    key={x.n}
                    type="button"
                    aria-pressed={dia === x.n}
                    onClick={() => { setDia(x.n); setOk(false); }}
                    className={`flex cursor-pointer flex-col items-center rounded-xl border py-2 transition ${dia === x.n ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-[var(--c3)]/15 hover:border-[var(--c2)]/60"}`}
                  >
                    <span className="text-[10px] uppercase opacity-70">{x.d}</span>
                    <span className="text-lg font-extrabold leading-none">{x.n}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {horas.map((h) => (
                  <button key={h} type="button" aria-pressed={hora === h} onClick={() => { setHora(h); setOk(false); }} className={chip(hora === h)}>
                    {h}
                  </button>
                ))}
              </div>
            </fieldset>
            <button type="button" onClick={() => setOk(true)} className={`${waBtn} w-full`} style={{ background: WA }}>
              {ok ? "✓ Pedido enviado! Confirmamos em minutos" : "Confirmar pelo WhatsApp"}
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--c3)] px-6 py-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm font-extrabold">
            <Smile className="h-5 w-5 text-[#5eead4]" aria-hidden="true" />
            Sorriso Prime
          </span>
          <span className="flex items-center gap-1.5 text-xs opacity-70">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Rua Oscar Freire, 500 · São Paulo/SP
          </span>
        </div>
        <p className="mt-5 border-t border-white/10 pt-4 text-[11px] opacity-50">© 2026 Sorriso Prime · Responsável técnica: Dra. Helena Duarte · CRO-SP 00.000</p>
      </footer>

      <div className="pointer-events-none sticky bottom-4 z-30 h-0">
        <button type="button" aria-label="Falar no WhatsApp" className="pointer-events-auto absolute bottom-0 right-4 grid h-12 w-12 cursor-pointer place-items-center rounded-full text-white shadow-[0_12px_30px_rgba(37,211,102,.45)] transition hover:scale-105" style={{ background: WA }}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </DemoShell>
  );
}
