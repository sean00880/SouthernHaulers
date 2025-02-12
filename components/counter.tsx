"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  delay?: number
}

export function Counter({ end, duration = 2000, suffix = "", prefix = "", delay = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        let start = 0
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start > end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
        return () => clearInterval(timer)
      }, delay)
      
      return () => clearTimeout(timeout)
    }
  }, [end, duration, inView])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
