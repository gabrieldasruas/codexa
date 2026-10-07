"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { MousePointerClick } from "lucide-react";
import type { Template } from "@/data/templates";
import { demos } from "./demos";
import PhoneFrame from "./PhoneFrame";
import DeviceToggle, { type Device } from "./DeviceToggle";

/** Janela de navegador com o site do modelo funcionando dentro (rolável e clicável), com leve inclinação 3D. */
export default function DemoFrame({ t, heightClass = "h-[560px]" }: { t: Template; heightClass?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [touched, setTouched] = useState(false);
  const [device, setDevice] = useState<Device>("desktop"); // computador ou celular (moldura de celular)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 18 });
  const Demo = demos[t.slug];

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div style={{ perspective: 1400 }} className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-2 -z-10 sm:-inset-8 rounded-[40px] opacity-40 blur-3xl transition-colors duration-700"
        style={{ background: "radial-gradient(circle at 50% 40%, rgba(109,74,255,.4), transparent 65%)" }}
      />
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerDown={() => setTouched(true)}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-2xl border border-white/15 bg-surface shadow-[0_40px_100px_rgba(0,0,0,.65)]"
      >
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-3">
          <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
          <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 font-mono text-xs text-muted">
            {t.slug}.seunegocio.com.br
          </span>
          <div className="hidden sm:block">
            <DeviceToggle value={device} onChange={setDevice} />
          </div>
        </div>

        <div className={`relative ${heightClass}`}>
          {device === "phone" ? (
            <PhoneFrame>
              <Demo t={t} />
            </PhoneFrame>
          ) : (
            <div className="@container h-full overflow-y-auto scroll-smooth [scrollbar-color:rgba(255,255,255,.25)_transparent] [scrollbar-width:thin]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.slug}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Demo t={t} />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
          <AnimatePresence>
            {!touched && device === "desktop" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-xs font-medium text-white backdrop-blur"
              >
                <MousePointerClick className="h-4 w-4 text-accent-2" aria-hidden="true" />
                Role e clique: o site é interativo
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
