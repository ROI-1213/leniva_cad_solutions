import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Eye,
  EyeOff,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Layers,
  ExternalLink,
  RotateCcw,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  History,
  Type,
  FileCheck,
  RefreshCw,
  LayoutGrid,
  Power,
} from 'lucide-react'
import { aresCommanderData } from '../../data/aresCommanderData'
import {
  CadVisualPagePayload,
  CadVisualEditorContext,
  CadPdfResource,
  CadSectionDefinition,
  CadImageSlot,
  DiscoveredDomPdfLink,
  VisualEditorCategory,
  VisualPageCatalogItem,
  VISUAL_PAGE_CATALOG,
  ARES_COMMANDER_SECTIONS,
  ARES_COMMANDER_IMAGE_SLOTS,
  getWorkingVisualPayload,
  saveVisualDraft,
  discardVisualDraft,
  publishVisualPayload,
  getVisualRevisions,
  getDefaultVisualPayload,
  uploadAssetToPersistentStorage,
  getByPath,
  setByPath,
  deepMergeData,
  structuredCloneSafe,
  computeDeterministicCadKey,
  applyCadVisualOverridesToRoot,
  discoverLiveDomInventory,
  normalizeAssetUrl,
} from '../../utils/cadVisualEditorStore'
import { CAD_DEFAULTS } from '../../utils/cadSoftwareConfig'
import { pushCmsStateToCloud } from '../../utils/cloudSync'

// 1. CAD Software Pages (14 pages)
import AresCommanderPage from '../../pages/AresCommanderPage'
import AresStandardPage from '../../pages/AresStandardPage'
import AresMechanicalPage from '../../pages/AresMechanicalPage'
import AresElectricalPage from '../../pages/AresElectricalPage'
import AresKudoPage from '../../pages/AresKudoPage'
import AresTouchPage from '../../pages/AresTouchPage'
import SketchUpProPage from '../../pages/SketchUpProPage'
import SketchUpProScanPage from '../../pages/SketchUpProScanPage'
import SketchUpProAdvancedPage from '../../pages/SketchUpProAdvancedPage'
import SketchUpStudioPage from '../../pages/SketchUpStudioPage'
import EnscapePage from '../../pages/EnscapePage'
import VRayPage from '../../pages/VRayPage'
import CoronaPage from '../../pages/CoronaPage'
import CategoryDetailPage from '../../pages/CategoryDetailPage'

// 2. 3D Printers & 3D Filaments Pages (20 pages)
import PrathamMiniPage from '../../pages/PrathamMiniPage'
import PrathamDesktopPage from '../../pages/PrathamDesktopPage'
import Pratham3Page from '../../pages/Pratham3Page'
import Pratham3RapidPage from '../../pages/Pratham3RapidPage'
import Pratham5Page from '../../pages/Pratham5Page'
import Pratham6Page from '../../pages/Pratham6Page'
import PrathamX600Page from '../../pages/PrathamX600Page'
import PrathamX1000Page from '../../pages/PrathamX1000Page'
import EkaHtPage from '../../pages/EkaHtPage'
import EkaXlPage from '../../pages/EkaXlPage'
import EkaXlePage from '../../pages/EkaXlePage'
import EkaGtMaxPage from '../../pages/EkaGtMaxPage'
import EkaF116kPage from '../../pages/EkaF116kPage'
import DlpCategoryPage from '../../pages/DlpCategoryPage'
import IndustrialLcdCategoryPage from '../../pages/IndustrialLcdCategoryPage'
import FilamentCategoryPage, { FilamentDetailPage } from '../../pages/FilamentCategoryPage'
import WhitePlaDetailPage from '../../pages/WhitePlaDetailPage'
import GreySilverPlaPage from '../../pages/GreySilverPlaPage'
import GoldPlaPage from '../../pages/GoldPlaPage'

// 3. 3D Scanners Pages (4 pages)
import DevokMTPage from '../../pages/DevokMTPage'
import DevokMQPage from '../../pages/DevokMQPage'
import EinscanPage from '../../pages/EinscanPage'
import ScannersCategoryPage from '../../pages/ScannersCategoryPage'

type ViewportMode = 'desktop' | 'tablet' | 'mobile'
type InspectorTab = 'element' | 'sections' | 'images' | 'pdfs' | 'seo'

interface SelectedElementInfo {
  key: string
  kind: 'text' | 'image' | 'link' | 'pdf'
  tagName: string
  label: string
  dataPath?: string
  sectionId?: string
  pdfId?: string
  currentText?: string
  currentHref?: string
  currentSrc?: string
  currentAlt?: string
  currentObjectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
}

function renderRealProductPage(productKey: string) {
  // Support custom 3D Scanners created with Devok / EinScan formats
  if (productKey.startsWith('scanner_')) {
    try {
      const savedScanners: any[] = JSON.parse(localStorage.getItem('leniva_custom_scanner_products') || '[]')
      const matched = savedScanners.find(p => p && p.key === productKey)
      const tpl = matched?.template || 'devok_mt'
      if (tpl && !tpl.startsWith('scanner_')) {
        return renderRealProductPage(tpl)
      }
    } catch {
      // fallback
    }
    return <DevokMTPage />
  }

  // Support custom 3D Printers created with Pratham / EKA formats
  if (productKey.startsWith('printer_')) {
    try {
      const savedPrinters: any[] = JSON.parse(localStorage.getItem('leniva_custom_printer_products') || '[]')
      const matched = savedPrinters.find(p => p && p.key === productKey)
      const tpl = matched?.template || 'pratham_mini'
      if (tpl && !tpl.startsWith('printer_')) {
        return renderRealProductPage(tpl)
      }
    } catch {
      // fallback
    }
    return <PrathamMiniPage />
  }

  // Support custom CAD products created with ARES Standard format
  if (productKey.startsWith('cad_') || productKey.includes('custom')) {
    return <AresStandardPage cadKey={productKey} />
  }

  switch (productKey) {
    // CAD Software Pages
    case 'ares_commander':
      return <AresCommanderPage />
    case 'ares_standard':
      return <AresStandardPage />
    case 'ares_mechanical':
      return <AresMechanicalPage />
    case 'ares_electrical':
      return <AresElectricalPage />
    case 'ares_kudo':
      return <AresKudoPage />
    case 'ares_touch':
      return <AresTouchPage />
    case 'sketchup_pro':
      return <SketchUpProPage />
    case 'sketchup_proscan':
      return <SketchUpProScanPage />
    case 'sketchup_advanced':
      return <SketchUpProAdvancedPage />
    case 'sketchup_studio':
      return <SketchUpStudioPage />
    case 'chaos_enscape':
      return <EnscapePage />
    case 'chaos_vray':
      return <VRayPage />
    case 'chaos_corona':
      return <CoronaPage />
    case 'cad_category':
      return <CategoryDetailPage forcedSlug="cad-software" />

    // 3D Printers (FDM, DLP, Industrial LCD) & Filaments Pages
    case 'pratham_mini':
      return <PrathamMiniPage />
    case 'pratham_desktop':
      return <PrathamDesktopPage />
    case 'pratham_3':
      return <Pratham3Page />
    case 'pratham_3_rapid':
      return <Pratham3RapidPage />
    case 'pratham_5':
      return <Pratham5Page />
    case 'pratham_6':
      return <Pratham6Page />
    case 'pratham_x_600':
      return <PrathamX600Page />
    case 'pratham_x':
      return <PrathamX1000Page />
    case 'eka_ht':
      return <EkaHtPage />
    case 'eka_xl':
      return <EkaXlPage />
    case 'eka_xle':
      return <EkaXlePage />
    case 'eka_gt_max':
      return <EkaGtMaxPage />
    case 'eka_f1_16k':
      return <EkaF116kPage />
    case 'fdm_category':
      return <CategoryDetailPage forcedSlug="fdm-3d-printers" />
    case 'dlp_category':
      return <DlpCategoryPage />
    case 'lcd_category':
      return <IndustrialLcdCategoryPage />
    case 'filament_white_pla':
      return <WhitePlaDetailPage />
    case 'filament_grey_silver_pla':
      return <GreySilverPlaPage />
    case 'filament_gold_pla':
      return <GoldPlaPage />
    case 'filament_orange_pla':
      return <FilamentDetailPage forcedSlug="plaplus-orange-1kg-175mm" />
    case 'filament_yellow_pla':
      return <FilamentDetailPage forcedSlug="plaplus-yellow-1kg-175mm" />
    case 'filament_blue_pla':
      return <FilamentDetailPage forcedSlug="plaplus-blue-1kg-175mm" />
    case 'filament_black_pla':
      return <FilamentDetailPage forcedSlug="plaplus-black-1kg-175mm" />
    case 'filament_red_pla':
      return <FilamentDetailPage forcedSlug="plaplus-red-1kg-175mm" />
    case 'filaments_category':
      return <FilamentCategoryPage />

    // 3D Scanners Pages
    case 'devok_mt':
      return <DevokMTPage />
    case 'devok_mq':
      return <DevokMQPage />
    case 'einscan_series':
      return <EinscanPage />
    case 'scanners_category':
      return <ScannersCategoryPage />

    default:
      if (productKey.startsWith('cad_') || productKey.includes('custom')) {
        return <AresStandardPage cadKey={productKey} />
      }
      return <AresCommanderPage />
  }
}

export interface CadVisualPageEditorProps {
  initialCategory?: VisualEditorCategory
  initialProductKey?: string
  onExitToDashboard?: () => void
}

