import React from "react"
import { Sparkles } from "lucide-react"

interface FloatingIsidoraProps {
  onOpenDemo?: () => void
}

export const FloatingIsidora: React.FC<FloatingIsidoraProps> = ({ onOpenDemo }) => (
  <a
    href="#isidora"
    onClick={onOpenDemo}
    aria-label="Ask Isidora"
    title="Ask Isidora"
    className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#c99750]/60 bg-[#0b0c0e]/90 text-[#e0b472] shadow-[0_6px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#c99750] hover:bg-[#c99750] hover:text-[#0b0c0e]"
  >
    <Sparkles size={15} />
  </a>
)
