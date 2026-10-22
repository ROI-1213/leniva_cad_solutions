import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Scan,
  Maximize2,
  X,
  Phone,
  Download,
  Eye,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getCatalogProductBySlug } from '../utils/productCatalog'

interface ScannerItem {
  id: string
  name: string
  category: 'handheld'
  categoryLabel: string
  subtitle: string
  bullets: string[]
  image: string
  badge?: string
  objectSizeRange?: string
  brochureUrl?: string
}

const einscanProducts: ScannerItem[] = [
  {
    id: 'einstar',
    name: 'EINSTAR 3D Scanner',
    category: 'handheld',
    categoryLabel: 'Handheld 3D Scanner',
    subtitle: 'Affordable Handheld 3D Scanner | High-Density Point Cloud & True Color Output',
    bullets: [
      'High Quality Data – Captures point distance up to 0.1 mm with high fidelity',
      'High Color Fidelity – Integrated RGB color camera for authentic color reproduction',
      'Detail-Oriented Enhancement – Detail enhancement technology for point cloud sharpness',
      'Smooth and Fast Scanning – Scan speed up to 14 fps with smart tracking',
      'Stable Outdoor Scanning – Equipped with 3 Infrared VCSEL Projectors for diverse lighting conditions',
      'User-Friendly Experience – Lightweight ergonomic design (only 0.5 kg net weight)',
      'Direct CAD & 3D Print Ready – Seamless export to OBJ, STL, PLY, ASC, 3MF',
    ],
    image: '/images/scanners/einstar.png',
    badge: 'Handheld 3D Scanner',
    objectSizeRange: 'Medium to Large / Human Body / Heritage',
    brochureUrl: '/brochures/einstar.pdf',
  },
]

export const EinscanPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)
  const catalogProd = getCatalogProductBySlug('einscan-3d-scanner')

  const activeProducts: ScannerItem[] = einscanProducts.map(item => ({
    ...item,
    name: catalogProd?.name || item.name,
    subtitle: catalogProd?.tagline || item.subtitle,
    bullets: catalogProd?.features && catalogProd.features.length > 0 ? catalogProd.features : item.bullets,
    image: catalogProd?.hero_image || item.image,
    badge: catalogProd?.badge || item.badge,
    brochureUrl: catalogProd?.brochure_url || item.brochureUrl,
  }))

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* ====================================================
          1. HERO HEADER: EINSTAR 3D SCANNER
         ==================================================== */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-12 sm:pt-10 sm:pb-14 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products/3d-scanners" className="hover:text-red-600 transition-colors">3D Scanners</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{catalogProd?.name || 'EINSTAR 3D Scanner'}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Scan className="w-3.5 h-3.5" />
                <span>{catalogProd?.badge || 'Handheld 3D Digitization'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                {catalogProd?.hero_heading || catalogProd?.name || 'EINSTAR 3D Scanner'}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {catalogProd?.description || 'EINSTAR handheld 3D scanner delivers high-quality 3D data with true color fidelity for 3D printing, reverse engineering, digital archiving, and education at an accessible investment.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={catalogProd?.brochure_url || '/brochures/einstar.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#0062cc] hover:bg-[#004fa8] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Brochure</span>
              </a>
              <a
                href={catalogProd?.brochure_url || '/brochures/einstar.pdf'}
                download="einstar-brochure.pdf"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </a>
              <button
                onClick={() => openQuoteModal(`${catalogProd?.name || 'EINSTAR'} Live Consultation`)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. PRODUCT DISPLAY: EINSTAR 3D SCANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="space-y-6">
          {activeProducts.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              onEnlarge={() => setEnlargedImage(item.image)}
              onDemo={() => openQuoteModal('EINSTAR - Demo Request')}
            />
          ))}
        </div>
      </section>

      {/* ====================================================
          3. BOTTOM CONSULTATION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 font-mono">
              Authorized Technical Partner
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Interested in Seeing EINSTAR in Action?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Leniva CAD Solutions provides live on-site and remote benchmark scans with EINSTAR. Send us your sample workpiece or request an engineer consultation to verify accuracy, point cloud resolution, and 3D mesh reconstruction.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openQuoteModal('EINSTAR General Inquiry - Sample Scan')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
            >
              Request Sample Part Scan
            </button>
            <button
              onClick={() => openQuoteModal('EINSTAR General Inquiry - Live Demo')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all text-center cursor-pointer"
            >
              Schedule Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setEnlargedImage(null)}
        >
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={enlargedImage}
            alt="EinScan Hardware Enlarged"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  item: ScannerItem
  onEnlarge: () => void
  onDemo: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onEnlarge, onDemo }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12 group">
      {/* Product Image Box */}
      <div className="md:col-span-4 bg-stone-100/70 p-6 sm:p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-200/80">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 sm:h-64 object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Zoom Icon */}
        <button
          onClick={onEnlarge}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/80 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow transition-all cursor-pointer"
          title="Enlarge image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {item.badge && (
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded shadow-sm">
            {item.badge}
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {item.subtitle}
            </p>
          </div>

          {/* Bulleted Specifications */}
          <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-700">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-slate-400 font-bold select-none shrink-0">•</span>
                <span className="font-normal leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button Row */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <a
            href={item.brochureUrl || '/brochures/einstar.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#0062cc] hover:bg-[#004fa8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>View Brochure</span>
          </a>
          <a
            href={item.brochureUrl || '/brochures/einstar.pdf'}
            download="einstar-brochure.pdf"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Brochure</span>
          </a>
          <button
            onClick={onDemo}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Request Live Demo
          </button>
        </div>
      </div>
    </div>
  )
}

export default EinscanPage
