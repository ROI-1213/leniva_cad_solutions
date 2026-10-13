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
  Building2,
  Tag,
} from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import { Product } from '../types'

interface BrandGroupConfig {
  id: string
  name: string
  shortName: string
  partnerBadge: string
  badgeColor: string
  logo?: string
  accentBorder: string
  description: string
  categoryRoute: string
  categoryLabel: string
  techCategory: 'cad' | 'fdm' | 'dlp' | 'scanners'
  matches: (p: Product) => boolean
}

const BRAND_GROUPS: BrandGroupConfig[] = [
  {
    id: 'trimble',
    name: 'Trimble (SketchUp)',
    shortName: 'Trimble SketchUp',
    partnerBadge: 'Official Trimble Partner',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    logo: '/images/brands/sketchup.png',
    accentBorder: 'border-red-500',
    description: 'Industry-standard 3D architectural, engineering & conceptual design software suites with native Scan Essentials and V-Ray rendering workflows.',
    categoryRoute: '/products/cad-software',
    categoryLabel: 'Explore CAD Suite',
    techCategory: 'cad',
    matches: (p: Product) => p.brand === 'Trimble' || p.id.startsWith('sketchup'),
  },
  {
    id: 'graebert',
    name: 'Graebert (ARES Trinity CAD)',
    shortName: 'Graebert ARES CAD',
    partnerBadge: 'Authorized Graebert Partner',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    logo: '/images/brands/grabert.png',
    accentBorder: 'border-amber-500',
    description: 'Modern, high-performance DWG 2D/3D CAD platform spanning Desktop (ARES Commander), Cloud (ARES Kudo), and Mobile (ARES Touch).',
    categoryRoute: '/products/cad-software',
    categoryLabel: 'Explore ARES CAD',
    techCategory: 'cad',
    matches: (p: Product) => p.brand === 'Graebert' || p.id.startsWith('ares-'),
  },
  {
    id: 'chaos',
    name: 'Chaos (Photorealistic Visualization)',
    shortName: 'Chaos Engines',
    partnerBadge: 'Certified Chaos Partner',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    logo: '/images/brands/chaos.jpg',
    accentBorder: 'border-rose-500',
    description: 'World-leading photorealistic rendering and real-time visualization engines including Chaos V-Ray, Enscape 3D, and Chaos Corona.',
    categoryRoute: '/products/cad-software',
    categoryLabel: 'Explore Visualization',
    techCategory: 'cad',
    matches: (p: Product) => p.brand === 'Chaos' || ['vray', 'enscape', 'corona'].includes(p.id),
  },
  {
    id: 'make3d-pratham',
    name: 'Make3D — Pratham Industrial FDM Series',
    shortName: 'Make3D Pratham FDM',
    partnerBadge: 'Authorized Make3D Dealer',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    accentBorder: 'border-slate-800',
    description: 'Designed & developed in India: Rigid CoreXY & ball screw industrial FDM printers from compact 120 mm desktop units to 1-meter monolithic workhorses.',
    categoryRoute: '/products/fdm-3d-printers',
    categoryLabel: 'Explore FDM Printers',
    techCategory: 'fdm',
    matches: (p: Product) =>
      (p.brand === 'Make3D' || p.brand === 'Pratham') &&
      (p.categorySlug === 'fdm-3d-printers' || p.id.startsWith('pratham-')),
  },
  {
    id: 'make3d-eka',
    name: 'Make3D — EKA Precision Resin Series',
    shortName: 'Make3D EKA Resin',
    partnerBadge: 'Ultra-Precision DLP & 16K',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentBorder: 'border-indigo-600',
    description: 'Sub-micron resolution DLP and 8K/16K monochrome LCD resin systems engineered for direct jewelry casting, dental prosthetics, and micro-engineering.',
    categoryRoute: '/products/dlp-3d-printers',
    categoryLabel: 'Explore Resin Systems',
    techCategory: 'dlp',
    matches: (p: Product) =>
      (p.brand === 'EKA' || (p.brand === 'Make3D' && p.id.startsWith('eka-'))) &&
      (p.categorySlug === 'dlp-3d-printers' || p.id.startsWith('eka-')),
  },
  {
    id: 'scanners',
    name: '3DeVOK & SHINING 3D Scanners',
    shortName: '3D Scanners',
    partnerBadge: 'Precision Digitizer Solutions',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'border-emerald-600',
    description: 'High-speed handheld, optical coordinate, and hybrid laser 3D digitizers delivering sub-0.04 mm accuracy for reverse engineering and inspection.',
    categoryRoute: '/products/3d-scanners',
    categoryLabel: 'Explore 3D Scanners',
    techCategory: 'scanners',
    matches: (p: Product) =>
      p.brand === '3DeVOK' ||
      p.brand === 'SHINING 3D' ||
      p.categorySlug === '3d-scanners' ||
      p.technology.toLowerCase().includes('scanner'),
  },
]

