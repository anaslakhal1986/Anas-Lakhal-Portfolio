import { Link } from 'react-router-dom'
import { Container } from './Container'
import { profile, socials } from '../data/portfolio'

const explore = [
  { label: 'Identité', href: '#about' },
  { label: 'Missions', href: '#projects' },
  { label: 'Systèmes', href: '#skills' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: socials.github, external: true },
  { label: 'LinkedIn', href: socials.linkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, external: false },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-olive-border/50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-night/0 to-night/70"></div>
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="status-dot status-dot--active" />
              <p className="font-display text-sm font-bold tracking-[0.2em] text-paper/90">
                {profile.brand}
              </p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-smudge">
              Full Stack Developer building scalable web applications with clean architecture and
              modern UI.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="rounded-full border border-olive-border bg-white/[0.02] px-3.5 py-1.5 font-mono text-[0.7rem] text-smudge transition hover:border-toxic/40 hover:text-paper"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer explore" className="md:justify-self-center">
            <p className="case-stamp mb-4">// Navigation</p>
            <ul className="space-y-2.5">
              {explore.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-smudge transition hover:text-paper"
                  >
                    <span aria-hidden="true" className="text-toxic/0 transition group-hover:text-toxic/70">›</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer pages" className="md:justify-self-end">
            <p className="case-stamp mb-4">// Modules</p>
            <ul className="space-y-2.5">
              <li>
                <Link to="/personal" className="text-sm text-smudge transition hover:text-paper">
                  Identité
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-sm text-smudge transition hover:text-paper">
                  Systèmes techniques
                </Link>
              </li>
              <li>
                <a href={socials.github} target="_blank" rel="noreferrer" className="text-sm text-smudge transition hover:text-paper">
                  GitHub
                </a>
              </li>
              <li>
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-sm text-smudge transition hover:text-paper">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-olive-border/50 pt-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-smudge/60">
            © 2025 Anas Lakhal — Full Stack Developer
          </p>
          <p aria-hidden="true" className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-smudge/50 md:block">
            LOC: Youssoufia, Morocco — STATUS: ONLINE
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 font-mono text-xs text-smudge transition hover:text-paper"
          >
            Retour au sommet <span aria-hidden="true">↑</span>
          </button>
        </div>
      </Container>
    </footer>
  )
}