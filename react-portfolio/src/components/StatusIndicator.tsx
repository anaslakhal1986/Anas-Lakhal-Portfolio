interface StatusIndicatorProps {
  label: string
  tone?: 'active' | 'crimson' | 'yellow'
  className?: string
}

export default function StatusIndicator({ label, tone = 'active', className = '' }: StatusIndicatorProps) {
  const dotTone =
    tone === 'crimson'
      ? 'status-dot status-dot--crimson'
      : tone === 'yellow'
        ? 'status-dot status-dot--yellow'
        : 'status-dot status-dot--active'

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-smudge ${className}`}>
      <span aria-hidden="true" className={dotTone} />
      {label}
    </span>
  )
}