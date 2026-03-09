import type {
  TrackingQuery,
  TrackingResponse,
  TrackingSearchType,
} from './trackingTypes'

type MockRecord = TrackingResponse & {
  lookup: Record<TrackingSearchType, string>
}

const records: MockRecord[] = [
  {
    lookup: {
      codigo: 'SP123456BR',
      destinatario: '12345678000195',
      pagador: '98765432000110',
      remetente: '11122233000144',
    },
    shipment: {
      codigo: 'SP123456BR',
      statusAtual: 'Em rota de entrega',
      previsaoEntrega: '10/03/2026',
      origem: 'Guarulhos - SP',
      destino: 'Campinas - SP',
      tipoServico: 'Distribuicao fracionada',
      clientePagador: 'Grupo Alfa',
    },
    events: [
      {
        dataHora: '09/03/2026 08:42',
        status: 'Em rota de entrega',
        local: 'Campinas - SP',
      },
      {
        dataHora: '09/03/2026 06:15',
        status: 'Em transito',
        local: 'Hub SPFLY Jundiai',
      },
      {
        dataHora: '08/03/2026 19:30',
        status: 'Coletado',
        local: 'Guarulhos - SP',
        observacao: 'Mercadoria conferida e liberada para viagem.',
      },
    ],
  },
  {
    lookup: {
      codigo: 'SP654321BR',
      destinatario: '22334455000166',
      pagador: '44556677000188',
      remetente: '99988877000155',
    },
    shipment: {
      codigo: 'SP654321BR',
      statusAtual: 'Entregue',
      previsaoEntrega: '09/03/2026',
      origem: 'Barueri - SP',
      destino: 'Sao Jose dos Campos - SP',
      tipoServico: 'Entrega dedicada',
      clientePagador: 'HealthCare SP',
    },
    events: [
      {
        dataHora: '09/03/2026 14:12',
        status: 'Entregue',
        local: 'Sao Jose dos Campos - SP',
        observacao: 'Entrega confirmada com assinatura digital.',
      },
      {
        dataHora: '09/03/2026 10:40',
        status: 'Em rota de entrega',
        local: 'Sao Jose dos Campos - SP',
      },
      {
        dataHora: '08/03/2026 21:05',
        status: 'Em transito',
        local: 'Hub SPFLY Vale do Paraiba',
      },
    ],
  },
]

function normalize(value: string) {
  return value.replace(/\W/g, '').toUpperCase()
}

export function searchTracking(query: TrackingQuery): TrackingResponse | null {
  const searchedValue = normalize(query.valor)
  const found = records.find((record) => {
    const recordValue = normalize(record.lookup[query.tipo])
    return recordValue === searchedValue
  })

  if (!found) return null
  return { shipment: found.shipment, events: found.events }
}
