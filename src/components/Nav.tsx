'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { person } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'
import { Burger, ThemeHalf } from './Icons'

const ROUTES = [
  { href: '/', key: 'navHome' },
  { href: '/work', key: 'navWork' },
  { href: '/about', key: 'navAbout' },
  { href: '/ai', key: 'navAi' },
  { href: '/articles', key: 'navArticles' },
] as const

export default function Nav() {
  const { t, lang, setLang } = useLang()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('theme-pref', next ? 'dark' : 'light')
    } catch {
      /* armazenamento bloqueado — vale só nesta sessão */
    }
  }

  const current = (href: string) =>
    (href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined

  return (
    <>
      <header className="nav">
        <Link href="/" className="wordmark" aria-label={person.name}>
          genilton<i>.</i>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 1.9vw, 26px)' }}>
          <nav className="nav-links" aria-label={t('menu')}>
            {ROUTES.map((r) => (
              <Link key={r.href} href={r.href} className="nav-link" aria-current={current(r.href)}>
                {t(r.key)}
              </Link>
            ))}
          </nav>

          <div className="lang" role="group" aria-label={t('language')}>
            <button onClick={() => setLang('pt')} aria-pressed={lang === 'pt'}>
              PT
            </button>
            <button onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
              EN
            </button>
          </div>

          <button className="theme-btn" onClick={toggleTheme} aria-label={t('theme')} title={t('theme')}>
            <ThemeHalf />
          </button>

          <Link href="/contact" className="btn btn--amber btn--sm" style={{ justifyContent: 'center' }}>
            {t('navContact')}
          </Link>

          <button
            className="burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('close') : t('menu')}
          >
            <Burger open={open} />
          </button>
        </div>
      </header>

      <div className={`sheet-menu ${open ? 'is-on' : ''}`} hidden={!open}>
        <nav>
          {[...ROUTES, { href: '/contact', key: 'navContact' as const }].map((r, i) => (
            <Link key={r.href} href={r.href}>
              {t(r.key)}
              <span>{String(i + 1).padStart(2, '0')}</span>
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <p className="micro">{person.email}</p>
          <div className="lang" style={{ display: 'inline-flex' }}>
            <button onClick={() => setLang('pt')} aria-pressed={lang === 'pt'}>
              PT
            </button>
            <button onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
              EN
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
