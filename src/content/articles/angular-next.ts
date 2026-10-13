import type { Article } from '../site'

/**
 * Artigo: Angular e Next.js lado a lado.
 *
 * Os exemplos são genéricos, mas seguem o estilo dos projetos Angular reais
 * (standalone, inject(), signals, OnPush, rotas com lazy loading). Os fatos de
 * versão valem para abril de 2026: Angular 21 e Next.js 16.
 */

const NG_CARD = `@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly titulo = input.required<string>()
  readonly destaque = input(false)
  readonly fechar = output<void>()
}`

const NG_CARD_HTML = `<article class="card" [class.destaque]="destaque()">
  <header>
    <h2>{{ titulo() }}</h2>
    <button type="button" (click)="fechar.emit()">Fechar</button>
  </header>
  <ng-content />
</article>`

const NG_CARD_USE = `<app-card titulo="Resumo" [destaque]="true" (fechar)="ocultar()">
  <p>Este conteúdo é projetado dentro do card.</p>
</app-card>`

const REACT_CARD = `import type { ReactNode } from 'react'

type CardProps = {
  titulo: string
  destaque?: boolean
  onFechar: () => void
  children: ReactNode
}

export function Card({ titulo, destaque = false, onFechar, children }: CardProps) {
  return (
    <article className={destaque ? 'card card--destaque' : 'card'}>
      <header>
        <h2>{titulo}</h2>
        <button type="button" onClick={onFechar}>Fechar</button>
      </header>
      {children}
    </article>
  )
}`

const REACT_CARD_USE = `<Card titulo="Resumo" destaque onFechar={ocultar}>
  <p>Este conteúdo chega como children.</p>
</Card>`

const NG_API = `@Injectable({ providedIn: 'root' })
export class ProdutosApi {
  private readonly http = inject(HttpClient)

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>('/api/produtos')
  }
}`

const NG_PAGE = `@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutosPage {
  private readonly api = inject(ProdutosApi)

  protected readonly produtos = toSignal(this.api.listar(), { initialValue: [] })
  protected readonly busca = signal('')
  protected readonly filtrados = computed(() =>
    this.produtos().filter((p) =>
      p.nome.toLowerCase().includes(this.busca().toLowerCase()),
    ),
  )
}`

const NEXT_SERVER = `import { BotaoFavoritar } from './botao-favoritar'
import { buscarProduto } from '@/lib/produtos'

// Server Component: roda no servidor e pode ser async.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const produto = await buscarProduto(id)

  return (
    <main>
      <h1>{produto.nome}</h1>
      <BotaoFavoritar inicial={produto.favorito} />
    </main>
  )
}`

const NEXT_CLIENT = `'use client'

import { useState } from 'react'

// Client Component: tem estado e evento, então vai para o navegador.
export function BotaoFavoritar({ inicial }: { inicial: boolean }) {
  const [favorito, setFavorito] = useState(inicial)

  return (
    <button onClick={() => setFavorito(!favorito)}>
      {favorito ? 'Favoritado' : 'Favoritar'}
    </button>
  )
}`

const NEXT_FETCH = `export default async function Page() {
  const produtos = await buscarProdutos()

  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>{p.nome}</li>
      ))}
    </ul>
  )
}`

const REACT_FILTER = `'use client'

import { useMemo, useState } from 'react'

export function ListaProdutos({ produtos }: { produtos: Produto[] }) {
  const [busca, setBusca] = useState('')
  const filtrados = useMemo(
    () =>
      produtos.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()),
      ),
    [produtos, busca],
  )
  // ...
}`

const NG_ROUTES = `export const routes: Routes = [
  {
    path: 'produtos',
    canActivate: [autenticadoGuard],
    loadChildren: () =>
      import('./produtos/produtos.routes').then((m) => m.PRODUTOS_ROUTES),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./erro/nao-encontrada').then((m) => m.NaoEncontradaPage),
  },
]`

const NEXT_ROUTES = `app/
├── layout.tsx              → moldura de todas as páginas
├── page.tsx                → /
└── produtos/
    ├── page.tsx            → /produtos
    └── [id]/
        ├── page.tsx        → /produtos/:id
        └── loading.tsx     → estado de carregando da rota`

