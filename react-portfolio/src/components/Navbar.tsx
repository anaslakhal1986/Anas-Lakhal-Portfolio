import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/portfolio'
import useActiveSection from '../hooks/useActiveSection'
import useReducedMotion from '../hooks/useReducedMotion'

export const HOME_SECTIONS = [
  { id: 'about', label: 'Identité' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Systèmes' },
  { id: 'experience', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(HOME_SECTIONS.map((s) => s.id))
  const reduced = useReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform' }
      )
    }, el)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    const bar = barRef.current
    if (!bar || reduced) return
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
    return () => trigger.kill()
  }, [reduced])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const sectionLink = (id: string, label: string) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? 'true' : undefined}
      className={`group relative flex items-center gap-1.5 px-1 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
        active === id ? 'text-paper/90' : 'text-smudge hover:text-paper/80'
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1 w-1 rounded-full transition-all duration-300 ${
          active === id ? 'bg-crimson-glow shadow-[0_0_8px_rgba(168,48,48,0.6)]' : 'bg-transparent'
        }`}
      ></span>
      {label}
    </a>
  )

  const pill = (activePill: boolean) =>
    `rounded-full border px-4 py-1.5 font-mono text-[0.7rem] tracking-wide transition ${
      activePill
        ? 'border-toxic/40 bg-toxic/10 text-paper shadow-glow-sm'
        : 'border-olive-border text-smudge hover:border-toxic/40 hover:text-paper'
    }`

  const mobileItems: { label: string; href?: string; to?: string }[] = isHome
    ? [...HOME_SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.label }))]
    : [{ to: '/', label: '← Retour au Portfolio' }]

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 will-change-transform transition-all duration-300 ${
        scrolled
          ? 'border-b border-olive-border/50 bg-night/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div
        ref={barRef}
        aria-hidden="true"
        className="scroll-progress-bar relative z-10 h-[2px] bg-gradient-to-r from-toxic/70 via-dirty-yellow/60 to-crimson/60 shadow-glow-sm"
      />
      <nav aria-label="Primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="group flex items-center gap-2"
              aria-label="AL Portfolio — home"
            >
              <span
                aria-hidden="true"
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-toxic/40 bg-toxic/[0.06]"
              >
                <span className="h-2 w-2 rounded-full bg-toxic shadow-glow-sm"></span>
              </span>
              <span className="font-display text-sm font-bold tracking-[0.2em] text-paper/90 transition group-hover:text-paper md:text-base">
                {profile.brand}
              </span>
            </Link>
            <span
              aria-hidden="true"
              className="hidden font-mono text-[0.55rem] uppercase tracking-[0.3em] text-smudge sm:block"
            >
              · dossier system
            </span>
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            {isHome
              ? HOME_SECTIONS.map((s) => sectionLink(s.id, s.label))
              : (
                  <Link
                    to="/"
                    className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-smudge transition hover:text-paper/80"
                  >
                    ← Portfolio
                  </Link>
                )}
          </div>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link to="/personal" className={pill(pathname === '/personal')}>
              Identité
            </Link>
            <Link to="/skills" className={pill(pathname === '/skills')}>
              Systèmes
            </Link>
            <a
              href="#contact"
              className="relative overflow-hidden rounded-full border border-toxic/40 bg-toxic/10 px-4 py-1.5 text-sm font-medium text-paper shadow-glow-sm transition hover:bg-toxic/20 hover:shadow-glow"
            >
              Contact <span aria-hidden="true">→</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-toxic/25 bg-toxic/[0.05] text-paper/80 transition hover:border-toxic/50 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
                }`}
              ></span>
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
                }`}
              ></span>
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="animate-fade-in fixed inset-0 z-[-1] flex flex-col bg-night/95 px-6 pb-10 pt-24 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {mobileItems.map((item, i) => {
              const inner = (
                <>
                  <span aria-hidden="true" className="font-mono text-xs text-toxic/60">
                    {item.to ? '▲' : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-semibold text-paper/85 transition group-hover:text-paper">
                    {item.label}
                  </span>
                </>
              )
              const cls =
                'group flex items-baseline gap-4 border-b border-olive-border/50 py-4'
              return item.to ? (
                <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cls}
                >
                  {inner}
                </a>
              )
            })}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex gap-3">
              <Link
                to="/personal"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full border border-olive-border bg-white/[0.02] px-4 py-3 text-center text-sm text-smudge transition hover:border-toxic/40 hover:text-paper"
              >
                Identité
              </Link>
              <Link
                to="/skills"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full border border-olive-border bg-white/[0.02] px-4 py-3 text-center text-sm text-smudge transition hover:border-toxic/40 hover:text-paper"
              >
                Systèmes
              </Link>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-toxic/40 bg-toxic/10 px-5 py-3 text-center text-sm font-medium text-paper transition hover:bg-toxic/20"
            >
              Ouvrir le canal →
            </a>
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-smudge/60">
              {profile.email}
            </p>
          </div>
        </div>
      )}
    </header>
  )
}