'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '@/content/site'
import { ui, type UiKey } from './dict'

const STORAGE_KEY = 'lang-pref'

interface LangValue {
  lang: Locale
  setLang: (l: Locale) => void
  /** String de interface pela chave do dicionário. */
  t: (key: UiKey) => string
  /** Campo bilíngue vindo do conteúdo. */
  tr: <V>(v: Record<Locale, V>) => V
}

const Ctx = createContext<LangValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  // O servidor sempre renderiza 'pt'; a preferência salva entra no primeiro
  // efeito do cliente, então a hidratação nunca vê dois textos diferentes.
  const [lang, setLangState] = useState<Locale>('pt')

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* storage bloqueado — segue no padrão */
    }
    if (saved === 'pt' || saved === 'en') {
      setLangState(saved)
      return
    }
    if (!navigator.language.toLowerCase().startsWith('pt')) setLangState('en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const setLang = useCallback((l: Locale) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage bloqueado — a troca vale só nesta sessão */
    }
  }, [])

  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      t: (key) => ui[key][lang],
      tr: <V,>(v: Record<Locale, V>) => v[lang],
    }),
    [lang, setLang],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLang(): LangValue {
  const v = useContext(Ctx)
  if (!v) throw new Error('useLang precisa estar dentro de <LangProvider>')
  return v
}
