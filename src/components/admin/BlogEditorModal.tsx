import React, { useState, useEffect, useRef } from 'react'
import {
  X,
  Upload,
  Sparkles,
  Eye,
  FileText,
  Calendar,
  Clock,
  User,
  Tag,
  Plus,
  Check,
  Image as ImageIcon,
  List,
  Quote,
  Bold,
  Italic,
  BookOpen,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { BlogPostItem } from '../../utils/blogCatalog'

export interface BlogEditorModalProps {
  isOpen: boolean
  initialBlog?: BlogPostItem | null
  existingCategories?: string[]
  onSave: (blog: BlogPostItem) => Promise<void> | void
  onClose: () => void
  onUploadImage?: (file: File, callback: (url: string) => void) => Promise<void>
}

const PRESET_BLOG_IMAGES = [
  { label: 'Reverse Engineering', url: '/images/blogs/blog-reverse-engineering.jpg' },
  { label: 'FDM, LCD & DLP Comparison', url: '/images/blogs/blog-fdm-lcd-dlp.jpg' },
  { label: '3D Scanning & Metrology', url: '/images/blogs/blog-3d-scanning-inspection.jpg' },
  { label: 'CAD & Additive Manufacturing', url: '/images/blogs/blog-cad-additive-manufacturing.jpg' },
  { label: 'Industrial 3D Printing', url: '/images/blogs/blog-industrial-3d-printing.jpg' },
]

const TEMPLATES = [
  {
    id: 'comparison',
    title: 'Technology Comparison & Benchmark',
    category: '3D Printing',
    excerpt: 'An in-depth technical comparison of additive processes across surface finish, mechanical strength, build volume, and operational costs.',
    content: `### Overview & Process Selection Criteria

Selecting the ideal additive or manufacturing methodology requires balancing dimensional tolerance, material strength, production volume, and cost-per-part. In this engineering benchmark, we examine the primary technologies suited for functional prototyping and batch manufacturing.

### 1. Fundamental Working Principles

- **Process Mechanism:** How the raw material is transformed (extrusion toolpath vs. photopolymer layer cross-linking).
- **Minimum Feature Size & Resolution:** Layer thicknesses ranging from 25 µm up to 300 µm depending on application requirements.
- **Cycle Time & Throughput:** Single-part build speed compared against dense multi-part nesting on a shared platform.

### 2. Engineering Material Performance

- **Tensile & Flexural Modulus:** Industrial polymers, carbon-fiber reinforced filaments, and engineering resins.
- **Heat Deflection Temperature (HDT):** Thermal performance under sustained mechanical loads.
- **Chemical & Environmental Resistance:** Resistance to industrial cutting fluids, hydrocarbons, and UV exposure.

### 3. Application Recommendations

#### Recommended For:
- Functional shop-floor jigs, checking fixtures, and assembly tooling.
- Rapid end-use production batches without tooling delays.
- Complex internal lattice geometries impossible with CNC machining.

### Engineering Summary & Next Steps

For ultra-high surface detail in micro-mechanisms or casting masters, choose DLP/LCD technology. For rugged, impact-resistant industrial tooling, choose high-speed industrial FDM systems like the Pratham series.`,
  },
  {
    id: 'reverse_engineering',
    title: '3D Scanning & Scan-to-CAD Workflow',
    category: 'Reverse Engineering',
    excerpt: 'A practical 3-stage guide to reverse engineering legacy components from high-density optical mesh scans into fully parametric CAD models.',
    content: `### Challenges with Legacy Equipment & Missing Documentation

In manufacturing, engineers frequently face scenarios where physical dies, impellers, or legacy castings must be reproduced, but original 2D drawings and CAD math models no longer exist.

### The 3-Stage Scan-to-CAD Pipeline

#### 1. High-Precision Optical Digitization
Using metrology-grade scanners like 3DeVOK or EinScan, non-contact optical cameras capture millions of surface coordinate points per second, producing a clean, dense point cloud with volumetric accuracy up to 0.02 mm.

#### 2. Feature Extraction & Design Intent Recovery
A raw STL mesh cannot be edited or machined cleanly on a CNC center. True reverse engineering extracts geometric design intent:
- Detecting nominal cylindrical diameters and correcting concentricity.
- Identifying orthogonal reference planes, datums, and centerlines.
- Filtering out mechanical abrasions and thermal shrinkage distortions.

#### 3. Parametric Modeling in Dedicated Environments
Using software like QuickSurface or ARES Commander, cross-sectional sketch planes are generated across the mesh. Analytical features and freeform NURBS surfaces are fitted with live color-mapped deviation verification.

### Key Industrial Benefits
- Reduces reverse engineering cycle times from weeks to hours.
- Direct dimensional inspection and deviation heatmaps against nominal design.
- Generates standard STEP, IGES, and Parasolid files ready for CNC tooling.`,
  },
  {
    id: 'cad_modeling',
    title: 'Next-Generation CAD & Visualization Workflows',
    category: 'CAD Software',
    excerpt: 'How modern engineering offices leverage hybrid desktop, mobile, and cloud CAD solutions to accelerate drawing production and client sign-offs.',
    content: `### Modernizing the Engineering Drafting Office

Traditional CAD licensing and isolated desktop files create bottlenecks between shop-floor engineers, project managers, and field technicians. Modern CAD pipelines bridge this gap with unified cloud and mobile synchronization.

### Key Productivity Advantages

- **The Trinity Concept:** Seamless switching between Desktop CAD (ARES Commander), Mobile CAD on tablets (ARES Touch), and browser-based Cloud CAD (ARES Kudo).
- **DWG Native Fidelity:** Full compatibility with AutoCAD DWG files, dynamic blocks, and AutoLISP routines with zero conversion errors.
- **Photorealistic Client Presentations:** Immediate real-time visualization with Enscape and Chaos V-Ray directly from SketchUp and CAD viewports.

### Best Practices for Implementation
1. Standardize drafting layers, dimension styles, and title blocks across the entire team.
2. Automate bill of materials (BOM) extraction from 3D assemblies into Excel.
3. Use mobile CAD for instant shop-floor markup and measurement verification during assembly.`,
  },
]

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({
  isOpen,
  initialBlog,
  existingCategories = [],
  onSave,
  onClose,
  onUploadImage,
}) => {
  const isEditMode = Boolean(initialBlog?.id)

  const [activeTab, setActiveTab] = useState<'editor' | 'card_preview' | 'article_preview'>('editor')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [isCustomCategory, setIsCustomCategory] = useState(false)
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Current Blog Form State
  const [form, setForm] = useState<BlogPostItem>(() => ({
    id: initialBlog?.id || `blog-${Date.now()}`,
    slug: initialBlog?.slug || '',
    title: initialBlog?.title || '',
    category: initialBlog?.category || '3D Printing',
    read_time: initialBlog?.read_time || '5 min read',
    date: initialBlog?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: initialBlog?.author || 'Leniva Editorial Team',
    author_role: initialBlog?.author_role || 'Additive Applications Specialist',
    image: initialBlog?.image || '/images/blogs/blog-reverse-engineering.jpg',
    excerpt: initialBlog?.excerpt || '',
    content: initialBlog?.content || '',
    tags: initialBlog?.tags && initialBlog.tags.length > 0 ? initialBlog.tags : ['3D Printing', 'CAD', 'Engineering'],
    published: initialBlog?.published !== false,
  }))

  useEffect(() => {
    if (initialBlog) {
      setForm({
        id: initialBlog.id || `blog-${Date.now()}`,
        slug: initialBlog.slug || '',
        title: initialBlog.title || '',
        category: initialBlog.category || '3D Printing',
        read_time: initialBlog.read_time || '5 min read',
        date: initialBlog.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: initialBlog.author || 'Leniva Editorial Team',
        author_role: initialBlog.author_role || 'Additive Applications Specialist',
        image: initialBlog.image || '/images/blogs/blog-reverse-engineering.jpg',
        excerpt: initialBlog.excerpt || '',
        content: initialBlog.content || '',
        tags: initialBlog.tags && initialBlog.tags.length > 0 ? initialBlog.tags : ['3D Printing', 'CAD', 'Engineering'],
        published: initialBlog.published !== false,
      })
      setSlugManuallyEdited(Boolean(initialBlog.slug))
    } else {
      setForm({
        id: `blog-${Date.now()}`,
        slug: '',
        title: '',
        category: '3D Printing',
        read_time: '5 min read',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: 'Leniva Editorial Team',
        author_role: 'Additive Applications Specialist',
        image: '/images/blogs/blog-reverse-engineering.jpg',
        excerpt: '',
        content: '',
        tags: ['3D Printing', 'CAD', 'Engineering'],
        published: true,
      })
      setSlugManuallyEdited(false)
    }
    setActiveTab('editor')
  }, [initialBlog, isOpen])

  if (!isOpen) return null

  // Helpers
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (newTitle: string) => {
    setForm(prev => {
      const updated = { ...prev, title: newTitle }
      if (!slugManuallyEdited || !prev.slug) {
        updated.slug = slugify(newTitle)
      }
      return updated
    })
  }

  const handleAutoCalculateReadTime = () => {
    const words = (form.content || '').trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 180))
    setForm(prev => ({ ...prev, read_time: `${minutes} min read` }))
  }

  const handleAddTag = (tagToAdd?: string) => {
    const val = (tagToAdd || tagInput).trim().replace(/^#/, '')
    if (!val) return
    if (!form.tags?.includes(val)) {
      setForm(prev => ({
        ...prev,
        tags: [...(prev.tags || []), val],
      }))
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(t => t !== tagToRemove),
    }))
  }

  const handleInsertMarkdownSnippet = (snippet: string) => {
    const textarea = contentTextareaRef.current
    if (!textarea) {
      setForm(prev => ({ ...prev, content: (prev.content || '') + '\n' + snippet }))
      return
    }
    const start = textarea.selectionStart || 0
    const end = textarea.selectionEnd || 0
    const current = form.content || ''
    const before = current.substring(0, start)
    const after = current.substring(end)
    const newContent = before + snippet + after
    setForm(prev => ({ ...prev, content: newContent }))

    setTimeout(() => {
      textarea.focus()
      const newCursor = start + snippet.length
      textarea.setSelectionRange(newCursor, newCursor)
    }, 50)
  }

  const handleApplyTemplate = (tmplId: string) => {
    const tmpl = TEMPLATES.find(t => t.id === tmplId)
    if (!tmpl) return
    if (form.content && !window.confirm('Applying this blueprint template will replace your current content and excerpt. Continue?')) {
      return
    }
    setForm(prev => ({
      ...prev,
      title: prev.title || tmpl.title,
      slug: prev.slug || slugify(tmpl.title),
      category: tmpl.category,
      excerpt: tmpl.excerpt,
      content: tmpl.content,
      read_time: '6 min read',
    }))
  }

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    try {
      if (onUploadImage) {
        await onUploadImage(file, (url: string) => {
          setForm(prev => ({ ...prev, image: url }))
          setIsUploading(false)
        })
      } else {
        // Fallback FileReader DataURL
        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setForm(prev => ({ ...prev, image: reader.result as string }))
          }
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      }
    } catch (err) {
      console.error('Image upload failed', err)
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      alert('Please enter an article title.')
      return
    }
    const finalSlug = form.slug.trim() || slugify(form.title) || form.id
    const finalBlog: BlogPostItem = {
      ...form,
      slug: finalSlug,
      tags: form.tags && form.tags.length > 0 ? form.tags : [form.category || '3D Printing'],
      read_time: form.read_time || '5 min read',
      date: form.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: form.author || 'Leniva Editorial Team',
      author_role: form.author_role || 'Additive Applications Specialist',
    }
    onSave(finalBlog)
  }

  // Categories list
  const categoryOptions = Array.from(
    new Set([
      '3D Printing',
      'Reverse Engineering',
      '3D Scanning',
      'CAD Software',
      'Materials & Metrology',
      'Industry Insights',
      ...existingCategories,
    ])
  )

  const wordCount = (form.content || '').trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 flex flex-col max-h-[94vh] overflow-hidden text-slate-800">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {isEditMode ? `Edit Article: ${form.title || 'Untitled'}` : 'Write New Engineering Article'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Add technical articles with cover images, author attribution, Markdown, and instant live preview.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card_preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'card_preview'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Preview how article card looks on /blog page"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Card Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('article_preview')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'article_preview'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Preview full reading layout with hero & markdown"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Full Page Preview</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs">
          
          {/* TAB 1: FORM EDITOR */}
          {activeTab === 'editor' && (
            <form id="blog-editor-form" onSubmit={handleSubmit} className="space-y-5">
              
              {/* Quick Blueprints Bar */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center space-x-2 text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-bold">Need a starting structure?</span>
                  <span className="text-[11px] text-blue-700 hidden md:inline">Choose a pre-formatted engineering blueprint:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleApplyTemplate(t.id)}
                      className="px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white text-blue-700 rounded-lg font-bold border border-blue-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      {t.title.split(' ')[0]} {t.title.split(' ')[1] || ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-800 mb-1">
                    Article Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reverse Engineering Complex Impellers with 3D Scanners"
                    value={form.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-800">URL Route (Slug)</label>
                    <button
                      type="button"
                      onClick={() => {
                        setSlugManuallyEdited(false)
                        setForm(p => ({ ...p, slug: slugify(p.title) }))
                      }}
                      className="text-[10px] text-blue-600 hover:underline font-bold"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. reverse-engineering-impellers"
                      value={form.slug}
                      onChange={e => {
                        setSlugManuallyEdited(true)
                        setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 focus:bg-white focus:border-blue-500"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                    Live link: /blog/<strong className="text-slate-700">{form.slug || 'url-slug'}</strong>
                  </div>
                </div>
              </div>

              {/* Category, Date & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-800">Category</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(!isCustomCategory)}
                      className="text-[10px] text-blue-600 hover:underline font-bold"
                    >
                      {isCustomCategory ? 'Pick preset' : '+ Custom category'}
                    </button>
                  </div>
                  {isCustomCategory ? (
                    <input
                      type="text"
                      placeholder="e.g. Metrology & Quality"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:border-blue-500"
                    />
                  ) : (
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:bg-white focus:border-blue-500"
                    >
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-800">Estimated Read Time</label>
                    <button
                      type="button"
                      onClick={handleAutoCalculateReadTime}
                      className="text-[10px] text-emerald-600 hover:underline font-bold"
                      title="Calculate from content word count"
                    >
                      ⚡ Auto-calc ({wordCount} words)
                    </button>
                  </div>
                  <div className="relative">
                    <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. 6 min read"
                      value={form.read_time}
                      onChange={e => setForm({ ...form, read_time: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Publication Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. November 2, 2026"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Author Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Nair or Leniva Editorial Team"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Author Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Metrology & CAD / Applications Specialist"
                    value={form.author_role}
                    onChange={e => setForm({ ...form, author_role: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Cover Image with Presets and Direct Upload */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block font-bold text-slate-800">
                      Featured Cover Image <span className="text-red-500">*</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Upload an image file from your device, choose from presets, or paste an external URL.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl cursor-pointer transition-colors font-bold shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative shrink-0">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={e => {
                          const target = e.currentTarget
                          target.src = '/images/blogs/blog-reverse-engineering.jpg'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-[9px]">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    <input
                      type="text"
                      placeholder="e.g. /images/blogs/my-post.jpg or https://..."
                      value={form.image}
                      onChange={e => setForm({ ...form, image: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 focus:border-blue-500"
                    />
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quick Presets:</span>
                      {PRESET_BLOG_IMAGES.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setForm({ ...form, image: p.url })}
                          className={`text-[10px] px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                            form.image === p.url
                              ? 'bg-blue-600 text-white border-blue-600 font-bold'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-800">
                  Topic Tags & Keywords
                </label>
                <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                  {(form.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white border border-slate-300 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs"
                    >
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer ml-1"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center space-x-1">
                    <input
                      type="text"
                      placeholder="Add tag and hit Enter..."
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag()}
                      className="p-1.5 bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Add tag"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-400 pt-1">
                  <span>Suggestions:</span>
                  {['Reverse Engineering', '3D Scanning', 'CAD Modeling', 'FDM', 'LCD', 'DLP', 'Metrology', 'Materials'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddTag(s)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      +{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Short Excerpt */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Short Excerpt / Teaser <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-slate-500 mb-1.5">
                  Displays on the blog catalog cards and as the featured opening lead on the article page.
                </p>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Discover how modern scan-to-CAD methodologies enable dimensional inspection and legacy tool reproduction..."
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed focus:bg-white focus:border-blue-500"
                />
              </div>

              {/* Full Article Content with Markdown Helper Toolbar */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                  <div>
                    <label className="block font-bold text-slate-800">
                      Full Article Body <span className="text-red-500">*</span> (Markdown Supported)
                    </label>
                    <span className="text-[11px] text-slate-500">
                      Use headings (###), bullet points (-), bold text (**text**), and callouts (&gt;).
                    </span>
                  </div>

                  {/* Markdown Helper Buttons */}
                  <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('\n### Heading Title\n')}
                      className="px-2 py-0.5 hover:bg-white text-slate-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                      title="Insert H3 Heading"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('\n#### Sub-Heading\n')}
                      className="px-2 py-0.5 hover:bg-white text-slate-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                      title="Insert H4 Heading"
                    >
                      H4
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('**bold text**')}
                      className="p-1 hover:bg-white text-slate-700 rounded transition-colors cursor-pointer"
                      title="Bold"
                    >
                      <Bold className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('*italic text*')}
                      className="p-1 hover:bg-white text-slate-700 rounded transition-colors cursor-pointer"
                      title="Italic"
                    >
                      <Italic className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('\n- Bullet point item\n- Second item\n')}
                      className="p-1 hover:bg-white text-slate-700 rounded transition-colors cursor-pointer"
                      title="Bullet List"
                    >
                      <List className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertMarkdownSnippet('\n> Key technical highlight or takeaway...\n')}
                      className="p-1 hover:bg-white text-slate-700 rounded transition-colors cursor-pointer"
                      title="Quote Block"
                    >
                      <Quote className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <textarea
                  ref={contentTextareaRef}
                  rows={10}
                  required
                  placeholder={`Write your technical article body here using standard markdown...\n\n### 1. Introduction & Context\nIn industrial manufacturing...\n\n### 2. Key Specifications & Methods\n- Dimensional accuracy\n- Cycle time`}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] leading-relaxed focus:bg-white focus:border-blue-500"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>{wordCount} words • {form.content?.length || 0} characters</span>
                  <span>Supports headings, lists, bold text, links & tables</span>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.published !== false}
                    onChange={e => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Article Published & Live
                    </span>
                    <span className="text-[11px] text-slate-500">
                      When checked, this article will immediately appear in the public blog catalog, search index, and homepage cards.
                    </span>
                  </div>
                </label>
              </div>
            </form>
          )}

          {/* TAB 2: LIVE CARD PREVIEW (Matches /blog Grid View) */}
          {activeTab === 'card_preview' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Catalog Card Preview:</span>
                  <span className="text-slate-500">This is exactly how this article appears on the main <strong>/blog</strong> page.</span>
                </div>
              </div>

              <div className="max-w-md mx-auto pt-4">
                <article className="bg-white rounded-2xl border border-slate-200 shadow-md hover:border-red-300 transition-all flex flex-col overflow-hidden group">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={form.image || '/images/blogs/blog-reverse-engineering.jpg'}
                      alt={form.title || 'Article Cover'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => {
                        const target = e.currentTarget
                        target.src = '/images/blogs/blog-reverse-engineering.jpg'
                      }}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded">
                      {form.category || 'General'}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{form.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{form.read_time}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors leading-snug">
                        {form.title || 'Untitled Technical Article'}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {form.excerpt || 'Article excerpt summary will appear here once entered...'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] font-medium text-slate-600">
                        By {form.author || 'Leniva Editorial Team'}
                      </div>
                      <span className="text-xs font-bold text-red-600 flex items-center space-x-1">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          )}

          {/* TAB 3: FULL ARTICLE PAGE PREVIEW (Matches /blog/:slug) */}
          {activeTab === 'article_preview' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-700">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-bold">Full Reader Preview:</span>
                  <span className="text-slate-500">Live rendered preview of <strong>/blog/{form.slug || 'url-slug'}</strong></span>
                </div>
              </div>

              {/* Mock Article Page Container */}
              <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Breadcrumb */}
                  <nav className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span>Home</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>Blogs</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-700 font-semibold truncate">{form.title || 'Untitled'}</span>
                  </nav>

                  {/* Article Container */}
                  <article className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    <div className="space-y-3 border-b border-slate-100 pb-4">
                      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md border border-red-100">
                        {form.category || 'General'}
                      </span>
                      <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
                        {form.title || 'Untitled Technical Article'}
                      </h1>

                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                            {(form.author || 'L')[0]}
                          </div>
                          <div>
                            <strong className="block text-slate-900 font-semibold">{form.author}</strong>
                            <span className="text-[10px] text-slate-400">{form.author_role}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{form.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{form.read_time}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Image */}
                    <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={form.image || '/images/blogs/blog-reverse-engineering.jpg'}
                        alt={form.title}
                        className="w-full h-full object-cover"
                        onError={e => {
                          const target = e.currentTarget
                          target.src = '/images/blogs/blog-reverse-engineering.jpg'
                        }}
                      />
                    </div>

                    {/* Excerpt Callout */}
                    {form.excerpt && (
                      <div className="font-semibold text-sm sm:text-base text-slate-900 italic border-l-4 border-red-500 pl-4 py-1.5 bg-slate-50/70 rounded-r-xl">
                        {form.excerpt}
                      </div>
                    )}

                    {/* Rendered Markdown Body */}
                    <div
                      className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 pt-2"
                      dangerouslySetInnerHTML={{
                        __html: (form.content || '')
                          .replace(/### (.*)/g, '<h3 class="text-base sm:text-lg font-bold text-slate-950 mt-5 mb-2">$1</h3>')
                          .replace(/#### (.*)/g, '<h4 class="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-1">$1</h4>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>')
                          .replace(/- (.*)/g, '<li class="ml-4 list-disc text-xs sm:text-sm text-slate-600 mb-1">$1</li>')
                          .replace(/> (.*)/g, '<blockquote class="border-l-4 border-blue-500 pl-3 py-1 italic bg-blue-50/50 rounded-r-lg my-2 text-slate-800">$1</blockquote>')
                          .replace(/\n\n/g, '<p class="my-2"></p>'),
                      }}
                    />

                    {/* Tags */}
                    {form.tags && form.tags.length > 0 && (
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 flex items-center space-x-1 mr-1">
                          <Tag className="w-3 h-3" />
                          <span>Tags:</span>
                        </span>
                        {form.tags.map(t => (
                          <span key={t} className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-lg">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-500 text-[11px] flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${form.published !== false ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>
              Status: <strong className="text-slate-800">{form.published !== false ? 'Public & Live' : 'Draft / Hidden'}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(p => ({ ...p, published: false }))
                setTimeout(() => {
                  const formEl = document.getElementById('blog-editor-form') as HTMLFormElement
                  if (formEl) formEl.requestSubmit()
                }, 50)
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold border border-slate-300 transition-colors cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              form="blog-editor-form"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isEditMode ? 'Save Article Changes' : 'Publish Article Live'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
export default BlogEditorModal
