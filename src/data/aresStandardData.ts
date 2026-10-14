export interface AresStandardFeatureItem {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  tag: string
}

export interface AresStandardWorkflowStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface AresStandardUseCase {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface AresStandardComparisonRow {
  capability: string
  aresStandard: string
  aresCommander: string
  highlight?: boolean
  note?: string
}

export interface AresStandardGalleryItem {
  id: string
  title: string
  category: 'workspace' | 'drafting' | 'layers' | 'blocks' | 'dimensions' | 'printing'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  attribution?: string
}

export interface AresStandardFaq {
  q: string
  a: string
  category: 'general' | 'dwg' | 'features' | 'comparison' | 'licensing' | 'technical'
}

export interface AresStandardData {
  identity: {
    productName: string
    brand: string
    category: string
    platform: string
    corePurpose: string
    positioning: string
    valueProposition: string
    officialUrl: string
    pricingUrl: string
    downloadUrl: string
    trialUrl: string
    lastChecked: string
  }
  hero: {
    eyebrow: string
    headline: string
    supportingHeadline: string
    description: string
    highlights: string[]
    image: string
    badge: string
    strip: { label: string; value: string }[]
    trialNote: string
  }
  overview: {
    title: string
    description: string
    blocks: {
      title: string
      subtitle: string
      description: string
      icon: string
      bullets: string[]
    }[]
  }
  benefits: {
    title: string
    subtitle: string
    items: {
      number: string
      title: string
      desc: string
      detail: string
      icon: string
    }[]
  }
  features: {
    title: string
    description: string
    items: AresStandardFeatureItem[]
  }
  workflow: {
    title: string
    description: string
    steps: AresStandardWorkflowStep[]
  }
  useCases: {
    title: string
    intro: string
    image?: string
    items: AresStandardUseCase[]
  }
  comparison: {
    title: string
    description: string
    commanderUrl: string
    rows: AresStandardComparisonRow[]
  }
  platform: {
    title: string
    os: string
    fileFormat: string
    coreUse: string
    relatedProduct: string
    specs: { label: string; value: string; note?: string }[]
    disclaimer: string
  }
  licensing: {
    title: string
    description: string
    officialBuyUrl: string
    disclaimer: string
    tiers: {
      id: string
      name: string
      term: string
      subtitle: string
      pricePlaceholder: string
      features: string[]
      badge?: string
      popular?: boolean
    }[]
  }
  freeTrial: {
    title: string
    description: string
    trialUrl: string
    duration: string
    termsNote: string
  }
  developerApis: {
    title: string
    description: string
    apis: { name: string; desc: string; verified: boolean }[]
    note: string
  }
  trinityContext: {
    title: string
    description: string
    ecosystem: { name: string; role: string; desc: string }[]
    trinityUrl: string
    distinction: string
  }
  comparisonCallout: {
    headline: string
    description: string
  }
  resources: {
    title: string
    items: { title: string; desc: string; url: string; linkText: string; icon: string }[]
  }
  gallery: AresStandardGalleryItem[]
  faqs: AresStandardFaq[]
  relatedProducts: {
    name: string
    slug: string
    category: string
    desc: string
    image: string
  }[]
}

export const aresStandardData: AresStandardData = {
  identity: {
    productName: 'ARES Standard',
    brand: 'Graebert',
    category: '2D DWG-based CAD software',
    platform: 'Windows 64-bit',
    corePurpose: 'Create, view, print and modify 2D technical drawings in DWG format.',
    positioning: 'Cost-effective 2D CAD software for users who occasionally need to create or modify DWG drawings.',
    valueProposition: 'Practical 2D drafting capabilities built on the ARES CAD platform, with native DWG support and a familiar CAD interface.',
    officialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
    pricingUrl: 'https://www.graebert.com/in/cad-software/buy/',
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-standard/',
    trialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
    lastChecked: '2026 Official Documentation',
  },
  hero: {
    eyebrow: 'GRAEBERT | 2D DWG CAD SOFTWARE',
    headline: 'Powerful 2D CAD. Practical by Design.',
    supportingHeadline: 'Create, view and modify DWG drawings with ARES Standard.',
    description: 'ARES Standard is cost-effective 2D CAD software built on the ARES CAD platform. Designed for users who need dependable 2D drafting and DWG editing, it provides familiar CAD tools for creating technical drawings, modifying existing designs and preparing drawings for printing.',
    highlights: [
      'Native DWG support',
      'Complete set of essential 2D drafting tools',
      'Layers, blocks and dimensions',
      'Familiar CAD interface',
      'Windows 64-bit support',
      'Perpetual licensing options, subject to current availability',
    ],
    image: '/images/software/ares-standard.jpg',
    badge: 'Cost-Effective 2D DWG CAD',
    strip: [
      { label: 'Product', value: 'ARES Standard' },
      { label: 'Platform', value: 'Windows 64-bit' },
      { label: 'Core Format', value: 'Native DWG' },
      { label: 'Primary Use', value: '2D Drafting & Editing' },
      { label: 'Trial', value: '30-Day Free Trial' },
    ],
    trialNote: 'Explore ARES Standard with a free trial. Confirm current regional availability and licensing terms before purchase.',
  },
  overview: {
    title: 'Focused 2D CAD for Everyday Drawing Work',
    description: 'ARES Standard is based on the same CAD platform as ARES Commander and is designed for users who primarily work with 2D drawings in DWG format. It provides drafting, editing and printing tools in a cost-effective desktop application for Windows.',
    blocks: [
      {
        title: 'Create 2D Drawings',
        subtitle: 'From Blank Canvas to Complete Drawing',
        description: 'Develop new technical drawings using a range of 2D drafting tools, including layers, blocks and dimensions.',
        icon: 'PenTool',
        bullets: [
          'Lines, polylines, circles, arcs & splines',
          'Precision coordinate entry & object snaps',
          'Standard drafting paper space layouts',
        ],
      },
      {
        title: 'Modify Existing DWG Files',
        subtitle: 'Frictionless DWG Interoperability',
        description: 'Open and edit DWG drawings created with ARES Commander, AutoCAD or other DWG-based CAD software.',
        icon: 'FileEdit',
        bullets: [
          'Native read & write of standard DWG files',
          'Entity trimming, extending, offsets & fillets',
          'Preserve original drawing layers & geometry',
        ],
      },
      {
        title: 'Print and Share Drawings',
        subtitle: 'Deliver Clean Vector Documentation',
        description: 'Review, prepare and print drawings for project documentation and communication with contractors and clients.',
        icon: 'Printer',
        bullets: [
          'High-resolution PDF publishing & plotting',
          'BatchPrint utility for multi-sheet packages',
          'Standard PCX support and PC3 import',
        ],
      },
    ],
  },
  benefits: {
    title: 'Why Choose ARES Standard?',
    subtitle: 'Cost-effective, dependable 2D CAD engineered for everyday engineering and architectural drawing tasks.',
    items: [
      {
        number: '01',
        title: 'DWG Compatibility',
        desc: 'View, print and modify DWG drawings created using ARES Commander, AutoCAD or other DWG-based CAD software.',
        detail: 'Work directly with industry-standard DWG files without cumbersome imports or format conversions.',
        icon: 'FileCode',
      },
      {
        number: '02',
        title: 'Essential 2D Drafting',
        desc: 'Create 2D drawings using layers, blocks, dimensions and a broad set of 2D drafting tools.',
        detail: 'Everything needed for everyday technical drafting, geometry creation, annotations, and detailing.',
        icon: 'PenTool',
      },
      {
        number: '03',
        title: 'Proven CAD Technology',
        desc: 'Built on ARES CAD technology used by professionals worldwide.',
        detail: 'Leverages the established CAD engine developed by Graebert, ensuring reliable desktop drafting performance.',
        icon: 'ShieldCheck',
      },
      {
        number: '04',
        title: 'Cost-Conscious Licensing',
        desc: 'Positioned as an affordable CAD option, with perpetual licensing listed among its available license types.',
        detail: 'Cut CAD software overhead significantly for drafting staff who do not require costly 3D or BIM suites.',
        icon: 'Coins',
      },
      {
        number: '05',
        title: 'Familiar CAD Interface',
        desc: 'A familiar interface intended to make it easier for experienced CAD users to transition from other popular CAD applications.',
        detail: 'Standard command aliases, shortcut keys, properties palettes, and ribbon layouts eliminate switching costs.',
        icon: 'Layout',
      },
    ],
  },
  features: {
    title: 'The Tools You Need for 2D CAD',
    description: 'Explore the verified toolset built into ARES Standard for precision 2D drafting, drawing management, and printing.',
    items: [
      {
        id: 'native-dwg',
        title: 'Native DWG Support',
        subtitle: 'Industry-Standard File Format',
        description: 'Work with DWG drawings as the core file format. ARES Standard can open, view, modify and save supported DWG drawings cleanly across teams.',
        icon: 'FileCode',
        tag: 'Format',
      },
      {
        id: 'drafting-tools',
        title: '2D Drafting Tools',
        subtitle: 'Complete Geometry Toolset',
        description: 'Create and edit technical drawings with common 2D CAD tools: lines, polylines, circles, arcs, rectangles, trimming, chamfers, and offset operations.',
        icon: 'PenTool',
        tag: 'Drafting',
      },
      {
        id: 'layers',
        title: 'Layer Management',
        subtitle: 'Structured Drawing Organization',
        description: 'Organize drawing entities into logical layers with color, linetype, lineweight, and visibility controls to support clearer drawing management.',
        icon: 'Layers',
        tag: 'Organization',
      },
      {
        id: 'blocks-attributes',
        title: 'Blocks & Attributes',
        subtitle: 'Reusable Design Elements',
        description: 'Use standard blocks and blocks with editable attributes as part of 2D drafting workflows for symbols, title blocks, and repeated components.',
        icon: 'Box',
        tag: 'Productivity',
      },
      {
        id: 'dimensions',
        title: 'Dimensions & Annotations',
        subtitle: 'Technical Sizing Standards',
        description: 'Add linear, aligned, radial, angular, and ordinate dimensions to technical drawings to communicate sizes, tolerances, and design intent accurately.',
        icon: 'Ruler',
        tag: 'Annotation',
      },
      {
        id: 'viewing-printing',
        title: 'Drawing Viewing & Printing',
        subtitle: 'Precision Plotting & PDF Export',
        description: 'Open drawings for inspection, set up viewport scales, configure print plot styles, and generate publication-ready PDF and physical prints.',
        icon: 'Printer',
        tag: 'Deliverables',
      },
      {
        id: 'cad-interface',
        title: 'Familiar CAD Interface',
        subtitle: 'Familiar Commands & Toolbars',
        description: 'Features a classic and modern ribbon interface with drawing canvas, properties inspector, tool palettes, and standard keyboard command-line inputs.',
        icon: 'Layout',
        tag: 'Interface',
      },
      {
        id: 'windows-workflow',
        title: 'Windows Desktop Workflow',
        subtitle: 'Native 64-bit Windows Application',
        description: 'Optimized as a focused 64-bit Windows desktop CAD application delivering smooth drafting and rendering for standard workstations.',
        icon: 'Monitor',
        tag: 'Platform',
      },
      {
        id: 'affordable-focus',
        title: 'Affordable 2D CAD Focus',
        subtitle: 'High Value, Low Total Cost',
        description: 'Designed specifically for users who need dependable 2D drafting and DWG editing without paying extra for unneeded 3D, BIM, or cloud modules.',
        icon: 'Coins',
        tag: 'Commercial',
      },
      {
        id: 'perpetual-option',
        title: 'Perpetual License Option',
        subtitle: 'Permanent Software Ownership',
        description: 'The official product comparison lists perpetual licensing options for ARES Standard, giving businesses long-term budget predictability.',
        icon: 'KeyRound',
        tag: 'Licensing',
      },
    ],
  },
  workflow: {
    title: 'From Drawing to Deliverable',
    description: 'A practical, 5-step desktop workflow designed to move smoothly from initial file opening to finalized project prints.',
    steps: [
      {
        stepNumber: '01',
        title: 'Open a DWG Drawing',
        shortTitle: 'Open',
        subtitle: 'Native File Access',
        description: 'Open a supported DWG file created in AutoCAD, ARES Commander, or other CAD applications for review, measurement, or editing.',
        tools: ['DWG File Open', 'Drawing Audit', 'Unit Setup'],
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        badge: 'Step 1: Open',
      },
      {
        stepNumber: '02',
        title: 'Draft and Modify',
        shortTitle: 'Draft',
        subtitle: 'Precision Geometry Creation',
        description: 'Use the complete set of 2D drafting tools to create new geometric entities, modify lines, trim boundaries, and adjust existing design geometry.',
        tools: ['Lines & Polylines', 'Entity Snaps', 'Trim & Extend', 'Offset'],
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        badge: 'Step 2: Drafting',
      },
      {
        stepNumber: '03',
        title: 'Organize Your Drawing',
        shortTitle: 'Organize',
        subtitle: 'Layers, Blocks & Dimensions',
        description: 'Assign entities to dedicated layers, insert reusable blocks with attributes, and add dimension strings to clarify drawing details.',
        tools: ['Layer Manager', 'Block Insertion', 'Dimension Styles', 'Text Formatting'],
        image: '/images/software/sections/ares-std-organize.jpg',
        badge: 'Step 3: Organization',
      },
      {
        stepNumber: '04',
        title: 'Review Your Work',
        shortTitle: 'Review',
        subtitle: 'Layouts & Entity Verification',
        description: 'Switch between Model Space and Paper Space Layouts, inspect entity properties, and verify that drawing scale and lineweights look correct.',
        tools: ['Paper Space Viewports', 'Properties Inspector', 'Distance Measure'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        badge: 'Step 4: Quality Check',
      },
      {
        stepNumber: '05',
        title: 'Print Your Drawing',
        shortTitle: 'Print',
        subtitle: 'Plotting & Batch Export',
        description: 'Prepare the drawing for project documentation, generate vector PDFs, or print sheet sets using BatchPrint and standard PC3 configurations.',
        tools: ['Plot Config (PC3)', 'BatchPrint', 'Vector PDF Export', 'Print Preview'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        badge: 'Step 5: Output',
      },
    ],
  },
  useCases: {
    title: 'Designed for 2D Drawing Workflows',
    intro: 'ARES Standard supports users and teams whose everyday CAD tasks center on creating, viewing, modifying and printing 2D DWG drawings.',
    image: '/images/ares-standard/designed-for-2d-drawing-workflows.jpg',
    items: [
      {
        id: 'arch-drafting',
        title: 'Architectural Drafting',
        subtitle: 'Floor Plans & Elevation Detailing',
        description: 'Create and update architectural floor plans, building sections, site layouts, and technical details using standard 2D drafting tools.',
        toolTags: ['Floor Plans', 'Wall Geometry', 'Door/Window Blocks', 'Dimensions'],
        image: '/images/ares-standard/cad-arch-floorplan.jpg',
        deliverables: ['2D Floor Plans', 'Permit Drawings', 'PDF Submittals'],
      },
      {
        id: 'eng-drafting',
        title: 'Engineering Drafting',
        subtitle: 'Schematics & Structural Details',
        description: 'Prepare and modify 2D engineering drawings, piping schematics, structural connections, and technical documentation.',
        toolTags: ['Geometric Snaps', 'Ordinate Dimensions', 'Hatch Patterns', 'Detail Callouts'],
        image: '/images/ares-standard/cad-eng-schematic.jpg',
        deliverables: ['Engineering Details', 'Fabrication Drawings', 'P&ID Schematics'],
      },
      {
        id: 'mech-drafting',
        title: 'Mechanical Drafting',
        subtitle: '2D Machine Components & Parts',
        description: 'Work on 2D mechanical drawings, component layouts, and machine assembly views with standard dimensioning and tolerances.',
        toolTags: ['Part Outlines', 'Section Views', 'Tolerances', 'Assembly Linework'],
        image: '/images/ares-standard/cad-mech-drafting.jpg',
        deliverables: ['Component Profiles', 'Assembly Layouts', 'Machining Drawings'],
      },
      {
        id: 'construction-docs',
        title: 'Construction Documentation',
        subtitle: 'As-Built Revisions & Contractor Sheets',
        description: 'Review and update 2D plans and project drawings for contractor documentation, markups, and as-built record maintenance.',
        toolTags: ['As-Built Redlines', 'Sheet Viewports', 'BatchPrint', 'DWG Exchange'],
        image: '/images/ares-standard/cad-eng-schematic.jpg',
        deliverables: ['As-Built Drawing Sets', 'Contractor Printouts', 'Punch List Drawings'],
      },
      {
        id: 'interior-design',
        title: 'Interior Design',
        subtitle: 'Space Planning & Furniture Layouts',
        description: 'Create and modify 2D interior layouts, furniture arrangements, partition walls, and reflected ceiling plans.',
        toolTags: ['Furniture Blocks', 'Space Planning', 'Area Dimensions', 'Layer Isolation'],
        image: '/images/ares-standard/cad-interior-space-plan.jpg',
        deliverables: ['Space Plans', 'Furniture Key Plans', 'Joinery Layouts'],
      },
      {
        id: 'education-onboarding',
        title: 'Education and Enablement',
        subtitle: 'Foundational CAD Learning',
        description: 'Support CAD learning, engineering curricula, and foundational 2D drafting exercises in universities and technical technical institutes.',
        toolTags: ['Student Exercises', 'Drafting Principles', 'LISP Basics', 'Classroom Labs'],
        image: '/images/ares-standard/cad-arch-floorplan.jpg',
        deliverables: ['Classroom Lab Drawings', 'Student Portfolios', 'CAD Exercises'],
      },
      {
        id: 'small-business',
        title: 'Small Businesses & Freelancers',
        subtitle: 'Cost-Conscious CAD Operations',
        description: 'Provide a focused, affordable desktop CAD tool for small firms whose workflow centers on opening, editing, and printing DWG drawings.',
        toolTags: ['Low Overhead', 'Native DWG', 'Perpetual Option', 'No Costly Bloat'],
        image: '/images/ares-standard/cad-mech-drafting.jpg',
        deliverables: ['Client DWG Updates', 'Consulting Drawings', 'Print Deliverables'],
      },
    ],
  },
  comparison: {
    title: 'Choose the CAD Capabilities That Fit Your Workflow',
    description: 'ARES Standard is focused on cost-effective 2D DWG drafting and editing. ARES Commander offers a broader feature set that includes additional 2D productivity tools, 3D CAD, BIM-related capabilities, maps and optional collaboration features.',
    commanderUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
    rows: [
      { capability: 'Windows 64-bit', aresStandard: 'Included', aresCommander: 'Included' },
      { capability: 'macOS support', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Linux support', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Same license works across Windows, Mac and Linux', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Perpetual license', aresStandard: 'Listed', aresCommander: 'Listed' },
      { capability: 'Perpetual Flex / network license', aresStandard: 'Verify current terms', aresCommander: 'Listed' },
      { capability: 'Annual plan', aresStandard: 'Listed', aresCommander: 'Listed' },
      { capability: 'Annual Flex / network plan', aresStandard: 'Verify current terms', aresCommander: 'Listed' },
      { capability: 'Three-year plan', aresStandard: 'Listed', aresCommander: 'Listed' },
      { capability: 'Associative patterns / arrays', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Curved text', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Drawing Compare', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'XtraTools productivity features', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Blocks and blocks with attributes', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Use Dynamic Blocks created with AutoCAD', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Convert Dynamic Blocks into Custom Blocks', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Create Custom Blocks equivalent to Dynamic Blocks', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: '2D geometric and dimensional constraints', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'View 3D files saved in DWG', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Create and modify 3D solids', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Import Revit and IFC files with BIM Navigator', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Read BIM properties', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Extract BIM data to tables and Excel', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Extract 2D drawings from BIM projects', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Maps for ARES Commander service powered by Esri', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Georeferenced coordinate system or projection', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Search and locate places', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Satellite, street and topographic base maps', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Trinity commenting and markups', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Trinity cloud drawing synchronization', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Share view-only links for online viewing and comments', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'ARES Touch mobile version', aresStandard: 'Not included', aresCommander: 'Included through applicable Trinity options' },
      { capability: 'ARES Kudo cloud version', aresStandard: 'Not included', aresCommander: 'Included through applicable Trinity options' },
      { capability: 'BatchPrint', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'PCX support / PC3 import', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Sheet Set Manager publishing', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Sheet Set Manager fields', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Optional ARES Render plugin', aresStandard: 'Not included', aresCommander: 'Available as optional plugin' },
      { capability: 'Optional UNDET Point Cloud plugin', aresStandard: 'Not included', aresCommander: 'Available as optional plugin' },
      { capability: 'LISP API', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Visual LISP', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'COM', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Legacy FDT API', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'Tx core ARES API', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
      { capability: 'FxARX compatibility', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Microsoft VSTA', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: 'Microsoft ActiveX', aresStandard: 'Not included', aresCommander: 'Included' },
      { capability: '.NET API', aresStandard: 'Included', aresCommander: 'Included', highlight: true },
    ],
  },
  platform: {
    title: 'A Windows Desktop CAD Solution',
    os: 'Windows 64-bit only',
    fileFormat: 'Native DWG (Read, Edit & Save)',
    coreUse: '2D drawing creation, viewing, modification and printing',
    relatedProduct: 'ARES Commander (Built on the same CAD platform)',
    specs: [
      { label: 'Operating System', value: 'Microsoft Windows (64-bit)', note: 'Windows-only desktop application' },
      { label: 'Architecture', value: '64-bit Architecture', note: 'macOS & Linux not included' },
      { label: 'Primary File Format', value: 'DWG', note: 'Native drawing format' },
      { label: 'Additional Formats', value: 'DXF, DWF, PDF', note: 'Standard CAD exchange and plot formats' },
      { label: 'Printing Subsystem', value: 'BatchPrint & PC3 Plot Support', note: 'Supports standard plotter configurations' },
      { label: 'APIs Supported', value: 'LISP, Visual LISP, COM, FDT, Tx, .NET', note: 'Scripting & automation supported' },
    ],
    disclaimer: 'Please check Graebert’s current system requirements on the official website before installation.',
  },
  licensing: {
    title: 'Flexible Licensing for Your CAD Needs',
    description: 'ARES Standard is positioned as a cost-effective 2D CAD product. The official comparison lists perpetual, annual and three-year licensing options, with certain Flex/network license distinctions between products.',
    officialBuyUrl: 'https://www.graebert.com/in/cad-software/buy/',
    disclaimer: 'Notice: Specific licensing terms, annual subscription rates, perpetual options, and regional availability must be confirmed against Graebert’s current regional policies. Contact Leniva CAD Solutions for official quotes in India.',
    tiers: [
      {
        id: 'annual-plan',
        name: 'Annual Subscription',
        term: '1-Year Term License',
        subtitle: 'Low Upfront Investment',
        pricePlaceholder: 'Request Indian Quote',
        popular: true,
        badge: 'Popular',
        features: [
          'Complete 2D drafting, layer, and dimensioning tools',
          'Native DWG file read, write, and editing',
          'BatchPrint utility & PC3 plotter support',
          'LISP, Visual LISP, COM & .NET automation support',
          'All software updates and service packs during term',
          'Official commercial invoice with GST',
        ],
      },
      {
        id: 'three-year-plan',
        name: '3-Year Subscription',
        term: '3-Year Term License',
        subtitle: 'Multi-Year Cost Predictability',
        pricePlaceholder: 'Request Indian Quote',
        features: [
          'All capabilities included in the Annual Subscription',
          'Price locked for 36 consecutive months',
          'Continuous maintenance and new version upgrades',
          'Direct customer support from Leniva CAD Solutions',
        ],
      },
      {
        id: 'perpetual-plan',
        name: 'Perpetual License',
        term: 'One-Time License Purchase',
        subtitle: 'Permanent Ownership Option',
        pricePlaceholder: 'Request Indian Quote',
        features: [
          'Permanent ownership of ARES Standard desktop license',
          'No required monthly or recurring subscription renewal',
          'Includes initial maintenance period for updates and support',
          'Optional annual maintenance renewal for upgrades',
          'Network / Flex licensing subject to current verification',
        ],
      },
    ],
  },
  freeTrial: {
    title: 'Explore ARES Standard Before You Decide',
    description: 'Experience ARES Standard through the 30-day free trial option advertised on the official product page. Evaluate its drafting tools, interface, and DWG compatibility on your own technical drawings.',
    trialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
    duration: '30 Days',
    termsNote: 'Confirm the current trial terms, eligibility and activation process on Graebert’s official website.',
  },
  developerApis: {
    title: 'Built on the ARES CAD Platform',
    description: 'ARES Standard is based on the same CAD platform as ARES Commander. Graebert describes its broader CAD platform as supporting APIs and development technologies for custom automation.',
    apis: [
      { name: 'LISP', desc: 'Standard LISP scripting for routine drafting automation and custom command routines.', verified: true },
      { name: 'Visual LISP', desc: 'Extended LISP environment for advanced drafting calculations and entity handling.', verified: true },
      { name: 'COM', desc: 'Component Object Model integration for Windows desktop automation.', verified: true },
      { name: 'Legacy FDT API', desc: 'Graebert legacy C++ application programming interface support.', verified: true },
      { name: 'Tx Core ARES API', desc: 'Core C++ programming interface for high-performance extensions.', verified: true },
      { name: '.NET API', desc: 'Modern Microsoft .NET framework integration for managed plugin development.', verified: true },
    ],
    note: 'Developers should confirm API availability and version compatibility with Graebert before embarking on custom development.',
  },
  trinityContext: {
    title: 'Need Desktop, Cloud and Mobile Collaboration?',
    description: 'ARES Trinity is Graebert’s broader collaboration ecosystem involving ARES Commander for desktop CAD, ARES Kudo for cloud-based CAD, and ARES Touch for mobile CAD. ARES Standard is the focused Windows desktop product and does not include Trinity collaboration features unless explicitly confirmed by a specific license.',
    distinction: 'ARES Standard is optimized for independent Windows desktop 2D drafting. If your team requires cloud drawing synchronization, browser-based commenting, or mobile CAD on iPads/Android devices, explore ARES Commander with Trinity.',
    ecosystem: [
      { name: 'ARES Standard', role: 'Windows Desktop 2D CAD', desc: 'Cost-effective 2D drafting and DWG editing on local 64-bit Windows workstations.' },
      { name: 'ARES Commander', role: 'Full Desktop CAD Suite', desc: 'Comprehensive 2D/3D CAD on Windows, macOS, and Linux with BIM and Trinity options.' },
      { name: 'ARES Kudo', role: 'Cloud-Based CAD', desc: 'View, share, and edit DWG drawings online in any web browser without installation.' },
      { name: 'ARES Touch', role: 'Mobile CAD for Tablets & Phones', desc: 'Take DWG drawings to the job site on iOS and Android devices.' },
    ],
    trinityUrl: 'https://www.graebert.com/',
  },
  comparisonCallout: {
    headline: 'Need More Than 2D Drafting?',
    description: 'If your workflow requires 3D solid modeling, BIM tools, broader platform support (macOS/Linux) or integrated cloud and mobile collaboration, explore ARES Commander and the wider ARES product family.',
  },
  resources: {
    title: 'Get Help as You Work',
    items: [
      {
        title: 'Official Graebert Support',
        desc: 'Access the official Graebert customer support knowledge base and ticketing system.',
        url: 'https://help.graebert.com/',
        linkText: 'Visit Help Portal',
        icon: 'Headphones',
      },
      {
        title: 'Graebert Academy',
        desc: 'Explore online learning courses, video tutorials, and certification resources.',
        url: 'https://www.graebert.academy/',
        linkText: 'Explore Courses',
        icon: 'GraduationCap',
      },
      {
        title: 'Official Graebert Website',
        desc: 'Learn more about Graebert CAD technologies, corporate news, and product releases.',
        url: 'https://www.graebert.com/',
        linkText: 'Visit Graebert.com',
        icon: 'Globe',
      },
      {
        title: 'Product Documentation',
        desc: 'Read official command references, user guides, and technical documentation.',
        url: 'https://www.graebert.com/in/cad-software/ares-standard/',
        linkText: 'Read Documentation',
        icon: 'BookOpen',
      },
      {
        title: 'Leniva Sales Consultation',
        desc: 'Talk with our CAD software team in India for commercial quotations and deployment guidance.',
        url: '#quote-form',
        linkText: 'Contact Our Team',
        icon: 'PhoneCall',
      },
    ],
  },
  gallery: [
    {
      id: 'ares-standard-canvas',
      title: '2D Drawing Canvas & Ribbon',
      category: 'workspace',
      categoryLabel: 'Workspace',
      caption: 'Familiar CAD interface with ribbon toolbars, drawing canvas, and command line for drafting efficiency.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      alt: 'ARES Standard 2D CAD workspace and interface',
    },
    {
      id: 'ares-standard-drafting',
      title: 'Precision 2D Drafting Geometry',
      category: 'drafting',
      categoryLabel: 'Drafting',
      caption: 'Complete set of 2D drafting entities including lines, arcs, polylines, trimming, and object snaps.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      alt: '2D drafting geometry and linework in ARES Standard',
    },
    {
      id: 'ares-standard-layers',
      title: 'Layer Management Palette',
      category: 'layers',
      categoryLabel: 'Layers',
      caption: 'Organize technical drawings into logical layers with color, linetype, and lineweight controls.',
      image: '/images/software/sections/ares-std-layers.jpg',
      alt: 'Layer organization palette in ARES Standard',
    },
    {
      id: 'ares-standard-blocks',
      title: 'Blocks and Attributes',
      category: 'blocks',
      categoryLabel: 'Blocks',
      caption: 'Insert, create, and manage standard reusable blocks and blocks with editable text attributes.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Blocks with attributes in ARES Standard',
    },
    {
      id: 'ares-standard-dimensions',
      title: 'Dimensioned Technical Drawing',
      category: 'dimensions',
      categoryLabel: 'Dimensions',
      caption: 'Accurate linear, aligned, and angular dimensioning communicating sizes and technical tolerances.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dimensioned technical drawing in ARES Standard',
    },
    {
      id: 'ares-standard-printing',
      title: 'Print & BatchPrint Publishing',
      category: 'printing',
      categoryLabel: 'Printing',
      caption: 'Prepare drawing layouts, configure PC3 plotters, and produce clean vector PDF documentation.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      alt: 'BatchPrint and vector PDF publishing in ARES Standard',
    },
  ],
  faqs: [
    {
      category: 'general',
      q: 'What is ARES Standard?',
      a: 'ARES Standard is a Windows-based 2D DWG CAD application designed for users who need to create, view, print and modify 2D drawings.',
    },
    {
      category: 'technical',
      q: 'Which operating systems does ARES Standard support?',
      a: 'The official product page lists Windows 64-bit support. It does not list macOS or Linux support for ARES Standard.',
    },
    {
      category: 'dwg',
      q: 'Does ARES Standard support DWG files?',
      a: 'Yes. Native DWG support is a central part of the product’s positioning. Compatibility with specialized third-party custom objects should be confirmed where relevant.',
    },
    {
      category: 'features',
      q: 'Can I create new 2D drawings?',
      a: 'Yes. ARES Standard includes a complete set of essential 2D drafting tools, including layers, blocks and dimensions.',
    },
    {
      category: 'dwg',
      q: 'Can I modify drawings created in AutoCAD?',
      a: 'The official page describes ARES Standard as able to view, print and modify DWG drawings created with AutoCAD and other DWG-based CAD software. Complex third-party custom entities may require compatibility testing.',
    },
    {
      category: 'comparison',
      q: 'Does ARES Standard include 3D modeling?',
      a: 'ARES Standard can view 3D files saved in DWG according to the official comparison table, but 3D solid modeling and 3D solid modification are listed as ARES Commander features.',
    },
    {
      category: 'comparison',
      q: 'Does ARES Standard include BIM tools?',
      a: 'The official comparison lists the described Revit and IFC BIM tools (such as BIM Navigator and BIM data extraction) under ARES Commander, not ARES Standard.',
    },
    {
      category: 'comparison',
      q: 'Does it include cloud collaboration?',
      a: 'Do not present ARES Trinity cloud collaboration as included in ARES Standard. Users should confirm the appropriate product and license (such as ARES Commander) for cloud or mobile workflows.',
    },
    {
      category: 'technical',
      q: 'Is ARES Standard available for Mac or Linux?',
      a: 'The official product page lists ARES Standard for Windows only. ARES Commander is available for Windows, macOS, and Linux.',
    },
    {
      category: 'licensing',
      q: 'Is a free trial available?',
      a: 'The official ARES Standard page advertises a 30-day free trial. Confirm current eligibility and terms on Graebert’s official trial page.',
    },
    {
      category: 'licensing',
      q: 'Does ARES Standard offer perpetual licensing?',
      a: 'Perpetual licensing is listed in the official product comparison. Confirm current regional availability and conditions before purchase.',
    },
    {
      category: 'licensing',
      q: 'How much does ARES Standard cost in India?',
      a: 'Licensing terms may vary by region and license type. Contact our sales team at Leniva CAD Solutions for official India quotations.',
    },
    {
      category: 'comparison',
      q: 'What is the difference between ARES Standard and ARES Commander?',
      a: 'ARES Standard focuses on 2D DWG drafting and editing on Windows. ARES Commander offers additional capabilities such as 3D solid modeling, BIM tools, maps, cross-platform support (Mac/Linux), more productivity features, and optional Trinity collaboration features.',
    },
    {
      category: 'general',
      q: 'Can I get help choosing the right product?',
      a: 'Yes. Use our enquiry form or contact our CAD specialist team directly, and we will help you evaluate whether ARES Standard or ARES Commander best suits your drafting needs.',
    },
  ],
  relatedProducts: [
    {
      name: 'ARES Commander',
      slug: 'ares-commander',
      category: 'CAD Software',
      desc: 'Comprehensive 2D/3D DWG CAD with cross-platform support (Win/Mac/Linux), BIM, and Trinity.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'ARES Mechanical',
      slug: 'ares-mechanical',
      category: 'Mechanical CAD',
      desc: '2D mechanical CAD with standards (ISO/ANSI/DIN), parts libraries, and mechanical drafting tools.',
      image: '/images/software/ares-mechanical.jpg',
    },
    {
      name: 'ARES Electrical',
      slug: 'ares-electrical',
      category: 'Electrical CAD',
      desc: 'DWG-based electrical schematic design, wire numbering automation, and project reporting.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    },
  ],
}
