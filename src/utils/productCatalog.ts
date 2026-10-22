import { products as fallbackProducts } from '../data/products'
import { filamentProducts } from '../data/filamentsData'
import { initialWhitePlaData } from '../data/whitePlaProductData'
import { initialGreySilverData } from '../data/greySilverPlaData'
import { initialGoldData } from '../data/goldPlaData'
import { devokMQData, devokMTData } from '../data/scannersData'
import {
  Product,
  ShopItem,
  ProductOverviewCard,
  ProductFeatureCard,
  ProductShowcaseItem,
  ProductSupportCard,
  ProductFaqItem,
  ProductLicensingPlan,
  ProductSystemRequirement,
} from '../types'
import { shopItems as fallbackShopItems } from '../data/shop'

export interface KeySpecItem {
  label: string
  value: string
}

export interface ProductItem {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  category_slug: string
  technology: string
  tagline: string
  hero_heading?: string
  hero_subtitle?: string
  short_description?: string
  description?: string
  hero_image: string
  images?: string[]
  price: number
  original_price?: number
  in_stock: boolean
  is_featured: boolean
  is_quote_based?: boolean
  is_new?: boolean
  is_admin_customized?: boolean
  rating?: number
  reviews_count?: number
  badge?: string
  brochure_url?: string
  video_url?: string

  // Complete Detailed Sections
  key_specs?: KeySpecItem[]
  specifications?: Record<string, string>
  features?: string[]
  feature_cards?: ProductFeatureCard[]
  overview_heading?: string
  overview_description?: string
  overview_cards?: ProductOverviewCard[]
  applications?: string[]
  materials?: string[]
  who_is_it_for?: string[]
  print_gallery?: ProductShowcaseItem[]
  support_cards?: ProductSupportCard[]
  faqs?: ProductFaqItem[]
  licensing_plans?: ProductLicensingPlan[]
  system_requirements?: ProductSystemRequirement[]

  // Filament specific
  filament_material?: string
  filament_color?: string
  filament_color_hex?: string
  filament_diameter?: string
  filament_weight?: string
  filament_print_temp?: string
  filament_bed_temp?: string

  // Scanner specific
  scanner_model_name?: string
  scanner_accuracy?: string
  scanner_resolution?: string
  scanner_speed?: string
  scanner_optical_tech?: string
  scanner_color_support?: string
  scanner_wireless?: string
}

export const STORAGE_KEY_PRODUCTS_CATALOG = 'leniva_admin_products_catalog'
export const STORAGE_KEY_CATALOG_VERSION = 'leniva_catalog_schema_v3'

/**
 * Builds the comprehensive default product catalog by aggregating:
 * 1. 3D Printers (8 FDM, 3 DLP, 2 Industrial LCD) from products.ts
 * 2. 3D Scanners (EINSTAR, 3DeVOK MT, 3DeVOK MQ) from products.ts & scannersData.ts
 * 3. CAD & Engineering Software (13 products) from products.ts & CAD data files
 * 4. 3D Printer Filaments & Materials (8 products) from filamentsData.ts & detail data files
 */
export const buildDefaultProductCatalog = (): ProductItem[] => {
  const hardwareAndSoftwareItems: ProductItem[] = fallbackProducts.map((p, idx) => {
    let scannerAccuracy = ''
    let scannerResolution = ''
    let scannerSpeed = ''
    let scannerTech = ''
    let scannerColor = ''
    let scannerWireless = ''
    let scannerModel = p.name

    if (p.id === '3devok-mq' || p.slug === '3devok-mq') {
      scannerAccuracy = devokMQData.keySpecsSummary?.accuracy || 'Up to 0.08 mm'
      scannerResolution = devokMQData.keySpecsSummary?.resolution || '0.1 mm Point Distance'
      scannerSpeed = devokMQData.keySpecsSummary?.speed || 'Up to 4,500,000 pts/s'
      scannerTech = devokMQData.keySpecsSummary?.technology || '22-Line IR Laser + VCSEL'
      scannerColor = devokMQData.keySpecsSummary?.color || '24-Bit RGB Photoreal Texture'
      scannerWireless = devokMQData.keySpecsSummary?.wireless || 'Supported via Optional Handle'
      scannerModel = devokMQData.modelName || '3DeVOK MQ'
    } else if (p.id === '3devok-mt' || p.slug === '3devok-mt') {
      scannerAccuracy = devokMTData.keySpecsSummary?.accuracy || 'Up to 0.04 mm + 0.06 mm/m'
      scannerResolution = devokMTData.keySpecsSummary?.resolution || '0.05 mm Industrial Resolution'
      scannerSpeed = devokMTData.keySpecsSummary?.speed || 'Up to 3,500,000 pts/s'
      scannerTech = devokMTData.keySpecsSummary?.technology || '34 Blue + 22 IR Laser Lines'
      scannerColor = devokMTData.keySpecsSummary?.color || 'High-Fidelity Color Restoration'
      scannerWireless = devokMTData.keySpecsSummary?.wireless || 'Industrial High-Speed Interface'
      scannerModel = devokMTData.modelName || '3DeVOK MT'
    } else if (p.id === 'einscan' || p.slug === 'einscan') {
      scannerAccuracy = 'Point Distance 0.1 mm ~ 3.0 mm'
      scannerResolution = '0.1 mm High-Density Point Cloud'
      scannerSpeed = 'Up to 14 FPS'
      scannerTech = '3 Infrared VCSEL Projectors + 2 Stereo Depth Cameras'
      scannerColor = 'Built-in 24-Bit RGB Color Camera'
      scannerWireless = 'Single USB Cable Plug-and-Play (0.5 kg)'
      scannerModel = 'EINSTAR 3D Scanner'
    }

    const imagesList = Array.isArray(p.images) && p.images.length > 0
      ? [...p.images]
      : [p.heroImage || '/images/products/pratham-mini.png']

    return {
      id: p.id || `prod-${idx}`,
      slug: p.slug || p.id,
      name: p.name,
      brand: p.brand || 'Leniva',
      category: p.category || 'FDM 3D Printers',
      category_slug: p.categorySlug || 'fdm-3d-printers',
      technology: p.technology || 'Additive Manufacturing',
      badge: p.badge || '',
      hero_heading: p.heroHeading || p.name,
      hero_subtitle: p.heroSubtitle || p.tagline || '',
      tagline: p.tagline || 'High Performance CAD & 3D Solution',
      short_description: p.shortDescription || '',
      description: p.description || '',
      hero_image: p.heroImage || imagesList[0] || '/images/products/pratham-mini.png',
      images: imagesList,
      price: 0,
      original_price: 0,
      in_stock: p.inStock ?? true,
      is_featured: p.isFeatured ?? true,
      is_quote_based: true,
      is_new: p.isNew ?? false,
      brochure_url: p.brochureUrl || '',
      video_url: p.videoUrl || '',
      key_specs: p.keySpecs ? p.keySpecs.map(k => ({ ...k })) : [],
      specifications: p.specifications ? { ...p.specifications } : {},
      features: p.features ? [...p.features] : [],
      feature_cards: p.featureCards ? p.featureCards.map(c => ({ ...c })) : [],
      overview_heading: p.overviewHeading || '',
      overview_description: p.overviewDescription || '',
      overview_cards: p.overviewCards ? p.overviewCards.map(c => ({ ...c })) : [],
      applications: p.applications ? [...p.applications] : [],
      materials: p.materials ? [...p.materials] : [],
      who_is_it_for: p.whoIsItFor ? [...p.whoIsItFor] : [],
      print_gallery: p.printGallery ? p.printGallery.map(g => ({ ...g })) : [],
      support_cards: p.supportCards ? p.supportCards.map(s => ({ ...s })) : [],
      faqs: p.faqs ? p.faqs.map(f => ({ ...f })) : [],
      licensing_plans: p.licensingPlans ? p.licensingPlans.map(l => ({ ...l, features: [...l.features] })) : [],
      system_requirements: p.systemRequirements ? p.systemRequirements.map(r => ({ ...r })) : [],
      scanner_model_name: scannerModel,
      scanner_accuracy: scannerAccuracy,
      scanner_resolution: scannerResolution,
      scanner_speed: scannerSpeed,
      scanner_optical_tech: scannerTech,
      scanner_color_support: scannerColor,
      scanner_wireless: scannerWireless,
    }
  })

  const filamentItems: ProductItem[] = filamentProducts.map(f => {
    const isWhite = f.id === 'filament-pla-white'
    const isGrey = f.id === 'filament-plaplus-grey'
    const isGold = f.id === 'filament-plaplus-gold'

    const specs: Record<string, string> = { ...(f.specifications || {}) }
    if (isWhite) {
      initialWhitePlaData.technicalSpecsTable.forEach(r => { specs[r.property] = r.value })
    } else if (isGrey) {
      initialGreySilverData.technicalSpecs.forEach(r => { specs[r.property] = r.value })
    } else if (isGold) {
      initialGoldData.technicalSpecs.forEach(r => { specs[r.property] = r.value })
    }

    const images = isWhite
      ? initialWhitePlaData.images.map(i => i.src)
      : isGrey
      ? initialGreySilverData.images.map(i => i.src)
      : isGold
      ? initialGoldData.images.map(i => i.src)
      : [f.image, '/images/products/materials-spools-hd.jpg', '/images/products/pratham-mini-gear.png']

    const featureCards: ProductFeatureCard[] = isWhite
      ? initialWhitePlaData.whyChooseCards.map(c => ({ title: c.title, badge: 'Why Choose PLA', desc: c.description }))
      : isGrey
      ? initialGreySilverData.whyChooseCards.map(c => ({ title: c.title, badge: `0${c.number}`.slice(-2), desc: c.description }))
      : isGold
      ? initialGoldData.whyChooseCards.map(c => ({ title: c.title, badge: `0${c.number}`.slice(-2), desc: c.description }))
      : f.features.map((feat, idx) => ({ title: feat.split('–')[0].trim(), badge: `0${idx + 1}`, desc: feat }))

    const overviewCards: ProductOverviewCard[] = isWhite
      ? initialWhitePlaData.applicationCards.map(c => ({ title: c.title, subtitle: c.subtitle, desc: c.description, image: f.image }))
      : isGrey
      ? initialGreySilverData.applicationCards.map(c => ({ title: c.title, desc: c.description, image: f.image }))
      : isGold
      ? initialGoldData.applicationCards.map(c => ({ title: c.title, desc: c.description, image: f.image }))
      : f.applications.map(app => ({ title: app, subtitle: `${f.material} Application`, desc: `Ideal for ${app.toLowerCase()} with ${f.color} ${f.material} filament.`, image: f.image }))

    const supportCards: ProductSupportCard[] = isWhite
      ? initialWhitePlaData.trustPillars.map(t => ({ title: t.title, desc: t.subtitle }))
      : isGrey
      ? initialGreySilverData.trustCards.map(t => ({ title: t.title, desc: t.description }))
      : isGold
      ? initialGoldData.trustCards.map(t => ({ title: t.title, desc: t.description }))
      : [
          { title: 'FAST SHIPPING', desc: 'Free & fast shipping across India in vacuum-sealed moisture-barrier packaging.' },
          { title: 'QUALITY & GENUINE PRODUCT', desc: 'Authentic Make3D certified filament tested for ±0.03 mm dimensional consistency.' },
          { title: 'BROAD FDM COMPATIBILITY', desc: 'Compatible with all standard 1.75 mm open-material FDM/FFF 3D printers.' },
        ]

    const faqs: ProductFaqItem[] = isGrey
      ? initialGreySilverData.faqs.map(q => ({ q: q.question, a: q.answer, category: 'Filament' }))
      : isGold
      ? initialGoldData.faqs.map(q => ({ q: q.question, a: q.answer, category: 'Filament' }))
      : [
          { q: `What material and diameter is ${f.name}?`, a: `It is ${f.material} filament with a ${f.diameter} diameter (±0.03 mm tolerance) on a ${f.weight} net weight spool.`, category: 'Specifications' },
          { q: `What are the recommended printing temperatures for ${f.name}?`, a: `Recommended nozzle temperature is ${f.printTemp} and heated bed temperature is ${f.bedTemp}.`, category: 'Printing' },
          { q: 'Which 3D printers are compatible with this filament?', a: 'It is compatible with all standard FDM / FFF 3D printers that use 1.75 mm filament, including the entire Make3D Pratham series.', category: 'Compatibility' },
        ]

    return {
      id: f.id,
      slug: f.slug,
      name: f.name,
      brand: 'Make3D',
      category: 'Filaments & Materials',
      category_slug: 'filaments',
      technology: 'Materials & Consumables',
      badge: f.badge || 'MAKE3D FILAMENT',
      hero_heading: isWhite ? initialWhitePlaData.fullTitle : isGrey ? initialGreySilverData.fullTitle : isGold ? initialGoldData.fullTitle : `${f.name} | ${f.weight} | ${f.diameter}`,
      hero_subtitle: `${f.material} 3D Printer Filament – ${f.color} (${f.diameter}, ${f.weight})`,
      tagline: `${f.material} 3D Printer Filament – ${f.color} (${f.diameter}, ${f.weight})`,
      short_description: isWhite ? initialWhitePlaData.shortDescription : isGrey ? initialGreySilverData.shortDescription : isGold ? initialGoldData.shortDescription : f.shortDescription,
      description: isWhite
        ? initialWhitePlaData.descriptionParagraphs.join(' ')
        : isGrey
        ? initialGreySilverData.descriptionParagraphs.join(' ')
        : isGold
        ? initialGoldData.descriptionParagraphs.join(' ')
        : f.description,
      hero_image: f.image,
      images,
      price: 0,
      original_price: 0,
      in_stock: f.inStock,
      is_featured: Boolean(f.badge),
      is_quote_based: true,
      rating: f.rating,
      reviews_count: f.reviewsCount,
      key_specs: [
        { label: 'Material', value: f.material },
        { label: 'Color', value: f.color },
        { label: 'Diameter', value: f.diameter },
        { label: 'Net Weight', value: f.weight },
        { label: 'Print Temp', value: f.printTemp },
        { label: 'Bed Temp', value: f.bedTemp },
      ],
      specifications: specs,
      features: f.features ? [...f.features] : [],
      feature_cards: featureCards,
      overview_heading: isGrey ? initialGreySilverData.descriptionHeading : isGold ? initialGoldData.descriptionHeading : `Reliable ${f.material} Filament for Everyday 3D Printing`,
      overview_description: f.description,
      overview_cards: overviewCards,
      applications: f.applications ? [...f.applications] : [],
      materials: [f.material],
      who_is_it_for: f.suitableFor ? [...f.suitableFor] : [],
      support_cards: supportCards,
      faqs,
      filament_material: f.material,
      filament_color: f.color,
      filament_color_hex: f.colorHex,
      filament_diameter: f.diameter,
      filament_weight: f.weight,
      filament_print_temp: f.printTemp,
      filament_bed_temp: f.bedTemp,
    }
  })

  return [...hardwareAndSoftwareItems, ...filamentItems]
}

export const CAD_SLUG_TO_KEY_MAP: Record<string, string> = {
  'ares-mechanical': 'ares_mechanical',
  'ares-electrical': 'ares_electrical',
  'ares-standard': 'ares_standard',
  'ares-commander': 'ares_commander',
  'ares-kudo': 'ares_kudo',
  'ares-touch': 'ares_touch',
  enscape: 'chaos_enscape',
  vray: 'chaos_vray',
  corona: 'chaos_corona',
  sketchup: 'sketchup_pro',
  'sketchup-pro': 'sketchup_pro',
  'sketchup-studio': 'sketchup_studio',
  'sketchup-scan': 'sketchup_proscan',
  'sketchup-proscan': 'sketchup_proscan',
  'sketchup-advanced': 'sketchup_advanced',
  'sketchup-pro-advanced-workflows': 'sketchup_advanced',
}

const applyCadEditsToCatalog = (items: ProductItem[]): ProductItem[] => {
  try {
    const raw = localStorage.getItem('leniva_cad_software_edits')
    if (!raw) return items
    const cadEdits = JSON.parse(raw)
    if (!cadEdits || typeof cadEdits !== 'object') return items

    return items.map(item => {
      const cadKey = CAD_SLUG_TO_KEY_MAP[item.slug] || CAD_SLUG_TO_KEY_MAP[item.id]
      const edit = cadKey ? cadEdits[cadKey] : null
      if (!edit) return item

      return {
        ...item,
        name: edit.productName || item.name,
        brand: edit.brand || item.brand,
        badge: edit.heroBadge || edit.badge || edit.eyebrow || item.badge,
        hero_heading: edit.heroHeading || edit.headline || item.hero_heading,
        hero_subtitle: edit.heroSupportingText || edit.supportingHeadline || item.hero_subtitle,
        tagline: edit.supportingHeadline || edit.headline || item.tagline,
        short_description: edit.shortDescription || edit.heroSupportingText || item.short_description,
        description: edit.description || item.description,
        hero_image: edit.heroImage || item.hero_image,
        images: edit.heroImage
          ? [edit.heroImage, ...(edit.secondaryImage ? [edit.secondaryImage] : (item.images || []).slice(1))]
          : item.images,
        features: Array.isArray(edit.highlights) && edit.highlights.length > 0 ? edit.highlights : item.features,
        key_specs: Array.isArray(edit.specStrip) && edit.specStrip.length > 0 ? edit.specStrip : item.key_specs,
        overview_heading: edit.overview?.heading || edit.overviewHeading || item.overview_heading,
        overview_description: edit.overview?.description || edit.overviewDescription || item.overview_description,
        overview_cards:
          Array.isArray(edit.overview?.cards) && edit.overview.cards.length > 0
            ? edit.overview.cards.map((c: any) => ({
                title: c.title || '',
                description: c.desc || c.description || '',
                icon: c.icon || 'Box',
                image: c.image || edit.heroImage || item.hero_image,
              }))
            : Array.isArray(edit.overviewCards) && edit.overviewCards.length > 0
            ? edit.overviewCards
            : item.overview_cards,
        system_requirements: Array.isArray(edit.requirements) && edit.requirements.length > 0 ? edit.requirements : item.system_requirements,
        faqs:
          Array.isArray(edit.faqs) && edit.faqs.length > 0
            ? edit.faqs.map((f: any) => ({
                question: f.q || f.question || '',
                answer: f.a || f.answer || '',
                category: f.category || 'General',
              }))
            : item.faqs,
        licensing_plans: Array.isArray(edit.licensingOptions) && edit.licensingOptions.length > 0
          ? edit.licensingOptions.map((o: any) => ({
              name: o.title || o.name || '',
              subtitle: o.badge || o.subtitle || '',
              term: o.term || 'Subscription / Perpetual',
              description: o.desc || o.description || '',
              features: Array.isArray(o.features) ? o.features : [],
              badge: o.badge,
            }))
          : item.licensing_plans,
      }
    })
  } catch {
    return items
  }
}

