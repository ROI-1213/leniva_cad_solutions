export interface AresElectricalStandardItem {
  id: string
  name: string
  fullName: string
  region: string
  description: string
  conventions: string
  iconName: string
}

export interface AresElectricalComponentCategory {
  id: string
  title: string
  eyebrow: string
  description: string
  examples: string[]
  iconName: string
  image: string
}

export interface AresElectricalWorkflowStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface AresElectricalApplication {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface AresElectricalGalleryItem {
  id: string
  title: string
  category: 'workspace' | 'schematics' | 'wiring' | 'panels' | 'reports' | 'collaboration'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  attribution?: string
}

export interface AresElectricalFaq {
  q: string
  a: string
  category: 'general' | 'automation' | 'standards' | 'dwg' | 'trinity' | 'licensing' | 'technical'
}

export interface AresElectricalComparisonRow {
  capability: string
  generalCad: string
  aresElectrical: string
  highlight?: boolean
}

export interface AresElectricalData {
  identity: {
    productName: string
    brand: string
    category: string
    productType: string
    cadEngine: string
    platform: string
    languages: string[]
    primaryFormat: string
    additionalFormats: string[]
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
    featureChips: string[]
    strip: { label: string; value: string }[]
  }
  overview: {
    heading: string
    description: string
    cards: { title: string; desc: string; icon: string; image: string }[]
  }
  benefits: {
    heading: string
    supportingText: string
    items: {
      number: string
      title: string
      desc: string
      detail: string
      icon: string
    }[]
  }
  automation: {
    heading: string
    subheading: string
    description: string
    features: {
      id: string
      title: string
      subtitle: string
      desc: string
      tag: string
      icon: string
    }[]
  }
  standards: {
    heading: string
    subheading: string
    description: string
    items: AresElectricalStandardItem[]
    keyHighlights: string[]
  }
  components: {
    heading: string
    subheading: string
    description: string
    categories: AresElectricalComponentCategory[]
    features: { title: string; desc: string }[]
  }
  wiringDiagrams: {
    heading: string
    description: string
    supportingMessage: {
      title: string
      text: string
    }
    features: string[]
    image: string
  }
  controlPanels: {
    heading: string
    description: string
    features: { title: string; desc: string; icon: string }[]
    image: string
  }
  equipmentLayout: {
    heading: string
    description: string
    splitFeatures: { title: string; desc: string }[]
    image: string
  }
  wireRouting: {
    heading: string
    description: string
    workflowPoints: string[]
    accuracyNote: string
    image: string
  }
  multiPageProjects: {
    heading: string
    description: string
    supportingMessage: {
      title: string
      text: string
    }
    features: string[]
    exampleSheets: string[]
    image: string
  }
  projectReports: {
    heading: string
    description: string
    reportTypes: { title: string; desc: string; format: string }[]
    capabilities: string[]
    image: string
  }
  projectRules: {
    heading: string
    description: string
    features: { title: string; desc: string }[]
    flowSteps: { step: string; title: string; desc: string }[]
  }
  sharingExport: {
    heading: string
    description: string
    formats: { ext: string; name: string; desc: string }[]
    useCases: string[]
  }
  trinity: {
    heading: string
    description: string
    licenseDistinction: string
    features: { title: string; desc: string; icon: string }[]
    trinityUrl: string
  }
  cadEngine: {
    heading: string
    description: string
    capabilities: string[]
    commanderUrl: string
  }
  workspace: {
    heading: string
    description: string
    tools: { title: string; desc: string; icon: string }[]
    image: string
  }
  targetUsers: {
    heading: string
    subheading: string
    users: { title: string; role: string; desc: string; icon: string }[]
  }
  applications: AresElectricalApplication[]
  workflow: AresElectricalWorkflowStep[]
  comparison: {
    heading: string
    subheading: string
    rows: AresElectricalComparisonRow[]
  }
  videos: {
    heading: string
    subheading: string
    officialVideoUrl: string
    items: {
      id: string
      title: string
      desc: string
      thumbnail: string
      duration: string
      badge: string
      youtubeId?: string
    }[]
  }
  gallery: AresElectricalGalleryItem[]
  licensing: {
    heading: string
    description: string
    disclaimer: string
    tiers: {
      id: string
      name: string
      subtitle: string
      term: string
      pricePlaceholder: string
      features: string[]
      badge?: string
      popular?: boolean
    }[]
    verifiedFacts: string[]
  }
  trial: {
    heading: string
    description: string
    downloadUrl: string
    configuratorUrl: string
  }
  platform: {
    heading: string
    os: string
    languages: string[]
    primaryFormat: string
    outputs: string[]
    sysReqs: { label: string; min: string; rec: string }[]
  }
  resources: {
    heading: string
    description: string
    cards: { title: string; desc: string; linkText: string; url: string; icon: string }[]
  }
  faqs: AresElectricalFaq[]
  relatedProducts: {
    name: string
    slug: string
    category: string
    desc: string
    image: string
  }[]
}

export const aresElectricalData: AresElectricalData = {
  identity: {
    productName: 'ARES Electrical',
    brand: 'Graebert',
    category: 'Electrical CAD / ECAD Software',
    productType: 'DWG-compatible electrical schematic design and documentation software',
    cadEngine: 'ARES Commander',
    platform: 'Windows 64-bit only',
    languages: ['English', 'Portuguese', 'Spanish'],
    primaryFormat: 'DWG',
    additionalFormats: ['PDF', 'DXF'],
    headline: 'Modern Electrical CAD Software to Automate Electrical Schematics in DWG',
    supportingHeadline: 'Design Smarter. Automate Repetitive Tasks. Deliver Electrical Projects with Confidence.',
    shortDescription: 'Create and manage electrical schematics, wiring diagrams, control panels, component libraries, and electrical project reports with a DWG-based ECAD solution designed to automate repetitive design tasks.',
    description: 'ARES Electrical is a DWG-compatible ECAD solution developed to simplify electrical design and automate repetitive tasks in electrical projects. Built on the ARES Commander CAD engine, it combines familiar DWG drafting capabilities with specialized electrical tools for wiring diagrams, control panels, component tagging, wire numbering, cross-referencing, intelligent component libraries, and automated project reporting. Its standards-based workflows and customizable libraries help engineering teams maintain consistent drawings and manage complex electrical projects more efficiently.',
    officialUrl: 'https://www.graebert.com/in/cad-software/ares-electrical/',
    configuratorUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-electrical/',
    lastChecked: '2026 Official Documentation',
  },
  hero: {
    eyebrow: 'GRAEBERT | ELECTRICAL CAD',
    heading: 'Automate Electrical Design in DWG',
    supportingText: 'Create electrical schematics, wiring diagrams, and control panel layouts with a modern DWG-compatible ECAD solution. Automate wire numbering, component tagging, cross-referencing, and project reporting while maintaining standardized electrical documentation.',
    image: '/images/software/ares-electrical.jpg',
    badge: 'DWG-Native Electrical ECAD',
    featureChips: [
      'DWG-Compatible ECAD',
      'Electrical Automation',
      'Intelligent Libraries',
      'Automated Reports',
    ],
    strip: [
      { label: 'Product', value: 'ARES Electrical' },
      { label: 'Category', value: 'Electrical CAD / ECAD' },
      { label: 'Primary Format', value: 'Native DWG' },
      { label: 'Platform', value: 'Windows 64-bit' },
      { label: 'Languages', value: 'English, Portuguese, Spanish' },
    ],
  },
  overview: {
    heading: 'A Smarter Way to Create Electrical Schematics',
    description: 'ARES Electrical is designed to eliminate repetitive manual work in electrical CAD projects. It combines the drafting capabilities of ARES Commander with electrical-specific automation and standardization features. Create electrical schematics, wiring diagrams, control panels, and project reports within a familiar DWG-based CAD environment. Automated wire numbering, component tagging, cross-referencing, and reporting help reduce repetitive operational tasks and the potential for errors associated with manual processes.',
    cards: [
      {
        title: 'Automated Electrical Design',
        desc: 'Automate repetitive tasks such as wire numbering, component tagging, and cross-referencing across multi-page drawings.',
        icon: 'Zap',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Standards-Based Schematics',
        desc: 'Use supported international electrical standards (ANSI, DIN, IEC, ABNT) and standardized component libraries to maintain consistent drawings.',
        icon: 'ShieldCheck',
        image: '/images/software/sections/ares-elec-schematics.jpg',
      },
      {
        title: 'Intelligent Project Documentation',
        desc: 'Generate comprehensive electrical project reports automatically and export structured deliverables in DWG, PDF, and DXF formats.',
        icon: 'FileText',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      },
      {
        title: 'Connected Collaboration',
        desc: 'Leverage optional ARES Trinity collaboration features to share view-only links, review, markup, and synchronize DWG project files via cloud workflows.',
        icon: 'Globe',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  benefits: {
    heading: 'Designed to Simplify Complex Electrical Projects',
    supportingText: 'ARES Electrical brings automation, standardization, and project documentation together in one electrical CAD environment.',
    items: [
      {
        number: '01',
        title: 'Automate Repetitive Tasks',
        desc: 'Automate wire numbering, component tagging, and cross-referencing.',
        detail: 'Eliminate tedious manual typing of wire numbers and tags, reducing human drafting errors across extensive drawing sheets.',
        icon: 'Zap',
      },
      {
        number: '02',
        title: 'Standardize Electrical Design',
        desc: 'Use supported electrical standards and predefined component libraries.',
        detail: 'Ensure complete schematic consistency from the initial single-line diagram to final cabinet assembly using ANSI, DIN, IEC, or ABNT rules.',
        icon: 'ShieldCheck',
      },
      {
        number: '03',
        title: 'Manage Large Projects',
        desc: 'Organize projects in DWG files containing tens or hundreds of pages.',
        detail: 'Work smoothly with large multi-page schematics with no stated product limits on pages, components, wires, or cables.',
        icon: 'Layers',
      },
      {
        number: '04',
        title: 'Generate Project Reports',
        desc: 'Create electrical project reports automatically and customize them.',
        detail: 'Extract components, terminal assignments, wire schedules, and bills of materials formatted for manufacturing and purchasing.',
        icon: 'FileSpreadsheet',
      },
      {
        number: '05',
        title: 'Customize Components',
        desc: 'Modify existing electrical components or create brand-new ones.',
        detail: 'Build and reuse proprietary company component libraries with custom electrical attributes, symbols, and terminal connection points.',
        icon: 'Wrench',
      },
      {
        number: '06',
        title: 'Support Team Collaboration',
        desc: 'Use optional Trinity collaboration features for drawing sharing and markups.',
        detail: 'Share free view-only links, capture contextual feedback, and synchronize DWG drawings across office and site teams depending on license.',
        icon: 'Share2',
      },
    ],
  },
  automation: {
    heading: 'Automate the Tasks That Slow Down Electrical Design',
    subheading: 'Spend More Time Designing and Less Time Repeating Manual Operations',
    description: 'ARES Electrical includes automation features for common electrical drafting operations. The software can automate wire numbering, component tagging, and cross-referencing, helping teams manage complex electrical projects more consistently.',
    features: [
      {
        id: 'wire-numbering',
        title: 'Automatic Wire Numbering',
        subtitle: 'Intelligent Net and Conductor Indexing',
        desc: 'Create wire numbers through automated project workflows rather than manually entering each identifier. Automatic numbering organizes and identifies electrical connections seamlessly across sheets.',
        tag: 'Wire Automation',
        icon: 'Hash',
      },
      {
        id: 'component-tagging',
        title: 'Automatic Component Tagging',
        subtitle: 'Standardized Equipment Identification',
        desc: 'Automate the tagging of electrical components (switches, relays, contactors, breakers) to support consistent device identification throughout the entire drawing set.',
        tag: 'Tagging Engine',
        icon: 'Tag',
      },
      {
        id: 'cross-referencing',
        title: 'Automated Cross-Referencing',
        subtitle: 'Real-Time Contact & Coil Pairing',
        desc: 'Automate cross-references between related electrical components (e.g. relay coils and normally-open/normally-closed contacts) and their connections to simplify drawing navigation and documentation.',
        tag: 'Cross-Ref Engine',
        icon: 'GitFork',
      },
      {
        id: 'project-rules',
        title: 'Preconfigurable Project Rules',
        subtitle: 'Enforce Company Standards',
        desc: 'Preconfigure rules for creating electrical diagrams and define how projects should be structured according to internal engineering standards and customer requirements.',
        tag: 'Rule Enforcement',
        icon: 'Sliders',
      },
      {
        id: 'integrated-updates',
        title: 'Integrated Project Updates',
        subtitle: 'Synchronized Sheet Architecture',
        desc: 'Use supported electrical automation workflows to maintain associated project information as drawings and component positions are modified throughout the lifecycle.',
        tag: 'Project Sync',
        icon: 'RefreshCw',
      },
    ],
  },
  standards: {
    heading: 'Create Electrical Drawings with International Standards',
    subheading: 'Consistency from the First Schematic to the Final Report',
    description: 'ARES Electrical supports international electrical standards, including ANSI, DIN, IEC, and ABNT. Standards-based workflows help teams structure electrical schematics and use standardized components in their designs.',
    items: [
      {
        id: 'iec',
        name: 'IEC',
        fullName: 'International Electrotechnical Commission',
        region: 'International / Europe / Asia',
        description: 'Global standards for electrotechnical documentation, terminal designations, graphical symbols, and schematic layout rules.',
        conventions: 'Standardized letter-code designations, vertical/horizontal schematic ladder alignment, metric drawing frames.',
        iconName: 'Globe',
      },
      {
        id: 'ansi',
        name: 'ANSI',
        fullName: 'American National Standards Institute',
        region: 'North America / Global Projects',
        description: 'Conventions for electrical diagrams, ladder schematics, NEMA-style device symbols, and inch-based drawing templates.',
        conventions: 'Rung-based ladder logic diagrams, device function numbering, American wire gauge annotations.',
        iconName: 'Flag',
      },
      {
        id: 'din',
        name: 'DIN',
        fullName: 'Deutsches Institut für Normung',
        region: 'Germany / Central Europe',
        description: 'German industrial standards used extensively across precision technical documentation, control systems, and mechanical automation.',
        conventions: 'Structured grid coordinates, strict equipment reference designations, and DIN-standardized component symbols.',
        iconName: 'Shield',
      },
      {
        id: 'abnt',
        name: 'ABNT',
        fullName: 'Associação Brasileira de Normas Técnicas',
        region: 'Brazil / South America',
        description: 'Brazilian technical standards for electrical installations, panel wiring specifications, and technical engineering documentation.',
        conventions: 'NBR-aligned electrical terminology, standard symbols for power distribution and industrial control cabinets.',
        iconName: 'Compass',
      },
    ],
    keyHighlights: [
      'Support for listed electrical standards (ANSI, DIN, IEC, ABNT)',
      'Standardized electrical components library aligned to standard conventions',
      'Consistent schematic structure with customizable drawing sheet frames',
      'Configurable project rules matching corporate design manuals',
      'Reusable company-specific components created from base symbols',
      'Consistent project documentation exported for multinational projects',
    ],
  },
  components: {
    heading: 'Intelligent Electrical Component Libraries',
    subheading: 'Reusable Components for Consistent Electrical Schematics',
    description: 'ARES Electrical includes a standardized electrical components library designed to support the creation and modification of electrical schematics. Users can copy and modify available components and create new components to make frequently used company devices available for placement in electrical designs.',
    categories: [
      {
        id: 'switches-relays',
        title: 'Switches, Relays & Contactors',
        eyebrow: 'Control & Switching',
        description: 'Pushbuttons, selector switches, safety relays, power contactors with dynamic auxiliary contacts and coil cross-referencing.',
        examples: ['Momentary Pushbuttons', 'Rotary Selector Switches', 'Safety Relays', 'Magnetic Contactors'],
        iconName: 'ToggleLeft',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'circuit-protection',
        title: 'Circuit Breakers & Protection',
        eyebrow: 'Overcurrent & Safety',
        description: 'Molded case circuit breakers (MCCB), miniature circuit breakers (MCB), residual current devices (RCD), and motor protective switches.',
        examples: ['Miniature Circuit Breakers (MCB)', 'Thermal Overload Relays', 'Surge Protective Devices', 'Fuse Disconnectors'],
        iconName: 'ShieldAlert',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'terminals-connectors',
        title: 'Terminals, Connectors & Plugs',
        eyebrow: 'Interconnection',
        description: 'Feed-through terminal blocks, ground terminals, multi-pin heavy-duty connectors, and terminal rail strip layouts.',
        examples: ['DIN-Rail Terminal Blocks', 'Multi-Level Terminals', 'Heavy Duty Industrial Plugs', 'Grounding Bars'],
        iconName: 'Cpu',
        image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sensors-motors',
        title: 'Sensors, Actuators & Motors',
        eyebrow: 'Field Devices',
        description: 'Inductive proximity sensors, photoelectric switches, limit switches, 3-phase AC motors, and variable frequency drive connections.',
        examples: ['Proximity Sensors', 'Photoelectric Sensors', '3-Phase Induction Motors', 'Servo Drives'],
        iconName: 'Activity',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      },
    ],
    features: [
      {
        title: 'Standardized Components',
        desc: 'Use the pre-packaged electrical library to quickly select and insert industry-standard devices into schematics.',
      },
      {
        title: 'Customizable Components',
        desc: 'Copy and modify existing devices to adapt terminal numbering, graphical symbols, or connection points.',
      },
      {
        title: 'Custom Component Creation',
        desc: 'Draw new symbols using DWG CAD tools and define intelligent electrical connection ports and tagging metadata.',
      },
      {
        title: 'Reusable Company Libraries',
        desc: 'Organize approved manufacturer devices into shared firm libraries to enforce engineering standardization.',
      },
      {
        title: 'Component Placement',
        desc: 'Insert components with automatic wire breaking and intelligent alignment to standard schematic grid points.',
      },
      {
        title: 'Project Structure Integration',
        desc: 'Every placed component immediately populates the project database, updating BOMs and cross-references.',
      },
    ],
  },
  wiringDiagrams: {
    heading: 'Create and Manage Electrical Wiring Diagrams',
    description: 'ARES Electrical supports electrical schematic and wiring diagram workflows with automation features that help organize connections, component references, and wire identification.',
    supportingMessage: {
      title: 'Keep Electrical Connections Organized',
      text: 'Use structured numbering, component identifiers, and cross-referencing to make electrical schematics easier to review, install, and maintain on the factory floor.',
    },
    features: [
      'DWG-based electrical schematic drafting on native ARES CAD engine',
      'Wire numbering automation with custom prefix and index formats',
      'Consistent component tagging according to project rules',
      'Automated cross-referencing between coils, contacts, and terminals',
      'Project structure managed cleanly across multiple drawing pages',
      'Customizable electrical component libraries for company-specific hardware',
      'Real-time extraction of wiring schedules and interconnect lists',
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  controlPanels: {
    heading: 'Design Electrical Control Panels',
    description: 'ARES Electrical supports the creation of control panel drawings and the integration of electrical diagrams with mechanical layouts using intelligent assembly and equipment-positioning resources.',
    features: [
      {
        title: 'Panel Layouts',
        desc: 'Develop 2D electrical control panel layouts, enclosure elevations, and internal mounting plate arrangements.',
        icon: 'Layout',
      },
      {
        title: 'Equipment Positioning',
        desc: 'Use supported equipment-positioning resources to place electrical devices accurately on DIN rails and mounting plates.',
        icon: 'Crosshair',
      },
      {
        title: 'Integrated Drawings',
        desc: 'Integrate panel layouts with schematic diagrams so physical devices stay synchronized with electrical identifiers.',
        icon: 'Link',
      },
      {
        title: 'Component Libraries',
        desc: 'Reuse standardized electrical component footprints to verify spatial clearance and duct spacing in panels.',
        icon: 'Box',
      },
      {
        title: 'Project Documentation',
        desc: 'Support panel assembly workflows with component tagging, terminal layout charts, and bill of materials reports.',
        icon: 'FileText',
      },
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  equipmentLayout: {
    heading: 'Connect Electrical Diagrams with Equipment Layouts',
    description: 'ARES Electrical provides intelligent assembly and equipment-positioning resources to integrate the panel layout with the electrical diagram, ensuring design coherence between schematic logic and physical equipment placement.',
    splitFeatures: [
      {
        title: 'Equipment Placement',
        desc: 'Position electrical devices, transformers, terminal rails, and wire ducts within the relevant mechanical layout drawing.',
      },
      {
        title: 'Panel Integration',
        desc: 'Coordinate the physical cabinet layout directly with the electrical single-line and control schematics.',
      },
      {
        title: 'Assembly Context',
        desc: 'Use associated drawing information to support panel builder assembly instructions and maintenance troubleshooting.',
      },
      {
        title: 'Electrical Documentation',
        desc: 'Maintain both schematic schematics and 2D physical layouts inside the broader project DWG container.',
      },
    ],
    image: '/images/software/sections/ares-elec-documentation.jpg',
  },
  wireRouting: {
    heading: 'Calculate Project Wiring Effort More Easily',
    description: 'ARES Electrical describes a workflow for automatically creating wire routes within a mechanical layout, given the total amount of wires used in the project.',
    workflowPoints: [
      'Use the total amount of project wires as an input for the supported workflow',
      'Automatically create wire routes within the mechanical layout drawing',
      'Support planning and review of electrical duct capacity and wire path arrangements',
      'Assist panel builders in estimating wire channel occupancy and harness layout',
    ],
    accuracyNote: 'ARES Electrical provides a supported wire-routing workflow to estimate layout arrangements. Exact cable length optimization, high-voltage clearances, and formal regulatory validation remain the responsibility of qualified engineering personnel.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
  },
  multiPageProjects: {
    heading: 'Manage Complex Electrical Projects in DWG',
    description: 'ARES Electrical reads and saves projects natively in DWG. An electrical project can be represented as one DWG file containing tens or hundreds of pages. ARES Electrical provides navigation and project-specific capabilities for working with these multi-page electrical drawings, while also allowing users to generate DWG, PDF, and DXF outputs to share with other DWG-based CAD software.',
    supportingMessage: {
      title: 'Keep Your Electrical Project Information Organized',
      text: 'Use a structured multi-page project workflow to manage complex drawing sets and associated documentation without file fragmentation.',
    },
    features: [
      'Native DWG project format — fully compatible with standard CAD environments',
      'Multi-page electrical projects with tens or hundreds of drawing sheets',
      'Intuitive sheet navigation tree to jump across drawings instantly',
      'Electrical-specific project tools for batch updating and cross-sheet referencing',
      'DWG output for collaboration with external CAD teams',
      'PDF output for contractor and site review packages',
      'DXF output for CNC panel punching and third-party tools',
      'Seamless sharing with other compatible DWG-based CAD solutions',
    ],
    exampleSheets: [
      '01. Title Block & Project Index',
      '02. 3-Phase Main Power Distribution',
      '03. 24VDC Control Circuit Schematics',
      '04. PLC I/O Module Connections',
      '05. Control Panel Enclosure Elevation',
      '06. Internal DIN-Rail Terminal Schedule',
      '07. Field Wiring Interconnect Diagram',
      '08. Automated Bill of Materials (BOM)',
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  projectReports: {
    heading: 'Generate Electrical Project Reports Automatically',
    description: 'ARES Electrical can generate electrical project reports that represent project information and can be customized according to company or customer standards.',
    reportTypes: [
      {
        title: 'Bill of Materials (BOM)',
        desc: 'Quantities, manufacturer part numbers, descriptions, and tag designations of all installed electrical hardware.',
        format: 'DWG Table / Export',
      },
      {
        title: 'Component Tag Schedules',
        desc: 'Comprehensive lists of all tagged devices with sheet locations, grid coordinates, and cross-references.',
        format: 'DWG Table / Export',
      },
      {
        title: 'Wire & Net Schedules',
        desc: 'Conductor numbers, source-to-destination connections, wire gauges, and color specifications.',
        format: 'Structured List',
      },
      {
        title: 'Terminal Strip Diagrams',
        desc: 'Detailed representation of each terminal block, connected internal wiring, and external field cabling.',
        format: 'Drawing Sheet',
      },
      {
        title: 'Cable Interconnection Lists',
        desc: 'Summary of multi-conductor cables connecting field sensors, motors, and operator stations to the control cabinet.',
        format: 'Report Document',
      },
    ],
    capabilities: [
      'Automatic project report generation directly from schematic data',
      'Project information extraction without manual double-entry',
      'Customizable report content matching company or client title blocks',
      'Adaptation to customer-specific spreadsheet formats and templates',
      'Complete project documentation package for purchasing and manufacturing',
      'Easy sharing with electrical panel builders, component distributors, and clients',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  projectRules: {
    heading: 'Configure Projects Around Your Requirements',
    description: 'ARES Electrical allows users to preconfigure project rules for creating electrical diagrams. These rules support project creation according to company-specific requirements.',
    features: [
      {
        title: 'Project Configuration',
        desc: 'Set up reusable project rules for wire naming syntax, component tag prefixes, and drawing frame templates.',
      },
      {
        title: 'Company Requirements',
        desc: 'Adapt project structure to company workflows, quality control procedures, and internal documentation preferences.',
      },
      {
        title: 'Reusable Workflows',
        desc: 'Apply consistent rules across new projects to ensure uniform deliverable style across all engineering staff.',
      },
      {
        title: 'Electrical Standards',
        desc: 'Incorporate international standards (IEC, ANSI, DIN, ABNT) seamlessly as part of initial project templates.',
      },
    ],
    flowSteps: [
      {
        step: '1',
        title: 'Choose Electrical Standard',
        desc: 'Select base drafting conventions (IEC, ANSI, DIN, or ABNT) for symbols and sheet borders.',
      },
      {
        step: '2',
        title: 'Define Project Rules',
        desc: 'Configure numbering formulas for wires, equipment tags, and sheet index conventions.',
      },
      {
        step: '3',
        title: 'Configure Reusable Components',
        desc: 'Load approved component libraries and verified supplier catalog items into the project palette.',
      },
      {
        step: '4',
        title: 'Create the Electrical Project',
        desc: 'Start drafting schematics with automated tagging, wire numbering, and real-time report generation.',
      },
    ],
  },
  sharingExport: {
    heading: 'Share Electrical Projects with Customers and Partners',
    description: 'ARES Electrical can extract project information through reports and share electrical project deliverables in neutral formats such as PDF or DXF, as well as native DWG drawings.',
    formats: [
      {
        ext: 'DWG',
        name: 'Native Drawing Format',
        desc: 'Share complete multi-page electrical CAD files with other DWG-compatible engineering software without data loss.',
      },
      {
        ext: 'PDF',
        name: 'Document Deliverable',
        desc: 'Generate printable vector PDF schematic packages complete with bookmarks for on-site technicians and clients.',
      },
      {
        ext: 'DXF',
        name: 'Drawing Exchange Format',
        desc: 'Export 2D layout geometry to CNC sheet-metal punching machines and third-party manufacturing software.',
      },
    ],
    useCases: [
      'Provide accurate bill of materials reports directly to procurement teams',
      'Deliver standardized DWG drawing sets to client CAD repositories',
      'Share clean, multi-page vector PDFs with electrical contractors and site inspectors',
      'Export panel cutout drawings via DXF for enclosure milling and drilling',
      'Support collaborative DWG-based review cycles with mechanical engineering teams',
    ],
  },
  trinity: {
    heading: 'Collaborate Across Desktop, Cloud, and Mobile',
    description: 'ARES Electrical users may leverage ARES Trinity collaboration features when using an eligible license and supported cloud storage workflow. Projects can be saved locally or synchronized with a preferred cloud storage provider to enable modern collaboration features.',
    licenseDistinction: 'Important License Distinction: ARES Electrical may be purchased with or without Trinity. Collaboration services, cloud synchronization, and mobile access depend on the specific license purchased. Base licenses focus on desktop authoring, while Trinity-enabled licenses grant full cloud-connected capabilities.',
    features: [
      {
        title: 'View-Only Sharing Links',
        desc: 'Share view-only links to invite clients and contractors to view and comment on project drawings online for free in a web browser.',
        icon: 'Eye',
      },
      {
        title: 'Online Review and Comments',
        desc: 'Allow invited collaborators to view schematics and leave timestamped comments directly on DWG drawings.',
        icon: 'MessageSquare',
      },
      {
        title: 'Markups & Redlines',
        desc: 'Use cloud markups and visual redlines to communicate feedback and revision requests without modifying original geometry.',
        icon: 'Edit3',
      },
      {
        title: 'Email Notifications',
        desc: 'Receive automated email notifications whenever project collaborators add comments, markups, or upload revisions.',
        icon: 'Bell',
      },
      {
        title: 'Cloud Synchronization',
        desc: 'Synchronize DWG projects through supported cloud storage providers (Google Drive, OneDrive, Dropbox, Box, or Private Servers).',
        icon: 'Cloud',
      },
      {
        title: 'Remote Access',
        desc: 'Allow authorized team members to inspect and reference project drawings securely on mobile devices via ARES Touch or browsers via ARES Kudo.',
        icon: 'Smartphone',
      },
    ],
    trinityUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
  },
  cadEngine: {
    heading: 'Powered by the ARES Commander CAD Engine',
    description: 'ARES Electrical is powered by ARES Commander, Graebert’s DWG-based CAD solution. It combines the broader drafting capabilities of ARES Commander with specialized electrical CAD features, giving users a familiar, high-performance environment.',
    capabilities: [
      'DWG-based CAD environment with industry-standard command syntax and shortcuts',
      'Hundreds of general-purpose 2D CAD drafting features developed by Graebert',
      'Familiar interface for CAD users, minimizing onboarding time for drafting teams',
      'Create, edit, and modify native DWG drawings with precision geometry tools',
      'Add, modify, or delete layers, dimensions, text styles, and geometric constraints',
      'Seamlessly access specialized electrical toolsets within the same unified application',
    ],
    commanderUrl: 'https://www.graebert.com/in/cad-software/ares-commander/',
  },
  workspace: {
    heading: 'A CAD Workspace Built for Electrical Design',
    description: 'ARES Electrical combines the familiar CAD interface of ARES Commander with a customized electrical interface and dedicated tools for electrical project work.',
    tools: [
      {
        title: 'Electrical Toolset',
        desc: 'Access dedicated ECAD ribbons and palettes for schematic generation, wire placement, and equipment insertion.',
        icon: 'Zap',
      },
      {
        title: 'Project Navigation Tree',
        desc: 'Quickly browse through multi-page projects, organized by schematic sheets, panel layouts, and reports.',
        icon: 'FolderTree',
      },
      {
        title: 'Component Library Palette',
        desc: 'Search, filter, and drag standardized or custom electrical devices directly onto active drawings.',
        icon: 'Box',
      },
      {
        title: 'Automation Engine',
        desc: 'Execute automated wire numbering, component re-tagging, and cross-reference regeneration on demand.',
        icon: 'Cpu',
      },
      {
        title: 'General CAD Drafting',
        desc: 'Leverage the complete ARES Commander drafting engine for detailing, layout dimensions, and custom title blocks.',
        icon: 'PenTool',
      },
    ],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  targetUsers: {
    heading: 'Designed for Electrical Engineering Professionals',
    subheading: 'Tailored for technical teams demanding accuracy, standardization, and DWG compatibility.',
    users: [
      {
        title: 'Electrical Engineers',
        role: 'System Architecture & Protection',
        desc: 'Develop electrical schematics, power distribution diagrams, and technical documentation for industrial plants and infrastructure.',
        icon: 'Zap',
      },
      {
        title: 'Electrical CAD Designers',
        role: 'Production Drafting & ECAD',
        desc: 'Create, update, and manage DWG-based electrical drawings with specialized schematic drafting and automated tagging tools.',
        icon: 'Layers',
      },
      {
        title: 'Control Panel Designers',
        role: 'Panel & Cabinet Engineering',
        desc: 'Develop 2D panel layouts, verify physical device clearance on mounting plates, and coordinate terminals with schematics.',
        icon: 'Layout',
      },
      {
        title: 'Automation Engineers',
        role: 'PLC & Industrial Controls',
        desc: 'Prepare I/O connection schematics, sensor wiring, and drive control loops for automated machinery and assembly lines.',
        icon: 'Cpu',
      },
      {
        title: 'Electrical Drafting Specialists',
        role: 'Documentation & Revisions',
        desc: 'Manage drawing revisions, assign standardized wire identifiers, update component tags, and maintain project archives.',
        icon: 'FileText',
      },
      {
        title: 'Engineering Consultants',
        role: 'Client Deliverables & Advisory',
        desc: 'Deliver standardized DWG, PDF, and DXF electrical project documentation packages to clients, suppliers, and regulatory bodies.',
        icon: 'Building2',
      },
      {
        title: 'Manufacturing & Panel Teams',
        role: 'Assembly & Wiring Quality',
        desc: 'Review clear wiring diagrams, wire-route layouts, and bill of materials reports for error-free cabinet wiring on the shop floor.',
        icon: 'Wrench',
      },
    ],
  },
  applications: [
    {
      id: 'industrial-automation',
      title: 'Industrial Automation',
      subtitle: 'PLC Controls & Machine Wiring',
      description: 'Create and manage electrical schematics and control diagrams for automated production lines, packaging machines, and robotics.',
      toolTags: ['PLC Schematics', 'I/O Cards', 'Sensor Loops', 'Ladder Diagrams'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      deliverables: ['Control Circuit Drawings', 'PLC Interconnect Lists', 'Automated BOM'],
    },
    {
      id: 'control-panels',
      title: 'Electrical Control Panels',
      subtitle: 'Enclosure Layout & Assembly',
      description: 'Prepare control panel layouts and related electrical drawings using supported component placement and equipment positioning workflows.',
      toolTags: ['2D Cabinet Elevation', 'DIN-Rail Mounts', 'Door Cutouts', 'Terminal Strips'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      deliverables: ['Cabinet Layout Drawing', 'Enclosure Punching DXF', 'Component Schedule'],
    },
    {
      id: 'wiring-diagrams',
      title: 'Wiring Diagrams',
      subtitle: 'Point-to-Point Interconnects',
      description: 'Create wiring diagrams with automated wire numbering and component cross-referencing for machine and harness manufacturing.',
      toolTags: ['Net Numbering', 'Cross-References', 'Wire Gauges', 'Color Coding'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      deliverables: ['Point-to-Point Schedules', 'Terminal Connection Charts', 'Conductor Index'],
    },
    {
      id: 'equipment-planning',
      title: 'Equipment Layout Planning',
      subtitle: 'Integrated Mechanical & Electrical',
      description: 'Develop equipment-positioning layouts and integrate them with electrical diagrams to coordinate spatial placement with electrical connections.',
      toolTags: ['Equipment Positioning', 'Wire Channels', 'Assembly Views', 'DWG Blocks'],
      image: '/images/software/sections/ares-elec-equipment-layout.jpg',
      deliverables: ['Integrated Layout Sheet', 'Wire-Route Estimate', 'Space Clearance Verification'],
    },
    {
      id: 'project-documentation',
      title: 'Electrical Project Documentation',
      subtitle: 'Standardized Multi-Sheet Sets',
      description: 'Create structured electrical drawings and automated reports for project communication across multi-disciplinary teams.',
      toolTags: ['Multi-Page DWG', 'Custom Title Blocks', 'Revision Tracking', 'PDF Publishing'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      deliverables: ['Complete Drawing Set', 'Project Index Sheet', 'Archival PDF Package'],
    },
    {
      id: 'engineering-consulting',
      title: 'Engineering Design & Consulting',
      subtitle: 'Client Deliverables & Bid Sets',
      description: 'Prepare DWG-based electrical project deliverables for customers, suppliers, and municipal project partners.',
      toolTags: ['IEC/ANSI Standards', 'Client Templates', 'Trinity Cloud Review', 'DWG Exchange'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      deliverables: ['Tender Electrical Schematics', 'Material Takeoff', 'Supplier Submittal Sheets'],
    },
  ],
  workflow: [
    {
      stepNumber: '01',
      title: 'Configure the Project',
      shortTitle: 'Configure',
      subtitle: 'Standards & Project Rules',
      description: 'Choose the applicable electrical standard (IEC, ANSI, DIN, or ABNT) and preconfigure project rules, title blocks, and numbering formulas according to company or client requirements.',
      tools: ['Standard Selection', 'Rule Preconfiguration', 'Title Block Setup'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 1: Setup',
    },
    {
      stepNumber: '02',
      title: 'Create Electrical Schematics',
      shortTitle: 'Draft',
      subtitle: 'DWG Schematic Drafting',
      description: 'Use the specialized electrical CAD workspace and general ARES Commander drafting tools to layout power distribution and control circuits across organized drawing sheets.',
      tools: ['Electrical Ribbon', 'DWG Geometry', 'Grid Snap', 'Circuit Templates'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 2: Schematics',
    },
    {
      stepNumber: '03',
      title: 'Place Electrical Components',
      shortTitle: 'Place',
      subtitle: 'Standard & Custom Libraries',
      description: 'Select standardized components from the electrical library or insert company-specific hardware. Placed components snap to connections and automatically break lines.',
      tools: ['Library Palette', 'Auto Line Break', 'Terminal Insertion', 'Symbol Creator'],
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 3: Components',
    },
    {
      stepNumber: '04',
      title: 'Automate Project Information',
      shortTitle: 'Automate',
      subtitle: 'Numbering & Cross-Referencing',
      description: 'Run automatic wire numbering and component tagging routines. The cross-referencing engine links coils and contacts across multi-page drawings automatically.',
      tools: ['Auto Wire Numbering', 'Component Tagging', 'Cross-Ref Engine', 'Tag Verification'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 4: Automation',
    },
    {
      stepNumber: '05',
      title: 'Develop Layouts and Reports',
      shortTitle: 'Document',
      subtitle: 'Panels & Project Reports',
      description: 'Integrate electrical diagrams with equipment or panel layouts. Generate customizable electrical project reports including Bills of Materials, wire schedules, and terminal charts.',
      tools: ['Panel Elevation', 'Equipment Positioning', 'Automated BOM', 'Terminal Strip Charts'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 5: Documentation',
    },
    {
      stepNumber: '06',
      title: 'Share and Collaborate',
      shortTitle: 'Collaborate',
      subtitle: 'Export & Trinity Cloud',
      description: 'Export deliverables to native DWG, vector PDF, and DXF. Leverage eligible ARES Trinity collaboration features to share view-only links, capture markups, and synchronize files.',
      tools: ['PDF Multi-Sheet Export', 'DXF Punch Export', 'Trinity Cloud Links', 'Drawing Redlines'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      badge: 'Step 6: Delivery',
    },
  ],
  comparison: {
    heading: 'Electrical-Specific Tools Within a Familiar DWG Environment',
    subheading: 'See how ARES Electrical transforms traditional CAD drafting into an automated, standards-compliant ECAD workflow.',
    rows: [
      {
        capability: 'General DWG Drafting',
        generalCad: 'Standard 2D drafting tools based on selected product',
        aresElectrical: 'Full ARES Commander professional CAD capabilities built-in',
      },
      {
        capability: 'Electrical Schematics',
        generalCad: 'Depends on software (often manual line drafting & standard blocks)',
        aresElectrical: 'Specialized electrical CAD workflow with intelligent circuit tools',
        highlight: true,
      },
      {
        capability: 'Wire Numbering Automation',
        generalCad: 'Manual text entry; prone to duplicate or omitted numbers',
        aresElectrical: 'Included automated wire numbering engine with customizable rules',
        highlight: true,
      },
      {
        capability: 'Component Tagging',
        generalCad: 'Manual block attributes; no automatic sequential indexing',
        aresElectrical: 'Automated component tagging engine enforcing standards',
        highlight: true,
      },
      {
        capability: 'Cross-Referencing',
        generalCad: 'Manual text tracking across sheets; frequent synchronization errors',
        aresElectrical: 'Automated cross-referencing between related coils, contacts, and pins',
        highlight: true,
      },
      {
        capability: 'Electrical Component Libraries',
        generalCad: 'Generic block libraries; non-intelligent symbols without electrical ports',
        aresElectrical: 'Standardized, customizable electrical libraries (ANSI, DIN, IEC, ABNT)',
        highlight: true,
      },
      {
        capability: 'Multi-Page Electrical Projects',
        generalCad: 'Requires separate DWG files or unlinked layouts with manual coordination',
        aresElectrical: 'Multi-page electrical projects managed natively in unified DWG workflows',
        highlight: true,
      },
      {
        capability: 'Electrical Project Reports',
        generalCad: 'Manual table drafting or generic data extraction requiring spreadsheet cleanup',
        aresElectrical: 'Automated, customizable project reports (BOM, wire schedules, terminals)',
        highlight: true,
      },
      {
        capability: 'Trinity Cloud Collaboration',
        generalCad: 'Third-party file sharing or email attachments with version lockouts',
        aresElectrical: 'Optional ARES Trinity view-only links, markups, and cloud sync',
      },
    ],
  },
  videos: {
    heading: 'See ARES Electrical in Action',
    subheading: 'Official Graebert workflow demonstrations showing electrical schematics, component customization, and cloud CAD collaboration.',
    officialVideoUrl: 'https://www.graebert.com/in/cad-software/ares-electrical/',
    items: [
      {
        id: 'ares-electrical-2026',
        title: 'What’s New in ARES Electrical 2026 — Smarter Components Libraries & Cloud CAD Collaboration',
        desc: 'Explore the latest 2026 release of ARES Electrical featuring smarter component management, enhanced reporting, and seamless cloud review.',
        thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        duration: 'Official Overview',
        badge: 'New Release',
      },
      {
        id: 'ares-electrical-workflows',
        title: 'ARES Electrical CAD — DWG-Based Design for Wiring Diagrams, Control Panels, Automation & BOM',
        desc: 'Comprehensive walkthrough illustrating schematic drafting, wire numbering automation, panel layout coordination, and instant BOM generation.',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        duration: 'Workflow Guide',
        badge: 'Core Features',
      },
      {
        id: 'ares-electrical-parts-symbols',
        title: 'How to Customize Parts & Symbols in ARES Electrical — Smarter DWG-Based CAD Libraries',
        desc: 'Learn how to create custom manufacturer components, define electrical connection terminals, and organize proprietary corporate symbols.',
        thumbnail: '/images/software/sections/ares-elec-custom-symbols.jpg',
        duration: 'Tutorial',
        badge: 'Library Customization',
      },
    ],
  },
  gallery: [
    {
      id: 'workspace-overview',
      title: 'ARES Electrical Main Workspace',
      category: 'workspace',
      categoryLabel: 'Workspace',
      caption: 'Dedicated electrical CAD workspace built on top of the robust ARES Commander DWG drafting engine.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      alt: 'ARES Electrical main workspace and CAD interface',
    },
    {
      id: 'schematic-ladder',
      title: 'Electrical Schematic & Ladder Design',
      category: 'schematics',
      categoryLabel: 'Schematics',
      caption: 'Standardized ladder and control circuits created with automated wire insertion and port snapping.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      alt: 'Electrical schematic drafting and ladder design',
    },
    {
      id: 'wiring-automation',
      title: 'Wiring Diagram with Auto-Numbering',
      category: 'wiring',
      categoryLabel: 'Wiring',
      caption: 'Point-to-point wiring diagram displaying automated wire numbers, gauge tags, and terminal assignments.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Wiring diagram with automatic wire numbering and tagging',
    },
    {
      id: 'control-cabinet-elevation',
      title: 'Control Panel Elevation Layout',
      category: 'panels',
      categoryLabel: 'Control Panels',
      caption: '2D enclosure layout drawing showing DIN rails, cable channels, and equipment placement.',
      image: '/images/software/sections/ares-elec-panel-elevation.jpg',
      alt: 'Control panel enclosure elevation layout',
    },
    {
      id: 'component-library-grid',
      title: 'Electrical Component Library',
      category: 'schematics',
      categoryLabel: 'Components',
      caption: 'Searchable component palette containing ANSI, DIN, IEC, and ABNT compliant electrical symbols.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Electrical component library and symbol selector',
    },
    {
      id: 'automated-bom-report',
      title: 'Automated Project Reports & BOM',
      category: 'reports',
      categoryLabel: 'Reports',
      caption: 'Customizable bill of materials and terminal schedules generated directly from multi-page project drawings.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      alt: 'Automated electrical project reports and Bill of Materials',
    },
    {
      id: 'trinity-cloud-collaboration',
      title: 'Cloud Review & Drawing Markups',
      category: 'collaboration',
      categoryLabel: 'Collaboration',
      caption: 'ARES Trinity free view-only link sharing and browser-based redlining on live DWG project files.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      alt: 'ARES Trinity cloud review and DWG markup',
    },
  ],
  licensing: {
    heading: 'Flexible Licensing for Your Electrical CAD Workflow',
    description: 'ARES Electrical is available through Graebert’s licensing configurator. Licensing options, subscription terms, and collaboration entitlements should be verified against the current official India configurator before purchase.',
    disclaimer: 'Notice: Specific licensing terms, annual subscription rates, perpetual options, and Trinity cloud entitlements are subject to Graebert’s current regional policies. Please contact Leniva CAD Solutions for an official, tailored commercial quotation.',
    tiers: [
      {
        id: 'annual-plan',
        name: 'Annual Subscription',
        subtitle: 'Optimal for Engineering Teams',
        term: '1-Year Term License',
        pricePlaceholder: 'Request Indian Quote',
        popular: true,
        badge: 'Recommended',
        features: [
          'Full ARES Electrical desktop software on 64-bit Windows',
          'ARES Commander DWG CAD engine included',
          'Automatic wire numbering, component tagging & cross-referencing',
          'Standardized ANSI, DIN, IEC, and ABNT component libraries',
          'Multi-page DWG project management & automated reports',
          'All software updates, service packs & new versions during term',
          'Option to configure with or without ARES Trinity cloud services',
          'Direct technical assistance from Leniva CAD Solutions',
        ],
      },
      {
        id: 'three-year-plan',
        name: '3-Year Subscription',
        subtitle: 'Long-Term Cost Predictability',
        term: '3-Year Term License',
        pricePlaceholder: 'Request Indian Quote',
        features: [
          'All capabilities included in the Annual Subscription',
          'Lock in subscription terms across 36 months',
          'Continuous access to latest releases and software improvements',
          'Option to bundle ARES Trinity collaboration and cloud storage',
          'Priority deployment guidance and team onboarding support',
        ],
      },
      {
        id: 'perpetual-plan',
        name: 'Perpetual License',
        subtitle: 'Permanent Software Ownership',
        term: 'One-Time License Purchase',
        pricePlaceholder: 'Request Indian Quote',
        features: [
          'Own your ARES Electrical license permanently',
          'Complete DWG-native electrical drafting and automation toolset',
          'Includes 1 year of maintenance (updates & technical support)',
          'Optional annual maintenance renewal for continuous upgrades',
          'Available as single-seat or network flex licensing upon request',
        ],
      },
    ],
    verifiedFacts: [
      'Official quotations are provided in Indian Rupees (INR) reflecting current regional commercial terms and applicable GST.',
      'ARES Electrical can be licensed with or without Trinity cloud features depending on corporate security requirements.',
      'Network floating (flex) licenses may be available for multi-user design offices upon enquiry.',
      'Perpetual licenses grant non-expiring usage rights with optional annual maintenance.',
    ],
  },
  trial: {
    heading: 'Experience ARES Electrical',
    description: 'Explore the official ARES Electrical trial and download workflow, subject to current regional availability and license conditions.',
    downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-electrical/',
    configuratorUrl: 'https://www.graebert.com/in/cad-software/buy/configurator/',
  },
  platform: {
    heading: 'Platform and Compatibility',
    os: 'Windows 64-bit only (official requirement)',
    languages: ['English', 'Portuguese', 'Spanish'],
    primaryFormat: 'DWG (Native read and write)',
    outputs: ['DWG', 'PDF', 'DXF'],
    sysReqs: [
      { label: 'Operating System', min: 'Microsoft Windows 10 (64-bit)', rec: 'Microsoft Windows 11 (64-bit)' },
      { label: 'Processor', min: 'Intel Core i5 or AMD Ryzen 5 (64-bit)', rec: 'Intel Core i7 / i9 or AMD Ryzen 7 / 9' },
      { label: 'RAM', min: '8 GB RAM', rec: '16 GB to 32 GB RAM for large multi-page projects' },
      { label: 'Storage', min: '3 GB free hard disk space', rec: 'Fast NVMe SSD with 10 GB+ free space' },
      { label: 'Graphics', min: '3D graphics card with OpenGL 3.2 support', rec: 'Dedicated GPU with 4 GB+ VRAM' },
      { label: 'Display Resolution', min: '1920 × 1080 (Full HD)', rec: '2560 × 1440 or 4K Ultra HD' },
    ],
  },
  resources: {
    heading: 'Get Support for Your Electrical CAD Workflow',
    description: 'Provide direct access to official product documentation, technical support, tutorials, online courses, and product resources.',
    cards: [
      {
        title: 'Official Documentation',
        desc: 'Access verified ARES Electrical guides, command references, and documentation portals.',
        linkText: 'Explore Documentation',
        url: 'https://www.graebert.com/in/cad-software/ares-electrical/',
        icon: 'BookOpen',
      },
      {
        title: 'Video Tutorials',
        desc: 'Watch official electrical CAD demonstrations, symbol creation guides, and workflow tutorials.',
        linkText: 'Watch Videos',
        url: 'https://www.graebert.com/in/cad-software/ares-electrical/',
        icon: 'Video',
      },
      {
        title: 'Graebert Academy',
        desc: 'Enroll in official online courses and structured learning resources for CAD professionals.',
        linkText: 'Visit Academy',
        url: 'https://www.graebert.com/academy/',
        icon: 'GraduationCap',
      },
      {
        title: 'Technical Support',
        desc: 'Contact the official Graebert customer support portal and technical ticketing system.',
        linkText: 'Contact Support',
        url: 'https://support.graebert.com/',
        icon: 'Headphones',
      },
      {
        title: 'Product Brochure',
        desc: 'Download the current official ARES Electrical product brochure and technical summary.',
        linkText: 'Download Brochure',
        url: 'https://www.graebert.com/in/cad-software/ares-electrical/',
        icon: 'FileDown',
      },
    ],
  },
  faqs: [
    {
      category: 'general',
      q: 'What is ARES Electrical?',
      a: 'ARES Electrical is a DWG-compatible electrical CAD solution by Graebert. It combines ARES Commander CAD capabilities with specialized electrical design and automation features.',
    },
    {
      category: 'general',
      q: 'What can I do with ARES Electrical?',
      a: 'You can create electrical schematics, wiring diagrams, control panel layouts, electrical project documentation, and reports using supported electrical CAD tools.',
    },
    {
      category: 'dwg',
      q: 'Does ARES Electrical support DWG?',
      a: 'Yes. ARES Electrical reads and saves DWG natively, and its projects can be organized as multi-page DWG files.',
    },
    {
      category: 'technical',
      q: 'Which operating system does ARES Electrical support?',
      a: 'The official product page lists ARES Electrical for Windows 64-bit only. Confirm supported Windows versions from current documentation.',
    },
    {
      category: 'technical',
      q: 'Which languages are available?',
      a: 'The official page lists English, Portuguese, and Spanish.',
    },
    {
      category: 'standards',
      q: 'Which electrical standards are supported?',
      a: 'The official page lists ANSI, DIN, IEC, and ABNT standards.',
    },
    {
      category: 'automation',
      q: 'Does ARES Electrical automate wire numbering?',
      a: 'Yes. Automatic wire numbering is one of the electrical automation features described on the official product page.',
    },
    {
      category: 'automation',
      q: 'Does it support component tagging and cross-referencing?',
      a: 'Yes. ARES Electrical automates component tagging and cross-referencing as part of its electrical design workflows.',
    },
    {
      category: 'standards',
      q: 'Can I customize the electrical component libraries?',
      a: 'Yes. The product allows users to copy and modify available components and create new components for company-specific requirements.',
    },
    {
      category: 'automation',
      q: 'Can ARES Electrical create project reports?',
      a: 'Yes. ARES Electrical can automatically generate electrical project reports, and these reports can be customized according to company or customer standards.',
    },
    {
      category: 'dwg',
      q: 'Can a project contain multiple pages?',
      a: 'Yes. The official product page describes electrical projects as DWG files that can contain tens or hundreds of pages.',
    },
    {
      category: 'dwg',
      q: 'Can I export drawings to PDF and DXF?',
      a: 'The official product page describes generating DWG, PDF, and DXF files for sharing project information and drawings.',
    },
    {
      category: 'general',
      q: 'Can ARES Electrical be used for control panel design?',
      a: 'Yes. The product supports control panel drawing workflows and integrated panel layouts using intelligent assembly and equipment-positioning resources.',
    },
    {
      category: 'trinity',
      q: 'Can I collaborate through the cloud?',
      a: 'ARES Electrical users may use optional ARES Trinity collaboration features, depending on the license and configured cloud workflow.',
    },
    {
      category: 'trinity',
      q: 'Does ARES Electrical include ARES Touch and ARES Kudo?',
      a: 'The official product page describes ARES Electrical as available with or without Trinity. A qualifying Trinity license can include access to ARES Touch and ARES Kudo for the applicable period. Confirm current license inclusions before purchase.',
    },
    {
      category: 'trinity',
      q: 'Can I work with electrical drawings on ARES Touch or ARES Kudo?',
      a: 'ARES Touch and ARES Kudo provide supported DWG viewing, markup, and editing workflows. Specialized ARES Electrical authoring toolsets run on Windows desktop.',
    },
    {
      category: 'licensing',
      q: 'Is there a free trial?',
      a: 'The official website provides an ARES Electrical trial/download workflow. Confirm the current trial duration and eligibility from the official page before publishing specific terms.',
    },
    {
      category: 'licensing',
      q: 'How can I get an ARES Electrical quotation in India?',
      a: 'Visitors can contact our sales team at Leniva CAD Solutions to confirm official quotations, license options, GST tax details, and Trinity availability.'
    },
    {
      category: 'general',
      q: 'Where can I find official product information?',
      a: 'Official product information can be found at: https://www.graebert.com/in/cad-software/ares-electrical/',
    },
  ],
  relatedProducts: [
    {
      name: 'ARES Commander',
      slug: 'ares-commander',
      category: 'CAD Software',
      desc: 'Professional 2D/3D DWG-native CAD software with Trinity cloud integration.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'ARES Mechanical',
      slug: 'ares-mechanical',
      category: 'Mechanical CAD',
      desc: 'DWG mechanical engineering drafting with parts libraries and international standards.',
      image: '/images/software/ares-mechanical.jpg',
    },
    {
      name: 'SketchUp Pro',
      slug: 'sketchup',
      category: '3D Modeling',
      desc: 'Intuitive 3D modeling and architectural design software.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chaos V-Ray',
      slug: 'vray',
      category: 'Rendering Engine',
      desc: 'Photorealistic 3D rendering and ray tracing for design visualization.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chaos Enscape',
      slug: 'enscape',
      category: 'Real-Time Rendering',
      desc: 'Real-time rendering and virtual reality walkthroughs for CAD and BIM.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    },
  ],
}
