import type { ReactNode } from 'react'

/**
 * Realce de sintaxe mínimo para os trechos dos artigos. Não é um parser: uma
 * expressão por linguagem separa os pedaços que importam para leitura —
 * palavra-chave, string, comentário, tipo, tag — e o resto sai como texto.
 */

export type CodeLang = 'ts' | 'tsx' | 'html' | 'tree'

const KEYWORDS =
  'import|from|export|default|const|let|var|function|return|async|await|if|else|throw|new|class|private|protected|public|readonly|interface|type|extends|implements|typeof|of|in|for|true|false|null|undefined|void'

const TS = new RegExp(
  [
    String.raw`(?<com>\/\/[^\n]*|\/\*[\s\S]*?\*\/)`,
    String.raw`(?<str>'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|\x60(?:\\.|[^\x60\\])*\x60)`,
    String.raw`(?<dec>@[A-Za-z_]\w*)`,
    String.raw`(?<kw>\b(?:${KEYWORDS})\b)`,
    String.raw`(?<num>\b\d+(?:\.\d+)?\b)`,
    String.raw`(?<fn>\b[a-zA-Z_$][\w$]*(?=\s*\())`,
    String.raw`(?<type>\b[A-Z][\w$]*\b)`,
  ].join('|'),
  'g',
)

/* No TSX, `<Nome` e `</nome` são tags; o resto segue as regras do TS. */
const TSX = new RegExp(String.raw`(?<tag>(?<=<\/?)[A-Za-z][\w.]*)|` + TS.source, 'g')

const HTML = new RegExp(
  [
    String.raw`(?<com><!--[\s\S]*?-->)`,
    String.raw`(?<interp>\{\{[\s\S]*?\}\})`,
    String.raw`(?<str>"[^"]*")`,
    String.raw`(?<ctrl>@(?:if|else|for|switch|case|defer|empty)\b)`,
    String.raw`(?<tag>(?<=<\/?)[a-z][\w-]*)`,
    String.raw`(?<attr>[\w.\-:\[\]()*#]+(?==))`,
  ].join('|'),
  'g',
)

/* Árvore de pastas: o que vem depois da seta é comentário. */
const TREE = /(?<com>→[^\n]*)|(?<dim>[├└│─]+)/g

const RULES: Record<CodeLang, RegExp> = { ts: TS, tsx: TSX, html: HTML, tree: TREE }

export function langFromFile(file?: string): CodeLang | undefined {
  if (!file) return undefined
  if (file.endsWith('.tsx')) return 'tsx'
  if (file.endsWith('.ts')) return 'ts'
  if (file.endsWith('.html')) return 'html'
  return undefined
}

export function highlight(code: string, lang?: CodeLang): ReactNode {
  if (!lang) return code
  const rule = RULES[lang]
  const out: ReactNode[] = []
  let last = 0
  for (const m of code.matchAll(rule)) {
    const kind = Object.entries(m.groups ?? {}).find(([, v]) => v !== undefined)?.[0]
    if (!kind) continue
    if (m.index > last) out.push(code.slice(last, m.index))
    out.push(
      <span key={m.index} className={`tk-${kind}`}>
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}
