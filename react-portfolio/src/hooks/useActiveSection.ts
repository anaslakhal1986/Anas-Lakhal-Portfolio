import { useEffect, useRef, useState } from 'react'

export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  const idsRef = useRef(ids)
  idsRef.current = ids

  useEffect(() => {
    const offset = 140

    const onScroll = () => {
      let current = ''
      for (const id of idsRef.current) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}
