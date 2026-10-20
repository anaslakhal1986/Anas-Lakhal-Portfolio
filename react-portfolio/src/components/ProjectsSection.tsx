import { useState, useRef, useEffect, useCallback } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import { projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface ProjectsSectionProps {
  openCase: (project: Project) => void
}

const TOTAL = projects.length

const GOLD = '#c9b44a'
const OLIVE = '#8ba362'
const CRIM = '#a83030'
const PAPER = '#e8e2d2'
const MUTE = '#8f8a79'
const DARK = '#0a0d08'

interface Metrics {
  cardW: number
  cardH: number
  spacing: number
  drop: number
  recede: number
  tilt: number
  persp: number
}

function breakpoints(): Metrics {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280
  if (w < 480) return { cardW: 276, cardH: 492, spacing: 164, drop: 23, recede: 156, tilt: 30, persp: 850 }
  if (w < 768) return { cardW: 322, cardH: 556, spacing: 202, drop: 27, recede: 188, tilt: 28, persp: 1000 }
  if (w < 1152) return { cardW: 378, cardH: 616, spacing: 242, drop: 31, recede: 216, tilt: 26, persp: 1200 }
  return { cardW: 410, cardH: 664, spacing: 262, drop: 35, recede: 234, tilt: 24, persp: 1400 }
}

function poseOf(d: number, m: Metrics) {
  const ad = Math.abs(d)
  const s = Math.max(0.62, 1 - ad * 0.15)
  return {
    x: d * m.spacing,
    y: Math.pow(ad, 1.4) * m.drop,
    z: -ad * m.recede,
    ry: -d * m.tilt,
    s,
    opacity: Math.max(0.14, 1 - ad * 0.27),
    blur: Math.min(2.5, ad * 1.05),
    zIn: Math.round(120 - d * 20),
    hit: Math.round(d) === 0,
    dim: ad * 0.07,
  }
}

/* ────────────────────────── SVG PROJECT VISUALS ────────────────────────── */

function Barcode({ x = 0, y = 0 }: { x?: number; y?: number }) {
  const bars = [2, 3, 1, 2, 4, 1, 2, 3, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 3, 1, 2]
  let cx = x
  return (
    <g opacity={0.35}>
      {bars.map((b, i) => {
        const el = <rect key={i} x={cx} y={y} width={b} height={7} fill={PAPER} />
        cx += b + 1
        return el
      })}
    </g>
  )
}

function Scanlines() {
  return (
    <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="none" />
      <rect width="4" height="1.4" fill={PAPER} opacity={0.045} />
    </pattern>
  )
}

function ShellFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 420 262" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <Scanlines />
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1009" />
          <stop offset="1" stopColor="#070a06" />
        </linearGradient>
      </defs>
      <rect width="420" height="262" fill="url(#bg)" />
      <rect width="420" height="262" fill="url(#scan)" />
      <g stroke="#c9b44a" strokeOpacity={0.07} strokeWidth={1}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1={0} y1={i * 65} x2={420} y2={i * 65} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={`v${i}`} x1={i * 70} y1={0} x2={i * 70} y2={262} />
        ))}
      </g>
      <rect x={1} y={1} width={418} height={260} fill="none" stroke={GOLD} strokeOpacity={0.28} strokeWidth={1} />
      <rect x={9} y={9} width={402} height={244} fill="none" stroke={GOLD} strokeOpacity={0.12} strokeWidth={1} />
      <text x={14} y={22} fontFamily="'JetBrains Mono',monospace" fontSize={7} letterSpacing="1.5" fill={GOLD} opacity={0.75}>
        {label}
      </text>
      <circle cx={13} cy={40} r={2} fill={CRIM} opacity={0.9} />
      <text x={20} y={43} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="1.2" fill={MUTE}>
        REC // 2026-09
      </text>
      <Barcode x={14} y={244} />
      {children}
    </svg>
  )
}

