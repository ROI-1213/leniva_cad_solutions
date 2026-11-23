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

export type VisualEditorCategory = 'cad' | 'printers' | 'scanners' | 'all'

export interface VisualPageCatalogItem {
  key: string
  label: string
  brand: string
  category: string
  editorGroup: 'cad' | 'printers' | 'scanners'
  route: string
  routeAliases?: string[]
  heroImage?: string
  defaultBrochureUrl?: string
}

export const VISUAL_PAGE_CATALOG: VisualPageCatalogItem[] = [
  // =========================================================================
  // 1. CAD SOFTWARE PAGES (14 Pages)
  // =========================================================================
  {
    key: 'ares_commander',
    label: 'ARES Commander',
    brand: 'Graebert',
    category: '2D & 3D DWG CAD Software',
    editorGroup: 'cad',
    route: '/products/ares-commander',
    routeAliases: ['/product/ares-commander', '/ares-commander', '/software/ares-commander', '/products/arescommander'],
    heroImage: '/images/software/ares-commander.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-commander/',
  },
  {
    key: 'ares_standard',
    label: 'ARES Standard',
    brand: 'Graebert',
    category: '2D DWG CAD Drafting',
    editorGroup: 'cad',
    route: '/products/ares-standard',
    routeAliases: ['/product/ares-standard', '/ares-standard', '/software/ares-standard', '/products/aresstandard'],
    heroImage: '/images/ares-standard/ares-standard-hero.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-standard/',
  },
  {
    key: 'ares_mechanical',
    label: 'ARES Mechanical',
    brand: 'Graebert',
    category: 'Mechanical 2D DWG CAD',
    editorGroup: 'cad',
    route: '/products/ares-mechanical',
    routeAliases: ['/product/ares-mechanical', '/ares-mechanical', '/products/aresmechanical'],
    heroImage: '/images/software/ares-mechanical.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-mechanical/',
  },
  {
    key: 'ares_electrical',
    label: 'ARES Electrical',
    brand: 'Graebert',
    category: 'Electrical & Panel Schematics CAD',
    editorGroup: 'cad',
    route: '/products/ares-electrical',
    routeAliases: ['/product/ares-electrical', '/ares-electrical', '/products/areselectrical'],
    heroImage: '/images/software/ares-electrical.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-electrical/',
  },
  {
    key: 'ares_kudo',
    label: 'ARES Kudo (Cloud CAD)',
    brand: 'Graebert',
    category: 'Cloud DWG CAD in Browser',
    editorGroup: 'cad',
    route: '/products/ares-kudo',
    routeAliases: ['/cad-software/ares-kudo', '/product/ares-kudo', '/ares-kudo', '/software/ares-kudo', '/products/ares-trinity'],
    heroImage: '/images/software/ares-trinity.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-kudo/',
  },
  {
    key: 'ares_touch',
    label: 'ARES Touch (Mobile CAD)',
    brand: 'Graebert',
    category: 'Mobile DWG CAD for iOS & Android',
    editorGroup: 'cad',
    route: '/products/ares-touch',
    routeAliases: ['/cad-software/ares-touch', '/product/ares-touch', '/ares-touch', '/software/ares-touch'],
    heroImage: '/images/software/ares-trinity.jpg',
    defaultBrochureUrl: 'https://www.graebert.com/cad-software/ares-touch/',
  },
  {
    key: 'sketchup_pro',
    label: 'SketchUp Pro',
    brand: 'Trimble',
    category: '3D Architectural & Design Modeling',
    editorGroup: 'cad',
    route: '/products/sketchup-pro',
    routeAliases: ['/product/sketchup-pro', '/sketchup-pro', '/products/sketchup', '/product/sketchup', '/sketchup'],
    heroImage: '/images/software/sketchup-pro.jpg',
    defaultBrochureUrl: 'https://www.sketchup.com/en/plans-and-pricing/sketchup-pro',
  },
  {
    key: 'sketchup_proscan',
    label: 'SketchUp Pro + Scan Essentials',
    brand: 'Trimble',
    category: 'Point Cloud to 3D BIM Workflow',
    editorGroup: 'cad',
    route: '/products/sketchup-pro-scan',
    routeAliases: ['/products/sketchup-scan', '/product/sketchup-scan', '/sketchup-scan', '/product/sketchup-pro-scan', '/sketchup-pro-scan'],
    heroImage: '/images/software/sketchup-scan.jpg',
    defaultBrochureUrl: 'https://www.sketchup.com/en/products/scan-essentials',
  },
  {
    key: 'sketchup_advanced',
    label: 'SketchUp Pro Advanced Workflows',
    brand: 'Trimble',
    category: 'BIM, Point Cloud & Photorealistic Suite',
    editorGroup: 'cad',
    route: '/products/sketchup-pro-advanced-workflows',
    routeAliases: ['/product/sketchup-pro-advanced-workflows', '/sketchup-pro-advanced-workflows', '/products/sketchup-advanced', '/sketchup-advanced'],
    heroImage: '/images/software/sketchup-studio.jpg',
    defaultBrochureUrl: 'https://www.sketchup.com/',
  },
  {
    key: 'sketchup_studio',
    label: 'SketchUp Studio',
    brand: 'Trimble',
    category: 'Complete AEC + V-Ray + Scan Essentials',
    editorGroup: 'cad',
    route: '/products/sketchup-studio',
    routeAliases: ['/product/sketchup-studio', '/sketchup-studio', '/products/sketchupstudio'],
    heroImage: '/images/software/sketchup-studio.jpg',
    defaultBrochureUrl: 'https://www.sketchup.com/en/plans-and-pricing/sketchup-studio',
  },
  {
    key: 'chaos_enscape',
    label: 'Chaos Enscape 3D',
    brand: 'Chaos',
    category: 'Real-Time 3D Rendering & VR Walkthrough',
    editorGroup: 'cad',
    route: '/products/enscape',
    routeAliases: ['/product/enscape', '/enscape', '/products/chaos-enscape', '/products/enscape-3d'],
    heroImage: '/images/software/enscape.jpg',
    defaultBrochureUrl: 'https://www.chaos.com/enscape',
  },
  {
    key: 'chaos_vray',
    label: 'Chaos V-Ray',
    brand: 'Chaos',
    category: 'Photorealistic Ray-Traced Rendering',
    editorGroup: 'cad',
    route: '/products/vray',
    routeAliases: ['/product/vray', '/vray', '/products/v-ray', '/products/chaos-vray', '/products/chaos-v-ray'],
    heroImage: '/images/software/vray.jpg',
    defaultBrochureUrl: 'https://www.chaos.com/vray',
  },
  {
    key: 'chaos_corona',
    label: 'Chaos Corona',
    brand: 'Chaos',
    category: 'Architectural Photorealistic Renderer',
    editorGroup: 'cad',
    route: '/products/corona',
    routeAliases: ['/product/corona', '/corona', '/products/chaos-corona', '/product/chaos-corona', '/chaos-corona'],
    heroImage: '/images/software/corona.jpg',
    defaultBrochureUrl: 'https://www.chaos.com/corona',
  },
  {
    key: 'cad_category',
    label: 'CAD Software Category Hub Page',
    brand: 'Graebert / Trimble / Chaos',
    category: 'CAD Software Category Overview Page',
    editorGroup: 'cad',
    route: '/products/cad-software',
    routeAliases: [],
    heroImage: '/images/software/ares-commander.jpg',
  },

  // =========================================================================
  // 2. 3D PRINTERS & 3D PRINTING PAGES (20 Pages: FDM, DLP, Industrial LCD & Filaments)
  // =========================================================================
  {
    key: 'pratham_mini',
    label: 'Pratham Mini',
    brand: 'Make3D',
    category: 'Compact Enclosed FDM 3D Printer (170×170×170 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-mini',
    routeAliases: ['/product/pratham-mini', '/pratham-mini'],
    heroImage: '/images/products/pratham-mini.png',
    defaultBrochureUrl: '/brochures/pratham-mini.pdf',
  },
  {
    key: 'pratham_desktop',
    label: 'Pratham Desktop',
    brand: 'Make3D',
    category: 'Desktop Studio FDM 3D Printer (200×200×250 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-desktop',
    routeAliases: ['/product/pratham-desktop', '/pratham-desktop'],
    heroImage: '/images/products/pratham-desktop.png',
    defaultBrochureUrl: '/brochures/pratham-desktop.pdf',
  },
  {
    key: 'pratham_3',
    label: 'Pratham 3.0',
    brand: 'Make3D',
    category: 'Industrial Workhorse FDM 3D Printer (300×300×300 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-3',
    routeAliases: ['/product/pratham-3', '/pratham-3', '/products/pratham-3-0', '/product/pratham-3-0', '/pratham-3-0'],
    heroImage: '/images/products/pratham-3-0.png',
    defaultBrochureUrl: '/brochures/pratham-3-0.pdf',
  },
  {
    key: 'pratham_3_rapid',
    label: 'Pratham 3.0 Rapid',
    brand: 'Make3D',
    category: 'High-Speed 500 mm/s CoreXY FDM (350×350×350 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-3-rapid',
    routeAliases: ['/product/pratham-3-rapid', '/pratham-3-rapid'],
    heroImage: '/images/products/pratham-3-rapid.png',
    defaultBrochureUrl: '/brochures/pratham-3-rapid.pdf',
  },
  {
    key: 'pratham_5',
    label: 'Pratham 5.0',
    brand: 'Make3D',
    category: 'Large-Format Heated Chamber FDM (500×500×500 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-5',
    routeAliases: ['/product/pratham-5', '/pratham-5', '/products/pratham-5-0', '/product/pratham-5-0', '/pratham-5-0'],
    heroImage: '/images/products/pratham-5-0.png',
    defaultBrochureUrl: '/brochures/pratham-5-0.pdf',
  },
  {
    key: 'pratham_6',
    label: 'Pratham 6.0',
    brand: 'Make3D',
    category: 'Closed-Loop Servo Industrial FDM (600×600×600 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-6',
    routeAliases: ['/product/pratham-6', '/pratham-6', '/products/pratham-6-0', '/product/pratham-6-0', '/pratham-6-0'],
    heroImage: '/images/products/pratham-6-0.png',
    defaultBrochureUrl: '/brochures/pratham-6-0.pdf',
  },
  {
    key: 'pratham_x_600',
    label: 'Pratham X (600)',
    brand: 'Make3D',
    category: 'Jumbo Industrial FDM 3D Printer (600×600×600 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-x-600',
    routeAliases: ['/product/pratham-x-600', '/pratham-x-600'],
    heroImage: '/images/products/pratham-x-600.png',
    defaultBrochureUrl: '/brochures/pratham-x-600.pdf',
  },
  {
    key: 'pratham_x',
    label: 'Pratham X (1000)',
    brand: 'Make3D',
    category: '1 m³ Giant Industrial FDM 3D Printer (1000×1000×1000 mm)',
    editorGroup: 'printers',
    route: '/products/pratham-x',
    routeAliases: ['/product/pratham-x', '/pratham-x', '/products/pratham-x-1000', '/product/pratham-x-1000', '/pratham-x-1000'],
    heroImage: '/images/products/pratham-x.png',
    defaultBrochureUrl: '/brochures/pratham-x.pdf',
  },
  {
    key: 'eka_ht',
    label: 'EKA HT (DLP)',
    brand: 'EKA',
    category: 'Heated-Tray Jewelry DLP 3D Printer (130×73×150 mm)',
    editorGroup: 'printers',
    route: '/products/eka-ht',
    routeAliases: ['/product/eka-ht', '/eka-ht'],
    heroImage: '/images/products/eka-ht.png',
    defaultBrochureUrl: '/brochures/eka-ht.pdf',
  },
  {
    key: 'eka_xl',
    label: 'EKA XL (DLP)',
    brand: 'EKA',
    category: 'Large-Platform Jewelry DLP 3D Printer',
    editorGroup: 'printers',
    route: '/products/eka-xl',
    routeAliases: ['/product/eka-xl', '/eka-xl', '/eka-xl-2'],
    heroImage: '/images/products/eka-xl.png',
    defaultBrochureUrl: '/brochures/eka-xl.pdf',
  },
  {
    key: 'eka_xle',
    label: 'EKA XLE (DLP)',
    brand: 'EKA',
    category: 'Extended Production Jewelry DLP 3D Printer',
    editorGroup: 'printers',
    route: '/products/eka-xle',
    routeAliases: ['/product/eka-xle', '/eka-xle'],
    heroImage: '/images/products/eka-xle.png',
    defaultBrochureUrl: '/brochures/eka-xle.pdf',
  },
  {
    key: 'eka_gt_max',
    label: 'EKA GT Max (Industrial LCD)',
    brand: 'EKA',
    category: 'Industrial Large-Format LCD Resin 3D Printer',
    editorGroup: 'printers',
    route: '/products/eka-gt-max',
    routeAliases: ['/product/eka-gt-max', '/eka-gt-max', '/industrial-lcd-3d-printers-eka-gt-max'],
    heroImage: '/images/products/eka-gt-max.png',
    defaultBrochureUrl: '/brochures/eka-gt-max.pdf',
  },
  {
    key: 'eka_f1_16k',
    label: 'EKA F1 16K (Jewelry LCD)',
    brand: 'EKA',
    category: '16K Ultra-HD Industrial LCD Jewelry 3D Printer',
    editorGroup: 'printers',
    route: '/products/eka-f1-16k',
    routeAliases: ['/product/eka-f1-16k', '/eka-f1-16k', '/eka-f1-16k-industrial-lcd-jewelry-3d-printer'],
    heroImage: '/images/products/eka-f1-16k.png',
    defaultBrochureUrl: '/brochures/eka-f1-16k.pdf',
  },
  {
    key: 'fdm_category',
    label: 'FDM 3D Printers Category Page',
    brand: 'Make3D Pratham Series',
    category: 'FDM 3D Printers Category Hub Page',
    editorGroup: 'printers',
    route: '/products/fdm-3d-printers',
    routeAliases: [],
    heroImage: '/images/products/pratham-3-0.png',
  },
  {
    key: 'dlp_category',
    label: 'DLP 3D Printers Category Page',
    brand: 'EKA Jewelry DLP Series',
    category: 'DLP 3D Printers Category Hub Page',
    editorGroup: 'printers',
    route: '/products/dlp-3d-printers',
    routeAliases: ['/dlp-3d-printers'],
    heroImage: '/images/products/eka-ht.png',
  },
  {
    key: 'lcd_category',
    label: 'Industrial LCD 3D Printers Category Page',
    brand: 'EKA Industrial LCD Series',
    category: 'Industrial LCD 3D Printers Category Hub Page',
    editorGroup: 'printers',
    route: '/products/industrial-lcd-3d-printers',
    routeAliases: ['/industrial-lcd-3d-printers', '/industrial-lcd-resin-3d-printers-for-jewelry-engineering'],
    heroImage: '/images/products/eka-gt-max.png',
  },
  {
    key: 'filament_white_pla',
    label: 'PLA 3D Filament — White',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA Filament (White)',
    editorGroup: 'printers',
    route: '/product/pla-3d-printer-filament-white',
    routeAliases: ['/products/filaments/white-pla', '/shop/filaments/pla-white-1kg-175mm', '/3d-printer-filament/pla-white-1kg-175mm', '/products/pla-white-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filament_grey_silver_pla',
    label: 'PLA+ 3D Filament — Grey Silver',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Grey Silver)',
    editorGroup: 'printers',
    route: '/product/pla-plus-3d-printer-filament-grey-silver',
    routeAliases: ['/product/plaplus-grey-silver-1kg-175mm', '/products/filaments/grey-silver-pla', '/shop/filaments/plaplus-grey-silver-1kg-175mm', '/3d-printer-filament/plaplus-grey-silver-1kg-175mm', '/products/plaplus-grey-silver-1kg-175mm'],
    heroImage: '/images/filaments/grey-silver-pla.png',
  },
  {
    key: 'filament_gold_pla',
    label: 'PLA+ 3D Filament — Gold',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Gold)',
    editorGroup: 'printers',
    route: '/product/pla-plus-3d-printer-filament-gold',
    routeAliases: ['/product/plaplus-gold-1kg-175mm', '/products/filaments/gold-pla', '/shop/filaments/plaplus-gold-1kg-175mm', '/3d-printer-filament/plaplus-gold-1kg-175mm', '/products/plaplus-gold-1kg-175mm'],
    heroImage: '/images/filaments/gold-pla.png',
  },
  {
    key: 'filament_orange_pla',
    label: 'PLA+ 3D Filament — Orange',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Orange)',
    editorGroup: 'printers',
    route: '/shop/filaments/plaplus-orange-1kg-175mm',
    routeAliases: ['/3d-printer-filament/plaplus-orange-1kg-175mm', '/products/plaplus-orange-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filament_yellow_pla',
    label: 'PLA+ 3D Filament — Yellow',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Yellow)',
    editorGroup: 'printers',
    route: '/shop/filaments/plaplus-yellow-1kg-175mm',
    routeAliases: ['/3d-printer-filament/plaplus-yellow-1kg-175mm', '/products/plaplus-yellow-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filament_blue_pla',
    label: 'PLA+ 3D Filament — Blue',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Blue)',
    editorGroup: 'printers',
    route: '/shop/filaments/plaplus-blue-1kg-175mm',
    routeAliases: ['/3d-printer-filament/plaplus-blue-1kg-175mm', '/products/plaplus-blue-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filament_black_pla',
    label: 'PLA+ 3D Filament — Black',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Black)',
    editorGroup: 'printers',
    route: '/shop/filaments/plaplus-black-1kg-175mm',
    routeAliases: ['/3d-printer-filament/plaplus-black-1kg-175mm', '/products/plaplus-black-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filament_red_pla',
    label: 'PLA+ 3D Filament — Red',
    brand: 'Make3D',
    category: '1.75mm Engineering PLA+ Filament (Red)',
    editorGroup: 'printers',
    route: '/shop/filaments/plaplus-red-1kg-175mm',
    routeAliases: ['/3d-printer-filament/plaplus-red-1kg-175mm', '/products/plaplus-red-1kg-175mm'],
    heroImage: '/images/filaments/white-pla.png',
  },
  {
    key: 'filaments_category',
    label: '3D Printing Filaments Hub Page',
    brand: 'Make3D',
    category: '3D Printing Filaments Category Overview Page',
    editorGroup: 'printers',
    route: '/products/filaments',
    routeAliases: ['/shop/filaments', '/3d-printer-filament'],
    heroImage: '/images/filaments/white-pla.png',
  },

  // =========================================================================
  // 3. 3D SCANNERS PAGES (4 Pages)
  // =========================================================================
  {
    key: 'devok_mt',
    label: '3DeVOK MT Professional Multi-Laser 3D Scanner',
    brand: '3DeVOK',
    category: '34 Blue + 22 IR Laser Metrology 3D Scanner',
    editorGroup: 'scanners',
    route: '/products/3devok-mt',
    routeAliases: ['/3d-scanners/3devok-mt', '/products/devok-mt-professional-multi-laser-3d-scanner'],
    heroImage: '/images/scanners/3devok-in-hand-action.png',
    defaultBrochureUrl: '/brochures/3devok-mt.pdf',
  },
  {
    key: 'devok_mq',
    label: '3DeVOK MQ Hybrid 3D Scanner',
    brand: '3DeVOK',
    category: 'Hybrid Infrared Laser & Structured Light 3D Scanner',
    editorGroup: 'scanners',
    route: '/products/3devok-mq',
    routeAliases: ['/3d-scanners/3devok-mq', '/products/devok-mq-hybrid-3d-scanner'],
    heroImage: '/images/scanners/3devok-mq.png',
    defaultBrochureUrl: '/brochures/3devok-mq.pdf',
  },
  {
    key: 'einscan_series',
    label: 'EINSTAR / EinScan 3D Scanner',
    brand: 'SHINING 3D',
    category: 'Handheld True-Color 3D Digitizer & Point Cloud Scanner',
    editorGroup: 'scanners',
    route: '/products/einscan',
    routeAliases: ['/3d-scanners/einscan', '/einscan', '/products/einscan-series', '/products/einscan-3d-scanner'],
    heroImage: '/images/scanners/einstar.png',
    defaultBrochureUrl: '/brochures/einstar.pdf',
  },
  {
    key: 'scanners_category',
    label: '3D Scanners Category Hub Page',
    brand: '3DeVOK & SHINING 3D',
    category: 'Complete 3D Scanners Overview & Comparison Hub',
    editorGroup: 'scanners',
    route: '/products/3d-scanners',
    routeAliases: ['/3d-scanners', '/products/scanners', '/scanners'],
    heroImage: '/images/scanners/3devok-in-hand-action.png',
  },
]

