import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion'
import type { TimelineItem } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface TimelineProps {
  items: TimelineItem[]
  certifications?: { name: string; issuer: string }[]
}

export default function Timeline({ items, certifications }: TimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = rootRef.current
    const progress = progressRef.current
    const list = listRef.current
    if (!root || !progress || !list || reduced) return

    gsap.set(progress, { scaleY: 0 })
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLLIElement>('.edu-row')
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, x: 26, y: 10 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.05,
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      const nodes = gsap.utils.toArray<HTMLSpanElement>('.edu-node')
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            delay: 0.35,
            scrollTrigger: {
              trigger: node,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      gsap.to(progress, {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: list,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={rootRef} className="edu-timeline relative">
      {/* Vertical timeline rail + scroll progress */}
      <span
        aria-hidden="true"
        className="edu-rail edu-rail--line"
      />
      <span
        aria-hidden="true"
        ref={progressRef}
        className="edu-rail edu-rail--progress"
      />

      <ol ref={listRef} className="edu-list space-y-6 sm:space-y-8 lg:space-y-10">
        {items.map((item, index) => {
          const isOngoing = item.status === 'ongoing'
          const caseIndex = String(index + 1).padStart(2, '0')
          return (
            <li className="edu-row group" key={item.code}>
              <div className="edu-marker" aria-hidden="true">
                <span className="edu-node" data-status={item.status}>
                  <span className="edu-node__core" />
                </span>
              </div>

              <article className="edu-card dossier-panel dossier-panel-hover">
                <span className="edu-corner edu-corner--tl" aria-hidden="true" />
                <span className="edu-corner edu-corner--tr" aria-hidden="true" />
                <span className="edu-sheen" aria-hidden="true" />

                <header className="edu-card__head">
                  <div className="flex items-center gap-2">
                    <span className="edu-code">{item.code}</span>
                    <span className="edu-dot" aria-hidden="true" />
                    <span className="edu-case">CASE {caseIndex}</span>
                  </div>
                  <span className="edu-status" data-status={item.status}>
                    <span className="status-dot" aria-hidden="true" />
                    {isOngoing ? 'En cours' : 'Validé'}
                  </span>
                </header>

                <p className="edu-period">{item.period}</p>
                <h3 className="edu-qual">{item.qualification}</h3>

                <div className="edu-inst">
                  <span className="edu-inst__name">{item.institution}</span>
                  {item.location && (
                    <>
                      <span className="edu-sep" aria-hidden="true">·</span>
                      <span className="edu-inst__loc">{item.location}</span>
                    </>
                  )}
                </div>

                <p className="edu-desc">{item.description}</p>

                {item.skills.length > 0 && (
                  <ul className="edu-skills">
                    {item.skills.map((skill) => (
                      <li key={skill} className="edu-skill">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="edu-foot">Classification académique — dossier classifié</p>
              </article>
            </li>
          )
        })}
      </ol>

      {certifications && certifications.length > 0 && (
        <div className="edu-cert-block">
          <p className="case-stamp mb-4 font-mono text-[0.6rem] uppercase tracking-[0.28em]">
             — Certifications
          </p>
          <div className="edu-cert-grid">
            {certifications.map((cert) => (
              <article className="edu-cert-card dossier-panel dossier-panel-hover" key={cert.name}>
                <span className="edu-corner edu-corner--tl" aria-hidden="true" />
                <span className="edu-corner edu-corner--tr" aria-hidden="true" />
                <span className="edu-sheen" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <span className="edu-cert-badge" aria-hidden="true">
                    ★
                  </span>
                  <div>
                    <p className="edu-cert-name">{cert.name}</p>
                    <p className="edu-cert-issuer">{cert.issuer}</p>
                  </div>
                </div>
                <span className="edu-cert-stamp">Certifié</span>
              </article>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .edu-timeline {
          position: relative;
          --rail-x: 1rem;
          --rail-col: 2.25rem;
        }
        @media (min-width: 640px) {
          .edu-timeline {
            --rail-x: 1.25rem;
            --rail-col: 2.75rem;
          }
        }
        @media (min-width: 1024px) {
          .edu-timeline {
            --rail-x: 1.5rem;
            --rail-col: 3.25rem;
          }
        }

        .edu-rail {
          position: absolute;
          left: var(--rail-x);
          top: 0.75rem;
          width: 1px;
        }
        .edu-rail--line {
          bottom: 0.75rem;
          background: linear-gradient(
            to bottom,
            rgba(139, 163, 98, 0.35) 0%,
            rgba(139, 163, 98, 0.2) 60%,
            rgba(139, 163, 98, 0.12) 100%
          );
        }
        .edu-rail--progress {
          height: calc(100% - 1.5rem);
          background: linear-gradient(to bottom, #8ba362, rgba(201, 180, 74, 0.6));
          box-shadow: 0 0 14px rgba(139, 163, 98, 0.28);
          transform-origin: top;
        }

        .edu-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .edu-row {
          display: grid;
          grid-template-columns: var(--rail-col) 1fr;
          gap: 1rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .edu-row {
            gap: 1.75rem;
          }
        }
        @media (min-width: 1024px) {
          .edu-row {
            gap: 2.5rem;
          }
        }

        .edu-marker {
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 0.5rem;
        }

        .edu-node {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 9999px;
          border: 1px solid rgba(139, 163, 98, 0.4);
          background: radial-gradient(circle, rgba(139, 163, 98, 0.28), rgba(5, 5, 5, 0.9));
          box-shadow: 0 0 14px -6px rgba(139, 163, 98, 0.4);
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .edu-node[data-status='ongoing'] {
          border-color: rgba(201, 180, 74, 0.7);
          box-shadow: 0 0 18px -6px rgba(201, 180, 74, 0.6);
        }
        .edu-row:hover .edu-node {
          transform: scale(1.15);
          border-color: rgba(201, 180, 74, 0.9);
          box-shadow: 0 0 22px -8px rgba(201, 180, 74, 0.7);
        }
        .edu-node__core {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 9999px;
          background: radial-gradient(circle, #8ba362, rgba(139, 163, 98, 0.3));
        }
        .edu-node[data-status='ongoing'] .edu-node__core {
          background: radial-gradient(circle, #c9b44a, rgba(201, 180, 74, 0.32));
          box-shadow: 0 0 14px -6px rgba(201, 180, 74, 0.9);
          animation: edu-pulse 2.4s ease-in-out infinite;
        }

        @keyframes edu-pulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(201, 180, 74, 0.45);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 0 6px rgba(201, 180, 74, 0);
          }
        }

        .edu-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(209, 193, 148, 0.24);
          background: radial-gradient(
            140% 140% at 50% 0%,
            rgba(16, 19, 14, 0.92) 0%,
            rgba(9, 11, 7, 0.9) 100%
          );
          box-shadow: 0 26px 60px -30px rgba(0, 0, 0, 0.9);
          padding: 1.25rem 1.25rem 1rem;
        }
        @media (min-width: 768px) {
          .edu-card {
            padding: 1.6rem 2rem 1.4rem;
          }
        }
        .edu-card::after {
          content: '';
          position: absolute;
          inset: 6px;
          pointer-events: none;
          border: 1px solid rgba(209, 193, 148, 0.08);
        }

        .edu-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          pointer-events: none;
          border-color: rgba(226, 203, 86, 0.55);
          border-style: solid;
          transition: border-color 0.4s ease;
        }
        .edu-corner--tl {
          top: 10px;
          left: 10px;
          border-width: 1px 0 0 1px;
        }
        .edu-corner--tr {
          top: 10px;
          right: 10px;
          border-width: 1px 1px 0 0;
        }
        .edu-row:hover .edu-corner {
          border-color: rgba(201, 180, 74, 0.9);
        }

        .edu-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(236, 228, 211, 0.06) 50%,
            transparent 100%
          );
          transition: transform 0.8s ease;
        }
        .edu-row:hover .edu-sheen {
          transform: translateX(100%);
        }

        .edu-card__head {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(201, 180, 74, 0.18);
        }

        .edu-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(236, 228, 211, 0.85);
        }
        .edu-dot {
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 9999px;
          background: rgba(139, 163, 98, 0.6);
        }
        .edu-case {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(168, 162, 148, 0.8);
        }

        .edu-status {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(139, 163, 98, 0.85);
        }
        .edu-status[data-status='ongoing'] {
          color: rgba(201, 180, 74, 0.9);
        }
        .edu-status .status-dot {
          animation: status-blink 2.6s ease-in-out infinite;
        }

        .edu-period {
          position: relative;
          z-index: 1;
          margin-top: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #c9b44a;
        }

        .edu-qual {
          position: relative;
          z-index: 1;
          margin-top: 0.4rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(1.25rem, 2.2vw, 1.8rem);
          line-height: 1.2;
          color: #ece4d3;
        }

        .edu-inst {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: rgba(168, 162, 148, 0.95);
        }
        .edu-sep {
          color: rgba(201, 180, 74, 0.7);
        }

        .edu-desc {
          position: relative;
          z-index: 1;
          margin-top: 0.9rem;
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(236, 228, 211, 0.82);
        }

        .edu-skills {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin: 1rem 0 0;
          padding: 0;
          list-style: none;
        }

        .edu-skill {
          display: inline-flex;
          align-items: center;
          padding: 0.32rem 0.7rem;
          border: 1px solid rgba(201, 180, 74, 0.22);
          border-radius: 9999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(236, 228, 211, 0.85);
          background: linear-gradient(90deg, rgba(8, 10, 6, 0.6), rgba(8, 10, 6, 0.4));
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .edu-row:hover .edu-skill {
          border-color: rgba(201, 180, 74, 0.55);
          color: #ece4d3;
        }

        .edu-foot {
          position: relative;
          z-index: 1;
          margin-top: 1.1rem;
          padding-top: 0.7rem;
          border-top: 1px dashed rgba(201, 180, 74, 0.16);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.48rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(107, 102, 90, 0.9);
        }

        .edu-cert-block {
          margin-top: 2.75rem;
        }
        @media (min-width: 768px) {
          .edu-cert-block {
            margin-top: 3.75rem;
          }
        }

        .edu-cert-grid {
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .edu-cert-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .edu-cert-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          overflow: hidden;
          border: 1px solid rgba(209, 193, 148, 0.2);
          background: linear-gradient(140deg, rgba(13, 16, 10, 0.9), rgba(8, 10, 6, 0.88));
          padding: 1rem 1.25rem;
          box-shadow: 0 20px 46px -26px rgba(0, 0, 0, 0.9);
        }
        .edu-cert-card::after {
          content: '';
          position: absolute;
          inset: 5px;
          pointer-events: none;
          border: 1px solid rgba(209, 193, 148, 0.08);
        }
        .edu-cert-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 9999px;
          border: 1px solid rgba(201, 180, 74, 0.36);
          color: #c9b44a;
          font-size: 0.9rem;
          box-shadow: inset 0 0 16px rgba(201, 180, 74, 0.18);
        }
        .edu-cert-name {
          position: relative;
          z-index: 1;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.98rem;
          color: #ece4d3;
        }
        .edu-cert-issuer {
          position: relative;
          z-index: 1;
          margin-top: 0.15rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(168, 162, 148, 0.85);
        }
        .edu-cert-stamp {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          border: 1px solid rgba(168, 48, 48, 0.62);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #a83030;
          transform: rotate(-2deg);
          box-shadow: inset 0 0 12px rgba(168, 48, 48, 0.2);
        }
      `}</style>
    </div>
  )
}
