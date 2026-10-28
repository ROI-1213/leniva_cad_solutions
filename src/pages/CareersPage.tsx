import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Send,
  Mail,
  Clock,
  Award,
  BookOpen,
} from 'lucide-react'
import { recordCustomerEnquiry } from '../utils/cloudSync'

interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
  targetAudience: string
  description: string
  responsibilities: string[]
  whoCanApply: string[]
}

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    degree: '',
    college: '',
    resumeUrl: '',
    message: '',
  })

  const openings: JobOpening[] = [
    {
      id: 'tech-support-engineer',
      title: 'Technical Support Engineer',
      department: 'Technical Operations & Additive Systems',
      location: 'Bengaluru / Karnataka (On-Site & Field)',
      type: 'Full-Time / Graduate Engineering Trainee',
      targetAudience: 'B.E. Students / Freshers (Up to 1 Year Experience)',
      description:
        'Hands-on technical engineering role focused on 3D printer commissioning, precision calibration, slicing optimization, and customer onboarding for industrial FDM and resin systems.',
      responsibilities: [
        'Perform machine assembly, bed leveling, and optical alignment for 3D printers and scanners',
        'Assist customers in slicing parameter selection, material workflows (PLA, ABS, TPU, Resins), and troubleshooting',
        'Conduct live product test prints and benchmark evaluations',
        'Provide proactive telephone, remote, and field engineering support',
      ],
      whoCanApply: [
        'B.E. / B.Tech students in final year or recent fresh graduates (Mechanical, Mechatronics, Automobile, EEE, ECE, or related disciplines)',
        'Freshers and candidates with up to 1 year of experience',
        'Strong enthusiasm for 3D printing hardware, robotics, and hands-on mechanical systems',
        'Good communication and problem-solving mindset',
      ],
    },
    {
      id: 'techno-commercial-role',
      title: 'Techno-Commercial Role',
      department: 'Technical Consulting & Business Development',
      location: 'Bengaluru / Hybrid India',
      type: 'Full-Time / Graduate Trainee',
      targetAudience: 'B.E. Students / Freshers (Up to 1 Year Experience)',
      description:
        'Exciting hybrid role blending engineering knowledge with customer engagement. Assist in conducting technical machine demonstrations, software walk-throughs for CAD and 3D scanners, and preparing client proposals.',
      responsibilities: [
        'Deliver technical demonstrations of 3D printers, 3D scanners, and CAD software to prospective clients',
        'Understand customer application requirements and recommend appropriate machine/material configurations',
        'Assist in preparing technical proposals, quotations, and product brochures for industrial clients and universities',
        'Engage with engineering design offices, architecture studios, and educational institutions',
      ],
      whoCanApply: [
        'B.E. / B.Tech students or fresh graduates interested in combining engineering with technical sales and consulting',
        'Freshers and candidates with up to 1 year of experience',
        'Clear verbal and written communication skills with strong presentation ability',
        'Eagerness to learn cutting-edge additive manufacturing and digital design solutions',
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    recordCustomerEnquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      productOrService: `Job Application – ${selectedJob || 'Graduate Engineer'}`,
      subject: `Job Application: ${selectedJob} – ${formData.fullName}`,
      message: `Applicant Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDegree / Branch: ${formData.degree}\nCollege / University: ${formData.college || 'N/A'}\nResume Link: ${formData.resumeUrl}\nCandidate Statement: ${formData.message || 'N/A'}`,
      source: 'Careers & Opportunities Page',
      enquiryType: 'consultation',
    }).catch(() => false)
    setSubmitted(true)
  }

  const handleResetModal = () => {
    setSubmitted(false)
    setSelectedJob(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      degree: '',
      college: '',
      resumeUrl: '',
      message: '',
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Careers &amp; Opportunities</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-red-400" />
              <span>B.E. Students &amp; Freshers Welcome</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Launch Your Career in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                Additive Manufacturing &amp; 3D Tech
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We are actively hiring <strong>B.E. students, freshers, and candidates with up to 1 year of experience</strong>.
              Join Leniva CAD Solutions to get hands-on onboarding on world-class industrial 3D printers, 3D metrology scanners, and licensed CAD engineering software.
            </p>
          </div>

          {/* Quick Eligibility Highlights Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-red-400 font-bold font-mono uppercase text-[11px] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Eligibility</span>
              </div>
              <div className="text-white font-semibold text-xs">Freshers &amp; Up to 1 Year</div>
              <div className="text-[10px] text-slate-400">No prior experience required</div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-blue-400 font-bold font-mono uppercase text-[11px] flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Target Degree</span>
              </div>
              <div className="text-white font-semibold text-xs">B.E. / B.Tech Students</div>
              <div className="text-[10px] text-slate-400">Mech, Mechatronics, EEE, ECE &amp; related</div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-emerald-400 font-bold font-mono uppercase text-[11px] flex items-center space-x-1">
                <Award className="w-3.5 h-3.5" />
                <span>Onboarding</span>
              </div>
              <div className="text-white font-semibold text-xs">Full In-House Mentorship</div>
              <div className="text-[10px] text-slate-400">Master real industrial machines</div>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-amber-400 font-bold font-mono uppercase text-[11px] flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Application</span>
              </div>
              <div className="text-white font-semibold text-xs">Simple 1-Click Apply</div>
              <div className="text-[10px] text-slate-400">Fast review by engineering team</div>
            </div>
          </div>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
                — Open Positions —
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Opportunities for B.E. Students &amp; Freshers
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Freshers / Candidates with up to 1 year of experience can apply
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {openings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-50 text-red-700 rounded-full border border-red-200">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                      Freshers Eligible
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 group-hover:text-red-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 font-mono mt-1">
                      {job.targetAudience}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                      What You Will Learn &amp; Do:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Who Can Apply */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                      Who Can Apply:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {job.whoCanApply.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metadata */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Simple Apply Button */}
                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="w-full py-3.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer group-hover:shadow-lg"
                >
                  <span>Apply for {job.title}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Direct Email Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-base font-bold text-slate-950">
              Prefer to email your resume directly?
            </h3>
            <p className="text-xs text-slate-500">
              Send your profile, college name, and degree details to our talent acquisition team.
            </p>
          </div>

          <a
            href="mailto:viju@leniva3d.com?subject=Application%20for%20Careers%20at%20Leniva%20CAD%20Solutions"
            className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Email Resume: viju@leniva3d.com</span>
          </a>
        </div>

        {/* Simple Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600">
                    Application Form
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-0.5">
                    Apply: {selectedJob}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Freshers and candidates with up to 1 year experience welcome.
                  </p>
                </div>
                <button
                  onClick={handleResetModal}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-lg font-black text-slate-950">Application Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying for the <strong>{selectedJob}</strong> position. Our engineering management team will review your application and get in touch with you shortly.
                  </p>
                  <button
                    onClick={handleResetModal}
                    className="mt-4 px-6 py-2.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-leniva-handled="true" className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Degree / Branch <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. B.E. Mechanical / ECE"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        College / University
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BMSCE / RVCE / VTU"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Resume Link (Google Drive / LinkedIn / Portfolio) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/... or LinkedIn URL"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Ensure link sharing permission is set to &ldquo;Anyone with link can view&rdquo;.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Brief Message or Interests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us briefly about your interest in 3D technology..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>Submit Application</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareersPage
