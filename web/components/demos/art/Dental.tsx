import { useId } from "react";

export type DentalKind = "smile" | "tooth" | "braces" | "implant" | "clean" | "aligner";

/** Ilustrações odontológicas em vetor (imagens fictícias). `shade` muda o tom dos dentes (antes/depois). */
export default function Dental({ kind, shade = "#ffffff", className = "" }: { kind: DentalKind; shade?: string; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const T = `url(#t${id})`;
  const toothPath = "M60 52C60 36 80 34 100 42C120 34 140 36 140 52C140 78 130 92 128 118C126 148 120 164 112 164C104 164 104 134 100 134C96 134 96 164 88 164C80 164 74 148 72 118C70 92 60 78 60 52Z";

  const teeth = (y: number, h: number, n: number, x0: number, w: number, gap: number) =>
    Array.from({ length: n }).map((_, i) => (
      <g key={`${y}-${i}`}>
        <rect x={x0 + i * (w + gap)} y={y} width={w} height={h} rx={w * 0.38} fill={T} stroke="#cdd9e0" strokeWidth=".8" />
        <rect x={x0 + i * (w + gap) + 2.5} y={y + 3} width="3" height={h * 0.5} rx="1.5" fill="#fff" opacity=".7" />
      </g>
    ));

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`t${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade} />
          <stop offset="1" stopColor="#d9e4ea" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f08a90" />
          <stop offset="1" stopColor="#c7525e" />
        </linearGradient>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e9aa6" />
          <stop offset=".45" stopColor="#e6ecf1" />
          <stop offset="1" stopColor="#7f8b97" />
        </linearGradient>
        <clipPath id={`c${id}`}>
          <path d="M36 96C70 76 130 76 164 96C142 130 58 130 36 96Z" />
        </clipPath>
        <filter id={`b${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {(kind === "smile" || kind === "braces" || kind === "aligner") && (
        <g>
          <path d="M20 98C50 50 150 50 180 98C158 152 42 152 20 98Z" fill={`url(#l${id})`} />
          <path d="M36 96C70 76 130 76 164 96C142 130 58 130 36 96Z" fill="#5a1822" />
          <g clipPath={`url(#c${id})`}>
            <ellipse cx="100" cy="118" rx="30" ry="11" fill="#c9566a" />
            {teeth(80, 28, 7, 44, 15, 1.4)}
            {teeth(108, 20, 6, 52, 14.5, 1.6)}
            {kind === "braces" && (
              <g>
                <path d="M46 96H156" stroke="#9aa6b2" strokeWidth="1.6" />
                {Array.from({ length: 7 }).map((_, i) => (
                  <rect key={i} x={48 + i * 16.4} y={91} width="9" height="9" rx="2" fill={`url(#m${id})`} stroke="#6f7c88" strokeWidth=".8" />
                ))}
              </g>
            )}
            {kind === "aligner" && (
              <path d="M44 79H156V108H44Z" fill="#5ac8fa" opacity=".22" stroke="#5ac8fa" strokeWidth="1.6" strokeLinejoin="round" />
            )}
          </g>
          <path d="M36 96C70 76 130 76 164 96" stroke="#9c2f3f" strokeWidth="2" fill="none" />
          <path d="M44 74C70 62 120 60 150 70" stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}

      {(kind === "tooth" || kind === "clean") && (
        <g>
          <path d={toothPath} fill="#000" opacity=".25" filter={`url(#b${id})`} transform="translate(4 8)" />
          <path d={toothPath} fill={T} stroke="#c3d2da" strokeWidth="2" />
          <path d="M70 50C72 42 82 40 90 44" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".9" />
          <path d="M70 70C68 90 76 108 78 126" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" opacity=".6" />
          {kind === "tooth" &&
            [[150, 40, 1.1], [44, 80, 0.8], [158, 100, 0.7]].map(([x, y, s], i) => (
              <path key={i} d="M0 -14C1.5 -4 4 -1.5 14 0C4 1.5 1.5 4 0 14C-1.5 4 -4 1.5 -14 0C-4 -1.5 -1.5 -4 0 -14Z" transform={`translate(${x} ${y}) scale(${s})`} fill="#7ad3e6" />
            ))}
          {kind === "clean" && (
            <g>
              <g transform="rotate(32 150 120)">
                <rect x="146" y="68" width="10" height="84" rx="5" fill="#2a8fa8" />
                <rect x="140" y="52" width="22" height="22" rx="4" fill="#e8f0f4" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={142 + i * 4} y="42" width="2.6" height="12" rx="1.3" fill="#2a8fa8" />
                ))}
              </g>
              {[[56, 52, 7], [44, 76, 4], [66, 36, 4.5], [160, 56, 3.5]].map(([x, y, r], i) => (
                <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#7ad3e6" strokeWidth="2" />
              ))}
            </g>
          )}
        </g>
      )}

      {kind === "implant" && (
        <g>
          <path d="M20 150C20 120 60 112 100 112C140 112 180 120 180 150V200H20Z" fill="#f3a3a8" />
          <path d="M20 150C20 120 60 112 100 112C140 112 180 120 180 150" stroke="#e0777f" strokeWidth="3" fill="none" />
          <path d="M82 118H118L112 188Q100 198 88 188Z" fill={`url(#m${id})`} stroke="#6f7c88" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M${83 + i * 0.7} ${126 + i * 9}H${117 - i * 0.7}`} stroke="#5a6672" strokeWidth="2.2" strokeLinecap="round" />
          ))}
          <rect x="90" y="104" width="20" height="14" rx="3" fill="#c9a24b" />
          <path d="M62 56C62 40 80 38 100 46C120 38 138 40 138 56C138 78 128 94 124 106H76C72 94 62 78 62 56Z" fill={T} stroke="#c3d2da" strokeWidth="2" />
          <path d="M72 54C74 46 84 44 92 48" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".9" />
        </g>
      )}
    </svg>
  );
}
