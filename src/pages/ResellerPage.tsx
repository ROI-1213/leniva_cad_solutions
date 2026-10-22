import React, { useState } from 'react'
import { CheckCircle2, ShieldCheck, TrendingUp, Users } from 'lucide-react'

export const ResellerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Partner Ecosystem</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Become a Leniva Authorized Channel Partner
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Expand your regional portfolio with industry-leading FDM and resin 3D printers, metrology 3D scanners, and CAD software suites. Benefit from aggressive channel margins, marketing co-op funds, and dedicated engineering pre-sales support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <TrendingUp className="w-8 h-8 text-red-600" />
            <h3 className="text-base font-bold text-slate-950">Attractive Channel Margins</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tiered discounting structures on hardware, recurring software subscription renewals, and high-margin consumables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-950">Pre-Sales Technical Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our application engineers assist in conducting customer live benchmark printing tests and metrology proof-of-concepts on your behalf.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Users className="w-8 h-8 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-950">Certified Partner Enablement</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive sales and technical onboarding for your field staff, complete with demo machine subsidies and literature kits.
            </p>
          </div>
        </div>

        {/* Partnership Enquiry Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-950">Channel Partner Application</h2>
            <p className="text-xs text-slate-500">
              Submit your company credentials to initiate partner onboarding review.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Application Received</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for your interest in partnering with Leniva CAD Solutions. Our channel director will review your company profile and reach out within 2 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Legal Name *</label>
                  <input type="text" required placeholder="Company Name Pvt Ltd" className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Contact Person *</label>
                  <input type="text" required placeholder="Full Name & Designation" className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input type="email" required placeholder="partner@company.com" className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City & State *</label>
                  <input type="text" required placeholder="e.g. Ahmedabad, Gujarat" className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Existing Product Portfolio</label>
                  <input type="text" placeholder="e.g. CNC tooling, industrial software, etc." className="w-full p-2.5 border rounded-xl outline-none" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Territory of Interest</label>
                <select className="w-full p-2.5 border rounded-xl outline-none bg-white">
                  <option>Western India (Maharashtra, Gujarat, Goa)</option>
                  <option>Northern India (Delhi NCR, Haryana, Punjab, UP)</option>
                  <option>Southern India (Karnataka, Tamil Nadu, Telangana)</option>
                  <option>Eastern & Central India</option>
                  <option>PAN-India Institutional</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs shadow transition-colors"
              >
                Submit Partner Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default ResellerPage
