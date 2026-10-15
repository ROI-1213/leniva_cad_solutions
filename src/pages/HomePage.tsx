import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

import heroBanner1 from '../assets/hero/hero-banner-1.png'
import heroBanner2 from '../assets/hero/hero-banner-2.png'
import heroBanner3 from '../assets/hero/hero-banner-3.png'
import heroBanner4 from '../assets/hero/hero-banner-4.png'

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
          SECTION 6: COMPANY INTRODUCTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
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

    </div>
  )
}
export default HomePage
