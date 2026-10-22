import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Cloud,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Shield,
  Sparkles,
  Zap,
  Globe,
  Share2,
  Lock,
  MessageSquare,
  QrCode,
  Box,
  FileCode,
  Building2,
  Check,
  Send,
  AtSign,
  Copy,
  FolderSync,
  Bot,
  Laptop,
  Smartphone,
  PlayCircle,
  BookOpen,
  Award,
  Video,
  ChevronRight,
  HardHat,
  Users,
  Compass,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { aresKudoData } from '../data/aresKudoData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const AresKudoPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const { data } = useCadPageData('ares_kudo', aresKudoData)

  // State management
  const [activeNav, setActiveNav] = useState('overview')
  const [activeFeatureCat, setActiveFeatureCat] = useState('drawing')
  const [activeStorageFilter, setActiveStorageFilter] = useState<'all' | 'Public Cloud' | 'Enterprise Cloud' | 'BIM & Engineering' | 'Private Server'>('all')
  const [activePersona, setActivePersona] = useState(0)

  const [activeAiPromptIndex, setActiveAiPromptIndex] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [faqCategory, setFaqCategory] = useState<string>('all')
  const [copiedShareLink, setCopiedShareLink] = useState(false)
  const [sharePasswordProtected, setSharePasswordProtected] = useState(true)
  const [shareExpiryDays, setShareExpiryDays] = useState(14)
  const [comparisonFilter, setComparisonFilter] = useState<string>('all')

  // Consultation form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formSeats, setFormSeats] = useState('1-5')
  const [formCloudStorage, setFormCloudStorage] = useState('Google Drive')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)

  // Document Title & SEO
  useEffect(() => {
    document.title = 'ARES Kudo – Online DWG CAD Software | Cloud CAD | Graebert'
    window.scrollTo(0, 0)
  }, [])

  // Structured Data (JSON-LD)
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'ARES Kudo',
          operatingSystem: 'Web Browser (Chrome, Edge, Firefox, Safari)',
          applicationCategory: 'DesignApplication',
          offers: {
            '@type': 'Offer',
            price: 'Contact for Quote',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Graebert GmbH',
            url: 'https://www.graebert.com',
          },
          description:
            'ARES Kudo is the advanced cloud-based CAD solution for creating, viewing, editing, and collaborating on native DWG drawings directly in modern web browsers.',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lenivacadsolution.com' },
            { '@type': 'ListItem', position: 2, name: 'CAD Software', item: 'https://lenivacadsolution.com/products/cad-software' },
            { '@type': 'ListItem', position: 3, name: 'ARES Kudo', item: 'https://lenivacadsolution.com/cad-software/ares-kudo' },
          ],
        },
      ],
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setActiveNav(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 140
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // Active section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'overview',
        'features-300',
        'native-dwg',
        'cloud-storage',
        'collaboration',
        'block-library',
        'ai-assist',
        'automation',
        'bim-dwg',
        'personas',
        'trinity',
        'autocad-comparison',
        'comparison',
        'pricing',
        'developers',
        'faqs',
        'consultation',
      ]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveNav(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtered storage connectors
  const filteredStorage = useMemo(() => {
    if (activeStorageFilter === 'all') return data.cloudStorage.integrations
    return data.cloudStorage.integrations.filter(item => item.category === activeStorageFilter)
  }, [activeStorageFilter, data.cloudStorage.integrations])

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (faqCategory === 'all') return data.faqs
    return data.faqs.filter(f => f.category === faqCategory)
  }, [faqCategory, data.faqs])

  // Filtered comparison rows
  const filteredComparisonRows = useMemo(() => {
    if (comparisonFilter === 'all') return data.comparisonMatrix
    return data.comparisonMatrix.filter(r => r.category === comparisonFilter)
  }, [comparisonFilter, data.comparisonMatrix])

  // Form submit handler
  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)
    setTimeout(() => {
      setFormSubmitting(false)
      setFormSubmitted(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-inter">
      {/* ====================================================
          1. STICKY SUB-NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-14 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>ARES Kudo</span>
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
              Cloud DWG CAD
            </span>
          </div>

          {/* Navigation Links */}
          <div className="w-full lg:w-auto order-3 lg:order-2 flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1.5 lg:py-2 border-t lg:border-t-0 border-slate-100 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features-300', label: '300+ Features' },
              { id: 'native-dwg', label: 'Native DWG' },
              { id: 'cloud-storage', label: 'Cloud Storage' },
              { id: 'collaboration', label: 'Collaboration' },
              { id: 'block-library', label: 'Block Library' },
              { id: 'ai-assist', label: 'A3 AI Assist' },
              { id: 'automation', label: 'Automation' },
              { id: 'bim-dwg', label: 'BIM to DWG' },
              { id: 'personas', label: 'Who Is It For' },
              { id: 'trinity', label: 'ARES Trinity' },
              { id: 'autocad-comparison', label: 'AutoCAD LT Alt' },
              { id: 'comparison', label: 'Compare' },
              { id: 'pricing', label: 'Licensing' },
              { id: 'developers', label: 'Developers' },
              { id: 'faqs', label: 'FAQs' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeNav === item.id
                    ? 'bg-blue-600 text-white font-bold shadow-2xs'
                    : 'hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Direct CTA */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            <button
              onClick={() => openQuoteModal('ARES Kudo 30-Day Free Trial')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => scrollTo('consultation')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all flex items-center space-x-1"
            >
              <span>Request Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. HERO SECTION
         ==================================================== */}
      <section id="overview" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 border-b border-slate-800">
        {/* Subtle CAD Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <Link to="/products/cad-software" className="hover:text-white transition-colors">CAD Software</Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-blue-400 font-semibold">ARES Kudo</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
                <Cloud className="w-3.5 h-3.5 text-blue-400" />
                <span>{data.hero.eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                The Most Advanced Online CAD Software for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400">
                  DWG Viewing & Editing
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                {data.hero.subheading}. {data.hero.description}
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {data.hero.pills.map((pill, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => openQuoteModal('ARES Kudo Free Trial Request')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{data.hero.primaryCta}</span>
                </button>
                <button
                  onClick={() => scrollTo('features-300')}
                  className="px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{data.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold underline underline-offset-4 cursor-pointer"
                >
                  {data.hero.tertiaryCta}
                </button>
              </div>

              {/* Compatibility trust bar */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-4 text-xs text-slate-400">
                <span>Runs seamlessly on:</span>
                <span className="font-semibold text-slate-200">Chrome</span>
                <span>•</span>
                <span className="font-semibold text-slate-200">Edge</span>
                <span>•</span>
                <span className="font-semibold text-slate-200">Firefox</span>
                <span>•</span>
                <span className="font-semibold text-slate-200">Safari</span>
                <span>•</span>
                <span className="text-cyan-400 font-mono">100% Zero Install</span>
              </div>
            </div>

            {/* Right Hero Visual: Authentic High-Resolution CAD Browser Workspace Mockup */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Browser Top Chrome */}
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-400 max-w-xs truncate font-mono">
                    <Lock className="w-3 h-3 text-green-400 shrink-0" />
                    <span className="text-slate-300">kudo.graebert.com</span>
                    <span className="text-slate-500">/drawing/ARCH-L4-Floorplan.dwg</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                    <FolderSync className="w-3 h-3 animate-spin text-cyan-400" />
                    <span>Synced (Google Drive)</span>
                  </div>
                </div>

                {/* CAD Ribbon Bar */}
                <div className="bg-slate-900/90 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-white bg-blue-600 px-2 py-0.5 rounded">ARES KUDO</span>
                    <span className="hover:text-white cursor-pointer">Home</span>
                    <span className="hover:text-white cursor-pointer font-semibold text-blue-400">Draw</span>
                    <span className="hover:text-white cursor-pointer">Modify</span>
                    <span className="hover:text-white cursor-pointer">Annotate</span>
                    <span className="hover:text-white cursor-pointer">Layers</span>
                    <span className="hover:text-white cursor-pointer">Trinity Blocks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-purple-900/40 border border-purple-600/40 text-purple-300 px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-bold">
                      <Bot className="w-3 h-3 text-purple-400" />
                      <span>A3 AI Active</span>
                    </span>
                  </div>
                </div>

                {/* Simulated Interactive CAD Canvas */}
                <div className="relative h-80 sm:h-96 bg-[#0a0f1d] overflow-hidden p-4">
                  {/* Blueprint Grid Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cadGrid)" />
                  </svg>

                  {/* Architectural Floorplan Vector Graphics */}
                  <svg className="relative w-full h-full text-slate-200" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer Walls */}
                    <rect x="40" y="30" width="420" height="280" stroke="#38bdf8" strokeWidth="2.5" />
                    {/* Interior Partition Walls */}
                    <path d="M 180 30 L 180 200 L 40 200" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 180 200 L 180 310" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 180 120 L 340 120 L 340 310" stroke="#38bdf8" strokeWidth="2" />
                    {/* Door Arc Swings */}
                    <path d="M 180 80 A 30 30 0 0 1 150 110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="180" y1="80" x2="150" y2="80" stroke="#f59e0b" strokeWidth="1.5" />
                    <path d="M 340 180 A 30 30 0 0 1 310 210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="340" y1="180" x2="310" y2="180" stroke="#f59e0b" strokeWidth="1.5" />
                    {/* Columns */}
                    <rect x="36" y="26" width="12" height="12" fill="#38bdf8" />
                    <rect x="176" y="26" width="12" height="12" fill="#38bdf8" />
                    <rect x="452" y="26" width="12" height="12" fill="#38bdf8" />
                    <rect x="36" y="302" width="12" height="12" fill="#38bdf8" />
                    <rect x="452" y="302" width="12" height="12" fill="#38bdf8" />
                    {/* Dimension Lines */}
                    <line x1="40" y1="15" x2="180" y2="15" stroke="#ef4444" strokeWidth="1" />
                    <text x="100" y="12" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="monospace">6,800 mm</text>
                    <line x1="180" y1="15" x2="460" y2="15" stroke="#ef4444" strokeWidth="1" />
                    <text x="320" y="12" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="monospace">14,200 mm</text>
                    {/* Room Labels */}
                    <text x="110" y="100" fill="#94a3b8" fontSize="11" fontWeight="bold">CONFERENCE A</text>
                    <text x="110" y="115" fill="#64748b" fontSize="8" fontFamily="monospace">Area: 48.65 m²</text>
                    <text x="260" y="210" fill="#94a3b8" fontSize="11" fontWeight="bold">OPEN OFFICE</text>
                    <text x="260" y="225" fill="#64748b" fontSize="8" fontFamily="monospace">Area: 112.40 m²</text>
                    <text x="400" y="180" fill="#94a3b8" fontSize="11" fontWeight="bold">MEP RISER</text>
                  </svg>

                  {/* Floating Collaboration Markup Pin with Avatar */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-16 left-12 bg-slate-900/95 border border-cyan-500/50 rounded-xl p-2.5 shadow-xl text-xs max-w-[210px] backdrop-blur-md"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                        RK
                      </div>
                      <span className="font-bold text-cyan-300 text-[11px]">Rahul K. (Lead Eng)</span>
                      <span className="text-[9px] text-slate-400">2m ago</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-tight">
                      Door swing conflicts with HVAC riser. Please flip orientation per revision 4.
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-cyan-400">
                      <span className="bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Voice memo (0:14)</span>
                      <span className="text-slate-400">Reply</span>
                    </div>
                  </motion.div>

                  {/* Floating A3 AI Suggestion Bubble */}
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-4 right-4 bg-slate-900/95 border border-purple-500/50 rounded-xl p-3 shadow-xl text-xs max-w-[240px] backdrop-blur-md"
                  >
                    <div className="flex items-center space-x-1.5 text-purple-300 font-bold text-[11px] mb-1">
                      <Bot className="w-3.5 h-3.5 text-purple-400" />
                      <span>ARES AI Assist (A3)</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Room boundary calculated: <span className="text-purple-300 font-mono font-bold">48.65 m²</span>. Insert tag or export schedule to Excel?
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        Insert Tag
                      </button>
                      <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                        Export Excel
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Canvas Status Bar */}
                <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">MODEL</span>
                    <span>LAYOUT 1</span>
                    <span>LAYOUT 2</span>
                    <span className="text-slate-600">|</span>
                    <span>X: 18420.50</span>
                    <span>Y: 8250.00</span>
                    <span>Z: 0.00</span>
                  </div>
                  <div className="flex items-center space-x-3 text-cyan-400">
                    <span>SNAP: ON</span>
                    <span>GRID: ON</span>
                    <span>ORTHO: ON</span>
                    <span>POLAR: OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. PRODUCT INTRODUCTION & TRADITIONAL VS KUDO
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              The Cloud CAD Shift
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.introduction.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.introduction.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Traditional Desktop CAD */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-8 space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{data.introduction.traditionalVsKudo.traditional.title}</h3>
                  <span className="text-xs text-slate-500">Legacy Workstation Model</span>
                </div>
              </div>
              <ul className="space-y-3">
                {data.introduction.traditionalVsKudo.traditional.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600">
                    <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ARES Kudo Cloud CAD */}
            <div className="rounded-2xl border-2 border-blue-500 bg-gradient-to-b from-blue-50/40 via-white to-blue-50/20 p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                  Modern Standard
                </span>
              </div>
              <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{data.introduction.traditionalVsKudo.kudo.title}</h3>
                  <span className="text-xs text-blue-600 font-semibold">Native Browser Engine</span>
                </div>
              </div>
              <ul className="space-y-3">
                {data.introduction.traditionalVsKudo.kudo.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. 300+ CAD FEATURES SECTION (INTERACTIVE BREAKDOWN)
         ==================================================== */}
      <section id="features-300" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
              {data.features300.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.features300.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.features300.description}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {data.features300.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFeatureCat(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFeatureCat === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Selected Category Content */}
          <div className="max-w-4xl mx-auto">
            {data.features300.categories
              .filter(c => c.id === activeFeatureCat)
              .map(cat => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/90 border border-slate-700 rounded-2xl p-8 backdrop-blur-md space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{cat.description}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                      {cat.count}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {cat.tools.map((tool, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-blue-500/50 transition-colors"
                      >
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{tool}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span>Standard CAD command line shortcuts fully supported (L, PL, C, TR, EX, ATT, MTEXT, XREF).</span>
                    <button
                      onClick={() => openQuoteModal(`ARES Kudo Features Inquiry: ${cat.name}`)}
                      className="text-cyan-400 hover:underline font-semibold"
                    >
                      Inquire Specific Commands →
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. NATIVE DWG SECTION
         ==================================================== */}
      <section id="native-dwg" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Zero File Translation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.nativeDwg.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.nativeDwg.subheading}. {data.nativeDwg.description}
            </p>
          </div>

          {/* Animated File Flow Diagram */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 mb-14 shadow-xl border border-slate-800">
            <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-6 text-center font-bold">
              Native DWG Cloud Data Pipeline
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
              {data.nativeDwg.flowSteps.map((s, idx) => (
                <div key={idx} className="relative p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400">{s.step}</span>
                    <FileCode className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{s.desc}</p>
                  {idx < 4 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-5 h-5 text-cyan-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4 Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.nativeDwg.points.map((pt, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{pt.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. WORK FROM ANYWHERE
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Device Independence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.workAnywhere.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.workAnywhere.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.workAnywhere.locations.map(loc => (
              <div
                key={loc.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {loc.id === 'office' && <Building2 className="w-5 h-5" />}
                  {loc.id === 'home' && <Laptop className="w-5 h-5" />}
                  {loc.id === 'site' && <HardHat className="w-5 h-5" />}
                  {loc.id === 'client' && <Users className="w-5 h-5" />}
                  {loc.id === 'remote' && <Globe className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{loc.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{loc.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. CLOUD STORAGE INTEGRATION (ZERO LOCAL SILOS)
         ==================================================== */}
      <section id="cloud-storage" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Open Cloud Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.cloudStorage.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.cloudStorage.subheading}. {data.cloudStorage.description}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {(['all', 'Public Cloud', 'Enterprise Cloud', 'BIM & Engineering', 'Private Server'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveStorageFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStorageFilter === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'all' ? 'All Connectors' : tab}
              </button>
            ))}
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredStorage.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 font-mono uppercase">{item.category}</span>
                    {item.isPopular && (
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Enterprise Popular
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Security & Data Sovereignty Note */}
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600 shrink-0" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">Zero Local Duplication:</span> ARES Kudo streams DWGs directly from your authorized storage. IT directors retain complete whitelist control over allowed providers.
              </div>
            </div>
            <button
              onClick={() => openQuoteModal('Enterprise Cloud Storage Architecture Consultation')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0 hover:bg-blue-700 transition-colors"
            >
              Enterprise IT Specs
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. MODERN COLLABORATION & IN-DRAWING MARKUPS
         ==================================================== */}
      <section id="collaboration" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Real-Time Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.collaboration.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.collaboration.subheading}. {data.collaboration.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.collaboration.tools.map(tool => (
              <div
                key={tool.id}
                className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-cyan-400/60 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
                    {tool.id === 'view-only-links' && <Share2 className="w-5 h-5" />}
                    {tool.id === 'rich-comments' && <MessageSquare className="w-5 h-5" />}
                    {tool.id === 'email-mentions' && <AtSign className="w-5 h-5" />}
                    {tool.id === 'qr-codes' && <QrCode className="w-5 h-5" />}
                  </div>
                  <h4 className="text-base font-bold text-white">{tool.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{tool.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-700 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">Key Benefits</span>
                  {tool.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulated View-Only Link Generator Widget */}
          <div className="max-w-2xl mx-auto rounded-2xl bg-slate-950 border border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive Simulator: Create a View-Only Sharing Link
                </span>
              </div>
              <span className="text-[10px] font-mono bg-green-950 text-green-400 px-2 py-0.5 rounded border border-green-800">
                Live URL Engine
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sharePasswordProtected}
                    onChange={e => setSharePasswordProtected(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Require password protection</span>
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">Expires in:</span>
                  <select
                    value={shareExpiryDays}
                    onChange={e => setShareExpiryDays(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-200"
                  >
                    <option value={7}>7 Days</option>
                    <option value={14}>14 Days</option>
                    <option value={30}>30 Days</option>
                    <option value={90}>90 Days</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-2.5">
                <span className="text-xs text-slate-400 font-mono truncate flex-1">
                  https://kudo.graebert.com/share/dwg-view?token=8f3c7e&expiry={shareExpiryDays}d{sharePasswordProtected ? '&pwd=true' : ''}
                </span>
                <button
                  onClick={() => {
                    setCopiedShareLink(true)
                    setTimeout(() => setCopiedShareLink(false), 2000)
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shrink-0"
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Stakeholders can view, measure, and comment on the drawing in their phone or desktop browser with zero login or software installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          9. TRINITY ONLINE BLOCK LIBRARY (450+ BLOCKS)
         ==================================================== */}
      <section id="block-library" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Standardized Assets
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.blockLibrary.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.blockLibrary.subheading}. {data.blockLibrary.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-2xl font-black text-blue-600">{data.blockLibrary.stats.blocksCount}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Standard Blocks</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-2xl font-black text-blue-600">{data.blockLibrary.stats.categoriesCount}</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Disciplines</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-2xl font-black text-blue-600">Dynamic</span>
                  <span className="text-[11px] text-slate-500 font-semibold">Grip Grippers</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {data.blockLibrary.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.blockLibrary.categories.map((cat, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                    <Box className="w-4 h-4 text-blue-600" />
                    <span>{cat.name}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((item, i) => (
                      <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. AI ASSISTANCE (ARES AI ASSIST - A3)
         ==================================================== */}
      <section id="ai-assist" className="py-20 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950 px-3 py-1 rounded-full border border-purple-800 flex items-center justify-center gap-1.5 w-fit mx-auto">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>ARES AI Assist (A3)</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.aiAssist.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.aiAssist.subheading}. {data.aiAssist.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 4 AI Capabilities */}
            <div className="lg:col-span-5 space-y-4">
              {data.aiAssist.capabilities.map((cap, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-colors space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>{cap.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Interactive AI Simulator */}
            <div className="lg:col-span-7 bg-slate-900 border border-purple-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Interactive A3 Copilot Console
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  Natural Language CAD Engine
                </span>
              </div>

              {/* Sample Prompt Selector Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400">Click a CAD question to test A3:</span>
                <div className="flex flex-wrap gap-2">
                  {data.aiAssist.samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAiPromptIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left truncate max-w-full ${
                        activeAiPromptIndex === idx
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      "{p.user.substring(0, 38)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Chat Dialogue */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    YOU
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-slate-800 text-xs text-slate-200 border border-slate-700 leading-relaxed">
                    {data.aiAssist.samplePrompts[activeAiPromptIndex].user}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 shadow-md">
                    A3
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-purple-950/40 text-xs text-purple-100 border border-purple-800/60 leading-relaxed space-y-2">
                    <p>{data.aiAssist.samplePrompts[activeAiPromptIndex].assistant}</p>
                    <div className="flex items-center space-x-2 text-[10px] text-purple-400 font-mono">
                      <span>✓ Command shortcut identified</span>
                      <span>•</span>
                      <span>Ready to execute</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          11. DRAWINGS AUTOMATION PIPELINE
         ==================================================== */}
      <section id="automation" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Cloud Batch Processing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.automation.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.automation.subheading}. {data.automation.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.automation.pipelines.map((pipe, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-500 hover:shadow-lg transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {pipe.badge}
                  </span>
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="text-base font-bold text-slate-900">{pipe.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pipe.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. BIM TO DWG SECTION
         ==================================================== */}
      <section id="bim-dwg" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Revit & IFC Extraction
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.bimToDwg.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.bimToDwg.subheading}. {data.bimToDwg.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.bimToDwg.workflow.map(item => (
              <div key={item.step} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-xs font-mono">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          13. TARGET PERSONAS & INDUSTRIES
         ==================================================== */}
      <section id="personas" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Industry Use Cases
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Built for Every Stakeholder in the CAD Lifecycle
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Whether you draw, review, approve, or manage, ARES Kudo simplifies your daily drafting workflow.
            </p>
          </div>

          {/* Persona Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {data.personas.map((persona, idx) => (
              <button
                key={idx}
                onClick={() => setActivePersona(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePersona === idx
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {persona.role}
              </button>
            ))}
          </div>

          {/* Active Persona Card */}
          <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-950">{data.personas[activePersona].role}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{data.personas[activePersona].tagline}</p>
              </div>
              <Compass className="w-6 h-6 text-blue-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-red-600 tracking-wider">Traditional Challenge</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {data.personas[activePersona].painPoint}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-green-700 tracking-wider">ARES Kudo Advantage</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed bg-blue-50/60 p-3 rounded-xl border border-blue-200">
                  {data.personas[activePersona].kudoSolution}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase text-slate-500">Go-To Tools for This Role:</span>
              <div className="flex flex-wrap gap-2">
                {data.personas[activePersona].keyTools.map((tool, idx) => (
                  <span key={idx} className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-medium">
                    ✓ {tool}
                  </span>
                ))}
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-slate-200/50 border-l-4 border-blue-600 text-xs text-slate-700 italic">
              "{data.personas[activePersona].quote}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* ====================================================
          14. ARES TRINITY ECOSYSTEM (DESKTOP + CLOUD + MOBILE)
         ==================================================== */}
      <section id="trinity" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              The ARES Trinity
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.trinityEcosystem.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.trinityEcosystem.subheading}. {data.trinityEcosystem.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {data.trinityEcosystem.components.map((comp, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                  comp.highlight
                    ? 'bg-gradient-to-b from-blue-900/60 to-slate-900 border-blue-400 shadow-xl shadow-blue-900/20'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-slate-900 text-cyan-400 px-2.5 py-0.5 rounded-full border border-slate-700">
                      {comp.badge}
                    </span>
                    {idx === 0 && <Laptop className="w-5 h-5 text-blue-400" />}
                    {idx === 1 && <Cloud className="w-5 h-5 text-cyan-400" />}
                    {idx === 2 && <Smartphone className="w-5 h-5 text-amber-400" />}
                  </div>
                  <h4 className="text-lg font-bold text-white">{comp.name}</h4>
                  <span className="text-xs text-slate-400 font-mono block">{comp.platform}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{comp.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-700/60">
                  {idx === 0 && (
                    <Link to="/products/ares-commander" className="text-xs font-bold text-blue-400 hover:underline flex items-center space-x-1">
                      <span>Explore ARES Commander</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {idx === 1 && (
                    <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1">
                      <span>Current Product Page</span>
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {idx === 2 && (
                    <span className="text-xs text-slate-400 font-medium">Included with Kudo Professional</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          15. AUTOCAD LT ALTERNATIVE SECTION
         ==================================================== */}
      <section id="autocad-comparison" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Honest Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.autocadLtComparison.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.autocadLtComparison.subheading}. {data.autocadLtComparison.description}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-4 w-1/4">Key Evaluation Criteria</th>
                  <th className="p-4 w-3/8 text-blue-300">ARES Kudo (Cloud CAD)</th>
                  <th className="p-4 w-3/8 text-slate-400">AutoCAD LT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {data.autocadLtComparison.comparisonPoints.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="p-4 text-slate-800 bg-blue-50/40">
                      <div className="flex items-start space-x-2">
                        {row.advantage === 'kudo' ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                        )}
                        <span>{row.kudo}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span>{row.autocadLt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          16. DETAILED COMPARISON TABLE
         ==================================================== */}
      <section id="comparison" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Detailed Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Compare ARES Kudo Editions & Trinity
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Find the exact licensing level that matches your team’s drafting and collaboration requirements.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            {['all', 'Viewing & Basics', 'CAD Editing', 'Cloud Storage', 'Collaboration', 'AI & Automation', 'Mobile & Multiplatform', 'Licensing & Admin'].map(cat => (
              <button
                key={cat}
                onClick={() => setComparisonFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  comparisonFilter === cat
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Capabilities' : cat}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4 w-2/5">Capability / Feature</th>
                  <th className="p-4 w-1/5 text-center">ARES Kudo Free</th>
                  <th className="p-4 w-1/5 text-center bg-blue-50 text-blue-800">ARES Kudo Professional</th>
                  <th className="p-4 w-1/5 text-center">ARES Commander + Trinity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredComparisonRows.map((row, idx) => (
                  <tr key={idx} className={row.highlight ? 'bg-blue-50/20 font-semibold' : 'hover:bg-slate-50'}>
                    <td className="p-3.5 text-slate-900">
                      <div>{row.capability}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{row.category}</span>
                    </td>
                    <td className="p-3.5 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-slate-600 font-medium">{row.free}</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center bg-blue-50/50">
                      {typeof row.professional === 'boolean' ? (
                        row.professional ? (
                          <Check className="w-4 h-4 text-blue-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-blue-700 font-bold">{row.professional}</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      {typeof row.commanderTrinity === 'boolean' ? (
                        row.commanderTrinity ? (
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-slate-700 font-medium">{row.commanderTrinity}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          17. PRICING SECTION (DYNAMIC & CONFIGURABLE)
         ==================================================== */}
      <section id="pricing" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Licensing Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Cloud CAD Plans for Individuals &amp; Teams
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Full native DWG compatibility. Choose the plan that fits your workflow — contact us for a personalised quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {data.pricingPlans.map(plan => {
              return (
                <div
                  key={plan.id}
                  className="rounded-2xl p-6 flex flex-col justify-between transition-all relative border border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      <span className="text-xs text-blue-600 font-semibold">{plan.targetUser}</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">{plan.tagline}</p>

                    <div className="py-2 border-y border-slate-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
                        Official Quotation
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1.5">Contact us for a personalised quote</span>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Features Included</span>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => scrollTo('consultation')}
                      className="w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer bg-slate-900 hover:bg-blue-600 text-white"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          18. DEVELOPER PLATFORM (TRINITY APIS)
         ==================================================== */}
      <section id="developers" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Custom Development Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {data.developerPlatform.heading}
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              {data.developerPlatform.subheading}. {data.developerPlatform.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {data.developerPlatform.technologies.map((tech, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <FileCode className="w-6 h-6 text-cyan-400" />
                <h4 className="text-base font-bold text-white">{tech.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-slate-300">
              <span className="font-bold text-white block">Cross-Platform Trinity APIs</span>
              Write custom CAD plugins once and run them across ARES Commander, ARES Touch, and ARES Kudo with zero redundant development.
            </div>
            <button
              onClick={() => openQuoteModal('Developer API & OEM Custom CAD Portal Inquiry')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition-colors cursor-pointer"
            >
              Request Developer SDK
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          19. LEARNING & CERTIFICATION (GRAEBERT ACADEMY)
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Free Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {data.onboarding.heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {data.onboarding.subheading}. {data.onboarding.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.onboarding.resources.map((res, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {idx === 0 && <PlayCircle className="w-5 h-5" />}
                  {idx === 1 && <BookOpen className="w-5 h-5" />}
                  {idx === 2 && <Video className="w-5 h-5" />}
                  {idx === 3 && <Award className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          20. COMPREHENSIVE ACCORDION FAQ
         ==================================================== */}
      <section id="faqs" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600">
              Clear, authoritative answers about ARES Kudo capabilities, cloud storage, security, and licensing.
            </p>

            {/* Category Filter */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'overview', label: 'Product Overview' },
                { id: 'capabilities', label: 'CAD Capabilities' },
                { id: 'cloud-security', label: 'Cloud & Security' },
                { id: 'autocad-comparison', label: 'AutoCAD LT Comparison' },
                { id: 'pricing-licensing', label: 'Licensing & Options' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFaqCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    faqCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
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
                        <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.answer}
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
          21. CONSULTATION & QUOTE ENQUIRY FORM
         ==================================================== */}
      <section id="consultation" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Direct Assistance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Request an ARES Kudo Trial or Custom Quote
            </h2>
            <p className="text-base text-slate-600">
              Our CAD specialists will configure your free cloud trial, discuss floating Flex Cloud licensing, or answer IT security requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Thank You for Your Enquiry!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={e => setFormEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={formCompany}
                      onChange={e => setFormCompany(e.target.value)}
                      placeholder="e.g. Apex Engineering Studio"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Estimated Seats / Users</label>
                    <select
                      value={formSeats}
                      onChange={e => setFormSeats(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    >
                      <option value="1">1 User (Individual)</option>
                      <option value="2-5">2 – 5 Users (Small Studio)</option>
                      <option value="6-20">6 – 20 Users (Flex Cloud Pool)</option>
                      <option value="21-50">21 – 50 Users (Corporate Team)</option>
                      <option value="50+">50+ Users (Enterprise Private Cloud)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Primary Cloud Storage</label>
                    <select
                      value={formCloudStorage}
                      onChange={e => setFormCloudStorage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    >
                      <option value="Google Drive">Google Drive / Workspace</option>
                      <option value="OneDrive">Microsoft OneDrive</option>
                      <option value="SharePoint">Microsoft SharePoint / O365</option>
                      <option value="Box">Box / Box Enterprise</option>
                      <option value="Dropbox">Dropbox / Dropbox Business</option>
                      <option value="Private Cloud">Private Server / WebDAV / AWS S3</option>
                      <option value="Other">Other / Multiple Providers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Specific Requirements or Questions</label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}
                    placeholder="Tell us about your drafting workflow, AutoCAD LT replacement goals, or SSO needs..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <span>Submitting Your Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Quote Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          22. RELATED RESOURCES & CONTENT
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Related CAD Resources & Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedContent.map((article, idx) => (
              <Link
                key={idx}
                to={article.url}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{article.snippet}</p>
                </div>
                <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 pt-2">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          23. FINAL HIGH-IMPACT CTA SECTION
         ==================================================== */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Start Your Cloud CAD Journey Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Design, Edit & Collaborate in the Cloud
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Work with your DWG drawings anytime, on any device, with a modern cloud CAD workflow. No installations, no proprietary silos, zero risk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal('ARES Kudo 30-Day Free Trial')}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try ARES Kudo Free</span>
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm transition-all cursor-pointer"
            >
              Compare Plans
            </button>
            <button
              onClick={() => scrollTo('consultation')}
              className="px-6 py-4 rounded-xl text-cyan-400 hover:text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Contact Sales →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AresKudoPage
