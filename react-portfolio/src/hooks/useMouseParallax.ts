import { useEffect } from 'react'
import gsap from 'gsap'
import useReducedMotion from './useReducedMotion'

interface Registered {
  x: (value: number) => void
  y: (value: number) => void
  strength: number
}

export default function useMouseParallax() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const registry = new Map<HTMLElement, Registered>()
    let mouseX = 0
    let mouseY = 0
    let raf = 0

    const register = (el: HTMLElement) => {
      const strength = Number.parseFloat(el.dataset.parallax ?? '0')
      if (!strength || registry.has(el)) return
      el.style.willChange = 'transform'
      registry.set(el, {
        x: gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' }),
        strength,
      })
    }

    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(register)
    }

    const apply = () => {
      raf = 0
      registry.forEach(({ x, y, strength }) => {
        x(mouseX * strength)
        y(mouseY * strength)
      })
    }

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue
          if (node.hasAttribute('data-parallax')) register(node)
          node.querySelectorAll<HTMLElement>('[data-parallax]').forEach(register)
        }
      }
    })

    scan()
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      registry.forEach((_, el) => {
        el.style.willChange = ''
      })
      registry.clear()
    }
  }, [reduced])
}
