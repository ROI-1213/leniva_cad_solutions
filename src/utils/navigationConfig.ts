export interface ShopDropdownCard {
  id: string
  title: string
  badge: string
  badgeBg: string
  badgeText: string
  description: string
  route: string
  iconType: 'cad' | 'printer' | 'filament'
}

export interface ShopDropdownShortcut {
  label: string
  route: string
}

export interface ShopDropdownConfig {
  bannerTitle: string
  allStoreLinkText: string
  allStoreRoute: string
  cards: ShopDropdownCard[]
  shortcuts: ShopDropdownShortcut[]
}

export interface CadMegaProduct {
  name: string
  slug: string
  spec: string
  image: string
  badge?: string
}

export interface CadMegaCategory {
  id: 'ares' | 'sketchup' | 'chaos'
  label: string
  logo: string
  secondaryLogo?: string
  description: string
  products: CadMegaProduct[]
}

export interface CadMegaMenuConfig {
  consultationText: string
  consultationBtnText: string
  categories: CadMegaCategory[]
}

export interface HardwareMegaProduct {
  name: string
  slug: string
  spec: string
  badge?: string
}

export interface HardwareMegaCategory {
  id: 'fdm' | 'dlp' | 'lcd' | 'scanners' | 'filaments'
  label: string
  route: string
  description: string
  products: HardwareMegaProduct[]
}

export interface HardwareMegaMenuConfig {
  consultationText: string
  consultationBtnText: string
  categories: HardwareMegaCategory[]
}

export interface ShopPageConfig {
  pageTitle: string
  pageSubtitle: string
  announcementBadge: string
  announcementText: string
}

export interface MasterNavigationConfig {
  shopDropdown: ShopDropdownConfig
  cadMegaMenu: CadMegaMenuConfig
  hardwareMegaMenu: HardwareMegaMenuConfig
  shopPage: ShopPageConfig
}

