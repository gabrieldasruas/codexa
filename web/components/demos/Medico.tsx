"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const MEDICO = "Dr. Rafael Andrade";
const REGISTRO = "CRM-SP 123.456 · RQE 45.678";
const WA = "#25d366";

const areas = [
  {
    id: "prevencao",
    nome: "Prevenção",
    titulo: "Cuide antes que vire problema",
    texto: "Avaliação completa do risco cardiovascular e um plano de prevenção feito para a sua rotina, sem receita genérica.",
    sinais: ["Histórico familiar", "Colesterol alto", "Sedentarismo", "Estresse", "Acima dos 40 anos"],
    exames: ["Eletrocardiograma", "Teste ergométrico", "Exames laboratoriais"],
    cuidados: ["Check-up cardiológico", "Liberação para atividade física", "Plano de prevenção"],
  },
  {
    id: "coracao",
    nome: "Doenças do coração",
    titulo: "Diagnóstico preciso, tratamento claro",
    texto: "Acompanhamento próximo das principais doenças do coração, com cada etapa explicada em linguagem simples.",
    sinais: ["Pressão alta", "Falta de ar", "Palpitações", "Dor no peito", "Cansaço fácil"],
    exames: ["Ecocardiograma", "Holter 24 horas", "MAPA"],
    cuidados: ["Hipertensão", "Arritmias", "Insuficiência cardíaca"],
  },
  {
    id: "exames",
    nome: "Exames no consultório",
    titulo: "Resultado rápido, sem sair daqui",
    texto: "Boa parte dos exames é feita no próprio consultório, no mesmo dia da consulta, com o laudo explicado na hora.",
    sinais: ["No mesmo dia", "Laudo explicado", "Sem filas"],
    exames: ["Eletrocardiograma", "Ecocardiograma", "Holter e MAPA"],
    cuidados: ["Risco cirúrgico", "Avaliação para esportes", "Acompanhamento"],
  },
];

const etapas = [
  { t: "Agendamento fácil", d: "Pelo WhatsApp, em poucos minutos. A equipe confirma o horário e tira as primeiras dúvidas." },
  { t: "Avaliação detalhada", d: "Consulta sem pressa: histórico, sintomas, rotina e hábitos. Cada detalhe importa." },
  { t: "Diagnóstico preciso", d: "Quando necessário, exames no próprio consultório para um diagnóstico seguro." },
  { t: "Plano individual", d: "Tratamento sob medida, explicado passo a passo, com acompanhamento de perto." },
];

const depoimentos = [
  { nome: "Mariana S.", texto: "Consulta sem pressa, explicou cada exame com calma. Saí de lá entendendo exatamente o que eu tinha.", quando: "há 2 semanas" },
  { nome: "Carlos E.", texto: "Fiz o check-up e os exames no mesmo dia. Atendimento pontual e muito humano.", quando: "há 1 mês" },
  { nome: "Lúcia M.", texto: "Acompanha a minha pressão há dois anos. Responde pelo WhatsApp e passa muita segurança.", quando: "há 3 meses" },
];

const perguntas = [
  { q: "Quando devo procurar um cardiologista?", a: "Ao sentir dor no peito, falta de ar, palpitações ou cansaço fora do comum, e também para prevenção, a partir dos 40 anos ou antes, se houver histórico familiar." },
  { q: "Preciso levar exames na primeira consulta?", a: "Se tiver exames recentes, leve. Se não tiver, tudo bem: o que for necessário é pedido ou feito no próprio consultório." },
  { q: "O atendimento é por convênio ou particular?", a: "Os dois. Atendemos os principais convênios e também particular, com reembolso facilitado." },
  { q: "Vocês fazem teleconsulta?", a: "Sim. Retornos e acompanhamentos podem ser feitos online, com a mesma atenção da consulta presencial." },
  { q: "A consulta já inclui exames?", a: "O eletrocardiograma é feito na consulta. Outros exames são agendados para o mesmo dia sempre que possível." },
];

