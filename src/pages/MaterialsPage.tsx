import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  ShoppingBag,
  Heart,
  Star,
  Check,
  X,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  HelpCircle,
  Phone,
} from 'lucide-react'
import {
  materialFamilies,
  filamentProducts,
  MaterialFamily,
} from '../data/materialsHub'
import { useApp } from '../context/AppContext'

// Rating dots component (renders filled vs empty circles)
const RatingDots: React.FC<{ value: number; max?: number; colorClass?: string }> = ({
  value,
  max = 5,
  colorClass = 'text-red-600',
}) => {
  return (
    <div className="flex items-center space-x-1" title={`${value}/${max}`}>
      {Array.from({ length: max }).map((_, idx) => (
        <span
          key={idx}
          className={`inline-block w-2.5 h-2.5 rounded-full transition-colors ${
            idx < value ? `${colorClass} bg-current` : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

// Finder need definitions
interface FinderNeed {
  id: string
  label: string
  recommendedMaterialSlug: string
  tagline: string
  reason: string
}

const finderNeeds: FinderNeed[] = [
  {
    id: 'prototype',
    label: 'Early Prototyping',
    recommendedMaterialSlug: 'pla',
    tagline: 'Zero warping & crisp dimensional precision',
    reason: 'PLA delivers immediate visual feedback with sharp details and virtually zero warping without requiring a heated chamber.',
  },
  {
    id: 'mechanical',
    label: 'Mechanical & Functional Parts',
    recommendedMaterialSlug: 'abs',
    tagline: 'High impact resistance & 98°C heat deflection',
    reason: 'ABS provides high tensile toughness, impact absorption, and can be post-machined, tapped, or acetone-smoothed.',
  },
  {
    id: 'flexible',
    label: 'Flexible Seals & Wearables',
    recommendedMaterialSlug: 'tpu',
    tagline: 'Shore 95A elastomeric flexibility',
    reason: 'TPU bends, flexes, and compresses repeatedly without fatigue, making it perfect for gaskets, phone cases, and grips.',
  },
  {
    id: 'outdoor',
    label: 'Outdoor & Weather Exposure',
    recommendedMaterialSlug: 'petg',
    tagline: 'Chemical, moisture & UV resilience',
    reason: 'PETG combines the toughness of ABS with natural UV resistance and zero water absorption for outdoor enclosures.',
  },
  {
    id: 'decorative',
    label: 'Decorative & Concept Models',
    recommendedMaterialSlug: 'pla',
    tagline: 'Rich color palette & silky smooth perimeters',
    reason: 'PLA has the best aesthetic layer stacking, low odor extrusion, and comes in rich matte, silk, and vibrant finishes.',
  },
  {
    id: 'automotive',
    label: 'Automotive & High-Heat Brackets',
    recommendedMaterialSlug: 'cf-abs',
    tagline: 'Carbon fiber stiffness with 105°C thermal limit',
    reason: 'CF-ABS stops ABS shrinkage while boosting flexural modulus for under-the-hood engine bay brackets and ducting.',
  },
  {
    id: 'structural',
    label: 'Structural Frames & Drones',
    recommendedMaterialSlug: 'pla-cf',
    tagline: 'Lightweight carbon reinforcement',
    reason: 'PLA-CF delivers immense stiffness-to-weight ratio for quadcopter arms and robotic end-effectors with a stealth matte texture.',
  },
  {
    id: 'support',
    label: 'Dual-Extrusion Soluble Support',
    recommendedMaterialSlug: 'hips',
    tagline: '100% Limonene dissolvable support',
    reason: 'HIPS shares identical thermal shrinkage with ABS, dissolving cleanly in Limonene for complex hollow geometries.',
  },
  {
    id: 'lightweight',
    label: 'Lightweight Rigidity',
    recommendedMaterialSlug: 'pla-cf',
    tagline: 'High stiffness with easy printing',
    reason: 'PLA-CF gives you carbon-fiber rigidity without requiring high-temperature nozzles or heated build chambers.',
  },
]

export interface MaterialsPageProps {
  forcedCategory?: 'filaments' | 'resins' | 'accessories' | string
}

export const MaterialsPage: React.FC<MaterialsPageProps> = () => {
  const { openQuoteModal, toggleWishlist, isInWishlist } = useApp()

  // State management
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialFamily | null>(null)
  const [selectedFinderNeedId, setSelectedFinderNeedId] = useState<string>('prototype')
  const [compareSlugs, setCompareSlugs] = useState<string[]>([
    'pla',
    'abs',
    'petg',
    'tpu',
    'pla-cf',
  ])
  const [familyTab, setFamilyTab] = useState<'all' | 'standard' | 'engineering' | 'flexible' | 'support' | 'carbon'>('all')
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'regular' | 'special' | 'pla' | 'abs' | 'petg' | 'tpu' | 'hips' | 'pla-cf' | 'cf-abs'>('all')
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  // Section refs for smooth scrolling
  const explorerRef = useRef<HTMLDivElement>(null)
  const compareRef = useRef<HTMLDivElement>(null)
  const finderRef = useRef<HTMLDivElement>(null)
  const filamentsRef = useRef<HTMLDivElement>(null)

  const showToast = (msg: string) => {
    setFeedbackToast(msg)
    setTimeout(() => setFeedbackToast(null), 3000)
  }

  // Active finder recommendation
  const currentNeed = finderNeeds.find(n => n.id === selectedFinderNeedId) || finderNeeds[0]
  const recommendedMaterial = materialFamilies.find(m => m.slug === currentNeed.recommendedMaterialSlug) || materialFamilies[0]

  // Filtered material families
  const filteredFamilies = familyTab === 'all'
    ? materialFamilies
    : materialFamilies.filter(m => m.category === familyTab)

  // Filtered filament products
  const filteredFilaments = filamentProducts.filter(p => {
    if (catalogFilter === 'all') return true
    if (catalogFilter === 'regular') return !p.isSpecial
    if (catalogFilter === 'special') return p.isSpecial
    return p.materialSlug === catalogFilter
  })

  // Toggle material in compare list
  const toggleCompare = (slug: string) => {
    if (compareSlugs.includes(slug)) {
      if (compareSlugs.length > 2) {
        setCompareSlugs(prev => prev.filter(s => s !== slug))
      } else {
        showToast('Select at least 2 materials for comparison')
      }
    } else {
      if (compareSlugs.length < 5) {
        setCompareSlugs(prev => [...prev, slug])
      } else {
        showToast('Maximum 5 materials can be compared simultaneously')
      }
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 space-y-16">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* ====================================================
          1. HERO SECTION: ENGINEERED MATERIALS FOR EVERY PRINT
         ==================================================== */}
      <section className="relative bg-slate-950 text-white pt-12 pb-20 overflow-hidden border-b border-slate-800">
        {/* Ambient subtle backdrops */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Materials Hub</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/15 border border-red-500/30 rounded-full text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>Technical Polymer &amp; Composite Ecosystem</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                ENGINEERED MATERIALS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">
                  FOR EVERY PRINT
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Choose the exact polymer configuration for your mechanical load, thermal envelope, and printer hardware. From everyday visual prototyping with PLA to aerospace-grade Carbon Fiber ABS.
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => explorerRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore 7 Material Families</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => compareRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Compare Materials Matrix</span>
                </button>

                <button
                  onClick={() => finderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Find Your Material</span>
                </button>
              </div>

              {/* Trust highlight chips */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 text-xs">
                <div>
                  <div className="text-base font-black text-white font-mono">7 FAMILIES</div>
                  <div className="text-[11px] text-slate-400">Standard to Carbon Fiber</div>
                </div>
                <div>
                  <div className="text-base font-black text-white font-mono">±0.02 mm</div>
                  <div className="text-[11px] text-slate-400">Strict Diameter Tolerance</div>
                </div>
                <div>
                  <div className="text-base font-black text-white font-mono">PAN-INDIA</div>
                  <div className="text-[11px] text-slate-400">Direct Factory Spool Dispatch</div>
                </div>
              </div>
            </div>

            {/* Right visual: Interactive 3D Spool Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
                {/* Spool visual graphic */}
                <div className="relative aspect-square max-w-[280px] mx-auto flex items-center justify-center">
                  {/* Rotating outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-red-500/30 animate-spin" style={{ animationDuration: '30s' }} />
                  {/* Spool hub */}
                  <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-900 border-4 border-slate-600 shadow-inner flex flex-col items-center justify-center p-4">
                    <span className="text-4xl select-none mb-1">🧶</span>
                    <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">LENIVA 3D</span>
                    <span className="text-[10px] text-slate-300 font-mono">1.75 mm • 1 KG</span>
                    <div className="mt-1 w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-red-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Precision Additive Filament Spools
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Engineered for continuous 24/7 industrial 3D printing without nozzle clogging or diameter surges.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-2">
                  {['PLA', 'ABS', 'PETG', 'TPU', 'HIPS', 'PLA-CF', 'CF-ABS'].map((name) => (
                    <span key={name} className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] font-mono text-slate-300 border border-slate-700">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. FIND THE RIGHT MATERIAL (INTERACTIVE WIZARD)
         ==================================================== */}
      <section ref={finderRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — Application Matcher —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              WHAT ARE YOU PRINTING?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select your end-use application requirement to see our material engineers’ recommended polymer family.
            </p>
          </div>

          {/* Need Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {finderNeeds.map((need) => {
              const isActive = need.id === selectedFinderNeedId
              return (
                <button
                  key={need.id}
                  onClick={() => setSelectedFinderNeedId(need.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/80'
                  }`}
                >
                  {need.label}
                </button>
              )
            })}
          </div>

          {/* Recommendation Card */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
                  Recommended Polymer Match
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono">
                  {currentNeed.label}
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {recommendedMaterial.name} ({recommendedMaterial.fullName})
                </h3>
                <span className="text-xl">{recommendedMaterial.emoji}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentNeed.reason}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Nozzle Temp</span>
                  <span className="font-mono font-bold text-white">{recommendedMaterial.printTemp}</span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Bed Temp</span>
                  <span className="font-mono font-bold text-white">{recommendedMaterial.bedTemp}</span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-slate-400 text-[10px] block">Enclosure</span>
                  <span className="font-mono font-bold text-white">
                    {recommendedMaterial.enclosureRequired ? 'Enclosure Recommended' : 'Open Bed Safe'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  setSelectedMaterial(recommendedMaterial)
                  window.scrollTo({ top: 900, behavior: 'smooth' })
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Deep Dive into {recommendedMaterial.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setCatalogFilter(recommendedMaterial.slug as any)
                  filamentsRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Shop {recommendedMaterial.name} Filaments</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. MATERIAL FAMILIES EXPLORER (7 FDM FAMILIES)
         ==================================================== */}
      <section ref={explorerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — Material Hierarchy —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              7 Core FDM Material Families
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Click &quot;Explore Material&quot; to inspect full technical datasheets, print parameters, and matching spools.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold">
            {[
              { id: 'all', label: 'All Families' },
              { id: 'standard', label: 'Standard (PLA)' },
              { id: 'engineering', label: 'Engineering (ABS/PETG)' },
              { id: 'flexible', label: 'Flexible (TPU)' },
              { id: 'support', label: 'Support (HIPS)' },
              { id: 'carbon', label: 'Carbon Fiber' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFamilyTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  familyTab === tab.id
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFamilies.map((mat) => {
            const isCarbon = mat.category === 'carbon'
            const isTPU = mat.id === 'tpu'
            const isHIPS = mat.id === 'hips'

            return (
              <div
                key={mat.id}
                className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
                  isCarbon
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-800 shadow-xl'
                    : 'bg-white border-slate-200/90 shadow-sm hover:shadow-xl text-slate-900'
                } ${isTPU ? 'ring-2 ring-violet-400/50 animate-pulse' : ''}`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Emoji, Name, Difficulty badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl p-2 rounded-2xl bg-slate-100/10 border border-slate-200/20">
                        {mat.emoji}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-black tracking-tight">{mat.name}</h3>
                          {isCarbon && (
                            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                              Carbon Composite
                            </span>
                          )}
                          {isHIPS && (
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 text-[9px] font-mono font-bold uppercase tracking-wider border border-amber-500/30">
                              Soluble Support
                            </span>
                          )}
                        </div>
                        <p className={`text-xs ${isCarbon ? 'text-slate-400' : 'text-slate-500'}`}>
                          {mat.fullName}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        mat.difficulty === 'Beginner'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : mat.difficulty === 'Intermediate'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {mat.difficulty}
                    </span>
                  </div>

                  {/* Positioning Tagline */}
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {mat.tagline}
                  </div>

                  {/* Short Description */}
                  <p className={`text-xs leading-relaxed line-clamp-3 ${isCarbon ? 'text-slate-300' : 'text-slate-600'}`}>
                    {mat.shortDescription}
                  </p>

                  {/* HIPS Soluble Support Diagram Callout */}
                  {isHIPS && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 text-[11px] space-y-1.5">
                      <div className="font-bold text-amber-700 flex items-center space-x-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Dual-Extrusion Soluble Workflow</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-amber-800 font-mono">
                        <span>HIPS Support</span>
                        <span>➔</span>
                        <span>Limonene Bath</span>
                        <span>➔</span>
                        <span>Clean ABS Part</span>
                      </div>
                    </div>
                  )}

                  {/* Property Bars Preview */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isCarbon ? 'text-slate-400' : 'text-slate-500'}>Printability</span>
                      <RatingDots value={mat.properties.printability} colorClass={isCarbon ? 'text-amber-400' : 'text-emerald-600'} />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isCarbon ? 'text-slate-400' : 'text-slate-500'}>Strength</span>
                      <RatingDots value={mat.properties.strength} colorClass={isCarbon ? 'text-red-500' : 'text-red-600'} />
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={isCarbon ? 'text-slate-400' : 'text-slate-500'}>Flexibility</span>
                      <RatingDots value={mat.properties.flexibility} colorClass={isCarbon ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                  </div>

                  {/* Best For Tags */}
                  <div className="pt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isCarbon ? 'text-slate-400' : 'text-slate-400'}`}>
                      Ideal Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.bestFor.map((app) => (
                        <span
                          key={app}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                            isCarbon
                              ? 'bg-white/10 text-slate-300 border border-white/10'
                              : 'bg-slate-100 text-slate-700 border border-slate-200/70'
                          }`}
                        >
                          ✓ {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 mt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMaterial(mat)}
                    className={`text-xs font-bold inline-flex items-center space-x-1.5 group/btn transition-colors cursor-pointer ${
                      isCarbon ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                    }`}
                  >
                    <span>Explore {mat.name} Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      setCatalogFilter(mat.slug as any)
                      filamentsRef.current?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                      isCarbon
                        ? 'border-slate-700 hover:bg-white/10 text-slate-300'
                        : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    View Spools
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          4. MATERIAL DETAIL PANEL (SHOWN ON EXPLORE CLICK)
         ==================================================== */}
      {selectedMaterial && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-red-500 shadow-2xl relative space-y-8 animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Close Detail"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                  Deep Technical Datasheet
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 uppercase">{selectedMaterial.categoryLabel}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-4xl p-3 bg-slate-100 rounded-2xl">{selectedMaterial.emoji}</span>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    {selectedMaterial.name} — {selectedMaterial.fullName}
                  </h2>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">{selectedMaterial.positioning}</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {selectedMaterial.shortDescription}
              </p>
            </div>

            {/* Property Matrix Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Printability', value: selectedMaterial.properties.printability, text: selectedMaterial.propertyHighlights.printabilityText },
                { label: 'Strength', value: selectedMaterial.properties.strength, text: selectedMaterial.propertyHighlights.strengthText },
                { label: 'Flexibility', value: selectedMaterial.properties.flexibility, text: selectedMaterial.propertyHighlights.flexibilityText },
                { label: 'Heat Deflection', value: selectedMaterial.properties.heatResistance, text: selectedMaterial.propertyHighlights.heatText },
                { label: 'Surface Quality', value: selectedMaterial.properties.surfaceQuality, text: 'Clean Layer Stacking' },
                { label: 'Impact Durability', value: selectedMaterial.properties.impactResistance, text: selectedMaterial.propertyHighlights.impactText },
              ].map((prop, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">{prop.label}</div>
                  <RatingDots value={prop.value} />
                  <div className="text-[10px] text-slate-600 font-medium leading-tight">{prop.text}</div>
                </div>
              ))}
            </div>

            {/* Print Parameters Bar */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Extruder Temp</span>
                <span className="text-sm font-mono font-bold text-white">{selectedMaterial.printTemp}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Heated Bed</span>
                <span className="text-sm font-mono font-bold text-white">{selectedMaterial.bedTemp}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Enclosure</span>
                <span className="text-sm font-bold text-emerald-400">
                  {selectedMaterial.enclosureRequired ? 'Required (Draft Free)' : 'Not Required (Open Frame)'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Polymer Density</span>
                <span className="text-sm font-mono font-bold text-white">{selectedMaterial.density}</span>
              </div>
            </div>

            {/* Two column: Key Benefits & Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-950 uppercase tracking-wider flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Key Material Benefits</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedMaterial.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-950 uppercase tracking-wider flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Industrial Applications</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedMaterial.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Genuine Matching Filament Spools */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-950">
                    Available {selectedMaterial.name} Spool Products
                  </h3>
                  <p className="text-xs text-slate-500">
                    Strictly matching {selectedMaterial.name} formulations certified for Leniva 3D printers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCatalogFilter(selectedMaterial.slug as any)
                    filamentsRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Filter Entire Catalog by {selectedMaterial.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Filament Spools Grid for this material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filamentProducts
                  .filter(p => p.materialSlug === selectedMaterial.slug)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-700 border border-slate-200">
                            {product.brand} • {product.variant}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600">
                            {product.stockStatus === 'in_stock' ? '✓ In Stock' : '⚡ Low Stock'}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className="w-4 h-4 rounded-full border border-slate-300 shadow-xs shrink-0"
                            style={{ backgroundColor: product.colourHex }}
                            title={product.colour}
                          />
                          <span className="text-xs font-bold text-slate-900">{product.colour}</span>
                        </div>

                        <p className="text-[11px] text-slate-500 font-mono">
                          {product.diameter} • {product.weight}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Quote on Request</span>
                        <button
                          onClick={() => openQuoteModal(`${product.productName} - ${product.colour}`)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================
          5. SIDE-BY-SIDE MATERIAL COMPARISON MATRIX
         ==================================================== */}
      <section ref={compareRef} id="compare" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                — Engineering Matrix —
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Material Property Comparison
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Toggle materials below to compare printability, mechanical tensile strength, flexibility, and heat limits.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500">
              Comparing {compareSlugs.length} of 7 materials
            </div>
          </div>

          {/* Toggle pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {materialFamilies.map((m) => {
              const isChecked = compareSlugs.includes(m.slug)
              return (
                <button
                  key={m.slug}
                  onClick={() => toggleCompare(m.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer border ${
                    isChecked
                      ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  }`}
                >
                  <span>{isChecked ? '✓' : '+'}</span>
                  <span>{m.name}</span>
                </button>
              )
            })}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-bold min-w-[160px]">Property Metric</th>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <th key={slug} className="p-4 font-bold min-w-[140px] text-center border-l border-slate-800">
                        <div className="text-sm">{mat.emoji} {mat.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal lowercase">{mat.fullName}</div>
                      </th>
                    )
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 font-medium">
                {/* Printability */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Printability</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200">
                        <div className="flex justify-center mb-1">
                          <RatingDots value={mat.properties.printability} colorClass="text-emerald-600" />
                        </div>
                        <span className="text-[10px] text-slate-500">{mat.propertyHighlights.printabilityText}</span>
                      </td>
                    )
                  })}
                </tr>

                {/* Tensile Strength */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Tensile Strength</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200">
                        <div className="flex justify-center mb-1">
                          <RatingDots value={mat.properties.strength} colorClass="text-red-600" />
                        </div>
                        <span className="text-[10px] text-slate-500">{mat.tensileStrength}</span>
                      </td>
                    )
                  })}
                </tr>

                {/* Flexibility */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Flexibility</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200">
                        <div className="flex justify-center mb-1">
                          <RatingDots value={mat.properties.flexibility} colorClass="text-blue-600" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {mat.properties.flexibility === 5 ? 'Very High (Elastomer)' : mat.properties.flexibility >= 3 ? 'Moderate Flex' : 'Low / Rigid'}
                        </span>
                      </td>
                    )
                  })}
                </tr>

                {/* Heat Resistance */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Heat Resistance</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200">
                        <div className="flex justify-center mb-1">
                          <RatingDots value={mat.properties.heatResistance} colorClass="text-orange-500" />
                        </div>
                        <span className="text-[10px] text-slate-500">{mat.propertyHighlights.heatText}</span>
                      </td>
                    )
                  })}
                </tr>

                {/* Impact Resistance */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Impact Resistance</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200">
                        <div className="flex justify-center mb-1">
                          <RatingDots value={mat.properties.impactResistance} colorClass="text-violet-600" />
                        </div>
                        <span className="text-[10px] text-slate-500">{mat.propertyHighlights.impactText}</span>
                      </td>
                    )
                  })}
                </tr>

                {/* Extruder & Bed Temp */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Printing Temps</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200 font-mono text-[11px]">
                        <div>Nozzle: {mat.printTemp}</div>
                        <div className="text-slate-500 text-[10px]">Bed: {mat.bedTemp}</div>
                      </td>
                    )
                  })}
                </tr>

                {/* Heated Enclosure Required */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Heated Chamber Req.</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200 font-bold">
                        {mat.enclosureRequired ? (
                          <span className="text-orange-600">Yes (Enclosed)</span>
                        ) : (
                          <span className="text-emerald-600">No (Open Air Safe)</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* Typical Applications */}
                <tr className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-slate-900">Typical End-Use</td>
                  {compareSlugs.map((slug) => {
                    const mat = materialFamilies.find(m => m.slug === slug)!
                    return (
                      <td key={slug} className="p-4 text-center border-l border-slate-200 text-[11px] text-slate-600">
                        {mat.bestFor.slice(0, 3).join(', ')}
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. DEDICATED FILAMENT PRODUCTS CATALOG
         ==================================================== */}
      <section ref={filamentsRef} id="filaments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — Direct Purchasing —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Filament Products Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Factory fresh 1.75 mm and 2.85 mm spools. Moisture-vacuum sealed with desiccant.
            </p>
          </div>

          {/* Catalog Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'regular', label: 'Regular Filaments' },
              { id: 'special', label: 'Special Carbon Fiber' },
              { id: 'pla', label: 'PLA+' },
              { id: 'abs', label: 'ABS' },
              { id: 'petg', label: 'PETG' },
              { id: 'tpu', label: 'TPU' },
              { id: 'hips', label: 'HIPS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCatalogFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  catalogFilter === tab.id
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid matching User Specification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFilaments.map((product) => {
            const inWish = isInWishlist(product.id)

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Product Tag / Badge */}
                {product.isNew && (
                  <span className="absolute top-4 left-4 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    New Release
                  </span>
                )}
                {product.isSpecial && !product.isNew && (
                  <span className="absolute top-4 left-4 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Special Carbon
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() =>
                    toggleWishlist({
                      id: product.id,
                      type: 'shop',
                      name: `${product.productName} (${product.colour})`,
                      slug: product.materialSlug,
                      image: '/images/materials/filament-spool-generic.png',
                      category: 'Filaments',
                      price: product.price,
                    })
                  }
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10 cursor-pointer"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWish ? 'fill-red-600 text-red-600' : ''}`} />
                </button>

                <div className="space-y-4 pt-6">
                  {/* Spool Visual / Color Preview */}
                  <div className="aspect-square rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200/70 p-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform">
                    {/* Filament Spool Mock Graphic */}
                    <div
                      className="w-28 h-28 rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center relative transition-transform duration-700 group-hover:rotate-45"
                      style={{ backgroundColor: product.colourHex }}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-slate-700 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    {/* Stock badge */}
                    <span className="mt-3 text-[10px] font-bold uppercase tracking-wider font-mono text-slate-600">
                      {product.stockStatus === 'in_stock' ? (
                        <span className="text-emerald-600">● In Stock</span>
                      ) : (
                        <span className="text-amber-600">● Limited Stock</span>
                      )}
                    </span>
                  </div>

                  {/* Brand & Material Hierarchy */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600">
                      {product.brand} • {product.variant}
                    </div>

                    <h3 className="text-base font-black text-slate-950 leading-snug">
                      {product.productName}
                    </h3>

                    {/* Colour Pill */}
                    <div className="flex items-center space-x-1.5 pt-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 shadow-xs"
                        style={{ backgroundColor: product.colourHex }}
                      />
                      <span className="text-xs font-semibold text-slate-700">{product.colour}</span>
                    </div>

                    {/* Specs: Diameter & Weight */}
                    <div className="text-xs font-mono text-slate-500 pt-0.5">
                      {product.diameter} • {product.weight}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 pt-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Quote on Request</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                      Volume Discount
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openQuoteModal(`Quote Request: ${product.productName} (${product.colour})`)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Request Quote</span>
                    </button>

                    <button
                      onClick={() => openQuoteModal(`Bulk Order: ${product.productName} (${product.colour})`)}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                    >
                      Bulk Quote
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ====================================================
          7. BOTTOM CTA & BULK SPOOL QUOTATION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider rounded-md border border-red-500/30">
              Bulk Production Procurement
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Ordering More Than 10 Spools? Get Direct Wholesale Quotes.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We supply educational universities, automotive prototyping labs, and manufacturing facilities across India with regular monthly recurring filament batch deliveries and custom polymer compound testing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={() => openQuoteModal('Enterprise Bulk Filament Procurement')}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Request Tiered Spool Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919844116476"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talk to Material Engineer</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MaterialsPage