export const getStoredProductsCatalog = (): ProductItem[] => {
  const defaults = buildDefaultProductCatalog()
  const defaultMap = new Map<string, ProductItem>()
  defaults.forEach(d => {
    defaultMap.set(d.id, d)
    defaultMap.set(d.slug, d)
  })

  try {
    const currentVersion = localStorage.getItem(STORAGE_KEY_CATALOG_VERSION)
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS_CATALOG)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge default rich sections into stored items so every product has 100% of frontend sections
        const merged: ProductItem[] = parsed.map((item: ProductItem) => {
          const def = defaultMap.get(item.id) || defaultMap.get(item.slug)
          if (!def) {
            return {
              ...item,
              price: 0,
              original_price: 0,
              is_quote_based: true,
            }
          }
          // If schema upgraded and item was NOT explicitly customized by admin, use fresh frontend-synced default
          if (currentVersion !== 'v3' && !item.is_admin_customized) {
            return { ...def }
          }
          return {
            ...def,
            ...item,
            price: 0,
            original_price: 0,
            is_quote_based: true,
            hero_heading: item.hero_heading || def.hero_heading,
            hero_subtitle: item.hero_subtitle || def.hero_subtitle,
            badge: item.badge || def.badge,
            video_url: item.video_url || def.video_url,
            key_specs: Array.isArray(item.key_specs) && item.key_specs.length > 0 ? item.key_specs : def.key_specs,
            specifications: item.specifications && Object.keys(item.specifications).length > 0
              ? (currentVersion !== 'v3' ? { ...def.specifications, ...item.specifications } : item.specifications)
              : def.specifications,
            features: Array.isArray(item.features) && item.features.length > 0 ? item.features : def.features,
            feature_cards: Array.isArray(item.feature_cards) && item.feature_cards.length > 0 ? item.feature_cards : def.feature_cards,
            overview_heading: item.overview_heading || def.overview_heading,
            overview_description: item.overview_description || def.overview_description,
            overview_cards: Array.isArray(item.overview_cards) && item.overview_cards.length > 0 ? item.overview_cards : def.overview_cards,
            applications: Array.isArray(item.applications) && item.applications.length > 0 ? item.applications : def.applications,
            materials: Array.isArray(item.materials) && item.materials.length > 0 ? item.materials : def.materials,
            who_is_it_for: Array.isArray(item.who_is_it_for) && item.who_is_it_for.length > 0 ? item.who_is_it_for : def.who_is_it_for,
            print_gallery: Array.isArray(item.print_gallery) && item.print_gallery.length > 0 ? item.print_gallery : def.print_gallery,
            support_cards: Array.isArray(item.support_cards) && item.support_cards.length > 0 ? item.support_cards : def.support_cards,
            faqs: Array.isArray(item.faqs) && item.faqs.length > 0 ? item.faqs : def.faqs,
            licensing_plans: Array.isArray(item.licensing_plans) && item.licensing_plans.length > 0 ? item.licensing_plans : def.licensing_plans,
            system_requirements: Array.isArray(item.system_requirements) && item.system_requirements.length > 0 ? item.system_requirements : def.system_requirements,
          }
        })

        // Also ensure any default product missing from stored catalog is appended
        const existingIds = new Set(merged.map(m => m.id))
        defaults.forEach(def => {
          if (!existingIds.has(def.id)) {
            merged.push(def)
          }
        })

        if (currentVersion !== 'v3') {
          localStorage.setItem(STORAGE_KEY_CATALOG_VERSION, 'v3')
          localStorage.setItem(STORAGE_KEY_PRODUCTS_CATALOG, JSON.stringify(merged))
        }
        return applyCadEditsToCatalog(merged)
      }
    }
  } catch (err) {
    console.error('Failed to parse stored products catalog', err)
  }
  return applyCadEditsToCatalog(defaults)
}

export const saveStoredProductsCatalog = (items: ProductItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_CATALOG_VERSION, 'v3')
    localStorage.setItem(STORAGE_KEY_PRODUCTS_CATALOG, JSON.stringify(items))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('leniva_products_catalog_updated'))
    }
  } catch (err) {
    console.error('Failed to save products catalog to localStorage', err)
  }
}

export const resetStoredProductsCatalog = (): ProductItem[] => {
  try {
    localStorage.removeItem(STORAGE_KEY_PRODUCTS_CATALOG)
    localStorage.setItem(STORAGE_KEY_CATALOG_VERSION, 'v3')
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('leniva_products_catalog_updated'))
    }
  } catch (err) {
    console.error('Failed to remove stored products catalog', err)
  }
  return buildDefaultProductCatalog()
}

/**
 * Returns all products formatted as Product[], including newly added custom products from the admin.
 */
export const getStoredProductsAsProducts = (): Product[] => {
  const catalog = getStoredProductsCatalog()
  return catalog.map(item => ({
    id: item.id,
    slug: item.slug || item.id,
    name: item.name,
    brand: item.brand || 'Make3D',
    category: item.category,
    categorySlug: item.category_slug,
    technology: (item.technology as any) || 'FDM 3D Printer',
    badge: item.badge || '',
    heroHeading: item.hero_heading || item.name,
    heroSubtitle: item.hero_subtitle || item.tagline || '',
    tagline: item.tagline || '',
    description: item.description || '',
    shortDescription: item.short_description || item.description || '',
    heroImage: item.hero_image,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.hero_image],
    videoUrl: item.video_url || '',
    keySpecs: item.key_specs ? [...item.key_specs] : [],
    specifications: item.specifications ? { ...item.specifications } : {},
    features: item.features ? [...item.features] : [],
    featureCards: item.feature_cards ? [...item.feature_cards] : [],
    overviewHeading: item.overview_heading || '',
    overviewDescription: item.overview_description || '',
    overviewCards: item.overview_cards ? [...item.overview_cards] : [],
    applications: item.applications ? [...item.applications] : [],
    materials: item.materials ? [...item.materials] : [],
    whoIsItFor: item.who_is_it_for ? [...item.who_is_it_for] : [],
    printGallery: item.print_gallery ? [...item.print_gallery] : [],
    supportCards: item.support_cards ? [...item.support_cards] : [],
    faqs: item.faqs ? [...item.faqs] : [],
    licensingPlans: item.licensing_plans ? [...item.licensing_plans] : [],
    systemRequirements: item.system_requirements ? [...item.system_requirements] : [],
    brochureUrl: item.brochure_url || '',
    price: 0,
    priceDisplay: 'Quote on Request',
    inStock: item.in_stock,
    isNew: item.is_new ?? false,
    isFeatured: item.is_featured ?? true,
  }))
}

