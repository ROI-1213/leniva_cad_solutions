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
  Briefcase,
  Home,
  Code,
  HelpCircle,
  Monitor,
  ExternalLink,
  X,
  Copy,
  Power,
} from 'lucide-react'
import {
  CadEnabledSections,
  DEFAULT_CAD_SECTIONS,
  CAD_SECTION_METADATA,
} from '../utils/cadSoftwareConfig'
import { products as fallbackProducts } from '../data/products'
import { services as fallbackServices } from '../data/services'
import { blogPosts as fallbackBlogs } from '../data/blogs'
import { productCategories as fallbackCategories } from '../data/categories'

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

interface ProductItem {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  category_slug: string
  technology: string
  tagline: string
  short_description?: string
  description?: string
  hero_image: string
  price: number
  in_stock: boolean
  is_featured: boolean
}



interface BlogPostItem {
  id: string
  slug: string
  title: string
  category: string
  read_time: string
  date: string
  excerpt?: string
  content?: string
  image?: string
  published: boolean
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
    | 'services'
    | 'blogs'
    | 'categories'
    | 'cad_software'
    | 'settings'
    | 'users'

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)

  // Lists
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [productsList, setProductsList] = useState<ProductItem[]>([])
  const [blogsList, setBlogsList] = useState<BlogPostItem[]>([])
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [categoriesList, setCategoriesList] = useState<any[]>([])

  // Search & Filter
  const [productSearch, setProductSearch] = useState('')
  const [quoteFilter, setQuoteFilter] = useState('all')

  // Modals / Forms
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteNotesInput, setQuoteNotesInput] = useState('')
  const [isNewProductOpen, setIsNewProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [servicesList, setServicesList] = useState<any[]>([])
  const [editingService, setEditingService] = useState<any>(null)
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false)
  const [newService, setNewService] = useState({
    title: '',
    slug: '',
    badge: 'Industrial Grade',
    short_description: '',
    description: '',
    image: '/images/services/scanning.jpg',
  })
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Leniva',
    category: 'FDM 3D Printers',
    categorySlug: 'fdm-3d-printers',
    technology: 'Industrial FDM',
    tagline: 'High Speed Precision System',
    description: '',
    short_description: '',
    price: 95000,
    original_price: 110000,
    heroImage: '/images/products/pratham-mini.png',
  })

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

  // Category Form
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
  })

  // Settings State
  const [siteSettings, setSiteSettings] = useState<any>({
    companyName: 'Leniva CAD Solutions',
    phone: '+91 90234 56789',
    email: 'contact@lenivacadsolution.in',
    address: 'Bengaluru Technology Center, Karnataka, India',
    workingHours: 'Mon â€“ Sat: 9:00 AM â€“ 6:30 PM IST',
    whatsapp: '919023456789',
    bannerNotice: 'Now Delivering Advanced 3D Scanners & Industrial Printers PAN-India',
  })
  const [settingsSavedMsg, setSettingsSavedMsg] = useState('')

  // User Management Form
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', fullName: '', role: 'admin' })
  const [passwordChangeId, setPasswordChangeId] = useState<number | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null)
  const [contactNotesInput, setContactNotesInput] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')

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

  type CadSectionKey = 'identity' | 'hero' | 'overview' | 'features' | 'requirements' | 'faqs' | 'licensing' | 'preview' | 'json'

  const [customCadProducts, setCustomCadProducts] = useState<CadProductItem[]>(loadCustomCadProducts)
  const cadProducts = [...DEFAULT_CAD_PRODUCTS, ...customCadProducts]

  const [cadEdits, setCadEdits] = useState<Record<string, any>>(loadCadEdits)
  const [activeCadProduct, setActiveCadProduct] = useState<string>('ares_mechanical')
  const [cadSaveMsg, setCadSaveMsg] = useState('')
  const [cadEditSection, setCadEditSection] = useState<CadSectionKey>('identity')

  // Raw JSON state
  const [rawJsonInput, setRawJsonInput] = useState('')
  const [rawJsonError, setRawJsonError] = useState('')

  // New CAD Product Modal state
  const [isNewCadProductOpen, setIsNewCadProductOpen] = useState(false)
  const [newCadForm, setNewCadForm] = useState({
    name: '',
    brand: 'Graebert',
    category: '2D/3D CAD Software',
    route: '/products/',
    template: 'ares_mechanical',
  })

  // Sync raw JSON when active product or section changes
  useEffect(() => {
    if (cadEdits[activeCadProduct]) {
      setRawJsonInput(JSON.stringify(cadEdits[activeCadProduct], null, 2))
      setRawJsonError('')
    }
  }, [activeCadProduct, cadEditSection])

  const saveCadEdits = (updatedEdits: Record<string, any>) => {
    localStorage.setItem('leniva_cad_software_edits', JSON.stringify(updatedEdits))
    setCadEdits(updatedEdits)
    try {
      window.dispatchEvent(new Event('leniva_cad_edits_updated'))
    } catch {
      // ignore
    }
    setCadSaveMsg('✓ Changes saved to browser storage.')
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

  // Raw JSON apply
  const handleApplyRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonInput)
      const updated = { ...cadEdits, [activeCadProduct]: parsed }
      saveCadEdits(updated)
      setRawJsonError('')
      setCadSaveMsg('âœ“ Full page JSON applied successfully!')
    } catch (err: any) {
      setRawJsonError(err.message || 'Invalid JSON syntax. Please check brackets and quotes.')
    }
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

  const exportCadJson = () => {
    const blob = new Blob([JSON.stringify(cadEdits, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leniva-cad-software-content.json'
    a.click()
    URL.revokeObjectURL(url)
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
    if (
      (usernameInput === 'admin' && passwordInput === 'Admin@Leniva2026!') ||
      (usernameInput === 'leniva' && passwordInput === 'admin')
    ) {
      setIsAuthenticated(true)
      localStorage.setItem('leniva_admin_auth', 'true')
      loadAllData()
    } else {
      setLoginError('Invalid administrator credentials. Use default admin credentials shown below.')
    }
    setIsLoading(false)
  }

  const handleBypassLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('leniva_admin_auth', 'true')
    loadAllData()
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
        catsRes,
        settingsRes,
        servicesRes,
      ] = await Promise.allSettled([
        safeFetchJson('/api/stats'),
        safeFetchJson('/api/quotes'),
        safeFetchJson('/api/contacts'),
        safeFetchJson('/api/products'),
        safeFetchJson('/api/blogs'),
        safeFetchJson('/api/admin/users'),
        safeFetchJson('/api/categories'),
        safeFetchJson('/api/settings'),
        safeFetchJson('/api/services'),
      ])

      const statsVal = statsRes.status === 'fulfilled' ? statsRes.value : null
      const quotesVal = quotesRes.status === 'fulfilled' ? quotesRes.value : null
      const contactsVal = contactsRes.status === 'fulfilled' ? contactsRes.value : null
      const prodsVal = prodsRes.status === 'fulfilled' ? prodsRes.value : null
      const blogsVal = blogsRes.status === 'fulfilled' ? blogsRes.value : null
      const usersVal = usersRes.status === 'fulfilled' ? usersRes.value : null
      const catsVal = catsRes.status === 'fulfilled' ? catsRes.value : null
      const settingsVal = settingsRes.status === 'fulfilled' ? settingsRes.value : null
      const servicesVal = servicesRes.status === 'fulfilled' ? servicesRes.value : null

      // Fallback products if API not connected
      if (Array.isArray(prodsVal) && prodsVal.length > 0) {
        setProductsList(prodsVal)
      } else {
        const mappedProducts: ProductItem[] = fallbackProducts.map((p, idx) => ({
          id: p.id || `prod-${idx}`,
          slug: p.slug || p.id,
          name: p.name,
          brand: p.brand || 'Leniva',
          category: p.category || '3D Printers',
          category_slug: p.categorySlug || 'fdm-3d-printers',
          technology: p.technology || 'Additive Manufacturing',
          tagline: p.tagline || 'High Performance CAD & 3D Solution',
          short_description: p.shortDescription || '',
          description: p.description || '',
          hero_image: p.heroImage || p.images?.[0] || '/images/products/pratham-mini.png',
          price: (p as any).price || 95000,
          in_stock: p.inStock ?? true,
          is_featured: p.isFeatured ?? true,
        }))
        setProductsList(mappedProducts)
      }

      // Fallback services
      if (Array.isArray(servicesVal) && servicesVal.length > 0) {
        setServicesList(servicesVal)
      } else {
        const mappedServices = fallbackServices.map(s => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          badge: s.badge || 'Engineering Service',
          short_description: s.shortDescription || '',
          description: s.description || '',
          image: s.image || '/images/services/scanning.jpg',
        }))
        setServicesList(mappedServices)
      }

      // Fallback blogs
      if (Array.isArray(blogsVal) && blogsVal.length > 0) {
        setBlogsList(blogsVal)
      } else {
        const mappedBlogs: BlogPostItem[] = fallbackBlogs.map(b => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          category: b.category,
          read_time: b.readTime,
          date: b.date,
          excerpt: b.excerpt,
          content: b.content,
          image: b.image,
          published: true,
        }))
        setBlogsList(mappedBlogs)
      }

      // Fallback categories
      if (Array.isArray(catsVal) && catsVal.length > 0) {
        setCategoriesList(catsVal)
      } else {
        setCategoriesList(fallbackCategories)
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
        setAdminUsers(usersVal)
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
          {
            id: 2,
            username: 'support',
            email: 'support@lenivacadsolution.in',
            full_name: 'Technical Support Lead',
            role: 'editor',
            created_at: '2026-02-15',
          },
        ])
      }

      // Fallback Site settings
      if (settingsVal && settingsVal.general_info) {
        setSiteSettings(settingsVal.general_info)
      }

      // Set Stats
      setStats(statsVal || {
        totalProducts: prodsVal?.length || fallbackProducts.length,
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
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProd, in_stock: true, is_featured: true }),
      })
      if (res.ok) {
        const created = await res.json()
        setProductsList(prev => [created, ...prev])
        setIsNewProductOpen(false)
        setNewProd({
          name: '',
          brand: 'Leniva',
          category: 'FDM 3D Printers',
          categorySlug: 'fdm-3d-printers',
          technology: 'Industrial FDM',
          tagline: 'High Speed Precision System',
          description: '',
          short_description: '',
          price: 95000,
          original_price: 110000,
          heroImage: '/images/products/pratham-mini.png',
        })
        loadAllData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      })
      if (res.ok) {
        const updated = await res.json()
        setProductsList(prev => prev.map(p => p.id === updated.id ? updated : p))
        setEditingProduct(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleStock = async (product: ProductItem) => {
    try {
      const updatedStock = !product.in_stock
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: updatedStock }),
      })
      if (res.ok) {
        setProductsList(prev => prev.map(p => p.id === product.id ? { ...p, in_stock: updatedStock } : p))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(`Delete product ${id} permanently from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProductsList(prev => prev.filter(p => p.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Blog operations
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlog, published: true }),
      })
      if (res.ok) {
        const created = await res.json()
        setBlogsList(prev => [created, ...prev])
        setIsNewBlogOpen(false)
        setNewBlog({
          title: '',
          category: '3D Printing Innovations',
          read_time: '5 min read',
          excerpt: '',
          content: '',
          image: '/images/showcase/pratham-showcase.png',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm(`Delete article ${id} from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogsList(prev => prev.filter(b => b.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBlog) return
    try {
      const res = await fetch(`/api/blogs/${editingBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      })
      if (res.ok) {
        const updated = await res.json()
        setBlogsList(prev => prev.map(b => b.id === updated.id ? updated : b))
        setEditingBlog(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Category Edit Operation
  const handleSaveEditCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return
    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      })
      if (res.ok) {
        const updated = await res.json()
        setCategoriesList(prev => prev.map(c => c.id === updated.id ? updated : c))
        setEditingCategory(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Service Operations
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      })
      if (res.ok) {
        const created = await res.json()
        setServicesList(prev => [...prev, created])
        setIsNewServiceOpen(false)
        setNewService({
          title: '',
          slug: '',
          badge: 'Industrial Grade',
          short_description: '',
          description: '',
          image: '/images/services/scanning.jpg',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return
    try {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      })
      if (res.ok) {
        const updated = await res.json()
        setServicesList(prev => prev.map(s => s.id === updated.id ? updated : s))
        setEditingService(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm(`Delete engineering service ${id} from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServicesList(prev => prev.filter(s => s.id !== id))
      }
    } catch (err) {
      console.error(err)
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
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'general_info', value: siteSettings }),
      })
      if (res.ok) {
        setSettingsSavedMsg('Settings saved successfully into PostgreSQL!')
        setTimeout(() => setSettingsSavedMsg(''), 4000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Admin User operations
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setUserMsg('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (res.ok) {
        const created = await res.json()
        setAdminUsers(prev => [...prev, created])
        setNewUser({ username: '', email: '', password: '', fullName: '', role: 'admin' })
        setUserMsg('New administrator created successfully in PostgreSQL!')
      } else {
        const err = await res.json()
        setUserMsg(`Error: ${err.error}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleChangePassword = async (id: number) => {
    if (!newPasswordValue) return
    try {
      const res = await fetch(`/api/admin/users/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPasswordValue }),
      })
      if (res.ok) {
        setUserMsg(`Password updated for user ID #${id}!`)
        setPasswordChangeId(null)
        setNewPasswordValue('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm(`Delete admin user ID #${id}?`)) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAdminUsers(prev => prev.filter(u => u.id !== id))
      }
    } catch (err) {
      console.error(err)
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

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category from PostgreSQL? Products using it will still exist.')) return
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategoriesList(prev => prev.filter(c => c.id !== id))
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
            <p className="text-xs text-slate-500 font-mono">
              Database: PostgreSQL (leniv698 @ 127.0.0.1 / localhost)
            </p>
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

            <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-[11px] text-blue-900 space-y-1 font-mono">
              <div><strong>Default Superadmin:</strong> <code>admin</code></div>
              <div><strong>Default Password:</strong> <code>Admin@Leniva2026!</code></div>
              <div className="text-[10px] text-blue-700 mt-1">âœ“ Full Control Enabled â€” Direct Native PostgreSQL</div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying PostgreSQL Credentials...' : 'Sign In with Full Admin Control'}
            </button>

            <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Or Direct Access
              </span>
            </div>

            <button
              type="button"
              onClick={handleBypassLogin}
              className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>1-Click Instant Preview (Bypass Sign-In)</span>
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

  // Filtered Products
  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  )

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
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4" />
                <span>Services</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'services' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {servicesList.length}
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
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'categories' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'categories' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoriesList.length}
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
              <span>Admin Accounts</span>
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
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Services</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{servicesList.length}</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">3D Solutions & Services</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
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
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Equipment Catalog Management</h3>
                  <p className="text-xs text-slate-500">Add, edit pricing, toggle stock, or delete any product</p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search machines..."
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => setIsNewProductOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Machine</span>
                  </button>
                </div>
              </div>

              {/* Add New Product Form */}
              {isNewProductOpen && (
                <form onSubmit={handleCreateProduct} className="p-5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-blue-950">Add New 3D Printer or Scanner</h4>
                    <button
                      type="button"
                      onClick={() => setIsNewProductOpen(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Pratham Ultra Pro"
                        value={newProd.name}
                        onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newProd.categorySlug}
                        onChange={e => setNewProd({
                          ...newProd,
                          categorySlug: e.target.value,
                          category: e.target.options[e.target.selectedIndex].text,
                        })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      >
                        <option value="fdm-3d-printers">FDM 3D Printers</option>
                        <option value="dlp-3d-printers">DLP 3D Printers</option>
                        <option value="industrial-lcd-3d-printers">Industrial LCD 3D Printers</option>
                        <option value="3d-scanners">3D Scanners</option>
                        <option value="cad-software">CAD Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={newProd.tagline}
                        onChange={e => setNewProd({ ...newProd, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price / Status (INR, or 0 for Quote)</label>
                      <input
                        type="number"
                        value={newProd.price}
                        onChange={e => setNewProd({ ...newProd, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNewProductOpen(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                    >
                      Save to PostgreSQL
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Product Modal */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditProduct} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Machine: {editingProduct.name}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingProduct.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        âœ•
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name}
                            onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug (URL)</label>
                          <input
                            type="text"
                            value={editingProduct.slug || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Brand</label>
                          <input
                            type="text"
                            value={editingProduct.brand}
                            onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingProduct.category}
                            onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
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
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Technology</label>
                          <input
                            type="text"
                            value={editingProduct.technology || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, technology: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Selling Price</label>
                          <input
                            type="number"
                            value={editingProduct.price ?? 0}
                            onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Original / MRP Price</label>
                          <input
                            type="number"
                            value={editingProduct.original_price ?? 0}
                            onChange={e => setEditingProduct({ ...editingProduct, original_price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProduct.tagline || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingProduct.hero_image || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, hero_image: e.target.value })}
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
                                    setEditingProduct((prev: any) => ({ ...prev, hero_image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingProduct.hero_image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingProduct.hero_image}
                              alt="Hero preview"
                              className="w-12 h-12 object-contain bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingProduct.hero_image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingProduct.short_description || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                        <textarea
                          rows={4}
                          value={editingProduct.description || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProduct.in_stock !== false}
                            onChange={e => setEditingProduct({ ...editingProduct, in_stock: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">In Stock (Available for Delivery)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!editingProduct.is_featured}
                            onChange={e => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Featured Showcase</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!editingProduct.is_quote_based}
                            onChange={e => setEditingProduct({ ...editingProduct, is_quote_based: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Quote Based</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Changes to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Brand</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Stock Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{p.slug}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{p.category}</td>
                        <td className="py-3 px-3 text-slate-700">{p.brand}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          'Quote Based'
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              p.in_stock !== false ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            title="Click to toggle stock availability"
                          >
                            {p.in_stock !== false ? 'âœ“ In Stock' : 'âœ• Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit product details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete product"
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
              TAB: ENGINEERING SERVICES (FULL CRUD & FULL EDIT)
             ==================================================== */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Engineering & 3D Printing Services</h3>
                  <p className="text-xs text-slate-500">Manage industrial manufacturing and scanning services in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewServiceOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Add New Service Form */}
              {isNewServiceOpen && (
                <form onSubmit={handleCreateService} className="p-5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-blue-950">Add Engineering Service</h4>
                    <button
                      type="button"
                      onClick={() => setIsNewServiceOpen(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3D Scanning & Inspection"
                        value={newService.title}
                        onChange={e => setNewService({ ...newService, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Slug</label>
                      <input
                        type="text"
                        placeholder="e.g. 3d-scanning-inspection"
                        value={newService.slug}
                        onChange={e => setNewService({ ...newService, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Industrial Precision"
                        value={newService.badge}
                        onChange={e => setNewService({ ...newService, badge: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={newService.short_description}
                      onChange={e => setNewService({ ...newService, short_description: e.target.value })}
                      placeholder="Brief overview displayed on cards..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={newService.description}
                      onChange={e => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Comprehensive technical details..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNewServiceOpen(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    >
                      Save Service to PostgreSQL
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditService} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Service: {editingService.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingService.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        âœ•
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                          <input
                            type="text"
                            required
                            value={editingService.title}
                            onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Badge</label>
                          <input
                            type="text"
                            value={editingService.badge || ''}
                            onChange={e => setEditingService({ ...editingService, badge: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Slug (URL)</label>
                        <input
                          type="text"
                          value={editingService.slug || ''}
                          onChange={e => setEditingService({ ...editingService, slug: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Service Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingService.image || ''}
                            onChange={e => setEditingService({ ...editingService, image: e.target.value })}
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
                                    setEditingService((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingService.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingService.image}
                              alt="Service preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingService.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingService.short_description || ''}
                          onChange={e => setEditingService({ ...editingService, short_description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                        <textarea
                          rows={4}
                          value={editingService.description || ''}
                          onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Service to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Badge</th>
                      <th className="py-3 px-3">Description</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {servicesList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{s.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/services#{s.slug}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                            {s.badge || 'Industrial'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 max-w-sm">
                          <p className="line-clamp-2">{s.short_description || s.description}</p>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingService(s)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit service details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete service"
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
              TAB 7: CATEGORIES (FULL CONTROL)
             ==================================================== */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Equipment Categories</h3>
                  <p className="text-xs text-slate-500">Manage catalog taxonomy in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewCategoryOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {isNewCategoryOpen && (
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    const res = await fetch('/api/categories', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newCategory),
                    })
                    if (res.ok) {
                      const created = await res.json()
                      setCategoriesList(prev => [...prev, created])
                      setIsNewCategoryOpen(false)
                      setNewCategory({ title: '', slug: '', description: '', image: '' })
                    }
                  }}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs"
                >
                  <h4 className="font-bold text-slate-900">Create New Category</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Category Title"
                      required
                      value={newCategory.title}
                      onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Slug (e.g. metal-3d-printers)"
                      value={newCategory.slug}
                      onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsNewCategoryOpen(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold"
                    >
                      Save Category
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Category Modal */}
              {editingCategory && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditCategory} className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Category: {editingCategory.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingCategory.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        âœ•
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category Title</label>
                          <input
                            type="text"
                            required
                            value={editingCategory.title}
                            onChange={e => setEditingCategory({ ...editingCategory, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug</label>
                          <input
                            type="text"
                            value={editingCategory.slug}
                            onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editingCategory.subtitle || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, subtitle: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Icon Name</label>
                          <input
                            type="text"
                            value={editingCategory.icon || 'Box'}
                            onChange={e => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Category Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingCategory.image || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingCategory((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingCategory.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingCategory.image}
                              alt="Category preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingCategory.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Banner URL</label>
                        <input
                          type="text"
                          value={editingCategory.hero_banner || ''}
                          onChange={e => setEditingCategory({ ...editingCategory, hero_banner: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingCategory.description || ''}
                          onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Category to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoriesList.map(cat => (
                  <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{cat.title}</h4>
                      <div className="text-[11px] font-mono text-slate-400">slug: {cat.slug}</div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={siteSettings.phone || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={siteSettings.email || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={siteSettings.whatsapp || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Office / Showroom Physical Address</label>
                  <input
                    type="text"
                    value={siteSettings.address || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Working Hours</label>
                  <input
                    type="text"
                    value={siteSettings.workingHours || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
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

                <div className="pt-2 flex justify-end">
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
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Administrator Accounts & Credentials</h3>
                <p className="text-xs text-slate-500">Manage console logins stored in PostgreSQL table <code>admin_users</code></p>
              </div>

              {userMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-semibold">
                  {userMsg}
                </div>
              )}

              {/* Password Change Sub-modal */}
              {passwordChangeId && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-amber-950">Update Password for User ID #{passwordChangeId}</h4>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter new strong password"
                      value={newPasswordValue}
                      onChange={e => setNewPasswordValue(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleChangePassword(passwordChangeId)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold cursor-pointer"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordChangeId(null)
                        setNewPasswordValue('')
                      }}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Create User Form */}
              <form onSubmit={handleCreateUser} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Add New Administrator</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold cursor-pointer"
                  >
                    Create User in PostgreSQL
                  </button>
                </div>
              </form>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Username</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{u.id}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{u.username}</td>
                        <td className="py-3 px-3 text-slate-600">{u.email}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-700">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => setPasswordChangeId(u.id)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-md font-bold text-[11px] cursor-pointer"
                          >
                            Change Password
                          </button>
                          {u.username !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


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
              { key: 'json',         label: '9. JSON' },
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
                {/* Hardware vs CAD Software Guidance Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">Leniva CAD Software Management Suite</p>
                      <p className="text-[11px] text-slate-600">
                        Edit complete product pages for CAD software below. Looking to manage 3D Printers or Scanners?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { setActiveTab('products'); setIsNewProductOpen(true) }}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Add 3D Printer / Scanner</span>
                    </button>
                    <button
                      onClick={() => setIsNewCadProductOpen(true)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New CAD Product</span>
                    </button>
                  </div>
                </div>

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
                      onClick={() => setIsNewCadProductOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                    <button
                      onClick={exportCadJson}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      title="Export complete JSON configuration"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
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
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Product to Edit ({cadProducts.length} Total)
                    </p>
                    <button
                      onClick={() => setIsNewCadProductOpen(true)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Another Product</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 min-w-0">
                    {cadProducts.map(p => {
                      const isActive = activeCadProduct === p.key
                      return (
                        <div
                          key={p.key}
                          onClick={() => { setActiveCadProduct(p.key); setRawJsonError('') }}
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

                    {/* "+ Add New Product" card in grid */}
                    <button
                      type="button"
                      onClick={() => setIsNewCadProductOpen(true)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-500 hover:text-indigo-600 transition-all cursor-pointer group"
                    >
                      <Plus className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold">+ Add CAD Product</span>
                    </button>
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
                          onClick={() => { setCadEditSection(tab.key); setRawJsonError('') }}
                          className={`px-3 py-2.5 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border-b-2 -mb-px flex items-center space-x-1.5 shrink-0 ${
                            cadEditSection === tab.key
                              ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                              : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                          }`}
                        >
                          {tab.key === 'json' && <Code className="w-3.5 h-3.5" />}
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

                    {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
                        SECTION 9: FULL PAGE RAW JSON CODE EDITOR
                       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
                    {cadEditSection === 'json' && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div>
                            <p className="text-xs font-black text-slate-900">Direct Full-Page JSON Code Editor</p>
                            <p className="text-[11px] text-slate-500">Edit every single property and nested object directly with zero limitations.</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(rawJsonInput)
                                setCadSaveMsg('âœ“ JSON copied to clipboard!')
                                setTimeout(() => setCadSaveMsg(''), 3000)
                              }}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy JSON</span>
                            </button>
                            <button
                              onClick={handleApplyRawJson}
                              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-md cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Apply & Save Raw JSON</span>
                            </button>
                          </div>
                        </div>

                        {rawJsonError && (
                          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-mono">
                            <strong>Syntax Error:</strong> {rawJsonError}
                          </div>
                        )}

                        <div className="relative">
                          <textarea
                            value={rawJsonInput}
                            onChange={e => { setRawJsonInput(e.target.value); setRawJsonError('') }}
                            rows={20}
                            className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl border border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
                            spellCheck={false}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* All Products Summary Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black text-slate-900">
                      All CAD Software Products ({cadProducts.length})
                    </h4>
                    <button
                      onClick={() => setIsNewCadProductOpen(true)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
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
                        â€¢ <strong>Full-Page Control:</strong> Use the 9 tabs above to edit hero banners, feature cards, system requirements, and FAQs, or switch to <strong>"9. Full Page Raw JSON"</strong> for direct unrestricted code-level editing.<br />
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

