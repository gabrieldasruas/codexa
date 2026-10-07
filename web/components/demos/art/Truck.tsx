import { useId } from "react";

// seno/cosseno arredondados: o servidor (Node) e o navegador podem diferir nas últimas casas decimais, e isso quebraria a hidratação
const sin = (a: number) => Math.round(Math.sin(a) * 1e4) / 1e4;
const cos = (a: number) => Math.round(Math.cos(a) * 1e4) / 1e4;

export type TruckKind = "van" | "box" | "semi";

/** Veículos de carga em vetor (imagens fictícias). Cores vêm da paleta do modelo. */
export default function Truck({ kind, brand = "TRANSNORTE", body = "#ffffff", accent = "#ff7a1a", dark = "#0b1f3a", className = "" }: { kind: TruckKind; brand?: string; body?: string; accent?: string; dark?: string; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cargoW = kind === "van" ? 112 : kind === "box" ? 186 : 236;
  const cabW = 92;
  const total = cargoW + 6 + cabW;
  const x0 = (340 - total) / 2;
  const cx = x0 + cargoW + 6; // início da cabine
  const wheelY = 146;
  const wheels = kind === "van" ? [x0 + 32, cx + 56] : kind === "box" ? [x0 + 46, x0 + 106, cx + 56] : [x0 + 40, x0 + 92, x0 + 150, cx + 56];

  return (
    <svg viewBox="0 0 340 180" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={body} />
          <stop offset="1" stopColor={body} stopOpacity=".78" />
        </linearGradient>
        <linearGradient id={`c${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={accent} stopOpacity=".78" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d5ecff" />
          <stop offset="1" stopColor="#6aa7d8" />
        </linearGradient>
        <filter id={`s${id}`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <ellipse cx="170" cy="168" rx={total / 2 + 6} ry="7" fill="#000" opacity=".35" filter={`url(#s${id})`} />

      {/* carroceria */}
      <rect x={x0} y="30" width={cargoW} height="104" rx="9" fill={`url(#b${id})`} />
      <rect x={x0} y="96" width={cargoW} height="16" fill={accent} />
      <rect x={x0} y="30" width={cargoW} height="10" rx="5" fill="#000" opacity=".08" />
      <path d={`M${x0 + 8} 120H${x0 + cargoW - 8}`} stroke="#000" strokeOpacity=".1" strokeWidth="1.5" />
      <text x={x0 + 16} y="80" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize={Math.min(26, Math.floor((cargoW - 34) / 6.9))} textLength={cargoW - 32} lengthAdjust="spacingAndGlyphs" fill={dark}>
        {brand}
      </text>
      <path d={`M${x0 + 16} 54h${kind === "van" ? 44 : 58}`} stroke={accent} strokeWidth="5" strokeLinecap="round" />
      {kind !== "van" &&
        Array.from({ length: Math.floor(cargoW / 38) }).map((_, i) => (
          <path key={i} d={`M${x0 + 28 + i * 38} 38v52`} stroke="#000" strokeOpacity=".07" strokeWidth="2" />
        ))}

      {/* cabine */}
      <path d={`M${cx} 56H${cx + 50}Q${cx + 62} 56 ${cx + 70} 76L${cx + 86} 104Q${cx + 92} 112 ${cx + 92} 120V134H${cx}Z`} fill={`url(#c${id})`} />
      <path d={`M${cx + 8} 64H${cx + 46}Q${cx + 54} 64 ${cx + 60} 78L${cx + 70} 98H${cx + 8}Z`} fill={`url(#g${id})`} />
      <path d={`M${cx + 14} 68L${cx + 24} 96`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      <rect x={cx + 80} y="104" width="12" height="8" rx="2" fill="#ffe27a" />
      <rect x={cx + 86} y="118" width="6" height="14" rx="2" fill={dark} />
      <rect x={cx - 2} y="130" width={cabW + 4} height="10" rx="3" fill={dark} />
      <rect x={cx + 2} y="104" width="22" height="3" rx="1.5" fill="#000" opacity=".2" />
      <path d={`M${cx - 4} 70v16`} stroke={dark} strokeWidth="3" strokeLinecap="round" />

      {/* chassi e rodas */}
      <rect x={x0 + 4} y="132" width={total - 8} height="8" rx="3" fill="#10131b" />
      {wheels.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={wheelY - 6} r="25" fill="#10131b" opacity=".55" />
          <circle cx={x} cy={wheelY} r="19" fill="#161922" />
          <circle cx={x} cy={wheelY} r="9" fill="#cfd6df" />
          <circle cx={x} cy={wheelY} r="4" fill="#8892a0" />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={x + cos((k * Math.PI * 2) / 5) * 6.2} cy={wheelY + sin((k * Math.PI * 2) / 5) * 6.2} r="1.1" fill="#5d6673" />
          ))}
        </g>
      ))}
    </svg>
  );
}
