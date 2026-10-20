import { about, profile, softSkills } from '../data/portfolio'
import Reveal from './Reveal'

const file = {
  ref: 'AL–001',
  section: '02 / 06',
  subject: profile.name.toUpperCase(),
}

const identityItems: { label: string; value: string; accent?: boolean }[] = [
  { label: 'Rôle', value: profile.title },
  { label: 'Localisation', value: profile.location },
  { label: 'Formation', value: 'YouCode UM6P' },
  { label: 'Langues', value: profile.languages },
  { label: 'Statut', value: profile.availability, accent: true },
  { label: 'Contact', value: profile.email },
]

const specializations = [
  {
    code: '01',
    title: 'FULL STACK DEVELOPMENT',
    glyph: '</>',
    fields: ['Laravel · React · Tailwind CSS', 'PHP · MySQL · REST APIs'],
    tag: 'WEB / BACKEND / DATABASE',
  },
  {
    code: '02',
    title: 'AI INTEGRATION',
    glyph: 'AI',
    fields: ['Python · Groq API · Llama 3.3', 'Agents · Automation · REST APIs'],
    tag: 'AI / AGENTS / AUTOMATION',
  },
  {
    code: '03',
    title: 'JAVA DEVELOPMENT',
    glyph: 'J',
    fields: ['Java · Spring · Spring Boot', 'Angular · REST APIs · Clean architecture'],
    tag: 'JAVA / SPRING / ANGULAR',
  },
]

function DossierCorner({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`identity-corner ${className}`} />
}

export default function IdentityDossier() {
  return (
    <div className="identity-dossier relative isolate overflow-hidden border-y border-dirty-yellow/20">
      <div aria-hidden="true" className="identity-bg" />
      <div aria-hidden="true" className="identity-shade" />
      <div aria-hidden="true" className="identity-vignette" />
      <div aria-hidden="true" className="identity-grain" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-4 py-10 sm:px-6 md:py-14 lg:px-10 2xl:px-16">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-8">
            <div className="min-w-0 lg:ml-[30%] xl:ml-[32%]">
              <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-toxic">
                <span className="h-2.5 w-2.5 shrink-0 rotate-45 border border-crimson-glow/80 bg-crimson/30" />
                Dossier personnel
              </p>
              <h2 className="mt-3 flex flex-wrap items-baseline font-display font-bold uppercase leading-none tracking-[0.01em] text-paper [text-shadow:0_2px_22px_rgba(0,0,0,.9)]">
                <span className="text-[0.72em] text-crimson-glow">02</span>
                <span aria-hidden className="mx-2 text-dirty-yellow/60">—</span>
                <span className="text-3xl sm:text-5xl lg:text-6xl">Identité</span>
                <span aria-hidden className="ml-1 text-crimson-glow">.</span>
              </h2>
              <span aria-hidden className="mt-3 block h-px w-20 bg-gradient-to-r from-crimson-glow to-transparent" />
            </div>

            <div className="ml-auto text-right">
              <div className="flex items-center justify-end gap-4">
                <span aria-hidden className="identity-barcode hidden sm:inline-block" />
                <span className="identity-stamp">Restreint</span>
              </div>
              <dl className="identity-meta mt-3">
                <div>
                  <dt>File</dt>
                  <dd>{file.ref}</dd>
                </div>
                <div>
                  <dt>Subject</dt>
                  <dd>{file.subject}</dd>
                </div>
                <div>
                  <dt>Section</dt>
                  <dd>{file.section}</dd>
                </div>
              </dl>
            </div>
          </header>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <div aria-hidden="true" className="hidden lg:block" />

          <Reveal delay={1} className="min-w-0">
            <section className="identity-sheet p-5 sm:p-7">
              <DossierCorner className="identity-corner--tl" />
              <DossierCorner className="identity-corner--tr" />
              <DossierCorner className="identity-corner--bl" />
              <DossierCorner className="identity-corner--br" />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dirty-yellow/20 pb-3">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-smudge">
                  Carte d&apos;identité <span className="text-crimson-glow">·</span> 001
                </p>
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-toxic">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-toxic align-middle shadow-[0_0_8px_rgba(139,163,98,.8)]" />
                  Identité vérifiée
                </p>
              </div>

              <h3 className="identity-name mt-6">{profile.name}</h3>
              <p className="identity-role mt-3">
                <span className="mr-2 text-crimson-glow">▸</span>
                {profile.title}
              </p>

              <dl className="identity-facts mt-6">
                {identityItems.map((item) => (
                  <div key={item.label} className="identity-facts__row">
                    <dt>{item.label}</dt>
                    <dd className={item.accent ? 'text-toxic' : ''}>
                      {item.accent && (
                        <span aria-hidden className="mr-2 text-toxic">●</span>
                      )}
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 flex items-center gap-3 border-t border-dirty-yellow/20 pt-3 font-mono text-[0.52rem] uppercase tracking-[0.18em] text-smudge/75">
                <span>Signalement enregistré</span>
                <span aria-hidden className="text-crimson-glow">·</span>
                <span>Code {file.ref}</span>
              </p>
            </section>
          </Reveal>

          <Reveal delay={2}>
            <aside className="flex h-full flex-col gap-5">
              <section className="identity-block">
                <h3 className="identity-block__title">
                  <span aria-hidden className="text-crimson-glow">✚</span>
                  Profile
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/78">{about.paragraphs[0]}</p>
                <p className="identity-block__foot">Source — portfolio · annexe 01</p>
              </section>

              <section className="identity-block">
                <h3 className="identity-block__title">
                  <span aria-hidden className="text-crimson-glow">✚</span>
                  Psychological profile
                </h3>
                <p className="mt-3 font-mono text-[0.54rem] uppercase tracking-[0.18em] text-smudge/70">
                  Traits professionnels observés
                </p>
                <ul className="identity-traits mt-3">
                  {softSkills.map((trait, i) => (
                    <li key={trait} className="identity-traits__chip">
                      <i>{String(i + 1).padStart(2, '0')}</i>
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
                <p className="identity-block__foot">Constat d&apos;ordre professionnel — sans valeur de diagnostic</p>
              </section>
            </aside>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <div className="mt-9">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-dirty-yellow">
              <span aria-hidden className="mr-2 text-crimson-glow">✦</span>
              Spécialisations
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {specializations.map((spec) => (
                <article key={spec.code} className="identity-spec p-5">
                  <DossierCorner className="identity-corner--tl" />
                  <DossierCorner className="identity-corner--tr" />
                  <header className="flex items-start justify-between gap-4">
                    <span className="identity-spec__index">{spec.code}</span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-dirty-yellow/50 font-mono text-xs font-bold text-dirty-yellow">
                      {spec.glyph}
                    </span>
                  </header>
                  <h3 className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-paper sm:text-sm">
                    {spec.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {spec.fields.map((field) => (
                      <li key={field} className="font-mono text-[0.64rem] leading-relaxed text-paper/70">
                        <span aria-hidden className="mr-2 text-crimson-glow">—</span>
                        {field}
                      </li>
                    ))}
                  </ul>
                  <p className="identity-spec__tag">{spec.tag}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-dirty-yellow/20 pt-4 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-smudge/60">
          <span>Réf. {file.ref}</span>
          <span aria-hidden className="identity-barcode identity-barcode--foot" />
          <span>Statut document — confirmé</span>
          <span>YouCode UM6P · Youssoufia, Maroc</span>
        </div>
      </div>

      <style>{`
        .identity-dossier { background: #060806; }

        .identity-bg {
          position: absolute; inset: 0; z-index: -4;
          background: url('/images/section2.png') no-repeat;
          background-size: cover;
          background-position: 40% 16%;
        }
        @media (min-width: 1024px) {
          .identity-bg { background-position: 12% 26%; }
        }

        .identity-shade {
          position: absolute; inset: 0; z-index: -3;
          background:
            linear-gradient(0deg, rgba(4,6,3,.68) 0%, rgba(4,6,3,.12) 34%, rgba(4,6,3,.24) 100%),
            linear-gradient(90deg, rgba(4,6,3,.08) 0%, rgba(4,6,3,.24) 52%, rgba(4,6,3,.5) 100%);
        }

        .identity-vignette {
          position: absolute; inset: 0; z-index: -2; pointer-events: none;
          box-shadow: inset 0 0 170px rgba(0,0,0,.52);
        }

        .identity-grain {
          position: absolute; inset: 0; z-index: -1; pointer-events: none;
          opacity: .045; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .identity-dossier::after {
          content: ''; position: absolute; inset: 10px; pointer-events: none; z-index: 1;
          border: 1px solid rgba(214,200,160,.12);
        }
        @media (max-width: 639px) { .identity-dossier::after { inset: 5px; } }

        .identity-corner {
          position: absolute; width: 14px; height: 14px; pointer-events: none;
          border-color: rgba(226,203,86,.66); border-style: solid;
        }
        .identity-corner--tl { top: 10px; left: 10px; border-width: 1px 0 0 1px; }
        .identity-corner--tr { top: 10px; right: 10px; border-width: 1px 1px 0 0; }
        .identity-corner--bl { bottom: 10px; left: 10px; border-width: 0 0 1px 1px; }
        .identity-corner--br { bottom: 10px; right: 10px; border-width: 0 1px 1px 0; }

        .identity-barcode {
          display: inline-block; width: 96px; height: 18px; opacity: .5;
          background-image: repeating-linear-gradient(90deg,
            rgba(236,228,211,.92) 0 2px, transparent 2px 5px,
            rgba(236,228,211,.92) 5px 8px, transparent 8px 9px,
            rgba(236,228,211,.92) 9px 13px, transparent 13px 17px);
        }
        .identity-barcode--foot { opacity: .3; height: 12px; }

        .identity-stamp {
          display: inline-block; transform: rotate(-2deg);
          border: 1px solid rgba(168,48,48,.72); color: #a83030;
          font-family: 'JetBrains Mono', monospace; font-size: .56rem;
          letter-spacing: .24em; text-transform: uppercase;
          padding: .34rem .6rem; line-height: 1;
          box-shadow: inset 0 0 14px rgba(168,48,48,.22);
        }

        .identity-meta { display: flex; flex-direction: column; gap: .15rem; }
        .identity-meta > div {
          display: flex; justify-content: space-between; gap: 2rem;
          padding: .24rem 0; border-bottom: 1px dotted rgba(201,180,74,.28);
        }
        .identity-meta dt {
          font-family: 'JetBrains Mono', monospace; font-size: .52rem;
          letter-spacing: .24em; text-transform: uppercase; color: #a8a294;
        }
        .identity-meta dd {
          font-family: 'JetBrains Mono', monospace; font-size: .6rem;
          letter-spacing: .08em; color: rgba(236,228,211,.86);
        }

        .identity-sheet {
          position: relative;
          border: 1px solid rgba(209,193,148,.28);
          background: linear-gradient(135deg, rgba(14,17,10,.8), rgba(9,11,7,.68));
          box-shadow: 0 26px 60px -30px rgba(0,0,0,.9), inset 0 0 48px rgba(0,0,0,.35);
          backdrop-filter: blur(2px);
        }
        .identity-sheet::before {
          content: ''; position: absolute; inset: 6px; pointer-events: none;
          border: 1px solid rgba(209,193,148,.1);
        }

        .identity-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; text-transform: uppercase; letter-spacing: -.035em; line-height: .95;
          color: #ece4d3; font-size: clamp(2.2rem, 4.5vw, 4.4rem);
          text-shadow: 0 6px 34px rgba(0,0,0,.75);
        }

        .identity-role {
          font-family: 'JetBrains Mono', monospace; font-size: .85rem;
          letter-spacing: .14em; text-transform: uppercase; color: #c9b44a;
          border-left: 2px solid rgba(168,48,48,.8); padding-left: .8rem;
        }

        .identity-facts__row {
          display: grid; grid-template-columns: 7.5rem 1fr; gap: 1.1rem; align-items: baseline;
          padding: .58rem 0; border-bottom: 1px dashed rgba(201,180,74,.2);
        }
        .identity-facts__row:last-child { border-bottom: 0; }
        .identity-facts dt {
          font-family: 'JetBrains Mono', monospace; font-size: .58rem;
          letter-spacing: .18em; text-transform: uppercase; color: #a8a294;
        }
        .identity-facts dd {
          font-family: 'JetBrains Mono', monospace; font-size: .72rem;
          line-height: 1.45; color: rgba(236,228,211,.88); word-break: break-word;
        }
        .identity-facts dd.text-toxic { color: #8ba362; }

        .identity-block {
          position: relative; flex: 1;
          border: 1px solid rgba(209,193,148,.2);
          background: linear-gradient(145deg, rgba(12,15,9,.7), rgba(8,10,6,.62));
          box-shadow: inset 0 0 40px rgba(0,0,0,.3);
          backdrop-filter: blur(2px);
          padding: 1.1rem 1.15rem;
        }
        .identity-block__title {
          display: flex; align-items: center; gap: .6rem;
          font-family: 'JetBrains Mono', monospace; font-size: .72rem;
          letter-spacing: .12em; text-transform: uppercase; color: #c9b44a;
          border-bottom: 1px solid rgba(201,180,74,.2); padding-bottom: .55rem;
        }
        .identity-block__foot {
          margin-top: .9rem; padding-top: .55rem; border-top: 1px dashed rgba(201,180,74,.16);
          font-family: 'JetBrains Mono', monospace; font-size: .48rem;
          letter-spacing: .16em; text-transform: uppercase; color: rgba(107,102,90,.9);
        }

        .identity-traits { display: flex; flex-wrap: wrap; gap: .5rem; }
        .identity-traits__chip {
          display: inline-flex; align-items: center; gap: .45rem;
          border: 1px solid rgba(201,180,74,.26); background: rgba(8,10,6,.5);
          padding: .34rem .6rem;
          font-family: 'JetBrains Mono', monospace; font-size: .56rem;
          letter-spacing: .14em; text-transform: uppercase; color: rgba(236,228,211,.82);
          transition: border-color .3s ease, color .3s ease, background .3s ease;
        }
        .identity-traits__chip i { font-style: normal; color: #a83030; font-size: .5rem; letter-spacing: .08em; }
        .identity-traits__chip:hover { border-color: rgba(201,180,74,.55); color: #ece4d3; }

        .identity-spec {
          position: relative; overflow: hidden;
          border: 1px solid rgba(209,193,148,.22);
          background: linear-gradient(150deg, rgba(13,16,10,.7), rgba(8,10,6,.8));
          box-shadow: 0 18px 40px -26px rgba(0,0,0,.85);
          transition: border-color .35s ease, box-shadow .35s ease, transform .35s ease;
        }
        .identity-spec::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(120deg, rgba(214,200,160,.05), transparent 34%);
        }
        .identity-spec:hover {
          border-color: rgba(201,180,74,.5);
          box-shadow: 0 22px 46px -24px rgba(0,0,0,.9), 0 0 30px -18px rgba(201,180,74,.35);
          transform: translateY(-3px);
        }
        .identity-spec__index {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 3rem; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(236,228,211,.28);
        }
        .identity-spec__tag {
          margin-top: 1rem; padding-top: .65rem; border-top: 1px dashed rgba(201,180,74,.18);
          font-family: 'JetBrains Mono', monospace; font-size: .48rem;
          letter-spacing: .2em; text-transform: uppercase; color: rgba(107,102,90,.85);
        }
      `}</style>
    </div>
  )
}