// ============================================================================
// ARES COMMANDER PRODUCT DATA & CONTENT REPOSITORY
// Verified Official References:
// - Product Page: https://www.graebert.com/in/cad-software/ares-commander/
// - New Features: https://www.graebert.com/in/cad-software/ares-commander/new-features/
// - Download & Trial: https://www.graebert.com/in/cad-software/download/
// - Pricing & Licensing: https://www.graebert.com/in/cad-software/buy/configurator/
// - ARES Trinity: https://www.graebert.com/in/cad-software/ares-trinity/
// ============================================================================

export interface AresCommanderFeatureItem {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  tag: string
}

export interface AresCommanderWorkflowStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface AresCommanderIndustry {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface AresCommanderComparisonRow {
  capability: string
  aresCommander: string
  aresStandard: string
  highlight?: boolean
  note?: string
}

export interface AresCommanderFaq {
  q: string
  a: string
  category: 'general' | 'dwg' | 'capabilities' | 'bim-trinity' | 'licensing' | 'technical'
}

export interface AresCommanderData {
  identity: {
    productName: string
    brand: string
    category: string
    productType: string
    supportedPlatforms: string
    corePurpose: string
    mainHeadline: string
    supportingHeadline: string
    description: string
    keyHighlights: string[]
    officialUrl: string
    newFeaturesUrl: string
    downloadUrl: string
    pricingUrl: string
    trinityUrl: string
    lastVerified: string
  }
  hero: {
    eyebrow: string
    headline: string
    supportingText: string
    shortDescription: string
    featureLabels: string[]
    image: string
    badge: string
    strip: { label: string; value: string }[]
    trialNote: string
  }
  overview: {
    heading: string
    description: string
    cards: {
      title: string
      subtitle: string
      description: string
      icon: string
      bullets: string[]
    }[]
  }
  benefits: {
    heading: string
    description: string
    items: {
      number: string
      title: string
      desc: string
      detail: string
      icon: string
    }[]
  }
  drafting2D: {
    heading: string
    description: string
    features: string[]
    featureDescription: string
    image: string
  }
  modelling3D: {
    heading: string
    description: string
    features: string[]
    useCases: string[]
    image: string
  }
  nativeDwg: {
    heading: string
    description: string
    featurePoints: string[]
    contentNote: string
    workflowSteps: { step: string; title: string; desc: string }[]
  }
  familiarInterface: {
    heading: string
    description: string
    featurePoints: string[]
    image: string
  }
  productivityTools: {
    heading: string
    description: string
    tools: {
      id: string
      name: string
      tag: string
      description: string
      icon: string
      highlights: string[]
    }[]
  }
  pdfWorkflows: {
    heading: string
    description: string
    featurePoints: string[]
    accuracyNote: string
  }
  bimToCad: {
    heading: string
    description: string
    supportingDescription: string
    capabilities: {
      title: string
      desc: string
      icon: string
    }[]
    useCases: string[]
    workflowSteps: { step: number; title: string; desc: string }[]
    officialBimUrl: string
    image: string
  }
  aresTrinity: {
    heading: string
    description: string
    image?: string
    components: {
      name: string
      platformRole: string
      description: string
      icon: string
      features: string[]
    }[]
    collaborationPoints: string[]
    cloudStorageProviders: { name: string; type: string }[]
    viewOnlySharing: {
      headline: string
      description: string
    }
  }
  aiAutomation: {
    heading: string
    description: string
    featureAreas: {
      title: string
      desc: string
      icon: string
    }[]
    accuracyNote: string
  }
  developerPlatform: {
    heading: string
    description: string
    technologies: string[]
    benefits: string[]
    note: string
  }
  industries: {
    heading: string
    description: string
    items: AresCommanderIndustry[]
  }
  crossPlatform: {
    heading: string
    description: string
    featurePoints: string[]
    osDetails: { os: string; versions: string; arch: string; icon: string }[]
    compatibilityNote: string
  }
  workOffline: {
    heading: string
    description: string
    featurePoints: string[]
    note: string
  }
  comparisonCommanderVsStandard: {
    heading: string
    description: string
    comparisonUrl: string
    rows: AresCommanderComparisonRow[]
  }
  comparisonOtherCad: {
    heading: string
    description: string
    topics: { title: string; description: string; aresAdvantage: string }[]
  }
  technicalSpecs: {
    heading: string
    specs: { category: string; specification: string; notes: string }[]
    systemRequirementsUrl: string
  }
  licensing: {
    heading: string
    description: string
    pricingAccuracyRules: string
    pricingConfiguratorUrl: string
    cards: {
      id: string
      category: string
      badge?: string
      popular?: boolean
      termOptions: string[]
      description: string
      includedFeatures: string[]
      collaborationEntitlements: string
      supportTerms: string
      indicativePriceNote: string
    }[]
  }
  freeTrial: {
    heading: string
    description: string
    duration: string
    highlights: string[]
    downloadUrl: string
    termsNote: string
  }
  learningResources: {
    heading: string
    description: string
    items: {
      title: string
      description: string
      icon: string
      url: string
      badge: string
    }[]
  }
  newFeatures: {
    heading: string
    description: string
    featuresUrl: string
    releaseItems: {
      year: string
      title: string
      category: string
      description: string
      highlights: string[]
    }[]
  }
  testimonials: {
    heading: string
    items: {
      quote: string
      author: string
      company: string
      role: string
    }[]
  }
  faqs: AresCommanderFaq[]
  relatedProducts: {
    name: string
    slug: string
    category: string
    desc: string
    relationship: string
  }[]
}

export const aresCommanderData: AresCommanderData = {
  identity: {
    productName: 'ARES Commander',
    brand: 'Graebert',
    category: '2D & 3D CAD Software',
    productType: 'DWG-based desktop CAD software',
    supportedPlatforms: 'Windows, macOS and Linux (64-bit)',
    corePurpose: 'Professional 2D drafting, 3D modelling, DWG editing, technical documentation, BIM-to-CAD drawing production, and CAD collaboration.',
    mainHeadline: 'ARES COMMANDER — POWERFUL 2D & 3D CAD IN DWG',
    supportingHeadline: 'Create, edit and share professional CAD drawings across Windows, macOS and Linux.',
    description: 'ARES Commander is a professional DWG-based CAD solution developed by Graebert. It enables users to create, edit, view and document 2D drawings and 3D models on desktop computers. It combines familiar drafting and design tools with native DWG support, productivity features, BIM-to-CAD capabilities, automation and optional collaboration through the ARES Trinity ecosystem.',
    keyHighlights: [
      'Native DWG support',
      '2D drafting and 3D modelling',
      'Windows, macOS and Linux support',
      'Familiar CAD user interface',
      'PDF import and export',
      'BIM-to-CAD documentation',
      'Revit (.RVT) and IFC model import',
      'Smart productivity tools (Power Trim, Dimensions Palette)',
      'Dynamic Blocks support',
      'Layer and dimension tools',
      'Cloud collaboration through ARES Trinity',
      'Online CAD through ARES Kudo',
      'Mobile CAD through ARES Touch',
      'APIs for developers (C++, LISP, DCL, Qt, Tx, VSTA, COM)',
      '30-day free evaluation trial',
    ],
    officialUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
    newFeaturesUrl: 'https://www.graebert.com/in/cad-software/ares-commander/new-features/',
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/',
    pricingUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
    trinityUrl: 'https://www.graebert.com/in/cad-software/ares-trinity/',
    lastVerified: 'Graebert Official 2026 Documentation',
  },

  hero: {
    eyebrow: 'GRAEBERT | PROFESSIONAL CAD SOFTWARE',
    headline: 'Powerful DWG-Based 2D & 3D CAD Software',
    supportingText: 'Create, edit and document professional CAD drawings with ARES Commander. Work natively in DWG, explore 2D and 3D design, and connect desktop workflows with cloud and mobile collaboration.',
    shortDescription: 'ARES Commander brings professional drafting, modelling and documentation tools together in a familiar CAD environment. Work locally on your desktop, exchange DWG files and use supported ARES Trinity collaboration features to connect with other users and devices.',
    featureLabels: [
      'Native DWG Support',
      '2D & 3D CAD Design',
      'Windows, macOS & Linux',
      'BIM-to-CAD Workflows',
      'ARES Trinity Cloud & Mobile',
    ],
    image: '/images/software/ares-commander.jpg',
    badge: 'Flagship Professional CAD',
    strip: [
      { label: 'File Format', value: 'Native DWG / DXF' },
      { label: 'Modeling', value: '2D Drafting & 3D Solid' },
      { label: 'BIM Integration', value: 'Revit (.RVT) & IFC' },
      { label: 'Platforms', value: 'Windows, macOS, Linux' },
      { label: 'Ecosystem', value: 'ARES Trinity (Desktop + Cloud + Mobile)' },
      { label: 'Evaluation', value: '30-Day Free Trial' },
    ],
    trialNote: 'Full-featured 30-day evaluation trial. No credit card required.',
  },

  overview: {
    heading: 'A Professional CAD Platform Built Around DWG',
    description: 'ARES Commander is designed to create and modify DWG drawings in 2D and 3D. It combines professional drafting features with a familiar CAD interface, cross-platform support and productivity tools that support everyday technical design workflows. Users can work with DWG files locally, import and export supported formats, and connect their drawings to cloud and mobile workflows through the ARES Trinity ecosystem.',
    cards: [
      {
        title: 'Native DWG Support',
        subtitle: 'Universal Industry Standard',
        description: 'Create, open, edit and save drawings using native DWG format with zero translation loss, preserving layers, blocks, and styles.',
        icon: 'FileCode',
        bullets: ['DWG 2018 to legacy versions', 'DXF import/export', 'Direct AutoCAD DWG exchange'],
      },
      {
        title: '2D Drafting',
        subtitle: 'Precision Technical Drawings',
        description: 'Create technical drawings using professional drafting, annotation, dimensioning, block, hatch, and layer tools.',
        icon: 'PenTool',
        bullets: ['Geometric snap tools', 'Smart dimension palette', 'Dynamic blocks support'],
      },
      {
        title: '3D Modelling',
        subtitle: 'Solid & Surface Geometry',
        description: 'Build and modify supported 3D CAD models and technical geometry using solid primitives, boolean operations, and sweeps.',
        icon: 'Box',
        bullets: ['ACIS solid modeling', 'Surface creation & editing', '3D navigation & visual styles'],
      },
      {
        title: 'Cross-Platform Desktop',
        subtitle: 'Windows, macOS & Linux',
        description: 'Run native 64-bit CAD applications across Windows, Apple macOS, and Linux without emulators or performance penalties.',
        icon: 'Laptop',
        bullets: ['Windows 10 / 11 64-bit', 'macOS (Apple Silicon & Intel)', 'Ubuntu, Debian, Fedora Linux'],
      },
      {
        title: 'BIM-to-CAD',
        subtitle: 'Revit (.RVT) & IFC Import',
        description: 'Import Revit and IFC models, explore BIM information, filter elements, and extract relevant 2D CAD documentation drawings.',
        icon: 'Building2',
        bullets: ['Revit .RVT & IFC models', 'Automated 2D floor plans & sections', 'BIM quantity take-offs into tables'],
      },
      {
        title: 'Connected Collaboration',
        subtitle: 'ARES Trinity Ecosystem',
        description: 'Connect desktop CAD with cloud (ARES Kudo) and mobile (ARES Touch) for synchronized access, view-only links, and real-time markups.',
        icon: 'Cloud',
        bullets: ['Desktop + Cloud + Mobile sync', 'Browser-based view-only links', 'Google Drive, OneDrive, Dropbox sync'],
      },
    ],
  },

  benefits: {
    heading: 'Professional CAD Tools for Modern Design Workflows',
    description: 'ARES Commander combines familiar CAD capabilities with modern productivity tools and connected workflows. It is designed for professionals who need to create, modify, exchange and document technical drawings in DWG.',
    items: [
      {
        number: '01',
        title: 'Familiar CAD Experience',
        desc: 'Familiar command line, ribbon layouts, shortcuts, and aliases make transitioning from other DWG-based CAD software seamless without a learning curve.',
        detail: 'Experienced CAD drafters can type familiar commands like LINE, TRIM, OFFSET, and CIRCLE to start working immediately with zero learning curve.',
        icon: 'Command',
      },
      {
        number: '02',
        title: 'Native DWG Workflow',
        desc: 'Work directly with DWG drawings as the primary file format, guaranteeing full compatibility when exchanging files with clients, partners, and suppliers.',
        detail: 'No file conversion, no import/export distortion, and no loss of text styles, dimensions, or layer organizations.',
        icon: 'FileCheck',
      },
      {
        number: '03',
        title: 'Cross-Platform Flexibility',
        desc: 'Work on Windows, macOS, or Linux computers. A single license can be used across your different workstations according to licensing terms.',
        detail: 'Architects and engineers on Mac, Windows drafting teams, and Linux developers all share the identical native CAD engine and file format.',
        icon: 'MonitorCheck',
      },
      {
        number: '04',
        title: 'Unified 2D and 3D Design',
        desc: 'Transition smoothly between 2D technical drafting, detailed documentation, and 3D solid modelling within a single desktop application.',
        detail: 'Build 3D mechanical components or architectural geometry and extract 2D section views and projections directly onto drawing sheets.',
        icon: 'Box',
      },
      {
        number: '05',
        title: 'Smart Productivity Tools',
        desc: 'Accelerate routine drafting tasks with proprietary productivity tools including Power Trim, Dimensions Palette, and Layer Tools.',
        detail: 'Trim complex geometry in one fluid mouse gesture with Power Trim, and customize dimension tolerances on the fly without dialog boxes.',
        icon: 'Zap',
      },
      {
        number: '06',
        title: 'Connected CAD with Trinity',
        desc: 'Extend desktop work with browser-based editing (ARES Kudo) and smartphone/tablet access (ARES Touch) under applicable plan subscriptions.',
        detail: 'Review drawings on site with an iPad, generate view-only URLs for clients without CAD software, and synchronize modifications seamlessly.',
        icon: 'Share2',
      },
      {
        number: '07',
        title: 'BIM-to-CAD Documentation',
        desc: 'Import Revit (.RVT) and IFC models, filter BIM objects, and automatically generate coordinated 2D drawing sets and material schedules.',
        detail: 'Bridge the gap between BIM coordinators and CAD documentation teams without requiring expensive full BIM software licenses for every drafter.',
        icon: 'Layers',
      },
      {
        number: '08',
        title: 'Developer Extensibility',
        desc: 'Automate repetitive workflows, build specialized plug-ins, or migrate existing custom tools using industry-standard APIs including C++, LISP, and VSTA.',
        detail: 'Full support for LISP scripts, DCL dialogs, Tx (Teigha Extensions), and .NET/VSTA enables custom automation for enterprise workflows.',
        icon: 'Code',
      },
    ],
  },

  drafting2D: {
    heading: 'Create Precise 2D Technical Drawings',
    description: 'ARES Commander provides a professional 2D drafting environment for creating, modifying and documenting technical drawings in DWG. Use precision drafting tools to build technical drawings, modify existing DWG files, organize design information and prepare drawings for review or production.',
    features: [
      'Lines, polylines, splines and construction geometry',
      'Circles, arcs, ellipses and complex geometric curves',
      'Rectangles, regular polygons and boundary contours',
      'Associative hatching, gradient fills and pattern scales',
      'Linear, aligned, angular, radial and ordinate dimensions',
      'Single-line text and rich multiline formatted text (MTEXT)',
      'Layer management, layer filters, states and property overrides',
      'Reusable block definitions and block attribute extraction',
      'Dynamic Blocks support for flexible parametric configurations',
      'External references (XREFs) for collaborative team drafting',
      'Paper space drawing layouts, viewports and scale locks',
      'Object properties palette and rapid property painter',
      'Geometric snaps, tracking guides and polar coordinates',
      'Vector PDF import and high-resolution PDF vector export',
      'BatchPrint utility and PC3 print plotting configurations',
    ],
    featureDescription: 'From schematic concept sketches to full architectural construction sets and mechanical fabrication layouts, ARES Commander delivers sub-millimeter precision drafting with native DWG compatibility.',
    image: '/images/ares-standard/cad-arch-floorplan.jpg',
  },

  modelling3D: {
    heading: 'Move Beyond 2D with 3D CAD',
    description: 'ARES Commander includes 3D CAD capabilities to create and modify supported 3D geometry and work with technical models. Build complex solids, surfaces, and mechanical components within the same familiar workspace.',
    features: [
      '3D solid modeling primitives (Box, Cylinder, Cone, Sphere, Torus, Wedge)',
      'Extrude, Revolve, Sweep and Loft 2D profiles into 3D solid geometry',
      'Boolean operations: Union, Subtract, and Intersect 3D solids',
      'Fillet, Chamfer, Shell and Slice solid models with precision',
      '3D viewing and interactive orbit, walk-through and fly-through modes',
      'Visual styles: 2D wireframe, 3D wireframe, shaded, conceptual and hidden',
      'Section plane creation and automated 2D projection extraction',
      '3D coordinate gizmo (UCS) for positioning geometry on any plane',
      'Export and import of supported 3D formats including SAT (ACIS) and STL',
    ],
    useCases: [
      'Mechanical component design and machine housing modeling',
      'Engineering assemblies, bracket design and structural junctions',
      'Equipment models, skid layouts and piping routings',
      'Architectural massing models and concept geometry evaluation',
      '3D design documentation, isometric drawings and assembly exploded views',
      'Preparation of STL geometry for 3D printing and additive manufacturing',
    ],
    image: '/images/ares-standard/cad-mech-drafting.jpg',
  },

  nativeDwg: {
    heading: 'Work Natively with DWG',
    description: 'DWG is the central drawing format for ARES Commander. The software is designed to create, view, modify and exchange DWG drawings with other DWG-based CAD environments without translation hurdles.',
    featurePoints: [
      'Native DWG file read and write as the default file format',
      'Open and edit existing CAD drawings without file translation or format drift',
      'Exchange technical drawings seamlessly with AutoCAD users and subcontractors',
      'Support for DWG versions ranging from DWG 2018 down to legacy R12',
      'Preserve block libraries, layer definitions, linetypes, text fonts, and styles',
      'Maintain custom drawing data and non-destructive entity preservation',
    ],
    contentNote: 'The official page describes ARES Commander as providing native DWG support and compatibility with DWG files. While standard CAD entities and annotations are preserved natively, certain proprietary third-party custom objects or proxy entities may have specific display requirements.',
    workflowSteps: [
      { step: '01', title: 'Open Existing DWG', desc: 'Open DWG files created in AutoCAD or other CAD software directly without conversion.' },
      { step: '02', title: 'Edit with Precision', desc: 'Draft, modify layers, insert blocks, and dimension geometry using standard CAD tools.' },
      { step: '03', title: 'Save in Native Format', desc: 'Save changes back to the original DWG file version or choose backward-compatible formats.' },
      { step: '04', title: 'Share with Teams', desc: 'Send to clients, publish vector PDFs, or share via ARES Trinity cloud links for instant review.' },
    ],
  },

  familiarInterface: {
    heading: 'A Familiar Workspace. A Smooth Transition.',
    description: 'ARES Commander is designed with a familiar look and feel for experienced CAD users. Its interface supports common drafting and design workflows while providing modern productivity and collaboration features.',
    featurePoints: [
      'Familiar CAD user interface with ribbon tabs, panels, and optional classic menus',
      'Command-line window with autocomplete, history recall, and command options',
      'Drawing canvas with customizable dark and light color themes',
      'Dockable and floatable tool palettes: Properties, Layers, Blocks, and Dimensions',
      'Full shortcut key customization and standard CAD keyboard aliases (L, C, PL, TR, EX)',
      'Multiple document interface (MDI) with tabbed drawing windows for fast switching',
      'Task-oriented workspaces customizable for 2D drafting, 3D modelling, or custom layouts',
    ],
    image: '/images/ares-standard/designed-for-2d-drawing-workflows.jpg',
  },

  productivityTools: {
    heading: 'Work Smarter with Productivity-Driven CAD Tools',
    description: 'ARES Commander includes specialized productivity tools that help reduce repetitive actions and support everyday drafting tasks.',
    tools: [
      {
        id: 'power-trim',
        name: 'Power Trim',
        tag: 'Speed Drafting',
        description: 'Trim or extend multiple drawing entities in one continuous fluid mouse gesture. Simply sweep the cursor across lines, arcs, or polylines to trim instantly.',
        icon: 'Scissors',
        highlights: ['Continuous drag-trimming', 'Shift-key toggle to extend', 'Reduces hundreds of repetitive clicks daily'],
      },
      {
        id: 'dimensions-palette',
        name: 'Dimensions Palette',
        tag: 'Annotation Control',
        description: 'Context-sensitive floating HUD palette that appears when selecting dimensions, allowing instant modification of tolerances, prefixes, and styles without opening dialog boxes.',
        icon: 'Ruler',
        highlights: ['Quick tolerance editing', 'Text override shortcuts', 'Dual unit configuration on the fly'],
      },
      {
        id: 'layer-tools',
        name: 'Layer Productivity Tools',
        tag: 'Layer Management',
        description: 'Comprehensive suite of layer tools: Layer Isolate, Layer Freeze, Layer Lock, Layer Merge, and Layer Walk to inspect complex drawings quickly.',
        icon: 'Layers',
        highlights: ['Layer Walk verification', 'Instant Layer Isolate', 'Layer State manager with export'],
      },
      {
        id: 'property-painter',
        name: 'Property Painter',
        tag: 'Formatting Match',
        description: 'Copy properties such as color, layer, linetype, linetype scale, and lineweight from one reference entity to one or multiple destination objects.',
        icon: 'Paintbrush',
        highlights: ['Matches all entity properties', 'Selective property copying', 'Works across blocks and text'],
      },
      {
        id: 'drawing-compare',
        name: 'Drawing Comparison',
        tag: 'Revision Tracking',
        description: 'Visually compare two revisions of a DWG drawing to highlight modifications, deletions, and additions in distinct configurable color codes.',
        icon: 'GitCompare',
        highlights: ['Color-coded revision diff', 'Instant change detection', 'Exports comparison report'],
      },
      {
        id: 'dynamic-blocks',
        name: 'Dynamic Blocks Support',
        tag: 'Parametric Blocks',
        description: 'Insert, manipulate, and configure AutoCAD Dynamic Blocks with visibility states, stretch parameters, lookup tables, and alignment grips.',
        icon: 'Component',
        highlights: ['Full grip editing', 'Visibility state switching', 'Parametric stretch and array'],
      },
    ],
  },

  pdfWorkflows: {
    heading: 'Connect CAD Drawings with PDF Workflows',
    description: 'ARES Commander supports PDF import and PDF export, enabling users to work with PDF-based drawing information and share CAD documentation in a widely accessible format.',
    featurePoints: [
      'Import vector PDF files and convert vector linework into fully editable DWG entities (lines, arcs, polylines, text)',
      'Import multipage PDF documents by selecting specific sheet numbers',
      'Export 2D drawings and multi-sheet layouts into high-resolution vector PDF files',
      'Generate searchable text inside exported PDFs for digital document indexing',
      'Configure layer export in vector PDFs so reviewers can toggle layers in Adobe Acrobat or PDF viewers',
      'Embed standard drawing metadata, author details, and paper size standards',
    ],
    accuracyNote: 'Vector PDF import accurately converts true vector geometry and true-type text into editable CAD entities. Scanned or raster image content embedded inside a PDF remains an image underlay and is not converted into vector geometry.',
  },

  bimToCad: {
    heading: 'Unlock CAD Documentation from BIM Models',
    description: 'ARES Commander can import and view supported Revit (.RVT) and IFC models. It enables users to browse BIM information, extract information into tables and generate 2D drawings from BIM data.',
    supportingDescription: 'ARES Commander bridges the gap between 3D BIM model data and DWG-based technical documentation. Architecture, engineering, and construction teams can access BIM building models, isolate relevant storeys or disciplines, and extract 2D drawings without requiring full BIM software for every team member.',
    capabilities: [
      {
        title: 'BIM Model Import',
        desc: 'Directly import Autodesk Revit (.RVT version 2011 to current) and open Industry Foundation Classes (.IFC) building models into your CAD workspace.',
        icon: 'FileInput',
      },
      {
        title: 'BIM Filter & Navigator',
        desc: 'Filter building objects by discipline (Architecture, Structural, MEP), category (Walls, Doors, Windows, Slabs), levels, and phases.',
        icon: 'Filter',
      },
      {
        title: '2D Drawing Extraction',
        desc: 'Cut horizontal and vertical section planes through BIM models to generate coordinated 2D floor plans, sections, and building elevations.',
        icon: 'FileCode',
      },
      {
        title: 'Data Extraction & Schedules',
        desc: 'Extract BIM object attributes, quantities, dimensions, and property sets into CAD tables or CSV files for bills of materials (BOM) and cost take-offs.',
        icon: 'Table',
      },
      {
        title: 'Keep Drawings in Sync',
        desc: 'When an updated Revit or IFC model is received, refresh the BIM reference in ARES Commander to update associated CAD documentation and reduce repetitive redrafting.',
        icon: 'RefreshCw',
      },
    ],
    useCases: [
      'Architectural floor plans and building elevation extractions',
      'Construction documentation and permit submittal drawing production',
      'MEP and building services coordination with structural models',
      'Quantity take-offs, door/window schedules, and area calculations',
      'BIM-to-DWG contractor handoffs and shopfloor documentation',
    ],
    workflowSteps: [
      { step: 1, title: 'Import Revit or IFC', desc: 'Load the 3D BIM model into ARES Commander alongside your CAD files.' },
      { step: 2, title: 'Filter & Browse Data', desc: 'Isolate specific storeys, structural elements, or building components.' },
      { step: 3, title: 'Generate 2D Drawings', desc: 'Extract clean 2D vector plans and sections with intelligent CAD geometry.' },
      { step: 4, title: 'Detail & Synchronize', desc: 'Add CAD annotations, title blocks, and refresh drawings when the BIM model is updated' },
    ],
    officialBimUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
    image: '/images/ares-standard/cad-eng-schematic.jpg',
  },

  aresTrinity: {
    heading: 'One Connected CAD Ecosystem — Desktop, Cloud and Mobile',
    description: 'ARES Trinity brings together three components: ARES Commander (desktop CAD), ARES Kudo (cloud CAD), and ARES Touch (mobile CAD). Together, these applications provide workflows for accessing, editing, synchronizing and sharing DWG drawings across supported devices.',
    image: '/images/software/ares-trinity.jpg',
    components: [
      {
        name: 'ARES Commander',
        platformRole: 'Desktop CAD (Windows, macOS, Linux)',
        description: 'The full-powered, locally installed desktop CAD workstation for precision 2D drafting, 3D modeling, BIM documentation, and developer automation.',
        icon: 'Laptop',
        features: ['Full 2D & 3D drafting suite', 'ACIS solid modeling', 'BIM import (.RVT / .IFC)', 'API customization (C++, LISP)'],
      },
      {
        name: 'ARES Kudo',
        platformRole: 'Cloud Browser CAD (Web)',
        description: 'Browser-based CAD application that lets users create, view, edit, and markup DWG drawings directly in Google Chrome, Firefox, Safari, or Microsoft Edge without installation.',
        icon: 'Globe',
        features: ['Zero installation required', 'View-only URL generation', 'Direct cloud storage sync', 'Real-time collaborative editing'],
      },
      {
        name: 'ARES Touch',
        platformRole: 'Mobile CAD (Android & iOS)',
        description: 'Mobile CAD application tailored for tablets and smartphones. Inspect drawings on construction job sites, record voice notes, snap photos, and markup DWG files.',
        icon: 'Smartphone',
        features: ['Full offline drawing access', 'Field markups & voice memos', 'Synchronizes on reconnect'],
      },
    ],
    collaborationPoints: [
      'Synchronize drawings automatically across desktop, browser, and mobile devices',
      'Generate secure view-only URLs allowing clients to view drawings without CAD software',
      'Collect feedback, dimension checks, and comments in a centralized digital thread',
      'Review full version history and restore earlier revisions with side-by-side visual diffs',
      'Manage user permissions: View-Only, Reviewer, or Full Editor access per drawing',
    ],
    cloudStorageProviders: [
      { name: 'Google Drive', type: 'Cloud Storage' },
      { name: 'Microsoft OneDrive', type: 'Cloud Storage' },
      { name: 'Box', type: 'Cloud Storage' },
      { name: 'Dropbox', type: 'Cloud Storage' },
      { name: 'Nextcloud', type: 'Private Cloud' },
      { name: 'WebDAV', type: 'Enterprise Server' },
    ],
    viewOnlySharing: {
      headline: 'Instant Client Review via Secure View-Only Links',
      description: 'Generate a secure, live view-only URL through ARES Kudo. Clients and subcontractors can open, pan, zoom, measure, and inspect the DWG drawing directly in any browser without purchasing or installing any CAD application.',
    },
  },

  aiAutomation: {
    heading: 'Modern CAD with AI and Automation',
    description: 'Graebert continues to introduce AI, automation and drawing productivity features across the ARES Trinity ecosystem, helping design teams reduce repetitive manual drafting work and accelerate technical documentation.',
    featureAreas: [
      {
        title: 'AI Drafting Assistance',
        desc: 'Verified AI features support intelligent geometry recognition, automated layer classification, and command suggestion based on drawing context.',
        icon: 'Sparkles',
      },
      {
        title: 'Drawing Automation & Scripts',
        desc: 'Automate repetitive drafting procedures with batch processing scripts, automated title block populating, and parametric drawing generation.',
        icon: 'Bot',
      },
      {
        title: 'BIM Data Extraction Automation',
        desc: 'Extract component counts, room schedules, and material quantities from BIM models into coordinated CSV and drawing tables automatically.',
        icon: 'FileSpreadsheet',
      },
      {
        title: 'Custom API Automation',
        desc: 'Develop custom enterprise routines in C++, LISP, or VSTA to link CAD drawings directly with enterprise ERP, PDM, or CRM databases.',
        icon: 'Terminal',
      },
    ],
    accuracyNote: 'ARES Commander features confirmed, verified automation and AI assistance tools. Functions are continuously expanded across Graebert releases; specific capabilities depend on current software updates and licensing entitlements.',
  },

  developerPlatform: {
    heading: 'Extend CAD Workflows with Developer Technologies',
    description: 'ARES Commander is based on Graebert\'s proven CAD platform, which powers leading CAD solutions worldwide. It provides extensive APIs and customization technologies for developers creating custom plugins, industry-specific extensions, and enterprise design automation.',
    technologies: [
      'C++ (Tx / Teigha Extensions API)',
      'LISP & Visual LISP routines',
      'DCL (Dialog Control Language)',
      'Qt GUI framework integration',
      'VSTA (Visual Studio Tools for Applications)',
      'COM & ActiveX automation',
      'Microsoft Visual Studio support',
      'ARES Trinity Cloud & Mobile APIs',
    ],
    benefits: [
      'Migrate existing AutoCAD C++ (ObjectARX) and LISP routines with minimal refactoring',
      'Develop custom ribbons, toolbars, and dockable palettes with Qt and DCL',
      'Automate drawing generation directly from ERP, PDM, or mechanical configuration engines',
      'Build specialized CAD solutions deployed across Windows, macOS, and Linux',
    ],
    note: 'Specific API languages, libraries, and compiler support vary by operating system and release. Contact our developer support team for SDK documentation and migration guidance.',
  },

  industries: {
    heading: 'One CAD Platform. Multiple Professional Workflows.',
    description: 'ARES Commander delivers the depth of tools required across diverse architectural, civil, mechanical, and manufacturing disciplines.',
    items: [
      {
        id: 'architecture',
        title: 'Architecture & Interior Design',
        subtitle: 'Floor Plans, Elevations & Details',
        description: 'Create and update architectural drawing sets, building sections, space planning layouts, and technical details using native DWG.',
        toolTags: ['Floor Plans', 'Wall Geometry', 'Door/Window Blocks', 'BIM Import'],
        image: '/images/ares-standard/cad-arch-floorplan.jpg',
        deliverables: ['2D Floor Plans', 'Permit Submittals', 'Elevation Sets'],
      },
      {
        id: 'mechanical',
        title: 'Mechanical Engineering',
        subtitle: '2D Parts & 3D Solid Assemblies',
        description: 'Author manufacturing drawings, mechanical parts, machine components, and technical assemblies with full 2D drafting and 3D solid modeling.',
        toolTags: ['3D Solid Models', 'Section Cuts', 'GD&T Tolerances', 'Machining Layouts'],
        image: '/images/ares-standard/cad-mech-drafting.jpg',
        deliverables: ['Part Fabrication Sheets', '3D Assembly Models', 'Machining Prints'],
      },
      {
        id: 'construction',
        title: 'Construction & BIM Coordination',
        subtitle: 'As-Built Revisions & Contractor Sheets',
        description: 'Import Revit and IFC models, extract coordinated 2D drawing sets, and keep shop drawings in sync with ongoing BIM model changes.',
        toolTags: ['Revit .RVT Import', 'IFC Models', 'BIM Take-Offs', 'As-Built Drawings'],
        image: '/images/ares-standard/cad-eng-schematic.jpg',
        deliverables: ['Coordinated Shop Drawings', 'As-Built Sets', 'BIM Schedules'],
      },
      {
        id: 'civil',
        title: 'Civil Engineering & Infrastructure',
        subtitle: 'Site Layouts & Foundation Details',
        description: 'Develop site layouts, foundation drawings, structural connection details, and civil infrastructure documentation with coordinate precision.',
        toolTags: ['Structural Footings', 'Rebar Details', 'Site Surveys', 'Coordinate Systems'],
        image: '/images/ares-standard/cad-eng-schematic.jpg',
        deliverables: ['Structural Framing Plans', 'Reinforcement Schedules', 'Site Plans'],
      },
      {
        id: 'manufacturing',
        title: 'Manufacturing & Tooling',
        subtitle: 'Production Blueprints & Jigs',
        description: 'Design production fixtures, stamping dies, CNC mounting plates, and shopfloor inspection aids using 2D and 3D precision geometry.',
        toolTags: ['Fixture Blueprints', 'Hole Tables', 'Component Profiles', 'ACIS Solids'],
        image: '/images/ares-standard/cad-mech-drafting.jpg',
        deliverables: ['Tooling Blueprints', 'Inspection Sheets', 'BOM Lists'],
      },
      {
        id: 'interiors',
        title: 'Interior Design & Fit-Out',
        subtitle: 'Space Planning & Furniture Schedules',
        description: 'Layout commercial office interiors, luxury residences, hospitality plans, and electrical/lighting positions with dynamic blocks.',
        toolTags: ['Furniture Blocks', 'Lighting Plans', 'Partition Walls', 'Joinery Details'],
        image: '/images/ares-standard/cad-interior-space-plan.jpg',
        deliverables: ['Reflected Ceiling Plans', 'Furniture Key Plans', 'Space Layouts'],
      },
      {
        id: 'education',
        title: 'Education & Academic Enablement',
        subtitle: 'Foundational CAD Curricula',
        description: 'Equip engineering faculties, polytechnic labs, and design universities with cross-platform CAD software for teaching foundational drafting principles.',
        toolTags: ['Student Exercises', 'LISP Basics', 'Classroom Labs', 'Cross-Platform'],
        image: '/images/ares-standard/cad-arch-floorplan.jpg',
        deliverables: ['Student Portfolios', 'Curriculum Labs', 'Drafting Exercises'],
      },
      {
        id: 'developers',
        title: 'CAD Developers & Software Houses',
        subtitle: 'Vertical CAD Application Platform',
        description: 'Leverage the ARES CAD platform to build vertical commercial applications, custom drafting plug-ins, and enterprise design engines.',
        toolTags: ['C++ Tx API', 'LISP Engine', 'VSTA .NET', 'Enterprise Automation'],
        image: '/images/ares-standard/designed-for-2d-drawing-workflows.jpg',
        deliverables: ['Custom Plug-ins', 'Vertical CAD Suites', 'Automated Engines'],
      },
    ],
  },

  crossPlatform: {
    heading: 'Work Across Windows, macOS and Linux',
    description: 'ARES Commander is available as a fully native 64-bit application for supported versions of Windows, macOS and Linux. The official page emphasizes true cross-platform desktop CAD, allowing users and multi-platform studios to work locally with identical file compatibility.',
    featurePoints: [
      'Native Windows 64-bit application optimized for modern multi-core Intel and AMD processors',
      'Native macOS application supporting both Apple Silicon (M1/M2/M3/M4) and Intel-based Mac systems',
      'Native Linux 64-bit application supporting major distributions including Ubuntu, Debian, and Fedora',
      'Identical native DWG engine across all three platforms with zero file conversion or display divergence',
      'Single license flexibility allowing users to work across different desktop operating systems',
      'Local file workflows with full offline capability on every supported OS',
    ],
    osDetails: [
      { os: 'Microsoft Windows', versions: 'Windows 11 and Windows 10 (64-bit)', arch: 'x86-64', icon: 'Monitor' },
      { os: 'Apple macOS', versions: 'macOS 12 (Monterey) or newer', arch: 'Apple Silicon (M-Series) & Intel 64-bit', icon: 'Laptop' },
      { os: 'Linux Desktop', versions: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, openSUSE', arch: '64-bit x86-64', icon: 'Terminal' },
    ],
    compatibilityNote: 'Operating system support reflects verified releases from Graebert official documentation. Verify specific service pack and driver compatibility prior to deployment.',
  },

  workOffline: {
    heading: 'Keep Working Locally on Your Computer',
    description: 'ARES Commander is a fully installed desktop CAD application, not a thin cloud client. You can draft, design, edit, and print technical drawings locally on your computer with complete independence from internet connectivity.',
    featurePoints: [
      'Locally installed desktop CAD running directly on your computer hardware',
      'Open and edit DWG files stored on local hard drives or local area network (LAN) shares',
      'Work uninterrupted on airplanes, remote construction sites, or offline factory floors',
      'License activation allows offline operation for extended periods subject to license type',
      'When reconnecting, ARES Trinity synchronization seamlessly updates modified cloud files',
    ],
    note: 'While local CAD drafting functions completely offline, cloud-dependent collaboration features (ARES Kudo live sharing, cloud storage synchronization) require an active internet connection.',
  },

  comparisonCommanderVsStandard: {
    heading: 'Understand the Difference Between ARES Commander and ARES Standard',
    description: 'Graebert offers distinct CAD solutions tailored to different workflow requirements. Here is a clear, factual comparison between ARES Commander and ARES Standard to help you select the optimal CAD software for your team.',
    comparisonUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
    rows: [
      { capability: 'Primary Design Focus', aresCommander: 'Professional 2D Drafting & 3D Solid Modeling', aresStandard: 'Focused 2D Drafting & DWG Editing', highlight: true },
      { capability: 'Native DWG Support', aresCommander: 'Included (DWG 2018 to legacy R12)', aresStandard: 'Included (DWG 2018 to legacy R12)' },
      { capability: '2D Drafting & Annotations', aresCommander: 'Full Suite with Dynamic Blocks & Power Trim', aresStandard: 'Essential 2D Drafting Suite' },
      { capability: '3D CAD Modeling', aresCommander: 'Full ACIS Solid & Surface Modeling', aresStandard: 'Viewing and basic wireframe only', highlight: true },
      { capability: 'Supported Operating Systems', aresCommander: 'Windows, macOS and Linux', aresStandard: 'Windows only', highlight: true },
      { capability: 'BIM-to-CAD (Revit & IFC)', aresCommander: 'Included (Import, filter, extract 2D drawings)', aresStandard: 'Not included', highlight: true },
      { capability: 'ARES Trinity Cloud (Kudo)', aresCommander: 'Included with Trinity plans & subscriptions', aresStandard: 'Not included', highlight: true },
      { capability: 'ARES Trinity Mobile (Touch)', aresCommander: 'Included with Trinity plans & subscriptions', aresStandard: 'Not included', highlight: true },
      { capability: 'Developer APIs', aresCommander: 'C++, LISP, DCL, Qt, Tx, VSTA, COM/ActiveX', aresStandard: 'LISP and basic customization' },
      { capability: 'Licensing Options', aresCommander: 'Perpetual, Annual, 3-Year, Network / Flex', aresStandard: 'Perpetual and Annual options' },
    ],
  },

  comparisonOtherCad: {
    heading: 'Explore Your CAD Options',
    description: 'When evaluating DWG-based CAD software, ARES Commander stands out by combining native DWG drafting, cross-platform flexibility, BIM workflows, and cloud-connected collaboration in a cost-effective offering.',
    topics: [
      {
        title: 'Native DWG Compatibility',
        description: 'Reads and writes genuine DWG files natively, ensuring seamless interoperability with AutoCAD files, blocks, and linetypes.',
        aresAdvantage: 'Direct DWG workflows without file conversion distortion or expensive per-seat subscriptions.',
      },
      {
        title: 'Cross-Platform Independence',
        description: 'True native desktop applications engineered specifically for Windows, macOS, and Linux.',
        aresAdvantage: 'Avoids being locked into a single operating system; deploy on Windows, Mac, or Linux seamlessly.',
      },
      {
        title: 'BIM-to-CAD Integration',
        description: 'Direct import of Revit (.RVT) and IFC models with automated 2D drawing generation and data take-offs.',
        aresAdvantage: 'Bridges BIM data to CAD documentation without requiring dedicated Revit licenses for all drafters.',
      },
      {
        title: 'ARES Trinity Connected Ecosystem',
        description: 'A single unified license extends desktop CAD to web browsers (ARES Kudo) and mobile devices (ARES Touch).',
        aresAdvantage: 'Work from the office, browser, or field job site with automatic cloud drawing synchronization.',
      },
      {
        title: 'Flexible Licensing Choices',
        description: 'Choice of perpetual licenses, annual subscriptions, 3-year commitments, or floating network pools.',
        aresAdvantage: 'Investment flexibility tailored to company budgets, without forced all-cloud subscription lock-in.',
      },
    ],
  },

  technicalSpecs: {
    heading: 'ARES Commander Technical Overview',
    systemRequirementsUrl: 'https://www.graebert.com/in/cad-software/download/',
    specs: [
      { category: 'Developer', specification: 'Graebert GmbH (Berlin, Germany)', notes: 'Pioneers in DWG CAD technology since 1983' },
      { category: 'Product Category', specification: '2D Drafting & 3D Modeling CAD Software', notes: 'Native DWG desktop and connected platform' },
      { category: 'Core File Format', specification: 'DWG (Native read and write)', notes: 'Supports DWG versions 2018, 2013, 2010, 2007, 2004, 2000, and R12' },
      { category: 'Interchange Formats', specification: 'DXF, DWF, DWFx, SAT (ACIS), STL, WMF', notes: 'Full vector graphic and 3D geometric export' },
      { category: 'PDF Workflows', specification: 'PDF Vector Import & Multi-Sheet PDF Export', notes: 'Converts vector PDF geometry to editable CAD elements' },
      { category: 'BIM Support', specification: 'Revit (.RVT version 2011 to current) & IFC (.IFC)', notes: 'Model inspection, filtering, 2D extraction, and schedule export' },
      { category: 'Operating Systems', specification: 'Windows 11 / 10 (64-bit), macOS 12+ (Apple Silicon & Intel), Linux 64-bit', notes: 'Native 64-bit binaries on all platforms' },
      { category: 'Processor (CPU)', specification: '64-bit multi-core Intel or AMD processor (Intel Core i5 / AMD Ryzen 5 or higher recommended)', notes: 'Apple M-series Silicon natively supported on macOS' },
      { category: 'System Memory (RAM)', specification: '8 GB minimum, 16 GB or higher recommended', notes: '32 GB recommended for large BIM models and complex 3D assemblies' },
      { category: 'Graphics Card (GPU)', specification: 'DirectX 11 / OpenGL 3.3 compatible graphics card with 2 GB VRAM or higher', notes: 'Dedicated GPU recommended for 3D modeling and shaded views' },
      { category: 'Disk Space', specification: '1.5 GB free disk space for typical installation', notes: 'Additional space required for drawing files and BIM models' },
      { category: 'Display Resolution', specification: '1280 × 768 minimum, 1920 × 1080 (Full HD) or higher recommended', notes: 'Full support for high-DPI and 4K UHD monitors' },
      { category: 'Supported Languages', specification: '14 Languages: English, German, French, Spanish, Italian, Japanese, Korean, Chinese, Portuguese, Polish, Russian, Czech, Turkish, and Traditional Chinese', notes: 'Language packs selectable during installation' },
      { category: 'Developer APIs', specification: 'C++, LISP, DCL, Qt, Tx, VSTA, COM/ActiveX, Visual Studio', notes: 'API availability varies by operating system platform' },
      { category: 'Free Evaluation', specification: '30-Day Full-Featured Evaluation Trial', notes: 'No credit card required for trial activation' },
    ],
  },

  licensing: {
    heading: 'Licensing Options for Different Workflows',
    description: 'Graebert offers flexible licensing options for ARES Commander, including standalone and network licensing, with choices of perpetual ownership or subscription plans tailored to your studio or enterprise requirements.',
    pricingAccuracyRules: 'Licensing configurations are subject to official Graebert quotations and applicable taxes. Contact Leniva CAD Solutions, authorized Graebert partner in India, for commercial proposals, educational discounts, and volume quotes.',
    pricingConfiguratorUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
    cards: [
      {
        id: 'standalone',
        category: 'ARES Commander Standalone',
        termOptions: ['Annual Plan', '3-Year Plan', 'Perpetual License'],
        description: 'For individual CAD professionals, engineers, and drafters who need full-powered desktop CAD on a designated workstation.',
        includedFeatures: [
          'Full 2D drafting and 3D solid modeling suite',
          'Native DWG support (DWG 2018 to legacy R12)',
          'Windows, macOS and Linux desktop compatibility',
          'Dynamic Blocks support and Power Trim',
          'PDF import and vector PDF export',
          'BIM-to-CAD documentation tools (Revit & IFC)',
          'Developer APIs (C++, LISP, VSTA)',
          'Standard technical support and updates during term',
        ],
        collaborationEntitlements: 'Desktop CAD workstation with offline commenting and local file workflows.',
        supportTerms: 'Software updates and standard customer support included during active subscription or 12-month maintenance for perpetual.',
        indicativePriceNote: 'Contact for verified INR quotation & perpetual quote',
      },
      {
        id: 'trinity',
        category: 'ARES Commander with Trinity',
        badge: 'Most Popular',
        popular: true,
        termOptions: ['Annual Subscription', '3-Year Commitment'],
        description: 'The complete connected CAD solution for modern design teams, combining full desktop power with cloud browser and mobile access.',
        includedFeatures: [
          'Everything in ARES Commander Standalone desktop',
          'ARES Kudo: Cloud CAD in any web browser without installation',
          'ARES Touch: Mobile CAD on Android and iOS tablets & phones',
          'Cloud storage integration: Google Drive, OneDrive, Box, Dropbox',
          'Secure view-only sharing links for external clients',
          'Real-time drawing synchronization across devices',
          'Centralized markup, comment threads, and revision history',
          'Continuous product upgrades and premium support',
        ],
        collaborationEntitlements: 'Full Trinity ecosystem access for seamless desktop, browser, and on-site mobile CAD collaboration.',
        supportTerms: 'Continuous product updates, cloud features, and priority technical support included throughout subscription.',
        indicativePriceNote: 'Contact for current regional India subscription quote',
      },
      {
        id: 'network',
        category: 'Network / Flex Floating License',
        termOptions: ['Annual Flex', 'Perpetual Network Pool'],
        description: 'For corporate design departments, engineering teams, and enterprises where multiple users share a pool of floating CAD licenses over the network.',
        includedFeatures: [
          'Floating license server management across company LAN or VPN',
          'Share licenses across multiple users up to purchased concurrent seat count',
          'License borrowing capability for offline field work and business travel',
          'Centralized license administration, usage monitoring, and deployment',
          'Includes Trinity cloud features for active concurrent users',
          'Multi-platform deployment across Windows, Mac, and Linux',
          'Enterprise volume discount tiers available',
          'Dedicated enterprise support and onboarding guidance',
        ],
        collaborationEntitlements: 'Floating pool shared among team members with Trinity cloud access for active seats.',
        supportTerms: 'Enterprise support agreement with license server assistance and upgrade protection.',
        indicativePriceNote: 'Request custom multi-seat enterprise quote',
      },
    ],
  },

  freeTrial: {
    heading: 'Try ARES Commander Free for 30 Days',
    description: 'Graebert offers a full-featured 30-day evaluation trial of ARES Commander. Experience native DWG drafting, 3D modeling, BIM documentation, and associated ARES Trinity cloud and mobile features on your own computer.',
    duration: '30-Day Full Evaluation',
    highlights: [
      '30-day unrestricted trial access',
      'Complete 2D drafting and 3D modeling tools',
      'Native DWG file creation, editing, and saving',
      'Windows, macOS, and Linux compatibility',
      'Associated ARES Trinity cloud and mobile trial access',
      'No credit card required for download and evaluation',
    ],
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/',
    termsNote: 'Trial software is intended for evaluation purposes. At the conclusion of the 30-day period, a valid commercial, educational, or subscription license is required to continue using the software.',
  },

  learningResources: {
    heading: 'Learn ARES Commander with Official Onboarding',
    description: 'Graebert provides extensive learning resources, tutorials, documentation, and learning courses to help drafters and engineering teams master ARES CAD software quickly.',
    items: [
      {
        title: 'Graebert Academy',
        description: 'Explore structured online video courses taught by CAD masters covering 2D drafting, 3D modeling, BIM-to-CAD, and Trinity collaboration.',
        icon: 'GraduationCap',
        url: 'https://www.graebert.com/academy/',
        badge: 'Official Academy',
      },
      {
        title: 'Free Video Tutorials',
        description: 'Watch hundreds of focused workflow videos and command demonstrations on the official Graebert YouTube channel.',
        icon: 'Video',
        url: 'https://www.youtube.com/@GraebertCAD',
        badge: 'Video Library',
      },
      {
        title: 'Official Product Documentation',
        description: 'Comprehensive searchable help documentation covering every command, system variable, shortcut, and configuration setting.',
        icon: 'BookOpen',
        url: 'https://www.graebert.com/in/cad-software/ares-commander/',
        badge: 'Documentation',
      },
      {
        title: 'On-Site & Online Onboarding',
        description: 'Custom corporate onboarding and hands-on team workshops conducted by certified Leniva CAD Solutions technical specialists in India.',
        icon: 'Users',
        url: '#enquiry',
        badge: 'Leniva Onboarding',
      },
    ],
  },

  newFeatures: {
    heading: 'Discover What\'s New in ARES Commander',
    description: 'Graebert continuously advances ARES Commander with every release, enhancing performance, expanding BIM capabilities, refining Trinity collaboration, and introducing smart productivity tools.',
    featuresUrl: 'https://www.graebert.com/in/cad-software/ares-commander/new-features/',
    releaseItems: [
      {
        year: 'Current Release',
        title: 'BIM Drawing Automation & Filtering',
        category: 'BIM Workflows',
        description: 'Enhanced Revit and IFC import speed with intelligent discipline filtering, multi-level 2D projection extraction, and automated take-off tables.',
        highlights: ['Faster Revit .RVT file parsing', 'Multi-storey floor plan batch generation', 'CSV schedule export enhancements'],
      },
      {
        year: 'Current Release',
        title: 'Trinity Cloud Markups & View-Only Links',
        category: 'Cloud Collaboration',
        description: 'Publish live view-only URLs directly from desktop ARES Commander for instant client reviews without requiring CAD software installation.',
        highlights: ['Instant browser share links', 'Interactive feedback & markups', 'Centralized comment notification thread'],
      },
      {
        year: 'Current Release',
        title: 'Dynamic Blocks & Power Trim Upgrades',
        category: 'Drafting Productivity',
        description: 'Expanded AutoCAD Dynamic Blocks compatibility with improved visibility grips, lookup tables, and fluid Power Trim boundary recognition.',
        highlights: ['Full dynamic block grip editing', 'Optimized multi-entity Power Trim', 'Dimensions Palette tolerance presets'],
      },
      {
        year: 'Current Release',
        title: 'Dark Theme & Modern High-DPI UI',
        category: 'User Interface',
        description: 'Refined modern dark user interface with high-DPI 4K icon sets, customizable ribbon workspaces, and accelerated OpenGL graphic pipeline.',
        highlights: ['Crisp 4K UHD display scaling', 'Ergonomic low-eyestrain dark mode', 'Multi-document tab preview bar'],
      },
    ],
  },

  testimonials: {
    heading: 'Trusted by Millions of CAD Professionals Worldwide',
    items: [
      {
        quote: 'ARES Commander provides the exact DWG compatibility, 3D modelling, and familiar drafting environment our engineering team needed, with the flexibility to work across Mac and Windows workstations.',
        author: 'Chief Engineering Architect',
        company: 'Industrial Design Consultancy',
        role: 'Verified Graebert Customer Feedback',
      },
      {
        quote: 'The ability to extract 2D CAD drawings directly from Revit BIM models and share view-only links with site contractors via ARES Trinity has saved our construction coordination office hundreds of hours.',
        author: 'Senior BIM Coordinator',
        company: 'Commercial Infrastructure Group',
        role: 'BIM-to-CAD Workflow User',
      },
      {
        quote: 'As long-time AutoCAD users, our drafting cell transitioned to ARES Commander within a single morning. Commands, shortcuts, and DWG drawing sheets worked identically from day one.',
        author: 'Engineering Services Lead',
        company: 'Manufacturing & Tooling Enterprise',
        role: 'CAD Transition Case Study',
      },
    ],
  },

  faqs: [
    {
      q: 'What is ARES Commander?',
      a: 'ARES Commander is a professional DWG-based CAD software developed by Graebert for creating, editing, and documenting 2D drawings and 3D models on desktop computers across Windows, macOS, and Linux.',
      category: 'general',
    },
    {
      q: 'What can I do with ARES Commander?',
      a: 'You can create, view, edit and document DWG drawings, use professional 2D drafting and 3D solid modelling tools, work with supported Revit and IFC BIM models, and connect to cloud and mobile CAD workflows through applicable ARES Trinity features.',
      category: 'general',
    },
    {
      q: 'Does ARES Commander support native DWG format?',
      a: 'Yes. Native DWG support is one of its core capabilities. ARES Commander creates, opens, edits, and saves drawings in DWG format without file conversion, supporting versions from DWG 2018 down to legacy R12.',
      category: 'dwg',
    },
    {
      q: 'Is ARES Commander an alternative to AutoCAD?',
      a: 'ARES Commander is marketed by Graebert as a professional alternative for DWG-based CAD workflows. It features a familiar command-line, standard CAD keyboard shortcuts, toolbars, ribbons, and native DWG file compatibility. Drafters experienced with AutoCAD can begin working with virtually zero transition friction.',
      category: 'general',
    },
    {
      q: 'Does ARES Commander support 3D CAD modelling?',
      a: 'Yes. The product includes full 3D solid and surface modelling capabilities alongside 2D drafting, including ACIS solid primitives (box, cylinder, sphere), boolean operations (union, subtract, intersect), extrusions, revolves, lofts, and 3D view navigation.',
      category: 'capabilities',
    },
    {
      q: 'Which operating systems are supported by ARES Commander?',
      a: 'ARES Commander is available natively for 64-bit Microsoft Windows (11 and 10), Apple macOS (macOS 12 Monterey or newer on both Apple Silicon and Intel), and 64-bit Linux distributions (Ubuntu, Debian, Fedora, openSUSE).',
      category: 'technical',
    },
    {
      q: 'Can I work offline with ARES Commander?',
      a: 'Yes. ARES Commander is a locally installed desktop application and supports full offline workflows. You can draft, edit, model, and save DWG files locally on your computer without an internet connection.',
      category: 'technical',
    },
    {
      q: 'Can I use ARES Commander on multiple computers?',
      a: 'Graebert describes license access across different computers through account login/logout or network licensing options. Standalone licenses can typically be used on a primary and secondary computer (e.g. desktop and laptop) by logging out on one device before logging in on another.',
      category: 'licensing',
    },
    {
      q: 'What is the ARES Trinity ecosystem?',
      a: 'ARES Trinity is Graebert\'s connected CAD ecosystem consisting of ARES Commander for desktop computers, ARES Kudo for browser-based cloud CAD, and ARES Touch for mobile CAD on Android and iOS smartphones and tablets.',
      category: 'bim-trinity',
    },
    {
      q: 'What is ARES Kudo?',
      a: 'ARES Kudo is a browser-based CAD solution for creating, viewing, and modifying DWG drawings online in any modern web browser without installing software. It also generates secure view-only URLs for sharing drawings with clients.',
      category: 'bim-trinity',
    },
    {
      q: 'What is ARES Touch?',
      a: 'ARES Touch is a mobile CAD solution for working with DWG drawings on supported Android and iOS devices. It allows on-site inspection, markup with Apple Pencil or stylus, voice notes, and photo attachments in the field.',
      category: 'bim-trinity',
    },
    {
      q: 'Can I access drawings stored in cloud services?',
      a: 'Yes. ARES Kudo and Trinity support direct integrations with major cloud storage services, including Google Drive, Box, Dropbox, Microsoft OneDrive, Nextcloud, and WebDAV servers.',
      category: 'bim-trinity',
    },
    {
      q: 'Does ARES Commander support Revit and IFC BIM files?',
      a: 'Yes. ARES Commander can import and view supported Autodesk Revit (.RVT) and IFC models. It allows users to filter model elements, extract 2D floor plans, sections, and elevations, and update drawings when the underlying BIM model changes.',
      category: 'bim-trinity',
    },
    {
      q: 'Can I export BIM information and schedules?',
      a: 'Yes. The official product page describes extracting BIM information and element quantities into CAD tables or CSV files for bills of materials (BOM), take-offs, and cost estimation.',
      category: 'bim-trinity',
    },
    {
      q: 'Does ARES Commander support PDF import and export?',
      a: 'Yes. ARES Commander can import vector PDF files and convert vector geometry into fully editable CAD entities (lines, arcs, text). It can also export multi-sheet layouts to high-resolution vector PDF files.',
      category: 'capabilities',
    },
    {
      q: 'Does ARES Commander support Dynamic Blocks?',
      a: 'Yes. ARES Commander supports AutoCAD Dynamic Blocks. You can insert dynamic blocks, change visibility states, adjust stretch grips, and choose configurations from lookup tables.',
      category: 'capabilities',
    },
    {
      q: 'Does ARES Commander have a free trial?',
      a: 'Yes. Graebert offers a full-featured 30-day evaluation trial. You can download ARES Commander from the official Graebert download page and test all 2D, 3D, BIM, and Trinity features without providing credit card details.',
      category: 'general',
    },
    {
      q: 'What licensing options are available for ARES Commander?',
      a: 'Graebert offers Standalone licenses, ARES Commander with Trinity plans, and Network / Flex floating licenses. Term choices can include Annual subscriptions, 3-Year plans, or Perpetual licenses depending on current regional availability.',
      category: 'licensing',
    },
    {
      q: 'Is there a perpetual license option?',
      a: 'Yes, Graebert lists perpetual licensing options for ARES Commander with an optional annual maintenance plan for updates and support. Contact Leniva CAD Solutions for current India perpetual quotes.',
      category: 'licensing',
    },
    {
      q: 'How does ARES Commander differ from ARES Standard?',
      a: 'ARES Standard is focused exclusively on 2D drafting for Windows users at a lower price point. ARES Commander is the flagship product offering 2D and 3D solid modeling, cross-platform support (Windows, Mac, Linux), BIM-to-CAD workflows, Trinity cloud/mobile collaboration, and full developer APIs.',
      category: 'capabilities',
    },
    {
      q: 'Can developers customize ARES Commander and write plug-ins?',
      a: 'Yes. ARES Commander provides robust developer technologies including C++ (Tx API), LISP, DCL, Qt, VSTA (.NET), and COM/ActiveX automation, allowing companies to migrate existing AutoCAD routines or build vertical applications.',
      category: 'technical',
    },
    {
      q: 'Does ARES Commander include technical support?',
      a: 'Yes. Subscriptions and active perpetual maintenance agreements include official Graebert software updates and technical support. In addition, Leniva CAD Solutions provides local customer assistance, onboarding, and onboarding across India.',
      category: 'licensing',
    },
    {
      q: 'Where can I access onboarding for ARES Commander?',
      a: 'Graebert provides the Graebert Academy with free online video courses, official documentation, and video tutorials. Leniva CAD Solutions also offers customized corporate interactive workshops and webinars.',
      category: 'general',
    },
    {
      q: 'How much does ARES Commander cost in India?',
      a: 'Commercial licensing terms depend on the license type (Standalone, Trinity, or Network), duration (Annual, 3-Year, or Perpetual), and seat volume. Submit an enquiry on this page or contact Leniva CAD Solutions for an official GST quotation.',
      category: 'licensing',
    },
  ],

  relatedProducts: [
    {
      name: 'ARES Standard',
      slug: 'ares-standard',
      category: '2D DWG CAD Software',
      desc: 'Cost-effective 2D CAD software for Windows users whose workflow centers on drafting, viewing, modifying, and printing DWG drawings.',
      relationship: 'Entry-level 2D CAD alternative based on the same proven ARES CAD engine.',
    },
    {
      name: 'ARES Mechanical',
      slug: 'ares-mechanical',
      category: 'Mechanical Engineering CAD',
      desc: 'Specialized 2D mechanical CAD software combining ARES Commander drafting power with international standard part libraries, automated ballooning, and BOMs.',
      relationship: 'Mechanical discipline extension built on top of the ARES Commander CAD engine.',
    },
    {
      name: 'ARES Electrical',
      slug: 'ares-electrical',
      category: 'Electrical CAD (ECAD)',
      desc: 'Dedicated electrical engineering CAD software for circuit schematics, automated wire numbering, cross-referencing, and multi-sheet terminal reports.',
      relationship: 'Electrical engineering solution built on the ARES Commander CAD platform.',
    },
    {
      name: 'ARES Kudo',
      slug: 'ares-commander',
      category: 'Cloud CAD Browser App',
      desc: 'Full-featured browser CAD solution that enables online DWG drafting, live view-only URL sharing, and cloud storage synchronization.',
      relationship: 'Cloud component of the ARES Trinity ecosystem included with Trinity subscriptions.',
    },
    {
      name: 'ARES Touch',
      slug: 'ares-commander',
      category: 'Mobile CAD for Tablets & Phones',
      desc: 'Mobile DWG drafting application for Android and iOS devices, enabling job-site inspection, markup, and offline drawing revision.',
      relationship: 'Mobile component of the ARES Trinity ecosystem included with Trinity subscriptions.',
    },
  ],
}
