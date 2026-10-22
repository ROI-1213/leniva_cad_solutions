import { useState, useEffect } from 'react'
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
    productName: aresCommanderData.identity.productName,
    brand: aresCommanderData.identity.brand,
    category: aresCommanderData.identity.category,
    headline: aresCommanderData.hero.heading,
    supportingHeadline: aresCommanderData.hero.supportingHeading,
    shortDescription: aresCommanderData.identity.shortDescription,
    description: aresCommanderData.identity.description,
    platform: aresCommanderData.identity.supportedPlatforms,
    languages: aresCommanderData.identity.languages.join(', '),
    primaryFormat: aresCommanderData.identity.primaryFormat,
    cadEngine: aresCommanderData.identity.cadEngine,
    officialUrl: aresCommanderData.identity.officialUrl,
    downloadUrl: aresCommanderData.identity.downloadUrl,
    trialUrl: aresCommanderData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresCommanderData.licensing.note,
    eyebrow: aresCommanderData.hero.eyebrow,
    h1Highlight: aresCommanderData.hero.h1Highlight,
    heroBadge: aresCommanderData.hero.badge,
    heroHeading: aresCommanderData.hero.heading,
    heroSupportingText: aresCommanderData.hero.supportingText,
    heroImage: aresCommanderData.hero.image,
    secondaryImage: aresCommanderData.hero.heroSecondaryImage,
    trialCta: 'Start Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: aresCommanderData.hero.strip.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresCommanderData.overview.heading,
      subtitle: aresCommanderData.overview.subtitle,
      description: aresCommanderData.overview.description,
      cards: aresCommanderData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.desc,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [...aresCommanderData.identity.keyHighlights],
    requirements: {
      os: aresCommanderData.systemRequirements[0]?.spec || 'Windows 10 / 11 (64-bit), macOS, Linux',
      cpu: aresCommanderData.systemRequirements[1]?.spec || '64-bit Intel Core i5 / AMD Ryzen 5 or higher',
      ram: aresCommanderData.systemRequirements[2]?.spec || '8 GB RAM minimum (16 GB+ recommended)',
      gpu: aresCommanderData.systemRequirements[3]?.spec || 'OpenGL 3.2+ / DirectX 11 compatible 3D GPU',
      disk: aresCommanderData.systemRequirements[5]?.spec || '1 GB+ free SSD space',
      display: aresCommanderData.systemRequirements[4]?.spec || 'Full HD (1920 × 1080) or 4K UHD display',
    },
    faqs: aresCommanderData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  ares_standard: {
    productName: aresStandardData.identity.productName,
    brand: aresStandardData.identity.brand,
    category: aresStandardData.identity.category,
    headline: aresStandardData.hero.heading,
    supportingHeadline: aresStandardData.hero.supportingHeading,
    shortDescription: aresStandardData.identity.shortDescription,
    description: aresStandardData.identity.description,
    platform: aresStandardData.identity.platform,
    languages: aresStandardData.identity.languages.join(', '),
    primaryFormat: aresStandardData.identity.primaryFormat,
    cadEngine: aresStandardData.identity.cadEngine,
    officialUrl: aresStandardData.identity.officialUrl,
    downloadUrl: aresStandardData.identity.downloadUrl,
    trialUrl: aresStandardData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresStandardData.licensing.note,
    eyebrow: aresStandardData.hero.eyebrow,
    h1Highlight: aresStandardData.hero.h1Highlight,
    heroBadge: aresStandardData.hero.badge,
    heroHeading: aresStandardData.hero.heading,
    heroSupportingText: aresStandardData.hero.supportingText,
    heroImage: aresStandardData.hero.image,
    secondaryImage: aresStandardData.hero.heroSecondaryImage,
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: aresStandardData.hero.strip.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresStandardData.overview.heading,
      subtitle: aresStandardData.overview.subtitle,
      description: aresStandardData.overview.description,
      cards: aresStandardData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.desc,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [...aresStandardData.identity.keyHighlights],
    requirements: {
      os: aresStandardData.systemRequirements[0]?.spec || 'Windows 10 / 11 (64-bit)',
      cpu: aresStandardData.systemRequirements[1]?.spec || '64-bit multi-core Intel or AMD processor',
      ram: aresStandardData.systemRequirements[2]?.spec || '8 GB RAM or higher recommended',
      gpu: aresStandardData.systemRequirements[3]?.spec || 'DirectX / OpenGL compatible graphics adapter',
      disk: aresStandardData.systemRequirements[5]?.spec || 'Sufficient free disk space for installation',
      display: aresStandardData.systemRequirements[4]?.spec || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: aresStandardData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  ares_mechanical: {
    productName: aresMechanicalData.identity.productName,
    brand: aresMechanicalData.identity.brand,
    category: aresMechanicalData.identity.category,
    headline: aresMechanicalData.hero.heading,
    supportingHeadline: aresMechanicalData.hero.supportingHeading,
    shortDescription: aresMechanicalData.identity.shortDescription,
    description: aresMechanicalData.identity.description,
    platform: aresMechanicalData.identity.platform,
    languages: aresMechanicalData.identity.languages.join(', '),
    primaryFormat: aresMechanicalData.identity.primaryFormat,
    cadEngine: aresMechanicalData.identity.cadEngine,
    officialUrl: aresMechanicalData.identity.officialUrl,
    downloadUrl: aresMechanicalData.identity.downloadUrl,
    trialUrl: aresMechanicalData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresMechanicalData.licensing.note,
    eyebrow: aresMechanicalData.hero.eyebrow,
    h1Highlight: aresMechanicalData.hero.h1Highlight,
    heroBadge: aresMechanicalData.hero.badge,
    heroHeading: aresMechanicalData.hero.heading,
    heroSupportingText: aresMechanicalData.hero.supportingText,
    heroImage: aresMechanicalData.hero.image,
    secondaryImage: aresMechanicalData.hero.heroSecondaryImage,
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: aresMechanicalData.hero.strip.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresMechanicalData.overview.heading,
      subtitle: aresMechanicalData.overview.subtitle,
      description: aresMechanicalData.overview.description,
      cards: aresMechanicalData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.desc,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [...aresMechanicalData.identity.keyHighlights],
    requirements: {
      os: aresMechanicalData.systemRequirements[0]?.spec || 'Windows 64-bit',
      cpu: aresMechanicalData.systemRequirements[1]?.spec || '64-bit dual-core or multi-core processor',
      ram: aresMechanicalData.systemRequirements[2]?.spec || '8 GB RAM or higher recommended',
      gpu: aresMechanicalData.systemRequirements[3]?.spec || '3D graphics accelerator card with OpenGL / DirectX support',
      disk: aresMechanicalData.systemRequirements[5]?.spec || 'Sufficient free disk space for software and libraries',
      display: aresMechanicalData.systemRequirements[4]?.spec || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: aresMechanicalData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  ares_electrical: {
    productName: aresElectricalData.identity.productName,
    brand: aresElectricalData.identity.brand,
    category: aresElectricalData.identity.category,
    headline: aresElectricalData.hero.heading,
    supportingHeadline: aresElectricalData.hero.supportingHeading,
    shortDescription: aresElectricalData.identity.shortDescription,
    description: aresElectricalData.identity.description,
    platform: aresElectricalData.identity.platform,
    languages: aresElectricalData.identity.languages.join(', '),
    primaryFormat: aresElectricalData.identity.primaryFormat,
    cadEngine: aresElectricalData.identity.cadEngine,
    officialUrl: aresElectricalData.identity.officialUrl,
    downloadUrl: aresElectricalData.identity.downloadUrl,
    trialUrl: aresElectricalData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresElectricalData.licensing.note,
    eyebrow: aresElectricalData.hero.eyebrow,
    h1Highlight: aresElectricalData.hero.h1Highlight,
    heroBadge: aresElectricalData.hero.badge,
    heroHeading: aresElectricalData.hero.heading,
    heroSupportingText: aresElectricalData.hero.supportingText,
    heroImage: aresElectricalData.hero.image,
    secondaryImage: aresElectricalData.hero.heroSecondaryImage,
    trialCta: 'Get Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: aresElectricalData.hero.strip.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresElectricalData.overview.heading,
      subtitle: aresElectricalData.overview.subtitle,
      description: aresElectricalData.overview.description,
      cards: aresElectricalData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.desc,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [...aresElectricalData.identity.keyHighlights],
    requirements: {
      os: aresElectricalData.systemRequirements[0]?.spec || 'Windows 64-bit',
      cpu: aresElectricalData.systemRequirements[1]?.spec || '64-bit Intel Core i5 / AMD Ryzen 5 or higher',
      ram: aresElectricalData.systemRequirements[2]?.spec || '8 GB RAM minimum (16 GB+ recommended)',
      gpu: aresElectricalData.systemRequirements[3]?.spec || 'OpenGL / DirectX compatible graphics card',
      disk: aresElectricalData.systemRequirements[5]?.spec || 'Sufficient free disk space for installation and symbol libraries',
      display: aresElectricalData.systemRequirements[4]?.spec || 'Full HD (1920 × 1080) or higher recommended',
    },
    faqs: aresElectricalData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  ares_kudo: {
    productName: aresKudoData.product.name,
    brand: aresKudoData.product.developer,
    category: aresKudoData.product.category,
    headline: aresKudoData.hero.headline,
    supportingHeadline: aresKudoData.hero.subheadline,
    shortDescription: aresKudoData.product.tagline,
    description: aresKudoData.overview.intro,
    platform: 'Web Browser (Chrome, Edge, Safari, Firefox) — Windows, macOS, Linux, ChromeOS',
    languages: 'English, German, French, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'DWG, DXF, DWT, DWF, PDF',
    cadEngine: 'Graebert Cloud DWG Engine',
    officialUrl: 'https://www.graebert.com/cad-software/ares-kudo/',
    downloadUrl: 'https://kudo.graebert.com/',
    trialUrl: 'https://kudo.graebert.com/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresKudoData.pricing.note,
    eyebrow: 'GRAEBERT | CLOUD-NATIVE BROWSER CAD',
    h1Highlight: aresKudoData.hero.highlightText,
    heroBadge: aresKudoData.hero.badge,
    heroHeading: `${aresKudoData.hero.headline} ${aresKudoData.hero.highlightText}`,
    heroSupportingText: aresKudoData.hero.subheadline,
    heroImage: '/images/ares-kudo/ares-kudo-hero.jpg',
    secondaryImage: '/images/ares-commander/ares-commander-hero.jpg',
    trialCta: 'Start 30-Day Free Trial',
    pricingCta: 'Request a Quote',
    specStrip: aresKudoData.hero.quickStats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresKudoData.overview.title,
      subtitle: aresKudoData.overview.subtitle,
      description: aresKudoData.overview.intro,
      cards: aresKudoData.overview.pillars.map((p: any) => ({
        title: p.title,
        desc: p.description,
        icon: p.icon,
        image: '/images/ares-kudo/ares-kudo-hero.jpg',
      })),
    },
    highlights: [
      ...aresKudoData.hero.trustChips,
      ...aresKudoData.features.slice(0, 6).map((f: any) => `${f.title}: ${f.description}`),
    ],
    requirements: {
      os: aresKudoData.systemRequirements.devices.map((d: any) => d.os).join(', '),
      cpu: aresKudoData.systemRequirements.hardware.find((h: any) => h.spec.includes('Processor'))?.recommended || 'Multi-core Intel Core i5 / AMD Ryzen 5 / Apple Silicon',
      ram: aresKudoData.systemRequirements.hardware.find((h: any) => h.spec.includes('RAM'))?.recommended || '8 GB+ system RAM',
      gpu: aresKudoData.systemRequirements.hardware.find((h: any) => h.spec.includes('Graphics'))?.recommended || 'Dedicated or integrated GPU with WebGL 2.0 hardware acceleration',
      disk: 'Zero local disk installation (100% browser-based)',
      display: aresKudoData.systemRequirements.hardware.find((h: any) => h.spec.includes('Display'))?.recommended || '1920 × 1080 Full HD or 4K UHD',
    },
    faqs: aresKudoData.faqs.map((f: any) => ({ q: f.question, a: f.answer, category: f.category })),
  },

  ares_touch: {
    productName: aresTouchData.name,
    brand: aresTouchData.company,
    category: aresTouchData.category,
    headline: aresTouchData.hero.headline,
    supportingHeadline: aresTouchData.hero.subheadline,
    shortDescription: aresTouchData.tagline,
    description: aresTouchData.overview.lead,
    platform: 'Android & iOS (Smartphones & Tablets)',
    languages: '14 Languages including English, German, French, Spanish, Japanese, Korean',
    primaryFormat: 'Native DWG, DXF, PDF',
    cadEngine: 'Graebert Mobile DWG Engine',
    officialUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    downloadUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    trialUrl: 'https://www.graebert.com/cad-software/ares-touch/',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: aresTouchData.licensing.plans[0]?.description || 'Included in ARES Trinity or available via Google Play & Apple App Store.',
    eyebrow: 'GRAEBERT | MOBILE DWG CAD',
    h1Highlight: aresTouchData.hero.highlightText,
    heroBadge: aresTouchData.hero.badge,
    heroHeading: `${aresTouchData.hero.headline} ${aresTouchData.hero.highlightText}`,
    heroSupportingText: aresTouchData.hero.subheadline,
    heroImage: '/images/ares-touch/ares-touch-hero.jpg',
    secondaryImage: '/images/ares-commander/ares-commander-hero.jpg',
    trialCta: 'Request a Demo',
    pricingCta: 'Request Enterprise Quote',
    specStrip: aresTouchData.hero.quickStats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: aresTouchData.overview.title,
      subtitle: aresTouchData.overview.sectionBadge,
      description: aresTouchData.overview.lead,
      cards: aresTouchData.overview.highlights.map((h: any) => ({
        title: h.title,
        desc: h.description,
        icon: h.icon,
        image: '/images/ares-touch/ares-touch-hero.jpg',
      })),
    },
    highlights: [
      ...aresTouchData.hero.trustBadges,
      ...aresTouchData.coreCapabilities.items.map((item: any) => `${item.title}: ${item.description}`),
    ],
    requirements: {
      os: `${aresTouchData.systemRequirements.android.os} / ${aresTouchData.systemRequirements.ios.os}`,
      cpu: `${aresTouchData.systemRequirements.android.processor} / ${aresTouchData.systemRequirements.ios.devices}`,
      ram: `${aresTouchData.systemRequirements.android.ram} (Android) / ${aresTouchData.systemRequirements.ios.ram} (iOS)`,
      gpu: aresTouchData.systemRequirements.android.display,
      disk: aresTouchData.systemRequirements.android.storage,
      display: `${aresTouchData.systemRequirements.android.display} / ${aresTouchData.systemRequirements.ios.display}`,
    },
    faqs: aresTouchData.faqs.map((f: any) => ({ q: f.question, a: f.answer, category: f.category })),
  },

  sketchup_pro: {
    productName: sketchupProData.name,
    brand: sketchupProData.vendor,
    category: sketchupProData.category,
    headline: sketchupProData.hero.title,
    supportingHeadline: sketchupProData.hero.subtitle,
    shortDescription: sketchupProData.tagline,
    description: sketchupProData.overview.summary,
    platform: 'Windows 10 / 11 (64-bit), macOS 12+, iPadOS, Web Browser',
    languages: 'English, French, German, Italian, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'SKP, DWG, DXF, IFC, OBJ, FBX, STL, 3DS, DAE',
    cadEngine: 'Trimble SketchUp 3D Modeling Engine',
    officialUrl: 'https://www.sketchup.com/en/products/sketchup-pro',
    downloadUrl: 'https://www.sketchup.com/en/try-sketchup',
    trialUrl: 'https://www.sketchup.com/en/try-sketchup',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription per named user. Includes Desktop, LayOut, iPad, Web & Trimble Connect.',
    eyebrow: 'TRIMBLE | 3D MODELING & DOCUMENTATION',
    h1Highlight: sketchupProData.hero.titleHighlight,
    heroBadge: sketchupProData.hero.badge,
    heroHeading: `${sketchupProData.hero.title} ${sketchupProData.hero.titleHighlight}`,
    heroSupportingText: sketchupProData.hero.subtitle,
    heroImage: '/images/software/sketchup-pro.jpg',
    secondaryImage: '/images/software/sections/aec-construction.jpg',
    trialCta: 'Request a Trial',
    pricingCta: 'Request a Quote',
    specStrip: sketchupProData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: sketchupProData.overview.headline,
      subtitle: 'Desktop + LayOut + iPad + Web + Trimble Connect',
      description: sketchupProData.overview.summary,
      cards: sketchupProData.overview.pillars.map((p: any) => ({
        title: p.title,
        desc: p.description,
        icon: p.icon,
        image: '/images/software/sketchup-pro.jpg',
      })),
    },
    highlights: [
      ...sketchupProData.hero.trustBadges,
      ...sketchupProData.coreCapabilities.map((c: any) => `${c.title}: ${c.description}`),
    ],
    requirements: {
      os: `${sketchupProData.systemRequirements.windows.os} / ${sketchupProData.systemRequirements.mac.os}`,
      cpu: `${sketchupProData.systemRequirements.windows.recommended.cpu} (${sketchupProData.systemRequirements.mac.recommended.cpu})`,
      ram: sketchupProData.systemRequirements.windows.recommended.ram,
      gpu: sketchupProData.systemRequirements.windows.recommended.gpu,
      disk: sketchupProData.systemRequirements.windows.recommended.storage,
      display: sketchupProData.systemRequirements.windows.recommended.display,
    },
    faqs: sketchupProData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  sketchup_proscan: {
    productName: proScanData.identity.productName,
    brand: proScanData.identity.brand,
    category: proScanData.identity.category,
    headline: proScanData.hero.headline,
    supportingHeadline: proScanData.hero.supportingHeadline,
    shortDescription: proScanData.identity.valueProposition,
    description: proScanData.overview.intro,
    platform: proScanData.identity.platform,
    languages: 'English, French, German, Italian, Spanish, Japanese',
    primaryFormat: 'SKP, E57, RCP, RCS, LAS, LAZ, TZF, PLY, DWG, DXF',
    cadEngine: 'Trimble SketchUp + Scan Essentials Engine',
    officialUrl: proScanData.identity.officialUrl,
    downloadUrl: proScanData.identity.trialUrl,
    trialUrl: proScanData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: 'Annual commercial subscription. Scan Essentials and Revit Importer require Windows 10/11 (64-bit).',
    eyebrow: proScanData.hero.eyebrow,
    h1Highlight: 'Scan Essentials',
    heroBadge: proScanData.hero.eyebrow,
    heroHeading: proScanData.hero.headline,
    heroSupportingText: proScanData.hero.shortDescription,
    heroImage: '/images/software/sketchup-scan.jpg',
    secondaryImage: '/images/software/sections/point-cloud-scan.jpg',
    trialCta: 'Start Free Trial',
    pricingCta: 'Request a Quote',
    specStrip: proScanData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: proScanData.overview.title,
      subtitle: 'Point Cloud to 3D BIM & 2D Documentation',
      description: proScanData.overview.intro,
      cards: proScanData.overview.blocks.map((b: any) => ({
        title: b.title,
        desc: b.description,
        icon: b.icon,
        image: '/images/software/sections/point-cloud-scan.jpg',
      })),
    },
    highlights: [
      ...proScanData.hero.featureLabels,
      ...proScanData.scanEssentials.capabilities.map((c: any) => `${c.title}: ${c.description}`),
    ],
    requirements: {
      os: proScanData.systemRequirements.os.find((r: any) => r.label.includes('Scan Essentials'))?.value || 'Windows 10 / Windows 11 (64-bit)',
      cpu: proScanData.systemRequirements.hardware.find((r: any) => r.label.includes('Processor'))?.value || 'Multi-core Intel Core i7 / i9 or AMD Ryzen 7 / 9',
      ram: proScanData.systemRequirements.hardware.find((r: any) => r.label.includes('Memory'))?.value || '16 GB RAM minimum (32 GB – 64 GB+ recommended)',
      gpu: proScanData.systemRequirements.hardware.find((r: any) => r.label.includes('Graphics'))?.value || 'Dedicated 3D GPU with 4 GB – 8 GB+ VRAM',
      disk: proScanData.systemRequirements.hardware.find((r: any) => r.label.includes('Storage'))?.value || 'Fast NVMe SSD recommended for large point cloud files',
      display: '1920 × 1080 Full HD or 4K UHD display',
    },
    faqs: proScanData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  sketchup_advanced: {
    productName: sketchupProAdvancedData.identity.productName,
    brand: sketchupProAdvancedData.identity.brand,
    category: sketchupProAdvancedData.identity.category,
    headline: sketchupProAdvancedData.hero.headline,
    supportingHeadline: sketchupProAdvancedData.hero.supportingHeadline,
    shortDescription: sketchupProAdvancedData.hero.description,
    description: sketchupProAdvancedData.overview.description,
    platform: sketchupProAdvancedData.identity.supportedPlatforms,
    languages: 'English, French, German, Italian, Spanish, Japanese',
    primaryFormat: 'SKP, RVT, IFC, E57, RCP, LAS, LAZ, TZF, DWG, DXF',
    cadEngine: 'Trimble SketchUp + Scan Essentials + Revit Importer',
    officialUrl: sketchupProAdvancedData.identity.officialUrl,
    downloadUrl: sketchupProAdvancedData.identity.trialUrl,
    trialUrl: sketchupProAdvancedData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: sketchupProAdvancedData.pricing.disclaimer,
    eyebrow: sketchupProAdvancedData.hero.eyebrow,
    h1Highlight: 'Advanced Workflows',
    heroBadge: sketchupProAdvancedData.hero.badge,
    heroHeading: sketchupProAdvancedData.hero.headline,
    heroSupportingText: sketchupProAdvancedData.hero.description,
    heroImage: '/images/software/sketchup-advanced.jpg',
    secondaryImage: '/images/software/sections/bim-revit-sync.jpg',
    trialCta: 'Start Free Trial',
    pricingCta: 'Request a Quote',
    specStrip: sketchupProAdvancedData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: sketchupProAdvancedData.overview.heading,
      subtitle: sketchupProAdvancedData.overview.eyebrow,
      description: sketchupProAdvancedData.overview.description,
      cards: sketchupProAdvancedData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.description,
        icon: c.icon,
        image: '/images/software/sketchup-advanced.jpg',
      })),
    },
    highlights: [
      ...sketchupProAdvancedData.hero.highlights,
      ...sketchupProAdvancedData.whatsIncluded.items.map((i: any) => `${i.name}: ${i.description}`),
    ],
    requirements: {
      os: sketchupProAdvancedData.systemRequirements.windowsNote,
      cpu: sketchupProAdvancedData.systemRequirements.windowsSpecs.find((s: any) => s.component.includes('Processor'))?.recommended || 'Intel Core i7/i9 or AMD Ryzen 7/9 (2.8+ GHz)',
      ram: sketchupProAdvancedData.systemRequirements.windowsSpecs.find((s: any) => s.component.includes('RAM'))?.recommended || '32 GB – 64 GB RAM (for large point clouds & Revit files)',
      gpu: sketchupProAdvancedData.systemRequirements.windowsSpecs.find((s: any) => s.component.includes('Graphics'))?.recommended || 'Dedicated NVIDIA RTX / Quadro GPU with 8 GB+ VRAM',
      disk: sketchupProAdvancedData.systemRequirements.windowsSpecs.find((s: any) => s.component.includes('Storage'))?.recommended || 'NVMe SSD with 50 GB+ free space',
      display: sketchupProAdvancedData.systemRequirements.windowsSpecs.find((s: any) => s.component.includes('Display'))?.recommended || '1920 × 1080 Full HD or 4K UHD',
    },
    faqs: sketchupProAdvancedData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  sketchup_studio: {
    productName: sketchUpStudioData.identity.productName,
    brand: sketchUpStudioData.identity.brand,
    category: sketchUpStudioData.identity.category,
    headline: sketchUpStudioData.hero.headline,
    supportingHeadline: sketchUpStudioData.hero.subheading,
    shortDescription: sketchUpStudioData.identity.positioning,
    description: sketchUpStudioData.intro.description,
    platform: 'Windows 10 / 11 (64-bit) — SketchUp Pro also on macOS, iPad & Web',
    languages: 'English, French, German, Italian, Spanish, Japanese, Korean, Chinese',
    primaryFormat: 'SKP, DWG, DXF, RVT, IFC, E57, RCP, LAS, OBJ, FBX',
    cadEngine: 'Trimble SketchUp + Chaos V-Ray + Scan Essentials',
    officialUrl: sketchUpStudioData.identity.officialUrl,
    downloadUrl: sketchUpStudioData.identity.trialUrl,
    trialUrl: sketchUpStudioData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: sketchUpStudioData.licensing.note,
    eyebrow: sketchUpStudioData.hero.eyebrow,
    h1Highlight: 'SketchUp Studio',
    heroBadge: sketchUpStudioData.hero.badge,
    heroHeading: sketchUpStudioData.hero.headline,
    heroSupportingText: sketchUpStudioData.hero.description,
    heroImage: '/images/software/sketchup-studio.jpg',
    secondaryImage: '/images/software/sections/vray-photoreal.jpg',
    trialCta: 'Start Free Trial',
    pricingCta: 'Request a Quote',
    specStrip: sketchUpStudioData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: sketchUpStudioData.intro.heading,
      subtitle: sketchUpStudioData.intro.eyebrow,
      description: sketchUpStudioData.intro.description,
      cards: sketchUpStudioData.includedTools.slice(0, 4).map((t: any) => ({
        title: t.name,
        desc: t.description,
        icon: 'Box',
        image: t.image,
      })),
    },
    highlights: [
      ...sketchUpStudioData.hero.chips,
      ...sketchUpStudioData.includedTools.map((t: any) => `${t.name} (${t.role}): ${t.description}`),
    ],
    requirements: {
      os: sketchUpStudioData.systemRequirements.windows[0]?.value || 'Windows 10 / Windows 11 (64-bit)',
      cpu: sketchUpStudioData.systemRequirements.windows[1]?.value || '2+ GHz multi-core processor (Intel Core i7/i9 or AMD Ryzen 7/9)',
      ram: sketchUpStudioData.systemRequirements.windows[2]?.value || '8 GB minimum — 16 GB to 32 GB+ recommended',
      gpu: sketchUpStudioData.systemRequirements.windows[3]?.value || '3D class video card with 1 GB+ VRAM (NVIDIA RTX 8 GB+ VRAM recommended)',
      disk: sketchUpStudioData.systemRequirements.windows[4]?.value || 'Minimum 6 GB+ free disk space (NVMe SSD recommended)',
      display: '1920 × 1080 Full HD or 4K display',
    },
    faqs: sketchUpStudioData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  chaos_enscape: {
    productName: enscapeData.identity.productName,
    brand: enscapeData.identity.brand,
    category: enscapeData.identity.category,
    headline: enscapeData.hero.h1,
    supportingHeadline: enscapeData.hero.supportingHeadline,
    shortDescription: enscapeData.hero.shortDescription,
    description: enscapeData.overview.description,
    platform: 'Windows 10 / 11 (64-bit) & macOS 13 Ventura or higher',
    languages: 'English, German, French, Italian, Spanish, Portuguese, Japanese, Chinese',
    primaryFormat: 'Direct Plugin for Revit, SketchUp, Rhino, Archicad & Vectorworks',
    cadEngine: 'Chaos Enscape Real-Time Ray Tracing Engine',
    officialUrl: enscapeData.identity.officialUrl,
    downloadUrl: enscapeData.identity.trialUrl,
    trialUrl: enscapeData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: enscapeData.pricing.note,
    eyebrow: enscapeData.hero.eyebrow,
    h1Highlight: enscapeData.hero.h1Highlight,
    heroBadge: enscapeData.hero.eyebrow,
    heroHeading: enscapeData.hero.h1,
    heroSupportingText: enscapeData.hero.shortDescription,
    heroImage: enscapeData.hero.heroImage,
    secondaryImage: enscapeData.hero.heroSecondaryImage,
    trialCta: 'Start Free 14-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: enscapeData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: enscapeData.overview.heading,
      subtitle: 'Live Bi-Directional CAD & BIM Visualization',
      description: enscapeData.overview.description,
      cards: enscapeData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.description,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [
      ...enscapeData.hero.featureChips,
      ...enscapeData.capabilities.map((c: any) => `${c.title}: ${c.description}`),
    ],
    requirements: {
      os: `${enscapeData.systemRequirements.windows.os} / ${enscapeData.systemRequirements.mac.os}`,
      cpu: 'Multi-core Intel Core i7 / AMD Ryzen 7 or Apple M-Series processor',
      ram: '16 GB RAM minimum (32 GB recommended for large BIM projects)',
      gpu: `${enscapeData.systemRequirements.windows.gpuMin} (Rec: ${enscapeData.systemRequirements.windows.gpuRec})`,
      disk: 'Fast SSD storage for application and Chaos Cosmos asset cache',
      display: 'Full HD 1920 × 1080 or 4K UHD display',
    },
    faqs: enscapeData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  chaos_vray: {
    productName: vrayData.identity.productName,
    brand: vrayData.identity.brand,
    category: vrayData.identity.category,
    headline: vrayData.hero.h1,
    supportingHeadline: vrayData.hero.supportingHeadline,
    shortDescription: vrayData.hero.shortDescription,
    description: vrayData.overview.description,
    platform: 'Windows 10 / 11 (64-bit), macOS 11+, Red Hat Enterprise Linux / CentOS',
    languages: 'English',
    primaryFormat: 'Plugin for SketchUp, 3ds Max, Revit, Rhino, Maya, Cinema 4D, Blender, Houdini, Unreal',
    cadEngine: 'Chaos V-Ray Physically Based CPU & GPU Ray Tracing Engine',
    officialUrl: vrayData.identity.officialUrl,
    downloadUrl: vrayData.identity.trialUrl,
    trialUrl: vrayData.identity.trialUrl,
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: vrayData.pricing.note,
    eyebrow: vrayData.hero.eyebrow,
    h1Highlight: vrayData.hero.h1Highlight,
    heroBadge: vrayData.hero.eyebrow,
    heroHeading: vrayData.hero.h1,
    heroSupportingText: vrayData.hero.shortDescription,
    heroImage: vrayData.hero.heroImage,
    secondaryImage: vrayData.hero.heroSecondaryImage,
    trialCta: 'Start Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: vrayData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: vrayData.overview.heading,
      subtitle: 'Academy Award & Engineering Emmy-Winning Ray Tracer',
      description: vrayData.overview.description,
      cards: vrayData.overview.cards.map((c: any) => ({
        title: c.title,
        desc: c.description,
        icon: c.icon,
        image: c.image,
      })),
    },
    highlights: [
      ...vrayData.hero.highlights,
      ...vrayData.capabilities.map((c: any) => `${c.title}: ${c.description}`),
    ],
    requirements: {
      os: vrayData.systemRequirements.general.find((r: any) => r.label.includes('Operating Systems'))?.value || 'Windows 10 / 11 (64-bit), macOS 11+, RHEL/CentOS Linux',
      cpu: vrayData.systemRequirements.general.find((r: any) => r.label.includes('Processor'))?.value || '64-bit Intel or AMD multi-core processor with AVX2 support, or Apple Silicon',
      ram: vrayData.systemRequirements.general.find((r: any) => r.label.includes('System Memory'))?.value || 'Minimum 8 GB RAM (16 GB – 64 GB+ recommended)',
      gpu: vrayData.systemRequirements.general.find((r: any) => r.label.includes('GPU Acceleration'))?.value || 'NVIDIA Maxwell, Pascal, Turing, Ampere, or Ada Lovelace RTX cards',
      disk: vrayData.systemRequirements.general.find((r: any) => r.label.includes('Storage'))?.value || 'Minimum 2 GB – 15 GB free SSD space',
      display: 'Full HD 1920 × 1080 or 4K UHD Color-Calibrated Display',
    },
    faqs: vrayData.faqs.map((f: any) => ({ q: f.q, a: f.a, category: f.category })),
  },

  chaos_corona: {
    productName: coronaData.productName,
    brand: coronaData.brand,
    category: coronaData.category,
    headline: coronaData.hero.headline,
    supportingHeadline: coronaData.hero.subheadline,
    shortDescription: coronaData.hero.description,
    description: `${coronaData.overview.lead} ${coronaData.overview.body}`,
    platform: 'Windows 10 / 11 (64-bit) & macOS 10.14+ (Intel & Apple Silicon native)',
    languages: 'English',
    primaryFormat: 'Plugin for Autodesk 3ds Max & Maxon Cinema 4D',
    cadEngine: 'Chaos Corona Unbiased & Biased CPU Path Tracing Engine',
    officialUrl: coronaData.officialWebsite,
    downloadUrl: 'https://www.chaos.com/corona/free-trial',
    trialUrl: 'https://www.chaos.com/corona/free-trial',
    enquiryEmail: 'viju@leniva3d.com',
    licensingNote: coronaData.pricing.note,
    eyebrow: 'CHAOS CORONA | ARCHITECTURAL RENDERING',
    h1Highlight: 'Without the Technical Complexity',
    heroBadge: coronaData.hero.badge,
    heroHeading: coronaData.hero.headline,
    heroSupportingText: coronaData.hero.description,
    heroImage: '/images/products/corona-hero.png',
    secondaryImage: '/images/software/sections/corona-lightmix.jpg',
    trialCta: 'Start Free 30-Day Trial',
    pricingCta: 'Request a Quote',
    specStrip: coronaData.hero.stats.map((s: any) => ({ label: s.label, value: s.value })),
    overview: {
      heading: coronaData.overview.title,
      subtitle: 'Artist-Friendly Photorealistic Rendering for 3ds Max & Cinema 4D',
      description: `${coronaData.overview.lead} ${coronaData.overview.body}`,
      cards: coronaData.overview.pillars.map((p: any) => ({
        title: p.title,
        desc: p.description,
        icon: p.icon,
        image: '/images/software/sections/corona-lightmix.jpg',
      })),
    },
    highlights: [
      ...coronaData.hero.trustSignals,
      ...coronaData.benefits.map((b: any) => `${b.title}: ${b.description}`),
    ],
    requirements: {
      os: coronaData.systemRequirements[3]?.detail || 'Windows 10 or Windows 11 (64-bit) | macOS 10.14+ (Cinema 4D)',
      cpu: coronaData.systemRequirements[1]?.detail || '64-bit Intel or AMD processor with SSE4.1 support, or Apple Silicon (M1/M2/M3/M4)',
      ram: coronaData.systemRequirements[5]?.detail || '16 GB RAM minimum — 32 GB to 64 GB+ recommended for complex architectural scenes',
      gpu: coronaData.systemRequirements[2]?.detail || 'NVIDIA GPU with Maxwell+ architecture for Fast Preview Denoiser / RTX GPU for Chaos Vantage',
      disk: 'Fast SSD with 10 GB+ free space for Chaos Cosmos asset caching',
      display: 'Full HD 1920 × 1080 or 4K UHD Display',
    },
    faqs: coronaData.faqs.map((f: any) => ({ q: f.question, a: f.answer, category: f.category })),
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
  const data = mergeCadEditsWithPageData(defaultData, edits)
  return { isEnabled, sections, edits, data }
}
