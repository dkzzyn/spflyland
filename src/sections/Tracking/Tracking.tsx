import { useState } from 'react'
import TrackingSearch from './components/TrackingSearch'
import TrackingSummary from './components/TrackingSummary'
import TrackingTimeline from './components/TrackingTimeline'
import { fetchTrackingByQuery } from './trackingApi'
import { searchTracking } from './mockTracking'
import type { TrackingQuery, TrackingResponse } from './trackingTypes'
import styles from './Tracking.module.css'
import { useLanguage } from '../../i18n/LanguageContext'

const copy = {
  pt: {
    title: 'Rastreamento SPFLY',
    subtitle:
      'Acompanhe sua carga em tempo real informando o codigo de rastreio ou CPF/CNPJ.',
    required: 'Informe um valor para consultar o rastreio.',
    notFound:
      'Nao encontramos nenhuma remessa para esses dados. Confira o codigo ou fale com nosso atendimento.',
    fallback:
      'Nao foi possivel consultar a API agora. Exibindo dados de demonstracao.',
    unavailable:
      'Nao foi possivel consultar a API de rastreamento no momento. Tente novamente em instantes.',
  },
  es: {
    title: 'Seguimiento SPFLY',
    subtitle:
      'Siga su carga en tiempo real informando el código de seguimiento o CPF/CNPJ.',
    required: 'Ingrese un valor para consultar el seguimiento.',
    notFound:
      'No encontramos envíos con estos datos. Verifique el código o contacte nuestro equipo.',
    fallback:
      'No fue posible consultar la API ahora. Mostrando datos de demostración.',
    unavailable:
      'No fue posible consultar la API de seguimiento por ahora. Inténtelo nuevamente.',
  },
  en: {
    title: 'SPFLY Tracking',
    subtitle:
      'Track your shipment in real time by entering tracking code or CPF/CNPJ.',
    required: 'Please provide a value to run tracking.',
    notFound:
      'No shipment found for these details. Check the code or contact our team.',
    fallback:
      'Could not reach API now. Showing demo data.',
    unavailable:
      'Could not query tracking API at this time. Please try again shortly.',
  },
} as const

function Tracking() {
  const { language } = useLanguage()
  const text = copy[language]
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [result, setResult] = useState<TrackingResponse | null>(null)

  const handleSearch = async (query: TrackingQuery) => {
    setIsLoading(true)
    setError('')
    setResult(null)

    if (query.valor.trim() === '') {
      setError(text.required)
      setIsLoading(false)
      return
    }

    try {
      const found = await fetchTrackingByQuery(query)

      if (!found) {
        setError(text.notFound)
        setIsLoading(false)
        return
      }

      setResult(found)
      setIsLoading(false)
    } catch {
      const fallback = searchTracking(query)
      if (fallback) {
        setResult(fallback)
        setError(text.fallback)
      } else {
        setError(text.unavailable)
      }
      setIsLoading(false)
    }
  }

  return (
    <section id="rastreamento" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>{text.title}</h2>
          <p>{text.subtitle}</p>
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
