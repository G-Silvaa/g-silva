'use client'

import Link from 'next/link'
import Explorations from '@/components/Explorations'
import { ArrowUR } from '@/components/Icons'
import ProjectList from '@/components/ProjectList'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { explorations, person, projects } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function WorkView() {
  const { t } = useLang()

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 8vh, 96px)' }}>
        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={[t('workA'), `*${t('workB')}*`]} />
          </h1>
          <div>
            <p className="lead">{t('workPageLead')}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <a href={`mailto:${person.email}`} className="btn btn--amber">
                {t('emailMe')}
                <ArrowUR />
              </a>
              <Link href="/about" className="btn">
                {t('aboutMe')}
                <ArrowUR />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 26 }}>
        <span className="tab">
          {String(projects.length).padStart(2, '0')} {t('countProjects')}
        </span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
          <ProjectList projects={projects} />
        </div>
      </section>

      <section className="sec">
        <span className="tab">{t('explorations')}</span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
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
