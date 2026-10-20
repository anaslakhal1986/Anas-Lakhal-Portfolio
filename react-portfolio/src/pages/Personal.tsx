import heroPortrait from '../assets/images/heroPortrait.png'
import { profile, languages } from '../data/portfolio'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CaseMetadata from '../components/CaseMetadata'
import StatusIndicator from '../components/StatusIndicator'
import Badge from '../components/Badge'
import Button from '../components/Button'

function LanguageBar({ percent }: { percent: number }) {
  const color =
    percent >= 100
      ? 'bg-toxic'
      : percent >= 90
        ? 'bg-dirty-yellow'
        : 'bg-smudge'

  return (
    <div className="h-1 w-full rounded-full bg-olive-border/50">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

function getLevelBadgeVariant(percent: number): boolean {
  return percent >= 80
}

export default function Personal() {
  const metadataItems: [string, string][] = [
    ['Nom', profile.name],
    ['Rôle', profile.title],
    ['Contact', profile.email],
    ['Localisation', profile.location],
    ['Langues', profile.languages],
  ]

  return (
    <main id="main" className="page-transition relative z-10">
      <section className="min-h-[85vh] flex items-center px-6 md:px-12 lg:px-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="space-y-6">
              <p className="case-stamp font-mono text-[0.65rem] uppercase tracking-[0.28em]">
                <span className="text-toxic/70">••</span> CAS FICHIER : 002
              </p>

              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-paper md:text-7xl">
                {profile.name.split(' ')[0]}{' '}
                <span className="gradient-text">{profile.name.split(' ')[1]}</span>
              </h1>

              <p className="font-display text-lg text-smudge/80">{profile.title}</p>

              <StatusIndicator label="OPÉRATIONNEL" tone="active" />

              <p className="max-w-md text-sm leading-relaxed text-smudge/60">
                Identité vérifiée. Compétences validées. Prêt à enquêter sur de nouveaux défis.
              </p>

              <div className="flex gap-3 pt-2">
                <Button to="/#projects" variant="primary" size="md">
                  Voir les dossiers
                </Button>
                <Button to="/#contact" variant="outline" size="md">
                  Prendre contact
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="relative mx-auto w-full max-w-md md:ml-auto">
              <div className="overflow-hidden rounded-2xl border border-olive-border/60 shadow-[0_0_40px_rgba(139,163,98,0.08)]">
                <img
                  src={heroPortrait}
                  alt={profile.name}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="identite" className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="IDENTITÉ"
              code="§2.1"
              title="Fiche signalétique"
            />
          </Reveal>

          <Reveal delay={1}>
            <div className="dossier-panel dossier-panel-hover p-6 md:p-8">
              <div className="mb-6">
                <StatusIndicator label="STATUS: CONFIRMÉ" tone="active" />
              </div>
              <CaseMetadata items={metadataItems} />
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="dossier-panel dossier-panel-hover mt-6 p-6 md:p-8">
              <p className="case-stamp mb-4 font-mono text-[0.65rem] uppercase tracking-[0.28em]">
                DÉCLARATION PERSONNELLE
              </p>
              <blockquote className="border-l-2 border-toxic/40 pl-4 text-sm italic leading-relaxed text-smudge/70">
                « {profile.quote} »
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="dossier-panel dossier-panel-hover mt-6 p-6 md:p-8">
              <p className="case-stamp mb-4 font-mono text-[0.65rem] uppercase tracking-[0.28em]">
                CENTRES D'INTÉRÊT
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby) => (
                  <Badge key={hobby}>{hobby}</Badge>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="section-divider my-8" />

          <Reveal delay={4}>
            <div className="mt-6">
              <Button to="/skills" variant="outline" size="sm">
                Voir les compétences techniques →
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="langues" className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="LANGUES"
              code="§2.2"
              title="Compétences linguistiques"
            />
          </Reveal>

          <Reveal delay={1}>
            <div className="dossier-panel dossier-panel-hover p-6 md:p-8">
              <div className="space-y-6">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="border-b border-olive-border/30 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-sm font-medium text-paper/90">
                          {lang.name}
                        </span>
                        <Badge active={getLevelBadgeVariant(lang.percent)}>
                          {lang.level}
                        </Badge>
                      </div>
                      {lang.comment && (
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-smudge/50">
                          {lang.comment}
                        </span>
                      )}
                    </div>
                    <LanguageBar percent={lang.percent} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  )
}
