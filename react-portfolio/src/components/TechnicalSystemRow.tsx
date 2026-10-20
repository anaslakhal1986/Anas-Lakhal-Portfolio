interface TechnicalSystemRowProps {
  name: string
  percent?: number
  meta?: string
  className?: string
}

export default function TechnicalSystemRow({
  name,
  percent,
  meta,
  className = '',
}: TechnicalSystemRowProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-sm font-medium tracking-wide text-paper/90">{name}</span>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-smudge">
          {meta ?? 'ACTIVE'}
          {typeof percent === 'number' && ` — ${percent}%`}
        </span>
      </div>
      <div
        className="mt-1.5 h-px bg-olive-border/50"
        role="presentation"
      >
        {typeof percent === 'number' && (
          <div
            className="h-px origin-left bg-gradient-to-r from-toxic/70 to-dirty-yellow/50"
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
    </div>
  )
}