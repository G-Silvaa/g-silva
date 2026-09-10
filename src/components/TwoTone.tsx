import { Fragment } from 'react'

/**
 * Título em dois tempos: o trecho entre `*asteriscos*` sai no tom apagado.
 * É a assinatura tipográfica do site — a frase começa firme e termina baixa.
 */
export default function TwoTone({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          {line.split(/(\*[^*]+\*)/g).map((part, k) =>
            part.startsWith('*') && part.endsWith('*') ? (
              <span className="mut" key={k}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <Fragment key={k}>{part}</Fragment>
            ),
          )}
        </span>
      ))}
    </>
  )
}
