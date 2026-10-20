import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-toxic/30 bg-dark-green/80 text-toxic backdrop-blur-md transition-all duration-300 hover:border-toxic/60 hover:shadow-glow ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5">
        ↑
      </span>
    </button>
  )
}