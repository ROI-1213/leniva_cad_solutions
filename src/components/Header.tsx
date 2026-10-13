import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Phone,
  Mail,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Printer,
  Layers,
  Box,
  Scan,
  Home,
  BookOpen,
  User,
  PhoneCall,
  ShieldCheck,
  Linkedin,
  Youtube,
  Instagram,
  Target,
  CircleDot,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { siteConfig } from '../data/siteConfig'

export const Header: React.FC = () => {
  const { wishlistCount, openQuoteModal, openSearchModal, liveSiteSettings } = useApp()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [activeMegaCategory, setActiveMegaCategory] = useState<'fdm' | 'dlp' | 'lcd' | 'scanners' | 'filaments'>('fdm')
  const [activeCADCategory, setActiveCADCategory] = useState<'ares' | 'sketchup' | 'chaos'>('ares')
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)

  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  // Dynamically publish exact header height to CSS variable --site-header-height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight
        document.documentElement.style.setProperty('--site-header-height', `${height}px`)
      }
    }
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMegaMenu(null)
  }, [location])

  interface MegaProduct {
    name: string
    slug: string
    spec: string
    badge?: string
  }

  interface MegaCategory {
    id: 'fdm' | 'dlp' | 'lcd' | 'scanners' | 'filaments'
    label: string
    icon: any
    route: string
    description: string
    products: MegaProduct[]
  }

  const megaCategories: MegaCategory[] = [
    {
      id: 'fdm' as const,
      label: 'FDM 3D Printers',
      icon: Printer,
      route: '/products/fdm-3d-printers',
      description: 'Industrial and desktop FDM systems with build volumes up to 1 meter.',
      products: [
        { name: 'Pratham Mini', slug: 'pratham-mini', spec: '120 × 120 × 120 mm' },
        { name: 'Pratham Desktop', slug: 'pratham-desktop', spec: '200 × 200 × 250 mm' },
        { name: 'Pratham 3.0', slug: 'pratham-3', spec: '300 × 300 × 300 mm' },
        { name: 'Pratham 5.0', slug: 'pratham-5', spec: '500 × 500 × 500 mm' },
        { name: 'Pratham 6.0', slug: 'pratham-6', spec: '600 × 600 × 600 mm' },
        { name: 'Pratham X (600)', slug: 'pratham-x-600', spec: '1000 × 1000 × 600 mm' },
        { name: 'Pratham X (1000)', slug: 'pratham-x', spec: '1000 × 1000 × 1000 mm (1 m³)' },
        { name: 'Pratham 3 Rapid', slug: 'pratham-3-rapid', spec: '350 × 350 × 350 mm | 500 mm/s', badge: 'Featured' },
      ],
    },
    {
      id: 'dlp' as const,
      label: 'DLP 3D Printers',
      icon: Layers,
      route: '/products/dlp-3d-printers',
      description: 'High-precision resin systems for jewellery casting and ultra-fine precision.',
      products: [
        { name: 'EKA HT', slug: 'eka-ht', spec: 'Jewellery Direct Casting' },
        { name: 'EKA XL', slug: 'eka-xl', spec: 'Large Format Jewellery' },
        { name: 'EKA XLE', slug: 'eka-xle', spec: 'Engineering Precision' },
      ],
    },
    {
      id: 'lcd' as const,
      label: 'Industrial LCD',
      icon: Box,
      route: '/products/industrial-lcd-3d-printers',
      description: 'Ultra-high resolution 8K–16K monochrome masking arrays.',
      products: [
        { name: 'EKA GT MAX', slug: 'eka-gt-max', spec: 'Engineering LCD Production' },
        { name: 'EKA F1 16K', slug: 'eka-f1-16k', spec: '16K Ultra-Fine Detailing', badge: '16K Micro' },
      ],
    },
    {
      id: 'scanners' as const,
      label: '3D Scanners',
      icon: Scan,
      route: '/products/3d-scanners',
      description: 'Professional optical and laser scanners for reverse engineering and inspection.',
      products: [
        { name: '3DeVOK MT', slug: '3devok-mt', spec: '0.04 mm • 34 Blue + 22 IR Lasers', badge: 'Flagship' },
        { name: '3DeVOK MQ', slug: '3devok-mq', spec: '0.08 mm • 24-Bit Color • Wireless Ready', badge: 'Color 3D' },
        { name: 'EINSTAR', slug: 'einscan', spec: 'Handheld Structured Light Scanner', badge: 'Portable' },
      ],
    },
    {
      id: 'filaments' as const,
      label: '3D Printer Filaments',
      icon: CircleDot,
      route: '/products/filaments',
      description: 'Make3D genuine 1.75 mm PLA and PLA+ filaments across 8 vivid colours.',
      products: [
        { name: 'PLA White (1 KG)', slug: 'filaments/pla-white-1kg-175mm', spec: '1.75 mm • Easy Print', badge: 'Popular' },
        { name: 'PLA+ Grey / Silver', slug: 'filaments/plaplus-grey-silver-1kg-175mm', spec: '1.75 mm • High Toughness' },
        { name: 'PLA+ Black', slug: 'filaments/plaplus-black-1kg-175mm', spec: '1.75 mm • Pro Matte', badge: 'Top Rated' },
        { name: 'PLA+ Blue', slug: 'filaments/plaplus-blue-1kg-175mm', spec: '1.75 mm • Vibrant Finish' },
        { name: 'PLA+ Gold', slug: 'filaments/plaplus-gold-1kg-175mm', spec: '1.75 mm • Metallic Finish' },
        { name: 'PLA+ Red', slug: 'filaments/plaplus-red-1kg-175mm', spec: '1.75 mm • High Strength' },
      ],
    },
  ]



  interface CadSoftwareProduct {
    name: string
    slug: string
    spec: string
    image: string
    badge?: string
  }

  interface CadSoftwareCategory {
    id: 'ares' | 'sketchup' | 'chaos'
    label: string
    logo: string
    secondaryLogo?: string
    description?: string
    products: CadSoftwareProduct[]
  }

  const cadSoftwareCategories: CadSoftwareCategory[] = [
    {
      id: 'ares',
      label: 'ARES – Graebert',
      logo: '/images/brands/ares-cad.png',
      secondaryLogo: '/images/brands/grabert.png',
      description: 'Professional DWG CAD, Trinity cloud/mobile collaboration & specialized engineering toolsets.',
      products: [
        { name: 'ARES Standard', slug: 'ares-standard', spec: 'Affordable 2D/3D CAD', image: '/images/software/ares-standard.jpg' },
        { name: 'ARES Commander', slug: 'ares-commander', spec: 'Professional DWG-Native CAD', image: '/images/software/ares-commander.jpg' },
        { name: 'ARES Kudo', slug: 'ares-kudo', spec: 'Online DWG CAD & Cloud', image: '/images/software/ares-kudo.jpg' },
        { name: 'ARES Touch', slug: 'ares-touch', spec: 'Mobile DWG CAD & Field', image: '/images/software/ares-touch.jpg' },
        { name: 'ARES Mechanical', slug: 'ares-mechanical', spec: 'Mechanical Design CAD', image: '/images/software/ares-mechanical.jpg' },
        { name: 'ARES Electrical', slug: 'ares-electrical', spec: 'Electrical Schematics CAD', image: '/images/software/ares-electrical.jpg' },
      ],
    },
    {
      id: 'sketchup',
      label: 'SketchUp – Trimble',
      logo: '/images/brands/sketchup.png',
      description: 'Industry-standard 3D modeling, reality capture point clouds, BIM integration & LayOut documentation.',
      products: [
        { name: 'SketchUp Pro', slug: 'sketchup', spec: 'Professional 3D Modeling', image: '/images/software/sketchup-pro.jpg' },
        { name: 'SketchUp Pro Scan', slug: 'sketchup-scan', spec: 'Scan-to-BIM Workflows', image: '/images/software/sketchup-scan.jpg' },
        { name: 'SketchUp Pro Advanced Workflows', slug: 'sketchup-advanced', spec: 'BIM & Advanced Integration', image: '/images/software/sketchup-advanced.jpg' },
        { name: 'SketchUp Studio', slug: 'sketchup-studio', spec: 'Full Professional Suite', image: '/images/software/sketchup-studio.jpg' },
      ],
    },
    {
      id: 'chaos',
      label: 'Chaos',
      logo: '/images/brands/chaos.jpg',
      description: 'World-leading real-time rendering, photorealistic ray tracing & architectural visualization engines.',
      products: [
        { name: 'Enscape', slug: 'enscape', spec: 'Real-Time Rendering & VR', image: '/images/software/enscape-3d.jpg' },
        { name: 'V-Ray', slug: 'vray', spec: 'Photorealistic Rendering Engine', image: '/images/software/chaos-vray.jpg' },
        { name: 'Corona', slug: 'corona', spec: 'ArchViz CPU Rendering', image: '/images/software/chaos-corona.jpg' },
      ],
    },
  ]

  const shopLinks = [
    { name: 'All Store Catalog', route: '/shop' },
    { name: 'CAD Software Solutions', route: '/shop?category=cad-software' },
    { name: '3D Printers & Scanners (Products)', route: '/shop/products' },
    { name: '3D Printer Filaments (PLA & PLA+)', route: '/shop/filaments' },
    { name: 'FDM 3D Printers', route: '/shop/fdm' },
    { name: 'DLP & LCD 3D Printers', route: '/shop/dlp' },
    { name: 'Precision 3D Scanners', route: '/shop/scanners' },
  ]

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(prev => (prev === section ? null : section))
  }

  return (
    <header ref={headerRef} className="w-full bg-slate-50/95 backdrop-blur-md z-50 sticky top-0 transition-all">
      {/* 1. TOP UTILITY STRIP (Light matching user mockup) */}
      <div className="border-b border-slate-200/70 text-xs text-slate-600 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left contact info */}
          <div className="flex items-center space-x-5 text-[11px] sm:text-xs">
            <a
              href={`mailto:${liveSiteSettings.email}`}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{liveSiteSettings.email}</span>
            </a>
            <a
              href={`tel:${liveSiteSettings.phone}`}
              className="hidden sm:flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{liveSiteSettings.phone}</span>
            </a>
            <div className="hidden md:flex items-center space-x-1.5 text-slate-600">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center shrink-0">
                <Target className="w-2.5 h-2.5 text-emerald-600" />
              </span>
              <span>Technical Support: <strong className="text-slate-800 font-semibold">{siteConfig.supportPhone}</strong></span>
            </div>
          </div>

          {/* Right Links & Social Icons */}
          <div className="flex items-center space-x-4 text-[11px] sm:text-xs text-slate-600">
            <Link to="/warranty" className="hidden lg:flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Warranty & Support</span>
            </Link>
            <div className="flex items-center space-x-2 text-slate-500">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5 text-[#ff0000]" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (CURVED EDGES) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className={`max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between relative transition-all ${
          isScrolled ? 'shadow-xl shadow-slate-900/10 border-slate-300' : 'shadow-md'
        }`}>
          {/* Brand Logo & Slogan */}
          <div className="flex items-center shrink-0 mr-2 xl:mr-4">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png?v=4"
                alt="LENIVA CAD SOLUTIONS"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="h-8 w-[1.5px] bg-slate-200 mx-2.5 xl:mx-3 hidden lg:block" />
            <div className="hidden lg:flex flex-col text-[10px] leading-[1.15] text-slate-400 font-medium whitespace-nowrap">
              <span>Engineering</span>
              <span>Possibilities</span>
              <span>Together</span>
            </div>
          </div>

          {/* Desktop Navigation Links with Icon on Top */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* 1. Home */}
            <Link
              to="/"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <Home className={`w-4 h-4 transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Home
              </span>
              {location.pathname === '/' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* 2. CAD Software Mega Menu (FIRST in hierarchy) */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setActiveMegaMenu('cad-software')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/products/cad-software"
                className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative"
              >
                <Layers className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/products/cad-software') || location.pathname.includes('ares') || location.pathname.includes('sketchup') || location.pathname.includes('enscape') || location.pathname.includes('vray') || location.pathname.includes('corona') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
                <div className="flex items-center space-x-0.5 mt-1">
                  <span className={`text-xs whitespace-nowrap transition-colors ${location.pathname.startsWith('/products/cad-software') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                    CAD Software
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-red-600" />
                </div>
                {location.pathname.startsWith('/products/cad-software') && (
                  <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
                )}
              </Link>

              {/* CAD Software Mega Menu Flyout */}
              {activeMegaMenu === 'cad-software' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-fade-in w-[820px] max-w-[90vw]">
                  <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-12">
                    {/* Left categories column */}
                    <div className="col-span-4 bg-slate-50 p-4 border-r border-slate-200 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                        Software Brands
                      </div>
                      {cadSoftwareCategories.map(cat => {
                        const isSelected = activeCADCategory === cat.id
                        return (
                          <div
                            key={cat.id}
                            onMouseEnter={() => setActiveCADCategory(cat.id)}
                            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white text-red-600 shadow-sm font-bold border border-slate-200'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                                <img src={cat.logo} alt={cat.label} className="w-full h-full object-contain" />
                              </div>
                              <span className="text-xs truncate">{cat.label}</span>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                          </div>
                        )
                      })}
                      <div className="pt-3 px-3">
                        <Link
                          to="/products/cad-software"
                          className="block text-center py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          View All Software →
                        </Link>
                      </div>
                    </div>

                    {/* Right products panel */}
                    <div className="col-span-8 p-6 flex flex-col justify-between">
                      <div>
                        {(() => {
                          const currentCat = cadSoftwareCategories.find(c => c.id === activeCADCategory)!
                          return (
                            <>
                              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 px-2.5 py-1 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                                    <img src={currentCat.logo} alt={currentCat.label} className="h-full w-auto max-w-[90px] object-contain" />
                                  </div>
                                  {currentCat.secondaryLogo && (
                                    <div className="h-10 px-2.5 py-1 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                                      <img src={currentCat.secondaryLogo} alt="Graebert" className="h-full w-auto max-w-[90px] object-contain" />
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="text-base font-bold text-slate-950">{currentCat.label}</h4>
                                    {currentCat.description && (
                                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{currentCat.description}</p>
                                    )}
                                  </div>
                                </div>
                                <Link
                                  to="/products/cad-software"
                                  onClick={() => setActiveMegaMenu(null)}
                                  className="text-xs font-semibold text-red-600 hover:underline flex items-center space-x-1 shrink-0"
                                >
                                  <span>View Category</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {currentCat.products.map(prod => (
                                  <Link
                                    key={prod.slug}
                                    to={`/products/${prod.slug}`}
                                    onClick={() => setActiveMegaMenu(null)}
                                    className="flex items-center gap-3 p-2 rounded-xl border border-slate-200/80 hover:border-red-300 hover:bg-red-50/30 hover:shadow-xs transition-all group bg-white relative"
                                  >
                                    <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 aspect-square">
                                      <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                      />
                                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded bg-white/95 p-0.5 shadow-2xs flex items-center justify-center">
                                        <img src={currentCat.logo} alt="" className="w-full h-full object-contain" />
                                      </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 block truncate">
                                          {prod.name}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between gap-2 mt-0.5">
                                        <p className="text-[11px] text-slate-500 line-clamp-1">{prod.spec}</p>
                                        <img
                                          src={currentCat.logo}
                                          alt={currentCat.label}
                                          className="h-3.5 w-auto max-w-[42px] object-contain opacity-70 group-hover:opacity-100 transition-opacity shrink-0"
                                        />
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </>
                          )
                        })()}
                      </div>

                      {/* Mega Menu Footer Consultation Banner */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Need official licensing, network deployment or CAD trial advice?</span>
                        <button
                          onClick={() => {
                            setActiveMegaMenu(null)
                            openQuoteModal('CAD Software Consultation')
                          }}
                          className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Request Software Quote →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. 3D Printers Mega Menu Trigger (SECOND in hierarchy) */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setActiveMegaMenu('products')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/products"
                className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative"
              >
                <Printer className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/products') && !location.pathname.startsWith('/products/cad-software') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
                <div className="flex items-center space-x-0.5 mt-1">
                  <span className={`text-xs whitespace-nowrap transition-colors ${location.pathname.startsWith('/products') && !location.pathname.startsWith('/products/cad-software') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                    3D Printers
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-red-600" />
                </div>
                {location.pathname.startsWith('/products') && !location.pathname.startsWith('/products/cad-software') && (
                  <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
                )}
              </Link>

              {/* MEGA MENU FLYOUT */}
              {activeMegaMenu === 'products' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-fade-in w-[900px] max-w-[90vw]">
                  <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-12">
                    {/* Left categories column */}
                    <div className="col-span-4 bg-slate-50 p-4 border-r border-slate-200 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                        Technology Categories
                      </div>
                      {megaCategories.map(cat => {
                        const Icon = cat.icon
                        const isSelected = activeMegaCategory === cat.id
                        return (
                          <div
                            key={cat.id}
                            onMouseEnter={() => setActiveMegaCategory(cat.id)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white text-red-600 shadow-sm font-bold border border-slate-200'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                              <span className="text-xs">{cat.label}</span>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                          </div>
                        )
                      })}
                      <div className="pt-3 px-3">
                        <Link
                          to="/products"
                          className="block text-center py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Explore Full Catalog →
                        </Link>
                      </div>
                    </div>

                    {/* Right products preview panel */}
                    <div className="col-span-8 p-6 flex flex-col justify-between">
                      <div>
                        {(() => {
                          const currentCat = megaCategories.find(c => c.id === activeMegaCategory)!
                          return (
                            <>
                              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                                <div>
                                  <h4 className="text-base font-bold text-slate-950">{currentCat.label}</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">{currentCat.description}</p>
                                </div>
                                <Link
                                  to={currentCat.route}
                                  className="text-xs font-semibold text-red-600 hover:underline flex items-center space-x-1"
                                >
                                  <span>View Category Page</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {currentCat.products.map(prod => (
                                  <Link
                                    key={prod.slug}
                                    to={`/products/${prod.slug}`}
                                    className="p-2.5 rounded-lg border border-slate-100 hover:border-red-200 hover:bg-red-50/40 transition-all group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                                        {prod.name}
                                      </span>
                                      {prod.badge && (
                                        <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                                          {prod.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{prod.spec}</p>
                                  </Link>
                                ))}
                              </div>
                            </>
                          )
                        })()}
                      </div>

                      {/* Mega Menu Footer Banner */}
                      <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Need tailored machine specifications or 3D printing configuration advice?</span>
                        <button
                          onClick={() => {
                            setActiveMegaMenu(null)
                            openQuoteModal('3D Printer Inquiry')
                          }}
                          className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Request a Quote →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* 4. Shop with Dropdown for Products and Filaments */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setActiveMegaMenu('shop')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/shop"
                className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
              >
                <div className="flex items-center space-x-0.5">
                  <ShoppingCart className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/shop') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-red-600 transition-colors" />
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname.startsWith('/shop') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                  Shop
                </span>
                {location.pathname.startsWith('/shop') && (
                  <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
                )}
              </Link>

              {/* Shop Dropdown Menu */}
              {activeMegaMenu === 'shop' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-88 animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 space-y-2 overflow-hidden">
                    {/* Header */}
                    <div className="px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Shop Online
                      </span>
                      <Link
                        to="/shop"
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center space-x-0.5"
                      >
                        <span>All Store Items</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Section 1: CAD & 3D Design Software */}
                    <Link
                      to="/shop?category=cad-software"
                      onClick={() => setActiveMegaMenu(null)}
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            CAD &amp; 3D Software
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-red-100 text-red-700 rounded">
                            Authorized
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          ARES CAD, SketchUp, Chaos V-Ray &amp; Enscape
                        </p>
                      </div>
                    </Link>

                    {/* Section 2: 3D Printers & Scanners (Products) */}
                    <Link
                      to="/shop/products"
                      onClick={() => setActiveMegaMenu(null)}
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Printer className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            3D Printers &amp; Scanners
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded">
                            Products
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          FDM, DLP &amp; LCD printers &amp; 3D scanners
                        </p>
                      </div>
                    </Link>

                    {/* Section 3: 3D Printer Filaments */}
                    <Link
                      to="/shop/filaments"
                      onClick={() => setActiveMegaMenu(null)}
                      className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-red-50/50 border border-red-100/70 hover:border-red-200 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <CircleDot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            3D Printer Filaments
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-red-600 text-white rounded">
                            Make3D
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          PLA &amp; PLA+ in 8 vibrant colours (1 KG / 1.75 mm)
                        </p>
                      </div>
                    </Link>

                    {/* Quick sub-links */}
                    <div className="pt-2 border-t border-slate-100 px-1 grid grid-cols-2 gap-1 text-[11px]">
                      <Link
                        to="/shop?category=cad-software"
                        onClick={() => setActiveMegaMenu(null)}
                        className="px-2 py-1 rounded-md text-slate-600 hover:text-red-600 hover:bg-slate-50 truncate font-medium"
                      >
                        • CAD Software (13)
                      </Link>
                      <Link
                        to="/shop/fdm"
                        onClick={() => setActiveMegaMenu(null)}
                        className="px-2 py-1 rounded-md text-slate-600 hover:text-red-600 hover:bg-slate-50 truncate"
                      >
                        • FDM 3D Printers
                      </Link>
                      <Link
                        to="/shop/scanners"
                        onClick={() => setActiveMegaMenu(null)}
                        className="px-2 py-1 rounded-md text-slate-600 hover:text-red-600 hover:bg-slate-50 truncate"
                      >
                        • 3D Scanners
                      </Link>
                      <Link
                        to="/shop/filaments"
                        onClick={() => setActiveMegaMenu(null)}
                        className="px-2 py-1 rounded-md text-red-600 font-semibold hover:bg-red-50/60 truncate"
                      >
                        • All 8 Filaments →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* 6. Blogs */}
            <Link
              to="/blog"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <BookOpen className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/blog') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname.startsWith('/blog') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Blogs
              </span>
              {location.pathname.startsWith('/blog') && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* 7. About Us - FORCED SINGLE LINE */}
            <Link
              to="/about"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <User className={`w-4 h-4 transition-colors ${location.pathname === '/about' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/about' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                About Us
              </span>
              {location.pathname === '/about' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* 8. Contact */}
            <Link
              to="/contact"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <PhoneCall className={`w-4 h-4 transition-colors ${location.pathname === '/contact' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/contact' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Contact
              </span>
              {location.pathname === '/contact' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Inline Pill Search Bar */}
            <div
              onClick={openSearchModal}
              className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-400 cursor-pointer w-32 xl:w-36 transition-all border border-slate-200/70"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400">Search...</span>
            </div>

            {/* Mobile / Tablet Search Button */}
            <button
              onClick={openSearchModal}
              className="xl:hidden p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search directory"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1.5 text-slate-700 hover:text-red-600 transition-colors relative"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Highlighted Request a Demo Button */}
            <button
              onClick={() => openQuoteModal('3DeVOK 3D Scanner Demo Request')}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-orange-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Request a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE RESPONSIVE DRAWER ACCORDION */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[115px] bg-slate-950/60 z-50 backdrop-blur-sm">
          <div className="bg-white h-full max-w-sm w-full shadow-2xl p-4 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-sm font-semibold">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>

              {/* 1. CAD Software Accordion (FIRST in hierarchy) */}
              <div>
                <button
                  onClick={() => toggleMobileSection('cad-software')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  <span className="font-semibold">CAD Software</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileSection === 'cad-software' ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {expandedMobileSection === 'cad-software' && (
                  <div className="pl-4 py-1 space-y-2 border-l-2 border-red-100 ml-3">
                    <Link to="/products/cad-software" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold text-red-600 py-1">
                      View All CAD Software →
                    </Link>
                    {cadSoftwareCategories.map(cat => (
                      <div key={cat.id} className="pt-2">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="h-5 px-1.5 py-0.5 rounded bg-white border border-slate-200 flex items-center justify-center">
                            <img src={cat.logo} alt={cat.label} className="h-full w-auto max-w-[48px] object-contain" />
                          </div>
                          <span className="block text-xs font-bold text-slate-800">{cat.label}</span>
                        </div>
                        <div className="space-y-1.5">
                          {cat.products.map(p => (
                            <Link
                              key={p.slug}
                              to={`/products/${p.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-red-600 transition-colors"
                            >
                              <div className="relative w-8 h-8 rounded-md overflow-hidden border border-slate-200 shrink-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/95 p-0.5 rounded-xs flex items-center justify-center">
                                  <img src={cat.logo} alt="" className="w-full h-full object-contain" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold truncate">{p.name}</span>
                                <span className="block text-[10px] text-slate-400 truncate">{p.spec}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. 3D Printers Accordion (SECOND in hierarchy) */}
              <div>
                <button
                  onClick={() => toggleMobileSection('products')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  <span className="font-semibold">3D Printers</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileSection === 'products' ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {expandedMobileSection === 'products' && (
                  <div className="pl-4 py-1 space-y-2 border-l-2 border-red-100 ml-3">
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-bold text-red-600 py-1">
                      View All 3D Printers Catalog →
                    </Link>
                    {megaCategories.map(cat => (
                      <div key={cat.id} className="pt-1">
                        <Link
                          to={cat.route}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs font-bold text-slate-800 hover:text-red-600"
                        >
                          {cat.label}
                        </Link>
                        <div className="pl-2 pt-1 space-y-1">
                          {cat.products.map(p => (
                            <Link
                              key={p.slug}
                              to={`/products/${p.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-[11px] text-slate-500 hover:text-slate-900"
                            >
                              • {p.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Shop Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('shop')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  <span className="font-semibold">Shop (Software, 3D Printers &amp; Filaments)</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileSection === 'shop' ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {expandedMobileSection === 'shop' && (
                  <div className="pl-4 py-1 space-y-1 border-l-2 border-red-100 ml-3">
                    {shopLinks.map(s => (
                      <Link
                        key={s.route}
                        to={s.route}
                        className="block text-xs text-slate-600 hover:text-red-600 py-1"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              <Link to="/blog" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Blogs & Technical Articles
              </Link>
              <Link to="/about" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                About Us
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Contact
              </Link>
              <Link to="/wishlist" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Wishlist ({wishlistCount})
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openQuoteModal('3DeVOK 3D Scanner Mobile Demo Request')
                }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-xs font-bold rounded-xl shadow-md text-center flex items-center justify-center space-x-2"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Request a Demo</span>
              </button>
              <div className="text-center text-[11px] text-slate-500 pt-2">
                Tech Support: <a href={`tel:${siteConfig.supportPhone}`} className="text-red-600 font-bold">{siteConfig.supportPhone}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
export default Header

