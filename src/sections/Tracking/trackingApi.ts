import type { TrackingQuery, TrackingResponse } from './trackingTypes'

type ApiComprovante = {
  url?: string
  href?: string
  arquivo?: string
}

type ApiOcorrencia = {
  tipo?: string
  numero?: string
  status?: string
  data?: string
  obs?: string
  descricao?: string
  usuario?: string
  cte_aut_data?: string
  entrega_nome?: string
  entrega_grau?: string
  data_entrega?: string
  hora_entrega?: string
  nf_numero?: string
  nota_url?: string
  danfe_url?: string
  comprovante_url?: string
  anexos?: ApiComprovante[]
  comprovante?: ApiComprovante[]
}

type ApiDocumentoProcessado = {
  status?: number
  message?: string
  documento?: string
  dados?: ApiOcorrencia[]
  prev_entrega?: string
}

type ApiTrackingDataError = {
  message?: string
}

type ApiTrackingResponseBase = {
  message?: string
  status?: number
}

type ConsultaOcorrenciasCnpjNfResponse = ApiTrackingResponseBase & {
  data?: ApiDocumentoProcessado[]
}

type ApiTrackingResponseWithDataMessage = ApiTrackingResponseBase & {
  data?: ApiTrackingDataError
}

type ApiTrackingResponse = ConsultaOcorrenciasCnpjNfResponse | ApiTrackingResponseWithDataMessage

type ApiTrackingErrorPayload = {
  data?: { message?: string } | string[]
}

type LegacyTrackingOccurrence = {
  data?: string
  hora?: string
  evento?: string
  codigo?: number | string
}

type LegacyTrackingData = {
  previsao_entrega?: string
  recebedor?: string
  comprovante_status?: number
  comprovante?: string
  ocorrencias?: LegacyTrackingOccurrence[]
}

type LegacyTrackingResponse = {
  status?: number
  dados?: LegacyTrackingData
}

function normalizeDigits(value: string) {
  return value.replace(/[^\d]+/g, '')
}

function formatDate(date: string | undefined) {
  if (!date) return '-'
  const withSpace = date.trim().replace('T', ' ')
  const [datePart, timePart] = withSpace.split(' ')
  const dateParts = (datePart || '').split('-')
  if (dateParts.length !== 3) return date
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
  return timePart ? `${formattedDate} ${timePart}` : formattedDate
}

function mapStatusByCode(code: number | null) {
  if (code === 1) return 'Entregue'
  if (code === 103) return 'Em rota de entrega'
  if (code === 125) return 'Em transito'
  if (code === 0) return 'Pedido enviado'
  return 'Em processamento'
}

function mapSearchType(tipo: TrackingQuery['tipo']) {
  if (tipo === 'destinatario') return 'Destinatário'
  if (tipo === 'pagador') return 'Pagador'
  return 'Remetente'
}

function resolveApiEventStatus(item: ApiOcorrencia) {
  if (item.descricao && item.descricao.trim() !== '') return item.descricao
  if (item.obs && item.obs.trim() !== '') return item.obs
  if (item.status && item.status.trim() !== '') return `Status ${item.status}`
  return 'Atualizacao de rastreio'
}

function resolveApiEventLocation(item: ApiOcorrencia) {
  const entregaInfo = [item.entrega_nome, item.entrega_grau].filter(Boolean).join(' - ')
  if (entregaInfo) return entregaInfo
  if (item.usuario) return `Usuario: ${item.usuario}`
  if (item.tipo) return item.tipo
  return 'Local nao informado'
}

function resolveComprovanteFromOccurrences(items: ApiOcorrencia[]) {
  for (const item of items) {
    const url =
      item.comprovante_url ||
      item.comprovante?.[0]?.url ||
      item.comprovante?.[0]?.href ||
      item.comprovante?.[0]?.arquivo ||
      item.anexos?.[0]?.url ||
      item.anexos?.[0]?.href
    if (url) return url
  }
  return null
}

