import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import styles from './ScrollReveal.module.css'

type ScrollRevealProps = {
  children: ReactNode
  delayMs?: number
}

function ScrollReveal({ children, delayMs = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={styles.reveal}
      data-visible={isVisible}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
