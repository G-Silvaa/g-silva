'use client'

import { useEffect, useRef, useState } from 'react'

export interface Bar {
  /** O número em si — a altura da barra sai daqui. */
  n: number
  /** Como o número aparece escrito ("5+", "23"). */
  value: string
  caption: string
}

/**
 * Barras com preenchimento âmbar hachurado. Só crescem quando entram na tela —
 * antes disso ficam encolhidas, então o gesto acontece à vista de quem lê.
 */
export default function HatchBars({ bars }: { bars: Bar[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  // Escala de raiz quadrada: mantém a ordem dos números sem esmagar os
  // pequenos contra o chão, e dois valores iguais dão barras iguais.
  const top = Math.sqrt(Math.max(...bars.map((b) => b.n), 1))
  const ratio = (n: number) => Math.max(0.2, Math.sqrt(Math.max(n, 0)) / top)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="bars" ref={ref}>
      {bars.map((bar, i) => (
        <div className="bar" key={bar.caption}>
          <p className="v">{bar.value}</p>
          <div
            className="fill"
            style={{
              height: shown ? `${Math.round(ratio(bar.n) * 250)}px` : '4px',
              animationDelay: `${i * 90}ms`,
              transition: 'height .9s cubic-bezier(.32,.74,.22,1)',
              transitionDelay: `${i * 90}ms`,
            }}
          />
          <p className="cap">{bar.caption}</p>
        </div>
      ))}
    </div>
  )
}
