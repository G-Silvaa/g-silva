import type { DiagramName, Locale } from '@/content/site'

/**
 * Diagramas dos artigos, desenhados aqui para acompanhar o tema: tudo é
 * pintado com as variáveis do site, então claro e escuro saem certos sem
 * duas versões da imagem.
 */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

type L = { pt: string; en: string }

function Chip({ x, y, w, label, tone = 'plain' }: { x: number; y: number; w: number; label: string; tone?: 'plain' | 'amber' | 'ghost' }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={38}
        fill={tone === 'amber' ? 'var(--amber)' : tone === 'ghost' ? 'none' : 'var(--page)'}
        stroke={tone === 'amber' ? 'var(--amber-2)' : 'var(--ink-3)'}
        strokeWidth="1"
        strokeDasharray={tone === 'ghost' ? '4 4' : undefined}
      />
      <text
        x={x + w / 2}
        y={y + 24}
        textAnchor="middle"
        fontSize="14"
        fontWeight="500"
        fill={tone === 'amber' ? 'var(--on-amber)' : tone === 'ghost' ? 'var(--ink-2)' : 'var(--ink)'}
      >
        {label}
      </text>
    </g>
  )
}

function Tag({ x, y, children, anchor = 'start' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="11" letterSpacing=".14em" fill="var(--ink-3)" fontFamily={MONO}>
      {children.toUpperCase()}
    </text>
  )
}

/* ── O que vem na caixa ───────────────────────────────────────────────────── */

function Caixa({ lang }: { lang: Locale }) {
  const t = (v: L) => v[lang]
  const ng: L[] = [
    { pt: 'Componentes', en: 'Components' },
    { pt: 'Injeção de dependência', en: 'Dependency injection' },
    { pt: 'Roteador', en: 'Router' },
    { pt: 'Formulários', en: 'Forms' },
    { pt: 'Cliente HTTP', en: 'HTTP client' },
    { pt: 'Testes', en: 'Testing' },
    { pt: 'CLI', en: 'CLI' },
    { pt: 'SSR (opcional)', en: 'SSR (optional)' },
  ]
  const next: L[] = [
    { pt: 'Rotas por pastas', en: 'File-based routes' },
    { pt: 'Server Components', en: 'Server Components' },
    { pt: 'Server Functions', en: 'Server Functions' },
    { pt: 'Cache', en: 'Caching' },
  ]
  const yours: L[] = [
    { pt: 'Estado global', en: 'Global state' },
    { pt: 'Formulários', en: 'Forms' },
    { pt: 'Cliente HTTP', en: 'HTTP client' },
    { pt: 'Testes', en: 'Testing' },
  ]

  return (
    <svg viewBox="0 0 1000 470" role="img" aria-label={t({ pt: 'O que cada framework traz pronto', en: 'What each framework ships with' })}>
      {/* Angular */}
      <text x="20" y="34" fontSize="22" fontWeight="500" fill="var(--ink)">Angular</text>
      <Tag x={20} y={58}>{t({ pt: 'vem no framework', en: 'ships with the framework' })}</Tag>
      <rect x="20" y="74" width="450" height="226" fill="var(--tile)" stroke="var(--ink-3)" strokeWidth="1.2" />
      <rect x="20" y="74" width="450" height="5" fill="var(--amber)" />
      {ng.map((item, i) => (
        <Chip key={item.en} x={40 + (i % 2) * 210} y={98 + Math.floor(i / 2) * 50} w={200} label={t(item)} />
      ))}

      {/* Next.js */}
      <text x="530" y="34" fontSize="22" fontWeight="500" fill="var(--ink)">Next.js</text>
      <Tag x={530} y={58}>{t({ pt: 'vem no framework', en: 'ships with the framework' })}</Tag>
      <rect x="530" y="74" width="450" height="126" fill="var(--tile)" stroke="var(--ink-3)" strokeWidth="1.2" />
      <rect x="530" y="74" width="450" height="5" fill="var(--amber)" />
      {next.map((item, i) => (
        <Chip key={item.en} x={550 + (i % 2) * 210} y={98 + Math.floor(i / 2) * 50} w={200} label={t(item)} />
      ))}
      <rect x="530" y="208" width="450" height="40" fill="var(--amber)" />
      <text x="755" y="233" textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--on-amber)">
        {t({ pt: 'React — componentes e hooks', en: 'React — components and hooks' })}
      </text>

      <Tag x={530} y={290}>{t({ pt: 'você escolhe', en: 'your choice' })}</Tag>
      <rect x="530" y="304" width="450" height="126" fill="none" stroke="var(--ink-3)" strokeWidth="1" strokeDasharray="5 5" />
      {yours.map((item, i) => (
        <Chip key={item.en} x={550 + (i % 2) * 210} y={326 + Math.floor(i / 2) * 50} w={200} label={t(item)} tone="ghost" />
      ))}

      <Tag x={20} y={340}>{t({ pt: 'um projeto angular', en: 'one angular project' })}</Tag>
      <text x="20" y="366" fontSize="14" fill="var(--ink-2)">
        {t({ pt: 'se parece com o outro.', en: 'looks like the next one.' })}
      </text>
      <Tag x={20} y={410}>{t({ pt: 'em next.js', en: 'in next.js' })}</Tag>
      <text x="20" y="436" fontSize="14" fill="var(--ink-2)">
        {t({ pt: 'as convenções do time precisam estar escritas.', en: 'team conventions have to be written down.' })}
      </text>
    </svg>
  )
}

