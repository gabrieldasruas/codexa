"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Clock, MapPin, MessageCircle, Scissors, Star, X } from "lucide-react";
import type { Template } from "@/data/templates";
import { DemoShell } from "./DemoShell";

const BARBA = "/modelos/barbearia/barba.webp";
const CORTE = "/modelos/barbearia/corte.webp";

const servicos = [
  { id: "corte", nome: "Corte clássico", preco: 55, tempo: "40 min", cat: "Cabelo", desc: "Tesoura e máquina, lavagem e finalização com pomada.", foto: CORTE, pos: "45% 25%" },
  { id: "barba", nome: "Barba com toalha quente", preco: 40, tempo: "30 min", cat: "Barba", desc: "Navalha, toalha quente, óleo e balm para a pele.", foto: BARBA, pos: "36% 50%" },
  { id: "combo", nome: "Corte + barba", preco: 85, tempo: "70 min", cat: "Combo", desc: "O ritual completo da casa, com bebida por nossa conta.", foto: BARBA, pos: "72% 30%" },
  { id: "sobrancelha", nome: "Sobrancelha", preco: 20, tempo: "15 min", cat: "Acabamento", desc: "Alinhamento na navalha ou na pinça.", foto: CORTE, pos: "40% 60%" },
];
const horarios = ["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"];
const barbeiros = ["Sem preferência", "Rafael", "Diego", "Caio"];

const title = "font-[family-name:var(--font-oswald)] uppercase tracking-wide";
const teal = "bg-[var(--c2)] text-white hover:brightness-110";
const btnBase = "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-6 text-xs font-semibold uppercase tracking-[.18em] transition";

