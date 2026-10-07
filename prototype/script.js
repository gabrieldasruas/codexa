// Dados dos 5 modelos de negócio (no Next.js viram data/templates.ts)
const TEMPLATES = [
  { id: 'barbearia', nome: 'Barbearia', cat: 'Beleza',
    desc: 'Agendamento online, tabela de serviços, galeria de cortes e equipe de barbeiros.',
    tags: ['Agendamento', 'Galeria', 'WhatsApp'], c: ['#121212', '#c9a24b', '#f5efe2'] },
  { id: 'transportadora', nome: 'Transportadora', cat: 'Logística',
    desc: 'Cotação de frete, rastreio de encomendas, rotas atendidas e área do cliente.',
    tags: ['Cotação', 'Rastreio', 'Frota'], c: ['#0b1f3a', '#ff7a1a', '#ffffff'] },
  { id: 'joalheria', nome: 'Joalheria', cat: 'Varejo',
    desc: 'Vitrine elegante de coleções, catálogo com pedido por WhatsApp e atendimento personalizado.',
    tags: ['Catálogo', 'Coleções', 'Sob encomenda'], c: ['#16130f', '#d8b97a', '#faf6ee'] },
  { id: 'clinica', nome: 'Clínica Odontológica', cat: 'Saúde',
    desc: 'Tratamentos, equipe, antes e depois, convênios e marcação de consulta.',
    tags: ['Consultas', 'Convênios', 'Depoimentos'], c: ['#f4fbfb', '#12a3a3', '#0b2a2a'] },
  { id: 'restaurante', nome: 'Restaurante', cat: 'Alimentação',
    desc: 'Cardápio digital, reservas, pedidos por delivery e localização com mapa.',
    tags: ['Cardápio', 'Reservas', 'Delivery'], c: ['#1c0f0a', '#e5533d', '#fff3e6'] },
];

const $ = (s, el = document) => el.querySelector(s);
const mockHTML = (t) => `
  <div class="mock" style="--c1:${t.c[0]};--c2:${t.c[1]};--c3:${t.c[2]}" aria-hidden="true">
    <div class="bar"><b></b><s></s><s></s><s></s></div>
    <i class="h"></i><i class="t1"></i><i class="t2"></i><i class="btnm"></i>
    <div class="row"><i></i><i></i><i></i></div>
  </div>`;

/* ---------- Constelação (hero) ---------- */
const stage = $('#constellation');
const linesSvg = $('#lines');
const hub = $('#hub');
const SLOTS = [ // posição em % (x, y) ao redor do hub, estilo da referência
  { x: 20, y: 22, w: 150 }, { x: 78, y: 18, w: 140 }, { x: 86, y: 62, w: 150 },
  { x: 50, y: 86, w: 140 }, { x: 14, y: 68, w: 150 },
];
const nodes = [];

function buildNodes() {
  TEMPLATES.forEach((t, i) => {
    const s = SLOTS[i];
    const b = document.createElement('button');
    b.className = 'node';
    b.type = 'button';
    b.dataset.id = t.id;
    b.style.cssText = `left:${s.x}%;top:${s.y}%;--w:${s.w}px;--d:${-i * 1.3}s`;
    b.setAttribute('aria-label', `Ver modelo ${t.nome}`);
    b.innerHTML = `${mockHTML(t)}<span class="name">${t.nome}</span><span class="coord">x: ${Math.round(s.x * 38)} y: ${Math.round(s.y * 24)}</span>`;
    b.addEventListener('mouseenter', () => highlight(t.id, true));
    b.addEventListener('mouseleave', () => highlight(t.id, false));
    b.addEventListener('focus', () => highlight(t.id, true));
    b.addEventListener('blur', () => highlight(t.id, false));
    b.addEventListener('click', () => goTo(t.id));
    stage.appendChild(b);
    nodes.push(b);
  });
}

function drawLines() {
  if (getComputedStyle(hub).display === 'none') return;
  const r = stage.getBoundingClientRect();
  linesSvg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
  const cx = r.width / 2, cy = r.height / 2;
  linesSvg.innerHTML = '';
  nodes.forEach((n, i) => {
    const nr = n.getBoundingClientRect();
    const x = nr.left - r.left + nr.width / 2, y = nr.top - r.top + nr.height / 2;
    const mx = (cx + x) / 2 + (cy - y) * 0.18, my = (cy + y) / 2 + (x - cx) * 0.18; // curva suave
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', `M${cx},${cy} Q${mx},${my} ${x},${y}`);
    p.dataset.id = n.dataset.id;
    p.style.animationDelay = `${i * 0.12}s`;
    linesSvg.appendChild(p);
  });
}

function highlight(id, on) {
  const p = linesSvg.querySelector(`path[data-id="${id}"]`);
  if (p) p.classList.toggle('on', on);
}

// Parallax leve com o mouse (desligado com reduced-motion)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
    nodes.forEach((n, i) => {
      const k = 10 + i * 3;
      n.style.setProperty('--px', `${dx * k}px`);
      n.style.setProperty('--py', `${dy * k}px`);
    });
  });
}

/* ---------- Biblioteca ---------- */
const grid = $('#grid');
const chipsEl = $('#chips');
const cats = ['Todos', ...new Set(TEMPLATES.map((t) => t.cat))];
let active = 'Todos';

function renderChips() {
  chipsEl.innerHTML = cats.map((c) => `<button class="chip" type="button" aria-pressed="${c === active}" data-cat="${c}">${c}</button>`).join('');
}
function renderGrid() {
  grid.innerHTML = TEMPLATES.filter((t) => active === 'Todos' || t.cat === active).map((t) => `
    <article class="card" id="m-${t.id}">
      ${mockHTML(t)}
      <div class="body">
        <h3>${t.nome}</h3>
        <p>${t.desc}</p>
        <div class="tags">${t.tags.map((x) => `<span>${x}</span>`).join('')}</div>
        <a class="btn btn-sm" href="#contato" data-pick="${t.id}">Quero este modelo</a>
      </div>
    </article>`).join('');
}
chipsEl.addEventListener('click', (e) => {
  const b = e.target.closest('.chip'); if (!b) return;
  active = b.dataset.cat; renderChips(); renderGrid();
});
grid.addEventListener('click', (e) => {
  const a = e.target.closest('[data-pick]'); if (a) $('#modelo-select').value = a.dataset.pick;
});

function goTo(id) {
  active = 'Todos'; renderChips(); renderGrid();
  const card = $(`#m-${id}`);
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('on');
  setTimeout(() => card.classList.remove('on'), 1800);
}

/* ---------- Formulário ---------- */
$('#modelo-select').innerHTML = `<option value="">Ainda não sei</option>` +
  TEMPLATES.map((t) => `<option value="${t.id}">${t.nome}</option>`).join('') +
  `<option value="outro">Outro (do zero)</option>`;

$('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target, note = $('#form-note');
  if (!f.nome.value.trim() || !f.contato.value.trim()) { note.textContent = 'Preencha nome e contato para continuar.'; return; }
  note.textContent = 'Pedido registrado (protótipo). Em breve conectamos ao e-mail/WhatsApp.';
  f.reset();
});

$('#year').textContent = new Date().getFullYear();

/* ---------- Init ---------- */
buildNodes(); renderChips(); renderGrid();
requestAnimationFrame(drawLines);
addEventListener('resize', drawLines);
