import { useState } from 'react'
import TrackingSearch from './components/TrackingSearch'
import TrackingSummary from './components/TrackingSummary'
import TrackingTimeline from './components/TrackingTimeline'
import { searchTracking } from './mockTracking'
import type { TrackingQuery, TrackingResponse } from './trackingTypes'
import styles from './Tracking.module.css'

function Tracking() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [result, setResult] = useState<TrackingResponse | null>(null)

  const handleSearch = async (query: TrackingQuery) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    await new Promise((resolve) => setTimeout(resolve, 650))
    const found = searchTracking(query)

    if (!found) {
      setError(
        'Nao encontramos nenhuma remessa para esses dados. Confira o codigo ou fale com nosso atendimento.',
      )
      setIsLoading(false)
      return
    }

    setResult(found)
    setIsLoading(false)
  }

  return (
    <section id="rastreamento" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Rastreamento SPFLY</h2>
          <p>
            Acompanhe sua carga em tempo real informando o codigo de rastreio ou
            CPF/CNPJ.
          </p>
        </header>

        <TrackingSearch isLoading={isLoading} onSearch={handleSearch} />

        {error && <p className={styles.error}>{error}</p>}

        {result && (
          <div className={styles.resultGrid}>
            <TrackingSummary shipment={result.shipment} />
            <TrackingTimeline events={result.events} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Tracking