function buildNotaFiscalUrl(query: TrackingQuery, documento: ApiDocumentoProcessado, items: ApiOcorrencia[]) {
  const firstOccurrence = items[0]
  const explicitUrl =
    firstOccurrence?.nota_url ||
    firstOccurrence?.danfe_url ||
    firstOccurrence?.anexos?.[0]?.url ||
    null
  if (explicitUrl) return explicitUrl

  const documentId = documento.documento || query.documento
  const normalizedDocumentId = normalizeDigits(documentId)
  if (query.documentType !== 'nfe' || normalizedDocumentId.length < 44) return null

  const template = import.meta.env.VITE_TRACKING_NOTE_PDF_URL_TEMPLATE
  if (!template) return null

  return template.replace('{chave}', normalizedDocumentId)
}

function toUnixTime(rawDate: string | undefined, rawTime?: string) {
  if (!rawDate) return 0
  const normalizedDate = rawDate.trim().replace(' ', 'T')
  const withTime = rawTime && !normalizedDate.includes('T') ? `${normalizedDate}T${rawTime}` : normalizedDate
  const parsed = Date.parse(withTime)
  return Number.isNaN(parsed) ? 0 : parsed
}

function mapModernTracking(query: TrackingQuery, documento: ApiDocumentoProcessado): TrackingResponse {
  const ocorrencias = Array.isArray(documento.dados) ? documento.dados : []
  const orderedOccurrences = [...ocorrencias].sort((a, b) => (b.data ?? '').localeCompare(a.data ?? ''))
  const comprovanteUrl = resolveComprovanteFromOccurrences(orderedOccurrences)
  const notaFiscalUrl = buildNotaFiscalUrl(query, documento, orderedOccurrences)
  const recebedor = orderedOccurrences.find((item) => item.entrega_nome)?.entrega_nome || '--'
  const entregaRaw = orderedOccurrences.find((item) => item.data_entrega)?.data_entrega
  const previsaoEntregaRaw = documento.prev_entrega || entregaRaw
  const previsaoEntrega = previsaoEntregaRaw ? formatDate(previsaoEntregaRaw).split(' ')[0] : '--/--/----'

  const apiEvents = orderedOccurrences.map((item) => {
    const parsedCode = Number(item.status)
    const code = Number.isNaN(parsedCode) ? undefined : parsedCode
    return {
      dataHora: formatDate(item.data),
      status: resolveApiEventStatus(item),
      local: resolveApiEventLocation(item),
      observacao: item.obs,
      codigo: code,
      _sortTime: toUnixTime(item.data),
    }
  })

  const firstOccurrence = orderedOccurrences[0]
  const syntheticEvents = []

  if (firstOccurrence?.cte_aut_data) {
    syntheticEvents.push({
      dataHora: formatDate(firstOccurrence.cte_aut_data),
      status: 'CTE autorizado',
      local: firstOccurrence.usuario || 'SEFAZ',
      observacao: firstOccurrence.obs,
      codigo: undefined,
      _sortTime: toUnixTime(firstOccurrence.cte_aut_data),
    })
  }

  if (documento.prev_entrega) {
    syntheticEvents.push({
      dataHora: formatDate(documento.prev_entrega),
      status: 'Previsao de entrega',
      local: 'Rota de distribuicao',
      observacao: undefined,
      codigo: undefined,
      _sortTime: toUnixTime(documento.prev_entrega),
    })
  }

  if (firstOccurrence?.data_entrega) {
    syntheticEvents.push({
      dataHora: formatDate(
        `${firstOccurrence.data_entrega}${firstOccurrence.hora_entrega ? ` ${firstOccurrence.hora_entrega}` : ''}`,
      ),
      status: 'Entrega registrada',
      local: firstOccurrence.entrega_nome || 'Recebedor nao informado',
      observacao: firstOccurrence.entrega_grau ? `Grau de parentesco: ${firstOccurrence.entrega_grau}` : undefined,
      codigo: 1,
      _sortTime: toUnixTime(firstOccurrence.data_entrega, firstOccurrence.hora_entrega),
    })
  }

  const deduped = [...apiEvents, ...syntheticEvents].reduce<
    Array<{
      dataHora: string
      status: string
      local: string
      observacao?: string
      codigo?: number
      _sortTime: number
    }>
  >((acc, event) => {
    const key = `${event.dataHora}__${event.status}__${event.local}`
    if (!acc.some((existing) => `${existing.dataHora}__${existing.status}__${existing.local}` === key)) {
      acc.push(event)
    }
    return acc
  }, [])

  const events = deduped
    .sort((a, b) => b._sortTime - a._sortTime)
    .map(({ _sortTime, ...event }) => event)

  const statusAtual = events[0]?.status || (documento.message ? documento.message : 'Em processamento')

  return {
    shipment: {
      codigo: documento.documento || query.documento,
      statusAtual,
      previsaoEntrega,
      recebedor,
      notaFiscalUrl,
      comprovanteUrl,
    },
    events,
  }
}

