import type { TrackingQuery, TrackingResponse, TrackingSearchType } from './trackingTypes'

type MockRecord = TrackingResponse & {
  lookup: {
    tipo: TrackingSearchType
    documentType: TrackingQuery['documentType']
    cnpj: string
    documento: string
  }
}

const records: MockRecord[] = [
  {
    lookup: {
      tipo: 'destinatario',
      documentType: 'nfe',
      cnpj: '12345678000195',
      documento: '12345',
    },
    shipment: {
      codigo: '12345',
      statusAtual: 'Em rota de entrega',
      previsaoEntrega: '10/03/2026',
      recebedor: 'Joao Silva',
      notaFiscalUrl: 'https://example.com/nota/12345.pdf',
      comprovanteUrl: null,
    },
    events: [
      {
        dataHora: '09/03/2026 08:42',
        status: 'Em rota de entrega',
        local: 'Codigo 103',
        codigo: 103,
      },
      {
        dataHora: '09/03/2026 06:15',
        status: 'Em transito',
        local: 'Codigo 125',
        codigo: 125,
      },
      {
        dataHora: '08/03/2026 19:30',
        status: 'Pedido enviado',
        local: 'Codigo 0',
        codigo: 0,
      },
    ],
  },
  {
    lookup: {
      tipo: 'pagador',
      documentType: 'minuta',
      cnpj: '44556677000188',
      documento: '67890',
    },
    shipment: {
      codigo: '67890',
      statusAtual: 'Entregue',
      previsaoEntrega: '09/03/2026',
      recebedor: 'Maria Souza',
      notaFiscalUrl: 'https://example.com/nota/67890.pdf',
      comprovanteUrl: 'https://example.com/comprovante/67890.pdf',
    },
    events: [
      {
        dataHora: '09/03/2026 14:12',
        status: 'Entregue',
        local: 'Codigo 1',
        codigo: 1,
      },
      {
        dataHora: '09/03/2026 10:40',
        status: 'Em rota de entrega',
        local: 'Codigo 103',
        codigo: 103,
      },
      {
        dataHora: '08/03/2026 21:05',
        status: 'Em transito',
        local: 'Codigo 125',
        codigo: 125,
      },
    ],
  },
]

function normalize(value: string) {
  return value.replace(/\W/g, '').toUpperCase()
}

export function searchTracking(query: TrackingQuery): TrackingResponse | null {
  const found = records.find((record) => {
    return (
      record.lookup.tipo === query.tipo &&
      record.lookup.documentType === query.documentType &&
      normalize(record.lookup.cnpj) === normalize(query.cnpj) &&
      normalize(record.lookup.documento) === normalize(query.documento)
    )
  })

  if (!found) return null
  return { shipment: found.shipment, events: found.events }
}
