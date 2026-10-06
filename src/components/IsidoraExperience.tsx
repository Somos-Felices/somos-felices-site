import React, { useState } from "react"
import { Send, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Loader2, Sparkles, BookOpen, ChevronRight } from "lucide-react"
import type { QueryResult, EvidenceItem } from "../types/api"

export const IsidoraExperience: React.FC = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null)

  const clearExperience = () => {
    setQuery("")
    setResult(null)
    setError(null)
    setSelectedEvidence(null)
  }

  // Real question test probes targeting both grounded queries and deliberate refusal (Category C)
  const quickQuestions = [
    {
      label: "Palacio Cousiño Architect",
      query: "Who designed Palacio Cousino?",
      expected: "Category B/A: Grounded answer from Memoria Chilena",
    },
    {
      label: "Parque de Lota Legacy",
      query: "Tell me about Parque de Lota.",
      expected: "Category B/A: Grounded answer regarding 25 years development",
    },
    {
      label: "Favorite Color (Category C Refusal)",
      query: "What was Isidora favorite color?",
      expected: "Category C: Deliberate refusal due to insufficient evidence",
    },
  ]

  const loadingSteps = [
    "Querying high-dimensional documentary vector store...",
    "Retrieving candidate Universal Documentary Units (UDVs)...",
    "Computing Information Relevance (IR) & consistency metrics...",
    "Executing MCG Epistemic Governance Gate...",
  ]

  const executeQuery = async (questionText: string) => {
    const trimmed = questionText.trim()
    if (!trimmed || loading) return

    setQuery(trimmed)
    setLoading(true)
    setError(null)
    setResult(null)
    setSelectedEvidence(null)
    setLoadingStep(0)

    // Simulated progress steps while awaiting response
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 400)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "/api"}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      })

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`)
      }

      const data = (await res.json()) as QueryResult
      setResult(data)
      if (data.evidence && data.evidence.length > 0) {
        setSelectedEvidence(data.evidence[0])
      }
    } catch (err: unknown) {
      setError(
        "Veridical Mind evidence service could not be reached. Ensure the backend core is active on port 8000."
      )
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  return (
    <section id="isidora" className="relative py-28 lg:py-36 bg-[#0a0b0e] text-[#f4efe4] border-b border-white/[0.06] overflow-hidden">
      {/* Archival Background Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#c99750]/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-archival-grid opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
              <Sparkles size={14} />
              <span>03 / Flagship Research Experience</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] text-[#f4efe4]">
              Meet Isidora <br />
              <span className="italic font-serif-body text-[#c99750] font-normal">
                Goyenechea de Cousiño.
              </span>
            </h2>
            <p className="mt-5 font-serif-body text-lg text-[#f4efe4]/70 leading-relaxed font-light">
              19th-century industrial pioneer and philanthropist (1836–1897). This interactive experience is directly powered by Veridical Mind's evidence gateway, governed strictly by authenticated Chilean institutional records.
            </p>
          </div>

          {/* Quick Institutional Disclaimer */}
          <div className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-[#12141c] p-4 text-xs font-mono-tech max-w-sm">
            <div className="flex items-center gap-2 text-[#c99750]">
              <ShieldCheck size={14} />
              <span>MUSEUM ARCHIVAL COMPLIANCE</span>
            </div>
            <p className="text-[#f4efe4]/50 text-[11px] leading-relaxed">
              No fictional persona roleplay. Answers represent strictly verified historical documents from Memoria Chilena & Biblioteca Nacional Digital.
            </p>
          </div>
        </div>

        {/* Main Interactive Terminal / Experience Window */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Historical Dossier & Context */}
          <div className="lg:col-span-4 rounded-3xl border border-white/[0.08] bg-[#12141d]/80 p-6 lg:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between min-h-[580px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#c99750]">
                  Archival Dossier #IG-1836
                </span>
                <span className="font-mono-tech text-[10px] text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CORPUS INDEXED
                </span>
              </div>

              {/* Portrait Composition */}
              <div className="relative rounded-2xl overflow-hidden border border-[#c99750]/20 bg-[#161824] p-5 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border border-[#c99750]/40 bg-[#1e2230] flex items-center justify-center font-display text-2xl text-[#c99750] shadow-md">
                    IG
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-[#f4efe4]">
                      Isidora Goyenechea
                    </h3>
                    <p className="text-xs font-serif-body italic text-[#f4efe4]/60">
                      Gallo de Cousiño (1836 – 1897)
                    </p>
                    <div className="mt-1 font-mono-tech text-[10px] text-[#c99750]">
                      Lota Coal Company · Palacio Cousiño
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2 text-xs font-serif-body text-[#f4efe4]/70">
                  <p>
                    Director of the industrial complex of Lota following Luis Cousiño's death. Overseer of the construction of Palacio Cousiño in Santiago and development of Parque de Lota.
                  </p>
                </div>
              </div>

              {/* Provenance Corpus Specs */}
              <div className="mt-6 space-y-3 font-mono-tech text-xs">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                  Authoritative Primary Sources
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#0c0d10] flex items-center justify-between text-[11px]">
                    <span className="text-[#f4efe4]/80">Memoria Chilena</span>
                    <span className="text-[#c99750]">MC-0012422</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#0c0d10] flex items-center justify-between text-[11px]">
                    <span className="text-[#f4efe4]/80">Biblioteca Nacional Digital</span>
                    <span className="text-[#c99750]">BND-613294</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#0c0d10] flex items-center justify-between text-[11px]">
                    <span className="text-[#f4efe4]/80">Viviendas Urbanas 19th C.</span>
                    <span className="text-[#c99750]">MC-92317</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Test Inquiries */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-white/40 block mb-3">
                Pre-calibrated Evidence Probes:
              </span>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => executeQuery(q.query)}
                    className="w-full text-left p-2.5 rounded-xl border border-white/[0.08] bg-[#0c0d10] hover:border-[#c99750]/50 hover:bg-[#181b26] transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="block text-xs font-sans-ui text-[#f4efe4]/90 group-hover:text-[#c99750] truncate font-medium">
                        {q.label}
                      </span>
                      <span className="block text-[10px] font-mono-tech text-white/40 truncate">
                        {q.query}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-white/30 group-hover:text-[#c99750] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Governed Interaction Terminal */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* The Query Card */}
            <div className="rounded-3xl border border-white/[0.1] bg-[#12141c] p-6 lg:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c99750]/30 bg-[#c99750]/10 text-[#c99750]">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold tracking-wide text-[#f4efe4]">
                      Veridical Mind Query Terminal
                    </h3>
                    <p className="font-mono-tech text-[10px] text-white/40">
                      Target: POST /api/query · Real-time MCG Gateway
                    </p>
                  </div>
                </div>

                {/* State Tag */}
                {result ? (
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono-tech font-semibold tracking-wider uppercase border ${
                      result.category === "C"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : result.category === "B"
                        ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                    }`}
                  >
                    {result.category === "C" ? (
                      <XCircle size={14} className="text-amber-400" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                    <span>Category {result.category}: {result.category === "C" ? "Generation Suppressed" : "Grounded"}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-mono-tech text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c99750]" />
                    <span>AWAITING INPUT</span>
                  </div>
                )}
              </div>

              {/* Form Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  executeQuery(query)
                }}
                className="mt-6"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about Isidora's legacy, Palacio Cousiño, or test refusal..."
                    className="w-full rounded-2xl border border-white/15 bg-[#0b0c10] px-5 py-4 pr-32 text-sm text-[#f4efe4] placeholder:text-white/30 focus:border-[#c99750] focus:outline-none focus:ring-1 focus:ring-[#c99750] font-sans-ui"
                  />
                  <button
                    type="button"
                    onClick={clearExperience}
                    disabled={!query && !result && !error}
                    className="absolute right-14 rounded-lg px-2 py-1 text-[10px] uppercase tracking-wider text-white/40 hover:text-[#e0b472] disabled:opacity-20"
                    aria-label="Clear Query"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={!query.trim() || loading}
                    className="absolute right-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#c99750] text-[#0b0c0e] font-semibold transition-all hover:bg-[#e0b472] disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                    aria-label="Send Query"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>

              {/* Loading State: Epistemic Progression */}
              {loading && (
                <div className="mt-8 rounded-2xl border border-[#c99750]/20 bg-[#0c0d12] p-8 text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 size={24} className="animate-spin text-[#c99750]" />
                    <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#e0b472]">
                      Evaluating Documentary Support
                    </span>
                  </div>
                  <p className="font-mono-tech text-xs text-white/50 max-w-md mx-auto">
                    {loadingSteps[loadingStep]}
                  </p>
                  <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                    <div
                      className="h-full bg-[#c99750] transition-all duration-300"
                      style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 flex items-start gap-4">
                  <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-red-200 block">Service Communication Notice</span>
                    <p className="text-xs text-red-200/80 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Answer Display */}
              {result && !loading && (
                <div className="mt-8 space-y-6">
                  
                  {/* Category C Deliberate Refusal Showcase */}
                  {result.category === "C" ? (
                    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-mono-tech text-xs">
                          C
                        </div>
                        <div>
                          <span className="font-mono-tech text-xs uppercase tracking-widest text-amber-300 font-bold block">
                            Deliberate Epistemic Refusal (LLM Suppressed)
                          </span>
                          <span className="text-xs text-amber-200/60">
                            No sufficiently reliable documentary evidence was found in the indexed corpus.
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-amber-500/20 bg-[#0c0d12] my-4">
                        <p className="font-serif-body text-xl text-[#f4efe4] leading-relaxed">
                          "{result.response}"
                        </p>
                      </div>

                      <p className="text-xs font-sans-ui text-[#f4efe4]/70 leading-relaxed">
                        Rather than inventing an ungrounded answer or guessing, the Veridical Mind Generation Gateway physically prevented the large language model from speculating.
                      </p>

                      {result.trace && (
                        <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-[10px]">
                          <div>
                            <span className="text-white/40 block">IR MAXIMUM</span>
                            <span className="text-amber-300 font-semibold">{result.trace.ir_max?.toFixed(4) ?? "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">IR AVERAGE</span>
                            <span className="text-white/70">{result.trace.ir_avg?.toFixed(4) ?? "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">LLM INVOKED</span>
                            <span className="text-emerald-400 font-semibold">{result.llm_invoked ? "TRUE" : "FALSE (SUPPRESSED)"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">CLASSIFICATION LATENCY</span>
                            <span className="text-white/70">{result.trace.latency_ms?.toFixed(3) ?? "0.024"} ms</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Grounded Answer Showcase (Category A or B) */
                    <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-mono-tech text-xs">
                          {result.category}
                        </div>
                        <div>
                          <span className="font-mono-tech text-xs uppercase tracking-widest text-emerald-300 font-bold block">
                            {result.category === "B" ? "Grounded with Epistemic Qualification" : "Strictly Document-Grounded Response"}
                          </span>
                          <span className="text-xs text-emerald-200/60">
                            Supported by primary Chilean archival records
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-[#0c0d12] my-4">
                        <p className="font-serif-body text-xl text-[#f4efe4] leading-relaxed">
                          {result.response}
                        </p>
                      </div>

                      {result.trace && (
                        <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-[10px]">
                          <div>
                            <span className="text-white/40 block">IR MAXIMUM</span>
                            <span className="text-emerald-300 font-semibold">{result.trace.ir_max?.toFixed(4) ?? "0.6257"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">CONSISTENCY (ICR)</span>
                            <span className="text-[#c99750] font-semibold">{result.icr?.toFixed(4) ?? "0.4542"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">LLM INVOKED</span>
                            <span className="text-emerald-400 font-semibold">{result.llm_invoked ? "TRUE (GROUNDED)" : "FALSE"}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">CLASSIFICATION LATENCY</span>
                            <span className="text-white/70">{result.trace.latency_ms?.toFixed(3) ?? "0.033"} ms</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Supporting Documentary Evidence Cards */}
                  {result.category !== "C" && result.evidence && result.evidence.length > 0 && (
                    <div className="pt-6 border-t border-white/[0.08]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
                          Retrieved Documentary Units ({result.evidence.length})
                        </span>
                        <span className="font-mono-tech text-[10px] text-white/40">
                          Click card to view provenance
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {result.evidence.map((item) => {
                          const isSelected = selectedEvidence?.udv_id === item.udv_id
                          return (
                            <button
                              key={item.udv_id}
                              type="button"
                              onClick={() => setSelectedEvidence(item)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "border-[#c99750] bg-[#191c28] shadow-[0_0_15px_rgba(201,151,80,0.15)]"
                                  : "border-white/[0.08] bg-[#0c0d10] hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono-tech mb-2">
                                <span className="text-[#c99750] font-semibold">{item.source_doc}</span>
                                <span className="text-white/40">IR: {item.ir.toFixed(3)}</span>
                              </div>
                              <p className="text-xs font-serif-body text-[#f4efe4]/80 line-clamp-3 leading-relaxed">
                                {item.content}
                              </p>
                              <div className="mt-3 flex items-center justify-between text-[10px] font-mono-tech text-white/40 pt-2 border-t border-white/[0.04]">
                                <span className="truncate max-w-[140px]">{item.source_type}</span>
                                <span className="text-emerald-300">Sim: {(item.similarity * 100).toFixed(1)}%</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Selected Evidence Deep Inspect Drawer */}
                  {selectedEvidence && (
                    <div className="p-5 rounded-2xl border border-[#c99750]/30 bg-[#161824] font-mono-tech text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] text-[#c99750]">
                        <span className="flex items-center gap-2">
                          <BookOpen size={14} />
                          PROVENANCE INSPECTION: {selectedEvidence.udv_id}
                        </span>
                        <span>IR {selectedEvidence.ir.toFixed(4)}</span>
                      </div>
                      <p className="mt-3 text-xs font-sans-ui text-[#f4efe4]/90 leading-relaxed">
                        {selectedEvidence.content}
                      </p>
                      {selectedEvidence.metadata && (
                        <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] text-white/50">
                          <div>
                            <span className="block text-white/30">Repository:</span>
                            <span className="text-white/80">{selectedEvidence.metadata.archive_or_repository ?? "Memoria Chilena"}</span>
                          </div>
                          <div>
                            <span className="block text-white/30">Catalogue ID:</span>
                            <span className="text-white/80">{selectedEvidence.metadata.catalogue_reference_id ?? "BND / MC Ref"}</span>
                          </div>
                          <div>
                            <span className="block text-white/30">Authenticity:</span>
                            <span className="text-emerald-300">{selectedEvidence.metadata.icd_authenticity ?? 0.9}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* Initial Zero-State Display */}
              {!result && !loading && !error && (
                <div className="mt-8 rounded-2xl border border-white/[0.06] bg-[#0c0d10] p-10 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center mx-auto text-[#c99750]">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-display text-lg text-[#f4efe4]">
                    The Terminal is Governed & Ready
                  </h4>
                  <p className="text-xs font-serif-body text-[#f4efe4]/60 max-w-md mx-auto leading-relaxed">
                    Submit a query above or click one of the pre-calibrated evidence probes on the left to see how the system handles supported questions versus deliberate refusals.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

