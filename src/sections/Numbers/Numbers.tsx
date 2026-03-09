import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './Numbers.module.css'

type Metric = {
  label: string
  target: number
  decimals?: number
  suffix: string
}

const metrics: Metric[] = [
  {
    label: 'Satisfacao do Cliente',
    target: 99.9,
    decimals: 1,
    suffix: '%',
  },
  {
    label: 'Clientes SPFLY',
    target: 80,
    suffix: '+',
  },
  {
    label: 'Entregas Realizadas',
    target: 65000,
    suffix: '+',
  },
]

type CounterValueProps = {
  start: boolean
  target: number
  decimals?: number
  durationMs?: number
}

function CounterValue({
  start,
  target,
  decimals = 0,
  durationMs = 1600,
}: CounterValueProps) {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    if (!start) return

    let frameId = 0
    const startedAt = performance.now()

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startedAt) / durationMs, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setValue(target * easedProgress)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [start, target, durationMs])

  return (
    <>
      {new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)}
    </>
  )
}

function Numbers() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const renderAnimatedText = (text: string, baseDelayMs = 0) =>
    text.split('').map((char, index) => (
      <span
        key={`${text}-${index}`}
        className={styles.char}
        style={
          {
            '--char-index': index,
            '--base-delay': `${baseDelayMs}ms`,
          } as CSSProperties
        }
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Nossos numeros SPFLY"
      data-visible={hasEnteredView}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>{renderAnimatedText('Nossos Numeros SPFLY')}</h2>
        </header>

        <div className={styles.grid}>
          {metrics.map((item, index) => (
            <article key={item.label} className={styles.card}>
              <p className={styles.label}>
                {renderAnimatedText(item.label, 120 + index * 90)}
              </p>
              <p className={styles.value}>
                <CounterValue
                  start={hasEnteredView}
                  target={item.target}
                  decimals={item.decimals}
                />
                <span>{item.suffix}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Numbers