const NEXT_ROUTES_EN = `app/
├── layout.tsx              → frame for every page
├── page.tsx                → /
└── produtos/
    ├── page.tsx            → /produtos
    └── [id]/
        ├── page.tsx        → /produtos/:id
        └── loading.tsx     → the route's loading state`

const NG_FORM = `export class NovoProdutoPage {
  private readonly fb = inject(NonNullableFormBuilder)

  protected readonly form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(120)]],
    preco: [0, [Validators.required, Validators.min(0)]],
  })
}`

const NEXT_ACTION = `'use server'

export async function criarProduto(formData: FormData) {
  // Toda Server Function é um endpoint público:
  // valide e cheque permissão aqui, mesmo que o formulário já valide.
  const nome = String(formData.get('nome') ?? '').trim()
  if (!nome) throw new Error('Nome é obrigatório')

  // salvar, revalidar o cache…
}`

const NEXT_FORM = `<form action={criarProduto}>
  <input name="nome" required />
  <button type="submit">Salvar</button>
</form>`

export const angularNext: Article = {
  slug: 'angular-e-nextjs',
  date: '2026-04-14',
  tags: ['Angular', 'Next.js', 'React', 'Front-end'],

  title: {
    pt: 'Angular e Next.js: o que muda quando você trabalha nos dois',
    en: 'Angular and Next.js: what changes when you work with both',
  },
  lines: {
    pt: ['Angular e Next.js,', '*o que muda entre os dois.*'],
    en: ['Angular and Next.js,', '*what changes between them.*'],
  },
  lead: {
    pt: 'Trabalho com Angular em sistemas internos e com Next.js em produtos e páginas públicas. Aqui comparo os dois na prática, com código: componentes, onde o código roda, dados, reatividade, rotas e formulários. No fim, digo o que eu recomendo para cada caso.',
    en: 'I work with Angular on internal systems and with Next.js on products and public pages. Here I compare them in practice, with code: components, where the code runs, data, reactivity, routing and forms. At the end, I say what I recommend for each case.',
  },

  sources: [
    { title: 'What is Angular?', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/overview' },
    {
      title: 'Server and Client Components',
      by: { pt: 'Documentação do Next.js', en: 'Next.js docs' },
      url: 'https://nextjs.org/docs/app/getting-started/server-and-client-components',
    },
    { title: 'Server-side and hybrid rendering', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/ssr' },
    { title: 'Server Components', by: { pt: 'Documentação do React', en: 'React docs' }, url: 'https://react.dev/reference/rsc/server-components' },
    { title: 'Fetching Data', by: { pt: 'Documentação do Next.js', en: 'Next.js docs' }, url: 'https://nextjs.org/docs/app/getting-started/fetching-data' },
    { title: 'Signals', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/signals' },
    {
      title: 'What’s new in Angular 21.0?',
      by: { pt: 'Ninja Squad, novembro de 2025', en: 'Ninja Squad, November 2025' },
      url: 'https://blog.ninja-squad.com/2025/11/20/what-is-new-angular-21.0',
    },
    { title: 'Lazy loading routes', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/routing/lazy-loading' },
    { title: 'Proxy', by: { pt: 'Documentação do Next.js', en: 'Next.js docs' }, url: 'https://nextjs.org/docs/app/getting-started/proxy' },
    { title: 'Reactive forms', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/forms/reactive-forms' },
    { title: 'Mutating Data', by: { pt: 'Documentação do Next.js', en: 'Next.js docs' }, url: 'https://nextjs.org/docs/app/getting-started/mutating-data' },
    { title: 'Accepting data with input properties', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/components/inputs' },
    { title: 'Custom events with outputs', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/components/outputs' },
    { title: 'Content projection with ng-content', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/components/content-projection' },
    { title: 'Styling components', by: { pt: 'Documentação do Angular', en: 'Angular docs' }, url: 'https://angular.dev/guide/components/styling' },
    { title: 'Passing Props to a Component', by: { pt: 'Documentação do React', en: 'React docs' }, url: 'https://react.dev/learn/passing-props-to-a-component' },
  ],

  body: {
    pt: [
      {
        kind: 'p',
        text: 'Passo a semana alternando entre os dois. Sistemas administrativos, com muita tela de cadastro, tabela com filtro e formulário, saem em Angular. Produtos que precisam de SEO, páginas públicas e este site saem em Next.js. Os dois resolvem o mesmo problema, montar interface com TypeScript, mas partem de premissas diferentes. O que mais custa na troca é levar a premissa errada de um para o outro.',
      },

      { kind: 'h2', text: '1. Um framework completo e um framework sobre o React' },
      {
        kind: 'p',
        text: 'O Angular vem com quase tudo dentro: componentes, injeção de dependência, roteador, formulários, cliente HTTP, ferramentas de teste e uma CLI que gera e atualiza o projeto [1]. O Next.js é um framework em cima do React. Ele traz roteamento, renderização no servidor, cache e Server Functions, e deixa o resto para você escolher [2].',
      },
      {
        kind: 'diagram',
        name: 'ng-next-caixa',
        caption: 'O que cada um traz pronto. No Next.js, a parte tracejada é decisão do time.',
      },
      {
        kind: 'p',
        text: 'Na prática, um projeto Angular novo se parece com qualquer outro projeto Angular. Em Next.js, dois projetos podem ter escolhas completamente diferentes de estado, formulário e busca de dados. Isso dá liberdade, mas cobra combinado: no Next, as convenções do time precisam estar escritas, porque o framework não as impõe.',
      },

      { kind: 'h2', text: '2. Componentização' },
      {
        kind: 'p',
        text: 'Os dois são orientados a componentes, mas o que é um componente muda bastante. No Angular, um componente é uma classe com um decorador, um template HTML e estilos próprios. Ele recebe dados por `input()` [12], avisa o pai por `output()` [13] e recebe conteúdo de fora pelo `<ng-content>` [14]. Os estilos ficam presos ao componente por padrão: o CSS dele não vaza para o resto da página [15].',
      },
      { kind: 'code', file: 'card.ts', text: NG_CARD },
      { kind: 'code', file: 'card.html', text: NG_CARD_HTML },
      { kind: 'code', file: 'uso no template do pai', lang: 'html', text: NG_CARD_USE },
      {
        kind: 'p',
        text: 'No React, um componente é uma função que recebe props e devolve JSX. Não tem decorador nem arquivo de template separado, evento é só uma função passada como prop, e o conteúdo de dentro chega pela prop `children` [16]:',
      },
      { kind: 'code', file: 'card.tsx', text: REACT_CARD },
      { kind: 'code', file: 'uso no componente pai', lang: 'tsx', text: REACT_CARD_USE },
      {
        kind: 'p',
        text: 'A diferença de verdade aparece no resto. No Angular, cada tipo de reuso tem o seu bloco: componente para interface, diretiva para comportamento num elemento, pipe para formatar valor e serviço para lógica e estado compartilhado. No React, é tudo função: lógica reaproveitável vira um hook, variação de interface vira prop ou composição, e o estilo é escolha sua, seja CSS Modules, Tailwind ou CSS puro.',
      },
      {
        kind: 'p',
        text: 'Por isso o React, e o Next.js em cima dele, é bem mais customizável. Dá para montar a arquitetura do jeito que o projeto pede, com as bibliotecas que o time preferir. O Angular troca essa liberdade por padrão: menos decisões para tomar e um projeto que todo mundo do time lê do mesmo jeito. Nenhum dos dois é melhor por isso. São apostas diferentes.',
      },

      { kind: 'h2', text: '3. Onde o código roda' },
      {
        kind: 'p',
        text: 'Esta é a maior diferença, e a que mais confunde. Uma aplicação Angular é, por padrão, uma SPA: o navegador baixa o JavaScript e tudo roda nele. O SSR existe e funciona bem, mas é uma escolha que você adiciona com `ng add @angular/ssr` [3].',
      },
      {
        kind: 'p',
        text: 'No App Router do Next.js é o contrário: páginas e layouts são Server Components por padrão [2]. Eles rodam no servidor, podem acessar banco e segredos e não mandam o próprio código para o navegador. Só vira código de navegador o que você marca com `\'use client\'` [4].',
      },
      {
        kind: 'diagram',
        name: 'ng-next-fronteira',
        caption: 'Onde o código roda. No Next.js, a fronteira entre servidor e navegador é marcada no código.',
      },
      { kind: 'code', file: 'app/produtos/[id]/page.tsx', text: NEXT_SERVER },
      { kind: 'code', file: 'app/produtos/[id]/botao-favoritar.tsx', text: NEXT_CLIENT },
      {
        kind: 'p',
        text: 'A regra que eu sigo: começo tudo como Server Component e só levo para o cliente o pedaço que precisa de estado, evento ou API do navegador. Quanto menor a ilha de `\'use client\'`, menos JavaScript a página manda [2]. Um detalhe que pega quem vem de versões antigas: desde o Next.js 15, `params` é uma Promise e precisa de `await`.',
      },

      { kind: 'h2', text: '4. Buscar dados' },
      {
        kind: 'p',
        text: 'No Angular, a busca de dados mora num serviço injetável, com o `HttpClient` devolvendo um Observable. O componente pede o serviço com `inject()` e transforma o resultado em signal para usar no template:',
      },
      { kind: 'code', file: 'produtos.api.ts', text: NG_API },
      { kind: 'code', file: 'produtos.ts', text: NG_PAGE },
      {
        kind: 'p',
        text: 'No Next.js, num Server Component, buscar dado é só `await`. Não tem `useEffect` nem estado de carregamento escrito à mão: o componente é uma função assíncrona e o Next cuida do streaming [5]. Separar a busca numa camada própria continua sendo boa prática, mas é uma decisão sua, não do framework.',
      },
      { kind: 'code', file: 'app/produtos/page.tsx', text: NEXT_FETCH },

      { kind: 'h2', text: '5. Reatividade: signals e re-render' },
      {
        kind: 'p',
        text: 'O Angular moderno é construído em cima de signals. Um signal é um valor que avisa quem depende dele quando muda, e um `computed` deriva de outros signals: só calcula quando é lido e guarda o resultado até uma dependência mudar [6]. No Angular 21, projetos novos já nem incluem o zone.js; a atualização da tela é guiada pelos signals [7].',
      },
      {
        kind: 'p',
        text: 'No React, a unidade é o componente: quando o estado muda, a função do componente roda de novo e o React compara o resultado. O mesmo filtro do exemplo acima fica assim:',
      },
      { kind: 'code', file: 'lista-produtos.tsx', text: REACT_FILTER },
      {
        kind: 'p',
        text: 'O que muda na cabeça: no Angular eu penso em quais valores dependem de quais; no React, em quando o componente renderiza e no que precisa ser memorizado. Esquecer uma dependência no array do `useMemo` é o erro clássico de quem vem do Angular. Ler um signal fora de um contexto reativo e esperar que ele se atualize é o erro clássico de quem faz o caminho inverso.',
      },

      { kind: 'h2', text: '6. Rotas' },
      {
        kind: 'p',
        text: 'No Angular, as rotas são um array de configuração, com guard e lazy loading declarados por rota [8]:',
      },
      { kind: 'code', file: 'app.routes.ts', text: NG_ROUTES },
      {
        kind: 'p',
        text: 'No Next.js, a rota é a pasta. `app/produtos/[id]/page.tsx` já é a rota `/produtos/:id`, e arquivos com nome reservado, como `layout.tsx` e `loading.tsx`, cuidam da moldura e do estado de carregamento:',
      },
      { kind: 'code', file: 'estrutura de pastas', lang: 'tree', text: NEXT_ROUTES },
      {
        kind: 'p',
        text: 'Não existe um equivalente direto do guard. A checagem de acesso acontece no servidor, na página, no layout ou na Server Function, e redirecionamentos gerais ficam no proxy, que é o antigo middleware renomeado no Next.js 16 [9].',
      },

      { kind: 'h2', text: '7. Formulários' },
      {
        kind: 'p',
        text: 'Formulário é onde o Angular mais brilha nos sistemas que eu faço. Os Reactive Forms vêm no framework, com validação, estado de campo tocado e alterado, e tipagem [10]:',
      },
      { kind: 'code', file: 'novo-produto.ts', text: NG_FORM },
      {
        kind: 'p',
        text: 'No Next.js, o caminho nativo é o formulário HTML chamando uma Server Function pelo `action`. O dado vai direto para o servidor e chega como `FormData` [11]. Para validação mais rica no cliente, entra uma biblioteca de sua escolha.',
      },
      { kind: 'code', file: 'app/produtos/actions.ts', text: NEXT_ACTION },
      { kind: 'code', file: 'app/produtos/novo/page.tsx', text: NEXT_FORM },
      {
        kind: 'note',
        text: 'O Angular 21 trouxe os Signal Forms, ainda experimentais [7]. Nos projetos em produção, continuo com os Reactive Forms até a API estabilizar.',
      },

      { kind: 'h2', text: 'O que eu recomendo' },
      {
        kind: 'p',
        text: 'Esta parte é opinião minha, depois de usar os dois em produção:',
      },
      {
        kind: 'list',
        items: [
          '**Para sistema interno grande, eu recomendo Angular.** Muitas telas de cadastro, muito formulário, time grande ou rotativo: a estrutura imposta faz um projeto se parecer com o outro, e quem entra no time acha as coisas onde espera. Só os Reactive Forms já pagam a escolha.',
          '**Para produto, página pública e tudo que depende de SEO, eu recomendo Next.js.** Renderizar no servidor por padrão deixa a página rápida sem esforço extra, e a liberdade do React permite montar exatamente a interface que o produto pede.',
          '**Se o time quer flexibilidade, Next.js; se precisa de padrão, Angular.** A customização do React é ótima quando alguém cuida das convenções. Sem isso, cada parte do projeto acaba com um estilo diferente.',
          '**Na dúvida, escolha o que o time já domina.** Os dois atendem bem a maioria dos casos, e a curva de aprendizado custa mais do que qualquer diferença de recurso.',
        ],
      },

      { kind: 'h2', text: 'O que levo de um para o outro' },
      {
        kind: 'p',
        text: 'Do Angular para o Next, levo a separação da busca de dados em funções próprias, mesmo sem o framework exigir, e a tipagem forte nas bordas. Do Next para o Angular, levo a pergunta "isso precisa mesmo rodar no navegador?" e a disposição de ligar o SSR quando a página é pública.',
      },
      {
        kind: 'p',
        text: 'E dos dois, uma tendência: signals de um lado e Server Components do outro estão empurrando os frameworks na mesma direção, com menos trabalho escondido e mais clareza sobre o que reage a quê e onde cada coisa roda. Quem entende essas duas ideias troca de um para o outro sem sofrer.',
      },
    ],

    en: [
      {
        kind: 'p',
        text: 'I spend the week switching between the two. Admin systems, with lots of data-entry screens, filtered tables and forms, are built in Angular. Products that need SEO, public pages and this site are built in Next.js. Both solve the same problem, building interfaces with TypeScript, but start from different assumptions. What costs the most when switching is carrying the wrong assumption from one to the other.',
      },

      { kind: 'h2', text: '1. A complete framework and a framework on top of React' },
      {
        kind: 'p',
        text: 'Angular ships with almost everything: components, dependency injection, a router, forms, an HTTP client, testing tools and a CLI that generates and updates the project [1]. Next.js is a framework on top of React. It brings routing, server rendering, caching and Server Functions, and leaves the rest up to you [2].',
      },
      {
        kind: 'diagram',
        name: 'ng-next-caixa',
        caption: 'What each one ships with. In Next.js, the dashed part is the team’s decision.',
      },
      {
        kind: 'p',
        text: 'In practice, a new Angular project looks like any other Angular project. In Next.js, two projects can make completely different choices for state, forms and data fetching. That is freedom, but it demands agreement: in Next, team conventions have to be written down, because the framework does not enforce them.',
      },

      { kind: 'h2', text: '2. Components' },
      {
        kind: 'p',
        text: 'Both are component-based, but what a component is differs a lot. In Angular, a component is a class with a decorator, an HTML template and its own styles. It receives data through `input()` [12], notifies its parent through `output()` [13] and receives content from outside through `<ng-content>` [14]. Styles are scoped to the component by default: its CSS does not leak into the rest of the page [15].',
      },
      { kind: 'code', file: 'card.ts', text: NG_CARD },
      { kind: 'code', file: 'card.html', text: NG_CARD_HTML },
      { kind: 'code', file: 'usage in the parent template', lang: 'html', text: NG_CARD_USE },
      {
        kind: 'p',
        text: 'In React, a component is a function that takes props and returns JSX. No decorator, no separate template file, an event is just a function passed as a prop, and inner content arrives through the `children` prop [16]:',
      },
      { kind: 'code', file: 'card.tsx', text: REACT_CARD },
      { kind: 'code', file: 'usage in the parent component', lang: 'tsx', text: REACT_CARD_USE },
      {
        kind: 'p',
        text: 'The real difference shows up in everything else. In Angular, each kind of reuse has its own building block: a component for UI, a directive for behavior on an element, a pipe for formatting values and a service for shared logic and state. In React, everything is a function: reusable logic becomes a hook, UI variation becomes a prop or composition, and styling is your call, whether CSS Modules, Tailwind or plain CSS.',
      },
      {
        kind: 'p',
        text: 'That is why React, and Next.js on top of it, is far more customizable. You can shape the architecture the way the project needs, with the libraries the team prefers. Angular trades that freedom for convention: fewer decisions to make and a project everyone on the team reads the same way. Neither is better because of it. They are different bets.',
      },

      { kind: 'h2', text: '3. Where the code runs' },
      {
        kind: 'p',
        text: 'This is the biggest difference, and the most confusing one. An Angular app is a SPA by default: the browser downloads the JavaScript and everything runs there. SSR exists and works well, but it is something you add with `ng add @angular/ssr` [3].',
      },
      {
        kind: 'p',
        text: 'The Next.js App Router is the opposite: pages and layouts are Server Components by default [2]. They run on the server, can reach the database and secrets, and ship none of their own code to the browser. Only what you mark with `\'use client\'` becomes browser code [4].',
      },
      {
        kind: 'diagram',
        name: 'ng-next-fronteira',
        caption: 'Where the code runs. In Next.js, the server/browser boundary is marked in the code.',
      },
      { kind: 'code', file: 'app/produtos/[id]/page.tsx', text: NEXT_SERVER },
      { kind: 'code', file: 'app/produtos/[id]/botao-favoritar.tsx', text: NEXT_CLIENT },
      {
        kind: 'p',
        text: 'My rule: start everything as a Server Component and move to the client only the piece that needs state, events or browser APIs. The smaller the `\'use client\'` island, the less JavaScript the page ships [2]. One detail that trips up people coming from older versions: since Next.js 15, `params` is a Promise and has to be awaited.',
      },

      { kind: 'h2', text: '4. Fetching data' },
      {
        kind: 'p',
        text: 'In Angular, data fetching lives in an injectable service, with `HttpClient` returning an Observable. The component asks for the service with `inject()` and turns the result into a signal for the template:',
      },
      { kind: 'code', file: 'produtos.api.ts', text: NG_API },
      { kind: 'code', file: 'produtos.ts', text: NG_PAGE },
      {
        kind: 'p',
        text: 'In Next.js, inside a Server Component, fetching data is just `await`. No `useEffect`, no hand-written loading state: the component is an async function and Next handles the streaming [5]. Keeping data access in its own layer is still good practice, but it is your decision, not the framework’s.',
      },
      { kind: 'code', file: 'app/produtos/page.tsx', text: NEXT_FETCH },

      { kind: 'h2', text: '5. Reactivity: signals and re-renders' },
      {
        kind: 'p',
        text: 'Modern Angular is built on signals. A signal is a value that notifies whoever depends on it when it changes, and a `computed` derives from other signals: it only calculates when read and caches the result until a dependency changes [6]. In Angular 21, new projects do not even include zone.js anymore; screen updates are driven by signals [7].',
      },
      {
        kind: 'p',
        text: 'In React, the unit is the component: when state changes, the component function runs again and React diffs the result. The same filter from the example above looks like this:',
      },
      { kind: 'code', file: 'lista-produtos.tsx', text: REACT_FILTER },
      {
        kind: 'p',
        text: 'What changes in your head: in Angular I think about which values depend on which; in React, about when the component renders and what needs to be memoized. Forgetting a dependency in the `useMemo` array is the classic mistake of someone coming from Angular. Reading a signal outside a reactive context and expecting it to update is the classic mistake going the other way.',
      },

      { kind: 'h2', text: '6. Routing' },
      {
        kind: 'p',
        text: 'In Angular, routes are a configuration array, with guards and lazy loading declared per route [8]:',
      },
      { kind: 'code', file: 'app.routes.ts', text: NG_ROUTES },
      {
        kind: 'p',
        text: 'In Next.js, the route is the folder. `app/produtos/[id]/page.tsx` already is the `/produtos/:id` route, and files with reserved names, like `layout.tsx` and `loading.tsx`, handle the frame and the loading state:',
      },
      { kind: 'code', file: 'folder structure', lang: 'tree', text: NEXT_ROUTES_EN },
      {
        kind: 'p',
        text: 'There is no direct equivalent of a guard. Access checks happen on the server, in the page, the layout or the Server Function, and app-wide redirects live in the proxy, which is the old middleware renamed in Next.js 16 [9].',
      },

      { kind: 'h2', text: '7. Forms' },
      {
        kind: 'p',
        text: 'Forms are where Angular shines most in the systems I build. Reactive Forms come with the framework, with validation, touched and dirty state, and typing [10]:',
      },
      { kind: 'code', file: 'novo-produto.ts', text: NG_FORM },
      {
        kind: 'p',
        text: 'In Next.js, the native path is an HTML form calling a Server Function through `action`. The data goes straight to the server and arrives as `FormData` [11]. For richer client-side validation, a library of your choice comes in.',
      },
      { kind: 'code', file: 'app/produtos/actions.ts', text: NEXT_ACTION },
      { kind: 'code', file: 'app/produtos/novo/page.tsx', text: NEXT_FORM },
      {
        kind: 'note',
        text: 'Angular 21 introduced Signal Forms, still experimental [7]. In production projects, I am sticking with Reactive Forms until the API stabilizes.',
      },

      { kind: 'h2', text: 'What I recommend' },
      {
        kind: 'p',
        text: 'This part is my opinion, after using both in production:',
      },
      {
        kind: 'list',
        items: [
          '**For a large internal system, I recommend Angular.** Many data-entry screens, lots of forms, a large or rotating team: the enforced structure makes one project look like the next, and newcomers find things where they expect them. Reactive Forms alone pay for the choice.',
          '**For products, public pages and anything that depends on SEO, I recommend Next.js.** Rendering on the server by default makes the page fast with no extra effort, and React’s freedom lets you build exactly the interface the product needs.',
          '**If the team wants flexibility, Next.js; if it needs convention, Angular.** React’s customizability is great when someone owns the conventions. Without that, every part of the project ends up with a different style.',
          '**When in doubt, pick what the team already knows.** Both handle most cases well, and the learning curve costs more than any feature difference.',
        ],
      },

      { kind: 'h2', text: 'What I carry from one to the other' },
      {
        kind: 'p',
        text: 'From Angular to Next, I carry the habit of putting data fetching in its own functions, even when the framework does not require it, and strong typing at the edges. From Next to Angular, I carry the question "does this really need to run in the browser?" and the willingness to turn on SSR when the page is public.',
      },
      {
        kind: 'p',
        text: 'And from both, a trend: signals on one side and Server Components on the other are pushing the frameworks in the same direction, with less hidden work and more clarity about what reacts to what and where each thing runs. Whoever understands those two ideas switches between them without pain.',
      },
    ],
  },
}
