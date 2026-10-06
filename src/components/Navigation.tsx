import React, { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  onOpenDemo?: () => void
}

export const Navigation: React.FC<NavigationProps> = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#c99750]/25 bg-[#090a0d]/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-3"
            : "border-b border-white/[0.06] bg-[#090a0d]/70 backdrop-blur-md py-4"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Brand Mark with generous breathing room */}
          <a
            href="#top"
            className="group flex items-center gap-3.5 text-left focus:outline-none shrink-0"
            aria-label="Somos Felices & Veridical Mind Home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded border border-[#c99750]/40 bg-[#14161f] text-[#c99750] shadow-inner transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-sm font-semibold tracking-wider">VM</span>
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#c99750] animate-ping opacity-60" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs sm:text-sm font-semibold tracking-[0.16em] text-[#f4efe4] uppercase whitespace-nowrap">
                  Somos Felices
                </span>
                <span className="text-[9px] text-[#c99750] font-mono-tech tracking-wider px-1.5 py-0.5 rounded border border-[#c99750]/30 bg-[#c99750]/10 shrink-0">
                  CORE
                </span>
              </div>
              <span className="font-mono-tech text-[9px] tracking-[0.22em] text-[#c99750]/70 uppercase whitespace-nowrap">
                Veridical Mind
              </span>
            </div>
          </a>

          {/* Desktop Nav - with plenty of gap and high-contrast hover */}
          <nav className="hidden xl:flex items-center gap-7 lg:gap-8 ml-8" aria-label="Main Navigation">
            <a
              href="#thesis"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              01 / Thesis
            </a>
            <a
              href="#pipeline"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              02 / Architecture
            </a>
            <a
              href="#isidora"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              03 / Experience
            </a>
            <a
              href="#governance"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              04 / Governance
            </a>
            <a
              href="#archive"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              05 / Archive
            </a>
            <a
              href="#institution"
              className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#f4efe4]/60 hover:text-[#c99750] transition-colors whitespace-nowrap"
            >
              06 / Mission
            </a>
          </nav>

          {/* CTA & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">

            {/* Mobile / Tablet Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] text-[#f4efe4] hover:border-[#c99750]/40 hover:text-[#c99750] xl:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090a0d]/98 px-6 pt-28 pb-12 flex flex-col justify-between xl:hidden border-b border-[#c99750]/20 backdrop-blur-2xl animate-fade-up">
          <div className="flex flex-col gap-6">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-[#c99750]">
              Index Navigation
            </span>
            <nav className="flex flex-col gap-5 text-2xl font-display font-light">
              <a
                href="#thesis"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                01. The Core Thesis
              </a>
              <a
                href="#pipeline"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                02. Five-Stage Pipeline
              </a>
              <a
                href="#isidora"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                03. Isidora Experience
              </a>
              <a
                href="#governance"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                04. Governance States (A / B / C)
              </a>
              <a
                href="#archive"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                05. Documentary Corpus
              </a>
              <a
                href="#institution"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#f4efe4]/80 hover:text-[#c99750] transition-colors"
              >
                06. Somos Felices Mission
              </a>
            </nav>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center justify-between text-xs font-mono-tech text-[#f4efe4]/40">
              <span>Santiago & Valparaíso, Chile</span>
              <span>Evidence-Governed AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