function mapLegacyTracking(query: TrackingQuery, data: LegacyTrackingData): TrackingResponse {
  const occurrences = Array.isArray(data.ocorrencias) ? data.ocorrencias : []
  const currentCode = Number(occurrences[0]?.codigo)
  const validCode = Number.isNaN(currentCode) ? null : currentCode

  const events = occurrences.map((occurrence) => {
    const code = Number(occurrence.codigo)
    const numericCode = Number.isNaN(code) ? undefined : code
    return {
      dataHora: `${formatDate(occurrence.data)}${occurrence.hora ? ` - ${occurrence.hora}` : ''}`,
      status: occurrence.evento?.trim() || mapStatusByCode(numericCode ?? null),
      local: `Codigo ${numericCode ?? '--'}`,
      codigo: numericCode,
    }
  })

  return {
    shipment: {
      codigo: query.documento,
      statusAtual: mapStatusByCode(validCode),
      previsaoEntrega: data.previsao_entrega || '--/--/----',
      recebedor: data.recebedor || '--',
      notaFiscalUrl: null,
      comprovanteUrl: data.comprovante_status === 1 && data.comprovante ? data.comprovante : null,
    },
    events,
  }
}

async function fetchFromModernApi(query: TrackingQuery): Promise<TrackingResponse | null> {
  const normalizedDocument = normalizeDigits(query.documento)
  const normalizedCnpj = normalizeDigits(query.cnpj)
  const isNfeKey = query.documentType === 'nfe' && normalizedDocument.length >= 44
  const endpoint =
    query.documentType === 'nfe'
      ? isNfeKey
        ? import.meta.env.VITE_TRACKING_NFE_BY_KEY_API_URL ||
          import.meta.env.VITE_TRACKING_NFE_API_URL ||
          import.meta.env.VITE_TRACKING_API_URL
        : import.meta.env.VITE_TRACKING_NFE_API_URL || import.meta.env.VITE_TRACKING_API_URL
      : import.meta.env.VITE_TRACKING_MINUTA_API_URL
  if (!endpoint) return null

  const token = import.meta.env.VITE_TRACKING_API_TOKEN
  const user = import.meta.env.VITE_TRACKING_API_USER
  const password = import.meta.env.VITE_TRACKING_API_PASSWORD
  const comprovante = import.meta.env.VITE_TRACKING_API_COMPROVANTE || '1'

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (token) headers.TOKEN = token
  if (user) headers.USUARIO = user
  if (password) headers.SENHA = password

  const requestByParams = async (params: Record<string, string>, customEndpoint?: string) => {
    const targetEndpoint = customEndpoint || endpoint
    const url = new URL(targetEndpoint, window.location.origin)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '') url.searchParams.set(key, value)
    })
    url.searchParams.set('comprovante', comprovante)

    // Some API gateways only recognize credentials as query params.
    if (user) url.searchParams.set('usuario', user)
    if (password) url.searchParams.set('senha', password)
    if (token) url.searchParams.set('token', token)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    })

    const responseData = (await response.json().catch(() => null)) as ApiTrackingResponse | null
    const responseDataAsAny = responseData as unknown as ApiTrackingErrorPayload | null
    const dataField = responseDataAsAny?.data
    const responseMessage =
      (Array.isArray(dataField) ? dataField[0] : dataField?.message) || responseData?.message

    if (!response.ok) {
      if (response.status === 404) {
        return { result: null as TrackingResponse | null, message: responseMessage || 'Nenhum resultado encontrado.' }
      }
      throw new Error(`tracking_api_message:${responseMessage || `Erro HTTP ${response.status}`}`)
    }

    if (responseData?.status === 0 && responseData.message) {
      return { result: null as TrackingResponse | null, message: responseData.message }
    }

    const documentos: ApiDocumentoProcessado[] = Array.isArray(responseData?.data)
      ? (responseData.data as ApiDocumentoProcessado[])
      : []
    const firstDocument = documentos.find((documento) => documento.status === 1) || documentos[0]
    if (!firstDocument) return { result: null as TrackingResponse | null, message: 'Nenhum resultado encontrado.' }
    if (firstDocument.status !== 1) {
      return { result: null as TrackingResponse | null, message: firstDocument.message || 'Documento nao encontrado.' }
    }
    return { result: mapModernTracking(query, firstDocument), message: '' }
  }

  if (query.documentType === 'nfe') {
    if (isNfeKey) {
      const keyAttempt = await requestByParams({ chave: normalizedDocument })
      if (keyAttempt.result) return keyAttempt.result
      throw new Error(`tracking_api_message:${keyAttempt.message || 'Nenhum resultado encontrado.'}`)
    }

    const cnpj = normalizedCnpj

    if (cnpj.length !== 11 && cnpj.length !== 14) {
      throw new Error(
        'tracking_api_message:Informe um CPF/CNPJ valido no campo CNPJ ou CPF para consultar por numero da NF.',
      )
    }

    const attempt = await requestByParams({
      documento: cnpj,
      numero: normalizedDocument,
    })
    if (attempt.result) return attempt.result
    throw new Error(`tracking_api_message:${attempt.message || 'Nenhum resultado encontrado.'}`)
  }

  const singleAttempt = await requestByParams(
    { codigo: normalizedDocument },
  )
  if (singleAttempt.result) return singleAttempt.result
  if (singleAttempt.message) throw new Error(`tracking_api_message:${singleAttempt.message}`)
  return null
}

