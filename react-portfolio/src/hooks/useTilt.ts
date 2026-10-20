import { useLayoutEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion'

interface TiltOptions {
  max?: number
  scale?: number
}

export default function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 7,
  scale = 1.01,
}: TiltOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * max
      const ry = (px - 0.5) * max
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`
    }

    const onLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max, scale, reduced])

  return ref
}