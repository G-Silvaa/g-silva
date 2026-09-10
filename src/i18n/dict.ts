import type { Locale } from '@/content/site'

/** Strings de interface. Conteúdo editorial fica em `src/content/site.ts`. */
export const ui = {
  navHome: { pt: 'Início', en: 'Welcome' },
  navWork: { pt: 'Projetos', en: 'Work' },
  navAbout: { pt: 'Sobre', en: 'About' },
  navArticles: { pt: 'Artigos', en: 'Writing' },
  navAi: { pt: 'IA', en: 'AI' },
  navContact: { pt: 'Contato', en: 'Contact' },
  menu: { pt: 'Menu', en: 'Menu' },
  close: { pt: 'Fechar', en: 'Close' },

  scroll: { pt: 'role', en: 'scroll' },
  available: { pt: 'Disponível para projetos', en: 'Available for work' },

  selectedWork: { pt: 'Projetos selecionados', en: 'Selected work' },
  selectedWorkLead: {
    pt: 'Um recorte do que construí — o problema de cada um e com o que foi resolvido.',
    en: 'A slice of what I have built — the problem each one solved, and what it was built with.',
  },
  allWork: { pt: 'Ver todos os projetos', en: 'View all work' },
  viewCase: { pt: 'Ver projeto', en: 'View project' },
  dragHint: { pt: 'arraste', en: 'drag' },
  prev: { pt: 'Anterior', en: 'Previous' },
  next: { pt: 'Próximo', en: 'Next' },

  workTitle: { pt: 'Projetos', en: 'Work' },
  workLead: {
    pt: 'Passe o cursor sobre um painel para abrir. Cada faixa é um projeto — imagem, stack e o problema que ele resolve.',
    en: 'Hover a panel to open it. Each strip is one project — the shot, the stack, and the problem it solves.',
  },
  workLeadTouch: {
    pt: 'Toque em um painel para abrir. Cada faixa é um projeto — imagem, stack e o problema que ele resolve.',
    en: 'Tap a panel to open it. Each strip is one project — the shot, the stack, and the problem it solves.',
  },

  countProjects: { pt: 'projetos', en: 'projects' },
  countStudies: { pt: 'estudos', en: 'studies' },
  countTech: { pt: 'tecnologias', en: 'technologies' },

  archive: { pt: 'Arquivo', en: 'Archive' },
  archiveLead: {
    pt: 'A lista completa, com o detalhe técnico de cada um.',
    en: 'The full list, with the technical detail of each.',
  },

  explorations: { pt: 'Explorações', en: 'Explorations' },
  explorationsLead: {
    pt: 'Projetos menores, estudos e ferramentas internas.',
    en: 'Smaller projects, studies and internal tooling.',
  },

  stackTitle: { pt: 'Stack', en: 'Stack' },
  stackLead: {
    pt: 'O que uso no dia a dia, dos dois lados da aplicação.',
    en: 'What I reach for daily, on both sides of the application.',
  },

  aboutTitle: { pt: 'Sobre', en: 'About' },
  path: { pt: 'Trajetória', en: 'Path' },
  yearsCoding: { pt: 'anos programando', en: 'years coding' },
  projectsShipped: { pt: 'projetos entregues', en: 'projects shipped' },
  sidesOfStack: { pt: 'lados da stack', en: 'sides of the stack' },

  contactTitle: { pt: 'Vamos conversar', en: "Let's talk" },
  contactLead: {
    pt: 'Aberto a vagas full-stack, freelas e colaborações. Respondo rápido.',
    en: 'Open to full-stack roles, freelance and collaborations. I reply fast.',
  },
  emailMe: { pt: 'Mandar e-mail', en: 'Email me' },
  copy: { pt: 'Copiar', en: 'Copy' },
  copied: { pt: 'Copiado', en: 'Copied' },

  role2: { pt: 'Função', en: 'Role' },
  builtWith: { pt: 'Feito com', en: 'Built with' },
  backTop: { pt: 'Voltar ao topo', en: 'Back to top' },
  theme: { pt: 'Tema', en: 'Theme' },

  /* Placa de trabalho */
  workspace: { pt: 'Bancada', en: 'Workspace' },
  tracks: { pt: 'Trilhas', en: 'Tracks' },
  ready: { pt: 'Pronto', en: 'Ready' },
  replay: { pt: 'Repetir', en: 'Replay' },

  /* Rodapé */
  explorePortfolio: { pt: 'Ver os projetos', en: 'Explore the work' },
  dailyKit: { pt: 'Ferramentas do dia a dia', en: 'Daily kit' },
  getInTouch: { pt: 'Vamos conversar.', en: 'Lets get in touch.' },
  replyWithin: { pt: 'Respondo em até 24 horas', en: 'Response within 24 hours' },
  sitemap: { pt: 'Mapa do site', en: 'Sitemap' },
  elsewhere: { pt: 'Em outros lugares', en: 'Elsewhere' },
  studio: { pt: 'Base', en: 'Studio' },
  rights: { pt: 'Todos os direitos reservados', en: 'All rights reserved' },

  /* Títulos em dois tempos — a segunda metade sai apagada */
  focusA: { pt: 'Principalmente', en: 'Primarily' },
  focusB: { pt: 'focado em', en: 'focused on' },
  focusLead: {
    pt: 'Cinco anos entregando software, assentados em quatro trilhas que se puxam todo dia.',
    en: 'Five years shipping software, settled into four tracks that pull on each other daily.',
  },
  numbersTab: { pt: 'Em números', en: 'By the numbers' },
  numbersA: { pt: 'Cinco anos,', en: 'Five years,' },
  numbersB: { pt: 'em números.', en: 'by the numbers.' },
  numbersLead: {
    pt: 'Projetos entregues, serviços no ar, consultas otimizadas — a conta em vez da descrição.',
    en: 'Projects shipped, services running, queries tuned — counted rather than described.',
  },
  readProfile: { pt: 'Ler o perfil completo', en: 'Read the full profile' },
  aboutMe: { pt: 'Sobre mim', en: 'About me' },
  dragToExplore: { pt: 'Arraste o plano — ou puxe um projeto', en: 'Drag the plane — or pull a project' },
  tapToOpen: { pt: 'Toque para abrir', en: 'Tap to open' },
  creativeSpace: { pt: 'Espaço aberto', en: 'Creative space' },
  hi: { pt: 'Oi!', en: 'Hi!' },

  /* Página de IA */
  aiLoopTab: { pt: 'O ciclo', en: 'The loop' },
  aiLoopA: { pt: 'Como isso entra', en: 'How it fits' },
  aiLoopB: { pt: 'no meu dia.', en: 'into my day.' },
  aiLoopLead: {
    pt: 'Quatro regras que eu sigo — as duas primeiras ganham tempo e qualidade, as duas últimas garantem que nada suba sem alguém responder por aquilo.',
    en: 'Four rules I follow — the first two buy time and quality, the last two make sure nothing ships without someone answering for it.',
  },
  aiBuiltTab: { pt: 'Feito assim', en: 'Built this way' },
  aiBuiltA: { pt: 'Construído assim,', en: 'Built this way,' },
  aiBuiltB: { pt: 'e no ar.', en: 'and running.' },
  aiToolsTab: { pt: 'Ferramentas', en: 'Tools' },
  aiToolsA: { pt: 'O que uso,', en: 'What I use,' },
  aiToolsB: { pt: 'e para quê.', en: 'and what for.' },
  aiToolsLead: {
    pt: 'Lista curta de propósito — ferramenta que se usa uma vez por trimestre é ferramenta em que você é ruim.',
    en: 'A short list on purpose — a tool used once a quarter is a tool you are bad at.',
  },
  aiSeeLoop: { pt: 'O ciclo', en: 'The loop' },
  aiSeeBuilt: { pt: 'O que saiu disso', en: 'What came out of it' },

  /* Artigos */
  articlesA: { pt: 'Notas sobre', en: 'Notes on' },
  articlesB: { pt: 'o que construo.', en: 'what I build.' },
  articlesLead: {
    pt: 'Anotações sobre os problemas que apareceram no caminho e como foram resolvidos.',
    en: 'Notes on the problems that showed up along the way, and how they got solved.',
  },
  articlesEmpty: {
    pt: 'Ainda não publiquei nada por aqui.',
    en: 'Nothing published here yet.',
  },
  articlesSoon: {
    pt: 'Os primeiros textos chegam em breve — enquanto isso, dá uma olhada nos projetos.',
    en: 'The first pieces are on the way — meanwhile, have a look at the work.',
  },
  code: { pt: 'Código', en: 'Code' },
  workA: { pt: 'Explore os projetos,', en: 'Explore my work,' },
  workB: { pt: 'e o processo.', en: 'and the process.' },
  workPageLead: {
    pt: 'Sistemas full-stack e estudos, do modelo de dados à tela. Passe o cursor para espiar, clique para abrir.',
    en: 'Full-stack systems and studies, from the data model to the screen. Hover to peek, click to open.',
  },
  aboutA: { pt: 'Os dois lados', en: 'Both sides' },
  aboutB: { pt: 'da aplicação.', en: 'of the application.' },
  contactA: { pt: 'Vamos', en: "Let's" },
  contactB: { pt: 'conversar.', en: 'talk.' },

  /* Números */
  nProjects: { pt: 'Projetos entregues', en: 'Projects shipped' },
  nYears: { pt: 'Anos programando', en: 'Years coding' },
  nTech: { pt: 'Tecnologias em uso', en: 'Technologies in use' },
  nSides: { pt: 'Lados da stack', en: 'Sides of the stack' },
  notFound: { pt: 'Página não encontrada', en: 'Page not found' },
  notFoundLead: {
    pt: 'Este endereço não existe — ou não existe mais.',
    en: 'This address does not exist — or does not any more.',
  },
  backHome: { pt: 'Voltar ao início', en: 'Back home' },
  language: { pt: 'Idioma', en: 'Language' },
} satisfies Record<string, { pt: string; en: string }>

export type UiKey = keyof typeof ui

export function pick<V>(v: Record<Locale, V>, lang: Locale): V {
  return v[lang]
}
