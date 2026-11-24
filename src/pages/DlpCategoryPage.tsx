import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Gem,
  ArrowRight,
  Phone,
  CheckCircle2,
  Award,
  Factory,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { ekaHtData, ekaXlData, ekaXleData } from '../data/ekaProductsData'
import { getLiveVisualHeroImage } from '../utils/cadVisualEditorStore'

export const DlpCategoryPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  useEffect(() => {
    document.title = 'EKA Series DLP Resin 3D Printers | Jewelry, Dental & Engineering | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Discover the EKA Series DLP 3D printers: EKA HT, EKA XL, and EKA XLE. High-precision DLP resin printers designed for jewelry direct casting, dental models, and industrial engineering in India.'
      )
    }
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-amber-600 selection:text-white">
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
          <span className="font-semibold text-slate-900">DLP 3D Printers</span>
        </nav>

        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 p-8 sm:p-14 lg:p-16">
          {/* Tech Grid Background Accent */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Gem className="w-3.5 h-3.5 text-amber-400" />
              <span>DLP RESIN TECHNOLOGY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              EKA Series DLP Resin 3D Printers for Jewelry, Dental &amp; Precision Engineering
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              High-precision DLP resin 3D printers designed for ultra-fine detailing, smooth surface finish, and
              reliable production in jewelry, dental, and engineering applications.
            </p>

            <p className="text-xs sm:text-sm text-amber-300 font-medium pt-1">
              Built in India for professionals who demand accuracy, consistency, and production-ready resin printing performance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal('DLP 3D Printers Category Inquiry')}
                className="px-7 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Request a Quote
              </button>
              <button
                onClick={() => openQuoteModal('Talk to an Expert - DLP Printers')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. EKA SERIES INTRODUCTION & 3 PRODUCT CARDS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — The EKA Lineup —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            EKA Series DLP 3D Printers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select the specialized DLP model tailored for your manufacturing volume and material requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: EKA HT */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[10px] font-mono font-bold uppercase">
                  Jewelry DLP
                </span>
                <span className="text-xs font-mono font-bold text-amber-600">3 Years Warranty</span>
              </div>

              <div className="aspect-square rounded-2xl bg-amber-50/50 p-6 flex items-center justify-center overflow-hidden border border-amber-100">
                <img
                  src={getLiveVisualHeroImage('eka_ht', ekaHtData.heroImage)}
                  alt={ekaHtData.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">{ekaHtData.name}</h3>
                <div className="text-xs font-mono font-bold text-amber-700">{ekaHtData.platformSize}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  EKA HT is a high-precision DLP resin 3D printer specifically designed for jewelry manufacturers.
                  It delivers sharp detailing, smooth surfaces, and excellent casting-ready patterns for complex jewelry designs.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Heated Resin Tray for winter reliability</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chamber Filter &amp; Heater</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Easy CNC print-head leveling</span>
                </div>
              </div>
            </div>

            <Link
              to="/products/eka-ht"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Check in Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: EKA XL */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[10px] font-mono font-bold uppercase">
                  Entry-Level Jewelry
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">1 Year Warranty</span>
              </div>

              <div className="aspect-square rounded-2xl bg-amber-50/50 p-6 flex items-center justify-center overflow-hidden border border-amber-100">
                <img
                  src={getLiveVisualHeroImage('eka_xl', ekaXlData.heroImage)}
                  alt={ekaXlData.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">{ekaXlData.name}</h3>
                <div className="text-xs font-mono font-bold text-amber-700">{ekaXlData.platformSize}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  EKA XL is a compact and reliable jewelry DLP printer ideal for daily production. It offers consistent
                  accuracy and smooth finishes, making it perfect for small to medium jewelry workshops.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Affordable LED projector technology</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Compact space-saving design</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Direct casting wax patterns</span>
                </div>
              </div>
            </div>

            <Link
              to="/products/eka-xl"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Check in Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: EKA XLE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-[10px] font-mono font-bold uppercase">
                  Engineering Resin
                </span>
                <span className="text-xs font-mono font-bold text-blue-600">1 Year Warranty</span>
              </div>

              <div className="aspect-square rounded-2xl bg-blue-50/50 p-6 flex items-center justify-center overflow-hidden border border-blue-100">
                <img
                  src={getLiveVisualHeroImage('eka_xle', ekaXleData.heroImage)}
                  alt={ekaXleData.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950 tracking-tight">{ekaXleData.name}</h3>
                <div className="text-xs font-mono font-bold text-blue-700">{ekaXleData.platformSize}</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  EKA XLE is a larger-format DLP resin 3D printer built for engineering and industrial applications.
                  It combines high resolution with a bigger build area for functional prototypes and detailed parts.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>HD DLP projector optical engine</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>10 engineering resin photopolymers</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>48-micron XY ultra-fine resolution</span>
                </div>
              </div>
            </div>

            <Link
              to="/products/eka-xle"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Check in Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. CATEGORY PAGE — LCD RESIN PRINTER TRANSITION SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              High Resolution MSLA / LCD
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Explore Our LCD Resin 3D Printers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Ultra-high resolution LCD 3D printers engineered for precision manufacturing, rapid prototyping, and
              production-grade resin printing with massive 16-inch 8K and 16K masking panels.
            </p>
          </div>

          <Link
            to="/products/industrial-lcd"
            className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors shrink-0 flex items-center space-x-2"
          >
            <span>View LCD 3D Printers Range</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ====================================================
          4. COMMON TRUST SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — National Trust —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Why Our Clients Trust EKA 3D Printers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Trusted by engineers, designers, manufacturers and leading institutions across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Zero-Ash Direct Casting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formulated resin profiles allow clean burnout during investment casting without pitting, gas porosity, or surface blemishes in gold and silver.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Factory Backed Warranty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Genuine factory projector and hardware warranty up to 3 years with immediate parts replacement and certified engineer dispatch.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Technical Onboarding &amp; Support</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full on-site operator onboarding on CAD orientation, slicing software, and machine operation across all major jewelry and engineering hubs.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. FINAL TRUST / VALUABLE CLIENTS SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Valued Partnerships —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Our Valuable Clients
          </h2>
          <p className="text-sm font-bold text-slate-700">
            Trusted by India’s Leading Organizations
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Proudly working with top institutions, research labs &amp; manufacturing industries.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center font-mono text-xs">
            {['Jewelry Export Clusters', 'Defense Polymer Labs', 'IITs & Engineering COEs', 'Automotive Prototype Centers'].map((client, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 font-bold">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. COMMON FINAL CTA
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-xs font-bold rounded-md">
              Start Precision Resin Printing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Start Your 3D Printing Journey with Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connect with our experts for printers, services or custom manufacturing solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors text-center"
            >
              Contact Us
            </Link>
            <button
              onClick={() => openQuoteModal('DLP 3D Printers General Consultation')}
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

export default DlpCategoryPage
