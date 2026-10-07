import type { CSSProperties, ReactNode } from "react";
import type { Template } from "@/data/templates";

/** Define a paleta do modelo como variáveis CSS (--c1 fundo, --c2 destaque, --c3 texto). */
export function DemoShell({ t, children, className = "" }: { t: Template; children: ReactNode; className?: string }) {
  const [c1, c2, c3] = t.cores;
  return (
    <div style={{ "--c1": c1, "--c2": c2, "--c3": c3 } as CSSProperties} className={`min-h-full bg-[var(--c1)] text-[var(--c3)] ${className}`}>
      {children}
    </div>
  );
}

/** Imagem abstrata em gradiente, usada no lugar de fotos até termos material real. */
export function Art({ className = "", variant = 0 }: { className?: string; variant?: number }) {
  const bg = [
    "radial-gradient(circle at 30% 25%, var(--c2), transparent 55%), linear-gradient(135deg, color-mix(in srgb, var(--c2) 35%, var(--c1)), var(--c1))",
    "radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--c2) 80%, white), transparent 50%), linear-gradient(200deg, var(--c1), color-mix(in srgb, var(--c2) 45%, var(--c1)))",
    "conic-gradient(from 210deg at 40% 60%, var(--c1), var(--c2), color-mix(in srgb, var(--c2) 40%, var(--c1)), var(--c1))",
    "linear-gradient(160deg, color-mix(in srgb, var(--c2) 70%, var(--c1)), var(--c1) 70%)",
  ];
  return <div aria-hidden="true" className={`overflow-hidden ${className}`} style={{ background: bg[variant % bg.length] }} />;
}

export const btn =
  "inline-flex min-h-9 cursor-pointer items-center justify-center rounded-full bg-[var(--c2)] px-4 text-xs font-semibold text-[var(--c1)] transition hover:brightness-110 active:scale-95";
