import { useEffect, useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Loader2,
  Menu,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react"

const pillars = [
  {
    number: "01",
    title: "Historical AI",
    icon: Sparkles,
    description:
      "New ways to encounter the people and stories that shaped our history, bringing cultural memory into conversation with technology.",
  },
  {
    number: "02",
    title: "Learning & Opportunity",
    icon: BookOpen,
    description:
      "Accessible learning experiences that help young people discover technology, develop practical skills and imagine new possibilities.",
  },
  {
    number: "03",
    title: "Museo Interactivo",
    icon: Building2,
    description:
      "An evolving cultural experience dedicated to history, heritage and the people whose stories continue to shape Chile.",
  },
]

type Evidence = {
  udv_id: string
  source_doc: string
  source_type: string
  content: string
  similarity: number
  ir: number
}

type QueryResult = {
  category: string
  response: string
  llm_invoked: boolean
  evidence: Evidence[]
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const askIsidora = async (question = query) => {
    const clean = question.trim()
    if (!clean || loading) return

    setQuery(clean)
    setLoading(true)
    setError("")
    setAnswer(null)

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: clean }),
      })

      if (!response.ok) throw new Error("Unable to reach Veridical Mind.")

      const data = (await response.json()) as QueryResult
      setAnswer(data)
    } catch {
      setError(
        "The historical experience is temporarily unavailable. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f1e8] text-[#172033]">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#172033]/10 bg-[#f4f1e8]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <a
            href="#top"
            onClick={closeMenu}
            className="relative z-10 text-sm font-semibold uppercase tracking-[0.2em]"
          >
            Somos Felices
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            <a href="#about" className="nav-link">About</a>
            <a href="#pillars" className="nav-link">Our work</a>
            <a href="#isidora" className="nav-link">Isidora AI</a>
            <a href="#museum" className="nav-link">Museum</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative z-10 rounded-full border border-[#172033]/15 p-2.5 md:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          {menuOpen && (
            <div className="absolute inset-x-0 top-0 min-h-screen bg-[#f4f1e8] px-6 pt-28 md:hidden">
              <nav className="flex flex-col gap-7 text-4xl font-medium tracking-[-0.04em]">
                <a href="#about" onClick={closeMenu}>About</a>
                <a href="#pillars" onClick={closeMenu}>Our work</a>
                <a href="#isidora" onClick={closeMenu}>Isidora AI</a>
                <a href="#museum" onClick={closeMenu}>Museum</a>
                <a href="#contact" onClick={closeMenu}>Contact</a>
              </nav>
              <div className="mt-20 border-t border-[#172033]/10 pt-6 text-sm text-[#172033]/50">
                Tecnolog�a � Historia � Oportunidad
              </div>
            </div>
          )}
        </div>
      </header>

      <main id="top">
        <section className="relative flex min-h-[92vh] items-end overflow-hidden px-6 pb-16 pt-32 lg:min-h-screen lg:px-10 lg:pb-20">
          <div className="pointer-events-none absolute right-[-12%] top-[12%] h-[55vw] w-[55vw] max-h-[760px] max-w-[760px] rounded-full border border-[#172033]/10" />
          <div className="pointer-events-none absolute right-[4%] top-[25%] h-[34vw] w-[34vw] max-h-[500px] max-w-[500px] rounded-full border border-[#172033]/10" />

          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <div className="max-w-6xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#172033]/45 animate-fade-up">
                <span className="h-px w-8 bg-[#172033]/30" />
                Tecnolog�a � Historia � Oportunidad
              </div>

              <h1 className="max-w-6xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.83] tracking-[-0.075em] animate-fade-up-delay">
                Technology
                <br />
                <span className="text-[#172033]/45">with purpose.</span>
              </h1>

              <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-xl text-lg leading-8 text-[#172033]/65 lg:text-xl">
                  Somos Felices brings together technology, education and
                  cultural heritage to create experiences that connect people
                  with knowledge, history and opportunity.
                </p>

                <a
                  href="#isidora"
                  className="group flex w-fit items-center gap-3 text-sm font-semibold"
                >
                  Meet Isidora
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#172033]/20 transition duration-300 group-hover:bg-[#172033] group-hover:text-[#f4f1e8]">
                    <ArrowDownRight size={18} />
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-16 flex items-center justify-between border-t border-[#172033]/10 pt-5 text-xs text-[#172033]/40">
              <span>Asociaci�n Cultural Somos Felices</span>
              <span>Chile � 2026</span>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-[#172033]/10 bg-[#e9e5da]">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 lg:grid-cols-[0.7fr_1.8fr] lg:px-10 lg:py-36">
            <span className="section-label">01 / About</span>
            <div>
              <h2 className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Building experiences where technology serves people, learning
                and memory.
              </h2>
              <div className="mt-12 grid gap-10 border-t border-[#172033]/15 pt-8 sm:grid-cols-2">
                <p className="max-w-md text-base leading-7 text-[#172033]/60">
                  We explore how technology can make knowledge more accessible,
                  create new ways of learning and bring cultural heritage
                  closer to new generations.
                </p>
                <p className="max-w-md text-base leading-7 text-[#172033]/60">
                  Our work sits at the intersection of culture, education and
                  emerging technology, always keeping people and their stories
                  at the centre.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pillars" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <span className="section-label">02 / What we do</span>
              <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-none tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                Three ways
                <br />
                <span className="text-[#172033]/35">forward.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#172033]/50">
              Three connected areas through which Somos Felices explores the
              relationship between technology, culture and opportunity.
            </p>
          </div>

          <div className="grid border-l border-t border-[#172033]/15 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <article
                  key={pillar.number}
                  className="group min-h-[430px] border-b border-r border-[#172033]/15 p-7 transition-colors duration-500 hover:bg-[#172033] hover:text-[#f4f1e8] lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-medium opacity-40">{pillar.number}</span>
                    <Icon size={24} strokeWidth={1.4} className="opacity-60 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <div className="mt-32">
                    <h3 className="text-3xl font-medium tracking-[-0.04em]">{pillar.title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-7 opacity-55">{pillar.description}</p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-40">
                    Discover <ArrowUpRight size={14} />
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="isidora" className="bg-[#172033] px-6 py-24 text-[#f4f1e8] lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr]">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                  <Sparkles size={15} />
                  Historical AI
                </div>
                <h2 className="mt-7 text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                  Meet
                  <br />
                  <span className="text-white/35">Isidora.</span>
                </h2>
                <p className="mt-8 max-w-sm text-sm leading-7 text-white/50">
                  Ask about the historical record. Veridical Mind retrieves
                  documentary evidence before allowing an answer.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl sm:p-6">
                <div className="flex items-center justify-between border-b border-white/10 px-2 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f1e8] text-[#172033]">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Isidora Goyenechea</div>
                      <div className="text-xs text-white/35">Evidence grounded historical AI</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-emerald-300/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Verified mode
                  </div>
                </div>

                <div className="min-h-[270px] px-2 py-7">
                  {!answer && !loading && !error && (
                    <div className="flex h-[230px] flex-col items-center justify-center text-center">
                      <ShieldCheck size={30} strokeWidth={1.3} className="text-white/30" />
                      <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
                        Ask a question about Isidora and explore what the
                        documentary record can support.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {[
                          "Who designed Palacio Cousino?",
                          "Tell me about Parque de Lota.",
                          "What was Isidora's favorite color?",
                        ].map((item) => (
                          <button
                            key={item}
                            onClick={() => askIsidora(item)}
                            className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition hover:border-white/25 hover:text-white"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {loading && (
                    <div className="flex h-[230px] items-center justify-center gap-3 text-sm text-white/45">
                      <Loader2 size={18} className="animate-spin" />
                      Checking the historical record...
                    </div>
                  )}

                  {error && (
                    <div className="rounded-2xl border border-red-300/15 bg-red-300/5 p-5 text-sm text-red-100/70">
                      {error}
                    </div>
                  )}

                  {answer && !loading && (
                    <div>
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        answer.category === "C"
                          ? "bg-amber-200/10 text-amber-200/80"
                          : "bg-emerald-200/10 text-emerald-200/80"
                      }`}>
                        {answer.category === "C" ? (
                          <ShieldCheck size={13} />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                        {answer.category === "C" ? "Insufficient evidence" : "Evidence grounded"}
                      </div>

                      <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-white/80">
                        {answer.response}
                      </p>

                      {answer.evidence.length > 0 && (
                        <div className="mt-8 border-t border-white/10 pt-6">
                          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                            Documentary evidence
                          </div>
                          <div className="space-y-2">
                            {answer.evidence.slice(0, 3).map((item) => (
                              <div
                                key={item.udv_id}
                                className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"
                              >
                                <div className="text-xs font-medium text-white/65">
                                  {item.source_doc}
                                </div>
                                <div className="mt-1 line-clamp-2 text-xs leading-5 text-white/35">
                                  {item.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    askIsidora()
                  }}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 p-2"
                >
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ask about Isidora..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/25"
                  />
                  <button
                    type="submit"
                    disabled={!query.trim() || loading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4f1e8] text-[#172033] transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Send size={17} />
                  </button>
                </form>

                <div className="px-2 pt-4 text-[10px] leading-5 text-white/25">
                  Answers are constrained by the available documentary record.
                  Unsupported questions are intentionally not generated.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="museum" className="relative overflow-hidden bg-[#e9e5da]">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-[#172033]/10" />
          <div className="relative mx-auto grid max-w-[1440px] gap-16 px-6 py-24 lg:grid-cols-[1.4fr_0.8fr] lg:items-end lg:px-10 lg:py-36">
            <div>
              <span className="section-label">03 / Museo Interactivo</span>
              <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                Remember the people who shaped the story.
              </h2>
            </div>
            <div>
              <div className="mb-7 text-sm text-[#172033]/45">Isidora Goyenechea</div>
              <p className="max-w-md text-base leading-7 text-[#172033]/55">
                The Museo Interactivo Isidora Goyenechea brings history closer
                through an experience designed for discovery, conversation and
                connection.
              </p>
              <div className="mt-10 h-px w-full bg-[#172033]/15" />
              <p className="mt-5 text-xs uppercase tracking-[0.16em] text-[#172033]/35">
                Chilean cultural heritage
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.8fr]">
            <span className="section-label">04 / Contact</span>
            <div>
              <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                Let's build
                <br />
                <span className="text-[#172033]/35">something meaningful.</span>
              </h2>
              <div className="mt-12 flex flex-col gap-8 border-t border-[#172033]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-base leading-7 text-[#172033]/55">
                  For collaborations, cultural projects, educational
                  initiatives or general enquiries, get in touch with Somos Felices.
                </p>
                <a
                  href="mailto:info@somosfelices.com"
                  className="group flex w-fit items-center gap-4 rounded-full bg-[#172033] px-6 py-4 text-sm font-medium text-[#f4f1e8] transition hover:gap-6"
                >
                  info@somosfelices.com
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#172033]/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-8 text-xs text-[#172033]/45 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>� 2026 Asociaci�n Cultural Somos Felices</span>
          <div className="flex gap-7">
            <a href="#about">About</a>
            <a href="#pillars">Our work</a>
            <a href="#isidora">Isidora AI</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
