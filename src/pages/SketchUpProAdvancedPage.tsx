import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight,
  Scan,
  Box,
  FileText,
  Cloud,
  Download,
  RefreshCw,
  Users,
  Send,
  ScanLine,
  Zap,
  Monitor,
  AlertTriangle,
  Star,
  ExternalLink,
} from 'lucide-react'
import { sketchupProAdvancedData } from '../data/sketchupProAdvancedData'
import { useCadPageData } from '../utils/cadSoftwareConfig'
import { useApp } from '../context/AppContext'

// ─── Icon Map ────────────────────────────────────────────────────────────────
const IconMap: Record<string, React.FC<{ className?: string }>> = {
  ArrowLeftRight,
  Scan,
  Box,
  FileText,
  Cloud,
  Download,
  RefreshCw,
  Users,
  Send,
  ScanLine,
  Zap,
  Monitor,
}

const getIcon = (name: string, cls = 'w-5 h-5') => {
  const Comp = IconMap[name]
  return Comp ? <Comp className={cls} /> : <Box className={cls} />
}

// ─── Sub-nav ─────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'overview',       label: 'Overview' },
  { id: 'workflow',       label: 'Workflow' },
  { id: 'whats-included', label: "What's Included" },
  { id: 'compare',        label: 'Compare' },
  { id: 'industries',     label: 'Industries' },
  { id: 'system-req',     label: 'System Requirements' },
  { id: 'pricing',        label: 'Licensing' },
  { id: 'faq',            label: 'FAQ' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function SketchUpProAdvancedPage() {
  const { openQuoteModal } = useApp()
  const { data: d } = useCadPageData('sketchup_advanced', sketchupProAdvancedData)

  const [activeSection, setActiveSection] = useState('overview')
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [compCategory, setCompCategory] = useState<string>('all')

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) { observer.observe(el); sectionRefs.current[s.id] = el }
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const faqCategories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'revit', label: 'Revit' },
    { id: 'pointcloud', label: 'Point Cloud' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'technical', label: 'Technical' },
    { id: 'licensing', label: 'Licensing' },
  ]

  const filteredFaqs = activeFaqCategory === 'all'
    ? d.faqs
    : d.faqs.filter(f => f.category === activeFaqCategory)

  const compCategories = ['all', 'Core Modeling', 'Documentation', 'Cloud & Collaboration', 'Advanced Interoperability', 'Ecosystem']
  const filteredComp = compCategory === 'all'
    ? d.comparison.rows
    : d.comparison.rows.filter(r => r.category === compCategory)

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white font-inter">

      {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
            <span>/</span>
            <Link to="/products/cad-software" className="hover:text-slate-900 transition-colors">CAD Software</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">SketchUp Pro Advanced Workflows</span>
          </nav>
        </div>
      </div>

      {/* ── SUB-NAV (non-sticky) ─────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0">
            {NAV_SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`whitespace-nowrap shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === s.id
                    ? 'border-[#003865] text-[#003865]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="overview" className="relative overflow-hidden bg-gradient-to-br from-[#001f3f] via-[#003865] to-[#004A8F]">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="space-y-6">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 tracking-widest uppercase">
                  {d.hero.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-900 text-xs font-bold tracking-wider uppercase">
                  <Monitor className="w-3 h-3" />
                  {d.hero.platformBadge}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {d.hero.title || 'SketchUp Pro Advanced Workflows'}
                </h1>
                <p className="text-xl lg:text-2xl font-medium text-white/80">
                  {d.hero.tagline}
                </p>
              </div>

              <p className="text-base text-white/65 leading-relaxed max-w-lg">
                {d.hero.description}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('pricing')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#003865] font-semibold text-sm hover:bg-cyan-50 transition-all shadow-lg"
                >
                  Subscribe <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openQuoteModal('SketchUp Pro Advanced Workflows Trial')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  Request Evaluation Trial <Send className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollTo('compare')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-white/70 text-sm font-medium hover:text-white transition-colors"
                >
                  Compare Plans →
                </button>
              </div>

              {/* Partner */}
              <p className="text-xs text-white/40 pt-1">{d.hero.partnerBadge}</p>
            </div>

            {/* Right — visual workflow */}
            <div className="relative">
              {/* Main workspace card */}
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/20 backdrop-blur-sm p-6 shadow-2xl">
                <img
                  src={(d.hero as any).image || '/images/software/sketchup-advanced.jpg'}
                  alt="SketchUp Pro Advanced Workflows — Revit and Point Cloud"
                  className="w-full aspect-video object-cover rounded-xl"
                  loading="eager"
                />
                {/* Data flow overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-1 flex-wrap">
                  {['REVIT', '↓', 'SKETCHUP', '↓', 'POINT CLOUD', '↓', 'DOCUMENTATION'].map((item, i) => (
                    <span
                      key={i}
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        item === '↓'
                          ? 'text-white/50'
                          : 'bg-[#003865]/80 text-white backdrop-blur-sm border border-white/20'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 rounded-xl px-4 py-3 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wide">Windows Only</p>
                <p className="text-[10px] text-amber-800 mt-0.5">Revit + Point Cloud</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Includes</p>
                <p className="text-sm font-bold text-[#003865] mt-0.5">Scan Essentials</p>
                <p className="text-[10px] text-slate-500">+ Revit Importer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform warning bar ──────────────────────────────────────────── */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Windows only.</strong> Pro Advanced Workflows is not available on macOS.{' '}
            <span className="text-amber-700">Scanning hardware is not included.</span>{' '}
            Trimble Siteworks and Earthworks are separate products.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          VALUE STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-slate-700">
            {d.valueStrip.map(item => (
              <div
                key={item.id}
                className="bg-slate-900 px-6 py-6 flex flex-col gap-3 hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#003865] flex items-center justify-center text-cyan-300">
                  {getIcon(item.icon)}
                </div>
                <p className="text-[10px] font-bold text-cyan-300 tracking-widest uppercase">{item.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE PERKS — 4 Feature Cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">The Perks</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">{d.perks.heading}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{d.perks.subheading}</p>
          </div>

          <div className="space-y-16">
            {d.perks.cards.map((card, idx) => (
              <div
                key={card.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Text side */}
                <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-slate-100">{card.number}</span>
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: card.accent }}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">{card.title}</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">{card.subtitle}</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{card.description}</p>
                  <ul className="space-y-2">
                    {card.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#003865] mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image side */}
                <div className={`relative ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent}20, ${card.accent}08)`,
                    }}
                  />
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="relative w-full aspect-video object-cover rounded-2xl shadow-lg border border-slate-100"
                    loading="lazy"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-white text-xs font-bold"
                    style={{ backgroundColor: card.accent }}
                  >
                    {card.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WORKFLOW — 8 Steps
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="workflow" className="py-20 bg-[#001f3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Workflow</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">{d.workflow.heading}</h2>
            <p className="mt-4 text-white/60 leading-relaxed">{d.workflow.subheading}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {d.workflow.steps.map((step, idx) => (
              <div
                key={step.id}
                className="relative p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-white/30 tracking-widest">{step.step}</span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {getIcon(step.icon, 'w-4 h-4')}
                  </div>
                </div>
                <p className="text-xs font-bold text-cyan-300 tracking-widest mb-2">{step.title}</p>
                <p className="text-xs text-white/55 leading-relaxed">{step.description}</p>

                {/* Arrow connector */}
                {idx < d.workflow.steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 border-r-2 border-t-2 border-white/20 rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="whats-included" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">What's Included</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">{d.whatsIncluded.heading}</h2>
            <p className="mt-4 text-slate-600">{d.whatsIncluded.subheading}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {d.whatsIncluded.categories.map(cat => (
              <div
                key={cat.id}
                className={`rounded-2xl p-6 border ${
                  cat.highlight
                    ? 'bg-[#003865] border-[#003865] text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      cat.highlight ? 'bg-white/20' : 'bg-[#003865]/10'
                    }`}
                  >
                    {getIcon(cat.icon, `w-5 h-5 ${cat.highlight ? 'text-cyan-300' : 'text-[#003865]'}`)}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold tracking-widest uppercase ${
                        cat.highlight ? 'text-cyan-300' : 'text-[#003865]'
                      }`}
                    >
                      {cat.highlight ? '★ EXCLUSIVE' : ''}
                    </p>
                    <h3 className={`text-sm font-bold ${cat.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          cat.highlight ? 'text-cyan-300' : 'text-[#003865]'
                        }`}
                      />
                      <span className={cat.highlight ? 'text-white/85' : 'text-slate-700'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="compare" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">Compare</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">{d.comparison.heading}</h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {compCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCompCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  compCategory === cat
                    ? 'bg-[#003865] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Features' : cat}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700 w-2/5">Feature</th>
                  <th className="px-4 py-4 font-semibold text-slate-700 text-center">SketchUp Pro</th>
                  <th className="px-4 py-4 text-center bg-[#003865]">
                    <span className="text-xs font-bold text-white">Pro Advanced</span>
                    <span className="block text-[10px] text-cyan-300 font-medium">This Plan</span>
                  </th>
                  <th className="px-4 py-4 font-semibold text-slate-700 text-center">Studio</th>
                </tr>
              </thead>
              <tbody>
                {filteredComp.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-3.5 text-slate-700">
                      <p className="font-medium">{row.feature}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{row.category}</p>
                    </td>
                    {(['pro', 'proAdvanced', 'studio'] as const).map(plan => {
                      const val = row[plan]
                      const isThis = plan === 'proAdvanced'
                      return (
                        <td
                          key={plan}
                          className={`px-4 py-3.5 text-center ${isThis ? 'bg-[#003865]/5' : ''}`}
                        >
                          {typeof val === 'boolean' ? (
                            val ? (
                              <CheckCircle2 className={`w-5 h-5 mx-auto ${isThis ? 'text-[#003865]' : 'text-emerald-500'}`} />
                            ) : (
                              <XCircle className="w-5 h-5 mx-auto text-slate-300" />
                            )
                          ) : (
                            <span className={`text-xs font-medium ${isThis ? 'text-[#003865]' : 'text-slate-600'}`}>
                              {val}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INDUSTRIES
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="industries" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Industries</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Built for professionals across industries</h2>
            <p className="mt-4 text-white/60">Pro Advanced Workflows serves professionals wherever interoperability and scan data matter.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {d.industries.map(ind => (
              <div
                key={ind.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-1">{ind.name}</h3>
                <p className="text-xs font-medium text-cyan-400 mb-3">{ind.tagline}</p>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{ind.description}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Workflows</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.workflows.map((w, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[#003865]/60 text-cyan-200 border border-white/10">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Deliverables</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.deliverables.map((del, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-white/70">
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#003865]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl lg:text-2xl font-medium text-white/90 leading-relaxed mb-8 italic">
            "{d.testimonial.quote}"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
              {d.testimonial.avatarInitials}
            </div>
            <div className="text-left">
              <p className="font-bold text-white">{d.testimonial.author}</p>
              <p className="text-sm text-white/60">{d.testimonial.title}, {d.testimonial.company}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SYSTEM REQUIREMENTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="system-req" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">Technical</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">{d.systemRequirements.heading}</h2>
          </div>

          {/* Warning banners */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <Monitor className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium">{d.systemRequirements.platformWarning}</p>
            </div>
            <div className="flex-1 flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">{d.systemRequirements.hardwareDisclaimer}</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Component</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-left">Minimum</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-left">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {d.systemRequirements.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-slate-50'}>
                    <td className="px-6 py-4 font-semibold text-slate-800 border-r border-slate-100">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.minimum}</td>
                    <td className="px-6 py-4">
                      <span className="text-slate-800 font-medium">{row.recommended}</span>
                      {row.note && (
                        <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          {row.note}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">Licensing &amp; Plans</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">
              Commercial Subscription
            </h2>
            <p className="mt-4 text-slate-600">
              Official Trimble subscription licensing for architecture, engineering, and construction teams. Contact us for commercial quotes, volume licenses, and academic options.
            </p>
          </div>

          {/* Price card */}
          <div className="max-w-lg mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold mb-4">
                  <Monitor className="w-3 h-3" />
                  WINDOWS ONLY
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Pro Advanced Workflows</h3>
                <p className="text-slate-600 text-sm mt-1">Revit Importer + Scan Essentials included</p>
                <div className="mt-6 space-y-1">
                  <div className="text-2xl font-bold text-slate-900">Commercial Subscription</div>
                  <p className="text-[#003865] font-semibold text-sm">Official Trimble Partner Quotation on Request</p>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-6 space-y-3">
                {[
                  'Everything in SketchUp Pro',
                  'Scan Essentials (E57 / LAS / LAZ point cloud)',
                  'Revit Importer (.rvt / .rfa)',
                  'LayOut — 2D documentation',
                  'SketchUp for Web + iPad',
                  'Trimble Connect (1 GB)',
                  '1,000+ extensions',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#003865] shrink-0" />
                    {item}
                  </div>
                ))}

                <div className="pt-4 space-y-3">
                  <Link
                    to="/contact"
                    className="block w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors text-center"
                  >
                    Enquire Now
                  </Link>
                  <button
                    onClick={() => openQuoteModal('SketchUp Pro Advanced Workflows Free Trial')}
                    className="block w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors text-center cursor-pointer"
                  >
                    Try Free First
                  </button>
                </div>

                <p className="text-xs text-slate-400 text-center pt-2">
                  Official commercial licensing in Indian Rupees (INR) with full GST invoicing and local technical support.
                </p>
              </div>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-16">
            <h3 className="text-center text-lg font-bold text-slate-900 mb-6">Compare with other SketchUp subscriptions</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {d.relatedProducts.map(rp => (
                <Link
                  key={rp.id}
                  to={rp.link}
                  className="rounded-xl border border-slate-200 p-5 hover:border-[#003865] hover:shadow-sm transition-all group"
                >
                  <p className="font-bold text-slate-900 group-hover:text-[#003865] transition-colors">{rp.name}</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{rp.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rp.description}</p>
                  <span className="inline-block mt-3 text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                    {rp.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-[#003865] uppercase">FAQ</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">
              Frequently asked questions
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveFaqCategory(cat.id); setOpenFaq(null) }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFaqCategory === cat.id
                    ? 'bg-[#003865] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[#003865]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-[#003865] shrink-0 mt-0.5" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-[#001f3f] via-[#003865] to-[#004A8F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white/90 tracking-widest uppercase mb-6">
            <Monitor className="w-3 h-3" /> Windows Only
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to unlock interoperable workflows?
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Get Revit Importer and Scan Essentials in one professional SketchUp subscription. Connect your teams, capture existing conditions, and deliver better documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('pricing')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#003865] font-bold text-sm hover:bg-cyan-50 transition-all shadow-lg"
            >
              Subscribe to Pro Advanced <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all"
            >
              Contact Leniva CAD Solutions
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-6">
            Available in supported regions. Contact Leniva CAD Solutions for consultation and licensing.
          </p>
        </div>
      </section>

    </div>
  )
}
