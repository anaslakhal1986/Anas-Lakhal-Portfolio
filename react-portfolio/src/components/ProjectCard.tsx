import { useRef } from 'react'
import type { MouseEvent } from 'react'
import Button from './Button'
import useTilt from '../hooks/useTilt'
import type { Project } from '../data/portfolio'

interface ProjectCardProps {
  project: Project
  caseNumber?: number
  onOpen?: (project: Project) => void
}

function CaseTag({ project, caseNumber }: { project: Project; caseNumber?: number }) {
  const hasCaseStudy = Boolean(project.caseStudy)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] backdrop-blur-sm ${
        hasCaseStudy
          ? 'border-toxic/40 bg-dark-green/70 text-toxic'
          : 'border-olive-border/70 bg-night/60 text-smudge'
      }`}
    >
      {hasCaseStudy ? (
        <>
          <span aria-hidden="true" className="status-dot status-dot--active" />
          CASE {String(caseNumber ?? 0).padStart(2, '0')}
        </>
      ) : (
        <>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-dirty-yellow/70" />
          PROJECT FILE
        </>
      )}
    </span>
  )
}

function StakeStamp({ ai }: { ai?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.2em] ${
        ai
          ? 'border-crimson/60 bg-crimson/10 text-crimson-glow'
          : 'border-dirty-yellow/40 bg-dirty-yellow/[0.06] text-dirty-yellow/70'
      }`}
      style={ai ? { transform: 'rotate(-3deg)' } : undefined}
    >
      {ai ? 'AI SYSTEM' : 'VERIFIED'}
    </span>
  )
}

function MonogramTile({
  project,
  size,
  className = '',
}: {
  project: Project
  size: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-dark-green transition-transform duration-500 will-change-transform group-hover:scale-[1.03] ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40`}
      ></div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(139,163,98,0.08),transparent_58%)]"
      ></div>
      <span
        aria-hidden="true"
        className={`relative font-display font-bold text-paper/75 ${
          size === 'sm' ? 'text-3xl' : size === 'md' ? 'text-5xl' : 'text-6xl md:text-7xl'
        }`}
        style={{ textShadow: '0 0 30px rgba(139,163,98,0.2)' }}
      >
        {project.monogram}
      </span>
    </div>
  )
}

function CategoryRow({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {categories.map((c) => (
        <span
          key={c}
          className="rounded-full border border-olive-border bg-white/[0.02] px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-smudge"
        >
          {c}
        </span>
      ))}
    </div>
  )
}

function StackRow({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((t) => (
        <span
          key={t}
          className="rounded-sm border border-olive-border/60 bg-night/40 px-2 py-0.5 font-mono text-[0.6rem] text-smudge/90"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function CardActions({ project, onOpen }: { project: Project; onOpen?: (project: Project) => void }) {
  const hasCaseStudy = Boolean(project.caseStudy)
  return (
    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
      {hasCaseStudy ? (
        <Button
          variant={project.tier === 'featured' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onOpen?.(project)}
        >
          Ouvrir le dossier <span aria-hidden="true">→</span>
        </Button>
      ) : (
        <Button href={project.github ?? undefined} variant="outline" size="sm" external>
          Voir le projet <span aria-hidden="true">↗</span>
        </Button>
      )}
      {project.github && (
        <Button href={project.github} variant="subtle" size="sm" external>
          Code source <span aria-hidden="true">↗</span>
        </Button>
      )}
    </div>
  )
}

function CaseFrame({
  children,
  onOpen,
  selectable,
}: {
  children: React.ReactNode
  onOpen?: (project: Project) => void
  selectable?: boolean
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={wrapRef}
      onClick={
        selectable && onOpen
          ? (e: MouseEvent<HTMLDivElement>) => {
              const btn = (e.target as Element).closest('a, button')
              if (!btn) onOpen?.(null as unknown as Project)
            }
          : undefined
      }
      className={`relative ${selectable && onOpen ? 'cursor-pointer' : ''}`}
    >
      {children}
      {/* corner brackets */}
      <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-toxic/40" />
      <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-toxic/40" />
    </div>
  )
}

function FeaturedCard({ project, caseNumber, onOpen }: ProjectCardProps) {
  const tiltRef = useTilt<HTMLElement>({ max: 5, scale: 1.015 })
  return (
    <CaseFrame onOpen={onOpen} selectable>
      <article
        ref={tiltRef}
        className="dossier-panel dossier-panel-hover group flex h-full flex-col overflow-hidden will-change-transform"
        style={{ transform: 'perspective(1100px)' }}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 h-px w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-toxic/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
          />
          <MonogramTile project={project} size="lg" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-night/20" />
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <CaseTag project={project} caseNumber={caseNumber} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex items-center justify-between gap-3">
            <CategoryRow categories={project.categories} />
            <StakeStamp ai={project.ai} />
          </div>

          <h3 className="mt-3 font-display text-2xl font-bold text-paper">{project.name}</h3>
          {project.badge && (
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-smudge">
              {project.badge}
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-smudge">
            {project.short ?? project.description}
          </p>

          <div className="mt-4">
            <p className="case-stamp mb-2 text-[0.55rem]">Technologies</p>
            <StackRow stack={project.stack} />
          </div>

          <CardActions project={project} onOpen={onOpen} />
        </div>
      </article>
    </CaseFrame>
  )
}

function PrimaryCard({ project, caseNumber, onOpen }: ProjectCardProps) {
  const tiltRef = useTilt<HTMLElement>({ max: 4, scale: 1.01 })
  return (
    <CaseFrame onOpen={onOpen} selectable>
      <article
        ref={tiltRef}
        className="dossier-panel dossier-panel-hover group flex h-full flex-col overflow-hidden will-change-transform"
        style={{ transform: 'perspective(1100px)' }}
      >
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden">
          <MonogramTile project={project} size="md" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-night/20" />
          <div className="absolute left-4 top-4">
            <CaseTag project={project} caseNumber={caseNumber} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <CategoryRow categories={project.categories} />
            <StakeStamp ai={project.ai} />
          </div>
          <h3 className="mt-3 font-display text-xl font-bold text-paper">{project.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-smudge">{project.description}</p>

          <div className="mt-4">
            <p className="case-stamp mb-2 text-[0.55rem]">Technologies</p>
            <StackRow stack={project.stack} />
          </div>

          <CardActions project={project} onOpen={onOpen} />
        </div>
      </article>
    </CaseFrame>
  )
}

function SecondaryCard({ project, caseNumber, onOpen }: ProjectCardProps) {
  return (
    <CaseFrame onOpen={onOpen} selectable>
      <article className="dossier-panel dossier-panel-hover group flex h-full items-center gap-5 p-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
          <MonogramTile project={project} size="sm" className="absolute inset-0" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-paper">{project.name}</h3>
            <CaseTag project={project} caseNumber={caseNumber} />
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-smudge">
            {project.description}
          </p>
          <div className="mt-3">
            <StackRow stack={project.stack.slice(0, 4)} />
          </div>
          <div className="mt-3">
            <CardActions project={project} onOpen={onOpen} />
          </div>
        </div>
      </article>
    </CaseFrame>
  )
}

export default function ProjectCard({ project, caseNumber, onOpen }: ProjectCardProps) {
  if (project.tier === 'featured')
    return <FeaturedCard project={project} caseNumber={caseNumber} onOpen={onOpen} />
  if (project.tier === 'primary')
    return <PrimaryCard project={project} caseNumber={caseNumber} onOpen={onOpen} />
  return <SecondaryCard project={project} caseNumber={caseNumber} onOpen={onOpen} />
}