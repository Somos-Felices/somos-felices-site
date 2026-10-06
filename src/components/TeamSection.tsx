import { useState, useEffect, useRef } from "react"

interface TeamMember {
  id: string
  type: "founder" | "lead" | "subject" | "bridge"
  name: string
  nameLocalized?: string
  title: string
  affiliation?: string
  credentials?: string[]
  bio: string
  domain?: string[]
  accentClass: string
  badgeLabel: string
  index?: string
}

const TEAM: TeamMember[] = [
  {
    id: "cristian",
    type: "founder",
    name: "Cristián Núñez Gana",
    title: "Founder & CEO",
    affiliation: "Veridical Mind SpA · Santiago, Chile",
    credentials: [
      "AI · Trust · Evidence",
      "Product Direction",
      "Chile–India Collaboration",
    ],
    bio: "Founder and CEO of Veridical Mind SpA, leading the product direction and broader vision of the project. Works with Yashas Sadananda across the Chile–India axis on the architecture, research direction, and technical development of Veridical Mind. His work connects the project's focus on AI, trust, evidence, memory, meaning, and human-centered technology with its practical development and long-term direction.",
    domain: ["Product · Strategy", "Research Direction", "AI · Trust · Evidence", "Chile · India"],
    accentClass: "copper",
    badgeLabel: "Founder & CEO",
    index: "00",
  },
  {
    id: "yashas",
    type: "lead",
    name: "Yashas Sadananda",
    title: "Lead Developer",
    affiliation: "PES University · Computer Science Engineering · Bengaluru, India",
    credentials: [
      "AI/ML Engineering",
      "Evidence-Grounded NLP",
      "Full-Stack Implementation",
    ],
    bio: "Lead developer and technical collaborator working with Veridical Mind on the implementation of the platform. Responsible for translating the project's evidence-governed AI architecture into a functioning technical system, working across the backend inference and retrieval pipeline, evidence grounding, Qdrant vector infrastructure, MCG pipeline, and production frontend. Works directly with Cristian Núñez Gana on architecture, technical development, research implementation, and validation.",
    domain: ["Backend · Inference", "Vector DB · Qdrant", "MCG Pipeline", "Frontend · UI/UX"],
    accentClass: "stone",
    badgeLabel: "Lead Developer",
    index: "01",
  },
  {
    id: "isidora",
    type: "subject",
    name: "Isidora Goyenechea de Cousiño",
    nameLocalized: "1836 — 1897",
    title: "The Archive's Subject",
    affiliation: "Palacio Cousiño · Parque de Lota · Chile",
    credentials: [
      "Businesswoman",
      "Philanthropist",
      "Cultural Patron",
    ],
    bio: "Businesswoman, philanthropist, and cultural patron of nineteenth-century Chile. Custodian of the Cousiño fortune and steward of an extraordinary architectural and social legacy — Palacio Cousiño in Santiago and Parque de Lota in the Atacama region. Her life, documents, and cultural influence form the foundational corpus upon which Veridical Mind was built.",
    domain: ["Palacio Cousiño", "Parque de Lota", "Cousiño Legacy"],
    accentClass: "archival",
    badgeLabel: "The Subject · The Archive",
    index: "—",
  },
]

