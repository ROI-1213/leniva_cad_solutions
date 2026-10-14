import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Box,
  ExternalLink,
  Check,
  Send,
  Layout,
  Printer,
  FileCode,
  PenTool,
  Coins,
  Layers,
  Ruler,
  Monitor,
  KeyRound,
  FileEdit,
  Download,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { aresStandardData } from '../data/aresStandardData'

export const AresStandardPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const data = aresStandardData

  // State
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [comparisonFilter, setComparisonFilter] = useState<'all' | 'included' | 'platform' | 'licensing'>('all')

  // Enquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    country: 'India',
    licenses: '1-5',
    preference: 'Annual Subscription',
    workflow: 'Architectural Drafting',
    message: '',
    consent: true,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Sticky sub-nav observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'benefits',
        'features',
        'workflow',
        'use-cases',
        'comparison',
        'platform',
        'licensing',
        'trial',
        'trinity',
        'faqs',
      ]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveTab(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    setTimeout(() => {
      setFormSubmitting(false)
      setFormSubmitted(true)
    }, 900)
  }

  const filteredFaqs =
    activeFaqCategory === 'all'
      ? data.faqs
      : data.faqs.filter((faq) => faq.category === activeFaqCategory)

  const filteredComparisonRows = data.comparison.rows.filter((row) => {
    if (comparisonFilter === 'all') return true
    if (comparisonFilter === 'included') return row.aresStandard === 'Included'
    if (comparisonFilter === 'platform') return row.capability.toLowerCase().includes('windows') || row.capability.toLowerCase().includes('mac') || row.capability.toLowerCase().includes('linux')
    if (comparisonFilter === 'licensing') return row.capability.toLowerCase().includes('license') || row.capability.toLowerCase().includes('plan')
    return true
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. BREADCRUMBS */}
      <div className="bg-slate-100 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-blue-600 transition-colors">
            Software
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">ARES Standard</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-8 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/ares-cad.png" alt="ARES CAD" className="h-full w-auto max-w-[85px] object-contain" />
                </div>
                <div className="h-8 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/grabert.png" alt="Graebert" className="h-full w-auto max-w-[85px] object-contain" />
                </div>
                <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>{data.hero.eyebrow}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {data.hero.headline}
              </h1>

              <div className="text-base sm:text-lg font-semibold text-blue-200">
                {data.hero.supportingHeadline}
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {data.hero.description}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {data.hero.highlights.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-3 items-center">
                <a
                  href={data.identity.trialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Free 30-Day Trial</span>
                </a>

                <a
                  href={data.identity.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => openQuoteModal('ARES Standard')}
                  className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4 text-slate-400" />
                  <span>Request Quote</span>
                </button>

                <a
                  href="#comparison"
                  className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors ml-2"
                >
                  <span>Compare ARES Standard vs ARES Commander</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-1">
                {data.hero.trialNote}
              </p>
            </motion.div>

            {/* Right Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 shadow-2xl bg-slate-800/50 backdrop-blur-sm group">
                <img
                  src={data.hero.image}
                  alt="ARES Standard 2D CAD Workstation"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold tracking-wide uppercase shadow">
                    {data.hero.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span className="font-semibold text-white flex items-center space-x-1.5">
                      <FileCode className="w-3.5 h-3.5 text-blue-400" />
                      <span>Native DWG Environment</span>
                    </span>
                    <span className="text-[11px] text-blue-400 font-mono">Windows 64-bit</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    2D drafting, layer controls, blocks with attributes, and BatchPrint publishing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. HERO INFORMATION STRIP */}
        <div className="mt-14 pt-6 border-t border-slate-800/80 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-2">
              {data.hero.strip.map((item, idx) => (
                <div key={idx} className="border-l border-slate-800 pl-3">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. STICKY SUB-NAVIGATION */}
      <nav className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2.5 space-x-1 sm:space-x-2 text-xs font-medium">
            <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'benefits', label: 'Why ARES Standard' },
                { id: 'features', label: 'Features' },
                { id: 'workflow', label: 'Workflow' },
                { id: 'use-cases', label: 'Use Cases' },
                { id: 'comparison', label: 'vs ARES Commander' },
                { id: 'platform', label: 'Platform & Specs' },
                { id: 'licensing', label: 'Licensing' },
                { id: 'trial', label: 'Free Trial' },
                { id: 'trinity', label: 'Trinity Context' },
                { id: 'faqs', label: 'FAQs' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="shrink-0 pl-3 hidden md:flex items-center space-x-2">
              <a
                href={data.identity.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Download</span>
              </a>
              <button
                onClick={() => openQuoteModal('ARES Standard')}
                className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
              >
                Quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 5. PRODUCT OVERVIEW */}
      <section id="overview" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Product Overview
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.overview.title}
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              {data.overview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.overview.blocks.map((block, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {idx === 0 && <PenTool className="w-5 h-5" />}
                    {idx === 1 && <FileEdit className="w-5 h-5" />}
                    {idx === 2 && <Printer className="w-5 h-5" />}
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {block.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {block.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {block.description}
                  </p>

                  <ul className="mt-4 pt-4 border-t border-slate-200/70 space-y-2">
                    {block.bullets.map((b, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY BENEFITS */}
      <section id="benefits" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Key Benefits
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.benefits.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {data.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.benefits.items.map((benefit, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-600 px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                      {benefit.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      {i === 0 && <FileCode className="w-4 h-4 text-blue-600" />}
                      {i === 1 && <PenTool className="w-4 h-4 text-emerald-600" />}
                      {i === 2 && <ShieldCheck className="w-4 h-4 text-blue-600" />}
                      {i === 3 && <Coins className="w-4 h-4 text-amber-600" />}
                      {i === 4 && <Layout className="w-4 h-4 text-purple-600" />}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {benefit.desc}
                  </p>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {benefit.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CORE FEATURES */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Features
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.features.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.items.map((feat) => (
              <div
                key={feat.id}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/50 uppercase tracking-wider">
                      {feat.tag}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      {feat.id === 'native-dwg' && <FileCode className="w-3.5 h-3.5" />}
                      {feat.id === 'drafting-tools' && <PenTool className="w-3.5 h-3.5" />}
                      {feat.id === 'layers' && <Layers className="w-3.5 h-3.5" />}
                      {feat.id === 'blocks-attributes' && <Box className="w-3.5 h-3.5" />}
                      {feat.id === 'dimensions' && <Ruler className="w-3.5 h-3.5" />}
                      {feat.id === 'viewing-printing' && <Printer className="w-3.5 h-3.5" />}
                      {feat.id === 'cad-interface' && <Layout className="w-3.5 h-3.5" />}
                      {feat.id === 'windows-workflow' && <Monitor className="w-3.5 h-3.5" />}
                      {feat.id === 'affordable-focus' && <Coins className="w-3.5 h-3.5" />}
                      {feat.id === 'perpetual-option' && <KeyRound className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{feat.subtitle}</div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CAD WORKFLOW SHOWCASE */}
      <section id="workflow" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.workflow.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.workflow.description}
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
            {data.workflow.steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  activeWorkflowStep === idx
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                  Step {step.stepNumber}
                </div>
                <div className="text-xs font-bold truncate mt-0.5">{step.shortTitle}</div>
              </button>
            ))}
          </div>

          {/* Active Workflow Card */}
          {(() => {
            const currentStep = data.workflow.steps[activeWorkflowStep]
            return (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono font-bold text-blue-600 px-2.5 py-1 rounded bg-blue-50 border border-blue-100">
                      {currentStep.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{currentStep.title}</h3>
                    <div className="text-xs font-semibold text-slate-500">{currentStep.subtitle}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{currentStep.description}</p>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                        Tools & Operations:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentStep.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                      <img
                        src={currentStep.image}
                        alt={currentStep.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* 9. USE CASES AND APPLICATIONS */}
      <section id="use-cases" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Use Cases
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.useCases.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.useCases.intro}
            </p>
          </div>

          {/* Section Hero Showcase Visual */}
          {data.useCases.image && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={data.useCases.image}
                  alt={`${data.useCases.title} - Professional 2D CAD drafting workstation`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-xl text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-white font-bold mb-2">
                    Native 2D DWG Workstation
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-white tracking-tight drop-shadow-sm">
                    Complete 2D CAD Workspace for Engineering & Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 mt-1 line-clamp-2">
                    Multi-layer management, coordinate precision, orthographic views, and comprehensive drafting annotation tools.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.useCases.items.map((uc) => (
              <div
                key={uc.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={uc.image}
                      alt={uc.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                      {uc.subtitle}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900">{uc.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{uc.description}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Key Deliverables
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {uc.deliverables.map((deliv, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ARES STANDARD VS ARES COMMANDER COMPARISON */}
      <section id="comparison" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Official Product Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.comparison.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.comparison.description}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: `All Capabilities (${data.comparison.rows.length})` },
              { id: 'included', label: 'Included in ARES Standard' },
              { id: 'platform', label: 'Platform Support' },
              { id: 'licensing', label: 'Licensing Terms' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setComparisonFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  comparisonFilter === f.id
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/2">
                    Capability
                  </th>
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/4 bg-blue-600 text-white text-center">
                    ARES Standard
                  </th>
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/4 text-slate-300 text-center">
                    ARES Commander
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredComparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.highlight ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-900">
                      {row.capability}
                    </td>
                    <td className="py-3.5 px-5 text-center font-bold bg-blue-50/30">
                      {row.aresStandard === 'Included' ? (
                        <span className="inline-flex items-center space-x-1 text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full text-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Included</span>
                        </span>
                      ) : row.aresStandard === 'Not included' ? (
                        <span className="text-slate-400 font-normal">—</span>
                      ) : (
                        <span className="text-slate-600 text-xs font-medium">{row.aresStandard}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-center font-medium text-slate-700">
                      {row.aresCommander === 'Included' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Included</span>
                        </span>
                      ) : row.aresCommander === 'Not included' ? (
                        <span className="text-slate-400 font-normal">—</span>
                      ) : (
                        <span className="text-slate-700 text-xs font-semibold">{row.aresCommander}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Callout Below Comparison */}
          <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">{data.comparisonCallout.headline}</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">{data.comparisonCallout.description}</p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                to="/products/ares-commander"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <span>Explore ARES Commander</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PLATFORM AND COMPATIBILITY */}
      <section id="platform" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Specifications
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.platform.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                OS: <strong>{data.platform.os}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                File Workflow: <strong>{data.platform.fileFormat}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                Core Use: <strong>{data.platform.coreUse}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.platform.specs.map((spec, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {spec.label}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">{spec.value}</div>
                {spec.note && <div className="text-[11px] text-slate-500 mt-1">{spec.note}</div>}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 italic mt-6">{data.platform.disclaimer}</p>

          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <span>Notice: ARES Standard is officially supported on 64-bit Windows systems.</span>
            <a
              href={data.identity.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ARES Standard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 12. LICENSING AND PRICING */}
      <section id="licensing" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Licensing Options
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.licensing.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.licensing.description}
            </p>
            <div className="mt-3 text-xs text-slate-500 italic">
              {data.licensing.disclaimer}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {data.licensing.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl border p-8 bg-white flex flex-col justify-between relative transition-all ${
                  tier.popular
                    ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    {tier.badge}
                  </span>
                )}

                <div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {tier.term}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{tier.name}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">{tier.subtitle}</div>

                  <div className="mt-6 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-2xl font-black text-slate-900">
                      {tier.pricePlaceholder}
                    </span>
                    <span className="text-xs text-slate-500 block mt-1">
                      Official commercial quotes in INR with GST invoice
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => openQuoteModal(`ARES Standard (${tier.name})`)}
                    className={`w-full py-3 rounded-lg text-xs font-semibold transition-all ${
                      tier.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Request a Quote
                  </button>
                  <a
                    href={data.licensing.officialBuyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[11px] text-blue-600 hover:text-blue-700 py-1"
                  >
                    Graebert Licensing Configurator →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FREE TRIAL SECTION */}
      <section id="trial" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                Official Free Evaluation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {data.freeTrial.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {data.freeTrial.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={data.freeTrial.trialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-colors flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Free 30-Day Trial</span>
                </a>
                <a
                  href={data.identity.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download Free Trial</span>
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2">
                {data.freeTrial.termsNote}
              </p>
            </div>
          </div>
        </div>
      </section>





      {/* 16. TRINITY ECOSYSTEM CONTEXT */}
      <section id="trinity" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Ecosystem Clarification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.trinityContext.title}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.trinityContext.description}
            </p>
            <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
              {data.trinityContext.distinction}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.trinityContext.ecosystem.map((eco, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-blue-600">{eco.role}</div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{eco.name}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{eco.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <a
              href={data.trinityContext.trinityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Discover ARES Trinity on Graebert.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 17. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Clear, verified answers regarding ARES Standard, DWG compatibility, licensing, and feature scope.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General' },
              { id: 'dwg', label: 'DWG Compatibility' },
              { id: 'comparison', label: 'vs Commander' },
              { id: 'licensing', label: 'Licensing' },
              { id: 'technical', label: 'Technical' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFaqCategory(cat.id)
                  setOpenFaqIndex(null)
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFaqCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 hover:bg-white transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
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

      {/* 18. RELATED PRODUCTS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              CAD Software Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore More from Graebert
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Discover dedicated 2D/3D CAD, mechanical engineering, and electrical schematic tools in the Graebert ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedProducts.map((prod, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {prod.category}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{prod.name}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {prod.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    to={`/products/${prod.slug}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. COMMERCIAL ENQUIRY FORM */}
      <section id="quote-form" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Sales Consultation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Talk to Our CAD Software Team
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
              Tell us about your drafting requirements and our team can help you explore the appropriate ARES licensing and product options.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for contacting Leniva CAD Solutions. A product specialist will reach out within 24 business hours with official ARES Standard licensing information.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Amit Verma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. amit@studio.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Company / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Design Studio Architects"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Number of Licenses
                    </label>
                    <select
                      value={formData.licenses}
                      onChange={(e) => setFormData({ ...formData, licenses: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white"
                    >
                      <option value="1">1 License</option>
                      <option value="2-5">2 to 5 Licenses</option>
                      <option value="6-15">6 to 15 Licenses</option>
                      <option value="16+">16+ Licenses</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred License
                    </label>
                    <select
                      value={formData.preference}
                      onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white"
                    >
                      <option value="Annual Subscription">Annual Subscription</option>
                      <option value="3-Year Subscription">3-Year Subscription</option>
                      <option value="Perpetual License">Perpetual License</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Workflow
                    </label>
                    <select
                      value={formData.workflow}
                      onChange={(e) => setFormData({ ...formData, workflow: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white"
                    >
                      <option value="Architectural Drafting">Architectural Drafting</option>
                      <option value="Engineering Drafting">Engineering Drafting</option>
                      <option value="Mechanical Drafting">Mechanical Drafting</option>
                      <option value="Construction Documentation">Construction Documentation</option>
                      <option value="Education / Enablement">Education / Enablement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your team size, current CAD tools, or any specific compatibility requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Authorized Graebert Reseller in India</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center space-x-2"
                  >
                    {formSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

export default AresStandardPage
