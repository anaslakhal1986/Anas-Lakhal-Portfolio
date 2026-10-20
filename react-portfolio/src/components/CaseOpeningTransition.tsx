import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion'

export type CaseAccessOutcome = 'granted' | 'pending'

interface CaseOpeningTransitionProps {
  caseNumber: string
  targetPath?: string
  onComplete: () => void
  outcome: CaseAccessOutcome
}

export default function CaseOpeningTransition({
  caseNumber,
  targetPath,
  onComplete,
  outcome,
}: CaseOpeningTransitionProps) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      if (outcome === 'granted' && targetPath) navigate(targetPath)
      onComplete()
      return
    }

    const lines =
      outcome === 'granted'
        ? [
            { text: 'ACCESS REQUESTED', cls: 'text-smudge' },
            { text: 'VERIFYING…', cls: 'text-smudge' },
            { text: 'ACCESS GRANTED', cls: 'text-toxic' },
          ]
        : [
            { text: 'INCOMPLETE FILE', cls: 'text-smudge' },
            { text: 'DETAILED REPORT PENDING', cls: 'text-dirty-yellow/80' },
          ]

    const totalDelay = lines.length * 0.5 + 0.8

    const ctx = gsap.context(() => {
      lines.forEach((_line, i) => {
        gsap.fromTo(
          el.querySelectorAll(`[data-line="${i}"]`),
          { autoAlpha: 0, y: 12, letterSpacing: '0.2em' },
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: '0.35em',
            duration: 0.45,
            ease: 'power2.out',
            delay: i * 0.5,
          }
        )
      })

      const tl = gsap.timeline({ delay: totalDelay })
      tl.to(el, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' })
      if (outcome === 'granted' && targetPath) {
        tl.add(() => navigate(targetPath))
      }
      tl.add(() => onComplete())
    }, el)

    return () => ctx.revert()
  }, [reduced, outcome, targetPath, onComplete, navigate])

  const lines =
    outcome === 'granted'
      ? ['ACCESS REQUESTED', 'VERIFYING…', 'ACCESS GRANTED']
      : ['INCOMPLETE FILE', 'DETAILED REPORT PENDING']

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[80] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-night/95 backdrop-blur-sm" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-dirty-yellow/80">
          {caseNumber}
        </p>
        {lines.map((line, i) => (
          <p
            key={line}
            data-line={i}
            className={`font-display text-xl font-semibold uppercase tracking-[0.35em] md:text-2xl ${
              outcome === 'granted' && i === 2 ? 'text-toxic' : 'text-smudge'
            }`}
            style={{ opacity: 0 }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}