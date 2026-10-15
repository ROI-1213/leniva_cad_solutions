import { products as fallbackProducts } from '../data/products'
import { filamentProducts } from '../data/filamentsData'
import { devokMQData, devokMTData } from '../data/scannersData'

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
        return parsed
      }
    }
  } catch (err) {
    console.error('Failed to parse stored products catalog', err)
  }
  return buildDefaultProductCatalog()
}

export const saveStoredProductsCatalog = (items: ProductItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS_CATALOG, JSON.stringify(items))
  } catch (err) {
    console.error('Failed to save products catalog to localStorage', err)
  }
}

export const resetStoredProductsCatalog = (): ProductItem[] => {
  try {
    localStorage.removeItem(STORAGE_KEY_PRODUCTS_CATALOG)
  } catch (err) {
    console.error('Failed to remove stored products catalog', err)
  }
  return buildDefaultProductCatalog()
}
