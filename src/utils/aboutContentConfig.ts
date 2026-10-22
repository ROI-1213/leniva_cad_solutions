export interface PortfolioCardConfig {
  category: string
  title: string
  description: string
  linkText: string
  linkUrl: string
}

export interface HowWeWorkStepConfig {
  title: string
  description: string
}

export interface AboutContentConfig {
  hero: {
    badge: string
    title: string
    description: string
    mottoPrefix: string
    mottoHighlight: string
    primaryBtnText: string
    quoteSubject: string
    secondaryBtnText: string
    secondaryBtnLink: string
  }
  heritage: {
    tag: string
    title: string
    paragraph1: string
    calloutText: string
    paragraph2: string
    paragraph3: string
    posterImage: string
    posterAlt: string
    stat1Title: string
    stat1Subtitle: string
    stat2Title: string
    stat2Subtitle: string
  }
  portfolio: {
    tag: string
    title: string
    subtitle: string
    cadCard: PortfolioCardConfig
    printerCard: PortfolioCardConfig
    scannerCard: PortfolioCardConfig
  }
  howWeWork: {
    tag: string
    title: string
    description: string
    steps: HowWeWorkStepConfig[]
  }
}

export const DEFAULT_ABOUT_CONTENT: AboutContentConfig = {
  hero: {
    badge: 'About Us • Established 1990 in Bengaluru',
    title: 'Trusted CAD & 3D Technology Partner Since 1990',
    description:
      'Leniva CAD Solutions (LCS), formerly known as Compute House, was established in 1990 in Bengaluru. With over three decades of experience, we have built a strong presence in the CAD, design, visualization, and digital technology space, supporting professionals and businesses with reliable technology solutions.',
    mottoPrefix: 'Leniva CAD Solutions — ',
    mottoHighlight: 'Trusted Technology. Practical Solutions.',
    primaryBtnText: 'Schedule Engineering Consultation',
    quoteSubject: 'Schedule Engineering Consultation',
    secondaryBtnText: 'Contact Our Offices',
    secondaryBtnLink: '/contact',
  },
  heritage: {
    tag: 'Three Decades of Experience',
    title: 'Empowering Design, Manufacturing & Innovation',
    paragraph1:
      'Leniva CAD Solutions (LCS), formerly known as Compute House, was established in 1990 in Bengaluru. With over three decades of experience, we have built a strong presence in the CAD, design, visualization, and digital technology space, supporting professionals and businesses with reliable technology solutions.',
    calloutText: 'Our portfolio includes leading Engineering CAD Software, 3D Printers & 3D Scanners.',
    paragraph2:
      "We focus on understanding each customer's requirements and recommending the right solution based on their application, workflow, performance requirements, and budget. Our team provides guidance across software, 3D printing, and 3D scanning—from product selection and deployment to ongoing technical support.",
    paragraph3:
      'With a strong foundation built over more than three decades, Leniva CAD Solutions continues to help architects, engineers, designers, manufacturers, and businesses adopt the right technology to improve productivity, streamline workflows, and bring ideas to life.',
    posterImage: '/images/about/about-leniva-poster.jpg',
    posterAlt: 'Leniva CAD Solutions — Trusted Technology. Practical Solutions.',
    stat1Title: 'Since 1990',
    stat1Subtitle: 'Over 3 decades of technology excellence',
    stat2Title: 'Bengaluru Office',
    stat2Subtitle: 'Supporting clients across India',
  },
  portfolio: {
    tag: 'Our Technology Portfolio',
    title: 'End-to-End Solutions for Professionals & Businesses',
    subtitle: 'Our portfolio includes leading Engineering CAD Software, 3D Printers & 3D Scanners.',
    cadCard: {
      category: 'Software Suite',
      title: 'Engineering CAD Software',
      description:
        'Official commercial licenses, cloud collaboration tools, and rendering solutions including Trimble SketchUp Pro, Graebert ARES Commander & Standard, Chaos V-Ray, Chaos Enscape, and Corona.',
      linkText: 'Explore CAD Softwares →',
      linkUrl: '/products/cad-software',
    },
    printerCard: {
      category: 'Additive Manufacturing',
      title: '3D Printers',
      description:
        'Industrial FDM printers (Pratham desktop, large format, and 1-meter giant systems) and high-precision DLP/LCD resin printers (EKA Series) for engineering prototypes and manufacturing.',
      linkText: 'Explore 3D Printers →',
      linkUrl: '/products',
    },
    scannerCard: {
      category: 'Metrology & Reverse Engineering',
      title: '3D Scanners',
      description:
        'High-precision handheld and stationary 3D scanning systems including EinScan and 3DeVOK series for non-contact metrology, quality inspection, and rapid reverse engineering.',
      linkText: 'Explore 3D Scanners →',
      linkUrl: '/products/3d-scanners',
    },
  },
  howWeWork: {
    tag: 'How We Work',
    title: 'Understanding Requirements, Delivering Practical Results',
    description:
      "We focus on understanding each customer's requirements and recommending the right solution based on their application, workflow, performance requirements, and budget. Our team provides guidance across software, 3D printing, and 3D scanning—from product selection and deployment to ongoing technical support.",
    steps: [
      {
        title: 'Application Assessment',
        description: 'Evaluation of your specific workflow, accuracy needs, materials, and budgetary parameters.',
      },
      {
        title: 'Product Selection',
        description: 'Objective recommendations tailored to your production, prototyping, or drafting requirements.',
      },
      {
        title: 'Seamless Deployment',
        description: 'Complete installation, licensing setup, hardware commissioning, and hands-on user training.',
      },
      {
        title: 'Ongoing Technical Support',
        description: 'Dedicated application engineers, local spare parts inventory, and responsive technical helplines.',
      },
    ],
  },
}

const STORAGE_KEY = 'leniva_about_page_content_v1'

export function getStoredAboutContent(): AboutContentConfig {
  if (typeof window === 'undefined') return DEFAULT_ABOUT_CONTENT
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_ABOUT_CONTENT
    const parsed = JSON.parse(raw)
    const mergedHeritage = { ...DEFAULT_ABOUT_CONTENT.heritage, ...parsed.heritage }
    if (mergedHeritage.stat2Title && /hq|headquarters/i.test(mergedHeritage.stat2Title)) {
      mergedHeritage.stat2Title = 'Bengaluru Office'
    }
    const mergedScannerCard = { ...DEFAULT_ABOUT_CONTENT.portfolio.scannerCard, ...parsed.portfolio?.scannerCard }
    mergedScannerCard.linkUrl = '/products/3d-scanners'
    const mergedPrinterCard = { ...DEFAULT_ABOUT_CONTENT.portfolio.printerCard, ...parsed.portfolio?.printerCard }
    if (!mergedPrinterCard.linkUrl || mergedPrinterCard.linkUrl === '/products/3d-scanners') {
      mergedPrinterCard.linkUrl = '/products'
    }
    return {
      hero: { ...DEFAULT_ABOUT_CONTENT.hero, ...parsed.hero, quoteSubject: 'Schedule Engineering Consultation' },
      heritage: mergedHeritage,
      portfolio: {
        ...DEFAULT_ABOUT_CONTENT.portfolio,
        ...parsed.portfolio,
        cadCard: { ...DEFAULT_ABOUT_CONTENT.portfolio.cadCard, ...parsed.portfolio?.cadCard },
        printerCard: mergedPrinterCard,
        scannerCard: mergedScannerCard,
      },
      howWeWork: {
        ...DEFAULT_ABOUT_CONTENT.howWeWork,
        ...parsed.howWeWork,
        steps: Array.isArray(parsed.howWeWork?.steps)
          ? parsed.howWeWork.steps
          : DEFAULT_ABOUT_CONTENT.howWeWork.steps,
      },
    }
  } catch (e) {
    console.warn('Failed to parse stored about content, using default', e)
    return DEFAULT_ABOUT_CONTENT
  }
}

export function saveStoredAboutContent(content: AboutContentConfig): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    window.dispatchEvent(new Event('leniva_about_content_updated'))
  } catch (e) {
    console.error('Failed to save about content to localStorage', e)
  }
}

export function resetStoredAboutContent(): AboutContentConfig {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY)
      window.dispatchEvent(new Event('leniva_about_content_updated'))
    } catch (e) {}
  }
  return DEFAULT_ABOUT_CONTENT
}
