import { FloatingIsidora } from "./components/FloatingIsidora"
import { Navigation } from "./components/Navigation"
import { Hero } from "./components/Hero"
import { ProblemSection } from "./components/ProblemSection"
import { SystemPipeline } from "./components/SystemPipeline"
import { IsidoraExperience } from "./components/IsidoraExperience"
import { GovernanceStates } from "./components/GovernanceStates"
import { EvidenceGraph } from "./components/EvidenceGraph"
import { ArchiveSection } from "./components/ArchiveSection"
import { InstitutionSection } from "./components/InstitutionSection"
import { TeamSection } from "./components/TeamSection"
import { Footer } from "./components/Footer"

export function App() {
  const scrollToIsidora = () => {
    const el = document.getElementById("isidora")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f4efe4] selection:bg-[#c99750] selection:text-[#0b0c0e]">
      {/* Global Navigation */}
      <Navigation onOpenDemo={scrollToIsidora} />`r`n      <FloatingIsidora onOpenDemo={scrollToIsidora} />

      <main id="top">
        {/* Cinematic Hero */}
        <Hero />

        {/* Section 01: The Epistemic Problem (Hallucination vs Deliberate Refusal) */}
        <ProblemSection />

        {/* Section 02: System Pipeline (Ingestion -> Retrieval -> IR -> MCG -> Generation/Refusal) */}
        <SystemPipeline />

        {/* Section 03: Live Isidora Goyenechea Governed Experience (API /api/query preserved) */}
        <IsidoraExperience />

        {/* Section 04: Governance States (A: Supported, B: Qualified, C: Insufficient) */}
        <GovernanceStates />

        {/* Section 05: Evidence Space Graph (Network of documents, clusters, IR scores) */}
        <EvidenceGraph />

        {/* Section 06: Documentary Archive (Real Memoria Chilena & BND records) */}
        <ArchiveSection />

        {/* Section 07: Somos Felices Foundation & Cultural Pillars */}
        <InstitutionSection />

        {/* Section 08: Team — The People Behind and Within the Archive */}
        <TeamSection />
      </main>

      {/* Visionary Investor-Grade Footer */}
      <Footer />
    </div>
  )
}

export default App
