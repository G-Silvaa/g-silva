'use client'

import Link from 'next/link'
import Explorations from '@/components/Explorations'
import HatchBars from '@/components/HatchBars'
import { ArrowUR, Arrow } from '@/components/Icons'
import Plate from '@/components/Plate'
import ProjectList from '@/components/ProjectList'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { explorations, hero, person, projects, stack, tracks } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function HomeView() {
  const { t, tr } = useLang()
  const years = new Date().getFullYear() - person.since
  const techCount = stack.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      {/* ── Abertura ────────────────────────────────────────────────────── */}
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 9vh, 110px)' }}>
        <div className="sec-top sec-top--hero" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={tr(hero.lines)} />
          </h1>

          <div>
            <p className="lead">{tr(hero.lead)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Link href="/work" className="btn btn--amber">
                {t('allWork')}
                <ArrowUR />
              </Link>
              <Link href="/about" className="btn">
                {t('aboutMe')}
                <ArrowUR />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bancada ─────────────────────────────────────────────────────── */}
      <section className="sec" style={{ paddingBottom: 'clamp(46px, 6vh, 70px)' }}>
        <span className="tab">{t('workspace')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 26 }}>
          <Reveal>
            <Plate tracks={tracks} />
            <p className="fig">
              <span>
                Fig. 001 — {t('tracks')}, {t('workspace')}
              </span>
              <span>{tracks.map((tk) => tr(tk.title)).join(', ')}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Projetos, à moda do gionatannese ────────────────────────────── */}
      <section className="sec">
        <span className="tab">{t('navWork')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 20 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('workA'), `*${t('workB')}*`]} />
              </h2>
              <p className="lead">{t('selectedWorkLead')}</p>
              <Link href="/work" className="ln">
                {t('allWork')}
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <ProjectList projects={projects} />
          </Reveal>
        </div>
      </section>

      {/* ── Em números ──────────────────────────────────────────────────── */}
      <section className="sec">
        <span className="tab">{t('numbersTab')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 20 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('numbersA'), `*${t('numbersB')}*`]} />
              </h2>
              <p className="lead">{t('numbersLead')}</p>
              <Link href="/about" className="ln">
                {t('readProfile')}
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <HatchBars
            bars={[
              { n: years, value: `${years}+`, caption: t('nYears') },
              { n: projects.length, value: `${projects.length}+`, caption: t('nProjects') },
              { n: techCount, value: `${techCount}`, caption: t('nTech') },
              { n: 2, value: '2', caption: t('nSides') },
            ]}
          />
        </div>
      </section>

      {/* ── Estudos ─────────────────────────────────────────────────────── */}
      <section className="sec">
        <span className="tab">{t('explorations')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 20 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('explorations')]} />
              </h2>
              <p className="lead">{t('explorationsLead')}</p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <Explorations items={explorations} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
