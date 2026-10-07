import { useId } from "react";

// seno/cosseno arredondados: o servidor (Node) e o navegador podem diferir nas últimas casas decimais, e isso quebraria a hidratação
const sin = (a: number) => Math.round(Math.sin(a) * 1e4) / 1e4;
const cos = (a: number) => Math.round(Math.cos(a) * 1e4) / 1e4;

export type HairStyle = "fade" | "pompadour" | "social" | "curly" | "long" | "beard" | "buzz" | "bun";
export type Outfit = "cape" | "coat" | "tee";

/** Retrato ilustrado em vetor (corte de cabelo, barba, equipe). Imagens fictícias. */
export default function Hair({
  style,
  skin = "#e8b896",
  hair = "#2b1d16",
  outfit = "cape",
  outfitColor = "#1b1b22",
  beard = false,
  className = "",
}: {
  style: HairStyle;
  skin?: string;
  hair?: string;
  outfit?: Outfit;
  outfitColor?: string;
  beard?: boolean;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const hasBeard = beard || style === "beard";

  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`f${id}`} cx=".42" cy=".38" r=".75">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset="1" stopColor="#000" stopOpacity=".14" />
        </radialGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
      </defs>

      {/* cabelo comprido, atrás da cabeça */}
      {style === "long" && <path d="M50 100C36 30 166 30 150 100L162 216L38 216Z" fill={hair} />}

      {/* ombros e roupa */}
      <path d="M14 240C16 198 56 180 100 180C144 180 184 198 186 240Z" fill={outfitColor} />
      {outfit === "coat" && (
        <g>
          <path d="M100 182L72 240M100 182L128 240" stroke="#d9dee6" strokeWidth="2" />
          <path d="M84 182L100 214L116 182" fill="#e8f0f8" />
          <rect x="132" y="206" width="22" height="16" rx="3" fill="none" stroke="#c4ccd8" strokeWidth="1.5" />
          <path d="M70 188q-6 26 14 38" stroke="#2a8fa8" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {outfit === "cape" && <path d="M64 188Q100 214 136 188" stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none" />}
      {outfit === "tee" && <path d="M76 184Q100 204 124 184" fill={skin} />}

      {/* pescoço */}
      <path d="M80 150L80 186Q100 204 120 186L120 150Z" fill={skin} />
      <path d="M80 150L80 176Q100 188 120 176L120 150Z" fill="#000" opacity=".12" />

      {/* orelhas */}
      <ellipse cx="55" cy="114" rx="8" ry="13" fill={skin} />
      <ellipse cx="145" cy="114" rx="8" ry="13" fill={skin} />
      <ellipse cx="55" cy="114" rx="8" ry="13" fill="#000" opacity=".1" />

      {/* rosto */}
      <ellipse cx="100" cy="108" rx="46" ry="56" fill={skin} />
      <ellipse cx="100" cy="108" rx="46" ry="56" fill={`url(#f${id})`} />

      {/* cabelo da frente */}
      {style === "fade" && (
        <g>
          <path d="M56 96C50 50 84 36 100 36C118 36 152 50 144 96C142 80 134 68 100 66C66 68 58 80 56 96Z" fill={hair} />
          <path d="M56 96C54 108 56 118 58 126L61 100Z M144 96C146 108 144 118 142 126L139 100Z" fill={hair} opacity=".5" />
        </g>
      )}
      {style === "buzz" && (
        <g>
          <path d="M58 94C54 56 84 44 100 44C116 44 146 56 142 94C138 78 130 70 100 70C70 70 62 78 58 94Z" fill={hair} opacity=".85" />
          {Array.from({ length: 30 }).map((_, i) => (
            <circle key={i} cx={66 + ((i * 37) % 70)} cy={52 + ((i * 23) % 16)} r="1" fill="#fff" opacity=".2" />
          ))}
        </g>
      )}
      {style === "pompadour" && (
        <g>
          <path d="M52 100C34 46 96 8 140 28C166 40 154 78 146 100C142 84 134 72 116 66C98 60 70 66 62 84C58 90 56 96 52 100Z" fill={hair} />
          <path d="M70 50C90 30 120 28 142 40M66 62C86 44 112 40 138 50" stroke="#fff" strokeOpacity=".22" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M52 100C50 112 52 122 54 128L58 104Z M148 100C150 112 148 122 146 128L142 104Z" fill={hair} opacity=".55" />
        </g>
      )}
      {style === "social" && (
        <g>
          <path d="M54 98C48 52 82 34 106 36C134 38 152 56 146 98C142 78 130 66 112 64C96 62 70 66 54 98Z" fill={hair} />
          <path d="M86 40C88 52 86 62 80 68" stroke="#000" strokeOpacity=".35" strokeWidth="2" fill="none" />
          <path d="M96 40C124 40 142 54 142 74" stroke="#fff" strokeOpacity=".16" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {style === "curly" && (
        <g>
          <circle cx="100" cy="58" r="34" fill={hair} />
          {Array.from({ length: 11 }).map((_, i) => {
            const a = Math.PI + (i / 10) * Math.PI;
            return <circle key={i} cx={100 + cos(a) * 46} cy={88 + sin(a) * 44} r="16" fill={hair} />;
          })}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={74 + i * 6.5} cy={46 + ((i * 7) % 14)} r="10" fill={hair} />
          ))}
        </g>
      )}
      {style === "long" && (
        <g>
          <path d="M54 100C46 50 84 34 104 36C130 38 156 56 146 100C140 84 130 70 100 70C70 70 62 86 54 100Z" fill={hair} />
          <path d="M52 100C40 130 44 170 56 196L74 190C66 160 64 130 66 108Z M148 100C160 130 156 170 144 196L126 190C134 160 136 130 134 108Z" fill={hair} />
          <path d="M66 52C80 40 108 38 130 48" stroke="#fff" strokeOpacity=".2" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )}
      {style === "bun" && (
        <g>
          <circle cx="100" cy="30" r="20" fill={hair} />
          <path d="M60 94C54 56 82 44 100 44C118 44 146 56 140 94C138 78 130 68 100 66C70 68 62 78 60 94Z" fill={hair} />
          <path d="M60 94C58 108 60 118 62 124L64 100Z M140 94C142 108 140 118 138 124L136 100Z" fill={hair} opacity=".4" />
        </g>
      )}
      {style === "beard" && (
        <g>
          <circle cx="100" cy="34" r="22" fill={hair} />
          <path d="M58 94C52 58 82 46 100 46C118 46 148 58 142 94C140 78 132 68 100 66C68 68 60 78 58 94Z" fill={hair} />
        </g>
      )}

      {/* barba */}
      {hasBeard && (
        <g>
          <path d="M55 112C56 172 144 172 145 112C140 136 124 148 100 148C76 148 60 136 55 112Z" fill={hair} />
          <path d="M82 130Q100 124 118 130Q100 138 82 130Z" fill={hair} />
          <path d="M60 130C66 160 90 168 100 168" stroke="#fff" strokeOpacity=".12" strokeWidth="2" fill="none" />
        </g>
      )}

      {/* sobrancelhas, olhos, nariz, boca */}
      <path d="M72 92q10-6 20-1M108 91q10-5 20 1" stroke={hair} strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <ellipse cx="82" cy="104" rx="3.6" ry="4" fill="#2a1d17" />
      <ellipse cx="118" cy="104" rx="3.6" ry="4" fill="#2a1d17" />
      <circle cx="83.2" cy="102.8" r="1.1" fill="#fff" />
      <circle cx="119.2" cy="102.8" r="1.1" fill="#fff" />
      <path d="M100 108q-7 16 0 20q6 1 9-2" stroke="#000" strokeOpacity=".28" strokeWidth="2" fill="none" strokeLinecap="round" />
      {hasBeard ? (
        <path d="M88 140q12 8 24 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".85" />
      ) : (
        <path d="M88 138q12 9 24 0" stroke="#a5553f" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      <circle cx="70" cy="124" r="7" fill="#e07b6a" opacity=".18" />
      <circle cx="130" cy="124" r="7" fill="#e07b6a" opacity=".18" />
    </svg>
  );
}
