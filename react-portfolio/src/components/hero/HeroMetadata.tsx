import { profile } from '../../data/portfolio'

const location = (profile.location.split(',').pop() ?? 'Morocco').trim().toUpperCase()

const ROWS: Array<[string, string]> = [
  ['CASE FILE', '001'],
  ['IDENTITY', 'VERIFIED'],
  ['STATUS', 'ACTIVE'],
  ['LOCATION', location],
]

export default function HeroMetadata() {
  return (
    <div data-hero="metadata" className="inline-flex flex-col">
      {ROWS.map(([label, value], i) => (
        <div
          key={label}
          className={`flex items-center gap-3 py-1.5 ${
            i < ROWS.length - 1 ? 'border-b border-olive-border/40' : ''
          }`}
        >
          <span className="w-20 font-mono text-[0.55rem] uppercase tracking-[0.28em] text-smudge">
            {label}
          </span>
          <span className="h-px w-3 bg-dirty-yellow/30" />
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.28em] text-paper/85">
            {value}
          </span>
          {label === 'STATUS' && (
            <span aria-hidden="true" className="status-dot status-dot--active" />
          )}
        </div>
      ))}
    </div>
  )
}