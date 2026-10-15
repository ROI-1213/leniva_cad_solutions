import { useState, useEffect } from 'react'

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

export function getCadProductEdits(productKey: string): any {
  try {
    const raw = localStorage.getItem('leniva_cad_software_edits')
    if (raw) {
      const parsed = JSON.parse(raw)
      return parsed[productKey] || null
    }
  } catch {
    // ignore
  }
  return null
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

  useEffect(() => {
    const update = () => setSections(readSections())
    window.addEventListener('storage', update)
    window.addEventListener('leniva_cad_edits_updated', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('leniva_cad_edits_updated', update)
    }
  }, [productKey])

  const isEnabled = (secKey: keyof CadEnabledSections) => sections[secKey] !== false

  return { isEnabled, sections }
}