function Superscript({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <p className={`mb-3 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[.3em] opacity-60 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-current" />
      {children}
      {center && <span className="h-px w-8 bg-current" />}
    </p>
  );
}
const Divisor = ({ center = false }: { center?: boolean }) => <X className={`my-3 h-4 w-4 opacity-40 ${center ? "mx-auto" : ""}`} aria-hidden="true" />;

export default function Barbearia({ t }: { t: Template }) {
  const [sel, setSel] = useState<string[]>(["corte"]);
  const [hora, setHora] = useState("13:00");
  const [barbeiro, setBarbeiro] = useState(barbeiros[0]);
  const [ok, setOk] = useState(false);
  const total = servicos.filter((s) => sel.includes(s.id)).reduce((a, s) => a + s.preco, 0);
  const toggle = (id: string) => {
    setOk(false);
    setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  return (
    <DemoShell t={t} className="relative font-[family-name:var(--font-manrope)]">
      {/* menu */}
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 text-white @3xl:px-10">
        <span className={`${title} flex items-center gap-2 text-base font-semibold tracking-[.3em]`}>
          <Scissors className="h-4 w-4" aria-hidden="true" />
          Barba &amp; Navalha
        </span>
        <span className="hidden gap-6 text-xs opacity-80 @3xl:flex">
          <a>Serviços</a>
          <a>A casa</a>
          <a>Contato</a>
        </span>
        <button type="button" className={`${btnBase} ${teal} !min-h-9 !px-4 !text-[10px]`}>
          Agendar
        </button>
      </nav>

      {/* hero com foto */}
      <header className="relative min-h-[460px] overflow-hidden text-white @3xl:min-h-[520px]">
        <Image src={BARBA} alt="Barbeiro aparando a barba de um cliente na tesoura" fill priority sizes="1000px" className="object-cover object-[60%_30%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--c1)] via-transparent to-black/40" />
        <div className="relative flex min-h-[460px] flex-col justify-center px-6 pb-14 pt-24 @3xl:min-h-[520px] @3xl:px-10">
          <Superscript>Desde 2012 · São Paulo</Superscript>
          <h3 className={`${title} max-w-md text-[2.8rem] font-semibold leading-[1.02] @xl:text-[3.6rem]`}>Barbearia de verdade, do jeito clássico</h3>
          <Divisor />
          <p className="mb-7 max-w-sm text-sm leading-relaxed opacity-85">Corte, barba e toalha quente com hora marcada, café passado e uma cerveja gelada enquanto você espera.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className={`${btnBase} ${teal}`}>
              Agendar horário
            </button>
            <button type="button" className={`${btnBase} border border-white/40 hover:border-white`}>
              Ver serviços
            </button>
          </div>
        </div>
      </header>

      {/* serviços com foto */}
      <section className="px-6 py-14 text-center @3xl:px-10">
        <Superscript center>Serviços</Superscript>
        <h4 className={`${title} text-3xl font-semibold @xl:text-4xl`}>O ritual da casa</h4>
        <Divisor center />
        <p className="mx-auto mb-9 max-w-md text-sm opacity-65">Toque em um serviço para incluir no seu agendamento. Você pode combinar quantos quiser.</p>
        <div className="grid gap-4 text-left @xl:grid-cols-3">
          {servicos.slice(0, 3).map((s) => {
            const on = sel.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className={`group cursor-pointer border text-center transition ${on ? "border-[var(--c2)] bg-[var(--c2)]/10" : "border-white/12 bg-white/[.02] hover:border-white/30"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={s.foto} alt={s.nome} fill sizes="(max-width: 768px) 90vw, 300px" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: s.pos }} />
                  {on && (
                    <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--c2)] text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="px-5 py-5">
                  <p className="mb-1 text-[10px] uppercase tracking-[.25em] opacity-50">{s.cat}</p>
                  <p className={`${title} mb-2 text-lg font-semibold`}>{s.nome}</p>
                  <p className="mb-4 text-xs leading-relaxed opacity-60">{s.desc}</p>
                  <p className="flex items-center justify-center gap-3 text-sm">
                    <span className="font-semibold">R$ {s.preco}</span>
                    <span className="flex items-center gap-1 text-xs opacity-55">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {s.tempo}
                    </span>
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* agendamento */}
      <section className="px-6 pb-14 @3xl:px-10">
        <div className="border border-white/12 bg-white/[.03] p-6">
          <Superscript>Agendamento</Superscript>
          <h4 className={`${title} mb-6 text-2xl font-semibold`}>Monte seu horário</h4>
          <div className="grid gap-6 @3xl:grid-cols-2">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[.25em] opacity-60">Serviços</p>
              <div className="flex flex-col gap-2">
                {servicos.map((s) => {
                  const on = sel.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s.id)}
                      className={`flex min-h-12 cursor-pointer items-center justify-between border px-4 text-left text-sm transition ${on ? "border-[var(--c2)] bg-[var(--c2)]/10" : "border-white/12 hover:border-white/30"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`grid h-5 w-5 place-items-center border ${on ? "border-[var(--c2)] bg-[var(--c2)]" : "border-white/30"}`}>{on && <Check className="h-3 w-3 text-white" aria-hidden="true" />}</span>
                        {s.nome}
                      </span>
                      <span className="text-xs opacity-70">R$ {s.preco}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[.25em] opacity-60">Barbeiro</p>
                <div className="flex flex-wrap gap-2">
                  {barbeiros.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={barbeiro === b}
                      onClick={() => { setBarbeiro(b); setOk(false); }}
                      className={`min-h-9 cursor-pointer border px-3.5 text-xs transition ${barbeiro === b ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-white/15 hover:border-white/40"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[.25em] opacity-60">Horário · hoje</p>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Horários">
                  {horarios.map((h) => (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={hora === h}
                      onClick={() => { setHora(h); setOk(false); }}
                      className={`min-h-9 cursor-pointer border text-xs transition ${hora === h ? "border-[var(--c2)] bg-[var(--c2)] text-white" : "border-white/15 hover:border-white/40"}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span>
                  <span className="block text-[10px] uppercase tracking-[.25em] opacity-60">Total</span>
                  <span className={`${title} text-3xl font-semibold`}>R$ {total}</span>
                </span>
                <button type="button" disabled={!sel.length} onClick={() => setOk(true)} className={`${btnBase} ${teal} disabled:opacity-40`}>
                  {ok ? "Agendado ✓" : `Confirmar às ${hora}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* a casa */}
      <section className="grid items-center gap-8 px-6 pb-14 @3xl:grid-cols-[.9fr_1.1fr] @3xl:px-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden">
          <Image src={CORTE} alt="Barbeiro finalizando um corte com pente e tesoura" fill sizes="(max-width: 768px) 90vw, 360px" className="object-cover object-[50%_30%]" />
        </div>
        <div>
          <Superscript>A casa</Superscript>
          <h4 className={`${title} text-3xl font-semibold leading-tight @xl:text-4xl`}>Tradição em cada corte</h4>
          <Divisor />
          <p className="mb-6 text-sm leading-relaxed opacity-70">
            Ambiente reservado, cadeiras de época e barbeiros que tratam cada cliente pelo nome. Aqui o corte não tem pressa, e a conversa também não.
          </p>
          <dl className="mb-7 grid grid-cols-3 gap-4 border-y border-white/10 py-5">
            {[
              ["12", "anos de casa"],
              ["15 mil", "cortes por ano"],
              ["4,9", "no Google"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className={`${title} flex items-center gap-1 text-2xl font-semibold`}>
                  {n}
                  {l === "no Google" && <Star className="h-4 w-4 fill-[#e2a93b] text-[#e2a93b]" aria-hidden="true" />}
                </dt>
                <dd className="text-[11px] opacity-55">{l}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className={`${btnBase} border border-white/30 hover:border-white`}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar no WhatsApp
          </button>
        </div>
      </section>

      {/* rodapé */}
      <footer className="border-t border-white/10 px-6 py-8 @3xl:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className={`${title} flex items-center gap-2 text-sm font-semibold tracking-[.3em]`}>
            <Scissors className="h-4 w-4 text-[var(--c2)]" aria-hidden="true" />
            Barba &amp; Navalha
          </span>
          <span className="flex items-center gap-2 opacity-65">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Rua das Palmeiras, 120 · Seg a sáb, 9h às 20h
          </span>
        </div>
      </footer>
    </DemoShell>
  );
}
