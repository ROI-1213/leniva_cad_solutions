import { useState, useEffect } from 'react'
import { useActiveCadVisualPayload, deepMergeData, useApplyGlobalCadVisualOverrides } from './cadVisualEditorStore'
import { aresCommanderData as _aresCommanderData } from '../data/aresCommanderData'
import { aresStandardData as _aresStandardData } from '../data/aresStandardData'
import { aresMechanicalData as _aresMechanicalData } from '../data/aresMechanicalData'
import { aresElectricalData as _aresElectricalData } from '../data/aresElectricalData'
import { aresKudoData as _aresKudoData } from '../data/aresKudoData'
import { aresTouchData as _aresTouchData } from '../data/aresTouchData'
import { sketchupProData as _sketchupProData } from '../data/sketchupProData'
import { proScanData as _proScanData } from '../data/proScanData'
import { sketchupProAdvancedData as _sketchupProAdvancedData } from '../data/sketchupProAdvancedData'
import { sketchUpStudioData as _sketchUpStudioData } from '../data/sketchupStudioData'
import { enscapeData as _enscapeData } from '../data/enscapeData'
import { vrayData as _vrayData } from '../data/vrayData'
import { coronaData as _coronaData } from '../data/coronaData'

const aresCommanderData: any = _aresCommanderData
const aresStandardData: any = _aresStandardData
const aresMechanicalData: any = _aresMechanicalData
const aresElectricalData: any = _aresElectricalData
const aresKudoData: any = _aresKudoData
const aresTouchData: any = _aresTouchData
const sketchupProData: any = _sketchupProData
const proScanData: any = _proScanData
const sketchupProAdvancedData: any = _sketchupProAdvancedData
const sketchUpStudioData: any = _sketchUpStudioData
const enscapeData: any = _enscapeData
const vrayData: any = _vrayData
const coronaData: any = _coronaData

export interface CadEnabledSections {
  hero: boolean
  specStrip: boolean
  overview: boolean
  features: boolean
  requirements: boolean
  faqs: boolean
  licensing: boolean
}

export const DEFAULT_CAD_SECTIONS: CadEnabledSections = {
  hero: true,
  specStrip: true,
  overview: true,
  features: true,
  requirements: true,
  faqs: true,
  licensing: true,
}

export const CAD_SECTION_METADATA: {
  key: keyof CadEnabledSections
  label: string
  shortLabel: string
  description: string
  iconName: string
}[] = [
  {
    key: 'hero',
    label: 'Hero Banner & Header',
    shortLabel: 'Hero Banner',
    description: 'Main product title, badge, headline, hero imagery, and primary CTA buttons.',
    iconName: 'Layout',
  },
  {
    key: 'specStrip',
    label: 'Quick Spec Strip Counters',
    shortLabel: 'Spec Strip',
    description: 'Horizontal quick-specs strip (Format, OS, Engine, Licensing) below the hero.',
    iconName: 'Sliders',
  },
  {
    key: 'overview',
    label: 'Overview & Feature Cards',
    shortLabel: 'Overview Cards',
    description: 'Product narrative paragraph and multi-column visual capability cards.',
    iconName: 'Box',
  },
  {
    key: 'features',
    label: 'Deep Features & Standards',
    shortLabel: 'Features & Standards',
    description: 'Comprehensive engineering feature bullets, technical standards, and tool highlights.',
    iconName: 'Award',
  },
  {
    key: 'requirements',
    label: 'System Requirements Table',
    shortLabel: 'System Requirements',
    description: 'Supported OS, CPU, RAM, GPU, storage space, and display resolution specs.',
    iconName: 'Monitor',
  },
  {
    key: 'faqs',
    label: 'FAQs Accordion Manager',
    shortLabel: 'FAQs Section',
    description: 'Interactive FAQ accordion answering common customer licensing and technical questions.',
    iconName: 'HelpCircle',
  },
  {
    key: 'licensing',
    label: 'CTAs, Licensing & Lead Routing',
    shortLabel: 'CTAs & Licensing',
    description: 'Trial download button, request quote form, licensing notes, and email routing.',
    iconName: 'FileText',
  },
]

export interface CadProductItem {
  key: string
  slug?: string
  label: string
  brand: string
  route: string
  color: string
  category: string
  isCustom?: boolean
}

export const DEFAULT_CAD_PRODUCTS: CadProductItem[] = [
  { key: 'ares_commander',   slug: 'ares-commander',   label: 'ARES Commander',                  brand: 'Graebert', route: '/products/ares-commander',   color: 'blue',   category: '2D & 3D DWG CAD Software' },
  { key: 'ares_standard',    slug: 'ares-standard',    label: 'ARES Standard',                   brand: 'Graebert', route: '/products/ares-standard',    color: 'slate',  category: '2D DWG CAD Software' },
  { key: 'ares_mechanical',  slug: 'ares-mechanical',  label: 'ARES Mechanical',                 brand: 'Graebert', route: '/products/ares-mechanical',  color: 'blue',   category: '2D Mechanical CAD' },
  { key: 'ares_electrical',  slug: 'ares-electrical',  label: 'ARES Electrical',                 brand: 'Graebert', route: '/products/ares-electrical',  color: 'yellow', category: 'Electrical CAD (ECAD)' },
  { key: 'ares_kudo',        slug: 'ares-kudo',        label: 'ARES Kudo',                       brand: 'Graebert', route: '/products/ares-kudo',        color: 'cyan',   category: 'Cloud-Native Browser DWG CAD' },
  { key: 'ares_touch',       slug: 'ares-touch',       label: 'ARES Touch',                      brand: 'Graebert', route: '/products/ares-touch',       color: 'indigo', category: 'Mobile DWG CAD for Android & iOS' },
  { key: 'sketchup_pro',     slug: 'sketchup',         label: 'SketchUp Pro',                    brand: 'Trimble',  route: '/products/sketchup',         color: 'blue',   category: '3D Modeling & Documentation' },
  { key: 'sketchup_proscan', slug: 'sketchup-scan',    label: 'SketchUp Pro + Scan Essentials',  brand: 'Trimble',  route: '/products/sketchup-scan',    color: 'teal',   category: 'Scan-to-BIM & Point Cloud Modeling' },
  { key: 'sketchup_advanced',slug: 'sketchup-advanced',label: 'SketchUp Pro Advanced Workflows', brand: 'Trimble',  route: '/products/sketchup-advanced',color: 'sky',    category: 'BIM Interoperability & Point Cloud Bundle' },
  { key: 'sketchup_studio',  slug: 'sketchup-studio',  label: 'SketchUp Studio',                 brand: 'Trimble',  route: '/products/sketchup-studio',  color: 'green',  category: 'Complete 3D Modeling, Point Cloud & Rendering Suite' },
  { key: 'chaos_enscape',    slug: 'enscape',          label: 'Chaos Enscape',                   brand: 'Chaos',    route: '/products/enscape',          color: 'purple', category: 'Real-Time Rendering & VR' },
  { key: 'chaos_vray',       slug: 'vray',             label: 'Chaos V-Ray',                     brand: 'Chaos',    route: '/products/vray',             color: 'orange', category: 'Photorealistic Ray-Traced Rendering' },
  { key: 'chaos_corona',     slug: 'corona',           label: 'Chaos Corona',                    brand: 'Chaos',    route: '/products/corona',           color: 'amber',  category: 'Photorealistic Architectural Rendering' },
]

export const CAD_KEY_TO_SLUG_MAP: Record<string, string> = {
  ares_commander: 'ares-commander',
  ares_standard: 'ares-standard',
  ares_mechanical: 'ares-mechanical',
  ares_electrical: 'ares-electrical',
  ares_kudo: 'ares-kudo',
  ares_touch: 'ares-touch',
  ares_trinity: 'ares-trinity',
  sketchup_pro: 'sketchup',
  sketchup_proscan: 'sketchup-scan',
  sketchup_advanced: 'sketchup-advanced',
  sketchup_studio: 'sketchup-studio',
  chaos_enscape: 'enscape',
  chaos_vray: 'vray',
  chaos_corona: 'corona',
}

