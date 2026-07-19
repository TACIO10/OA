const cfg = window.SITE_CONFIG || {};
document.querySelector('.bonus-section')?.setAttribute('id', 'bonus');
const params = new URLSearchParams(location.search);
const icon = name => `<svg class="svg-icon" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;

function applySvgIcons() {
  document.querySelector('.topbar').innerHTML = `${icon('music')} Seu plano personalizado de músicas está pronto.`;
  document.querySelectorAll('.trust span').forEach((el, i) => { el.innerHTML = `${icon(['headphones','grid','bolt','shield-check'][i])} ${el.textContent.replace(/^[^\p{L}\p{N}]+/u, '')}`; });
  document.querySelectorAll('.four b').forEach((el, i) => { el.innerHTML = icon(['pin','clock','repeat','plus'][i]); });
  document.querySelectorAll('.panel-icon').forEach((el, i) => { el.innerHTML = icon(i ? 'check' : 'x'); });
  document.querySelectorAll('.moments article>span').forEach((el, i) => { el.innerHTML = icon(['car','dumbbell','walk','home','coffee','moon'][i]); });
  document.querySelector('.play-mini').innerHTML = icon('play');
  document.querySelector('.audio-btn').innerHTML = icon('play');
  const volumeLabel = document.querySelector('.volume'); volumeLabel.firstChild.textContent = ''; volumeLabel.insertAdjacentHTML('afterbegin', icon('volume'));
  document.querySelector('.demo-warning').innerHTML = `${icon('music')} Faixas de demonstração do produto.`;
  document.querySelectorAll('.feature-grid article>span').forEach((el, i) => { el.innerHTML = icon(['headphones','grid','repeat','devices','list','plus'][i]); });
  document.querySelector('.ui-feature span').innerHTML = icon('play');
  document.querySelectorAll('.content-cards article>span').forEach((el, i) => { el.innerHTML = icon(['music','play','list','grid','devices','help'][i]); });
  document.querySelectorAll('.testimonial-head small').forEach(el => { el.innerHTML = `${icon('pin')} ${el.textContent.replace(/^\s*📍\s*/, '')}`; });
  document.querySelectorAll('.stars').forEach(el => { el.innerHTML = Array.from({ length: 5 }, () => icon('star')).join(''); });
  document.querySelectorAll('.bonus-icon').forEach((el, i) => { el.innerHTML = icon(['planner','brain','users'][i]); });
  document.querySelectorAll('.value-items>div>span').forEach(el => { el.innerHTML = icon('check'); });
  document.querySelector('.secure').innerHTML = `${icon('lock')} Compra segura • Pagamento único • Acesso imediato • Garantia de 30 dias`;
  document.querySelector('.anchor-arrow').innerHTML = icon('arrow-down');
  document.querySelector('.to-top').innerHTML = icon('arrow-up');
}
applySvgIcons();

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
  ["O pagamento é mensal ou único?", "O pagamento é único, no valor de R$ 47,00. Não há mensalidade ou cobrança recorrente."],
  ["Como receberei o acesso?", "[INFORMAR FLUXO REAL DE ENTREGA DO ACESSO E PRAZO]"],
  ["Existe garantia?", "A oferta prevê 30 dias para avaliação, com reembolso conforme os termos da plataforma de pagamento."],
  ["O produto possui vínculo com a Polícia Federal?", "Não. Este é um produto educacional independente e não possui vínculo, parceria, autorização ou endosso da Polícia Federal."],
  ["Posso usar as faixas em aulas ou redes sociais?", "[INFORMAR A LICENÇA DE USO REAL E AS REGRAS DE DIREITOS AUTORAIS]"]
];
const faq = document.getElementById('faq-list');
faqData.forEach(([q, a], i) => {
  const item = document.createElement('div'); item.className = 'faq-item';
  item.innerHTML = `<h3><button aria-expanded="false" aria-controls="faq-${i}">${q}<span>${icon('plus')}</span></button></h3><div id="faq-${i}" class="faq-answer" hidden><p>${a}</p></div>`;
  faq.append(item);
});
faq.addEventListener('click', e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open)); btn.querySelector('span').innerHTML = icon(open ? 'plus' : 'x');
  document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
});

const audioBtn = document.querySelector('.audio-btn');
const tracks = cfg.audio?.tracks || [];
if (audioBtn && tracks.length) {
  const audio = new Audio();
  const title = document.querySelector('.track-main h3');
  const subject = document.querySelector('.track-main>p');
  const coverTitle = document.querySelector('.album-art span');
  const coverCode = document.querySelector('.album-art b');
  const progress = document.querySelector('.bar i');
  const progressBar = document.querySelector('.bar');
  const currentTime = document.querySelector('.current-time');
  const duration = document.querySelector('.duration');
  const volume = document.querySelector('.volume input');
  const trackButtons = [...document.querySelectorAll('.track-list button')];

  const formatTime = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}` : '--:--';
  const selectTrack = (index, autoplay = false) => {
    const track = tracks[index]; if (!track) return;
    audio.src = track.src; audio.load();
    title.textContent = track.title; subject.textContent = track.subject || 'Amostra da disciplina';
    coverTitle.innerHTML = track.title.replace(' ', '<br>'); coverCode.textContent = track.code || String(index + 1).padStart(2, '0');
    audioBtn.setAttribute('aria-label', `Tocar ${track.title}`);
    trackButtons.forEach((btn, i) => btn.classList.toggle('active', i === index));
    progress.style.width = '0%'; currentTime.textContent = '0:00'; duration.textContent = '--:--';
    if (autoplay) audio.play();
  };

  audio.volume = Number(volume.value);
  audioBtn.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
  trackButtons.forEach(btn => btn.addEventListener('click', () => selectTrack(Number(btn.dataset.track), true)));
  volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
  audio.addEventListener('play', () => { audioBtn.innerHTML = icon('pause'); audioBtn.setAttribute('aria-label', 'Pausar demonstração'); });
  audio.addEventListener('pause', () => { audioBtn.innerHTML = icon('play'); });
  audio.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = `${percent}%`; progressBar.setAttribute('aria-valuenow', Math.round(percent)); currentTime.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener('ended', () => { audioBtn.innerHTML = icon('play'); });
  progressBar.addEventListener('click', event => {
    if (!audio.duration) return; const rect = progressBar.getBoundingClientRect(); audio.currentTime = ((event.clientX - rect.left) / rect.width) * audio.duration;
  });
  selectTrack(0);
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
