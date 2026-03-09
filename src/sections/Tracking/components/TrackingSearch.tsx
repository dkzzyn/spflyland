import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { TrackingQuery, TrackingSearchType } from '../trackingTypes'
import styles from '../Tracking.module.css'

type TrackingSearchProps = {
  isLoading: boolean
  onSearch: (query: TrackingQuery) => void
}

const options: { id: TrackingSearchType; label: string }[] = [
  { id: 'codigo', label: 'Codigo' },
  { id: 'destinatario', label: 'Destinatario' },
  { id: 'pagador', label: 'Pagador' },
  { id: 'remetente', label: 'Remetente' },
]

const placeholders: Record<TrackingSearchType, string> = {
  codigo: 'Digite o codigo de rastreio (ex: SP123456BR)',
  destinatario: 'Digite o CPF/CNPJ do destinatario',
  pagador: 'Digite o CPF/CNPJ do pagador',
  remetente: 'Digite o CPF/CNPJ do remetente',
}

function TrackingSearch({ isLoading, onSearch }: TrackingSearchProps) {
  const [tipo, setTipo] = useState<TrackingSearchType>('codigo')
  const [valor, setValor] = useState<string>('')

  const placeholder = useMemo(() => placeholders[tipo], [tipo])

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
            {option.label}
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
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  )
}

export default TrackingSearch
