import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  Sparkles,
  Box,
  Layers,
  Zap,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Compass,
  Flame,
  Wifi,
  ArrowRight,
  Cpu,
  AlertTriangle,
  Factory,
  Wrench,
  GraduationCap,
  Building2,
  FlaskConical,
  Award,
  PhoneCall,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham3Page: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'print' | 'motion' | 'hardware' | 'software'>('print')
  const [activeGalleryCat, setActiveGalleryCat] = useState<string>('all')
  const [speedGauge, setSpeedGauge] = useState<number>(120)
  const [layerSlider, setLayerSlider] = useState<number>(100) // 80 to 600 microns
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const engineeredRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<HTMLDivElement>(null)
  const smartFeaturesRef = useRef<HTMLDivElement>(null)
  const industrialRef = useRef<HTMLDivElement>(null)
  const keyPointsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Inject SEO Structured Data (Product + FAQ + Breadcrumbs)
  useEffect(() => {
    document.title = 'Pratham 3.0 3D Printer | 300×300×300 mm Industrial FDM Printer India'

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Pratham 3.0 is a 300×300×300 mm industrial FDM 3D printer designed for engineering prototyping, tooling, product development and production applications.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 3.0 Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-3-0.png',
      description:
        'Pratham 3.0 is a 300 × 300 × 300 mm high-performance industrial FDM 3D printer built in India for engineering prototyping, jigs, fixtures, and continuous production manufacturing.',
      brand: {
        '@type': 'Brand',
        name: 'Pratham 3D',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: 'Contact for Quote',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Leniva CAD Solutions',
      },
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Pratham 3.0 suitable for industrial use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The product is positioned specifically for industrial prototyping, tooling fixtures, and low-volume production.',
          },
        },
        {
          '@type': 'Question',
          name: 'What materials can it print?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PLA, ABS, PETG, ASA, TPU, carbon-fiber/composite materials, PP, HIPS, and other engineering-grade materials supported by the configured machine.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the maximum print size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '300 × 300 × 300 mm cubic build volume.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does it come with after-sales support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, full technical support and service are available across India with 24x7 remote assistance and field engineer dispatch.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Pratham 3.0 an Indian-made 3D printer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The product is designed, engineered, and manufactured in India.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leniva / Make3D provide installation and onboarding?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Full unboxing, calibration, on-site/guided installation, and hands-on slicing and operational onboarding are provided.',
          },
        },
      ],
    }

    const scriptProduct = document.createElement('script')
    scriptProduct.type = 'application/ld+json'
    scriptProduct.text = JSON.stringify(productSchema)
    document.head.appendChild(scriptProduct)

    const scriptFaq = document.createElement('script')
    scriptFaq.type = 'application/ld+json'
    scriptFaq.text = JSON.stringify(faqSchema)
    document.head.appendChild(scriptFaq)

    return () => {
      if (document.head.contains(scriptProduct)) document.head.removeChild(scriptProduct)
      if (document.head.contains(scriptFaq)) document.head.removeChild(scriptFaq)
    }
  }, [])

  // Product Gallery Images (Views 01 - 04)
  const productGalleryImages = [
    {
      src: '/images/products/pratham-3-0.png',
      label: 'Isometric 3/4 Studio View',
      caption: 'Full metal enclosed chassis with tinted safety viewports and rigid gantry',
    },
    {
      src: '/images/showcase/pratham-showcase.png',
      label: 'Production Workshop View',
      caption: 'Pratham 3.0 industrial floor integration for 24/7 continuous manufacturing',
    },
    {
      src: '/images/showcase/showcase-1.png',
      label: 'Interior Heated Bed & Hotend',
      caption: 'Silicone heated aluminum bed with 9-point magnetic touch sensor',
    },
    {
      src: '/images/showcase/showcase-2.png',
      label: 'Touchscreen Interface',
      caption: 'Intuitive industrial color touchscreen for offline USB/SD control',
    },
  ]

  // Applications (Section 6)
  const applications = [
    {
      title: 'AUTOMOTIVE PROTOTYPING',
      desc: 'Air intake manifolds, dashboard bezels, fluid reservoirs, and ergonomic assembly prototypes tested under functional loads.',
      icon: Factory,
    },
    {
      title: 'MANUFACTURING TOOLS & FIXTURES',
      desc: 'Custom assembly jigs, CMM inspection nests, robotic end-of-arm grippers, and drill guide templates on the shop floor.',
      icon: Wrench,
    },
    {
      title: 'PRODUCT DESIGN VALIDATION',
      desc: 'Rapid physical mockups for fitment checks, snap-fit enclosures, user ergonomics, and pre-tooling aesthetic reviews.',
      icon: Box,
    },
    {
      title: 'R&D LABORATORIES',
      desc: 'Experimental polymer testing, composite thermoplastic evaluation, and low-run iterative test chambers.',
      icon: FlaskConical,
    },
    {
      title: 'ENGINEERING INSTITUTES',
      desc: 'CAD-to-CAM practical education, university formula student fabrication, and interdisciplinary student innovation labs.',
      icon: GraduationCap,
    },
  ]

  // Performance Benefits (Section 7)
  const performanceBenefits = [
    {
      title: 'SMOOTH SURFACE FINISH',
      desc: 'Micro-step linear rail motion minimizes layer stepping and surface ringing artifacts.',
      metric: 'Sub-micron resonance damping',
    },
    {
      title: 'ACCURATE DIMENSIONAL CONTROL',
      desc: 'Consistent ±0.1 mm tolerance across repetitive production batches of interlocking parts.',
      metric: '±0.1 mm Repeatability',
    },
    {
      title: 'STABLE LAYER BONDING',
      desc: 'Fully enclosed chamber retains thermal equilibrium, preventing delamination in technical ABS and PETG.',
      metric: 'Heated Ambient Retaining',
    },
    {
      title: 'HIGH-STRENGTH PRINTED PARTS',
      desc: 'Extrusion temperature up to 280°C enables dense inter-layer adhesion for mechanical endurance.',
      metric: '280°C High-Temp Hotend',
    },
    {
      title: 'RELIABLE LONG-HOUR PRINTING',
      desc: 'Rigid all-metal frame and industrial power system validated in 157-hour uninterrupted benchmark prints.',
      metric: '157 Hours Continuous Verified',
    },
  ]



  // Work from Pratham 3.0 Gallery (Section 21)
  const galleryItems = [
    {
      id: 'print-1',
      title: 'Real Functional Parts',
      category: 'all-parts',
      tag: 'ALL PARTS',
      application: 'FUNCTIONAL PARTS',
      image: '/images/pratham3-work/01-real-functional-parts.jpg',
      notes: 'Strong, precise and production-ready parts printed with Pratham 3.0 across various industries.',
    },
    {
      id: 'print-2',
      title: 'Automotive Scale Mockups',
      category: 'automotive',
      tag: 'AUTOMOTIVE',
      application: 'AUTOMOTIVE APPLICATIONS',
      image: '/images/pratham3-work/02-automotive-scale-mockups.jpg',
      notes: 'Intake manifolds, brackets, ducts and prototypes for automotive testing and validation.',
    },
    {
      id: 'print-3',
      title: 'Complex Engineering Parts',
      category: 'engineering',
      tag: 'ENGINEERING',
      application: 'ENGINEERING PROTOTYPES',
      image: '/images/pratham3-work/03-complex-engineering-parts.jpg',
      notes: 'High dimensional accuracy for engineering prototypes and industrial applications.',
    },
    {
      id: 'print-4',
      title: 'Product Prototypes',
      category: 'prototypes',
      tag: 'PROTOTYPES',
      application: 'PROTOTYPE DEVELOPMENT',
      image: '/images/pratham3-work/04-product-prototypes.jpg',
      notes: 'Design validation models with excellent strength and surface finish.',
    },
    {
      id: 'print-5',
      title: 'Flexible TPU Components',
      category: 'flexible',
      tag: 'FLEXIBLE TPU',
      application: 'FLEXIBLE MATERIALS',
      image: '/images/pratham3-work/05-flexible-tpu-components.jpg',
      notes: 'Durable, impact-resistant and flexible parts for real-world applications.',
    },
    {
      id: 'print-6',
      title: 'Functional End-Use Parts',
      category: 'functional',
      tag: 'FUNCTIONAL',
      application: 'END-USE APPLICATIONS',
      image: '/images/pratham3-work/06-functional-end-use-parts.jpg',
      notes: 'Enclosures, jigs, fixtures and end-use tools with high strength and durability.',
    },
    {
      id: 'print-7',
      title: 'Jigs, Fixtures & Industrial Tools',
      category: 'industrial',
      tag: 'INDUSTRIAL TOOLS',
      application: 'PRODUCTION TOOLING',
      image: '/images/pratham3-work/07-jigs-fixtures-industrial-tools.jpg',
      notes: 'Custom tooling for faster and cost-effective manufacturing workflows.',
    },
    {
      id: 'print-8',
      title: 'Impact Guards & Robot Bumpers',
      category: 'agv',
      tag: 'AGV / ROBOTICS',
      application: 'AGV & ROBOTICS',
      image: '/images/pratham3-work/08-impact-guards-robot-bumpers.jpg',
      notes: 'Lightweight, high-strength components for AGV and robotics applications.',
    },
  ]

  const filteredGallery =
    activeGalleryCat === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeGalleryCat)

  // Related Pratham Printers (Section 24)
  const prathamSeries = [
    {
      name: 'Pratham Mini',
      vol: '170 × 170 × 170 mm',
      tag: 'Classroom & Lab',
      desc: 'Compact industrial 3D printer ideal for small prototypes, labs, and educational use.',
      link: '/products/pratham-mini',
      img: '/images/products/pratham-mini.png',
    },
    {
      name: 'Pratham Desktop',
      vol: '200 × 200 × 250 mm',
      tag: 'Studio Series',
      desc: 'Reliable entry-level FDM 3D printer designed for institutes, startups, and R&D applications.',
      link: '/products/pratham-desktop',
      img: '/images/products/pratham-desktop.png',
    },
    {
      name: 'Pratham 3 Rapid',
      vol: '350 × 350 × 350 mm',
      tag: '500 mm/s CoreXY',
      desc: 'High-speed industrial FDM 3D printer built for rapid prototyping and production efficiency.',
      link: '/products/pratham-3-rapid',
      img: '/images/products/pratham-3-rapid.png',
    },
    {
      name: 'Pratham 3.0',
      vol: '300 × 300 × 300 mm',
      tag: 'Mid-Size Workhorse',
      desc: 'Industrial-grade 3D printer for engineering prototypes and functional parts.',
      active: true,
      img: '/images/products/pratham-3-0.png',
    },
    {
      name: 'Pratham 5.0',
      vol: '500 × 500 × 500 mm',
      tag: 'Heated Chamber FDM',
      desc: 'Large-format FDM 3D printer for heavy-duty industrial applications.',
      link: '/products/pratham-5',
      img: '/images/products/pratham-5-0.png',
    },
    {
      name: 'Pratham 6.0',
      vol: '600 × 600 × 600 mm',
      tag: 'Large Format Industrial',
      desc: 'Advanced large-scale 3D printer engineered for oversized industrial components.',
      link: '/products/pratham-6',
      img: '/images/products/pratham-6-0.png',
    },
    {
      name: 'Pratham X',
      vol: '1000 × 1000 × 1000 mm',
      tag: '1 m³ Extra Large',
      desc: 'Extra-large industrial additive system for 1-meter single-piece monolithic prints.',
      link: '/products/pratham-x',
      img: '/images/products/pratham-x.png',
    },
  ]

  // FAQs (Section 25)
  const faqItems = [
    {
      q: 'Is Pratham 3.0 suitable for industrial use?',
      a: 'Yes. Pratham 3.0 is engineered with an all-metal MS body, THK linear motion guide rails, and heavy-duty industrial electronics specifically tailored for manufacturing shop floors, production jigs, functional validation, and low-volume production.',
    },
    {
      q: 'What materials can it print?',
      a: 'Pratham 3.0 supports 1.75 mm filaments including PLA, ABS, PETG, TPU (flexible), ASA, PP, HIPS, and Carbon-fused composites, thanks to its 280°C hotend and 120°C high-thermal silicone heated bed.',
    },
    {
      q: 'What is the maximum print size?',
      a: 'The build volume is 300 × 300 × 300 mm (27,000 cm³ cubic workspace), allowing full-scale automotive brackets, functional ducting, and large assemblies to be fabricated in one piece without split joining.',
    },
    {
      q: 'Does it come with after-sales support?',
      a: 'Yes. Leniva CAD Solutions provides complete warranty coverage, remote online diagnostics, genuine spare parts dispatch, and on-site field engineering service across all major industrial clusters.',
    },
    {
      q: 'Is Pratham 3.0 an Indian-made 3D printer?',
      a: 'Yes. Pratham 3.0 is entirely conceptualized, engineered, and manufactured in India, conforming to national industrial manufacturing standards with robust domestic support.',
    },
    {
      q: 'Does Leniva / Make3D provide installation and onboarding?',
      a: 'Yes. Comprehensive installation, machine calibration, first-layer tramming, and operator slicing guidance (covering Simplify3D and Ultimaker Cura) are provided by factory-certified application specialists on-site or via dedicated interactive sessions.',
    },
  ]

  // Supported Materials CMS array
  const supportedMaterials = [
    { name: 'PLA', tag: 'Standard Prototyping', link: '/products/materials' },
    { name: 'ABS', tag: 'High Impact & Temp', link: '/products/materials' },
    { name: 'PETG', tag: 'Chemical & Weather Resistant', link: '/products/materials' },
    { name: 'TPU (95A)', tag: 'Flexible & Vibration Damping', link: '/products/materials' },
    { name: 'ASA', tag: 'UV Stable Outdoor Parts', link: '/products/materials' },
    { name: 'PP (Polypropylene)', tag: 'Chemical Containers', link: '/products/materials' },
    { name: 'HIPS', tag: 'Dissolvable Support / Tough', link: '/products/materials' },
    { name: 'Carbon-Fused Composites', tag: 'High Modulus & Lightweight', link: '/products/materials' },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16 selection:bg-red-600 selection:text-white">
      {/* ====================================================
          1. STICKY PRODUCT NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-slate-950 tracking-tight">PRATHAM 3.0</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-bold uppercase tracking-wider">
              300 × 300 × 300 mm
            </span>
          </div>

          {/* Quick jump navigation links */}
          <div className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(engineeredRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Engineered
            </button>
            <button onClick={() => scrollTo(performanceRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Performance
            </button>
            <button onClick={() => scrollTo(smartFeaturesRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Smart Tech
            </button>
            <button onClick={() => scrollTo(industrialRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Industrial
            </button>
            <button onClick={() => scrollTo(keyPointsRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Key Features
            </button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Specs
            </button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Gallery
            </button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/brochures/pratham-3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham 3.0 Industrial 3D Printer Inquiry')}
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
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-2 sm:!mt-3 pt-0 scroll-mt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-3 sm:mb-4">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/fdm-3d-printers" className="hover:text-slate-900 transition-colors">
            FDM 3D Printers
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Pratham 3.0</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>PRATHAM 3.0 • INDUSTRIAL FDM</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                India’s Reliable Mid-Size Industrial FDM 3D Printer
              </h1>
              <p className="text-lg sm:text-xl font-bold text-red-600">
                Powerful. Precise. Made in India.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                High-Performance Industrial 3D Printer Built for Engineering Prototyping &amp; Production Manufacturing.
                Engineered with an all-metal chassis, enclosed chamber, and precision linear guides for uninterrupted
                industrial duty cycles.
              </p>
            </div>

            {/* Prominent Build Volume Highlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Build Volume
                </span>
                <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
                  300 × 300 × 300 mm
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Chamber Enclosure
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Fully Enclosed Thermal Body
                </span>
              </div>
            </div>

            {/* 4 Core Product Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { label: 'INDUSTRIAL FRAME', icon: ShieldCheck },
                { label: 'ENCLOSED CHAMBER', icon: Box },
                { label: 'TOUCHSCREEN CONTROL', icon: Monitor },
                { label: 'HIGH-SPEED PRECISION', icon: Zap },
              ].map((badge, idx) => {
                const Icon = badge.icon
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/70 text-center space-y-1 hover:border-red-400 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-red-600 mx-auto" />
                    <span className="text-[10px] font-mono font-bold text-slate-800 block uppercase leading-tight">
                      {badge.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/brochures/pratham-3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>GET PRODUCT BROCHURE</span>
              </a>

              <button
                onClick={() => openQuoteModal('Pratham 3.0 Hero Quick Quote')}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                GET QUOTE
              </button>
            </div>
          </div>

          {/* Hero Right Visual: Large Dominant Realistic Pratham 3.0 */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-slate-50 bg-gradient-to-b from-slate-100/90 to-white p-6 sm:p-10 border border-slate-200/90 shadow-xl overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
              {/* Engineering Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Dimensional Callout Lines */}
              <div className="absolute top-6 left-6 flex items-center space-x-1.5 text-[10px] font-mono font-bold text-slate-500 bg-white/90 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                <span>X: 300 MM</span>
                <span className="text-slate-300">|</span>
                <span>Y: 300 MM</span>
                <span className="text-slate-300">|</span>
                <span>Z: 300 MM</span>
              </div>

              <div className="absolute top-6 right-6 flex items-center space-x-1 text-[10px] font-mono font-bold text-red-600 bg-red-50/90 px-2.5 py-1 rounded-md border border-red-200 shadow-2xs">
                <span>MADE IN INDIA</span>
              </div>

              {/* Technical Badges Outside the Machine */}
              <div className="absolute bottom-6 left-6 hidden sm:flex items-center space-x-2 text-[10px] font-mono font-semibold text-slate-600">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">FDM</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">INDUSTRIAL</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">ENCLOSED</span>
              </div>

              <div className="absolute bottom-6 right-6 hidden sm:flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                <span>THK GUIDE RAILS</span>
              </div>

              {/* Main Machine Product Image */}
              <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center transition-transform duration-700 hover:scale-[1.03]">
                <img
                  src="/images/products/pratham-3-0.png"
                  alt="Pratham 3.0 Industrial FDM 3D Printer - 300 x 300 x 300 mm"
                  className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                  loading="eager"
                />
              </div>

              {/* Machine Realistic Floor Shadow */}
              <div className="w-3/4 h-5 bg-slate-900/15 rounded-full blur-md -mt-3" />
            </div>

            {/* Thumbnail switcher */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {productGalleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    activeImageIndex === i
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. ENGINEERED FOR INDUSTRIAL PRECISION & RELIABILITY
         ==================================================== */}
      <section ref={engineeredRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Industrial Architecture —
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            ENGINEERED FOR INDUSTRIAL PRECISION &amp; RELIABILITY
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pratham 3.0 is designed for professionals who demand consistent performance, dimensional accuracy,
            and industrial-grade durability. Built around an enclosed metal body, stable linear motion system,
            and optimized extrusion control for high-wear functional manufacturing environments.
          </p>
        </div>

        {/* 5 Application Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {applications.map((app, idx) => {
            const Icon = app.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-400 transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-600">0{idx + 1}</span>
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-tight leading-snug">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{app.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                  Ready-to-print application
                </div>
              </div>
            )
          })}
        </div>

        {/* Section CTAs */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => openQuoteModal('Pratham 3.0 Engineered Precision Quote')}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            GET QUOTE
          </button>
          <a
            href="/brochures/pratham-3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs font-bold transition-colors flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>DOWNLOAD BROCHURE</span>
          </a>
        </div>
      </section>

      {/* ====================================================
          4. HIGH-PERFORMANCE PRINTING CAPABILITIES
         ==================================================== */}
      <section ref={performanceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
              — Operational Advantage —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              HIGH-PERFORMANCE PRINTING CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-300">
              DESIGNED FOR SPEED, ACCURACY &amp; STRENGTH
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pratham 3.0 combines mechanical stability with smart control systems. With optimized motion control
              and strong frame rigidity, the printer minimizes vibration and ensures consistent layer deposition.
            </p>
          </div>

          {/* 5 Performance Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {performanceBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 flex items-center justify-center text-xs font-mono font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-red-400 font-bold block">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. POWER FAILURE PROTECTION + AUTO BED LEVEL + FILAMENT SENSOR + SILICONE HEATED BED
         ==================================================== */}
      <section ref={smartFeaturesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Industrial Smart Automation —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Fail-Safe &amp; Automation Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Intelligent sensors protect your long-duration production runs from accidental interruptions and thermal drift.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Section 8: POWER FAILURE PROTECTION */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">SMART SYSTEM 01</span>
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">
                POWER FAILURE PROTECTION
              </h3>
              <p className="text-xs font-bold text-red-600">
                DON&apos;T LOSE YOUR PRINT AGAINST SUDDEN POWER CUTS.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                The printer can resume printing from the exact coordinate where the print was paused after power
                restoration, preserving critical hours and valuable material.
              </p>
            </div>

            {/* Workflow Progress Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>PRINTING</span>
                <span>AUTO-RESUME</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-3/4 animate-pulse" />
              </div>
              <div className="text-[10px] text-emerald-400 text-center pt-1 font-semibold">
                PRINTING → INTERRUPTION → AUTO RESUME
              </div>
            </div>
          </div>

          {/* Section 9: AUTOMATIC BED LEVELING */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">SMART SYSTEM 02</span>
                <Compass className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">AUTO BED LEVEL</h3>
              <p className="text-xs font-bold text-blue-600">9-POINT MAGNETIC TOUCH SENSOR</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pratham 3.0 includes a fully automatic bed-leveling system. The high-precision inductive sensor
                scans 9 matrix points across the build plate to calculate micro-tilt and guarantee first-layer adhesion.
              </p>
            </div>

            {/* 3x3 Grid Visual */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
              <div className="grid grid-cols-3 gap-3 w-28 mx-auto py-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pt) => (
                  <div
                    key={pt}
                    className="w-3.5 h-3.5 rounded-full bg-blue-600/90 shadow-xs flex items-center justify-center text-[8px] text-white font-mono animate-pulse"
                    style={{ animationDelay: `${pt * 150}ms` }}
                  />
                ))}
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-700">
                AUTOMATIC FIRST-LAYER CALIBRATION
              </div>
            </div>
          </div>

          {/* Section 10: FILAMENT SENSOR */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">SMART SYSTEM 03</span>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">FILAMENT SENSOR</h3>
              <p className="text-xs font-bold text-orange-600">RUN-OUT DETECTION &amp; PAUSE</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                The optical filament sensor continuously monitors spool feed. If filament runs out or breaks,
                the head parks automatically away from the print, sounds an alert, and waits for a reload.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-center space-x-1.5 text-slate-600">
                <span className="text-emerald-600 font-bold">FEED OK</span>
                <span>➔</span>
                <span className="text-amber-600 font-bold">RUN-OUT</span>
                <span>➔</span>
                <span className="text-blue-600 font-bold">PARK &amp; RELOAD</span>
              </div>
              <div className="text-[9px] text-slate-400">Protects multi-kilogram spools &amp; long jobs</div>
            </div>
          </div>

          {/* Section 11: SILICONE HEATED BED */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">SMART SYSTEM 04</span>
                <Flame className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-base font-black text-slate-950 uppercase tracking-tight">SILICONE HEATED BED</h3>
              <p className="text-xs font-bold text-red-600">120°C IN ~30 SECONDS</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                The high-wattage silicone heated bed reaches 120°C in approximately 30 seconds, maintaining uniform
                thermal distribution for warp-prone polymers like ABS, HIPS, PETG, and composites.
              </p>
            </div>

            {/* Thermal Visualizer */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center font-mono space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">0°C</span>
                <span className="text-red-400 font-bold">⚡ ~30 SEC HEAT-UP</span>
                <span className="text-red-500 font-bold">120°C</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 via-amber-500 to-red-500 h-full w-full" />
              </div>
              <div className="text-[10px] text-slate-400">ABS • HIPS • PETG • Composites Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INDUSTRIAL GRADE 3D PRINTER (3 MAJOR FEATURE BLOCKS)
         ==================================================== */}
      <section ref={industrialRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Made in India Manufacturing —
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            INDUSTRIAL GRADE 3D PRINTER
            <span className="block text-red-600">READY TO BE YOUR PARTNER</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered to handle grueling shop floor workloads with uninterrupted 24/7 reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* BLOCK 01: INDUSTRIAL GRADE */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-red-600">BLOCK 01</span>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">INDUSTRIAL GRADE</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pratham 3.0 provides the genuine look, feel, and mechanical rigidity of an industrial-grade machine.
                Proudly designed, machined, and manufactured in India with aerospace-grade sheet metal construction
                and precision linear components.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <img
                src="/images/products/pratham-3-0.png"
                alt="Industrial Grade Pratham 3.0"
                className="w-40 h-40 object-contain mx-auto"
                loading="lazy"
              />
              <span className="text-[11px] font-mono font-bold text-slate-700 block mt-2">
                All-Metal Rigid Chassis
              </span>
            </div>
          </div>

          {/* BLOCK 02: BIGGER BED SIZE */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-red-600">BLOCK 02</span>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">BIGGER BED SIZE</h3>
              <div className="text-2xl font-black font-mono text-slate-950">300 × 300 × 300 mm</div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Create larger monolithic prototypes without splitting or glued seams, while maintaining sharp
                tolerances and structural integrity from base to top layer.
              </p>
            </div>

            {/* 157 Hours Continuous Print Test Callout */}
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl space-y-2 text-center">
              <div className="text-3xl font-black font-mono text-red-600">157 HOURS</div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                CONTINUOUS PRINT TEST VALIDATION
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Stress-tested under rigorous factory conditions in a continuous 157-hour print test with zero thermal
                derating or step loss.
              </p>
            </div>
          </div>

          {/* BLOCK 03: HEAVY DUTY FDM 3D PRINTER */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-red-600">BLOCK 03</span>
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                HEAVY DUTY FDM 3D PRINTER
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Equipped with heavy-duty mechanical drive systems, THK linear motion guides, and industrial power
                management designed for long-run factory applications and continuous batch prototyping.
              </p>
            </div>

            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">XY Gantry:</span>
                <span className="font-bold text-emerald-400">THK Linear Motion</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">X-Y Precision:</span>
                <span className="font-bold text-emerald-400">11 Microns</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Z Precision:</span>
                <span className="font-bold text-emerald-400">10 Microns</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Machine Weight:</span>
                <span className="font-bold text-white">55 kg Solid Frame</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. KEY POINTS SECTION (6 LARGE PANELS)
         ==================================================== */}
      <section ref={keyPointsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Core Technical Points —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            KEY POINTS OF PRATHAM 3.0 3D PRINTER
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Engineered for industrial-grade performance and precision, Pratham 3.0 is designed for engineering labs,
            manufacturing units, product development teams, and production environments requiring reliable large-format
            3D printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 01: High-Speed Industrial Printing */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 01</span>
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">High-Speed Industrial Printing</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Up to 120 mm/s</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Achieve stable and consistent prints at speeds up to 120 mm/s, optimized for faster prototyping and
                small-batch production without compromising dimensional tolerance.
              </p>
            </div>

            {/* Interactive Speed Gauge */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 font-mono text-center">
              <div className="text-3xl font-black text-amber-400">{speedGauge} mm/s</div>
              <div className="text-[10px] text-slate-400">Continuous Dynamic Velocity</div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                {[40, 60, 80, 100, 120].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedGauge(spd)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      speedGauge === spd ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 02: Advanced Connectivity Options */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 02</span>
                <Wifi className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Advanced Connectivity Options</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Wi-Fi • USB • SD Card</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless file transfer and remote workflow management with intuitive touchscreen controls. Wi-Fi
                supported/available according to machine configuration.
              </p>
            </div>

            {/* Connectivity Flow Diagram */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col items-center justify-center space-y-2 text-center text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800">
                  CAD PC
                </span>
                <span>➔</span>
                <span className="px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800">
                  WI-FI / USB / SD
                </span>
              </div>
              <div className="text-[10px] text-slate-400">↓ Direct Execution</div>
              <div className="px-3 py-1 bg-slate-900 text-emerald-400 rounded-lg font-bold text-[11px]">
                PRATHAM 3.0 TOUCH CONTROLLER
              </div>
            </div>
          </div>

          {/* Feature 03: Precision Layer Resolution */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 03</span>
                <Layers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Precision Layer Resolution</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">80 – 600 Microns</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adjustable layer heights from razor-sharp 80-micron visual master models up to high-speed 600-micron
                deposition for bulk tooling cores and rapid draft parts.
              </p>
            </div>

            {/* Layer Visual Slider */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-500">Slice Resolution:</span>
                <span className="text-blue-600 text-sm">{layerSlider} μm</span>
              </div>
              <input
                type="range"
                min="80"
                max="600"
                step="20"
                value={layerSlider}
                onChange={(e) => setLayerSlider(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>80 μm (Fine Detail)</span>
                <span>600 μm (Draft Rapid)</span>
              </div>
            </div>
          </div>

          {/* Feature 04: Optimized Build Volume */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 04</span>
                <Box className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Optimized Build Volume</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">300 × 300 × 300 mm</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generous 27-liter enclosed build envelope designed to accommodate 90% of industrial fixtures,
                automotive ducting, and multiple concurrent batch parts.
              </p>
            </div>

            {/* 3D Measurement Cube */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 text-center space-y-1 font-mono">
              <div className="text-2xl font-black text-white">X: 300 × Y: 300 × Z: 300 mm</div>
              <div className="text-[10px] text-emerald-400 font-semibold">27,000 cm³ Enclosed Cubic Space</div>
              <div className="text-[10px] text-slate-400 pt-1">Dimensional accuracy ±0.1 mm repeatable</div>
            </div>
          </div>

          {/* Feature 05: Wide File Compatibility */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 05</span>
                <Cpu className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">Wide File Compatibility</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">STL • OBJ • GCODE</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless pipeline from SolidWorks, Autodesk Fusion, or NX into Simplify3D or Ultimaker Cura, producing
                verified machine-ready GCODE.
              </p>
            </div>

            {/* Data Flow Diagram */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-center font-mono text-[10px] space-y-1">
              <div className="font-bold text-slate-700">CAD MODEL (SolidWorks / Fusion / NX)</div>
              <div>↓</div>
              <div className="flex justify-center space-x-2 font-bold text-red-600">
                <span className="px-2 py-0.5 bg-red-50 rounded">.STL</span>
                <span className="px-2 py-0.5 bg-red-50 rounded">.OBJ</span>
                <span className="px-2 py-0.5 bg-red-50 rounded">.GCODE</span>
              </div>
              <div>↓</div>
              <div className="font-bold text-emerald-700">SIMPLIFY3D / CURA ➔ PRATHAM 3.0</div>
            </div>
          </div>

          {/* Feature 06: 1.75 mm Filament Support */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">Feature 06</span>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-950">1.75 mm Filament Support</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Broad Thermoplastic Compatibility</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct-drive extrusion handles both flexible elastomers and abrasive composites with precision tension
                adjustment and continuous feeding.
              </p>
            </div>

            {/* Material Chips */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono font-bold text-slate-500">Supported Materials:</div>
              <div className="flex flex-wrap gap-1.5">
                {supportedMaterials.map((mat, i) => (
                  <Link
                    key={i}
                    to={mat.link}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-red-50 hover:text-red-700 border border-slate-200 text-[11px] font-bold transition-colors"
                  >
                    {mat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          8. DEDICATED TECHNICAL SPECIFICATIONS (WITH TABS)
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Engineering Data Sheet —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Pratham 3.0 Technical Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Validated industrial hardware and electrical ratings derived from certified factory bench tests and official
            specification data.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex justify-center border-b border-slate-200 pb-px space-x-2 sm:space-x-8">
          {[
            { id: 'print', label: 'PRINT PERFORMANCE' },
            { id: 'motion', label: 'MOTION & KINEMATICS' },
            { id: 'hardware', label: 'HARDWARE & CHASSIS' },
            { id: 'software', label: 'SOFTWARE & CONNECTIVITY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSpecTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeSpecTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {activeSpecTab === 'print' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Extrusion &amp; Thermal System
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Print Technology</span>
                    <span className="font-mono text-slate-950 font-bold">Fused Filament Fabrication (FFF / FDM)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Build Volume</span>
                    <span className="font-mono text-slate-950 font-bold">300 × 300 × 300 mm (27 L)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Max Extruder Temp</span>
                    <span className="font-mono text-slate-950 font-bold">280°C (Single Extruder)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Print Bed Temp</span>
                    <span className="font-mono text-slate-950 font-bold">120°C (Silicone Fast-Heat Bed)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Standard Nozzle</span>
                    <span className="font-mono text-slate-950 font-bold">0.4 mm standard brass</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Changeable Nozzles</span>
                    <span className="font-mono text-slate-950 font-bold">0.3 / 0.4 / 0.5 / 0.6 / 0.8 mm</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Speed, Precision &amp; Resolution
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Marketing Print Speed</span>
                    <span className="font-mono text-slate-950 font-bold">Up to 120 mm/s</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Brochure Print Speed</span>
                    <span className="font-mono text-slate-950 font-bold">40 – 120 mm/s</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Marketing Resolution</span>
                    <span className="font-mono text-slate-950 font-bold">80 – 600 microns</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Brochure Resolution Steps</span>
                    <span className="font-mono text-slate-950 font-bold">0.08 / 0.1 / 0.2 / 0.3 / 0.4 mm</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Dimensional Tolerance</span>
                    <span className="font-mono text-slate-950 font-bold">±0.1 mm</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Filament Diameter</span>
                    <span className="font-mono text-slate-950 font-bold">1.75 mm standard</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSpecTab === 'motion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Linear Kinematics
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">XY Motion Gantry</span>
                    <span className="font-mono text-slate-950 font-bold">THK Linear Motion Guide Rails</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">X-Y Axis Precision</span>
                    <span className="font-mono text-slate-950 font-bold">11 Microns</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Z Axis Precision</span>
                    <span className="font-mono text-slate-950 font-bold">10 Microns</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Drive Steppers</span>
                    <span className="font-mono text-slate-950 font-bold">High-torque industrial micro-stepping motors</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Calibration &amp; Bed Support
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Bed Leveling</span>
                    <span className="font-mono text-slate-950 font-bold">9-Point Magnetic Touch Sensor</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Build Platform</span>
                    <span className="font-mono text-slate-950 font-bold">Heated Aluminum Tooling Plate</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Z-Axis Stabilization</span>
                    <span className="font-mono text-slate-950 font-bold">Dual Lead Screws with Anti-Backlash Nuts</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSpecTab === 'hardware' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Physical Dimensions
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Frame Construction</span>
                    <span className="font-mono text-slate-950 font-bold">All-metal MS body with industrial powder coat</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Printer Dimensions</span>
                    <span className="font-mono text-slate-950 font-bold">800 L × 630 W × 750 H mm</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Machine Weight</span>
                    <span className="font-mono text-slate-950 font-bold">55 kg</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Shipping Weight</span>
                    <span className="font-mono text-slate-950 font-bold">75 kg with accessories kit</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Power &amp; Electrical
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Operating Voltage</span>
                    <span className="font-mono text-slate-950 font-bold">230V AC, 50Hz single phase</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Max Power Consumption</span>
                    <span className="font-mono text-slate-950 font-bold">550W peak during thermal warm-up</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Interface Display</span>
                    <span className="font-mono text-slate-950 font-bold">Integrated color touchscreen</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Country of Origin</span>
                    <span className="font-mono text-slate-950 font-bold">Designed &amp; Manufactured in India</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSpecTab === 'software' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Operating System &amp; Slicing
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Recommended Software</span>
                    <span className="font-mono text-slate-950 font-bold">Simplify3D licensed software / Ultimaker Cura</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Supported OS</span>
                    <span className="font-mono text-slate-950 font-bold">Windows 10 / 11, macOS, Linux</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Input 3D Formats</span>
                    <span className="font-mono text-slate-950 font-bold">.STL, .OBJ, .3MF</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Machine Code</span>
                    <span className="font-mono text-slate-950 font-bold">.GCODE</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                  Connectivity &amp; Workflow
                </h4>
                <div className="space-y-3 divide-y divide-slate-100 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Standard Offline Transfer</span>
                    <span className="font-mono text-slate-950 font-bold">USB Flash Drive + SD Card</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Network Interface</span>
                    <span className="font-mono text-slate-950 font-bold">Wi-Fi (optional add-on configuration)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-slate-600">Smart Features</span>
                    <span className="font-mono text-slate-950 font-bold">Power resume + Optical filament run-out sensor</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>



      {/* ====================================================
          10. WORK FROM PRATHAM 3.0 (REAL PRINT GALLERY)
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — Verified Print Samples —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              WORK FROM PRATHAM 3.0 3D PRINTER
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Real functional parts, automotive scale mockups, impact guards, and production tooling fabricated
              by Pratham 3.0 users across India.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Parts' },
              { id: 'automotive', label: 'Automotive' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'prototypes', label: 'Prototypes' },
              { id: 'flexible', label: 'Flexible TPU' },
              { id: 'functional', label: 'Functional' },
              { id: 'industrial', label: 'Industrial Tools' },
              { id: 'agv', label: 'AGV / Robotics' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeGalleryCat === cat.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid - 2 rows x 4 cols on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-3">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm">
                    {item.tag}
                  </div>
                </div>

                <div className="space-y-1.5 px-1 pb-1">
                  <span className="text-[10px] font-mono font-bold text-red-600 uppercase block tracking-wider">
                    {item.application}
                  </span>
                  <h3 className="text-sm font-black text-slate-950 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">{item.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          12. SUPPORT / TRUST SECTION (3 CARDS)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">ENGINEERING-GRADE RELIABILITY</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Built with precision CNC aluminum frame, linear motion guides, and industrial-grade electronics
              engineered for continuous 24/7 manufacturing cycles.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">DEDICATED SERVICE &amp; SUPPORT</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              24×7 remote and on-site engineering support with direct spare parts distribution hubs in major industrial
              corridors for minimum machine downtime.
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950 uppercase tracking-tight">
              HAPPY USERS FROM EVERY SEGMENT
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Serving industrial engineers, jewellery manufacturers, tooling pattern shops, premier educational institutes,
              and defense research establishments.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================
          13. RELATED PRODUCTS / EXPLORE OTHER PRATHAM MODELS
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — FDM Ecosystem —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              EXPLORE OTHER MODELS OF 3D PRINTERS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Made-in-India FDM 3D printers designed to scale from rapid prototyping to full-size manufacturing across
              industries.
            </p>
          </div>
          <Link to="/products" className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1">
            <span>View All 3D Printers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {prathamSeries.map((p, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all text-xs flex flex-col justify-between space-y-4 ${
                p.active
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-red-500'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase block">{p.tag}</span>
                  <span className="text-[10px] font-mono text-slate-400">{p.vol}</span>
                </div>
                <div className="aspect-16/10 rounded-xl bg-slate-100/50 p-2 flex items-center justify-center overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-28 object-contain" loading="lazy" />
                </div>
                <h3 className="font-black text-base">{p.name}</h3>
                <p className={`text-xs leading-relaxed ${p.active ? 'text-slate-300' : 'text-slate-500'}`}>{p.desc}</p>
              </div>

              {p.link ? (
                <Link
                  to={p.link}
                  className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-red-600 hover:text-red-600 font-bold text-center text-xs block transition-all"
                >
                  EXPLORE MORE →
                </Link>
              ) : (
                <span className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-center text-xs block">
                  CURRENT MODEL
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          14. FREQUENTLY ASKED QUESTIONS (FAQS)
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            — Technical Clarifications —
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            FREQUENTLY ASKED QUESTIONS (FAQs)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Answers to common questions regarding Pratham 3.0 material support, build volume, and warranty coverage.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-950 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          15. FINAL CONVERSION SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Engineering grid accent */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider rounded-md border border-red-500/30">
              Transform Your Manufacturing
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              START YOUR 3D PRINTING JOURNEY WITH US
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect with our application engineers for printers, material selection, custom fixtures, or industrial
              turnkey manufacturing solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={() => openQuoteModal('Pratham 3.0 Final Purchase Quote')}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2 text-center"
            >
              <span>CONTACT US</span>
            </Link>

            <a
              href="/brochures/pratham-3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2 text-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD BROCHURE</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Pratham3Page
