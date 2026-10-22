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
  Check,
  Send,
  Repeat,
  Crosshair,
  Wrench,
  Globe,
  Layout,
  Zap,
  Tag,
  Hash,
  Share2,
  FileSpreadsheet,
  Layers,
  Sliders,
  FolderTree,
  Flag,
  Shield,
  Compass,
  ToggleLeft,
  ShieldAlert,
  Activity,
  Link as LinkIcon,
  FileText,
  Eye,
  MessageSquare,
  Edit3,
  Bell,
  Cloud,
  Smartphone,
  Video,
  BookOpen,
  GraduationCap,
  Headphones,
  FileDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { aresElectricalData } from '../data/aresElectricalData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const AresElectricalPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const { data } = useCadPageData('ares_electrical', aresElectricalData)

  // State
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [activeStandard, setActiveStandard] = useState<string>('iec')
  const [activeComponentCategory, setActiveComponentCategory] = useState<string>('switches-relays')
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Enquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    country: 'India',
    licenses: '1-5',
    preference: 'Annual Subscription',
    application: 'Industrial Automation',
    message: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Sticky sub-nav observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'features',
        'automation',
        'standards',
        'components',
        'wiring',
        'panels',
        'multipage',
        'reports',
        'trinity',
        'workflow',
        'comparison',
        'videos',
        'gallery',
        'pricing',
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

  const filteredGallery =
    selectedGalleryCategory === 'all'
      ? data.gallery
      : data.gallery.filter((item) => item.category === selectedGalleryCategory)

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
          <span className="text-slate-800 font-medium">ARES Electrical</span>
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
                {data.hero.heading}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {data.hero.supportingText}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {data.hero.featureChips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-3 items-center">
                <button
                  onClick={() => openQuoteModal('ARES Electrical')}
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request a Quote</span>
                </button>

                <a
                  href="#features"
                  className="px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
                >
                  <span>Explore Features</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href={data.identity.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors ml-2"
                >
                  <span>Official Product Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
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
                  alt="ARES Electrical CAD Workspace"
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
                      <Zap className="w-3.5 h-3.5 text-blue-400" />
                      <span>DWG Schematic Engine</span>
                    </span>
                    <span className="text-[11px] text-blue-400 font-mono">ANSI • IEC • DIN • ABNT</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Automated wire numbering, contact cross-referencing & instant Bill of Materials.
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
                { id: 'features', label: 'Features' },
                { id: 'automation', label: 'Automation' },
                { id: 'standards', label: 'Standards' },
                { id: 'components', label: 'Components' },
                { id: 'wiring', label: 'Wiring & Panels' },
                { id: 'multipage', label: 'Multi-Page DWG' },
                { id: 'reports', label: 'Reports' },
                { id: 'trinity', label: 'Collaboration' },
                { id: 'workflow', label: 'Workflow' },
                { id: 'comparison', label: 'Comparison' },
                { id: 'pricing', label: 'Licensing' },
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

            <div className="shrink-0 pl-3 hidden md:block">
              <button
                onClick={() => openQuoteModal('ARES Electrical')}
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
              {data.overview.heading}
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              {data.overview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.overview.cards.map((card, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {idx === 0 && <Zap className="w-5 h-5" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 2 && <FileText className="w-5 h-5" />}
                    {idx === 3 && <Globe className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-blue-600 flex items-center space-x-1">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KEY BENEFITS */}
      <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Key Benefits
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.benefits.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {data.benefits.supportingText}
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
                      {i === 0 && <Zap className="w-4 h-4 text-blue-600" />}
                      {i === 1 && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                      {i === 2 && <Layers className="w-4 h-4 text-blue-600" />}
                      {i === 3 && <FileSpreadsheet className="w-4 h-4 text-amber-600" />}
                      {i === 4 && <Wrench className="w-4 h-4 text-purple-600" />}
                      {i === 5 && <Share2 className="w-4 h-4 text-blue-600" />}
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

      {/* 7. ELECTRICAL DESIGN AUTOMATION */}
      <section id="automation" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Automation Engine
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {data.automation.heading}
                </h2>
                <h3 className="text-base sm:text-lg font-semibold text-slate-700 mt-2">
                  {data.automation.subheading}
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {data.automation.description}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {data.automation.features.map((feat) => (
                  <div
                    key={feat.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-200 transition-all flex items-start space-x-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      {feat.id === 'wire-numbering' && <Hash className="w-4 h-4" />}
                      {feat.id === 'component-tagging' && <Tag className="w-4 h-4" />}
                      {feat.id === 'cross-referencing' && <Repeat className="w-4 h-4" />}
                      {feat.id === 'project-rules' && <Sliders className="w-4 h-4" />}
                      {feat.id === 'integrated-updates' && <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/50">
                          {feat.tag}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">{feat.subtitle}</div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual composition for automation */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2 font-mono text-blue-400">
                    <Zap className="w-4 h-4" />
                    <span>ARES_ECAD_AUTOMATION_ROUTINE</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[10px] font-mono">
                    STATUS: ACTIVE
                  </span>
                </div>

                <div className="my-6 space-y-4 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1 font-sans font-semibold">
                      Auto Wire Indexing
                    </div>
                    <div className="text-emerald-400 font-mono text-xs">
                      [L1] → Terminal X1:1 → Fuse F1:1 → Contactor K1:L1 (Net_101)
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1 font-sans">
                      Wire tags generated automatically with sequential net identification.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1 font-sans font-semibold">
                      Coil & Contact Cross-Referencing
                    </div>
                    <div className="text-blue-400 font-mono text-xs">
                      K1 Coil (Sheet 2, B4) ⟷ NO Contacts (Sheet 3, C2) [13-14]
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1 font-sans">
                      Automatic bidirectional cross-reference pointers maintained across drawings.
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-1 font-sans font-semibold">
                      BOM Synchronization
                    </div>
                    <div className="text-purple-400 font-mono text-xs">
                      Device = -QM1 | Standard = IEC 60947 | Quantity = 4 | State = Validated
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1 font-sans">
                      Bill of Materials automatically tracks newly inserted electrical devices.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Engine: ARES Commander 64-bit</span>
                  <button
                    onClick={() => openQuoteModal('ARES Electrical')}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1"
                  >
                    <span>Request Technical Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ELECTRICAL STANDARDS */}
      <section id="standards" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              International Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.standards.heading}
            </h2>
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 mt-2">
              {data.standards.subheading}
            </h3>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.standards.description}
            </p>
          </div>

          {/* Standards Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {data.standards.items.map((std) => (
              <button
                key={std.id}
                onClick={() => setActiveStandard(std.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeStandard === std.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-extrabold">{std.name}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      activeStandard === std.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {std.id === 'iec' && <Globe className="w-3.5 h-3.5" />}
                    {std.id === 'ansi' && <Flag className="w-3.5 h-3.5" />}
                    {std.id === 'din' && <Shield className="w-3.5 h-3.5" />}
                    {std.id === 'abnt' && <Compass className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div
                  className={`text-xs truncate ${
                    activeStandard === std.id ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {std.fullName}
                </div>
              </button>
            ))}
          </div>

          {/* Active Standard Details Card */}
          {(() => {
            const currentStd = data.standards.items.find((s) => s.id === activeStandard) || data.standards.items[0]
            return (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-black text-slate-900">{currentStd.name}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {currentStd.region}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600">{currentStd.fullName}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{currentStd.description}</p>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Drafting Conventions:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">{currentStd.conventions}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Standards Key Highlights
                    </span>
                    <ul className="space-y-2">
                      {data.standards.keyHighlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* 9. ELECTRICAL COMPONENT LIBRARIES */}
      <section id="components" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Intelligent Libraries
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.components.heading}
            </h2>
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 mt-2">
              {data.components.subheading}
            </h3>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.components.description}
            </p>
          </div>

          {/* Component Category Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {data.components.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveComponentCategory(cat.id)}
                className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  activeComponentCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                      activeComponentCategory === cat.id
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {cat.id === 'switches-relays' && <ToggleLeft className="w-4 h-4" />}
                    {cat.id === 'circuit-protection' && <ShieldAlert className="w-4 h-4" />}
                    {cat.id === 'terminals-connectors' && <Cpu className="w-4 h-4" />}
                    {cat.id === 'sensors-motors' && <Activity className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      activeComponentCategory === cat.id ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {cat.eyebrow}
                  </span>
                  <h4 className="text-sm font-bold mt-1 leading-snug">{cat.title}</h4>
                </div>
                <div
                  className={`mt-4 pt-3 border-t text-[11px] ${
                    activeComponentCategory === cat.id
                      ? 'border-white/20 text-blue-100'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  {cat.examples.length} device groups included
                </div>
              </button>
            ))}
          </div>

          {/* Selected Component Showcase */}
          {(() => {
            const currentCat =
              data.components.categories.find((c) => c.id === activeComponentCategory) ||
              data.components.categories[0]
            return (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                      {currentCat.eyebrow}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{currentCat.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{currentCat.description}</p>
                    
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                        Representative Component Types:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {currentCat.examples.map((ex, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-center space-x-2"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                      <img
                        src={currentCat.image}
                        alt={currentCat.title}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Component Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {data.components.features.map((feat, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{feat.title}</span>
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WIRING DIAGRAMS & CONTROL PANELS */}
      <section id="wiring" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Wiring Diagrams */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Wiring Schematics
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {data.wiringDiagrams.heading}
                </h2>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {data.wiringDiagrams.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="text-xs font-bold text-blue-900">
                  {data.wiringDiagrams.supportingMessage.title}
                </div>
                <p className="text-xs text-blue-800 mt-1">
                  {data.wiringDiagrams.supportingMessage.text}
                </p>
              </div>

              <div className="space-y-2.5">
                {data.wiringDiagrams.features.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Control Panel Design */}
            <div id="panels" className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Cabinet & Panel Layouts
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {data.controlPanels.heading}
                </h2>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {data.controlPanels.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.controlPanels.features.map((feat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      {i === 0 && <Layout className="w-3.5 h-3.5" />}
                      {i === 1 && <Crosshair className="w-3.5 h-3.5" />}
                      {i === 2 && <LinkIcon className="w-3.5 h-3.5" />}
                      {i === 3 && <Box className="w-3.5 h-3.5" />}
                      {i === 4 && <FileText className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900">{feat.title}</div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integrated Equipment Layout & Wire Routing */}
          <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Integrated Equipment Layout
              </span>
              <h3 className="text-lg font-bold text-slate-900">{data.equipmentLayout.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{data.equipmentLayout.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {data.equipmentLayout.splitFeatures.map((sf, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-xs font-bold text-slate-800">{sf.title}</div>
                    <p className="text-[11px] text-slate-600 mt-1">{sf.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Wire Routing & Planning
              </span>
              <h3 className="text-lg font-bold text-slate-900">{data.wireRouting.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{data.wireRouting.description}</p>
              <ul className="space-y-2 pt-2">
                {data.wireRouting.workflowPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                <strong>Accuracy Note:</strong> {data.wireRouting.accuracyNote}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. MULTI-PAGE DWG PROJECTS */}
      <section id="multipage" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  Multi-Page Architecture
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {data.multiPageProjects.heading}
                </h2>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {data.multiPageProjects.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900">
                  {data.multiPageProjects.supportingMessage.title}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {data.multiPageProjects.supportingMessage.text}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.multiPageProjects.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Sheet Navigation Tree */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-xl">
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-4 pb-3 border-b border-slate-800">
                  <FolderTree className="w-4 h-4" />
                  <span>PROJECT_SHEETS_EXPLORER.DWG</span>
                </div>
                <div className="space-y-2">
                  {data.multiPageProjects.exampleSheets.map((sheet, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-mono flex items-center justify-between text-slate-300"
                    >
                      <span className="truncate">{sheet}</span>
                      <span className="text-[10px] text-blue-400 font-sans uppercase">DWG Tab</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                  Support for tens or hundreds of sheets within unified DWG container
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. AUTOMATIC PROJECT REPORTS */}
      <section id="reports" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Automated Reports
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.projectReports.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.projectReports.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.projectReports.reportTypes.map((rep, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-600 px-2 py-0.5 rounded bg-blue-50 border border-blue-100">
                      {rep.format}
                    </span>
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{rep.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rep.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Capabilities Strip */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-4">
              Report Generation Capabilities:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projectReports.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. ARES TRINITY COLLABORATION */}
      <section id="trinity" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Cloud Collaboration
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.trinity.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.trinity.description}
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
              {data.trinity.licenseDistinction}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.trinity.features.map((feat, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  {i === 0 && <Eye className="w-4 h-4" />}
                  {i === 1 && <MessageSquare className="w-4 h-4" />}
                  {i === 2 && <Edit3 className="w-4 h-4" />}
                  {i === 3 && <Bell className="w-4 h-4" />}
                  {i === 4 && <Cloud className="w-4 h-4" />}
                  {i === 5 && <Smartphone className="w-4 h-4" />}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end">
            <a
              href={data.trinity.trinityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Explore ARES Trinity Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 14. END-TO-END WORKFLOW */}
      <section id="workflow" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              End-to-End Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              From Electrical Concept to Project Documentation
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              ARES Electrical brings schematic drafting, component management, automation, and reporting into one connected DWG-based workflow.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {data.workflow.map((step, idx) => (
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
            const currentStep = data.workflow[activeWorkflowStep]
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
                        Supported Tools & Operations:
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

      {/* 15. COMPARISON TABLE */}
      <section id="comparison" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Feature Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.comparison.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.comparison.subheading}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3">
                    Capability
                  </th>
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3 text-slate-300">
                    General-Purpose DWG CAD
                  </th>
                  <th className="py-4 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3 bg-blue-600 text-white">
                    ARES Electrical
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.comparison.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.highlight ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center space-x-2">
                      {row.highlight && <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      <span>{row.capability}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">{row.generalCad}</td>
                    <td className="py-3.5 px-5 font-semibold text-blue-900 bg-blue-50/50">
                      {row.aresElectrical}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => openQuoteModal('ARES Electrical')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Talk to an Electrical CAD Specialist
            </button>
          </div>
        </div>
      </section>

      {/* 16. VIDEOS */}
      <section id="videos" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Official Video Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.videos.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.videos.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.videos.items.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg">
                        <Video className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-white">
                      {vid.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-white">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {vid.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {vid.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={data.videos.officialVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>Watch Official Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. PRODUCT GALLERY */}
      <section id="gallery" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Visual Gallery
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Electrical Design and Documentation
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Illustrative CAD workflows representing schematic ladder diagrams, component selectors, and multi-sheet deliverables.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'all', label: 'All Media' },
              { id: 'workspace', label: 'Workspace' },
              { id: 'schematics', label: 'Schematics' },
              { id: 'wiring', label: 'Wiring' },
              { id: 'panels', label: 'Control Panels' },
              { id: 'reports', label: 'Reports' },
              { id: 'collaboration', label: 'Collaboration' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedGalleryCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedGalleryCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.image)}
                className="group cursor-pointer rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-lg transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] text-white">
                    {item.categoryLabel}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Expanded visual" className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="p-4 bg-slate-900 text-right">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 18. PRICING AND LICENSING */}
      <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Licensing Options
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.licensing.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.licensing.description}
            </p>
            <div className="mt-3 text-xs text-slate-500 italic">
              {data.licensing.disclaimer}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {data.licensing.tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg p-8 bg-white flex flex-col justify-between relative transition-all"
              >
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
                    onClick={() => openQuoteModal(`ARES Electrical (${tier.name})`)}
                    className="w-full py-3 rounded-lg text-xs font-semibold transition-all bg-slate-900 hover:bg-blue-600 text-white"
                  >
                    Request a Quote
                  </button>
                  <a
                    href={data.identity.configuratorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[11px] text-blue-600 hover:text-blue-700 py-1"
                  >
                    Compare Official Configurator →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
              Verified Regional Terms & Conditions
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
              {data.licensing.verifiedFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 19. PLATFORM & SYSTEM REQUIREMENTS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Hardware & Software Specs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.platform.heading}
            </h2>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-slate-700">
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                OS: <strong>{data.platform.os}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                Languages: <strong>{data.platform.languages.join(', ')}</strong>
              </span>
              <span className="px-3 py-1 rounded bg-slate-100 border border-slate-200">
                Primary Format: <strong>{data.platform.primaryFormat}</strong>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="py-3 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3">
                    Component
                  </th>
                  <th className="py-3 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3">
                    Minimum Specification
                  </th>
                  <th className="py-3 px-5 font-bold uppercase text-[11px] tracking-wider w-1/3 text-blue-700">
                    Recommended Specification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.platform.sysReqs.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-5 font-bold text-slate-900">{req.label}</td>
                    <td className="py-3 px-5 text-slate-600">{req.min}</td>
                    <td className="py-3 px-5 font-semibold text-slate-800 bg-blue-50/20">{req.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 20. SUPPORT & LEARNING RESOURCES */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Support & Onboarding
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {data.resources.heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              {data.resources.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.resources.cards.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {i === 0 && <BookOpen className="w-4 h-4" />}
                    {i === 1 && <Video className="w-4 h-4" />}
                    {i === 2 && <GraduationCap className="w-4 h-4" />}
                    {i === 3 && <Headphones className="w-4 h-4" />}
                    {i === 4 && <FileDown className="w-4 h-4" />}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{res.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center space-x-1">
                  <span>{res.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 21. FREQUENTLY ASKED QUESTIONS */}
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
              Clear, verified answers regarding ARES Electrical, licensing, standards, and DWG compatibility.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General' },
              { id: 'automation', label: 'Automation' },
              { id: 'standards', label: 'Standards' },
              { id: 'dwg', label: 'DWG Format' },
              { id: 'trinity', label: 'Trinity' },
              { id: 'licensing', label: 'Licensing' },
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

      {/* 22. RELATED PRODUCTS */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore More CAD and Engineering Software
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Discover compatible CAD drafting, 3D visualization, and rendering software from our authorized catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

      {/* 23. COMMERCIAL ENQUIRY FORM */}
      <section id="quote-form" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Direct Sales Enquiry
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Request ARES Electrical Quote & Consultation
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto">
              Get official regional quotes in INR, license configuration advice, and schedule an electrical CAD demonstration for your team.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You for Your Enquiry!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our team will contact you shortly.
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
                      placeholder="e.g. Rajesh Sharma"
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
                      placeholder="e.g. rajesh@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Precision Controls Pvt Ltd"
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
                      <option value="1">1 Seat</option>
                      <option value="2-5">2 to 5 Seats</option>
                      <option value="6-15">6 to 15 Seats</option>
                      <option value="16+">16+ Enterprise / Network Flex</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      License Preference
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
                      Primary Application
                    </label>
                    <select
                      value={formData.application}
                      onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white"
                    >
                      <option value="Industrial Automation">Industrial Automation</option>
                      <option value="Control Panel Design">Control Panel Design</option>
                      <option value="Wiring Diagrams">Wiring Diagrams</option>
                      <option value="Equipment Layout Planning">Equipment Layout</option>
                      <option value="Consulting / General ECAD">Consulting / General ECAD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current drafting tools, whether you need Trinity cloud features, or specific standard preferences (IEC, ANSI, DIN)..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Authorized Graebert Reseller Partner in India</span>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center space-x-2"
                  >
                    {formSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Request Product Information</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 24. FINAL CALL TO ACTION */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>DWG Electrical CAD Automation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Make Electrical Design More Connected and Efficient
          </h2>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Create, automate, and document electrical projects with a DWG-compatible ECAD solution designed for electrical schematics, wiring diagrams, control panels, and project reporting.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal('ARES Electrical')}
              className="px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>

            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-slate-400" />
              <span>Talk to Our CAD Specialist</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AresElectricalPage
