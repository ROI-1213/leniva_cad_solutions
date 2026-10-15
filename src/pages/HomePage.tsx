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

import heroBanner1 from '../assets/hero/hero-banner-1.png'
import heroBanner2 from '../assets/hero/hero-banner-2.png'
import heroBanner3 from '../assets/hero/hero-banner-3.png'
import heroBanner4 from '../assets/hero/hero-banner-4.png'

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

  const slides = [
    {
      id: 1,
      image: heroBanner1,
      alt: 'Next Generation 3D Printing Technology — Leniva CAD Solutions',
      title: 'Next Generation 3D Printing Technology',
      subtitle: 'Powering Creativity, Enabling Industry',
      tag: 'Design • Prototype • Manufacture',
      badge: 'Full Additive Ecosystem',
      primaryBtnText: 'Explore 3D Printers',
      primaryBtnLink: '/products',
      secondaryBtnText: 'Request Quote',
      quoteSubject: 'Next Generation 3D Printing Technology Consultation',
    },
    {
      id: 2,
      image: heroBanner2,
      alt: 'Industrial Grade Precision Performance Possibilities — Leniva CAD Solutions',
      title: 'Precision, Performance, Possibilities',
      subtitle: 'Large Ideas, Bigger Possibilities',
      tag: 'Industrial Grade 3D Technologies',
      badge: 'Full Additive Ecosystem',
      primaryBtnText: 'Explore Our Range',
      primaryBtnLink: '/products',
      secondaryBtnText: 'Request a Demo',
      quoteSubject: 'Industrial Grade 3D Solutions Consultation',
    },
    {
      id: 3,
      image: heroBanner3,
      alt: 'Professional 3D Printing Solutions — Pratham 3 Rapid — Leniva CAD Solutions',
      title: 'Professional 3D Printing Solutions',
      subtitle: 'High-Speed Precision Prototyping & Production',
      tag: 'Pratham 3 Rapid • High-Speed FDM',
      badge: 'Advanced Additive Manufacturing',
      primaryBtnText: 'Explore Pratham 3 Rapid',
      primaryBtnLink: '/products/pratham-3-rapid',
      secondaryBtnText: 'Request Quote',
      quoteSubject: 'Pratham 3 Rapid Professional 3D Printing Solutions Inquiry',
    },
    {
      id: 4,
      image: heroBanner4,
      alt: 'Professional CAD & 3D Design Software — ARES, SketchUp, Chaos — Leniva CAD Solutions',
      title: 'CAD Softwares',
      subtitle: 'Official Licenses for ARES CAD, Trimble SketchUp & Chaos Suites',
      tag: 'ARES • SketchUp • Chaos Suites',
      badge: 'Authorized Software Partner',
      primaryBtnText: 'Explore CAD Software',
      primaryBtnLink: '/products/cad-software',
      secondaryBtnText: 'Request Quote',
      quoteSubject: 'CAD Software Official Licensing Consultation',
    },
  ]

  const fdmSlides: ProductSlideItem[] = [
    { src: '/images/products/pratham-3-0.png', name: 'Pratham 3.0' },
    { src: '/images/products/pratham-mini-transparent.png', name: 'Pratham Mini' },
    { src: '/images/products/pratham-desktop.png', name: 'Pratham Desktop' },
    { src: '/images/products/pratham-5-0.png', name: 'Pratham 5.0' },
    { src: '/images/products/pratham-6-0.png', name: 'Pratham 6.0' },
    { src: '/images/products/pratham-x-transparent.png', name: 'Pratham X' },
    { src: '/images/products/pratham-3-rapid-transparent.png', name: 'Pratham 3 Rapid' },
  ]

  const dlpSlides: ProductSlideItem[] = [
    { src: '/images/products/eka-xl.png', name: 'EKA XL' },
    { src: '/images/products/eka-ht.png', name: 'EKA HT' },
    { src: '/images/products/eka-xle.png', name: 'EKA XLE' },
  ]

  const lcdSlides: ProductSlideItem[] = [
    { src: '/images/products/eka-gt-max.png', name: 'EKA GT MAX' },
    { src: '/images/products/eka-f1-16k.png', name: 'EKA F1 16K' },
  ]

  const aresSlides: ProductSlideItem[] = [
    { src: '/images/software/ares-commander.jpg', name: 'ARES Commander' },
    { src: '/images/software/ares-mechanical.jpg', name: 'ARES Mechanical' },
    { src: '/images/software/ares-electrical.jpg', name: 'ARES Electrical' },
    { src: '/images/software/ares-standard.jpg', name: 'ARES Standard' },
  ]

  const sketchupSlides: ProductSlideItem[] = [
    { src: '/images/software/sketchup-pro.jpg', name: 'SketchUp Pro' },
    { src: '/images/software/sketchup-studio.jpg', name: 'SketchUp Studio' },
    { src: '/images/software/sketchup-scan.jpg', name: 'SketchUp Scan' },
    { src: '/images/software/sketchup-advanced.jpg', name: 'Advanced Workflows' },
  ]

  const chaosSlides: ProductSlideItem[] = [
    { src: '/images/software/enscape-3d.jpg', name: 'Enscape 3D' },
    { src: '/images/software/chaos-vray.jpg', name: 'Chaos V-Ray' },
    { src: '/images/software/chaos-corona.jpg', name: 'Chaos Corona' },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Continuous auto-scrolling every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 sm:pb-10">
      {/* ====================================================
          SECTION 1: HERO SHOWCASE CAROUSEL BANNER (WHITE BACKGROUND)
         ==================================================== */}
      <section 
        className="relative bg-white text-slate-900 pt-4 pb-8 lg:pb-12 overflow-hidden"
      >
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Main Panoramic Hero Showcase Carousel with Curved Edges */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-white group">
            {/* Slides container with exact 3:1 HD banner aspect ratio */}
            <div className="relative w-full aspect-[1024/341] bg-white">
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
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover bg-white select-none"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
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

            {/* Left & Right Arrow Navigation Controls */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots at Bottom Center */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
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
                <span>{slides[currentSlide].tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight leading-snug">
                Your Authorized Partner in{' '}
                <span className="text-red-600">CAD & 3D Technology</span>
              </h1>
              <p className="text-sm sm:text-[15px] text-slate-600 font-normal leading-relaxed max-w-2xl">
                We are authorized dealers for leading CAD software, including ARES CAD, SketchUp, and Chaos, along with advanced 3D printing and 3D scanning solutions to meet your design and engineering needs.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={slides[currentSlide].primaryBtnLink}
                className="w-full px-7 py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>{slides[currentSlide].primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-2.5">
                <button
                  onClick={() => openQuoteModal(slides[currentSlide].quoteSubject)}
                  className="flex-1 px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all text-center cursor-pointer"
                >
                  {slides[currentSlide].secondaryBtnText}
                </button>
                <button
                  onClick={() => openQuoteModal('Talk to an Expert')}
                  className="flex-1 px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-800 hover:text-slate-950 bg-white text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Talk to Expert</span>
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
              Your Partner for <br />
              <span className="text-red-600">Advanced 3D Solutions</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Leniva CAD Solutions is a trusted supplier and solutions provider of CAD software, 3D printers, 3D scanners and related accessories. We bring proven engineering technologies to help industries, businesses and educational institutions adopt advanced 3D solutions for design, prototyping and production.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm font-semibold text-slate-800 pt-1">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>1. Licensed CAD & Rendering Software</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>2. Industrial & Desktop 3D Printers</span>
              </div>
              <div className="flex items-center space-x-2.5 sm:col-span-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>3. 3D Scanners (Professional & Reverse Engineering)</span>
              </div>
            </div>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="px-7 py-3.5 bg-slate-950 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
              >
                Explore Solutions
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 border border-slate-300 hover:border-slate-800 text-slate-900 text-sm font-bold rounded-xl transition-all bg-white shadow-2xs"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
              <img
                src="/images/about/about-leniva-poster.jpg"
                alt="Leniva CAD Solutions — Authorized Software Partners & 3D Hardware"
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
              <span>Core Business • 3D Printing Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              3D Printer Technologies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We provide proven additive manufacturing systems tailored for functional engineering prototypes, fine jewellery casting, dental models, and industrial production.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors shrink-0 group"
          >
            <span>View All 3D Printers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: FDM 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
            <ProductCardImageSlideshow
              slides={fdmSlides}
              categoryTag="Industrial &amp; Desktop"
              intervalMs={2800}
            />
            <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Fused Deposition Modeling</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">FDM 3D Printers</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Robust extrusion systems built for functional prototypes, jigs, tooling, and durable engineering parts with build envelopes up to 1 meter³.
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Build volumes from 170 mm to 1000 mm³</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>PLA, ABS, PETG, TPU, Nylon &amp; Carbon-Fiber</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Pratham Mini, Desktop, 3.0, 5.0, 6.0 &amp; X Series</span>
                  </div>
                </div>
              </div>
              <Link
                to="/products/fdm-3d-printers"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Explore FDM Printers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: DLP 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
            <ProductCardImageSlideshow
              slides={dlpSlides}
              categoryTag="High-Precision Resin"
              intervalMs={3200}
            />
            <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Digital Light Processing</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">DLP 3D Printers</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High-precision photopolymer resin systems engineered for direct jewellery casting patterns, dental models, and intricate micro-components.
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">Direct castable resin with 100% clean burnout</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">Razor-sharp filigree and ultra-smooth surface finish</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">EKA HT, EKA XL, and EKA XLE series</span>
                  </div>
                </div>
              </div>
              <Link
                to="/products/dlp-3d-printers"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Explore DLP Printers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Industrial LCD 3D Printers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0 md:col-span-2 lg:col-span-1">
            <ProductCardImageSlideshow
              slides={lcdSlides}
              categoryTag="8K &amp; 16K MSLA"
              intervalMs={3000}
            />
            <div className="p-6 flex flex-col flex-1 justify-between space-y-5">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600">Masked Stereolithography</span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">Industrial LCD Printers</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  High-speed monochrome LCD masking systems for rapid batch throughput, micro-fine detailing, and productive engineering resin manufacturing.
                </p>
                <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Up to 16K ultra-high resolution monochrome panels</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>High cure speed for rapid batch output</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>EKA GT MAX &amp; EKA F1 16K micro-detailing</span>
                  </div>
                </div>
              </div>
              <Link
                to="/products/industrial-lcd-3d-printers"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Explore LCD Printers</span>
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
                <span>Core Business • Authorized Software Partner</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                CAD &amp; 3D Design Software
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Authorized reseller and technical partner for leading 2D/3D CAD, BIM, and photorealistic rendering suites with authentic licensing, deployment, and ongoing support.
              </p>
            </div>
            <Link
              to="/products/cad-software"
              className="inline-flex items-center space-x-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors shrink-0 group"
            >
              <span>View All CAD Software</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: ARES CAD by Graebert */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
              <ProductCardImageSlideshow
                slides={aresSlides}
                brandLogo="/images/brands/ares-cad.png"
                brandPartnerText="Official Graebert Partner"
                intervalMs={3500}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">DWG 2D &amp; 3D CAD</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">ARES CAD Systems</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Cost-effective, modern DWG-native CAD software featuring Trinity technology across Desktop, Cloud, and Mobile with dedicated Mechanical and Electrical suites.
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Perpetual and flexible annual licensing</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Trinity ecosystem: Desktop, Cloud (Kudo), Mobile (Touch)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">ARES Commander, Standard, Mechanical &amp; Electrical</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/products/cad-software"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>Explore ARES CAD</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Trimble SketchUp */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0">
              <ProductCardImageSlideshow
                slides={sketchupSlides}
                brandLogo="/images/brands/sketchup.png"
                brandPartnerText="Authorized Trimble Partner"
                intervalMs={3800}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">3D Modeling &amp; BIM</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">Trimble SketchUp</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The world's most intuitive 3D modeling platform for architects, interior designers, and construction professionals, featuring LayOut documentation and Scan-to-BIM.
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Fast, intuitive conceptual design &amp; 3D modeling</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">2D LayOut construction sets &amp; Scan-to-BIM integration</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">SketchUp Pro, SketchUp Studio, and Scan workflows</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/products/sketchup"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>Explore SketchUp</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Chaos Rendering Suites */}
            <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden min-w-0 md:col-span-2 lg:col-span-1">
              <ProductCardImageSlideshow
                slides={chaosSlides}
                brandLogo="/images/brands/chaos.jpg"
                brandPartnerText="Authorized Chaos Partner"
                intervalMs={3600}
                objectFit="contain"
              />
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">Visualization &amp; Rendering</span>
                    <h3 className="text-xl font-bold text-slate-950 mt-0.5">Chaos Rendering</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Industry-leading photorealistic ray tracing, real-time visualization, and VR walkthrough engines trusted by architectural visualizers and design studios worldwide.
                  </p>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Real-time rendering &amp; VR walkthroughs (Enscape)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Photorealistic ray-tracing fidelity (V-Ray &amp; Corona)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">Enscape, Chaos V-Ray, and Chaos Corona</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/products/enscape"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-red-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span>Explore Chaos Suites</span>
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