const tipos = ["Primeira consulta", "Retorno", "Check-up"];
const convenios = ["Unimed", "Bradesco Saúde", "SulAmérica", "Amil", "Porto"];
const dias = [
  { d: "Seg", n: "12" },
  { d: "Ter", n: "13" },
  { d: "Qua", n: "14" },
  { d: "Qui", n: "15" },
  { d: "Sex", n: "16" },
];
const horas = ["08:00", "09:30", "11:00", "14:30", "16:00", "17:30"];

const eyebrow = "mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.25em] text-[var(--c2)]";
const h2 = "font-serif text-3xl leading-[1.1] tracking-tight @xl:text-4xl";
const waBtn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,.35)] transition hover:-translate-y-0.5 hover:brightness-105 active:scale-95";
const ghostBtn =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--c3)]/15 bg-white px-5 text-sm font-semibold transition hover:border-[var(--c2)] hover:text-[var(--c2)]";
const chip = (on: boolean) =>
  `min-h-9 cursor-pointer rounded-full border px-4 text-xs font-medium transition ${
    on ? "border-[var(--c2)] bg-[var(--c2)] text-white shadow-[0_6px_18px_rgba(31,79,216,.3)]" : "border-[var(--c3)]/15 bg-white hover:border-[var(--c2)]/60"
  }`;

