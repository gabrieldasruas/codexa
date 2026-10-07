import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import DemoFrame from "@/components/DemoFrame";
import { Footer } from "@/components/Sections";
import { templates } from "@/data/templates";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  return { title: t ? `Modelo ${t.nome} — Codexa Tecnologia` : "Modelo não encontrado" };
}

export default async function ModeloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = templates.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 md:py-16">
        <Link href="/#modelos" className="mb-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted transition hover:text-text">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar aos modelos
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-[7fr_5fr]">
          <DemoFrame t={t} heightClass="h-[70vh] min-h-[480px]" />

          <div>
            <p className="mb-3 font-mono text-[.82rem] text-accent-2">{`// modelo · ${t.categoria.toLowerCase()}`}</p>
            <h1 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">{t.nome}</h1>
            <p className="mb-6 text-lg text-muted">{t.descricao}</p>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Seções incluídas</h2>
            <ul className="mb-8 flex flex-col gap-2.5">
              {t.secoes.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mb-8 flex items-center gap-2" aria-label="Paleta do modelo">
              {t.cores.map((c) => (
                <span key={c} className="h-9 w-9 rounded-full border border-white/20" style={{ background: c }} title={c} />
              ))}
              <span className="ml-2 font-mono text-xs text-muted">paleta base</span>
            </div>

            <Link href="/#contato" className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(109,74,255,.5)]">
              Quero este modelo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
