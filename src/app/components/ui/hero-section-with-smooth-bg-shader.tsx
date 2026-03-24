// components/ui/hero-section-with-smooth-bg-shader.tsx

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  title?: string
  highlightText?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
  maxWidth?: string
  veilOpacity?: string
  fontFamily?: string
  fontWeight?: number
}

// Tarali brand-aligned color presets
const COLOR_PRESETS: { name: string; colors: string[] }[] = [
  {
    name: "Default",
    colors: ["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"],
  },
  {
    name: "Tarali Blue",
    colors: ["#008DD5", "#0084d1", "#00a6f4", "#b5d9d9", "#006BA3", "#e0f4ff"],
  },
  {
    name: "Ocean Deep",
    colors: ["#0084d1", "#006BA3", "#004f7c", "#0097b2", "#00c6cf", "#b5d9d9"],
  },
  {
    name: "Hero Dark",
    colors: ["#9810fa", "#0084d1", "#861043", "#fdc700", "#d08700", "#00a6f4"],
  },
  {
    name: "Sunset",
    colors: ["#fdc700", "#f79009", "#861043", "#ff6b6b", "#ffd1bd", "#ffebe0"],
  },
  {
    name: "Forest",
    colors: ["#12B76A", "#8cc5b8", "#dbf4a4", "#006BA3", "#72b9bb", "#b5d9d9"],
  },
]

export function HeroSection({
  title = "Find the Right",
  highlightText = "Divorce Professional",
  description = "Answer a few simple questions through our AI assistant and get matched with the right legal professional for your situation.",
  buttonText = "Get Started",
  onButtonClick,
  colors: initialColors = COLOR_PRESETS[1].colors, // Tarali Blue by default
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-black/30",
  fontFamily = "Satoshi, sans-serif",
  fontWeight = 700,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)
  const [activeColors, setActiveColors] = useState<string[]>(initialColors)
  const [customColors, setCustomColors] = useState<string[]>(initialColors)
  const [activePreset, setActivePreset] = useState<string>("Tarali Blue")
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handlePresetSelect = (preset: { name: string; colors: string[] }) => {
    setActiveColors(preset.colors)
    setCustomColors(preset.colors)
    setActivePreset(preset.name)
  }

  const handleCustomColorChange = (index: number, value: string) => {
    const updated = [...customColors]
    updated[index] = value
    setCustomColors(updated)
    setActiveColors(updated)
    setActivePreset("Custom")
  }

  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center ${className}`}
    >
      {/* Background shader */}
      <div className="fixed inset-0 w-screen h-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={activeColors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
          </>
        )}
      </div>

      {/* Hero content */}
      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        <div className="text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
            Find Your Divorce Professional Today
            <span>→</span>
          </div>

          <h1
            className={`font-bold text-white text-balance text-4xl sm:text-5xl md:text-6xl xl:text-[72px] leading-tight mb-6 ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title}{" "}
            <span className="text-[#008DD5]">{highlightText}</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-white/70 text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 ${descriptionClassName}`}
          >
            {description}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onButtonClick}
              className={`px-8 py-4 rounded-full bg-white text-black font-bold text-base hover:bg-white/90 transition-all hover:-translate-y-0.5 ${buttonClassName}`}
            >
              {buttonText}
            </button>
            <button className="px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-all">
              Join as a Professional
            </button>
          </div>
        </div>
      </div>

      {/* ── Color Settings Panel ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Toggle button */}
        <button
          onClick={() => setPanelOpen((p) => !p)}
          className="w-12 h-12 rounded-full bg-[#008DD5] text-white shadow-lg flex items-center justify-center hover:bg-[#006BA3] transition-colors"
          title="Background color settings"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          </svg>
        </button>

        {/* Panel */}
        {panelOpen && (
          <div className="absolute bottom-16 right-0 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-5 text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-gray-900">Background Colors</h3>
              <button
                onClick={() => setPanelOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Presets</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    activePreset === preset.name
                      ? "border-[#008DD5] bg-[#008DD5]/10 text-[#008DD5]"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {/* Mini swatch strip */}
                  <div className="flex gap-0.5 shrink-0">
                    {preset.colors.slice(0, 3).map((c, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/50"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Custom color pickers */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Custom Colors
              {activePreset === "Custom" && (
                <span className="ml-2 text-[#008DD5]">● active</span>
              )}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {customColors.map((color, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  <div
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 group-hover:border-[#008DD5] transition-colors overflow-hidden"
                    style={{ background: color }}
                  >
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleCustomColorChange(index, e.target.value)}
                      className="w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {color.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>

            <p className="text-[10px] text-gray-400 mt-3 text-center">
              Click a swatch to pick a custom color
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
