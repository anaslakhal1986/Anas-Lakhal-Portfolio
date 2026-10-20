import { lazy, Suspense, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import SideDots from './components/SideDots'
import BackToTop from './components/BackToTop'
import useMouseParallax from './hooks/useMouseParallax'
import Home from './pages/Home'
import { projects } from './data/portfolio'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const Personal = lazy(() => import('./pages/Personal'))
const Skills = lazy(() => import('./pages/Skills'))
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy'))

const TITLES: Record<string, string> = {
  '/': 'Anas Lakhal — Full Stack Developer',
  '/personal': 'Anas Lakhal — Personal Info',
  '/skills': 'Anas Lakhal — Hard Skills',
}

function useDocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    let title = TITLES[pathname]
    if (!title && pathname.startsWith('/projects/')) {
      const project = projects.find((p) => p.id === pathname.replace('/projects/', ''))
      title = project ? `${project.name} — Case Study` : TITLES['/']
    }
    document.title = title ?? TITLES['/']
  }, [pathname])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [pathname])
  return null
}

function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const id = window.setTimeout(() => setVisible(true), 40)
    return () => window.clearTimeout(id)
  }, [pathname])

  return (
    <div key={pathname} className={`page-transition ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-toxic/80 shadow-glow-sm" />
    </div>
  )
}

function SmoothAnchors() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      gsap.to(window, {
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTo: { y: target, offsetY: -offset, autoKill: true },
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

export default function App() {
  useDocumentTitle()
  useMouseParallax()

  return (
    <>
      <SmoothAnchors />
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full border border-white/15 bg-black/90 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Navbar />
      <SideDots />

      <PageTransition>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects/:projectId" element={<ProjectCaseStudy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </PageTransition>

      <BackToTop />
    </>
  )
}
