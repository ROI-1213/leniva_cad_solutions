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
  Eye,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Box,
  Compass,
  ExternalLink,
  Building2,
  Home,
  Award,
  Sun,
  Globe,
  Lightbulb,
  Cloud,
  Sliders,
  Droplet,
  Stamp,
  Feather,
  Scissors,
  Film,
  Car,
  Wrench,
  Check,
  X,
  Send,
  HelpCircle,
  Maximize2,
  Server,
  GraduationCap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { vrayData as defaultVRayData, VRayGalleryItem } from '../data/vrayData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const VRayPage: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()
  const { data: vrayData } = useCadPageData('chaos_vray', defaultVRayData)

  // Sticky sub-nav active section
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Gallery filter & lightbox
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>('all')
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<VRayGalleryItem | null>(null)

  // Interactive Engine Selector
  const [activeEngineTab, setActiveEngineTab] = useState<'cpu' | 'gpu' | 'hybrid'>('gpu')

  // Interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Embedded enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    company: '',
    workEmail: '',
    phone: '',
    country: 'India',
    industry: 'Architecture',
    hostApplication: '3ds Max',
    interestedPlan: 'V-Ray Premium',
    numberOfLicenses: '1',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Section Refs for Smooth Scrolling & Intersection Observer
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const renderingRef = useRef<HTMLDivElement>(null)
  const integrationsRef = useRef<HTMLDivElement>(null)
  const applicationsRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
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
    document.title = vrayData.seo.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', vrayData.seo.description)
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Chaos V-Ray',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Windows, macOS, Linux',
      description: vrayData.hero.description,
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
      await submitQuote({
        fullName: enquiryForm.fullName,
        company: enquiryForm.company,
        email: enquiryForm.workEmail,
        phone: enquiryForm.phone,
        productOrService: `Chaos V-Ray (${enquiryForm.interestedPlan} - ${enquiryForm.hostApplication})`,
        quantity: enquiryForm.numberOfLicenses || '1',
        application: `${enquiryForm.industry} (${enquiryForm.country})`,
        message: enquiryForm.message,
      })
      setIsSubmitted(true)
    } catch {
      setFormError('Unable to process enquiry. Please try again or chat with our team on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const galleryFilterOptions = [
    { id: 'all', label: 'All Renders' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'interiors', label: 'Interiors' },
    { id: 'product', label: 'Product Design' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'vfx', label: 'VFX & Film' },
  ]

  const filteredGallery =
    activeGalleryCat === 'all'
      ? vrayData.gallery
      : vrayData.gallery.filter(item => item.category === activeGalleryCat)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 selection:bg-blue-600 selection:text-white">
      {/* ====================================================
          1. STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black text-slate-950 tracking-tight">Chaos V-Ray</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              Photorealistic Ray Tracing
            </span>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-4 sm:space-x-5 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar py-1.5 lg:py-0 border-t lg:border-t-0 border-slate-100 whitespace-nowrap">
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
              onClick={() => scrollTo(renderingRef, 'rendering')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'rendering' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Rendering
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
              onClick={() => scrollTo(workflowRef, 'workflow')}
              className={`hover:text-blue-700 transition-colors cursor-pointer ${
                activeSection === 'workflow' ? 'text-blue-600 font-bold' : ''
              }`}
            >
              Workflow
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
              href={vrayData.hero.trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <span>Free Trial</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={() => openQuoteModal('Chaos V-Ray Subscription')}
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
          <span className="text-slate-900 font-bold">Chaos V-Ray</span>
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
                  {vrayData.hero.eyebrow}
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.hero.h1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
                {vrayData.hero.h1Highlight}
              </span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-700 leading-snug">
              {vrayData.hero.supportingHeading}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {vrayData.hero.description}
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
                href={vrayData.hero.trialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={vrayData.hero.officialUrl}
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
              {vrayData.hero.stats.map((stat, idx) => (
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
                src={vrayData.hero.heroImage}
                alt="Chaos V-Ray photorealistic architectural hero rendering"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Ray Tracing Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white/40 flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">Physically Based Ray Tracing Engine</span>
              </div>

              {/* Inset Secondary Showcase Card */}
              <div className="absolute bottom-4 right-4 max-w-xs bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 shadow-xl hidden sm:block">
                <div className="flex items-center space-x-3">
                  <img
                    src={vrayData.hero.heroSecondaryImage}
                    alt="V-Ray material rendering preview"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-600"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">CPU + GPU Hybrid Core</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">NVIDIA RTX ray-traced acceleration & Intel OIDN denoise</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg">
                <span>Photorealistic Architectural Rendering in V-Ray</span>
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
              <span>{vrayData.intro.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.intro.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.intro.description}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.intro.subDescription}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Uncompromising Physical Accuracy</div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Calculates light bounces, caustics, and subsurface scatter according to real optical physics.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Production Battle-Tested</div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Recipient of an Academy Scientific and Technical Award, relied upon by top architectural practices and VFX facilities globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={vrayData.intro.image}
                alt="Chaos V-Ray high-end architectural rendering"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          4. WHY V-RAY — 4 CORE PILLARS
         ==================================================== */}
      <div id="features" ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>{vrayData.whyVRay.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.whyVRay.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered to handle the most demanding visualization, architectural presentation, and animation challenges with benchmark fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vrayData.whyVRay.cards.map((card, idx) => (
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
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-black text-slate-950 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Explore Capability</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          5. PHOTOREALISTIC RAY-TRACED RENDERING
         ==================================================== */}
      <div id="ray-tracing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{vrayData.rayTracing.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {vrayData.rayTracing.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {vrayData.rayTracing.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {vrayData.rayTracing.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src={vrayData.rayTracing.image}
                  alt="V-Ray photorealistic ray tracing architecture"
                  className="w-full h-[280px] sm:h-[340px] object-cover"
                />
              </div>

              {/* Closeups Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {vrayData.rayTracing.materialCloseups.map((m, idx) => (
                  <div key={idx} className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700 space-y-1">
                    <img src={m.image} alt={m.name} className="w-full h-16 rounded-lg object-cover" />
                    <div className="text-[11px] font-bold text-white mt-1">{m.name}</div>
                    <div className="text-[9px] text-slate-400 leading-tight">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          6. LIGHTING AND ILLUMINATION
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>{vrayData.lighting.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.lighting.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.lighting.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {vrayData.lighting.cards.map((lCard, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  {idx === 0 && <Sun className="w-5 h-5" />}
                  {idx === 1 && <Globe className="w-5 h-5" />}
                  {idx === 2 && <Lightbulb className="w-5 h-5" />}
                  {idx === 3 && <Cloud className="w-5 h-5" />}
                  {idx === 4 && <Sliders className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-black text-slate-950">{lCard.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{lCard.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          7. CPU, GPU, AND HYBRID RENDERING ENGINES
         ==================================================== */}
      <div id="rendering-engines" ref={renderingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{vrayData.engines.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.engines.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.engines.description}
          </p>
        </div>

        {/* Engine Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveEngineTab('gpu')}
              className={`pb-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeEngineTab === 'gpu'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              V-Ray GPU (RTX Accelerated)
            </button>
            <button
              onClick={() => setActiveEngineTab('cpu')}
              className={`pb-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeEngineTab === 'cpu'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              V-Ray CPU (Production Standard)
            </button>
            <button
              onClick={() => setActiveEngineTab('hybrid')}
              className={`pb-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeEngineTab === 'hybrid'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Hybrid (CPU + GPU Combined)
            </button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
          {activeEngineTab === 'gpu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">{vrayData.engines.gpu.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{vrayData.engines.gpu.desc}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  NVIDIA RTX Powered
                </span>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100">
                {vrayData.engines.gpu.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeEngineTab === 'cpu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">{vrayData.engines.cpu.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{vrayData.engines.cpu.desc}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Unlimited RAM Capacity
                </span>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100">
                {vrayData.engines.cpu.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeEngineTab === 'hybrid' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">{vrayData.engines.hybrid.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{vrayData.engines.hybrid.desc}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  Combined Hardware Scaling
                </span>
              </div>
              <ul className="space-y-2 pt-2 border-t border-slate-100">
                {vrayData.engines.hybrid.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          <em>{vrayData.engines.disclaimer}</em>
        </div>
      </div>

      {/* ====================================================
          8. REAL-TIME MEETS PHOTOREALISM
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-3.5 h-3.5" />
              <span>{vrayData.interactive.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.interactive.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.interactive.description}
            </p>

            <ul className="space-y-2.5 pt-2">
              {vrayData.interactive.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={vrayData.interactive.image}
                alt="Interactive real-time visualization in V-Ray"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          9. MATERIALS AND TEXTURES
         ==================================================== */}
      <div id="materials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{vrayData.materials.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.materials.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.materials.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrayData.materials.cards.map((mCard, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                {idx === 0 && <Layers className="w-5 h-5" />}
                {idx === 1 && <Droplet className="w-5 h-5" />}
                {idx === 2 && <Sparkles className="w-5 h-5" />}
                {idx === 3 && <Stamp className="w-5 h-5" />}
                {idx === 4 && <Compass className="w-5 h-5" />}
                {idx === 5 && <Feather className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-black text-slate-950">{mCard.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{mCard.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          10. CHAOS COSMOS ASSET LIBRARY
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Box className="w-3.5 h-3.5 text-blue-600" />
              <span>{vrayData.cosmos.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.cosmos.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.cosmos.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {vrayData.cosmos.categories.map((cat, idx) => (
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
                src={vrayData.cosmos.image}
                alt="Chaos Cosmos 3D asset library integration in V-Ray"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          11. ADVANCED SCENE MANAGEMENT & PROXIES
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{vrayData.sceneManagement.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.sceneManagement.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.sceneManagement.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vrayData.sceneManagement.cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                {idx === 0 && <Box className="w-5 h-5" />}
                {idx === 1 && <Maximize2 className="w-5 h-5" />}
                {idx === 2 && <Scissors className="w-5 h-5" />}
                {idx === 3 && <Cpu className="w-5 h-5" />}
              </div>
              <h3 className="text-base font-black text-slate-950">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          12. V-RAY FRAME BUFFER (VFB) POST-PROCESSING
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>{vrayData.postProcessing.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.postProcessing.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.postProcessing.description}
            </p>

            <ul className="space-y-2 pt-2">
              {vrayData.postProcessing.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={vrayData.postProcessing.image}
                alt="V-Ray Frame Buffer post-processing and Light Mix"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          13. RENDER ELEMENTS AND COMPOSITING
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{vrayData.renderElements.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.renderElements.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.renderElements.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrayData.renderElements.passes.map((pass, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                Pass #{idx + 1}
              </span>
              <h3 className="text-base font-black text-slate-950">{pass.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pass.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          14. ANIMATION AND CINEMATIC RENDERING
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5" />
                <span>{vrayData.animation.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {vrayData.animation.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {vrayData.animation.description}
              </p>

              <ul className="space-y-2.5 pt-2">
                {vrayData.animation.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src={vrayData.animation.image}
                  alt="Cinematic architectural animation rendered in V-Ray"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          15. DISTRIBUTED & CLOUD RENDERING
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>{vrayData.distributed.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.distributed.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.distributed.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vrayData.distributed.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2"
            >
              <div className="text-2xl font-black text-blue-600 font-mono">{st.number}</div>
              <h3 className="text-base font-black text-slate-950">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Cloud Rendering Callout Card */}
        <div className="mt-8 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Chaos Cloud Rendering
            </span>
            <h3 className="text-2xl font-black tracking-tight">{vrayData.cloudRendering.heading}</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {vrayData.cloudRendering.description}
            </p>
          </div>
          <button
            onClick={() => openQuoteModal('Chaos Cloud Rendering Credits')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
          >
            Enquire About Cloud Credits
          </button>
        </div>
      </div>

      {/* ====================================================
          16. AI-POWERED CREATION (VERAS & TEXTURES)
         ==================================================== */}
      <div id="ai-creation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{vrayData.aiCreation.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.aiCreation.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {vrayData.aiCreation.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vrayData.aiCreation.cards.map((aiCard, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {aiCard.tech}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{aiCard.status}</span>
                </div>
                <h3 className="text-base font-black text-slate-950">{aiCard.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{aiCard.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          <em>{vrayData.aiCreation.disclaimer}</em>
        </div>
      </div>

      {/* ====================================================
          17. CHAOS VANTAGE REAL-TIME EXPLORATION
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>{vrayData.vantage.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {vrayData.vantage.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {vrayData.vantage.description}
            </p>

            <ul className="space-y-2.5 pt-2">
              {vrayData.vantage.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={vrayData.vantage.image}
                alt="Chaos Vantage real-time ray tracing"
                className="w-full h-[360px] sm:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          18. SUPPORTED SOFTWARE INTEGRATIONS
         ==================================================== */}
      <div id="integrations" ref={integrationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Work With Your Favorite Tools</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            V-Ray Fits Into Your Existing 3D Workflow
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Deep integrations across the world's leading 3D modeling, CAD, BIM, and visual effects applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrayData.integrations.map(integ => (
            <div
              key={integ.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={integ.image}
                  alt={`${integ.name} integration in V-Ray`}
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
                    <strong>Versions:</strong> {integ.supportedVersions}
                  </div>
                  <div className="text-[11px] text-blue-600 font-semibold">
                    ★ {integ.keyAdvantage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          19. V-RAY & ENSCAPE WORKFLOW
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              {vrayData.vrayEnscapeWorkflow.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {vrayData.vrayEnscapeWorkflow.heading}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {vrayData.vrayEnscapeWorkflow.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <h3 className="text-base font-bold text-blue-400">Enscape Real-Time Exploration</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {vrayData.vrayEnscapeWorkflow.enscapeRole.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <h3 className="text-base font-bold text-amber-400">V-Ray High-End Production</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {vrayData.vrayEnscapeWorkflow.vrayRole.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          20. INDUSTRY APPLICATIONS
         ==================================================== */}
      <div id="applications" ref={applicationsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{vrayData.applications[0].title}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Render Across Industries and Creative Disciplines
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From iconic skyscraper visualizations to Hollywood feature films and consumer electronics packaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vrayData.applications.map(app => (
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
                    {app.id === 'product' && <Box className="w-5 h-5 text-blue-600" />}
                    {app.id === 'automotive' && <Car className="w-5 h-5 text-blue-600" />}
                    {app.id === 'animation' && <Film className="w-5 h-5 text-blue-600" />}
                    {app.id === 'industrial' && <Wrench className="w-5 h-5 text-blue-600" />}
                    <h3 className="text-base font-black text-slate-950">{app.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{app.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Deliverables:
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
          21. MULTI-DISCIPLINE SHOWCASES (ARCHVIZ, PRODUCT, VFX)
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-16">
        {/* ArchViz Showcase */}
        <div>
          <div className="mb-6 space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              {vrayData.showcases.archViz.eyebrow}
            </span>
            <h3 className="text-2xl font-black text-slate-950">{vrayData.showcases.archViz.heading}</h3>
            <p className="text-xs sm:text-sm text-slate-600">{vrayData.showcases.archViz.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vrayData.showcases.archViz.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Design Showcase */}
        <div>
          <div className="mb-6 space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              {vrayData.showcases.productDesign.eyebrow}
            </span>
            <h3 className="text-2xl font-black text-slate-950">{vrayData.showcases.productDesign.heading}</h3>
            <p className="text-xs sm:text-sm text-slate-600">{vrayData.showcases.productDesign.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vrayData.showcases.productDesign.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================
          22. WORKFLOW OVERVIEW TIMELINE
         ==================================================== */}
      <div id="workflow" ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{vrayData.workflow.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.workflow.heading}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            A flexible, non-destructive pipeline connecting 3D geometry to final cinema-quality output.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {vrayData.workflow.steps.map((st, idx) => (
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
          23. PLANS AND LICENSING
         ==================================================== */}
      <div id="plans" ref={plansRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Plans & Licensing</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Find the Right V-Ray Plan for Your Workflow
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Chaos provides flexible licensing configurations for individual visualizers, multi-disciplinary practices, and animation studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vrayData.plans.map(plan => (
            <div
              key={plan.id}
              className="p-7 rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xs flex flex-col justify-between transition-all"
            >
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-950">{plan.name}</h3>
                  <div className="text-xs font-semibold mt-0.5 text-blue-600">
                    {plan.tagline}
                  </div>
                  <p className="text-xs mt-2 leading-relaxed text-slate-600">
                    {plan.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-bold text-slate-900">Contact Us for Current Quote</div>
                  <div className="text-[10px] text-slate-500">
                    Commercial & educational quotes with GST compliance
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Plan Inclusions:</div>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                        <span className="text-slate-600">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={() => openQuoteModal(`Chaos ${plan.name}`)}
                  className="w-full py-3 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Enquire About Licensing</span>
                </button>

                <a
                  href={plan.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[11px] font-semibold hover:underline text-slate-500"
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
          24. FREE TRIAL BANNER
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              30-Day Full-Featured Trial
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {vrayData.freeTrial.heading}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {vrayData.freeTrial.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href={vrayData.freeTrial.trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => openQuoteModal('V-Ray Trial Guidance')}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Request Product Guidance</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          25. SYSTEM REQUIREMENTS & COMPATIBILITY
         ==================================================== */}
      <div id="requirements" ref={requirementsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-blue-600" />
            <span>Technical Validation</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.systemRequirements.heading}
          </h2>
          <p className="text-slate-600 text-sm">
            {vrayData.systemRequirements.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Operating System</div>
              <div className="sm:col-span-2 text-slate-900 font-medium">
                {vrayData.systemRequirements.os}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Supported Host Applications</div>
              <div className="sm:col-span-2 text-slate-900">
                {vrayData.systemRequirements.hosts}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Processor (CPU)</div>
              <div className="sm:col-span-2 text-slate-900">
                {vrayData.systemRequirements.cpu}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Graphics Card (GPU)</div>
              <div className="sm:col-span-2 text-slate-900 font-semibold text-blue-600">
                {vrayData.systemRequirements.gpu}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">GPU VRAM Guidance</div>
              <div className="sm:col-span-2 text-slate-900">
                {vrayData.systemRequirements.gpuMemory}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">System RAM</div>
              <div className="sm:col-span-2 text-slate-900">
                {vrayData.systemRequirements.ram}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
              <div className="font-bold text-slate-700">Storage</div>
              <div className="sm:col-span-2 text-slate-900">
                {vrayData.systemRequirements.storage}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a
            href={vrayData.systemRequirements.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center space-x-1"
          >
            <span>View Official Chaos V-Ray System Requirements Documentation</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ====================================================
          26. LEARNING & SUPPORT RESOURCES
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>{vrayData.learning.eyebrow}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            {vrayData.learning.heading}
          </h2>
          <p className="text-slate-600 text-sm">
            {vrayData.learning.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vrayData.learning.resources.map((res, idx) => (
            <a
              key={idx}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-2 group block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                  {res.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{res.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ====================================================
          27. VISUAL GALLERY WITH LIGHTBOX
         ==================================================== */}
      <div id="gallery" ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>V-Ray Showcase</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Explore the Possibilities of Photorealistic Rendering
          </h2>
          <p className="text-slate-600 text-sm">
            High-fidelity imagery rendered using Chaos V-Ray ray-tracing engine. Click any render to inspect details.
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
                  {selectedGalleryItem.categoryLabel} Rendering
                </span>
                <h3 className="text-lg font-bold">{selectedGalleryItem.title}</h3>
                <p className="text-xs text-slate-300">{selectedGalleryItem.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================
          28. FREQUENTLY ASKED QUESTIONS (FAQ)
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
            Everything you need to know about Chaos V-Ray rendering technology, licensing plans, and hardware scaling.
          </p>
        </div>

        <div className="space-y-3">
          {vrayData.faqs.map((faq, idx) => (
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
          29. FINAL HIGH-IMPACT CTA SECTION
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BRING YOUR VISION TO LIFE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Create Without Limits. Render With V-Ray.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Explore photorealistic rendering, advanced creative controls, and flexible production workflows with V-Ray. Talk to our team to find the suitable license for your software, hardware, and project requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => scrollTo(enquiryRef, 'enquiry')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>
            <a
              href={vrayData.hero.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Official Chaos Site</span>
            </a>
          </div>
        </div>
      </div>

      {/* ====================================================
          30. PROFESSIONAL ENQUIRY FORM SECTION
         ==================================================== */}
      <div id="enquiry" ref={enquiryRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Official Licensing Enquiry
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-1">
              Request Chaos V-Ray Consultation & Quote
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Connect with Leniva CAD Solutions for commercial licensing, educational institutional quotes, floating network setups, and local technical onboarding across India.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Thank You for Your Enquiry!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our team will contact you shortly.
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
                      placeholder="e.g. Ar. Vikram Seth"
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
                      placeholder="e.g. Pixel Forge Visuals"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry</label>
                    <select
                      value={enquiryForm.industry}
                      onChange={e => setEnquiryForm({ ...enquiryForm, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="Architecture">Architecture</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Product Design">Product Design</option>
                      <option value="Animation">Animation</option>
                      <option value="Visual Effects">Visual Effects</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Host Application</label>
                    <select
                      value={enquiryForm.hostApplication}
                      onChange={e => setEnquiryForm({ ...enquiryForm, hostApplication: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="3ds Max">3ds Max</option>
                      <option value="SketchUp">SketchUp</option>
                      <option value="Rhino">Rhino</option>
                      <option value="Revit">Revit</option>
                      <option value="Cinema 4D">Cinema 4D</option>
                      <option value="Maya">Maya</option>
                      <option value="Houdini">Houdini</option>
                      <option value="Nuke">Nuke</option>
                      <option value="Unreal Engine">Unreal Engine</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Interested Plan</label>
                    <select
                      value={enquiryForm.interestedPlan}
                      onChange={e => setEnquiryForm({ ...enquiryForm, interestedPlan: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="V-Ray Solo">V-Ray Solo (Fixed Seat)</option>
                      <option value="V-Ray Premium">V-Ray Premium (Floating)</option>
                      <option value="V-Ray Collection">V-Ray Enterprise / Collection</option>
                      <option value="Educational">Educational License</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={enquiryForm.country}
                      onChange={e => setEnquiryForm({ ...enquiryForm, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Project Requirements</label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Tell us about your workstation specs, team size, or rendering workflow needs..."
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

export default VRayPage
