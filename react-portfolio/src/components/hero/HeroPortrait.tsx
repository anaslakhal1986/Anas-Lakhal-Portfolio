import heroPortrait from '../../assets/images/heroPortrait.png'
import { profile } from '../../data/portfolio'

export default function HeroPortrait() {
  const nameUpper = profile.name.toUpperCase()

  return (
    <div data-hero="portrait" data-parallax="12" className="relative isolate">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[6%] h-[70%] w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,180,74,0.10),rgba(90,122,58,0.12)_45%,transparent_70%)] blur-2xl"
      />

      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[10%] h-[55%] w-[45%] bg-[radial-gradient(ellipse_at_center,rgba(139,32,32,0.14),transparent_65%)] blur-2xl"
      />

      <div data-hero="portrait-in" className="relative">
        <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-[min(64vh,690px)] lg:min-h-[500px]">
          <img
            src={heroPortrait}
            alt={`${profile.name} — Full Stack Developer & AI Integrator`}
            className="absolute inset-0 z-10 h-full w-full object-contain object-bottom brightness-[0.62] contrast-125 saturate-[0.68] sepia-[0.22] drop-shadow-[0_36px_52px_rgba(0,0,0,0.95)]"
            loading="eager"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_30%_86%,rgba(50,72,26,0.50),transparent_56%)] mix-blend-multiply"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[linear-gradient(100deg,transparent_42%,rgba(201,180,74,0.16)_52%,transparent_62%)] mix-blend-overlay"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[linear-gradient(175deg,rgba(244,197,83,0.14),transparent_32%)] mix-blend-color-dodge"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-[8%] right-[14%] z-20 w-px bg-gradient-to-b from-transparent via-crimson/50 to-transparent"
          />

          <div
            aria-hidden="true"
            className="hero-sweep absolute inset-y-0 z-20 w-1/3 bg-[linear-gradient(105deg,transparent,rgba(201,180,74,0.08),transparent)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')] opacity-[0.05] mix-blend-overlay animate-grain"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_50%_40%,transparent_52%,rgba(0,0,0,0.55)_100%)]"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-[3%] left-1/2 h-9 w-[68%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-xl"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-1">
        <p className="flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-smudge">
          <span aria-hidden="true" className="status-dot status-dot--active" />
          Subject : {nameUpper}
        </p>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.25em] text-dirty-yellow/70">
          FILE 001
        </p>
      </div>
    </div>
  )
}
