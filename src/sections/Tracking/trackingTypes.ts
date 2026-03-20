export type TrackingSearchType = 'destinatario' | 'pagador' | 'remetente'
export type TrackingDocumentType = 'nfe' | 'minuta'

export type TrackingQuery = {
  tipo: TrackingSearchType
  documentType: TrackingDocumentType
  cnpj: string
  documento: string
}

export type Shipment = {
  codigo: string
  statusAtual: string
  previsaoEntrega: string
  recebedor: string
  notaFiscalUrl: string | null
  comprovanteUrl: string | null
}

export type TrackingEvent = {
  dataHora: string
  status: string
  local: string
  observacao?: string
  codigo?: number
}

export type TrackingResponse = {
  shipment: Shipment
  events: TrackingEvent[]
}
