'use client'

import { useLang } from '@/i18n/LangProvider'

/**
 * Faixa de cidade em traço fino, desenhada aqui mesmo.
 *
 * A composição sai de um gerador com semente fixa: o desenho é sempre o mesmo
 * (o servidor e o cliente precisam concordar na hidratação), mas as alturas,
 * as janelas e o mobiliário de rua têm variação suficiente para não parecer
 * um padrão repetido.
 */

const W = 1400
const H = 210
const GROUND = 176

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

const r1 = (n: number) => Math.round(n * 10) / 10

interface Piece {
  kind: 'block' | 'tree' | 'lamp' | 'bench' | 'bike' | 'hydrant'
  x: number
  w: number
}

/** Distribui prédios e mobiliário ao longo da rua até preencher a largura. */
function layout(): Piece[] {
  const rand = makeRng(20260910)
  const pieces: Piece[] = []
  let x = -14

  while (x < W + 20) {
    const roll = rand()
    if (roll < 0.56) {
      const w = 46 + rand() * 74
      pieces.push({ kind: 'block', x, w })
      x += w + 4 + rand() * 12
    } else if (roll < 0.72) {
      pieces.push({ kind: 'tree', x, w: 34 })
      x += 34 + rand() * 20
    } else if (roll < 0.83) {
      pieces.push({ kind: 'lamp', x, w: 20 })
      x += 20 + rand() * 26
    } else if (roll < 0.89) {
      pieces.push({ kind: 'bench', x, w: 40 })
      x += 40 + rand() * 24
    } else if (roll < 0.975) {
      pieces.push({ kind: 'bike', x, w: 38 })
      x += 38 + rand() * 26
    } else {
      pieces.push({ kind: 'hydrant', x, w: 14 })
      x += 14 + rand() * 30
    }
  }
  return pieces
}

function Block({ x, w, rand }: { x: number; w: number; rand: () => number }) {
  const h = 52 + rand() * 96
  const y = GROUND - h
  const cols = Math.max(2, Math.floor(w / 17))
  const rows = Math.max(2, Math.floor(h / 20))
  const roof = rand()
  const windows: React.ReactElement[] = []

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if (rand() < 0.22) continue
      const wx = x + 7 + c * ((w - 14) / cols)
      const wy = y + 11 + r * ((h - 18) / rows)
      const ww = Math.max(4, (w - 14) / cols - 5)
      const wh = Math.max(5, (h - 18) / rows - 7)
      const lit = rand() < 0.07
      windows.push(
        <rect
          key={`${c}-${r}`}
          x={r1(wx)}
          y={r1(wy)}
          width={r1(ww)}
          height={r1(wh)}
          fill={lit ? 'var(--amber)' : 'none'}
          stroke={lit ? 'none' : 'currentColor'}
          strokeWidth="0.9"
          opacity={lit ? 0.9 : 0.55}
        />,
      )
    }
  }

  return (
    <g>
      <rect x={r1(x)} y={r1(y)} width={r1(w)} height={r1(h)} fill="none" stroke="currentColor" strokeWidth="1.1" />
      {windows}
      {/* remate do telhado: platibanda, caixa d'água ou antena */}
      {roof < 0.34 ? (
        <rect x={r1(x - 3)} y={r1(y - 4)} width={r1(w + 6)} height="4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      ) : roof < 0.6 ? (
        <>
          <rect x={r1(x + w * 0.3)} y={r1(y - 13)} width={r1(w * 0.3)} height="13" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <line x1={r1(x + w * 0.3)} y1={r1(y - 8)} x2={r1(x + w * 0.6)} y2={r1(y - 8)} stroke="currentColor" strokeWidth="0.9" />
        </>
      ) : roof < 0.78 ? (
        <>
          <line x1={r1(x + w / 2)} y1={r1(y)} x2={r1(x + w / 2)} y2={r1(y - 22)} stroke="currentColor" strokeWidth="1.1" />
          <line x1={r1(x + w / 2 - 6)} y1={r1(y - 16)} x2={r1(x + w / 2 + 6)} y2={r1(y - 16)} stroke="currentColor" strokeWidth="0.9" />
          <circle cx={r1(x + w / 2)} cy={r1(y - 24)} r="2" fill="var(--amber)" />
        </>
      ) : null}
    </g>
  )
}

function Tree({ x }: { x: number }) {
  const cx = x + 17
  return (
    <g>
      <line x1={r1(cx)} y1={GROUND} x2={r1(cx)} y2={GROUND - 26} stroke="currentColor" strokeWidth="1.2" />
      <circle cx={r1(cx)} cy={GROUND - 36} r="15" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx={r1(cx - 9)} cy={GROUND - 28} r="9" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx={r1(cx + 9)} cy={GROUND - 29} r="8" fill="none" stroke="currentColor" strokeWidth="1.1" />
    </g>
  )
}

