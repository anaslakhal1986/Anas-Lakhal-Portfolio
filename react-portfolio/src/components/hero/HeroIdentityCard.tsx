import type { HeroIdentity } from './identities'

interface HeroIdentityCardProps {
  identity: HeroIdentity
  active: boolean
  className?: string
  style: React.CSSProperties
}

export default function HeroIdentityCard({
  identity,
  active,
  className = '',
  style,
}: HeroIdentityCardProps) {
  return (
    <article
      aria-hidden={!active}
      className={`dossier-panel relative flex h-28 w-56 flex-col justify-between rounded-md border p-3 md:h-32 md:w-80 ${
        active
          ? 'border-toxic/45 bg-[linear-gradient(150deg,rgba(22,28,23,0.96),rgba(15,18,16,0.92))] shadow-glow'
          : 'border-olive-border/40 bg-deep-olive/80'
      } ${className}`}
      style={style}
    >
      <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-toxic/40" />
      <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-toxic/40" />

      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1.5 rounded-lg border border-dirty-yellow/20"
          style={{ transform: 'translateZ(0)' }}
        />
      )}

      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-dirty-yellow/70">
          {identity.id}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-smudge">
          <span aria-hidden="true" className={`status-dot ${active ? 'status-dot--active' : 'status-dot--yellow'}`} />
          {active ? 'ACTIVE' : 'KNOWN'}
        </span>
      </div>

      <div>
        <p className={`font-mono text-[0.5rem] uppercase tracking-[0.26em] ${active ? 'text-toxic' : 'text-smudge/70'}`}>
          {identity.profileLabel}
        </p>
        <p className={`mt-0.5 font-display text-base font-bold leading-[1.02] tracking-tight md:text-lg ${
          active ? 'text-paper' : 'text-paper/60'
        }`}>
          {identity.titleLine1}
          <br />
          {identity.titleLine2}
        </p>
        <div className={`mt-1.5 flex items-center gap-2 ${active ? 'opacity-100' : 'opacity-60'}`}>
          <span className={`h-px w-4 ${active ? 'bg-toxic/50' : 'bg-olive-border/50'}`} />
          <p className="font-mono text-[0.45rem] uppercase tracking-[0.18em] text-smudge">
            {identity.tagline}
          </p>
        </div>
        <p className="mt-0.5 font-mono text-[0.42rem] uppercase tracking-[0.16em] text-smudge/60">
          {identity.subline}
        </p>
      </div>

      <div className="hidden flex-wrap gap-1.5 sm:flex">
        {identity.tags.map((t) => (
          <span
            key={t}
            className={`rounded-sm border px-1.5 py-0.5 font-mono text-[0.5rem] tracking-[0.12em] ${
              active
                ? 'border-olive-border bg-white/[0.02] text-paper/70'
                : 'border-olive-border/40 text-smudge/50'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}
