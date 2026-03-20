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
      receiver: 'Nome do recebedor',
      invoice: 'Nota fiscal (PDF)',
      proof: 'Comprovante de entrega',
      viewButton: 'Visualizar',
      downloadButton: 'Download',
      noInvoice: 'Sem nota em PDF disponivel',
      noProof: 'Sem comprovante de entrega',
    },
    es: {
      title: 'Envío',
      delivery: 'Entrega prevista',
      receiver: 'Nombre del receptor',
      invoice: 'Factura (PDF)',
      proof: 'Comprobante de entrega',
      viewButton: 'Ver',
      downloadButton: 'Descargar',
      noInvoice: 'Sin factura PDF disponible',
      noProof: 'Sin comprobante de entrega',
    },
    en: {
      title: 'Shipment',
      delivery: 'Estimated delivery',
      receiver: 'Receiver name',
      invoice: 'Invoice (PDF)',
      proof: 'Delivery proof',
      viewButton: 'View',
      downloadButton: 'Download',
      noInvoice: 'No invoice PDF available',
      noProof: 'No delivery proof',
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
          <p>{labels[language].receiver}</p>
          <strong>{shipment.recebedor}</strong>
        </div>
        <div>
          <p>{labels[language].invoice}</p>
          {shipment.notaFiscalUrl ? (
            <div className={styles.linkActions}>
              <a className={styles.downloadLink} href={shipment.notaFiscalUrl} target="_blank" rel="noreferrer">
                {labels[language].viewButton}
              </a>
              <a className={styles.downloadLinkSecondary} href={shipment.notaFiscalUrl} download>
                {labels[language].downloadButton}
              </a>
            </div>
          ) : (
            <strong>{labels[language].noInvoice}</strong>
          )}
        </div>
        <div>
          <p>{labels[language].proof}</p>
          {shipment.comprovanteUrl ? (
            <div className={styles.linkActions}>
              <a className={styles.downloadLink} href={shipment.comprovanteUrl} target="_blank" rel="noreferrer">
                {labels[language].viewButton}
              </a>
              <a className={styles.downloadLinkSecondary} href={shipment.comprovanteUrl} download>
                {labels[language].downloadButton}
              </a>
            </div>
          ) : (
            <strong>{labels[language].noProof}</strong>
          )}
        </div>
      </div>
    </article>
  )
}

export default TrackingSummary
