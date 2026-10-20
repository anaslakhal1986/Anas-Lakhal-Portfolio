import Section from '../components/Section'
import Reveal from '../components/Reveal'
import RadarChart from '../components/RadarChart'
import SkillBar from '../components/SkillBar'
import SectionHeading from '../components/SectionHeading'
import StatusIndicator from '../components/StatusIndicator'
import { skills } from '../data/portfolio'
import type { CategorySkill } from '../data/portfolio'

export default function Skills() {
  const totalSkills = skills.categories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0,
  )

  return (
    <div className="page-transition">
      {/* ── Hero ─────────────────────────────────────────── */}
      <Section id="skills-hero">
        <Reveal>
          <p className="case-stamp mb-3 font-mono text-[0.65rem] uppercase tracking-[0.28em]">
            <span className="text-sm leading-none text-toxic/70">••</span>
            <span className="ml-2">TECHNICAL SYSTEMS INVENTORY</span>
          </p>
          <h1 className="font-display text-4xl font-bold text-paper md:text-6xl">
            ANALYSE DES{' '}
            <span className="gradient-text">COMPÉTENCES</span>
          </h1>
          <div className="mt-5">
            <StatusIndicator label="SYSTEMS ONLINE" tone="active" />
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-smudge md:text-base">
            Inventaire exhaustif des technologies, frameworks et outils
            maîtrisés. Chaque compétence est évaluée et documentée — une pièce
            à conviction dans le dossier technique.
          </p>
        </Reveal>
      </Section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Vue synthétique ──────────────────────────────── */}
      <Section id="vue-synthetique">
        <Reveal>
          <SectionHeading
            eyebrow="VUE SYNTHÉTIQUE"
            code="02"
            title={<>Radar <span className="gradient-text">stratégique</span></>}
            description="Vue d'ensemble des domaines techniques — chaque axe représente un domaine clé du stack."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className="dossier-panel mb-8 p-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="case-stamp font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                  Nombre de catégories
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-paper">
                  {skills.categories.length}
                </p>
              </div>
              <div>
                <p className="case-stamp font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                  Total des compétences
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-paper">
                  {totalSkills}
                </p>
              </div>
              <div>
                <p className="case-stamp font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                  Système actif
                </p>
                <div className="mt-2">
                  <StatusIndicator label="Opérationnel" tone="active" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="dossier-panel p-8">
            <RadarChart />
            <p className="mt-6 text-center text-sm text-smudge">
              Visualisation radar des domaines techniques — dimensions Backend,
              Frontend, Database, Tools, Architecture et DevOps/CI-CD.
            </p>
          </div>
        </Reveal>
      </Section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Inventaire des systèmes ──────────────────────── */}
      <Section id="inventaire-systemes">
        <Reveal>
          <SectionHeading
            eyebrow="INVENTAIRE DES SYSTÈMES"
            code="03"
            title={<>Détail des <span className="gradient-text">compétences</span></>}
            description="Chaque catégorie de systèmes analysée en profondeur avec les niveaux de maîtrise documentés."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.categories.map((category: CategorySkill, i: number) => (
            <Reveal key={category.name} delay={i}>
              <div className="dossier-panel dossier-panel-hover h-full p-6">
                <div className="mb-6 flex items-center gap-3">
                  <span aria-hidden="true" className="text-xl">
                    {category.icon}
                  </span>
                  <h3 className="font-display text-lg font-bold text-paper">
                    {category.name}
                  </h3>
                  <span className="ml-auto">
                    <StatusIndicator label="ACTIF" tone="active" />
                  </span>
                </div>
                <div className="section-divider mb-6" />
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      variant="page"
                      name={skill.name}
                      percent={skill.percent}
                      label={skill.label}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  )
}
