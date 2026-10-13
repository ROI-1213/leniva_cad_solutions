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
  Activity,
  Award,
  Factory,
  Wrench,
  ArrowRight,
  Maximize2,
  Compass,
  Play,
  Check,
  X,
  HardDrive,
  GraduationCap,
  Thermometer,
  CheckCircle2,
  RefreshCw,
  Car,
  Plane,
  Microscope,
  Building,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const PrathamX1000Page: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()

  // Navigation & Interactive Tabs
  const [activeNav, setActiveNav] = useState<string>('overview')
  const [activeSpecTab, setActiveSpecTab] = useState<'printing' | 'software' | 'mechanical' | 'electrical'>('printing')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA+')

  // In-page Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    industry: 'Automotive & Heavy Industry',
    application: 'Oversized Structural Prototyping',
    material: 'PLA+ / PETG / TPU',
    partSize: 'Up to 1000 mm (1 Metre)',
    frequency: 'Batch Production / Tooling',
    contactMethod: 'Phone & WhatsApp',
    message: '',
  })
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false)
  const [formSuccess, setFormSuccess] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Section Refs for Smooth Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const thermalRef = useRef<HTMLDivElement>(null)
  const applicationsRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, navId: string) => {
    setActiveNav(navId)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Official URLs
  const officialBrochureUrl = '/brochures/pratham-x-1000.pdf'
  const officialVideoId = 'NYvsYd-THAs' // Official Make3D Pratham X Jumbo Video (Life-Sized Chair 3D Printed)

  // SEO & Structured Data
  useEffect(() => {
    document.title = 'Pratham X 1000 JUMBO Industrial 3D Printer | Make3D'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore Make3D Pratham X 1000, a heavy-duty industrial FDM 3D printer with a 1000 × 1000 × 1000 mm build volume for oversized components, structural prototypes and large-format manufacturing.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham X 1000 JUMBO Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-x.png',
      description:
        'Meet Pratham X 1000, a heavy-duty industrial FDM 3D printer with a 1000 × 1000 × 1000 mm (1 Cubic Metre) build volume, all-axis ball-screw mechanism, THK linear motion guides, and 120°C silicone heatbed.',
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
        url: 'https://lenivacadsolution.com/products/pratham-x-1000',
      },
    }

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lenivacadsolution.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://lenivacadsolution.com/products' },
        { '@type': 'ListItem', position: 3, name: 'FDM 3D Printers', item: 'https://lenivacadsolution.com/products/fdm-3d-printers' },
        { '@type': 'ListItem', position: 4, name: 'Pratham X 1000', item: 'https://lenivacadsolution.com/products/pratham-x-1000' },
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
        productOrService: 'Pratham X 1000 — 1000 × 1000 × 1000 mm',
        quantity: '1 Unit',
        application: quoteForm.application,
        message: `City: ${quoteForm.city}, State: ${quoteForm.state} | Industry: ${quoteForm.industry} | Material: ${quoteForm.material} | Required Volume: 1000 × 1000 × 1000 mm | Frequency: ${quoteForm.frequency} | Contact: ${quoteForm.contactMethod} | Notes: ${quoteForm.message}`,
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
            <span className="text-slate-900 font-bold">Pratham X 1000 (1000 × 1000 × 1000 mm)</span>
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
              <span>Pratham X 1000</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                1 m³ JUMBO
              </span>
            </span>
            <span className="text-xs text-slate-400 hidden md:inline font-mono">| Make3D Ultra-Large Format</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'volume', label: '1m³ Volume', ref: volumeRef },
              { id: 'specs', label: 'Specifications', ref: specsRef },
              { id: 'features', label: 'Features', ref: featuresRef },
              { id: 'motion', label: 'Motion System', ref: motionRef },
              { id: 'thermal', label: 'Thermal Control', ref: thermalRef },
              { id: 'applications', label: 'Applications', ref: applicationsRef },
              { id: 'showcase', label: 'Showcase', ref: showcaseRef },
              { id: 'materials', label: 'Materials', ref: materialsRef },
              { id: 'workflow', label: 'Workflow', ref: workflowRef },
              { id: 'benefits', label: 'Benefits', ref: benefitsRef },
              { id: 'support', label: 'Support & Warranty', ref: supportRef },
              { id: 'gallery', label: 'Gallery', ref: galleryRef },
              { id: 'video', label: 'Video Demo', ref: videoRef },
              { id: 'faqs', label: 'FAQs', ref: faqRef },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollTo(nav.ref, nav.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
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
              onClick={() => openQuoteModal('Pratham X 1000 — 1000 × 1000 × 1000 mm')}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <span>Request a Quote</span>
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
                <span>MAKE3D | ULTRA-LARGE FORMAT INDUSTRIAL 3D PRINTING</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Pratham X 1000
              </h1>
              <p className="text-lg sm:text-2xl font-black text-red-600 tracking-tight">
                The Power to Print Bigger. The Precision to Build Better.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider font-mono">
                PRATHAM X 1000 — JUMBO INDUSTRIAL 3D PRINTER
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Meet Pratham X 1000, a heavy-duty industrial FDM 3D printer designed for oversized components, large
              structural prototypes, tooling, molds and production applications. With a massive 1000 × 1000 × 1000 mm
              build volume, it enables manufacturers to explore single-piece printing for large parts that might otherwise
              require segmentation and assembly.
            </p>

            {/* Official Supporting Tagline Banner */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border-l-4 border-red-500 shadow-sm space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                Powerful. Precise. Made in India.
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Designed for oversized industrial components, structural parts and large-scale manufacturing, Pratham X 1000
                offers a one-metre cubic build volume for producing large parts in a single print. Its heavy-duty steel frame,
                enclosed chamber, ball-screw motion system and high-temperature extrusion are designed to support demanding
                large-format additive manufacturing workflows.
              </p>
            </div>

            {/* 8 Hero Specification Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { label: 'Build Envelope', value: '1000 × 1000 × 1000 mm', icon: Box },
                { label: 'Print Speed', value: 'Up to 120 mm/s', icon: Zap },
                { label: 'Dimensional Tol.', value: '±0.2 mm Listed', icon: Compass },
                { label: 'Extruder Temp', value: '280°C Single Extruder', icon: Flame },
                { label: 'Heated Bed', value: '120°C Silicone Heatbed', icon: Thermometer },
                { label: 'Motion System', value: 'All-Axis Ball-Screw', icon: Wrench },
                { label: 'Chassis Frame', value: 'Heavy-Duty All-Metal MS', icon: Factory },
                { label: 'Origin & Build', value: 'Made in India', icon: Award },
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
                onClick={() => openQuoteModal('Pratham X 1000 — 1000 × 1000 × 1000 mm')}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={officialBrochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm tracking-wide shadow-2xs hover:bg-slate-50 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download Brochure</span>
              </a>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm tracking-wide transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-600 fill-red-600" />
                <span>View Demo</span>
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
                <span>1000 × 1000 × 1000 mm</span>
              </div>

              {/* Main Machine Image */}
              <div className="relative z-0 flex items-center justify-center py-4">
                <img
                  src="/images/products/pratham-x.png"
                  alt="Make3D Pratham X 1000 JUMBO Industrial 3D Printer (1000 × 1000 × 1000 mm)"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Restrained Technical Callouts */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>One-metre cubic build volume</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Heavy-duty steel frame</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Enclosed printing chamber</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Ball-screw motion system</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. QUICK SPECIFICATION STRIP (10 Metrics)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold">
                Technical Highlights Strip
              </span>
              <h2 className="text-base font-extrabold text-slate-900">
                Pratham X 1000 — Brochure-Listed Technical Parameters
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Source:{' '}
              <a
                href={officialBrochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-red-600 font-semibold"
              >
                Official Pratham X Brochure
              </a>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 text-center">
            {[
              { label: 'Build Volume', val: '1000×1000×1000', sub: '1 m³ Capacity' },
              { label: 'Technology', val: 'FDM / FFF', sub: 'Fused Filament' },
              { label: 'Print Speed', val: 'Up to 120 mm/s', sub: 'Brochure Listed' },
              { label: 'Layer Resolution', val: '0.08–0.4 mm', sub: 'Adjustable' },
              { label: 'Dimensional Tol.', val: '±0.2 mm', sub: 'Machined Accuracy' },
              { label: 'Extruder Temp', val: '280°C', sub: 'Single Extruder' },
              { label: 'Bed Temp', val: '120°C', sub: 'Silicone Heatbed' },
              { label: 'Filament Dia.', val: '1.75 mm', sub: 'Standard Size' },
              { label: 'Motion System', val: 'THK + Ball Screw', sub: 'XYZ All-Axis' },
              { label: 'Printer Weight', val: '250 kg', sub: 'All-Metal MS' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">{item.label}</span>
                  <strong className="text-xs sm:text-sm font-black text-slate-950 mt-1 block font-mono">{item.val}</strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            * Specification values are sourced from the official Make3D Pratham X brochure for the 1000 × 1000 × 1000 mm variant.
          </p>
        </div>
      </section>

      {/* ====================================================
          5. PRODUCT OVERVIEW
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Manufacturing Scale
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Built for Mega-Scale Industrial Manufacturing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham X 1000 is engineered for industries that require very large parts, heavy-duty tooling and structural
            prototypes. Its one-metre cubic build volume supports the production of oversized components in a single print
            where the part geometry and print conditions allow.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            The enclosed industrial structure and ball-screw motion mechanism are designed to provide mechanical stability
            for large-format printing. Its large build capacity can help reduce segmentation, joining and assembly steps
            for suitable designs.
          </p>
        </div>

        {/* 6 Key Benefits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Ultra-Large Parts', icon: Box, sub: 'Single-print 1 metre components' },
            { title: 'Structural Prototyping', icon: Factory, sub: 'Full-scale functional models' },
            { title: 'Reduced Assembly', icon: RefreshCw, sub: 'Minimize part segmentation & joining' },
            { title: 'Tooling & Mold Production', icon: Wrench, sub: 'Direct foundry tooling & forms' },
            { title: 'Engineering Polymers', icon: Layers, sub: 'PLA+, PETG, TPU, ABS, ASA' },
            { title: 'Production Design', icon: Building, sub: 'Engineered for continuous duty' },
          ].map((app, idx) => {
            const Icon = app.icon
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{app.title}</h4>
                <p className="text-[10px] text-slate-500">{app.sub}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          6. DEDICATED 1000 MM CUBIC BUILD VOLUME SECTION
         ==================================================== */}
      <section ref={volumeRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
              1,000,000,000 mm³ Build Capacity
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Metre Cubic Build Volume
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              With a 1000 × 1000 × 1000 mm build volume, Pratham X 1000 is designed to manufacture oversized components,
              large enclosures, structural prototypes and industrial tooling. The large build volume gives engineers greater
              freedom to develop large-scale designs and consolidate suitable assemblies into fewer printed parts.
            </p>
          </div>

          {/* 3 Axis Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-2 text-center">
              <div className="text-3xl sm:text-4xl font-black text-red-500 font-mono">1000 mm</div>
              <h3 className="text-sm font-extrabold text-white">X-Axis Width</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Large-format horizontal printing capacity for wide panels, automotive cross-members and expansive tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-2 text-center">
              <div className="text-3xl sm:text-4xl font-black text-red-500 font-mono">1000 mm</div>
              <h3 className="text-sm font-extrabold text-white">Y-Axis Depth</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extensive depth for oversized square components, deep mold cavities and multi-part batch layouts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/70 space-y-2 text-center">
              <div className="text-3xl sm:text-4xl font-black text-red-500 font-mono">1000 mm</div>
              <h3 className="text-sm font-extrabold text-white">Z-Axis Height</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full one-metre vertical build height powered by industrial ball-screw Z synchronization for tall monoliths.
              </p>
            </div>
          </div>

          {/* Configuration Disambiguation Note */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 text-center font-mono">
            “Build volume is configuration-specific. This section describes the 1000 × 1000 × 1000 mm Pratham X 1000 variant, not the 1000 × 1000 × 600 mm configuration.”
          </div>
        </div>
      </section>

      {/* ====================================================
          7. KEY FEATURES (13 Features Responsive Grid)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Engineering Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Advanced Features of Pratham X 1000
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Constructed with industrial-grade mechanical, thermal, and electronic components for stable large-scale operation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 1,
              title: 'Heavy-Duty Steel Frame',
              desc: 'The industrial all-metal MS frame is designed to provide a robust structure for large-format printing workflows, ensuring vibration-free stability.',
              icon: Factory,
              tag: 'Chassis',
            },
            {
              id: 2,
              title: 'Fully Enclosed Chamber',
              desc: 'The enclosed chamber is intended to support controlled printing conditions for large parts and suitable engineering materials, reducing drafts.',
              icon: ShieldCheck,
              tag: 'Thermal',
            },
            {
              id: 3,
              title: 'All-Axis Ball-Screw Mechanism',
              desc: 'The brochure describes a robust XYZ gantry system with ball-screw movement. This is intended to support controlled movement across the large travel range.',
              icon: Wrench,
              tag: 'Motion',
            },
            {
              id: 4,
              title: 'THK Linear Motion Guides',
              desc: 'The brochure lists Japanese THK linear motion guides with ball-screw mechanisms for the gantry system, ensuring tight repeatability.',
              icon: Compass,
              tag: 'Guidance',
            },
            {
              id: 5,
              title: 'Silicone Heatbed',
              desc: 'The product page highlights a silicone heatbed with fast bed heating. The brochure lists a 120°C printbed temperature across the entire 1 m² platform.',
              icon: Thermometer,
              tag: 'Bed Heating',
            },
            {
              id: 6,
              title: 'Automatic Bed Leveling',
              desc: 'Automatic bed leveling is listed as a feature intended to simplify bed calibration and first-layer preparation across the massive build surface.',
              icon: RefreshCw,
              tag: 'Calibration',
            },
            {
              id: 7,
              title: 'Filament Sensor',
              desc: 'The brochure describes a filament sensor that can help users respond when filament is exhausted during long-hour continuous printing.',
              icon: Activity,
              tag: 'Monitoring',
            },
            {
              id: 8,
              title: 'Large Build Volume',
              desc: 'The one-metre cubic (1000 × 1000 × 1000 mm) configuration enables suitable oversized parts to be produced in a single print without segmentation.',
              icon: Box,
              tag: 'Capacity',
            },
            {
              id: 9,
              title: 'High-Temperature Extrusion',
              desc: 'The brochure lists a 280°C single extruder. Supports compatible thermoplastics within the validated material and machine configuration.',
              icon: Flame,
              tag: 'Extrusion',
            },
            {
              id: 10,
              title: 'Touchscreen Control',
              desc: 'The brochure lists touchscreen control for machine operation, print parameter adjustments and real-time job monitoring.',
              icon: Monitor,
              tag: 'HMI',
            },
            {
              id: 11,
              title: 'Adjustable Layer Resolution',
              desc: 'The brochure lists layer resolutions from 0.08 mm to 0.4 mm, allowing users to select a suitable balance between fine surface detail and print duration.',
              icon: Layers,
              tag: 'Resolution',
            },
            {
              id: 12,
              title: 'Industrial Aluminum Printbed',
              desc: 'The brochure lists an aluminum printbed with silicone heating, delivering uniform heat distribution across the 1000 × 1000 mm surface.',
              icon: HardDrive,
              tag: 'Platform',
            },
            {
              id: 13,
              title: 'Production-Oriented Design',
              desc: 'Positioned for continuous production cycles, foundry core tooling and heavy-duty manufacturing environments where stability is essential.',
              icon: Building,
              tag: 'Industrial',
            },
          ].map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          8. HIGH-SPEED INDUSTRIAL PRINTING
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Motion Dynamics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Stable Printing for Large-Format Parts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pratham X JUMBO's product page lists printing speeds up to 120 mm/sec. The brochure lists a print speed range
              of 40–120 mm/sec. These values are presented as manufacturer-listed figures and not as guaranteed speeds for
              every material or model.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {[
              { title: 'Ball-Screw Motion', sub: 'Rigid XYZ gantry translation' },
              { title: 'Heavy-Duty Frame', sub: 'Vibration-damping structural steel' },
              { title: 'Industrial THK Guides', sub: 'Micron-level positional accuracy' },
              { title: 'Adjustable Layers', sub: '0.08 to 0.4 mm versatility' },
              { title: 'High-Temp Extrusion', sub: '280°C hotend temperature' },
            ].map((p, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                <h4 className="text-xs font-bold text-slate-900 mt-1">{p.title}</h4>
                <p className="text-[11px] text-slate-500">{p.sub}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 font-mono">
            “Actual print speed depends on geometry, material, nozzle, layer height, extrusion flow, slicing settings and operating conditions.”
          </div>
        </div>
      </section>

      {/* ====================================================
          9. INDUSTRIAL APPLICATIONS (7 Cards)
         ==================================================== */}
      <section ref={applicationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Target Industry Sectors
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Engineered for Large-Scale Industrial Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham X 1000 is designed for industrial workflows that require large components, full-scale prototypes and large-format tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Automotive Body Panels',
              desc: 'Support the development of oversized automotive prototypes, body-panel mockups, large enclosures and suitable tooling.',
              icon: Car,
              items: ['Full-scale bumper mockups', 'Dashboard structures', 'Door inner trim models', 'Forming tool prototypes'],
            },
            {
              title: 'Aerospace Structural Prototypes',
              desc: 'Produce suitable large-scale structural prototypes, mockups and design-validation components for laboratory testing.',
              icon: Plane,
              items: ['Cabin interior mockups', 'Ducting assemblies', 'Aerodynamic validation parts', 'Assembly fixtures'],
            },
            {
              title: 'Large Tooling and Molds',
              desc: 'Create large-format tooling, mold prototypes, thermoforming plugs, foundry patterns and manufacturing aids.',
              icon: Wrench,
              items: ['Foundry sand-casting cores', 'Thermoforming molds', 'Carbon fiber lay-up mandrels', 'Check fixtures'],
            },
            {
              title: 'Defense and Heavy Engineering Parts',
              desc: 'Support selected engineering prototypes, enclosures, equipment mockups and large-format structural parts.',
              icon: ShieldCheck,
              items: ['Armored vehicle mockups', 'Heavy machinery housings', 'Conduit manifolds', 'Protective covers'],
            },
            {
              title: 'Architectural Models',
              desc: 'Create large architectural models, structural mockups, building façade concepts and visual design models.',
              icon: Building,
              items: ['1:1 architectural mockups', 'Complex facade blocks', 'Urban landscape models', 'Sculptural elements'],
            },
            {
              title: 'Industrial Production Components',
              desc: 'Support selected large components, protective covers, machine housings, custom replacement parts and production aids.',
              icon: Factory,
              items: ['Industrial blower housings', 'Protective shields', 'Fluid tank shells', 'Custom brackets'],
            },
            {
              title: 'R&D and Product Development',
              desc: 'Help engineering and research teams iterate on oversized designs, validate part geometry and produce large prototypes.',
              icon: Microscope,
              items: ['Full-scale proof of concepts', 'Ergonomic validation rigs', 'Material test structures', 'University research parts'],
            },
          ].map((app, idx) => {
            const Icon = app.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">{app.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{app.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Representative Outputs
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {app.items.map((item, i) => (
                      <span key={i} className="text-[11px] text-slate-700 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3 text-red-600 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => openQuoteModal(`Discuss Application: ${app.title} (Pratham X 1000)`)}
                    className="mt-3 text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>Discuss Your Application</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          10. WHAT CAN YOU MANUFACTURE WITH PRATHAM X 1000? (10 Outputs)
         ==================================================== */}
      <section ref={showcaseRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Output Showcase
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            From Large-Scale Prototypes to Industrial Components
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Representative large-format engineering outputs achievable on the 1000 × 1000 × 1000 mm platform.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Automotive Body Panels', ind: 'Automotive', desc: 'Single-piece fender and bumper prototypes', img: '/images/pratham3-work/02-automotive-scale-mockups.jpg' },
            { name: 'Large Equipment Enclosures', ind: 'Industrial Machinery', desc: 'Full-volume protective covers & cowlings', img: '/images/pratham3-work/01-real-functional-parts.jpg' },
            { name: 'Structural Prototypes', ind: 'Aerospace & Defense', desc: '1-metre load-bearing structural test frames', img: '/images/pratham3-work/03-complex-engineering-parts.jpg' },
            { name: 'Industrial Tooling', ind: 'Tool & Die', desc: 'Direct 3D printed thermoforming tooling', img: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg' },
            { name: 'Large Foundry Molds', ind: 'Foundry', desc: 'Sand casting patterns without assembly seams', img: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg' },
            { name: 'Architectural Models', ind: 'Architecture', desc: 'Monolithic facade sections and urban scale models', img: '/images/pratham3-work/04-product-prototypes.jpg' },
            { name: 'Engineering Fixtures', ind: 'Manufacturing', desc: 'High-rigidity assembly check fixtures', img: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg' },
            { name: 'Heavy-Equipment Housings', ind: 'Heavy Engineering', desc: 'Durable pump housings and motor covers', img: '/images/pratham3-work/06-functional-end-use-parts.jpg' },
            { name: 'Oversized Mechanical Parts', ind: 'Automation', desc: 'Large robotic arms and structural end-effectors', img: '/images/pratham3-work/08-impact-guards-robot-bumpers.jpg' },
            { name: 'Custom Production Aids', ind: 'Factory Floor', desc: 'Custom assembly cradles and nesting fixtures', img: '/images/pratham3-work/06-functional-end-use-parts.jpg' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col hover:border-slate-300 transition-all group"
            >
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded font-medium">
                  {item.ind}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1">
                <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{item.name}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          11. MATERIAL COMPATIBILITY
         ==================================================== */}
      <section ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Thermoplastic Options
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Material Compatibility for Engineering Workflows
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Pratham X product page lists a range of engineering thermoplastics, while the brochure specifically lists
            PLA+, PETG and TPU. Presenting the product-page materials as manufacturer-listed compatibility with clear source distinctions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'PLA+',
              source: 'Brochure Listed',
              desc: 'Concept models, prototypes and general-purpose components with high dimensional stability across large cross-sections.',
              bed: '50–65°C',
            },
            {
              name: 'PETG',
              source: 'Brochure Listed',
              desc: 'Functional prototypes and selected engineering parts requiring chemical resistance, impact strength and low moisture absorption.',
              bed: '75–85°C',
            },
            {
              name: 'TPU',
              source: 'Brochure Listed',
              desc: 'Suitable flexible components, gaskets, impact dampers and protective cushioning elements.',
              bed: '45–60°C',
            },
            {
              name: 'ABS',
              source: 'Page Listed',
              desc: 'Engineering prototypes and functional components requiring higher thermal and mechanical resilience.',
              bed: '90–110°C',
            },
            {
              name: 'ASA',
              source: 'Page Listed',
              desc: 'Selected outdoor engineering applications where UV stability and environmental weathering are important.',
              bed: '90–110°C',
            },
            {
              name: 'Nylon',
              source: 'Page Listed',
              desc: 'Engineering parts subject to friction, mechanical wear and cyclic stresses.',
              bed: '70–90°C',
            },
            {
              name: 'PC (Polycarbonate)',
              source: 'Page Listed',
              desc: 'Suitable applications subject to validated configuration and thermal enclosure parameters.',
              bed: '100–120°C',
            },
            {
              name: 'Carbon Fiber Composites',
              source: 'Page Listed',
              desc: 'Listed on the product page. Exact composite formulation and hardened nozzle requirements must be confirmed.',
              bed: '70–90°C',
            },
          ].map((mat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMaterial(mat.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                selectedMaterial === mat.name
                  ? 'bg-red-50/60 border-red-500 shadow-sm ring-1 ring-red-500'
                  : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm">{mat.name}</h3>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      mat.source.includes('Brochure') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {mat.source}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mat.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
                Bed Temp: {mat.bed}
              </div>
            </div>
          ))}
        </div>

        {/* Source Note Banner */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <strong>Material Source Distinction:</strong> The brochure lists PLA+, PETG and TPU. The official product page lists PLA, ABS, PETG, ASA, Nylon, TPU, PC and carbon-fiber composites. Material suitability depends on filament grade and machine configuration.
          </div>
          <button
            onClick={() => openQuoteModal('Material Compatibility Enquiry — Pratham X 1000')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shrink-0 transition-colors cursor-pointer"
          >
            Ask About Material Compatibility
          </button>
        </div>
      </section>

      {/* ====================================================
          12. TECHNICAL SPECIFICATIONS (4 Organized Tables)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Technical Data
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham X 1000 — Complete Technical Specifications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Compiled primarily from the official Make3D Pratham X brochure for the 1000 × 1000 × 1000 mm configuration.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'printing', label: 'Printing Specifications' },
            { id: 'software', label: 'Software & Connectivity' },
            { id: 'mechanical', label: 'Mechanical Specifications' },
            { id: 'electrical', label: 'Electrical Specifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSpecTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSpecTab === tab.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Tables */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {activeSpecTab === 'printing' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                Printing Specifications (Brochure-Listed)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Print Technology', v: 'Fused Filament Fabrication (FFF / FDM)' },
                  { k: 'Build Volume', v: '1000 × 1000 × 1000 mm (1 m³ for this variant)' },
                  { k: 'Layer Resolution', v: '0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm' },
                  { k: 'Dimensional Tolerance', v: '±0.2 mm' },
                  { k: 'Print Speed', v: 'Up to 120 mm/s' },
                  { k: 'Extruder Temperature', v: '280°C, single extruder' },
                  { k: 'Printbed Temperature', v: '120°C (Silicone fastest heating bed)' },
                  { k: 'Standard Nozzle', v: '0.5 mm' },
                  { k: 'Changeable Nozzle Options', v: '0.3 / 0.4 / 0.6 / 0.8 mm' },
                  { k: 'Heatbed Build Platform', v: 'Heated aluminum printbed' },
                  { k: 'Filament Diameter', v: '1.75 mm' },
                  { k: 'Brochure-listed Materials', v: 'PLA+ / PETG / TPU' },
                  { k: 'Operating Control', v: 'Touchscreen control' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSpecTab === 'software' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                Software and Connectivity (Brochure-Listed)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Software Bundle', v: 'Simplify3D license' },
                  { k: 'Operating System Compatibility', v: 'Windows / Mac' },
                  { k: 'Supported File Formats', v: 'STL / G-code' },
                  { k: 'Connectivity Interfaces', v: 'USB / SD Card / Wi-Fi (optional add-on)' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSpecTab === 'mechanical' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                Mechanical Specifications (Brochure-Listed)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'XY Gantry Motion', v: 'THK linear motion guide with ball screw' },
                  { k: 'X-Y Precision', v: '11 microns' },
                  { k: 'Z Precision', v: '10 microns with industrial ball screw' },
                  { k: 'Body Hardware', v: 'All-metal MS body' },
                  { k: 'Printer Dimensions', v: 'Customized (Approx. 6 ft × 6 ft × 6 ft / 8 ft)' },
                  { k: 'Printer Net Weight', v: '250 kg' },
                  { k: 'Shipping Weight', v: '270 kg with accessories kit' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSpecTab === 'electrical' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                Electrical Specifications (Brochure-Listed)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Power Requirements', v: '230 V, 50 Hz' },
                  { k: 'Power Rating', v: '780 W' },
                  { k: 'Operational Frequency', v: '50 Hz' },
                  { k: 'Earthing & Protection', v: 'Dedicated industrial ground line required' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variant Distinction Note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
            <strong>Configuration Scope:</strong> The brochure describes two configurations (1000 × 1000 × 600 mm and 1000 × 1000 × 1000 mm). This page section is exclusively for the 1000 × 1000 × 1000 mm configuration. Confirm final dimensions and supplied accessories with Make3D.
          </div>
        </div>
      </section>

      {/* ====================================================
          13. MECHANICAL SYSTEM & STRUCTURAL STABILITY
         ==================================================== */}
      <section ref={motionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Kinematics & Motion
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Robust XYZ Gantry with Ball-Screw Movement
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Pratham X brochure lists a THK linear motion guide with ball-screw movement and an all-metal MS body,
            intended to support controlled movement and structural stability for large-format printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">All-Axis Ball-Screw Movement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Industrial ball screws on XYZ gantry axes eliminate belt elasticity and back-lash over full 1-metre travel lengths.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">THK Linear Motion Guides</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Genuine THK industrial linear guide rails ensure 11-micron X-Y precision and smooth gantry glide under heavy continuous loads.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">250 kg All-Metal MS Body</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Welded steel construction provides mechanical dampening and structural inertia against resonance during rapid directional changes.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          14. THERMAL MANAGEMENT AND HEATED BED
         ==================================================== */}
      <section ref={thermalRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Thermal Control
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Thermal Control for Large-Format Printing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The product page describes advanced thermal management intended to support stable printing of large objects,
            minimize warping and improve layer adhesion. The brochure lists a 120°C printbed and a silicone heatbed feature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">120°C Heated Bed</h3>
            <p className="text-xs text-slate-600">Brochure-listed temperature for reliable polymer adhesion.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Silicone Heatbed</h3>
            <p className="text-xs text-slate-600">Fast bed heating highlighted on official product page.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Enclosed Chamber</h3>
            <p className="text-xs text-slate-600">Shields large builds from external workshop drafts.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Aluminum Plate</h3>
            <p className="text-xs text-slate-600">Uniform heat conduction across the 1000 × 1000 mm surface.</p>
          </div>
        </div>
      </section>

      {/* ====================================================
          15. CONNECTIVITY AND SOFTWARE WORKFLOW
         ==================================================== */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              CAD to Production
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Flexible File Handling and Print Preparation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The brochure lists STL and G-code file support, Windows and Mac operating systems, Simplify3D software and
              USB/SD card connectivity. Wi-Fi is listed as an optional add-on in the brochure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
            {[
              { step: '1. CAD Design', desc: 'Design oversized component in compatible CAD software' },
              { step: '2. Export Model', desc: 'Export geometry in standard STL or 3MF format' },
              { step: '3. Slice File', desc: 'Prepare toolpaths using Simplify3D license software' },
              { step: '4. File Transfer', desc: 'Load file via USB drive, SD Card or optional Wi-Fi' },
              { step: '5. Machine Print', desc: 'Initiate and manage job using touchscreen controller' },
            ].map((st, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-mono font-bold text-red-600 uppercase block">Step {i + 1}</span>
                <h4 className="text-xs font-bold text-slate-900">{st.step}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-1">
            <p>• Wi-Fi is listed as an optional add-on in the brochure (USB and SD Card are standard).</p>
            <p>• Simplify3D license is supplied as part of the software bundle.</p>
          </div>
        </div>
      </section>

      {/* ====================================================
          16. LARGE-PART PRODUCTION BENEFITS
         ==================================================== */}
      <section ref={benefitsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Manufacturing Consolidation
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Designed to Reduce Part Segmentation
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The one-metre cubic build volume allows suitable large components to be printed as single pieces rather than split
            into smaller sections. This can reduce the need for assembly and joining for compatible designs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Fewer Divisions', desc: 'Single-print monolithic bodies' },
            { title: 'Reduced Assembly', desc: 'Eliminate bonding seams and adhesives' },
            { title: 'Prototype Scale', desc: '1:1 true-scale physical validation' },
            { title: 'Full Validation', desc: 'Validate ergonomics and fit directly' },
            { title: 'Large Tooling', desc: 'Print direct molds without sectioning' },
            { title: 'Agile Flexibility', desc: 'Modify designs without retooling molds' },
          ].map((b, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
              <CheckCircle2 className="w-5 h-5 text-red-600 mx-auto" />
              <h4 className="font-extrabold text-xs text-slate-900 mt-1">{b.title}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          17. INSTALLATION, SERVICE SUPPORT & WARRANTY
         ==================================================== */}
      <section ref={supportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Service & Warranty
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Technical Support & 12-Month Official Warranty
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Make3D's product page describes remote and onsite support across India, complete installation, starter package and onsite onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Installation & Setup</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete installation and setup support provided on-site across India, as stated by the manufacturer.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Onsite Onboarding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hardware and software onboarding for engineers, teams, or institutions to ensure rapid operational productivity.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">12-Month Full Warranty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The official product page states that Pratham X comes with a 12-month full standard warranty.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Complete Starter Package</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Supplied with a complete package of accessories and tools to begin large-format 3D printing right after setup.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          18. PRODUCT GALLERY (Interactive Lightbox)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Visual Inspection
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Explore Pratham X 1000
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Authentic product photography showcasing machine chassis, ball screw gantry, and large printed objects.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="relative h-80 sm:h-96 md:h-[460px] rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden group">
            <img
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].title}
              className="max-h-full max-w-full object-contain p-4 drop-shadow-md transition-all duration-300"
            />
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-xs transition-colors cursor-pointer"
              title="Expand to Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-xs text-white text-xs flex justify-between items-center">
              <span className="font-bold">{galleryImages[activeImageIndex].title}</span>
              <span className="text-[11px] text-slate-300 font-mono">
                {activeImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-red-600 ring-2 ring-red-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          19. OFFICIAL DEMO AND BROCHURE SECTION
         ==================================================== */}
      <section ref={videoRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase text-red-400 font-bold">Official Demonstration</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Discover the Pratham X JUMBO
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Watch Make3D's official demonstration of a life-sized chair printed on the Pratham X over 220 continuous hours, or download the full product brochure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={officialBrochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Brochure</span>
            </a>
            <button
              onClick={() => setVideoModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Watch Product Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          20. FREQUENTLY ASKED QUESTIONS (15 Accordion Items)
         ==================================================== */}
      <section ref={faqRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Questions & Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Essential information regarding build volume, materials, precision, warranty, and onboarding.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                aria-expanded={openFaq === idx}
              >
                <span className="font-extrabold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          21. REQUEST A QUOTE FOR PRATHAM X 1000
         ==================================================== */}
      <section ref={quoteRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                Commercial Enquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Bring Your Biggest Ideas to Life with Pratham X 1000
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tell us about your oversized printing requirements. The Make3D team can help you explore the Pratham X 1000 configuration for your industrial, engineering or manufacturing application.
              </p>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Quote Request Received!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you for your enquiry on Pratham X 1000. Our industrial additive engineering team will review your specifications and contact you with a formal quotation and technical consultation.
                </p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
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
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Institution</label>
                    <input
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      placeholder="e.g. Apex Heavy Industries"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="e.g. vikram@apexheavy.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={quoteForm.city}
                      onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                      placeholder="e.g. Ahmedabad, Pune, Chennai"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={quoteForm.state}
                      onChange={(e) => setQuoteForm({ ...quoteForm, state: e.target.value })}
                      placeholder="e.g. Gujarat, Maharashtra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
                    <select
                      value={quoteForm.industry}
                      onChange={(e) => setQuoteForm({ ...quoteForm, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>Automotive & Heavy Industry</option>
                      <option>Aerospace & Defense</option>
                      <option>Foundry & Tooling</option>
                      <option>Architecture & Large Construction</option>
                      <option>Industrial Machinery & Automation</option>
                      <option>Research & Academic Labs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Application</label>
                    <select
                      value={quoteForm.application}
                      onChange={(e) => setQuoteForm({ ...quoteForm, application: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>Oversized Structural Prototyping</option>
                      <option>Large Foundry Tooling & Sand Cores</option>
                      <option>Full-Scale Automotive Mockups</option>
                      <option>Batch Production Aids</option>
                      <option>Architectural Façade & Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Material Requirement</label>
                    <select
                      value={quoteForm.material}
                      onChange={(e) => setQuoteForm({ ...quoteForm, material: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>PLA+ / Tough PLA</option>
                      <option>PETG</option>
                      <option>Flexible TPU</option>
                      <option>ABS / ASA</option>
                      <option>Carbon Fiber Composites</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Build Volume</label>
                    <input
                      type="text"
                      disabled
                      value="1000 × 1000 × 1000 mm (1 Metre Cubic)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-100 text-slate-700 font-mono font-bold cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Additional Requirements or Specifications
                  </label>
                  <textarea
                    rows={3}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    placeholder="Specify target component dimensions, continuous run requirements, or optional add-ons (Wi-Fi, Dual Extruder)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Request Official Quotation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          22. RELATED PRODUCTS (Pratham Series)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Series Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Explore the Make3D Pratham Series
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From educational learning printers to high-speed rapid systems and jumbo manufacturing platforms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {[
            {
              name: 'Pratham Mini',
              vol: '170 × 170 × 170 mm',
              tag: 'Compact Learning',
              link: '/products/pratham-mini',
              img: '/images/products/pratham-mini.png',
            },
            {
              name: 'Pratham Desktop',
              vol: '200 × 200 × 250 mm',
              tag: 'Desktop Precision',
              link: '/products/pratham-desktop',
              img: '/images/products/pratham-desktop.png',
            },
            {
              name: 'Pratham 3.0',
              vol: '300 × 300 × 300 mm',
              tag: 'Workshop Workhorse',
              link: '/products/pratham-3',
              img: '/images/products/pratham-3-0.png',
            },
            {
              name: 'Pratham 3 Rapid',
              vol: '350 × 350 × 350 mm',
              tag: '500 mm/s High-Speed',
              link: '/products/pratham-3-rapid',
              img: '/images/products/pratham-3-rapid.png',
            },
            {
              name: 'Pratham 5.0',
              vol: '500 × 500 × 500 mm',
              tag: 'Monster Industrial',
              link: '/products/pratham-5-0',
              img: '/images/products/pratham-5-0.png',
            },
            {
              name: 'Pratham 6.0',
              vol: '600 × 600 × 600 mm',
              tag: 'Large Monolith',
              link: '/products/pratham-6-0',
              img: '/images/products/pratham-6-0.png',
            },
            {
              name: 'Pratham X 600',
              vol: '1000 × 1000 × 600 mm',
              tag: '600 mm Z Variant',
              link: '/products/pratham-x-600',
              img: '/images/products/pratham-x.png',
            },
          ].map((printer, idx) => (
            <div
              key={idx}
              className="rounded-2xl border p-4 flex flex-col justify-between text-center space-y-3 bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs transition-all"
            >
              <div className="h-24 flex items-center justify-center p-2">
                <img src={printer.img} alt={printer.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">{printer.tag}</span>
                <strong className="text-xs font-black text-slate-900 block">{printer.name}</strong>
                <span className="text-[10px] text-slate-500 font-mono block">{printer.vol}</span>
              </div>
              <Link
                to={printer.link}
                className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold block transition-colors"
              >
                Explore Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          23. FINAL CALL TO ACTION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              1000 × 1000 × 1000 mm Jumbo 3D Printing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Powerful. Precise. Made in India.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore one-metre cubic industrial 3D printing with all-axis ball screws, silicone rapid heating and licensed Simplify3D software. Discuss your oversized additive manufacturing requirements with our engineering team today.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => openQuoteModal('Pratham X 1000 — 1000 × 1000 × 1000 mm')}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={officialBrochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-wide transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </a>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Watch Product Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ====================================================
          LIGHTBOX MODAL
         ==================================================== */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].title}
              className="max-h-[75vh] max-w-full object-contain drop-shadow-2xl"
            />
            <div className="mt-4 text-white text-sm font-bold text-center">
              {galleryImages[activeImageIndex].title}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          YOUTUBE VIDEO MODAL
         ==================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                <span>Make3D Pratham X Jumbo 3D Printer — Life-Sized Chair 3D Printed</span>
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${officialVideoId}?autoplay=1`}
                title="Make3D Pratham X Jumbo 3D Printer Official Demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Gallery Images List
const galleryImages = [
  { url: '/images/products/pratham-x.png', title: 'Pratham X 1000 JUMBO Machine Front View (1000 × 1000 × 1000 mm)' },
  { url: '/images/products/pratham-x-1000-hero.png', title: 'Pratham X Jumbo 3D Printer with Large Build Volume' },
  { url: '/images/products/pratham-x-1000-detail.png', title: 'All-Axis Ball Screw Mechanism & Gantry Assembly' },
]

// 15 Official FAQs
const faqs = [
  {
    q: 'What is the build volume of Pratham X 1000?',
    a: 'The Pratham X 1000 configuration has a listed build volume of 1000 × 1000 × 1000 mm (1 Cubic Metre / 1000 Liters). The Pratham X family is also available in a 1000 × 1000 × 600 mm configuration.',
  },
  {
    q: 'What materials can Pratham X print?',
    a: 'The product page lists PLA, ABS, PETG, ASA, Nylon, TPU, PC and carbon-fiber composites. The brochure specifically lists PLA+, PETG and TPU. Confirm the exact supported grades and configuration with Make3D.',
  },
  {
    q: 'Is Pratham X suitable for industrial production?',
    a: 'Make3D positions Pratham X JUMBO for large-scale industrial manufacturing, oversized parts, tooling, structural prototypes and production workflows. Actual suitability depends on the part, material, configuration and operating conditions.',
  },
  {
    q: 'Does Make3D provide after-sales support?',
    a: 'The official product page describes technical service and support across India, including remote and onsite support.',
  },
  {
    q: 'Is onboarding provided?',
    a: 'The official product page states that onsite hardware and software onboarding is provided for the concerned personnel.',
  },
  {
    q: 'Is Pratham X made in India?',
    a: 'Make3D describes Pratham X as designed and developed in India.',
  },
  {
    q: 'Are accessories included?',
    a: 'The official product page states that the printer is supplied with a complete package of accessories and tools. Confirm the exact current in-box list with Make3D.',
  },
  {
    q: 'What is the warranty?',
    a: 'The official product page lists a 12-month full standard warranty for Pratham X. Confirm current warranty terms before purchase.',
  },
  {
    q: 'What is the maximum printing speed?',
    a: 'The brochure lists a print speed range of 40–120 mm/sec. Actual speed depends on the print setup, material and geometry.',
  },
  {
    q: 'What is the dimensional tolerance?',
    a: 'The brochure lists a dimensional tolerance of ±0.2 mm. Actual print results may vary according to the part, material, calibration and operating conditions.',
  },
  {
    q: 'What is the nozzle temperature?',
    a: 'The brochure lists a 280°C single-extruder temperature.',
  },
  {
    q: 'What is the printbed temperature?',
    a: 'The brochure lists a printbed temperature of 120°C on a silicone-heated aluminum platform.',
  },
  {
    q: 'Which software is supported?',
    a: 'The brochure lists Simplify3D software, Windows and Mac operating system support, and STL or G-code file formats. Confirm the current software bundle and version with Make3D.',
  },
  {
    q: 'What connectivity options are available?',
    a: 'The brochure lists USB and SD card connectivity, with Wi-Fi available as an optional add-on.',
  },
  {
    q: 'What are the printer dimensions and weight?',
    a: 'The brochure lists customized dimensions, approximately 6 ft × 6 ft × 6 ft / 8 ft, a printer weight of 250 kg and shipping weight of 270 kg with accessories. Confirm the exact dimensions of the selected configuration.',
  },
]

export default PrathamX1000Page