export const normalizeShopCategory = (p: ProductItem): { category: string; categoryName: string; brand: string } => {
  const cat = (p.category || '').toLowerCase()
  const catSlug = (p.category_slug || '').toLowerCase()
  const tech = (p.technology || '').toLowerCase()
  const brand = (p.brand || '').trim()
  const name = (p.name || '').toLowerCase()

  // 1. Filaments & Consumables
  if (
    cat.includes('filament') ||
    catSlug.includes('filament') ||
    tech.includes('material') ||
    tech.includes('consumable') ||
    cat.includes('material') ||
    p.filament_material ||
    p.filament_color
  ) {
    return {
      category: 'make3d-filaments',
      categoryName: '3D Printer Filaments',
      brand: brand || 'Make3D',
    }
  }

  // 2. 3D Scanners & Metrology
  if (
    cat.includes('scanner') ||
    catSlug.includes('scanner') ||
    tech.includes('scanner') ||
    tech.includes('metrology') ||
    name.includes('scanner') ||
    name.includes('devok') ||
    name.includes('einscan') ||
    name.includes('einstar') ||
    p.id.includes('scanner') ||
    p.id.includes('devok')
  ) {
    return {
      category: 'scanners',
      categoryName: 'Precision 3D Scanners',
      brand: brand || (name.includes('einscan') || name.includes('einstar') ? 'SHINING 3D' : '3DeVOK'),
    }
  }

  // 3. CAD & 3D Design Software
  if (
    cat.includes('cad') ||
    cat.includes('software') ||
    catSlug.includes('cad') ||
    catSlug.includes('software') ||
    tech.includes('cad') ||
    tech.includes('software') ||
    tech.includes('engine') ||
    brand.toLowerCase() === 'graebert' ||
    brand.toLowerCase() === 'trimble' ||
    brand.toLowerCase() === 'chaos' ||
    name.includes('ares') ||
    name.includes('sketchup') ||
    name.includes('v-ray') ||
    name.includes('vray') ||
    name.includes('enscape') ||
    name.includes('corona')
  ) {
    let cleanBrand = brand
    if (name.includes('ares') || cat.includes('ares') || brand.toLowerCase().includes('graebert')) {
      cleanBrand = 'Graebert'
    } else if (name.includes('sketchup') || cat.includes('sketchup') || brand.toLowerCase().includes('trimble')) {
      cleanBrand = 'Trimble'
    } else if (
      name.includes('v-ray') ||
      name.includes('vray') ||
      name.includes('enscape') ||
      name.includes('corona') ||
      brand.toLowerCase().includes('chaos')
    ) {
      cleanBrand = 'Chaos'
    }
    return {
      category: 'cad-software',
      categoryName: 'CAD & 3D Software',
      brand: cleanBrand || 'Engineering Software',
    }
  }

  // 4. 3D Printers: Industrial LCD (checked BEFORE DLP so EKA GT MAX & EKA F1 16K classify as LCD)
  if (cat.includes('lcd') || catSlug.includes('lcd') || tech.includes('lcd') || name.includes('lcd') || name.includes('gt max') || name.includes('16k')) {
    return {
      category: 'lcd',
      categoryName: 'Industrial LCD Printers',
      brand: brand || 'Make3D',
    }
  }

  // 5. 3D Printers: DLP
  if (cat.includes('dlp') || catSlug.includes('dlp') || tech.includes('dlp') || name.includes('dlp') || name.includes('eka')) {
    return {
      category: 'dlp',
      categoryName: 'DLP 3D Printers',
      brand: brand || 'Make3D',
    }
  }

  // 6. 3D Printers: FDM
  return {
    category: 'fdm',
    categoryName: 'FDM 3D Printers',
    brand: brand || 'Make3D',
  }
}

