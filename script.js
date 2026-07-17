const cfg = window.SITE_CONFIG || {};
const params = new URLSearchParams(location.search);

function checkoutWithUtm(url) {
  if (!url || url.startsWith('#')) return url || '#oferta';
  const target = new URL(url, location.href);
  params.forEach((value, key) => { if (key.toLowerCase().startsWith('utm_') || key === 'src') target.searchParams.set(key, value); });
  return target.href;
}

document.querySelectorAll('.checkout-link').forEach(link => link.href = checkoutWithUtm(cfg.checkoutUrl));
document.querySelectorAll('[data-price]').forEach(el => el.textContent = cfg.prices?.[el.dataset.price] || '[INSERIR PREÇO]');
document.getElementById('year').textContent = new Date().getFullYear();

const subjects = document.getElementById('subjects');
(cfg.subjects || []).forEach(([abbr, title, topic], i) => {
  const card = document.createElement('article');
  card.innerHTML = `<span>${abbr}</span><div><h3>${title}</h3><p>${topic}</p></div><b>0${i + 1}</b>`;
  subjects.append(card);
});

const faqData = [
  ["Para qual concurso o conteúdo é indicado?", "O escopo deve ser informado conforme o edital e o cargo efetivamente trabalhados. Confirme esta resposta antes da publicação."],
  ["O conteúdo acompanha o edital atual?", "As disciplinas e faixas devem ser revisadas e alinhadas ao edital escolhido. Consulte a descrição atual da oferta."],
  ["As músicas substituem um curso preparatório?", "Não. As músicas são uma ferramenta complementar. A preparação deve incluir estudo completo do edital, leitura, aulas, legislação, questões, simulados e outros recursos adequados."],
  ["Onde posso ouvir? Funciona no celular?", "A proposta é oferecer acesso pelo celular, tablet ou computador. Confirme requisitos e navegadores da plataforma antes da publicação."],
  ["Posso baixar ou ouvir offline?", "[DEFINIR REGRA REAL DE DOWNLOAD E ACESSO OFFLINE ANTES DE PUBLICAR]"],
  ["As letras ficam disponíveis?", "Sim, se esse recurso estiver efetivamente incluído na versão final da plataforma e da oferta."],
  ["O pagamento é mensal ou único?", "A página está preparada para planos mensal, anual e vitalício. Exiba apenas os planos e condições realmente disponíveis."],
  ["Como receberei o acesso?", "[INFORMAR FLUXO REAL DE ENTREGA DO ACESSO E PRAZO]"],
  ["Existe garantia?", "A oferta prevê 7 dias para avaliação, com reembolso conforme os termos da plataforma de pagamento."],
  ["O produto possui vínculo com a Polícia Federal?", "Não. Este é um produto educacional independente e não possui vínculo, parceria, autorização ou endosso da Polícia Federal."],
  ["Posso usar as faixas em aulas ou redes sociais?", "[INFORMAR A LICENÇA DE USO REAL E AS REGRAS DE DIREITOS AUTORAIS]"]
];
const faq = document.getElementById('faq-list');
faqData.forEach(([q, a], i) => {
  const item = document.createElement('div'); item.className = 'faq-item';
  item.innerHTML = `<h3><button aria-expanded="false" aria-controls="faq-${i}">${q}<span>＋</span></button></h3><div id="faq-${i}" class="faq-answer" hidden><p>${a}</p></div>`;
  faq.append(item);
});
faq.addEventListener('click', e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open)); btn.querySelector('span').textContent = open ? '＋' : '−';
  document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
});

const audioBtn = document.querySelector('.audio-btn');
if (cfg.audio?.src) {
  const audio = new Audio(cfg.audio.src);
  audioBtn.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
  audio.addEventListener('play', () => audioBtn.textContent = '❚❚');
  audio.addEventListener('pause', () => audioBtn.textContent = '▶');
} else {
  audioBtn.addEventListener('click', () => alert('Demonstração ainda não configurada. Adicione a URL oficial em config.js.'));
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
