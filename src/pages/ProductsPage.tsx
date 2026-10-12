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
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'

export const ProductsPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [selectedTech, setSelectedTech] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured')

  useEffect(() => {
    document.title = 'Products Catalog | 3D Printers, Scanners & CAD Software | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore industrial Make3D 3D printers, Pratham FDM series, EKA DLP & LCD resin systems, 3DeVOK metrology scanners, and genuine CAD software suites.'
      )
    }
  }, [])

  // Technology Categories Hubs Data
  const categoryHubs = [
    {
      id: 'cad',
      title: 'CAD & Visualization Software',
      tag: 'TRIMBLE • GRAEBERT • CHAOS',
      description: 'Official Trimble SketchUp Pro, Graebert ARES Trinity DWG CAD, Chaos V-Ray & Enscape rendering suites.',
      icon: Layers,
      route: '/products/cad-software',
      accent: 'border-red-500 hover:border-red-600',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      flagships: ['SketchUp Pro', 'ARES Standard', 'ARES Commander', 'Chaos V-Ray', 'Enscape'],
    },
    {
      id: 'fdm',
      title: 'FDM 3D Printers',
      tag: 'PRATHAM SERIES',
      description: 'Industrial CoreXY & heated-chamber FDM systems from 120 mm desktop to 1-meter giants.',
      icon: Printer,
      route: '/products/fdm-3d-printers',
      accent: 'border-slate-300 hover:border-slate-800',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      flagships: ['Pratham 3.0', 'Pratham 6.0', 'Pratham Desktop', 'Pratham Mini', 'Pratham 3 Rapid'],
    },
    {
      id: 'dlp',
      title: 'DLP & LCD Resin 3D Printers',
      tag: 'EKA DLP & 16K MONOCHROME',
      description: 'Ultra-precision resin systems for direct jewelry casting, dental models, and sub-micron micro-mechanics.',
      icon: Box,
      route: '/products/dlp-3d-printers',
      accent: 'border-slate-300 hover:border-slate-800',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      flagships: ['EKA HT', 'EKA XL', 'EKA XLE', 'EKA GT MAX (8K)', 'EKA F1 16K'],
    },
    {
      id: 'scanners',
      title: '3D Scanners & Metrology',
      tag: '★ HIGHLIGHTED • METROLOGY',
      description: 'Handheld & optical coordinate laser digitizers capturing millions of points per second down to 0.04 mm.',
      icon: Scan,
      route: '/products/3d-scanners',
      accent: 'border-2 border-red-600 shadow-md ring-2 ring-red-500/20',
      badgeColor: 'bg-red-600 text-white border-red-600',
      flagships: ['3DeVOK MT (Hybrid Laser)', '3DeVOK MQ (Color 3D)', 'EINSTAR Handheld'],
    },
  ]

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedTech !== 'all') {
          if (selectedTech === 'fdm' && !p.technology.toLowerCase().includes('fdm')) return false
          if (selectedTech === 'dlp' && !p.technology.toLowerCase().includes('dlp')) return false
          if (selectedTech === 'lcd' && !p.technology.toLowerCase().includes('lcd')) return false
          if (selectedTech === 'scanners' && !p.technology.toLowerCase().includes('scanner')) return false
          if (selectedTech === 'cad' && !p.technology.toLowerCase().includes('software')) return false
        }
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.technology.toLowerCase().includes(q) ||
            p.tagline.toLowerCase().includes(q) ||
            p.applications.some((app) => app.toLowerCase().includes(q))
          )
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        }
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
        return 0
      })
  }, [selectedTech, selectedBrand, searchQuery, sortBy])

  const resetFilters = () => {
    setSelectedTech('all')
    setSelectedBrand('all')
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
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Products Catalog</span>
        </nav>

        {/* ====================================================
            2. PAGE HERO BANNER
           ==================================================== */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 p-8 sm:p-12 lg:p-14">
          {/* Subtle Grid overlay */}
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
              <span>OFFICIAL PRODUCT SHOWROOM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Industrial 3D Printers, 3D Scanners &amp; CAD Solutions
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              India’s comprehensive lineup of verified additive manufacturing hardware — from high-speed CoreXY
              industrial FDM machines and 16K jewelry DLP/LCD printers to optical metrology scanners and professional CAD suites.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal('Master Products Catalog Inquiry')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Request Product Pricing
              </button>
              <button
                onClick={() => openQuoteModal('Book a Machine Demonstration')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors cursor-pointer"
              >
                Book a Live Demo
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            3. DEDICATED CATEGORY HUBS GRID
           ==================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Explore by Technology Division
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
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${hub.badgeColor}`}>
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
                          <span key={i} className="px-2 py-0.5 bg-slate-50 rounded border border-slate-200/80">
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
            4. SEARCH & FILTERING CONTROLS
           ==================================================== */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models (e.g. Pratham 3.0, GT MAX, 16K, 3DeVOK)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            </div>

            {/* Filter Dropdowns and Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end text-xs">
              {/* Brand Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-hidden bg-white font-medium text-slate-800"
                >
                  <option value="all">All Brands</option>
                  <option value="Pratham">Pratham (Make3D FDM)</option>
                  <option value="EKA">EKA (Make3D DLP &amp; LCD)</option>
                  <option value="3DeVOK">3DeVOK Scanners</option>
                  <option value="SHINING 3D">SHINING 3D (EINSTAR)</option>
                  <option value="Graebert">Graebert (ARES CAD)</option>
                  <option value="Trimble">Trimble (SketchUp)</option>
                  <option value="Chaos">Chaos (Enscape/V-Ray)</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-hidden bg-white font-medium text-slate-800"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              {(selectedTech !== 'all' || selectedBrand !== 'all' || searchQuery) && (
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

          {/* Quick Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => setSelectedTech('all')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                selectedTech === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Hardware &amp; Software ({products.length})
            </button>
            {/* 1. CAD Software First */}
            <button
              onClick={() => setSelectedTech('cad')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                selectedTech === 'cad'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              CAD &amp; Rendering Software
            </button>
            {/* 2. 3D Printers Second */}
            <button
              onClick={() => setSelectedTech('fdm')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                selectedTech === 'fdm'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              FDM 3D Printers
            </button>
            <button
              onClick={() => setSelectedTech('dlp')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                selectedTech === 'dlp'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              DLP &amp; LCD Resin Printers
            </button>
            {/* 3. 3D Scanners Third - HIGHLIGHTED */}
            <button
              onClick={() => setSelectedTech('scanners')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-bold cursor-pointer border flex items-center space-x-1.5 ${
                selectedTech === 'scanners'
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              <span>3D Scanners (Metrology)</span>
              <span className={`px-1.5 py-0.2 text-[9px] uppercase font-black rounded ${selectedTech === 'scanners' ? 'bg-white text-red-600' : 'bg-red-600 text-white'}`}>
                ★ Highlighted
              </span>
            </button>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> verified engineering solutions
          </span>
          <span className="hidden sm:inline">
            Official Leniva CAD Solutions &amp; Make3D India Hardware Directory
          </span>
        </div>

        {/* ====================================================
            5. PRODUCTS GRID
           ==================================================== */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-800">
              No products match your current search or filter criteria.
            </p>
            <p className="text-xs text-slate-500">
              Try searching for "Pratham", "EKA", "8K", "16K", or "3DeVOK".
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ====================================================
            6. INDUSTRIAL QUALITY & SUPPORT ASSURANCE BANNER
           ==================================================== */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">Official Manufacturer Warranty</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                All Make3D printers and 3DeVOK scanners include complete manufacturer warranty and genuine spare parts.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">Dedicated Onsite Support</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Direct commissioning, calibration, and engineering team onboarding at your facility across India.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">Free Benchmark Sample Parts</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Send your CAD files to evaluate tolerances, surface finish, and mechanical properties before purchasing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
