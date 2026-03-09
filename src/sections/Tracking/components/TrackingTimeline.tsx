import type { TrackingEvent } from '../trackingTypes'
import styles from '../Tracking.module.css'

type TrackingTimelineProps = {
  events: TrackingEvent[]
}

function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <article className={styles.timelineCard}>
      <h3>Linha do tempo da carga</h3>
      <ol className={styles.timelineList}>
        {events.map((event, index) => (
          <li key={`${event.dataHora}-${event.status}`} className={styles.timelineItem}>
            <div className={styles.timelineMarker} data-active={index === 0} />
            <div className={styles.timelineContent}>
              <p className={styles.timelineDate}>{event.dataHora}</p>
              <h4>{event.status}</h4>
              <p>{event.local}</p>
              {event.observacao && <p>{event.observacao}</p>}
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default TrackingTimeline