function Lamp({ x }: { x: number }) {
  const cx = x + 10
  return (
    <g>
      <line x1={r1(cx)} y1={GROUND} x2={r1(cx)} y2={GROUND - 44} stroke="currentColor" strokeWidth="1.2" />
      <path d={`M${r1(cx)} ${GROUND - 44} q0 -8 9 -8`} fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx={r1(cx + 9)} cy={GROUND - 50} r="3.2" fill="var(--amber)" />
    </g>
  )
}

function Bench({ x }: { x: number }) {
  return (
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      <line x1={r1(x)} y1={GROUND - 12} x2={r1(x + 34)} y2={GROUND - 12} />
      <line x1={r1(x + 2)} y1={GROUND - 20} x2={r1(x + 32)} y2={GROUND - 20} />
      <line x1={r1(x + 4)} y1={GROUND - 12} x2={r1(x + 4)} y2={GROUND} />
      <line x1={r1(x + 30)} y1={GROUND - 12} x2={r1(x + 30)} y2={GROUND} />
    </g>
  )
}

function Bike({ x }: { x: number }) {
  return (
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      <circle cx={r1(x + 8)} cy={GROUND - 8} r="8" />
      <circle cx={r1(x + 30)} cy={GROUND - 8} r="8" />
      <path d={`M${r1(x + 8)} ${GROUND - 8} L${r1(x + 17)} ${GROUND - 22} L${r1(x + 30)} ${GROUND - 8}`} />
      <line x1={r1(x + 17)} y1={GROUND - 22} x2={r1(x + 26)} y2={GROUND - 22} />
      <line x1={r1(x + 17)} y1={GROUND - 22} x2={r1(x + 19)} y2={GROUND - 8} />
    </g>
  )
}

function Hydrant({ x }: { x: number }) {
  return (
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      <rect x={r1(x + 3)} y={GROUND - 14} width="8" height="14" />
      <line x1={r1(x + 1)} y1={GROUND - 10} x2={r1(x + 13)} y2={GROUND - 10} />
      <line x1={r1(x + 5)} y1={GROUND - 17} x2={r1(x + 9)} y2={GROUND - 17} />
    </g>
  )
}

/**
 * O caminhante.
 *
 * Braços e pernas são desenhados na vertical e balançam por rotação em torno
 * do ombro e do quadril — por isso cada membro tem o seu `transform-origin`
 * declarado no CSS. Passar o cursor pausa a caminhada e abre o balão.
 */
function Walker({ greeting }: { greeting: string }) {
  return (
    <g className="walker" transform="translate(120,0)">
      <g className="walker-travel">
        <g className="walker-body">
          {/* área de alcance do cursor, bem maior que o traço */}
          <rect
            x={-18}
            y={GROUND - 68}
            width={54}
            height={72}
            fill="transparent"
            pointerEvents="all"
          />

          <g className="hi">
            <rect x={8} y={GROUND - 66} width={36} height={21} rx="2" fill="var(--amber)" />
            <path d={`M14 ${GROUND - 45} l0 7 l8 -7 z`} fill="var(--amber)" />
            <text
              x={26}
              y={GROUND - 51}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--on-amber)"
            >
              {greeting}
            </text>
          </g>

          <g stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round">
            <circle cx="0" cy={GROUND - 34} r="4" />
            <line x1="0" y1={GROUND - 30} x2="0" y2={GROUND - 15} />
            <line className="limb arm-a" x1="0" y1={GROUND - 27} x2="0" y2={GROUND - 17} />
            <line className="limb arm-b" x1="0" y1={GROUND - 27} x2="0" y2={GROUND - 17} />
            <line className="limb leg-a" x1="0" y1={GROUND - 15} x2="0" y2={GROUND} />
            <line className="limb leg-b" x1="0" y1={GROUND - 15} x2="0" y2={GROUND} />
          </g>
        </g>
      </g>
    </g>
  )
}

export default function CityStrip() {
  const { t } = useLang()
  const pieces = layout()
  const rand = makeRng(776611)

  return (
    <div className="city" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ color: 'var(--ink-3)' }}>
        {pieces.map((piece, i) => {
          switch (piece.kind) {
            case 'block':
              return <Block key={i} x={piece.x} w={piece.w} rand={rand} />
            case 'tree':
              return <Tree key={i} x={piece.x} />
            case 'lamp':
              return <Lamp key={i} x={piece.x} />
            case 'bench':
              return <Bench key={i} x={piece.x} />
            case 'bike':
              return <Bike key={i} x={piece.x} />
            default:
              return <Hydrant key={i} x={piece.x} />
          }
        })}

        {/* calçada */}
        <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="currentColor" strokeWidth="1.3" />
        <line x1="0" y1={GROUND + 7} x2={W} y2={GROUND + 7} stroke="currentColor" strokeWidth="0.8" opacity=".45" />
        {Array.from({ length: Math.floor(W / 26) }, (_, i) => (
          <line
            key={`t-${i}`}
            x1={i * 26}
            y1={GROUND}
            x2={i * 26}
            y2={GROUND + 7}
            stroke="currentColor"
            strokeWidth="0.7"
            opacity=".35"
          />
        ))}

        <Walker greeting={t('hi')} />
      </svg>
    </div>
  )
}
