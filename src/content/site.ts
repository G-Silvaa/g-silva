/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTEÚDO DO SITE — edite APENAS este arquivo para trocar textos e projetos.
 *  Todo campo `{ pt, en }` é bilíngue: o site troca conforme o seletor PT/EN.
 *
 *  ⚠️  OS 5 PROJETOS E AS 5 "EXPLORATIONS" ABAIXO SÃO EXEMPLOS.
 *      Troque nome, descrição, stack e links pelos seus projetos reais.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Locale = 'pt' | 'en'

/** Texto bilíngue. */
export type T = { pt: string; en: string }

export interface Project {
  slug: string
  name: string
  year: string
  kind: T
  lead: T
  /** Parágrafo maior, aparece no arquivo e na ficha aberta. */
  body: T
  stack: string[]
  image: string
  live?: string
  repo?: string
}

export interface Exploration {
  name: string
  kind: T
  note: T
  href?: string
}

/* ── Identidade ───────────────────────────────────────────────────────────── */

export const person = {
  name: 'Genilton Silva',
  monogram: 'GS',
  role: {
    pt: 'Desenvolvedor Full-Stack',
    en: 'Full-Stack Developer',
  } as T,
  location: { pt: 'Brasil', en: 'Brazil' } as T,
  /** ⚠️ Troque se preferir outro endereço público. */
  email: 'aglissilva17@gmail.com',
  linkedin: 'https://www.linkedin.com/in/genilton-silva-974705204/',
  /** ⚠️ Coloque seu usuário do GitHub aqui. */
  github: 'https://github.com/',
  /** Ano em que começou a programar — alimenta o contador de experiência. */
  since: 2021,
}

export const hero = {
  /**
   * Cada string é uma linha do título. O trecho entre `*asteriscos*` sai no
   * tom apagado — é o segundo tempo da frase.
   */
  lines: {
    pt: ['Eu construo APIs, telas,', 'e *sistemas que não caem*'],
    en: ['I build APIs, interfaces,', 'and *systems that stay up*'],
  } as { pt: string[]; en: string[] },
  lead: {
    pt: 'Cinco anos escrevendo os dois lados da aplicação: Java e Spring Boot no backend, Angular e Next.js no frontend. Sistemas que aguentam carga, telas que não travam, código que o time seguinte consegue ler.',
    en: 'Five years writing both sides of the application: Java and Spring Boot on the back end, Angular and Next.js on the front. Systems that hold under load, screens that never stutter, code the next team can read.',
  } as T,
}

/* ── Trilhas da placa de trabalho ─────────────────────────────────────────── */

/** Cada trilha vira uma sessão de terminal na home. `✓` fecha, `·` é nota. */
export const tracks = [
  {
    key: 'api',
    title: { pt: 'API', en: 'API' } as T,
    sub: { pt: 'Java · Spring Boot', en: 'Java · Spring Boot' } as T,
    lines: {
      pt: [
        'mvn spring-boot:run',
        '· subindo o contexto — 4 módulos, 31 beans',
        '· migrações do Flyway em dia (V14)',
        '✓ pronto em 2.4s — http://localhost:8080',
      ],
      en: [
        'mvn spring-boot:run',
        '· booting the context — 4 modules, 31 beans',
        '· Flyway migrations up to date (V14)',
        '✓ ready in 2.4s — http://localhost:8080',
      ],
    },
  },
  {
    key: 'front',
    title: { pt: 'Frontend', en: 'Front end' } as T,
    sub: { pt: 'Angular · Next.js', en: 'Angular · Next.js' } as T,
    lines: {
      pt: [
        'npm run build',
        '· tipos gerados a partir do OpenAPI',
        '· 18 rotas estáticas, nenhuma acima de 90 kB',
        '✓ build limpo — LCP 1.1s no 4G simulado',
      ],
      en: [
        'npm run build',
        '· types generated from the OpenAPI spec',
        '· 18 static routes, none above 90 kB',
        '✓ clean build — LCP 1.1s on throttled 4G',
      ],
    },
  },
  {
    key: 'data',
    title: { pt: 'Dados', en: 'Data' } as T,
    sub: { pt: 'PostgreSQL · Redis', en: 'PostgreSQL · Redis' } as T,
    lines: {
      pt: [
        'explain analyze select ...',
        '· índice parcial derrubou o seq scan',
        '· 340ms → 12ms no percentil 95',
        '✓ consulta dentro do orçamento',
      ],
      en: [
        'explain analyze select ...',
        '· partial index killed the seq scan',
        '· 340ms → 12ms at the 95th percentile',
        '✓ query inside budget',
      ],
    },
  },
  {
    key: 'infra',
    title: { pt: 'Infra', en: 'Infra' } as T,
    sub: { pt: 'Docker · CI', en: 'Docker · CI' } as T,
    lines: {
      pt: [
        'docker compose up -d',
        '· imagem em dois estágios — 180 MB',
        '· testes e lint no GitHub Actions',
        '✓ deploy sem downtime',
      ],
      en: [
        'docker compose up -d',
        '· two-stage image — 180 MB',
        '· tests and lint on GitHub Actions',
        '✓ deploy with no downtime',
      ],
    },
  },
]

