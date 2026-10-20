import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import Button from './Button'
import CaseFile from './CaseFile'
import SectionHeading from './SectionHeading'
import { profile, contactCards } from '../data/portfolio'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm: FormState = { name: '', email: '', subject: '', message: '' }

const inputClasses =
  'w-full rounded-sm border border-olive-border bg-night/50 px-4 py-3 font-mono text-sm text-paper placeholder:text-annotate transition-colors duration-300 focus:border-toxic/60 focus:bg-night/80 focus:outline-none focus:ring-1 focus:ring-toxic/30'

interface FieldProps {
  label: string
  name: keyof FormState
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  placeholder?: string
  textarea?: boolean
  rows?: number
  autoComplete?: string
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  textarea = false,
  rows = 5,
  autoComplete,
}: FieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="case-stamp mb-2 block">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${inputClasses} resize-none leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
        />
      )}
      {error && (
        <p
          id={errorId}
          className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-crimson-glow"
        >
          ⚠ {error}
        </p>
      )}
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (sent) setSent(false)
  }

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Champ requis'
    if (!form.email.trim()) next.email = 'Champ requis'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Adresse email invalide'
    if (!form.subject.trim()) next.subject = 'Champ requis'
    if (!form.message.trim()) next.message = 'Champ requis'
    else if (form.message.trim().length < 10) next.message = 'Message trop court (10 caractères min.)'
    return next
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      setSent(false)
      return
    }
    const subject = encodeURIComponent(`[Portfolio] ${form.subject.trim()}`)
    const body = encodeURIComponent(
      `Nom: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setForm(emptyForm)
    setErrors({})
  }

  return (
    <Section id="contact" className="px-[7rem]">
      <Reveal>
        <SectionHeading
          code="06"
          eyebrow="CANAL DE COMMUNICATION"
          title={
            <>
              CONTACT — <span className="gradient-text">CHANNEL OPEN</span>
            </>
          }
          description="Transmettez un message via le formulaire sécurisé, ou utilisez directement l'un des canaux ci-dessous."
        />
        <div className="section-divider my-10" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="space-y-6">
            <CaseFile caseNumber="CASE FILE: 006" status="TRANSMISSION OPEN">
              <p className="text-sm leading-relaxed text-smudge">
                Vous souhaitez transmettre un message, proposer une mission ou consulter le dossier
                complet ? Toutes les preuves de compétence sont disponibles sur les canaux ci-dessous.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={`mailto:${profile.email}`} variant="primary" size="md">
                  Contact direct <span aria-hidden="true">↗</span>
                </Button>
                <Button to="/personal" variant="outline" size="md">
                  Dossier personnel <span aria-hidden="true">→</span>
                </Button>
              </div>
            </CaseFile>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((c) => (
                <div key={c.label} className="dossier-panel dossier-panel-hover p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-lg" aria-hidden="true">
                      {c.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="case-stamp mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="break-all font-mono text-sm text-paper transition-colors hover:text-toxic"
                          {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="font-mono text-sm text-paper">{c.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="dossier-panel p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-olive-border/60 pb-4">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-dirty-yellow/80">
                Formulaire — 006/A
              </span>
              <span className="ml-auto flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-smudge">
                <span
                  aria-hidden="true"
                  className={`status-dot ${sent ? 'status-dot--active' : 'status-dot--yellow'}`}
                />
                {sent ? 'Message transmis' : 'Prêt à transmettre'}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nom complet"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
                placeholder="Jean Dupont"
                autoComplete="name"
              />
              <Field
                label="Adresse email"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="jean@exemple.com"
                autoComplete="email"
              />
            </div>

            <div className="mt-5">
              <Field
                label="Objet"
                name="subject"
                value={form.subject}
                error={errors.subject}
                onChange={handleChange}
                placeholder="Proposition de mission"
              />
            </div>

            <div className="mt-5">
              <Field
                label="Message"
                name="message"
                value={form.message}
                error={errors.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet, votre besoin ou votre proposition…"
                textarea
                rows={6}
              />
            </div>

            {sent && (
              <div
                role="status"
                className="mt-6 flex items-center gap-3 rounded-sm border border-toxic/30 bg-toxic/[0.06] px-4 py-3"
              >
                <span aria-hidden="true" className="status-dot status-dot--active" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-toxic">
                  Message transmis — votre client mail va s&apos;ouvrir.
                </p>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-olive-border/60 pt-6">
              <Button type="submit" variant="primary" size="lg">
                Transmettre le message <span aria-hidden="true">↗</span>
              </Button>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-annotate">
                Réponse sous 24–48h
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