export function resolveVisualProductKeyFromPath(pathname: string): string | null {
  if (!pathname) return null
  const clean = pathname.replace(/\/+$/, '').toLowerCase() || '/'
  for (const item of VISUAL_PAGE_CATALOG) {
    if (item.route.toLowerCase() === clean) return item.key
    if (item.routeAliases?.some(alias => alias.replace(/\/+$/, '').toLowerCase() === clean)) {
      return item.key
    }
  }
  if (typeof window !== 'undefined') {
    try {
      const customPrinters: any[] = JSON.parse(localStorage.getItem('leniva_custom_printer_products') || '[]')
      for (const cp of customPrinters) {
        if (!cp) continue
        const r = (cp.route || '').replace(/\/+$/, '').toLowerCase()
        if (r === clean) return cp.key
      }
      const customScanners: any[] = JSON.parse(localStorage.getItem('leniva_custom_scanner_products') || '[]')
      for (const cs of customScanners) {
        if (!cs) continue
        const r = (cs.route || '').replace(/\/+$/, '').toLowerCase()
        if (r === clean) return cs.key
      }
      const customCad: any[] = JSON.parse(localStorage.getItem('leniva_custom_cad_products') || '[]')
      for (const cc of customCad) {
        if (!cc) continue
        const r = (cc.route || '').replace(/\/+$/, '').toLowerCase()
        if (r === clean) return cc.key
      }
    } catch {
      // ignore
    }
  }
  return null
}

