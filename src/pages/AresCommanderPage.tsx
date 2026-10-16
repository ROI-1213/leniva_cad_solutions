import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  Sparkles,
  Box,
  Layers,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Search,
  Building2,
  Laptop,
  Globe,
  Smartphone,
  FileCode,
  Terminal,
  Check,
  Share2,
  Monitor,
  Info,
  PhoneCall,
  Send,
  RefreshCw,
  Filter,
  Table,
  Paintbrush,
  GitCompare,
  Component,
  BookOpen,
  GraduationCap,
  Users,
  Scissors,
  Ruler,
  Cloud,
  Layers as LayersIcon,
  Play,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { aresCommanderData, AresCommanderFaq } from '../data/aresCommanderData'
import { useCadPageData } from '../utils/cadSoftwareConfig'

export const AresCommanderPage: React.FC = () => {
  const { submitQuote } = useApp()
  const { data } = useCadPageData('ares_commander', aresCommanderData)

  // Navigation & Interactive Tabs
  const [activeNav, setActiveNav] = useState<string>('overview')
  const [active2d3dTab, setActive2d3dTab] = useState<'2d' | '3d'>('2d')
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all')
  const [faqSearch, setFaqSearch] = useState<string>('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0)

  // Section Refs for Smooth Scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const draftingRef = useRef<HTMLDivElement>(null)
  const modellingRef = useRef<HTMLDivElement>(null)
  const productivityRef = useRef<HTMLDivElement>(null)
  const bimRef = useRef<HTMLDivElement>(null)
  const trinityRef = useRef<HTMLDivElement>(null)
  const industriesRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const licensingRef = useRef<HTMLDivElement>(null)
  const trialRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)
  const enquiryRef = useRef<HTMLDivElement>(null)

  // 14-Field Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    company: '',
    workEmail: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    industry: 'Architecture & Engineering',
    operatingSystem: 'Windows 64-bit',
    licenseType: 'ARES Commander with Trinity (Annual)',
    numberOfLicenses: '1-5 Seats',
    interestInTrinity: 'Yes',
    interestInNetwork: 'Not sure',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Sticky sub-nav scroll observer
  useEffect(() => {
    const handleScroll = () => {
      const navSections = [
        { id: 'overview', ref: overviewRef },
        { id: 'benefits', ref: benefitsRef },
        { id: '2d-drafting', ref: draftingRef },
        { id: '3d-modelling', ref: modellingRef },
        { id: 'productivity', ref: productivityRef },
        { id: 'bim-cad', ref: bimRef },
        { id: 'trinity', ref: trinityRef },
        { id: 'industries', ref: industriesRef },
        { id: 'comparison', ref: comparisonRef },
        { id: 'specs', ref: specsRef },
        { id: 'licensing', ref: licensingRef },
        { id: 'trial', ref: trialRef },
        { id: 'faqs', ref: faqsRef },
        { id: 'enquiry', ref: enquiryRef },
      ]

      for (const section of navSections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveNav(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SEO Title
  useEffect(() => {
    document.title = 'ARES Commander | Professional 2D & 3D DWG CAD Software | Graebert'
    window.scrollTo(0, 0)
  }, [])

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>, navId: string) => {
    setActiveNav(navId)
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Enquiry Form Handler
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!enquiryForm.fullName.trim() || !enquiryForm.workEmail.trim() || !enquiryForm.phone.trim()) {
      setFormError('Please enter your full name, work email address, and phone number.')
      return
    }

    setIsSubmitting(true)
    try {
      if (submitQuote) {
        await submitQuote({
          fullName: enquiryForm.fullName,
          company: enquiryForm.company || 'Studio / Company',
          email: enquiryForm.workEmail,
          phone: enquiryForm.phone,
          productOrService: `ARES Commander (${enquiryForm.licenseType})`,
          quantity: enquiryForm.numberOfLicenses,
          application: `[Industry]: ${enquiryForm.industry} | [OS]: ${enquiryForm.operatingSystem} | [Trinity Interest]: ${enquiryForm.interestInTrinity} | [Network Interest]: ${enquiryForm.interestInNetwork} | [Location]: ${enquiryForm.city}, ${enquiryForm.state}, ${enquiryForm.country}`,
          message: enquiryForm.message,
        })
      }
      setIsSubmitted(true)
    } catch {
      setFormError('There was an issue submitting your enquiry. Please email sales@lenivacadsolution.in directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filtered FAQs
  const faqCategories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'general', label: 'General' },
    { id: 'dwg', label: 'Native DWG' },
    { id: 'capabilities', label: '2D & 3D Features' },
    { id: 'bim-trinity', label: 'BIM & Trinity' },
    { id: 'licensing', label: 'Licensing & Editions' },
    { id: 'technical', label: 'Technical & OS' },
  ]

  const filteredFaqs = data.faqs.filter((faq: AresCommanderFaq) => {
    const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory
    const matchesSearch =
      faqSearch.trim() === '' ||
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/20 selection:text-blue-900">
      {/* ====================================================
          1. BREADCRUMBS
         ==================================================== */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80 text-xs text-slate-500 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/cad-software" className="hover:text-blue-600 transition-colors">CAD Software</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Graebert</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">ARES Commander</span>
        </div>
      </nav>

      {/* ====================================================
          2. STICKY SUB-NAVIGATION
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-600" />
              <span>ARES Commander</span>
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
              2D & 3D DWG CAD
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2 text-xs font-semibold text-slate-600">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'benefits', label: 'Benefits', ref: benefitsRef },
              { id: '2d-drafting', label: '2D Drafting', ref: draftingRef },
              { id: '3d-modelling', label: '3D CAD', ref: modellingRef },
              { id: 'productivity', label: 'Productivity', ref: productivityRef },
              { id: 'bim-cad', label: 'BIM-to-CAD', ref: bimRef },
              { id: 'trinity', label: 'Trinity Cloud', ref: trinityRef },
              { id: 'industries', label: 'Industries', ref: industriesRef },
              { id: 'comparison', label: 'Comparison', ref: comparisonRef },
              { id: 'specs', label: 'Specs', ref: specsRef },
              { id: 'licensing', label: 'Licensing', ref: licensingRef },
              { id: 'faqs', label: 'FAQs', ref: faqsRef },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.ref, item.id)}
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

          <div className="hidden lg:flex items-center space-x-2">
            <a
              href={data.identity.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Trial</span>
            </a>
            <button
              onClick={() => scrollTo(enquiryRef, 'enquiry')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          3. HERO SECTION
         ==================================================== */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white pt-8 pb-16 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="h-8 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/grabert.png" alt="Graebert" className="h-full w-auto max-w-[85px] object-contain" />
                </div>
                <div className="h-8 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                  <img src="/images/brands/ares-cad.png" alt="ARES CAD" className="h-full w-auto max-w-[85px] object-contain" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{data.hero.eyebrow}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.12]">
                {data.hero.headline}
              </h1>

              <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
                {data.hero.supportingText}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {data.hero.shortDescription}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {data.hero.featureLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lbl}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={data.hero.trialNote ? data.identity.downloadUrl : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Start 30-Day Free Trial</span>
                </a>
                <button
                  onClick={() => scrollTo(enquiryRef, 'enquiry')}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-blue-600" />
                  <span>Request Quote</span>
                </button>
                <button
                  onClick={() => scrollTo(draftingRef, '2d-drafting')}
                  className="px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 font-bold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore Features</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{data.hero.trialNote}</span>
              </div>
            </div>

            {/* Right Hero Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <img
                    src={data.hero.image}
                    alt="ARES Commander - Dual 2D drafting and 3D solid modeling CAD workstation"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Native DWG 2018–R12</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                      <LayersIcon className="w-3 h-3" />
                      <span>2D Drafting + 3D Solids</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                      Cross-Platform Workstation
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-sm">
                      ARES Commander on Desktop with Trinity Cloud & Mobile
                    </h3>
                  </div>
                </div>
              </div>

              {/* Quick Spec Strip */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {data.hero.strip.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      {st.label}
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 mt-0.5 truncate">
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PRODUCT OVERVIEW
         ==================================================== */}
      <section ref={overviewRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Product Overview
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.overview.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.overview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.overview.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-4 hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                    {idx === 0 && <FileCode className="w-6 h-6" />}
                    {idx === 1 && <Scissors className="w-6 h-6" />}
                    {idx === 2 && <Box className="w-6 h-6" />}
                    {idx === 3 && <Laptop className="w-6 h-6" />}
                    {idx === 4 && <Building2 className="w-6 h-6" />}
                    {idx === 5 && <Share2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wider font-bold">
                      {card.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                  {card.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. WHY ARES COMMANDER (8 BENEFIT CARDS)
         ==================================================== */}
      <section ref={benefitsRef} className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Core Advantages
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.benefits.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.benefits.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.benefits.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-100 italic">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. CORE 2D DRAFTING & 7. 3D CAD MODELLING (INTERACTIVE)
         ==================================================== */}
      <section ref={draftingRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
                Design Capabilities
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                Complete 2D Drafting & 3D Solid Modeling
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Create precision technical drawings or construct advanced ACIS 3D solid geometry within the same unified DWG CAD workspace.
              </p>
            </div>

            {/* Interactive 2D vs 3D Switcher Tab */}
            <div className="flex items-center p-1.5 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
              <button
                onClick={() => setActive2d3dTab('2d')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  active2d3dTab === '2d'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>2D Technical Drafting</span>
              </button>
              <button
                onClick={() => setActive2d3dTab('3d')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  active2d3dTab === '3d'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Solid CAD Modelling</span>
              </button>
            </div>
          </div>

          {/* Interactive Content Panels */}
          {active2d3dTab === '2d' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                    Sub-Millimeter Precision
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {data.drafting2D.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {data.drafting2D.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {data.drafting2D.features.slice(0, 10).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed font-medium">
                  {data.drafting2D.featureDescription}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={data.drafting2D.image}
                      alt="2D architectural floor plan drafting in ARES Commander"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                        Vector 2D Drafting
                      </span>
                      <h4 className="text-sm font-bold text-white drop-shadow-sm">
                        Architectural Floor Plan & Layer Coordination
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div ref={modellingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                    Parametric Solid Geometry
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {data.modelling3D.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {data.modelling3D.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Core 3D Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {data.modelling3D.features.slice(0, 8).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <Box className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                    Common 3D Use Cases:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.modelling3D.useCases.map((uc, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={data.modelling3D.image}
                      alt="3D solid mechanical CAD modeling in ARES Commander"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                        3D Solid & Surface Modeling
                      </span>
                      <h4 className="text-sm font-bold text-white drop-shadow-sm">
                        Industrial Mechanical Assembly & Section Analysis
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================
          8. NATIVE DWG COMPATIBILITY & WORKFLOW
         ==================================================== */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Universal CAD Standard
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {data.nativeDwg.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {data.nativeDwg.description}
            </p>
          </div>

          {/* 4-Step DWG Workflow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.nativeDwg.workflowSteps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 space-y-3 hover:border-blue-500 transition-colors"
              >
                <div className="text-2xl font-mono font-black text-blue-400">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-white">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Points & Note */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold block">
              DWG Compatibility Highlights:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
              {data.nativeDwg.featurePoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-700/60">
              {data.nativeDwg.contentNote}
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. SMART PRODUCTIVITY TOOLS
         ==================================================== */}
      <section ref={productivityRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Drafting Velocity
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.productivityTools.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.productivityTools.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.productivityTools.tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-4 hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                      {tool.id === 'power-trim' && <Scissors className="w-5 h-5" />}
                      {tool.id === 'dimensions-palette' && <Ruler className="w-5 h-5" />}
                      {tool.id === 'layer-tools' && <Layers className="w-5 h-5" />}
                      {tool.id === 'property-painter' && <Paintbrush className="w-5 h-5" />}
                      {tool.id === 'drawing-compare' && <GitCompare className="w-5 h-5" />}
                      {tool.id === 'dynamic-blocks' && <Component className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                  {tool.highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. BIM-TO-CAD DOCUMENTATION
         ==================================================== */}
      <section ref={bimRef} className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
                  BIM Interoperability
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                  {data.bimToCad.heading}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {data.bimToCad.description}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {data.bimToCad.supportingDescription}
                </p>
              </div>

              {/* 5 Key BIM Capabilities */}
              <div className="space-y-3">
                {data.bimToCad.capabilities.map((cap, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      {idx === 0 && <Download className="w-4 h-4 text-blue-600" />}
                      {idx === 1 && <Filter className="w-4 h-4 text-blue-600" />}
                      {idx === 2 && <Scissors className="w-4 h-4 text-blue-600" />}
                      {idx === 3 && <Table className="w-4 h-4 text-blue-600" />}
                      {idx === 4 && <RefreshCw className="w-4 h-4 text-blue-600" />}
                      <span>{cap.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
                <div className="aspect-16/10 overflow-hidden">
                  <img
                    src={data.bimToCad.image}
                    alt="BIM-to-CAD documentation drawing in ARES Commander"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                      Revit (.RVT) & IFC Import
                    </span>
                    <h4 className="text-sm font-bold text-white drop-shadow-sm">
                      Extract Coordinated 2D Floor Plans & Schedules
                    </h4>
                  </div>
                </div>
              </div>

              {/* 4-Step BIM Workflow */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  BIM-to-CAD Workflow in 4 Steps:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {data.bimToCad.workflowSteps.map((ws) => (
                    <div key={ws.step} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <div className="font-bold text-blue-600 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-mono">
                          {ws.step}
                        </span>
                        <span>{ws.title}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed pl-5.5">
                        {ws.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          13. ARES TRINITY ECOSYSTEM
         ==================================================== */}
      <section ref={trinityRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Connected CAD
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.aresTrinity.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.aresTrinity.description}
            </p>
          </div>

          {/* Trinity Ecosystem Showcase Banner */}
          {data.aresTrinity.image && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
              <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-slate-950">
                <img
                  src={data.aresTrinity.image}
                  alt="ARES Trinity - Connected CAD Across Desktop, Cloud, and Mobile"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-blue-600/90 text-white text-[11px] font-mono uppercase tracking-wider font-bold mb-1.5 shadow-xs">
                    Graebert ARES Trinity Ecosystem
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
                    Seamless CAD design continuity connecting ARES Commander (Desktop), ARES Kudo (Cloud Browser), and ARES Touch (Mobile).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3 Devices (Desktop + Cloud + Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.aresTrinity.components.map((comp, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                    {idx === 0 && <Laptop className="w-6 h-6" />}
                    {idx === 1 && <Globe className="w-6 h-6" />}
                    {idx === 2 && <Smartphone className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {comp.name}
                    </h3>
                    <span className="text-[11px] font-mono text-blue-600 font-bold">
                      {comp.platformRole}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-1.5">
                  {comp.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cloud Storage Providers & View-Only Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block">
                Integrated Cloud Storage Services:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {data.aresTrinity.cloudStorageProviders.map((cs, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2.5">
                    <Cloud className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-xs text-slate-900">{cs.name}</div>
                      <div className="text-[10px] text-slate-500">{cs.type}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                Open DWG drawings stored on your preferred cloud drive, edit on desktop or browser, and synchronize changes automatically with zero manual file transfers.
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200 font-bold block">
                  ARES Kudo Feature
                </span>
                <h3 className="text-lg font-bold text-white">
                  {data.aresTrinity.viewOnlySharing.headline}
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {data.aresTrinity.viewOnlySharing.description}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => scrollTo(enquiryRef, 'enquiry')}
                  className="px-4 py-2 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Explore Trinity Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ====================================================
          19. SUPPORTED INDUSTRIES & USE CASES
         ==================================================== */}
      <section ref={industriesRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Industries & Workflows
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.industries.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.industries.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.industries.items.map((ind, idx) => (
              <div
                key={ind.id}
                onClick={() => setSelectedIndustry(idx)}
                className={`bg-slate-50 rounded-2xl border p-5 space-y-3 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedIndustry === idx
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20 bg-white'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-200 mb-2">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white font-mono">
                      {ind.subtitle}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ind.deliverables.map((d, dIdx) => (
                      <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {d}
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
          20. CROSS-PLATFORM DESKTOP & WORK OFFLINE
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Operating System Freedom
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.crossPlatform.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.crossPlatform.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.crossPlatform.osDetails.map((os, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                  {idx === 0 && <Monitor className="w-6 h-6" />}
                  {idx === 1 && <Laptop className="w-6 h-6" />}
                  {idx === 2 && <Terminal className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{os.os}</h3>
                  <span className="text-xs font-mono text-blue-600 font-bold">{os.arch}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {os.versions}
                </p>
              </div>
            ))}
          </div>

          {/* Work Offline Callout */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{data.workOffline.heading}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {data.workOffline.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-700">
              {data.workOffline.featurePoints.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          28. ARES COMMANDER VS ARES STANDARD COMPARISON
         ==================================================== */}
      <section ref={comparisonRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              CAD Edition Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.comparisonCommanderVsStandard.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.comparisonCommanderVsStandard.description}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-800 font-bold">
                <tr>
                  <th className="py-4 px-6 w-1/3">Capability</th>
                  <th className="py-4 px-6 w-1/3 bg-blue-50/70 text-blue-900 border-x border-blue-100">
                    ARES Commander (Flagship)
                  </th>
                  <th className="py-4 px-6 w-1/3">ARES Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.comparisonCommanderVsStandard.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={row.highlight ? 'bg-blue-50/30' : 'hover:bg-slate-50/70'}
                  >
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      {row.capability}
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-blue-900 bg-blue-50/50 border-x border-blue-100">
                      {row.aresCommander}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {row.aresStandard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          30. TECHNICAL SPECIFICATIONS TABLE
         ==================================================== */}
      <section ref={specsRef} className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Engineering Specs
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.technicalSpecs.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Official system requirements and technical parameters verified from Graebert documentation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-800 font-bold">
                <tr>
                  <th className="py-3.5 px-6 w-1/4">Specification Category</th>
                  <th className="py-3.5 px-6 w-1/2">Verified Specification</th>
                  <th className="py-3.5 px-6 w-1/4">Technical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.technicalSpecs.specs.map((sp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-bold text-slate-900">{sp.category}</td>
                    <td className="py-3.5 px-6 font-medium text-slate-800">{sp.specification}</td>
                    <td className="py-3.5 px-6 text-slate-500 text-[11px]">{sp.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Verified against Graebert 2026 Official Documentation</span>
            <a
              href={data.technicalSpecs.systemRequirementsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Check Official System Requirements</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================
          22. FLEXIBLE LICENSING CARDS
         ==================================================== */}
      <section ref={licensingRef} className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Commercial Plans
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.licensing.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.licensing.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.licensing.cards.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-7 space-y-6 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/20 bg-white relative'
                    : 'border-slate-200 bg-slate-50/70 hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-mono uppercase font-bold tracking-wider shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{plan.category}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {plan.termOptions.map((term, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                      Included Capabilities:
                    </span>
                    {plan.includedFeatures.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="text-[11px] text-slate-500 font-mono italic">
                    {plan.indicativePriceNote}
                  </div>
                  <button
                    onClick={() => {
                      setEnquiryForm(prev => ({ ...prev, licenseType: plan.category }))
                      scrollTo(enquiryRef, 'enquiry')
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{data.licensing.pricingAccuracyRules}</span>
            </div>
            <a
              href={data.licensing.pricingConfiguratorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:border-amber-400 text-amber-900 font-bold text-xs shrink-0"
            >
              Open Graebert Configurator →
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================
          23. FREE TRIAL & DOWNLOAD
         ==================================================== */}
      <section ref={trialRef} className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-200 font-bold block">
                {data.freeTrial.duration}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {data.freeTrial.heading}
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed max-w-2xl">
                {data.freeTrial.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {data.freeTrial.highlights.map((h, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-blue-200" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={data.freeTrial.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-sm text-center shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Start Free 30-Day Trial</span>
              </a>
              <p className="text-[10px] text-blue-200 text-center italic">
                {data.freeTrial.termsNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          24. LEARNING & KNOWLEDGE RESOURCES
         ==================================================== */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Skill Development
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.learningResources.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {data.learningResources.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.learningResources.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {idx === 0 && <GraduationCap className="w-5 h-5" />}
                      {idx === 1 && <Play className="w-5 h-5" />}
                      {idx === 2 && <BookOpen className="w-5 h-5" />}
                      {idx === 3 && <Users className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
                {item.url.startsWith('http') ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100"
                  >
                    <span>Visit Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => scrollTo(enquiryRef, 'enquiry')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100 cursor-pointer text-left"
                  >
                    <span>Request corporate onboarding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          31. CUSTOMER FEEDBACK & TESTIMONIALS
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Global Adoption
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {data.testimonials.heading}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Empowering architects, mechanical engineers, and BIM documentation teams across millions of seats globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.testimonials.items.map((test, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{test.quote}"
                </p>
                <div className="pt-3 border-t border-slate-200">
                  <div className="font-bold text-xs text-slate-900">{test.author}</div>
                  <div className="text-[11px] text-slate-500">{test.company}</div>
                  <span className="text-[10px] font-mono text-blue-600 font-bold block mt-1">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          32. FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ==================================================== */}
      <section ref={faqsRef} className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Everything you need to know about ARES Commander, DWG compatibility, licensing, and BIM workflows.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. DWG compatibility, 3D modelling, Mac support, Perpetual)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFaqCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeFaqCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No questions found matching your search. Please reach out to our team directly.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          33. RELATED GRAEBERT PRODUCTS
         ==================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
              ARES CAD Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              Explore Related Graebert CAD Products
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Discover dedicated discipline solutions and cloud-connected CAD extensions built on the proven ARES platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.relatedProducts.map((prod, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                      {prod.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{prod.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{prod.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 italic">Graebert CAD Family</span>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          34. ENQUIRY & PURCHASE SECTION (14 FIELDS)
         ==================================================== */}
      <section ref={enquiryRef} id="enquiry" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block">
              Official Indian Sales & Licensing Desk
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Find the Right ARES Commander License for Your Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Whether you are an individual CAD professional, design studio, or enterprise engineering organization, contact Leniva CAD Solutions for verified commercial quotations, multi-seat discounts, and licensing options.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You for Your Enquiry!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Our dedicated Graebert CAD specialist will contact you within 2-4 business hours with an official GST quotation and licensing configuration.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setEnquiryForm({
                        fullName: '',
                        company: '',
                        workEmail: '',
                        phone: '',
                        country: 'India',
                        state: '',
                        city: '',
                        industry: 'Architecture & Engineering',
                        operatingSystem: 'Windows 64-bit',
                        licenseType: 'ARES Commander with Trinity (Annual)',
                        numberOfLicenses: '1-5 Seats',
                        interestInTrinity: 'Yes',
                        interestInNetwork: 'Not sure',
                        message: '',
                      })
                    }}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-5 text-xs">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 2: Company Name */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Company / Studio Name</label>
                    <input
                      type="text"
                      value={enquiryForm.company}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })}
                      placeholder="e.g. Apex Engineering Consultants"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 3: Work Email */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.workEmail}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, workEmail: e.target.value })}
                      placeholder="rajesh@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 4: Phone Number */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 5: Country */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Country</label>
                    <input
                      type="text"
                      value={enquiryForm.country}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Field 6 & 7: State & City */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200">State</label>
                      <input
                        type="text"
                        value={enquiryForm.state}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, state: e.target.value })}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-200">City</label>
                      <input
                        type="text"
                        value={enquiryForm.city}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, city: e.target.value })}
                        placeholder="e.g. Pune"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Field 8: Industry */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Industry</label>
                    <select
                      value={enquiryForm.industry}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Architecture & Engineering</option>
                      <option>Mechanical & Manufacturing</option>
                      <option>Construction & BIM</option>
                      <option>Civil & Infrastructure</option>
                      <option>Interior Fit-Out</option>
                      <option>Academic & Educational Institution</option>
                      <option>Software & CAD Developer</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Field 9: Operating System */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Operating System</label>
                    <select
                      value={enquiryForm.operatingSystem}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, operatingSystem: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Windows 64-bit</option>
                      <option>macOS (Apple Silicon M-Series)</option>
                      <option>macOS (Intel-based)</option>
                      <option>Linux (Ubuntu / Debian / Fedora)</option>
                      <option>Multi-OS Mixed Team</option>
                    </select>
                  </div>

                  {/* Field 10: License Type */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">License Type Interest</label>
                    <select
                      value={enquiryForm.licenseType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, licenseType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>ARES Commander with Trinity (Annual)</option>
                      <option>ARES Commander with Trinity (3-Year Plan)</option>
                      <option>ARES Commander Standalone (Perpetual License)</option>
                      <option>Network / Flex Floating License (Enterprise Pool)</option>
                      <option>Educational Campus License</option>
                      <option>Not sure - Need Guidance</option>
                    </select>
                  </div>

                  {/* Field 11: Number of Licenses */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Number of Licenses</label>
                    <select
                      value={enquiryForm.numberOfLicenses}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, numberOfLicenses: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>1 Seat</option>
                      <option>2 - 5 Seats</option>
                      <option>6 - 15 Seats</option>
                      <option>16 - 50 Seats</option>
                      <option>50+ Enterprise Volume</option>
                    </select>
                  </div>

                  {/* Field 12: Trinity Interest */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Interest in ARES Trinity Cloud?</label>
                    <select
                      value={enquiryForm.interestInTrinity}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, interestInTrinity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Yes (Desktop + Cloud + Mobile)</option>
                      <option>No (Desktop-Only Standalone)</option>
                      <option>Not sure</option>
                    </select>
                  </div>

                  {/* Field 13: Network Licensing Interest */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Interest in Network Floating Pool?</label>
                    <select
                      value={enquiryForm.interestInNetwork}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, interestInNetwork: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Yes</option>
                      <option>No</option>
                      <option>Not sure</option>
                    </select>
                  </div>
                </div>

                {/* Field 14: Message */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Project / Workflow Requirements</label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    placeholder="Tell us about your team size, existing CAD setup, BIM requirements, or trial questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-400">
                    By submitting, you agree to receive official product quotations from Leniva CAD Solutions.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
                  >
                    {isSubmitting ? (
                      <span>Processing Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quotation Request</span>
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
          35. FINAL CTA BANNER
         ==================================================== */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block">
            Ready to Accelerate Your CAD Workflows?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Create More. Draft Smarter. Work Anywhere.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore professional DWG-based drafting and 3D modelling with ARES Commander. Connect desktop CAD with cloud and mobile workflows through applicable ARES Trinity features.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={data.identity.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Start 30-Day Free Trial</span>
            </a>
            <button
              onClick={() => scrollTo(enquiryRef, 'enquiry')}
              className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-slate-700 shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Request Formal Quote</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AresCommanderPage

