import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import styles from './Clients.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

type Client = {
  id: number
  name: string
  segment: Record<'pt' | 'es' | 'en', string>
  logoUrl: string
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Grupo Alfa',
    segment: { pt: 'Varejo', es: 'Retail', en: 'Retail' },
    logoUrl: '/logos/grupo-alfa.svg',
  },
  {
    id: 2,
    name: 'TransLog Brasil',
    segment: {
      pt: 'Transporte rodoviário',
      es: 'Transporte por carretera',
      en: 'Road transportation',
    },
    logoUrl: '/logos/translog-brasil.svg',
  },
  {
    id: 3,
    name: 'MarketPro',
    segment: { pt: 'E-commerce', es: 'E-commerce', en: 'E-commerce' },
    logoUrl: '/logos/marketpro.svg',
  },
  {
    id: 4,
    name: 'HealthCare SP',
    segment: {
      pt: 'Produtos hospitalares',
      es: 'Productos hospitalarios',
      en: 'Hospital supplies',
    },
    logoUrl: '/logos/healthcare-sp.svg',
  },
  {
    id: 5,
    name: 'FoodMax',
    segment: {
      pt: 'Alimentos e bebidas',
      es: 'Alimentos y bebidas',
      en: 'Food and beverages',
    },
    logoUrl: '/logos/foodmax.svg',
  },
]

const copy = {
  pt: {
    title: 'Principais Clientes',
    subtitle:
      'Atendemos empresas de diferentes segmentos com operações logísticas dedicadas e alto nível de serviço.',
    hint: 'Rolagem automática ativa. Arraste para explorar.',
  },
  es: {
    title: 'Principales Clientes',
    subtitle:
      'Atendemos empresas de diferentes segmentos con operaciones logísticas dedicadas y alto nivel de servicio.',
    hint: 'Desplazamiento automático activo. Arrastre para explorar.',
  },
  en: {
    title: 'Main Clients',
    subtitle:
      'We support companies from different segments with dedicated logistics operations and high service levels.',
    hint: 'Auto-scroll enabled. Drag to explore.',
  },
} as const

function Clients() {
  const { language } = useLanguage()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef<number>(0)
  const dragStartScroll = useRef<number>(0)
  const resumeAutoScrollAt = useRef<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const intervalMs = 16
    const speedPerTick = 0.8

    const intervalId = window.setInterval(() => {
      if (reducedMotion.matches) return
      if (isDragging || isHovering) return
      if (Date.now() < resumeAutoScrollAt.current) return

      const singleLoopWidth = track.scrollWidth / 2
      if (singleLoopWidth <= 0) return

      track.scrollLeft += speedPerTick
      if (track.scrollLeft >= singleLoopWidth) {
        track.scrollLeft = 0
      }
    }, intervalMs)

    return () => window.clearInterval(intervalId)
  }, [isDragging, isHovering])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    setIsDragging(true)
    dragStartX.current = event.clientX
    dragStartScroll.current = track.scrollLeft
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !isDragging) return

    const deltaX = event.clientX - dragStartX.current
    track.scrollLeft = dragStartScroll.current - deltaX
  }

  const onPointerUp = () => {
    setIsDragging(false)
    resumeAutoScrollAt.current = Date.now() + 1200
  }

  return (
    <section id="clientes" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>{copy[language].title}</h2>
          <p>{copy[language].subtitle}</p>
        </header>

        <div className={styles.carousel}>
          <p className={styles.hint}>{copy[language].hint}</p>
          <div
            ref={trackRef}
            className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label="Lista horizontal de clientes"
          >
            {[...clients, ...clients].map((client, index) => (
              <article className={styles.card} key={`${client.id}-${index}`}>
                <div className={styles.logoWrap}>
                  <img src={client.logoUrl} alt={`Logo ${client.name}`} />
                </div>
                <h3>{client.name}</h3>
                <p>{client.segment[language]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
