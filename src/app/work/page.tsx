import type { Metadata } from 'next'
import WorkView from '@/components/views/WorkView'

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Projetos full-stack em Java, Spring Boot, Angular, Next.js e TypeScript — do banco de dados à interface.',
}

export default function Page() {
  return <WorkView />
}
