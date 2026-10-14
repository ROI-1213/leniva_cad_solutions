import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  Users,
  Lightbulb,
  GraduationCap,
  Wrench,
  Smile,
  Repeat,
  Package,
  Briefcase,
  Share2,
  Check,
} from 'lucide-react'
import { initialWhitePlaData, WhitePlaProductData } from '../data/whitePlaProductData'
import { useApp } from '../context/AppContext'

export const WhitePlaDetailPage: React.FC<{ customData?: Partial<WhitePlaProductData> }> = ({
  customData,
}) => {
  // Merge initial data with any dynamic custom data or props
  const product: WhitePlaProductData = {
    ...initialWhitePlaData,
    ...customData,
  }

  const { toggleWishlist, isInWishlist, openQuoteModal } = useApp()
  const inWishlist = isInWishlist(product.id)

  // Interactive States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [addedToCartToast, setAddedToCartToast] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewName, setReviewName] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // Desktop Image Zoom magnifier
  const [zoomStyle, setZoomStyle] = useState<{ display: string; backgroundPosition: string }>({
    display: 'none',
    backgroundPosition: '0% 0%',
  })
  const mainImageRef = useRef<HTMLDivElement>(null)

  // Dynamic SEO meta tags
  useEffect(() => {
    document.title = product.seo.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', product.seo.description)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [product.seo.title, product.seo.description])

  // Quantity handlers
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1))
  const increaseQty = () => setQuantity(q => (q < 50 ? q + 1 : q))

  // Zoom handlers for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' })
  }

  const handleAddToCart = () => {
    setAddedToCartToast(true)
    setTimeout(() => setAddedToCartToast(false), 2500)
    openQuoteModal(`${product.name} (Qty: ${quantity})`)
  }

  // handleBuyNow removed in favor of quote modal

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.fullTitle,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  // Resolve icon component dynamically
  const renderIcon = (name: string, className = 'w-4 h-4') => {
    switch (name) {
      case 'Layers': return <Layers className={className} />
      case 'Palette': return <Palette className={className} />
      case 'Gauge': return <Gauge className={className} />
      case 'Scale': return <Scale className={className} />
      case 'Printer': return <Printer className={className} />
      case 'Box': return <Box className={className} />
      case 'Sparkles': return <Sparkles className={className} />
      case 'Users': return <Users className={className} />
      case 'Smile': return <Smile className={className} />
      case 'Repeat': return <Repeat className={className} />
      case 'ShieldCheck': return <ShieldCheck className={className} />
      case 'Maximize2': return <Maximize2 className={className} />
      case 'Package': return <Package className={className} />
      case 'Lightbulb': return <Lightbulb className={className} />
      case 'GraduationCap': return <GraduationCap className={className} />
      case 'Wrench': return <Wrench className={className} />
      case 'Briefcase': return <Briefcase className={className} />
      case 'Truck': return <Truck className={className} />
      case 'Lock': return <Lock className={className} />
      default: return <Sparkles className={className} />
    }
  }

  const activeImage = product.images[selectedImageIndex] || product.images[0]

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 antialiased pb-20 md:pb-16 selection:bg-red-500 selection:text-white">
      {/* Toast Alert */}
      {addedToCartToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">{product.name}</span>
            <span className="text-slate-300">Added to your order enquiry (Qty: {quantity})</span>
          </div>
        </div>
      )}

      {/* TOP CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto py-1 scrollbar-none">
          <Link to="/" className="hover:text-slate-900 whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/shop" className="hover:text-slate-900 whitespace-nowrap">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/shop/filaments" className="hover:text-slate-900 whitespace-nowrap">Filaments</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{product.name}</span>
        </nav>

        {/* ======================================================== */}
        {/* 1. PRODUCT HERO SECTION (TWO-COLUMN PREMIUM LAYOUT)       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: LARGE PRODUCT GALLERY & THUMBNAILS      */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Display Stage with Zoom */}
              <div
                ref={mainImageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-square rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 border border-slate-200/80 overflow-hidden flex items-center justify-center p-6 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                {/* Desktop Magnifier Lens overlay */}
                <div
                  className="hidden lg:block absolute inset-0 pointer-events-none rounded-2xl border border-slate-300 shadow-2xl transition-opacity duration-200"
                  style={{
                    display: zoomStyle.display,
                    backgroundImage: `url(${activeImage.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '220%',
                    backgroundPosition: zoomStyle.backgroundPosition,
                  }}
                />

                {/* View Fullscreen trigger pill */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLightboxOpen(true)
                  }}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-red-600 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md border border-slate-200 backdrop-blur-sm flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand View</span>
                </button>

                {/* Current Tag Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {activeImage.tag}
                </div>

                {/* Mobile Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
                  }}
                  className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
                  }}
                  className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Gallery (5 Views as requested) */}
              <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                {product.images.map((img, idx) => {
                  const isSelected = idx === selectedImageIndex
                  return (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-xl p-1.5 transition-all cursor-pointer flex flex-col items-center justify-center border-2 bg-slate-50 ${
                        isSelected
                          ? 'border-red-600 shadow-md ring-2 ring-red-100 bg-white'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-white opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-contain rounded-md"
                      />
                      <span className="sr-only">{img.title}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center space-x-1">
                <span>Click image to open high-resolution fullscreen inspection</span>
              </p>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: PRODUCT INFO & PURCHASE CONTROLS       */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badge & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                    {product.badge}
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
                          id: product.id,
                          type: 'shop',
                          name: product.name,
                          slug: product.sku,
                          image: product.images[0].src,
                          category: product.category,
                          price: product.price,
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
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {product.weight} | {product.diameter} Standard Filament
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-slate-300">•</span>
                <a href="#reviews" className="text-xs font-semibold text-red-600 hover:underline">
                  {product.reviewsCount} Customer Reviews
                </a>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Verified Quality
                </span>
              </div>

              {/* Pricing Block */}
              <div className="space-y-1.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
                    Official Quotation & Bulk Orders
                  </span>
                  <span className="px-2.5 py-0.5 bg-red-600 text-white text-[11px] font-bold rounded-md shadow-2xs">
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
                {product.shortDescription}
              </p>

              {/* ======================================================== */}
              {/* 2. PURCHASE SECTION                                      */}
              {/* ======================================================== */}
              <div className="space-y-4 pt-2">
                {/* Stock Indicator */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-bold text-emerald-700">{product.stockStatus}</span>
                  <span className="text-slate-400">• Dispatches within 24 hours</span>
                </div>

                {/* Quantity and Action Buttons */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs overflow-hidden">
                      <button
                        onClick={decreaseQty}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-xs font-bold text-slate-900 min-w-10 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={increaseQty}
                        className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      (Total Net: {quantity} KG)
                    </span>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => openQuoteModal(`[Filament Inquiry] ${product.name} (${quantity} Spool${quantity > 1 ? 's' : ''})`)}
                      className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-black text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
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
              </div>

              {/* ======================================================== */}
              {/* 11. TRUST / SHIPPING HIGHLIGHTS                           */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
                {product.trustPillars.map((tp, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-start space-x-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                      {renderIcon(tp.iconName, 'w-3.5 h-3.5')}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-900 leading-tight">{tp.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {tp.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. QUICK SPECIFICATIONS GRID                              */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Product Specifications
              </h2>
              <p className="text-xs text-slate-500">
                Key physical and operational parameters at a glance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {product.quickSpecifications.map((spec, i) => (
              <div
                key={i}
                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 hover:border-red-200 hover:bg-red-50/20 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:text-red-600 group-hover:border-red-200 flex items-center justify-center transition-colors">
                  {renderIcon(spec.iconName, 'w-4 h-4')}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block mt-0.5">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. PRODUCT DESCRIPTION & ENGINEERING CONTEXT              */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Engineered For Consistency
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            PLA 3D Printer Filament – White
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {product.descriptionParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. WHY CHOOSE WHITE PLA FILAMENT? (6 FEATURE CARDS)       */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Reliable Performance
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Why Choose White PLA Filament?
            </h2>
            <p className="text-xs text-slate-500">
              Balanced mechanical reliability and straightforward processing for everyday additive workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {product.whyChooseCards.map(card => (
              <div
                key={card.id}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 hover:border-red-300 hover:shadow-md transition-all flex flex-col space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-red-600 flex items-center justify-center shrink-0 shadow-xs">
                  {renderIcon(card.iconName, 'w-4 h-4')}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-950">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. APPLICATIONS ("PERFECT FOR" 6 CARDS)                  */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Versatile Utility
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Perfect For
            </h2>
            <p className="text-xs text-slate-500">
              Six proven application domains where white PLA delivers exceptional clarity and value
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {product.applicationCards.map(app => (
              <div
                key={app.id}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-red-100/70 text-red-600 flex items-center justify-center shrink-0">
                    {renderIcon(app.iconName, 'w-4 h-4')}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {app.subtitle}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7 & 8. MATERIAL EXPLANATION ("WHAT IS PLA?") & AUDIENCE   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Section 7: What is PLA? */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Polymer Fundamentals
            </span>
            <h2 className="text-xl font-black text-slate-950 tracking-tight">
              What is PLA?
            </h2>
            <div className="space-y-3 pt-1">
              {product.whatIsPlaPoints.map((point, i) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-600 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Who Is It For? ("Designed For") */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Intended Users
            </span>
            <h2 className="text-xl font-black text-slate-950 tracking-tight">
              Designed For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {product.targetAudience.map((aud, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center space-x-2 text-red-600">
                    {renderIcon(aud.iconName, 'w-4 h-4')}
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {aud.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-950">{aud.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{aud.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. PRINTER COMPATIBILITY                                 */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Hardware Matching
              </span>
              <h2 className="text-xl font-black tracking-tight text-white">
                {product.compatibilityInfo.title}
              </h2>
            </div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <Check className="w-3.5 h-3.5" />
              <span>{product.compatibilityInfo.badge}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="space-y-1">
              <strong className="text-white font-bold block">Intended Systems:</strong>
              <p className="text-slate-400 leading-relaxed">
                Standard FDM / FFF 3D printers equipped with 1.75 mm extrusion assemblies (Make3D, Creality, Anycubic, Bambu Lab, Prusa, etc.).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white font-bold block">Important Specification Note:</strong>
              <p className="text-slate-400 leading-relaxed">
                {product.compatibilityInfo.guidance}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 10. TECHNICAL SPECIFICATION TABLE                        */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Technical Specification Table
              </h2>
              <p className="text-xs text-slate-500">
                Factual product data sheet for Make3D White PLA
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-100">
                {product.technicalSpecsTable.map((row, i) => (
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
        {/* 12. REVIEWS SECTION                                      */}
        {/* ======================================================== */}
        <div id="reviews" className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Verified Customer Feedback
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Customer Reviews
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
            >
              Write a Review
            </button>
          </div>

          {/* Rating Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <div className="md:col-span-4 text-center md:text-left space-y-1 md:border-r border-slate-200/80 md:pr-6">
              <span className="text-5xl font-black text-slate-950">{product.rating.toFixed(1)}</span>
              <div className="flex items-center justify-center md:justify-start space-x-1 text-amber-400 py-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Based on {product.reviewsCount} customer reviews
              </p>
            </div>

            <div className="md:col-span-8 space-y-2 text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-12 font-bold text-slate-600">5 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-amber-400 rounded-full" />
                </div>
                <span className="w-8 font-bold text-slate-900 text-right">100%</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <span className="w-12">4 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-amber-400 rounded-full" />
                </div>
                <span className="w-8 text-right">0%</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <span className="w-12">3 Star</span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-amber-400 rounded-full" />
                </div>
                <span className="w-8 text-right">0%</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-4 pt-2">
            {[
              {
                author: 'Vikas Sharma',
                role: 'Industrial Designer, Pune',
                rating: 5,
                date: 'September 2026',
                title: 'Clean white surface and zero layer jams',
                comment:
                  'Used this White PLA for architecture models and mechanical casing mockups. The opaque white color is uniform across the entire 1 KG spool with zero diameter swelling.',
              },
              {
                author: 'Karthik R.',
                role: 'STEM Lab Coordinator, Bengaluru',
                rating: 5,
                date: 'August 2026',
                title: 'Great starting material for students',
                comment:
                  'Prints predictably at 205°C on our Pratham printers. Adhesion to clean PEI sheets is instant and clean.',
              },
              {
                author: 'Sunil Mehta',
                role: 'Rapid Prototyping Engineer',
                rating: 5,
                date: 'July 2026',
                title: 'Consistent spool winding and dry packaging',
                comment:
                  'Arrived tightly vacuum sealed with fresh silica gel. The winding on the clear spool was neat with no crossed loops.',
              },
            ].map((rev, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                      {rev.author[0]}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                      <p className="text-[10px] text-slate-400">{rev.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{rev.date} • Verified Purchase</span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 13. RELATED PRODUCTS ("YOU MAY ALSO LIKE")               */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Explore More Colors & Materials
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                You May Also Like
              </h2>
            </div>
            <Link
              to="/shop/filaments"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>View All 8 Colors</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Responsive Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.relatedProducts.map(rel => (
              <div
                key={rel.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200/80 hover:border-red-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group p-3.5 space-y-3"
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
                  <div className="flex items-center space-x-1 text-amber-400 text-[10px]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="font-bold text-slate-800">{rel.rating}</span>
                    <span className="text-slate-400">({rel.reviewsCount})</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {rel.name}
                  </h4>
                  <div className="pt-0.5">
                    <span className="text-sm font-bold text-red-600">Quote on Request</span>
                  </div>
                </div>

                <Link
                  to={`/shop/filaments/${rel.slug}`}
                  className="w-full py-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
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
      {/* 16. STICKY MOBILE BOTTOM PURCHASE BAR                    */}
      {/* ======================================================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">White PLA</span>
            <span className="text-sm font-bold text-red-600">Quote on Request</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="py-2.5 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart ({quantity})</span>
        </button>
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
                <h3 className="text-sm font-bold text-slate-900">{product.name}</h3>
                <span className="text-xs text-slate-500">{activeImage.title} • High Resolution</span>
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
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Thumbnail selector inside lightbox */}
            <div className="flex items-center justify-center space-x-2 pt-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-12 h-12 rounded-xl border-2 p-1 bg-white cursor-pointer ${
                    i === selectedImageIndex ? 'border-red-600 ring-2 ring-red-100' : 'border-slate-200'
                  }`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* WRITE A REVIEW MODAL                                     */}
      {/* ======================================================== */}
      {isReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-950">Write a Customer Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Thank You For Your Review!</h4>
                <p className="text-xs text-slate-500">Your feedback has been recorded and will appear shortly.</p>
                <button
                  onClick={() => {
                    setReviewSubmitted(false)
                    setIsReviewModalOpen(false)
                  }}
                  className="mt-4 px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Rating</label>
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Review Comments</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Share your experience regarding print quality, adhesion, and spool winding..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  onClick={() => {
                    if (reviewName.trim() && reviewComment.trim()) {
                      setReviewSubmitted(true)
                    }
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WhitePlaDetailPage
