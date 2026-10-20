import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  labelledBy?: string
}

export default function Section({ id, children, className = '', labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${className}`}
      {...(labelledBy ? { 'aria-labelledby': labelledBy } : {})}
    >
      {children}
    </section>
  )
}
