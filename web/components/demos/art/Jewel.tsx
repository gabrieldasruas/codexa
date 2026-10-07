import { useId } from "react";

// seno/cosseno arredondados: o servidor (Node) e o navegador podem diferir nas últimas casas decimais, e isso quebraria a hidratação
const sin = (a: number) => Math.round(Math.sin(a) * 1e4) / 1e4;
const cos = (a: number) => Math.round(Math.cos(a) * 1e4) / 1e4;

export type JewelKind = "ring" | "bands" | "necklace" | "earrings" | "bracelet" | "pearls";
export type Metal = "gold" | "rose" | "silver";
export type Gem = "diamond" | "emerald" | "ruby" | "sapphire";

const METAL: Record<Metal, [string, string, string]> = {
  gold: ["#fff1b8", "#e2b84d", "#8e6a1d"],
  rose: ["#ffe1d2", "#e5a287", "#97543f"],
  silver: ["#ffffff", "#c9d0d9", "#6f7885"],
};
const GEM: Record<Gem, [string, string, string]> = {
  diamond: ["#ffffff", "#cfeaff", "#8fb9e0"],
  emerald: ["#9af0c7", "#1fb67e", "#0b6b49"],
  ruby: ["#ffa3b2", "#d6264a", "#7a0f26"],
  sapphire: ["#a9c4ff", "#3d63e0", "#162f8f"],
};

