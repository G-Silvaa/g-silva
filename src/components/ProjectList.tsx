'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'
import { ArrowUR } from './Icons'

/**
 * Lista de projetos na apresentação do gionatannese.com: número, nome grande,
 * categoria e o parágrafo que explica o projeto — sem carrossel, sem grade de
 * cartões. A miniatura acompanha o cursor só onde existe cursor de verdade.
 */
export default function ProjectList({ projects }: { projects: Project[] }) {
  const { t, tr } = useLang()
  const [peek, setPeek] = useState<{ src: string; x: number; y: number } | null>(null)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const track = (src: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => setPeek({ src, x: clientX, y: clientY }))
  }

  return (
    <>
      <div className="work">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="work-row"
            onPointerMove={track(project.image)}
            onPointerLeave={() => setPeek(null)}
          >
            <span className="no">{String(i + 1).padStart(2, '0')}</span>

            <span>
              <span className="nm">{project.name}</span>
              <span className="kd">
                {tr(project.kind)} · {project.year}
              </span>
            </span>

            <span>
              <span className="desc" style={{ display: 'block' }}>
                {tr(project.lead)}
              </span>
              <span className="chips">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </span>
            </span>

            <span className="open">
              {t('viewCase')}
              <ArrowUR />
            </span>
          </Link>
        ))}
      </div>

      <div
        className={`peek ${peek ? 'is-on' : ''}`}
        style={peek ? { left: peek.x, top: peek.y } : undefined}
        aria-hidden="true"
      >
        {peek ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={peek.src} alt="" />
        ) : null}
      </div>
    </>
  )
}
