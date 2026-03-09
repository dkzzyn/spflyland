import type { Shipment } from '../trackingTypes'
import styles from '../Tracking.module.css'

type TrackingSummaryProps = {
  shipment: Shipment
}

function TrackingSummary({ shipment }: TrackingSummaryProps) {
  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryTop}>
        <h3>Remessa {shipment.codigo}</h3>
        <span className={styles.statusBadge}>{shipment.statusAtual}</span>
      </div>

      <div className={styles.summaryGrid}>
        <div>
          <p>Previsao de entrega</p>
          <strong>{shipment.previsaoEntrega}</strong>
        </div>
        <div>
          <p>Origem</p>
          <strong>{shipment.origem}</strong>
        </div>
        <div>
          <p>Destino</p>
          <strong>{shipment.destino}</strong>
        </div>
        <div>
          <p>Tipo de servico</p>
          <strong>{shipment.tipoServico}</strong>
        </div>
        <div>
          <p>Cliente pagador</p>
          <strong>{shipment.clientePagador}</strong>
        </div>
      </div>
    </article>
  )
}

export default TrackingSummary
