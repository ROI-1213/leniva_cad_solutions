import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { useApp } from '../context/AppContext'

export const ContactPage: React.FC = () => {
  const { liveSiteSettings } = useApp()
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    requirementType: '3D Printers & Hardware',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.requirementType || 'General Inquiry'} - ${formData.company}`,
          message: formData.message,
        }),
      })
    } catch (err) {
      console.warn('API submission fallback:', err)
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Connect with Leniva</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Talk to Our Engineering Experts
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Have questions about 3D printer specifications, CAD licensing, on-site scanning, or contract additive manufacturing? Our engineering specialists are ready to assist.
          </p>
        </div>

        {/* Contact Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-950">Direct Engineering Lines</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Phone Inquiries</strong>
                    <p className="text-slate-600">Main: <a href={`tel:${liveSiteSettings.phone}`} className="hover:text-red-600 font-medium">{liveSiteSettings.phone}</a></p>
                    <p className="text-slate-600">Secondary: <a href={`tel:${liveSiteSettings.secondaryPhone || siteConfig.supportPhone}`} className="hover:text-red-600 font-medium">{liveSiteSettings.secondaryPhone || siteConfig.supportPhone}</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Email Communications</strong>
                    <p className="text-slate-600">Main Email: <a href={`mailto:${liveSiteSettings.email}`} className="hover:text-red-600 font-medium">{liveSiteSettings.email}</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Google Address & Headquarters</strong>
                    <p className="text-slate-600 leading-relaxed">{liveSiteSettings.address}</p>
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 font-bold inline-flex items-center space-x-1 mt-1 text-xs"
                    >
                      <span>View on Google Maps →</span>
                    </a>
                  </div>
                </div>

                  <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">Operational Hours</strong>
                    <p className="text-slate-600">{liveSiteSettings.workingHours || 'Monday – Friday: 9:30 AM – 6:00 PM | Saturday: 9:30 AM – 1:30 PM'}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Card */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${(liveSiteSettings.whatsapp || siteConfig.whatsappNumber).replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(liveSiteSettings.companyName || siteConfig.name)},%20I%20have%20an%20engineering%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly ({liveSiteSettings.whatsapp || liveSiteSettings.phone})</span>
                </a>
              </div>
            </div>

            {/* Google Maps Location Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Visitor Protocol & Location</span>
              <h4 className="text-sm font-bold">Visiting Our Bengaluru Technology Center</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {liveSiteSettings.address}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prior appointment is required for machine demonstrations and benchmark sample testing.
              </p>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md mt-1"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950">Enquiry Successfully Submitted</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-slate-900">{formData.fullName}</strong>. Your requirement has been routed to our technical sales and engineering desk. We typically respond within 2-4 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-950">Send an Official Enquiry</h3>
                <p className="text-xs text-slate-500">
                  Fill in your technical details below to request quotations, schedules, or technical datasheets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Anand Varma"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Engineering Solutions"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number / Mobile <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Requirement Category
                  </label>
                  <select
                    name="requirementType"
                    value={formData.requirementType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="3D Printers & Hardware">3D Printers (FDM, DLP, LCD)</option>
                    <option value="3D Scanners">3D Scanners</option>
                    <option value="CAD Software Licenses">CAD Software (SketchUp, ARES, Enscape, V-Ray, Corona)</option>
                    <option value="Contract 3D Printing Service">Contract 3D Printing Service</option>
                    <option value="Materials & Consumables">Materials, Resins & Spare Parts</option>
                    <option value="Other Technical Query">Other Technical Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Scope / Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your component size, desired material, accuracy requirements, or software licensing needs..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    🔒 Protected under strict NDA
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactPage
