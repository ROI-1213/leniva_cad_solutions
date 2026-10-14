export interface SketchUpStudioPlan {
  id: string
  name: string
  tagline: string
  positioning: string
  description: string
  popular?: boolean
  features: string[]
  platform: string
  licensingType: string
  billing: string
  targetUsers: string
  officialUrl: string
  lastVerified: string
}

export interface IncludedToolItem {
  id: string
  name: string
  category: 'core' | 'reality' | 'interop' | 'rendering' | 'ecosystem'
  categoryLabel: string
  tagline: string
  description: string
  inclusionStatus: 'Included in Studio' | 'Included (Web/Mobile)' | 'Cloud Service Included' | 'Separate License/Hardware'
  platform: 'Windows Desktop' | 'Web & iPad' | 'Cloud Browser' | 'Desktop & Mobile'
  features: string[]
  iconName: string
  image: string
  officialDocUrl: string
}

export interface PointCloudStep {
  stepNumber: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  tools: string[]
  image: string
  badge: string
}

export interface StudioFeatureCard {
  id: string
  title: string
  eyebrow: string
  description: string
  iconName: string
  image: string
  tag: string
  linkTarget: string
}

export interface IndustryUseCase {
  id: string
  title: string
  subtitle: string
  description: string
  toolTags: string[]
  image: string
  deliverables: string[]
}

export interface StudioGalleryItem {
  id: string
  title: string
  category: 'architecture' | 'interior' | 'pointcloud' | 'revit' | 'rendering' | 'landscape'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  attribution?: string
}

export interface StudioFaq {
  q: string
  a: string
  category: 'general' | 'pointcloud' | 'revit' | 'vray' | 'licensing' | 'technical'
}

export interface SystemRequirementItem {
  category: string
  minimum: string
  recommended: string
  notes?: string
}

export interface SketchUpStudioData {
  identity: {
    productName: string
    brand: string
    category: string
    platform: string
    coreMessage: string
    positioning: string
    officialUrl: string
    pricingUrl: string
    scanEssentialsUrl: string
    lastChecked: string
  }
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    description: string
    image: string
    badge: string
    stats: { label: string; value: string }[]
  }
  intro: {
    eyebrow: string
    heading: string
    description: string
    points: { title: string; desc: string }[]
    image: string
  }
  perks: StudioFeatureCard[]
  interop: {
    eyebrow: string
    heading: string
    description: string
    workflowSteps: { step: string; title: string; desc: string }[]
    disclaimer: string
    image: string
  }
  scanEssentials: {
    eyebrow: string
    heading: string
    description: string
    formats: string[]
    inputSources: string[]
    keyHighlights: { title: string; desc: string; icon: string }[]
    disclaimer: string
    image: string
    cards: { title: string; desc: string; icon: string }[]
  }
  pointCloudWorkflow: PointCloudStep[]
  revitImporter: {
    eyebrow: string
    heading: string
    description: string
    features: string[]
    limitationsNotice: string
    steps: { step: string; title: string; desc: string }[]
    image: string
  }
  vraySection: {
    eyebrow: string
    heading: string
    description: string
    features: string[]
    lightingAndMaterials: { title: string; desc: string; icon: string }[]
    animationFeatures: string[]
    image: string
    disclaimer: string
  }
  includedTools: IncludedToolItem[]
  ecosystemTabs: {
    id: 'create' | 'visualize' | 'collaborate'
    label: string
    headline: string
    description: string
    tools: string[]
    image: string
  }[]
  industries: IndustryUseCase[]
  gallery: StudioGalleryItem[]
  plans: SketchUpStudioPlan[]
  systemRequirements: SystemRequirementItem[]
  faqs: StudioFaq[]
  learningResources: {
    title: string
    type: string
    description: string
    link: string
    badge: string
  }[]
}

