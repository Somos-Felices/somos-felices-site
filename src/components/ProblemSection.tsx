import React, { useState } from "react"
import { AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react"

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"standard" | "veridical">("veridical")

  return (
    <section id="thesis" className="relative py-28 lg:py-36 bg-[#0f1117] border-y border-white/[0.06] overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="pointer-events-none absolute inset-0 bg-archival-grid opacity-30" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
            <span>01 / The Core Epistemic Problem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#f4efe4]">
            Most AI systems are optimized to answer. <br />
            <span className="italic font-serif-body text-[#c99750]">We are interested in whether they should.</span>
          </h2>
          <p className="mt-6 font-serif-body text-lg sm:text-xl text-[#f4efe4]/70 leading-relaxed font-light">
            In cultural memory, archives, and high-consequence enterprise repositories, a fabricated answer is not merely inaccurate—it is epistemic pollution. Traditional chatbots treat confidence as an output tone rather than documentary provenance.
          </p>
        </div>

        {/* Interactive Comparison Simulator */}
        <div className="mt-16 rounded-3xl border border-white/[0.1] bg-[#14161f] p-6 lg:p-10 shadow-2xl">
          
          {/* Toggle Switches */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#c99750]">
                Simulation Comparison
              </span>
              <h3 className="text-xl font-display font-medium text-[#f4efe4] mt-1">
                Query: "What was Isidora Goyenechea's favorite personal color?"
              </h3>
            </div>

            <div className="inline-flex rounded-full border border-white/10 bg-[#0c0d10] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("standard")}
                className={`rounded-full px-5 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  activeTab === "standard"
                    ? "bg-red-500/20 text-red-200 border border-red-500/30"
                    : "text-[#f4efe4]/50 hover:text-white"
                }`}
              >
                Standard Probabilistic AI
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("veridical")}
                className={`rounded-full px-5 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  activeTab === "veridical"
                    ? "bg-[#c99750]/20 text-[#e0b472] border border-[#c99750]/40 font-semibold"
                    : "text-[#f4efe4]/50 hover:text-white"
                }`}
              >
                Veridical Mind Architecture
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="mt-8 grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual Flow Column */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0c0d10]/60 p-6 min-h-[360px]">
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#f4efe4]/40">
                Cognitive Trace & Governance Flow
              </span>

              <div key={activeTab} className="animate-fade-in-up">
                {activeTab === "standard" ? (
                  <div className="my-8 space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                      <span className="font-mono-tech text-xs text-white/40">1</span>
                      <span className="text-sm text-white/80">User Question Submitted</span>
                    </div>
                    <div className="flex justify-center text-white/20">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
                      <span className="font-mono-tech text-xs text-amber-300">2</span>
                      <span className="text-sm text-amber-200">Next-Token Probability Prediction</span>
                    </div>
                    <div className="flex justify-center text-white/20">
                      <ArrowRight size={16} className="rotate-90" />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-red-500/40 bg-red-500/10">
                      <AlertTriangle size={16} className="text-red-400 shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-red-200 block">Plausible Hallucination Generated</span>
                        <span className="text-[11px] text-red-300/70">No archival evidence exists, yet response generated anyway</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-8 space-y-3">
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
                      <span className="font-mono-tech text-xs text-[#c99750]">01</span>
                      <span className="text-xs text-white/80">Archival Retrieval over UDV Units</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-[#c99750]/30 bg-[#c99750]/5">
                      <span className="font-mono-tech text-xs text-[#c99750]">02</span>
                      <span className="text-xs text-[#e0b472]">Information Relevance (IR) Evaluated</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-amber-400/40 bg-amber-400/10">
                      <span className="font-mono-tech text-xs text-amber-300">03</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-amber-200">MCG Category C: Insufficient Support</span>
                        <span className="text-[10px] text-amber-300/80">IR fails θA (0.75) and θB (0.50) thresholds</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10">
                      <ShieldAlert size={16} className="text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-emerald-200 block">Generation Suppressed (RPA Invoked)</span>
                        <span className="text-[10px] text-emerald-300/80">LLM physically bypassed to safeguard truth</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-tech text-white/40">
                <span>GOVERNANCE STATUS</span>
                <span className={activeTab === "veridical" ? "text-[#c99750]" : "text-red-400"}>
                  {activeTab === "veridical" ? "EVIDENCE ENFORCED" : "UNRESTRICTED GENERATION"}
                </span>
              </div>
            </div>

            {/* Simulated Response Output */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-6 lg:p-8">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-white/40">Output Channel</span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-medium text-[#f4efe4]">
                      {activeTab === "standard" ? "Standard Chat Model" : "Veridical Mind Gateway"}
                    </span>
                  </div>
                  <span
                    className={`badge-tech px-2.5 py-1 rounded-full text-[10px] ${
                      activeTab === "standard"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                    }`}
                  >
                    {activeTab === "standard" ? "UNGROUNDED GUESS" : "CATEGORY C / REFUSAL"}
                  </span>
                </div>

                <div className="mt-6">
                  <div key={activeTab} className="animate-fade-in-up">
                    {activeTab === "standard" ? (
                      <div className="space-y-4">
                        <p className="font-serif-body text-lg leading-relaxed text-red-100/90 italic">
                          "Isidora Goyenechea was famously fond of deep royal blue and emerald tones, which reflected the maritime wealth of Lota and her refined European tastes..."
                        </p>
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-200/80 leading-relaxed font-sans-ui">
                          <strong className="font-semibold text-red-300 block mb-1">Fatal Epistemic Failure:</strong>
                          There is no surviving documentary record in the Biblioteca Nacional or Memoria Chilena regarding her private color preference. The AI hallucinated a poetic answer because standard neural networks prefer generating fiction over acknowledging ignorance.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="p-5 rounded-xl border border-amber-400/30 bg-amber-400/5">
                          <span className="font-mono-tech text-[11px] text-amber-300 uppercase tracking-widest block mb-2">
                            Governed System Response
                          </span>
                          <p className="font-serif-body text-xl text-[#f4efe4] leading-relaxed">
                            "I don't have sufficient documentary evidence to answer that."
                          </p>
                        </div>

                        <div className="space-y-3 font-mono-tech text-xs text-[#f4efe4]/60">
                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span>MCG Classification:</span>
                            <span className="text-amber-300 font-semibold">Category C (Insufficient Proof)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span>LLM Invocation Status:</span>
                            <span className="text-emerald-400 font-semibold">False (Execution Suppressed)</span>
                          </div>
                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span>RPA Fallback:</span>
                            <span className="text-white/80">Refusal Policy Activated</span>
                          </div>
                          <div className="flex justify-between py-1.5">
                            <span>Provenance Integrity:</span>
                            <span className="text-[#c99750]">100% Uncompromised</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Insight */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs font-serif-body italic text-[#f4efe4]/60">
                {activeTab === "standard"
                  ? "Standard systems hallucinate to be polite. In research and enterprise, this destroys institutional trust."
                  : "A deliberate refusal is an expression of intelligence. It proves the system respects the limits of evidence."}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
