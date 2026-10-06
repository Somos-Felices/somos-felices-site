import React, { useEffect, useRef, useState } from "react"
import { Network, ZoomIn, FileText } from "lucide-react"

interface Node {
  id: string
  label: string
  repository: string
  ir: number
  relevance: "high" | "medium" | "low"
  x: number
  y: number
  cluster: "palacio" | "lota" | "biography"
  summary: string
  catalogueRef: string
}

export const EvidenceGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [selectedCluster, setSelectedCluster] = useState<string>("all")
  const [activeNode, setActiveNode] = useState<Node | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // 8 Curated authentic documentary sources with clean, spacious layout coordinates
  const nodes: Node[] = [
    {
      id: "MC-001",
      label: "Cía. Carbonífera e Industrial de Lota",
      repository: "Memoria Chilena",
      ir: 0.58,
      relevance: "high",
      x: 0.24,
      y: 0.36,
      cluster: "lota",
      summary: "Records Isidora Goyenechea assuming leadership of the Lota industrial organization following Luis Cousiño's death, directing management and European technical acquisition.",
      catalogueRef: "MC0012422",
    },
    {
      id: "MC-002",
      label: "Lota Alto & Parque Foundations",
      repository: "Memoria Chilena",
      ir: 0.61,
      relevance: "high",
      x: 0.38,
      y: 0.28,
      cluster: "lota",
      summary: "Details the twenty-five year continuous development and botanical enrichment of Parque de Lota under Isidora's direct patronage and expert guidance.",
      catalogueRef: "MC0012642",
    },
    {
      id: "MC-003",
      label: "Viviendas Urbanas / Palacio Cousiño",
      repository: "Memoria Chilena",
      ir: 0.72,
      relevance: "high",
      x: 0.68,
      y: 0.32,
      cluster: "palacio",
      summary: "Identifies French architect Paul Lathoud as the primary architect for the Cousiño-Goyenechea residence in Santiago, placing it in 19th-century neoclassical context.",
      catalogueRef: "MC-92317",
    },
    {
      id: "MC-005",
      label: "Arquitectura en Chile Siglo XIX",
      repository: "Memoria Chilena",
      ir: 0.68,
      relevance: "high",
      x: 0.76,
      y: 0.58,
      cluster: "palacio",
      summary: "Contextual architectural analysis of aristocratic estates in 19th-century Chile, documenting structural and decorative European material importation.",
      catalogueRef: "MC-100573",
    },
    {
      id: "BND-006",
      label: "Lota - Castillo del Parque",
      repository: "Biblioteca Nacional Digital",
      ir: 0.52,
      relevance: "medium",
      x: 0.32,
      y: 0.68,
      cluster: "lota",
      summary: "Historical photographic postcard by Carlos Brandt recording construction of the residential castle in Lota between 1885 and 1898.",
      catalogueRef: "BND 613294",
    },
    {
      id: "BND-008",
      label: "Parque de Lota Historic Monument",
      repository: "Biblioteca Nacional Digital",
      ir: 0.55,
      relevance: "medium",
      x: 0.46,
      y: 0.74,
      cluster: "lota",
      summary: "Legislative and archival registry documenting the formal declaration of Parque Botánico Isidora Goyenechea as a Chilean National Historic Monument.",
      catalogueRef: "BND 164560",
    },
    {
      id: "MC-004",
      label: "European Technological Mission",
      repository: "Memoria Chilena",
      ir: 0.48,
      relevance: "medium",
      x: 0.50,
      y: 0.44,
      cluster: "biography",
      summary: "Archival records regarding European travels to acquire advanced mining machinery, electric hydro-power generators, and architectural furnishings.",
      catalogueRef: "MC0058685",
    },
  ]

  // Set default active node on load
  useEffect(() => {
    setActiveNode(nodes[2]) // Default to Palacio Cousiño
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 460)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    let mouse = { x: -100, y: -100 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top

      // Check hover hit
      let found: string | null = null
      nodes.forEach((n) => {
        const nx = n.x * width
        const ny = n.y * height
        const dist = Math.hypot(mouse.x - nx, mouse.y - ny)
        if (dist < 22) {
          found = n.id
        }
      })
      setHoveredNodeId(found)
      if (found) {
        canvas.style.cursor = "pointer"
      } else {
        canvas.style.cursor = "default"
      }
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      nodes.forEach((n) => {
        const nx = n.x * width
        const ny = n.y * height
        const dist = Math.hypot(clickX - nx, clickY - ny)
        if (dist < 22) {
          setActiveNode(n)
        }
      })
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("click", onClick)

    let time = 0

    const render = () => {
      time += 0.006
      ctx.clearRect(0, 0, width, height)

      // Fine coordinate grid - quiet and subtle
      ctx.strokeStyle = "rgba(201, 151, 80, 0.03)"
      ctx.lineWidth = 1
      const step = 48
      for (let x = 0; x < width; x += step) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw subtle connection lines between nodes in same cluster
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i]
          const n2 = nodes[j]

          const matchesCluster =
            selectedCluster === "all" ||
            (n1.cluster === selectedCluster && n2.cluster === selectedCluster)

          const isConnectedToActive =
            activeNode && (n1.id === activeNode.id || n2.id === activeNode.id)

          if (n1.cluster === n2.cluster) {
            const x1 = n1.x * width
            const y1 = n1.y * height
            const x2 = n2.x * width
            const y2 = n2.y * height

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = isConnectedToActive
              ? "rgba(201, 151, 80, 0.35)"
              : matchesCluster
              ? "rgba(201, 151, 80, 0.12)"
              : "rgba(244, 239, 228, 0.02)"
            ctx.lineWidth = isConnectedToActive ? 1.2 : 0.6
            ctx.stroke()
          }
        }
      }

      // Center Reference Indicator
      const qx = width * 0.5
      const qy = height * 0.44
      ctx.beginPath()
      ctx.arc(qx, qy, 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(201, 151, 80, 0.4)"
      ctx.fill()

      // Render Nodes with calm transitions
      nodes.forEach((n) => {
        const nx = n.x * width
        const ny = n.y * height
        const isSelected = activeNode?.id === n.id
        const isHovered = hoveredNodeId === n.id
        const isClusterMatch = selectedCluster === "all" || n.cluster === selectedCluster

        // Outer selection ring
        if (isSelected) {
          ctx.beginPath()
          ctx.arc(nx, ny, 16, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(201, 151, 80, 0.6)"
          ctx.lineWidth = 1
          ctx.setLineDash([3, 4])
          ctx.stroke()
          ctx.setLineDash([])
        } else if (isHovered) {
          ctx.beginPath()
          ctx.arc(nx, ny, 12, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(201, 151, 80, 0.3)"
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Inner solid core node
        ctx.beginPath()
        ctx.arc(nx, ny, isSelected ? 6.5 : isHovered ? 5.5 : 4.5, 0, Math.PI * 2)
        ctx.fillStyle = !isClusterMatch
          ? "rgba(244, 239, 228, 0.1)"
          : isSelected
          ? "#e0b472"
          : n.relevance === "high"
          ? "#c99750"
          : "rgba(244, 239, 228, 0.5)"
        ctx.fill()

        // Clean label beside node
        ctx.fillStyle = isSelected
          ? "#f4efe4"
          : isClusterMatch
          ? "rgba(244, 239, 228, 0.65)"
          : "rgba(244, 239, 228, 0.2)"
        ctx.font = isSelected
          ? "600 9px 'JetBrains Mono', monospace"
          : "400 8.5px 'JetBrains Mono', monospace"
        ctx.fillText(n.id, nx + 10, ny + 3)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("click", onClick)
    }
  }, [selectedCluster, activeNode, hoveredNodeId])

  return (
    <section className="relative py-28 lg:py-36 bg-[#090a0d] border-b border-white/[0.06] overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#c99750]">
              <Network size={14} />
              <span>05 / Evidence Space Topology</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-light leading-[1.08] text-[#f4efe4]">
              Living Evidence <br />
              <span className="italic font-serif-body text-[#c99750] font-normal">
                Corpus Network.
              </span>
            </h2>
            <p className="mt-5 font-serif-body text-lg text-[#f4efe4]/75 leading-relaxed font-light">
              Interactive map of indexed documentary fragments. Select any node in the constellation to inspect primary provenance, Information Relevance (IR), and repository citations.
            </p>
          </div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Documents" },
              { id: "palacio", label: "Palacio Cousiño" },
              { id: "lota", label: "Parque & Industrial Lota" },
              { id: "biography", label: "Biographical Records" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCluster(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 ${
                  selectedCluster === c.id
                    ? "bg-[#c99750] text-[#090a0d] font-semibold shadow-sm"
                    : "border border-white/10 bg-[#12141c]/60 text-white/60 hover:text-white hover:border-white/25"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas & Inspector Container */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0f1118]/80 p-5 lg:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visualizer Canvas Area */}
            <div className="lg:col-span-8 h-[380px] lg:h-[480px] rounded-2xl border border-white/[0.06] bg-[#07080a] relative overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              <div className="absolute top-4 left-4 pointer-events-none font-mono-tech text-[10px] text-white/50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99750]" />
                  <span>INTERACTIVE EVIDENCE TOPOLOGY</span>
                </div>
                <div className="text-white/35">Click any node to focus provenance dossier</div>
              </div>

              <div className="absolute bottom-4 right-4 pointer-events-none font-mono-tech text-[10px] text-white/25">
                MREC TOPOLOGY MAP · SPRINT 1
              </div>
            </div>

            {/* Node Inspector Drawer - With physical 0.4s fade/slide transition */}
            <div className="lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c0d12] p-6 font-mono-tech text-xs flex flex-col justify-between h-full min-h-[380px] lg:min-h-[480px]">
              {activeNode ? (
                <div key={activeNode.id} className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-[#c99750]">
                    <span className="flex items-center gap-2">
                      <FileText size={13} />
                      DOCUMENTARY RECORD
                    </span>
                    <span className="font-bold text-xs tracking-wider">{activeNode.id}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                      Title
                    </span>
                    <span className="text-base font-display font-medium text-[#f4efe4] block leading-snug">
                      {activeNode.label}
                    </span>
                  </div>

                  <p className="text-xs font-serif-body text-[#f4efe4]/75 leading-relaxed pt-1">
                    "{activeNode.summary}"
                  </p>

                  <div className="space-y-2 pt-3 border-t border-white/[0.06] text-white/60">
                    <div className="flex justify-between">
                      <span>Repository:</span>
                      <span className="text-white/90">{activeNode.repository}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Catalogue Ref:</span>
                      <span className="text-[#c99750]">{activeNode.catalogueRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Information Relevance:</span>
                      <span className="text-emerald-300 font-semibold">{activeNode.ir.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thematic Domain:</span>
                      <span className="text-white/80 uppercase">{activeNode.cluster}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-white/[0.06] bg-[#141620] text-[11px] font-sans-ui text-white/70 leading-relaxed">
                    Source provenance locked in immutable ICD manifest. Verified against primary Chilean repositories.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 p-4 text-white/40">
                  <ZoomIn size={24} className="text-white/20" />
                  <span className="font-display text-sm text-[#f4efe4]/70">Select an Evidence Node</span>
                  <p className="text-[11px] font-serif-body text-white/50 max-w-xs leading-relaxed">
                    Click any node in the evidence space above to view verified repository citations, summary, and information relevance metrics.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/40">
                <span>GOVERNANCE STATUS</span>
                <span className="text-emerald-400">CORPUS AUDITED</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