export const DEFAULT_NAVIGATION_CONFIG: MasterNavigationConfig = {
  shopDropdown: {
    bannerTitle: 'Leniva Online Store',
    allStoreLinkText: 'Explore All Store Products',
    allStoreRoute: '/shop',
    cards: [
      {
        id: 'cad_softwares',
        title: 'CAD Softwares',
        badge: 'Authorized Partner',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-700',
        description: 'Official perpetual & subscription licenses for ARES CAD, Trimble SketchUp, Chaos V-Ray & Enscape',
        route: '/shop?category=cad-software',
        iconType: 'cad',
      },
      {
        id: 'hardware_printers',
        title: '3D Printers & 3D Scanners',
        badge: 'Hardware Systems',
        badgeBg: 'bg-slate-100',
        badgeText: 'text-slate-700',
        description: 'Make3D Pratham FDM printers, EKA DLP/LCD resin systems & precision digitizers',
        route: '/shop/products',
        iconType: 'printer',
      },
      {
        id: 'filaments_supplies',
        title: '3D Printer Filaments',
        badge: '8 Vibrant Colours',
        badgeBg: 'bg-red-600',
        badgeText: 'text-white',
        description: 'Genuine Make3D PLA & PLA+ spools (1 KG / 1.75 mm) in stock with quick dispatch',
        route: '/shop/filaments',
        iconType: 'filament',
      },
    ],
    shortcuts: [
      { label: 'CAD Software', route: '/shop?category=cad-software' },
      { label: 'FDM Printers', route: '/shop/fdm' },
      { label: 'DLP / LCD', route: '/shop/dlp' },
      { label: '3D Scanners', route: '/shop/scanners' },
    ],
  },
  cadMegaMenu: {
    consultationText: 'Need official licensing, network deployment or CAD trial advice?',
    consultationBtnText: 'Request Software Quote →',
    categories: [
      {
        id: 'ares',
        label: 'ARES – Graebert',
        logo: '/images/brands/ares-cad.png',
        secondaryLogo: '/images/brands/grabert.png',
        description: 'Professional DWG CAD, Trinity cloud/mobile collaboration & specialized engineering toolsets.',
        products: [
          { name: 'ARES Standard', slug: 'ares-standard', spec: 'Affordable 2D/3D CAD', image: '/images/software/ares-standard.jpg' },
          { name: 'ARES Commander', slug: 'ares-commander', spec: 'Professional DWG-Native CAD', image: '/images/software/ares-commander.jpg' },
          { name: 'ARES Kudo', slug: 'ares-kudo', spec: 'Online DWG CAD & Cloud', image: '/images/software/ares-kudo.jpg' },
          { name: 'ARES Touch', slug: 'ares-touch', spec: 'Mobile DWG CAD & Field', image: '/images/software/ares-touch.jpg' },
          { name: 'ARES Mechanical', slug: 'ares-mechanical', spec: 'Mechanical Design CAD', image: '/images/software/ares-mechanical.jpg' },
          { name: 'ARES Electrical', slug: 'ares-electrical', spec: 'Electrical Schematics CAD', image: '/images/software/ares-electrical.jpg' },
        ],
      },
      {
        id: 'sketchup',
        label: 'SketchUp – Trimble',
        logo: '/images/brands/sketchup.png',
        description: 'Industry-standard 3D modeling, reality capture point clouds, BIM integration & LayOut documentation.',
        products: [
          { name: 'SketchUp Pro', slug: 'sketchup', spec: 'Professional 3D Modeling', image: '/images/software/sketchup-pro.jpg' },
          { name: 'SketchUp Pro Scan', slug: 'sketchup-scan', spec: 'Scan-to-BIM Workflows', image: '/images/software/sketchup-scan.jpg' },
          { name: 'SketchUp Pro Advanced Workflows', slug: 'sketchup-advanced', spec: 'BIM & Advanced Integration', image: '/images/software/sketchup-advanced.jpg' },
          { name: 'SketchUp Studio', slug: 'sketchup-studio', spec: 'Full Professional Suite', image: '/images/software/sketchup-studio.jpg' },
        ],
      },
      {
        id: 'chaos',
        label: 'Chaos',
        logo: '/images/brands/chaos.jpg',
        description: 'World-leading real-time rendering, photorealistic ray tracing & architectural visualization engines.',
        products: [
          { name: 'Enscape', slug: 'enscape', spec: 'Real-Time Rendering & VR', image: '/images/software/enscape-3d.jpg' },
          { name: 'V-Ray', slug: 'vray', spec: 'Photorealistic Rendering Engine', image: '/images/software/chaos-vray.jpg' },
          { name: 'Corona', slug: 'corona', spec: 'ArchViz CPU Rendering', image: '/images/software/chaos-corona.jpg' },
        ],
      },
    ],
  },
  hardwareMegaMenu: {
    consultationText: 'Need tailored machine specifications or 3D printing configuration advice?',
    consultationBtnText: 'Request a Quote →',
    categories: [
      {
        id: 'fdm',
        label: 'FDM 3D Printers',
        route: '/products/fdm-3d-printers',
        description: 'Industrial and desktop FDM systems with build volumes up to 1 meter.',
        products: [
          { name: 'Pratham Mini', slug: 'pratham-mini', spec: '170 × 170 × 170 mm' },
          { name: 'Pratham Desktop', slug: 'pratham-desktop', spec: '200 × 200 × 250 mm' },
          { name: 'Pratham 3.0', slug: 'pratham-3', spec: '300 × 300 × 300 mm' },
          { name: 'Pratham 5.0', slug: 'pratham-5', spec: '500 × 500 × 500 mm' },
          { name: 'Pratham 6.0', slug: 'pratham-6', spec: '600 × 600 × 600 mm' },
          { name: 'Pratham X (600)', slug: 'pratham-x-600', spec: '1000 × 1000 × 600 mm' },
          { name: 'Pratham X (1000)', slug: 'pratham-x', spec: '1000 × 1000 × 1000 mm (1 m³)' },
          { name: 'Pratham 3 Rapid', slug: 'pratham-3-rapid', spec: '350 × 350 × 350 mm | 500 mm/s', badge: 'Featured' },
        ],
      },
      {
        id: 'dlp',
        label: 'DLP 3D Printers',
        route: '/products/dlp-3d-printers',
        description: 'High-precision resin systems for jewellery casting and ultra-fine precision.',
        products: [
          { name: 'EKA HT', slug: 'eka-ht', spec: 'Jewellery Direct Casting' },
          { name: 'EKA XL', slug: 'eka-xl', spec: 'Large Format Jewellery' },
          { name: 'EKA XLE', slug: 'eka-xle', spec: 'Engineering Precision' },
        ],
      },
      {
        id: 'lcd',
        label: 'Industrial LCD',
        route: '/products/industrial-lcd-3d-printers',
        description: 'Ultra-high resolution 8K–16K monochrome masking arrays.',
        products: [
          { name: 'EKA GT MAX', slug: 'eka-gt-max', spec: 'Engineering LCD Production' },
          { name: 'EKA F1 16K', slug: 'eka-f1-16k', spec: '16K Ultra-Fine Detailing', badge: '16K Micro' },
        ],
      },
      {
        id: 'scanners',
        label: '3D Scanners',
        route: '/products/3d-scanners',
        description: 'Professional optical and laser scanners for reverse engineering and inspection.',
        products: [
          { name: '3DeVOK MT', slug: '3devok-mt', spec: '0.04 mm • 34 Blue + 22 IR Lasers', badge: 'Flagship' },
          { name: '3DeVOK MQ', slug: '3devok-mq', spec: '0.08 mm • 24-Bit Color • Wireless Ready', badge: 'Color 3D' },
          { name: 'EINSTAR', slug: 'einscan', spec: 'Handheld Structured Light Scanner', badge: 'Portable' },
        ],
      },
      {
        id: 'filaments',
        label: '3D Printer Filaments',
        route: '/products/filaments',
        description: 'Make3D genuine 1.75 mm PLA and PLA+ filaments across 8 vivid colours.',
        products: [
          { name: 'PLA White (1 KG)', slug: 'filaments/pla-white-1kg-175mm', spec: '1.75 mm • Easy Print', badge: 'Popular' },
          { name: 'PLA+ Grey / Silver', slug: 'filaments/plaplus-grey-silver-1kg-175mm', spec: '1.75 mm • High Toughness' },
          { name: 'PLA+ Black', slug: 'filaments/plaplus-black-1kg-175mm', spec: '1.75 mm • Pro Matte', badge: 'Top Rated' },
          { name: 'PLA+ Blue', slug: 'filaments/plaplus-blue-1kg-175mm', spec: '1.75 mm • Vibrant Finish' },
          { name: 'PLA+ Gold', slug: 'filaments/plaplus-gold-1kg-175mm', spec: '1.75 mm • Metallic Finish' },
          { name: 'PLA+ Red', slug: 'filaments/plaplus-red-1kg-175mm', spec: '1.75 mm • High Strength' },
        ],
      },
    ],
  },
  shopPage: {
    pageTitle: 'Official Hardware & Software Store',
    pageSubtitle: 'Genuine 3D printers, precision scanners, certified CAD licenses, and high-performance filaments backed by authorized manufacturer warranty.',
    announcementBadge: 'Direct Factory Distribution',
    announcementText: 'Authorized sales partner for Make3D, Graebert ARES, Trimble SketchUp, Chaos, and 3DeVOK across India.',
  },
}

