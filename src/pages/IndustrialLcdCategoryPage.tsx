import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Monitor,
  ArrowRight,
  Phone,
  CheckCircle2,
  Cpu,
  Award,
  Factory,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  ekaGtMaxData,
  ekaF116kData,
  lcdCategoryData,
} from '../data/industrialLcdData'
import { getLiveVisualHeroImage } from '../utils/cadVisualEditorStore'

export const IndustrialLcdCategoryPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  useEffect(() => {
    document.title = `${lcdCategoryData.heroTitle} | Leniva CAD Solutions`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', lcdCategoryData.heroDesc)
    }
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-red-600 selection:text-white">
      {/* ====================================================
          1. CATEGORY HERO SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Industrial LCD 3D Printers</span>
        </nav>

        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 p-8 sm:p-14 lg:p-16">
          {/* Tech Grid Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Monitor className="w-3.5 h-3.5 text-red-400" />
              <span>MONOCHROME LCD RESIN TECHNOLOGY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {lcdCategoryData.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {lcdCategoryData.heroDesc}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal('Industrial LCD 3D Printers Category Quote')}
                className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                {lcdCategoryData.cta1}
              </button>
              <button
                onClick={() => openQuoteModal('Talk to an Expert - Industrial LCD 3D Printers')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>{lcdCategoryData.cta2}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. CATEGORY INTRODUCTION & OUR INDUSTRIAL LCD RANGE
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — {lcdCategoryData.introSubheading} —
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            {lcdCategoryData.introHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {lcdCategoryData.introDesc}
          </p>
        </div>

        {/* Product Cards: EKA GT MAX & EKA F1 16K */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* PRODUCT CARD 01: EKA GT MAX */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-mono font-bold uppercase tracking-wider">
                  LCD 3D Printer (Engineering)
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">16-inch 8K Monochrome</span>
              </div>

              <div className="aspect-16/10 rounded-2xl bg-slate-50 bg-gradient-to-b from-blue-50/40 to-slate-100/60 p-6 flex items-center justify-center overflow-hidden border border-slate-200/80">
                <img
                  src={getLiveVisualHeroImage('eka_gt_max', ekaGtMaxData.heroImage)}
                  alt={ekaGtMaxData.name}
                  className="h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {ekaGtMaxData.name}
                </h3>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Built for large, accurate, and functional engineering parts
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  EKA GT MAX is a high-performance industrial LCD 3D printer engineered for large build volumes,
                  mechanical accuracy, and production-grade resin parts.
                </p>
              </div>

              {/* Ideal Applications */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Ideal For:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Engineering Prototypes</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Industrial Components</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Functional Testing</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Large build volume for engineering parts (353 × 198 × 400 mm)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>High-resolution 8K LCD (7680 × 4320) with 46 μm pixel accuracy</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Excellent surface finish with minimal post-processing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Stable structure for long production runs</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Ideal for industrial R&amp;D and functional prototyping</span>
                </div>
              </div>
            </div>

            <Link
              to="/industrial-lcd-3d-printers-eka-gt-max/"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>Check in Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* PRODUCT CARD 02: EKA F1 16K */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-mono font-bold uppercase tracking-wider">
                  LCD 3D Printer (Jewelry)
                </span>
                <span className="text-xs font-mono font-bold text-amber-700">16K Ultra-High Resolution</span>
              </div>

              <div className="aspect-16/10 rounded-2xl bg-slate-50 bg-gradient-to-b from-amber-50/40 to-slate-100/60 p-6 flex items-center justify-center overflow-hidden border border-slate-200/80">
                <img
                  src={getLiveVisualHeroImage('eka_f1_16k', ekaF116kData.heroImage)}
                  alt={ekaF116kData.name}
                  className="h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {ekaF116kData.name}
                </h3>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Ultra-fine detailing for high-precision jewelry manufacturing
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  EKA F1 16K is a next-generation jewelry-focused LCD 3D printer featuring 16K ultra-high resolution
                  for exceptional detailing and surface quality.
                </p>
              </div>

              {/* Ideal Applications */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Designed Specifically For:
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700">
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Jewelry Masters</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Micro-Details</span>
                  <span className="px-2 py-0.5 bg-white rounded border border-slate-200">Intricate Designs</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>16K ultra-high resolution LCD screen (15120 × 6230 pixels)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Extremely smooth surface finish with 14–19 micron XY resolution</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Sharp edges and fine micro-details for complex stone settings</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Optimized for castable and jewelry resins (500g resin included)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Reliable accuracy for professional jewelry production in India</span>
                </div>
              </div>
            </div>

            <Link
              to="/eka-f1-16k-industrial-lcd-jewelry-3d-printer/"
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl text-center shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <span>Check in Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. CATEGORY TRUST SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Trusted Engineering —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {lcdCategoryData.trustHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lcdCategoryData.trustDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Industrial Monochrome Panels</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Long-lifespan 8K and 16K optical screens built for continuous multi-hour resin polymerization with low heat generation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Factory Pre-Calibrated</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Solid aluminum tooling build plates pre-leveled from the factory for immediate plug-and-play installation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Technical Service &amp; Consumables</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete support ecosystem with genuine Chitubox profiles, replacement release films, LCD panels, and casting resins.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. CLIENT SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Valued Partnerships —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {lcdCategoryData.clientHeading}
          </h2>
          <p className="text-sm font-bold text-slate-700">
            {lcdCategoryData.clientSubheading}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            {lcdCategoryData.clientDesc}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center font-mono text-xs">
            {['Premier Jewelry Hubs', 'Autonomous Drone Labs', 'Defense Testing Centers', 'Dental Aligners Clinics'].map((client, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 font-bold">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. CATEGORY FINAL CTA
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 font-mono text-xs font-bold rounded-md">
              Start Industrial Resin Printing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lcdCategoryData.finalCtaHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {lcdCategoryData.finalCtaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors text-center"
            >
              Contact Us
            </Link>
            <button
              onClick={() => openQuoteModal('Industrial LCD Callback Request')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              Request a Call Back
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IndustrialLcdCategoryPage
