import type { Metadata } from 'next'
import ArticlesView from '@/components/views/ArticlesView'

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Notas sobre desenvolvimento full-stack — Java, Spring, Angular e React.',
}

export default function Page() {
  return <ArticlesView />
}
