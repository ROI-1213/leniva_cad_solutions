import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  FileText,
  Cloud,
  Cpu,
  Tablet,
  Check,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  Zap,
  Search,
  Compass,
  TreePine,
  Star,
  CheckCircle2,
  Palette,
  Calculator,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { sketchupProData } from '../data/sketchupProData'

export const SketchUpProPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // State
  const [activeTab, setActiveTab] = useState<'desktop' | 'layout' | 'ipad' | 'web' | 'connect'>('desktop')
  const [layoutMode, setLayoutMode] = useState<'3d' | '2d'>('2d')
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)

  const [selectedWarehouseCategory, setSelectedWarehouseCategory] = useState<string>('All')
  const [extensionCategory, setExtensionCategory] = useState<string>('all')
  const [extensionSearch, setExtensionSearch] = useState<string>('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [faqCategory, setFaqCategory] = useState<string>('all')
  const [openSysReq, setOpenSysReq] = useState<'recommended' | 'minimum'>('recommended')

  // Section references for in-page smooth navigation
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const layoutRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const warehouseRef = useRef<HTMLDivElement>(null)
  const extensionsRef = useRef<HTMLDivElement>(null)
  const predesignRef = useRef<HTMLDivElement>(null)
  const workflowRef = useRef<HTMLDivElement>(null)
  const industriesRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const techSpecsRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const topOffset = ref.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  // Filter extensions
  const filteredExtensions = sketchupProData.extensions.filter(ext => {
    const matchesCat = extensionCategory === 'all' || ext.category === extensionCategory
    const matchesSearch =
      ext.name.toLowerCase().includes(extensionSearch.toLowerCase()) ||
      ext.description.toLowerCase().includes(extensionSearch.toLowerCase()) ||
      ext.developer.toLowerCase().includes(extensionSearch.toLowerCase())
    return matchesCat && matchesSearch
  })

  // Filter 3D Warehouse items
  const filteredWarehouse =
    selectedWarehouseCategory === 'All'
      ? sketchupProData.warehouseCategories
      : sketchupProData.warehouseCategories.filter(item => item.category === selectedWarehouseCategory)

  // Filter FAQs
  const filteredFaqs =
    faqCategory === 'all'
      ? sketchupProData.faqs
      : sketchupProData.faqs.filter(f => f.category === faqCategory)

  // Professional workflow interactive steps
  const workflowProgression = [
    {
      step: '01',
      title: 'Initial Idea & Schematic Form',
      desc: 'Rapidly sketch volumetric building massing, solar angles, and spatial layouts directly in 3D using push-pull direct geometry tools.',
      tool: 'SketchUp Desktop / Web',
      image: '/images/software/sketchup-pro.jpg',
    },
    {
      step: '02',
      title: 'Detailed 3D Architectural Model',
      desc: 'Refine walls, roofs, windows, materials, structural columns, and custom millwork with accurate millimeter dimensions and tags.',
      tool: 'Solid Tools & Components',
      image: '/images/software/sections/aec-construction.jpg',
    },
    {
      step: '03',
      title: 'Climate Analysis & Context',
      desc: 'Evaluate seasonal sun paths, shading depths, and glazing ratios using PreDesign data before finalizing exterior facade envelopes.',
      tool: 'Trimble PreDesign',
      image: '/images/software/sketchup-advanced.jpg',
    },
    {
      step: '04',
      title: '2D Construction Drawings & Detailing',
      desc: 'Send scenes to LayOut to generate scaled floor plans, building sections, elevations, dimensioned details, and permit sets.',
      tool: 'LayOut Documentation',
      image: '/images/ares-standard/cad-arch-floorplan.jpg',
    },
    {
      step: '05',
      title: 'Cloud Coordination & Client Delivery',
      desc: 'Publish models to Trimble Connect for multi-stakeholder review, on-site iPad markups, RFI tracking, and coordinated PDF/DWG handover.',
      tool: 'Trimble Connect Cloud',
      image: '/images/software/sections/revit-integration.jpg',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-[#005F9E] selection:text-white font-inter">
      {/* ====================================================
          1. BREADCRUMBS BAR
         ==================================================== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#005F9E] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/products" className="hover:text-[#005F9E] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/products/cad-software" className="hover:text-[#005F9E] transition-colors">
              CAD &amp; 3D Design Software
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-bold">SketchUp Pro (Trimble)</span>
          </nav>
        </div>
      </div>

      {/* ====================================================
          2. IN-PAGE PRODUCT NAVIGATION (NON-STICKY TO AVOID OVERLAP)
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-3 shrink-0 mr-4">
            <div className="w-8 h-8 rounded-lg bg-[#005F9E]/10 flex items-center justify-center text-[#005F9E] font-black text-xs">
              SKP
            </div>
            <span className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5 whitespace-nowrap">
              <span>SketchUp Pro</span>
              <span className="text-[10px] font-mono uppercase bg-blue-100 text-[#005F9E] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0">
                Trimble
              </span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-slate-600 shrink-0">
            {[
              { id: 'overview', label: 'Overview', ref: overviewRef },
              { id: 'features', label: 'The Power of Pro', ref: featuresRef },
              { id: 'desktop', label: 'Desktop', ref: desktopRef },
              { id: 'layout', label: 'LayOut 2D', ref: layoutRef },
              { id: 'mobile', label: 'Web & iPad', ref: mobileRef },
              { id: 'warehouse', label: '3D Warehouse', ref: warehouseRef },
              { id: 'extensions', label: 'Extensions', ref: extensionsRef },
              { id: 'predesign', label: 'PreDesign & AI', ref: predesignRef },
              { id: 'workflow', label: 'Workflow', ref: workflowRef },
              { id: 'industries', label: 'Industries', ref: industriesRef },
              { id: 'pricing', label: 'Plans & Licensing', ref: pricingRef },
              { id: 'comparison', label: 'Compare Plans', ref: comparisonRef },
              { id: 'techspecs', label: 'Tech Specs', ref: techSpecsRef },
              { id: 'faqs', label: 'FAQs', ref: faqsRef },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.ref)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-[#005F9E] hover:bg-blue-50 cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => openQuoteModal('SketchUp Pro Commercial Subscription Inquiry')}
              className="px-3.5 py-1.5 bg-[#005F9E] hover:bg-[#004b7e] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          3. PRODUCT HERO SECTION
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#005F9E] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#005F9E]" />
              <span>{sketchupProData.hero.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
              {sketchupProData.hero.title}
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600 mt-2">
                {sketchupProData.hero.tagline}
              </span>
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              {sketchupProData.hero.description}
            </p>

            {/* Commercial Licensing Badge */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Official Trimble Commercial Licensing
                </span>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-xl font-black text-slate-950">
                    Authorized Trimble Partner
                  </span>
                  <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                    India / Commercial
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Official commercial licensing in INR with GST invoice and authorized technical support.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openQuoteModal('SketchUp Pro Official Commercial Subscription')}
                className="px-6 py-3.5 rounded-xl bg-[#005F9E] hover:bg-[#004b7e] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Subscribe to SketchUp Pro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal('SketchUp Pro 30-Day Free Trial Request')}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-sm font-bold transition-colors cursor-pointer"
              >
                Try SketchUp Free
              </button>

              <button
                onClick={() => scrollTo(comparisonRef)}
                className="px-4 py-3.5 text-xs font-bold text-slate-600 hover:text-[#005F9E] transition-colors cursor-pointer"
              >
                Compare Plans ↓
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Genuine Trimble License</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes LayOut 2D</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full GST Tax Invoicing</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xl">
              <img
                src="/images/software/sketchup-pro.jpg"
                alt="SketchUp Pro Desktop 3D Architectural Workspace"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />

              {/* Floating UI Badges */}
              <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg">
                <Box className="w-3.5 h-3.5 text-blue-400" />
                <span>3D Desktop Modeler</span>
              </div>

              <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>LayOut Included</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-white text-xs flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-slate-100">Multi-Platform Ecosystem</span>
                  <span className="text-slate-400 hidden sm:inline">• Desktop, Web, iPad &amp; Cloud</span>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-950/60 px-2.5 py-0.5 rounded-md border border-cyan-800/60">
                  Unlimited Cloud
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PRODUCT VALUE STRIP (5 PILLARS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sketchupProData.valueStrip.map(item => {
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#005F9E] flex items-center justify-center group-hover:bg-[#005F9E] group-hover:text-white transition-colors">
                  {item.id === '3d-modeling' && <Box className="w-4 h-4" />}
                  {item.id === '2d-documentation' && <FileText className="w-4 h-4" />}
                  {item.id === 'cloud-collaboration' && <Cloud className="w-4 h-4" />}
                  {item.id === 'extensible-workflows' && <Cpu className="w-4 h-4" />}
                  {item.id === 'multi-device-access' && <Tablet className="w-4 h-4" />}
                </div>
                <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          5. THE POWER OF PRO (4 CORE CAPABILITY CARDS)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            The Professional Difference
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Everything you need to turn ideas into professional designs
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            SketchUp Pro combines intuitive 3D modeling, construction documentation, photorealistic visualization, cloud collaboration, and modular extensibility into one seamless professional workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sketchupProData.powerOfProCards.map(card => (
            <div
              key={card.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#005F9E]/50 hover:shadow-lg transition-all space-y-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-slate-200 font-mono">{card.number}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#005F9E] border border-blue-100">
                  {card.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-950">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                {card.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#005F9E] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          6. SKETCHUP FOR DESKTOP (CORE MODELER DEEP DIVE)
         ==================================================== */}
      <section ref={desktopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
                Windows &amp; macOS Core Application
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                SketchUp for Desktop
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The industry benchmark for fast, intuitive 3D architectural modeling. Work completely offline, harness your local GPU performance, organize complex models with nested tags, and leverage custom Ruby scripts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  'Full offline modeling (up to 28 days without internet)',
                  'Tag folders & visual scene styles',
                  'Solid Tools for boolean geometry',
                  'High-res raster & animation video export',
                  'Full Ruby API & local extension execution',
                  'Generate Report for quantities & takeoffs',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openQuoteModal('SketchUp for Desktop Inquiries')}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md"
                >
                  Request Desktop Commercial License
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-2 shadow-2xl">
                <img
                  src="/images/software/sketchup-pro.jpg"
                  alt="SketchUp Desktop Interface"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Workflow Sequence */}
          <div className="border-t border-slate-800 pt-8">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-4">
              Integrated Architectural Progression
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { step: '01', name: 'Concept', sub: 'Massing & Form' },
                { step: '02', name: '3D Model', sub: 'Precise Geometry' },
                { step: '03', name: 'Detail', sub: 'Assemblies & Fixtures' },
                { step: '04', name: 'Document', sub: 'LayOut Drawings' },
                { step: '05', name: 'Present', sub: 'Client Approval' },
              ].map(item => (
                <div key={item.step} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-xs font-mono text-cyan-400 font-bold block">{item.step}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{item.name}</span>
                  <span className="text-[10px] text-slate-400 block">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. LAYOUT SECTION (FROM 3D TO 2D CONSTRUCTION DOCUMENTS)
         ==================================================== */}
      <section ref={layoutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Included in Every Pro Subscription</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            LayOut — From 3D Models to Professional 2D Documentation
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Turn your SketchUp models into detailed 2D architectural drawings, construction plan sets, section cuts, and professional presentations with dynamically linked viewports.
          </p>
        </div>

        {/* Interactive Viewport / Drawing Preview */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                LayOut Dynamic Viewport Engine
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {layoutMode === '3d'
                  ? 'Active 3D Perspective Model (SketchUp Modeler)'
                  : 'Coordinated 2D Architectural Drawing Sheet (LayOut Plan Set)'}
              </h3>
            </div>

            {/* Toggle Button */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLayoutMode('3d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === '3d'
                    ? 'bg-white text-[#005F9E] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3D Model View
              </button>
              <button
                onClick={() => setLayoutMode('2d')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === '2d'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2D LayOut Drawing Sheet
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[16/9] max-h-[460px] flex items-center justify-center">
            <img
              src={
                layoutMode === '3d'
                  ? '/images/software/sketchup-pro.jpg'
                  : '/images/ares-standard/cad-arch-floorplan.jpg'
              }
              alt={layoutMode === '3d' ? '3D Model View' : '2D LayOut Architectural Plan'}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs border border-white/10 shadow-lg">
              <span className="font-mono text-cyan-300 font-bold">
                {layoutMode === '3d' ? 'Perspective Viewport' : 'Scale 1:100 • Metric Plan Set • Associative Dimensioning'}
              </span>
            </div>
          </div>

          {/* 6 Key Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {sketchupProData.layoutFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{feat.title}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-5">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. CAD & DWG INTEROPERABILITY
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-blue-950 text-white p-8 sm:p-12 border border-blue-900 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-900/60 px-3 py-1 rounded-full border border-cyan-700/60">
              CAD Interchange
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Move smoothly between 3D design and CAD documentation
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              LayOut supports robust DWG import and export workflows, helping architecture and engineering teams move between SketchUp documentation and AutoCAD / ARES CAD environments with full layer integrity and vector accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'DWG / DXF Import',
                desc: 'Bring 2D survey plans, floor plans, and mechanical layouts into SketchUp to model them accurately in 3D.',
              },
              {
                title: 'Layer & Tag Mapping',
                desc: 'Tags in SketchUp map cleanly to CAD layers upon export, preserving company drafting standards.',
              },
              {
                title: 'Vector Hatches & Lines',
                desc: 'Export crisp vector polylines, hatches, line weights, and title blocks compatible with CAD tools.',
              },
              {
                title: 'IFC & BIM Export',
                desc: 'Export IFC 2x3 and IFC4 certified building data with classified elements for BIM coordination.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-blue-900/50 border border-blue-800 space-y-2">
                <span className="text-xs font-mono text-cyan-300 font-bold">0{idx + 1}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          9. MULTI-DEVICE SUITE: WEB, IPAD & CLOUD
         ==================================================== */}
      <section ref={mobileRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Freedom to Design Everywhere
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Work seamlessly across Desktop, iPad, and Web
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A single SketchUp Pro subscription grants you access to native iPadOS modeling with Apple Pencil, browser-based WebGL modeling, and unlimited cloud storage on Trimble Connect.
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-xs text-xs font-bold space-x-1">
            {[
              { id: 'desktop' as const, label: 'Desktop (Win/Mac)' },
              { id: 'ipad' as const, label: 'SketchUp for iPad' },
              { id: 'web' as const, label: 'SketchUp for Web' },
              { id: 'connect' as const, label: 'Trimble Connect Cloud' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#005F9E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        {(() => {
          const plat = sketchupProData.platforms.find(p => p.id === activeTab)!
          return (
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#005F9E] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {plat.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-950">{plat.headline}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{plat.description}</p>

                <div className="space-y-2.5 pt-2">
                  {plat.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#005F9E] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal(`SketchUp ${plat.name} Inquiry`)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#005F9E] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {plat.primaryCta} →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-950">
                  <img src={plat.image} alt={plat.name} className="w-full h-auto object-cover max-h-[380px]" />
                </div>
              </div>
            </div>
          )
        })()}
      </section>

      {/* ====================================================
          10. 3D WAREHOUSE (MILLIONS OF PRE-BUILT ASSETS)
         ==================================================== */}
      <section ref={warehouseRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
              World’s Largest 3D Content Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              3D Warehouse — Millions of Models with Unlimited Downloads
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Populate your designs in seconds. Download verified manufacturer furniture, lighting, appliances, trees, vehicles, and construction components directly into your active model viewport.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              ✓ Unlimited Downloads in Pro
            </span>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Furniture', 'Architecture', 'Lighting', 'Vehicles', 'Landscape', 'Appliances'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedWarehouseCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedWarehouseCategory === cat
                  ? 'bg-[#005F9E] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Model Asset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWarehouse.map(item => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all group"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-mono font-bold">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 text-slate-900 text-[10px] font-mono font-bold shadow-xs">
                  {item.fileSize}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#005F9E] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>By {item.author}</span>
                  <span className="font-mono">{item.polygons} Polys</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          11. EXTENSION WAREHOUSE (1,000+ PLUGINS)
         ==================================================== */}
      <section ref={extensionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
                Modular Customization
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Extension Warehouse — 1,000+ Specialized Tools
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                Tailor SketchUp to your discipline with third-party extensions for organic sub-division modeling, instant cost estimating, parametric framing, and photorealistic rendering.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search extensions..."
                value={extensionSearch}
                onChange={e => setExtensionSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#005F9E]"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {[
              { id: 'all', label: 'All Extensions' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'construction', label: 'Construction' },
              { id: 'visualization', label: 'Visualization' },
              { id: 'productivity', label: 'Productivity' },
              { id: 'landscape', label: 'Landscape' },
              { id: 'engineering', label: 'Engineering' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setExtensionCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  extensionCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Extension Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExtensions.map(ext => (
              <div
                key={ext.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#005F9E]/40 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#005F9E] flex items-center justify-center font-bold">
                      {ext.category === 'architecture' && <Layers className="w-5 h-5" />}
                      {ext.category === 'construction' && <Box className="w-5 h-5" />}
                      {ext.category === 'visualization' && <Palette className="w-5 h-5" />}
                      {ext.category === 'productivity' && <Zap className="w-5 h-5" />}
                      {ext.category === 'landscape' && <TreePine className="w-5 h-5" />}
                      {ext.category === 'engineering' && <Calculator className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-950">{ext.name}</h4>
                      <span className="text-[11px] text-slate-500">By {ext.developer}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{ext.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">{ext.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  <span className="font-mono">{ext.downloads} installs</span>
                  <span className="capitalize font-semibold text-slate-700">{ext.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          12. PREDESIGN & SKETCHUP AI
         ==================================================== */}
      <section ref={predesignRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PreDesign Environmental Architecture */}
          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950 text-white border border-emerald-900 shadow-lg space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
                Climate &amp; Environmental Intelligence
              </span>
              <h3 className="text-2xl font-black text-white">PreDesign Climate Insights</h3>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                Make smarter early design decisions. PreDesign pulls verified local climate data to calculate solar paths, recommend shading depths, and optimize window-to-wall ratios before drafting begins.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {sketchupProData.preDesignFeatures.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-900/50 border border-emerald-800/80 space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{feat.title}</span>
                  </h4>
                  <p className="text-xs text-emerald-200 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SketchUp AI Capabilities */}
          <div className="p-8 sm:p-10 rounded-3xl bg-indigo-950 text-white border border-indigo-900 shadow-lg space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-800">
                Next-Gen Intelligence
              </span>
              <h3 className="text-2xl font-black text-white">SketchUp AI &amp; Diffusion</h3>
              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                Bring AI directly into your design pipeline. Generate photorealistic visual concepts from text prompts using your 3D model geometry as a structural guide with SketchUp Diffusion.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {sketchupProData.aiCapabilities.map((ai, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-indigo-900/50 border border-indigo-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{ai.title}</span>
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-indigo-800/80 px-2 py-0.5 rounded text-indigo-300">
                      {ai.tag}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200 leading-relaxed">{ai.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          13. INTERACTIVE PROFESSIONAL PROGRESSION
         ==================================================== */}
      <section ref={workflowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            End-To-End Architecture Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            How Professionals Work with SketchUp Pro
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Click through each milestone in the design workflow to see how SketchUp Pro connects conceptual ideas to permitted construction sets.
          </p>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {workflowProgression.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveWorkflowStep(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeWorkflowStep === idx
                  ? 'bg-[#005F9E] text-white border-[#005F9E] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-xs font-mono font-bold block ${
                  activeWorkflowStep === idx ? 'text-blue-200' : 'text-[#005F9E]'
                }`}
              >
                Step {step.step}
              </span>
              <span className="text-xs font-bold block mt-1 line-clamp-1">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        {(() => {
          const curr = workflowProgression[activeWorkflowStep]
          return (
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono font-bold text-[#005F9E] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase">
                  Workflow Step {curr.step} — {curr.tool}
                </span>
                <h3 className="text-2xl font-black text-slate-950">{curr.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{curr.desc}</p>
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal(`SketchUp Workflow Consultation: ${curr.title}`)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#005F9E] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Discuss This Workflow with an Engineer →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[16/10]">
                  <img src={curr.image} alt={curr.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )
        })()}
      </section>

      {/* ====================================================
          14. INDUSTRIES SECTION
         ==================================================== */}
      <section ref={industriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Built for Real-World Disciplines
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Tailored for Every Design Profession
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From boutique interior design studios to multi-disciplinary architecture and construction firms, SketchUp Pro adapts to your deliverables.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sketchupProData.industries.map(ind => (
            <div
              key={ind.id}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                    <h3 className="text-lg font-black text-white">{ind.name}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs font-bold text-[#005F9E]">{ind.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Deliverables
                    </span>
                    {ind.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-xs text-slate-700">
                        <Check className="w-3 h-3 text-[#005F9E] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => openQuoteModal(`Industry License Request: ${ind.name}`)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#005F9E] font-bold text-xs transition-colors cursor-pointer border border-slate-200"
                >
                  Request {ind.name} Licensing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          15. PRICING SECTION (DYNAMIC & CLEAR)
         ==================================================== */}
      <section ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Commercial Licensing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Commercial Subscription Plans
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Official Trimble SketchUp Pro licensing for commercial users. Includes Desktop modeler, LayOut, Web, iPad, unlimited Trimble Connect cloud, and 3D Warehouse.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* SketchUp Pro (Featured) */}
          <div className="p-8 rounded-3xl bg-white border-2 border-[#005F9E] shadow-xl relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#005F9E] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              MOST POPULAR FOR PROFESSIONALS
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-950">SketchUp Pro</h3>
                <span className="text-xs text-slate-500 font-semibold">
                  Complete 3D modeling &amp; 2D documentation ecosystem
                </span>
              </div>

              <div className="py-3 border-y border-slate-100 space-y-1">
                <div className="text-2xl font-black text-slate-950">Commercial License</div>
                <div className="text-xs text-blue-700 font-bold">Annual Named-User Subscription</div>
                <span className="text-[10px] text-slate-400 block">
                  Official commercial quotes in INR with GST compliance and authorized technical support.
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Included in SketchUp Pro:
                </span>
                {[
                  'SketchUp for Desktop (Windows & macOS offline)',
                  'LayOut 2D documentation & scaled permit sets',
                  'SketchUp for Web (browser-based modeler)',
                  'SketchUp for iPad (Apple Pencil & AR mode)',
                  'Trimble Connect (unlimited cloud storage & projects)',
                  '3D Warehouse (unlimited pre-built model downloads)',
                  'Extension Warehouse (1,000+ specialized plugins)',
                  'PreDesign climate intelligence & solar guidance',
                  'SketchUp AI & Diffusion conceptual rendering',
                  'DWG / DXF / IFC CAD & BIM interoperability',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#005F9E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => openQuoteModal('SketchUp Pro Commercial Annual Subscription')}
                className="w-full py-3.5 rounded-xl bg-[#005F9E] hover:bg-[#004b7e] text-white font-black text-xs transition-colors cursor-pointer shadow-md"
              >
                Request Commercial Quote
              </button>
            </div>
          </div>

          {/* Need Advanced Studio? */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-800 px-2.5 py-0.5 rounded text-cyan-400">
                  ADVANCED BIM &amp; RENDERING SUITE
                </div>
                <h3 className="text-xl font-black text-white mt-2">SketchUp Studio</h3>
                <span className="text-xs text-slate-400 font-semibold">
                  For point clouds, Revit import &amp; photoreal V-Ray rendering
                </span>
              </div>

              <div className="py-3 border-y border-slate-800 space-y-1">
                <div className="text-2xl font-black text-white">Advanced AEC Suite</div>
                <div className="text-xs text-cyan-400 font-bold">Comprehensive Annual Subscription</div>
                <span className="text-[10px] text-slate-400 block">
                  Complete BIM reality capture, Revit model conversion &amp; Chaos V-Ray photoreal rendering.
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Everything in Pro PLUS:
                </span>
                {[
                  'Scan Essentials: Point cloud laser scan modeling',
                  'Revit Importer: Convert .rvt geometry into SketchUp',
                  'Chaos V-Ray: Photorealistic CPU/GPU ray tracing',
                  'Rendered 360° panoramas & animations',
                  'Cloud point cloud streaming via Trimble Connect',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/products/sketchup-studio"
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>Explore SketchUp Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          16. PLAN COMPARISON TABLE (GO VS PRO VS STUDIO)
         ==================================================== */}
      <section ref={comparisonRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Plan Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SketchUp Go vs SketchUp Pro vs SketchUp Studio
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Compare features across subscriptions. Note that advanced BIM tools like Scan Essentials, Revit Importer, and V-Ray are exclusive to SketchUp Studio.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <th className="p-4 sm:p-5 font-black text-sm">Features &amp; Platforms</th>
                <th className="p-4 sm:p-5 font-bold text-slate-600 text-center w-1/5">
                  SketchUp Go
                  <span className="block text-[10px] text-slate-400 font-normal">Web &amp; iPad Edition</span>
                </th>
                <th className="p-4 sm:p-5 font-black text-[#005F9E] bg-blue-50/50 text-center w-1/4 border-x-2 border-[#005F9E]">
                  SketchUp Pro
                  <span className="block text-[10px] text-blue-700 font-bold">Recommended for Professionals</span>
                </th>
                <th className="p-4 sm:p-5 font-bold text-slate-800 text-center w-1/4">
                  SketchUp Studio
                  <span className="block text-[10px] text-slate-400 font-normal">Complete AEC &amp; BIM Suite</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sketchupProData.comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-800">{row.featureName}</td>
                  {/* Go */}
                  <td className="p-3.5 sm:p-4 text-center">
                    {row.go === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : row.go === false ? (
                      <span className="text-slate-300 font-mono">—</span>
                    ) : (
                      <span className="text-[11px] text-slate-600">{row.go}</span>
                    )}
                  </td>
                  {/* Pro */}
                  <td className="p-3.5 sm:p-4 text-center bg-blue-50/30 border-x-2 border-[#005F9E]/30 font-bold">
                    {row.pro === true ? (
                      <Check className="w-4 h-4 text-[#005F9E] mx-auto" />
                    ) : row.pro === false ? (
                      <span className="text-slate-300 font-mono">—</span>
                    ) : (
                      <span className="text-[11px] text-[#005F9E]">{row.pro}</span>
                    )}
                  </td>
                  {/* Studio */}
                  <td className="p-3.5 sm:p-4 text-center">
                    {row.studio === true ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : row.studio === false ? (
                      <span className="text-slate-300 font-mono">—</span>
                    ) : (
                      <span className="text-[11px] text-slate-700">{row.studio}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====================================================
          17. TECHNICAL SYSTEM REQUIREMENTS
         ==================================================== */}
      <section ref={techSpecsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Hardware &amp; System Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Verified Technical Requirements
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ensure your workstations meet official Trimble SketchUp Pro system specifications for optimal 3D viewport fluidity and LayOut responsiveness.
          </p>

          <div className="flex justify-center pt-2">
            <div className="inline-flex rounded-xl bg-white p-1 border border-slate-200 text-xs font-bold shadow-xs">
              <button
                onClick={() => setOpenSysReq('recommended')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  openSysReq === 'recommended'
                    ? 'bg-[#005F9E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Recommended Hardware
              </button>
              <button
                onClick={() => setOpenSysReq('minimum')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  openSysReq === 'minimum'
                    ? 'bg-[#005F9E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Minimum Requirements
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {sketchupProData.systemRequirements.map((req, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-bold text-slate-900 sm:w-1/3">{req.category}</span>
                <span className="text-xs text-slate-600 sm:w-2/3">
                  {openSysReq === 'recommended' ? req.recommended : req.minimum}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          18. TRUST & AUTHORIZED RESELLER (LENIVA CAD SOLUTIONS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              Authorized Reseller in India
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why Procure SketchUp Pro Through Leniva CAD Solutions?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Leniva CAD Solutions provides authentic Trimble SketchUp commercial licenses, educational packages, and enterprise volume subscriptions across India with full localized assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '100% Genuine Commercial Licenses',
                desc: 'Official Trimble commercial subscriptions registered directly under your company domain and Trimble ID.',
              },
              {
                title: 'GST Compliant Tax Invoicing',
                desc: 'Claim complete input tax credit (ITC) with valid corporate GST invoicing in Indian Rupees (INR).',
              },
              {
                title: 'Dedicated Local Technical Support',
                desc: 'Assistance with installation, license activation, workstation deployment, and troubleshooting from our engineering team.',
              },
              {
                title: 'Flexible Commercial Payment Options',
                desc: 'Pay via corporate NEFT, RTGS, UPI, or corporate credit cards with timely renewal reminders.',
              },
            ].map((box, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">{box.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          19. FREQUENTLY ASKED QUESTIONS (FAQS)
         ==================================================== */}
      <section ref={faqsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#005F9E] font-bold">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Everything you need to know about SketchUp Pro subscription, LayOut, device licensing, and commercial purchasing.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'general', label: 'General & Overview' },
              { id: 'desktop-layout', label: 'Desktop & LayOut' },
              { id: 'platforms', label: 'iPad & Cloud' },
              { id: 'licensing', label: 'Licensing & Editions' },
              { id: 'extensions', label: 'Extensions' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  faqCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#005F9E]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          20. FINAL HIGH-IMPACT CTA SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-[#005F9E] to-blue-800 text-white p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
              Ready to Upgrade Your 3D Workflow?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Turn your ideas into professional 3D designs.
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Create, visualize, document, and collaborate with SketchUp Pro. Contact Leniva CAD Solutions today for commercial licensing, quotations, and immediate setup.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
            <button
              onClick={() => openQuoteModal('SketchUp Pro Immediate Purchase / Invoicing')}
              className="px-8 py-3.5 rounded-xl bg-white text-[#005F9E] hover:bg-blue-50 text-sm font-black shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Subscribe to SketchUp Pro
            </button>
            <button
              onClick={() => openQuoteModal('SketchUp Pro 30-Day Evaluation License')}
              className="px-6 py-3.5 rounded-xl bg-blue-950/60 hover:bg-blue-950 text-white border border-white/30 text-sm font-bold transition-colors cursor-pointer"
            >
              Try SketchUp Free
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SketchUpProPage
