import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  Printer,
  Laptop,
  CheckCircle2,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import {
  getStoredHomeContent,
  HomeContentConfig,
  DEFAULT_HERO_BANNERS,
  FALLBACK_PUBLIC_HERO_BANNERS,
} from '../utils/homeContentConfig'

interface ProductSlideItem {
  src: string
  name: string
}

const ProductCardImageSlideshow: React.FC<{
  slides: ProductSlideItem[]
  categoryTag?: string
  intervalMs?: number
  objectFit?: 'contain' | 'cover'
  brandLogo?: string
  brandPartnerText?: string
}> = ({
  slides,
  categoryTag,
  intervalMs = 2800,
  objectFit = 'contain',
  brandLogo,
  brandPartnerText,
}) => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered || slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % slides.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [isHovered, slides.length, intervalMs])

  const next = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveIdx(prev => (prev + 1) % slides.length)
  }

  const prev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveIdx(prev => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div
      className="relative h-56 bg-slate-50/90 p-3.5 flex items-center justify-center overflow-hidden group/slider select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Bar: Brand Partner Tag (Left) & Active Model Name (Right) - Never Collide */}
      <div className="absolute top-2.5 inset-x-2.5 z-10 flex items-center justify-between gap-1.5 pointer-events-none">
        {brandLogo ? (
          <div className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/90 shadow-2xs min-w-0 max-w-[58%]">
            <img src={brandLogo} alt="Brand" className="h-3.5 w-auto max-w-[48px] object-contain shrink-0" />
            {brandPartnerText && (
              <span className="text-[10px] font-bold text-slate-800 truncate leading-none">{brandPartnerText}</span>
            )}
          </div>
        ) : categoryTag ? (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 border border-slate-200/90 text-slate-700 shadow-2xs backdrop-blur-xs truncate max-w-[58%] shrink-0 leading-none">
            {categoryTag}
          </span>
        ) : <div />}

        {/* Current Active Product Name Pill */}
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/85 text-white shadow-2xs backdrop-blur-xs transition-all duration-300 truncate max-w-[40%] text-right shrink-0 leading-none">
          {slides[activeIdx].name}
        </span>
      </div>

      {/* Crossfading Product Images */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 flex items-center justify-center p-2.5 transition-opacity duration-700 ease-in-out ${
              idx === activeIdx ? 'opacity-100 z-5' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.src}
              alt={slide.name}
              className={`max-h-full max-w-full ${
                objectFit === 'cover' ? 'w-full h-full object-cover rounded-xl' : 'object-contain'
              } drop-shadow-sm transition-transform duration-500 group-hover/slider:scale-105`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows on Hover */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous product image"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next product image"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center shadow-sm opacity-0 group-hover/slider:opacity-100 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Progress Dots at Bottom */}
      {slides.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-1.5 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
          {slides.map((slide, idx) => (
            <button
              key={slide.src}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActiveIdx(idx)
              }}
              aria-label={`Switch to ${slide.name}`}
              className={`transition-all rounded-full cursor-pointer ${
                idx === activeIdx ? 'w-4 h-1.5 bg-red-600' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const HomePage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [homeContent, setHomeContent] = useState<HomeContentConfig>(getStoredHomeContent)

  useEffect(() => {
    const handler = () => {
      setHomeContent(getStoredHomeContent())
    }
    window.addEventListener('storage', handler)
    window.addEventListener('leniva_home_content_updated', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('leniva_home_content_updated', handler)
    }
  }, [])

  const slides = homeContent.hero.slides

  const [currentSlide, setCurrentSlide] = useState(0)

  // Safe active slide index if slides count changes dynamically
  const activeSlideIndex = currentSlide >= slides.length ? 0 : currentSlide
  const activeSlide = slides[activeSlideIndex] || slides[0]

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % (slides.length || 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + (slides.length || 1)) % (slides.length || 1))
  }, [slides.length])

  // Continuous auto-scrolling for hero banner (especially seamless in mobile view)
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      nextSlide()
    }, 3500)
    return () => clearInterval(timer)
  }, [nextSlide, slides.length])

  // Touch gesture support for mobile swiping
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setTouchStartX(null)
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 sm:pb-10">
      {/* ====================================================
          SECTION 1: HERO SHOWCASE CAROUSEL BANNER (WHITE BACKGROUND)
         ==================================================== */}
      <section 
        className="relative bg-white text-slate-900 pt-1.5 sm:pt-4 pb-6 sm:pb-8 lg:pb-12 overflow-hidden"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
          {/* Main Panoramic Hero Showcase Carousel with Curved Edges */}
          <div 
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-white group select-none touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slides container with expanded mobile presence and 3:1 HD desktop ratio */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[1024/341] min-h-[215px] sm:min-h-0 bg-white">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.image || DEFAULT_HERO_BANNERS[index % DEFAULT_HERO_BANNERS.length] || FALLBACK_PUBLIC_HERO_BANNERS[index % FALLBACK_PUBLIC_HERO_BANNERS.length]}
                      alt={slide.alt || slide.title || 'Leniva CAD Solutions'}
                      className="w-full h-full object-cover object-center bg-white select-none"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="sync"
                      onError={(e) => {
                        const target = e.currentTarget
                        const importedFallback = DEFAULT_HERO_BANNERS[index % DEFAULT_HERO_BANNERS.length]
                        const publicFallback = FALLBACK_PUBLIC_HERO_BANNERS[index % FALLBACK_PUBLIC_HERO_BANNERS.length] || '/hero-banner-1.png'
                        if (target.src !== importedFallback && !target.src.endsWith(importedFallback)) {
                          target.src = importedFallback
                        } else if (!target.src.endsWith(publicFallback)) {
                          target.src = publicFallback
                        }
                      }}
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Left & Right Arrow Navigation Controls — Hidden in mobile view only as requested */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="hidden sm:flex absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="hidden sm:flex absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots at Bottom Center — Hidden in mobile view only as requested */}
            <div className="hidden sm:flex absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 items-center space-x-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentSlide
                      ? 'w-7 h-2 bg-red-600 shadow-sm shadow-red-500/50'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Headline & Quick CTAs below the banner based on active slide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>{activeSlide?.tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight leading-snug">
                {homeContent.hero.headlinePrefix}
                <span className="text-red-600">{homeContent.hero.headlineHighlight}</span>
              </h1>
              <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-2xl">
                {homeContent.hero.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={activeSlide?.primaryBtnLink || '/products'}
                className="w-full px-7 py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>{activeSlide?.primaryBtnText || 'Explore'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-2.5">
                <button
                  onClick={() => {
                    const btnText = activeSlide?.secondaryBtnText || 'Request Quote'
                    if (btnText.toLowerCase().includes('demo')) {
                      openQuoteModal(`Request a Demo — ${activeSlide?.title || '3D Solutions'}`)
                    } else {
                      openQuoteModal(`Request Quote — ${activeSlide?.title || 'Engineering Solutions'}`)
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all text-center cursor-pointer"
                >
                  {activeSlide?.secondaryBtnText || 'Request Quote'}
                </button>
                <button
                  onClick={() => openQuoteModal('Talk to an Expert')}
                  className="flex-1 px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-800 hover:text-slate-950 bg-white text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>{homeContent.hero.talkToExpertText || 'Talk to Expert'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: COMPANY INTRODUCTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {homeContent.companyIntro.heading} <br />
              <span className="text-red-600">{homeContent.companyIntro.headingHighlight}</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {homeContent.companyIntro.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm font-semibold text-slate-800 pt-1">
              {homeContent.companyIntro.pillars.map((pillar, idx) => (
                <div key={idx} className={`flex items-center space-x-2.5 ${idx === 2 ? 'sm:col-span-2' : ''}`}>
                  <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={homeContent.companyIntro.btnExploreLink}
                className="px-7 py-3.5 bg-slate-950 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
              >
                {homeContent.companyIntro.btnExploreText}
              </Link>
              <Link
                to={homeContent.companyIntro.btnContactLink}
                className="px-7 py-3.5 border border-slate-300 hover:border-slate-800 text-slate-900 text-sm font-bold rounded-xl transition-all bg-white shadow-2xs"
              >
                {homeContent.companyIntro.btnContactText}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
              <img
                src={homeContent.companyIntro.posterImage}
                alt={homeContent.companyIntro.posterAlt}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: 3D PRINTER CATEGORIES (CORE BUSINESS INTRO)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider">
              <Printer className="w-3.5 h-3.5" />
              <span>{homeContent.printers.sectionBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              {homeContent.printers.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {homeContent.printers.description}
            </p>
          </div>
          <Link
            to={homeContent.printers.viewAllLink}
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors shrink-0 group"
          >
            <span>{homeContent.printers.viewAllText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: FDM 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
            <ProductCardImageSlideshow
              slides={homeContent.printers.fdm.slides}
              categoryTag={homeContent.printers.fdm.categoryTag}
              intervalMs={homeContent.printers.fdm.intervalMs || 2800}
            />
            <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.printers.fdm.technologyTag}</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.printers.fdm.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {homeContent.printers.fdm.description}
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  {homeContent.printers.fdm.bulletPoints.map((bullet, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to={homeContent.printers.fdm.btnLink}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>{homeContent.printers.fdm.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: DLP 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
            <ProductCardImageSlideshow
              slides={homeContent.printers.dlp.slides}
              categoryTag={homeContent.printers.dlp.categoryTag}
              intervalMs={homeContent.printers.dlp.intervalMs || 3200}
            />
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.printers.dlp.technologyTag}</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.printers.dlp.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {homeContent.printers.dlp.description}
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  {homeContent.printers.dlp.bulletPoints.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to={homeContent.printers.dlp.btnLink}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>{homeContent.printers.dlp.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Industrial LCD 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0 md:col-span-2 lg:col-span-1">
            <ProductCardImageSlideshow
              slides={homeContent.printers.lcd.slides}
              categoryTag={homeContent.printers.lcd.categoryTag}
              intervalMs={homeContent.printers.lcd.intervalMs || 3000}
            />
            <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.printers.lcd.technologyTag}</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.printers.lcd.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {homeContent.printers.lcd.description}
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  {homeContent.printers.lcd.bulletPoints.map((bullet, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to={homeContent.printers.lcd.btnLink}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>{homeContent.printers.lcd.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: CAD & 3D DESIGN SOFTWARE (CORE BUSINESS INTRO)
         ==================================================== */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider">
                <Laptop className="w-3.5 h-3.5" />
                <span>{homeContent.cadSoftware.sectionBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {homeContent.cadSoftware.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {homeContent.cadSoftware.description}
              </p>
            </div>
            <Link
              to={homeContent.cadSoftware.viewAllLink}
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors shrink-0 group"
            >
              <span>{homeContent.cadSoftware.viewAllText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: ARES CAD by Graebert */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
              <ProductCardImageSlideshow
                slides={homeContent.cadSoftware.ares.slides}
                brandLogo={homeContent.cadSoftware.ares.brandLogo}
                brandPartnerText={homeContent.cadSoftware.ares.brandPartnerText}
                intervalMs={homeContent.cadSoftware.ares.intervalMs || 3500}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.cadSoftware.ares.categoryTag}</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.cadSoftware.ares.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {homeContent.cadSoftware.ares.description}
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    {homeContent.cadSoftware.ares.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={homeContent.cadSoftware.ares.btnLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{homeContent.cadSoftware.ares.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Trimble SketchUp */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
              <ProductCardImageSlideshow
                slides={homeContent.cadSoftware.sketchup.slides}
                brandLogo={homeContent.cadSoftware.sketchup.brandLogo}
                brandPartnerText={homeContent.cadSoftware.sketchup.brandPartnerText}
                intervalMs={homeContent.cadSoftware.sketchup.intervalMs || 3800}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.cadSoftware.sketchup.categoryTag}</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.cadSoftware.sketchup.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {homeContent.cadSoftware.sketchup.description}
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    {homeContent.cadSoftware.sketchup.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={homeContent.cadSoftware.sketchup.btnLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{homeContent.cadSoftware.sketchup.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Chaos Rendering Suites */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0 md:col-span-2 lg:col-span-1">
              <ProductCardImageSlideshow
                slides={homeContent.cadSoftware.chaos.slides}
                brandLogo={homeContent.cadSoftware.chaos.brandLogo}
                brandPartnerText={homeContent.cadSoftware.chaos.brandPartnerText}
                intervalMs={homeContent.cadSoftware.chaos.intervalMs || 3600}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">{homeContent.cadSoftware.chaos.categoryTag}</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">{homeContent.cadSoftware.chaos.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {homeContent.cadSoftware.chaos.description}
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    {homeContent.cadSoftware.chaos.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={homeContent.cadSoftware.chaos.btnLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>{homeContent.cadSoftware.chaos.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
export default HomePage
