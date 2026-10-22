import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  Phone,
} from 'lucide-react'
import { productCategories } from '../data/categories'
import { products } from '../data/products'
import { getStoredProductsAsProducts } from '../utils/productCatalog'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import { Product } from '../types'
import DlpCategoryPage from './DlpCategoryPage'
import IndustrialLcdCategoryPage from './IndustrialLcdCategoryPage'
import ScannersCategoryPage from './ScannersCategoryPage'

interface CategoryDetailPageProps {
  forcedSlug?: string
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ forcedSlug }) => {
  const { categorySlug: paramSlug } = useParams<{ categorySlug: string }>()
  const slug = forcedSlug || paramSlug
  const { openQuoteModal } = useApp()
  const [activeBrandTab, setActiveBrandTab] = useState<'all' | 'graebert' | 'sketchup' | 'chaos'>('all')

  if (slug === 'dlp-3d-printers' || slug === 'dlp') {
    return <DlpCategoryPage />
  }
  if (slug === 'industrial-lcd-3d-printers' || slug === 'lcd' || slug === 'industrial-lcd') {
    return <IndustrialLcdCategoryPage />
  }
  if (slug === '3d-scanners' || slug === 'scanners') {
    return <ScannersCategoryPage />
  }

  const category = productCategories.find(c => c.slug === slug)

  if (!category) {
    return <Navigate to="/products" replace />
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
        console.error('Failed to update live products in CategoryDetailPage', err)
      }
    }
    window.addEventListener('leniva_products_catalog_updated', handleUpdate)
    window.addEventListener('leniva_cad_edits_updated', handleUpdate)
    window.addEventListener('leniva_cloud_cms_synced', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('leniva_products_catalog_updated', handleUpdate)
      window.removeEventListener('leniva_cad_edits_updated', handleUpdate)
      window.removeEventListener('leniva_cloud_cms_synced', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  // Find all products matching this category
  const categoryProducts = allProducts.filter(p => p.categorySlug === slug)

  // Check if CAD Software category
  const isCadSoftware = slug === 'cad-software' || category.slug === 'cad-software' || category.id === 'software'
  const isFdm = slug === 'fdm-3d-printers' || category.slug === 'fdm-3d-printers'

  const knownFdmIds = ['pratham-mini', 'pratham-desktop', 'pratham-3', 'pratham-5', 'pratham-6', 'pratham-3-rapid', 'pratham-x-600', 'pratham-x']
  const additionalFdmProducts = categoryProducts.filter(p => !knownFdmIds.includes(p.id))

  // FDM sections
  const fdmSections = [
    {
      title: 'Desktop & Education Prototyping',
      badge: '120 – 250 mm Build Envelope',
      description: 'Compact, reliable FDM systems engineered for educational STEM labs, design classrooms, and desktop engineering prototypes.',
      products: categoryProducts.filter(p => ['pratham-mini', 'pratham-desktop'].includes(p.id)),
    },
    {
      title: 'Industrial Production Workhorses',
      badge: '300 – 600 mm Heavy Duty',
      description: 'Rigid CoreXY systems with all-metal MS chassis, precision linear guides, and 300°C hotends for continuous manufacturing.',
      products: categoryProducts.filter(p => ['pratham-3', 'pratham-5', 'pratham-6'].includes(p.id)),
    },
    {
      title: 'High-Speed Rapid Manufacturing',
      badge: 'Up to 500 mm/s High-Speed CoreXY',
      description: 'High-speed CoreXY kinematics delivering up to 500 mm/s print speed for accelerated prototype turnaround.',
      products: categoryProducts.filter(p => p.id === 'pratham-3-rapid'),
    },
    {
      title: 'Jumbo 1-Meter Monolithic 3D Printers',
      badge: '1000 mm All-Axis Industrial Ball Screw',
      description: 'Massive monolithic additive manufacturing systems with all-axis industrial ball screws and up to 1 m³ build capacity.',
      products: categoryProducts.filter(p => ['pratham-x-600', 'pratham-x'].includes(p.id)),
    },
    ...(additionalFdmProducts.length > 0 ? [{
      title: 'Additional Industrial Systems',
      badge: 'Additive Manufacturing',
      description: 'Custom configurations and newly added industrial systems from catalog.',
      products: additionalFdmProducts,
    }] : []),
  ]

  // Brand groupings in requested priority order: 1st Graebert, 2nd SketchUp, 3rd Chaos
  const graebertProducts = categoryProducts.filter(
    p => p.brand.toLowerCase().includes('graebert') || p.slug.startsWith('ares-')
  )
  const sketchupProducts = categoryProducts.filter(
    p => p.brand.toLowerCase().includes('trimble') || p.slug.startsWith('sketchup')
  )
  const chaosProducts = categoryProducts.filter(
    p => p.brand.toLowerCase().includes('chaos') || ['enscape', 'vray', 'corona'].includes(p.slug)
  )

  const brandSections = [
    {
      id: 'graebert' as const,
      orderLabel: '1',
      brandName: 'Graebert',
      heading: 'Graebert — ARES CAD Ecosystem',
      tagline: 'Professional Desktop (Commander), Cloud Browser (Kudo), and Mobile (Touch) DWG CAD Solutions',
      logo: '/images/brands/grabert.png',
      secondaryLogo: '/images/brands/ares-cad.png',
      products: graebertProducts,
    },
    {
      id: 'sketchup' as const,
      orderLabel: '2',
      brandName: 'SketchUp by Trimble',
      heading: 'SketchUp — Trimble 3D Design & Modeling',
      tagline: 'Intuitive 3D Architectural Modeling, LayOut 2D Documentation, Point Clouds & Revit Interoperability',
      logo: '/images/brands/sketchup.png',
      products: sketchupProducts,
    },
    {
      id: 'chaos' as const,
      orderLabel: '3',
      brandName: 'Chaos',
      heading: 'Chaos — Photorealistic 3D Rendering & Virtual Reality',
      tagline: 'Industry-Standard Real-Time Visualization (Enscape), Metrology Ray-Tracing (V-Ray), and Architectural Mood (Corona)',
      logo: '/images/brands/chaos.jpg',
      products: chaosProducts,
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen py-8 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{category.title}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-xl border border-slate-800">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <img
            src={category.heroBanner}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />

          <div className="relative z-20 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-400/30 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md">
              {category.subtitle}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {category.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.description}
            </p>

            {isCadSoftware && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Authorized Brand Portfolio:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/grabert.png" alt="Graebert" className="h-full w-auto max-w-[70px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/ares-cad.png" alt="ARES" className="h-full w-auto max-w-[70px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/sketchup.png" alt="Trimble SketchUp" className="h-full w-auto max-w-[75px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/chaos.jpg" alt="Chaos" className="h-full w-auto max-w-[65px] object-contain" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal(`${category.title} Category Inquiry`)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
              >
                Request Category Quotation
              </button>
              <button
                onClick={() => openQuoteModal(`${category.title} Technical Consultation`)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-colors flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── CAD SOFTWARES: DISPLAYED BY BRANDS IN REQUESTED ORDER ─── */}
        {isCadSoftware ? (
          <div className="space-y-8">
            {/* Header with Title and Brand Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Available Softwares
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official commercial licenses, education editions, and Indian GST invoicing
                </p>
              </div>

              {/* Brand Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
                <button
                  onClick={() => setActiveBrandTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeBrandTab === 'all'
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  All Brands
                </button>
                <button
                  onClick={() => setActiveBrandTab('graebert')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeBrandTab === 'graebert'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                  <span>1. Graebert</span>
                </button>
                <button
                  onClick={() => setActiveBrandTab('sketchup')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeBrandTab === 'sketchup'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                  <span>2. SketchUp</span>
                </button>
                <button
                  onClick={() => setActiveBrandTab('chaos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeBrandTab === 'chaos'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                  <span>3. Chaos</span>
                </button>
              </div>
            </div>

            {/* Brand Sections in Exact Requested Order: 1st Graebert, 2nd SketchUp, 3rd Chaos */}
            <div className="space-y-12">
              {brandSections
                .filter(b => activeBrandTab === 'all' || activeBrandTab === b.id)
                .map(brand => (
                  <div
                    key={brand.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
                  >
                      {/* Brand Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            <img
                              src={brand.logo}
                              alt={brand.brandName}
                              className="h-full w-auto max-w-[85px] object-contain"
                            />
                          </div>
                          {brand.secondaryLogo && (
                            <div className="h-10 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 hidden sm:flex items-center justify-center shrink-0">
                              <img
                                src={brand.secondaryLogo}
                                alt="ARES CAD"
                                className="h-full w-auto max-w-[85px] object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                                Brand {brand.orderLabel}
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                                {brand.heading}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {brand.tagline}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-center">
                          {brand.products.length} Products Available
                        </span>
                      </div>

                      {/* Product Cards Grid for this Brand */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {brand.products.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        ) : isFdm ? (
          /* ─── FDM 3D PRINTERS: DISPLAYED SECTION-WISE ─── */
          <div className="space-y-12">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Make3D Pratham Industrial FDM Lineup
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Organized section-wise from compact desktop educational prototypes to massive 1-meter monolithic workhorses
              </p>
            </div>

            {fdmSections.map((sec, idx) => (
              <div key={idx} className="space-y-5">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                        Series {idx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-slate-950">
                        {sec.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {sec.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-center shrink-0">
                    {sec.products.length} {sec.products.length === 1 ? 'Model' : 'Models'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sec.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ─── STANDARD CATEGORIES (SCANNERS, ETC.) ─── */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-950">
                Available Models
              </h2>
              <span className="text-xs text-slate-500">
                Verified specifications and genuine manufacturer warranties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">
              {isCadSoftware
                ? 'Uncertain Which Software Fits Your Requirements?'
                : 'Uncertain Which Model Fits Your Requirements?'}
            </h4>
            <p className="text-xs text-slate-300">
              {isCadSoftware
                ? 'Our technical sales consultants provide licensing guidance, feature comparisons, and multi-seat enterprise quotations.'
                : 'Our application engineers provide benchmark print tests, build volume analysis, and total cost of ownership estimates.'}
            </p>
          </div>
          <button
            onClick={() => openQuoteModal(`${category.title} Engineering Benchmark`)}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors"
          >
            Request Benchmark Part
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryDetailPage
