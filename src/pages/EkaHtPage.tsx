import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  ChevronDown,
  Flame,
  PhoneCall,
  Gem,
  CheckCircle2,
  Wind,
  Compass,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  ekaHtData as defaultEkaHtData,
  jewelryWorkGallery,
} from '../data/ekaProductsData'
import { mergeCatalogWithHardwareData } from '../utils/productCatalog'

export const EkaHtPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const ekaHtData = mergeCatalogWithHardwareData('eka-ht', defaultEkaHtData)

  // Interactive State
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>('all')

  // Section Refs for Sub-navigation / Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const usersRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // SEO Setup
  useEffect(() => {
    document.title = 'EKA HT Jewelry DLP 3D Printer | Direct Wax Casting & Production | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'EKA HT is a high-speed jewelry DLP 3D printer with advanced heated tray technology, 130×73×150 mm build volume, and 3-year warranty for direct gold and silver casting.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'EKA HT Jewelry DLP 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/eka-ht.png',
      description: ekaHtData.secondaryDesc,
      brand: { '@type': 'Brand', name: 'EKA' },
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

  const filteredGallery =
    activeGalleryCat === 'all'
      ? jewelryWorkGallery
      : jewelryWorkGallery.filter((item) => item.category === activeGalleryCat)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-amber-600 selection:text-white">
      {/* ====================================================
          STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black text-slate-950 tracking-tight">EKA HT</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              {ekaHtData.platformSize}
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-amber-700">
              3 Years Warranty
            </span>
          </div>

          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-4 sm:space-x-6 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar py-1.5 lg:py-0 border-t lg:border-t-0 border-slate-100 whitespace-nowrap">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              Key Features
            </button>
            <button onClick={() => scrollTo(usersRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              Who Is It For
            </button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              Jewelry Gallery
            </button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              Specifications
            </button>
            
            <button onClick={() => scrollTo(faqRef)} className="hover:text-amber-700 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={ekaHtData.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('EKA HT Jewelry 3D Printer Inquiry')}
              className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          1. HERO SECTION
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-2 sm:!mt-3 pt-0 scroll-mt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-3 sm:mb-4">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/dlp-3d-printers" className="hover:text-slate-900 transition-colors">DLP 3D Printers</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">EKA HT</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold tracking-wider uppercase">
              <Gem className="w-3.5 h-3.5 text-amber-600" />
              <span>JEWELRY DLP 3D PRINTER</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                {ekaHtData.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg font-bold text-amber-700 leading-snug">
                {ekaHtData.primaryDesc}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {ekaHtData.secondaryDesc}
              </p>
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Build Area</span>
                <span className="text-sm sm:text-base font-black text-slate-950 font-mono mt-0.5 block">
                  {ekaHtData.platformSize}
                </span>
              </div>
              <div className="border-x border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">XY Precision</span>
                <span className="text-sm sm:text-base font-black text-amber-700 font-mono mt-0.5 block">
                  67 Micron
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Warranty</span>
                <span className="text-sm sm:text-base font-black text-emerald-600 font-mono mt-0.5 block">
                  3 Years Full
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ekaHtData.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Product Brochure</span>
              </a>

              <button
                onClick={() => openQuoteModal('EKA HT Expert Call Back Request')}
                className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request an Expert Call Back</span>
              </button>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-slate-50 bg-gradient-to-b from-amber-50/60 via-slate-100/70 to-white p-6 sm:p-12 border border-slate-200/90 shadow-xl overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
              {/* Subtle Tech Grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Callouts */}
              <div className="absolute top-6 left-6 flex items-center space-x-1.5 text-[10px] font-mono font-bold text-slate-500 bg-white/95 px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
                <span>HEATED VAT</span>
                <span className="text-slate-300">|</span>
                <span>CHAMBER HEATER</span>
              </div>

              <div className="absolute top-6 right-6 flex items-center space-x-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50/95 px-3 py-1 rounded-md border border-amber-200 shadow-2xs">
                <span>3 YEARS WARRANTY</span>
              </div>

              {/* Product Machine Render */}
              <div className="relative z-10 w-full max-w-[380px] aspect-square flex items-center justify-center transition-transform duration-700 hover:scale-[1.03]">
                <img
                  src={ekaHtData.heroImage}
                  alt="EKA HT Jewelry DLP 3D Printer"
                  className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(217,119,6,0.15)]"
                  loading="eager"
                />
              </div>

              {/* Floor Shadow */}
              <div className="w-3/4 h-5 bg-amber-950/15 rounded-full blur-md -mt-3" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. EKA HT PRODUCT HIGHLIGHT (LARGE WARRANTY STATEMENT)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl text-center space-y-3 relative overflow-hidden">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-xs font-bold uppercase rounded-md border border-amber-500/30">
            Guaranteed Reliability
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight uppercase">
            {ekaHtData.warrantyStatement}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Engineered with high-grade optical LED projectors rated for 30,000+ operational hours, backed by direct
            factory replacement warranty for uninterrupted jewellery manufacturing.
          </p>
        </div>
      </section>

      {/* ====================================================
          3. EKA HT THREE CORE FEATURES
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Breakthrough Innovations —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Key Features of EKA HT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered to overcome common resin printing flaws and ensure direct castable precision in all seasons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 01: Heated Resin Tray */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700">Feature 01</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                Heated Resin Tray
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Heating of resin during the print process improves Resin’s chemical reaction and remains in same state
                during the print which will reduce Print failures compare to the machine without heated tray. Specially
                it will helps to avoid print failures in Winter seasons when resin become more viscous.
              </p>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1.5 text-xs">
              <div className="font-bold text-amber-900 font-mono text-[11px]">ACTIVE THERMAL CONTROL</div>
              <p className="text-[11px] text-amber-800 leading-snug">
                Eliminates layer peel separation caused by cold, thick resin in unheated winter workshops.
              </p>
            </div>
          </div>

          {/* Feature 02: Filter and Heater */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700">Feature 02</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                Filter and Heater
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter and Heater in the Print Chamber removes the moisture and helps for better use of resin. Filter
                also helps reducing the toxic fumes from print chamber which are generated during print process. This
                filter ensure betterment of working area.
              </p>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-1.5 text-xs">
              <div className="font-bold text-blue-900 font-mono text-[11px]">CLEAN AIR WORKBENCH SAFE</div>
              <p className="text-[11px] text-blue-800 leading-snug">
                Carbon filtration removes resin fumes, making it safe for jewelers working right alongside the machine.
              </p>
            </div>
          </div>

          {/* Feature 03: Easy Print head Levelling */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700">Feature 03</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
                Easy Print head Levelling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Very Easy Print head Levelling with Stable all Metal CNC cut head. Levelling of print head is very crucial
                part of DLP 3D Printer. With our advanced design of Print head it becomes very easy for non technical
                person to operate the machine without any trouble.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1.5 text-xs">
              <div className="font-bold text-emerald-900 font-mono text-[11px]">ALL-METAL CNC PLATFORM</div>
              <p className="text-[11px] text-emerald-800 leading-snug">
                Locks flat once and stays calibrated. Zero daily re-leveling headaches for goldsmiths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. TARGET USERS: EKA HT IS FOR
         ==================================================== */}
      <section ref={usersRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-6">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
              — Application Fit —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              EKA HT is for
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Designed specifically to meet the production cycles of jewelry designers, jobwork casting units, and large manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { title: 'Designer', desc: 'Craft delicate filigree and organic geometries without prototyping constraints' },
              { title: 'Casting Provider', desc: 'Batch tree production with 100% clean burnout in gold, silver, and platinum' },
              { title: 'Manufacturer', desc: 'High-throughput 24/7 jewelry pattern runs with consistent dimensional accuracy' },
              { title: 'Individuals', desc: 'Intuitive plug-and-play operation for independent goldsmiths and custom ateliers' },
            ].map((u, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2 hover:border-amber-400 hover:bg-amber-50/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center mx-auto text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-black text-base text-slate-950 uppercase">{u.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. SERVICE BENEFITS (4 CARDS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ekaHtData.serviceBenefits.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-950">{b.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          6. EXPERT CALLBACK SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-3xl p-8 sm:p-10 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Any Doubts / Questions about EKA HT ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Request an Expert Call Back and speak directly with our senior jewelry application engineer.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal('EKA HT Expert Call Back Inquiry')}
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Request Now
          </button>
        </div>
      </section>


      {/* ====================================================
          8. WORK FROM EKA HT (JEWELRY GALLERY)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
              — Direct Castable Precision —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Work From EKA HT
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              High-definition wax models, micro-prong settings, intricate filigree, and dense casting trees.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Patterns' },
              { id: 'rings', label: 'Rings' },
              { id: 'bangles', label: 'Bangles' },
              { id: 'ornamental', label: 'Ornamental' },
              { id: 'casting', label: 'Casting Trees' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeGalleryCat === cat.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-amber-400 font-mono text-[9px] font-bold uppercase">
                    {item.material}
                  </div>
                </div>
                <h3 className="font-bold text-sm text-slate-950 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ====================================================
          10. TRUSTED USERS & TECHNICAL SUPPORT
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Trusted by Industrial Users</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              24X7 Dedicated Technical Support engineered for jewelers, casting workshops, and precision prototyping studios.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">Verified User Base</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Serving industrial engineers, educational institutes, research labs, and independent jewelry artisans.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          11. TECHNICAL SPECIFICATION OF EKA HT
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Engineering Sheet —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Technical Specification of EKA HT
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {ekaHtData.softwareGuarantee}
          </p>
        </div>

        {/* Two-Column Specification Layout */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs divide-y divide-slate-100 md:divide-y-0">
            {ekaHtData.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-bold text-slate-600">{spec.property}</span>
                <span className="font-mono text-slate-950 font-bold">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs font-bold text-amber-800">
              * Print speed varies depending on the geometry of parts and resin selection.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          12. EKA HT FAQ SECTION
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Clarifications —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {ekaHtData.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-950 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          13. FINAL CONVERSION & BROCHURE CTA
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-mono text-xs font-bold rounded-md">
              Start Your Jewelry Production
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Start Your 3D Printing Journey with EKA HT
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connect with our jewelry technology specialists for a live casting sample or comprehensive quotation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('EKA HT Final Purchase Quote')}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            <a
              href={ekaHtData.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Product Brochure</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default EkaHtPage
