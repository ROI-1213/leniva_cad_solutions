export interface AresStandardItem {
  id: string
  name: string
  region: string
  description: string
  units: string
}

export interface AresMechanicalPartCategory {
  id: string
  title: string
  eyebrow: string
  description: string
  standardsSupported: string[]
  iconName: string
  image: string
}

export interface AresMechanicalWorkflowStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface AresMechanicalApplication {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface AresMechanicalGalleryItem {
  id: string
  title: string
  category: 'workspace' | 'standards' | 'parts' | 'drafting' | 'bom' | 'trinity'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  attribution?: string
}

export interface AresMechanicalFaq {
  q: string
  a: string
  category: 'general' | 'standards' | 'dwg' | 'trinity' | 'licensing' | 'technical'
}

export interface AresComparisonRow {
  feature: string
  aresMechanical: string
  aresCommander: string
  aresKudo: string
  aresTouch: string
  note?: string
}

export interface AresMechanicalData {
  identity: {
    productName: string
    brand: string
    category: string
    productType: string
    cadEngine: string
    platform: string
    languages: string[]
    primaryFormat: string
    headline: string
    supportingHeadline: string
    shortDescription: string
    description: string
    officialUrl: string
    configuratorUrl: string
    downloadUrl: string
    lastChecked: string
  }
  hero: {
    eyebrow: string
    heading: string
    supportingText: string
    image: string
    badge: string
    labels: string[]
    strip: { label: string; value: string }[]
  }
  overview: {
    heading: string
    description: string
    cards: { title: string; desc: string; icon: string; image: string }[]
  }
  benefits: {
    heading: string
    subtitle: string
    items: { title: string; desc: string; icon: string }[]
  }
  standards: {
    heading: string
    subheading: string
    description: string
    standardsList: AresStandardItem[]
    features: string[]
    image: string
  }
  partsLibraries: {
    heading: string
    subheading: string
    description: string
    categories: AresMechanicalPartCategory[]
    smartEntitiesNote: string
    image: string
  }
  workspace: {
    heading: string
    description: string
    workspaces: { title: string; desc: string; icon: string }[]
    image: string
  }
  draftingTools: {
    automatedLayers: {
      heading: string
      description: string
      features: string[]
      image: string
    }
    constructionLines: {
      heading: string
      description: string
      features: string[]
      image: string
    }
    dimensionedRectangles: {
      heading: string
      description: string
      benefits: string[]
      image: string
    }
    predefinedHatches: {
      heading: string
      description: string
      features: string[]
      image: string
    }
    powerTrim: {
      heading: string
      description: string
      features: string[]
      image: string
    }
  }
  dwgCompatibility: {
    heading: string
    subheading: string
    description: string
    capabilities: string[]
    legacyNotice: string
    image: string
  }
  stepIges: {
    heading: string
    description: string
    features: string[]
    notice: string
    image: string
  }
  annotationsAndBom: {
    heading: string
    description: string
    tools: { title: string; desc: string; icon: string }[]
    image: string
  }
  trinity: {
    heading: string
    description: string
    cards: { title: string; subtitle: string; desc: string; platform: string; limitation?: string; image: string }[]
    notice: string
  }
  targetUsers: { title: string; desc: string; icon: string }[]
  applications: AresMechanicalApplication[]
  workflow: AresMechanicalWorkflowStep[]
  formatCompatibility: { format: string; description: string; supportType: string }[]
  comparisonTable: {
    heading: string
    subtitle: string
    rows: AresComparisonRow[]
  }
  licensing: {
    heading: string
    description: string
    options: { title: string; desc: string; badge?: string }[]
    notice: string
  }
  systemRequirements: {
    category: string
    minimum: string
    recommended: string
    notes?: string
  }[]
  faqs: AresMechanicalFaq[]
  relatedProducts: {
    id: string
    name: string
    brand: string
    description: string
    route: string
    image: string
  }[]
}

export const aresMechanicalData: AresMechanicalData = {
  identity: {
    productName: 'ARES Mechanical',
    brand: 'Graebert',
    category: '2D Mechanical CAD Software',
    productType: 'DWG-based mechanical design and drafting software',
    cadEngine: 'ARES Commander Engine',
    platform: 'Windows 64-bit (11 / 10)',
    languages: ['English', 'German', 'Polish', 'Japanese', 'Korean', 'Traditional Chinese'],
    primaryFormat: 'DWG Native',
    headline: 'Professional 2D Mechanical CAD Software in DWG',
    supportingHeadline: 'Design. Draft. Document. With Mechanical Precision.',
    shortDescription: 'Create and modify professional 2D mechanical drawings with standards-based tools, intelligent components, mechanical annotations, and a familiar DWG-based CAD environment.',
    description: 'ARES Mechanical is a professional DWG-based mechanical CAD solution that combines the comprehensive drafting power of ARES Commander with specialized tools for 2D mechanical engineering. It equips mechanical engineers, drafters, and manufacturing teams to author and maintain detailed production drawings using international drafting standards (ISO, ANSI, DIN, BSI, JIS), smart hardware libraries, automated mechanical layer management, and intelligent Bills of Materials (BOM).',
    officialUrl: 'https://www.graebert.com/in/cad-software/ares-mechanical/',
    configuratorUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-mechanical/',
    lastChecked: 'Official Graebert ARES Mechanical Specification (October 2024)',
  },

  hero: {
    eyebrow: 'GRAEBERT | MECHANICAL CAD',
    heading: 'Professional 2D Mechanical CAD in DWG',
    supportingText: 'Create detailed mechanical drawings with a specialized CAD environment built for engineers and designers. ARES Mechanical combines native DWG editing with intelligent mechanical tools, standardized components, automated layers, and production-ready documentation.',
    image: '/images/software/ares-mechanical.jpg',
    badge: 'Native DWG Mechanical Engine',
    labels: [
      'DWG-Based CAD',
      'Mechanical Standards (ISO, ANSI, DIN)',
      'Smart Parts Libraries',
      'Production-Ready Drawings',
    ],
    strip: [
      { label: 'Product', value: 'ARES Mechanical' },
      { label: 'Type', value: '2D Mechanical CAD' },
      { label: 'Native File Format', value: 'DWG' },
      { label: 'Operating System', value: 'Windows 64-bit' },
      { label: 'Core Engine', value: 'ARES Commander' },
    ],
  },

  overview: {
    heading: 'Mechanical CAD Designed Around Your Workflow',
    description: 'ARES Mechanical combines the robust DWG drafting engine of ARES Commander with dedicated engineering functions. Engineered for professionals who create detailed 2D fabrication drawings, modify existing AutoCAD Mechanical DWG projects, and occasionally view 3D CAD references.',
    cards: [
      {
        title: 'Professional DWG Drafting',
        desc: 'Open, edit, create, and save native DWG technical drawings with zero conversion loss using the battle-tested ARES Commander CAD engine.',
        icon: 'FileCode',
        image: '/images/ares-mechanical/ares-hero.jpg',
      },
      {
        title: 'Mechanical-Specific Tools',
        desc: 'Access ready-to-use mechanical parts libraries, screw connections, hole tables, mechanical symbols, and automatic BOM generators.',
        icon: 'Wrench',
        image: '/images/software/sections/ares-mech-tools.jpg',
      },
      {
        title: 'Standardized Documentation',
        desc: 'Enforce international standards (ISO, ANSI, DIN, JIS, BSI) for drawing frames, title blocks, dimension styles, and mechanical layers.',
        icon: 'Award',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Customizable CAD Environment',
        desc: 'Switch effortlessly between specialized Mechanical ribbons, classic menu/toolbars, and general 2D/3D ARES workspaces.',
        icon: 'Sliders',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },

  benefits: {
    heading: 'Everything You Need for Mechanical Drafting',
    subtitle: 'A specialized set of mechanical drafting tools built on an industrial-grade DWG CAD engine.',
    items: [
      {
        title: 'Standards-Based Design',
        desc: 'Select international standards (ISO, ANSI, DIN, BSI, JIS) to instantly activate predefined drawing settings, styles, layers, and part libraries.',
        icon: 'Globe',
      },
      {
        title: 'Faster Mechanical Drafting',
        desc: 'Use smart parametric fasteners, screw connection routines, and dedicated drafting functions to eliminate repetitive manual line drawing.',
        icon: 'Zap',
      },
      {
        title: 'Consistent Engineering Drawings',
        desc: 'Apply standards-based layers, text styles, and geometric conventions to maintain strict uniformity across large design teams.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Intelligent Mechanical Entities',
        desc: 'Components maintain mechanical intelligence so that part references, balloons, and Bills of Materials dynamically synchronize.',
        icon: 'Cpu',
      },
      {
        title: 'Flexible Workspace Options',
        desc: 'Choose between the dedicated Mechanical Ribbon, the classic menu/toolbar layout, or general 2D/3D workspaces.',
        icon: 'Layers',
      },
      {
        title: 'DWG & AutoCAD Mechanical Compatibility',
        desc: 'Read, modify, and preserve compatible mechanical entities created in AutoCAD Mechanical, facilitating smooth legacy transitions.',
        icon: 'Repeat',
      },
    ],
  },

  standards: {
    heading: 'Design with International Mechanical Standards',
    subheading: 'Standardize Your Drawings from the Start',
    description: 'ARES Mechanical supports major international drafting standards that can be selected at the start of any new project. The chosen standard automatically configures drawing scales, dimension styles, mechanical layer names, line weights, title frames, and component libraries. You can also define custom company standards by copying and fine-tuning an existing standard.',
    standardsList: [
      { id: 'iso', name: 'ISO', region: 'International Organization for Standardization', description: 'Global metric standard widely utilized in automotive, industrial, and European manufacturing.', units: 'Metric (mm)' },
      { id: 'ansi-inch', name: 'ANSI (Inch)', region: 'American National Standards Institute', description: 'Imperial standard for North American machinery, aerospace, and tooling manufacturers.', units: 'Imperial (Inches)' },
      { id: 'ansi-metric', name: 'ANSI (Metric)', region: 'American National Standards Institute', description: 'Metric variant for American export and global assembly projects.', units: 'Metric (mm)' },
      { id: 'din', name: 'DIN', region: 'Deutsches Institut für Normung', description: 'Renowned German engineering standard for machine construction and precision engineering.', units: 'Metric (mm)' },
      { id: 'bsi', name: 'BSI', region: 'British Standards Institution', description: 'UK national standard for mechanical engineering documentation and construction drawings.', units: 'Metric (mm)' },
      { id: 'jis', name: 'JIS', region: 'Japanese Industrial Standards', description: 'Precision mechanical and electronics standard across Asian manufacturing supply chains.', units: 'Metric (mm)' },
    ],
    features: [
      'Predefined drawing settings and standardized line weight hierarchies',
      'Standard-specific layer creation and automatic entity grouping',
      'Configurable drawing frames and ISO/ANSI title block templates',
      'Custom company standard creation: duplicate existing standards and add custom rules',
    ],
    image: '/images/ares-mechanical/ares-standards.jpg',
  },

  partsLibraries: {
    heading: 'Ready-to-Use Mechanical Parts Libraries',
    subheading: 'Standardized Fasteners & Components at Your Fingertips',
    description: 'ARES Mechanical includes extensive parametric parts libraries organized around your selected standard. Insert bolts, screws, washers, nuts, pins, and custom hole patterns in seconds with dynamic view options (top, front, side, and section views).',
    categories: [
      {
        id: 'bolts-screws',
        title: 'Bolts & Screws',
        eyebrow: 'FASTENERS',
        description: 'Hex head bolts, socket head cap screws, countersunk screws, and set screws with predefined thread pitches and nominal lengths.',
        standardsSupported: ['ISO', 'DIN', 'ANSI', 'JIS', 'BSI'],
        iconName: 'Wrench',
        image: '/images/ares-mechanical/ares-fasteners.jpg',
      },
      {
        id: 'screw-connections',
        title: 'Screw Connections',
        eyebrow: 'ASSEMBLIES',
        description: 'Intelligent multi-part routines that calculate plate stack thickness and insert bolt, washer, and nut assemblies together.',
        standardsSupported: ['ISO', 'DIN', 'ANSI'],
        iconName: 'Layers',
        image: '/images/ares-mechanical/ares-hero.jpg',
      },
      {
        id: 'nuts-washers',
        title: 'Nuts, Pins & Washers',
        eyebrow: 'HARDWARE',
        description: 'Plain washers, spring washers, lock nuts, dowel pins, cotter pins, and split pins generated to standard nominal dimensions.',
        standardsSupported: ['ISO', 'DIN', 'ANSI', 'JIS'],
        iconName: 'Box',
        image: '/images/ares-mechanical/ares-fasteners.jpg',
      },
      {
        id: 'holes-tables',
        title: 'Holes & Hole Tables',
        eyebrow: 'MACHINING',
        description: 'Through-holes, blind holes, countersinks, and counterbores with automatic coordinate hole table generation for CNC operators.',
        standardsSupported: ['ISO', 'DIN', 'ANSI', 'JIS'],
        iconName: 'Crosshair',
        image: '/images/ares-mechanical/ares-drafting.jpg',
      },
    ],
    smartEntitiesNote: 'Smart Entity Recognition: Inserted components carry structured mechanical metadata that feeds dynamically into Parts Lists, Bill of Materials (BOM), and ballooning routines.',
    image: '/images/ares-mechanical/ares-fasteners.jpg',
  },

  workspace: {
    heading: 'A Dedicated Workspace for Mechanical Design',
    description: 'ARES Mechanical arranges commands specifically for mechanical workflows. The Mechanical ribbon tab places standard tools front and center, while the Toolbox tab gives immediate access to fasteners, hole patterns, surface symbols, welding annotations, and BOM generation.',
    workspaces: [
      {
        title: 'Mechanical Ribbon',
        desc: 'Purpose-built ribbon grouping construction lines, dimensioned rectangles, Power Trim, parts libraries, and mechanical symbols.',
        icon: 'Layout',
      },
      {
        title: 'Toolbox Tab',
        desc: 'Instant access to bolts, nuts, hole callouts, revision tables, and BOM generator without digging through complex nested menus.',
        icon: 'Tool',
      },
      {
        title: 'Classic Menu & Toolbars',
        desc: 'Switch to a traditional AutoCAD-style menu and toolbar interface if preferred by experienced legacy CAD drafters.',
        icon: 'Sliders',
      },
      {
        title: 'Drafting & Annotation Workspace',
        desc: 'General 2D CAD drafting environment powered by ARES Commander for architectural, electrical, or general layouts.',
        icon: 'Edit',
      },
      {
        title: '3D Modeling Workspace',
        desc: 'ACIS 3D solid modeling workspace to view, inspect, and model 3D solids, extrusions, and boolean geometry.',
        icon: 'Box',
      },
      {
        title: 'Familiar Keyboard Commands',
        desc: 'Support for industry-standard command-line shortcuts, aliases, scripts, and LISP routines.',
        icon: 'Terminal',
      },
    ],
    image: '/images/ares-mechanical/ares-workspace.jpg',
  },

  draftingTools: {
    automatedLayers: {
      heading: 'Automated Layer Management',
      description: 'As you draw mechanical entities, ARES Mechanical automatically assigns them to designated layers (e.g. AM_0 for visible outlines, AM_2 for hidden lines, AM_5 for dimensions, AM_7 for hatching) according to the selected standard. This guarantees drawing consistency and saves hours of manual layer organization.',
      features: [
        'Automatic layer creation as mechanical entities are drawn',
        'Pre-configured standard layer names, line weights, and colors',
        'Customizable layer definitions saved in company drawing templates',
        'Maintains clean drawing structures across large design teams',
      ],
      image: '/images/ares-mechanical/ares-drafting.jpg',
    },
    constructionLines: {
      heading: 'Precise Construction Lines',
      description: 'Generate infinite horizontal, vertical, and angled reference lines to construct complex geometric projections and machine alignments. Construction lines reside on dedicated non-printing layers and can be hidden or deleted with a single command.',
      features: [
        'Horizontal, vertical, and angled projection guides',
        'Dedicated non-printing reference layer',
        'One-click visibility toggle for clean drawing views',
        'Combines seamlessly with Power Trim to sculpt final parts',
      ],
      image: '/images/ares-mechanical/ares-drafting.jpg',
    },
    dimensionedRectangles: {
      heading: 'Dimensioned Rectangles',
      description: 'Accelerate part creation with the smart rectangle tool that simultaneously defines geometry and inserts aligned horizontal and vertical dimensions in a single step.',
      benefits: [
        'Specify length and width with automatic dimension placement',
        'Eliminates separate dimensioning steps for mechanical plates',
        'Maintains strict alignment with standard text styles',
      ],
      image: '/images/ares-mechanical/ares-drafting.jpg',
    },
    predefinedHatches: {
      heading: 'Predefined Mechanical Hatches',
      description: 'Communicate material properties in section views using standard-compliant hatch patterns for cast iron, steel, bronze, aluminum, polymers, and liquid volumes.',
      features: [
        'Standard mechanical material hatching library',
        'Automatic layer routing to dedicated hatch layers',
        'Dynamic scale and angle adjustments for section cuts',
      ],
      image: '/images/ares-mechanical/ares-drafting.jpg',
    },
    powerTrim: {
      heading: 'Power Trim: Mouse-Path Trimming',
      description: 'Trim dozens of intersecting lines simply by moving your cursor across them. Power Trim acts like a digital scalpel: drag across geometry to trim, or hold Shift to extend lines to their nearest boundary.',
      features: [
        'Fluid cursor-path multi-line trimming',
        'Hold Shift to extend entities dynamically',
        'Dramatically accelerates cleanup after generating construction lines',
      ],
      image: '/images/ares-mechanical/ares-drafting.jpg',
    },
  },

  dwgCompatibility: {
    heading: 'Work with Mechanical Drawings in DWG',
    subheading: 'Native DWG Compatibility with AutoCAD Mechanical Entities',
    description: 'ARES Mechanical is built around the open, universal DWG standard. It reads and writes native DWG files without translation or conversion data loss. Furthermore, it understands and modifies specialized mechanical entities created in Autodesk AutoCAD Mechanical.',
    capabilities: [
      'Create, open, edit, and save DWG mechanical drawings directly',
      'Read and modify part references created in AutoCAD Mechanical',
      'Update existing Parts Lists and Bills of Materials (BOM)',
      'Add or replace components with automatic part reference insertion',
      'Preserve mechanical standard definitions across mixed CAD environments',
    ],
    legacyNotice: 'DWG Compatibility Note: ARES Mechanical maintains high fidelity with standard DWG formats and compatible AutoCAD Mechanical entities. Exact entity support varies by specific drawing content and release versions.',
    image: '/images/ares-mechanical/ares-dwg-compat.jpg',
  },

  stepIges: {
    heading: 'Connect 2D Drafting with 3D References',
    description: 'ARES Mechanical supports importing and exporting STEP and IGES files to visualize small 3D models originating from PLM or 3D solid modeling software. Inspect 3D component geometry directly inside your 2D mechanical drafting workspace.',
    features: [
      'Import STEP (.stp, .step) and IGES (.igs, .iges) 3D files',
      'Export 3D solid geometries to standard neutral formats',
      'Generate 2D drawing projections from imported 3D models',
      'Reference small 3D vendor models alongside 2D DWG fabrication drawings',
    ],
    notice: 'Note: STEP/IGES functionality in ARES Mechanical is intended for reference and visualization of supported models within a 2D-centric workflow, and is not a substitute for high-end parametric 3D simulation or CAM software.',
    image: '/images/ares-mechanical/ares-drafting.jpg',
  },

  annotationsAndBom: {
    heading: 'Mechanical Annotations & Documentation',
    description: 'Every manufacturing drawing demands precise, standardized annotations to communicate tolerances, surface finishes, welding specifications, and part counts. ARES Mechanical provides a full suite of mechanical annotation symbols and linked BOM tables.',
    tools: [
      { title: 'Part References', desc: 'Attach structured part metadata (part number, material, supplier) to drawing blocks.', icon: 'Tag' },
      { title: 'Bills of Materials (BOM)', desc: 'Automatically extract component quantities and specifications into a live drawing BOM.', icon: 'Table' },
      { title: 'Parts Lists', desc: 'Place structured assembly schedules directly on drawing sheets with automated item numbering.', icon: 'List' },
      { title: 'Item Balloons', desc: 'Insert numbered identification balloons dynamically linked to the Parts List.', icon: 'Circle' },
      { title: 'Revision Tables', desc: 'Track drawing engineering change notices (ECN), revision letters, authors, and dates.', icon: 'Clock' },
      { title: 'Surface Finish Symbols', desc: 'Standardized machining symbols for roughness, lay direction, and material removal allowances.', icon: 'Sparkles' },
      { title: 'Welding Symbols', desc: 'Comprehensive international welding notations (fillet, butt, seam, bevel) with tail notes.', icon: 'Zap' },
      { title: 'Drawing Frames & Titles', desc: 'Standardized ISO, DIN, and ANSI paper frames with intelligent title block attributes.', icon: 'Layout' },
    ],
    image: '/images/ares-mechanical/ares-bom.jpg',
  },

  trinity: {
    heading: 'Extend Your CAD Workflow with ARES Trinity',
    description: 'When purchased with a qualifying Trinity subscription, ARES Mechanical connects to Graebert’s Trinity ecosystem, giving you synchronized drawing access on mobile devices (ARES Touch) and cloud browsers (ARES Kudo).',
    cards: [
      {
        title: 'ARES Mechanical (Desktop)',
        subtitle: 'Windows 64-bit Workstation',
        desc: 'The complete desktop workstation engine with specialized mechanical parts libraries, standards, automated layers, and BOM generation.',
        platform: 'Windows Desktop',
        image: '/images/ares-mechanical/ares-hero.jpg',
      },
      {
        title: 'ARES Touch (Mobile)',
        subtitle: 'iOS & Android Smartphones / Tablets',
        desc: 'Review, markup, measure, and record field inspection audio notes directly on DWG drawings while on the factory shop floor.',
        platform: 'Mobile & Tablet',
        limitation: 'Note: Mechanical-specific tools (smart parts, BOM) are authored on desktop and viewed/annotated as standard DWG geometry on mobile.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'ARES Kudo (Cloud Browser)',
        subtitle: 'Zero-Install Browser DWG CAD',
        desc: 'Share live view-only or editing links with clients and suppliers without requiring software installations or file attachments.',
        platform: 'Cloud Browser',
        limitation: 'Note: Cloud browser CAD edits standard DWG vectors; specialized mechanical tools require the Windows desktop application.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      },
    ],
    notice: 'Trinity subscription inclusions vary by license type. ARES Mechanical can also be purchased as a standalone perpetual or annual desktop license.',
  },

  targetUsers: [
    { title: 'Mechanical Engineers', desc: 'Design precision mechanical components, author fabrication drawings, and specify tolerances according to ISO/DIN/ANSI.', icon: 'Cpu' },
    { title: 'CAD Drafters & Designers', desc: 'Produce detailed manufacturing packages with automated layers, dimensioned rectangles, and smart fasteners.', icon: 'Edit' },
    { title: 'Factory Layout Planners', desc: 'Design factory floor layouts, machine placement envelopes, and assembly line material handling routes in DWG.', icon: 'Building2' },
    { title: 'Maintenance & Tooling Teams', desc: 'Revise legacy DWG drawings, specify replacement fasteners, and document machine retrofits efficiently.', icon: 'Wrench' },
    { title: 'Machine Builders & OEMs', desc: 'Generate complete assembly drawing packages with dynamic Parts Lists and Bills of Materials (BOM).', icon: 'Box' },
    { title: 'Engineering Consultancies', desc: 'Deliver standards-compliant drawings to domestic and international clients with zero file conversion headaches.', icon: 'Globe' },
  ],

  applications: [
    {
      id: 'component-design',
      title: 'Mechanical Component Design',
      subtitle: 'Shafts, Gears, Brackets & Housings',
      description: 'Prepare detailed manufacturing drawings with geometric dimensioning, surface finishes, and hole coordinate tables.',
      toolTags: ['ISO/DIN Standards', 'Hole Tables', 'Power Trim', 'Surface Symbols'],
      image: '/images/ares-mechanical/ares-hero.jpg',
      deliverables: ['Detailed part drawings', 'Surface roughness callouts', 'Machining tolerance notes', 'Hole coordinate tables'],
    },
    {
      id: 'assemblies',
      title: 'Assembly & Sub-Assembly Drawings',
      subtitle: 'Complete Machine Documentation',
      description: 'Document complex mechanical machinery with standardized screw connections, item balloons, and live Bills of Materials.',
      toolTags: ['Screw Connections', 'Item Balloons', 'Live BOM', 'Parts List'],
      image: '/images/software/sections/ares-mech-assembly.jpg',
      deliverables: ['General arrangement drawings', 'BOM schedules', 'Exploded assembly references', 'Revision history sheets'],
    },
    {
      id: 'factory-layout',
      title: 'Factory Layout & Machine Envelopes',
      subtitle: 'Plant Equipment & Flow Logistics',
      description: 'Draft 2D factory floor plans, equipment safety envelopes, utility drops, and material handling pathways.',
      toolTags: ['DWG Layouts', 'ARES Commander Engine', 'Construction Lines'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Factory floor plans', 'Clearance envelopes', 'Utility connection schematics', 'Equipment placement drawings'],
    },
    {
      id: 'maintenance-retrofit',
      title: 'Maintenance & Machine Retrofit',
      subtitle: 'Legacy DWG Revisions & ECN Updates',
      description: 'Update existing AutoCAD Mechanical DWG drawings to reflect modified parts, updated bearings, and new sub-assemblies.',
      toolTags: ['AutoCAD Mechanical DWG', 'Part References', 'Revision Tables'],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Engineering Change Notices (ECN)', 'As-maintained drawing sets', 'Fastener replacement schedules'],
    },
    {
      id: 'tooling-fixtures',
      title: 'Jigs, Fixtures & Tooling Design',
      subtitle: 'Production Tooling & Clamp Setup',
      description: 'Design welding fixtures, machining jigs, and press dies with precise dowel pin placements and standardized clamp hardware.',
      toolTags: ['Pins & Dowels', 'Predefined Hatches', 'Dimensioned Rectangles'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Fixture assembly drawings', 'Tooling fabrication details', 'Dowel pin coordinate charts'],
    },
    {
      id: 'sheet-metal',
      title: 'Sheet Metal & Fabrication Drafting',
      subtitle: 'Welded Frames & Structural Profiles',
      description: 'Author weldment drawing packages with international welding symbols, plate dimensions, and material specifications.',
      toolTags: ['Welding Symbols', 'Material Hatches', 'Construction Lines'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Weldment detail sheets', 'Plate cut lists', 'Welding symbol callouts', 'Structural frame general arrangements'],
    },
  ],

  workflow: [
    {
      stepNumber: '01',
      title: 'Select Mechanical Standard',
      shortTitle: 'Standard',
      subtitle: 'Configure Drawing Environment',
      description: 'Choose from ISO, ANSI Inch, ANSI Metric, DIN, BSI, or JIS to automatically set up layer names, dimension styles, and part libraries.',
      tools: ['Standards Selector', 'Template Configurator', 'Drawing Scale'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: 'Setup',
    },
    {
      stepNumber: '02',
      title: 'Create Geometry with Smart Tools',
      shortTitle: 'Drafting',
      subtitle: 'Rapid Part Construction',
      description: 'Use construction lines, dimensioned rectangles, and Power Trim alongside the full ARES Commander 2D drafting engine.',
      tools: ['Construction Lines', 'Dimensioned Rectangles', 'Power Trim'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Authoring',
    },
    {
      stepNumber: '03',
      title: 'Insert Standard Mechanical Parts',
      shortTitle: 'Hardware',
      subtitle: 'Parametric Fasteners & Holes',
      description: 'Select standardized bolts, nuts, pins, washers, and holes from the mechanical library with automated thread specification.',
      tools: ['Fastener Library', 'Screw Connections', 'Hole Generator'],
      image: '/images/software/sections/ares-mech-parts.jpg',
      badge: 'Components',
    },
    {
      stepNumber: '04',
      title: 'Automatic Layer Organization',
      shortTitle: 'Layers',
      subtitle: 'Standards-Based Layer Routing',
      description: 'Entities are routed automatically to their designated standard layers (outlines, centerlines, dimensions, hatches) as you draw.',
      tools: ['Automated Layer Manager', 'Standard Layer Map', 'Color Manager'],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      badge: 'Organization',
    },
    {
      stepNumber: '05',
      title: 'Apply Mechanical Annotations & BOM',
      shortTitle: 'Annotate',
      subtitle: 'Symbols, Balloons & Parts Lists',
      description: 'Insert surface finish symbols, welding notations, item identification balloons, and automatically generate the Bill of Materials.',
      tools: ['Welding Symbols', 'Surface Texture', 'BOM Generator', 'Balloons'],
      image: '/images/ares-mechanical/ares-hero.jpg',
      badge: 'Documentation',
    },
    {
      stepNumber: '06',
      title: 'Review, Output & Collaborate',
      shortTitle: 'Output',
      subtitle: 'Production Release & Trinity',
      description: 'Publish high-resolution PDF or DWG fabrication packages, and review drawings on mobile (ARES Touch) or cloud (ARES Kudo) via Trinity.',
      tools: ['Native DWG Save', 'PDF Publisher', 'ARES Trinity Cloud'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      badge: 'Release',
    },
  ],

  formatCompatibility: [
    { format: 'DWG', description: 'Native DWG file read/write up to latest AutoCAD format with zero conversion loss.', supportType: 'Primary Native Format' },
    { format: 'AutoCAD Mechanical DWG', description: 'Read and modify compatible mechanical entities, part references, and BOMs.', supportType: 'Supported Mechanical Entities' },
    { format: 'DXF & DWF', description: 'Full support for legacy data exchange and web CAD viewing.', supportType: 'Full Import / Export' },
    { format: 'STEP (.step, .stp)', description: 'Import and export neutral 3D CAD files for visual reference and geometric inspection.', supportType: '3D Reference Visualization' },
    { format: 'IGES (.iges, .igs)', description: 'Neutral surface and solid 3D reference exchange format.', supportType: '3D Reference Visualization' },
    { format: 'PDF', description: 'Vector PDF export for shop floor prints, with PDF import and conversion to editable CAD geometry.', supportType: 'Import & Export' },
  ],

  comparisonTable: {
    heading: 'Explore the ARES CAD Product Family',
    subtitle: 'Understand the distinct capabilities of ARES Mechanical alongside general ARES Commander and the Trinity ecosystem.',
    rows: [
      { feature: 'Primary Purpose', aresMechanical: '2D Mechanical Engineering CAD', aresCommander: 'General 2D/3D DWG CAD', aresKudo: 'Cloud Browser DWG CAD', aresTouch: 'Mobile DWG CAD' },
      { feature: 'Primary Operating System', aresMechanical: 'Windows 64-bit', aresCommander: 'Windows, macOS, Linux', aresKudo: 'Any Modern Browser', aresTouch: 'iOS & Android' },
      { feature: 'Native DWG Read / Write', aresMechanical: 'Yes (Full Native)', aresCommander: 'Yes (Full Native)', aresKudo: 'Yes (Cloud Native)', aresTouch: 'Yes (Mobile Native)' },
      { feature: 'Mechanical Standards (ISO, DIN, ANSI, JIS)', aresMechanical: 'Included', aresCommander: 'Not included', aresKudo: 'View as geometry', aresTouch: 'View as geometry' },
      { feature: 'Parametric Hardware Libraries (Bolts, Nuts)', aresMechanical: 'Included', aresCommander: 'Not included', aresKudo: 'Not included', aresTouch: 'Not included' },
      { feature: 'Automated Mechanical Layer Management', aresMechanical: 'Included', aresCommander: 'Manual Layers', aresKudo: 'Standard Layers', aresTouch: 'Standard Layers' },
      { feature: 'Live Bill of Materials (BOM) & Balloons', aresMechanical: 'Included', aresCommander: 'Basic Tables', aresKudo: 'View Only', aresTouch: 'View Only' },
      { feature: 'Power Trim & Construction Lines', aresMechanical: 'Included', aresCommander: 'Power Trim included', aresKudo: 'Standard Trim', aresTouch: 'Standard Trim' },
      { feature: 'AutoCAD Mechanical Entity Editing', aresMechanical: 'Supported', aresCommander: 'View as proxy', aresKudo: 'View as proxy', aresTouch: 'View as proxy' },
      { feature: 'STEP & IGES 3D Model Visualization', aresMechanical: 'Included', aresCommander: 'Included', aresKudo: 'Not included', aresTouch: 'Not included' },
    ],
  },

  licensing: {
    heading: 'Flexible Licensing Options for Your Business',
    description: 'Graebert offers flexible licensing models for ARES Mechanical in India, available as annual subscriptions or perpetual licenses with or without the ARES Trinity cloud/mobile bundle.',
    options: [
      {
        title: '1-Year Subscription',
        desc: 'Annual term license including continuous software updates, email support, and optional Trinity access.',
        badge: 'Cost Effective',
      },
      {
        title: '3-Year Subscription',
        desc: 'Multi-year term locking in software licensing rates with guaranteed version upgrades for 36 months.',
      },
      {
        title: 'Perpetual License',
        desc: 'Own your software permanently with an included 1-year maintenance plan (365 days of upgrades and technical support).',
        badge: 'Zero Subscription Trap',
      },
      {
        title: 'Network / Flex Floating License',
        desc: 'Shared concurrent licensing for multi-user design teams and manufacturing corporations.',
      },
    ],
    notice: 'Licensing models in India vary by company size, term length, and Trinity inclusion. Contact Leniva CAD Solutions for current official commercial quotes in INR with GST invoicing.',
  },

  systemRequirements: [
    {
      category: 'Operating System',
      minimum: 'Windows 10 64-bit (version 21H2 or later)',
      recommended: 'Windows 11 64-bit (latest official update)',
      notes: 'ARES Mechanical is officially developed and supported for 64-bit Windows operating systems.',
    },
    {
      category: 'Processor (CPU)',
      minimum: 'Intel Core i5 / AMD multi-core 2.5 GHz or higher',
      recommended: 'Intel Core i7 / i9 (13th/14th Gen) or AMD Ryzen 7 / 9 (3.2+ GHz)',
      notes: 'High single-core clock frequencies accelerate 2D geometry regeneration and complex DWG opening speeds.',
    },
    {
      category: 'System Memory (RAM)',
      minimum: '8 GB RAM',
      recommended: '16 GB or 32 GB RAM for large machine assemblies and high entity counts',
      notes: 'Large mechanical layouts with extensive BOM schedules run smoother with 16GB+ RAM.',
    },
    {
      category: 'Graphics Card (GPU)',
      minimum: 'Dedicated 3D graphics card with 2 GB VRAM and OpenGL 3.2 support',
      recommended: 'NVIDIA GeForce RTX or NVIDIA RTX professional series with 4 GB+ VRAM',
      notes: 'Hardware acceleration enhances smooth pan, zoom, and 3D solid model rotation.',
    },
    {
      category: 'Hard Disk Storage',
      minimum: '2 GB available hard drive space for installation',
      recommended: 'Solid State Drive (SSD / NVMe M.2) for fast project file loading',
      notes: 'SSD storage significantly improves drawing opening and saving performance.',
    },
    {
      category: 'Display & Mouse',
      minimum: '1920 × 1080 Full HD resolution',
      recommended: '2560 × 1440 (2K) or 4K IPS display with 3-button scroll wheel mouse',
      notes: 'High resolution display ensures crisp readability of complex mechanical dimension annotations.',
    },
  ],

  faqs: [
    {
      category: 'general',
      q: 'What is ARES Mechanical?',
      a: 'ARES Mechanical is Graebert’s professional 2D mechanical CAD software built on the ARES Commander engine. It pairs standard DWG editing with specialized mechanical tools, including international drafting standards (ISO, ANSI, DIN, BSI, JIS), parametric hardware libraries, automated mechanical layer routing, and dynamic Bills of Materials (BOM).',
    },
    {
      category: 'general',
      q: 'Who is ARES Mechanical designed for?',
      a: 'It is built for mechanical engineers, CAD drafters, tooling designers, manufacturing teams, machine builders, factory layout planners, and maintenance personnel who need to create, modify, and document detailed 2D production drawings in DWG format.',
    },
    {
      category: 'dwg',
      q: 'What is the primary file format used by ARES Mechanical?',
      a: 'ARES Mechanical uses native DWG as its primary file format. It can open, edit, and save DWG files up to the latest AutoCAD versions without data translation or conversion errors.',
    },
    {
      category: 'technical',
      q: 'Which operating systems are supported by ARES Mechanical?',
      a: 'The official Graebert product page specifies ARES Mechanical exclusively for 64-bit Windows operating systems (Windows 11 and Windows 10 64-bit).',
    },
    {
      category: 'standards',
      q: 'Which mechanical drafting standards are supported?',
      a: 'ARES Mechanical officially supports ISO, ANSI Inch, ANSI Metric, DIN, BSI, and JIS standards. Users can also create customized company standards by duplicating and modifying any international standard.',
    },
    {
      category: 'standards',
      q: 'Does ARES Mechanical include pre-built parts libraries?',
      a: 'Yes. It features ready-to-use mechanical hardware libraries including bolts and screws, screw connections, nuts, washers, pins, and hole patterns configured to match the selected drafting standard.',
    },
    {
      category: 'standards',
      q: 'Does ARES Mechanical support Bills of Materials (BOM) and ballooning?',
      a: 'Yes. ARES Mechanical automatically recognizes inserted smart mechanical entities to generate live Bills of Materials, structured Parts Lists, and item callout balloons with automated numbering.',
    },
    {
      category: 'dwg',
      q: 'Can ARES Mechanical read and edit AutoCAD Mechanical drawings?',
      a: 'Yes. ARES Mechanical can open, view, and modify compatible mechanical entities, part references, and BOM tables created in AutoCAD Mechanical, facilitating smooth migration for engineering teams.',
    },
    {
      category: 'technical',
      q: 'Can I use ARES Mechanical for 3D modeling?',
      a: 'ARES Mechanical includes ARES Commander’s 3D solid modeling workspace for viewing and creating basic 3D ACIS solids. It also supports STEP and IGES files for visualizing small 3D component models within a 2D-centric workflow. However, it is not intended as a full parametric 3D simulation or CAM system.',
    },
    {
      category: 'technical',
      q: 'What is Power Trim?',
      a: 'Power Trim is a dynamic drafting command that lets you trim multiple intersecting lines simply by dragging your cursor along a path over them. Holding down the Shift key extends lines to the nearest boundary.',
    },
    {
      category: 'technical',
      q: 'How does automated layer management work?',
      a: 'When drawing in ARES Mechanical, entities are automatically assigned to predetermined standard layers (e.g., outlines, hidden lines, centerlines, dimensions, and hatches). This removes the need for manual layer switching and ensures company-wide drawing uniformity.',
    },
    {
      category: 'trinity',
      q: 'Is ARES Mechanical available with cloud and mobile tools?',
      a: 'Yes. When purchased with a qualifying ARES Trinity subscription, you receive access to ARES Touch (for iOS and Android devices) and ARES Kudo (cloud browser CAD) for reviewing and redlining drawings on mobile or web. Note that specialized mechanical authoring tools (smart parts, BOM) are designed for the desktop workstation.',
    },
    {
      category: 'licensing',
      q: 'Is a perpetual license available for ARES Mechanical?',
      a: 'Yes. Unlike many CAD vendors that enforce subscription-only models, Graebert offers perpetual licenses for ARES Mechanical alongside 1-year and 3-year subscription options.',
    },
    {
      category: 'licensing',
      q: 'How can I get an ARES Mechanical quote in India?',
      a: 'Leniva CAD Solutions is an authorized CAD/CAM software provider in India. Contact our team to receive competitive commercial quotes in INR with GST-compliant invoicing and technical onboarding.',
    },
    {
      category: 'general',
      q: 'Where can I find official ARES Mechanical product documentation?',
      a: 'You can review official product specifications at https://www.graebert.com/in/cad-software/ares-mechanical/.',
    },
  ],

  relatedProducts: [
    {
      id: 'ares-commander',
      name: 'ARES Commander',
      brand: 'Graebert',
      description: 'Professional DWG-native 2D/3D CAD software with ACIS 3D solid modeling and Trinity cloud synchronization.',
      route: '/products/ares-commander',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ares-electrical',
      name: 'ARES Electrical',
      brand: 'Graebert',
      description: 'Intelligent electrical engineering CAD for circuit schematics, panel enclosures, and automated wire terminal lists.',
      route: '/products/ares-electrical',
      image: '/images/ares-mechanical/ares-hero.jpg',
    },
    {
      id: 'sketchup-studio',
      name: 'SketchUp Studio',
      brand: 'Trimble',
      description: 'Complete 3D architectural modeling suite combining point-cloud reality capture, Revit import, and V-Ray rendering.',
      route: '/products/sketchup-studio',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'vray',
      name: 'Chaos V-Ray',
      brand: 'Chaos',
      description: 'Academy Award-winning photorealistic ray-tracing rendering software for high-end visualization.',
      route: '/products/vray',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    },
  ],
}
