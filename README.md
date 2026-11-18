# Círculo de Quintas

App para estudar e praticar música no celular. Funciona no navegador e pode ser instalado na tela inicial (PWA), inclusive sem internet.

## O que tem

- **Círculo:** círculo de quintas interativo, campo harmônico de qualquer tom, progressões famosas (Popular e Igreja) tocadas com batidas e bateria, e o painel "Como tocar" com a forma de cada acorde.
- **Metrônomo:** pêndulo, contagem, tap tempo e bateria com vários ritmos (rock, blues, samba, bossa, sertanejo e outros).
- **Acordes:** 21 tipos de acorde (maiores, menores, sétimas, nonas, 11 e 13, suspensos, sextas e alterados) nas 12 notas, com busca ("Am7", "F#m", "C/E") e baixo trocado. Violão, baixo e teclado.
- **Afinador:** mede a nota pelo microfone, sem gravar nem enviar o áudio.

Os sons são gravações de instrumentos de verdade, baixadas só quando cada instrumento é usado.

## Como publicar

O app é um site estático (HTML, CSS e JavaScript, sem etapa de build). Basta publicar o conteúdo da raiz deste repositório, por exemplo no GitHub Pages.

Ao mudar qualquer arquivo do app, aumente a versão em `sw.js` (`const VERSION`), senão os aparelhos não baixam a atualização:

- **correção:** sobe o último número (v24.1.0 → v24.1.1);
- **recurso novo:** sobe o número do meio (v24.1.1 → v24.2.0);
- **mudança grande:** sobe o primeiro (v24.2.0 → v25.0.0).

Envie `index.html` e `sw.js` sempre juntos.

## Estrutura

| Pasta ou arquivo | O que é |
|---|---|
| `index.html` | O app inteiro (telas, estilo e código) |
| `sw.js` | Versão do app e funcionamento sem internet |
| `samples/` | Gravações de piano, violão e baixo |
| `drums/` | Gravações da bateria |
| `assets/` | Fontes e biblioteca de som |
| `licenses/`, `privacidade/`, `termos/` | Licenças, política de privacidade e termos de uso |

## Licenças e créditos

Todas as gravações de sons usadas (piano, violão, baixo e bateria) estão em domínio público (CC0). O sintetizador de reserva é Apache 2.0 e as fontes são SIL OFL. A lista completa, com autores e links, está em [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) e na página `licenses/` do app.

## Privacidade

O app não coleta nem envia dados pessoais. Veja a [política de privacidade](privacidade/index.html) e os [termos de uso](termos/index.html).

## Direitos

O código, o logo e os desenhos do Círculo de Quintas são de Saulo Dias. © 2026 Saulo Dias. Todos os direitos reservados. Os componentes de terceiros continuam sob as licenças de cada autor.