export const ProductsPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [selectedTech, setSelectedTech] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured')

  useEffect(() => {
    document.title = 'Products Catalog | 3D Printers, Scanners & CAD Software by Brand | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore verified engineering solutions organized by brand: Trimble SketchUp, Graebert ARES CAD, Chaos, Make3D Pratham FDM printers, Make3D EKA resin systems, and 3DeVOK scanners.'
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
      title: '3D Scanners',
      tag: '3DEVOK & EINSTAR',
      description: 'Handheld & optical coordinate laser digitizers capturing millions of points per second down to 0.04 mm.',
      icon: Scan,
      route: '/products/3d-scanners',
      accent: 'border-slate-300 hover:border-slate-800',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      flagships: ['3DeVOK MT (Hybrid Laser)', '3DeVOK MQ (Color 3D)', 'EINSTAR Handheld'],
    },
  ]

  // Filter individual product matching search & tech criteria
  const isProductMatching = (p: Product): boolean => {
    if (selectedTech !== 'all') {
      if (selectedTech === 'fdm' && !p.technology.toLowerCase().includes('fdm')) return false
      if (selectedTech === 'dlp' && !p.technology.toLowerCase().includes('dlp')) return false
      if (selectedTech === 'lcd' && !p.technology.toLowerCase().includes('lcd')) return false
      if (selectedTech === 'scanners' && !p.technology.toLowerCase().includes('scanner')) return false
      if (selectedTech === 'cad' && !p.technology.toLowerCase().includes('software')) return false
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

  // Group products by brand sections
  const brandSections = useMemo(() => {
    return BRAND_GROUPS.map((group) => {
      // Find all products matching this brand
      let brandProds = products.filter(group.matches)

      // Filter by search & technology
      brandProds = brandProds.filter(isProductMatching)

      // Sort
      brandProds.sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        }
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
        return 0
      })

      return {
        ...group,
        products: brandProds,
        totalBrandCount: products.filter(group.matches).length,
      }
    }).filter((section) => {
      // If brand filter is active, only show the selected brand
      if (selectedBrand !== 'all' && section.id !== selectedBrand) {
        return false
      }
      // If tech filter is active, only show if techCategory matches or has matching products
      if (selectedTech !== 'all') {
        if (section.products.length === 0) return false
      }
      // If search query is active, only show sections with matching products
      if (searchQuery && section.products.length === 0) {
        return false
      }
      return true
    })
  }, [selectedBrand, selectedTech, searchQuery, sortBy])

  // Total products currently visible across all brand sections
  const totalVisibleProducts = useMemo(() => {
    return brandSections.reduce((acc, section) => acc + section.products.length, 0)
  }, [brandSections])

  const resetFilters = () => {
    setSelectedBrand('all')
    setSelectedTech('all')
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
          <span className="font-semibold text-slate-900">Products Catalog</span>
        </nav>

        {/* ====================================================
            2. PAGE HERO BANNER
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
              <span>AUTHORIZED BRAND PORTFOLIO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Products Catalog by Brand
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Explore industrial 3D printing hardware, high-precision 3D scanners, and industry-leading CAD &amp; visualization suites organized by our authorized manufacturing and software partner brands.
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
            4. SEARCH & BRAND FILTERING CONTROLS
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
                placeholder="Search models, brands, or specs (e.g. SketchUp, Pratham, ARES, 16K)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            </div>

            {/* Filter Dropdowns and Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end text-xs">
              {/* Brand Filter Dropdown */}
              <div className="flex items-center space-x-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-500">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-hidden bg-white font-medium text-slate-800 cursor-pointer"
                >
                  <option value="all">All Brands ({products.length})</option>
                  <option value="trimble">Trimble (SketchUp) (4)</option>
                  <option value="graebert">Graebert (ARES CAD) (7)</option>
                  <option value="chaos">Chaos (V-Ray &amp; Enscape) (3)</option>
                  <option value="make3d-pratham">Make3D Pratham (FDM) (8)</option>
                  <option value="make3d-eka">Make3D EKA (Resin) (5)</option>
                  <option value="scanners">3DeVOK &amp; SHINING 3D (3)</option>
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

              {(selectedBrand !== 'all' || selectedTech !== 'all' || searchQuery) && (
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

          {/* Brand Quick-Filter Buttons */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter by Brand:</span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Brands ({products.length})
              </button>
              <button
                onClick={() => setSelectedBrand('trimble')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'trimble'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Trimble SketchUp (4)
              </button>
              <button
                onClick={() => setSelectedBrand('graebert')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'graebert'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Graebert ARES CAD (7)
              </button>
              <button
                onClick={() => setSelectedBrand('chaos')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'chaos'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Chaos (3)
              </button>
              <button
                onClick={() => setSelectedBrand('make3d-pratham')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'make3d-pratham'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Make3D Pratham FDM (8)
              </button>
              <button
                onClick={() => setSelectedBrand('make3d-eka')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'make3d-eka'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Make3D EKA Resin (5)
              </button>
              <button
                onClick={() => setSelectedBrand('scanners')}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold cursor-pointer ${
                  selectedBrand === 'scanners'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                3D Scanners (3)
              </button>
            </div>
          </div>

          {/* Technology Quick-Filter Pills */}
          <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 shrink-0 flex items-center space-x-1">
              <Tag className="w-3 h-3 text-slate-400" />
              <span>Technology:</span>
            </span>
            <button
              onClick={() => setSelectedTech('all')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all text-xs font-medium cursor-pointer ${
                selectedTech === 'all'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Tech
            </button>
            <button
              onClick={() => setSelectedTech('cad')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all text-xs font-medium cursor-pointer ${
                selectedTech === 'cad'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              CAD &amp; Visualization
            </button>
            <button
              onClick={() => setSelectedTech('fdm')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all text-xs font-medium cursor-pointer ${
                selectedTech === 'fdm'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              FDM 3D Printers
            </button>
            <button
              onClick={() => setSelectedTech('dlp')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all text-xs font-medium cursor-pointer ${
                selectedTech === 'dlp'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              DLP &amp; LCD Resin Printers
            </button>
            <button
              onClick={() => setSelectedTech('scanners')}
              className={`px-3 py-1 rounded-md whitespace-nowrap transition-all text-xs font-medium cursor-pointer ${
                selectedTech === 'scanners'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              3D Scanners
            </button>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{totalVisibleProducts}</strong> verified engineering solutions across{' '}
            <strong className="text-slate-900 font-semibold">{brandSections.length}</strong> brand division{brandSections.length === 1 ? '' : 's'}
          </span>
          <span className="hidden sm:inline">
            Official Leniva CAD Solutions &amp; Authorized Partners Directory
          </span>
        </div>

        {/* ====================================================
            5. PRODUCTS DISPLAYED BY BRANDS
           ==================================================== */}
        {brandSections.length > 0 && totalVisibleProducts > 0 ? (
          <div className="space-y-14">
            {brandSections.map((brand) => (
              <section key={brand.id} className="space-y-6">
                {/* Dedicated Brand Showcase Header Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 bottom-0 w-2"
                    style={{
                      backgroundColor:
                        brand.id === 'trimble'
                          ? '#ef4444'
                          : brand.id === 'graebert'
                          ? '#f59e0b'
                          : brand.id === 'chaos'
                          ? '#e11d48'
                          : brand.id === 'make3d-pratham'
                          ? '#0f172a'
                          : brand.id === 'make3d-eka'
                          ? '#4f46e5'
                          : '#059669',
                    }}
                  />

                  <div className="flex items-start sm:items-center space-x-4 pl-2">
                    {/* Brand Logo or Icon */}
                    {brand.logo ? (
                      <div className="w-16 h-16 rounded-2xl bg-white p-2.5 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-center shrink-0 font-black text-sm tracking-wider">
                        {brand.shortName.slice(0, 3).toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                          {brand.name}
                        </h2>
                        <span
                          className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${brand.badgeColor}`}
                        >
                          {brand.partnerBadge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal max-w-2xl leading-relaxed">
                        {brand.description}
                      </p>
                    </div>
                  </div>

                  {/* Brand Action and Item Count Pill */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center pl-2">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200/80">
                      {brand.products.length} {brand.products.length === 1 ? 'Product' : 'Products'}
                    </span>
                    <Link
                      to={brand.categoryRoute}
                      className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-1.5 shadow-2xs"
                    >
                      <span>{brand.categoryLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Brand Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {brand.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3 shadow-sm">
            <p className="text-base font-bold text-slate-800">
              No products match your current search or brand filter criteria.
            </p>
            <p className="text-xs text-slate-500">
              Try searching for "SketchUp", "Commander", "Pratham", "EKA", "GT MAX", or "3DeVOK".
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
            >
              Reset All Filters
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
              <h4 className="text-sm font-bold text-slate-950">Official Authorized Partner</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Direct authorized licenses from Trimble, Graebert &amp; Chaos, plus full manufacturer warranty on Make3D printers and 3DeVOK scanners.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950">Dedicated Engineering Support</h4>
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
