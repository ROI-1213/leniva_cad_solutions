import heroBanner1 from '../assets/hero/hero-banner-1.png'
import heroBanner2 from '../assets/hero/hero-banner-2.png'
import heroBanner3 from '../assets/hero/hero-banner-3.png'
import heroBanner4 from '../assets/hero/hero-banner-4.png'

export interface HeroSlideConfig {
  id: number
  image: string
  alt: string
  title: string
  subtitle: string
  tag: string
  badge: string
  primaryBtnText: string
  primaryBtnLink: string
  secondaryBtnText: string
  quoteSubject: string
}

export interface ProductSlideConfigItem {
  src: string
  name: string
}

export interface PrinterCardConfig {
  technologyTag: string
  title: string
  categoryTag: string
  intervalMs: number
  description: string
  bulletPoints: string[]
  btnText: string
  btnLink: string
  slides: ProductSlideConfigItem[]
}

export interface CadCardConfig {
  categoryTag: string
  title: string
  brandLogo: string
  brandPartnerText: string
  intervalMs: number
  description: string
  bulletPoints: string[]
  btnText: string
  btnLink: string
  slides: ProductSlideConfigItem[]
}

export interface HomeContentConfig {
  hero: {
    slides: HeroSlideConfig[]
    headlinePrefix: string
    headlineHighlight: string
    description: string
    talkToExpertText: string
  }
  companyIntro: {
    heading: string
    headingHighlight: string
    description: string
    pillars: string[]
    btnExploreText: string
    btnExploreLink: string
    btnContactText: string
    btnContactLink: string
    posterImage: string
    posterAlt: string
  }
  printers: {
    sectionBadge: string
    title: string
    description: string
    viewAllText: string
    viewAllLink: string
    fdm: PrinterCardConfig
    dlp: PrinterCardConfig
    lcd: PrinterCardConfig
  }
  cadSoftware: {
    sectionBadge: string
    title: string
    description: string
    viewAllText: string
    viewAllLink: string
    ares: CadCardConfig
    sketchup: CadCardConfig
    chaos: CadCardConfig
  }
}

export const DEFAULT_HOME_CONTENT: HomeContentConfig = {
  hero: {
    slides: [
      {
        id: 1,
        image: heroBanner1,
        alt: 'Next Generation 3D Printing Technology — Leniva CAD Solutions',
        title: 'Next Generation 3D Printing Technology',
        subtitle: 'Powering Creativity, Enabling Industry',
        tag: 'Design • Prototype • Manufacture',
        badge: 'Full Additive Ecosystem',
        primaryBtnText: 'Explore 3D Printers',
        primaryBtnLink: '/products',
        secondaryBtnText: 'Request Quote',
        quoteSubject: 'Next Generation 3D Printing Technology Quote Request',
      },
      {
        id: 2,
        image: heroBanner2,
        alt: 'Industrial Grade Precision Performance Possibilities — Leniva CAD Solutions',
        title: 'Precision, Performance, Possibilities',
        subtitle: 'Large Ideas, Bigger Possibilities',
        tag: 'Industrial Grade 3D Technologies',
        badge: 'Full Additive Ecosystem',
        primaryBtnText: 'Explore Our Range',
        primaryBtnLink: '/products',
        secondaryBtnText: 'Request a Demo',
        quoteSubject: 'Industrial Grade 3D Solutions Demo Request',
      },
      {
        id: 3,
        image: heroBanner3,
        alt: 'Professional 3D Printing Solutions — Pratham 3 Rapid — Leniva CAD Solutions',
        title: 'Professional 3D Printing Solutions',
        subtitle: 'High-Speed Precision Prototyping & Production',
        tag: 'Pratham 3 Rapid • High-Speed FDM',
        badge: 'Advanced Additive Manufacturing',
        primaryBtnText: 'Explore Pratham 3 Rapid',
        primaryBtnLink: '/products/pratham-3-rapid',
        secondaryBtnText: 'Request Quote',
        quoteSubject: 'Pratham 3 Rapid Professional 3D Printing Solutions Quote Request',
      },
      {
        id: 4,
        image: heroBanner4,
        alt: 'Professional CAD & 3D Design Software — ARES, SketchUp, Chaos — Leniva CAD Solutions',
        title: 'CAD Softwares',
        subtitle: 'Official Licenses for ARES CAD, Trimble SketchUp & Chaos Suites',
        tag: 'ARES • SketchUp • Chaos Suites',
        badge: 'Authorized Software Partner',
        primaryBtnText: 'Explore CAD Software',
        primaryBtnLink: '/products/cad-software',
        secondaryBtnText: 'Request Quote',
        quoteSubject: 'CAD Software Official Licensing Quote Request',
      },
    ],
    headlinePrefix: 'Your Trusted Partner in ',
    headlineHighlight: 'CAD & 3D Technology',
    description:
      'We are authorized dealers for leading CAD software, including ARES CAD, SketchUp, and Chaos, along with advanced 3D printing and 3D scanning solutions to meet your design and engineering needs.',
    talkToExpertText: 'Talk to Expert',
  },
  companyIntro: {
    heading: 'Your Partner for',
    headingHighlight: 'Advanced 3D Solutions',
    description:
      'Leniva CAD Solutions is a trusted supplier and solutions provider of CAD software, 3D printers, 3D scanners and related accessories. We bring proven engineering technologies to help industries, businesses and educational institutions adopt advanced 3D solutions for design, prototyping and production.',
    pillars: [
      '1. Licensed CAD & Rendering Software',
      '2. Industrial & Desktop 3D Printers',
      '3. 3D Scanners (Professional & Reverse Engineering)',
    ],
    btnExploreText: 'Explore Solutions',
    btnExploreLink: '/services',
    btnContactText: 'Contact Us',
    btnContactLink: '/contact',
    posterImage: '/images/about/about-leniva-poster.jpg',
    posterAlt: 'Leniva CAD Solutions — Authorized Software Partners & 3D Hardware',
  },
  printers: {
    sectionBadge: 'Core Business • 3D Printing Systems',
    title: '3D Printer Technologies',
    description:
      'We provide proven additive manufacturing systems tailored for functional engineering prototypes, fine jewellery casting, dental models, and industrial production.',
    viewAllText: 'View All 3D Printers',
    viewAllLink: '/products',
    fdm: {
      technologyTag: 'Fused Deposition Modeling',
      title: 'FDM 3D Printers',
      categoryTag: 'Industrial & Desktop',
      intervalMs: 2800,
      description:
        'Robust extrusion systems built for functional prototypes, jigs, tooling, and durable engineering parts with build envelopes up to 1 meter³.',
      bulletPoints: [
        'Build volumes from 170 mm to 1000 mm³',
        'PLA, ABS, PETG, TPU, Nylon & Carbon-Fiber',
        'Pratham Mini, Desktop, 3.0, 5.0, 6.0 & X Series',
      ],
      btnText: 'Explore FDM Printers',
      btnLink: '/products/fdm-3d-printers',
      slides: [
        { src: '/images/products/pratham-3-0.png', name: 'Pratham 3.0' },
        { src: '/images/products/pratham-mini-transparent.png', name: 'Pratham Mini' },
        { src: '/images/products/pratham-desktop.png', name: 'Pratham Desktop' },
        { src: '/images/products/pratham-5-0.png', name: 'Pratham 5.0' },
        { src: '/images/products/pratham-6-0.png', name: 'Pratham 6.0' },
        { src: '/images/products/pratham-x-transparent.png', name: 'Pratham X' },
        { src: '/images/products/pratham-3-rapid-transparent.png', name: 'Pratham 3 Rapid' },
      ],
    },
    dlp: {
      technologyTag: 'Digital Light Processing',
      title: 'DLP 3D Printers',
      categoryTag: 'High-Precision Resin',
      intervalMs: 3200,
      description:
        'High-precision photopolymer resin systems engineered for direct jewellery casting patterns, dental models, and intricate micro-components.',
      bulletPoints: [
        'Direct castable resin with 100% clean burnout',
        'Razor-sharp filigree and ultra-smooth surface finish',
        'EKA HT, EKA XL, and EKA XLE series',
      ],
      btnText: 'Explore DLP Printers',
      btnLink: '/products/dlp-3d-printers',
      slides: [
        { src: '/images/products/eka-xl.png', name: 'EKA XL' },
        { src: '/images/products/eka-ht.png', name: 'EKA HT' },
        { src: '/images/products/eka-xle.png', name: 'EKA XLE' },
      ],
    },
    lcd: {
      technologyTag: 'Masked Stereolithography',
      title: 'Industrial LCD Printers',
      categoryTag: '8K & 16K MSLA',
      intervalMs: 3000,
      description:
        'High-speed monochrome LCD masking systems for rapid batch throughput, micro-fine detailing, and productive engineering resin manufacturing.',
      bulletPoints: [
        'Up to 16K ultra-high resolution monochrome panels',
        'High cure speed for rapid batch output',
        'EKA GT MAX & EKA F1 16K micro-detailing',
      ],
      btnText: 'Explore LCD Printers',
      btnLink: '/products/industrial-lcd-3d-printers',
      slides: [
        { src: '/images/products/eka-gt-max.png', name: 'EKA GT MAX' },
        { src: '/images/products/eka-f1-16k.png', name: 'EKA F1 16K' },
      ],
    },
  },
  cadSoftware: {
    sectionBadge: 'Core Business • Authorized Software Partner',
    title: 'CAD & 3D Design Software',
    description:
      'Authorized reseller and technical partner for leading 2D/3D CAD, BIM, and photorealistic rendering suites with authentic licensing, deployment, and ongoing support.',
    viewAllText: 'View All CAD Software',
    viewAllLink: '/products/cad-software',
    ares: {
      categoryTag: 'DWG 2D & 3D CAD',
      title: 'ARES CAD Systems',
      brandLogo: '/images/brands/ares-cad.png',
      brandPartnerText: 'Official Graebert Partner',
      intervalMs: 3500,
      description:
        'Cost-effective, modern DWG-native CAD software featuring Trinity technology across Desktop, Cloud, and Mobile with dedicated Mechanical and Electrical suites.',
      bulletPoints: [
        'Perpetual and flexible annual licensing',
        'Trinity ecosystem: Desktop, Cloud (Kudo), Mobile (Touch)',
        'ARES Commander, Standard, Mechanical & Electrical',
      ],
      btnText: 'Explore ARES CAD',
      btnLink: '/products/cad-software',
      slides: [
        { src: '/images/ares-standard/designed-for-2d-drawing-workflows.jpg', name: 'ARES Standard' },
        { src: '/images/software/ares-standard.jpg', name: 'ARES Standard 2D CAD' },
        { src: '/images/software/ares-commander.jpg', name: 'ARES Commander' },
        { src: '/images/software/ares-mechanical.jpg', name: 'ARES Mechanical' },
        { src: '/images/software/ares-electrical.jpg', name: 'ARES Electrical' },
      ],
    },
    sketchup: {
      categoryTag: '3D Modeling & BIM',
      title: 'Trimble SketchUp',
      brandLogo: '/images/brands/sketchup.png',
      brandPartnerText: 'Authorized Trimble Partner',
      intervalMs: 3800,
      description:
        "The world's most intuitive 3D modeling platform for architects, interior designers, and construction professionals, featuring LayOut documentation and Scan-to-BIM.",
      bulletPoints: [
        'Fast, intuitive conceptual design & 3D modeling',
        '2D LayOut construction sets & Scan-to-BIM integration',
        'SketchUp Pro, SketchUp Studio, and Scan workflows',
      ],
      btnText: 'Explore SketchUp',
      btnLink: '/products/sketchup',
      slides: [
        { src: '/images/software/sketchup-pro.jpg', name: 'SketchUp Pro' },
        { src: '/images/software/sketchup-studio.jpg', name: 'SketchUp Studio' },
        { src: '/images/software/sketchup-scan.jpg', name: 'SketchUp Scan' },
        { src: '/images/software/sketchup-advanced.jpg', name: 'Advanced Workflows' },
      ],
    },
    chaos: {
      categoryTag: 'Visualization & Rendering',
      title: 'Chaos Rendering',
      brandLogo: '/images/brands/chaos.jpg',
      brandPartnerText: 'Authorized Chaos Partner',
      intervalMs: 3600,
      description:
        'Industry-leading photorealistic ray tracing, real-time visualization, and VR walkthrough engines trusted by architectural visualizers and design studios worldwide.',
      bulletPoints: [
        'Real-time rendering & VR walkthroughs (Enscape)',
        'Photorealistic ray-tracing fidelity (V-Ray & Corona)',
        'Enscape, Chaos V-Ray, and Chaos Corona',
      ],
      btnText: 'Explore Chaos Suites',
      btnLink: '/products/enscape',
      slides: [
        { src: '/images/software/enscape-3d.jpg', name: 'Enscape 3D' },
        { src: '/images/software/chaos-vray.jpg', name: 'Chaos V-Ray' },
        { src: '/images/software/chaos-corona.jpg', name: 'Chaos Corona' },
      ],
    },
  },
}

