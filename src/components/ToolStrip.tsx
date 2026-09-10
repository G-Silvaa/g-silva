/**
 * Faixa de ferramentas desenhada como uma trilha de placa de circuito: um
 * barramento horizontal com marcações, componentes soltos e chips rotulados
 * com a stack. Desenho próprio, em traço fino, para casar com o resto do site.
 */
export default function ToolStrip({ items }: { items: string[] }) {
  const W = 1400
  const H = 120
  const base = 86
  const slot = W / items.length

  return (
    <div className="strip" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet">
        <g stroke="var(--ink-3)" fill="none" strokeWidth="1" opacity=".55">
          {/* barramento */}
          <line x1="0" y1={base} x2={W} y2={base} strokeWidth="1.2" />
          {/* marcações da régua */}
          {Array.from({ length: Math.floor(W / 14) }, (_, i) => (
            <line key={i} x1={i * 14} y1={base} x2={i * 14} y2={base + (i % 5 === 0 ? 8 : 4)} />
          ))}
        </g>

        {items.map((label, i) => {
          const cx = slot * i + slot / 2
          const chipW = Math.min(112, slot * 0.52)
          const top = 34
          const lit = i % 2 === 0
          return (
            <g key={label}>
              {/* perna do chip até o barramento */}
              <path
                d={`M${cx - chipW / 2 + 14} ${top + 30} V${base - 16} H${cx + chipW / 2 - 14} V${top + 30}`}
                fill="none"
                stroke="var(--ink-3)"
                strokeWidth="1"
                opacity=".5"
              />
              {/* ilhas de solda */}
              <circle cx={cx - chipW / 2 + 14} cy={base - 16} r="3" fill="var(--amber)" opacity=".85" />
              <circle cx={cx + chipW / 2 - 14} cy={base - 16} r="3" fill="var(--ink-3)" opacity=".5" />

              {/* corpo do chip */}
              <rect
                x={cx - chipW / 2}
                y={top}
                width={chipW}
                height="30"
                fill={lit ? 'var(--amber)' : 'var(--tile)'}
                stroke={lit ? 'var(--amber-2)' : 'var(--line)'}
                strokeWidth="1"
              />
              <text
                x={cx}
                y={top + 20}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="500"
                letterSpacing="-.01em"
                fill={lit ? 'var(--on-amber)' : 'var(--ink-2)'}
              >
                {label}
              </text>

              {/* referência do componente */}
              <text
                x={cx - chipW / 2 + 14}
                y={base + 22}
                textAnchor="middle"
                fontSize="9"
                letterSpacing=".14em"
                fill="var(--ink-3)"
                opacity=".8"
              >
                {String.fromCharCode(67 + (i % 6))}
                {i + 1}
              </text>
            </g>
          )
        })}

        {/* componentes soltos entre os chips */}
        {items.slice(0, -1).map((_, i) => {
          const cx = slot * (i + 1)
          return (
            <g key={`c-${i}`} stroke="var(--ink-3)" fill="none" strokeWidth="1.1" opacity=".65">
              {i % 2 === 0 ? (
                <>
                  <line x1={cx - 22} y1={base - 8} x2={cx - 12} y2={base - 8} />
                  <rect x={cx - 12} y={base - 13} width="24" height="10" />
                  <line x1={cx + 12} y1={base - 8} x2={cx + 22} y2={base - 8} />
                </>
              ) : (
                <path d={`M${cx - 20} ${base - 8} q5 -9 10 0 q5 9 10 0 q5 -9 10 0`} />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