export function resolveVisualProductKeyFromCatalogProduct(slugOrId: string | { slug?: string; id?: string }): VisualPageCatalogItem {
  const raw = typeof slugOrId === 'string' ? slugOrId : slugOrId?.slug || slugOrId?.id || ''
  const s = raw.trim().toLowerCase()
  const directByRoute =
    resolveVisualProductKeyFromPath(`/products/${s}`) ||
    resolveVisualProductKeyFromPath(`/product/${s}`) ||
    resolveVisualProductKeyFromPath(`/shop/filaments/${s}`) ||
    resolveVisualProductKeyFromPath(`/${s}`)

  if (directByRoute) {
    const found = VISUAL_PAGE_CATALOG.find(i => i.key === directByRoute)
    if (found) return found
  }

  const normalizedKey = s.replace(/-/g, '_')
  const byKey = VISUAL_PAGE_CATALOG.find(i => i.key === normalizedKey || i.key === s)
  if (byKey) return byKey

  if (s.includes('white')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_white_pla')!
  if (s.includes('grey') || s.includes('silver')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_grey_silver_pla')!
  if (s.includes('gold')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_gold_pla')!
  if (s.includes('orange')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_orange_pla')!
  if (s.includes('yellow')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_yellow_pla')!
  if (s.includes('blue')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_blue_pla')!
  if (s.includes('black')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_black_pla')!
  if (s.includes('red')) return VISUAL_PAGE_CATALOG.find(i => i.key === 'filament_red_pla')!

  return VISUAL_PAGE_CATALOG[0]
}

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
  const catalogItem = VISUAL_PAGE_CATALOG.find(item => item.key === productKey)
  const label = catalogItem?.label || productKey.replace(/_/g, ' ').toUpperCase()
  const defaultBrochureUrl = catalogItem?.defaultBrochureUrl || catalogItem?.route || '/'

  return {
    productKey,
    dataOverrides: {},
    elementOverrides: {},
    pdfResources: isAresCommander ? structuredCloneSafe(DEFAULT_ARES_COMMANDER_PDFS) : [
      {
        id: `${productKey}-brochure`,
        title: `${label} — Official Product Brochure & Technical Datasheet (PDF)`,
        description: `Complete technical specifications, features, applications, and documentation for ${label}.`,
        badge: 'PDF Brochure',
        buttonLabel: 'Download Brochure PDF',
        fileUrl: defaultBrochureUrl,
        originalFileUrl: defaultBrochureUrl,
        fileName: `${productKey.replace(/_/g, '-')}-brochure.pdf`,
        fileSize: '2.4 MB',
        visible: true,
        behavior: 'new_tab',
      },
    ],
    sectionOrder: isAresCommander ? ARES_COMMANDER_SECTIONS.map(s => s.id) : [],
    hiddenSections: {},
    seo: {
      title: isAresCommander
        ? 'ARES Commander – 2D & 3D DWG CAD Software | Authorized Partner Leniva CAD Solutions'
        : `${label} | ${catalogItem?.brand || 'Leniva'} — Authorized Partner Leniva CAD Solutions`,
      description: isAresCommander
        ? 'Buy ARES Commander in India. Native DWG 2D & 3D CAD software for Windows, macOS & Linux with ARES Trinity Cloud & Mobile collaboration. Start a free 30-day trial or request a quote.'
        : `Explore ${label} (${catalogItem?.category || '3D Printers, Scanners & CAD Solutions'}) from Leniva CAD Solutions. View technical specifications, download brochures, and request an official quote.`,
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

function writeJsonMap<T>(storageKey: string, map: Record<string, T>): boolean {
  if (typeof window === 'undefined') return false
  const serialized = JSON.stringify(map)
  try {
    window.localStorage.setItem(storageKey, serialized)
    return true
  } catch (err) {
    console.warn(`Storage quota pressure writing ${storageKey}, pruning old revisions & retrying...`, err)
    try {
      // 1. Prune heavy revision history first
      if (storageKey !== CAD_VISUAL_REVISIONS_KEY) {
        window.localStorage.removeItem(CAD_VISUAL_REVISIONS_KEY)
      }
      window.localStorage.setItem(storageKey, serialized)
      return true
    } catch {
      // 2. If writing the primary published map, also clear redundant drafts so published data always persists
      try {
        if (storageKey === CAD_VISUAL_PUBLISHED_KEY) {
          window.localStorage.removeItem(CAD_VISUAL_DRAFT_KEY)
          window.localStorage.setItem(storageKey, serialized)
          return true
        }
      } catch (retryErr) {
        console.error(`Failed writing ${storageKey} even after pruning:`, retryErr)
      }
    }
    return false
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

export function normalizeAssetUrl(url: string | undefined, kind: 'image' | 'pdf' = 'image'): string {
  if (!url) return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('#')
  ) {
    // Wait: if it starts with '/9j/' that is actually raw JPEG base64, NOT a relative path!
    if (!trimmed.startsWith('/9j/')) {
      return trimmed
    }
  }
  if (trimmed.startsWith('JVBERi')) return `data:application/pdf;base64,${trimmed}`
  if (trimmed.startsWith('iVBOR')) return `data:image/png;base64,${trimmed}`
  if (trimmed.startsWith('/9j/')) return `data:image/jpeg;base64,${trimmed}`
  if (trimmed.startsWith('R0lGOD')) return `data:image/gif;base64,${trimmed}`
  if (trimmed.startsWith('UklGR')) return `data:image/webp;base64,${trimmed}`
  if (trimmed.startsWith('PHN2Zw') || trimmed.startsWith('PD94bW')) return `data:image/svg+xml;base64,${trimmed}`
  if (trimmed.length > 120 && !trimmed.includes(' ')) {
    return kind === 'pdf'
      ? `data:application/pdf;base64,${trimmed}`
      : `data:image/jpeg;base64,${trimmed}`
  }
  return trimmed
}

export function openPdfOrUrlSafely(rawUrl: string) {
  const url = normalizeAssetUrl(rawUrl, 'pdf')
  if (!url) return
  if (url.startsWith('data:application/pdf;base64,')) {
    try {
      const base64 = url.split(',')[1] || ''
      const binary = atob(base64)
      const len = binary.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i)
      }
      const blob = new Blob([bytes], { type: 'application/pdf' })
      const blobUrl = URL.createObjectURL(blob)
      window.open(blobUrl, '_blank', 'noopener,noreferrer')
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000)
      return
    } catch {
      // fallback below
    }
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function syncVisualPayloadToCatalogs(productKey: string, stamped: CadVisualPagePayload) {
  if (typeof window === 'undefined') return
  const ov = stamped.dataOverrides || {}
  const elOv = stamped.elementOverrides || {}

  // Find primary hero image override if any image was uploaded
  const rawHeroImg =
    ov.hero?.image ||
    elOv['hero.image']?.src ||
    elOv['auto:img:0']?.src ||
    Object.values(elOv).find(x => x?.src)?.src
  const heroImg = rawHeroImg ? normalizeAssetUrl(rawHeroImg, 'image') : undefined

  // Find primary brochure PDF URL if uploaded
  const primaryPdf = stamped.pdfResources?.[0]
  const rawBrochureUrl =
    (primaryPdf && primaryPdf.fileUrl !== primaryPdf.originalFileUrl ? primaryPdf.fileUrl : undefined) ||
    Object.values(elOv).find(x => x?.pdfUrl)?.pdfUrl ||
    primaryPdf?.fileUrl
  const brochureUrl = rawBrochureUrl ? normalizeAssetUrl(rawBrochureUrl, 'pdf') : undefined

  // Find primary headline & description overrides
  const headline =
    ov.hero?.headline ||
    elOv['hero.headline']?.text ||
    elOv['auto:h1:0']?.text ||
    ov.customPrinterMeta?.headline
  const shortDesc =
    ov.hero?.shortDescription ||
    ov.hero?.supportingText ||
    elOv['auto:p:0']?.text ||
    elOv['auto:p:1']?.text ||
    ov.customPrinterMeta?.shortDescription

  // 1. Sync into leniva_cad_software_edits
  try {
    const cadEditsRaw = window.localStorage.getItem('leniva_cad_software_edits')
    const cadEditsMap = cadEditsRaw ? JSON.parse(cadEditsRaw) : {}
    const existingEdits = cadEditsMap[productKey] || {}
    const updatedEdits: Record<string, any> = { ...existingEdits }
    if (headline) {
      updatedEdits.headline = headline
      updatedEdits.heroHeading = headline
    }
    if (ov.hero?.supportingText) {
      updatedEdits.supportingHeadline = ov.hero.supportingText
      updatedEdits.heroSupportingText = ov.hero.supportingText
    }
    if (ov.hero?.eyebrow) updatedEdits.eyebrow = ov.hero.eyebrow
    if (heroImg) updatedEdits.heroImage = heroImg
    if (brochureUrl) {
      updatedEdits.downloadUrl = brochureUrl
      updatedEdits.brochureUrl = brochureUrl
    } else if (ov.identity?.downloadUrl) {
      updatedEdits.downloadUrl = ov.identity.downloadUrl
      updatedEdits.trialUrl = ov.identity.downloadUrl
    }
    if (ov.overview?.description || shortDesc) {
      updatedEdits.description = ov.overview?.description || shortDesc
    }
    cadEditsMap[productKey] = updatedEdits
    window.localStorage.setItem('leniva_cad_software_edits', JSON.stringify(cadEditsMap))
  } catch {}

  // 2. Sync into leniva_custom_printer_products, leniva_custom_cad_products, leniva_custom_scanner_products
  const customStorageKeys = [
    'leniva_custom_printer_products',
    'leniva_custom_cad_products',
    'leniva_custom_scanner_products',
  ]
  for (const sKey of customStorageKeys) {
    try {
      const list = JSON.parse(window.localStorage.getItem(sKey) || '[]')
      if (Array.isArray(list) && list.some((item: any) => item && item.key === productKey)) {
        const updatedList = list.map((item: any) => {
          if (!item || item.key !== productKey) return item
          return {
            ...item,
            ...(heroImg ? { heroImage: heroImg } : {}),
            ...(brochureUrl ? { defaultBrochureUrl: brochureUrl } : {}),
            ...(headline ? { headline } : {}),
            ...(shortDesc ? { shortDescription: shortDesc } : {}),
          }
        })
        window.localStorage.setItem(sKey, JSON.stringify(updatedList))
      }
    } catch {}
  }

  // 3. Sync into leniva_admin_products_catalog so /products & category pages show the uploaded image, brochure, and edited text
  try {
    const cleanSlug = productKey
      .replace(/^(printer_|cad_|scanner_)/, '')
      .replace(/_/g, '-')
      .toLowerCase()
    const catalogItem = VISUAL_PAGE_CATALOG.find(i => i.key === productKey)
    const routeSlug = catalogItem?.route.replace(/^\/products\/?/, '').toLowerCase() || cleanSlug

    const storedCat = JSON.parse(window.localStorage.getItem('leniva_admin_products_catalog') || '[]')
    if (Array.isArray(storedCat) && storedCat.length > 0) {
      let changed = false
      const updatedCat = storedCat.map((item: any) => {
        if (!item) return item
        const itemSlug = (item.slug || item.id || '').toLowerCase()
        if (itemSlug === cleanSlug || itemSlug === routeSlug || item.id === productKey) {
          changed = true
          return {
            ...item,
            is_admin_customized: true,
            ...(heroImg ? { hero_image: heroImg, images: [heroImg, ...(Array.isArray(item.images) ? item.images.slice(1) : [])] } : {}),
            ...(brochureUrl ? { brochure_url: brochureUrl } : {}),
            ...(headline ? { hero_heading: headline, tagline: headline } : {}),
            ...(shortDesc ? { short_description: shortDesc, description: shortDesc } : {}),
          }
        }
        return item
      })
      if (changed) {
        window.localStorage.setItem('leniva_admin_products_catalog', JSON.stringify(updatedCat))
      }
    }
  } catch {}
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

  // Also keep published map & catalogs synced locally so the frontend reflects admin edits/uploads immediately
  const allPublished = readJsonMap<CadVisualPagePayload>(CAD_VISUAL_PUBLISHED_KEY)
  allPublished[productKey] = stamped
  writeJsonMap(CAD_VISUAL_PUBLISHED_KEY, allPublished)
  syncVisualPayloadToCatalogs(productKey, stamped)

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('leniva_cad_visual_draft_updated'))
    window.dispatchEvent(new Event('leniva_cad_visual_updated'))
    window.dispatchEvent(new Event('leniva_products_catalog_updated'))
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
    window.dispatchEvent(new Event('leniva_cad_visual_updated'))
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

  // 3. Push lightweight Revision Snapshot (keep up to 3 revisions per product, without duplicating huge base64 images)
  try {
    const allRevisions = readJsonMap<CadVisualRevision[]>(CAD_VISUAL_REVISIONS_KEY)
    const productRevisions = Array.isArray(allRevisions[productKey]) ? allRevisions[productKey] : []
    const leanSnapshot = JSON.parse(
      JSON.stringify(stamped, (_k, v) =>
        typeof v === 'string' && v.startsWith('data:image/') && v.length > 50000 ? v.slice(0, 64) + '...[inline-image]' : v
      )
    )
    const newRevision: CadVisualRevision = {
      id: `rev_${Date.now()}`,
      timestamp: now,
      label: revisionLabel,
      payload: leanSnapshot,
    }
    allRevisions[productKey] = [newRevision, ...productRevisions].slice(0, 3)
    writeJsonMap(CAD_VISUAL_REVISIONS_KEY, allRevisions)
  } catch {
    // Non-critical if revisions cannot be saved
  }

  // 4. Sync Hero / Image / Brochure / Identity fields across all catalogs
  syncVisualPayloadToCatalogs(productKey, stamped)

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

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const res = typeof reader.result === 'string' ? reader.result : ''
      resolve(res)
    }
    reader.onerror = () => reject(new Error('Failed to read file as Data URL'))
    reader.readAsDataURL(file)
  })
}

/**
 * Validates and uploads an Image or PDF file to persistent cloud storage.
 * Never returns temporary blob: URLs or broken raw base64 without data: prefix.
 * Priority:
 * 1. /api/storage/upload (Vercel Blob / S3 / Bytebin backend endpoint)
 * 2. Direct Bytebin Cloud CDN (https://bytebin.lucko.me/post) returning a permanent HTTPS URL
 * 3. Client-side optimized persistent Data URL (data:image/...;base64,... or data:application/pdf;base64,...)
 */
export async function uploadAssetToPersistentStorage(
  file: File,
  kind: 'image' | 'pdf',
  onProgress?: (percent: number, statusText: string) => void
): Promise<PersistentUploadResult> {
  if (kind === 'image') {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    const ext = file.name.toLowerCase()
    const isImageExt =
      ext.endsWith('.jpg') ||
      ext.endsWith('.jpeg') ||
      ext.endsWith('.png') ||
      ext.endsWith('.webp') ||
      ext.endsWith('.svg')
    if (!allowedImageTypes.includes(file.type) && !isImageExt) {
      throw new Error('Unsupported image format. Allowed formats: JPG, PNG, WebP, SVG.')
    }
    if (file.size > 15 * 1024 * 1024) {
      throw new Error('Image exceeds maximum file size of 15 MB.')
    }
    if (file.type === 'image/svg+xml' || ext.endsWith('.svg')) {
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
  const resolvedMime =
    file.type ||
    (kind === 'pdf'
      ? 'application/pdf'
      : file.name.toLowerCase().endsWith('.png')
        ? 'image/png'
        : file.name.toLowerCase().endsWith('.webp')
          ? 'image/webp'
          : file.name.toLowerCase().endsWith('.svg')
            ? 'image/svg+xml'
            : 'image/jpeg')

  // Strategy 1: For PDFs, try /api/storage/upload or /api/upload first (skip for images so they sync cleanly across all browsers via Cloud Gist)
  if (kind === 'pdf') {
    try {
      onProgress?.(40, 'Uploading to persistent cloud storage...')
      const base64Data = await fileToBase64(file)
      const endpoints = ['/api/storage/upload', '/api/upload']

      for (const endpoint of endpoints) {
        try {
          const apiRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              contentType: resolvedMime,
              dataBase64: base64Data,
            }),
          })
          const ct = apiRes.headers.get('content-type') || ''
          if (apiRes.ok && ct.includes('application/json')) {
            const json = await apiRes.json()
            const returnedUrl = json?.url || json?.absoluteUrl
            if (returnedUrl) {
              onProgress?.(100, 'Upload complete!')
              return {
                url: normalizeAssetUrl(returnedUrl, kind),
                fileName: json.fileName || file.name,
                fileSize: formattedSize,
                mimeType: resolvedMime,
                dimensions,
              }
            }
          }
        } catch {
          // try next endpoint
        }
      }
    } catch {
      // continue to next strategy
    }
  }

  // Strategy 2: Client-side persistent Data URL (crisp & quota-safe for localStorage + Cloud Gist sync)
  onProgress?.(75, 'Processing and encoding asset...')
  let finalAssetUrl = await fileToDataUrl(file)

  // Ensure valid data: prefix
  if (!finalAssetUrl.startsWith('data:')) {
    finalAssetUrl = `data:${resolvedMime};base64,${finalAssetUrl}`
  }

  // Keep small images (<= 220 KB) 100% raw & untouched.
  // For larger images (> 220 KB), encode crisply (up to 1600px, high-quality WebP/JPEG) so they stay razor-sharp
  // while never overflowing browser localStorage (5 MB total quota) or Cloud Gist payload limits.
  const MAX_RAW_SIZE_BYTES = 220 * 1024
  const TARGET_MAX_DATA_URL_LEN = 360 * 1024 // ~270 KB binary
  if (kind === 'image' && resolvedMime !== 'image/svg+xml' && (file.size > MAX_RAW_SIZE_BYTES || finalAssetUrl.length > TARGET_MAX_DATA_URL_LEN)) {
    try {
      const img = new Image()
      const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = finalAssetUrl
      })
      await loadPromise

      const maxDim = 1600
      let { width, height } = img
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, width, height)
        const isTransparentType = resolvedMime === 'image/png' || resolvedMime === 'image/webp'
        const targetMime = isTransparentType ? 'image/webp' : 'image/jpeg'
        let encoded = canvas.toDataURL(targetMime, 0.90)
        if (encoded.length > TARGET_MAX_DATA_URL_LEN) {
          encoded = canvas.toDataURL(targetMime, 0.82)
        }
        if (encoded.length > TARGET_MAX_DATA_URL_LEN) {
          encoded = canvas.toDataURL('image/jpeg', 0.78)
        }
        if (encoded && encoded.startsWith('data:image/') && encoded.length < finalAssetUrl.length) {
          finalAssetUrl = encoded
        }
      }
    } catch {
      // keep original pristine data URL
    }
  }

  onProgress?.(100, 'Upload complete!')

  return {
    url: normalizeAssetUrl(finalAssetUrl, kind),
    fileName: file.name,
    fileSize: formattedSize,
    mimeType: resolvedMime,
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
    return getPublishedVisualPayload(productKey) || getDraftVisualPayload(productKey) || getDefaultVisualPayload(productKey)
  })

  useEffect(() => {
    if (editorCtx && editorCtx.productKey === productKey) return
    const refresh = () => {
      setPublishedPayload(
        getPublishedVisualPayload(productKey) ||
          getDraftVisualPayload(productKey) ||
          getDefaultVisualPayload(productKey)
      )
    }
    refresh()
    window.addEventListener('leniva_cad_visual_updated', refresh)
    window.addEventListener('leniva_cad_visual_draft_updated', refresh)
    window.addEventListener('leniva_cloud_cms_synced', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('leniva_cad_visual_updated', refresh)
      window.removeEventListener('leniva_cad_visual_draft_updated', refresh)
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

export function stampDeterministicCadKeys(root: HTMLElement) {
  if (!root) return
  const sections = Array.from(root.querySelectorAll<HTMLElement>('section'))
  sections.forEach((sec, idx) => {
    if (!sec.hasAttribute('data-cad-section')) {
      const heading = sec.querySelector('h1, h2, h3, h4')?.textContent?.trim()
      const slug = heading
        ? heading.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 36)
        : ''
      const secId = slug ? `sec_${slug}` : `auto_sec_${idx}`
      sec.setAttribute('data-cad-section', secId)
    }
  })

  // Also stamp deterministic data-cad-key on standard elements so keys never shift when content is edited
  const tagsToStamp = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'a', 'button', 'li', 'td', 'th']
  for (const tag of tagsToStamp) {
    const els = Array.from(root.querySelectorAll<HTMLElement>(tag))
    els.forEach((el, idx) => {
      if (!el.hasAttribute('data-cad-key') && !el.hasAttribute('data-cad-path')) {
        el.setAttribute('data-cad-key', `auto:${tag}:${idx}`)
      }
    })
  }
}

export interface DiscoveredDomPdfLink {
  key: string
  label: string
  href: string
  isButton: boolean
}

export function discoverLiveDomInventory(
  root: HTMLElement,
  productKey: string
): {
  sections: CadSectionDefinition[]
  imageSlots: CadImageSlot[]
  pdfLinks: DiscoveredDomPdfLink[]
} {
  if (!root) {
    return {
      sections: productKey === 'ares_commander' ? ARES_COMMANDER_SECTIONS : [],
      imageSlots: productKey === 'ares_commander' ? ARES_COMMANDER_IMAGE_SLOTS : [],
      pdfLinks: [],
    }
  }

  stampDeterministicCadKeys(root)

  // 1. Discover Sections
  let sections: CadSectionDefinition[] = []
  if (productKey === 'ares_commander') {
    sections = [...ARES_COMMANDER_SECTIONS]
  } else {
    const secNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-cad-section]'))
    sections = secNodes.map((sec, idx) => {
      const id = sec.getAttribute('data-cad-section') || `auto_sec_${idx}`
      const headingEl = sec.querySelector<HTMLElement>('h1, h2, h3, h4')
      const headingText = (headingEl?.textContent || '').trim()
      const descEl = sec.querySelector<HTMLElement>('p')
      const descText = (descEl?.textContent || '').trim()
      const shortTitle = headingText
        ? headingText.length > 42
          ? `${headingText.slice(0, 42)}...`
          : headingText
        : `Section ${idx + 1}`
      return {
        id,
        label: `${idx + 1}. ${headingText || `Page Section ${idx + 1}`}`,
        shortLabel: `${idx + 1}. ${shortTitle}`,
        description: descText ? descText.slice(0, 120) : 'Click any text, image, or button in this section to edit.',
        category: idx === 0 ? 'hero' : 'content',
      }
    })
  }

  // 2. Discover Image Slots
  let imageSlots: CadImageSlot[] = []
  if (productKey === 'ares_commander') {
    imageSlots = [...ARES_COMMANDER_IMAGE_SLOTS]
  } else {
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('img'))
    imageSlots = imgs.map((img, idx) => {
      const elKey = computeDeterministicCadKey(root, img)
      if (!img.hasAttribute('data-cad-key')) {
        img.setAttribute('data-cad-key', elKey)
      }
      const origSrc = img.getAttribute('data-original-src') || img.getAttribute('src') || img.src || ''
      if (!img.hasAttribute('data-original-src') && origSrc) {
        img.setAttribute('data-original-src', origSrc)
      }
      const closestSec = img.closest<HTMLElement>('[data-cad-section]')
      const secId = closestSec?.getAttribute('data-cad-section') || 'auto_sec_0'
      const altText = img.getAttribute('data-original-alt') || img.alt || `Product Image ${idx + 1}`
      if (!img.hasAttribute('data-original-alt')) {
        img.setAttribute('data-original-alt', altText)
      }
      const dims =
        img.naturalWidth && img.naturalHeight
          ? `${img.naturalWidth} × ${img.naturalHeight} px`
          : 'Maintain Aspect Ratio'
      return {
        id: elKey,
        label: `${idx + 1}. ${altText.slice(0, 56)}`,
        sectionId: secId,
        dataPath: img.getAttribute('data-cad-path') || undefined,
        defaultSrc: origSrc,
        defaultAlt: altText,
        recommendedDimensions: dims,
      }
    })
  }

  // 3. Discover PDF / Brochure / Download links & buttons on the live page
  const pdfLinks: DiscoveredDomPdfLink[] = []
  const candidates = Array.from(root.querySelectorAll<HTMLElement>('a, button'))
  for (const el of candidates) {
    const text = (el.textContent || '').trim()
    const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') || '' : el.getAttribute('data-visual-override-href') || ''
    const lowerText = text.toLowerCase()
    const lowerHref = href.toLowerCase()
    const isPdfOrBrochure =
      lowerHref.endsWith('.pdf') ||
      lowerHref.includes('/brochures/') ||
      lowerText.includes('brochure') ||
      lowerText.includes('datasheet') ||
      lowerText.includes('download') ||
      lowerText.includes('spec sheet') ||
      lowerText.includes('manual') ||
      lowerText.includes('trial')

    if (isPdfOrBrochure && text.length > 0 && text.length < 80) {
      const key = computeDeterministicCadKey(root, el)
      pdfLinks.push({
        key,
        label: text,
        href: href || '#',
        isButton: el.tagName.toLowerCase() === 'button',
      })
    }
  }

  return { sections, imageSlots, pdfLinks }
}

