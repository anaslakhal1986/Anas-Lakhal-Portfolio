import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import useInView from '../hooks/useInView'
import useReducedMotion from '../hooks/useReducedMotion'
import Reveal from './Reveal'
import RadarChart from './RadarChart'
import SkillBar from './SkillBar'
import { homeSkills, skillGroups, tools, concepts } from '../data/portfolio'

const file = {
  ref: 'COMP-004',
  units: '03',
  section: '04 / 06',
}

function SysBar({ name, percent }: { name: string; percent: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const fillRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const f = fillRef.current
    if (!f) return
    if (reduced) {
      gsap.set(f, { scaleX: percent / 100 })
      return
    }
    if (inView) {
      const tween = gsap.fromTo(
        f,
        { scaleX: 0 },
        { scaleX: percent / 100, duration: 0.95, ease: 'power3.out', delay: 0.1 }
      )
      return () => {
        tween.kill()
      }
    }
    gsap.set(f, { scaleX: 0 })
  }, [inView, reduced, percent])

  return (
    <div ref={ref} className="sys-skill">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.62rem] tracking-[0.16em] text-paper/90">{name}</span>
        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-smudge">
          {String(percent).padStart(2, '0')}%
        </span>
      </div>
      <div className="sys-track mt-1 h-[3px] w-full overflow-hidden">
        <div ref={fillRef} className="sys-fill h-full w-full origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}

function SysCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const cls =
    pos === 'tl'
      ? 'left-2 top-2 border-l border-t'
      : pos === 'tr'
        ? 'right-2 top-2 border-r border-t'
        : pos === 'bl'
          ? 'bottom-2 left-2 border-b border-l'
          : 'bottom-2 right-2 border-b border-r'
  return <span aria-hidden="true" className={`sys-corner ${cls}`} />
}

function PanelHead({ code, title, status, tone }: { code: string; title: string; status: string; tone: 'active' | 'crimson' }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dirty-yellow/20 pb-3">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-smudge">
        {title} <span className="text-crimson-glow">·</span> {code}
      </p>
      <p
        className={`flex items-center gap-2 font-mono text-[0.52rem] uppercase tracking-[0.22em] ${
          tone === 'active' ? 'text-toxic' : 'text-crimson-glow'
        }`}
      >
        <span aria-hidden="true" className={tone === 'active' ? 'status-dot status-dot--active' : 'status-dot status-dot--crimson'} />
        {status}
      </p>
    </div>
  )
}

function SchematicArt() {
  return (
    <svg
      aria-hidden="true"
      className="sys-art"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity={0.5}>
        {/* right-edge annotation ruler */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`t${i}`} x1={1590} y1={90 + i * 40} x2={1596} y2={90 + i * 40} stroke="#e8e2d2" strokeOpacity={0.22} strokeWidth={1} />
        ))}
        {/* left ruler */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`l${i}`} x1={10} y1={120 + i * 44} x2={16} y2={120 + i * 44} stroke="#e8e2d2" strokeOpacity={0.16} strokeWidth={1} />
        ))}
      </g>

      {/* circuits — top right */}
      <g stroke="#8ba362" strokeOpacity={0.16} strokeWidth={1.2} fill="none">
        <path d="M1005 70 h95 v80 h150" />
        <path d="M1120 250 v-60 h60 v-70 h90" />
        <path d="M1330 60 v40 h60 v60 h-36" />
        <circle cx={1050} cy={70} r={3} fill="#8ba362" />
        <circle cx={1100} cy={150} r={3} fill="#8ba362" />
        <circle cx={1250} cy={150} r={3.5} fill="#8ba362" />
        <circle cx={1180} cy={190} r={2.5} fill="#c9b44a" />
        <circle cx={1300} cy={250} r={3} fill="#8ba362" />
      </g>

      {/* chip block — top right */}
      <g stroke="#c9b44a" strokeOpacity={0.2} strokeWidth={1} fill="none">
        <rect x={1432} y={55} width={92} height={92} />
        <rect x={1442} y={65} width={72} height={72} strokeOpacity={0.14} />
        <line x1={1478} y1={147} x2={1478} y2={168} />
        <line x1={1446} y1={147} x2={1446} y2={168} />
        <line x1={1432} y1={82} x2={1404} y2={82} />
        <line x1={1432} y1={116} x2={1404} y2={116} />
        <line x1={1524} y1={82} x2={1552} y2={82} />
        <line x1={1524} y1={116} x2={1552} y2={116} />
      </g>

      {/* concentric target — bottom left */}
      <g stroke="#8ba362" strokeOpacity={0.14} strokeWidth={1} fill="none">
        <circle cx={250} cy={700} r={44} />
        <circle cx={250} cy={700} r={74} strokeOpacity={0.1} />
        <circle cx={250} cy={700} r={106} strokeOpacity={0.08} />
        <line x1={250} y1={590} x2={250} y2={810} strokeOpacity={0.1} />
        <line x1={142} y1={700} x2={358} y2={700} strokeOpacity={0.1} />
        <path d="M120 700 h18 M362 700 h18 M250 566 v18 M250 816 v18" />
      </g>

      {/* diagonal hatch — bottom right */}
      <g stroke="#c9b44a" strokeOpacity={0.05} strokeWidth={1}>
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`h${i}`} x1={1150 + i * 34} y1={900} x2={1200 + i * 34} y2={540} />
        ))}
      </g>

      {/* bottom spec strip */}
      <g fill="#c9b44a" fillOpacity={0.12}>
        {Array.from({ length: 60 }, (_, i) => (
          <rect key={`s${i}`} x={130 + i * 22} y={850} width={i % 4 === 0 ? 12 : 6} height={4} />
        ))}
      </g>
    </svg>
  )
}

export default function SystemsInventory() {
  return (
    <section aria-labelledby="systems-title" className="systems-dossier relative isolate overflow-hidden">
      <div aria-hidden="true" className="sys-base" />
      <div aria-hidden="true" className="sys-grid" />
      <SchematicArt />
      <div aria-hidden="true" className="sys-shade" />
      <div aria-hidden="true" className="sys-vignette" />
      <div aria-hidden="true" className="sys-grain" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-4 py-10 sm:px-6 md:py-14 lg:px-10 2xl:px-16">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-8">
            <div>
              <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-toxic">
                <span className="h-2.5 w-2.5 shrink-0 rotate-45 border border-crimson-glow/80 bg-crimson/30" />
                Systèmes techniques
              </p>
              <h2
                id="systems-title"
                className="mt-3 flex flex-wrap items-baseline font-display font-bold uppercase leading-none tracking-[0.01em] text-paper [text-shadow:0_2px_22px_rgba(0,0,0,.9)]"
              >
                <span className="text-[0.72em] text-crimson-glow">04</span>
                <span aria-hidden className="mx-2 text-dirty-yellow/60">—</span>
                <span className="text-3xl sm:text-5xl lg:text-6xl">Inventaire des Systèmes</span>
                <span aria-hidden className="ml-1 text-crimson-glow">.</span>
              </h2>
              <span aria-hidden className="mt-3 block h-px w-20 bg-gradient-to-r from-crimson-glow to-transparent" />
            </div>

            <div className="ml-auto text-right">
              <div className="flex items-center justify-end gap-4">
                <span aria-hidden className="sys-barcode hidden sm:inline-block" />
                <span className="sys-stamp">Interne</span>
              </div>
              <dl className="sys-meta mt-3">
                <div>
                  <dt>Ref</dt>
                  <dd>{file.ref}</dd>
                </div>
                <div>
                  <dt>Unités</dt>
                  <dd>{file.units}</dd>
                </div>
                <div>
                  <dt>Section</dt>
                  <dd>{file.section}</dd>
                </div>
              </dl>
            </div>
          </header>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-7">
          <Reveal delay={1} className="min-w-0">
            <section className="sys-panel p-5 sm:p-6">
              <SysCorner pos="tl" />
              <SysCorner pos="tr" />
              <PanelHead code="PDF-01" title="Profil technique" status="Analyse" tone="active" />
              <div className="relative py-5">
                <RadarChart />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night/20" />
              </div>
              <p className="border-t border-dirty-yellow/15 pt-3 font-mono text-[0.52rem] uppercase leading-relaxed tracking-[0.18em] text-smudge/75">
                Évaluation transversale des 5 axes techniques.
                <span className="text-dirty-yellow/60"> ▸</span> lecture enregistrée une seule fois.
              </p>
            </section>
          </Reveal>

          <Reveal delay={1} className="min-w-0">
            <section className="sys-panel p-5 sm:p-6">
              <SysCorner pos="tl" />
              <SysCorner pos="tr" />
              <SysCorner pos="bl" />
              <SysCorner pos="br" />
              <PanelHead code="REG-01" title="Registre compétences" status="Vérifié" tone="active" />
              <div className="mt-5 space-y-5">
                {homeSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percent={skill.percent}
                    label={`LVL ${skill.percent}%`}
                    variant="page"
                  />
                ))}
              </div>
              <p className="mt-5 flex items-center justify-between border-t border-dirty-yellow/15 pt-3 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-smudge/70">
                <span>{homeSkills.length} entrées indexées</span>
                <span aria-hidden className="sys-barcode sys-barcode--foot" />
              </p>
            </section>
          </Reveal>
        </div>

        <Reveal delay={1} className="mt-5 lg:mt-7">
          <section className="sys-panel sys-panel--sheet p-5 sm:p-8">
            <SysCorner pos="tl" />
            <SysCorner pos="tr" />
            <SysCorner pos="bl" />
            <SysCorner pos="br" />

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dirty-yellow/20 pb-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-smudge">
                Inventaire des systèmes <span className="text-crimson-glow">·</span> 003
              </p>
              <span className="sys-stamp sys-stamp--small">Restreint</span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
              {skillGroups.map((group, i) => (
                <div key={group.title} className="sys-cat">
                  <header className="sys-cat-head">
                    <span aria-hidden="true" className="sys-cat-g">{group.icon}</span>
                    <span className="font-display text-sm font-bold tracking-[0.08em] text-paper">
                      {group.title.toUpperCase()}
                    </span>
                    <span className="ml-auto font-mono text-[0.5rem] uppercase tracking-[0.16em] text-smudge">
                      {group.count}
                    </span>
                  </header>
                  <div className="mt-4 space-y-4">
                    {group.skills.map((skill) => (
                      <SysBar key={skill.name} name={skill.name} percent={skill.percent} />
                    ))}
                  </div>
                  <footer className="sys-cat-foot">
                    SCAN {String(i + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}
                  </footer>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-dirty-yellow/20 pt-6">
              <p className="case-stamp text-[0.55rem]">Boîte à outils</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map(([icon, name]) => (
                  <span
                    key={name}
                    className="sys-chip"
                  >
                    <span aria-hidden="true">{icon}</span>
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 border-t border-dirty-yellow/20 pt-6">
              <p className="case-stamp text-[0.55rem]">Concepts appliqués</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {concepts.map((c) => (
                  <span key={c} className="sys-tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dirty-yellow/20 pt-4">
              <div className="flex items-center gap-4 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-smudge/70">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 border border-toxic/70 bg-toxic/30" />
                  NOMINAL
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 border border-dirty-yellow/70 bg-dirty-yellow/30" />
                  EN COURS
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 border border-crimson/70 bg-crimson/30" />
                  CRITIQUE
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span aria-hidden className="sys-barcode sys-barcode--foot" />
                <span className="font-mono text-[0.52rem] uppercase tracking-[0.22em] text-dirty-yellow/70">
                  {file.ref} · INVENTAIRE
                </span>
              </div>
            </div>
          </section>
        </Reveal>
      </div>

      <style>{`
        .systems-dossier { background: #060806; }

        .sys-base {
          position: absolute; inset: 0; z-index: -6;
          background:
            radial-gradient(1100px 560px at 22% 16%, rgba(62,74,46,0.34), transparent 60%),
            radial-gradient(900px 640px at 86% 30%, rgba(34,42,28,0.4), transparent 58%),
            radial-gradient(760px 520px at 30% 92%, rgba(56,50,30,0.28), transparent 60%),
            linear-gradient(160deg, #0b0f09 0%, #070a06 52%, #050704 100%);
        }

        .sys-grid {
          position: absolute; inset: 0; z-index: -5;
          background-image:
            linear-gradient(rgba(201,180,74,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,180,74,0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(120% 90% at 50% 40%, #000 55%, transparent 100%);
        }

        .sys-art {
          position: absolute; inset: 0; z-index: -4; width: 100%; height: 100%;
        }

        .sys-shade {
          position: absolute; inset: 0; z-index: -3;
          background:
            linear-gradient(0deg, rgba(4,6,3,.7) 0%, rgba(4,6,3,.1) 40%, rgba(4,6,3,.3) 100%),
            linear-gradient(90deg, rgba(4,6,3,.3) 0%, rgba(4,6,3,.05) 45%, rgba(4,6,3,.4) 100%);
        }

        .sys-vignette {
          position: absolute; inset: 0; z-index: -2; pointer-events: none;
          box-shadow: inset 0 0 190px rgba(0,0,0,.6);
        }

        .sys-grain {
          position: absolute; inset: 0; z-index: -1; pointer-events: none;
          opacity: .045; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .systems-dossier::after {
          content: '';
          position: absolute; inset: 10px; pointer-events: none; z-index: 1;
          border: 1px solid rgba(214,200,160,.1);
        }
        @media (max-width: 639px) { .systems-dossier::after { inset: 5px; } }

        .sys-panel {
          position: relative; height: 100%;
          border: 1px solid rgba(209,193,148,.28);
          background: linear-gradient(135deg, rgba(14,17,10,.82), rgba(9,11,7,.78));
          box-shadow: 0 26px 60px -30px rgba(0,0,0,.9), inset 0 0 48px rgba(0,0,0,.35);
          backdrop-filter: blur(2px);
          transition: border-color .35s ease;
        }
        .sys-panel:hover { border-color: rgba(201,180,74,.42); }
        .sys-panel::before {
          content: ''; position: absolute; inset: 6px; pointer-events: none;
          border: 1px solid rgba(209,193,148,.1);
        }
        .sys-panel--sheet {
          background: linear-gradient(140deg, rgba(13,16,10,.88), rgba(8,10,6,.82));
        }

        .sys-corner {
          position: absolute; width: 13px; height: 13px; pointer-events: none; z-index: 2;
          border-color: rgba(226,203,86,.55); border-style: solid;
        }

        .sys-cat-head {
          display: flex; align-items: center; gap: .6rem;
          border-bottom: 1px solid rgba(201,180,74,.2); padding-bottom: .6rem;
        }
        .sys-cat-g {
          display: inline-flex; align-items: center; justify-content: center;
          width: 1.7rem; height: 1.7rem; font-size: .8rem;
          border: 1px solid rgba(139,163,98,.4); background: rgba(139,163,98,.1);
        }
        .sys-cat-foot {
          margin-top: .8rem; padding-top: .5rem; border-top: 1px dashed rgba(201,180,74,.16);
          font-family: 'JetBrains Mono', monospace; font-size: .48rem;
          letter-spacing: .18em; text-transform: uppercase; color: rgba(107,102,90,.85);
        }

        .sys-track { background: rgba(42,48,40,.5); }
        .sys-fill {
          background: linear-gradient(90deg, rgba(139,163,98,.55), rgba(139,163,98,.85));
          box-shadow: 0 0 10px rgba(139,163,98,.35);
        }
        .sys-fill { width: 100%; transform-origin: left center; }

        .sys-chip {
          display: inline-flex; align-items: center; gap: .45rem;
          border: 1px solid rgba(201,180,74,.24); background: rgba(8,10,6,.5);
          padding: .4rem .7rem;
          font-family: 'JetBrains Mono', monospace; font-size: .6rem;
          letter-spacing: .12em; color: rgba(236,228,211,.85);
          transition: border-color .3s ease, color .3s ease, background .3s ease;
        }
        .sys-chip:hover { border-color: rgba(201,180,74,.55); background: rgba(201,180,74,.08); }

        .sys-tag {
          display: inline-flex; align-items: center;
          border: 1px solid rgba(139,163,98,.22); background: rgba(8,10,6,.45);
          padding: .34rem .62rem;
          font-family: 'JetBrains Mono', monospace; font-size: .54rem;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(168,162,148,.85);
          transition: border-color .3s ease, color .3s ease;
        }
        .sys-tag:hover { border-color: rgba(139,163,98,.55); color: #e8e2d2; }

        .sys-barcode {
          display: inline-block; width: 96px; height: 18px; opacity: .5;
          background-image: repeating-linear-gradient(90deg,
            rgba(236,228,211,.92) 0 2px, transparent 2px 5px,
            rgba(236,228,211,.92) 5px 8px, transparent 8px 9px,
            rgba(236,228,211,.92) 9px 13px, transparent 13px 17px);
        }
        .sys-barcode--foot { opacity: .3; height: 12px; }

        .sys-stamp {
          display: inline-block; transform: rotate(-2deg);
          border: 1px solid rgba(168,48,48,.72); color: #a83030;
          font-family: 'JetBrains Mono', monospace; font-size: .56rem;
          letter-spacing: .24em; text-transform: uppercase;
          padding: .34rem .6rem; line-height: 1;
          box-shadow: inset 0 0 14px rgba(168,48,48,.22);
        }
        .sys-stamp--small {
          font-size: .5rem; padding: .24rem .45rem; border-color: rgba(168,48,48,.55);
        }

        .sys-meta { display: flex; flex-direction: column; gap: .15rem; }
        .sys-meta > div {
          display: flex; justify-content: space-between; gap: 2rem;
          padding: .24rem 0; border-bottom: 1px dotted rgba(201,180,74,.28);
        }
        .sys-meta dt {
          font-family: 'JetBrains Mono', monospace; font-size: .52rem;
          letter-spacing: .24em; text-transform: uppercase; color: #a8a294;
        }
        .sys-meta dd {
          font-family: 'JetBrains Mono', monospace; font-size: .6rem;
          letter-spacing: .08em; color: rgba(236,228,211,.86);
        }
      `}</style>
    </section>
  )
}