function Stars({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[#e2a93b]" aria-label="5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function Medico({ t }: { t: Template }) {
  const [area, setArea] = useState(areas[0].id);
  const [faq, setFaq] = useState<number | null>(0);
  const [tipo, setTipo] = useState(tipos[0]);
  const [online, setOnline] = useState(false);
  const [plano, setPlano] = useState<string>("Particular");
  const [dia, setDia] = useState(dias[1].n);
  const [hora, setHora] = useState(horas[3]);
  const [ok, setOk] = useState(false);
  const atual = areas.find((a) => a.id === area)!;
  const mexe = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setOk(false);
  };
  const diaSel = dias.find((d) => d.n === dia)!;

  return (
    <DemoShell t={t} className="font-[family-name:var(--font-manrope)]">
      {/* menu */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--c3)]/8 bg-white/85 px-6 py-3 backdrop-blur-md">
        <span className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--c3)] font-serif text-sm italic text-white">RA</span>
          <span className="leading-tight">
            <span className="block text-sm font-bold">{MEDICO}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[.25em] text-[var(--c2)]">Cardiologia</span>
          </span>
        </span>
        <span className="hidden gap-6 text-xs font-medium opacity-70 @3xl:flex">
          <a>Tratamentos</a>
          <a>Consulta</a>
          <a>Sobre</a>
          <a>Dúvidas</a>
        </span>
        <button type="button" className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--c3)] px-4 text-xs font-semibold text-white transition hover:bg-[var(--c2)]">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          Agendar
        </button>
      </nav>

      {/* hero */}
      <header className="relative overflow-hidden px-6 pb-14 pt-10 @3xl:pb-16 @3xl:pt-14">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(31,79,216,.12),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(31,79,216,.06),transparent_50%)]" />
        <div className="relative grid items-center gap-10 @3xl:grid-cols-[1.08fr_.92fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--c3)]/10 bg-white px-3 py-1.5 text-[11px] font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: WA }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: WA }} />
              </span>
              Agenda aberta esta semana
            </span>
            <p className={eyebrow}>
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              Cardiologista em São Paulo
            </p>
            <h3 className="mb-5 font-serif text-[2.6rem] leading-[1.05] tracking-tight @xl:text-[3.4rem]">
              Cuidar do coração é <em className="text-[var(--c2)]">cuidar da vida</em> inteira.
            </h3>
            <p className="mb-7 max-w-md text-sm leading-relaxed opacity-75">
              Atendimento humano e completo para adultos e idosos: prevenção, diagnóstico e tratamento, com tecnologia e tempo de consulta de verdade.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <button type="button" className={waBtn} style={{ background: WA }}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Agendar pelo WhatsApp
              </button>
              <button type="button" className={ghostBtn}>
                Ver tratamentos <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <dl className="grid max-w-md grid-cols-3 gap-4 border-t border-[var(--c3)]/10 pt-5">
              <div>
                <dt className="font-serif text-2xl">12+</dt>
                <dd className="text-[11px] leading-snug opacity-60">anos de experiência</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 font-serif text-2xl">
                  4,9 <Star className="h-4 w-4 fill-[#e2a93b] text-[#e2a93b]" aria-hidden="true" />
                </dt>
                <dd className="text-[11px] leading-snug opacity-60">320 avaliações no Google</dd>
              </div>
              <div>
                <dt className="font-serif text-2xl">8 mil</dt>
                <dd className="text-[11px] leading-snug opacity-60">pacientes atendidos</dd>
              </div>
            </dl>
          </div>

          {/* foto com painel diagonal */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden="true" className="absolute -left-2 -right-3 bottom-0 top-8 -skew-x-[6deg] @xl:-left-6 @xl:-right-10 @xl:-skew-x-[8deg] rounded-[32px] bg-gradient-to-br from-[var(--c2)] via-[#173a9e] to-[var(--c3)] shadow-[0_30px_80px_rgba(31,79,216,.35)]" />
            <div aria-hidden="true" className="absolute -left-2 -right-3 bottom-0 top-8 -skew-x-[6deg] @xl:-left-6 @xl:-right-10 @xl:-skew-x-[8deg] rounded-[32px] opacity-30 [background:repeating-linear-gradient(115deg,transparent_0_22px,rgba(255,255,255,.18)_22px_23px)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-white/40">
              <Image
                src="/modelos/medico/medico-consultorio.webp"
                alt={`${MEDICO} consultando um tablet no consultório`}
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-[52%_20%]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--c3)]/55 to-transparent" />
            </div>
            <div className="absolute -left-4 top-12 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_18px_40px_rgba(11,27,52,.18)] backdrop-blur @xl:-left-10">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--c2)]/10 text-[var(--c2)]">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-55">Próximo horário</span>
                <span className="block text-sm font-bold">Amanhã, 14:30</span>
              </span>
            </div>
            <div className="absolute -right-3 bottom-8 flex items-center gap-2.5 rounded-2xl bg-[var(--c3)] px-3.5 py-2.5 text-white shadow-[0_18px_40px_rgba(11,27,52,.35)] @xl:-right-8">
              <ShieldCheck className="h-5 w-5 text-[#8fb0ff]" aria-hidden="true" />
              <span className="leading-tight">
                <span className="block text-xs font-bold">Especialista em Cardiologia</span>
                <span className="block text-[10px] opacity-70">{REGISTRO}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* convênios */}
      <div className="border-y border-[var(--c3)]/8 bg-white px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-semibold opacity-55">
          <span className="text-[10px] uppercase tracking-[.25em]">Atendemos</span>
          {convenios.map((c) => (
            <span key={c}>{c}</span>
          ))}
          <span>Particular</span>
        </div>
      </div>

      {/* tratamentos */}
      <section className="px-6 py-14">
        <p className={eyebrow}>
          <Stethoscope className="h-4 w-4" aria-hidden="true" />
          Tratamentos
        </p>
        <h4 className={`${h2} mb-6 max-w-lg`}>
          Como posso <em className="text-[var(--c2)]">te ajudar</em>
        </h4>
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Áreas de atendimento">
          {areas.map((a) => (
            <button key={a.id} type="button" role="tab" aria-selected={area === a.id} onClick={() => setArea(a.id)} className={chip(area === a.id)}>
              {a.nome}
            </button>
          ))}
        </div>
        <div key={atual.id} className="grid gap-6 rounded-[24px] border border-[var(--c3)]/8 bg-white p-6 shadow-[0_20px_60px_rgba(11,27,52,.07)] @3xl:grid-cols-[1fr_1.1fr]">
          <div>
            <h5 className="mb-3 font-serif text-2xl leading-tight">{atual.titulo}</h5>
            <p className="mb-5 text-sm leading-relaxed opacity-70">{atual.texto}</p>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] opacity-50">Indicado para</p>
            <div className="mb-6 flex flex-wrap gap-1.5">
              {atual.sinais.map((s) => (
                <span key={s} className="rounded-full bg-[var(--c2)]/8 px-3 py-1 text-[11px] font-medium text-[var(--c2)]">
                  {s}
                </span>
              ))}
            </div>
            <button type="button" className={waBtn} style={{ background: WA }}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Agendar avaliação
            </button>
          </div>
          <div className="grid gap-3 @xl:grid-cols-2">
            {[
              { titulo: "Exames", icon: Activity, itens: atual.exames },
              { titulo: "Cuidados", icon: HeartPulse, itens: atual.cuidados },
            ].map((b) => (
              <div key={b.titulo} className="rounded-2xl bg-[var(--c1)] p-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-bold">
                  <b.icon className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />
                  {b.titulo}
                </p>
                <ul className="flex flex-col gap-2">
                  {b.itens.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-snug">
                      <Check className="mt-px h-3.5 w-3.5 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* primeira consulta */}
      <section className="relative overflow-hidden bg-[var(--c3)] px-6 py-14 text-white">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--c2)]/40 blur-3xl" />
        <p className={`${eyebrow} !text-[#8fb0ff]`}>Primeira consulta</p>
        <h4 className={`${h2} mb-8 max-w-md`}>
          Como funciona o seu <em className="text-[#8fb0ff]">primeiro atendimento</em>
        </h4>
        <ol className="relative grid gap-4 @xl:grid-cols-2 @3xl:grid-cols-4">
          {etapas.map((e, i) => (
            <li key={e.t} className="rounded-2xl border border-white/10 bg-white/[.04] p-5 backdrop-blur">
              <span className="mb-3 block font-serif text-3xl italic text-[#8fb0ff]">0{i + 1}</span>
              <span className="mb-1.5 block text-sm font-bold">{e.t}</span>
              <span className="block text-xs leading-relaxed opacity-65">{e.d}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* sobre */}
      <section className="grid items-center gap-10 px-6 py-14 @3xl:grid-cols-[.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-[380px]">
          <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[28px] border-2 border-[var(--c2)]/25" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--c3)]">
            <Image
              src="/modelos/medico/medico-retrato.webp"
              alt={`${MEDICO} de jaleco, com o estetoscópio`}
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover object-[60%_50%]"
            />
          </div>
          <div className="absolute -left-3 bottom-6 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_rgba(11,27,52,.18)]">
            <span className="block font-serif text-lg leading-none">{MEDICO}</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-[var(--c2)]">{REGISTRO}</span>
          </div>
        </div>
        <div>
          <p className={eyebrow}>
            <Award className="h-4 w-4" aria-hidden="true" />
            Sobre o médico
          </p>
          <h4 className={`${h2} mb-4`}>
            Medicina feita com <em className="text-[var(--c2)]">tempo e atenção</em>
          </h4>
          <p className="mb-6 text-sm leading-relaxed opacity-70">
            Há mais de 12 anos o {MEDICO} atende com um princípio simples: tratar a causa, não só o sintoma. Cada paciente sai da consulta entendendo o próprio diagnóstico e o
            caminho do tratamento.
          </p>
          <ul className="mb-7 grid gap-3 @xl:grid-cols-2">
            {["Graduação em Medicina", "Residência em Clínica Médica", "Residência em Cardiologia", "Título de especialista em Cardiologia"].map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-[var(--c3)]/8 bg-white px-3.5 py-3 text-xs font-semibold">
                <GraduationCap className="h-4 w-4 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <button type="button" className={waBtn} style={{ background: WA }}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar com a equipe
          </button>
        </div>
      </section>

      {/* depoimentos */}
      <section className="bg-white px-6 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Depoimentos</p>
            <h4 className={h2}>
              O que dizem os <em className="text-[var(--c2)]">pacientes</em>
            </h4>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--c3)]/8 px-4 py-3">
            <span className="font-serif text-3xl">4,9</span>
            <span>
              <Stars />
              <span className="mt-1 block text-[11px] opacity-60">320 avaliações no Google</span>
            </span>
          </div>
        </div>
        <div className="grid gap-4 @3xl:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.nome} className="rounded-2xl bg-[var(--c1)] p-5">
              <Stars />
              <blockquote className="my-4 text-sm leading-relaxed opacity-80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--c2)] text-xs font-bold text-white">{d.nome[0]}</span>
                <span className="leading-tight">
                  <span className="block text-xs font-bold">{d.nome}</span>
                  <span className="block text-[11px] opacity-55">{d.quando}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* agendamento */}
      <section className="px-6 py-14">
        <div className="overflow-hidden rounded-[28px] border border-[var(--c3)]/8 bg-white shadow-[0_30px_80px_rgba(11,27,52,.1)] @3xl:grid @3xl:grid-cols-[.85fr_1.15fr]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[var(--c2)] to-[var(--c3)] p-7 text-white">
            <div aria-hidden="true" className="absolute inset-0 opacity-25 [background:repeating-linear-gradient(115deg,transparent_0_22px,rgba(255,255,255,.2)_22px_23px)]" />
            <div className="relative">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.25em] text-white/70">Agendamento</p>
              <h4 className="mb-4 font-serif text-3xl leading-tight">
                Marque sua consulta em <em>1 minuto</em>
              </h4>
              <p className="mb-6 text-sm leading-relaxed text-white/75">Escolha o tipo, o dia e o horário. A equipe confirma pelo WhatsApp.</p>
              <div className="rounded-2xl bg-white/10 p-4 text-sm backdrop-blur">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/60">Resumo</p>
                <p className="font-bold">{tipo}</p>
                <p className="text-white/80">
                  {online ? "Teleconsulta" : "Presencial"} · {plano}
                </p>
                <p className="text-white/80">
                  {diaSel.d}, {diaSel.n} às {hora}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6">
            <fieldset>
              <legend className="mb-2 text-xs font-bold">Tipo de consulta</legend>
              <div className="flex flex-wrap gap-2">
                {tipos.map((x) => (
                  <button key={x} type="button" aria-pressed={tipo === x} onClick={() => mexe(setTipo)(x)} className={chip(tipo === x)}>
                    {x}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-xs font-bold">Atendimento</legend>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: false, l: "Presencial", i: MapPin },
                  { v: true, l: "Teleconsulta", i: Video },
                ].map((o) => (
                  <button
                    key={o.l}
                    type="button"
                    aria-pressed={online === o.v}
                    onClick={() => mexe(setOnline)(o.v)}
                    className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition ${
                      online === o.v ? "border-[var(--c2)] bg-[var(--c2)]/8 text-[var(--c2)]" : "border-[var(--c3)]/15 hover:border-[var(--c2)]/60"
                    }`}
                  >
                    <o.i className="h-4 w-4" aria-hidden="true" />
                    {o.l}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-xs font-bold">Convênio</legend>
              <div className="flex flex-wrap gap-2">
                {["Particular", ...convenios].map((c) => (
                  <button key={c} type="button" aria-pressed={plano === c} onClick={() => mexe(setPlano)(c)} className={chip(plano === c)}>
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
                    onClick={() => mexe(setDia)(x.n)}
                    className={`flex cursor-pointer flex-col items-center rounded-xl border py-2 transition ${
                      dia === x.n ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-[var(--c3)]/15 hover:border-[var(--c2)]/60"
                    }`}
                  >
                    <span className="text-[10px] uppercase opacity-70">{x.d}</span>
                    <span className="font-serif text-lg leading-none">{x.n}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {horas.map((h) => (
                  <button key={h} type="button" aria-pressed={hora === h} onClick={() => mexe(setHora)(h)} className={`${chip(hora === h)} flex items-center justify-center gap-1.5`}>
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {h}
                  </button>
                ))}
              </div>
            </fieldset>
            <button type="button" onClick={() => setOk(true)} className={`${waBtn} w-full`} style={{ background: WA }}>
              {ok ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Pedido enviado! A equipe confirma em minutos
                </>
              ) : (
                <>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Confirmar pelo WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* dúvidas */}
      <section className="px-6 pb-14">
        <p className={eyebrow}>Dúvidas frequentes</p>
        <h4 className={`${h2} mb-6`}>
          Perguntas que <em className="text-[var(--c2)]">todo paciente</em> faz
        </h4>
        <div className="flex flex-col gap-2.5">
          {perguntas.map((p, i) => {
            const open = faq === i;
            return (
              <div key={p.q} className={`rounded-2xl border bg-white transition ${open ? "border-[var(--c2)]/40 shadow-[0_12px_30px_rgba(31,79,216,.08)]" : "border-[var(--c3)]/8"}`}>
                <button type="button" aria-expanded={open} onClick={() => setFaq(open ? null : i)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold">
                  {p.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--c2)] transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {open && <p className="px-5 pb-5 text-sm leading-relaxed opacity-70">{p.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* localização */}
      <section className="px-6 pb-14">
        <div className="grid overflow-hidden rounded-[24px] border border-[var(--c3)]/8 bg-white @3xl:grid-cols-[1fr_1.2fr]">
          <div className="p-6">
            <p className={eyebrow}>
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Localização
            </p>
            <h4 className="mb-4 font-serif text-2xl">Consultório na Paulista</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                <span className="opacity-75">Av. Paulista, 1000, conj. 1204, Bela Vista · São Paulo/SP</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                <span className="opacity-75">Seg a sex, 8h às 18h · Sáb, 8h às 12h</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--c2)]" aria-hidden="true" />
                <span className="opacity-75">(11) 99999-0000</span>
              </li>
            </ul>
          </div>
          <div aria-hidden="true" className="relative min-h-52 bg-[#e9eef6]">
            <div className="absolute inset-0 opacity-60 [background:linear-gradient(90deg,rgba(11,27,52,.06)_1px,transparent_1px)_0_0/38px_38px,linear-gradient(rgba(11,27,52,.06)_1px,transparent_1px)_0_0/38px_38px]" />
            <div className="absolute left-0 right-0 top-1/2 h-5 -translate-y-1/2 -rotate-6 bg-white shadow-sm" />
            <div className="absolute bottom-0 left-[38%] top-0 w-4 rotate-[12deg] bg-white shadow-sm" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <span className="grid h-11 w-11 place-items-center rounded-full rounded-br-none bg-[var(--c2)] text-white shadow-[0_10px_25px_rgba(31,79,216,.45)] [transform:rotate(45deg)]">
                <HeartPulse className="h-5 w-5 -rotate-45" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* rodapé */}
      <footer className="bg-[var(--c3)] px-6 py-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white font-serif text-sm italic text-[var(--c3)]">RA</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">{MEDICO}</span>
              <span className="block text-[10px] opacity-60">{REGISTRO}</span>
            </span>
          </span>
          <button type="button" className={waBtn} style={{ background: WA }}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Agendar consulta
          </button>
        </div>
        <p className="mt-6 border-t border-white/10 pt-5 text-[11px] opacity-50">© 2026 {MEDICO} · Cardiologia. Todos os direitos reservados.</p>
      </footer>

      {/* botão flutuante de WhatsApp */}
      <div className="pointer-events-none sticky bottom-4 z-30 h-0">
        <button
          type="button"
          aria-label="Falar no WhatsApp"
          className="pointer-events-auto absolute bottom-0 right-4 grid h-12 w-12 cursor-pointer place-items-center rounded-full text-white shadow-[0_12px_30px_rgba(37,211,102,.45)] transition hover:scale-105"
          style={{ background: WA }}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </DemoShell>
  );
}
