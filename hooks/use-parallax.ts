import { useEffect, useState } from 'react'

export function useParallax() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Calculate parallax offset (slower scroll speed for parallax effect)
      setOffset(scrollPosition * 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return offset
}