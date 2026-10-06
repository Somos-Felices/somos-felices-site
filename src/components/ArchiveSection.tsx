import React, { useState } from "react"
import { Archive as ArchiveIcon, ExternalLink, Shield } from "lucide-react"

interface DocumentRecord {
  id: string
  title: string
  repository: string
  date: string
  catalogueId: string
  type: string
  excerpt: string
  link: string
  provenanceNote: string
}

export const ArchiveSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // Real public archival sources from the verified project corpus
  const documents: DocumentRecord[] = [
    {
      id: "public-isidora-001",
      title: "Cía. Carbonífera e Industrial de Lota",
      repository: "Memoria Chilena, Biblioteca Nacional de Chile",
      date: "19th Century Record",
      catalogueId: "MC0012422",
      type: "Historical Monograph",
      excerpt:
        "The source describes Isidora Goyenechea Gallo de Cousiño as the wife of Luis Cousiño and states that after his death she assumed direction of the industrial organization of Lota. It also documents her selection of technical personnel and European voyages.",
      link: "https://www.memoriachilena.gob.cl/archivos2/pdfs/mc0012422.pdf",
      provenanceNote: "Institutional primary history describing 19th c. industrial administration.",
    },
    {
      id: "public-isidora-002",
      title: "Lota Alto",
      repository: "Memoria Chilena, Biblioteca Nacional de Chile",
      date: "Historical Survey",
      catalogueId: "MC0012642",
      type: "Regional Archival Record",
      excerpt:
        "Documents the development of Parque de Lota and records that following Luis Cousiño's passing, Isidora Goyenechea continued developing and enriching the park for approximately twenty-five years with native and foreign botanicals.",
      link: "https://www.memoriachilena.gob.cl/archivos2/pdfs/mc0012642.pdf",
      provenanceNote: "Institutional survey on botanical development and land administration in Lota Alto.",
    },
    {
      id: "public-isidora-003",
      title: "Viviendas urbanas / Palacio Cousiño",
      repository: "Memoria Chilena, Biblioteca Nacional de Chile",
      date: "19th Century Monograph",
      catalogueId: "MC-92317",
      type: "Architectural Registry",
      excerpt:
        "Identifies Palacio Cousiño as belonging to Luis Cousiño and Isidora Goyenechea and explicitly identifies French architect Paul Lathoud as its architect, placing the residence within 19th c. Chilean urban architecture.",
      link: "https://www.memoriachilena.gob.cl/602/w3-article-92317.html",
      provenanceNote: "Definitive architectural attribution and institutional provenance record.",
    },
    {
      id: "public-isidora-005",
      title: "Arquitectura en Chile durante el siglo XIX",
      repository: "Memoria Chilena, Biblioteca Nacional de Chile",
      date: "19th C. Overview",
      catalogueId: "MC-100573",
      type: "Historical Context",
      excerpt:
        "Broad architectural context covering high-society residential estates and French architectural influence in Santiago, framing the Cousiño-Goyenechea estate within broader national developments.",
      link: "https://www.memoriachilena.gob.cl/602/w3-article-100573.html",
      provenanceNote: "Contextual architectural overview used as engineering fixture.",
    },
    {
      id: "public-isidora-006",
      title: "Lota - Castillo del Parque",
      repository: "Biblioteca Nacional Digital de Chile",
      date: "c. 1900–1909",
      catalogueId: "BND 613294",
      type: "Digitized Photographic Postcard",
      excerpt:
        "Photographic postcard record created by Carlos Brandt showing the Castillo del Parque in Lota, identifying the residence associated with Isidora Goyenechea and recording construction between 1885 and 1898.",
      link: "https://www.bibliotecanacionaldigital.gob.cl/bnd/629/w3-article-613294.html",
      provenanceNote: "Visual photographic record preserving structural history of the residence.",
    },
    {
      id: "public-isidora-008",
      title: "Parque de Lota National Monument",
      repository: "Biblioteca Nacional Digital de Chile",
      date: "Historic Monument Record",
      catalogueId: "BND 164560",
      type: "Heritage Declaration",
      excerpt:
        "Records the formal declaration of Parque Botánico Isidora Goyenechea de Cousiño as a Chilean Historic Monument in 2009, codifying its enduring national cultural significance.",
      link: "https://www.bibliotecanacionaldigital.gob.cl/bnd/629/w3-article-164560.html",
      provenanceNote: "Official heritage documentation and legislative declaration.",
    },
  ]

  const filtered = documents.filter((doc) => {
    if (activeFilter === "all") return true
    if (activeFilter === "memoria") return doc.repository.includes("Memoria Chilena")
    if (activeFilter === "bnd") return doc.repository.includes("Biblioteca Nacional Digital")
    return true
  })

  return (
    <section id="archive" className="relative py-28 lg:py-36 bg-[#0e1017] border-b border-white/[0.06] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
              <ArchiveIcon size={14} />
              <span>06 / Institutional Corpus Registry</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.05] text-[#f4efe4]">
              Authenticated <br />
              <span className="italic font-serif-body text-[#c99750] font-normal">
                Historical Records.
              </span>
            </h2>
            <p className="mt-5 font-serif-body text-lg text-[#f4efe4]/70 leading-relaxed font-light">
              Every grounded generation emitted by Veridical Mind originates from an auditable institutional record. We do not invent citations or train on indiscriminate web crawls.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Records (6)" },
              { id: "memoria", label: "Memoria Chilena" },
              { id: "bnd", label: "Biblioteca Nacional Digital" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-4 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all ${
                  activeFilter === f.id
                    ? "bg-[#c99750] text-[#0b0c0e] font-semibold"
                    : "border border-white/10 bg-[#141620] text-white/60 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Archival Grid of Real Documents */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="group rounded-2xl border border-white/[0.08] bg-[#13151f]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#c99750]/40 hover:bg-[#171a26] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Top Metadata */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 text-[10px] font-mono-tech">
                  <span className="text-[#c99750] font-semibold">{doc.id}</span>
                  <span className="text-white/40">{doc.catalogueId}</span>
                </div>

                <span className="text-[11px] font-mono-tech text-[#e0b472] uppercase tracking-wider block mb-1">
                  {doc.type} · {doc.date}
                </span>

                <h3 className="font-display text-lg font-medium text-[#f4efe4] group-hover:text-[#c99750] transition-colors leading-snug">
                  {doc.title}
                </h3>

                <p className="mt-3 font-serif-body text-xs text-[#f4efe4]/70 leading-relaxed line-clamp-4">
                  "{doc.excerpt}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] font-mono-tech text-white/40 truncate max-w-[190px]">
                  {doc.repository.split(",")[0]}
                </span>

                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#c99750] hover:text-[#e0b472] transition-colors"
                >
                  <span>Archive Record</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Archival Integrity Note */}
        <div className="mt-12 p-6 rounded-2xl border border-[#c99750]/20 bg-[#11131b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tech text-xs text-white/60">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-[#c99750] shrink-0" />
            <span>
              All public engineering fixtures maintain immutable cryptographic checksums and catalog identifiers.
            </span>
          </div>
          <span className="text-[#c99750] shrink-0">AUTHENTICATED PROVENANCE</span>
        </div>

      </div>
    </section>
  )
}
