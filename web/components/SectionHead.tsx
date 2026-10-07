export default function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 max-w-[62ch]">
      <p className="mb-3 font-mono text-[.82rem] tracking-wide text-accent-2">{`// ${eyebrow}`}</p>
      <h2 className="mb-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-.03em] text-balance">{title}</h2>
      {sub && <p className="text-muted">{sub}</p>}
    </div>
  );
}
