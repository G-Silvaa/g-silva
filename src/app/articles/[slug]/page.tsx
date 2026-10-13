import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/views/ArticleView'
import { articles } from '@/content/site'

type Params = Promise<{ slug: string }>

/** Só os artigos com texto aqui dentro ganham página; os externos linkam fora. */
const local = articles.filter((a) => a.body)

export function generateStaticParams() {
  return local.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const article = local.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title.pt,
    description: article.lead.pt,
    openGraph: {
      type: 'article',
      title: article.title.pt,
      description: article.lead.pt,
      publishedTime: article.date,
      images: article.cover ? [article.cover] : undefined,
    },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  if (!local.some((a) => a.slug === slug)) notFound()
  return <ArticleView slug={slug} />
}
