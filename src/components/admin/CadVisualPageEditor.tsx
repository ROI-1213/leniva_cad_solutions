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
} from 'lucide-react'
import { DEFAULT_CAD_PRODUCTS, CadProductItem } from '../../utils/cadSoftwareConfig'
import { aresCommanderData } from '../../data/aresCommanderData'
import {
  CadVisualPagePayload,
  CadVisualEditorContext,
  CadPdfResource,
  ARES_COMMANDER_SECTIONS,
  ARES_COMMANDER_IMAGE_SLOTS,
  DEFAULT_ARES_COMMANDER_PDFS,
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
} from '../../utils/cadVisualEditorStore'

// Import actual live frontend CAD software page components so we render the exact real page
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
import Header from '../Header'
import Footer from '../Footer'

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

function renderRealCadProductPage(productKey: string) {
  switch (productKey) {
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
    default:
      return <AresCommanderPage />
  }
}

export interface CadVisualPageEditorProps {
  onExitToDashboard?: () => void
}

export const CadVisualPageEditor: React.FC<CadVisualPageEditorProps> = ({ onExitToDashboard }) => {
  // Open directly in full-page visual editor mode for ARES Commander so it displays the complete live page immediately
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('editor')
  const [activeProductKey, setActiveProductKey] = useState<string>('ares_commander')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false)

  // Editor state — full-width desktop by default, inspector closed until clicked so the page is 100% identical to live frontend
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false)
  const [showHeaderFooter, setShowHeaderFooter] = useState<boolean>(true)
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false)
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('element')

  // Initial working payload
  const initialWorking = useMemo(() => getWorkingVisualPayload('ares_commander'), [])
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
    setExpandedSectionId('hero')
    setViewMode('editor')
  }, [])

  // Apply payload mutations and record in Undo/Redo stack
  const updatePayload = useCallback(
    (updater: (prev: CadVisualPagePayload) => CadVisualPagePayload) => {
      setPayload(prev => {
        const next = updater(structuredCloneSafe(prev))
        next.updatedAt = new Date().toISOString()
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
    [historyIndex]
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

  // Re-apply DOM overrides whenever payload changes inside the editor canvas
  useEffect(() => {
    if (viewMode !== 'editor' || !canvasRef.current) return
    applyCadVisualOverridesToRoot(canvasRef.current, payload)
  }, [viewMode, payload, viewport, showHeaderFooter])

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

    // 2. Check if user clicked an Image (<img>) or its immediate wrapper
    let imgEl: HTMLImageElement | null = null
    if (target instanceof HTMLImageElement) {
      imgEl = target
    } else {
      const childImg = target.querySelector('img')
      if (childImg && (target.tagName === 'DIV' || target.tagName === 'SPAN') && target.clientHeight > 30) {
        imgEl = childImg
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
        currentSrc: ov?.src || imgEl.getAttribute('src') || imgEl.src,
        currentAlt: ov?.alt !== undefined ? ov.alt : imgEl.alt,
        currentObjectFit: ov?.objectFit || 'cover',
      })
      setInspectorOpen(true)
      setInspectorTab('element')
      return
    }

    // 3. Check if user clicked a Link (<a>)
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

    // 4. Check if user clicked an editable text node or element with data-cad-path
    const closestPathNode = target.closest<HTMLElement>('[data-cad-path]')
    const editableTarget = closestPathNode || target
    const tag = editableTarget.tagName.toLowerCase()
    const allowedTextTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'td', 'th', 'button', 'div']

    if (allowedTextTags.includes(tag)) {
      const dataPath = editableTarget.getAttribute('data-cad-path') || undefined
      const isLeafText = editableTarget.childElementCount === 0 || Boolean(dataPath)
      if (!isLeafText) return

      const elKey = computeDeterministicCadKey(root, editableTarget)
      const currentText =
        (dataPath ? getByPath(mergedAresData, dataPath) : undefined) ??
        payload.elementOverrides?.[elKey]?.text ??
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

      updatePayload(prev => {
        const next = { ...prev }
        if (options.dataPath) {
          next.dataOverrides = setByPath(next.dataOverrides || {}, options.dataPath, res.url)
        }
        if (options.elementKey) {
          const existing = next.elementOverrides?.[options.elementKey] || { key: options.elementKey }
          next.elementOverrides = {
            ...(next.elementOverrides || {}),
            [options.elementKey]: {
              ...existing,
              src: res.url,
              originalSrc: existing.originalSrc || options.defaultSrc,
              fileName: res.fileName,
              dimensions: res.dimensions,
            },
          }
        }
        return next
      })

      if (selectedElement && (selectedElement.dataPath === options.dataPath || selectedElement.key === options.elementKey)) {
        setSelectedElement(prev => (prev ? { ...prev, currentSrc: res.url } : null))
      }

      showToast('success', `Uploaded "${res.fileName}" (${res.fileSize}) to persistent cloud storage!`)
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

      updatePayload(prev => ({
        ...prev,
        pdfResources: prev.pdfResources.map(item =>
          item.id === pdfId
            ? {
                ...item,
                previousFileUrl: item.fileUrl,
                fileUrl: res.url,
                fileName: res.fileName,
                fileSize: res.fileSize,
                visible: true,
              }
            : item
        ),
      }))

      showToast('success', `PDF "${res.fileName}" (${res.fileSize}) uploaded to persistent storage!`)
    } catch (err: any) {
      showToast('error', err?.message || 'PDF upload failed.')
    } finally {
      setUploadState(null)
    }
  }

  // Move section up/down
  const moveSectionOrder = (sectionId: string, direction: 'up' | 'down') => {
    updatePayload(prev => {
      const order = Array.isArray(prev.sectionOrder) && prev.sectionOrder.length > 0
        ? [...prev.sectionOrder]
        : ARES_COMMANDER_SECTIONS.map(s => s.id)
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
    updatePayload(prev => ({
      ...prev,
      hiddenSections: {
        ...(prev.hiddenSections || {}),
        [sectionId]: !prev.hiddenSections?.[sectionId],
      },
    }))
  }

  // Scroll to section inside the canvas
  const scrollToCanvasSection = (sectionId: string) => {
    if (!canvasRef.current) return
    const node = canvasRef.current.querySelector<HTMLElement>(`[data-cad-section="${sectionId}"]`)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const activeProductMeta: CadProductItem =
    DEFAULT_CAD_PRODUCTS.find(p => p.key === activeProductKey) || DEFAULT_CAD_PRODUCTS[0]

  const filteredProducts = useMemo(() => {
    return DEFAULT_CAD_PRODUCTS.filter(p => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        p.label.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q)
      )
    })
  }, [searchQuery, refreshTick])

  // ============================================================================
  // VIEW 1: PRODUCT SELECTION DASHBOARD ("Admin Dashboard -> CAD Software Edit")
  // ============================================================================
  if (viewMode === 'list') {
    const aresInfo = getWorkingVisualPayload('ares_commander')
    return (
      <div className="space-y-8">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Visual CAD Page Editor</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                CAD Software Edit — Full-Page Live Visual Editor
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Open the complete live product page at 100% full width exactly as it appears on the public website, click any heading, paragraph, button, table cell, image, or PDF document to edit directly on the page, upload replacement images & PDFs to persistent cloud storage, save drafts, and publish live to Vercel immediately.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setShowAuditModal(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>20-Section Audit Checklist</span>
              </button>
              <button
                onClick={() => loadProductIntoEditor('ares_commander')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Edit ARES Commander Full Page</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Primary Product Card: ARES Commander */}
        <div className="bg-white rounded-2xl border-2 border-blue-600/80 shadow-md p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                <img
                  src={aresInfo.payload.dataOverrides?.hero?.image || '/images/software/ares-commander.jpg'}
                  alt="ARES Commander"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-mono uppercase font-bold">
                    Flagship Reference Page
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                    Graebert • 2D & 3D DWG CAD
                  </span>
                  {aresInfo.hasDraft && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                      Unsaved Draft Ready
                    </span>
                  )}
                  {aresInfo.isPublished && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      Custom Published Live
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  ARES Commander — Complete Product Page (`/products/ares-commander`)
                </h3>
                <p className="text-xs text-slate-600">
                  20 Live Sections • 11 Editable Image Slots • 4 Downloadable PDF Brochures & Datasheets • Full Inline Text, Table, FAQ & Section Reordering
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="/products/ares-commander"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Page</span>
              </a>
              <button
                onClick={() => loadProductIntoEditor('ares_commander')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm cursor-pointer transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>Edit Full Page</span>
              </button>
            </div>
          </div>
        </div>

        {/* All CAD Software Product Pages Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                All CAD Software Product Pages ({filteredProducts.length})
              </h3>
              <p className="text-xs text-slate-500">
                Select any CAD software product below and click "Edit Page" to open its full-screen live visual editor.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search CAD software pages..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(prod => {
              const info = getWorkingVisualPayload(prod.key)
              return (
                <div
                  key={prod.key}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {prod.brand}
                      </span>
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
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                            Live Default
                          </span>
                        )}
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{prod.label}</h4>
                    <p className="text-xs text-slate-500">{prod.category}</p>
                    <div className="text-[11px] font-mono text-slate-400 truncate">{prod.route}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={prod.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Page</span>
                    </a>
                    <button
                      onClick={() => loadProductIntoEditor(prod.key)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Edit Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 20-Section Coverage Audit Modal */}
        {showAuditModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black">
                    Complete ARES Commander Frontend Page Audit & Section Coverage Checklist
                  </h3>
                  <p className="text-xs text-slate-400">
                    All 20 sections, 11 image assets, and 4 PDF download resources audited from `/products/ares-commander`
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
                    Audited Page Sections (20 / 20 Connected to Live Visual Editor)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {ARES_COMMANDER_SECTIONS.map(sec => (
                      <div key={sec.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-900">{sec.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{sec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowAuditModal(false)
                    loadProductIntoEditor('ares_commander')
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  Open ARES Commander Live Visual Editor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ============================================================================
  // VIEW 2: FULL-SCREEN 100% WIDTH LIVE VISUAL PAGE EDITOR
  // Renders fixed inset-0 w-screen h-screen so the product page inside Admin
  // has the EXACT same full viewport width and layout as /products/ares-commander!
  // ============================================================================
  const orderedSections = (
    Array.isArray(payload.sectionOrder) && payload.sectionOrder.length > 0
      ? payload.sectionOrder
      : ARES_COMMANDER_SECTIONS.map(s => s.id)
  )
    .map(id => ARES_COMMANDER_SECTIONS.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  for (const sec of ARES_COMMANDER_SECTIONS) {
    if (!orderedSections.some(s => s.id === sec.id)) {
      orderedSections.push(sec)
    }
  }

  const revisions = getVisualRevisions(activeProductKey)

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-white flex flex-col overflow-hidden">
      {/* ====================================================================
          STICKY TOP VISUAL EDITOR BAR (Compact, Full-Width)
          Back to Admin | All Products | Product Select | Desktop/Tablet/Mobile | Sections / Images / PDFs / SEO | Undo/Redo | Save Draft | Preview | Publish Changes
         ==================================================================== */}
      <div className="bg-slate-950 border-b border-slate-800 px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-white z-40 shrink-0">
        {/* Left: Back to Admin + All CAD Pages + Product Switcher + Status */}
        <div className="flex items-center gap-2">
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
              setViewMode('list')
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">All Products</span>
          </button>

          <select
            value={activeProductKey}
            onChange={e => {
              if (hasUnsavedChanges && !window.confirm('Switch product without saving current changes?')) {
                return
              }
              loadProductIntoEditor(e.target.value)
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DEFAULT_CAD_PRODUCTS.map(p => (
              <option key={p.key} value={p.key}>
                {p.label} ({p.brand})
              </option>
            ))}
          </select>

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
              ref={canvasRef}
              data-cad-editor-canvas="true"
              onClickCapture={handleCanvasClickCapture}
              className="w-full"
            >
              {showHeaderFooter && <Header />}
              {renderRealCadProductPage(activeProductKey)}
              {showHeaderFooter && <Footer />}
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
                <label className="inline-flex items-center gap-1 text-[10px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHeaderFooter}
                    onChange={e => setShowHeaderFooter(e.target.checked)}
                    className="rounded border-slate-600"
                  />
                  <span>Header/Footer</span>
                </label>
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
                              (selectedElement.dataPath
                                ? getByPath(mergedAresData, selectedElement.dataPath)
                                : undefined) ??
                              payload.elementOverrides?.[selectedElement.key]?.text ??
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
                                  ? getByPath(mergedAresData, selectedElement.dataPath)
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
                                  ? getByPath(mergedAresData, selectedElement.dataPath)
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
                                (selectedElement.dataPath
                                  ? getByPath(mergedAresData, selectedElement.dataPath)
                                  : undefined) ||
                                payload.elementOverrides?.[selectedElement.key]?.src ||
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
                                (selectedElement.dataPath
                                  ? getByPath(mergedAresData, selectedElement.dataPath)
                                  : undefined) ||
                                payload.elementOverrides?.[selectedElement.key]?.src ||
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
                                value={payload.elementOverrides?.[selectedElement.key]?.objectFit || 'cover'}
                                onChange={e =>
                                  setElementOverrideValue(selectedElement.key, {
                                    objectFit: e.target.value as any,
                                  })
                                }
                                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs"
                              >
                                <option value="cover">Cover (Maintain Aspect)</option>
                                <option value="contain">Contain (Full Fit)</option>
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
                              const slot = ARES_COMMANDER_IMAGE_SLOTS.find(
                                s => s.dataPath === selectedElement.dataPath
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
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Page Sections ({orderedSections.length})</h4>
                    <p className="text-[11px] text-slate-500">
                      Show/hide, reorder, jump to, or edit every field in any section.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {orderedSections.map((sec, idx) => {
                      const isHidden = Boolean(payload.hiddenSections?.[sec.id])
                      const isExpanded = expandedSectionId === sec.id
                      return (
                        <div
                          key={sec.id}
                          className={`rounded-xl border transition-all ${
                            isExpanded
                              ? 'border-blue-500 bg-blue-50/20 shadow-xs'
                              : 'border-slate-200 bg-white'
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
                                {isHidden && (
                                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-mono font-bold">
                                    HIDDEN
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">{sec.label}</div>
                            </button>

                            <div className="flex items-center gap-1 shrink-0">
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
                                onClick={() => toggleSectionVisibility(sec.id)}
                                title={isHidden ? 'Show Section' : 'Hide Section'}
                                className={`p-1 rounded cursor-pointer ${
                                  isHidden
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                    : 'hover:bg-slate-100 text-slate-600'
                                }`}
                              >
                                {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
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
                      Page Images ({ARES_COMMANDER_IMAGE_SLOTS.length} Audited Slots)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Upload or replace any image from your computer. All uploads are stored in persistent cloud storage.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {ARES_COMMANDER_IMAGE_SLOTS.map(slot => {
                      const currentSrc =
                        (slot.dataPath ? getByPath(mergedAresData, slot.dataPath) : undefined) ||
                        payload.elementOverrides?.[slot.dataPath || slot.id]?.src ||
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
                          title: 'New ARES Commander Technical Document (PDF)',
                          description: 'Official technical documentation and product resource.',
                          badge: 'PDF Document',
                          buttonLabel: 'Download PDF',
                          fileUrl: 'https://www.graebert.com/cad-software/ares-commander/',
                          originalFileUrl: 'https://www.graebert.com/cad-software/ares-commander/',
                          fileName: 'ARES-Commander-Document.pdf',
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
    </div>
  )
}

export default CadVisualPageEditor
