/**
 * A esteira do fluxo, desenhada aqui mesmo.
 *
 * O trabalho entra por uma ponta, se abre em tarefas que correm em paralelo,
 * volta a se juntar numa revisão e sai pela outra. As estações são colunas: as
 * ligações são traçadas de cada cartão de uma coluna para cada cartão da
 * seguinte, e é isso que produz o leque de abertura e de fechamento.
 */

const W = 1400
const H = 430
const BELT = 386
const CARD_H = 66
const GAP = 12

export interface PipeCard {
  title: string
  /** Detalhe técnico concreto, em versalete mono. */
  sub: string
  tone?: 'amber' | 'plain' | 'ink'
}

export interface PipeColumn {
  x: number
  w: number
  cards: PipeCard[]
}

/** Centro vertical de cada cartão: a coluna fica centrada em torno da esteira. */
function slots(count: number) {
  const total = count * CARD_H + (count - 1) * GAP
  const top = BELT - 34 - total
  return Array.from({ length: count }, (_, i) => top + i * (CARD_H + GAP))
}

export default function Pipeline({ columns }: { columns: PipeColumn[] }) {
  const geometry = columns.map((col) => ({ ...col, ys: slots(col.cards.length) }))

  return (
    <div className="pipe" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ color: 'var(--ink-3)' }}>
        {/* ligações: de cada cartão de uma coluna para cada um da próxima */}
        {geometry.slice(0, -1).map((col, ci) => {
          const next = geometry[ci + 1]
          return col.ys.flatMap((y, i) =>
            next.ys.map((ny, ni) => {
              const a = col.x + col.w
              const b = next.x
              const ya = y + CARD_H / 2
              const yb = ny + CARD_H / 2
              const mid = a + (b - a) / 2
              return (
                <path
                  key={`${ci}-${i}-${ni}`}
                  d={`M${a} ${ya} C ${mid} ${ya}, ${mid} ${yb}, ${b} ${yb}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  opacity=".5"
                />
              )
            }),
          )
        })}

        {geometry.map((col) =>
          col.cards.map((card, i) => {
            const y = col.ys[i]
            const tone = card.tone ?? 'plain'
            const bar =
              tone === 'amber' ? 'var(--amber)' : tone === 'ink' ? 'var(--ink-3)' : 'var(--line)'
            return (
              <g key={card.title}>
                {/* perna de apoio do cartão mais baixo até a esteira */}
                {i === col.cards.length - 1 ? (
                  <line
                    x1={col.x + col.w / 2}
                    y1={y + CARD_H}
                    x2={col.x + col.w / 2}
                    y2={BELT}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity=".4"
                  />
                ) : null}

                <rect
                  x={col.x}
                  y={y}
                  width={col.w}
                  height={CARD_H}
                  fill="var(--page)"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <rect x={col.x} y={y} width={col.w} height="5" fill={bar} />

                <text
                  x={col.x + 13}
                  y={y + 28}
                  fontSize="14"
                  fontWeight="500"
                  letterSpacing="-.015em"
                  fill="var(--ink)"
                >
                  {card.title}
                </text>
                <text
                  x={col.x + 13}
                  y={y + 46}
                  fontSize="9"
                  letterSpacing=".13em"
                  fill="var(--ink-3)"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {card.sub}
                </text>
                <line
                  x1={col.x + 13}
                  y1={y + 57}
                  x2={col.x + col.w - 30}
                  y2={y + 57}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity=".22"
                />
              </g>
            )
          }),
        )}

        {/* a esteira */}
        <g stroke="currentColor" fill="none">
          <line x1="0" y1={BELT} x2={W} y2={BELT} strokeWidth="1.4" />
          <line x1="0" y1={BELT + 16} x2={W} y2={BELT + 16} strokeWidth="1" opacity=".5" />
          {Array.from({ length: Math.floor(W / 46) }, (_, i) => (
            <circle key={i} cx={i * 46 + 23} cy={BELT + 8} r="5.5" strokeWidth="1" opacity=".55" />
          ))}
        </g>

        {/* saída: o que foi para produção */}
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <path d={`M${W - 128} 74 a19 19 0 0 1 36 -9 a14 14 0 0 1 26 9 a12 12 0 0 1 -3 24 h-50 a12 12 0 0 1 -9 -24 z`} />
        </g>
        <circle cx={W - 90} cy={62} r="3" fill="var(--amber)" />
        <text
          x={W - 90}
          y={120}
          textAnchor="middle"
          fontSize="9"
          letterSpacing=".16em"
          fill="var(--ink-3)"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          PROD
        </text>
      </svg>
    </div>
  )
}
