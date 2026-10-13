import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Service } from '../types'
import { useApp } from '../context/AppContext'

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {service.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded-md">
            {service.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-950">
            {service.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Key Advantages Checklist */}
          {service.advantages && service.advantages.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
              {service.advantages.slice(0, 2).map((adv, idx) => (
                <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{adv}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={() => openQuoteModal(service.title)}
            className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  )
}
export default ServiceCard
