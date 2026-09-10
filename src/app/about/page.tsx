import type { Metadata } from 'next'
import AboutView from '@/components/views/AboutView'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Desenvolvedor full-stack: backend em Java e Spring Boot, frontend em Angular, React e Next.js.',
}

export default function Page() {
  return <AboutView />
}
