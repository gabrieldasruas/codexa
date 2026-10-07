"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { templates } from "@/data/templates";
import DemoFrame from "./DemoFrame";
import SectionHead from "./SectionHead";

export const PICK_EVENT = "codex:pick";

export default function Showcase() {
  const [slug, setSlug] = useState(templates[0].slug);
  const t = templates.find((x) => x.slug === slug)!;

  // permite que a constelação do hero escolha um modelo
  useEffect(() => {
    const h = (e: Event) => setSlug((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_EVENT, h);
    return () => window.removeEventListener(PICK_EVENT, h);
  }, []);

  return (
    <section id="modelos" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-20 sm:px-8 md:py-28">
      <SectionHead
        eyebrow="biblioteca"
        title="Experimente cada modelo"
        sub="Escolha um tipo de negócio e interaja com o site: role, toque, monte um pedido. É assim que o seu vai funcionar, no computador e no celular."
      />

      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0" aria-label="Modelos">
          {templates.map((m, i) => {
            const on = m.slug === slug;
            return (
              <li key={m.slug} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  aria-pressed={on}
                  onMouseEnter={() => setSlug(m.slug)}
                  onFocus={() => setSlug(m.slug)}
                  onClick={() => setSlug(m.slug)}
                  className={`group relative flex w-full cursor-pointer items-center gap-4 rounded-xl border p-3.5 text-left transition duration-200 lg:p-4 ${
                    on ? "border-accent bg-surface-2" : "border-line hover:border-white/30"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col">
                    <span className="whitespace-nowrap font-semibold lg:whitespace-normal">{m.nome}</span>
                    <span className="hidden text-xs text-muted lg:block">{m.tags.join(" · ")}</span>
                  </span>
                  <span className="ml-auto hidden h-3 w-3 rounded-full border border-white/30 lg:block" style={on ? { background: "#6d4aff", borderColor: "#6d4aff" } : undefined} aria-hidden="true" />
                </button>
              </li>
            );
          })}
          <li className="hidden px-1 pt-3 text-sm text-muted lg:block">
            <p className="mb-3">{t.descricao}</p>
            <Link href={`/modelos/${t.slug}`} className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-semibold text-accent-2 transition hover:gap-2.5">
              Abrir em tela cheia <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>

        <DemoFrame t={t} />
      </div>
    </section>
  );
}
