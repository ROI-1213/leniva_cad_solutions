import { products as fallbackProducts } from '../data/products'
import { filamentProducts } from '../data/filamentsData'
import { devokMQData, devokMTData } from '../data/scannersData'
import { Product, ShopItem } from '../types'
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

  // Complete Detailed Sections
  key_specs?: KeySpecItem[]
  specifications?: Record<string, string>
  features?: string[]
  applications?: string[]
  materials?: string[]
  who_is_it_for?: string[]

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

/**
 * Builds the comprehensive default product catalog by aggregating:
 * 1. 3D Printers (FDM, DLP, LCD) from products.ts
 * 2. 3D Scanners (EinScan, DeVOK MT & MQ) from products.ts & scannersData.ts
 * 3. 3D Printer Filaments & Materials from filamentsData.ts
 * 4. CAD & Engineering Software from products.ts
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
      scannerAccuracy = devokMTData.keySpecsSummary?.accuracy || 'Up to 0.04 mm'
      scannerResolution = devokMTData.keySpecsSummary?.resolution || '0.05 mm Point Distance'
      scannerSpeed = devokMTData.keySpecsSummary?.speed || 'Up to 3,600,000 pts/s'
      scannerTech = devokMTData.keySpecsSummary?.technology || 'Dual Blue Laser Arrays + Photogrammetry'
      scannerColor = devokMTData.keySpecsSummary?.color || 'High Precision Monochrome & Marker Tracking'
      scannerWireless = devokMTData.keySpecsSummary?.wireless || 'Industrial GigE & Wi-Fi 6'
      scannerModel = devokMTData.modelName || '3DeVOK MT'
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
      key_specs: p.keySpecs ? [...p.keySpecs] : [],
      specifications: p.specifications ? { ...p.specifications } : {},
      features: p.features ? [...p.features] : [],
      applications: p.applications ? [...p.applications] : [],
      materials: p.materials ? [...p.materials] : [],
      who_is_it_for: p.whoIsItFor ? [...p.whoIsItFor] : [],
      scanner_model_name: scannerModel,
      scanner_accuracy: scannerAccuracy,
      scanner_resolution: scannerResolution,
      scanner_speed: scannerSpeed,
      scanner_optical_tech: scannerTech,
      scanner_color_support: scannerColor,
      scanner_wireless: scannerWireless,
    }
  })

  const filamentItems: ProductItem[] = filamentProducts.map(f => ({
    id: f.id,
    slug: f.slug,
    name: f.name,
    brand: 'Make3D',
    category: 'Filaments & Materials',
    category_slug: 'filaments',
    technology: 'Materials & Consumables',
    tagline: `${f.material} 3D Printer Filament – ${f.color} (${f.diameter}, ${f.weight})`,
    short_description: f.shortDescription,
    description: f.description,
    hero_image: f.image,
    images: [f.image],
    price: 0,
    original_price: 0,
    in_stock: f.inStock,
    is_featured: false,
    is_quote_based: true,
    badge: f.badge,
    rating: f.rating,
    reviews_count: f.reviewsCount,
    key_specs: [
      { label: 'Diameter', value: f.diameter },
      { label: 'Net Weight', value: f.weight },
      { label: 'Print Temp', value: f.printTemp },
      { label: 'Bed Temp', value: f.bedTemp },
      { label: 'Color', value: f.color },
    ],
    specifications: f.specifications ? { ...f.specifications } : {},
    features: f.features ? [...f.features] : [],
    applications: f.applications ? [...f.applications] : [],
    materials: [f.material],
    who_is_it_for: f.suitableFor ? [...f.suitableFor] : [],
    filament_material: f.material,
    filament_color: f.color,
    filament_color_hex: f.colorHex,
    filament_diameter: f.diameter,
    filament_weight: f.weight,
    filament_print_temp: f.printTemp,
    filament_bed_temp: f.bedTemp,
  }))

  return [...hardwareAndSoftwareItems, ...filamentItems]
}

const CAD_SLUG_TO_KEY_MAP: Record<string, string> = {
  'ares-mechanical': 'ares_mechanical',
  'ares-electrical': 'ares_electrical',
  'ares-standard': 'ares_standard',
  'ares-commander': 'ares_commander',
  enscape: 'chaos_enscape',
  vray: 'chaos_vray',
  'sketchup-studio': 'sketchup_studio',
  'sketchup-scan': 'sketchup_proscan',
  'sketchup-proscan': 'sketchup_proscan',
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
        tagline: edit.supportingHeadline || edit.headline || item.tagline,
        short_description: edit.shortDescription || item.short_description,
        description: edit.description || item.description,
        hero_image: edit.heroImage || item.hero_image,
        images: edit.heroImage ? [edit.heroImage, ...(item.images || []).slice(1)] : item.images,
        features: Array.isArray(edit.highlights) && edit.highlights.length > 0 ? edit.highlights : item.features,
        key_specs: Array.isArray(edit.specStrip) && edit.specStrip.length > 0 ? edit.specStrip : item.key_specs,
      }
    })
  } catch {
    return items
  }
}

export const getStoredProductsCatalog = (): ProductItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS_CATALOG)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach((item: ProductItem) => {
          item.price = 0
          item.original_price = 0
          item.is_quote_based = true
        })
        return applyCadEditsToCatalog(parsed)
      }
    }
  } catch (err) {
    console.error('Failed to parse stored products catalog', err)
  }
  return applyCadEditsToCatalog(buildDefaultProductCatalog())
}

export const saveStoredProductsCatalog = (items: ProductItem[]) => {
  try {
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
    tagline: item.tagline || '',
    description: item.description || '',
    shortDescription: item.short_description || item.description || '',
    heroImage: item.hero_image,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.hero_image],
    keySpecs: item.key_specs ? [...item.key_specs] : [],
    specifications: item.specifications ? { ...item.specifications } : {},
    features: item.features ? [...item.features] : [],
    applications: item.applications ? [...item.applications] : [],
    materials: item.materials ? [...item.materials] : [],
    whoIsItFor: item.who_is_it_for ? [...item.who_is_it_for] : [],
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
    p.id.includes('scanner') ||
    p.id.includes('devok')
  ) {
    return {
      category: 'scanners',
      categoryName: 'Precision 3D Scanners',
      brand: brand || (name.includes('einscan') ? 'Shining 3D' : '3DeVOK'),
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

  // 4. 3D Printers: DLP
  if (cat.includes('dlp') || catSlug.includes('dlp') || tech.includes('dlp') || name.includes('dlp') || name.includes('eka')) {
    return {
      category: 'dlp',
      categoryName: 'DLP 3D Printers',
      brand: brand || 'Make3D',
    }
  }

  // 5. 3D Printers: LCD
  if (cat.includes('lcd') || catSlug.includes('lcd') || tech.includes('lcd') || name.includes('lcd')) {
    return {
      category: 'lcd',
      categoryName: 'Industrial LCD Printers',
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
