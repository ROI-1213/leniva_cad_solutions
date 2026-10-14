import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Star,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Truck,
  Lock,
  Heart,
  ShoppingCart,
  Send,
  Maximize2,
  X,
  ChevronLeft,
  ArrowRight,
  Layers,
  Palette,
  Gauge,
  Scale,
  Printer,
  Box,
  Sparkles,
  Lightbulb,
  GraduationCap,
  Wrench,
  Smile,
  Package,
  Share2,
  Check,
  ChevronDown,
} from 'lucide-react'
import { initialGoldData, GoldProductData, FilamentVariant } from '../data/goldPlaData'
import { useApp } from '../context/AppContext'

interface GoldPageProps {
  customData?: Partial<GoldProductData>
}

export const GoldPlaPage: React.FC<GoldPageProps> = ({ customData }) => {
  const navigate = useNavigate()
  const { toggleWishlist, isInWishlist, openQuoteModal } = useApp()

  // Dynamic Product State (merges initial data + local storage admin overrides + custom props)
  const [productData, setProductData] = useState<GoldProductData>(() => {
    const adminSaved = localStorage.getItem('filament_product_gold')
    if (adminSaved) {
      try {
        const parsed = JSON.parse(adminSaved)
        return { ...initialGoldData, ...parsed, ...customData }
      } catch (e) {
        // fallback
      }
    }
    return { ...initialGoldData, ...customData }
  })

  // Selected variant state (default to Gold)
  const [activeVariant, setActiveVariant] = useState<FilamentVariant>(() => {
    return (
      productData.variants.find(v => v.id === 'filament-plaplus-gold') ||
      productData.variants[0]
    )
  })

  // Interactive gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [addedToast, setAddedToast] = useState(false)

  // Reviews state (Source has 0 reviews initially — users can add new ones)
  const [reviewsList, setReviewsList] = useState<{ name: string; email?: string; rating: number; comment: string; date: string }[]>(() => {
    const saved = localStorage.getItem('filament_reviews_gold')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }
    return [] // Initial 0 reviews per source status
  })

  const [revRating, setRevRating] = useState(5)
  const [revName, setRevName] = useState('')
  const [revEmail, setRevEmail] = useState('')
  const [revComment, setRevComment] = useState('')
  const [revSubmitted, setRevSubmitted] = useState(false)

  // FAQ open state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Desktop Zoom
  const [zoomStyle, setZoomStyle] = useState<{ display: string; backgroundPosition: string }>({
    display: 'none',
    backgroundPosition: '0% 0%',
  })
  const mainImageRef = useRef<HTMLDivElement>(null)

  const inWishlist = isInWishlist(productData.id)

  // Listen to admin storage changes
  useEffect(() => {
    const handleStorage = () => {
      const adminSaved = localStorage.getItem('filament_product_gold')
      if (adminSaved) {
        try {
          const parsed = JSON.parse(adminSaved)
          setProductData(prev => ({ ...prev, ...parsed }))
        } catch (e) {}
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Dynamic SEO and JSON-LD structured data
  useEffect(() => {
    document.title = productData.seo.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', productData.seo.description)
    }

    // Add JSON-LD Product Schema dynamically
    const scriptId = 'jsonld-product-gold'
    let script = document.getElementById(scriptId) as HTMLScriptElement
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const structuredData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productData.fullTitle,
      image: productData.images.map(img => img.src),
      description: productData.shortDescription,
      sku: activeVariant.sku || productData.sku,
      brand: {
        '@type': 'Brand',
        name: productData.brand,
      },
      offers: {
        '@type': 'Offer',
        url: window.location.href,
        priceCurrency: 'INR',
        price: activeVariant.price || productData.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: productData.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
      ...(reviewsList.length > 0 && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: (
            reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length
          ).toFixed(1),
          reviewCount: reviewsList.length.toString(),
        },
      }),
    }

    script.textContent = JSON.stringify(structuredData)

    window.scrollTo({ top: 0, behavior: 'smooth' })

    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) existingScript.remove()
    }
  }, [productData, activeVariant, reviewsList.length])

  // Quantity helpers
  const decQty = () => setQuantity(q => (q > 1 ? q - 1 : 1))
  const incQty = () => setQuantity(q => (q < 50 ? q + 1 : q))

  // Zoom handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({ display: 'block', backgroundPosition: `${x}% ${y}%` })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' })
  }

  // Variant selector handler
  const handleSelectVariant = (variant: FilamentVariant) => {
    setActiveVariant(variant)
    if (variant.slug === 'pla-3d-printer-filament-white' || variant.slug === 'pla-white-1kg-175mm') {
      navigate('/product/pla-3d-printer-filament-white')
      return
    }
    if (variant.slug === 'pla-plus-3d-printer-filament-grey-silver' || variant.slug === 'plaplus-grey-silver-1kg-175mm') {
      navigate('/product/pla-plus-3d-printer-filament-grey-silver')
      return
    }
    if (variant.id !== 'filament-plaplus-gold') {
      navigate(`/shop/filaments/${variant.slug}`)
    }
  }

  // Cart / Buy handlers
  const handleAddToCart = () => {
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2500)
    openQuoteModal(`${productData.name} - ${activeVariant.color} (Qty: ${quantity})`)
  }

  const handleBuyNow = () => {
    openQuoteModal(
      `[Filament Quote Request] ${productData.name} - ${activeVariant.color} (Qty: ${quantity} Spools)`
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: productData.fullTitle, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  // Review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!revName.trim() || !revComment.trim()) return
    const newRev = {
      name: revName.trim(),
      email: revEmail.trim(),
      rating: revRating,
      comment: revComment.trim(),
      date: 'Just now',
    }
    const updated = [newRev, ...reviewsList]
    setReviewsList(updated)
    localStorage.setItem('filament_reviews_gold', JSON.stringify(updated))
    setRevSubmitted(true)
    setRevName('')
    setRevEmail('')
    setRevComment('')
    setTimeout(() => setRevSubmitted(false), 3000)
  }

  const renderIcon = (name: string, className = 'w-4 h-4') => {
    switch (name) {
      case 'Layers': return <Layers className={className} />
      case 'Palette': return <Palette className={className} />
      case 'Gauge': return <Gauge className={className} />
      case 'Scale': return <Scale className={className} />
      case 'Printer': return <Printer className={className} />
      case 'Box': return <Box className={className} />
      case 'Sparkles': return <Sparkles className={className} />
      case 'Smile': return <Smile className={className} />
      case 'ShieldCheck': return <ShieldCheck className={className} />
      case 'Maximize2': return <Maximize2 className={className} />
      case 'Package': return <Package className={className} />
      case 'Lightbulb': return <Lightbulb className={className} />
      case 'GraduationCap': return <GraduationCap className={className} />
      case 'Wrench': return <Wrench className={className} />
      case 'Truck': return <Truck className={className} />
      case 'Lock': return <Lock className={className} />
      case 'CheckCircle2': return <CheckCircle2 className={className} />
      default: return <Sparkles className={className} />
    }
  }

  const currentDisplayImage = productData.images[activeImageIndex] || productData.images[0]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-amber-500 selection:text-white pb-20 md:pb-16">
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">{productData.name}</span>
            <span className="text-slate-300">Added to order enquiry (Qty: {quantity})</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto py-1 scrollbar-none">
          <Link to="/" className="hover:text-slate-900 whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/shop" className="hover:text-slate-900 whitespace-nowrap">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/shop/filaments" className="hover:text-slate-900 whitespace-nowrap">Filaments</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{productData.name}</span>
        </nav>

        {/* ======================================================== */}
        {/* 1. PRODUCT HERO / ABOVE-THE-FOLD SECTION                 */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ---------------------------------------------------- */}
            {/* LEFT: PRODUCT IMAGE GALLERY (6 VIEWS + ZOOM + LIGHTBOX)*/}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Stage */}
              <div
                ref={mainImageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-square rounded-2xl bg-gradient-to-b from-amber-50/40 via-slate-50 to-slate-100/70 border border-slate-200/90 overflow-hidden flex items-center justify-center p-6 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={currentDisplayImage.src}
                  alt={currentDisplayImage.alt}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = initialGoldData.images[0].src
                  }}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Magnifier Lens for Desktop */}
                <div
                  className="hidden lg:block absolute inset-0 pointer-events-none rounded-2xl border border-slate-300 shadow-2xl transition-opacity duration-200"
                  style={{
                    display: zoomStyle.display,
                    backgroundImage: `url(${currentDisplayImage.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '220%',
                    backgroundPosition: zoomStyle.backgroundPosition,
                  }}
                />

                {/* Fullscreen Pill Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLightboxOpen(true)
                  }}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-amber-600 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md border border-slate-200 backdrop-blur-sm flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

                {/* Tag Pill */}
                <div className="absolute top-3 left-3 bg-slate-900/85 text-amber-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-sm border border-amber-400/20">
                  {currentDisplayImage.tag}
                </div>

                {/* Mobile Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(prev => (prev === 0 ? productData.images.length - 1 : prev - 1))
                  }}
                  className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(prev => (prev === productData.images.length - 1 ? 0 : prev + 1))
                  }}
                  className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 6 Thumbnails */}
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {productData.images.map((img, i) => {
                  const isSelected = i === activeImageIndex
                  return (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative aspect-square rounded-xl p-1 transition-all cursor-pointer flex flex-col items-center justify-center border-2 bg-slate-50 ${
                        isSelected
                          ? 'border-amber-500 shadow-md ring-2 ring-amber-100 bg-white'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-white opacity-85 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = initialGoldData.images[0].src
                        }}
                        className="w-full h-full object-contain rounded-md"
                      />
                      <span className="sr-only">{img.title}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Click main image to open high-definition studio zoom inspector
              </p>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT: PRODUCT INFO, PRICE, VARIANT SELECTOR & CTAS  */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category Label & Share/Wishlist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    {productData.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      title="Share Product"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() =>
                        toggleWishlist({
                          id: productData.id,
                          type: 'shop',
                          name: productData.name,
                          slug: productData.slug,
                          image: productData.images[0].src,
                          category: productData.category,
                          price: productData.price,
                        })
                      }
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        inWishlist
                          ? 'border-rose-200 bg-rose-50 text-rose-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-rose-600'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  {productData.fullTitle}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {productData.material} • {productData.color} • {productData.weight} Spool • {productData.diameter}
                </p>
              </div>

              {/* Rating / Review Status Strip */}
              <div className="flex items-center space-x-3 pb-2 border-b border-slate-100 flex-wrap gap-y-2">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        reviewsList.length > 0 ? 'fill-current text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {reviewsList.length > 0 ? (
                    <a href="#reviews" className="text-amber-700 hover:underline">
                      {reviewsList.length} Customer {reviewsList.length === 1 ? 'Review' : 'Reviews'}
                    </a>
                  ) : (
                    <a href="#reviews" className="text-slate-500 hover:text-amber-600 hover:underline">
                      No reviews yet. Be the first to review
                    </a>
                  )}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {productData.stockStatus}
                </span>
              </div>

              {/* Price & Savings Box */}
              <div className="space-y-1.5 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono">
                    Official Quotation & Bulk Orders
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-600 text-white text-[11px] font-bold rounded-md shadow-2xs">
                    Quote on Request
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  Request Official Quotation & Volume Orders
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Institutional, educational, and commercial bulk spool rates available with GST invoice and dispatch across India.
                </p>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {productData.shortDescription}
              </p>

              {/* ======================================================== */}
              {/* DYNAMIC COLOUR / VARIANT SELECTOR                        */}
              {/* ======================================================== */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Select Colour Variant: <strong className="text-slate-950 font-black">{activeVariant.name}</strong>
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    8 Official Make3D Colours
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {productData.variants.map((v) => {
                    const isSelected = v.id === activeVariant.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVariant(v)}
                        className={`group relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 text-amber-900 shadow-xs ring-1 ring-amber-400'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300/80 shrink-0 shadow-inner"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span>{v.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Purchase Action Panel */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs overflow-hidden">
                    <button
                      onClick={decQty}
                      className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-slate-900 min-w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incQty}
                      className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    (Total: {quantity} KG Net)
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => openQuoteModal(`[Filament Inquiry] ${productData.name} - ${activeVariant.color} (${quantity} Spool${quantity > 1 ? 's' : ''})`)}
                    className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-black text-sm rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>REQUEST QUOTE</span>
                  </button>

                  <a
                    href="#enquiry"
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-black text-sm rounded-xl shadow-md shadow-slate-900/10 transition-all flex items-center justify-center space-x-2 cursor-pointer text-center"
                  >
                    <span>ENQUIRE NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* ======================================================== */}
              {/* 3. TRUST / PURCHASE CONFIDENCE BAR                       */}
              {/* ======================================================== */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
                {productData.trustCards.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50/80 rounded-xl border border-slate-200/70 flex flex-col space-y-1 text-center items-center"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      {renderIcon(tc.iconName, 'w-3 h-3')}
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 leading-tight">
                      {tc.title}
                    </span>
                    <span className="text-[9px] text-slate-500 leading-tight">
                      {tc.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. QUICK PRODUCT SPECIFICATIONS ("PRODUCT HIGHLIGHTS")    */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Product Highlights
              </h2>
              <p className="text-xs text-slate-500">
                Core material, colour, and dimensional verification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {productData.productHighlights.map((hl, i) => (
              <div
                key={i}
                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 hover:border-amber-300 hover:bg-amber-50/20 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 group-hover:text-amber-600 flex items-center justify-center transition-colors">
                  {renderIcon(hl.iconName, 'w-3.5 h-3.5')}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {hl.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block mt-0.5">
                    {hl.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. PRODUCT DESCRIPTION                                   */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Overview & Design Intent
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            {productData.descriptionHeading}
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {productData.descriptionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. WHY CHOOSE GOLD PLA+? (6 CARDS)                       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Material Advantages
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Why Choose PLA+ Gold?
            </h2>
            <p className="text-xs text-slate-500">
              Enhanced FDM formulation engineered for superior toughness, radiant finish, and high print reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {productData.whyChooseCards.map((card) => (
              <div
                key={card.number}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
                    {renderIcon(card.iconName, 'w-4 h-4')}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{card.number}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-950 uppercase tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. APPLICATIONS SECTION (WHERE CAN YOU USE IT?)          */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Application Scope
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Where Can You Use Gold PLA+?
            </h2>
            <p className="text-xs text-slate-500">
              Recommended practical areas where the lustrous gold finish and mechanical resilience stand out
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {productData.applicationCards.map((app, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  {renderIcon(app.iconName, 'w-4 h-4')}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 8. "WHAT IS PLA+?" SECTION WITH COMPARISON               */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Technical Clarity
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {productData.whatIsPlaPlus.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {productData.whatIsPlaPlus.overview}
            </p>
          </div>

          {/* Visual Comparison: Standard PLA vs PLA+ */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Material Characteristic</th>
                  <th className="py-3 px-4 sm:px-6">Standard PLA</th>
                  <th className="py-3 px-4 sm:px-6 bg-amber-50 text-amber-800">PLA+ (Enhanced PLA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productData.whatIsPlaPlus.comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-3 px-4 sm:px-6 text-slate-500">{row.standardPla}</td>
                    <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900 bg-amber-50/40">
                      {row.plaPlus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. WHO IS THIS PRODUCT FOR?                              */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Target Audience
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Who Is This Product For?
            </h2>
            <p className="text-xs text-slate-500">
              Tailored for users seeking professional visual finish combined with resilient print performance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productData.whoIsItFor.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  {renderIcon(item.iconName, 'w-4 h-4')}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 10. TECHNICAL SPECIFICATIONS TABLE                       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Technical Specifications
              </h2>
              <p className="text-xs text-slate-500">
                Verified dimensional and technical specifications for Make3D Gold PLA+
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-100">
                {productData.technicalSpecs.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-700 w-1/3 sm:w-1/4">
                      {row.property}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-slate-900 font-semibold">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 11. PRODUCT REVIEWS SECTION                              */}
        {/* ======================================================== */}
        <div id="reviews" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                User Feedback
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Customer Reviews
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-slate-950">
                {reviewsList.length > 0
                  ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)
                  : '0.0'}
              </span>
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      reviewsList.length > 0 ? 'fill-current text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">({reviewsList.length} reviews)</span>
            </div>
          </div>

          {/* Reviews list */}
          {reviewsList.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <p className="font-bold text-slate-800">No customer reviews yet.</p>
              <p>Be the first to review this product and share your printing experience below.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                        {rev.name[0]}
                      </span>
                      <strong className="text-xs font-bold text-slate-900">{rev.name}</strong>
                    </div>
                    <div className="flex items-center space-x-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">{rev.date} • Verified Purchase</span>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Review Form */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Add Your Review</h3>
            {revSubmitted && (
              <div className="p-3 mb-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-semibold flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Thank you! Your review has been submitted successfully.</span>
              </div>
            )}
            <form onSubmit={handleSubmitReview} className="space-y-3 max-w-xl text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Your Rating</label>
                <div className="flex items-center space-x-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRevRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= revRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={revName}
                    onChange={e => setRevName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Your Email</label>
                  <input
                    type="email"
                    value={revEmail}
                    onChange={e => setRevEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Review Comments *</label>
                <textarea
                  required
                  rows={3}
                  value={revComment}
                  onChange={e => setRevComment(e.target.value)}
                  placeholder="Share details about gold finish, layer adhesion, and printer compatibility..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 12. ACCORDION FAQ SECTION (7 QUESTIONS)                  */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Common Enquiries
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {productData.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i
              return (
                <div
                  key={i}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 py-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 13. RELATED PRODUCTS ("EXPLORE MORE FILAMENT COLOURS")   */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Full Color Palette
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Explore More Filament Colours
              </h2>
            </div>
            <Link
              to="/shop/filaments"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>View All Filaments</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productData.variants
              .filter(v => v.id !== 'filament-plaplus-gold')
              .map(rel => (
                <div
                  key={rel.id}
                  className="bg-slate-50/70 rounded-2xl border border-slate-200/80 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group p-3.5 space-y-3"
                >
                  <div className="relative aspect-square rounded-xl bg-white flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span
                      className="absolute top-2 left-2 text-[9px] font-bold text-white px-2 py-0.5 rounded shadow-xs"
                      style={{ backgroundColor: rel.colorHex }}
                    >
                      {rel.color}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {rel.material} • 1 KG
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <div className="pt-0.5">
                      <span className="text-sm font-bold text-amber-700">Quote on Request</span>
                    </div>
                  </div>

                  <Link
                    to={
                      rel.slug === 'pla-3d-printer-filament-white'
                        ? '/product/pla-3d-printer-filament-white'
                        : rel.slug === 'pla-plus-3d-printer-filament-grey-silver'
                        ? '/product/pla-plus-3d-printer-filament-grey-silver'
                        : `/shop/filaments/${rel.slug}`
                    }
                    className="w-full py-2 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 14. STICKY MOBILE BOTTOM PURCHASE BAR                    */}
      {/* ======================================================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Gold PLA+</span>
            <span className="text-sm font-bold text-amber-700">Quote on Request</span>
          </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LIGHTBOX FULLSCREEN MODAL                                */}
      {/* ======================================================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{productData.fullTitle}</h3>
                <span className="text-xs text-slate-500">{currentDisplayImage.title} • High Resolution Studio Inspection</span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square sm:aspect-video max-h-[70vh] flex items-center justify-center p-4 bg-slate-50 rounded-2xl my-4">
              <img
                src={currentDisplayImage.src}
                alt={currentDisplayImage.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2 overflow-x-auto">
              {productData.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-12 h-12 rounded-xl border-2 p-1 bg-white cursor-pointer ${
                    i === activeImageIndex ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoldPlaPage
