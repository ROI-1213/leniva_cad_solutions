import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Scan,
  ShieldCheck,
  Zap,
  ArrowRight,
  Phone,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Settings,
  Box,
  Landmark,
  HeartPulse,
  Palette,
  GraduationCap,
  Car,
  Plane,
  Cog,
  Cpu,
  Eye,
  Radio,
  FileCheck,
  Check,
  ChevronDown,
  Compass,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { devokMQData, devokMTData } from '../data/scannersData'

export const ScannersCategoryPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Dynamic SEO Page Title
  useEffect(() => {
    document.title = '3DeVOK 3D Scanners – Professional 3D Scanning Solutions | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Capture ultra-accurate 3D data for inspection, design validation, reverse engineering, and digital transformation with 3DeVOK MQ and 3DeVOK MT 3D scanners in India.'
      )
    }
  }, [])

  // Interactive Hero Preview Mode: 0 = 3DeVOK MT, 1 = 3DeVOK MQ, 2 = In-Hand Live Action, 3 = Sensor Architecture
  const [heroScannerIndex, setHeroScannerIndex] = useState<0 | 1 | 2 | 3>(0)

  // Interactive Comparison Filter Tab
  const [comparisonTab, setComparisonTab] = useState<'all' | 'accuracy' | 'speed' | 'versatility'>('all')

  // Interactive Industry Selector
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0)

  // Interactive Workflow Step
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0)

  // FAQ Accordion Active Item (-1 = none or 0 opened by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Technology Card Active View
  const [activeTechCard, setActiveTechCard] = useState<number>(0)

  // Industry Data
  const industries = [
    {
      name: 'Automotive',
      icon: Car,
      tag: 'BIW & Tooling',
      description:
        'Sheet-metal body-in-white panels, chassis alignment, powertrain cast tooling, and aftermarket reverse engineering with micron repeatability.',
      metric: '0.04 mm Basic Accuracy',
      popularScanner: '3DeVOK MT Industrial',
    },
    {
      name: 'Aerospace',
      icon: Plane,
      tag: 'Turbine & Spars',
      description:
        'High-density surface scanning of turbine blade airfoils, composite wing structures, and aerospace maintenance MRO verification.',
      metric: '0.05 mm Industrial Resolution',
      popularScanner: '3DeVOK MT Industrial',
    },
    {
      name: 'Manufacturing',
      icon: Cog,
      tag: 'Dies & Castings',
      description:
        'Direct 3D inspection of heavy sand castings, injection molds, forged tooling, and CNC machined parts without powder spray.',
      metric: '34 Blue Laser Lines',
      popularScanner: '3DeVOK MT Industrial',
    },
    {
      name: 'Engineering',
      icon: Settings,
      tag: 'Reverse CAD',
      description:
        'Converts worn legacy tooling and discontinued physical parts into parametric, editable STEP/IGES CAD models in hours.',
      metric: 'Watertight Mesh Export',
      popularScanner: '3DeVOK MT & MQ',
    },
    {
      name: 'R&D Labs',
      icon: Cpu,
      tag: 'FEA & Testing',
      description:
        'Captures finite element mesh geometry for structural deformation monitoring, aerodynamic wind-tunnel testing, and material research.',
      metric: 'Up to 4.5M Pts/Sec',
      popularScanner: '3DeVOK MT Industrial',
    },
    {
      name: 'Education',
      icon: GraduationCap,
      tag: 'Academic STEM',
      description:
        'Hands-on optical engineering and CAD learning platform for university engineering departments, robotics labs, and maker centers.',
      metric: 'Marker-Free Tracking',
      popularScanner: '3DeVOK MQ Color',
    },
    {
      name: 'Healthcare',
      icon: HeartPulse,
      tag: 'Orthotics & Dental',
      description:
        'Eye-safe Class 1 infrared capture for customized cranial orthotics, prosthetic limbs, ergonomic rehabilitation braces, and implants.',
      metric: 'Class 1 Eye-Safe',
      popularScanner: '3DeVOK MQ Color',
    },
    {
      name: 'Art & Heritage',
      icon: Landmark,
      tag: 'Museum Twins',
      description:
        'Safely archives centuries-old sculptures, museum antiquities, and architectural monuments with authentic 24-bit photoreal color texture.',
      metric: '24-Bit RGB True Color',
      popularScanner: '3DeVOK MQ Color',
    },
    {
      name: 'Product Design',
      icon: Box,
      tag: 'Rapid Styling',
      description:
        'Accelerates styling loops by rapidly digitizing hand-crafted clay prototypes, ergonomic grips, and consumer electronics enclosures.',
      metric: 'Dual Field of View',
      popularScanner: '3DeVOK MQ Color',
    },
  ]

  // Applications Data with verified imagery & details
  const applications = [
    {
      title: 'Reverse Engineering',
      category: 'Parametric CAD Modeling',
      desc: 'Extract parametric surface profiles, sketch cross-sections, and dimensional CAD models from legacy or un-documented physical components.',
      image: '/images/scanners/scanner-inspection.jpg',
      badge: 'High Accuracy',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    {
      title: 'Quality Inspection',
      category: 'GD&T Deviation Heatmaps',
      desc: 'Perform full 3D part-to-CAD deviation comparisons with automated color deviation maps and certified inspection reports.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: '0.04 mm Accuracy',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/20',
    },
    {
      title: 'Product Design',
      category: 'Ergonomics & Rapid Prototyping',
      desc: 'Rapidly digitize physical clay mockups, packaging designs, and organic ergonomic casings directly into digital CAD workspaces.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      badge: 'Dual FOV',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    {
      title: '3D Printing',
      category: 'Additive Manufacturing',
      desc: 'Generate watertight, clean STL and OBJ polygon meshes tailored for high-speed FDM, SLA, DLP, and binder jet 3D printers.',
      image: '/images/products/pratham-3-0.png',
      badge: 'Watertight Mesh',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/20',
    },
    {
      title: 'Automotive Manufacturing',
      category: 'BIW, Chassis & Powertrain',
      desc: 'Accelerate automotive line tuning, stamping die verification, welding frame continuity, and custom aftermarket engineering.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      badge: 'Industrial Grade',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    {
      title: 'Research & Development',
      category: 'Aerodynamic & Structural FEA',
      desc: 'Produce high-density finite element meshes for computational fluid dynamics (CFD), wear tracking, and stress simulation.',
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
      badge: '4.5M Pts/s',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/20',
    },
    {
      title: 'Cultural Heritage',
      category: 'Museum Archiving & Artifacts',
      desc: 'Safeguard historic relics, ancient sculptures, and museum antiquities using non-contact Class 1 eye-safe infrared structured light.',
      image: '/images/scanners/scanner-color-texture.jpg',
      badge: '24-Bit RGB',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
    {
      title: 'Medical / Human Digitization',
      category: 'Prosthetics & Ergonomic Care',
      desc: 'Comfortable, marker-free human body and limb digitization for custom orthopedic supports, prosthetic sockets, and clinical fittings.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      badge: 'Class 1 Eye-Safe',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/20',
    },
    {
      title: 'Education & Enablement',
      category: 'Engineering Academies',
      desc: 'Equip next-generation engineering students with professional industrial 3D digitization tools for metrology and CAD/CAM research.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      badge: 'Intuitive Workflow',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    },
  ]

  // Workflow steps
  const workflowSteps = [
    {
      num: '01',
      title: 'Capture',
      subtitle: 'Multi-Laser & Structured Light Acquisition',
      desc: 'Illuminate the workpiece using high-density blue laser lines, deep-penetrating infrared lasers, or large-area structured light. Visual indicators guide the operator to maintain optimal working distance with real-time viewport feedback.',
      details: 'Up to 4,500,000 pts/sec • Real-time frame feedback • 34 Blue / 22 IR Laser Arrays',
      techBadge: 'Optical Projection',
    },
    {
      num: '02',
      title: 'Track',
      subtitle: 'Marker-Free Hybrid Coordinate Locking',
      desc: 'Intelligent spatial tracking algorithms instantly lock onto organic geometric contours, natural edge contrast, and surface textures. No target stickers required on feature-rich workpieces, eliminating part preparation downtime.',
      details: 'Hybrid feature tracking • Texture tracking • Class 1 Eye-Safe continuous lock',
      techBadge: 'Coordinate Tracking',
    },
    {
      num: '03',
      title: 'Process',
      subtitle: 'Hardware-Accelerated Point Cloud Calculation',
      desc: 'High-speed GPU computing reconstructs raw spatial coordinate points in real time. Automated noise filtration algorithms reject ambient room illumination, isolate background artifacts, and sharpen perimeter boundaries.',
      details: '0.05 mm Resolution • Automatic outlier isolation • Real-time point decimation',
      techBadge: 'GPU Acceleration',
    },
    {
      num: '04',
      title: 'Refine',
      subtitle: 'Watertight Polygon Mesh & 24-Bit Color Fusion',
      desc: 'Transform raw coordinates into seamless, watertight polygon meshes (STL/OBJ/PLY). Intelligent curvature-based hole filling closes inaccessible crevices, while RGB sensors wrap realistic color texture over the polygon surface.',
      details: 'Watertight mesh synthesis • Automatic hole closure • 24-Bit RGB texture mapping',
      techBadge: 'Mesh Optimization',
    },
    {
      num: '05',
      title: 'Export',
      subtitle: 'Direct CAD & Inspection Interoperability',
      desc: 'Export finalized files directly into industrial reverse engineering and inspection suites including QuickSurface, Geomagic Design X, Geomagic Control X, SOLIDWORKS, SketchUp, and universal STEP/IGES/STL/OBJ formats.',
      details: 'Universal CAD export (STEP, IGES, STL, OBJ) • Direct GD&T inspection report generation',
      techBadge: 'CAD / Metrology Delivery',
    },
  ]

  // FAQs verified from 3DeVOK reference specifications
  const faqs = [
    {
      q: 'What is a 3DeVOK 3D scanner?',
      a: '3DeVOK 3D scanners are professional handheld optical digitization instruments developed for high-precision reverse engineering, quality inspection, product design, and 3D printing. Available in the portable 3DeVOK MQ (full-color infrared structured light & 22-line laser) and the industrial-grade 3DeVOK MT (34 blue laser lines + 22 infrared laser lines + infrared structured light), they deliver micron-level accuracy and dense coordinate data for engineering and industrial manufacturing.',
    },
    {
      q: 'What is the difference between MQ and MT?',
      a: 'The 3DeVOK MQ is an ultra-portable (550 g), wireless-ready color 3D scanner featuring 22 infrared laser lines, VCSEL structured light, and 24-bit photorealistic color capture, perfect for design, 3D printing, cultural heritage, and education. The 3DeVOK MT is an industrial-grade metrology scanner featuring 34 blue laser lines, 22 infrared laser lines, and large-area structured light, delivering up to 0.04 mm basic accuracy and 0.05 mm resolution for automotive, aerospace, and demanding GD&T inspections.',
    },
    {
      q: 'Which scanner is suitable for reverse engineering?',
      a: 'Both 3DeVOK models are exceptional reverse engineering tools. For consumer products, 3D printed parts, ergonomic casings, and organic shapes, the 3DeVOK MQ provides fast, marker-free capture with color textures. For precision machined metal parts, stamping dies, automotive components, and tooling requiring sub-0.05 mm accuracy and deep cavity penetration, the 3DeVOK MT is the ideal choice.',
    },
    {
      q: 'Can 3DeVOK scanners capture color?',
      a: 'Yes. The 3DeVOK MQ features true 24-bit RGB texture mapping that records rich, photorealistic surface colors and reflections onto the 3D polygon mesh. The 3DeVOK MT also includes high-fidelity color restoration for visual inspection, wear tracking, and digital archiving.',
    },
    {
      q: 'Can they scan black or reflective objects?',
      a: 'Yes. The 3DeVOK MT utilizes 34 high-intensity blue laser lines specifically tuned to scan mirror-polished chrome, glossy automotive paint, and deep black plastics without needing chalk or anti-glare developer spray. The 3DeVOK MQ’s 22 infrared laser lines also handle dark and difficult materials reliably.',
    },
    {
      q: 'Can they scan large objects?',
      a: 'Yes. Both scanners support expansive fields of view. The 3DeVOK MQ covers up to 490 × 490 mm single frames, and the 3DeVOK MT features large-area infrared speckle mode covering up to 520 × 500 mm per frame. By utilizing volumetric alignment and optional photogrammetric markers, objects from small mechanical fasteners up to 4+ meter vehicle chassis and heavy machinery can be captured with continuous coordinate accuracy.',
    },
    {
      q: 'Do they require markers?',
      a: 'No, marker dots are NOT mandatory for most scans. Both 3DeVOK scanners feature advanced hybrid tracking algorithms that lock onto geometric features and surface textures marker-free. Magnetic or adhesive marker dots are optional and recommended primarily when scanning completely featureless flat sheet metal panels or requiring certified metrology coordinate continuity across long distances.',
    },
    {
      q: 'What software/output formats are supported?',
      a: '3DeVOK scanning software exports universal industry-standard data formats including OBJ, STL, PLY, ASC, TXT, MK2, and CAD-compatible formats. Scanned data imports directly into popular CAD, reverse engineering, and inspection software including QuickSurface, Geomagic Design X, Geomagic Control X, SOLIDWORKS, Autodesk Inventor, Fusion 360, SketchUp, Blender, and PolyWorks.',
    },
    {
      q: 'What computer configuration is recommended?',
      a: 'For optimal real-time GPU processing: Windows 10/11 64-bit; Intel Core i7/i9 or AMD Ryzen 7/9 processor; 32 GB RAM (64 GB recommended for massive point clouds); dedicated NVIDIA graphics card (RTX 3060, RTX 4070 or higher with minimum 6 GB–8 GB VRAM); High-Speed USB 3.0 port; and fast NVMe SSD storage.',
    },
    {
      q: 'Can I request a demo?',
      a: 'Absolutely! Leniva CAD Solutions provides both virtual live demonstrations and on-site physical benchmarks across India. You can submit a sample part for a complimentary test scan and dimensional report, or schedule our metrology engineers to demonstrate 3DeVOK scanners at your facility.',
    },
  ]

  return (
    <div className="bg-[#fafbfc] min-h-screen text-slate-900 selection:bg-orange-500 selection:text-white relative overflow-x-hidden font-inter">
      {/* ====================================================
          CATEGORY SUB-NAVBAR & BREADCRUMBS
         ==================================================== */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-slate-500">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link to="/products" className="hover:text-orange-600 transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold">3DeVOK 3D Scanners</span>
          </nav>

          {/* Quick Jump Links */}
          <div className="hidden md:flex items-center space-x-6 text-slate-600 font-medium">
            <a href="#models" className="hover:text-orange-600 transition-colors">
              Models
            </a>
            <a href="#comparison" className="hover:text-orange-600 transition-colors">
              MQ vs MT
            </a>
            <a href="#technology" className="hover:text-orange-600 transition-colors">
              Technology
            </a>
            <a href="#capabilities" className="hover:text-orange-600 transition-colors">
              Capabilities
            </a>
            <a href="#applications" className="hover:text-orange-600 transition-colors">
              Applications
            </a>
            <a href="#workflow" className="hover:text-orange-600 transition-colors">
              Workflow
            </a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">
              FAQ
            </a>
          </div>

          {/* Direct Demo Trigger */}
          <button
            onClick={() => openQuoteModal('3DeVOK 3D Scanner Demo Request')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Request Demo</span>
          </button>
        </div>
      </div>

      {/* ====================================================
          SECTION 1 — CINEMATIC HERO
         ==================================================== */}
      <section className="relative bg-white text-slate-900 overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200">
        {/* Subtle Technical Grid & Ambient Lighting */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Subtle Orange & Deep Green Glows */}
        <div className="absolute top-10 right-1/4 w-[550px] h-[550px] bg-orange-500/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-emerald-600/7 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Category Pill Tag with Signature Orange & Deep Green Accents */}
              <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Professional 3D Scanning Solutions</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                3DeVOK 3D Scanners for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700">
                  High-Precision
                </span>{' '}
                Reverse Engineering
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Capture ultra-accurate 3D data for inspection, design validation, reverse engineering, product
                development and digital transformation.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <button
                  onClick={() => openQuoteModal('3DeVOK 3D Scanners Category Demo Request')}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-600/25 hover:shadow-orange-600/35 transition-all flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Scan className="w-4 h-4" />
                  <span>Request a Demo</span>
                </button>

                <button
                  onClick={() => openQuoteModal('Talk to a 3D Scanning Expert Consultation')}
                  className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 hover:border-slate-400 transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Talk to a 3D Scanning Expert</span>
                </button>
              </div>

              {/* Verified Trust Statement Below Hero */}
              <div className="pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Trusted by Engineering Firms, R&D Labs, Automotive & Industrial Manufacturers
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-800">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-base sm:text-lg font-black text-slate-900">0.04 mm</div>
                    <div className="text-[11px] text-slate-500">Metrology Accuracy</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-base sm:text-lg font-black text-slate-900">4.5M pts/s</div>
                    <div className="text-[11px] text-slate-500">Scanning Speed</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-base sm:text-lg font-black text-slate-900">34 Blue + 22 IR</div>
                    <div className="text-[11px] text-slate-500">Laser Grid Lines</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <div className="text-base sm:text-lg font-black text-slate-900">Marker-Free</div>
                    <div className="text-[11px] text-slate-500">Hybrid Tracking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Large 3DeVOK Scanner Cinematic Visual */}
            <div className="lg:col-span-5 relative">
              {/* Product Switcher Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Interactive Model Preview</span>
                </span>
                <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setHeroScannerIndex(0)}
                    className={`px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                      heroScannerIndex === 0
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3DeVOK MT
                  </button>
                  <button
                    onClick={() => setHeroScannerIndex(1)}
                    className={`px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                      heroScannerIndex === 1
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3DeVOK MQ
                  </button>
                  <button
                    onClick={() => setHeroScannerIndex(2)}
                    className={`px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                      heroScannerIndex === 2
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    In Action
                  </button>
                  <button
                    onClick={() => setHeroScannerIndex(3)}
                    className={`px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                      heroScannerIndex === 3
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Architecture
                  </button>
                </div>
              </div>

              {/* Cinematic Product Stage */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-100/90 to-slate-200/70 border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] group">
                {/* Background Technical Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Subtitle Accent Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Animated Laser Scanning Beam */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] pointer-events-none animate-laser-sweep z-20" />

                {/* Main Scanner Image (Floating Animation) */}
                <div className="relative z-10 w-full flex items-center justify-center animate-float">
                  {heroScannerIndex === 0 && (
                    <img
                      src={devokMTData.heroImage}
                      alt={devokMTData.name}
                      className="max-h-72 sm:max-h-80 w-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                  {heroScannerIndex === 1 && (
                    <div className="w-full bg-white rounded-2xl p-4 flex items-center justify-center shadow-inner">
                      <img
                        src={devokMQData.heroImage}
                        alt={devokMQData.name}
                        className="max-h-64 sm:max-h-72 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {heroScannerIndex === 2 && (
                    <img
                      src="/images/scanners/3devok-in-hand-action.png"
                      alt="3DeVOK In-Hand Operation"
                      className="max-h-72 sm:max-h-80 w-auto object-cover rounded-2xl drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                  {heroScannerIndex === 3 && (
                    <div className="w-full bg-white rounded-2xl p-3 flex items-center justify-center shadow-inner">
                      <img
                        src="/images/scanners/3devok-sensor-architecture.png"
                        alt="3DeVOK Sensor Architecture"
                        className="max-h-64 sm:max-h-72 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Soft Product Shadow */}
                <div className="w-3/4 h-5 bg-slate-400/25 rounded-full blur-md mt-4 pointer-events-none" />

                {/* Floating Tech Badges */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-[11px] font-bold text-slate-800 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                    <span>
                      {heroScannerIndex === 0
                        ? 'Multi-Laser Metrology'
                        : heroScannerIndex === 1
                        ? '24-Bit RGB Color'
                        : heroScannerIndex === 2
                        ? 'In-Hand Operation'
                        : 'Sensor Callout Array'}
                    </span>
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-20">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-white shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {heroScannerIndex === 0
                        ? 'Accuracy up to 0.04 mm'
                        : heroScannerIndex === 1
                        ? 'Lightweight 550 g'
                        : heroScannerIndex === 2
                        ? 'Ergonomic Grip'
                        : 'Integrated Touch Screen'}
                    </span>
                  </span>
                </div>
              </div>

              {/* Bottom Quick Links to MQ & MT */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 px-1">
                <span>View dedicated product pages:</span>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/3d-scanners/3devok-mq"
                    className="font-bold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                  >
                    <span>3DeVOK MQ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to="/3d-scanners/3devok-mt"
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                  >
                    <span>3DeVOK MT</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2 — INTRODUCTION
         ==================================================== */}
      <section className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Engineered for Manufacturing & Design
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Professional 3D Scanning Without Compromise
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              3DeVOK delivers high-precision optical and multi-laser scanning systems engineered for demanding
              engineering tolerances, seamless part verification, and rich color texture acquisition across 8 core
              disciplines.
            </p>
          </div>

          {/* 8 Core Application Disciplines Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto mb-14">
            {[
              'Reverse engineering',
              'Quality inspection',
              'Product design',
              'Engineering',
              '3D visualization',
              '3D printing',
              'Research',
              'Digital archiving',
            ].map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{item}</span>
              </span>
            ))}
          </div>

          {/* 4 Animated Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Precision */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-orange-600 font-mono">
                Metric 01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Precision</h3>
              <div className="text-2xl font-black text-slate-900 mt-2">Up to 0.04 mm</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Industrial metrology repeatability complying with VDI/VDE 2634 inspection guidelines for reliable GD&T
                verification.
              </p>
            </div>

            {/* Card 2: Speed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Metric 02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Speed</h3>
              <div className="text-2xl font-black text-slate-900 mt-2">4.5M pts/sec</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ultra-dense real-time point cloud acquisition with zero frame lag, allowing complete mechanical assemblies to be captured in minutes.
              </p>
            </div>

            {/* Card 3: Color Capture */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-orange-600 font-mono">
                Metric 03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Color Capture</h3>
              <div className="text-2xl font-black text-slate-900 mt-2">24-Bit RGB</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                High-fidelity photorealistic texture mapping embeds realistic surface color, reflections, and albedo maps directly onto polygon meshes.
              </p>
            </div>

            {/* Card 4: Flexible Scanning */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 font-mono">
                Metric 04
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Flexible Scanning</h3>
              <div className="text-2xl font-black text-slate-900 mt-2">Marker-Free</div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Immediate geometric feature lock without target stickers, combined with an optional wireless battery handle for untethered mobility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3 — PRODUCT RANGE (MQ & MT)
         ==================================================== */}
      <section id="models" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Product Range
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Our 3DeVOK 3D Scanners
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              High-precision scanning solutions designed for engineering, inspection, reverse engineering and industrial
              measurement applications.
            </p>
          </div>

          {/* TWO LARGE PREMIUM PRODUCT CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* PRODUCT 1: 3DeVOK MQ */}
            <div className="bg-[#fafbfc] rounded-3xl border border-slate-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
              {/* Product Visual Top Box */}
              <div className="relative aspect-[16/10] bg-white border-b border-slate-100 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                <img
                  src={devokMQData.heroImage}
                  alt={devokMQData.name}
                  className="max-h-64 sm:max-h-72 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 bg-orange-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
                    Portable & Powerful
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-md">
                    24-Bit Color + Texture
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-slate-800 border border-slate-200 shadow-xs">
                  550 g Ultra-Light
                </div>
              </div>

              {/* Product Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider font-mono">
                    Model: 3DeVOK MQ
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                    3DeVOK MQ 3D Scanner
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 italic">
                    "Empowers Professionals, Making Everyone a 3D Creator"
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    The 3DeVOK MQ is a next-generation portable 3D scanner designed for ease of use and professional
                    accuracy. With 22-line infrared laser and infrared speckle technology with dual field of view, it
                    delivers reliable scanning for 3D printing, cultural heritage, reverse engineering, design and
                    education.
                  </p>

                  {/* Specification Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 text-xs">
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Accuracy</span>
                      <strong className="text-slate-900 font-bold">Up to 0.08 mm</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Point Distance</span>
                      <strong className="text-slate-900 font-bold">0.1–5 mm</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Scanning Speed</span>
                      <strong className="text-slate-900 font-bold">4.5M pts/s</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Texture</span>
                      <strong className="text-slate-900 font-bold">24-Bit RGB</strong>
                    </div>
                  </div>

                  {/* Feature Pills */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-700">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Marker-Free Scanning</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Optional Wireless</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Dual FoV (140–490mm)</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">USB 3.0</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to="/3d-scanners/3devok-mq"
                    className="w-full sm:flex-1 py-3 px-5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-orange-600/20 group/btn"
                  >
                    <span>Explore 3DeVOK MQ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => openQuoteModal('3DeVOK MQ Scanner Demo Request')}
                    className="w-full sm:flex-1 py-3 px-5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all text-center cursor-pointer"
                  >
                    Request a Demo
                  </button>
                </div>
              </div>
            </div>

            {/* PRODUCT 2: 3DeVOK MT */}
            <div className="bg-[#fafbfc] rounded-3xl border border-slate-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
              {/* Product Visual Top Box with Blue Laser Animation */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                {/* Simulated Animated Blue Laser Line */}
                <div className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none animate-laser-sweep z-20" />

                <img
                  src={devokMTData.heroImage}
                  alt={devokMTData.name}
                  className="max-h-64 sm:max-h-72 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl relative z-10"
                />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
                    Industrial-Grade Excellence
                  </span>
                  <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold rounded-md">
                    34 Blue + 22 IR Lasers
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-white border border-slate-700 shadow-xs z-20">
                  0.04 mm Accuracy
                </div>
              </div>

              {/* Product Body Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                    Model: 3DeVOK MT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    3DeVOK MT 3D Scanner
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 italic">
                    "Designed as a Next-Generation Magic Tool"
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    The 3DeVOK MT is a high-performance professional 3D scanner built on industrial-grade technology. It
                    combines blue laser lines, infrared laser lines and large-area infrared structured light for demanding
                    professional scanning applications.
                  </p>

                  {/* Specification Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 text-xs">
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Basic Accuracy</span>
                      <strong className="text-slate-900 font-bold">Up to 0.04 mm</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Resolution</span>
                      <strong className="text-slate-900 font-bold">Up to 0.05 mm</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Laser Grid</span>
                      <strong className="text-slate-900 font-bold">34 Blue + 22 IR</strong>
                    </div>
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Scanning Speed</span>
                      <strong className="text-slate-900 font-bold">4.5M pts/s</strong>
                    </div>
                  </div>

                  {/* Feature Pills */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-700">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Large-Area Structured Light</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Marker-Free Scanning</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Color Capture</span>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">Wireless Option</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to="/3d-scanners/3devok-mt"
                    className="w-full sm:flex-1 py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md group/btn"
                  >
                    <span>Explore 3DeVOK MT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => openQuoteModal('3DeVOK MT Industrial Scanner Demo Request')}
                    className="w-full sm:flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all text-center cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    Request a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT 3: EINSTAR HANDHELD 3D SCANNER */}
          <div className="mt-8 bg-[#fafbfc] rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-5 relative bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              <img
                src="/images/scanners/einstar-hero.png"
                alt="EINSTAR Handheld 3D Scanner"
                className="max-h-60 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/scanners/3devok-mq.png'
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
                  Handheld Color 3D Digitizer
                </span>
              </div>
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  SHINING 3D • EINSTAR
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  EINSTAR Handheld 3D Scanner
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Equipped with 3 infrared VCSEL projectors, 2 stereo depth cameras, and 1 RGB color camera, EINSTAR captures clear, high-density point cloud data at up to 14 FPS with 0.1 mm point distance for 3D printing, digital archiving, education, and design workflows.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Point Distance</span>
                    <strong className="text-slate-900 font-bold">0.1 mm – 3 mm</strong>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Light Source</span>
                    <strong className="text-slate-900 font-bold">Infrared VCSEL</strong>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Scan Speed</span>
                    <strong className="text-slate-900 font-bold">Up to 14 FPS</strong>
                  </div>
                  <div className="bg-white border border-slate-200 p-2.5 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Color Camera</span>
                    <strong className="text-slate-900 font-bold">Full RGB Color</strong>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/3d-scanners/einscan"
                  className="w-full sm:flex-1 py-3 px-5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md group/btn"
                >
                  <span>Explore EINSTAR Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => openQuoteModal('EINSTAR 3D Scanner Demo Request')}
                  className="w-full sm:flex-1 py-3 px-5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all text-center cursor-pointer"
                >
                  Request a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4 — MQ VS MT (INTERACTIVE COMPARISON)
         ==================================================== */}
      <section id="comparison" className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Side-By-Side Evaluation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Which 3DeVOK Scanner Is Right for You?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Compare portable full-color versatility with industrial-grade multi-laser metrology to match your workflow.
            </p>
          </div>

          {/* Interactive Comparison Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {[
              { id: 'all' as const, label: 'All Benchmarks' },
              { id: 'accuracy' as const, label: 'Accuracy & GD&T' },
              { id: 'speed' as const, label: 'Speed & Laser Optics' },
              { id: 'versatility' as const, label: 'Color & Portability' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setComparisonTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  comparisonTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TWO-COLUMN SIDE-BY-SIDE HIGHLIGHT COMPARISON CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Column 1: 3DeVOK MQ */}
            <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">Portable Versatility</span>
                    <h3 className="text-2xl font-black text-slate-900">3DeVOK MQ</h3>
                  </div>
                  <span className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold rounded-full">
                    0.08 mm Accuracy
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Portable & Lightweight:</strong> Only 550 g for effortless handheld capture anywhere.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Wireless scanning option:</strong> Untethered freedom with optional battery handle.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Small to medium objects:</strong> Optimized for coin-sized up to 1.5-meter items.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>24-bit photoreal color:</strong> True RGB texture capture for digital twins and 3D printing.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span><strong>Target industries:</strong> Product design, education, cultural heritage & 3D printing.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to="/3d-scanners/3devok-mq"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>View 3DeVOK MQ Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Column 2: 3DeVOK MT */}
            <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Industrial Flagship</span>
                    <h3 className="text-2xl font-black text-slate-900">3DeVOK MT</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
                    Up to 0.04 mm Basic Accuracy
                  </span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Industrial grade:</strong> Rugged design built for heavy shop-floor environments.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Blue + Infrared laser:</strong> 34 blue laser lines + 22 IR lines for shiny metals & deep cavities.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Large-object scanning:</strong> Expands to vehicle chassis, heavy machinery, and tooling dies.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Metrology GD&T inspection:</strong> 0.05 mm fine resolution with certified precision repeatability.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Target industries:</strong> Automotive, aerospace, manufacturing, tooling & R&D.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to="/3d-scanners/3devok-mt"
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>View 3DeVOK MT Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Expert Selection Assistance Banner (DO NOT ADD FAKE PRICING) */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 font-mono">
                Official Technical Consultation
              </span>
              <h4 className="text-xl sm:text-2xl font-bold">Unsure which scanner best matches your tolerances?</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Our metrology specialists provide benchmark tests on your sample components with zero obligation.
              </p>
            </div>

            <button
              onClick={() => openQuoteModal('3D Scanning Expert Model Recommendation')}
              className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-orange-600/30 shrink-0 cursor-pointer"
            >
              Talk to a 3D Scanning Expert
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5 — TECHNOLOGY
         ==================================================== */}
      <section id="technology" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Core Scanning Physics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Advanced 3D Scanning Technology
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              State-of-the-art multi-wavelength lasers and eye-safe structured infrared light deliver exceptional capture
              on difficult surfaces.
            </p>
          </div>

          {/* THREE PREMIUM VISUAL TECHNOLOGY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 01: Blue Laser Technology */}
            <div
              onClick={() => setActiveTechCard(0)}
              className={`bg-[#fafbfc] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer ${
                activeTechCard === 0
                  ? 'border-2 border-cyan-500 shadow-lg ring-2 ring-cyan-500/20'
                  : 'border border-slate-200 hover:border-cyan-400'
              }`}
            >
              <div className="space-y-5">
                {/* Visual Technical Diagram Header */}
                <div className="aspect-[16/10] bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono z-10">
                    <span>λ = 450 nm (Blue)</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40">34 Lines</span>
                  </div>

                  {/* Laser Grid Diagram Representation */}
                  <div className="space-y-1.5 py-4 z-10">
                    <div className="h-0.5 w-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                    <div className="h-0.5 w-3/4 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                    <div className="h-0.5 w-5/6 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                    <div className="h-0.5 w-2/3 bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono z-10 flex items-center justify-between">
                    <span>High Surface Rejection</span>
                    <span className="text-cyan-300">Zero Powder Spray</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-cyan-600 font-mono">01 — Optical Array</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Blue Laser Technology</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Delivers high-precision capture of complex geometry, machined metals, shiny chrome, and deep black
                    carbon surfaces without requiring developer spray powder.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Featured on:</span>
                <span className="text-slate-900 font-bold">3DeVOK MT Industrial</span>
              </div>
            </div>

            {/* Tech 02: Infrared Laser Technology */}
            <div
              onClick={() => setActiveTechCard(1)}
              className={`bg-[#fafbfc] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer ${
                activeTechCard === 1
                  ? 'border-2 border-orange-500 shadow-lg ring-2 ring-orange-500/20'
                  : 'border border-slate-200 hover:border-orange-400'
              }`}
            >
              <div className="space-y-5">
                {/* Visual Technical Diagram Header */}
                <div className="aspect-[16/10] bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] text-orange-400 font-mono z-10">
                    <span>λ = 850 nm (Infrared)</span>
                    <span className="px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/40">22 Lines</span>
                  </div>

                  {/* Infrared Penetration Diagram */}
                  <div className="flex items-center justify-center py-4 z-10">
                    <div className="relative w-28 h-16 border border-orange-500/40 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-8 border-b-2 border-orange-400 border-dashed" />
                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono z-10 flex items-center justify-between">
                    <span>Class 1 Eye-Safe</span>
                    <span className="text-orange-300">Marker-Free Tracking</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-orange-600 font-mono">02 — Penetration Array</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Infrared Laser Technology</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Enables marker-free and invisible-light scanning that penetrates deep crevices and narrow cavities
                    while remaining completely safe for human body and museum artifact capture.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Featured on:</span>
                <span className="text-slate-900 font-bold">3DeVOK MQ & 3DeVOK MT</span>
              </div>
            </div>

            {/* Tech 03: Infrared Structured Light */}
            <div
              onClick={() => setActiveTechCard(2)}
              className={`bg-[#fafbfc] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer ${
                activeTechCard === 2
                  ? 'border-2 border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                  : 'border border-slate-200 hover:border-emerald-400'
              }`}
            >
              <div className="space-y-5">
                {/* Visual Technical Diagram Header */}
                <div className="aspect-[16/10] bg-slate-950 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono z-10">
                    <span>VCSEL Structured Speckle</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">Wide FOV</span>
                  </div>

                  {/* Structured Light Array Representation */}
                  <div className="grid grid-cols-6 gap-1.5 py-3 z-10">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mx-auto animate-pulse" />
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono z-10 flex items-center justify-between">
                    <span>Single FOV: 520 mm</span>
                    <span className="text-emerald-300">Fast Volumetric Capture</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 font-mono">03 — Volumetric Projection</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Infrared Structured Light</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Delivers wide-area scanning and rapid, full-field volumetric point acquisition for large automotive panels,
                    human body digitizing, and rapid prototyping.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Featured on:</span>
                <span className="text-slate-900 font-bold">3DeVOK MQ & 3DeVOK MT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6 — KEY CAPABILITIES
         ==================================================== */}
      <section id="capabilities" className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Verified Technical Benchmarks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              8 Key 3D Scanning Capabilities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Engineered with proven optical specifications to meet rigorous production standards across industrial shop floors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'High Precision',
                desc: 'Basic accuracy up to 0.04 mm with certified calibration plates complying with VDI/VDE 2634 inspection guidelines.',
                icon: ShieldCheck,
                highlight: '0.04 mm Accuracy',
              },
              {
                title: 'Fast Scanning',
                desc: 'High-speed structured light and laser line projection acquiring up to 4,500,000 coordinates per second in real time.',
                icon: Zap,
                highlight: '4.5M Points/Sec',
              },
              {
                title: 'Marker-Free Scanning',
                desc: 'Intelligent hybrid geometric algorithms eliminate the need for adhesive marker dots on feature-rich workpieces.',
                icon: CheckCircle2,
                highlight: 'Zero Prep Time',
              },
              {
                title: 'Full-Color Capture',
                desc: 'Integrated 24-bit True RGB photometric sensors map realistic color and texture fidelity directly onto 3D polygon meshes.',
                icon: Palette,
                highlight: '24-Bit RGB Texture',
              },
              {
                title: 'Large Object Scanning',
                desc: 'Expansive fields of view up to 520 mm capture full-size vehicle bodies, heavy equipment castings, and architectural structures.',
                icon: Box,
                highlight: 'Up to 4+ Meters',
              },
              {
                title: 'Complex Surface Capture',
                desc: 'Multi-wavelength blue and infrared lasers easily digitize dark black plastics, carbon fiber composites, and reflective machined metals without spray.',
                icon: Eye,
                highlight: 'Anti-Glare Rejection',
              },
              {
                title: 'Wireless Scanning',
                desc: 'Optional modular rechargeable battery handle frees operators from cables for convenient warehouse and field digitization.',
                icon: Radio,
                highlight: 'Cable-Free Mobility',
              },
              {
                title: 'Multiple Alignment Modes',
                desc: 'Seamless hybrid alignment combining geometric features, surface color texture, photogrammetric markers, and coordinate point clouds.',
                icon: Compass,
                highlight: 'Hybrid Alignment',
              },
            ].map((cap, idx) => {
              const Icon = cap.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                      {cap.highlight}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{cap.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{cap.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7 — APPLICATIONS (id="applications")
         ==================================================== */}
      <section id="applications" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Engineering in Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Built for Real-World 3D Applications
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              From heavy automotive body-in-white metrology to delicate museum antiquities and custom orthopedic medical
              devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-[#fafbfc] rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
              >
                {/* Image Preview Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md bg-white/90 ${app.badgeColor}`}
                    >
                      {app.badge}
                    </span>
                  </div>
                </div>

                {/* Application Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {app.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{app.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => openQuoteModal(`${app.title} 3D Scanning Consultation`)}
                      className="text-orange-600 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Consult Specialist</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 8 — INDUSTRIES
         ==================================================== */}
      <section className="py-16 sm:py-24 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Tailored for Critical Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Serving India's Core Manufacturing & R&D Industries
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Select an industry below to see how 3DeVOK scanners solve critical dimensional measurement challenges.
            </p>
          </div>

          {/* Interactive Industry Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {industries.map((ind, idx) => {
              const Icon = ind.icon
              const isSelected = selectedIndustry === idx
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />
                  <span>{ind.name}</span>
                </button>
              )
            })}
          </div>

          {/* Active Industry Detail Spotlight */}
          {(() => {
            const current = industries[selectedIndustry]
            const Icon = current.icon
            return (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-orange-50 text-orange-600 text-xs font-bold border border-orange-200">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{current.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{current.name} Engineering Solutions</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{current.description}</p>
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                    <div>
                      Key Benchmark: <strong className="text-slate-900 font-bold">{current.metric}</strong>
                    </div>
                    <div>
                      Recommended Model:{' '}
                      <strong className="text-emerald-700 font-bold">{current.popularScanner}</strong>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                  <span className="text-xs text-slate-500 font-medium">Ready for an on-site demonstration?</span>
                  <button
                    onClick={() => openQuoteModal(`${current.name} Industry On-Site Demo Request`)}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer"
                  >
                    Schedule {current.name} Demo
                  </button>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ====================================================
          SECTION 9 — SCANNING WORKFLOW
         ==================================================== */}
      <section id="workflow" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Digital 3D Scanning Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              From Physical Object to Digital Model
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              A streamlined 5-step engineering workflow converting raw physical parts into watertight, production-ready
              3D CAD data.
            </p>
          </div>

          {/* Workflow Step Navigation Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeWorkflowStep === idx
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-[#fafbfc] text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-mono font-bold ${
                      activeWorkflowStep === idx ? 'text-orange-400' : 'text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${activeWorkflowStep === idx ? 'bg-orange-500' : 'bg-slate-300'}`}
                  />
                </div>
                <div className="text-sm font-bold tracking-tight">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Active Workflow Step Showcase Card */}
          {(() => {
            const step = workflowSteps[activeWorkflowStep]
            return (
              <div className="bg-[#fafbfc] rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-500/20">
                    <span className="font-mono">{step.num}</span>
                    <span>{step.techBadge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Step {step.num}: {step.title}
                  </h3>
                  <div className="text-sm font-semibold text-slate-700">{step.subtitle}</div>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
                    <strong>Process Output:</strong> {step.details}
                  </div>
                </div>

                {/* Animated Object Transformation Representation */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[4/3] rounded-2xl bg-slate-950 p-6 flex flex-col justify-between overflow-hidden shadow-xl border border-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10">
                      <span>Pipeline Stage: {step.title}</span>
                      <span className="text-orange-400 font-bold">{((activeWorkflowStep + 1) * 20)}% Complete</span>
                    </div>

                    {/* Visual Transformation Stage */}
                    <div className="py-6 flex items-center justify-center z-10">
                      {activeWorkflowStep === 0 && (
                        <div className="text-center space-y-2">
                          <Scan className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                          <div className="text-xs font-mono text-cyan-300">Raw Optical Acquisition</div>
                        </div>
                      )}
                      {activeWorkflowStep === 1 && (
                        <div className="text-center space-y-2">
                          <Compass className="w-16 h-16 text-orange-400 mx-auto animate-spin-slow" />
                          <div className="text-xs font-mono text-orange-300">Marker-Free Coordinate Lock</div>
                        </div>
                      )}
                      {activeWorkflowStep === 2 && (
                        <div className="text-center space-y-2">
                          <Cpu className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                          <div className="text-xs font-mono text-emerald-300">GPU Point Cloud Filtering</div>
                        </div>
                      )}
                      {activeWorkflowStep === 3 && (
                        <div className="text-center space-y-2">
                          <Layers className="w-16 h-16 text-amber-400 mx-auto" />
                          <div className="text-xs font-mono text-amber-300">Watertight 3D Polygon Mesh</div>
                        </div>
                      )}
                      {activeWorkflowStep === 4 && (
                        <div className="text-center space-y-2">
                          <FileCheck className="w-16 h-16 text-emerald-400 mx-auto" />
                          <div className="text-xs font-mono text-emerald-300">STEP/IGES CAD Delivery</div>
                        </div>
                      )}
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden z-10">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${(activeWorkflowStep + 1) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ====================================================
          SECTION 10 — PRODUCT DETAIL CTA (CONTRAST SECTION)
         ==================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white relative overflow-hidden border-y border-emerald-900/60 shadow-2xl">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Expert Solution Advisory</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Need Help Choosing the Right 3D Scanner?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Whether you are evaluating the portable 3DeVOK MQ or the industrial-grade 3DeVOK MT, our specialists can
                help you select the right scanning solution for your application.
              </p>
              <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center lg:justify-start space-x-3 pt-2">
                <span>Available Across India</span>
                <span>•</span>
                <span>Professional Technical Support</span>
                <span>•</span>
                <span>Live Sample Testing</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openQuoteModal('3DeVOK 3D Expert Consultation')}
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-black rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Ask Our 3D Expert
              </button>
              <button
                onClick={() => openQuoteModal('3DeVOK On-Site Demo Request')}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-orange-600/30 transition-all text-center cursor-pointer"
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 11 — FAQ
         ==================================================== */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 font-mono">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              3DeVOK 3D Scanners FAQ
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Factual, verified answers regarding hardware performance, tolerances, software integration, and on-site demos.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'border-orange-300 bg-orange-50/20 shadow-xs' : 'border-slate-200 bg-[#fafbfc]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 12 — FINAL CTA
         ==================================================== */}
      <section className="py-16 sm:py-24 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-white border border-slate-200 p-8 sm:p-14 lg:p-16 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Subtle background technical grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen 3D Scanning Solutions</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Turn Physical Objects Into Precise Digital Data
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Explore professional 3D scanning solutions for engineering, manufacturing, reverse engineering and product
                development. Contact our application engineers today for benchmark samples and on-site testing.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => openQuoteModal('3DeVOK Final CTA Demo Request')}
                  className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-orange-600/25 transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Scan className="w-4 h-4" />
                  <span>Request a Demo</span>
                </button>

                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>

              <div className="pt-4 text-xs text-slate-500 flex items-center space-x-4">
                <span>Direct Hotline: <strong className="text-slate-800">+91 93282 30200</strong></span>
                <span>•</span>
                <span>Email: <strong className="text-slate-800">info@lenivacads.com</strong></span>
              </div>
            </div>

            {/* Right: Premium Scanner Render with Subtle Animated Scanning Line */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/80 p-8 border border-slate-200 w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-x-0 h-0.5 bg-orange-500/80 shadow-[0_0_12px_#f97316] pointer-events-none animate-laser-sweep z-20" />
                <img
                  src="/images/products/3devok-mt.png"
                  alt="3DeVOK 3D Scanner"
                  className="max-h-60 sm:max-h-72 w-auto object-contain drop-shadow-xl z-10"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-slate-800 border border-slate-200 shadow-xs z-20">
                  VDI/VDE 2634 Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ScannersCategoryPage
