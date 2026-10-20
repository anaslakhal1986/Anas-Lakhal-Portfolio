export type ProjectTier = 'featured' | 'primary' | 'secondary'

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  client?: string
  duration: string
  role: string
  overview: string
  problem?: string
  solution?: string
  architecture: string[]
  highlights?: string[]
  challenges?: string[]
  learned?: string[]
  tools?: string[]
  metrics?: CaseStudyMetric[]
  skills?: string[]
}

export interface Project {
  id: string
  name: string
  monogram: string
  badge?: string
  categories: string[]
  description: string
  short?: string
  stack: string[]
  features?: string[]
  github?: string
  live?: string
  tier: ProjectTier
  ai?: boolean
  accent: string
  caseStudy?: CaseStudy
}

export interface Skill {
  name: string
  percent: number
  label?: string
}

export interface CategorySkill {
  name: string
  icon: string
  skills: Skill[]
}

export interface Language {
  name: string
  level: string
  percent: number
  comment?: string
}

export interface TimelineItem {
  code: string
  qualification: string
  institution: string
  location?: string
  period: string
  status: 'completed' | 'ongoing'
  description: string
  skills: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface ContactCard {
  label: string
  value: string
  icon: string
  href?: string
  external?: boolean
}

export const profile = {
  name: 'Anas Lakhal',
  initials: 'AL',
  brand: 'AL_PORTFOLIO',
  title: 'Full Stack Developer',
  role: 'Full Stack Developer',
  badge: 'FULL STACK DEV',
  availability: 'Available for Internship & Junior Roles',
  email: 'anas.lakhal1986@gmail.com',
  phone: '+212 6 64 06 03 79',
  phoneRaw: '+212664060379',
  location: 'Youssoufia, Morocco',
  quote: 'Le code propre est la meilleure des défenses — chaque ligne est un indice, chaque fonction une piste.',
  hobbies: ['Programmation', 'Lecture', 'Échecs', 'Basketball', 'Veille technologique'],
  languages: 'Arabe, Darija, Français, Anglais',
}

export const socials = {
  github: 'https://github.com/anaslkhl',
  linkedin: 'https://www.linkedin.com/in/anas-lakhal-682a3a2b2/',
}

export const about = {
  paragraphs: [
    'Full Stack Developer in training, specialized in PHP/Laravel and the Java ecosystem (Spring, Spring Boot, Angular). Experienced in building complete web applications including authentication systems, role management, REST APIs, and responsive interfaces.',
    'Comfortable working in Agile teams using Git for version control, with hands-on CI/CD experience through GitHub Actions and Docker. Passionate about clean architecture, scalable backends, and modern UI experiences. Currently studying at YouCode UM6P, delivering production-grade applications from day one.',
  ],
  highlights: [
    {
      icon: '⚙️',
      title: 'Backend Development',
      text: 'PHP, Laravel, Java, Spring Boot, REST APIs, MySQL — robust server-side logic.',
    },
    {
      icon: '🎨',
      title: 'Frontend Development',
      text: 'Angular, HTML5, CSS3, Tailwind, JavaScript — clean, responsive interfaces.',
    },
    {
      icon: '🚀',
      title: 'CI/CD & DevOps',
      text: 'GitHub Actions, Docker, automated pipelines — reliable, repeatable deliveries.',
    },
  ],
}

export const projects: Project[] = [
  {
    id: 'PROJECT_01',
    name: 'KIT Support Hub',
    monogram: 'KS',
    badge: 'Intelligent Customer Support Platform',
    categories: ['Full-Stack Development', 'Artificial Intelligence', 'Robotics'],
    description:
      'KIT Support Hub is an intelligent customer support platform developed for Key Intelligent Technology (KIT Robotics). The platform centralizes ticket management, knowledge sharing, customer communication, document management, and AI-powered assistance.',
    short:
      'Intelligent customer support platform for KIT Robotics — centralizing ticket management, knowledge sharing, and AI-powered assistance.',
    stack: ['Laravel', 'React', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Python', 'Nginx', 'Sanctum'],
    features: [
      'Authentication and authorization',
      'Ticket management system',
      'Knowledge base',
      'Community forum',
      'Document management',
      'Product reviews',
      'Feature requests',
      'Notification system',
      'AI assistant integration',
    ],
    github: 'https://github.com/anaslkhl/kit-support-hub',
    tier: 'featured',
    ai: true,
    accent: 'from-toxic/30 via-dirty-yellow/10 to-transparent',
    caseStudy: {
      client: 'Key Intelligent Technology (KIT Robotics)',
      duration: '2026',
      role: 'Full-Stack Developer',
      overview:
        'KIT Support Hub is an intelligent customer support platform developed for Key Intelligent Technology (KIT Robotics). The platform centralizes ticket management, knowledge sharing, customer communication, document management, and AI-powered assistance.',
      architecture: ['React', 'Laravel API', 'PostgreSQL', 'Docker', 'AI Assistant'],
      challenges: [
        'Complex database design',
        'Role-based authorization',
        'Search optimization',
        'Artificial intelligence integration',
        'Application security',
      ],
      learned: [
        'Software architecture',
        'DevOps',
        'Security',
        'Database optimization',
        'Artificial intelligence integration',
      ],
    },
  },
  {
    id: 'PROJECT_02',
    name: 'Swiss Army Agent',
    monogram: 'SA',
    badge: 'First AI Agent',
    categories: ['Artificial Intelligence', 'AI Agents', 'Automation'],
    description:
      'A modular AI agent powered by Groq\u2019s Llama 3.3 that can understand natural-language requests, maintain conversation context, automatically call external tools, and return real-time information through a web interface, CLI, or REST API.',
    short:
      'Extensible AI agent powered by Llama 3.3 with conversational memory, function calling, real-time tools, and Web/CLI/API interfaces.',
    stack: ['Python 3.13', 'Flask', 'Groq API', 'Llama 3.3', 'DuckDuckGo Search', 'wttr.in'],
    features: [
      'Natural-language conversations',
      'Conversation memory',
      'Function calling',
      'Automatic tool selection',
      'Auto-discovery tool registry',
      'Real-time weather lookup',
      'Web and news search',
      'REST API',
    ],
    github: 'https://github.com/anaslkhl/swiss-army-agent',
    tier: 'featured',
    ai: true,
    accent: 'from-toxic/20 via-olive/10 to-transparent',
    caseStudy: {
      duration: 'June 2026',
      role: 'AI Developer',
      overview:
        'A modular AI agent powered by Groq\u2019s Llama 3.3 that can understand natural-language requests, maintain conversation context, automatically call external tools, and return real-time information through a web interface, CLI, or REST API.',
      problem:
        'Traditional LLMs mainly generate text and do not directly interact with external services. This project extends an LLM with tools so it can search the web, retrieve live weather information, perform calculations, and take actions based on the user\u2019s request.',
      architecture: [
        'User Interface',
        'Function Agent',
        'Auto-Discovery Tool Registry',
        'Weather / Search / Calculator Tools',
      ],
      highlights: [
        'The agent uses an extensible auto-discovery registry architecture. Every tool follows a common base interface, and new tools can be added by creating a new tool file without modifying the core agent architecture.',
      ],
      tools: [
        'Weather Tool: real-time temperature, conditions, humidity, wind speed, Celsius/Fahrenheit',
        'Search Tool: web search and current news retrieval',
        'Calculator Tool: arithmetic, percentages, scientific calculations, and unit conversions',
      ],
      metrics: [
        { value: '3', label: 'External tools' },
        { value: '3', label: 'Interfaces: Web, CLI, REST API' },
        { value: '~800', label: 'Lines of code' },
        { value: '2–5s', label: 'Typical response time' },
      ],
      skills: [
        'AI agents',
        'LLM function calling',
        'Prompt engineering',
        'API integration',
        'Modular architecture',
        'Tool orchestration',
        'Conversation memory',
        'Python backend development',
      ],
    },
  },
  {
    id: 'PROJECT_03',
    name: 'EasyColoc',
    monogram: 'EC',
    badge: 'Flatsharing & Expense Settlement',
    categories: ['Web App', 'Laravel', 'Full-Stack'],
    description:
      'A full-stack web app to manage shared housing, track shared expenses, and automatically calculate how much each roommate owes.',
    stack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    features: [
      'Real-time balance calculation between roommates',
      'Role-based access — owner manages members, members track their own spending',
      'Expense ledger with categories and history',
    ],
    github: 'https://github.com/anaslkhl/EasyColoc',
    tier: 'featured',
    accent: 'from-dirty-yellow/25 via-toxic/10 to-transparent',
  },
  {
    id: 'PROJECT_04',
    name: 'ApexMercato',
    monogram: 'AM',
    badge: 'Esports Team Management Platform',
    categories: ['Web App', 'PHP OOP', 'Database'],
    description:
      'Internal platform for esports organizations — manage players, coaches, teams, contracts, and transfers.',
    stack: ['PHP OOP', 'PostgreSQL', 'JavaScript', 'Bootstrap'],
    features: [
      'Complete player & coach management',
      'Team creation and transfer system',
      'Advanced OOP with PDO prepared statements',
    ],
    github: 'https://github.com/anaslkhl/ApexMercato',
    tier: 'primary',
    accent: 'from-olive/40 via-toxic/10 to-transparent',
  },
  {
    id: 'PROJECT_05',
    name: 'GreenTech Solution',
    monogram: 'GT',
    badge: 'E-commerce with Back-Office',
    categories: ['E-commerce', 'Laravel', 'Admin Panel'],
    description:
      'E-commerce platform with a public catalog and a complete back-office for managing products, orders, and roles.',
    stack: ['Laravel', 'Blade', 'MySQL', 'Spatie Permissions'],
    features: [
      'Public product catalog with search & filters',
      'Admin dashboard with product CRUD',
      'Role & permission system via Spatie',
    ],
    github: 'https://github.com/anaslkhl/GreenTech-Solutions',
    tier: 'primary',
    accent: 'from-toxic/40 via-dark-green/40 to-transparent',
  },
]

export const homeSkills: Skill[] = [
  { name: 'PHP', percent: 85 },
  { name: 'Laravel', percent: 80 },
  { name: 'Java', percent: 72 },
  { name: 'Spring Boot', percent: 70 },
  { name: 'JavaScript', percent: 70 },
  { name: 'Angular', percent: 66 },
  { name: 'C / C++', percent: 58 },
  { name: 'HTML5 / CSS3', percent: 90 },
  { name: 'Tailwind CSS', percent: 82 },
  { name: 'MySQL', percent: 82 },
  { name: 'PostgreSQL', percent: 65 },
]

export const skillGroups = [
  {
    icon: '⚙️',
    title: 'Backend',
    count: '8 techs',
    skills: [
      { name: 'PHP', percent: 85 },
      { name: 'Laravel', percent: 80 },
      { name: 'Java', percent: 72 },
      { name: 'Spring', percent: 66 },
      { name: 'Spring Boot', percent: 70 },
      { name: 'JavaScript', percent: 70 },
      { name: 'C', percent: 62 },
      { name: 'C++', percent: 55 },
    ],
  },
  {
    icon: '🎨',
    title: 'Frontend',
    count: '4 techs',
    skills: [
      { name: 'HTML5', percent: 92 },
      { name: 'CSS3', percent: 88 },
      { name: 'Tailwind CSS', percent: 82 },
      { name: 'Angular', percent: 66 },
    ],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    count: '2 techs',
    skills: [
      { name: 'MySQL', percent: 83 },
      { name: 'PostgreSQL', percent: 65 },
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps & CI/CD',
    count: '3 techs',
    skills: [
      { name: 'Docker', percent: 70 },
      { name: 'GitHub Actions', percent: 62 },
      { name: 'CI/CD Pipelines', percent: 60 },
    ],
  },
] as const

export const tools = [
  ['🐙', 'Git'],
  ['😺', 'GitHub'],
  ['🚀', 'GitHub Actions'],
  ['🔁', 'CI/CD'],
  ['🎨', 'Figma'],
  ['📋', 'Jira'],
  ['🐳', 'Docker'],
  ['⚡', 'VS Code'],
] as const

export const concepts = [
  'REST API',
  'Authentication',
  'MVC',
  'OOP',
  'SOLID',
  'RBAC',
  'Eloquent ORM',
  'PDO',
  'Agile/Scrum',
  'Git Flow',
  'CI/CD',
  'GitHub Actions',
  'Responsive Design',
  'Spatie Permissions',
]

export const architectureConcepts = [
  'REST API',
  'Authentication',
  'MVC',
  'OOP',
  'SOLID',
  'RBAC',
  'Eloquent ORM',
  'Git/GitHub',
  'Docker',
  'CI/CD',
  'GitHub Actions',
]

export const basicInfo: [string, string][] = [
  ['Full Name', 'Anas Lakhal'],
  ['Location', 'Youssoufia, Morocco'],
  ['Status', 'Open to Internship'],
  ['Email', 'anas.lakhal1986@gmail.com'],
  ['Phone', '+212 6 64 06 03 79'],
]

export const languages: Language[] = [
  { name: 'Arabe', level: 'Natif', percent: 100, comment: 'Langue maternelle' },
  { name: 'Darija', level: 'Natif', percent: 100, comment: 'Courant quotidien' },
  { name: 'Français', level: 'A2', percent: 40, comment: 'En progression' },
  { name: 'Anglais', level: 'A2', percent: 40, comment: 'Technique acceptable' },
]

export const professionalSummary =
  'Full Stack Developer in training, specialized in PHP/Laravel and the Java ecosystem (Spring, Spring Boot, Angular), with solid JavaScript and MySQL skills. Experienced in building complete web applications including authentication systems, role management, REST APIs, and responsive interfaces, backed by CI/CD pipelines with GitHub Actions and Docker. Comfortable in Agile teams using Git. Passionate about clean architecture and scalable backends.'

export const timeline: TimelineItem[] = [
  {
    code: 'EDU-01',
    qualification: 'Développement Web Full Stack — 2ème année',
    institution: 'YouCode | UM6P',
    location: 'Campus Youssoufia',
    period: '2025 • En cours',
    status: 'ongoing',
    description:
      "Formation orientée conception d'applications web : Java, Spring Boot, Angular, bases de données, architecture logicielle et outils de développement.",
    skills: ['Java', 'Spring Boot', 'Angular', 'Bases de données', 'Architecture logicielle'],
  },
  {
    code: 'EDU-02',
    qualification: 'Piscine 1337 Coding School',
    institution: '1337 Coding School',
    location: 'Maroc',
    period: '07/2024',
    status: 'completed',
    description:
      'Formation intensive d’un mois en programmation. Initiation intensive à la programmation, avec un focus sur le langage C, l’algorithmique et la résolution de problèmes.',
    skills: ['Langage C', 'Algorithmique', 'Résolution de problèmes', 'Débogage', 'Autonomie'],
  },
  {
    code: 'EDU-03',
    qualification: 'Baccalauréat — Sciences de la Vie et de la Terre (SVT)',
    institution: 'Parcours scolaire',
    period: '2023 • 2024',
    status: 'completed',
    description: 'Niveau Baccalauréat, filière Sciences de la Vie et de la Terre.',
    skills: ['Sciences de la Vie', 'Sciences de la Terre'],
  },
]

export const certifications: { name: string; issuer: string }[] = [
  { name: 'Introduction to Java', issuer: 'SoloLearn' },
  { name: 'Prompt Engineering', issuer: 'SoloLearn' },
]

export const softSkills = [
  'Teamwork',
  'Leadership',
  'Autonomy',
  'Communication',
  'Problem Solving',
  'Adaptability',
]

export const contactCards: ContactCard[] = [
  {
    label: 'Email',
    value: 'anas.lakhal1986@gmail.com',
    icon: '📧',
    href: 'mailto:anas.lakhal1986@gmail.com',
  },
  {
    label: 'Phone',
    value: '+212 6 64 06 03 79',
    icon: '📞',
    href: 'tel:+212664060379',
  },
  { label: 'Location', value: 'Youssoufia, Morocco', icon: '📍' },
  {
    label: 'GitHub',
    value: 'github.com/anaslkhl',
    icon: '🐙',
    href: 'https://github.com/anaslkhl',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Anas Lakhal',
    icon: '💼',
    href: 'https://www.linkedin.com/in/anas-lakhal-682a3a2b2/',
    external: true,
  },
]

export const skills = {
  categories: [
    {
      name: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'PHP', percent: 85 },
        { name: 'Laravel', percent: 80 },
        { name: 'Java', percent: 72 },
        { name: 'Spring', percent: 66 },
        { name: 'Spring Boot', percent: 70 },
        { name: 'JavaScript', percent: 70 },
        { name: 'C', percent: 62 },
        { name: 'C++', percent: 55 },
      ],
    },
    {
      name: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'HTML5', percent: 92 },
        { name: 'CSS3', percent: 88 },
        { name: 'Tailwind CSS', percent: 82 },
        { name: 'Angular', percent: 66 },
      ],
    },
    {
      name: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'MySQL', percent: 83 },
        { name: 'PostgreSQL', percent: 65 },
      ],
    },
    {
      name: 'DevOps & CI/CD',
      icon: '🚀',
      skills: [
        { name: 'Docker', percent: 70 },
        { name: 'GitHub Actions', percent: 62 },
        { name: 'CI/CD Pipelines', percent: 60 },
      ],
    },
  ],
}
