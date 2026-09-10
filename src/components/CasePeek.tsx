'use client'

import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useLang } from '@/i18n/LangProvider'
import { ArrowUR, Chevron } from './Icons'

export interface PeekItem {
  key: string
  name: string
  kind: string
  image: string
  desc: string
  stack?: string[]
  href?: string
}

/**
 * Ficha do projeto aberta por cima da página.
 *
 * A imagem não aparece do nada: ela parte exatamente do retângulo da miniatura
 * que foi clicada e cresce até o lugar final. A conta é a de sempre — mede-se
 * o destino, aplica-se a transformação inversa sem transição e devolve-se ao
 * normal no quadro seguinte.
 */
export default function CasePeek({
  item,
  from,
  index,
  total,
  onClose,
  onStep,
}: {
  item: PeekItem
  from: DOMRect | null
  index: number
  total: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  const { t } = useLang()
  const figRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const fig = figRef.current
    if (!fig || !from) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const to = fig.getBoundingClientRect()
    if (!to.width || !to.height) return

    const dx = from.left + from.width / 2 - (to.left + to.width / 2)
    const dy = from.top + from.height / 2 - (to.top + to.height / 2)
    const sx = from.width / to.width
    const sy = from.height / to.height

    fig.style.transition = 'none'
    fig.style.transformOrigin = 'center'
    fig.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`

    const id = requestAnimationFrame(() => {
      fig.style.transition = 'transform .58s cubic-bezier(.32,.74,.22,1)'
      fig.style.transform = 'none'
    })
    return () => cancelAnimationFrame(id)
  }, [from, item.key])

  const step = useCallback(
    (delta: number) => {
      onStep(delta)
    },
    [onStep],
  )

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, step])

  return (
    <div
      className="peek-wrap"
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      // Qualquer clique que não tenha nascido dentro da ficha fecha. O scrim
      // cobre o grosso da área, mas a moldura de respiro do diálogo também
      // pertence ao "fora" — sem isto, clicar nela não faria nada.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button className="peek-scrim" onMouseDown={onClose} aria-label={t('close')} tabIndex={-1} />

      <div className="peek-card">
        <div className="peek-bar">
          <span>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} — {item.kind}
          </span>
          <button ref={closeRef} className="peek-x" onClick={onClose}>
            {t('close')}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="peek-body">
          <div ref={figRef} className="peek-fig">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={`${item.name} — preview`} draggable={false} />
          </div>

          <div className="peek-txt">
            <h2 className="h3">{item.name}</h2>
            <p className="micro" style={{ marginTop: 8 }}>
              {item.kind}
            </p>
            <p className="lead" style={{ marginTop: 18, fontSize: 'var(--fs-sm)' }}>
              {item.desc}
            </p>

            {item.stack?.length ? (
              <div className="peek-chips">
                {item.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            ) : null}

            {item.href ? (
              <Link href={item.href} className="btn btn--amber" style={{ marginTop: 24 }}>
                {t('viewCase')}
                <ArrowUR />
              </Link>
            ) : null}
          </div>
        </div>

        <div className="peek-nav">
          <button onClick={() => step(-1)} aria-label={t('prev')}>
            <Chevron dir="left" />
          </button>
          <button onClick={() => step(1)} aria-label={t('next')}>
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </div>
  )
}
