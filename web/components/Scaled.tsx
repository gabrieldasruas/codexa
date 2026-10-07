"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renderiza um site em tamanho de desktop (designW px de largura) e reduz para caber no espaço disponível.
 * `offset` recorta a partir de um ponto da página; `scroll` deixa o conteúdo rolável (modo interativo).
 */
export default function Scaled({
  children,
  designW = 1000,
  ratio = 4 / 3,
  offset = 0,
  scroll = false,
  className = "",
}: {
  children: ReactNode;
  designW?: number;
  ratio?: number;
  offset?: number;
  scroll?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / designW));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
      <div
        className={`@container absolute left-0 top-0 origin-top-left ${scroll ? "overflow-y-auto [scrollbar-color:rgba(255,255,255,.3)_transparent] [scrollbar-width:thin]" : "overflow-hidden"}`}
        style={{ width: designW, height: designW / ratio, transform: `scale(${s})`, visibility: s ? "visible" : "hidden" }}
      >
        <div style={{ marginTop: -offset }}>{children}</div>
      </div>
    </div>
  );
}
