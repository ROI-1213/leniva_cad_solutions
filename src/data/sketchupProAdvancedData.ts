// ──────────────────────────────────────────────────────────────────────────────
//  SketchUp Pro Advanced Workflows — Data Model
//  Source: https://sketchup.trimble.com/en/plans-and-pricing/sketchup-pro-advanced-workflows
// ──────────────────────────────────────────────────────────────────────────────

export interface AdvancedFeatureCard {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  bullets: string[]
  tag: string
  image: string
  imageAlt: string
  accent: string
}

export interface WorkflowStep {
  id: string
  step: string
  title: string
  description: string
  icon: string
  color: string
}

export interface ComparisonRow {
  feature: string
  category: 'Core Modeling' | 'Documentation' | 'Cloud & Collaboration' | 'Advanced Interoperability' | 'Ecosystem'
  pro: boolean | string
  proAdvanced: boolean | string
  studio: boolean | string
}

export interface SystemReq {
  category: string
  minimum: string
  recommended: string
  note?: string
}

export interface AdvancedFaq {
  q: string
  a: string
  category: 'general' | 'revit' | 'pointcloud' | 'licensing' | 'platforms' | 'technical'
}

export interface IndustryUseCase {
  id: string
  name: string
  tagline: string
  description: string
  workflows: string[]
  deliverables: string[]
}

// ──────────────────────────────────────────────────────────────────────────────

export const sketchupProAdvancedData = {

  hero: {
    eyebrow: 'PRO ADVANCED SUBSCRIPTION',
    title: 'SketchUp Pro Advanced Workflows',
    tagline: 'Professional 3D design for interoperable workflows',
    description:
      'Bring Revit files and point cloud data into SketchUp, work across multidisciplinary teams, iterate quickly, create professional documentation, and connect design information throughout the project lifecycle.',
    platformBadge: 'WINDOWS ONLY',
    platformNote: 'Available for Windows only. Scanning hardware not included.',
    annualPricePerMonthUsd: 49.92,
    annualBilledTotalUsd: 599,
    monthlyPriceUsd: 74.99,
    officialBrand: 'Trimble SketchUp',
    partnerBadge: 'Trimble Authorized Partner — Leniva CAD Solutions',
    ctas: {
      primary: 'Subscribe',
      secondary: 'Try SketchUp',
      tertiary: 'Compare Plans',
    },
  },

  valueStrip: [
    {
      id: 'revit-import',
      title: 'REVIT IMPORT',
      desc: 'Import and translate Revit files (.rvt / .rfa) directly into SketchUp.',
      icon: 'ArrowLeftRight',
    },
    {
      id: 'point-cloud',
      title: 'POINT CLOUD MODELING',
      desc: 'Bring scanned data into SketchUp and model accurately against existing conditions.',
      icon: 'Scan',
    },
    {
      id: '3d-modeling',
      title: 'PROFESSIONAL 3D MODELING',
      desc: 'Create and iterate detailed 3D concepts with intuitive push-pull geometry.',
      icon: 'Box',
    },
    {
      id: '2d-documentation',
      title: '2D DOCUMENTATION',
      desc: 'Transform 3D models into professional drawings and documentation with LayOut.',
      icon: 'FileText',
    },
    {
      id: 'cloud-collab',
      title: 'CLOUD COLLABORATION',
      desc: 'Share models, files, and projects through connected Trimble workflows.',
      icon: 'Cloud',
    },
  ] as const,

  perks: {
    heading: 'Everything you need for interoperable design workflows',
    subheading:
      'Pro Advanced Workflows combines professional SketchUp modeling with Revit interoperability, point-cloud workflows, documentation, collaboration, and connected project tools.',
    cards: [
      {
        number: '01',
        id: 'revit-collab',
        tag: 'REVIT INTEROPERABILITY',
        title: 'Get equipped for successful design',
        subtitle: 'Move efficiently between SketchUp and Revit',
        description:
          'Move efficiently between SketchUp and other modeling tools such as Revit to improve collaboration across teams. Import .rvt and .rfa files and translate them into fully editable SketchUp geometry for rapid iteration.',
        bullets: [
          'Import .rvt and .rfa files natively',
          'Translate Revit geometry to SketchUp',
          'Maintain component hierarchy and layers',
          'Iterate across multidisciplinary teams',
          'Reduce rework and communication gaps',
        ],
        image: '/images/software/sections/revit-integration.jpg',
        imageAlt: 'Revit to SketchUp interoperability workflow',
        accent: '#003865',
      },
      {
        number: '02',
        id: 'point-cloud',
        tag: 'SCAN ESSENTIALS',
        title: 'Model with precision',
        subtitle: 'Point cloud data for existing conditions',
        description:
          'Model against point-cloud data to propose design updates quickly or use scanned information to understand existing conditions. Scan Essentials lets you attach, view, clip, and model directly against LiDAR and photogrammetry scan data.',
        bullets: [
          'Attach E57 & LAS/LAZ point cloud files',
          'Clip and section through point cloud',
          'Snap and model directly against scan data',
          'Visualize existing conditions accurately',
          'Supports renovation and as-built workflows',
        ],
        image: '/images/software/sections/scan-verify.jpg',
        imageAlt: 'Point cloud data inside SketchUp — Scan Essentials',
        accent: '#005F9E',
      },
      {
        number: '03',
        id: 'team-alignment',
        tag: 'CROSS-TEAM COLLABORATION',
        title: 'Align teams',
        subtitle: 'Translate Revit for multi-discipline analysis',
        description:
          'Translate Revit files into SketchUp models to help teams analyze dependencies and coordinate across architecture, structure, MEP, and construction disciplines. Reduce silos and improve decision-making.',
        bullets: [
          'Coordinate across architecture, structure, MEP',
          'Analyze design dependencies visually',
          'Share lightweight SketchUp models',
          'Facilitate multi-disciplinary design reviews',
          'Reduce costly coordination errors',
        ],
        image: '/images/software/sections/aec-construction.jpg',
        imageAlt: 'Cross-team collaboration in SketchUp',
        accent: '#0076C6',
      },
      {
        number: '04',
        id: 'documentation',
        tag: 'PROFESSIONAL DOCUMENTATION',
        title: 'Deliver professional documentation',
        subtitle: 'LayOut for construction-ready drawings',
        description:
          'Transform 3D models into precise 2D construction drawings, plan sets, presentations, and reports with LayOut. Create scaled views, add dimensions, annotations, and title blocks for client-ready deliverables.',
        bullets: [
          'Create scaled 2D drawings from 3D models',
          'Add dimensions, annotations, and schedules',
          'Design custom title blocks and templates',
          'Export to DWG, PDF, and image formats',
          'Maintain live links between model and sheets',
        ],
        image: '/images/ares-standard/cad-arch-floorplan.jpg',
        imageAlt: 'LayOut 2D documentation from SketchUp model',
        accent: '#004A8F',
      },
    ] as AdvancedFeatureCard[],
  },

  workflow: {
    heading: 'Your complete interoperable design workflow',
    subheading: 'From capture to collaboration — every step connected',
    steps: [
      {
        id: 'capture',
        step: '01',
        title: 'CAPTURE',
        description: 'Gather existing conditions via LiDAR scanning or photogrammetry, or receive Revit models from collaborators.',
        icon: 'ScanLine',
        color: '#003865',
      },
      {
        id: 'import',
        step: '02',
        title: 'IMPORT',
        description: 'Import E57/LAS point cloud files or .rvt/.rfa Revit files directly into SketchUp Pro Advanced Workflows.',
        icon: 'Download',
        color: '#004A8F',
      },
      {
        id: 'translate',
        step: '03',
        title: 'TRANSLATE',
        description: 'Translate Revit geometry into editable SketchUp components, preserving hierarchy, layers, and attributes.',
        icon: 'RefreshCw',
        color: '#005F9E',
      },
      {
        id: 'model',
        step: '04',
        title: 'MODEL',
        description: 'Use intuitive push-pull tools to design against point cloud data or translated Revit geometry for precision.',
        icon: 'Box',
        color: '#0076C6',
      },
      {
        id: 'document',
        step: '05',
        title: 'DOCUMENT',
        description: 'Generate construction drawings, presentation sheets, and reports with LayOut connected to your live model.',
        icon: 'FileText',
        color: '#0087D9',
      },
      {
        id: 'connect',
        step: '06',
        title: 'CONNECT',
        description: 'Upload to Trimble Connect for project-wide file management, version control, and stakeholder access.',
        icon: 'Cloud',
        color: '#009AE0',
      },
      {
        id: 'collaborate',
        step: '07',
        title: 'COLLABORATE',
        description: 'Share models for review via web browser or SketchUp Viewer — no subscription required for reviewers.',
        icon: 'Users',
        color: '#00ADEF',
      },
      {
        id: 'deliver',
        step: '08',
        title: 'DELIVER',
        description: 'Export to DWG, IFC, OBJ, FBX and more for downstream handoff to consultants, contractors, and clients.',
        icon: 'Send',
        color: '#0076C6',
      },
    ] as WorkflowStep[],
  },

  whatsIncluded: {
    heading: "What's included in Pro Advanced Workflows",
    subheading: 'Everything in SketchUp Pro, plus exclusive interoperability tools',
    categories: [
      {
        id: 'core',
        title: 'Core SketchUp Pro',
        icon: 'Box',
        items: [
          'SketchUp for Desktop (Windows)',
          'LayOut — 2D documentation',
          'Style Builder',
          'SketchUp for Web (browser)',
          'SketchUp for iPad',
          '3D Warehouse access',
          'Extension Warehouse access',
          'SketchUp Viewer (share/review)',
          '1,000+ extensions ecosystem',
          'PreDesign (site analysis)',
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced Workflows Exclusives',
        icon: 'Zap',
        highlight: true,
        items: [
          'Scan Essentials — point cloud (E57, LAS/LAZ)',
          'Revit Importer (.rvt / .rfa)',
          'Clip and section through scan data',
          'Snap and model against point cloud',
          'Translate Revit geometry to SketchUp',
          'Cross-discipline coordination workflows',
          'As-built and renovation modeling',
          'BIM interoperability workflows',
        ],
      },
      {
        id: 'cloud',
        title: 'Cloud & Collaboration',
        icon: 'Cloud',
        items: [
          'Trimble Connect (1 GB storage)',
          'Project file management',
          'Model versioning',
          'Stakeholder sharing (no subscription needed)',
          'SketchUp for Web (real-time)',
          'Comment and markup tools',
          'Mobile access via SketchUp Viewer',
        ],
      },
    ],
  },

  comparison: {
    heading: 'How Pro Advanced Workflows compares',
    rows: [
      { feature: 'SketchUp for Desktop', category: 'Core Modeling', pro: true, proAdvanced: true, studio: true },
      { feature: 'Intuitive 3D Modeling', category: 'Core Modeling', pro: true, proAdvanced: true, studio: true },
      { feature: 'Push-Pull Geometry', category: 'Core Modeling', pro: true, proAdvanced: true, studio: true },
      { feature: 'Components & Groups', category: 'Core Modeling', pro: true, proAdvanced: true, studio: true },
      { feature: 'LayOut — 2D Documentation', category: 'Documentation', pro: true, proAdvanced: true, studio: true },
      { feature: 'Style Builder', category: 'Documentation', pro: true, proAdvanced: true, studio: true },
      { feature: 'Export DWG / PDF / Image', category: 'Documentation', pro: true, proAdvanced: true, studio: true },
      { feature: 'SketchUp for Web', category: 'Cloud & Collaboration', pro: true, proAdvanced: true, studio: true },
      { feature: 'SketchUp for iPad', category: 'Cloud & Collaboration', pro: true, proAdvanced: true, studio: true },
      { feature: 'Trimble Connect (1 GB)', category: 'Cloud & Collaboration', pro: true, proAdvanced: true, studio: true },
      { feature: 'Extension Warehouse', category: 'Ecosystem', pro: true, proAdvanced: true, studio: true },
      { feature: '3D Warehouse', category: 'Ecosystem', pro: true, proAdvanced: true, studio: true },
      { feature: 'PreDesign', category: 'Ecosystem', pro: true, proAdvanced: true, studio: true },
      { feature: 'Scan Essentials (Point Cloud)', category: 'Advanced Interoperability', pro: false, proAdvanced: true, studio: true },
      { feature: 'Revit Importer (.rvt / .rfa)', category: 'Advanced Interoperability', pro: false, proAdvanced: true, studio: true },
      { feature: 'E57 / LAS / LAZ Support', category: 'Advanced Interoperability', pro: false, proAdvanced: true, studio: true },
      { feature: 'BIM Interoperability', category: 'Advanced Interoperability', pro: false, proAdvanced: true, studio: true },
      { feature: 'V-Ray for SketchUp', category: 'Advanced Interoperability', pro: false, proAdvanced: false, studio: true },
      { feature: 'SketchUp AI', category: 'Advanced Interoperability', pro: false, proAdvanced: false, studio: true },
    ] as ComparisonRow[],
  },

  systemRequirements: {
    heading: 'System requirements',
    platformWarning: 'Pro Advanced Workflows is available for Windows only.',
    hardwareDisclaimer: 'Scanning hardware (LiDAR scanners, cameras) is not included. Trimble Siteworks and Earthworks are separate products.',
    rows: [
      {
        category: 'Operating System',
        minimum: 'Windows 10 (64-bit)',
        recommended: 'Windows 11 (64-bit)',
      },
      {
        category: 'Processor',
        minimum: '2+ GHz Intel / AMD (x64)',
        recommended: '3+ GHz Intel Core i7 / AMD Ryzen 7',
      },
      {
        category: 'RAM',
        minimum: '8 GB',
        recommended: '16–32 GB',
      },
      {
        category: 'GPU (Display)',
        minimum: '1 GB VRAM, OpenGL 3.1+',
        recommended: '4 GB VRAM dedicated GPU',
        note: 'PBR materials / advanced rendering require 32 GB VRAM GPU.',
      },
      {
        category: 'Storage',
        minimum: '1 GB available disk space',
        recommended: 'SSD with 10+ GB free for large scan data',
      },
      {
        category: 'Display',
        minimum: '1024 × 768 resolution',
        recommended: '1920 × 1080 or higher',
      },
      {
        category: 'Internet',
        minimum: 'Required for licensing, Trimble Connect, updates',
        recommended: 'Broadband for cloud collaboration',
      },
      {
        category: 'Point Cloud (Scan Essentials)',
        minimum: '16 GB RAM, dedicated GPU',
        recommended: '32 GB RAM, NVIDIA RTX / AMD RX 6000+ for large scan files',
      },
    ] as SystemReq[],
  },

  industries: [
    {
      id: 'architecture',
      name: 'Architecture',
      tagline: 'Design and document with precision',
      description: 'Import Revit from structural or MEP consultants, model design proposals against existing scan data, and deliver construction-ready documentation.',
      workflows: ['Revit coordination', 'Existing conditions modeling', 'Design proposals', 'Construction documents'],
      deliverables: ['Permit drawings', 'Construction sets', 'Presentation sheets', 'Model files'],
    },
    {
      id: 'construction',
      name: 'Construction & VDC',
      tagline: 'Virtual design and construction coordination',
      description: 'Use point cloud data to capture as-built conditions and compare against design models. Coordinate with architects and engineers through Revit import workflows.',
      workflows: ['As-built scanning', 'BIM coordination', 'Design review', 'RFI documentation'],
      deliverables: ['Clash reports', 'Coordination models', 'As-built documentation', 'RFI packages'],
    },
    {
      id: 'renovation',
      name: 'Renovation & Adaptive Reuse',
      tagline: 'Model against existing conditions',
      description: 'Capture existing structures via LiDAR scanning, attach point cloud data in SketchUp, and design renovation proposals with accurate context.',
      workflows: ['Existing conditions capture', 'Point cloud modeling', 'Renovation proposals', 'Documentation'],
      deliverables: ['Existing conditions models', 'Renovation drawings', 'Client presentations', 'Permit packages'],
    },
    {
      id: 'interior',
      name: 'Interior Design',
      tagline: 'Accurate space planning from scan data',
      description: 'Scan existing spaces and model interior design proposals directly against captured geometry. Eliminate measuring errors and accelerate the design process.',
      workflows: ['Space scanning', 'Existing conditions', 'Design proposals', 'Furniture planning'],
      deliverables: ['Space plans', 'Design presentations', 'Finish schedules', 'Client reports'],
    },
    {
      id: 'engineering',
      name: 'Engineering',
      tagline: 'Coordinate across disciplines',
      description: 'Import structural and MEP Revit models into SketchUp for visual coordination, clash detection review, and communication with non-technical stakeholders.',
      workflows: ['Revit import', 'Multi-discipline coordination', 'Design review', 'Documentation'],
      deliverables: ['Coordination models', 'Review presentations', 'Issue logs', 'Construction documents'],
    },
    {
      id: 'facility',
      name: 'Facility Management',
      tagline: 'As-built documentation and space analysis',
      description: 'Capture existing facility conditions via scanning, create accurate as-built models, and maintain spatial data for ongoing facility management.',
      workflows: ['Facility scanning', 'As-built modeling', 'Space analysis', 'Asset documentation'],
      deliverables: ['As-built models', 'Space inventories', 'Facility reports', 'BIM handover packages'],
    },
  ] as IndustryUseCase[],

  testimonial: {
    quote:
      'SketchUp Pro Advanced Workflows allows us to bring point cloud data and Revit models directly into SketchUp, significantly reducing rework and improving coordination across our multidisciplinary project teams.',
    author: 'Renzo di Furia',
    title: 'VDC Professional',
    company: 'RDF Consulting Services',
    avatarInitials: 'RdF',
    accentColor: '#003865',
  },

  faqs: [
    {
      q: 'What is SketchUp Pro Advanced Workflows?',
      a: 'SketchUp Pro Advanced Workflows is a professional 3D design subscription that includes everything in SketchUp Pro plus two key advanced tools: Scan Essentials (point cloud modeling) and Revit Importer (.rvt/.rfa file import). It is designed for professionals who need to integrate with Revit-based workflows or capture and model against real-world scan data.',
      category: 'general',
    },
    {
      q: 'What makes Pro Advanced Workflows different from standard SketchUp Pro?',
      a: 'Pro Advanced Workflows adds Scan Essentials (point cloud attachment, clipping, and modeling) and Revit Importer (native .rvt/.rfa import) on top of everything included in SketchUp Pro. These tools are not available in the base SketchUp Pro plan.',
      category: 'general',
    },
    {
      q: 'Is SketchUp Pro Advanced Workflows available on Mac?',
      a: 'No. Pro Advanced Workflows is available for Windows only. This is due to the underlying technology requirements of Scan Essentials and Revit Importer. If you are on Mac, SketchUp Pro or SketchUp Studio may be more appropriate options.',
      category: 'platforms',
    },
    {
      q: 'What operating systems are supported?',
      a: 'Windows 10 (64-bit) or Windows 11 (64-bit). macOS is not supported for this subscription tier.',
      category: 'platforms',
    },
    {
      q: 'What Revit file formats can I import?',
      a: 'The Revit Importer supports .rvt (Revit project files) and .rfa (Revit family files). You can import these directly from the File menu in SketchUp for Desktop on Windows.',
      category: 'revit',
    },
    {
      q: 'Does Revit Importer require Revit to be installed?',
      a: 'No. The Revit Importer built into SketchUp Pro Advanced Workflows can read .rvt and .rfa files without requiring an Autodesk Revit installation on the same machine.',
      category: 'revit',
    },
    {
      q: 'What versions of Revit files are supported?',
      a: 'The Revit Importer supports .rvt files from Revit 2015 through the most recent supported version. For the latest compatibility list, refer to the official SketchUp / Trimble release notes.',
      category: 'revit',
    },
    {
      q: 'Can I export SketchUp models back to Revit?',
      a: 'SketchUp does not natively export to .rvt format. You can export to IFC, DWG, FBX, or OBJ for use in other BIM and CAD workflows. Third-party extensions may offer additional Revit export options.',
      category: 'revit',
    },
    {
      q: 'What is Scan Essentials?',
      a: 'Scan Essentials is a built-in SketchUp extension (included in Pro Advanced Workflows and Studio) that allows you to import, view, and model against point cloud data from LiDAR scanners and photogrammetry. You can attach point cloud files, clip through the data, and snap SketchUp geometry directly to the scan.',
      category: 'pointcloud',
    },
    {
      q: 'What point cloud file formats does Scan Essentials support?',
      a: 'Scan Essentials supports E57 and LAS/LAZ file formats — the most common output formats from professional LiDAR scanners and photogrammetry software.',
      category: 'pointcloud',
    },
    {
      q: 'Is scanning hardware included with the subscription?',
      a: 'No. The Pro Advanced Workflows subscription includes the software tools (Scan Essentials and Revit Importer) but does not include any scanning hardware. LiDAR scanners, cameras, or other capture hardware must be sourced separately.',
      category: 'pointcloud',
    },
    {
      q: 'What scanners are compatible with Scan Essentials?',
      a: 'Any scanner that produces E57 or LAS/LAZ output is compatible. This includes popular scanners from Trimble, FARO, Leica, Matterport (via export), and many others. Trimble Siteworks and Trimble Earthworks are separate, specialized Trimble products not included with this subscription.',
      category: 'pointcloud',
    },
    {
      q: 'Can I model directly against the point cloud?',
      a: 'Yes. Scan Essentials allows you to snap SketchUp inference points to the point cloud geometry, so you can trace over scanned surfaces, draw floor plans from scan data, and model existing conditions accurately.',
      category: 'pointcloud',
    },
    {
      q: 'How large a point cloud can Scan Essentials handle?',
      a: 'Performance depends on your hardware. For large scan files, Trimble recommends at least 32 GB RAM and a dedicated GPU with high VRAM. Scan Essentials uses out-of-core rendering to handle large datasets, but hardware specs significantly affect performance.',
      category: 'pointcloud',
    },
    {
      q: 'What are the GPU requirements for advanced features?',
      a: 'For standard 3D modeling, a 1 GB VRAM GPU with OpenGL 3.1 support is the minimum. For PBR materials and advanced rendering workflows, a 32 GB VRAM GPU is recommended. For large point cloud datasets, a high-end GPU (NVIDIA RTX or AMD RX 6000 series) is recommended.',
      category: 'technical',
    },
    {
      q: 'Can I use SketchUp for Web and iPad with this subscription?',
      a: 'Yes. The subscription includes SketchUp for Web (browser-based) and SketchUp for iPad. However, Scan Essentials and Revit Importer are desktop-only features available on Windows.',
      category: 'platforms',
    },
    {
      q: 'Is LayOut included?',
      a: 'Yes. LayOut — the professional 2D documentation tool — is included with Pro Advanced Workflows. Use LayOut to create scaled construction drawings, presentation sheets, and reports from your SketchUp models.',
      category: 'general',
    },
    {
      q: 'What cloud storage is included?',
      a: 'The subscription includes 1 GB of Trimble Connect storage for project file management, model versioning, and collaboration. Additional storage can be purchased through Trimble Connect.',
      category: 'general',
    },
    {
      q: 'How is the subscription priced?',
      a: 'Pro Advanced Workflows is available as an annual subscription (billed annually) or a monthly subscription. Contact Leniva CAD Solutions for current India quotations, volume licensing, and academic or government discounts.',
      category: 'licensing',
    },
    {
      q: 'Is a free trial available?',
      a: 'Yes. SketchUp offers a free trial that lets you explore the platform. Visit the SketchUp website or contact Leniva CAD Solutions to get trial access and evaluate whether Pro Advanced Workflows meets your needs.',
      category: 'licensing',
    },
    {
      q: 'Can I switch from SketchUp Pro to Pro Advanced Workflows?',
      a: 'Yes. You can upgrade your subscription from SketchUp Pro to Pro Advanced Workflows at any time. Contact Trimble or your authorized partner (Leniva CAD Solutions) to arrange an upgrade, which may be prorated based on your subscription cycle.',
      category: 'licensing',
    },
    {
      q: 'How many devices can I install SketchUp on?',
      a: 'Your subscription allows installation on multiple devices. However, only one active session per license is permitted at a time. Floating licenses are available for teams — contact Leniva CAD Solutions for volume licensing options.',
      category: 'licensing',
    },
    {
      q: 'Is there a volume or educational discount?',
      a: 'Yes. Trimble and authorized partners offer volume discounts for teams and organizations. Educational and non-profit options are also available. Contact Leniva CAD Solutions for tailored quotes.',
      category: 'licensing',
    },
    {
      q: 'What is Trimble Connect?',
      a: 'Trimble Connect is a cloud-based project collaboration platform included with SketchUp subscriptions. It allows you to store, share, and manage project files (not just SketchUp files), view models in a browser, and coordinate with project stakeholders who do not need a SketchUp subscription.',
      category: 'general',
    },
    {
      q: 'What extensions are available for interoperability workflows?',
      a: 'The Extension Warehouse includes 1,000+ extensions. For interoperability, popular options include IFC Manager (IFC import/export), SimLab Composer, SketchUp to Revit workflows via third-party tools, and various structural and MEP-specific extensions.',
      category: 'general',
    },
    {
      q: 'Can I export to IFC from SketchUp?',
      a: 'Yes. SketchUp supports IFC export natively and via extensions. The IFC Manager extension (free) provides enhanced IFC 2x3 and IFC 4 support for BIM handover workflows.',
      category: 'revit',
    },
    {
      q: 'What support is available?',
      a: 'SketchUp Pro Advanced Workflows subscribers receive access to the SketchUp Help Center, community forums, and video tutorials. Premium support is available through Trimble. In India, Leniva CAD Solutions provides local support, onboarding, and onboarding assistance.',
      category: 'licensing',
    },
    {
      q: 'Does Pro Advanced Workflows include SketchUp AI?',
      a: 'No. SketchUp AI features are part of the SketchUp Studio subscription, not Pro Advanced Workflows. If SketchUp AI is important to your workflow, consider SketchUp Studio.',
      category: 'general',
    },
    {
      q: 'Does Pro Advanced Workflows include V-Ray rendering?',
      a: 'No. V-Ray for SketchUp is included in SketchUp Studio. Pro Advanced Workflows focuses on interoperability (Revit + point cloud) and does not include photorealistic rendering. V-Ray or Enscape can be purchased separately as add-ons.',
      category: 'general',
    },
    {
      q: 'How do I get started with Pro Advanced Workflows in India?',
      a: 'Contact Leniva CAD Solutions — Trimble\'s authorized SketchUp partner in India. We provide subscription purchase, onboarding, onboarding for Scan Essentials and Revit Importer, and ongoing technical support in Indian time zones.',
      category: 'licensing',
    },
  ] as AdvancedFaq[],

  relatedProducts: [
    {
      id: 'sketchup-pro',
      name: 'SketchUp Pro',
      tagline: 'Professional 3D modeling for all platforms',
      description: 'The complete SketchUp professional subscription without the advanced interoperability tools. Best for design professionals who do not need Revit import or point cloud.',
      link: '/products/sketchup-pro',
      badge: 'Windows · Mac · Web · iPad',
    },
    {
      id: 'sketchup-scan',
      name: 'SketchUp Pro + Scan',
      tagline: 'Point cloud specialists',
      description: 'A subscription built specifically around Scan Essentials (point cloud) workflows, without the Revit Importer component.',
      link: '/products/sketchup-scan',
      badge: 'Windows Only',
    },
    {
      id: 'sketchup-studio',
      name: 'SketchUp Studio',
      tagline: 'Maximum power — everything included',
      description: 'The most complete SketchUp subscription: everything in Pro Advanced Workflows plus V-Ray, SketchUp AI, and premium cloud storage.',
      link: '/products/sketchup-studio',
      badge: 'Windows · Mac · Web · iPad',
    },
  ],
}
