import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TrackingDocumentType, TrackingQuery, TrackingSearchType } from '../trackingTypes'
import styles from '../Tracking.module.css'
import { useLanguage } from '../../../i18n/LanguageContext'

type TrackingSearchProps = {
  isLoading: boolean
  onSearch: (query: TrackingQuery) => void
}

const options: { id: TrackingSearchType }[] = [
  { id: 'destinatario' },
  { id: 'pagador' },
  { id: 'remetente' },
]

const documentOptions: { id: TrackingDocumentType }[] = [{ id: 'nfe' }, { id: 'minuta' }]

const copy = {
  pt: {
    labels: {
      destinatario: 'Destinatario',
      pagador: 'Pagador',
      remetente: 'Remetente',
    },
    type: 'Tipo',
    documentType: 'Documento',
    documentTypeLabels: {
      nfe: 'Nota Fiscal (NF-e)',
      minuta: 'Minuta',
    },
    cnpj: 'CNPJ ou CPF',
    documento: 'Nota Fiscal ou Minuta',
    cnpjPlaceholder: 'Digite o CNPJ/CPF',
    documentoPlaceholder: 'Digite chave NF-e (44), numero da NF ou minuta',
    searching: 'Buscando...',
    search: 'Buscar',
  },
  es: {
    labels: {
      destinatario: 'Destinatario',
      pagador: 'Pagador',
      remetente: 'Remitente',
    },
    type: 'Tipo',
    documentType: 'Documento',
    documentTypeLabels: {
      nfe: 'Factura (NF-e)',
      minuta: 'Minuta',
    },
    cnpj: 'CNPJ o CPF',
    documento: 'Factura o minuta',
    cnpjPlaceholder: 'Ingrese CNPJ/CPF',
    documentoPlaceholder: 'Ingrese clave NF-e (44), numero de factura o minuta',
    searching: 'Buscando...',
    search: 'Buscar',
  },
  en: {
    labels: {
      destinatario: 'Recipient',
      pagador: 'Payer',
      remetente: 'Sender',
    },
    type: 'Type',
    documentType: 'Document',
    documentTypeLabels: {
      nfe: 'Invoice (NF-e)',
      minuta: 'Waybill',
    },
    cnpj: 'CNPJ or CPF',
    documento: 'Invoice or waybill',
    cnpjPlaceholder: 'Enter CNPJ/CPF',
    documentoPlaceholder: 'Enter 44-digit NF-e key, invoice number, or waybill',
    searching: 'Searching...',
    search: 'Search',
  },
}

function TrackingSearch({ isLoading, onSearch }: TrackingSearchProps) {
  const { language } = useLanguage()
  const [tipo, setTipo] = useState<TrackingSearchType>('destinatario')
  const [documentType, setDocumentType] = useState<TrackingDocumentType>('nfe')
  const [cnpj, setCnpj] = useState<string>('')
  const [documento, setDocumento] = useState<string>('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch({ tipo, documentType, cnpj, documento })
  }

  return (
    <div className={styles.searchCard}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label className={styles.formField}>
          <span>{copy[language].type}</span>
          <select value={tipo} onChange={(event) => setTipo(event.target.value as TrackingSearchType)}>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {copy[language].labels[option.id]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.formField}>
          <span>{copy[language].documentType}</span>
          <select
            value={documentType}
            onChange={(event) => setDocumentType(event.target.value as TrackingDocumentType)}
          >
            {documentOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {copy[language].documentTypeLabels[option.id]}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.formField}>
          <span>{copy[language].cnpj}</span>
          <input
            type="text"
            value={cnpj}
            onChange={(event) => setCnpj(event.target.value)}
            placeholder={copy[language].cnpjPlaceholder}
            aria-label={copy[language].cnpj}
            required
          />
        </label>

        <label className={styles.formField}>
          <span>{copy[language].documento}</span>
          <input
            type="text"
            value={documento}
            onChange={(event) => setDocumento(event.target.value)}
            placeholder={copy[language].documentoPlaceholder}
            aria-label={copy[language].documento}
            required
          />
        </label>

        <div className={styles.formButtonWrap}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? copy[language].searching : copy[language].search}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TrackingSearch
