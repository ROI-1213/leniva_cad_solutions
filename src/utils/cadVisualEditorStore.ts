import React, { createContext, useContext, useEffect, useState } from 'react'
import { pushCmsStateToCloud } from './cloudSync'

export const CAD_VISUAL_DRAFT_KEY = 'leniva_cad_visual_drafts_v1'
export const CAD_VISUAL_PUBLISHED_KEY = 'leniva_cad_visual_published_v1'
export const CAD_VISUAL_REVISIONS_KEY = 'leniva_cad_visual_revisions_v1'

export interface CadElementOverride {
  key: string
  text?: string
  href?: string
  src?: string
  originalSrc?: string
  alt?: string
  fileName?: string
  dimensions?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  hidden?: boolean
  pdfUrl?: string
  pdfName?: string
  pdfSize?: string
  buttonLabel?: string
}

export interface CadPdfResource {
  id: string
  title: string
  description: string
  badge: string
  buttonLabel: string
  fileUrl: string
  originalFileUrl: string
  previousFileUrl?: string
  fileName: string
  fileSize: string
  visible: boolean
  behavior: 'download' | 'new_tab'
}

export interface CadImageSlot {
  id: string
  label: string
  sectionId: string
  dataPath?: string
  defaultSrc: string
  defaultAlt: string
  recommendedDimensions: string
}

export interface CadSectionDefinition {
  id: string
  label: string
  shortLabel: string
  description: string
  category: 'hero' | 'content' | 'technical' | 'commercial' | 'resources' | 'conversion'
}

export interface CadVisualPagePayload {
  productKey: string
  dataOverrides: Record<string, any>
  elementOverrides: Record<string, CadElementOverride>
  pdfResources: CadPdfResource[]
  sectionOrder: string[]
  hiddenSections: Record<string, boolean>
  seo: {
    title: string
    description: string
    keywords?: string
  }
  updatedAt: string
}

export interface CadVisualRevision {
  id: string
  timestamp: string
  label: string
  payload: CadVisualPagePayload
}

