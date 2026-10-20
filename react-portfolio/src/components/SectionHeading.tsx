import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  code?: string
  title: ReactNode
  description?: ReactNode
  headingId?: string
  className?: string
}

export default function SectionHeading({
  eyebrow,
  code,
  title,
  description,
  headingId,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <p className="case-stamp mb-3 font-mono text-[0.65rem] uppercase tracking-[0.28em]">
        <span className="text-sm leading-none text-toxic/70">{code ?? '••'}</span>
        <span className="ml-2">{eyebrow}</span>
      </p>
      <h2
        id={headingId}
        className="font-display text-3xl font-bold leading-tight tracking-tight text-paper md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-smudge md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}