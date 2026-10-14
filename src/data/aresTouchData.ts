// ============================================================================
// ARES TOUCH PRODUCT DATA & CONTENT REPOSITORY
// Verified Official Reference: https://www.graebert.com/cad-software/ares-touch/
// Ecosystem: ARES Trinity (Commander Desktop + Kudo Cloud + Touch Mobile)
// ============================================================================

export interface AresTouchBenefit {
  id: string
  number: string
  title: string
  description: string
  iconName: string
  highlight?: string
}

export interface AresTouchPrecisionTool {
  id: string
  name: string
  shortDesc: string
  description: string
  badge: string
  icon: string
  visualDetail: string
}

export interface AresTouchAnnotationTool {
  id: string
  title: string
  subtitle: string
  description: string
  workflow: string[]
  icon: string
  badge: string
}

export interface AresTouchUseCase {
  number: string
  id: string
  title: string
  tagline: string
  description: string
  benefits: string[]
  role: string
  image: string
}

export interface AresTouchCloudService {
  id: string
  name: string
  type: 'Cloud Storage' | 'Enterprise Cloud' | 'Local & Offline'
  description: string
  isPopular?: boolean
}

export interface AresTouchPricingPlan {
  id: 'mobile-only' | 'professional' | 'trinity'
  name: string
  badge?: string
  isPopular?: boolean
  description: string
  includedApps: string[]
  priceEur: {
    monthly?: number
    annual?: number
    display: string
    subtext: string
  }
  priceUsd: {
    monthly?: number
    annual?: number
    display: string
    subtext: string
  }
  priceInr: {
    monthly?: number
    annual?: number
    display: string
    subtext: string
  }
  features: string[]
  notIncluded?: string[]
  ctaText: string
  ctaLink?: string
}

export interface AresTouchComparisonRow {
  feature: string
  category: 'Core DWG & Editing' | 'Annotation & Field Tools' | 'Collaboration & Cloud' | 'Ecosystem & Desktop' | 'Developer'
  mobileOnly: boolean | string
  professional: boolean | string
  trinity: boolean | string
}

export interface AresTouchFaq {
  q: string
  a: string
  category: 'general' | 'features' | 'cloud-offline' | 'trinity-kudo' | 'pricing-licensing' | 'developer-enterprise'
}

