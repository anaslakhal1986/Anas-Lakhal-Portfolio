import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ProjectsSection from '../components/ProjectsSection'
import Timeline from '../components/Timeline'
import SystemsInventory from '../components/SystemsInventory'
import CaseOpeningTransition from '../components/CaseOpeningTransition'
import IdentityDossier from '../components/IdentityDossier'
import ContactSection from '../components/ContactSection'
import Hero from '../components/hero/Hero'
import { projects, timeline, certifications } from '../data/portfolio'
import type { Project } from '../data/portfolio'

export default function Home() {
  const { pathname, hash } = useLocation()
  const [transitioning, setTransitioning] = useState<Project | null>(null)

  useEffect(() => {
    if (!hash) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(() => {
      const target = document.querySelector(hash)
      if (!target) return
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(id)
  }, [pathname, hash])

  const openCase = useCallback((project: Project | null) => {
    if (project) setTransitioning(project)
  }, [])

  const onTransitionDone = useCallback(() => setTransitioning(null), [])

  return (
    <div>
      {transitioning && (
        <CaseOpeningTransition
          caseNumber={`CASE ${String(projects.findIndex((p) => p.id === transitioning.id) + 1).padStart(2, '0')}`}
          targetPath={`/projects/${transitioning.id}`}
          outcome="granted"
          onComplete={onTransitionDone}
        />
      )}

      {/* ── 01 HERO ────────────────────────────────────── */}
      <Hero />

      {/* ── 02 ABOUT ──────────────────────────────────── */}
      <Section id="about" className="px-0 py-12 md:py-16">
        <IdentityDossier />
      </Section>

      {/* ── 03 PROJECTS ───────────────────────────────── */}
      <Section id="projects" className="px-0 py-0">
        <ProjectsSection openCase={openCase} />
      </Section>

      {/* ── 04 SKILLS ─────────────────────────────────── */}
      <Section id="skills" className="px-0 py-0">
        <SystemsInventory />
      </Section>

      {/* ── 05 EXPERIENCE ─────────────────────────────── */}
      <Section id="experience" className="px-4 md:px-8 lg:px-12 xl:px-16">
        <Reveal>
          <SectionHeading
            code="05"
            eyebrow="CHRONOLOGIE"
            title={
              <>
                PARCOURS — <span className="gradient-text">CARNET D&apos;ENQUÊTE</span>
              </>
            }
          />
          <div className="section-divider my-10" />
        </Reveal>

        <Reveal delay={0.1}>
          <Timeline items={timeline} certifications={certifications} />
        </Reveal>
      </Section>

      {/* ── 06 CONTACT ────────────────────────────────── */}
      <ContactSection />
    </div>
  )
}




