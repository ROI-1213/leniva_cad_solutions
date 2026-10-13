import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

interface LegalContent {
  title: string
  subtitle: string
  sections: { heading: string; body: string }[]
}

export const LegalPage: React.FC = () => {
  const { pathname } = useLocation()

  const getContent = (): LegalContent => {
    if (pathname.includes('privacy-policy')) {
      return {
        title: 'Privacy Policy',
        subtitle: 'How Leniva CAD Solutions protects and manages your corporate and technical data.',
        sections: [
          {
            heading: '1. Technical Data & CAD File Protection',
            body: 'We understand the proprietary nature of CAD engineering designs, 3D scan point clouds, and physical prototypes. All files uploaded through our website or quotation modals are transmitted via encrypted protocols and stored on access-restricted servers. Files are shared strictly with assigned application engineers under mutual Non-Disclosure Agreements (NDAs).',
          },
          {
            heading: '2. Information We Collect',
            body: 'We collect business contact information (name, corporate email, telephone, company designation) and project details provided willingly when requesting quotation benchmarks, software licenses, or support tickets.',
          },
          {
            heading: '3. Data Usage & Third-Party Disclosure',
            body: 'Leniva CAD Solutions does not sell, rent, or trade your corporate information to third parties. Data is used exclusively to provide technical support, process transactions, calibrate hardware, and deliver software activation licenses.',
          },
        ],
      }
    }

    if (pathname.includes('return-policy')) {
      return {
        title: 'Return & Refund Policy',
        subtitle: 'Guidelines governing consumables, spare parts, and bespoke engineering services.',
        sections: [
          {
            heading: '1. Consumables (Filaments & Resins)',
            body: 'Unopened filament spools in original vacuum packaging and sealed resin bottles may be returned within 7 calendar days of delivery for replacement or credit note if there is a verified defect in extrusion diameter or photopolymerization reactivity.',
          },
          {
            heading: '2. Custom 3D Printing & Reverse Engineering Services',
            body: 'Contract additive manufacturing parts and reverse engineering CAD deliverables are manufactured to customer-specified tolerances. If a part deviates from the approved drawing beyond ISO 2768-m standards, Leniva will reprint or rectify the part at zero additional charge.',
          },
          {
            heading: '3. Hardware Machinery & Software Licenses',
            body: 'Industrial 3D printers and scanners undergo pre-dispatch validation and on-site commissioning. Hardware returns are handled in accordance with our warranty service protocol. Software licenses (Trimble SketchUp, Chaos V-Ray, Enscape) are digital intellectual property and cannot be refunded once activated.',
          },
        ],
      }
    }

    if (pathname.includes('warranty')) {
      return {
        title: 'Warranty & Technical Support Policy',
        subtitle: 'Our commitment to machine reliability, calibration, and after-sales service.',
        sections: [
          {
            heading: '1. Standard 12-Month Hardware Warranty',
            body: 'All industrial 3D printers (Pratham, EKA) and 3DeVOK / EinScan scanners supplied by Leniva CAD Solutions include a standard 12-month manufacturer hardware warranty covering controller motherboards, stepper drivers, power supplies, galvanometer mirrors, and optical laser units.',
          },
          {
            heading: '2. Consumable Wear Components',
            body: 'Wear items subject to friction and thermal degradation (brass nozzles, PTFE tubing, FEP release films, and build plate PEI stickers) are warranted against manufacturing defects upon arrival, but are considered regular consumable replacements over ongoing operation.',
          },
          {
            heading: '3. On-Site Service & Preventive Maintenance',
            body: 'Our nationwide field engineering network provides on-site warranty repair and preventive maintenance calibration visits. Customers also have access to our technical hotline, WhatsApp engineering support, and remote screen-sharing diagnostics.',
          },
        ],
      }
    }

    // Default: Terms & Conditions
    return {
      title: 'Terms of Service & Commercial Conditions',
      subtitle: 'Official commercial conditions governing sales, licensing, and engineering services.',
      sections: [
        {
          heading: '1. Quotations & Validity',
          body: 'All engineering quotations issued by Leniva CAD Solutions remain valid for 30 calendar days from the date of issue unless specified otherwise. Quotations are subject to applicable GST rates in India.',
        },
        {
          heading: '2. Intellectual Property Rights',
          body: 'Customers retain full, unencumbered ownership of all 3D CAD data, intellectual property, and design patents embodied in parts submitted to our contract manufacturing or reverse engineering facility.',
        },
        {
          heading: '3. Machine Operation & Safety',
          body: 'Customers agree to operate industrial additive equipment in accordance with the provided user manual, voltage stabilization requirements, and safety protocols for high-temperature and UV optical systems.',
        },
      ],
    }
  }

  const content = getContent()

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{content.title}</span>
        </nav>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Legal & Commercial</span>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">{content.title}</h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content.subtitle}</p>
          </div>

          <div className="space-y-6">
            {content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-slate-950">{sec.heading}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              Questions regarding legal terms? Contact: <a href={`mailto:${siteConfig.email}`} className="text-red-600 font-semibold">{siteConfig.email}</a>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:underline">Terms</Link>
              <span>•</span>
              <Link to="/warranty" className="hover:underline">Warranty</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LegalPage
