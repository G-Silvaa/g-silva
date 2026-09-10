'use client'

import Link from 'next/link'
import { ArrowUR } from '@/components/Icons'
import TwoTone from '@/components/TwoTone'
import { useLang } from '@/i18n/LangProvider'

export default function NotFoundView() {
  const { t } = useLang()
  return (
    <section
      className="pad"
      style={{
        minHeight: '66vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
        paddingBlock: 'clamp(54px, 8vh, 96px)',
      }}
    >
      <p className="micro">404</p>
      <h1 className="display" style={{ maxWidth: '16ch' }}>
        <TwoTone lines={[t('notFound')]} />
      </h1>
      <p className="lead">{t('notFoundLead')}</p>
      <Link href="/" className="btn btn--amber" style={{ width: 'max-content', marginTop: 10 }}>
        {t('backHome')}
        <ArrowUR />
      </Link>
    </section>
  )
}
