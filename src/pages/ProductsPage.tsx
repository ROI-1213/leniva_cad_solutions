import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  RotateCcw,
  Printer,
  Layers,
  Box,
  Scan,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { products } from '../data/products'
import { getStoredProductsAsProducts } from '../utils/productCatalog'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import { Product } from '../types'

interface HardwareSectionConfig {
  id: string
  title: string
  subtitle: string
  techBadge: string
  badgeColor: string
  accentColor: string
  icon: any
  description: string
  categoryRoute: string
  categoryLabel: string
  matches: (p: Product) => boolean
}

// 3D Printers and Hardware Sections ONLY — NO CAD software
const PRINTER_SECTIONS: HardwareSectionConfig[] = [
  {
    id: 'fdm',
    title: 'FDM 3D Printers — Pratham Industrial Series',
    subtitle: 'CoreXY & Industrial Ball Screw Systems (170 mm Desktop to 1-Meter Monolithic Giants)',
    techBadge: 'COREXY & ALL-AXIS BALL SCREW',
    badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
    accentColor: '#0f172a',
    icon: Printer,
    description:
      'Engineered in India for production-grade reliability: heavy-duty mild steel chassis, industrial linear guides, high-temp extruders (up to 300°C), and build envelopes scaling from space-saving 170 mm desktop prototypes to 1000 mm giant monolithic workhorses.',
    categoryRoute: '/products/fdm-3d-printers',
    categoryLabel: 'Explore FDM Hub',
    matches: (p: Product) =>
      p.categorySlug === 'fdm-3d-printers' ||
      p.technology.toLowerCase().includes('fdm') ||
      p.id.startsWith('pratham-'),
  },
  {
    id: 'dlp',
    title: 'DLP Resin 3D Printers — EKA DLP Series',
    subtitle: 'Ultra-Precision Digital Light Processing for Direct Jewelry Casting & Dental Prosthetics',
    techBadge: 'INDUSTRIAL DLP OPTICAL ENGINE',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentColor: '#4f46e5',
    icon: Layers,
    description:
      'High-precision DLP resin systems delivering razor-sharp feature definition and sub-micron repeatability. Purpose-built for direct casting in gold and silver, dental crown/bridge patterns, and high-temp engineering micro-components.',
    categoryRoute: '/products/dlp-3d-printers',
    categoryLabel: 'Explore DLP Hub',
    matches: (p: Product) =>
      p.categorySlug === 'dlp-3d-printers' ||
      p.technology.toLowerCase().includes('dlp') ||
      ['eka-ht', 'eka-xl', 'eka-xle'].includes(p.id),
  },
  {
    id: 'lcd',
    title: 'Industrial LCD 3D Printers — EKA 8K & 16K Series',
    subtitle: 'Monochrome LCD Arrays with Sub-Micron Precision for Batch Manufacturing',
    techBadge: '8K & 16K MONOCHROME MASKING',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    accentColor: '#7c3aed',
    icon: Box,
    description:
      'Next-generation industrial monochrome LCD resin printers engineered for continuous production and maximum throughput. Featuring ultra-fine 16K detailing, uniform parallel matrix illumination, and massive build plates for batch manufacturing.',
    categoryRoute: '/products/industrial-lcd-3d-printers',
    categoryLabel: 'Explore LCD Hub',
    matches: (p: Product) =>
      p.categorySlug === 'industrial-lcd-3d-printers' ||
      p.technology.toLowerCase().includes('lcd') ||
      ['eka-gt-max', 'eka-f1-16k'].includes(p.id),
  },
  {
    id: 'scanners',
    title: 'Precision 3D Scanners & Reverse Engineering',
    subtitle: 'High-Speed Handheld & Optical Coordinate Laser Digitizers',
    techBadge: 'HYBRID BLUE & IR LASER METROLOGY',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    icon: Scan,
    description:
      'Industrial-grade handheld and hybrid laser 3D scanners capturing millions of measurements per second down to 0.04 mm accuracy. Engineered for reverse engineering, rapid quality inspection, and full-color 3D reality capture.',
    categoryRoute: '/products/3d-scanners',
    categoryLabel: 'Explore Scanners Hub',
    matches: (p: Product) =>
      p.categorySlug === '3d-scanners' ||
      p.technology.toLowerCase().includes('scanner') ||
      p.brand === '3DeVOK' ||
      p.brand === 'SHINING 3D',
  },
]

