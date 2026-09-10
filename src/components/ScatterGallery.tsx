'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'
import CasePeek from './CasePeek'

export interface ScatterItem {
  key: string
  name: string
  kind: string
  image: string
  /** Texto da ficha que abre no clique. */
  desc: string
  stack?: string[]
  href?: string
}

/**
 * Miniaturas soltas num plano aberto. O conjunto flutua de leve sozinho,
 * acompanha o cursor com um deslocamento pequeno e pode ser arrastado — a
 * ideia é dar a sensação de vasculhar uma mesa, não de ler uma grade.
 *
 * Em telas de toque, e para quem pediu menos movimento, o plano vira uma
 * grade quieta: mesma informação, sem flutuação nem arrasto.
 */

/**
 * Posições em % do plano, escolhidas à mão. O cluster ocupa a faixa central
 * na vertical e alterna tamanhos para não virar uma fileira.
 */
const SLOTS = [
  { x: 26, y: 32, w: 132, ratio: 1.3 },
  { x: 42, y: 22, w: 118, ratio: 1.34 },
  { x: 56, y: 36, w: 104, ratio: 0.78 },
  { x: 70, y: 25, w: 92, ratio: 0.74 },
  { x: 80, y: 44, w: 112, ratio: 1.28 },
  { x: 31, y: 61, w: 108, ratio: 0.8 },
  { x: 46, y: 72, w: 130, ratio: 1.32 },
  { x: 64, y: 64, w: 98, ratio: 0.76 },
  { x: 17, y: 48, w: 84, ratio: 0.8 },
  { x: 55, y: 52, w: 76, ratio: 0.72 },
]

