import { useLocation } from 'react-router-dom'
import { HOME_SECTIONS } from './Navbar'
import useActiveSection from '../hooks/useActiveSection'

export default function SideDots() {
  const { pathname } = useLocation()
  if (pathname !== '/') return null
  return <SideDotsInner />
}

function SideDotsInner() {
  const active = useActiveSection(HOME_SECTIONS.map((s) => s.id))
  const activeIndex = Math.max(
    0,
    HOME_SECTIONS.findIndex((s) => s.id === active)
  )

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      <span aria-hidden="true" className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-smudge/60">
        {String(activeIndex + 1).padStart(2, '0')}/0{HOME_SECTIONS.length}
      </span>
      <span aria-hidden="true" className="relative h-32 w-px bg-olive-border/50">
        <span
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-toxic to-dirty-yellow transition-all duration-300"
          style={{ height: `${((activeIndex + 1) / HOME_SECTIONS.length) * 100}%` }}
        />
      </span>
      {HOME_SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={`Jump to ${s.label}`}
          aria-current={active === s.id ? 'true' : undefined}
          className="group relative flex items-center justify-center"
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-toxic ${
              active === s.id
                ? 'scale-125 bg-crimson-glow shadow-[0_0_8px_rgba(168,48,48,0.6)]'
                : 'bg-olive-border group-hover:bg-toxic/70'
            }`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.2em] text-smudge/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            {i + 1}. {s.label}
          </span>
        </a>
      ))}
      <span aria-hidden="true" className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-smudge/60">
        ZONE
      </span>
    </nav>
  )
}