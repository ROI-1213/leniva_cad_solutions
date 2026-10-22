import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Box,
  ExternalLink,
  Sun,
  Check,
  X,
  Send,
  Maximize2,
  Search,
  Download,
  Info,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  coronaData,
  CoronaGalleryItem,
} from '../data/coronaData'

export const CoronaPage: React.FC = () => {
  const { openQuoteModal, submitQuote } = useApp()

  // Sticky sub-nav active section
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Gallery filter & lightbox
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>('all')
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<CoronaGalleryItem | null>(null)

  // Interactive 5-Stage Workflow
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(1)

  // Interactive LightMix Scenario
  const [activeLighting, setActiveLighting] = useState<string>('daylight')

  // Interactive Denoising Slider (0 to 100)
  const [denoiseSlider, setDenoiseSlider] = useState<number>(50)

  // Interactive Searchable FAQs
  const [faqSearch, setFaqSearch] = useState<string>('')
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Embedded enquiry form state (All 13 fields requested in prompt)
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    company: '',
    workEmail: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    hostApplication: 'Both (3ds Max & Cinema 4D)',
    intendedUse: 'Architectural Visualization Studio',
    licenseType: 'Floating Team License',
    planOfInterest: 'Corona Premium',
    numberOfLicenses: '1',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Section Refs for Smooth Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<HTMLDivElement>(null)
  const lightmixRef = useRef<HTMLDivElement>(null)
  const denoisingRef = useRef<HTMLDivElement>(null)
  const vantageRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const hostAppsRef = useRef<HTMLDivElement>(null)
  const requirementsRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
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
    document.title = 'Chaos Corona | Photorealistic Architectural Rendering Software | Leniva CAD Solutions'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore Chaos Corona, photorealistic CPU rendering software for Autodesk 3ds Max and Maxon Cinema 4D. Experience physically accurate lighting, interactive LightMix, intelligent denoising, and seamless architectural visualization.'
      )
    }
    window.scrollTo(0, 0)
  }, [])

  // Filtered FAQs
  const faqCategories = ['All', 'General', 'Compatibility', 'Rendering Engine', 'Licensing & Terms', 'Workflows & AI']
  const filteredFaqs = coronaData.faqs.filter(faq => {
    const matchesCategory = selectedFaqCategory === 'All' || faq.category === selectedFaqCategory
    const matchesSearch =
      faqSearch.trim() === '' ||
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Filtered Gallery Items
  const filteredGallery =
    activeGalleryCat === 'all'
      ? coronaData.gallery
      : coronaData.gallery.filter(item => item.category === activeGalleryCat)

  // Current Lighting Scenario
  const currentScenario =
    coronaData.lightingScenarios.find(s => s.id === activeLighting) || coronaData.lightingScenarios[0]

  // Form Submit Handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!enquiryForm.fullName.trim() || !enquiryForm.workEmail.trim() || !enquiryForm.phone.trim()) {
      setFormError('Please complete your name, work email address, and phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      if (submitQuote) {
        await submitQuote({
          fullName: enquiryForm.fullName,
          company: enquiryForm.company || 'Individual / Studio',
          email: enquiryForm.workEmail,
          phone: enquiryForm.phone,
          productOrService: `Chaos Corona (${enquiryForm.planOfInterest})`,
          quantity: enquiryForm.numberOfLicenses,
          application: `[Host App]: ${enquiryForm.hostApplication} | [License Type]: ${enquiryForm.licenseType} | [Intended Use]: ${enquiryForm.intendedUse} | [Location]: ${enquiryForm.city}, ${enquiryForm.state}, ${enquiryForm.country}`,
          message: enquiryForm.message,
        })
      }
      setIsSubmitted(true)
    } catch (err) {
      setFormError('There was an issue submitting your enquiry. Please contact sales directly at contact@lenivacadsolution.in')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-red-500/20 selection:text-red-900">
      {/* ====================================================
          1. BREADCRUMBS & TOP BRAND STRIP
         ==================================================== */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80 text-xs text-slate-500 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/cad-software" className="hover:text-red-600 transition-colors">CAD & Visualization Software</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Chaos</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Chaos Corona</span>
        </div>
      </nav>

      {/* ====================================================
          2. STICKY SUB-NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm font-black tracking-tight text-slate-950 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Chaos Corona
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full border border-amber-300">
              CPU ArchViz Renderer
            </span>
          </div>

          {/* Quick Jump Links */}
          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-1 text-xs font-semibold text-slate-600 overflow-x-auto no-scrollbar py-1.5 lg:py-1 border-t lg:border-t-0 border-slate-100">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'benefits', label: 'Why Corona', ref: benefitsRef },
              { id: 'workflow', label: '5-Stage Workflow', ref: workflowRef },
              { id: 'engine', label: 'CPU Engine', ref: engineRef },
              { id: 'lightmix', label: 'LightMix™', ref: lightmixRef },
              { id: 'denoising', label: 'Denoising & Vantage', ref: denoisingRef },
              { id: 'materials', label: 'Materials & Assets', ref: materialsRef },
              { id: 'requirements', label: 'Specs', ref: requirementsRef },
              { id: 'pricing', label: 'Plans & Licensing', ref: pricingRef },
              { id: 'gallery', label: 'Gallery', ref: galleryRef },
              { id: 'faqs', label: 'FAQs', ref: faqRef },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.ref, item.id)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeSection === item.id
                    ? 'text-red-600 bg-red-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <a
              href={coronaData.identity.trialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>30-Day Trial</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={() => scrollTo(enquiryRef, 'enquiry')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          3. CINEMATIC HERO SECTION
         ==================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200/90 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-8 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/chaos.jpg" alt="Chaos" className="h-full w-auto max-w-[80px] object-contain" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-mono font-bold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  {coronaData.hero.eyebrow}
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
                  Unmatched Photorealism with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-red-600">
                    Chaos Corona
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
                  {coronaData.hero.supportingText}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {coronaData.hero.mainDescription}
              </p>

              {/* Hero Key Highlights Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {coronaData.hero.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={coronaData.identity.trialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Start 30-Day Free Trial</span>
                </a>
                <button
                  onClick={() => scrollTo(pricingRef, 'pricing')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <span>Explore Plans & Licensing</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
                <button
                  onClick={() => openQuoteModal('Chaos Corona Official Demonstration')}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-slate-600 hover:text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Watch Product Demo</span>
                </button>
              </div>

              {/* Trust & Verification Badges */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <span>Chaos Authorized Partner India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-700" />
                  <span>Multi-Core CPU Native</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-slate-700" />
                  <span>3ds Max & Cinema 4D</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Visual Showcase Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 group bg-slate-900 aspect-4/3 sm:aspect-16/10">
                <img
                  src={coronaData.hero.heroImage}
                  alt="Chaos Corona Photorealistic Architectural Villa Rendering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Architectural Badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Corona 4K Path-Traced Render</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-900 shadow-lg flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 block">
                      Architectural Case Study
                    </span>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Modern Cantilever Villa • Natural Sun & Sky
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">Host Engine</span>
                    <span className="text-xs font-bold text-slate-800">Autodesk 3ds Max</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PUBLISHED METRICS & PRODUCT OVERVIEW
         ==================================================== */}
      <section ref={overviewRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Chaos-Published Product Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Intuitive Rendering. Perfect in Every Detail.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Chaos Corona is a dedicated renderer for Autodesk 3ds Max and Cinema 4D, designed to make photorealistic visualization accessible through an intuitive workflow. It combines physically plausible rendering, realistic lighting, artist-focused controls and integrated tools that support architectural visualization from scene creation through final output.
            </p>
          </div>

          {/* 4 Stat Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coronaData.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-1 shadow-2xs hover:border-red-300 transition-colors"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-slate-800">{m.label}</div>
                <div className="text-[10px] text-slate-500">{m.note}</div>
              </div>
            ))}
          </div>

          {/* 6 Overview Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {coronaData.overviewCards.map(card => (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {card.subtitle}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. WHY CHAOS CORONA? (6 BENEFITS)
         ==================================================== */}
      <section ref={benefitsRef} className="py-16 bg-slate-100/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              The Visualization Artist’s Renderer
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Less Technical Setup. More Creative Momentum.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Corona is designed to help artists focus on the visual outcome rather than complex technical setup. Smart defaults, intuitive controls and integrated scene tools help users move seamlessly from concept to presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coronaData.whyCorona.map((b, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${b.accent} bg-slate-50`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-950">{b.title}</h3>
                    <span className="text-[11px] font-mono text-slate-400 block">{b.tagline}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. COMPLETE CREATIVE WORKFLOW (5 STAGES)
         ==================================================== */}
      <section ref={workflowRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              End-to-End Creative Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              From First Concept to Final Presentation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experience Corona as an interconnected 5-stage visualization workflow engineered to preserve momentum and unlock photorealism at every milestone.
            </p>
          </div>

          {/* Stage Selector Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {coronaData.workflowStages.map(stage => (
              <button
                key={stage.step}
                onClick={() => setActiveWorkflowStage(stage.step)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeWorkflowStage === stage.step
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  0{stage.step}
                </span>
                <span>{stage.title.split(': ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Display Panel */}
          {(() => {
            const currentStage =
              coronaData.workflowStages.find(s => s.step === activeWorkflowStage) ||
              coronaData.workflowStages[0]
            return (
              <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-mono font-bold text-xs">
                      {currentStage.title}
                    </span>
                    {currentStage.ecosystemTool && (
                      <span className="text-xs font-mono text-slate-500">
                        Powered by {currentStage.ecosystemTool}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    {currentStage.heading}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentStage.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {currentStage.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => openQuoteModal(`Chaos Corona — ${currentStage.title}`)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <span>Enquire About Pipeline Implementation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src={currentStage.visual}
                    alt={currentStage.heading}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-white/95 border-t border-slate-200 text-[11px] text-slate-600 italic">
                    {currentStage.caption}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ====================================================
          7. PHOTOREALISTIC CPU RENDERING ENGINE
         ==================================================== */}
      <section ref={engineRef} className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Core CPU Ray Tracing Technology
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Realism Built for Architectural Visualization
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Corona is an advanced CPU-based renderer engineered to deliver predictable, reliable, and physically plausible results. Its rendering pipeline harmonizes light transport, physical shaders, and intuitive artist controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coronaData.engineFeatures.map((f, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-amber-400/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. INTERACTIVE LIGHTMIX™ STUDIO
         ==================================================== */}
      <section ref={lightmixRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold uppercase">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Corona Signature Technology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Explore Multiple Lighting Scenarios from One Render
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              LightMix allows users to adjust the intensity, color temperature, and mood of lights directly in the Corona Virtual Frame Buffer. Produce daylight, golden hour, evening, and night scenes without recalculating!
            </p>
          </div>

          {/* Interactive LightMix Demo Component */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                  Interactive Simulator (Website Preview)
                </span>
                <h3 className="text-lg font-bold text-white">Corona Virtual Frame Buffer LightMix</h3>
              </div>

              {/* Lighting Mode Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {coronaData.lightingScenarios.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveLighting(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeLighting === s.id
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Preview */}
              <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-16/10 bg-slate-950 border border-slate-800">
                <img
                  src={currentScenario.image}
                  alt={currentScenario.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-amber-300 border border-amber-500/30">
                  {currentScenario.title} • {currentScenario.colorTemp}
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg text-xs text-slate-200">
                  <span className="font-bold text-white">{currentScenario.atmosphere}:</span> {currentScenario.description}
                </div>
              </div>

              {/* Simulated LightMix Channel Sliders */}
              <div className="lg:col-span-4 space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Active LightMix Channels
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Environment / Sun:</span>
                      <span className="font-mono text-amber-400">
                        {activeLighting === 'daylight' ? '1.00 (Pure Day)' : activeLighting === 'golden-hour' ? '0.65 (Warm Sun)' : '0.05 (Dark Dusk)'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: activeLighting === 'daylight' ? '100%' : activeLighting === 'golden-hour' ? '65%' : '10%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Interior Spotlights:</span>
                      <span className="font-mono text-amber-400">
                        {activeLighting === 'evening-interior' ? '1.20 (Warm 2800K)' : activeLighting === 'dramatic-architectural' ? '0.90' : '0.20'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: activeLighting === 'evening-interior' ? '100%' : activeLighting === 'dramatic-architectural' ? '80%' : '20%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Architectural Facade Accents:</span>
                      <span className="font-mono text-amber-400">
                        {activeLighting === 'dramatic-architectural' ? '1.50 (High Accent)' : '0.30'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full transition-all duration-500"
                        style={{ width: activeLighting === 'dramatic-architectural' ? '100%' : '25%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <p>✓ Zero re-rendering time required.</p>
                  <p>✓ Save lighting setups as presets.</p>
                  <p>✓ Bake settings directly back to scene lights.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. DENOISING & CHAOS VANTAGE REAL-TIME EXPLORATION
         ==================================================== */}
      <section ref={denoisingRef} className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Denoising Sub-section */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                Production Acceleration
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {coronaData.denoising.heading}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {coronaData.denoising.description}
              </p>
              <div className="inline-block p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg font-mono">
                {coronaData.denoising.reportedSavings}*
              </div>
            </div>

            {/* Denoising Split Slider Visual */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                  {/* Clean Denoised Image */}
                  <img
                    src={coronaData.denoising.afterImage}
                    alt="Clean Denoised Corona Render"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Raw Noisy Image clipped by slider percentage */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${denoiseSlider}%` }}
                  >
                    <img
                      src={coronaData.denoising.beforeImage}
                      alt="Raw Noisy Pass Render"
                      className="absolute inset-0 w-full h-full object-cover filter contrast-125"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] px-2.5 py-1 rounded">
                      Raw Render Pass (Noise Present)
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-emerald-900/80 text-emerald-200 font-mono text-[10px] px-2.5 py-1 rounded">
                    Denoised Presentation Clean
                  </div>

                  {/* Vertical Dividing Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${denoiseSlider}%` }}
                  />
                </div>

                {/* Slider Input Control */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>← Drag to reveal raw pass</span>
                    <span className="font-bold text-slate-900">{denoiseSlider}% Split</span>
                    <span>Reveal clean denoised →</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={denoiseSlider}
                    onChange={e => setDenoiseSlider(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Denoiser Choices */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="font-bold text-base text-slate-950">Integrated Denoiser Engines</h3>
                <div className="space-y-3">
                  {coronaData.denoising.options.map((opt, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{opt.name}</span>
                        <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                          {opt.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{opt.description}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  *{coronaData.denoising.reportedNote}
                </p>
              </div>
            </div>
          </div>

          {/* Chaos Vantage Real-Time Exploration Sub-section */}
          <div ref={vantageRef} className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold uppercase">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>GPU Real-Time Ray Tracing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {coronaData.vantageIntegration.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {coronaData.vantageIntegration.description}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-amber-500/40 text-xs text-amber-200">
                <Info className="w-4 h-4 inline mr-1 text-amber-400" />
                {coronaData.vantageIntegration.note}
              </div>
              <div className="space-y-2 pt-2">
                {coronaData.vantageIntegration.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-16/10 border border-slate-700 shadow-xl">
              <img
                src={coronaData.vantageIntegration.image}
                alt="Chaos Vantage Real-Time GPU Ray Tracing with Corona"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-cyan-950/90 text-cyan-200 text-[10px] font-mono px-3 py-1 rounded-md border border-cyan-700">
                Vantage Live Link Navigation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. SCENE CREATION & CONTENT TOOLS (7 CARDS)
         ==================================================== */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Procedural & Environmental Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Build Rich Scenes with Less Manual Work
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Corona provides advanced scene-building tools and direct access to render-ready content libraries that empower visualizers to construct detailed natural and architectural environments with minimal repetitive setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {coronaData.contentTools.map(tool => (
              <div
                key={tool.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-red-300 hover:shadow-md transition-all duration-300 space-y-2.5"
              >
                <div className="w-9 h-9 rounded-xl bg-white text-red-600 flex items-center justify-center shadow-2xs border border-slate-200">
                  <Box className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-950">{tool.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          11. MATERIALS & TEXTURES GALLERY
         ==================================================== */}
      <section ref={materialsRef} className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Physically Plausible Shaders
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Bring Every Surface to Life
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Corona supports realistic material creation and rendering for architectural surfaces, furniture, fixtures and environmental elements. Explore surface response across curated architectural materials.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {coronaData.materialsShowcase.map((mat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all group"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
                    {mat.category}
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-950 group-hover:text-red-600 transition-colors">
                    {mat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {mat.description}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block pt-1 border-t border-slate-100">
                    {mat.surfaceResponse}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. POST-PRODUCTION & CRYPTOMATTE
         ==================================================== */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Compositing & Render Passes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {coronaData.postProduction.heading}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {coronaData.postProduction.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coronaData.postProduction.passes.map((pass, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <h3 className="font-extrabold text-sm text-slate-950">{pass.name}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{pass.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          13. SUPPORTED HOST APPLICATIONS & SYSTEM REQUIREMENTS
         ==================================================== */}
      <section ref={requirementsRef} className="py-16 bg-slate-100/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Host Applications Cards */}
          <div ref={hostAppsRef} className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                Industry-Standard 3D Integrations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Designed for Autodesk 3ds Max & Maxon Cinema 4D
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coronaData.hostApplications.map(app => (
                <div
                  key={app.slug}
                  className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-950">{app.name}</h3>
                      <span className="text-xs font-mono text-red-600 font-bold block">{app.versionSupport}</span>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200">
                      {app.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                      Target Workflows:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {app.useCases.map((uc, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-700 text-xs rounded-md border border-slate-200">
                          {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured System Requirements Table */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950">Official System Requirements</h3>
                <p className="text-xs text-slate-500">
                  Last verified against official Chaos Help Center specifications (October 2026).
                </p>
              </div>
              <a
                href={coronaData.identity.systemReqUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
              >
                <span>Check Live Chaos Documentation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono text-[10px]">
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Officially Listed Requirement</th>
                    <th className="py-2.5 px-3">Architectural Guidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coronaData.systemRequirements.map((req, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{req.category}</td>
                      <td className="py-3 px-3 text-slate-700 font-mono">{req.specification}</td>
                      <td className="py-3 px-3 text-slate-500">{req.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          14. PLANS & PRICING
         ==================================================== */}
      <section ref={pricingRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Commercial & Studio Licensing
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Flexible Plans Built for Architectural Studios
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Leniva CAD Solutions provides official Chaos Corona licensing for visualization artists, interior firms, and design studios across India. Contact our team for current authorized INR quotes and multi-seat packages.
            </p>
          </div>

          {/* 3 Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {coronaData.plans.map(plan => (
              <div
                key={plan.id}
                className="rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative bg-white border border-slate-200 hover:border-slate-300 shadow-xs"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="pt-2 pb-3 border-y border-slate-200/80 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">{plan.licenseType}</span>
                    <span className="text-[11px] text-slate-500">{plan.billingTerm}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={() => {
                      setEnquiryForm(prev => ({ ...prev, planOfInterest: plan.name }))
                      scrollTo(enquiryRef, 'enquiry')
                    }}
                    className="w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                  >
                    <span>Request Official Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={plan.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[11px] text-slate-500 hover:text-red-600 transition-colors"
                  >
                    View Official Chaos Plan Page →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Corona Render Nodes Card */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Network Rendering Scalability
              </span>
              <h3 className="text-xl font-black text-white">{coronaData.renderNodes.heading}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {coronaData.renderNodes.description}
              </p>
            </div>
            <button
              onClick={() => openQuoteModal('Corona Render Nodes Volume License Pack')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              {coronaData.renderNodes.cta}
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          15. FREE TRIAL CALLOUT BANNER
         ==================================================== */}
      <section className="py-12 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Start Creating with a 30-Day Free Trial
            </h3>
            <p className="text-xs sm:text-sm text-red-100">
              Download the fully functional evaluation trial directly from Chaos. Test all features with Autodesk 3ds Max and Maxon Cinema 4D.
            </p>
          </div>
          <a
            href={coronaData.identity.trialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-white text-red-600 hover:bg-red-50 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all shrink-0"
          >
            Start Your Free Trial →
          </a>
        </div>
      </section>

      {/* ====================================================
          16. FILTERABLE RENDER GALLERY & LIGHTBOX
         ==================================================== */}
      <section ref={galleryRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Inspiration & Production Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Get Inspired by Beautiful Renders Created with Corona
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore photorealistic visualization projects spanning luxury residences, commercial atriums, and atmospheric architectural lighting studies.
            </p>
          </div>

          {/* Gallery Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'interiors', label: 'Luxury Interiors' },
              { id: 'exteriors', label: 'Residential Exteriors' },
              { id: 'commercial', label: 'Commercial Architecture' },
              { id: 'hospitality', label: 'Hospitality & Dining' },
              { id: 'lighting', label: 'Lighting Studies' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeGalleryCat === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                onClick={() => setSelectedGalleryItem(item as CoronaGalleryItem)}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 font-bold text-xs flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Fullscreen</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-600 font-bold">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGalleryItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            className="max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative text-white"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-16/10 bg-black">
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold uppercase">
                  {selectedGalleryItem.categoryLabel} • {selectedGalleryItem.project}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">{selectedGalleryItem.title}</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedGalleryItem.caption}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedGalleryItem(null)
                  openQuoteModal(`Corona Visual Study: ${selectedGalleryItem.title}`)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Enquire for Similar Visuals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          17. CUSTOMER TESTIMONIALS (EXACT OFFICIAL QUOTES)
         ==================================================== */}
      <section className="py-16 bg-slate-100/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Artist Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              What Artists Say About Corona
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Official quotations from world-renowned architectural visualizers, creative directors, and studio founders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coronaData.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">
                      {t.role}, <span className="font-semibold text-slate-700">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          18. LEARNING RESOURCES & COMMUNITY
         ==================================================== */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Master Corona
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Learn Corona. Build Your Skills.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Chaos provides comprehensive learning materials, video masterclasses, tutorials, and community support to help artists accelerate their rendering proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coronaData.learningResources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-red-300 hover:bg-red-50/20 transition-all duration-300 space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                    {res.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-slate-950 group-hover:text-red-600 transition-colors">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          19. FACTUAL PRODUCT COMPARISON (CORONA VS VANTAGE VS V-RAY)
         ==================================================== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Architectural Workflow Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Corona Within Your Workflow
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Factual, objective comparison of Chaos visualization tools to help your studio select the ideal solution.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 font-bold text-red-700">Chaos Corona</th>
                  <th className="py-3 px-4 font-bold text-cyan-700">Chaos Vantage</th>
                  <th className="py-3 px-4 font-bold text-amber-700">Chaos V-Ray</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coronaData.comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{row.aspect}</td>
                    <td className="py-3 px-4 text-slate-800 bg-red-50/20 font-medium">{row.corona}</td>
                    <td className="py-3 px-4 text-slate-600">{row.vantage}</td>
                    <td className="py-3 px-4 text-slate-600">{row.vray}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          20. SEARCHABLE ACCORDION FAQS (ALL 19 OFFICIAL FAQS)
         ==================================================== */}
      <section ref={faqRef} className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Official answers regarding compatibility, CPU path tracing, LightMix, licensing, and trial terms.
            </p>
          </div>

          {/* FAQ Search & Category Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Corona questions (e.g. LightMix, CPU vs GPU, macOS, trial)..."
                value={faqSearch}
                onChange={e => setFaqSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedFaqCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200/90 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      <div className="pt-2">{faq.a}</div>
                      <span className="inline-block mt-2 text-[10px] font-mono text-slate-400 uppercase">
                        Category: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          21. COMPREHENSIVE ENQUIRY & QUOTATION FORM
         ==================================================== */}
      <section ref={enquiryRef} className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
              Authorized Licensing & Sales
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Bring Your Architectural Vision to Life
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore Chaos Corona for your visualization workflow. Contact Leniva CAD Solutions for authorized Indian quotes, floating team licenses, educational discounts, and pipeline assistance.
            </p>
          </div>

          <div className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You for Your Enquiry!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-5">
                {formError && (
                  <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.fullName}
                      onChange={e => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      placeholder="e.g. Ar. Rajesh Mehta"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Company / Studio
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.company}
                      onChange={e => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                      placeholder="Studio / Firm Name"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.workEmail}
                      onChange={e => setEnquiryForm({ ...enquiryForm, workEmail: e.target.value })}
                      placeholder="name@studio.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">Country</label>
                    <input
                      type="text"
                      value={enquiryForm.country}
                      onChange={e => setEnquiryForm({ ...enquiryForm, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">State</label>
                    <input
                      type="text"
                      value={enquiryForm.state}
                      onChange={e => setEnquiryForm({ ...enquiryForm, state: e.target.value })}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">City</label>
                    <input
                      type="text"
                      value={enquiryForm.city}
                      onChange={e => setEnquiryForm({ ...enquiryForm, city: e.target.value })}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Host Application
                    </label>
                    <select
                      value={enquiryForm.hostApplication}
                      onChange={e => setEnquiryForm({ ...enquiryForm, hostApplication: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    >
                      <option value="Autodesk 3ds Max">Autodesk 3ds Max</option>
                      <option value="Maxon Cinema 4D">Maxon Cinema 4D</option>
                      <option value="Both (3ds Max & Cinema 4D)">Both (3ds Max & Cinema 4D)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      Plan of Interest
                    </label>
                    <select
                      value={enquiryForm.planOfInterest}
                      onChange={e => setEnquiryForm({ ...enquiryForm, planOfInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    >
                      <option value="Corona Solo">Corona Solo (Single Workstation)</option>
                      <option value="Corona Premium">Corona Premium (Floating Team)</option>
                      <option value="Corona Collection">Corona Collection (Vantage + Anima)</option>
                      <option value="Corona Render Nodes">Corona Render Nodes Pack</option>
                      <option value="Educational / Academic License">Educational / Academic</option>
                      <option value="Not Sure / Recommend Plan">Not Sure / Need Recommendation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">
                      License Type
                    </label>
                    <select
                      value={enquiryForm.licenseType}
                      onChange={e => setEnquiryForm({ ...enquiryForm, licenseType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    >
                      <option value="Floating Team License">Floating Team License</option>
                      <option value="Individual Named License">Individual Named License</option>
                      <option value="Educational License">Educational License</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    Project Details / Specific Licensing Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Describe your studio's current 3D pipeline, number of artist seats, or specific questions..."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-500">
                    🔒 Authorized Indian Reseller • GST Invoicing Available
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Consultation & Quote</span>
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
          22. RELATED CHAOS PRODUCTS
         ==================================================== */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                Explore More Solutions
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Complementary Software in Our Catalog
              </h3>
            </div>
            <Link
              to="/products/cad-software"
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <span>View All Software</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Chaos V-Ray',
                badge: 'Photorealistic Production',
                desc: 'Universal ray-tracing engine supporting 3ds Max, Maya, SketchUp, Rhino, Revit, and Unreal.',
                route: '/products/vray',
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Chaos Enscape',
                badge: 'Real-Time BIM & VR',
                desc: 'Instant real-time rendering and virtual reality walkthroughs directly inside Revit, SketchUp, and Rhino.',
                route: '/products/enscape',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'SketchUp Studio',
                badge: '3D Design & Modeling',
                desc: 'Intuitive 3D conceptual architectural design and documentation suite by Trimble.',
                route: '/products/sketchup-studio',
                image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'ARES Commander',
                badge: 'DWG Native 2D/3D CAD',
                desc: 'Cost-effective native DWG professional CAD software for drafting and construction plans.',
                route: '/products/ares-standard',
                image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
              },
            ].map((prod, idx) => (
              <Link
                key={idx}
                to={prod.route}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-red-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 text-white font-mono text-[9px] px-2 py-0.5 rounded backdrop-blur-xs">
                    {prod.badge}
                  </div>
                </div>
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug mt-1">{prod.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-red-600 pt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Product →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoronaPage
