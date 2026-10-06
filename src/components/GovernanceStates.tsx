import React, { useState } from "react"
import { ShieldCheck, Cpu } from "lucide-react"

export const GovernanceStates: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"A" | "B" | "C">("C")

  const categories = [
    {
      id: "A" as const,
      name: "Category A: Unqualified Support",
      badge: "Fully Supported",
      color: "emerald",
      condition: "IR_max ≥ θA (High Information Relevance)",
      outcome: "Unrestricted Grounded Generation",
      description:
        "The retrieved documentary units provide direct, corroborating evidence with sufficient authenticity and consensus. The gateway authorizes generation without epistemic qualification.",
      exampleQuery: "Who designed Palacio Cousiño?",
      action: "LLM synthesizes response bound strictly to retrieved UDVs.",
    },
    {
      id: "B" as const,
      name: "Category B: Qualified Support",
      badge: "Epistemically Qualified",
      color: "blue",
      condition: "θB ≤ IR_max < θA (Partial / Non-Conclusive Evidence)",
      outcome: "Qualified Grounded Generation",
      description:
        "Documentary fragments are relevant but partial or indirect. The Generation Gateway injects an epistemic qualification constraint into the generation prompt to forbid over-confident extrapolation.",
      exampleQuery: "What role did Isidora play in European technology acquisition?",
      action: "LLM explicitly qualifies findings and caveats documentary limits.",
    },
    {
      id: "C" as const,
      name: "Category C: Insufficient Evidence",
      badge: "Deliberate Refusal",
      color: "amber",
      condition: "IR_max < θB (Insufficient Support Threshold)",
      outcome: "Physical Execution Suppression (Zero LLM Invocation)",
      description:
        "No sufficiently reliable documentary evidence exists in the indexed corpus. The system refuses to hallucinate, executing an intelligent refusal policy via the Refusal Policy Agent (RPA).",
      exampleQuery: "What was Isidora's favorite color / private opinion?",
      action: "LLM invocation bypassed entirely; RPA returns deliberate refusal.",
    },
  ]

  const current = categories.find((c) => c.id === activeCategory)!

  return (
    <section id="governance" className="relative py-28 lg:py-36 bg-[#0c0e14] border-b border-white/[0.06] overflow-hidden">
      {/* Subtle Archival Grid */}
      <div className="pointer-events-none absolute inset-0 bg-archival-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
            <span>04 / Epistemic Classification</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#f4efe4]">
            The Three States <br />
            <span className="italic font-serif-body text-[#c99750]">of Epistemic Honesty.</span>
          </h2>
          <p className="mt-6 font-serif-body text-lg sm:text-xl text-[#f4efe4]/70 leading-relaxed font-light">
            Every query evaluated by the Veridical Mind Gateway resolves into one of three deterministic governance states. Unlike traditional AI chatbots that continuously guess, Category C suppression is celebrated as an intentional feature of truth.
          </p>
        </div>

        {/* State Selection Bar */}
        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative ${
                  isSelected
                    ? cat.id === "C"
                      ? "border-amber-500/60 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                      : cat.id === "B"
                      ? "border-blue-500/60 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                      : "border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                    : "border-white/[0.08] bg-[#12141c]/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono-tech text-xl font-bold ${
                      cat.id === "C"
                        ? "text-amber-400"
                        : cat.id === "B"
                        ? "text-blue-400"
                        : "text-emerald-400"
                    }`}
                  >
                    STATE {cat.id}
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-white/50 px-2 py-0.5 rounded border border-white/10">
                    {cat.badge}
                  </span>
                </div>
                <div className="font-display text-base text-[#f4efe4] font-medium">
                  {cat.name.split(":")[1]}
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected State Visual Gate Panel */}
        <div className="mt-8 rounded-3xl border border-white/[0.1] bg-[#12141c] p-6 lg:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Deep Specification */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#c99750]">
                <span>MATHEMATICAL THRESHOLD CRITERION</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl text-[#f4efe4]">
                {current.name}
              </h3>

              <div className="p-4 rounded-xl border border-white/10 bg-[#0c0d10] font-mono-tech text-xs">
                <span className="text-white/40 block text-[10px] mb-1">GOVERNANCE RULE:</span>
                <span className="text-[#c99750] font-semibold">{current.condition}</span>
              </div>

              <p className="font-serif-body text-lg text-[#f4efe4]/80 leading-relaxed font-light">
                {current.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.08] font-mono-tech text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-white/40">Sample Query:</span>
                  <span className="text-[#f4efe4]">"{current.exampleQuery}"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white/40">Gateway Action:</span>
                  <span className="text-emerald-300">{current.action}</span>
                </div>
              </div>
            </div>

            {/* Right: Architectural Gate Graphic */}
            <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-6 font-mono-tech text-xs flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] text-white/40">
                  <span>GATE STATUS</span>
                  <span className={current.id === "C" ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                    {current.id === "C" ? "GATE CLOSED · REFUSAL" : "GATE OPEN · PERMITTED"}
                  </span>
                </div>

                <div className="my-8 text-center space-y-3">
                  <div
                    className={`h-20 w-20 rounded-full mx-auto flex items-center justify-center border transition-all duration-500 ${
                      current.id === "C"
                        ? "border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                        : current.id === "B"
                        ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        : "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    }`}
                  >
                    {current.id === "C" ? <ShieldCheck size={36} /> : <Cpu size={36} />}
                  </div>

                  <div className="font-display text-lg text-[#f4efe4]">
                    {current.outcome}
                  </div>
                  <div className="text-[11px] text-white/50 max-w-xs mx-auto">
                    {current.id === "C"
                      ? "LLM bypassed to prevent hallucination; zero ungrounded tokens emitted."
                      : "Generation grounded in retrieved institutional documentary units."}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-white/40">
                <span>MRM AUDIT TRAIL</span>
                <span>RECORDED IN CONTEXT</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
