import React from 'react'
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

export const AboutPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md border border-red-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>About Us • Established 1990 in Bengaluru</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Trusted CAD &amp; 3D Technology Partner Since 1990
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Leniva CAD Solutions (LCS), formerly known as Compute House, was established in 1990 in Bengaluru. With over three decades of experience, we have built a strong presence in the CAD, design, visualization, and digital technology space, supporting professionals and businesses with reliable technology solutions.
            </p>

            <div className="pt-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200">
                Leniva CAD Solutions — <span className="text-red-400 font-bold">Trusted Technology. Practical Solutions.</span>
              </span>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal('About Page Consultation')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
              >
                Schedule Engineering Consultation
              </button>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
              >
                Contact Our Offices
              </Link>
            </div>
          </div>
        </div>

        {/* Core Overview & Identity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">Three Decades of Experience</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Empowering Design, Manufacturing &amp; Innovation
              </h2>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Leniva CAD Solutions (LCS), formerly known as Compute House, was established in 1990 in Bengaluru. With over three decades of experience, we have built a strong presence in the CAD, design, visualization, and digital technology space, supporting professionals and businesses with reliable technology solutions.
            </p>

            {/* Portfolio Highlight Callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50 to-slate-100 border-l-4 border-red-600 shadow-xs">
              <p className="text-sm sm:text-base font-bold text-slate-950">
                Our portfolio includes leading Engineering CAD Software, 3D Printers &amp; 3D Scanners.
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              We focus on understanding each customer's requirements and recommending the right solution based on their application, workflow, performance requirements, and budget. Our team provides guidance across software, 3D printing, and 3D scanning—from product selection and deployment to ongoing technical support.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed">
              With a strong foundation built over more than three decades, Leniva CAD Solutions continues to help architects, engineers, designers, manufacturers, and businesses adopt the right technology to improve productivity, streamline workflows, and bring ideas to life.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Our Guiding Principle</span>
                <p className="text-sm font-bold text-white">
                  Trusted Technology. Practical Solutions.
                </p>
              </div>
              <button
                onClick={() => openQuoteModal('Technology Recommendation Request')}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
              <img
                src="/images/about/about-leniva-poster.jpg"
                alt="Leniva CAD Solutions — Trusted Technology. Practical Solutions."
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Since 1990</strong>
                <span className="text-slate-500">Over 3 decades of technology excellence</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Bengaluru HQ</strong>
                <span className="text-slate-500">Supporting clients across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Portfolio Grid */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Our Technology Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              End-to-End Solutions for Professionals &amp; Businesses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our portfolio includes leading Engineering CAD Software, 3D Printers &amp; 3D Scanners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. CAD Software */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Software Suite</div>
                <h3 className="text-base font-bold text-slate-900">Engineering CAD Software</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official commercial licenses, cloud collaboration tools, and rendering solutions including Trimble SketchUp Pro, Graebert ARES Commander &amp; Standard, Chaos V-Ray, Chaos Enscape, and Corona.
                </p>
              </div>
              <Link
                to="/products/cad-software"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                Explore CAD Softwares →
              </Link>
            </div>

            {/* 2. 3D Printers */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Additive Manufacturing</div>
                <h3 className="text-base font-bold text-slate-900">3D Printers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Industrial FDM printers (Pratham desktop, large format, and 1-meter giant systems) and high-precision DLP/LCD resin printers (EKA Series) for engineering prototypes and manufacturing.
                </p>
              </div>
              <Link
                to="/products"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                Explore 3D Printers →
              </Link>
            </div>

            {/* 3. 3D Scanners */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Metrology &amp; Reverse Engineering</div>
                <h3 className="text-base font-bold text-slate-900">3D Scanners</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-precision handheld and stationary 3D scanning systems including EinScan and 3DeVOK series for non-contact metrology, quality inspection, and rapid reverse engineering.
                </p>
              </div>
              <Link
                to="/products/scanners"
                className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 pt-2"
              >
                Explore 3D Scanners →
              </Link>
            </div>
          </div>
        </div>

        {/* Customer-First Guidance & Support Commitment */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">How We Work</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Understanding Requirements, Delivering Practical Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We focus on understanding each customer's requirements and recommending the right solution based on their application, workflow, performance requirements, and budget. Our team provides guidance across software, 3D printing, and 3D scanning—from product selection and deployment to ongoing technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Compass className="w-4 h-4 text-red-600 shrink-0" />
                <h4>Application Assessment</h4>
              </div>
              <p className="text-[11px] text-slate-500">
                Evaluation of your specific workflow, accuracy needs, materials, and budgetary parameters.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <h4>Product Selection</h4>
              </div>
              <p className="text-[11px] text-slate-500">
                Objective recommendations tailored to your production, prototyping, or drafting requirements.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Settings className="w-4 h-4 text-red-600 shrink-0" />
                <h4>Seamless Deployment</h4>
              </div>
              <p className="text-[11px] text-slate-500">
                Complete installation, licensing setup, hardware commissioning, and hands-on user training.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Headphones className="w-4 h-4 text-red-600 shrink-0" />
                <h4>Ongoing Technical Support</h4>
              </div>
              <p className="text-[11px] text-slate-500">
                Dedicated application engineers, local spare parts inventory, and responsive technical helplines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
