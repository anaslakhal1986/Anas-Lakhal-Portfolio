import { useLayoutEffect, useRef, useState } from 'react'
import { HERO_IDENTITIES } from './identities'
import HeroIdentityCard from './HeroIdentityCard'

interface HeroIdentityCarouselProps {
  activeIndex: number
  onChange: (index: number) => void
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function offsetOf(active: number, i: number, n: number) {
  let off = ((i - active) % n + n) % n
  if (off > Math.floor(n / 2)) off -= n
  return off
}

export default function HeroIdentityCarousel({ activeIndex, onChange }: HeroIdentityCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackW, setTrackW] = useState(0)
  const drag = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false })

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => setTrackW(el.clientWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const cardW = trackW > 0 ? Math.min(Math.max(trackW * 0.42, 230), 360) : 280
  const neighborX = trackW > 0 ? trackW / 2 - cardW / 2 + 14 : 0
  const stride = neighborX + cardW * 0.95

  const go = (step: number) =>
    onChange((activeIndex + step + HERO_IDENTITIES.length) % HERO_IDENTITIES.length)

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, active: true }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    drag.current.active = false
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (drag.current.active) {
      const dx = e.clientX - drag.current.x
      if (Math.abs(dx) > 6) e.preventDefault()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  const arrowBtn =
    'group flex h-10 w-10 items-center justify-center rounded-full border border-olive-border/70 bg-night/40 text-smudge transition-colors duration-300 hover:border-toxic/50 hover:text-toxic focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-toxic/50'

  return (
    <div
      data-hero="carousel"
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Profils d'identité"
      onKeyDown={onKeyDown}
    >
      <div className="mb-2 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-toxic/40" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-smudge">
          IDENTITY PROFILES
        </span>
        <span aria-hidden="true" className="status-dot status-dot--active" />
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-toxic/80">
          ONLINE
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-toxic/40" />
      </div>

      <div className="relative flex h-36 items-center justify-center md:h-40">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Profil d'identité précédent"
          className={`${arrowBtn} absolute left-2 z-40`}
        >
          <span aria-hidden="true" className="text-lg leading-none transition-transform duration-300 group-hover:-translate-x-0.5">
            ‹
          </span>
        </button>

        <div
          ref={trackRef}
          className="relative h-full w-full cursor-grab select-none touch-pan-y [perspective:900px] md:[perspective:1300px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
        >
          {HERO_IDENTITIES.map((identity, i) => {
            const off = offsetOf(activeIndex, i, HERO_IDENTITIES.length)
            const isActive = off === 0
            const side = off > 0 ? 1 : -1
            const abs = Math.abs(off)
            const x = side * (abs === 1 ? neighborX : neighborX + stride)
            const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.68
            const rotateY = isActive ? 0 : abs === 1 ? side * -12 : 0
            const opacity = isActive ? 1 : abs === 1 ? 0.5 : 0.16
            const z = isActive ? 30 : abs === 1 ? 20 : 5

            return (
              <HeroIdentityCard
                key={identity.id}
                identity={identity}
                className="absolute left-1/2 top-0"
                style={{
                  transform: `translate(calc(-50% + ${x}px), -100%) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: z,
                  transition: `transform 0.55s ${EASE}, opacity 0.55s ease, background-color 0.55s ease, border-color 0.55s ease`,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                active={isActive}
              />
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Profil d'identité suivant"
          className={`${arrowBtn} absolute right-2 z-40`}
        >
          <span aria-hidden="true" className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-0.5">
            ›
          </span>
        </button>
      </div>
    </div>
  )
}
