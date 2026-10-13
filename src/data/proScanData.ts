export interface ProScanPlan {
  id: string
  name: string
  tagline: string
  positioning: string
  description: string
  platform: string
  billing: string
  pricingUsd: string
  pricingIndia: string
  features: string[]
  officialUrl: string
  lastVerified: string
}

export interface ProScanToolItem {
  id: string
  name: string
  role: string
  tagline: string
  description: string
  inclusionStatus: 'Included in Pro Scan' | 'Available in Ecosystem' | 'Verify Plan Entitlement'
  platform: 'Windows Desktop' | 'Web & iPad' | 'Cloud Browser'
  features: string[]
  officialDocUrl: string
}

export interface ProScanWorkflowStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface ProScanFeatureCard {
  id: string
  title: string
  eyebrow: string
  description: string
  iconName: string
  image: string
  tag: string
  linkTarget: string
}

export interface ProScanApplication {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface ProScanGalleryItem {
  id: string
  title: string
  category: 'pointcloud' | 'asbuilt' | 'restoration' | 'construction' | 'layout' | 'comparison'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  attribution?: string
}

export interface ProScanFaq {
  q: string
  a: string
  category: 'general' | 'pointcloud' | 'platform' | 'comparison' | 'licensing'
}

export interface ProScanComparisonRow {
  feature: string
  sketchUpPro: string
  sketchUpProScan: string
  sketchUpStudio: string
  note?: string
}

export interface ProScanData {
  identity: {
    productName: string
    brand: string
    category: string
    productType: string
    platform: string
    headline: string
    supportingHeadline: string
    shortDescription: string
    officialUrl: string
    pricingUrl: string
    scanEssentialsUrl: string
    lastChecked: string
  }
  hero: {
    eyebrow: string
    heading: string
    description: string
    image: string
    badge: string
    chips: string[]
    stats: { label: string; value: string }[]
  }
  overview: {
    heading: string
    intro: string
    cards: { title: string; desc: string; icon: string; image: string }[]
  }
  benefits: {
    heading: string
    subtitle: string
    items: { title: string; desc: string; icon: string }[]
  }
  scanEssentials: {
    heading: string
    subheading: string
    description: string
    formats: string[]
    cards: { title: string; desc: string; icon: string }[]
    splitImageBefore: string
    splitImageAfter: string
  }
  workflow: ProScanWorkflowStep[]
  coreCapabilities: {
    letter: string
    title: string
    heading: string
    content: string
    keyPoints: string[]
    image: string
  }[]
  applications: ProScanApplication[]
  sitePlanning: {
    heading: string
    description: string
    rows: { title: string; desc: string; icon: string }[]
  }
  restoration: {
    heading: string
    description: string
    points: string[]
    images: { historic: string; pointCloud: string; model: string }
  }
  progressVerification: {
    heading: string
    description: string
    notice: string
    steps: { title: string; desc: string }[]
    image: string
  }
  comparisonTable: {
    heading: string
    subtitle: string
    rows: ProScanComparisonRow[]
  }
  includedTools: ProScanToolItem[]
  testimonial: {
    quote: string
    author: string
    role: string
    company: string
  }
  pricing: ProScanPlan
  systemRequirements: {
    category: string
    minimum: string
    recommended: string
    notes?: string
  }[]
  faqs: ProScanFaq[]
  relatedProducts: {
    id: string
    name: string
    brand: string
    description: string
    route: string
    image: string
  }[]
}

export const proScanData: ProScanData = {
  identity: {
    productName: 'SketchUp Pro Scan',
    brand: 'SketchUp by Trimble',
    category: 'Professional 3D Modeling Software',
    productType: 'Scan-to-3D Software Subscription',
    platform: 'Windows Only (Official Pro Scan Subscription Requirement)',
    headline: 'A Scan-to-3D Solution for Real-World Precision',
    supportingHeadline: 'Bring real-world context into your 3D models with point cloud imports, accurate modeling, professional documentation, and integrated workflows—all in one subscription.',
    shortDescription: 'SketchUp Pro Scan combines the professional modeling and documentation capabilities of SketchUp Pro with Scan Essentials point cloud tools. Use real-world scan data as the foundation for site studies, as-built models, construction planning, restoration, progress verification, and detailed project documentation.',
    officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing/sketchup-pro-scan',
    pricingUrl: 'https://sketchup.trimble.com/en/plans-and-pricing',
    scanEssentialsUrl: 'https://help.sketchup.com/en/scan-essentials-sketchup',
    lastChecked: 'Official Trimble SketchUp Pro Scan Specification (October 2024 / Windows-Only)',
  },

  hero: {
    eyebrow: 'SKETCHUP PRO SCAN SUBSCRIPTION',
    heading: 'From Reality to 3D. With Precision.',
    description: 'Bring real-world context into your design process. Import point clouds, model directly from scan data, create professional 2D documentation, and improve project planning with SketchUp Pro Scan on Windows.',
    image: '/images/software/sketchup-scan.jpg',
    badge: 'Scan-to-3D Engineering Solution',
    chips: [
      'Point Cloud Modeling',
      'Scan-to-3D Workflow',
      '2D Documentation in LayOut',
      'Windows Compatible',
    ],
    stats: [
      { label: 'Platform Support', value: 'Windows OS Exclusive' },
      { label: 'Point Cloud Toolset', value: 'Scan Essentials' },
      { label: '2D Construction Sets', value: 'LayOut Included' },
      { label: 'Cloud Collaboration', value: 'Trimble Connect' },
    ],
  },

  overview: {
    heading: 'Real-World Data. Smarter 3D Modeling.',
    intro: 'SketchUp Pro Scan is engineered for professionals who need to work with real-world environments as part of their design and documentation process. By combining point cloud import capabilities with SketchUp’s fluid 3D modeling and LayOut documentation tools, it enables teams to use scan data as context for more informed project decisions.',
    cards: [
      {
        title: 'Work from Real-World Context',
        desc: 'Bring point cloud data into SketchUp and use scanned environments as a reference for modeling and design decisions.',
        icon: 'Scan',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Model with Greater Confidence',
        desc: 'Use scan data to guide geometry, snap directly to point coordinates, and improve alignment with authentic site conditions.',
        icon: 'Crosshair',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Create Professional Documentation',
        desc: 'Move models into LayOut to produce clear 2D permit drawings with dynamic 3D assets and point cloud cross-sections.',
        icon: 'FileText',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Support Project Verification',
        desc: 'Compare a modeled design against scan data to help identify discrepancies between the proposed model and existing conditions.',
        icon: 'Repeat',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },

  benefits: {
    heading: 'The Complete Scan-to-3D Workflow',
    subtitle: 'Streamline project delivery by bringing scan data, 3D modeling, 2D documentation, and customized workflows into one connected Windows solution.',
    items: [
      {
        title: 'Real-World Context',
        desc: 'Use point cloud data to understand the existing built environment and make design decisions with verified site context.',
        icon: 'Globe',
      },
      {
        title: 'Reduced Guesswork',
        desc: 'Reference scanned environments while modeling, helping teams eliminate field assumptions and avoid costly design clashes.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Fewer Unnecessary Site Visits',
        desc: 'Review and inspect comprehensive project conditions remotely through high-density point clouds, reducing travel overhead.',
        icon: 'Search',
      },
      {
        title: 'Better Project Coordination',
        desc: 'Bring modeling and documentation into a single connected pipeline so teams can communicate project milestones clearly.',
        icon: 'Users',
      },
      {
        title: 'Restoration-Aware Modeling',
        desc: 'Document historic structures and plan conservation while retaining a millimeter-accurate digital record of the heritage condition.',
        icon: 'Building2',
      },
      {
        title: 'Customized Workflows',
        desc: 'Leverage SketchUp’s extensible modeling environment and Extension Warehouse plugins to tailor workflows to specific project demands.',
        icon: 'Sliders',
      },
    ],
  },

  scanEssentials: {
    heading: 'Bring Point Clouds Directly into Your Modeling Workflow',
    subheading: 'Scan Essentials — Point Cloud Tools for SketchUp',
    description: 'Scan Essentials is the point cloud toolset included with the Pro Scan subscription. It enables architects, surveyors, and general contractors to import point cloud datasets directly into SketchUp and use them as an interactive reference for modeling real-world environments with zero viewport lag.',
    formats: ['E57 (ASTM Standard)', 'LAS & LAZ (LiDAR)', 'RWP (Trimble RealWorks)', 'TZF (Trimble Scanners)', 'PLY (Polygon Format)'],
    cards: [
      {
        title: 'Point Cloud Import',
        desc: 'Import supported point cloud files directly into SketchUp on Windows without exhausting system RAM or choking viewport frame rates.',
        icon: 'UploadCloud',
      },
      {
        title: 'Model on Point Clouds',
        desc: 'Snap native SketchUp lines, arcs, and solids directly to cloud coordinate points to trace as-built walls, slabs, and columns.',
        icon: 'Box',
      },
      {
        title: 'Real-World Design Context',
        desc: 'Use scanned surroundings to evaluate sight lines, daylight exposure, neighboring building heights, and property boundaries.',
        icon: 'Eye',
      },
      {
        title: 'Model Comparison Analysis',
        desc: 'Compare the 3D model with point cloud data using inspection heat maps to identify alignment differences and modeling tolerances.',
        icon: 'CheckSquare',
      },
      {
        title: 'Scan-Based Project Review',
        desc: 'Review point cloud slices alongside the modeled proposal to improve stakeholder understanding of existing structural constraints.',
        icon: 'Search',
      },
      {
        title: 'Point Cloud Visualization in LayOut',
        desc: 'Insert sectioned point cloud viewports directly onto 2D LayOut drawing sheets for hybrid as-built permit packages.',
        icon: 'FileText',
      },
    ],
    splitImageBefore: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    splitImageAfter: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },

  workflow: [
    {
      stepNumber: '01',
      title: 'Capture Existing Environment',
      shortTitle: 'Capture',
      subtitle: 'Field Survey & Reality Capture',
      description: 'Collect existing physical conditions using terrestrial 3D laser scanners, mobile SLAM mapping rigs, or drone LiDAR photogrammetry.',
      tools: ['Terrestrial Scanners', 'LiDAR Rigs', 'Photogrammetry'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: 'Field Survey',
    },
    {
      stepNumber: '02',
      title: 'Import Scan Data',
      shortTitle: 'Import',
      subtitle: 'Load Into Scan Essentials',
      description: 'Bring compatible E57, LAS, LAZ, RWP, or TZF point cloud files directly into SketchUp Desktop on Windows with hardware-accelerated rendering.',
      tools: ['Scan Essentials Extension', 'E57 Importer', 'Point Cloud Manager'],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      badge: 'Data Ingestion',
    },
    {
      stepNumber: '03',
      title: 'Build the 3D Model',
      shortTitle: 'Model',
      subtitle: 'Accurate Geometry Authoring',
      description: 'Use the point cloud as context to draw 3D geometry, site models, architectural masses, or as-built structural elements with direct vertex snapping.',
      tools: ['SketchUp Desktop', 'Vertex Snapping', 'Dynamic Components'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: '3D Modeling',
    },
    {
      stepNumber: '04',
      title: 'Visualize the Design',
      shortTitle: 'Visualize',
      subtitle: 'Contextual Design Realism',
      description: 'Present proposed models surrounded by authentic scan context and generate materials from point cloud textures where supported.',
      tools: ['Native Viewport', 'Point Cloud Shading', 'Style Builder'],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      badge: 'Contextual 3D',
    },
    {
      stepNumber: '05',
      title: 'Document in 2D with LayOut',
      shortTitle: 'Document',
      subtitle: 'Scaled Drawing Sheets',
      description: 'Send live-linked model views and point cloud cross-sections to LayOut for scaled 2D permit drawings, elevations, and dimensioned details.',
      tools: ['LayOut 2D Drafting', 'Vector & Hybrid Modes', 'DWG & PDF Export'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      badge: 'Permit Sets',
    },
    {
      stepNumber: '06',
      title: 'Analyze and Verify',
      shortTitle: 'Verify',
      subtitle: 'Model-to-Scan Comparison',
      description: 'Compare the modeled design against point cloud data to inspect alignment tolerances, verify construction progress, and eliminate discrepancies.',
      tools: ['Model Comparison Tool', 'Deviation Colorizer', 'Trimble Connect'],
      image: '/images/software/sections/scan-verify.jpg',
      badge: 'QA / QC',
    },
  ],

  coreCapabilities: [
    {
      letter: 'A',
      title: 'CREATE',
      heading: 'Model Directly from Point Cloud Data',
      content: 'Build 3D models using point cloud data as a verified reference. Use real-world scan context for site studies, as-built environments, terrain modeling, and architectural design with millimeter vertex snapping.',
      keyPoints: [
        'Use point clouds as live modeling context in the SketchUp viewport.',
        'Develop geometry directly from existing site conditions and building scans.',
        'Create accurate 3D models for renovation, interior fit-out, and planning.',
        'Streamline the entire scan-to-3D workflow within a unified Windows environment.',
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    },
    {
      letter: 'B',
      title: 'VISUALIZE',
      heading: 'Bring Real-World Context into Your Design',
      content: 'Use scan data as spatial context and generate materials from point cloud color textures to enhance design realism. Present proposed building volumes in direct relationship to neighboring structures.',
      keyPoints: [
        'Visualize proposed designs situated directly inside existing site context.',
        'Reference surrounding structures, heritage details, and landscape contours.',
        'Use scan-derived RGB colors and surface textures where supported.',
        'Communicate design intent with clear, uncluttered 3D presentations.',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      letter: 'C',
      title: 'DOCUMENT',
      heading: 'Turn 3D Models into Clear 2D Documentation',
      content: 'Export models to LayOut and document point cloud data in 2D to produce rich permit drawings, construction details, and client presentations linked dynamically to your 3D geometry.',
      keyPoints: [
        'Prepare dimensioned 2D architectural permit and tender drawings.',
        'Integrate 3D model assets and point cloud slices on the same sheet.',
        'Communicate complex existing conditions with annotated section views.',
        'Present project information in an industry-standard, professional format.',
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      letter: 'D',
      title: 'ANALYZE',
      heading: 'Compare Models with Real-World Scan Data',
      content: 'Perform comparison analysis between your 3D model and the imported point cloud. Inspect alignment differences, audit trade installations, and reduce costly guesswork during modeling and review.',
      keyPoints: [
        'Compare modeled geometry directly against captured laser scan points.',
        'Inspect structural alignment and detect dimensional discrepancies.',
        'Support high-precision modeling for heritage and industrial retrofits.',
        'Assist construction planning, trade audits, and project verification.',
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    },
  ],

  applications: [
    {
      id: 'asbuilt',
      title: 'Architecture & As-Built Modeling',
      subtitle: 'Renovation, Retrofits & Existing Building Studies',
      description: 'Bring existing building conditions into a 3D model to support architectural studies, adaptive reuse proposals, and precision as-built documentation.',
      toolTags: ['Scan Essentials', 'SketchUp Desktop', 'LayOut 2D'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      deliverables: ['As-built architectural models', 'Renovation drawings', 'Permit sets', 'Area schedules'],
    },
    {
      id: 'construction',
      title: 'Construction Planning & Site Logistics',
      subtitle: 'Access, Crane Swings & Equipment Layouts',
      description: 'Use point cloud data to analyze site logistics, equipment locations, crane radius clearances, and turning circles as part of active construction planning.',
      toolTags: ['Site Planning', 'Equipment Overlay', 'Trimble Connect'],
      image: '/images/software/sections/aec-construction.jpg',
      deliverables: ['Site logistics layouts', 'Access route plans', 'Equipment clearance diagrams', 'Subcontractor briefings'],
    },
    {
      id: 'restoration',
      title: 'Historical Building Documentation',
      subtitle: 'Heritage Conservation & Preservation Records',
      description: 'Create digital representations of historical sites from scan data for study and restoration planning, preserving a permanent digital record of the structure.',
      toolTags: ['Point Clouds', 'E57 Support', 'High-Res Snapping'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Historic preservation records', 'Stone masonry elevations', 'Structural deformation maps', 'Archival 3D models'],
    },
    {
      id: 'progress',
      title: 'Construction Progress Verification',
      subtitle: 'Audit As-Built Installation vs Design Intent',
      description: 'Review actual site implementation against proposed project models using point clouds and model comparison workflows to catch trade deviations early.',
      toolTags: ['Model Comparison', 'QA / QC Audits', 'Trimble Connect'],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Deviation reports', 'RFI 3D visual markups', 'Trade coordination audits', 'Milestone verification'],
    },
    {
      id: 'terrain',
      title: 'Terrain & Site Context Studies',
      subtitle: 'Topography Modeling & Environmental Context',
      description: 'Bring as-built terrain and streetscapes into SketchUp for topographic studies, slope modeling, grading coordination, and contextual visualization.',
      toolTags: ['Drone LiDAR', 'Contour Tracing', 'Topography'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Topographic terrain surfaces', 'Grading plans', 'Sightline analyses', 'Urban context massings'],
    },
    {
      id: 'designbuild',
      title: 'Design-Build Coordination',
      subtitle: 'Cross-Disciplinary Team Communication',
      description: 'Use real-world scan context to support communication between architects, engineers, and general contractors, reviewing spatial constraints together.',
      toolTags: ['LayOut Documentation', 'Trimble Connect', 'Team Review'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Coordinated project models', 'Trade clash resolutions', 'Subcontractor packages', 'Client presentations'],
    },
  ],

  sitePlanning: {
    heading: 'Plan with Real-World Context',
    description: 'Point cloud data helps construction planners and project managers evaluate spatial conditions, clearances, and equipment movement with verified physical context.',
    rows: [
      {
        title: 'Site Logistics & Storage Layouts',
        desc: 'Use scan context to study the true layout of an active site, material laydown yards, and hoarding lines to support planning discussions.',
        icon: 'MapPin',
      },
      {
        title: 'Equipment & Crane Placement',
        desc: 'Analyze heavy equipment locations, boom reach, and surrounding building constraints as part of pre-construction planning.',
        icon: 'Truck',
      },
      {
        title: 'Turning Circles & Access Routes',
        desc: 'Use real-world scan context to review vehicle turning radiuses, delivery truck access clearances, and tight gate restrictions.',
        icon: 'Repeat',
      },
    ],
  },

  restoration: {
    heading: 'Document Existing Structures. Plan for the Future.',
    description: 'Use scan data to create digital representations of historic environments for academic study, documentation, and sensitive restoration planning. Preserve an authentic digital record of the original building while testing modern rehabilitation options.',
    points: [
      'Record existing architectural conditions with millimeter survey fidelity.',
      'Study complex organic shapes, sagging arches, and historic masonry details.',
      'Support heritage restoration planning with authentic baseline geometry.',
      'Create digital reference models for heritage board approvals and archives.',
    ],
    images: {
      historic: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      pointCloud: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      model: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
  },

  progressVerification: {
    heading: 'Compare Design Intent with Actual Conditions',
    description: 'Use point cloud data to review construction progress and compare actual physical implementation against the proposed model. This supports project quality audits, dispute avoidance, and immediate identification of spatial differences.',
    notice: 'Note: Results depend on the quality, resolution, coverage, alignment, and suitability of the captured point cloud data and the project workflow.',
    steps: [
      { title: 'Proposed BIM/CAD Model', desc: 'The intended architectural or structural 3D design authored in SketchUp.' },
      { title: 'Captured Point Cloud', desc: 'Authentic 3D laser scan points captured on-site during active construction.' },
      { title: 'Model Comparison Analysis', desc: 'Visual inspection highlighting spatial alignment, trade clearances, and variances.' },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },

  comparisonTable: {
    heading: 'Choose the Workflow That Fits Your Projects',
    subtitle: 'Understand the clear distinction between SketchUp Pro, SketchUp Pro Scan, and SketchUp Studio based on official Trimble plan specifications.',
    rows: [
      { feature: 'Professional 3D Desktop Modeling', sketchUpPro: 'Included (Win / Mac)', sketchUpProScan: 'Included (Windows Only)', sketchUpStudio: 'Included (Windows Only)' },
      { feature: 'LayOut 2D Documentation & Permit Sets', sketchUpPro: 'Included', sketchUpProScan: 'Included', sketchUpStudio: 'Included' },
      { feature: 'Scan Essentials (Point Cloud Ingestion)', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Included (Core Feature)', sketchUpStudio: 'Included' },
      { feature: 'Model Directly on 3D Point Clouds', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Included (Direct Snapping)', sketchUpStudio: 'Included' },
      { feature: 'Point Cloud Comparison & Inspection', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Included', sketchUpStudio: 'Included' },
      { feature: 'Point Cloud 2D Documentation in LayOut', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Included', sketchUpStudio: 'Included' },
      { feature: 'Revit Importer (Native .RVT Ingestion)', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Not included in Pro Scan', sketchUpStudio: 'Included in Studio', note: 'Requires SketchUp Studio' },
      { feature: 'V-Ray Photorealistic Rendering Engine', sketchUpPro: 'Not included in plan', sketchUpProScan: 'Not included in Pro Scan', sketchUpStudio: 'Included in Studio', note: 'Requires SketchUp Studio' },
      { feature: 'Operating System Requirement', sketchUpPro: 'Windows & macOS', sketchUpProScan: 'Windows Only', sketchUpStudio: 'Windows Only' },
      { feature: 'Trimble Connect Cloud Collaboration', sketchUpPro: 'Unlimited Storage', sketchUpProScan: 'Unlimited Storage', sketchUpStudio: 'Unlimited Storage' },
    ],
  },

  includedTools: [
    {
      id: 'scan-essentials',
      name: 'Scan Essentials',
      role: 'Point Cloud Reality Capture Extension',
      tagline: 'Import and accurately model on point clouds',
      description: 'The core point cloud engine included with Pro Scan, enabling users to import massive point cloud datasets, section them with clipping boxes, and snap geometry directly to coordinate vertices.',
      inclusionStatus: 'Included in Pro Scan',
      platform: 'Windows Desktop',
      features: ['E57, LAS, LAZ, RWP, TZF support', 'Direct vertex coordinate snapping', 'Clipping box section planes', 'LayOut 2D point cloud integration'],
      officialDocUrl: 'https://help.sketchup.com/en/scan-essentials-sketchup',
    },
    {
      id: 'desktop',
      name: 'SketchUp for Desktop',
      role: 'Full-Featured 3D Modeler',
      tagline: 'A desktop modeler for creating 3D visuals and more',
      description: 'The industry-standard Windows desktop modeler for building accurate 3D geometry, massing schemes, custom components, and detailed architectural assemblies.',
      inclusionStatus: 'Included in Pro Scan',
      platform: 'Windows Desktop',
      features: ['Unrestricted 3D modeling', 'Solid tools & booleans', 'Dynamic components', 'Ruby extension customization'],
      officialDocUrl: 'https://help.sketchup.com/en/sketchup-desktop',
    },
    {
      id: 'layout',
      name: 'LayOut',
      role: '2D Construction Documentation',
      tagline: 'Create rich 2D documentation with 3D assets',
      description: 'Transform 3D SketchUp models and Scan Essentials point cloud slices into professional 2D construction drawings, permit sets, and client presentations.',
      inclusionStatus: 'Included in Pro Scan',
      platform: 'Windows Desktop',
      features: ['Live dynamic model viewports', 'Scaled architectural dimensioning', 'Hybrid vector/raster rendering', 'High-res PDF and DWG exports'],
      officialDocUrl: 'https://help.sketchup.com/en/layout',
    },
    {
      id: 'analysis-hub',
      name: 'Analysis Hub',
      role: 'Daylight Simulation',
      tagline: 'Perform rapid daylight simulation in SketchUp',
      description: 'Perform early-stage daylight simulations directly inside SketchUp to evaluate natural sunlight patterns, window placement, and daylight factors.',
      inclusionStatus: 'Included in Pro Scan',
      platform: 'Windows Desktop',
      features: ['Rapid daylight simulations', 'Sunlight hour calculations', 'Visual heat maps', 'Early design exploration'],
      officialDocUrl: 'https://help.sketchup.com/',
    },
    {
      id: 'trimble-connect',
      name: 'Trimble Connect Business',
      role: 'Cloud Storage & Coordination',
      tagline: 'Unlimited cloud storage and unlimited projects',
      description: 'Enterprise cloud collaboration hub for sharing 3D models, tracking revision history, reviewing markups, and managing multi-user permissions across project teams.',
      inclusionStatus: 'Available in Ecosystem',
      platform: 'Cloud Browser',
      features: ['Unlimited cloud storage', 'Unlimited active projects', 'BIM clash review tools', 'Role-based access controls'],
      officialDocUrl: 'https://connect.trimble.com/',
    },
    {
      id: '3d-warehouse',
      name: '3D Warehouse',
      role: 'Asset Repository',
      tagline: 'Browse and download millions of pre-built models',
      description: 'Access the world’s largest library of manufacturer-verified 3D components, furniture items, fixtures, building materials, and entourage.',
      inclusionStatus: 'Available in Ecosystem',
      platform: 'Cloud Browser',
      features: ['Millions of 3D models', 'Manufacturer-certified objects', 'AI image search', 'Direct viewport drag-and-drop'],
      officialDocUrl: 'https://3dwarehouse.sketchup.com/',
    },
    {
      id: 'extension-warehouse',
      name: 'Extension Warehouse',
      role: 'Customization & Plugins',
      tagline: 'Customize workflows with third-party extensions',
      description: 'Access hundreds of third-party plugins for parametric modeling, structural analysis, energy estimation, and productivity enhancements.',
      inclusionStatus: 'Available in Ecosystem',
      platform: 'Windows Desktop',
      features: ['One-click extension installation', 'Parametric tools', 'Custom Ruby scripts', 'Productivity macros'],
      officialDocUrl: 'https://extensions.sketchup.com/',
    },
    {
      id: 'web-ipad',
      name: 'SketchUp for Web & iPad',
      role: 'Companion Modeling',
      tagline: 'Sketch, mark up, and collaborate on the go',
      description: 'Access 3D models on job sites or client meetings using touch and Apple Pencil on iPad, or directly in web browsers on Chromebooks and laptops.',
      inclusionStatus: 'Verify Plan Entitlement',
      platform: 'Web & iPad',
      features: ['Apple Pencil markup', 'LiDAR room capture on iPad', 'Browser-based modeling', 'Cloud synchronization'],
      officialDocUrl: 'https://help.sketchup.com/en/sketchup-ipad',
    },
    {
      id: 'sketchup-ai',
      name: 'SketchUp AI Tools',
      role: 'Generative AI',
      tagline: 'AI tools for visualization and geometry creation',
      description: 'Explore AI-assisted concept visualization and style exploration directly from your active 3D viewport using natural language prompts.',
      inclusionStatus: 'Verify Plan Entitlement',
      platform: 'Cloud Browser',
      features: ['Prompt-based stylization', 'Concept mood ideation', 'Material style variations', 'Creative exploration'],
      officialDocUrl: 'https://help.sketchup.com/en/ai-diffusion',
    },
  ],

  testimonial: {
    quote: 'A few inches off is a problem in our world. Point cloud data is the only way to deliver an efficient and accurate project, and I advocate for using the technology every time.',
    author: 'TJ Varghese',
    role: 'Design Director',
    company: 'PSW',
  },

  pricing: {
    id: 'sketchup-pro-scan',
    name: 'SketchUp Pro Scan',
    tagline: 'Professional Scan-to-3D Software Subscription',
    positioning: 'Designed for architects, surveyors, design-build contractors, and restoration specialists.',
    description: 'Combines full SketchUp Pro modeling, LayOut 2D documentation, and Scan Essentials point-cloud reality capture tools in one unified Windows subscription.',
    platform: 'Windows OS Exclusive',
    billing: 'Billed annually per named user',
    pricingUsd: 'Official Commercial Quotes Available on Request',
    pricingIndia: 'Contact Leniva CAD Solutions for current official commercial quotes in INR with GST',
    features: [
      'Full SketchUp for Desktop 3D modeling environment (Windows)',
      'Scan Essentials point-cloud toolset for importing and snapping to scan data',
      'Supported formats: E57, LAS, LAZ, RWP, TZF, PLY',
      'LayOut for dimensioned 2D construction drawings and permit sets',
      'Point-cloud sectioning and 2D documentation inside LayOut',
      'Model-to-point-cloud comparison and deviation inspection',
      'Analysis Hub for early conceptual daylight simulation',
      'Unlimited Trimble Connect Business cloud storage and coordination',
      'Continuous software updates, security patches, and official Trimble support',
    ],
    officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing/sketchup-pro-scan',
    lastVerified: 'Trimble Official Pro Scan Listing (October 2024)',
  },

  systemRequirements: [
    {
      category: 'Operating System',
      minimum: 'Windows 10 64-bit (version 21H2 or later)',
      recommended: 'Windows 11 64-bit (latest update)',
      notes: 'SketchUp Pro Scan is officially offered as a Windows-only subscription. (Scan Essentials runs natively on Windows).',
    },
    {
      category: 'Processor (CPU)',
      minimum: '2.1+ GHz Intel Core or AMD processor',
      recommended: '3.0+ GHz Intel Core i7 / i9 or AMD Ryzen 7 / 9 multi-core',
      notes: 'High single-core clock speeds benefit SketchUp geometry authoring; multi-core performance speeds up point cloud point parsing.',
    },
    {
      category: 'System Memory (RAM)',
      minimum: '8 GB RAM',
      recommended: '32 GB or 64 GB RAM for large point cloud datasets',
      notes: 'High-density laser scans containing 50M+ points benefit significantly from 32GB+ RAM for smooth manipulation.',
    },
    {
      category: 'Graphics Card (GPU)',
      minimum: 'NVIDIA or AMD graphics card with 2 GB VRAM and DirectX 11 support',
      recommended: 'NVIDIA GeForce RTX 4060 / 4070 or RTX A2000 / A4000 with 8GB+ VRAM',
      notes: 'A dedicated graphics card is essential for hardware-accelerated point cloud rendering and viewport navigation.',
    },
    {
      category: 'Storage & Drive',
      minimum: '2 GB available hard-disk space for core installation',
      recommended: '1 TB+ High-Speed NVMe M.2 SSD for storing large raw scan datasets',
      notes: 'NVMe SSDs drastically cut point cloud loading and caching times.',
    },
    {
      category: 'Display & Mouse',
      minimum: '1920 × 1080 resolution',
      recommended: '2560 × 1440 (2K) or 4K IPS display with 3-button scroll wheel mouse',
      notes: 'Three-button scroll wheel mouse is required for orbiting, panning, and vertex snapping.',
    },
    {
      category: 'Internet & Licensing',
      minimum: 'Active broadband internet connection',
      recommended: 'High-speed broadband for Trimble Connect cloud sync',
      notes: 'Internet required for initial license activation, 3D Warehouse access, and cloud updates.',
    },
  ],

  faqs: [
    {
      category: 'general',
      q: 'What is SketchUp Pro Scan?',
      a: 'SketchUp Pro Scan is a Windows-only subscription that combines the professional 3D modeling and LayOut documentation tools of SketchUp Pro with Trimble Scan Essentials point-cloud tools, delivering an end-to-end scan-to-3D workflow.',
    },
    {
      category: 'pointcloud',
      q: 'What is scan-to-3D modeling?',
      a: 'Scan-to-3D modeling is an architectural and surveying workflow that uses point cloud coordinate data captured from real-world physical environments as a digital reference for authoring accurate 3D geometry and as-built BIM models.',
    },
    {
      category: 'pointcloud',
      q: 'What is Scan Essentials?',
      a: 'Scan Essentials is the specialized point cloud toolset included with Pro Scan. It enables users to import massive point cloud datasets into SketchUp, navigate them with zero lag, slice them with dynamic clipping boxes, and snap native SketchUp drawing tools directly to scan coordinates.',
    },
    {
      category: 'pointcloud',
      q: 'Can I model directly on point clouds?',
      a: 'Yes. The official SketchUp Pro Scan page describes modeling directly on point cloud data as the central capability of the subscription. You can snap lines, arcs, rectangles, and push-pull faces directly to laser scan points.',
    },
    {
      category: 'general',
      q: 'Does Pro Scan include LayOut?',
      a: 'Yes. LayOut is included as part of the Pro Scan subscription for transforming 3D models and point cloud slices into scaled 2D construction drawings, permit sets, and presentation sheets.',
    },
    {
      category: 'platform',
      q: 'Is SketchUp Pro Scan available for Mac?',
      a: 'No. The official Trimble product page specifies that the SketchUp Pro Scan subscription is available for Windows only. (While standard SketchUp Pro runs on macOS, the Scan Essentials point cloud extension is developed exclusively for Windows).',
    },
    {
      category: 'pointcloud',
      q: 'Can I use point clouds for construction planning and site logistics?',
      a: 'Yes. Point cloud data provides real-world spatial context for analyzing site access, material storage zones, equipment locations, crane radiuses, and vehicle turning circles before breaking ground.',
    },
    {
      category: 'general',
      q: 'Can Pro Scan be used for historic building restoration?',
      a: 'Yes. It supports digital documentation, heritage study, and restoration planning by using point clouds to record existing irregular geometries and create accurate digital representations of historic structures.',
    },
    {
      category: 'comparison',
      q: 'Can Pro Scan help verify construction progress?',
      a: 'Yes. The official product page highlights using scan data to track job site progress and audit actual implementation against the proposed 3D design to identify dimensional discrepancies early.',
    },
    {
      category: 'general',
      q: 'Does Pro Scan include SketchUp for Desktop?',
      a: 'Yes. SketchUp for Desktop is the core modeling application included in the Pro Scan subscription.',
    },
    {
      category: 'general',
      q: 'Does Pro Scan include SketchUp for Web and iPad?',
      a: 'The official Pro Scan page presents SketchUp for Web and iPad in its broader tool ecosystem. Confirm exact subscription entitlement conditions with Leniva CAD Solutions before purchase.',
    },
    {
      category: 'comparison',
      q: 'Does Pro Scan include V-Ray or Revit Importer?',
      a: 'No. V-Ray photorealistic rendering and the native Revit Importer are exclusive entitlements of the higher-tier SketchUp Studio subscription. Pro Scan focuses specifically on the scan-to-3D modeling and LayOut documentation workflow.',
    },
    {
      category: 'pointcloud',
      q: 'What point cloud formats are supported by Scan Essentials?',
      a: 'Scan Essentials officially supports major industry reality capture formats including E57, LAS, LAZ, RWP (Trimble RealWorks), TZF (Trimble scanners), and PLY files.',
    },
    {
      category: 'licensing',
      q: 'How can I purchase SketchUp Pro Scan in India?',
      a: 'You can contact Leniva CAD Solutions, an authorized Trimble CAD software partner in India, to receive official commercial pricing in INR, tax-compliant GST invoicing, and implementation guidance.',
    },
    {
      category: 'general',
      q: 'Where can I find official Trimble product information?',
      a: 'You can review the official Trimble product page at https://sketchup.trimble.com/en/plans-and-pricing/sketchup-pro-scan.',
    },
  ],

  relatedProducts: [
    {
      id: 'sketchup-studio',
      name: 'SketchUp Studio',
      brand: 'Trimble',
      description: 'The complete architectural bundle combining SketchUp Pro, Scan Essentials, Revit Importer, and V-Ray rendering.',
      route: '/products/sketchup-studio',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vray',
      name: 'Chaos V-Ray',
      brand: 'Chaos',
      description: 'Industry-standard photorealistic ray-tracing rendering software for SketchUp, 3ds Max, and Revit.',
      route: '/products/vray',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'enscape',
      name: 'Chaos Enscape',
      brand: 'Chaos',
      description: 'Real-time rendering and virtual reality walkthrough plugin with 100% live synchronization inside SketchUp.',
      route: '/products/enscape',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3devok-mt',
      name: '3DeVOK MT 3D Scanner',
      brand: '3DeVOK',
      description: 'Metrology-grade handheld 3D laser scanner with 34 blue laser crosses and 0.04 mm precision for capturing reality data.',
      route: '/products/3devok-mt',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    },
  ],
}
