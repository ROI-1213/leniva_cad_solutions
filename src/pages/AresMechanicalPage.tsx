import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Box,
  ExternalLink,
  Building2,
  Award,
  Check,
  Send,
  HelpCircle,
  Repeat,
  Crosshair,
  Wrench,
  Globe,
  FileCode,
  Layout,
  Zap,
  Terminal,
  Download,
  FileText,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { recordCustomerEnquiry } from '../utils/cloudSync'
import { aresMechanicalData as defaultAresMechanicalData } from '../data/aresMechanicalData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const AresMechanicalPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const { isEnabled, data: aresMechanicalData, edits: cadEdits } = useCadPageData('ares_mechanical', defaultAresMechanicalData)

  // State
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)
  const [activeStandardTab, setActiveStandardTab] = useState<string>('iso')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Mechanical Machinery & Tooling',
    currentSoftware: '',
    licensePreference: '1-Year Subscription with Trinity',
    seats: '1-5 Seats',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // Navigation Items (Filtered by enabled sections)
  const navItems = [
    isEnabled('hero') && { id: 'overview', label: 'Overview' },
    isEnabled('features') && { id: 'features', label: 'Features' },
    isEnabled('features') && { id: 'standards', label: 'Standards' },
    isEnabled('features') && { id: 'parts', label: 'Parts Libraries' },
    isEnabled('features') && { id: 'tools', label: 'Mechanical Tools' },
    isEnabled('features') && { id: 'dwg', label: 'DWG Compatibility' },
    isEnabled('features') && { id: 'workflow', label: 'Workflow' },
    isEnabled('features') && { id: 'applications', label: 'Applications' },
    isEnabled('features') && { id: 'comparison', label: 'Comparison' },
    isEnabled('licensing') && { id: 'licensing', label: 'Licensing' },
    isEnabled('requirements') && { id: 'requirements', label: 'Requirements' },
    isEnabled('faqs') && { id: 'faq', label: 'FAQ' },
  ].filter(Boolean) as { id: string; label: string }[]

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -120
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      await recordCustomerEnquiry({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        productOrService: `ARES Mechanical (${formData.seats || '1'} Seats, ${formData.timeline || 'Immediate'})`,
        quantity: formData.seats || '1',
        application: formData.standards || 'Mechanical CAD Drafting',
        timeline: formData.timeline || 'Immediate',
        message: formData.message || `Standard: ${formData.standards || 'ISO'} | Seats: ${formData.seats || '1'}`,
        source: 'ARES Mechanical Consultation Form',
        enquiryType: 'quote',
      })
    } catch (err) {
      console.warn('Enquiry submit error:', err)
    } finally {
      setFormLoading(false)
      setFormSubmitted(true)
    }
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* ====================================================
          1. BREADCRUMBS
         ==================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/products/cad-software" className="hover:text-blue-600 transition-colors">CAD Software</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-900 font-semibold">{aresMechanicalData.identity.productName}</span>
          </nav>
        </div>
      </div>

      {/* ====================================================
          2. STICKY SUB-NAVIGATION
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>{aresMechanicalData.identity.productName}</span>
              </span>
              <span className="hidden md:inline-flex px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-blue-50 text-blue-700 border border-blue-200">
                {aresMechanicalData.identity.brand} DWG
              </span>
            </div>

            {/* Scrollable nav items */}
            <div className="hidden lg:flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => openQuoteModal(`${aresMechanicalData.identity.productName} (${aresMechanicalData.identity.brand})`)}
                className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow"
              >
                <span>{cadEdits?.pricingCta || 'Request Quote'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile horizontal scroller */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================
          3. HERO SECTION (4)
         ==================================================== */}
      {isEnabled('hero') && (
        <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="h-11 sm:h-12 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xs flex items-center justify-center">
                    <img src="/images/brands/ares-cad.png" alt="ARES CAD" className="h-full w-auto max-w-[130px] sm:max-w-[150px] object-contain" />
                  </div>
                  <div className="h-11 sm:h-12 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xs flex items-center justify-center">
                    <img src="/images/brands/grabert.png" alt="Graebert" className="h-full w-auto max-w-[130px] sm:max-w-[150px] object-contain" />
                  </div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{aresMechanicalData.hero.eyebrow}</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {aresMechanicalData.hero.heading}
                </h1>

                <p className="text-base sm:text-lg font-medium text-slate-300">
                  {aresMechanicalData.identity.supportingHeadline}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {aresMechanicalData.hero.supportingText}
                </p>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {aresMechanicalData.hero.labels.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>{chip}</span>
                    </span>
                  ))}
                </div>

                {/* Info Strip */}
                {isEnabled('specStrip') && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800">
                    {aresMechanicalData.hero.strip.map((item, idx) => (
                      <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-[11px] text-slate-400 font-medium">{item.label}</div>
                        <div className="text-xs font-bold text-white mt-0.5">{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openQuoteModal(`${aresMechanicalData.identity.productName} (Commercial License)`)}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 text-sm"
                >
                  <span>{cadEdits?.pricingCta || 'Request a Quote'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal('ARES Mechanical - Official Brochure Download')}
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Brochure</span>
                </button>
                <button
                  onClick={() => scrollTo('standards')}
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                >
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>Explore Standards</span>
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal('ARES Mechanical Technical Details')}
                  className="inline-flex items-center space-x-2 text-slate-400 hover:text-white px-4 py-3 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Request Technical Details</span>
                  <Send className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img
                  src={aresMechanicalData.hero.image}
                  alt="ARES Mechanical Engineering Drawing"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      ARES Commander Inside
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      Perpetual & Annual
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Full-Featured 2D Mechanical Drafting</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    ISO, ANSI, DIN standards • Smart parametric fasteners • Automated layer routing • Dynamic BOM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      )}

      {/* ====================================================
          4. PRODUCT OVERVIEW (5)
         ==================================================== */}
      {isEnabled('overview') && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <FileCode className="w-3.5 h-3.5 text-blue-600" />
                <span>MECHANICAL CAD DESIGNED AROUND YOUR WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {aresMechanicalData.overview.heading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {aresMechanicalData.overview.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aresMechanicalData.overview.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white">
                      0{idx + 1}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-extrabold text-slate-950">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          5. KEY BENEFITS (6)
         ==================================================== */}
      {isEnabled('features') && (
        <>
          <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>KEY BENEFITS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {aresMechanicalData.benefits.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {aresMechanicalData.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aresMechanicalData.benefits.items.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INTERNATIONAL MECHANICAL STANDARDS (7)
         ==================================================== */}
      <section id="standards" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>{aresMechanicalData.standards.subheading}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {aresMechanicalData.standards.heading}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {aresMechanicalData.standards.description}
              </p>

              <div className="space-y-3 pt-2">
                {aresMechanicalData.standards.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
                <img
                  src={aresMechanicalData.standards.image}
                  alt="Mechanical Standards in ARES Mechanical"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                  <div className="text-xs font-bold text-white">Instant Global Standardization</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Select a standard to immediately configure drawing limits, dimension arrows, line weights, and hardware parts.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aresMechanicalData.standards.standardsList.map((std) => (
              <div
                key={std.id}
                onClick={() => setActiveStandardTab(std.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeStandardTab === std.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                    : 'bg-slate-800/70 text-slate-300 border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black tracking-tight">{std.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeStandardTab === std.id ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {std.units}
                  </span>
                </div>
                <div className="text-xs font-semibold opacity-90">{std.region}</div>
                <p className="text-xs mt-2 leading-relaxed opacity-80">{std.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. MECHANICAL PARTS LIBRARIES (8)
         ==================================================== */}
      <section id="parts" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Box className="w-3.5 h-3.5 text-blue-600" />
              <span>{aresMechanicalData.partsLibraries.subheading}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {aresMechanicalData.partsLibraries.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {aresMechanicalData.partsLibraries.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {aresMechanicalData.partsLibraries.categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{cat.eyebrow}</span>
                    <h3 className="text-base font-bold text-slate-900">{cat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="text-[11px] font-bold text-slate-400 mb-1">Standards:</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.standardsSupported.map((s, sidx) => (
                      <span key={sidx} className="px-2 py-0.5 bg-white text-slate-700 text-[10px] font-semibold rounded border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 text-center font-medium">
            {aresMechanicalData.partsLibraries.smartEntitiesNote}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. MECHANICAL WORKSPACE & DRAFTING TOOLS (9, 10, 11, 12, 13, 14)
         ==================================================== */}
      <section id="tools" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Workspace Showcase */}
          <div>
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
                <Layout className="w-3.5 h-3.5 text-blue-600" />
                <span>USER INTERFACE & PRODUCTIVITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {aresMechanicalData.workspace.heading}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {aresMechanicalData.workspace.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aresMechanicalData.workspace.workspaces.map((ws, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-600" />
                    {ws.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ws.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Tools: Automated Layers & Power Trim & Hatches */}
          <div className="pt-12 border-t border-slate-200 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">DRAFTING INTELLIGENCE</span>
                <h3 className="text-2xl font-black text-slate-950">{aresMechanicalData.draftingTools.automatedLayers.heading}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {aresMechanicalData.draftingTools.automatedLayers.description}
                </p>
                <div className="space-y-2 pt-2">
                  {aresMechanicalData.draftingTools.automatedLayers.features.map((f, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64">
                <img src={aresMechanicalData.draftingTools.automatedLayers.image} alt="Automated Layers" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 order-2 lg:order-1">
                <img src={aresMechanicalData.draftingTools.powerTrim.image} alt="Power Trim Scalpel" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">DYNAMIC EDITING</span>
                <h3 className="text-2xl font-black text-slate-950">{aresMechanicalData.draftingTools.powerTrim.heading}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {aresMechanicalData.draftingTools.powerTrim.description}
                </p>
                <div className="space-y-2 pt-2">
                  {aresMechanicalData.draftingTools.powerTrim.features.map((f, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. DWG COMPATIBILITY & STEP/IGES (15, 16)
         ==================================================== */}
      <section id="dwg" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Repeat className="w-3.5 h-3.5" />
                <span>{aresMechanicalData.dwgCompatibility.subheading}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {aresMechanicalData.dwgCompatibility.heading}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {aresMechanicalData.dwgCompatibility.description}
              </p>

              <div className="space-y-3 pt-2">
                {aresMechanicalData.dwgCompatibility.capabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-400 italic">
                {aresMechanicalData.dwgCompatibility.legacyNotice}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
                <img
                  src={aresMechanicalData.dwgCompatibility.image}
                  alt="DWG Mechanical Compatibility"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                  <div className="text-xs font-bold text-white">Full DWG Interoperability</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Migrate from legacy AutoCAD Mechanical without converting drawing assets or redrawing libraries.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP & IGES 3D References */}
          <div className="pt-12 border-t border-slate-800">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
              <h3 className="text-2xl font-black text-white">{aresMechanicalData.stepIges.heading}</h3>
              <p className="text-slate-300 text-sm">{aresMechanicalData.stepIges.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {aresMechanicalData.stepIges.features.map((feat, idx) => (
                <div key={idx} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 flex items-center space-x-2">
                  <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-slate-500 italic max-w-2xl mx-auto">
              {aresMechanicalData.stepIges.notice}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. MECHANICAL ANNOTATIONS & BOM (17)
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Crosshair className="w-3.5 h-3.5 text-blue-600" />
              <span>PRODUCTION DOCUMENTATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {aresMechanicalData.annotationsAndBom.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {aresMechanicalData.annotationsAndBom.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aresMechanicalData.annotationsAndBom.tools.map((tool, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{tool.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          11. ARES TRINITY ECOSYSTEM (20)
         ==================================================== */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>ARES TRINITY INTEGRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {aresMechanicalData.trinity.heading}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              {aresMechanicalData.trinity.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {aresMechanicalData.trinity.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{card.subtitle}</div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
                  </div>
                </div>

                {card.limitation && (
                  <div className="p-4 bg-slate-900/90 border-t border-slate-700/80 text-[11px] text-amber-300 italic">
                    {card.limitation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto">
            {aresMechanicalData.trinity.notice}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. WORKFLOW (23)
         ==================================================== */}
      <section id="workflow" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>FROM MECHANICAL CONCEPT TO PRODUCTION DRAWING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              A 6-Stage Engineering Drafting Workflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A structured, standards-driven process to take parts from early concept sketches to fabrication-ready DWG prints.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {aresMechanicalData.workflow.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  activeWorkflowStep === idx
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`text-xs font-black ${activeWorkflowStep === idx ? 'text-blue-200' : 'text-blue-600'}`}>
                  Step {step.stepNumber}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">{step.shortTitle}</div>
              </button>
            ))}
          </div>

          {/* Active Step Panel */}
          {(() => {
            const step = aresMechanicalData.workflow[activeWorkflowStep]
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200 rounded-3xl p-8">
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                    {step.badge}
                  </div>
                  <h3 className="text-2xl font-black text-slate-950">
                    {step.stepNumber}. {step.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Functions:</span>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((t, tidx) => (
                        <span key={tidx} className="px-2.5 py-1 bg-white text-slate-800 text-xs rounded-md border border-slate-200 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl h-72">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ====================================================
          13. APPLICATIONS (22)
         ==================================================== */}
      <section id="applications" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>INDUSTRY APPLICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Mechanical CAD for Multiple Engineering Applications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From heavy machine building to tooling and factory layout design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aresMechanicalData.applications.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">{app.title}</h3>
                    <div className="text-xs font-semibold text-blue-600">{app.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{app.description}</p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deliverables:</span>
                      {app.deliverables.map((del, didx) => (
                        <div key={didx} className="flex items-center space-x-1 text-[11px] text-slate-700">
                          <Check className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {app.toolTags.map((tag, tidx) => (
                      <span key={tidx} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          14. COMPARISON MATRIX (27)
         ==================================================== */}
      <section id="comparison" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Repeat className="w-3.5 h-3.5 text-blue-600" />
              <span>ARES PRODUCT FAMILY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {aresMechanicalData.comparisonTable.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {aresMechanicalData.comparisonTable.subtitle}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6">Feature / Capability</th>
                    <th className="py-4 px-6 bg-blue-50 text-blue-900 border-x border-blue-200">
                      ARES Mechanical
                    </th>
                    <th className="py-4 px-6">ARES Commander</th>
                    <th className="py-4 px-6">ARES Kudo</th>
                    <th className="py-4 px-6">ARES Touch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                  {aresMechanicalData.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-100/60 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-6 font-bold text-blue-700 bg-blue-50/50 border-x border-blue-100">
                        {row.aresMechanical}
                      </td>
                      <td className="py-3.5 px-6 text-slate-700">
                        {row.aresCommander}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {row.aresKudo}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {row.aresTouch}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </section>
        </>
      )}

      {/* ====================================================
          15. LICENSING & PRICING (28)
         ==================================================== */}
      {isEnabled('licensing') && (
        <section id="licensing" className="py-20 bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>CHOOSE A LICENSE FOR YOUR WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {aresMechanicalData.licensing.heading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                {aresMechanicalData.licensing.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {aresMechanicalData.licensing.options.map((opt, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">{opt.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{opt.desc}</p>
                  </div>
                  <button
                    onClick={() => openQuoteModal(`ARES Mechanical - ${opt.title}`)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all text-center"
                  >
                    Request Quote
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto">
              {aresMechanicalData.licensing.notice}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          16. SYSTEM REQUIREMENTS (30)
         ==================================================== */}
      {isEnabled('requirements') && (
        <section id="requirements" className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>SYSTEM COMPATIBILITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Workstation & Hardware Requirements
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Ensure your Windows workstation meets the recommended specifications for seamless mechanical drawing handling.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                      <th className="py-3.5 px-6">Hardware Component</th>
                      <th className="py-3.5 px-6">Minimum Specification</th>
                      <th className="py-3.5 px-6">Recommended (Production)</th>
                      <th className="py-3.5 px-6 hidden md:table-cell">Technical Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {aresMechanicalData.systemRequirements.map((req, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                          {req.category}
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {req.minimum}
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          {req.recommended}
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs hidden md:table-cell">
                          {req.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>Notice: ARES Mechanical is officially supported on 64-bit Windows systems.</span>
                <button
                  type="button"
                  onClick={() => openQuoteModal('ARES Mechanical 30-Day Trial Download')}
                  className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Request 30-Day Trial Download</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          17. FAQS (32)
         ==================================================== */}
      {isEnabled('faqs') && (
        <section id="faq" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Clear answers regarding ARES Mechanical capabilities, DWG compatibility, licensing, and Trinity integrations.
              </p>
            </div>

            <div className="space-y-3">
              {aresMechanicalData.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          18. FINAL CTA & PRODUCT ENQUIRY FORM (34, 35)
         ==================================================== */}
      {isEnabled('licensing') && (
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>BRING PRECISION TO YOUR MECHANICAL WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Design. Draft. Document. With Mechanical Precision.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Empower your engineering team with a dedicated 2D mechanical CAD environment in native DWG. Talk to our technical specialists to evaluate license options, legacy AutoCAD Mechanical compatibility, and corporate onboarding.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Authorized Graebert CAD solutions partner in India</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Perpetual and annual subscription options with GST invoicing</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Onboarding, template configuration, and technical hotline assistance</span>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>Direct engineer helpline</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Official genuine licenses</span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
                <h3 className="text-2xl font-black text-slate-950 mb-2 uppercase tracking-tight">
                  ENQUIRE NOW
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Complete the form below to receive official quotes and evaluation assistance for ARES Mechanical.
                </p>

                {formSubmitted ? (
                  <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                    <h4 className="text-lg font-bold text-slate-900">Thank You for Your Enquiry!</h4>
                    <p className="text-xs text-slate-600">
                      Our team will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} data-leniva-handled="true" className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company / Firm *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Company Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">License Preference</label>
                        <select
                          value={formData.licensePreference}
                          onChange={e => setFormData({ ...formData, licensePreference: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="1-Year Subscription with Trinity">1-Year Subscription (with Trinity)</option>
                          <option value="3-Year Subscription with Trinity">3-Year Subscription (with Trinity)</option>
                          <option value="Perpetual License (Desktop)">Perpetual License (Desktop Standalone)</option>
                          <option value="Network / Flex Floating License">Network / Flex Floating License</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Number of Seats</label>
                        <select
                          value={formData.seats}
                          onChange={e => setFormData({ ...formData, seats: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="1 Seat">1 Seat</option>
                          <option value="2-5 Seats">2-5 Seats</option>
                          <option value="6-15 Seats">6-15 Seats</option>
                          <option value="16+ Seats (Enterprise)">16+ Seats (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current CAD Software in Use</label>
                      <input
                        type="text"
                        value={formData.currentSoftware}
                        onChange={e => setFormData({ ...formData, currentSoftware: e.target.value })}
                        placeholder="e.g. AutoCAD Mechanical, AutoCAD, BricsCAD, SolidWorks 2D"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Details or Requirements</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your drafting standards (ISO/DIN/ANSI), BOM needs, or legacy drawing volumes..."
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      {formLoading ? (
                        <span>Processing your enquiry...</span>
                      ) : (
                        <>
                          <span>Submit Official Quote Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center">
                      Strict privacy guaranteed. We do not share your commercial contact details.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  )
}

export default AresMechanicalPage
