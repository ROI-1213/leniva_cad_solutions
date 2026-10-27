import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
import { getStoredNavigationConfig, MasterNavigationConfig } from '../utils/navigationConfig'

export const Header: React.FC = () => {
  const { wishlistCount, openQuoteModal, openSearchModal, liveSiteSettings } = useApp()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [activeMegaCategory, setActiveMegaCategory] = useState<'fdm' | 'dlp' | 'lcd' | 'scanners' | 'filaments'>('fdm')
  const [activeCADCategory, setActiveCADCategory] = useState<'ares' | 'sketchup' | 'chaos'>('ares')
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)

  const [navConfig, setNavConfig] = useState<MasterNavigationConfig>(getStoredNavigationConfig)

  useEffect(() => {
    const handleNavUpdate = () => {
      setNavConfig(getStoredNavigationConfig())
    }
    window.addEventListener('leniva_nav_config_updated', handleNavUpdate)
    window.addEventListener('storage', handleNavUpdate)
    return () => {
      window.removeEventListener('leniva_nav_config_updated', handleNavUpdate)
      window.removeEventListener('storage', handleNavUpdate)
    }
  }, [])

  const getHardwareCategoryIcon = (id: string) => {
    switch (id) {
      case 'fdm': return Printer
      case 'dlp': return Layers
      case 'lcd': return Box
      case 'scanners': return Scan
      case 'filaments': return CircleDot
      default: return Box
    }
  }

  const normalizeProductUrl = (rawSlug: string): string => {
    if (!rawSlug) return '/products'
    if (rawSlug.startsWith('http://') || rawSlug.startsWith('https://')) return rawSlug
    let clean = rawSlug.trim()
    while (clean.startsWith('/')) {
      clean = clean.substring(1)
    }
    if (clean.startsWith('products/')) {
      clean = clean.replace(/^products\/+/, '')
    }
    if (clean.startsWith('product/')) {
      clean = clean.replace(/^product\/+/, '')
    }
    if (clean.startsWith('shop/filaments/')) {
      return `/${clean}`
    }
    if (clean.startsWith('filaments/')) {
      return `/shop/${clean}`
    }
    return `/products/${clean}`
  }

  const megaCategories = navConfig.hardwareMegaMenu.categories.map(cat => ({
    ...cat,
    icon: getHardwareCategoryIcon(cat.id),
  }))

  const cadSoftwareCategories = navConfig.cadMegaMenu.categories

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
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
      setIsScrolled(scrollY > 15)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMegaMenu(null)
  }, [location])

  // Global event listeners to open/toggle the mobile navigation menu from anywhere (footer, sections, sticky buttons)
  useEffect(() => {
    const handleOpen = () => setIsMobileMenuOpen(true)
    const handleClose = () => setIsMobileMenuOpen(false)
    const handleToggle = () => setIsMobileMenuOpen(prev => !prev)

    window.addEventListener('leniva_open_mobile_menu', handleOpen)
    window.addEventListener('leniva_close_mobile_menu', handleClose)
    window.addEventListener('leniva_toggle_mobile_menu', handleToggle)

    return () => {
      window.removeEventListener('leniva_open_mobile_menu', handleOpen)
      window.removeEventListener('leniva_close_mobile_menu', handleClose)
      window.removeEventListener('leniva_toggle_mobile_menu', handleToggle)
    }
  }, [])

  // Lock background body scroll when mobile menu is open without losing the current scroll position at the footer or sections
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isMobileMenuOpen])


  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(prev => (prev === section ? null : section))
  }

  return (
    <header
      ref={headerRef}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-slate-50'
      }`}
    >
      {/* Dynamic Top Announcement Notice from Admin */}
      {liveSiteSettings.bannerNotice && (
        <div
          className={`bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-[11px] sm:text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-12 py-1.5 px-4 opacity-100'
          }`}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>{liveSiteSettings.bannerNotice}</span>
        </div>
      )}

      {/* 1. TOP UTILITY STRIP (Light matching user mockup) */}
      <div
        className={`transition-all duration-300 overflow-hidden bg-slate-50 ${
          isScrolled
            ? 'max-h-0 py-0 opacity-0 pointer-events-none border-transparent'
            : 'max-h-16 py-1.5 px-3 sm:px-6 lg:px-8 border-b border-slate-200/70 text-xs text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          {/* Left contact info */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[11px] sm:text-xs shrink-0">
            <a
              href={`mailto:${liveSiteSettings.email}`}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{liveSiteSettings.email}</span>
            </a>
            <a
              href={`tel:${liveSiteSettings.phone}`}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{liveSiteSettings.phone}</span>
            </a>
            <div className="flex items-center space-x-1.5 text-slate-600 shrink-0">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center shrink-0">
                <Target className="w-2.5 h-2.5 text-emerald-600" />
              </span>
              <span>Technical Support: <strong className="text-slate-800 font-semibold">{liveSiteSettings.secondaryPhone || siteConfig.supportPhone}</strong></span>
            </div>
          </div>

          {/* Right Links & Social Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px] sm:text-xs text-slate-600 shrink-0">
            <Link to="/warranty" className="flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-colors shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Warranty & Support</span>
            </Link>
            <div className="flex items-center space-x-2 text-slate-500 shrink-0">
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

      {/* 2. STICKY WHITE NAVBAR (Pins cleanly to top upon scroll) */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/10 border-b border-slate-200/80 py-1.5' 
          : 'bg-slate-50/95 py-2 sm:py-2.5'
      }`}>
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className={`max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between relative transition-all ${
            isScrolled ? 'shadow-lg shadow-slate-900/10 border-slate-300' : 'shadow-md'
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
            <div className="h-8 w-[1.5px] bg-slate-200 mx-2.5 xl:mx-3 hidden xl:block" />
            <div className="hidden xl:flex flex-col text-[10px] leading-[1.15] text-slate-400 font-medium whitespace-nowrap">
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

            {/* 2. About Us */}
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

            {/* 3. CAD Software Mega Menu (FIRST in hierarchy) */}
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
                                    to={normalizeProductUrl(prod.slug)}
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
                        <span>{navConfig.cadMegaMenu.consultationText}</span>
                        <button
                          onClick={() => {
                            setActiveMegaMenu(null)
                            openQuoteModal('CAD Software Consultation')
                          }}
                          className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          {navConfig.cadMegaMenu.consultationBtnText}
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
                                    to={normalizeProductUrl(prod.slug)}
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
                        <span>{navConfig.hardwareMegaMenu.consultationText}</span>
                        <button
                          onClick={() => {
                            setActiveMegaMenu(null)
                            openQuoteModal('3D Printer Inquiry')
                          }}
                          className="font-bold text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          {navConfig.hardwareMegaMenu.consultationBtnText}
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[620px] max-w-[92vw] animate-fade-in">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden">
                    {/* Header Banner */}
                    <div className="px-5 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {navConfig.shopDropdown.bannerTitle}
                        </span>
                      </div>
                      <Link
                        to={navConfig.shopDropdown.allStoreRoute}
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 group/link"
                      >
                        <span>{navConfig.shopDropdown.allStoreLinkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* Main Categories Section */}
                    <div className="p-4 space-y-2.5">
                      {navConfig.shopDropdown.cards.map(card => {
                        const Icon = card.iconType === 'cad' ? Layers : card.iconType === 'printer' ? Printer : CircleDot
                        const iconBg = card.iconType === 'cad' ? 'bg-blue-50 text-blue-600' : card.iconType === 'printer' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-600'
                        return (
                          <Link
                            key={card.id}
                            to={card.route}
                            onClick={() => setActiveMegaMenu(null)}
                            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-3.5 min-w-0">
                              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200 shadow-2xs`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                    {card.title}
                                  </span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 ${card.badgeBg} ${card.badgeText} rounded-full`}>
                                    {card.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                  {card.description}
                                </p>
                              </div>
                            </div>
                            <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-red-100 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors shrink-0 ml-3">
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    {/* Quick Category Shortcuts Strip */}
                    <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Quick Shortcuts
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {navConfig.shopDropdown.shortcuts.map((sc, idx) => (
                          <Link
                            key={idx}
                            to={sc.route}
                            onClick={() => setActiveMegaMenu(null)}
                            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 hover:border-red-300 hover:text-red-600 text-slate-700 text-xs font-medium text-center transition-colors shadow-2xs truncate"
                          >
                            {sc.label}
                          </Link>
                        ))}
                      </div>
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

        {/* MOBILE & TABLET HORIZONTAL RIBBON BAR (Ensures all ribbon options are viewable & accessible on mobile) */}
        <div className="lg:hidden max-w-7xl mx-auto mt-1.5 bg-white/95 rounded-xl border border-slate-200/90 px-2 py-1.5 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link
              to="/"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname === '/' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname === '/about' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>About Us</span>
            </Link>
            <Link
              to="/products/cad-software"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname.startsWith('/products/cad-software') || location.pathname.includes('ares') || location.pathname.includes('sketchup') || location.pathname.includes('enscape') || location.pathname.includes('vray') || location.pathname.includes('corona')
                  ? 'bg-red-600 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>CAD Software</span>
            </Link>
            <Link
              to="/products"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname === '/products' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              <span>3D Printers</span>
            </Link>
            <Link
              to="/products/3d-scanners"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname.includes('scanner') ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Scan className="w-3.5 h-3.5 shrink-0" />
              <span>3D Scanners</span>
            </Link>
            <Link
              to="/shop"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname.startsWith('/shop') ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              <span>Shop</span>
            </Link>
            <Link
              to="/blog"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname.startsWith('/blog') ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>Blogs</span>
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                location.pathname === '/contact' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>Contact</span>
            </Link>
            <button
              onClick={() => openQuoteModal('Product Demo Request')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs shrink-0 cursor-pointer"
            >
              <span>Request a Demo</span>
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* 3. MOBILE RESPONSIVE FORMAL DRAWER (Mounted via React Portal directly into document.body to guarantee 100% visibility at any scroll depth, footer, or section) */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex justify-end transition-opacity duration-300"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white h-[100dvh] w-[88vw] max-w-sm sm:max-w-md shadow-2xl flex flex-col justify-between overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-300 relative z-[100000]"
            onClick={e => e.stopPropagation()}
          >
            {/* Formal Executive Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-slate-950 text-white shrink-0 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-black text-white text-sm shadow-md ring-1 ring-white/20">
                  3D
                </div>
                <div>
                  <div className="text-sm font-black tracking-wide text-white leading-tight uppercase">
                    Leniva CAD Solutions
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                    Navigation Menu
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 divide-y divide-slate-100">
              {/* Quick Search Shortcut */}
              <div className="pb-2">
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openSearchModal()
                  }}
                  className="flex items-center space-x-2.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-slate-400 cursor-pointer border border-slate-200/70 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-500 truncate">Search products, CAD software, scanners...</span>
                </div>
              </div>

              {/* Main Menu Links & Accordions */}
              <div className="pt-2 space-y-1">
                {/* Home */}
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Home className={`w-4 h-4 ${location.pathname === '/' ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* About Us */}
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/about' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className={`w-4 h-4 ${location.pathname === '/about' ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">About Us</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* 1. CAD Software Accordion (FIRST in hierarchy) */}
                <div className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection('cad-software')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      location.pathname.startsWith('/products/cad-software') || expandedMobileSection === 'cad-software'
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-800 hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Layers className={`w-4 h-4 ${expandedMobileSection === 'cad-software' ? 'text-red-600' : 'text-slate-500'}`} />
                      <span className="text-sm">CAD Software</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">Official</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMobileSection === 'cad-software' ? 'rotate-180 text-red-600' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </button>

                  {expandedMobileSection === 'cad-software' && (
                    <div className="mt-1 pl-3 pr-2 py-2 space-y-2.5 bg-slate-50/70 rounded-xl border border-slate-200/80 animate-in fade-in duration-150">
                      <Link
                        to="/products/cad-software"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        <span>Explore All CAD Software</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {navConfig.cadMegaMenu.categories.map(cat => (
                        <div key={cat.id} className="pt-1.5 border-t border-slate-200/60 first:border-0 first:pt-0">
                          <div className="flex items-center gap-2 mb-1.5 px-2">
                            <div className="h-5 px-1.5 py-0.5 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0">
                              <img src={cat.logo} alt={cat.label} className="h-full w-auto max-w-[48px] object-contain" />
                            </div>
                            <span className="text-xs font-bold text-slate-900">{cat.label}</span>
                          </div>
                          <div className="space-y-1">
                            {cat.products.map(p => (
                              <Link
                                key={p.slug}
                                to={normalizeProductUrl(p.slug)}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white text-slate-700 hover:text-red-600 transition-colors border border-transparent hover:border-slate-200 shadow-2xs"
                              >
                                <div className="relative w-8 h-8 rounded-md overflow-hidden border border-slate-200 bg-white shrink-0">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="block text-xs font-bold truncate text-slate-800">{p.name}</span>
                                  <span className="block text-[10px] text-slate-500 truncate">{p.spec}</span>
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
                <div className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection('products')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      location.pathname.startsWith('/products') && !location.pathname.startsWith('/products/cad-software') && !location.pathname.includes('scanner')
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-800 hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Printer className={`w-4 h-4 ${expandedMobileSection === 'products' ? 'text-red-600' : 'text-slate-500'}`} />
                      <span className="text-sm">3D Printers</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">Hardware</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMobileSection === 'products' ? 'rotate-180 text-red-600' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </button>

                  {expandedMobileSection === 'products' && (
                    <div className="mt-1 pl-3 pr-2 py-2 space-y-2.5 bg-slate-50/70 rounded-xl border border-slate-200/80 animate-in fade-in duration-150">
                      <Link
                        to="/products"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        <span>View All 3D Printers</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {navConfig.hardwareMegaMenu.categories.map(cat => (
                        <div key={cat.id} className="pt-1.5 border-t border-slate-200/60 first:border-0 first:pt-0">
                          <Link
                            to={cat.route}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs font-bold text-slate-900 hover:text-red-600 px-2 py-1"
                          >
                            {cat.label}
                          </Link>
                          <div className="space-y-1 pl-2">
                            {cat.products.map(p => (
                              <Link
                                key={p.slug}
                                to={normalizeProductUrl(p.slug)}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-xs text-slate-600 hover:text-red-600 py-0.5 font-medium"
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

                {/* 3. 3D Scanners */}
                <Link
                  to="/products/3d-scanners"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname.includes('scanner') ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Scan className={`w-4 h-4 ${location.pathname.includes('scanner') ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">3D Scanners</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* 4. Shop Accordion */}
                <div className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection('shop')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                      location.pathname.startsWith('/shop')
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-800 hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className={`w-4 h-4 ${expandedMobileSection === 'shop' ? 'text-red-600' : 'text-slate-500'}`} />
                      <span className="text-sm">Shop ({navConfig.shopDropdown.bannerTitle})</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedMobileSection === 'shop' ? 'rotate-180 text-red-600' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {expandedMobileSection === 'shop' && (
                    <div className="mt-1 pl-3 pr-2 py-2 space-y-2 bg-slate-50/70 rounded-xl border border-slate-200/80 animate-in fade-in duration-150">
                      <Link
                        to={navConfig.shopDropdown.allStoreRoute}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1"
                      >
                        <span>{navConfig.shopDropdown.allStoreLinkText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {navConfig.shopDropdown.cards.map(card => (
                        <Link
                          key={card.id}
                          to={card.route}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-slate-700 hover:text-red-600 px-2 py-1 font-medium"
                        >
                          • {card.title} <span className="text-[10px] text-slate-400">({card.badge})</span>
                        </Link>
                      ))}
                      <div className="pt-1 border-t border-slate-200/60 space-y-1">
                        {navConfig.shopDropdown.shortcuts.map((sc, idx) => (
                          <Link
                            key={idx}
                            to={sc.route}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-xs text-slate-500 hover:text-red-600 px-2 py-0.5"
                          >
                            → {sc.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Blogs */}
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname.startsWith('/blog') ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className={`w-4 h-4 ${location.pathname.startsWith('/blog') ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">Blogs & Technical Articles</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* 6. Contact */}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/contact' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <PhoneCall className={`w-4 h-4 ${location.pathname === '/contact' ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">Contact Us</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* 7. Warranty & Support */}
                <Link
                  to="/warranty"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/warranty' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className={`w-4 h-4 ${location.pathname === '/warranty' ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">Warranty & Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </Link>

                {/* 8. Wishlist */}
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    location.pathname === '/wishlist' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className={`w-4 h-4 ${location.pathname === '/wishlist' ? 'text-red-600' : 'text-slate-500'}`} />
                    <span className="text-sm">Saved Wishlist</span>
                  </div>
                  {wishlistCount > 0 ? (
                    <span className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded-full">
                      {wishlistCount}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  )}
                </Link>
              </div>
            </div>

            {/* Formal Executive Footer Actions */}
            <div className="shrink-0 p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openQuoteModal('Product Consultation & Demo Request')
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-700 text-white text-xs font-extrabold rounded-xl shadow-md text-center flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Request a Consultation / Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 px-1">
                <a
                  href={`tel:${liveSiteSettings.secondaryPhone || siteConfig.supportPhone}`}
                  className="flex items-center space-x-1.5 hover:text-red-600 font-medium"
                >
                  <Phone className="w-3 h-3 text-red-600" />
                  <span>{liveSiteSettings.secondaryPhone || siteConfig.supportPhone}</span>
                </a>
                <a
                  href="mailto:viju@leniva3d.com"
                  className="flex items-center space-x-1.5 hover:text-red-600 font-medium"
                >
                  <Mail className="w-3 h-3 text-red-600" />
                  <span>viju@leniva3d.com</span>
                </a>
              </div>

              <div className="text-[10px] text-center text-slate-400">
                Leniva CAD Solutions • Bangalore, India
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  )
}
export default Header

