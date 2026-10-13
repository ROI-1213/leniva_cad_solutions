import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  CheckCircle,
  Send,
} from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { useApp } from '../context/AppContext'

export const Footer: React.FC = () => {
  const { liveSiteSettings } = useApp()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSubmitted(true)
      setNewsletterEmail('')
    }
  }

  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 sm:pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter & Advisory Banner */}
        <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 mb-8 sm:mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Engineering Briefing</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay Ahead with Additive Manufacturing & CAD Trends
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Receive technical whitepapers, material selection charts, and software release notices directly from our engineering team.
            </p>
          </div>

          <div className="lg:col-span-5">
            {newsletterSubmitted ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold bg-emerald-950/60 border border-emerald-800 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5" />
                <span>Thank you for subscribing to Leniva Engineering Insights!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email address..."
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800">
          <Link to="/" className="inline-flex items-center">
            <div className="bg-white px-3.5 py-2 rounded-xl inline-block shadow-md">
              <img src="/logo.png?v=3" alt="LENIVA CAD SOLUTIONS" className="h-11 w-auto object-contain" />
            </div>
          </Link>
          <p className="text-xs text-slate-400 max-w-xl">
            {siteConfig.tagline} — Authorized industrial additive manufacturing systems, high-precision metrology 3D scanners, and architectural CAD engineering solutions across India.
          </p>
        </div>

        {/* Multi-Column Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800 text-xs">
          {/* Col 1: CAD Software (First in hierarchy) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center space-x-1.5">
              <span>CAD Software</span>
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/products/sketchup" className="hover:text-red-400 transition-colors">SketchUp Pro</Link></li>
              <li><Link to="/products/ares-standard" className="hover:text-red-400 transition-colors">ARES Standard</Link></li>
              <li><Link to="/products/ares-commander" className="hover:text-red-400 transition-colors">ARES Commander</Link></li>
              <li><Link to="/products/vray" className="hover:text-red-400 transition-colors">Chaos V-Ray</Link></li>
              <li><Link to="/products/enscape" className="hover:text-red-400 transition-colors">Chaos Enscape</Link></li>
              <li><Link to="/products/cad-software" className="hover:text-red-400 font-semibold text-red-400">All Software Suite →</Link></li>
            </ul>
          </div>

          {/* Col 2: 3D Printers (Second in hierarchy) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">3D Printers</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/products/pratham-3-rapid" className="hover:text-red-400 transition-colors">Pratham 3 Rapid (500 mm/s)</Link></li>
              <li><Link to="/products/pratham-6" className="hover:text-red-400 transition-colors">Pratham 6.0 Large Format</Link></li>
              <li><Link to="/products/pratham-desktop" className="hover:text-red-400 transition-colors">Pratham Desktop</Link></li>
              <li><Link to="/products/pratham-x" className="hover:text-red-400 transition-colors">Pratham X (1000) Giant</Link></li>
              <li><Link to="/products/eka-ht" className="hover:text-red-400 transition-colors">EKA HT (DLP Resin)</Link></li>
              <li><Link to="/products/eka-gt-max" className="hover:text-red-400 transition-colors">EKA GT MAX (Industrial LCD)</Link></li>
              <li><Link to="/products" className="hover:text-red-400 font-semibold text-red-400">All 3D Printers →</Link></li>
            </ul>
          </div>

          {/* Col 3: 3D Scanners */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              3D Scanners
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/3d-scanners/3devok-mq" className="hover:text-red-400 transition-colors">3DeVOK MQ Color</Link></li>
              <li><Link to="/3d-scanners/3devok-mt" className="hover:text-red-400 transition-colors">3DeVOK MT Laser</Link></li>
              <li><Link to="/products/einscan" className="hover:text-red-400 transition-colors">EINSTAR Handheld</Link></li>
              <li><Link to="/products/3d-scanners" className="hover:text-red-400 font-semibold text-red-400">All 3D Scanners →</Link></li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/about" className="hover:text-red-400 transition-colors">About Leniva</Link></li>
              <li><Link to="/blog" className="hover:text-red-400 transition-colors">Engineering Blogs</Link></li>
              <li><Link to="/careers" className="hover:text-red-400 transition-colors">Careers at Leniva</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 6: Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Support & Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/warranty" className="hover:text-red-400 transition-colors">Warranty & Service Level</Link></li>
              <li><Link to="/return-policy" className="hover:text-red-400 transition-colors">Return & Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/wishlist" className="hover:text-red-400 transition-colors">Saved Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Corporate Address & Contact Banner */}
        <div className="py-8 border-b border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Google Address & Headquarters</strong>
              <p>{liveSiteSettings.address}</p>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold inline-flex items-center space-x-1 mt-1 text-xs"
              >
                <span>Open in Google Maps →</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Direct Phone Numbers</strong>
              <p>Main Contact: <a href={`tel:${liveSiteSettings.phone}`} className="hover:text-red-400">{liveSiteSettings.phone}</a></p>
              <p>Secondary Contact: <a href={`tel:${siteConfig.supportPhone}`} className="hover:text-red-400">{siteConfig.supportPhone}</a></p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Email Communications</strong>
              <p>Main Email: <a href={`mailto:${liveSiteSettings.email}`} className="hover:text-red-400">{liveSiteSettings.email}</a></p>
              <p className="text-slate-500 mt-0.5">WhatsApp: <a href={`https://wa.me/${liveSiteSettings.whatsapp || siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">{liveSiteSettings.phone}</a></p>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300 font-semibold">{siteConfig.name}</strong>. All rights reserved. Built for professional additive manufacturing, CAD engineering & metrology.
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
