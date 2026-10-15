import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Product } from '../types'
import { useApp } from '../context/AppContext'

interface ProductCardProps {
  product: Product
}

const brandLogoMap: Record<string, string> = {
  'Graebert': '/images/brands/grabert.png',
  'Gräbert': '/images/brands/grabert.png',
  'Trimble': '/images/brands/sketchup.png',
  'SketchUp': '/images/brands/sketchup.png',
  'Chaos': '/images/brands/chaos.jpg',
  'ARES': '/images/brands/ares-cad.png',
  'Makerverse': '/images/brands/makerverse.png',
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openQuoteModal, toggleWishlist, isInWishlist } = useApp()
  const inWishlist = isInWishlist(product.id)
  const brandLogo = brandLogoMap[product.brand]

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Card Image Container with Generous Padding */}
      <div className="relative aspect-[4/3] bg-slate-50/70 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Clean Single Badge - Protected against overlapping wishlist */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10 max-w-[calc(100%-3.75rem)]">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/95 text-slate-800 rounded-full shadow-2xs border border-slate-200/70 backdrop-blur-sm truncate">
            {product.technology}
          </span>
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-full shadow-2xs shrink-0">
              New
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist({
              id: product.id,
              type: 'product',
              name: product.name,
              slug: product.slug,
              image: product.heroImage,
              category: product.category,
              isQuoteRequired: true,
            })
          }}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
            inWishlist
              ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
              : 'bg-white/90 border-slate-200/80 text-slate-400 hover:text-red-600 hover:bg-white shadow-2xs'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content with Readable Typography & Breathing Room */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand Indicator */}
          <div className="flex items-center justify-between h-5 mb-2">
            {brandLogo ? (
              <img
                src={brandLogo}
                alt={product.brand}
                className="h-5 max-h-5 w-auto max-w-[55px] object-contain rounded-xs"
                loading="lazy"
              />
            ) : (
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {product.brand}
              </div>
            )}
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="text-lg font-bold text-slate-950 tracking-tight group-hover:text-red-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specs: Clean Minimal Layout without nested grey boxes */}
          {product.keySpecs && product.keySpecs.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-3">
              {product.keySpecs.slice(0, 2).map((s, idx) => (
                <div key={idx} className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium truncate">{s.label}</div>
                  <div className="text-sm font-semibold text-slate-900 truncate mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2.5">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 py-2.5 px-3 text-center text-xs font-bold text-slate-800 hover:text-white bg-slate-100 hover:bg-slate-950 rounded-xl transition-all"
          >
            View Details
          </Link>
          <button
            onClick={() => openQuoteModal(product.name)}
            className="flex-1 py-2.5 px-3 text-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