export const CAD_DEFAULTS: Record<string, any> = {
  ares_commander: {
    productName: aresCommanderData.identity?.productName || 'ARES Commander',
    brand: aresCommanderData.identity?.brand || 'Graebert',
    category: aresCommanderData.identity?.category || '2D & 3D DWG CAD Software',
    headline: aresCommanderData.hero?.headline || 'Powerful DWG CAD for 2D & 3D Design Across Desktop, Cloud and Mobile',
    supportingHeadline: aresCommanderData.hero?.supportingText || 'Create, modify and collaborate on DWG drawings with industry-grade drafting tools.',
    shortDescription: aresCommanderData.hero?.shortDescription || aresCommanderData.identity?.valueProposition || '',
    description: aresCommanderData.overview?.description || '',
    platform: aresCommanderData.identity?.supportedPlatforms || 'Windows 10/11 (64-bit), macOS, Linux',
    languages: Array.isArray(aresCommanderData.identity?.languages) ? aresCommanderData.identity.languages.join(', ') : 'English, German, French, Spanish, Japanese, Korean',
    primaryFormat: aresCommanderData.identity?.primaryFormat || 'Native DWG (up to latest format), DXF, DWF, DWT',
    cadEngine: aresCommanderData.identity?.cadEngine || 'Graebert Native DWG CAD Engine',
    officialUrl: aresCommanderData.identity?.officialUrl || 'https://www.graebert.com/cad-software/ares-commander/',
    downloadUrl: aresCommanderData.identity?.downloadUrl || 'https://www.graebert.com/cad-software/ares-commander/',
    trialUrl: aresCommanderData.identity?.downloadUrl || 'https://www.graebert.com/cad-software/ares-commander/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresCommanderData.licensing?.description || 'Available as Annual Plan, Perpetual License, or Flex Cloud Floating License.',
    eyebrow: aresCommanderData.hero?.eyebrow || 'GRAEBERT | NATIVE DWG 2D & 3D CAD',
    h1Highlight: 'Desktop, Cloud and Mobile',
    heroBadge: aresCommanderData.hero?.badge || 'Trinity of CAD Enabled',
    heroHeading: aresCommanderData.hero?.headline || 'Powerful DWG CAD for 2D & 3D Design Across Desktop, Cloud and Mobile',
    heroSupportingText: aresCommanderData.hero?.supportingText || '',
    heroImage: aresCommanderData.hero?.image || '/images/ares-commander/ares-commander-hero.jpg',
    secondaryImage: (aresCommanderData.hero as any)?.heroSecondaryImage || '/images/ares-commander/ares-commander-hero.jpg',
    trialCta: 'Start Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (aresCommanderData.hero?.strip || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresCommanderData.overview?.heading || 'Engineered for Productive DWG Workflows',
      subtitle: '2D & 3D DWG CAD Flagship',
      description: aresCommanderData.overview?.description || '',
      cards: (aresCommanderData.overview?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || c.desc || '',
        icon: c.icon || 'Box',
        image: c.image || '/images/ares-commander/ares-commander-hero.jpg',
      })),
    },
    highlights: [...(aresCommanderData.hero?.featureLabels || [])],
    requirements: {
      os: aresCommanderData.technicalSpecs?.specs?.[0]?.value || 'Windows 10 / 11 (64-bit), macOS, Linux',
      cpu: aresCommanderData.technicalSpecs?.specs?.[2]?.value || '64-bit Intel Core i5 / AMD Ryzen 5 or higher',
      ram: aresCommanderData.technicalSpecs?.specs?.[3]?.value || '8 GB RAM minimum (16 GB+ recommended)',
      gpu: aresCommanderData.technicalSpecs?.specs?.[4]?.value || 'OpenGL 3.2+ / DirectX 11 compatible 3D GPU',
      disk: '2 GB+ free SSD space',
      display: aresCommanderData.technicalSpecs?.specs?.[5]?.value || 'Full HD (1920 × 1080) or 4K UHD display',
    },
    faqs: (aresCommanderData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  ares_standard: {
    productName: aresStandardData.identity?.productName || 'ARES Standard',
    brand: aresStandardData.identity?.brand || 'Graebert',
    category: aresStandardData.identity?.category || '2D DWG CAD Software',
    headline: aresStandardData.hero?.heading || 'Precision 2D DWG CAD — Built for Everyday Drafting',
    supportingHeadline: aresStandardData.hero?.supportingText || 'Cost-effective 2D DWG CAD software for engineers, architects, and technical drafters.',
    shortDescription: aresStandardData.identity?.coreMessage || aresStandardData.hero?.supportingText || '',
    description: aresStandardData.overview?.description || '',
    platform: aresStandardData.identity?.platform || 'Windows 10 / 11 (64-bit)',
    languages: Array.isArray(aresStandardData.identity?.languages) ? aresStandardData.identity.languages.join(', ') : 'English, German, French, Spanish, Japanese',
    primaryFormat: aresStandardData.identity?.primaryFormat || 'Native DWG, DXF, DWF, DWT',
    cadEngine: 'Graebert Native DWG 2D CAD Engine',
    officialUrl: aresStandardData.identity?.officialUrl || 'https://www.graebert.com/cad-software/ares-standard/',
    downloadUrl: aresStandardData.identity?.downloadUrl || 'https://www.graebert.com/cad-software/ares-standard/',
    trialUrl: aresStandardData.identity?.trialUrl || 'https://www.graebert.com/cad-software/ares-standard/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresStandardData.licensing?.description || 'Available as Perpetual License or Annual Plan.',
    eyebrow: aresStandardData.hero?.eyebrow || 'GRAEBERT | COST-EFFECTIVE 2D DWG CAD',
    h1Highlight: 'Everyday Drafting',
    heroBadge: aresStandardData.hero?.badge || 'Native DWG 2D CAD',
    heroHeading: aresStandardData.hero?.heading || 'Precision 2D DWG CAD — Built for Everyday Drafting',
    heroSupportingText: aresStandardData.hero?.supportingText || '',
    heroImage: aresStandardData.hero?.image || '/images/ares-standard/ares-standard-hero.jpg',
    secondaryImage: (aresStandardData.hero as any)?.heroSecondaryImage || '/images/ares-standard/ares-standard-hero.jpg',
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (aresStandardData.hero?.strip || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresStandardData.overview?.heading || 'Everything You Need for Pure 2D DWG Drafting',
      subtitle: 'Focused 2D DWG Desktop CAD',
      description: aresStandardData.overview?.description || '',
      cards: (aresStandardData.overview?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || c.desc || '',
        icon: c.icon || 'Box',
        image: c.image || '/images/ares-standard/ares-standard-hero.jpg',
      })),
    },
    highlights: [...(aresStandardData.hero?.highlights || [])],
    requirements: {
      os: aresStandardData.platform?.os || 'Windows 10 / 11 (64-bit)',
      cpu: aresStandardData.platform?.specs?.[0]?.value || '64-bit multi-core Intel or AMD processor',
      ram: aresStandardData.platform?.specs?.[1]?.value || '8 GB RAM or higher recommended',
      gpu: aresStandardData.platform?.specs?.[2]?.value || 'DirectX / OpenGL compatible graphics adapter',
      disk: aresStandardData.platform?.specs?.[4]?.value || 'Sufficient free disk space for installation',
      display: aresStandardData.platform?.specs?.[3]?.value || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: (aresStandardData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  ares_mechanical: {
    productName: aresMechanicalData.identity?.productName || 'ARES Mechanical',
    brand: aresMechanicalData.identity?.brand || 'Graebert',
    category: aresMechanicalData.identity?.category || '2D Mechanical CAD',
    headline: aresMechanicalData.hero?.heading || 'Modern 2D Mechanical Design in DWG',
    supportingHeadline: aresMechanicalData.identity?.supportingHeadline || 'Standard-Compliant Mechanical Drafting & Automated BOM',
    shortDescription: aresMechanicalData.identity?.shortDescription || '',
    description: aresMechanicalData.identity?.description || '',
    platform: aresMechanicalData.identity?.platform || 'Windows 10 / 11 (64-bit)',
    languages: Array.isArray(aresMechanicalData.identity?.languages) ? aresMechanicalData.identity.languages.join(', ') : 'English, German, Japanese, Korean, Polish',
    primaryFormat: aresMechanicalData.identity?.primaryFormat || 'Native DWG, DXF',
    cadEngine: aresMechanicalData.identity?.cadEngine || 'ARES Commander + Mechanical IndustryToolset',
    officialUrl: aresMechanicalData.identity?.officialUrl || 'https://www.graebert.com/cad-software/ares-mechanical/',
    downloadUrl: aresMechanicalData.identity?.downloadUrl || 'https://www.graebert.com/cad-software/ares-mechanical/',
    trialUrl: aresMechanicalData.identity?.trialUrl || 'https://www.graebert.com/cad-software/ares-mechanical/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresMechanicalData.licensing?.note || 'Available in Perpetual, Annual, and Flex Cloud licensing.',
    eyebrow: aresMechanicalData.hero?.eyebrow || 'GRAEBERT | 2D MECHANICAL CAD',
    h1Highlight: aresMechanicalData.hero?.h1Highlight || 'Mechanical Design',
    heroBadge: aresMechanicalData.hero?.badge || 'ISO / ANSI / DIN / JIS Standards',
    heroHeading: aresMechanicalData.hero?.heading || 'Modern 2D Mechanical Design in DWG',
    heroSupportingText: aresMechanicalData.hero?.supportingText || '',
    heroImage: aresMechanicalData.hero?.image || '/images/ares-mechanical/ares-mechanical-hero.jpg',
    secondaryImage: aresMechanicalData.hero?.heroSecondaryImage || '/images/ares-mechanical/ares-mechanical-hero.jpg',
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (aresMechanicalData.hero?.strip || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresMechanicalData.overview?.heading || 'Purpose-Built for 2D Mechanical Engineering',
      subtitle: aresMechanicalData.overview?.subtitle || 'ISO, ANSI, DIN, BSI & JIS Ready',
      description: aresMechanicalData.overview?.description || '',
      cards: (aresMechanicalData.overview?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.desc || c.description || '',
        icon: c.icon || 'Box',
        image: c.image || '/images/ares-mechanical/ares-mechanical-hero.jpg',
      })),
    },
    highlights: [...(aresMechanicalData.identity?.keyHighlights || [])],
    requirements: {
      os: aresMechanicalData.systemRequirements?.[0]?.spec || 'Windows 10 / 11 (64-bit)',
      cpu: aresMechanicalData.systemRequirements?.[1]?.spec || '64-bit dual-core or multi-core processor',
      ram: aresMechanicalData.systemRequirements?.[2]?.spec || '8 GB RAM or higher recommended',
      gpu: aresMechanicalData.systemRequirements?.[3]?.spec || '3D graphics accelerator card with OpenGL / DirectX support',
      disk: aresMechanicalData.systemRequirements?.[5]?.spec || 'Sufficient free disk space for software and libraries',
      display: aresMechanicalData.systemRequirements?.[4]?.spec || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: (aresMechanicalData.faqs || []).map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '', category: f.category || 'General' })),
  },

  ares_electrical: {
    productName: aresElectricalData.identity?.productName || 'ARES Electrical',
    brand: aresElectricalData.identity?.brand || 'Graebert',
    category: aresElectricalData.identity?.category || 'Electrical CAD (ECAD)',
    headline: aresElectricalData.hero?.heading || 'Intelligent Electrical CAD Built on Native DWG',
    supportingHeadline: aresElectricalData.hero?.supportingText || 'Accelerate electrical schematic creation, panel layout, and automated documentation.',
    shortDescription: aresElectricalData.identity?.corePurpose || aresElectricalData.hero?.supportingText || '',
    description: aresElectricalData.overview?.description || '',
    platform: aresElectricalData.identity?.platform || 'Windows 10 / 11 (64-bit)',
    languages: 'English, German, Spanish, Portuguese, Japanese, Korean',
    primaryFormat: aresElectricalData.identity?.primaryFormat || 'Native DWG, DXF',
    cadEngine: 'Graebert ARES Electrical ECAD Engine',
    officialUrl: aresElectricalData.identity?.officialUrl || 'https://www.graebert.com/cad-software/ares-electrical/',
    downloadUrl: aresElectricalData.identity?.downloadUrl || 'https://www.graebert.com/cad-software/ares-electrical/',
    trialUrl: aresElectricalData.identity?.trialUrl || 'https://www.graebert.com/cad-software/ares-electrical/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresElectricalData.licensing?.description || 'Available as Annual Plan, Perpetual License, or Flex Cloud License.',
    eyebrow: aresElectricalData.hero?.eyebrow || 'GRAEBERT | ELECTRICAL SCHEMATIC & PANEL CAD',
    h1Highlight: 'Electrical CAD',
    heroBadge: aresElectricalData.hero?.badge || 'IEC / ANSI / DIN / ABNT Standards',
    heroHeading: aresElectricalData.hero?.heading || 'Intelligent Electrical CAD Built on Native DWG',
    heroSupportingText: aresElectricalData.hero?.supportingText || '',
    heroImage: aresElectricalData.hero?.image || '/images/ares-electrical/ares-electrical-hero.jpg',
    secondaryImage: (aresElectricalData.hero as any)?.heroSecondaryImage || '/images/ares-electrical/ares-electrical-hero.jpg',
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (aresElectricalData.hero?.strip || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresElectricalData.overview?.heading || 'Dedicated Electrical Automation Inside Native DWG',
      subtitle: 'Electrical Schematics, Panel Layout & BOM',
      description: aresElectricalData.overview?.description || '',
      cards: (aresElectricalData.overview?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || c.desc || '',
        icon: c.icon || 'Zap',
        image: c.image || '/images/ares-electrical/ares-electrical-hero.jpg',
      })),
    },
    highlights: [...(aresElectricalData.hero?.featureChips || [])],
    requirements: {
      os: aresElectricalData.platform?.os || 'Windows 10 / 11 (64-bit)',
      cpu: aresElectricalData.platform?.sysReqs?.[1]?.value || '64-bit Intel Core i5 / AMD Ryzen 5 or higher',
      ram: aresElectricalData.platform?.sysReqs?.[2]?.value || '8 GB RAM minimum (16 GB+ recommended)',
      gpu: aresElectricalData.platform?.sysReqs?.[3]?.value || 'OpenGL / DirectX compatible graphics card',
      disk: aresElectricalData.platform?.sysReqs?.[5]?.value || 'Sufficient free disk space for installation and symbol libraries',
      display: aresElectricalData.platform?.sysReqs?.[4]?.value || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: (aresElectricalData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  ares_kudo: {
    productName: aresKudoData.product?.name || 'ARES Kudo',
    brand: aresKudoData.product?.developer || 'Graebert',
    category: aresKudoData.product?.category || 'Cloud-Native DWG CAD in Browser',
    headline: aresKudoData.hero?.headline || 'The Most Advanced Online CAD Software for DWG Viewing & Editing',
    supportingHeadline: aresKudoData.hero?.subheading || 'Create and modify DWG drawings directly in your web browser',
    shortDescription: aresKudoData.hero?.description || '',
    description: aresKudoData.introduction?.subheading || aresKudoData.hero?.description || '',
    platform: 'Web Browser (Chrome, Edge, Safari, Firefox) — Windows, macOS, Linux, ChromeOS',
    languages: 'English, German, French, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'DWG, DXF, DWT, DWF, PDF',
    cadEngine: 'Graebert Cloud DWG Engine',
    officialUrl: 'https://www.graebert.com/cad-software/ares-kudo/',
    downloadUrl: 'https://kudo.graebert.com/',
    trialUrl: 'https://kudo.graebert.com/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresKudoData.pricing?.subheading || 'Included in ARES Trinity or available as standalone cloud subscription.',
    eyebrow: aresKudoData.hero?.eyebrow || 'GRAEBERT | CLOUD-NATIVE BROWSER CAD',
    h1Highlight: 'DWG Viewing & Editing',
    heroBadge: aresKudoData.hero?.eyebrow || '100% Browser-Based DWG CAD',
    heroHeading: aresKudoData.hero?.headline || 'The Most Advanced Online CAD Software for DWG Viewing & Editing',
    heroSupportingText: aresKudoData.hero?.description || '',
    heroImage: '/images/ares-kudo/ares-kudo-hero.jpg',
    secondaryImage: '/images/ares-commander/ares-commander-hero.jpg',
    trialCta: aresKudoData.hero?.primaryCta || 'Start 30-Day Free Trial',
    pricingCta: aresKudoData.hero?.secondaryCta || 'Explore 300+ Features',
    specStrip: (aresKudoData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresKudoData.introduction?.heading || 'Full DWG CAD Power Inside Your Browser',
      subtitle: 'Zero Installation Cloud CAD',
      description: aresKudoData.introduction?.subheading || '',
      cards: (aresKudoData.trinityPillars || []).map((p: any) => ({
        title: p.title || '',
        desc: p.description || '',
        icon: 'Cloud',
        image: '/images/ares-kudo/ares-kudo-hero.jpg',
      })),
    },
    highlights: [...(aresKudoData.hero?.pills || [])],
    requirements: {
      os: 'Any OS with modern WebGL 2.0 browser (Windows, macOS, Linux, ChromeOS, iPadOS)',
      cpu: 'Multi-core Intel Core i5 / AMD Ryzen 5 / Apple Silicon',
      ram: '8 GB+ system RAM recommended',
      gpu: 'Integrated or dedicated GPU with WebGL 2.0 hardware acceleration',
      disk: 'Zero local disk installation (100% browser-based)',
      display: '1920 × 1080 Full HD or 4K UHD',
    },
    faqs: (aresKudoData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  ares_touch: {
    productName: aresTouchData.product?.name || 'ARES Touch',
    brand: aresTouchData.product?.vendor || 'Graebert',
    category: aresTouchData.product?.category || 'Mobile DWG CAD for Android & iOS',
    headline: aresTouchData.hero?.headline || 'Professional CAD. Anywhere you work.',
    supportingHeadline: aresTouchData.hero?.subheadline || 'Complete DWG viewing, drafting, and site annotation on smartphones and tablets.',
    shortDescription: aresTouchData.product?.tagline || aresTouchData.hero?.description || '',
    description: aresTouchData.whatIs?.description || '',
    platform: 'Android & iOS (Smartphones & Tablets)',
    languages: '14 Languages including English, German, French, Spanish, Japanese, Korean',
    primaryFormat: 'Native DWG, DXF, PDF',
    cadEngine: 'Graebert Mobile DWG Engine',
    officialUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    downloadUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    trialUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresTouchData.pricing?.subheading || 'Included in ARES Trinity or available via Google Play & Apple App Store.',
    eyebrow: aresTouchData.hero?.eyebrow || 'GRAEBERT | MOBILE DWG CAD',
    h1Highlight: 'Anywhere you work.',
    heroBadge: aresTouchData.hero?.eyebrow || 'Android & iOS Native',
    heroHeading: aresTouchData.hero?.headline || 'Professional CAD. Anywhere you work.',
    heroSupportingText: aresTouchData.hero?.description || '',
    heroImage: '/images/software/sections/aec-construction.jpg',
    secondaryImage: '/images/ares-commander/ares-commander-hero.jpg',
    trialCta: 'Get ARES Touch',
    pricingCta: 'Request Indian INR Quote',
    specStrip: (aresTouchData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: aresTouchData.whatIs?.heading || 'Full DWG CAD Power on Android & iOS',
      subtitle: 'Mobile CAD for Field & Site Teams',
      description: aresTouchData.whatIs?.description || '',
      cards: (aresTouchData.coreBenefits || []).map((h: any) => ({
        title: h.title || '',
        desc: h.description || '',
        icon: h.highlight || 'Smartphone',
        image: '/images/software/sections/aec-construction.jpg',
      })),
    },
    highlights: [...(aresTouchData.hero?.badges || [])],
    requirements: {
      os: `${aresTouchData.systemRequirements?.android?.os || 'Android 8.0+'} / iOS & iPadOS 15+`,
      cpu: aresTouchData.systemRequirements?.android?.processor || '64-bit ARM multi-core processor / Apple A-Series or M-Series',
      ram: aresTouchData.systemRequirements?.android?.ram || '4 GB+ RAM (8 GB recommended for large DWG drawings)',
      gpu: aresTouchData.systemRequirements?.android?.display || 'OpenGL ES 3.0+ / Metal hardware acceleration',
      disk: aresTouchData.systemRequirements?.android?.storage || '500 MB+ free storage space',
      display: aresTouchData.systemRequirements?.android?.display || 'High-resolution multi-touch smartphone or tablet display',
    },
    faqs: (aresTouchData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  sketchup_pro: {
    productName: sketchupProData.product?.name || 'SketchUp Pro',
    brand: sketchupProData.product?.brand || 'Trimble',
    category: sketchupProData.product?.category || '3D Modeling & Documentation',
    headline: sketchupProData.hero?.title || 'SketchUp Pro',
    supportingHeadline: sketchupProData.hero?.tagline || 'Focus on design, not software.',
    shortDescription: sketchupProData.hero?.description || '',
    description: sketchupProData.hero?.description || '',
    platform: 'Windows 10 / 11 (64-bit), macOS 12+, iPadOS, Web Browser',
    languages: 'English, French, German, Italian, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'SKP, DWG, DXF, IFC, OBJ, FBX, STL, 3DS, DAE',
    cadEngine: 'Trimble SketchUp 3D Modeling Engine',
    officialUrl: 'https://www.sketchup.com/en/products/sketchup-pro',
    downloadUrl: 'https://www.sketchup.com/en/try-sketchup',
    trialUrl: 'https://www.sketchup.com/en/try-sketchup',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription per named user. Includes Desktop, LayOut, iPad, Web & Trimble Connect.',
    eyebrow: sketchupProData.hero?.eyebrow || 'TRIMBLE | 3D MODELING & DOCUMENTATION',
    h1Highlight: sketchupProData.hero?.tagline || 'Focus on design, not software.',
    heroBadge: sketchupProData.hero?.eyebrow || 'Authorized Trimble Partner',
    heroHeading: sketchupProData.hero?.title || 'SketchUp Pro',
    heroSupportingText: sketchupProData.hero?.description || '',
    heroImage: '/images/software/sketchup-pro.jpg',
    secondaryImage: '/images/software/sections/aec-construction.jpg',
    trialCta: 'Try SketchUp Free',
    pricingCta: 'Subscribe to SketchUp Pro',
    specStrip: (sketchupProData.valueStrip || []).map((s: any) => ({ label: s.title || '', value: s.desc || '' })),
    overview: {
      heading: 'Everything you need to turn ideas into professional designs',
      subtitle: 'The Professional Difference',
      description: 'SketchUp Pro combines intuitive 3D modeling, construction documentation, photorealistic visualization, cloud collaboration, and modular extensibility into one seamless professional workflow.',
      cards: (sketchupProData.powerOfProCards || []).map((p: any) => ({
        title: p.title || '',
        desc: p.description || '',
        icon: p.tag || 'Box',
        image: '/images/software/sketchup-pro.jpg',
      })),
    },
    highlights: [
      ...(sketchupProData.hero?.badges || []),
      ...(sketchupProData.powerOfProCards || []).map((c: any) => `${c.title}: ${c.description}`),
    ],
    requirements: {
      os: sketchupProData.systemRequirements?.[0]?.windows || 'Windows 10 / 11 (64-bit) or macOS 12+',
      cpu: sketchupProData.systemRequirements?.[1]?.windows || '2.8+ GHz multi-core processor',
      ram: sketchupProData.systemRequirements?.[2]?.windows || '8 GB minimum — 16 GB to 32 GB+ recommended',
      gpu: sketchupProData.systemRequirements?.[3]?.windows || 'Dedicated 3D GPU with 4 GB – 8 GB+ VRAM',
      disk: sketchupProData.systemRequirements?.[4]?.windows || '2 GB+ free SSD storage space',
      display: '1920 × 1080 Full HD or 4K UHD display',
    },
    faqs: (sketchupProData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  sketchup_proscan: {
    productName: proScanData.identity?.productName || 'SketchUp Pro Scan',
    brand: proScanData.identity?.brand || 'Trimble',
    category: proScanData.identity?.category || 'Scan-to-BIM & Point Cloud Modeling',
    headline: proScanData.hero?.heading || 'Turn Point Clouds into Accurate 3D Models with SketchUp Pro Scan',
    supportingHeadline: proScanData.identity?.supportingHeadline || 'Import, view, and model directly on laser scans, LiDAR, and photogrammetry data.',
    shortDescription: proScanData.hero?.description || '',
    description: proScanData.overview?.description || '',
    platform: proScanData.identity?.platform || 'Windows 10 / 11 (64-bit)',
    languages: 'English, French, German, Italian, Spanish, Japanese',
    primaryFormat: 'SKP, E57, RCP, RCS, LAS, LAZ, TZF, PLY, DWG, DXF',
    cadEngine: 'Trimble SketchUp + Scan Essentials Engine',
    officialUrl: proScanData.identity?.officialUrl || 'https://www.sketchup.com/',
    downloadUrl: (proScanData.identity as any)?.trialUrl || 'https://www.sketchup.com/en/try-sketchup',
    trialUrl: (proScanData.identity as any)?.trialUrl || 'https://www.sketchup.com/en/try-sketchup',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription. Scan Essentials and Revit Importer require Windows 10/11 (64-bit).',
    eyebrow: proScanData.hero?.eyebrow || 'TRIMBLE | SCAN-TO-BIM & POINT CLOUD MODELING',
    h1Highlight: 'Scan Essentials',
    heroBadge: proScanData.hero?.badge || 'Point Cloud + Revit Importer',
    heroHeading: proScanData.hero?.heading || 'Turn Point Clouds into Accurate 3D Models with SketchUp Pro Scan',
    heroSupportingText: proScanData.hero?.description || '',
    heroImage: proScanData.hero?.image || '/images/software/sketchup-scan.jpg',
    secondaryImage: proScanData.hero?.heroSecondaryImage || '/images/software/sections/point-cloud-scan.jpg',
    trialCta: 'Start Free Trial',
    pricingCta: 'Request a Quote',
    specStrip: (proScanData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: proScanData.overview?.heading || 'Bridge the Gap Between Reality Capture and 3D CAD',
      subtitle: 'Point Cloud to 3D BIM & 2D Documentation',
      description: proScanData.overview?.description || '',
      cards: (proScanData.overview?.cards || []).map((b: any) => ({
        title: b.title || '',
        desc: b.desc || b.description || '',
        icon: b.icon || 'Scan',
        image: b.image || '/images/software/sections/point-cloud-scan.jpg',
      })),
    },
    highlights: [...(proScanData.hero?.chips || [])],
    requirements: {
      os: proScanData.systemRequirements?.[0]?.spec || 'Windows 10 / Windows 11 (64-bit)',
      cpu: proScanData.systemRequirements?.[1]?.spec || 'Multi-core Intel Core i7 / i9 or AMD Ryzen 7 / 9',
      ram: proScanData.systemRequirements?.[2]?.spec || '16 GB RAM minimum (32 GB – 64 GB+ recommended)',
      gpu: proScanData.systemRequirements?.[3]?.spec || 'Dedicated 3D GPU with 4 GB – 8 GB+ VRAM',
      disk: proScanData.systemRequirements?.[5]?.spec || 'Fast NVMe SSD recommended for large point cloud files',
      display: proScanData.systemRequirements?.[4]?.spec || '1920 × 1080 Full HD or 4K UHD display',
    },
    faqs: (proScanData.faqs || []).map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '', category: f.category || 'General' })),
  },

  sketchup_advanced: {
    productName: sketchupProAdvancedData.product?.name || 'SketchUp Pro: Advanced Workflows',
    brand: sketchupProAdvancedData.product?.brand || 'Trimble',
    category: 'BIM Interoperability & Point Cloud Modeling',
    headline: sketchupProAdvancedData.hero?.title || 'SketchUp Pro Advanced Workflows',
    supportingHeadline: sketchupProAdvancedData.hero?.tagline || 'Unlock advanced BIM and reality capture workflows.',
    shortDescription: sketchupProAdvancedData.hero?.description || '',
    description: sketchupProAdvancedData.perks?.subheading || '',
    platform: 'Windows 10 / 11 (64-bit) for Scan Essentials & Revit Importer; macOS, iPad & Web for SketchUp Pro',
    languages: 'English, French, German, Italian, Spanish, Japanese',
    primaryFormat: 'SKP, RVT, IFC, E57, RCP, LAS, LAZ, TZF, DWG, DXF',
    cadEngine: 'Trimble SketchUp + Scan Essentials + Revit Importer',
    officialUrl: 'https://www.sketchup.com/en/plans-and-pricing',
    downloadUrl: 'https://www.sketchup.com/try-sketchup',
    trialUrl: 'https://www.sketchup.com/try-sketchup',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription. Includes SketchUp Pro, LayOut, Scan Essentials, and Revit Importer.',
    eyebrow: sketchupProAdvancedData.hero?.eyebrow || 'TRIMBLE | ADVANCED BIM & POINT CLOUD SUITE',
    h1Highlight: 'Advanced Workflows',
    heroBadge: sketchupProAdvancedData.hero?.platformBadge || 'Windows Native Extensions',
    heroHeading: sketchupProAdvancedData.hero?.title || 'SketchUp Pro Advanced Workflows',
    heroSupportingText: sketchupProAdvancedData.hero?.description || '',
    heroImage: '/images/software/sketchup-advanced.jpg',
    secondaryImage: '/images/software/sections/bim-revit-sync.jpg',
    trialCta: 'Try SketchUp',
    pricingCta: 'Subscribe',
    specStrip: (sketchupProAdvancedData.valueStrip || []).map((s: any) => ({ label: s.title || '', value: s.desc || '' })),
    overview: {
      heading: sketchupProAdvancedData.perks?.heading || 'Bridge the gap between point clouds, BIM, and 3D design',
      subtitle: 'Revit Importer + Scan Essentials + SketchUp Pro',
      description: sketchupProAdvancedData.perks?.subheading || '',
      cards: (sketchupProAdvancedData.perks?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || '',
        icon: c.badge || 'Box',
        image: '/images/software/sketchup-advanced.jpg',
      })),
    },
    highlights: (sketchupProAdvancedData.includedItems || []).map((i: any) => `${i.title}: ${i.description}`),
    requirements: {
      os: sketchupProAdvancedData.systemRequirements?.rows?.[0]?.windows || 'Windows 10 / 11 (64-bit)',
      cpu: sketchupProAdvancedData.systemRequirements?.rows?.[1]?.windows || 'Intel Core i7/i9 or AMD Ryzen 7/9 (2.8+ GHz)',
      ram: sketchupProAdvancedData.systemRequirements?.rows?.[2]?.windows || '32 GB – 64 GB RAM (for large point clouds & Revit files)',
      gpu: sketchupProAdvancedData.systemRequirements?.rows?.[3]?.windows || 'Dedicated NVIDIA RTX / Quadro GPU with 8 GB+ VRAM',
      disk: sketchupProAdvancedData.systemRequirements?.rows?.[4]?.windows || 'NVMe SSD with 50 GB+ free space',
      display: '1920 × 1080 Full HD or 4K UHD',
    },
    faqs: (sketchupProAdvancedData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  sketchup_studio: {
    productName: sketchUpStudioData.identity?.productName || 'SketchUp Studio',
    brand: sketchUpStudioData.identity?.brand || 'Trimble',
    category: sketchUpStudioData.identity?.category || 'Complete 3D Modeling, BIM, Point Cloud & V-Ray Suite',
    headline: sketchUpStudioData.hero?.heading || 'The Complete 3D Design, Point Cloud & Photorealistic Rendering Suite',
    supportingHeadline: sketchUpStudioData.hero?.subheading || 'SketchUp Pro + V-Ray + Scan Essentials + Revit Importer in One Subscription',
    shortDescription: sketchUpStudioData.hero?.description || '',
    description: sketchUpStudioData.intro?.description || '',
    platform: 'Windows 10 / 11 (64-bit) — SketchUp Pro also on macOS, iPad & Web',
    languages: 'English, French, German, Italian, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'SKP, DWG, DXF, RVT, IFC, E57, RCP, LAS, OBJ, FBX',
    cadEngine: 'Trimble SketchUp + Chaos V-Ray + Scan Essentials',
    officialUrl: sketchUpStudioData.identity?.officialUrl || 'https://www.sketchup.com/en/products/sketchup-studio',
    downloadUrl: (sketchUpStudioData.identity as any)?.trialUrl || 'https://www.sketchup.com/en/try-sketchup',
    trialUrl: (sketchUpStudioData.identity as any)?.trialUrl || 'https://www.sketchup.com/en/try-sketchup',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription. Includes SketchUp Pro, Chaos V-Ray for SketchUp, Scan Essentials, and Revit Importer.',
    eyebrow: sketchUpStudioData.hero?.eyebrow || 'TRIMBLE | COMPLETE AEC & RENDERING SUITE',
    h1Highlight: 'SketchUp Studio',
    heroBadge: sketchUpStudioData.hero?.badge || 'All-in-One Studio Bundle',
    heroHeading: sketchUpStudioData.hero?.heading || 'The Complete 3D Design, Point Cloud & Photorealistic Rendering Suite',
    heroSupportingText: sketchUpStudioData.hero?.description || '',
    heroImage: sketchUpStudioData.hero?.image || '/images/software/sketchup-studio.jpg',
    secondaryImage: sketchUpStudioData.hero?.heroSecondaryImage || '/images/software/sections/vray-photoreal.jpg',
    trialCta: 'Start Free Trial',
    pricingCta: 'Request a Commercial Quote',
    specStrip: (sketchUpStudioData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: sketchUpStudioData.intro?.heading || 'From Field Scan to Photorealistic Client Presentation',
      subtitle: sketchUpStudioData.intro?.eyebrow || 'All-In-One AEC Workflow',
      description: sketchUpStudioData.intro?.description || '',
      cards: (sketchUpStudioData.perks || []).map((t: any) => ({
        title: t.title || '',
        desc: t.description || '',
        icon: 'Box',
        image: t.image || '/images/software/sketchup-studio.jpg',
      })),
    },
    highlights: (sketchUpStudioData.capabilities || []).map((t: any) => `${t.title}: ${t.description}`),
    requirements: {
      os: sketchUpStudioData.systemRequirements?.[0]?.spec || 'Windows 10 / Windows 11 (64-bit)',
      cpu: sketchUpStudioData.systemRequirements?.[1]?.spec || '2+ GHz multi-core processor (Intel Core i7/i9 or AMD Ryzen 7/9)',
      ram: sketchUpStudioData.systemRequirements?.[2]?.spec || '16 GB minimum — 32 GB to 64 GB+ recommended',
      gpu: sketchUpStudioData.systemRequirements?.[3]?.spec || 'NVIDIA RTX GPU with 8 GB+ VRAM recommended for V-Ray GPU',
      disk: sketchUpStudioData.systemRequirements?.[5]?.spec || 'Minimum 10 GB+ free NVMe SSD space',
      display: sketchUpStudioData.systemRequirements?.[4]?.spec || '1920 × 1080 Full HD or 4K display',
    },
    faqs: (sketchUpStudioData.faqs || []).map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '', category: f.category || 'General' })),
  },

  chaos_enscape: {
    productName: enscapeData.identity?.productName || 'Chaos Enscape',
    brand: enscapeData.identity?.brand || 'Chaos',
    category: enscapeData.identity?.category || 'Real-Time 3D Rendering & Virtual Walkthroughs',
    headline: enscapeData.hero?.h1 || 'Real-Time 3D Rendering',
    supportingHeadline: enscapeData.hero?.supportingHeadline || 'Design, visualize, and walk through your CAD & BIM models instantaneously.',
    shortDescription: enscapeData.hero?.description || '',
    description: enscapeData.whyEnscape?.description || '',
    platform: 'Windows 10 / 11 (64-bit) & macOS 13 Ventura or higher',
    languages: 'English, German, French, Italian, Spanish, Portuguese, Japanese, Chinese',
    primaryFormat: 'Direct Plugin for Revit, SketchUp, Rhino, Archicad & Vectorworks',
    cadEngine: 'Chaos Enscape Real-Time Ray Tracing Engine',
    officialUrl: enscapeData.hero?.officialUrl || 'https://www.chaos.com/enscape',
    downloadUrl: enscapeData.hero?.trialUrl || 'https://www.chaos.com/enscape/free-trial',
    trialUrl: enscapeData.hero?.trialUrl || 'https://www.chaos.com/enscape/free-trial',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: enscapeData.freeTrial?.termsNote || 'Available as Solo (Fixed-Seat), Premium, and ArchDesign Collection subscriptions.',
    eyebrow: enscapeData.hero?.eyebrow || 'CHAOS ENSCAPE | REAL-TIME BIM & CAD VISUALIZATION',
    h1Highlight: enscapeData.hero?.h1Highlight || '& Virtual Walkthroughs',
    heroBadge: enscapeData.hero?.eyebrow || 'Real-Time Ray Tracing',
    heroHeading: enscapeData.hero?.h1 || 'Real-Time 3D Rendering',
    heroSupportingText: enscapeData.hero?.description || '',
    heroImage: enscapeData.hero?.heroImage || '/images/products/enscape-hero.png',
    secondaryImage: enscapeData.hero?.heroSecondaryImage || '/images/software/sections/enscape-vr.jpg',
    trialCta: 'Start Free 14-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (enscapeData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: enscapeData.whyEnscape?.heading || '100% Integrated Inside Your Design Application',
      subtitle: 'Live Bi-Directional CAD & BIM Visualization',
      description: enscapeData.whyEnscape?.description || '',
      cards: (enscapeData.whyEnscape?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || '',
        icon: c.tag || 'Sparkles',
        image: c.image || '/images/products/enscape-hero.png',
      })),
    },
    highlights: [...(enscapeData.hero?.featureChips || [])],
    requirements: {
      os: enscapeData.systemRequirements?.minOS || 'Windows 10 / 11 (64-bit) or macOS 13 Ventura+',
      cpu: 'Multi-core Intel Core i7 / AMD Ryzen 7 or Apple M-Series processor',
      ram: enscapeData.systemRequirements?.minRAM || '16 GB RAM minimum (32 GB recommended for large BIM projects)',
      gpu: `${enscapeData.systemRequirements?.minGPU || '4 GB VRAM GPU'} (Rec: ${enscapeData.systemRequirements?.recGPU || 'NVIDIA RTX 8 GB+ VRAM'})`,
      disk: 'Fast SSD storage for application and Chaos Cosmos asset cache',
      display: 'Full HD 1920 × 1080 or 4K UHD display',
    },
    faqs: (enscapeData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  chaos_vray: {
    productName: vrayData.identity?.productName || 'Chaos V-Ray',
    brand: vrayData.identity?.brand || 'Chaos',
    category: vrayData.identity?.category || 'Photorealistic 3D Rendering Software',
    headline: vrayData.hero?.h1 || 'Photorealistic 3D Rendering',
    supportingHeadline: vrayData.hero?.supportingHeading || 'Academy Award-winning ray tracing for architects, designers, and VFX studios.',
    shortDescription: vrayData.hero?.description || '',
    description: vrayData.whyVRay?.heading || '',
    platform: 'Windows 10 / 11 (64-bit), macOS 11+, Red Hat Enterprise Linux / CentOS',
    languages: 'English',
    primaryFormat: 'Plugin for SketchUp, 3ds Max, Revit, Rhino, Maya, Cinema 4D, Blender, Houdini, Unreal',
    cadEngine: 'Chaos V-Ray Physically Based CPU & GPU Ray Tracing Engine',
    officialUrl: vrayData.hero?.officialUrl || 'https://www.chaos.com/vray',
    downloadUrl: vrayData.hero?.trialUrl || 'https://www.chaos.com/vray/free-trial',
    trialUrl: vrayData.hero?.trialUrl || 'https://www.chaos.com/vray/free-trial',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Available in V-Ray Solo, V-Ray Premium, and V-Ray Enterprise annual subscriptions.',
    eyebrow: vrayData.hero?.eyebrow || 'CHAOS V-RAY | ACADEMY AWARD-WINNING RAY TRACER',
    h1Highlight: vrayData.hero?.h1Highlight || 'for Every Design Stage',
    heroBadge: vrayData.hero?.eyebrow || 'CPU + RTX GPU Hybrid Rendering',
    heroHeading: vrayData.hero?.h1 || 'Photorealistic 3D Rendering',
    heroSupportingText: vrayData.hero?.description || '',
    heroImage: vrayData.hero?.heroImage || '/images/products/vray-hero.png',
    secondaryImage: vrayData.hero?.heroSecondaryImage || '/images/software/sections/vray-photoreal.jpg',
    trialCta: 'Start Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: (vrayData.hero?.stats || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: vrayData.whyVRay?.heading || 'The Industry Standard for Architectural & VFX Visualization',
      subtitle: vrayData.whyVRay?.eyebrow || 'Academy Award & Engineering Emmy-Winning Ray Tracer',
      description: vrayData.hero?.description || '',
      cards: (vrayData.whyVRay?.cards || []).map((c: any) => ({
        title: c.title || '',
        desc: c.description || '',
        icon: c.badge || 'Sparkles',
        image: c.image || '/images/products/vray-hero.png',
      })),
    },
    highlights: [...(vrayData.hero?.featureChips || [])],
    requirements: {
      os: vrayData.systemRequirements?.os || 'Windows 10 / 11 (64-bit), macOS 11+, RHEL/CentOS Linux',
      cpu: vrayData.systemRequirements?.cpu || '64-bit Intel or AMD multi-core processor with AVX2 support, or Apple Silicon',
      ram: vrayData.systemRequirements?.ram || 'Minimum 8 GB RAM (16 GB – 64 GB+ recommended)',
      gpu: vrayData.systemRequirements?.gpu || 'NVIDIA Maxwell, Pascal, Turing, Ampere, or Ada Lovelace RTX cards',
      disk: vrayData.systemRequirements?.storage || 'Minimum 2 GB – 15 GB free SSD space',
      display: 'Full HD 1920 × 1080 or 4K UHD Color-Calibrated Display',
    },
    faqs: (vrayData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },

  chaos_corona: {
    productName: coronaData.identity?.productName || 'Chaos Corona',
    brand: coronaData.identity?.brand || 'Chaos',
    category: coronaData.identity?.category || 'Photorealistic Architectural Renderer for 3ds Max & Cinema 4D',
    headline: coronaData.hero?.heading || 'Unmatched Photorealism with Chaos Corona',
    supportingHeadline: coronaData.hero?.supportingText || 'Artist-friendly, physically based rendering for Autodesk 3ds Max and Maxon Cinema 4D.',
    shortDescription: coronaData.hero?.mainDescription || '',
    description: coronaData.hero?.mainDescription || '',
    platform: 'Windows 10 / 11 (64-bit) & macOS 10.14+ (Intel & Apple Silicon native)',
    languages: 'English',
    primaryFormat: 'Plugin for Autodesk 3ds Max & Maxon Cinema 4D',
    cadEngine: 'Chaos Corona Unbiased & Biased CPU Path Tracing Engine',
    officialUrl: coronaData.identity?.officialUrl || 'https://www.chaos.com/corona',
    downloadUrl: coronaData.identity?.trialUrl || 'https://www.chaos.com/corona/free-trial',
    trialUrl: coronaData.identity?.trialUrl || 'https://www.chaos.com/corona/free-trial',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Available in Corona Solo and Corona Premium annual subscriptions.',
    eyebrow: coronaData.hero?.eyebrow || 'CHAOS CORONA | ARCHITECTURAL RENDERING',
    h1Highlight: 'Chaos Corona',
    heroBadge: coronaData.hero?.eyebrow || '3ds Max & Cinema 4D',
    heroHeading: coronaData.hero?.heading || 'Unmatched Photorealism with Chaos Corona',
    heroSupportingText: coronaData.hero?.mainDescription || '',
    heroImage: coronaData.hero?.heroImage || '/images/products/corona-hero.png',
    secondaryImage: '/images/software/sections/corona-lightmix.jpg',
    trialCta: 'Start 30-Day Free Trial',
    pricingCta: 'Explore Plans & Licensing',
    specStrip: (coronaData.metrics || []).map((s: any) => ({ label: s.label || '', value: s.value || '' })),
    overview: {
      heading: 'Intuitive Rendering. Perfect in Every Detail.',
      subtitle: 'Chaos-Published Product Milestones',
      description: coronaData.hero?.mainDescription || '',
      cards: (coronaData.overviewCards || []).map((p: any) => ({
        title: p.title || '',
        desc: p.description || '',
        icon: p.subtitle || 'Sparkles',
        image: p.image || '/images/software/sections/corona-lightmix.jpg',
      })),
    },
    highlights: [...(coronaData.hero?.highlights || [])],
    requirements: {
      os: coronaData.systemRequirements?.[3]?.detail || 'Windows 10 or Windows 11 (64-bit) | macOS 10.14+ (Cinema 4D)',
      cpu: coronaData.systemRequirements?.[1]?.detail || '64-bit Intel or AMD processor with SSE4.1 support, or Apple Silicon (M1/M2/M3/M4)',
      ram: coronaData.systemRequirements?.[5]?.detail || '16 GB RAM minimum — 32 GB to 64 GB+ recommended for complex architectural scenes',
      gpu: coronaData.systemRequirements?.[2]?.detail || 'NVIDIA GPU with Maxwell+ architecture for Fast Preview Denoiser / RTX GPU for Chaos Vantage',
      disk: 'Fast SSD with 10 GB+ free space for Chaos Cosmos asset caching',
      display: 'Full HD 1920 × 1080 or 4K UHD Display',
    },
    faqs: (coronaData.faqs || []).map((f: any) => ({ q: f.question || f.q || '', a: f.answer || f.a || '', category: f.category || 'General' })),
  },
}

export function getCadProductEdits(productKey: string): any {
  let catalogEdits: any = null

  // 1. Check if this CAD product was edited via the Products Catalog tab (base layer)
  try {
    const slug = CAD_KEY_TO_SLUG_MAP[productKey]
    const rawCatalog = localStorage.getItem('leniva_admin_products_catalog')
    if (slug && rawCatalog) {
      const catalog = JSON.parse(rawCatalog)
      if (Array.isArray(catalog)) {
        const prod = catalog.find((p: any) => p.slug === slug || p.id === slug)
        if (prod && prod.is_admin_customized) {
          catalogEdits = {
            productName: prod.name,
            brand: prod.brand,
            category: prod.category,
            heroBadge: prod.badge,
            headline: prod.hero_heading || prod.name,
            heroHeading: prod.hero_heading || prod.name,
            supportingHeadline: prod.tagline,
            heroSupportingText: prod.hero_subtitle || prod.short_description,
            shortDescription: prod.short_description,
            description: prod.description,
            heroImage: prod.hero_image,
            secondaryImage: prod.images?.[1],
            ...(Array.isArray(prod.key_specs) && prod.key_specs.length > 0
              ? { specStrip: prod.key_specs }
              : {}),
            ...(Array.isArray(prod.features) && prod.features.length > 0
              ? { highlights: prod.features }
              : {}),
            ...(prod.overview_heading || prod.overview_description || (Array.isArray(prod.overview_cards) && prod.overview_cards.length > 0)
              ? {
                  overview: {
                    ...(prod.overview_heading ? { heading: prod.overview_heading } : {}),
                    ...(prod.overview_description ? { description: prod.overview_description } : {}),
                    ...(Array.isArray(prod.overview_cards) && prod.overview_cards.length > 0
                      ? {
                          cards: prod.overview_cards.map((c: any) => ({
                            title: c.title,
                            desc: c.description || c.desc,
                            icon: c.icon || 'Box',
                            image: c.image || prod.hero_image,
                          })),
                        }
                      : {}),
                  },
                }
              : {}),
            ...(Array.isArray(prod.faqs) && prod.faqs.length > 0
              ? {
                  faqs: prod.faqs.map((f: any) => ({
                    q: f.question || f.q,
                    a: f.answer || f.a,
                    category: f.category || 'General',
                  })),
                }
              : {}),
          }
        }
      }
    }
  } catch {
    // ignore
  }

  // 2. Overlay dedicated CAD Software Editor edits on top (highest priority)
  let cadEdits: any = catalogEdits ? { ...catalogEdits } : null
  try {
    const raw = localStorage.getItem('leniva_cad_software_edits')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed[productKey]) {
        const directEdit = parsed[productKey]
        cadEdits = {
          ...(cadEdits || {}),
          ...directEdit,
          overview: {
            ...(cadEdits?.overview || {}),
            ...(directEdit.overview || {}),
          },
          requirements: {
            ...(cadEdits?.requirements || {}),
            ...(directEdit.requirements || {}),
          },
        }
      }
    }
  } catch {
    // ignore
  }

  return cadEdits
}

