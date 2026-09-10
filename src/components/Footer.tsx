'use client'

import Link from 'next/link'
import { person, stack } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'
import ToolStrip from './ToolStrip'

export default function Footer() {
  const { t, tr } = useLang()

  return (
    <footer className="foot">
      <div className="pad">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(30px, 4vh, 48px)' }}>
          <Link href="/work" className="btn btn--amber" style={{ minWidth: 240 }}>
            {t('explorePortfolio')}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <p
          className="micro"
          style={{ textAlign: 'center', marginBottom: 14, color: 'var(--ink-2)' }}
        >
          <span className="amber-txt">02</span>&nbsp;&nbsp;{t('dailyKit')}
        </p>
        <ToolStrip items={['Java', 'Spring', 'Angular', 'Next.js', 'Postgres', 'Docker']} />

        <div className="foot-grid" style={{ marginTop: 'clamp(34px, 4vh, 54px)' }}>
          <div>
            <h4>{t('navContact')}</h4>
            <a className="mail" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <p>{t('getInTouch')}</p>
            <p>{t('replyWithin')}</p>
          </div>

          <div>
            <h4>{t('sitemap')}</h4>
            <Link href="/">{t('navHome')}</Link>
            <Link href="/work">{t('navWork')}</Link>
            <Link href="/about">{t('navAbout')}</Link>
            <Link href="/ai">{t('navAi')}</Link>
            <Link href="/articles">{t('navArticles')}</Link>
            <Link href="/contact">{t('navContact')}</Link>
          </div>

          <div>
            <h4>{t('elsewhere')}</h4>
            <a href={person.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn ↗
            </a>
            <a href={person.github} target="_blank" rel="noreferrer noopener">
              GitHub ↗
            </a>
            <a href={`mailto:${person.email}`}>E-mail ↗</a>
          </div>

          <div>
            <h4>{t('studio')}</h4>
            <p>{tr(person.location)}</p>
            <p>{stack.map((g) => tr(g.group)).join(' · ')}</p>
          </div>
        </div>

        <div className="foot-bar">
          <span>
            © {new Date().getFullYear()} {person.name} — {t('rights')}
          </span>
          <span>{tr(person.role)}</span>
        </div>
      </div>
    </footer>
  )
}
