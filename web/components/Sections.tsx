import { MessageCircle, LayoutTemplate, PenTool, Rocket, Globe, ShoppingBag, MousePointerClick, LayoutDashboard, Gauge } from "lucide-react";
import SectionHead from "./SectionHead";

const steps = [
  { icon: MessageCircle, title: "Conversa rápida", text: "Entendemos seu negócio, público e o que você quer que o site faça." },
  { icon: LayoutTemplate, title: "Escolha do modelo", text: "Você escolhe um modelo da biblioteca ou pede algo do zero." },
  { icon: PenTool, title: "Design e código", text: "Montamos o site com a sua identidade, rápido e responsivo." },
  { icon: Rocket, title: "Publicação", text: "Domínio, hospedagem e ajustes finais. Você recebe tudo pronto." },
];

export function Process() {
  return (
    <section id="processo" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 md:py-28">
      <SectionHead eyebrow="processo" title="Do primeiro contato ao site no ar" />
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line bg-surface p-6 transition hover:border-white/25">
            <div className="mb-4 flex items-center justify-between">
              <s.icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mb-1.5 text-lg font-semibold">{s.title}</h3>
            <p className="text-[.94rem] text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const solutions = [
  { icon: Globe, title: "Sites institucionais", text: "Sua marca, serviços e contatos em um site rápido, bonito e profissional." },
  { icon: ShoppingBag, title: "Lojas virtuais", text: "Catálogo, carrinho e pagamento para você vender online com segurança." },
  { icon: MousePointerClick, title: "Landing pages", text: "Páginas focadas em conversão para campanhas, lançamentos e captação de clientes." },
  { icon: LayoutDashboard, title: "Sistemas e painéis web", text: "Agendamentos, áreas do cliente, dashboards e automações feitos sob medida." },
  { icon: PenTool, title: "Design de interfaces", text: "Layouts pensados para o seu público, no celular e no computador." },
  { icon: Gauge, title: "Performance, SEO e suporte", text: "Site rápido, bem posicionado no Google e com manutenção contínua." },
];

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 md:py-28">
      <SectionHead
        eyebrow="sobre a codexa"
        title="Somos uma empresa especializada em soluções web"
        sub="Cuidamos de todo o caminho: da ideia ao site no ar, e depois dele. Planejamento, design, desenvolvimento, publicação e suporte, com atenção ao detalhe e ao resultado do seu negócio."
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((s) => (
          <li key={s.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/60">
            <s.icon className="mb-2 h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-[.94rem] text-muted">{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
const field =
  "min-h-[46px] rounded-[10px] border border-line bg-surface px-3.5 py-2.5 text-text outline-offset-1 focus:outline-2 focus:outline-accent-2";

/** Somente visual por enquanto: o envio será ligado na fase de funcionalidade. */
export function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-7xl px-4 py-20 sm:px-8 md:py-28">
      <SectionHead eyebrow="contato" title="Vamos criar o seu site" sub="Conte um pouco sobre o seu negócio e respondemos em até 1 dia útil." />
      <form className="grid max-w-3xl gap-4 sm:grid-cols-2" aria-label="Formulário de contato">
        <label className="flex flex-col gap-1.5 text-sm text-muted">
          Nome
          <input name="nome" autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-muted">
          WhatsApp ou e-mail
          <input name="contato" autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-muted sm:col-span-2">
          Mensagem
          <textarea name="msg" rows={4} className={field} />
        </label>
        <button type="button" className="min-h-11 w-fit cursor-pointer rounded-full bg-accent px-6 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(109,74,255,.5)] sm:col-span-2">
          Enviar pedido
        </button>
      </form>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-7 text-sm text-muted sm:px-8">
        <span>© {new Date().getFullYear()} Codexa Tecnologia</span>
        <span className="font-mono">soluções web sob medida</span>
      </div>
    </footer>
  );
}
