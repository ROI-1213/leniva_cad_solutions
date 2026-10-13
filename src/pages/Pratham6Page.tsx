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
  Activity,
  Award,
  Factory,
  Wrench,
  ArrowRight,
  Maximize2,
  Compass,
  Play,
  Check,
  Settings,
  Send,
  X,
  HardDrive,
  Sliders,
  RotateCcw,
  GraduationCap,
  Building2,
  FileCode,
  Gauge,
  Thermometer,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham6Page: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()

  // Navigation & Interactive Tabs
  const [activeNav, setActiveNav] = useState<string>('overview')
  const [activeSpecTab, setActiveSpecTab] = useState<'print' | 'software' | 'mechanics' | 'electrical'>('print')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)
  const [activeVideoId, setActiveVideoId] = useState<string>('keJLiOXitCw')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA')

  // Interactive Print Simulator state
  const [simLayerHeight, setSimLayerHeight] = useState<number>(200)
  const [simSpeed, setSimSpeed] = useState<number>(80)

  // In-page Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    industry: 'Automotive & Mobility',
    application: 'Functional Prototyping',
    material: 'PLA / Engineering Blends',
    partSize: 'Up to 600 mm',
    frequency: 'Daily Production Runs',
    contactMethod: 'Phone & WhatsApp',
    message: '',
  })
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)
  const [formSuccess, setFormSuccess] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Section Refs for Smooth Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, navId: string) => {
    setActiveNav(navId)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Official URLs
  const officialBrochureUrl = '/brochures/pratham-6.pdf'
  const officialProductUrl = 'https://make3d.in/pratham-6-0/'

  // SEO & Structured Data
  useEffect(() => {
    document.title = 'Pratham 6.0 Industrial 3D Printer | 600 × 600 × 600 mm | Make3D'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the Make3D Pratham 6.0 large-scale industrial FDM 3D printer with a 600 × 600 × 600 mm build volume, enclosed chamber, engineering material support and nationwide service options.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 6.0 Large-Scale Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-6-0.png',
      description:
        'Pratham 6.0 is a 600 × 600 × 600 mm large-format industrial FDM 3D printer manufactured by Make3D in India for functional parts, tooling applications, oversized prototypes and production-ready components.',
      brand: {
        '@type': 'Brand',
        name: 'Make3D',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Make3D.in',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: 'Contact for Quote',
        availability: 'https://schema.org/InStock',
        url: 'https://lenivacadsolution.com/products/pratham-6-0',
      },
    }

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lenivacadsolution.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://lenivacadsolution.com/products' },
        { '@type': 'ListItem', position: 3, name: 'FDM 3D Printers', item: 'https://lenivacadsolution.com/products/fdm-3d-printers' },
        { '@type': 'ListItem', position: 4, name: 'Pratham 6.0', item: 'https://lenivacadsolution.com/products/pratham-6-0' },
      ],
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    }

    const scriptP = document.createElement('script')
    scriptP.type = 'application/ld+json'
    scriptP.text = JSON.stringify(productSchema)
    document.head.appendChild(scriptP)

    const scriptB = document.createElement('script')
    scriptB.type = 'application/ld+json'
    scriptB.text = JSON.stringify(breadcrumbsSchema)
    document.head.appendChild(scriptB)

    const scriptF = document.createElement('script')
    scriptF.type = 'application/ld+json'
    scriptF.text = JSON.stringify(faqSchema)
    document.head.appendChild(scriptF)

    return () => {
      if (document.head.contains(scriptP)) document.head.removeChild(scriptP)
      if (document.head.contains(scriptB)) document.head.removeChild(scriptB)
      if (document.head.contains(scriptF)) document.head.removeChild(scriptF)
    }
  }, [])

  // Handle in-page Quote Submission
  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!quoteForm.name.trim() || !quoteForm.email.trim() || !quoteForm.phone.trim()) {
      setFormError('Please fill in your Name, Email and Phone number.')
      return
    }

    setFormSubmitting(true)
    try {
      const success = await submitQuote({
        fullName: quoteForm.name,
        company: quoteForm.company || 'Not Specified',
        email: quoteForm.email,
        phone: quoteForm.phone,
        productOrService: 'Pratham 6.0 Large-Scale Industrial 3D Printer',
        quantity: '1 Unit',
        application: quoteForm.application,
        message: `City: ${quoteForm.city}, State: ${quoteForm.state} | Industry: ${quoteForm.industry} | Material: ${quoteForm.material} | Expected Size: ${quoteForm.partSize} | Frequency: ${quoteForm.frequency} | Contact: ${quoteForm.contactMethod} | Additional Notes: ${quoteForm.message}`,
      })

      if (success) {
        setFormSuccess(true)
      } else {
        setFormError('Could not process quote request at this moment. Please call us directly.')
      }
    } catch {
      setFormError('An unexpected error occurred. Please try again or call sales.')
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-red-600 selection:text-white font-inter">
      {/* ====================================================
          1. BREADCRUMBS BAR
         ==================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/products" className="hover:text-red-600 transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/products/fdm-3d-printers" className="hover:text-red-600 transition-colors">
              FDM 3D Printers
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold">Pratham 6.0 (600 × 600 × 600 mm)</span>
          </nav>
        </div>
      </div>

      {/* ====================================================
          2. STICKY PRODUCT NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Pratham 6.0</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                600 mm³
              </span>
            </span>
            <span className="text-xs text-slate-400 hidden md:inline font-mono">| Make3D Industrial FDM</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'features', label: 'Features', ref: featuresRef },
              { id: 'materials', label: 'Materials', ref: materialsRef },
              { id: 'specs', label: 'Specifications', ref: specsRef },
              { id: 'gallery', label: 'Gallery', ref: galleryRef },
              { id: 'support', label: 'Support', ref: supportRef },
              { id: 'faqs', label: 'FAQs', ref: faqRef },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.ref, nav.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeNav === nav.id
                    ? 'text-red-600 bg-red-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={officialBrochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:border-slate-400 hover:bg-slate-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham 6.0 Large-Scale Industrial 3D Printer')}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          3. HERO SECTION (Split Layout)
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Product Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>MAKE3D | LARGE-SCALE INDUSTRIAL FDM 3D PRINTER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Pratham 6.0 — Built for Bigger Industrial 3D Printing
              </h1>
              <p className="text-lg sm:text-xl font-bold text-red-600 tracking-tight">
                Large Scale. Industrial Strength. Made in India.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Pratham 6.0 is a large-format industrial 3D printer engineered for functional parts, tooling applications,
              oversized prototypes and production-ready components. Its 600 × 600 × 600 mm build volume enables large
              components to be printed in a single build, potentially reducing assembly steps and improving workflow
              efficiency.
            </p>

            {/* Positioning Banner */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border-l-4 border-red-500 shadow-sm space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                Powerful. Precise. Made in India.
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Built for large-format functional parts, tooling applications and production-ready components, Pratham
                6.0 delivers industrial precision, stability and long-hour reliability in demanding environments.
              </p>
            </div>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {[
                { label: 'Build Volume', value: '600 × 600 × 600 mm', icon: Box },
                { label: 'Chamber Design', value: 'Fully Enclosed Chamber', icon: ShieldCheck },
                { label: 'Chassis System', value: 'All-Metal MS Body', icon: Factory },
                { label: 'Thermal Profile', value: 'Up to 280°C Extrusion', icon: Flame },
                { label: 'Operator Control', value: 'Touchscreen Interface', icon: Monitor },
                { label: 'Indigenous Origin', value: '100% Made in India', icon: Award },
              ].map((badge, idx) => {
                const Icon = badge.icon
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex items-start space-x-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">{badge.label}</span>
                      <strong className="text-xs font-bold text-slate-900 leading-tight block">{badge.value}</strong>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal('Pratham 6.0 Large-Scale Industrial 3D Printer')}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={officialBrochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm tracking-wide shadow-2xs hover:bg-slate-50 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download Brochure (PDF)</span>
              </a>
              <button
                onClick={() => {
                  setActiveVideoId('keJLiOXitCw')
                  setVideoModalOpen(true)
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm tracking-wide transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-600 fill-red-600" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual with Technical Callout Pins */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-radial from-white via-slate-100/80 to-slate-200/50 p-6 sm:p-8 border border-slate-200/80 shadow-lg overflow-hidden group">
              {/* Technical Grid Overlay */}
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Machine Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Industrial Grade</span>
              </div>

              {/* Main Machine Image */}
              <div className="relative z-0 flex items-center justify-center py-4">
                <img
                  src="/images/products/pratham-6-0.png"
                  alt="Make3D Pratham 6.0 Large-Scale Industrial 3D Printer"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Verified Technical Callouts around Product */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Large 600 mm cubic build space</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Fully enclosed chamber</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Heavy-duty all-metal MS body</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Full touchscreen control</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. QUICK PRODUCT HIGHLIGHTS SPECIFICATION STRIP
         ==================================================== */}
      <section ref={highlightsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold">
                Technical Highlights Strip
              </span>
              <h2 className="text-base font-extrabold text-slate-900">Verified Technical Parameters at a Glance</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Source-Attributed:{' '}
              <a
                href={officialProductUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red-600 font-semibold"
              >
                Official Product Page
              </a>{' '}
              & Official Brochure
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
            {[
              {
                label: 'Build Volume',
                val: '600×600×600 mm',
                sub: '600 mm³ Cubic Capacity',
                src: 'Page & Brochure',
              },
              {
                label: 'Technology',
                val: 'FDM / FFF',
                sub: 'Fused Filament Fabrication',
                src: 'Page & Brochure',
              },
              {
                label: 'Layer Resolution',
                val: '80–600 µm',
                sub: '0.08–0.4 mm in Brochure',
                src: 'Source-Differentiated',
              },
              {
                label: 'Print Speed',
                val: 'Up to 120 mm/s',
                sub: '40–120 mm/s in Brochure',
                src: 'Source-Differentiated',
              },
              {
                label: 'Filament Size',
                val: '1.75 mm',
                sub: 'Standard Diameter',
                src: 'Page & Brochure',
              },
              {
                label: 'Extruder Temp',
                val: 'Up to 280°C',
                sub: 'Single Extruder System',
                src: 'Brochure Listed',
              },
              {
                label: 'Heated Bed Temp',
                val: 'Up to 120°C',
                sub: 'Silicone + Aluminum Bed',
                src: 'Brochure Listed',
              },
              {
                label: 'Control System',
                val: 'Touchscreen',
                sub: 'Intuitive Operating Panel',
                src: 'Brochure Listed',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">{item.label}</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-950 mt-1 block font-mono">{item.val}</strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.sub}</span>
                </div>
                <span className="text-[9px] font-mono text-red-600 block mt-2 pt-1 border-t border-slate-200/60">
                  {item.src}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60">
            <strong>Accuracy Notice:</strong> The official Make3D product page and brochure list distinct resolution (80–600 microns on page vs 0.08–0.4 mm in brochure) and speed values (up to 120 mm/s on page vs 40–120 mm/s in brochure). Both are preserved above with source attribution.
          </p>
        </div>
      </section>

      {/* ====================================================
          5. PRODUCT OVERVIEW & CONTENT CARDS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Engineering Overview
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Designed for Large-Scale Industrial Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 6.0 is engineered for industries that require high build capacity, structural strength and consistent printing performance. With its spacious 600 mm cubic build volume, it enables the production of oversized parts in a single print, reducing the need to split large designs into smaller sections and assemble them later. Its enclosed structure, industrial mechanics and material flexibility make it suitable for demanding production and engineering environments.
          </p>
        </div>

        {/* 4 Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Large-Format Printing',
              desc: 'Print oversized prototypes, functional parts and manufacturing components within a massive 600 × 600 × 600 mm build area without sectioning.',
              icon: Box,
              tag: '600 mm³ Volume',
            },
            {
              title: 'Industrial Stability',
              desc: 'Heavy-duty all-metal MS body and THK linear motion guides are designed for stable, vibration-damped large-component manufacturing.',
              icon: Factory,
              tag: 'All-Metal MS Body',
            },
            {
              title: 'Material Flexibility',
              desc: 'Supports a range of thermoplastic filaments including ABS, PLA, PETG, TPU, ASA, Nylon, and Carbon blends subject to validated profiles.',
              icon: Layers,
              tag: 'Multi-Material System',
            },
            {
              title: 'Long-Hour Workflows',
              desc: 'Engineered for demanding industrial printing and extended production cycles; tested by Make3D for continuous print runs of up to 268 hours.',
              icon: Activity,
              tag: '268h Continuous Run Tested',
            },
          ].map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md uppercase">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Visual Scale Callout: Large Printed Stool beside Machine */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">
              Visual Scale & Capability
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Monolithic Large-Format 3D Printing Without Sectional Assembly
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In conventional desktop 3D printing, large objects like ergonomic stools, automotive body ducts, and full-scale architectural mockups must be divided into dozens of separate tiles and glued together. Pratham 6.0 prints 600 mm tall monolithic structures in a single run with structural integrity and clean surface continuity.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => {
                  setActiveVideoId('u2ejMFRXmhI')
                  setVideoModalOpen(true)
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
              >
                <Play className="w-4 h-4 fill-red-600" />
                <span>Watch Real Size Stool Video (0:33)</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 bg-slate-100 p-4 sm:p-6 flex items-center justify-center">
            <img
              src="/images/pratham6/pratham6-printed-stool.jpg"
              alt="Pratham 6.0 alongside 3D printed full-scale stool"
              className="rounded-2xl max-h-96 w-full object-cover shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ====================================================
          6. KEY FEATURES (15 Detailed Feature Cards)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Comprehensive Engineering
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Engineered for Industrial-Grade Performance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Detailed breakdown of every mechanical, electrical, thermal and software feature incorporated into Pratham 6.0, verified directly against manufacturer documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f, idx) => {
            const Icon = f.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      {f.badge}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Feature #{idx + 1}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base mt-0.5">{f.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Source: {f.source}</span>
                  {f.highlight && <span className="text-slate-800 font-semibold">{f.highlight}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          7. INDUSTRIAL PERFORMANCE & THERMAL MANAGEMENT
         ==================================================== */}
      <section ref={performanceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Factory Performance Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Built for Demanding Production Workloads
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pratham 6.0 is positioned by Make3D for continuous heavy-duty industrial workloads requiring large-format printing, material flexibility, and dependable repeat accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Continuous Industrial Printing',
                desc: 'Engineered chassis and motion system designed for round-the-clock print jobs without thermal drift.',
                icon: Activity,
              },
              {
                title: 'High-Strength Material Compatibility',
                desc: 'Capable of extruding engineering polymers up to 280°C with 120°C heated bed thermal support.',
                icon: Flame,
              },
              {
                title: 'Stable Large-Component Manufacturing',
                desc: 'Structural all-metal MS body dampens acceleration vibrations across long toolpaths.',
                icon: Factory,
              },
              {
                title: 'Excellent Layer Adhesion',
                desc: 'Enclosed build volume traps convection heat to prevent draft-induced interlayer delamination.',
                icon: Layers,
              },
              {
                title: 'Consistent Dimensional Accuracy',
                desc: 'THK linear motion guides with industrial Z-axis ball screw deliver ±0.1 mm nominal dimensional tolerance.',
                icon: ShieldCheck,
              },
              {
                title: 'Optimized Thermal Management',
                desc: 'Uniform silicone heating element prevents corner curl and warping on oversized 600 mm footprints.',
                icon: Thermometer,
              },
            ].map((perf, idx) => {
              const Icon = perf.icon
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-white">{perf.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{perf.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Interactive Simulation: Layer Height & Speed Parameter Visualizer */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold">Interactive Tool</span>
                <h4 className="font-bold text-sm text-white">Layer Resolution & Speed Tuning Visualizer</h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Adjust sliders to see recommended industrial print configurations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Layer Thickness Setting:</span>
                  <strong className="text-white">{simLayerHeight} microns ({(simLayerHeight / 1000).toFixed(2)} mm)</strong>
                </div>
                <input
                  type="range"
                  min="80"
                  max="600"
                  step="20"
                  value={simLayerHeight}
                  onChange={(e) => setSimLayerHeight(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>80 µm (Fine Prototyping)</span>
                  <span>300 µm (Standard Functional)</span>
                  <span>600 µm (High-Speed Tooling)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Target Print Speed:</span>
                  <strong className="text-white">{simSpeed} mm/sec</strong>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="5"
                  value={simSpeed}
                  onChange={(e) => setSimSpeed(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>40 mm/s (Precision Outer Walls)</span>
                  <span>80 mm/s (Balanced Infill)</span>
                  <span>120 mm/s (Rapid Infill / Drafts)</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div>
                <strong>Recommended Nozzle:</strong>{' '}
                {simLayerHeight <= 200 ? '0.4 mm / 0.5 mm Standard' : '0.6 mm / 0.8 mm High-Flow Nozzle'}
              </div>
              <div>
                <strong>Target Application:</strong>{' '}
                {simLayerHeight <= 150
                  ? 'Ultra-smooth presentation models & verification fit tests'
                  : simLayerHeight <= 350
                  ? 'Industrial brackets, automotive ducts, jigs and end-use fixtures'
                  : 'Fast monolithic tool blockouts, foundry patterns, and composite layup cores'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. MATERIALS & FILAMENT COMPATIBILITY
         ==================================================== */}
      <section ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Thermoplastic Freedom
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Material Flexibility for Different Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 6.0 supports a range of 1.75 mm thermoplastic filaments as listed on the official product page and brochure. Material suitability depends on the selected filament, machine configuration, print profile and operating environment.
          </p>
        </div>

        {/* Source Attribution Note */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 flex items-start space-x-3">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
            i
          </div>
          <p className="leading-relaxed">
            <strong>Source Notice:</strong> The official product page lists PLA, ABS, PETG, ASA, Nylon, TPU, PC, and Carbon Fiber blends. The brochure additionally lists PP, HIPS, and Carbon-fused composites. Actual compatibility depends on machine configuration, filament formulation, and validated print profile. Confirm suitability with Make3D before selecting specialty materials.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {materialsData.map((mat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMaterial(mat.name)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedMaterial === mat.name
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-red-500'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-red-500">{mat.category}</span>
                  <span className={`text-[9px] font-mono ${selectedMaterial === mat.name ? 'text-slate-400' : 'text-slate-400'}`}>
                    {mat.source}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm mt-1">{mat.name}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${selectedMaterial === mat.name ? 'text-slate-300' : 'text-slate-600'}`}>
                  {mat.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/40 text-[10px] font-mono">
                <span className={selectedMaterial === mat.name ? 'text-slate-400' : 'text-slate-500'}>
                  Optimal: {mat.bestFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => openQuoteModal('Material Compatibility Query - Pratham 6.0')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Ask About Material Compatibility & Custom Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ====================================================
          11. TECHNICAL SPECIFICATIONS (Grouped Tables)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Verified Engineering Data
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham 6.0 Technical Specifications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Comprehensive specification tables comparing official product-page listings and official brochure parameters.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center space-x-2 border-b border-slate-200 pb-2">
          {[
            { id: 'print', label: 'Printing Specifications', icon: Layers },
            { id: 'software', label: 'Software & Connectivity', icon: FileCode },
            { id: 'mechanics', label: 'Mechanical Specifications', icon: Wrench },
            { id: 'electrical', label: 'Electrical & Power', icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSpecTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  activeSpecTab === tab.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab 1: Printing Specifications */}
        {activeSpecTab === 'print' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 pl-6 w-1/3">Specification</th>
                    <th className="p-3.5 w-1/3">Product-Page Listing</th>
                    <th className="p-3.5 pr-6 w-1/3">Brochure Listing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    { spec: 'Print Technology', page: 'FDM / FFF', bro: 'Fused Filament Fabrication' },
                    { spec: 'Build Volume', page: '600 × 600 × 600 mm', bro: '600 × 600 × 600 mm' },
                    {
                      spec: 'Layer Resolution',
                      page: '80–600 microns',
                      bro: '0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm',
                    },
                    { spec: 'Dimensional Tolerance', page: 'Not specified on page', bro: '±0.1 mm' },
                    { spec: 'Print Speed', page: 'Up to 120 mm/s', bro: '40–120 mm/sec' },
                    { spec: 'Extruder Temperature', page: 'Not specified on page', bro: '280°C (Single Extruder)' },
                    { spec: 'Printbed Temperature', page: 'Not specified on page', bro: '120°C' },
                    { spec: 'Nozzle Size (Standard)', page: 'Not specified on page', bro: '0.5 mm standard' },
                    {
                      spec: 'Changeable Nozzle Sizes',
                      page: 'Not specified on page',
                      bro: '0.3 / 0.4 / 0.6 / 0.8 mm',
                    },
                    { spec: 'Heated Bed Type', page: 'Not specified on page', bro: 'Silicone Heatbed + Aluminum Bed' },
                    { spec: 'Filament Diameter', page: '1.75 mm', bro: '1.75 mm' },
                    {
                      spec: 'Filament Compatibility',
                      page: 'PLA, ABS, PETG, ASA, Nylon, TPU, PC, Carbon Fiber blends',
                      bro: 'ABS, PLA, TPU, PETG, Carbon-fused composites, ASA, PP, HIPS',
                    },
                    { spec: 'Operating Control', page: 'LCD controls', bro: 'Touchscreen control' },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3.5 pl-6 font-bold text-slate-900 font-sans">{row.spec}</td>
                      <td className="p-3.5 text-slate-700">{row.page}</td>
                      <td className="p-3.5 pr-6 font-bold text-slate-900">{row.bro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Software & Connectivity */}
        {activeSpecTab === 'software' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 pl-6 w-1/3">Specification</th>
                    <th className="p-3.5 w-1/3">Brochure Listing</th>
                    <th className="p-3.5 pr-6 w-1/3">Product-Page Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    {
                      spec: 'Software Bundle',
                      bro: 'Simplify3D license software included',
                      notes: 'Commercial slicing engine with verified profiles',
                    },
                    {
                      spec: 'Operating System Compatibility',
                      bro: 'Windows / Mac OS',
                      notes: 'Cross-platform workstation support',
                    },
                    {
                      spec: 'Supported File Formats',
                      bro: 'STL / GCODE',
                      notes: 'Product page additionally lists OBJ format',
                    },
                    {
                      spec: 'Machine Connectivity',
                      bro: 'USB / SD card',
                      notes: 'Wi-Fi listed on page; optional add-on in brochure',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3.5 pl-6 font-bold text-slate-900 font-sans">{row.spec}</td>
                      <td className="p-3.5 font-bold text-slate-900">{row.bro}</td>
                      <td className="p-3.5 pr-6 text-slate-700">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Mechanical Specifications */}
        {activeSpecTab === 'mechanics' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 pl-6 w-1/3">Mechanical Parameter</th>
                    <th className="p-3.5 w-1/3">Brochure Specification</th>
                    <th className="p-3.5 pr-6 w-1/3">Engineering Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    {
                      param: 'X-Y Gantry Motion',
                      spec: 'THK linear motion guide',
                      desc: 'High-rigidity Japanese precision guide rails for accurate toolhead positioning',
                    },
                    {
                      param: 'X-Y Positioning Precision',
                      spec: '11 microns',
                      desc: 'Sub-micron class mechanical step repeatability across 600 mm stroke',
                    },
                    {
                      param: 'Z-Axis Precision System',
                      spec: '10 microns, with industrial ball screw',
                      desc: 'Heavy-duty ground ball screw prevents bed drop and eliminates z-banding',
                    },
                    {
                      param: 'Body Hardware & Chassis',
                      spec: 'All-metal MS body',
                      desc: 'Mild steel industrial enclosure dampens acceleration resonance',
                    },
                    {
                      param: 'External Machine Dimensions',
                      spec: '1080 L × 920 W × 1100 H mm',
                      desc: 'Footprint designed to fit through standard double industrial workshop doors',
                    },
                    {
                      param: 'Net Printer Weight',
                      spec: '100 kg',
                      desc: 'Heavyweight rigid frame prevents frame deflection during high-speed printing',
                    },
                    {
                      param: 'Gross Shipping Weight',
                      spec: '110 kg with accessories kit',
                      desc: 'Crated securely with complete tooling kit, spare nozzles, and cables',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3.5 pl-6 font-bold text-slate-900 font-sans">{row.param}</td>
                      <td className="p-3.5 font-bold text-slate-900">{row.spec}</td>
                      <td className="p-3.5 pr-6 text-slate-700">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Electrical & Power */}
        {activeSpecTab === 'electrical' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 pl-6 w-1/3">Electrical Parameter</th>
                    <th className="p-3.5 w-1/3">Official Brochure Listing</th>
                    <th className="p-3.5 pr-6 w-1/3">Facility Preparation Guidelines</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    {
                      param: 'Input Voltage & Frequency',
                      spec: '230 V, 50 Hz',
                      desc: 'Standard Indian single-phase AC mains supply',
                    },
                    {
                      param: 'Power Consumption Rating',
                      spec: '800 W',
                      desc: 'Peak draw occurs during simultaneous bed & nozzle heating; steady state is lower',
                    },
                    {
                      param: 'Power Failure Protection',
                      spec: 'Integrated Auto-Resume Facility',
                      desc: 'Hardware auto-recovery buffer saves print coordinates upon sudden outage',
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3.5 pl-6 font-bold text-slate-900 font-sans">{row.param}</td>
                      <td className="p-3.5 font-bold text-slate-900">{row.spec}</td>
                      <td className="p-3.5 pr-6 text-slate-700">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center justify-between">
          <span>Need custom electrical certification or dual-voltage configuration?</span>
          <button
            onClick={() => openQuoteModal('Custom Electrical Configuration - Pratham 6.0')}
            className="text-red-600 font-bold hover:underline cursor-pointer"
          >
            Consult Engineering Team →
          </button>
        </div>
      </section>

      {/* ====================================================
          12. SOFTWARE & WORKFLOW (4-Step Visual)
         ==================================================== */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            End-to-End Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            From CAD Design to Physical Manufacturing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 6.0 supports common 3D printing workflows using CAD and slicing software. The brochure lists a Simplify3D software license and STL/GCODE support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 01',
              title: 'Design',
              desc: 'Create a 3D model using compatible CAD or 3D design software (SolidWorks, Inventor, Fusion360, SketchUp, NX).',
              icon: Compass,
              tag: 'CAD Modeling',
            },
            {
              step: 'Step 02',
              title: 'Prepare',
              desc: 'Export in STL (or OBJ) format and prepare toolpaths using compatible slicing software like the bundled Simplify3D license.',
              icon: Sliders,
              tag: 'Simplify3D Slicing',
            },
            {
              step: 'Step 03',
              title: 'Transfer',
              desc: 'Transfer the prepared GCODE file to the printer via standard USB or SD card (Wi-Fi available as an optional add-on).',
              icon: HardDrive,
              tag: 'USB / SD Card',
            },
            {
              step: 'Step 04',
              title: 'Print',
              desc: 'Start the print job via the touchscreen interface and monitor automated bed leveling and filament runout protection.',
              icon: Play,
              tag: 'Touchscreen Execution',
            },
          ].map((flow, idx) => {
            const Icon = flow.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-red-600">{flow.step}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      {flow.tag}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{flow.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{flow.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-slate-500 italic">
          Supported software, file formats, connectivity and workflow details may depend on the current machine configuration. Confirm the latest details with Make3D.
        </p>
      </section>

      {/* ====================================================
          13. PROTECTION & EASE-OF-USE FEATURES (Card Grid)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Reliability Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Features Designed to Support Reliable Printing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Essential protection mechanisms and operator aids designed into Pratham 6.0 to minimize downtime and safeguard long-duration print jobs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: 'Automatic Bed Leveling',
              desc: 'Automated sensor-assisted bed leveling reduces manual calibration and supports consistent first-layer preparation.',
              icon: Settings,
            },
            {
              title: 'Filament Runout Sensor',
              desc: 'Optical sensor detects spool depletion during multi-day prints, pausing execution to allow seamless spool reload.',
              icon: ShieldCheck,
            },
            {
              title: 'Power Failure Recovery',
              desc: 'Auto-resume facility stores exact machine coordinates during unexpected power outages to help resume printing.',
              icon: RotateCcw,
            },
            {
              title: 'Fully Enclosed Chamber',
              desc: 'Maintains internal thermal equilibrium, shields prints from ambient drafts, and includes carbon/HEPA filtration.',
              icon: Box,
            },
            {
              title: 'Touchscreen Control',
              desc: 'Clean, full-color responsive interface for temperature adjustments, manual axis jogging, and print status monitoring.',
              icon: Monitor,
            },
            {
              title: 'Silicone Heated Bed',
              desc: 'Industrial silicone heating pad bonded to aluminum printbed delivers rapid, uniform heating across all 600 mm.',
              icon: Flame,
            },
            {
              title: 'High-Temperature Hotend',
              desc: 'Extrusion assembly capable of reaching 280°C enables printing functional engineering polymers and composites.',
              icon: Zap,
            },
            {
              title: 'Multi-Material Capability',
              desc: 'Supports PLA, ABS, PETG, TPU, ASA, Nylon, PC, Carbon Fiber composites, PP, and HIPS with validated profiles.',
              icon: Layers,
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          14. PRODUCT GALLERY (Interactive Lightbox)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Visual Exploration
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Pratham 6.0
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Click any image to expand in full-screen interactive lightbox
          </span>
        </div>

        {/* Main Gallery Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative group overflow-hidden">
            <div className="aspect-16/10 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center relative">
              <img
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].title}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-102"
                onClick={() => setLightboxOpen(true)}
              />
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs transition-all cursor-pointer shadow-md"
                aria-label="Expand Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            <div className="pt-3 px-2 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{galleryImages[activeImageIndex].title}</h4>
                <p className="text-xs text-slate-500">{galleryImages[activeImageIndex].desc}</p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {activeImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`p-1.5 rounded-xl border transition-all text-left overflow-hidden cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-red-600 bg-red-50 ring-2 ring-red-500/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="aspect-4/3 rounded-lg bg-slate-100 overflow-hidden">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 block truncate mt-1">{img.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ====================================================
          18. TECHNICAL SERVICE & SUPPORT (3 Cards)
         ==================================================== */}
      <section ref={supportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Customer Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Support That Keeps Your Workflow Moving
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The official Make3D product page highlights 24×7 remote and onsite support and nationwide technical and after-sales support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Industrial Manufacturing Track Record',
              desc: 'Engineered for demanding production environments at leading tooling facilities, automotive suppliers, and research laboratories.',
              icon: Building2,
              actionText: 'Request Customer Case Studies',
              actionClick: () => openQuoteModal('Customer References - Pratham 6.0'),
            },
            {
              title: 'Dedicated Technical Support',
              desc: 'Make3D describes 24×7 remote and onsite support for customers across India, backed by local application and service engineers.',
              icon: PhoneCall,
              actionText: 'Contact Service Team',
              actionClick: () => openQuoteModal('Service & Technical Support - Pratham 6.0'),
            },
            {
              title: 'Installation and Onboarding',
              desc: 'Make3D states that it provides complete machine installation, factory leveling setup, and hands-on onboarding for engineers and teams.',
              icon: GraduationCap,
              actionText: 'Book Onboarding Session',
              actionClick: () => openQuoteModal('Installation & Onboarding Booking - Pratham 6.0'),
            },
          ].map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={card.actionClick}
                    className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          19. FREQUENTLY ASKED QUESTIONS (13 Official FAQs)
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Clear Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Essential facts, operational details, and manufacturer confirmations regarding the Pratham 6.0 industrial 3D printer.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/80 bg-slate-50/30">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          20. RELATED PRODUCTS (Pratham Series Ecosystem)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              FDM Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Other Make3D 3D Printers
            </h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1">
            <span>View All 3D Printers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {relatedPrinters.map((p) => {
            const cardInner = (
              <div
                className={`h-full p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between group ${
                  p.active
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-red-500'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-red-500 hover:shadow-lg'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase block tracking-wider">
                    {p.tag}
                  </span>
                  <h3 className="font-extrabold text-sm mt-0.5 tracking-tight truncate">{p.name}</h3>
                  <span className={`text-[10px] font-mono block mt-0.5 ${p.active ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.vol}
                  </span>
                </div>

                <div
                  className={`my-3 h-24 sm:h-28 rounded-xl flex items-center justify-center p-2 overflow-hidden transition-all ${
                    p.active
                      ? 'bg-slate-900/90 border border-slate-800'
                      : 'bg-slate-50 border border-slate-100 group-hover:bg-red-50/40 group-hover:border-red-100'
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {p.link ? (
                  <span className="text-[11px] font-bold text-red-600 group-hover:text-red-700 flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-slate-400 block pt-2 border-t border-slate-800 mt-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Current Model
                  </span>
                )}
              </div>
            )

            return p.link ? (
              <Link key={p.name} to={p.link} className="block focus:outline-none h-full">
                {cardInner}
              </Link>
            ) : (
              <div key={p.name} className="h-full">
                {cardInner}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          21. IN-PAGE QUOTE REQUEST FORM
         ==================================================== */}
      <section ref={quoteRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Official Quotation & Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Get a Quote for Pratham 6.0
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tell us about your application, material requirements and production needs. The technical team can help you explore the appropriate Pratham 6.0 machine configuration, optional add-ons, and facility preparation.
            </p>
          </div>

          {formSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-emerald-950">Quote Request Submitted Successfully!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, {quoteForm.name}. Our technical sales engineer will reach out to you within 24 business hours with detailed pricing, brochure documentation, and configuration options.
              </p>
              <button
                onClick={() => {
                  setFormSuccess(false)
                  setQuoteForm({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    city: '',
                    state: '',
                    industry: 'Automotive & Mobility',
                    application: 'Functional Prototyping',
                    material: 'PLA / Engineering Blends',
                    partSize: 'Up to 600 mm',
                    frequency: 'Daily Production Runs',
                    contactMethod: 'Phone & WhatsApp',
                    message: '',
                  })
                }}
                className="mt-3 px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Company / Institution Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Precision Engineering Ltd."
                    value={quoteForm.company}
                    onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rajesh@company.com"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune / Bengaluru"
                    value={quoteForm.city}
                    onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra / Karnataka"
                    value={quoteForm.state}
                    onChange={(e) => setQuoteForm({ ...quoteForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Industry Segment</label>
                  <select
                    value={quoteForm.industry}
                    onChange={(e) => setQuoteForm({ ...quoteForm, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none bg-white"
                  >
                    <option value="Automotive & Mobility">Automotive & Mobility</option>
                    <option value="Aerospace & Defense">Aerospace & Defense</option>
                    <option value="Heavy Machinery & Foundries">Heavy Machinery & Foundries</option>
                    <option value="Industrial Tooling & Jigs">Industrial Tooling & Jigs</option>
                    <option value="Higher Education / University">Higher Education / University</option>
                    <option value="R&D Government Lab">R&D Government Lab</option>
                    <option value="Service Bureau / 3D Hub">Service Bureau / 3D Hub</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Primary Application</label>
                  <select
                    value={quoteForm.application}
                    onChange={(e) => setQuoteForm({ ...quoteForm, application: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none bg-white"
                  >
                    <option value="Functional Prototyping">Functional Prototyping</option>
                    <option value="Jigs & Manufacturing Fixtures">Jigs & Manufacturing Fixtures</option>
                    <option value="End-Use Production Parts">End-Use Production Parts</option>
                    <option value="Investment Casting Patterns">Investment Casting Patterns</option>
                    <option value="Academic Research & STEM Lab">Academic Research & STEM Lab</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Material of Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. ABS, Carbon Fiber, Nylon, PETG"
                    value={quoteForm.material}
                    onChange={(e) => setQuoteForm({ ...quoteForm, material: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Selected Product</label>
                  <input
                    type="text"
                    readOnly
                    disabled
                    value="Pratham 6.0 (600 × 600 × 600 mm)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Additional Requirements / Project Scope</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your part dimensions, expected annual volume, installation site requirements..."
                  value={quoteForm.message}
                  onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  Your information is kept confidential and shared only with our authorized technical advisors.
                </span>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  {formSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request a Quote</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ====================================================
          22. FINAL CALL TO ACTION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Industrial Scalability
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Make Bigger Ideas a Reality with Pratham 6.0
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Bring large-format industrial 3D printing into your workflow with a 600 × 600 × 600 mm build volume, industrial construction and support for a range of engineering thermoplastics.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal('Pratham 6.0 Large-Scale Industrial 3D Printer')}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center space-x-2"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={officialBrochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download Brochure</span>
              </a>
              <button
                onClick={() => {
                  setActiveVideoId('keJLiOXitCw')
                  setVideoModalOpen(true)
                }}
                className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center">
            <img
              src="/images/products/pratham-6-0.png"
              alt="Pratham 6.0"
              className="max-h-64 object-contain drop-shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ====================================================
          LIGHTBOX MODAL
         ==================================================== */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-white">
              <div>
                <h3 className="font-bold text-sm">{galleryImages[activeImageIndex].title}</h3>
                <p className="text-xs text-slate-400">{galleryImages[activeImageIndex].desc}</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/10 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={galleryImages[activeImageIndex].src}
                alt={galleryImages[activeImageIndex].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                }
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              >
                ← Previous
              </button>
              <span>
                {activeImageIndex + 1} of {galleryImages.length}
              </span>
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                }
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          YOUTUBE VIDEO MODAL
         ==================================================== */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-white">
              <span className="font-bold text-sm">Official Make3D Video Showcase</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Video Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-16/9 bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Pratham 6.0 Video Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// STATIC DATA & CONTENT CONSTANTS
// ==========================================

const featuresList = [
  {
    title: '600 × 600 × 600 mm Build Capacity',
    desc: 'Pratham 6.0 provides a large cubic build volume for printing oversized components, prototypes, fixtures and functional parts in one build, reducing assembly steps.',
    icon: Box,
    badge: 'Large Build Volume',
    source: 'Page & Brochure',
    highlight: '216 Liters Volume',
  },
  {
    title: 'Designed for Structural Stability',
    desc: 'The machine uses an all-metal MS body, according to the brochure, designed for large-scale industrial printing, supporting large workloads with a stable motion system.',
    icon: Factory,
    badge: 'Heavy-Duty Frame',
    source: 'Brochure Listed',
    highlight: 'All-Metal MS Body',
  },
  {
    title: 'Enclosed Printing Environment',
    desc: 'Fully enclosed chamber supports temperature-sensitive workflows. Brochure lists carbon and HEPA filtration to maintain air cleanliness (specifications confirmable with Make3D).',
    icon: ShieldCheck,
    badge: 'Enclosed Chamber',
    source: 'Page & Brochure',
    highlight: 'Carbon + HEPA Filter',
  },
  {
    title: 'Supports Engineering Thermoplastics',
    desc: 'Brochure lists single extruder temperature of up to 280°C and heated bed temperature of up to 120°C, enabling selected engineering polymers depending on validated profiles.',
    icon: Flame,
    badge: 'High-Temp Printing',
    source: 'Brochure Listed',
    highlight: '280°C Hotend / 120°C Bed',
  },
  {
    title: 'Heated Build Platform',
    desc: 'Silicone heatbed coupled with aluminum printbed maintains uniform temperature across the 600 mm platform to support first-layer adhesion and minimize warping.',
    icon: Thermometer,
    badge: 'Silicone Heated Bed',
    source: 'Brochure Listed',
    highlight: 'Uniform Aluminum Bed',
  },
  {
    title: 'Automated Bed-Leveling Assistance',
    desc: 'Automated bed leveling helps reduce the need for manual adjustment and supports consistent first-layer preparation before initiating large jobs.',
    icon: Settings,
    badge: 'Auto Bed Leveling',
    source: 'Brochure Listed',
    highlight: 'Sensor Assisted',
  },
  {
    title: 'Filament Runout Monitoring',
    desc: 'Integrated sensor detects filament depletion during long-hour production runs and pauses the job, supporting a print-saving reload workflow.',
    icon: ShieldCheck,
    badge: 'Filament Sensor',
    source: 'Brochure Listed',
    highlight: 'Print-Saving Pause',
  },
  {
    title: 'Power Failure Recovery',
    desc: 'Power failure protection and an auto-resume facility are intended to help resume a print after a sudden power interruption, safeguarding material investment.',
    icon: RotateCcw,
    badge: 'Power Protection',
    source: 'Brochure Listed',
    highlight: 'Auto-Resume Facility',
  },
  {
    title: 'Multi-Material Support',
    desc: 'Supports PLA, ABS, PETG, ASA, Nylon, TPU, PC, and Carbon Fiber blends (product page) plus PP and HIPS (brochure). Profiles validated per formulation.',
    icon: Layers,
    badge: 'Multi-Material',
    source: 'Page & Brochure',
    highlight: '10+ Filament Types',
  },
  {
    title: 'Intuitive Machine Operation',
    desc: 'Full touchscreen control interface allows operators to initiate jobs, calibrate axes, set extrusion temperatures, and monitor real-time print status.',
    icon: Monitor,
    badge: 'Touchscreen Control',
    source: 'Brochure Listed',
    highlight: 'Touch Operator Panel',
  },
  {
    title: 'Flexible File Transfer',
    desc: 'USB and SD card are standard brochure-listed transfer methods. Wi-Fi is listed on the product page and designated as an optional add-on in the brochure.',
    icon: HardDrive,
    badge: 'Connectivity',
    source: 'Page & Brochure',
    highlight: 'USB / SD / Opt. Wi-Fi',
  },
  {
    title: 'Common 3D Printing File Formats',
    desc: 'Brochure lists standard STL and GCODE support; product page additionally lists OBJ format compatibility. Handled seamlessly in slicing software.',
    icon: FileCode,
    badge: 'File Compatibility',
    source: 'Page & Brochure',
    highlight: 'STL, GCODE & OBJ',
  },
  {
    title: 'Adjustable Layer Settings',
    desc: 'Product page lists adjustable layer resolution from 80 to 600 microns. Brochure lists discrete layer settings: 0.08, 0.1, 0.2, 0.3, and 0.4 mm.',
    icon: Sliders,
    badge: 'Precision Layers',
    source: 'Page & Brochure',
    highlight: '80–600 µm Range',
  },
  {
    title: 'THK Linear Motion Guides',
    desc: 'Equipped with industrial Japanese THK linear motion guides on the X-Y gantry and an industrial ground ball screw for precision Z-axis motion.',
    icon: Wrench,
    badge: 'Motion System',
    source: 'Brochure Listed',
    highlight: 'THK Guides + Ball Screw',
  },
  {
    title: 'Industrial Precision & Accuracy',
    desc: 'Dimensional tolerance of ±0.1 mm, X-Y positioning precision of 11 microns, and Z precision of 10 microns with industrial ball screw.',
    icon: Gauge,
    badge: 'Dimensional Accuracy',
    source: 'Brochure Listed',
    highlight: '±0.1 mm / 11 µm Precision',
  },
]

const materialsData = [
  {
    name: 'PLA',
    category: 'Standard Thermoplastic',
    source: 'Page & Brochure',
    description: 'Ideal for general prototypes, educational models, visual concept mockups, and dimensional checks.',
    bestFor: 'Rapid prototyping, clean surface finish, low shrinkage',
  },
  {
    name: 'ABS',
    category: 'Engineering Thermoplastic',
    source: 'Page & Brochure',
    description: 'High impact and heat resistance; suited for automotive components, durable enclosures, and mechanical brackets.',
    bestFor: 'Impact resistance, heat deflection up to 90°C',
  },
  {
    name: 'PETG',
    category: 'Industrial Polymer',
    source: 'Page & Brochure',
    description: 'Combines the printability of PLA with the strength and chemical resistance of ABS. Moisture and chemical tolerant.',
    bestFor: 'Functional prototypes, fluid enclosures, snap-fits',
  },
  {
    name: 'TPU / Flexible',
    category: 'Elastomer',
    source: 'Page & Brochure',
    description: 'Flexible rubber-like filament for shock absorbers, gaskets, protective bumpers, and ergonomic grips.',
    bestFor: 'Impact absorption, flexural fatigue endurance',
  },
  {
    name: 'ASA',
    category: 'Weather-Resistant',
    source: 'Page & Brochure',
    description: 'UV and weather-resistant alternative to ABS; excellent for outdoor functional parts, marine, and exterior automotive.',
    bestFor: 'Outdoor longevity, UV exposure, thermal stability',
  },
  {
    name: 'Nylon (Polyamide)',
    category: 'Engineering Polymer',
    source: 'Product Page Listed',
    description: 'High tensile strength, superior abrasion resistance, and low friction coefficient for sliding industrial gears.',
    bestFor: 'Gears, sliding bushings, heavy-duty mechanical parts',
  },
  {
    name: 'Polycarbonate (PC)',
    category: 'High-Performance',
    source: 'Product Page Listed',
    description: 'Exceptional structural strength, impact tolerance, and optical clarity. Requires validated settings.',
    bestFor: 'Rigid structural housings, safety shields, high-temp parts',
  },
  {
    name: 'Carbon Fiber Blends',
    category: 'Composite Material',
    source: 'Page & Brochure',
    description: 'Carbon-fused composites offering ultra-high stiffness, dimensional stability, and lightweight performance.',
    bestFor: 'Drones, automotive tooling, high-modulus brackets',
  },
  {
    name: 'Polypropylene (PP)',
    category: 'Chemical Resistant',
    source: 'Brochure Listed',
    description: 'Excellent chemical resistance and living hinge capabilities for chemical tanks, laboratory ware, and packaging.',
    bestFor: 'Chemical containment, living hinges, fluid bottles',
  },
  {
    name: 'HIPS',
    category: 'Support & Prototype',
    source: 'Brochure Listed',
    description: 'High impact polystyrene; used as a primary structural material or dissolvable support material with d-Limonene.',
    bestFor: 'Pre-production verification models, packaging mockups',
  },
]

const galleryImages = [
  {
    src: '/images/products/pratham-6-0.png',
    title: 'Pratham 6.0 Full Front Perspective',
    desc: 'Enclosed industrial all-metal MS body with tempered glass doors and dual front-mounted handles.',
  },
  {
    src: '/images/pratham6/pratham6-printed-stool.jpg',
    title: 'Monolithic Printed Real-Size Stool',
    desc: 'Full-scale 600 mm designer stool produced in one continuous build, demonstrating Z-height capability.',
  },
  {
    src: '/images/pratham3-work/01-real-functional-parts.jpg',
    title: 'Functional Engineering Assemblies',
    desc: 'Finished mechanical prototypes and housings produced with high dimensional accuracy.',
  },
  {
    src: '/images/desktop-work/functional-prototypes-hd.jpg',
    title: 'Build Chamber & Extrusion Workflow',
    desc: 'Spacious illuminated build platform, heavy-duty motion guides, and precision hotend.',
  },
  {
    src: '/images/gtmax/gtmax-mechanical-parts.jpg',
    title: 'Production Tooling & Mechanical Parts',
    desc: 'Industrial nylon and PETG end-use components showing clean interlayer bonding.',
  },
  {
    src: '/images/desktop-work/custom-complex-designs-hd.jpg',
    title: 'Generative Architectural Lattice Parts',
    desc: 'Complex biomimetic and organic lattice structures printed without structural collapse.',
  },
]


const faqs = [
  {
    q: 'Is Pratham 6.0 suitable for continuous production use?',
    a: 'Pratham 6.0 is designed for long-hour industrial production cycles. In fact, Make3D states that the machine has been designed and tested for continuous print runs of up to 268 hours. Actual operating schedules and suitability depend on material, part design, print settings and operating conditions.',
  },
  {
    q: 'What materials does Pratham 6.0 support?',
    a: 'The product page lists PLA, ABS, PETG, ASA, Nylon, TPU, PC and Carbon Fiber blends. The official brochure also lists PP and HIPS. Confirm exact compatibility and validated material profiles with Make3D for your specific application.',
  },
  {
    q: 'What is the maximum printable size?',
    a: 'The listed build volume is 600 × 600 × 600 mm (216 Liters), allowing monolithic components up to that nominal envelope, subject to print clearance, geometry, support structures and machine configuration.',
  },
  {
    q: 'Does Make3D provide service support?',
    a: 'The official page states that nationwide technical and after-sales support is available across India, including 24×7 remote guidance and onsite engineer dispatch when required.',
  },
  {
    q: 'Is Pratham 6.0 made in India?',
    a: 'Make3D describes Pratham 6.0 as a 100% indigenous 3D printer designed and developed in India, manufactured at their facility in Surat, Gujarat.',
  },
  {
    q: 'Does Make3D provide installation and onboarding?',
    a: 'Yes. Make3D states that comprehensive machine installation, leveling setup, and hands-on operational onboarding are provided for engineers, operator teams, and academic institutions.',
  },
  {
    q: 'What is the printing technology?',
    a: 'Pratham 6.0 uses Fused Filament Fabrication (FFF), commonly referred to as FDM (Fused Deposition Modeling) 3D printing technology with 1.75 mm thermoplastic spools.',
  },
  {
    q: 'What is the layer resolution?',
    a: 'The product page lists 80–600 microns (0.08–0.6 mm), while the official brochure specifies discrete settings of 0.08 mm, 0.1 mm, 0.2 mm, 0.3 mm, and 0.4 mm. Current machine configurations support fine-pitch to high-speed draft profiles.',
  },
  {
    q: 'What is the print speed?',
    a: 'The product page lists speeds up to 120 mm/s, while the brochure lists 40–120 mm/sec. Actual speed depends on part geometry, selected filament material, and mechanical wall surface requirements.',
  },
  {
    q: 'What file formats are supported?',
    a: 'The official brochure lists STL and GCODE formats, and the product page additionally lists OBJ format. Models can be prepared using the bundled Simplify3D license or other standard slicing software.',
  },
  {
    q: 'Does it support Wi-Fi?',
    a: 'The product page lists Wi-Fi connectivity, while the brochure describes Wi-Fi as an optional add-on alongside standard USB and SD card ports. Confirm whether Wi-Fi is included in your selected configuration.',
  },
  {
    q: "What is the printer's weight?",
    a: "The brochure lists a net printer weight of 100 kg and a gross shipping weight of 110 kg with the complete industrial accessories kit.",
  },
  {
    q: "What is the printer's power requirement?",
    a: 'The brochure lists standard 230 V AC, 50 Hz single-phase input with a power consumption rating of 800 W. Confirm facility electrical setup with Make3D prior to installation.',
  },
]

interface RelatedPrinter {
  name: string
  vol: string
  tag: string
  link?: string
  img: string
  active?: boolean
}

const relatedPrinters: RelatedPrinter[] = [
  {
    name: 'Pratham Mini',
    vol: '170 × 170 × 170 mm',
    tag: 'Classroom & Lab',
    link: '/products/pratham-mini',
    img: '/images/products/pratham-mini.png',
  },
  {
    name: 'Pratham Desktop',
    vol: '200 × 200 × 250 mm',
    tag: 'Studio Series',
    link: '/products/pratham-desktop',
    img: '/images/products/pratham-desktop.png',
  },
  {
    name: 'Pratham 3 Rapid',
    vol: '350 × 350 × 350 mm',
    tag: '500 mm/s CoreXY',
    link: '/products/pratham-3-rapid',
    img: '/images/products/pratham-3-rapid.png',
  },
  {
    name: 'Pratham 3.0',
    vol: '300 × 300 × 300 mm',
    tag: '24/7 Factory Workhorse',
    link: '/products/pratham-3',
    img: '/images/products/pratham-3-0.png',
  },
  {
    name: 'Pratham 5.0',
    vol: '500 × 500 × 500 mm',
    tag: 'Heated Chamber FDM',
    link: '/products/pratham-5',
    img: '/images/products/pratham-5-0.png',
  },
  {
    name: 'Pratham X',
    vol: '1000 × 1000 × 1000 mm',
    tag: '1 m³ Extra Large',
    link: '/products/pratham-x',
    img: '/images/products/pratham-x.png',
  },
]

export default Pratham6Page

