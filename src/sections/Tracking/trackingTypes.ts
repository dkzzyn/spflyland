export type TrackingSearchType =
  | 'codigo'
  | 'destinatario'
  | 'pagador'
  | 'remetente'

export type TrackingQuery = {
  tipo: TrackingSearchType
  valor: string
}

export type Shipment = {
  codigo: string
  statusAtual: string
  previsaoEntrega: string
  origem: string
  destino: string
  tipoServico: string
  clientePagador: string
}

export type TrackingEvent = {
  dataHora: string
  status: string
  local: string
  observacao?: string
}

export type TrackingResponse = {
  shipment: Shipment
  events: TrackingEvent[]
}
