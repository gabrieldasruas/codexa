import { useId } from "react";

// seno/cosseno arredondados: o servidor (Node) e o navegador podem diferir nas últimas casas decimais, e isso quebraria a hidratação
const sin = (a: number) => Math.round(Math.sin(a) * 1e4) / 1e4;
const cos = (a: number) => Math.round(Math.cos(a) * 1e4) / 1e4;

export type DishKind = "risoto" | "file" | "salmao" | "burrata" | "carpaccio" | "petit" | "tiramisu" | "negroni" | "suco";

const rnd = (i: number) => {
  const x = sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Pratos e bebidas ilustrados (vista de cima, em prato redondo). Imagens fictícias, feitas em vetor. */
export default function Dish({ kind, className = "" }: { kind: DishKind; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const glass = kind === "negroni" || kind === "suco";
  const g = (n: string) => `url(#${n}${id})`;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`p${id}`} cx=".38" cy=".32" r=".85">
          <stop offset="0" stopColor="#fffefb" />
          <stop offset=".7" stopColor="#ece6dc" />
          <stop offset="1" stopColor="#cfc6b8" />
        </radialGradient>
        <radialGradient id={`t${id}`} cx=".4" cy=".3" r=".9">
          <stop offset="0" stopColor="#4a352b" />
          <stop offset="1" stopColor="#1c120e" />
        </radialGradient>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a5233" />
          <stop offset="1" stopColor="#5a2b1a" />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffa57c" />
          <stop offset="1" stopColor="#ef6440" />
        </linearGradient>
        <radialGradient id={`w${id}`} cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#fffdf8" />
          <stop offset="1" stopColor="#eadfca" />
        </radialGradient>
        <linearGradient id={`r${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4313f" />
          <stop offset="1" stopColor="#8f1626" />
        </linearGradient>
        <linearGradient id={`o${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffbd4a" />
          <stop offset="1" stopColor="#ff8a00" />
        </linearGradient>
        <filter id={`b${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <ellipse cx="104" cy="112" rx="90" ry="86" fill="#000" opacity=".35" filter={`url(#b${id})`} />
      {glass ? (
        <>
          <circle cx="100" cy="100" r="92" fill={g("t")} />
          <circle cx="100" cy="100" r="82" fill="none" stroke="#c9a24b" strokeWidth="1.2" opacity=".7" />
        </>
      ) : (
        <>
          <circle cx="100" cy="100" r="92" fill={g("p")} />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#d6cdbf" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="64" fill="#f4efe7" opacity=".6" />
        </>
      )}

      {kind === "risoto" && (
        <g>
          <ellipse cx="100" cy="104" rx="48" ry="42" fill="#e6d391" />
          <ellipse cx="96" cy="98" rx="40" ry="33" fill="#f1e2ac" />
          {Array.from({ length: 70 }).map((_, i) => {
            const a = i * 2.39996;
            const r = Math.sqrt(i) * 4.6;
            return <ellipse key={i} cx={96 + cos(a) * r} cy={98 + sin(a) * r * 0.8} rx="3.4" ry="1.7" transform={`rotate(${(a * 180) / Math.PI} ${96 + cos(a) * r} ${98 + sin(a) * r * 0.8})`} fill="#fff8d8" opacity={0.55 + rnd(i) * 0.4} />;
          })}
          {[[80, 86], [112, 90], [98, 114], [122, 106], [84, 108]].map(([x, y], i) => (
            <g key={i} transform={`rotate(${i * 40} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="11" ry="8" fill="#85553a" />
              <ellipse cx={x} cy={y - 1.5} rx="8.5" ry="5.2" fill="#b98a62" />
              <path d={`M${x - 4} ${y} h8`} stroke="#6b4129" strokeWidth="1.2" />
            </g>
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx={74 + rnd(i + 3) * 52} cy={78 + rnd(i + 9) * 46} rx="2.4" ry="1.4" fill="#4f9a3b" transform={`rotate(${rnd(i) * 180} ${74 + rnd(i + 3) * 52} ${78 + rnd(i + 9) * 46})`} />
          ))}
          {[[104, 100], [90, 120], [116, 80]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="7" ry="2.6" fill="#2b1d16" transform={`rotate(${i * 50 - 20} ${x} ${y})`} />
          ))}
        </g>
      )}

      {kind === "file" && (
        <g>
          <ellipse cx="98" cy="108" rx="56" ry="46" fill="#4a1d12" />
          <ellipse cx="92" cy="98" rx="36" ry="14" fill="#7a3a24" opacity=".5" />
          <path d="M56 96C58 70 108 62 132 80C148 94 140 126 108 132C78 138 54 122 56 96Z" fill={g("m")} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${70 + i * 14} ${82 + i * 3}l18 26`} stroke="#35170d" strokeWidth="3" strokeLinecap="round" opacity=".7" />
          ))}
          <ellipse cx="92" cy="86" rx="20" ry="7" fill="#fff" opacity=".13" transform="rotate(-12 92 86)" />
          <circle cx="142" cy="130" r="21" fill="#f4e8c9" />
          <path d="M128 128c8-8 22-8 28 0M130 136c8-6 18-6 24 0" stroke="#e1cf9f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${50 + i * 5} ${146 - i * 3}l22 -16`} stroke="#5b9a3a" strokeWidth="4.4" strokeLinecap="round" />
          ))}
          <path d="M60 70q14-10 30-8M66 66l-3-8M74 64l-1-9M82 62l1-8" stroke="#3f7d32" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}

      {kind === "salmao" && (
        <g>
          <path d="M50 100C58 74 122 64 150 84C158 98 142 126 106 132C74 136 46 122 50 100Z" fill={g("s")} stroke="#d9552f" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${62 + i * 4} ${96 - i * 4}q${28 + i * 6} -14 ${64 + i * 4} ${6 - i * 2}`} stroke="#ffe0cd" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".85" />
          ))}
          <ellipse cx="100" cy="90" rx="26" ry="6" fill="#fff" opacity=".18" transform="rotate(-10 100 90)" />
          <circle cx="148" cy="136" r="17" fill="#ffe066" stroke="#f2c200" strokeWidth="2" />
          <circle cx="148" cy="136" r="13" fill="#fff3a8" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M148 136l${12 * cos((i * Math.PI) / 3)} ${12 * sin((i * Math.PI) / 3)}`} stroke="#f2c200" strokeWidth="1.2" />
          ))}
          {[[62, 138], [72, 144], [66, 128], [78, 134]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="#3f8a34" />
              <circle cx={x - 2} cy={y - 2} r="5" fill="#5bb04a" />
            </g>
          ))}
          <path d="M120 66q10-6 20 0M124 62l2-8M132 61l2-9M140 64l5-6" stroke="#3f7d32" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}

      {kind === "burrata" && (
        <g>
          {[[68, 68], [132, 64], [148, 114], [58, 122], [92, 150]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="#c92d2a" />
              <circle cx={x} cy={y} r="10" fill="#ef5a48" />
              {[0, 1, 2, 3].map((k) => (
                <ellipse key={k} cx={x + cos(k * 1.6) * 5} cy={y + sin(k * 1.6) * 5} rx="1.8" ry="1" fill="#ffd966" />
              ))}
            </g>
          ))}
          <circle cx="100" cy="104" r="35" fill={g("w")} stroke="#e4d8c0" strokeWidth="1.5" />
          <path d="M82 92q12-14 36-6M88 104q16 8 28-2" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".9" />
          <ellipse cx="90" cy="92" rx="10" ry="5" fill="#fff" opacity=".8" />
          {[[84, 70, 20], [118, 72, -30], [128, 100, 60], [74, 120, -50], [108, 136, 10]].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="12" ry="6.5" fill="#3f9a43" />
              <path d={`M${x - 11} ${y}h22`} stroke="#2c7a32" strokeWidth="1" />
            </g>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={74 + rnd(i + 20) * 54} cy={80 + rnd(i + 5) * 50} r="1.8" fill="#f5c86a" opacity=".8" />
          ))}
        </g>
      )}

      {kind === "carpaccio" && (
        <g>
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return (
              <ellipse key={i} cx={100 + cos(a) * 30} cy={102 + sin(a) * 28} rx="26" ry="20" fill="#c8505c" stroke="#a63a46" strokeWidth=".8" transform={`rotate(${(a * 180) / Math.PI} ${100 + cos(a) * 30} ${102 + sin(a) * 28})`} />
            );
          })}
          <circle cx="100" cy="102" r="22" fill="#d9626e" />
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (i / 9) * Math.PI * 2 + 0.3;
            return <ellipse key={i} cx={100 + cos(a) * 30} cy={102 + sin(a) * 28} rx="12" ry="7" fill="#e9858f" opacity=".7" transform={`rotate(${(a * 180) / Math.PI} ${100 + cos(a) * 30} ${102 + sin(a) * 28})`} />;
          })}
          {[[80, 80, -30], [118, 86, 40], [96, 116, 80], [124, 118, -10], [74, 108, 20], [102, 94, 0]].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y})`}>
              <path d={`M${x - 14} ${y}q14-12 28 0q-14 10-28 0Z`} fill="#4d9a3b" />
              <path d={`M${x - 12} ${y}h24`} stroke="#357a2a" strokeWidth="1" />
            </g>
          ))}
          {[[88, 100], [112, 100], [100, 84], [92, 126]].map(([x, y], i) => (
            <path key={i} d={`M${x - 8} ${y}q8-8 16 0q-8 4-16 0Z`} fill="#f6e8bd" transform={`rotate(${i * 45} ${x} ${y})`} />
          ))}
          {[[108, 112], [86, 90], [118, 96]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.4" fill="#5b7a3a" />
          ))}
        </g>
      )}

      {kind === "petit" && (
        <g>
          <ellipse cx="94" cy="112" rx="40" ry="32" fill="#2e160c" />
          <path d="M56 112C56 80 132 80 132 112C132 130 56 130 56 112Z" fill="#53291a" />
          <path d="M66 100C80 84 112 84 124 100" stroke="#7a4128" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".7" />
          <path d="M80 96c4-6 28-6 32 0c-2 12-6 22-16 22s-14-10-16-22Z" fill="#21100a" />
          <ellipse cx="96" cy="96" rx="10" ry="3" fill="#fff" opacity=".25" />
          <circle cx="138" cy="92" r="22" fill="#f6ecd2" />
          <circle cx="132" cy="86" r="14" fill="#fffaf0" opacity=".8" />
          <path d="M122 98c8 6 22 6 30-2" stroke="#e6d4a8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {[[120, 74, -40], [128, 70, 20]].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="9" ry="5" fill="#3f9a43" />
              <path d={`M${x - 8} ${y}h16`} stroke="#2c7a32" strokeWidth="1" />
            </g>
          ))}
          {[[66, 128], [76, 136], [60, 140]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="7" fill="#c4202f" />
              <circle cx={x - 2} cy={y - 2} r="2.2" fill="#fff" opacity=".6" />
            </g>
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={i} cx={60 + rnd(i + 40) * 90} cy={80 + rnd(i + 11) * 62} r="1.1" fill="#fff" opacity=".8" />
          ))}
        </g>
      )}

      {kind === "tiramisu" && (
        <g>
          <polygon points="60,92 76,74 156,74 140,92" fill="#6b3f26" />
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={74 + rnd(i + 70) * 76} cy={78 + rnd(i + 2) * 12} r="1.3" fill="#3d2214" opacity=".8" />
          ))}
          <polygon points="140,92 156,74 156,114 140,132" fill="#c7a56e" />
          <polygon points="140,98 156,80 156,86 140,104" fill="#4a2b19" />
          <polygon points="140,112 156,94 156,100 140,118" fill="#9c6c43" />
          <rect x="60" y="92" width="80" height="40" fill="#f6ebcb" />
          <rect x="60" y="92" width="80" height="6" fill="#4a2b19" />
          <rect x="60" y="106" width="80" height="6" fill="#9c6c43" />
          <rect x="60" y="120" width="80" height="12" fill="#e5c98f" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path key={i} d={`M${64 + i * 10} 122v8`} stroke="#c9a76b" strokeWidth="1.2" />
          ))}
          {[[150, 138, 20], [64, 146, -30], [166, 120, 50]].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="7" ry="4.6" fill="#4a2b19" />
              <path d={`M${x - 6} ${y}h12`} stroke="#241208" strokeWidth="1.2" />
            </g>
          ))}
        </g>
      )}

      {kind === "negroni" && (
        <g>
          <ellipse cx="100" cy="150" rx="34" ry="8" fill="#000" opacity=".4" />
          <rect x="66" y="56" width="68" height="94" rx="7" fill="#ffffff" opacity=".12" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
          <rect x="69" y="80" width="62" height="67" rx="5" fill={g("r")} />
          <rect x="69" y="80" width="62" height="6" fill="#ff6b6b" opacity=".6" />
          {[[84, 98], [108, 90], [98, 118], [116, 124]].map(([x, y], i) => (
            <rect key={i} x={x - 11} y={y - 11} width="22" height="22" rx="4" fill="#fff" opacity=".4" transform={`rotate(${i * 17 - 20} ${x} ${y})`} stroke="#fff" strokeOpacity=".6" />
          ))}
          <circle cx="122" cy="62" r="16" fill="#ff9f1c" />
          <circle cx="122" cy="62" r="11" fill="#ffc15e" />
          <path d="M122 62l12-10" stroke="#ff9f1c" strokeWidth="1.6" />
          <path d="M74 64v70" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
        </g>
      )}

      {kind === "suco" && (
        <g>
          <ellipse cx="100" cy="156" rx="30" ry="7" fill="#000" opacity=".4" />
          <path d="M72 46h56l-6 106q-1 6-8 6H86q-7 0-8-6Z" fill="#fff" opacity=".12" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
          <path d="M75 66h50l-4 84q-1 4-6 4H85q-5 0-6-4Z" fill={g("o")} />
          <ellipse cx="100" cy="66" rx="25" ry="5" fill="#ffd27a" />
          <path d="M112 20l-14 62" stroke="#e63946" strokeWidth="6" strokeLinecap="round" />
          <path d="M108 38l-3 10M104 56l-3 10" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".9" />
          <circle cx="130" cy="58" r="17" fill="#ff9f1c" />
          <circle cx="130" cy="58" r="13" fill="#ffd27a" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M130 58l${12 * cos((i * Math.PI) / 3)} ${12 * sin((i * Math.PI) / 3)}`} stroke="#ff9f1c" strokeWidth="1.2" />
          ))}
          {[[88, 100], [108, 120], [96, 134], [112, 92]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" opacity=".45" />
          ))}
          <path d="M82 70v76" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
