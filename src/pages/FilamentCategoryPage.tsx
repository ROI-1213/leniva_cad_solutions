import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Star,
  Heart,
  CheckCircle2,
  Package,
  Zap,
  Palette,
  Filter,
  ChevronDown,
  ChevronUp,
  Send,
} from 'lucide-react'
import {
  filamentProducts,
  plaComparison,
  filamentApplications,
  commonFilamentSpecs,
  type FilamentProduct,
} from '../data/filamentsData'
import { useApp } from '../context/AppContext'
import WhitePlaDetailPage from './WhitePlaDetailPage'
import GreySilverPlaPage from './GreySilverPlaPage'
import GoldPlaPage from './GoldPlaPage'


// ─── FilamentCard Component ──────────────────────────────────────────────────
const FilamentCard: React.FC<{ product: FilamentProduct }> = ({ product }) => {
  const { toggleWishlist, isInWishlist, openQuoteModal } = useApp()
  const inWishlist = isInWishlist(product.id)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image with Color Overlay */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={`${product.color} ${product.material} 3D Printer Filament Spool`}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded shadow-sm ${
              product.material === 'PLA+' ? 'bg-red-600' : 'bg-slate-700'
            }`}
          >
            {product.material}
          </span>
          {product.badge && (
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() =>
            toggleWishlist({
              id: product.id,
              type: 'shop',
              name: product.name,
              slug: product.slug,
              image: product.image,
              category: 'Filaments',
              price: product.price,
            })
          }
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors z-10 cursor-pointer ${
            inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-slate-500 hover:bg-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Color Dot */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: product.colorHex }}
          />
          <span className="text-[10px] font-semibold text-slate-700 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded">
            {product.color}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex items-center space-x-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-bold text-slate-800">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount} reviews)</span>
          </div>

          {/* Name */}
          <Link to={`/shop/filaments/${product.slug}`}>
            <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
              {product.name}
            </h4>
          </Link>

          {/* Specs row */}
          <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium pt-0.5">
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              {product.weight}
            </span>
            <span>•</span>
            <span>{product.diameter}</span>
            <span>•</span>
            <span>FDM / FFF</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* CTA — Request Quote (opens enquiry form) */}
        <div className="pt-1">
          <button
            onClick={() => openQuoteModal(product.name)}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Request Quote</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── FilamentDetailPage (for individual product by slug) ─────────────────────
export const FilamentDetailPage: React.FC<{ forcedSlug?: string }> = ({ forcedSlug }) => {
  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const slug = forcedSlug || pathParts[pathParts.length - 1]

  if (slug === 'pla-white-1kg-175mm' || slug === 'pla-3d-printer-filament-white' || slug === 'pla-white') {
    return <WhitePlaDetailPage />
  }

  if (
    slug === 'plaplus-grey-silver-1kg-175mm' ||
    slug === 'pla-plus-3d-printer-filament-grey-silver' ||
    slug === 'plaplus-grey' ||
    slug === 'pla-grey'
  ) {
    return <GreySilverPlaPage />
  }

  if (
    slug === 'plaplus-gold-1kg-175mm' ||
    slug === 'pla-plus-3d-printer-filament-gold' ||
    slug === 'plaplus-gold' ||
    slug === 'pla-gold'
  ) {
    return <GoldPlaPage />
  }

  const product = filamentProducts.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
          <Link to="/shop/filaments" className="text-red-600 hover:underline text-sm">
            ← Back to Filaments
          </Link>
        </div>
      </div>
    )
  }

  const { openQuoteModal } = useApp()
  // const discount calculated if needed

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-slate-900">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop/filaments" className="hover:text-slate-900">Filaments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative bg-slate-50 flex items-center justify-center p-10 min-h-80">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-xs mx-auto object-contain"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-md ${
                    product.material === 'PLA+' ? 'bg-red-600' : 'bg-slate-700'
                  }`}
                >
                  {product.material}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md">
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-8 space-y-5 flex flex-col justify-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                  Make3D
                  <span className="text-slate-300">|</span>
                  <span
                    className="px-2 py-0.5 rounded text-white text-[10px]"
                    style={{ backgroundColor: product.colorHex === '#F5F5F0' ? '#888' : product.colorHex }}
                  >
                    {product.color}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-950 leading-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Material', value: product.material },
                  { label: 'Color', value: product.color },
                  { label: 'Diameter', value: product.diameter },
                  { label: 'Net Weight', value: product.weight },
                  { label: 'Print Temp', value: product.printTemp },
                  { label: 'Bed Temp', value: product.bedTemp },
                ].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">{s.label}</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-700">In Stock – Ready to Ship</span>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button
                  onClick={() => openQuoteModal(product.name)}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Quote</span>
                </button>
                <button
                  onClick={() => openQuoteModal(`Bulk Filament Inquiry: ${product.name}`)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Description + Features */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-950">About This Filament</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
              <div className="pt-2">
                <h3 className="text-sm font-bold text-slate-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-950">Recommended Applications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.applications.map((app, i) => (
                  <div
                    key={i}
                    className="bg-red-50 border border-red-100 rounded-xl p-3 text-xs font-semibold text-red-700 flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 space-y-4 h-fit">
            <h2 className="text-lg font-bold text-slate-950">Full Specifications</h2>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-col border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{k}</span>
                  <span className="text-xs font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>

            {/* Suitable For */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Suitable For</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.suitableFor.map((u, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back / Related CTA */}
        <div className="text-center">
          <Link
            to="/shop/filaments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            ← View All Filaments
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main FilamentCategoryPage ────────────────────────────────────────────────
const FilamentCategoryPage: React.FC = () => {
  const [materialFilter, setMaterialFilter] = useState<'all' | 'PLA' | 'PLA+'>('all')
  const [selectedColor, setSelectedColor] = useState<string>('all')
  const [showComparison, setShowComparison] = useState(false)

  const filteredProducts = useMemo(() => {
    return filamentProducts.filter(p => {
      if (materialFilter !== 'all' && p.material !== materialFilter) return false
      if (selectedColor !== 'all' && p.color !== selectedColor) return false
      return true
    })
  }, [materialFilter, selectedColor])

  const allColors = useMemo(() => {
    return ['all', ...filamentProducts.map(p => p.color)]
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-slate-900">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">3D Printer Filaments</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left: Content */}
            <div className="flex-1 p-8 sm:p-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                Make3D • FDM Filaments
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                3D Printer Filaments
              </h1>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                Reliable PLA and PLA+ filaments designed for beginners, makers, students, designers, engineers, 
                and professional users. Available in 8 colours — all 1.75 mm diameter, 1 KG spools.
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: 'Diameter', value: commonFilamentSpecs.diameter },
                  { label: 'Weight', value: commonFilamentSpecs.weight },
                  { label: 'Technology', value: commonFilamentSpecs.technology },
                ].map(s => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-[11px]"
                  >
                    <span className="text-slate-400 font-medium">{s.label}:</span>
                    <span className="font-bold text-slate-800">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Beginner Friendly</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Vacuum Sealed + Desiccant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>All Major FDM Printers Compatible</span>
                </div>
              </div>
            </div>

            {/* Right: Color palette strip */}
            <div className="md:w-64 bg-slate-950 flex flex-col items-center justify-center p-8 gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Available Colors
              </span>
              <div className="grid grid-cols-4 gap-2">
                {filamentProducts.map(p => (
                  <div
                    key={p.id}
                    title={p.color}
                    className="w-9 h-9 rounded-full border-2 border-slate-700 shadow-md cursor-default"
                    style={{ backgroundColor: p.colorHex }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                8 colours — PLA &amp; PLA+
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0">
            <Filter className="w-4 h-4" />
            Filter By
          </div>

          {/* Material filter */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Material</div>
            <div className="flex gap-2">
              {(['all', 'PLA', 'PLA+'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMaterialFilter(m)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    materialFilter === m
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m === 'all' ? 'All Materials' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Color filter */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Color</div>
            <div className="flex flex-wrap gap-2">
              {allColors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  title={c === 'all' ? 'All Colors' : c}
                  className={`transition-all cursor-pointer ${
                    c === 'all'
                      ? `px-3 py-1.5 text-xs font-bold rounded-lg ${
                          selectedColor === 'all'
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`
                      : `w-7 h-7 rounded-full border-2 ${
                          selectedColor === c ? 'border-red-500 scale-110 shadow-md' : 'border-slate-200 hover:border-slate-400'
                        }`
                  }`}
                  style={c !== 'all' ? { backgroundColor: filamentProducts.find(p => p.color === c)?.colorHex } : {}}
                >
                  {c === 'all' ? 'All' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="ml-auto text-xs text-slate-500 shrink-0">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {filamentProducts.length} products
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <FilamentCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <Package className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <h4 className="text-base font-bold text-slate-900">No filaments match your filter</h4>
            <p className="text-xs text-slate-500 mt-1">Try selecting a different material or color.</p>
          </div>
        )}

        {/* Application Cards */}
        <div className="space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-950">What Can You Print?</h2>
            <p className="text-sm text-slate-500">Make3D PLA &amp; PLA+ filaments are suitable for a wide range of applications.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filamentApplications.map((app, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-center hover:border-red-200 hover:shadow-md transition-all"
              >
                <div className="text-3xl">{app.icon}</div>
                <div className="text-sm font-bold text-slate-900">{app.title}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PLA vs PLA+ Comparison */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full flex items-center justify-between p-7 text-left cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="space-y-0.5">
              <h2 className="text-xl font-black text-slate-950 flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-600" />
                PLA vs PLA+ — Which Should You Choose?
              </h2>
              <p className="text-xs text-slate-500">Click to compare materials and find the right filament for your project.</p>
            </div>
            {showComparison ? (
              <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
            )}
          </button>

          {showComparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-slate-100">
              {/* PLA */}
              <div className="p-8 space-y-4 border-b md:border-b-0 md:border-r border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-3">
                    PLA
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                      {plaComparison.pla.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{plaComparison.pla.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Advantages</h4>
                  <ul className="space-y-1.5">
                    {plaComparison.pla.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {plaComparison.pla.bestFor.map((u, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/shop/filaments"
                  onClick={() => setMaterialFilter('PLA')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors"
                >
                  Browse PLA Filaments →
                </Link>
              </div>

              {/* PLA+ */}
              <div className="p-8 space-y-4 bg-red-50/30">
                <div>
                  <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-3">
                    PLA+
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                      {plaComparison.plaplus.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{plaComparison.plaplus.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Advantages</h4>
                  <ul className="space-y-1.5">
                    {plaComparison.plaplus.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {plaComparison.plaplus.bestFor.map((u, i) => (
                      <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-semibold rounded-full">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/shop/filaments"
                  onClick={() => setMaterialFilter('PLA+')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Browse PLA+ Filaments →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Common Specs Strip */}
        <div className="bg-slate-950 rounded-2xl p-6">
          <div className="text-center mb-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              Common Specifications — All Make3D Filaments
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { label: 'Diameter', value: commonFilamentSpecs.diameter },
              { label: 'Spool Weight', value: commonFilamentSpecs.weight },
              { label: 'Technology', value: commonFilamentSpecs.technology },
              { label: 'Packaging', value: commonFilamentSpecs.packaging },
              { label: 'Compatibility', value: 'Universal FDM' },
            ].map(s => (
              <div key={s.label} className="text-center space-y-1">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{s.label}</div>
                <div className="text-sm font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default FilamentCategoryPage
