export interface ScannerFeature {
  badge: string
  title: string
  description: string
  highlight?: string
}

export interface ScannerTechnology {
  title: string
  subtitle: string
  description: string
  stat?: string
  statLabel?: string
}

export interface ScannerApplication {
  title: string
  description: string
  icon: string
  tag: string
}

export interface ScannerWorkflowStep {
  step: string
  title: string
  description: string
  stage: string
  icon: string
}

export interface ScannerProductDetail {
  id: string
  slug: string
  name: string
  modelName: string
  tagline: string
  subtitle: string
  description: string
  trustLine: string
  heroImage: string
  transparentImage: string
  galleryImages: string[]
  brochureUrl?: string
  keySpecsSummary: {
    accuracy: string
    resolution: string
    speed: string
    technology: string
    color: string
    wireless: string
  }
  features: ScannerFeature[]
  technologies: ScannerTechnology[]
  specifications: Record<string, string>
  applications: ScannerApplication[]
  workflow?: ScannerWorkflowStep[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const devokMQData: ScannerProductDetail = {
  id: '3devok-mq',
  slug: '3devok-mq',
  name: '3DeVOK MQ 3D Color Scanner',
  modelName: '3DeVOK MQ',
  tagline: 'High-Precision Full-Color 3D Scanning',
  subtitle: 'Portable, Wireless & Marker-Free Color 3D Scanning',
  description:
    'Capture ultra-accurate geometry and realistic color textures with the advanced 3DeVOK MQ 3D Color Scanner. Designed for engineering, inspection, reverse engineering, product design, cultural heritage, education and digital archiving.',
  trustLine:
    'Professional scanning solution for engineering, manufacturing, design and research.',
  heroImage: '/images/scanners/3devok-mq-hardware-kit.png',
  transparentImage: '/images/scanners/3devok-mq-hardware-kit.png',
  brochureUrl: '/brochures/3devok-mq.pdf',
  galleryImages: [
    '/images/scanners/3devok-mq-hardware-kit.png',
    '/images/scanners/3devok-sensor-architecture.png',
    '/images/scanners/3devok-in-hand-action.png',
    '/images/scanners/scanner-color-texture.jpg',
  ],
  keySpecsSummary: {
    accuracy: 'Up to 0.08 mm',
    resolution: '0.1 mm Point Distance',
    speed: 'Up to 4,500,000 pts/s',
    technology: '22-Line IR Laser + VCSEL',
    color: '24-Bit RGB Photoreal Texture',
    wireless: 'Supported via Optional Handle',
  },
  features: [
    {
      badge: 'ACCURATE',
      title: 'Up to 0.08 mm Accuracy',
      description:
        'Engineered for tight-tolerance reverse engineering and reliable dimensional verification of precision parts.',
      highlight: '0.08 mm',
    },
    {
      badge: 'DETAILED',
      title: '0.1 mm Resolution',
      description:
        'Resolves crisp edges, surface text, fine filigree and complex organic textures with zero surface degradation.',
      highlight: '0.1 mm',
    },
    {
      badge: 'FAST',
      title: 'Up to 4.5M Points/Sec',
      description:
        'High-speed structured light projection delivers dense 3D point clouds in real-time with zero motion lag.',
      highlight: '4.5M pts/s',
    },
    {
      badge: 'MARKER-FREE',
      title: 'Infrared Laser & Speckle',
      description:
        'Seamlessly captures geometry without placing sticky reflective targets on your parts or delicate artifacts.',
      highlight: 'No Targets',
    },
    {
      badge: 'COLOR-ACCURATE',
      title: '24-Bit Color Texture',
      description:
        'Integrated RGB optical sensors map vivid, photorealistic colors and reflections onto the 3D polygon mesh.',
      highlight: '24-Bit RGB',
    },
    {
      badge: 'WIRELESS',
      title: 'Wireless Handle Ready',
      description:
        'Optional wireless battery handle frees operators from cables for convenient scanning of large objects and outdoor field capture.',
      highlight: 'Cable-Free',
    },
  ],
  technologies: [
    {
      title: '22-Line Infrared Laser',
      subtitle: 'High-Density Surface Geometry Capture',
      description:
        'Projects 22 high-intensity infrared laser lines across difficult, reflective or dark surfaces without requiring spray powder.',
      stat: '22 Lines',
      statLabel: 'Infrared Matrix',
    },
    {
      title: 'Infrared VCSEL Structured Light',
      subtitle: 'Rapid Full-Field Acquisition',
      description:
        'Class-1 eye-safe VCSEL structured infrared projection enables ultra-fast full-body scanning, facial capture, and delicate museum artifact digitization.',
      stat: '80 FPS',
      statLabel: 'Tracking Frame Rate',
    },
    {
      title: 'Dual Field of View (FOV)',
      subtitle: 'Versatility from Micro to Macro',
      description:
        'Adaptive optical lenses dynamically capture fine features from 140 × 140 mm up to expansive 490 × 490 mm envelopes in a single scanning session.',
      stat: '490 mm',
      statLabel: 'Max Single FOV',
    },
    {
      title: 'Advanced Hybrid Alignment',
      subtitle: 'Seamless Tracking in Complex Environments',
      description:
        'Combines geometric feature recognition, surface color texture tracking, and marker dots to maintain continuous tracking even on flat or featureless surfaces.',
      stat: 'Hybrid',
      statLabel: 'Geometry + Texture',
    },
    {
      title: 'Texture & Geometry Capture',
      subtitle: 'True-to-Life 3D Digital Twins',
      description:
        'Synchronized color photography embeds realistic albedo maps into exported OBJ/PLY models, ready for 3D color printing, gaming, CGI, and VR applications.',
      stat: '24-Bit',
      statLabel: 'Photoreal Depth',
    },
    {
      title: 'Marker-Free Scanning',
      subtitle: 'Zero Part Preparation',
      description:
        'Eliminates time-consuming target placement on heritage relics, human bodies, and soft materials with instantaneous feature lock.',
      stat: '100%',
      statLabel: 'Zero Setup Prep',
    },
  ],
  specifications: {
    'Accuracy': 'Up to 0.08 mm',
    'Point Distance': '0.1 – 5 mm adjustable',
    'Alignment Modes': 'Hybrid / Markers / Texture / Geometric Features',
    'Texture Capture': 'Yes, 24-bit True Color RGB mapping',
    'Scanning Distance (IR Laser)': '150 – 1,000 mm',
    'Scanning Distance (Structured Light)': '150 – 1,500 mm',
    'Field of View': '140 × 140 mm – 490 × 490 mm',
    'Scanning Frame Rate': 'Up to 80 FPS (Marker Alignment) / Up to 30 FPS (Structured Light)',
    'Scanning Speed (IR Laser)': 'Up to 2,450,000 points/second',
    'Scanning Speed (Structured Light)': 'Up to 4,500,000 points/second',
    'Output Formats': 'OBJ, STL, PLY, ASC, MK2, TXT, EPI, API, SPI, MAP, SK',
    'Wireless Support': 'Supported with optional rechargeable battery handle',
    'Scanner Dimensions': '215 × 73 × 53 mm',
    'Scanner Weight': '550 g (ultra-lightweight handheld)',
    'Data Interface': 'High-Speed USB 3.0 / Wireless 6',
    'Operating Temperature': '0°C – 40°C',
    'Operating Humidity': '10% – 90% non-condensing',
    'Eye Safety Certification': 'Class 1 Eye-Safe Infrared Source',
  },
  applications: [
    {
      title: '3D Printing & Additive Manufacturing',
      description: 'Generates watertight STL/OBJ meshes ready for direct FDM, DLP, and color binder jetting.',
      icon: 'Printer',
      tag: 'Prototyping',
    },
    {
      title: 'Reverse Engineering',
      description: 'Extracts exact CAD surface profiles and geometric dimensions for re-manufacturing obsolete parts.',
      icon: 'Settings',
      tag: 'Engineering',
    },
    {
      title: 'Product Design & Ergonomics',
      description: 'Digitizes hand-sculpted clay models, packaging, and custom consumer product casings.',
      icon: 'Box',
      tag: 'Industrial Design',
    },
    {
      title: 'Cultural Heritage & Museums',
      description: 'Non-contact, safe scanning of precious sculptures, pottery, and historical artifacts with color preservation.',
      icon: 'Landmark',
      tag: 'Preservation',
    },
    {
      title: 'Medical & Rehabilitation',
      description: 'Safe human body digitization for customized orthopedic braces, prosthetics, and aesthetic orthotics.',
      icon: 'HeartPulse',
      tag: 'Healthcare',
    },
    {
      title: 'Art & Creative CGI',
      description: 'Scans real-world objects with photographic textures directly into Unreal Engine, Unity, and Blender.',
      icon: 'Palette',
      tag: 'Digital Media',
    },
    {
      title: 'Education & Academic Research',
      description: 'Accessible learning tool for engineering universities, design institutes, and STEM laboratories.',
      icon: 'GraduationCap',
      tag: 'Academia',
    },
    {
      title: 'Digital Archiving & Inspection',
      description: 'Creates permanent 3D digital records for insurance verification, cataloging, and archival databases.',
      icon: 'Archive',
      tag: 'Inspection',
    },
  ],
  workflow: [
    {
      step: '01',
      title: 'Quick Calibration & Capture',
      description: 'Power on and initiate real-time scanning without marker dots or surface powder.',
      stage: 'Optical Acquisition',
      icon: 'Scan',
    },
    {
      step: '02',
      title: 'High-Density Point Cloud',
      description: 'Processes millions of coordinates per second into clean, filtered 3D spatial points.',
      stage: 'Point Cloud Processing',
      icon: 'Layers',
    },
    {
      step: '03',
      title: 'Watertight Mesh & Texture',
      description: 'Applies automated hole-filling, normal alignment, and 24-bit photoreal texture fusion.',
      stage: 'Polygon Generation',
      icon: 'ShieldCheck',
    },
    {
      step: '04',
      title: 'Export to CAD / 3D Printing',
      description: 'Exports STEP, OBJ, or STL files directly into QuickSurface, SketchUp, or slicer software.',
      stage: 'CAD Integration',
      icon: 'ArrowRight',
    },
  ],
  seo: {
    title: '3DeVOK MQ 3D Color Scanner | Professional 3D Scanning | Leniva CAD Solutions',
    description:
      'Explore the 3DeVOK MQ 3D Color Scanner at Leniva CAD Solutions. Up to 0.08 mm accuracy, 24-bit color texture mapping, 4.5M points/sec, marker-free scanning, and optional wireless handle.',
    keywords: [
      '3DeVOK MQ',
      '3D Color Scanner',
      'Handheld 3D Scanner India',
      'Wireless 3D Scanner',
      'Full Color 3D Scanning',
      'Leniva CAD Solutions',
    ],
  },
}

export const devokMTData: ScannerProductDetail = {
  id: '3devok-mt',
  slug: '3devok-mt',
  name: '3DeVOK MT Professional 3D Scanner',
  modelName: '3DeVOK MT',
  tagline: 'Industrial-Grade 3D Scanning. Built for Precision.',
  subtitle: 'High-Precision Multi-Laser Array with 34 Blue + 22 Infrared Lines',
  description:
    'The 3DeVOK MT is a professional high-performance 3D scanner designed for reverse engineering, quality inspection, product design, 3D measurement, digital archiving, visualization and industrial applications.',
  trustLine:
    'VDI/VDE 2634 compliant industrial inspection solution trusted by automotive, aerospace, and precision tooling manufacturers.',
  heroImage: '/images/products/3devok-mt.png',
  transparentImage: '/images/products/3devok-mt.png',
  brochureUrl: '/brochures/3devok-mt.pdf',
  galleryImages: [
    '/images/products/3devok-mt.png',
    '/images/scanners/scanner-inspection.jpg',
    '/images/scanners/scanner-color-texture.jpg',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  ],
  keySpecsSummary: {
    accuracy: 'Up to 0.04 mm + 0.06 mm/m',
    resolution: '0.05 mm Industrial Resolution',
    speed: 'Up to 3,500,000 pts/s',
    technology: '34 Blue + 22 IR Laser Lines',
    color: 'High-Fidelity Color Restoration',
    wireless: 'Industrial High-Speed Interface',
  },
  features: [
    {
      badge: 'EFFICIENT',
      title: 'Fast & Target-Free Operation',
      description:
        'No targets needed on geometric objects. Advanced hybrid alignment enables fast, stable scanning with zero production downtime.',
      highlight: 'No Targets Needed',
    },
    {
      badge: 'ROBUST',
      title: '0.04 mm High Precision Accuracy',
      description:
        'Delivers 0.05 mm fine resolution and 0.04 mm basic accuracy with vivid color restoration for demanding inspection benchmarks.',
      highlight: '0.04 mm Accuracy',
    },
    {
      badge: 'RELIABLE',
      title: 'All-Environment Scanning',
      description:
        'Easily captures shiny machined metals, deep black plastics, carbon fiber composites, and varied industrial workshop lighting.',
      highlight: 'High Ambient Rejection',
    },
    {
      badge: 'VERSATILE',
      title: 'Multi-Size Adaptability',
      description:
        'From coin-sized miniature parts up to full-scale automotive chassis and aerospace tooling, without changing scanner hardware.',
      highlight: 'Micro to Macro',
    },
  ],
  technologies: [
    {
      title: '34 Blue Laser Lines',
      subtitle: 'Ultra-Fine Surface Detail & Reflective Part Scanning',
      description:
        'High-density blue laser cross-grid arrays effortlessly scan mirror-polished chrome, glossy automotive paint, and intricate machined molds with zero anti-glare spray.',
      stat: '34 Lines',
      statLabel: 'Blue Laser Grid',
    },
    {
      title: '22 Infrared Laser Lines',
      subtitle: 'Deep Cavity & Deep Crevice Penetration',
      description:
        'Infrared optical lines penetrate deep pockets, blind holes, and complex mechanical assemblies that conventional structured light scanners fail to reach.',
      stat: '22 Lines',
      statLabel: 'Infrared Penetration',
    },
    {
      title: 'Large-Area Infrared Speckle',
      subtitle: 'Rapid Volumetric Geometry Capture',
      description:
        'Wide-area VCSEL speckle projection captures large casting bodies, automotive body panels, and architectural surfaces in seconds.',
      stat: 'Speckle',
      statLabel: 'Wide Area Mode',
    },
    {
      title: 'Advanced Hybrid Alignment',
      subtitle: 'Multi-Sensory Coordinate Locking',
      description:
        'Simultaneously fuses geometric feature tracking, surface texture contrast, and optional photogrammetry targets for seamless large-scale coordinate continuity.',
      stat: '0.04 mm',
      statLabel: 'Repeatability',
    },
    {
      title: 'Marker-Free Scanning',
      subtitle: 'Zero Setup Overheads',
      description:
        'Accelerates first-article inspection by capturing complex mechanical assemblies immediately upon unboxing without adhering target dots.',
      stat: 'Instant',
      statLabel: 'Point-and-Shoot',
    },
    {
      title: 'Multi-Size Scanning Range',
      subtitle: 'Scalable from 10 mm to 4,000 mm Workpieces',
      description:
        'Engineered for comprehensive plant versatility: inspect tiny turbine blade trailing edges or measure complete sheet-metal stamping dies with equal precision.',
      stat: '4 Meters',
      statLabel: 'Max Part Envelope',
    },
    {
      title: 'Vivid Color Restoration',
      subtitle: 'Color Inspection & Digital Twin Realism',
      description:
        'High-resolution internal RGB cameras project true color values directly onto inspection points, ideal for wear analysis, corrosion detection, and 3D visualization.',
      stat: 'RGB HD',
      statLabel: 'True Color Map',
    },
  ],
  specifications: {
    'Resolution': 'Up to 0.05 mm',
    'Volumetric Accuracy': 'Up to 0.04 mm + 0.06 mm/m (Marker Alignment Mode)',
    'Light Source': '34 Blue Laser Lines + 22 Infrared Laser Lines + Large-Area Infrared Speckle',
    'Alignment Technology': 'Geometric Features, Texture, Photogrammetric Targets, Hybrid Alignment',
    'Scanning Modes': 'Ultra-Fast Blue Laser, Deep-Hole IR Laser, Large-Format Speckle',
    'Scanning Speed': 'Up to 3,500,000 points/second',
    'Scanning Working Distance': '150 mm – 1,200 mm',
    'Field of View': '180 × 160 mm – 520 × 500 mm',
    'Output Data Formats': 'STEP, IGES, OBJ, STL, PLY, ASC, TXT, MK2',
    'Photogrammetry Compatibility': 'Compatible with industrial scale bars and optical coordinate probes',
    'Weight': '890 g (balanced industrial ergonomics)',
    'Data Interface': 'High-Speed USB 3.0 / Industrial Ethernet',
    'Operating Temperature': '-10°C – 45°C',
    'Industrial Protection': 'IP54 Dust & Splash Resistant Enclosure',
    'Inspection Software': 'Direct live interface with Geomagic Control X, PolyWorks, GOM Inspect & QuickSurface',
  },
  applications: [
    {
      title: 'Automotive & BIW Inspection',
      description: 'Sheet metal stamped panels, chassis alignment, engine blocks, and vehicle interior fitment.',
      icon: 'Car',
      tag: 'Automotive',
    },
    {
      title: 'Aerospace & Defense Tooling',
      description: 'Turbine blades, wing spars, composite tooling dies, and flight-critical structural verification.',
      icon: 'Plane',
      tag: 'Aerospace',
    },
    {
      title: 'Heavy Machinery & Manufacturing',
      description: 'Large sand castings, welded frames, industrial gears, and heavy earthmoving assemblies.',
      icon: 'Cog',
      tag: 'Manufacturing',
    },
    {
      title: 'Parametric Reverse Engineering',
      description: 'Converts worn or un-documented physical dies into editable native STEP/IGES CAD geometry.',
      icon: 'Settings',
      tag: 'CAD Modeling',
    },
    {
      title: 'First-Article Quality Inspection',
      description: 'Automated GD&T tolerance deviation color heat maps with exportable PDF inspection certificates.',
      icon: 'ShieldCheck',
      tag: 'Quality Assurance',
    },
    {
      title: 'Tool & Die Wear Measurement',
      description: 'Detects sub-millimeter tooling wear, stamping erosion, and thermal warpage before part failure.',
      icon: 'Gauge',
      tag: 'Tooling',
    },
    {
      title: 'Medical Devices & Orthopedic Implants',
      description: 'High-precision inspection of titanium joint implants, custom cranial plates, and medical instruments.',
      icon: 'HeartPulse',
      tag: 'Medical',
    },
    {
      title: 'Cultural Heritage & Large Monuments',
      description: 'Milimetric structural digitization of architectural facades, historic bronzes, and temple sculptures.',
      icon: 'Landmark',
      tag: 'Heritage',
    },
  ],
  workflow: [
    {
      step: '01',
      title: 'Capture',
      description: 'Scan the workpiece using 34 blue laser lines or infrared speckle with real-time feedback.',
      stage: '3D Optical Scanning',
      icon: 'Scan',
    },
    {
      step: '02',
      title: 'Process',
      description: 'Instant GPU point cloud generation, noise filtering, and automated polygon mesh reconstruction.',
      stage: 'Dense Point Cloud & Mesh',
      icon: 'Layers',
    },
    {
      step: '03',
      title: 'Analyze',
      description: 'Compare scan against original CAD math model with GD&T deviation heat-map analysis.',
      stage: 'Quality Inspection',
      icon: 'ShieldCheck',
    },
    {
      step: '04',
      title: 'Export',
      description: 'Direct export to native STEP/IGES, QuickSurface, SOLIDWORKS, or inspection PDF reports.',
      stage: 'CAD & QC Delivery',
      icon: 'ArrowRight',
    },
  ],
  seo: {
    title: '3DeVOK MT Professional 3D Scanner | Industrial 3D Scanning | Leniva CAD Solutions',
    description:
      'Discover the 3DeVOK MT Professional 3D Scanner at Leniva CAD Solutions. 34 blue laser lines, 22 IR lines, 0.04 mm accuracy, 0.05 mm resolution, and marker-free 3D laser scanning.',
    keywords: [
      '3DeVOK MT',
      'Industrial 3D Scanner',
      'Blue Laser 3D Scanner',
      'High-Precision 3D Scanner India',
      'Reverse Engineering Scanner',
      'Leniva CAD Solutions',
    ],
  },
}

export const scannerComparisonRows = [
  {
    feature: 'Scanning Technology',
    mq: '22-Line Infrared Laser + VCSEL Structured Light',
    mt: '34 Blue Laser Lines + 22 IR Lines + Large-Area Speckle',
    winner: 'mt',
  },
  {
    feature: 'Scanning Accuracy',
    mq: 'Up to 0.08 mm',
    mt: 'Up to 0.04 mm + 0.06 mm/m',
    winner: 'mt',
  },
  {
    feature: 'Point Resolution',
    mq: '0.1 mm point distance',
    mt: 'Up to 0.05 mm fine resolution',
    winner: 'mt',
  },
  {
    feature: 'Scanning Speed',
    mq: 'Up to 4,500,000 points/second',
    mt: 'Up to 3,500,000 points/second',
    winner: 'mq',
  },
  {
    feature: 'Color & Texture Capture',
    mq: '24-Bit Photorealistic RGB Color Mapping',
    mt: 'High-Fidelity Color Restoration & Texture Map',
    winner: 'mq',
  },
  {
    feature: 'Field of View (FOV)',
    mq: '140 × 140 mm up to 490 × 490 mm',
    mt: '180 × 160 mm up to 520 × 500 mm',
    winner: 'mt',
  },
  {
    feature: 'Wireless Operation',
    mq: 'Supported via Optional Rechargeable Handle',
    mt: 'Tethered High-Speed Industrial USB 3.0 / GigE',
    winner: 'mq',
  },
  {
    feature: 'Target / Marker Requirement',
    mq: 'Marker-Free Geometry & Texture Tracking',
    mt: 'Marker-Free Hybrid + Optional Photogrammetry Targets',
    winner: 'both',
  },
  {
    feature: 'Best Use Case',
    mq: 'Product Design, 3D Printing, Color Archiving, Heritage & Medical',
    mt: 'Automotive BIW, Aerospace Tooling, GD&T Inspection & Heavy Die Reverse Engineering',
    winner: 'both',
  },
]

export const allScannersCatalog = [
  devokMQData,
  devokMTData,
]

export function getScannerBySlug(slug: string): ScannerProductDetail | undefined {
  if (slug === '3devok-mq' || slug === 'mq') return devokMQData
  if (slug === '3devok-mt' || slug === 'mt') return devokMTData
  return undefined
}
