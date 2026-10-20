import type { ReactNode } from 'react'

interface CaseFileProps {
  caseNumber?: string
  status?: string
  statusTone?: 'active' | 'crimson' | 'yellow'
  title?: ReactNode
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function CaseFile({
  caseNumber,
  status,
  statusTone = 'active',
  title,
  children,
  className = '',
  hover = false,
}: CaseFileProps) {
  const dotTone =
    statusTone === 'crimson'
      ? 'status-dot status-dot--crimson'
      : statusTone === 'yellow'
        ? 'status-dot status-dot--yellow'
        : 'status-dot status-dot--active'

  return (
    <div className={`dossier-panel p-6 md:p-8 ${hover ? 'dossier-panel-hover' : ''} ${className}`}>
      {(caseNumber || status) && (
        <div className="mb-5 flex items-center gap-3 border-b border-olive-border/60 pb-3">
          {caseNumber && (
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-dirty-yellow/80">
              {caseNumber}
            </span>
          )}
          {status && (
            <span className="ml-auto flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-smudge">
              <span aria-hidden="true" className={dotTone} />
              {status}
            </span>
          )}
        </div>
      )}
      {title && <div className="mb-4">{title}</div>}
      {children}
    </div>
  )
}