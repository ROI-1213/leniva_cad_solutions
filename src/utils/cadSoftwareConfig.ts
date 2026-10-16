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
  const [edits, setEdits] = useState<any>(() => getCadProductEdits(productKey))

  useEffect(() => {
    const update = () => {
      setSections(readSections())
      setEdits(getCadProductEdits(productKey))
    }
    window.addEventListener('storage', update)
    window.addEventListener('leniva_cad_edits_updated', update)
    return () => {
      window.removeEventListener('storage', update)
      window.removeEventListener('leniva_cad_edits_updated', update)
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
      ...(edits.headline
        ? {
            headline: edits.headline,
            mainHeadline: edits.headline,
            corePurpose: edits.headline,
            coreMessage: edits.headline,
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

    const highlightChips =
      Array.isArray(edits.highlights) && edits.highlights.length > 0
        ? edits.highlights
        : undefined

    result.hero = {
      ...result.hero,
      ...(edits.eyebrow ? { eyebrow: edits.eyebrow } : {}),
      ...(edits.heroBadge ? { badge: edits.heroBadge } : {}),
      ...(edits.heroHeading || edits.headline
        ? {
            heading: edits.heroHeading || edits.headline,
            headline: edits.heroHeading || edits.headline,
            h1: edits.heroHeading || edits.headline,
          }
        : {}),
      ...(edits.h1Highlight ? { h1Highlight: edits.h1Highlight } : {}),
      ...(edits.supportingHeadline
        ? {
            supportingHeadline: edits.supportingHeadline,
            supportingHeading: edits.supportingHeadline,
            subheading: edits.supportingHeadline,
          }
        : {}),
      ...(edits.heroSupportingText
        ? {
            supportingText: edits.heroSupportingText,
            description: edits.heroSupportingText,
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
      ...(stripItems ? { strip: stripItems } : {}),
      ...(statsItems ? { stats: statsItems } : {}),
      ...(highlightChips
        ? {
            labels: highlightChips,
            featureChips: highlightChips,
            highlights: highlightChips,
            featureLabels: highlightChips,
            chips: highlightChips,
          }
        : {}),
    }
  }

  // 4. Merge Overview / Intro if present
  if (edits.overview) {
    if (result.overview) {
      const updatedCards =
        Array.isArray(edits.overview.cards) && edits.overview.cards.length > 0 && Array.isArray(result.overview.cards)
          ? edits.overview.cards.map((c: any, idx: number) => {
              const orig = result.overview.cards[idx] || {}
              return {
                ...orig,
                title: c.title || orig.title || '',
                desc: c.desc || orig.desc || '',
                description: c.desc || orig.description || '',
                subtitle: orig.subtitle || c.icon || '',
                icon: c.icon || orig.icon || 'Box',
                image: c.image || orig.image || '',
                bullets: orig.bullets || [],
              }
            })
          : result.overview.cards

      const updatedBlocks =
        Array.isArray(edits.overview.cards) && edits.overview.cards.length > 0 && Array.isArray(result.overview.blocks)
          ? edits.overview.cards.map((c: any, idx: number) => {
              const orig = result.overview.blocks[idx] || {}
              return {
                ...orig,
                title: c.title || orig.title || '',
                description: c.desc || orig.description || '',
                subtitle: orig.subtitle || '',
                icon: c.icon || orig.icon || 'Box',
                bullets: orig.bullets || [],
              }
            })
          : result.overview.blocks

      result.overview = {
        ...result.overview,
        ...(edits.overview.heading
          ? {
              heading: edits.overview.heading,
              title: edits.overview.heading,
            }
          : {}),
        ...(edits.overview.description
          ? {
              description: edits.overview.description,
              intro: edits.overview.description,
            }
          : {}),
        ...(updatedCards ? { cards: updatedCards } : {}),
        ...(updatedBlocks ? { blocks: updatedBlocks } : {}),
      }
    }

    if (result.intro) {
      result.intro = {
        ...result.intro,
        ...(edits.overview.heading ? { heading: edits.overview.heading } : {}),
        ...(edits.overview.subtitle ? { eyebrow: edits.overview.subtitle } : {}),
        ...(edits.overview.description ? { description: edits.overview.description } : {}),
      }
    }
  }

  // 5. Merge FAQs if present
  if (Array.isArray(edits.faqs) && edits.faqs.length > 0 && Array.isArray(result.faqs)) {
    result.faqs = edits.faqs.map((f: any, idx: number) => {
      const orig = result.faqs[idx] || {}
      return {
        ...orig,
        q: f.q || orig.q || '',
        a: f.a || orig.a || '',
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
