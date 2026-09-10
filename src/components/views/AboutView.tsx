'use client'

import Link from 'next/link'
import { ArrowUR } from '@/components/Icons'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { about, person, stack } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function AboutView() {
  const { t, tr } = useLang()

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 8vh, 96px)' }}>
        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={[t('aboutA'), `*${t('aboutB')}*`]} />
          </h1>
          <div>
            <p className="lead">{tr(about.intro)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <a href={person.linkedin} target="_blank" rel="noreferrer noopener" className="btn btn--amber">
                LinkedIn
                <ArrowUR />
              </a>
              <Link href="/contact" className="btn">
                {t('navContact')}
                <ArrowUR />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <span className="tab">{t('navAbout')}</span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <p className="lead" style={{ maxWidth: '64ch', fontSize: 'var(--fs-h4)', color: 'var(--ink)' }}>
              {tr(about.body)}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <span className="tab">
          {stack.reduce((n, g) => n + g.items.length, 0)} {t('countTech')}
        </span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('stackTitle')]} />
              </h2>
              <p className="lead">{t('stackLead')}</p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid4">
              {stack.map((group) => (
                <div key={group.group.en}>
                  <h3>{tr(group.group)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <span className="tab">
          {person.since} — {new Date().getFullYear()}
        </span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('path')]} />
              </h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="tl">
              {about.timeline.map((row) => (
                <div className="tl-row" key={row.period.en}>
                  <p className="per">{tr(row.period)}</p>
                  <div>
                    <h3 className="h4">{tr(row.role)}</h3>
                    <p className="micro" style={{ marginTop: 6 }}>
                      {tr(row.org)}
                    </p>
                    <p>{tr(row.note)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