function KitHubVisual() {
  return (
    <ShellFrame label="SUPPORT OPS — TICKET BOARD">
      <rect x={14} y={54} width={58} height={176} fill={DARK} fillOpacity={0.7} stroke={GOLD} strokeOpacity={0.18} strokeWidth={1} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={0.7 - i * 0.12}>
          <rect x={22} y={66 + i * 30} width={10} height={10} fill={OLIVE} fillOpacity={0.22} stroke={OLIVE} strokeOpacity={0.6} strokeWidth={1} />
          <line x1={38} y1={71 + i * 30} x2={66} y2={71 + i * 30} stroke={PAPER} strokeOpacity={0.4} strokeWidth={2} />
        </g>
      ))}
      <circle cx={73} cy={59} r={3} fill={CRIM} />

      <rect x={84} y={54} width={86} height={16} fill={GOLD} fillOpacity={0.1} stroke={GOLD} strokeOpacity={0.35} strokeWidth={1} rx={8} />
      <line x1={94} y1={62} x2={140} y2={62} stroke={PAPER} strokeOpacity={0.45} strokeWidth={2} />
      <circle cx={164} cy={62} r={3.5} fill={GOLD} stroke={GOLD} strokeOpacity={0.5} fillOpacity={0.6} />

      {[
        { t: 'OPEN 04', c: CRIM },
        { t: 'WIP 03', c: GOLD },
        { t: 'RES 12', c: OLIVE },
      ].map((k, i) => (
        <g key={k.t}>
          <rect x={84 + i * 52} y={78} width={46} height={22} fill={DARK} stroke={k.c} strokeOpacity={0.5} strokeWidth={1} />
          <text x={90 + i * 52} y={92} fontFamily="'JetBrains Mono',monospace" fontSize={6.5} letterSpacing="0.6" fill={k.c}>
            {k.t}
          </text>
        </g>
      ))}

      {[
        { s: 'BK-1042', p: 'resolved', tag: 'AI' },
        { s: 'BK-1043', p: 'open', tag: 'TKT' },
        { s: 'BK-1045', p: 'wip', tag: 'DATA' },
      ].map((r, i) => (
        <g key={r.s}>
          <line x1={84} y1={122 + i * 30} x2={250} y2={122 + i * 30} stroke={PAPER} strokeOpacity={0.12} strokeWidth={1} />
          <rect x={88} y={108 + i * 30} width={22} height={8} fill={r.p === 'resolved' ? OLIVE : r.p === 'open' ? CRIM : GOLD} fillOpacity={0.6} />
          <text x={94} y={115 + i * 30} fontSize={5} fill={DARK} fontFamily="'JetBrains Mono',monospace">{r.tag}</text>
          <text x={116} y={117 + i * 30} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={PAPER} opacity={0.72}>{r.s}</text>
          <line x1={116} y1={124 + i * 30} x2={196} y2={124 + i * 30} stroke={PAPER} strokeOpacity={0.3} strokeWidth={1.6} />
        </g>
      ))}

      <rect x={84} y={198} width={166} height={32} fill={OLIVE} fillOpacity={0.08} stroke={OLIVE} strokeOpacity={0.4} strokeWidth={1} />
      <path d="M92 214 l5 -6 l3 4 l4 -8 l3 10z" fill={OLIVE} opacity={0.9} />
      <text x={108} y={217} fontFamily="'JetBrains Mono',monospace" fontSize={6.5} letterSpacing="0.5" fill={PAPER} opacity={0.85}>
        ASK THE AI ASSISTANT…
      </text>
      <rect x={262} y={54} width={148} height={176} fill={DARK} fillOpacity={0.55} stroke={GOLD} strokeOpacity={0.16} strokeWidth={1} />
      <text x={270} y={70} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="1.2" fill={GOLD} opacity={0.7}>KNOWLEDGE BASE</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={272} y={82 + i * 22} width={100} height={12} fill={PAPER} fillOpacity={0.04} stroke={PAPER} strokeOpacity={0.12} strokeWidth={1} />
      ))}
      <rect x={272} y={148} width={60} height={10} fill={GOLD} fillOpacity={0.08} stroke={GOLD} strokeOpacity={0.35} strokeWidth={1} />
      <line x1={280} y1={153} x2={326} y2={153} stroke={GOLD} strokeOpacity={0.5} strokeWidth={1.6} />
      <circle cx={396} cy={62} r={2.5} fill={CRIM} opacity={0.9} />
    </ShellFrame>
  )
}

function AgentVisual() {
  return (
    <ShellFrame label="AGENT CORE — FUNCTION CALL TRACE">
      <rect x={14} y={54} width={392} height={22} fill={DARK} fillOpacity={0.75} />
      <circle cx={24} cy={60} r={2.5} fill={OLIVE} opacity={0.95} />
      <text x={32} y={64} fontFamily="'JetBrains Mono',monospace" fontSize={7} letterSpacing="1.4" fill={PAPER} opacity={0.85}>
        LLAMA 3.3 / GROQ — SESSION 07
      </text>
      <text x={392} y={64} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={CRIM} textAnchor="end">REC</text>

      <rect x={248} y={92} width={144} height={34} fill={GOLD} fillOpacity={0.08} stroke={GOLD} strokeOpacity={0.5} strokeWidth={1} />
      <text x={272} y={113} fontFamily="'JetBrains Mono',monospace" fontSize={6.5} fill={PAPER} opacity={0.9}>
        What is the weather in Paris?
      </text>

      <rect x={26} y={140} width={216} height={84} fill={DARK} fillOpacity={0.6} stroke={OLIVE} strokeOpacity={0.35} strokeWidth={1} />
      <text x={34} y={152} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="0.8" fill={OLIVE}>
        TOOL — WEATHER.LOOKUP
      </text>
      {['city=paris', 'units=metric', '→ 21°C · clear'].map((_ln, i) => (
        <line key={i} x1={34} y1={163 + i * 13} x2={90 + i * 40} y2={163 + i * 13} stroke={PAPER} strokeOpacity={0.4} strokeWidth={1.6} />
      ))}
      <line x1={34} y1={200} x2={160} y2={200} stroke={PAPER} strokeOpacity={0.12} strokeWidth={1} />
      <text x={34} y={212} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="0.8" fill={OLIVE}>
        TOOL — NEWS.SEARCH
      </text>
      <line x1={34} y1={223} x2={150} y2={223} stroke={PAPER} strokeOpacity={0.35} strokeWidth={1.6} />

      <line x1={26} y1={188} x2={236} y2={188} stroke={OLIVE} strokeOpacity={0.2} strokeWidth={1} strokeDasharray="2 3" />

      <rect x={26} y={232} width={392} height={16} fill={DARK} fillOpacity={0.8} />
      <path d="M30 240 h3 l2 -2 l2 2 h0 M30 240 v-4" fill="none" stroke={OLIVE} strokeWidth={1.4} />
      <line x1={44} y1={240} x2={110} y2={240} stroke={PAPER} strokeOpacity={0.35} strokeWidth={1.6} />
      <rect x={112} y={238} width={5} height={4} fill={GOLD} className="p-blink" />
    </ShellFrame>
  )
}

function ColocVisual() {
  return (
    <ShellFrame label="COLOC LEDGER — SETTLEMENT ENGINE">
      <rect x={14} y={54} width={392} height={52} fill={DARK} fillOpacity={0.6} stroke={GOLD} strokeOpacity={0.22} strokeWidth={1} />
      <text x={24} y={70} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="1.2" fill={MUTE}>MONTHLY BALANCE</text>
      <text x={24} y={94} fontFamily="'JetBrains Mono',monospace" fontSize={16} fill={PAPER} opacity={0.92}>— 3 240 MAD</text>
      <rect x={120} y={80} width={120} height={6} fill={GOLD} fillOpacity={0.25} />
      <rect x={120} y={92} width={84} height={6} fill={CRIM} fillOpacity={0.5} />
      <text x={252} y={88} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={GOLD}>PAID</text>
      <text x={252} y={100} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={CRIM}>OWED</text>

      {[
        { i: 0, name: 'RENT', amt: 0.9, chip: 'PAID' },
        { i: 1, name: 'INTERNET', amt: 0.35, chip: 'SPLIT' },
        { i: 2, name: 'GROCERIES', amt: 0.6, chip: 'SPLIT' },
      ].map((w) => (
        <g key={w.name}>
          <circle cx={30} cy={126 + w.i * 30} r={9} fill={OLIVE} fillOpacity={0.14} stroke={OLIVE} strokeOpacity={0.5} strokeWidth={1} />
          <text x={26} y={130 + w.i * 30} fontSize={7} fill={OLIVE}>€</text>
          <text x={46} y={130 + w.i * 30} fontFamily="'JetBrains Mono',monospace" fontSize={7} letterSpacing="1" fill={PAPER} opacity={0.85}>{w.name}</text>
          <line x1={46} y1={137 + w.i * 30} x2={150 + w.amt * 90} y2={137 + w.i * 30} stroke={GOLD} strokeOpacity={0.6} strokeWidth={2.4} />
          <rect x={300} y={120 + w.i * 30} width={34} height={10} fill={w.chip === 'PAID' ? OLIVE : GOLD} fillOpacity={0.85} />
          <text x={305} y={128 + w.i * 30} fontSize={5.5} fontFamily="'JetBrains Mono',monospace" fill={DARK}>{w.chip}</text>
        </g>
      ))}

      <rect x={14} y={218} width={392} height={32} fill={DARK} fillOpacity={0.55} stroke={GOLD} strokeOpacity={0.16} strokeWidth={1} />
      <text x={24} y={238} fontFamily="'JetBrains Mono',monospace" fontSize={6} letterSpacing="1" fill={MUTE}>AUTO-SETTLE</text>
      {[
        { a: 'A', b: 'B', x: 150 },
        { a: 'A', b: 'C', x: 216 },
        { a: 'B', b: 'C', x: 282 },
      ].map((tr) => (
        <g key={tr.a + tr.b}>
          <rect x={tr.x} y={228} width={14} height={12} fill={GOLD} fillOpacity={0.12} stroke={GOLD} strokeOpacity={0.5} strokeWidth={1} />
          <text x={tr.x + 4} y={237} fontSize={6} fill={GOLD}>{tr.a}</text>
          <path d={`M${tr.x + 17} 234 h8 M${tr.x + 21} 231 l3 3 l-3 3`} stroke={GOLD} strokeOpacity={0.7} strokeWidth={1.2} fill="none" />
          <rect x={tr.x + 26} y={228} width={14} height={12} fill={GOLD} fillOpacity={0.12} stroke={GOLD} strokeOpacity={0.5} strokeWidth={1} />
          <text x={tr.x + 30} y={237} fontSize={6} fill={GOLD}>{tr.b}</text>
        </g>
      ))}
    </ShellFrame>
  )
}

function MercatoVisual() {
  return (
    <ShellFrame label="ROSTER OPS — TRANSFER WINDOW">
      <g transform="translate(26,58)">
        <path d="M14 0 l14 6 v14 c0 10 -8 16 -14 18 c-6 -2 -14 -8 -14 -18 v-14z" fill={GOLD} fillOpacity={0.12} stroke={GOLD} strokeOpacity={0.6} strokeWidth={1.2} transform="translate(18,0)" />
        <path d="M14 0 l14 6 v14 c0 10 -8 16 -14 18 c-6 -2 -14 -8 -14 -18 v-14z" fill={GOLD} fillOpacity={0.08} stroke={GOLD} strokeOpacity={0.4} strokeWidth={1.2} opacity={0.5} transform="translate(84,0)" />
        <path d="M64 18 h16 M74 14 l4 4 l-4 4" stroke={GOLD} strokeOpacity={0.7} strokeWidth={1.4} fill="none" />
        <text x={70} y={44} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={MUTE} textAnchor="middle">IDN → INV</text>
      </g>

      {[
        { x: 14, r: 0, pos: 0.9 },
        { x: 118, r: 1, pos: 0.5 },
        { x: 222, r: 2, pos: 0.7 },
        { x: 326, r: 3, pos: 0.3 },
      ].map((p) => (
        <g key={p.x}>
          <rect x={p.x} y={104} width={80} height={58} fill={DARK} fillOpacity={0.75} stroke={GOLD} strokeOpacity={0.2} strokeWidth={1} />
          <path d={`M${p.x + 40} 110 a16 16 0 1 0 1 0z M${p.x + 40} 112 a6 8 0 1 0 1 0`} fill={OLIVE} opacity={0.55} />
          <rect x={p.x + 14} y={134} width={52} height={4} fill={PAPER} fillOpacity={0.35} />
          <rect x={p.x + 14} y={142} width={38} height={3} fill={MUTE} fillOpacity={0.4} />
          <rect x={p.x + 14} y={149} width={52 * p.pos} height={3} fill={p.pos < 0.5 ? CRIM : OLIVE} opacity={0.85} />
        </g>
      ))}

      <rect x={14} y={174} width={80} height={58} fill={CRIM} fillOpacity={0.08} stroke={CRIM} strokeOpacity={0.4} strokeWidth={1} />
      <circle cx={54} cy={196} r={14} fill={CRIM} fillOpacity={0.15} stroke={CRIM} strokeOpacity={0.6} strokeWidth={1} />
      <path d="M50 210 l2 -12 h4 l2 12z M48 204 h12" fill={CRIM} opacity={0.85} transform="translate(0,-4)" />
      <text x={24} y={216} fontFamily="'JetBrains Mono',monospace" fontSize={5.5} letterSpacing="0.8" fill={CRIM}>FREE AGENT</text>
    </ShellFrame>
  )
}

