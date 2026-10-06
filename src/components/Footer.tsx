import React from "react"
import { ArrowUpRight, ShieldCheck, Mail } from "lucide-react"

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#07080a] text-[#f4efe4] border-t border-white/[0.08] overflow-hidden">
      {/* Background Archival Grid */}
      <div className="pointer-events-none absolute inset-0 bg-archival-grid opacity-15" />

      {/* Hero Vision Finale / Investor Callout */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-24 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c99750]/30 bg-[#c99750]/10 px-4 py-1.5 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#e0b472]">
            <ShieldCheck size={14} />
            <span>The Epistemic Future</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#f4efe4] leading-[1.04]">
            "The future of AI is not only about generating more. <br />
            <span className="italic font-serif-body text-[#c99750] font-normal">
              It is about knowing when generation is justified."
            </span>
          </h2>

          <p className="font-serif-body text-lg sm:text-xl text-[#f4efe4]/70 max-w-2xl mx-auto leading-relaxed font-light">
            Somos Felices and Veridical Mind are building the standard for verifiable, evidence-grounded AI across cultural archives and critical enterprise repositories.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#isidora"
              className="inline-flex items-center gap-3 rounded-full bg-[#c99750] px-8 py-4 text-xs font-mono-tech uppercase tracking-widest font-semibold text-[#0b0c0e] hover:bg-[#e0b472] transition-all shadow-[0_4px_24px_rgba(201,151,80,0.3)]"
            >
              <span>Explore Isidora System</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="mailto:info@somosfelices.com"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 py-4 text-xs font-mono-tech uppercase tracking-widest text-[#f4efe4] hover:border-[#c99750]/50 hover:text-[#c99750] transition-all"
            >
              <Mail size={15} />
              <span>info@somosfelices.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Credentials */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-[#c99750]/40 bg-[#14161f] text-[#c99750] font-display font-semibold text-xs">
                VM
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold tracking-wider text-[#f4efe4]">
                  SOMOS FELICES
                </span>
                <span className="font-mono-tech text-[10px] tracking-widest text-[#c99750]">
                  VERIDICAL MIND CORE
                </span>
              </div>
            </div>
            <p className="font-serif-body text-xs text-[#f4efe4]/60 max-w-sm leading-relaxed">
              Asociación Cultural Somos Felices. Santiago & Valparaíso, Chile. Dedicated to evidence-governed technology, cultural heritage preservation, and learning opportunity.
            </p>
          </div>

          {/* Links: Platform */}
          <div className="space-y-3 font-mono-tech text-xs">
            <span className="text-[#c99750] text-[10px] uppercase tracking-widest block mb-2">
              Architecture
            </span>
            <ul className="space-y-2 text-[#f4efe4]/60">
              <li><a href="#thesis" className="hover:text-white transition-colors">Core Thesis</a></li>
              <li><a href="#pipeline" className="hover:text-white transition-colors">Pipeline Stages</a></li>
              <li><a href="#governance" className="hover:text-white transition-colors">Epistemic Gates</a></li>
              <li><a href="#pipeline" className="hover:text-white transition-colors">MCG Classifier</a></li>
            </ul>
          </div>

          {/* Links: Experience */}
          <div className="space-y-3 font-mono-tech text-xs">
            <span className="text-[#c99750] text-[10px] uppercase tracking-widest block mb-2">
              Experience
            </span>
            <ul className="space-y-2 text-[#f4efe4]/60">
              <li><a href="#isidora" className="hover:text-white transition-colors">Isidora Experience</a></li>
              <li><a href="#archive" className="hover:text-white transition-colors">Memoria Chilena</a></li>
              <li><a href="#archive" className="hover:text-white transition-colors">Biblioteca Nacional</a></li>
              <li><a href="#isidora" className="hover:text-white transition-colors">Category C Demo</a></li>
            </ul>
          </div>

          {/* Links: Mission */}
          <div className="space-y-3 font-mono-tech text-xs">
            <span className="text-[#c99750] text-[10px] uppercase tracking-widest block mb-2">
              Initiatives
            </span>
            <ul className="space-y-2 text-[#f4efe4]/60">
              <li><a href="#institution" className="hover:text-white transition-colors">Museo Interactivo</a></li>
              <li><a href="#institution" className="hover:text-white transition-colors">Learning & Youth</a></li>
              <li><a href="#institution" className="hover:text-white transition-colors">Cultural Heritage</a></li>
            </ul>
          </div>

          {/* Links: Legal & Technical */}
          <div className="space-y-3 font-mono-tech text-xs">
            <span className="text-[#c99750] text-[10px] uppercase tracking-widest block mb-2">
              Provenance
            </span>
            <ul className="space-y-2 text-[#f4efe4]/60">
              <li className="text-white/40">Sprint 1 Delivery</li>
              <li className="text-white/40">FastAPI Core Validated</li>
              <li className="text-white/40">Patent-Protected Work</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#f4efe4]/40">
          <span>© 2026 Asociación Cultural Somos Felices & Veridical Mind. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>CHILE 2026</span>
            <span>·</span>
            <span>EVIDENCE-GOVERNED AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