export const CadVisualPageEditor: React.FC<CadVisualPageEditorProps> = ({
  initialCategory = 'cad',
  initialProductKey,
  onExitToDashboard,
}) => {
  const storageStateKey = `leniva_visual_editor_state_${initialCategory}`
  const savedEditorState = useMemo(() => {
    try {
      const raw =
        (typeof window !== 'undefined' &&
          (window.sessionStorage.getItem(storageStateKey) ||
            window.localStorage.getItem(storageStateKey))) ||
        ''
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [storageStateKey])

  const resolvedStartKey = useMemo(() => {
    if (initialProductKey) return initialProductKey
    if (savedEditorState?.activeProductKey) return savedEditorState.activeProductKey as string
    if (initialCategory === 'printers') return 'pratham_mini'
    if (initialCategory === 'scanners') return 'devok_mt'
    return 'ares_commander'
  }, [initialCategory, initialProductKey, savedEditorState])

  // Open directly in full-page visual editor mode so it displays the complete live page immediately
  const [viewMode, setViewMode] = useState<'list' | 'editor'>(
    savedEditorState?.viewMode === 'list' ? 'list' : 'editor'
  )
  const [categoryFilter, setCategoryFilter] = useState<VisualEditorCategory>(
    savedEditorState?.categoryFilter || initialCategory
  )
  const [activeProductKey, setActiveProductKey] = useState<string>(resolvedStartKey)

  useEffect(() => {
    try {
      const serialized = JSON.stringify({
        activeProductKey,
        categoryFilter,
        viewMode,
      })
      window.sessionStorage.setItem(storageStateKey, serialized)
      window.localStorage.setItem(storageStateKey, serialized)
    } catch {}
  }, [storageStateKey, activeProductKey, categoryFilter, viewMode])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false)
  const [showSectionVisibilityModal, setShowSectionVisibilityModal] = useState<boolean>(false)
  const [sectionSearchQuery, setSectionSearchQuery] = useState<string>('')

  // Editor state — full-width desktop by default, inspector closed until clicked so the page is 100% identical to live frontend
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false)
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false)
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('element')

  // Initial working payload
  const initialWorking = useMemo(() => getWorkingVisualPayload(resolvedStartKey), [resolvedStartKey])
  const [payload, setPayload] = useState<CadVisualPagePayload>(() => initialWorking.payload)
  const [history, setHistory] = useState<CadVisualPagePayload[]>(() => [
    structuredCloneSafe(initialWorking.payload),
  ])
  const [historyIndex, setHistoryIndex] = useState<number>(0)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)
  const [statusMeta, setStatusMeta] = useState<{
    hasDraft: boolean
    isPublished: boolean
    lastSavedAt: string | null
    lastPublishedAt: string | null
  }>({
    hasDraft: initialWorking.hasDraft,
    isPublished: initialWorking.isPublished,
    lastSavedAt: initialWorking.lastSavedAt,
    lastPublishedAt: initialWorking.lastPublishedAt,
  })

  // Dynamically discovered live DOM structure (for all 38 CAD, 3D Printer, Filament & 3D Scanner pages)
  const [discoveredInventory, setDiscoveredInventory] = useState<{
    sections: CadSectionDefinition[]
    imageSlots: CadImageSlot[]
    pdfLinks: DiscoveredDomPdfLink[]
  }>(() => ({
    sections: resolvedStartKey === 'ares_commander' ? ARES_COMMANDER_SECTIONS : [],
    imageSlots: resolvedStartKey === 'ares_commander' ? ARES_COMMANDER_IMAGE_SLOTS : [],
    pdfLinks: [],
  }))

  // Selection & notifications
  const [selectedElement, setSelectedElement] = useState<SelectedElementInfo | null>(null)
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('hero')
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [isPublishing, setIsPublishing] = useState<boolean>(false)
  const [uploadState, setUploadState] = useState<{
    active: boolean
    targetId: string
    progress: number
    statusText: string
  } | null>(null)
  const [previewPdfModal, setPreviewPdfModal] = useState<CadPdfResource | null>(null)
  const [refreshTick, setRefreshTick] = useState<number>(0)

  // Custom CAD Products state (Loaded from localStorage & Cloud CMS)
  const [customCadProducts, setCustomCadProducts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_custom_cad_products')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Deleted CAD Software keys (allows deleting both custom and built-in CAD softwares)
  const [deletedCadKeys, setDeletedCadKeys] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_deleted_cad_keys')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Custom 3D Printer Products state (Loaded from localStorage & Cloud CMS)
  const [customPrinterProducts, setCustomPrinterProducts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_custom_printer_products')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Deleted 3D Printer keys (allows deleting both custom and built-in 3D printers)
  const [deletedPrinterKeys, setDeletedPrinterKeys] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_deleted_printer_keys')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Custom 3D Scanner Products state (Loaded from localStorage & Cloud CMS)
  const [customScannerProducts, setCustomScannerProducts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_custom_scanner_products')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Deleted 3D Scanner keys (allows deleting both custom and built-in 3D scanners)
  const [deletedScannerKeys, setDeletedScannerKeys] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_deleted_scanner_keys')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Keep custom products and deleted keys synced when Cloud CMS pulls updates
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const savedCustom = localStorage.getItem('leniva_custom_cad_products')
        if (savedCustom) {
          const parsed = JSON.parse(savedCustom)
          if (Array.isArray(parsed)) setCustomCadProducts(parsed)
        }
      } catch {}
      try {
        const savedDeleted = localStorage.getItem('leniva_deleted_cad_keys')
        if (savedDeleted) {
          const parsedDel = JSON.parse(savedDeleted)
          if (Array.isArray(parsedDel)) setDeletedCadKeys(parsedDel)
        }
      } catch {}
      try {
        const savedCustomPrinters = localStorage.getItem('leniva_custom_printer_products')
        if (savedCustomPrinters) {
          const parsedP = JSON.parse(savedCustomPrinters)
          if (Array.isArray(parsedP)) setCustomPrinterProducts(parsedP)
        }
      } catch {}
      try {
        const savedDeletedPrinters = localStorage.getItem('leniva_deleted_printer_keys')
        if (savedDeletedPrinters) {
          const parsedDelP = JSON.parse(savedDeletedPrinters)
          if (Array.isArray(parsedDelP)) setDeletedPrinterKeys(parsedDelP)
        }
      } catch {}
      try {
        const savedCustomScanners = localStorage.getItem('leniva_custom_scanner_products')
        if (savedCustomScanners) {
          const parsedS = JSON.parse(savedCustomScanners)
          if (Array.isArray(parsedS)) setCustomScannerProducts(parsedS)
        }
      } catch {}
      try {
        const savedDeletedScanners = localStorage.getItem('leniva_deleted_scanner_keys')
        if (savedDeletedScanners) {
          const parsedDelS = JSON.parse(savedDeletedScanners)
          if (Array.isArray(parsedDelS)) setDeletedScannerKeys(parsedDelS)
        }
      } catch {}
    }
    window.addEventListener('leniva_cloud_cms_synced', syncFromStorage)
    window.addEventListener('storage', syncFromStorage)
    return () => {
      window.removeEventListener('leniva_cloud_cms_synced', syncFromStorage)
      window.removeEventListener('storage', syncFromStorage)
    }
  }, [])

  // Full unified visual catalog (Base pages + Custom CAD Softwares + Custom 3D Printers + Custom 3D Scanners)
  const fullVisualCatalog = useMemo<VisualPageCatalogItem[]>(() => {
    const deletedSet = new Set([...deletedCadKeys, ...deletedPrinterKeys, ...deletedScannerKeys])
    const customCadItems: VisualPageCatalogItem[] = customCadProducts
      .filter((p: any) => p && p.key && !deletedSet.has(p.key))
      .map((p: any) => ({
        key: p.key,
        label: p.label || p.name,
        brand: p.brand || 'Graebert',
        category: p.category || '2D DWG CAD Software',
        editorGroup: 'cad',
        route: p.route || `/products/${p.key.replace(/^cad_/, '')}`,
        heroImage: p.heroImage || '/images/ares-standard/ares-standard-hero.jpg',
        defaultBrochureUrl: p.route || `/products/${p.key.replace(/^cad_/, '')}`,
      }))
    const customPrinterItems: VisualPageCatalogItem[] = customPrinterProducts
      .filter((p: any) => p && p.key && !deletedSet.has(p.key))
      .map((p: any) => ({
        key: p.key,
        label: p.label || p.name,
        brand: p.brand || 'Make3D',
        category: p.category || 'FDM 3D Printers',
        editorGroup: 'printers',
        route: p.route || `/products/${p.key.replace(/^printer_/, '')}`,
        heroImage: p.heroImage || '/images/products/pratham-mini.png',
        defaultBrochureUrl: p.defaultBrochureUrl || '/brochures/pratham-mini.pdf',
      }))
    const customScannerItems: VisualPageCatalogItem[] = customScannerProducts
      .filter((p: any) => p && p.key && !deletedSet.has(p.key))
      .map((p: any) => ({
        key: p.key,
        label: p.label || p.name,
        brand: p.brand || 'Shining3D',
        category: p.category || '3D Scanners',
        editorGroup: 'scanners',
        route: p.route || `/products/${p.key.replace(/^scanner_/, '')}`,
        heroImage: p.heroImage || '/images/products/devok-mt.jpg',
        defaultBrochureUrl: p.defaultBrochureUrl || '/brochures/devok-mt.pdf',
      }))
    const baseItems = VISUAL_PAGE_CATALOG.filter(p => !deletedSet.has(p.key))
    return [...baseItems, ...customCadItems, ...customPrinterItems, ...customScannerItems]
  }, [customCadProducts, deletedCadKeys, customPrinterProducts, deletedPrinterKeys, customScannerProducts, deletedScannerKeys])

  // All active CAD software items (both custom and standard)
  const allCadCatalogItems = useMemo<VisualPageCatalogItem[]>(() => {
    return fullVisualCatalog.filter(p => p.editorGroup === 'cad')
  }, [fullVisualCatalog])

  // All active 3D Printer & Filament items (both custom and standard)
  const allPrinterCatalogItems = useMemo<VisualPageCatalogItem[]>(() => {
    return fullVisualCatalog.filter(p => p.editorGroup === 'printers')
  }, [fullVisualCatalog])

  // All active 3D Scanner items (both custom and standard)
  const allScannerCatalogItems = useMemo<VisualPageCatalogItem[]>(() => {
    return fullVisualCatalog.filter(p => p.editorGroup === 'scanners')
  }, [fullVisualCatalog])

  // Modal State for CAD Softwares (Clean earlier layout)
  const [showNewCadModal, setShowNewCadModal] = useState<boolean>(false)
  const [cadModalTab, setCadModalTab] = useState<'create' | 'manage'>('create')
  const [newCadForm, setNewCadForm] = useState({
    name: '',
    brand: 'Graebert',
    category: '2D DWG CAD Software',
    route: '/products/',
    template: 'ares_standard',
    headline: '',
    shortDescription: '',
  })

  // Dedicated Modal State for 3D Printers (Completely separate from CAD Softwares)
  const [showNewPrinterModal, setShowNewPrinterModal] = useState<boolean>(false)
  const [printerModalTab, setPrinterModalTab] = useState<'create' | 'manage'>('create')
  const [newPrinterForm, setNewPrinterForm] = useState({
    name: '',
    brand: 'Make3D',
    category: 'FDM 3D Printers',
    buildVolume: '300 × 300 × 300 mm',
    route: '/products/',
    template: 'pratham_mini',
    headline: '',
    shortDescription: '',
  })

  // Dedicated Modal State for 3D Scanners (Completely separate from CAD & Printers)
  const [showNewScannerModal, setShowNewScannerModal] = useState<boolean>(false)
  const [scannerModalTab, setScannerModalTab] = useState<'create' | 'manage'>('create')
  const [newScannerForm, setNewScannerForm] = useState({
    name: '',
    brand: 'Shining3D',
    category: '3D Scanners',
    scanAccuracy: '0.05 mm',
    route: '/products/',
    template: 'devok_mt',
    headline: '',
    shortDescription: '',
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message })
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev))
    }, 4500)
  }, [])

  // Load product working payload when switching products
  const loadProductIntoEditor = useCallback((productKey: string) => {
    const working = getWorkingVisualPayload(productKey)
    const catItem = fullVisualCatalog.find(p => p.key === productKey)
    if (catItem && categoryFilter !== 'all') {
      setCategoryFilter(catItem.editorGroup)
    }
    setActiveProductKey(productKey)
    setPayload(working.payload)
    setHistory([structuredCloneSafe(working.payload)])
    setHistoryIndex(0)
    setHasUnsavedChanges(false)
    setStatusMeta({
      hasDraft: working.hasDraft,
      isPublished: working.isPublished,
      lastSavedAt: working.lastSavedAt,
      lastPublishedAt: working.lastPublishedAt,
    })
    setSelectedElement(null)
    setExpandedSectionId(productKey === 'ares_commander' ? 'hero' : 'auto_sec_0')
    setViewMode('editor')
  }, [categoryFilter, fullVisualCatalog])

  const handleCreateNewCadSoftware = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCadForm.name.trim()) {
      alert('Please enter a software name')
      return
    }

    const rawSlug = newCadForm.route.replace(/^\/products\/?/, '').trim() || newCadForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const cleanSlug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-cad-software'
    const key = `cad_${cleanSlug}`
    const route = `/products/${cleanSlug}`

    const newProdItem = {
      key,
      label: newCadForm.name.trim(),
      brand: newCadForm.brand.trim() || 'Graebert',
      category: newCadForm.category || '2D DWG CAD Software',
      route,
      color: 'indigo',
      isCustom: true,
      heroImage: '/images/ares-standard/ares-standard-hero.jpg',
      defaultBrochureUrl: route,
    }

    // Template layout: Inherit full ARES Standard features, sections, specs
    const templateData = CAD_DEFAULTS[newCadForm.template] || CAD_DEFAULTS.ares_standard || {}
    const newProdData = {
      ...templateData,
      productName: newCadForm.name.trim(),
      brand: newCadForm.brand.trim() || 'Graebert',
      category: newCadForm.category,
      heroHeading: newCadForm.name.trim(),
      headline: newCadForm.headline.trim() || `${newCadForm.name.trim()} — Precision CAD Software`,
      supportingHeadline: `Professional ${newCadForm.category} Solutions`,
      shortDescription: newCadForm.shortDescription.trim() || `Explore ${newCadForm.name.trim()} by ${newCadForm.brand.trim()}. Genuine software licenses, expert integration, and local onboarding from Leniva CAD Solutions.`,
    }

    // 0. Ensure key is not in deletedCadKeys
    if (deletedCadKeys.includes(key)) {
      const updatedDeleted = deletedCadKeys.filter(k => k !== key)
      localStorage.setItem('leniva_deleted_cad_keys', JSON.stringify(updatedDeleted))
      setDeletedCadKeys(updatedDeleted)
    }

    // 1. Save to custom CAD products
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_cad_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {
      existingCustom = []
    }
    const updatedCustom = [...existingCustom.filter((x: any) => x.key !== key), newProdItem]
    localStorage.setItem('leniva_custom_cad_products', JSON.stringify(updatedCustom))
    setCustomCadProducts(updatedCustom)

    // 2. Save to CAD software edits store
    let existingEdits: Record<string, any> = {}
    try {
      existingEdits = JSON.parse(localStorage.getItem('leniva_cad_edits') || '{}')
      if (typeof existingEdits !== 'object' || !existingEdits) existingEdits = {}
    } catch {
      existingEdits = {}
    }
    existingEdits[key] = newProdData
    localStorage.setItem('leniva_cad_edits', JSON.stringify(existingEdits))

    // 3. Register in leniva_admin_products_catalog for public catalog listing
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const exists = storedCat.some((p: any) => p.slug === cleanSlug || p.id === cleanSlug)
      if (!exists) {
        storedCat.push({
          id: cleanSlug,
          slug: cleanSlug,
          name: newCadForm.name.trim(),
          brand: newCadForm.brand.trim() || 'Graebert',
          category: 'CAD Software',
          category_slug: 'cad-software',
          technology: 'CAD Software',
          tagline: `Professional ${newCadForm.category}`,
          hero_heading: newCadForm.name.trim(),
          hero_subtitle: `Genuine ${newCadForm.name.trim()} software licenses and onboarding by Leniva.`,
          short_description: newProdData.shortDescription,
          description: `Full suite CAD software: ${newCadForm.name.trim()}. Formatted like ARES Standard with native DWG compatibility and technical precision.`,
          hero_image: '/images/ares-standard/ares-standard-hero.jpg',
          price: 0,
          in_stock: true,
          is_featured: true,
          is_quote_based: true,
          is_new: true,
        })
        localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(storedCat))
      }
    } catch {}

    // 4. Cloud sync to keep all sessions up to date
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 5. Reset form and close modal
    setShowNewCadModal(false)
    setNewCadForm({
      name: '',
      brand: 'Graebert',
      category: '2D DWG CAD Software',
      route: '/products/',
      template: 'ares_standard',
      headline: '',
      shortDescription: '',
    })

    // 6. Immediately load this new CAD product into the visual editor!
    setCategoryFilter('cad')
    setViewMode('editor')
    loadProductIntoEditor(key)
    showToast('success', `Created "${newProdItem.label}" formatted like ARES Standard! You are now editing its live page.`)
  }

  // Delete CAD Software handler (supports both Custom CAD Softwares and Built-In CAD Softwares)
  const handleDeleteCadSoftware = (key: string, label?: string) => {
    const prodName = label || key
    if (!window.confirm(`Are you sure you want to delete "${prodName}"?\n\nThis will remove its CAD software page and catalog entry from your website.`)) {
      return
    }

    // 1. Remove from leniva_custom_cad_products
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_cad_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {
      existingCustom = []
    }
    const updatedCustom = existingCustom.filter((x: any) => x.key !== key)
    localStorage.setItem('leniva_custom_cad_products', JSON.stringify(updatedCustom))
    setCustomCadProducts(updatedCustom)

    // 1b. If it's a built-in CAD software key, record in leniva_deleted_cad_keys so it stays deleted
    const isBuiltIn = VISUAL_PAGE_CATALOG.some(p => p.key === key)
    let nextDeletedKeys = deletedCadKeys
    if (isBuiltIn && !deletedCadKeys.includes(key)) {
      nextDeletedKeys = [...deletedCadKeys, key]
      localStorage.setItem('leniva_deleted_cad_keys', JSON.stringify(nextDeletedKeys))
      setDeletedCadKeys(nextDeletedKeys)
    }

    // 2. Remove from leniva_cad_software_edits
    try {
      const existingEdits = JSON.parse(localStorage.getItem('leniva_cad_software_edits') || '{}')
      delete existingEdits[key]
      localStorage.setItem('leniva_cad_software_edits', JSON.stringify(existingEdits))
    } catch {}

    // 3. Remove from leniva_cad_edits
    try {
      const existingEdits2 = JSON.parse(localStorage.getItem('leniva_cad_edits') || '{}')
      delete existingEdits2[key]
      localStorage.setItem('leniva_cad_edits', JSON.stringify(existingEdits2))
    } catch {}

    // 4. Remove from leniva_admin_products_catalog
    const slug = key.replace(/^cad_/, '').replace(/_/g, '-')
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const filteredCat = storedCat.filter((p: any) => p.slug !== slug && p.id !== slug && p.id !== key && p.slug !== key.replace(/^cad_/, ''))
      localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(filteredCat))
    } catch {}

    // 5. Remove any drafts / published payloads
    try {
      const drafts = JSON.parse(localStorage.getItem('leniva_cad_visual_drafts_v1') || '{}')
      delete drafts[key]
      localStorage.setItem('leniva_cad_visual_drafts_v1', JSON.stringify(drafts))

      const pub = JSON.parse(localStorage.getItem('leniva_cad_visual_published_v1') || '{}')
      delete pub[key]
      localStorage.setItem('leniva_cad_visual_published_v1', JSON.stringify(pub))
    } catch {}

    // 6. Push to cloud CMS
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 7. If currently viewing the deleted product, switch to the next available CAD software
    if (activeProductKey === key) {
      const remainingCad = fullVisualCatalog.filter(p => p.key !== key && !nextDeletedKeys.includes(p.key))
      const fallbackKey = remainingCad[0]?.key || 'ares_standard'
      loadProductIntoEditor(fallbackKey)
    }

    showToast('success', `✓ Successfully deleted CAD software "${prodName}".`)
  }

  // Restore any deleted built-in CAD softwares
  const handleRestoreDeletedCadSoftwares = () => {
    localStorage.setItem('leniva_deleted_cad_keys', JSON.stringify([]))
    setDeletedCadKeys([])
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
    showToast('success', '✓ Restored all default CAD software pages.')
  }

  // Create New 3D Printer handler (formatted like Pratham Mini, Pratham 3.0, EKA HT, EKA GT Max, etc.)
  const handleCreateNewPrinter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPrinterForm.name.trim()) {
      alert('Please enter a 3D Printer name')
      return
    }

    const rawSlug =
      newPrinterForm.route.replace(/^\/products\/?/, '').trim() ||
      newPrinterForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const cleanSlug =
      rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-3d-printer'
    const key = `printer_${cleanSlug}`
    const route = `/products/${cleanSlug}`

    const baseTemplateItem =
      VISUAL_PAGE_CATALOG.find(p => p.key === newPrinterForm.template) ||
      VISUAL_PAGE_CATALOG.find(p => p.key === 'pratham_mini')!

    const newPrinterItem = {
      key,
      label: newPrinterForm.name.trim(),
      brand: newPrinterForm.brand.trim() || 'Make3D',
      category: newPrinterForm.category || 'FDM 3D Printers',
      buildVolume: newPrinterForm.buildVolume.trim() || '300 × 300 × 300 mm',
      route,
      template: newPrinterForm.template || 'pratham_mini',
      templateLabel: baseTemplateItem.label,
      isCustom: true,
      heroImage: baseTemplateItem.heroImage || '/images/products/pratham-mini.png',
      defaultBrochureUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/pratham-mini.pdf',
    }

    // 0. Ensure key is not in deletedPrinterKeys
    if (deletedPrinterKeys.includes(key)) {
      const updatedDeleted = deletedPrinterKeys.filter(k => k !== key)
      localStorage.setItem('leniva_deleted_printer_keys', JSON.stringify(updatedDeleted))
      setDeletedPrinterKeys(updatedDeleted)
    }

    // 1. Save to leniva_custom_printer_products
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_printer_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {
      existingCustom = []
    }
    const updatedCustom = [...existingCustom.filter((x: any) => x.key !== key), newPrinterItem]
    localStorage.setItem('leniva_custom_printer_products', JSON.stringify(updatedCustom))
    setCustomPrinterProducts(updatedCustom)

    // 2. Seed initial Visual Payload with customPrinterMeta so the template immediately shows the new printer's name, build volume, headline, and description
    const initialVisualPayload: CadVisualPagePayload = {
      productKey: key,
      dataOverrides: {
        customPrinterMeta: {
          name: newPrinterForm.name.trim(),
          brand: newPrinterForm.brand.trim() || 'Make3D',
          category: newPrinterForm.category || 'FDM 3D Printers',
          buildVolume: newPrinterForm.buildVolume.trim() || '300 × 300 × 300 mm',
          template: newPrinterForm.template || 'pratham_mini',
          baseTemplateName: baseTemplateItem.label.replace(/\s*\(.*?\)\s*/g, '').trim(),
          headline:
            newPrinterForm.headline.trim() ||
            `${newPrinterForm.name.trim()} — Precision Industrial 3D Printing`,
          shortDescription:
            newPrinterForm.shortDescription.trim() ||
            `Explore ${newPrinterForm.name.trim()} by ${newPrinterForm.brand.trim() || 'Make3D'}. Industrial-grade 3D printing accuracy, reliable production performance, and nationwide technical support from Leniva CAD Solutions.`,
        },
      },
      elementOverrides: {},
      pdfResources: [
        {
          id: `${key}-brochure`,
          title: `${newPrinterForm.name.trim()} Official Brochure (PDF)`,
          description: `Technical specifications, build volume, material compatibility, and system datasheet for ${newPrinterForm.name.trim()}.`,
          badge: 'Product Brochure',
          buttonLabel: 'Download Brochure PDF',
          fileUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/pratham-mini.pdf',
          originalFileUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/pratham-mini.pdf',
          fileName: `${cleanSlug}-brochure.pdf`,
          fileSize: '2.5 MB',
          visible: true,
          behavior: 'new_tab',
        },
      ],
      sectionOrder: [],
      hiddenSections: {},
      seo: {
        title: `${newPrinterForm.name.trim()} (${newPrinterForm.brand.trim() || 'Make3D'}) | Industrial 3D Printers — Leniva CAD Solutions`,
        description:
          newPrinterForm.shortDescription.trim() ||
          `Official ${newPrinterForm.name.trim()} 3D Printer specifications, features, build volume (${newPrinterForm.buildVolume.trim() || '300 × 300 × 300 mm'}), and quotation from Leniva CAD Solutions.`,
      },
      updatedAt: new Date().toISOString(),
    }

    try {
      const pubMap = JSON.parse(localStorage.getItem('leniva_cad_visual_published_v1') || '{}')
      pubMap[key] = initialVisualPayload
      localStorage.setItem('leniva_cad_visual_published_v1', JSON.stringify(pubMap))

      const draftMap = JSON.parse(localStorage.getItem('leniva_cad_visual_drafts_v1') || '{}')
      draftMap[key] = initialVisualPayload
      localStorage.setItem('leniva_cad_visual_drafts_v1', JSON.stringify(draftMap))
    } catch {}

    // 3. Register in leniva_admin_products_catalog for public /products catalog listing
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const exists = storedCat.some((p: any) => p.slug === cleanSlug || p.id === cleanSlug)
      const catSlug =
        newPrinterForm.category.includes('DLP')
          ? 'dlp-3d-printers'
          : newPrinterForm.category.includes('LCD')
            ? 'industrial-lcd-3d-printers'
            : newPrinterForm.category.includes('Filament')
              ? 'filaments'
              : 'fdm-3d-printers'
      const techLabel =
        newPrinterForm.category.includes('DLP')
          ? 'DLP'
          : newPrinterForm.category.includes('LCD')
            ? 'LCD'
            : newPrinterForm.category.includes('Filament')
              ? 'Filament'
              : 'FDM'

      if (!exists) {
        storedCat.push({
          id: cleanSlug,
          slug: cleanSlug,
          name: newPrinterForm.name.trim(),
          brand: newPrinterForm.brand.trim() || 'Make3D',
          category: newPrinterForm.category || 'FDM 3D Printers',
          category_slug: catSlug,
          technology: techLabel,
          tagline:
            newPrinterForm.headline.trim() ||
            `Industrial ${techLabel} 3D Printer (${newPrinterForm.buildVolume.trim() || '300 × 300 × 300 mm'})`,
          hero_heading: newPrinterForm.name.trim(),
          hero_subtitle: `Precision ${newPrinterForm.category} engineered for reliability and accuracy.`,
          short_description:
            initialVisualPayload.dataOverrides.customPrinterMeta.shortDescription,
          description:
            initialVisualPayload.dataOverrides.customPrinterMeta.shortDescription,
          hero_image: baseTemplateItem.heroImage || '/images/products/pratham-mini.png',
          price: 0,
          in_stock: true,
          is_featured: true,
          is_quote_based: true,
          is_new: true,
        })
        localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(storedCat))
      }
    } catch {}

    // 4. Sync to Cloud CMS
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 5. Reset form and close modal
    setShowNewPrinterModal(false)
    setNewPrinterForm({
      name: '',
      brand: 'Make3D',
      category: 'FDM 3D Printers',
      buildVolume: '300 × 300 × 300 mm',
      route: '/products/',
      template: 'pratham_mini',
      headline: '',
      shortDescription: '',
    })

    // 6. Immediately open the new 3D printer page in the visual editor!
    setCategoryFilter('printers')
    setViewMode('editor')
    setActiveProductKey(key)
    setPayload(initialVisualPayload)
    setHistory([structuredCloneSafe(initialVisualPayload)])
    setHistoryIndex(0)
    setHasUnsavedChanges(false)
    setStatusMeta({
      hasDraft: true,
      isPublished: true,
      lastSavedAt: initialVisualPayload.updatedAt,
      lastPublishedAt: initialVisualPayload.updatedAt,
    })
    showToast(
      'success',
      `✓ Created 3D Printer "${newPrinterItem.label}" with ${baseTemplateItem.label} format! You are now editing its live page.`
    )
  }

  // Delete 3D Printer handler (supports both Custom 3D Printers and Built-In 3D Printers)
  const handleDeletePrinter = (key: string, label?: string) => {
    const prodName = label || key
    if (
      !window.confirm(
        `Are you sure you want to delete "${prodName}"?\n\nThis will remove its 3D printer page and catalog entry from your website.`
      )
    ) {
      return
    }

    // 1. Remove from leniva_custom_printer_products
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_printer_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {
      existingCustom = []
    }
    const updatedCustom = existingCustom.filter((x: any) => x.key !== key)
    localStorage.setItem('leniva_custom_printer_products', JSON.stringify(updatedCustom))
    setCustomPrinterProducts(updatedCustom)

    // 1b. If it's a built-in 3D Printer key, record in leniva_deleted_printer_keys so it stays deleted
    const isBuiltIn = VISUAL_PAGE_CATALOG.some(p => p.key === key)
    let nextDeletedKeys = deletedPrinterKeys
    if (isBuiltIn && !deletedPrinterKeys.includes(key)) {
      nextDeletedKeys = [...deletedPrinterKeys, key]
      localStorage.setItem('leniva_deleted_printer_keys', JSON.stringify(nextDeletedKeys))
      setDeletedPrinterKeys(nextDeletedKeys)
    }

    // 2. Remove from leniva_admin_products_catalog
    const slug = key.replace(/^printer_/, '').replace(/_/g, '-')
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const filteredCat = storedCat.filter(
        (p: any) =>
          p.slug !== slug &&
          p.id !== slug &&
          p.id !== key &&
          p.slug !== key.replace(/^printer_/, '')
      )
      localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(filteredCat))
    } catch {}

    // 3. Remove any drafts / published payloads
    try {
      const drafts = JSON.parse(localStorage.getItem('leniva_cad_visual_drafts_v1') || '{}')
      delete drafts[key]
      localStorage.setItem('leniva_cad_visual_drafts_v1', JSON.stringify(drafts))

      const pub = JSON.parse(localStorage.getItem('leniva_cad_visual_published_v1') || '{}')
      delete pub[key]
      localStorage.setItem('leniva_cad_visual_published_v1', JSON.stringify(pub))
    } catch {}

    // 4. Push to cloud CMS
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 5. If currently viewing the deleted printer, switch to the next available 3D printer
    if (activeProductKey === key) {
      const remainingPrinters = fullVisualCatalog.filter(
        p => p.editorGroup === 'printers' && p.key !== key && !nextDeletedKeys.includes(p.key)
      )
      const fallbackKey = remainingPrinters[0]?.key || 'pratham_mini'
      loadProductIntoEditor(fallbackKey)
    }

    showToast('success', `✓ Successfully deleted 3D Printer "${prodName}".`)
  }

  // Restore any deleted built-in 3D Printers
  const handleRestoreDeletedPrinters = () => {
    localStorage.setItem('leniva_deleted_printer_keys', JSON.stringify([]))
    setDeletedPrinterKeys([])
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
    showToast('success', '✓ Restored all default 3D Printer & Filament pages.')
  }

  // ── 3D SCANNER HANDLERS ──────────────────────────────────────────────────

  // Create a new custom 3D Scanner page (formatted like Devok MT, Devok MQ, or EinScan series)
  const handleCreateNewScanner = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = newScannerForm.name.trim()
    if (!name) {
      showToast('error', 'Scanner name is required.')
      return
    }

    const rawSlug =
      newScannerForm.route.replace(/^\/products\/?/, '').trim() ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const cleanSlug =
      rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-3d-scanner'
    const key = `scanner_${cleanSlug}`
    const route = `/products/${cleanSlug}`

    const baseTemplateItem =
      VISUAL_PAGE_CATALOG.find(p => p.key === newScannerForm.template) ||
      VISUAL_PAGE_CATALOG.find(p => p.key === 'devok_mt')!

    const newScanner = {
      key,
      name,
      label: name,
      brand: newScannerForm.brand.trim() || 'Shining3D',
      category: newScannerForm.category || '3D Scanners',
      scanAccuracy: newScannerForm.scanAccuracy.trim() || '0.05 mm',
      route,
      template: newScannerForm.template || 'devok_mt',
      templateLabel: baseTemplateItem.label,
      headline: newScannerForm.headline.trim(),
      shortDescription: newScannerForm.shortDescription.trim(),
      editorGroup: 'scanners',
      isCustom: true,
      heroImage: baseTemplateItem.heroImage || '/images/products/devok-mt.jpg',
      defaultBrochureUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/devok-mt.pdf',
      createdAt: new Date().toISOString(),
    }

    // 0. Remove from deleted keys if re-adding
    if (deletedScannerKeys.includes(key)) {
      const updatedDeleted = deletedScannerKeys.filter(k => k !== key)
      setDeletedScannerKeys(updatedDeleted)
      localStorage.setItem('leniva_deleted_scanner_keys', JSON.stringify(updatedDeleted))
    }

    // 1. Save to custom scanner products
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_scanner_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {}
    const updatedCustom = [...existingCustom.filter((p: any) => p?.key !== key), newScanner]
    localStorage.setItem('leniva_custom_scanner_products', JSON.stringify(updatedCustom))
    setCustomScannerProducts(updatedCustom)

    // 2. Seed initial Visual Payload with customScannerMeta / customPrinterMeta so the template immediately shows the new scanner's name, accuracy, headline, and description
    const initialVisualPayload: CadVisualPagePayload = {
      productKey: key,
      dataOverrides: {
        customPrinterMeta: {
          name,
          brand: newScannerForm.brand.trim() || 'Shining3D',
          category: newScannerForm.category || '3D Scanners',
          buildVolume: newScannerForm.scanAccuracy.trim() || '0.05 mm',
          template: newScannerForm.template || 'devok_mt',
          baseTemplateName: baseTemplateItem.label.replace(/\s*\(.*?\)\s*/g, '').trim(),
          headline:
            newScannerForm.headline.trim() ||
            `${name} — High-Precision Industrial 3D Scanner`,
          shortDescription:
            newScannerForm.shortDescription.trim() ||
            `Explore ${name} by ${newScannerForm.brand.trim() || 'Shining3D'}. Metrology-grade 3D scanning accuracy (${newScannerForm.scanAccuracy.trim() || '0.05 mm'}) for reverse engineering, quality inspection, and CAD modeling from Leniva CAD Solutions.`,
        },
      },
      elementOverrides: {},
      pdfResources: [
        {
          id: `${key}-brochure`,
          title: `${name} Official Technical Brochure (PDF)`,
          description: `Complete 3D scanning accuracy, light source, working distance, and system specifications for ${name}.`,
          badge: 'Product Brochure',
          buttonLabel: 'Download Brochure PDF',
          fileUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/devok-mt.pdf',
          originalFileUrl: baseTemplateItem.defaultBrochureUrl || '/brochures/devok-mt.pdf',
          fileName: `${cleanSlug}-brochure.pdf`,
          fileSize: '2.4 MB',
          visible: true,
          behavior: 'new_tab',
        },
      ],
      sectionOrder: [],
      hiddenSections: {},
      seo: {
        title: `${name} (${newScannerForm.brand.trim() || 'Shining3D'}) | Industrial 3D Scanners — Leniva CAD Solutions`,
        description:
          newScannerForm.shortDescription.trim() ||
          `Official ${name} 3D Scanner specifications, scan accuracy (${newScannerForm.scanAccuracy.trim() || '0.05 mm'}), and quotation from Leniva CAD Solutions.`,
      },
      updatedAt: new Date().toISOString(),
    }

    try {
      const pubMap = JSON.parse(localStorage.getItem('leniva_cad_visual_published_v1') || '{}')
      pubMap[key] = initialVisualPayload
      localStorage.setItem('leniva_cad_visual_published_v1', JSON.stringify(pubMap))

      const draftMap = JSON.parse(localStorage.getItem('leniva_cad_visual_drafts_v1') || '{}')
      draftMap[key] = initialVisualPayload
      localStorage.setItem('leniva_cad_visual_drafts_v1', JSON.stringify(draftMap))
    } catch {}

    // 3. Register in leniva_admin_products_catalog for public /products catalog listing
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const exists = storedCat.some((p: any) => p.slug === cleanSlug || p.id === cleanSlug)
      if (!exists) {
        storedCat.push({
          id: cleanSlug,
          slug: cleanSlug,
          name,
          brand: newScannerForm.brand.trim() || 'Shining3D',
          category: newScannerForm.category || '3D Scanners',
          category_slug: '3d-scanners',
          technology: '3D Scanner',
          tagline:
            newScannerForm.headline.trim() ||
            `High-Precision 3D Scanner (${newScannerForm.scanAccuracy.trim() || '0.05 mm'})`,
          hero_heading: name,
          hero_subtitle: `Metrology-grade ${newScannerForm.category} engineered for reverse engineering and quality inspection.`,
          short_description: initialVisualPayload.dataOverrides.customPrinterMeta.shortDescription,
          description: initialVisualPayload.dataOverrides.customPrinterMeta.shortDescription,
          hero_image: baseTemplateItem.heroImage || '/images/products/devok-mt.jpg',
          price: 0,
          in_stock: true,
          is_featured: true,
          is_quote_based: true,
          is_new: true,
        })
        localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(storedCat))
      }
    } catch {}

    // 4. Sync to Cloud CMS
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 5. Reset form and close modal
    setNewScannerForm({
      name: '',
      brand: 'Shining3D',
      category: '3D Scanners',
      scanAccuracy: '0.05 mm',
      route: '/products/',
      template: 'devok_mt',
      headline: '',
      shortDescription: '',
    })
    setShowNewScannerModal(false)

    // 6. Immediately open the new 3D scanner page in the visual editor!
    setCategoryFilter('scanners')
    setViewMode('editor')
    setActiveProductKey(key)
    setPayload(initialVisualPayload)
    setHistory([structuredCloneSafe(initialVisualPayload)])
    setHistoryIndex(0)
    setHasUnsavedChanges(false)
    setStatusMeta({
      hasDraft: true,
      isPublished: true,
      lastSavedAt: initialVisualPayload.updatedAt,
      lastPublishedAt: initialVisualPayload.updatedAt,
    })
    showToast(
      'success',
      `✓ Created 3D Scanner "${name}" with ${baseTemplateItem.label} format! You are now editing its live page.`
    )
  }

  // Delete a 3D Scanner (custom or built-in)
  const handleDeleteScanner = (key: string, label?: string) => {
    const prodName = label || key
    if (
      !window.confirm(
        `Are you sure you want to delete 3D Scanner "${prodName}"?\n\nThis will remove its 3D scanner page and catalog entry from your website.`
      )
    ) {
      return
    }
    // 1. Remove from custom scanners if present
    let existingCustom: any[] = []
    try {
      existingCustom = JSON.parse(localStorage.getItem('leniva_custom_scanner_products') || '[]')
      if (!Array.isArray(existingCustom)) existingCustom = []
    } catch {}
    const updatedCustom = existingCustom.filter((p: any) => p?.key !== key)
    localStorage.setItem('leniva_custom_scanner_products', JSON.stringify(updatedCustom))
    setCustomScannerProducts(updatedCustom)

    // 1b. If it's a built-in scanner key, record in deleted keys
    const isBuiltIn = VISUAL_PAGE_CATALOG.some(p => p.key === key)
    let nextDeletedKeys = deletedScannerKeys
    if ((isBuiltIn || !key.startsWith('scanner_')) && !deletedScannerKeys.includes(key)) {
      nextDeletedKeys = [...deletedScannerKeys, key]
      setDeletedScannerKeys(nextDeletedKeys)
      localStorage.setItem('leniva_deleted_scanner_keys', JSON.stringify(nextDeletedKeys))
    }

    // 2. Remove from leniva_admin_products_catalog
    const slug = key.replace(/^scanner_/, '').replace(/_/g, '-')
    try {
      const storedCat = JSON.parse(localStorage.getItem('leniva_admin_products_catalog') || '[]')
      const filteredCat = storedCat.filter(
        (p: any) =>
          p.slug !== slug &&
          p.id !== slug &&
          p.id !== key &&
          p.slug !== key.replace(/^scanner_/, '')
      )
      localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(filteredCat))
    } catch {}

    // 3. Remove any drafts / published payloads
    try {
      const drafts = JSON.parse(localStorage.getItem('leniva_cad_visual_drafts_v1') || '{}')
      delete drafts[key]
      localStorage.setItem('leniva_cad_visual_drafts_v1', JSON.stringify(drafts))

      const pub = JSON.parse(localStorage.getItem('leniva_cad_visual_published_v1') || '{}')
      delete pub[key]
      localStorage.setItem('leniva_cad_visual_published_v1', JSON.stringify(pub))
    } catch {}

    // 4. Push to cloud CMS
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)

    // 5. If currently viewing the deleted scanner, switch to the next available scanner
    if (activeProductKey === key) {
      const remainingScanners = fullVisualCatalog.filter(
        p => p.editorGroup === 'scanners' && p.key !== key && !nextDeletedKeys.includes(p.key)
      )
      const fallbackKey = remainingScanners[0]?.key || 'devok_mt'
      loadProductIntoEditor(fallbackKey)
    }

    showToast('success', `✓ Successfully deleted 3D Scanner "${prodName}".`)
  }

  // Restore any deleted built-in 3D Scanners
  const handleRestoreDeletedScanners = () => {
    localStorage.setItem('leniva_deleted_scanner_keys', JSON.stringify([]))
    setDeletedScannerKeys([])
    pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
    showToast('success', '✓ Restored all default 3D Scanner pages.')
  }

  // Sync if parent switches between CAD Software Edit / 3D Printers Edit / 3D Scanners Edit
  useEffect(() => {
    setCategoryFilter(initialCategory)
    const nextKey =
      initialProductKey ||
      (initialCategory === 'printers'
        ? 'pratham_mini'
        : initialCategory === 'scanners'
          ? 'devok_mt'
          : 'ares_commander')
    if (nextKey !== activeProductKey) {
      loadProductIntoEditor(nextKey)
    }
  }, [initialCategory, initialProductKey])

  const cloudSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Apply payload mutations, auto-persist to local & published store so Frontend updates immediately, and record in Undo/Redo stack
  const updatePayload = useCallback(
    (updater: (prev: CadVisualPagePayload) => CadVisualPagePayload) => {
      setPayload(prev => {
        const next = updater(structuredCloneSafe(prev))
        next.updatedAt = new Date().toISOString()
        try {
          saveVisualDraft(activeProductKey, next)
        } catch {}
        if (cloudSyncTimerRef.current) clearTimeout(cloudSyncTimerRef.current)
        cloudSyncTimerRef.current = setTimeout(() => {
          pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
        }, 1200)
        setHistory(hPrev => {
          const sliced = hPrev.slice(0, historyIndex + 1)
          const updatedStack = [...sliced, structuredCloneSafe(next)].slice(-40)
          setHistoryIndex(updatedStack.length - 1)
          return updatedStack
        })
        setHasUnsavedChanges(true)
        return next
      })
    },
    [historyIndex, activeProductKey]
  )

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1
      const target = structuredCloneSafe(history[nextIdx])
      setHistoryIndex(nextIdx)
      setPayload(target)
      setHasUnsavedChanges(true)
      showToast('info', 'Undid last change')
    }
  }, [history, historyIndex, showToast])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1
      const target = structuredCloneSafe(history[nextIdx])
      setHistoryIndex(nextIdx)
      setPayload(target)
      setHasUnsavedChanges(true)
      showToast('info', 'Redid change')
    }
  }, [history, historyIndex, showToast])

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S)
  useEffect(() => {
    if (viewMode !== 'editor') return
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      const isInput =
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        (e.target as HTMLElement)?.isContentEditable
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey && !isInput) {
        e.preventDefault()
        handleUndo()
      } else if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y' && !isInput) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z' && !isInput)
      ) {
        e.preventDefault()
        handleRedo()
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        const saved = saveVisualDraft(activeProductKey, payload)
        setHasUnsavedChanges(false)
        setStatusMeta(prev => ({ ...prev, hasDraft: true, lastSavedAt: saved.updatedAt }))
        setRefreshTick(t => t + 1)
        showToast('success', 'Draft saved locally. Click "Publish Changes" when ready to push live.')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [viewMode, activeProductKey, payload, handleUndo, handleRedo, showToast])

  // Warn before closing tab with unsaved changes
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [hasUnsavedChanges])

  // Discover live DOM sections, images, and PDF links whenever activeProductKey or viewMode changes
  useEffect(() => {
    if (viewMode !== 'editor' || !canvasRef.current) return
    const runDiscoveryAndApply = () => {
      const root = canvasRef.current
      if (!root) return
      const inv = discoverLiveDomInventory(root, activeProductKey)
      setDiscoveredInventory(inv)
      applyCadVisualOverridesToRoot(root, payload)
    }
    const t1 = setTimeout(runDiscoveryAndApply, 30)
    const t2 = setTimeout(runDiscoveryAndApply, 250)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [viewMode, activeProductKey])

  // Re-apply DOM overrides whenever payload changes inside the editor canvas (and observe tab switches on 3D Printer / Scanner pages)
  useEffect(() => {
    if (viewMode !== 'editor' || !canvasRef.current) return
    const root = canvasRef.current
    applyCadVisualOverridesToRoot(root, payload)

    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const observer =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => {
            if (debounceTimer) clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
              if (canvasRef.current) {
                applyCadVisualOverridesToRoot(canvasRef.current, payload)
              }
            }, 60)
          })
        : null

    observer?.observe(root, { childList: true, subtree: true })
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      observer?.disconnect()
    }
  }, [viewMode, payload, viewport])

  // Merged data for structured inspector fields
  const mergedAresData = useMemo(() => {
    return deepMergeData(aresCommanderData, payload.dataOverrides || {})
  }, [payload.dataOverrides])

  // Helper to update a nested path in `dataOverrides`
  const setDataPathValue = useCallback(
    (path: string, value: any) => {
      updatePayload(prev => ({
        ...prev,
        dataOverrides: setByPath(prev.dataOverrides || {}, path, value),
      }))
    },
    [updatePayload]
  )

  // Helper to update an `elementOverride`
  const setElementOverrideValue = useCallback(
    (elKey: string, partial: Partial<CadVisualPagePayload['elementOverrides'][string]>) => {
      updatePayload(prev => {
        const existing = prev.elementOverrides?.[elKey] || { key: elKey }
        return {
          ...prev,
          elementOverrides: {
            ...(prev.elementOverrides || {}),
            [elKey]: {
              ...existing,
              ...partial,
            },
          },
        }
      })
    },
    [updatePayload]
  )

  // Save Draft handler
  const handleSaveDraft = () => {
    const saved = saveVisualDraft(activeProductKey, payload)
    setHasUnsavedChanges(false)
    setStatusMeta(prev => ({
      ...prev,
      hasDraft: true,
      lastSavedAt: saved.updatedAt,
    }))
    setRefreshTick(t => t + 1)
    showToast('success', 'Draft saved! Public website is unchanged until you click "Publish Changes".')
  }

  // Publish Changes handler
  const handlePublishChanges = async () => {
    setIsPublishing(true)
    try {
      const { published, syncedToCloud } = await publishVisualPayload(
        activeProductKey,
        payload,
        `Published ${activeProductKey} via Live Visual Editor`
      )
      setPayload(published)
      setHasUnsavedChanges(false)
      setStatusMeta({
        hasDraft: false,
        isPublished: true,
        lastSavedAt: published.updatedAt,
        lastPublishedAt: published.updatedAt,
      })
      setRefreshTick(t => t + 1)
      showToast(
        'success',
        syncedToCloud
          ? 'Published live & synced to Cloud CMS! The public product page is now updated.'
          : 'Published live! The product page is now updated.'
      )
    } catch (err: any) {
      showToast('error', err?.message || 'Failed to publish changes.')
    } finally {
      setIsPublishing(false)
    }
  }

  // Click interceptor on the live rendered product page canvas
  const handleCanvasClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPreviewMode) return
    const root = canvasRef.current
    if (!root) return

    const target = e.target as HTMLElement
    if (!target || !root.contains(target)) return

    // Ignore clicks inside the site Header / Footer navigation links if user is clicking around, or prevent navigation away from /admin
    const inHeaderOrFooter = target.closest('header') || target.closest('footer')
    if (inHeaderOrFooter) {
      const linkNode = target.closest('a')
      if (linkNode) {
        e.preventDefault()
      }
      return
    }

    const closestSection = target.closest<HTMLElement>('[data-cad-section]')
    const sectionId = closestSection?.getAttribute('data-cad-section') || undefined

    // 1. Check if user clicked a PDF card or PDF download button
    const closestPdfNode = target.closest<HTMLElement>('[data-cad-pdf-id]')
    if (closestPdfNode) {
      e.preventDefault()
      e.stopPropagation()
      const pdfId = closestPdfNode.getAttribute('data-cad-pdf-id') || ''
      const pdfDoc = payload.pdfResources.find(p => p.id === pdfId)
      setSelectedElement({
        key: `pdf:${pdfId}`,
        kind: 'pdf',
        tagName: 'a',
        label: pdfDoc ? `PDF: ${pdfDoc.title}` : 'PDF Resource',
        pdfId,
        sectionId: sectionId || 'pdf_downloads',
        currentText: pdfDoc?.buttonLabel,
        currentHref: pdfDoc?.fileUrl,
      })
      setInspectorOpen(true)
      setInspectorTab('pdfs')
      return
    }

    // 2. Check if user clicked an Image (<img>) or its immediate wrapper / overlay
    let imgEl: HTMLImageElement | null = null
    if (target instanceof HTMLImageElement) {
      imgEl = target
    } else {
      const childImg = target.querySelector('img')
      if (childImg && (target.tagName === 'DIV' || target.tagName === 'SPAN') && target.clientHeight > 30) {
        imgEl = childImg
      } else if (
        target.parentElement &&
        (target.textContent || '').trim().length === 0 &&
        target.parentElement.querySelector('img')
      ) {
        imgEl = target.parentElement.querySelector('img')
      }
    }

    if (imgEl) {
      e.preventDefault()
      e.stopPropagation()
      const elKey = computeDeterministicCadKey(root, imgEl)
      const dataPath = imgEl.getAttribute('data-cad-path') || undefined
      const ov = payload.elementOverrides?.[elKey]
      setSelectedElement({
        key: elKey,
        kind: 'image',
        tagName: 'img',
        label: imgEl.alt || dataPath || 'Product Image',
        dataPath,
        sectionId,
        currentSrc: normalizeAssetUrl(ov?.src || imgEl.getAttribute('src') || imgEl.src, 'image'),
        currentAlt: ov?.alt !== undefined ? ov.alt : imgEl.alt,
        currentObjectFit: ov?.objectFit || 'contain',
      })
      setInspectorOpen(true)
      setInspectorTab('element')
      return
    }

    // 3. Check if user clicked a Link (<a>) or Action Button (<button>)
    const closestLink = target.closest('a')
    if (closestLink && root.contains(closestLink)) {
      e.preventDefault()
      e.stopPropagation()
      const elKey = computeDeterministicCadKey(root, closestLink)
      const dataPath = closestLink.getAttribute('data-cad-path') || undefined
      const textSpan = closestLink.querySelector<HTMLElement>('[data-cad-btn-text]')
      const btnTextPath = textSpan?.getAttribute('data-cad-path') || undefined
      const currentText = (textSpan ? textSpan.textContent : closestLink.textContent)?.trim() || ''
      const currentHref = closestLink.getAttribute('href') || ''

      setSelectedElement({
        key: elKey,
        kind: 'link',
        tagName: 'a',
        label: `Link / Button: "${currentText.slice(0, 32)}"`,
        dataPath: btnTextPath || dataPath,
        sectionId,
        currentText,
        currentHref,
      })
      setInspectorOpen(true)
      setInspectorTab('element')
      return
    }

    const closestButton = target.closest('button')
    if (closestButton && root.contains(closestButton)) {
      const elKey = computeDeterministicCadKey(root, closestButton)
      const dataPath = closestButton.getAttribute('data-cad-path') || undefined
      const currentText = (closestButton.textContent || '').trim()
      const currentHref =
        payload.elementOverrides?.[elKey]?.pdfUrl ||
        payload.elementOverrides?.[elKey]?.href ||
        closestButton.getAttribute('data-visual-override-href') ||
        ''

      if (currentText.length > 0 && currentText.length < 120) {
        setSelectedElement({
          key: elKey,
          kind: 'link',
          tagName: 'button',
          label: `Button: "${currentText.slice(0, 32)}"`,
          dataPath,
          sectionId,
          currentText,
          currentHref,
        })
        setInspectorOpen(true)
        setInspectorTab('element')
        return
      }
    }

    // 4. Check if user clicked an editable text node or element with data-cad-path
    const closestPathNode = target.closest<HTMLElement>('[data-cad-path]')
    const closestHeading = target.closest<HTMLElement>('h1, h2, h3, h4, h5, h6')
    const editableTarget =
      closestPathNode ||
      (closestHeading && root.contains(closestHeading) && target.tagName.toLowerCase() !== 'span'
        ? closestHeading
        : target)
    const tag = editableTarget.tagName.toLowerCase()
    const allowedTextTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'td', 'th', 'button', 'div']

    if (allowedTextTags.includes(tag)) {
      const dataPath = editableTarget.getAttribute('data-cad-path') || undefined
      const hasComplexChildren = Boolean(
        editableTarget.querySelector('section, table, ul, ol, img, button, a, input, select, textarea')
      )
      const isHeadingOrParagraph = /^h[1-6]|p|li|td|th$/i.test(tag)
      const isLeafText =
        editableTarget.childElementCount === 0 ||
        Boolean(dataPath) ||
        (isHeadingOrParagraph && !hasComplexChildren)
      if (!isLeafText) return

      const elKey = computeDeterministicCadKey(root, editableTarget)
      const currentText =
        payload.elementOverrides?.[elKey]?.text ??
        (dataPath ? getByPath(payload.dataOverrides, dataPath) : undefined) ??
        (activeProductKey === 'ares_commander' && dataPath ? getByPath(mergedAresData, dataPath) : undefined) ??
        editableTarget.textContent ??
        ''

      setSelectedElement({
        key: elKey,
        kind: 'text',
        tagName: tag,
        label: dataPath ? `Field: ${dataPath}` : `${tag.toUpperCase()} Text`,
        dataPath,
        sectionId,
        currentText: String(currentText),
      })
      setInspectorOpen(true)
      setInspectorTab('element')
    }
  }

  // Handle uploading an image for a slot or selected element
  const handleImageFileUpload = async (
    file: File,
    options: { dataPath?: string; elementKey?: string; defaultSrc?: string }
  ) => {
    const targetId = options.dataPath || options.elementKey || 'image'
    setUploadState({ active: true, targetId, progress: 10, statusText: 'Starting upload...' })
    try {
      const res = await uploadAssetToPersistentStorage(file, 'image', (progress, statusText) => {
        setUploadState({ active: true, targetId, progress, statusText })
      })

      const normalizedUrl = normalizeAssetUrl(res.url, 'image')

      updatePayload(prev => {
        const next = { ...prev }
        if (options.dataPath) {
          next.dataOverrides = setByPath(next.dataOverrides || {}, options.dataPath, normalizedUrl)
        }
        if (options.elementKey === 'auto:img:0' || options.elementKey === 'hero.image' || options.dataPath === 'hero.image') {
          next.dataOverrides = setByPath(next.dataOverrides || {}, 'hero.image', normalizedUrl)
          next.dataOverrides = setByPath(next.dataOverrides || {}, 'hero.heroImage', normalizedUrl)
        }
        if (options.elementKey) {
          const existing = next.elementOverrides?.[options.elementKey] || { key: options.elementKey }
          next.elementOverrides = {
            ...(next.elementOverrides || {}),
            [options.elementKey]: {
              ...existing,
              src: normalizedUrl,
              originalSrc: existing.originalSrc || options.defaultSrc,
              fileName: res.fileName,
              dimensions: res.dimensions,
              objectFit: existing.objectFit || 'contain',
            },
          }
        }
        return next
      })

      // If hero image was uploaded, also refresh local custom product arrays so list cards update immediately
      if (options.elementKey === 'auto:img:0' || options.dataPath === 'hero.image') {
        setCustomPrinterProducts(prev =>
          prev.map(p => (p && p.key === activeProductKey ? { ...p, heroImage: normalizedUrl } : p))
        )
        setCustomCadProducts(prev =>
          prev.map(p => (p && p.key === activeProductKey ? { ...p, heroImage: normalizedUrl } : p))
        )
        setCustomScannerProducts(prev =>
          prev.map(p => (p && p.key === activeProductKey ? { ...p, heroImage: normalizedUrl } : p))
        )
      }

      if (selectedElement && (selectedElement.dataPath === options.dataPath || selectedElement.key === options.elementKey)) {
        setSelectedElement(prev => (prev ? { ...prev, currentSrc: normalizedUrl } : null))
      }

      pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
      showToast('success', `✓ Image "${res.fileName}" (${res.fileSize}) uploaded & live on frontend!`)
    } catch (err: any) {
      showToast('error', err?.message || 'Image upload failed.')
    } finally {
      setUploadState(null)
    }
  }

  // Handle uploading a PDF for a PDF resource card
  const handlePdfFileUpload = async (file: File, pdfId: string) => {
    setUploadState({ active: true, targetId: pdfId, progress: 10, statusText: 'Validating PDF...' })
    try {
      const res = await uploadAssetToPersistentStorage(file, 'pdf', (progress, statusText) => {
        setUploadState({ active: true, targetId: pdfId, progress, statusText })
      })

      const normalizedPdfUrl = normalizeAssetUrl(res.url, 'pdf')

      updatePayload(prev => {
        const hasMatch = prev.pdfResources.some(item => item.id === pdfId)
        const updatedResources = hasMatch
          ? prev.pdfResources.map(item =>
              item.id === pdfId
                ? {
                    ...item,
                    previousFileUrl: item.fileUrl,
                    fileUrl: normalizedPdfUrl,
                    fileName: res.fileName,
                    fileSize: res.fileSize,
                    visible: true,
                  }
                : item
            )
          : [
              {
                id: pdfId || `${activeProductKey}-brochure`,
                title: `${activeProductMeta.label} Official Brochure (PDF)`,
                description: `Official technical brochure and specifications for ${activeProductMeta.label}.`,
                badge: 'Product Brochure',
                buttonLabel: 'Download Brochure PDF',
                fileUrl: normalizedPdfUrl,
                originalFileUrl: activeProductMeta.defaultBrochureUrl || '/brochures/brochure.pdf',
                fileName: res.fileName,
                fileSize: res.fileSize,
                visible: true,
                behavior: 'new_tab' as const,
              },
              ...prev.pdfResources,
            ]
        return {
          ...prev,
          pdfResources: updatedResources,
        }
      })

      pushCmsStateToCloud({ isEnquirySubmission: false }).catch(() => null)
      showToast('success', `✓ Brochure PDF "${res.fileName}" (${res.fileSize}) uploaded & live on frontend!`)
    } catch (err: any) {
      showToast('error', err?.message || 'PDF upload failed.')
    } finally {
      setUploadState(null)
    }
  }

  const activeSectionsBase =
    activeProductKey === 'ares_commander'
      ? ARES_COMMANDER_SECTIONS
      : discoveredInventory.sections

  const activeImageSlotsBase =
    activeProductKey === 'ares_commander'
      ? ARES_COMMANDER_IMAGE_SLOTS
      : discoveredInventory.imageSlots

  // Move section up/down
  const moveSectionOrder = (sectionId: string, direction: 'up' | 'down') => {
    updatePayload(prev => {
      const order = Array.isArray(prev.sectionOrder) && prev.sectionOrder.length > 0
        ? [...prev.sectionOrder]
        : activeSectionsBase.map(s => s.id)
      const idx = order.indexOf(sectionId)
      if (idx === -1) return prev
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= order.length) return prev
      const temp = order[idx]
      order[idx] = order[swapIdx]
      order[swapIdx] = temp
      return { ...prev, sectionOrder: order }
    })
  }

  // Toggle section visibility
  const toggleSectionVisibility = (sectionId: string) => {
    updatePayload(prev => {
      const willBeHidden = !prev.hiddenSections?.[sectionId]
      return {
        ...prev,
        hiddenSections: {
          ...(prev.hiddenSections || {}),
          [sectionId]: willBeHidden,
        },
      }
    })
  }

  // Bulk: Enable all sections on page
  const enableAllSections = () => {
    updatePayload(prev => ({
      ...prev,
      hiddenSections: {},
    }))
    showToast('success', 'All sections enabled and visible!')
  }

  // Bulk: Disable all secondary sections (keep primary hero)
  const disableAllExceptHero = (allSecs: CadSectionDefinition[]) => {
    const hiddenMap: Record<string, boolean> = {}
    allSecs.forEach((s, idx) => {
      if (idx !== 0 && s.id !== 'hero' && s.id !== 'sec_hero') {
        hiddenMap[s.id] = true
      }
    })
    updatePayload(prev => ({
      ...prev,
      hiddenSections: hiddenMap,
    }))
    showToast('info', 'Disabled secondary sections (Hero kept visible).')
  }

  // Reset section visibility to default
  const resetSectionVisibility = () => {
    updatePayload(prev => ({
      ...prev,
      hiddenSections: {},
    }))
    showToast('info', 'Reset section visibility to default.')
  }

  // Scroll to section inside the canvas
  const scrollToCanvasSection = (sectionId: string) => {
    if (!canvasRef.current) return
    const node = canvasRef.current.querySelector<HTMLElement>(`[data-cad-section="${sectionId}"]`)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeProductMeta: VisualPageCatalogItem =
    fullVisualCatalog.find(p => p.key === activeProductKey) || fullVisualCatalog[0]

  const categoryProducts = useMemo(() => {
    return fullVisualCatalog.filter(p => {
      if (categoryFilter === 'all') return true
      return p.editorGroup === categoryFilter
    })
  }, [fullVisualCatalog, categoryFilter])

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(p => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        p.label.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q)
      )
    })
  }, [categoryProducts, searchQuery, refreshTick])

  const categoryCounts = useMemo(() => {
    return {
      all: fullVisualCatalog.length,
      cad: fullVisualCatalog.filter(p => p.editorGroup === 'cad').length,
      printers: fullVisualCatalog.filter(p => p.editorGroup === 'printers').length,
      scanners: fullVisualCatalog.filter(p => p.editorGroup === 'scanners').length,
    }
  }, [fullVisualCatalog])

  const categoryHeaderTitle =
    categoryFilter === 'printers'
      ? '3D Printers & Filaments Edit — Full-Page Live Visual Editor'
      : categoryFilter === 'scanners'
        ? '3D Scanners Edit — Full-Page Live Visual Editor'
        : categoryFilter === 'cad'
          ? 'CAD Software Edit — Full-Page Live Visual Editor'
          : 'All Product Pages — Full-Page Live Visual Editor'

  // Dedicated Modal for Adding & Deleting CAD Softwares (Restored to Clean Earlier Layout)
  const renderCadModal = () =>
    showNewCadModal ? (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                {cadModalTab === 'create' ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Trash2 className="w-5 h-5 text-rose-400" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-base text-white">
                    {cadModalTab === 'create' ? 'Add New CAD Software' : 'Manage & Delete CAD Softwares'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold">
                    ARES Standard Layout
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-0.5">
                  {cadModalTab === 'create'
                    ? 'Create a new dedicated CAD product page formatted with the professional ARES Standard sections & RFQ form.'
                    : 'Review, edit, or delete CAD softwares from your website and product catalog.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNewCadModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs (Add New CAD vs Manage & Delete) */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-2">
            <button
              type="button"
              onClick={() => setCadModalTab('create')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                cadModalTab === 'create'
                  ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New CAD Software</span>
            </button>
            <button
              type="button"
              onClick={() => setCadModalTab('manage')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                cadModalTab === 'manage'
                  ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Manage & Delete CAD Softwares ({allCadCatalogItems.length})</span>
            </button>
          </div>



          {/* TAB 1: CREATE NEW CAD SOFTWARE */}
          {cadModalTab === 'create' && (
            <form onSubmit={handleCreateNewCadSoftware} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              {/* Template / Format Banner (HIGHLIGHTED) */}
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Choose Page Format & Template Layout</span>
                </label>
                <select
                  value={newCadForm.template}
                  onChange={e => setNewCadForm({ ...newCadForm, template: e.target.value })}
                  className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-slate-900 font-bold bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                >
                  <option value="ares_standard">
                    ★ Format like ARES Standard (Complete 2D/3D DWG Suite, Specs Table, Comparison Matrix & RFQ Quote Form) [Recommended]
                  </option>
                  <option value="ares_commander">
                    Format like ARES Commander (Trinity: Desktop, Cloud & Mobile Multi-Platform)
                  </option>
                  <option value="ares_mechanical">
                    Format like ARES Mechanical (2D Mechanical Engineering & Automated BOM)
                  </option>
                  <option value="sketchup_pro">
                    Format like SketchUp Pro (3D Design, Architectural Modeling & Rendering)
                  </option>
                </select>
                <p className="text-[11px] text-indigo-700 mt-1.5 leading-relaxed">
                  ✓ <strong>ARES Standard Format Selected:</strong> Your page will automatically include the complete Hero section, 2D Drafting Overview tabs, Key Benefits, Technical Specifications table, System Requirements, Download Trial button, and Instant RFQ Quote form!
                </p>
              </div>

              {/* Software Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  CAD Software Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SolidWorks 2026, AutoCAD Mechanical, ZwCAD Pro, BricsCAD"
                  value={newCadForm.name}
                  onChange={e => {
                    const name = e.target.value
                    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                    setNewCadForm({
                      ...newCadForm,
                      name,
                      route: autoSlug ? `/products/${autoSlug}` : '/products/',
                      headline: newCadForm.headline || (name ? `${name} — Professional DWG CAD Software` : ''),
                    })
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                />
              </div>

              {/* Grid: Brand & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand / Developer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Graebert / Dassault / Autodesk / Trimble"
                    value={newCadForm.brand}
                    onChange={e => setNewCadForm({ ...newCadForm, brand: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    CAD Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newCadForm.category}
                    onChange={e => setNewCadForm({ ...newCadForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-xs font-medium"
                  >
                    <option value="2D DWG CAD Software">2D DWG CAD Software</option>
                    <option value="2D Mechanical CAD">2D Mechanical CAD</option>
                    <option value="Electrical CAD (ECAD)">Electrical CAD (ECAD)</option>
                    <option value="3D Engineering CAD & BIM">3D Engineering CAD & BIM</option>
                    <option value="Architectural Modeling & Rendering">Architectural Modeling & Rendering</option>
                  </select>
                </div>
              </div>

              {/* Public URL Route */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Public Website Page URL <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 font-mono text-[11px]">
                    https://www.leniva3d.com/products/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="software-name-slug"
                    value={newCadForm.route.replace(/^\/products\/?/, '')}
                    onChange={e => {
                      const clean = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      setNewCadForm({ ...newCadForm, route: `/products/${clean}` })
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-r-xl text-slate-900 font-mono text-[11px] focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Accessible directly at this URL on your live website after publishing.
                </span>
              </div>

              {/* Tagline / Headline */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Page Hero Headline / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Precision 2D DWG CAD Software for Engineering & Technical Drafters"
                  value={newCadForm.headline}
                  onChange={e => setNewCadForm({ ...newCadForm, headline: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none text-xs"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Professional DWG CAD solution with perpetual and subscription licensing, native DWG compatibility, and full technical support from Leniva CAD Solutions."
                  value={newCadForm.shortDescription}
                  onChange={e => setNewCadForm({ ...newCadForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none text-xs resize-none"
                />
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Template: <strong>ARES Standard Engine</strong>
                </span>

                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setShowNewCadModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5 text-xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Create & Open in Visual Editor &rarr;</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE & DELETE CAD SOFTWARES */}
          {cadModalTab === 'manage' && (
            <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  All Active CAD Softwares on Website ({allCadCatalogItems.length})
                </span>
                <div className="flex items-center gap-2">
                  {deletedCadKeys.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRestoreDeletedCadSoftwares}
                      className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Deleted Defaults ({deletedCadKeys.length})</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setCadModalTab('create')}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Software</span>
                  </button>
                </div>
              </div>

              {allCadCatalogItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-bold text-slate-600">No CAD softwares currently active.</p>
                  <p className="text-xs">Click the "+ Add New CAD Software" tab above to create one formatted like ARES Standard.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {allCadCatalogItems.map(cp => {
                    const isCustomItem = cp.key.startsWith('cad_')
                    return (
                      <div
                        key={cp.key}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-sm text-slate-900 truncate">
                              {cp.label}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {cp.brand || 'Graebert'}
                            </span>
                            {isCustomItem ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                ★ Custom (ARES Standard Format)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700">
                                Standard CAD Page
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 truncate">
                            {cp.category} • <span className="font-mono text-[11px] text-blue-600">{cp.route}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewCadModal(false)
                              loadProductIntoEditor(cp.key)
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          >
                            <span>Open & Edit</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCadSoftware(cp.key, cp.label)}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            title={`Delete ${cp.label}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ) : null

  // Dedicated Modal for Adding & Deleting 3D Printers (Completely Separate from CAD Softwares)
  const renderPrinterModal = () =>
    showNewPrinterModal ? (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                {printerModalTab === 'create' ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Trash2 className="w-5 h-5 text-rose-400" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-base text-white">
                    {printerModalTab === 'create' ? 'Add New 3D Printer' : 'Manage & Delete 3D Printers'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono font-bold">
                    Pratham & EKA Formats
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-0.5">
                  {printerModalTab === 'create'
                    ? 'Create a new dedicated 3D Printer page formatted like Pratham Mini, Pratham 3.0, EKA DLP, or EKA Industrial LCD.'
                    : 'Review, edit, or delete 3D Printer & Filament pages from your website and catalog.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNewPrinterModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs (Add New 3D Printer vs Manage & Delete) */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-2">
            <button
              type="button"
              onClick={() => setPrinterModalTab('create')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                printerModalTab === 'create'
                  ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New 3D Printer</span>
            </button>
            <button
              type="button"
              onClick={() => setPrinterModalTab('manage')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                printerModalTab === 'manage'
                  ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Manage & Delete 3D Printers ({allPrinterCatalogItems.length})</span>
            </button>
          </div>

          {/* TAB 1: CREATE NEW 3D PRINTER */}
          {printerModalTab === 'create' && (
            <form onSubmit={handleCreateNewPrinter} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              {/* 3D Printer Template / Format Selector */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-emerald-950 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Choose 3D Printer Page Format & Template Layout</span>
                </label>
                <select
                  value={newPrinterForm.template}
                  onChange={e => {
                    const tpl = e.target.value
                    const autoCat =
                      tpl.startsWith('eka_gt') || tpl.startsWith('eka_f1')
                        ? 'Industrial LCD 3D Printers'
                        : tpl.startsWith('eka_')
                          ? 'DLP 3D Printers'
                          : tpl.startsWith('filament_')
                            ? 'Filaments & Materials'
                            : 'FDM 3D Printers'
                    const autoBrand = tpl.startsWith('eka_') ? 'EKA' : 'Make3D'
                    const autoVol =
                      tpl === 'pratham_mini'
                        ? '170 × 170 × 170 mm'
                        : tpl === 'pratham_desktop'
                          ? '200 × 200 × 250 mm'
                          : tpl === 'pratham_3'
                            ? '300 × 300 × 300 mm'
                            : tpl === 'pratham_3_rapid'
                              ? '350 × 350 × 350 mm'
                              : tpl === 'pratham_5'
                                ? '500 × 500 × 500 mm'
                                : tpl === 'pratham_6' || tpl === 'pratham_x_600'
                                  ? '600 × 600 × 600 mm'
                                  : tpl === 'pratham_x'
                                    ? '1000 × 1000 × 1000 mm'
                                    : tpl === 'eka_ht'
                                      ? '130 × 73 × 150 mm'
                                      : newPrinterForm.buildVolume
                    setNewPrinterForm({
                      ...newPrinterForm,
                      template: tpl,
                      category: autoCat,
                      brand: autoBrand,
                      buildVolume: autoVol,
                    })
                  }}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-slate-900 font-bold bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                >
                  <optgroup label="★ FDM 3D Printer Formats (Make3D Pratham Series)">
                    <option value="pratham_mini">
                      ★ Format like Pratham Mini (Compact Enclosed FDM — Hero, 3-Spec Strip, Education/Lab Section, 4-Tab Specs Table, Print Gallery & FAQ) [Recommended]
                    </option>
                    <option value="pratham_desktop">
                      Format like Pratham Desktop (Desktop Studio FDM — 200×200×250 mm Layout, Specs & Applications)
                    </option>
                    <option value="pratham_3">
                      Format like Pratham 3.0 (Industrial Workhorse FDM — 300×300×300 mm, Industrial Features, Specs Matrix & RFQ)
                    </option>
                    <option value="pratham_3_rapid">
                      Format like Pratham 3.0 Rapid (High-Speed 500 mm/s CoreXY Industrial FDM Layout)
                    </option>
                    <option value="pratham_5">
                      Format like Pratham 5.0 (Large-Format Heated Chamber Industrial FDM — 500×500×500 mm Layout)
                    </option>
                    <option value="pratham_6">
                      Format like Pratham 6.0 (Closed-Loop Servo Industrial FDM — 600×600×600 mm Layout)
                    </option>
                    <option value="pratham_x_600">
                      Format like Pratham X 600 (Jumbo Industrial Production FDM Layout)
                    </option>
                    <option value="pratham_x">
                      Format like Pratham X 1000 (Giant 1 m³ Industrial FDM — 1000×1000×1000 mm Layout)
                    </option>
                  </optgroup>
                  <optgroup label="💎 DLP 3D Printer Formats (EKA Jewelry & Casting Series)">
                    <option value="eka_ht">
                      Format like EKA HT (Heated-Tray Jewelry DLP 3D Printer Layout, Wax Casting Specs & Gallery)
                    </option>
                    <option value="eka_xl">
                      Format like EKA XL (Large-Platform Jewelry DLP 3D Printer Layout)
                    </option>
                    <option value="eka_xle">
                      Format like EKA XLE (Extended Production Jewelry DLP 3D Printer Layout)
                    </option>
                  </optgroup>
                  <optgroup label="🔬 Industrial LCD 3D Printer Formats (EKA LCD Series)">
                    <option value="eka_gt_max">
                      Format like EKA GT Max (Industrial Large-Format LCD Resin 3D Printer Layout)
                    </option>
                    <option value="eka_f1_16k">
                      Format like EKA F1 16K (16K Ultra-HD Industrial LCD Jewelry 3D Printer Layout)
                    </option>
                  </optgroup>
                  <optgroup label="🧵 3D Filament & Material Format">
                    <option value="filament_white_pla">
                      Format like PLA / PLA+ 3D Printer Filament (Material Spool, Print Temp Specs & Applications Layout)
                    </option>
                  </optgroup>
                </select>
                <p className="text-[11px] text-emerald-800 mt-1.5 leading-relaxed">
                  ✓ <strong>Full 3D Printer Format Selected:</strong> Your new 3D printer page will automatically include the complete Hero section, Build Volume & Technology cards, Key Features, Multi-Tab Technical Specifications table, Print Gallery, PDF Brochure button, FAQ, and Instant Quote modal!
                </p>
              </div>

              {/* 3D Printer Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  3D Printer Model Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pratham Pro 400, Pratham Ultra X, EKA Pro DLP, Bambu Lab X1E"
                  value={newPrinterForm.name}
                  onChange={e => {
                    const name = e.target.value
                    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                    setNewPrinterForm({
                      ...newPrinterForm,
                      name,
                      route: autoSlug ? `/products/${autoSlug}` : '/products/',
                      headline:
                        newPrinterForm.headline ||
                        (name ? `${name} — Precision Industrial 3D Printer` : ''),
                    })
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              {/* Grid: Brand, Category & Build Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand / Manufacturer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Make3D / EKA / Leniva 3D"
                    value={newPrinterForm.brand}
                    onChange={e => setNewPrinterForm({ ...newPrinterForm, brand: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    3D Printer Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newPrinterForm.category}
                    onChange={e => setNewPrinterForm({ ...newPrinterForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-xs font-medium"
                  >
                    <option value="FDM 3D Printers">FDM 3D Printers</option>
                    <option value="DLP 3D Printers">DLP 3D Printers</option>
                    <option value="Industrial LCD 3D Printers">Industrial LCD 3D Printers</option>
                    <option value="Filaments & Materials">Filaments & Materials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Build Volume / Spec
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 300 × 300 × 300 mm"
                    value={newPrinterForm.buildVolume}
                    onChange={e => setNewPrinterForm({ ...newPrinterForm, buildVolume: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                  />
                </div>
              </div>

              {/* Public URL Route */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Public Website Page URL <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-500 font-mono text-[11px]">
                    https://www.leniva3d.com/products/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="printer-model-slug"
                    value={newPrinterForm.route.replace(/^\/products\/?/, '')}
                    onChange={e => {
                      const clean = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      setNewPrinterForm({ ...newPrinterForm, route: `/products/${clean}` })
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-r-xl text-slate-900 font-mono text-[11px] focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Accessible directly at this URL on your live website after publishing.
                </span>
              </div>

              {/* Tagline / Headline */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Page Hero Headline / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Industrial Power for High-Speed Functional Prototyping & Production"
                  value={newPrinterForm.headline}
                  onChange={e => setNewPrinterForm({ ...newPrinterForm, headline: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Engineered for industrial manufacturing, R&D labs, and continuous production with micron-level accuracy and nationwide Leniva technical support."
                  value={newPrinterForm.shortDescription}
                  onChange={e => setNewPrinterForm({ ...newPrinterForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none text-xs resize-none"
                />
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  Template: <strong>{VISUAL_PAGE_CATALOG.find(p => p.key === newPrinterForm.template)?.label || 'Pratham Mini'} Format</strong>
                </span>

                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setShowNewPrinterModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1.5 text-xs hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Create 3D Printer & Open in Visual Editor &rarr;</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE & DELETE 3D PRINTERS */}
          {printerModalTab === 'manage' && (
            <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  All Active 3D Printers & Filaments on Website ({allPrinterCatalogItems.length})
                </span>
                <div className="flex items-center gap-2">
                  {deletedPrinterKeys.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRestoreDeletedPrinters}
                      className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore Deleted Defaults ({deletedPrinterKeys.length})</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setPrinterModalTab('create')}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Create New 3D Printer</span>
                  </button>
                </div>
              </div>

              {allPrinterCatalogItems.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-bold text-slate-600">No 3D printers currently active.</p>
                  <p className="text-xs">Click the "+ Add New 3D Printer" tab above to create one formatted like Pratham Mini, Pratham 3.0, or EKA DLP.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {allPrinterCatalogItems.map(pp => {
                    const isCustomPrinter = pp.key.startsWith('printer_')
                    return (
                      <div
                        key={pp.key}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-sm text-slate-900 truncate">
                              {pp.label}
                            </h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {pp.brand || 'Make3D'}
                            </span>
                            {isCustomPrinter ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                                ★ Custom 3D Printer
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700">
                                Standard 3D Printer Page
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 truncate">
                            {pp.category} • <span className="font-mono text-[11px] text-blue-600">{pp.route}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewPrinterModal(false)
                              loadProductIntoEditor(pp.key)
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          >
                            <span>Open & Edit</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePrinter(pp.key, pp.label)}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                            title={`Delete ${pp.label}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ) : null

  // Dedicated Modal for Adding & Deleting 3D Scanners (Completely Separate from CAD & Printers)
  const renderScannerModal = () =>
    showNewScannerModal ? (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
        <div className="bg-white rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-xs">
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                {scannerModalTab === 'create' ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Trash2 className="w-5 h-5 text-rose-400" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-extrabold text-base text-white">
                    {scannerModalTab === 'create' ? 'Add New 3D Scanner' : 'Manage & Delete 3D Scanners'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[10px] font-mono font-bold">
                    Devok & EinScan Formats
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-0.5">
                  {scannerModalTab === 'create'
                    ? 'Create a new dedicated 3D Scanner page formatted like Devok MT, Devok MQ, or EinScan series.'
                    : 'Review, edit, or delete 3D Scanner pages from your website and product catalog.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNewScannerModal(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 pt-2">
            <button
              type="button"
              onClick={() => setScannerModalTab('create')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                scannerModalTab === 'create'
                  ? 'border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New 3D Scanner</span>
            </button>
            <button
              type="button"
              onClick={() => setScannerModalTab('manage')}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                scannerModalTab === 'manage'
                  ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Manage & Delete 3D Scanners ({allScannerCatalogItems.length})</span>
            </button>
          </div>

          {/* TAB 1: CREATE NEW 3D SCANNER */}
          {scannerModalTab === 'create' && (
            <form onSubmit={handleCreateNewScanner} className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              {/* Template / Format Selector */}
              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl">
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-purple-950 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Choose 3D Scanner Page Format & Template Layout</span>
                </label>
                <select
                  value={newScannerForm.template}
                  onChange={e => setNewScannerForm({ ...newScannerForm, template: e.target.value })}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg text-slate-900 font-bold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                >
                  <optgroup label="📷 Devok Series (Shining3D)">
                    <option value="devok_mt">Devok MT — Mid-range 3D Scanner (Shining3D)</option>
                    <option value="devok_mq">Devok MQ — High-precision 3D Scanner (Shining3D)</option>
                  </optgroup>
                  <optgroup label="🔬 EinScan Series (Shining3D)">
                    <option value="einscan_series">EinScan Series — Professional 3D Scanners (Shining3D)</option>
                  </optgroup>
                  <optgroup label="📂 Scanner Category Page">
                    <option value="scanners_category">3D Scanners Category Overview Page</option>
                  </optgroup>
                </select>
                <p className="text-purple-700 text-[10px] font-semibold mt-1.5">
                  ✓ <span className="font-bold">Devok / EinScan Format Selected:</span> Your scanner page will follow the professional layout with spec table, accuracy chart, and inquiry form.
                </p>
              </div>

              {/* Scanner Name */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  3D Scanner Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newScannerForm.name}
                  onChange={e => {
                    const val = e.target.value
                    const slug = val
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-|-$/g, '')
                    setNewScannerForm({
                      ...newScannerForm,
                      name: val,
                      route: `/products/${slug}`,
                    })
                  }}
                  placeholder="e.g. Devok MT Pro, EinScan H2, Revopoint RANGE 2"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs placeholder-slate-400"
                />
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Brand / Manufacturer <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newScannerForm.brand}
                    onChange={e => setNewScannerForm({ ...newScannerForm, brand: e.target.value })}
                    placeholder="e.g. Shining3D, Revopoint"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Scanner Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newScannerForm.category}
                    onChange={e => setNewScannerForm({ ...newScannerForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                  >
                    <option value="3D Scanners">3D Scanners</option>
                    <option value="Handheld 3D Scanners">Handheld 3D Scanners</option>
                    <option value="Industrial 3D Scanners">Industrial 3D Scanners</option>
                    <option value="Desktop 3D Scanners">Desktop 3D Scanners</option>
                    <option value="Structured Light Scanners">Structured Light Scanners</option>
                  </select>
                </div>
              </div>

              {/* Scan Accuracy & URL */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Scan Accuracy
                  </label>
                  <input
                    type="text"
                    value={newScannerForm.scanAccuracy}
                    onChange={e => setNewScannerForm({ ...newScannerForm, scanAccuracy: e.target.value })}
                    placeholder="e.g. 0.05 mm"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Public Website Page URL <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="px-2.5 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-500 text-[10px] font-mono whitespace-nowrap">
                      leniva3d.com
                    </span>
                    <input
                      type="text"
                      required
                      value={newScannerForm.route}
                      onChange={e => setNewScannerForm({ ...newScannerForm, route: e.target.value })}
                      placeholder="/products/scanner-name-slug"
                      className="flex-1 px-3 py-2.5 border border-slate-300 rounded-r-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Page Hero Headline / Tagline
                </label>
                <input
                  type="text"
                  value={newScannerForm.headline}
                  onChange={e => setNewScannerForm({ ...newScannerForm, headline: e.target.value })}
                  placeholder="e.g. Precision 3D Scanning for Reverse Engineering & Quality Control"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  value={newScannerForm.shortDescription}
                  onChange={e => setNewScannerForm({ ...newScannerForm, shortDescription: e.target.value })}
                  placeholder="Brief description of this 3D scanner for the product listing..."
                  rows={3}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-semibold bg-white focus:ring-2 focus:ring-purple-500 outline-none text-xs resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewScannerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Create 3D Scanner Page
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE & DELETE 3D SCANNERS */}
          {scannerModalTab === 'manage' && (
            <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  All Active 3D Scanners on Website ({allScannerCatalogItems.length})
                </h4>
                <button
                  type="button"
                  onClick={handleRestoreDeletedScanners}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>↺ Restore Deleted</span>
                </button>
              </div>
              <div className="space-y-2">
                {allScannerCatalogItems.length === 0 && (
                  <p className="text-sm font-bold text-slate-600">No 3D scanners currently active.</p>
                )}
                {allScannerCatalogItems.map(sc => (
                  <div key={sc.key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">{sc.label}</div>
                      <div className="text-[11px] text-slate-500 truncate">{sc.brand} · {sc.category}</div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">{sc.route}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => { setShowNewScannerModal(false); loadProductIntoEditor(sc.key) }}
                        className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold border border-purple-200 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteScanner(sc.key, sc.label)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold border border-rose-200 cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewScannerModal(false)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    ) : null

  // ============================================================================
  // VIEW 1: PRODUCT SELECTION DASHBOARD (Supports CAD Software, 3D Printers & 3D Scanners)
  // ============================================================================
  if (viewMode === 'list') {
    const isPrintersListContext = categoryFilter === 'printers'
    const isScannersListContext = categoryFilter === 'scanners'
    return (
      <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {onExitToDashboard && (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onExitToDashboard}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Admin Dashboard</span>
              </button>
              <button
                onClick={() => setViewMode('editor')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Return to Active Page ({activeProductMeta.label})</span>
              </button>
            </div>
          )}

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-wider font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Page-Wise Live Visual Editor</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {categoryHeaderTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Open any CAD Software, 3D Printer (FDM, DLP, Industrial LCD), 3D Scanner, or Filament page at 100% full width exactly as it appears on the live website. Click any heading, text, specification table cell, button, image, or PDF brochure to edit directly on the page, save drafts, and publish live to Vercel.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {isPrintersListContext ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setPrinterModalTab('create')
                        setShowNewPrinterModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add New 3D Printer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPrinterModalTab('manage')
                        setShowNewPrinterModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Delete 3D Printer</span>
                    </button>
                  </>
                ) : isScannersListContext ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setScannerModalTab('create')
                        setShowNewScannerModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add New 3D Scanner</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setScannerModalTab('manage')
                        setShowNewScannerModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Delete 3D Scanner</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setCadModalTab('create')
                        setShowNewCadModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add New CAD Software</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCadModalTab('manage')
                        setShowNewCadModal(true)
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Trash2 className="w-4 h-4 stroke-[2.5]" />
                      <span>Delete CAD Software</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowAuditModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Page Audit Info</span>
                </button>
                <button
                  onClick={() => loadProductIntoEditor(activeProductKey)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Edit {activeProductMeta.label} Full Page</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills + Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setCategoryFilter('cad')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  categoryFilter === 'cad'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                CAD Software Pages ({categoryCounts.cad})
              </button>
              <button
                onClick={() => setCategoryFilter('printers')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  categoryFilter === 'printers'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                3D Printers & Filaments ({categoryCounts.printers})
              </button>
              <button
                onClick={() => setCategoryFilter('scanners')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  categoryFilter === 'scanners'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                3D Scanners ({categoryCounts.scanners})
              </button>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All Product Pages ({categoryCounts.all})
              </button>
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search any CAD, 3D printer, or scanner page..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* All Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(prod => {
              const info = getWorkingVisualPayload(prod.key)
              const groupBadgeColor =
                prod.editorGroup === 'printers'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : prod.editorGroup === 'scanners'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
              const groupLabel =
                prod.editorGroup === 'printers'
                  ? '3D Printer / Filament'
                  : prod.editorGroup === 'scanners'
                    ? '3D Scanner'
                    : 'CAD Software'

              return (
                <div
                  key={prod.key}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:shadow-md hover:border-blue-400 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                          {prod.brand}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${groupBadgeColor}`}>
                          {groupLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {info.hasDraft && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                            Draft
                          </span>
                        )}
                        {info.isPublished ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                            Published
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                            Live Default
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 pt-1">
                      {prod.heroImage && (
                        <div className="w-16 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={prod.heroImage}
                            alt={prod.label}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="text-base font-extrabold text-slate-900 truncate">{prod.label}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{prod.category}</p>
                        <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">{prod.route}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <a
                      href={prod.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Live Page</span>
                    </a>
                    <div className="flex items-center gap-1.5">
                      {(prod.editorGroup === 'cad' || prod.key.startsWith('cad_')) && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCadSoftware(prod.key, prod.label)}
                          className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-rose-200"
                          title={`Delete ${prod.label}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      )}
                      {(prod.editorGroup === 'printers' || prod.key.startsWith('printer_')) && (
                        <button
                          type="button"
                          onClick={() => handleDeletePrinter(prod.key, prod.label)}
                          className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-rose-200"
                          title={`Delete ${prod.label}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      )}
                      {(prod.editorGroup === 'scanners' || prod.key.startsWith('scanner_')) && (
                        <button
                          type="button"
                          onClick={() => handleDeleteScanner(prod.key, prod.label)}
                          className="px-2.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors border border-rose-200"
                          title={`Delete ${prod.label}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          loadProductIntoEditor(prod.key)
                          setShowSectionVisibilityModal(true)
                        }}
                        className="px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-indigo-200"
                        title={`Enable or disable sections for ${prod.label}`}
                      >
                        <Power className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Sections (ON/OFF)</span>
                      </button>
                      <button
                        onClick={() => loadProductIntoEditor(prod.key)}
                        className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                      >
                        <span>Edit Page</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 20-Section Coverage Audit Modal */}
          {showAuditModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">
                      Complete Live Visual Page Editor — All 38 Pages Connected
                    </h3>
                    <p className="text-xs text-slate-400">
                      14 CAD Software Pages • 20 3D Printer & Filament Pages • 4 3D Scanner Pages
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAuditModal(false)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-3">
                      All Connected Pages ({fullVisualCatalog.length} Live Frontend Pages)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {fullVisualCatalog.map(item => (
                        <div key={item.key} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate">{item.label} ({item.brand})</div>
                              <div className="text-[11px] text-slate-500 truncate">{item.route}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setShowAuditModal(false)
                              loadProductIntoEditor(item.key)
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    onClick={() => setShowAuditModal(false)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {renderCadModal()}
          {renderPrinterModal()}
          {renderScannerModal()}
        </div>
      </div>
    )
  }

  // ============================================================================
  // VIEW 2: FULL-SCREEN 100% WIDTH LIVE VISUAL PAGE EDITOR
  // Renders fixed inset-0 w-screen h-screen so the product page inside Admin
  // has the EXACT same full viewport width and layout as the public frontend!
  // ============================================================================
  const orderedSections = (
    Array.isArray(payload.sectionOrder) && payload.sectionOrder.length > 0
      ? payload.sectionOrder
      : activeSectionsBase.map(s => s.id)
  )
    .map(id => activeSectionsBase.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  for (const sec of activeSectionsBase) {
    if (!orderedSections.some(s => s.id === sec.id)) {
      orderedSections.push(sec)
    }
  }

  const revisions = getVisualRevisions(activeProductKey)
  const isPrinterActive =
    activeProductMeta.editorGroup === 'printers' ||
    activeProductMeta.key.startsWith('printer_') ||
    categoryFilter === 'printers'
  const isScannerActive =
    activeProductMeta.editorGroup === 'scanners' ||
    activeProductMeta.key.startsWith('scanner_') ||
    categoryFilter === 'scanners'

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white flex flex-col overflow-hidden">
      {/* ====================================================================
          STICKY TOP VISUAL EDITOR BAR (Compact, Full-Width)
          Back to Admin | All Pages | Category Filter | Page Select | Sections/Images/PDFs/SEO | Viewport | Undo/Redo | Save Draft | Preview | Publish
         ==================================================================== */}
      <div className="bg-slate-950 border-b border-slate-800 px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-white z-40 shrink-0">
        {/* Left: Back to Admin + All Pages + Category Filter + Page Switcher + Status */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {onExitToDashboard && (
            <button
              onClick={() => {
                if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Exit visual editor without saving?')) {
                  return
                }
                onExitToDashboard()
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={() => {
              if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Open product list without saving?')) {
                return
              }
              setCategoryFilter('all')
              setViewMode('list')
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">All Pages ({categoryCounts.all})</span>
          </button>

          {/* Category Filter Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => {
              const nextCat = e.target.value as VisualEditorCategory
              setCategoryFilter(nextCat)
              const firstInCat = fullVisualCatalog.find(
                p => nextCat === 'all' || p.editorGroup === nextCat
              )
              if (firstInCat && firstInCat.key !== activeProductKey) {
                if (!hasUnsavedChanges || window.confirm('Switch category without saving current changes?')) {
                  loadProductIntoEditor(firstInCat.key)
                }
              }
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-blue-300 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories ({categoryCounts.all})</option>
            <option value="cad">CAD Software ({categoryCounts.cad})</option>
            <option value="printers">3D Printers & Filaments ({categoryCounts.printers})</option>
            <option value="scanners">3D Scanners ({categoryCounts.scanners})</option>
          </select>

          {/* Page Selector Dropdown — Grouped by Category so ALL pages are always visible */}
          <select
            value={activeProductKey}
            onChange={e => {
              if (e.target.value === '__ADD_NEW_CAD__') {
                setCadModalTab('create')
                setShowNewCadModal(true)
                return
              }
              if (e.target.value === '__MANAGE_CAD__') {
                setCadModalTab('manage')
                setShowNewCadModal(true)
                return
              }
              if (e.target.value === '__ADD_NEW_PRINTER__') {
                setPrinterModalTab('create')
                setShowNewPrinterModal(true)
                return
              }
              if (e.target.value === '__MANAGE_PRINTERS__') {
                setPrinterModalTab('manage')
                setShowNewPrinterModal(true)
                return
              }
              if (e.target.value === '__ADD_NEW_SCANNER__') {
                setScannerModalTab('create')
                setShowNewScannerModal(true)
                return
              }
              if (e.target.value === '__MANAGE_SCANNERS__') {
                setScannerModalTab('manage')
                setShowNewScannerModal(true)
                return
              }
              if (hasUnsavedChanges && !window.confirm('Switch page without saving current changes?')) {
                return
              }
              loadProductIntoEditor(e.target.value)
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold max-w-[240px] sm:max-w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <optgroup label="✨ Quick Action">
              <option value="__ADD_NEW_PRINTER__" className="text-emerald-400 font-bold bg-slate-900">
                + Add New 3D Printer (Pratham / EKA Format)...
              </option>
              <option value="__MANAGE_PRINTERS__" className="text-rose-400 font-bold bg-slate-900">
                🗑️ Manage & Delete 3D Printers ({allPrinterCatalogItems.length})...
              </option>
              <option value="__ADD_NEW_SCANNER__" className="text-purple-400 font-bold bg-slate-900">
                + Add New 3D Scanner (Devok / EinScan Format)...
              </option>
              <option value="__MANAGE_SCANNERS__" className="text-rose-400 font-bold bg-slate-900">
                🗑️ Manage & Delete 3D Scanners ({allScannerCatalogItems.length})...
              </option>
              <option value="__ADD_NEW_CAD__" className="text-emerald-400 font-bold bg-slate-900">
                + Add New CAD Software (ARES Format)...
              </option>
              <option value="__MANAGE_CAD__" className="text-rose-400 font-bold bg-slate-900">
                🗑️ Manage & Delete CAD Softwares ({allCadCatalogItems.length})...
              </option>
            </optgroup>
            {(categoryFilter === 'all' || categoryFilter === 'cad') && (
              <optgroup label={`💻 CAD Software Pages (${categoryCounts.cad})`}>
                {fullVisualCatalog.filter(p => p.editorGroup === 'cad').map(p => (
                  <option key={p.key} value={p.key}>
                    {p.label} ({p.brand}) {p.key.startsWith('cad_') ? '★ [Custom]' : ''}
                  </option>
                ))}
              </optgroup>
            )}
            {(categoryFilter === 'all' || categoryFilter === 'printers') && (
              <optgroup label={`🖨️ 3D Printers & Filaments (${categoryCounts.printers})`}>
                {fullVisualCatalog.filter(p => p.editorGroup === 'printers').map(p => (
                  <option key={p.key} value={p.key}>
                    {p.label} ({p.brand}) {p.key.startsWith('printer_') ? '★ [Custom]' : ''}
                  </option>
                ))}
              </optgroup>
            )}
            {(categoryFilter === 'all' || categoryFilter === 'scanners') && (
              <optgroup label={`📷 3D Scanners (${categoryCounts.scanners})`}>
                {fullVisualCatalog.filter(p => p.editorGroup === 'scanners').map(p => (
                  <option key={p.key} value={p.key}>
                    {p.label} ({p.brand}) {p.key.startsWith('scanner_') ? '★ [Custom]' : ''}
                  </option>
                ))}
              </optgroup>
            )}
            {categoryFilter !== 'all' && (
              <optgroup label="── Other Categories ──">
                {fullVisualCatalog.filter(p => p.editorGroup !== categoryFilter).map(p => (
                  <option key={p.key} value={p.key}>
                    [{p.editorGroup === 'cad' ? 'CAD' : p.editorGroup === 'printers' ? '3D Printer' : 'Scanner'}] {p.label}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          {isPrinterActive ? (
            <>
              {/* Prominent "+ Add 3D Printer" button in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setPrinterModalTab('create')
                  setShowNewPrinterModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                title="Add a new 3D Printer page formatted like Pratham Mini, Pratham 3.0, or EKA DLP"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add 3D Printer</span>
              </button>

              {/* Prominent "Delete 3D Printer" button in the top toolbar */}
              <button
                type="button"
                onClick={() => handleDeletePrinter(activeProductMeta.key, activeProductMeta.label)}
                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                title={`Delete ${activeProductMeta.label}`}
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Delete 3D Printer</span>
              </button>

              {/* Manage / Delete All 3D Printers button in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setPrinterModalTab('manage')
                  setShowNewPrinterModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-rose-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0"
                title="Open list of all 3D Printers to manage or delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Manage / Delete Printers ({allPrinterCatalogItems.length})</span>
              </button>
            </>
          ) : isScannerActive ? (
            <>
              {/* Prominent "+ Add 3D Scanner" button in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setScannerModalTab('create')
                  setShowNewScannerModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                title="Add a new 3D Scanner page formatted like Devok MT, Devok MQ, or EinScan"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add 3D Scanner</span>
              </button>

              {/* Prominent "Delete 3D Scanner" button in the top toolbar */}
              <button
                type="button"
                onClick={() => handleDeleteScanner(activeProductMeta.key, activeProductMeta.label)}
                className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                title={`Delete ${activeProductMeta.label}`}
              >
                <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Delete 3D Scanner</span>
              </button>

              {/* Manage / Delete All 3D Scanners button in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setScannerModalTab('manage')
                  setShowNewScannerModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-rose-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0"
                title="Open list of all 3D Scanners to manage or delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Manage / Delete Scanners ({allScannerCatalogItems.length})</span>
              </button>
            </>
          ) : (
            <>
              {/* Prominent "+ Add CAD Software" button right in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setCadModalTab('create')
                  setShowNewCadModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                title="Add a new CAD software page formatted like ARES Standard"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add CAD Software</span>
              </button>

              {/* Prominent "Delete CAD Software" button — ALWAYS visible in the top toolbar */}
              {(activeProductMeta.editorGroup === 'cad' || activeProductMeta.key.startsWith('cad_')) && (
                <button
                  type="button"
                  onClick={() => handleDeleteCadSoftware(activeProductMeta.key, activeProductMeta.label)}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                  title={`Delete ${activeProductMeta.label}`}
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Delete Software</span>
                </button>
              )}

              {/* Manage / Delete All CAD Softwares button — ALWAYS visible in the top toolbar */}
              <button
                type="button"
                onClick={() => {
                  setCadModalTab('manage')
                  setShowNewCadModal(true)
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-rose-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all shrink-0"
                title="Open list of all CAD softwares to manage or delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Manage / Delete CAD ({allCadCatalogItems.length})</span>
              </button>
            </>
          )}

          {hasUnsavedChanges ? (
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Unsaved</span>
            </span>
          ) : statusMeta.hasDraft ? (
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[11px] font-mono font-bold">
              <span>Draft Saved</span>
            </span>
          ) : (
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Live</span>
            </span>
          )}
        </div>

        {/* Center: Quick Drawer Toggles (Sections | Images | PDFs | SEO) + Viewport + Undo/Redo */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Prominent Enable / Disable Sections Control */}
          <button
            onClick={() => setShowSectionVisibilityModal(true)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all border border-indigo-400/40"
            title="Manage which sections are visible or disabled on this page"
          >
            <Power className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Sections ON/OFF</span>
            <span className="sm:hidden">Sections</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-900/80 text-[10px] font-mono text-indigo-100 font-bold border border-indigo-700">
              {orderedSections.filter(s => !payload.hiddenSections?.[s.id]).length}/{orderedSections.length}
            </span>
          </button>

          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 gap-0.5">
            <button
              onClick={() => {
                if (inspectorOpen && inspectorTab === 'sections') {
                  setInspectorOpen(false)
                } else {
                  setInspectorTab('sections')
                  setInspectorOpen(true)
                }
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                inspectorOpen && inspectorTab === 'sections'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sections</span>
            </button>

            <button
              onClick={() => {
                if (inspectorOpen && inspectorTab === 'images') {
                  setInspectorOpen(false)
                } else {
                  setInspectorTab('images')
                  setInspectorOpen(true)
                }
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                inspectorOpen && inspectorTab === 'images'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images</span>
            </button>

            <label
              title="Directly upload or replace the Hero / Selected Product Image"
              className="px-2.5 py-1 rounded-md bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  e.target.value = ''
                  const heroSlot =
                    activeImageSlotsBase.find(s => s.dataPath === 'hero.image' || s.id === 'hero.image') ||
                    activeImageSlotsBase.find(s => !(s.defaultSrc || '').includes('/images/brands/')) ||
                    activeImageSlotsBase[0]
                  const targetKey =
                    selectedElement?.kind === 'image'
                      ? selectedElement.key
                      : heroSlot?.dataPath || heroSlot?.id || 'hero.image'
                  const targetDataPath =
                    selectedElement?.kind === 'image'
                      ? selectedElement.dataPath || (selectedElement.key === 'hero.image' ? 'hero.image' : undefined)
                      : heroSlot?.dataPath || 'hero.image'
                  handleImageFileUpload(file, {
                    dataPath: targetDataPath,
                    elementKey: targetKey,
                    defaultSrc: heroSlot?.defaultSrc,
                  })
                }}
              />
            </label>

            <button
              onClick={() => {
                if (inspectorOpen && inspectorTab === 'pdfs') {
                  setInspectorOpen(false)
                } else {
                  setInspectorTab('pdfs')
                  setInspectorOpen(true)
                }
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                inspectorOpen && inspectorTab === 'pdfs'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDFs</span>
            </button>

            <label
              title="Directly upload or replace the Product Brochure PDF"
              className="px-2.5 py-1 rounded-md bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Brochure</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  e.target.value = ''
                  const firstPdfId = payload.pdfResources?.[0]?.id || `${activeProductKey}-brochure`
                  handlePdfFileUpload(file, firstPdfId)
                }}
              />
            </label>

            <button
              onClick={() => {
                if (inspectorOpen && inspectorTab === 'seo') {
                  setInspectorOpen(false)
                } else {
                  setInspectorTab('seo')
                  setInspectorOpen(true)
                }
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                inspectorOpen && inspectorTab === 'seo'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden md:inline">SEO & History</span>
            </button>
          </div>

          {/* Viewport Switcher */}
          <div className="hidden md:flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewport('desktop')}
              title="Full Desktop View (100%)"
              className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                viewport === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet View"
              className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                viewport === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile View"
              className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                viewport === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
              className="px-2 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              title="Redo (Ctrl+Y)"
              className="px-2 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Save Draft | Preview | Publish Changes | Live Link */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => {
              setIsPreviewMode(prev => {
                const next = !prev
                if (next) setInspectorOpen(false)
                return next
              })
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border ${
              isPreviewMode
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>

          <button
            onClick={handlePublishChanges}
            disabled={isPublishing}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Changes'}</span>
          </button>

          <a
            href={activeProductMeta.route}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open live ${activeProductMeta.route} in new tab`}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toast && (
        <div
          className={`px-4 py-2 text-xs font-bold flex items-center justify-between gap-3 z-40 shrink-0 ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-white/80 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Progress Bar */}
      {uploadState?.active && (
        <div className="bg-blue-950 border-b border-blue-800 px-4 py-2 text-xs text-blue-200 flex items-center gap-3 z-40 shrink-0">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400 shrink-0" />
          <span className="font-bold">{uploadState.statusText}</span>
          <div className="flex-1 max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
          <span className="font-mono text-[11px]">{uploadState.progress}%</span>
        </div>
      )}

      {/* ====================================================================
          FULL-WIDTH 100% LIVE PRODUCT PAGE CANVAS
          Never squeezed by sidebars — renders edge-to-edge same-to-same as live website!
         ==================================================================== */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden bg-white relative">
        <div
          style={{
            width: '100%',
            maxWidth:
              viewport === 'mobile'
                ? '430px'
                : viewport === 'tablet'
                  ? '820px'
                  : '100%',
            margin: viewport === 'desktop' ? '0' : '0 auto',
          }}
          className="w-full min-h-full bg-white"
        >
          {/* Visual Editor CSS Hover Highlights when not in preview mode */}
          {!isPreviewMode && (
            <style>{`
              [data-cad-editor-canvas] [data-cad-path]:hover,
              [data-cad-editor-canvas] img:hover,
              [data-cad-editor-canvas] a:hover,
              [data-cad-editor-canvas] h1:hover,
              [data-cad-editor-canvas] h2:hover,
              [data-cad-editor-canvas] h3:hover,
              [data-cad-editor-canvas] p:hover,
              [data-cad-editor-canvas] td:hover {
                outline: 2px dashed #2563eb !important;
                outline-offset: 2px !important;
                cursor: pointer !important;
              }
            `}</style>
          )}

          <CadVisualEditorContext.Provider
            value={{
              isEditorMode: true,
              isPreviewMode,
              productKey: activeProductKey,
              payload,
              selectedElementKey: selectedElement?.key || null,
              selectedSectionId: expandedSectionId,
            }}
          >
            <div
              key={activeProductKey}
              ref={canvasRef}
              data-cad-editor-canvas="true"
              data-preview-mode={isPreviewMode ? 'true' : 'false'}
              onClickCapture={handleCanvasClickCapture}
              className="w-full"
            >
              {renderRealProductPage(activeProductKey)}
            </div>
          </CadVisualEditorContext.Provider>
        </div>

        {/* ==================================================================
            FLOATING SLIDE-OVER INSPECTOR DRAWER (Does NOT squeeze the page!)
            Opens when clicking any element on the page or clicking Sections / Images / PDFs / SEO
           ================================================================== */}
        {inspectorOpen && !isPreviewMode && (
          <div className="fixed top-14 right-3 bottom-3 w-[94vw] sm:w-[420px] bg-white rounded-2xl border border-slate-300 flex flex-col shadow-2xl z-50 overflow-hidden">
            {/* Drawer Header */}
            <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-extrabold tracking-wide">
                  Live Page Inspector ({activeProductMeta.label})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectorOpen(false)}
                  title="Close Inspector Drawer"
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="grid grid-cols-5 border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 shrink-0">
              <button
                onClick={() => setInspectorTab('element')}
                className={`py-2 px-1 flex flex-col items-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  inspectorTab === 'element'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Element</span>
              </button>
              <button
                onClick={() => setInspectorTab('sections')}
                className={`py-2 px-1 flex flex-col items-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  inspectorTab === 'sections'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Sections</span>
              </button>
              <button
                onClick={() => setInspectorTab('images')}
                className={`py-2 px-1 flex flex-col items-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  inspectorTab === 'images'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Images</span>
              </button>
              <button
                onClick={() => setInspectorTab('pdfs')}
                className={`py-2 px-1 flex flex-col items-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  inspectorTab === 'pdfs'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDFs</span>
              </button>
              <button
                onClick={() => setInspectorTab('seo')}
                className={`py-2 px-1 flex flex-col items-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  inspectorTab === 'seo'
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>SEO/Rev</span>
              </button>
            </div>

            {/* Inspector Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              {/* ==============================================================
                  TAB 1: SELECTED ELEMENT INSPECTOR (TEXT / LINK / IMAGE)
                 ============================================================== */}
              {inspectorTab === 'element' && (
                <div className="space-y-4">
                  {!selectedElement ? (
                    <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                      <Type className="w-7 h-7 text-blue-600 mx-auto" />
                      <h4 className="font-bold text-slate-900 text-sm">Click Any Element on the Page</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Click any heading, paragraph, badge, feature bullet, table cell, button, link, image, or PDF card on the live product page behind this drawer to edit it directly.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono uppercase text-blue-700 font-bold block">
                            Selected {selectedElement.kind.toUpperCase()} ({selectedElement.tagName})
                          </span>
                          <div className="font-bold text-slate-900 truncate">{selectedElement.label}</div>
                        </div>
                        <button
                          onClick={() => setSelectedElement(null)}
                          className="p-1 rounded-lg hover:bg-blue-100 text-slate-500 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* TEXT / HEADING / TABLE CELL EDITOR */}
                      {selectedElement.kind === 'text' && (
                        <div className="space-y-3">
                          <label className="block font-bold text-slate-800">Content Text</label>
                          <textarea
                            rows={5}
                            value={
                              payload.elementOverrides?.[selectedElement.key]?.text ??
                              (selectedElement.dataPath ? getByPath(payload.dataOverrides, selectedElement.dataPath) : undefined) ??
                              (activeProductKey === 'ares_commander' && selectedElement.dataPath
                                ? getByPath(mergedAresData, selectedElement.dataPath)
                                : undefined) ??
                              selectedElement.currentText ??
                              ''
                            }
                            onChange={e => {
                              const val = e.target.value
                              if (selectedElement.dataPath) {
                                setDataPathValue(selectedElement.dataPath, val)
                              }
                              setElementOverrideValue(selectedElement.key, { text: val })
                              setSelectedElement(prev => (prev ? { ...prev, currentText: val } : null))
                            }}
                            className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-400">Updates page live as you type</span>
                            <button
                              onClick={() => {
                                if (selectedElement.dataPath) {
                                  const origVal = getByPath(aresCommanderData, selectedElement.dataPath)
                                  if (origVal !== undefined) {
                                    setDataPathValue(selectedElement.dataPath, origVal)
                                  }
                                }
                                setElementOverrideValue(selectedElement.key, { text: undefined })
                                showToast('info', 'Restored original element text')
                              }}
                              className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restore Default Text</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* LINK / BUTTON EDITOR */}
                      {selectedElement.kind === 'link' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block font-bold text-slate-800">Button / Link Label</label>
                            <input
                              type="text"
                              value={
                                payload.elementOverrides?.[selectedElement.key]?.buttonLabel ??
                                (selectedElement.dataPath && !selectedElement.dataPath.toLowerCase().includes('url')
                                  ? getByPath(payload.dataOverrides, selectedElement.dataPath) ??
                                    (activeProductKey === 'ares_commander'
                                      ? getByPath(mergedAresData, selectedElement.dataPath)
                                      : undefined)
                                  : undefined) ??
                                selectedElement.currentText ??
                                ''
                              }
                              onChange={e => {
                                const val = e.target.value
                                if (selectedElement.dataPath && !selectedElement.dataPath.toLowerCase().includes('url')) {
                                  setDataPathValue(selectedElement.dataPath, val)
                                }
                                setElementOverrideValue(selectedElement.key, { buttonLabel: val, text: val })
                                setSelectedElement(prev => (prev ? { ...prev, currentText: val } : null))
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block font-bold text-slate-800">Destination URL / Download Link</label>
                            <input
                              type="text"
                              value={
                                payload.elementOverrides?.[selectedElement.key]?.href ??
                                (selectedElement.dataPath && selectedElement.dataPath.toLowerCase().includes('url')
                                  ? getByPath(payload.dataOverrides, selectedElement.dataPath) ??
                                    (activeProductKey === 'ares_commander'
                                      ? getByPath(mergedAresData, selectedElement.dataPath)
                                      : undefined)
                                  : undefined) ??
                                selectedElement.currentHref ??
                                ''
                              }
                              onChange={e => {
                                const val = e.target.value
                                if (selectedElement.dataPath && selectedElement.dataPath.toLowerCase().includes('url')) {
                                  setDataPathValue(selectedElement.dataPath, val)
                                }
                                setElementOverrideValue(selectedElement.key, { href: val })
                                setSelectedElement(prev => (prev ? { ...prev, currentHref: val } : null))
                              }}
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          {/* Upload a PDF directly to this link/button */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="font-bold text-slate-800 flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-red-600" />
                              <span>Attach / Upload PDF File to This Button</span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Upload a PDF from your computer to set this button's destination URL to the permanent cloud PDF link.
                            </p>
                            <label className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload / Replace PDF for Button</span>
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                className="hidden"
                                onChange={async e => {
                                  const f = e.target.files?.[0]
                                  if (!f) return
                                  e.target.value = ''
                                  try {
                                    setUploadState({
                                      active: true,
                                      targetId: selectedElement.key,
                                      progress: 20,
                                      statusText: 'Uploading PDF...',
                                    })
                                    const res = await uploadAssetToPersistentStorage(f, 'pdf', (p, s) =>
                                      setUploadState({ active: true, targetId: selectedElement.key, progress: p, statusText: s })
                                    )
                                    if (selectedElement.dataPath && selectedElement.dataPath.toLowerCase().includes('url')) {
                                      setDataPathValue(selectedElement.dataPath, res.url)
                                    }
                                    setElementOverrideValue(selectedElement.key, {
                                      href: res.url,
                                      pdfUrl: res.url,
                                      pdfName: res.fileName,
                                      pdfSize: res.fileSize,
                                    })
                                    setSelectedElement(prev => (prev ? { ...prev, currentHref: res.url } : null))
                                    showToast('success', `Linked PDF "${res.fileName}" (${res.fileSize}) to button!`)
                                  } catch (err: any) {
                                    showToast('error', err?.message || 'PDF upload failed')
                                  } finally {
                                    setUploadState(null)
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {/* IMAGE EDITOR */}
                      {selectedElement.kind === 'image' && (
                        <div className="space-y-4">
                          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/10 relative">
                            <img
                              src={
                                payload.elementOverrides?.[selectedElement.key]?.src ||
                                (selectedElement.dataPath
                                  ? getByPath(payload.dataOverrides, selectedElement.dataPath) ||
                                    (activeProductKey === 'ares_commander'
                                      ? getByPath(mergedAresData, selectedElement.dataPath)
                                      : undefined)
                                  : undefined) ||
                                selectedElement.currentSrc
                              }
                              alt={selectedElement.currentAlt || 'Selected Image'}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <label className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all">
                            <Upload className="w-4 h-4" />
                            <span>Upload / Replace Image (JPG, PNG, WebP, SVG)</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/svg+xml"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (!file) return
                                e.target.value = ''
                                handleImageFileUpload(file, {
                                  dataPath: selectedElement.dataPath,
                                  elementKey: selectedElement.key,
                                  defaultSrc: selectedElement.currentSrc,
                                })
                              }}
                            />
                          </label>

                          <div className="space-y-1.5">
                            <label className="block font-bold text-slate-800">Image URL / Path</label>
                            <input
                              type="text"
                              value={
                                payload.elementOverrides?.[selectedElement.key]?.src ||
                                (selectedElement.dataPath
                                  ? getByPath(payload.dataOverrides, selectedElement.dataPath) ||
                                    (activeProductKey === 'ares_commander'
                                      ? getByPath(mergedAresData, selectedElement.dataPath)
                                      : undefined)
                                  : undefined) ||
                                selectedElement.currentSrc ||
                                ''
                              }
                              onChange={e => {
                                const val = e.target.value
                                if (selectedElement.dataPath) {
                                  setDataPathValue(selectedElement.dataPath, val)
                                }
                                setElementOverrideValue(selectedElement.key, { src: val })
                                setSelectedElement(prev => (prev ? { ...prev, currentSrc: val } : null))
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-[11px]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block font-bold text-slate-800">Image Alt Text (SEO & Accessibility)</label>
                            <input
                              type="text"
                              value={
                                payload.elementOverrides?.[selectedElement.key]?.alt ??
                                selectedElement.currentAlt ??
                                ''
                              }
                              onChange={e => {
                                const val = e.target.value
                                setElementOverrideValue(selectedElement.key, { alt: val })
                                setSelectedElement(prev => (prev ? { ...prev, currentAlt: val } : null))
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block font-bold text-slate-800 mb-1">Display Fit</label>
                              <select
                                value={payload.elementOverrides?.[selectedElement.key]?.objectFit || 'contain'}
                                onChange={e =>
                                  setElementOverrideValue(selectedElement.key, {
                                    objectFit: e.target.value as any,
                                  })
                                }
                                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs"
                              >
                                <option value="contain">Contain (Full Image - No Crop)</option>
                                <option value="cover">Cover (Fill &amp; Crop)</option>
                                <option value="fill">Fill Stretch</option>
                                <option value="scale-down">Scale Down</option>
                              </select>
                            </div>
                            <div className="flex flex-col justify-end">
                              <button
                                onClick={() => {
                                  const isHidden = Boolean(payload.elementOverrides?.[selectedElement.key]?.hidden)
                                  setElementOverrideValue(selectedElement.key, { hidden: !isHidden })
                                }}
                                className="w-full py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                {payload.elementOverrides?.[selectedElement.key]?.hidden
                                  ? 'Show Image'
                                  : 'Hide / Remove Image'}
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              const slot = activeImageSlotsBase.find(
                                s => s.dataPath === selectedElement.dataPath || s.id === selectedElement.key
                              )
                              const origSrc =
                                slot?.defaultSrc ||
                                (selectedElement.dataPath
                                  ? getByPath(aresCommanderData, selectedElement.dataPath)
                                  : undefined) ||
                                payload.elementOverrides?.[selectedElement.key]?.originalSrc
                              if (origSrc) {
                                if (selectedElement.dataPath) {
                                  setDataPathValue(selectedElement.dataPath, origSrc)
                                }
                                setElementOverrideValue(selectedElement.key, {
                                  src: origSrc,
                                  hidden: false,
                                })
                                setSelectedElement(prev => (prev ? { ...prev, currentSrc: origSrc } : null))
                                showToast('info', 'Restored original image!')
                              }
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restore Original Image</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ==============================================================
                  TAB 2: 20-SECTION MANAGER & DEEP STRUCTURED SECTION EDITOR
                 ============================================================== */}
              {inspectorTab === 'sections' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Page Sections ({orderedSections.length})</h4>
                      <p className="text-[11px] text-slate-500">
                        Enable/disable, reorder, or jump to any section.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSectionVisibilityModal(true)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Power className="w-3 h-3" />
                      <span>Manager</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700">
                      {orderedSections.filter(s => !payload.hiddenSections?.[s.id]).length} of {orderedSections.length} Live
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={enableAllSections}
                        className="text-emerald-700 hover:underline font-bold cursor-pointer"
                      >
                        Enable All
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => disableAllExceptHero(orderedSections)}
                        className="text-slate-600 hover:underline font-semibold cursor-pointer"
                      >
                        Hero Only
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {orderedSections.map((sec, idx) => {
                      const isHidden = Boolean(payload.hiddenSections?.[sec.id])
                      const isExpanded = expandedSectionId === sec.id
                      const isLive = !isHidden
                      return (
                        <div
                          key={sec.id}
                          className={`rounded-xl border transition-all ${
                            isExpanded
                              ? 'border-blue-500 bg-blue-50/20 shadow-xs'
                              : isLive
                                ? 'border-slate-200 bg-white'
                                : 'border-rose-200 bg-rose-50/30'
                          }`}
                        >
                          <div className="p-3 flex items-center justify-between gap-2">
                            <button
                              onClick={() => {
                                setExpandedSectionId(isExpanded ? null : sec.id)
                                scrollToCanvasSection(sec.id)
                              }}
                              className="flex-1 text-left min-w-0 cursor-pointer"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900 truncate">{sec.shortLabel}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                                  isLive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {isLive ? 'LIVE' : 'DISABLED'}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">{sec.label}</div>
                            </button>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => moveSectionOrder(sec.id, 'up')}
                                disabled={idx === 0}
                                title="Move Section Up"
                                className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => moveSectionOrder(sec.id, 'down')}
                                disabled={idx === orderedSections.length - 1}
                                title="Move Section Down"
                                className="p-1 rounded hover:bg-slate-100 text-slate-600 disabled:opacity-30 cursor-pointer"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleSectionVisibility(sec.id)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                                  isLive ? 'bg-emerald-600' : 'bg-slate-300'
                                }`}
                                role="switch"
                                aria-checked={isLive}
                                title={isLive ? `Click to disable ${sec.shortLabel}` : `Click to enable ${sec.shortLabel}`}
                              >
                                <span
                                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-xs ${
                                    isLive ? 'translate-x-4.5' : 'translate-x-0.5'
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          {isExpanded && activeProductKey === 'ares_commander' && (
                            <div className="p-3 border-t border-slate-200 bg-white space-y-3 rounded-b-xl">
                              {sec.id === 'hero' && (
                                <div className="space-y-2.5">
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Eyebrow Badge</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.hero.eyebrow}
                                      onChange={e => setDataPathValue('hero.eyebrow', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Main H1 Headline</label>
                                    <textarea
                                      rows={2}
                                      value={mergedAresData.hero.headline}
                                      onChange={e => setDataPathValue('hero.headline', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Supporting Text</label>
                                    <textarea
                                      rows={3}
                                      value={mergedAresData.hero.supportingText}
                                      onChange={e => setDataPathValue('hero.supportingText', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                                    <textarea
                                      rows={2}
                                      value={mergedAresData.hero.shortDescription}
                                      onChange={e => setDataPathValue('hero.shortDescription', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Trial Download URL</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.identity.downloadUrl}
                                      onChange={e => setDataPathValue('identity.downloadUrl', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-[11px]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Trial Note</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.hero.trialNote}
                                      onChange={e => setDataPathValue('hero.trialNote', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                </div>
                              )}

                              {sec.id === 'overview' && (
                                <div className="space-y-2.5">
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Overview Heading</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.overview.heading}
                                      onChange={e => setDataPathValue('overview.heading', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Overview Description</label>
                                    <textarea
                                      rows={3}
                                      value={mergedAresData.overview.description}
                                      onChange={e => setDataPathValue('overview.description', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div className="space-y-2 pt-1">
                                    <span className="font-bold text-slate-700 block">Overview Cards (6):</span>
                                    {mergedAresData.overview.cards.map((c: any, cIdx: number) => (
                                      <div key={cIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                                        <input
                                          type="text"
                                          value={c.title}
                                          onChange={e => setDataPathValue(`overview.cards.${cIdx}.title`, e.target.value)}
                                          className="w-full px-2 py-1 rounded border border-slate-300 font-bold"
                                        />
                                        <textarea
                                          rows={2}
                                          value={c.description}
                                          onChange={e => setDataPathValue(`overview.cards.${cIdx}.description`, e.target.value)}
                                          className="w-full px-2 py-1 rounded border border-slate-300"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {sec.id === 'benefits' && (
                                <div className="space-y-2.5">
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Benefits Heading</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.benefits.heading}
                                      onChange={e => setDataPathValue('benefits.heading', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Benefits Description</label>
                                    <textarea
                                      rows={2}
                                      value={mergedAresData.benefits.description}
                                      onChange={e => setDataPathValue('benefits.description', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  {mergedAresData.benefits.items.map((b: any, bIdx: number) => (
                                    <div key={bIdx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                                      <input
                                        type="text"
                                        value={b.title}
                                        onChange={e => setDataPathValue(`benefits.items.${bIdx}.title`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300 font-bold"
                                      />
                                      <textarea
                                        rows={2}
                                        value={b.desc}
                                        onChange={e => setDataPathValue(`benefits.items.${bIdx}.desc`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {sec.id === 'licensing' && (
                                <div className="space-y-2.5">
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Licensing Heading</label>
                                    <input
                                      type="text"
                                      value={mergedAresData.licensing.heading}
                                      onChange={e => setDataPathValue('licensing.heading', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  <div>
                                    <label className="block font-bold text-slate-700 mb-1">Licensing Description</label>
                                    <textarea
                                      rows={2}
                                      value={mergedAresData.licensing.description}
                                      onChange={e => setDataPathValue('licensing.description', e.target.value)}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                                    />
                                  </div>
                                  {mergedAresData.licensing.cards.map((plan: any, pIdx: number) => (
                                    <div key={pIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                                      <input
                                        type="text"
                                        value={plan.category}
                                        onChange={e => setDataPathValue(`licensing.cards.${pIdx}.category`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300 font-bold"
                                      />
                                      <textarea
                                        rows={2}
                                        value={plan.description}
                                        onChange={e => setDataPathValue(`licensing.cards.${pIdx}.description`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300"
                                      />
                                      <input
                                        type="text"
                                        value={plan.indicativePriceNote}
                                        onChange={e => setDataPathValue(`licensing.cards.${pIdx}.indicativePriceNote`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300 text-[11px]"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {sec.id === 'faqs' && (
                                <div className="space-y-2">
                                  <span className="font-bold text-slate-700 block">
                                    FAQs ({mergedAresData.faqs.length}):
                                  </span>
                                  {mergedAresData.faqs.map((faq: any, fIdx: number) => (
                                    <div key={fIdx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                                      <input
                                        type="text"
                                        value={faq.q}
                                        onChange={e => setDataPathValue(`faqs.${fIdx}.q`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300 font-bold"
                                      />
                                      <textarea
                                        rows={2}
                                        value={faq.a}
                                        onChange={e => setDataPathValue(`faqs.${fIdx}.a`, e.target.value)}
                                        className="w-full px-2 py-1 rounded border border-slate-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="pt-1 text-[11px] text-slate-500">
                                Tip: Click any text or image inside this section on the page to edit directly.
                              </div>
                            </div>
                          )}

                          {isExpanded && activeProductKey !== 'ares_commander' && (
                            <div className="p-3 border-t border-slate-200 bg-white space-y-2.5 rounded-b-xl">
                              <p className="text-[11px] text-slate-600 leading-relaxed">{sec.description}</p>
                              <div className="flex items-center justify-between gap-2 pt-1">
                                <button
                                  onClick={() => scrollToCanvasSection(sec.id)}
                                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                                >
                                  Scroll to Section on Page
                                </button>
                                <span className="text-[10px] text-slate-400">
                                  Click any text, spec row, button, or image in this section to edit
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 3: COMPLETE IMAGE UPLOAD & MANAGEMENT PANEL
                 ============================================================== */}
              {inspectorTab === 'images' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Page Images ({activeImageSlotsBase.length} Live Slots on Page)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload or replace any image from your computer. All uploads are stored in persistent cloud storage.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeImageSlotsBase.map(slot => {
                      const currentSrc =
                        payload.elementOverrides?.[slot.dataPath || slot.id]?.src ||
                        payload.elementOverrides?.[slot.id]?.src ||
                        (slot.dataPath
                          ? getByPath(payload.dataOverrides, slot.dataPath) ||
                            (activeProductKey === 'ares_commander' ? getByPath(mergedAresData, slot.dataPath) : undefined)
                          : undefined) ||
                        slot.defaultSrc
                      const currentAlt =
                        payload.elementOverrides?.[slot.dataPath || slot.id]?.alt ?? slot.defaultAlt
                      const isModified = currentSrc !== slot.defaultSrc

                      return (
                        <div
                          key={slot.id}
                          className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-bold text-slate-900">{slot.label}</div>
                              <div className="text-[10px] font-mono text-slate-500">
                                Recommended: {slot.recommendedDimensions}
                              </div>
                            </div>
                            {isModified && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold">
                                Replaced
                              </span>
                            )}
                          </div>

                          <div className="aspect-16/9 rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                            <img
                              src={currentSrc}
                              alt={currentAlt}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={currentSrc}
                              onChange={e => {
                                const val = e.target.value
                                if (slot.dataPath) setDataPathValue(slot.dataPath, val)
                                setElementOverrideValue(slot.dataPath || slot.id, { src: val })
                              }}
                              placeholder="Image URL..."
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[10px]"
                            />
                            <input
                              type="text"
                              value={currentAlt}
                              onChange={e =>
                                setElementOverrideValue(slot.dataPath || slot.id, { alt: e.target.value })
                              }
                              placeholder="Alt text..."
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px]"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload / Replace</span>
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                className="hidden"
                                onChange={e => {
                                  const f = e.target.files?.[0]
                                  if (!f) return
                                  e.target.value = ''
                                  handleImageFileUpload(f, {
                                    dataPath: slot.dataPath,
                                    elementKey: slot.dataPath || slot.id,
                                    defaultSrc: slot.defaultSrc,
                                  })
                                }}
                              />
                            </label>

                            {isModified && (
                              <button
                                onClick={() => {
                                  if (slot.dataPath) setDataPathValue(slot.dataPath, slot.defaultSrc)
                                  setElementOverrideValue(slot.dataPath || slot.id, {
                                    src: slot.defaultSrc,
                                    hidden: false,
                                  })
                                  showToast('info', `Restored original image for ${slot.label}`)
                                }}
                                title="Restore Original Image"
                                className="py-2 px-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 4: COMPLETE PDF UPLOAD & DOWNLOAD MANAGEMENT PANEL
                 ============================================================== */}
              {inspectorTab === 'pdfs' && (
                <div className="space-y-4">
                  {/* Live Brochure / PDF Buttons Discovered on the Active Page */}
                  {discoveredInventory.pdfLinks.length > 0 && (
                    <div className="space-y-2.5 pb-3 border-b border-slate-200">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          Page Brochure & Download Buttons ({discoveredInventory.pdfLinks.length})
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Upload a PDF directly to any brochure or download button currently displayed on this page.
                        </p>
                      </div>

                      {discoveredInventory.pdfLinks.map(linkItem => {
                        const ov = payload.elementOverrides?.[linkItem.key]
                        const activeHref = ov?.pdfUrl || ov?.href || linkItem.href
                        const activeLabel = ov?.buttonLabel || ov?.text || linkItem.label
                        return (
                          <div
                            key={linkItem.key}
                            className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 truncate">{activeLabel}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                                {linkItem.isButton ? 'Button' : 'Link'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-1.5">
                              <input
                                type="text"
                                value={activeLabel}
                                onChange={e =>
                                  setElementOverrideValue(linkItem.key, {
                                    buttonLabel: e.target.value,
                                    text: e.target.value,
                                  })
                                }
                                placeholder="Button label..."
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                              />
                              <input
                                type="text"
                                value={activeHref}
                                onChange={e =>
                                  setElementOverrideValue(linkItem.key, {
                                    href: e.target.value,
                                    pdfUrl: e.target.value,
                                  })
                                }
                                placeholder="PDF / Download URL..."
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[10px]"
                              />
                            </div>

                            <label className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload / Replace PDF for "{activeLabel.slice(0, 24)}"</span>
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                className="hidden"
                                onChange={async e => {
                                  const f = e.target.files?.[0]
                                  if (!f) return
                                  e.target.value = ''
                                  try {
                                    setUploadState({
                                      active: true,
                                      targetId: linkItem.key,
                                      progress: 20,
                                      statusText: 'Uploading PDF...',
                                    })
                                    const res = await uploadAssetToPersistentStorage(f, 'pdf', (p, s) =>
                                      setUploadState({ active: true, targetId: linkItem.key, progress: p, statusText: s })
                                    )
                                    setElementOverrideValue(linkItem.key, {
                                      href: res.url,
                                      pdfUrl: res.url,
                                      pdfName: res.fileName,
                                      pdfSize: res.fileSize,
                                    })
                                    showToast('success', `Uploaded PDF "${res.fileName}" (${res.fileSize}) to button!`)
                                  } catch (err: any) {
                                    showToast('error', err?.message || 'PDF upload failed')
                                  } finally {
                                    setUploadState(null)
                                  }
                                }}
                              />
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        PDF Brochures & Downloads ({payload.pdfResources.length})
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Upload PDFs from your computer, edit button labels, preview documents, or add new downloadable resources.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newPdf: CadPdfResource = {
                          id: `pdf_${Date.now()}`,
                          title: `New ${activeProductMeta.label} Technical Document (PDF)`,
                          description: 'Official technical documentation and product resource.',
                          badge: 'PDF Document',
                          buttonLabel: 'Download PDF',
                          fileUrl: activeProductMeta.defaultBrochureUrl || activeProductMeta.route,
                          originalFileUrl: activeProductMeta.defaultBrochureUrl || activeProductMeta.route,
                          fileName: `${activeProductKey.replace(/_/g, '-')}-document.pdf`,
                          fileSize: '1.5 MB',
                          visible: true,
                          behavior: 'new_tab',
                        }
                        updatePayload(prev => ({
                          ...prev,
                          pdfResources: [...prev.pdfResources, newPdf],
                        }))
                        scrollToCanvasSection('pdf_downloads')
                        showToast('success', 'Added new PDF resource card!')
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add PDF</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {payload.pdfResources.map((pdf, idx) => (
                      <div
                        key={pdf.id}
                        className={`p-3.5 rounded-xl border space-y-2.5 ${
                          pdf.visible !== false
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-slate-100/70 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-red-600 shrink-0" />
                            <span className="font-bold text-slate-900 truncate">{pdf.title}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setPreviewPdfModal(pdf)}
                              title="Preview PDF"
                              className="p-1 rounded hover:bg-slate-200 text-blue-600 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={pdf.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open Current PDF URL"
                              className="p-1 rounded hover:bg-slate-200 text-slate-600"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() =>
                                updatePayload(prev => ({
                                  ...prev,
                                  pdfResources: prev.pdfResources.map((item, i) =>
                                    i === idx ? { ...item, visible: item.visible === false ? true : false } : item
                                  ),
                                }))
                              }
                              title={pdf.visible !== false ? 'Hide/Remove PDF' : 'Show PDF'}
                              className="p-1 rounded hover:bg-slate-200 text-slate-600 cursor-pointer"
                            >
                              {pdf.visible !== false ? (
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              ) : (
                                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Upload / Replace PDF Button */}
                        <label className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload / Replace PDF File (.pdf)</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={e => {
                              const f = e.target.files?.[0]
                              if (!f) return
                              e.target.value = ''
                              handlePdfFileUpload(f, pdf.id)
                            }}
                          />
                        </label>

                        {/* Editable PDF Metadata Fields */}
                        <div className="space-y-1.5">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase">
                              Document Display Name
                            </label>
                            <input
                              type="text"
                              value={pdf.title}
                              onChange={e => {
                                const val = e.target.value
                                updatePayload(prev => ({
                                  ...prev,
                                  pdfResources: prev.pdfResources.map((item, i) =>
                                    i === idx ? { ...item, title: val } : item
                                  ),
                                }))
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase">
                              Description
                            </label>
                            <textarea
                              rows={2}
                              value={pdf.description}
                              onChange={e => {
                                const val = e.target.value
                                updatePayload(prev => ({
                                  ...prev,
                                  pdfResources: prev.pdfResources.map((item, i) =>
                                    i === idx ? { ...item, description: val } : item
                                  ),
                                }))
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase">
                                Download Button Text
                              </label>
                              <input
                                type="text"
                                value={pdf.buttonLabel}
                                onChange={e => {
                                  const val = e.target.value
                                  updatePayload(prev => ({
                                    ...prev,
                                    pdfResources: prev.pdfResources.map((item, i) =>
                                      i === idx ? { ...item, buttonLabel: val } : item
                                    ),
                                  }))
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase">
                                Badge / Category
                              </label>
                              <input
                                type="text"
                                value={pdf.badge}
                                onChange={e => {
                                  const val = e.target.value
                                  updatePayload(prev => ({
                                    ...prev,
                                    pdfResources: prev.pdfResources.map((item, i) =>
                                      i === idx ? { ...item, badge: val } : item
                                    ),
                                  }))
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase">
                                File Name
                              </label>
                              <input
                                type="text"
                                value={pdf.fileName}
                                onChange={e => {
                                  const val = e.target.value
                                  updatePayload(prev => ({
                                    ...prev,
                                    pdfResources: prev.pdfResources.map((item, i) =>
                                      i === idx ? { ...item, fileName: val } : item
                                    ),
                                  }))
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-600 uppercase">
                                File Size
                              </label>
                              <input
                                type="text"
                                value={pdf.fileSize}
                                onChange={e => {
                                  const val = e.target.value
                                  updatePayload(prev => ({
                                    ...prev,
                                    pdfResources: prev.pdfResources.map((item, i) =>
                                      i === idx ? { ...item, fileSize: val } : item
                                    ),
                                  }))
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[11px]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase">
                              Current File URL
                            </label>
                            <input
                              type="text"
                              value={pdf.fileUrl}
                              onChange={e => {
                                const val = e.target.value
                                updatePayload(prev => ({
                                  ...prev,
                                  pdfResources: prev.pdfResources.map((item, i) =>
                                    i === idx ? { ...item, fileUrl: val } : item
                                  ),
                                }))
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-[10px]"
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <select
                              value={pdf.behavior || 'new_tab'}
                              onChange={e => {
                                const val = e.target.value as 'download' | 'new_tab'
                                updatePayload(prev => ({
                                  ...prev,
                                  pdfResources: prev.pdfResources.map((item, i) =>
                                    i === idx ? { ...item, behavior: val } : item
                                  ),
                                }))
                              }}
                              className="px-2 py-1 rounded border border-slate-300 bg-white text-[11px]"
                            >
                              <option value="new_tab">Open PDF in New Tab</option>
                              <option value="download">Direct File Download</option>
                            </select>

                            {(pdf.previousFileUrl || pdf.fileUrl !== pdf.originalFileUrl) && (
                              <button
                                onClick={() => {
                                  const restoreUrl = pdf.previousFileUrl || pdf.originalFileUrl
                                  updatePayload(prev => ({
                                    ...prev,
                                    pdfResources: prev.pdfResources.map((item, i) =>
                                      i === idx ? { ...item, fileUrl: restoreUrl, visible: true } : item
                                    ),
                                  }))
                                  showToast('info', 'Restored previous PDF file URL!')
                                }}
                                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Restore Previous PDF</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==============================================================
                  TAB 5: SEO METADATA & REVISION HISTORY / RESET
                 ============================================================== */}
              {inspectorTab === 'seo' && (
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm">SEO Title & Meta Description</h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Page SEO Title</label>
                      <input
                        type="text"
                        value={payload.seo?.title || ''}
                        onChange={e =>
                          updatePayload(prev => ({
                            ...prev,
                            seo: { ...prev.seo, title: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Page Meta Description</label>
                      <textarea
                        rows={3}
                        value={payload.seo?.description || ''}
                        onChange={e =>
                          updatePayload(prev => ({
                            ...prev,
                            seo: { ...prev.seo, description: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  {/* Published Version History */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <History className="w-4 h-4 text-blue-600" />
                      <span>Published Revision History ({revisions.length})</span>
                    </h4>
                    {revisions.length === 0 ? (
                      <p className="text-xs text-slate-500">
                        No published revisions recorded yet. Each time you click "Publish Changes", a snapshot is saved here so you can roll back anytime.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {revisions.map(rev => (
                          <div
                            key={rev.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                          >
                            <div>
                              <div className="font-bold text-slate-800">{rev.label}</div>
                              <div className="text-[10px] font-mono text-slate-500">
                                {new Date(rev.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                updatePayload(() => structuredCloneSafe(rev.payload))
                                showToast('info', `Loaded revision from ${new Date(rev.timestamp).toLocaleTimeString()}. Click Publish to make it live.`)
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[11px] cursor-pointer"
                            >
                              Restore
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reset / Discard Actions */}
                  <div className="pt-4 border-t border-slate-200 space-y-2.5">
                    <h4 className="font-bold text-slate-900 text-sm">Draft & Factory Reset</h4>
                    <button
                      onClick={() => {
                        if (!window.confirm('Discard unsaved draft changes and revert to the last published version?')) {
                          return
                        }
                        const restored = discardVisualDraft(activeProductKey)
                        setPayload(restored)
                        setHasUnsavedChanges(false)
                        showToast('info', 'Discarded draft and reverted to published state.')
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Discard Unsaved Draft</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!window.confirm('Reset this entire product page back to original factory defaults?')) {
                          return
                        }
                        const def = getDefaultVisualPayload(activeProductKey)
                        updatePayload(() => def)
                        showToast('info', 'Reset page in editor to original defaults. Click Publish Changes to apply live.')
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reset Entire Page to Original Defaults</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* PDF Preview Modal */}
      {previewPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[82vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-bold text-sm truncate">{previewPdfModal.title}</h4>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {previewPdfModal.fileName} ({previewPdfModal.fileSize}) — {previewPdfModal.fileUrl}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewPdfModal.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in New Tab</span>
                </a>
                <button
                  onClick={() => setPreviewPdfModal(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100">
              <iframe
                src={previewPdfModal.fileUrl}
                title={previewPdfModal.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL: DEDICATED SECTION VISIBILITY & ENABLE/DISABLE MANAGER
          Allows Admin to enable or disable specific sections of CAD softwares,
          3D printers, and 3D scanners with live real-time preview & publishing!
         ============================================================== */}
      {showSectionVisibilityModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-950 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
                  <Power className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-black text-white truncate">
                      Manage Page Sections Visibility
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {activeProductMeta.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {activeProductMeta.label} ({activeProductMeta.route}) • Enable or disable specific sections on this page.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowSectionVisibilityModal(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions & Search Toolbar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              {/* Status summary pill */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-700">Section Status:</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                  {orderedSections.filter(s => !payload.hiddenSections?.[s.id]).length} Enabled (Live)
                </span>
                {orderedSections.filter(s => payload.hiddenSections?.[s.id]).length > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800">
                    {orderedSections.filter(s => payload.hiddenSections?.[s.id]).length} Disabled (Hidden)
                  </span>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={enableAllSections}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  Enable All Sections
                </button>
                <button
                  type="button"
                  onClick={() => disableAllExceptHero(orderedSections)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Keep Only Hero
                </button>
                <button
                  type="button"
                  onClick={resetSectionVisibility}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Section Search Filter */}
            <div className="px-5 pt-3 pb-1 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={sectionSearchQuery}
                  onChange={e => setSectionSearchQuery(e.target.value)}
                  placeholder="Filter sections by title or keywords..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Scrollable Sections List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-3 bg-white">
              {orderedSections
                .filter(sec => {
                  if (!sectionSearchQuery.trim()) return true
                  const q = sectionSearchQuery.toLowerCase()
                  return (
                    sec.label.toLowerCase().includes(q) ||
                    sec.shortLabel.toLowerCase().includes(q) ||
                    sec.description.toLowerCase().includes(q)
                  )
                })
                .map((sec, idx) => {
                  const isHidden = Boolean(payload.hiddenSections?.[sec.id])
                  const isLive = !isHidden
                  return (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isLive
                          ? 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                          : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        {/* Section info */}
                        <div className="flex items-start space-x-3.5 min-w-0">
                          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-black shrink-0 ${
                            isLive ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-rose-100 text-rose-700 border border-rose-200'
                          }`}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-extrabold text-sm text-slate-900 truncate">
                                {sec.shortLabel || sec.label}
                              </h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isLive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isLive ? '● Live on Website' : '○ Hidden / Disabled'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {sec.description || 'Full page content section.'}
                            </p>
                            <p className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                              ID: {sec.id}
                            </p>
                          </div>
                        </div>

                        {/* Interactive Toggle Switch */}
                        <div className="flex items-center space-x-3 shrink-0">
                          <span className="text-xs font-bold text-slate-600 hidden sm:inline">
                            {isLive ? 'Enabled' : 'Disabled'}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSectionVisibility(sec.id)}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                              isLive ? 'bg-emerald-600' : 'bg-slate-300'
                            }`}
                            role="switch"
                            aria-checked={isLive}
                            title={isLive ? `Click to disable ${sec.shortLabel}` : `Click to enable ${sec.shortLabel}`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                                isLive ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Helper notice if disabled */}
                      {!isLive && (
                        <div className="mt-3 pt-2.5 border-t border-rose-200/70 flex items-center justify-between text-xs text-rose-700">
                          <span className="flex items-center space-x-1.5 font-medium">
                            <EyeOff className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>This section is currently <strong>DISABLED</strong>. Visitors cannot see this section on the live page.</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleSectionVisibility(sec.id)}
                            className="font-bold underline hover:text-rose-900 cursor-pointer ml-2 shrink-0"
                          >
                            Enable Now
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>

            {/* Modal Footer with Save / Publish Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Changes apply instantly in the live editor. Click <strong>"Publish Changes"</strong> to push them live to website visitors.
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={handlePublishChanges}
                  disabled={isPublishing}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isPublishing ? 'Publishing...' : 'Publish to Live Site'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSectionVisibilityModal(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CAD SOFTWARE, 3D PRINTER & 3D SCANNER MANAGEMENT MODALS
         ==================================================================== */}
      {renderCadModal()}
      {renderPrinterModal()}
      {renderScannerModal()}
    </div>
  )
}

export default CadVisualPageEditor
