export interface SketchUpProFeature {
  id: string
  title: string
  subtitle: string
  description: string
  iconName: string
  tag: string
  highlight?: boolean
}

export interface SketchUpPlatform {
  id: 'desktop' | 'web' | 'ipad' | 'layout' | 'connect'
  name: string
  headline: string
  description: string
  badge: string
  capabilities: string[]
  primaryCta: string
  image: string
}

export interface ExtensionItem {
  id: string
  name: string
  developer: string
  category: 'architecture' | 'interior' | 'construction' | 'engineering' | 'landscape' | 'visualization' | 'productivity'
  description: string
  rating: number
  downloads: string
  icon: string
}

export interface WarehouseItem {
  id: string
  title: string
  category: 'Furniture' | 'Architecture' | 'Lighting' | 'Vehicles' | 'Landscape' | 'Appliances'
  author: string
  fileSize: string
  polygons: string
  image: string
}

export interface IndustryCard {
  id: string
  name: string
  tagline: string
  description: string
  workflow: string[]
  deliverables: string[]
  image: string
}

export interface PricingPlanComparison {
  featureName: string
  category: 'Core Modeling' | 'Documentation' | 'Cloud & Collaboration' | 'Ecosystem' | 'Advanced BIM & Rendering'
  go: boolean | string
  pro: boolean | string
  studio: boolean | string
}

export interface SystemRequirement {
  category: string
  minimum: string
  recommended: string
}

export interface SketchUpFaq {
  q: string
  a: string
  category: 'general' | 'desktop-layout' | 'platforms' | 'licensing' | 'extensions'
}

