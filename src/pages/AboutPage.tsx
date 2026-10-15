import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Cpu,
  Workflow,
  CheckCircle2,
  Award,
  Compass,
  Headphones,
  Settings,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getStoredAboutContent, AboutContentConfig } from '../utils/aboutContentConfig'

export const AboutPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [content, setContent] = useState<AboutContentConfig>(getStoredAboutContent)

  useEffect(() => {
    const handler = () => {
      setContent(getStoredAboutContent())
    }
    window.addEventListener('storage', handler)
    window.addEventListener('leniva_about_content_updated', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('leniva_about_content_updated', handler)
    }
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md border border-red-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>{content.hero.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {content.hero.description}
            </p>

            <div className="pt-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200">
                {content.hero.mottoPrefix}
                <span className="text-red-400 font-bold">{content.hero.mottoHighlight}</span>
              </span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal(content.hero.quoteSubject || 'About Page Consultation')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
              >
                {content.hero.primaryBtnText}
              </button>
              <Link
                to={content.hero.secondaryBtnLink || '/contact'}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
              >
                {content.hero.secondaryBtnText}
              </Link>
            </div>
          </div>
        </div>

        {/* Core Overview & Identity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">{content.heritage.tag}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {content.heritage.title}
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {content.heritage.paragraph1}
            </p>

            {/* Portfolio Highlight Callout */}
            {content.heritage.calloutText && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50 to-slate-100 border-l-4 border-red-600 shadow-xs">
                <p className="text-sm sm:text-base font-bold text-slate-950">
                  {content.heritage.calloutText}
                </p>
              </div>
            )}

            <p className="text-sm text-slate-700 leading-relaxed">
              {content.heritage.paragraph2}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed">
              {content.heritage.paragraph3}
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
              <img
                src={content.heritage.posterImage}
                alt={content.heritage.posterAlt}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=About+Leniva'
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">{content.heritage.stat1Title}</strong>
                <span className="text-slate-500">{content.heritage.stat1Subtitle}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">{content.heritage.stat2Title}</strong>
                <span className="text-slate-500">{content.heritage.stat2Subtitle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Portfolio Grid */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">{content.portfolio.tag}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              {content.portfolio.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {content.portfolio.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. CAD Software */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {content.portfolio.cadCard.category}
                </div>
                <h3 className="text-base font-bold text-slate-900">{content.portfolio.cadCard.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.portfolio.cadCard.description}
                </p>
              </div>
              <Link
                to={content.portfolio.cadCard.linkUrl}
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                {content.portfolio.cadCard.linkText}
              </Link>
            </div>

            {/* 2. 3D Printers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {content.portfolio.printerCard.category}
                </div>
                <h3 className="text-base font-bold text-slate-900">{content.portfolio.printerCard.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.portfolio.printerCard.description}
                </p>
              </div>
              <Link
                to={content.portfolio.printerCard.linkUrl}
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                {content.portfolio.printerCard.linkText}
              </Link>
            </div>

            {/* 3. 3D Scanners */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {content.portfolio.scannerCard.category}
                </div>
                <h3 className="text-base font-bold text-slate-900">{content.portfolio.scannerCard.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {content.portfolio.scannerCard.description}
                </p>
              </div>
              <Link
                to={content.portfolio.scannerCard.linkUrl}
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                {content.portfolio.scannerCard.linkText}
              </Link>
            </div>
          </div>
        </div>

        {/* Customer-First Guidance & Support Commitment */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">{content.howWeWork.tag}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {content.howWeWork.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {content.howWeWork.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {content.howWeWork.steps.map((step, idx) => {
              const icons = [Compass, CheckCircle2, Settings, Headphones]
              const StepIcon = icons[idx % icons.length]
              return (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <StepIcon className="w-4 h-4 text-red-600 shrink-0" />
                    <h4>{step.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
