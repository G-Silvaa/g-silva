import type { Metadata } from 'next'
import ContactView from '@/components/views/ContactView'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Aberto a vagas full-stack, freelas e colaborações.',
}

export default function Page() {
  return <ContactView />
}