export const about = {
  /** Frase curta — vira o título do bloco "sobre" na home. */
  statement: {
    pt: 'Backend em Java e Spring. Frontend em Angular e Next.js. O mesmo cuidado dos dois lados.',
    en: 'Java and Spring on the back. Angular and Next.js on the front. The same care on both sides.',
  } as T,
  intro: {
    pt: 'Sou desenvolvedor full-stack. Trabalho os dois lados da aplicação: modelagem de dados, APIs e regras de negócio em Java com Spring Boot; interface, estado e performance em Angular, React e Next.js.',
    en: 'I am a full-stack developer. I work both sides of the application: data modelling, APIs and business rules in Java with Spring Boot; interface, state and performance in Angular, React and Next.js.',
  } as T,
  body: {
    pt: 'O que me interessa é a junção — a fronteira onde o contrato da API encontra o componente que consome ela. É ali que a maioria dos bugs mora e é ali que dá pra ganhar mais tempo. Escrevo testes, cuido de observabilidade e prefiro resolver o problema simples antes de inventar abstração.',
    en: 'What interests me is the seam — the boundary where the API contract meets the component consuming it. That is where most bugs live and where most time is won. I write tests, care about observability, and would rather solve the simple problem than invent an abstraction.',
  } as T,
  /** ⚠️ Substitua pela sua trajetória real. */
  timeline: [
    {
      period: { pt: '2024 — hoje', en: '2024 — now' } as T,
      role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' } as T,
      org: { pt: 'Projetos próprios e freelance', en: 'Own products & freelance' } as T,
      note: {
        pt: 'APIs em Spring Boot, front em Next.js e Angular, deploy em containers.',
        en: 'Spring Boot APIs, Next.js and Angular front ends, container deploys.',
      } as T,
    },
    {
      period: { pt: '2022 — 2024', en: '2022 — 2024' } as T,
      role: { pt: 'Desenvolvedor Back-end', en: 'Back-end Developer' } as T,
      org: { pt: 'Adicione a empresa aqui', en: 'Add the company here' } as T,
      note: {
        pt: 'Serviços em Java, integrações, banco relacional e filas.',
        en: 'Java services, integrations, relational databases and queues.',
      } as T,
    },
    {
      period: { pt: '2021 — 2022', en: '2021 — 2022' } as T,
      role: { pt: 'Início', en: 'Getting started' } as T,
      org: { pt: 'Estudo e primeiros projetos', en: 'Study and first projects' } as T,
      note: {
        pt: 'Fundamentos de Java, HTTP, SQL e versionamento.',
        en: 'Java fundamentals, HTTP, SQL and version control.',
      } as T,
    },
  ],
}

/* ── Stack ────────────────────────────────────────────────────────────────── */

export const stack: { group: T; items: string[] }[] = [
  {
    group: { pt: 'Back-end', en: 'Back-end' },
    items: ['Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'REST', 'JUnit'],
  },
  {
    group: { pt: 'Front-end', en: 'Front-end' },
    items: ['TypeScript', 'Angular', 'RxJS', 'React', 'Next.js', 'CSS moderno'],
  },
  {
    group: { pt: 'Dados', en: 'Data' },
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Flyway', 'SQL'],
  },
  {
    group: { pt: 'Infra', en: 'Infra' },
    items: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'Nginx', 'Vercel'],
  },
]

/* ── Projetos ─────────────────────────────────────────────────────────────── */
/* ⚠️ EXEMPLOS — troque tudo abaixo pelos seus projetos.                       */

export const projects: Project[] = [
  {
    slug: 'orbita',
    name: 'Órbita',
    year: '2025',
    kind: { pt: 'Plataforma SaaS', en: 'SaaS platform' },
    lead: {
      pt: 'Painel multiempresa para gestão de operação, com controle de acesso por papel e relatórios em tempo real.',
      en: 'Multi-tenant operations dashboard with role-based access control and live reporting.',
    },
    body: {
      pt: 'Backend em Spring Boot com isolamento por tenant no nível da consulta, autenticação JWT e auditoria de cada escrita. O front em Next.js consome a API por um cliente tipado gerado do OpenAPI, então contrato quebrado vira erro de compilação e não bug em produção.',
      en: 'Spring Boot back end with query-level tenant isolation, JWT auth and an audit trail on every write. The Next.js front end talks to the API through a typed client generated from OpenAPI, so a broken contract becomes a compile error instead of a production bug.',
    },
    stack: ['Spring Boot', 'PostgreSQL', 'Next.js', 'TypeScript', 'Docker'],
    image: '/work/orbita.svg',
  },
  {
    slug: 'contracorrente',
    name: 'Contracorrente',
    year: '2025',
    kind: { pt: 'Dados em tempo real', en: 'Real-time data' },
    lead: {
      pt: 'Pipeline de eventos financeiros com painel ao vivo — da ingestão à visualização em menos de um segundo.',
      en: 'Financial event pipeline with a live dashboard — ingestion to chart in under a second.',
    },
    body: {
      pt: 'Consumidores em Java processam o fluxo de eventos, agregam por janela e publicam via WebSocket. O painel em Angular usa RxJS para compor os streams e só repinta o que mudou, segurando milhares de atualizações por minuto sem engasgo.',
      en: 'Java consumers process the event stream, aggregate it by window and publish over WebSocket. The Angular dashboard composes those streams with RxJS and repaints only what changed, holding thousands of updates a minute without a stutter.',
    },
    stack: ['Java 21', 'Kafka', 'Angular', 'RxJS', 'Redis'],
    image: '/work/contracorrente.svg',
  },
  {
    slug: 'nimbus',
    name: 'Nimbus',
    year: '2024',
    kind: { pt: 'API & infraestrutura', en: 'API & infrastructure' },
    lead: {
      pt: 'Serviço de processamento de mídia: upload, transcodificação assíncrona e entrega por CDN.',
      en: 'Media processing service: upload, async transcoding and CDN delivery.',
    },
    body: {
      pt: 'Fila de jobs com retry exponencial e dead-letter, workers isolados em container e armazenamento em object storage com URLs assinadas. Métricas expostas em Prometheus, então dá pra ver a fila crescendo antes do usuário reclamar.',
      en: 'Job queue with exponential retry and a dead-letter path, workers isolated in containers, object storage with signed URLs. Metrics exposed to Prometheus, so you watch the queue grow before a user complains.',
    },
    stack: ['Spring Boot', 'Redis', 'Docker', 'S3', 'Prometheus'],
    image: '/work/nimbus.svg',
  },
  {
    slug: 'pauta',
    name: 'Pauta',
    year: '2024',
    kind: { pt: 'Produto web', en: 'Web product' },
    lead: {
      pt: 'Ferramenta de colaboração editorial com edição simultânea, histórico de versões e fluxo de aprovação.',
      en: 'Editorial collaboration tool with simultaneous editing, version history and an approval flow.',
    },
    body: {
      pt: 'Resolução de conflito no servidor por operação, não por documento inteiro — dois editores no mesmo parágrafo não sobrescrevem um ao outro. Renderização no servidor com Next.js deixa cada pauta indexável e o primeiro paint quase instantâneo.',
      en: 'Conflicts resolved server-side per operation rather than per document — two editors in the same paragraph no longer overwrite each other. Server rendering with Next.js keeps every piece indexable and the first paint near-instant.',
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'],
    image: '/work/pauta.svg',
  },
  {
    slug: 'farol',
    name: 'Farol',
    year: '2023',
    kind: { pt: 'App mobile', en: 'Mobile app' },
    lead: {
      pt: 'Aplicativo de acompanhamento de hábitos com sincronização offline-first e notificações locais.',
      en: 'Habit-tracking app with offline-first sync and local notifications.',
    },
    body: {
      pt: 'Escreve primeiro no banco local e reconcilia com o servidor quando a conexão volta, usando relógio lógico para ordenar as escritas. O usuário registra o hábito no metrô sem sinal e encontra tudo no lugar quando sai.',
      en: 'Writes hit the local database first and reconcile with the server when the connection returns, ordered by a logical clock. You log a habit on the subway with no signal and everything is in place when you surface.',
    },
    stack: ['React Native', 'TypeScript', 'SQLite', 'Spring Boot'],
    image: '/work/farol.svg',
  },
]

/* ── Explorações (projetos menores / estudos) ─────────────────────────────── */
/* ⚠️ EXEMPLOS — troque pelos seus.                                            */

export const explorations: Exploration[] = [
  {
    name: 'Sentinela',
    kind: { pt: 'Observabilidade', en: 'Observability' },
    note: {
      pt: 'Stack de métricas e alerta em Grafana + Prometheus, empacotada num docker-compose só.',
      en: 'Metrics and alerting stack on Grafana + Prometheus, packed into a single docker-compose.',
    },
  },
  {
    name: 'Bússola',
    kind: { pt: 'Ferramenta CLI', en: 'CLI tool' },
    note: {
      pt: 'Gerador de scaffold para serviços Spring: módulo, entidade, repositório e teste em um comando.',
      en: 'Scaffold generator for Spring services: module, entity, repository and test in one command.',
    },
  },
  {
    name: 'Cache Layer',
    kind: { pt: 'Estudo de performance', en: 'Performance study' },
    note: {
      pt: 'Comparação de estratégias de cache em Redis sob carga sintética, com os números documentados.',
      en: 'A comparison of Redis caching strategies under synthetic load, with the numbers written down.',
    },
  },
  {
    name: 'Kit CI',
    kind: { pt: 'Automação', en: 'Automation' },
    note: {
      pt: 'Workflows reutilizáveis de GitHub Actions para build, teste e publicação de imagem.',
      en: 'Reusable GitHub Actions workflows for build, test and image publishing.',
    },
  },
  {
    name: 'Tipografia',
    kind: { pt: 'Experimento', en: 'Experiment' },
    note: {
      pt: 'Estudo de animação de texto com Canvas e IntersectionObserver, sem biblioteca externa.',
      en: 'A text animation study built on Canvas and IntersectionObserver, with no external library.',
    },
  },
]
