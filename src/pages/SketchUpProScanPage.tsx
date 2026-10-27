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
  Scan,
  Repeat,
  Crosshair,
  MapPin,
  Truck,
  Quote,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { recordCustomerEnquiry } from '../utils/cloudSync'
import { proScanData as defaultProScanData } from '../data/proScanData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const SketchUpProScanPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const { data: proScanData } = useCadPageData('sketchup_proscan', defaultProScanData)

  // State
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)
  const [sliderPosition, setSliderPosition] = useState<number>(50)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [activeSection, setActiveSection] = useState<string>('overview')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Architecture & As-Built',
    scanningEquipment: '',
    licenses: '1-3 Seats',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // Navigation Items
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'scan-essentials', label: 'Scan Essentials' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'applications', label: 'Applications' },
    { id: 'included-tools', label: 'Included Tools' },
    { id: 'comparison', label: 'Pro vs Pro Scan' },
    { id: 'pricing', label: 'Licensing' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'faq', label: 'FAQs' },
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
        productOrService: `SketchUp Pro Scan (${formData.seats || '1'} Seats, ${formData.timeline || 'Immediate'})`,
        quantity: formData.seats || '1',
        application: formData.scanFormat || 'Point Cloud & Scan-to-BIM',
        timeline: formData.timeline || 'Immediate',
        message: formData.message || `Format: ${formData.scanFormat} | Seats: ${formData.seats}`,
        source: 'SketchUp Pro Scan Consultation Form',
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
            <Link to="/products/cad-software" className="hover:text-blue-600 transition-colors">CAD & Engineering</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-900 font-semibold">{proScanData.identity.productName}</span>
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
                <Scan className="w-4 h-4 text-blue-600" />
                <span>SketchUp Pro Scan</span>
              </span>
              <span className="hidden md:inline-flex px-2 py-0.5 text-[11px] font-bold uppercase rounded bg-blue-50 text-blue-700 border border-blue-200">
                Windows Exclusive
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
                onClick={() => openQuoteModal('SketchUp Pro Scan (Trimble)')}
                className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm hover:shadow"
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
      <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-11 sm:h-12 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xs flex items-center justify-center">
                  <img src="/images/brands/sketchup.png" alt="Trimble SketchUp" className="h-full w-auto max-w-[140px] sm:max-w-[160px] object-contain" />
                </div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <Scan className="w-3.5 h-3.5" />
                  <span>{proScanData.hero.eyebrow}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {proScanData.hero.heading}
              </h1>

              <p className="text-base sm:text-lg font-medium text-slate-300">
                {proScanData.identity.supportingHeadline}
              </p>

              <p className="text-slate-400 text-sm leading-relaxed">
                {proScanData.hero.description}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {proScanData.hero.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                {proScanData.hero.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                    <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => openQuoteModal('SketchUp Pro Scan (Commercial Subscription)')}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-600/30 text-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('scan-essentials')}
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                >
                  <Scan className="w-4 h-4 text-blue-400" />
                  <span>Explore Scan Essentials</span>
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal('SketchUp Pro Scan Commercial Details')}
                  className="inline-flex items-center space-x-2 text-slate-400 hover:text-white px-4 py-3 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Request Official Details</span>
                  <Send className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Right Split View / Parallax Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <img
                  src={proScanData.hero.image}
                  alt="SketchUp Pro Scan Reality Capture to 3D"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Scan-to-3D Precision
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                      Windows Native
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Scan Essentials Point Cloud Modeling</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Trace existing conditions, verify plumb tolerances, and export 2D permit sheets in LayOut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PRODUCT OVERVIEW (5)
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Scan className="w-3.5 h-3.5 text-blue-600" />
              <span>REAL-WORLD DATA. SMARTER 3D MODELING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {proScanData.overview.heading}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {proScanData.overview.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proScanData.overview.cards.map((card, idx) => (
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
                    Step {idx + 1}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900">
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

      {/* ====================================================
          5. KEY BENEFITS (6)
         ==================================================== */}
      <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>THE COMPLETE SCAN-TO-3D WORKFLOW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {proScanData.benefits.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {proScanData.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proScanData.benefits.items.map((benefit, idx) => (
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
          6. SCAN ESSENTIALS DEEP DIVE (7)
         ==================================================== */}
      <section id="scan-essentials" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Scan className="w-3.5 h-3.5" />
                <span>{proScanData.scanEssentials.subheading}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {proScanData.scanEssentials.heading}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {proScanData.scanEssentials.description}
              </p>

              {/* Supported Formats */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Supported Point Cloud File Formats:
                </span>
                <div className="flex flex-wrap gap-2">
                  {proScanData.scanEssentials.formats.map((fmt, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-200 border border-slate-700"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Comparison Slider */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-80 select-none">
                {/* Background image (3D Model / After) */}
                <img
                  src={proScanData.scanEssentials.splitImageAfter}
                  alt="SketchUp 3D Model"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Foreground image (Point Cloud / Before) with clip-path */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={proScanData.scanEssentials.splitImageBefore}
                    alt="Point Cloud Scan"
                    className="absolute inset-0 w-[500px] sm:w-[600px] h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-bold text-white">
                    Scan Data
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-bold text-white">
                  3D Model
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 bg-white text-slate-900 rounded-full shadow-lg flex items-center justify-center font-bold text-xs">
                    ⇄
                  </div>
                </div>

                {/* Invisible input range for accessible touch & keyboard control */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                  aria-label="Scan to 3D Model comparison slider"
                />
              </div>

              <div className="text-center text-xs text-slate-400">
                Drag the interactive slider to compare captured laser scan coordinates with generated 3D geometry.
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proScanData.scanEssentials.cards.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-800/70 p-5 rounded-2xl border border-slate-700/70 space-y-2 hover:border-blue-400 transition-colors"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-blue-400" />
                  {c.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. MASTER SCAN-TO-3D 6-STEP WORKFLOW (9)
         ==================================================== */}
      <section id="workflow" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Scan className="w-3.5 h-3.5 text-blue-600" />
              <span>FROM SITE SURVEY TO 3D MODEL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              A Connected 6-Stage Scan-to-3D Workflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From reality capture to 2D permit drawings and model verification—streamline your entire project cycle.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {proScanData.workflow.map((step, idx) => (
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

          {/* Active Step Showcase */}
          {(() => {
            const step = proScanData.workflow[activeWorkflowStep]
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
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Tools & Engines:</span>
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
          8. CORE CAPABILITIES: CREATE, VISUALIZE, DOCUMENT, ANALYZE (10)
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ONE SUBSCRIPTION. FOUR CONNECTED CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Model, Visualize, Document & Verify
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A comprehensive toolset engineered to handle complex reality data without leaving the SketchUp ecosystem.
            </p>
          </div>

          <div className="space-y-12">
            {proScanData.coreCapabilities.map((cap, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
                >
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                        {cap.letter}
                      </span>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {cap.title}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950">
                      {cap.heading}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {cap.content}
                    </p>

                    <div className="space-y-2 pt-2">
                      {cap.keyPoints.map((pt, pidx) => (
                        <div key={pidx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-72">
                      <img
                        src={cap.image}
                        alt={cap.heading}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          9. REAL-WORLD APPLICATIONS (11)
         ==================================================== */}
      <section id="applications" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>DESIGNED FOR COMPLEX REAL-WORLD PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Real-World Industry Applications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From historic preservation to active job site logistics, discover where professionals deploy SketchUp Pro Scan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proScanData.applications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
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

                    <div className="space-y-1.5 pt-3 border-t border-slate-200">
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
          10. SITE PLANNING & HISTORIC PRESERVATION (12, 13)
         ==================================================== */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Site Planning Rows */}
          <div>
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <span>CONSTRUCTION LOGISTICS</span>
              </div>
              <h2 className="text-3xl font-black text-white">
                {proScanData.sitePlanning.heading}
              </h2>
              <p className="text-slate-300 text-sm">
                {proScanData.sitePlanning.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {proScanData.sitePlanning.rows.map((row, idx) => (
                <div key={idx} className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {row.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Historic Preservation Triptych */}
          <div className="pt-12 border-t border-slate-800">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <h2 className="text-3xl font-black text-white">
                {proScanData.restoration.heading}
              </h2>
              <p className="text-slate-300 text-sm">
                {proScanData.restoration.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                <img src={proScanData.restoration.images.historic} alt="Historic Building" className="w-full h-52 object-cover" />
                <div className="p-3 text-center text-xs font-bold text-slate-300">1. Physical Historic Site</div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                <img src={proScanData.restoration.images.pointCloud} alt="Point Cloud Scan" className="w-full h-52 object-cover" />
                <div className="p-3 text-center text-xs font-bold text-blue-400">2. Scan Essentials Point Cloud</div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                <img src={proScanData.restoration.images.model} alt="As-Built 3D Model" className="w-full h-52 object-cover" />
                <div className="p-3 text-center text-xs font-bold text-slate-300">3. Accurate 3D As-Built Model</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {proScanData.restoration.points.map((pt, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          11. INCLUDED TOOLS (8)
         ==================================================== */}
      <section id="included-tools" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Box className="w-3.5 h-3.5 text-blue-600" />
              <span>WHAT'S INCLUDED IN PRO SCAN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Everything You Need for a Connected Scan-to-3D Workflow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A breakdown of core tools and broader ecosystem services included in the Windows Pro Scan subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proScanData.includedTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-400 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      {tool.role}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.inclusionStatus === 'Included in Pro Scan'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {tool.inclusionStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>

                  <div className="text-xs font-medium text-slate-500">{tool.tagline}</div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-200/60">
                    {tool.features.map((f, fidx) => (
                      <div key={fidx} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
                        <Check className="w-3 h-3 text-blue-600 flex-shrink-0" />
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
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-bold"
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
          12. FEATURE COMPARISON: PRO VS PRO SCAN (15)
         ==================================================== */}
      <section id="comparison" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Repeat className="w-3.5 h-3.5 text-blue-600" />
              <span>PLAN COMPARISON MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {proScanData.comparisonTable.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {proScanData.comparisonTable.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs uppercase font-extrabold tracking-wider">
                    <th className="py-4 px-6">Capability / Toolset</th>
                    <th className="py-4 px-6">SketchUp Pro</th>
                    <th className="py-4 px-6 bg-blue-50/80 text-blue-900 border-x border-blue-200">
                      SketchUp Pro Scan
                    </th>
                    <th className="py-4 px-6">SketchUp Studio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {proScanData.comparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {row.feature}
                        {row.note && (
                          <span className="block text-[11px] text-amber-600 font-normal mt-0.5">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {row.sketchUpPro}
                      </td>
                      <td className="py-4 px-6 font-bold text-blue-700 bg-blue-50/40 border-x border-blue-100">
                        {row.sketchUpProScan}
                      </td>
                      <td className="py-4 px-6 text-slate-700">
                        {row.sketchUpStudio}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Need help deciding between Pro Scan and Studio? Our BIM specialists will evaluate your workflow.
              </span>
              <button
                onClick={() => openQuoteModal('SketchUp Plan Consultation (Pro vs Pro Scan vs Studio)')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all"
              >
                Talk to Our Software Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          13. VERIFIED TESTIMONIAL (17)
         ==================================================== */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Quote className="w-10 h-10 text-blue-400 mx-auto opacity-70" />
          <blockquote className="text-lg sm:text-2xl font-medium text-slate-200 italic leading-relaxed">
            "{proScanData.testimonial.quote}"
          </blockquote>
          <div>
            <div className="font-extrabold text-white text-base">
              {proScanData.testimonial.author}
            </div>
            <div className="text-xs text-blue-400">
              {proScanData.testimonial.role}, {proScanData.testimonial.company}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          14. PRICING & SUBSCRIPTION (18)
         ==================================================== */}
      <section id="pricing" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5" />
              <span>EXPLORE SKETCHUP PRO SCAN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Subscription & Commercial Licensing
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A dedicated scan-to-3D subscription combining SketchUp Pro capabilities with point cloud import and modeling workflows on Windows.
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                Official Trimble Subscription
              </span>
              <span className="text-xs text-slate-500">
                Platform: {proScanData.pricing.platform}
              </span>
            </div>

            <h3 className="text-3xl font-black tracking-tight text-slate-950">{proScanData.pricing.name}</h3>
            <div className="text-xs font-bold text-blue-600 mt-1">{proScanData.pricing.tagline}</div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {proScanData.pricing.description}
            </p>

            <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-semibold text-slate-500">Licensing & Commercial Subscription:</div>
              <div className="text-base font-bold text-slate-900">
                Official Commercial Partner Quotes Available
              </div>
              <div className="text-[11px] text-slate-500">
                Annual named-user commercial license with Indian INR billing, GST invoicing &amp; local technical support.
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Included Features & Entitlements:
              </span>
              {proScanData.pricing.features.map((feat, fidx) => (
                <div key={fidx} className="flex items-start space-x-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 flex flex-wrap gap-4">
              <button
                onClick={() => openQuoteModal('SketchUp Pro Scan Subscription')}
                className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm text-center"
              >
                Request a Commercial Quote
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 transition-all"
              >
                Talk to a Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          15. SYSTEM REQUIREMENTS (19)
         ==================================================== */}
      <section id="requirements" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>PLATFORM & COMPATIBILITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Hardware & Workstation Requirements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Verify your Windows hardware specifications to ensure responsive point cloud manipulation with Scan Essentials.
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
                  {proScanData.systemRequirements.map((req, idx) => (
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
              <span>Notice: SketchUp Pro Scan is officially supported on 64-bit Windows workstations only.</span>
              <a
                href={proScanData.identity.scanEssentialsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
              >
                <span>Scan Essentials Documentation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          16. FAQS (20)
         ==================================================== */}
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
              Clear answers regarding SketchUp Pro Scan subscription entitlements, point cloud capabilities, LayOut, and Windows compatibility.
            </p>
          </div>

          <div className="space-y-3">
            {proScanData.faqs.map((faq, idx) => {
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

      {/* ====================================================
          17. RELATED PRODUCTS (21)
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Explore More 3D Design & Reality Capture Software
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Complement your scan-to-3D workflow with specialized rendering engines, BIM bundles, and metrology laser scanners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proScanData.relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rel.brand}</span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{rel.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{rel.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={rel.route}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>View Product Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          18. FINAL CTA & ENQUIRY FORM (22)
         ==================================================== */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Scan className="w-3.5 h-3.5" />
                <span>BRING REAL-WORLD PRECISION INTO YOUR 3D WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                From Reality to 3D. With Complete Accuracy.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect point cloud data, professional 3D desktop modeling, and 2D documentation in LayOut with SketchUp Pro Scan. Talk to our technical specialists to review software compatibility and receive commercial quotations.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Authorized Trimble SketchUp partner in India</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Official commercial subscription with GST compliant invoicing</span>
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Scan Essentials setup guidance & technical support</span>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <span>Technical hotline support</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Genuine Trimble licensing</span>
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
                  Fill in your project details below to receive a personalized quote for SketchUp Pro Scan.
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
                          placeholder="Firm Name"
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
                          placeholder="name@firm.com"
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                        <select
                          value={formData.industry}
                          onChange={e => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="Architecture & As-Built">Architecture & As-Built</option>
                          <option value="Construction Planning">Construction Planning</option>
                          <option value="Heritage Restoration">Heritage Restoration</option>
                          <option value="Surveying & Reality Capture">Surveying & Reality Capture</option>
                          <option value="Interior Fit-Out">Interior Fit-Out</option>
                          <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Number of Seats</label>
                        <select
                          value={formData.licenses}
                          onChange={e => setFormData({ ...formData, licenses: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                        >
                          <option value="1 Seat">1 Seat</option>
                          <option value="2-3 Seats">2-3 Seats</option>
                          <option value="4-10 Seats">4-10 Seats</option>
                          <option value="10+ Seats (Enterprise)">10+ Seats (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current 3D Scanner or Data Format</label>
                      <input
                        type="text"
                        value={formData.scanningEquipment}
                        onChange={e => setFormData({ ...formData, scanningEquipment: e.target.value })}
                        placeholder="e.g. Trimble X7, Faro Focus, Leica, Drone LiDAR, or E57 files"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Details or Questions</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your hardware configuration or specific scan deliverables..."
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
    </div>
  )
}

export default SketchUpProScanPage