/**
 * Returns all items formatted as ShopItem[], dynamically mapped from the live products catalog.
 * Any product added or edited in 3D Printers, CAD Software, Scanners, or Filaments reflects immediately in the Shop.
 */
export const getStoredProductsAsShopItems = (): ShopItem[] => {
  const catalog = getStoredProductsCatalog()

  return catalog.map(p => {
    const fallback = fallbackShopItems.find(s => s.slug === p.slug || s.id === p.id || s.productSlug === p.slug)
    const { category, categoryName, brand } = normalizeShopCategory(p)
    const isFilament = category === 'make3d-filaments'

    let specs: Record<string, string> = fallback?.specifications ? { ...fallback.specifications } : {}
    if (p.specifications && Object.keys(p.specifications).length > 0) {
      specs = { ...specs, ...p.specifications }
    } else if (p.key_specs && p.key_specs.length > 0) {
      p.key_specs.forEach(k => {
        if (k.label && k.value) specs[k.label] = k.value
      })
    }

    return {
      id: p.id,
      slug: p.slug || p.id,
      name: p.name,
      category,
      categoryName: p.category || categoryName,
      brand: brand || fallback?.brand || 'Make3D',
      price: 0,
      originalPrice: 0,
      image: p.hero_image || fallback?.image || (p.images && p.images[0]) || '/images/products/pratham-mini.png',
      inStock: p.in_stock ?? fallback?.inStock ?? true,
      rating: p.rating || fallback?.rating || 5.0,
      reviewsCount: p.reviews_count || fallback?.reviewsCount || 12,
      shortDescription: p.short_description || p.tagline || fallback?.shortDescription || p.description || '',
      weightOrVolume: p.filament_weight || fallback?.weightOrVolume || (isFilament ? '1 KG (1.75 mm)' : undefined),
      colorOptions: p.filament_color ? [p.filament_color] : fallback?.colorOptions,
      specifications: specs,
      badge: p.badge || (p.is_featured ? 'Featured' : fallback?.badge),
      isQuoteBased: true,
      productSlug: isFilament ? undefined : (p.slug || p.id),
      isContain: true,
    }
  })
}

