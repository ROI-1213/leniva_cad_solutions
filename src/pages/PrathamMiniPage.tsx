import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  FileText,
  Sparkles,
  Maximize2,
  Box,
  Layers,
  Zap,
  ShieldCheck,
  ArrowRight,
  Cpu,
  School,
  ChevronDown,
  Monitor,
  HardDrive,
  Usb,
  Compass,
  Flame,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const PrathamMiniPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'print' | 'motion' | 'hardware' | 'software'>('print')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // FAQ Items
  const faqItems = [
    {
      q: 'Is Pratham Mini suitable for beginners and students?',
      a: 'Yes, absolutely. The Pratham Mini is engineered specifically for easy setup and operation. With its pre-leveled bed geometry, intuitive controls, and robust metal construction, students, beginners, and first-time makers can produce successful prints right out of the box without complicated calibration.',
    },
    {
      q: 'What materials does the Pratham Mini support?',
      a: 'Pratham Mini supports 1.75 mm thermoplastic filaments including PLA, PLA+, PETG, TPU (95A flexible), and other standard engineering blends. The heated bed reaches up to 120°C and the all-metal hotend reaches up to 280°C.',
    },
    {
      q: 'Is the Pratham Mini fully enclosed?',
      a: 'Yes. It features a rigid all-metal enclosed body structure that maintains stable ambient chamber temperatures, reduces draft exposure, and ensures safe operation in busy classrooms, schools, and design laboratories.',
    },
    {
      q: 'What industries and institutions use this 3D printer?',
      a: 'Pratham Mini is widely deployed in STEM high schools, engineering universities, polytechnic colleges, robotics clubs, architecture design studios, R&D labs, and hardware startups for rapid functional prototyping and concept validation.',
    },
    {
      q: 'Is the printer designed and manufactured in India?',
      a: 'Yes. Pratham Mini is proudly designed, engineered, and manufactured in India by Make3D, backed by Leniva CAD Solutions for nationwide sales, field installation, warranty fulfillment, and dedicated technical support.',
    },
    {
      q: 'Does Leniva CAD Solutions provide installation and hands-on onboarding?',
      a: 'Yes. Every Pratham Mini comes with comprehensive installation support, live video/on-site commissioning, and hands-on slicing software onboarding for faculty, lab instructors, and students across India.',
    },
  ]

  // Gallery Items matching real print results
  const galleryPrints = [
    {
      title: 'HUMAN HEART MODEL',
      category: 'EDUCATIONAL MODEL',
      material: 'PLA',
      layer: '0.1 mm',
      printTime: '6h 30m',
      desc: 'A detailed anatomical model printed for educational and learning purposes.',
      image: '/images/products/pratham-mini-heart.png',
    },
    {
      title: 'FUNCTIONAL GEAR ASSEMBLY',
      category: 'ENGINEERING PART',
      material: 'PETG',
      layer: '0.2 mm',
      printTime: '4h 15m',
      desc: 'Strong and precise gear assembly printed for mechanical testing and prototyping.',
      image: '/images/products/pratham-mini-gear.png',
    },
    {
      title: 'ARCHITECTURAL HOUSE MODEL',
      category: 'DESIGN MODEL',
      material: 'PLA',
      layer: '0.1 mm',
      printTime: '8h 20m',
      desc: 'A detailed architectural model with clean finish and accurate dimensions.',
      image: '/images/products/pratham-mini-house.png',
    },
    {
      title: 'PHONE STAND HOLDER',
      category: 'PROTOTYPE',
      material: 'PLA',
      layer: '0.2 mm',
      printTime: '2h 10m',
      desc: 'A lightweight and durable phone stand printed for everyday use and functional testing.',
      image: '/images/products/pratham-mini-stand.png',
    },
  ]

  // Series Printers
  const prathamSeries = [
    { name: 'Pratham Mini', vol: '170 × 170 × 170 mm', tag: 'Classroom & Lab', active: true, img: '/images/products/pratham-mini.png' },
    { name: 'Pratham Desktop', vol: '200 × 200 × 250 mm', tag: 'Studio Series', link: '/products/pratham-desktop', img: '/images/products/pratham-desktop.png' },
    { name: 'Pratham 3 Rapid', vol: '350 × 350 × 350 mm', tag: '500 mm/s CoreXY', link: '/products/pratham-3-rapid', img: '/images/products/pratham-3-rapid.png' },
    { name: 'Pratham 3.0', vol: '300 × 300 × 300 mm', tag: '24/7 Factory Workhorse', link: '/products/pratham-3', img: '/images/products/pratham-3-0.png' },
    { name: 'Pratham 5.0', vol: '500 × 500 × 500 mm', tag: 'Heated Chamber FDM', link: '/products/pratham-5', img: '/images/products/pratham-5-0.png' },
    { name: 'Pratham 6.0', vol: '600 × 600 × 600 mm', tag: 'Large Format Industrial', link: '/products/pratham-6', img: '/images/products/pratham-6-0.png' },
    { name: 'Pratham X', vol: '1000 × 1000 × 1000 mm', tag: '1 m³ Extra Large', link: '/products/pratham-x', img: '/images/products/pratham-x.png' },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16">
      {/* ====================================================
          1. STICKY PRODUCT NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-slate-950 tracking-tight">PRATHAM MINI</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-bold uppercase tracking-wider">
              Compact FDM
            </span>
          </div>

          {/* Quick jump navigation links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-600 transition-colors cursor-pointer">Overview</button>
            <button onClick={() => scrollTo(educationRef)} className="hover:text-red-600 transition-colors cursor-pointer">Education</button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-red-600 transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-red-600 transition-colors cursor-pointer">Specifications</button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-red-600 transition-colors cursor-pointer">Gallery</button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-red-600 transition-colors cursor-pointer">FAQ</button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/brochures/pratham-mini.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham Mini 3D Printer Inquiry')}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. HERO SECTION
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-2 sm:!mt-3 pt-0">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-3 sm:mb-4">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Pratham Mini</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Lighting Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Headlines, Specs & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>PRATHAM MINI 3D PRINTER • MADE IN INDIA</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.08]">
                  Compact Power for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                    Precision Prototyping
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-bold text-slate-700">
                  India&apos;s Most Reliable Entry-Level 3D Printer
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed pt-1">
                  Designed for education, startups, design labs, and small-scale production. Delivers industrial-grade dimensional precision in a space-saving desktop footprint.
                </p>
              </div>

              {/* Three Important Specifications Immediately */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">BUILD VOLUME</span>
                  <div className="text-sm sm:text-base font-black text-slate-950 font-mono">170 × 170 × 170 mm</div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Desktop Footprint</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">TECHNOLOGY</span>
                  <div className="text-sm sm:text-base font-black text-slate-950 font-mono">FDM / FFF</div>
                  <span className="text-[10px] text-slate-500 block">Fused Deposition</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">ORIGIN</span>
                  <div className="text-sm sm:text-base font-black text-slate-950 font-mono">Made in India</div>
                  <span className="text-[10px] text-emerald-600 font-semibold block">Technical Support</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/brochures/pratham-mini.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Product Brochure (PDF)</span>
                </a>

                <button
                  onClick={() => openQuoteModal('Pratham Mini - Live Demonstration Request')}
                  className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span>Schedule Live Demo</span>
                </button>
              </div>
            </div>

            {/* Right Column: Realistic Machine Render & Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-slate-100/70 to-slate-200/50 border border-slate-200 flex items-center justify-center p-8 group">
                <img
                  src="/images/products/pratham-mini.png"
                  alt="Pratham Mini 3D Printer - Entry Level Precision FDM"
                  className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Badge 1: Speed */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center space-x-2 text-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono font-bold text-slate-900">Up to 120 mm/s</span>
                </div>

                {/* Floating Badge 2: Enclosed Chassis */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center space-x-2 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-slate-900">Enclosed Metal Body</span>
                </div>

                {/* Floating Badge 3: Resolution */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center space-x-2 text-xs">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-mono font-bold text-slate-900">0.1 mm Resolution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. PRODUCT INTRODUCTION: SMART. COMPACT. ENTRY-LEVEL
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 font-mono">
              — Pure Engineering Architecture —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Smart. Compact. Entry-Level 3D Printer
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineered and manufactured in India to deliver professional-quality additive manufacturing on any workbench. Combines an enclosed chassis with optimized round-shaft motion guides for steady layer stacking, consistent precision, and ultra-smooth surface finishes.
            </p>
          </div>

          {/* Machine with Callouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Fully Enclosed Body</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Heavy-gauge mild steel enclosure prevents thermal drafts and ensures student-safe classroom operation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <Compass className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Stable Motion System</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Precision round shaft guides with 11 μm XY accuracy for crisp dimensional repeatability.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <Maximize2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Compact Studio Footprint</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Measures only 380 × 260 × 460 mm. Easily fits crowded university labs, desks, and prototyping spaces.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <HardDrive className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-bold text-white">Plug-and-Play LCD Control</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Standalone operation via USB and SD card. Start prints in seconds without requiring a dedicated PC.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal('Pratham Mini Instant Quotation')}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Get Instant Quote
            </button>
            <a
              href="/brochures/pratham-mini.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. EDUCATION-FOCUSED SECTION (5 CARDS)
         ==================================================== */}
      <section ref={educationRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — STEM &amp; Skill Development —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Best-in-Class 3D Printer for Educational Institutes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Empower the next generation of engineers, architects, and product designers with hands-on additive manufacturing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              num: '01',
              title: 'Compact Industrial Design',
              desc: 'Space-saving footprint integrates seamlessly into school computer labs and college workbenches.',
              icon: Box,
            },
            {
              num: '02',
              title: 'Fully Enclosed Metal Body',
              desc: 'Protects students from heated moving components while maintaining stable thermal print conditions.',
              icon: ShieldCheck,
            },
            {
              num: '03',
              title: 'Stable Motion System',
              desc: 'Rigid round shafts withstand daily student experimentation and continuous multi-hour runs.',
              icon: Compass,
            },
            {
              num: '04',
              title: 'Easy Plug-and-Play Setup',
              desc: 'Zero complex calibration required. Unbox, plug in, insert SD card, and begin 3D printing in 15 minutes.',
              icon: Zap,
            },
            {
              num: '05',
              title: 'Ideal for Labs & Institutions',
              desc: 'Built tough for engineering colleges, ATAL Tinkering Labs (ATL), polytechnics, and maker clubs.',
              icon: School,
            },
          ].map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.num}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-red-400 hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-600">{card.num}</span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 leading-snug">{card.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          5. KEY TECHNICAL FEATURES (6 INTERACTIVE PANELS)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Core Engineering Specs —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Key Points of Pratham MINI 3D Printer
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered for compact performance, reliable continuous extrusion, and high precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 01: High-Speed Printing */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 01</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">High-Speed Printing</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Print Faster. Prototype Faster.</p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 font-mono text-center">
              <div className="text-3xl font-black text-amber-400">Up to 120 mm/s</div>
              <div className="text-[10px] text-slate-400">40 – 120 mm/s Adjustable Velocity</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-amber-400 h-full w-4/5 animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rapid travel velocity and responsive direct extrusion allow quick classroom iterations and expedited prototype delivery.
            </p>
          </div>

          {/* Feature 02: Smart Connectivity */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 02</span>
              <Usb className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">Smart Connectivity</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Simple Connectivity. Easy Control.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center space-y-2 text-center text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800">USB DRIVE</span>
                <span>+</span>
                <span className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800">SD CARD</span>
              </div>
              <div className="text-[10px] text-slate-400">↓ Direct Execution</div>
              <div className="px-3 py-1 bg-slate-900 text-emerald-400 rounded-lg font-bold text-[11px]">
                ONBOARD LCD CONTROL
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standalone 3D printing without tethering to a computer. Load G-code directly from standard USB or SD card storage.
            </p>
          </div>

          {/* Feature 03: Layer Resolution (Static Display) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 03</span>
              <Layers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">Layer Resolution</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Precision at Every Layer</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 font-mono text-center">
              <div className="text-2xl font-black text-blue-600">0.1 – 0.3 mm</div>
              <div className="text-[10px] font-bold text-slate-600">100 – 300 Microns Layer Precision</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-full rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                <span>0.1 mm (Ultra Detail)</span>
                <span>0.3 mm (Fast Draft)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Micro-adjustable slice height accommodates ultra-fine visual showpieces or rapid functional block prototypes.
            </p>
          </div>

          {/* Feature 04: Build Volume */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 04</span>
              <Box className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">Build Volume</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Compact Footprint. Practical Build Space.</p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center space-y-1 font-mono">
              <div className="text-2xl font-black text-white">170 × 170 × 170 mm</div>
              <div className="text-[10px] text-slate-400 pt-1">Ideal for classroom &amp; lab prototypes</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ample cubic workspace tailored for student engineering models without taking up excessive bench space.
            </p>
          </div>

          {/* Feature 05: File Compatibility */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 05</span>
              <Cpu className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">File Compatibility</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Works With Your Existing CAD Workflow</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-center font-mono text-[10px] space-y-1">
              <div className="font-bold text-slate-700">CAD MODEL (SolidWorks / Fusion / SketchUp)</div>
              <div>↓</div>
              <div className="flex justify-center space-x-2 font-bold text-red-600">
                <span className="px-2 py-0.5 bg-red-50 rounded">.STL</span>
                <span className="px-2 py-0.5 bg-red-50 rounded">.OBJ</span>
                <span className="px-2 py-0.5 bg-red-50 rounded">.GCODE</span>
              </div>
              <div>↓</div>
              <div className="font-bold text-emerald-700">ULTIMAKER CURA SLICER ➔ PRATHAM MINI</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compatible with all industry-standard CAD formats and popular open slicers like Ultimaker Cura and PrusaSlicer.
            </p>
          </div>

          {/* Feature 06: Filament Compatibility */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-600">Feature 06</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950">Filament Compatibility</h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Print With the Materials You Need</p>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500">1.75 mm Standard Diameter:</div>
              <div className="flex flex-wrap gap-1.5">
                {['PLA', 'PLA+', 'PETG', 'ABS', 'TPU (95A)'].map((mat) => (
                  <Link
                    key={mat}
                    to="/materials"
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 border border-slate-200 text-xs font-bold transition-colors"
                  >
                    {mat}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard 1.75 mm universal spool carrier. View certified filaments in our{' '}
              <Link to="/materials" className="text-red-600 font-bold hover:underline">
                Materials Hub →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INTERACTIVE TECHNICAL SPECIFICATIONS
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                — Official Brochure Parameters —
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Verified Technical Specifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Performance metrics certified from the official manufacturer datasheet.
              </p>
            </div>

            {/* Spec Category Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
              {[
                { id: 'print', label: 'PRINT' },
                { id: 'motion', label: 'MOTION' },
                { id: 'hardware', label: 'HARDWARE' },
                { id: 'software', label: 'SOFTWARE' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSpecTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    activeSpecTab === tab.id
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Tables */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            {activeSpecTab === 'print' && (
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Technology</span><span className="text-slate-900 font-mono">Fused Filament Fabrication (FFF / FDM)</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Build Volume</span><span className="text-slate-900 font-mono font-bold">170 × 170 × 170 mm</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Layer Resolution</span><span className="text-slate-900 font-mono font-bold">0.1 – 0.3 mm (100 – 300 microns)</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Print Speed</span><span className="text-slate-900 font-mono">Up to 120 mm/s</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Nozzle Diameter</span><span className="text-slate-900 font-mono">0.4 mm standard (all-metal)</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Maximum Hotend Temperature</span><span className="text-slate-900 font-mono font-bold">280°C</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Print Bed Temperature</span><span className="text-slate-900 font-mono">Up to 120°C with rapid heating</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Filament Compatibility</span><span className="text-slate-900">PLA, PLA+, PETG, TPU, and 1.75 mm thermoplastics</span></div>
              </div>
            )}

            {activeSpecTab === 'motion' && (
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">XY Gantry System</span><span className="text-slate-900">Precision round shaft motion guide</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">X-Y Axis Positioning Accuracy</span><span className="text-slate-900 font-mono font-bold">11 microns (0.011 mm)</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Z Axis Positioning Accuracy</span><span className="text-slate-900 font-mono font-bold">10 microns (0.010 mm)</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Dimensional Tolerance</span><span className="text-slate-900 font-mono font-bold">±0.2 mm</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Bed Leveling</span><span className="text-slate-900">Factory pre-calibrated mechanical alignment</span></div>
              </div>
            )}

            {activeSpecTab === 'hardware' && (
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Chassis Construction</span><span className="text-slate-900 font-bold">All-metal MS (Mild Steel) enclosed structure</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Machine Footprint (W × D × H)</span><span className="text-slate-900 font-mono font-bold">380 × 260 × 460 mm</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Machine Net Weight</span><span className="text-slate-900 font-mono">20 kg</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Shipping Gross Weight</span><span className="text-slate-900 font-mono">28 kg (with toolkit &amp; accessories)</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Power Supply &amp; Consumption</span><span className="text-slate-900 font-mono">230V, 50 Hz, 120W Max</span></div>
              </div>
            )}

            {activeSpecTab === 'software' && (
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Supported Slicing Software</span><span className="text-slate-900 font-bold">Ultimaker Cura, PrusaSlicer, Simplify3D</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Operating System Compatibility</span><span className="text-slate-900">Windows 10/11, macOS, Linux</span></div>
                <div className="grid grid-cols-2 p-3.5 bg-slate-50/50"><span className="font-bold text-slate-700">Input 3D File Formats</span><span className="text-slate-900 font-mono">.STL, .OBJ, .3MF, .GCODE</span></div>
                <div className="grid grid-cols-2 p-3.5"><span className="font-bold text-slate-700">Connectivity Options</span><span className="text-slate-900 font-mono font-bold">USB Drive, SD Card (Offline Standalone)</span></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================
          7. REAL-WORLD PRINTING & EDUCATIONAL GALLERY
         ==================================================== */}
      {/* ====================================================
          7. REAL-WORLD PRINTING & EDUCATIONAL GALLERY
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — REAL PRINT RESULTS —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            See What Pratham Mini Can Create
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From prototypes to learning projects, Pratham Mini brings ideas to life with precision and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryPrints.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                {/* Real 3D Printed Photo */}
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Classification & Headings */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-600 block">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black text-slate-950 tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          9. SERVICE, ONBOARDING & SUPPORT
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Complete Ownership Experience —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Installation, Onboarding &amp; Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-950">Professional Installation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leniva field engineers assist with machine unboxing, mechanical checkouts, bed tramming, and first-layer verification on-site or via guided interactive video.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-950">Hands-on Operator Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive slicing curriculum for students and lab technicians covering Cura setup, orientation strategies, support settings, and maintenance protocols.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-950">Dedicated Service Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated technical helpdesk with direct spare parts availability, warranty fulfillment, and responsive phone and email engineering support.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. EXPLORE THE PRATHAM SERIES
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — FDM Ecosystem —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore the Pratham Series
            </h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1">
            <span>View All 3D Printers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {prathamSeries.map((p) => {
            const cardInner = (
              <div
                className={`h-full p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between group ${
                  p.active
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-red-500'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-red-500 hover:shadow-lg'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase block tracking-wider">
                    {p.tag}
                  </span>
                  <h3 className="font-extrabold text-sm mt-0.5 tracking-tight truncate">{p.name}</h3>
                  <span className={`text-[10px] font-mono block mt-0.5 ${p.active ? 'text-slate-400' : 'text-slate-500'}`}>
                    {p.vol}
                  </span>
                </div>

                <div
                  className={`my-3 h-24 sm:h-28 rounded-xl flex items-center justify-center p-2 overflow-hidden transition-all ${
                    p.active
                      ? 'bg-slate-900/90 border border-slate-800'
                      : 'bg-slate-50 border border-slate-100 group-hover:bg-red-50/40 group-hover:border-red-100'
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {p.link ? (
                  <span className="text-[11px] font-bold text-red-600 group-hover:text-red-700 flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-slate-400 block pt-2 border-t border-slate-800 mt-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Current Model
                  </span>
                )}
              </div>
            )

            return p.link ? (
              <Link key={p.name} to={p.link} className="block focus:outline-none h-full">
                {cardInner}
              </Link>
            ) : (
              <div key={p.name} className="h-full">
                {cardInner}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          11. FAQ ACCORDION
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Frequent Inquiries —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham Mini FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-950 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default PrathamMiniPage
