export type Template = {
  slug: string;
  nome: string;
  categoria: string;
  descricao: string;
  tags: string[];
  /** [fundo, destaque, texto] do modelo */
  cores: [string, string, string];
  variante: "split" | "center" | "grid" | "banner" | "menu";
  secoes: string[];
};

export const templates: Template[] = [
  {
    slug: "medico",
    nome: "Médico",
    categoria: "Saúde",
    descricao: "Site premium para médicos: tratamentos, primeira consulta, agendamento pelo WhatsApp, depoimentos e convênios.",
    tags: ["Agendamento", "WhatsApp", "Depoimentos"],
    cores: ["#f6f8fb", "#1f4fd8", "#0b1b34"],
    variante: "split",
    secoes: [
      "Hero com foto do médico e agendamento pelo WhatsApp",
      "Tratamentos por área, com exames e cuidados",
      "Como funciona a primeira consulta",
      "Sobre o médico, com CRM e formação",
      "Depoimentos e nota no Google",
      "Agendamento: tipo, convênio, dia e horário",
      "Dúvidas frequentes e localização",
    ],
  },
  {
    slug: "barbearia",
    nome: "Barbearia",
    categoria: "Beleza",
    descricao: "Agendamento online, tabela de serviços, galeria de cortes e equipe de barbeiros.",
    tags: ["Agendamento", "Galeria", "WhatsApp"],
    cores: ["#121212", "#c9a24b", "#f5efe2"],
    variante: "split",
    secoes: ["Hero com chamada para agendar", "Tabela de serviços e preços", "Galeria de cortes", "Equipe de barbeiros", "Localização e horários"],
  },
  {
    slug: "transportadora",
    nome: "Transportadora",
    categoria: "Logística",
    descricao: "Codexa Transportes: hero com foto da frota, rastreio de carga, cotação de frete, soluções logísticas e filiais.",
    tags: ["Cotação", "Rastreio", "Filiais"],
    cores: ["#0a0d12", "#ff6a13", "#f4f6f9"],
    variante: "banner",
    secoes: ["Hero com foto da frota e rastreio", "Números da operação", "Soluções logísticas sob medida", "Cotação de frete online", "Certificações e filiais"],
  },
  {
    slug: "joalheria",
    nome: "Joalheria",
    categoria: "Varejo",
    descricao: "Loja de joias no estilo das grandes marcas: vitrine com filtros, favoritos, sacola, coleções e presentes.",
    tags: ["Vitrine", "Sacola", "Coleções"],
    cores: ["#fbf6f4", "#b4636e", "#1e1a1a"],
    variante: "center",
    secoes: ["Hero editorial com foto", "Benefícios (frete, troca, garantia)", "Vitrine com filtros e favoritos", "Sacola de compras", "Presentes e coleções", "Newsletter"],
  },
  {
    slug: "clinica",
    nome: "Clínica Odontológica",
    categoria: "Saúde",
    descricao: "Clínica premium: avaliação gratuita, tratamentos com foto, convênios, depoimentos e agendamento pelo WhatsApp.",
    tags: ["Avaliação", "Convênios", "Agendamento"],
    cores: ["#f5fafa", "#0d9488", "#0b2530"],
    variante: "grid",
    secoes: ["Hero com foto e avaliação gratuita", "Convênios aceitos", "Tratamentos em abas", "Números da clínica", "Depoimentos", "Agendamento pelo WhatsApp"],
  },
  {
    slug: "restaurante",
    nome: "Restaurante",
    categoria: "Alimentação",
    descricao: "Restaurante elegante: cardápio com fotos e pedido para delivery, ambiente, reserva de mesa e horários.",
    tags: ["Cardápio", "Reservas", "Delivery"],
    cores: ["#120f0d", "#c9a465", "#f5ede3"],
    variante: "menu",
    secoes: ["Hero com prato do dia", "Cardápio com fotos e pedido", "Ambiente e eventos", "Reserva de mesa", "Endereço e horários"],
  },
];

export const categorias = ["Todos", ...Array.from(new Set(templates.map((t) => t.categoria)))];