export const ARES_COMMANDER_SECTIONS: CadSectionDefinition[] = [
  {
    id: 'hero',
    label: '1. Hero Banner, CTAs, Hero Image & Quick Spec Strip',
    shortLabel: 'Hero & Spec Strip',
    description: 'Brand logos, eyebrow badge, H1 headline, supporting text, feature pills, Trial/Quote/PDF buttons, Hero CAD image, and 6-column Spec Strip.',
    category: 'hero',
  },
  {
    id: 'overview',
    label: '2. Product Overview & 6 Core Capability Cards',
    shortLabel: 'Overview Cards',
    description: 'Overview heading, intro paragraph, and 6 capability cards with subtitles, descriptions, and bullet points.',
    category: 'content',
  },
  {
    id: 'benefits',
    label: '3. Key Productivity & Commercial Benefits (8 Cards)',
    shortLabel: '8 Key Benefits',
    description: 'Numbered 01–08 benefit cards with titles, summaries, and technical details.',
    category: 'content',
  },
  {
    id: 'drafting_3d',
    label: '4. 2D Technical Drafting & 3D Solid CAD Modelling',
    shortLabel: '2D & 3D CAD',
    description: 'Dual interactive panels for 2D Drafting (15 features + floorplan image) and 3D Solid Modelling (9 features + mechanical image).',
    category: 'technical',
  },
  {
    id: 'native_dwg',
    label: '5. Native DWG Compatibility & 4-Step Workflow',
    shortLabel: 'Native DWG',
    description: 'Native DWG format compatibility details, 4-step workflow pipeline, and 6 DWG compatibility highlights.',
    category: 'technical',
  },
  {
    id: 'productivity',
    label: '6. Smart CAD Productivity Tools (6 Cards)',
    shortLabel: 'Productivity Tools',
    description: 'Power Trim, Dimensions Palette, Layer Tools, Property Painter, Drawing Comparison, and Dynamic Blocks.',
    category: 'technical',
  },
  {
    id: 'bim_to_cad',
    label: '7. BIM-to-CAD Automation (Revit & IFC to DWG)',
    shortLabel: 'BIM-to-CAD',
    description: 'BIM-to-CAD heading, capabilities list, engineering schematic image, and 4-step BIM extraction workflow.',
    category: 'technical',
  },
  {
    id: 'trinity',
    label: '8. ARES Trinity Ecosystem (Desktop + Cloud + Mobile)',
    shortLabel: 'ARES Trinity',
    description: 'Trinity banner image, ARES Commander + ARES Kudo + ARES Touch cards, Cloud Storage integrations, and View-Only Sharing.',
    category: 'content',
  },
  {
    id: 'industries',
    label: '9. Industry Applications & Deliverables (4 Cards)',
    shortLabel: 'Industries',
    description: 'AEC, Mechanical, Civil/Infrastructure, and Interior Design cards with industry images and deliverables.',
    category: 'content',
  },
  {
    id: 'cross_platform',
    label: '10. Cross-Platform (Windows, macOS, Linux) & Work Offline',
    shortLabel: 'OS & Offline',
    description: 'Operating system cards for Windows, macOS, and Linux plus the Work Offline licensing callout.',
    category: 'technical',
  },
  {
    id: 'comparison',
    label: '11. Comparison Table (ARES Commander vs ARES Standard)',
    shortLabel: 'Comparison Table',
    description: 'Feature-by-feature comparison matrix between ARES Commander and ARES Standard.',
    category: 'technical',
  },
  {
    id: 'technical_specs',
    label: '12. Technical Specifications & System Requirements',
    shortLabel: 'Technical Specs',
    description: 'Detailed hardware & software specification rows and official system requirements link.',
    category: 'technical',
  },
  {
    id: 'licensing',
    label: '13. Flexible Licensing Options (Annual, Perpetual, Flex)',
    shortLabel: 'Licensing Plans',
    description: 'Annual Subscription, Perpetual License, and Flex Cloud Floating license cards and pricing rules.',
    category: 'commercial',
  },
  {
    id: 'free_trial',
    label: '14. 30-Day Free Trial Callout & Download CTA',
    shortLabel: '30-Day Trial',
    description: 'Dark gradient 30-Day Free Trial section with highlights, trial download URL, and terms note.',
    category: 'conversion',
  },
  {
    id: 'pdf_downloads',
    label: '15. PDF Brochures, Datasheets & Technical Downloads',
    shortLabel: 'PDF Downloads',
    description: 'Downloadable PDF brochures, product datasheets, licensing guides, and technical documentation.',
    category: 'resources',
  },
  {
    id: 'learning_resources',
    label: '16. Learning Resources, Documentation & Academy',
    shortLabel: 'Learning Resources',
    description: '4 official resource & training cards with badges, descriptions, and external/PDF URLs.',
    category: 'resources',
  },
  {
    id: 'testimonials',
    label: '17. Customer & Engineering Team Testimonials',
    shortLabel: 'Testimonials',
    description: 'Customer quotes, authors, roles, and company names.',
    category: 'content',
  },
  {
    id: 'faqs',
    label: '18. Frequently Asked Questions (Searchable Accordion)',
    shortLabel: 'FAQs',
    description: 'Categorized FAQ items with questions, answers, and category tags.',
    category: 'resources',
  },
  {
    id: 'related_products',
    label: '19. Explore Related CAD Software Products',
    shortLabel: 'Related Products',
    description: 'Cross-links to related Graebert ARES CAD software products.',
    category: 'content',
  },
  {
    id: 'enquiry_cta',
    label: '20. Enquiry Form & Final Conversion Banner',
    shortLabel: 'Enquiry & Final CTA',
    description: 'Interactive Quote/Trial enquiry form and bottom CTA banner with Trial & Quote buttons.',
    category: 'conversion',
  },
]

