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
    id: 0,
    name: 'Cielo',
    segment: {
      pt: 'Pagamentos',
      es: 'Pagos',
      en: 'Payments',
    },
    logoUrl: '/img/logo-cielo.svg',
  },
  {
    id: 6,
    name: 'Keune',
    segment: {
      pt: 'Beleza e Cosméticos',
      es: 'Belleza y Cosméticos',
      en: 'Beauty and Cosmetics',
    },
    logoUrl: '/img/logo-keune.png',
  },
  {
    id: 7,
    name: 'RIMOWA',
    segment: {
      pt: 'Bens de Luxo',
      es: 'Bienes de Lujo',
      en: 'Luxury Goods',
    },
    logoUrl: '/img/logo-rimowa%20.png',
  },
  {
    id: 1,
    name: 'Iplace',
    segment: {
      pt: 'Varejo de tecnologia',
      es: 'Retail de tecnologia',
      en: 'Technology retail',
    },
    logoUrl: '/img/logo-iplace.png',
  },
  {
    id: 2,
    name: 'Arezzo',
    segment: {
      pt: 'Moda e calçados',
      es: 'Moda y calzado',
      en: 'Fashion and footwear',
    },
    logoUrl: '/img/logo-arezo.png',
  },
  {
    id: 3,
    name: 'Ferragamo',
    segment: {
      pt: 'Bens de luxo',
      es: 'Bienes de lujo',
      en: 'Luxury goods',
    },
    logoUrl: '/img/logo-ferragamo.png',
  },
  {
    id: 4,
    name: 'Jequiti',
    segment: {
      pt: 'Perfumaria e cosméticos',
      es: 'Perfumería y cosméticos',
      en: 'Perfumery and cosmetics',
    },
    logoUrl: '/img/logo-jequiti.png',
  },
  {
    id: 5,
    name: 'Arklok',
    segment: {
      pt: 'Tecnologia e infraestrutura',
      es: 'Tecnología e infraestructura',
      en: 'Technology and infrastructure',
    },
    logoUrl: '/img/logo-arklok.png',
  },
{
  id: 6,
  name: 'Louis vuitton',
  segment: {
    pt: 'Bens de luxo',
    es: 'Bienes de lujo',
    en: 'Luxury goods',
  },
  logoUrl: '/img/logo-lv.png',
},
]

const copy = {
  pt: {
    title: 'Principais Clientes',
    subtitle:
      'Atendemos empresas de diferentes segmentos com operações logísticas dedicadas e alto nível de serviço.',
    listAriaLabel: 'Lista horizontal de clientes',
  },
  es: {
    title: 'Principales Clientes',
    subtitle:
      'Atendemos a empresas de diferentes segmentos con operaciones logísticas dedicadas y un alto nivel de servicio.',
    listAriaLabel: 'Lista horizontal de clientes',
  },
  en: {
    title: 'Main Clients',
    subtitle:
      'We serve companies across different segments with dedicated logistics operations and high service levels.',
    listAriaLabel: 'Horizontal client list',
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
            aria-label={copy[language].listAriaLabel}
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
