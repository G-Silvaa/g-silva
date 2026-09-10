'use client'

import Link from 'next/link'
import { ArrowUR } from '@/components/Icons'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { articles } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function ArticlesView() {
  const { t, tr } = useLang()

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 8vh, 96px)' }}>
        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={[t('articlesA'), `*${t('articlesB')}*`]} />
          </h1>
          <div>
            <p className="lead">{t('articlesLead')}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <Link href="/work" className="btn btn--amber">
                {t('allWork')}
                <ArrowUR />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <span className="tab">
          {String(articles.length).padStart(2, '0')} {t('navArticles')}
        </span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          {articles.length === 0 ? (
            <Reveal>
              {/* Enquanto não houver texto, a seção diz isso em vez de ficar em branco. */}
              <div className="empty">
                <p className="h3">{t('articlesEmpty')}</p>
                <p className="lead" style={{ marginTop: 14 }}>
                  {t('articlesSoon')}
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="work">
              {articles.map((article, i) => {
                const inner = (
                  <>
                    <span className="no">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="nm">{tr(article.title)}</span>
                      <span className="kd">
                        {new Date(article.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                    <span>
                      <span className="desc" style={{ display: 'block' }}>
                        {tr(article.lead)}
                      </span>
                    </span>
                    <span className="open">
                      {t('viewCase')}
                      <ArrowUR />
                    </span>
                  </>
                )
                return article.href ? (
                  <a
                    key={article.slug}
                    className="work-row"
                    href={article.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={article.slug} className="work-row">
                    {inner}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
