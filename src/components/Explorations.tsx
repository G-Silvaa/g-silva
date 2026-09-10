'use client'

import type { Exploration } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

/** Lista enxuta de estudos — nome e categoria, no formato do gionatannese. */
export default function Explorations({ items }: { items: Exploration[] }) {
  const { tr } = useLang()
  return (
    <div className="expl">
      {items.map((item) =>
        item.href ? (
          <a key={item.name} className="expl-row" href={item.href} target="_blank" rel="noreferrer noopener">
            <span className="nm">{item.name}</span>
            <span className="kd">— {tr(item.kind)}</span>
          </a>
        ) : (
          <div key={item.name} className="expl-row">
            <span className="nm">{item.name}</span>
            <span className="kd">— {tr(item.kind)}</span>
          </div>
        ),
      )}
    </div>
  )
}
