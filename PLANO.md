# CODEX Tecnologia — Plano de implementação

Portfólio/vitrine de sites para empresas, de dois sócios. Mensagem central: **"Crie seu site da forma que você desejar. Veja alguns modelos."**

## 1. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SSG/ISR, SEO, `next/image`, deploy simples |
| Estilo | **Tailwind CSS v4 + tokens CSS** | Rápido, consistente; tokens já prototipados em `styles.css` |
| Componentes | **shadcn/ui (Radix)** | Acessíveis (foco, teclado), sem lock-in |
| Animação | **Motion (Framer Motion)** para UI, **GSAP** só na constelação do hero | Bundle menor; GSAP só onde precisa de timeline |
| Ícones | **Lucide** (SVG) | Sem emoji como ícone |
| Fontes | `next/font` — Space Grotesk + JetBrains Mono | Sem layout shift |
| Formulário | **React Hook Form + Zod** → Route Handler → **Resend** (e-mail) e link WhatsApp | Validação no cliente e no servidor |
| Conteúdo | Arquivo `data/templates.ts` (início); **MDX/Sanity** se os sócios quiserem editar sem código | Começa simples |
| Deploy | **Vercel** + domínio próprio | Preview por branch |
| Qualidade | ESLint, Prettier, Lighthouse CI, Playwright (smoke) | Meta: LCP < 2,5 s, CLS < 0,1 |

**Por que não backend/banco agora:** o site é vitrine. Um Route Handler para o contato basta. Banco só se virar painel de clientes.

## 2. Direção de design (skill ui-ux-pro-max)

> O script de busca da skill não rodou (Python ausente nesta máquina), então as decisões abaixo vêm das regras de prioridade da skill e das referências. Rode `search.py --design-system` depois de instalar Python para validar/persistir em `design-system/MASTER.md`.

- **Estilo:** dark, tech-editorial, inspirado na imagem de referência: cartões flutuando em órbita, ligados por linhas finas a um nó central, com rótulos de coordenadas em mono.
- **Cores:** fundo `#06070a`, texto `#f2f4f8`, acento vermelho `#ff4d4d` (borda vermelha da referência), destaque `#ffd166`.
- **Tipografia:** Space Grotesk (títulos/corpo) + JetBrains Mono (rótulos técnicos). Corpo 16px, line-height 1.6.
- **Regras aplicadas:** contraste ≥ 4.5:1, alvos ≥ 44px, foco visível, `prefers-reduced-motion`, mobile-first (a constelação vira grade de 2 colunas < 900px), reserva de espaço para evitar CLS, ícones SVG.
- **Referência Pinterest:** o link não pôde ser lido (Pinterest bloqueia leitura automática). Me envie uma imagem/print do pin e eu ajusto.

## 3. Estrutura de páginas

```
/                  Hero (constelação) · Biblioteca · Processo · Sócios · Contato
/modelos/[slug]    Página de demonstração de cada modelo (fase 2)
/contato           Formulário (ou seção na home)
```

Estrutura de pastas Next:

```
app/ (layout.tsx, page.tsx, modelos/[slug]/page.tsx, api/contato/route.ts)
components/ (Constellation, TemplateCard, MockPreview, ContactForm, ui/)
data/templates.ts
lib/ (utils, validation)
public/
```

## 4. Os 5 modelos de negócio

1. **Barbearia** — agendamento, serviços, galeria, equipe.
2. **Transportadora** — cotação de frete, rastreio, frota, área do cliente.
3. **Joalheria** — vitrine de coleções, catálogo, pedido por WhatsApp.
4. **Clínica Odontológica** — tratamentos, equipe, convênios, consulta.
5. **Restaurante** — cardápio, reservas, delivery, mapa.

Cada um ganha depois uma página `/modelos/[slug]` com demo completa.

## 5. Fases

| Fase | Entrega | Estado |
|---|---|---|
| 0 | Protótipo estático (`index.html`) para ver em tempo real no Live Server | **Feito** |
| 1 | Instalar Node 20+, criar projeto Next + Tailwind + shadcn, portar tokens e componentes | Pendente |
| 2 | Hero com constelação (GSAP), biblioteca com filtro, formulário + e-mail | Pendente |
| 3 | Páginas de demo dos 5 modelos, imagens reais (`next/image`, WebP/AVIF) | Pendente |
| 4 | SEO (metadata, sitemap, OG), analytics, Lighthouse, acessibilidade | Pendente |
| 5 | Deploy na Vercel + domínio | Pendente |

## 6. Como visualizar agora

1. VS Code → extensão **Live Server** → clique direito em `index.html` → *Open with Live Server*.
2. Edite `styles.css` / `script.js`; o navegador atualiza ao salvar.

## 7. Pendências

- Instalar **Node.js LTS** e **Python 3** (para a skill de design).
- Nomes e papéis reais dos sócios; logo; WhatsApp/e-mail de contato.
- Print do pin do Pinterest.
