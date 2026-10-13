'use client'

import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { ArrowUR } from '@/components/Icons'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { articles, type ArticleBlock } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

/**
 * Marcação mínima dos textos: `código`, **negrito**, [texto](/link) e [3]
 * para citar a fonte 3 — que vira um link para a lista no fim da página.
 */
function inline(text: string): ReactNode {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\[\d+\])/g).map((part, i) => {
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    const cite = part.match(/^\[(\d+)\]$/)
    if (cite)
      return (
        <a key={i} className="cite" href={`#fonte-${cite[1]}`}>
          [{cite[1]}]
        </a>
      )
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link)
      return link[2].startsWith('/') ? (
        <Link key={i} href={link[2]}>
          {link[1]}
        </Link>
      ) : (
        <a key={i} href={link[2]} target="_blank" rel="noreferrer noopener">
          {link[1]}
        </a>
      )
    return <Fragment key={i}>{part}</Fragment>
  })
}

function Block({ block, fig }: { block: ArticleBlock; fig: number }) {
  switch (block.kind) {
    case 'h2':
      return <h2 className="h3">{block.text}</h2>
    case 'p':
      return <p>{inline(block.text)}</p>
    case 'list':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{inline(item)}</li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <figure>
          <pre>
            <code>{block.text}</code>
          </pre>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )
    case 'figure':
      return (
        <figure className="prose-fig">
          <div className="prose-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt} loading="lazy" />
          </div>
          <figcaption>
            Fig. {String(fig).padStart(3, '0')} — {block.caption}
          </figcaption>
        </figure>
      )
    case 'note':
      return <aside className="prose-note">{inline(block.text)}</aside>
  }
}

/** Cerca de 220 palavras por minuto, arredondado para cima. */
function readingTime(blocks: ArticleBlock[]) {
  const words = blocks
    .flatMap((b) => (b.kind === 'list' ? b.items : 'text' in b ? [b.text] : []))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.ceil(words / 220))
}

export default function ArticleView({ slug }: { slug: string }) {
  const { lang, t, tr } = useLang()
  const article = articles.find((a) => a.slug === slug)
  if (!article?.body) return null

  const blocks = tr(article.body)
  let fig = 0

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(40px, 6vh, 76px)' }}>
        <Link href="/articles" className="micro" style={{ display: 'inline-block', marginBottom: 26 }}>
          ← {t('navArticles')}
        </Link>

        <div className="sec-top" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={article.lines ? tr(article.lines) : [tr(article.title)]} />
          </h1>
          <div>
            <p className="lead">{tr(article.lead)}</p>
            <p className="micro" style={{ marginTop: 18 }}>
              {new Date(`${article.date}T12:00:00`).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
              {' · '}
              {readingTime(blocks)} {t('minRead')}
            </p>
            {article.tags?.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 18 }}>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="micro"
                    style={{ border: '1px solid var(--line-2)', padding: '5px 10px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 26 }}>
        <span className="tab">{t('articleTab')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <article className="prose">
              {blocks.map((block, i) => (
                <Block key={i} block={block} fig={block.kind === 'figure' ? ++fig : fig} />
              ))}

              {article.sources?.length ? (
                <section className="prose-sources" aria-labelledby="fontes">
                  <h2 className="micro" id="fontes">
                    {t('sources')}
                  </h2>
                  <ol>
                    {article.sources.map((source, i) => (
                      <li key={source.url} id={`fonte-${i + 1}`}>
                        <a href={source.url} target="_blank" rel="noreferrer noopener">
                          {source.title}
                        </a>
                        <span> — {source.by}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </article>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="pad" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/ai" className="btn btn--amber">
            {t('articleSeeAi')}
            <ArrowUR />
          </Link>
          <Link href="/contact" className="btn">
            {t('navContact')}
            <ArrowUR />
          </Link>
        </div>
      </section>
    </>
  )
}
