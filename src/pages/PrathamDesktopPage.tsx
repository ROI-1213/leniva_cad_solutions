import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  FileText,
  Sparkles,
  Box,
  Layers,
  Zap,
  ShieldCheck,
  ChevronDown,
  Monitor,
  HardDrive,
  Usb,
  Compass,
  Flame,
  MapPin,
  Wifi,
  CheckCircle,
  PhoneCall,
  Activity,
  ExternalLink,
  Lightbulb,
  Cog,
  GraduationCap,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const PrathamDesktopPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'print' | 'motion' | 'hardware' | 'software'>('print')
  const [speedPreset, setSpeedPreset] = useState<number>(120)
  const [layerSlider, setLayerSlider] = useState<number>(150) // 80 to 400 microns
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const seriesRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Inject SEO Structured Data (Product + FAQ + Breadcrumbs)
  useEffect(() => {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham Desktop 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-desktop.png',
      description:
        'Pratham Desktop is an industrial-grade entry-level FDM 3D printer designed and manufactured in India with 200 × 200 × 250 mm build volume, enclosed chamber, and touch screen control.',
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
          name: 'Is Pratham Desktop Made in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, it is designed and manufactured in India with domestic industrial engineering and local support.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this printer suitable for educational institutes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It is designed specifically for schools, colleges, learning centers, and engineering design labs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What materials can it print?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PLA, ABS, PETG, TPU, and other standard 1.75 mm thermoplastics.',
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
      document.head.removeChild(scriptProduct)
      document.head.removeChild(scriptFaq)
    }
  }, [])

  // Material Details mapping
  const materialsInfo: Record<
    string,
    { title: string; bedTemp: string; nozzleTemp: string; desc: string; link: string }
  > = {
    PLA: {
      title: 'Polylactic Acid (PLA)',
      bedTemp: '50 – 60 °C',
      nozzleTemp: '190 – 220 °C',
      desc: 'Eco-friendly biodegradable thermoplastic with minimal shrinkage, crisp edge fidelity, and vibrant color output. Ideal for classroom models and concept verification.',
      link: '/materials?family=pla',
    },
    ABS: {
      title: 'Acrylonitrile Butadiene Styrene (ABS)',
      bedTemp: '90 – 110 °C',
      nozzleTemp: '230 – 260 °C',
      desc: 'High impact resistance and elevated heat deflection. Benefits directly from Pratham Desktop enclosed thermal chamber to prevent layer warping and delamination.',
      link: '/materials?family=abs',
    },
    PETG: {
      title: 'Polyethylene Terephthalate Glycol (PETG)',
      bedTemp: '70 – 85 °C',
      nozzleTemp: '220 – 250 °C',
      desc: 'Combines the ease of PLA with the chemical resistance and mechanical toughness of ABS. Excellent for functional mechanical housings, water-resistant enclosures, and clips.',
      link: '/materials?family=petg',
    },
    TPU: {
      title: 'Thermoplastic Polyurethane (TPU Flexible)',
      bedTemp: '40 – 60 °C',
      nozzleTemp: '210 – 230 °C',
      desc: 'Rubber-like elastomeric flexibility with high abrasion resistance. Perfect for gaskets, seals, vibration dampeners, and ergonomic grips.',
      link: '/materials?family=tpu',
    },
  }

  // Work Gallery Items (Real Parts, Real Dimensions)
  const galleryItems = [
    {
      title: 'Functional Prototypes',
      description: 'Turn your ideas into real, functional prototypes with accurate dimensions and strong mechanical performance.',
      image: '/images/desktop-work/functional-prototypes-hd.jpg',
      icon: Lightbulb,
      iconBg: 'bg-[#1e40af]',
    },
    {
      title: 'End-Use Components',
      description: 'Produce durable, production-grade parts suitable for real-world applications.',
      image: '/images/desktop-work/end-use-components-hd.jpg',
      icon: Cog,
      iconBg: 'bg-[#dc2626]',
    },
    {
      title: 'Educational Models',
      description: 'Create detailed and engaging models for STEM education, research and onboarding.',
      image: '/images/desktop-work/educational-models-hd.jpg',
      icon: GraduationCap,
      iconBg: 'bg-[#0d9488]',
    },
    {
      title: 'Custom & Complex Designs',
      description: 'Bring intricate geometries and customized designs to life with high precision and smooth surface finishes.',
      image: '/images/desktop-work/custom-complex-designs-hd.jpg',
      icon: Box,
      iconBg: 'bg-[#6b21a8]',
    },
  ]

  // FAQ Items
  const faqItems = [
    {
      q: 'Is Pratham Desktop Made in India?',
      a: 'Yes, it is designed, engineered, and manufactured in India. Every sub-assembly—from the heavy-duty metal chassis and precision motion guideways to the electronic firmware tuning—is crafted to deliver dependable performance in Indian operating environments.',
    },
    {
      q: 'Is this printer suitable for educational institutes?',
      a: 'Yes. It is designed specifically for schools, colleges, engineering universities, and Atal Tinkering Labs. The fully enclosed metal chamber ensures safe classroom operation, while the touchscreen interface and semi-automatic bed leveling allow students and teachers to print without steep learning curves.',
    },
    {
      q: 'What materials can it print?',
      a: 'Pratham Desktop supports standard 1.75 mm filaments including PLA, ABS, PETG, TPU (flexible), and other technical thermoplastics. With a 280°C hotend and a 120°C aluminum heated bed, it easily manages thermal-sensitive filaments like ABS inside its enclosed chamber.',
    },
    {
      q: 'Does it support power failure resume?',
      a: 'Yes. The printer features built-in power-loss protection. If sudden power disruption occurs, it securely caches print coordinates and nozzle position. Once power is restored, you can resume the print with a single touch, preventing wasted time and filament.',
    },
    {
      q: 'Can Pratham Desktop run continuously for long production cycles?',
      a: 'Yes. Pratham Desktop is engineered for 24×7 industrial reliability. Its rigid all-metal MS body, thermal heat dissipation design, silent stepper drivers, and stable linear shafts allow uninterrupted 72+ hour prints without positional drift or overheating.',
    },
    {
      q: 'Does Make3D / Leniva CAD Solutions provide installation and onboarding?',
      a: 'Yes. We provide complete nationwide support including on-site installation, slicer workflow onboarding (Cura/PrusaSlicer), hands-on operator guidance, and continuous technical support with guaranteed genuine spare parts availability across India.',
    },
  ]

  // Related Pratham Models
  const relatedModels = [
    {
      name: 'Pratham Mini',
      buildVolume: '170 × 170 × 170 mm',
      tagline: 'Compact Power for Precision Prototyping',
      image: '/images/products/pratham-mini.png',
      slug: '/products/pratham-mini',
    },
    {
      name: 'Pratham Desktop',
      buildVolume: '200 × 200 × 250 mm',
      tagline: 'Entry-Level Industrial FDM with Touchscreen',
      image: '/images/products/pratham-desktop.png',
      slug: '/products/pratham-desktop',
      current: true,
    },
    {
      name: 'Pratham 3 Rapid',
      buildVolume: '350 × 350 × 350 mm',
      tagline: 'High-Speed Industrial FDM for Rapid Production',
      image: '/images/products/pratham-3-rapid.png',
      slug: '/products/pratham-3-rapid',
    },
    {
      name: 'Pratham 3.0',
      buildVolume: '300 × 300 × 300 mm',
      tagline: 'Heavy-Duty Workhorse for Engineering Parts',
      image: '/images/products/pratham-3-0.png',
      slug: '/products/pratham-3-0',
    },
    {
      name: 'Pratham 5.0',
      buildVolume: '500 × 500 × 500 mm',
      tagline: 'Large-Format FDM for Heavy Industrial Prototypes',
      image: '/images/products/pratham-5-0.png',
      slug: '/products/pratham-5-0',
    },
    {
      name: 'Pratham 6.0',
      buildVolume: '600 × 600 × 600 mm',
      tagline: 'Extra Large Production FDM 3D Printer',
      image: '/images/products/pratham-6-0.png',
      slug: '/products/pratham-6-0',
    },
    {
      name: 'Pratham X',
      buildVolume: '1000 × 1000 × 1000 mm',
      tagline: 'Ultra-Large Scale Industrial Additive System',
      image: '/images/products/pratham-x.png',
      slug: '/products/pratham-x',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16">
      {/* ====================================================
          1. STICKY PRODUCT NAVIGATION BAR
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-slate-950 tracking-tight">PRATHAM DESKTOP</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-bold uppercase tracking-wider">
              200 × 200 × 250 mm
            </span>
          </div>

          {/* Quick jump navigation links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(introRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Introduction
            </button>
            <button onClick={() => scrollTo(performanceRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Performance
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollTo(galleryRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Gallery
            </button>
            
            <button onClick={() => scrollTo(specsRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              Specs
            </button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-red-600 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/brochures/pratham-desktop.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham Desktop 3D Printer Inquiry')}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          2. CINEMATIC HERO SECTION
         ==================================================== */}
      <section ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 !mt-2 sm:!mt-3 pt-0">
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
          <span className="font-semibold text-slate-900">Pratham Desktop</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Engineering Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono uppercase tracking-wider text-[11px] font-bold">
                  Industrial Desktop Series · FDM Technology
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  PRATHAM DESKTOP <br />
                  <span className="text-red-600">3D PRINTER</span>
                </h1>
                <p className="mt-2 text-lg sm:text-xl font-bold text-slate-800">
                  India’s Most Reliable Entry-Level Industrial FDM 3D Printer
                </p>
                <p className="text-sm font-semibold text-red-600 tracking-wide mt-1">
                  Compact. Powerful. Made in India.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Designed for educational institutes, startups, and product development teams looking for precision and
                reliability. Experience industrial dimensional repeatability, heated enclosed thermal stability, and
                effortless touch screen workflow.
              </p>

              {/* High-Impact Specs Bar */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Build Volume
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    200 × 200 × 250 mm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">10 Liters Chamber</div>
                </div>

                <div className="border-l border-slate-200 pl-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Print Speed
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    Up to 120 mm/s
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Rapid Prototyping</div>
                </div>

                <div className="border-l border-slate-200 pl-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Chamber Type
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                    Fully Enclosed
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ABS / PETG Ready</div>
                </div>
              </div>

              {/* Three Product Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                  <span>INDUSTRIAL FRAME</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                  <Box className="w-3.5 h-3.5 text-red-600" />
                  <span>ENCLOSED CHAMBER</span>
                </span>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
                  <Monitor className="w-3.5 h-3.5 text-red-600" />
                  <span>TOUCH SCREEN CONTROL</span>
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => openQuoteModal('Pratham Desktop 3D Printer Inquiry')}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Quote</span>
                </button>

                <a
                  href="/brochures/pratham-desktop.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-300 transition-colors flex items-center space-x-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            {/* Right Column: Large Realistic Render with Measurement Callouts */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-4">
                {/* Visual coordinate lines */}
                <div className="absolute inset-4 border border-dashed border-slate-200 rounded-2xl pointer-events-none" />

                {/* Floating Technical Measurement Labels */}
                <div className="absolute -top-1 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[10px] font-mono text-slate-600 font-bold z-20">
                  BUILD VOLUME: 200 × 200 × 250 MM
                </div>

                <div className="absolute top-1/3 -right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[10px] font-mono text-slate-600 font-bold z-20 hidden sm:block">
                  ENCLOSED CHAMBER
                </div>

                <div className="absolute -bottom-2 right-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200 shadow-xs text-[10px] font-mono text-slate-600 font-bold z-20">
                  FDM TECHNOLOGY · ±0.1 MM
                </div>

                {/* Printer Render */}
                <div className="relative z-10 w-full h-full flex items-center justify-center group">
                  <img
                    src="/images/products/pratham-desktop.png"
                    alt="Pratham Desktop Industrial FDM 3D Printer"
                    className="max-h-[380px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle realistic ground shadow */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-5 bg-gradient-to-t from-slate-400/40 via-slate-300/10 to-transparent rounded-full blur-md pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. PRODUCT INTRODUCTION: BUILT FOR LEARNING. ENGINEERED FOR PERFORMANCE.
         ==================================================== */}
      <section ref={introRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
          {/* Subtle technical background grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Next-Generation Industrial Desktop</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                BUILT FOR LEARNING. <br className="hidden sm:block" />
                <span className="text-red-500">ENGINEERED FOR PERFORMANCE.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                Pratham Desktop is an industrial-grade entry-level FDM 3D printer designed and manufactured in India.
                It offers the balance of affordability, reliability, and print accuracy, making it suitable for
                educational institutes, labs, design studios, and early-stage manufacturing setups.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                Whether users are teaching 3D printing fundamentals or building functional prototypes, Pratham Desktop
                provides stable performance and consistent print quality with its rigid sheet metal body, precision
                motion guides, and enclosed thermal chamber.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => openQuoteModal('Pratham Desktop 3D Printer Inquiry')}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Get Quote
                </button>
                <a
                  href="/brochures/pratham-desktop.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Brochure</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 backdrop-blur-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Core Architectural Highlights
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">All-Metal MS Body:</strong>
                    22 KG rigid steel construction eliminates frame flex and vibration during rapid moves.
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">120°C Aluminum Heatbed:</strong>
                    Rapid bed heating ensures strong first-layer adhesion and zero bottom-edge curling.
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">280°C High-Temp Hotend:</strong>
                    Engineered for continuous extrusions of PLA, ABS, PETG, and flexible TPU.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. RELIABLE PERFORMANCE SECTION (5 FEATURE CARDS)
         ==================================================== */}
      <section ref={performanceRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Engineering Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            RELIABLE PERFORMANCE FOR DAILY PROTOTYPING
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pratham Desktop is engineered for consistent everyday use. Its rigid frame structure and stable motion system
            provide smooth layer deposition and high dimensional accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition-colors font-mono">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              SMOOTH SURFACE FINISH
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              High-resolution microstepping drivers paired with precision ground guidance rails eliminate surface ringing
              and layer stepping on fine exterior contours.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Resolution:</span>
              <strong className="text-slate-800 font-bold">80 to 400 μm</strong>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition-colors font-mono">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              STRONG LAYER BONDING
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Enclosed thermal environment prevents draft chills and keeps the print chamber at optimal equilibrium for
              maximum inter-layer polymer cohesion and shear strength.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Bed Temp:</span>
              <strong className="text-slate-800 font-bold">Up to 120 °C</strong>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition-colors font-mono">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              STABLE LONG-HOUR PRINTING
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Built with industrial power supply, power-loss auto-resume protection, and runout sensors to execute
              unattended 72-hour continuous production runs reliably.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Duty Cycle:</span>
              <strong className="text-slate-800 font-bold">24×7 Industrial Ready</strong>
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition-colors font-mono">
                04
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              EASY FILAMENT HANDLING
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Optimized feeder path with guided PTFE routing makes spool changes effortless, prevents tangles, and provides
              smooth feeding for both rigid and flexible filaments.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Standard Filament:</span>
              <strong className="text-slate-800 font-bold">1.75 mm Diameter</strong>
            </div>
          </div>

          {/* Card 05 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition-colors font-mono">
                05
              </span>
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Monitor className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
              BEGINNER-FRIENDLY INTERFACE
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Intuitive responsive touch screen interface provides immediate visual status, one-touch temperature
              pre-sets, semi-automatic calibration routines, and real-time print progress statistics. Designed so students
              and engineers can master operations in minutes.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Control:</span>
              <strong className="text-slate-800 font-bold">Integrated Touch Screen Interface</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. KEY FEATURES SECTION (6 MAJOR FEATURE BLOCKS)
         ==================================================== */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Technical Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            KEY FEATURES OF PRATHAM DESKTOP 3D PRINTER
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Engineered for reliability and precision, Pratham Desktop is built to deliver consistent performance for
            educational institutes, startups, design labs, and R&D environments.
          </p>
        </div>

        {/* Feature 01: High-Speed Printing Performance */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 01 · Velocity & Motion
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              HIGH-SPEED PRINTING PERFORMANCE
            </h3>
            <div className="inline-block px-3 py-1 bg-red-50 text-red-700 font-mono text-xs font-bold rounded-lg border border-red-200">
              MAIN SPECIFICATION: UP TO 120 MM/SEC
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Achieve smooth and stable prints at speeds up to 120 mm/s, optimized for fast prototyping and daily
              production needs. High-torque steppers and rigid round-shaft guidance eliminate layer shift even during
              rapid directional jerks.
            </p>

            {/* Interactive Speed Indicator Presets */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-700">Select Print Velocity Preset:</div>
              <div className="flex flex-wrap gap-2">
                {[40, 50, 80, 100, 120].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeedPreset(spd)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      speedPreset === spd
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {spd} MM/SEC
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Velocity Gauge</span>
              <span className="text-red-400 font-bold">{speedPreset} mm/sec</span>
            </div>

            {/* Animated Speed Meter Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(speedPreset / 120) * 100}%` }}
              />
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Acceleration:</span>
                <span className="font-mono text-white">Up to 1,500 mm/s²</span>
              </div>
              <div className="flex justify-between">
                <span>Optimized For:</span>
                <span className="font-mono text-red-400 font-bold">
                  {speedPreset <= 50
                    ? 'Ultra-High Detail & Patterns'
                    : speedPreset <= 100
                    ? 'Standard Engineering Prototypes'
                    : 'Rapid Draft & Volume Iteration'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Layer Smoothness:</span>
                <span className="font-mono text-white">±0.1 mm Dimensional Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 02: Smart Connectivity Options */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 02 · Data Workflow
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              SMART CONNECTIVITY OPTIONS
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Supports USB, SD Card, and optional Wi-Fi connectivity for seamless file transfer and easy operation.
              Print untethered in institutional classrooms or push designs directly from design CAD stations.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
                <Usb className="w-5 h-5 text-red-600 mx-auto" />
                <div className="text-xs font-bold text-slate-800">USB Drive</div>
                <div className="text-[10px] text-slate-500">Plug & Print</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
                <HardDrive className="w-5 h-5 text-red-600 mx-auto" />
                <div className="text-xs font-bold text-slate-800">SD Card</div>
                <div className="text-[10px] text-slate-500">Stand-Alone Mode</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1">
                <Wifi className="w-5 h-5 text-red-600 mx-auto" />
                <div className="text-xs font-bold text-slate-800">Wi-Fi (Optional)</div>
                <div className="text-[10px] text-slate-500">Wireless Dispatch</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 text-center space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Connectivity Architecture
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>CAD Slicer Output</span>
                <span className="text-emerald-400">G-Code</span>
              </div>
              <div className="h-4 border-l border-dashed border-slate-600 mx-auto w-0" />
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <span className="p-1.5 bg-slate-800 rounded border border-slate-700">USB 2.0</span>
                <span className="p-1.5 bg-slate-800 rounded border border-slate-700">SD Card</span>
                <span className="p-1.5 bg-slate-800 rounded border border-slate-700">Wi-Fi Addon</span>
              </div>
              <div className="h-4 border-l border-dashed border-slate-600 mx-auto w-0" />
              <div className="p-2 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 font-bold">
                PRATHAM DESKTOP CONTROLLER
              </div>
            </div>
          </div>
        </div>

        {/* Feature 03: Precision Layer Resolution */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 03 · Fine Layer Control
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              PRECISION LAYER RESOLUTION
            </h3>
            <div className="inline-block px-3 py-1 bg-red-50 text-red-700 font-mono text-xs font-bold rounded-lg border border-red-200">
              MAIN SPECIFICATION: 80–400 MICRONS (0.08–0.40 MM)
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Print detailed models with adjustable layer resolution ranging from 80 to 400 microns for fine surface
              finish. Switch dynamically between jewelry-grade smoothness and rapid-deposition draft prototypes.
            </p>

            {/* Interactive Layer Slider */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Interactive Layer Height Slider:</span>
                <span className="font-mono text-red-600 font-bold text-sm">
                  {layerSlider} μm ({Number(layerSlider / 1000).toFixed(2)} mm)
                </span>
              </div>

              <input
                type="range"
                min="80"
                max="400"
                step="10"
                value={layerSlider}
                onChange={(e) => setLayerSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>80 μm (Ultra-Fine)</span>
                <span>200 μm (Standard)</span>
                <span>400 μm (Draft Rapid)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Resolution Visualizer
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Layer Thickness:</span>
                <span className="font-mono text-red-400 font-bold">{layerSlider} Microns</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Surface Finish:</span>
                <span className="font-mono text-white">
                  {layerSlider <= 120
                    ? 'Mirror-smooth, barely visible layer lines'
                    : layerSlider <= 250
                    ? 'Clean mechanical satin finish'
                    : 'Visible rapid draft layers'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Best Application:</span>
                <span className="font-mono text-emerald-400">
                  {layerSlider <= 120
                    ? 'Master casting & visual design'
                    : layerSlider <= 250
                    ? 'Functional jigs & fit checks'
                    : 'Speed concepts & volumetric models'}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-normal">
              Controlled by precision Z-axis leadscrew with 10-micron positional repeatability.
            </div>
          </div>
        </div>

        {/* Feature 04: Optimized Build Volume */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 04 · Spatial Capacity
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              OPTIMIZED BUILD VOLUME
            </h3>
            <div className="inline-block px-3 py-1 bg-red-50 text-red-700 font-mono text-xs font-bold rounded-lg border border-red-200">
              MAIN SPECIFICATION: 200 × 200 × 250 MM
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              A fully enclosed chamber designed for medium-sized functional prototypes and concept models. The vertical
              250 mm height allows tall columnar assemblies, ergonomic handles, and deep automotive ducting to be
              printed in a single piece without splitting.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono font-bold text-slate-500">X AXIS</div>
                <div className="text-lg font-black text-slate-900">200 mm</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono font-bold text-slate-500">Y AXIS</div>
                <div className="text-lg font-black text-slate-900">200 mm</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono font-bold text-slate-500">Z AXIS</div>
                <div className="text-lg font-black text-slate-900">250 mm</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 text-center space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              3D Spatial Enclosure Wireframe
            </div>

            {/* Isometric Chamber Visual */}
            <div className="relative mx-auto w-48 h-48 border-2 border-dashed border-red-500/60 rounded-xl flex items-center justify-center bg-red-950/10">
              <div className="text-center space-y-1">
                <Box className="w-10 h-10 text-red-500 mx-auto animate-pulse" />
                <div className="text-xs font-mono font-bold text-white">10,000 cm³</div>
                <div className="text-[10px] font-mono text-slate-400">Total Enclosed Envelope</div>
              </div>
              <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-400">X: 200 mm →</span>
              <span className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400">Y: 200 mm</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-400">
                ↑ Z: 250 mm
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Fully enclosed with transparent inspection door for clear observation and thermal retention.
            </div>
          </div>
        </div>

        {/* Feature 05: Wide File Compatibility */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 05 · Software & Pipeline
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              WIDE FILE COMPATIBILITY
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Compatible with STL and OBJ files and seamlessly converts 3D CAD models into G-code for an efficient
              printing workflow. Fully compatible with industry-standard slicers including Ultimaker Cura, PrusaSlicer,
              and Simplify3D.
            </p>

            {/* Step Pipeline Flow */}
            <div className="pt-2 grid grid-cols-5 gap-1 items-center text-center font-mono text-[11px]">
              <div className="p-2 bg-slate-100 rounded-lg font-bold text-slate-800">STL / OBJ</div>
              <div className="text-slate-400 font-bold">→</div>
              <div className="p-2 bg-slate-100 rounded-lg font-bold text-slate-800">SLICER</div>
              <div className="text-slate-400 font-bold">→</div>
              <div className="p-2 bg-red-600 text-white rounded-lg font-bold">3D PRINT</div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Supported Environments
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">CAD Export:</span>
                <span className="font-mono text-white">SolidWorks, Fusion360, SketchUp, Blender</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Slicing Software:</span>
                <span className="font-mono text-white">Cura, PrusaSlicer, Simplify3D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operating System:</span>
                <span className="font-mono text-white">Windows 10/11, macOS, Linux</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 06: 1.75 MM Filament Support */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
              Feature 06 · Open Material Ecosystem
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              1.75 MM FILAMENT SUPPORT
            </h3>
            <div className="inline-block px-3 py-1 bg-red-50 text-red-700 font-mono text-xs font-bold rounded-lg border border-red-200">
              MAIN SPECIFICATION: 1.75 MM THERMOPLASTICS
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Supports standard thermoplastic materials such as PLA, ABS, PETG, TPU, and more. Benefit from open-material
              architecture with no proprietary filament chips or DRM locks.
            </p>

            {/* Material Selector Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['PLA', 'ABS', 'PETG', 'TPU'].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedMaterial === mat
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Material Parameters
              </span>
              <Link
                to={materialsInfo[selectedMaterial].link}
                className="text-xs text-red-400 hover:underline flex items-center space-x-1"
              >
                <span>View in Materials Hub</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
              <div className="text-sm font-bold text-white">{materialsInfo[selectedMaterial].title}</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {materialsInfo[selectedMaterial].desc}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Nozzle Temperature:</span>
                  <span className="font-mono text-red-400 font-bold">
                    {materialsInfo[selectedMaterial].nozzleTemp}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Heated Bed:</span>
                  <span className="font-mono text-white font-bold">
                    {materialsInfo[selectedMaterial].bedTemp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. WORK / PRINT SHOWCASE: WORK FROM PRATHAM DESKTOP 3D PRINTER
         ==================================================== */}
      <section ref={galleryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Real Parts, Real Dimensions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            WORK FROM <span className="text-[#1e3a8a]">PRATHAM DESKTOP 3D PRINTER</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Explore what you can create with the Pratham Desktop 3D Printer – from functional prototypes to production-grade components.
          </p>
        </div>

        {/* 4-column cards: icon+title+desc on top, large HD photo below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Top info row */}
                <div className="p-5 flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.description}</p>
                  </div>
                </div>

                {/* Large HD photo filling bottom portion */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          9. TECHNICAL SERVICE & SUPPORT SECTION (3 TRUST CARDS)
         ==================================================== */}
      <section ref={supportRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Service & Reliability
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            COMPREHENSIVE TECHNICAL SERVICE & SUPPORT
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Comprehensive on-ground engineering support and continuous spares availability nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 uppercase">INDUSTRIAL RELIABILITY</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built for continuous prototyping, student labs, and small-batch production with enclosed thermal stability.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 uppercase">DEDICATED TECHNICAL SERVICE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              24×7 remote and onsite support with certified technical engineers and rapid spares dispatch.
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 uppercase">HAPPY USERS FROM EVERY SEGMENT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers across engineering, jewellery manufacturing, educational institutes and government labs.
            </p>
          </div>
        </div>

        {/* Pan-India Map / Network Visual */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
                Direct Engineering Support
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                TECHNICAL SERVICE & SUPPORT NETWORK
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Leniva CAD Solutions provides end-to-end installation, operator onboarding, preventive maintenance, and
                immediate genuine spare parts fulfillment from hubs across India.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-lg font-black text-red-400 font-mono">24–48h</div>
                  <div className="text-[11px] text-slate-300">Onsite Turnaround</div>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-lg font-black text-white font-mono">100%</div>
                  <div className="text-[11px] text-slate-300">Genuine Spares Stocked</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-800/60 rounded-2xl p-6 border border-slate-700 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Key Technical Regional Service Hubs
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Bengaluru</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Mumbai</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Pune</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Delhi-NCR</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Chennai</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Ahmedabad</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Hyderabad</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Kolkata</span>
                </span>
                <span className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center space-x-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Indore</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          10. TECHNICAL SPECIFICATIONS TABLE
         ==================================================== */}
      <section ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Data Sheet
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            TECHNICAL SPECIFICATIONS
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Detailed manufacturer specifications and parameters for the Pratham Desktop 3D Printer.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 space-x-2 sm:space-x-4 overflow-x-auto pb-1">
          {[
            { id: 'print', label: 'PRINT' },
            { id: 'motion', label: 'MOTION & PRECISION' },
            { id: 'hardware', label: 'HARDWARE & BODY' },
            { id: 'software', label: 'SOFTWARE & CONNECTIVITY' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSpecTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeSpecTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          {activeSpecTab === 'print' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Print Technology
                </span>
                <strong className="text-slate-900 text-sm">Fused Deposition Modeling (FDM / FFF)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Build Volume
                </span>
                <strong className="text-slate-900 text-sm">200 × 200 × 250 mm</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Layer Resolution
                </span>
                <strong className="text-slate-900 text-sm">80 to 400 microns (0.08 – 0.40 mm)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Print Velocity
                </span>
                <strong className="text-slate-900 text-sm">Up to 120 mm/sec (Typical: 40–120 mm/s)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Extruder Temp
                </span>
                <strong className="text-slate-900 text-sm">Up to 280 °C (Single Extruder)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Printbed Temp
                </span>
                <strong className="text-slate-900 text-sm">Up to 120 °C (Aluminium Heatbed)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Nozzle Size
                </span>
                <strong className="text-slate-900 text-sm">
                  0.4 mm standard (0.3, 0.4, 0.5, 0.6, 0.8 mm changeable)
                </strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Filament Diameter
                </span>
                <strong className="text-slate-900 text-sm">1.75 mm</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Filament Compatibility
                </span>
                <strong className="text-slate-900 text-sm">PLA, ABS, PETG, Flexible TPU</strong>
              </div>
            </div>
          )}

          {activeSpecTab === 'motion' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  XY Gantry Motion
                </span>
                <strong className="text-slate-900 text-sm">Precision Round Shaft Motion Guides</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Z-Axis Guidance
                </span>
                <strong className="text-slate-900 text-sm">Dual Leadscrew Synchronization</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Position Precision
                </span>
                <strong className="text-slate-900 text-sm">X-Y: 11 Microns, Z: 10 Microns</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Dimensional Accuracy
                </span>
                <strong className="text-slate-900 text-sm">±0.1 mm</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Bed Leveling
                </span>
                <strong className="text-slate-900 text-sm">Semi-Automatic Guided Calibration</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Stepper Drivers
                </span>
                <strong className="text-slate-900 text-sm">Silent High-Torque Microstepping</strong>
              </div>
            </div>
          )}

          {activeSpecTab === 'hardware' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Chassis & Frame
                </span>
                <strong className="text-slate-900 text-sm">All Metal Heavy-Duty MS Body</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Chamber Enclosure
                </span>
                <strong className="text-slate-900 text-sm">
                  Fully Enclosed Chamber with Transparent Door
                </strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Machine Dimensions
                </span>
                <strong className="text-slate-900 text-sm">400 × 400 × 530 mm</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Machine Weight
                </span>
                <strong className="text-slate-900 text-sm">22 KG Net Weight</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Power Requirements
                </span>
                <strong className="text-slate-900 text-sm">230V AC, 50Hz, 120W (Energy Efficient)</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Safety Protections
                </span>
                <strong className="text-slate-900 text-sm">
                  Power Loss Auto-Resume, Filament Runout Sensor
                </strong>
              </div>
            </div>
          )}

          {activeSpecTab === 'software' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Operating Control
                </span>
                <strong className="text-slate-900 text-sm">Interactive Touch Screen Control</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Connectivity
                </span>
                <strong className="text-slate-900 text-sm">USB Drive / SD Card / Optional Wi-Fi</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Supported Slicers
                </span>
                <strong className="text-slate-900 text-sm">Cura, PrusaSlicer, Simplify3D, Ideamaker</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Supported File Formats
                </span>
                <strong className="text-slate-900 text-sm">STL, OBJ, G-code</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Host Operating Systems
                </span>
                <strong className="text-slate-900 text-sm">Windows 10/11, macOS, Linux</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-500 uppercase tracking-wider font-mono text-[10px] block">
                  Origin & Warranty
                </span>
                <strong className="text-slate-900 text-sm">
                  Made in India · 1 Year Comprehensive Warranty
                </strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================
          11. EXPLORE OTHER MODELS OF 3D PRINTERS (PRATHAM SERIES)
         ==================================================== */}
      <section ref={seriesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            FDM Product Family
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            EXPLORE OTHER MODELS OF 3D PRINTERS
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Made-in-India FDM 3D printers designed to scale from rapid prototyping to full-size manufacturing across
            industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedModels.map((model, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                model.current
                  ? 'border-red-500 shadow-md ring-2 ring-red-500/20'
                  : 'border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="relative aspect-square rounded-xl bg-slate-50 p-4 mb-4 flex items-center justify-center">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  {model.current && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-600 text-white text-[9px] font-mono font-bold rounded">
                      Current Page
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm">{model.name}</h3>
                  <div className="text-xs font-mono text-red-600 font-bold">{model.buildVolume}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{model.tagline}</p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100">
                {model.current ? (
                  <span className="block w-full py-2 bg-slate-100 text-slate-500 text-center text-xs font-bold rounded-lg cursor-default">
                    Viewing Now
                  </span>
                ) : (
                  <Link
                    to={model.slug}
                    className="block w-full py-2 bg-slate-900 hover:bg-red-600 text-white text-center text-xs font-bold rounded-lg transition-colors"
                  >
                    Explore More →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          12. FAQ SECTION (ACCORDION)
         ==================================================== */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-red-600 font-bold">
            Support & Clarification
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about Pratham Desktop 3D printer operations, safety, and support.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <span className="text-sm font-bold text-slate-900">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          13. FINAL CONVERSION CTA SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 relative overflow-hidden border border-slate-800 shadow-2xl">
          {/* Subtle animated filament glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Precision Additive Manufacturing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              START YOUR 3D PRINTING JOURNEY
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Connect with our experts for printers, services or custom manufacturing solutions tailored to your
              institution or engineering facility.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-2">
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
            >
              Contact Us
            </Link>

            <button
              onClick={() => openQuoteModal('Pratham Desktop 3D Printer Inquiry')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Request a Quote
            </button>

            <a
              href="/brochures/pratham-desktop.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Brochure</span>
            </a>
          </div>
        </div>
      </section>



      {/* ====================================================
          15. MOBILE STICKY BOTTOM BAR
         ==================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-between space-x-2 shadow-lg">
        <a
          href="/brochures/pratham-desktop.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold text-center flex items-center justify-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Brochure</span>
        </a>
        <button
          onClick={() => openQuoteModal('Pratham Desktop 3D Printer Inquiry')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold text-center shadow-xs cursor-pointer"
        >
          Get Quote
        </button>
      </div>
    </div>
  )
}

export default PrathamDesktopPage
