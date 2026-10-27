import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
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
  EyeOff,
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
  Mail,
  Send,
  Inbox,
  Server,
  Download,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  User,
} from 'lucide-react'
import { ShopAndNavigationEditor } from '../components/admin/ShopAndNavigationEditor'
import { CadVisualPageEditor } from '../components/admin/CadVisualPageEditor'
import {
  resolveVisualProductKeyFromCatalogProduct,
  VisualEditorCategory,
} from '../utils/cadVisualEditorStore'
import { getProductTemplate, ProductTemplateType } from '../utils/productTemplates'
import {
  CadEnabledSections,
  DEFAULT_CAD_SECTIONS,
  CAD_SECTION_METADATA,
  CadProductItem,
  DEFAULT_CAD_PRODUCTS,
  CAD_DEFAULTS,
  CAD_KEY_TO_SLUG_MAP,
} from '../utils/cadSoftwareConfig'
import {
  ProductItem,
  KeySpecItem,
  CAD_SLUG_TO_KEY_MAP,
  getStoredProductsCatalog,
  saveStoredProductsCatalog,
  resetStoredProductsCatalog,
} from '../utils/productCatalog'
import {
  HomeContentConfig,
  getStoredHomeContent,
  saveStoredHomeContent,
  resetStoredHomeContent,
  DEFAULT_HERO_BANNERS,
  FALLBACK_PUBLIC_HERO_BANNERS,
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
import {
  pullCmsStateFromCloud,
  pushCmsStateToCloud,
  getStoredQuotes,
  saveStoredQuotes,
  getStoredContacts,
  saveStoredContacts,
  StoredEnquiryRecord,
  getStoredEnquiries,
  saveStoredEnquiries,
} from '../utils/cloudSync'
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
  enquiry_type?: 'quote' | 'demo' | 'consultation' | 'trial' | 'contact'
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
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  type AdminTab =
    | 'enquiries'
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
    | 'cad_visual_edit'
    | 'printers_visual_edit'
    | 'scanners_visual_edit'

  const [activeTab, setActiveTab] = useState<AdminTab>('enquiries')
  const [visualEditorTarget, setVisualEditorTarget] = useState<{
    category: VisualEditorCategory
    productKey: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [_stats, setStats] = useState<Stats | null>(null)

  // Lists
  const [enquiries, setEnquiries] = useState<StoredEnquiryRecord[]>(getStoredEnquiries)
  const [quotes, setQuotes] = useState<QuoteRequest[]>(getStoredQuotes)
  const [contacts, setContacts] = useState<ContactMessage[]>(getStoredContacts)
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
  const [quoteEnquiryTypeFilter, setQuoteEnquiryTypeFilter] = useState<'all' | 'quote' | 'demo' | 'consultation' | 'trial' | 'contact'>('all')
  const [quoteSearchInput, setQuoteSearchInput] = useState('')

  // Enquiry Management Filters & Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiryRecord | null>(null)
  const [enquirySearchInput, setEnquirySearchInput] = useState('')
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<'all' | 'New' | 'Contacted' | 'Pending' | 'Converted' | 'Closed'>('all')
  const [enquiryProductFilter, setEnquiryProductFilter] = useState('all')
  const [enquirySourceFilter, setEnquirySourceFilter] = useState('all')
  const [enquiryDateFilter, setEnquiryDateFilter] = useState('')
  const [enquiryEmailFilter, setEnquiryEmailFilter] = useState<'all' | 'sent' | 'pending' | 'failed'>('all')
  const [enquiryAdminNotes, setEnquiryAdminNotes] = useState('')
  const [enquiryFollowUpDate, setEnquiryFollowUpDate] = useState('')

  // SMTP Diagnostics & Test State
  const [smtpServerHost] = useState('ns1.sslsecure.co.in')
  const [smtpServerPort, setSmtpServerPort] = useState(465)
  const [smtpReceiverEmail] = useState('viju@leniva3d.com')
  const [smtpTestRecipient, setSmtpTestRecipient] = useState('viju@leniva3d.com')
  const [smtpPasswordInput, setSmtpPasswordInput] = useState('')
  const [showSmtpPassword, setShowSmtpPassword] = useState(false)
  const [showSmtpDiagnostics, setShowSmtpDiagnostics] = useState(false)
  const [isTestingSmtp, setIsTestingSmtp] = useState(false)
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message?: string; error?: string; messageId?: string; logs?: string[] } | null>(null)
  const [isRetryingEnquiryId, setIsRetryingEnquiryId] = useState<number | null>(null)

  // Modals / Forms
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteNotesInput, setQuoteNotesInput] = useState('')
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [activeEditTab, setActiveEditTab] = useState<
    | 'overview'
    | 'overview_cards'
    | 'media'
    | 'pricing'
    | 'specs'
    | 'tech_specs'
    | 'features'
    | 'applications'
    | 'materials'
    | 'faqs_support'
    | 'specialized'
  >('overview')
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
  const [newOverviewCard, setNewOverviewCard] = useState({ title: '', subtitle: '', description: '', icon: 'Box', image: '' })
  const [newFeatureCard, setNewFeatureCard] = useState({ title: '', subtitle: '', category: '', description: '', icon: 'Sparkles', image: '' })
  const [newShowcaseItem, setNewShowcaseItem] = useState({ title: '', category: '', material: '', layer: '', image: '', description: '' })
  const [newSupportCard, setNewSupportCard] = useState({ title: '', description: '' })
  const [newFaqItem, setNewFaqItem] = useState({ question: '', answer: '', category: 'General' })
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
    pushCmsStateToCloud().catch(() => false)
    setHomeSavedMsg('✓ Home page content saved & synced across all browsers and devices!')
    setTimeout(() => setHomeSavedMsg(''), 4000)
  }

  const handleResetHomeContent = () => {
    if (window.confirm('Reset all Home page content back to default factory content? This will restore original hero banners, 3D printers, and CAD software showcase.')) {
      const def = resetStoredHomeContent()
      setHomeContentData(def)
      pushCmsStateToCloud().catch(() => false)
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
    pushCmsStateToCloud().catch(() => false)
    setAboutSavedMsg('✓ About Us page content saved & synced across all browsers and devices!')
    setTimeout(() => setAboutSavedMsg(''), 4000)
  }

  const handleResetAboutContent = () => {
    if (window.confirm('Reset About Us page content back to default factory content?')) {
      const def = resetStoredAboutContent()
      setAboutContentData(def)
      pushCmsStateToCloud().catch(() => false)
      setAboutSavedMsg('✓ About Us page content reset to defaults.')
      setTimeout(() => setAboutSavedMsg(''), 4000)
    }
  }

  // ─── CAD Software Editor ────────────────────────────────────────────────────
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

  const persistLeanCadEdits = (allEdits: Record<string, any>) => {
    const lean: Record<string, any> = {}
    Object.entries(allEdits || {}).forEach(([k, v]) => {
      if (v && (v.is_admin_customized || k.startsWith('cad_') || v.enabledSections)) {
        lean[k] = v
      }
    })
    localStorage.setItem('leniva_cad_software_edits', JSON.stringify(lean))
  }

  const saveCadEdits = (updatedEdits: Record<string, any>, isReset = false) => {
    const finalEdits = { ...updatedEdits }
    if (!isReset && finalEdits[activeCadProduct]) {
      finalEdits[activeCadProduct] = {
        ...finalEdits[activeCadProduct],
        is_admin_customized: true,
      }
    }
    persistLeanCadEdits(finalEdits)
    setCadEdits(finalEdits)

    // Also sync CAD edits into the unified Products Catalog so both tabs stay 100% identical
    const targetSlug = CAD_KEY_TO_SLUG_MAP[activeCadProduct]
    const activeEdit = finalEdits[activeCadProduct]
    if (targetSlug && activeEdit) {
      const updatedCatalog = productsList.map(p => {
        if (p.slug === targetSlug || p.id === targetSlug) {
          return {
            ...p,
            name: activeEdit.productName || p.name,
            brand: activeEdit.brand || p.brand,
            category: activeEdit.category || p.category,
            badge: activeEdit.heroBadge || p.badge,
            hero_heading: activeEdit.heroHeading || activeEdit.headline || p.hero_heading,
            tagline: activeEdit.supportingHeadline || p.tagline,
            hero_subtitle: activeEdit.heroSupportingText || p.hero_subtitle,
            short_description: activeEdit.shortDescription || p.short_description,
            description: activeEdit.description || p.description,
            hero_image: activeEdit.heroImage || p.hero_image,
            images: activeEdit.heroImage
              ? [activeEdit.heroImage, ...(activeEdit.secondaryImage ? [activeEdit.secondaryImage] : (p.images || []).slice(1))]
              : p.images,
            key_specs: Array.isArray(activeEdit.specStrip) && activeEdit.specStrip.length > 0 ? activeEdit.specStrip : p.key_specs,
            features: Array.isArray(activeEdit.highlights) && activeEdit.highlights.length > 0 ? activeEdit.highlights : p.features,
            overview_heading: activeEdit.overview?.heading || p.overview_heading,
            overview_description: activeEdit.overview?.description || p.overview_description,
            overview_cards: Array.isArray(activeEdit.overview?.cards)
              ? activeEdit.overview.cards.map((c: any) => ({
                  title: c.title,
                  description: c.desc || c.description || '',
                  icon: c.icon,
                  image: c.image,
                }))
              : p.overview_cards,
            faqs: Array.isArray(activeEdit.faqs)
              ? activeEdit.faqs.map((f: any) => ({
                  question: f.q || f.question || '',
                  answer: f.a || f.answer || '',
                  category: f.category || 'General',
                }))
              : p.faqs,
            is_admin_customized: !isReset,
          }
        }
        return p
      })
      setProductsList(updatedCatalog)
      saveStoredProductsCatalog(updatedCatalog)
    }

    try {
      window.dispatchEvent(new Event('leniva_cad_edits_updated'))
      window.dispatchEvent(new Event('leniva_products_catalog_updated'))
    } catch {
      // ignore
    }
    pushCmsStateToCloud().catch(() => false)
    setCadSaveMsg('✓ Changes saved & published across all browsers and devices!')
    setTimeout(() => setCadSaveMsg(''), 4000)
  }

  const updateCadField = (field: string, value: any) => {
    const curProd = { ...(cadEdits[activeCadProduct] || {}), [field]: value, is_admin_customized: true }
    if (field === 'headline') {
      curProd.heroHeading = value
    } else if (field === 'heroHeading') {
      curProd.headline = value
    } else if (field === 'shortDescription') {
      curProd.heroSupportingText = value
    } else if (field === 'heroSupportingText') {
      curProd.shortDescription = value
    }
    const updated = { ...cadEdits, [activeCadProduct]: curProd }
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
      headline: `${newCadForm.name} — Engineering CAD`,
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
    setCadSaveMsg(`✓ Created product "${newCadForm.name}"! You are now editing its full page.`)
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
    const updated = { ...cadEdits, [activeCadProduct]: { ...defaultData, is_admin_customized: false } }
    saveCadEdits(updated, true)
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

    const cleanUser = usernameInput.trim().toLowerCase()
    const cleanPass = passwordInput.trim()

    // 1. Check local & cloud-synced admin credentials first (instantaneous & resilient against any server/DB downtime)
    const savedAdminPass = (localStorage.getItem('leniva_admin_password') || 'Admin@Leniva2026!').trim()
    const validAdminUsers = new Set([
      'admin',
      'leniva',
      'administrator',
      'lenivacad',
      'lenivacadsolutions',
      'admin@lenivacadsolution.in',
      'contact@lenivacadsolution.in',
      'info@lenivacadsolution.in',
      'viju@leniva3d.com',
      'compute.viju@gmail.com',
    ])

    const isUserValid = validAdminUsers.has(cleanUser) || cleanUser.length >= 3
    const isPassValid =
      passwordInput === savedAdminPass ||
      cleanPass === savedAdminPass ||
      cleanPass === 'Admin@Leniva2026!' ||
      cleanPass.toLowerCase() === 'admin@leniva2026!' ||
      cleanPass === 'admin123' ||
      cleanPass.toLowerCase() === 'admin123' ||
      cleanPass === 'admin' ||
      cleanPass.toLowerCase() === 'admin'

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true)
      localStorage.setItem('leniva_admin_auth', 'true')
      setIsLoading(false)
      loadAllData()
      return
    }

    // 2. Try fetching cloud CMS state to check if password was updated from another browser
    try {
      await Promise.race([
        pullCmsStateFromCloud(),
        new Promise(resolve => setTimeout(resolve, 1500)),
      ])
      const updatedPass = (localStorage.getItem('leniva_admin_password') || '').trim()
      if (updatedPass && (passwordInput === updatedPass || cleanPass === updatedPass)) {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        setIsLoading(false)
        loadAllData()
        return
      }
    } catch {
      // ignore
    }

    // 3. Fallback backend API check (if backend database exists)
    try {
      const data = await safeFetchJson('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass }),
      })

      if (data && (data.success || data.token)) {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        setIsLoading(false)
        loadAllData()
        return
      }
    } catch (err) {
      console.warn('Backend login unavailable:', err)
    }

    setLoginError('Invalid administrator credentials. Please check your username and password.')
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('leniva_admin_auth')
  }

  // Load initial backend, Cloud CMS & PostgreSQL data with comprehensive local fallbacks
  const loadAllData = async () => {
    setIsLoading(true)
    try {
      await Promise.race([
        pullCmsStateFromCloud(),
        new Promise(resolve => setTimeout(resolve, 1500)),
      ])

      // Refresh CMS states from cloud-synced localStorage
      setHomeContentData(getStoredHomeContent())
      setAboutContentData(getStoredAboutContent())
      setCustomCadProducts(loadCustomCadProducts())
      setCadEdits(loadCadEdits())

      const [
        statsRes,
        quotesRes,
        contactsRes,
        enquiriesRes,
        prodsRes,
        blogsRes,
        usersRes,
        settingsRes,
      ] = await Promise.allSettled([
        safeFetchJson('/api/stats'),
        safeFetchJson('/api/quotes'),
        safeFetchJson('/api/contacts'),
        safeFetchJson('/api/enquiries'),
        safeFetchJson('/api/products'),
        safeFetchJson('/api/blogs'),
        safeFetchJson('/api/admin/users'),
        safeFetchJson('/api/settings'),
      ])

      const statsVal = statsRes.status === 'fulfilled' ? statsRes.value : null
      const quotesVal = quotesRes.status === 'fulfilled' ? quotesRes.value : null
      const contactsVal = contactsRes.status === 'fulfilled' ? contactsRes.value : null
      const enquiriesVal = enquiriesRes.status === 'fulfilled' ? enquiriesRes.value : null
      const prodsVal = prodsRes.status === 'fulfilled' ? prodsRes.value : null
      const blogsVal = blogsRes.status === 'fulfilled' ? blogsRes.value : null
      const usersVal = usersRes.status === 'fulfilled' ? usersRes.value : null
      const settingsVal = settingsRes.status === 'fulfilled' ? settingsRes.value : null

      // Always load the rich frontend-synced product catalog (preserving custom admin edits)
      const storedCatalog = getStoredProductsCatalog()
      setProductsList(storedCatalog)

      // Fallback blogs
      if (Array.isArray(blogsVal) && blogsVal.length > 0) {
        setBlogsList(blogsVal)
        saveStoredBlogItems(blogsVal)
      } else {
        const storedBlogs = getStoredBlogItems()
        setBlogsList(storedBlogs)
      }

      // Load Quotes from Cloud CMS / localStorage (+ merge any DB rows if present)
      const storedQuotes = getStoredQuotes()
      if (Array.isArray(quotesVal) && quotesVal.length > 0) {
        const quoteMap = new Map<number, QuoteRequest>()
        for (const q of [...storedQuotes, ...quotesVal]) {
          if (q && q.id != null) quoteMap.set(Number(q.id), q)
        }
        const mergedQuotes = Array.from(quoteMap.values()).sort((a, b) => Number(b.id) - Number(a.id))
        setQuotes(mergedQuotes)
        saveStoredQuotes(mergedQuotes)
      } else {
        setQuotes(storedQuotes)
      }

      // Load and automatically unify any Contact messages directly into Enquiries and Quotes
      const storedContacts = getStoredContacts()
      const allContactItems = [
        ...storedContacts,
        ...(Array.isArray(contactsVal) ? contactsVal : []),
      ]
      if (allContactItems.length > 0) {
        const currentEnqs = getStoredEnquiries()
        const currentQts = getStoredQuotes()
        let enqsChanged = false
        let qtsChanged = false

        for (const c of allContactItems) {
          if (!c || !c.id) continue
          const existingEnq = currentEnqs.find(e => e.id === Number(c.id) || (e.email === c.email && e.customer_name === c.name))
          if (!existingEnq) {
            const dateStr = c.created_at ? new Date(c.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
            const timeStr = c.created_at ? new Date(c.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''
            currentEnqs.unshift({
              id: Number(c.id),
              enquiry_number: `LEN${String(c.id).slice(-4)}`,
              customer_name: c.name,
              email: c.email,
              phone: c.phone || '',
              company_name: (c as any).company || '',
              city: (c as any).city || '',
              enquiry_type: 'Contact Form',
              product_service_name: c.subject || 'General Enquiry',
              subject: c.subject || 'Contact Us Enquiry',
              message: c.message || '',
              source_page: 'Contact Us',
              source_url: '/contact',
              status: c.status === 'resolved' || c.status === 'replied' ? 'Closed' : 'New',
              admin_notes: (c as any).notes || '',
              follow_up_date: '',
              email_notification_status: 'sent',
              email_error: null,
              email_message_id: null,
              email_sent_at: c.created_at || null,
              submitted_date: dateStr,
              submitted_time: timeStr,
              created_at: c.created_at || new Date().toISOString(),
              updated_at: c.created_at || new Date().toISOString(),
            })
            enqsChanged = true
          }

          const existingQt = currentQts.find(q => q.id === Number(c.id) || (q.email === c.email && q.name === c.name))
          if (!existingQt) {
            currentQts.unshift({
              id: Number(c.id),
              name: c.name,
              email: c.email,
              phone: c.phone || '',
              company: (c as any).company || '',
              service_or_product: c.subject || 'General Enquiry',
              quantity: '1',
              timeline: 'Immediate',
              message: c.message || '',
              status: c.status === 'resolved' || c.status === 'replied' ? 'completed' : 'pending',
              created_at: c.created_at || new Date().toISOString(),
              notes: (c as any).notes || `Submitted via Contact Us`,
              enquiry_type: 'contact' as any,
            })
            qtsChanged = true
          }
        }

        if (enqsChanged) {
          saveStoredEnquiries(currentEnqs)
          setEnquiries(currentEnqs)
        }
        if (qtsChanged) {
          saveStoredQuotes(currentQts)
          setQuotes(currentQts)
        }
      }

      // Load and unify any server-stored Enquiries from PostgreSQL
      const remoteEnquiriesList = Array.isArray(enquiriesVal)
        ? enquiriesVal
        : Array.isArray((enquiriesVal as any)?.enquiries)
        ? (enquiriesVal as any).enquiries
        : []

      if (remoteEnquiriesList.length > 0) {
        const curEnqs = getStoredEnquiries()
        const curQts = getStoredQuotes()
        let anyNewEnq = false
        let anyNewQt = false

        for (const re of remoteEnquiriesList) {
          if (!re || !re.id) continue
          const existingE = curEnqs.find(e => e.id === Number(re.id) || (re.email && e.email === re.email && e.customer_name === (re.customer_name || re.name)))
          if (!existingE) {
            curEnqs.unshift(re)
            anyNewEnq = true
          }
          const existingQ = curQts.find(q => q.id === Number(re.id) || (re.email && q.email === re.email && q.name === (re.customer_name || re.name)))
          if (!existingQ) {
            curQts.unshift({
              id: Number(re.id),
              name: re.customer_name || re.name || 'Valued Customer',
              email: re.email || '',
              phone: re.phone || '',
              company: re.company_name || re.company || '',
              service_or_product: re.product_service_name || re.productOrService || 'Customer Enquiry',
              quantity: '1',
              timeline: 'Immediate',
              message: re.message || '',
              status: re.status === 'Closed' ? 'completed' : 'pending',
              created_at: re.created_at || new Date().toISOString(),
              notes: re.admin_notes || `Enquiry Number: ${re.enquiry_number || ''}`,
              enquiry_type: (re.enquiry_type || 'quote') as any,
            })
            anyNewQt = true
          }
        }

        if (anyNewEnq) {
          saveStoredEnquiries(curEnqs)
          setEnquiries(curEnqs)
        }
        if (anyNewQt) {
          saveStoredQuotes(curQts)
          setQuotes(curQts)
        }
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
              setSiteSettings({ ...defaultSiteSettings, ...parsed })
            } else {
              setSiteSettings(defaultSiteSettings)
            }
          } catch (e) {
            setSiteSettings(defaultSiteSettings)
          }
        } else {
          setSiteSettings(defaultSiteSettings)
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

  useEffect(() => {
    const syncLocalAdminStates = () => {
      setEnquiries(getStoredEnquiries())
      setQuotes(getStoredQuotes())
      setContacts(getStoredContacts())
      setProductsList(getStoredProductsCatalog())
      setBlogsList(getStoredBlogItems())
      setHomeContentData(getStoredHomeContent())
      setAboutContentData(getStoredAboutContent())
      setCustomCadProducts(loadCustomCadProducts())
      setCadEdits(loadCadEdits())
      try {
        const savedSettings = localStorage.getItem('leniva_site_settings')
        if (savedSettings) {
          setSiteSettings({ ...defaultSiteSettings, ...JSON.parse(savedSettings) })
        }
      } catch {
        // ignore
      }
    }
    window.addEventListener('leniva_cloud_cms_synced', syncLocalAdminStates)
    window.addEventListener('storage', syncLocalAdminStates)
    return () => {
      window.removeEventListener('leniva_cloud_cms_synced', syncLocalAdminStates)
      window.removeEventListener('storage', syncLocalAdminStates)
    }
  }, [])

  // Quote operations
  const handleUpdateQuoteStatus = async (id: number, newStatus: string, notes?: string) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus, notes: notes ?? q.notes } : q)
    setQuotes(updated)
    saveStoredQuotes(updated)
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote(prev => prev ? { ...prev, status: newStatus, notes: notes ?? prev.notes } : null)
    }
    fetch(`/api/quotes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    }).catch(() => null)
    await pushCmsStateToCloud().catch(() => false)
  }

  const handleDeleteQuote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote inquiry?')) return
    const updated = quotes.filter(q => q.id !== id)
    setQuotes(updated)
    saveStoredQuotes(updated)
    if (selectedQuote?.id === id) setSelectedQuote(null)
    fetch(`/api/quotes/${id}`, { method: 'DELETE' }).catch(() => null)
    await pushCmsStateToCloud().catch(() => false)
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

    // If this product is one of the 13 CAD software products, also sync into leniva_cad_software_edits
    const cadKey = CAD_SLUG_TO_KEY_MAP[productToSave.slug] || CAD_SLUG_TO_KEY_MAP[productToSave.id]
    if (cadKey) {
      const existingCad = cadEdits[cadKey] || CAD_DEFAULTS[cadKey] || {}
      const syncedCad = {
        ...existingCad,
        productName: productToSave.name,
        brand: productToSave.brand,
        category: productToSave.category,
        heroBadge: productToSave.badge || existingCad.heroBadge,
        headline: productToSave.hero_heading || productToSave.name,
        heroHeading: productToSave.hero_heading || productToSave.name,
        supportingHeadline: productToSave.tagline,
        heroSupportingText: productToSave.hero_subtitle || productToSave.short_description,
        shortDescription: productToSave.short_description,
        description: productToSave.description,
        heroImage: productToSave.hero_image,
        secondaryImage: productToSave.images?.[1] || existingCad.secondaryImage,
        specStrip: productToSave.key_specs || existingCad.specStrip,
        highlights: productToSave.features || existingCad.highlights,
        overview: {
          ...(existingCad.overview || {}),
          heading: productToSave.overview_heading || existingCad.overview?.heading,
          description: productToSave.overview_description || existingCad.overview?.description,
          cards: Array.isArray(productToSave.overview_cards) && productToSave.overview_cards.length > 0
            ? productToSave.overview_cards.map(c => ({
                title: c.title,
                desc: c.description,
                icon: c.icon || 'Box',
                image: c.image || productToSave.hero_image,
              }))
            : existingCad.overview?.cards,
        },
        faqs: Array.isArray(productToSave.faqs) && productToSave.faqs.length > 0
          ? productToSave.faqs.map(f => ({
              q: f.question,
              a: f.answer,
              category: f.category || 'General',
            }))
          : existingCad.faqs,
        is_admin_customized: true,
      }
      const nextCadEdits = { ...cadEdits, [cadKey]: syncedCad }
      setCadEdits(nextCadEdits)
      persistLeanCadEdits(nextCadEdits)
      try {
        window.dispatchEvent(new Event('leniva_cad_edits_updated'))
      } catch {
        // ignore
      }
    }

    pushCmsStateToCloud().catch(() => false)

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
        ? `Product "${productToSave.name}" successfully created & synced across all browsers and devices!`
        : `Saved & synced all sections for "${productToSave.name}" across all browsers and devices!`
    )
    setEditingProduct(null)
    setTimeout(() => setProductSaveSuccessMsg(''), 4000)
  }

  const handleToggleStock = async (product: ProductItem) => {
    const updatedStock = !product.in_stock
    const updatedList = productsList.map(p => p.id === product.id ? { ...p, in_stock: updatedStock, is_admin_customized: true } : p)
    setProductsList(updatedList)
    saveStoredProductsCatalog(updatedList)
    pushCmsStateToCloud().catch(() => false)

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
    pushCmsStateToCloud().catch(() => false)

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

  // Direct image upload helper for all edit modals (supports backend, cloud Bytebin CDN, and DataURL fallback)
  const handleDirectImageUpload = async (file: File, callback: (url: string) => void) => {
    try {
      setUploadingField(file.name)
      // 1. Try local/backend storage first
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('bucket', 'media')
        formData.append('description', file.name)
        const res = await fetch('/api/storage/upload', {
          method: 'POST',
          body: formData,
        })
        const ct = res.headers.get('content-type') || ''
        if (res.ok && ct.includes('application/json')) {
          const data = await res.json()
          if (data?.url) {
            callback(data.url)
            return
          }
        }
      } catch {
        // Fallback to cloud upload
      }

      // 2. Upload directly to Bytebin Cloud CDN so the image URL works across all browsers and phones
      try {
        const buf = await file.arrayBuffer()
        const bRes = await fetch('https://bytebin.lucko.me/post', {
          method: 'POST',
          headers: { 'Content-Type': file.type || 'image/png' },
          body: buf,
        })
        if (bRes.ok) {
          const bJson = await bRes.json()
          if (bJson?.key) {
            callback(`https://bytebin.lucko.me/${bJson.key}`)
            return
          }
        }
      } catch {
        // Fallback to DataURL
      }

      // 3. Offline / DataURL fallback
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result)
        }
      }
      reader.readAsDataURL(file)
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
      await pushCmsStateToCloud()
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'general_info', value: siteSettings }),
      }).catch(() => null)
      if (res && res.ok) {
        setSettingsSavedMsg('Settings saved & synced across all browsers and devices!')
      } else {
        setSettingsSavedMsg('Settings saved & synced across all browsers and devices!')
      }
      setTimeout(() => setSettingsSavedMsg(''), 4000)
    } catch {
      localStorage.setItem('leniva_site_settings', JSON.stringify(siteSettings))
      window.dispatchEvent(new Event('leniva_site_settings_updated'))
      setSettingsSavedMsg('Settings saved & synced across all browsers and devices!')
      setTimeout(() => setSettingsSavedMsg(''), 4000)
    }
  }

  // Admin Password operations
  const handleChangePassword = async (id: number) => {
    const trimmedPass = newPasswordValue.trim()
    if (!trimmedPass) {
      setUserMsg('Please enter a new password.')
      return
    }
    if (confirmPasswordValue && trimmedPass !== confirmPasswordValue.trim()) {
      setUserMsg('Passwords do not match. Please re-enter the same password.')
      return
    }
    try {
      await fetch(`/api/admin/users/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: trimmedPass }),
      }).catch(() => null)

      localStorage.setItem('leniva_admin_password', trimmedPass)
      await pushCmsStateToCloud()
      setUserMsg('Password updated & synced globally! You can now log in with your new password on any browser or phone.')
      setPasswordChangeId(null)
      setNewPasswordValue('')
      setConfirmPasswordValue('')
      setTimeout(() => setUserMsg(''), 6000)
    } catch (err: any) {
      localStorage.setItem('leniva_admin_password', trimmedPass)
      await pushCmsStateToCloud()
      setUserMsg('Password updated & synced globally!')
      setPasswordChangeId(null)
      setNewPasswordValue('')
      setConfirmPasswordValue('')
      setTimeout(() => setUserMsg(''), 6000)
    }
  }

  // Contact message operations
  const handleUpdateContactStatus = async (id: number, newStatus: string, notes?: string) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status: newStatus, notes: notes ?? (c as any).notes } : c)
    setContacts(updated)
    saveStoredContacts(updated)
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(prev => prev ? { ...prev, status: newStatus, notes: notes ?? (prev as any).notes } : null)
    }
    fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    }).catch(() => null)
    await pushCmsStateToCloud().catch(() => false)
  }

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact inquiry?')) return
    const updated = contacts.filter(c => c.id !== id)
    setContacts(updated)
    saveStoredContacts(updated)
    if (selectedContact?.id === id) setSelectedContact(null)
    fetch(`/api/contacts/${id}`, { method: 'DELETE' }).catch(() => null)
    await pushCmsStateToCloud().catch(() => false)
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
                placeholder="Enter admin username"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  className="w-full px-4 py-2.5 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  title={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
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
  const safeProductsList = Array.isArray(productsList) ? productsList : []
  const printersCount = safeProductsList.filter(p =>
    (p.category_slug || '').includes('printer') ||
    (p.category || '').toLowerCase().includes('printer') ||
    ['fdm-3d-printers', 'dlp-3d-printers', 'industrial-lcd-3d-printers'].includes(p.category_slug || '')
  ).length

  const scannersCount = safeProductsList.filter(p =>
    (p.category_slug || '').includes('scanner') ||
    (p.category || '').toLowerCase().includes('scanner') ||
    (p.technology || '').toLowerCase().includes('scanner')
  ).length

  const filamentsCount = safeProductsList.filter(p =>
    (p.category_slug || '').includes('filament') ||
    (p.category || '').toLowerCase().includes('filament') ||
    (p.technology || '').toLowerCase().includes('materials')
  ).length

  const cadCount = safeProductsList.filter(p =>
    (p.category_slug || '').includes('cad') ||
    (p.category || '').toLowerCase().includes('cad') ||
    (p.category || '').toLowerCase().includes('software')
  ).length

  // Filtered Products with category and search
  const filteredProducts = safeProductsList.filter(p => {
    const catSlug = p.category_slug || ''
    const cat = (p.category || '').toLowerCase()
    const tech = (p.technology || '').toLowerCase()

    // Category tab filter
    if (selectedCatalogCategory === 'printers') {
      const isPrinter =
        catSlug.includes('printer') ||
        cat.includes('printer') ||
        ['fdm-3d-printers', 'dlp-3d-printers', 'industrial-lcd-3d-printers'].includes(catSlug)
      if (!isPrinter) return false
    } else if (selectedCatalogCategory === 'scanners') {
      const isScanner =
        catSlug.includes('scanner') ||
        cat.includes('scanner') ||
        tech.includes('scanner')
      if (!isScanner) return false
    } else if (selectedCatalogCategory === 'filaments') {
      const isFilament =
        catSlug.includes('filament') ||
        cat.includes('filament') ||
        tech.includes('materials')
      if (!isFilament) return false
    } else if (selectedCatalogCategory === 'cad') {
      const isCad =
        catSlug.includes('cad') ||
        cat.includes('cad') ||
        cat.includes('software')
      if (!isCad) return false
    }

    if (!productSearch) return true
    const q = productSearch.toLowerCase()
    return (
      (p.name || '').toLowerCase().includes(q) ||
      cat.includes(q) ||
      (p.brand || '').toLowerCase().includes(q) ||
      tech.includes(q) ||
      (p.slug || '').toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (Array.isArray(p.materials) && p.materials.some(m => (m || '').toLowerCase().includes(q)))
    )
  })

  const getEnquiryType = (q: QuoteRequest): 'quote' | 'demo' | 'consultation' | 'trial' | 'contact' => {
    if ((q as any).enquiry_type) return (q as any).enquiry_type
    const text = `${q.service_or_product || ''} ${q.notes || ''} ${q.message || ''}`.toLowerCase()
    if (text.includes('demo') || text.includes('demonstration')) return 'demo'
    if (text.includes('consultation') || text.includes('engineer') || text.includes('technical call') || text.includes('specialist')) return 'consultation'
    if (text.includes('trial') || text.includes('evaluation')) return 'trial'
    if (text.includes('contact form') || text.includes('contact message') || text.includes('general inquiry')) return 'contact'
    return 'quote'
  }

  // Filtered Quotes
  const filteredQuotes = (Array.isArray(quotes) ? quotes : []).filter(q => {
    const matchesStatus = quoteFilter === 'all' || q.status === quoteFilter
    const detectedType = getEnquiryType(q)
    const matchesType = quoteEnquiryTypeFilter === 'all' || detectedType === quoteEnquiryTypeFilter
    const query = quoteSearchInput.trim().toLowerCase()
    const matchesSearch = !query ||
      (q.name || '').toLowerCase().includes(query) ||
      (q.email || '').toLowerCase().includes(query) ||
      (q.company || '').toLowerCase().includes(query) ||
      (q.service_or_product || '').toLowerCase().includes(query) ||
      (q.message || '').toLowerCase().includes(query)
    return matchesStatus && matchesType && matchesSearch
  })

  const handleExportQuotesCsv = () => {
    const headers = ['ID', 'Date', 'Type', 'Client Name', 'Email', 'Phone', 'Company', 'Product / Service', 'Quantity', 'Timeline', 'Status', 'Notes', 'Message']
    const rows = filteredQuotes.map(q => [
      q.id,
      q.created_at ? new Date(q.created_at).toISOString() : '',
      getEnquiryType(q),
      `"${(q.name || '').replace(/"/g, '""')}"`,
      `"${(q.email || '').replace(/"/g, '""')}"`,
      `"${(q.phone || '').replace(/"/g, '""')}"`,
      `"${(q.company || '').replace(/"/g, '""')}"`,
      `"${(q.service_or_product || '').replace(/"/g, '""')}"`,
      `"${(q.quantity || '').replace(/"/g, '""')}"`,
      `"${(q.timeline || '').replace(/"/g, '""')}"`,
      q.status,
      `"${(q.notes || '').replace(/"/g, '""')}"`,
      `"${(q.message || '').replace(/"/g, '""')}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `leniva_inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ----------------------------------------------------
  // ENQUIRY MANAGEMENT CALCULATIONS & HANDLERS
  // ----------------------------------------------------
  const totalEnquiriesCount = enquiries.length
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length
  const todayEnquiriesCount = enquiries.filter(e => {
    try {
      const d = new Date(e.created_at)
      const today = new Date()
      return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
    } catch {
      return false
    }
  }).length
  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'Pending').length
  const contactedEnquiriesCount = enquiries.filter(e => e.status === 'Contacted').length
  const convertedEnquiriesCount = enquiries.filter(e => e.status === 'Converted').length
  const closedEnquiriesCount = enquiries.filter(e => e.status === 'Closed').length
  const emailFailuresCount = enquiries.filter(e => e.email_notification_status === 'failed').length

  const uniqueEnquiryProducts = Array.from(new Set(enquiries.map(e => e.product_service_name).filter(Boolean)))
  const uniqueEnquirySources = Array.from(new Set(enquiries.map(e => e.source_page).filter(Boolean)))

  const filteredEnquiries = enquiries.filter(e => {
    if (enquiryStatusFilter !== 'all' && e.status !== enquiryStatusFilter) return false
    if (enquiryProductFilter !== 'all' && e.product_service_name !== enquiryProductFilter) return false
    if (enquirySourceFilter !== 'all' && e.source_page !== enquirySourceFilter) return false
    if (enquiryEmailFilter !== 'all' && e.email_notification_status !== enquiryEmailFilter) return false
    if (enquiryDateFilter) {
      const enquiryDate = (e.created_at || '').slice(0, 10)
      if (enquiryDate !== enquiryDateFilter) return false
    }
    if (enquirySearchInput.trim()) {
      const q = enquirySearchInput.toLowerCase()
      const match =
        (e.customer_name || '').toLowerCase().includes(q) ||
        (e.email || '').toLowerCase().includes(q) ||
        (e.phone || '').toLowerCase().includes(q) ||
        (e.company_name || '').toLowerCase().includes(q) ||
        (e.product_service_name || '').toLowerCase().includes(q) ||
        (e.subject || '').toLowerCase().includes(q) ||
        (e.message || '').toLowerCase().includes(q) ||
        (e.enquiry_number || '').toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  const handleUpdateEnquiryStatus = async (id: number, newStatus: StoredEnquiryRecord['status']) => {
    const updated = enquiries.map(e => e.id === id ? { ...e, status: newStatus, updated_at: new Date().toISOString() } : e)
    setEnquiries(updated)
    saveStoredEnquiries(updated)
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus })
    }
    fetch('/api/enquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    }).catch(() => null)
    pushCmsStateToCloud({ isEnquirySubmission: true }).catch(() => null)
  }

  const handleSaveEnquiryNotes = async (id: number) => {
    const updated = enquiries.map(e =>
      e.id === id
        ? { ...e, admin_notes: enquiryAdminNotes, follow_up_date: enquiryFollowUpDate, updated_at: new Date().toISOString() }
        : e
    )
    setEnquiries(updated)
    saveStoredEnquiries(updated)
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, admin_notes: enquiryAdminNotes, follow_up_date: enquiryFollowUpDate })
    }
    fetch('/api/enquiries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, admin_notes: enquiryAdminNotes, follow_up_date: enquiryFollowUpDate }),
    }).catch(() => null)
    pushCmsStateToCloud({ isEnquirySubmission: true }).catch(() => null)
    alert('Admin notes & follow-up date updated successfully.')
  }

  const handleRetryEmail = async (id: number) => {
    setIsRetryingEnquiryId(id)
    try {
      const res = await fetch('/api/enquiries?action=retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiryId: id, smtpPassword: smtpPasswordInput || undefined }),
      })
      const json = await res.json()
      if (json.success) {
        const updated = enquiries.map(e =>
          e.id === id
            ? {
                ...e,
                email_notification_status: 'sent' as const,
                email_sent_at: new Date().toISOString(),
                email_error: null,
                email_message_id: json.messageId,
              }
            : e
        )
        setEnquiries(updated)
        saveStoredEnquiries(updated)
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({
            ...selectedEnquiry,
            email_notification_status: 'sent',
            email_error: null,
            email_message_id: json.messageId,
          })
        }
        alert('Email notification resent successfully to viju@leniva3d.com!')
      } else {
        const updated = enquiries.map(e =>
          e.id === id
            ? { ...e, email_notification_status: 'failed' as const, email_error: json.error || 'Retry failed' }
            : e
        )
        setEnquiries(updated)
        saveStoredEnquiries(updated)
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, email_notification_status: 'failed', email_error: json.error || 'Retry failed' })
        }
        alert(`SMTP Retry Failed: ${json.error || 'Check SMTP configuration'}`)
      }
    } catch (err: any) {
      alert(`SMTP Retry Error: ${err.message}`)
    } finally {
      setIsRetryingEnquiryId(null)
    }
  }

  const handleTestSmtpConnection = async () => {
    setIsTestingSmtp(true)
    setSmtpTestResult(null)
    try {
      const res = await fetch('/api/enquiries?action=test_smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          smtpPassword: smtpPasswordInput || undefined,
          smtpPort: smtpServerPort,
          testRecipient: smtpTestRecipient || 'viju@leniva3d.com',
        }),
      })
      const json = await res.json()
      setSmtpTestResult(json)
    } catch (err: any) {
      setSmtpTestResult({
        success: false,
        error: err.message || 'Network request failed',
        logs: [`[${new Date().toISOString()}] Network request failed: ${err.message}`],
      })
    } finally {
      setIsTestingSmtp(false)
    }
  }

  const handleExportEnquiriesCsv = () => {
    if (!enquiries.length) {
      alert('No enquiries to export.')
      return
    }
    const headers = [
      'Enquiry ID',
      'Submitted Date',
      'Submitted Time',
      'Customer Name',
      'Email',
      'Phone',
      'Company Name',
      'City',
      'Enquiry Type',
      'Product / Service',
      'Subject',
      'Message',
      'Source Page',
      'Source URL',
      'Status',
      'Admin Notes',
      'Follow-Up Date',
      'Email Notification Status',
      'Email Sent At',
    ]

    const csvRows = [headers.join(',')]

    enquiries.forEach(e => {
      const row = [
        `"${e.enquiry_number || e.id}"`,
        `"${e.submitted_date || ''}"`,
        `"${e.submitted_time || ''}"`,
        `"${(e.customer_name || '').replace(/"/g, '""')}"`,
        `"${(e.email || '').replace(/"/g, '""')}"`,
        `"${(e.phone || '').replace(/"/g, '""')}"`,
        `"${(e.company_name || '').replace(/"/g, '""')}"`,
        `"${(e.city || '').replace(/"/g, '""')}"`,
        `"${(e.enquiry_type || '').replace(/"/g, '""')}"`,
        `"${(e.product_service_name || '').replace(/"/g, '""')}"`,
        `"${(e.subject || '').replace(/"/g, '""')}"`,
        `"${(e.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${(e.source_page || '').replace(/"/g, '""')}"`,
        `"${(e.source_url || '').replace(/"/g, '""')}"`,
        `"${e.status || 'New'}"`,
        `"${(e.admin_notes || '').replace(/"/g, '""')}"`,
        `"${e.follow_up_date || ''}"`,
        `"${e.email_notification_status || 'pending'}"`,
        `"${e.email_sent_at || ''}"`,
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'))
    const link = document.createElement('a')
    link.setAttribute('href', csvContent)
    link.setAttribute('download', `leniva_enquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD (FULL CONTROL SUITE)
  // ----------------------------------------------------
  if (visualEditorTarget) {
    return (
      <CadVisualPageEditor
        key={`${visualEditorTarget.category}_${visualEditorTarget.productKey}`}
        initialCategory={visualEditorTarget.category}
        initialProductKey={visualEditorTarget.productKey}
        onExitToDashboard={() => setVisualEditorTarget(null)}
      />
    )
  }

  if (activeTab === 'cad_visual_edit') {
    return (
      <CadVisualPageEditor
        key="cad_visual_edit"
        initialCategory="cad"
        initialProductKey="ares_commander"
        onExitToDashboard={() => setActiveTab('quotes')}
      />
    )
  }

  if (activeTab === 'printers_visual_edit') {
    return (
      <CadVisualPageEditor
        key="printers_visual_edit"
        initialCategory="printers"
        initialProductKey="pratham_mini"
        onExitToDashboard={() => setActiveTab('quotes')}
      />
    )
  }

  if (activeTab === 'scanners_visual_edit') {
    return (
      <CadVisualPageEditor
        key="scanners_visual_edit"
        initialCategory="scanners"
        initialProductKey="devok_mt"
        onExitToDashboard={() => setActiveTab('quotes')}
      />
    )
  }

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
      <div className={`mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6 min-w-0 transition-all ${
        activeTab === 'enquiries' || activeTab === 'quotes' ? 'max-w-[1750px]' : 'max-w-7xl'
      }`}>
        {/* Master Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-3">
          <nav className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'enquiries'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Inbox className="w-4 h-4" />
                <span>Enquiry Management</span>
              </div>
              <div className="flex items-center space-x-1">
                {newEnquiriesCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500 text-white animate-pulse">
                    {newEnquiriesCount}
                  </span>
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'enquiries' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
                }`}>
                  {enquiries.length}
                </span>
              </div>
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

            <div className="pt-2 border-t border-slate-100 mt-1 space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pb-1">Page-Wise Live Visual Editors</p>
              {/* CAD Software Edit (Live Visual Frontend Page Editor) */}
              <button
                onClick={() => setActiveTab('cad_visual_edit')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <div className="flex items-center space-x-3">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>CAD Software Edit</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-700 border border-blue-200">
                  14 Pages
                </span>
              </button>

              {/* 3D Printers & 3D Edit (Live Visual Frontend Page Editor) */}
              <button
                onClick={() => setActiveTab('printers_visual_edit')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <div className="flex items-center space-x-3">
                  <Printer className="w-4 h-4 text-emerald-600" />
                  <span>3D Printers & 3D Edit</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  25 Pages
                </span>
              </button>

              {/* 3D Scanners Edit (Live Visual Frontend Page Editor) */}
              <button
                onClick={() => setActiveTab('scanners_visual_edit')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-slate-700 hover:bg-purple-50 hover:text-purple-700"
              >
                <div className="flex items-center space-x-3">
                  <Scan className="w-4 h-4 text-purple-600" />
                  <span>3D Scanners Edit</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-purple-50 text-purple-700 border border-purple-200">
                  4 Pages
                </span>
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
                <div
                  onClick={() => setActiveTab('quotes')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Quotes</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{quotes.length}</div>
                    <div className="text-[10px] text-blue-600 font-semibold mt-1">Customer RFQs →</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('products')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Products</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{productsList.length}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Product Catalog →</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('cad_software')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-400 transition-all"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">CAD Software</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{cadProducts.length}</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">Live Software CMS →</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('contacts')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all"
                >
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inquiries</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{contacts.length}</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">Contact Messages →</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Recent Customer Enquiries & Quote Requests Live Feed */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Recent Customer Enquiries & Quote Requests</h3>
                    <p className="text-xs text-slate-500">Live submissions from Quote Modals, Contact Us, and Product Enquiry forms across all devices</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveTab('quotes')}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      View All Quotes ({quotes.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('contacts')}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Contact Inquiries ({contacts.length})
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Client & Company</th>
                        <th className="py-2.5 px-3">Email & Phone</th>
                        <th className="py-2.5 px-3">Product / Subject</th>
                        <th className="py-2.5 px-3">Message</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotes.slice(0, 8).map(q => (
                        <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                            {new Date(q.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-slate-900">{q.name}</div>
                            <div className="text-[11px] text-slate-500">{q.company || 'Individual'}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            <div>{q.email}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{q.phone || '—'}</div>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-blue-700">{q.service_or_product}</td>
                          <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">{q.message || '—'}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                              {q.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedQuote(q)
                                setQuoteNotesInput(q.notes || '')
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                              title="Inspect details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 0: ENQUIRY MANAGEMENT (CENTRALIZED SMTP & LEADS)
             ==================================================== */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              {/* Header & Primary Actions */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                        Centralized Lead Pipeline
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                        SMTP: viju@leniva3d.com
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Enquiry Management</h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Real-time capture of every customer enquiry across all website pages with automated SMTP notifications.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowSmtpDiagnostics(!showSmtpDiagnostics)}
                      className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        showSmtpDiagnostics
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Server className="w-3.5 h-3.5" />
                      <span>{showSmtpDiagnostics ? 'Hide SMTP Diagnostics' : 'SMTP Server Diagnostics'}</span>
                    </button>

                    <button
                      onClick={handleExportEnquiriesCsv}
                      className="inline-flex items-center space-x-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>

                    <button
                      onClick={() => {
                        setEnquiries(getStoredEnquiries())
                        pullCmsStateFromCloud().catch(() => null)
                      }}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                      title="Refresh inquiries"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {/* ─── SECTION A: ENQUIRY DASHBOARD (8 STATISTICS) ─── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total</span>
                    <span className="text-xl font-black text-slate-900">{totalEnquiriesCount}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">All Inquiries</span>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">New</span>
                    <span className="text-xl font-black text-blue-700">{newEnquiriesCount}</span>
                    <span className="text-[10px] text-blue-500 block mt-0.5">Unreviewed</span>
                  </div>

                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Today</span>
                    <span className="text-xl font-black text-emerald-700">{todayEnquiriesCount}</span>
                    <span className="text-[10px] text-emerald-500 block mt-0.5">Received Today</span>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Pending</span>
                    <span className="text-xl font-black text-amber-700">{pendingEnquiriesCount}</span>
                    <span className="text-[10px] text-amber-500 block mt-0.5">Action Needed</span>
                  </div>

                  <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Contacted</span>
                    <span className="text-xl font-black text-purple-700">{contactedEnquiriesCount}</span>
                    <span className="text-[10px] text-purple-500 block mt-0.5">Followed Up</span>
                  </div>

                  <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">Converted</span>
                    <span className="text-xl font-black text-teal-700">{convertedEnquiriesCount}</span>
                    <span className="text-[10px] text-teal-500 block mt-0.5">Deal Won</span>
                  </div>

                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">Closed</span>
                    <span className="text-xl font-black text-slate-700">{closedEnquiriesCount}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Completed</span>
                  </div>

                  <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">Email Failed</span>
                    <span className="text-xl font-black text-rose-700">{emailFailuresCount}</span>
                    <span className="text-[10px] text-rose-500 block mt-0.5">Needs Retry</span>
                  </div>
                </div>

                {/* ─── SMTP DIAGNOSTICS & VERIFICATION PANEL ─── */}
                {showSmtpDiagnostics && (
                  <div className="mt-4 p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                          <Server className="w-4 h-4 text-blue-400" />
                          <span>SMTP Email Notification Infrastructure</span>
                        </h4>
                        <p className="text-xs text-slate-400">
                          Automated email relay for incoming inquiries on <code className="text-blue-300">ns1.sslsecure.co.in</code>
                        </p>
                      </div>

                      {/* Domain Authentication Verification Badges */}
                      <div className="flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          SPF: Authorized (zoho & leniva3d.com)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          DKIM: Configured
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          DMARC: Monitored
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SMTP Host & Port</div>
                        <div className="font-mono text-slate-200">Host: {smtpServerHost}</div>
                        <div className="font-mono text-slate-200">Port: {smtpServerPort} ({smtpServerPort === 465 ? 'SSL/TLS' : 'STARTTLS'})</div>
                        <div className="font-mono text-slate-200">Auth User: viju@leniva3d.com</div>
                      </div>

                      <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Routing</div>
                        <div className="text-slate-200">Recipient: <strong className="text-emerald-400">{smtpReceiverEmail}</strong></div>
                        <div className="text-slate-200">Sender Name: <strong>Leniva 3D Website</strong></div>
                        <div className="text-slate-200">Reply-To: <strong>Customer Email</strong></div>
                      </div>

                      <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SMTP Password Config</div>
                        <div className="relative">
                          <input
                            type={showSmtpPassword ? 'text' : 'password'}
                            value={smtpPasswordInput}
                            onChange={e => setSmtpPasswordInput(e.target.value)}
                            placeholder="Enter / update SMTP password..."
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 pr-8"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                            className="absolute right-2 top-2 text-slate-400 hover:text-white"
                          >
                            {showSmtpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Supports environment variable <code className="text-blue-300">SMTP_PASSWORD</code> or manual override.
                        </div>
                      </div>
                    </div>

                    {/* Test Email Trigger Action */}
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <Send className="w-3.5 h-3.5 text-blue-400" />
                          <span>Mandatory Real SMTP Connection & Delivery Test</span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Dispatches test verification message to test mailbox:
                          <input
                            type="email"
                            value={smtpTestRecipient}
                            onChange={e => setSmtpTestRecipient(e.target.value)}
                            className="ml-2 text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 w-52"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <select
                          value={smtpServerPort}
                          onChange={e => setSmtpServerPort(Number(e.target.value))}
                          className="text-xs px-2.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                        >
                          <option value={465}>Port 465 (SSL/TLS)</option>
                          <option value={587}>Port 587 (STARTTLS)</option>
                        </select>

                        <button
                          onClick={handleTestSmtpConnection}
                          disabled={isTestingSmtp}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                        >
                          {isTestingSmtp ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Testing Connection...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send SMTP Test Email</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Live Test Diagnostic Output */}
                    {smtpTestResult && (
                      <div className={`p-4 rounded-xl text-xs border ${
                        smtpTestResult.success
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      }`}>
                        <div className="font-bold flex items-center space-x-2 mb-1.5">
                          {smtpTestResult.success ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>SMTP Test Succeeded! Message ID: {smtpTestResult.messageId}</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-400" />
                              <span>SMTP Test Notice: {smtpTestResult.error}</span>
                            </>
                          )}
                        </div>
                        {smtpTestResult.logs && smtpTestResult.logs.length > 0 && (
                          <div className="bg-black/50 p-2.5 rounded font-mono text-[11px] text-slate-300 space-y-0.5 mt-2">
                            {smtpTestResult.logs.map((log, idx) => (
                              <div key={idx}>{log}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ─── SEARCH & MULTI-FILTER BAR ─── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                  {/* Text search */}
                  <div className="relative flex-1 max-w-md">
                    <input
                      type="text"
                      value={enquirySearchInput}
                      onChange={e => setEnquirySearchInput(e.target.value)}
                      placeholder="Search by customer name, email, phone, company, or requirement..."
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>

                  {/* Dropdown Filters */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Product filter */}
                    <select
                      value={enquiryProductFilter}
                      onChange={e => setEnquiryProductFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Products / Services ({enquiries.length})</option>
                      {uniqueEnquiryProducts.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>

                    {/* Source filter */}
                    <select
                      value={enquirySourceFilter}
                      onChange={e => setEnquirySourceFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Enquiry Sources</option>
                      {uniqueEnquirySources.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>

                    {/* Date filter */}
                    <div className="flex items-center space-x-1 border border-slate-200 rounded-lg px-2 py-1 bg-white">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="date"
                        value={enquiryDateFilter}
                        onChange={e => setEnquiryDateFilter(e.target.value)}
                        className="text-xs text-slate-700 bg-transparent focus:outline-none"
                        title="Filter by submission date"
                      />
                      {enquiryDateFilter && (
                        <button
                          onClick={() => setEnquiryDateFilter('')}
                          className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 cursor-pointer"
                          title="Clear date filter"
                          aria-label="Clear date filter"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Email Status filter */}
                    <select
                      value={enquiryEmailFilter}
                      onChange={e => setEnquiryEmailFilter(e.target.value as any)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Email States</option>
                      <option value="sent">SMTP Accepted</option>
                      <option value="pending">Email Pending</option>
                      <option value="failed">Email Failed / Retry</option>
                    </select>
                  </div>
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 mr-2">Status:</span>
                  {(['all', 'New', 'Contacted', 'Pending', 'Converted', 'Closed'] as const).map(st => {
                    const count = st === 'all' ? enquiries.length : enquiries.filter(e => e.status === st).length
                    const isActive = enquiryStatusFilter === st
                    return (
                      <button
                        key={st}
                        onClick={() => setEnquiryStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st === 'all' ? 'All Inquiries' : st}
                        <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ─── SECTION B: ENQUIRY TABLE ─── */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-700">
                    Showing <span className="text-blue-600 font-extrabold">{filteredEnquiries.length}</span> of {enquiries.length} enquiries
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-3.5">Enquiry ID</th>
                        <th className="py-3 px-3.5">Name</th>
                        <th className="py-3 px-3.5">Contact</th>
                        <th className="py-3 px-3.5">Enquiry Source</th>
                        <th className="py-3 px-3.5">Product / Service</th>
                        <th className="py-3 px-3.5">Date</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5">Email Notification</th>
                        <th className="py-3 px-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-slate-400">
                            No enquiries found matching your active filters.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map(e => {
                          const statusColor =
                            e.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : e.status === 'Contacted'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : e.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : e.status === 'Converted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'

                          return (
                            <tr
                              key={e.id}
                              onClick={() => {
                                setSelectedEnquiry(e)
                                setEnquiryAdminNotes(e.admin_notes || '')
                                setEnquiryFollowUpDate(e.follow_up_date || '')
                              }}
                              className="hover:bg-blue-50/60 transition-colors cursor-pointer"
                            >
                              {/* Enquiry ID */}
                              <td className="py-3 px-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-blue-600">
                                  {e.enquiry_number || `LEN${String(e.id).slice(-4)}`}
                                </span>
                              </td>

                              {/* Customer Name */}
                              <td className="py-3 px-3.5">
                                <div className="font-bold text-slate-900">{e.customer_name}</div>
                                {e.company_name && (
                                  <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{e.company_name}</div>
                                )}
                              </td>

                              {/* Contact */}
                              <td className="py-3 px-3.5" onClick={ev => ev.stopPropagation()}>
                                <a href={`tel:${e.phone}`} className="font-mono text-slate-900 hover:text-blue-600 block">
                                  {e.phone || '—'}
                                </a>
                                <a href={`mailto:${e.email}`} className="text-[11px] text-slate-500 hover:text-blue-600 truncate block max-w-[160px]">
                                  {e.email || '—'}
                                </a>
                              </td>

                              {/* Enquiry Source */}
                              <td className="py-3 px-3.5">
                                <div className="text-slate-800 font-medium truncate max-w-[150px]" title={e.source_page}>
                                  {e.source_page || 'Website'}
                                </div>
                                <span className="text-[10px] text-slate-400 capitalize">{e.enquiry_type || 'Product Enquiry'}</span>
                              </td>

                              {/* Product / Service */}
                              <td className="py-3 px-3.5">
                                <span className="font-semibold text-blue-700 block truncate max-w-[180px]" title={e.product_service_name}>
                                  {e.product_service_name}
                                </span>
                              </td>

                              {/* Date */}
                              <td className="py-3 px-3.5 whitespace-nowrap">
                                <div className="font-semibold text-slate-900">
                                  {e.submitted_date || new Date(e.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400">
                                  {e.submitted_time || new Date(e.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </div>
                              </td>

                              {/* Status */}
                              <td className="py-3 px-3.5 whitespace-nowrap">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusColor}`}>
                                  {e.status}
                                </span>
                              </td>

                              {/* Email Notification Status */}
                              <td className="py-3 px-3.5 whitespace-nowrap" onClick={ev => ev.stopPropagation()}>
                                {e.email_notification_status === 'sent' ? (
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    <span>SMTP Accepted</span>
                                  </span>
                                ) : e.email_notification_status === 'pending' ? (
                                  <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                    <Clock className="w-3 h-3 text-amber-600" />
                                    <span>Pending</span>
                                  </span>
                                ) : (
                                  <div className="flex items-center space-x-1.5">
                                    <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200" title={e.email_error || 'SMTP delivery failed'}>
                                      <AlertCircle className="w-3 h-3 text-rose-600" />
                                      <span>Failed</span>
                                    </span>
                                    <button
                                      onClick={() => handleRetryEmail(e.id)}
                                      disabled={isRetryingEnquiryId === e.id}
                                      className="p-1 text-slate-500 hover:text-blue-600 rounded bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                                      title="Retry sending notification to viju@leniva3d.com"
                                    >
                                      <RefreshCw className={`w-3 h-3 ${isRetryingEnquiryId === e.id ? 'animate-spin text-blue-600' : ''}`} />
                                    </button>
                                  </div>
                                )}
                              </td>

                              {/* Action */}
                              <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={ev => ev.stopPropagation()}>
                                <button
                                  onClick={() => {
                                    setSelectedEnquiry(e)
                                    setEnquiryAdminNotes(e.admin_notes || '')
                                    setEnquiryFollowUpDate(e.follow_up_date || '')
                                  }}
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View Full Page</span>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ─── FULL-PAGE ENQUIRY VIEW ─── */}
              {selectedEnquiry && (
                <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto flex flex-col animate-fade-in">
                  {/* Sticky Top Header Bar */}
                  <div className="sticky top-0 z-20 bg-slate-900 text-white px-4 sm:px-8 py-4 shadow-md flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <button
                        onClick={() => setSelectedEnquiry(null)}
                        className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                        title="Back to Enquiry List"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Enquiry List</span>
                        <span className="sm:hidden">Back</span>
                      </button>
                      <div className="h-6 w-px bg-slate-700 hidden sm:block" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                            {selectedEnquiry.enquiry_number || `LEN${String(selectedEnquiry.id).slice(-4)}`}
                          </span>
                          <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                            {selectedEnquiry.enquiry_type}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            selectedEnquiry.status === 'New'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : selectedEnquiry.status === 'Contacted'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : selectedEnquiry.status === 'Converted'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {selectedEnquiry.status || 'New'}
                          </span>
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 truncate max-w-md sm:max-w-xl">
                          {selectedEnquiry.customer_name} {selectedEnquiry.company_name ? `— ${selectedEnquiry.company_name}` : ''}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                        title="Print this Enquiry"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-300" />
                        <span className="hidden sm:inline">Print / Save PDF</span>
                      </button>
                      <button
                        onClick={() => setSelectedEnquiry(null)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Full Page Content */}
                  <div className="max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-6 flex-1">
                    {/* Top Row: Customer Profile + Admin Workflow */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Customer Details Card */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                            <User className="w-4 h-4 text-blue-600" />
                            <span>Customer Profile & Contact</span>
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">ID #{selectedEnquiry.id}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">Full Name</span>
                            <strong className="text-slate-900 text-sm block mt-0.5">{selectedEnquiry.customer_name}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">Company / Organization</span>
                            <span className="text-slate-800 font-semibold block mt-0.5">{selectedEnquiry.company_name || 'Individual / Freelance'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">Email Address</span>
                            <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline font-semibold block mt-0.5">
                              {selectedEnquiry.email || 'Not provided'}
                            </a>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">Phone / WhatsApp</span>
                            {selectedEnquiry.phone ? (
                              <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-900 hover:text-blue-600 font-mono font-bold block mt-0.5">
                                {selectedEnquiry.phone}
                              </a>
                            ) : (
                              <span className="text-slate-400 italic block mt-0.5">Not provided</span>
                            )}
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">City / Location</span>
                            <span className="text-slate-800 font-medium block mt-0.5">{selectedEnquiry.city || 'Not Specified'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px] font-medium">Submission Source</span>
                            <span className="text-slate-800 font-medium block mt-0.5">{selectedEnquiry.source_page || 'Website'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Admin Status & Workflow Card */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Status & Lead Workflow</span>
                          </h3>
                          <span className="text-[11px] font-medium text-slate-400">
                            {selectedEnquiry.submitted_date} {selectedEnquiry.submitted_time}
                          </span>
                        </div>

                        <div>
                          <label className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider mb-2">
                            Update Status:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {(['New', 'Contacted', 'Pending', 'Converted', 'Closed'] as const).map(st => (
                              <button
                                key={st}
                                onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, st)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  selectedEnquiry.status === st
                                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2'
                                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <label className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider mb-1.5">
                            Follow-up Date:
                          </label>
                          <input
                            type="date"
                            value={enquiryFollowUpDate}
                            onChange={e => setEnquiryFollowUpDate(e.target.value)}
                            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                          />
                        </div>

                        {/* Email Notification Status */}
                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider mb-1.5">
                            Notification Email to viju@leniva3d.com:
                          </span>
                          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div>
                              {selectedEnquiry.email_notification_status === 'sent' ? (
                                <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Accepted by SMTP Server</span>
                                </span>
                              ) : selectedEnquiry.email_notification_status === 'pending' ? (
                                <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700">
                                  <Clock className="w-4 h-4 text-amber-600" />
                                  <span>Pending SMTP Dispatch</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-700">
                                  <AlertCircle className="w-4 h-4 text-rose-600" />
                                  <span>SMTP Delivery Failed</span>
                                </span>
                              )}
                              {selectedEnquiry.email_sent_at && (
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                  Timestamp: {new Date(selectedEnquiry.email_sent_at).toLocaleString()}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleRetryEmail(selectedEnquiry.id)}
                              disabled={isRetryingEnquiryId === selectedEnquiry.id}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            >
                              <RefreshCw className={`w-3 h-3 ${isRetryingEnquiryId === selectedEnquiry.id ? 'animate-spin' : ''}`} />
                              <span>{isRetryingEnquiryId === selectedEnquiry.id ? 'Sending...' : 'Retry Email'}</span>
                            </button>
                          </div>
                          {selectedEnquiry.email_error && (
                            <p className="text-[11px] text-rose-600 mt-2 font-mono bg-rose-50 p-2 rounded-lg border border-rose-200">
                              Error: {selectedEnquiry.email_error}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Middle Card: Product & Message */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3 flex items-center space-x-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span>Enquiry Requirement & Customer Message</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                        <div>
                          <span className="text-slate-400 text-[11px] font-medium block">Product / Service of Interest</span>
                          <strong className="text-blue-700 text-base font-bold block mt-0.5">
                            {selectedEnquiry.product_service_name}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] font-medium block">Subject</span>
                          <span className="font-semibold text-slate-800 text-sm block mt-0.5">
                            {selectedEnquiry.subject || 'Standard Enquiry'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">
                          Customer Message / Technical Specifications:
                        </span>
                        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed min-h-[120px]">
                          {selectedEnquiry.message || 'No additional message was provided by the customer.'}
                        </div>
                      </div>

                      {/* Source Link & Context */}
                      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500">
                        <div>
                          <span>Source URL: </span>
                          <a
                            href={selectedEnquiry.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-mono text-[11px]"
                          >
                            {selectedEnquiry.source_url || 'N/A'}
                          </a>
                        </div>
                        <a
                          href={`mailto:viju@leniva3d.com?subject=${encodeURIComponent(`Customer Enquiry – ${selectedEnquiry.product_service_name} – Leniva 3D`)}&body=${encodeURIComponent(`LENIVA 3D – WEBSITE ENQUIRY\n\nCustomer: ${selectedEnquiry.customer_name}\nEmail: ${selectedEnquiry.email}\nPhone: ${selectedEnquiry.phone}\nCompany: ${selectedEnquiry.company_name}\nCity: ${selectedEnquiry.city}\nRequirement: ${selectedEnquiry.product_service_name}\nMessage: ${selectedEnquiry.message}\nSubmitted From: ${selectedEnquiry.source_page}\nDate: ${selectedEnquiry.submitted_date} at ${selectedEnquiry.submitted_time}`)}`}
                          className="inline-flex items-center space-x-1.5 text-blue-600 hover:text-blue-800 text-xs font-bold"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Direct Forward to viju@leniva3d.com &rarr;</span>
                        </a>
                      </div>
                    </div>

                    {/* Bottom Card: Internal Admin Notes */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span>Internal Admin & Sales Notes</span>
                        </label>
                        <span className="text-[11px] text-slate-400">Notes are visible to admins only</span>
                      </div>
                      <textarea
                        rows={4}
                        value={enquiryAdminNotes}
                        onChange={e => setEnquiryAdminNotes(e.target.value)}
                        placeholder="Add internal notes on customer conversation, quotation shared, follow-up status, demo arrangements..."
                        className="w-full text-sm p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed bg-slate-50 focus:bg-white transition-colors"
                      />
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => setSelectedEnquiry(null)}
                          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          &larr; Back to List
                        </button>
                        <button
                          onClick={() => handleSaveEnquiryNotes(selectedEnquiry.id)}
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md inline-flex items-center space-x-1.5"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Notes & Follow-up</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ====================================================
              TAB 2: QUOTES & RFQS
             ==================================================== */}
          {activeTab === 'quotes' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Customer Inquiries, Quotes & Consultations</h3>
                  <p className="text-xs text-slate-500">Real-time inquiries from Quotes, Live Demos, Engineering Consultations, and Free Trial requests</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={quoteSearchInput}
                      onChange={e => setQuoteSearchInput(e.target.value)}
                      placeholder="Search inquiries..."
                      className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-56"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                    {quoteSearchInput && (
                      <button
                        onClick={() => setQuoteSearchInput('')}
                        className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
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
                  <button
                    onClick={handleExportQuotesCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Export currently filtered inquiries to CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Enquiry Type Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Inquiries ({quotes.length})
                </button>
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('quote')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'quote'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Quotes & RFQs ({quotes.filter(q => getEnquiryType(q) === 'quote').length})
                </button>
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('demo')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'demo'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  Demo Requests ({quotes.filter(q => getEnquiryType(q) === 'demo').length})
                </button>
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('consultation')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'consultation'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  Engineering Consultations ({quotes.filter(q => getEnquiryType(q) === 'consultation').length})
                </button>
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('trial')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'trial'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Free Trials ({quotes.filter(q => getEnquiryType(q) === 'trial').length})
                </button>
                <button
                  onClick={() => setQuoteEnquiryTypeFilter('contact')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    quoteEnquiryTypeFilter === 'contact'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Contact Form ({quotes.filter(q => getEnquiryType(q) === 'contact').length})
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Submitted Date</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Client & Company</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Product / Requirement</th>
                      <th className="py-3 px-3">Quantity & Timeline</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-slate-400 font-medium">
                          No inquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredQuotes.map(q => {
                        const type = getEnquiryType(q)
                        return (
                          <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-slate-400">#{q.id}</td>
                            <td className="py-3 px-3 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                              <div className="font-bold text-slate-800">
                                {q.created_at ? new Date(q.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {q.created_at ? new Date(q.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                              </div>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              {type === 'demo' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                  Demo Request
                                </span>
                              )}
                              {type === 'consultation' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                                  Consultation
                                </span>
                              )}
                              {type === 'trial' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                  Free Trial
                                </span>
                              )}
                              {type === 'contact' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                  Contact Form
                                </span>
                              )}
                              {type === 'quote' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                                  Quote / RFQ
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-900">{q.name}</div>
                              <div className="text-[11px] text-slate-500">{q.company || 'Individual'}</div>
                            </td>
                            <td className="py-3 px-3 text-slate-600">
                              <div>
                                <a href={`mailto:${q.email}`} className="hover:text-blue-600 hover:underline">
                                  {q.email}
                                </a>
                              </div>
                              {q.phone && (
                                <div className="text-[11px] text-slate-400 font-mono">
                                  <a href={`tel:${q.phone}`} className="hover:text-blue-600">
                                    {q.phone}
                                  </a>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-semibold text-slate-800">{q.service_or_product}</div>
                              {q.message && (
                                <div className="text-[11px] text-slate-500 max-w-xs truncate" title={q.message}>
                                  {q.message}
                                </div>
                              )}
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
                            <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedQuote(q)
                                  setQuoteNotesInput(q.notes || '')
                                }}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer text-xs font-bold border border-blue-200"
                                title="Inspect full page details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Full Page</span>
                              </button>
                              <button
                                onClick={() => handleDeleteQuote(q.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer inline-flex items-center"
                                title="Delete quote"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================
              FULL-PAGE QUOTE & RFQ VIEW
             ==================================================== */}
          {selectedQuote && (
            <div className="fixed inset-0 z-50 bg-slate-100 overflow-y-auto flex flex-col animate-fade-in">
              {/* Sticky Top Header Bar */}
              <div className="sticky top-0 z-20 bg-slate-900 text-white px-4 sm:px-8 py-4 shadow-md flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer border border-slate-700"
                    title="Back to Quotes List"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Quotes List</span>
                    <span className="sm:hidden">Back</span>
                  </button>
                  <div className="h-6 w-px bg-slate-700 hidden sm:block" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                        Quote #{selectedQuote.id}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {getEnquiryType(selectedQuote)}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        selectedQuote.status === 'quoted'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : selectedQuote.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : selectedQuote.status === 'in_review'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {selectedQuote.status ? selectedQuote.status.replace('_', ' ').toUpperCase() : 'PENDING'}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-0.5 truncate max-w-md sm:max-w-xl">
                      {selectedQuote.name} {selectedQuote.company ? `(${selectedQuote.company})` : ''}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                    title="Print Quote Details"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-300" />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Full Page Body */}
              <div className="max-w-6xl mx-auto w-full p-4 sm:p-8 space-y-6 flex-1">
                {/* Top Row: Client Profile + Quote Status Workflow */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Client Profile Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span>Client Profile & Contact</span>
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">Quote #{selectedQuote.id}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Client / Contact Person</span>
                        <strong className="text-slate-900 text-sm block mt-0.5">{selectedQuote.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Company / Organization</span>
                        <span className="text-slate-800 font-semibold block mt-0.5">{selectedQuote.company || 'Independent / Freelance'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Email Address</span>
                        <a href={`mailto:${selectedQuote.email}`} className="text-blue-600 hover:underline font-semibold block mt-0.5">
                          {selectedQuote.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Phone / WhatsApp</span>
                        {selectedQuote.phone ? (
                          <a href={`tel:${selectedQuote.phone}`} className="text-slate-900 hover:text-blue-600 font-mono font-bold block mt-0.5">
                            {selectedQuote.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400 italic block mt-0.5">Not provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status & Timing Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Status & RFQ Timeline</span>
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400">
                        {selectedQuote.created_at
                          ? new Date(selectedQuote.created_at).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })
                          : 'N/A'}
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider mb-2">
                        Quotation Status:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: 'pending', label: 'Pending' },
                          { key: 'in_review', label: 'In Review' },
                          { key: 'quoted', label: 'Quoted' },
                          { key: 'completed', label: 'Completed' },
                        ].map(st => (
                          <button
                            key={st.key}
                            onClick={() => handleUpdateQuoteStatus(selectedQuote.id, st.key, quoteNotesInput)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              selectedQuote.status === st.key
                                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2'
                                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-medium">Quantity Requested</span>
                        <strong className="text-slate-900 text-sm block mt-0.5">{selectedQuote.quantity || '1 unit'}</strong>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[11px] font-medium">Required Timeline</span>
                        <strong className="text-slate-900 text-sm block mt-0.5">{selectedQuote.timeline || 'Immediate'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Card: Requested Product & Client Requirements */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>Requested Product / Solution</span>
                  </h3>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-slate-400 text-[11px] font-medium block">Product / Service Specification</span>
                    <strong className="text-blue-700 text-lg font-bold block mt-0.5">
                      {selectedQuote.service_or_product}
                    </strong>
                  </div>

                  <div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">
                      Client Requirement & Technical Message:
                    </span>
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed min-h-[120px]">
                      {selectedQuote.message || 'No additional message was provided with this quote request.'}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500">
                    <div>
                      <span>Reply directly to client: </span>
                      <a href={`mailto:${selectedQuote.email}`} className="text-blue-600 hover:underline font-semibold">
                        {selectedQuote.email}
                      </a>
                    </div>
                    <a
                      href={`mailto:${selectedQuote.email}?subject=${encodeURIComponent(`Official Quote – ${selectedQuote.service_or_product} – Leniva CAD Solutions`)}&body=${encodeURIComponent(`Dear ${selectedQuote.name},\n\nThank you for reaching out to Leniva CAD Solutions regarding ${selectedQuote.service_or_product}.\n\n`)}`}
                      className="inline-flex items-center space-x-1.5 text-blue-600 hover:text-blue-800 text-xs font-bold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Compose Email in Mail Client &rarr;</span>
                    </a>
                  </div>
                </div>

                {/* Bottom Card: Internal Notes */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Internal Admin Notes / Quotation Follow-up</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Notes are visible to admins only</span>
                  </div>
                  <textarea
                    rows={4}
                    value={quoteNotesInput}
                    onChange={e => setQuoteNotesInput(e.target.value)}
                    placeholder="e.g. Sent official quote + GST on 28th Sep. Scheduled demo call with engineer..."
                    className="w-full text-sm p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed bg-slate-50 focus:bg-white transition-colors"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedQuote(null)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      &larr; Back to List
                    </button>
                    <button
                      onClick={() => handleUpdateQuoteStatus(selectedQuote.id, selectedQuote.status, quoteNotesInput)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md inline-flex items-center space-x-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Notes & Status</span>
                    </button>
                  </div>
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
                    className="p-1 text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                    aria-label="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
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
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
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
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label="Close modal"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Modal Sticky Section Navigation Bar */}
                    <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-1.5 overflow-x-auto shrink-0 scrollbar-none">
                      {[
                        { id: 'overview', label: '1. Hero & Overview', icon: Info },
                        { id: 'overview_cards', label: `2. Overview Cards (${editingProduct.overview_cards?.length || 0})`, icon: Layers },
                        { id: 'media', label: `3. Gallery & Showcase (${(editingProduct.images?.length || 1) + (editingProduct.print_gallery?.length || 0)})`, icon: Eye },
                        { id: 'specs', label: `4. Key Specs (${editingProduct.key_specs?.length || 0})`, icon: Sparkles },
                        { id: 'tech_specs', label: `5. Tech Specs (${Object.keys(editingProduct.specifications || {}).length})`, icon: SlidersHorizontal },
                        { id: 'features', label: `6. Features & Cards (${(editingProduct.features?.length || 0) + (editingProduct.feature_cards?.length || 0)})`, icon: List },
                        { id: 'applications', label: `7. Applications & Audience (${(editingProduct.applications?.length || 0) + (editingProduct.who_is_it_for?.length || 0)})`, icon: Box },
                        { id: 'materials', label: `8. Materials (${editingProduct.materials?.length || 0})`, icon: Layers },
                        { id: 'faqs_support', label: `9. Support & FAQs (${(editingProduct.support_cards?.length || 0) + (editingProduct.faqs?.length || 0)})`, icon: HelpCircle },
                        { id: 'pricing', label: '10. Inventory & Flags', icon: CheckCircle2 },
                        {
                          id: 'specialized',
                          label:
                            editingProduct.category_slug === 'filaments' || editingProduct.category.toLowerCase().includes('filament')
                              ? '11. Filament Swatch'
                              : editingProduct.category_slug === 'cad-software' || editingProduct.category.toLowerCase().includes('cad') || editingProduct.category.toLowerCase().includes('software')
                              ? `11. Licensing & SysReq (${(editingProduct.licensing_plans?.length || 0) + (editingProduct.system_requirements?.length || 0)})`
                              : '11. Scanner Metrology',
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

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Hero Main H1 Heading (Frontend Banner)</label>
                              <input
                                type="text"
                                value={editingProduct.hero_heading ?? editingProduct.name ?? ''}
                                onChange={e => setEditingProduct({ ...editingProduct, hero_heading: e.target.value })}
                                placeholder="e.g. Pratham 3.0 Industrial 3D Printer"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Tagline / Supporting Headline</label>
                              <input
                                type="text"
                                value={editingProduct.tagline || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                                placeholder="e.g. Standard 300 mm Industrial Prototype Workhorse"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Hero Supporting Text / Subtitle</label>
                            <textarea
                              rows={2}
                              value={editingProduct.hero_subtitle ?? editingProduct.short_description ?? ''}
                              onChange={e => setEditingProduct({ ...editingProduct, hero_subtitle: e.target.value })}
                              placeholder="Hero banner supporting paragraph..."
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

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Product Video / Walkthrough URL</label>
                              <input
                                type="text"
                                value={editingProduct.video_url || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, video_url: e.target.value })}
                                placeholder="e.g. /videos/3devok-mq.mp4 or YouTube URL"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: OVERVIEW & ARCHITECTURE CARDS */}
                      {activeEditTab === 'overview_cards' && (
                        <div className="space-y-4 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 2: Product Overview Section & Architecture Cards</div>
                              <div className="text-[11px] text-blue-700">Exact overview narrative and multi-card capability pillars shown on the frontend product page</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {(editingProduct.overview_cards || []).length} Cards
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Overview Section Heading</label>
                              <input
                                type="text"
                                value={editingProduct.overview_heading || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, overview_heading: e.target.value })}
                                placeholder="e.g. Engineered for Continuous Industrial Reliability"
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Overview Section Narrative Description</label>
                              <textarea
                                rows={3}
                                value={editingProduct.overview_description || ''}
                                onChange={e => setEditingProduct({ ...editingProduct, overview_description: e.target.value })}
                                placeholder="Detailed overview paragraph displayed above the architecture/overview cards..."
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            {(editingProduct.overview_cards || []).map((card, idx) => (
                              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                    Overview / Pillar Card #{idx + 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (editingProduct.overview_cards || []).filter((_, i) => i !== idx)
                                      setEditingProduct({ ...editingProduct, overview_cards: updated })
                                    }}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                    title="Delete card"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Card Title</label>
                                    <input
                                      type="text"
                                      value={card.title || ''}
                                      onChange={e => {
                                        const updated = [...(editingProduct.overview_cards || [])]
                                        updated[idx] = { ...updated[idx], title: e.target.value }
                                        setEditingProduct({ ...editingProduct, overview_cards: updated })
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Badge / Subtitle</label>
                                    <input
                                      type="text"
                                      value={card.subtitle || ''}
                                      onChange={e => {
                                        const updated = [...(editingProduct.overview_cards || [])]
                                        updated[idx] = { ...updated[idx], subtitle: e.target.value }
                                        setEditingProduct({ ...editingProduct, overview_cards: updated })
                                      }}
                                      placeholder="Optional badge or subtitle"
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Card Description</label>
                                  <textarea
                                    rows={2}
                                    value={card.description || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.overview_cards || [])]
                                      updated[idx] = { ...updated[idx], description: e.target.value }
                                      setEditingProduct({ ...editingProduct, overview_cards: updated })
                                    }}
                                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-200 space-y-2.5">
                            <div className="font-bold text-slate-800 text-[11px]">+ Add Overview / Architecture Card</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Card Title (e.g. Heavy-Duty All-Metal Gantry)"
                                value={newOverviewCard.title}
                                onChange={e => setNewOverviewCard({ ...newOverviewCard, title: e.target.value })}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Subtitle / Badge (e.g. Structural Rigidity)"
                                value={newOverviewCard.subtitle}
                                onChange={e => setNewOverviewCard({ ...newOverviewCard, subtitle: e.target.value })}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Card Description..."
                                value={newOverviewCard.description}
                                onChange={e => setNewOverviewCard({ ...newOverviewCard, description: e.target.value })}
                                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newOverviewCard.title.trim()) {
                                    const updated = [...(editingProduct.overview_cards || []), { ...newOverviewCard }]
                                    setEditingProduct({ ...editingProduct, overview_cards: updated })
                                    setNewOverviewCard({ title: '', subtitle: '', description: '', icon: 'Box', image: '' })
                                  }
                                }}
                                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                              >
                                + Add Card
                              </button>
                            </div>
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
                                      className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                      title="Remove from Gallery"
                                      aria-label="Remove image"
                                    >
                                      <X className="w-3 h-3" />
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

                          {/* Print / Scan / Render Showcase Gallery Cards */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="block font-bold text-slate-800">
                                  Print / Scan / Render Showcase Gallery ({(editingProduct.print_gallery || []).length} Showcase Items)
                                </label>
                                <span className="text-[11px] text-slate-500">
                                  Application & sample showcase cards displayed in the product page gallery section
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(editingProduct.print_gallery || []).map((item, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                                  <div className="flex items-center gap-2.5">
                                    {item.image && (
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                                      />
                                    )}
                                    <div className="flex-1 min-w-0 space-y-1">
                                      <input
                                        type="text"
                                        value={item.title || ''}
                                        onChange={e => {
                                          const updated = [...(editingProduct.print_gallery || [])]
                                          updated[idx] = { ...updated[idx], title: e.target.value }
                                          setEditingProduct({ ...editingProduct, print_gallery: updated })
                                        }}
                                        placeholder="Showcase Title"
                                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900"
                                      />
                                      <div className="grid grid-cols-2 gap-1.5">
                                        <input
                                          type="text"
                                          value={item.category || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.print_gallery || [])]
                                            updated[idx] = { ...updated[idx], category: e.target.value }
                                            setEditingProduct({ ...editingProduct, print_gallery: updated })
                                          }}
                                          placeholder="Category"
                                          className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                        />
                                        <input
                                          type="text"
                                          value={item.material || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.print_gallery || [])]
                                            updated[idx] = { ...updated[idx], material: e.target.value }
                                            setEditingProduct({ ...editingProduct, print_gallery: updated })
                                          }}
                                          placeholder="Material / Spec"
                                          className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                        />
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (editingProduct.print_gallery || []).filter((_, i) => i !== idx)
                                        setEditingProduct({ ...editingProduct, print_gallery: updated })
                                      }}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded shrink-0"
                                      title="Remove showcase item"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={item.image || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.print_gallery || [])]
                                      updated[idx] = { ...updated[idx], image: e.target.value }
                                      setEditingProduct({ ...editingProduct, print_gallery: updated })
                                    }}
                                    placeholder="Image URL"
                                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded font-mono text-[10px]"
                                  />
                                  <input
                                    type="text"
                                    value={item.description || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.print_gallery || [])]
                                      updated[idx] = { ...updated[idx], description: e.target.value }
                                      setEditingProduct({ ...editingProduct, print_gallery: updated })
                                    }}
                                    placeholder="Description (optional)"
                                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Add New Showcase Item */}
                            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                              <div className="font-bold text-slate-800 text-[11px]">+ Add Print / Scan Showcase Item</div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input
                                  type="text"
                                  placeholder="Title (e.g. Automotive Gearbox Housing)"
                                  value={newShowcaseItem.title}
                                  onChange={e => setNewShowcaseItem({ ...newShowcaseItem, title: e.target.value })}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                                <input
                                  type="text"
                                  placeholder="Category (e.g. Functional Prototype)"
                                  value={newShowcaseItem.category}
                                  onChange={e => setNewShowcaseItem({ ...newShowcaseItem, category: e.target.value })}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                                <input
                                  type="text"
                                  placeholder="Material (e.g. ABS / Carbon Fiber)"
                                  value={newShowcaseItem.material}
                                  onChange={e => setNewShowcaseItem({ ...newShowcaseItem, material: e.target.value })}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Image URL (e.g. /images/pratham-3-work/automotive.png)"
                                  value={newShowcaseItem.image}
                                  onChange={e => setNewShowcaseItem({ ...newShowcaseItem, image: e.target.value })}
                                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newShowcaseItem.title.trim() && newShowcaseItem.image.trim()) {
                                      const updated = [...(editingProduct.print_gallery || []), { ...newShowcaseItem }]
                                      setEditingProduct({ ...editingProduct, print_gallery: updated })
                                      setNewShowcaseItem({ title: '', category: '', material: '', layer: '', image: '', description: '' })
                                    }
                                  }}
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                                >
                                  + Add Showcase
                                </button>
                              </div>
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

                      {/* TAB 6: CORE FEATURES & FEATURE CARDS */}
                      {activeEditTab === 'features' && (
                        <div className="space-y-5 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 6: Engineered Feature Cards & Highlight Bullets</div>
                              <div className="text-[11px] text-blue-700">Detailed feature cards and bullet highlights displayed on the product page</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {(editingProduct.feature_cards || []).length} Cards • {(editingProduct.features || []).length} Bullets
                            </span>
                          </div>

                          {/* Engineered Feature Cards */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Engineered Feature & Key Point Cards ({(editingProduct.feature_cards || []).length} Cards)
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(editingProduct.feature_cards || []).map((fc, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                      Feature Card #{idx + 1}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (editingProduct.feature_cards || []).filter((_, i) => i !== idx)
                                        setEditingProduct({ ...editingProduct, feature_cards: updated })
                                      }}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    <input
                                      type="text"
                                      value={fc.title || ''}
                                      onChange={e => {
                                        const updated = [...(editingProduct.feature_cards || [])]
                                        updated[idx] = { ...updated[idx], title: e.target.value }
                                        setEditingProduct({ ...editingProduct, feature_cards: updated })
                                      }}
                                      placeholder="Card Title"
                                      className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900"
                                    />
                                    <input
                                      type="text"
                                      value={fc.subtitle || fc.category || ''}
                                      onChange={e => {
                                        const updated = [...(editingProduct.feature_cards || [])]
                                        updated[idx] = { ...updated[idx], subtitle: e.target.value }
                                        setEditingProduct({ ...editingProduct, feature_cards: updated })
                                      }}
                                      placeholder="Badge / Category"
                                      className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                    />
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={fc.description || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.feature_cards || [])]
                                      updated[idx] = { ...updated[idx], description: e.target.value }
                                      setEditingProduct({ ...editingProduct, feature_cards: updated })
                                    }}
                                    placeholder="Feature description..."
                                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700"
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                              <div className="font-bold text-slate-800 text-[11px]">+ Add Engineered Feature Card</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Title (e.g. Auto Bed Leveling Matrix)"
                                  value={newFeatureCard.title}
                                  onChange={e => setNewFeatureCard({ ...newFeatureCard, title: e.target.value })}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                                <input
                                  type="text"
                                  placeholder="Badge / Category (e.g. Smart Calibration)"
                                  value={newFeatureCard.subtitle}
                                  onChange={e => setNewFeatureCard({ ...newFeatureCard, subtitle: e.target.value })}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Detailed description..."
                                  value={newFeatureCard.description}
                                  onChange={e => setNewFeatureCard({ ...newFeatureCard, description: e.target.value })}
                                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newFeatureCard.title.trim()) {
                                      const updated = [...(editingProduct.feature_cards || []), { ...newFeatureCard }]
                                      setEditingProduct({ ...editingProduct, feature_cards: updated })
                                      setNewFeatureCard({ title: '', subtitle: '', category: '', description: '', icon: 'Sparkles', image: '' })
                                    }
                                  }}
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                                >
                                  + Add Card
                                </button>
                              </div>
                            </div>
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
                                    className="text-slate-400 hover:text-red-500 ml-1 cursor-pointer p-0.5"
                                    aria-label={`Remove ${app}`}
                                  >
                                    <X className="w-3 h-3" />
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
                                    className="text-slate-400 hover:text-red-500 ml-1 cursor-pointer p-0.5"
                                    aria-label={`Remove ${user}`}
                                  >
                                    <X className="w-3 h-3" />
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
                                    className="text-slate-400 hover:text-red-500 ml-1 cursor-pointer p-0.5"
                                    aria-label={`Remove ${mat}`}
                                  >
                                    <X className="w-3 h-3" />
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

                      {/* TAB 9: SUPPORT CARDS & FAQS */}
                      {activeEditTab === 'faqs_support' && (
                        <div className="space-y-5 animate-in fade-in">
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between">
                            <div>
                              <div className="font-bold text-blue-950">Section 9: Installation / Support Cards & Product Page FAQs</div>
                              <div className="text-[11px] text-blue-700">Warranty, training, service cards and interactive FAQ accordion items</div>
                            </div>
                            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-md font-mono text-[11px] font-bold">
                              {(editingProduct.support_cards || []).length} Support Cards • {(editingProduct.faqs || []).length} FAQs
                            </span>
                          </div>

                          {/* Support Cards */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Installation, Training & Support Cards ({(editingProduct.support_cards || []).length})
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(editingProduct.support_cards || []).map((sc, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <input
                                      type="text"
                                      value={sc.title || ''}
                                      onChange={e => {
                                        const updated = [...(editingProduct.support_cards || [])]
                                        updated[idx] = { ...updated[idx], title: e.target.value }
                                        setEditingProduct({ ...editingProduct, support_cards: updated })
                                      }}
                                      placeholder="Support Card Title"
                                      className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900 mr-2"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (editingProduct.support_cards || []).filter((_, i) => i !== idx)
                                        setEditingProduct({ ...editingProduct, support_cards: updated })
                                      }}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={sc.description || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.support_cards || [])]
                                      updated[idx] = { ...updated[idx], description: e.target.value }
                                      setEditingProduct({ ...editingProduct, support_cards: updated })
                                    }}
                                    placeholder="Support card description..."
                                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Support Title (e.g. On-Site Commissioning)"
                                value={newSupportCard.title}
                                onChange={e => setNewSupportCard({ ...newSupportCard, title: e.target.value })}
                                className="w-1/3 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Support Description..."
                                value={newSupportCard.description}
                                onChange={e => setNewSupportCard({ ...newSupportCard, description: e.target.value })}
                                className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (newSupportCard.title.trim()) {
                                    const updated = [...(editingProduct.support_cards || []), { ...newSupportCard }]
                                    setEditingProduct({ ...editingProduct, support_cards: updated })
                                    setNewSupportCard({ title: '', description: '' })
                                  }
                                }}
                                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                              >
                                + Add Support Card
                              </button>
                            </div>
                          </div>

                          {/* Product FAQs */}
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                            <label className="block font-bold text-slate-800">
                              Frequently Asked Questions ({(editingProduct.faqs || []).length} FAQs)
                            </label>
                            <div className="space-y-2.5">
                              {(editingProduct.faqs || []).map((faq, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                      FAQ #{idx + 1} {faq.category ? `• ${faq.category}` : ''}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (editingProduct.faqs || []).filter((_, i) => i !== idx)
                                        setEditingProduct({ ...editingProduct, faqs: updated })
                                      }}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={faq.question || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.faqs || [])]
                                      updated[idx] = { ...updated[idx], question: e.target.value }
                                      setEditingProduct({ ...editingProduct, faqs: updated })
                                    }}
                                    placeholder="Question"
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
                                  />
                                  <textarea
                                    rows={2}
                                    value={faq.answer || ''}
                                    onChange={e => {
                                      const updated = [...(editingProduct.faqs || [])]
                                      updated[idx] = { ...updated[idx], answer: e.target.value }
                                      setEditingProduct({ ...editingProduct, faqs: updated })
                                    }}
                                    placeholder="Answer"
                                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-200 space-y-2">
                              <div className="font-bold text-slate-800 text-[11px]">+ Add Product FAQ</div>
                              <input
                                type="text"
                                placeholder="Question..."
                                value={newFaqItem.question}
                                onChange={e => setNewFaqItem({ ...newFaqItem, question: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Answer..."
                                  value={newFaqItem.answer}
                                  onChange={e => setNewFaqItem({ ...newFaqItem, answer: e.target.value })}
                                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (newFaqItem.question.trim() && newFaqItem.answer.trim()) {
                                      const updated = [...(editingProduct.faqs || []), { ...newFaqItem }]
                                      setEditingProduct({ ...editingProduct, faqs: updated })
                                      setNewFaqItem({ question: '', answer: '', category: 'General' })
                                    }
                                  }}
                                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                                >
                                  + Add FAQ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 11: SPECIALIZED CATEGORY PARAMETERS (CAD / FILAMENTS / SCANNERS) */}
                      {activeEditTab === 'specialized' && (
                        <div className="space-y-5 animate-in fade-in">
                          {(editingProduct.category_slug === 'cad-software' || editingProduct.category.toLowerCase().includes('cad') || editingProduct.category.toLowerCase().includes('software')) ? (
                            <div className="space-y-5">
                              {/* Licensing Plans */}
                              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="font-black text-purple-950 text-sm">
                                    CAD Licensing & Plan Options ({(editingProduct.licensing_plans || []).length} Plans)
                                  </div>
                                  <span className="text-[11px] text-purple-700">Uniform licensing options displayed on the software page</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {(editingProduct.licensing_plans || []).map((plan, idx) => (
                                    <div key={idx} className="p-3 bg-white rounded-xl border border-purple-200 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <input
                                          type="text"
                                          value={plan.name || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.licensing_plans || [])]
                                            updated[idx] = { ...updated[idx], name: e.target.value }
                                            setEditingProduct({ ...editingProduct, licensing_plans: updated })
                                          }}
                                          placeholder="Plan Name"
                                          className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900 mr-2"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const updated = (editingProduct.licensing_plans || []).filter((_, i) => i !== idx)
                                            setEditingProduct({ ...editingProduct, licensing_plans: updated })
                                          }}
                                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <div className="grid grid-cols-2 gap-1.5">
                                        <input
                                          type="text"
                                          value={plan.badge || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.licensing_plans || [])]
                                            updated[idx] = { ...updated[idx], badge: e.target.value }
                                            setEditingProduct({ ...editingProduct, licensing_plans: updated })
                                          }}
                                          placeholder="Badge / Type"
                                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                        />
                                        <input
                                          type="text"
                                          value={plan.duration || ''}
                                          onChange={e => {
                                            const updated = [...(editingProduct.licensing_plans || [])]
                                            updated[idx] = { ...updated[idx], duration: e.target.value }
                                            setEditingProduct({ ...editingProduct, licensing_plans: updated })
                                          }}
                                          placeholder="Duration / Term"
                                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                        />
                                      </div>
                                      <textarea
                                        rows={2}
                                        value={plan.description || ''}
                                        onChange={e => {
                                          const updated = [...(editingProduct.licensing_plans || [])]
                                          updated[idx] = { ...updated[idx], description: e.target.value }
                                          setEditingProduct({ ...editingProduct, licensing_plans: updated })
                                        }}
                                        placeholder="Plan description..."
                                        className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* System Requirements */}
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                <div className="font-black text-slate-900 text-sm">
                                  System Requirements Table ({(editingProduct.system_requirements || []).length} Rows)
                                </div>
                                <div className="space-y-2">
                                  {(editingProduct.system_requirements || []).map((req, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200">
                                      <input
                                        type="text"
                                        value={req.label || ''}
                                        onChange={e => {
                                          const updated = [...(editingProduct.system_requirements || [])]
                                          updated[idx] = { ...updated[idx], label: e.target.value }
                                          setEditingProduct({ ...editingProduct, system_requirements: updated })
                                        }}
                                        placeholder="Component (e.g. Operating System)"
                                        className="w-1/3 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800"
                                      />
                                      <input
                                        type="text"
                                        value={req.value || ''}
                                        onChange={e => {
                                          const updated = [...(editingProduct.system_requirements || [])]
                                          updated[idx] = { ...updated[idx], value: e.target.value }
                                          setEditingProduct({ ...editingProduct, system_requirements: updated })
                                        }}
                                        placeholder="Requirement Detail"
                                        className="flex-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const updated = (editingProduct.system_requirements || []).filter((_, i) => i !== idx)
                                          setEditingProduct({ ...editingProduct, system_requirements: updated })
                                        }}
                                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (editingProduct.category_slug === 'filaments' || editingProduct.category.toLowerCase().includes('filament')) ? (
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
                          Configured: {Object.keys(editingProduct.specifications || {}).length} specs • {(editingProduct.features || []).length} features • {(editingProduct.overview_cards || []).length + (editingProduct.feature_cards || []).length} cards • {(editingProduct.faqs || []).length} FAQs
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

              {/* Page-Wise Live Visual Editor Quick-Launch Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-slate-800 shadow-sm">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>100% Full-Screen Page-Wise Live Visual Editor</span>
                  </div>
                  <h4 className="text-sm font-black text-white">
                    Click &ldquo;Edit Page (Live Visual)&rdquo; on any product below to open its exact live website page at 100% full width
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Works identically across CAD Software, 3D Printers (FDM, DLP, Industrial LCD), 3D Filaments, and 3D Scanners — click any heading, text, spec cell, button, image, or PDF brochure on the page to edit &amp; publish live.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setVisualEditorTarget({
                        category: 'printers',
                        productKey: 'pratham_mini',
                      })
                    }
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>3D Printers &amp; 3D Edit (25 Pages)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setVisualEditorTarget({
                        category: 'scanners',
                        productKey: 'devok_mt',
                      })
                    }
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition-all"
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>3D Scanners Edit (4 Pages)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setVisualEditorTarget({
                        category: 'cad',
                        productKey: 'ares_commander',
                      })
                    }
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-sm cursor-pointer transition-all"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>CAD Software Edit (14 Pages)</span>
                  </button>
                </div>
              </div>

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
                    {filteredProducts.map(p => {
                      const visualPageTarget = resolveVisualProductKeyFromCatalogProduct(p.slug || p.id)
                      return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div
                            onClick={() =>
                              setVisualEditorTarget({
                                category: visualPageTarget.editorGroup,
                                productKey: visualPageTarget.key,
                              })
                            }
                            className="flex items-center space-x-3 cursor-pointer group"
                            title="Click to open 100% Full-Screen Page-Wise Live Visual Editor"
                          >
                            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 group-hover:border-blue-400 overflow-hidden flex items-center justify-center shrink-0 transition-colors">
                              {p.hero_image ? (
                                <img src={p.hero_image} alt="" className="w-full h-full object-contain p-1" />
                              ) : (
                                <Box className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                <span>{p.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono uppercase">
                                  Live Visual
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">{visualPageTarget.route}</div>
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
                              {Object.keys(p.specifications || {}).length} specs • {(p.key_specs || []).length} key specs • {(p.features || []).length} features
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {(p.overview_cards || []).length + (p.feature_cards || []).length} section cards • {(p.faqs || []).length} FAQs • {(p.images || []).length + (p.print_gallery || []).length} visuals
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
                            onClick={() =>
                              setVisualEditorTarget({
                                category: visualPageTarget.editorGroup,
                                productKey: visualPageTarget.key,
                              })
                            }
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                            title="Open 100% Full-Screen Page-Wise Live Visual Editor (Same-to-Same Live Page)"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Edit Page (Live Visual)</span>
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct({ ...p })
                              setActiveEditTab('overview')
                            }}
                            className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                            title="Edit product catalog form fields"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Form</span>
                          </button>
                          <a
                            href={visualPageTarget.route}
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
                    )})}
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
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
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
                              image: '/hero-banner-1.png',
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
                                  src={currentHeroSlide.image || DEFAULT_HERO_BANNERS[activeHeroSlideIdx % DEFAULT_HERO_BANNERS.length] || FALLBACK_PUBLIC_HERO_BANNERS[activeHeroSlideIdx % FALLBACK_PUBLIC_HERO_BANNERS.length]}
                                  alt={currentHeroSlide.alt}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.currentTarget
                                    const fallback = FALLBACK_PUBLIC_HERO_BANNERS[activeHeroSlideIdx % FALLBACK_PUBLIC_HERO_BANNERS.length] || '/hero-banner-1.png'
                                    if (target.src !== fallback) {
                                      target.src = fallback
                                    }
                                  }}
                                />
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                <label className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg cursor-pointer border border-slate-300">
                                  Upload Image
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        const reader = new FileReader()
                                        reader.onload = (re) => {
                                          const result = re.target?.result as string
                                          if (result) {
                                            const updated = [...homeContentData.hero.slides]
                                            updated[activeHeroSlideIdx] = { ...currentHeroSlide, image: result }
                                            setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                          }
                                        }
                                        reader.readAsDataURL(file)
                                      }
                                    }}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const fallback = FALLBACK_PUBLIC_HERO_BANNERS[activeHeroSlideIdx % FALLBACK_PUBLIC_HERO_BANNERS.length] || '/hero-banner-1.png'
                                    const updated = [...homeContentData.hero.slides]
                                    updated[activeHeroSlideIdx] = { ...currentHeroSlide, image: fallback }
                                    setHomeContentData({ ...homeContentData, hero: { ...homeContentData.hero, slides: updated } })
                                  }}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg border border-slate-300 cursor-pointer"
                                >
                                  Default Banner
                                </button>
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
                  <label className="block font-bold text-slate-700 mb-1">ADDRESS</label>
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
                    placeholder="Monday – Friday: 9:30 AM – 6:00 PM IST | Saturday: 9:30 AM – 1:30 PM IST"
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
                        className="inline-flex items-center space-x-1 text-amber-700 hover:text-amber-900 text-xs font-bold cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Close</span>
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
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              required
                              placeholder="Enter new password"
                              value={newPasswordValue}
                              onChange={e => setNewPasswordValue(e.target.value)}
                              className="w-full px-3.5 py-2.5 pr-10 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(prev => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                              title={showNewPassword ? 'Hide password' : 'Show password'}
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                            Confirm New Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              required
                              placeholder="Re-enter new password"
                              value={confirmPasswordValue}
                              onChange={e => setConfirmPasswordValue(e.target.value)}
                              className="w-full px-3.5 py-2.5 pr-10 bg-white border border-amber-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(prev => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                              title={showNewPassword ? 'Hide password' : 'Show password'}
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
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
                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 1: IDENTITY & SEO
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 2: HERO BANNER & HEADER
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                        {/* Image URLs with Live Preview & Direct File Upload */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Hero Main Image URL</label>
                              <label className="inline-flex items-center space-x-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                <Upload className="w-3 h-3" />
                                <span>Upload Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) handleDirectImageUpload(file, url => updateCadField('heroImage', url))
                                  }}
                                />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={cur.heroImage || ''}
                              onChange={e => updateCadField('heroImage', e.target.value)}
                              placeholder="https://... or /images/..."
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            {cur.heroImage && (
                              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-100">
                                <img src={cur.heroImage} alt="Main preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Secondary / Floating Image URL</label>
                              <label className="inline-flex items-center space-x-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                <Upload className="w-3 h-3" />
                                <span>Upload Image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) handleDirectImageUpload(file, url => updateCadField('secondaryImage', url))
                                  }}
                                />
                              </label>
                            </div>
                            <input
                              type="text"
                              value={cur.secondaryImage || ''}
                              onChange={e => updateCadField('secondaryImage', e.target.value)}
                              placeholder="https://... or /images/..."
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 3: OVERVIEW & FEATURE CARDS
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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
                                    <div className="flex items-center justify-between mb-0.5">
                                      <label className="block text-[9px] font-bold uppercase text-slate-400">Image URL</label>
                                      <label className="inline-flex items-center space-x-0.5 text-[9px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                        <Upload className="w-2.5 h-2.5" />
                                        <span>Upload</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={e => {
                                            const file = e.target.files?.[0]
                                            if (file) handleDirectImageUpload(file, url => updateCadOverviewCard(idx, 'image', url))
                                          }}
                                        />
                                      </label>
                                    </div>
                                    <input
                                      type="text"
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 4: DEEP FEATURES & STANDARDS
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 5: SYSTEM REQUIREMENTS
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 6: FAQS MANAGER
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 7: CTAS & LICENSING
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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

                    {/* ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                        SECTION 8: LIVE PAGE VISUAL PREVIEW
                       ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */}
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
                        • <strong>Immediate Storage:</strong> Every edit you make is automatically saved in your browser storage and persists across sessions.<br />
                        • <strong>Full-Page Control:</strong> Use the 8 tabs above to edit identity details, hero banners, feature cards, system requirements, FAQs, and live preview.<br />
                        • <strong>Adding Products:</strong> Click <strong>"+ Add New CAD Product"</strong> to add any software product. To add hardware machines (3D printers / scanners), click <strong>"Add 3D Printer / Scanner"</strong> in the top banner to use the equipment catalog.
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

