export interface HeroIdentity {
  id: string
  titleLine1: string
  titleLine2: string
  profileLabel: string
  tagline: string
  subline: string
  tags: string[]
}

export const HERO_IDENTITIES: HeroIdentity[] = [
  {
    id: '01',
    titleLine1: 'FULL STACK',
    titleLine2: 'DEVELOPER',
    profileLabel: 'IDENTITY PROFILE',
    tagline: 'WEB APPLICATIONS',
    subline: 'FRONTEND / BACKEND',
    tags: ['PHP', 'LARAVEL', 'REACT'],
  },
  {
    id: '02',
    titleLine1: 'AI',
    titleLine2: 'INTEGRATOR',
    profileLabel: 'IDENTITY PROFILE',
    tagline: 'INTELLIGENT APPLICATIONS',
    subline: 'AI / AUTOMATION',
    tags: ['PYTHON', 'LLAMA 3.3', 'GROQ API'],
  },
  {
    id: '03',
    titleLine1: 'BACKEND',
    titleLine2: 'DEVELOPER',
    profileLabel: 'IDENTITY PROFILE',
    tagline: 'SERVER-SIDE SYSTEMS',
    subline: 'REST APIs / AUTH / RBAC',
    tags: ['LARAVEL', 'MYSQL', 'POSTGRESQL'],
  },
  {
    id: '04',
    titleLine1: 'FRONTEND',
    titleLine2: 'DEVELOPER',
    profileLabel: 'IDENTITY PROFILE',
    tagline: 'RESPONSIVE INTERFACES',
    subline: 'MODERN UI / UX',
    tags: ['HTML5', 'CSS3', 'TAILWIND'],
  },
]