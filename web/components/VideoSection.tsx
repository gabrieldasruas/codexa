import Link from "next/link";
import { Check, Play } from "lucide-react";
import SectionHead from "./SectionHead";

const pontos = ["Você escolhe o modelo do seu nicho", "Nós criamos o design e desenvolvemos", "Seu site no ar, pronto para receber clientes"];

/** Vídeo do anúncio (9:16, com áudio), antes da seção de processo. */
export default function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <SectionHead
            eyebrow="em 30 segundos"
            title="Você tem a ideia. A gente cria."
            sub="Veja como a Codexa transforma a sua ideia em um site pronto: escolha o modelo, e nós cuidamos do resto."
          />
          <ul className="mb-8 flex flex-col gap-3">
            {pontos.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/20 text-accent-2">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/#contato"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(109,74,255,.5)]"
          >
            Faça sua cotação
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:w-[340px]">
          <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(109,74,255,.45),transparent_65%)] blur-2xl" />
          <div className="overflow-hidden rounded-[34px] border-[6px] border-[#0b0b10] bg-black shadow-[0_40px_100px_rgba(0,0,0,.65)] ring-1 ring-white/20">
            <video
              className="block aspect-[9/16] w-full bg-black"
              src="/video/codexa-anuncio-v2.mp4"
              poster="/video/codexa-anuncio-v2-capa.webp"
              controls
              playsInline
              preload="none"
              aria-label="Vídeo da Codexa: você tem a ideia, a gente cria"
            />
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-muted">
            <Play className="h-3.5 w-3.5 text-accent-2" aria-hidden="true" />
            aperte o play · com áudio
          </p>
        </div>
      </div>
    </section>
  );
}