const STORAGE_KEY = 'leniva_home_page_content_v1'

export function getStoredHomeContent(): HomeContentConfig {
  if (typeof window === 'undefined') return DEFAULT_HOME_CONTENT
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_HOME_CONTENT
    const parsed = JSON.parse(raw)
    const mergedHero = { ...DEFAULT_HOME_CONTENT.hero, ...parsed.hero }
    if (mergedHero.headlinePrefix?.includes('Your Authorized Partner')) {
      mergedHero.headlinePrefix = 'Your Trusted Partner in '
    }
    if (Array.isArray(mergedHero.slides)) {
      mergedHero.slides = mergedHero.slides.map((s: HeroSlideConfig) => {
        if (s.id === 4 && (!s.image || s.image.includes('hero-banner-4'))) {
          return { ...s, image: heroBanner4 }
        }
        return s
      })
    }
    // Deep merge to ensure all keys exist
    return {
      hero: mergedHero,
      companyIntro: { ...DEFAULT_HOME_CONTENT.companyIntro, ...parsed.companyIntro },
      printers: {
        ...DEFAULT_HOME_CONTENT.printers,
        ...parsed.printers,
        fdm: { ...DEFAULT_HOME_CONTENT.printers.fdm, ...parsed.printers?.fdm },
        dlp: { ...DEFAULT_HOME_CONTENT.printers.dlp, ...parsed.printers?.dlp },
        lcd: { ...DEFAULT_HOME_CONTENT.printers.lcd, ...parsed.printers?.lcd },
      },
      cadSoftware: {
        ...DEFAULT_HOME_CONTENT.cadSoftware,
        ...parsed.cadSoftware,
        ares: { ...DEFAULT_HOME_CONTENT.cadSoftware.ares, ...parsed.cadSoftware?.ares },
        sketchup: { ...DEFAULT_HOME_CONTENT.cadSoftware.sketchup, ...parsed.cadSoftware?.sketchup },
        chaos: { ...DEFAULT_HOME_CONTENT.cadSoftware.chaos, ...parsed.cadSoftware?.chaos },
      },
    }
  } catch (e) {
    console.warn('Failed to parse stored home content, using default', e)
    return DEFAULT_HOME_CONTENT
  }
}

export function saveStoredHomeContent(content: HomeContentConfig): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    window.dispatchEvent(new Event('leniva_home_content_updated'))
  } catch (e) {
    console.error('Failed to save home content to localStorage', e)
  }
}

export function resetStoredHomeContent(): HomeContentConfig {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY)
      window.dispatchEvent(new Event('leniva_home_content_updated'))
    } catch (e) {}
  }
  return DEFAULT_HOME_CONTENT
}
