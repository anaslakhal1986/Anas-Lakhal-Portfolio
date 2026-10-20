import { useEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const LABELS = ['Backend', 'Frontend', 'Database', 'Tools', 'OOP/Arch', 'DevOps']
const VALUES = [0.82, 0.88, 0.75, 0.72, 0.8, 0.64]

export default function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const W = c.width
    const H = c.height
    const cx = W / 2
    const cy = H / 2
    const r = 92

    const drawGrid = () => {
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        for (let j = 0; j < LABELS.length; j++) {
          const ang = (j * Math.PI * 2) / LABELS.length - Math.PI / 2
          const rr = (r / 5) * i
          const x = cx + Math.cos(ang) * rr
          const y = cy + Math.sin(ang) * rr
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(139,163,98,${i * 0.03 + 0.04})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (let i = 0; i < LABELS.length; i++) {
        const ang = (i * Math.PI * 2) / LABELS.length - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r)
        ctx.strokeStyle = 'rgba(139,163,98,0.12)'
        ctx.stroke()
      }
    }

    const drawPolygon = (progress: number) => {
      ctx.save()
      ctx.beginPath()
      VALUES.forEach((v, i) => {
        const ang = (i * Math.PI * 2) / LABELS.length - Math.PI / 2
        const rr = r * v * progress
        const x = cx + Math.cos(ang) * rr
        const y = cy + Math.sin(ang) * rr
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(139,163,98,0.1)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(139,163,98,0.55)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = 'rgba(139,163,98,0.5)'
      ctx.shadowBlur = 12
      ctx.stroke()
      ctx.restore()

      VALUES.forEach((v, i) => {
        const ang = (i * Math.PI * 2) / LABELS.length - Math.PI / 2
        const rr = r * v * progress
        const x = cx + Math.cos(ang) * rr
        const y = cy + Math.sin(ang) * rr
        ctx.beginPath()
        ctx.arc(x, y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#8ba362'
        ctx.shadowColor = 'rgba(139,163,98,0.8)'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.font = '600 9px "JetBrains Mono", ui-monospace, Menlo, monospace'
      ctx.fillStyle = 'rgba(168,162,148,0.7)'
      ctx.textAlign = 'center'
      LABELS.forEach((l, i) => {
        const ang = (i * Math.PI * 2) / LABELS.length - Math.PI / 2
        ctx.fillText(l, cx + Math.cos(ang) * (r + 18), cy + Math.sin(ang) * (r + 18))
      })
    }

    let progress = reduced ? 1 : 0
    let raf = 0

    const render = () => {
      ctx.clearRect(0, 0, W, H)
      drawGrid()
      drawPolygon(progress)
      if (progress < 1) {
        progress = Math.min(1, progress + 0.035)
        raf = requestAnimationFrame(render)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          render()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(c)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      id="radarCanvas"
      width="260"
      height="260"
      className="mx-auto"
      role="img"
      aria-label="Skill radar chart: Backend 82%, Frontend 88%, Database 75%, Tools 72%, OOP/Architecture 80%, DevOps 64%"
    ></canvas>
  )
}