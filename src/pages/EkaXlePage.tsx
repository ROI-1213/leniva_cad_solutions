import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  ChevronDown,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  ekaXleData,
  engineeringWorkGallery,
} from '../data/ekaProductsData'

export const EkaXlePage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<(typeof engineeringWorkGallery)[0] | null>(null)

  // Section Refs
  const overviewRef = useRef<HTMLDivElement>(null)
  const dlpRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const resinsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // SEO Setup
  useEffect(() => {
    document.title = 'EKA XLE Resin 3D Printer for Engineering Applications | Made in India | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'EKA XLE is India’s premier engineering DLP resin 3D printer with 202×113×200 mm build volume, HD DLP projector engine, 48-micron resolution, and 10 technical engineering photopolymers.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'EKA XLE Engineering DLP Resin 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/eka-xle.png',
      description: ekaXleData.heroDesc,
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

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-blue-600 selection:text-white">
      {/* ====================================================
          STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-slate-950 tracking-tight">EKA XLE</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              {ekaXleData.platformSize}
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-blue-700">
              Engineering DLP
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(dlpRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              DLP Engine
            </button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              Specifications
            </button>
            <button onClick={() => scrollTo(resinsRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              Supported Resins
            </button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              Engineering Work
            </button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-blue-700 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={ekaXleData.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('EKA XLE Engineering 3D Printer Inquiry')}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
          <span className="font-semibold text-slate-900">EKA XLE</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold uppercase tracking-wider">
                {ekaXleData.subHeadline}
              </span>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider font-mono">
                {ekaXleData.topHeadline}
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                {ekaXleData.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {ekaXleData.heroDesc}
              </p>
            </div>

            {/* Quick Specs Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Platform Size</span>
                <span className="text-sm sm:text-base font-black text-slate-950 font-mono mt-0.5 block">
                  {ekaXleData.platformSize}
                </span>
              </div>
              <div className="border-x border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">XY Resolution</span>
                <span className="text-sm sm:text-base font-black text-blue-700 font-mono mt-0.5 block">
                  48 Micron
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Warranty</span>
                <span className="text-sm sm:text-base font-black text-emerald-600 font-mono mt-0.5 block">
                  1 Year Full
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={ekaXleData.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Product Brochure</span>
              </a>

              <button
                onClick={() => openQuoteModal('EKA XLE Expert Consultation Request')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request an Expert Call Back</span>
              </button>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-slate-50 bg-gradient-to-b from-blue-50/60 via-slate-100/70 to-white p-6 sm:p-12 border border-slate-200/90 shadow-xl overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
              {/* Tech Grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="absolute top-6 left-6 flex items-center space-x-1.5 text-[10px] font-mono font-bold text-slate-500 bg-white/95 px-3 py-1 rounded-md border border-slate-200 shadow-2xs">
                <span>202 × 113 × 200 MM</span>
              </div>

              <div className="absolute top-6 right-6 flex items-center space-x-1 text-[10px] font-mono font-bold text-blue-700 bg-blue-50/95 px-3 py-1 rounded-md border border-blue-200 shadow-2xs">
                <span>HD DLP OPTICAL ENGINE</span>
              </div>

              {/* Product Machine Render */}
              <div className="relative z-10 w-full max-w-[380px] aspect-square flex items-center justify-center transition-transform duration-700 hover:scale-[1.03]">
                <img
                  src={ekaXleData.heroImage}
                  alt="EKA XLE Engineering DLP Resin 3D Printer"
                  className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(37,99,235,0.18)]"
                  loading="eager"
                />
              </div>

              {/* Floor Shadow */}
              <div className="w-3/4 h-5 bg-slate-900/15 rounded-full blur-md -mt-3" />
            </div>
          </div>
        </div>
      </section>


      {/* ====================================================
          3. ENGINEERING PRODUCT DESCRIPTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 max-w-5xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            — Industrial Positioning —
          </span>
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900">
              {ekaXleData.engineeringDescription.paragraph1}
            </p>
            <p className="text-slate-600">
              {ekaXleData.engineeringDescription.paragraph2}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. SERVICE BENEFITS & PRODUCT POSITIONING (1 YEAR)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ekaXleData.serviceBenefits.map((b, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-950">{b.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* 1 Year Full Warranty Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            {ekaXleData.positioningTitle}
          </h3>
          <p className="text-base sm:text-lg font-bold text-blue-400">
            {ekaXleData.warrantyStatement}
          </p>
        </div>
      </section>

      {/* ====================================================
          5. DLP PROJECTOR ENGINE
         ==================================================== */}
      <section ref={dlpRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            — Optical Core —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {ekaXleData.dlpEngine.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {ekaXleData.dlpEngine.desc}
          </p>
        </div>

        {/* Optical Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ekaXleData.dlpEngine.workflow.map((w, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600">{w.step}</span>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
              <h3 className="text-sm font-black text-slate-950 uppercase">{w.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          6. TECHNICAL SPECIFICATIONS OF EKA XLE
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            — Engineering Sheet —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Technical Specifications of EKA XLE
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Certified technical specifications for the EKA XLE industrial machine.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-xs">
            {ekaXleData.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-slate-100">
                <span className="font-bold text-slate-600">{spec.property}</span>
                <span className="font-mono text-slate-950 font-bold">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs font-bold text-blue-800">
              * Print speed varies depending on the geometry of parts and resin selection.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. BROAD RANGE OF RESIN MATERIALS (10 RESINS + BROCHURE SPECS)
         ==================================================== */}
      <section ref={resinsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            — Materials Spectrum —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Broad Range of Resin Materials
          </h2>
          <p className="text-sm font-bold text-slate-700">
            Select Perfect Resin according to your application
          </p>
          <p className="text-xs text-slate-500">
            Supported Resins in EKA XLE. All resins available in 500g and 1000g packages.
          </p>
        </div>

        {/* 10 Resins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ekaXleData.supportedResins.map((resin) => (
            <div
              key={resin.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block">
                  {resin.tag}
                </span>
                <h3 className="font-black text-sm text-slate-950 leading-snug">{resin.name}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{resin.description}</p>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  Packs: {resin.packSizes}
                </div>
              </div>

              <Link
                to={resin.productLink}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1 pt-1"
              >
                <span>Explore More</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          8. EXPERT CALLBACK SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-3xl p-8 sm:p-10 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Any Doubts / Questions about EKA XLE ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Request an Expert Call Back and speak directly with our senior engineering photopolymer specialist.
            </p>
          </div>
          <button
            onClick={() => openQuoteModal('EKA XLE Expert Call Back Inquiry')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Request Now
          </button>
        </div>
      </section>

      {/* ====================================================
          9. WORK FROM EKA XLE (ENGINEERING GALLERY)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Engineering Prototyping —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Work From EKA XLE
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            High-accuracy photopolymer benchmark specimens including planetary gearboxes and snap-fit assemblies.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
          {engineeringWorkGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-red-200 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold rounded-lg shadow-md flex items-center space-x-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-red-600" />
                      <span>Inspect Part</span>
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-mono font-bold shadow-md">
                    {item.material}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-950 leading-snug group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for HD Inspection */}
      {selectedGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-fade-in my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HD Image Section */}
            <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[200px] max-h-[46vh] sm:max-h-[50vh] shrink-0">
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.title}
                className="w-full h-full object-contain max-h-[46vh] sm:max-h-[50vh] p-2"
              />
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md z-10"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Specimen Details Section */}
            <div className="p-4 sm:p-6 space-y-2.5 overflow-y-auto flex-1 bg-white border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold uppercase">
                  {selectedGalleryItem.category}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  EKA XLE 48µm Specimen
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950">{selectedGalleryItem.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Material Formulation:</strong> {selectedGalleryItem.material}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Engineering Assessment:</strong> {selectedGalleryItem.notes}
              </p>
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedGalleryItem(null)
                    openQuoteModal(`Sample benchmark request: ${selectedGalleryItem.title}`)
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
                >
                  Request Similar Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          10. EKA XLE FAQ SECTION
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
            — Clarifications —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {ekaXleData.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-950 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
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
          11. FINAL CONVERSION & BROCHURE CTA
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 font-mono text-xs font-bold rounded-md">
              Engineering DLP Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Start Your 3D Printing Journey with EKA XLE
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connect with our application engineers for turnkey mechanical prototyping and custom polymer testing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('EKA XLE Final Purchase Quote')}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            <a
              href={ekaXleData.brochureUrl}
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

export default EkaXlePage
