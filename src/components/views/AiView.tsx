'use client'

import Link from 'next/link'
import { ArrowUR } from '@/components/Icons'
import Pipeline from '@/components/Pipeline'
import Reveal from '@/components/Reveal'
import TwoTone from '@/components/TwoTone'
import { ai, person } from '@/content/site'
import { useLang } from '@/i18n/LangProvider'

export default function AiView() {
  const { t, tr } = useLang()

  return (
    <>
      <section className="pad" style={{ paddingBlock: 'clamp(54px, 8vh, 96px) clamp(24px, 4vh, 44px)' }}>
        <div className="sec-top sec-top--hero" style={{ marginBottom: 0 }}>
          <h1 className="display">
            <TwoTone lines={tr(ai.lines)} />
          </h1>
          <div>
            <p className="lead">{tr(ai.lead)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <a href="#ciclo" className="btn btn--amber">
                {t('aiSeeLoop')}
                <ArrowUR />
              </a>
              <a href="#feito" className="btn">
                {t('aiSeeBuilt')}
                <ArrowUR />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Pipeline columns={ai.pipeline} />

      {/* ── O ciclo ───────────────────────────────────────────────────── */}
      <section className="sec" id="ciclo">
        <span className="tab">{t('aiLoopTab')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div className="sec-top">
              <h2 className="h2">
                <TwoTone lines={[t('aiLoopA'), `*${t('aiLoopB')}*`]} />
              </h2>
              <p className="lead">{t('aiLoopLead')}</p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="rules">
              {ai.loop.map((rule, i) => (
                <div className="rule" key={rule.title.en}>
                  <span className="no">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h4">{tr(rule.title)}</h3>
                  <p>{tr(rule.body)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Feito assim ───────────────────────────────────────────────── */}
      <section className="sec" id="feito">
        <span className="tab">{t('aiBuiltTab')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div className="sec-mid">
              <h2 className="h2">
                <TwoTone lines={[t('aiBuiltA'), `*${t('aiBuiltB')}*`]} />
              </h2>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="expl">
              {ai.built.map((item) => (
                <div className="expl-row" key={item.name.en} style={{ alignItems: 'baseline' }}>
                  <span className="nm">{tr(item.name)}</span>
                  <span className="kd" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 'var(--fs-sm)' }}>
                    — {tr(item.note)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ferramentas ───────────────────────────────────────────────── */}
      <section className="sec">
        <span className="tab">{t('aiToolsTab')}</span>
        <span className="corner" aria-hidden="true" />

        <div className="pad" style={{ paddingTop: 22 }}>
          <Reveal>
            <div className="sec-top">
              <h2 className="h2">
                <TwoTone lines={[t('aiToolsA'), `*${t('aiToolsB')}*`]} />
              </h2>
              <p className="lead">{t('aiToolsLead')}</p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="tools">
              {ai.tools.map((tool) => (
                <div className="tool" key={tool.name}>
                  {/* Moldura e marca são elementos separados: a máscara
                      recorta o elemento inteiro, então a borda precisa morar
                      num invólucro para sobreviver. */}
                  <span className="tool-tile">
                    <span
                      className="tool-mark"
                      style={{
                        maskImage: `url(${tool.icon})`,
                        WebkitMaskImage: `url(${tool.icon})`,
                      }}
                    />
                  </span>
                  <span className="nm">{tool.name}</span>
                  <span className="rl">{tr(tool.role)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="pad" style={{ textAlign: 'center' }}>
          <Link href="/work" className="btn btn--amber" style={{ minWidth: 250 }}>
            {t('allWork')}
            <ArrowUR />
          </Link>
          <p className="micro" style={{ marginTop: 20 }}>
            {person.name}
          </p>
        </div>
      </section>
    </>
  )
}
