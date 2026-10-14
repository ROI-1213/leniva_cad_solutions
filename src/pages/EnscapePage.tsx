import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  PhoneCall,
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Video,
  Eye,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Box,
  Compass,
  ExternalLink,
  Users,
  Building2,
  Home,
  Trees,
  TrendingUp,
  HardHat,
  GraduationCap,
  Share2,
  QrCode,
  Image as ImageIcon,
  RefreshCw,
  Maximize2,
  Check,
  X,
  Send,
  HelpCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { enscapeData, EnscapeGalleryItem } from '../data/enscapeData'

export const EnscapePage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Sticky sub-nav active section
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Gallery filter & lightbox
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>('all')
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<EnscapeGalleryItem | null>(null)

  // Interactive Live Sync step
  const [activeSyncStep, setActiveSyncStep] = useState<number>(0)

  // Interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Embedded enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    company: '',
    workEmail: '',
    phone: '',
    country: 'India',
    areaOfWork: 'Architecture',
    interestedPlan: 'Enscape Premium',
    numberOfLicenses: '1',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Section Refs for Smooth Scrolling & Intersection Observer
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const integrationsRef = useRef<HTMLDivElement>(null)
  const applicationsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)
  const requirementsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const enquiryRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, id: string) => {
    setActiveSection(id)
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // SEO Setup
  useEffect(() => {
    document.title = enscapeData.seo.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', enscapeData.seo.description)
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Chaos Enscape',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Windows, macOS',
      description: enscapeData.hero.description,
      brand: {
        '@type': 'Brand',
        name: 'Chaos',
        url: 'https://www.chaos.com',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        price: 'Contact for Quote',
        availability: 'https://schema.org/InStock',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Leniva CAD Solutions',
        url: 'https://lenivacadsolution.com',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(productSchema)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Form submission handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!enquiryForm.fullName.trim() || !enquiryForm.workEmail.trim() || !enquiryForm.phone.trim()) {
      setFormError('Please fill in all required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(enquiryForm.workEmail)) {
      setFormError('Please enter a valid work email address.')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate backend call / connect with endpoint
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsSubmitted(true)
    } catch {
      setFormError('Unable to process enquiry. Please try again or chat with our team on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const galleryFilterOptions = [
    { id: 'all', label: 'All Renders' },
    { id: 'residential', label: 'Residential' },
    { id: 'interior', label: 'Interiors' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'night', label: 'Nighttime' },
  ]

  const filteredGallery =
    activeGalleryCat === 'all'
      ? enscapeData.gallery
      : enscapeData.gallery.filter(item => item.category === activeGalleryCat)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 selection:bg-blue-600 selection:text-white">
      {/* ====================================================
          1. STICKY PRODUCT SUB-NAV BAR (COMPACT & RESPONSIVE)
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black text-slate-950 tracking-tight">Chaos Enscape</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              Real-Time Rendering
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar">
            <button
              onClick={() => scrollTo(overviewRef, 'overview')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'overview' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo(featuresRef, 'features')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'features' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollTo(workflowRef, 'workflow')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'workflow' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Workflow
            </button>
            <button
              onClick={() => scrollTo(integrationsRef, 'integrations')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'integrations' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Integrations
            </button>
            <button
              onClick={() => scrollTo(applicationsRef, 'applications')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'applications' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => scrollTo(galleryRef, 'gallery')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'gallery' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo(plansRef, 'plans')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'plans' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Plans
            </button>
            <button
              onClick={() => scrollTo(requirementsRef, 'requirements')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'requirements' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Specs
            </button>
            <button
              onClick={() => scrollTo(faqRef, 'faq')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'faq' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2.5">
            <a
              href={enscapeData.hero.trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <span>Free Trial</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={() => openQuoteModal('Chaos Enscape Subscription')}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. BREADCRUMBS & HERO SECTION
         ==================================================== */}
      <div ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/cad-software" className="hover:text-slate-900 transition-colors">CAD Software</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Chaos Enscape</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="h-8 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                <img src="/images/brands/chaos.jpg" alt="Chaos" className="h-full w-auto max-w-[80px] object-contain" />
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold text-blue-800 tracking-wide uppercase">
                  {enscapeData.hero.eyebrow}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {enscapeData.hero.h1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                {enscapeData.hero.h1Highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-700 leading-snug">
              {enscapeData.hero.supportingHeadline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {enscapeData.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo(enquiryRef, 'enquiry')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={enscapeData.hero.trialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={enscapeData.hero.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-slate-500 hover:text-slate-800 font-semibold text-xs flex items-center space-x-1"
              >
                <span>Official Chaos Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Key Verified Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
              {enscapeData.hero.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-bold text-slate-600">{stat.label}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{stat.note}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src={enscapeData.hero.heroImage}
                alt="Chaos Enscape photorealistic architectural rendering"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Live Sync Preview Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white/40 flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">Live Bi-Directional Link Active</span>
              </div>

              {/* Inset Secondary Material Preview Card */}
              <div className="absolute bottom-4 right-4 max-w-xs bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl hidden sm:block">
                <div className="flex items-center space-x-3">
                  <img
                    src={enscapeData.hero.heroSecondaryImage}
                    alt="Enscape material preview"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-600"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Full Ray-Traced Realism</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Physical sun, IES artificial lights & true PBR reflections</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                <span>Architectural Visualization in Enscape</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ====================================================
          3. PRODUCT INTRODUCTION
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{enscapeData.intro.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {enscapeData.intro.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {enscapeData.intro.description}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {enscapeData.intro.subDescription}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Seamless Host Integration</div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Launch directly inside Revit, SketchUp, Rhino, Archicad, or Vectorworks without file conversions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">No Clunky Offline Waiting</div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Explore your full model at 60+ FPS while navigating interior hallways, exterior landscapes, and daylight studies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={enscapeData.intro.image}
                alt="Enscape architectural interior rendering"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          4. WHY ENSCAPE — 5 PILLARS
         ==================================================== */}
      <div id="features" ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Why Choose Enscape</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.whyEnscape.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.whyEnscape.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enscapeData.whyEnscape.cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-xs">
                  {card.subtitle}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-950 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          5. REAL-TIME WALKTHROUGH
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{enscapeData.walkthrough.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {enscapeData.walkthrough.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {enscapeData.walkthrough.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {enscapeData.walkthrough.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => openQuoteModal('Enscape Walkthrough Demo')}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>Request Live Interactive Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 group">
                <img
                  src={enscapeData.walkthrough.image}
                  alt="Enscape real-time interactive walkthrough preview"
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl mb-3">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">
                    Interactive Real-Time Walkthrough
                  </span>
                  <span className="text-[11px] text-slate-300 mt-1 max-w-xs">
                    60 FPS live camera navigation with realistic collision detection and physics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          6. LIVE SYNCHRONIZATION WORKFLOW
         ==================================================== */}
      <div id="live-sync" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{enscapeData.liveSync.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.liveSync.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.liveSync.description}
          </p>
        </div>

        {/* 3-Step Interactive Sync Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enscapeData.liveSync.steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveSyncStep(idx)}
              className={`p-7 rounded-2xl border transition-all cursor-pointer ${
                activeSyncStep === idx
                  ? 'bg-blue-50/60 border-blue-400 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-blue-600 font-mono">{step.number}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          7. CAD & BIM INTEGRATIONS
         ==================================================== */}
      <div id="integrations" ref={integrationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Work With Your Favorite Tools</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Enscape Fits Into Your Existing Design Workflow
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Enscape is engineered to run seamlessly inside your design authoring tools, eliminating the need to learn disconnected standalone modeling software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enscapeData.integrations.map(integ => (
            <div
              key={integ.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={integ.image}
                  alt={`${integ.name} visualization in Enscape`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white">
                  {integ.logoBadge}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-950">{integ.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{integ.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] text-slate-500">
                    <strong>Compatibility:</strong> {integ.supportedVersions}
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold">
                    ★ {integ.keyAdvantage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <em>Availability and functionality may vary by application, operating system, and Enscape version. Verify current host compatibility before purchase.</em>
        </div>
      </div>

      {/* ====================================================
          8. VIRTUAL REALITY (VR)
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5" />
                <span>{enscapeData.virtualReality.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {enscapeData.virtualReality.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {enscapeData.virtualReality.description}
              </p>

              <div className="space-y-2 pt-2">
                {enscapeData.virtualReality.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Supported VR Hardware:</div>
                <div className="text-xs text-slate-300">
                  {enscapeData.virtualReality.headsets.join(' • ')}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src={enscapeData.virtualReality.image}
                  alt="Architect inspecting design using VR headset"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          9. IMAGE AND VIDEO EXPORTS
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{enscapeData.exports.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.exports.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.exports.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enscapeData.exports.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  {idx === 0 && <ImageIcon className="w-5 h-5" />}
                  {idx === 1 && <Video className="w-5 h-5" />}
                  {idx === 2 && <Compass className="w-5 h-5" />}
                  {idx === 3 && <Layers className="w-5 h-5" />}
                  {idx === 4 && <Share2 className="w-5 h-5" />}
                  {idx === 5 && <Eye className="w-5 h-5" />}
                  {idx === 6 && <QrCode className="w-5 h-5" />}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-950">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          10. ASSETS AND MATERIALS LIBRARY
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Box className="w-3.5 h-3.5 text-blue-600" />
              <span>{enscapeData.assetsAndMaterials.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {enscapeData.assetsAndMaterials.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {enscapeData.assetsAndMaterials.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {enscapeData.assetsAndMaterials.categories.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{cat.name}</span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={enscapeData.assetsAndMaterials.image}
                alt="Enscape 3D asset library and interior furnishings"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          11. AI-POWERED CREATION (VERAS & CHAOS AI)
         ==================================================== */}
      <div id="ai-creation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{enscapeData.aiCreation.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.aiCreation.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.aiCreation.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enscapeData.aiCreation.cards.map((aiCard, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {aiCard.tech}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{aiCard.status}</span>
                </div>
                <h3 className="text-lg font-black text-slate-950">{aiCard.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {aiCard.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          <em>{enscapeData.aiCreation.disclaimer}</em>
        </div>
      </div>

      {/* ====================================================
          12. CLOUD COLLABORATION
         ==================================================== */}
      <div id="cloud-collaboration" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>{enscapeData.cloudCollaboration.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.cloudCollaboration.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.cloudCollaboration.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {enscapeData.cloudCollaboration.cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                {idx === 0 && <Share2 className="w-5 h-5" />}
                {idx === 1 && <Users className="w-5 h-5" />}
                {idx === 2 && <CheckCircle2 className="w-5 h-5" />}
                {idx === 3 && <RefreshCw className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-black text-slate-950">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          13. DESIGN WORKFLOW TIMELINE
         ==================================================== */}
      <div id="workflow" ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>End-to-End Pipeline</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.workflow.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {enscapeData.workflow.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {enscapeData.workflow.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 relative group"
            >
              <div className="text-2xl font-black text-blue-600 font-mono">{st.step}</div>
              <h3 className="text-base font-black text-slate-950 group-hover:text-blue-700 transition-colors">
                {st.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          14. INDUSTRY APPLICATIONS
         ==================================================== */}
      <div id="applications" ref={applicationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Designed for AEC Professionals</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Visualize Ideas Across the Built Environment
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tailored visual storytelling workflows across architecture, interior spaces, landscape, real estate, and construction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enscapeData.applications.map(app => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {app.id === 'architecture' && <Building2 className="w-5 h-5 text-blue-600" />}
                    {app.id === 'interior' && <Home className="w-5 h-5 text-blue-600" />}
                    {app.id === 'landscape' && <Trees className="w-5 h-5 text-blue-600" />}
                    {app.id === 'real-estate' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                    {app.id === 'construction' && <HardHat className="w-5 h-5 text-blue-600" />}
                    {app.id === 'education' && <GraduationCap className="w-5 h-5 text-blue-600" />}
                    <h3 className="text-base font-black text-slate-950">{app.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{app.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Key Outputs:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {app.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-center space-x-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          15. VISUAL GALLERY WITH LIGHTBOX
         ==================================================== */}
      <div id="gallery" ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Made Visible With Enscape</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Explore What Real-Time Visualization Can Look Like
          </h2>
          <p className="text-slate-600 text-sm">
            High-fidelity architectural imagery rendered with Enscape real-time ray-tracing engine. Click any render to inspect details.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {galleryFilterOptions.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveGalleryCat(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeGalleryCat === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                    View Fullscreen
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                  {item.categoryLabel}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-snug line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
            >
              <button
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.alt}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6 text-white space-y-1 bg-slate-900">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">
                  {selectedGalleryItem.categoryLabel} Visualization
                </span>
                <h3 className="text-lg font-bold">{selectedGalleryItem.title}</h3>
                <p className="text-xs text-slate-300">{selectedGalleryItem.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          16. PRESENTATION & CLIENT COMMUNICATION
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Client Presentations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {enscapeData.presentationSection.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {enscapeData.presentationSection.description}
            </p>

            <ul className="space-y-2.5 pt-2">
              {enscapeData.presentationSection.benefits.map((ben, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={enscapeData.presentationSection.image}
                alt="Client presentation environment showcasing Enscape render"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          17. PLANS AND LICENSING
         ==================================================== */}
      <div id="plans" ref={plansRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Choose Your Workflow</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Explore Enscape Licensing Plans
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Chaos offers flexible licensing configurations tailored for solo professionals, mid-sized architecture practices, and enterprise creative studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enscapeData.plans.map(plan => (
            <div
              key={plan.id}
              className={`p-7 rounded-3xl border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-slate-900 text-white border-blue-500 shadow-xl relative'
                  : 'bg-white text-slate-900 border-slate-200 shadow-xs'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular for Studios
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-black tracking-tight">{plan.name}</h3>
                  <div className={`text-xs font-semibold mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-blue-600'}`}>
                    {plan.tagline}
                  </div>
                  <p className={`text-xs mt-2 leading-relaxed ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100/10 border border-slate-700/50 space-y-1">
                  <div className="text-[11px] font-bold">Contact Us for Current Quote</div>
                  <div className="text-[10px] text-slate-400">
                    Official INR commercial/educational quotes with GST compliance
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <div className="text-xs font-bold uppercase tracking-wider">Plan Inclusions:</div>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-600'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={() => openQuoteModal(`Chaos ${plan.name}`)}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Enquire About Licensing</span>
                </button>

                <a
                  href={plan.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-[11px] font-semibold hover:underline ${
                    plan.popular ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Verify Official Terms & Details →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          <em>Plan inclusions, terms, and AI-credit allowances are subject to official Chaos licensing policies and may change without prior notice.</em>
        </div>
      </div>

      {/* ====================================================
          18. FREE TRIAL BANNER
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              14-Day Full-Featured Trial
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Explore Enscape With an Official Free Trial
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Experience the real-time visualization workflow inside your CAD application before selecting a commercial license plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={enscapeData.hero.trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => openQuoteModal('Enscape Trial Assistance')}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Request Product Guidance</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          19. SYSTEM REQUIREMENTS & COMPATIBILITY
         ==================================================== */}
      <div id="requirements" ref={requirementsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-blue-600" />
            <span>Technical Validation</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {enscapeData.systemRequirements.heading}
          </h2>
          <p className="text-slate-600 text-sm">
            {enscapeData.systemRequirements.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Operating System</div>
              <div className="sm:col-span-2 text-slate-900 font-medium">
                {enscapeData.systemRequirements.minOS}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Supported Host Applications</div>
              <div className="sm:col-span-2 text-slate-900">
                {enscapeData.systemRequirements.supportedHosts}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Minimum Graphics Card (GPU)</div>
              <div className="sm:col-span-2 text-slate-900">
                {enscapeData.systemRequirements.minGPU}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Recommended Graphics Card</div>
              <div className="sm:col-span-2 text-slate-900 font-semibold text-blue-600">
                {enscapeData.systemRequirements.recommendedGPU}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">System Memory (RAM)</div>
              <div className="sm:col-span-2 text-slate-900">
                {enscapeData.systemRequirements.minRAM}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Virtual Reality Hardware</div>
              <div className="sm:col-span-2 text-slate-900">
                {enscapeData.systemRequirements.vrRequirements}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a
            href={enscapeData.systemRequirements.officialDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1"
          >
            <span>View Official Chaos Enscape System Requirements Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ====================================================
          20. FREQUENTLY ASKED QUESTIONS (FAQ)
         ==================================================== */}
      <div id="faq" ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about Chaos Enscape real-time rendering, licensing, and workflow integration.
          </p>
        </div>

        <div className="space-y-3">
          {enscapeData.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-4 ${
                    openFaq === idx ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          21. PROFESSIONAL ENQUIRY FORM SECTION
         ==================================================== */}
      <div id="enquiry" ref={enquiryRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Official Licensing Enquiry
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-1">
              Request Chaos Enscape Consultation & Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Connect with Leniva CAD Solutions for commercial licensing, educational institutional terms, volume discounts, and local technical onboarding in India.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Thank you for your enquiry.</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our team has received your request for <strong>{enquiryForm.interestedPlan}</strong>. An engineering consultant will contact you shortly with formal quotation and licensing details.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.fullName}
                      onChange={e => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      placeholder="e.g. Ar. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Studio Name
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.company}
                      onChange={e => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                      placeholder="e.g. Studio Vista Architects"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.workEmail}
                      onChange={e => setEnquiryForm({ ...enquiryForm, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Area of Work</label>
                    <select
                      value={enquiryForm.areaOfWork}
                      onChange={e => setEnquiryForm({ ...enquiryForm, areaOfWork: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="Architecture">Architecture</option>
                      <option value="Interior design">Interior design</option>
                      <option value="Landscape design">Landscape design</option>
                      <option value="Engineering and construction">Engineering and construction</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Interested Plan</label>
                    <select
                      value={enquiryForm.interestedPlan}
                      onChange={e => setEnquiryForm({ ...enquiryForm, interestedPlan: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="Enscape Solo">Enscape Solo (Fixed Seat)</option>
                      <option value="Enscape Premium">Enscape Premium (Floating)</option>
                      <option value="Enscape Collection">Enscape Collection (with V-Ray)</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Number of Licenses</label>
                    <input
                      type="number"
                      min="1"
                      value={enquiryForm.numberOfLicenses}
                      onChange={e => setEnquiryForm({ ...enquiryForm, numberOfLicenses: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Tell us about your team size, CAD host software, or specific requirements..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnscapePage
