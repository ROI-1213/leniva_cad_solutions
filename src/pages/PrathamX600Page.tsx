import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  Sparkles,
  Box,
  Layers,
  Zap,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Flame,
  PhoneCall,
  Award,
  Factory,
  Wrench,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Settings,
  Maximize2,
  Compass,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const PrathamX600Page: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'build' | 'motion' | 'thermal' | 'software'>('build')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA+')

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const mechanicsRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Inject SEO Structured Data
  useEffect(() => {
    document.title = 'Pratham X (600) Jumbo 3D Printer | 1000×1000×600 mm All-Axis BallScrew | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Pratham X (600) is a jumbo industrial FDM 3D printer featuring a massive 1000×1000×600 mm build volume, ALL-Axis industrial ball screw mechanism with THK linear motion guides, silicone fast heatbed, and Simplify3D license software.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham X (600) Jumbo Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-x.png',
      description:
        'Pratham X (600) is a jumbo industrial additive manufacturing system featuring 1000 × 1000 × 600 mm envelope, ALL-Axis ball screw mechanism with THK linear guides, and 250 KG rigid metal body.',
      brand: { '@type': 'Brand', name: 'Pratham 3D' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: 'Contact for Quote',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(productSchema)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  const materialsInfo: Record<
    string,
    { title: string; bedTemp: string; nozzleTemp: string; desc: string; advantage: string }
  > = {
    'PLA+': {
      title: 'Industrial High-Toughness PLA+',
      bedTemp: '55 – 65 °C',
      nozzleTemp: '205 – 225 °C',
      desc: 'Enhanced impact modifiers give PLA+ superior durability over standard PLA, eliminating brittleness across jumbo meter-long prints while retaining crisp overhangs and zero shrinkage.',
      advantage: 'Ideal for automotive mockups, architectural facade panels, and full-scale styling prototypes.',
    },
    PETG: {
      title: 'Industrial PETG / Tough-PETG',
      bedTemp: '75 – 85 °C',
      nozzleTemp: '230 – 250 °C',
      desc: 'Outstanding moisture resistance, high impact tenacity, and chemical inertia against motor oils and coolants. The silicone rapid heating bed maintains 80°C evenly across the whole 1-meter table.',
      advantage: 'Excellent for giant functional fluid ducting, marine prototypes, and heavy tooling nests.',
    },
    TPU: {
      title: 'Flexible TPU (Thermoplastic Polyurethane 95A)',
      bedTemp: '50 – 60 °C',
      nozzleTemp: '215 – 235 °C',
      desc: 'High abrasion resistance, rubber-like flexibility, and high tear strength. Direct-drive extruder geometry feeds flexible filaments smoothly without buckling even on meter-wide gaskets.',
      advantage: 'Giant impact fenders, industrial protective liners, expansion joints, and customized bellows.',
    },
  }

  const faqs = [
    {
      q: 'What is the exact build envelope of the Pratham X (600)?',
      a: 'The Pratham X (600) offers an expansive 1000 mm × 1000 mm × 600 mm (1 meter length by 1 meter width by 0.6 meter height) build envelope with a volumetric capacity of 600 Liters.',
    },
    {
      q: 'Why is the "ALL Axis Industrial Ball Screw" mechanism essential for a jumbo printer?',
      a: 'Belt-driven gantries across 1000 mm spans experience stretch, backlash, and harmonic oscillation, leading to ghosting and dimensional inaccuracies. Pratham X uses precision-ground industrial ball screws on EVERY axis (X, Y, and Z) supported by Japanese THK linear motion guides. This yields 11-micron X/Y precision and 10-micron Z precision with zero backlash.',
    },
    {
      q: 'How does the Silicone Rapid Heating Bed handle a 1000 × 1000 mm surface?',
      a: 'Heating a 1 m² platform can take over 45 minutes with conventional heaters. Pratham X incorporates an ultra-fast silicone heating element paired with an aluminum thermal diffusion plate, reaching 120°C rapidly with uniform heat distribution to prevent corner lift.',
    },
    {
      q: 'Is software included with the machine?',
      a: 'Yes. Every Pratham X (600) is shipped with an authentic licensed copy of Simplify3D software, pre-tuned factory slicing profiles, and lifetime firmware updates.',
    },
    {
      q: 'What are the delivery and site requirements for a 250 KG machine?',
      a: 'Pratham X features a robust all-metal MS body weighing 250 KG to eliminate frame flex and ground vibration. It requires standard 230V, 50Hz single-phase power (780W peak). Leniva CAD Solutions provides dedicated logistics, on-site rig-in, leveling, and full onboarding.',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 selection:bg-red-600 selection:text-white">
      {/* ====================================================
          STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black text-slate-950 tracking-tight">Pratham X (600)</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              1000 × 1000 × 600 mm
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500">
              600 Liters • ALL-Axis BallScrew
            </span>
          </div>

          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-4 sm:space-x-6 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar py-1.5 lg:py-0 border-t lg:border-t-0 border-slate-100 whitespace-nowrap">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Key Features
            </button>
            <button onClick={() => scrollTo(mechanicsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              BallScrew Mechanics
            </button>
            <button onClick={() => scrollTo(materialsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Materials
            </button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Specifications
            </button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/brochures/pratham-x-600.pdf"
              download
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham X (600) Jumbo 3D Printer')}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          BREADCRUMBS & HERO SECTION
         ==================================================== */}
      <div ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/fdm-3d-printers" className="hover:text-slate-900 transition-colors">FDM 3D Printers</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Pratham X (600)</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold text-red-800 tracking-wide uppercase">
                A Jumbo 3D Printer — 1000 × 1000 × 600 mm
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pratham X (600) <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                1000 × 1000 × 600 mm
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Engineered for large monolithic manufacturing, the Pratham X (600) delivers a massive 
              <strong> 600-liter build envelope</strong>. Built upon an unprecedented <strong>ALL-Axis Industrial Ball Screw</strong> mechanism 
              with genuine THK linear motion guides, fastest silicone heatbed, and licensed Simplify3D software, it eliminates 
              slicing parts into multiple pieces and gives ±0.2 mm dimensional tolerance.
            </p>

            {/* Key Specs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Build Volume</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">1000×1000×600</div>
                <div className="text-[11px] font-semibold text-red-600">600 Liters Capacity</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kinematics</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">ALL BallScrew</div>
                <div className="text-[11px] font-semibold text-emerald-600">THK Linear Guides</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Machine Weight</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">250 KG</div>
                <div className="text-[11px] font-semibold text-slate-600">All-Metal MS Body</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fastest Bed</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">120°C Silicone</div>
                <div className="text-[11px] font-semibold text-amber-600">Auto Bed Leveling</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openQuoteModal('Pratham X (600) Jumbo 3D Printer')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request Quote & Site Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/brochures/pratham-x-600.pdf"
                download
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Tech Brochure</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-slate-500">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Simplify3D License Included</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Factory className="w-4 h-4 text-red-600" />
                <span>Heavy 250 KG Solid Steel Rig</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Turnkey Commissioning Across India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Machine Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-3xl p-8 border border-slate-200/80 shadow-xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <img
                src="/images/products/pratham-x.png"
                alt="Pratham X (600) Jumbo 3D Printer"
                className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold text-slate-500 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 text-red-600" />
                  <span>Envelope: 1000 × 1000 × 600 mm</span>
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  Jumbo Class
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 2: KEY INDUSTRIAL ADVANTAGES
         ==================================================== */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jumbo Engineering Highlights</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Designed for 1-Meter Monolithic Manufacturing
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No more sectioning, gluing, or weakening large structural components. Print full automotive and industrial assemblies as one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">ALL Axis Industrial Ball Screw</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike ordinary printers that use rubber belts prone to stretching over 1-meter lengths, Pratham X features precision-ground industrial ball screws on all X, Y, and Z axes for rock-solid repeatability.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>X-Y Precision: 11 Microns, Z: 10 Microns</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Genuine Japanese THK linear motion guides</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Fastest Silicone Heatbed (120°C)</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equipped with a silicone heating matrix integrated with an aluminum printbed platform. Provides the fastest bed heating of all time across 1000 × 1000 mm, reaching 120°C uniformly without cold spots.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automatic Bed Leveling eliminates manual leveling</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant thermal response cuts warm-up idle time</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">250 KG All-Metal MS Body</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Industrial mass is essential for stopping resonance. Pratham X features an all-metal mild steel chassis weighing 250 KG, eliminating vibrations and ensuring ±0.2 mm dimensional tolerance on giant parts.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Heavy-gauge rigidity prevents gantry warp</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Filament runout sensor automatically protects prints</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 3: BALLSCREW MECHANICS & HARDWARE DEEP DIVE
         ==================================================== */}
      <div ref={mechanicsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Precision Motion Science</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                CNC-Grade BallScrew Architecture for 1-Meter Travel
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most large 3D printers compromise by using timing belts across 1-meter spans, resulting in belt stretch, 
                backlash, and sloppy tolerances. Pratham X is engineered with genuine <strong>THK Linear Motion Guides</strong> and 
                precision-ground <strong>ALL-Axis Ball Screws</strong> to deliver true CNC machining accuracy on every print.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Maximize2 className="w-4 h-4 text-red-400" />
                    <span>Simplify3D License Included</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Supplied with authentic Simplify3D software licenses featuring customized slicing profiles tuned specifically for the Pratham X ballscrew gantry.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Changeable Nozzle System</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Comes standard with 0.5 mm nozzle. Easily accepts 0.3 mm, 0.4 mm, 0.6 mm, and 0.8 mm high-speed interchangeable nozzles.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Energy Efficient (780W Peak)</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Operates on standard 230V, 50Hz single-phase power with an efficient 780W power consumption profile, keeping operational overhead low.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Applications Portfolio</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-600/30 text-red-300 text-[11px] font-bold">600L Capacity</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Automotive Body Panels</div>
                    <div className="text-slate-400 mt-0.5">Bumpers, spoilers, side skirts, and air dams</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Architectural Facades</div>
                    <div className="text-slate-400 mt-0.5">Full-scale building facade mockups and decorative columns</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Foundry Sand Cores</div>
                    <div className="text-slate-400 mt-0.5">Extra-large sand core patterns and negative molds</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Defense & Marine</div>
                    <div className="text-slate-400 mt-0.5">Drone fuselages, radome mockups, and marine hull models</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-800/90 border border-red-500/30 space-y-3">
                <div className="text-sm font-bold text-white">Need Dual Nozzle or Wi-Fi Camera Monitoring?</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pratham X (600) offers optional factory add-ons including Dual Extrusion Nozzles, Wi-Fi Camera Remote Monitoring, and Enclosed Panels.
                </p>
                <button
                  onClick={() => openQuoteModal('Pratham X (600) Addons & Options')}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Configure Custom Add-ons
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 4: MATERIALS COMPATIBILITY
         ==================================================== */}
      <div ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>Polymer Versatility</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Materials Compatibility for Pratham X (600)
          </h2>
          <p className="text-slate-600 text-sm">
            Optimized for continuous, reliable large-envelope extrusion across industry standard 1.75 mm thermoplastics.
          </p>
        </div>

        {/* Material Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(materialsInfo).map((matKey) => (
            <button
              key={matKey}
              onClick={() => setSelectedMaterial(matKey)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMaterial === matKey
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {matKey}
            </button>
          ))}
        </div>

        {/* Selected Material Card */}
        {materialsInfo[selectedMaterial] && (
          <div className="max-w-3xl mx-auto p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  {materialsInfo[selectedMaterial].title}
                </h3>
                <span className="text-xs font-semibold text-red-600">
                  Thermal Window: Bed {materialsInfo[selectedMaterial].bedTemp} • Nozzle {materialsInfo[selectedMaterial].nozzleTemp}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Factory Slicing Profile Included
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {materialsInfo[selectedMaterial].desc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-start space-x-2">
              <Award className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span><strong>Key Advantage:</strong> {materialsInfo[selectedMaterial].advantage}</span>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================
          SECTION 5: SPECIFICATIONS TABLE
         ==================================================== */}
      <div ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-red-600" />
            <span>Verified Datasheet</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Pratham X (600) Technical Specifications
          </h2>
          <p className="text-slate-600 text-sm">
            Official engineering specifications for the 1000 × 1000 × 600 mm jumbo 3D printer.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveSpecTab('build')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'build'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Build & General
            </button>
            <button
              onClick={() => setActiveSpecTab('motion')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'motion'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Motion & Precision
            </button>
            <button
              onClick={() => setActiveSpecTab('thermal')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'thermal'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Thermal & Extrusion
            </button>
            <button
              onClick={() => setActiveSpecTab('software')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'software'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Software & Add-ons
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            {activeSpecTab === 'build' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Build Volume (XYZ)</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">1000 mm × 1000 mm × 600 mm (600 Liters)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Body Hardware / Frame</div>
                  <div className="sm:col-span-2 text-slate-900">All Metal MS Body (Machine Weight: 250 KG)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Print Technology</div>
                  <div className="sm:col-span-2 text-slate-900">Fused Filament Fabrication (FFF / FDM)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Power Requirements</div>
                  <div className="sm:col-span-2 text-slate-900">230V, 50Hz, 780W peak power consumption</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Operating System Support</div>
                  <div className="sm:col-span-2 text-slate-900">Windows / macOS</div>
                </div>
              </>
            )}

            {activeSpecTab === 'motion' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Motion System Mechanism</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">ALL-Axis Industrial BallScrew on X, Y, and Z axes</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Linear Guideways</div>
                  <div className="sm:col-span-2 text-slate-900">Japanese THK Linear Motion Guides</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Positional Precision</div>
                  <div className="sm:col-span-2 text-slate-900">X-Y: 11 Microns, Z: 10 Microns (With Industrial BallScrew)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Dimensional Tolerance</div>
                  <div className="sm:col-span-2 text-slate-900">±0.2 mm across 1-meter span</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Print Speed Range</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 120 mm/s (40 – 120 mm/s)</div>
                </div>
              </>
            )}

            {activeSpecTab === 'thermal' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Extruder Temperature</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">280 °C (Single extruder standard; Dual available)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Printbed Heating & Temp</div>
                  <div className="sm:col-span-2 text-slate-900">120 °C (Silicone Fastest Heating Bed + Aluminum Printbed Platform)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Nozzle Sizes</div>
                  <div className="sm:col-span-2 text-slate-900">0.5 mm Standard (0.3 / 0.4 / 0.6 / 0.8 mm changeable)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Layer Resolution</div>
                  <div className="sm:col-span-2 text-slate-900">0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Filament Compatibility</div>
                  <div className="sm:col-span-2 text-slate-900">1.75 mm PLA+ / PETG / TPU</div>
                </div>
              </>
            )}

            {activeSpecTab === 'software' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Software Bundle</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Simplify3D License Software included with machine</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Operating Control</div>
                  <div className="sm:col-span-2 text-slate-900">Full Color Touch Screen Controller</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Supported File Formats</div>
                  <div className="sm:col-span-2 text-slate-900">STL or GCODE</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Connectivity</div>
                  <div className="sm:col-span-2 text-slate-900">USB / SD Card / Wi-Fi (optional add-on)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Optional Factory Add-ons</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold text-red-600">Dual Nozzle • Camera Monitoring • Wi-Fi Operating</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS
         ==================================================== */}
      <div ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span>Industrial Buying Guide</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about the Pratham X (600) jumbo industrial 3D printer.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-4 ${
                    openFaq === idx ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          SECTION 7: BOTTOM CTA CARD
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Jumbo 3D Printer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Manufacture 1-Meter Monolithic Parts with Pratham X (600)
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect with Leniva CAD Solutions technical experts today for technical datasheets, machine demonstrations, and customized financing options.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('Pratham X (600) Deployment')}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Quote & Demo</span>
            </button>
            <a
              href="/brochures/pratham-x-600.pdf"
              download
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Brochure (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrathamX600Page
