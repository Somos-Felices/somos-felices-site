import React, { useEffect, useRef, useState } from "react"
import { ArrowDownRight, Lock, Play, Pause } from "lucide-react"

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null)

  // Calibrated, quiet simulation for documentary units (UDVs) orbiting a calm governance core
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 640)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 560)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    // Reduced particle count from 56 down to 18 for pristine, uncluttered museum precision
    const particleCount = 18
    const particles: Array<{
      id: string
      angle: number
      radius: number
      speed: number
      size: number
      isGrounded: boolean
      label: string
      pulse: number
    }> = []

    const tags = [
      { id: "MC-001", label: "Cía. Lota" },
      { id: "MC-002", label: "Parque Lota" },
      { id: "MC-003", label: "Palacio Cousiño" },
      { id: "MC-005", label: "Arch. 19C" },
      { id: "BND-006", label: "Castillo" },
      { id: "BND-008", label: "Monumento" },
    ]

    for (let i = 0; i < particleCount; i++) {
      const tag = tags[i % tags.length]
      particles.push({
        id: `${tag.id}-${i}`,
        angle: (i / particleCount) * Math.PI * 2,
        radius: 95 + ((i * 19) % 130),
        speed: (0.0015 + ((i % 3) * 0.0008)) * (i % 2 === 0 ? 1 : -1),
        size: 2.2,
        isGrounded: i % 4 !== 0,
        label: tag.label,
        pulse: (i / particleCount) * Math.PI,
      })
    }

    let time = 0
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top

      // Check hover hit
      const cx = width / 2
      const cy = height / 2
      let hit: string | null = null
      particles.forEach((p) => {
        const px = cx + Math.cos(p.angle) * p.radius
        const py = cy + Math.sin(p.angle) * p.radius
        const d = Math.hypot(mouse.targetX - px, mouse.targetY - py)
        if (d < 16) hit = p.label
      })
      setSelectedParticle(hit)
    }

    const onMouseLeave = () => {
      mouse.targetX = width / 2
      mouse.targetY = height / 2
      setSelectedParticle(null)
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)

    const render = () => {
      if (!isPaused) {
        time += 0.008
      }

      // Smooth subtle mouse parallax
      mouse.x += (mouse.targetX - width / 2 - mouse.x) * 0.03
      mouse.y += (mouse.targetY - height / 2 - mouse.y) * 0.03

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2 + mouse.x * 0.04
      const cy = height / 2 + mouse.y * 0.04

      // Subtle concentric rings - strictly fine lines, zero thick neon bands
      const rings = [90, 160, 230]
      rings.forEach((r, idx) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = idx === 1 ? "rgba(201, 151, 80, 0.14)" : "rgba(244, 239, 228, 0.04)"
        ctx.lineWidth = 1
        ctx.setLineDash(idx === 1 ? [3, 8] : [1, 6])
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Central Governance Focal Core (Single, calm, authoritative)
      const corePulse = Math.sin(time * 2) * 2
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48 + corePulse)
      coreGradient.addColorStop(0, "rgba(201, 151, 80, 0.25)")
      coreGradient.addColorStop(0.6, "rgba(201, 151, 80, 0.04)")
      coreGradient.addColorStop(1, "rgba(201, 151, 80, 0)")

      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(cx, cy, 50 + corePulse, 0, Math.PI * 2)
      ctx.fill()

      // Core fine circle
      ctx.beginPath()
      ctx.arc(cx, cy, 22, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(201, 151, 80, 0.6)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Center gold dot
      ctx.fillStyle = "#c99750"
      ctx.beginPath()
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
      ctx.fill()

      // Particles & fine connector lines
      particles.forEach((p, i) => {
        if (!isPaused) {
          p.angle += p.speed
          p.pulse += 0.015
        }

        const currentRadius = p.radius + Math.sin(p.pulse) * 6
        const px = cx + Math.cos(p.angle) * currentRadius
        const py = cy + Math.sin(p.angle) * currentRadius

        // Very faint hair-line to core for grounded units
        if (p.isGrounded && i % 2 === 0) {
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(px, py)
          ctx.strokeStyle = "rgba(201, 151, 80, 0.08)"
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        // Particle circle
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.isGrounded ? "rgba(201, 151, 80, 0.85)" : "rgba(244, 239, 228, 0.3)"
        ctx.fill()

        // Clean, small non-overlapping label (only drawn for designated key nodes)
        if (i % 3 === 0) {
          ctx.fillStyle = "rgba(244, 239, 228, 0.45)"
          ctx.font = "8px 'JetBrains Mono', monospace"
          ctx.fillText(p.label, px + 8, py + 3)
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [isPaused])

  // Rotate cycle status ticker
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 5)
    }, 3800)
    return () => clearInterval(timer)
  }, [isPaused])

  const stages = [
    { label: "Document Ingestion", detail: "Archival provenance verified & indexed into UDVs" },
    { label: "Semantic Retrieval", detail: "Candidate documentary units isolated via dense embeddings" },
    { label: "Evidence Evaluation", detail: "Information Relevance (IR) calculated against query" },
    { label: "Governance Gate", detail: "Category C checks prevent unsupported hallucination" },
    { label: "Grounded Generation", detail: "Epistemic synthesis strictly bound to authentic record" },
  ]

  return (
    <section id="top" className="relative min-h-[94vh] pt-32 lg:pt-40 pb-20 flex flex-col justify-between overflow-hidden bg-[#090a0d]">
      {/* Background Architectural Patterns - subdued and deep */}
      <div className="pointer-events-none absolute inset-0 bg-archival-grid opacity-35" />
      <div className="pointer-events-none absolute top-0 right-[-10%] h-[600px] w-[600px] rounded-full bg-[#c99750]/[0.04] blur-3xl" />

      {/* Main Grid Hero Body - Spacious, intentional separation */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, thesis, clear vertical hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Museum & Lab Metadata Badge */}
            <div className="inline-flex items-center gap-3 mb-6 w-fit rounded-full border border-[#c99750]/30 bg-[#12141c]/80 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c99750]" />
              <span className="font-mono-tech text-[10px] tracking-[0.22em] text-[#e0b472] uppercase font-medium">
                Veridical Mind Core · Investor & Research Brief
              </span>
            </div>

            {/* Giant Editorial Headline - Generous line-height and letter-spacing */}
            <h1 className="font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#f4efe4] max-w-2xl">
              AI that knows <br />
              <span className="italic font-serif-body text-[#c99750] font-normal">when it has evidence.</span>
            </h1>

            {/* Sub-headline / Core Positioning */}
            <p className="mt-8 font-serif-body text-lg lg:text-xl text-[#f4efe4]/75 leading-relaxed max-w-xl font-light">
              We build evidence-governed intelligence for historical memory and institutional archives. 
              When documentary proof is insufficient, the system <span className="text-[#f4efe4] font-medium underline decoration-[#c99750]/50 underline-offset-4">deliberately refuses</span> instead of hallucinating.
            </p>

            {/* Primary CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#isidora"
                className="group inline-flex items-center gap-3 rounded-full bg-[#c99750] px-7 py-3.5 text-xs font-mono-tech uppercase tracking-[0.16em] font-semibold text-[#090a0d] shadow-[0_4px_20px_rgba(201,151,80,0.25)] transition-all duration-300 hover:bg-[#e0b472] hover:translate-y-[-1px]"
              >
                <span>Witness Isidora Experience</span>
                <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#pipeline"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3.5 text-xs font-mono-tech uppercase tracking-[0.16em] text-[#f4efe4]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#c99750]/50 hover:text-[#c99750]"
              >
                <span>5-Stage Architecture</span>
              </a>
            </div>

            {/* Live Interactive Telemetry Ticker */}
            <div className="mt-12 pt-7 border-t border-white/[0.08] flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setActiveStage((prev) => (prev + 1) % 5)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#c99750]/30 bg-[#12141a] text-[#c99750] font-mono-tech text-xs hover:border-[#c99750] transition-colors"
                  title="Click to advance cycle"
                >
                  0{activeStage + 1}
                </button>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#c99750]">
                      Telemetry Cycle
                    </span>
                    <span className="text-white/20 text-xs">/</span>
                    <span className="font-medium text-xs text-[#f4efe4] truncate">
                      {stages[activeStage].label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#f4efe4]/50 truncate mt-0.5 font-serif-body">
                    {stages[activeStage].detail}
                  </span>
                </div>
              </div>

              {/* Pause toggle */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono-tech text-white/50 hover:text-white hover:border-[#c99750]/30 transition-colors shrink-0"
              >
                {isPaused ? <Play size={10} className="text-emerald-400" /> : <Pause size={10} className="text-white/40" />}
                <span>{isPaused ? "RESUME" : "PAUSE"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Controlled, Quiet System Core Visualizer */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] lg:min-h-[540px]">
            <div className="relative w-full h-[460px] lg:h-[540px] rounded-2xl border border-white/[0.08] bg-[#0e1017]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              
              {/* Clean Top Bar */}
              <div className="absolute top-0 inset-x-0 h-10 border-b border-white/[0.06] bg-[#090a0d]/70 px-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono-tech text-[9px] uppercase tracking-[0.2em] text-[#f4efe4]/60">
                    MREC · MCG · GOVERNANCE CORE
                  </span>
                </div>
                <div className="font-mono-tech text-[9px] text-[#c99750]/80">
                  θA=0.75 · θB=0.50
                </div>
              </div>

              {/* Canvas Particle Field */}
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-default"
              />

              {/* Quiet Footer Notification */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#090a0d]/90 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-[#c99750] shrink-0" />
                  <span className="text-[11px] font-mono-tech text-[#f4efe4]/70">
                    {selectedParticle ? `Focused Unit: ${selectedParticle}` : "Governance Gate: LLM generation locked to verified UDVs"}
                  </span>
                </div>
                <span className="font-mono-tech text-[9px] text-[#c99750] border border-[#c99750]/30 px-2 py-0.5 rounded bg-[#c99750]/5">
                  AUDITED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footnote / Institution Metadata */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 lg:px-12 mt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/[0.06] pt-5 gap-4 text-xs font-mono-tech text-[#f4efe4]/40">
          <div className="flex items-center gap-6">
            <span>PROJECT: SOMOS FELICES / VERIDICAL MIND</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">SUBJECT: ISIDORA GOYENECHEA (1836–1897)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#c99750]/80">SPRINT 1 VALIDATED</span>
            <span>CHILE 2026</span>
          </div>
        </div>
      </div>
    </section>
  )
}
