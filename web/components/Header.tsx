import Link from "next/link";
import { Code2 } from "lucide-react";

const links = [
  { href: "/#modelos", label: "Modelos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#processo", label: "Como funciona" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Codexa Tecnologia, início">
          <Code2 className="h-6 w-6 text-accent" aria-hidden="true" />
          <span className="font-display text-2xl font-extrabold leading-none tracking-[-.03em]">
            CODEXA <span className="hidden font-medium tracking-normal text-muted sm:inline">Tecnologia</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-6 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden py-2.5 transition-colors hover:text-text md:block">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contato"
            className="inline-flex min-h-10 cursor-pointer items-center rounded-full bg-accent px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(109,74,255,.5)]"
          >
            Fale conosco
          </Link>
        </nav>
      </div>
    </header>
  );
}