export default function ScatterGallery({ items }: { items: ScatterItem[] }) {
  const { t } = useLang()
  const stageRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const [still, setStill] = useState(true)
  const [hover, setHover] = useState<number | null>(null)
  // A ficha guarda o retângulo da miniatura clicada: é dele que a imagem cresce.
  const [peek, setPeek] = useState<{ index: number; from: DOMRect | null } | null>(null)

  /**
   * Arrastar uma peça é diferente de arrastar o plano: aqui só ela se move, e
   * soltar abre a ficha — que nasce exatamente de onde a peça foi largada.
   */
  const itemDrag = useRef<{
    index: number
    el: HTMLElement
    startX: number
    startY: number
    moved: boolean
  } | null>(null)
  // Depois de soltar, o navegador ainda dispara um `click`; sem esta marca a
  // ficha abriria duas vezes.
  const handledByPointer = useRef(false)

  const openPeek = useCallback((index: number, el: HTMLElement | null) => {
    const shot = el?.querySelector('.shot')
    setPeek({ index, from: shot ? shot.getBoundingClientRect() : null })
  }, [])

  function onItemDown(i: number, e: React.PointerEvent<HTMLButtonElement>) {
    if (still || e.pointerType === 'touch') return
    e.stopPropagation() // o palco não deve começar a panorâmica junto
    const el = e.currentTarget
    itemDrag.current = { index: i, el, startX: e.clientX, startY: e.clientY, moved: false }
    el.setPointerCapture(e.pointerId)
  }

  function onItemMove(e: React.PointerEvent<HTMLButtonElement>) {
    const d = itemDrag.current
    if (!d) return
    e.stopPropagation()
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved && Math.abs(dx) + Math.abs(dy) > 4) {
      d.moved = true
      d.el.classList.add('is-lifted')
    }
    // `translate` é uma propriedade à parte do `transform` que centra a peça,
    // então dá para deslocá-la sem desfazer o `translate(-50%, -50%)`.
    if (d.moved) d.el.style.translate = `${dx}px ${dy}px`
  }

  function onItemUp(e: React.PointerEvent<HTMLButtonElement>) {
    const d = itemDrag.current
    if (!d) return
    e.stopPropagation()
    itemDrag.current = null
    d.el.releasePointerCapture?.(e.pointerId)
    handledByPointer.current = true

    // Mede antes de devolver a peça ao lugar: a ficha cresce de onde ela está.
    openPeek(d.index, d.el)
    d.el.classList.remove('is-lifted')
    d.el.style.translate = ''
  }

  function onItemCancel(e: React.PointerEvent<HTMLButtonElement>) {
    const d = itemDrag.current
    if (!d) return
    itemDrag.current = null
    d.el.releasePointerCapture?.(e.pointerId)
    d.el.classList.remove('is-lifted')
    d.el.style.translate = ''
  }

  useEffect(() => {
    // Largura entra na conta junto com o ponteiro: numa janela estreita de
    // desktop o plano solto também não teria espaço para respirar.
    const mq = window.matchMedia(
      '(max-width: 860px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)',
    )
    const apply = () => setStill(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Deslocamento do plano = o que já foi arrastado + o empurrãozinho do cursor.
  const drag = useRef({ x: 0, y: 0 })
  const push = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  const paint = useCallback(() => {
    const plane = planeRef.current
    if (!plane) return
    plane.style.transform = `translate3d(${drag.current.x + push.current.x}px, ${
      drag.current.y + push.current.y
    }px, 0)`
  }, [])

  const schedule = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(paint)
  }, [paint])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  useEffect(() => {
    if (still) {
      drag.current = { x: 0, y: 0 }
      push.current = { x: 0, y: 0 }
      paint()
    }
  }, [still, paint])

  const pointer = useRef<{ id: number; x: number; y: number } | null>(null)
  const moved = useRef(false)

  // A captura do ponteiro só é pedida quando o arrasto realmente começa: com
  // ela ativa desde o pointerdown, o `click` seria entregue ao palco em vez da
  // miniatura, e abrir a ficha com um clique simples deixaria de funcionar.
  const captured = useRef(false)

  function onDown(e: React.PointerEvent) {
    if (still || e.pointerType === 'touch' || itemDrag.current) return
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
    moved.current = false
    captured.current = false
  }

  function onMove(e: React.PointerEvent) {
    if (still || itemDrag.current) return
    const stage = stageRef.current
    if (!stage) return

    if (pointer.current && pointer.current.id === e.pointerId) {
      const dx = e.clientX - pointer.current.x
      const dy = e.clientY - pointer.current.y
      if (Math.abs(dx) + Math.abs(dy) > 5 && !moved.current) {
        moved.current = true
        captured.current = true
        stage.setPointerCapture(e.pointerId)
        stage.classList.add('is-drag')
      }
      if (!moved.current) return
      drag.current = { x: drag.current.x + dx, y: drag.current.y + dy }
      pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
      // Não deixa o cluster sair de vista.
      drag.current.x = Math.max(-260, Math.min(260, drag.current.x))
      drag.current.y = Math.max(-160, Math.min(160, drag.current.y))
      schedule()
      return
    }

    const box = stage.getBoundingClientRect()
    push.current = {
      x: ((e.clientX - box.left) / box.width - 0.5) * -34,
      y: ((e.clientY - box.top) / box.height - 0.5) * -22,
    }
    schedule()
  }

  function endDrag(e: React.PointerEvent) {
    if (!pointer.current || pointer.current.id !== e.pointerId) return
    pointer.current = null
    if (captured.current) {
      stageRef.current?.releasePointerCapture?.(e.pointerId)
      captured.current = false
    }
    stageRef.current?.classList.remove('is-drag')
  }

  return (
    <div
      ref={stageRef}
      className={`scatter ${still ? 'is-still' : ''}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        if (still) return
        push.current = { x: 0, y: 0 }
        schedule()
      }}
      // Um arrasto que termina em cima de uma miniatura não vira navegação.
      onClickCapture={(e) => {
        if (!moved.current) return
        moved.current = false
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <div ref={planeRef} className="scatter-plane">
        {items.map((item, i) => {
          const slot = SLOTS[i % SLOTS.length]
          const body = (
            <>
              <span className="shot" style={{ aspectRatio: String(slot.ratio) }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" draggable={false} loading={i < 4 ? 'eager' : 'lazy'} />
              </span>
              <span className="lb">
                <span className="nm">{item.name}</span>
                <span className="kd">{item.kind}</span>
              </span>
            </>
          )

          const style = {
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: slot.w,
            // cada peça flutua no seu próprio compasso
            animationDuration: `${9 + (i % 5) * 1.7}s`,
            animationDelay: `${-i * 1.3}s`,
            zIndex: hover === i ? 20 : 10 - (i % 4),
          }

          return (
            <button
              key={item.key}
              type="button"
              className={`scatter-item ${hover === i ? 'is-on' : ''}`}
              style={style}
              aria-label={`${item.name} — ${item.kind}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onPointerDown={(e) => onItemDown(i, e)}
              onPointerMove={onItemMove}
              onPointerUp={onItemUp}
              onPointerCancel={onItemCancel}
              onClick={(e) => {
                // O caminho do ponteiro já resolveu; aqui sobra o teclado e o toque.
                if (handledByPointer.current) {
                  handledByPointer.current = false
                  return
                }
                if (moved.current) return
                openPeek(i, e.currentTarget)
              }}
            >
              {body}
            </button>
          )
        })}
      </div>

      <p className="scatter-count">{String(items.length).padStart(3, '0')}</p>
      <p className="scatter-hint">{still ? t('tapToOpen') : t('dragToExplore')}</p>

      {peek ? (
        <CasePeek
          item={items[peek.index]}
          from={peek.from}
          index={peek.index}
          total={items.length}
          onClose={() => setPeek(null)}
          onStep={(delta) =>
            setPeek((cur) =>
              cur
                ? { index: (cur.index + delta + items.length) % items.length, from: null }
                : cur,
            )
          }
        />
      ) : null}
    </div>
  )
}
