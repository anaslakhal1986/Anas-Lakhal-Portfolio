import type { ReactNode, MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'subtle'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toxic/50 will-change-transform'

const variants: Record<Variant, string> = {
  primary:
    'relative border border-toxic/40 bg-toxic/[0.08] text-paper shadow-glow-sm hover:bg-toxic/[0.16] hover:border-toxic/70 hover:shadow-glow overflow-hidden',
  outline:
    'border border-olive-border bg-transparent text-paper/80 hover:border-toxic/50 hover:text-paper hover:bg-white/[0.03]',
  subtle:
    'border border-olive-border/70 bg-transparent text-smudge hover:border-dirty-yellow/40 hover:text-paper hover:bg-white/[0.02]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs font-mono tracking-wide',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  to?: string
  href?: string
  onClick?: MouseEventHandler
  type?: 'button' | 'submit'
  className?: string
  ariaLabel?: string
  external?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}