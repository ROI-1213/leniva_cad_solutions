import React from 'react'
import { Phone } from 'lucide-react'
import { services } from '../data/services'
import { ServiceCard } from '../components/ServiceCard'
import { useApp } from '../context/AppContext'

export const ServicesPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Engineering & Contract Additive Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Professional 3D Printing & Digital Manufacturing Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            From initial metrology 3D scanning and parametric reverse engineering to high-precision contract 3D printing and CAD onboarding, Leniva CAD Solutions supports your complete product lifecycle.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openQuoteModal('Services Overview Quote')}
              className="px-6 py-2.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Upload CAD for Quotation
            </button>
            <button
              onClick={() => openQuoteModal('Services Technical Call')}
              className="px-6 py-2.5 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Speak with an Application Engineer</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default ServicesPage
