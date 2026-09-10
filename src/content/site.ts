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
  /** Onde o projeto foi feito. */
  org?: T
  /** `false` quando você saiu antes do projeto ser concluído. */
  shipped?: boolean
  /** Seu papel no projeto. */
  role?: T
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
  /** Ladrilho usado na galeria espalhada da home. */
  image: string
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
  email: 'geniltonsilva2002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/genilton-silva-974705204/',
  github: 'https://github.com/G-Silvaa',
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

/**
 * Projetos reais. Os dois primeiros estão no ar e usam captura do próprio
 * site; os demais são sistemas internos e usam arte provisória até chegarem
 * as telas de verdade — troque o campo `image` quando tiver.
 *
 */
export const projects: Project[] = [
  {
    slug: 'jed',
    name: 'Jovens Empreendedores Digitais',
    // ⚠️ De quem é este projeto? Preencha a organização.
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Portal público', en: 'Public portal' },
    lead: {
      pt: 'Portal de um programa de empreendedorismo digital: cadastro, trilha de conteúdo e área do aluno.',
      en: 'Portal for a digital entrepreneurship programme: sign-up, content track and student area.',
    },
    body: {
      pt: 'O programa leva ferramentas digitais gratuitas a estudantes do ensino público. O portal é a porta de entrada: apresenta o projeto, abre as inscrições, organiza as trilhas de conteúdo e publica notícias e resultados. Segundo os números do próprio site, alcançou mais de 14 mil estudantes em 53 municípios.',
      en: 'The programme takes free digital tools to public-school students. The portal is the front door: it presents the project, opens registration, organises the content tracks and publishes news and results. By the site\'s own numbers it reached over 14,000 students across 53 municipalities.',
    },
    stack: ['Angular', 'Spring'],
    image: '/work/jed.png',
    live: 'https://empreendedoresdigitais.ifce.edu.br/',
  },
  {
    slug: 'edital360',
    name: 'Edital 360',
    // ⚠️ De quem é este projeto? Preencha a organização.
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Plataforma de concursos', en: 'Selection-process platform' },
    lead: {
      pt: 'Plataforma de editais em geral — concursos, processos seletivos, inscrições abertas e acompanhamento.',
      en: 'A platform for public notices at large — tenders, selection processes, open registration and tracking.',
    },
    body: {
      pt: 'Reúne num lugar só o que antes ficava espalhado em PDFs: notícias, editais de todo tipo, inscrições abertas por instituição e vaga, e o acompanhamento de cada processo até a conclusão. O candidato cria conta, se inscreve e acompanha o andamento sem precisar caçar documento em página de notícia.',
      en: 'It gathers in one place what used to be scattered across PDFs: news, notices of every kind, open registrations by institution and vacancy, and the tracking of each process through to its conclusion. Candidates create an account, register and follow progress without hunting for documents on a news page.',
    },
    stack: ['React', 'Spring'],
    image: '/work/edital360.png',
    live: 'https://concursos.faifce.ifce.edu.br/',
  },
  {
    slug: 'intranet2',
    name: 'Intranet 2',
    shipped: false,
    org: { pt: 'IFCE Campus Maracanaú', en: 'IFCE Campus Maracanaú' },
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Sistema ERP', en: 'ERP system' },
    lead: {
      pt: 'Evolução do ERP da intranet do IFCE, redesenhada para servir todos os campi.',
      en: 'Evolution of the IFCE intranet ERP, redesigned to serve every campus.',
    },
    body: {
      pt: 'A segunda geração do sistema, com melhorias significativas sobre a primeira e a intenção de sair de um campus para a rede inteira. Trabalhei nos dois lados: a interface em Angular e o Spring que serve os dados por trás dela, mantendo a tela sempre em dia.',
      en: 'The second generation of the system, with significant improvements over the first and the intent to move from one campus to the whole network. I worked both ends: the Angular interface and the Spring service behind it, keeping the screen current.',
    },
    stack: ['Angular', 'Spring'],
    image: '/work/intranet2.svg',
  },
  {
    slug: 'intranet',
    name: 'Intranet',
    org: { pt: 'IFCE Campus Maracanaú', en: 'IFCE Campus Maracanaú' },
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Sistema ERP', en: 'ERP system' },
    lead: {
      pt: 'ERP da intranet do campus, atendendo mais de 3.000 alunos e servidores.',
      en: 'Campus intranet ERP, serving more than 3,000 students and staff.',
    },
    body: {
      pt: 'O sistema que a comunidade acadêmica usa no dia a dia: acesso e gestão dos dados que sustentam a operação do campus. O objetivo era juntar num lugar só o que estava espalhado, com uma experiência integrada para aluno e servidor.',
      en: 'The system the academic community uses daily: access to and management of the data that keeps the campus running. The goal was to gather in one place what was scattered, with a single integrated experience for students and staff.',
    },
    stack: ['React', 'Spring'],
    image: '/work/intranet.png',
    live: 'https://intranet.maracanau.ifce.edu.br/',
  },
  {
    slug: 'sysra',
    name: 'SysRa',
    org: { pt: 'IFCE Campus Maracanaú', en: 'IFCE Campus Maracanaú' },
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Gestão alimentar', en: 'Food management' },
    lead: {
      pt: 'Aplicação de gerenciamento alimentar do campus, pensada para escalar aos demais.',
      en: 'Campus food management application, designed to scale to the other campuses.',
    },
    body: {
      pt: 'Nasceu para resolver a gestão alimentar do Campus Maracanaú e foi desenhada desde o começo para atender depois os outros campi. Trabalhei nos dois lados: a interface em Angular, cuidando da interatividade, e o Spring que alimenta a tela por trás.',
      en: 'It started to solve food management at Campus Maracanaú and was designed from the outset to serve the other campuses later. I worked both ends: the Angular interface, handling interactivity, and the Spring service feeding it behind the scenes.',
    },
    stack: ['Angular', 'Spring'],
    image: '/work/sysra.svg',
  },
  {
    slug: 'avisos',
    name: 'Avisos',
    org: { pt: 'IFCE Campus Maracanaú', en: 'IFCE Campus Maracanaú' },
    role: { pt: 'Full-stack', en: 'Full-stack' },
    kind: { pt: 'Painel em tempo real', en: 'Real-time display' },
    lead: {
      pt: 'Avisos exibidos em tempo real nos monitores espalhados pelo campus.',
      en: 'Notices shown in real time on the monitors around the campus.',
    },
    body: {
      pt: 'Os monitores do campus precisavam mostrar informação que muda ao longo do dia sem ninguém ter que trocar arquivo na mão. O painel atualiza sozinho, então o que está na tela é sempre o aviso vigente. Trabalhei nos dois lados: o painel em Angular e o serviço em .NET que entrega os avisos a ele.',
      en: 'The campus monitors needed to show information that changes through the day without anyone swapping a file by hand. The board updates on its own, so what is on screen is always the current notice. I worked both ends: the Angular board and the .NET service that feeds it the notices.',
    },
    stack: ['Angular', '.NET'],
    image: '/work/avisos.svg',
  },
  {
    slug: 'chaves',
    name: 'Chaves',
    org: { pt: 'IFCE Campus Maracanaú', en: 'IFCE Campus Maracanaú' },
    role: { pt: 'Full-stack · apoio ao time', en: 'Full-stack · team support' },
    kind: { pt: 'Controle de armários', en: 'Locker control' },
    lead: {
      pt: 'Controle das chaves dos armários do campus — quem pegou, quando e o que ainda está fora.',
      en: 'Control of the campus locker keys — who took one, when, and what is still out.',
    },
    body: {
      pt: 'Neste eu entrei como apoio: montei a estrutura do projeto, corrigi erros de pipeline, tirei dúvidas do time e desenvolvi nos dois lados, com Angular na interface e Spring por trás. O sistema deixou o controle dos armários rastreável, no lugar do caderno na portaria.',
      en: 'Here I came in as support: I set up the project structure, fixed pipeline failures, answered the team\'s questions and built on both ends, with Angular on the interface and Spring behind it. The system made locker control traceable, replacing the notebook at the front desk.',
    },
    stack: ['Angular', 'Spring'],
    image: '/work/chaves.svg',
  },
]

/* ── Explorações ──────────────────────────────────────────────────────────── */

/**
 * Estudos e projetos menores. Está vazio de propósito — o que havia aqui era
 * exemplo inventado. Acrescente os seus e eles voltam a aparecer na home e em
 * /work automaticamente.
 */
export const explorations: Exploration[] = []

/* ── Artigos ──────────────────────────────────────────────────────────────── */

export interface Article {
  slug: string
  title: T
  /** Data em ISO (2026-09-10) — usada para ordenar e exibir. */
  date: string
  lead: T
  /** Link externo, se o texto estiver publicado em outro lugar. */
  href?: string
}

/**
 * Vazio de propósito. Acrescente aqui e a página /articles se preenche
 * sozinha — o estado vazio some assim que houver o primeiro item.
 */
export const articles: Article[] = []

/* ── Página de IA ─────────────────────────────────────────────────────────── */

/**
 * ⚠️ Esta página é opinião — revise no seu tom. O conteúdo abaixo segue o que
 * você contou: a IA escreve a maior parte, os MCPs adiantam o trabalho por
 * alcançarem o repositório direto, e nada sobe sem revisão sua linha a linha.
 */
export const ai = {
  lines: {
    pt: ['IA não projeta.', '*Faz os outros 80%*'],
    en: ['AI does not design.', '*It does the other 80%*'],
  } as { pt: string[]; en: string[] },

  lead: {
    pt: 'Usando IA em meu fluxo de trabalho diário para execução mais rápida, melhores decisões, prototipagem rápida e envio de produtos do mundo real.',
    en: 'Using AI across my daily workflow for faster execution, better decisions, rapid prototyping, and shipping real-world products.',
  } as T,

  /** As colunas da esteira. Cada coluna vira um grupo de cartões. */
  pipeline: [
    { x: 30, w: 186, cards: [{ title: 'Prompt', sub: 'CLAUDE · CONTEXTO DO REPO', tone: 'plain' as const }] },
    { x: 282, w: 186, cards: [{ title: 'Agente', sub: 'PLANEJA · EXECUTA · VERIFICA', tone: 'amber' as const }] },
    {
      x: 534,
      w: 200,
      cards: [
        { title: 'Código', sub: 'SERVICE.JAVA · SPRING', tone: 'plain' as const },
        { title: 'Na mão', sub: 'QUANDO SAI MAIS RÁPIDO', tone: 'amber' as const },
        { title: 'Testes', sub: 'JUNIT · E2E', tone: 'plain' as const },
        { title: 'Docs', sub: 'OPENAPI · README', tone: 'plain' as const },
      ],
    },
    { x: 800, w: 186, cards: [{ title: 'Revisão', sub: 'LINHA A LINHA · NA MÃO', tone: 'amber' as const }] },
    { x: 1052, w: 186, cards: [{ title: 'Commit', sub: 'GIT · MAVEN', tone: 'ink' as const }] },
  ],

  /** O ciclo, em regras. */
  loop: [
    {
      title: { pt: 'Agente não é chat com ferramenta', en: 'An agent is not a chat with tools' } as T,
      body: {
        pt: 'Agente é o modelo rodando em laço: planeja um passo, executa, lê o resultado e decide o próximo — até fechar a tarefa ou bater num critério de parada. O que o separa de uma resposta de chat não é a qualidade do texto, é a autonomia ao longo de vários passos e a capacidade de causar efeito: abrir o arquivo, rodar o teste, ler a falha e voltar sozinho. É aí que o ganho de verdade aparece.',
        en: 'An agent is the model running in a loop: it plans a step, runs it, reads the result and decides the next — until the task closes or it hits a stopping condition. What separates it from a chat reply is not the quality of the text; it is autonomy across several steps and the ability to cause effects: open the file, run the test, read the failure and come back on its own. That is where the real gain shows up.',
      } as T,
    },
    {
      title: { pt: 'A IA escreve a maior parte — e escreve bem', en: 'AI writes most of it — and writes it well' } as T,
      body: {
        pt: 'Código, teste e documentação saem dela hoje, e saem em bom nível: o modelo acompanha o padrão do projeto e cobre caso de borda que passaria batido na pressa. Ela auxilia em boa parte do desenvolvimento, e isso me deixa gastar o tempo onde ele rende — decidir o desenho da solução.',
        en: 'Code, tests and documentation come out of it today, and they come out well: the model follows the project pattern and covers edge cases that would slip past under pressure. It assists across much of the development, which lets me spend time where it pays off — deciding the shape of the solution.',
      } as T,
    },
    {
      title: { pt: 'Dupla camada de revisão', en: 'A double layer of review' } as T,
      body: {
        pt: 'Nada sobe sem eu ler linha por linha. Depois disso, devolvo o mesmo trecho para a IA revisar de novo, com outro olhar: uma camada pega o que a outra deixou passar. Código que eu não sei explicar não entra — a responsabilidade pelo que está em produção é minha, não da ferramenta.',
        en: 'Nothing ships without me reading it line by line. Then I hand the same passage back to the AI for a second pass with fresh eyes: one layer catches what the other let through. Code I cannot explain does not go in — what runs in production is my responsibility, not the tool\'s.',
      } as T,
    },
    {
      title: { pt: 'Às vezes é mais rápido escrever', en: 'Sometimes writing it is faster' } as T,
      body: {
        pt: 'Em problema pequeno e específico, explicar o que eu quero custa mais que fazer. Nesses casos escrevo direto — a ferramenta é meio, não obrigação.',
        en: 'On a small, specific problem, explaining what I want costs more than doing it. In those cases I write it myself — the tool is a means, not an obligation.',
      } as T,
    },
  ],

  /** ⚠️ Acrescente o que você construiu assim. */
  built: [
    {
      name: { pt: 'Este portfólio', en: 'This portfolio' } as T,
      note: {
        pt: 'Next.js e TypeScript, do layout às ilustrações em SVG, construído em par com um assistente de código.',
        en: 'Next.js and TypeScript, from the layout to the SVG illustrations, built in pair with a coding assistant.',
      } as T,
    },
  ],

  /**
   * As marcas vêm da coleção Simple Icons (CC0) em `public/tools`. Para
   * acrescentar outra, baixe o SVG lá e aponte o campo `icon`.
   */
  tools: [
    {
      name: 'Claude',
      icon: '/tools/claude.svg',
      role: { pt: 'Agente de código, no terminal', en: 'Coding agent, in the terminal' } as T,
    },
    {
      name: 'MCP',
      icon: '/tools/mcp.svg',
      role: {
        pt: 'Protocolo aberto: um servidor expõe ferramentas, recursos e prompts numa interface comum',
        en: 'Open protocol: a server exposes tools, resources and prompts through one common interface',
      } as T,
    },
    {
      name: 'ChatGPT',
      icon: '/tools/openai.svg',
      role: { pt: 'Rascunho, pesquisa e segunda opinião', en: 'Drafting, research and a second opinion' } as T,
    },
    {
      name: 'Git',
      icon: '/tools/git.svg',
      role: { pt: 'A rede de segurança de tudo', en: 'The safety net under all of it' } as T,
    },
  ],
}
