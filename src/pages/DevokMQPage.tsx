import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Phone,
  Scan,
  ShieldCheck,
  Maximize2,
  X,
  Palette,
  Wifi,
  Sparkles,
  Printer,
  Settings,
  Box,
  Landmark,
  HeartPulse,
  GraduationCap,
  Archive,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { devokMQData as defaultDevokMQData } from '../data/scannersData'
import { mergeCatalogWithHardwareData } from '../utils/productCatalog'
import { AdvancedScanningTechCinematic } from '../components/AdvancedScanningTechCinematic'

export const DevokMQPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const devokMQData = mergeCatalogWithHardwareData('3devok-mq', defaultDevokMQData)
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null)

  const heroViews = [
    {
      id: 'hardware-kit',
      label: '3DeVOK MQ Kit',
      src: '/images/scanners/3devok-mq-hardware-kit.png',
      badge: 'Full-Color 3D Kit',
      subBadge: 'Wireless Handle & True Color',
      desc: '3DeVOK MQ scanner with wireless power handle, mobile mount, and photorealistic 24-bit color scanning.',
    },
    {
      id: 'architecture',
      label: 'Sensor Architecture',
      src: '/images/scanners/3devok-sensor-architecture.png',
      badge: 'Sensor Architecture',
      subBadge: 'Multi-Laser & Sensor Callouts',
      desc: 'Complete optical array: dual B&W cameras, RGB color sensor, infrared fill lights, laser & VCSEL emitters, and touch screen.',
    },
    {
      id: 'action',
      label: 'In-Hand Operation',
      src: '/images/scanners/3devok-in-hand-action.png',
      badge: 'In-Hand Operation',
      subBadge: 'Field & Studio Ergonomics',
      desc: 'Real-world handheld operation with ultra-lightweight 550 g housing.',
    },
  ]
  const [activeHeroIndex, setActiveHeroIndex] = useState(0)

  const applicationIcons: Record<string, React.ReactNode> = {
    Printer: <Printer className="w-5 h-5 text-red-600" />,
    Settings: <Settings className="w-5 h-5 text-blue-600" />,
    Box: <Box className="w-5 h-5 text-amber-600" />,
    Landmark: <Landmark className="w-5 h-5 text-emerald-600" />,
    HeartPulse: <HeartPulse className="w-5 h-5 text-rose-600" />,
    Palette: <Palette className="w-5 h-5 text-purple-600" />,
    GraduationCap: <GraduationCap className="w-5 h-5 text-indigo-600" />,
    Archive: <Archive className="w-5 h-5 text-teal-600" />,
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      {/* ====================================================
          1. HERO SECTION: 3DeVOK MQ
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
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/3d-scanners" className="hover:text-white transition-colors">3D Scanners</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-red-400 font-semibold">{devokMQData.modelName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: Product Visual with Presentation Box */}
            <div className="lg:col-span-6 relative">
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
                          ? 'bg-red-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Presentation Box */}
              <div className="relative rounded-3xl bg-white p-4 sm:p-6 border border-slate-200/90 shadow-2xl flex items-center justify-center group overflow-hidden min-h-[380px] sm:min-h-[430px]">
                {/* Visual spotlight halo */}
                <div className="absolute w-72 h-72 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Active Image Display */}
                {activeHeroIndex === 0 && (
                  <div className="w-full h-80 sm:h-96 md:h-[400px] flex items-center justify-center p-2">
                    <img
                      src="/images/scanners/3devok-mq-hardware-kit.png"
                      alt="3DeVOK MQ Hardware Kit and Color 3D Scanning"
                      className="max-h-full max-w-full object-contain select-none transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
                    />
                  </div>
                )}

                {activeHeroIndex === 1 && (
                  <div className="w-full h-80 sm:h-96 md:h-[400px] flex items-center justify-center p-2">
                    <img
                      src="/images/scanners/3devok-sensor-architecture.png"
                      alt="3DeVOK Sensor Architecture Callouts"
                      className="max-h-full max-w-full object-contain select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {activeHeroIndex === 2 && (
                  <img
                    src="/images/scanners/3devok-in-hand-action.png"
                    alt="3DeVOK Scanner In-Hand Operation"
                    className="w-full h-80 sm:h-96 md:h-[400px] object-cover rounded-2xl select-none transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
                  />
                )}

                {/* Floating Badges */}
                <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
                  <span className="px-3 py-1 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md shadow-md">
                    {heroViews[activeHeroIndex].badge}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold border border-slate-700 rounded shadow">
                    {heroViews[activeHeroIndex].subBadge}
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 shadow-lg text-[11px] font-mono text-slate-300 z-20">
                  Weight: <strong className="text-white">550 g</strong>
                </div>

                <button
                  onClick={() => setSelectedGalleryImg(heroViews[activeHeroIndex].src)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow cursor-pointer z-20"
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
                        ? 'border-red-500 bg-slate-800 shadow-md ring-1 ring-red-500'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <img
                      src={view.src}
                      alt={view.label}
                      className="w-12 h-10 object-contain p-0.5 rounded-lg shrink-0 bg-white"
                    />
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-white block truncate leading-tight">
                        {view.label}
                      </span>
                      <span className="text-[9px] text-slate-400 block truncate">
                        {idx === 0 ? 'Hardware kit & scan' : idx === 1 ? 'Sensor callouts' : 'Live in-hand'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Spec Bar below image */}
              <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">ACCURACY</span>
                  <strong className="text-white font-bold text-sm">0.08 mm</strong>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">SPEED</span>
                  <strong className="text-white font-bold text-sm">4.5M pts/s</strong>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center">
                  <span className="text-slate-400 text-[10px] block font-mono">WIRELESS</span>
                  <strong className="text-emerald-400 font-bold text-sm">Optional Handle</strong>
                </div>
              </div>
            </div>

            {/* RIGHT: Typography, Description & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Color 3D Scanning</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {devokMQData.modelName}
                </h1>
                <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300 mt-1">
                  {devokMQData.tagline}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {devokMQData.description}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openQuoteModal('3DeVOK MQ - Demo Request')}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Scan className="w-4 h-4" />
                  <span>Request a Demo</span>
                </button>
                <button
                  onClick={() => openQuoteModal('3DeVOK MQ - Technical Expert Consultation')}
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Talk to a 3D Scanning Expert</span>
                </button>
              </div>

              {/* Trust Line */}
              <div className="pt-6 border-t border-slate-800/80 flex items-start space-x-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-white font-semibold">{devokMQData.trustLine}</strong> backed by Leniva CAD Solutions calibration, field engineering, and software onboarding network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. MQ KEY FEATURES SECTION (5 CARDS + WIRELESS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Core Performance Benchmarks
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Engineered for Precision & Portability
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Advanced optical architecture designed to eliminate setup friction and deliver millimeter-true digital assets.
          </p>
        </div>

        {/* Features 5-Card Grid + Wireless Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devokMQData.features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 rounded-md">
                    {feat.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {feat.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="w-8 h-1 bg-red-600 rounded-full mt-5 group-hover:w-16 transition-all duration-300" />
            </div>
          ))}

          {/* Special Wireless Highlight Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md">
                  WIRELESS FREEDOM
                </span>
                <Wifi className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">
                Optional Wireless Battery Handle
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transform the 3DeVOK MQ into an untethered field-scanning powerhouse. Scan large vehicles, museum galleries, or remote outdoor ruins with complete ergonomic mobility.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-400">
              <span>Hot-swappable Battery Pack</span>
              <span className="text-emerald-400 font-bold">Cable-Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. SCROLL-DRIVEN CINEMATIC 3D ADVANCED SCANNING TECHNOLOGY
         ==================================================== */}
      <AdvancedScanningTechCinematic />

      {/* ====================================================
          4. MQ TECHNICAL SPECIFICATIONS TABLE
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Datasheet & Parameters
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Technical Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Verified engineering performance metrics certified for high-precision 3D digital measurement.
          </p>
        </div>

        {/* Specifications Table Dashboard */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">{devokMQData.name}</h3>
              <p className="text-xs text-slate-400">Model: {devokMQData.modelName} | Handheld 3D Color Scanner</p>
            </div>
            <button
              onClick={() => openQuoteModal('3DeVOK MQ - Full Datasheet Request')}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow"
            >
              Download PDF Spec Sheet
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {Object.entries(devokMQData.specifications).map(([key, val], idx) => (
              <div
                key={key}
                className={`grid grid-cols-1 sm:grid-cols-12 p-4 sm:px-6 text-xs transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                } hover:bg-red-50/30`}
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
      </section>

      {/* ====================================================
          5. MQ APPLICATIONS SECTION (8 CARDS)
         ==================================================== */}
      <section className="bg-slate-100/70 py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              Versatile Workflow Integration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Built for Real-World Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From heavy reverse engineering to museum cultural digitization, the 3DeVOK MQ adapts to diverse industrial disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devokMQData.applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {applicationIcons[app.icon] || <Scan className="w-5 h-5 text-red-600" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {app.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => openQuoteModal(`3DeVOK MQ - ${app.title} Inquiry`)}
                    className="text-[11px] font-bold text-slate-700 hover:text-red-600 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Consult on this use case →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. MQ IMAGE GALLERY WITH LIGHTBOX
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Visual Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Scanner Gallery & Output Details
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Click on any image to inspect high-resolution hardware details and 3D color scan results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {devokMQData.galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedGalleryImg(img)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group cursor-pointer"
            >
              <img
                src={img}
                alt={`3DeVOK MQ Gallery ${idx + 1}`}
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
      </section>

      {/* ====================================================
          7. FINAL DARK CTA SECTION
         ==================================================== */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-red-950 rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Transform Physical to Digital
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Transform Your Physical Objects into Digital Data?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Talk to our 3D scanning specialists and find the right scanning solution for your application. We provide live demonstrations, sample scans, and complete CAD reverse engineering workflows.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => openQuoteModal('3DeVOK MQ - Formal Quote Request')}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Request a Quote
              </button>
              <button
                onClick={() => openQuoteModal('3DeVOK MQ - Talk to an Expert')}
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
            alt="3DeVOK MQ Enlarged"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl animate-fade-in"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default DevokMQPage
