"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { templates } from "@/data/templates";
import { demos } from "./demos";
import Scaled from "./Scaled";
import PhoneFrame from "./PhoneFrame";
import DeviceToggle, { type Device } from "./DeviceToggle";

// 6 versões de cada site: 0 = 4:3 (topo), 1-2 = faixa larga, 3-5 = celular (em pé)
type Crop = 0 | 1 | 2 | 3 | 4 | 5;
type Card = { key: string; slug: string; crop: Crop; theta: number; idx: number };

const VARIANTS: Record<Crop, { kind: "land" | "wide" | "port"; px: [number, number] }> = {
  0: { kind: "land", px: [1000, 750] },
  1: { kind: "wide", px: [1000, 500] },
  2: { kind: "wide", px: [1000, 500] },
  3: { kind: "port", px: [840, 1500] },
  4: { kind: "port", px: [840, 1500] },
  5: { kind: "port", px: [840, 1500] },
};

const N = templates.length * 6; // 30 cartões
const TWIST = 64; // inclinação de cada cartão em relação ao raio do anel (efeito leque)
const EASE = [0.22, 1, 0.36, 1] as const;

// giro automático do anel
const STEP_EVERY_MS = 3000; // a cada 3 segundos o anel gira de novo
const STEP_DEG = 19.5; // quanto ele avança em cada giro (média ≈ 1,5x a velocidade anterior de 5°/s)
const STEP_SECONDS = 1.4; // duração de cada giro
const DRIFT_DEG_S = 0.8; // deslize lento entre os giros, para o anel nunca ficar parado

// cada modelo aparece em 6 versões; vizinhos no anel são sempre modelos diferentes
const cards: Card[] = Array.from({ length: N }, (_, i) => {
  const m = i % templates.length;
  const k = Math.floor(i / templates.length);
  const crop = ((k + m) % 6) as Crop;
  return { key: `${templates[m].slug}-${crop}`, slug: templates[m].slug, crop, theta: (i * 360) / N, idx: i };
});

const labels = [
  { slug: "barbearia", side: "left", top: "47%" },
  { slug: "joalheria", side: "left", top: "62%" },
  { slug: "restaurante", side: "left", top: "77%" },
  { slug: "transportadora", side: "right", top: "38%" },
  { slug: "clinica", side: "right", top: "62%" },
] as const;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const norm180 = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;