/**
 * Safely updates the visible text of an element WITHOUT removing any child Element nodes
 * (<br>, <span>, <strong>, <svg>) owned by React's Fiber tree, preventing React removeChild crashes on unmount.
 */
function setElementTextSafely(el: HTMLElement, newText: string) {
  if (el.childElementCount === 0) {
    if (el.textContent !== newText) {
      el.textContent = newText
    }
    return
  }

  // If element contains child Elements (like <br/>, <span>, <svg>), update text nodes in-place without removing Elements
  const textNodes: Text[] = []
  if (typeof document !== 'undefined') {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    let node = walker.nextNode() as Text | null
    while (node) {
      if (!node.parentElement?.closest('svg')) {
        textNodes.push(node)
      }
      node = walker.nextNode() as Text | null
    }
  }

  if (textNodes.length > 0) {
    if (textNodes[0].nodeValue !== newText) {
      textNodes[0].nodeValue = newText
    }
    for (let i = 1; i < textNodes.length; i++) {
      if (textNodes[i].nodeValue !== '') {
        textNodes[i].nodeValue = ''
      }
    }
    const brs = Array.from(el.querySelectorAll<HTMLElement>('br'))
    for (const br of brs) {
      if (br.style.display !== 'none') {
        br.style.display = 'none'
      }
    }
  }
}

