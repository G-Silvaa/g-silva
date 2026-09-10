'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/**
 * Revela o conteúdo quando ele entra na viewport. Observa uma vez e desliga —
 * não há custo depois que o elemento já apareceu.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.style.transitionDelay = `${delay}ms`
        el.classList.add('is-in')
        io.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()}>
      {children}
    </Tag>
  )
}