export const aresTouchData = {
  hero: {
    eyebrow: 'MOBILE CAD FOR DWG',
    title: 'ARES Touch',
    headline: 'Professional CAD. Anywhere you work.',
    subheadline: 'Mobile CAD for DWG on Android and iOS',
    description:
      'View, create, modify, measure, annotate and collaborate on native DWG drawings directly from your Android or iOS smartphone or tablet. Built on Graebert’s trusted CAD engine with touch-optimized precision tools and full ARES Trinity cloud synchronization.',
    quoteBadge: 'Professional DWG CAD in your pocket',
    platforms: ['Android', 'iOS', 'Smartphones', 'Tablets'],
    badges: ['DWG 2025 Native', 'Touch-Optimized', 'Voice & Photo Notes', 'FreeSketch', 'Offline Capable', 'ARES Trinity Sync'],
  },

  productMessage: {
    tag: 'CONNECTED MOBILITY',
    statement: 'Your drawings should move with you.',
    description:
      'ARES Touch brings professional DWG viewing, editing and annotation capabilities to smartphones and tablets, helping CAD professionals stay connected whether they are in the office, on site, or meeting clients.',
  },

  platforms: [
    {
      id: 'android',
      name: 'Android',
      subtitle: 'Smartphones & Tablets',
      description: 'Professional mobile DWG CAD optimized for Android smartphones and tablets running ARM processors.',
      requirements: 'Android 4.2 or higher, 2GB RAM minimum (ARM processor)',
      ctaText: 'Get it on Google Play',
      storeUrl: 'https://play.google.com/store/apps/details?id=com.graebert.ares.touch',
      badge: 'Google Play',
    },
    {
      id: 'ios',
      name: 'iOS & iPadOS',
      subtitle: 'iPhone & iPad',
      description: 'Native mobile DWG CAD engineered for iPhone and iPad, delivering fluid Apple Pencil drawing and Retina display accuracy.',
      requirements: 'iOS 9.0 or higher / iPadOS',
      ctaText: 'Download on App Store',
      storeUrl: 'https://apps.apple.com/app/ares-touch/id1044673891',
      badge: 'Apple App Store',
    },
  ],

  whatIs: {
    heading: 'What is ARES Touch?',
    description:
      'ARES Touch is a full-featured mobile CAD solution for DWG drawings. It allows users to view, create, modify, measure, annotate, and collaborate on drawings directly from mobile devices without sacrificing the precision expected from desktop CAD.',
    highlights: [
      'Native DWG viewing & editing',
      'Full 2D drafting toolset',
      'Annotation & markup suite',
      'Dimensioning & entity measuring',
      'Cloud synchronization & local storage',
      'Reliable offline workflows',
      'Interactive Picture Notes via camera',
      'Audio Voice Notes embedded in DWG',
      'FreeSketch finger redlining',
      'Collaborate via ARES Kudo cloud',
    ],
  },

  coreBenefits: [
    {
      id: 'view',
      number: '01',
      title: 'VIEW DWG FILES',
      description: 'Open, inspect, and pan/zoom DWG drawings of any size directly on your smartphone or tablet with full layer and layout control.',
      iconName: 'Eye',
      highlight: 'Full layout & model space',
    },
    {
      id: 'edit',
      number: '02',
      title: 'EDIT DWG DRAWINGS',
      description: 'Create and modify 2D DWG geometry using familiar professional CAD commands adapted for touch screens.',
      iconName: 'Edit3',
      highlight: 'Native DWG commands',
    },
    {
      id: 'measure',
      number: '03',
      title: 'MEASURE & DIMENSION',
      description: 'Inspect exact distances, angles, radii, and areas on-site with precision entity snapping and loupe magnification.',
      iconName: 'Ruler',
      highlight: 'Magnified precision loupe',
    },
    {
      id: 'annotate',
      number: '04',
      title: 'ANNOTATE ANYWHERE',
      description: 'Add dimensions, text notes, geo-tagged photos, spoken audio notes, and freehand finger sketches directly inside drawings.',
      iconName: 'MessageSquarePlus',
      highlight: 'Voice & picture notes',
    },
    {
      id: 'collaborate',
      number: '05',
      title: 'COLLABORATE IN REAL TIME',
      description: 'Share drawing feedback with design teams through comments and markups synced seamlessly via ARES Kudo cloud storage.',
      iconName: 'Users',
      highlight: 'ARES Trinity sync',
    },
    {
      id: 'offline',
      number: '06',
      title: 'WORK 100% OFFLINE',
      description: 'Take drawings offline before entering basements, remote jobsites, or flights. Changes sync automatically when reconnected.',
      iconName: 'WifiOff',
      highlight: 'Local storage & cache',
    },
  ] as AresTouchBenefit[],

  designedForTouch: {
    heading: 'CAD redesigned for touch',
    description:
      'ARES Touch provides a CAD interface optimized for smartphones and tablets while keeping workflows familiar to seasoned CAD users. Every tool has been ergonomically positioned for thumb and stylus precision.',
    features: [
      'Touch-optimized radial and ribbon toolbars',
      'Direct CAD command line access when keyboard is attached',
      'Intuitive finger gestures (pinch-to-zoom, two-finger pan, tap-to-select)',
      'Smart drawing manipulation with tactile grips',
      'Contextual precision menus minimizing screen clutter',
      'Full stylus & Apple Pencil pressure responsiveness',
    ],
    gestures: [
      { gesture: 'One-Finger Tap', action: 'Select entities, pick points, place blocks' },
      { gesture: 'Two-Finger Drag', action: 'Smooth real-time pan across complex layouts' },
      { gesture: 'Pinch & Spread', action: 'Sub-millimeter zoom with continuous rasterization' },
      { gesture: 'Long Press', action: 'Trigger precision loupe magnifier & context menu' },
      { gesture: 'FreeSketch Swipe', action: 'Redline and draw notes like pen on paper' },
    ],
  },

  precisionDrawing: {
    heading: 'Draw with precision on mobile',
    description:
      'Working on a touchscreen should never compromise drafting accuracy. ARES Touch equips you with specialized mobile precision tools designed to eliminate fingertip occlusion.',
    tools: [
      {
        id: 'loupe',
        name: 'PRECISION LOUPE',
        shortDesc: 'Magnified inspection cursor',
        description: 'Presents an enlarged circular magnifier right above your fingertip so your finger never blocks the exact snap point or intersection.',
        badge: 'Touch Exclusive',
        icon: 'Search',
        visualDetail: 'Magnifies geometry 3x with crosshair alignment',
      },
      {
        id: 'esnap',
        name: 'ENTITY SNAP (E-SNAP)',
        shortDesc: 'Endpoint, midpoint, center & intersection',
        description: 'Snaps automatically to endpoints, midpoints, center points, perpendiculars, tangents, and intersections with haptic feedback.',
        badge: 'CAD Standard',
        icon: 'Magnet',
        visualDetail: 'Green snap markers with magnetic pull',
      },
      {
        id: 'tracking',
        name: 'POLAR TRACKING & EXTENSION',
        shortDesc: 'Angle alignment guides',
        description: 'Locks along customizable polar angles (30°, 45°, 90°) with visual dashed alignment rays projected across the mobile canvas.',
        badge: 'Guidance',
        icon: 'Compass',
        visualDetail: 'Dashed green guidelines with live degree readout',
      },
      {
        id: 'coords',
        name: 'COORDINATE INPUT',
        shortDesc: 'Absolute, relative & polar coordinates',
        description: 'Type exact numeric coordinates (X, Y) and lengths directly using the optimized numeric keypad for millimeter-perfect dimensions.',
        badge: 'Absolute Accuracy',
        icon: 'Hash',
        visualDetail: 'Numeric HUD for lengths, angles, and offsets',
      },
    ] as AresTouchPrecisionTool[],
  },

  draftingTools: {
    heading: 'Professional 2D drafting in your pocket',
    description: 'ARES Touch includes a comprehensive set of 2D drafting and modification tools for creating and editing native DWG geometry on the go.',
    categories: [
      {
        name: 'DRAW',
        icon: 'PenTool',
        tools: ['Line', 'Polyline', 'Circle', 'Arc', 'Rectangle', 'Spline', 'Polygon', 'Ellipse', 'Hatch'],
      },
      {
        name: 'MODIFY & EDIT',
        icon: 'Move',
        tools: ['Move', 'Copy', 'Rotate', 'Scale', 'Trim', 'Extend', 'Fillet', 'Chamfer', 'Offset', 'Mirror', 'Explode'],
      },
      {
        name: 'ANNOTATE',
        icon: 'Type',
        tools: ['Multi-line Text', 'Single-line Text', 'Leaders', 'Picture Notes', 'Voice Notes', 'FreeSketch', 'Stamps'],
      },
      {
        name: 'DIMENSION',
        icon: 'Ruler',
        tools: ['Linear', 'Aligned', 'Angular', 'Radius', 'Diameter', 'Arc Length', 'Baseline', 'Continue'],
      },
      {
        name: 'MEASURE',
        icon: 'SlidersHorizontal',
        tools: ['Distance', 'Area', 'Perimeter', 'Angle', 'Radius', 'Coordinate Inspection'],
      },
      {
        name: 'LAYERS & BLOCKS',
        icon: 'Layers',
        tools: ['Layer Manager', 'Freeze / Thaw', 'Lock / Unlock', 'Color & Linetype', 'Block Insert', 'Block Reference'],
      },
    ],
  },

  annotations: [
    {
      id: 'picture-notes',
      title: 'PICTURE NOTES',
      subtitle: 'Attach site photos directly into DWG drawings',
      description:
        'Capture a photo using your mobile device camera and attach it to an exact location in the drawing. A clickable camera marker appears on the drawing, allowing desktop and cloud collaborators to view the site condition.',
      workflow: ['Tap Camera Icon', 'Take Jobsite Photo', 'Tap Target Location', 'Attached to DWG'],
      icon: 'Camera',
      badge: 'Visual Feedback',
    },
    {
      id: 'voice-notes',
      title: 'VOICE NOTES',
      subtitle: 'Record verbal audio notes directly on-site',
      description:
        'Instead of typing long descriptions on a virtual keyboard in the field, record a voice memo and anchor it to the relevant drawing element. Collaborators in ARES Commander or ARES Kudo can click and listen instantly.',
      workflow: ['Press Record', 'Speak Field Observations', 'Pin to Geometry', 'Team Plays Audio in Cloud/Desktop'],
      icon: 'Mic',
      badge: 'Hands-Free',
    },
    {
      id: 'freesketch',
      title: 'FREESKETCH',
      subtitle: 'Mark up drawings like pen on paper',
      description:
        'Use your finger or stylus to redline, write notes, or sketch directly over the drawing. FreeSketch makes visual communication instant, even for team members without formal CAD drafting onboarding.',
      workflow: ['Select FreeSketch', 'Choose Pen Color & Thickness', 'Draw Redlines with Finger', 'Save Markup Layer'],
      icon: 'Feather',
      badge: 'Natural Touch',
    },
    {
      id: 'dimensions',
      title: 'DIMENSIONS & MEASUREMENTS',
      subtitle: 'Verify distances and annotate discrepancies',
      description:
        'Verify as-built conditions against design drawings. Place aligned dimensions, measure clearances, and check angular deviations directly on site.',
      workflow: ['Select Dimension Tool', 'Snap to Elements via Loupe', 'Position Dimension Line', 'Saved to DWG'],
      icon: 'Ruler',
      badge: 'Metrology',
    },
  ] as AresTouchAnnotationTool[],

  cloudAndLocal: {
    heading: 'Work from the cloud or locally',
    description:
      'ARES Touch adapts to your security and connectivity requirements. Synchronize seamlessly with all major cloud providers, or store sensitive drawings strictly on local device storage.',
    panels: [
      {
        id: 'cloud',
        title: 'CLOUD SYNCHRONIZATION',
        subtitle: 'Continuous Sync with ARES Trinity',
        badge: 'Connected',
        description:
          'Connect ARES Touch with your preferred cloud storage to access drawings instantly on mobile. When modified, files update automatically across ARES Kudo (cloud browser) and ARES Commander (desktop).',
        services: ['Google Drive', 'OneDrive / OneDrive for Business', 'Dropbox', 'Box', 'Apple iCloud Drive'],
        benefits: [
          'Automatic cloud revision tracking',
          'Instant access to drawings from anywhere',
          'Seamless transition to desktop & browser',
          'Collaborate across distributed field crews',
        ],
      },
      {
        id: 'local',
        title: 'LOCAL & OFFLINE STORAGE',
        subtitle: 'Complete data privacy & zero-internet resilience',
        badge: 'Secure & Offline',
        description:
          'Save drawings directly to internal device storage or SD card. Ideal for defense projects, confidential corporate facilities, or remote areas without network infrastructure.',
        services: ['Device Internal Storage', 'MicroSD Card', 'Email DWG Attachments', 'USB Transfer'],
        benefits: [
          'Full compliance with strict corporate NDA policies',
          'No dependency on internet connectivity',
          'Fast local file opening speeds',
          'Manual cloud export when authorized',
        ],
      },
    ],
  },

  offlineWorkflow: {
    heading: 'Keep working when you are offline',
    description: 'ARES Touch ensures zero downtime. Download your drawings while online, perform all edits in the field, and sync changes once reconnected.',
    steps: [
      { step: '01', title: 'ONLINE', desc: 'Browse cloud folders and mark project drawings for offline availability.' },
      { step: '02', title: 'DOWNLOAD', desc: 'Files and external references (XREFs) cache securely to local mobile storage.' },
      { step: '03', title: 'WORK LOCALLY', desc: 'Draft, measure, add photos, record voice notes, and redline without internet.' },
      { step: '04', title: 'MAKE CHANGES', desc: 'All edits and markup entities are saved directly into the local DWG file.' },
      { step: '05', title: 'RECONNECT', desc: 'When entering Wi-Fi or cellular coverage, ARES Touch detects connectivity.' },
      { step: '06', title: 'SYNCHRONIZE', desc: 'Updated drawings and annotations synchronize back to ARES Kudo and Commander.' },
    ],
  },

  aresKudoIntegration: {
    heading: 'Connected with ARES Kudo',
    subheading: 'Cloud CAD that follows you to mobile',
    description:
      'ARES Touch is designed as the mobile companion to ARES Kudo. Any drawing accessible inside ARES Kudo in your desktop web browser is instantly available in ARES Touch on your smartphone and tablet.',
    steps: [
      { step: 1, title: 'Store in Cloud', text: 'Drawing stored in Google Drive, OneDrive, Dropbox, or Box connected to ARES Kudo.' },
      { step: 2, title: 'Open in Kudo', text: 'Architect reviews and marks up drawing from any browser without installing software.' },
      { step: 3, title: 'Open in Touch', text: 'Field engineer accesses the exact same drawing in ARES Touch on phone or tablet.' },
      { step: 4, title: 'On-Site Edits', text: 'Inspect site, capture photos, record voice notes, and revise dimensions on mobile.' },
      { step: 5, title: 'Sync to Trinity', text: 'Changes push through cloud storage; design office sees updates immediately.' },
      { step: 6, title: 'Complete in Commander', text: 'Senior draftsman continues heavy production drafting in ARES Commander.' },
    ],
  },

  aresTrinity: {
    heading: 'One CAD ecosystem. Three ways to work.',
    subheading: 'ARES TRINITY: Desktop + Cloud + Mobile',
    description:
      'Graebert’s ARES Trinity unites desktop drafting, browser cloud CAD, and mobile CAD into a single, cohesive workflow. Create on desktop, share via browser, and verify on mobile.',
    cards: [
      {
        id: 'commander',
        name: 'ARES Commander',
        role: 'DESKTOP CAD',
        badge: 'Windows · macOS · Linux',
        description: 'Heavyweight professional 2D/3D DWG drafting software with advanced productivity tools, BIM features, and full customization.',
        highlight: 'Production Drafting & BIM',
        link: '/products/ares-commander',
        color: '#00558f',
      },
      {
        id: 'kudo',
        name: 'ARES Kudo',
        role: 'CLOUD CAD',
        badge: 'Any Modern Browser',
        description: 'Full DWG CAD running inside Google Chrome, Edge, Safari, or Firefox with live collaboration, view-only links, and zero installation.',
        highlight: 'Browser CAD & Sharing',
        link: '/cad-software/ares-kudo',
        color: '#0084c7',
      },
      {
        id: 'touch',
        name: 'ARES Touch',
        role: 'MOBILE CAD',
        badge: 'Android & iOS',
        description: 'Mobile CAD for DWG viewing, editing, voice notes, photo integration, and on-site field surveys on smartphones and tablets.',
        highlight: 'Field Work & Mobility',
        link: '/cad-software/ares-touch',
        color: '#0284c7',
        isCurrent: true,
      },
    ],
  },

  topUseCases: [
    {
      number: '01',
      id: 'surveys',
      title: 'Technical Surveys',
      tagline: 'Gather accurate as-built data on site',
      description: 'Survey existing buildings and terrain. Measure distances and angles on site, record voice observations, and sketch modifications directly into the DWG file.',
      benefits: ['Eliminate paper clipboard errors', 'Snap directly to survey points', 'Capture photo notes of utility lines', 'Instant export to CAD office'],
      role: 'Surveyors & Civil Engineers',
      image: '/images/software/sections/aec-construction.jpg',
    },
    {
      number: '02',
      id: 'inspections',
      title: 'On-Site Inspections & Maintenance',
      tagline: 'Document building conditions with photos & audio',
      description: 'Inspect construction progress against approved architectural drawings. Anchor photos of discrepancies directly onto floor plans with audio instructions.',
      benefits: ['Geolocated picture notes', 'Voice memos for snagging lists', 'FreeSketch redline highlights', 'Share inspection reports via link'],
      role: 'Site Engineers & QA/QC Managers',
      image: '/images/software/sections/scan-verify.jpg',
    },
    {
      number: '03',
      id: 'execution',
      title: 'Project Execution in the Field',
      tagline: 'Always carry the latest approved revision',
      description: 'Ensure field superintendents and subcontractors are working off the latest revision. Prevent expensive rework caused by outdated printed drawings.',
      benefits: ['Instant cloud revision updates', 'Dimension checks in real time', 'Layer filtering for trade coordination', 'Works in offline mode'],
      role: 'Construction Managers & Contractors',
      image: '/images/software/sections/revit-integration.jpg',
    },
    {
      number: '04',
      id: 'customer-meetings',
      title: 'Customer & Client Meetings',
      tagline: 'Discuss projects interactively on tablet or projector',
      description: 'Present architectural drawings on an iPad or Android tablet. Connect to external monitors or projectors, make requested live revisions, and send updated files on the spot.',
      benefits: ['External monitor/projector output', 'Touch markup during presentations', 'Instant client revision validation', 'Professional mobile showcase'],
      role: 'Architects & Project Directors',
      image: '/images/software/sections/ares-std-organize.jpg',
    },
    {
      number: '05',
      id: 'facility-management',
      title: 'Facility Management & Operations',
      tagline: 'Access asset layouts while walking facilities',
      description: 'Inspect HVAC equipment, electrical panels, and plumbing valves while walking the facility. Update asset locations and maintenance notes inside DWG layouts.',
      benefits: ['Search equipment blocks instantly', 'Update maintenance status markers', 'Attach equipment photos & barcodes', 'Synchronize with central FM database'],
      role: 'Facility Managers & Plant Operators',
      image: '/images/software/sections/ares-mech-assembly.jpg',
    },
  ] as AresTouchUseCase[],

  devicesComparison: {
    smartphone: {
      title: 'CAD in your pocket',
      device: 'Smartphone (Android / iPhone)',
      headline: 'Quick review, instant annotations, and on-the-go communications',
      points: [
        'Open DWG received via email or WhatsApp in seconds',
        'Verify dimensions when standing on scaffolding or in tight spaces',
        'Snap a site photo and anchor it to the drawing',
        'Record a quick voice note describing a construction clash',
        'Always with you — no laptop bag or extra hardware required',
      ],
    },
    tablet: {
      title: 'A larger canvas for serious mobile CAD',
      device: 'Tablet (iPad / Android Tablet)',
      headline: 'Full 2D drafting, presentation mode, and stylus precision',
      points: [
        'High-resolution multi-touch canvas with Apple Pencil & stylus support',
        'Create complete 2D drawings from scratch in the field',
        'Present drawings to clients and project stakeholders in meetings',
        'Connect to external monitors and conference room projectors',
        'Split-screen multitasking with specifications and camera',
      ],
    },
  },

  developer: {
    heading: 'Build mobile CAD applications with ARES Touch',
    subheading: 'Mobile CAD as an enterprise development platform',
    description:
      'ARES Touch is not just a consumer app — it is a robust mobile CAD platform. Developers can build custom vertical applications, automation scripts, and digitized workflows using native CAD APIs.',
    languages: [
      {
        lang: 'LISP',
        title: 'AutoLISP & Visual LISP Support',
        desc: 'Reuse existing desktop LISP routines directly on Android and iOS devices to automate mobile drafting tasks.',
      },
      {
        lang: 'C++',
        title: 'High-Performance C++ API',
        desc: 'Compile native C++ plugins for maximum calculation speed and deep integration with mobile sensors.',
      },
      {
        lang: 'DCL',
        title: 'Dialog Control Language (DCL)',
        desc: 'Render familiar custom dialog boxes and input forms across desktop, cloud, and mobile seamlessly.',
      },
    ],
    architecture: 'Write once, deploy across ARES Commander (Desktop), ARES Touch (Mobile), and ARES Kudo (Cloud).',
  },

  enterprise: {
    heading: 'Deploy mobile CAD across your organization',
    subheading: 'Enterprise security, MDM compatibility, and single sign-on',
    customer: {
      name: 'Taisei Corporation',
      stats: '8,000+ employees across 14 countries',
      highlight:
        'Taisei Corporation, one of Japan’s leading construction giants, deployed ARES Touch and ARES Kudo across thousands of mobile devices to eliminate paper blueprints on major construction projects.',
      technologies: ['Mobile Device Management (MDM)', 'Single Sign-On (SSO)', 'OneDrive for Business Integration'],
      quote:
        'ARES Touch enabled our engineers to access up-to-date drawings on site, record photo notes, and coordinate seamlessly with the design office via OneDrive for Business.',
    },
  },

  freeMode: {
    heading: 'Free Mode & Subscription Activation',
    description:
      'Anyone can download ARES Touch for free from Google Play or the Apple App Store. Free Mode provides unlimited DWG viewing, sharing, and measuring with no expiration date.',
    freeIncludes: ['DWG & DXF Viewing (All versions)', 'Pan, Zoom & Layer Management', 'Distance & Area Measuring', 'Sharing view-only links', 'No time limits or file size restrictions'],
    premiumRequires: ['Creating & Editing 2D Geometry', 'Modifying & Moving Entities', 'Picture Notes & Voice Notes', 'FreeSketch Markups', 'LISP / C++ API Customization', 'Cloud Sync with Trinity'],
  },

  pricing: {
    heading: 'Flexible plans for mobile and full CAD workflows',
    subheading: 'Choose standalone mobile licensing or full ARES Trinity desktop + cloud + mobile bundle.',
    plans: [
      {
        id: 'mobile-only',
        name: 'Mobile-Only Plan',
        badge: 'Standalone Mobile',
        description: 'For field supervisors and inspectors who exclusively need DWG editing on smartphones and tablets.',
        includedApps: ['ARES Touch (Android & iOS)'],
        priceEur: {
          monthly: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceUsd: {
          monthly: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceInr: {
          monthly: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. GST)',
        },
        features: [
          'Full DWG viewing & sharing on mobile',
          'Complete 2D drafting & editing tools',
          'Measuring, dimensioning & entity snapping',
          'Local file storage on device',
          'Unlimited file sizes',
          'No watermarks on exported files',
        ],
        notIncluded: [
          'ARES Kudo (Browser Cloud CAD)',
          'ARES Commander (Desktop CAD)',
          'Commenting & markup live sync',
          'Share view-only links with expiration',
        ],
        ctaText: 'Request Quote',
      },
      {
        id: 'professional',
        name: 'Professional Plan',
        badge: 'Cloud + Mobile',
        description: 'Create and modify DWG files on mobile devices and directly from any web browser without installation.',
        includedApps: ['ARES Touch (Mobile)', 'ARES Kudo (Cloud Browser)'],
        priceEur: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceUsd: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceInr: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. GST)',
        },
        features: [
          'All ARES Touch mobile features',
          'ARES Kudo full cloud CAD in browser',
          'Picture Notes & Voice Notes',
          'FreeSketch finger annotations',
          'Cloud synchronization across devices',
          'Share view-only links with password & expiry',
          'Real-time comment & markup notifications',
        ],
        notIncluded: ['ARES Commander (Desktop CAD)'],
        ctaText: 'Request Quote',
      },
      {
        id: 'trinity',
        name: 'ARES Trinity Plan',
        badge: 'BEST VALUE · ALL-IN-ONE',
        isPopular: true,
        description: 'The complete Graebert CAD suite: Desktop + Cloud + Mobile for seamless professional drafting.',
        includedApps: ['ARES Commander (Desktop)', 'ARES Kudo (Cloud)', 'ARES Touch (Mobile)'],
        priceEur: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceUsd: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. tax)',
        },
        priceInr: {
          annual: 0,
          display: 'Quote on Request',
          subtext: 'per user (excl. GST)',
        },
        features: [
          'ARES Commander: Desktop CAD (Windows/macOS/Linux)',
          'ARES Kudo: Cloud CAD in any web browser',
          'ARES Touch: Mobile CAD for Android & iOS',
          'BIM drawing extraction & automation',
          'Full Trinity cloud sync & collaboration',
          'LISP, C++, DCL API across all platforms',
          'View-only links with security & watermarks',
          'Email notifications on drawing updates',
        ],
        ctaText: 'Explore ARES Trinity',
      },
    ] as AresTouchPricingPlan[],
  },

  comparisonTable: [
    { feature: 'DWG Viewing & Sharing', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Full 2D Geometry Creation', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Modify, Trim, Extend, Fillet', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Measuring & Entity Snap', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Precision Loupe Magnifier', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Local Device File Storage', category: 'Core DWG & Editing', mobileOnly: true, professional: true, trinity: true },
    { feature: 'Picture Notes (Camera Integration)', category: 'Annotation & Field Tools', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Voice Audio Notes in DWG', category: 'Annotation & Field Tools', mobileOnly: false, professional: true, trinity: true },
    { feature: 'FreeSketch Finger Redlining', category: 'Annotation & Field Tools', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Custom Stamps & Watermarks', category: 'Annotation & Field Tools', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Cloud Sync (Google/OneDrive/Dropbox)', category: 'Collaboration & Cloud', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Share View-Only Links', category: 'Collaboration & Cloud', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Password & Expiry on Shares', category: 'Collaboration & Cloud', mobileOnly: false, professional: true, trinity: true },
    { feature: 'Email Update Notifications', category: 'Collaboration & Cloud', mobileOnly: false, professional: true, trinity: true },
    { feature: 'ARES Kudo (Browser Cloud CAD)', category: 'Ecosystem & Desktop', mobileOnly: false, professional: true, trinity: true },
    { feature: 'ARES Commander (Desktop CAD)', category: 'Ecosystem & Desktop', mobileOnly: false, professional: false, trinity: true },
    { feature: 'BIM Features & 3D Solid Modeling', category: 'Ecosystem & Desktop', mobileOnly: false, professional: false, trinity: true },
    { feature: 'LISP & C++ API Support', category: 'Developer', mobileOnly: false, professional: 'Basic', trinity: true },
  ] as AresTouchComparisonRow[],

  systemRequirements: {
    heading: 'System requirements',
    notice: 'Check current system requirements on official app stores prior to deployment.',
    android: {
      os: 'Android 4.2 or higher',
      ram: '2GB RAM minimum (4GB or more recommended for large DWGs)',
      processor: 'ARM-based processor (Intel x86/Atom processors not supported on Android)',
      storage: '500MB free storage for app + workspace for drawing cache',
    },
    ios: {
      os: 'iOS 9.0 or higher / iPadOS',
      devices: 'iPhone, iPad, iPad Pro, iPad Air, iPad mini',
      stylus: 'Full support for Apple Pencil (1st & 2nd gen / USB-C)',
      storage: '500MB free storage + project cache',
    },
  },

  workspaceSelector: [
    {
      place: 'AT THE OFFICE DESK',
      recommended: 'ARES Commander',
      desc: 'Heavyweight production drafting, complex 3D solid modeling, and BIM extraction on multi-monitor workstations.',
      link: '/products/ares-commander',
      badge: 'Desktop CAD',
    },
    {
      place: 'IN A WEB BROWSER',
      recommended: 'ARES Kudo',
      desc: 'Instant drawing access on any computer or Chromebook without installing software. Great for design reviews.',
      link: '/cad-software/ares-kudo',
      badge: 'Cloud CAD',
    },
    {
      place: 'ON SITE & IN THE FIELD',
      recommended: 'ARES Touch',
      desc: 'Smartphones and tablets for technical surveys, site inspections, photo notes, audio memos, and touch redlining.',
      link: '/cad-software/ares-touch',
      badge: 'Mobile CAD',
    },
    {
      place: 'EVERYWHERE (HYBRID)',
      recommended: 'ARES Trinity',
      desc: 'Connect Commander + Kudo + Touch into a single continuous CAD workflow across desktop, cloud, and mobile.',
      link: '/cad-software/ares-kudo',
      badge: 'All-Inclusive Ecosystem',
    },
  ],

  faqs: [
    {
      q: 'What is ARES Touch?',
      a: 'ARES Touch is a professional mobile CAD solution developed by Graebert. It enables architects, engineers, and construction professionals to view, create, edit, measure, annotate, and collaborate on native DWG drawings directly from Android and iOS smartphones and tablets.',
      category: 'general',
    },
    {
      q: 'What devices support ARES Touch?',
      a: 'ARES Touch runs on Android smartphones and tablets (Android 4.2+ with ARM processor) and Apple iOS devices including iPhone and iPad (iOS 9.0+ / iPadOS). It is optimized for both compact smartphone screens and large iPad Pro / Android tablet displays with stylus support.',
      category: 'general',
    },
    {
      q: 'Can I edit DWG files on my phone, or is it just a viewer?',
      a: 'ARES Touch is a full mobile CAD drafting tool, not just a viewer. You can create lines, polylines, circles, arcs, text, dimensions, and blocks, as well as modify existing geometry with Move, Copy, Rotate, Scale, Trim, Extend, and Fillet commands.',
      category: 'features',
    },
    {
      q: 'Can I work offline without an active internet connection?',
      a: 'Yes. You can take drawings offline by downloading them to your device storage before heading to a jobsite. You can view, draft, measure, add photos, and record voice notes completely offline. Edits sync automatically once your device reconnects to Wi-Fi or cellular data.',
      category: 'cloud-offline',
    },
    {
      q: 'Which cloud storage services are supported?',
      a: 'ARES Touch connects with major cloud storage services including Google Drive, Microsoft OneDrive, OneDrive for Business, Dropbox, Box, and Apple iCloud Drive. Drawings stored in these services synchronize seamlessly across ARES Touch, ARES Kudo, and ARES Commander.',
      category: 'cloud-offline',
    },
    {
      q: 'Can I save and keep files purely on local device storage?',
      a: 'Yes. If your company policy prohibits third-party cloud storage or requires strict confidentiality under an NDA, you can store and edit DWG files directly on your device’s internal memory or MicroSD card without uploading them to the cloud.',
      category: 'cloud-offline',
    },
    {
      q: 'What are Picture Notes and how do they work?',
      a: 'Picture Notes allow you to take a photo using your smartphone or tablet camera and anchor it to a specific point in the DWG drawing. The photo is saved as an interactive marker that collaborators can click on in ARES Touch, ARES Kudo, or ARES Commander to see the real site condition.',
      category: 'features',
    },
    {
      q: 'What are Voice Notes in ARES Touch?',
      a: 'Voice Notes allow you to record spoken audio memos directly inside the drawing. This saves field workers from typing lengthy descriptions on a virtual keyboard. Anyone opening the drawing in ARES Touch, Kudo, or Commander can click the audio icon and listen to your instructions.',
      category: 'features',
    },
    {
      q: 'What is FreeSketch?',
      a: 'FreeSketch is a natural redlining tool that allows you to draw freehand sketches, highlight problem areas, or write notes directly over your drawing using your finger or stylus, exactly like marking a paper blueprint with a red pen.',
      category: 'features',
    },
    {
      q: 'Does ARES Touch work together with ARES Kudo and ARES Commander?',
      a: 'Yes, this is the core concept of ARES Trinity. ARES Commander is your desktop workstation CAD, ARES Kudo is your browser cloud CAD, and ARES Touch is your mobile field CAD. All three access the same DWG files through synchronized cloud storage so your work flows uninterrupted between office and field.',
      category: 'trinity-kudo',
    },
    {
      q: 'What is ARES Trinity?',
      a: 'ARES Trinity is Graebert’s comprehensive CAD ecosystem combining Desktop (ARES Commander), Cloud (ARES Kudo), and Mobile (ARES Touch). A single Trinity subscription gives you access to all three solutions, enabling smooth collaboration between office and site personnel.',
      category: 'trinity-kudo',
    },
    {
      q: 'Is there a Free Mode available for ARES Touch?',
      a: 'Yes. When you download ARES Touch from Google Play or the Apple App Store, you can use Free Mode without paying. Free Mode allows unlimited DWG viewing, sharing, and measuring with no time limits or file size restrictions. Creating, editing, and advanced annotation require an active subscription.',
      category: 'pricing-licensing',
    },
    {
      q: 'What is included in the Mobile-Only plan?',
      a: 'The Mobile-Only plan unlocks full 2D drafting and editing capabilities on mobile devices (smartphones and tablets) without watermarks or tool limits. It is designed for users who only need mobile CAD without desktop software.',
      category: 'pricing-licensing',
    },
    {
      q: 'What is included in the ARES Trinity plan?',
      a: 'The ARES Trinity plan is the all-inclusive bundle. It includes ARES Commander for desktop (Windows, macOS, Linux), ARES Kudo for browser cloud CAD, and ARES Touch for Android and iOS mobile devices, plus full Trinity synchronization and LISP/C++ APIs.',
      category: 'pricing-licensing',
    },
    {
      q: 'Can developers build custom mobile applications with ARES Touch?',
      a: 'Yes. ARES Touch features an API supporting LISP, C++, and DCL (Dialog Control Language). Developers can migrate existing desktop CAD routines and develop specialized vertical applications for mobile workflows.',
      category: 'developer-enterprise',
    },
    {
      q: 'How does enterprise security and MDM work with ARES Touch?',
      a: 'ARES Touch supports enterprise Mobile Device Management (MDM) deployment, Single Sign-On (SSO) authentication, and integration with Microsoft OneDrive for Business. Major enterprises like Taisei Corporation have successfully deployed it across thousands of devices.',
      category: 'developer-enterprise',
    },
    {
      q: 'What is the difference between ARES Touch and ARES Kudo?',
      a: 'ARES Kudo runs in web browsers on computers and Chromebooks, focusing on cloud CAD editing, real-time sharing, and view-only client links. ARES Touch is an installed mobile app for Android and iOS devices, featuring touch-optimized tools, camera/voice notes, and complete offline functionality.',
      category: 'trinity-kudo',
    },
    {
      q: 'How do I purchase ARES Touch through Leniva CAD Solutions in India?',
      a: 'Leniva CAD Solutions is an authorized Graebert partner in India. We provide official licensing in Indian Rupees (INR) with GST invoices, volume team licensing, academic discounts, and dedicated technical onboarding and support across India.',
      category: 'pricing-licensing',
    },
  ] as AresTouchFaq[],
}