function GreenTechVisual() {
  return (
    <ShellFrame label="CATALOG OPS — BACK-OFFICE">
      <rect x={14} y={54} width={58} height={176} fill={DARK} fillOpacity={0.7} stroke={GOLD} strokeOpacity={0.18} strokeWidth={1} />
      {['PRD', 'ORD', 'USR', 'ROL'].map((l, i) => (
        <g key={l} opacity={i === 0 ? 0.95 : 0.55}>
          <rect x={22} y={64 + i * 32} width={12} height={12} fill={i === 0 ? OLIVE : PAPER} fillOpacity={0.25} stroke={OLIVE} strokeOpacity={0.6} strokeWidth={1} />
          {i === 0 && <rect x={22} y={64 + i * 32} width={12} height={12} fill={OLIVE} fillOpacity={0.5} />}
          <text x={40} y={74 + i * 32} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={PAPER} opacity={0.8}>{l}</text>
        </g>
      ))}

      <rect x={84} y={54} width={88} height={16} fill={PAPER} fillOpacity={0.05} stroke={PAPER} strokeOpacity={0.15} strokeWidth={1} rx={8} />
      <line x1={92} y1={62} x2={140} y2={62} stroke={PAPER} strokeOpacity={0.4} strokeWidth={2} />
      <rect x={164} y={56} width={60} height={12} fill={GOLD} fillOpacity={0.1} stroke={GOLD} strokeOpacity={0.4} strokeWidth={1} />

      {[
        { t: 'VND', v: '380', c: OLIVE },
        { t: 'ODR', v: '42', c: GOLD },
        { t: 'ACT', v: 'RING', c: CRIM },
      ].map((k, i) => (
        <g key={k.t}>
          <rect x={84 + i * 66} y={78} width={60} height={20} fill={DARK} fillOpacity={0.7} stroke={k.c} strokeOpacity={0.5} strokeWidth={1} />
          <text x={90 + i * 66} y={87} fontFamily="'JetBrains Mono',monospace" fontSize={5.5} letterSpacing="0.6" fill={MUTE}>{k.t}</text>
          <text x={90 + i * 66} y={95} fontFamily="'JetBrains Mono',monospace" fontSize={7} fill={k.c}>{k.v}</text>
        </g>
      ))}

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={84 + (i % 2) * 102} y={108 + Math.floor(i / 2) * 62} width={96} height={56} fill={DARK} fillOpacity={0.8} stroke={GOLD} strokeOpacity={0.18} strokeWidth={1} />
          <rect x={92 + (i % 2) * 102} y={116 + Math.floor(i / 2) * 62} width={40} height={40} fill={OLIVE} fillOpacity={0.12} stroke={OLIVE} strokeOpacity={0.4} strokeWidth={1} />
          <path d={`M${112 + (i % 2) * 102} ${132 + Math.floor(i / 2) * 62} l4 -8 l4 6 l3 -5 l3 7z`} fill={OLIVE} opacity={0.85} />
          <rect x={140 + (i % 2) * 102} y={120 + Math.floor(i / 2) * 62} width={32} height={4} fill={PAPER} fillOpacity={0.4} />
          <rect x={140 + (i % 2) * 102} y={128 + Math.floor(i / 2) * 62} width={20} height={3} fill={MUTE} fillOpacity={0.4} />
          <text x={140 + (i % 2) * 102} y={144 + Math.floor(i / 2) * 62} fontFamily="'JetBrains Mono',monospace" fontSize={6} fill={GOLD}>1 299 MAD</text>
        </g>
      ))}

      <rect x={84} y={232} width={322} height={16} fill={GOLD} fillOpacity={0.08} stroke={GOLD} strokeOpacity={0.3} strokeWidth={1} />
      <line x1={94} y1={240} x2={200} y2={240} stroke={PAPER} strokeOpacity={0.4} strokeWidth={1.6} />
      <circle cx={396} cy={240} r={3} fill={CRIM} opacity={0.9} />
    </ShellFrame>
  )
}

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) return <KitHubVisual />
  if (index === 1) return <AgentVisual />
  if (index === 2) return <ColocVisual />
  if (index === 3) return <MercatoVisual />
  return <GreenTechVisual />
}

/* ────────────────────────── MARKUP HELPERS ────────────────────────── */

function CaseTag({ hasCase, caseNum }: { hasCase: boolean; caseNum: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.2em] backdrop-blur-sm ${
        hasCase ? 'border-toxic/40 bg-dark-green/70 text-toxic' : 'border-olive-border/70 bg-night/60 text-smudge'
      }`}
    >
      {hasCase ? (
        <>
          <span aria-hidden="true" className="status-dot status-dot--active" />
          CASE {caseNum}
        </>
      ) : (
        <>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-dirty-yellow/70" />
          PROJECT FILE
        </>
      )}
    </span>
  )
}

function StatusChip({ ai, hasCase }: { ai?: boolean; hasCase: boolean }) {
  const cl = ai
    ? 'border-crimson/60 bg-crimson/10 text-crimson-glow'
    : hasCase
      ? 'border-dirty-yellow/40 bg-dirty-yellow/[0.06] text-dirty-yellow/80'
      : 'border-olive-border/70 bg-night/40 text-smudge'
  const label = ai ? 'AI SYSTEM' : hasCase ? 'DOSSIER OPEN' : 'ARCHIVED'
  const rot = ai ? '-rotate-3' : ''
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.2em] ${cl} ${rot}`}>
      {!ai && <span aria-hidden="true" className={hasCase ? 'status-dot status-dot--yellow' : 'h-1 w-1 rounded-full bg-smudge/60'} />}
      {label}
    </span>
  )
}

/* ────────────────────────── MAIN COMPONENT ────────────────────────── */