const accentMap: Record<string, { border: string; dot: string; badge: string; glow: string; indexColor: string }> = {
  copper: {
    border: "border-[rgba(201,151,80,0.25)] hover:border-[rgba(201,151,80,0.55)]",
    dot: "bg-[#c99750]",
    badge: "bg-[rgba(201,151,80,0.08)] text-[#c99750] border border-[rgba(201,151,80,0.2)]",
    glow: "hover:shadow-[0_0_40px_rgba(201,151,80,0.08)]",
    indexColor: "text-[#c99750]",
  },
  stone: {
    border: "border-[rgba(180,168,148,0.2)] hover:border-[rgba(180,168,148,0.45)]",
    dot: "bg-[#b4a894]",
    badge: "bg-[rgba(180,168,148,0.07)] text-[#b4a894] border border-[rgba(180,168,148,0.18)]",
    glow: "hover:shadow-[0_0_40px_rgba(180,168,148,0.06)]",
    indexColor: "text-[#b4a894]",
  },
  warm: {
    border: "border-[rgba(210,175,130,0.2)] hover:border-[rgba(210,175,130,0.45)]",
    dot: "bg-[#d2af82]",
    badge: "bg-[rgba(210,175,130,0.07)] text-[#d2af82] border border-[rgba(210,175,130,0.18)]",
    glow: "hover:shadow-[0_0_40px_rgba(210,175,130,0.06)]",
    indexColor: "text-[#d2af82]",
  },
  blue: {
    border: "border-[rgba(100,160,210,0.2)] hover:border-[rgba(100,160,210,0.45)]",
    dot: "bg-[#64a0d2]",
    badge: "bg-[rgba(100,160,210,0.07)] text-[#64a0d2] border border-[rgba(100,160,210,0.18)]",
    glow: "hover:shadow-[0_0_40px_rgba(100,160,210,0.06)]",
    indexColor: "text-[#64a0d2]",
  },
  archival: {
    border: "border-[rgba(201,151,80,0.15)] hover:border-[rgba(201,151,80,0.35)]",
    dot: "bg-[#c99750]",
    badge: "bg-[rgba(201,151,80,0.06)] text-[rgba(201,151,80,0.8)] border border-[rgba(201,151,80,0.15)]",
    glow: "hover:shadow-[0_0_50px_rgba(201,151,80,0.07)]",
    indexColor: "text-[rgba(201,151,80,0.4)]",
  },
}

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const [expanded, setExpanded] = useState(false)
  const accent = accentMap[member.accentClass]
  const { ref, visible } = useScrollReveal(0.1)

  const isSubject = member.type === "subject"

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
      }}
      className={`
        relative flex flex-col border rounded-xl p-7 
        bg-[#101217] cursor-pointer
        transition-all duration-500
        ${accent.border} ${accent.glow}
        ${isSubject ? "bg-[rgba(201,151,80,0.03)]" : ""}
      `}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Top row — index + badge */}
      <div className="flex items-start justify-between mb-5">
        <span className={`font-mono-tech text-xs font-medium tracking-[0.18em] opacity-40 ${accent.indexColor}`}>
          {member.index}
        </span>
        <span className={`font-sans-ui text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full ${accent.badge}`}>
          {member.badgeLabel}
        </span>
      </div>

      {/* Name + dates for subject */}
      <div className="mb-1">
        {isSubject && (
          <p className={`font-mono-tech text-[11px] tracking-[0.2em] uppercase mb-2 opacity-50 ${accent.indexColor}`}>
            {member.nameLocalized}
          </p>
        )}
        <h3 className={`font-display text-lg leading-snug mb-0.5 ${isSubject ? "text-[rgba(244,239,228,0.75)] italic" : "text-[#f4efe4]"}`}>
          {member.name}
        </h3>
        <p className={`font-sans-ui text-sm font-medium ${isSubject ? "text-[rgba(201,151,80,0.7)]" : "text-[#c99750]"}`}>
          {member.title}
        </p>
      </div>

      {/* Affiliation */}
      {member.affiliation && (
        <p className="font-sans-ui text-xs text-[rgba(244,239,228,0.38)] mt-1 mb-4 leading-relaxed">
          {member.affiliation}
        </p>
      )}

      {/* Domain pills */}
      {member.domain && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {member.domain.map((d) => (
            <span
              key={d}
              className="font-mono-tech text-[10px] tracking-[0.1em] px-2 py-0.5 rounded bg-[rgba(244,239,228,0.04)] border border-[rgba(244,239,228,0.07)] text-[rgba(244,239,228,0.45)]"
            >
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-[rgba(244,239,228,0.06)] mb-5" />

      {/* Bio — always shown, but extra lines revealed on expand */}
      <p className={`font-serif-body text-sm leading-[1.8] text-[rgba(244,239,228,0.58)] ${isSubject ? "italic" : ""} ${expanded ? "" : "line-clamp-3"}`}>
        {member.bio}
      </p>

      {/* Expand toggle */}
      <button
        className={`mt-4 self-start font-sans-ui text-xs tracking-[0.12em] uppercase flex items-center gap-1.5 ${accent.indexColor} opacity-60 hover:opacity-100 transition-opacity`}
        onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
      >
        <span>{expanded ? "Collapse" : "Read more"}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Credentials */}
      {member.credentials && expanded && (
        <div className="mt-5 pt-5 border-t border-[rgba(244,239,228,0.05)] flex flex-wrap gap-2 animate-fade-in-up">
          {member.credentials.map((c) => (
            <span
              key={c}
              className={`font-sans-ui text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${accent.badge}`}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Subtle corner accent */}
      <div
        className={`absolute bottom-0 right-0 w-20 h-20 rounded-xl overflow-hidden pointer-events-none`}
        aria-hidden
      >
        <div className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${accent.dot} opacity-30`} />
      </div>
    </div>
  )
}

export function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect() }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Split: core team (2) + subject (1)
  const mainTeam = TEAM.filter((m) => m.type !== "subject")
  const subject = TEAM.find((m) => m.type === "subject")!

  return (
    <section id="team" className="relative py-32 lg:py-40 bg-[#090a0d] overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-archival-grid opacity-40 pointer-events-none" aria-hidden />

      {/* Vertical rule */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(201,151,80,0.08)] to-transparent pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
          }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-6 h-px bg-[#c99750] opacity-60" />
            <span className="font-mono-tech text-[11px] tracking-[0.22em] uppercase text-[#c99750] opacity-60">
              The People
            </span>
          </div>

          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#f4efe4] mb-6">
              Built Across <br />
              <span className="text-[rgba(244,239,228,0.4)]">Two Centuries.</span>
            </h2>
            <p className="font-serif-body text-lg md:text-xl leading-relaxed text-[rgba(244,239,228,0.52)] max-w-2xl">
              Veridical Mind is the convergence of living research, institutional memory, and a nineteenth-century legacy that still resonates. The people behind it — and the one who inspired it.
            </p>
          </div>
        </div>

        {/* Main team grid — 2 columns on md, adaptive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {mainTeam.map((member, i) => (
            <MemberCard key={member.id} member={member} delay={i * 80} />
          ))}
        </div>

        {/* Subject — full-width archival card */}
        <div className="relative">
          {/* Label above */}
          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="flex-1 h-px bg-[rgba(201,151,80,0.08)]" />
            <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[rgba(201,151,80,0.35)]">
              The Foundation of the Archive
            </span>
            <div className="flex-1 h-px bg-[rgba(201,151,80,0.08)]" />
          </div>

          <MemberCard member={subject} delay={320} />
        </div>

        {/* Footer note */}
        <div
          className="mt-16 pt-8 border-t border-[rgba(244,239,228,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <p className="font-serif-body text-sm italic text-[rgba(244,239,228,0.3)] max-w-lg leading-relaxed">
            "The past is never where you think you left it." — Katherine Anne Porter
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,151,80,0.4)]" />
            <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[rgba(244,239,228,0.2)]">
              Somos Felices Foundation · India–Chile Axis
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
