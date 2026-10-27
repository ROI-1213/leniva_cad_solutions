import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  PhoneCall,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronDown,
  Eye,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Box,
  ExternalLink,
  Building2,
  Award,
  Sun,
  Check,
  X,
  Send,
  HelpCircle,
  Maximize2,
  GraduationCap,
  Scan,
  Repeat,
  Crosshair,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { recordCustomerEnquiry } from '../utils/cloudSync'
import { sketchUpStudioData as defaultSketchUpStudioData } from '../data/sketchupStudioData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const SketchUpStudioPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const { data: sketchUpStudioData } = useCadPageData('sketchup_studio', defaultSketchUpStudioData)

  // State
  const [activeTab, setActiveTab] = useState<'create' | 'visualize' | 'collaborate'>('create')
  const [activeToolCategory, setActiveToolCategory] = useState<string>('all')
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Architecture',
    currentSoftware: '',
    interestedTools: 'SketchUp Studio (Complete Bundle)',
    licenses: '1-5 Seats',
    licenseType: 'Commercial Annual Subscription',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // Navigation Items
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'perks', label: 'Benefits' },
    { id: 'pointclouds', label: 'Point Clouds' },
    { id: 'revit', label: 'Revit Importer' },
    { id: 'visualization', label: 'Visualization' },
    { id: 'included-tools', label: 'Included Tools' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'industries', label: 'Industries' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'plans', label: 'Plans & Licensing' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'faq', label: 'FAQ' },
  ]

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
        productOrService: `SketchUp Studio (${formData.seats || '1'} Seats, ${formData.timeline || 'Immediate'})`,
        quantity: formData.seats || '1',
        application: formData.industry || 'AEC & 3D Visualization',
        timeline: formData.timeline || 'Immediate',
        message: formData.message || `Industry: ${formData.industry} | Seats: ${formData.seats}`,
        source: 'SketchUp Studio Consultation Form',
        enquiryType: 'quote',
      })
    } catch (err) {
      console.warn('Enquiry submit error:', err)
    } finally {
      setFormLoading(false)
      setFormSubmitted(true)
    }
  }

  // Filter tools
  const filteredTools = activeToolCategory === 'all'
    ? sketchUpStudioData.includedTools
    : sketchUpStudioData.includedTools.filter(t => t.category === activeToolCategory)

  // Filter gallery
  const filteredGallery = activeGalleryCategory === 'all'
    ? sketchUpStudioData.gallery
    : sketchUpStudioData.gallery.filter(g => g.category === activeGalleryCategory)

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* ====================================================
          1. BREADCRUMBS
         ==================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/products" className="hover:text-red-600 transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <Link to="/products/cad-software" className="hover:text-red-600 transition-colors">CAD & Engineering</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-900 font-semibold">{sketchUpStudioData.identity.productName}</span>
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
                <Box className="w-4 h-4 text-red-600" />
                <span>SketchUp Studio</span>
              </span>
              <span className="hidden md:inline-flex px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-red-50 text-red-700 border border-red-200">
                Trimble Ecosystem
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
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => openQuoteModal('SketchUp Studio (Trimble)')}
                className="inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow"
              >
                <span>Request Quote</span>
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
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================
          3. HERO SECTION
         ==================================================== */}
      <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-8 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/sketchup.png" alt="Trimble SketchUp" className="h-full w-auto max-w-[95px] object-contain" />
                </div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <Box className="w-3.5 h-3.5" />
                  <span>{sketchUpStudioData.hero.eyebrow}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {sketchUpStudioData.hero.heading}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-300">
                {sketchUpStudioData.hero.subheading}
              </p>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {sketchUpStudioData.hero.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                {sketchUpStudioData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                    <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openQuoteModal('SketchUp Studio (Commercial Bundle)')}
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 text-sm"
                >
                  <span>Request a Commercial Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('pointclouds')}
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                >
                  <Scan className="w-4 h-4 text-red-400" />
                  <span>Explore Reality Capture</span>
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal('SketchUp Studio Commercial Details')}
                  className="inline-flex items-center space-x-2 text-slate-400 hover:text-white px-4 py-3 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Request Official Details</span>
                  <Send className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 group">
                <img
                  src={sketchUpStudioData.hero.image}
                  alt="SketchUp Studio Architecture & Rendering"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Trimble Studio Suite
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      Windows Native
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Full-Cycle Architectural Workflow</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Scan Essentials Point Cloud → Revit Importer → SketchUp Modeling → V-Ray Photorealism
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PRODUCT INTRODUCTION
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                <Box className="w-3.5 h-3.5 text-red-600" />
                <span>{sketchUpStudioData.intro.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {sketchUpStudioData.intro.heading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {sketchUpStudioData.intro.description}
              </p>

              <div className="space-y-4 pt-2">
                {sketchUpStudioData.intro.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="mt-1 p-1 rounded-full bg-red-50 text-red-600 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pt.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative group">
                <img
                  src={sketchUpStudioData.intro.image}
                  alt="Interior Design Visualization in SketchUp Studio"
                  className="w-full h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-900">Seamless BIM & Reality Data Ingestion</div>
                  <div className="text-xs text-slate-500 mt-0.5">Author designs over verifiable physical site dimensions.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. THE PERKS OF STUDIO
         ==================================================== */}
      <section id="perks" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Why SketchUp Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Built for Demanding Architectural Workflows
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore why top design practices standardize on SketchUp Studio to connect reality capture, Revit coordinates, and client-ready visuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sketchUpStudioData.perks.map((perk) => (
              <div
                key={perk.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={perk.image}
                    alt={perk.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white">
                    {perk.tag}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      {perk.eyebrow}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {perk.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                  <button
                    onClick={() => scrollTo(perk.linkTarget.replace('#', ''))}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors pt-2"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INTEROPERABLE WORKFLOWS
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Repeat className="w-3.5 h-3.5 text-blue-600" />
              <span>{sketchUpStudioData.interop.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {sketchUpStudioData.interop.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {sketchUpStudioData.interop.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {sketchUpStudioData.interop.workflowSteps.map((wf, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative space-y-3 hover:border-red-400 transition-colors"
              >
                <div className="text-3xl font-black text-red-600/30">
                  {wf.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{wf.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{wf.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-100 rounded-xl border border-slate-200 text-center">
            <p className="text-xs text-slate-500 italic">
              {sketchUpStudioData.interop.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. SCAN ESSENTIALS — POINT-CLOUD MODELING
         ==================================================== */}
      <section id="pointclouds" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Scan className="w-3.5 h-3.5" />
                <span>{sketchUpStudioData.scanEssentials.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {sketchUpStudioData.scanEssentials.heading}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {sketchUpStudioData.scanEssentials.description}
              </p>

              {/* Supported formats pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Supported Point Cloud Formats:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sketchUpStudioData.scanEssentials.formats.map((fmt, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {sketchUpStudioData.scanEssentials.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Crosshair className="w-4 h-4 text-red-400" />
                      {hl.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{hl.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-lg text-xs text-slate-400 italic">
                {sketchUpStudioData.scanEssentials.disclaimer}
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
                <img
                  src={sketchUpStudioData.scanEssentials.image}
                  alt="Scan Essentials Point Cloud in SketchUp"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                  <div className="text-xs font-bold text-white">Direct Snapping over Scan Coordinates</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Trace existing walls, floor elevations, and structural trusses without relying on outdated 2D drawings.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {sketchUpStudioData.scanEssentials.cards.map((c, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-left">
                    <div className="text-xs font-bold text-red-400">{c.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. POINT-CLOUD 5-STEP WORKFLOW
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Scan className="w-3.5 h-3.5 text-red-600" />
              <span>FROM REALITY CAPTURE TO 3D MODEL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Turn Scanned Conditions Into Usable 3D Models
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A proven 5-stage architectural survey workflow to capture, model, and document existing structures.
            </p>
          </div>

          <div className="space-y-6">
            {sketchUpStudioData.pointCloudWorkflow.map((step, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden p-6 items-center hover:border-slate-300 transition-all"
              >
                <div className="lg:col-span-1 text-center lg:text-left">
                  <span className="text-3xl font-black text-red-600">{step.stepNumber}</span>
                </div>
                <div className="lg:col-span-4 space-y-1">
                  <div className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-100 text-red-700">
                    {step.badge}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                  <div className="text-xs font-semibold text-slate-500">{step.subtitle}</div>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {step.tools.map((t, tidx) => (
                      <span key={tidx} className="px-2 py-0.5 bg-white text-slate-700 text-[11px] rounded border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-32 object-cover rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          9. REVIT IMPORTER
         ==================================================== */}
      <section id="revit" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                <img
                  src={sketchUpStudioData.revitImporter.image}
                  alt="Revit to SketchUp Interoperability"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-900">Revit (.RVT) Native Conversion</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Retain categories, level hierarchies, and material assignments in clean SketchUp groups.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Repeat className="w-3.5 h-3.5" />
                <span>{sketchUpStudioData.revitImporter.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {sketchUpStudioData.revitImporter.heading}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {sketchUpStudioData.revitImporter.description}
              </p>

              <div className="space-y-3">
                {sketchUpStudioData.revitImporter.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
                {sketchUpStudioData.revitImporter.limitationsNotice}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. V-RAY FOR SKETCHUP
         ==================================================== */}
      <section id="visualization" className="py-20 bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sketchUpStudioData.vraySection.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {sketchUpStudioData.vraySection.heading}
            </h2>
            <p className="text-slate-300 text-base">
              {sketchUpStudioData.vraySection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-xl font-bold text-white">Full-Featured Ray-Tracing Capabilities:</h3>
              <div className="space-y-2.5">
                {sketchUpStudioData.vraySection.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                <img
                  src={sketchUpStudioData.vraySection.image}
                  alt="V-Ray for SketchUp Rendering"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="text-xs font-bold text-white">Physically-Based Lighting & Chaos Cosmos</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Thousands of render-ready PBR shaders and 3D entourage models built right into your workspace.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lighting & Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sketchUpStudioData.vraySection.lightingAndMaterials.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-red-400" />
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 italic">
              {sketchUpStudioData.vraySection.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          11. INCLUDED TOOLS (30. INCLUDED TOOLS & FEATURES)
         ==================================================== */}
      <section id="included-tools" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Box className="w-3.5 h-3.5 text-red-600" />
              <span>WHAT'S INCLUDED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Explore the Full Suite of Tools in SketchUp Studio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive inventory of software, plugins, reality capture tools, and cloud services bundled in your subscription.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'All Tools' },
                { id: 'core', label: 'Core Modeling' },
                { id: 'reality', label: 'Reality Capture' },
                { id: 'interop', label: 'BIM & Interoperability' },
                { id: 'rendering', label: 'Rendering & AI' },
                { id: 'ecosystem', label: 'Cloud & Warehouse' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveToolCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
                    activeToolCategory === cat.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      {tool.categoryLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.inclusionStatus === 'Included in Studio'
                        ? 'bg-green-100 text-green-800'
                        : tool.inclusionStatus === 'Separate License/Hardware'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tool.inclusionStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {tool.name}
                  </h3>

                  <div className="text-xs font-medium text-slate-500">{tool.tagline}</div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-200/60">
                    {tool.features.map((f, fidx) => (
                      <div key={fidx} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
                        <Check className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">{tool.platform}</span>
                  <a
                    href={tool.officialDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-bold"
                  >
                    <span>Doc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. WORKFLOW: CREATE, VISUALIZE, COLLABORATE (25)
         ==================================================== */}
      <section id="workflow" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-red-400" />
              <span>THE SKETCHUP ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Create. Visualize. Collaborate.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Harness the three core pillars of SketchUp Studio to power your projects from conceptual napkin sketch to final construction permit.
            </p>

            {/* Big 3 Tabs */}
            <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700 mt-4">
              {sketchUpStudioData.ecosystemTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Panel */}
          {(() => {
            const currentTab = sketchUpStudioData.ecosystemTabs.find(t => t.id === activeTab)!
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-850 p-8 rounded-3xl border border-slate-800">
                <div className="lg:col-span-6 space-y-5">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Phase: {currentTab.label}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {currentTab.headline}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentTab.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Included Studio Tools:
                    </span>
                    <div className="space-y-1.5">
                      {currentTab.tools.map((tool, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal(`SketchUp Studio - ${currentTab.label} Workflow`)}
                    className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
                  >
                    <span>Request Demo & Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img
                      src={currentTab.image}
                      alt={currentTab.label}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ====================================================
          13. INDUSTRIES & USE CASES (26)
         ==================================================== */}
      <section id="industries" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>BUILT FOR ADVANCED DESIGN TEAMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              One Subscription Across Design Workflows
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Discover how architectural, engineering, construction, and reality-capture teams deploy SketchUp Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sketchUpStudioData.industries.map((ind) => (
              <div
                key={ind.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900">{ind.title}</h3>
                    <div className="text-xs font-semibold text-red-600">{ind.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>

                    <div className="space-y-1.5 pt-3 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deliverables:</span>
                      {ind.deliverables.map((del, didx) => (
                        <div key={didx} className="flex items-center space-x-1 text-[11px] text-slate-700">
                          <Check className="w-3 h-3 text-red-600 flex-shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex flex-wrap gap-1">
                    {ind.toolTags.map((tag, tidx) => (
                      <span key={tidx} className="px-2 py-0.5 bg-white text-slate-600 text-[10px] rounded border border-slate-200">
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
          14. VISUALIZATION GALLERY (28)
         ==================================================== */}
      <section id="gallery" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              <span>STUNNING DELIVERABLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Visualize Your Ideas with Photorealistic Precision
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              A visual showcase illustrating the combined power of SketchUp geometry, point-cloud reality data, and V-Ray 6 rendering.
            </p>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'All Showcase' },
                { id: 'rendering', label: 'V-Ray Renders' },
                { id: 'interior', label: 'Interiors' },
                { id: 'pointcloud', label: 'Point Cloud Scans' },
                { id: 'revit', label: 'Revit Ingestion' },
                { id: 'landscape', label: 'Landscape' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveGalleryCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                    activeGalleryCategory === c.id
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item.image)}
                className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/60 cursor-pointer group hover:border-red-500/50 transition-all flex flex-col justify-between"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white">
                    {item.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.caption}</p>
                  {item.attribution && (
                    <div className="text-[10px] text-slate-500 pt-1 italic">{item.attribution}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl" onClick={e => e.stopPropagation()}>
            <img src={lightboxImage} alt="Enlarged view" className="w-full h-full object-contain" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ====================================================
          15. PLANS & PRICING (32)
         ==================================================== */}
      <section id="plans" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span>PLANS AND LICENSING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Choose the Right SketchUp Plan for Your Workflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Compare SketchUp Go, SketchUp Pro, and the flagship SketchUp Studio suite. Contact Leniva CAD Solutions for current official commercial quotes in India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sketchUpStudioData.plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm"
              >
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">{plan.name}</h3>
                  <div className="text-xs font-bold mt-1 text-red-600">
                    {plan.tagline}
                  </div>
                  <p className="text-xs mt-3 leading-relaxed text-slate-600">
                    {plan.description}
                  </p>

                  <div className="my-6 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 space-y-1">
                    <div className="text-xs font-semibold text-slate-500">Licensing & Terms:</div>
                    <div className="text-sm font-bold text-slate-900">Contact Leniva for Official Regional Quote</div>
                    <div className="text-[11px] text-slate-500">{plan.billing} • {plan.licensingType}</div>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Entitlements & Features:
                    </span>
                    {plan.features.map((feat, fidx) => (
                      <div key={fidx} className="flex items-start space-x-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={() => openQuoteModal(`${plan.name} (Trimble)`)}
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all text-center bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                  >
                    Request Quote for {plan.name}
                  </button>
                  <div className="text-center text-[10px] text-slate-400">
                    Platform: {plan.platform}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          16. SYSTEM REQUIREMENTS (33)
         ==================================================== */}
      <section id="requirements" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-red-600" />
              <span>TECHNICAL COMPATIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Hardware & System Requirements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Ensure your workstation meets Trimble and Chaos hardware specifications for smooth point-cloud manipulation and ray-traced rendering.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-3.5 px-6">Hardware Component</th>
                    <th className="py-3.5 px-6">Minimum Specification</th>
                    <th className="py-3.5 px-6">Recommended (High Performance)</th>
                    <th className="py-3.5 px-6 hidden md:table-cell">Technical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {sketchUpStudioData.systemRequirements.map((req, idx) => (
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
              <span>Notice: SketchUp Studio is officially supported on 64-bit Windows workstations.</span>
              <a
                href="https://help.sketchup.com/en/sketchup/system-requirements"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-1"
              >
                <span>Official System Requirements</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          17. ONBOARDING & SUPPORT (34)
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>LEARN & GET SUPPORT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Everything You Need to Master Studio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Access official Trimble and Chaos documentation, tutorials, community forums, and dedicated Leniva CAD technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sketchUpStudioData.learningResources.map((res, idx) => (
              <a
                key={idx}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-red-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-slate-200 text-slate-800">
                    {res.badge}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-red-600">
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          18. FAQ SECTION (35)
         ==================================================== */}
      <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-red-600" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Clear answers regarding SketchUp Studio subscription entitlements, Scan Essentials, Revit Importer, V-Ray rendering, and system compatibility.
            </p>
          </div>

          <div className="space-y-3">
            {sketchUpStudioData.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-red-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
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
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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

      {/* ====================================================
          19. FINAL CTA & PRODUCT ENQUIRY FORM (36, 37)
         ==================================================== */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Box className="w-3.5 h-3.5" />
                <span>DESIGN WITH REAL-WORLD CONFIDENCE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Bring Your Most Advanced Ideas to Life
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect intuitive 3D modeling, point-cloud reality capture, BIM Revit interoperability, and photorealistic V-Ray visualization in a unified Windows ecosystem with SketchUp Studio.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Authorized Trimble & Chaos visualization solution provider in India</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Commercial & educational licensing quotes with GST invoicing</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Implementation support for Scan Essentials & V-Ray workflows</span>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  <span>Technical hotline assistance</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>Official Trimble genuine licenses</span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-200">
                <h3 className="text-2xl font-black text-slate-950 mb-2">
                  Request Commercial Quote & Demo
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Fill in your project requirements below to receive a personalized quote for SketchUp Studio.
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
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company / Firm *</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Firm Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                          placeholder="name@firm.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                        <select
                          value={formData.industry}
                          onChange={e => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
                        >
                          <option value="Architecture">Architecture</option>
                          <option value="Interior Design">Interior Design</option>
                          <option value="Construction & BIM">Construction & BIM</option>
                          <option value="Heritage & Renovation">Heritage & Renovation</option>
                          <option value="Visualization Studio">Visualization Studio</option>
                          <option value="Engineering & Surveying">Engineering & Surveying</option>
                          <option value="Higher Education / University">Higher Education / University</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Number of Seats</label>
                        <select
                          value={formData.licenses}
                          onChange={e => setFormData({ ...formData, licenses: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
                        >
                          <option value="1 Seat (Individual)">1 Seat (Individual)</option>
                          <option value="2-5 Seats (Studio)">2-5 Seats (Studio)</option>
                          <option value="6-15 Seats (Practice)">6-15 Seats (Practice)</option>
                          <option value="16+ Seats (Enterprise)">16+ Seats (Enterprise)</option>
                          <option value="Academic Institution Lab">Academic Institution Lab</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Specific Workflow Interest</label>
                      <input
                        type="text"
                        value={formData.interestedTools}
                        onChange={e => setFormData({ ...formData, interestedTools: e.target.value })}
                        placeholder="e.g. Scan Essentials point clouds, V-Ray, Revit Importer"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Details or Questions</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your hardware configuration or specific deliverables required..."
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
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
    </div>
  )
}

export default SketchUpStudioPage