const STORAGE_KEY = 'leniva_navigation_config'

export const getStoredNavigationConfig = (): MasterNavigationConfig => {
  if (typeof window === 'undefined') return DEFAULT_NAVIGATION_CONFIG
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_NAVIGATION_CONFIG
    const parsed = JSON.parse(raw)
    return {
      shopDropdown: {
        ...DEFAULT_NAVIGATION_CONFIG.shopDropdown,
        ...(parsed.shopDropdown || {}),
        cards: parsed.shopDropdown?.cards || DEFAULT_NAVIGATION_CONFIG.shopDropdown.cards,
        shortcuts: parsed.shopDropdown?.shortcuts || DEFAULT_NAVIGATION_CONFIG.shopDropdown.shortcuts,
      },
      cadMegaMenu: {
        ...DEFAULT_NAVIGATION_CONFIG.cadMegaMenu,
        ...(parsed.cadMegaMenu || {}),
        categories: parsed.cadMegaMenu?.categories || DEFAULT_NAVIGATION_CONFIG.cadMegaMenu.categories,
      },
      hardwareMegaMenu: {
        ...DEFAULT_NAVIGATION_CONFIG.hardwareMegaMenu,
        ...(parsed.hardwareMegaMenu || {}),
        categories: parsed.hardwareMegaMenu?.categories || DEFAULT_NAVIGATION_CONFIG.hardwareMegaMenu.categories,
      },
      shopPage: {
        ...DEFAULT_NAVIGATION_CONFIG.shopPage,
        ...(parsed.shopPage || {}),
      },
    }
  } catch {
    return DEFAULT_NAVIGATION_CONFIG
  }
}

export const saveStoredNavigationConfig = (config: MasterNavigationConfig): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    window.dispatchEvent(new Event('leniva_nav_config_updated'))
  } catch {
    // ignore
  }
}

export const resetStoredNavigationConfig = (): MasterNavigationConfig => {
  if (typeof window === 'undefined') return DEFAULT_NAVIGATION_CONFIG
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event('leniva_nav_config_updated'))
  } catch {
    // ignore
  }
  return DEFAULT_NAVIGATION_CONFIG
}