export const ARES_COMMANDER_IMAGE_SLOTS: CadImageSlot[] = [
  {
    id: 'hero_primary_image',
    label: 'Hero Primary Product Screenshot',
    sectionId: 'hero',
    dataPath: 'hero.image',
    defaultSrc: '/images/software/ares-commander.jpg',
    defaultAlt: 'ARES Commander – 2D & 3D DWG CAD Interface Across Desktop, Cloud and Mobile',
    recommendedDimensions: '1280 × 800 px (16:10)',
  },
  {
    id: 'brand_logo_graebert',
    label: 'Hero Brand Logo 1 (Graebert)',
    sectionId: 'hero',
    dataPath: 'hero.brandLogo1',
    defaultSrc: '/images/brands/grabert.png',
    defaultAlt: 'Graebert Logo',
    recommendedDimensions: '240 × 60 px (PNG)',
  },
  {
    id: 'brand_logo_ares',
    label: 'Hero Brand Logo 2 (ARES CAD)',
    sectionId: 'hero',
    dataPath: 'hero.brandLogo2',
    defaultSrc: '/images/brands/ares-cad.png',
    defaultAlt: 'ARES CAD Logo',
    recommendedDimensions: '240 × 60 px (PNG)',
  },
  {
    id: 'drafting_2d_image',
    label: '2D Technical Drafting Architectural Floorplan',
    sectionId: 'drafting_3d',
    dataPath: 'drafting2D.image',
    defaultSrc: '/images/ares-standard/cad-arch-floorplan.jpg',
    defaultAlt: 'ARES Commander 2D Technical Drafting Floorplan',
    recommendedDimensions: '900 × 500 px',
  },
  {
    id: 'modelling_3d_image',
    label: '3D Solid CAD Modelling Mechanical Preview',
    sectionId: 'drafting_3d',
    dataPath: 'modelling3D.image',
    defaultSrc: '/images/ares-standard/cad-mech-drafting.jpg',
    defaultAlt: 'ARES Commander 3D Solid CAD Modelling',
    recommendedDimensions: '900 × 500 px',
  },
  {
    id: 'bim_to_cad_image',
    label: 'BIM-to-CAD Automation Schematic Preview',
    sectionId: 'bim_to_cad',
    dataPath: 'bimToCad.image',
    defaultSrc: '/images/ares-standard/cad-eng-schematic.jpg',
    defaultAlt: 'ARES Commander BIM-to-CAD Drawing Automation',
    recommendedDimensions: '900 × 600 px',
  },
  {
    id: 'trinity_banner_image',
    label: 'ARES Trinity Ecosystem Banner (Desktop, Cloud, Mobile)',
    sectionId: 'trinity',
    dataPath: 'aresTrinity.image',
    defaultSrc: '/images/software/ares-trinity.jpg',
    defaultAlt: 'ARES Trinity of CAD – Desktop, Mobile and Cloud Collaboration',
    recommendedDimensions: '1400 × 650 px',
  },
  {
    id: 'industry_0_image',
    label: 'Industry Card 1: Architecture, Engineering & Construction (AEC)',
    sectionId: 'industries',
    dataPath: 'industries.items.0.image',
    defaultSrc: '/images/ares-standard/ind-architecture.jpg',
    defaultAlt: 'Architecture, Engineering & Construction (AEC)',
    recommendedDimensions: '800 × 450 px',
  },
  {
    id: 'industry_1_image',
    label: 'Industry Card 2: Mechanical & Industrial Manufacturing',
    sectionId: 'industries',
    dataPath: 'industries.items.1.image',
    defaultSrc: '/images/ares-standard/ind-mechanical.jpg',
    defaultAlt: 'Mechanical & Industrial Manufacturing',
    recommendedDimensions: '800 × 450 px',
  },
  {
    id: 'industry_2_image',
    label: 'Industry Card 3: Civil, Infrastructure & Utilities',
    sectionId: 'industries',
    dataPath: 'industries.items.2.image',
    defaultSrc: '/images/ares-standard/ind-civil.jpg',
    defaultAlt: 'Civil, Infrastructure & Utilities',
    recommendedDimensions: '800 × 450 px',
  },
  {
    id: 'industry_3_image',
    label: 'Industry Card 4: Interior Design, Space Planning & Facilities',
    sectionId: 'industries',
    dataPath: 'industries.items.3.image',
    defaultSrc: '/images/ares-standard/ind-interior.jpg',
    defaultAlt: 'Interior Design, Space Planning & Facilities',
    recommendedDimensions: '800 × 450 px',
  },
]

export const DEFAULT_ARES_COMMANDER_PDFS: CadPdfResource[] = [
  {
    id: 'ares-commander-brochure',
    title: 'ARES Commander Product Brochure (PDF)',
    description: 'Complete overview of 2D/3D DWG CAD capabilities, ARES Trinity collaboration, and licensing models.',
    badge: 'Product Brochure',
    buttonLabel: 'Download Brochure PDF',
    fileUrl: 'https://www.graebert.com/cad-software/ares-commander/',
    originalFileUrl: 'https://www.graebert.com/cad-software/ares-commander/',
    fileName: 'ARES-Commander-Product-Brochure.pdf',
    fileSize: '2.4 MB',
    visible: true,
    behavior: 'new_tab',
  },
  {
    id: 'ares-commander-datasheet',
    title: 'ARES Commander Technical Datasheet & System Specs',
    description: 'Detailed DWG version compatibility, ACIS 3D kernel specifications, and OS hardware requirements.',
    badge: 'Technical Datasheet',
    buttonLabel: 'Download Datasheet PDF',
    fileUrl: 'https://www.graebert.com/cad-software/ares-commander/system-requirements/',
    originalFileUrl: 'https://www.graebert.com/cad-software/ares-commander/system-requirements/',
    fileName: 'ARES-Commander-Technical-Datasheet.pdf',
    fileSize: '1.8 MB',
    visible: true,
    behavior: 'new_tab',
  },
  {
    id: 'ares-commander-bim-guide',
    title: 'BIM-to-CAD DWG Automation Guide (Revit & IFC)',
    description: 'How to import RVT and IFC models and automate 2D DWG floorplans, sections, and elevations.',
    badge: 'Workflow Guide',
    buttonLabel: 'Download BIM Guide PDF',
    fileUrl: 'https://www.graebert.com/cad-software/ares-commander/new-features/',
    originalFileUrl: 'https://www.graebert.com/cad-software/ares-commander/new-features/',
    fileName: 'ARES-Commander-BIM-to-CAD-Guide.pdf',
    fileSize: '3.1 MB',
    visible: true,
    behavior: 'new_tab',
  },
  {
    id: 'ares-commander-licensing-guide',
    title: 'Enterprise Licensing Comparison (Annual, Perpetual & Flex)',
    description: 'Side-by-side comparison of Single User, Perpetual + Maintenance, and Flex Cloud Floating licenses.',
    badge: 'Licensing Guide',
    buttonLabel: 'Download Licensing PDF',
    fileUrl: 'https://www.graebert.com/cad-software/ares-commander/buy/',
    originalFileUrl: 'https://www.graebert.com/cad-software/ares-commander/buy/',
    fileName: 'ARES-Commander-Licensing-Guide.pdf',
    fileSize: '1.2 MB',
    visible: true,
    behavior: 'new_tab',
  },
]

export function getDefaultVisualPayload(productKey: string): CadVisualPagePayload {
  const isAresCommander = productKey === 'ares_commander'
  return {
    productKey,
    dataOverrides: {},
    elementOverrides: {},
    pdfResources: isAresCommander ? structuredCloneSafe(DEFAULT_ARES_COMMANDER_PDFS) : [
      {
        id: `${productKey}-brochure`,
        title: 'Product Brochure & Technical Datasheet (PDF)',
        description: 'Official product brochure, feature overview, and system requirements.',
        badge: 'PDF Brochure',
        buttonLabel: 'Download Brochure PDF',
        fileUrl: 'https://www.graebert.com/',
        originalFileUrl: 'https://www.graebert.com/',
        fileName: `${productKey.replace(/_/g, '-')}-brochure.pdf`,
        fileSize: '2.1 MB',
        visible: true,
        behavior: 'new_tab',
      },
    ],
    sectionOrder: ARES_COMMANDER_SECTIONS.map(s => s.id),
    hiddenSections: {},
    seo: {
      title: isAresCommander
        ? 'ARES Commander – 2D & 3D DWG CAD Software | Authorized Partner Leniva CAD Solutions'
        : `${productKey.replace(/_/g, ' ').toUpperCase()} | Leniva CAD Solutions`,
      description: isAresCommander
        ? 'Buy ARES Commander in India. Native DWG 2D & 3D CAD software for Windows, macOS & Linux with ARES Trinity Cloud & Mobile collaboration. Start a free 30-day trial or request a quote.'
        : 'Authorized CAD software solutions, licensing, and technical support from Leniva CAD Solutions.',
    },
    updatedAt: new Date().toISOString(),
  }
}

export function structuredCloneSafe<T>(val: T): T {
  try {
    return JSON.parse(JSON.stringify(val))
  } catch {
    return val
  }
}

export function getByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined
  const parts = path.split('.')
  let cur = obj
  for (const part of parts) {
    if (cur == null) return undefined
    const idx = Number(part)
    cur = !Number.isNaN(idx) && Array.isArray(cur) ? cur[idx] : cur[part]
  }
  return cur
}

export function setByPath<T extends Record<string, any>>(obj: T, path: string, value: any): T {
  const clone = structuredCloneSafe(obj || ({} as T))
  const parts = path.split('.')
  let cur: any = clone
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    const nextPart = parts[i + 1]
    const nextIsIndex = !Number.isNaN(Number(nextPart))
    if (cur[part] == null || typeof cur[part] !== 'object') {
      cur[part] = nextIsIndex ? [] : {}
    } else if (Array.isArray(cur[part])) {
      cur[part] = [...cur[part]]
    } else {
      cur[part] = { ...cur[part] }
    }
    cur = cur[part]
  }
  const lastPart = parts[parts.length - 1]
  cur[lastPart] = value
  return clone
}

export function deepMergeData<T>(base: T, override: any): T {
  if (override === undefined) return base
  if (override === null || typeof override !== 'object' || typeof base !== 'object' || base === null) {
    return override as T
  }
  if (Array.isArray(base)) {
    if (Array.isArray(override)) {
      return override as unknown as T
    }
    // Support sparse index overrides on arrays (e.g. { "0": { title: "..." } })
    const arrClone = [...base]
    for (const [k, v] of Object.entries(override)) {
      const idx = Number(k)
      if (!Number.isNaN(idx)) {
        arrClone[idx] = deepMergeData(arrClone[idx], v)
      }
    }
    return arrClone as unknown as T
  }
  const result: Record<string, any> = { ...(base as any) }
  for (const key of Object.keys(override)) {
    result[key] = deepMergeData(result[key], override[key])
  }
  return result as T
}

function readJsonMap<T>(storageKey: string): Record<string, T> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeJsonMap<T>(storageKey: string, map: Record<string, T>) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(map))
  } catch (err) {
    console.error(`Failed writing ${storageKey}:`, err)
  }
}

export function getPublishedVisualPayload(productKey: string): CadVisualPagePayload | null {
  const all = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_PUBLISHED_KEY)
  const found = all[productKey]
  if (!found) return null
  const def = getDefaultVisualPayload(productKey)
  return {
    ...def,
    ...found,
    dataOverrides: found.dataOverrides || {},
    elementOverrides: found.elementOverrides || {},
    pdfResources: Array.isArray(found.pdfResources) && found.pdfResources.length > 0 ? found.pdfResources : def.pdfResources,
    sectionOrder: Array.isArray(found.sectionOrder) && found.sectionOrder.length > 0 ? found.sectionOrder : def.sectionOrder,
    hiddenSections: found.hiddenSections || {},
    seo: { ...def.seo, ...(found.seo || {}) },
  }
}

export function getDraftVisualPayload(productKey: string): CadVisualPagePayload | null {
  const all = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_DRAFT_KEY)
  const found = all[productKey]
  if (!found) return null
  const def = getDefaultVisualPayload(productKey)
  return {
    ...def,
    ...found,
    dataOverrides: found.dataOverrides || {},
    elementOverrides: found.elementOverrides || {},
    pdfResources: Array.isArray(found.pdfResources) && found.pdfResources.length > 0 ? found.pdfResources : def.pdfResources,
    sectionOrder: Array.isArray(found.sectionOrder) && found.sectionOrder.length > 0 ? found.sectionOrder : def.sectionOrder,
    hiddenSections: found.hiddenSections || {},
    seo: { ...def.seo, ...(found.seo || {}) },
  }
}

export function getWorkingVisualPayload(productKey: string): {
  payload: CadVisualPagePayload
  hasDraft: boolean
  isPublished: boolean
  lastSavedAt: string | null
  lastPublishedAt: string | null
} {
  const draft = getDraftVisualPayload(productKey)
  const published = getPublishedVisualPayload(productKey)
  const base = draft || published || getDefaultVisualPayload(productKey)
  return {
    payload: structuredCloneSafe(base),
    hasDraft: Boolean(draft),
    isPublished: Boolean(published),
    lastSavedAt: draft?.updatedAt || null,
    lastPublishedAt: published?.updatedAt || null,
  }
}

export function saveVisualDraft(productKey: string, payload: CadVisualPagePayload): CadVisualPagePayload {
  const allDrafts = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_DRAFT_KEY)
  const stamped: CadVisualPagePayload = {
    ...structuredCloneSafe(payload),
    productKey,
    updatedAt: new Date().toISOString(),
  }
  allDrafts[productKey] = stamped
  writeJsonMap(CAD_VISUAL_DRAFT_KEY, allDrafts)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('leniva_cad_visual_draft_updated'))
  }
  return stamped
}

export function discardVisualDraft(productKey: string): CadVisualPagePayload {
  const allDrafts = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_DRAFT_KEY)
  delete allDrafts[productKey]
  writeJsonMap(CAD_VISUAL_DRAFT_KEY, allDrafts)
  const fallback = getPublishedVisualPayload(productKey) || getDefaultVisualPayload(productKey)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('leniva_cad_visual_draft_updated'))
  }
  return structuredCloneSafe(fallback)
}

export async function publishVisualPayload(
  productKey: string,
  payload: CadVisualPagePayload,
  revisionLabel = 'Published from Visual Page Editor'
): Promise<{ published: CadVisualPagePayload; syncedToCloud: boolean }> {
  const now = new Date().toISOString()
  const stamped: CadVisualPagePayload = {
    ...structuredCloneSafe(payload),
    productKey,
    updatedAt: now,
  }

  // 1. Save to Published Map
  const allPublished = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_PUBLISHED_KEY)
  allPublished[productKey] = stamped
  writeJsonMap(CAD_VISUAL_PUBLISHED_KEY, allPublished)

  // 2. Remove from Unsaved Drafts Map (since draft is now published)
  const allDrafts = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_DRAFT_KEY)
  delete allDrafts[productKey]
  writeJsonMap(CAD_VISUAL_DRAFT_KEY, allDrafts)

  // 3. Push Revision Snapshot (keep up to 10 revisions per product)
  const allRevisions = readJsonMap<CadVisualRevision[]>(CAD_VISUAL_REVISIONS_KEY)
  const productRevisions = Array.isArray(allRevisions[productKey]) ? allRevisions[productKey] : []
  const newRevision: CadVisualRevision = {
    id: `rev_${Date.now()}`,
    timestamp: now,
    label: revisionLabel,
    payload: structuredCloneSafe(stamped),
  }
  allRevisions[productKey] = [newRevision, ...productRevisions].slice(0, 10)
  writeJsonMap(CAD_VISUAL_REVISIONS_KEY, allRevisions)

  // 4. Also sync key Hero / Identity fields into leniva_cad_software_edits for cross-tab compatibility
  try {
    const cadEditsRaw = window.localStorage.getItem('leniva_cad_software_edits')
    const cadEditsMap = cadEditsRaw ? JSON.parse(cadEditsRaw) : {}
    const existingEdits = cadEditsMap[productKey] || {}
    const ov = stamped.dataOverrides || {}
    const updatedEdits: Record<string, any> = { ...existingEdits }
    if (ov.hero?.headline) {
      updatedEdits.headline = ov.hero.headline
      updatedEdits.heroHeading = ov.hero.headline
    }
    if (ov.hero?.supportingText) {
      updatedEdits.supportingHeadline = ov.hero.supportingText
      updatedEdits.heroSupportingText = ov.hero.supportingText
    }
    if (ov.hero?.eyebrow) updatedEdits.eyebrow = ov.hero.eyebrow
    if (ov.hero?.image) updatedEdits.heroImage = ov.hero.image
    if (ov.identity?.downloadUrl) {
      updatedEdits.downloadUrl = ov.identity.downloadUrl
      updatedEdits.trialUrl = ov.identity.downloadUrl
    }
    if (ov.overview?.description) updatedEdits.description = ov.overview.description
    cadEditsMap[productKey] = updatedEdits
    window.localStorage.setItem('leniva_cad_software_edits', JSON.stringify(cadEditsMap))
  } catch {
    // ignore secondary sync errors
  }

  // 5. Notify all listeners on the client immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('leniva_cad_visual_updated'))
    window.dispatchEvent(new Event('leniva_cad_edits_updated'))
    window.dispatchEvent(new Event('leniva_products_catalog_updated'))
  }

  // 6. Push to Cloud CMS so all public visitors see the published changes immediately
  let syncedToCloud = false
  try {
    syncedToCloud = await pushCmsStateToCloud()
  } catch {
    syncedToCloud = false
  }

  return { published: stamped, syncedToCloud }
}

export function getVisualRevisions(productKey: string): CadVisualRevision[] {
  const allRevisions = readJsonMap<CadVisualRevision[]>(CAD_VISUAL_REVISIONS_KEY)
  return Array.isArray(allRevisions[productKey]) ? allRevisions[productKey] : []
}

export interface PersistentUploadResult {
  url: string
  fileName: string
  fileSize: string
  mimeType: string
  dimensions?: string
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

async function readImageDimensions(file: File): Promise<string | undefined> {
  if (!file.type.startsWith('image/')) return undefined
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const dims = `${img.naturalWidth} × ${img.naturalHeight} px`
      URL.revokeObjectURL(url)
      resolve(dims)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(undefined)
    }
    img.src = url
  })
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const res = typeof reader.result === 'string' ? reader.result : ''
      const base64 = res.includes(',') ? res.split(',')[1] : res
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Validates and uploads an Image or PDF file to persistent cloud storage.
 * Never returns temporary blob: URLs.
 * Priority:
 * 1. /api/storage/upload (Vercel Blob / S3 / Bytebin backend endpoint)
 * 2. Direct Bytebin Cloud CDN (https://bytebin.lucko.me/post) returning a permanent HTTPS URL
 */
export async function uploadAssetToPersistentStorage(
  file: File,
  kind: 'image' | 'pdf',
  onProgress?: (percent: number, statusText: string) => void
): Promise<PersistentUploadResult> {
  if (kind === 'image') {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!allowedImageTypes.includes(file.type)) {
      throw new Error('Unsupported image format. Allowed formats: JPG, PNG, WebP, SVG.')
    }
    if (file.size > 15 * 1024 * 1024) {
      throw new Error('Image exceeds maximum file size of 15 MB.')
    }
    if (file.type === 'image/svg+xml') {
      const svgText = await file.text()
      if (/<script[\s>]|onload=|onerror=|javascript:/i.test(svgText)) {
        throw new Error('SVG contains unsafe script attributes and was rejected.')
      }
    }
  } else {
    const isPdfMime = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isPdfMime) {
      throw new Error('Invalid file type. Please select a valid PDF document (.pdf).')
    }
    if (file.size > 25 * 1024 * 1024) {
      throw new Error('PDF file exceeds maximum limit of 25 MB.')
    }
    // Check %PDF magic header
    const headerBuf = await file.slice(0, 5).arrayBuffer()
    const headerStr = new TextDecoder().decode(headerBuf)
    if (!headerStr.startsWith('%PDF')) {
      throw new Error('Selected file does not have a valid PDF signature (%PDF).')
    }
  }

  onProgress?.(20, 'Validating file & reading metadata...')
  const dimensions = kind === 'image' ? await readImageDimensions(file) : undefined
  const formattedSize = formatBytes(file.size)

  // Strategy 1: Try /api/storage/upload first
  try {
    onProgress?.(45, 'Uploading to persistent cloud storage...')
    const base64Data = await fileToBase64(file)
    const apiRes = await fetch('/api/storage/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type || (kind === 'pdf' ? 'application/pdf' : 'image/jpeg'),
        dataBase64: base64Data,
      }),
    })
    if (apiRes.ok) {
      const json = await apiRes.json()
      if (json?.ok && typeof json.url === 'string' && json.url.startsWith('http')) {
        onProgress?.(100, 'Upload complete!')
        return {
          url: json.url,
          fileName: file.name,
          fileSize: formattedSize,
          mimeType: file.type || (kind === 'pdf' ? 'application/pdf' : 'image/jpeg'),
          dimensions,
        }
      }
    }
  } catch {
    // Fallback to direct Bytebin CDN upload below
  }

  // Strategy 2: Direct upload to Bytebin Cloud CDN (returns permanent HTTPS URL)
  onProgress?.(70, 'Uploading asset to Cloud CDN...')
  const cdnRes = await fetch('https://bytebin.lucko.me/post', {
    method: 'POST',
    headers: {
      'Content-Type': file.type || (kind === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
    },
    body: file,
  })

  if (!cdnRes.ok) {
    throw new Error(`Cloud storage upload failed with status ${cdnRes.status}. Please try again.`)
  }

  const cdnJson = await cdnRes.json()
  if (!cdnJson?.key) {
    throw new Error('Cloud storage did not return a valid asset key.')
  }

  const permanentUrl = `https://bytebin.lucko.me/${cdnJson.key}`
  onProgress?.(100, 'Upload complete!')

  return {
    url: permanentUrl,
    fileName: file.name,
    fileSize: formattedSize,
    mimeType: file.type || (kind === 'pdf' ? 'application/pdf' : 'image/jpeg'),
    dimensions,
  }
}

