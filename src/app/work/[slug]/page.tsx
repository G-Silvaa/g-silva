import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseView from '@/components/views/CaseView'
import { projects } from '@/content/site'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.lead.pt,
    openGraph: { title: project.name, description: project.lead.pt, images: [project.image] },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  if (!projects.some((p) => p.slug === slug)) notFound()
  return <CaseView slug={slug} />
}
