import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import styles from './Clients.module.css'

type Client = {
  id: number
  name: string
  segment: string
  logoUrl: string
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Grupo Alfa',
    segment: 'Varejo',
    logoUrl: '/logos/grupo-alfa.svg',
  },
  {
    id: 2,
    name: 'TransLog Brasil',
    segment: 'Transporte rodoviário',
    logoUrl: '/logos/translog-brasil.svg',
  },
  {
    id: 3,
    name: 'MarketPro',
    segment: 'E-commerce',
    logoUrl: '/logos/marketpro.svg',
  },
  {
    id: 4,
    name: 'HealthCare SP',
    segment: 'Produtos hospitalares',
    logoUrl: '/logos/healthcare-sp.svg',
  },
  {
    id: 5,
    name: 'FoodMax',
    segment: 'Alimentos e bebidas',
    logoUrl: '/logos/foodmax.svg',
  },
]

function Clients() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef<number>(0)
  const dragStartScroll = useRef<number>(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)

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
  }

  return (
    <section id="clientes" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Principais Clientes</h2>
          <p>
            Atendemos empresas de diferentes segmentos com operações logísticas
            dedicadas e alto nível de serviço.
          </p>
        </header>

        <div className={styles.carousel}>
          <p className={styles.hint}>Arraste para o lado para ver mais logos</p>
          <div
            ref={trackRef}
            className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            aria-label="Lista horizontal de clientes"
          >
            {clients.map((client) => (
              <article className={styles.card} key={client.id}>
                <div className={styles.logoWrap}>
                  <img src={client.logoUrl} alt={`Logo ${client.name}`} />
                </div>
                <h3>{client.name}</h3>
                <p>{client.segment}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
