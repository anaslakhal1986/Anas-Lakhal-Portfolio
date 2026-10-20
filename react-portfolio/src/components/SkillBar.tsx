import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import useInView from '../hooks/useInView'
import useReducedMotion from '../hooks/useReducedMotion'

interface SkillBarProps {
  name: string
  percent: number
  label?: string
  variant?: 'home' | 'page'
  trackClass?: string
}

export default function SkillBar({
  name,
  percent,
  label,
  variant = 'home',
  trackClass = '',
}: SkillBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const fillRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = fillRef.current
    if (!el) return
    if (reduced) {
      gsap.set(el, { scaleX: percent / 100 })
      return
    }
    if (inView) {
      const tween = gsap.fromTo(
        el,
        { scaleX: 0 },
        { scaleX: percent / 100, duration: 1, ease: 'power3.out', delay: 0.15 }
      )
      return () => {
        tween.kill()
      }
    }
    gsap.set(el, { scaleX: 0 })
  }, [inView, percent, reduced])

  const percentClass = variant === 'page' ? 'text-smudge' : 'text-smudge/70'

  return (
    <div className="group">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-display text-sm font-medium text-paper/90 transition group-hover:text-paper">
          {name}
        </span>
        <span className={`font-mono text-[0.6rem] uppercase tracking-[0.18em] ${percentClass}`}>
          {label ?? `EXPERIENCE: ${percent}%`}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={name}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        ref={ref}
        className={`h-[2px] w-full overflow-hidden rounded-full bg-olive-border/40 ${trackClass}`}
      >
        <div
          ref={fillRef}
          className="skill-fill h-full w-full rounded-full bg-toxic/70 shadow-glow-sm"
        ></div>
      </div>
    </div>
  )
}