// seno/cosseno arredondados: servidor e navegador podem diferir nas últimas casas decimais e isso quebraria a hidratação
const sin = (a: number) => Math.round(Math.sin(a) * 1e4) / 1e4;
const cos = (a: number) => Math.round(Math.cos(a) * 1e4) / 1e4;
const rnd = (i: number) => {
  const x = sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const WREATH_DEG_S = 2.4; // velocidade com que a coroa gira no plano da tela

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [mode, setMode] = useState<"wreath" | "ring">("wreath"); // coroa de painéis (intro e botão "Grade") ou anel 3D
  const [hover, setHover] = useState<string | null>(null);
  const [sel, setSel] = useState<Card | null>(null);
  const [phase, setPhase] = useState<"idle" | "turn" | "open">("idle");
  const [device, setDevice] = useState<Device>("desktop"); // como o modelo aberto é visualizado

  const spin = useMotionValue(0);
  const tilt = useMotionValue(0);
  const roll = useMotionValue(0);
  const shift = useMotionValue(0); // desloca a coroa para a direita, para não passar atrás do título

  const speed = useRef(1);
  const targetSpeed = useRef(1);
  const vel = useRef(0);
  const stepClock = useRef(0);
  const stepUntil = useRef(0);
  const stepAnim = useRef<ReturnType<typeof animate> | null>(null);
  const hoverRef = useRef<string | null>(null);
  const drag = useRef({ down: false, moved: false, x: 0, t: 0 });
  const timer = useRef<number | undefined>(undefined);

  // medidas responsivas
  useEffect(() => {
    const ro = new ResizeObserver(() => setVp({ w: window.innerWidth, h: window.innerHeight }));
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  // intro: começa em grade e se desfaz no anel
  useEffect(() => {
    const t = window.setTimeout(() => setMode("ring"), reduce ? 0 : 1400);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (mode === "ring") {
      roll.set(norm180(roll.get())); // evita um giro longo ao voltar da coroa para o anel
      animate(tilt, -18, { duration: 1.6, ease: EASE });
      animate(roll, -6, { duration: 1.6, ease: EASE });
    } else {
      animate(tilt, 0, { duration: 1.1, ease: EASE });
      animate(spin, Math.round(spin.get() / 360) * 360, { duration: 1.1, ease: EASE });
    }
  }, [mode, tilt, roll, spin]);

  useEffect(() => {
    animate(shift, mode === "wreath" && vp.w >= 700 ? vp.w * 0.07 : 0, { duration: 1.2, ease: EASE });
  }, [mode, vp.w, shift]);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  // giro automático: a cada 3 s o anel dá um novo giro suave; entre um giro e outro ele segue deslizando devagar.
  // O passo espera enquanto um cartão está em foco ou durante o arraste (para não atrapalhar o clique).
  useAnimationFrame((_, dt) => {
    if (sel) return;
    if (mode === "wreath") {
      // a coroa gira devagar no plano da tela e para quando um painel está em foco
      if (!reduce && !hoverRef.current) roll.set(roll.get() + (WREATH_DEG_S * dt) / 1000);
      return;
    }
    speed.current += (targetSpeed.current - speed.current) * Math.min(1, dt / 350);
    const now = performance.now();
    const dragging = drag.current.down && drag.current.moved;
    if (!reduce) {
      stepClock.current += dt;
      if (stepClock.current >= STEP_EVERY_MS && !hoverRef.current && !dragging && Math.abs(vel.current) < 5) {
        stepClock.current = 0;
        stepUntil.current = now + STEP_SECONDS * 1000;
        stepAnim.current = animate(spin, spin.get() + STEP_DEG, { duration: STEP_SECONDS, ease: [0.45, 0, 0.25, 1] });
      }
    }
    if (now >= stepUntil.current) {
      const drift = reduce ? 0 : DRIFT_DEG_S * speed.current;
      spin.set(spin.get() + ((drift + vel.current) * dt) / 1000);
    }
    vel.current *= Math.exp((-2.6 * dt) / 1000);
  });

  const small = vp.w < 700;
  const cw = small ? clamp(vp.w * 0.34, 104, 150) : clamp(vp.w * 0.135, 104, 210);
  const ch = cw * 0.75;
  const R = small ? vp.w * 0.4 : clamp(vp.w * 0.29, 140, 470);
  // coroa elíptica de painéis: duas voltas (externa e interna), cada painel inclinado em um ângulo diferente
  const RX = small ? vp.w * 0.36 : Math.min(vp.w * 0.29, 470);
  const RY = small ? vp.w * 0.36 : Math.min((vp.h - 61) * 0.3, 300);
  const wreath = (idx: number) => {
    const outer = idx % 2 === 0;
    const n = N / 2;
    const a = (Math.floor(idx / 2) / n) * Math.PI * 2 + (outer ? 0 : Math.PI / n) - Math.PI / 2;
    const f = outer ? 1 : 0.8; // a volta interna fica perto da externa: forma uma faixa e o centro continua vazio
    const q = (s: number) => rnd(idx * 7 + s) * 2 - 1;
    return {
      x: cos(a) * RX * f,
      y: sin(a) * RY * f,
      z: q(1) * 100,
      rx: q(2) * 30,
      ry: q(3) * 55,
      rz: q(4) * 24,
      s: (outer ? 0.95 : 0.78) * (small ? 0.6 : 1) * (0.92 + rnd(idx + 90) * 0.22),
    };
  };

  const pick = useCallback(
    (c: Card) => {
      if (drag.current.moved) return;
      if (sel) return;
      window.clearTimeout(timer.current);
      setSel(c);
      if (mode === "ring") {
        setPhase("turn");
        const cur = spin.get();
        const target = cur + norm180(-c.theta - cur); // gira o anel pelo caminho mais curto até o cartão ficar à frente
        animate(spin, target, { duration: reduce ? 0 : 0.95, ease: EASE });
        timer.current = window.setTimeout(() => setPhase("open"), reduce ? 0 : 900);
      } else {
        setPhase("open");
      }
    },
    [sel, mode, spin, reduce],
  );

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setPhase("idle");
    setSel(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && phase === "open" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, phase]);

  // arrastar para girar o anel
  const onDown = (e: React.PointerEvent) => {
    if (mode !== "ring" || sel || (e.target as HTMLElement).closest("a,[data-ui]")) return;
    drag.current = { down: true, moved: false, x: e.clientX, t: performance.now() };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 5) return;
    if (!d.moved) {
      e.currentTarget.setPointerCapture(e.pointerId);
      stepAnim.current?.stop(); // o arraste do usuário tem prioridade sobre o giro automático
      stepUntil.current = 0;
    }
    d.moved = true;
    const now = performance.now();
    spin.set(spin.get() + dx * 0.22);
    vel.current = clamp(((dx * 0.22) / Math.max(8, now - d.t)) * 1000, -160, 160);
    d.x = e.clientX;
    d.t = now;
  };
  const onUp = () => {
    drag.current.down = false;
  };

  const panelW = Math.min(760, vp.w * 0.92, (vp.h - 230) * 1.333); // mesma largura do painel, usada para dar altura definida ao modo celular
  const current = sel ? templates.find((t) => t.slug === sel.slug)! : null;
  const hoverTpl = hover ? templates.find((t) => t.slug === hover.split("-")[0]) : null;
  const ringCenter = small ? "56%" : "53%";

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerEnter={() => (targetSpeed.current = 0.2)}
        onPointerLeave={() => (targetSpeed.current = 1)}
        className="relative h-[calc(100svh-61px)] min-h-[640px] touch-pan-y select-none overflow-hidden"
      >
        {/* linhas de órbita */}
        <svg aria-hidden="true" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <g fill="none" stroke="rgba(155,130,255,.22)" strokeWidth="1">
            <ellipse cx="720" cy="420" rx="700" ry="250" transform="rotate(-9 720 420)" />
            <ellipse cx="720" cy="420" rx="860" ry="340" transform="rotate(14 720 420)" />
            <ellipse cx="720" cy="420" rx="560" ry="150" transform="rotate(-22 720 420)" />
          </g>
        </svg>

        {/* arcos finos ao redor da coroa (aparecem no modo Grade) */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: mode === "wreath" ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {[
            { w: 2.15, h: 2.05, r: -14, o: 0.55 },
            { w: 2.7, h: 1.55, r: 17, o: 0.3 },
            { w: 1.55, h: 2.6, r: 8, o: 0.25 },
          ].map((e, i) => (
            <motion.div
              key={i}
              className="absolute rounded-[50%] border"
              style={{
                x: shift,
                left: "50%",
                top: ringCenter,
                width: RX * e.w,
                height: RY * e.h,
                marginLeft: -(RX * e.w) / 2,
                marginTop: -(RY * e.h) / 2,
                rotate: e.r,
                borderColor: `rgba(155,130,255,${e.o})`,
              }}
            />
          ))}
        </motion.div>

        {/* marca, atrás do anel */}
        <motion.h1
          animate={{ opacity: mode === "wreath" ? 0.1 : 1 }}
          transition={{ duration: 0.9 }}
          style={{ top: ringCenter }}
          className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(4rem,14.5vw,13.5rem)] font-extrabold leading-[.8] tracking-[-.05em] text-white"
        >
          CODEXA
          <span className="sr-only"> Tecnologia: crie seu site da forma que você desejar</span>
        </motion.h1>

        {/* anel 3D */}
        <div className="absolute left-0 right-0 h-0" style={{ top: ringCenter, perspective: 1600 }}>
          <motion.div style={{ x: shift, rotateX: tilt, rotateZ: roll, transformStyle: "preserve-3d" }} className="absolute left-1/2 top-0">
            <motion.div style={{ rotateY: spin, transformStyle: "preserve-3d" }}>
              {cards.map((c) => {
                const tpl = templates.find((t) => t.slug === c.slug)!;
                const v = VARIANTS[c.crop];
                const w = v.kind === "port" ? ch * 1.05 * (420 / 750) : v.kind === "wide" ? cw * 1.2 : cw;
                const h = v.kind === "port" ? ch * 1.05 : v.kind === "wide" ? cw * 0.6 : ch;
                const wr = wreath(c.idx);
                const hov = hover === c.key;
                const isSel = sel?.key === c.key;
                const dimmed = !!sel && !isSel;
                const opacity = sel ? (isSel ? (phase === "open" ? 0 : 1) : 0.15) : 1;
                const ring = mode === "ring";
                return (
                  <motion.div
                    key={c.key}
                    className="pointer-events-none absolute left-0 top-0"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{ rotateY: ring ? norm180(c.theta) : 0 }}
                    transition={{ duration: 1.4, ease: EASE, delay: ring ? c.idx * 0.025 : 0 }}
                  >
                    <motion.div
                      className="absolute"
                      style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transformStyle: "preserve-3d" }}
                      initial={{ opacity: 0, x: wr.x, y: wr.y, z: wr.z, rotateX: wr.rx, rotateY: wr.ry, rotateZ: wr.rz, scale: wr.s * 0.6 }}
                      animate={
                        ring
                          ? { x: 0, y: 0, z: R + (hov ? 70 : 0), rotateX: 0, rotateY: TWIST - (hov ? 26 : 0), rotateZ: 0, scale: hov ? 1.12 : 1, opacity }
                          : { x: wr.x, y: wr.y, z: wr.z + (hov ? 110 : 0), rotateX: hov ? 0 : wr.rx, rotateY: hov ? 0 : wr.ry, rotateZ: hov ? 0 : wr.rz, scale: wr.s * (hov ? 1.3 : 1), opacity }
                      }
                      transition={{ duration: 1.3, ease: EASE, delay: c.idx * 0.02, opacity: { duration: 0.5, delay: dimmed || isSel ? 0 : c.idx * 0.04 } }}
                    >
                      <button
                        type="button"
                        tabIndex={c.crop === 0 ? 0 : -1}
                        aria-label={`Abrir modelo ${tpl.nome}${v.kind === "port" ? " (versão celular)" : ""}`}
                        onPointerEnter={() => setHover(c.key)}
                        onPointerLeave={() => setHover((h) => (h === c.key ? null : h))}
                        onFocus={() => setHover(c.key)}
                        onBlur={() => setHover((h) => (h === c.key ? null : h))}
                        onClick={() => pick(c)}
                        className={`pointer-events-auto relative block h-full w-full cursor-pointer rounded-md outline-offset-4 transition-shadow duration-300 [transform-style:preserve-3d] ${hov ? "shadow-[0_0_0_1.5px_#9b82ff,0_30px_90px_rgba(109,74,255,.5)]" : "shadow-[0_20px_50px_rgba(0,0,0,.6)]"}`}
                      >
                        <Image
                          src={`/shots/${c.slug}-${c.crop}.webp`}
                          alt=""
                          width={v.px[0]}
                          height={v.px[1]}
                          unoptimized
                          draggable={false}
                          className="absolute inset-0 h-full w-full rounded-md border border-white/20 object-cover [backface-visibility:hidden]"
                        />
                        {/* verso: a mesma captura, mais escura, como uma folha vista por trás */}
                        <Image
                          src={`/shots/${c.slug}-${c.crop}.webp`}
                          alt=""
                          width={v.px[0]}
                          height={v.px[1]}
                          unoptimized
                          draggable={false}
                          className="absolute inset-0 h-full w-full rounded-md border border-white/15 object-cover brightness-[.55] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                        />
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* rótulos com marcador, como nas referências */}
        <AnimatePresence>
          {mode === "ring" && !sel && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.8 }} className="hidden lg:block">
              {labels.map((l) => {
                const tpl = templates.find((t) => t.slug === l.slug)!;
                const first = cards.find((c) => c.slug === l.slug && c.crop === 0)!;
                const on = hover?.startsWith(l.slug);
                return (
                  <button
                    key={l.slug}
                    type="button"
                    data-ui
                    onPointerEnter={() => setHover(first.key)}
                    onPointerLeave={() => setHover((h) => (h === first.key ? null : h))}
                    onClick={() => pick(first)}
                    style={{ top: l.top, [l.side]: "2.5%" }}
                    className={`absolute z-10 flex cursor-pointer items-center gap-2 font-display text-lg font-medium transition ${on ? "text-white" : "text-white/55 hover:text-white"}`}
                  >
                    <i className={`h-2 w-2 rounded-full transition ${on ? "bg-accent shadow-[0_0_12px_var(--accent)]" : "bg-white/60"}`} aria-hidden="true" />
                    {tpl.nome}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* chamada */}
        <div className="pointer-events-none absolute left-4 top-6 z-10 sm:left-8 sm:top-10">
          <p className="mb-8 font-mono text-[11px] tracking-wide text-accent-2 sm:text-xs">{"// soluções web para empresas"}</p>
          <div aria-hidden="true" className="relative inline-block font-display">
            <span className="mb-1 block text-sm font-semibold text-white sm:hidden">Crie seu site da forma que você</span>
            <span className="absolute -top-6 left-0 hidden text-base font-semibold text-white sm:block">Crie seu site</span>
            <span className="absolute -top-6 left-[8.5rem] hidden whitespace-nowrap text-base font-semibold text-white sm:block">da forma que você</span>
            <span className="block text-[clamp(2.8rem,6.4vw,5.6rem)] font-extrabold leading-none tracking-[-.03em] text-accent-2">desejar.</span>
          </div>
          <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
            <Link href="/#contato" className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(109,74,255,.5)]">
              Quero o meu
            </Link>
            <Link href="/#processo" className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-white/25 bg-black/30 px-6 font-semibold backdrop-blur transition hover:bg-white/10">
              Como funciona
            </Link>
          </div>
        </div>

        {/* legenda do cartão em foco + controles */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-3 px-4">
          <div className="h-5 text-center font-mono text-[11px] uppercase tracking-widest text-white/70" aria-live="polite">
            {hoverTpl && !sel ? (
              <>
                <span className="text-accent">●</span> {hoverTpl.nome} · clique para abrir
              </>
            ) : (
              !sel && <span className="text-white/40">arraste para girar · clique em um cartão</span>
            )}
          </div>
        </div>

        {/* o disco escolhido se abre no site interativo */}
        <AnimatePresence>
          {current && phase === "open" && (
            <div className="absolute inset-0 z-40 flex items-center justify-center" style={{ perspective: 1600 }}>
              <motion.div
                key="backdrop"
                onClick={close}
                className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-[3px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                key="panel"
                role="dialog"
                aria-label={`Modelo ${current.nome}`}
                initial={{ opacity: 0, rotateY: -62, scale: 0.55, y: 30 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
                exit={{ opacity: 0, rotateY: 40, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 170, damping: 22 }}
                className="relative w-[min(760px,92vw,calc((100svh-230px)*1.333))] overflow-hidden rounded-2xl border border-white/20 bg-surface shadow-[0_50px_140px_rgba(0,0,0,.85)]"
              >
                <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
                  <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 font-mono text-xs text-muted">{current.slug}.seunegocio.com.br</span>
                  {!small && <DeviceToggle value={device} onChange={setDevice} />}
                  <button type="button" onClick={close} aria-label="Fechar" className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-white/10 hover:text-white">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                {(() => {
                  const Demo = demos[current.slug];
                  if (small) {
                    // no celular de verdade: o site aparece na versão celular, em tamanho legível
                    return (
                      <Scaled scroll designW={390} ratio={0.66}>
                        <Demo t={current} />
                      </Scaled>
                    );
                  }
                  if (device === "phone") {
                    return (
                      <div style={{ height: panelW * 0.75 }}>
                        <PhoneFrame>
                          <Demo t={current} />
                        </PhoneFrame>
                      </div>
                    );
                  }
                  return (
                    <Scaled scroll>
                      <Demo t={current} />
                    </Scaled>
                  );
                })()}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line bg-surface-2 px-4 py-3">
                  <div className="w-full sm:w-auto">
                    <p className="font-display text-base font-bold leading-tight sm:text-lg">{current.nome}</p>
                    <p className="hidden text-xs text-muted sm:block">{current.tags.join(" · ")}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/modelos/${current.slug}`} className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-4 text-sm font-semibold transition hover:bg-white/10">
                      Tela cheia <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link href="/#contato" onClick={close} className="inline-flex min-h-10 cursor-pointer items-center whitespace-nowrap rounded-full bg-accent px-4 text-sm font-semibold text-white transition hover:brightness-110">
                      Quero este
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}
