# Portfólio — Genilton Silva

Site pessoal em **Next.js 16 + TypeScript**, bilíngue (PT/EN), com tema claro/escuro.

A linguagem visual segue a gramática do [pleurat.com](https://www.pleurat.com/):
papel pautado, folha com bordas e cantos em âmbar, abas de seção, títulos em dois
tons, rótulos em versal com entreletra larga, placa com barra de título e barras
hachuradas. A seção de projetos usa a apresentação do
[gionatannese.com](https://www.gionatannese.com/) — número, nome grande, categoria
e o parágrafo que explica o projeto.

O CSS, os componentes, os desenhos em SVG e os textos são próprios. A fonte é a
General Sans (Indian Type Foundry, licença livre para web), auto-hospedada em
`src/fonts`.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (tudo estático)
npm start          # servir o build
```

## ⚠️ O que você precisa trocar

Todo o conteúdo está em **um arquivo só**: `src/content/site.ts`.

| Onde | O quê |
| --- | --- |
| `person.since` | Ano em que começou a programar (alimenta o "X anos programando") |
| `projects` | **Os 5 projetos são exemplos.** Troque nome, descrição, stack, ano e links |
| `explorations` | **Os 5 estudos são exemplos.** Troque pelos seus |
| `about.timeline` | **A trajetória é exemplo.** Ponha empresas e períodos reais |
| `src/app/layout.tsx` | `metadataBase` está com `genilton.dev` — troque pelo domínio final |

Cada campo `{ pt, en }` é bilíngue e o site troca conforme o seletor PT/EN do topo.
Se não quiser traduzir algo agora, repita o mesmo texto nos dois.

### Imagens dos projetos

As imagens em `public/work/*.svg` são **placeholders gerados** — mockups abstratos,
não são telas reais. Substitua por capturas dos seus projetos (`.png`, `.jpg` ou
`.webp`, proporção 16:9, ~1600×900) e aponte `image` no `site.ts` para o arquivo novo:

```ts
image: '/work/meu-projeto.png',
```

## Estrutura

```
src/
├── app/                    rotas (App Router)
│   ├── page.tsx            home
│   ├── work/               lista + /work/[slug] (páginas de projeto, geradas do site.ts)
│   ├── about/  contact/
│   └── globals.css         todo o CSS do site, em blocos comentados
├── components/
│   ├── ProjectList.tsx     projetos à moda do gionatannese + miniatura no cursor
│   ├── Explorations.tsx    lista enxuta de estudos
│   ├── Plate.tsx           placa com barra âmbar, trilhas e terminal que digita
│   ├── HatchBars.tsx       barras hachuradas da seção "em números"
│   ├── ToolStrip.tsx       faixa de ferramentas em traço de placa de circuito
│   ├── TwoTone.tsx         título em dois tempos (`*trecho*` sai apagado)
│   ├── Nav.tsx  Footer.tsx  Reveal.tsx  Icons.tsx
│   └── views/              o conteúdo de cada página (client components)
├── content/site.ts         👈 TODO O CONTEÚDO
├── fonts/                  General Sans (.woff2), auto-hospedada
└── i18n/                   dicionário de interface + provedor de idioma
```

### Peças da linguagem visual

**A folha** (`.sheet`) — tudo mora dentro de uma folha centrada, com papel um
pouco mais claro que a margem, pauta mais discreta, fio vertical de cada lado e
cantos em L âmbar. Abaixo de 860px a folha ocupa a largura toda e perde as bordas.

**Aba de seção** (`.tab`) — retângulo âmbar pendurado na borda de cima de cada
`.sec`, com um canto em L no vértice oposto.

**Título em dois tempos** — a frase começa firme e termina no tom apagado. Escreva
`*assim*` no `site.ts` e o `TwoTone` cuida do resto.

**Placa** (`Plate`) — barra de título âmbar, lista de trilhas à esquerda e um
terminal que datilografa as linhas. Cada trilha tem a própria sessão, definida
em `tracks` no `site.ts`.

## Publicar

O build é 100% estático. Na [Vercel](https://vercel.com): importe o repositório e
aceite os padrões — não há variável de ambiente nem backend.

## Ajustes rápidos

| Quero | Onde |
| --- | --- |
| Trocar a cor de destaque | `--accent` / `--accent-2` no topo de `globals.css` (tema escuro e claro separados) |
| Mudar textos de interface (botões, rótulos) | `src/i18n/dict.ts` |
| Tirar o seletor de idioma | remova `<LangToggle />` de `src/components/Nav.tsx` |
| Mudar a cor da pauta do papel | `--rule` e `--rule-edge` em `globals.css` |
| Começar no tema escuro | `themeScript` em `src/app/layout.tsx` |
| Mudar as sessões do terminal | `tracks` em `src/content/site.ts` |