export interface CadVisualEditorContextValue {
  isEditorMode: boolean
  isPreviewMode: boolean
  productKey: string
  payload: CadVisualPagePayload
  selectedElementKey: string | null
  selectedSectionId: string | null
  onSelectElement?: (info: {
    key: string
    kind: 'text' | 'image' | 'link' | 'pdf'
    label: string
    currentText?: string
    currentHref?: string
    currentSrc?: string
    currentAlt?: string
    dataPath?: string
    sectionId?: string
  }) => void
  onSelectSection?: (sectionId: string) => void
  onInlineTextChange?: (key: string, newText: string, dataPath?: string) => void
}

export const CadVisualEditorContext = createContext<CadVisualEditorContextValue | null>(null)

export function useCadVisualEditorContext() {
  return useContext(CadVisualEditorContext)
}

export function useActiveCadVisualPayload(productKey: string): {
  payload: CadVisualPagePayload
  isEditorMode: boolean
  isPreviewMode: boolean
} {
  const editorCtx = useContext(CadVisualEditorContext)
  const [publishedPayload, setPublishedPayload] = useState<CadVisualPagePayload>(() => {
    return getPublishedVisualPayload(productKey) || getDefaultVisualPayload(productKey)
  })

  useEffect(() => {
    if (editorCtx && editorCtx.productKey === productKey) return
    const refresh = () => {
      setPublishedPayload(getPublishedVisualPayload(productKey) || getDefaultVisualPayload(productKey))
    }
    refresh()
    window.addEventListener('leniva_cad_visual_updated', refresh)
    window.addEventListener('leniva_cloud_cms_synced', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('leniva_cad_visual_updated', refresh)
      window.removeEventListener('leniva_cloud_cms_synced', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [productKey, editorCtx])

  if (editorCtx && editorCtx.productKey === productKey) {
    return {
      payload: editorCtx.payload,
      isEditorMode: editorCtx.isEditorMode,
      isPreviewMode: editorCtx.isPreviewMode,
    }
  }

  return {
    payload: publishedPayload,
    isEditorMode: false,
    isPreviewMode: false,
  }
}

export function applyCadVisualOverridesToRoot(root: HTMLElement, payload: CadVisualPagePayload) {
  if (!root || !payload) return

  // 1. Apply SEO title & description when on public product page
  if (typeof document !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
    if (payload.seo?.title) {
      document.title = payload.seo.title
    }
    if (payload.seo?.description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', payload.seo.description)
    }
  }

  // 2. Apply section visibility and section ordering
  const sectionNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-cad-section]'))
  const hiddenMap = payload.hiddenSections || {}
  const orderList = Array.isArray(payload.sectionOrder) ? payload.sectionOrder : []
  const defaultOrder = ARES_COMMANDER_SECTIONS.map(s => s.id)
  const isCustomOrder =
    orderList.length > 0 && orderList.some((id, idx) => id !== defaultOrder[idx])

  for (const sec of sectionNodes) {
    const secId = sec.getAttribute('data-cad-section') || ''
    if (hiddenMap[secId]) {
      sec.style.display = 'none'
    } else {
      sec.style.display = ''
    }
    sec.style.width = '100%'
    if (isCustomOrder) {
      const orderIdx = orderList.indexOf(secId)
      if (orderIdx !== -1 && sec.parentElement) {
        sec.parentElement.style.display = 'flex'
        sec.parentElement.style.flexDirection = 'column'
        sec.parentElement.style.width = '100%'
        sec.style.order = String(orderIdx + 1)
      }
    } else {
      sec.style.order = ''
    }
  }

  // 3. Apply elementOverrides (text, href, src, alt, objectFit, hidden)
  const overrides = payload.elementOverrides || {}
  for (const [elKey, ov] of Object.entries(overrides)) {
    if (!ov) continue
    const target = findElementByCadKey(root, elKey)
    if (!target) continue

    if (ov.hidden !== undefined) {
      target.style.display = ov.hidden ? 'none' : ''
    }
    if (target instanceof HTMLImageElement) {
      if (ov.src) target.src = ov.src
      if (ov.alt !== undefined) target.alt = ov.alt
      if (ov.objectFit) target.style.objectFit = ov.objectFit
    } else {
      if (ov.text !== undefined && target.childElementCount === 0) {
        target.textContent = ov.text
      } else if (ov.text !== undefined && target.hasAttribute('data-cad-text-leaf')) {
        target.textContent = ov.text
      }
      if (target instanceof HTMLAnchorElement) {
        if (ov.pdfUrl) {
          target.href = ov.pdfUrl
        } else if (ov.href) {
          target.href = ov.href
        }
        if (ov.buttonLabel !== undefined) {
          const textSpan = target.querySelector('[data-cad-btn-text]')
          if (textSpan) textSpan.textContent = ov.buttonLabel
          else if (target.childElementCount === 0) target.textContent = ov.buttonLabel
        }
      }
    }
  }
}

/**
 * Runtime DOM decorator hook that applies `elementOverrides`, `hiddenSections`, and `sectionOrder`
 * to a container element both inside the Admin Visual Editor AND on the public live frontend!
 */
export function useApplyCadVisualDomOverrides(
  containerRef: React.RefObject<HTMLElement | null>,
  productKey: string
) {
  const { payload } = useActiveCadVisualPayload(productKey)

  useEffect(() => {
    const root = containerRef.current
    if (!root || !payload) return
    applyCadVisualOverridesToRoot(root, payload)
  }, [containerRef, payload])
}

export function useApplyGlobalCadVisualOverrides(productKey: string) {
  const { payload } = useActiveCadVisualPayload(productKey)

  useEffect(() => {
    if (typeof document === 'undefined' || !payload) return
    const timer = setTimeout(() => {
      const root =
        document.querySelector<HTMLElement>('[data-cad-editor-canvas]') ||
        document.querySelector<HTMLElement>('main') ||
        document.body
      if (root) {
        applyCadVisualOverridesToRoot(root, payload)
      }
    }, 30)
    return () => clearTimeout(timer)
  }, [productKey, payload])
}

export function findElementByCadKey(root: HTMLElement, elKey: string): HTMLElement | null {
  const byAttr = root.querySelector<HTMLElement>(`[data-cad-key="${CSS.escape(elKey)}"]`)
  if (byAttr) return byAttr

  const byPath = root.querySelector<HTMLElement>(`[data-cad-path="${CSS.escape(elKey)}"]`)
  if (byPath) return byPath

  // Fallback deterministic tag:index lookup (e.g. "auto:h2:3" or "auto:img:2")
  if (elKey.startsWith('auto:')) {
    const [, tag, idxStr] = elKey.split(':')
    const idx = Number(idxStr)
    if (tag && !Number.isNaN(idx)) {
      const list = root.querySelectorAll<HTMLElement>(tag)
      return list[idx] || null
    }
  }
  return null
}

export function computeDeterministicCadKey(root: HTMLElement, target: HTMLElement): string {
  const explicitKey = target.getAttribute('data-cad-key') || target.getAttribute('data-cad-path')
  if (explicitKey) return explicitKey

  const tag = target.tagName.toLowerCase()
  const allSameTag = Array.from(root.querySelectorAll<HTMLElement>(tag))
  const idx = allSameTag.indexOf(target)
  return `auto:${tag}:${idx >= 0 ? idx : 0}`
}
