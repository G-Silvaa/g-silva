'use client'

import { useState } from 'react'
import { ArrowUR } from '@/components/Icons'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { person } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

/** Último trecho de uma URL de perfil, sem o identificador numérico do fim. */
function handleFrom(url: string) {
  const slug = url.replace(/\/+$/, '').split('/').pop() ?? ''
  return slug.replace(/-\d{6,}$/, '')
}

export default function ContactView() {
  const { t, tr } = useLang()
  const [copied, setCopied] = useState(false)
  const linkedin = handleFrom(person.linkedin)
  const github = handleFrom(person.github)

  async function copy() {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* sem permissão de área de transferência — o link mailto continua ali */
    }
  }

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 8vh, 96px)' }}>
        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={[t('contactA'), `*${t('contactB')}*`]} />
          </h1>
          <div>
            <p className="lead">{t('contactLead')}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <a className="btn btn--amber" href={`mailto:${person.email}`}>
                {t('emailMe')}
                <ArrowUR />
              </a>
              <button className="btn" onClick={copy}>
                {copied ? t('copied') : t('copy')}
                <ArrowUR />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <span className="tab">{t('navContact')}</span>
        <span className="corner" aria-hidden="true" />
        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <a
              href={`mailto:${person.email}`}
              className="display"
              style={{ display: 'block', wordBreak: 'break-word' }}
            >
              {person.email}
            </a>
          </Reveal>

          <Reveal delay={80}>
            <div className="foot-grid" style={{ marginTop: 'clamp(40px, 5vh, 70px)' }}>
              <div>
                <h4 className="micro" style={{ marginBottom: 14 }}>
                  LinkedIn
                </h4>
                <a className="h4" href={person.linkedin} target="_blank" rel="noreferrer noopener">
                  {linkedin ? `/${linkedin}` : 'linkedin.com'} ↗
                </a>
              </div>
              <div>
                <h4 className="micro" style={{ marginBottom: 14 }}>
                  GitHub
                </h4>
                <a className="h4" href={person.github} target="_blank" rel="noreferrer noopener">
                  {github ? `@${github}` : 'github.com'} ↗
                </a>
              </div>
              <div>
                <h4 className="micro" style={{ marginBottom: 14 }}>
                  {t('studio')}
                </h4>
                <p className="h4">{tr(person.location)}</p>
                <p className="micro" style={{ marginTop: 8 }}>
                  {tr(person.role)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
