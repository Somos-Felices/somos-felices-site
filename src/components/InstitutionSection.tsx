import React from "react"
import { Building2, ArrowUpRight } from "lucide-react"

export const InstitutionSection: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Evidence-Governed Historical AI",
      tagline: "Veridical Mind Core",
      desc: "Creating rigorous cultural memory architectures where technology meets primary archival history without speculative hallucinations.",
      points: ["Epistemic governance", "Institutional provenance", "Deliberate refusal guarantees"],
    },
    {
      num: "02",
      title: "Museo Interactivo Isidora Goyenechea",
      tagline: "Cultural Heritage & Memory",
      desc: "Transforming regional 19th-century industrial history into an engaging, interactive museum experience for researchers and the public.",
      points: ["Interactive historical dossier", "Lota Alto & Palacio Cousiño", "Cultural identity preservation"],
    },
    {
      num: "03",
      title: "Learning & Technological Opportunity",
      tagline: "Youth & Educational Access",
      desc: "Providing Chilean youth with hands-on exposure to advanced computing, engineering, and digital archives to foster future innovators.",
      points: ["Educational outreach", "Applied computing seminars", "Empowerment through tech"],
    },
  ]

  return (
    <section id="institution" className="relative py-28 lg:py-36 bg-[#0b0c0e] border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#c99750]/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
            <Building2 size={14} />
            <span>07 / Institutional Foundation</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] text-[#f4efe4]">
            Asociación Cultural <br />
            <span className="italic font-serif-body text-[#c99750] font-normal">
              Somos Felices.
            </span>
          </h2>
          <p className="mt-6 font-serif-body text-lg sm:text-xl text-[#f4efe4]/70 leading-relaxed font-light">
            Founded in Chile, Somos Felices brings together high-consequence technology, museum curation, and accessible education to connect contemporary society with historical truth and future opportunity.
          </p>
        </div>

        {/* The Three Strategic Pillars */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="rounded-3xl border border-white/[0.08] bg-[#12141c]/70 p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#c99750]/40 hover:bg-[#151722] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
                  <span className="font-mono-tech text-xs text-[#c99750] font-bold">
                    PILLAR {pillar.num}
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-white/40">
                    {pillar.tagline}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-medium text-[#f4efe4] leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-4 font-serif-body text-sm text-[#f4efe4]/70 leading-relaxed font-light">
                  {pillar.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 font-mono-tech text-xs text-white/60">
                      <span className="h-1 w-1 rounded-full bg-[#c99750]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06]">
                <a
                  href="#isidora"
                  className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#c99750] hover:text-[#e0b472]"
                >
                  <span>Experience Initiative</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Statement */}
        <div className="mt-16 rounded-3xl border border-[#c99750]/30 bg-gradient-to-r from-[#141620] via-[#161926] to-[#141620] p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#c99750] block">
              Where Accuracy & Provenance Matter
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#f4efe4]">
              Applicable to archives, national libraries, cultural institutions, and mission-critical knowledge systems.
            </h3>
            <p className="font-serif-body text-sm text-white/70 leading-relaxed">
              When institutional credibility cannot tolerate synthetic fiction, evidence governance provides the verifiable mathematical guarantee that answers represent truth.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:info@somosfelices.com"
              className="inline-flex items-center gap-3 rounded-full bg-[#c99750] px-7 py-3.5 text-xs font-mono-tech uppercase tracking-widest font-semibold text-[#0b0c0e] hover:bg-[#e0b472] transition-all shadow-lg"
            >
              <span>Contact Somos Felices</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
