'use client'

import Link from 'next/link'
import { ArrowUR, Chevron } from '@/components/Icons'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { projects } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function CaseView({ slug }: { slug: string }) {
  const { t, tr } = useLang()
  const i = projects.findIndex((p) => p.slug === slug)
  const project = projects[i]
  if (!project) return null

  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(40px, 6vh, 76px)' }}>
        <Link href="/work" className="micro" style={{ display: 'inline-block', marginBottom: 26 }}>
          ← {t('navWork')}
        </Link>

        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={[project.name, `*${tr(project.kind)}*`]} />
          </h1>
          <div>
            <p className="lead">{tr(project.lead)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              {project.live ? (
                <a className="btn btn--amber" href={project.live} target="_blank" rel="noreferrer noopener">
                  Live
                  <ArrowUR />
                </a>
              ) : null}
              {project.repo ? (
                <a className="btn" href={project.repo} target="_blank" rel="noreferrer noopener">
                  {t('code')}
                  <ArrowUR />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 26 }}>
        <span className="tab">{project.year}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div style={{ border: '1px solid var(--line)', background: 'var(--tile)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.name} — preview`} style={{ width: '100%' }} />
            </div>
            <p className="fig">
              <span>Fig. 001 — {project.name}</span>
              <span>{project.stack.join(' · ')}</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(24px, 4vw, 70px)',
                marginTop: 'clamp(34px, 4vh, 56px)',
                alignItems: 'start',
              }}
            >
              <div>
                <p className="micro" style={{ marginBottom: 12 }}>
                  {t('builtWith')}
                </p>
                <div className="work-row chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 0, border: 0 }}>
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="micro"
                      style={{ border: '1px solid var(--line-2)', padding: '5px 10px' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p className="lead" style={{ maxWidth: '58ch' }}>
                {tr(project.body)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="pad" style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
          <Link href={`/work/${prev.slug}`} className="ln">
            <Chevron dir="left" />
            {prev.name}
          </Link>
          <Link href={`/work/${next.slug}`} className="ln">
            {next.name}
            <Chevron dir="right" />
          </Link>
        </div>
      </section>
    </>
  )
}
