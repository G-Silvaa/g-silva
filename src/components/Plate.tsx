'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LangProvider'

export interface Track {
  key: string
  title: { pt: string; en: string }
  sub: { pt: string; en: string }
  /** Linhas do terminal: [prefixo, texto, tom]. */
  lines: { pt: string[]; en: string[] }
}

/**
 * Placa de trabalho: lista de trilhas à esquerda, terminal à direita. Cada
 * trilha carrega uma sessão diferente, e as linhas entram uma a uma — o
 * terminal "digita" em vez de aparecer pronto.
 */
export default function Plate({ tracks }: { tracks: Track[] }) {
  const { t, tr } = useLang()
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lines = tr(tracks[active].lines)

  useEffect(() => {
    setTyped(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(lines.length)
      return
    }
    let n = 0
    const step = () => {
      n += 1
      setTyped(n)
      if (n < lines.length) timer.current = setTimeout(step, 320)
    }
    timer.current = setTimeout(step, 220)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [active, lines.length])

  return (
    <div className="plate">
      <div className="plate-bar">
        <span className="l">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {t('workspace')} / {tr(tracks[active].title)}
        </span>
        <span className="r">{t('ready')}</span>
      </div>

      <div className="plate-body">
        <div className="plate-side">
          <p className="hd">{t('tracks')}</p>
          {tracks.map((track, i) => (
            <button
              key={track.key}
              className={`track ${active === i ? 'is-on' : ''}`}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span className="t">{tr(track.title)}</span>
              <span className="s">{tr(track.sub)}</span>
            </button>
          ))}
        </div>

        <div className="plate-main">
          <div className="term">
            {lines.slice(0, typed).map((line, i) => {
              const done = line.startsWith('✓')
              const note = line.startsWith('·')
              return (
                <p className="row" key={i}>
                  <span className={done ? 'k ok' : 'k'}>{done ? '✓' : note ? '·' : '❯'}</span>
                  <span className={done ? 'ok' : note ? 'dim' : ''}>
                    {line.replace(/^[✓·]\s*/, '')}
                  </span>
                </p>
              )
            })}
            {typed >= lines.length ? (
              <p className="row">
                <span className="k">❯</span>
                <span className="caret" aria-hidden="true" />
              </p>
            ) : null}
          </div>

          <div className="term-foot">
            <span>
              {String(active + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}{' '}
              {t('tracks')}
            </span>
            <span className="keys">
              <button onClick={() => setActive((active + 1) % tracks.length)}>{t('next')}</button>
              <button onClick={() => setTyped(0)}>{t('replay')}</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
