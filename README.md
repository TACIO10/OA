# Operação Aprovação — landing page

Landing page estática em HTML, CSS e JavaScript, pronta para GitHub Pages.

## Personalização antes da publicação

1. Abra `config.js` e informe o link real do checkout, preços, matérias e URL do áudio.
2. Remova planos que não existirem e textos marcados entre colchetes.
3. Substitua os espaços de depoimentos somente por relatos reais e autorizados.
4. Atualize e-mail, Termos de Uso e Política de Privacidade no rodapé.
5. Insira Pixel da Meta e UTMify apenas com IDs reais nos pontos comentados de `index.html`.
6. Valide edital, cargo, disciplinas, licença das faixas e regras comerciais.

Os links de checkout preservam automaticamente parâmetros `utm_*` e `src` presentes na URL.

## Áudio

Informe a URL do MP3 em `SITE_CONFIG.audio.src`. Sem URL, o player exibe um aviso e não inventa reprodução.

## Publicação

Sirva a pasta como site estático ou publique diretamente pelo GitHub Pages. Para teste local: `python -m http.server 4173`.
