import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './Numbers.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

type Metric = {
  label: Record<'pt' | 'es' | 'en', string>
  target: number
  decimals?: number
  suffix: string
}

const metrics: Metric[] = [
  {
    label: {
      pt: 'Satisfacao do Cliente',
      es: 'Satisfacción del Cliente',
      en: 'Customer Satisfaction',
    },
    target: 99.9,
    decimals: 1,
    suffix: '%',
  },
  {
    label: {
      pt: 'Clientes SPFLY',
      es: 'Clientes SPFLY',
      en: 'SPFLY Clients',
    },
    target: 80,
    suffix: '+',
  },
  {
    label: {
      pt: 'Entregas Realizadas',
      es: 'Entregas Realizadas',
      en: 'Completed Deliveries',
    },
    target: 65000,
    suffix: '+',
  },
]

const titles = {
  pt: 'Nossos Numeros SPFLY',
  es: 'Nuestros Números SPFLY',
  en: 'Our SPFLY Numbers',
} as const

type CounterValueProps = {
  start: boolean
  target: number
  decimals?: number
  durationMs?: number
  locale: string
}

function CounterValue({
  start,
  target,
  decimals = 0,
  durationMs = 1600,
  locale,
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
      {new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)}
    </>
  )
}

const locales = { pt: 'pt-BR', es: 'es-ES', en: 'en-US' } as const


function Numbers() {
  const { language } = useLanguage()
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
          <h2>{renderAnimatedText(titles[language])}</h2>
        </header>

        <div className={styles.grid}>
          {metrics.map((item, index) => (
            <article key={item.label.pt} className={styles.card}>
              <p className={styles.label}>
                {renderAnimatedText(item.label[language], 120 + index * 90)}
              </p>
              <p className={styles.value}>
                <CounterValue
                  start={hasEnteredView}
                  target={item.target}
                  decimals={item.decimals}
                  locale={locales[language]}
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
