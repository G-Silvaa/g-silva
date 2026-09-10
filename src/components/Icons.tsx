/** Seta diagonal — o gesto padrão dos botões e links do site. */
export function ArrowUR({ className = 'ar' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M5 11L11 5M11 5H6M11 5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Seta reta, para links de leitura. */
export function Arrow({ className = 'ar' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Chevron({ dir = 'right', className = 'ar' }: { dir?: 'left' | 'right'; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={dir === 'right' ? 'M6 3l5 5-5 5' : 'M10 3L5 8l5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Círculo meio preenchido — alterna claro/escuro. */
export function ThemeHalf() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2.8a7.2 7.2 0 010 14.4z" fill="currentColor" />
    </svg>
  )
}

export function Burger({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {open ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2.5 6h11M2.5 10h11" />}
    </svg>
  )
}
