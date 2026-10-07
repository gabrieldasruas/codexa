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
    descricao: "Cotação de frete, rastreio de encomendas, rotas atendidas e área do cliente.",
    tags: ["Cotação", "Rastreio", "Frota"],
    cores: ["#0b1f3a", "#ff7a1a", "#ffffff"],
    variante: "banner",
    secoes: ["Hero com campo de rastreio", "Cotação de frete", "Rotas e cobertura", "Frota e diferenciais", "Área do cliente"],
  },
  {
    slug: "joalheria",
    nome: "Joalheria",
    categoria: "Varejo",
    descricao: "Vitrine elegante de coleções, catálogo com pedido por WhatsApp e atendimento personalizado.",
    tags: ["Catálogo", "Coleções", "Sob encomenda"],
    cores: ["#16130f", "#d8b97a", "#faf6ee"],
    variante: "center",
    secoes: ["Hero editorial", "Coleções em destaque", "Catálogo com filtros", "Peças sob encomenda", "Contato e atendimento"],
  },
  {
    slug: "clinica",
    nome: "Clínica Odontológica",
    categoria: "Saúde",
    descricao: "Tratamentos, equipe, antes e depois, convênios e marcação de consulta.",
    tags: ["Consultas", "Convênios", "Depoimentos"],
    cores: ["#f4fbfb", "#12a3a3", "#0b2a2a"],
    variante: "grid",
    secoes: ["Hero com marcação de consulta", "Tratamentos", "Antes e depois", "Convênios aceitos", "Depoimentos de pacientes"],
  },
  {
    slug: "restaurante",
    nome: "Restaurante",
    categoria: "Alimentação",
    descricao: "Cardápio digital, reservas, pedidos por delivery e localização com mapa.",
    tags: ["Cardápio", "Reservas", "Delivery"],
    cores: ["#1c0f0a", "#e5533d", "#fff3e6"],
    variante: "menu",
    secoes: ["Hero com prato do dia", "Cardápio digital", "Reserva de mesa", "Delivery", "Mapa e horários"],
  },
];

export const categorias = ["Todos", ...Array.from(new Set(templates.map((t) => t.categoria)))];
