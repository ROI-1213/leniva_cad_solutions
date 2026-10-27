import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  Phone,
  ArrowRight,
  CheckCircle2,
  Gem,
  Sparkles,
  Maximize2,
  X,
  ShieldCheck,
  Check,
  Send,
  Award,
  Flame,
  Zap,
  Box,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { recordCustomerEnquiry } from '../utils/cloudSync'
import { ekaF116kData as defaultEkaF116kData, LcdGalleryItem } from '../data/industrialLcdData'
import { mergeCatalogWithHardwareData } from '../utils/productCatalog'

export const EkaF116kPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const ekaF116kData = mergeCatalogWithHardwareData('eka-f1-16k', defaultEkaF116kData)

  // Gallery filter & lightbox state
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<LcdGalleryItem | null>(null)

  // Enquiry form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'Jewelry Manufacturer',
    resinType: 'Direct Castable Wax',
    message: '',
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Section Refs for Sub-navigation / Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // SEO Setup & Structured Data
  useEffect(() => {
    document.title =
      'EKA F1 16K Jewelry LCD 3D Printer | 16K Ultra-High Resolution | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'EKA F1 16K is a next-generation jewelry and industrial LCD 3D printer with 16K resolution (15120×6230), 14–19 micron XY accuracy, and 212×118×240 mm build volume for direct wax casting.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'EKA F1 16K Industrial LCD Jewelry 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/eka-f1-16k.png',
      description: ekaF116kData.description,
      brand: { '@type': 'Brand', name: 'Make3D / EKA' },
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    try {
      await recordCustomerEnquiry({
        fullName: formState.name,
        email: formState.email,
        phone: formState.phone,
        company: (formState as any).company || formState.businessType,
        productOrService: `EKA F1 16K LCD 3D Printer (${formState.resinType || 'Direct Castable Wax'})`,
        quantity: '1',
        application: `${formState.businessType} - ${formState.resinType}`,
        timeline: 'Immediate',
        message: formState.message || `Business: ${formState.businessType} | Resin: ${formState.resinType}`,
        source: 'EKA F1 16K Product Page Form',
        enquiryType: 'quote',
      })
    } catch (err) {
      console.warn('Form submit error:', err)
    } finally {
      setFormSubmitting(false)
      setFormSuccess(true)
    }
  }

  const galleryCategories = [
    { id: 'all', label: 'All Samples' },
    { id: 'rings', label: 'Rings & Stones' },
    { id: 'filigree', label: 'Filigree & Necklaces' },
    { id: 'dental', label: 'Dental Models' },
    { id: 'miniatures', label: 'Miniatures' },
    { id: 'micro', label: 'Micro Parts' },
  ]

  const filteredGallery =
    activeCategory === 'all'
      ? ekaF116kData.gallery
      : ekaF116kData.gallery.filter((item) => item.filterCategory === activeCategory)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-amber-600 selection:text-white">
      {/* ====================================================
          STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black text-slate-950 tracking-tight">EKA F1 16K</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              16K • 14–19 µm
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500">
              212 × 118 × 240 mm
            </span>
          </div>

          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-4 sm:space-x-6 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar py-1.5 lg:py-0 border-t lg:border-t-0 border-slate-100 whitespace-nowrap">
            <button
              onClick={() => scrollTo(overviewRef)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo(featuresRef)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Key Features
            </button>
            <button
              onClick={() => scrollTo(galleryRef)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Jewelry Gallery
            </button>
            <button
              onClick={() => scrollTo(specsRef)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Specifications
            </button>
            <button
              onClick={() => scrollTo(contactRef)}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              Enquiry Form
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openQuoteModal('EKA F1 16K Quick Quote')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Get Quote
            </button>
            <a
              href={ekaF116kData.brochureUrl}
              download
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Brochure</span>
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================
          1. HERO SECTION
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-2 sm:!mt-3 pt-0">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-3 sm:mb-4 flex-wrap gap-y-1">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to="/products/industrial-lcd-3d-printers"
            className="hover:text-slate-900 transition-colors"
          >
            Industrial LCD 3D Printers
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">EKA F1 16K</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
                  <Gem className="w-3.5 h-3.5 text-amber-600" />
                  <span>16K Ultra-High Resolution LCD</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                  Jewelry &amp; Fine Precision
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                  Made in India
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  {ekaF116kData.mainProductHeading}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {ekaF116kData.description}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {ekaF116kData.secondDescription}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {ekaF116kData.thirdDescription}
                </p>
              </div>

              {/* Support & Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {ekaF116kData.supportHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50/80 text-amber-900 rounded-lg text-xs font-bold border border-amber-200/80"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{highlight}</span>
                  </span>
                ))}
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
                  <Flame className="w-3.5 h-3.5 text-emerald-600" />
                  <span>500g Direct Castable Resin Included Free</span>
                </span>
              </div>

              {/* Application Domains */}
              <div className="pt-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Recommended For:
                </span>
                <div className="flex flex-wrap gap-2">
                  {ekaF116kData.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200/80 flex items-center space-x-1.5"
                    >
                      <Check className="w-3 h-3 text-amber-600" />
                      <span>{app}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Resolution</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">16K Ultra-HD</div>
                  <div className="text-[10px] text-amber-700 font-bold">15120 × 6230</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">XY Accuracy</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">14 – 19 µm</div>
                  <div className="text-[10px] text-amber-700 font-bold">Razor-Sharp Prongs</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Platform Size</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">212×118×240</div>
                  <div className="text-[10px] text-amber-700 font-bold">mm Build Volume</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Speed Throughput</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">700 Layers/hr</div>
                  <div className="text-[10px] text-amber-700 font-bold">Rapid Turnaround</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openQuoteModal('EKA F1 16K Hero Request')}
                  className="px-7 py-3.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={ekaF116kData.brochureUrl}
                  download
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>Download Brochure</span>
                </a>
                <button
                  onClick={() => scrollTo(contactRef)}
                  className="px-5 py-3.5 text-slate-700 hover:text-amber-700 text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Request Jewelry Sample</span>
                </button>
              </div>
            </div>

            {/* Right Product Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-[460px] rounded-2xl bg-slate-100 bg-gradient-to-b from-amber-100/60 via-slate-100/50 to-slate-200/40 p-8 flex items-center justify-center border border-slate-200 shadow-inner group">
                {/* Tech dimension overlays */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-slate-600 border border-slate-200/80 shadow-xs">
                  X: 212 mm
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-slate-600 border border-slate-200/80 shadow-xs">
                  Y: 118 mm
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-slate-600 border border-slate-200/80 shadow-xs">
                  Z: 240 mm
                </div>
                <div className="absolute bottom-4 right-4 bg-amber-600 text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold shadow-xs">
                  16K ULTRA-HD
                </div>

                <img
                  src={ekaF116kData.heroImage}
                  alt={ekaF116kData.name}
                  className="max-h-[380px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                />
              </div>

              <div className="mt-4 flex items-center justify-between w-full max-w-[460px] px-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Technical Support</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>CNC Anodized Print Head</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. KEY FEATURES SECTION (6 Cards)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Ultra-High Precision Masterpiece —
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Key Features of EKA F1 16K
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Crafted specifically to meet the exacting tolerances of fine gold casting, micro stone prong settings,
            and delicate filigree craftsmanship without manual filing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekaF116kData.keyFeatures.map((feat, idx) => {
            const icons = [Gem, Box, Sparkles, Zap, Award, Phone]
            const IconComponent = icons[idx % icons.length]

            return (
              <div
                key={feat.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group hover:border-amber-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {feat.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-800 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {feat.visualHighlight && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-amber-800">
                    <span>{feat.visualHighlight}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          3. WORK FROM EKA F1 16K (Jewelry & Fine Detail Gallery)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
              — Flawless Castable Precision —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Work from EKA F1 16K
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Inspect actual castable wax prints, micro-pavé rings, royal filigree ornaments, dental study dies,
              and collector-grade miniatures cured with 14–19 micron XY fidelity.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - 4 Columns Matching Reference Exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
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
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-bold rounded-lg shadow-md flex items-center space-x-1.5">
                      <Maximize2 className="w-3 h-3 text-amber-700" />
                      <span>Inspect Details</span>
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-1 rounded-md sm:rounded-lg bg-[#b45309] text-white text-[10px] sm:text-[11px] font-bold font-sans shadow-md tracking-tight">
                    {item.badge || item.category}
                  </span>
                </div>

                <div className="p-3.5 sm:p-4">
                  <h4 className="text-xs sm:text-[13px] lg:text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          4. TECHNICAL SPECIFICATIONS SECTION (18 Specs)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-mono">
            — Complete Technical Specifications —
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            EKA F1 16K Technical Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Detailed dimensions, optical engine parameters, resolution specs, and factory package contents.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {ekaF116kData.specifications.map((spec, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between py-3 border-b border-slate-100 text-xs sm:text-sm ${
                  spec.highlight ? 'bg-amber-50/60 px-3 rounded-lg border-amber-100' : ''
                }`}
              >
                <span className="font-medium text-slate-600 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{spec.property}</span>
                </span>
                <span
                  className={`font-mono text-right ${
                    spec.highlight
                      ? 'font-bold text-amber-900'
                      : 'font-semibold text-slate-900'
                  }`}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Download Specs Banner */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-slate-950">
                Download Official EKA F1 16K Technical Brochure
              </h4>
              <p className="text-xs text-slate-600">
                Includes UV oven curing protocols, casting burnout cycle guidelines, and stone-setting tolerances.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={ekaF116kData.brochureUrl}
                download
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Specifications</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. READY TO GET STARTED? (Enquiry Form Section)
         ==================================================== */}
      <section ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-800 shadow-2xl">
          {/* Subtle Grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d97706 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Gem className="w-3.5 h-3.5" />
                <span>EKA F1 16K JEWELRY DESK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to Upgrade Your Jewelry Production to 16K?
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                Experience ultra-fine 14–19 micron castable wax printing firsthand.
                Send us your CAD file for a complimentary jewelry casting benchmark sample.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Includes UV Curing Oven and 500g Direct Castable Resin in box</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Free shipping across all jewelry manufacturing hubs in India</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dedicated service support &amp; continuous firmware upgrades</span>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4 text-xs font-semibold text-slate-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Jewelry Specialist Desk: +91 91730 08181</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
                {formSuccess ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950">Thank You for Your Enquiry!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                      Our team will contact you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormSuccess(false)
                        setFormState({
                          name: '',
                          email: '',
                          phone: '',
                          businessType: 'Jewelry Manufacturer',
                          resinType: 'Direct Castable Wax',
                          message: '',
                        })
                      }}
                      className="mt-2 px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h3 className="text-lg font-black text-slate-950">
                      Request Quote &amp; Free Wax Sample
                    </h3>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Ramesh Zaveri"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="ramesh@jewellers.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                          Business / Studio Type
                        </label>
                        <select
                          value={formState.businessType}
                          onChange={(e) => setFormState({ ...formState, businessType: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                        >
                          <option value="Jewelry Manufacturer">Jewelry Manufacturer</option>
                          <option value="Jewelry CAD Designer">Jewelry CAD Designer</option>
                          <option value="Dental Laboratory">Dental Laboratory</option>
                          <option value="Miniature / Figurine Studio">Miniature Studio</option>
                          <option value="Engineering R&D">Engineering R&amp;D</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                          Primary Resin Material
                        </label>
                        <select
                          value={formState.resinType}
                          onChange={(e) => setFormState({ ...formState, resinType: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                        >
                          <option value="Direct Castable Wax">Direct Castable Wax</option>
                          <option value="High-Definition Master Resin">High-Definition Master Resin</option>
                          <option value="Dental Model Resin">Dental Model Resin</option>
                          <option value="Tough Engineering Resin">Tough Engineering Resin</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold uppercase text-slate-600 mb-1">
                        Specific Questions or Sample Request
                      </label>
                      <textarea
                        rows={3}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us about your casting requirements or request a physical printed sample..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Request for EKA F1 16K</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 text-center pt-1">
                      🔒 Your details are never shared. Direct manufacturer support from Leniva CAD Solutions.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. LIGHTBOX MODAL FOR WORK GALLERY (HD INSPECTION)
         ==================================================== */}
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
                  EKA F1 16K Micro-Detail Specimen
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950">{selectedGalleryItem.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Material:</strong> {selectedGalleryItem.material}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Casting &amp; Surface Note:</strong> {selectedGalleryItem.notes}
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
    </div>
  )
}

export default EkaF116kPage
