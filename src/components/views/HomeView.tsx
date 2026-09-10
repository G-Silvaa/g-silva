'use client'

import Link from 'next/link'
import CityStrip from '@/components/CityStrip'
import HatchBars from '@/components/HatchBars'
import { ArrowUR, Arrow } from '@/components/Icons'
import Plate from '@/components/Plate'
import Reveal from '@/components/Reveal'
import ScatterGallery from '@/components/ScatterGallery'
import TwoTone from '@/components/TwoTone'
import { explorations, hero, person, projects, stack, tracks } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function HomeView() {
  const { t, tr } = useLang()
  const years = new Date().getFullYear() - person.since
  const techCount = stack.reduce((n, g) => n + g.items.length, 0)
  // Entregue conta só o que foi até o fim — a Intranet 2 ficou pelo caminho.
  const shipped = projects.filter((p) => p.shipped !== false).length

  // Projetos e estudos dividem o mesmo plano: os projetos abrem a página do
  // case, os estudos ficam só como peça visual.
  const scatter = [
    ...projects.map((p) => ({
      key: p.slug,
      name: p.name,
      kind: tr(p.kind),
      image: p.image,
      desc: tr(p.lead),
      stack: p.stack,
      href: `/work/${p.slug}`,
    })),
    ...explorations.map((e) => ({
      key: e.name,
      name: e.name,
      kind: tr(e.kind),
      image: e.image,
      desc: tr(e.note),
      href: e.href,
    })),
  ]

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

      <CityStrip />

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

        </div>

        <div className="pad">
          <ScatterGallery items={scatter} />
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
              { n: shipped, value: String(shipped), caption: t('nProjects') },
              { n: techCount, value: `${techCount}`, caption: t('nTech') },
              { n: 2, value: '2', caption: t('nSides') },
            ]}
          />
        </div>
      </section>

    </>
  )
}
