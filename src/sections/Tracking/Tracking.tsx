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
      'Acompanhe sua carga em tempo real por chave NF-e (44 digitos) ou por CNPJ/CPF + numero da nota.',
    required: 'Preencha o documento. Para NF por numero, informe tambem CNPJ/CPF.',
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
      'Siga su carga en tiempo real por clave NF-e (44 digitos) o por CNPJ/CPF + numero de factura.',
    required: 'Complete el documento. Para NF por numero, informe tambien CNPJ/CPF.',
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
      'Track your shipment in real time using NF-e key (44 digits) or CNPJ/CPF + invoice number.',
    required: 'Please provide the document. For invoice number lookup, provide CNPJ/CPF as well.',
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
    if (isLoading) return

    setIsLoading(true)
    setError('')
    setResult(null)

    const numericDocument = query.documento.replace(/[^\d]+/g, '')
    const needsCnpj = query.documentType === 'nfe' && numericDocument.length < 44

    if (query.documento.trim() === '' || (needsCnpj && query.cnpj.trim() === '')) {
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
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : ''
      if (message.startsWith('tracking_api_message:')) {
        setError(message.replace('tracking_api_message:', '').trim())
        setIsLoading(false)
        return
      }

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
