// ============================================================================
// ARES KUDO PRODUCT DATA & CONTENT REPOSITORY
// Verified Official References:
// - Product Page: https://www.graebert.com/cad-software/ares-kudo/
// - Cloud CAD & Features: https://www.graebert.com/cad-software/ares-kudo/features/
// - Trinity Ecosystem: https://www.graebert.com/cad-software/ares-trinity/
// - Graebert Pricing & Plans: https://www.graebert.com/cad-software/buy/
// ============================================================================

export interface AresKudoFeatureItem {
  id: string
  title: string
  category: 'drawing' | 'annotation' | 'layers' | 'hatches' | 'blocks' | 'reference' | 'output'
  commandSample: string
  description: string
  tools: string[]
  badge?: string
}

export interface AresKudoStorageIntegration {
  id: string
  name: string
  logoText: string
  category: 'Public Cloud' | 'Enterprise Cloud' | 'BIM & Engineering' | 'Private Server'
  description: string
  features: string[]
  isPopular?: boolean
}

export interface AresKudoCollaborationTool {
  id: string
  title: string
  iconName: string
  summary: string
  description: string
  workflowBenefit: string
  capabilities: string[]
}

export interface AresKudoPersona {
  role: string
  tagline: string
  painPoint: string
  kudoSolution: string
  keyTools: string[]
  quote: string
}

export interface AresKudoPricingPlan {
  id: 'free' | 'professional' | 'flex-cloud' | 'enterprise'
  name: string
  tagline: string
  targetUser: string
  priceEur: {
    annual?: number
    monthly?: number
    custom?: boolean
    free?: boolean
  }
  priceInr: {
    annual?: number
    monthly?: number
    custom?: boolean
    free?: boolean
  }
  billingNote: string
  popular?: boolean
  badge?: string
  features: string[]
  ctaText: string
  ctaAction: 'trial' | 'buy' | 'contact'
}

export interface AresKudoComparisonRow {
  capability: string
  category: 'Viewing & Basics' | 'CAD Editing' | 'Cloud Storage' | 'Collaboration' | 'AI & Automation' | 'Mobile & Multiplatform' | 'Licensing & Admin'
  free: boolean | string
  professional: boolean | string
  commanderTrinity: boolean | string
  highlight?: boolean
}

export interface AresKudoFaq {
  question: string
  answer: string
  category: 'overview' | 'capabilities' | 'cloud-security' | 'pricing-licensing' | 'autocad-comparison'
}

