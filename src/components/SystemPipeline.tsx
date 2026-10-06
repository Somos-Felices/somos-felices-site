import React, { useState } from "react"
import { Database, Search, Gauge, ShieldCheck, Cpu } from "lucide-react"

interface PipelineStage {
  step: string
  title: string
  subtitle: string
  description: string
  detailPoints: string[]
  icon: React.ElementType
  categoryTrace: string
}

export const SystemPipeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(0)

  const stages: PipelineStage[] = [
    {
      step: "01",
      title: "Document Ingestion & Provenance",
      subtitle: "MICD / UDV Ingestion Architecture",
      description:
        "Archival materials from institutions such as Memoria Chilena and the Biblioteca Nacional are ingested, chunked into immutable Universal Documentary Units (UDVs), and bound to rigorous ICD provenance metadata.",
      detailPoints: [
        "Unique document versioning and A/C/K governance manifest checks",
        "Deterministic semantic chunking into discrete documentary units",
        "Metadata indexing preserving institutional repository citations",
      ],
      icon: Database,
      categoryTrace: "Immutable Provenance Assigned",
    },
    {
      step: "02",
      title: "Semantic Vector Retrieval",
      subtitle: "High-Dimensional Vector Memory",
      description:
        "The incoming user question is converted into dense semantic embeddings and compared against indexed documentary vectors to retrieve top-k candidate units.",
      detailPoints: [
        "Sentence transformer embedding alignment",
        "Source document filtering across authorized corpus subsets",
        "Isolation of top candidates without speculative synthesis",
      ],
      icon: Search,
      categoryTrace: "Candidate Retrieval (Top-k=10)",
    },
    {
      step: "03",
      title: "Information Relevance Evaluation",
      subtitle: "Epistemic Support Calculation",
      description:
        "The system evaluates the factual support of retrieved units. Information Relevance is scored using cosine similarity tempered by archival completeness and consensus weights.",
      detailPoints: [
        "Evaluation of maximum relevance (IR_max) and corpus consensus",
        "Information Consistency Ratio (ICR) calculated for multi-source harmony",
        "Continuous mathematical scoring prior to any text generation",
      ],
      icon: Gauge,
      categoryTrace: "IR & ICR Evaluated",
    },
    {
      step: "04",
      title: "Governance Gateway (MCG)",
      subtitle: "The Epistemic Control Barrier",
      description:
        "Before any LLM can be invoked, the Generation Gateway classifies the query into Category A, B, or C. If evidence is insufficient, physical execution stops immediately.",
      detailPoints: [
        "Category A: IR_max ≥ θA → Unqualified grounded generation permitted",
        "Category B: θB ≤ IR_max < θA → Generation permitted with epistemic caveat",
        "Category C: IR_max < θB → Immediate suppression; RPA refusal returned",
      ],
      icon: ShieldCheck,
      categoryTrace: "Classification: Category A / B / C",
    },
    {
      step: "05",
      title: "Grounded Generation or Deliberate Refusal",
      subtitle: "Provable Output or Honorable Silence",
      description:
        "When permitted, the response is generated strictly from the supplied documentary fragments with citations. If Category C was triggered, an intelligent, deliberate refusal is delivered with zero hallucination.",
      detailPoints: [
        "Strict prompt injection barrier: model forbidden from using pretrained assumptions",
        "MRM audit logging for latency, categorization, and provenance",
        "Zero hallucination guarantee across historical inquiries",
      ],
      icon: Cpu,
      categoryTrace: "Response or Refusal Delivered",
    },
  ]

  return (
    <section id="pipeline" className="relative py-28 lg:py-36 bg-[#0b0c0e] border-b border-white/[0.06] overflow-hidden">
      {/* Background Architectural Patterns */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-10" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
            <span>02 / System Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#f4efe4]">
            How Veridical Mind <br />
            <span className="italic font-serif-body text-[#c99750]">governs intelligence.</span>
          </h2>
          <p className="mt-6 font-serif-body text-lg sm:text-xl text-[#f4efe4]/70 leading-relaxed font-light">
            An unbroken chain of evidence from archival record to user response. Unlike standard RAG that blindly passes context to a prompt, our system operates a mathematical gatekeeper that can veto generation.
          </p>
        </div>

        {/* Pipeline Stepper Navigation */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            const isSelected = selectedStage === idx
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setSelectedStage(idx)}
                className={`relative flex flex-col items-start p-5 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "border-[#c99750] bg-[#181b24] shadow-[0_4px_24px_rgba(201,151,80,0.15)]"
                    : "border-white/[0.08] bg-[#101218]/60 hover:border-white/20 hover:bg-[#14161f]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span
                    className={`font-mono-tech text-xs tracking-wider ${
                      isSelected ? "text-[#c99750] font-bold" : "text-white/40"
                    }`}
                  >
                    STEP {stage.step}
                  </span>
                  <Icon
                    size={18}
                    className={`transition-colors ${
                      isSelected ? "text-[#c99750]" : "text-white/30"
                    }`}
                  />
                </div>
                <span className="font-display text-sm font-medium text-[#f4efe4] line-clamp-1">
                  {stage.title.split("&")[0].trim()}
                </span>
                <span className="mt-1 font-mono-tech text-[10px] text-white/40 line-clamp-1">
                  {stage.subtitle}
                </span>

                {/* Bottom Active Indicator Line */}
                {isSelected && (
                  <div className="absolute -bottom-px inset-x-4 h-0.5 bg-[#c99750]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Active Stage Deep Dive Display */}
        <div className="mt-8 rounded-3xl border border-[#c99750]/30 bg-[#12141c] p-6 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow Corner */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-[#c99750]/5 rounded-full blur-3xl" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Stage Description Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c99750]/40 bg-[#c99750]/10 text-xs font-mono-tech text-[#c99750]">
                  {stages[selectedStage].step}
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
                  {stages[selectedStage].subtitle}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl text-[#f4efe4]">
                {stages[selectedStage].title}
              </h3>

              <p className="font-serif-body text-lg text-[#f4efe4]/80 leading-relaxed font-light">
                {stages[selectedStage].description}
              </p>

              {/* Key Implementation Points */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                {stages[selectedStage].detailPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#c99750] mt-2 shrink-0" />
                    <span className="text-sm font-sans-ui text-[#f4efe4]/70 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Stage Graphic / Architecture Card */}
            <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] text-white/40">
                <span>STAGE LOGIC EMULATOR</span>
                <span className="text-[#c99750]">ACTIVE MONITOR</span>
              </div>

              <div className="my-6 space-y-4">
                <div className="p-3.5 rounded-lg border border-white/10 bg-[#161822]">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Incoming Signal</div>
                  <div className="text-white/80 font-mono text-xs">UDV[Provenance Verified] → IR Calculation Engine</div>
                </div>

                <div className="p-3.5 rounded-lg border border-[#c99750]/30 bg-[#c99750]/10">
                  <div className="text-[10px] text-[#c99750] uppercase tracking-widest mb-1">Epistemic Barrier</div>
                  <div className="text-[#f4efe4] font-mono text-xs font-semibold">
                    {stages[selectedStage].categoryTrace}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-white/10 bg-[#161822]">
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Audit Record (MRM)</div>
                  <div className="text-emerald-300 font-mono text-[11px]">
                    Trace ID: #mrm_{selectedStage + 1}049 · Latency: 0.028ms · Verified
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                <span className="text-white/40">GATEWAY POLICY</span>
                <span className="text-[#e0b472]">GROUNDING PRECEDES GENERATION</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
