interface CaseMetadataProps {
  items: [string, string][]
  className?: string
}

export default function CaseMetadata({ items, className = '' }: CaseMetadataProps) {
  return (
    <dl className={className}>
      {items.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-baseline justify-between gap-4 py-2.5 ${
            i < items.length - 1 ? 'border-b border-olive-border/50' : ''
          }`}
        >
          <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-smudge">{label}</dt>
          <dd className="text-right font-mono text-xs text-paper/85">{value}</dd>
        </div>
      ))}
    </dl>
  )
}