export const sketchUpStudioData: SketchUpStudioData = {
  identity: {
    productName: 'SketchUp Studio',
    brand: 'Trimble',
    category: '3D Modeling, Reality Capture & Photorealistic Visualization',
    platform: 'Windows Desktop Subscription (Web & iPad companion apps included)',
    coreMessage: 'Model with real-world data, visualize your designs with photorealistic quality, and connect your workflow across design applications.',
    positioning: 'An advanced SketchUp subscription combining intuitive 3D modeling, point-cloud reality capture, Revit interoperability, and photorealistic V-Ray rendering in one unified ecosystem.',
    officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing/sketchup-studio',
    pricingUrl: 'https://sketchup.trimble.com/en/plans-and-pricing',
    scanEssentialsUrl: 'https://help.sketchup.com/en/scan-essentials-sketchup',
    lastChecked: 'Official Trimble SketchUp Studio Specification (October 2024 / Windows-Only Studio Bundle)',
  },

  hero: {
    eyebrow: 'SKETCHUP STUDIO | TRIMBLE ECOSYSTEM',
    heading: 'Design With Real-World Data. Visualize Without Limits.',
    subheading: 'SketchUp Studio for advanced 3D modeling, point-cloud workflows, Revit interoperability, and photorealistic visualization.',
    description: 'Bring your ideas to life with SketchUp Studio. Combine intuitive 3D modeling with real-world laser scan data, seamless Revit interoperability, and photorealistic V-Ray rendering to accelerate demanding architectural, engineering, and design-build workflows.',
    image: '/images/software/sketchup-studio.jpg',
    badge: 'Complete Architectural Powerhouse',
    stats: [
      { label: 'Platform Architecture', value: 'Windows OS' },
      { label: 'Included Render Engine', value: 'V-Ray 6' },
      { label: 'Reality Capture Engine', value: 'Scan Essentials' },
      { label: 'Cloud Storage', value: 'Unlimited Connect' },
    ],
  },

  intro: {
    eyebrow: 'ADVANCED TOOLS FOR ADVANCED WORKFLOWS',
    heading: 'One Subscription. More Ways to Create, Analyze & Deliver.',
    description: 'SketchUp Studio combines SketchUp’s beloved intuitive 3D modeling interface with an elite suite of specialized tools: Scan Essentials for point-cloud reality capture, Revit Importer for coordinated BIM handoffs, V-Ray for photorealistic rendering, and LayOut for professional permit drawing sets.',
    points: [
      {
        title: 'Model Efficiently with Native Precision',
        desc: 'Work in the fluid SketchUp desktop modeler with robust push-pull geometry, solid tools, and dynamic parametric components.',
      },
      {
        title: 'Work from Real-World Scan Data',
        desc: 'Import point clouds from laser scanners, mobile mapping rigs, and drones to design directly over authentic as-built conditions.',
      },
      {
        title: 'Streamline Revit Interoperability',
        desc: 'Import Revit models into lightweight, editable SketchUp components without loss of fundamental geometric hierarchy.',
      },
      {
        title: 'Produce High-Impact Visuals',
        desc: 'Leverage the industry-standard V-Ray rendering engine inside SketchUp for stunning interior, exterior, and lighting presentations.',
      },
      {
        title: 'Connect & Coordinate in the Cloud',
        desc: 'Share 3D models with project stakeholders, review markups, and track revisions with Trimble Connect cloud storage.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },

  perks: [
    {
      id: 'precision',
      title: 'Model With Precision',
      eyebrow: 'REALITY CAPTURE',
      description: 'Import, view, section, and snap directly to millions of point-cloud coordinates with Scan Essentials to model existing structures with verified physical accuracy.',
      iconName: 'Scan',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      tag: 'Scan Essentials',
      linkTarget: '#pointclouds',
    },
    {
      id: 'interop',
      title: 'Interoperable Workflows',
      eyebrow: 'BIM COLLABORATION',
      description: 'Import Revit files directly into SketchUp geometry in seconds, unlocking frictionless collaboration between design teams, contractors, and consultants.',
      iconName: 'Repeat',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      tag: 'Revit Importer',
      linkTarget: '#revit',
    },
    {
      id: 'visuals',
      title: 'Present Compelling Visuals',
      eyebrow: 'PHOTOREALISM',
      description: 'Harness V-Ray for SketchUp to produce photo-real daylight simulations, nocturnal renders, interior reflections, and interactive 360° virtual panoramas.',
      iconName: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      tag: 'V-Ray Engine',
      linkTarget: '#visualization',
    },
    {
      id: 'align',
      title: 'Align Distributed Teams',
      eyebrow: 'CLOUD PLATFORM',
      description: 'Use Trimble Connect to coordinate multiple project stakeholders across desktop, web, iPad, and mobile with unlimited storage and real-time version control.',
      iconName: 'Users',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      tag: 'Trimble Connect',
      linkTarget: '#ecosystem',
    },
  ],

  interop: {
    eyebrow: 'CONNECT YOUR DESIGN PROCESS',
    heading: 'Move Between Design Tools With Complete Confidence',
    description: 'SketchUp Studio bridges the gap between conceptual architectural design, as-built reality capture, and coordinated engineering delivery. Import existing Revit structures, refine conceptual volumes in SketchUp, generate construction documentation in LayOut, and render client presentations in V-Ray.',
    workflowSteps: [
      { step: '01', title: 'Revit / Point Cloud Input', desc: 'Ingest Revit RVT models via the native Revit Importer or import laser scans via Scan Essentials.' },
      { step: '02', title: 'SketchUp Conceptual Design', desc: 'Rapidly sculpt volumes, adjust spatial layouts, test material iterations, and coordinate components.' },
      { step: '03', title: 'LayOut Documentation', desc: 'Send live-linked model views directly to LayOut for scaled 2D permit drawings, elevations, and sections.' },
      { step: '04', title: 'V-Ray & Client Presentation', desc: 'Render photorealistic imagery, interactive 360° panoramas, and cloud-hosted Trimble Connect reviews.' },
    ],
    disclaimer: 'Note: Revit Importer converts supported Revit geometry into clean SketchUp groups and components. Supported Revit versions and property transfers vary by release version.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },

  scanEssentials: {
    eyebrow: 'MODEL WITH REAL-WORLD DATA',
    heading: 'Scan Essentials: Model Directly Over Point Clouds',
    description: 'Transform laser scan data into intelligent 3D models with Trimble Scan Essentials. Designed specifically for architects, heritage conservators, and interior contractors, Scan Essentials lets you import massive point clouds directly into the SketchUp viewport with zero lag.',
    formats: ['RWP (Trimble RealWorks)', 'LAS / LAZ (Airborne & Mobile LiDAR)', 'E57 (ASTM Industry Standard)', 'TZF (Trimble Laser Scanners)', 'PLY (Polygon File Format)'],
    inputSources: ['Terrestrial 3D Laser Scanners', 'Photogrammetry Point Clouds', 'Mobile Mapping & SLAM Systems', 'Airborne & Drone LiDAR Rigs', 'Handheld Optical Scanners'],
    keyHighlights: [
      {
        title: 'Precision Vertex Snapping',
        desc: 'Snap SketchUp line, arc, and rectangle tools directly to point cloud coordinate vertices to trace walls, beams, and columns with millimeter fidelity.',
        icon: 'Crosshair',
      },
      {
        title: 'Dynamic Clipping Boxes',
        desc: 'Slice thin horizontal and vertical cut planes through the cloud to isolate floor levels, ceiling plenums, or facade cross-sections without visual noise.',
        icon: 'Scissors',
      },
      {
        title: 'Color by Elevation & Normals',
        desc: 'Inspect surface deviations, structural sags, and wall tilts using color ramps mapped by Z-elevation, surface normals, or authentic RGB photos.',
        icon: 'Palette',
      },
      {
        title: 'Direct LayOut 2D Point Cloud Integration',
        desc: 'Embed point cloud slices directly into LayOut sheets for hybrid permit drawings that overlay as-built scans against proposed design plans.',
        icon: 'FileText',
      },
    ],
    disclaimer: 'Point-cloud scanning hardware (e.g., terrestrial scanners, drones, or handheld sensors) is sourced separately and is not bundled with the software subscription.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    cards: [
      { title: 'Import Point Clouds', desc: 'Seamlessly load high-density point clouds into SketchUp on Windows without choking system memory.', icon: 'UploadCloud' },
      { title: 'Inspect Real Conditions', desc: 'Measure true physical dimensions, check floor flatness, and uncover structural plumb irregularities.', icon: 'Search' },
      { title: 'Model with Accuracy', desc: 'Extrude walls, roofs, and joinery directly over the authentic point data with continuous geometric verification.', icon: 'Box' },
      { title: 'Document Deliverables', desc: 'Generate dimensioned as-built drawing packages and retrofit proposals in LayOut for construction permits.', icon: 'CheckSquare' },
    ],
  },

  pointCloudWorkflow: [
    {
      stepNumber: '01',
      title: 'Reality Capture & Scan',
      shortTitle: 'Capture',
      subtitle: 'Collect Existing Physical Conditions',
      description: 'Capture building interiors, heritage facades, or terrain topography using terrestrial laser scanners (Trimble, Faro, Leica), handheld scanners (3DeVOK, EinScan), or drone LiDAR.',
      tools: ['3D Laser Scanners', 'LiDAR Sensors', 'Photogrammetry Rigs'],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: 'Field Survey',
    },
    {
      stepNumber: '02',
      title: 'Import into Scan Essentials',
      shortTitle: 'Import',
      subtitle: 'Load Clean Geospatial Clouds',
      description: 'Load E57, LAS/LAZ, TZF, or RWP point cloud files directly into the SketchUp Studio Windows environment with hardware-accelerated viewport rendering.',
      tools: ['Scan Essentials Extension', 'E57 Format', 'RWP Importer'],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      badge: 'Data Ingestion',
    },
    {
      stepNumber: '03',
      title: 'Inspect, Section & Measure',
      shortTitle: 'Inspect',
      subtitle: 'Analyze As-Built Geometry',
      description: 'Isolate specific floor levels using clipping boxes, inspect structural plumb, calculate clearances, and visualize elevation gradients using custom color maps.',
      tools: ['Clipping Box Tools', 'Measure Tape', 'Elevation Colorizer'],
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
      badge: 'Verification',
    },
    {
      stepNumber: '04',
      title: 'Model Over Real Data',
      shortTitle: 'Model',
      subtitle: 'Author As-Built 3D Geometry',
      description: 'Use native SketchUp tools with active point snapping to draw walls, columns, slabs, and historic architectural trim matching the physical structure.',
      tools: ['SketchUp Desktop', 'Vertex Snapping', 'Dynamic Components'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: '3D Creation',
    },
    {
      stepNumber: '05',
      title: 'Document & Present',
      shortTitle: 'Deliver',
      subtitle: 'Publish Drawing Sets & Renderings',
      description: 'Export 2D dimensioned drawing sheets in LayOut combining vector lines and scan slices, then render marketing visualizations with V-Ray for SketchUp.',
      tools: ['LayOut 2D Sets', 'V-Ray Engine', 'Trimble Connect'],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      badge: 'Final Delivery',
    },
  ],

  revitImporter: {
    eyebrow: 'BIM INTEROPERABILITY',
    heading: 'Revit Importer: Bring Revit Models Into SketchUp',
    description: 'Break free from rigid BIM exchange workflows. The native Revit Importer included with SketchUp Studio converts Autodesk Revit (.RVT) project files into clean, lightweight SketchUp components with preserved family structures, materials, and level hierarchies.',
    features: [
      'Direct RVT File Ingestion: Open native Revit (.rvt) models directly in SketchUp Desktop without requiring a Revit license installed on your workstation.',
      'Preserved Family & Category Hierarchy: Revit families (walls, doors, windows, curtain walls, furniture) translate into organized SketchUp tags and component outliner trees.',
      'Optimized Geometry Cleaning: Automatic tessellation cleanup transforms dense BIM geometry into lightweight, fluid SketchUp solids ready for conceptual manipulation.',
      'Material & Texture Mapping: Preserves base colors, materials, and transparency values assigned in Revit for instant visual clarity.',
      'Effortless Design Iteration: Enable design teams to explore fresh conceptual directions, interior alterations, or massing alternatives far faster than in Revit.',
    ],
    limitationsNotice: 'Interoperability note: Revit Importer converts geometry and tag structure for design exploration and visualization. It is not intended as a bidirectional round-trip editor that preserves proprietary Revit parameters or parametric constraints.',
    steps: [
      { step: '01', title: 'Select RVT File', desc: 'Choose any compatible Revit project file directly from your local drive or Trimble Connect.' },
      { step: '02', title: 'Convert & Optimize', desc: 'The cloud-assisted engine parses families, cleans redundant polygons, and structures outliner tags.' },
      { step: '03', title: 'Refine in SketchUp', desc: 'Sculpt alternative design proposals, populate with 3D Warehouse furniture, and apply custom finishes.' },
      { step: '04', title: 'Present in V-Ray', desc: 'Produce high-end photorealistic client presentations and interactive walkthroughs.' },
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  },

  vraySection: {
    eyebrow: 'PHOTOREALISTIC VISUALIZATION',
    heading: 'V-Ray for SketchUp: Render Without Compromise',
    description: 'SketchUp Studio includes V-Ray for SketchUp, the world’s leading photorealistic rendering engine trusted by premier architectural visualization studios. Transform your SketchUp models into photorealistic still imagery, interior daylight studies, nocturnal mood boards, and immersive 360° panoramas.',
    features: [
      'Physically-Based Ray Tracing: True-to-life calculation of natural daylight, sun angles, indirect light bounces, and artificial lighting fixtures.',
      'V-Ray Frame Buffer (VFB): Integrated image post-processing suite with Light Mix for altering lighting colors and intensities after rendering finishes.',
      'Chaos Cosmos Library: Access thousands of high-poly 3D models (furniture, vegetation, lighting, people) and render-ready PBR materials directly inside SketchUp.',
      'Real-Time & Interactive Rendering: Fast viewport feedback via V-Ray Vision and interactive rendering to tweak cameras and materials in real time.',
      'Scatter & Proxy Management: Populate expansive terrains, forests, and grassy lawns using Chaos Scatter without exhausting system RAM.',
      '360° Virtual Reality Panoramas: Output interactive stereo panoramas for client walkthroughs on mobile devices or VR headsets.',
    ],
    lightingAndMaterials: [
      { title: 'Photorealistic PBR Materials', desc: 'Physically based shaders for architectural glass, polished concrete, brushed metals, woven fabrics, and wood veneers.', icon: 'Layers' },
      { title: 'Dynamic Sun & Sky Systems', desc: 'Geolocate your SketchUp model to simulate accurate seasonal daylight, golden hour warmth, and twilight skies.', icon: 'Sun' },
      { title: 'Artificial Fixtures & IES Profiles', desc: 'Place spotlights, linear LEDs, mesh lights, and realistic manufacturer IES photometric lighting files.', icon: 'Lightbulb' },
      { title: 'Atmospheric Fog & Volumetrics', desc: 'Add subtle morning haze, dust motes, and volumetric sun rays piercing through skylights.', icon: 'Cloud' },
      { title: 'Real-Time Light Mix', desc: 'Fine-tune individual light bulb colors and brightness sliders inside the VFB without re-rendering the scene.', icon: 'Sliders' },
      { title: 'Architectural Camera Controls', desc: 'Emulate real-world DSLR lenses with depth of field, two-point perspective correction, and motion blur.', icon: 'Camera' },
    ],
    animationFeatures: [
      'Kinetic Camera Walkthroughs: Animate camera paths through your SketchUp model with smooth bezier transitions.',
      'Sun Study Animations: Render solar shadows traversing building facades across different hours of the day.',
      'Interactive 360° Panoramas: Export web-ready interactive spheres for VR and immersive tablet presentations.',
    ],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    disclaimer: 'V-Ray for SketchUp included with Studio is licensed specifically for use within SketchUp on Windows workstations during an active subscription period.',
  },

  includedTools: [
    {
      id: 'desktop',
      name: 'SketchUp for Desktop',
      category: 'core',
      categoryLabel: 'Core Modeling',
      tagline: 'The Definitive Desktop 3D Modeler',
      description: 'The full-featured Windows desktop application for building precise 3D geometry, custom assemblies, massing schemes, and dynamic components.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['Unrestricted 3D modeling', 'Solid tools & boolean operations', 'Dynamic components', 'Ruby extension support'],
      iconName: 'Box',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/sketchup-desktop',
    },
    {
      id: 'scan-essentials',
      name: 'Scan Essentials',
      category: 'reality',
      categoryLabel: 'Reality Capture',
      tagline: 'Point-Cloud Ingestion & Snapping',
      description: 'Integrated extension for importing, sectioning, and modeling directly over massive laser scan point clouds from terrestrial and mobile mapping systems.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['E57, LAS, LAZ, RWP, TZF support', 'Direct vertex snapping', 'Clipping box sectioning', 'LayOut 2D integration'],
      iconName: 'Scan',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/scan-essentials-sketchup',
    },
    {
      id: 'revit-importer',
      name: 'Revit Importer',
      category: 'interop',
      categoryLabel: 'BIM Interoperability',
      tagline: 'Frictionless RVT to SketchUp Conversion',
      description: 'Converts native Autodesk Revit project files into clean SketchUp components without requiring an active Revit license on your machine.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['Native .RVT file ingestion', 'Preserved family structure', 'Tessellation cleanup', 'Material & color mapping'],
      iconName: 'Repeat',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/revit-importer',
    },
    {
      id: 'vray',
      name: 'V-Ray for SketchUp',
      category: 'rendering',
      categoryLabel: 'Photorealistic Rendering',
      tagline: 'World-Class Ray-Tracing Engine',
      description: 'Full-featured photorealistic rendering suite with physically based lighting, materials, Chaos Cosmos assets, and Light Mix post-processing.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['Ray-traced photorealism', 'Chaos Cosmos 3D library', 'V-Ray Frame Buffer & Light Mix', '360° panoramas & animations'],
      iconName: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://www.chaos.com/vray/sketchup',
    },
    {
      id: 'layout',
      name: 'LayOut',
      category: 'core',
      categoryLabel: '2D Documentation',
      tagline: '2D Construction Documents from 3D Models',
      description: 'Transform 3D SketchUp models into dimensioned construction drawings, permit sets, presentation boards, and client contract documents.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['Live dynamic model viewports', 'Dimensioning & callouts', 'Vector & hybrid rendering', 'DWG & PDF exports'],
      iconName: 'FileText',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/layout',
    },
    {
      id: 'trimble-connect',
      name: 'Trimble Connect Business',
      category: 'ecosystem',
      categoryLabel: 'Cloud Collaboration',
      tagline: 'Unlimited Cloud Storage & Coordination',
      description: 'Enterprise cloud collaboration hub for sharing 3D models, tracking revision history, reviewing markups, and managing multi-user permissions.',
      inclusionStatus: 'Cloud Service Included',
      platform: 'Cloud Browser',
      features: ['Unlimited cloud storage', 'Unlimited active projects', 'BIM clash review tools', 'Role-based access controls'],
      iconName: 'Cloud',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://connect.trimble.com/',
    },
    {
      id: '3d-warehouse',
      name: '3D Warehouse (Unlimited)',
      category: 'ecosystem',
      categoryLabel: 'Asset Repository',
      tagline: 'World’s Largest Pre-Built 3D Library',
      description: 'Browse, search, and download millions of manufacturer-verified 3D components, furniture items, fixtures, building materials, and entourage.',
      inclusionStatus: 'Included in Studio',
      platform: 'Desktop & Mobile',
      features: ['Millions of 3D models', 'Manufacturer-certified objects', 'AI image search', 'Direct viewport drag-and-drop'],
      iconName: 'Database',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://3dwarehouse.sketchup.com/',
    },
    {
      id: 'extension-warehouse',
      name: 'Extension Warehouse',
      category: 'ecosystem',
      categoryLabel: 'Customization',
      tagline: 'Hundreds of Workflow Extensions',
      description: 'Access hundreds of third-party plugins and scripts for parametric modeling, structural analysis, energy estimation, and rendering engines.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['One-click extension install', 'Parametric modeling tools', 'Custom script execution', 'Category browsing'],
      iconName: 'Puzzle',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://extensions.sketchup.com/',
    },
    {
      id: 'web-ipad',
      name: 'SketchUp for Web & iPad',
      category: 'core',
      categoryLabel: 'Mobile & Web',
      tagline: 'Design On-Site & in Any Web Browser',
      description: 'Access your 3D models on job sites or client meetings using touch and Apple Pencil on iPad, or directly in web browsers on Chromebooks and laptops.',
      inclusionStatus: 'Included (Web/Mobile)',
      platform: 'Web & iPad',
      features: ['Apple Pencil markup', 'LiDAR room capture on iPad', 'Browser-based modeling', 'Cloud synchronization'],
      iconName: 'Tablet',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/sketchup-ipad',
    },
    {
      id: 'analysis-hub',
      name: 'Analysis Hub (Daylight Simulation)',
      category: 'interop',
      categoryLabel: 'Environmental Design',
      tagline: 'Rapid Daylight Simulation',
      description: 'Perform early-stage daylight simulations directly inside SketchUp to optimize natural illumination, window placement, and shading devices.',
      inclusionStatus: 'Included in Studio',
      platform: 'Windows Desktop',
      features: ['Sunlight hour calculations', 'Daylight factor analysis', 'Visual heat maps', 'Early design exploration'],
      iconName: 'Sun',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/',
    },
    {
      id: 'site-contractor',
      name: 'Site Contractor Workflows',
      category: 'reality',
      categoryLabel: 'Field Execution',
      tagline: 'Connect Design to Machine Control',
      description: 'Transfer 3D SketchUp site geometry and grading surfaces into Trimble Siteworks for construction field stakeout and earthwork machine control.',
      inclusionStatus: 'Separate License/Hardware',
      platform: 'Windows Desktop',
      features: ['Siteworks data export', 'Earthwork surface transfer', 'Field stakeout prep', 'Machine control alignment'],
      iconName: 'Truck',
      image: '/images/software/sections/aec-construction.jpg',
      officialDocUrl: 'https://construction.trimble.com/',
    },
    {
      id: 'sketchup-ai',
      name: 'SketchUp AI Diffusion',
      category: 'rendering',
      categoryLabel: 'Generative AI',
      tagline: 'AI-Assisted Concept Visualization',
      description: 'Generate photorealistic conceptual variations and material iterations in seconds from raw SketchUp viewport views using text prompts.',
      inclusionStatus: 'Included in Studio',
      platform: 'Desktop & Mobile',
      features: ['Prompt-based stylization', 'Concept mood ideation', 'Material style iterations', 'Rapid ideation boards'],
      iconName: 'Wand2',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      officialDocUrl: 'https://help.sketchup.com/en/ai-diffusion',
    },
  ],

  ecosystemTabs: [
    {
      id: 'create',
      label: 'CREATE',
      headline: 'Model from Real Conditions with Intuitive 3D Speed',
      description: 'Harness the full power of SketchUp for Desktop paired with Scan Essentials and Revit Importer. Bring real-world laser scans or existing BIM models directly into your canvas, sculpting custom architectural concepts with unmatched speed and direct vertex snapping.',
      tools: ['SketchUp Desktop (Windows)', 'Scan Essentials (Point Clouds)', 'Revit Importer (.rvt Ingestion)', '3D Warehouse & Extensions'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'visualize',
      label: 'VISUALIZE',
      headline: 'Elevate Designs with Photorealistic V-Ray Quality',
      description: 'Transform conceptual massing models into breathtaking marketing presentations and client walkthroughs. V-Ray for SketchUp brings physically accurate lighting, sun simulations, Chaos Cosmos curated furnishings, and post-render Light Mix tuning directly to your viewport.',
      tools: ['V-Ray 6 for SketchUp', 'Chaos Cosmos 3D Library', 'V-Ray Frame Buffer (VFB)', '360° Panoramas & Sun Studies'],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'collaborate',
      label: 'COLLABORATE',
      headline: 'Keep Teams, Clients & Job Sites Connected',
      description: 'Share 3D models with project stakeholders via Trimble Connect with unlimited cloud storage. Prepare scaled 2D permit drawings in LayOut, and review design markups with clients on iPad or mobile devices right on the construction site.',
      tools: ['Trimble Connect Business (Unlimited)', 'LayOut 2D Drawing Sets', 'SketchUp for iPad & Web', 'BIM Clash & Markups'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  industries: [
    {
      id: 'architecture',
      title: 'Architecture & Design-Build',
      subtitle: 'Conceptual Massing, Client Visuals & Permit Sets',
      description: 'Architectural practices leverage Studio to rapidly test massing schemes, incorporate laser-scanned site context, present photo-real visuals to approval boards, and author complete LayOut permit drawings.',
      toolTags: ['SketchUp Desktop', 'Scan Essentials', 'V-Ray', 'LayOut'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Conceptual proposals', 'Full permit sets', 'Photorealistic renderings', 'BIM coordinate models'],
    },
    {
      id: 'interior',
      title: 'Interior Architecture & Fit-Out',
      subtitle: 'Millwork Detailing, Lighting & Material Moods',
      description: 'Interior designers capture exact existing room dimensions with laser scans, model bespoke joinery, test PBR fabric and wood finishes in V-Ray, and present interactive 360° panoramas to clients.',
      toolTags: ['3D Warehouse', 'V-Ray Materials', 'Light Mix', 'iPad LiDAR'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Detailed millwork drawings', 'Lighting schedules', '360° VR panoramas', 'Material moodboards'],
    },
    {
      id: 'renovation',
      title: 'Renovation & Heritage Conservation',
      subtitle: 'As-Built Reality Capture & Adaptive Reuse',
      description: 'Heritage architects and retrofit specialists import millimeter-precise point clouds into Scan Essentials, tracing historic facades and internal structural timbers to model accurate as-built conditions.',
      toolTags: ['Scan Essentials', 'E57 Clouds', 'LayOut 2D Overlay', 'Clipping Boxes'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      deliverables: ['As-built BIM geometry', 'Historic facade elevations', 'Deviation heatmaps', 'Demolition vs New drawing sets'],
    },
    {
      id: 'construction',
      title: 'Construction & Virtual Design (VDC)',
      subtitle: 'Field Coordination, Submittals & Earthwork',
      description: 'General contractors align design intent with field reality, resolving spatial trade clashes with Trimble Connect, generating 4D sequence snapshots, and transferring surfaces into Trimble Siteworks.',
      toolTags: ['Revit Importer', 'Trimble Connect', 'Site Contractor', 'LayOut'],
      image: '/images/software/sections/scan-verify.jpg',
      deliverables: ['Subcontractor trade coordination', 'Site logistics plans', 'Earthwork grading surfaces', 'RFI 3D attachments'],
    },
    {
      id: 'landscape',
      title: 'Landscape Architecture & Urban Planning',
      subtitle: 'Topography Modeling, Sun Studies & Context',
      description: 'Landscape teams model organic terrain from aerial drone LiDAR point clouds, place thousands of high-poly trees with Chaos Cosmos, and simulate solar shadow trajectories across seasons.',
      toolTags: ['Drone LiDAR', 'Scan Essentials', 'Chaos Cosmos', 'Sun & Sky'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Site grading plans', 'Seasonal solar studies', 'Lush photorealistic planting views', 'Public consultation boards'],
    },
    {
      id: 'bim-interop',
      title: 'BIM Interoperability & Coordination',
      subtitle: 'Revit to SketchUp Translation for Design Teams',
      description: 'Multidisciplinary engineering and architectural teams convert complex RVT structures into intuitive SketchUp geometry to speed up design reviews and executive decision-making.',
      toolTags: ['Revit Importer', 'Trimble Connect', 'IFC Export', 'LayOut'],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      deliverables: ['Coordinated SketchUp models', 'Design review mockups', 'Lightweight client presentations', 'Coordinated IFC files'],
    },
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'Modern Minimalist Cantilever Residence',
      category: 'rendering',
      categoryLabel: 'Photorealistic V-Ray Render',
      caption: 'Full exterior architectural rendering created with SketchUp Desktop geometry and rendered in V-Ray 6 with dynamic Sun & Sky.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Modern architectural home rendered with V-Ray for SketchUp',
      attribution: 'Rendered in V-Ray for SketchUp',
    },
    {
      id: 'gal-2',
      title: 'Luxury Double-Height Living Space',
      category: 'interior',
      categoryLabel: 'Interior Visualization',
      caption: 'Sophisticated interior visualization with Chaos Cosmos furniture, PBR brushed brass, and natural daylight bounced through floor-to-ceiling glass.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      alt: 'Luxury contemporary living room rendered with V-Ray for SketchUp',
      attribution: 'Chaos Cosmos & V-Ray Shaders',
    },
    {
      id: 'gal-3',
      title: 'Heritage Facade Reality Capture & Modeling',
      category: 'pointcloud',
      categoryLabel: 'Scan Essentials Point Cloud',
      caption: 'Terrestrial laser scan point cloud imported via Scan Essentials with active vertex snapping to trace historic stone ornamentation.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85',
      alt: 'Point cloud reality capture slice inside SketchUp Scan Essentials',
      attribution: 'Scan Essentials Point Cloud Workflow',
    },
    {
      id: 'gal-4',
      title: 'Revit Model Ingestion & Exterior Iteration',
      category: 'revit',
      categoryLabel: 'Revit Importer Interoperability',
      caption: 'Autodesk Revit structural core imported directly into SketchUp using Revit Importer for rapid exterior skin and facade testing.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85',
      alt: 'Revit to SketchUp model conversion showcase',
      attribution: 'Trimble Revit Importer',
    },
    {
      id: 'gal-5',
      title: 'Nocturnal Architectural Mood with Light Mix',
      category: 'rendering',
      categoryLabel: 'V-Ray Light Mix',
      caption: 'Evening architectural rendering with IES interior downlights and warm landscape illumination balanced interactively using the V-Ray Frame Buffer.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
      alt: 'Nocturnal architectural render with V-Ray Light Mix',
      attribution: 'V-Ray Frame Buffer Post-Processing',
    },
    {
      id: 'gal-6',
      title: 'Modern Organic Villa in Forest Setting',
      category: 'landscape',
      categoryLabel: 'Landscape & Architecture',
      caption: 'Detailed terrain massing combined with Chaos Scatter vegetation and realistic atmospheric fog for natural forest context.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
      alt: 'Architectural villa surrounded by dense landscape forest',
      attribution: 'Chaos Scatter & Environment Fog',
    },
  ],

  plans: [
    {
      id: 'sketchup-go',
      name: 'SketchUp Go',
      tagline: 'Essential 3D design on iPad and web',
      positioning: 'Designed for on-the-go designers, students, and light conceptual modelers.',
      description: 'Access lightweight 3D modeling directly in modern web browsers and touch-optimized iPad apps with cloud project sync.',
      platform: 'Web & iPad',
      licensingType: 'Named-User Annual Subscription',
      billing: 'Billed annually per user',
      targetUsers: 'Field supervisors, casual modelers, students, interior consultants',
      features: [
        'SketchUp for Web (browser-based 3D modeling)',
        'SketchUp for iPad with Apple Pencil support',
        'Unlimited Trimble Connect cloud storage',
        'Standard 3D Warehouse model access',
        'Mobile augmented reality (AR) model viewing',
      ],
      officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing',
      lastVerified: 'Official Trimble Pricing Matrix',
    },
    {
      id: 'sketchup-pro',
      name: 'SketchUp Pro',
      tagline: 'The professional design toolkit',
      positioning: 'The industry-standard desktop modeler for architectural and commercial design.',
      description: 'Equips designers with the full Windows/macOS desktop application, LayOut 2D documentation, and Extension Warehouse access.',
      platform: 'Windows & macOS Desktop',
      licensingType: 'Named-User Annual Subscription',
      billing: 'Billed annually per user',
      targetUsers: 'Architects, interior designers, commercial 3D modelers, woodworkers',
      features: [
        'Full SketchUp Desktop modeling environment',
        'LayOut for dimensioned 2D construction drawings',
        'PreDesign climate & environmental insights',
        'Access to Extension Warehouse & custom Ruby scripts',
        'Includes all SketchUp Go web & iPad entitlements',
      ],
      officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing',
      lastVerified: 'Official Trimble Pricing Matrix',
    },
    {
      id: 'sketchup-studio',
      name: 'SketchUp Studio',
      popular: true,
      tagline: 'Advanced visualization and BIM workflows',
      positioning: 'The ultimate Windows-only architectural suite combining reality capture, Revit interoperability, and V-Ray rendering.',
      description: 'Empowers advanced design teams with Scan Essentials point-cloud modeling, Revit Importer, V-Ray photorealistic rendering, and Pro capabilities in a single bundle.',
      platform: 'Windows OS Exclusive',
      licensingType: 'Named-User Annual Subscription',
      billing: 'Billed annually per user',
      targetUsers: 'Architecture firms, BIM specialists, visualization studios, design-build contractors',
      features: [
        'All SketchUp Pro & LayOut capabilities included',
        'Scan Essentials for point-cloud reality capture modeling (E57, LAS, LAZ, RWP)',
        'Revit Importer to bring native .RVT files directly into SketchUp',
        'V-Ray 6 for SketchUp photorealistic rendering engine',
        'Chaos Cosmos 3D curated asset library & PBR shaders',
        'V-Ray Frame Buffer with real-time Light Mix tuning',
        '360° virtual reality panoramas and camera walkthrough animations',
        'Analysis Hub for daylight simulation in early conceptual design',
        'Site Contractor workflows to transfer geometry into Trimble Siteworks',
        'SketchUp AI Diffusion concept visualization tools',
        'Unlimited Trimble Connect Business cloud storage and coordination',
        'Priority technical support and continuous software updates',
      ],
      officialUrl: 'https://sketchup.trimble.com/en/plans-and-pricing/sketchup-studio',
      lastVerified: 'Official Trimble Pricing Matrix',
    },
  ],

  systemRequirements: [
    {
      category: 'Operating System',
      minimum: 'Windows 10 64-bit (version 21H2 or later)',
      recommended: 'Windows 11 64-bit (latest official update)',
      notes: 'SketchUp Studio is officially offered as a Windows-only subscription bundle. (Mac users can run SketchUp Pro separately, but Scan Essentials, Revit Importer, and Studio V-Ray require Windows).',
    },
    {
      category: 'Processor (CPU)',
      minimum: '2.1+ GHz Intel Core or AMD multi-core processor',
      recommended: '3.0+ GHz Intel Core i7 / i9 (13th/14th Gen) or AMD Ryzen 7 / 9',
      notes: 'High single-core clock speeds accelerate SketchUp viewport modeling, while high core counts benefit V-Ray CPU rendering and point-cloud parsing.',
    },
    {
      category: 'System Memory (RAM)',
      minimum: '8 GB RAM',
      recommended: '32 GB or 64 GB RAM for large point clouds & complex scenes',
      notes: 'High-density point clouds with tens of millions of scan points and V-Ray rendering benefit significantly from 32GB+ RAM.',
    },
    {
      category: 'Graphics Card (GPU)',
      minimum: 'NVIDIA or AMD graphics card with 2 GB VRAM and DirectX 11 / OpenGL 3.1 support',
      recommended: 'NVIDIA GeForce RTX 4070 / 4080 / 4090 or RTX A4000/A5000 with 12GB+ VRAM',
      notes: 'Dedicated NVIDIA RTX GPU is strongly recommended for hardware-accelerated V-Ray GPU ray-tracing, AI denoising, and Scan Essentials viewport display.',
    },
    {
      category: 'Storage & Drive',
      minimum: '2 GB available hard-disk space for basic installation',
      recommended: '1 TB+ High-Speed NVMe M.2 SSD for point-cloud datasets & asset caches',
      notes: 'High-speed SSD drives drastically reduce point cloud loading times and texture streaming during rendering.',
    },
    {
      category: 'Display & Input',
      minimum: '1920 × 1080 display resolution',
      recommended: '2560 × 1440 (2K) or 3840 × 2160 (4K) IPS display',
      notes: 'Three-button scroll wheel mouse is required. Multi-monitor setups supported.',
    },
    {
      category: 'Internet & Licensing',
      minimum: 'Active broadband internet connection',
      recommended: 'High-speed broadband for Trimble Connect cloud sync and Chaos Cosmos streaming',
      notes: 'Internet required for license sign-in, initial activation, 3D Warehouse access, and cloud updates.',
    },
  ],

  faqs: [
    {
      category: 'general',
      q: 'What is SketchUp Studio?',
      a: 'SketchUp Studio is Trimble’s premier, advanced subscription bundle tailored for architects, BIM modelers, and visualization professionals. It combines the familiar SketchUp Desktop modeler with specialized professional tools: Scan Essentials for point-cloud reality capture, Revit Importer for direct .RVT model conversion, and V-Ray for SketchUp for high-end photorealistic rendering.',
    },
    {
      category: 'general',
      q: 'Who is SketchUp Studio designed for?',
      a: 'SketchUp Studio is engineered for architectural practices, interior design studios, design-build contractors, renovation and heritage conservation specialists, and visualization artists who need to bridge conceptual modeling with real-world survey scans, Revit files, and marketing-grade renders.',
    },
    {
      category: 'technical',
      q: 'Is SketchUp Studio Windows-only?',
      a: 'Yes. The current official SketchUp Studio subscription is offered exclusively for Windows operating systems. While core SketchUp Pro runs on both macOS and Windows, key bundled Studio extensions—specifically Scan Essentials, Revit Importer, and the bundled V-Ray Studio installation—are developed natively for Windows.',
    },
    {
      category: 'pointcloud',
      q: 'What is Scan Essentials and can I model directly from point clouds?',
      a: 'Scan Essentials is a specialized SketchUp extension included with Studio that allows you to import massive 3D point clouds directly into SketchUp. You can inspect existing building conditions, slice custom clipping boxes, and snap native SketchUp drawing tools (lines, arcs, rectangles) directly to laser scan points to model existing buildings with millimeter precision.',
    },
    {
      category: 'pointcloud',
      q: 'What point-cloud file formats are supported by Scan Essentials?',
      a: 'Scan Essentials officially supports major industry reality capture formats including E57 (ASTM industry standard), LAS and LAZ (aerial and mobile LiDAR), TZF (Trimble laser scanner raw format), RWP (Trimble RealWorks projects), and PLY files.',
    },
    {
      category: 'pointcloud',
      q: 'Does SketchUp Studio include a 3D laser scanner?',
      a: 'No. SketchUp Studio is a software subscription and does not include hardware. Users acquire their point-cloud scans from terrestrial laser scanners (such as Trimble, Faro, or Leica), handheld optical/laser scanners (such as 3DeVOK or EinScan), or drone LiDAR surveys.',
    },
    {
      category: 'revit',
      q: 'What is the Revit Importer and does it provide bidirectional synchronization?',
      a: 'The Revit Importer is a native SketchUp Studio feature that converts Autodesk Revit (.RVT) project files directly into clean SketchUp components, maintaining family groupings, layers/tags, and material assignments without requiring Revit to be installed. Note: It is an import pipeline designed for design iteration and visualization, not a full bidirectional synchronization back to Revit.',
    },
    {
      category: 'vray',
      q: 'What is V-Ray for SketchUp and what rendering capabilities are included?',
      a: 'V-Ray for SketchUp is Chaos’s industry-standard photorealistic ray-tracing engine included with the Studio subscription. It provides physically accurate lighting, material shaders, the Chaos Cosmos 3D library (thousands of render-ready assets), the V-Ray Frame Buffer with real-time Light Mix, interactive viewport rendering, and tools for rendering still imagery, sun studies, animations, and 360° VR panoramas.',
    },
    {
      category: 'vray',
      q: 'Can I create animations and 360° panoramas with SketchUp Studio?',
      a: 'Yes. With V-Ray for SketchUp included in Studio, you can animate smooth camera walkthrough paths across your 3D model, render solar shadow study animations across time of day, and export interactive 360° spherical panoramas for mobile, web, and VR headsets.',
    },
    {
      category: 'general',
      q: 'Does SketchUp Studio include LayOut?',
      a: 'Yes. LayOut is included as part of the core Pro capabilities bundled with Studio. LayOut lets you create scaled 2D permit drawings, construction sets, detail sheets, and presentation packages linked dynamically to your 3D SketchUp models and Scan Essentials point cloud slices.',
    },
    {
      category: 'general',
      q: 'Does Studio include Trimble Connect, 3D Warehouse, and Extension Warehouse?',
      a: 'Yes. Studio includes Trimble Connect Business with unlimited cloud storage and unlimited projects. It also includes unrestricted access to Trimble’s 3D Warehouse for pre-built manufacturer models and the Extension Warehouse for third-party workflow plugins.',
    },
    {
      category: 'technical',
      q: 'Is Site Contractor included in SketchUp Studio?',
      a: 'SketchUp Studio includes Site Contractor tools to export SketchUp terrain geometry and grading surfaces for use in Trimble Siteworks. Note: Field hardware (such as Trimble field controllers, GPS rovers) and Siteworks field software licenses are licensed separately.',
    },
    {
      category: 'technical',
      q: 'Does Studio include SketchUp AI Diffusion?',
      a: 'Yes. SketchUp Studio grants access to supported SketchUp AI Diffusion features, which enable prompt-assisted concept ideation and stylistic visual generations directly from your active 3D viewport.',
    },
    {
      category: 'licensing',
      q: 'How is SketchUp Studio licensed and billed?',
      a: 'SketchUp Studio is offered as an annual named-user commercial subscription managed via the Trimble Account Management portal. Each license is assigned to an individual user’s Trimble ID (email address). Regional licensing terms vary by country and taxes; contact Leniva CAD Solutions for current official commercial quotes in India.',
    },
    {
      category: 'licensing',
      q: 'Is SketchUp Studio suitable for students and universities?',
      a: 'Yes. Trimble offers special higher-education student and institutional lab licensing for SketchUp Studio. Educational institutions and enrolled students can contact Leniva CAD Solutions to verify eligibility and educational discounts.',
    },
    {
      category: 'technical',
      q: 'Where can I get technical support and onboarding for SketchUp Studio?',
      a: 'As an authorized CAD/CAM and 3D visualization solutions partner, Leniva CAD Solutions provides dedicated implementation support, software onboarding, interactive workshops, and assistance with point-cloud and V-Ray workflows, backed by official Trimble Help Center and Chaos documentation.',
    },
  ],

  learningResources: [
    {
      title: 'Trimble SketchUp Help Center',
      type: 'Official Documentation',
      description: 'Comprehensive guides, keyboard shortcut references, and modeling best practices.',
      link: 'https://help.sketchup.com/',
      badge: 'Official Guide',
    },
    {
      title: 'Scan Essentials User Guide',
      type: 'Technical Manual',
      description: 'Deep dive into point-cloud imports, coordinate snapping, clipping boxes, and LayOut integration.',
      link: 'https://help.sketchup.com/en/scan-essentials-sketchup',
      badge: 'Point Cloud Guide',
    },
    {
      title: 'V-Ray for SketchUp Resource Center',
      type: 'Rendering Tutorials',
      description: 'Chaos tutorials covering realistic PBR materials, Sun & Sky systems, Light Mix, and Chaos Cosmos.',
      link: 'https://www.chaos.com/vray/sketchup',
      badge: 'Chaos V-Ray',
    },
    {
      title: 'Trimble Connect Knowledge Base',
      type: 'Cloud Coordination',
      description: 'Learn how to set up project permissions, manage revisions, and coordinate multi-disciplinary BIM files.',
      link: 'https://connect.trimble.com/',
      badge: 'Cloud Collaboration',
    },
  ],
}
