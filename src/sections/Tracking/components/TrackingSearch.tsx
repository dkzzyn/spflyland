import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { TrackingQuery, TrackingSearchType } from '../trackingTypes'
import styles from '../Tracking.module.css'
import { useLanguage } from '../../../i18n/LanguageContext'

type TrackingSearchProps = {
  isLoading: boolean
  onSearch: (query: TrackingQuery) => void
}

const options: { id: TrackingSearchType }[] = [
  { id: 'codigo' },
  { id: 'destinatario' },
  { id: 'pagador' },
  { id: 'remetente' },
]

const copy = {
  pt: {
    labels: {
      codigo: 'Codigo',
      destinatario: 'Destinatario',
      pagador: 'Pagador',
      remetente: 'Remetente',
    },
    placeholders: {
      codigo: 'Digite o codigo de rastreio (ex: SP123456BR)',
      destinatario: 'Digite o CPF/CNPJ do destinatario',
      pagador: 'Digite o CPF/CNPJ do pagador',
      remetente: 'Digite o CPF/CNPJ do remetente',
    },
    searching: 'Buscando...',
    search: 'Buscar',
  },
  es: {
    labels: {
      codigo: 'Código',
      destinatario: 'Destinatario',
      pagador: 'Pagador',
      remetente: 'Remitente',
    },
    placeholders: {
      codigo: 'Ingrese el código de seguimiento (ej: SP123456BR)',
      destinatario: 'Ingrese el CPF/CNPJ del destinatario',
      pagador: 'Ingrese el CPF/CNPJ del pagador',
      remetente: 'Ingrese el CPF/CNPJ del remitente',
    },
    searching: 'Buscando...',
    search: 'Buscar',
  },
  en: {
    labels: {
      codigo: 'Code',
      destinatario: 'Recipient',
      pagador: 'Payer',
      remetente: 'Sender',
    },
    placeholders: {
      codigo: 'Enter tracking code (e.g. SP123456BR)',
      destinatario: 'Enter recipient CPF/CNPJ',
      pagador: 'Enter payer CPF/CNPJ',
      remetente: 'Enter sender CPF/CNPJ',
    },
    searching: 'Searching...',
    search: 'Search',
  },
}

function TrackingSearch({ isLoading, onSearch }: TrackingSearchProps) {
  const { language } = useLanguage()
  const [tipo, setTipo] = useState<TrackingSearchType>('codigo')
  const [valor, setValor] = useState<string>('')

  const placeholder = useMemo(() => copy[language].placeholders[tipo], [tipo, language])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch({ tipo, valor })
  }

  return (
    <div className={styles.searchCard}>
      <div className={styles.searchTabs} role="tablist" aria-label="Tipo de busca">
        {options.map((option) => (
          <button
            type="button"
            key={option.id}
            className={styles.searchTab}
            data-active={option.id === tipo}
            onClick={() => setTipo(option.id)}
          >
            {copy[language].labels[option.id]}
          </button>
        ))}
      </div>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={valor}
          onChange={(event) => setValor(event.target.value)}
          placeholder={placeholder}
          aria-label="Campo de rastreio"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? copy[language].searching : copy[language].search}
        </button>
      </form>
    </div>
  )
}

export default TrackingSearch