function bindVisualDownloadClickHandler(el: HTMLElement) {
  if (el.hasAttribute('data-visual-href-bound')) return
  el.setAttribute('data-visual-href-bound', 'true')
  el.addEventListener(
    'click',
    ev => {
      const inEditorEditMode = Boolean(
        el.closest('[data-cad-editor-canvas="true"][data-preview-mode="false"]')
      )
      if (inEditorEditMode) return
      const overrideHref =
        el.getAttribute('data-visual-override-href') ||
        (el instanceof HTMLAnchorElement ? el.getAttribute('href') : '') ||
        ''
      if (!overrideHref) return
      if (
        overrideHref.startsWith('data:application/pdf') ||
        overrideHref.startsWith('JVBERi') ||
        el instanceof HTMLButtonElement
      ) {
        ev.preventDefault()
        ev.stopPropagation()
        openPdfOrUrlSafely(overrideHref)
      }
    },
    true
  )
}

export function applyCadVisualOverridesToRoot(root: HTMLElement, payload: CadVisualPagePayload) {
  if (!root || !payload) return

  stampDeterministicCadKeys(root)

  // 0. If this is a custom 3D Printer or 3D Scanner created from a template, apply its initial customPrinterMeta branding to the template DOM
  const customPrinterMeta = payload.dataOverrides?.customPrinterMeta
  if (customPrinterMeta && typeof customPrinterMeta === 'object' && customPrinterMeta.name) {
    const newName = String(customPrinterMeta.name).trim()
    const newBrand = String(customPrinterMeta.brand || 'Make3D').trim()
    const baseNames = [
      customPrinterMeta.baseTemplateName,
      'Pratham Mini',
      'PRATHAM MINI',
      'Pratham Desktop',
      'PRATHAM DESKTOP',
      'Pratham 3.0 Rapid',
      'PRATHAM 3.0 RAPID',
      'Pratham 3 Rapid',
      'Pratham 3.0',
      'PRATHAM 3.0',
      'Pratham 5.0',
      'PRATHAM 5.0',
      'Pratham 6.0',
      'PRATHAM 6.0',
      'Pratham X (600)',
      'Pratham X (1000)',
      'Pratham X 1000',
      'Pratham X',
      'EKA HT',
      'EKA XL',
      'EKA XLE',
      'EKA GT Max',
      'EKA GT MAX',
      'EKA F1 16K',
      '3DeVOK MT',
      '3DEVOK MT',
      'Devok MT',
      'DEVOK MT',
      '3DeVOK MQ',
      '3DEVOK MQ',
      'Devok MQ',
      'DEVOK MQ',
      'EINSTAR',
      'EinScan Series',
      'EINSCAN SERIES',
      'EinScan',
      'EINSCAN',
    ].filter(Boolean) as string[]

    if (typeof document !== 'undefined') {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      let currentNode = walker.nextNode()
      while (currentNode) {
        const parentEl = currentNode.parentElement
        const closestKeyEl = parentEl?.closest<HTMLElement>('[data-cad-key]')
        const elKey = parentEl?.getAttribute('data-cad-key') || closestKeyEl?.getAttribute('data-cad-key') || ''
        if (!elKey || !payload.elementOverrides?.[elKey]) {
          let txt = currentNode.nodeValue || ''
          let changed = false
          for (const bn of baseNames) {
            if (txt.includes(bn.toUpperCase())) {
              txt = txt.split(bn.toUpperCase()).join(newName.toUpperCase())
              changed = true
            }
            if (txt.includes(bn)) {
              txt = txt.split(bn).join(newName)
              changed = true
            }
          }
          if (customPrinterMeta.buildVolume) {
            const defaultVolumes = [
              '170 × 170 × 170 mm',
              '200 × 200 × 250 mm',
              '300 × 300 × 300 mm',
              '350 × 350 × 350 mm',
              '500 × 500 × 500 mm',
              '600 × 600 × 600 mm',
              '1000 × 1000 × 1000 mm',
              '130 × 73 × 150 mm',
            ]
            for (const dv of defaultVolumes) {
              if (txt.includes(dv)) {
                txt = txt.split(dv).join(String(customPrinterMeta.buildVolume))
                changed = true
              }
            }
          }
          if (changed && currentNode.nodeValue !== txt) {
            currentNode.nodeValue = txt
          }
        }
        currentNode = walker.nextNode()
      }
    }

    if (customPrinterMeta.headline) {
      const h1El = root.querySelector<HTMLElement>('h1')
      const h1Key = h1El?.getAttribute('data-cad-key') || 'auto:h1:0'
      if (h1El && !payload.elementOverrides?.[h1Key]) {
        const targetHeadline = String(customPrinterMeta.headline)
        setElementTextSafely(h1El, targetHeadline)
      }
    }
    if (customPrinterMeta.shortDescription) {
      const pEls = Array.from(root.querySelectorAll<HTMLElement>('section p'))
      const descEl = pEls.find(p => (p.textContent || '').trim().length > 45)
      const descKey = descEl?.getAttribute('data-cad-key') || ''
      if (descEl && (!descKey || !payload.elementOverrides?.[descKey])) {
        const targetDesc = String(customPrinterMeta.shortDescription)
        setElementTextSafely(descEl, targetDesc)
      }
    }
    if (newBrand) {
      // keep brand accessible for any brand badges
    }
  }

  // 1. Apply SEO title & description when on public product page
  if (typeof document !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
    if (payload.seo?.title && document.title !== payload.seo.title) {
      document.title = payload.seo.title
    }
    if (payload.seo?.description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      if (metaDesc.getAttribute('content') !== payload.seo.description) {
        metaDesc.setAttribute('content', payload.seo.description)
      }
    }
  }

  // 2. Apply section visibility and section ordering
  const sectionNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-cad-section]'))
  const hiddenMap = payload.hiddenSections || {}
  const orderList = Array.isArray(payload.sectionOrder) ? payload.sectionOrder : []
  const currentSecIds = sectionNodes.map(s => s.getAttribute('data-cad-section') || '')
  const isCustomOrder =
    orderList.length > 0 && orderList.some((id, idx) => currentSecIds[idx] && id !== currentSecIds[idx])

  for (let idx = 0; idx < sectionNodes.length; idx++) {
    const sec = sectionNodes[idx]
    const secId = sec.getAttribute('data-cad-section') || ''
    const fallbackOldId = `auto_sec_${idx}`
    const isHidden = Boolean(hiddenMap[secId] || hiddenMap[fallbackOldId])

    if (isHidden) {
      if (sec.style.display !== 'none') {
        sec.style.setProperty('display', 'none', 'important')
        sec.setAttribute('data-cad-section-hidden', 'true')
      }
    } else if (sec.hasAttribute('data-cad-section-hidden')) {
      sec.style.removeProperty('display')
      sec.removeAttribute('data-cad-section-hidden')
    }
    if (sec.style.width !== '100%') {
      sec.style.width = '100%'
    }

    if (isCustomOrder) {
      const orderIdx = orderList.indexOf(secId) !== -1 ? orderList.indexOf(secId) : orderList.indexOf(fallbackOldId)
      if (orderIdx !== -1 && sec.parentElement) {
        sec.parentElement.style.display = 'flex'
        sec.parentElement.style.flexDirection = 'column'
        sec.parentElement.style.width = '100%'
        sec.style.order = String(orderIdx + 1)
      }
    } else if (sec.style.order) {
      sec.style.order = ''
    }
  }

  // 3. Apply primary PDF Brochure replacement to any brochure/download links & buttons on the page
  const primaryPdf = payload.pdfResources?.[0]
  if (primaryPdf && primaryPdf.fileUrl && primaryPdf.fileUrl !== primaryPdf.originalFileUrl) {
    const normalizedPrimaryPdfUrl = normalizeAssetUrl(primaryPdf.fileUrl, 'pdf')
    const allActionEls = Array.from(root.querySelectorAll<HTMLElement>('a, button'))
    for (const el of allActionEls) {
      const elKey = el.getAttribute('data-cad-key') || ''
      // Don't overwrite if this element has its own explicit pdfUrl/href override
      if (elKey && (payload.elementOverrides?.[elKey]?.pdfUrl || payload.elementOverrides?.[elKey]?.href)) {
        continue
      }
      const origHref = el.getAttribute('data-original-href') || (el instanceof HTMLAnchorElement ? el.getAttribute('href') || '' : '')
      const text = (el.textContent || '').trim().toLowerCase()
      const isBrochureEl =
        origHref.includes('/brochures/') ||
        origHref.toLowerCase().endsWith('.pdf') ||
        el.hasAttribute('download') ||
        text.includes('brochure') ||
        text.includes('datasheet') ||
        text.includes('spec sheet')

      if (isBrochureEl && normalizedPrimaryPdfUrl) {
        if (el instanceof HTMLAnchorElement) {
          if (!el.hasAttribute('data-original-href')) {
            el.setAttribute('data-original-href', el.getAttribute('href') || '')
          }
          if (el.getAttribute('href') !== normalizedPrimaryPdfUrl) {
            el.setAttribute('href', normalizedPrimaryPdfUrl)
          }
          el.setAttribute('data-visual-override-href', normalizedPrimaryPdfUrl)
          bindVisualDownloadClickHandler(el)
        } else if (el instanceof HTMLButtonElement) {
          el.setAttribute('data-visual-override-href', normalizedPrimaryPdfUrl)
          bindVisualDownloadClickHandler(el)
        }
      }
    }
  }

  // 4. Apply elementOverrides (text, href, src, alt, objectFit, hidden, pdfUrl, buttonLabel)
  const overrides: Record<string, any> = { ...(payload.elementOverrides || {}) }
  const dataHeroImg = payload.dataOverrides?.hero?.image || payload.dataOverrides?.hero?.heroImage
  if (dataHeroImg && !overrides['hero.image']) {
    overrides['hero.image'] = { key: 'hero.image', src: dataHeroImg, objectFit: 'contain' }
  }
  for (const [elKey, ov] of Object.entries(overrides)) {
    if (!ov) continue
    const target = findElementByCadKey(root, elKey)
    if (!target) continue

    if (ov.hidden !== undefined) {
      const wantDisplay = ov.hidden ? 'none' : ''
      if (target.style.display !== wantDisplay) {
        target.style.display = wantDisplay
      }
    }
    if (target instanceof HTMLImageElement) {
      if (!target.hasAttribute('data-original-src')) {
        target.setAttribute('data-original-src', target.getAttribute('src') || target.src || '')
      }
      if (ov.src) {
        const normSrc = normalizeAssetUrl(ov.src, 'image')
        if (target.getAttribute('src') !== normSrc) {
          target.setAttribute('src', normSrc)
        }
        // Keep any sibling hover magnifier / zoom lens in sync with the uploaded image
        const siblingLens = target.parentElement?.querySelector<HTMLElement>('[data-cad-zoom-lens]')
        if (siblingLens) {
          siblingLens.style.backgroundImage = `url("${normSrc}")`
        }
        // When a custom image is uploaded, display it cleanly in its full natural proportions without zooming or cropping
        const effectiveFit = (ov.objectFit === 'fill' || ov.objectFit === 'scale-down') ? ov.objectFit : 'contain'
        target.style.objectFit = effectiveFit
        target.style.objectPosition = 'center'
        target.classList.remove('object-cover')
        target.classList.add('object-contain')
      } else if (target.hasAttribute('data-original-src')) {
        const orig = target.getAttribute('data-original-src') || ''
        if (orig && target.getAttribute('src') !== orig) {
          target.setAttribute('src', orig)
        }
      }
      if (ov.alt !== undefined && target.alt !== ov.alt) target.alt = ov.alt
      if (ov.objectFit && (ov.objectFit === 'fill' || ov.objectFit === 'scale-down')) {
        target.style.objectFit = ov.objectFit
      } else if (ov.src) {
        target.style.objectFit = 'contain'
      }
    } else {
      if (!target.hasAttribute('data-original-text')) {
        target.setAttribute('data-original-text', target.textContent || '')
      }
      const newText =
        ov.buttonLabel !== undefined
          ? ov.buttonLabel
          : ov.text !== undefined
            ? ov.text
            : target.getAttribute('data-original-text') ?? undefined
      if (newText !== undefined) {
        const isButtonOrLinkWithIcon =
          (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') &&
          Boolean(target.querySelector('svg'))

        if (!isButtonOrLinkWithIcon && (target.childElementCount === 0 || target.hasAttribute('data-cad-text-leaf') || /^h[1-6]|p|li|td|th$/i.test(target.tagName))) {
          setElementTextSafely(target, newText)
        } else {
          // Preserve child SVG icons inside buttons or links by updating the inner span or text node
          const textSpan =
            target.querySelector<HTMLElement>('[data-cad-btn-text]') ||
            Array.from(target.querySelectorAll<HTMLElement>('span')).find(
              s => s.childElementCount === 0 && (s.textContent || '').trim().length > 0
            )
          if (textSpan) {
            setElementTextSafely(textSpan, newText)
          } else {
            const textNode = Array.from(target.childNodes).find(
              n => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0
            )
            if (textNode) {
              const formatted = ` ${newText} `
              if (textNode.textContent !== formatted) {
                textNode.textContent = formatted
              }
            } else {
              setElementTextSafely(target, newText)
            }
          }
        }
      }

      const rawTargetUrl = ov.pdfUrl || ov.href
      if (rawTargetUrl) {
        const targetUrl = normalizeAssetUrl(rawTargetUrl, ov.pdfUrl ? 'pdf' : 'image')
        if (target instanceof HTMLAnchorElement) {
          if (!target.hasAttribute('data-original-href')) {
            target.setAttribute('data-original-href', target.getAttribute('href') || '')
          }
          if (target.getAttribute('href') !== targetUrl) {
            target.setAttribute('href', targetUrl)
          }
          target.setAttribute('data-visual-override-href', targetUrl)
          bindVisualDownloadClickHandler(target)
        } else if (target instanceof HTMLButtonElement) {
          target.setAttribute('data-visual-override-href', targetUrl)
          bindVisualDownloadClickHandler(target)
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

/**
 * Global Route-Aware Applier for all 38+ Product & Category Pages (CAD Software, 3D Printers, Filaments, 3D Scanners).
 * Mounted in `src/App.tsx` so any published or draft visual edits apply automatically on the live public website!
 */
export const GlobalVisualPageOverridesApplier: React.FC<{ pathname: string }> = ({ pathname }) => {
  const [tick, setTick] = useState(0)
  const productKey = resolveVisualProductKeyFromPath(pathname)

  useEffect(() => {
    const onUpdate = () => setTick(t => t + 1)
    window.addEventListener('leniva_cad_visual_updated', onUpdate)
    window.addEventListener('leniva_cad_visual_draft_updated', onUpdate)
    window.addEventListener('leniva_products_catalog_updated', onUpdate)
    window.addEventListener('leniva_cloud_cms_synced', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('leniva_cad_visual_updated', onUpdate)
      window.removeEventListener('leniva_cad_visual_draft_updated', onUpdate)
      window.removeEventListener('leniva_products_catalog_updated', onUpdate)
      window.removeEventListener('leniva_cloud_cms_synced', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined' || pathname.startsWith('/admin')) return
    const resolvedKey = productKey || resolveVisualProductKeyFromPath(pathname)
    if (!resolvedKey) return

    const applyNow = () => {
      const activePayload = getPublishedVisualPayload(resolvedKey) || getDraftVisualPayload(resolvedKey)
      if (!activePayload) return
      const mainEl = document.querySelector<HTMLElement>('main')
      if (mainEl) {
        applyCadVisualOverridesToRoot(mainEl, activePayload)
      }
    }

    const t1 = setTimeout(applyNow, 40)
    const t2 = setTimeout(applyNow, 250)
    const t3 = setTimeout(applyNow, 700)
    const t4 = setTimeout(applyNow, 1500)

    const mainEl = document.querySelector<HTMLElement>('main')
    let observer: MutationObserver | null = null
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    if (mainEl && typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(() => {
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(applyNow, 80)
      })
      observer.observe(mainEl, { childList: true, subtree: true })
    }

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      if (debounceTimer) clearTimeout(debounceTimer)
      observer?.disconnect()
    }
  }, [productKey, pathname, tick])

  return null
}

export function findElementByCadKey(root: HTMLElement, elKey: string): HTMLElement | null {
  const byAttr = root.querySelector<HTMLElement>(`[data-cad-key="${CSS.escape(elKey)}"]`)
  if (byAttr) return byAttr

  const byPath = root.querySelector<HTMLElement>(`[data-cad-path="${CSS.escape(elKey)}"]`)
  if (byPath) return byPath

  // Fallback for hero.image on pages without explicit data-cad-path: pick first non-brand-logo product <img>
  if (elKey === 'hero.image') {
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('img'))
    const heroCandidate = imgs.find(img => {
      if (img.closest('header') || img.closest('footer')) return false
      const src = (img.getAttribute('src') || '').toLowerCase()
      const orig = (img.getAttribute('data-original-src') || '').toLowerCase()
      if (src.includes('/images/brands/') || orig.includes('/images/brands/') || src.includes('/logo') || orig.includes('/logo')) {
        return false
      }
      return true
    })
    if (heroCandidate) return heroCandidate
  }

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
