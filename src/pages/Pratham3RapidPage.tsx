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
  ExternalLink,
  X,
  HardDrive,
  Sliders,
  GraduationCap,
  FileCode,
  Thermometer,
  CheckCircle2,
  RefreshCw,
  Filter,
  Radio,
  Mail,
  MapPin,
  Car,
  Plane,
  Cog,
  Smartphone,
  Microscope,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham3RapidPage: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()

  // Navigation & Interactive Tabs
  const [activeNav, setActiveNav] = useState<string>('overview')
  const [activeSpecTab, setActiveSpecTab] = useState<'printing' | 'software' | 'mechanical' | 'electrical' | 'features'>('printing')
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)
  const [activeVideoId, setActiveVideoId] = useState<string>('KDaMpRsHvyU')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA')

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
    material: 'PLA / High-Speed Engineering Filament',
    partSize: 'Up to 350 mm',
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
  const performanceRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const applicationsRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const thermalRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const reliabilityRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const nationalRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, navId: string) => {
    setActiveNav(navId)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Official URLs
  const officialBrochureUrl = '/brochures/pratham-3-rapid.pdf'
  const officialProductUrl = 'https://make3d.in/pratham-3-rapid-3d-printer/'

  // SEO & Structured Data
  useEffect(() => {
    document.title = 'Pratham 3 Rapid High-Speed Industrial 3D Printer | Make3D'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore Make3D Pratham 3 Rapid, a high-speed industrial FDM 3D printer with a 350 × 350 × 350 mm build volume, up to 500 mm/sec listed print speed and engineering material support.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 3 Rapid High-Speed Industrial FDM 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-3-rapid.png',
      description:
        'Pratham 3 Rapid is a next-generation high-speed industrial FDM 3D printer engineered by Make3D with 350 × 350 × 350 mm build volume, up to 500 mm/sec listed print speed, 30 mm³/s high-flow hotend and 300°C nozzle.',
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
        url: 'https://lenivacadsolution.com/products/pratham-3-rapid',
      },
    }

    const breadcrumbsSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lenivacadsolution.com/' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://lenivacadsolution.com/products' },
        { '@type': 'ListItem', position: 3, name: 'FDM 3D Printers', item: 'https://lenivacadsolution.com/products/fdm-3d-printers' },
        { '@type': 'ListItem', position: 4, name: 'Pratham 3 Rapid', item: 'https://lenivacadsolution.com/products/pratham-3-rapid' },
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
        productOrService: 'Pratham 3 Rapid High-Speed Industrial FDM 3D Printer',
        quantity: '1 Unit',
        application: quoteForm.application,
        message: `City: ${quoteForm.city}, State: ${quoteForm.state} | Industry: ${quoteForm.industry} | Material: ${quoteForm.material} | Expected Size: ${quoteForm.partSize} | Frequency: ${quoteForm.frequency} | Contact: ${quoteForm.contactMethod} | Additional Requirements: ${quoteForm.message}`,
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
            <span className="text-slate-900 font-bold">Pratham 3 Rapid (350 × 350 × 350 mm | 500 mm/s)</span>
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
              <span>Pratham 3 Rapid</span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                500 mm/s High-Speed
              </span>
            </span>
            <span className="text-xs text-slate-400 hidden md:inline font-mono">| Make3D Rapid Manufacturing</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'features', label: 'Key Features', ref: featuresRef },
              { id: 'performance', label: 'Performance', ref: performanceRef },
              { id: 'comparison', label: 'Speed Comparison', ref: comparisonRef },
              { id: 'applications', label: 'Applications', ref: applicationsRef },
              { id: 'showcase', label: 'Showcase', ref: showcaseRef },
              { id: 'materials', label: 'Materials', ref: materialsRef },
              { id: 'specs', label: 'Specifications', ref: specsRef },
              { id: 'motion', label: 'Motion & Mechanics', ref: motionRef },
              { id: 'gallery', label: 'Gallery', ref: galleryRef },
              { id: 'videos', label: 'Videos', ref: videosRef },
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
              onClick={() => openQuoteModal('Pratham 3 Rapid High-Speed Industrial 3D Printer')}
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
                <span>MAKE3D | HIGH-SPEED INDUSTRIAL FDM 3D PRINTER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Pratham 3 Rapid
              </h1>
              <p className="text-lg sm:text-2xl font-black text-red-600 tracking-tight">
                Rule the Sky of High-Speed 3D Printing
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider font-mono">
                New Age FDM 3D Printer with Advanced Technology
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Pratham 3 Rapid is a next-generation, high-speed industrial FDM 3D printer engineered for professionals
              who demand accuracy, reliability and production efficiency. Designed and manufactured in India, it combines
              high-speed printing, a high-flow extrusion system and a robust mechanical architecture for functional
              prototypes, end-use parts, batch production components and industrial tooling.
            </p>

            {/* Official Supporting Tagline Banner */}
            <div className="p-4 rounded-xl bg-slate-900 text-white border-l-4 border-red-500 shadow-sm space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                Production-Ready High-Speed Additive Manufacturing
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                India’s High-Speed Industrial FDM 3D Printer for Production Manufacturing. Engineered for fast layer deposition,
                repeatable dimensional accuracy (0.1–0.2 mm), and heavy continuous industrial workloads.
              </p>
            </div>

            {/* 6 Hero Specification Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {[
                { label: 'Build Envelope', value: '350 × 350 × 350 mm', icon: Box },
                { label: 'Max Print Speed', value: 'Up to 500 mm/sec', icon: Zap },
                { label: 'High-Temp Nozzle', value: '300°C Brochure-Listed', icon: Flame },
                { label: 'High-Flow Hotend', value: '30 mm³/s Flow Rate', icon: Activity },
                { label: 'Motion System', value: 'THK XY Linear Guides', icon: Compass },
                { label: 'Origin & Support', value: 'Made in India', icon: Factory },
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
                onClick={() => openQuoteModal('Pratham 3 Rapid High-Speed Industrial 3D Printer')}
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
                onClick={() => {
                  setActiveVideoId('KDaMpRsHvyU')
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
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Rapid 500 mm/s</span>
              </div>

              {/* Main Machine Image */}
              <div className="relative z-0 flex items-center justify-center py-4">
                <img
                  src="/images/products/pratham-3-rapid.png"
                  alt="Make3D Pratham 3 Rapid High-Speed Industrial FDM 3D Printer"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Verified Technical Callouts around Product */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-700">
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>High-speed motion system</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>350 mm cubic build volume</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>30 mm³/s high-flow hotend</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200 shadow-2xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0"></div>
                  <span>Enclosed body + 5" IPS touch</span>
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
                Quick Technical Parameters
              </span>
              <h2 className="text-base font-extrabold text-slate-900">Verified Technical Parameters at a Glance</h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Source:{' '}
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
                val: '350×350×350 mm',
                sub: '350 mm Cubic Area',
                src: 'Page & Brochure',
              },
              {
                label: 'Print Speed',
                val: 'Up to 500 mm/s',
                sub: 'Maximum Listed Speed',
                src: 'Page & Brochure',
              },
              {
                label: 'Technology',
                val: 'High-Speed FDM',
                sub: 'FFF Technology',
                src: 'Page & Brochure',
              },
              {
                label: 'Layer Resolution',
                val: '0.08 – 0.4 mm',
                sub: '0.08/0.1/0.2/0.3/0.4',
                src: 'Brochure Listed',
              },
              {
                label: 'Dimensional Tol.',
                val: '0.1 – 0.2 mm',
                sub: 'Machined Accuracy',
                src: 'Brochure Listed',
              },
              {
                label: 'Nozzle Temp',
                val: '300°C',
                sub: 'High-Temp Ready',
                src: 'Brochure Listed',
              },
              {
                label: 'Printbed Temp',
                val: '120°C',
                sub: 'Magnetic PEI Sheet',
                src: 'Brochure Listed',
              },
              {
                label: 'Filament Dia.',
                val: '1.75 mm',
                sub: 'Standard Diameter',
                src: 'Page & Brochure',
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
            <strong>Specification Notice:</strong> 500 mm/sec is the manufacturer's maximum listed speed. Actual achievable speed depends on the material, nozzle, geometry, layer height, extrusion flow, cooling and print settings. Dimensional tolerance (0.1–0.2 mm) and X-Y/Z precision (11 µm / 10 µm) are distinct engineering parameters.
          </p>
        </div>
      </section>

      {/* ====================================================
          5. PRODUCT OVERVIEW
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Manufacturing Overview
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            India’s High-Speed Industrial FDM 3D Printer for Production Manufacturing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 3 Rapid is a high-speed industrial FDM 3D printer engineered for professionals who need accuracy,
            reliability and improved production efficiency. Designed and manufactured in India, it combines high-speed
            printing capability with an advanced motion system, high-flow extrusion and a robust structural design.
            It is intended for workflows ranging from functional prototyping and end-use parts to batch production
            components and industrial tooling.
          </p>
        </div>

        {/* 6 Supporting Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'High-Speed Printing', icon: Zap, sub: 'Speeds up to 500 mm/s' },
            { title: 'Large Build Volume', icon: Box, sub: '350 × 350 × 350 mm envelope' },
            { title: 'Industrial Precision', icon: Compass, sub: '0.1–0.2 mm tolerance' },
            { title: 'Engineering Materials', icon: Layers, sub: 'ABS, ASA, Nylon, Composites' },
            { title: 'Robust Mechanics', icon: Factory, sub: 'THK rails & leadscrew' },
            { title: 'Production Operation', icon: RefreshCw, sub: 'Batch production focus' },
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
          6. HIGH-SPEED PERFORMANCE FOR RAPID MANUFACTURING
         ==================================================== */}
      <section ref={performanceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-red-400 text-xs font-mono font-bold uppercase">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                <span>Rapid Manufacturing Advantage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                High-Speed Performance for Rapid Manufacturing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The core advantage of Pratham 3 Rapid is its rapid print capability, built around a high-torque extruder,
                powerful motion system and optimized print-path algorithms. These systems are designed to support faster
                layer deposition and reduced printing time for large components while maintaining print quality.
              </p>

              {/* 6 Performance Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {[
                  { title: 'Faster Layer Deposition', desc: 'High-torque feeding with 30 mm³/s high-flow hotend' },
                  { title: 'Reduced Print Time for Large Parts', desc: 'Accelerates turnaround on 350 mm cubic components' },
                  { title: 'Smooth Surface Finish', desc: 'Consistent extrusion pressure and balanced motion' },
                  { title: 'Vibration-Conscious Mechanical Design', desc: 'Rigid CNC-machined structure minimizes resonance' },
                  { title: 'High-Strength Engineering Components', desc: 'Optimized thermal bonding across consecutive layers' },
                  { title: 'Production-Focused Workflow', desc: 'Engineered for continuous industrial manufacturing duty' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Visual Representation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4 text-center">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Printhead Velocity Benchmark
                </div>
                <div className="text-4xl sm:text-5xl font-black text-red-500 font-mono">
                  500 mm/s
                </div>
                <p className="text-xs text-slate-300">
                  Maximum listed speed capability powered by THK linear motion guides and high-torque direct extrusion.
                </p>
                <div className="pt-2 border-t border-slate-700/80 text-[11px] text-slate-400 text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span>Melt Zone Flow:</span>
                    <strong className="text-white font-mono">30 mm³/s</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Hotend Rating:</span>
                    <strong className="text-white font-mono">300°C High-Temp</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Bed Temperature:</span>
                    <strong className="text-white font-mono">120°C Magnetic PEI</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Filtration:</span>
                    <strong className="text-white font-mono">HEPA + Carbon Enclosed</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. KEY FEATURES (16 Features Image-Led Grid)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Engineering Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Key Features of Pratham 3 Rapid
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Engineered for speed, strength and precision, Pratham 3 Rapid is designed to handle demanding industrial manufacturing workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 1,
              title: 'High-Speed Printing',
              sub: 'Up to 500 mm/sec',
              desc: 'Achieve high-speed printing with optimized motion control and a high-torque extrusion system. The design is intended to help reduce print times for suitable models and production workflows.',
              icon: Zap,
              tag: 'Velocity',
            },
            {
              id: 2,
              title: 'Large Build Volume',
              sub: '350 × 350 × 350 mm',
              desc: 'The large cubic build volume allows engineers to produce bigger functional prototypes, tooling and production parts without necessarily dividing them into multiple sections.',
              icon: Box,
              tag: 'Capacity',
            },
            {
              id: 3,
              title: 'Industrial-Grade Precision',
              sub: '0.1–0.2 mm Tolerance',
              desc: 'The product page highlights consistent dimensional accuracy, micron-level layer resolution and stable mechanical architecture. The brochure lists a dimensional tolerance of 0.1–0.2 mm with 11-micron X-Y and 10-micron Z precision.',
              icon: Compass,
              tag: 'Accuracy',
            },
            {
              id: 4,
              title: 'High-Temperature Filament Support',
              sub: '300°C Hotend Capability',
              desc: 'The brochure lists a 300°C high-temperature nozzle. The manufacturer lists compatibility with ABS, ASA, Nylon and composites, along with other filament types.',
              icon: Flame,
              tag: 'Polymers',
            },
            {
              id: 5,
              title: 'Reinforced Structural Frame',
              sub: 'Rigid Industrial Construction',
              desc: 'The product page describes a rigid, CNC-machined body intended to minimize vibration and support stability during long-duration printing. Features THK linear guides on XY and industrial leadscrew on Z.',
              icon: Factory,
              tag: 'Chassis',
            },
            {
              id: 6,
              title: 'Smart Cooling & Thermal Control',
              sub: 'Optimized Cooling Paths',
              desc: 'The manufacturer describes optimized cooling paths and controlled chamber temperature to support print strength and help prevent warping in technical materials.',
              icon: Thermometer,
              tag: 'Thermal',
            },
            {
              id: 7,
              title: 'Intelligent Touchscreen Interface',
              sub: '5-inch IPS Touch Display',
              desc: 'The brochure specifies a 5-inch IPS touchscreen. The interface is intended to support file management, monitoring and printer operation directly from the machine console.',
              icon: Monitor,
              tag: 'HMI',
            },
            {
              id: 8,
              title: 'Automatic Bed-Leveling Calibration',
              sub: 'Advanced Automatic Bed Leveling',
              desc: 'Automatic bed leveling helps simplify calibration and supports first-layer preparation across the heated build plate.',
              icon: RefreshCw,
              tag: 'Calibration',
            },
            {
              id: 9,
              title: 'High-Flow Hotend',
              sub: '30 mm³/s Flow Rate',
              desc: 'The brochure lists a high-flow hotend rated at 30 mm³/s. Present this as the brochure\'s listed flow-rate specification, supporting rapid material throughput.',
              icon: Activity,
              tag: 'Extrusion',
            },
            {
              id: 10,
              title: 'Magnetic PEI Build Plate',
              sub: 'Removable Build Surface',
              desc: 'The brochure lists a magnetic PEI sheet. Explain its role as a removable build surface intended to make part removal and routine print handling easier.',
              icon: Layers,
              tag: 'Platform',
            },
            {
              id: 11,
              title: 'Enclosed Filament Chamber',
              sub: 'Filament Storage and Handling',
              desc: 'The brochure lists an enclosed filament chamber. Provides dedicated internal spool housing and orderly material management during continuous operations.',
              icon: Box,
              tag: 'Chamber',
            },
            {
              id: 12,
              title: 'Filament Runout and Jam Sensor',
              sub: 'Intelligent Filament Monitoring',
              desc: 'The brochure lists filament runout and jam sensing. Explain that these features are intended to detect filament-feed issues and help users respond to interruptions.',
              icon: ShieldCheck,
              tag: 'Protection',
            },
            {
              id: 13,
              title: '300°C High-Temperature Nozzle',
              sub: 'Engineering Material Capability',
              desc: 'The brochure lists a maximum nozzle temperature of 300°C, enabling suitable high-temperature filament workflows including technical blends.',
              icon: Flame,
              tag: 'Toolhead',
            },
            {
              id: 14,
              title: 'Versatile Connectivity',
              sub: 'USB, Wi-Fi and Ethernet',
              desc: 'The product page and brochure list USB, Wi-Fi and Ethernet connectivity options for file transfer and local workshop integration.',
              icon: Radio,
              tag: 'Network',
            },
            {
              id: 15,
              title: 'HEPA + Carbon Filter',
              sub: 'Enclosed Printing with Filtration',
              desc: 'The brochure lists HEPA + carbon filtration and an enclosed industrial body, intended to help manage airborne particles and odors during printing.',
              icon: Filter,
              tag: 'Environment',
            },
            {
              id: 16,
              title: 'Made in India',
              sub: 'Local Manufacturing & Support',
              desc: 'Make3D describes the printer as designed, manufactured and supported locally in India, with prompt local service and spare-parts availability.',
              icon: Award,
              tag: 'Origin',
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
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{f.title}</h3>
                    <div className="text-xs font-bold text-red-600 font-mono mt-0.5">{f.sub}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          8. HIGH-SPEED VS NORMAL-SPEED PRINTING COMPARISON
         ==================================================== */}
      <section ref={comparisonRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Efficiency Comparison
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            High-Speed vs Normal-Speed Printing Comparison
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            See the manufacturer’s example comparison of normal-speed printing with Pratham 3 Rapid.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                  <th className="py-3.5 px-4 font-extrabold text-slate-900">Printing Mode</th>
                  <th className="py-3.5 px-4 font-extrabold text-slate-900">Print Time</th>
                  <th className="py-3.5 px-4 font-extrabold text-slate-900">Speed</th>
                  <th className="py-3.5 px-4 font-extrabold text-slate-900">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <span>Normal-Speed Printer</span>
                  </td>
                  <td className="py-4 px-4 font-mono font-semibold text-slate-600">8–10 hours</td>
                  <td className="py-4 px-4 font-mono text-slate-600">80–120 mm/s</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold font-mono">
                      Reference Baseline
                    </span>
                  </td>
                </tr>
                <tr className="bg-red-50/50 hover:bg-red-50 transition-colors">
                  <td className="py-4 px-4 font-black text-slate-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span>Pratham 3 Rapid</span>
                  </td>
                  <td className="py-4 px-4 font-mono font-black text-red-600 text-base">1.5–2 hours</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-950">Up to 500 mm/s</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-xs font-bold font-mono shadow-xs">
                      Up to 5× faster
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual Bar Comparison */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Normal-Speed Printer (8–10 hours)</span>
                <span className="font-mono">100% time</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full w-full"></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-red-600">
                <span>Pratham 3 Rapid (1.5–2 hours)</span>
                <span className="font-mono">~20% time (Up to 5× faster)</span>
              </div>
              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full rounded-full w-[20%] transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          {/* Qualification Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 leading-relaxed">
            <p className="font-mono text-[11px] text-slate-500">
              “Comparison values are presented as stated on the manufacturer's product page. Actual print times and
              productivity depend on model geometry, material, layer height, infill, support structures, slicing
              settings and operating conditions.”
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. DEMANDING INDUSTRIAL APPLICATIONS (6 Cards)
         ==================================================== */}
      <section ref={applicationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Industrial Applications
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Designed for Demanding Industrial Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 3 Rapid is positioned for industries that require fast prototyping, large functional parts, industrial tooling and production-oriented 3D printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Automotive',
              desc: 'Support functional prototypes, sensor housings, brackets, tooling and selected production components with rapid engineering iteration.',
              icon: Car,
              items: ['Automotive sensor housings', 'Mechanical brackets', 'Functional enclosures', 'Custom assembly fixtures'],
            },
            {
              title: 'Aerospace',
              desc: 'Support suitable engineering prototypes, tooling and design-validation parts under rigorous engineering laboratory workflows.',
              icon: Plane,
              items: ['Aerodynamic prototypes', 'Equipment housings', 'Engineering mockups', 'Tooling test fixtures'],
            },
            {
              title: 'Consumer Engineering',
              desc: 'Create product-design prototypes, housings, ergonomic models and functional components with clean layer resolution.',
              icon: Smartphone,
              items: ['Consumer product enclosures', 'Product prototypes', 'Ergonomic test models', 'Functional snap-fit clips'],
            },
            {
              title: 'Industrial R&D',
              desc: 'Support research teams working on functional prototypes, design iterations, component validation and engineering development.',
              icon: Microscope,
              items: ['Engineering lab models', 'Mechanical test components', 'Research prototypes', 'Material test specimens'],
            },
            {
              title: 'Machine Part Manufacturing',
              desc: 'Produce selected brackets, covers, jigs, fixtures, replacement prototypes and custom mechanical components on demand.',
              icon: Cog,
              items: ['Machine housings', 'Tooling parts', 'Functional brackets', 'Replacement mechanical prototypes'],
            },
            {
              title: 'Production Manufacturing',
              desc: 'Support suitable small-batch production, customized parts and production aids without investing in expensive molding tools.',
              icon: Factory,
              items: ['Batch components', 'Production fixtures', 'Repeated engineering parts', 'Assembly line jigs'],
            },
          ].map((app, idx) => {
            const Icon = app.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all p-6 space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900">{app.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{app.desc}</p>
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Typical Outputs
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {app.items.map((item, i) => (
                      <span key={i} className="text-[11px] text-slate-700 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3 text-red-600 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          10. WHAT CAN YOU CREATE WITH PRATHAM 3 RAPID? (12 Parts Showcase)
         ==================================================== */}
      <section ref={showcaseRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Output Gallery
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            From Design to High-Speed Production
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Visual showcase of functional engineering outputs, tooling components and production-ready parts produced via Pratham 3 Rapid.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Functional Prototypes',
              cat: 'Engineering Validation',
              mat: 'PLA / PETG',
              desc: 'Full-scale functional prototypes printed quickly for mechanical validation and form-fit assembly.',
              img: '/images/pratham3-work/01-real-functional-parts.jpg',
            },
            {
              name: 'Large Engineering Components',
              cat: 'Industrial Machinery',
              mat: 'ABS / ASA',
              desc: 'Monolithic single-build components utilizing the full 350 mm cubic envelope.',
              img: '/images/pratham3-work/03-complex-engineering-parts.jpg',
            },
            {
              name: 'Industrial Tooling',
              cat: 'Manufacturing Aids',
              mat: 'Carbon Fiber Composite',
              desc: 'High-rigidity tooling inserts and forming dies with stable dimensional accuracy.',
              img: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg',
            },
            {
              name: 'Jigs and Fixtures',
              cat: 'Production Line',
              mat: 'PETG / ABS',
              desc: 'Custom assembly jigs and quality-control fixtures delivered in hours instead of days.',
              img: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg',
            },
            {
              name: 'Automotive Housings',
              cat: 'Automotive R&D',
              mat: 'ABS / ASA',
              desc: 'Under-the-hood sensor enclosures and dashboard mounting brackets.',
              img: '/images/pratham3-work/02-automotive-scale-mockups.jpg',
            },
            {
              name: 'Machine Parts',
              cat: 'Mechanical Systems',
              mat: 'Nylon / PETG',
              desc: 'Replacement machinery parts, covers, and gear housing brackets for industrial workshops.',
              img: '/images/pratham3-work/06-functional-end-use-parts.jpg',
            },
            {
              name: 'Product-Development Models',
              cat: 'Consumer Goods',
              mat: 'PLA / Tough PLA',
              desc: 'Rapid iteration models compressed from 10 hours down to less than 2 hours.',
              img: '/images/pratham3-work/04-product-prototypes.jpg',
            },
            {
              name: 'Production Components',
              cat: 'Batch Manufacturing',
              mat: 'ABS / PETG',
              desc: 'Repeated batches of end-use parts without tooling amortization delays.',
              img: '/images/pratham3-work/06-functional-end-use-parts.jpg',
            },
            {
              name: 'Engineering Test Models',
              cat: 'R&D Laboratories',
              mat: 'PLA / Composite',
              desc: 'Wind tunnel mockups and fluid duct testing geometries with smooth surface resolution.',
              img: '/images/pratham3-work/03-complex-engineering-parts.jpg',
            },
            {
              name: 'Electronic Enclosures',
              cat: 'Electronics & IOT',
              mat: 'ABS / PETG',
              desc: 'Snap-fit controller enclosures with heat-set insert bosses and precise connector cutouts.',
              img: '/images/pratham3-work/01-real-functional-parts.jpg',
            },
            {
              name: 'Flexible TPU Parts',
              cat: 'Elastomers',
              mat: 'Flexible TPU',
              desc: 'Vibration dampers, protective gaskets, and flexible bumper components.',
              img: '/images/pratham3-work/05-flexible-tpu-components.jpg',
            },
            {
              name: 'Custom-Designed Components',
              cat: 'Specialty Applications',
              mat: 'Multi-Material',
              desc: 'Bespoke brackets and tailored end-effectors for industrial automation.',
              img: '/images/pratham3-work/08-impact-guards-robot-bumpers.jpg',
            },
          ].map((part, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col hover:border-slate-300 transition-all group"
            >
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={part.img}
                  alt={part.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded font-medium">
                  {part.cat}
                </span>
                <span className="absolute bottom-2 right-2 bg-red-600/90 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {part.mat}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">{part.name}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{part.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          11. MULTI-MATERIAL COMPATIBILITY
         ==================================================== */}
      <section ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Filament Versatility
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Multi-Material Compatibility for Engineering Applications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham 3 Rapid supports a range of filament types listed by the manufacturer. Material suitability depends
            on filament grade, machine configuration, nozzle, print profile and operating conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'PLA',
              badge: 'General Prototyping',
              desc: 'Suitable for general-purpose prototypes, concept models and educational parts. Melts smoothly with low shrinkage.',
              bed: '45–60°C',
              nozzle: '190–220°C',
            },
            {
              name: 'ABS',
              badge: 'Engineering Grade',
              desc: 'For selected engineering prototypes and functional components requiring higher thermal and impact performance.',
              bed: '90–110°C',
              nozzle: '230–260°C',
            },
            {
              name: 'Flexible TPU',
              badge: 'Elastomeric Parts',
              desc: 'For suitable flexible parts, protective elements and components that need elastic behavior and impact absorption.',
              bed: '40–60°C',
              nozzle: '210–235°C',
            },
            {
              name: 'PETG',
              badge: 'Functional Utility',
              desc: 'For general-purpose functional prototypes and selected engineering parts with strong layer bonding and chemical resilience.',
              bed: '70–85°C',
              nozzle: '220–245°C',
            },
            {
              name: 'Carbon Fiber Composite',
              badge: 'Structural Rigidity',
              desc: 'Listed in product page and brochure. Confirm exact composite filament formulation, nozzle compatibility and validated settings with Make3D.',
              bed: '60–80°C',
              nozzle: '230–270°C',
            },
            {
              name: 'ASA',
              badge: 'UV & Outdoor Resistance',
              desc: 'For selected engineering applications where the material grade’s outdoor weathering and UV stability are relevant.',
              bed: '90–110°C',
              nozzle: '240–260°C',
            },
            {
              name: 'HIPS',
              badge: 'Soluble / Rigid Prototype',
              desc: 'Listed in the brochure as a compatible filament type. Confirm validated profiles and intended workflows with Make3D.',
              bed: '80–100°C',
              nozzle: '220–250°C',
            },
            {
              name: 'Nylon',
              badge: 'Wear & Fatigue Resistant',
              desc: 'Listed on the product page as an engineering material. Confirm exact nylon grades and supported configurations.',
              bed: '70–90°C',
              nozzle: '240–280°C',
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
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                    {mat.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mat.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Bed: {mat.bed}</span>
                <span>Nozzle: {mat.nozzle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <strong>Material Consultation Notice:</strong> Material compatibility depends on configuration, nozzle material, and validated slicer profiles.
          </div>
          <button
            onClick={() => openQuoteModal('Material Compatibility Enquiry — Pratham 3 Rapid')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shrink-0 transition-colors cursor-pointer"
          >
            Ask About Material Compatibility
          </button>
        </div>
      </section>

      {/* ====================================================
          12. COMPLETE TECHNICAL SPECIFICATIONS (5 Tables)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Technical Data
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham 3 Rapid Technical Specifications
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Authentic, verified parameters compiled directly from the official Make3D product page and brochure.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'printing', label: 'A. Printing Specifications' },
            { id: 'software', label: 'B. Software & Connectivity' },
            { id: 'mechanical', label: 'C. Mechanical Specifications' },
            { id: 'electrical', label: 'D. Electrical Specifications' },
            { id: 'features', label: 'E. Brochure Feature Specifications' },
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
                A. Printing Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Print Technology', v: 'High-Speed Fused Filament Fabrication (FFF / FDM)' },
                  { k: 'Build Volume', v: '350 × 350 × 350 mm' },
                  { k: 'Layer Resolution', v: '0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm' },
                  { k: 'Dimensional Tolerance', v: '0.1–0.2 mm' },
                  { k: 'Print Speed', v: 'Up to 500 mm/sec (maximum listed speed)' },
                  { k: 'Extruder Temperature', v: 'Up to 300°C' },
                  { k: 'Printbed Temperature', v: 'Up to 120°C' },
                  { k: 'Nozzle Size', v: '0.4 mm standard' },
                  { k: 'Changeable Nozzle Sizes', v: '0.3 / 0.5 / 0.6 / 0.8 mm' },
                  { k: 'Heated Build Platform', v: 'Yes, magnetic PEI sheet' },
                  { k: 'Filament Diameter', v: '1.75 mm' },
                  { k: 'Filament Compatibility', v: 'ABS / PLA / Flexible TPU / PETG / Carbon Fiber Composite / ASA / HIPS' },
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
                B. Software and Connectivity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Software Bundle', v: 'Orca / Simplify3D license (optional)' },
                  { k: 'Operating System Compatibility', v: 'Windows / Mac' },
                  { k: 'Supported File Formats', v: 'STL / G-code' },
                  { k: 'Connectivity Interfaces', v: 'USB / Wi-Fi / Ethernet' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Note: Simplify3D is listed as optional in the brochure. Confirm supplied configuration with Make3D.
              </p>
            </div>
          )}

          {activeSpecTab === 'mechanical' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                C. Mechanical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'X-Y Gantry Mechanics', v: 'THK linear motion guide' },
                  { k: 'X-Y Precision', v: '11 microns' },
                  { k: 'Z Precision', v: '10 microns with industrial leadscrew' },
                  { k: 'Printer Dimensions', v: '800 L × 630 W × 750 H mm' },
                  { k: 'Printer Weight', v: '75 kg Net' },
                  { k: 'Shipping Weight', v: '85 kg with accessories' },
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
                D. Electrical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'Power Requirements', v: '230 V, 50 Hz' },
                  { k: 'Power Rating', v: '550 W' },
                  { k: 'Operational Frequency', v: '50 Hz' },
                  { k: 'Grounding & Protection', v: 'Industrial earthing requirement' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSpecTab === 'features' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                E. Brochure-Listed Feature Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  { k: 'High-Flow Hotend', v: '30 mm³/s Flow Rate' },
                  { k: 'Touch Display', v: '5-inch IPS Touchscreen' },
                  { k: 'Nozzle Temperature', v: '300°C' },
                  { k: 'Build Surface', v: 'Magnetic PEI' },
                  { k: 'Motion System', v: 'THK XY linear guides' },
                  { k: 'Z Axis', v: 'Industrial leadscrew' },
                  { k: 'Filament Detection', v: 'Runout + jam sensor' },
                  { k: 'Filtration System', v: 'HEPA + carbon filter' },
                  { k: 'Filament Chamber', v: 'Enclosed dedicated housing' },
                ].map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between gap-4">
                    <span className="text-slate-500 font-medium">{spec.k}</span>
                    <strong className="text-slate-900 text-right font-mono">{spec.v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specification Notice */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
            <strong>Specification Attribution Note:</strong> The product page and brochure both list a 350 × 350 × 350 mm
            build volume and up to 500 mm/sec print speed. The brochure provides the detailed mechanical dimensions (800 × 630 × 750 mm, 75 kg)
            and electrical rating (230 V, 50 Hz, 550 W). Confirm current configuration and supplied accessories before order placement.
          </div>
        </div>
      </section>

      {/* ====================================================
          13. MECHANICAL ENGINEERING AND MOTION SYSTEM
         ==================================================== */}
      <section ref={motionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Kinematics & Motion
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Advanced Motion System for High-Speed Printing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The product page describes a powerful motion system and rigid structural design intended to support stable printing at high speeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Controlled Movement',
              desc: 'THK linear motion guides on the XY axis ensure low-friction, high-speed gantry translation with micron precision.',
              icon: Compass,
              stat: '11 Microns XY',
            },
            {
              title: 'Mechanical Stability',
              desc: 'Industrial leadscrew mechanism on the Z axis delivers stable layer advancement without gantry drop or layer shift.',
              icon: Wrench,
              stat: '10 Microns Z',
            },
            {
              title: 'Vibration-Conscious',
              desc: 'Reinforced enclosed industrial body dampens mechanical vibrations during rapid directional changes.',
              icon: Factory,
              stat: 'All-Metal Body',
            },
            {
              title: 'Repeatable Motion',
              desc: 'Supports high-speed workflows and continuous production runs with consistent repeatability.',
              icon: RefreshCw,
              stat: '0.1–0.2 mm Tol.',
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 font-mono text-xs font-bold text-red-600">
                  {item.stat}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          14. HIGH-FLOW EXTRUSION AND THERMAL CONTROL
         ==================================================== */}
      <section ref={thermalRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Extrusion & Thermal
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            High-Flow Extrusion for Faster Deposition
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The brochure lists a high-flow hotend rated at 30 mm³/s and a 300°C high-temperature nozzle, intended to support higher material throughput.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Brochure-Listed</span>
              <h3 className="font-extrabold text-base text-slate-900">30 mm³/s High-Flow Hotend</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides high volumetric melt capability to keep pace with rapid printhead velocities without under-extrusion or extruder motor skipping.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Engineering Polymers</span>
              <h3 className="font-extrabold text-base text-slate-900">300°C High-Temperature Nozzle</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enables reliable processing of engineering filaments such as ABS, ASA, Nylon blends and Carbon Fiber reinforced composites.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Part Adhesion</span>
              <h3 className="font-extrabold text-base text-slate-900">120°C Bed + Magnetic PEI</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fast-heating build bed reaches up to 120°C with a textured magnetic PEI spring steel sheet for effortless part removal.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic text-center max-w-2xl mx-auto">
          Actual achievable speed depends on the material, nozzle, geometry, layer height, extrusion flow, cooling and print settings.
        </p>
      </section>

      {/* ====================================================
          15. TOUCHSCREEN AND WORKFLOW
         ==================================================== */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 5-inch IPS Touchscreen */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-8 space-y-5 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold uppercase">
              <Monitor className="w-3.5 h-3.5" />
              <span>Operator Interface</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Intelligent 5-inch IPS Touchscreen
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pratham 3 Rapid includes a touchscreen control system. The brochure specifies a 5-inch IPS touch display.
              The manufacturer describes the interface as supporting file management, real-time monitoring and printer operation.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              {[
                { title: 'Touch-based Control', desc: 'Direct fingertip navigation' },
                { title: 'File Management', desc: 'Browse and select prints' },
                { title: 'Print Operation', desc: 'Pause, resume, and adjust' },
                { title: 'Real-time Monitoring', desc: 'Track job duration & temps' },
              ].map((feat, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 4-Step Workflow */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
              CAD-to-Print Sequence
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Flexible Connectivity & Printing Workflow
            </h3>
            <div className="space-y-3 pt-2">
              {[
                {
                  step: 'Step 1',
                  name: 'Design',
                  desc: 'Create the part using a compatible CAD or 3D modeling application (SOLIDWORKS, Inventor, Fusion, SketchUp).',
                  icon: FileCode,
                },
                {
                  step: 'Step 2',
                  name: 'Prepare',
                  desc: 'Prepare the model in compatible slicing software (Orca or optional Simplify3D license) and generate a print-ready G-code file.',
                  icon: Sliders,
                },
                {
                  step: 'Step 3',
                  name: 'Transfer',
                  desc: 'Transfer the file using a supported connection such as USB, Wi-Fi or Ethernet, depending on the supplied configuration.',
                  icon: Radio,
                },
                {
                  step: 'Step 4',
                  name: 'Print',
                  desc: 'Use the 5-inch IPS touchscreen interface to start and operate the high-speed printing process.',
                  icon: Play,
                },
              ].map((w, idx) => {
                const Icon = w.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3 hover:border-slate-300 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-red-600 font-bold uppercase">{w.step}</span>
                        <h4 className="text-xs font-bold text-slate-900">— {w.name}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          16. PRINT RELIABILITY & LONG-HOUR OPERATION
         ==================================================== */}
      <section ref={reliabilityRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
              Industrial Reliability
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Built for Long-Hour Industrial Printing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The manufacturer describes Pratham 3 Rapid as designed for continuous production environments and long-hour
              workshop use. Built with industrial-grade mechanical components, smart cooling and print protections.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Reinforced Frame', desc: 'CNC-machined rigid body minimizes vibration' },
              { title: 'Industrial Motion', desc: 'THK XY rails & Z leadscrew for repeatable precision' },
              { title: 'Smart Cooling', desc: 'Controlled airflow paths preserve layer integrity' },
              { title: 'Automatic Leveling', desc: 'Bed matrix calibration simplifies preparation' },
              { title: 'Filament Monitoring', desc: 'Runout + jam sensors alert to feeding issues' },
              { title: 'Enclosed Chamber', desc: 'Internal filament chamber protects materials' },
              { title: 'Touchscreen Control', desc: '5-inch IPS display for intuitive print management' },
              { title: 'Air Filtration', desc: 'HEPA + carbon filter for cleaner workshop air' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                <CheckCircle2 className="w-4 h-4 text-red-400" />
                <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
            * Qualified Notice: Described by the manufacturer as designed for continuous long-hour workflows. Actual operational results depend on regular maintenance, material grade, slicer profiles and environmental conditions.
          </p>
        </div>
      </section>

      {/* ====================================================
          17. PRODUCT GALLERY (Interactive Lightbox)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Visual Inspection
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Explore Pratham 3 Rapid
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Authentic product photography showcasing machine chassis, kinematics, extrusion assembly and printed outputs.
          </p>
        </div>

        {/* Gallery Viewer */}
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
          18. OFFICIAL VIDEOS AND DEMONSTRATIONS (2 Verified Videos)
         ==================================================== */}
      <section ref={videosRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Video Demonstrations
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            See Pratham 3 Rapid in Action
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Official demonstrations published by Make3D showcasing machine capabilities, high-speed timelapse, and comparison.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: 'KDaMpRsHvyU',
              title: 'Introducing Pratham 3 Rapid – Rule the Sky of High-Speed 3D Printing',
              desc: 'Official product launch video demonstrating the 500 mm/s high-speed motion system, high-flow hotend and industrial build capacity.',
              thumb: 'https://img.youtube.com/vi/KDaMpRsHvyU/hqdefault.jpg',
            },
            {
              id: 'AZbMyxOx94k',
              title: 'Pratham 3.0 vs Pratham 3 Rapid | Real-Time 3D Printing Timelapse',
              desc: 'Side-by-side timelapse comparison demonstrating layer deposition speed and throughput gains between standard and rapid models.',
              thumb: 'https://img.youtube.com/vi/AZbMyxOx94k/hqdefault.jpg',
            },
          ].map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all"
            >
              <div
                onClick={() => {
                  setActiveVideoId(vid.id)
                  setVideoModalOpen(true)
                }}
                className="relative h-56 bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <img
                  src={vid.thumb}
                  alt={vid.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">{vid.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{vid.desc}</p>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveVideoId(vid.id)
                      setVideoModalOpen(true)
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Play Video</span>
                    <Play className="w-3 h-3 fill-red-600" />
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>Open on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          19. MADE IN INDIA & NATIONAL TRUST
         ==================================================== */}
      <section ref={nationalRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-red-200 font-bold">
              Domestic Engineering Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Made in India. Trusted by Engineers & Industries.
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              Make3D is an Indian 3D printer manufacturer based in Surat, Gujarat. Its product page reports that the Pratham series is trusted by IITs, ISRO-related teams, engineering colleges, product-development companies, MSMEs and manufacturing plants across India.
            </p>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-mono">
              * “Trusted by 2500+ Engineers & Industries” — manufacturer-reported claim.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 relative z-10 text-center">
            {[
              { title: 'Indian Manufacturing', desc: 'Designed & built in Surat, Gujarat' },
              { title: 'Local Servicing', desc: 'Rapid field engineer deployment' },
              { title: 'Local Spare Parts', desc: 'Fast turnaround without import wait' },
              { title: 'Fast Support', desc: 'Hindi & English technical assistance' },
              { title: 'Production Equipment', desc: 'Industrial additive tooling' },
              { title: 'Direct Factory Expertise', desc: 'Comprehensive OEM know-how' },
            ].map((b, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
                <div className="font-extrabold text-xs text-white">{b.title}</div>
                <div className="text-[10px] text-red-100">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          20. LOCAL SUPPORT, SERVICE AND ONBOARDING
         ==================================================== */}
      <section ref={supportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Customer Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Local Service. Local Spares. Local Support.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The brochure highlights local service, local spares and local support, along with India-wide support intended to reduce downtime. Includes Hindi and English support options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Local Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manufacturer-described local service support for customers across India, ensuring rapid resolution and minimal production disruption.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Spare Parts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Local spare-parts support directly from the factory, avoiding prolonged international shipping delays for consumables and components.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Installation and Onboarding</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The product page states that Make3D provides complete installation, setup and hands-on onboarding for engineers, teams and institutions.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => openQuoteModal('Technical Consultation — Pratham 3 Rapid')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-red-500" />
            <span>Talk to a Make3D Expert</span>
          </button>
        </div>
      </section>

      {/* ====================================================
          21. FREQUENTLY ASKED QUESTIONS (14 FAQs Accordion)
         ==================================================== */}
      <section ref={faqRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Detailed answers regarding speed, build volume, materials, precision, software and support.
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
          22. IN-PAGE QUOTATION REQUEST FORM
         ==================================================== */}
      <section ref={quoteRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
                Direct Commercial Enquiry
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Get a Quote for Pratham 3 Rapid
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tell us about your production requirements, application and material needs. The Make3D team can help you
                explore the Pratham 3 Rapid configuration suited to your workflow.
              </p>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Quote Request Received!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you for your interest in Pratham 3 Rapid. Our additive engineering team will review your specifications and contact you with a formal quotation and technical consultation.
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
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Institution</label>
                    <input
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      placeholder="e.g. Precision Engineering Ltd."
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
                      placeholder="e.g. rajesh@company.com"
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
                      placeholder="e.g. Pune, Chennai, Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={quoteForm.state}
                      onChange={(e) => setQuoteForm({ ...quoteForm, state: e.target.value })}
                      placeholder="e.g. Maharashtra, Tamil Nadu"
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
                      <option>Automotive & Transportation</option>
                      <option>Aerospace & Defense</option>
                      <option>Industrial Machinery & Tooling</option>
                      <option>Consumer Electronics & Appliances</option>
                      <option>Academic & Research Institute</option>
                      <option>Medical Device & Health Tech</option>
                      <option>3D Printing Service Bureau</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Application</label>
                    <select
                      value={quoteForm.application}
                      onChange={(e) => setQuoteForm({ ...quoteForm, application: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>Functional Prototyping</option>
                      <option>Batch Production Parts</option>
                      <option>Jigs & Fixtures</option>
                      <option>Tooling & Forming Inserts</option>
                      <option>Research & Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Material of Interest</label>
                    <select
                      value={quoteForm.material}
                      onChange={(e) => setQuoteForm({ ...quoteForm, material: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>PLA / Tough PLA</option>
                      <option>ABS / ASA</option>
                      <option>PETG</option>
                      <option>Flexible TPU</option>
                      <option>Carbon Fiber Composite</option>
                      <option>Nylon & Specialty Blends</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Contact Method</label>
                    <select
                      value={quoteForm.contactMethod}
                      onChange={(e) => setQuoteForm({ ...quoteForm, contactMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-600 focus:outline-hidden bg-white"
                    >
                      <option>Phone & WhatsApp</option>
                      <option>Official Email</option>
                      <option>In-Person Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Additional Project Requirements or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    placeholder="Specify target component sizes, expected weekly volume, or custom nozzle requests..."
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
          23. BROCHURE & DEMO CTAS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase text-red-400 font-bold">Documentation</span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Explore the Pratham 3 Rapid Brochure
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Review the complete product overview, key features and technical specifications in the official manufacturer brochure.
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
              onClick={() => {
                setActiveVideoId('KDaMpRsHvyU')
                setVideoModalOpen(true)
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-red-500 fill-red-500" />
              <span>View Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          24. RELATED PRATHAM MODELS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Series Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Explore Other Make3D 3D Printers
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From educational compact printers to full 1 cubic meter jumbo manufacturing systems.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
              img: '/images/products/pratham-3-rapid.png',
              active: true,
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
              tag: 'Large-Scale Monolith',
              link: '/products/pratham-6-0',
              img: '/images/products/pratham-6-0.png',
            },
          ].map((printer, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 flex flex-col justify-between text-center space-y-3 transition-all ${
                printer.active
                  ? 'bg-red-50/50 border-red-500 shadow-sm ring-1 ring-red-500'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="h-28 flex items-center justify-center p-2">
                <img src={printer.img} alt={printer.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase block">{printer.tag}</span>
                <strong className="text-xs font-black text-slate-900 block">{printer.name}</strong>
                <span className="text-[10px] text-slate-500 font-mono block">{printer.vol}</span>
              </div>
              {printer.link ? (
                <Link
                  to={printer.link}
                  className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold block transition-colors"
                >
                  Explore Product
                </Link>
              ) : (
                <span className="w-full py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold block">
                  Current Model
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          25. FINAL CALL TO ACTION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              High-Speed Production Manufacturing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Accelerate Your Production with Pratham 3 Rapid
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore high-speed industrial FDM 3D printing with a 350 × 350 × 350 mm build volume, a high-flow extrusion
              system and robust mechanical design. Talk to our additive manufacturing engineers today.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => openQuoteModal('Pratham 3 Rapid High-Speed Industrial 3D Printer')}
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
                onClick={() => {
                  setActiveVideoId('KDaMpRsHvyU')
                  setVideoModalOpen(true)
                }}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs tracking-wide transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>View Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          26. CONTACT INFORMATION SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 font-bold">
                Manufacturing & Sales Contact
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Make3D Official Sales & Support Desk</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">Surat, Gujarat, India</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Mail className="w-4 h-4 text-red-600" />
                <span>Email Enquiries</span>
              </div>
              <div className="text-slate-600 space-y-0.5">
                <div>Sales: <a href="mailto:sales@make3d.in" className="text-red-600 hover:underline">sales@make3d.in</a></div>
                <div>General: <a href="mailto:info@make3d.in" className="text-red-600 hover:underline">info@make3d.in</a></div>
                <div>Support: <a href="mailto:support@make3d.in" className="text-red-600 hover:underline">support@make3d.in</a></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Phone Contacts</span>
              </div>
              <div className="text-slate-600 space-y-0.5 font-mono">
                <div>+91 92278 98857 (Official Desk)</div>
                <div>+91 93135 52112 (Sales Desk)</div>
                <div>+91 88667 10006 (Support Desk)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Manufacturing Facility</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Plot - 36A, Nilkanth Industry, Ved Road, Katargam, Surat - 395004, Gujarat, India.
              </p>
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
                <span>Make3D Pratham 3 Rapid Official Demonstration</span>
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
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Make3D Pratham 3 Rapid Video Demonstration"
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
  { url: '/images/products/pratham-3-rapid.png', title: 'Full Front Machine View — Pratham 3 Rapid' },
  { url: '/images/products/pratham-3-rapid-banner.png', title: 'Industrial Enclosure & High-Speed Gantry' },
]

// 14 Official FAQs
const faqs = [
  {
    q: 'What makes Pratham 3 Rapid faster than regular FDM 3D printers?',
    a: 'Pratham 3 Rapid uses a high-torque extruder, advanced motion system and optimized print-path algorithms. The manufacturer lists print speeds up to 500 mm/sec. Actual print speed depends on material, geometry and slicing settings.',
  },
  {
    q: 'What materials can Pratham 3 Rapid print with?',
    a: 'The product page and brochure list PLA, ABS, PETG, ASA, flexible TPU, carbon fiber composite and HIPS. The product page also mentions Nylon and other engineering materials. Confirm exact filament grades and validated profiles with Make3D.',
  },
  {
    q: 'Is Pratham 3 Rapid suitable for large functional prototypes?',
    a: 'The 350 × 350 × 350 mm build volume and rigid structural design are intended to support large engineering components, jigs, fixtures, housings and production-oriented parts. Whether a part fits depends on its geometry and support requirements.',
  },
  {
    q: 'How accurate is Pratham 3 Rapid?',
    a: 'The brochure lists dimensional tolerance of 0.1–0.2 mm, X-Y precision of 11 microns and Z precision of 10 microns with an industrial leadscrew. Actual results depend on machine calibration, material, geometry and operating conditions.',
  },
  {
    q: 'Can Pratham 3 Rapid run continuously for long production cycles?',
    a: 'The manufacturer describes the printer as designed for 24×7 industrial use, with thermal management, reinforced mechanics and a stable extrusion system. Actual operating results depend on configuration, maintenance, material and environment.',
  },
  {
    q: 'Does Make3D provide installation and onboarding?',
    a: 'Yes. The official product page states that Make3D provides installation, setup and hands-on onboarding for engineers, teams and institutions.',
  },
  {
    q: 'What is the build volume?',
    a: 'The listed build volume is 350 × 350 × 350 mm (350 mm cubic build capacity).',
  },
  {
    q: 'What is the maximum print speed?',
    a: 'The product page and brochure list up to 500 mm/sec. This is a maximum listed speed, not a guarantee that every print will run at that speed.',
  },
  {
    q: 'What is the nozzle temperature?',
    a: 'The brochure lists a maximum nozzle temperature of 300°C.',
  },
  {
    q: 'What is the printbed temperature?',
    a: 'The brochure lists a printbed temperature of up to 120°C on a magnetic PEI spring steel surface.',
  },
  {
    q: 'Which software is supported?',
    a: 'The brochure lists Orca and an optional Simplify3D license, with Windows and Mac support. Confirm current versions and licensing details with Make3D.',
  },
  {
    q: 'What connectivity options are listed?',
    a: 'USB, Wi-Fi and Ethernet are listed on the product page and brochure. Confirm the supplied configuration before ordering.',
  },
  {
    q: 'What are the printer dimensions and weight?',
    a: 'The brochure lists dimensions of 800 × 630 × 750 mm, a printer weight of 75 kg and a shipping weight of 85 kg with accessories.',
  },
  {
    q: 'What are the power requirements?',
    a: 'The brochure lists 230 V, 50 Hz and 550 W. Confirm installation requirements with Make3D.',
  },
]

export default Pratham3RapidPage