/* ── Onde o código roda ───────────────────────────────────────────────────── */

function Arrow({ x1, y1, x2, y2, label, ly }: { x1: number; y1: number; x2: number; y2: number; label: string; ly?: number }) {
  const dir = x2 > x1 ? 1 : -1
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - dir * 7} y2={y2} stroke="var(--ink-3)" strokeWidth="1.2" />
      <path d={`M${x2} ${y2} l${-dir * 9} -5 v10 z`} fill="var(--ink-3)" />
      <text x={(x1 + x2) / 2} y={ly ?? y1 - 9} textAnchor="middle" fontSize="11" letterSpacing=".1em" fill="var(--ink-3)" fontFamily={MONO}>
        {label}
      </text>
    </g>
  )
}

function Box({ x, y, w, h, title, sub, tone = 'plain' }: { x: number; y: number; w: number; h: number; title: string; sub?: string; tone?: 'plain' | 'amber' | 'ghost' }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={tone === 'ghost' ? 'none' : 'var(--page)'}
        stroke={tone === 'amber' ? 'var(--amber-2)' : 'var(--ink-3)'}
        strokeWidth={tone === 'amber' ? 1.6 : 1.1}
        strokeDasharray={tone === 'ghost' ? '5 5' : undefined}
      />
      {tone === 'amber' ? <rect x={x} y={y} width={w} height="5" fill="var(--amber)" /> : null}
      <text x={x + 14} y={y + (sub ? 28 : h / 2 + 5)} fontSize="15" fontWeight="500" fill={tone === 'ghost' ? 'var(--ink-2)' : 'var(--ink)'}>
        {title}
      </text>
      {sub ? (
        <text x={x + 14} y={y + 48} fontSize="11" letterSpacing=".08em" fill="var(--ink-3)" fontFamily={MONO}>
          {sub}
        </text>
      ) : null}
    </g>
  )
}