export function isCadSectionEnabled(productKey: string, sectionKey: keyof CadEnabledSections): boolean {
  try {
    const raw = localStorage.getItem('leniva_cad_software_edits')
    if (!raw) return true
    const parsed = JSON.parse(raw)
    const product = parsed[productKey]
    if (!product || !product.enabledSections) return true
    return product.enabledSections[sectionKey] !== false
  } catch {
    return true
  }
}

export function useCadSectionVisibility(productKey: string) {
  const readSections = (): CadEnabledSections => {
    try {
      const raw = localStorage.getItem('leniva_cad_software_edits')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed[productKey]?.enabledSections) {
          return {
            ...DEFAULT_CAD_SECTIONS,
            ...parsed[productKey].enabledSections,
          }
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_CAD_SECTIONS
  }

  const [sections, setSections] = useState<CadEnabledSections>(readSections)
  const [edits, setEdits] = useState<any>(() => getCadProductEdits(productKey))

  useEffect(() => {
    const update = () => {
      setSections(readSections())
      setEdits(getCadProductEdits(productKey))
    }
    window.addEventListener('storage', update)
    window.addEventListener('leniva_cad_edits_updated', update)
    window.addEventListener('leniva_products_catalog_updated', update)
    window.addEventListener('leniva_cloud_cms_synced', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('leniva_cad_edits_updated', update)
      window.removeEventListener('leniva_products_catalog_updated', update)
      window.removeEventListener('leniva_cloud_cms_synced', update)
    }
  }, [productKey])

  const isEnabled = (secKey: keyof CadEnabledSections) => sections[secKey] !== false

  return { isEnabled, sections, edits }
}

export function mergeCadEditsWithPageData<T extends Record<string, any>>(
  defaultData: T,
  edits: any
): T {
  if (!edits || typeof edits !== 'object') return defaultData

  const result: any = { ...defaultData }

  // Top-level product / name fields (used by Corona, SketchUpPro, AresTouch, AresKudo)
  if (edits.productName) {
    if ('productName' in result) result.productName = edits.productName
    if ('name' in result) result.name = edits.productName
    if (result.product && typeof result.product === 'object') {
      result.product = {
        ...result.product,
        name: edits.productName,
        ...(edits.brand ? { developer: edits.brand, vendor: edits.brand } : {}),
        ...(edits.shortDescription ? { tagline: edits.shortDescription } : {}),
        ...(edits.category ? { category: edits.category } : {}),
      }
    }
  }
  if (edits.brand) {
    if ('brand' in result) result.brand = edits.brand
    if ('vendor' in result) result.vendor = edits.brand
    if ('company' in result) result.company = edits.brand
  }
  if (edits.category && 'category' in result) {
    result.category = edits.category
  }
  if (edits.shortDescription && 'tagline' in result) {
    result.tagline = edits.shortDescription
  }
  if (edits.officialUrl && 'officialWebsite' in result) {
    result.officialWebsite = edits.officialUrl
  }

  // 1. Merge SEO if present
  if (result.seo) {
    result.seo = {
      ...result.seo,
      ...(edits.seo?.metaTitle ? { title: edits.seo.metaTitle } : {}),
      ...(edits.seo?.metaDescription ? { description: edits.seo.metaDescription } : {}),
    }
  }

  // 2. Merge Identity if present
  if (result.identity) {
    const parsedLangs =
      typeof edits.languages === 'string' && edits.languages.trim()
        ? edits.languages.split(',').map((s: string) => s.trim()).filter(Boolean)
        : Array.isArray(edits.languages)
        ? edits.languages
        : result.identity.languages

    result.identity = {
      ...result.identity,
      ...(edits.productName ? { productName: edits.productName } : {}),
      ...(edits.brand ? { brand: edits.brand } : {}),
      ...(edits.category ? { category: edits.category } : {}),
      ...(edits.cadEngine ? { cadEngine: edits.cadEngine } : {}),
      ...(edits.platform
        ? {
            platform: edits.platform,
            supportedPlatforms: edits.platform,
          }
        : {}),
      ...(parsedLangs ? { languages: parsedLangs } : {}),
      ...(edits.primaryFormat ? { primaryFormat: edits.primaryFormat } : {}),
      ...(edits.headline || edits.heroHeading
        ? {
            headline: edits.headline || edits.heroHeading,
            mainHeadline: edits.headline || edits.heroHeading,
            corePurpose: edits.headline || edits.heroHeading,
            coreMessage: edits.headline || edits.heroHeading,
          }
        : {}),
      ...(edits.supportingHeadline
        ? {
            supportingHeadline: edits.supportingHeadline,
            positioning: edits.supportingHeadline,
          }
        : {}),
      ...(edits.shortDescription
        ? {
            shortDescription: edits.shortDescription,
            valueProposition: edits.shortDescription,
          }
        : {}),
      ...(edits.description ? { description: edits.description } : {}),
      ...(edits.officialUrl ? { officialUrl: edits.officialUrl } : {}),
      ...(edits.downloadUrl ? { downloadUrl: edits.downloadUrl } : {}),
      ...(edits.trialUrl || edits.downloadUrl
        ? { trialUrl: edits.trialUrl || edits.downloadUrl }
        : {}),
      ...(Array.isArray(edits.highlights) && edits.highlights.length > 0
        ? { keyHighlights: edits.highlights }
        : {}),
    }
  }

  // 3. Merge Hero if present
  if (result.hero) {
    const stripItems =
      Array.isArray(edits.specStrip) && edits.specStrip.length > 0
        ? edits.specStrip
        : result.hero.strip

    const statsItems =
      Array.isArray(edits.specStrip) && edits.specStrip.length > 0 && Array.isArray(result.hero.stats)
        ? edits.specStrip.map((s: any, idx: number) => ({
            ...(result.hero.stats[idx] || {}),
            label: s.label,
            value: s.value,
            note: result.hero.stats[idx]?.note || '',
          }))
        : result.hero.stats

    const quickStatsItems =
      Array.isArray(edits.specStrip) && edits.specStrip.length > 0 && Array.isArray(result.hero.quickStats)
        ? edits.specStrip.map((s: any, idx: number) => ({
            ...(result.hero.quickStats[idx] || {}),
            label: s.label,
            value: s.value,
          }))
        : result.hero.quickStats

    const highlightChips =
      Array.isArray(edits.highlights) && edits.highlights.length > 0
        ? edits.highlights
        : undefined

    const rawHeading = edits.heroHeading || edits.headline || ''
    const rawHighlight = edits.h1Highlight !== undefined ? edits.h1Highlight : result.hero.h1Highlight
    // For pages like Enscape and V-Ray that render {h1} <br/> <span>{h1Highlight}</span>,
    // avoid repeating h1Highlight if rawHeading already includes it at the end.
    let cleanH1 = rawHeading
    if (rawHeading && rawHighlight && typeof rawHighlight === 'string' && rawHeading.trim().endsWith(rawHighlight.trim()) && rawHeading.trim() !== rawHighlight.trim()) {
      cleanH1 = rawHeading.trim().slice(0, rawHeading.trim().length - rawHighlight.trim().length).trim()
    }

    result.hero = {
      ...result.hero,
      ...(edits.eyebrow ? { eyebrow: edits.eyebrow } : {}),
      ...(edits.heroBadge ? { badge: edits.heroBadge, platformBadge: edits.heroBadge } : {}),
      ...(rawHeading
        ? {
            heading: rawHeading,
            headline: rawHeading,
            h1: cleanH1 || rawHeading,
            title: rawHeading,
          }
        : {}),
      ...(edits.h1Highlight !== undefined
        ? {
            h1Highlight: edits.h1Highlight,
            highlightText: edits.h1Highlight,
            titleHighlight: edits.h1Highlight,
          }
        : {}),
      ...(edits.supportingHeadline
        ? {
            supportingHeadline: edits.supportingHeadline,
            supportingHeading: edits.supportingHeadline,
            subheading: edits.supportingHeadline,
            subheadline: edits.supportingHeadline,
            subtitle: edits.supportingHeadline,
            tagline: edits.supportingHeadline,
          }
        : {}),
      ...(edits.heroSupportingText || edits.shortDescription
        ? {
            supportingText: edits.heroSupportingText || edits.shortDescription,
            description: edits.heroSupportingText || edits.shortDescription,
            mainDescription: edits.description || edits.heroSupportingText || edits.shortDescription,
          }
        : {}),
      ...(edits.shortDescription ? { shortDescription: edits.shortDescription } : {}),
      ...(edits.heroImage
        ? {
            image: edits.heroImage,
            heroImage: edits.heroImage,
          }
        : {}),
      ...(edits.secondaryImage ? { heroSecondaryImage: edits.secondaryImage } : {}),
      ...(edits.officialUrl ? { officialUrl: edits.officialUrl } : {}),
      ...(edits.downloadUrl || edits.trialUrl
        ? { trialUrl: edits.downloadUrl || edits.trialUrl }
        : {}),
      ...(edits.trialCta ? { primaryCta: edits.trialCta } : {}),
      ...(edits.pricingCta ? { secondaryCta: edits.pricingCta } : {}),
      ...(stripItems ? { strip: stripItems } : {}),
      ...(statsItems ? { stats: statsItems } : {}),
      ...(quickStatsItems ? { quickStats: quickStatsItems } : {}),
      ...(highlightChips
        ? {
            labels: highlightChips,
            featureChips: highlightChips,
            highlights: highlightChips,
            featureLabels: highlightChips,
            chips: highlightChips,
            trustChips: highlightChips,
            trustBadges: highlightChips,
            trustSignals: highlightChips,
            pills: highlightChips,
            badges: highlightChips,
          }
        : {}),
    }
  }

  // Top-level Spec Strip arrays (SketchUpProPage / SketchUpProAdvancedPage valueStrip & CoronaPage metrics)
  if (Array.isArray(edits.specStrip) && edits.specStrip.length > 0) {
    if (Array.isArray(result.valueStrip)) {
      result.valueStrip = edits.specStrip.map((s: any, idx: number) => {
        const orig = result.valueStrip[idx] || {}
        return {
          ...orig,
          id: orig.id || `spec-${idx}`,
          icon: orig.icon || 'Box',
          title: s.label || orig.title || '',
          desc: s.value || orig.desc || '',
        }
      })
    }
    if (Array.isArray(result.metrics)) {
      result.metrics = edits.specStrip.map((s: any, idx: number) => {
        const orig = result.metrics[idx] || {}
        return {
          ...orig,
          value: s.value || orig.value || '',
          label: s.label || orig.label || '',
          note: orig.note || '',
        }
      })
    }
  }

  // 4. Merge Overview / Intro / Perks / WhyEnscape / WhyVRay / PowerOfProCards / OverviewCards
  if (edits.overview) {
    const editCards = Array.isArray(edits.overview.cards) && edits.overview.cards.length > 0 ? edits.overview.cards : null

    const origOverview = result.overview || {}
    const updatedCards =
      editCards && Array.isArray(origOverview.cards)
        ? editCards.map((c: any, idx: number) => {
            const orig = origOverview.cards[idx] || {}
            return {
              ...orig,
              title: c.title || orig.title || '',
              desc: c.desc || c.description || orig.desc || '',
              description: c.desc || c.description || orig.description || '',
              subtitle: orig.subtitle || c.icon || '',
              icon: c.icon || orig.icon || 'Box',
              image: c.image || orig.image || '',
              bullets: orig.bullets || [],
            }
          })
        : editCards
        ? editCards.map((c: any) => ({
            title: c.title || '',
            desc: c.desc || c.description || '',
            description: c.desc || c.description || '',
            icon: c.icon || 'Box',
            image: c.image || '',
          }))
        : origOverview.cards

    const updatedBlocks =
      editCards && Array.isArray(origOverview.blocks)
        ? editCards.map((c: any, idx: number) => {
            const orig = origOverview.blocks[idx] || {}
            return {
              ...orig,
              title: c.title || orig.title || '',
              description: c.desc || c.description || orig.description || '',
              subtitle: orig.subtitle || '',
              icon: c.icon || orig.icon || 'Box',
              bullets: orig.bullets || [],
            }
          })
        : origOverview.blocks

    const updatedPillars =
      editCards && Array.isArray(origOverview.pillars)
        ? editCards.map((c: any, idx: number) => {
            const orig = origOverview.pillars[idx] || {}
            return {
              ...orig,
              title: c.title || orig.title || '',
              description: c.desc || c.description || orig.description || '',
              icon: c.icon || orig.icon || 'Box',
            }
          })
        : origOverview.pillars

    const updatedHighlights =
      editCards && Array.isArray(origOverview.highlights)
        ? editCards.map((c: any, idx: number) => {
            const orig = origOverview.highlights[idx] || {}
            return {
              ...orig,
              title: c.title || orig.title || '',
              description: c.desc || c.description || orig.description || '',
              icon: c.icon || orig.icon || 'Box',
            }
          })
        : origOverview.highlights

    result.overview = {
      ...origOverview,
      ...(edits.overview.heading
        ? {
            heading: edits.overview.heading,
            title: edits.overview.heading,
            headline: edits.overview.heading,
          }
        : {}),
      ...(edits.overview.subtitle
        ? {
            subtitle: edits.overview.subtitle,
            eyebrow: edits.overview.subtitle,
            sectionBadge: edits.overview.subtitle,
          }
        : {}),
      ...(edits.overview.description
        ? {
            description: edits.overview.description,
            intro: edits.overview.description,
            summary: edits.overview.description,
            lead: edits.overview.description,
          }
        : {}),
      ...(updatedCards ? { cards: updatedCards } : {}),
      ...(updatedBlocks ? { blocks: updatedBlocks } : {}),
      ...(updatedPillars ? { pillars: updatedPillars } : {}),
      ...(updatedHighlights ? { highlights: updatedHighlights } : {}),
    }

    // SketchUpStudioPage intro + perks array
    if (result.intro) {
      result.intro = {
        ...result.intro,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.subtitle ? { eyebrow: edits.overview.subtitle } : {}),
        ...(edits.overview.description ? { description: edits.overview.description } : {}),
      }
    }
    if (Array.isArray(result.perks) && editCards) {
      result.perks = editCards.map((c: any, idx: number) => {
        const orig = result.perks[idx] || {}
        return {
          ...orig,
          title: c.title || orig.title || '',
          description: c.desc || c.description || orig.description || '',
          image: c.image || orig.image || '',
        }
      })
    } else if (result.perks && typeof result.perks === 'object' && !Array.isArray(result.perks)) {
      // SketchUpProAdvancedPage perks object
      result.perks = {
        ...result.perks,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.description ? { subheading: edits.overview.description } : {}),
        ...(editCards && Array.isArray(result.perks.cards)
          ? {
              cards: editCards.map((c: any, idx: number) => {
                const orig = result.perks.cards[idx] || {}
                return {
                  ...orig,
                  title: c.title || orig.title || '',
                  description: c.desc || c.description || orig.description || '',
                  badge: orig.badge || c.icon || 'Feature',
                }
              }),
            }
          : {}),
      }
    }

    // AresKudoPage introduction
    if (result.introduction) {
      result.introduction = {
        ...result.introduction,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.description ? { subheading: edits.overview.description } : {}),
      }
    }

    // AresTouchPage whatIs + coreBenefits
    if (result.whatIs) {
      result.whatIs = {
        ...result.whatIs,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.description ? { description: edits.overview.description } : {}),
      }
    }
    if (Array.isArray(result.coreBenefits) && editCards) {
      result.coreBenefits = editCards.map((c: any, idx: number) => {
        const orig = result.coreBenefits[idx] || {}
        return {
          ...orig,
          title: c.title || orig.title || '',
          description: c.desc || c.description || orig.description || '',
          highlight: orig.highlight || c.icon || 'Key Benefit',
        }
      })
    }

    // SketchUpProPage powerOfProCards
    if (Array.isArray(result.powerOfProCards) && editCards) {
      result.powerOfProCards = editCards.map((c: any, idx: number) => {
        const orig = result.powerOfProCards[idx] || {}
        return {
          ...orig,
          id: orig.id || `card-${idx}`,
          number: orig.number || `0${idx + 1}`,
          tag: orig.tag || c.icon || 'Core Capability',
          title: c.title || orig.title || '',
          description: c.desc || c.description || orig.description || '',
          bullets: orig.bullets || [],
        }
      })
    }

    // EnscapePage whyEnscape
    if (result.whyEnscape) {
      result.whyEnscape = {
        ...result.whyEnscape,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.description ? { description: edits.overview.description } : {}),
        ...(editCards && Array.isArray(result.whyEnscape.cards)
          ? {
              cards: editCards.map((c: any, idx: number) => {
                const orig = result.whyEnscape.cards[idx] || {}
                return {
                  ...orig,
                  title: c.title || orig.title || '',
                  description: c.desc || c.description || orig.description || '',
                  tag: orig.tag || c.icon || 'Capability',
                  image: c.image || orig.image || '',
                }
              }),
            }
          : {}),
      }
    }

    // VRayPage whyVRay
    if (result.whyVRay) {
      result.whyVRay = {
        ...result.whyVRay,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.subtitle ? { eyebrow: edits.overview.subtitle } : {}),
        ...(editCards && Array.isArray(result.whyVRay.cards)
          ? {
              cards: editCards.map((c: any, idx: number) => {
                const orig = result.whyVRay.cards[idx] || {}
                return {
                  ...orig,
                  title: c.title || orig.title || '',
                  description: c.desc || c.description || orig.description || '',
                  badge: orig.badge || c.icon || 'Pro Feature',
                  image: c.image || orig.image || '',
                }
              }),
            }
          : {}),
      }
    }

    // CoronaPage overviewCards
    if (Array.isArray(result.overviewCards) && editCards) {
      result.overviewCards = editCards.map((c: any, idx: number) => {
        const orig = result.overviewCards[idx] || {}
        return {
          ...orig,
          title: c.title || orig.title || '',
          subtitle: orig.subtitle || c.icon || '',
          description: c.desc || c.description || orig.description || '',
          image: c.image || orig.image || '',
          bullets: orig.bullets || [],
        }
      })
    }
  }

  // 5. Merge System Requirements if present
  if (edits.requirements && typeof edits.requirements === 'object') {
    const req = edits.requirements
    const updateRowValue = (rows: any[]) =>
      rows.map((row: any) => {
        const keyStr = `${row.label || ''} ${row.item || ''} ${row.component || ''} ${row.category || ''}`.toLowerCase()
        let newVal: string | undefined
        if (keyStr.includes('operating') || keyStr.includes('os') || keyStr.includes('platform')) newVal = req.os
        else if (keyStr.includes('processor') || keyStr.includes('cpu')) newVal = req.cpu
        else if (keyStr.includes('memory') || keyStr.includes('ram')) newVal = req.ram
        else if (keyStr.includes('graphics') || keyStr.includes('gpu') || keyStr.includes('video')) newVal = req.gpu
        else if (keyStr.includes('storage') || keyStr.includes('disk') || keyStr.includes('hard')) newVal = req.disk
        else if (keyStr.includes('display') || keyStr.includes('monitor') || keyStr.includes('resolution')) newVal = req.display
        if (!newVal) return row
        return {
          ...row,
          ...(row.spec !== undefined ? { spec: newVal } : {}),
          ...(row.value !== undefined ? { value: newVal } : {}),
          ...(row.detail !== undefined ? { detail: newVal } : {}),
          ...(row.recommended !== undefined ? { recommended: newVal } : {}),
          ...(row.windows !== undefined ? { windows: newVal } : {}),
        }
      })

    if (Array.isArray(result.systemRequirements)) {
      result.systemRequirements = updateRowValue(result.systemRequirements)
    } else if (result.systemRequirements && typeof result.systemRequirements === 'object') {
      const sr = { ...result.systemRequirements }
      if (Array.isArray(sr.rows)) sr.rows = updateRowValue(sr.rows)
      if (Array.isArray(sr.windowsSpecs)) sr.windowsSpecs = updateRowValue(sr.windowsSpecs)
      if (Array.isArray(sr.general)) sr.general = updateRowValue(sr.general)
      if (Array.isArray(sr.hardware)) sr.hardware = updateRowValue(sr.hardware)
      if ('minOS' in sr && req.os) sr.minOS = req.os
      if ('minGPU' in sr && req.gpu) sr.minGPU = req.gpu
      if ('minRAM' in sr && req.ram) sr.minRAM = req.ram
      if ('recGPU' in sr && req.gpu) sr.recGPU = req.gpu
      if ('os' in sr && typeof sr.os === 'string' && req.os) sr.os = req.os
      if ('cpu' in sr && typeof sr.cpu === 'string' && req.cpu) sr.cpu = req.cpu
      if ('ram' in sr && typeof sr.ram === 'string' && req.ram) sr.ram = req.ram
      if ('gpu' in sr && typeof sr.gpu === 'string' && req.gpu) sr.gpu = req.gpu
      if ('storage' in sr && typeof sr.storage === 'string' && req.disk) sr.storage = req.disk
      if (sr.android && typeof sr.android === 'object') {
        sr.android = {
          ...sr.android,
          ...(req.os ? { os: req.os } : {}),
          ...(req.cpu ? { processor: req.cpu } : {}),
          ...(req.ram ? { ram: req.ram } : {}),
          ...(req.disk ? { storage: req.disk } : {}),
          ...(req.display ? { display: req.display } : {}),
        }
      }
      result.systemRequirements = sr
    }

    if (result.technicalSpecs && Array.isArray(result.technicalSpecs.specs)) {
      result.technicalSpecs = {
        ...result.technicalSpecs,
        specs: updateRowValue(result.technicalSpecs.specs),
      }
    }

    if (result.platform && typeof result.platform === 'object') {
      result.platform = {
        ...result.platform,
        ...(req.os && typeof result.platform.os === 'string' ? { os: req.os } : {}),
        ...(Array.isArray(result.platform.specs) ? { specs: updateRowValue(result.platform.specs) } : {}),
        ...(Array.isArray(result.platform.sysReqs) ? { sysReqs: updateRowValue(result.platform.sysReqs) } : {}),
      }
    }
  }

  // 6. Merge Licensing Note if present
  if (edits.licensingNote) {
    if (result.licensing && typeof result.licensing === 'object') {
      result.licensing = {
        ...result.licensing,
        note: edits.licensingNote,
        description: edits.licensingNote,
      }
    }
    if (result.pricing && typeof result.pricing === 'object') {
      result.pricing = {
        ...result.pricing,
        note: edits.licensingNote,
        disclaimer: edits.licensingNote,
      }
    }
  }

  // 7. Merge FAQs if present
  if (Array.isArray(edits.faqs) && edits.faqs.length > 0 && Array.isArray(result.faqs)) {
    result.faqs = edits.faqs.map((f: any, idx: number) => {
      const orig = result.faqs[idx] || {}
      const qText = f.q || f.question || orig.q || orig.question || ''
      const aText = f.a || f.answer || orig.a || orig.answer || ''
      return {
        ...orig,
        q: qText,
        a: aText,
        question: qText,
        answer: aText,
        category: orig.category || (f.category ? f.category.toLowerCase() : 'general'),
      }
    })
  }

  return result as T
}

export function useCadPageData<T extends Record<string, any>>(
  productKey: string,
  defaultData: T
) {
  const { isEnabled, sections, edits } = useCadSectionVisibility(productKey)
  const { payload: visualPayload, isEditorMode, isPreviewMode } = useActiveCadVisualPayload(productKey)
  useApplyGlobalCadVisualOverrides(productKey)
  const baseMerged = mergeCadEditsWithPageData(defaultData, edits)
  const data = deepMergeData(baseMerged, visualPayload?.dataOverrides || {}) as T & {
    pdfResources?: any[]
  }
  if (visualPayload?.pdfResources) {
    ;(data as any).pdfResources = visualPayload.pdfResources
  }
  return {
    isEnabled,
    sections,
    edits,
    data,
    visualPayload,
    isEditorMode,
    isPreviewMode,
  }
}