/** Joias ilustradas em vetor (imagens fictícias). */
export default function Jewel({ kind, metal = "gold", gem = "diamond", className = "" }: { kind: JewelKind; metal?: Metal; gem?: Gem; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const m = METAL[metal];
  const c = GEM[gem];
  const M = `url(#m${id})`;
  const G = `url(#g${id})`;

  const brilliant = (x: number, y: number, s = 1) => (
    <g key={`b${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="-30,-14 -18,-30 18,-30 30,-14 0,36" fill={G} />
      <polygon points="-30,-14 30,-14 0,36" fill="#000" opacity=".14" />
      <polygon points="-18,-30 18,-30 30,-14 -30,-14" fill="#fff" opacity=".25" />
      <path d="M-30 -14L30 -14M-18 -30L-10 -14L0 36L10 -14L18 -30M-10 -14L-30 -14M10 -14L30 -14M-10 -14L0 -30L10 -14" stroke="#fff" strokeOpacity=".8" strokeWidth=".9" fill="none" />
      <polygon points="-12,-27 -2,-27 -8,-16" fill="#fff" opacity=".85" />
    </g>
  );

  const drop = (x: number, y: number, s = 1) => (
    <g key={`d${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0C-16 22-16 44 0 52C16 44 16 22 0 0Z" fill={M} />
      <path d="M0 6C-11 24-11 42 0 47C11 42 11 24 0 6Z" fill={G} />
      <path d="M0 6L-8 22L0 47L8 22ZM-8 22L8 22" stroke="#fff" strokeOpacity=".7" strokeWidth=".8" fill="none" />
      <path d="M-5 16q-3 10 0 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".7" fill="none" />
    </g>
  );

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m[0]} />
          <stop offset=".5" stopColor={m[1]} />
          <stop offset="1" stopColor={m[2]} />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c[0]} />
          <stop offset=".5" stopColor={c[1]} />
          <stop offset="1" stopColor={c[2]} />
        </linearGradient>
        <radialGradient id={`pe${id}`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".6" stopColor="#f3ebe6" />
          <stop offset="1" stopColor="#cfc2bb" />
        </radialGradient>
        <filter id={`sh${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {kind === "ring" && (
        <g>
          <ellipse cx="100" cy="176" rx="52" ry="8" fill="#000" opacity=".3" filter={`url(#sh${id})`} />
          <ellipse cx="100" cy="132" rx="46" ry="42" fill="none" stroke="#000" strokeOpacity=".25" strokeWidth="12" />
          <ellipse cx="100" cy="132" rx="46" ry="42" fill="none" stroke={M} strokeWidth="9" />
          <path d="M60 112q4 30 40 36" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M82 96l-4-10M118 96l4-10M100 92v-10" stroke={M} strokeWidth="5" strokeLinecap="round" />
          {brilliant(100, 68, 1.05)}
        </g>
      )}

      {kind === "bands" && (
        <g>
          <ellipse cx="100" cy="172" rx="62" ry="8" fill="#000" opacity=".3" filter={`url(#sh${id})`} />
          <ellipse cx="80" cy="116" rx="38" ry="46" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="12" />
          <ellipse cx="80" cy="116" rx="38" ry="46" fill="none" stroke={M} strokeWidth="10" />
          <ellipse cx="124" cy="104" rx="38" ry="46" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="12" />
          <ellipse cx="124" cy="104" rx="38" ry="46" fill="none" stroke={metal === "rose" ? M : "#e5a287"} strokeWidth="10" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={124 + 38 * cos(-0.9 + i * 0.32)} cy={104 + 46 * sin(-0.9 + i * 0.32)} r="3.6" fill={G} stroke="#fff" strokeOpacity=".6" strokeWidth=".6" />
          ))}
          <path d="M50 128q-2 20 18 32M104 92q8-12 26-12" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}

      {kind === "necklace" && (
        <g>
          <path d="M26 34Q100 188 174 34" fill="none" stroke="#000" strokeOpacity=".18" strokeWidth="6" transform="translate(0 3)" />
          <path d="M26 34Q100 188 174 34" fill="none" stroke={M} strokeWidth="3.4" strokeDasharray="1.6 3.4" strokeLinecap="round" />
          <path d="M26 34Q100 188 174 34" fill="none" stroke={M} strokeWidth="1.2" opacity=".7" />
          <circle cx="100" cy="112" r="5" fill="none" stroke={M} strokeWidth="2.4" />
          {drop(100, 116, 1.15)}
          {[[30, 40], [170, 40]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={M} />
          ))}
        </g>
      )}

      {kind === "earrings" && (
        <g>
          {[62, 138].map((x, i) => (
            <g key={i}>
              <path d={`M${x} 22c${i ? 14 : -14} -4 ${i ? 14 : -14} 18 0 22`} fill="none" stroke={M} strokeWidth="3" strokeLinecap="round" />
              <circle cx={x} cy="48" r="7" fill={M} />
              <circle cx={x} cy="48" r="3.4" fill={G} />
              <path d={`M${x} 55v8`} stroke={M} strokeWidth="3" />
              {drop(x, 62, 1.25)}
            </g>
          ))}
        </g>
      )}

      {kind === "bracelet" && (
        <g>
          <ellipse cx="100" cy="164" rx="70" ry="9" fill="#000" opacity=".3" filter={`url(#sh${id})`} />
          <ellipse cx="100" cy="104" rx="74" ry="56" fill="none" stroke="#000" strokeOpacity=".2" strokeWidth="14" />
          <ellipse cx="100" cy="104" rx="74" ry="56" fill="none" stroke={M} strokeWidth="12" />
          <ellipse cx="100" cy="104" rx="66" ry="48" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = 0.35 + (i / 8) * (Math.PI - 0.7);
            return (
              <g key={i}>
                <circle cx={100 + 74 * cos(a)} cy={104 + 56 * sin(a)} r="8" fill={M} />
                <circle cx={100 + 74 * cos(a)} cy={104 + 56 * sin(a)} r="5.6" fill={G} stroke="#fff" strokeOpacity=".7" strokeWidth=".7" />
              </g>
            );
          })}
        </g>
      )}

      {kind === "pearls" && (
        <g>
          <path d="M28 40Q100 176 172 40" fill="none" stroke={M} strokeWidth="1" opacity=".7" />
          {Array.from({ length: 15 }).map((_, i) => {
            const t = i / 14;
            const x = (1 - t) * (1 - t) * 28 + 2 * (1 - t) * t * 100 + t * t * 172;
            const y = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 176 + t * t * 40;
            return <circle key={i} cx={x} cy={y + 4} r={9 + sin(t * Math.PI) * 3.5} fill={`url(#pe${id})`} stroke="#d8cbc4" strokeWidth=".6" />;
          })}
          <circle cx="100" cy="118" r="5" fill={M} />
          {drop(100, 122, 0.8)}
        </g>
      )}
    </svg>
  );
}