function Fronteira({ lang }: { lang: Locale }) {
  const t = (v: L) => v[lang]
  const server = t({ pt: 'Servidor', en: 'Server' })
  const browser = t({ pt: 'Navegador', en: 'Browser' })

  return (
    <svg viewBox="0 0 1000 500" role="img" aria-label={t({ pt: 'Onde o código roda em cada framework', en: 'Where the code runs in each framework' })}>
      {/* cabeçalho das faixas */}
      <Tag x={20} y={24}>{server}</Tag>
      <Tag x={980} y={24} anchor="end">{browser}</Tag>

      {/* Angular */}
      <text x="20" y="62" fontSize="20" fontWeight="500" fill="var(--ink)">Angular</text>
      <rect x="20" y="76" width="960" height="178" fill="var(--tile)" stroke="var(--line)" />
      <line x1="430" y1="76" x2="430" y2="254" stroke="var(--ink-3)" strokeDasharray="3 5" />
      <Box x={44} y={98} w={220} h={62} title={t({ pt: 'API (back-end)', en: 'API (back end)' })} sub="JAVA · SPRING" />
      <Box x={44} y={174} w={220} h={56} title={t({ pt: 'SSR (opcional)', en: 'SSR (optional)' })} tone="ghost" />
      <rect x="520" y="94" width="436" height="142" fill="var(--page)" stroke="var(--amber-2)" strokeWidth="1.6" />
      <rect x="520" y="94" width="436" height="5" fill="var(--amber)" />
      <text x="536" y="124" fontSize="15" fontWeight="500" fill="var(--ink)">
        {t({ pt: 'A aplicação inteira', en: 'The whole application' })}
      </text>
      <Chip x={536} y={142} w={128} label={t({ pt: 'Componentes', en: 'Components' })} />
      <Chip x={672} y={142} w={128} label={t({ pt: 'Serviços', en: 'Services' })} />
      <Chip x={808} y={142} w={132} label={t({ pt: 'Roteador', en: 'Router' })} />
      <text x="536" y="214" fontSize="12" fill="var(--ink-3)">
        {t({ pt: 'baixa o JavaScript e roda no navegador', en: 'downloads the JavaScript and runs in the browser' })}
      </text>
      <Arrow x1={520} y1={129} x2={264} y2={129} label="HTTP · JSON" />

      {/* Next.js */}
      <text x="20" y="306" fontSize="20" fontWeight="500" fill="var(--ink)">Next.js — App Router</text>
      <rect x="20" y="320" width="960" height="160" fill="var(--tile)" stroke="var(--line)" />
      <line x1="640" y1="320" x2="640" y2="480" stroke="var(--amber-2)" strokeWidth="1.6" />
      <rect x="586" y="330" width="108" height="24" fill="var(--amber)" />
      <text x="640" y="347" textAnchor="middle" fontSize="12" fill="var(--on-amber)" fontFamily={MONO}>
        &apos;use client&apos;
      </text>
      <Box x={44} y={372} w={200} h={62} title={t({ pt: 'Banco, API, segredos', en: 'DB, API, secrets' })} sub={t({ pt: 'NUNCA SAEM DAQUI', en: 'NEVER LEAVE HERE' })} />
      <Box x={330} y={372} w={230} h={62} title="page.tsx" sub="SERVER COMPONENT" tone="amber" />
      <Box x={720} y={372} w={236} h={62} title="BotaoFavoritar" sub="CLIENT COMPONENT" />
      <Arrow x1={244} y1={403} x2={330} y2={403} label="await" />
      <Arrow x1={560} y1={403} x2={720} y2={403} label="props" />
      <text x="330" y="462" fontSize="12" fill="var(--ink-3)">
        {t({ pt: 'renderiza no servidor, não manda o próprio código', en: 'renders on the server, ships none of its own code' })}
      </text>
      <text x="720" y="462" fontSize="12" fill="var(--ink-3)">
        {t({ pt: 'estado e eventos: vai para o navegador', en: 'state and events: goes to the browser' })}
      </text>
    </svg>
  )
}

export default function ArticleDiagram({ name, lang }: { name: DiagramName; lang: Locale }) {
  switch (name) {
    case 'ng-next-caixa':
      return <Caixa lang={lang} />
    case 'ng-next-fronteira':
      return <Fronteira lang={lang} />
  }
}
