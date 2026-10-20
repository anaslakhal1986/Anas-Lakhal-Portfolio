import useReducedMotion from '../hooks/useReducedMotion'

function RingedPlanet({
  className = '',
  size = 320,
  palette = 'green',
}: {
  className?: string
  size?: number
  palette?: 'green' | 'olive' | 'dark'
}) {
  const core =
    palette === 'olive'
      ? ['#2a3028', '#3d4a2e', '#0f1210']
      : palette === 'dark'
        ? ['#1a1c1a', '#252820', '#050505']
        : ['#1a2c1a', '#3a5a2a', '#0f1210']
  const ring =
    palette === 'olive'
      ? 'rgba(156,138,98,0.25)'
      : palette === 'dark'
        ? 'rgba(107,102,90,0.2)'
        : 'rgba(139,163,98,0.28)'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, filter: 'drop-shadow(0 0 34px rgba(139,163,98,0.15))' }}
    >
      <div className="relative h-full w-full" style={{ perspective: 900 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 28%, ${core[0]}, ${core[1]} 52%, ${core[2]} 95%), radial-gradient(circle at 65% 20%, rgba(255,255,255,0.14), transparent 42%)`,
            boxShadow: 'inset -24px -18px 60px rgba(0,0,0,0.85)',
            transform: 'translateZ(0)',
          }}
        />
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ transform: 'translateZ(0)' }}
        >
          <div
            className="absolute h-full w-[250%] animate-spin-slow"
            style={{
              left: '-75%',
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 30px, transparent 30px 74px, rgba(255,255,255,0.04) 74px 118px)',
            }}
          />
        </div>
        <div className="absolute inset-0 rounded-full" style={{ transform: 'translateZ(0)' }} />
        <div
          className="absolute inset-x-0 mx-auto rounded-[50%] border-2"
          style={{
            top: '16%',
            height: '68%',
            width: '150%',
            left: '-25%',
            borderColor: ring,
            transform: 'rotateX(74deg)',
            boxShadow: `0 0 26px ${ring}, inset 0 0 22px 8px rgba(0,0,0,0.5)`,
          }}
        />
      </div>
    </div>
  )
}

function OrbitSystem({
  size = 240,
  duration = 22,
  reverse = false,
}: {
  size?: number
  duration?: number
  reverse?: boolean
}) {
  return (
    <div aria-hidden="true" style={{ width: size, height: size }} className="pointer-events-none select-none">
      <div
        className="relative h-full w-full animate-spin-slower"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        <div className="absolute inset-0 rounded-full border border-olive-border/30" />
        <div
          className="absolute inset-6 rounded-full border border-olive-border/20"
          style={{ animationDirection: 'reverse' }}
        />
        <span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 animate-pulse-dot rounded-full bg-toxic/70"
          style={{ ['--orbit-r' as string]: '0px' }}
        />
        <span
          className="absolute inset-0"
          style={{ ['--orbit-duration' as string]: `${duration}s`, ['--orbit-r' as string]: '50%' }}
        >
          <span className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 animate-orbit -translate-x-1/2 -translate-y-1/2 rounded-full bg-toxic shadow-glow-sm" />
        </span>
        <span
          className="absolute inset-0 opacity-70"
          style={{
            ['--orbit-duration' as string]: `${duration * 1.6}s`,
            ['--orbit-r' as string]: '50%',
          }}
        >
          <span className="absolute left-1/2 top-1/2 block h-2 w-2 animate-orbit -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/70 shadow-glow-sm" />
        </span>
      </div>
    </div>
  )
}

function AsteroidField({ className = '' }: { className?: string }) {
  const rocks = [
    { l: '12%', t: '20%', s: 5, d: '0s' },
    { l: '74%', t: '8%', s: 3, d: '-1.2s' },
    { l: '88%', t: '38%', s: 6, d: '-2s' },
    { l: '30%', t: '82%', s: 4, d: '-0.6s' },
    { l: '8%', t: '70%', s: 3, d: '-3s' },
    { l: '62%', t: '58%', s: 5, d: '-2.6s' },
    { l: '42%', t: '6%', s: 4, d: '-1.6s' },
    { l: '52%', t: '90%', s: 3, d: '-3.6s' },
  ]
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      {rocks.map((r, i) => (
        <span
          key={i}
          className="absolute block animate-twinkle rounded-[42%_58%_50%_50%/50%_50%_60%_40%] bg-smudge/30"
          style={{
            left: r.l,
            top: r.t,
            width: r.s * 2.2,
            height: r.s * 2.2,
            animationDelay: r.d,
            animationDuration: '5s',
          }}
        />
      ))}
    </div>
  )
}

export default function GalaxyObjects() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${reduced ? 'opacity-60' : ''}`}
    >
      <div className="truncate-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_-10%,rgba(90,122,58,0.12),transparent_60%)]" />

      <div className="hidden md:block">
        <div className="absolute -left-28 top-[8%] md:left-[-4rem] lg:left-[-3rem]">
          <RingedPlanet size={300} palette="dark" className="animate-drift opacity-60" />
          <div className="absolute -right-10 top-6">
            <OrbitSystem size={130} duration={16} reverse />
          </div>
        </div>

        <div className="absolute right-[-7rem] top-[44%] opacity-50">
          <RingedPlanet size={420} palette="olive" className="animate-drift-slow" />
        </div>

        <div className="absolute left-[52%] top-[70%] opacity-55">
          <OrbitSystem size={240} duration={30} />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="absolute right-[6%] top-[26%]">
          <div className="h-3 w-3 animate-twinkle rounded-full bg-toxic/30 shadow-glow-sm" style={{ animationDelay: '-1s' }} />
        </div>
        <div className="absolute left-[16%] top-[40%]">
          <div className="h-2 w-2 animate-twinkle rounded-full bg-dirty-yellow/25" style={{ animationDelay: '-2.4s' }} />
        </div>
        <div className="absolute right-[18%] top-[60%]">
          <div className="h-2.5 w-2.5 animate-twinkle rounded-full bg-amber/30" style={{ animationDelay: '-0.4s' }} />
        </div>
      </div>

      <AsteroidField className="absolute inset-0 hidden sm:block" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(2,4,2,0.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
    </div>
  )
}