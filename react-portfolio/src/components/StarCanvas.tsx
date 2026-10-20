import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkle: number
  twinkleSpeed: number
  speedX: number
  speedY: number
  depth: number
  hue: 'white' | 'warm' | 'green' | 'pale'
}

const COLOR_FOR: Record<Star['hue'], string> = {
  white: '232, 228, 220',
  warm: '200, 190, 160',
  green: '139, 163, 98',
  pale: '168, 162, 148',
}

const HUES: Star['hue'][] = ['white', 'warm', 'pale', 'white', 'white', 'warm', 'green']

interface Meteor {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  life: number
  maxLife: number
}

const MOUSE_PARALLAX = 34
const SCROLL_PARALLAX = 46

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const coarse = window.matchMedia('(pointer: coarse)').matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let raf = 0
    let running = !document.hidden
    let elapsed = 0
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let nebula: HTMLCanvasElement | null = null
    let nextMeteorAt = performance.now() + 6000

    const makeNebula = () => {
      const n = document.createElement('canvas')
      n.width = 700
      n.height = 500
      const nCtx = n.getContext('2d')
      if (!nCtx) return
      const blobs: Array<[number, number, number, string]> = [
        [180, 210, 240, 'rgba(139, 163, 98, 0.12)'],
        [500, 150, 210, 'rgba(90, 122, 58, 0.10)'],
        [350, 360, 260, 'rgba(156, 138, 98, 0.08)'],
        [80, 420, 190, 'rgba(42, 48, 40, 0.08)'],
        [600, 430, 200, 'rgba(201, 180, 74, 0.05)'],
      ]
      for (const [x, y, r, c] of blobs) {
        const g = nCtx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, c)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        nCtx.fillStyle = g
        nCtx.fillRect(0, 0, 700, 500)
      }
      nebula = n
    }

    const initStars = () => {
      const areaRatio = Math.min(1, (width * height) / (1400 * 900))
      const base = coarse ? 150 : 260
      const count = Math.round(base * areaRatio)
      stars = Array.from({ length: count }, () => {
        const depth = 0.3 + Math.random() * 0.9
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.4 + Math.random() * (depth > 1 ? 1.1 : 0.7) * 0.9,
          baseAlpha: 0.25 + Math.random() * 0.55,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          speedX: (Math.random() - 0.5) * 0.1 * depth,
          speedY: (Math.random() - 0.5) * 0.05 * depth,
          depth,
          hue: HUES[Math.floor(Math.random() * HUES.length)],
        }
      })
      meteors = []
    }

    const drawFrame = (time: number, driftedX: number, driftedY: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#030308'
      ctx.fillRect(0, 0, width, height)

      if (nebula) {
        const w = Math.min(width, 1300)
        const h = Math.min(height, 940)
        ctx.globalAlpha = 0.9
        ctx.drawImage(nebula, width / 2 - w / 2, height / 2 - h / 2, w, h)
        ctx.globalAlpha = 1
      }

      for (const s of stars) {
        const offsetX = s.depth * driftedX
        const offsetY = s.depth * driftedY
        const x = s.x + offsetX
        const y = s.y + offsetY
        const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(elapsed * s.twinkleSpeed + s.twinkle))

        ctx.beginPath()
        ctx.arc(x, y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR_FOR[s.hue]}, ${alpha})`
        ctx.fill()

        if (s.depth > 1 && s.radius > 0.7) {
          ctx.beginPath()
          ctx.moveTo(x + s.radius * 2.2, y)
          ctx.lineTo(x + s.radius * 6.5, y)
          ctx.strokeStyle = `rgba(${COLOR_FOR[s.hue]}, ${alpha * 0.22})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        s.x += s.speedX
        s.y += s.speedY
        if (s.x < -20) s.x = width + 20
        if (s.x > width + 20) s.x = -20
        if (s.y < -20) s.y = height + 20
        if (s.y > height + 20) s.y = -20
      }

      if (time > nextMeteorAt && meteors.length < 2) {
        meteors.push({
          x: width * (0.55 + Math.random() * 0.45),
          y: height * (0.05 + Math.random() * 0.3),
          length: 90 + Math.random() * 120,
          speed: 10 + Math.random() * 6,
          angle: 0.62 + Math.random() * 0.12,
          life: 0,
          maxLife: 1.4 + Math.random() * 0.7,
        })
        nextMeteorAt = time + 5000 + Math.random() * 8000
      }

      meteors = meteors.filter((m) => m.life < m.maxLife)
      for (const m of meteors) {
        m.life += m.maxLife / 120
        const p = Math.min(1, m.life / m.maxLife)
        m.x -= Math.cos(m.angle) * m.speed * 6
        m.y += Math.sin(m.angle) * m.speed * 6
        const headX = m.x
        const headY = m.y
        const tailX = m.x + Math.cos(m.angle) * m.length
        const tailY = m.y - Math.sin(m.angle) * m.length
        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY)
        grad.addColorStop(0, `rgba(200, 190, 160, ${0.85 * (1 - p)})`)
        grad.addColorStop(1, 'rgba(139, 163, 98, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(headX, headY)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }
    }

    const frame = (time: number) => {
      if (!running) {
        raf = requestAnimationFrame(frame)
        return
      }
      elapsed += 0.016
      mouseX += (targetX - mouseX) * 0.04
      mouseY += (targetY - mouseY) * 0.04
      const scrollFactor = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight))
      drawFrame(
        time,
        mouseX * MOUSE_PARALLAX + scrollFactor * SCROLL_PARALLAX,
        mouseY * MOUSE_PARALLAX + scrollFactor * -SCROLL_PARALLAX * 0.35
      )
      raf = requestAnimationFrame(frame)
    }

    const drawOnce = () => {
      drawFrame(performance.now(), 0, 0)
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
      if (!nebula) makeNebula()
      if (reduced) drawOnce()
    }

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    const onVisibility = () => {
      running = !document.hidden
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    resize()

    if (reduced) {
      drawOnce()
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return <canvas id="space-canvas" ref={canvasRef} aria-hidden="true" />
}