import type { TrackingEvent } from '../trackingTypes'
import styles from '../Tracking.module.css'
import { useLanguage } from '../../../i18n/LanguageContext'

type TrackingTimelineProps = {
  events: TrackingEvent[]
}

function TrackingTimeline({ events }: TrackingTimelineProps) {
  const { language } = useLanguage()
  const title = {
    pt: 'Linha do tempo da carga',
    es: 'Línea de tiempo de la carga',
    en: 'Shipment timeline',
  } as const

  const isDeliveryRegisteredEvent = (event: TrackingEvent) => {
    const normalizedStatus = event.status.toLowerCase()
    return normalizedStatus.includes('entrega registrada')
  }

  const deliveredHighlightIndex = events.findIndex(isDeliveryRegisteredEvent)

  return (
    <article className={styles.timelineCard}>
      <h3>{title[language]}</h3>
      <ol className={styles.timelineList}>
        {events.map((event, index) => {
          const isDelivered = deliveredHighlightIndex !== -1 && index === deliveredHighlightIndex
          return (
            <li
              key={`${event.dataHora}-${event.status}`}
              className={styles.timelineItem}
              data-delivered={isDelivered}
            >
              <div
                className={styles.timelineMarker}
                data-active={index === 0}
                data-delivered={isDelivered}
              />
              <div className={styles.timelineContent}>
                <p className={styles.timelineDate}>{event.dataHora}</p>
                <h4>{event.status}</h4>
                <p>{event.local}</p>
                {event.observacao && <p>{event.observacao}</p>}
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default TrackingTimeline
