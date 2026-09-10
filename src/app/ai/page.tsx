import type { Metadata } from 'next'
import AiView from '@/components/views/AiView'

export const metadata: Metadata = {
  title: 'IA',
  description: 'Como uso IA no dia a dia de desenvolvimento — o ciclo, as regras e as ferramentas.',
}

export default function Page() {
  return <AiView />
}