export const getCatalogProductBySlug = (slug: string): ProductItem | undefined => {
  const clean = slug.toLowerCase().trim()
  const catalog = getStoredProductsCatalog()
  return catalog.find(p => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean)
}

export function mergeCatalogWithHardwareData<T extends Record<string, any>>(
  slug: string,
  defaultData: T
): T {
  const prod = getCatalogProductBySlug(slug)
  if (!prod || !prod.is_admin_customized) return defaultData

  const result: any = { ...defaultData }

  if (prod.name) {
    if ('name' in result) result.name = prod.name
    if ('fullName' in result) result.fullName = prod.name
  }
  if (prod.tagline) {
    if ('tagline' in result) result.tagline = prod.tagline
    if ('subHeadline' in result) result.subHeadline = prod.tagline
    if ('subtitle' in result) result.subtitle = prod.tagline
  }
  if (prod.hero_heading && 'headline' in result) {
    result.headline = prod.hero_heading
  }
  if (prod.badge && 'badge' in result) {
    result.badge = prod.badge
  }
  if (prod.short_description) {
    if ('primaryDesc' in result) result.primaryDesc = prod.short_description
    if ('shortDescription' in result) result.shortDescription = prod.short_description
  }
  if (prod.description) {
    if ('secondaryDesc' in result) result.secondaryDesc = prod.description
    if ('overviewIntro' in result) result.overviewIntro = prod.description
    if ('description' in result) result.description = prod.description
  }
  if (prod.hero_image && 'heroImage' in result) {
    result.heroImage = prod.hero_image
  }
  if (prod.brochure_url && 'brochureUrl' in result) {
    result.brochureUrl = prod.brochure_url
  }
  if (prod.video_url && 'videoUrl' in result) {
    result.videoUrl = prod.video_url
  }
  if (Array.isArray(prod.key_specs) && prod.key_specs.length > 0 && Array.isArray(result.quickHighlights)) {
    result.quickHighlights = prod.key_specs.map(s => ({ label: s.label, value: s.value }))
  }
  if (Array.isArray(prod.feature_cards) && prod.feature_cards.length > 0) {
    if (Array.isArray(result.features)) {
      result.features = prod.feature_cards.map((fc, i) => ({
        ...(result.features[i] || {}),
        title: fc.title,
        desc: fc.description,
        description: fc.description,
        badge: fc.subtitle || result.features[i]?.badge || '',
        icon: fc.icon || result.features[i]?.icon || 'Sparkles',
      }))
    }
    if (Array.isArray(result.coreCapabilities)) {
      result.coreCapabilities = prod.feature_cards.map((fc, i) => ({
        ...(result.coreCapabilities[i] || {}),
        title: fc.title,
        desc: fc.description,
        badge: fc.subtitle || result.coreCapabilities[i]?.badge || '',
        image: fc.image || result.coreCapabilities[i]?.image || prod.hero_image,
      }))
    }
  }
  if (prod.specifications && Object.keys(prod.specifications).length > 0) {
    if (Array.isArray(result.specs)) {
      result.specs = Object.entries(prod.specifications).map(([label, value]) => ({
        label,
        value: String(value),
      }))
    }
    if (Array.isArray(result.technicalSpecs)) {
      result.technicalSpecs = Object.entries(prod.specifications).map(([parameter, value]) => ({
        parameter,
        value: String(value),
      }))
    }
  }
  if (Array.isArray(prod.faqs) && prod.faqs.length > 0 && Array.isArray(result.faqs)) {
    result.faqs = prod.faqs.map(f => ({
      q: f.question,
      a: f.answer,
      question: f.question,
      answer: f.answer,
    }))
  }
  if (Array.isArray(prod.print_gallery) && prod.print_gallery.length > 0 && Array.isArray(result.gallery)) {
    result.gallery = prod.print_gallery.map((g, i) => ({
      ...(result.gallery[i] || {}),
      id: result.gallery[i]?.id || `gal-${i}`,
      title: g.title,
      category: g.category || 'engineering',
      application: g.material || g.category || 'Industrial Application',
      desc: g.description || '',
      src: g.image,
      image: g.image,
    }))
  }

  return result as T
}