export default function ProjectsSection({ openCase }: ProjectsSectionProps) {
  const reduced = useReducedMotion()
  const reducedRef = useRef(reduced)
  reducedRef.current = reduced

  const [metrics, setMetrics] = useState<Metrics>(breakpoints)
  const metricsRef = useRef(metrics)
  metricsRef.current = metrics

  const [activeIndex, setActiveIndex] = useState(0)
  const sectionElRef = useRef<HTMLDivElement>(null)
  const entranceRef = useRef<HTMLDivElement>(null)
  const cardEls = useRef<(HTMLDivElement | null)[]>([])
  const seat = useRef({ o: 0 })
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const drag = useRef({ active: false, startX: 0, startY: 0, axis: null as 'x' | 'y' | null, startO: 0 })
  const suppressUntil = useRef(0)

  const renderPose = useCallback((o: number) => {
    const m = metricsRef.current
    seat.current.o = o
    cardEls.current.forEach((el, i) => {
      if (!el) return
      const p = poseOf(i - o, m)
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${p.ry}deg) scale(${p.s})`
      el.style.opacity = String(p.opacity)
      el.style.zIndex = String(p.zIn)
      el.style.pointerEvents = p.hit ? 'auto' : 'none'
      el.style.filter = p.blur > 0.05 ? `blur(${p.blur}px) brightness(${1 - p.dim})` : `brightness(${1 - p.dim})`
    })
  }, [])

  const goTo = useCallback(
    (target: number) => {
      const c = Math.max(0, Math.min(TOTAL - 1, target))
      if (tweenRef.current) tweenRef.current.kill()
      if (reducedRef.current) {
        renderPose(c)
        setActiveIndex(Math.round(c))
        return
      }
      tweenRef.current = gsap.to(seat.current, {
        o: c,
        duration: 0.68,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => renderPose(seat.current.o),
        onComplete: () => {
          tweenRef.current = null
          setActiveIndex(Math.round(c))
        },
      })
    },
    [renderPose]
  )

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = seat.current.o + dir
      if (next < 0 || next > TOTAL - 1) return false
      goTo(next)
      return true
    },
    [goTo]
  )

  useEffect(() => {
    const onResize = () => setMetrics(breakpoints())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    renderPose(seat.current.o)
  }, [metrics, renderPose])

  useEffect(() => {
    const el = entranceRef.current
    if (!el || reducedRef.current) return
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 46 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  useEffect(() => {
    const section = sectionElRef.current
    if (!section) return

    const onWheel = (e: WheelEvent) => {
      if (reducedRef.current) return
      const rect = section.getBoundingClientRect()
      const center = (rect.top + rect.bottom) / 2
      if (Math.abs(center - window.innerHeight / 2) > window.innerHeight * 0.32) return
      if (Math.abs(e.deltaY) < 12) return
      const stepped = step(e.deltaY > 0 ? 1 : -1)
      if (stepped) e.preventDefault()
    }
    section.addEventListener('wheel', onWheel, { passive: false })
    return () => section.removeEventListener('wheel', onWheel)
  }, [step])

  useEffect(() => {
    if (reducedRef.current) return
    const onKey = (e: KeyboardEvent) => {
      const section = sectionElRef.current
      if (!section) return
      const r = section.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('a, button')) return
    if (reducedRef.current) return
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, axis: null, startO: seat.current.o }
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const m = metricsRef.current
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (d.axis === null) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) d.axis = 'y'
      else if (Math.abs(dx) > 10) d.axis = 'x'
      else return
    }
    if (d.axis === 'y') return
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }
    const o = Math.max(-0.35, Math.min(TOTAL - 1 + 0.35, d.startO - dx / m.spacing))
    renderPose(o)
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    const m = metricsRef.current
    const travel = (d.startX - e.clientX) / m.spacing
    if (d.axis === 'x') {
      if (Math.abs(travel) > 0.2) {
        const target = Math.max(0, Math.min(TOTAL - 1, Math.round(d.startO + travel)))
        goTo(target)
      } else {
        goTo(Math.round(seat.current.o))
      }
      if (Math.abs(travel) > 4 / m.spacing) suppressUntil.current = Date.now() + 350
    }
  }

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() < suppressUntil.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressUntil.current = 0
    }
  }

  const cards = projects.map((p, i) => {
    const caseNum = String(i + 1).padStart(2, '0')
    const hasCase = Boolean(p.caseStudy)
    const shownStack = p.stack.slice(0, 6)
    const extra = p.stack.length - shownStack.length
    return (
      <div
        key={p.id}
        ref={(el) => {
          cardEls.current[i] = el
        }}
        className="p-slot"
        style={{ width: metrics.cardW, height: metrics.cardH, marginLeft: -metrics.cardW / 2 }}
      >
        <article className="p-card">
          <div className="p-img" style={{ height: Math.round(metrics.cardW * 0.6) }}>
            <ProjectVisual index={i} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/15" />
            <div aria-hidden="true" className="absolute inset-0 p-film" />
            <span className="absolute left-3 top-3 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-dirty-yellow/70">
              EVIDENCE {caseNum}
            </span>
            <span className="absolute right-3 top-3 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-paper/40">
              {caseNum} / {String(TOTAL).padStart(2, '0')}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-night/90 to-transparent px-3 pb-2.5 pt-8">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 border border-toxic/70 bg-toxic/30" />
              <span className="truncate font-mono text-[0.5rem] uppercase tracking-[0.18em] text-paper/75">
                {p.categories.slice(0, 2).join(' · ')}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] w-2/4 bg-gradient-to-r from-crimson-glow/60 to-transparent"
            />
          </div>

          <div className="p-body flex flex-1 flex-col overflow-hidden px-5 py-4">
            <div className="flex items-center justify-between gap-2">
              <CaseTag hasCase={hasCase} caseNum={caseNum} />
              <StatusChip ai={p.ai} hasCase={hasCase} />
            </div>

            <h3 className="mt-3.5 font-display text-lg font-bold leading-tight text-paper sm:text-xl">{p.name}</h3>
            {p.badge && (
              <p className="mt-1.5 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-dirty-yellow/70">
                {p.badge}
              </p>
            )}

            <p className="mt-3 line-clamp-3 text-[0.76rem] leading-relaxed text-smudge">
              {p.short ?? p.description}
            </p>

            <div className="mt-4 h-px w-full bg-gradient-to-r from-olive-border/80 via-olive-border/30 to-transparent" />

            <div className="mt-3.5">
              <p className="case-stamp text-[0.5rem]">Stack technique</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {shownStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-olive-border/60 bg-night/40 px-1.5 py-0.5 font-mono text-[0.5rem] text-smudge/90"
                  >
                    {t}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="rounded-sm border border-dirty-yellow/30 bg-night/40 px-1.5 py-0.5 font-mono text-[0.5rem] text-dirty-yellow/60">
                    +{extra}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 pt-5">
              {hasCase ? (
                <button
                  type="button"
                  onClick={() => openCase(p)}
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-toxic/50 bg-dark-green/50 px-3.5 py-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-toxic transition-all duration-300 hover:border-toxic hover:bg-dark-green/80 hover:shadow-[0_0_16px_rgba(139,163,98,0.25)]"
                >
                  VIEW DETAILS <span aria-hidden="true">→</span>
                </button>
              ) : (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-dirty-yellow/40 bg-night/40 px-3.5 py-2 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-dirty-yellow/80 transition-all duration-300 hover:border-dirty-yellow/70 hover:text-dirty-yellow"
                >
                  CODE SOURCE <span aria-hidden="true">↗</span>
                </a>
              )}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 border border-olive-border/60 bg-night/40 px-2.5 py-2 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-smudge transition-colors hover:border-toxic/50 hover:text-paper"
                >
                  GH <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    )
  })

  return (
    <div
      ref={sectionElRef}
      className="projects-dossier relative isolate overflow-hidden"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClickCapture={onClickCapture}
    >
      <div aria-hidden="true" className="projects-bg" />
      <div aria-hidden="true" className="projects-shade" />
      <div aria-hidden="true" className="projects-vignette" />
      <div aria-hidden="true" className="projects-grain" />

      <div className="relative z-10 mx-auto max-w-[92rem] px-4 py-10 sm:px-6 md:py-14 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 pb-8">
          <div>
            <p className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-toxic">
              <span className="h-2.5 w-2.5 shrink-0 rotate-45 border border-crimson-glow/80 bg-crimson/30" />
              Dossiers de mission
            </p>
            <h2 className="mt-3 flex flex-wrap items-baseline font-display font-bold uppercase leading-none tracking-[0.01em] text-paper [text-shadow:0_2px_22px_rgba(0,0,0,.9)]">
              <span className="text-[0.72em] text-crimson-glow">03</span>
              <span aria-hidden className="mx-2 text-dirty-yellow/60">—</span>
              <span className="text-3xl sm:text-5xl lg:text-6xl">Archives de Mission</span>
              <span aria-hidden className="ml-1 text-crimson-glow">.</span>
            </h2>
            <span aria-hidden className="mt-3 block h-px w-20 bg-gradient-to-r from-crimson-glow to-transparent" />
          </div>

          <div className="ml-auto text-right">
            <span className="identity-stamp" style={{ transform: 'rotate(-2deg)' }}>
              Classifié
            </span>
            <dl className="projects-meta mt-3">
              <div>
                <dt>Dossier</dt>
                <dd>PROJETS–001</dd>
              </div>
              <div>
                <dt>Nombre</dt>
                <dd>{String(TOTAL).padStart(2, '0')} missions</dd>
              </div>
              <div>
                <dt>Section</dt>
                <dd>03 / 06</dd>
              </div>
            </dl>
          </div>
        </header>

        <div ref={entranceRef} className="p-entrance">
          <div className="projects-stage" style={{ perspective: metrics.persp, height: metrics.cardH }}>
            {cards}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={activeIndex === 0}
            className="flex h-9 w-9 items-center justify-center border border-dirty-yellow/30 text-dirty-yellow/70 transition-all duration-300 hover:border-dirty-yellow/60 hover:text-dirty-yellow disabled:cursor-not-allowed disabled:opacity-25"
            aria-label="Previous project"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                className={`projects-indicator ${i === activeIndex ? 'projects-indicator--active' : ''}`}
                aria-label={`View ${p.name}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={activeIndex === TOTAL - 1}
            className="flex h-9 w-9 items-center justify-center border border-dirty-yellow/30 text-dirty-yellow/70 transition-all duration-300 hover:border-dirty-yellow/60 hover:text-dirty-yellow disabled:cursor-not-allowed disabled:opacity-25"
            aria-label="Next project"
          >
            →
          </button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-annotate/70">
          <span className="text-dirty-yellow/60">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-dirty-yellow/30" />
          <span className="text-paper/80">{projects[activeIndex].name}</span>
          <span aria-hidden className="text-crimson-glow/70">▸</span>
          <span className="text-annotate/60">scroll · drag · keys</span>
        </p>
      </div>

      <style>{`
        .projects-dossier { background: #060806; user-select: none; touch-action: pan-y; }

        .p-entrance { position: relative; }

        .projects-bg {
          position: absolute; inset: 0; z-index: -4;
          background: url('/images/projectsSection.png') no-repeat;
          background-size: cover;
          background-position: 72% 38%;
        }
        @media (min-width: 1024px) {
          .projects-bg { background-position: 65% 42%; }
        }

        .projects-shade {
          position: absolute; inset: 0; z-index: -3;
          background:
            linear-gradient(0deg, rgba(4,6,3,.75) 0%, rgba(4,6,3,.15) 38%, rgba(4,6,3,.3) 100%),
            linear-gradient(90deg, rgba(4,6,3,.45) 0%, rgba(4,6,3,.15) 40%, rgba(4,6,3,.35) 100%);
        }

        .projects-vignette {
          position: absolute; inset: 0; z-index: -2; pointer-events: none;
          box-shadow: inset 0 0 180px rgba(0,0,0,.55);
        }

        .projects-grain {
          position: absolute; inset: 0; z-index: -1; pointer-events: none;
          opacity: .04; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .projects-dossier::after {
          content: ''; position: absolute; inset: 10px; pointer-events: none; z-index: 1;
          border: 1px solid rgba(214,200,160,.1);
        }

        .projects-stage {
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 42%;
        }
        @media (min-width: 1152px) {
          .projects-stage { transform-origin: 50% 46%; }
        }

        .p-slot {
          position: absolute; left: 50%; top: 0;
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
          cursor: pointer;
        }

        .p-card {
          position: relative; display: flex; flex-direction: column;
          height: 100%; overflow: hidden;
          background: linear-gradient(180deg, rgba(13,17,11,.94), rgba(7,10,6,.92));
          border: 1px solid rgba(201,180,74,.35);
          box-shadow: 0 26px 60px -26px rgba(0,0,0,.9), 0 0 40px -18px rgba(201,180,74,.14);
          transform-style: preserve-3d;
        }
        .p-card::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(120deg, rgba(214,200,160,.06), transparent 34%);
        }
        .p-img {
          position: relative; overflow: hidden; flex-shrink: 0;
          border-bottom: 1px solid rgba(201,180,74,.28);
        }
        .p-img::before {
          content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(180deg, rgba(5,7,4,.5), transparent 22%, transparent 78%, rgba(5,7,4,.55));
        }
        .p-film {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='no'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23no)'/%3E%3C/svg%3E");
          opacity: .5; mix-blend-mode: overlay;
        }
        .p-body { background: linear-gradient(180deg, rgba(11,14,8,.9), rgba(7,10,6,.95)); }

        .p-blink { animation: pblink 1.1s steps(2, start) infinite; }
        @keyframes pblink { 50% { opacity: 0; } }

        .projects-meta { display: flex; flex-direction: column; gap: .15rem; }
        .projects-meta > div {
          display: flex; justify-content: space-between; gap: 2rem;
          padding: .24rem 0; border-bottom: 1px dotted rgba(201,180,74,.28);
        }
        .projects-meta dt {
          font-family: 'JetBrains Mono', monospace; font-size: .52rem;
          letter-spacing: .24em; text-transform: uppercase; color: #a8a294;
        }
        .projects-meta dd {
          font-family: 'JetBrains Mono', monospace; font-size: .6rem;
          letter-spacing: .08em; color: rgba(236,228,211,.86);
        }

        .projects-indicator {
          height: 6px; width: 22px; border-radius: 0;
          border: 1px solid rgba(201,180,74,.3); background: transparent;
          transition: all .35s ease; cursor: pointer;
        }
        .projects-indicator--active {
          background: rgba(139,163,98,.7); border-color: rgba(139,163,98,.8);
          box-shadow: 0 0 10px rgba(139,163,98,.4);
        }
        .projects-indicator:hover:not(.projects-indicator--active) {
          border-color: rgba(201,180,74,.6); background: rgba(201,180,74,.15);
        }
      `}</style>
    </div>
  )
}