import type { ReactNode, MouseEventHandler } from 'react'

interface BadgeProps {
  children: ReactNode
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Badge({ children, active = false, onClick, className = '' }: BadgeProps) {
  const shared = `rounded-full border px-3 py-1.5 text-xs font-mono tracking-wide transition-all duration-300 will-change-transform ${
    active
      ? 'border-toxic/50 bg-toxic/10 text-paper shadow-glow-sm'
      : 'border-olive-border bg-white/[0.02] text-smudge hover:border-toxic/30 hover:text-paper/80'
  } ${className}`

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toxic/50 ${shared}`}
      >
        {children}
      </button>
    )
  }

  return <span className={shared}>{children}</span>
}