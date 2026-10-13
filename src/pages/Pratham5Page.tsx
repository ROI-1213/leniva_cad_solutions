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
  Cpu,
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
  FileCode,
  Gauge,
  Thermometer,
  Shield,
  Clock,
  Sparkle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham5Page: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()

  // Navigation & Interactive Tabs
  const [activeNav, setActiveNav] = useState<string>('overview')
  const [activeSpecTab, setActiveSpecTab] = useState<'print' | 'software' | 'mechanics' | 'electrical'>('print')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)
  const [activeVideoId, setActiveVideoId] = useState<string>('88qXbDi_Ckg')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ABS')

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
    material: 'ABS / PETG / Engineering Blends',
    partSize: 'Up to 500 mm',
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
  const monsterRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const reliabilityRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, navId: string) => {
    setActiveNav(navId)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Official URLs
  const officialBrochureUrl = '/brochures/pratham-5.pdf'
  const officialProductUrl = 'https://make3d.in/pratham-5-0/'

  // SEO & Structured Data
  useEffect(() => {
    document.title = 'Pratham 5.0 Industrial 3D Printer | 500 × 500 × 500 mm | Make3D'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the Make3D Pratham 5.0 large-format industrial FDM 3D printer with a 500 × 500 × 500 mm build volume, enclosed chamber, engineering material support and India-wide service options.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 5.0 Monster Industrial-Grade 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-5-0.png',
      description:
        'Pratham 5.0 is a 500 × 500 × 500 mm large-format industrial FDM 3D printer manufactured by Make3D in India for large-scale manufacturing, functional prototyping, industrial production, tooling and engineering applications.',
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
        url: 'https://lenivacadsolution.com/products/pratham-5-0',
      },
    }

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lenivacadsolution.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://lenivacadsolution.com/products' },
        { '@type': 'ListItem', position: 3, name: 'FDM 3D Printers', item: 'https://lenivacadsolution.com/products/fdm-3d-printers' },
        { '@type': 'ListItem', position: 4, name: 'Pratham 5.0', item: 'https://lenivacadsolution.com/products/pratham-5-0' },
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
        productOrService: 'Pratham 5.0 Monster Industrial-Grade 3D Printer',
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
            <span className="text-slate-900 font-bold">Pratham 5.0 (500 × 500 × 500 mm)</span>
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
              <span>Pratham 5.0</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                500 mm³ Monster
              </span>
            </span>
            <span className="text-xs text-slate-400 hidden md:inline font-mono">| Make3D Industrial FDM</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'features', label: 'Features', ref: featuresRef },
              { id: 'performance', label: 'Performance', ref: performanceRef },
              { id: 'monster', label: 'Architecture', ref: monsterRef },
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
              onClick={() => openQuoteModal('Pratham 5.0 Monster Industrial-Grade 3D Printer')}
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
                <span>MAKE3D | INDUSTRIAL FDM 3D PRINTER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Pratham 5.0 — Monster Industrial-Grade 3D Printer
              </h1>
              <p className="text-lg sm:text-xl font-bold text-red-600 tracking-tight">
                Large Format. Industrial Strength. Made in India.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Built for large-scale manufacturing, functional prototyping and industrial production, Pratham 5.0 combines
              a 500 × 500 × 500 mm build volume with a robust all-metal structure, an enclosed chamber and features designed
              for demanding engineering workflows.
            </p>

            {/* Positioning Banner */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border-l-4 border-red-500 shadow-sm space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                Powerful. Precise. Made in India.
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pratham 5.0 is built for large-scale manufacturing, functional prototyping and industrial production. Its
                500 × 500 × 500 mm build volume, robust all-metal structure and industrial-focused features are designed to
                support the creation of large components, prototypes and functional parts.
              </p>
            </div>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {[
                { label: 'Build Envelope', value: '500 × 500 × 500 mm', icon: Box },
                { label: 'Chassis System', value: 'Heavy-Duty All-Metal Frame', icon: Factory },
                { label: 'Enclosure', value: 'Fully Enclosed Chamber', icon: ShieldCheck },
                { label: 'Extrusion', value: 'Up to 280°C High-Temp', icon: Flame },
                { label: 'Filament System', value: '1.75 mm Multi-Material', icon: Layers },
                { label: 'Operator Control', value: 'Touchscreen Interface', icon: Monitor },
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
                onClick={() => openQuoteModal('Pratham 5.0 Monster Industrial-Grade 3D Printer')}
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
                <span>Download Brochure</span>
              </a>
              <button
                onClick={() => {
                  setActiveVideoId('88qXbDi_Ckg')
                  setVideoModalOpen(true)
                }}
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
                <span>Monster 500 mm³</span>
              </div>

              {/* Main Machine Image */}
              <div className="relative z-0 flex items-center justify-center py-4">
                <img
                  src="/images/products/pratham-5-0.png"
                  alt="Make3D Pratham 5.0 Monster Industrial-Grade 3D Printer"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Verified Technical Callouts around Product */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>500 mm cubic build area</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Enclosed chamber</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Industrial all-metal structure</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Touchscreen control</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. QUICK SPECIFICATION STRIP
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
                val: '500×500×500 mm',
                sub: '500 mm³ Build Capacity',
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
                label: 'Dimensional Tol.',
                val: '±0.1 mm',
                sub: 'Brochure Specified',
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
            <strong>Accuracy Notice:</strong> Official Make3D documentation lists speed up to 120 mm/s on the product page and 40–120 mm/sec in the brochure; layer resolution from 80–600 microns on the product page and 0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm in the brochure. Both sources are preserved above.
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
            Built for Large Industrial Manufacturing Needs
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 5.0 is engineered for industries that require bigger build capacity and stronger structural parts. Its 500 mm cubic build volume enables large components to be printed in a single run, potentially reducing assembly effort and improving production efficiency. The manufacturer describes the printer as designed for continuous operation. Its rigid frame structure is intended to minimize vibration and support consistent dimensional accuracy during large-format printing.
          </p>
        </div>

        {/* 6 Application Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Automotive Components', icon: Compass, sub: 'Sensor housings & brackets' },
            { title: 'Tooling & Jigs', icon: Factory, sub: 'Assembly aids & drill guides' },
            { title: 'Aerospace Prototypes', icon: Cpu, sub: 'Duct mockups & enclosures' },
            { title: 'Structural Engineering', icon: Wrench, sub: 'Machinery components' },
            { title: 'Product Design', icon: Box, sub: 'Full-size functional models' },
            { title: 'Research & Dev', icon: GraduationCap, sub: 'University & defense labs' },
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

        {/* Visual Callout showing printer scale with large printed part */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-wider">
              Visual Scale Communication
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Large-Format Printing Designed to Eliminate Sectional Assembly
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With a 500 mm cubic print chamber, Pratham 5.0 produces full-size structural components, oversized industrial impellers, functional fluid tanks, and manufacturing fixtures in one continuous monolithic print.
            </p>
            <p className="text-[11px] text-slate-500 italic">
              Caption: Actual printable dimensions depend on part geometry, print clearance and support requirements.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveVideoId('88qXbDi_Ckg')
                  setVideoModalOpen(true)
                }}
                className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
              >
                <Play className="w-4 h-4 fill-red-600" />
                <span>Watch Large Size Impeller 3D Printing Video (1:26)</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 bg-slate-100 p-4 sm:p-6 flex items-center justify-center">
            <img
              src="/images/products/pratham-5-0.png"
              alt="Pratham 5.0 with full size printed component"
              className="rounded-2xl max-h-80 w-auto object-contain drop-shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INDUSTRIAL PERFORMANCE (5 Feature Tiles)
         ==================================================== */}
      <section ref={performanceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Designed for Speed, Accuracy and Strength
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Industrial Performance That Delivers Results
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 5.0 combines mechanical stability with smart control systems for large-format printing. The manufacturer highlights smooth surface finish, dimensional control, stable layer bonding, high-strength printed parts and long-hour printing performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Smooth Surface Finish',
              desc: 'Designed to support smooth surface quality through controlled layer deposition and suitable print settings.',
              icon: Sparkle,
            },
            {
              title: 'Accurate Dimensional Control',
              desc: 'The brochure lists ±0.1 mm dimensional tolerance. Actual results depend on geometry, material, calibration and operating conditions.',
              icon: Gauge,
            },
            {
              title: 'Stable Layer Bonding',
              desc: 'Material and thermal settings can be configured to support strong bonding between printed layers.',
              icon: Layers,
            },
            {
              title: 'High-Strength Printed Parts',
              desc: 'Supports selected engineering thermoplastics for functional prototyping and suitable industrial applications.',
              icon: ShieldCheck,
            },
            {
              title: 'Long-Hour Printing Performance',
              desc: 'The product page states that the machine was tested for a continuous print of 245 hours (manufacturer-reported test, not a universal guarantee).',
              icon: Activity,
            },
          ].map((tile, idx) => {
            const Icon = tile.icon
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{tile.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tile.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-[11px] text-slate-500 italic bg-slate-100 p-3 rounded-xl border border-slate-200 text-center">
          <strong>Note on Operational Claims:</strong> The manufacturer page references “0% Job Failure” in its marketing language. As with all industrial additive equipment, actual print outcomes depend on material choice, slice settings, part design, regular maintenance and ambient operating conditions. Pratham 5.0 incorporates hardware emergency recovery and filament runout protection to assist in fault mitigation.
        </p>
      </section>

      {/* ====================================================
          7. MONSTER 3D PRINTER: ELECTRONICS, MECHANICS, SOFTWARE
         ==================================================== */}
      <section ref={monsterRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Engineering Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Monster 3D Printer, Powered by Advanced Electronics, Robust Mechanics and Advanced Software
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Engineered tripartite architecture uniting intelligent power management, rigid all-metal mechanical motion, and commercial-grade slicing toolpaths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Part 1: Advanced Electronics */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-white">Advanced Electronics</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Equipped with smart control systems, power failure protection, auto-resume facility, and an emergency G-code cutting recovery mechanism listed on the product page.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                <span>Power Recovery & Runout Detection</span>
              </div>
            </div>

            {/* Part 2: Robust Mechanics */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-white">Robust Mechanics</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All-metal MS body, THK linear motion guides, and an industrial ground ball screw for the Z axis listed in the official brochure ensure mechanical rigidity across 500 mm.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                <span>THK Guides & All-Metal Chassis</span>
              </div>
            </div>

            {/* Part 3: Advanced Software */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className="font-black text-lg text-white">Advanced Software</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Official brochure lists a Simplify3D license software bundle with comprehensive slicing controls, validated machine profiles, and standard STL / GCODE / OBJ workflows.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                <span>Simplify3D License Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. KEY FEATURES (12 Features Grid)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Engineering Highlights
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Key Points of Pratham 5.0 3D Printer
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Detailed breakdown of key product features from the official Make3D product page and brochure.
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
          9. MATERIALS & FILAMENT COMPATIBILITY
         ==================================================== */}
      <section ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Filament Options
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Multi-Material Support for Diverse Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 5.0 supports a range of 1.75 mm filament types listed by the manufacturer. Actual compatibility depends on the filament formulation, printer configuration, validated profiles and operating conditions.
          </p>
        </div>

        {/* Source Attribution Note */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/70 text-xs text-blue-900 flex items-start space-x-3">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
            i
          </div>
          <p className="leading-relaxed">
            <strong>Source Distinction:</strong> Product page lists PLA, ABS, PETG, ASA, Nylon, TPU, and Carbon Fiber blends. The official brochure additionally lists PP, HIPS, and Carbon-fused composites. Specialty materials require validated profiles and suitable operating conditions.
          </p>
        </div>

        {/* Standard vs Specialty Materials Grid */}
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
                  <span className="text-[9px] font-mono text-slate-400">{mat.source}</span>
                </div>
                <h4 className="font-extrabold text-sm mt-1">{mat.name}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${selectedMaterial === mat.name ? 'text-slate-300' : 'text-slate-600'}`}>
                  {mat.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/40 text-[10px] font-mono">
                <span className={selectedMaterial === mat.name ? 'text-slate-400' : 'text-slate-500'}>
                  Target: {mat.bestFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => openQuoteModal('Material Compatibility Query - Pratham 5.0')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-red-600 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Ask About Material Compatibility</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ====================================================
          12. TECHNICAL SPECIFICATIONS (Grouped Tables)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Datasheet
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham 5.0 Technical Specifications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Detailed engineering specifications comparing product-page listings and official brochure data.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center space-x-2 border-b border-slate-200 pb-2">
          {[
            { id: 'print', label: 'Printing Specifications', icon: Layers },
            { id: 'software', label: 'Software & Connectivity', icon: FileCode },
            { id: 'mechanics', label: 'Mechanical Specifications', icon: Wrench },
            { id: 'electrical', label: 'Electrical Specifications', icon: Zap },
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
                    { spec: 'Build Volume', page: '500 × 500 × 500 mm', bro: '500 × 500 × 500 mm' },
                    {
                      spec: 'Layer Resolution',
                      page: '80–600 microns',
                      bro: '0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm',
                    },
                    { spec: 'Dimensional Tolerance', page: 'Not specified on page', bro: '±0.1 mm' },
                    { spec: 'Print Speed', page: 'Up to 120 mm/s', bro: '40–120 mm/sec' },
                    { spec: 'Extruder Temperature', page: 'Not specified on page', bro: '280°C, single extruder' },
                    { spec: 'Printbed Temperature', page: 'Not specified on page', bro: '120°C' },
                    { spec: 'Nozzle Size (Standard)', page: 'Not specified on page', bro: '0.5 mm standard' },
                    {
                      spec: 'Changeable Nozzle Sizes',
                      page: 'Not specified on page',
                      bro: '0.3 / 0.4 / 0.6 / 0.8 mm',
                    },
                    { spec: 'Heated Build Platform', page: 'Not specified on page', bro: 'Yes, aluminum printbed' },
                    { spec: 'Heatbed Technology', page: 'Not specified on page', bro: 'Silicone heatbed' },
                    { spec: 'Filament Diameter', page: '1.75 mm', bro: '1.75 mm' },
                    {
                      spec: 'Filament Compatibility',
                      page: 'PLA, ABS, PETG, ASA, Nylon, TPU, Carbon Fiber blends',
                      bro: 'ABS, PLA, TPU, PETG, Carbon-fused composites, ASA, PP, HIPS',
                    },
                    { spec: 'Operating Control', page: 'Not specified in list', bro: 'Touchscreen control' },
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
                      notes: 'Validated slicing engine and profile libraries',
                    },
                    {
                      spec: 'Operating System Compatibility',
                      bro: 'Windows / Mac OS',
                      notes: 'Standard workstation operating platforms',
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
                    <th className="p-3.5 pr-6 w-1/3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {[
                    {
                      param: 'X-Y Gantry Motion',
                      spec: 'THK linear motion guide',
                      desc: 'Japanese industrial linear motion rails for precise toolhead tracking',
                    },
                    {
                      param: 'X-Y Positioning Precision',
                      spec: '11 microns',
                      desc: 'Sub-micron class step resolution',
                    },
                    {
                      param: 'Z-Axis Precision',
                      spec: '10 microns',
                      desc: 'Industrial ball screw drive eliminates z-banding and layer inconsistency',
                    },
                    {
                      param: 'Body Hardware & Chassis',
                      spec: 'All-metal MS body',
                      desc: 'Mild steel welded body dampens vibration during large-format moves',
                    },
                    {
                      param: 'Printer Dimensions',
                      spec: '980 L × 820 W × 990 H mm',
                      desc: 'Compact footprint relative to massive 500 mm cubic envelope',
                    },
                    {
                      param: 'Net Printer Weight',
                      spec: '80 kg',
                      desc: 'Robust heavyweight industrial frame',
                    },
                    {
                      param: 'Gross Shipping Weight',
                      spec: '100 kg with accessories kit',
                      desc: 'Shipped in wooden crate with full toolkit and spares',
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

        {/* Tab 4: Electrical Specifications */}
        {activeSpecTab === 'electrical' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 pl-6 w-1/3">Electrical Parameter</th>
                    <th className="p-3.5 w-1/3">Official Brochure Listing</th>
                    <th className="p-3.5 pr-6 w-1/3">Details</th>
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
                      param: 'Power Rating',
                      spec: '750 W',
                      desc: 'Max rated draw during simultaneous hotend & silicone bed heating',
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

        <p className="text-[11px] text-slate-500 italic bg-slate-100 p-3 rounded-xl border border-slate-200">
          <strong>Technical Specification Note:</strong> The product page and brochure have differences in print speed, layer resolution, file formats, materials and connectivity. These are maintained as source-specific values.
        </p>
      </section>

      {/* ====================================================
          13. SOFTWARE & PRINTING WORKFLOW (4 Steps)
         ==================================================== */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Slicing to Production
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            A Practical Workflow from Design to Print
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 5.0 supports common 3D printing workflows. The brochure lists Simplify3D license software and STL/GCODE file support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 01',
              title: 'Create Your Design',
              desc: 'Design a part using compatible CAD or 3D modeling software (AutoCAD, SolidWorks, CATIA, SketchUp).',
              icon: Compass,
              tag: 'CAD Modeling',
            },
            {
              step: 'Step 02',
              title: 'Prepare the Model',
              desc: 'Export the model in a supported format and prepare toolpaths using compatible slicing software like Simplify3D.',
              icon: Sliders,
              tag: 'Simplify3D Slicing',
            },
            {
              step: 'Step 03',
              title: 'Transfer the File',
              desc: 'Transfer the print-ready file using USB or SD card (Wi-Fi is listed as an optional add-on in the brochure).',
              icon: HardDrive,
              tag: 'USB / SD Card',
            },
            {
              step: 'Step 04',
              title: 'Start Printing',
              desc: "Use the printer's touchscreen control interface to start the print and follow recommended monitoring procedures.",
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
          Supported file formats, software compatibility and connectivity depend on the current machine configuration and should be confirmed with Make3D.
        </p>
      </section>

      {/* ====================================================
          14. INDUSTRIAL RELIABILITY & PRINT PROTECTION
         ==================================================== */}
      <section ref={reliabilityRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Uptime Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Designed to Support Long-Hour Printing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These features are designed to support print preparation, intervention and recovery in demanding workflows. Actual print success depends on machine configuration, material, geometry, settings, maintenance and operating environment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              title: 'Filament Sensor',
              desc: 'Optical filament sensor detects spool depletion and pauses printing to prevent empty toolhead travel.',
              icon: ShieldCheck,
            },
            {
              title: 'Power Failure Protection',
              desc: 'Auto-resume facility stores exact machine coordinates during sudden outages to help recover the job.',
              icon: RotateCcw,
            },
            {
              title: 'Automatic Bed Leveling',
              desc: 'Automated sensor routine simplifies bed leveling and reduces manual operator calibration.',
              icon: Settings,
            },
            {
              title: 'Enclosed Chamber',
              desc: 'Fully enclosed enclosure maintains internal ambient heat and shields prints from external air drafts.',
              icon: Box,
            },
            {
              title: 'Carbon + HEPA Filter',
              desc: 'Brochure-listed closed chamber filtration to support selected material workflows and manage fumes.',
              icon: Shield,
            },
            {
              title: 'Touchscreen Control',
              desc: 'Intuitive touch interface for temperature monitoring, axis movement, and print job execution.',
              icon: Monitor,
            },
            {
              title: 'Emergency G-Code Cutting',
              desc: 'Product-page listed emergency print intervention facility for recovering interrupted toolpaths.',
              icon: Zap,
            },
            {
              title: '245h Continuous Test',
              desc: 'Manufacturer-reported test demonstrating long-hour mechanical and thermal stability.',
              icon: Clock,
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
          15. PRODUCT GALLERY (Interactive Lightbox)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Visual Tour
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Pratham 5.0
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Click any photo to inspect in high-resolution lightbox
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
          14. WORK FROM PRATHAM 5.0 (6 Card Split Grid)
         ==================================================== */}
      <section ref={workRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-500/70 inline-block"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              REAL PARTS, REAL DIMENSIONS
            </span>
            <span className="h-px w-8 bg-red-500/70 inline-block"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase">
            WORK FROM <span className="text-[#2563eb]">PRATHAM 5.0</span> 3D PRINTER
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore examples of large-format prototypes, engineering components, tooling, decorative designs, flexible parts and architecture models produced using Pratham 5.0.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row items-stretch group"
            >
              {/* Left Column: Icon, Category, Title, Description, Explore Link */}
              <div className="w-[53%] p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug mt-0.5 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => openQuoteModal(`Pratham 5.0 — ${item.title}`)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${item.linkColor} hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform`}
                  >
                    <span>Explore Parts</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right Column: Clean Reference Image */}
              <div className={`w-[47%] relative overflow-hidden ${item.bgTint}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          19. TECHNICAL SERVICE & SUPPORT (3 Cards)
         ==================================================== */}
      <section ref={supportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Nationwide Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Support Across India
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The official product page describes 24×7 remote and onsite support and highlights users across engineering, jewelry manufacturing, education and government labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Dedicated Technical Support',
              desc: 'Make3D describes remote and onsite support for customers across India, backed by application specialists and field service engineers.',
              icon: PhoneCall,
              actionText: 'Talk to a Make3D Expert',
              actionClick: () => openQuoteModal('Service & Technical Support - Pratham 5.0'),
            },
            {
              title: 'Happy Users from Every Segment',
              desc: 'The product page references satisfied customers across engineering, jewelry manufacturing, educational institutes and government labs.',
              icon: Award,
              actionText: 'View Customer References',
              actionClick: () => openQuoteModal('Customer References - Pratham 5.0'),
            },
            {
              title: 'Installation and Onboarding',
              desc: 'Make3D states that it provides installation, setup and hands-on operational onboarding for engineers, teams and institutions.',
              icon: GraduationCap,
              actionText: 'Request Onboarding Details',
              actionClick: () => openQuoteModal('Installation & Onboarding - Pratham 5.0'),
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
          20. FREQUENTLY ASKED QUESTIONS (16 Official FAQs)
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Customer FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Direct, factual answers sourced from the official Make3D product page and brochure for Pratham 5.0.
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
          21. RELATED PRATHAM MODELS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Made In India FDM Lineup
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Other Models of 3D Printers
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Made-in-India FDM 3D printers designed to scale from rapid prototyping to full-size manufacturing across industries.
            </p>
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
          22. IN-PAGE QUOTE REQUEST FORM
         ==================================================== */}
      <section ref={quoteRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              Official Quotation & Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Get a Quote for Pratham 5.0
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tell us about your application, material needs and production requirements. The Make3D team can help you explore a suitable Pratham 5.0 configuration.
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
                    material: 'ABS / PETG / Engineering Blends',
                    partSize: 'Up to 500 mm',
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
                    placeholder="e.g. Ramesh Patel"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Company / Institution Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Gujarat Engineering Works"
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
                    placeholder="e.g. ramesh@company.com"
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
                    placeholder="e.g. Surat / Ahmedabad"
                    value={quoteForm.city}
                    onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-red-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Gujarat / Tamil Nadu"
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
                    <option value="Tooling & Jigs Manufacturing">Tooling & Jigs Manufacturing</option>
                    <option value="Aerospace Prototypes">Aerospace Prototypes</option>
                    <option value="Structural Engineering Parts">Structural Engineering Parts</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Research and Development">Research and Development</option>
                    <option value="Architecture & Scale Models">Architecture & Scale Models</option>
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
                    <option value="Architecture Models">Architecture Models</option>
                    <option value="Academic Research & STEM Lab">Academic Research & STEM Lab</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">Material of Interest</label>
                  <input
                    type="text"
                    placeholder="e.g. ABS, Flexible TPU, Carbon Fiber, PETG"
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
                    value="Pratham 5.0 (500 × 500 × 500 mm)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Additional Requirements / Project Scope</label>
                <textarea
                  rows={3}
                  placeholder="Describe your part size, material expectations, or workshop requirements..."
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
          23. FINAL CALL TO ACTION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Industrial Scalability
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Build Bigger with Pratham 5.0
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Explore large-format industrial 3D printing with a 500 × 500 × 500 mm build volume, robust construction and support for a range of engineering thermoplastics.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal('Pratham 5.0 Monster Industrial-Grade 3D Printer')}
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
                  setActiveVideoId('88qXbDi_Ckg')
                  setVideoModalOpen(true)
                }}
                className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>View Demo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center">
            <img
              src="/images/products/pratham-5-0.png"
              alt="Pratham 5.0 Monster Industrial 3D Printer"
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
                title="Pratham 5.0 Video Demonstration"
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
    title: 'High-Speed Industrial Printing',
    desc: 'Product page lists speeds up to 120 mm/s optimized for large components and continuous production. Brochure separately lists 40–120 mm/sec.',
    icon: Gauge,
    badge: 'High-Speed Printing',
    source: 'Page & Brochure',
    highlight: 'Up to 120 mm/s',
  },
  {
    title: 'Advanced Connectivity Options',
    desc: 'Product page lists Wi-Fi, USB and SD card connectivity. Brochure lists USB and SD card with Wi-Fi designated as an optional add-on.',
    icon: HardDrive,
    badge: 'Connectivity',
    source: 'Page & Brochure',
    highlight: 'USB / SD / Opt. Wi-Fi',
  },
  {
    title: 'Precision Layer Resolution',
    desc: 'Product page lists adjustable resolution from 80 to 600 microns. Brochure specifies discrete settings of 0.08, 0.1, 0.2, 0.3, and 0.4 mm.',
    icon: Sliders,
    badge: 'Layer Resolution',
    source: 'Page & Brochure',
    highlight: '80–600 µm Range',
  },
  {
    title: 'Optimized 500 mm³ Build Volume',
    desc: 'The large 500 × 500 × 500 mm cubic build volume supports oversized prototypes and functional parts in an enclosed thermal chamber.',
    icon: Box,
    badge: '500 mm³ Volume',
    source: 'Page & Brochure',
    highlight: '125 Liters Volume',
  },
  {
    title: 'Wide File Compatibility',
    desc: 'Official brochure lists STL and GCODE support; product page additionally lists OBJ compatibility for seamless slicing workflows.',
    icon: FileCode,
    badge: 'File Support',
    source: 'Page & Brochure',
    highlight: 'STL, GCODE & OBJ',
  },
  {
    title: '1.75 mm Filament Support',
    desc: 'Supports PLA, ABS, PETG, ASA, Nylon, TPU, and Carbon Fiber blends (page) plus PP, HIPS and carbon-fused composites (brochure).',
    icon: Layers,
    badge: 'Multi-Material',
    source: 'Page & Brochure',
    highlight: '10+ Filament Types',
  },
  {
    title: 'Silicone Heatbed',
    desc: 'Silicone heatbed coupled with aluminum printbed reaching up to 120°C supports first-layer adhesion and minimizes edge warping.',
    icon: Thermometer,
    badge: 'Silicone Heated Bed',
    source: 'Brochure Listed',
    highlight: 'Up to 120°C Bed',
  },
  {
    title: 'Filament Sensor',
    desc: 'Integrated sensor detects filament runout during multi-day printing and pauses execution to safeguard print progress.',
    icon: ShieldCheck,
    badge: 'Filament Sensor',
    source: 'Brochure Listed',
    highlight: 'Runout Detection',
  },
  {
    title: 'Power Failure Protection',
    desc: 'Auto-resume facility stores exact machine coordinates during unexpected power outages to help resume printing.',
    icon: RotateCcw,
    badge: 'Power Protection',
    source: 'Brochure Listed',
    highlight: 'Auto-Resume Facility',
  },
  {
    title: 'Automatic Bed Leveling',
    desc: 'Automated sensor routine simplifies build platform calibration and reduces the need for manual leveling adjustment.',
    icon: Settings,
    badge: 'Auto Bed Leveling',
    source: 'Brochure Listed',
    highlight: 'Sensor Assisted',
  },
  {
    title: 'Fully Enclosed Chamber with Carbon + HEPA Filter',
    desc: 'Closed chamber with carbon and HEPA filtration supports high-temperature material workflows and manages print fumes.',
    icon: Shield,
    badge: 'Enclosed Filtration',
    source: 'Brochure Listed',
    highlight: 'Carbon + HEPA Filter',
  },
  {
    title: 'Emergency G-Code Cutting Facility',
    desc: 'Manufacturer-listed emergency intervention feature on the product page designed to assist with print recovery scenarios.',
    icon: Zap,
    badge: 'Emergency Cutting',
    source: 'Product Page Listed',
    highlight: 'G-Code Intervention',
  },
]

const materialsData = [
  {
    name: 'PLA',
    category: 'Standard Thermoplastic',
    source: 'Page & Brochure',
    description: 'For general prototypes, educational models and visual demonstration parts.',
    bestFor: 'Rapid prototyping, clean surface finish, low shrinkage',
  },
  {
    name: 'ABS',
    category: 'Engineering Thermoplastic',
    source: 'Page & Brochure',
    description: 'For selected functional prototypes and engineering applications requiring heat resistance.',
    bestFor: 'Impact resistance, heat deflection up to 90°C',
  },
  {
    name: 'PETG',
    category: 'Industrial Polymer',
    source: 'Page & Brochure',
    description: 'For general-purpose functional prototypes and suitable engineering components.',
    bestFor: 'Functional prototypes, fluid enclosures, snap-fits',
  },
  {
    name: 'TPU / Flexible',
    category: 'Elastomer',
    source: 'Page & Brochure',
    description: 'For flexible components and selected parts requiring elastic deformation.',
    bestFor: 'Impact absorption, flexural fatigue endurance',
  },
  {
    name: 'ASA',
    category: 'Weather-Resistant',
    source: 'Page & Brochure',
    description: 'For selected engineering applications where the material grade outdoor resistance is useful.',
    bestFor: 'Outdoor longevity, UV exposure, thermal stability',
  },
  {
    name: 'Nylon',
    category: 'Engineering Polymer',
    source: 'Product Page Listed',
    description: 'Listed on the product page for engineering applications requiring high tensile strength and abrasion resistance.',
    bestFor: 'Gears, sliding bushings, mechanical wear components',
  },
  {
    name: 'Carbon Fiber Blends',
    category: 'Composite Material',
    source: 'Product Page Listed',
    description: 'Carbon fiber filled polymers offering high rigidity, low thermal expansion, and dimensional stability.',
    bestFor: 'Drones, tooling fixtures, high-modulus brackets',
  },
  {
    name: 'PP (Polypropylene)',
    category: 'Chemical Resistant',
    source: 'Brochure Listed',
    description: 'Listed in the brochure as a compatible material for chemical tanks and living hinges.',
    bestFor: 'Chemical resistance, living hinges, fluid bottles',
  },
  {
    name: 'HIPS',
    category: 'Support & Prototype',
    source: 'Brochure Listed',
    description: 'High impact polystyrene; used as a primary structural material or dissolvable support.',
    bestFor: 'Pre-production verification models, packaging mockups',
  },
  {
    name: 'Carbon-Fused Composites',
    category: 'Advanced Composite',
    source: 'Brochure Listed',
    description: 'Brochure-listed composite formulation engineered for high stiffness and reduced part weight.',
    bestFor: 'Lightweight structural brackets, industrial tooling',
  },
]

const galleryImages = [
  {
    src: '/images/products/pratham-5-0.png',
    title: 'Pratham 5.0 Full Front Perspective',
    desc: 'Heavy-duty enclosed all-metal MS body with tempered glass dual doors and touch operator interface.',
  },
  {
    src: '/images/desktop-work/end-use-components-hd.jpg',
    title: 'Large Impeller & Functional Parts',
    desc: 'Precision 3D printed mechanical turbine impeller and industrial production components.',
  },
  {
    src: '/images/gtmax/gtmax-mechanical-parts.jpg',
    title: 'Production Tooling & Mechanical Parts',
    desc: 'Industrial nylon and PETG end-use components showing clean interlayer bonding.',
  },
  {
    src: '/images/desktop-work/functional-prototypes-hd.jpg',
    title: 'Build Chamber & Extrusion Workflow',
    desc: 'Spacious illuminated 500 mm cubic build chamber with silicone heatbed and THK motion guides.',
  },
  {
    src: '/images/desktop-work/custom-complex-designs-hd.jpg',
    title: 'Architecture & Generative Models',
    desc: 'Intricate architectural scale models and generative biomimetic lattice geometries.',
  },
  {
    src: '/images/pratham3-work/05-flexible-tpu-components.jpg',
    title: 'Flexible TPU Printed Objects',
    desc: 'Durable elastomeric components demonstrating flexural recovery and tear resistance.',
  },
]

const workItems = [
  {
    category: 'MECHANICAL PROTOTYPES',
    title: 'Large Mechanical Components',
    desc: 'Brackets, housings and structural prototypes printed within the 500 mm envelope.',
    image: '/images/pratham5-work/01-mechanical-components-uhd.jpg',
    icon: Wrench,
    iconBg: 'bg-[#2563eb]',
    linkColor: 'text-[#2563eb]',
    bgTint: 'bg-blue-50/50',
  },
  {
    category: 'PRODUCT PROTOTYPES',
    title: 'Full-Size Product Enclosures',
    desc: 'Full-size consumer and industrial product housings, enclosures, and design-validation parts.',
    image: '/images/pratham5-work/02-product-enclosures-uhd.jpg',
    icon: Box,
    iconBg: 'bg-[#dc2626]',
    linkColor: 'text-[#dc2626]',
    bgTint: 'bg-rose-50/50',
  },
  {
    category: 'INDUSTRIAL TOOLING',
    title: 'Shopfloor Jigs & Fixtures',
    desc: 'Jigs, manufacturing assembly fixtures, drill guides, positioning templates and custom aids.',
    image: '/images/pratham5-work/03-jigs-fixtures-uhd.jpg',
    icon: Factory,
    iconBg: 'bg-[#0d9488]',
    linkColor: 'text-[#0d9488]',
    bgTint: 'bg-teal-50/50',
  },
  {
    category: 'AUTOMOTIVE COMPONENTS',
    title: 'Automotive Ducting & Housings',
    desc: 'Air ducts, bumper brackets, intake manifold mockups, and interior trim validation prototypes.',
    image: '/images/pratham5-work/04-automotive-ducting-uhd.jpg',
    icon: Compass,
    iconBg: 'bg-[#7c3aed]',
    linkColor: 'text-[#7c3aed]',
    bgTint: 'bg-purple-50/50',
  },
  {
    category: 'ENGINEERING MODELS',
    title: 'Industrial Turbine Impellers',
    desc: 'Large-scale engineering demonstrations, planetary gearboxes, pump casings, and impellers.',
    image: '/images/pratham5-work/05-turbine-impellers-uhd.jpg',
    icon: Cpu,
    iconBg: 'bg-[#d97706]',
    linkColor: 'text-[#d97706]',
    bgTint: 'bg-amber-50/50',
  },
  {
    category: 'EDUCATIONAL MODELS',
    title: 'STEM & Cross-Section Assemblies',
    desc: 'Detailed engineering and STEM demonstration models, cross-section engines, and anatomical replicas.',
    image: '/images/pratham5-work/06-stem-assemblies-uhd.jpg',
    icon: GraduationCap,
    iconBg: 'bg-[#2563eb]',
    linkColor: 'text-[#2563eb]',
    bgTint: 'bg-sky-50/50',
  },
]

const faqs = [
  {
    q: 'Is Pratham 5.0 suitable for industrial use?',
    a: 'Yes. The manufacturer describes it as designed for industrial prototyping and low-volume production.',
  },
  {
    q: 'What materials does it support?',
    a: 'The product page lists PLA, ABS, PETG, ASA, Nylon, TPU and Carbon Fiber blends. The brochure also lists PP, HIPS and carbon-fused composites. Confirm exact compatibility and validated profiles with Make3D.',
  },
  {
    q: 'What is the maximum part size it can print?',
    a: 'The listed build volume is 500 × 500 × 500 mm. Actual printable size depends on part geometry, clearances, supports and machine configuration.',
  },
  {
    q: 'Does Make3D provide service support?',
    a: 'The official page states that technical and after-sales support is available across India, including remote and onsite support.',
  },
  {
    q: 'Is Pratham 5.0 made in India?',
    a: 'Make3D describes Pratham 5.0 as designed and developed in India.',
  },
  {
    q: 'Does Make3D provide installation and onboarding?',
    a: 'Yes. Make3D states that it provides installation, setup and hands-on onboarding for engineers, teams and institutions.',
  },
  {
    q: 'What is the printing technology?',
    a: 'Pratham 5.0 uses Fused Filament Fabrication, commonly called FDM 3D printing.',
  },
  {
    q: 'What is the print speed?',
    a: 'The product page lists up to 120 mm/s, while the brochure lists 40–120 mm/sec. Confirm the applicable speed for the current configuration.',
  },
  {
    q: 'What is the layer resolution?',
    a: 'The product page lists 80–600 microns, while the brochure lists 0.08, 0.1, 0.2, 0.3 and 0.4 mm. Confirm the current supported settings with Make3D.',
  },
  {
    q: 'Does it support Wi-Fi?',
    a: 'The product page lists Wi-Fi. The brochure describes Wi-Fi as an optional add-on. Confirm whether it is included in the selected configuration.',
  },
  {
    q: 'Which file formats are supported?',
    a: 'The product page lists STL, OBJ and GCODE. The brochure lists STL and GCODE. Confirm the current software workflow with Make3D.',
  },
  {
    q: 'What is the extruder temperature?',
    a: 'The brochure lists 280°C for a single extruder.',
  },
  {
    q: 'What is the heated bed temperature?',
    a: 'The brochure lists a printbed temperature of up to 120°C.',
  },
  {
    q: "What is the printer's weight?",
    a: 'The brochure lists an 80 kg printer weight and a 100 kg shipping weight with accessories kit.',
  },
  {
    q: 'What are the printer dimensions?',
    a: 'The brochure lists 980 × 820 × 990 mm (L × W × H).',
  },
  {
    q: 'What are the power requirements?',
    a: 'The brochure lists 230 V, 50 Hz and 750 W. Confirm the installation requirements with Make3D.',
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
    tag: 'Monster Industrial',
    img: '/images/products/pratham-5-0.png',
    active: true,
  },
  {
    name: 'Pratham 6.0',
    vol: '600 × 600 × 600 mm',
    tag: 'Large-Scale FDM',
    link: '/products/pratham-6',
    img: '/images/products/pratham-6-0.png',
  },
  {
    name: 'Pratham X',
    vol: '1000 × 1000 × 1000 mm',
    tag: '1 m³ Extra Large',
    link: '/products/pratham-x',
    img: '/images/products/pratham-x.png',
  },
]

export default Pratham5Page
