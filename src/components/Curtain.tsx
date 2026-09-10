'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { person, projects } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

const COLS = 8
const COVER_MS = 880
const REVEAL_MS = 850
const BOOT_MS = 1100

type Phase = 'boot' | 'cover' | 'reveal' | 'idle'

/**
 * Cortina de passagem entre páginas.
 *
 * Oito colunas sobem e cobrem a tela, o nome do destino aparece no meio, e as
 * colunas seguem subindo até sair — o gesto é de uma folha passando, não de um
 * fade. Na primeira visita a cortina já está no lugar e mostra a marca.
 *
 * Os cliques em links internos são interceptados: a cortina fecha primeiro e
 * só então a rota muda, senão a página nova apareceria por baixo antes da hora.
 */
export default function Curtain() {
  const { t } = useLang()
  const router = useRouter()
  const pathname = usePathname()

  const [phase, setPhase] = useState<Phase>('boot')
  const [label, setLabel] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  // Rota que a cortina está indo cobrir; enquanto existir, a mudança de
  // pathname é nossa e deve terminar em "revelar".
  const going = useRef<string | null>(null)

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  /** O nome que a cortina anuncia para cada rota. */
  const labelFor = useCallback(
    (path: string) => {
      if (path === '/') return t('navHome')
      if (path === '/about') return t('navAbout')
      if (path === '/contact') return t('navContact')
      if (path === '/articles') return t('navArticles')
      if (path === '/ai') return t('navAi')
      if (path === '/work') return t('selectedWork')
      const slug = path.startsWith('/work/') ? path.slice(6) : null
      const found = slug ? projects.find((p) => p.slug === slug) : null
      return found ? found.name : t('navWork')
    },
    [t],
  )

  // Abertura: a cortina já entra coberta e sai sozinha.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('idle')
      return
    }
    setLabel(null)
    later(() => setPhase('reveal'), BOOT_MS)
    later(() => setPhase('idle'), BOOT_MS + REVEAL_MS)
    return clearTimers
  }, [])

  // Chegou na rota nova: levanta a cortina.
  useEffect(() => {
    if (going.current === null || going.current !== pathname) return
    going.current = null
    clearTimers()
    setPhase('reveal')
    later(() => setPhase('idle'), REVEAL_MS)
  }, [pathname])

  // Intercepta o clique para fechar antes de trocar de rota.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const link = (e.target as Element | null)?.closest?.('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/')) return
      if (link.target && link.target !== '_self') return
      if (link.hasAttribute('download')) return

      const dest = href.split('#')[0].split('?')[0]
      if (dest === pathname) return

      // Captura + stopPropagation: o onClick do <Link> do Next fica no
      // contêiner raiz do React e roda ANTES de um ouvinte de borbulha no
      // document — a rota já teria trocado. Na captura chegamos primeiro.
      e.preventDefault()
      e.stopPropagation()
      clearTimers()
      going.current = dest
      setLabel(labelFor(dest))
      setPhase('cover')
      later(() => router.push(href), COVER_MS)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, router, labelFor])

  useEffect(() => clearTimers, [])

  const covered = phase === 'boot' || phase === 'cover'

  return (
    <div className={`curtain is-${phase}`} aria-hidden="true">
      {Array.from({ length: COLS }, (_, i) => (
        <span key={i} className="curtain-col" style={{ '--i': i } as React.CSSProperties} />
      ))}

      <span className="curtain-label" data-on={covered ? 'true' : 'false'}>
        {/* Um único filho: o rótulo é um grid centrado, e dois filhos soltos
            virariam duas linhas — o ponto final cairia embaixo do nome. */}
        <span>
          {label ?? person.name.toLowerCase().split(' ')[0]}
          <i>.</i>
        </span>
      </span>
    </div>
  )
}
