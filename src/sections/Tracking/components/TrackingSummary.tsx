import type { Shipment } from '../trackingTypes'
import styles from '../Tracking.module.css'
import { useLanguage } from '../../../i18n/LanguageContext'

type TrackingSummaryProps = {
  shipment: Shipment
}

function TrackingSummary({ shipment }: TrackingSummaryProps) {
  const { language } = useLanguage()
  const labels = {
    pt: {
      title: 'Remessa',
      delivery: 'Previsao de entrega',
      origin: 'Origem',
      destination: 'Destino',
      service: 'Tipo de servico',
      payer: 'Cliente pagador',
    },
    es: {
      title: 'Envío',
      delivery: 'Entrega prevista',
      origin: 'Origen',
      destination: 'Destino',
      service: 'Tipo de servicio',
      payer: 'Cliente pagador',
    },
    en: {
      title: 'Shipment',
      delivery: 'Estimated delivery',
      origin: 'Origin',
      destination: 'Destination',
      service: 'Service type',
      payer: 'Paying customer',
    },
  } as const

  return (
    <article className={styles.summaryCard}>
      <div className={styles.summaryTop}>
        <h3>
          {labels[language].title} {shipment.codigo}
        </h3>
        <span className={styles.statusBadge}>{shipment.statusAtual}</span>
      </div>

      <div className={styles.summaryGrid}>
        <div>
          <p>{labels[language].delivery}</p>
          <strong>{shipment.previsaoEntrega}</strong>
        </div>
        <div>
          <p>{labels[language].origin}</p>
          <strong>{shipment.origem}</strong>
        </div>
        <div>
          <p>{labels[language].destination}</p>
          <strong>{shipment.destino}</strong>
        </div>
        <div>
          <p>{labels[language].service}</p>
          <strong>{shipment.tipoServico}</strong>
        </div>
        <div>
          <p>{labels[language].payer}</p>
          <strong>{shipment.clientePagador}</strong>
        </div>
      </div>
    </article>
  )
}

export default TrackingSummary
