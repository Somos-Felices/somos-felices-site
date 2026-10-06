export interface EvidenceItem {
  udv_id: string
  source_doc: string
  source_type: string
  content: string
  similarity: number
  ir: number
  metadata?: {
    title?: string
    author?: string | null
    date_or_date_range?: string
    archive_or_repository?: string
    catalogue_reference_id?: string
    language?: string
    governance_status?: string
    provisional?: boolean
    icd_authenticity?: number
    icd_completeness?: number
    icd_consensus?: number
    provenance?: string
    completeness_notes?: string
    chunk_index?: number
    source_version?: string
    [key: string]: unknown
  }
}

export interface TraceData {
  timestamp: string
  category: "A" | "B" | "C" | string
  source_ids?: string[]
  ir_max?: number
  ir_avg?: number
  icr?: number | null
  latency_ms?: number
  llm_invoked?: boolean
  [key: string]: unknown
}

export interface QueryResult {
  category: "A" | "B" | "C" | string
  response: string
  llm_invoked: boolean
  icr: number | null
  evidence: EvidenceItem[]
  trace?: TraceData
}

export interface QueryRequestPayload {
  query: string
  prompt?: string | null
  source_docs?: string[] | null
}
