import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
  Search,
  Heart,
  Eye,
  X,
  Star,
  ChevronRight,
  Package,
  ArrowRight,
  Printer,
  CircleDot,
  Box,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Laptop,
  Monitor,
} from 'lucide-react'
import { shopItems } from '../data/shop'
import { useApp } from '../context/AppContext'
import { ShopItem } from '../types'
import { getStoredNavigationConfig, MasterNavigationConfig } from '../utils/navigationConfig'

interface ShopPageProps {
  forcedCategory?: string
}

export const ShopPage: React.FC<ShopPageProps> = ({ forcedCategory }) => {
  const { category: paramCategory } = useParams<{ category: any }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryCategory = searchParams.get('category')

  const initialCategory = forcedCategory || queryCategory || paramCategory || 'all'

  const { toggleWishlist, isInWishlist, openQuoteModal } = useApp()

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [quickViewItem, setQuickViewItem] = useState<ShopItem | null>(null)
  const [navConfig, setNavConfig] = useState<MasterNavigationConfig>(getStoredNavigationConfig)

  useEffect(() => {
    const handleUpdate = () => setNavConfig(getStoredNavigationConfig())
    window.addEventListener('leniva_nav_config_updated', handleUpdate)
    return () => window.removeEventListener('leniva_nav_config_updated', handleUpdate)
  }, [])

  useEffect(() => {
    if (forcedCategory) {
      setSelectedCategory(forcedCategory)
    } else if (queryCategory) {
      setSelectedCategory(queryCategory)
    } else if (paramCategory) {
      setSelectedCategory(paramCategory)
    }
  }, [forcedCategory, queryCategory, paramCategory])

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId)
    if (catId === 'all') {
      searchParams.delete('category')
      setSearchParams(searchParams, { replace: true })
    } else {
      setSearchParams({ category: catId }, { replace: true })
    }
  }

  // Sidebar / Dropdown options
  const filterOptions = [
    { id: 'all', label: 'All Catalog (All Sections)', icon: Layers, count: shopItems.length },
    { id: 'cad-software', label: 'CAD & 3D Design Software', icon: Laptop, count: shopItems.filter(i => i.category === 'cad-software').length },
    { id: 'products', label: '3D Printers & Scanners (Hardware)', icon: Box, count: shopItems.filter(i => ['fdm', 'dlp', 'lcd', 'scanners'].includes(i.category)).length },
    { id: 'make3d-filaments', label: '3D Printer Filaments (PLA & PLA+)', icon: CircleDot, count: shopItems.filter(i => i.category === 'make3d-filaments').length },
    { id: 'ares', label: 'ARES DWG CAD (Graebert)', icon: Monitor, count: shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Graebert').length },
    { id: 'sketchup', label: 'SketchUp 3D Modeling (Trimble)', icon: Box, count: shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Trimble').length },
    { id: 'chaos', label: 'Chaos Visualization (V-Ray & Enscape)', icon: Sparkles, count: shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Chaos').length },
    { id: 'fdm', label: 'FDM 3D Printers', icon: Printer, count: shopItems.filter(i => i.category === 'fdm').length },
    { id: 'dlp', label: 'DLP 3D Printers', icon: Printer, count: shopItems.filter(i => i.category === 'dlp').length },
    { id: 'lcd', label: 'Industrial LCD Printers', icon: Printer, count: shopItems.filter(i => i.category === 'lcd').length },
    { id: 'scanners', label: 'Precision 3D Scanners', icon: Box, count: shopItems.filter(i => i.category === 'scanners').length },
  ]

  // Filter items helper
  const filterList = (items: ShopItem[]) => {
    return items.filter(item => {
      if (inStockOnly && !item.inStock) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          item.name.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          (item.brand && item.brand.toLowerCase().includes(q))
        )
      }
      return true
    })
  }

  // Grouped products
  const cadItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'cad-software'))
  }, [inStockOnly, searchQuery])

  const aresItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Graebert'))
  }, [inStockOnly, searchQuery])

  const sketchupItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Trimble'))
  }, [inStockOnly, searchQuery])

  const chaosItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'cad-software' && i.brand === 'Chaos'))
  }, [inStockOnly, searchQuery])

  const printerItems = useMemo(() => {
    return filterList(shopItems.filter(i => ['fdm', 'dlp', 'lcd'].includes(i.category)))
  }, [inStockOnly, searchQuery])

  const fdmItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'fdm'))
  }, [inStockOnly, searchQuery])

  const dlpItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'dlp'))
  }, [inStockOnly, searchQuery])

  const lcdItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'lcd'))
  }, [inStockOnly, searchQuery])

  const scannerItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'scanners'))
  }, [inStockOnly, searchQuery])

  const filamentItems = useMemo(() => {
    return filterList(shopItems.filter(i => i.category === 'make3d-filaments'))
  }, [inStockOnly, searchQuery])

  // Total matching count
  const totalVisibleCount = useMemo(() => {
    if (selectedCategory === 'all') {
      return cadItems.length + printerItems.length + scannerItems.length + filamentItems.length
    }
    if (selectedCategory === 'cad-software' || selectedCategory === 'software') {
      return cadItems.length
    }
    if (selectedCategory === 'ares') return aresItems.length
    if (selectedCategory === 'sketchup') return sketchupItems.length
    if (selectedCategory === 'chaos') return chaosItems.length
    if (selectedCategory === 'products') {
      return printerItems.length + scannerItems.length
    }
    if (selectedCategory === 'make3d-filaments' || selectedCategory === 'filaments') {
      return filamentItems.length
    }
    if (selectedCategory === 'fdm') return fdmItems.length
    if (selectedCategory === 'dlp') return dlpItems.length
    if (selectedCategory === 'lcd') return lcdItems.length
    if (selectedCategory === 'scanners') return scannerItems.length
    return 0
  }, [selectedCategory, cadItems, aresItems, sketchupItems, chaosItems, printerItems, scannerItems, filamentItems, fdmItems, dlpItems, lcdItems])

  // Card component
  const ProductCard: React.FC<{ item: ShopItem }> = ({ item }) => {
    const inWishlist = isInWishlist(item.id)
    const isFilament = item.category === 'make3d-filaments'
    const isCad = item.category === 'cad-software'

    return (
      <div className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-3">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-full ${
              item.isContain ? 'object-contain p-2' : 'object-cover'
            } group-hover:scale-105 transition-transform duration-500`}
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white rounded shadow-xs ${
              isFilament ? 'bg-red-600' : isCad ? 'bg-blue-600' : 'bg-slate-900/85 backdrop-blur-sm'
            }`}>
              {item.categoryName}
            </span>
            {item.badge && (
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded shadow-xs">
                {item.badge}
              </span>
            )}
          </div>

          {/* Quick View & Wishlist Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-1.5 z-10">
            <button
              onClick={() =>
                toggleWishlist({
                  id: item.id,
                  type: 'shop',
                  name: item.name,
                  slug: item.slug,
                  image: item.image,
                  category: item.categoryName,
                  price: item.price,
                })
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-xs ${
                inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white/85 text-slate-500 hover:bg-white hover:text-rose-600'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setQuickViewItem(item)}
              className="w-8 h-8 rounded-full bg-white/85 hover:bg-white text-slate-500 hover:text-red-600 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-xs"
              aria-label="Quick preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1 text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-slate-800 text-[11px]">{item.rating}</span>
                <span className="text-slate-400 text-[10px]">({item.reviewsCount})</span>
              </div>
              {item.weightOrVolume && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {item.weightOrVolume}
                </span>
              )}
            </div>

            {item.productSlug ? (
              <Link to={`/products/${item.productSlug}`}>
                <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.name}
                </h4>
              </Link>
            ) : isFilament ? (
              <Link to={`/shop/filaments/${item.slug}`}>
                <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
                  {item.name}
                </h4>
              </Link>
            ) : (
              <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
                {item.name}
              </h4>
            )}

            <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
              {item.shortDescription}
            </p>

            {/* Quick Specs Badges */}
            {item.specifications && (
              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 text-[10px]">
                {Object.entries(item.specifications).slice(0, 2).map(([key, val]) => (
                  <span key={key} className="bg-slate-50 border border-slate-200/80 text-slate-600 px-2 py-0.5 rounded-md">
                    <strong className="text-slate-700">{key}:</strong> {val}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => openQuoteModal(item.name)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Request Quote</span>
              </button>
              {item.productSlug ? (
                <Link
                  to={`/products/${item.productSlug}`}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                  title="View Specs & Details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : isFilament ? (
                <Link
                  to={`/shop/filaments/${item.slug}`}
                  className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                  title="View Filament Details"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-slate-900">Shop</Link>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-900 capitalize">
                {filterOptions.find(f => f.id === selectedCategory)?.label.split('(')[0] || selectedCategory}
              </span>
            </>
          )}
        </nav>

        {/* Shop Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{navConfig.shopPage.announcementBadge}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {navConfig.shopPage.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {navConfig.shopPage.pageSubtitle}
            </p>
          </div>
        </div>

        {/* MAIN CONTROLS: DROPDOWN SELECTOR & SEARCH */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search CAD software, 3D printers, scanners, or filaments..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* DROPDOWN SELECTOR FOR SECTIONS */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <label htmlFor="shop-dropdown" className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center space-x-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
                <span>Shop Section:</span>
              </label>
              <div className="relative">
                <select
                  id="shop-dropdown"
                  value={selectedCategory}
                  onChange={e => handleCategoryChange(e.target.value)}
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl pl-3.5 pr-8 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none cursor-pointer shadow-xs transition-colors"
                >
                  <option value="all">🌟 All Sections (CAD, Printers, Scanners & Filaments)</option>
                  <option value="cad-software">💻 CAD & 3D Design Software (Graebert, Trimble & Chaos)</option>
                  <option value="products">📦 3D Printers & Scanners (Hardware Products)</option>
                  <option value="make3d-filaments">🧵 3D Printer Filaments (Make3D PLA & PLA+)</option>
                  <option value="ares">📐 ARES CAD (Graebert)</option>
                  <option value="sketchup">🏗️ SketchUp 3D Modeling (Trimble)</option>
                  <option value="chaos">🎨 Chaos Visualization (V-Ray & Enscape)</option>
                  <option value="fdm">🖨️ FDM 3D Printers</option>
                  <option value="dlp">💡 DLP 3D Printers</option>
                  <option value="lcd">🖥️ Industrial LCD Printers</option>
                  <option value="scanners">📡 3D Scanners</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Quick Filter Tabs / Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            All Items ({shopItems.length})
          </button>
          <button
            onClick={() => handleCategoryChange('cad-software')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
              selectedCategory === 'cad-software' || selectedCategory === 'ares' || selectedCategory === 'sketchup' || selectedCategory === 'chaos'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-blue-600" />
            <span>CAD Software ({shopItems.filter(i => i.category === 'cad-software').length})</span>
          </button>
          <button
            onClick={() => handleCategoryChange('products')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
              selectedCategory === 'products'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-red-200 hover:bg-red-50/50'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Printers & Scanners ({shopItems.filter(i => ['fdm', 'dlp', 'lcd', 'scanners'].includes(i.category)).length})</span>
          </button>
          <button
            onClick={() => handleCategoryChange('make3d-filaments')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 ${
              selectedCategory === 'make3d-filaments' || selectedCategory === 'filaments'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-red-200 hover:bg-red-50/50'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5 text-red-600" />
            <span>3D Printer Filaments ({shopItems.filter(i => i.category === 'make3d-filaments').length})</span>
          </button>
          <button
            onClick={() => handleCategoryChange('ares')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'ares'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            ARES CAD
          </button>
          <button
            onClick={() => handleCategoryChange('sketchup')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'sketchup'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            SketchUp
          </button>
          <button
            onClick={() => handleCategoryChange('chaos')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'chaos'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Chaos Rendering
          </button>
          <button
            onClick={() => handleCategoryChange('fdm')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'fdm'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            FDM Printers
          </button>
          <button
            onClick={() => handleCategoryChange('dlp')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'dlp'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            DLP Printers
          </button>
          <button
            onClick={() => handleCategoryChange('lcd')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'lcd'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            LCD Printers
          </button>
          <button
            onClick={() => handleCategoryChange('scanners')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'scanners'
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            3D Scanners
          </button>
        </div>

        {/* Shop Layout */}
        <main className="w-full space-y-10">
            {totalVisibleCount === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <Package className="w-10 h-10 mx-auto text-slate-300" />
                <h4 className="text-base font-bold text-slate-900">No items match your filter criteria</h4>
                <p className="text-xs text-slate-500">Try selecting another category or clearing your search query.</p>
                <button
                  onClick={() => {
                    handleCategoryChange('all')
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* ======================================================== */}
                {/* SECTION 1: CAD & 3D ENGINEERING SOFTWARE                 */}
                {/* ======================================================== */}
                {(selectedCategory === 'all' ||
                  selectedCategory === 'cad-software' ||
                  selectedCategory === 'software' ||
                  selectedCategory === 'ares' ||
                  selectedCategory === 'sketchup' ||
                  selectedCategory === 'chaos') &&
                  (selectedCategory === 'ares'
                    ? aresItems
                    : selectedCategory === 'sketchup'
                    ? sketchupItems
                    : selectedCategory === 'chaos'
                    ? chaosItems
                    : cadItems
                  ).length > 0 && (
                    <section id="section-cad-software" className="space-y-4">
                      {/* Section Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Laptop className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-black text-slate-950 tracking-tight">
                                CAD & 3D Engineering Software
                              </h2>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full">
                                {(selectedCategory === 'ares'
                                  ? aresItems
                                  : selectedCategory === 'sketchup'
                                  ? sketchupItems
                                  : selectedCategory === 'chaos'
                                  ? chaosItems
                                  : cadItems
                                ).length} Software Solutions
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Official DWG CAD, 3D modeling, BIM workflows & photorealistic rendering engines by Graebert, Trimble & Chaos
                            </p>
                          </div>
                        </div>

                        {selectedCategory === 'all' ? (
                          <button
                            onClick={() => handleCategoryChange('cad-software')}
                            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
                          >
                            <span>View All CAD Software</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <Link
                            to="/products/cad-software"
                            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 self-start sm:self-auto"
                          >
                            <span>Full Software Hub</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {(selectedCategory === 'ares'
                          ? aresItems
                          : selectedCategory === 'sketchup'
                          ? sketchupItems
                          : selectedCategory === 'chaos'
                          ? chaosItems
                          : cadItems
                        ).map(item => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </section>
                  )}

                {/* ======================================================== */}
                {/* SECTION 2: 3D PRINTERS & ADDITIVE SYSTEMS (PRODUCTS)    */}
                {/* ======================================================== */}
                {(selectedCategory === 'all' ||
                  selectedCategory === 'products' ||
                  selectedCategory === 'fdm' ||
                  selectedCategory === 'dlp' ||
                  selectedCategory === 'lcd') &&
                  (selectedCategory === 'fdm' ? fdmItems : selectedCategory === 'dlp' ? dlpItems : selectedCategory === 'lcd' ? lcdItems : printerItems).length > 0 && (
                    <section id="section-printers" className="space-y-4">
                      {/* Section Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Printer className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-black text-slate-950 tracking-tight">
                                3D Printers & Additive Systems
                              </h2>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-full">
                                {(selectedCategory === 'fdm' ? fdmItems : selectedCategory === 'dlp' ? dlpItems : selectedCategory === 'lcd' ? lcdItems : printerItems).length} Machines
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Industrial FDM, High-Precision DLP and LCD Printers by Make3D
                            </p>
                          </div>
                        </div>

                        {selectedCategory === 'all' && (
                          <button
                            onClick={() => handleCategoryChange('products')}
                            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
                          >
                            <span>View All Printers</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {(selectedCategory === 'fdm'
                          ? fdmItems
                          : selectedCategory === 'dlp'
                          ? dlpItems
                          : selectedCategory === 'lcd'
                          ? lcdItems
                          : printerItems
                        ).map(item => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </section>
                  )}

                {/* ======================================================== */}
                {/* SECTION 3: 3D METROLOGY & PRECISION SCANNERS (PRODUCTS) */}
                {/* ======================================================== */}
                {(selectedCategory === 'all' ||
                  selectedCategory === 'products' ||
                  selectedCategory === 'scanners') &&
                  scannerItems.length > 0 && (
                    <section id="section-scanners" className="space-y-4">
                      {/* Section Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <Box className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-black text-slate-950 tracking-tight">
                                Precision 3D Scanners
                              </h2>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-full">
                                {scannerItems.length} Scanners
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Industrial structured-light and handheld inspection 3D scanners
                            </p>
                          </div>
                        </div>

                        {selectedCategory === 'all' && (
                          <button
                            onClick={() => handleCategoryChange('scanners')}
                            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
                          >
                            <span>View All Scanners</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {scannerItems.map(item => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </section>
                  )}

                {/* ======================================================== */}
                {/* SECTION 4: MAKE3D 3D PRINTER FILAMENTS (FILAMENTS)      */}
                {/* ======================================================== */}
                {(selectedCategory === 'all' ||
                  selectedCategory === 'make3d-filaments' ||
                  selectedCategory === 'filaments') &&
                  filamentItems.length > 0 && (
                    <section id="section-filaments" className="space-y-4 pt-2">
                      {/* Section Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <CircleDot className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-black text-slate-950 tracking-tight">
                                Make3D 3D Printer Filaments (PLA & PLA+)
                              </h2>
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-700 rounded-full">
                                {filamentItems.length} Colours Available
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Official 1.75 mm / 1 KG spools in 8 vibrant colours with vacuum-sealed packaging
                            </p>
                          </div>
                        </div>

                        <Link
                          to="/shop/filaments"
                          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 self-start sm:self-auto"
                        >
                          <span>Dedicated Filaments Showcase</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filamentItems.map(item => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </section>
                  )}
              </>
            )}
          </main>

        {/* QUICK VIEW MODAL */}
        {quickViewItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setQuickViewItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">Quick Preview</span>
                <button
                  onClick={() => setQuickViewItem(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-3">
                  <img
                    src={quickViewItem.image}
                    alt={quickViewItem.name}
                    className={`w-full h-full ${
                      quickViewItem.isContain ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {quickViewItem.categoryName} • {quickViewItem.brand}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950">{quickViewItem.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{quickViewItem.shortDescription}</p>

                    {/* Quick Specs */}
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      {Object.entries(quickViewItem.specifications).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{k}:</span>
                          <span className="font-semibold text-slate-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        setQuickViewItem(null)
                        openQuoteModal(quickViewItem.name)
                      }}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Request Quote</span>
                    </button>
                    {quickViewItem.productSlug ? (
                      <Link
                        to={`/products/${quickViewItem.productSlug}`}
                        onClick={() => setQuickViewItem(null)}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <span>View Full Details</span>
                      </Link>
                    ) : quickViewItem.category === 'make3d-filaments' ? (
                      <Link
                        to={`/shop/filaments/${quickViewItem.slug}`}
                        onClick={() => setQuickViewItem(null)}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <span>View Filament Details</span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopPage
