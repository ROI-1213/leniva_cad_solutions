import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Smartphone,
  Tablet,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  WifiOff,
  Cloud,
  Camera,
  Mic,
  PenTool,
  Search,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Shield,
  Laptop,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { aresTouchData } from '../data/aresTouchData'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'touch-design', label: 'Touch CAD' },
  { id: 'precision', label: 'Precision' },
  { id: 'annotations', label: 'Annotations' },
  { id: 'freesketch', label: 'FreeSketch' },
  { id: 'cloud-offline', label: 'Cloud & Offline' },
  { id: 'trinity', label: 'ARES Trinity' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'developer', label: 'Developer' },
  { id: 'licensing', label: 'Licensing' },
  { id: 'faq', label: 'FAQ' },
]

export const AresTouchPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const data = aresTouchData

  // State management
  const [activeSection, setActiveSection] = useState('overview')
  const [activePrecisionTool, setActivePrecisionTool] = useState(0)
  const [activeWorkspace, setActiveWorkspace] = useState(2) // Default: Field -> ARES Touch
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [compCategory, setCompCategory] = useState<string>('all')

  // FreeSketch Interactive Demo State
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [penColor, setPenColor] = useState('#ef4444')
  const [hasDrawn, setHasDrawn] = useState(false)

  // Voice Note Sim State
  const [isRecordingSim, setIsRecordingSim] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)

  // SEO
  useEffect(() => {
    document.title = 'ARES Touch – Mobile CAD for DWG on Android & iOS | Graebert | Leniva'
    window.scrollTo(0, 0)
  }, [])

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // FreeSketch Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    // Draw background blueprint grid
    drawBlueprintBackground(ctx, rect.width, rect.height)
  }, [])

  const drawBlueprintBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    // Technical grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'
    ctx.lineWidth = 1
    for (let x = 0; x < width; x += 24) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += 24) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Sample CAD architectural walls
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 2
    ctx.strokeRect(40, 30, width - 80, height - 60)

    // Inner partitions
    ctx.beginPath()
    ctx.moveTo(width * 0.4, 30)
    ctx.lineTo(width * 0.4, height * 0.6)
    ctx.moveTo(width * 0.4, height * 0.75)
    ctx.lineTo(width * 0.4, height - 30)
    ctx.moveTo(40, height * 0.55)
    ctx.lineTo(width * 0.4, height * 0.55)
    ctx.stroke()

    // Dimension labels
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px Inter, sans-serif'
    ctx.fillText('ROOM 101 – MECHANICAL', 55, 60)
    ctx.fillText('ROOM 102 – ELECTRICAL', width * 0.45, 60)
    ctx.fillText('◄ 8,400 mm ►', width * 0.15, height - 40)
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    ctx.beginPath()
    ctx.moveTo(clientX - rect.left, clientY - rect.top)
    ctx.strokeStyle = penColor
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    setIsDrawing(true)
    setHasDrawn(true)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    ctx.lineTo(clientX - rect.left, clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    drawBlueprintBackground(ctx, rect.width, rect.height)
    setHasDrawn(false)
  }

  // Voice note timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecordingSim) {
      interval = setInterval(() => {
        setRecordingSeconds(prev => prev + 1)
      }, 1000)
    } else {
      setRecordingSeconds(0)
    }
    return () => clearInterval(interval)
  }, [isRecordingSim])

  // FAQ filtering
  const filteredFaqs = activeFaqCategory === 'all'
    ? data.faqs
    : data.faqs.filter(f => f.category === activeFaqCategory)

  // Comparison table filtering
  const compCategories = ['all', 'Core DWG & Editing', 'Annotation & Field Tools', 'Collaboration & Cloud', 'Ecosystem & Desktop', 'Developer']
  const filteredComparison = compCategory === 'all'
    ? data.comparisonTable
    : data.comparisonTable.filter(r => r.category === compCategory)

  return (
    <div className="min-h-screen bg-white font-inter text-slate-900">
      {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
            <span>/</span>
            <Link to="/products/cad-software" className="hover:text-slate-900 transition-colors">CAD Software</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">ARES Touch</span>
          </nav>
        </div>
      </div>

      {/* ── SUB-NAV (strictly non-sticky to avoid header overlap) ─────────── */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`whitespace-nowrap shrink-0 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0 py-2">
              <button
                onClick={() => openQuoteModal('ARES Touch Licensing Enquiry')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="overview" className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#071d33] to-[#042442] text-white py-16 lg:py-24">
        {/* Subtle CAD grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest">
                  {data.hero.eyebrow}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  Android & iOS Native
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium">
                  Part of ARES Trinity
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Professional CAD.<br />
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    Anywhere you work.
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-slate-200">
                  {data.hero.subheadline}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {data.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollTo('pricing')}
                  className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
                >
                  <span>Get ARES Touch</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('trinity')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Laptop className="w-4 h-4 text-sky-400" />
                  <span>Explore ARES Trinity</span>
                </button>
                <button
                  onClick={() => openQuoteModal('ARES Touch Consultation Call')}
                  className="px-4 py-3.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Request Indian INR Quote →
                </button>
              </div>

              {/* Floating Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                {data.hero.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-300 text-[11px] font-medium"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Visual: Interactive Device CAD Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Tablet Frame */}
                <div className="relative rounded-3xl bg-slate-900 p-4 border-2 border-slate-700 shadow-2xl overflow-hidden backdrop-blur-xl">
                  {/* Top Bar on Tablet */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-950/80 rounded-xl mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-mono text-slate-400 ml-2 text-[11px]">Level-3-HVAC-Layout.dwg</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[10px] font-bold">
                      ARES TOUCH 2025
                    </span>
                  </div>

                  {/* CAD Screen Simulation */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-[#0d1624]">
                    <img
                      src="/images/software/sections/aec-construction.jpg"
                      alt="ARES Touch CAD drawing on tablet"
                      className="w-full h-full object-cover opacity-85"
                    />

                    {/* Touch CAD Overlays */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-sky-400" />
                      <span>E-SNAP: Endpoint (X: 142.50, Y: 89.20)</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>TRINITY CLOUD SYNCED</span>
                    </div>

                    {/* Audio Note Pin */}
                    <div className="absolute bottom-12 left-6 bg-red-600/90 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                      <Mic className="w-3 h-3" />
                      <span>Voice Note #01 [0:18]</span>
                    </div>

                    {/* Photo Note Pin */}
                    <div className="absolute bottom-12 right-6 bg-amber-600/90 text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                      <Camera className="w-3 h-3" />
                      <span>Site Photo Attached</span>
                    </div>

                    {/* Bottom HUD Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 px-3 py-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>ORTHO: ON</span>
                      <span>GRID: 10mm</span>
                      <span>LOUPE: ACTIVE</span>
                      <span className="text-sky-400">TOUCH MODE</span>
                    </div>
                  </div>

                  {/* Flow Pills Below Device */}
                  <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[10px] font-mono font-bold text-slate-400">
                    <span className="p-1 rounded bg-slate-800/80 text-sky-300">SMARTPHONE</span>
                    <span className="p-1 rounded bg-slate-800/80 text-sky-300">TABLET</span>
                    <span className="p-1 rounded bg-slate-800/80 text-sky-300">CLOUD</span>
                    <span className="p-1 rounded bg-slate-800/80 text-sky-300">DESKTOP</span>
                  </div>
                </div>

                {/* Floating Pocket Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[200px] hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-600">Pure Mobility</p>
                  <p className="text-xs font-extrabold mt-0.5">Professional DWG in your pocket</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. PRODUCT MESSAGE STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-sky-50 border-b border-sky-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700">
            {data.productMessage.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            “{data.productMessage.statement}”
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.productMessage.description}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. PLATFORM SUPPORT (Google Play & Apple App Store)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {data.platforms.map(p => (
              <div
                key={p.id}
                className="rounded-3xl p-8 border-2 border-slate-200 hover:border-sky-500 bg-gradient-to-br from-slate-50 to-white shadow-sm hover:shadow-md transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                      {p.id === 'android' ? <Smartphone className="w-6 h-6" /> : <Tablet className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{p.name}</h3>
                      <p className="text-xs font-semibold text-sky-700">{p.subtitle}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                    {p.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {p.description}
                </p>

                <div className="pt-2 text-xs font-mono text-slate-500 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">Req:</span> {p.requirements}
                </div>

                <div className="pt-2">
                  <a
                    href={p.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-sky-600 text-white font-bold text-xs transition-colors"
                  >
                    <span>{p.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. WHAT IS ARES TOUCH & 6 CORE BENEFITS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Product Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.whatIs.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.whatIs.description}
            </p>
          </div>

          {/* 6 Core Benefit Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.coreBenefits.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-200 group-hover:text-sky-500 transition-colors">
                    {b.number}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                    {b.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. DESIGNED FOR TOUCH ERGONOMICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="touch-design" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Touch Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {data.designedForTouch.heading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {data.designedForTouch.description}
              </p>

              <div className="space-y-2.5">
                {data.designedForTouch.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gestures Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span>Standard Touch Gestures</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Sub-pixel Response</span>
              </div>

              <div className="space-y-4">
                {data.designedForTouch.gestures.map((g, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="font-bold text-sky-300">{g.gesture}</span>
                    <span className="text-slate-400">{g.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. PRECISION DRAWING (Interactive Tool Selector)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="precision" className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Micro-Accuracy</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.precisionDrawing.heading}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {data.precisionDrawing.description}
            </p>
          </div>

          {/* Interactive Precision Selector */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Tool List */}
            <div className="lg:col-span-6 space-y-3">
              {data.precisionDrawing.tools.map((t, idx) => {
                const isSelected = activePrecisionTool === idx
                return (
                  <button
                    key={t.id}
                    onClick={() => setActivePrecisionTool(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-sky-950/80 border-sky-400 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{t.name}</h4>
                          <p className="text-xs text-slate-400">{t.shortDesc}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        {t.badge}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Visual Canvas Display for Tool */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-[#071d33] border-2 border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">
                    Active Inspection Simulator
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    Snap Engine: Active
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">
                      {data.precisionDrawing.tools[activePrecisionTool].name}
                    </h3>
                    <p className="text-xs text-sky-300 font-mono">
                      {data.precisionDrawing.tools[activePrecisionTool].visualDetail}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    {data.precisionDrawing.tools[activePrecisionTool].description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800">
                    <span>X: 2540.00 mm</span>
                    <span>Y: 1820.50 mm</span>
                    <span className="text-emerald-400 font-bold">DELTA: 0.00 mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. COMPLETE 2D DRAFTING TOOLS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Full CAD Power</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.draftingTools.heading}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.draftingTools.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.draftingTools.categories.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-sky-600" />
                  <span>{cat.name}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 text-xs font-medium transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. DRAWING ANNOTATIONS (Picture & Voice Notes)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="annotations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Field Communication</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Annotate drawings wherever you are
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Capture visual ground truth and speak your feedback directly into DWG files. No typing, no miscommunication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Picture Notes Card */}
            <div className="rounded-3xl p-8 bg-slate-900 text-white border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">PICTURE NOTES</h3>
                    <p className="text-xs text-amber-300">Camera-to-DWG Linking</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                  Visual Note
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Take photos with your tablet or smartphone camera and attach them directly to any spot on your CAD drawing. A clickable marker appears, allowing everyone on ARES Trinity to view real site conditions.
              </p>

              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                {['CAMERA', 'PHOTO', 'DRAWING', 'COMMENT'].map((step, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="block text-amber-400 font-bold">0{idx + 1}</span>
                    <span className="text-slate-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Notes Card */}
            <div className="rounded-3xl p-8 bg-slate-900 text-white border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">VOICE NOTES</h3>
                    <p className="text-xs text-red-300">Spoken Audio Recordings</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold">
                  Hands-Free
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Record verbal feedback on site and anchor it to any element or clash. Teammates in the design office simply click the audio icon in ARES Commander or Kudo to listen without deciphering typed notes.
              </p>

              {/* Interactive Voice Sim */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setIsRecordingSim(!isRecordingSim)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isRecordingSim
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isRecordingSim ? 'Recording... (Click to Stop)' : 'Simulate Recording'}</span>
                </button>
                <span className="font-mono text-xs text-slate-400">
                  {isRecordingSim ? `00:0${recordingSeconds}` : '00:00 (Idle)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. FREESKETCH INTERACTIVE SANDBOX DEMO
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="freesketch" className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Interactive Feature Demo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              FreeSketch: Mark up drawings like pen on paper
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use your finger or mouse below to redline directly over this CAD floor plan. FreeSketch makes visual communication instant for anyone on the project.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-6 border-2 border-slate-800 shadow-2xl space-y-4">
            {/* Canvas Toolbar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Pen Color:</span>
                {[
                  { color: '#ef4444', label: 'Red' },
                  { color: '#38bdf8', label: 'Sky' },
                  { color: '#22c55e', label: 'Green' },
                  { color: '#eab308', label: 'Yellow' },
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setPenColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      penColor === c.color ? 'scale-110 border-white' : 'border-transparent opacity-75'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCanvas}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Clear Sketch
                </button>
                <button
                  onClick={() => openQuoteModal('FreeSketch Workflow Demo Request')}
                  className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  Save to DWG
                </button>
              </div>
            </div>

            {/* Interactive Drawing Canvas */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-800 cursor-crosshair">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full block"
              />

              {!hasDrawn && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300 font-medium animate-pulse">
                    ✍ Click and drag (or finger swipe) here to test FreeSketch
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              FreeSketch layers save directly inside the DWG and display as vector annotations inside ARES Kudo and ARES Commander.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. CLOUD + LOCAL STORAGE & OFFLINE WORKFLOW
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="cloud-offline" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Storage Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.cloudAndLocal.heading}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.cloudAndLocal.description}
            </p>
          </div>

          {/* 2 Panels: Cloud vs Local */}
          <div className="grid md:grid-cols-2 gap-8">
            {data.cloudAndLocal.panels.map(p => (
              <div
                key={p.id}
                className="rounded-3xl p-8 border-2 border-slate-200 bg-slate-50/50 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
                      {p.badge}
                    </span>
                    {p.id === 'cloud' ? <Cloud className="w-5 h-5 text-sky-600" /> : <WifiOff className="w-5 h-5 text-slate-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

                  <div className="space-y-2 pt-2">
                    {p.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Supported Storage:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.services.map((s, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 6-Step Offline Workflow */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Zero Internet Downtime</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {data.offlineWorkflow.heading}
              </h3>
              <p className="text-slate-400 text-xs">
                {data.offlineWorkflow.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {data.offlineWorkflow.steps.map(s => (
                <div key={s.step} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-sky-400">STEP {s.step}</span>
                  <h4 className="text-xs font-bold text-white uppercase">{s.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          11. ARES KUDO & ARES TRINITY ECOSYSTEM
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="trinity" className="py-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Unified CAD Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.aresTrinity.heading}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.aresTrinity.description}
            </p>
          </div>

          {/* 3 Trinity Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {data.aresTrinity.cards.map(c => (
              <div
                key={c.id}
                className={`rounded-3xl p-8 border-2 transition-all space-y-5 flex flex-col justify-between ${
                  c.isCurrent
                    ? 'border-sky-500 bg-sky-50/40 shadow-lg shadow-sky-500/5'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                      {c.role}
                    </span>
                    {c.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold">
                        THIS PAGE
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-slate-950">{c.name}</h3>
                  <p className="text-xs font-mono text-slate-500">{c.badge}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{c.highlight}</span>
                  <Link
                    to={c.link}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>View Product</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive "Choose Your Workspace" Selector */}
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white space-y-6">
            <h3 className="text-lg font-bold text-white text-center">
              Where are you working right now?
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.workspaceSelector.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkspace(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    activeWorkspace === idx
                      ? 'bg-sky-950 border-sky-400 text-white shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-[10px] font-mono text-sky-400 font-bold uppercase">{w.place}</p>
                  <h4 className="text-sm font-bold text-white mt-1">{w.recommended}</h4>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{w.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          12. TOP 5 USE CASES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="use-cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Field Applications</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Top 5 real-world mobile CAD use cases
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              From site survey to customer boardroom, ARES Touch delivers high-precision results across industries.
            </p>
          </div>

          <div className="space-y-6">
            {data.topUseCases.map(u => (
              <div
                key={u.id}
                className="rounded-3xl border border-slate-200 p-6 sm:p-8 hover:border-sky-400 hover:shadow-md transition-all grid lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-sky-600">{u.number}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{u.title}</h3>
                      <p className="text-xs font-semibold text-slate-500">{u.tagline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{u.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {u.benefits.map((b, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        ✓ {b}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-mono text-sky-700 font-semibold pt-1">
                    Recommended for: {u.role}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <img
                    src={u.image}
                    alt={u.title}
                    className="w-full aspect-[4/3] object-cover rounded-2xl shadow-sm border border-slate-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          13. DEVELOPER PLATFORM & ENTERPRISE
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="developer" className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Developer API */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Developer Platform</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {data.developer.heading}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {data.developer.description}
              </p>

              <div className="space-y-4">
                {data.developer.languages.map(l => (
                  <div key={l.lang} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-xs font-mono font-bold text-sky-400">{l.lang}</span>
                    <h4 className="text-sm font-bold text-white">{l.title}</h4>
                    <p className="text-xs text-slate-400">{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Customer: Taisei Corporation */}
            <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-sky-400 uppercase font-bold">Enterprise Case Study</span>
                  <h3 className="text-2xl font-black text-white">{data.enterprise.customer.name}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                  {data.enterprise.customer.stats}
                </span>
              </div>

              <blockquote className="text-sm text-slate-300 italic leading-relaxed">
                “{data.enterprise.customer.quote}”
              </blockquote>

              <p className="text-xs text-slate-400 leading-relaxed">
                {data.enterprise.customer.highlight}
              </p>

              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                {data.enterprise.customer.technologies.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md bg-slate-950 text-sky-300 text-xs font-semibold border border-slate-800">
                    🔒 {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          14. PRICING & COMPARISON TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">Commercial Licensing</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.pricing.heading}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {data.pricing.subheading}
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {data.pricing.plans.map(plan => {
              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-8 border-2 transition-all flex flex-col justify-between ${
                    plan.isPopular
                      ? 'border-red-600 bg-red-50/20 shadow-xl shadow-red-600/5'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                        {plan.badge}
                      </span>
                      {plan.isPopular && (
                        <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold">
                          ALL-IN-ONE
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-slate-950">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Includes:</p>
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}

                      {plan.notIncluded && plan.notIncluded.length > 0 && (
                        <div className="pt-2 space-y-1.5 opacity-60">
                          {plan.notIncluded.map((nf, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                              <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                              <span className="line-through">{nf}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => openQuoteModal(`${plan.name} Licensing Enquiry`)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        plan.isPopular
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                          : 'bg-slate-950 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Feature Comparison Table */}
          <div className="pt-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xl font-bold text-slate-950">Full Feature Comparison</h3>
              <div className="flex flex-wrap gap-1.5">
                {compCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCompCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      compCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Features' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-6 py-4 font-bold text-slate-700 w-2/5">Feature</th>
                    <th className="px-4 py-4 font-bold text-slate-700 text-center">Mobile-Only</th>
                    <th className="px-4 py-4 font-bold text-slate-700 text-center">Professional</th>
                    <th className="px-4 py-4 font-bold text-sky-700 bg-sky-50 text-center">ARES Trinity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComparison.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="px-6 py-3.5 font-medium text-slate-800">
                        {r.feature}
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{r.category}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {typeof r.mobileOnly === 'boolean' ? (
                          r.mobileOnly ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          <span className="text-slate-600">{r.mobileOnly}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {typeof r.professional === 'boolean' ? (
                          r.professional ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          <span className="text-slate-600">{r.professional}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center bg-sky-50/40 font-bold">
                        {typeof r.trinity === 'boolean' ? (
                          r.trinity ? <Check className="w-4 h-4 text-sky-600 mx-auto" /> : <span className="text-slate-300">—</span>
                        ) : (
                          <span className="text-sky-700">{r.trinity}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          15. FREE MODE & INSTALLATION STEPS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Free Mode Explanation */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Unlimited Free Mode
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                {data.freeMode.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {data.freeMode.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase">Included Free Forever:</span>
                  {data.freeMode.freeIncludes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-sky-700 uppercase">Unlocked with Subscription:</span>
                  {data.freeMode.premiumRequires.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 text-center p-6 bg-slate-900 text-white rounded-2xl">
              <h4 className="text-base font-bold">Get started in 3 simple steps</h4>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="block text-white">Download from App Store / Google Play</strong>
                    <span className="text-slate-400">Install ARES Touch on your smartphone or tablet.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="block text-white">Sign In with Graebert Account</strong>
                    <span className="text-slate-400">Log in using your existing ARES or company credentials.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="w-6 h-6 rounded-full bg-sky-500 text-slate-950 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="block text-white">Activate & Start Drafting</strong>
                    <span className="text-slate-400">Free mode begins instantly, or your Trinity subscription activates.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
            <h4 className="text-base font-bold text-slate-950 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-600" />
              <span>Official System Requirements</span>
            </h4>
            <p className="text-xs text-slate-500">{data.systemRequirements.notice}</p>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <strong className="block text-sm text-slate-900 font-bold mb-2">Android Devices</strong>
                <p><span className="text-slate-500">OS:</span> {data.systemRequirements.android.os}</p>
                <p><span className="text-slate-500">RAM:</span> {data.systemRequirements.android.ram}</p>
                <p><span className="text-slate-500">CPU:</span> {data.systemRequirements.android.processor}</p>
                <p><span className="text-slate-500">Storage:</span> {data.systemRequirements.android.storage}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <strong className="block text-sm text-slate-900 font-bold mb-2">iOS & iPadOS Devices</strong>
                <p><span className="text-slate-500">OS:</span> {data.systemRequirements.ios.os}</p>
                <p><span className="text-slate-500">Hardware:</span> {data.systemRequirements.ios.devices}</p>
                <p><span className="text-slate-500">Stylus:</span> {data.systemRequirements.ios.stylus}</p>
                <p><span className="text-slate-500">Storage:</span> {data.systemRequirements.ios.storage}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          16. FAQ SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">Knowledge Base</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about ARES Touch, ARES Trinity, and mobile DWG workflows.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
              {[
                { id: 'all', label: 'All' },
                { id: 'general', label: 'General' },
                { id: 'features', label: 'Features' },
                { id: 'cloud-offline', label: 'Cloud & Offline' },
                { id: 'trinity-kudo', label: 'ARES Trinity & Kudo' },
                { id: 'pricing-licensing', label: 'Licensing Options' },
                { id: 'developer-enterprise', label: 'Developer & Enterprise' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFaqCategory(cat.id)
                    setOpenFaqIndex(null)
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeFaqCategory === cat.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-sky-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sky-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          17. FINAL CALL TO ACTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-[#071d33] to-[#042442] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider">
            Connected CAD Mobility
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Take your DWG workflow anywhere.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            View, edit, measure, annotate, and collaborate on your DWG drawings directly from your Android or iOS smartphone and tablet. Backed by Leniva CAD Solutions’ authorized Indian technical support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('pricing')}
              className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-sky-500/20"
            >
              Get ARES Touch
            </button>
            <button
              onClick={() => openQuoteModal('ARES Touch Official Indian Quotation')}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Request Official Quotation
            </button>
          </div>

          <p className="text-xs text-slate-400 pt-4">
            Graebert Authorized Partner in India: Leniva CAD Solutions · GST Invoicing & Onboarding Support Available
          </p>
        </div>
      </section>
    </div>
  )
}

export default AresTouchPage
