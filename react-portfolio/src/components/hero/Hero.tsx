import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../../hooks/useReducedMotion'
import { profile } from '../../data/portfolio'
import HeroBackground from './HeroBackground'
import HeroMetadata from './HeroMetadata'
import HeroIdentityCarousel from './HeroIdentityCarousel'

const [FIRST, LAST] = profile.name.toUpperCase().split(' ')
const NAME_ELEMENTS: Record<string, string> = { ANAS: '33', LAKHAL: '57' }

const STATEMENT =
  'An investigation into the work and identity of a full stack developer — clean code, scalable architecture, production-grade delivery.'

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [activeIdentity, setActiveIdentity] = useState(0)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(root.querySelectorAll('[data-hero]'), { clearProps: 'all' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero="metadata"]', { y: -18, duration: 0.7 }, 0)
        .from('[data-hero="rule"]', { scaleX: 0, transformOrigin: 'left center', duration: 0.45 }, '-=0.5')
        .from('[data-hero="title"]', { y: 22, duration: 0.55 }, '-=0.4')
        .from('[data-hero="statement"]', { y: 16, duration: 0.55 }, '-=0.45')
        .from('[data-hero="cta"]', { y: 14, duration: 0.5 }, '-=0.5')
        .from('[data-hero="carousel"]', { y: 24, duration: 0.65 }, '-=0.35')
        .from('[data-hero="scroll"]', { duration: 0.45 }, '-=0.3')

      const forceVisible = window.setTimeout(() => {
        tl.kill()
        gsap.set(root.querySelectorAll('[data-hero]'), { clearProps: 'all' })
      }, tl.totalDuration() * 1000 + 400)
      return () => window.clearTimeout(forceVisible)
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative isolate z-[2] flex min-h-[100svh] flex-col overflow-hidden bg-night"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pb-5 pt-28 sm:px-8 lg:pt-28">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8">
          <div className="order-1 space-y-6 lg:pl-8">
            <HeroMetadata />

            <div>
              <h1 className="font-display text-[2.9rem] font-bold leading-[0.88] tracking-[-0.06em] text-paper sm:text-6xl lg:text-[6.5rem]">
                {[FIRST, LAST].map((word) => (
                  <span key={word} className="block overflow-hidden pb-1">
                    <span data-hero="name-word" className="flex items-end will-change-transform">
                      <span className="hero-name-element" aria-label={`${word.slice(0, 2)} element, atomic number ${NAME_ELEMENTS[word]}`}>
                        <span className="hero-name-element__number">{NAME_ELEMENTS[word]}</span>
                        <span className="hero-name-element__symbol">{word.slice(0, 2)}</span>
                      </span>
                      <span className="hero-name-rest">{word.slice(2)}</span>
                    </span>
                  </span>
                ))}
              </h1>
              <span aria-hidden="true" data-hero="rule" className="mt-6 block h-[3px] w-20 bg-crimson/90 shadow-crimson-glow" />
            </div>

            <div data-hero="title">
              <p className="border-l-2 border-crimson pl-5 font-mono text-lg font-medium uppercase leading-relaxed tracking-[0.12em] text-paper sm:text-xl">
                FULL STACK DEVELOPER
                <br />
                <span className="text-paper/90">& AI INTEGRATOR</span>
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.3em] text-smudge">
                WEB APPLICATIONS · FRONTEND / BACKEND
              </p>
            </div>

            <p data-hero="statement" className="max-w-md text-sm leading-relaxed text-smudge">
              {STATEMENT}
            </p>

            <div data-hero="cta" className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#about"
                className="group inline-flex items-center gap-2.5 rounded-full border border-crimson/60 py-2.5 pl-5 pr-2 text-sm font-medium tracking-wide text-paper transition-all duration-300 hover:border-crimson-glow hover:bg-crimson/10 hover:shadow-crimson-glow"
              >
                ENTER MY WORLD
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-crimson/40 text-xs text-crimson-glow transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <span
                aria-hidden="true"
                className="hidden items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-smudge/70 sm:inline-flex"
              >
                <span className="inline-block h-1.5 w-10 rounded-sm bg-smudge/30" />
                REDACTED
              </span>
            </div>
          </div>

        </div>

        <div className="mt-5 lg:absolute lg:inset-x-8 lg:bottom-2 lg:z-20 lg:mt-0">
          <HeroIdentityCarousel activeIndex={activeIdentity} onChange={setActiveIdentity} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-scroll absolute bottom-5 left-5 z-20 hidden flex-col items-center gap-2 md:flex"
        data-hero="scroll"
      >
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.4em] text-smudge">scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-olive-border/60">
          <span className="hero-scroll-dot absolute left-0 top-0 block h-2 w-px bg-toxic" />
        </span>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />

      <style>{`
        @keyframes hero-scroll-dot {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(38px); opacity: 0; }
        }
        .hero-scroll-dot { animation: hero-scroll-dot 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        @keyframes hero-sweep {
          0% { transform: translateX(-130%) skewX(-12deg); }
          55% { transform: translateX(260%) skewX(-12deg); }
          100% { transform: translateX(260%) skewX(-12deg); }
        }
        .hero-sweep { animation: hero-sweep 7s linear infinite; }
        .hero-name-element {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          aspect-ratio: 1;
          height: 0.94em;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          margin: 0 0.055em 0.005em 0;
          overflow: hidden;
          border: 1px solid rgba(202, 183, 75, 0.88);
          background-color: rgba(68, 78, 24, 0.82);
          background-image:
            linear-gradient(135deg, rgba(179, 177, 70, 0.22), transparent 41%),
            radial-gradient(circle at 76% 18%, rgba(224, 207, 105, 0.2), transparent 25%),
            radial-gradient(circle at 18% 88%, rgba(19, 29, 10, 0.5), transparent 58%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E"),
            linear-gradient(145deg, rgba(104, 116, 35, 0.95), rgba(44, 55, 15, 0.95));
          background-blend-mode: screen, screen, multiply, soft-light, normal;
          box-shadow:
            inset 0 0 0 1px rgba(249, 232, 129, 0.12),
            inset 0 0 1.1em rgba(13, 18, 5, 0.36),
            0 0.1em 0.48em rgba(145, 130, 38, 0.18);
        }
        .hero-name-element::before {
          content: '';
          position: absolute;
          z-index: -1;
          inset: 0.065em;
          border-top: 1px solid rgba(243, 225, 128, 0.18);
          border-left: 1px solid rgba(243, 225, 128, 0.1);
          opacity: 0.9;
        }
        .hero-name-element::after {
          content: '';
          position: absolute;
          z-index: -1;
          top: -20%;
          right: -35%;
          width: 85%;
          height: 150%;
          transform: rotate(24deg);
          background: linear-gradient(90deg, transparent, rgba(245, 229, 138, 0.16), transparent);
          mix-blend-mode: screen;
        }
        .hero-name-element__number {
          position: absolute;
          top: 0.12em;
          right: 0.14em;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.15em;
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.06em;
          color: rgba(248, 243, 218, 0.84);
        }
        .hero-name-element__symbol {
          position: relative;
          z-index: 1;
          margin-top: 0.11em;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68em;
          font-weight: 700;
          line-height: 0.8;
          letter-spacing: -0.1em;
          color: #f0ede1;
          text-shadow: 0 0.04em 0.2em rgba(0, 0, 0, 0.36);
        }
        .hero-name-rest {
          margin-left: -0.025em;
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 600;
          letter-spacing: -0.09em;
          color: rgba(232, 228, 220, 0.95);
        }
      `}</style>
    </section>
  )
}