export const sketchupProData = {
  hero: {
    eyebrow: 'PROFESSIONAL 3D DESIGN SOFTWARE',
    title: 'SketchUp Pro',
    tagline: 'Create professional work with powerful 3D design tools.',
    description:
      'Design, visualize, document, communicate, and collaborate with a complete professional 3D modeling ecosystem built for architects, engineers, interior designers, and construction professionals.',
    annualPriceUsd: 33.25,
    annualBilledTotalUsd: 399,
    monthlyPriceUsd: 99.99,
    officialBrand: 'Trimble SketchUp',
    partnerBadge: 'Trimble Authorized Partner — Leniva CAD Solutions',
  },

  valueStrip: [
    {
      id: '3d-modeling',
      title: '3D MODELING',
      desc: 'Full-featured desktop 3D modeler with intuitive push-pull push mechanics and precise geometry.',
      icon: 'Box',
    },
    {
      id: '2d-documentation',
      title: '2D DOCUMENTATION',
      desc: 'Create scaled construction drawings, plan sets, and client presentations with LayOut.',
      icon: 'FileText',
    },
    {
      id: 'cloud-collaboration',
      title: 'CLOUD COLLABORATION',
      desc: 'Store, share, review, and collaborate with unlimited cloud storage on Trimble Connect.',
      icon: 'Cloud',
    },
    {
      id: 'extensible-workflows',
      title: '1,000+ EXTENSIONS',
      desc: 'Customize your modeling pipeline with specialized tools from Extension Warehouse.',
      icon: 'Cpu',
    },
    {
      id: 'multi-device-access',
      title: 'MULTI-DEVICE ACCESS',
      desc: 'Work seamlessly across desktop (Windows/macOS), modern web browsers, and Apple iPad.',
      icon: 'Tablet',
    },
  ],

  powerOfProCards: [
    {
      id: 'capture-ideas',
      number: '01',
      title: 'Capture Ideas Quickly',
      description:
        "Move quickly from early conceptual massing to detailed 3D designs using SketchUp's intuitive, direct-manipulation modeling environment.",
      bullets: [
        'Natural push-pull direct geometry editing',
        'Smart inference engine for precise alignment',
        'Live geometry feedback with real-world dimensions',
      ],
      tag: 'Conceptual to Detailed',
    },
    {
      id: 'expand-workflow',
      number: '02',
      title: 'Expand Your Workflow',
      description:
        'Extend SketchUp with specialized third-party tools, plugins, and parametric extensions tailored precisely to your discipline and project requirements.',
      bullets: [
        'Access to Extension Warehouse with 1,000+ plugins',
        'Ruby API support for custom company scripting',
        'Direct links to rendering engines and CAD software',
      ],
      tag: 'Modular Ecosystem',
    },
    {
      id: 'import-export',
      number: '03',
      title: 'Robust CAD & BIM Interoperability',
      description:
        'Move efficiently between design stages using industry-standard 2D and 3D file formats without data loss or translation bottlenecks.',
      bullets: [
        'Native DWG and DXF import/export via LayOut & Pro',
        'IFC 2x3 & IFC4 certified building data export',
        'PDF, OBJ, FBX, DAE, 3DS, STL, and raster support',
      ],
      tag: 'Connected CAD/BIM',
    },
    {
      id: 'document-clearly',
      number: '04',
      title: 'Document with Precision in LayOut',
      description:
        'Transform your 3D models into scaled, coordinated 2D drawing sets, architectural documentation, permit submissions, and client presentations.',
      bullets: [
        'Dynamically linked model viewports that auto-update',
        'Associative dimensioning and smart label annotations',
        'Custom title blocks, vector linework, and scaled hatches',
      ],
      tag: 'Construction Documents',
    },
  ],

  platforms: [
    {
      id: 'desktop',
      name: 'SketchUp for Desktop',
      headline: 'The Core Professional 3D Modeler on Windows & macOS',
      description:
        'Create accurate, complex 3D models with the full-featured SketchUp desktop software. Supports advanced solid modeling, styles, tags, scenes, component hierarchies, and local extension execution.',
      badge: 'Windows & macOS',
      capabilities: [
        'Full offline 3D modeling capability with local file save (.skp)',
        'Tag folders, scene management, and custom visual styles',
        'Solid Tools for additive and subtractive volumetric modeling',
        'High-resolution imagery and animation video export',
        'Unlimited local Ruby extension and plugin execution',
        'Generate Report tool for quantities and material takeoffs',
      ],
      primaryCta: 'Explore Desktop Capabilities',
      image: '/images/software/sketchup-pro.jpg',
    },
    {
      id: 'layout',
      name: 'LayOut — 2D Documentation',
      headline: 'Turn 3D Models into Professional 2D Drawing Sets',
      description:
        'LayOut bridges the gap between 3D design and 2D construction documentation. Place SketchUp model views on drawing pages, assign architectural scales, dimension dynamically, and export coordinated DWG or PDF sheets.',
      badge: 'Included with Pro',
      capabilities: [
        'Dynamic 3D model viewports with architectural scale ratios (1:50, 1:100, 1/4"=1\')',
        'Associative dimensions that automatically update when the 3D model changes',
        'Vector, Raster, and Hybrid rendering modes for crisp CAD linework',
        'Full DWG / DXF export for sharing with external CAD consultants',
        'Custom sheet templates, multi-page permit sets, and title blocks',
        'Scaled vector pattern hatches, line weight control, and multi-leader text',
      ],
      primaryCta: 'Explore LayOut Documentation',
      image: '/images/ares-standard/cad-arch-floorplan.jpg',
    },
    {
      id: 'ipad',
      name: 'SketchUp for iPad',
      headline: 'Model, Markup & Present with Apple Pencil On-Site',
      description:
        'Designed specifically for touch, Apple Pencil, and mobile freedom. Sketch initial concepts, take digital site measurements, markup models directly on client jobsites, and review project progress in augmented reality.',
      badge: 'iPadOS Native',
      capabilities: [
        'JustDraw smart stroke recognition with Apple Pencil pressure sensitivity',
        'AutoShape converts freehand gestures into accurate 3D primitives',
        'Markups and redlines synchronized live to Trimble Connect cloud',
        'AR (Augmented Reality) viewing mode to overlay 3D designs on physical rooms',
        'LiDAR RoomScan to quickly capture real-world room boundaries as 3D geometry',
        'Full offline support with automatic cloud synchronization',
      ],
      primaryCta: 'See iPad Workflows',
      image: '/images/software/sketchup-advanced.jpg',
    },
    {
      id: 'web',
      name: 'SketchUp for Web',
      headline: 'Browser-Based 3D Modeling on Any Computer',
      description:
        'Access your 3D models from any modern web browser (Chrome, Edge, Firefox, Safari) on any computer without installing software. Ideal for field laptops, Chromebooks, and fast project reviews.',
      badge: 'Zero-Install Cloud',
      capabilities: [
        'Full core 3D modeling toolset running directly in WebGL',
        'Direct integration with Trimble Connect cloud files',
        'Real-time link sharing for clients and consultants to view models',
        '3D Warehouse access directly within the web modeler',
        'Mobile and web viewer compatibility with live scene switching',
      ],
      primaryCta: 'Launch Browser Modeler',
      image: '/images/software/sketchup-scan.jpg',
    },
    {
      id: 'connect',
      name: 'Trimble Connect Cloud',
      headline: 'Unlimited Cloud Storage, File Versioning & Team Collaboration',
      description:
        'Keep your projects, files, and multi-disciplinary teams synchronized in a secure, ISO-certified cloud environment with zero storage limitations.',
      badge: 'Unlimited Cloud Included',
      capabilities: [
        'Unlimited cloud storage and unlimited active projects',
        'File revision history with automatic rollback capability',
        'Model coordination, section cut inspections, and 3D visual markups',
        'Task assignment and RFI (Request For Information) issue tracking',
        'Granular role-based user permissions (Viewer, Contributor, Admin)',
        'Cross-platform sync across Desktop, Web, iPad, and Mobile viewers',
      ],
      primaryCta: 'Learn About Trimble Connect',
      image: '/images/software/sections/revit-integration.jpg',
    },
  ],

  layoutFeatures: [
    {
      title: 'Associative Dimensions',
      desc: 'Dimensions bind directly to 3D model vertices. When your model updates, all dimensions, callouts, and notes update automatically.',
    },
    {
      title: 'Architectural Scales',
      desc: 'Set accurate architectural and metric scales on any viewport. Mix perspective views with orthographic plan, section, and elevation cuts.',
    },
    {
      title: 'Hybrid Linework Rendering',
      desc: 'Combine vector linework for razor-sharp CAD borders with raster textures for photorealistic materials on the same drawing sheet.',
    },
    {
      title: 'DWG / DXF Roundtrip',
      desc: 'Import CAD background files and export fully layered DWG drawing sets for mechanical, electrical, and structural engineering teams.',
    },
    {
      title: 'Custom Title Blocks & Templates',
      desc: 'Standardize company drawing sheets with auto-populating project names, revision dates, sheet numbers, and company logos.',
    },
    {
      title: 'Multi-Page Presentation Sets',
      desc: 'Produce bound PDF presentation books, permit drawings, construction details, and client pitches all from one unified document file.',
    },
  ],

  preDesignFeatures: [
    {
      title: 'Sun Path & Solar Angles',
      desc: 'Visualize solar exposure by season and time of day to determine optimal building orientation and solar heat gain mitigation.',
    },
    {
      title: 'Climate-Responsive Glazing',
      desc: 'Get data-backed guidance on optimal window-to-wall ratios for north, south, east, and west facades before drafting detailed walls.',
    },
    {
      title: 'Passive Shading Strategies',
      desc: 'Evaluate overhang depths, louvers, and fins suited to local sun angles to keep spaces comfortable while reducing HVAC loads.',
    },
    {
      title: 'Outdoor & Daylighting Comfort',
      desc: 'Assess daylight penetration and wind impact on outdoor patios, courtyards, and pedestrian zones early in the schematic phase.',
    },
  ],

  aiCapabilities: [
    {
      title: 'SketchUp Diffusion (AI Visualization)',
      desc: 'Generate photorealistic conceptual renderings directly inside SketchUp using text prompts and contextual model geometry.',
      tag: 'Generative AI',
    },
    {
      title: 'Smart Search & 3D Warehouse AI',
      desc: 'Find the exact 3D models you need using natural language visual search and intelligent semantic tagging across millions of assets.',
      tag: 'Search AI',
    },
    {
      title: 'AI-Assisted Modeling Insights',
      desc: 'Speed up repetitive drafting steps with predictive inferences, automatic object classification, and contextual command suggestions.',
      tag: 'Productivity AI',
    },
  ],

  warehouseCategories: [
    {
      id: 'w-1',
      title: 'Modern Minimalist Lounge Chair',
      category: 'Furniture' as const,
      author: 'Herman Miller Style',
      fileSize: '4.2 MB',
      polygons: '18.4K',
      image: '/images/ares-standard/cad-interior-space-plan.jpg',
    },
    {
      id: 'w-2',
      title: 'Curved Curtain Wall Facade Element',
      category: 'Architecture' as const,
      author: 'BIM Components Studio',
      fileSize: '8.1 MB',
      polygons: '32.1K',
      image: '/images/software/sections/aec-construction.jpg',
    },
    {
      id: 'w-3',
      title: 'Industrial Pendant Track Lighting',
      category: 'Lighting' as const,
      author: 'LumenArch Design',
      fileSize: '2.8 MB',
      polygons: '12.6K',
      image: '/images/ares-standard/cad-eng-schematic.jpg',
    },
    {
      id: 'w-4',
      title: 'Electric Delivery Van & Fleet Assets',
      category: 'Vehicles' as const,
      author: 'UrbanMobility CAD',
      fileSize: '12.4 MB',
      polygons: '45.2K',
      image: '/images/software/sketchup-advanced.jpg',
    },
    {
      id: 'w-5',
      title: 'Temperate Specimen Trees & Shrubbery',
      category: 'Landscape' as const,
      author: 'GreenScape 3D',
      fileSize: '15.6 MB',
      polygons: '64.8K',
      image: '/images/software/sketchup-pro.jpg',
    },
    {
      id: 'w-6',
      title: 'Commercial Kitchen Induction Range',
      category: 'Appliances' as const,
      author: 'Hospitality Design Pro',
      fileSize: '5.9 MB',
      polygons: '22.3K',
      image: '/images/ares-standard/cad-mech-drafting.jpg',
    },
  ],

  extensions: [
    {
      id: 'ext-1',
      name: 'Curviloft',
      developer: 'Fredo6',
      category: 'architecture' as const,
      description: 'Parametric lofting, skinning along contours, and organic surface generation from splines.',
      rating: 4.9,
      downloads: '1.2M+',
      icon: 'Layers',
    },
    {
      id: 'ext-2',
      name: 'Profile Builder 3',
      developer: 'MindSight Studios',
      category: 'construction' as const,
      description: 'Intelligent parametric modeling of walls, framing, pipes, railings, and structural assemblies with takeoffs.',
      rating: 4.9,
      downloads: '850K+',
      icon: 'Box',
    },
    {
      id: 'ext-3',
      name: 'Artisan Organic Toolset',
      developer: 'MindSight Studios',
      category: 'visualization' as const,
      description: 'Subdivision surfaces, sculpting brushes, soft selection, and terrain deformation tools.',
      rating: 4.8,
      downloads: '620K+',
      icon: 'Palette',
    },
    {
      id: 'ext-4',
      name: 'CleanUp³',
      developer: 'ThomThom',
      category: 'productivity' as const,
      description: 'Optimize geometry by removing duplicate edges, purging unused materials, and merging coplanar faces.',
      rating: 4.9,
      downloads: '2.1M+',
      icon: 'Zap',
    },
    {
      id: 'ext-5',
      name: 'Skatter for SketchUp',
      developer: 'Lindalë',
      category: 'landscape' as const,
      description: 'Render millions of vegetation instances, grass, trees, and rocks without bogging down model viewport performance.',
      rating: 4.9,
      downloads: '480K+',
      icon: 'Sparkles',
    },
    {
      id: 'ext-6',
      name: 'Quantifier Pro',
      developer: 'MindSight Studios',
      category: 'engineering' as const,
      description: 'Instant cost estimating, volume calculations, surface area takeoffs, and bill of quantities directly from components.',
      rating: 4.8,
      downloads: '390K+',
      icon: 'Calculator',
    },
  ],

  industries: [
    {
      id: 'architecture',
      name: 'Architecture',
      tagline: 'From Schematic Massing to Coordinated Construction Sets',
      description:
        'Architects rely on SketchUp Pro to explore form, study daylight with PreDesign, coordinate with consultants via DWG/IFC, and deliver comprehensive 2D permit drawings in LayOut.',
      workflow: ['Schematic massing & sun studies', 'Contextual site modeling & terrain', 'Detailed 3D design & assemblies', 'Coordinated 2D permit sets in LayOut'],
      deliverables: ['Permit drawing sets', 'Photorealistic client presentations', 'IFC building models', 'BIM coordinate models'],
      image: '/images/ares-standard/cad-arch-floorplan.jpg',
    },
    {
      id: 'interior',
      name: 'Interior Design',
      tagline: 'Custom Millwork, Space Planning & Material Studies',
      description:
        'Space plan in 2D and 3D simultaneously. Drop in verified manufacturer fixtures from 3D Warehouse, test finish materials and textures, and present immersive walkthroughs to clients.',
      workflow: ['2D space plan to 3D extrusions', '3D Warehouse fixture integration', 'Custom millwork & joinery detailing', 'Client walk-through renders & boards'],
      deliverables: ['Interior finish schedules', 'Custom cabinetry details', 'Presentation boards', 'Lighting layout plans'],
      image: '/images/ares-standard/cad-interior-space-plan.jpg',
    },
    {
      id: 'landscape',
      name: 'Landscape Architecture',
      tagline: 'Site Topography, Hardscape Detailing & Planting Plans',
      description:
        'Import contour data, sculpt digital elevation models with Sandbox tools, layout hardscaping, specify botanical specimens from 3D Warehouse, and produce scaled planting plans.',
      workflow: ['Contour lines to 3D Sandbox terrain', 'Hardscape grading & road alignments', 'Vegetation & lighting asset placement', 'Dimensioned site layout plans in LayOut'],
      deliverables: ['Grading & drainage drawings', 'Plant schedules & takeoffs', '3D client site walkthroughs', 'Hardscape construction sheets'],
      image: '/images/software/sketchup-pro.jpg',
    },
    {
      id: 'construction',
      name: 'Construction & Contracting',
      tagline: 'Phasing, Logistics, Sequencing & Trade Coordination',
      description:
        'Build the project virtually before pouring concrete. Identify trade spatial clashes, communicate site logistics with subcontractors, and generate accurate material takeoffs.',
      workflow: ['Subcontractor model federation', '4D construction sequencing visualization', 'Site logistics & crane swing planning', 'Concrete takeoff & framing counts'],
      deliverables: ['Logistics plan sheets', 'Framing cut lists', 'Subcontractor RFIs with 3D pins', 'Material quantity takeoff reports'],
      image: '/images/software/sections/aec-construction.jpg',
    },
    {
      id: 'woodworking',
      name: 'Woodworking & Millwork',
      tagline: 'Precision Joinery, Part Exploded Views & Cut Lists',
      description:
        'Design bespoke furniture, cabinetry, and architectural woodwork with millimeter accuracy. Generate exploded assembly diagrams and export cut lists for the workshop.',
      workflow: ['Dimensionally exact component modeling', 'Mortise, tenon & joinery detailing', 'Exploded isometric assembly scenes', 'Cut lists & sheet nesting reports'],
      deliverables: ['Dimensioned shop drawings', 'Exploded assembly diagrams', 'Cut list takeoff spreadsheets', 'Workshop 1:1 scale templates'],
      image: '/images/ares-standard/cad-mech-drafting.jpg',
    },
    {
      id: 'urban-planning',
      name: 'Urban Planning',
      tagline: 'Master Planning, Zoning Envelopes & Public Visualization',
      description:
        'Model multi-acre city districts with GIS terrain data, evaluate daylight access, test zoning density envelopes, and communicate development proposals to municipal stakeholders.',
      workflow: ['GIS aerial & terrain base mapping', 'Zoning envelope volume testing', 'Shadow study animations across seasons', 'Public consultation presentation decks'],
      deliverables: ['Urban master plan sheets', 'Zoning compliance studies', '3D city scale models', 'Environmental impact visuals'],
      image: '/images/software/sketchup-advanced.jpg',
    },
  ],

  comparisonTable: [
    {
      featureName: 'SketchUp for Desktop (Windows & macOS)',
      category: 'Core Modeling' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'SketchUp for Web (Browser Modeler)',
      category: 'Core Modeling' as const,
      go: true,
      pro: true,
      studio: true,
    },
    {
      featureName: 'SketchUp for iPad (Apple Pencil & AR)',
      category: 'Core Modeling' as const,
      go: true,
      pro: true,
      studio: true,
    },
    {
      featureName: 'LayOut (2D Construction Documentation & Scaled Sets)',
      category: 'Documentation' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'Associative Dimensions & Vector Linework',
      category: 'Documentation' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'DWG / DXF Import & Export via LayOut',
      category: 'Documentation' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'Trimble Connect Cloud (Unlimited Storage & Projects)',
      category: 'Cloud & Collaboration' as const,
      go: true,
      pro: true,
      studio: true,
    },
    {
      featureName: '3D Warehouse Unlimited Model Downloads',
      category: 'Ecosystem' as const,
      go: 'Limited Downloads',
      pro: 'Unlimited Downloads',
      studio: 'Unlimited Downloads',
    },
    {
      featureName: 'Extension Warehouse (1,000+ Third-Party Plugins)',
      category: 'Ecosystem' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'PreDesign Climate Insights & Solar Shading',
      category: 'Ecosystem' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'SketchUp AI / Diffusion Visualization',
      category: 'Ecosystem' as const,
      go: false,
      pro: true,
      studio: true,
    },
    {
      featureName: 'Scan Essentials (Point Cloud Laser Scan Importer)',
      category: 'Advanced BIM & Rendering' as const,
      go: false,
      pro: false,
      studio: true,
    },
    {
      featureName: 'Revit Importer (Direct .rvt to SketchUp Geometry)',
      category: 'Advanced BIM & Rendering' as const,
      go: false,
      pro: false,
      studio: true,
    },
    {
      featureName: 'V-Ray for SketchUp (Photorealistic Ray Tracing & CPU/GPU)',
      category: 'Advanced BIM & Rendering' as const,
      go: false,
      pro: false,
      studio: true,
    },
  ],

  systemRequirements: [
    {
      category: 'Operating System',
      minimum: 'Windows 10 64-bit or macOS 12 (Monterey)',
      recommended: 'Windows 11 64-bit or macOS 14 (Sonoma) / Apple Silicon (M1/M2/M3 native)',
    },
    {
      category: 'Processor (CPU)',
      minimum: '2 GHz or faster multi-core x86-64 Intel/AMD processor',
      recommended: '3+ GHz modern multi-core processor (Intel Core i7/i9, AMD Ryzen 7/9, or Apple Silicon M-series)',
    },
    {
      category: 'System Memory (RAM)',
      minimum: '8 GB RAM',
      recommended: '16 GB to 32 GB RAM (for complex models, detailed textures, and LayOut multi-sheet sets)',
    },
    {
      category: 'Graphics Card (GPU)',
      minimum: '1 GB VRAM with full OpenGL 3.1 support and hardware acceleration',
      recommended: 'Dedicated GPU with 4+ GB VRAM (NVIDIA RTX 3060/4060 or AMD Radeon equivalent) supporting OpenGL 4.5+',
    },
    {
      category: 'Storage Space',
      minimum: '2 GB available hard-disk space for installation',
      recommended: 'High-speed NVMe SSD with 10+ GB available space for caching 3D Warehouse assets and LayOut temp files',
    },
    {
      category: 'Display Resolution',
      minimum: '1024 × 768 display resolution',
      recommended: '1920 × 1080 (Full HD) or 4K Ultra HD display with scaling support',
    },
    {
      category: 'Pointing Device',
      minimum: 'Standard 2-button mouse',
      recommended: '3-button mouse with clickable scroll wheel (essential for orbiting, panning, and zooming in 3D)',
    },
    {
      category: 'Internet Connection',
      minimum: 'Broadband connection for initial activation and Trimble Connect sync',
      recommended: 'Continuous high-speed connection for 3D Warehouse downloads, PreDesign climate queries, and cloud collaboration',
    },
  ],

  faqs: [
    {
      q: 'What is SketchUp Pro?',
      a: 'SketchUp Pro is Trimble’s flagship 3D modeling and design subscription for professionals. It includes the complete desktop 3D modeler (Windows and macOS), LayOut for 2D construction documentation, SketchUp for Web, SketchUp for iPad, unlimited cloud storage on Trimble Connect, unlimited downloads from 3D Warehouse, access to 1,000+ extensions, PreDesign climate analytics, and SketchUp AI capabilities.',
      category: 'general',
    },
    {
      q: 'What is the difference between SketchUp Pro and SketchUp Studio?',
      a: 'SketchUp Pro is the complete professional 3D design and 2D documentation solution. SketchUp Studio builds on Pro by additionally including Scan Essentials (for importing point cloud laser scans directly into SketchUp), the Revit Importer (for converting Revit models into native SketchUp geometry), and Chaos V-Ray for photorealistic CPU/GPU rendering and animations. If your projects do not require point clouds, Revit files, or high-end ray tracing, SketchUp Pro offers the best balance of capability and value.',
      category: 'general',
    },
    {
      q: 'Does SketchUp Pro include LayOut?',
      a: 'Yes, absolutely. LayOut is included in every SketchUp Pro subscription. LayOut allows you to create scaled 2D architectural drawings, construction detail sheets, plan sets, and professional client presentations directly linked to your SketchUp 3D models with associative dimensions and DWG export.',
      category: 'desktop-layout',
    },
    {
      q: 'Can I install SketchUp Pro on multiple computers?',
      a: 'A single-user SketchUp Pro subscription is tied to a specific Trimble ID (email address). You can install SketchUp Pro on multiple computers (for instance, your office desktop and your home laptop), and you may be signed in on up to two devices concurrently. To switch devices, simply sign out from the active workstation.',
      category: 'licensing',
    },
    {
      q: 'Can I use SketchUp Pro offline without an active internet connection?',
      a: 'Yes. Once SketchUp for Desktop is installed and activated via your Trimble ID, you can model offline for up to 28 consecutive days before the software requires a quick internet connection to verify your active subscription status.',
      category: 'desktop-layout',
    },
    {
      q: 'Is SketchUp for iPad included with SketchUp Pro?',
      a: 'Yes. SketchUp for iPad is fully included in the SketchUp Pro subscription. You can log into the iPad app using your Trimble ID, model with Apple Pencil, use LiDAR RoomScan on supported iPads, and sync your models seamlessly via Trimble Connect.',
      category: 'platforms',
    },
    {
      q: 'How do I procure genuine SketchUp Pro commercial licensing in India?',
      a: 'Leniva CAD Solutions provides official commercial quotes, volume licenses, and educational options for SketchUp Pro and SketchUp Studio in Indian Rupees (INR) with full GST tax compliance, licensing administration, and local technical onboarding support.',
      category: 'licensing',
    },
    {
      q: 'Can I import and export AutoCAD DWG / DXF files in SketchUp Pro?',
      a: 'Yes. Both SketchUp for Desktop and LayOut support robust DWG and DXF import and export workflows. You can import 2D floor plans from AutoCAD to model them in 3D, and you can export completed LayOut drawing sheets back to DWG format for engineering consultants.',
      category: 'desktop-layout',
    },
    {
      q: 'Can I use third-party plugins and extensions in SketchUp Pro?',
      a: 'Yes. SketchUp Pro fully supports the Extension Warehouse and third-party Ruby plugins (.rbz files). You can install tools for parametric profile generation, cost estimation, terrain sculpting, rendering, architectural joinery, and custom corporate scripting.',
      category: 'extensions',
    },
    {
      q: 'How does Trimble Connect work with SketchUp Pro?',
      a: 'Trimble Connect is integrated directly into SketchUp Pro. As a Pro subscriber, you receive unlimited cloud storage and unlimited projects. You can save models directly to the cloud, access revision history, collaborate with team members, view models in web browsers, and coordinate models with engineers.',
      category: 'platforms',
    },
    {
      q: 'Does Leniva CAD Solutions provide genuine commercial licensing and GST invoices in India?',
      a: 'Yes. Leniva CAD Solutions is an authorized partner providing 100% genuine commercial subscriptions for SketchUp Pro and SketchUp Studio across India, complete with compliant GST tax invoicing, dedicated deployment assistance, licensing administration, and technical onboarding support.',
      category: 'licensing',
    },
  ],
}
