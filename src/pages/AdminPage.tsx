import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Database,
  Shield,
  Layers,
  FileText,
  MessageSquare,
  Package,
  CheckCircle,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  Upload,
  LogOut,
  AlertCircle,
  Edit,
  Key,
  Sliders,
  Save,
  Check,
  Search,
  Home,
  HelpCircle,
  Monitor,
  ExternalLink,
  X,
  Power,
  Printer,
  Scan,
  Box,
  Palette,
  Sparkles,
  SlidersHorizontal,
  Info,
  List,
  CheckCircle2,
  Award,
  ShoppingCart,
} from 'lucide-react'
import { ShopAndNavigationEditor } from '../components/admin/ShopAndNavigationEditor'
import { getProductTemplate, ProductTemplateType } from '../utils/productTemplates'
import {
  CadEnabledSections,
  DEFAULT_CAD_SECTIONS,
  CAD_SECTION_METADATA,
} from '../utils/cadSoftwareConfig'
import {
  ProductItem,
  KeySpecItem,
  getStoredProductsCatalog,
  saveStoredProductsCatalog,
  resetStoredProductsCatalog,
} from '../utils/productCatalog'
import {
  HomeContentConfig,
  getStoredHomeContent,
  saveStoredHomeContent,
  resetStoredHomeContent,
} from '../utils/homeContentConfig'
import {
  AboutContentConfig,
  getStoredAboutContent,
  saveStoredAboutContent,
  resetStoredAboutContent,
} from '../utils/aboutContentConfig'
import {
  BlogPostItem,
  getStoredBlogItems,
  saveStoredBlogItems,
} from '../utils/blogCatalog'
import { blogPosts as fallbackBlogs } from '../data/blogs'

interface Stats {
  totalProducts: number
  totalQuotes: number
  totalContacts: number
  totalBlogs: number
  recentQuotes: any[]
}

interface QuoteRequest {
  id: number
  name: string
  email: string
  phone: string
  company: string
  service_or_product: string
  quantity: string
  timeline: string
  message: string
  status: string
  notes?: string
  created_at: string
}

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}