async function fetchFromLegacyApi(query: TrackingQuery): Promise<TrackingResponse | null> {
  const endpoint = import.meta.env.VITE_TRACKING_LEGACY_API_URL
  if (!endpoint) return null

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: new URLSearchParams({
      tipo_rastreamento: mapSearchType(query.tipo),
      cnpj: normalizeDigits(query.cnpj),
      documento: normalizeDigits(query.documento),
    }).toString(),
  })

  if (!response.ok) {
    throw new Error(`tracking_legacy_http_${response.status}`)
  }

  const data = (await response.json()) as LegacyTrackingResponse
  if (data?.status !== 1 || !data.dados) return null
  return mapLegacyTracking(query, data.dados)
}

export async function fetchTrackingByQuery(
  query: TrackingQuery,
): Promise<TrackingResponse | null> {
  const hasModern = Boolean(
    query.documentType === 'nfe'
      ? import.meta.env.VITE_TRACKING_NFE_BY_KEY_API_URL ||
          import.meta.env.VITE_TRACKING_NFE_API_URL ||
          import.meta.env.VITE_TRACKING_API_URL
      : import.meta.env.VITE_TRACKING_MINUTA_API_URL,
  )
  const hasLegacy = Boolean(import.meta.env.VITE_TRACKING_LEGACY_API_URL)
  if (!hasModern && !hasLegacy) {
    throw new Error('tracking_api_missing_url')
  }

  if (hasModern) {
    const modern = await fetchFromModernApi(query)
    if (modern) return modern
    if (!hasLegacy) return null
  }

  return fetchFromLegacyApi(query)
}
