import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Phone,
  Scan,
  ShieldCheck,
  Maximize2,
  X,
  Settings,
  Car,
  Plane,
  Gauge,
  HeartPulse,
  Landmark,
  Crosshair,
  Download,
  FileText,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { devokMTData as defaultDevokMTData } from '../data/scannersData'
import { mergeCatalogWithHardwareData } from '../utils/productCatalog'

export const DevokMTPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const devokMTData = mergeCatalogWithHardwareData('3devok-mt', defaultDevokMTData)
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null)
  const [activeTechIndex, setActiveTechIndex] = useState(0)

  const heroViews = [
    {
      id: 'action',
      label: 'In-Hand Operation',
      src: '/images/scanners/3devok-in-hand-action.png',
      badge: 'In-Hand Operation',
      subBadge: 'Industrial Ergonomics',
      desc: 'Real-world shop-floor operation with dual-grip balanced handling.',
    },
    {
      id: 'architecture',
      label: 'Sensor Architecture',
      src: '/images/scanners/3devok-sensor-architecture.png',
      badge: 'Optical Architecture',
      subBadge: 'Multi-Laser & Sensor Callouts',
      desc: 'Complete optical array: dual B&W cameras, RGB color sensor, 34 blue + 22 IR laser lines, and touch display.',
    },
    {
      id: 'render',
      label: '3D Studio Model',
      src: devokMTData.heroImage,
      badge: 'Industrial Grade',
      subBadge: '34 Blue + 22 IR Lasers',
      desc: 'Precision laser scanning with VDI/VDE 2634 compliant accuracy.',
    },
  ]
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

  const applicationIcons: Record<string, React.ReactNode> = {
    Car: <Car className="w-5 h-5 text-blue-500" />,
    Plane: <Plane className="w-5 h-5 text-sky-500" />,
    Cog: <Settings className="w-5 h-5 text-amber-500" />,
    Settings: <Settings className="w-5 h-5 text-indigo-500" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    Gauge: <Gauge className="w-5 h-5 text-rose-500" />,
    HeartPulse: <HeartPulse className="w-5 h-5 text-pink-500" />,
    Landmark: <Landmark className="w-5 h-5 text-teal-500" />,
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* ====================================================
          1. HERO SECTION: 3DeVOK MT
         ==================================================== */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-14 lg:py-20 border-b border-slate-800">
        {/* Subtle grid pattern & glows */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/3d-scanners" className="hover:text-white transition-colors">3D Scanners</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-red-400 font-semibold">{devokMTData.modelName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: Product Visual with Presentation Box */}
            <div className="order-1 lg:order-1 lg:col-span-6 relative">
              {/* Interactive View Switcher Tabs */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Hardware Visual View
                </span>
                <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800">
                  {heroViews.map((view, idx) => (
                    <button
                      key={view.id}
                      onClick={() => setActiveHeroIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeHeroIndex === idx
                          ? 'bg-blue-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Presentation Box */}
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-4 sm:p-6 border border-slate-800 shadow-2xl flex items-center justify-center group overflow-hidden min-h-[380px] sm:min-h-[420px]">
                {/* Visual spotlight halo */}
                <div className="absolute w-72 h-72 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                {/* Active Image Display */}
                {activeHeroIndex === 0 && (
                  <img
                    src="/images/scanners/3devok-in-hand-action.png"
                    alt="3DeVOK Scanner In-Hand Operation"
                    className="w-full h-80 sm:h-96 md:h-[400px] object-cover rounded-2xl select-none transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                  />
                )}

                {activeHeroIndex === 1 && (
                  <div className="w-full h-80 sm:h-96 md:h-[400px] bg-white rounded-2xl p-3 flex items-center justify-center shadow-inner overflow-hidden">
                    <img
                      src="/images/scanners/3devok-sensor-architecture.png"
                      alt="3DeVOK Sensor Architecture Callouts"
                      className="w-full h-full object-contain select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {activeHeroIndex === 2 && (
                  <img
                    src={devokMTData.heroImage}
                    alt={devokMTData.name}
                    className="w-full max-h-[380px] object-contain select-none transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                  />
                )}

                {/* Floating Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md shadow-md">
                    {heroViews[activeHeroIndex].badge}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold border border-slate-700 rounded shadow">
                    {heroViews[activeHeroIndex].subBadge}
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 shadow-lg text-[11px] font-mono text-slate-300 z-20">
                  Weight: <strong className="text-white">890 g</strong>
                </div>

                <button
                  onClick={() => setSelectedGalleryImg(heroViews[activeHeroIndex].src)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow cursor-pointer z-20"
                  title="Expand image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Clickable Image Thumbnails Bar */}
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {heroViews.map((view, idx) => (
                  <button
                    key={view.id}
                    onClick={() => setActiveHeroIndex(idx)}
                    className={`relative rounded-xl overflow-hidden border p-1.5 flex items-center space-x-2 transition-all cursor-pointer text-left ${
                      activeHeroIndex === idx
                        ? 'border-blue-500 bg-slate-800 shadow-md ring-1 ring-blue-500'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <img
                      src={view.src}
                      alt={view.label}
                      className="w-12 h-10 object-cover rounded-lg shrink-0 bg-slate-950"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-white block truncate leading-tight">
                        {view.label}
                      </span>
                      <span className="text-[9px] text-slate-400 block truncate">
                        {idx === 0 ? 'Live in-hand' : idx === 1 ? 'Sensor callouts' : '3D CAD render'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Spec Bar below image */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">ACCURACY</span>
                  <strong className="text-white font-bold text-sm">0.04 mm</strong>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">RESOLUTION</span>
                  <strong className="text-white font-bold text-sm">0.05 mm</strong>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">SPEED</span>
                  <strong className="text-emerald-400 font-bold text-sm">3.5M pts/s</strong>
                </div>
              </div>
            </div>

            {/* RIGHT: Typography, Description & CTAs */}
            <div className="order-2 lg:order-2 lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Crosshair className="w-3.5 h-3.5" />
                <span>Industrial Inspection & Reverse Engineering</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {devokMTData.modelName}
                </h1>
                <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-red-400 mt-1">
                  {devokMTData.tagline}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {devokMTData.description}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openQuoteModal('3DeVOK MT - Demo Request')}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Scan className="w-4 h-4" />
                  <span>Request a Demo</span>
                </button>
                <a
                  href={devokMTData.brochureUrl || '/brochures/3devok-mt.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>View Brochure</span>
                </a>
                <a
                  href={devokMTData.brochureUrl || '/brochures/3devok-mt.pdf'}
                  download="3devok-mt-brochure.pdf"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-red-400" />
                  <span>Download Brochure</span>
                </a>
                <button
                  onClick={() => openQuoteModal('3DeVOK MT - Technical Expert Consultation')}
                  className="px-6 py-3.5 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-white/10 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Talk to an Expert</span>
                </button>
              </div>

              {/* Trust Line */}
              <div className="pt-6 border-t border-slate-800/80 flex items-start space-x-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white font-semibold">{devokMTData.trustLine}</strong> backed by Leniva CAD Solutions technical onboarding and calibration services across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. MT CORE FEATURES (4 LARGE BLOCKS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Industrial Performance Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            High Precision Under Any Workshop Condition
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered for high-volume manufacturing environments, tight aerospace tolerances, and demanding automotive toolrooms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {devokMTData.features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200 rounded-md">
                    {feat.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {feat.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="w-8 h-1 bg-blue-600 rounded-full mt-5 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Quality & QC Assurance Banner */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 rounded-2xl p-6 sm:p-8 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                VDI/VDE 2634 Part 3 Compliance & Direct Inspection Software Live-Link
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Certified volumetric accuracy traceable to international measurement standards. Seamless live plugin with Geomagic Control X, PolyWorks, GOM Inspect, and QuickSurface.
              </p>
            </div>
          </div>
          <button
            onClick={() => openQuoteModal('3DeVOK MT - Inspection Compliance Report')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow shrink-0 cursor-pointer"
          >
            Request Calibration Certificate Spec
          </button>
        </div>
      </section>

      {/* ====================================================
          3. MT ADVANCED SCANNING TECHNOLOGY (SPLIT-SCREEN)
         ==================================================== */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
              Multi-Laser Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Advanced Optical Laser Technology
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              34 ultra-fine blue laser lines paired with 22 infrared laser lines and large-area speckle for non-destructive inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT: Technology Visual Preview */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 overflow-hidden relative shadow-2xl">
                <img
                  src="/images/scanners/scanner-inspection.jpg"
                  alt="3DeVOK MT Industrial Inspection"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                  <div className="text-[10px] text-blue-400 font-mono font-bold uppercase">
                    Active Tech Mode
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {devokMTData.technologies[activeTechIndex].title}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {devokMTData.technologies[activeTechIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Interactive Technology Modules */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devokMTData.technologies.map((tech, idx) => {
                const isActive = activeTechIndex === idx
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTechIndex(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 border-blue-500/80 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                        {tech.statLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                        {tech.stat}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. 4-STEP INDUSTRIAL WORKFLOW
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Optimized Execution Pipeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            From Physical Tooling to Inspection in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A frictionless digital chain connecting physical workshop parts with engineering CAD models and QC sign-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(devokMTData.workflow || []).map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-slate-200 group-hover:text-red-500 font-mono transition-colors">
                  {item.step}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {item.stage}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. MT TECHNICAL SPECIFICATIONS TABLE
         ==================================================== */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              Datasheet & Scanning Parameters
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Technical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Complete engineering datasheet certified under laboratory conditions and traceable to VDI/VDE standards.
            </p>
          </div>

          {/* Specifications Table Dashboard */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black">{devokMTData.name}</h3>
                <p className="text-xs text-slate-400">Model: {devokMTData.modelName} | Professional Industrial Multi-Laser Scanner</p>
              </div>
              <button
                onClick={() => openQuoteModal('3DeVOK MT - Full Datasheet Request')}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow"
              >
                Download PDF Spec Sheet
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {Object.entries(devokMTData.specifications).map(([key, val], idx) => (
                <div
                  key={key}
                  className={`grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-6 text-xs transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                  } hover:bg-blue-50/30`}
                >
                  <div className="sm:col-span-5 font-bold text-slate-900 mb-1 sm:mb-0">
                    {key}
                  </div>
                  <div className="sm:col-span-7 text-slate-600 font-medium">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. MT INDUSTRIAL APPLICATIONS SECTION (8 CARDS)
         ==================================================== */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              Industrial Versatility
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Built for Heavy Industry & High-Precision QC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Automotive stamping, aerospace blades, heavy sand casting, and surgical implants require zero-defect verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devokMTData.applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {applicationIcons[app.icon] || <Scan className="w-5 h-5 text-blue-600" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {app.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => openQuoteModal(`3DeVOK MT - ${app.title} Application Inquiry`)}
                    className="text-[11px] font-bold text-slate-700 hover:text-blue-600 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Consult on this application →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. MT IMAGE GALLERY WITH LIGHTBOX
         ==================================================== */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              Visual Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Hardware Design & Laser Scanner Gallery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Click on any photograph to view high-resolution details of the 3DeVOK MT hardware and scan outputs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devokMTData.galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImg(img)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`3DeVOK MT Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/90 text-slate-900 rounded-full shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. FINAL DARK INDUSTRIAL CTA SECTION
         ==================================================== */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Precision Quality Control
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Accelerate Your 3D Scanning & Reverse Engineering?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with our 3D scanning application engineers to schedule an on-site demonstration with your actual workpieces or request benchmark inspection test scans.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => openQuoteModal('3DeVOK MT - Formal Quote Request')}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Request a Quote
              </button>
              <a
                href={devokMTData.brochureUrl || '/brochures/3devok-mt.pdf'}
                download="3devok-mt-brochure.pdf"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 text-center cursor-pointer"
              >
                <Download className="w-4 h-4 text-red-400" />
                <span>Brochure</span>
              </a>
              <button
                onClick={() => openQuoteModal('3DeVOK MT - Talk to an Expert')}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all text-center cursor-pointer"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedGalleryImg && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <button
            onClick={() => setSelectedGalleryImg(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedGalleryImg}
            alt="3DeVOK MT Enlarged"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default DevokMTPage
