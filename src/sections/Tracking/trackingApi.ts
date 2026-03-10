import type { TrackingQuery, TrackingResponse } from './trackingTypes'

type ApiComprovante = {
  url?: string
}

type ApiOcorrencia = {
  tipo?: string
  numero?: string
  status?: string
  data?: string
  obs?: string
  descricao?: string
  usuario?: string
  entrega_nome?: string
  entrega_rg?: string
  entrega_grau?: string
  data_entrega?: string
  hora_entrega?: string
  comprovante?: ApiComprovante[]
}

type ApiDocumentoProcessado = {
  status?: number
  message?: string
  documento?: string
  dados?: ApiOcorrencia[]
}

type ApiTrackingResponse = {
  message?: string
  status?: number
  data?: ApiDocumentoProcessado[]
}

function resolveEventStatus(item: ApiOcorrencia) {
  if (item.descricao && item.descricao.trim() !== '') return item.descricao
  if (item.obs && item.obs.trim() !== '') return item.obs
  if (item.status && item.status.trim() !== '') return `Status ${item.status}`
  return 'Atualizacao de rastreio'
}

function resolveEventLocation(item: ApiOcorrencia) {
  const entregaInfo = [item.entrega_nome, item.entrega_grau].filter(Boolean).join(' - ')
  if (entregaInfo) return entregaInfo
  if (item.usuario) return `Usuario: ${item.usuario}`
  if (item.tipo) return item.tipo
  return 'Local nao informado'
}

function resolveEventObservation(item: ApiOcorrencia) {
  if (item.comprovante && item.comprovante.length > 0) {
    const firstUrl = item.comprovante[0]?.url
    if (firstUrl) {
      return `Comprovante: ${firstUrl}`
    }
  }
  return item.obs
}

function mapDocumentToTracking(documento: ApiDocumentoProcessado): TrackingResponse {
  const ocorrencias = Array.isArray(documento.dados) ? documento.dados : []
  const orderedOccurrences = [...ocorrencias].sort((a, b) =>
    (b.data ?? '').localeCompare(a.data ?? ''),
  )

  const mappedEvents = orderedOccurrences.map((item) => ({
    dataHora: item.data ?? '-',
    status: resolveEventStatus(item),
    local: resolveEventLocation(item),
    observacao: resolveEventObservation(item),
  }))

  const statusAtual =
    mappedEvents[0]?.status || (documento.message ? documento.message : 'Em processamento')

  return {
    shipment: {
      codigo: documento.documento || '-',
      statusAtual,
      previsaoEntrega: '-',
      origem: '-',
      destino: '-',
      tipoServico: 'MINUTA',
      clientePagador: '-',
    },
    events: mappedEvents,
  }
}

export async function fetchTrackingByQuery(
  query: TrackingQuery,
): Promise<TrackingResponse | null> {
  const endpoint = import.meta.env.VITE_TRACKING_API_URL
  if (!endpoint) {
    throw new Error('tracking_api_missing_url')
  }

  const token = import.meta.env.VITE_TRACKING_API_TOKEN
  const user = import.meta.env.VITE_TRACKING_API_USER
  const password = import.meta.env.VITE_TRACKING_API_PASSWORD
  const comprovante = import.meta.env.VITE_TRACKING_API_COMPROVANTE || '1'

  const url = new URL(endpoint, window.location.origin)
  url.searchParams.set('codigo', query.valor)
  url.searchParams.set('comprovante', comprovante)

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (token) {
    headers.TOKEN = token
  }
  if (user) {
    headers.USUARIO = user
  }
  if (password) {
    headers.SENHA = password
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error(`tracking_api_http_${response.status}`)
  }

  const data = (await response.json()) as ApiTrackingResponse
  const documentos = Array.isArray(data?.data) ? data.data : []

  if (documentos.length === 0) return null
  return mapDocumentToTracking(documentos[0])
}