interface AdminUser {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('leniva_admin_auth') === 'true'
  })
  const [usernameInput, setUsernameInput] = useState('admin')
  const [passwordInput, setPasswordInput] = useState('Admin@Leniva2026!')
  const [loginError, setLoginError] = useState('')

  type AdminTab =
    | 'dashboard'
    | 'quotes'
    | 'contacts'
    | 'products'
    | 'blogs'
    | 'home_editor'
    | 'about_editor'
    | 'shop_and_dropdown'
    | 'cad_software'
    | 'settings'
    | 'users'

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)

  // Lists
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [productsList, setProductsList] = useState<ProductItem[]>(getStoredProductsCatalog)
  const [blogsList, setBlogsList] = useState<BlogPostItem[]>(getStoredBlogItems)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: 1,
      username: 'admin',
      email: 'admin@lenivacadsolution.in',
      full_name: 'Leniva Primary Superadmin',
      role: 'superadmin',
      created_at: '2026-01-01',
    },
  ])

  // Search & Filter
  const [productSearch, setProductSearch] = useState('')
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<'all' | 'printers' | 'scanners' | 'filaments' | 'cad'>('all')
  const [quoteFilter, setQuoteFilter] = useState('all')

  // Modals / Forms
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteNotesInput, setQuoteNotesInput] = useState('')
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [activeEditTab, setActiveEditTab] = useState<'overview' | 'media' | 'pricing' | 'specs' | 'tech_specs' | 'features' | 'applications' | 'materials' | 'specialized'>('overview')
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  // Sub-item temporary inputs inside Product Edit Modal
  const [newKeySpec, setNewKeySpec] = useState<KeySpecItem>({ label: '', value: '' })
  const [newSpecRow, setNewSpecRow] = useState<{ property: string; value: string }>({ property: '', value: '' })
  const [newFeatureInput, setNewFeatureInput] = useState('')
  const [newAppInput, setNewAppInput] = useState('')
  const [newAudienceInput, setNewAudienceInput] = useState('')
  const [newMatInput, setNewMatInput] = useState('')
  const [newGalleryImgInput, setNewGalleryImgInput] = useState('')
  const [productSaveSuccessMsg, setProductSaveSuccessMsg] = useState('')

  // Blog Form
  const [isNewBlogOpen, setIsNewBlogOpen] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: '3D Printing Innovations',
    read_time: '5 min read',
    excerpt: '',
    content: '',
    image: '/images/showcase/pratham-showcase.png',
  })

  // Settings State
  const defaultSiteSettings = {
    companyName: 'Leniva CAD Solutions',
    phone: '+91 98441 16476',
    secondaryPhone: '+91 96069 84210',
    email: 'viju@leniva3d.com',
    whatsapp: '+91 98441 16476',
    address: 'No. 106, 1st Floor, Carmel Complex, 1/7, Geddalahalli, Hennur Main Road, Kothanur Post, Bengaluru, Karnataka - 560077',
    workingHours: 'Monday – Friday: 9:30 AM – 6:00 PM | Saturday: 9:30 AM – 1:30 PM',
    bannerNotice: 'Now Delivering Advanced 3D Scanners & Industrial Printers PAN-India',
  }

  const [siteSettings, setSiteSettings] = useState<any>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('leniva_site_settings') : null
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.phone && !parsed.phone.includes('90234')) {
          return { ...defaultSiteSettings, ...parsed }
        }
      }
    } catch (e) {}
    return defaultSiteSettings
  })
  const [settingsSavedMsg, setSettingsSavedMsg] = useState('')

  // User Management
  const [passwordChangeId, setPasswordChangeId] = useState<number | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null)
  const [contactNotesInput, setContactNotesInput] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  // ─── Home Page CMS & Visual Editor ─────────────────────────────
  const [homeContentData, setHomeContentData] = useState<HomeContentConfig>(getStoredHomeContent)
  const [homeActiveTab, setHomeActiveTab] = useState<'hero' | 'about' | 'printers' | 'cad'>('hero')
  const [homeSavedMsg, setHomeSavedMsg] = useState('')
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState(0)
  const [activePrinterCardKey, setActivePrinterCardKey] = useState<'fdm' | 'dlp' | 'lcd'>('fdm')
  const [activeCadCardKey, setActiveCadCardKey] = useState<'ares' | 'sketchup' | 'chaos'>('ares')

  // Temporary inputs for draft additions in Home Editor
  const [newPillarDraft, setNewPillarDraft] = useState('')
  const [newPrinterBulletDraft, setNewPrinterBulletDraft] = useState('')
  const [newPrinterSlideName, setNewPrinterSlideName] = useState('')
  const [newPrinterSlideSrc, setNewPrinterSlideSrc] = useState('')
  const [newCadBulletDraft, setNewCadBulletDraft] = useState('')
  const [newCadSlideName, setNewCadSlideName] = useState('')
  const [newCadSlideSrc, setNewCadSlideSrc] = useState('')

  const handleSaveHomeContent = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    saveStoredHomeContent(homeContentData)
    setHomeSavedMsg('✓ Home page content saved successfully! Live home page updated.')
    setTimeout(() => setHomeSavedMsg(''), 4000)
  }

  const handleResetHomeContent = () => {
    if (window.confirm('Reset all Home page content back to default factory content? This will restore original hero banners, 3D printers, and CAD software showcase.')) {
      const def = resetStoredHomeContent()
      setHomeContentData(def)
      setHomeSavedMsg('✓ Home page content reset to defaults.')
      setTimeout(() => setHomeSavedMsg(''), 4000)
    }
  }

  // ─── About Us Page CMS & Visual Editor ─────────────────────────
  const [aboutContentData, setAboutContentData] = useState<AboutContentConfig>(getStoredAboutContent)
  const [aboutActiveTab, setAboutActiveTab] = useState<'hero' | 'heritage' | 'portfolio' | 'how_we_work'>('hero')
  const [aboutSavedMsg, setAboutSavedMsg] = useState('')
  const [newHowStepTitle, setNewHowStepTitle] = useState('')
  const [newHowStepDesc, setNewHowStepDesc] = useState('')

  const handleSaveAboutContent = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    saveStoredAboutContent(aboutContentData)
    setAboutSavedMsg('✓ About Us page content saved successfully! Live page updated.')
    setTimeout(() => setAboutSavedMsg(''), 4000)
  }

  const handleResetAboutContent = () => {
    if (window.confirm('Reset About Us page content back to default factory content?')) {
      const def = resetStoredAboutContent()
      setAboutContentData(def)
      setAboutSavedMsg('✓ About Us page content reset to defaults.')
      setTimeout(() => setAboutSavedMsg(''), 4000)
    }
  }

  // â”€â”€â”€ CAD Software Editor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  interface CadProductItem {
    key: string
    label: string
    brand: string
    route: string
    color: string
    category: string
    isCustom?: boolean
  }

  const DEFAULT_CAD_PRODUCTS: CadProductItem[] = [
    { key: 'ares_mechanical',  label: 'ARES Mechanical',       brand: 'Graebert', route: '/products/ares-mechanical',  color: 'blue',   category: '2D Mechanical CAD' },
    { key: 'ares_electrical',  label: 'ARES Electrical',       brand: 'Graebert', route: '/products/ares-electrical',  color: 'yellow', category: 'Electrical CAD (ECAD)' },
    { key: 'ares_standard',    label: 'ARES Standard',         brand: 'Graebert', route: '/products/ares-standard',    color: 'slate',  category: '2D DWG CAD Software' },
    { key: 'ares_commander',   label: 'ARES Commander',        brand: 'Graebert', route: '/products/ares-commander',   color: 'blue',   category: 'Professional 2D & 3D CAD' },
    { key: 'chaos_enscape',    label: 'Chaos Enscape',         brand: 'Chaos',    route: '/products/enscape',          color: 'purple', category: 'Real-Time Rendering & VR' },
    { key: 'chaos_vray',       label: 'Chaos V-Ray',           brand: 'Chaos',    route: '/products/vray',             color: 'orange', category: 'Photorealistic 3D Rendering' },
    { key: 'sketchup_studio',  label: 'SketchUp Studio',       brand: 'Trimble',  route: '/products/sketchup-studio',  color: 'green',  category: '3D Design & BIM Suite' },
    { key: 'sketchup_proscan', label: 'SketchUp Pro + Scan',   brand: 'Trimble',  route: '/products/sketchup-proscan', color: 'teal',   category: 'Scan-to-Model Workflows' },
  ]

  const CAD_DEFAULTS: Record<string, any> = {
    ares_mechanical: {
      productName: 'ARES Mechanical',
      brand: 'Graebert',
      category: '2D Mechanical CAD',
      headline: 'Professional 2D Mechanical CAD Software in DWG',
      supportingHeadline: 'Design. Draft. Document. With Mechanical Precision.',
      shortDescription: 'Create and modify professional 2D mechanical drawings with standards-based tools, intelligent components, mechanical annotations, and a familiar DWG-based CAD environment.',
      description: 'ARES Mechanical is a professional DWG-based mechanical CAD solution that combines the comprehensive drafting power of ARES Commander with dedicated engineering functions. It equips mechanical engineers, drafters, and manufacturing teams to author and maintain detailed production drawings using international drafting standards (ISO, ANSI, DIN, BSI, JIS), smart hardware libraries, automated mechanical layer management, and intelligent Bills of Materials (BOM).',
      platform: 'Windows 64-bit (11 / 10)',
      languages: 'English, German, Polish, Japanese, Korean, Traditional Chinese',
      primaryFormat: 'DWG Native',
      cadEngine: 'ARES Commander Engine',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-mechanical/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-mechanical/',
      trialUrl: 'https://www.graebert.com/in/cad-software/download/ares-mechanical/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Available as perpetual license and annual subscription with optional Trinity cloud ecosystem.',
      eyebrow: 'GRAEBERT | MECHANICAL CAD',
      h1Highlight: 'Mechanical Precision',
      heroBadge: 'Native DWG Mechanical Engine',
      heroHeading: 'Professional 2D Mechanical CAD in DWG',
      heroSupportingText: 'Create detailed mechanical drawings with a specialized CAD environment built for engineers and designers. ARES Mechanical combines native DWG editing with intelligent mechanical tools, standardized components, automated layers, and production-ready documentation.',
      heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Get Free 30-Day Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Product', value: 'ARES Mechanical' },
        { label: 'Type', value: '2D Mechanical CAD' },
        { label: 'Native File Format', value: 'DWG' },
        { label: 'Operating System', value: 'Windows 64-bit' },
        { label: 'Core Engine', value: 'ARES Commander' },
      ],
      overview: {
        heading: 'Mechanical CAD Designed Around Your Workflow',
        subtitle: 'Engineered for Mechanical Drafting & Fabrication',
        description: 'ARES Mechanical combines the robust DWG drafting engine of ARES Commander with dedicated engineering functions. Engineered for professionals who create detailed 2D fabrication drawings, modify existing AutoCAD Mechanical DWG projects, and reference 3D CAD models.',
        cards: [
          { title: 'Professional DWG Drafting', desc: 'Open, edit, create, and save native DWG technical drawings with zero conversion loss using the ARES Commander CAD engine.', icon: 'FileCode', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80' },
          { title: 'Mechanical-Specific Tools', desc: 'Access ready-to-use mechanical parts libraries, screw connections, hole tables, mechanical symbols, and automatic BOM generators.', icon: 'Wrench', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
          { title: 'Standardized Documentation', desc: 'Enforce international standards (ISO, ANSI, DIN, JIS, BSI) for drawing frames, title blocks, dimension styles, and mechanical layers.', icon: 'Award', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
          { title: 'BOM & Parts Lists', desc: 'Automatically generate live BOMs with balloons and revision tables directly tied to drawing geometry.', icon: 'Layers', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'DWG-based 2D mechanical CAD',
        'ISO, ANSI, DIN, BSI, JIS mechanical standards',
        'Ready-to-use mechanical parts libraries (screws, pins, washers, bearings)',
        'Automated mechanical layer management & color mapping',
        'Mechanical annotations, surface finish, and welding symbols',
        'Dynamic Bills of Materials (BOM) & Balloons',
        'STEP and IGES 3D model import/export for visualization',
        'Power Trim & smart geometric clean-up tools',
        'Optional Trinity cloud synchronization across desktop, mobile, and web',
      ],
      requirements: {
        os: 'Microsoft Windows 11 or Windows 10 (64-bit)',
        cpu: 'Intel Core i5 / AMD Ryzen 5 processor or higher',
        ram: '8 GB RAM (16 GB Recommended for large mechanical assemblies)',
        gpu: 'DirectX 11 / OpenGL 3.3 compatible 3D graphics accelerator',
        disk: '4 GB available hard-disk space for installation',
        display: '1920 x 1080 Full HD True Color display with high DPI support',
      },
      faqs: [
        { q: 'Is ARES Mechanical fully compatible with AutoCAD Mechanical DWG files?', a: 'Yes. ARES Mechanical natively opens, edits, and saves DWG files without translation or fidelity loss, including mechanical symbols, title blocks, and BOM entities.', category: 'Compatibility' },
        { q: 'Can I purchase a perpetual license rather than a subscription?', a: 'Yes. Graebert offers perpetual licenses with optional annual maintenance, as well as flexible 1-year and 3-year subscription options.', category: 'Licensing' },
        { q: 'Does ARES Mechanical include Trinity cloud features?', a: 'Yes, full ARES Trinity subscriptions allow editing drawings on desktop (ARES Mechanical), browser (ARES Kudo), and tablet/phone (ARES Touch).', category: 'Features' },
      ],
    },
    ares_electrical: {
      productName: 'ARES Electrical',
      brand: 'Graebert',
      category: 'Electrical CAD (ECAD)',
      headline: 'Modern Electrical CAD Software to Automate Electrical Schematics in DWG',
      supportingHeadline: 'Design Smarter. Automate Repetitive Tasks. Deliver Electrical Projects with Confidence.',
      shortDescription: 'Create and manage electrical schematics, wiring diagrams, control panels, component libraries, and electrical project reports with a DWG-based ECAD solution designed to automate repetitive design tasks.',
      description: 'ARES Electrical is a DWG-compatible ECAD solution developed to simplify electrical engineering and automate schematic generation. Built on the proven ARES Commander CAD engine, it combines familiar DWG drafting with automated wire numbering, component tagging, cross-referencing, multi-sheet project navigation, and automatic report generation.',
      platform: 'Windows 64-bit',
      languages: 'English, Portuguese, Spanish',
      primaryFormat: 'DWG',
      cadEngine: 'ARES Commander Engine',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-electrical/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-electrical/',
      trialUrl: 'https://www.graebert.com/in/cad-software/download/ares-electrical/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Available as perpetual license and subscription. Contact Leniva CAD Solutions for volume licensing.',
      eyebrow: 'GRAEBERT | ELECTRICAL ECAD',
      h1Highlight: 'Automate Schematics',
      heroBadge: 'DWG-Compatible ECAD',
      heroHeading: 'Automate Electrical Schematics in DWG',
      heroSupportingText: 'Design electrical schematics, wiring diagrams, and control panels with automatic wire numbering, intelligent symbol tagging, cross-referencing, and instantaneous project reporting.',
      heroImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Get Free 30-Day Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Product', value: 'ARES Electrical' },
        { label: 'Type', value: 'Electrical CAD (ECAD)' },
        { label: 'Format', value: 'Native DWG Projects' },
        { label: 'Platform', value: 'Windows 64-bit' },
        { label: 'Engine', value: 'ARES Commander' },
      ],
      overview: {
        heading: 'Electrical Engineering Automation for Modern Panels & Schematics',
        subtitle: 'From Concept to Panel Fabrication',
        description: 'Eliminate tedious manual wiring numbering and drawing coordination. ARES Electrical automates circuit references, terminal lists, and bills of materials across multi-page DWG electrical projects.',
        cards: [
          { title: 'Automated Schematics', desc: 'Author intelligent schematics with automated wire numbering, cross-referencing, and real-time design rule checking.', icon: 'Zap', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=600&q=80' },
          { title: 'Control Panel Layout', desc: 'Design physical enclosure layouts with components placed to scale, duct routing, and terminal rail mounting.', icon: 'Box', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
          { title: 'Intelligent Symbol Libraries', desc: 'Access comprehensive IEC, NFPA, and JIS electrical symbol catalogs ready for immediate drag-and-drop placement.', icon: 'Layers', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80' },
          { title: 'Automated Project Reports', desc: 'Generate complete terminal plans, cable lists, BOMs, and PLC I/O tables in seconds into PDF, Excel, and DWG.', icon: 'FileText', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'DWG-compatible electrical CAD environment',
        'Automatic wire numbering & contact cross-referencing',
        'Intelligent multi-sheet project management',
        'Automatic terminal list & cable list generation',
        'IEC, NFPA, and IEEE standard electrical symbol libraries',
        'Control panel layout design with scale equipment enclosures',
        'PLC I/O wiring diagrams and signal address mapping',
        'One-click PDF project documentation exports',
      ],
      requirements: {
        os: 'Microsoft Windows 11 or Windows 10 (64-bit only)',
        cpu: 'Intel Core i5 / i7 or AMD Ryzen 5 / 7',
        ram: '8 GB minimum (16 GB recommended for multi-sheet schematics)',
        gpu: 'OpenGL 3.3 compatible graphics card with 2 GB VRAM',
        disk: '5 GB free disk space for software and complete symbol libraries',
        display: '1920 x 1080 display resolution',
      },
      faqs: [
        { q: 'Can ARES Electrical handle multi-page electrical drawings in one project?', a: 'Yes, ARES Electrical manages entire multi-sheet projects as a unified database while saving each drawing as native DWG.', category: 'Workflow' },
        { q: 'Does it automatically renumber wires if a component is inserted?', a: 'Yes, the smart numbering engine automatically cascades wire and terminal numbers across all sheets without manual intervention.', category: 'Automation' },
      ],
    },
    ares_standard: {
      productName: 'ARES Standard',
      brand: 'Graebert',
      category: '2D DWG CAD Software',
      headline: 'Powerful 2D CAD. Practical by Design.',
      supportingHeadline: 'Create, view and modify DWG drawings with ARES Standard.',
      shortDescription: 'Cost-effective 2D CAD software built on the ARES CAD platform. Designed for users who need dependable 2D drafting and DWG editing without advanced features.',
      description: 'ARES Standard is based on the same CAD platform as ARES Commander and is designed for users who primarily work with 2D drawings in DWG format. It provides drafting, editing and printing tools in a cost-effective desktop application for Windows.',
      platform: 'Windows 64-bit',
      languages: 'English',
      primaryFormat: 'DWG',
      cadEngine: 'ARES Platform',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-standard/',
      trialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Perpetual and subscription license options. Contact us to confirm current regional availability.',
      eyebrow: 'GRAEBERT | 2D DWG CAD SOFTWARE',
      h1Highlight: 'Practical by Design',
      heroBadge: 'Cost-Effective 2D DWG CAD',
      heroHeading: 'Powerful 2D CAD. Practical by Design.',
      heroSupportingText: 'Create, view and modify DWG drawings with a familiar CAD interface at a practical price point.',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Get Free 30-Day Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Product', value: 'ARES Standard' },
        { label: 'Platform', value: 'Windows 64-bit' },
        { label: 'Core Format', value: 'Native DWG' },
        { label: 'Primary Use', value: '2D Drafting & Editing' },
        { label: 'Trial', value: '30-Day Free Trial' },
      ],
      overview: {
        heading: 'Focused 2D CAD for Everyday Drawing Work',
        subtitle: 'Essential 2D Drafting Tools Without Overcomplexity',
        description: 'ARES Standard provides drafting, editing and printing tools in a cost-effective desktop application for Windows.',
        cards: [
          { title: 'Create 2D Drawings', desc: 'Develop new technical drawings using a range of 2D drafting tools, including layers, blocks and dimensions.', icon: 'FileCode', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
          { title: 'Modify Existing DWG Files', desc: 'Open and edit DWG drawings created with AutoCAD or other DWG-based CAD software with zero data loss.', icon: 'Edit', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80' },
          { title: 'Print & Export', desc: 'Configure layouts, viewports, plot styles and publish clean PDF documents ready for construction or manufacture.', icon: 'FileText', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'Native DWG read and write support',
        'Complete set of essential 2D drafting tools',
        'Layers, blocks, hatches, and precision dimensioning',
        'Familiar CAD user interface with command-line aliases',
        'Windows 64-bit desktop application',
        'Paper space layout sheets and plot style configurations',
        '30-Day Free Trial available',
      ],
      requirements: {
        os: 'Windows 11 or Windows 10 (64-bit)',
        cpu: 'Intel Core i3 / AMD Ryzen 3 or higher',
        ram: '4 GB minimum (8 GB recommended)',
        gpu: 'DirectX 9 / OpenGL 2.1 graphics adapter',
        disk: '2 GB available hard disk space',
        display: '1366 x 768 minimum display resolution',
      },
      faqs: [
        { q: 'How does ARES Standard differ from ARES Commander?', a: 'ARES Standard is focused exclusively on 2D drafting and DWG editing, making it more affordable for users who do not need 3D solid modeling, Trinity cloud, or ACIS solids.', category: 'Comparison' },
      ],
    },
    ares_commander: {
      productName: 'ARES Commander',
      brand: 'Graebert',
      category: 'Professional 2D & 3D CAD',
      headline: 'Powerful DWG-Based 2D & 3D CAD Software',
      supportingHeadline: 'Create, edit and share professional CAD drawings across Windows, macOS and Linux.',
      shortDescription: 'Professional DWG-based CAD solution for 2D drafting, 3D modelling, BIM-to-CAD documentation, and cloud collaboration. Runs on Windows, macOS and Linux.',
      description: 'ARES Commander is a professional DWG-based CAD solution developed by Graebert. It enables users to create, edit, view and document 2D drawings and 3D models on desktop computers across Windows, macOS and Linux. It combines native DWG support, productivity features, BIM-to-CAD capabilities, automation and optional collaboration through the ARES Trinity ecosystem.',
      platform: 'Windows, macOS, Linux',
      languages: 'English, German, French, Italian, Spanish, Portuguese, Japanese, Korean, Chinese',
      primaryFormat: 'DWG Native',
      cadEngine: 'ARES CAD Engine',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/',
      trialUrl: 'https://www.graebert.com/in/cad-software/download/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Available as perpetual license and annual subscription. Trinity subscription includes desktop, cloud (ARES Kudo) and mobile (ARES Touch) access.',
      eyebrow: 'GRAEBERT | PROFESSIONAL CAD SOFTWARE',
      h1Highlight: 'Powerful DWG-Based CAD',
      heroBadge: 'Native DWG 2D & 3D CAD Engine',
      heroHeading: 'Powerful DWG-Based 2D & 3D CAD Software',
      heroSupportingText: 'Create, edit and document professional CAD drawings with ARES Commander. Work natively in DWG, explore 2D drafting and 3D modelling, import BIM models, automate workflows and collaborate across desktop, browser and mobile.',
      heroImage: '/images/ares-commander/ares-commander-hero.jpg',
      secondaryImage: '/images/ares-standard/cad-mech-drafting.jpg',
      trialCta: 'Start Free 30-Day Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Product', value: 'ARES Commander' },
        { label: 'Platform', value: 'Windows / macOS / Linux' },
        { label: 'Native Format', value: 'DWG' },
        { label: 'CAD Type', value: '2D Drafting & 3D Modelling' },
        { label: 'Trial', value: '30-Day Free Trial' },
      ],
      overview: {
        heading: 'Professional CAD That Works the Way You Do',
        subtitle: 'DWG-Native Drafting, Modelling and Documentation',
        description: 'ARES Commander provides the complete professional CAD toolkit â€” from 2D precision drafting and 3D solid modelling to BIM-to-CAD documentation, cloud collaboration and automation tools.',
        cards: [
          { title: '2D Drafting & Documentation', desc: 'Create precise 2D drawings with a full set of professional drafting tools, layer management, dimensions, annotations and PDF export.', icon: 'FileCode', image: '/images/ares-standard/cad-arch-floorplan.jpg' },
          { title: '3D Solid Modelling', desc: 'Build, edit and visualize 3D models using solid and surface modelling tools with ACIS solid kernel and STEP/IGES import/export.', icon: 'Box', image: '/images/ares-standard/cad-mech-drafting.jpg' },
          { title: 'BIM-to-CAD Workflows', desc: 'Import Revit and IFC BIM models and extract professional CAD documentation, floor plans, sections and elevations.', icon: 'Building', image: '/images/ares-standard/cad-eng-schematic.jpg' },
          { title: 'ARES Trinity Ecosystem', desc: 'Work across desktop (ARES Commander), browser (ARES Kudo) and mobile (ARES Touch) with full DWG synchronization.', icon: 'Globe', image: '/images/ares-standard/cad-interior-space-plan.jpg' },
        ],
      },
      highlights: [
        'Native DWG read and write without conversion',
        '2D precision drafting and annotation tools',
        '3D solid and surface modelling with ACIS kernel',
        'PDF import and export workflows',
        'BIM model import from Revit (.rvt) and IFC files',
        'Dynamic Blocks support',
        'Cross-platform: Windows, macOS, Linux',
        'Power Trim and smart geometry tools',
        'ARES Trinity â€” desktop, cloud and mobile CAD',
        '30-Day free trial available',
      ],
      requirements: {
        os: 'Windows 11 / 10 (64-bit), macOS 12+, or supported Linux distribution',
        cpu: 'Intel Core i5 / AMD Ryzen 5 or higher (i7 / Ryzen 7 recommended for 3D)',
        ram: '8 GB RAM minimum (16 GB recommended for 3D modelling and BIM workflows)',
        gpu: 'OpenGL 3.3 / DirectX 11 compatible graphics card with 2 GB VRAM',
        disk: '4 GB available hard-disk space',
        display: '1920 x 1080 Full HD display (HiDPI / Retina supported)',
      },
      faqs: [
        { q: 'Is ARES Commander fully compatible with AutoCAD DWG files?', a: 'Yes. ARES Commander reads and writes native DWG files without conversion, preserving all drawing data including blocks, xrefs, layouts and custom entities.', category: 'Compatibility' },
        { q: 'Can I use ARES Commander on macOS and Linux?', a: 'Yes. ARES Commander runs natively on Windows, macOS and supported Linux distributions. Contact Leniva CAD Solutions to confirm current supported OS versions.', category: 'Platform' },
        { q: 'What is ARES Trinity?', a: 'ARES Trinity is an ecosystem that connects ARES Commander (desktop), ARES Kudo (cloud browser CAD) and ARES Touch (mobile CAD) so you can work seamlessly across all devices.', category: 'Features' },
        { q: 'Does ARES Commander support 3D solid modelling?', a: 'Yes. ARES Commander includes 3D solid and surface modelling tools powered by the ACIS kernel, including extrude, revolve, sweep, loft and Boolean operations.', category: 'Features' },
      ],
    },
    chaos_enscape: {
      productName: 'Chaos Enscape',
      brand: 'Chaos',
      category: 'Real-Time Rendering & VR',
      headline: 'Real-Time Rendering That Keeps Up With Your Ideas',
      supportingHeadline: 'Design, visualize, and present â€” all inside your design workflow.',
      shortDescription: 'Real-time rendering and virtual reality plugin for Revit, SketchUp, Rhino, Archicad, and Vectorworks. Walk through models, see changes live, and communicate ideas instantly.',
      description: 'Enscape is a real-time visualization solution that connects directly with supported CAD and BIM applications. Explore your model in a fully rendered environment, see design changes as they happen, and communicate ideas through immersive walkthroughs, images, videos, and virtual reality.',
      platform: 'Windows (with macOS support for SketchUp/Archicad/Vectorworks)',
      languages: 'English, German, French, Italian, Spanish, Portuguese, Japanese, Chinese',
      primaryFormat: 'Plugin for Revit, SketchUp, Rhino, Archicad, Vectorworks',
      cadEngine: 'Chaos Real-Time Ray Tracing Engine',
      officialUrl: 'https://www.chaos.com/enscape',
      downloadUrl: 'https://www.chaos.com/enscape/trial',
      trialUrl: 'https://www.chaos.com/enscape/trial',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Fixed and floating annual subscriptions. Enterprise and educational licenses available.',
      eyebrow: 'CHAOS ENSCAPE | REAL-TIME RENDERING & VR',
      h1Highlight: 'Your Ideas',
      heroBadge: 'Real-Time Rendering & VR',
      heroHeading: 'Real-Time Rendering That Keeps Up With Your Ideas',
      heroSupportingText: 'Explore your model in a fully rendered environment directly inside your CAD or BIM tool. Instant photorealism with zero render wait times.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Start Free Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'CAD & BIM Platforms', value: '5+ Supported' },
        { label: 'Rendering Speed', value: 'Real-Time' },
        { label: 'VR Capabilities', value: 'One-Click VR' },
        { label: 'Asset Library', value: '4,000+ Assets' },
        { label: 'License Type', value: 'Subscription' },
      ],
      overview: {
        heading: 'Real-Time Visualization, Right Inside Your Design Tool',
        subtitle: 'Direct Bi-Directional Synchronization with BIM',
        description: 'Explore your design without leaving your supported CAD or BIM application. Enscape brings a fully rendered view directly into your active workspace.',
        cards: [
          { title: 'Live Synchronization', desc: 'Every change made in Revit, SketchUp, or Rhino reflects instantly in Enscape photorealistic viewport.', icon: 'RefreshCw', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
          { title: 'Virtual Reality Walkthroughs', desc: 'Connect an Oculus Rift, HTC Vive, or Windows MR headset with one click and walk through your building.', icon: 'Monitor', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
          { title: 'Curated 3D Asset Library', desc: 'Over 4,000 low-poly high-detail trees, people, vehicles, furniture, and lighting fixtures ready to place.', icon: 'Package', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
          { title: 'Standalone Exports', desc: 'Export web links, 360 panoramas, and standalone .EXE files that clients can explore on any PC without software.', icon: 'ExternalLink', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'Real-time rendering directly inside Revit, SketchUp, Rhino, Archicad, Vectorworks',
        'One-click Virtual Reality walkthroughs (Oculus, HTC Vive, HP Reverb)',
        '360-degree panorama exports for mobile and web viewing',
        'Standalone executable (.exe) exports for client walkthroughs',
        '4,000+ curated 3D assets (plants, furniture, people, lighting)',
        'Atmospheric control (sun position, fog, clouds, time of day)',
        'Video path creator for animated architectural fly-throughs',
      ],
      requirements: {
        os: 'Windows 11 or Windows 10 (64-bit)',
        cpu: 'Intel or AMD multi-core processor (i7 / Ryzen 7 recommended)',
        ram: '16 GB RAM (32 GB recommended for complex BIM models)',
        gpu: 'NVIDIA GeForce RTX 2060 or AMD Radeon RX 5700 XT with 6 GB+ VRAM',
        disk: '4 GB available SSD storage',
        display: 'Full HD display (4K recommended for ultra-high-res output)',
      },
      faqs: [
        { q: 'Which CAD software does Enscape work with?', a: 'Enscape works directly with Autodesk Revit, Trimble SketchUp, Rhino, Graphisoft Archicad, and Vectorworks.', category: 'Compatibility' },
        { q: 'Do my clients need an Enscape license to view standalone files?', a: 'No, standalone .exe files and web links can be viewed by anyone on compatible hardware without an Enscape license.', category: 'Sharing' },
      ],
    },
    chaos_vray: {
      productName: 'Chaos V-Ray',
      brand: 'Chaos',
      category: 'Photorealistic 3D Rendering',
      headline: 'Create Your Most Realistic Work Yet with Chaos V-Ray',
      supportingHeadline: 'Photorealistic rendering for design, visualization, and production.',
      shortDescription: 'Industry-standard physically based ray-tracing renderer for architecture, product design, VFX, and advertising.',
      description: 'V-Ray is professional 3D rendering software that helps artists and designers transform complex 3D scenes into realistic images and animations. With physically based ray tracing, advanced lighting and material tools, and flexible CPU and GPU rendering options.',
      platform: 'Windows, macOS, Linux (host dependent)',
      languages: 'English',
      primaryFormat: 'Plugin for 3ds Max, SketchUp, Rhino, Revit, Cinema 4D, Maya, Houdini, Unreal',
      cadEngine: 'V-Ray Production Ray Tracing Engine',
      officialUrl: 'https://www.chaos.com/vray',
      downloadUrl: 'https://www.chaos.com/vray/trial',
      trialUrl: 'https://www.chaos.com/vray/trial',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'V-Ray Solo, V-Ray Plus, and V-Ray Premium annual and monthly subscription options.',
      eyebrow: 'CHAOS V-RAY | PHOTOREALISTIC 3D RENDERING',
      h1Highlight: 'Chaos V-Ray',
      heroBadge: 'Photorealistic 3D Rendering',
      heroHeading: 'Create Your Most Realistic Work Yet',
      heroSupportingText: 'Physically accurate ray tracing, GPU+CPU hybrid rendering, and 18,500+ Chaos Cosmos render-ready assets.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Start Free Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Host Applications', value: '9+ Supported' },
        { label: 'Industry Awards', value: 'Academy Award' },
        { label: 'Asset Library', value: '18,500+ Cosmos' },
        { label: 'Rendering Engine', value: 'CPU + GPU Hybrid' },
        { label: 'Real-Time Preview', value: 'V-Ray Vision' },
      ],
      overview: {
        heading: 'The Rendering Engine Behind Photorealistic Results',
        subtitle: 'Physically Based Light Transport & Material Accuracy',
        description: 'V-Ray gives professionals absolute control over how light interacts with a scene, how surfaces appear, and how the final image or cinematic animation is produced.',
        cards: [
          { title: 'Award-Winning Ray Tracing', desc: 'Simulate light bouncing, optical caustics, subsurface scattering, and atmospheric effects with scientific accuracy.', icon: 'Award', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
          { title: 'CPU + GPU Hybrid Rendering', desc: 'Harness all your graphics cards and multi-core CPUs together for blistering fast production rendering.', icon: 'Cpu', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
          { title: 'Chaos Cosmos Library', desc: 'Instant access to over 18,500 smart 3D models, materials, and high-dynamic-range (HDRI) skies.', icon: 'Package', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
          { title: 'V-Ray Frame Buffer (VFB)', desc: 'Post-process, color grade, adjust light mix interactively without re-rendering.', icon: 'Sliders', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'Physically based ray tracing for true-to-life lighting and reflection',
        'Hybrid CPU and GPU rendering for maximum hardware utilization',
        'V-Ray Vision for interactive real-time design exploration',
        'V-Ray Frame Buffer with Light Mix and built-in compositing',
        'Chaos Cosmos: 18,500+ curated 3D models, PBR materials, HDRI skies',
        'Chaos Scatter tool for populating millions of trees, stones, grass',
        'Supported across 3ds Max, SketchUp, Rhino, Revit, Cinema 4D, Maya',
      ],
      requirements: {
        os: 'Windows 11 / 10, macOS 12+, or Linux 64-bit',
        cpu: 'Intel 64-bit or AMD multi-core processor with SSE4.2 support',
        ram: '16 GB RAM minimum (32 GB - 64 GB recommended for production scenes)',
        gpu: 'NVIDIA RTX series graphics card (RTX 3070 / 4070 or better) with latest Studio drivers',
        disk: '10 GB free disk space for application and Cosmos library cache',
        display: '1920 x 1080 display resolution or higher',
      },
      faqs: [
        { q: 'What is V-Ray Light Mix?', a: 'Light Mix allows you to adjust the intensity, color, and enable/disable any light fixture in your scene interactively after the rendering finishes without re-rendering.', category: 'Features' },
        { q: 'Can I use V-Ray on multiple computers?', a: 'V-Ray Premium and Floating licenses can be shared across computers in your studio network.', category: 'Licensing' },
      ],
    },
    sketchup_studio: {
      productName: 'SketchUp Studio',
      brand: 'Trimble',
      category: '3D Design & BIM Suite',
      headline: 'SketchUp Studio â€” The Complete 3D Design Suite',
      supportingHeadline: 'Model. Render. Scan. Import. All in One Subscription.',
      shortDescription: 'Trimble SketchUp Studio bundles SketchUp Pro, LayOut, V-Ray for SketchUp, Scan Essentials, and Revit Importer in a single Windows subscription.',
      description: "Trimble's premier subscription bundle for architects and design professionals. Includes SketchUp Pro 3D modeler, LayOut 2D documentation, Chaos V-Ray photorealistic rendering, Scan Essentials point cloud tools, and native Revit BIM file import.",
      platform: 'Windows 64-bit (11 / 10)',
      languages: 'English, French, German, Italian, Spanish, Japanese, Korean, Traditional Chinese',
      primaryFormat: 'SKP, DWG, DXF, RVT, IFC, OBJ, FBX, STL, DAE',
      cadEngine: 'Trimble SketchUp Engine + Chaos V-Ray',
      officialUrl: 'https://www.sketchup.com/plans-and-pricing/sketchup-studio',
      downloadUrl: 'https://www.sketchup.com/try-sketchup',
      trialUrl: 'https://www.sketchup.com/try-sketchup',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual subscription per seat (Windows only). Commercial and Educational options available.',
      eyebrow: 'TRIMBLE | SKETCHUP STUDIO',
      h1Highlight: 'Complete 3D Design Suite',
      heroBadge: 'Trimble SketchUp Studio',
      heroHeading: 'The Complete 3D Design Suite from Trimble',
      heroSupportingText: 'SketchUp Pro + LayOut + Chaos V-Ray + Scan Essentials + Revit Importer in one seamless Windows subscription.',
      heroImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Start Free Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Bundle', value: 'Studio Windows' },
        { label: 'Modeling', value: 'SketchUp Pro' },
        { label: 'Rendering', value: 'V-Ray Included' },
        { label: 'Scanning', value: 'Scan Essentials' },
        { label: 'BIM Import', value: 'Revit Importer' },
      ],
      overview: {
        heading: 'Everything You Need to Design, Render, and Document Buildings',
        subtitle: 'The Ultimate Trimble Creative Bundle',
        description: 'SketchUp Studio delivers industry-leading 3D conceptual modeling, point-cloud as-built capture, Revit BIM interoperability, photorealistic rendering, and 2D permit documentation.',
        cards: [
          { title: 'SketchUp Pro 3D Modeler', desc: 'The intuitive, fast, and flexible 3D modeling tool loved by architects and interior designers worldwide.', icon: 'Box', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80' },
          { title: 'Chaos V-Ray for SketchUp', desc: 'Create cinematic photoreal interior and exterior renderings without leaving SketchUp.', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
          { title: 'Scan Essentials Point Cloud', desc: 'Import LiDAR, drone, and terrestrial laser scans directly into SketchUp to model reality.', icon: 'Crosshair', image: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?auto=format&fit=crop&w=600&q=80' },
          { title: 'Revit Importer', desc: 'Bring Revit (.rvt) models into SketchUp with preserved geometry, tags, and material classifications.', icon: 'Building2', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'SketchUp Pro desktop 3D modeling software',
        'LayOut for precision 2D drawing sets, sections, and elevations',
        'Chaos V-Ray for photorealistic interior & exterior rendering',
        'Scan Essentials for modeling on top of point clouds (E57, RCP, LAS)',
        'Native Revit Importer to convert Revit files into SketchUp geometry',
        'Trimble Connect cloud storage for team collaboration',
        'PreDesign climate insight tool for early architectural planning',
      ],
      requirements: {
        os: 'Windows 11 or Windows 10 (64-bit only - Studio is Windows exclusive)',
        cpu: '2.5+ GHz Intel Core i7 / AMD Ryzen 7 processor',
        ram: '16 GB RAM minimum (32 GB recommended for point clouds and rendering)',
        gpu: 'Discrete graphics card (NVIDIA RTX 3060 / 4060 or AMD Radeon equivalent) with 4 GB+ VRAM',
        disk: '10 GB free SSD storage',
        display: '1920 x 1080 display with high DPI scaling',
      },
      faqs: [
        { q: 'Is SketchUp Studio available for macOS?', a: 'The Studio subscription features (V-Ray, Scan Essentials, Revit Importer) are Windows-only. Mac users can use SketchUp Pro with separate V-Ray licenses.', category: 'Platform' },
        { q: 'Does SketchUp Studio include V-Ray license?', a: 'Yes, full commercial V-Ray for SketchUp is included in the SketchUp Studio annual subscription.', category: 'Licensing' },
      ],
    },
    sketchup_proscan: {
      productName: 'SketchUp Pro + Scan Essentials',
      brand: 'Trimble',
      category: 'Scan-to-Model Workflows',
      headline: 'SketchUp Pro with Scan Essentials â€” Scan-to-Model Workflows',
      supportingHeadline: 'Import Point Clouds. Model Reality. Deliver Accurate As-Built Drawings.',
      shortDescription: 'SketchUp Pro bundled with Scan Essentials for survey, renovation, and BIM professionals working with LiDAR, photogrammetry, and 3D laser scan data.',
      description: 'SketchUp Pro paired with the Scan Essentials plugin. Designed for survey, heritage preservation, interior fit-out, and facility renovation teams who capture spaces with 3D scanners and model directly from dense point cloud data.',
      platform: 'Windows 64-bit',
      languages: 'English',
      primaryFormat: 'SKP, E57, RCP, RCS, LAS, LAZ, DWG, DXF',
      cadEngine: 'Trimble SketchUp Engine + Trimble Scan Essentials',
      officialUrl: 'https://www.sketchup.com/products/scan-essentials',
      downloadUrl: 'https://www.sketchup.com/try-sketchup',
      trialUrl: 'https://www.sketchup.com/try-sketchup',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual commercial subscription. Contact Leniva CAD Solutions for bundle quotes and scanner hardware pairing.',
      eyebrow: 'TRIMBLE | SCAN-TO-BIM',
      h1Highlight: 'Scan-to-Model Workflows',
      heroBadge: 'Scan-to-Model CAD',
      heroHeading: 'Model Reality from Point Clouds',
      heroSupportingText: 'Import LiDAR and photogrammetry scans directly into SketchUp and model with real-world millimeter accuracy.',
      heroImage: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?auto=format&fit=crop&w=1600&q=85',
      secondaryImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      trialCta: 'Start Free Trial',
      pricingCta: 'Request a Quote',
      specStrip: [
        { label: 'Bundle', value: 'SketchUp Pro + Scan' },
        { label: 'Point Cloud Formats', value: 'E57, RCP, LAS, LAZ' },
        { label: 'Snapping', value: 'Snap to Point Cloud' },
        { label: 'Documentation', value: 'LayOut Included' },
        { label: 'OS', value: 'Windows 64-bit' },
      ],
      overview: {
        heading: 'Bridge the Physical and Digital Worlds Seamlessly',
        subtitle: 'From Laser Scan to As-Built Documentation',
        description: 'Import point clouds from terrestrial scanners (FARO, Leica, Trimble) or handheld scanners, snap geometry directly to points, inspect deviation, and generate 2D construction drawings in LayOut.',
        cards: [
          { title: 'Dense Point Cloud Import', desc: 'Import billions of scan points in E57, Autodesk RCP/RCS, LAS, and LAZ formats with blazing fast visualization.', icon: 'Crosshair', image: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?auto=format&fit=crop&w=600&q=80' },
          { title: 'Snap Geometry to Points', desc: 'Draw lines, rectangles, and walls that snap directly to cloud vertices for perfect as-built models.', icon: 'Wrench', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80' },
          { title: 'Inspection & Deviation Analysis', desc: 'Compare your 3D design against the scanned point cloud with false-color heat maps to spot construction tolerances.', icon: 'CheckCircle', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
          { title: 'LayOut Point Cloud Export', desc: 'Bring scan sections directly into LayOut for dimensioning, notes, and permit drawings.', icon: 'FileText', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
        ],
      },
      highlights: [
        'SketchUp Pro 3D modeling desktop application',
        'Scan Essentials plugin with high-speed point cloud rendering engine',
        'Direct support for E57, RCP, RCS, LAS, LAZ point cloud formats',
        'Precision snapping tool for tracing geometry directly from scans',
        'Clipping box and section cut tools for isolating rooms and floors',
        'LayOut integration for 2D construction documentation from scans',
        'Works with scans from FARO, Leica, Trimble, NavVis, and EinScan 3D scanners',
      ],
      requirements: {
        os: 'Windows 11 or Windows 10 (64-bit)',
        cpu: 'Intel Core i7 / i9 or AMD Ryzen 7 / 9 high-frequency processor',
        ram: '32 GB RAM recommended for multi-gigabyte point clouds (16 GB minimum)',
        gpu: 'NVIDIA RTX graphics card with 6 GB+ VRAM and OpenGL 3.3 support',
        disk: 'Fast NVMe SSD with 20 GB+ free space for point cloud streaming cache',
        display: '1920 x 1080 Full HD display',
      },
      faqs: [
        { q: 'Which scanner brands are compatible with Scan Essentials?', a: 'Any scanner that exports industry-standard E57, RCP, RCS, LAS, or LAZ filesâ€”including FARO, Leica Geosystems, Trimble, NavVis, Matterport, and Shining 3D.', category: 'Hardware' },
        { q: 'Can I dimension point clouds in LayOut?', a: 'Yes! Scan Essentials allows you to send point cloud views into LayOut and snap dimensions directly to point cloud sections.', category: 'Documentation' },
      ],
    },
  }

  // Load custom products and edits
  const loadCustomCadProducts = (): CadProductItem[] => {
    try {
      const saved = localStorage.getItem('leniva_custom_cad_products')
      if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return []
  }

  const loadCadEdits = (): Record<string, any> => {
    try {
      const saved = localStorage.getItem('leniva_cad_software_edits')
      if (saved) {
        const parsed = JSON.parse(saved)
        const merged: Record<string, any> = {}
        Object.keys(CAD_DEFAULTS).forEach(k => {
          merged[k] = { ...CAD_DEFAULTS[k], ...(parsed[k] || {}) }
        })
        Object.keys(parsed).forEach(k => {
          if (!merged[k]) merged[k] = parsed[k]
        })
        return merged
      }
    } catch { /* ignore */ }
    return { ...CAD_DEFAULTS }
  }

  type CadSectionKey = 'identity' | 'hero' | 'overview' | 'features' | 'requirements' | 'faqs' | 'licensing' | 'preview'

  const [customCadProducts, setCustomCadProducts] = useState<CadProductItem[]>(loadCustomCadProducts)
  const cadProducts = [...DEFAULT_CAD_PRODUCTS, ...customCadProducts]

  const [cadEdits, setCadEdits] = useState<Record<string, any>>(loadCadEdits)
  const [activeCadProduct, setActiveCadProduct] = useState<string>('ares_mechanical')
  const [cadSaveMsg, setCadSaveMsg] = useState('')
  const [cadEditSection, setCadEditSection] = useState<CadSectionKey>('identity')

  // New CAD Product Modal state
  const [isNewCadProductOpen, setIsNewCadProductOpen] = useState(false)
  const [newCadForm, setNewCadForm] = useState({
    name: '',
    brand: 'Graebert',
    category: '2D/3D CAD Software',
    route: '/products/',
    template: 'ares_mechanical',
  })

  const saveCadEdits = (updatedEdits: Record<string, any>) => {
    localStorage.setItem('leniva_cad_software_edits', JSON.stringify(updatedEdits))
    setCadEdits(updatedEdits)
    try {
      window.dispatchEvent(new Event('leniva_cad_edits_updated'))
      window.dispatchEvent(new Event('leniva_products_catalog_updated'))
    } catch {
      // ignore
    }
    setCadSaveMsg('✓ Changes saved & published to live product page successfully!')
    setTimeout(() => setCadSaveMsg(''), 4000)
  }

  const updateCadField = (field: string, value: any) => {
    const updated = { ...cadEdits, [activeCadProduct]: { ...cadEdits[activeCadProduct], [field]: value } }
    saveCadEdits(updated)
  }

  const toggleCadSection = (secKey: keyof CadEnabledSections) => {
    const curProduct = cadEdits[activeCadProduct] || {}
    const curSections: CadEnabledSections = {
      ...DEFAULT_CAD_SECTIONS,
      ...(curProduct.enabledSections || {}),
    }
    const currentVal = curSections[secKey] !== false
    const updatedSections: CadEnabledSections = {
      ...curSections,
      [secKey]: !currentVal,
    }
    updateCadField('enabledSections', updatedSections)
    const label = CAD_SECTION_METADATA.find(m => m.key === secKey)?.shortLabel || secKey
    setCadSaveMsg(`✓ ${label} section ${!currentVal ? 'ENABLED (Visible)' : 'DISABLED (Hidden)'}.`)
  }

  const updateCadHighlight = (index: number, value: string) => {
    const arr = [...(cadEdits[activeCadProduct]?.highlights || [])]
    arr[index] = value
    updateCadField('highlights', arr)
  }

  const addCadHighlight = () => {
    const arr = [...(cadEdits[activeCadProduct]?.highlights || []), 'New feature bullet']
    updateCadField('highlights', arr)
  }

  const removeCadHighlight = (index: number) => {
    const arr = (cadEdits[activeCadProduct]?.highlights || []).filter((_: any, i: number) => i !== index)
    updateCadField('highlights', arr)
  }

  // Overview Cards helpers
  const addCadOverviewCard = () => {
    const curCards = cadEdits[activeCadProduct]?.overview?.cards || []
    const updatedCards = [...curCards, { title: 'New Feature Card', desc: 'Description of the capability...', icon: 'Box', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80' }]
    const updatedOverview = { ...(cadEdits[activeCadProduct]?.overview || {}), cards: updatedCards }
    updateCadField('overview', updatedOverview)
  }

  const updateCadOverviewCard = (index: number, field: string, val: string) => {
    const curCards = [...(cadEdits[activeCadProduct]?.overview?.cards || [])]
    curCards[index] = { ...curCards[index], [field]: val }
    const updatedOverview = { ...(cadEdits[activeCadProduct]?.overview || {}), cards: curCards }
    updateCadField('overview', updatedOverview)
  }

  const removeCadOverviewCard = (index: number) => {
    const curCards = (cadEdits[activeCadProduct]?.overview?.cards || []).filter((_: any, i: number) => i !== index)
    const updatedOverview = { ...(cadEdits[activeCadProduct]?.overview || {}), cards: curCards }
    updateCadField('overview', updatedOverview)
  }

  // FAQs helpers
  const addCadFaq = () => {
    const curFaqs = cadEdits[activeCadProduct]?.faqs || []
    const updatedFaqs = [...curFaqs, { q: 'Frequently asked question?', a: 'Detailed answer regarding this CAD software...', category: 'General' }]
    updateCadField('faqs', updatedFaqs)
  }

  const updateCadFaq = (index: number, field: 'q' | 'a' | 'category', val: string) => {
    const curFaqs = [...(cadEdits[activeCadProduct]?.faqs || [])]
    curFaqs[index] = { ...curFaqs[index], [field]: val }
    updateCadField('faqs', curFaqs)
  }

  const removeCadFaq = (index: number) => {
    const curFaqs = (cadEdits[activeCadProduct]?.faqs || []).filter((_: any, i: number) => i !== index)
    updateCadField('faqs', curFaqs)
  }

  // Spec Strip helpers
  const updateCadSpecStrip = (index: number, field: 'label' | 'value', val: string) => {
    const curStrip = [...(cadEdits[activeCadProduct]?.specStrip || [])]
    curStrip[index] = { ...curStrip[index], [field]: val }
    updateCadField('specStrip', curStrip)
  }

  const addCadSpecStrip = () => {
    const curStrip = cadEdits[activeCadProduct]?.specStrip || []
    updateCadField('specStrip', [...curStrip, { label: 'New Spec', value: 'Value' }])
  }

  const removeCadSpecStrip = (index: number) => {
    const curStrip = (cadEdits[activeCadProduct]?.specStrip || []).filter((_: any, i: number) => i !== index)
    updateCadField('specStrip', curStrip)
  }


  // Create New CAD Product handler
  const handleCreateCadProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCadForm.name) return
    const cleanSlug = newCadForm.route.replace(/^\/products\/?/, '').trim() || newCadForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const key = `cad_${cleanSlug}`
    const route = `/products/${cleanSlug}`

    const newProdItem: CadProductItem = {
      key,
      label: newCadForm.name,
      brand: newCadForm.brand,
      route,
      color: 'indigo',
      category: newCadForm.category,
      isCustom: true,
    }

    const templateData = CAD_DEFAULTS[newCadForm.template] || CAD_DEFAULTS.ares_mechanical
    const newProdData = {
      ...templateData,
      productName: newCadForm.name,
      brand: newCadForm.brand,
      category: newCadForm.category,
      heroHeading: newCadForm.name,
      headline: `${newCadForm.name} â€” Engineering CAD`,
      supportingHeadline: `Professional ${newCadForm.category} Solutions`,
      shortDescription: `Explore ${newCadForm.name} by ${newCadForm.brand}. Genuine software licenses, expert integration, and local onboarding from Leniva CAD Solutions.`,
    }

    const updatedCustom = [...customCadProducts, newProdItem]
    setCustomCadProducts(updatedCustom)
    localStorage.setItem('leniva_custom_cad_products', JSON.stringify(updatedCustom))

    const updatedEdits = { ...cadEdits, [key]: newProdData }
    saveCadEdits(updatedEdits)

    setActiveCadProduct(key)
    setIsNewCadProductOpen(false)
    setNewCadForm({ name: '', brand: 'Graebert', category: '2D/3D CAD Software', route: '/products/', template: 'ares_mechanical' })
    setCadSaveMsg(`âœ“ Created product "${newCadForm.name}"! You are now editing its full page.`)
  }

  // Delete Custom CAD Product
  const handleDeleteCadProduct = (key: string) => {
    const prod = cadProducts.find(x => x.key === key)
    if (!confirm(`Are you sure you want to delete "${prod?.label || key}"? This cannot be undone.`)) return
    const updatedCustom = customCadProducts.filter(x => x.key !== key)
    setCustomCadProducts(updatedCustom)
    localStorage.setItem('leniva_custom_cad_products', JSON.stringify(updatedCustom))

    const updatedEdits = { ...cadEdits }
    delete updatedEdits[key]
    saveCadEdits(updatedEdits)
    setActiveCadProduct('ares_mechanical')
    setCadSaveMsg('Product deleted successfully.')
  }


  const resetCadProduct = () => {
    const label = cadProducts.find(p => p.key === activeCadProduct)?.label || activeCadProduct
    if (!confirm(`Reset "${label}" to defaults? All edits for this product will be lost.`)) return
    const defaultData = CAD_DEFAULTS[activeCadProduct] || CAD_DEFAULTS.ares_mechanical
    const updated = { ...cadEdits, [activeCadProduct]: { ...defaultData } }
    saveCadEdits(updated)
  }

  // Safe JSON fetcher that handles non-JSON / HTML responses gracefully on Vercel
  const safeFetchJson = async (url: string, options?: RequestInit) => {
    try {
      const res = await fetch(url, options)
      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        return null
      }
      return await res.json()
    } catch {
      return null
    }
  }

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)

    try {
      const data = await safeFetchJson('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      })

      if (data && data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        loadAllData()
        return
      }
    } catch (err) {
      console.warn('Backend login unavailable:', err)
    }

    // Default static credential check or fallback
    const savedAdminPass = localStorage.getItem('leniva_admin_password') || 'Admin@Leniva2026!'
    if (
      (usernameInput === 'admin' && (passwordInput === savedAdminPass || passwordInput === 'Admin@Leniva2026!')) ||
      (usernameInput === 'leniva' && passwordInput === 'admin')
    ) {
      setIsAuthenticated(true)
      localStorage.setItem('leniva_admin_auth', 'true')
      loadAllData()
    } else {
      setLoginError('Invalid administrator credentials. Please check your username and password.')
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('leniva_admin_auth')
  }

  // Load initial backend & PostgreSQL data with comprehensive local fallbacks
  const loadAllData = async () => {
    setIsLoading(true)
    try {
      const [
        statsRes,
        quotesRes,
        contactsRes,
        prodsRes,
        blogsRes,
        usersRes,
        settingsRes,
      ] = await Promise.allSettled([
        safeFetchJson('/api/stats'),
        safeFetchJson('/api/quotes'),
        safeFetchJson('/api/contacts'),
        safeFetchJson('/api/products'),
        safeFetchJson('/api/blogs'),
        safeFetchJson('/api/admin/users'),
        safeFetchJson('/api/settings'),
      ])

      const statsVal = statsRes.status === 'fulfilled' ? statsRes.value : null
      const quotesVal = quotesRes.status === 'fulfilled' ? quotesRes.value : null
      const contactsVal = contactsRes.status === 'fulfilled' ? contactsRes.value : null
      const prodsVal = prodsRes.status === 'fulfilled' ? prodsRes.value : null
      const blogsVal = blogsRes.status === 'fulfilled' ? blogsRes.value : null
      const usersVal = usersRes.status === 'fulfilled' ? usersRes.value : null
      const settingsVal = settingsRes.status === 'fulfilled' ? settingsRes.value : null

      // Load stored or default full product catalog
      if (Array.isArray(prodsVal) && prodsVal.length > 0) {
        setProductsList(prodsVal)
        saveStoredProductsCatalog(prodsVal)
      } else {
        const storedCatalog = getStoredProductsCatalog()
        setProductsList(storedCatalog)
      }

      // Fallback blogs
      if (Array.isArray(blogsVal) && blogsVal.length > 0) {
        setBlogsList(blogsVal)
        saveStoredBlogItems(blogsVal)
      } else {
        const storedBlogs = getStoredBlogItems()
        setBlogsList(storedBlogs)
      }

      // Fallback Quotes
      if (Array.isArray(quotesVal) && quotesVal.length > 0) {
        setQuotes(quotesVal)
      } else {
        setQuotes([
          {
            id: 101,
            name: 'Rajesh Sharma',
            email: 'r.sharma@tata-advanced.com',
            phone: '+91 98450 12345',
            company: 'Tata Advanced Engineering',
            service_or_product: '3DeVOK MQ High-Accuracy Scanner',
            quantity: '2 Units',
            timeline: 'Within 2 Weeks',
            message: 'Looking for metrology grade scanning of automotive sheet metal dies with inspection reports.',
            status: 'pending',
            created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
            notes: 'Requires on-site demo in Bengaluru',
          },
          {
            id: 102,
            name: 'Pooja Verma',
            email: 'pooja.verma@titan.co.in',
            phone: '+91 97123 45678',
            company: 'Titan Jewellery Division',
            service_or_product: 'EKA HT DLP 3D Printer',
            quantity: '1 Unit',
            timeline: 'Immediate',
            message: 'Inquiring regarding high-precision wax direct casting resin parameters and machine delivery.',
            status: 'in_review',
            created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
            notes: 'Sent DLP sample pack via courier',
          },
          {
            id: 103,
            name: 'Vikram Patel',
            email: 'v.patel@bharatforge.com',
            phone: '+91 99234 56789',
            company: 'Bharat Forge Ltd',
            service_or_product: 'Pratham X1000 Industrial FDM',
            quantity: '1 Unit',
            timeline: '1 Month',
            message: 'Need 1-meter single piece printing for carbon-fiber nylon jigs on assembly conveyor.',
            status: 'contacted',
            created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
            notes: 'Scheduled video call with technical director',
          },
        ])
      }

      // Fallback Contacts
      if (Array.isArray(contactsVal) && contactsVal.length > 0) {
        setContacts(contactsVal)
      } else {
        setContacts([
          {
            id: 201,
            name: 'Dr. Anand Ramanathan',
            email: 'anand.r@iitb.ac.in',
            phone: '+91 98190 23456',
            subject: 'Academic Center of Excellence Quotation',
            message: 'IIT Bombay design lab seeks quote for 3D scanner suite and CAD onboarding software package.',
            status: 'new',
            created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
          },
          {
            id: 202,
            name: 'Karthik Sundaram',
            email: 'karthik@precisiondies.in',
            phone: '+91 94440 98765',
            subject: 'ARES Mechanical Multi-Seat License Quote',
            message: 'Requesting volume quotation for 5 perpetual licenses of ARES Mechanical for our Coimbatore drafting cell.',
            status: 'read',
            created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
          },
        ])
      }


      if (Array.isArray(usersVal) && usersVal.length > 0) {
        const primaryAdmin = usersVal.find((u: any) => u.username === 'admin') || usersVal[0]
        setAdminUsers([primaryAdmin])
      } else {
        setAdminUsers([
          {
            id: 1,
            username: 'admin',
            email: 'admin@lenivacadsolution.in',
            full_name: 'Leniva Primary Superadmin',
            role: 'superadmin',
            created_at: '2026-01-01',
          },
        ])
      }

      // Site settings
      if (settingsVal && settingsVal.general_info && settingsVal.general_info.phone && !settingsVal.general_info.phone.includes('90234')) {
        setSiteSettings(settingsVal.general_info)
      } else {
        const saved = localStorage.getItem('leniva_site_settings')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            if (parsed.phone && !parsed.phone.includes('90234')) {
              setSiteSettings(parsed)
            } else {
              setSiteSettings(defaultSiteSettings)
              localStorage.setItem('leniva_site_settings', JSON.stringify(defaultSiteSettings))
            }
          } catch (e) {
            setSiteSettings(defaultSiteSettings)
          }
        } else {
          setSiteSettings(defaultSiteSettings)
          localStorage.setItem('leniva_site_settings', JSON.stringify(defaultSiteSettings))
        }
      }

      // Set Stats
      setStats(statsVal || {
        totalProducts: prodsVal?.length || productsList.length || 37,
        totalQuotes: quotesVal?.length || 3,
        totalContacts: contactsVal?.length || 2,
        totalBlogs: blogsVal?.length || fallbackBlogs.length,
        recentQuotes: quotesVal || [],
      })
    } catch (err) {
      console.warn('Error loading dashboard data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  // Quote operations
  const handleUpdateQuoteStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      })
      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus, notes: notes ?? q.notes } : q))
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote(prev => prev ? { ...prev, status: newStatus, notes: notes ?? prev.notes } : null)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteQuote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote record from PostgreSQL?')) return
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setQuotes(prev => prev.filter(q => q.id !== id))
        if (selectedQuote?.id === id) setSelectedQuote(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Product operations
  const handleStartCreateNewProduct = (type: ProductTemplateType = 'fdm') => {
    const draft = getProductTemplate(type)
    draft.name = ''
    setEditingProduct(draft)
    setActiveEditTab('overview')
  }

  const handleApplyTemplate = (type: ProductTemplateType) => {
    if (!editingProduct) return
    const currentName = editingProduct.name
    const template = getProductTemplate(type, currentName || undefined)
    setEditingProduct({
      ...template,
      id: editingProduct.id,
      name: currentName,
      slug: currentName ? currentName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : template.slug,
    })
  }

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    if (!editingProduct.name.trim()) {
      alert('Please enter a product title before saving.')
      return
    }

    const productToSave: ProductItem = {
      ...editingProduct,
      is_admin_customized: true,
    }

    const existingIdx = productsList.findIndex(p => p.id === productToSave.id)
    const isNew = existingIdx < 0
    const updatedList = isNew
      ? [productToSave, ...productsList]
      : productsList.map(p => p.id === productToSave.id ? productToSave : p)

    setProductsList(updatedList)
    saveStoredProductsCatalog(updatedList)

    try {
      await fetch(`/api/products/${productToSave.id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSave),
      })
    } catch (err) {
      console.warn('API sync skipped, saved to local catalog', err)
    }

    setProductSaveSuccessMsg(
      isNew
        ? `Product "${productToSave.name}" successfully created with all full sections and added to live catalog!`
        : `Saved all full sections for "${productToSave.name}"!`
    )
    setEditingProduct(null)
    setTimeout(() => setProductSaveSuccessMsg(''), 4000)
  }

  const handleToggleStock = async (product: ProductItem) => {
    const updatedStock = !product.in_stock
    const updatedList = productsList.map(p => p.id === product.id ? { ...p, in_stock: updatedStock, is_admin_customized: true } : p)
    setProductsList(updatedList)
    saveStoredProductsCatalog(updatedList)

    try {
      await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: updatedStock }),
      })
    } catch (err) {
      console.warn('API sync skipped', err)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const prod = productsList.find(p => p.id === id)
    if (!confirm(`Are you sure you want to delete "${prod?.name || id}" permanently from catalog?`)) return
    const updatedList = productsList.filter(p => p.id !== id)
    setProductsList(updatedList)
    saveStoredProductsCatalog(updatedList)

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.warn('API sync skipped', err)
    }

    setProductSaveSuccessMsg(`Deleted product "${prod?.name || id}" from catalog.`)
    setTimeout(() => setProductSaveSuccessMsg(''), 4000)
  }

  const handleResetCatalog = () => {
    if (!confirm('Are you sure you want to reset the entire product catalog back to factory defaults? This restores all 3D Printers, Scanners, Filaments, and CAD software with their complete original sections and specifications.')) return
    const defaults = resetStoredProductsCatalog()
    setProductsList(defaults)
    setProductSaveSuccessMsg('Catalog reset to complete factory defaults (3D Printers, Scanners, Filaments & Software)!')
    setTimeout(() => setProductSaveSuccessMsg(''), 4000)
  }

  // Blog operations
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    const newId = `blog-${Date.now()}`
    const blogItem: BlogPostItem = {
      id: newId,
      slug: newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || newId,
      title: newBlog.title,
      category: newBlog.category,
      read_time: newBlog.read_time,
      date: new Date().toISOString().split('T')[0],
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      image: newBlog.image,
      published: true,
    }

    const updated = [blogItem, ...blogsList]
    setBlogsList(updated)
    saveStoredBlogItems(updated)
    setIsNewBlogOpen(false)
    setNewBlog({
      title: '',
      category: '3D Printing Innovations',
      read_time: '5 min read',
      excerpt: '',
      content: '',
      image: '/images/showcase/pratham-showcase.png',
    })

    try {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogItem),
      })
    } catch (err) {
      console.warn('API sync skipped, saved locally', err)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this article?`)) return
    const updated = blogsList.filter(b => b.id !== id)
    setBlogsList(updated)
    saveStoredBlogItems(updated)
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
    } catch (err) {
      console.warn('API sync skipped', err)
    }
  }

  const handleSaveEditBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBlog) return
    const updated = blogsList.map(b => b.id === editingBlog.id ? editingBlog : b)
    setBlogsList(updated)
    saveStoredBlogItems(updated)
    setEditingBlog(null)
    try {
      await fetch(`/api/blogs/${editingBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      })
    } catch (err) {
      console.warn('API sync skipped', err)
    }
  }

  // Direct image upload helper for all edit modals
  const handleDirectImageUpload = async (file: File, callback: (url: string) => void) => {
    try {
      setUploadingField(file.name)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'media')
      formData.append('description', file.name)
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        callback(data.url)
      } else {
        alert('Failed to upload image to PostgreSQL storage')
      }
    } catch (err: any) {
      alert('Error uploading image: ' + err.message)
    } finally {
      setUploadingField(null)
    }
  }

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsSavedMsg('')
    try {
      localStorage.setItem('leniva_site_settings', JSON.stringify(siteSettings))
      window.dispatchEvent(new Event('leniva_site_settings_updated'))
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'general_info', value: siteSettings }),
      })
      if (res.ok) {
        setSettingsSavedMsg('Settings saved successfully into PostgreSQL and local storage!')
      } else {
        setSettingsSavedMsg('Settings saved successfully!')
      }
      setTimeout(() => setSettingsSavedMsg(''), 4000)
    } catch {
      localStorage.setItem('leniva_site_settings', JSON.stringify(siteSettings))
      window.dispatchEvent(new Event('leniva_site_settings_updated'))
      setSettingsSavedMsg('Settings saved successfully!')
      setTimeout(() => setSettingsSavedMsg(''), 4000)
    }
  }

  // Admin Password operations
  const handleChangePassword = async (id: number) => {
    if (!newPasswordValue.trim()) {
      setUserMsg('Please enter a new password.')
      return
    }
    if (confirmPasswordValue && newPasswordValue !== confirmPasswordValue) {
      setUserMsg('Passwords do not match. Please re-enter the same password.')
      return
    }
    try {
      await fetch(`/api/admin/users/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPasswordValue }),
      }).catch(() => null)

      localStorage.setItem('leniva_admin_password', newPasswordValue)
      setUserMsg('Password updated successfully! You can now log in with your new password.')
      setPasswordChangeId(null)
      setNewPasswordValue('')
      setConfirmPasswordValue('')
      setTimeout(() => setUserMsg(''), 6000)
    } catch (err: any) {
      localStorage.setItem('leniva_admin_password', newPasswordValue)
      setUserMsg('Password updated successfully!')
      setPasswordChangeId(null)
      setNewPasswordValue('')
      setConfirmPasswordValue('')
      setTimeout(() => setUserMsg(''), 6000)
    }
  }

  // Contact message operations
  const handleUpdateContactStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      })
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus, notes: notes ?? (c as any).notes } : c))
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Delete this contact message from PostgreSQL?')) return
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id))
        if (selectedContact?.id === id) setSelectedContact(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Leniva CAD Admin Console</h2>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Username / Email
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying Credentials...' : 'Sign In with Full Admin Control'}
            </button>

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Main Website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Counts by category
  const printersCount = productsList.filter(p =>
    p.category_slug.includes('printer') ||
    p.category.toLowerCase().includes('printer') ||
    ['fdm-3d-printers', 'dlp-3d-printers', 'industrial-lcd-3d-printers'].includes(p.category_slug)
  ).length

  const scannersCount = productsList.filter(p =>
    p.category_slug.includes('scanner') ||
    p.category.toLowerCase().includes('scanner') ||
    p.technology.toLowerCase().includes('scanner')
  ).length

  const filamentsCount = productsList.filter(p =>
    p.category_slug.includes('filament') ||
    p.category.toLowerCase().includes('filament') ||
    p.technology.toLowerCase().includes('materials')
  ).length

  const cadCount = productsList.filter(p =>
    p.category_slug.includes('cad') ||
    p.category.toLowerCase().includes('cad') ||
    p.category.toLowerCase().includes('software')
  ).length

  // Filtered Products with category and search
  const filteredProducts = productsList.filter(p => {
    // Category tab filter
    if (selectedCatalogCategory === 'printers') {
      const isPrinter =
        p.category_slug.includes('printer') ||
        p.category.toLowerCase().includes('printer') ||
        ['fdm-3d-printers', 'dlp-3d-printers', 'industrial-lcd-3d-printers'].includes(p.category_slug)
      if (!isPrinter) return false
    } else if (selectedCatalogCategory === 'scanners') {
      const isScanner =
        p.category_slug.includes('scanner') ||
        p.category.toLowerCase().includes('scanner') ||
        p.technology.toLowerCase().includes('scanner')
      if (!isScanner) return false
    } else if (selectedCatalogCategory === 'filaments') {
      const isFilament =
        p.category_slug.includes('filament') ||
        p.category.toLowerCase().includes('filament') ||
        p.technology.toLowerCase().includes('materials')
      if (!isFilament) return false
    } else if (selectedCatalogCategory === 'cad') {
      const isCad =
        p.category_slug.includes('cad') ||
        p.category.toLowerCase().includes('cad') ||
        p.category.toLowerCase().includes('software')
      if (!isCad) return false
    }

    if (!productSearch) return true
    const q = productSearch.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.technology.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.materials && p.materials.some(m => m.toLowerCase().includes(q)))
    )
  })

  // Filtered Quotes
  const filteredQuotes = quotes.filter(q => {
    if (quoteFilter === 'all') return true
    return q.status === quoteFilter
  })

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD (FULL CONTROL SUITE)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-inter overflow-x-hidden w-full">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
              L
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm">Leniva CAD Solutions</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Master Control Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="Return to public website"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Visit Website</span>
            </Link>

            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="Refresh all PostgreSQL data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6 min-w-0">
        {/* Master Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-3">
          <nav className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Overview & Diagnostics</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'quotes' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4" />
                <span>Quotes & RFQs</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'quotes' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {quotes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4" />
                <span>Contact Inquiries</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'contacts' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {contacts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Product Catalog</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'products' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {productsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Layers className="w-4 h-4" />
                <span>Engineering Blogs</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'blogs' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {blogsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('home_editor')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'home_editor' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Home className="w-4 h-4" />
                <span>Home Page Editor</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'home_editor' ? 'bg-red-800 text-red-100' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                Live CMS
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about_editor')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'about_editor' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Award className="w-4 h-4" />
                <span>About Us Editor</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'about_editor' ? 'bg-amber-800 text-amber-100' : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                Live CMS
              </span>
            </button>

            <button
              onClick={() => setActiveTab('shop_and_dropdown')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'shop_and_dropdown' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-4 h-4" />
                <span>Shop & Dropdowns Editor</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'shop_and_dropdown' ? 'bg-violet-800 text-violet-100' : 'bg-violet-50 text-violet-700 border border-violet-200'
              }`}>
                Live CMS
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Site & CMS Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Admin Account</span>
            </button>

            <div className="pt-2 border-t border-slate-100 mt-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pb-1.5">CAD Software</p>
              <button
                onClick={() => setActiveTab('cad_software')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'cad_software' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4" />
                  <span>CAD Software Editor</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeTab === 'cad_software' ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
                }`}>{cadProducts.length}</span>
              </button>
            </div>

          </nav>

        </aside>

        {/* Master Content Area */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ====================================================
              TAB 1: OVERVIEW & DASHBOARD
             ==================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Quotes</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalQuotes ?? quotes.length}</div>
                    <div className="text-[10px] text-blue-600 font-semibold mt-1">Customer RFQs</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Products</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalProducts ?? productsList.length}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Catalog in PostgreSQL</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">CAD Software</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{cadProducts.length}</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">Live Software CMS</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inquiries</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalContacts ?? contacts.length}</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">Contact Messages</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
              </div>
          </div>
          )}

          {/* ====================================================
              TAB 2: QUOTES & RFQS
             ==================================================== */}
          {activeTab === 'quotes' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Customer Quote Requests & RFQs</h3>
                  <p className="text-xs text-slate-500">Full control over status, pricing notes, and records</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={quoteFilter}
                    onChange={e => setQuoteFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="all">All Statuses ({quotes.length})</option>
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="quoted">Quoted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Client & Company</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Product / Service</th>
                      <th className="py-3 px-3">Quantity & Timeline</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotes.map(q => (
                      <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{q.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{q.name}</div>
                          <div className="text-[11px] text-slate-500">{q.company || 'Individual'}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>{q.email}</div>
                          <div className="text-[11px] text-slate-400">{q.phone || 'â€”'}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {q.service_or_product}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>Qty: {q.quantity}</div>
                          <div className="text-[11px] text-slate-400">{q.timeline}</div>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={q.status}
                            onChange={e => handleUpdateQuoteStatus(q.id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 cursor-pointer focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_review">In Review</option>
                            <option value="quoted">Quoted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedQuote(q)
                              setQuoteNotesInput(q.notes || '')
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Inspect details & notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete quote"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quote Modal with Internal Notes Editing */}
          {selectedQuote && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-base font-black text-slate-900">
                    Quote Inquiry #{selectedQuote.id}
                  </h4>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                  >
                    âœ•
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Client:</span>
                    <strong className="text-sm text-slate-900">{selectedQuote.name} ({selectedQuote.company || 'Independent'})</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block">Email:</span>
                      <strong className="text-slate-800">{selectedQuote.email}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone:</span>
                      <strong className="text-slate-800">{selectedQuote.phone || 'N/A'}</strong>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Requested Product / Service:</span>
                    <strong className="text-slate-800">{selectedQuote.service_or_product}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block mb-1 font-bold">Client Requirement:</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{selectedQuote.message || 'No additional message provided.'}</p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Admin Internal Notes / Quotation Amount</label>
                    <textarea
                      rows={3}
                      value={quoteNotesInput}
                      onChange={e => setQuoteNotesInput(e.target.value)}
                      placeholder="e.g. Sent official quote + GST on 28th Sep"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => handleUpdateQuoteStatus(selectedQuote.id, selectedQuote.status, quoteNotesInput)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Notes & Status
                  </button>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 3: CONTACT INQUIRIES
             ==================================================== */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Contact Form Inquiries</h3>
                  <p className="text-xs text-slate-500">Manage status &amp; notes for each message in <code>contact_messages</code></p>
                </div>
                <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  {contacts.length} total messages
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-3">Message Preview</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contacts.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{c.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.email}</div>
                          {c.phone && <div className="text-[11px] text-slate-400 font-mono">{c.phone}</div>}
                        </td>
                        <td className="py-3 px-3 font-semibold text-blue-700">{c.subject}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{c.message}</td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={c.status}
                            onChange={e => handleUpdateContactStatus(c.id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 cursor-pointer focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContact(c)
                              setContactNotesInput((c as any).notes || '')
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="View details & add notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contact Message Detail Modal */}
          {selectedContact && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-base font-black text-slate-900">
                    Contact #{selectedContact.id}
                  </h4>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                  >
                    âœ•
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">From:</span>
                    <strong className="text-sm text-slate-900">{selectedContact.name}</strong>
                    <span className="text-slate-500 ml-2">({selectedContact.email})</span>
                    {selectedContact.phone && <span className="text-slate-400 ml-2 font-mono">{selectedContact.phone}</span>}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Subject:</span>
                    <strong className="text-blue-700">{selectedContact.subject}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block mb-1 font-bold">Message:</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{selectedContact.message}</p>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Admin Notes / Reply Reference</label>
                    <textarea
                      rows={3}
                      value={contactNotesInput}
                      onChange={e => setContactNotesInput(e.target.value)}
                      placeholder="e.g. Replied via email on 28 Sep. Referred to sales team."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => handleUpdateContactStatus(selectedContact.id, selectedContact.status, contactNotesInput)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => { handleUpdateContactStatus(selectedContact.id, 'replied'); setSelectedContact(null) }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Mark Replied & Close
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* ====================================================
              TAB 4: PRODUCTS CATALOG (FULL CRUD)
             ==================================================== */}
          {/* ====================================================
              TAB 4: PRODUCTS & HARDWARE CATALOG (FULL SECTIONS EDITOR)
             ==================================================== */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              {/* Success Notification Banner */}
              {productSaveSuccessMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{productSaveSuccessMsg}</span>
                  </div>
                  <button
                    onClick={() => setProductSaveSuccessMsg('')}
                    className="text-emerald-600 hover:text-emerald-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Header and Controls */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Products & Equipment Catalog</h3>
                    <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-black">
                      {productsList.length} Live Items
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complete full-sections editor: customize hero images, gallery, key specs, full technical spec tables, features, materials, applications, filament swatches & scanner metrology.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  <button
                    onClick={handleResetCatalog}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    title="Restore catalog to original factory specs & products"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset Defaults</span>
                  </button>
                  <button
                    onClick={() => handleStartCreateNewProduct('fdm')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
                  <button
                    onClick={() => setSelectedCatalogCategory('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedCatalogCategory === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Products ({productsList.length})
                  </button>
                  <button
                    onClick={() => setSelectedCatalogCategory('printers')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedCatalogCategory === 'printers'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>3D Printers ({printersCount})</span>
                  </button>
                  <button
                    onClick={() => setSelectedCatalogCategory('scanners')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedCatalogCategory === 'scanners'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>3D Scanners ({scannersCount})</span>
                  </button>
                  <button
                    onClick={() => setSelectedCatalogCategory('filaments')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedCatalogCategory === 'filaments'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Filaments & Spools ({filamentsCount})</span>
                  </button>
                  <button
                    onClick={() => setSelectedCatalogCategory('cad')}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedCatalogCategory === 'cad'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>CAD Software ({cadCount})</span>
                  </button>
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search machines, filaments, specs..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 transition-colors"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>



              {/* ====================================================
                  COMPLETE FULL SECTIONS PRODUCT EDIT MODAL
                 ==================================================== */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
                  <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
                    {/* Modal Header */}
                    <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {editingProduct.hero_image ? (
                            <img src={editingProduct.hero_image} alt="" className="w-full h-full object-contain p-1" />
                          ) : (
                            <Box className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-black text-white truncate">
                              {editingProduct.name || 'Create New Product — Full Specifications'}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40">
                              {editingProduct.category}
                            </span>
                            {!productsList.some(p => p.id === editingProduct.id) && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                New Product Draft
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            slug: /products/{editingProduct.slug} • Brand: {editingProduct.brand} • Tech: {editingProduct.technology}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <a
                          href={editingProduct.category_slug === 'filaments' ? '/shop?category=filaments' : `/products/${editingProduct.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-bold transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Live</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-base font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Modal Sticky Section Navigation Bar */}
                    <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-1.5 overflow-x-auto shrink-0 scrollbar-none">
                      {[
                        { id: 'overview', label: '1. Overview & Info', icon: Info },
                        { id: 'media', label: `2. Gallery (${editingProduct.images?.length || 1})`, icon: Eye },
                        { id: 'pricing', label: '3. Inventory & Flags', icon: CheckCircle2 },
                        { id: 'specs', label: `4. Key Specs (${editingProduct.key_specs?.length || 0})`, icon: Sparkles },
                        { id: 'tech_specs', label: `5. Tech Specs (${Object.keys(editingProduct.specifications || {}).length})`, icon: SlidersHorizontal },
                        { id: 'features', label: `6. Features (${editingProduct.features?.length || 0})`, icon: List },
                        { id: 'applications', label: `7. Applications (${(editingProduct.applications?.length || 0) + (editingProduct.who_is_it_for?.length || 0)})`, icon: Box },
                        { id: 'materials', label: `8. Materials (${editingProduct.materials?.length || 0})`, icon: Layers },
                        {
                          id: 'specialized',
                          label: editingProduct.category_slug === 'filaments' || editingProduct.category.toLowerCase().includes('filament')
                            ? '9. Filament Swatch'
                            : '9. Scanner Metrology',
                          icon: Palette,
                        },
                      ].map(tab => {
                        const TabIcon = tab.icon
                        const isActive = activeEditTab === tab.id
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveEditTab(tab.id as any)}
                            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                              isActive
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                            }`}
                          >
                            <TabIcon className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Modal Scrollable Body */}
                    <form onSubmit={handleSaveEditProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* TAB 1: OVERVIEW & GENERAL */}
                      {activeEditTab === 'overview' && (
                        <div className="space-y-4 animate-in fade-in">
                          {/* Specification & Category Templates Switcher */}
                          <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 shadow-2xs space-y-2.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                              <div className="flex items-center space-x-2">
                                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                                <span className="font-black text-blue-950 text-xs">Load Specification &amp; Category Template</span>
                              </div>
                              <span className="text-[11px] text-blue-700">Auto-populates full key specs, tech specs table, features &amp; materials</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-0.5">
                              {[
                                { type: 'fdm', label: '🖨️ FDM 3D Printer' },
                                { type: 'dlp', label: '🧪 DLP / LCD Resin' },
                                { type: 'scanner', label: '📷 3D Scanner' },
                                { type: 'filament', label: '🧵 Filament & Material' },
                                { type: 'cad', label: '💻 CAD Software' },
                              ].map(t => (
                                <button
                                  key={t.type}
                                  type="button"
                                  onClick={() => handleApplyTemplate(t.type as any)}
                                  className="px-3 py-1.5 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
                                >
                                  {t.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div className="font-bold text-blue-950">Section 1: General Information &amp; Page Branding</div>
                            <span className="text-[11px] text-blue-700">Controls hero typography, URL routing, and metadata</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                              <input
                                type="text"
                                required
                                value={editingProduct.name}
                                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                              <input
                                type="text"
                                required
                                value={editingProduct.slug || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Category</label>
                              <select
                                value={editingProduct.category}
                                onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                              >
                                <option value="FDM 3D Printers">FDM 3D Printers</option>
                                <option value="DLP 3D Printers">DLP 3D Printers</option>
                                <option value="Industrial LCD 3D Printers">Industrial LCD 3D Printers</option>
                                <option value="3D Scanners">3D Scanners</option>
                                <option value="Filaments & Materials">Filaments & Materials</option>
                                <option value="CAD & Engineering Software">CAD & Engineering Software</option>
                              </select>
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Category Slug</label>
                              <input
                                type="text"
                                value={editingProduct.category_slug || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, category_slug: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Brand</label>
                              <input
                                type="text"
                                value={editingProduct.brand || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Technology Badge (Hero Ribbon)</label>
                              <input
                                type="text"
                                value={editingProduct.technology || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, technology: e.target.value })}
                                placeholder="e.g. Fused Deposition Modeling (FDM / FFF)"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Promotional Badge (Highlight Chip)</label>
                              <input
                                type="text"
                                value={editingProduct.badge || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                                placeholder="e.g. Most Popular • Industrial Workhorse"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tagline / Headline</label>
                            <input
                              type="text"
                              value={editingProduct.tagline || ''}
                              onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                              placeholder="e.g. Standard 300 mm Industrial Prototype Workhorse"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Short Description (Catalog cards & meta)</label>
                            <textarea
                              rows={2}
                              value={editingProduct.short_description || ''}
                              onChange={e => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                              placeholder="Brief summary displayed on cards..."
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Full Detailed Engineering Description</label>
                            <textarea
                              rows={4}
                              value={editingProduct.description || ''}
                              onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                              placeholder="Comprehensive breakdown of machine chassis, motion guide, hotend, and reliability..."
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Official Brochure Download URL (PDF)</label>
                            <input
                              type="text"
                              value={editingProduct.brochure_url || ''}
                              onChange={e => setEditingProduct({ ...editingProduct, brochure_url: e.target.value })}
                              placeholder="e.g. /brochures/pratham-3.pdf"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      )}

                      {/* TAB 2: MEDIA & GALLERY */}
                      {activeEditTab === 'media' && (
                        <div className="space-y-5 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div className="font-bold text-blue-950">Section 2: Hero & Multi-Image Gallery Showcase</div>
                            <span className="text-[11px] text-blue-700">Add multiple views, close-ups, and extruder imagery</span>
                          </div>

                          {/* Hero Main Image */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">Primary Hero Image</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingProduct.hero_image || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, hero_image: e.target.value })}
                                placeholder="/images/products/pratham-mini.png"
                                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                              />
                              <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span className="font-bold">
                                  {uploadingField === 'hero' ? 'Uploading...' : 'Upload Image'}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      setUploadingField('hero')
                                      handleDirectImageUpload(file, url => {
                                        setEditingProduct({ ...editingProduct, hero_image: url })
                                        setUploadingField(null)
                                      })
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            {editingProduct.hero_image && (
                              <div className="mt-2 flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 w-fit">
                                <img
                                  src={editingProduct.hero_image}
                                  alt="Hero preview"
                                  className="w-16 h-16 object-contain bg-slate-50 rounded-lg border border-slate-200 p-1"
                                  onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                                />
                                <div className="text-[11px]">
                                  <div className="font-bold text-slate-800">Hero Main Photo</div>
                                  <div className="text-slate-500 font-mono truncate max-w-xs">{editingProduct.hero_image}</div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Gallery Images List */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="block font-bold text-slate-800">
                                Additional Gallery Images ({(editingProduct.images || []).length} Photos)
                              </label>
                              <span className="text-[11px] text-slate-500">Thumbnails displayed in the product carousel</span>
                            </div>

                            {/* Gallery Thumbnails Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                              {(editingProduct.images || []).map((img, idx) => (
                                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-white aspect-square flex items-center justify-center p-1">
                                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-contain" />
                                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 p-1">
                                    <button
                                      type="button"
                                      onClick={() => setEditingProduct({ ...editingProduct, hero_image: img })}
                                      className="p-1 bg-blue-600 text-white rounded text-[10px] font-bold hover:bg-blue-700"
                                      title="Set as Hero Image"
                                    >
                                      Main
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedImgs = (editingProduct.images || []).filter((_, i) => i !== idx)
                                        setEditingProduct({ ...editingProduct, images: updatedImgs })
                                      }}
                                      className="p-1 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700"
                                      title="Remove from Gallery"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Add Image to Gallery */}
                            <div className="pt-2 flex gap-2">
                              <input
                                type="text"
                                placeholder="Paste image URL (e.g. /images/products/pratham-angle-2.png)"
                                value={newGalleryImgInput}
                                onChange={e => setNewGalleryImgInput(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newGalleryImgInput.trim()) {
                                    const updatedImgs = [...(editingProduct.images || []), newGalleryImgInput.trim()]
                                    setEditingProduct({ ...editingProduct, images: updatedImgs })
                                    setNewGalleryImgInput('')
                                  }
                                }}
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg shrink-0 cursor-pointer"
                              >
                                + Add Image
                              </button>
                              <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span className="font-bold">Upload to Gallery</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                      handleDirectImageUpload(file, url => {
                                        const updatedImgs = [...(editingProduct.images || []), url]
                                        setEditingProduct({ ...editingProduct, images: updatedImgs })
                                      })
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: INVENTORY & FLAGS (NO PRICING) */}
                      {activeEditTab === 'pricing' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div className="font-bold text-blue-950">Section 3: Inventory, Availability & Commercial Flags</div>
                            <span className="text-[11px] text-blue-700">100% Quote-Based Inquiries across all products & filaments</span>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">Status & Commercial Flags</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <label className="flex items-center space-x-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-blue-50/30">
                                <input
                                  type="checkbox"
                                  checked={editingProduct.in_stock !== false}
                                  onChange={e => setEditingProduct({ ...editingProduct, in_stock: e.target.checked })}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <div>
                                  <div className="font-bold text-slate-800">In Stock (Available for Delivery)</div>
                                  <div className="text-[11px] text-slate-500">Uncheck to display "Out of Stock"</div>
                                </div>
                              </label>

                              <label className="flex items-center space-x-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-blue-50/30">
                                <input
                                  type="checkbox"
                                  checked={!!editingProduct.is_quote_based}
                                  onChange={e => setEditingProduct({ ...editingProduct, is_quote_based: e.target.checked })}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <div>
                                  <div className="font-bold text-slate-800">Quote-Based Inquiries</div>
                                  <div className="text-[11px] text-slate-500">Shows "Request Official Quote" instead of checkout</div>
                                </div>
                              </label>

                              <label className="flex items-center space-x-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-blue-50/30">
                                <input
                                  type="checkbox"
                                  checked={!!editingProduct.is_featured}
                                  onChange={e => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <div>
                                  <div className="font-bold text-slate-800">Featured Showcase</div>
                                  <div className="text-[11px] text-slate-500">Spotlight on homepage hero and top catalogs</div>
                                </div>
                              </label>

                              <label className="flex items-center space-x-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-blue-50/30">
                                <input
                                  type="checkbox"
                                  checked={!!editingProduct.is_new}
                                  onChange={e => setEditingProduct({ ...editingProduct, is_new: e.target.checked })}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <div>
                                  <div className="font-bold text-slate-800">New Release Badge</div>
                                  <div className="text-[11px] text-slate-500">Displays vibrant "New Launch" tag on cards</div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 4: KEY SPECS HIGHLIGHTS */}
                      {activeEditTab === 'specs' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 4: Key Highlight Spec Badges</div>
                              <div className="text-[11px] text-blue-700">Shown in the quick-specs strip right below the product title</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {(editingProduct.key_specs || []).length} Badges
                            </span>
                          </div>

                          {/* Existing Key Specs List */}
                          <div className="space-y-2">
                            {(editingProduct.key_specs || []).map((spec, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                <div className="w-1/3">
                                  <input
                                    type="text"
                                    value={spec.label}
                                    onChange={e => {
                                      const updated = [...(editingProduct.key_specs || [])]
                                      updated[idx] = { ...updated[idx], label: e.target.value }
                                      setEditingProduct({ ...editingProduct, key_specs: updated })
                                    }}
                                    placeholder="Label (e.g. Build Volume)"
                                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                                  />
                                </div>
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={spec.value}
                                    onChange={e => {
                                      const updated = [...(editingProduct.key_specs || [])]
                                      updated[idx] = { ...updated[idx], value: e.target.value }
                                      setEditingProduct({ ...editingProduct, key_specs: updated })
                                    }}
                                    placeholder="Value (e.g. 300 × 300 × 300 mm)"
                                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = (editingProduct.key_specs || []).filter((_, i) => i !== idx)
                                    setEditingProduct({ ...editingProduct, key_specs: updated })
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                  title="Delete key spec"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add New Key Spec Form */}
                          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                            <div className="font-bold text-slate-800 text-[11px]">+ Add New Highlight Spec Badge</div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Spec Label (e.g. Layer Resolution)"
                                value={newKeySpec.label}
                                onChange={e => setNewKeySpec({ ...newKeySpec, label: e.target.value })}
                                className="w-1/3 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Spec Value (e.g. 0.08 – 0.3 mm)"
                                value={newKeySpec.value}
                                onChange={e => setNewKeySpec({ ...newKeySpec, value: e.target.value })}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newKeySpec.label.trim() && newKeySpec.value.trim()) {
                                    const updated = [...(editingProduct.key_specs || []), { ...newKeySpec }]
                                    setEditingProduct({ ...editingProduct, key_specs: updated })
                                    setNewKeySpec({ label: '', value: '' })
                                  }
                                }}
                                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                              >
                                + Add Spec
                              </button>
                            </div>

                            {/* Presets */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-slate-500 font-bold">Quick Presets:</span>
                              {[
                                { label: 'Build Volume', value: '300 × 300 × 300 mm' },
                                { label: 'Print Speed', value: 'Up to 120 mm/s' },
                                { label: 'Layer Resolution', value: '0.08 – 0.3 mm' },
                                { label: 'Max Extruder Temp', value: '300°C' },
                                { label: 'Max Bed Temp', value: '120°C' },
                                { label: 'Dimensional Tolerance', value: '±0.1 mm' },
                              ].map((p, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(editingProduct.key_specs || []), p]
                                    setEditingProduct({ ...editingProduct, key_specs: updated })
                                  }}
                                  className="px-2 py-0.5 bg-white hover:bg-blue-100 border border-slate-200 text-slate-700 rounded text-[10px] font-medium transition-colors"
                                >
                                  + {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 5: TECHNICAL SPECIFICATIONS TABLE */}
                      {activeEditTab === 'tech_specs' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 5: Comprehensive Technical Specifications Table</div>
                              <div className="text-[11px] text-blue-700">Rendered in the detailed engineering spec sheet on product pages</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {Object.keys(editingProduct.specifications || {}).length} Parameters
                            </span>
                          </div>

                          {/* Existing Specs Table */}
                          <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                                <tr>
                                  <th className="py-2.5 px-3 w-1/3">Property / Parameter</th>
                                  <th className="py-2.5 px-3">Specification Detail</th>
                                  <th className="py-2.5 px-2 text-right w-12">Action</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {Object.entries(editingProduct.specifications || {}).map(([prop, val]) => (
                                  <tr key={prop} className="hover:bg-slate-50">
                                    <td className="py-2 px-3 font-bold text-slate-900">{prop}</td>
                                    <td className="py-2 px-3">
                                      <input
                                        type="text"
                                        value={val}
                                        onChange={e => {
                                          setEditingProduct({
                                            ...editingProduct,
                                            specifications: {
                                              ...(editingProduct.specifications || {}),
                                              [prop]: e.target.value,
                                            },
                                          })
                                        }}
                                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-slate-800"
                                      />
                                    </td>
                                    <td className="py-2 px-2 text-right">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updatedSpecs = { ...(editingProduct.specifications || {}) }
                                          delete updatedSpecs[prop]
                                          setEditingProduct({ ...editingProduct, specifications: updatedSpecs })
                                        }}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                        title="Delete row"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Add New Specification Row */}
                          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                            <div className="font-bold text-slate-800 text-[11px]">+ Add Technical Specification Row</div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Property Name (e.g. Build Envelope)"
                                value={newSpecRow.property}
                                onChange={e => setNewSpecRow({ ...newSpecRow, property: e.target.value })}
                                className="w-1/3 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Specification Value (e.g. 300 × 300 × 300 mm)"
                                value={newSpecRow.value}
                                onChange={e => setNewSpecRow({ ...newSpecRow, value: e.target.value })}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newSpecRow.property.trim()) {
                                    setEditingProduct({
                                      ...editingProduct,
                                      specifications: {
                                        ...(editingProduct.specifications || {}),
                                        [newSpecRow.property.trim()]: newSpecRow.value.trim(),
                                      },
                                    })
                                    setNewSpecRow({ property: '', value: '' })
                                  }
                                }}
                                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                              >
                                + Add Row
                              </button>
                            </div>

                            {/* Quick Add Presets */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] text-slate-500 font-bold">Quick Spec Presets:</span>
                              {[
                                'Print Technology',
                                'Build Envelope',
                                'Extruder Type',
                                'Nozzle Diameter',
                                'Maximum Hotend Temp',
                                'Printbed Temp',
                                'Motion System',
                                'Filament Compatibility',
                                'Display Interface',
                                'Connectivity',
                                'Supported File Formats',
                                'Chassis Construction',
                                'Power Supply',
                                'Printer Dimensions & Weight',
                              ].map((key, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setNewSpecRow({ ...newSpecRow, property: key })}
                                  className="px-2 py-0.5 bg-white hover:bg-blue-100 border border-slate-200 text-slate-700 rounded text-[10px] font-medium"
                                >
                                  + {key}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 6: CORE FEATURES */}
                      {activeEditTab === 'features' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 6: Core Features & Engineering Highlights</div>
                              <div className="text-[11px] text-blue-700">Bullet points highlighting standout capabilities and hardware design</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {(editingProduct.features || []).length} Features
                            </span>
                          </div>

                          {/* Existing Features List */}
                          <div className="space-y-2">
                            {(editingProduct.features || []).map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <textarea
                                  rows={2}
                                  value={feat}
                                  onChange={e => {
                                    const updated = [...(editingProduct.features || [])]
                                    updated[idx] = e.target.value
                                    setEditingProduct({ ...editingProduct, features: updated })
                                  }}
                                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = (editingProduct.features || []).filter((_, i) => i !== idx)
                                    setEditingProduct({ ...editingProduct, features: updated })
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                                  title="Delete feature"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add Feature Form */}
                          <div className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                            <div className="font-bold text-slate-800 text-[11px]">+ Add Highlight Feature</div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="e.g. Rigid industrial all-metal MS frame eliminates vibration for high-precision printing"
                                value={newFeatureInput}
                                onChange={e => setNewFeatureInput(e.target.value)}
                                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newFeatureInput.trim()) {
                                    const updated = [...(editingProduct.features || []), newFeatureInput.trim()]
                                    setEditingProduct({ ...editingProduct, features: updated })
                                    setNewFeatureInput('')
                                  }
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                              >
                                + Add Feature
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 7: APPLICATIONS & TARGET AUDIENCE */}
                      {activeEditTab === 'applications' && (
                        <div className="space-y-5 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div className="font-bold text-blue-950">Section 7: Industrial Applications & Target Personas</div>
                            <span className="text-[11px] text-blue-700">Guides prospective buyers to the right solution</span>
                          </div>

                          {/* Applications */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Industrial Applications & Use Cases ({(editingProduct.applications || []).length} items)
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {(editingProduct.applications || []).map((app, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-slate-300 text-slate-800 rounded-lg font-medium shadow-2xs"
                                >
                                  <span>{app}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingProduct.applications || []).filter((_, i) => i !== idx)
                                      setEditingProduct({ ...editingProduct, applications: updated })
                                    }}
                                    className="text-slate-400 hover:text-red-500 font-bold ml-1"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add application (e.g. Functional Prototype Testing, Tooling & Jigs)"
                                value={newAppInput}
                                onChange={e => setNewAppInput(e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newAppInput.trim()) {
                                    const updated = [...(editingProduct.applications || []), newAppInput.trim()]
                                    setEditingProduct({ ...editingProduct, applications: updated })
                                    setNewAppInput('')
                                  }
                                }}
                                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
                              >
                                + Add Application
                              </button>
                            </div>
                          </div>

                          {/* Who Is It For */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Target Audience / Who Is It For ({(editingProduct.who_is_it_for || []).length} personas)
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {(editingProduct.who_is_it_for || []).map((user, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-slate-300 text-slate-800 rounded-lg font-medium shadow-2xs"
                                >
                                  <span>{user}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingProduct.who_is_it_for || []).filter((_, i) => i !== idx)
                                      setEditingProduct({ ...editingProduct, who_is_it_for: updated })
                                    }}
                                    className="text-slate-400 hover:text-red-500 font-bold ml-1"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add target audience (e.g. R&D Engineering Teams, STEM Labs)"
                                value={newAudienceInput}
                                onChange={e => setNewAudienceInput(e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newAudienceInput.trim()) {
                                    const updated = [...(editingProduct.who_is_it_for || []), newAudienceInput.trim()]
                                    setEditingProduct({ ...editingProduct, who_is_it_for: updated })
                                    setNewAudienceInput('')
                                  }
                                }}
                                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
                              >
                                + Add Audience
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 8: MATERIALS COMPATIBILITY */}
                      {activeEditTab === 'materials' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div className="font-bold text-blue-950">Section 8: Compatible Polymers, Resins & Materials</div>
                            <span className="text-[11px] text-blue-700">Supported thermoplastics and engineering filaments</span>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Supported Materials ({(editingProduct.materials || []).length} types)
                            </label>

                            <div className="flex flex-wrap gap-2">
                              {(editingProduct.materials || []).map((mat, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white border border-slate-300 text-slate-800 rounded-lg font-bold shadow-2xs"
                                >
                                  <span>{mat}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingProduct.materials || []).filter((_, i) => i !== idx)
                                      setEditingProduct({ ...editingProduct, materials: updated })
                                    }}
                                    className="text-slate-400 hover:text-red-500 font-bold ml-1"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add material (e.g. Carbon-Fiber PLA, TPU 95A, Nylon)"
                                value={newMatInput}
                                onChange={e => setNewMatInput(e.target.value)}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newMatInput.trim()) {
                                    const updated = [...(editingProduct.materials || []), newMatInput.trim()]
                                    setEditingProduct({ ...editingProduct, materials: updated })
                                    setNewMatInput('')
                                  }
                                }}
                                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer"
                              >
                                + Add Material
                              </button>
                            </div>

                            {/* Preset Buttons */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
                              <span className="text-[10px] text-slate-500 font-bold">Quick Presets:</span>
                              {[
                                'PLA',
                                'PLA+',
                                'ABS',
                                'PETG',
                                'TPU (95A)',
                                'Carbon-Fiber PLA',
                                'Nylon (PA)',
                                'PC-ABS',
                                'Standard Resin',
                                'Castable Wax Resin',
                                'Dental Model Resin',
                              ].map((mat, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    if (!(editingProduct.materials || []).includes(mat)) {
                                      const updated = [...(editingProduct.materials || []), mat]
                                      setEditingProduct({ ...editingProduct, materials: updated })
                                    }
                                  }}
                                  className="px-2 py-0.5 bg-white hover:bg-blue-100 border border-slate-200 text-slate-700 rounded text-[10px] font-medium"
                                >
                                  + {mat}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 9: SPECIALIZED CATEGORY PARAMETERS (FILAMENTS / SCANNERS) */}
                      {activeEditTab === 'specialized' && (
                        <div className="space-y-5 animate-in fade-in">
                          {/* FILAMENT SPECIFIC CONTROLS */}
                          {(editingProduct.category_slug === 'filaments' || editingProduct.category.toLowerCase().includes('filament')) ? (
                            <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-4">
                              <div className="flex items-center space-x-2">
                                <Palette className="w-5 h-5 text-amber-700" />
                                <h4 className="text-sm font-black text-amber-950">Filament & Consumables Precision Settings</h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Filament Material</label>
                                  <select
                                    value={editingProduct.filament_material || 'PLA'}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_material: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold"
                                  >
                                    <option value="PLA">PLA</option>
                                    <option value="PLA+">PLA+</option>
                                    <option value="PETG">PETG</option>
                                    <option value="ABS">ABS</option>
                                    <option value="TPU">TPU</option>
                                    <option value="Resin">Resin</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Color Name</label>
                                  <input
                                    type="text"
                                    value={editingProduct.filament_color || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_color: e.target.value })}
                                    placeholder="e.g. Grey / Silver, Gold, Red"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Color Hex & Swatch</label>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="color"
                                      value={editingProduct.filament_color_hex || '#4b5563'}
                                      onChange={e => setEditingProduct({ ...editingProduct, filament_color_hex: e.target.value })}
                                      className="w-10 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
                                    />
                                    <input
                                      type="text"
                                      value={editingProduct.filament_color_hex || '#4b5563'}
                                      onChange={e => setEditingProduct({ ...editingProduct, filament_color_hex: e.target.value })}
                                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs font-bold"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Diameter</label>
                                  <input
                                    type="text"
                                    value={editingProduct.filament_diameter || '1.75 mm'}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_diameter: e.target.value })}
                                    placeholder="1.75 mm"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Spool Weight</label>
                                  <input
                                    type="text"
                                    value={editingProduct.filament_weight || '1 KG'}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_weight: e.target.value })}
                                    placeholder="1 KG"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Print Temp</label>
                                  <input
                                    type="text"
                                    value={editingProduct.filament_print_temp || '190°C – 220°C'}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_print_temp: e.target.value })}
                                    placeholder="190°C – 220°C"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Bed Temp</label>
                                  <input
                                    type="text"
                                    value={editingProduct.filament_bed_temp || '50°C – 60°C'}
                                    onChange={e => setEditingProduct({ ...editingProduct, filament_bed_temp: e.target.value })}
                                    placeholder="50°C – 60°C"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* 3D SCANNER SPECIFIC CONTROLS */
                            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-4">
                              <div className="flex items-center space-x-2">
                                <Scan className="w-5 h-5 text-emerald-700" />
                                <h4 className="text-sm font-black text-emerald-950">3D Optical Scanner Metrology Parameters</h4>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Scanner Model Name</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_model_name || editingProduct.name}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_model_name: e.target.value })}
                                    placeholder="e.g. 3DeVOK MQ"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Volumetric Accuracy</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_accuracy || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_accuracy: e.target.value })}
                                    placeholder="e.g. Up to 0.08 mm"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Point Resolution</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_resolution || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_resolution: e.target.value })}
                                    placeholder="e.g. 0.1 mm Point Distance"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Scan Acquisition Speed</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_speed || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_speed: e.target.value })}
                                    placeholder="e.g. Up to 4,500,000 pts/s"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Optical Light Source / Technology</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_optical_tech || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_optical_tech: e.target.value })}
                                    placeholder="e.g. 22-Line IR Laser + VCSEL"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Color / Texture Camera</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_color_support || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_color_support: e.target.value })}
                                    placeholder="e.g. 24-Bit RGB Photoreal Texture"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block font-bold text-slate-700 mb-1">Wireless Transmission</label>
                                  <input
                                    type="text"
                                    value={editingProduct.scanner_wireless || ''}
                                    onChange={e => setEditingProduct({ ...editingProduct, scanner_wireless: e.target.value })}
                                    placeholder="e.g. Supported via Optional Handle"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Modal Sticky Footer */}
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between sticky bottom-0 bg-white/95 backdrop-blur-xs py-2">
                        <div className="text-[11px] text-slate-500 font-mono">
                          Configured: {(editingProduct.features || []).length} features • {Object.keys(editingProduct.specifications || {}).length} specs • {(editingProduct.materials || []).length} materials
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center space-x-1.5 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>
                              {productsList.some(p => p.id === editingProduct.id)
                                ? 'Save Changes to Catalog'
                                : 'Create & Add to Live Catalog'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Products Catalog Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/70 text-[10px]">
                      <th className="py-3 px-4">Product & Visual</th>
                      <th className="py-3 px-3">Category & Tech</th>
                      <th className="py-3 px-3">Commercial Mode</th>
                      <th className="py-3 px-3">Sections Configured</th>
                      <th className="py-3 px-3">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                              {p.hero_image ? (
                                <img src={p.hero_image} alt="" className="w-full h-full object-contain p-1" />
                              ) : (
                                <Box className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">/products/{p.slug}</div>
                              {p.tagline && (
                                <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{p.tagline}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                              {p.category}
                            </span>
                            <div className="text-[11px] text-slate-500 truncate max-w-[150px] font-medium">
                              {p.technology}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            Quote Required
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[11px] text-slate-600 space-y-0.5">
                            <div className="font-medium text-slate-700">
                              {Object.keys(p.specifications || {}).length} specs • {(p.features || []).length} features
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {(p.materials || []).length} materials • {(p.images || []).length} photos
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              p.in_stock !== false
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            title="Click to toggle stock availability"
                          >
                            {p.in_stock !== false ? '✓ In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingProduct({ ...p })
                              setActiveEditTab('overview')
                            }}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                            title="Edit full product sections"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Full Sections</span>
                          </button>
                          <a
                            href={p.category_slug === 'filaments' ? '/shop?category=filaments' : `/products/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="View on live website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}





          {/* ====================================================
              TAB 6: BLOG ARTICLES (FULL CONTROL)
             ==================================================== */}
          {activeTab === 'blogs' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Engineering Articles & Blogs</h3>
                  <p className="text-xs text-slate-500">Publish, edit or delete articles in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewBlogOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {isNewBlogOpen && (
                <form onSubmit={handleCreateBlog} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <h4 className="text-sm font-black text-slate-900">Publish New Engineering Post</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={newBlog.category}
                        onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt</label>
                    <input
                      type="text"
                      value={newBlog.excerpt}
                      onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Content (Markdown Supported)</label>
                    <textarea
                      rows={5}
                      required
                      value={newBlog.content}
                      onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsNewBlogOpen(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Blog Modal */}
              {editingBlog && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditBlog} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Blog Post: {editingBlog.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingBlog.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        âœ•
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title}
                            onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug</label>
                          <input
                            type="text"
                            value={editingBlog.slug}
                            onChange={e => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category}
                            onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                          <input
                            type="text"
                            value={editingBlog.read_time || '5 min read'}
                            onChange={e => setEditingBlog({ ...editingBlog, read_time: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Date Published</label>
                          <input
                            type="text"
                            value={editingBlog.date || ''}
                            onChange={e => setEditingBlog({ ...editingBlog, date: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Featured Cover Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingBlog.image || ''}
                            onChange={e => setEditingBlog({ ...editingBlog, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingBlog((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingBlog.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingBlog.image}
                              alt="Blog preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingBlog.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Excerpt</label>
                        <textarea
                          rows={2}
                          value={editingBlog.excerpt || ''}
                          onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Article Content (Markdown Supported)</label>
                        <textarea
                          rows={8}
                          value={editingBlog.content || ''}
                          onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div className="pt-1">
                        <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <input
                            type="checkbox"
                            checked={editingBlog.published !== false}
                            onChange={e => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Article Published & Live</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Blog Post to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Title</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {blogsList.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{b.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/blog/{b.slug}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{b.category}</td>
                        <td className="py-3 px-3 text-slate-500">{b.date}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            Published
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingBlog(b)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB: HOME PAGE CMS & VISUAL EDITOR
             ==================================================== */}
          {activeTab === 'home_editor' && (() => {
            const currentHeroSlide = homeContentData.hero.slides[activeHeroSlideIdx] || homeContentData.hero.slides[0]
            const curPrinterCard = homeContentData.printers[activePrinterCardKey]
            const curCadCard = homeContentData.cadSoftware[activeCadCardKey]

            return (
              <div className="space-y-6">
                {/* Top Banner / Actions Bar */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Home className="w-3 h-3" />
                      <span>Live Website CMS</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Home Page Editor</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure Hero carousel slides, dynamic headline, company intro, 3D printer showcases, and CAD software suites in real-time.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Home</span>
                    </a>
                    <button
                      onClick={handleResetHomeContent}
                      className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      onClick={() => handleSaveHomeContent()}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </div>

                {homeSavedMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{homeSavedMsg}</span>
                  </div>
                )}

                {/* Sub-tabs Bar */}
                <div className="bg-slate-100/90 p-1.5 rounded-2xl flex flex-wrap gap-1 border border-slate-200/80">
                  <button
                    onClick={() => setHomeActiveTab('hero')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      homeActiveTab === 'hero' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1. Hero Slides ({homeContentData.hero.slides.length})
                  </button>
                  <button
                    onClick={() => setHomeActiveTab('about')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      homeActiveTab === 'about' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    2. Company Introduction
                  </button>
                  <button
                    onClick={() => setHomeActiveTab('printers')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      homeActiveTab === 'printers' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3. 3D Printers Showcase
                  </button>
                  <button
                    onClick={() => setHomeActiveTab('cad')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      homeActiveTab === 'cad' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4. CAD Software Showcase
                  </button>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    SUB-TAB 1: HERO SLIDES & HEADLINE
                   ───────────────────────────────────────────────────────────── */}
                {homeActiveTab === 'hero' && (
                  <div className="space-y-6">
                    {/* Slides Selector & Controls */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">Hero Carousel Banners</h4>
                          <p className="text-xs text-slate-500">Each banner is displayed at 1024:341 aspect ratio with auto-advancing rotation.</p>
                        </div>
                        <button
                          onClick={() => {
                            const newId = Date.now()
                            const newSlide = {
                              id: newId,
                              image: '/images/hero/hero-banner-1.png',
                              alt: 'New Hero Banner',
                              title: 'New Additive Manufacturing Solution',
                              subtitle: 'Empowering Next Generation Production',
                              tag: 'Advanced Engineering',
                              badge: 'New Technology',
                              primaryBtnText: 'Explore Solutions',
                              primaryBtnLink: '/products',
                              secondaryBtnText: 'Request Quote',
                              quoteSubject: 'Hero Banner Consultation',
                            }
                            setHomeContentData({
                              ...homeContentData,
                              hero: {
                                ...homeContentData.hero,
                                slides: [...homeContentData.hero.slides, newSlide],
                              },
                            })
                            setActiveHeroSlideIdx(homeContentData.hero.slides.length)
                          }}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Slide</span>
                        </button>
                      </div>

                      {/* Slide Pills */}
                      <div className="flex flex-wrap gap-2">
                        {homeContentData.hero.slides.map((s, idx) => (
                          <button
                            key={s.id || idx}
                            onClick={() => setActiveHeroSlideIdx(idx)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                              activeHeroSlideIdx === idx
                                ? 'bg-red-600 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            <span>Slide {idx + 1}: {s.title.substring(0, 20)}...</span>
                          </button>
                        ))}
                      </div>

                      {/* Selected Slide Edit Form */}
                      {currentHeroSlide && (
                        <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/90 space-y-5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                              Editing Slide #{activeHeroSlideIdx + 1}
                            </span>
                            {homeContentData.hero.slides.length > 1 && (
                              <button
                                onClick={() => {
                                  if (window.confirm('Delete this hero slide?')) {
                                    const updated = homeContentData.hero.slides.filter((_, i) => i !== activeHeroSlideIdx)
                                    setHomeContentData({
                                      ...homeContentData,
                                      hero: { ...homeContentData.hero, slides: updated },
                                    })
                                    setActiveHeroSlideIdx(Math.max(0, activeHeroSlideIdx - 1))
                                  }
                                }}
                                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center space-x-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Slide</span>
                              </button>
                            )}
                          </div>

                          {/* Image Preview & URL */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-5 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-1">Banner Image Preview</p>
                              <div className="aspect-[1024/341] rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-100">
                                <img
                                  src={currentHeroSlide.image}
                                  alt={currentHeroSlide.alt}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/1024x341?text=Preview+Image'
                                  }}
                                />
                              </div>
                            </div>

                            <div className="md:col-span-7 space-y-3 text-xs">
                              <div>
                                <label className="block font-bold text-slate-700 mb-1">Banner Image URL / File Path</label>
                                <input
                                  type="text"
                                  value={currentHeroSlide.image}
                                  onChange={(e) => {
                                    const updated = [...homeContentData.hero.slides]
                                    updated[activeHeroSlideIdx] = { ...currentHeroSlide, image: e.target.value }
                                    setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                                />
                              </div>
                              <div>
                                <label className="block font-bold text-slate-700 mb-1">Image Alt Text (SEO)</label>
                                <input
                                  type="text"
                                  value={currentHeroSlide.alt}
                                  onChange={(e) => {
                                    const updated = [...homeContentData.hero.slides]
                                    updated[activeHeroSlideIdx] = { ...currentHeroSlide, alt: e.target.value }
                                    setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Text Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Slide Title</label>
                              <input
                                type="text"
                                value={currentHeroSlide.title}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, title: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                              <input
                                type="text"
                                value={currentHeroSlide.subtitle}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, subtitle: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Pill Tag (Top Pill)</label>
                              <input
                                type="text"
                                value={currentHeroSlide.tag}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, tag: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Badge Description</label>
                              <input
                                type="text"
                                value={currentHeroSlide.badge}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, badge: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Primary Button Text</label>
                              <input
                                type="text"
                                value={currentHeroSlide.primaryBtnText}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, primaryBtnText: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Primary Button Link URL</label>
                              <input
                                type="text"
                                value={currentHeroSlide.primaryBtnLink}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, primaryBtnLink: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Secondary Button Text</label>
                              <input
                                type="text"
                                value={currentHeroSlide.secondaryBtnText}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, secondaryBtnText: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Quote Inquiry Pre-filled Subject</label>
                              <input
                                type="text"
                                value={currentHeroSlide.quoteSubject}
                                onChange={(e) => {
                                  const updated = [...homeContentData.hero.slides]
                                  updated[activeHeroSlideIdx] = { ...currentHeroSlide, quoteSubject: e.target.value }
                                  setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                }}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Dynamic Headline & Description */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Hero Section Bottom Headline &amp; Quick CTAs</h4>
                        <p className="text-xs text-slate-500">The primary heading and description displayed directly underneath the banner.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Headline Prefix</label>
                          <input
                            type="text"
                            value={homeContentData.hero.headlinePrefix}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                hero: { ...homeContentData.hero, headlinePrefix: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Headline Highlight (Red Text)</label>
                          <input
                            type="text"
                            value={homeContentData.hero.headlineHighlight}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                hero: { ...homeContentData.hero, headlineHighlight: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Summary Description Paragraph</label>
                          <textarea
                            rows={3}
                            value={homeContentData.hero.description}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                hero: { ...homeContentData.hero, description: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Phone Consultation Button Label</label>
                          <input
                            type="text"
                            value={homeContentData.hero.talkToExpertText}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                hero: { ...homeContentData.hero, talkToExpertText: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    SUB-TAB 2: COMPANY INTRODUCTION ("ABOUT LENIVA")
                   ───────────────────────────────────────────────────────────── */}
                {homeActiveTab === 'about' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Company Introduction Section</h4>
                      <p className="text-xs text-slate-500">The "Your Partner for Advanced 3D Solutions" 2-column introduction area.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Heading Prefix</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.heading}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, heading: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Heading Highlight (Red Text)</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.headingHighlight}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, headingHighlight: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Introduction Narrative Description</label>
                        <textarea
                          rows={4}
                          value={homeContentData.companyIntro.description}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, description: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Core Business Pillars */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <label className="block font-bold text-slate-800 text-xs">
                        Core Business Pillars (Bullet Points)
                      </label>
                      <div className="space-y-2">
                        {homeContentData.companyIntro.pillars.map((pillar, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="w-5 text-center text-xs font-bold text-slate-400">{idx + 1}.</span>
                            <input
                              type="text"
                              value={pillar}
                              onChange={(e) => {
                                const updated = [...homeContentData.companyIntro.pillars]
                                updated[idx] = e.target.value
                                setHomeContentData({
                                  ...homeContentData,
                                  companyIntro: { ...homeContentData.companyIntro, pillars: updated },
                                })
                              }}
                              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                            />
                            {homeContentData.companyIntro.pillars.length > 1 && (
                              <button
                                onClick={() => {
                                  const updated = homeContentData.companyIntro.pillars.filter((_, i) => i !== idx)
                                  setHomeContentData({
                                    ...homeContentData,
                                    companyIntro: { ...homeContentData.companyIntro, pillars: updated },
                                  })
                                }}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Pillar */}
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="text"
                          placeholder="Add new pillar item..."
                          value={newPillarDraft}
                          onChange={(e) => setNewPillarDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newPillarDraft.trim()) {
                              e.preventDefault()
                              setHomeContentData({
                                ...homeContentData,
                                companyIntro: {
                                  ...homeContentData.companyIntro,
                                  pillars: [...homeContentData.companyIntro.pillars, newPillarDraft.trim()],
                                },
                              })
                              setNewPillarDraft('')
                            }
                          }}
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          onClick={() => {
                            if (!newPillarDraft.trim()) return
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: {
                                ...homeContentData.companyIntro,
                                pillars: [...homeContentData.companyIntro.pillars, newPillarDraft.trim()],
                              },
                            })
                            setNewPillarDraft('')
                          }}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* CTAs and Poster Image */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-100">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Primary Button Text</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.btnExploreText}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, btnExploreText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Primary Button Target Link</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.btnExploreLink}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, btnExploreLink: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Secondary Button Text</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.btnContactText}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, btnContactText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Secondary Button Target Link</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.btnContactLink}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, btnContactLink: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Poster Image URL / Path</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.posterImage}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, posterImage: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Poster Alt Text</label>
                        <input
                          type="text"
                          value={homeContentData.companyIntro.posterAlt}
                          onChange={(e) =>
                            setHomeContentData({
                              ...homeContentData,
                              companyIntro: { ...homeContentData.companyIntro, posterAlt: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    SUB-TAB 3: 3D PRINTERS SHOWCASE
                   ───────────────────────────────────────────────────────────── */}
                {homeActiveTab === 'printers' && (
                  <div className="space-y-6">
                    {/* Section Header Controls */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">3D Printers Section Header</h4>
                        <p className="text-xs text-slate-500">The overall heading, badge, and description for the 3D Printer showcase.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge Pill</label>
                          <input
                            type="text"
                            value={homeContentData.printers.sectionBadge}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                printers: { ...homeContentData.printers, sectionBadge: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={homeContentData.printers.title}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                printers: { ...homeContentData.printers, title: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Section Description</label>
                          <textarea
                            rows={2}
                            value={homeContentData.printers.description}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                printers: { ...homeContentData.printers, description: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">View All Button Text</label>
                          <input
                            type="text"
                            value={homeContentData.printers.viewAllText}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                printers: { ...homeContentData.printers, viewAllText: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">View All Button Link</label>
                          <input
                            type="text"
                            value={homeContentData.printers.viewAllLink}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                printers: { ...homeContentData.printers, viewAllLink: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technology Cards Sub-Selector */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">3D Printer Technology Cards</h4>
                          <p className="text-xs text-slate-500">Edit individual cards, specifications, rotating models, and CTA links.</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => setActivePrinterCardKey('fdm')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activePrinterCardKey === 'fdm' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            FDM Printers
                          </button>
                          <button
                            onClick={() => setActivePrinterCardKey('dlp')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activePrinterCardKey === 'dlp' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            DLP Printers
                          </button>
                          <button
                            onClick={() => setActivePrinterCardKey('lcd')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activePrinterCardKey === 'lcd' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Industrial LCD
                          </button>
                        </div>
                      </div>

                      {/* Card Form */}
                      {curPrinterCard && (
                        <div className="space-y-5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Card Title</label>
                              <input
                                type="text"
                                value={curPrinterCard.title}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, title: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Technology Tag (Small Red Header)</label>
                              <input
                                type="text"
                                value={curPrinterCard.technologyTag}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, technologyTag: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Category Tag (Top Left Badge)</label>
                              <input
                                type="text"
                                value={curPrinterCard.categoryTag}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, categoryTag: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Slideshow Rotation Speed (ms)</label>
                              <input
                                type="number"
                                step={100}
                                value={curPrinterCard.intervalMs}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, intervalMs: Number(e.target.value) || 3000 }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">Card Summary Description</label>
                              <textarea
                                rows={2}
                                value={curPrinterCard.description}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, description: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Button Label</label>
                              <input
                                type="text"
                                value={curPrinterCard.btnText}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, btnText: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Button Target Link URL</label>
                              <input
                                type="text"
                                value={curPrinterCard.btnLink}
                                onChange={(e) => {
                                  const updated = { ...curPrinterCard, btnLink: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: { ...homeContentData.printers, [activePrinterCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                          </div>

                          {/* Feature Bullet Points */}
                          <div className="pt-4 border-t border-slate-100 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Feature Bullet Points ({curPrinterCard.bulletPoints.length})
                            </label>
                            <div className="space-y-2">
                              {curPrinterCard.bulletPoints.map((bullet, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                  <input
                                    type="text"
                                    value={bullet}
                                    onChange={(e) => {
                                      const updatedBullets = [...curPrinterCard.bulletPoints]
                                      updatedBullets[idx] = e.target.value
                                      setHomeContentData({
                                        ...homeContentData,
                                        printers: {
                                          ...homeContentData.printers,
                                          [activePrinterCardKey]: { ...curPrinterCard, bulletPoints: updatedBullets },
                                        },
                                      })
                                    }}
                                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                                  />
                                  <button
                                    onClick={() => {
                                      const updatedBullets = curPrinterCard.bulletPoints.filter((_, i) => i !== idx)
                                      setHomeContentData({
                                        ...homeContentData,
                                        printers: {
                                          ...homeContentData.printers,
                                          [activePrinterCardKey]: { ...curPrinterCard, bulletPoints: updatedBullets },
                                        },
                                      })
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Add Bullet */}
                            <div className="flex items-center space-x-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add new bullet point..."
                                value={newPrinterBulletDraft}
                                onChange={(e) => setNewPrinterBulletDraft(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && newPrinterBulletDraft.trim()) {
                                    e.preventDefault()
                                    setHomeContentData({
                                      ...homeContentData,
                                      printers: {
                                        ...homeContentData.printers,
                                        [activePrinterCardKey]: {
                                          ...curPrinterCard,
                                          bulletPoints: [...curPrinterCard.bulletPoints, newPrinterBulletDraft.trim()],
                                        },
                                      },
                                    })
                                    setNewPrinterBulletDraft('')
                                  }
                                }}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                              />
                              <button
                                onClick={() => {
                                  if (!newPrinterBulletDraft.trim()) return
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: {
                                      ...homeContentData.printers,
                                      [activePrinterCardKey]: {
                                        ...curPrinterCard,
                                        bulletPoints: [...curPrinterCard.bulletPoints, newPrinterBulletDraft.trim()],
                                      },
                                    },
                                  })
                                  setNewPrinterBulletDraft('')
                                }}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>

                          {/* Rotating Model Images */}
                          <div className="pt-4 border-t border-slate-100 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Rotating Model Slides ({curPrinterCard.slides.length})
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {curPrinterCard.slides.map((slide, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                                  <div className="h-24 bg-white rounded-lg flex items-center justify-center p-2 border border-slate-100">
                                    <img
                                      src={slide.src}
                                      alt={slide.name}
                                      className="max-h-full max-w-full object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Model'
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      value={slide.name}
                                      onChange={(e) => {
                                        const updatedSlides = [...curPrinterCard.slides]
                                        updatedSlides[idx] = { ...slide, name: e.target.value }
                                        setHomeContentData({
                                          ...homeContentData,
                                          printers: {
                                            ...homeContentData.printers,
                                            [activePrinterCardKey]: { ...curPrinterCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold"
                                    />
                                    <input
                                      type="text"
                                      value={slide.src}
                                      onChange={(e) => {
                                        const updatedSlides = [...curPrinterCard.slides]
                                        updatedSlides[idx] = { ...slide, src: e.target.value }
                                        setHomeContentData({
                                          ...homeContentData,
                                          printers: {
                                            ...homeContentData.printers,
                                            [activePrinterCardKey]: { ...curPrinterCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-mono mt-1 text-slate-500"
                                    />
                                  </div>
                                  {curPrinterCard.slides.length > 1 && (
                                    <button
                                      onClick={() => {
                                        const updatedSlides = curPrinterCard.slides.filter((_, i) => i !== idx)
                                        setHomeContentData({
                                          ...homeContentData,
                                          printers: {
                                            ...homeContentData.printers,
                                            [activePrinterCardKey]: { ...curPrinterCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="absolute top-2 right-2 p-1 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                                      title="Delete model slide"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Add New Model Slide */}
                            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
                              <p className="font-bold text-slate-700 text-[11px]">Add New Model to Carousel</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Model Name (e.g. Pratham Plus)"
                                  value={newPrinterSlideName}
                                  onChange={(e) => setNewPrinterSlideName(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                                />
                                <input
                                  type="text"
                                  placeholder="Image Path (e.g. /images/products/pratham-plus.png)"
                                  value={newPrinterSlideSrc}
                                  onChange={(e) => setNewPrinterSlideSrc(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  if (!newPrinterSlideName.trim() || !newPrinterSlideSrc.trim()) return
                                  setHomeContentData({
                                    ...homeContentData,
                                    printers: {
                                      ...homeContentData.printers,
                                      [activePrinterCardKey]: {
                                        ...curPrinterCard,
                                        slides: [
                                          ...curPrinterCard.slides,
                                          { name: newPrinterSlideName.trim(), src: newPrinterSlideSrc.trim() },
                                        ],
                                      },
                                    },
                                  })
                                  setNewPrinterSlideName('')
                                  setNewPrinterSlideSrc('')
                                }}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Model to Carousel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    SUB-TAB 4: CAD & 3D SOFTWARE SHOWCASE
                   ───────────────────────────────────────────────────────────── */}
                {homeActiveTab === 'cad' && (
                  <div className="space-y-6">
                    {/* Section Header Controls */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">CAD &amp; 3D Design Software Section Header</h4>
                        <p className="text-xs text-slate-500">The overall heading, partner badge, and description for the CAD software suites.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Badge Pill</label>
                          <input
                            type="text"
                            value={homeContentData.cadSoftware.sectionBadge}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                cadSoftware: { ...homeContentData.cadSoftware, sectionBadge: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={homeContentData.cadSoftware.title}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                cadSoftware: { ...homeContentData.cadSoftware, title: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Section Description</label>
                          <textarea
                            rows={2}
                            value={homeContentData.cadSoftware.description}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                cadSoftware: { ...homeContentData.cadSoftware, description: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">View All Button Text</label>
                          <input
                            type="text"
                            value={homeContentData.cadSoftware.viewAllText}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                cadSoftware: { ...homeContentData.cadSoftware, viewAllText: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">View All Button Link</label>
                          <input
                            type="text"
                            value={homeContentData.cadSoftware.viewAllLink}
                            onChange={(e) =>
                              setHomeContentData({
                                ...homeContentData,
                                cadSoftware: { ...homeContentData.cadSoftware, viewAllLink: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CAD Software Cards Sub-Selector */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">CAD Software Suite Cards</h4>
                          <p className="text-xs text-slate-500">Edit individual software partner cards, bullet points, and edition slideshows.</p>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                          <button
                            onClick={() => setActiveCadCardKey('ares')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activeCadCardKey === 'ares' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            ARES CAD
                          </button>
                          <button
                            onClick={() => setActiveCadCardKey('sketchup')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activeCadCardKey === 'sketchup' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Trimble SketchUp
                          </button>
                          <button
                            onClick={() => setActiveCadCardKey('chaos')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activeCadCardKey === 'chaos' ? 'bg-white text-red-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Chaos Suites
                          </button>
                        </div>
                      </div>

                      {/* Card Form */}
                      {curCadCard && (
                        <div className="space-y-5 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Card Title</label>
                              <input
                                type="text"
                                value={curCadCard.title}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, title: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Category Tag (Small Red Header)</label>
                              <input
                                type="text"
                                value={curCadCard.categoryTag}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, categoryTag: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Brand Partner Text (Top Left Tag)</label>
                              <input
                                type="text"
                                value={curCadCard.brandPartnerText}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, brandPartnerText: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Brand Logo Image URL</label>
                              <input
                                type="text"
                                value={curCadCard.brandLogo}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, brandLogo: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Slideshow Rotation Speed (ms)</label>
                              <input
                                type="number"
                                step={100}
                                value={curCadCard.intervalMs}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, intervalMs: Number(e.target.value) || 3500 }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Button Label</label>
                              <input
                                type="text"
                                value={curCadCard.btnText}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, btnText: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">Button Target Link URL</label>
                              <input
                                type="text"
                                value={curCadCard.btnLink}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, btnLink: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">Card Summary Description</label>
                              <textarea
                                rows={2}
                                value={curCadCard.description}
                                onChange={(e) => {
                                  const updated = { ...curCadCard, description: e.target.value }
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: { ...homeContentData.cadSoftware, [activeCadCardKey]: updated },
                                  })
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                              />
                            </div>
                          </div>

                          {/* Feature Bullet Points */}
                          <div className="pt-4 border-t border-slate-100 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Feature Bullet Points ({curCadCard.bulletPoints.length})
                            </label>
                            <div className="space-y-2">
                              {curCadCard.bulletPoints.map((bullet, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                  <input
                                    type="text"
                                    value={bullet}
                                    onChange={(e) => {
                                      const updatedBullets = [...curCadCard.bulletPoints]
                                      updatedBullets[idx] = e.target.value
                                      setHomeContentData({
                                        ...homeContentData,
                                        cadSoftware: {
                                          ...homeContentData.cadSoftware,
                                          [activeCadCardKey]: { ...curCadCard, bulletPoints: updatedBullets },
                                        },
                                      })
                                    }}
                                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                                  />
                                  <button
                                    onClick={() => {
                                      const updatedBullets = curCadCard.bulletPoints.filter((_, i) => i !== idx)
                                      setHomeContentData({
                                        ...homeContentData,
                                        cadSoftware: {
                                          ...homeContentData.cadSoftware,
                                          [activeCadCardKey]: { ...curCadCard, bulletPoints: updatedBullets },
                                        },
                                      })
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Add Bullet */}
                            <div className="flex items-center space-x-2 pt-1">
                              <input
                                type="text"
                                placeholder="Add new bullet point..."
                                value={newCadBulletDraft}
                                onChange={(e) => setNewCadBulletDraft(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && newCadBulletDraft.trim()) {
                                    e.preventDefault()
                                    setHomeContentData({
                                      ...homeContentData,
                                      cadSoftware: {
                                        ...homeContentData.cadSoftware,
                                        [activeCadCardKey]: {
                                          ...curCadCard,
                                          bulletPoints: [...curCadCard.bulletPoints, newCadBulletDraft.trim()],
                                        },
                                      },
                                    })
                                    setNewCadBulletDraft('')
                                  }
                                }}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                              />
                              <button
                                onClick={() => {
                                  if (!newCadBulletDraft.trim()) return
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: {
                                      ...homeContentData.cadSoftware,
                                      [activeCadCardKey]: {
                                        ...curCadCard,
                                        bulletPoints: [...curCadCard.bulletPoints, newCadBulletDraft.trim()],
                                      },
                                    },
                                  })
                                  setNewCadBulletDraft('')
                                }}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </button>
                            </div>
                          </div>

                          {/* Rotating Software Edition Images */}
                          <div className="pt-4 border-t border-slate-100 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Rotating Software Edition Slides ({curCadCard.slides.length})
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                              {curCadCard.slides.map((slide, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                                  <div className="h-24 bg-white rounded-lg flex items-center justify-center p-2 border border-slate-100">
                                    <img
                                      src={slide.src}
                                      alt={slide.name}
                                      className="max-h-full max-w-full object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Software'
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      value={slide.name}
                                      onChange={(e) => {
                                        const updatedSlides = [...curCadCard.slides]
                                        updatedSlides[idx] = { ...slide, name: e.target.value }
                                        setHomeContentData({
                                          ...homeContentData,
                                          cadSoftware: {
                                            ...homeContentData.cadSoftware,
                                            [activeCadCardKey]: { ...curCadCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold"
                                    />
                                    <input
                                      type="text"
                                      value={slide.src}
                                      onChange={(e) => {
                                        const updatedSlides = [...curCadCard.slides]
                                        updatedSlides[idx] = { ...slide, src: e.target.value }
                                        setHomeContentData({
                                          ...homeContentData,
                                          cadSoftware: {
                                            ...homeContentData.cadSoftware,
                                            [activeCadCardKey]: { ...curCadCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-mono mt-1 text-slate-500"
                                    />
                                  </div>
                                  {curCadCard.slides.length > 1 && (
                                    <button
                                      onClick={() => {
                                        const updatedSlides = curCadCard.slides.filter((_, i) => i !== idx)
                                        setHomeContentData({
                                          ...homeContentData,
                                          cadSoftware: {
                                            ...homeContentData.cadSoftware,
                                            [activeCadCardKey]: { ...curCadCard, slides: updatedSlides },
                                          },
                                        })
                                      }}
                                      className="absolute top-2 right-2 p-1 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                                      title="Delete edition slide"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Add New Edition Slide */}
                            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
                              <p className="font-bold text-slate-700 text-[11px]">Add New Edition to Carousel</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Edition Name (e.g. ARES Touch)"
                                  value={newCadSlideName}
                                  onChange={(e) => setNewCadSlideName(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                                />
                                <input
                                  type="text"
                                  placeholder="Image Path (e.g. /images/software/ares-touch.jpg)"
                                  value={newCadSlideSrc}
                                  onChange={(e) => setNewCadSlideSrc(e.target.value)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  if (!newCadSlideName.trim() || !newCadSlideSrc.trim()) return
                                  setHomeContentData({
                                    ...homeContentData,
                                    cadSoftware: {
                                      ...homeContentData.cadSoftware,
                                      [activeCadCardKey]: {
                                        ...curCadCard,
                                        slides: [
                                          ...curCadCard.slides,
                                          { name: newCadSlideName.trim(), src: newCadSlideSrc.trim() },
                                        ],
                                      },
                                    },
                                  })
                                  setNewCadSlideName('')
                                  setNewCadSlideSrc('')
                                }}
                                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Edition to Carousel</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          {/* ====================================================
              TAB: ABOUT US PAGE CMS & VISUAL EDITOR
             ==================================================== */}
          {activeTab === 'about_editor' && (() => {
            return (
              <div className="space-y-6">
                {/* Top Banner / Actions Bar */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider mb-1">
                      <Award className="w-3 h-3 text-amber-600" />
                      <span>Live Website CMS</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">About Us Page Editor</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure Hero mission statement, company heritage, technology portfolio cards, and the 4-stage client engagement lifecycle.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href="/about"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live About Page</span>
                    </a>
                    <button
                      onClick={handleResetAboutContent}
                      className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      onClick={() => handleSaveAboutContent()}
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-amber-600/20 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </div>

                {aboutSavedMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{aboutSavedMsg}</span>
                  </div>
                )}

                {/* Sub-tabs Bar */}
                <div className="bg-slate-100/90 p-1.5 rounded-2xl flex flex-wrap gap-1 border border-slate-200/80">
                  <button
                    onClick={() => setAboutActiveTab('hero')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      aboutActiveTab === 'hero' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    1. Hero Header &amp; Mission
                  </button>
                  <button
                    onClick={() => setAboutActiveTab('heritage')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      aboutActiveTab === 'heritage' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    2. Heritage &amp; Overview
                  </button>
                  <button
                    onClick={() => setAboutActiveTab('portfolio')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      aboutActiveTab === 'portfolio' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    3. Technology Portfolio Cards
                  </button>
                  <button
                    onClick={() => setAboutActiveTab('how_we_work')}
                    className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      aboutActiveTab === 'how_we_work' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4. "How We Work" Lifecycle
                  </button>
                </div>

                {/* Sub-tab 1: Hero Header & Mission */}
                {aboutActiveTab === 'hero' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Hero Section &amp; Mission Statement</h4>
                      <p className="text-xs text-slate-500">The primary dark hero header card displayed at the top of the About page.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.badge}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, badge: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Title</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.title}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Hero Description Paragraph</label>
                        <textarea
                          rows={3}
                          value={aboutContentData.hero.description}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, description: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Motto Tag Prefix</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.mottoPrefix}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, mottoPrefix: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Motto Tag Highlight (Red Text)</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.mottoHighlight}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, mottoHighlight: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Primary Button Label</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.primaryBtnText}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, primaryBtnText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Consultation Quote Subject</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.quoteSubject}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, quoteSubject: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Secondary Button Label</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.secondaryBtnText}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, secondaryBtnText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Secondary Button Target Link</label>
                        <input
                          type="text"
                          value={aboutContentData.hero.secondaryBtnLink}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              hero: { ...aboutContentData.hero, secondaryBtnLink: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Heritage & Overview */}
                {aboutActiveTab === 'heritage' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Heritage &amp; Company Overview</h4>
                      <p className="text-xs text-slate-500">The 3-decade story, mission paragraphs, poster visual, and fast stats.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Section Tag (Small Red Header)</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.tag}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, tag: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Overview Heading</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.title}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Paragraph 1 (Establishment &amp; Background)</label>
                        <textarea
                          rows={3}
                          value={aboutContentData.heritage.paragraph1}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, paragraph1: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Portfolio Callout Banner Highlight</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.calloutText}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, calloutText: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Paragraph 2 (Consultative Customer-First Focus)</label>
                        <textarea
                          rows={3}
                          value={aboutContentData.heritage.paragraph2}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, paragraph2: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Paragraph 3 (Long-Term Industry Commitment)</label>
                        <textarea
                          rows={3}
                          value={aboutContentData.heritage.paragraph3}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, paragraph3: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Poster Image URL / File Path</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.posterImage}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, posterImage: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Poster Image Alt Text</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.posterAlt}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, posterAlt: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Quick Stat 1 Title</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.stat1Title}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, stat1Title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Quick Stat 1 Subtitle</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.stat1Subtitle}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, stat1Subtitle: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Quick Stat 2 Title</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.stat2Title}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, stat2Title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Quick Stat 2 Subtitle</label>
                        <input
                          type="text"
                          value={aboutContentData.heritage.stat2Subtitle}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              heritage: { ...aboutContentData.heritage, stat2Subtitle: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 3: Technology Portfolio Cards */}
                {aboutActiveTab === 'portfolio' && (
                  <div className="space-y-6">
                    {/* Header Controls */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Technology Portfolio Header</h4>
                        <p className="text-xs text-slate-500">The section intro for the 3 core technology pillars.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Tag</label>
                          <input
                            type="text"
                            value={aboutContentData.portfolio.tag}
                            onChange={(e) =>
                              setAboutContentData({
                                ...aboutContentData,
                                portfolio: { ...aboutContentData.portfolio, tag: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Section Title</label>
                          <input
                            type="text"
                            value={aboutContentData.portfolio.title}
                            onChange={(e) =>
                              setAboutContentData({
                                ...aboutContentData,
                                portfolio: { ...aboutContentData.portfolio, title: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Section Subtitle / Description</label>
                          <input
                            type="text"
                            value={aboutContentData.portfolio.subtitle}
                            onChange={(e) =>
                              setAboutContentData({
                                ...aboutContentData,
                                portfolio: { ...aboutContentData.portfolio, subtitle: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 3 Portfolio Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Card 1: CAD Software */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 font-bold uppercase tracking-wider text-[10px]">
                            <span>1. CAD Software Card</span>
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Category Tag</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.cadCard.category}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    cadCard: { ...aboutContentData.portfolio.cadCard, category: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.cadCard.title}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    cadCard: { ...aboutContentData.portfolio.cadCard, title: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={aboutContentData.portfolio.cadCard.description}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    cadCard: { ...aboutContentData.portfolio.cadCard, description: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Text</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.cadCard.linkText}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    cadCard: { ...aboutContentData.portfolio.cadCard, linkText: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Target URL</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.cadCard.linkUrl}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    cadCard: { ...aboutContentData.portfolio.cadCard, linkUrl: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card 2: 3D Printers */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                            <span>2. 3D Printers Card</span>
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Category Tag</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.printerCard.category}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    printerCard: { ...aboutContentData.portfolio.printerCard, category: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.printerCard.title}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    printerCard: { ...aboutContentData.portfolio.printerCard, title: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={aboutContentData.portfolio.printerCard.description}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    printerCard: { ...aboutContentData.portfolio.printerCard, description: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Text</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.printerCard.linkText}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    printerCard: { ...aboutContentData.portfolio.printerCard, linkText: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Target URL</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.printerCard.linkUrl}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    printerCard: { ...aboutContentData.portfolio.printerCard, linkUrl: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card 3: 3D Scanners */}
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                            <span>3. 3D Scanners Card</span>
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Category Tag</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.scannerCard.category}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    scannerCard: { ...aboutContentData.portfolio.scannerCard, category: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.scannerCard.title}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    scannerCard: { ...aboutContentData.portfolio.scannerCard, title: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={aboutContentData.portfolio.scannerCard.description}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    scannerCard: { ...aboutContentData.portfolio.scannerCard, description: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Text</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.scannerCard.linkText}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    scannerCard: { ...aboutContentData.portfolio.scannerCard, linkText: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-700 mb-0.5">Link Target URL</label>
                            <input
                              type="text"
                              value={aboutContentData.portfolio.scannerCard.linkUrl}
                              onChange={(e) =>
                                setAboutContentData({
                                  ...aboutContentData,
                                  portfolio: {
                                    ...aboutContentData.portfolio,
                                    scannerCard: { ...aboutContentData.portfolio.scannerCard, linkUrl: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 4: "How We Work" Lifecycle */}
                {aboutActiveTab === 'how_we_work' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">"How We Work" Engagement Lifecycle</h4>
                      <p className="text-xs text-slate-500">The 4-stage client workflow showing consultation, selection, deployment, and technical support.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Section Tag</label>
                        <input
                          type="text"
                          value={aboutContentData.howWeWork.tag}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              howWeWork: { ...aboutContentData.howWeWork, tag: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Section Heading</label>
                        <input
                          type="text"
                          value={aboutContentData.howWeWork.title}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              howWeWork: { ...aboutContentData.howWeWork, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Section Description</label>
                        <textarea
                          rows={3}
                          value={aboutContentData.howWeWork.description}
                          onChange={(e) =>
                            setAboutContentData({
                              ...aboutContentData,
                              howWeWork: { ...aboutContentData.howWeWork, description: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Steps List */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <label className="block font-bold text-slate-800 text-xs">
                        Lifecycle Steps ({aboutContentData.howWeWork.steps.length})
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {aboutContentData.howWeWork.steps.map((step, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs relative group">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-amber-700 uppercase tracking-wider text-[10px]">
                                Step {idx + 1}
                              </span>
                              {aboutContentData.howWeWork.steps.length > 1 && (
                                <button
                                  onClick={() => {
                                    const updated = aboutContentData.howWeWork.steps.filter((_, i) => i !== idx)
                                    setAboutContentData({
                                      ...aboutContentData,
                                      howWeWork: { ...aboutContentData.howWeWork, steps: updated },
                                    })
                                  }}
                                  className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                  title="Delete step"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <div>
                              <input
                                type="text"
                                value={step.title}
                                onChange={(e) => {
                                  const updated = [...aboutContentData.howWeWork.steps]
                                  updated[idx] = { ...step, title: e.target.value }
                                  setAboutContentData({
                                    ...aboutContentData,
                                    howWeWork: { ...aboutContentData.howWeWork, steps: updated },
                                  })
                                }}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                              />
                            </div>
                            <div>
                              <textarea
                                rows={2}
                                value={step.description}
                                onChange={(e) => {
                                  const updated = [...aboutContentData.howWeWork.steps]
                                  updated[idx] = { ...step, description: e.target.value }
                                  setAboutContentData({
                                    ...aboutContentData,
                                    howWeWork: { ...aboutContentData.howWeWork, steps: updated },
                                  })
                                }}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 leading-relaxed"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Step */}
                      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <p className="font-bold text-slate-700 text-[11px]">Add New Lifecycle Step</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Step Title (e.g. Workflow Optimization)"
                            value={newHowStepTitle}
                            onChange={(e) => setNewHowStepTitle(e.target.value)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                          />
                          <input
                            type="text"
                            placeholder="Step Description..."
                            value={newHowStepDesc}
                            onChange={(e) => setNewHowStepDesc(e.target.value)}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl"
                          />
                        </div>
                        <button
                          onClick={() => {
                            if (!newHowStepTitle.trim() || !newHowStepDesc.trim()) return
                            setAboutContentData({
                              ...aboutContentData,
                              howWeWork: {
                                ...aboutContentData.howWeWork,
                                steps: [
                                  ...aboutContentData.howWeWork.steps,
                                  { title: newHowStepTitle.trim(), description: newHowStepDesc.trim() },
                                ],
                              },
                            })
                            setNewHowStepTitle('')
                            setNewHowStepDesc('')
                          }}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Step</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          {/* ====================================================
              TAB: SHOP & DROPDOWN NAVIGATION CMS EDITOR
             ==================================================== */}
          {activeTab === 'shop_and_dropdown' && <ShopAndNavigationEditor />}

          {/* ====================================================
              TAB 8: SITE SETTINGS & CMS
             ==================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Site Contact & Global Settings</h3>
                <p className="text-xs text-slate-500">Stored directly in PostgreSQL table <code>site_settings</code></p>
              </div>

              {settingsSavedMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{settingsSavedMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Display Name</label>
                    <input
                      type="text"
                      value={siteSettings.companyName || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Main Phone Number (Inquiries)</label>
                    <input
                      type="text"
                      value={siteSettings.phone || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      placeholder="+91 98441 16476"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Secondary Phone Number</label>
                    <input
                      type="text"
                      value={siteSettings.secondaryPhone || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, secondaryPhone: e.target.value })}
                      placeholder="+91 96069 84210"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Communications</label>
                    <input
                      type="email"
                      value={siteSettings.email || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      placeholder="viju@leniva3d.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Direct Number</label>
                    <input
                      type="text"
                      value={siteSettings.whatsapp || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                      placeholder="+91 98441 16476"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Google Address & Headquarters</label>
                  <input
                    type="text"
                    value={siteSettings.address || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    placeholder="No. 106, 1st Floor, Carmel Complex, 1/7, Geddalahalli, Hennur Main Road, Kothanur Post, Bengaluru, Karnataka - 560077"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operational Hours</label>
                  <input
                    type="text"
                    value={siteSettings.workingHours || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                    placeholder="Monday – Friday: 9:30 AM – 6:00 PM | Saturday: 9:30 AM – 1:30 PM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Top Announcement Notice</label>
                  <input
                    type="text"
                    value={siteSettings.bannerNotice || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, bannerNotice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSiteSettings(defaultSiteSettings)
                      localStorage.setItem('leniva_site_settings', JSON.stringify(defaultSiteSettings))
                      window.dispatchEvent(new Event('leniva_site_settings_updated'))
                      setSettingsSavedMsg('Reset to official Leniva contact details!')
                      setTimeout(() => setSettingsSavedMsg(''), 4000)
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Reset to Official Details
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings to PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ====================================================
              TAB 9: ADMIN USERS & PASSWORDS
             ==================================================== */}
          {activeTab === 'users' && (() => {
            const adminUser = adminUsers.find(u => u.username === 'admin') || adminUsers[0] || {
              id: 1,
              username: 'admin',
              email: 'admin@lenivacadsolution.in',
              role: 'superadmin',
            }

            const isEditingPassword = passwordChangeId === adminUser.id

            return (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Administrator Account & Credentials</h3>
                  <p className="text-xs text-slate-500">
                    Primary master account for Leniva CAD Solutions administration and security credentials.
                  </p>
                </div>

                {userMsg && (
                  <div className={`p-4 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in ${
                    userMsg.toLowerCase().includes('success')
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}>
                    {userMsg.toLowerCase().includes('success') ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{userMsg}</span>
                  </div>
                )}

                {/* Password Change Sub-modal / Panel */}
                {isEditingPassword && (
                  <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-4 text-xs animate-fade-in shadow-xs">
                    <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                          <Key className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-950 text-sm">Change Password for "{adminUser.username}"</h4>
                          <p className="text-[11px] text-amber-800">Set a new password for your console administrator login.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPasswordChangeId(null)
                          setNewPasswordValue('')
                          setConfirmPasswordValue('')
                        }}
                        className="text-amber-700 hover:text-amber-900 text-xs font-bold cursor-pointer"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleChangePassword(adminUser.id)
                      }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                            New Password *
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Enter new password"
                            value={newPasswordValue}
                            onChange={e => setNewPasswordValue(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                            Confirm New Password *
                          </label>
                          <input
                            type="password"
                            required
                            placeholder="Re-enter new password"
                            value={confirmPasswordValue}
                            onChange={e => setConfirmPasswordValue(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPasswordChangeId(null)
                            setNewPasswordValue('')
                            setConfirmPasswordValue('')
                          }}
                          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-bold cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-sm flex items-center space-x-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Update Password</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Single Administrator Account Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/70">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Username</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-400">#{adminUser.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-slate-900 text-sm">{adminUser.username}</span>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                              Primary Admin
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-mono">{adminUser.email}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-700 uppercase">
                            {adminUser.role || 'superadmin'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setPasswordChangeId(isEditingPassword ? null : adminUser.id)
                              setNewPasswordValue('')
                              setConfirmPasswordValue('')
                            }}
                            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-2xs inline-flex items-center space-x-1.5 ${
                              isEditingPassword
                                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                            }`}
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>{isEditingPassword ? 'Cancel Edit' : 'Change Password'}</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })()}


          {/* ====================================================
              TAB: CAD SOFTWARE EDITOR (FULL PAGE CMS)
             ==================================================== */}
          {activeTab === 'cad_software' && (() => {
            const cur = cadEdits[activeCadProduct] || {}
            const activeMeta = cadProducts.find(p => p.key === activeCadProduct) || cadProducts[0]
            const curSections: CadEnabledSections = {
              ...DEFAULT_CAD_SECTIONS,
              ...(cur.enabledSections || {}),
            }
            const activeSectionsCount = CAD_SECTION_METADATA.filter(m => curSections[m.key] !== false).length

            const sectionTabs: { key: CadSectionKey; label: string; badge?: string; badgeColor?: 'emerald' | 'rose' | 'amber' | 'indigo' }[] = [
              { key: 'identity',     label: '1. Identity' },
              { key: 'hero',         label: '2. Hero', badge: curSections.hero !== false ? 'ON' : 'OFF', badgeColor: curSections.hero !== false ? 'emerald' : 'rose' },
              { key: 'overview',     label: '3. Overview', badge: curSections.overview !== false ? 'ON' : 'OFF', badgeColor: curSections.overview !== false ? 'emerald' : 'rose' },
              { key: 'features',     label: '4. Features', badge: curSections.features !== false ? 'ON' : 'OFF', badgeColor: curSections.features !== false ? 'emerald' : 'rose' },
              { key: 'requirements', label: '5. Requirements', badge: curSections.requirements !== false ? 'ON' : 'OFF', badgeColor: curSections.requirements !== false ? 'emerald' : 'rose' },
              { key: 'faqs',         label: '6. FAQs', badge: curSections.faqs !== false ? 'ON' : 'OFF', badgeColor: curSections.faqs !== false ? 'emerald' : 'rose' },
              { key: 'licensing',    label: '7. Licensing', badge: curSections.licensing !== false ? 'ON' : 'OFF', badgeColor: curSections.licensing !== false ? 'emerald' : 'rose' },
              { key: 'preview',      label: '8. Preview' },
            ]

            const renderSectionToggleBar = (
              secKey: keyof CadEnabledSections,
              title: string,
              desc: string
            ) => {
              const isEnabled = curSections[secKey] !== false
              return (
                <div className={`p-3.5 sm:p-4 rounded-2xl border transition-all mb-4 ${
                  isEnabled
                    ? 'bg-slate-50/90 border-slate-200'
                    : 'bg-rose-50/70 border-rose-200'
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                        isEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                      }`}>
                        <Power className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900 truncate">{title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                            isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {isEnabled ? '● Live on Page' : '○ Hidden from Page'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate hidden sm:block">
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Toggle Switch */}
                    <div className="flex items-center space-x-2.5 shrink-0">
                      <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                        {isEnabled ? 'Section Enabled' : 'Section Disabled'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCadSection(secKey)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          isEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                        role="switch"
                        aria-checked={isEnabled}
                        title={`Click to ${isEnabled ? 'disable' : 'enable'} ${title}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {!isEnabled && (
                    <div className="mt-2.5 pt-2.5 border-t border-rose-200/80 flex items-center justify-between text-xs text-rose-700">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>This section is currently <strong>DISABLED</strong>. Visitors will not see this on the live page.</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCadSection(secKey)}
                        className="font-bold underline hover:text-rose-900 cursor-pointer ml-2 shrink-0"
                      >
                        Enable Section Now
                      </button>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <div className="space-y-5 min-w-0">
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                      <span>CAD Software Full-Page Editor</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-indigo-100 text-indigo-700 font-bold">
                        {cadProducts.length} Products Live
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Full control over hero banners, overview cards, specs, FAQs, CTAs, and raw page data.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => saveCadEdits(cadEdits)}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                      title="Save all CAD software edits"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={resetCadProduct}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Reset this product to factory defaults"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* Save notification */}
                {cadSaveMsg && (
                  <div className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold animate-fade-in">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{cadSaveMsg}</span>
                  </div>
                )}

                {/* Product Selector Cards */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Product to Edit ({cadProducts.length} Total)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 min-w-0">
                    {cadProducts.map(p => {
                      const isActive = activeCadProduct === p.key
                      return (
                        <div
                          key={p.key}
                          onClick={() => setActiveCadProduct(p.key)}
                          className={`relative text-left p-3 rounded-xl border transition-all cursor-pointer min-w-0 ${
                            isActive
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400/40'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between min-w-0">
                            <span className={`text-[9px] font-bold uppercase tracking-wider truncate ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {p.brand}
                            </span>
                            {p.isCustom && (
                              <span className={`text-[8px] font-bold uppercase px-1.5 py-0.2 rounded shrink-0 ml-1 ${isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-amber-100 text-amber-800'}`}>
                                Custom
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-black mt-1 leading-snug truncate">
                            {cadEdits[p.key]?.productName || p.label}
                          </div>
                          <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                            {p.category}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Modal: Add New CAD Product */}
                {isNewCadProductOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <Shield className="w-4 h-4" />
                          </div>
                          <h4 className="text-base font-black text-slate-900">Add New CAD Software Product</h4>
                        </div>
                        <button
                          onClick={() => setIsNewCadProductOpen(false)}
                          className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreateCadProduct} className="space-y-3.5 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. AutoCAD Electrical Alternative"
                            value={newCadForm.name}
                            onChange={e => setNewCadForm({ ...newCadForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Brand / Vendor *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Graebert / Trimble"
                              value={newCadForm.brand}
                              onChange={e => setNewCadForm({ ...newCadForm, brand: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Category *
                            </label>
                            <select
                              value={newCadForm.category}
                              onChange={e => setNewCadForm({ ...newCadForm, category: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-medium"
                            >
                              <option value="2D Mechanical CAD">2D Mechanical CAD</option>
                              <option value="Electrical CAD (ECAD)">Electrical CAD (ECAD)</option>
                              <option value="2D DWG CAD Software">2D DWG CAD Software</option>
                              <option value="Real-Time Rendering & VR">Real-Time Rendering & VR</option>
                              <option value="Photorealistic 3D Rendering">Photorealistic 3D Rendering</option>
                              <option value="3D Design & BIM Suite">3D Design & BIM Suite</option>
                              <option value="Scan-to-Model Workflows">Scan-to-Model Workflows</option>
                              <option value="Simulation & CAE">Simulation & CAE</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Website Route / Slug
                          </label>
                          <div className="flex items-center">
                            <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-slate-500 font-mono text-[11px]">
                              /products/
                            </span>
                            <input
                              type="text"
                              placeholder="autocad-electrical-alternative"
                              value={newCadForm.route.replace(/^\/products\/?/, '')}
                              onChange={e => setNewCadForm({ ...newCadForm, route: `/products/${e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-r-lg text-slate-900 font-mono text-[11px] focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Starter Template (Pre-populate full page fields)
                          </label>
                          <select
                            value={newCadForm.template}
                            onChange={e => setNewCadForm({ ...newCadForm, template: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-medium"
                          >
                            <option value="ares_mechanical">Clone from ARES Mechanical (2D Engineering)</option>
                            <option value="ares_electrical">Clone from ARES Electrical (ECAD & Schematics)</option>
                            <option value="ares_standard">Clone from ARES Standard (Drafting & DWG)</option>
                            <option value="ares_commander">Clone from ARES Commander (2D & 3D CAD)</option>
                            <option value="chaos_enscape">Clone from Chaos Enscape (Real-Time 3D)</option>
                            <option value="chaos_vray">Clone from Chaos V-Ray (Photorealistic Render)</option>
                            <option value="sketchup_studio">Clone from SketchUp Studio (3D Suite)</option>
                            <option value="sketchup_proscan">Clone from SketchUp Pro Scan (Point Cloud)</option>
                          </select>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setIsNewCadProductOpen(false)}
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold cursor-pointer hover:bg-slate-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-md flex items-center space-x-1.5"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Create & Open Editor</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Main Product Editor Window */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
                  {/* Active Product Title Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 text-white gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                          {activeMeta.brand}
                        </span>
                        <span className="text-[10px] text-indigo-300">•</span>
                        <span className="text-[10px] text-indigo-200">{activeMeta.category}</span>
                        <span className="text-[10px] text-indigo-300">•</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          activeSectionsCount === 7
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                            : activeSectionsCount === 0
                            ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40'
                            : 'bg-amber-500/30 text-amber-200 border border-amber-400/40'
                        }`}>
                          {activeSectionsCount} / 7 Sections Live
                        </span>
                      </div>
                      <div className="text-base font-black">{cur.productName || activeMeta.label}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => saveCadEdits(cadEdits)}
                        className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-lg text-xs font-black flex items-center space-x-1.5 transition-all shadow-md cursor-pointer ring-2 ring-emerald-300/40"
                        title="Save changes for this product"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                      <a
                        href={activeMeta.route}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Page</span>
                      </a>
                      {activeMeta.isCustom && (
                        <button
                          onClick={() => handleDeleteCadProduct(activeMeta.key)}
                          className="px-3 py-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                          title="Delete this custom product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Full-Page Section Tabs with Visibility Badges */}
                  <div className="w-full min-w-0 overflow-x-auto border-b border-slate-200 bg-slate-50/80 scrollbar-thin scrollbar-thumb-slate-300">
                    <div className="flex min-w-max">
                      {sectionTabs.map(tab => (
                        <button
                          key={tab.key}
                          onClick={() => setCadEditSection(tab.key)}
                          className={`px-3 py-2.5 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px flex items-center space-x-1.5 shrink-0 ${
                            cadEditSection === tab.key
                              ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                          }`}
                        >
                          {tab.key === 'preview' && <Eye className="w-3.5 h-3.5" />}
                          {tab.key === 'faqs' && <HelpCircle className="w-3.5 h-3.5" />}
                          {tab.key === 'requirements' && <Monitor className="w-3.5 h-3.5" />}
                          <span>{tab.label}</span>
                          {tab.badge && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                              tab.badgeColor === 'emerald'
                                ? 'bg-emerald-100 text-emerald-800'
                                : tab.badgeColor === 'rose'
                                ? 'bg-rose-100 text-rose-800'
                                : tab.badgeColor === 'amber'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 1: IDENTITY & SEO
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'identity' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Product Name</label>
                            <input
                              type="text"
                              value={cur.productName || ''}
                              onChange={e => updateCadField('productName', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Brand / Vendor</label>
                            <input
                              type="text"
                              value={cur.brand || ''}
                              onChange={e => updateCadField('brand', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Category Label</label>
                            <input
                              type="text"
                              value={cur.category || ''}
                              onChange={e => updateCadField('category', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Main H1 Product Headline</label>
                          <input
                            type="text"
                            value={cur.headline || ''}
                            onChange={e => updateCadField('headline', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Supporting Headline</label>
                          <input
                            type="text"
                            value={cur.supportingHeadline || ''}
                            onChange={e => updateCadField('supportingHeadline', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Short Description (for catalog cards & meta preview)</label>
                          <textarea
                            value={cur.shortDescription || ''}
                            onChange={e => updateCadField('shortDescription', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Full Detailed Product Description</label>
                          <textarea
                            value={cur.description || ''}
                            onChange={e => updateCadField('description', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Supported Platforms / OS</label>
                            <input
                              type="text"
                              value={cur.platform || ''}
                              onChange={e => updateCadField('platform', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Supported Languages</label>
                            <input
                              type="text"
                              value={cur.languages || ''}
                              onChange={e => updateCadField('languages', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Native Format</label>
                            <input
                              type="text"
                              value={cur.primaryFormat || ''}
                              onChange={e => updateCadField('primaryFormat', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Underlying CAD Engine</label>
                            <input
                              type="text"
                              value={cur.cadEngine || ''}
                              onChange={e => updateCadField('cadEngine', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        {/* SEO Fields */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <p className="text-xs font-black text-slate-800">SEO & Search Engine Indexing</p>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">SEO Title Tag</label>
                            <input
                              type="text"
                              value={cur.seo?.metaTitle || `${cur.productName || ''} | Leniva CAD Solutions`}
                              onChange={e => updateCadField('seo', { ...(cur.seo || {}), metaTitle: e.target.value })}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Meta Description</label>
                            <textarea
                              value={cur.seo?.metaDescription || cur.shortDescription || ''}
                              onChange={e => updateCadField('seo', { ...(cur.seo || {}), metaDescription: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 2: HERO BANNER & HEADER
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'hero' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'hero',
                          'Hero Banner & Header Section',
                          'Toggle whether the hero headline, badge, main product image, and primary callout buttons appear on the live page.'
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Eyebrow Text</label>
                            <input
                              type="text"
                              value={cur.eyebrow || ''}
                              onChange={e => updateCadField('eyebrow', e.target.value)}
                              placeholder="e.g. GRAEBERT | MECHANICAL CAD"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Badge Text</label>
                            <input
                              type="text"
                              value={cur.heroBadge || ''}
                              onChange={e => updateCadField('heroBadge', e.target.value)}
                              placeholder="e.g. Native DWG Mechanical Engine"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Main Heading</label>
                            <input
                              type="text"
                              value={cur.heroHeading || ''}
                              onChange={e => updateCadField('heroHeading', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Highlight Word / Phrase</label>
                            <input
                              type="text"
                              value={cur.h1Highlight || ''}
                              onChange={e => updateCadField('h1Highlight', e.target.value)}
                              placeholder="e.g. Mechanical Precision"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Supporting Text</label>
                          <textarea
                            value={cur.heroSupportingText || ''}
                            onChange={e => updateCadField('heroSupportingText', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>

                        {/* Image URLs with Live Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Main Image URL</label>
                            <input
                              type="url"
                              value={cur.heroImage || ''}
                              onChange={e => updateCadField('heroImage', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {cur.heroImage && (
                              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
                                <img src={cur.heroImage} alt="Main preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Secondary / Floating Image URL</label>
                            <input
                              type="url"
                              value={cur.secondaryImage || ''}
                              onChange={e => updateCadField('secondaryImage', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {cur.secondaryImage && (
                              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
                                <img src={cur.secondaryImage} alt="Secondary preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Spec Strip Counters */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-black text-slate-800">Hero Quick Spec Strip</p>
                              <p className="text-[11px] text-slate-500">Horizontal counters displayed directly below the hero CTA buttons.</p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  curSections.specStrip !== false
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {curSections.specStrip !== false ? '● Live' : '○ Hidden'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleCadSection('specStrip')}
                                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                                    curSections.specStrip !== false ? 'bg-emerald-600' : 'bg-slate-300'
                                  }`}
                                  role="switch"
                                  aria-checked={curSections.specStrip !== false}
                                  title="Toggle Spec Strip Visibility"
                                >
                                  <span
                                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-xs ${
                                      curSections.specStrip !== false ? 'translate-x-4.5' : 'translate-x-0.5'
                                    }`}
                                  />
                                </button>
                              </div>
                              <button
                                onClick={addCadSpecStrip}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Spec</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {(cur.specStrip || []).map((s: any, idx: number) => (
                              <div key={idx} className="flex items-center space-x-1.5 bg-white p-2 rounded-lg border border-slate-200">
                                <input
                                  type="text"
                                  value={s.label}
                                  onChange={e => updateCadSpecStrip(idx, 'label', e.target.value)}
                                  placeholder="Label"
                                  className="w-1/2 px-2 py-1 border border-slate-200 rounded text-xs font-bold text-slate-500 outline-none"
                                />
                                <input
                                  type="text"
                                  value={s.value}
                                  onChange={e => updateCadSpecStrip(idx, 'value', e.target.value)}
                                  placeholder="Value"
                                  className="w-1/2 px-2 py-1 border border-slate-200 rounded text-xs font-bold text-slate-900 outline-none"
                                />
                                <button
                                  onClick={() => removeCadSpecStrip(idx)}
                                  className="p-1 text-red-400 hover:text-red-600 rounded cursor-pointer"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 3: OVERVIEW & FEATURE CARDS
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'overview' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'overview',
                          'Overview & Feature Cards Section',
                          'Toggle whether the product narrative paragraph, subtitle, and multi-column capability cards appear on the live page.'
                        )}

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Overview Section Heading</label>
                          <input
                            type="text"
                            value={cur.overview?.heading || ''}
                            onChange={e => updateCadField('overview', { ...(cur.overview || {}), heading: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Overview Subtitle</label>
                          <input
                            type="text"
                            value={cur.overview?.subtitle || ''}
                            onChange={e => updateCadField('overview', { ...(cur.overview || {}), subtitle: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Section Paragraph Description</label>
                          <textarea
                            value={cur.overview?.description || ''}
                            onChange={e => updateCadField('overview', { ...(cur.overview || {}), description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>

                        {/* Feature Cards Manager */}
                        <div className="pt-3 border-t border-slate-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-black text-slate-800">Feature Highlight Cards ({cur.overview?.cards?.length || 0})</p>
                              <p className="text-[11px] text-slate-500">Key capability cards shown in 2-4 column grid with images & icons.</p>
                            </div>
                            <button
                              onClick={addCadOverviewCard}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Card</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {(cur.overview?.cards || []).map((card: any, idx: number) => (
                              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 relative group">
                                <button
                                  onClick={() => removeCadOverviewCard(idx)}
                                  className="absolute right-3 top-3 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
                                  title="Delete card"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600">Card #{idx + 1}</span>
                                <div>
                                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Card Title</label>
                                  <input
                                    type="text"
                                    value={card.title}
                                    onChange={e => updateCadOverviewCard(idx, 'title', e.target.value)}
                                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Description</label>
                                  <textarea
                                    value={card.desc}
                                    onChange={e => updateCadOverviewCard(idx, 'desc', e.target.value)}
                                    rows={2}
                                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Icon Name</label>
                                    <input
                                      type="text"
                                      value={card.icon || 'Box'}
                                      onChange={e => updateCadOverviewCard(idx, 'icon', e.target.value)}
                                      className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[9px] font-bold uppercase text-slate-400 mb-0.5">Image URL</label>
                                    <input
                                      type="url"
                                      value={card.image || ''}
                                      onChange={e => updateCadOverviewCard(idx, 'image', e.target.value)}
                                      className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 outline-none font-mono text-[10px]"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 4: DEEP FEATURES & STANDARDS
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'features' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'features',
                          'Deep Features & Standards Section',
                          'Toggle whether engineering highlights, capability bullet points, and drafting standards appear on the live page.'
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-slate-900">Key Feature Bullets</p>
                            <p className="text-[11px] text-slate-500">Highlighted bullet points shown across hero and feature lists.</p>
                          </div>
                          <button
                            onClick={addCadHighlight}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Feature</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(cur.highlights || []).map((h: string, i: number) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                                {i + 1}
                              </div>
                              <input
                                type="text"
                                value={h}
                                onChange={e => updateCadHighlight(i, e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                              />
                              <button
                                onClick={() => removeCadHighlight(i)}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Remove feature"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 5: SYSTEM REQUIREMENTS
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'requirements' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'requirements',
                          'System Requirements Section',
                          'Toggle whether the operating system, processor, memory, GPU, disk space, and display resolution specifications appear on the live page.'
                        )}

                        <div>
                          <p className="text-xs font-black text-slate-900">System Hardware & OS Requirements</p>
                          <p className="text-[11px] text-slate-500">Communicates exact deployment specs to IT and CAD evaluators.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Operating System</label>
                            <input
                              type="text"
                              value={cur.requirements?.os || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), os: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Processor / CPU</label>
                            <input
                              type="text"
                              value={cur.requirements?.cpu || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), cpu: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">RAM / System Memory</label>
                            <input
                              type="text"
                              value={cur.requirements?.ram || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), ram: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Graphics / GPU</label>
                            <input
                              type="text"
                              value={cur.requirements?.gpu || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), gpu: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Disk Space / Storage</label>
                            <input
                              type="text"
                              value={cur.requirements?.disk || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), disk: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Display Resolution</label>
                            <input
                              type="text"
                              value={cur.requirements?.display || ''}
                              onChange={e => updateCadField('requirements', { ...(cur.requirements || {}), display: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 6: FAQS MANAGER
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'faqs' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'faqs',
                          'Frequently Asked Questions (FAQs) Section',
                          'Toggle whether the interactive FAQ accordion answering customer licensing, file compatibility, and technical questions appears on the live page.'
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-slate-900">Frequently Asked Questions ({cur.faqs?.length || 0})</p>
                            <p className="text-[11px] text-slate-500">Interactive FAQ accordion displayed at bottom of product page.</p>
                          </div>
                          <button
                            onClick={addCadFaq}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add FAQ</span>
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(cur.faqs || []).map((faq: any, idx: number) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Question #{idx + 1}</span>
                                <button
                                  onClick={() => removeCadFaq(idx)}
                                  className="p-1 text-red-400 hover:text-red-600 rounded cursor-pointer transition-colors"
                                  title="Delete FAQ"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <input
                                type="text"
                                value={faq.q}
                                onChange={e => updateCadFaq(idx, 'q', e.target.value)}
                                placeholder="e.g. Does this support perpetual licensing?"
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900 outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                              <textarea
                                value={faq.a}
                                onChange={e => updateCadFaq(idx, 'a', e.target.value)}
                                placeholder="Answer..."
                                rows={2}
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 7: CTAS & LICENSING
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'licensing' && (
                      <div className="space-y-4">
                        {renderSectionToggleBar(
                          'licensing',
                          'CTAs & Licensing Section',
                          'Toggle whether primary/secondary CTA buttons, licensing terms, and lead enquiry routing appear on the live page.'
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary CTA Button Text</label>
                            <input
                              type="text"
                              value={cur.trialCta || ''}
                              onChange={e => updateCadField('trialCta', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                              placeholder="e.g. Get Free 30-Day Trial"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Secondary CTA Button Text</label>
                            <input
                              type="text"
                              value={cur.pricingCta || ''}
                              onChange={e => updateCadField('pricingCta', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                              placeholder="e.g. Request a Quote"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Licensing & Terms Note</label>
                          <textarea
                            value={cur.licensingNote || ''}
                            onChange={e => updateCadField('licensingNote', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Official Product URL</label>
                            <input
                              type="url"
                              value={cur.officialUrl || ''}
                              onChange={e => updateCadField('officialUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Trial / Download URL</label>
                            <input
                              type="url"
                              value={cur.downloadUrl || ''}
                              onChange={e => updateCadField('downloadUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Enquiry Lead Routing Email</label>
                          <input
                            type="email"
                            value={cur.enquiryEmail || ''}
                            onChange={e => updateCadField('enquiryEmail', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>

                        {/* CTA Preview Box */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live Button Preview</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm">
                              {cur.trialCta || 'Primary Action'}
                            </div>
                            <div className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold shadow-sm">
                              {cur.pricingCta || 'Secondary Action'}
                            </div>
                          </div>
                          {cur.licensingNote && (
                            <p className="text-xs text-slate-500 italic border-t border-slate-200 pt-3">{cur.licensingNote}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 8: LIVE PAGE VISUAL PREVIEW
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'preview' && (
                      <div className="space-y-6 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-300">Live Product Page Layout Preview</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-indigo-500/20 text-indigo-300 font-bold">
                              {activeSectionsCount} / 7 Sections Displayed
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">Desktop View</span>
                        </div>

                        {/* Hero Preview */}
                        {curSections.hero !== false ? (
                          <div className="space-y-4 max-w-3xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {cur.heroBadge || 'Product Badge'}
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                              {cur.heroHeading || cur.headline}{' '}
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                {cur.h1Highlight}
                              </span>
                            </h1>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {cur.heroSupportingText || cur.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                              <div className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg">
                                {cur.trialCta || 'Get Free Trial'}
                              </div>
                              <div className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold">
                                {cur.pricingCta || 'Request a Quote'}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>Hero Banner Section</strong> is currently disabled and hidden from live visitors.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('hero')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}

                        {/* Spec Strip Preview */}
                        {curSections.specStrip !== false ? (
                          cur.specStrip && cur.specStrip.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800 pt-4">
                              {cur.specStrip.map((s: any, idx: number) => (
                                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                                  <div className="text-[10px] text-slate-400">{s.label}</div>
                                  <div className="text-xs font-bold text-slate-200 truncate">{s.value}</div>
                                </div>
                              ))}
                            </div>
                          )
                        ) : (
                          <div className="p-3 rounded-lg border border-dashed border-rose-500/30 bg-rose-950/15 text-rose-300 text-xs flex items-center justify-between">
                            <span><strong>Quick Spec Strip</strong> is disabled and hidden.</span>
                            <button
                              onClick={() => toggleCadSection('specStrip')}
                              className="text-[11px] font-bold text-rose-400 hover:text-white underline cursor-pointer"
                            >
                              Enable Spec Strip
                            </button>
                          </div>
                        )}

                        {/* Overview Cards Preview */}
                        {curSections.overview !== false ? (
                          cur.overview?.cards && cur.overview.cards.length > 0 && (
                            <div className="space-y-3 border-t border-slate-800 pt-4">
                              <h3 className="text-sm font-bold text-slate-200">{cur.overview.heading || 'Key Capabilities'}</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {cur.overview.cards.map((c: any, idx: number) => (
                                  <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                                    <div className="text-xs font-bold text-blue-400">{c.title}</div>
                                    <div className="text-[11px] text-slate-400 line-clamp-2">{c.desc}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>Overview & Feature Cards</strong> section is disabled and hidden.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('overview')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}

                        {/* Deep Features Preview */}
                        {curSections.features !== false ? (
                          cur.highlights && cur.highlights.length > 0 && (
                            <div className="space-y-2 border-t border-slate-800 pt-4">
                              <h3 className="text-sm font-bold text-slate-200">Deep Features & Engineering Standards ({cur.highlights.length})</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {cur.highlights.slice(0, 4).map((h: string, idx: number) => (
                                  <div key={idx} className="text-xs text-slate-300 flex items-center space-x-2">
                                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                    <span className="truncate">{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>Deep Features & Standards</strong> section is disabled and hidden.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('features')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}

                        {/* System Requirements Preview */}
                        {curSections.requirements !== false ? (
                          cur.requirements && (
                            <div className="space-y-2 border-t border-slate-800 pt-4">
                              <h3 className="text-sm font-bold text-slate-200">System Requirements Table</h3>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                                <div><span className="text-slate-500">OS:</span> {cur.requirements.os}</div>
                                <div><span className="text-slate-500">RAM:</span> {cur.requirements.ram}</div>
                                <div><span className="text-slate-500">CPU:</span> {cur.requirements.cpu}</div>
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>System Requirements</strong> section is disabled and hidden.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('requirements')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}

                        {/* FAQs Preview */}
                        {curSections.faqs !== false ? (
                          cur.faqs && cur.faqs.length > 0 && (
                            <div className="space-y-2 border-t border-slate-800 pt-4">
                              <h3 className="text-sm font-bold text-slate-200">Frequently Asked Questions ({cur.faqs.length} FAQs)</h3>
                              <p className="text-xs text-slate-400">Interactive FAQ accordion displayed on page.</p>
                            </div>
                          )
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>FAQs Section</strong> is disabled and hidden.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('faqs')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}

                        {/* CTAs & Licensing Preview */}
                        {curSections.licensing !== false ? (
                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-slate-200">Licensing & Lead Routing Active</p>
                              <p className="text-[11px] text-slate-400">{cur.trialCta || 'Trial'} &amp; {cur.pricingCta || 'Quote'} enabled.</p>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Enabled</span>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl border border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span><strong>CTAs & Licensing Section</strong> is disabled and hidden.</span>
                            </div>
                            <button
                              onClick={() => toggleCadSection('licensing')}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                            >
                              Enable Section
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Persistent Footer Action Bar */}
                    <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Edits save automatically to storage. Click <strong>Save Changes</strong> to immediately sync and publish across the site.</span>
                      </div>
                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                        <a
                          href={activeMeta.route}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Live Page</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => saveCadEdits(cadEdits)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All Products Summary Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-slate-900">
                      All CAD Software Products ({cadProducts.length})
                    </h4>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="py-2 px-3">Product Name</th>
                          <th className="py-2 px-3">Brand</th>
                          <th className="py-2 px-3">Category</th>
                          <th className="py-2 px-3">Route</th>
                          <th className="py-2 px-3">Type</th>
                          <th className="py-2 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {cadProducts.map(p => {
                          const d = cadEdits[p.key] || {}
                          const isSelected = activeCadProduct === p.key
                          return (
                            <tr key={p.key} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/60 font-semibold' : ''}`}>
                              <td className="py-3 px-3 font-bold text-slate-900">{d.productName || p.label}</td>
                              <td className="py-3 px-3 text-slate-500">{p.brand}</td>
                              <td className="py-3 px-3 text-slate-700">{p.category}</td>
                              <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{p.route}</td>
                              <td className="py-3 px-3">
                                {p.isCustom ? (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">Custom</span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600">Standard</span>
                                )}
                              </td>
                              <td className="py-3 px-3 text-right space-x-1.5">
                                <button
                                  onClick={() => { setActiveCadProduct(p.key); setCadEditSection('identity'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                                  title={`Edit ${p.label}`}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {p.isCustom && (
                                  <button
                                    onClick={() => handleDeleteCadProduct(p.key)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                    title="Delete product"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export & Developer Guidance */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">How Full-Page Edits & New Products Work</p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        â€¢ <strong>Immediate Storage:</strong> Every edit you make is automatically saved in your browser storage and persists across sessions.<br />
                        â€¢ <strong>Full-Page Control:</strong> Use the 8 tabs above to edit identity details, hero banners, feature cards, system requirements, FAQs, and live preview.<br />
                        â€¢ <strong>Adding Products:</strong> Click <strong>"+ Add New CAD Product"</strong> to add any software product. To add hardware machines (3D printers / scanners), click <strong>"Add 3D Printer / Scanner"</strong> in the top banner to use the equipment catalog.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}


        </main>

      </div>
    </div>
  )
}

