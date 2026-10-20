import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import Badge from '../components/Badge'
import SectionHeading from '../components/SectionHeading'
import CaseMetadata from '../components/CaseMetadata'
import StatusIndicator from '../components/StatusIndicator'
import CaseFile from '../components/CaseFile'
import { Container } from '../components/Container'
import { projects } from '../data/portfolio'

const TIER_LABELS: Record<string, string> = {
  featured: 'Priorité maximale',
  primary: 'Priorité élevée',
  secondary: 'Secondaire',
}


export default function ProjectCaseStudy() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = useMemo(() => projects.find((p) => p.id === projectId), [projectId])
  const cs = project?.caseStudy
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!project) {
      navigate('/', { replace: true })
      return
    }
    setChecked(true)
  }, [project, navigate])

  if (!checked || !project) return null

  const features = project.features ?? []
  const keyFeatures =
    cs?.tools && cs.tools.length > 0 ? cs.tools : features
  const tierLabel = TIER_LABELS[project.tier] ?? project.tier.toUpperCase()

  return (
    <main id="main" className="relative z-10">
      <Section id="case-briefing">
        <Container className="pt-6 pb-4">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <Link
                    to="/"
                    className="mb-4 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-smudge transition-colors hover:text-paper"
                  >
                    ← Retour au portfolio
                  </Link>
                  <p className="case-stamp mb-3 font-mono text-[0.65rem] uppercase tracking-[0.28em]">
                    <span className="text-dirty-yellow/80">Dossier {project.id}</span>
                    <span className="ml-2">// Case briefing</span>
                  </p>
                  <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-paper md:text-6xl">
                    {project.name}
                  </h1>
                </div>
                <StatusIndicator label="Mission en cours — confidentiel" tone="active" />
              </div>
              <div className="section-divider" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-16 md:space-y-20">
              <Reveal>
                <div className="dossier-panel p-6 md:p-8">
                  <p className="case-stamp mb-4 text-[0.55rem]">Mandat de mission</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl font-bold tracking-tight text-paper md:text-3xl">
                      {project.name}
                    </h2>
                    {project.badge && <Badge active>{project.badge}</Badge>}
                    {project.ai && <Badge active>✦ Système IA</Badge>}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.categories.map((c) => (
                      <Badge key={c}>{c}</Badge>
                    ))}
                  </div>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-smudge md:text-base">
                    {project.description}
                  </p>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <SectionHeading
                    eyebrow="Analyse préliminaire"
                    headingId="case-analysis-title"
                    title={
                      <span>
                        Analyse <span className="gradient-text">du dossier</span>
                      </span>
                    }
                  />
                </Reveal>
                <div className="space-y-3">
                  {features.map((f, i) => (
                    <Reveal key={f} delay={i % 4}>
                      <div className="dossier-panel dossier-panel-hover flex items-start gap-4 p-4">
                        <span className="mt-0.5 font-mono text-[0.6rem] tracking-widest text-dirty-yellow/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm leading-relaxed text-paper/80">{f}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div>
                <Reveal>
                  <SectionHeading
                    eyebrow="Capacités opérationnelles"
                    headingId="case-features-title"
                    title={
                      <span>
                        Fonctionnalités <span className="gradient-text">clés</span>
                      </span>
                    }
                  />
                </Reveal>
                <ul className="space-y-3">
                  {keyFeatures.map((f, i) => {
                    const [name, ...rest] = f.split(':')
                    return (
                      <Reveal key={f} delay={i % 4}>
                        <li className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-[3px] font-mono text-sm text-toxic">
                            ▸
                          </span>
                          <span className="text-sm leading-relaxed text-paper/75">
                            {rest.length > 0 ? (
                              <>
                                <span className="font-medium text-paper">{name}:</span>
                                {rest.join(':')}
                              </>
                            ) : (
                              name
                            )}
                          </span>
                        </li>
                      </Reveal>
                    )
                  })}
                </ul>
              </div>

              <div>
                <Reveal>
                  <SectionHeading
                    eyebrow="Stack & infrastructure"
                    headingId="case-architecture-title"
                    title={
                      <span>
                        Architecture <span className="gradient-text">technique</span>
                      </span>
                    }
                  />
                </Reveal>
                <Reveal delay={1}>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <aside className="min-w-0 space-y-8">
              <Reveal>
                <CaseFile caseNumber={`Dossier ${project.id}`}>
                  <p className="case-stamp mb-4 text-[0.55rem]">Profil de mission</p>
                  <CaseMetadata
                    items={[
                      ['Nom du projet', project.name],
                      ['Client', 'PERSONNEL'],
                      ['Type', project.categories[0] ?? '—'],
                    ]}
                  />
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-olive-border/50 pt-4">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-smudge">
                      Statut
                    </span>
                    <StatusIndicator label="Actif — en cours" tone="active" />
                  </div>
                </CaseFile>
              </Reveal>

              <Reveal delay={1}>
                <CaseFile>
                  <p className="case-stamp mb-4 text-[0.55rem]">Indice de classement</p>
                  <div className="flex flex-col gap-2">
                    <Badge active>{project.badge}</Badge>
                    <Badge>{tierLabel}</Badge>
                  </div>
                </CaseFile>
              </Reveal>

              <Reveal delay={2}>
                <CaseFile title={<p className="case-stamp text-[0.55rem]">Résultats attendus</p>}>
                  <ul className="space-y-3">
                    {features.slice(0, 5).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm leading-relaxed text-paper/75">
                        <span aria-hidden="true" className="mt-[3px] font-mono text-toxic">
                          ▸
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </CaseFile>
              </Reveal>
            </aside>
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-center gap-4 border-t border-olive-border/50 pt-10 sm:flex-row sm:justify-center">
              {project.github && (
                <Button href={project.github} variant="primary" external size="md">
                  GitHub <span aria-hidden="true">↗</span>
                </Button>
              )}
              {project.live && (
                <Button href={project.live} variant="outline" external size="md">
                  Live Demo <span aria-hidden="true">↗</span>
                </Button>
              )}
              <Button to="/" variant="outline" size="md">
                ← Retour au portfolio
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  )
}