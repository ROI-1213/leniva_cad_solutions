import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, Send, Phone, Mail, Building, FileText, Package } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { QuoteFormData } from '../types'

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quoteProduct, submitQuote } = useApp()
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    productOrService: '',
    quantity: '1',
    application: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (quoteProduct) {
      setFormData(prev => ({ ...prev, productOrService: quoteProduct }))
    }
  }, [quoteProduct])

  // Lock background scroll on mobile/desktop when modal is open
  useEffect(() => {
    if (isQuoteModalOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isQuoteModalOpen])

  if (!isQuoteModalOpen) return null
  if (typeof document === 'undefined') return null

  const isBrochureRequest = /\bbrochure\b/i.test(quoteProduct || '')
  const isDemoRequest = !isBrochureRequest && /\bdemo\b|demonstration/i.test(quoteProduct || '')
  const isConsultationRequest =
    !isBrochureRequest &&
    !isDemoRequest &&
    /\bconsultation\b|schedule.*engineer|talk to.*expert|technical call/i.test(quoteProduct || '')

  const modalBadge = isBrochureRequest
    ? 'Official Brochure & Technical Datasheet'
    : isDemoRequest
      ? 'Official Demo Request'
      : isConsultationRequest
        ? 'Engineering Consultation'
        : 'Official Inquiry'

  const modalHeading = isBrochureRequest
    ? 'Download Official Product Brochure'
    : isDemoRequest
      ? 'Request a Product Demonstration'
      : isConsultationRequest
        ? 'Schedule an Engineering Consultation'
        : 'Request an Engineering Quotation'

  const modalIntro = isBrochureRequest
    ? 'Please provide your details below to receive the complete official CAD software brochure, technical datasheet, and licensing documentation.'
    : isDemoRequest
      ? 'Please provide your details below to schedule a live product demonstration with our application engineers.'
      : isConsultationRequest
        ? 'Please share your technical requirements below to schedule an engineering consultation with our specialists.'
        : 'Please provide your project requirements below. Our application engineers review all inquiries to ensure the most cost-effective hardware, software, and service configuration.'

  const submitButtonText = isBrochureRequest
    ? 'Request & Download Brochure'
    : isDemoRequest
      ? 'Submit Demo Request'
      : isConsultationRequest
        ? 'Schedule Consultation'
        : 'Submit Quote Request'

  const confirmationHeading = 'Enquiry Submitted Successfully'

  const confirmationMessage = isBrochureRequest
    ? 'Thank you for your interest! Your brochure request has been received. Our application team is sharing the official documentation with you immediately.'
    : 'Thank you for contacting Leniva 3D. Your enquiry has been submitted successfully. Our team will get back to you shortly.'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault()
    if (isSubmitting) return

    const name = (formData.fullName || '').trim()
    const email = (formData.email || '').trim()
    const phone = (formData.phone || '').trim()

    if (!name) {
      alert('Please enter your Full Name')
      return
    }
    if (!email && !phone) {
      alert('Please enter your Corporate Email or Phone Number')
      return
    }

    // 1. Immediately activate success state & show browser pop-up message
    setIsSuccess(true)
    setIsSubmitting(false)
    try {
      window.alert('Enquiry Submitted Successfully!')
    } catch {
      // ignore
    }

    // 2. Dispatch background persistence and cloud/mail relay to viju@leniva3d.com and Admin
    submitQuote({
      ...formData,
      productOrService: formData.productOrService || quoteProduct || 'General CAD / Product Enquiry',
      source: isBrochureRequest
        ? 'CAD Software Brochure Download Enquiry'
        : isDemoRequest
        ? 'Product Demonstration Request'
        : isConsultationRequest
        ? 'Engineering Consultation Request'
        : 'Quote Request Form',
      enquiryType: isBrochureRequest
        ? 'quote'
        : isDemoRequest
        ? 'demo'
        : isConsultationRequest
        ? 'consultation'
        : 'quote',
    }).catch(err => {
      console.warn('Background quote submit error:', err)
    })
  }

  const handleResetAndClose = () => {
    setIsSuccess(false)
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      productOrService: '',
      quantity: '1',
      application: '',
      message: '',
    })
    closeQuoteModal()
  }

  return createPortal(
    <div
      data-leniva-quote-modal="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div 
        data-leniva-quote-modal="true"
        className="relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/90 my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 text-white shrink-0 border-b border-slate-800">
          <div className="min-w-0 pr-3">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-red-400 block">{modalBadge}</span>
            <h3 className="text-base sm:text-xl font-bold tracking-tight truncate sm:whitespace-normal">{modalHeading}</h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto max-h-[85dvh]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
            </div>
            <div className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-wider">
              Enquiry Submitted Successfully
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">Enquiry Submitted Successfully!</h4>
            <p className="text-slate-600 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
              {confirmationMessage}
            </p>
            <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <a
                href={`mailto:viju@leniva3d.com?subject=${encodeURIComponent(`New Customer Enquiry – ${formData.productOrService || quoteProduct || 'Leniva 3D'} – Leniva 3D`)}&body=${encodeURIComponent(`Customer Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nRequirement: ${formData.productOrService || quoteProduct}\nMessage: ${formData.message}`)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-center"
              >
                <span>Direct Email to viju@leniva3d.com</span>
              </a>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer text-center"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            data-leniva-handled="true"
            data-leniva-quote-modal="true"
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 overscroll-contain"
          >
            <p className="text-xs text-slate-500 leading-relaxed">
              {modalIntro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                  <FileText className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Precision Engineering Ltd."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                  <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Corporate Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Service Requirement <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="productOrService"
                    required
                    value={formData.productOrService}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white truncate"
                  >
                    <option value="">Select product or service...</option>
                    {formData.productOrService && (
                      <option value={formData.productOrService}>{formData.productOrService}</option>
                    )}
                    <optgroup label="FDM 3D Printers">
                      <option value="Pratham Mini">Pratham Mini</option>
                      <option value="Pratham Desktop">Pratham Desktop</option>
                      <option value="Pratham 3.0">Pratham 3.0</option>
                      <option value="Pratham 5.0">Pratham 5.0</option>
                      <option value="Pratham 6.0">Pratham 6.0</option>
                      <option value="Pratham X – 1000 × 1000 × 600 mm">Pratham X – 1000 × 1000 × 600 mm</option>
                      <option value="Pratham X – 1000 × 1000 × 1000 mm">Pratham X – 1000 × 1000 × 1000 mm</option>
                      <option value="Pratham 3 Rapid">Pratham 3 Rapid</option>
                    </optgroup>
                    <optgroup label="Resin-Based 3D Printers – Engineering">
                      <option value="EKA XLE">EKA XLE</option>
                      <option value="EKA GT MAX">EKA GT MAX</option>
                    </optgroup>
                    <optgroup label="Resin-Based 3D Printers – Jewellery">
                      <option value="EKA HT">EKA HT</option>
                      <option value="EKA XL">EKA XL</option>
                      <option value="EKA F1 16K">EKA F1 16K</option>
                    </optgroup>
                    <optgroup label="3D Scanners">
                      <option value="3DeVOK MT">3DeVOK MT</option>
                      <option value="3DeVOK MQ">3DeVOK MQ</option>
                      <option value="EINSTAR">EINSTAR</option>
                    </optgroup>
                    <optgroup label="CAD Software – ARES (Graebert)">
                      <option value="ARES Standard">ARES Standard</option>
                      <option value="ARES Commander">ARES Commander</option>
                      <option value="ARES Kudo">ARES Kudo</option>
                      <option value="ARES Touch">ARES Touch</option>
                      <option value="ARES Trinity">ARES Trinity</option>
                      <option value="ARES Mechanical">ARES Mechanical</option>
                      <option value="ARES Electrical">ARES Electrical</option>
                    </optgroup>
                    <optgroup label="CAD Software – SketchUp (Trimble)">
                      <option value="SketchUp Pro">SketchUp Pro</option>
                      <option value="SketchUp Pro Scan">SketchUp Pro Scan</option>
                      <option value="SketchUp Pro Advanced Workflows">SketchUp Pro Advanced Workflows</option>
                      <option value="SketchUp Studio">SketchUp Studio</option>
                    </optgroup>
                    <optgroup label="CAD Software – Chaos">
                      <option value="Enscape">Enscape</option>
                      <option value="V-Ray">V-Ray</option>
                      <option value="Corona">Corona</option>
                    </optgroup>
                    <optgroup label="Services">
                      <option value="Contract 3D Printing Service">Contract 3D Printing Service</option>
                      <option value="Request a Demo">Request a Demo</option>
                      <option value="Request a Quote">Request a Quote</option>
                      <option value="Other Enquiry">Other Enquiry</option>
                    </optgroup>
                  </select>
                  <Package className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimated Quantity / Scope
                </label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 1 Unit, 50 Parts"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Application / Industry Sector
              </label>
              <select
                name="application"
                value={formData.application}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
              >
                <option value="">Select industry application...</option>
                <option value="Automotive & Mobility">Automotive & Mobility</option>
                <option value="Aerospace & Defense">Aerospace & Defense</option>
                <option value="Tooling & Fixtures">Tooling, Jigs & Fixtures</option>
                <option value="Jewellery & Luxury Goods">Jewellery & Luxury Goods</option>
                <option value="Dental & Healthcare">Dental & Healthcare</option>
                <option value="Architecture & Construction">Architecture & Construction</option>
                <option value="Academic & R&D Laboratory">Academic & R&D Laboratory</option>
                <option value="Reverse Engineering & Metrology">Reverse Engineering & Metrology</option>
                <option value="Other">Other Industrial Application</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Technical Specifications & Remarks
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention desired material (e.g., PLA-CF, Castable Resin), tolerances, deliverable formats, or installation location."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500 text-center sm:text-left order-2 sm:order-1">
                🔒 We respect your privacy. Technical details are held under strict NDA.
              </p>
              <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 sm:border-transparent rounded-lg transition-colors text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    if (!isSubmitting) {
                      handleSubmit(e)
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>{submitButtonText}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
export default QuoteModal
