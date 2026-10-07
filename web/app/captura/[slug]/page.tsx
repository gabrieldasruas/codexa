import { notFound } from "next/navigation";
import { demos } from "@/components/demos";
import { templates } from "@/data/templates";

// Rota de USO INTERNO: renderiza um modelo em largura fixa para gerar as imagens de public/shots.
// Em produção ela responde 404. Pode apagar a pasta app/captura quando não precisar mais regerar as imagens.
export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export default async function Captura({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ w?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const { w } = await searchParams;
  const t = templates.find((x) => x.slug === slug);
  if (!t) notFound();
  const Demo = demos[slug];
  return (
    <div className="@container" style={{ width: Number(w) || 1000 }}>
      <Demo t={t} />
    </div>
  );
}