export const aresKudoData = {
  identity: {
    productName: 'ARES Kudo',
    company: 'Graebert GmbH',
    category: 'Cloud CAD / Online CAD Software',
    productPositioning: 'The Most Advanced Online CAD Software for DWG Viewing & Editing',
    primaryValue: 'Edit, share, collaborate and manage DWG drawings directly from a web browser without installing traditional desktop CAD software.',
    officialUrl: 'https://www.graebert.com/cad-software/ares-kudo',
    trinityUrl: 'https://www.graebert.com/cad-software/ares-trinity',
    graebertAcademyUrl: 'https://academy.graebert.com',
    heroImage: '/images/software/ares-kudo.jpg',
    trinityImage: '/images/software/ares-trinity.jpg',
  },

  hero: {
    eyebrow: 'CLOUD CAD REVOLUTION',
    headline: 'The Most Advanced Online CAD Software for DWG Viewing & Editing',
    subheading: 'Edit, Share, and Collaborate on DWG Files Directly in Your Web Browser',
    description:
      'ARES Kudo is Graebert’s flagship cloud-based CAD solution engineered for architects, engineers, and design teams. Create, edit, annotate, and securely share full 2D DWG drawings directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari without desktop software installation or hardware lock-in.',
    pills: [
      'No Desktop Installation Needed',
      '100% Native DWG Read & Write',
      '300+ 2D CAD Drafting Tools',
      'Connects to Existing Cloud Storage',
      'A3 (ARES AI Assist) Integrated',
      'Automated Batch Drawings Pipeline',
      'View-Only Client Sharing Links',
      'Cross-Device Trinity Sync',
    ],
    primaryCta: 'Start Free Kudo Trial',
    secondaryCta: 'Explore 300+ CAD Tools',
    tertiaryCta: 'Compare Plans & Licensing',
  },

  introduction: {
    heading: 'ARES Kudo – Cloud-Based CAD for DWG',
    subheading: 'Engineered for Modern Teams Who Refuse to Be Tethered to a Single Workstation',
    paragraphs: [
      'For decades, CAD professionals were bound to heavy desktop workstations, proprietary license dongles, and manual file transfers via email or USB drives. ARES Kudo shifts the entire professional drafting paradigm to the modern browser, delivering the speed, precision, and toolset of high-end desktop CAD inside a zero-install web interface.',
      'Unlike lightweight document viewers that only render static snapshots, ARES Kudo gives you a full-featured drafting engine. You can draw lines, modify polylines, adjust layers, define blocks, apply dimensions, and execute complex commands natively in DWG, all while collaborating in real time with teammates across the globe.',
    ],
    traditionalVsKudo: {
      traditional: {
        title: 'Traditional Desktop CAD',
        items: [
          'Requires 4GB+ local software installation per workstation',
          'Tethered to office hardware or expensive graphics laptops',
          'Manual file transfers lead to confusing revision conflicts (v2_final_final.dwg)',
          'Requires client software or PDF exports just to review designs',
          'Siloed markups scattered across email chains and paper redlines',
          'Slow rollout of patches, license servers, and updates across company machines',
        ],
      },
      kudo: {
        title: 'ARES Kudo Cloud CAD',
        items: [
          'Zero desktop installation — runs instantly in any modern web browser',
          'Access your CAD projects securely from home, site, office, or client meetings',
          'Real-time single source of truth linked directly to your cloud storage',
          'Instant view-only links with expiration dates and password protection',
          'Centralized markup thread with voice notes, photo pins, and @mentions',
          'Always up-to-date cloud deployment with enterprise SSO and role-based permissions',
        ],
      },
    },
  },

  features300: {
    heading: 'Create & Modify DWG Drawings in the Cloud',
    badge: '300+ CAD Tools',
    description:
      'ARES Kudo is not a stripped-down CAD viewer. It provides over 300 robust, production-proven 2D CAD features accessible directly from a browser command line or ribbon menu.',
    categories: [
      {
        id: 'drawing',
        name: 'Drawing & Editing',
        count: '85+ Tools',
        description: 'Complete geometric drawing and entity transformation suite.',
        tools: [
          'Line, Polyline, 3D Polyline',
          'Circle, Arc, Ellipse, Spline',
          'Construction Lines (XLine) & Rays',
          'Move, Copy, Rotate, Scale',
          'Mirror, Offset, Array (Rect/Polar)',
          'Trim, Extend, Break, Join',
          'Fillet, Chamfer, Stretch, Explode',
        ],
      },
      {
        id: 'annotation',
        name: 'Annotation & Dimensioning',
        count: '50+ Tools',
        description: 'Production documentation tools adhering to ISO and ANSI standards.',
        tools: [
          'Linear, Aligned & Angular Dimensions',
          'Radius, Diameter & Arc Length',
          'Dimension Style Manager & Overrides',
          'Single-line Text & Multiline Text (MText)',
          'Leaders & Multileader Styles',
          'Revision Clouds & Geometric Tolerances',
          'Center Marks & Centerlines',
        ],
      },
      {
        id: 'layers',
        name: 'Layer Management',
        count: '35+ Tools',
        description: 'Comprehensive layer control mirroring desktop CAD workflows.',
        tools: [
          'Layer Creation, Rename & Deletion',
          'Color, Linetype & Lineweight Control',
          'Freeze, Thaw, Lock & Unlock',
          'Layer Isolate & Un-isolate',
          'Layer States Manager',
          'Viewport-Specific Layer Overrides',
          'Layer Search & Filters',
        ],
      },
      {
        id: 'hatches',
        name: 'Hatches & Gradients',
        count: '25+ Tools',
        description: 'Rich associative patterns for architectural and mechanical shading.',
        tools: [
          'Standard ANSI, ISO & Custom Patterns',
          'Solid & Two-Color Gradient Fills',
          'Associative & Non-Associative Hatches',
          'Boundary Detection (Pick Points / Select)',
          'Pattern Scale, Angle & Origin Control',
          'Hatch Transparency & Layer Matching',
        ],
      },
      {
        id: 'blocks',
        name: 'Blocks & Dynamic Library',
        count: '40+ Tools',
        description: 'Reusable drawing components and shared enterprise libraries.',
        tools: [
          'Block Definition & In-place Insertion',
          'Attribute Definition & Editing (ATTEDIT)',
          'Dynamic Blocks Display & Manipulation',
          'Trinity Block Library (450+ standard parts)',
          'Company Cloud Library Sharing',
          'Base Point Redefinition & Purge',
        ],
      },
      {
        id: 'reference',
        name: 'Reference & Data Exchange',
        count: '35+ Tools',
        description: 'Multi-format external references and hybrid drawing imports.',
        tools: [
          'DWG External References (Xrefs)',
          'Raster Image Attach & Clipping',
          'Vector PDF Import & Underlay',
          'MicroStation DGN Import',
          'Data Tables & CSV Extraction',
          'Hyperlinks & Coordinate Linking',
        ],
      },
      {
        id: 'output',
        name: 'Document Output & Publishing',
        count: '30+ Tools',
        description: 'High-fidelity publishing for site prints and regulatory submittals.',
        tools: [
          'High-Fidelity Print to PDF',
          'Sheet Layout Paper Spaces',
          'Plot Style Tables (CTB & STB)',
          'Visual Version Compare Overlays',
          'QR Code Physical-to-Cloud Linking',
          'Batch Drawing Publishing',
        ],
      },
    ],
  },

  nativeDwg: {
    heading: '100% DWG – Natively',
    subheading: 'No File Conversion. No Translation Glitches. Absolute Round-Trip Fidelity.',
    description:
      'ARES Kudo reads and writes Autodesk DWG files natively. When you open a DWG drawing in ARES Kudo, it does not convert the geometry into an interim proprietary format. You are viewing, editing, and saving actual DWG entities.',
    points: [
      {
        title: 'Native File Format',
        desc: 'DWG is the foundational file format of ARES Kudo, guaranteeing seamless interchange with AutoCAD, Revit, MicroStation, and BIM workflows.',
      },
      {
        title: 'Zero Geometry Distortion',
        desc: 'Complex arcs, spline curves, dynamic blocks, layer states, and text fonts maintain exact millimeter precision with no shifted vertices.',
      },
      {
        title: 'Preserves External References (Xrefs)',
        desc: 'Cloud-connected Xrefs automatically link across folders, keeping master floor plans and consultant backgrounds perfectly synchronized.',
      },
      {
        title: 'Version Compatibility',
        desc: 'Supports DWG file versions from R12 all the way to the newest 2018–2025 format specifications.',
      },
    ],
    flowSteps: [
      { step: '01', title: 'DWG in Cloud Storage', desc: 'Drawing stored in Google Drive, OneDrive, Box, or SharePoint' },
      { step: '02', title: 'Zero-Install Kudo Engine', desc: 'Opens instantly in any modern web browser without download' },
      { step: '03', title: 'Full 2D CAD Editing', desc: 'Execute standard commands, modify layers, insert blocks, annotate' },
      { step: '04', title: 'Native DWG Auto-Save', desc: 'Saves directly back to the original storage without duplicate files' },
      { step: '05', title: 'Live Client & Team Sync', desc: 'Colleagues on desktop or mobile see changes immediately' },
    ],
  },

  workAnywhere: {
    heading: 'Your DWGs. Anywhere.',
    subheading: 'Break Free from Desktop Constraints with True Device Independence',
    description:
      'Whether you are at your office workstation, reviewing a submittal on your home laptop, walking a construction jobsite, or presenting to a client in a conference room, your complete CAD workspace is accessible with a single browser login.',
    locations: [
      {
        id: 'office',
        name: 'Design Studio / Office',
        icon: 'Building2',
        benefit: 'Full dual-monitor drafting power on Mac, Windows, or Linux without heavy local workstation licensing.',
      },
      {
        id: 'home',
        name: 'Work From Home',
        icon: 'Home',
        benefit: 'Jump into production drawings immediately without slow VPNs or remote-desktop latency.',
      },
      {
        id: 'site',
        name: 'Construction Jobsite',
        icon: 'HardHat',
        benefit: 'Open the latest revision on a field laptop or tablet browser to verify as-built dimensions on the spot.',
      },
      {
        id: 'client',
        name: 'Client Presentations',
        icon: 'Users',
        benefit: 'Present live DWGs in client meetings without bringing heavy hardware; make requested changes in real time.',
      },
      {
        id: 'remote',
        name: 'Global Distributed Team',
        icon: 'Globe',
        benefit: 'Engineers in different time zones coordinate on the same cloud-stored drawings without file duplication.',
      },
    ],
  },

  cloudStorage: {
    heading: 'Connect to the Cloud Storage You Already Use',
    subheading: 'No Proprietary File Silos. Zero Duplication. Total Enterprise Sovereignty.',
    description:
      'Unlike legacy CAD vendors who force your drawings into their proprietary walled gardens, ARES Kudo seamlessly connects to your organization’s existing enterprise cloud storage. Your drawings stay exactly where your IT policies require them.',
    integrations: [
      {
        id: 'google-drive',
        name: 'Google Drive',
        logoText: 'Google Drive',
        category: 'Public Cloud',
        description: 'Direct integration with Google Workspace for shared team drives and personal storage.',
        features: ['OAuth 2.0 single sign-on', 'Shared Drives support', 'Automatic cloud versioning'],
        isPopular: true,
      },
      {
        id: 'onedrive',
        name: 'Microsoft OneDrive',
        logoText: 'OneDrive',
        category: 'Public Cloud',
        description: 'Seamless integration with personal Microsoft accounts and enterprise OneDrive folders.',
        features: ['Instant folder sync', 'Microsoft 365 workflow', 'Desktop & web continuity'],
      },
      {
        id: 'onedrive-business',
        name: 'OneDrive for Business',
        logoText: 'OneDrive Business',
        category: 'Enterprise Cloud',
        description: 'Enterprise-grade Microsoft 365 storage with corporate compliance and security controls.',
        features: ['Azure Active Directory SSO', 'Corporate retention policies', 'Team permission inheritance'],
        isPopular: true,
      },
      {
        id: 'sharepoint',
        name: 'Microsoft SharePoint',
        logoText: 'SharePoint',
        category: 'Enterprise Cloud',
        description: 'Connect directly to company intranet document libraries and project team sites.',
        features: ['Document library mapping', 'Multi-department access', 'Enterprise file governance'],
        isPopular: true,
      },
      {
        id: 'box',
        name: 'Box',
        logoText: 'Box',
        category: 'Enterprise Cloud',
        description: 'Secure enterprise content management with advanced compliance and watermarking.',
        features: ['HIPAA / SOC2 compliance ready', 'Granular folder permissions', 'Audit trail integration'],
      },
      {
        id: 'dropbox',
        name: 'Dropbox & Dropbox Business',
        logoText: 'Dropbox',
        category: 'Public Cloud',
        description: 'High-speed cloud synchronization for design studios and creative architectural practices.',
        features: ['Team folders support', 'Quick file sharing', 'Automatic background sync'],
      },
      {
        id: 'onshape',
        name: 'PTC Onshape',
        logoText: 'PTC Onshape',
        category: 'BIM & Engineering',
        description: 'The preferred 2D DWG companion for PTC Onshape full-cloud 3D CAD users.',
        features: ['Onshape App Store integration', '2D drafting for 3D assemblies', 'Unified cloud design stack'],
      },
      {
        id: 'trimble-connect',
        name: 'Trimble Connect',
        logoText: 'Trimble Connect',
        category: 'BIM & Engineering',
        description: 'Deep integration with Trimble’s construction and engineering collaboration platform.',
        features: ['BIM coordinate sharing', 'Project folder synchronization', 'Civil & structural alignment'],
      },
      {
        id: 'private-cloud',
        name: 'WebDAV, Nextcloud & AWS',
        logoText: 'Private Servers',
        category: 'Private Server',
        description: 'Connect on-premise private cloud servers or dedicated AWS S3 storage buckets.',
        features: ['Self-hosted server support', 'Air-gapped data residency', 'Zero third-party data transit'],
      },
    ],
  },

  security: {
    heading: 'Secure DWG Access & Enterprise Governance',
    subheading: 'Centralize Your IP, Control Permissions, and Prevent Unchecked Drawing Sprawl',
    description:
      'Engineering and architectural drawings represent your company’s most sensitive intellectual property. ARES Kudo eliminates dangerous email attachments and unencrypted USB drives through centralized, permission-based cloud governance.',
    pillars: [
      {
        title: 'Granular User Permissions',
        desc: 'Designate specific users as Viewers, Commenters, or Editors on a folder-by-folder or drawing-by-drawing basis.',
      },
      {
        title: 'IT Storage Whitelisting',
        desc: 'Enterprise administrators can enforce which cloud storage providers employees are permitted to connect to ARES Kudo.',
      },
      {
        title: 'Complete Version History',
        desc: 'Review an immutable chronological audit trail of who modified a drawing, what was changed, and when.',
      },
      {
        title: 'Visual Version Compare',
        desc: 'Overlay two drawing revisions side by side or in a split view. Newly added geometry appears in green, deletions in red.',
      },
      {
        title: 'Session Concurrency Handling',
        desc: 'Automatic session locking prevents conflicting simultaneous edits when two team members open the same drawing.',
      },
      {
        title: 'Enterprise SSO Integration',
        desc: 'Authenticate users through Microsoft Azure AD, Okta, Ping Identity, or SAML 2.0 with central IT provisioning.',
      },
    ],
  },

  collaboration: {
    heading: 'Modern Collaboration for Modern CAD Teams',
    subheading: 'Accelerate Review Cycles by Bringing Conversations Directly into the CAD Drawing',
    description:
      'Traditional CAD review cycles require exporting PDFs, marking them up in separate tools, emailing scanned notes, and manually transcribing changes back into the CAD file. ARES Kudo replaces this broken workflow with real-time in-drawing collaboration.',
    tools: [
      {
        id: 'view-only-links',
        title: 'View-Only Sharing Links',
        iconName: 'Link2',
        summary: 'Share live drawings with clients or subcontractors without granting edit rights.',
        description:
          'Generate a secure URL that lets external stakeholders view the up-to-date DWG drawing in any web browser without logging in or downloading software.',
        workflowBenefit: 'Eliminates repetitive PDF exports and ensures contractors always see the newest revision.',
        capabilities: ['Password protection', 'Custom expiration date', 'One-click instant revocation', 'Always displays latest live save'],
      },
      {
        id: 'rich-comments',
        title: 'Rich In-Drawing Markups',
        iconName: 'MessageSquare',
        summary: 'Pin comments, photos, voice notes, and stamps to exact drawing coordinates.',
        description:
          'Place markup pins directly on specific drawing elements. Attach text explanations, site photos taken on mobile, or recorded voice memos for hands-free site instruction.',
        workflowBenefit: 'Reduces miscommunication by anchoring feedback directly to the physical geometry.',
        capabilities: ['Text comment threads', 'Site photo attachments', 'Voice audio memos', 'Official Approval/Revision stamps'],
      },
      {
        id: 'email-mentions',
        title: '@Mentions & Notifications',
        iconName: 'AtSign',
        summary: 'Notify colleagues instantly when their input is needed on a specific detail.',
        description:
          'Type @name inside any comment to send an instant email notification with a direct deep link to the exact coordinate and markup pin.',
        workflowBenefit: 'Cuts project review bottlenecks by bringing engineers directly to the issue.',
        capabilities: ['Instant email alert', 'Deep link to coordinate', 'Resolved/Unresolved status', 'Activity feed filter'],
      },
      {
        id: 'qr-codes',
        title: 'Smart QR Code Verification',
        iconName: 'QrCode',
        summary: 'Bridge the gap between physical paper drawings and live cloud revisions.',
        description:
          'Generate and place dynamic QR codes on sheet title blocks. When scanned by a phone camera on a jobsite, it immediately opens the live cloud DWG to verify whether the paper print is still the latest revision.',
        workflowBenefit: 'Prevents catastrophic construction mistakes caused by working from outdated paper prints.',
        capabilities: ['Auto-generated title block stamps', 'Instant mobile camera scan', 'Revision mismatch warning', 'No app install needed'],
      },
    ],
  },

  blockLibrary: {
    heading: 'Build a Shared CAD Library for Your Team',
    subheading: 'Trinity Block Library with 450+ Standardized Components and Dynamic Behaviors',
    description:
      'Stop redrawing standard architectural doors, windows, fasteners, and electrical symbols. ARES Kudo includes the Trinity Block Library, giving your entire organization instant cloud access to preconfigured, standardized CAD content.',
    stats: {
      blocksCount: '450+',
      categoriesCount: '8 Industry Domains',
      dynamicSupport: '100% Dynamic Blocks',
    },
    categories: [
      { name: 'Architectural', items: ['Exterior & Interior Doors', 'Multi-pane Windows', 'Stairs & Escalators', 'Sanitary Fixtures', 'Elevators'] },
      { name: 'Interior & Furniture', items: ['Office Desks & Chairs', 'Modular Workstations', 'Conference Tables', 'Kitchen Fixtures', 'Retail Display Units'] },
      { name: 'Electrical & Power', items: ['Single & Duplex Outlets', 'Lighting Fixtures', 'Main Switchboards', 'Breaker Panels', 'Schematic Symbols'] },
      { name: 'Mechanical & Piping', items: ['Hex Bolts & Nuts', 'Ball Bearings', 'Gate & Check Valves', 'Flanges & Couplings', 'HVAC Duct Transitions'] },
      { name: 'Structural & Civil', items: ['Wide-Flange I-Beams', 'Reinforcement Bars', 'North Arrows', 'Section Markers', 'Elevation Callouts'] },
    ],
    highlights: [
      'Centralized cloud management: update a block once, and it propagates to the entire team',
      'Dynamic blocks support: change door swing angles or window widths with visual grips',
      'Create custom team libraries: save your studio’s proprietary details into private cloud catalogs',
    ],
  },

  aiAssist: {
    heading: 'AI Assistance Inside Your CAD Workflow',
    subheading: 'ARES AI Assist (A3) – Your Intelligent Virtual CAD Expert',
    description:
      'ARES AI Assist (A3) brings conversational artificial intelligence directly into your drafting workspace. Ask questions in plain English, discover optimal CAD commands, calculate room parameters, and receive step-by-step drafting guidance without leaving your drawing.',
    capabilities: [
      {
        title: 'Natural-Language CAD Guidance',
        desc: 'Ask "How do I create a custom dimension style with architectural tick marks?" and A3 provides the exact steps and command shortcuts.',
      },
      {
        title: 'Instant Geometric Calculations',
        desc: 'Select a closed polyline boundary and ask A3 to calculate usable floor area, perimeter, and square footage in metric or imperial units.',
      },
      {
        title: 'Command Discovery & Navigation',
        desc: 'New to ARES Kudo or transitioning from AutoCAD? A3 locates equivalent tools, ribbon buttons, and command-line aliases instantly.',
      },
      {
        title: 'Multilingual Drawing Translation',
        desc: 'Translate drawing notes, general specifications, and title block schedules between global languages for international submittals.',
      },
    ],
    samplePrompts: [
      {
        user: 'How do I bind this external reference DWG before archiving?',
        assistant: 'To bind an Xref in ARES Kudo: Open the References manager, right-click the DWG, and select "Bind". Choose "Bind" to preserve unique layer prefixes or "Insert" to merge layers into standard names.',
      },
      {
        user: 'Calculate the total square meters of the conference room boundary.',
        assistant: 'Selected Room Polyline Boundary: Area = 48.65 m² (523.66 sq ft), Perimeter = 28.20 m. Would you like me to insert an area tag into the drawing?',
      },
      {
        user: 'What is the keyboard shortcut for trimming lines to an edge?',
        assistant: 'The shortcut is TR (TRIM). You can also hold the Shift key while inside the TRIM command to toggle between Trim and Extend modes instantly.',
      },
    ],
  },

  automation: {
    heading: 'Automate Repetitive CAD Tasks',
    subheading: 'ARES Online Drawings Automation – Scale Your Productivity in the Cloud',
    description:
      'Eliminate manual drawing conversions and tedious drafting chores. ARES Kudo provides cloud-based batch automation services that process hundreds of drawings simultaneously on high-performance cloud servers.',
    pipelines: [
      {
        title: 'PDF to Native DWG Conversion',
        desc: 'Convert vector PDF blueprints back into editable DWG drawings with real lines, arcs, layers, and true CAD text.',
        badge: 'Vector Intelligence',
      },
      {
        title: 'MicroStation DGN to DWG',
        desc: 'Batch-process legacy infrastructure projects from Bentley DGN format directly into clean, standardized DWG files.',
        badge: 'Interoperability',
      },
      {
        title: 'Batch DWG to High-Res PDF',
        desc: 'Publish hundreds of sheet layouts and viewports to archival multi-page PDF packages with customized plot styles (CTB/STB).',
        badge: 'Publishing',
      },
      {
        title: 'DWG Data Extraction to Excel / CSV',
        desc: 'Extract block attributes, equipment quantities, room schedules, and cable lengths directly into Excel spreadsheets for cost estimation.',
        badge: 'Quantity Takeoffs',
      },
      {
        title: 'BIM to Automated 2D Drawings',
        desc: 'Extract clean 2D floor plans, building elevations, and cross-sections directly from Autodesk Revit (RVT) and open IFC models.',
        badge: 'BIM Automation',
      },
    ],
  },

  bimToDwg: {
    heading: 'Turn BIM Data into Automated 2D Drawings',
    subheading: 'Bridging the Gap Between Heavy 3D BIM Models and Fast 2D Documentation',
    description:
      'While 3D BIM models are essential for coordination, 2D DWG drawings remain the universal legal and contracting standard for permits, construction sites, and fabrication shops. ARES Kudo extracts clean, lightweight 2D documentation directly from Revit and IFC files.',
    workflow: [
      { step: '1', title: 'Upload Revit / IFC', desc: 'Import .rvt or .ifc BIM models directly into your cloud repository.' },
      { step: '2', title: 'Automated Extraction', desc: 'ARES cloud algorithms generate precise 2D floor plans, cross-sections, and building elevations.' },
      { step: '3', title: 'Intelligent CAD Layers', desc: 'Walls, doors, structural columns, and MEP systems are organized onto standardized DWG layers.' },
      { step: '4', title: 'Enrich in ARES Kudo', desc: 'Add detailed dimensions, leader notes, revision clouds, and local details using 300+ CAD tools.' },
      { step: '5', title: 'Publish & Submittal', desc: 'Export high-resolution PDFs or DWG packages for field contractors and building authorities.' },
    ],
  },

  personas: [
    {
      role: 'Architects',
      tagline: 'Refine floor plans and details anywhere without desktop licensing limits.',
      painPoint: 'Unable to access full CAD tools when traveling, visiting job sites, or using thin laptops.',
      kudoSolution: 'Full 2D CAD drafting right inside the browser with 100% DWG fidelity and Trinity block libraries.',
      keyTools: ['Polylines & Trimming', 'Dimension Styles', 'Trinity Block Library', 'View-Only Client Links'],
      quote: 'ARES Kudo lets me tweak architectural details during client meetings in their boardroom without carrying a 3kg mobile workstation.',
    },
    {
      role: 'Consulting Engineers',
      tagline: 'Review MEP & structural drawings with zero software installation overhead.',
      painPoint: 'Tired of slow VPNs to access office workstations and dealing with mismatched AutoCAD versions.',
      kudoSolution: 'Instant browser access to drawings stored in Google Drive or SharePoint with native DWG compatibility.',
      keyTools: ['Xrefs Management', 'Layer Filters', 'Visual Version Compare', 'Batch PDF Plotting'],
      quote: 'We replaced cumbersome remote-desktop lag with native browser CAD. Our engineering review cycles are 3x faster.',
    },
    {
      role: 'Project Managers & Site Supervisors',
      tagline: 'Ensure construction trades are building from the latest verified revision.',
      painPoint: 'Paper prints on the jobsite frequently lag behind recent drawing revisions, leading to expensive rework.',
      kudoSolution: 'Smart QR codes on physical prints and instant view-only browser links ensure real-time revision verification.',
      keyTools: ['QR Code Generation', 'Voice Memo Markups', 'Site Photo Pinning', 'Live Revision Links'],
      quote: 'Scanning the QR code on a paper drawing immediately confirms if it is current. That alone saved us tens of thousands in rework.',
    },
    {
      role: 'Enterprise CAD & IT Directors',
      tagline: 'Eliminate CAD installation sprawl while maintaining absolute data sovereignty.',
      painPoint: 'Managing software installations, license servers, and security leaks from unencrypted CAD files on personal laptops.',
      kudoSolution: 'Zero local installation, enterprise SSO, centralized cloud storage whitelisting, and floating license pools.',
      keyTools: ['Azure AD SSO', 'Cloud Whitelisting', 'Floating Seat Pools', 'Granular Role Permissions'],
      quote: 'ARES Kudo eliminated workstation deployment headaches. When a new contractor joins, we simply assign a login, and they are productive in minutes.',
    },
  ],

  trinityEcosystem: {
    heading: 'One Unified CAD Ecosystem Across Desktop, Cloud & Mobile',
    subheading: 'ARES Commander + ARES Kudo + ARES Touch = The ARES Trinity',
    description:
      'Graebert’s Trinity concept gives you the ultimate drafting freedom. Work at your desk on ARES Commander, review and edit in your browser on ARES Kudo, and annotate drawings on your smartphone or iPad with ARES Touch. All three platforms share the same DWG core, cloud storage, and licensing.',
    components: [
      {
        name: 'ARES Commander',
        platform: 'Desktop (Windows, macOS, Linux)',
        badge: 'High-Performance 2D & 3D',
        description: 'Heavyweight desktop CAD engine for complex 2D drafting, 3D solid modeling, BIM-to-CAD extraction, and advanced C++/LISP programming.',
      },
      {
        name: 'ARES Kudo',
        platform: 'Cloud (Chrome, Edge, Firefox, Safari)',
        badge: 'Zero-Install Web CAD',
        description: 'Complete online 2D CAD for editing, sharing, collaborating, and automating DWG drawings directly inside modern web browsers.',
        highlight: true,
      },
      {
        name: 'ARES Touch',
        platform: 'Mobile (Android & iOS)',
        badge: 'Field Tablet & Smartphone',
        description: 'Full-featured mobile CAD app with 150+ tools, GPS coordinate location, photo pinning, and offline drawing synchronization on jobsites.',
      },
    ],
  },

  autocadLtComparison: {
    heading: 'A Modern Cloud-Based Alternative to AutoCAD LT',
    subheading: 'Why Leading Engineering Firms Are Choosing ARES Kudo Over Legacy 2D CAD',
    description:
      'AutoCAD LT has long been the default for 2D drafting, but it remains fundamentally bound to desktop installations, proprietary cloud lock-in, and steep recurring subscription fees. ARES Kudo delivers full 2D CAD capabilities with superior cloud mobility, real-time collaboration, and significant cost savings.',
    comparisonPoints: [
      {
        feature: 'Deployment & Installation',
        kudo: 'Zero desktop installation. Runs instantly in any web browser on Mac, Windows, Linux, or Chromebook.',
        autocadLt: 'Requires 4GB+ desktop installation per machine; locked to Windows/Mac only.',
        advantage: 'kudo',
      },
      {
        feature: 'Cloud Storage Freedom',
        kudo: 'Connects directly to your existing Google Drive, OneDrive, SharePoint, Box, Dropbox, Onshape, or private WebDAV.',
        autocadLt: 'Strongly pushes users toward Autodesk Docs / Autodesk Construction Cloud with limited third-party depth.',
        advantage: 'kudo',
      },
      {
        feature: 'Native DWG Compatibility',
        kudo: '100% native DWG read & write with zero translation loss across all historical DWG formats.',
        autocadLt: 'Native DWG format.',
        advantage: 'tie',
      },
      {
        feature: 'Live View-Only Client Sharing',
        kudo: 'Generate live URL links with password protection and expiration dates. Clients view full DWGs without software.',
        autocadLt: 'Requires exporting static PDFs or shared views that require an Autodesk viewer login.',
        advantage: 'kudo',
      },
      {
        feature: 'Integrated In-Drawing Markups',
        kudo: 'Voice notes, geolocated photo pins, and @mention comment threads directly on CAD coordinates.',
        autocadLt: 'Basic PDF markups or desktop trace tool requiring identical desktop software versions.',
        advantage: 'kudo',
      },
      {
        feature: 'AI-Powered CAD Assistance',
        kudo: 'Integrated A3 (ARES AI Assist) for natural-language command discovery, area calculations, and task guidance.',
        autocadLt: 'Limited generic macro advice; no conversational CAD virtual assistant.',
        advantage: 'kudo',
      },
      {
        feature: 'License Flexibility & TCO',
        kudo: 'Cost-effective annual subscriptions with shared floating Flex Cloud options for teams.',
        autocadLt: 'Strictly named-user subscriptions with no floating pool.',
        advantage: 'kudo',
      },
    ],
  },

  comparisonMatrix: [
    {
      category: 'Viewing & Basics' as const,
      capability: 'Online 2D DWG / DXF Viewing',
      free: 'Unlimited',
      professional: 'Unlimited',
      commanderTrinity: 'Unlimited',
    },
    {
      category: 'Viewing & Basics' as const,
      capability: 'Measure Tools (Dist, Area, Angle)',
      free: true,
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'Viewing & Basics' as const,
      capability: 'View-Only Share Links for External Clients',
      free: 'Basic Links',
      professional: 'Password & Expiry Protected',
      commanderTrinity: 'Full Control',
      highlight: true,
    },
    {
      category: 'CAD Editing' as const,
      capability: 'Full 2D CAD Drafting & Editing (300+ Tools)',
      free: 'Viewing only',
      professional: true,
      commanderTrinity: true,
      highlight: true,
    },
    {
      category: 'CAD Editing' as const,
      capability: 'Layer Manager, Overrides & Filters',
      free: 'View only',
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'CAD Editing' as const,
      capability: 'Dimension Styles & Multiline Text (MText)',
      free: false,
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'CAD Editing' as const,
      capability: 'Trinity Block Library (450+ Standard Blocks)',
      free: 'View only',
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'CAD Editing' as const,
      capability: '3D Solid Modeling & ACIS Mesh Tools',
      free: false,
      professional: false,
      commanderTrinity: true,
    },
    {
      category: 'Cloud Storage' as const,
      capability: 'Google Drive, OneDrive, Box, Dropbox',
      free: '1 Provider',
      professional: 'All Providers',
      commanderTrinity: 'All Providers',
    },
    {
      category: 'Cloud Storage' as const,
      capability: 'SharePoint & OneDrive for Business',
      free: false,
      professional: true,
      commanderTrinity: true,
      highlight: true,
    },
    {
      category: 'Cloud Storage' as const,
      capability: 'Private Servers (WebDAV, Nextcloud, AWS S3)',
      free: false,
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'Collaboration' as const,
      capability: 'Markup Feed (Text, Photos, Voice Memos, Stamps)',
      free: 'Text only',
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'Collaboration' as const,
      capability: 'Version History & Visual Version Compare',
      free: 'Recent 3',
      professional: 'Full History',
      commanderTrinity: 'Full History',
      highlight: true,
    },
    {
      category: 'Collaboration' as const,
      capability: 'QR Code Generation for Sheet Title Blocks',
      free: false,
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'AI & Automation' as const,
      capability: 'A3 (ARES AI Assist) Conversational Copilot',
      free: 'Limited Queries',
      professional: true,
      commanderTrinity: true,
      highlight: true,
    },
    {
      category: 'AI & Automation' as const,
      capability: 'Online Drawings Batch Automation Pipeline',
      free: false,
      professional: 'Standard Capacity',
      commanderTrinity: 'Full Enterprise',
    },
    {
      category: 'AI & Automation' as const,
      capability: 'DWG Data Extraction to Excel / CSV',
      free: false,
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'AI & Automation' as const,
      capability: 'Revit (RVT) & IFC to 2D DWG Automation',
      free: false,
      professional: 'Via Cloud Service',
      commanderTrinity: 'Direct BIM Navigator + Cloud',
    },
    {
      category: 'Mobile & Multiplatform' as const,
      capability: 'ARES Touch for iOS & Android Included',
      free: 'Viewer only',
      professional: true,
      commanderTrinity: true,
    },
    {
      category: 'Mobile & Multiplatform' as const,
      capability: 'ARES Commander Desktop CAD Included',
      free: false,
      professional: false,
      commanderTrinity: true,
      highlight: true,
    },
    {
      category: 'Licensing & Admin' as const,
      capability: 'Floating / Shared Seat License Pool (Flex Cloud)',
      free: false,
      professional: 'Optional Add-on',
      commanderTrinity: 'Available',
    },
    {
      category: 'Licensing & Admin' as const,
      capability: 'Enterprise SSO (Azure AD, Okta, SAML)',
      free: false,
      professional: 'Enterprise Plan',
      commanderTrinity: 'Enterprise Plan',
    },
  ],

  pricingPlans: [
    {
      id: 'free' as const,
      name: 'ARES Kudo Free',
      tagline: 'Ideal for project reviewers, clients, and students who need zero-cost DWG viewing and collaboration.',
      targetUser: 'Only for 30 days',
      priceEur: { free: true },
      priceInr: { free: true },
      billingNote: 'Free trial for 30 days with no credit card required',
      features: [
        'Zero-install 2D DWG & DXF web viewer',
        'Accurate measuring (Distance, Area, Radius, Angle)',
        'Basic text commenting on drawing coordinates',
        'Public view-only links for sharing',
        'Connect 1 cloud storage provider (e.g. Google Drive)',
        'Access to Trinity Block Library for viewing',
        'ARES Touch mobile viewing mode',
      ],
      ctaText: 'Sign Up Free',
      ctaAction: 'trial' as const,
    },
    {
      id: 'professional' as const,
      name: 'ARES Kudo Professional',
      tagline: 'The complete cloud drafting solution for individual architects, engineers, and CAD professionals.',
      targetUser: 'Designers & Engineers',
      priceEur: { annual: 200, monthly: 35 },
      priceInr: { annual: 18000, monthly: 3200 },
      billingNote: 'Annual or monthly commercial subscription options',
      popular: false,
      features: [
        'Full 2D CAD drafting & editing in any browser',
        '300+ CAD drawing, modify, and dimension tools',
        '100% native DWG format read & write',
        'Connect unlimited cloud storages (Drive, OneDrive, Box, Dropbox)',
        'Microsoft SharePoint & OneDrive for Business support',
        'Full markup suite: voice memos, photo tags, stamps, @mentions',
        'Password-protected view-only links with expiration dates',
        'Visual version history & side-by-side comparison',
        'A3 (ARES AI Assist) built-in virtual copilot',
        'Trinity Block Library (450+ dynamic blocks)',
        'ARES Touch mobile CAD for iOS & Android included',
      ],
      ctaText: 'Start 30-Day Free Trial',
      ctaAction: 'trial' as const,
    },
    {
      id: 'flex-cloud' as const,
      name: 'ARES Kudo Flex Cloud',
      tagline: 'Floating shared license pool for organizations with distributed or intermittent CAD users.',
      targetUser: 'Teams & Enterprises',
      priceEur: { annual: 300 },
      priceInr: { annual: 27000 },
      billingNote: 'Concurrent multi-user floating license pool (min. 5 seats)',
      badge: 'Best Value for Teams',
      features: [
        'All ARES Kudo Professional features included',
        'Floating shared license pool: unlimited users can share seats',
        'A single seat can be used by User A in the morning, User B in the afternoon',
        'Centralized license management console for IT administrators',
        'Usage analytics and concurrent seat monitoring',
        'Dedicated team cloud storage permissions and policies',
        'Priority technical support & deployment onboarding',
        'ARES Touch included for all active floating users',
      ],
      ctaText: 'Request Flex Quote',
      ctaAction: 'contact' as const,
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise & Developer',
      tagline: 'Tailored private cloud deployments, SSO integration, and custom CAD development APIs.',
      targetUser: 'Large Corporations & OEM Developers',
      priceEur: { custom: true },
      priceInr: { custom: true },
      billingNote: 'Custom quote based on seats & infrastructure',
      features: [
        'Dedicated private cloud infrastructure (single-tenant)',
        'Air-gapped on-premise private server hosting options',
        'Enterprise Single Sign-On (Microsoft Azure AD, Okta, SAML 2.0)',
        'IP-based access restrictions and strict network security',
        'Custom white-label branding & company portal integration',
        'ARES Trinity Developer API access (C++, LISP, JavaScript, Wt)',
        'Online Drawings Automation batch pipeline processing',
        'Dedicated customer success manager & custom SLA',
      ],
      ctaText: 'Contact Enterprise Sales',
      ctaAction: 'contact' as const,
    },
  ],

  developerPlatform: {
    heading: 'Online CAD Platform for Developers',
    subheading: 'Build Custom Web CAD Applications and Automated Drafting Workflows',
    description:
      'ARES Kudo is not just an end-user application; it is an open development platform. Graebert provides a unified API architecture that lets software companies, engineering teams, and OEMs build custom browser-based CAD configurators, automated drawing generators, and proprietary cloud workflows.',
    technologies: [
      { name: 'C++', desc: 'High-performance core algorithms shared across desktop and cloud engines.' },
      { name: 'LISP & DCL', desc: 'Migrate legacy desktop AutoLISP routines to the cloud with minimal refactoring.' },
      { name: 'JavaScript / Web', desc: 'Lightweight web SDK to integrate CAD viewing and editing into your internal web portals.' },
      { name: 'Wt Framework', desc: 'Modern web toolkit for interactive widget integration and real-time socket communication.' },
    ],
    benefits: [
      'Write once, deploy everywhere: APIs cross-compatible across ARES Commander, Touch, and Kudo',
      'Create custom product configurators that generate real DWG submittal drawings on the fly',
      'Integrate CAD functionality into your proprietary ERP, PLM, or project management systems',
    ],
  },

  onboarding: {
    heading: 'Learn ARES Kudo with Free Graebert Academy Courses',
    subheading: 'Master Cloud CAD Drafting, Collaboration, and Administration at Your Own Pace',
    description:
      'Graebert provides complete onboarding and educational resources to ensure your design team becomes fully productive within hours.',
    resources: [
      { title: 'Video Tutorials', desc: 'Bite-sized video lessons covering 2D drafting commands, layer control, and cloud storage connection.', icon: 'PlayCircle' },
      { title: 'Comprehensive Handbooks', desc: 'Searchable electronic guides with detailed command references, shortcut cheat sheets, and best practices.', icon: 'BookOpen' },
      { title: 'Live Weekly Webinars', desc: 'Interactive sessions hosted by Graebert CAD experts demonstrating new features, BIM workflows, and tips.', icon: 'Video' },
      { title: 'Certified Online Courses', desc: 'Structured learning modules with practical drawing exercises and official Graebert Academy certifications.', icon: 'Award' },
    ],
  },

  faqs: [
    {
      category: 'overview' as const,
      question: 'What is ARES Kudo?',
      answer:
        'ARES Kudo is a full-featured cloud CAD solution developed by Graebert that allows you to create, view, edit, annotate, and share 2D DWG drawings directly inside any modern web browser (Google Chrome, Edge, Firefox, Safari) without installing software on your computer.',
    },
    {
      category: 'overview' as const,
      question: 'Who uses ARES Kudo?',
      answer:
        'ARES Kudo is used by architects, civil and structural engineers, mechanical designers, project managers, construction contractors, and enterprise CAD teams who need to access and collaborate on DWG drawings without being tied to a specific office workstation or expensive software licenses.',
    },
    {
      category: 'capabilities' as const,
      question: 'Can ARES Kudo be used for both 2D and 3D CAD?',
      answer:
        'ARES Kudo is designed for comprehensive 2D CAD drafting and editing with over 300 professional tools. For 3D CAD, ARES Kudo supports 3D viewing, orbit, measurement, and annotation. If your team requires advanced 3D solid modeling, surface modeling, and ACIS tools, ARES Commander (the desktop component of the Trinity ecosystem) provides full 3D capabilities.',
    },
    {
      category: 'capabilities' as const,
      question: 'Is ARES Kudo suitable for mobile devices?',
      answer:
        'Yes! While ARES Kudo can open directly inside web browsers on iPads and mobile tablets, every ARES Kudo Professional license also includes ARES Touch — a dedicated native mobile CAD application for iOS (iPhone/iPad) and Android with offline drawing caching and 150+ touch-optimized tools.',
    },
    {
      category: 'capabilities' as const,
      question: 'What are the standout features of ARES Kudo compared to basic web CAD viewers?',
      answer:
        'Unlike basic viewers that only render static snapshots, ARES Kudo is a complete drafting platform. It includes 300+ 2D editing tools, layer management, dynamic blocks, rich markups (voice notes, photo pins, stamps), live view-only sharing links, visual version compare, A3 AI assistant, and automated batch drawing pipelines.',
    },
    {
      category: 'cloud-security' as const,
      question: 'Which cloud storage providers does ARES Kudo support?',
      answer:
        'ARES Kudo natively connects to Google Drive, Microsoft OneDrive, OneDrive for Business, Microsoft SharePoint, Box, Dropbox, PTC Onshape, and Trimble Connect. It also supports private cloud servers via WebDAV, Nextcloud, and AWS S3 environments.',
    },
    {
      category: 'cloud-security' as const,
      question: 'Does ARES Kudo store local duplicate copies of my drawings?',
      answer:
        'No. ARES Kudo does not create redundant file silos. When you open a drawing, it streams directly from your connected cloud storage (e.g., SharePoint or Google Drive), and when you save, modifications are written directly back to the original file in your cloud storage. Your organization retains 100% data sovereignty.',
    },
    {
      category: 'cloud-security' as const,
      question: 'How secure is ARES Kudo for confidential intellectual property?',
      answer:
        'ARES Kudo employs robust enterprise security: all communications occur over encrypted TLS connections, user access is governed by granular role-based permissions, sessions prevent conflicting overwrites, view-only links can be password-protected and expired, and enterprise customers can enforce single sign-on (SSO) via Microsoft Azure AD or Okta.',
    },
    {
      category: 'cloud-security' as const,
      question: 'What web browsers are supported?',
      answer:
        'ARES Kudo is fully optimized for all modern web browsers supporting WebGL and WebAssembly, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari on Windows, macOS, Linux, and ChromeOS.',
    },
    {
      category: 'autocad-comparison' as const,
      question: 'Can ARES Kudo replace AutoCAD LT?',
      answer:
        'Yes. Graebert explicitly positions ARES Kudo as a modern cloud-based alternative to AutoCAD LT. It provides the same essential 2D CAD drafting commands, layer management, dynamic blocks, and native DWG file fidelity, while adding real-time cloud collaboration, view-only sharing links, AI assistance, and up to 60% lower total cost of ownership.',
    },
    {
      category: 'autocad-comparison' as const,
      question: 'How easy is it to transition from AutoCAD to ARES Kudo?',
      answer:
        'The transition is seamless. ARES Kudo uses familiar CAD terminology, ribbon layouts, shortcut commands (such as L for Line, TR for Trim, C for Circle), and supports standard command-line input. Your existing DWG files, blocks, and templates open directly with zero conversion.',
    },
    {
      category: 'pricing-licensing' as const,
      question: 'Is there a free version of ARES Kudo?',
      answer:
        'Yes. ARES Kudo Free allows anyone to view 2D/3D DWG drawings, take accurate measurements, add basic text comments, and share view-only links at zero cost forever. For 2D drawing creation, editing, and advanced collaboration, an ARES Kudo Professional license is required.',
    },
    {
      category: 'pricing-licensing' as const,
      question: 'How does the free trial work?',
      answer:
        'You can activate a 30-day full-featured free trial of ARES Kudo Professional with no credit card required. You get immediate access to all 300+ 2D drafting tools, cloud storage connectors, ARES Touch mobile CAD, and A3 AI assistance.',
    },
    {
      category: 'pricing-licensing' as const,
      question: 'What is ARES Kudo Flex Cloud licensing?',
      answer:
        'Flex Cloud is a floating shared-license pool for teams. Instead of buying individual named licenses for employees who only use CAD occasionally, you purchase a pool of shared seats (minimum 5 seats). Any employee in your company can access ARES Kudo whenever a seat is open in the pool, drastically reducing licensing costs.',
    },
    {
      category: 'pricing-licensing' as const,
      question: 'How does ARES Kudo relate to ARES Commander and ARES Trinity?',
      answer:
        'ARES Kudo (cloud) is part of the ARES Trinity ecosystem alongside ARES Commander (desktop for Windows/Mac/Linux) and ARES Touch (mobile for iOS/Android). If you purchase ARES Commander with Trinity, all three products are included under a single license.',
    },
    {
      category: 'overview' as const,
      question: 'What learning resources are available for new users?',
      answer:
        'All users receive free access to the Graebert Academy, featuring structured video masterclasses, downloadable PDF handbooks, weekly live Q&A webinars, and official CAD certification exams.',
    },
  ],

  relatedContent: [
    {
      title: 'From Manual to Automatic: Creating CAD Blocks with AI',
      category: 'AI & Automation',
      readTime: '5 min read',
      url: '/blog/cad-additive-manufacturing',
      snippet: 'Discover how Graebert integrates AI intelligence into block generation, reducing drafting time for repetitive symbols.',
    },
    {
      title: 'Best AutoCAD Alternative for Onshape Users: Why Choose ARES Kudo',
      category: 'Cloud Engineering',
      readTime: '7 min read',
      url: '/products/cad-software',
      snippet: 'How Onshape 3D mechanical designers seamlessly pair their cloud 3D models with ARES Kudo for complete 2D DWG production documentation.',
    },
    {
      title: 'The Trinity Concept: Unifying Desktop, Cloud & Mobile CAD',
      category: 'Ecosystem',
      readTime: '6 min read',
      url: '/products/ares-commander',
      snippet: 'A comprehensive deep dive into how ARES Commander, ARES Kudo, and ARES Touch communicate across shared cloud storage.',
    },
  ],
}
