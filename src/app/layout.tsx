import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { person } from '@/content/site'
import { LangProvider } from '@/i18n/LangProvider'

/**
 * General Sans (Indian Type Foundry, licença livre para uso em web). Os
 * arquivos ficam em `src/fonts` para o site não depender de CDN de terceiro.
 */
const sans = localFont({
  src: [
    { path: '../fonts/GeneralSans-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/GeneralSans-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/GeneralSans-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/GeneralSans-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--f-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

const description =
  'Desenvolvedor full-stack — Java, Spring Boot, Angular, Next.js e TypeScript. Projetos, stack e contato.'

export const metadata: Metadata = {
  // ⚠️ Troque pelo domínio final quando publicar.
  metadataBase: new URL('https://genilton.dev'),
  title: {
    default: `${person.name} — Desenvolvedor Full-Stack`,
    template: `%s — ${person.name}`,
  },
  description,
  authors: [{ name: person.name }],
  openGraph: {
    type: 'website',
    title: `${person.name} — Desenvolvedor Full-Stack`,
    description,
    locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#13120d' },
    { media: '(prefers-color-scheme: light)', color: '#fffcf0' },
  ],
}

/** Aplica o tema salvo antes da primeira pintura. O claro é o padrão. */
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('theme-pref')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" className={sans.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LangProvider>
          <a className="skip" href="#main">
            Ir para o conteúdo
          </a>
          <div className="sheet">
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </div>
        </LangProvider>
      </body>
    </html>
  )
}