export const ProductsPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured')

  useEffect(() => {
    document.title = '3D Printers Catalog | Industrial FDM, DLP & LCD Systems | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore industrial Make3D 3D printers organized section-wise: Pratham FDM series (desktop to 1-meter), EKA DLP resin casting systems, and EKA 16K industrial LCD printers.'
      )
    }
  }, [])

  // Technology Categories Hubs Data (Hardware only — NO CAD)
  const categoryHubs = [
    {
      id: 'fdm',
      title: 'FDM 3D Printers',
      tag: 'PRATHAM SERIES',
      description: 'Industrial CoreXY & heated-chamber FDM systems from 170 mm desktop to 1-meter monolithic giants.',
      icon: Printer,
      route: '/products/fdm-3d-printers',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      flagships: ['Pratham 3.0', 'Pratham 6.0', 'Pratham Desktop', 'Pratham Mini', 'Pratham 3 Rapid', 'Pratham X (1000)'],
    },
    {
      id: 'dlp',
      title: 'DLP Resin 3D Printers',
      tag: 'EKA DLP SERIES',
      description: 'Ultra-precision resin systems for direct jewelry casting, dental models, and sub-micron micro-mechanics.',
      icon: Layers,
      route: '/products/dlp-3d-printers',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      flagships: ['EKA HT (Casting)', 'EKA XL (Large)', 'EKA XLE (Engineering)'],
    },
    {
      id: 'lcd',
      title: 'Industrial LCD 3D Printers',
      tag: 'EKA 8K & 16K SERIES',
      description: 'Monochrome LCD resin systems with up to 16K resolution for high-throughput batch production.',
      icon: Box,
      route: '/products/industrial-lcd-3d-printers',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      flagships: ['EKA GT MAX (8K)', 'EKA F1 16K (Micro Detail)'],
    },
    {
      id: 'scanners',
      title: 'Precision 3D Scanners',
      tag: '3DEVOK & EINSTAR',
      description: 'Handheld & optical coordinate laser digitizers capturing millions of points down to 0.04 mm accuracy.',
      icon: Scan,
      route: '/products/3d-scanners',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      flagships: ['3DeVOK MT (Hybrid Laser)', '3DeVOK MQ (Color 3D)', 'EINSTAR Handheld'],
    },
  ]

  // Filter individual product matching search & section criteria
  // EXCLUDES all CAD software products
  const isProductMatching = (p: Product): boolean => {
    // Explicitly exclude CAD software
    if (
      p.categorySlug === 'cad-software' ||
      p.technology.toLowerCase().includes('software') ||
      ['Trimble', 'Graebert', 'Chaos'].includes(p.brand)
    ) {
      return false
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      const matchName = p.name.toLowerCase().includes(q)
      const matchBrand = p.brand.toLowerCase().includes(q)
      const matchDesc = p.description.toLowerCase().includes(q)
      const matchTech = p.technology.toLowerCase().includes(q)
      const matchTagline = (p.tagline || '').toLowerCase().includes(q)
      const matchApp = p.applications.some((app) => app.toLowerCase().includes(q))
      return matchName || matchBrand || matchDesc || matchTech || matchTagline || matchApp
    }

    return true
  }

  // Live stored products catalog (includes newly added custom products from admin)
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    try {
      return getStoredProductsAsProducts()
    } catch {
      return products
    }
  })

  useEffect(() => {
    const handleUpdate = () => {
      try {
        setAllProducts(getStoredProductsAsProducts())
      } catch (err) {
        console.error('Failed to update live products in ProductsPage', err)
      }
    }
    window.addEventListener('leniva_products_catalog_updated', handleUpdate)
    return () => window.removeEventListener('leniva_products_catalog_updated', handleUpdate)
  }, [])

  // Filter hardware products only (strictly no CAD software)
  const hardwareProducts = useMemo(() => {
    return allProducts.filter(
      (p) =>
        p.categorySlug !== 'cad-software' &&
        !p.technology.toLowerCase().includes('software') &&
        !['Trimble', 'Graebert', 'Chaos'].includes(p.brand)
    )
  }, [allProducts])

  // Group products by hardware sections
  const activeSections = useMemo(() => {
    return PRINTER_SECTIONS.map((section) => {
      // Find all products matching this section
      let sectionProds = hardwareProducts.filter(section.matches)

      // Filter by search query
      sectionProds = sectionProds.filter(isProductMatching)

      // Sort
      sectionProds.sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        }
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
        return 0
      })

      return {
        ...section,
        products: sectionProds,
        totalSectionCount: hardwareProducts.filter(section.matches).length,
      }
    }).filter((section) => {
      // If section filter is active, only show the selected section
      if (selectedSection !== 'all' && section.id !== selectedSection) {
        return false
      }
      // If search query is active, only show sections with matching products
      if (searchQuery && section.products.length === 0) {
        return false
      }
      return true
    })
  }, [selectedSection, searchQuery, sortBy, hardwareProducts])

  // Total products currently visible across all sections
  const totalVisibleProducts = useMemo(() => {
    return activeSections.reduce((acc, section) => acc + section.products.length, 0)
  }, [activeSections])

  const total3DPrintersCount = useMemo(() => {
    return hardwareProducts.filter((p) => p.categorySlug !== '3d-scanners' && !p.technology.toLowerCase().includes('scanner')).length
  }, [hardwareProducts])

  const resetFilters = () => {
    setSelectedSection('all')
    setSearchQuery('')
    setSortBy('featured')
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 space-y-12 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ====================================================
            1. BREADCRUMB NAVIGATION
           ==================================================== */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">3D Printers</span>
        </nav>

        {/* ====================================================
            2. PAGE HERO BANNER (DEDICATED TO 3D PRINTERS)
           ==================================================== */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 p-8 sm:p-12 lg:p-14">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>OFFICIAL MAKE3D HARDWARE SHOWROOM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Industrial &amp; Desktop 3D Printers
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              India’s premier industrial additive manufacturing systems. Explore verified CoreXY and all-axis ball screw
              industrial FDM printers (from 170 mm desktop prototypes to 1-meter monolithic workhorses), direct-casting DLP
              resin printers, and 16K ultra-high resolution monochrome LCD systems.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal('3D Printers Catalog Inquiry')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Request Machine Quotation
              </button>
              <button
                onClick={() => openQuoteModal('Book a 3D Printer Demonstration')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Book a Live Demo
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            3. DEDICATED HARDWARE CATEGORY HUBS GRID
           ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Explore 3D Printers by Technology
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Navigate to dedicated category showrooms with detailed machine architectures and sample parts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryHubs.map((hub) => {
              const Icon = hub.icon
              return (
                <div
                  key={hub.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${hub.badgeColor}`}
                      >
                        {hub.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-950 group-hover:text-red-600 transition-colors">
                      {hub.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {hub.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                        Featured Models:
                      </span>
                      <div className="flex flex-wrap gap-1 text-[11px] font-semibold text-slate-700">
                        {hub.flagships.map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-slate-50 rounded border border-slate-200/80"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={hub.route}
                    className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl text-center shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>View Category Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* ====================================================
            4. SEARCH & SECTION FILTERING CONTROLS
           ==================================================== */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
          {/* Top Bar: Search & Select Dropdowns */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 3D printers (e.g. Pratham 3.0, GT MAX, 16K, Rapid, X 1000)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            </div>

            {/* Filter Dropdowns and Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end text-xs">
              {/* Section Filter Dropdown */}
              <div className="flex items-center space-x-1.5">
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-500">Section:</span>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-hidden bg-white font-medium text-slate-800 cursor-pointer"
                >
                  <option value="all">All 3D Printer Sections ({total3DPrintersCount} printers)</option>
                  <option value="fdm">FDM 3D Printers (Pratham Series) (8)</option>
                  <option value="dlp">DLP Resin 3D Printers (EKA Series) (3)</option>
                  <option value="lcd">Industrial LCD 3D Printers (EKA 8K/16K) (2)</option>
                  <option value="scanners">Precision 3D Scanners (3)</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-hidden bg-white font-medium text-slate-800 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              {(selectedSection !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Section Quick-Filter Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Display by Section:</span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedSection('all')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedSection === 'all'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sections ({hardwareProducts.length})
              </button>
              <button
                onClick={() => setSelectedSection('fdm')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedSection === 'fdm'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                1. FDM 3D Printers — Pratham (8)
              </button>
              <button
                onClick={() => setSelectedSection('dlp')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedSection === 'dlp'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                2. DLP Resin Printers — EKA (3)
              </button>
              <button
                onClick={() => setSelectedSection('lcd')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedSection === 'lcd'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3. Industrial LCD Printers — 8K/16K (2)
              </button>
              <button
                onClick={() => setSelectedSection('scanners')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedSection === 'scanners'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                4. 3D Scanners (3)
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{totalVisibleProducts}</strong> hardware models across{' '}
            <strong className="text-slate-900 font-semibold">{activeSections.length}</strong> technology section{activeSections.length === 1 ? '' : 's'}
          </span>
          <span className="hidden sm:inline">
            Official Leniva CAD Solutions &amp; Make3D India Hardware Directory
          </span>
        </div>

        {/* ====================================================
            5. 3D PRINTERS DISPLAYED SECTION-WISE
           ==================================================== */}
        {activeSections.length > 0 && totalVisibleProducts > 0 ? (
          <div className="space-y-16">
            {activeSections.map((section, sectionIndex) => (
              <section key={section.id} id={section.id} className="space-y-6">
                {/* Dedicated Section Showcase Header Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                  {/* Color Accent Bar on the left */}
                  <div
                    className="absolute top-0 left-0 bottom-0 w-2.5"
                    style={{ backgroundColor: section.accentColor }}
                  />

                  <div className="flex items-center space-x-3 pl-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white shrink-0">
                      Section {sectionIndex + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-950 tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Action Link */}
                  <div className="flex items-center shrink-0 pl-3">
                    <Link
                      to={section.categoryRoute}
                      className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-1.5 shadow-2xs"
                    >
                      <span>{section.categoryLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                  {/* Section Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {section.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              )
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-sm">
            <p className="text-base font-bold text-slate-800">
              No 3D printers or hardware models match your current search or filter criteria.
            </p>
            <p className="text-xs text-slate-500">
              Try searching for "Pratham", "Desktop", "EKA", "GT MAX", "16K", or "Rapid".
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
