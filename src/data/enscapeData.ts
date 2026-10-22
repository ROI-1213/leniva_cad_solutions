export interface EnscapePlan {
  id: string
  name: string
  tagline: string
  description: string
  popular?: boolean
  features: string[]
  assetAllowance: string
  aiAllowance: string
  targetUsers: string
  officialUrl: string
  lastVerified: string
}

export interface EnscapeIntegration {
  id: string
  name: string
  logoBadge: string
  description: string
  supportedVersions: string
  keyAdvantage: string
  image: string
}

export interface EnscapeFeatureCard {
  id: string
  title: string
  eyebrow: string
  description: string
  iconName: string
  image: string
  tag: string
  linkTarget: string
}

export interface EnscapeGalleryItem {
  id: string
  title: string
  category: 'residential' | 'interior' | 'commercial' | 'hospitality' | 'landscape' | 'night'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  author?: string
}

export interface EnscapeApplication {
  id: string
  title: string
  description: string
  iconName: string
  deliverables: string[]
  image: string
}

export interface EnscapeFaq {
  q: string
  a: string
  category?: string
}

export interface EnscapeCmsData {
  seo: {
    title: string
    description: string
    canonical: string
  }
  hero: {
    eyebrow: string
    h1: string
    h1Highlight: string
    supportingHeadline: string
    description: string
    officialUrl: string
    trialUrl: string
    pricingUrl: string
    heroImage: string
    heroSecondaryImage: string
    stats: { label: string; value: string; note: string }[]
  }
  intro: {
    eyebrow: string
    heading: string
    description: string
    subDescription: string
    image: string
  }
  whyEnscape: {
    heading: string
    description: string
    cards: {
      title: string
      subtitle: string
      description: string
      iconName: string
      image: string
      linkAnchor: string
    }[]
  }
  walkthrough: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    image: string
  }
  liveSync: {
    eyebrow: string
    heading: string
    description: string
    steps: {
      number: string
      title: string
      description: string
      tag: string
    }[]
  }
  integrations: EnscapeIntegration[]
  virtualReality: {
    eyebrow: string
    heading: string
    description: string
    features: string[]
    image: string
    headsets: string[]
  }
  exports: {
    eyebrow: string
    heading: string
    description: string
    items: {
      title: string
      description: string
      badge: string
      iconName: string
    }[]
  }
  assetsAndMaterials: {
    eyebrow: string
    heading: string
    description: string
    categories: { name: string; count: string; desc: string }[]
    image: string
  }
  aiCreation: {
    eyebrow: string
    heading: string
    description: string
    disclaimer: string
    cards: {
      title: string
      tech: string
      description: string
      status: string
    }[]
  }
  cloudCollaboration: {
    eyebrow: string
    heading: string
    description: string
    cards: {
      title: string
      description: string
      iconName: string
    }[]
  }
  workflow: {
    heading: string
    description: string
    steps: {
      step: string
      title: string
      description: string
    }[]
  }
  applications: EnscapeApplication[]
  gallery: EnscapeGalleryItem[]
  presentationSection: {
    heading: string
    description: string
    benefits: string[]
    image: string
  }
  plans: EnscapePlan[]
  systemRequirements: {
    heading: string
    description: string
    minOS: string
    recommendedOS: string
    supportedHosts: string
    minGPU: string
    recommendedGPU: string
    minRAM: string
    vrRequirements: string
    officialDocUrl: string
  }
  faqs: EnscapeFaq[]
}

export const enscapeData: EnscapeCmsData = {
  seo: {
    title: 'Chaos Enscape Real-Time Rendering & VR Software | Leniva CAD Solutions',
    description:
      'Experience Chaos Enscape: real-time rendering, live synchronization, and virtual reality for Revit, SketchUp, Rhino, Archicad, and Vectorworks. Genuine licenses, enterprise onboarding & consultation from Leniva CAD Solutions.',
    canonical: 'https://lenivacadsolution.com/products/enscape',
  },
  hero: {
    eyebrow: 'CHAOS ENSCAPE | REAL-TIME RENDERING & VR',
    h1: 'Real-Time Rendering That Keeps Up With',
    h1Highlight: 'Your Ideas',
    supportingHeadline: 'Design, visualize, and present — all inside your design workflow.',
    description:
      'Enscape is a real-time visualization solution that connects directly with supported CAD and BIM applications. Explore your model in a fully rendered environment, see design changes as they happen, and communicate ideas through immersive walkthroughs, images, videos, and virtual reality.',
    officialUrl: 'https://www.chaos.com/enscape',
    trialUrl: 'https://www.chaos.com/enscape/trial',
    pricingUrl: 'https://www.chaos.com/enscape/buy-online',
    heroImage: '/images/software/enscape-3d.jpg',
    heroSecondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'CAD & BIM Platforms', value: '5+', note: 'Revit, SketchUp, Rhino, Archicad, Vectorworks' },
      { label: 'Architecture Firms', value: '50K+', note: 'Reported worldwide on official Chaos site' },
      { label: 'Architectural Renders', value: '1.2B+', note: 'Generated using Enscape engine' },
    ],
  },
  intro: {
    eyebrow: 'REAL-TIME VISUALIZATION',
    heading: 'Real-Time Visualization, Right Inside Your Design Tool',
    description:
      'Explore your design without leaving your supported CAD or BIM application. Enscape brings a fully rendered view directly into your active workspace, helping teams visualize concepts, evaluate design choices, and communicate ideas as the model develops.',
    subDescription:
      'Unlike disconnected offline renderers that require repetitive export workflows and geometry rebuilding, Enscape runs alongside your design tool with bi-directional synchronization. Every adjustment to daylight, materials, walls, and furnishings reflects instantaneously in the photorealistic window.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  whyEnscape: {
    heading: 'Built for the Way Architects and Designers Work',
    description:
      'Enscape supports visual exploration, design communication, and team collaboration throughout the entire architectural project lifecycle.',
    cards: [
      {
        title: 'Easy to Use',
        subtitle: 'Zero Steep Learning Curve',
        description:
          'Start visualizing directly from your supported CAD or BIM model with an interface intentionally designed for architects, interior designers, and spatial planners.',
        iconName: 'Zap',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'workflow',
      },
      {
        title: 'Real-Time Speed and Sync',
        subtitle: 'Instantaneous Feedback',
        description:
          'See design changes reflected in the visualization immediately without repeatedly exporting, re-triangulating, and rebuilding your project model.',
        iconName: 'RefreshCw',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'live-sync',
      },
      {
        title: 'Confident Presentations',
        subtitle: 'Immersive Storytelling',
        description:
          'Present architectural ideas compellingly using interactive walkthroughs, rendered images, 4K videos, 360° panoramas, and one-click VR experiences.',
        iconName: 'Maximize2',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'walkthrough',
      },
      {
        title: 'AI-Powered Creation',
        subtitle: 'Assisted Ideation',
        description:
          'Explore visual directions, generate realistic seamless materials, and enhance visual details using supported Chaos AI tools and Veras integrations.',
        iconName: 'Sparkles',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'ai-creation',
      },
      {
        title: 'Connected Collaboration',
        subtitle: 'Seamless Cloud Workspaces',
        description:
          'Share visualizations, standalone web models, and collect design approvals using supported Chaos Cloud collaboration workflows.',
        iconName: 'Users',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'cloud-collaboration',
      },
    ],
  },
  walkthrough: {
    eyebrow: 'EXPLORE EVERY ANGLE',
    heading: 'Experience Your Design in Real Time',
    description:
      "Navigate a fully rendered 3D representation of your project and explore the space from different viewpoints. Enscape's real-time technology allows users to experience their designs interactively while changes in the connected model can be reflected in the visualization.",
    highlights: [
      'Explore the project from any camera elevation or perspective',
      'Navigate interior spaces interactively with realistic physical collision',
      'Evaluate spatial proportions, ceiling heights, and sightlines',
      'Communicate design intent with real-time natural lighting & shadows',
      'Follow geometry, material, and entourage changes from the connected model',
      'Utilize supported performance-enhancement technologies including NVIDIA DLSS',
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  },
  liveSync: {
    eyebrow: 'DESIGN WITHOUT INTERRUPTION',
    heading: 'Your Model and Visualization, in Sync',
    description:
      'Enscape integrates with supported design tools to keep the model and rendered view connected. Changes to geometry and other supported design elements can be reflected in the visualization, helping users evaluate ideas without repetitive manual exports.',
    steps: [
      {
        number: '01',
        title: 'Design',
        description: 'Create or refine your project geometry, walls, and details in your supported CAD or BIM application.',
        tag: 'Host Application',
      },
      {
        number: '02',
        title: 'Visualize',
        description: 'Launch Enscape with a single click and explore the model rendered with real-time ray-traced lighting and shadows.',
        tag: 'Live Window',
      },
      {
        number: '03',
        title: 'Iterate',
        description: 'Make modifications in your CAD application and immediately review the synchronized updates in the Enscape viewport.',
        tag: 'Zero Export',
      },
    ],
  },
  integrations: [
    {
      id: 'revit',
      name: 'Autodesk Revit',
      logoBadge: 'BIM Workflow',
      description:
        'Visualize complex BIM models with live synchronization. Walk through building phases, inspect structural relationships, and conduct lighting studies directly within the Revit environment.',
      supportedVersions: 'Revit 2021, 2022, 2023, 2024, 2025',
      keyAdvantage: 'Native BIM material translation & phase filter visualization',
      image: '/images/software/sections/revit-integration.jpg',
    },
    {
      id: 'sketchup',
      name: 'Trimble SketchUp',
      logoBadge: 'Intuitive 3D',
      description:
        'Explore architectural and interior concepts with effortless ease. SketchUp components, tags, and material libraries link automatically to Enscape for photorealistic presentations.',
      supportedVersions: 'SketchUp 2021, 2022, 2023, 2024',
      keyAdvantage: 'Instantaneous synchronization and asset placement inside viewport',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rhino',
      name: 'McNeel Rhinoceros',
      logoBadge: 'Parametric Design',
      description:
        'Present and explore complex NURBS surfaces and Grasshopper parametric geometry with instant rendered visual feedback, customized textures, and environmental lighting.',
      supportedVersions: 'Rhino 7, Rhino 8 (Windows & macOS)',
      keyAdvantage: 'Parametric geometry visualization with Grasshopper definition support',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'archicad',
      name: 'Graphisoft Archicad',
      logoBadge: 'Architectural BIM',
      description:
        'Connect architectural design and visualization workflows seamlessly. Archicad surface settings, sunlight positions, and layered assemblies translate directly into photorealistic scenes.',
      supportedVersions: 'Archicad 24, 25, 26, 27',
      keyAdvantage: 'Direct translation of Archicad building materials & 3D cutaways',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'vectorworks',
      name: 'Vectorworks',
      logoBadge: 'Design & Stage',
      description:
        'Visualize supported architectural and entertainment design models through a connected rendering workflow. Evaluate spatial layouts and stage lighting configurations in real time.',
      supportedVersions: 'Vectorworks 2021, 2022, 2023, 2024 (Service Pack 1+)',
      keyAdvantage: 'Integrated spotlight and stage lighting fixture visualization',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    },
  ],
  virtualReality: {
    eyebrow: 'IMMERSIVE DESIGN REVIEW',
    heading: 'Step Inside Your Design Before It Is Built',
    description:
      'Explore supported Enscape projects in virtual reality to help clients and project teams experience a space at an authentic 1:1 human scale. With a compatible VR headset, users can walk or fly through a virtual representation of the design, discovering spatial nuances that 2D drawings cannot convey.',
    features: [
      'One-click VR activation directly from your CAD toolbar',
      'Realistic 1:1 human scale spatial perception',
      'Teleportation and free-flight walkthrough modes',
      'Real-time design iterations reflected inside headset',
      'Reduced client misunderstandings and faster project sign-off',
    ],
    headsets: ['Meta Quest 2, 3 & Pro (via Quest Link / Air Link)', 'HTC Vive Pro 2 & Cosmos', 'Valve Index', 'Windows Mixed Reality Headsets'],
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&q=80',
  },
  exports: {
    eyebrow: 'PRESENT YOUR VISION',
    heading: 'Turn Your Design Into Powerful Visual Content',
    description:
      'Create high-impact visual collateral to communicate your design clearly to clients, multidisciplinary project teams, and regulatory stakeholders.',
    items: [
      {
        title: 'High-Quality Image Export',
        description: 'Capture rendered still images up to 8K resolution for design presentations, client review meetings, and marketing portfolios.',
        badge: 'Up to 8K',
        iconName: 'Image',
      },
      {
        title: 'Cinematic Video Export',
        description: 'Keyframe dynamic camera paths and render smooth video walkthroughs that guide viewers naturally through your space.',
        badge: 'MP4 / 4K 60fps',
        iconName: 'Video',
      },
      {
        title: '360° Interactive Panoramas',
        description: 'Generate immersive panoramic tours that allow clients to pan and orbit freely around rendered spaces on mobile or desktop.',
        badge: 'Web & VR Ready',
        iconName: 'Compass',
      },
      {
        title: 'Batch Export Workflow',
        description: 'Queue and batch-render multiple saved views and camera positions simultaneously, saving hours during deadline pin-ups.',
        badge: 'Automated',
        iconName: 'Layers',
      },
      {
        title: 'Standalone Presentations',
        description: 'Generate executable (.exe) files or cloud-hosted web links that let clients navigate the 3D model without needing Enscape or CAD.',
        badge: 'Zero Install for Client',
        iconName: 'Share2',
      },
      {
        title: 'Alpha Channel Transparency',
        description: 'Export images with isolated alpha backgrounds for post-processing in Photoshop while preserving glass reflections and tint.',
        badge: 'Post-Production',
        iconName: 'Eye',
      },
      {
        title: 'QR Code Mobile Sharing',
        description: 'Embed scannable QR codes on 2D drawing sheets to let clients open 360° panoramas directly on their smartphones.',
        badge: 'On-Sheet Sharing',
        iconName: 'QrCode',
      },
    ],
  },
  assetsAndMaterials: {
    eyebrow: 'READY-TO-USE CONTENT',
    heading: 'Bring Your Scenes to Life With Built-In Content',
    description:
      'Enscape provides thousands of ready-to-use, photorealistic 3D assets and physically accurate PBR materials that help you add rich context without slowing down your modeling tool.',
    categories: [
      { name: 'Furniture & Decor', count: '2,500+ Assets', desc: 'Contemporary, luxury, Scandinavian, and commercial office furniture' },
      { name: 'Vegetation & Trees', count: '1,800+ Assets', desc: 'Botanically accurate trees, shrubs, indoor potted plants, and grasses' },
      { name: 'People & Entourage', count: '900+ Assets', desc: 'Diverse, naturally posed 3D characters in causal, business, and healthcare attire' },
      { name: 'Vehicles & Transport', count: '450+ Assets', desc: 'Electric cars, public transport, bicycles, and commercial transport vehicles' },
      { name: 'Lighting Fixtures', count: '600+ Assets', desc: 'Architectural downlights, pendants, wall sconces with accurate IES profiles' },
      { name: 'Physically Based Materials', count: '850+ PBR Materials', desc: 'Photorealistic woods, metals, stones, fabrics, tiles, and concrete finishes' },
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  aiCreation: {
    eyebrow: 'AI-ASSISTED DESIGN WORKFLOW',
    heading: 'Explore Ideas and Enhance Visuals With AI',
    description:
      'Supported Chaos AI tools help architectural designers explore visual directions, create custom materials, and enhance scene elements while maintaining full control of design intent.',
    disclaimer:
      'Note: Veras integration and AI features availability depend on the applicable Enscape license plan or Chaos collection. AI capabilities and credit allowances are subject to Chaos official licensing terms.',
    cards: [
      {
        title: 'AI Ideation with Veras',
        tech: 'Veras Integration',
        description:
          'Explore visual styles, atmospheric conditions, and design aesthetics from conceptual 3D massing while strictly respecting model geometry and architectural proportion.',
        status: 'Included in eligible plans',
      },
      {
        title: 'AI Material Creation',
        tech: 'Text-to-PBR Material',
        description:
          'Generate high-resolution, seamless, tileable PBR materials complete with normal, roughness, and displacement maps simply by typing descriptive text prompts.',
        status: 'Chaos AI Service',
      },
      {
        title: 'AI-Enhanced Visuals',
        tech: 'Visual Refinement',
        description:
          'Enhance specific scene elements such as background vegetation, atmospheric haze, and entourage realism through supported AI-assisted post-processing pipelines.',
        status: 'Workflow enhancement',
      },
    ],
  },
  cloudCollaboration: {
    eyebrow: 'CONNECTED TEAMS',
    heading: 'Share Visuals. Collect Feedback. Stay Aligned.',
    description:
      'Supported Chaos Cloud tools help architecture and design teams share visualizations, gather client comments, and coordinate revisions in an organized workspace.',
    cards: [
      {
        title: 'Easy Sharing',
        description: 'Publish interactive web standalones and panoramic tours directly to cloud links accessible on any browser.',
        iconName: 'Share2',
      },
      {
        title: 'Centralized Reviews',
        description: 'Collect client feedback, issue markers, and stakeholder approvals directly on specific visual points in the 3D space.',
        iconName: 'MessageSquare',
      },
      {
        title: 'Clear Communication',
        description: 'Eliminate ambiguity by letting clients and consultants reference exact camera viewpoints and model coordinates.',
        iconName: 'CheckCircle2',
      },
      {
        title: 'Smoother Revisions',
        description: 'Coordinate design updates seamlessly, reducing costly rework and miscommunication before construction documentation begins.',
        iconName: 'RefreshCw',
      },
    ],
  },
  workflow: {
    heading: 'From Early Concepts to Client-Ready Visualization',
    description: 'A connected 6-stage workflow that integrates visual storytelling directly into architectural authoring.',
    steps: [
      { step: '01', title: 'Ideate', description: 'Explore initial massing, zoning, and alternative architectural volumes inside your design application.' },
      { step: '02', title: 'Model', description: 'Develop detailed walls, slabs, apertures, and interior elements within Revit, SketchUp, Rhino, or Archicad.' },
      { step: '03', title: 'Visualize', description: 'Launch Enscape with a single click to inspect physical sunlight, spatial flow, and material interactions in real time.' },
      { step: '04', title: 'Refine', description: 'Fine-tune surface textures, populate render-ready entourage, and test artificial lighting fixtures.' },
      { step: '05', title: 'Present', description: 'Output high-res still images, 4K walkthrough videos, 360° panoramas, or hand your client a VR headset.' },
      { step: '06', title: 'Collaborate', description: 'Publish standalone web views to Chaos Cloud for seamless stakeholder review, commenting, and sign-off.' },
    ],
  },
  applications: [
    {
      id: 'architecture',
      title: 'Architecture & Masterplanning',
      description: 'Explore massing, programmatic layouts, materiality, daylighting, and urban sightlines in real-time.',
      iconName: 'Building2',
      deliverables: ['Massing visualizers', 'Sun & shadow daylight studies', 'Contextual urban renderings', 'Client design reviews'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'interior',
      title: 'Interior Design & Workplace',
      description: 'Visualize bespoke furniture layouts, joinery details, acoustic paneling, and warm artificial lighting.',
      iconName: 'Home',
      deliverables: ['Material moodboard reviews', 'Custom millwork previews', 'IES lighting simulations', '360° client room tours'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'landscape',
      title: 'Landscape & Urban Design',
      description: 'Present site context, botanical planting schemes, terrain topography, and outdoor leisure environments.',
      iconName: 'Trees',
      deliverables: ['Seasonal foliage studies', 'Exterior hardscape renders', 'Public park walkthroughs', 'Day / dusk environmental views'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'real-estate',
      title: 'Real Estate & Development',
      description: 'Communicate unbuilt properties persuasively to prospective buyers, investors, and leasing agents.',
      iconName: 'TrendingUp',
      deliverables: ['Marketing collateral renders', 'Standalone web presentations', 'Interactive showroom VR tours', 'Promotional walkthrough clips'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'construction',
      title: 'Engineering & Construction (AEC)',
      description: 'Support constructability reviews, MEP coordination discussions, and spatial clearance evaluations.',
      iconName: 'HardHat',
      deliverables: ['Clash visual verification', 'Site logistics planning', 'Pre-fabrication assemblies', 'Multidisciplinary reviews'],
      image: '/images/software/sections/aec-construction.jpg',
    },
    {
      id: 'education',
      title: 'Design Education & Research',
      description: 'Empower architecture students and researchers to master spatial visualization and presentation workflows.',
      iconName: 'GraduationCap',
      deliverables: ['Studio critique pin-ups', 'Portfolio presentations', 'VR thesis defense', 'Rapid design experimentation'],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Modern Minimalist Villa at Twilight',
      category: 'residential',
      categoryLabel: 'Residential',
      caption: 'Warm interior illumination contrasting with twilight skies, showcasing glass reflections and water refraction.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Contemporary villa with illuminated glass facade and reflection pool rendered in Enscape',
      author: 'Residential Design Studio',
    },
    {
      id: 'gal-2',
      title: 'Nordic Open-Plan Living & Kitchen Space',
      category: 'interior',
      categoryLabel: 'Interior',
      caption: 'Natural diffuse morning sunlight highlighting oak timber flooring, linen textures, and fluted joinery.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      alt: 'Scandinavian interior open plan living room rendered with realistic daylighting',
      author: 'Atelier Interior Architecture',
    },
    {
      id: 'gal-3',
      title: 'Biophilic Corporate Office Atrium',
      category: 'commercial',
      categoryLabel: 'Commercial',
      caption: 'Multi-story commercial office atrium with integrated living green wall, acoustic baffles, and glass elevators.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Corporate atrium with indoor trees and abundant natural light',
      author: 'Urban Workspace Designers',
    },
    {
      id: 'gal-4',
      title: 'Luxury Hotel Lobby & Cocktail Lounge',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      caption: 'Sophisticated hospitality interior showcasing custom brass lighting fixtures, velvet upholstery, and marble flooring.',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Hospitality hotel lounge with warm ambient lighting rendered in real-time',
      author: 'Boutique Hospitality Studio',
    },
    {
      id: 'gal-5',
      title: 'Suburban Courtyard & Native Garden',
      category: 'landscape',
      categoryLabel: 'Landscape',
      caption: 'Botanically rich landscape visualization with varied shrub species, stepping stones, and atmospheric sun rays.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Exterior architectural courtyard with native vegetation and stone pavers',
      author: 'Ecological Landscape Practice',
    },
    {
      id: 'gal-6',
      title: 'Cantilevered Coastal Retreat at Night',
      category: 'night',
      categoryLabel: 'Nighttime',
      caption: 'Dramatic architectural exterior demonstrating artificial spot lighting, concealed LED cove lights, and night sky simulation.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern house at night with external lighting accents',
      author: 'Coastal Architecture Group',
    },
  ],
  presentationSection: {
    heading: 'Help Clients Understand the Design Before Construction Begins',
    description:
      'Visual communication bridges the gap between technical 2D blueprints and human understanding. Enscape empowers architects and interior designers to present proposals with unmatched clarity, whether in formal boardroom reviews or on-site consultations.',
    benefits: [
      'Communicate spatial relationships and ceiling volumes clearly',
      'Walk through alternative finish and color palettes interactively in real time',
      'Address client hesitations early, eliminating costly on-site change orders',
      'Provide interactive web links that stakeholders can explore independently',
      'Export crisp marketing renders for social channels and project pitches',
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  plans: [
    {
      id: 'enscape-solo',
      name: 'Enscape Solo',
      tagline: 'Single-Seat Fixed-Seat License',
      description: 'Ideal for independent architects, individual interior designers, and solo visualizers dedicated to a single workstation.',
      features: [
        'Enscape real-time rendering engine',
        'Direct integration with Revit, SketchUp, Rhino, Archicad, Vectorworks',
        'Real-time walkthroughs and one-click VR mode',
        'Cloud collaboration sharing features',
        'Up to 6,700 render-ready assets (subject to official plan terms)',
        'Veras AI integration (subject to applicable plan terms)',
        'Applicable Chaos AI credits allowance',
      ],
      assetAllowance: 'Up to 6,700 assets',
      aiAllowance: 'Standard AI Credits',
      targetUsers: 'Solo Architects & Designers',
      officialUrl: 'https://www.chaos.com/enscape/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'enscape-premium',
      name: 'Enscape Premium',
      tagline: 'Floating License for Dynamic Teams',
      description: 'Engineered for architecture practices and studios where multiple designers need flexible shared access across machines.',
      popular: true,
      features: [
        'Enscape real-time rendering engine',
        'Floating network license shareable across multiple team members',
        'Direct integration with all 5 supported CAD/BIM platforms',
        'Advanced cloud collaboration & centralized review tools',
        'Up to 10,000 render-ready assets (subject to official plan terms)',
        'Veras AI ideation functionality included',
        'Increased Chaos AI credits compared with Solo',
        'Priority enterprise licensing administration',
      ],
      assetAllowance: 'Up to 10,000 assets',
      aiAllowance: 'Expanded AI Credits',
      targetUsers: 'Design Studios & Architecture Firms',
      officialUrl: 'https://www.chaos.com/enscape/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'enscape-collection',
      name: 'Enscape Collection',
      tagline: 'The Ultimate ArchViz & Creative Powerhouse',
      description: 'The complete creative bundle combining Enscape with V-Ray, Chaos Cosmos, and cinematic animation tools for top-tier visualization firms.',
      features: [
        'Enscape real-time rendering engine with full feature suite',
        'Chaos V-Ray photorealistic rendering engine included',
        'More than 18,500 render-ready assets across Enscape and Cosmos',
        'Cinematic animation and high-end scene assembly capabilities',
        'Veras AI plus maximum Chaos AI credit allowance',
        'Sustainability and daylighting analysis insights',
        'Full cloud collaboration and project review workspace',
      ],
      assetAllowance: '18,500+ Assets (Full Cosmos Library)',
      aiAllowance: 'Maximum AI Credits Allowance',
      targetUsers: 'Leading AEC Enterprises & ArchViz Agencies',
      officialUrl: 'https://www.chaos.com/enscape/buy-online',
      lastVerified: 'October 2026',
    },
  ],
  systemRequirements: {
    heading: 'System Requirements & Technical Compatibility',
    description:
      'Enscape delivers real-time ray-traced rendering by leveraging dedicated GPU hardware acceleration. Ensure your workstation meets these verified specifications for smooth operation.',
    minOS: 'Windows 10 / 11 64-bit (macOS Ventura 13.0+ on supported Apple Silicon)',
    recommendedOS: 'Windows 11 64-bit Professional',
    supportedHosts: 'Autodesk Revit, Trimble SketchUp, McNeel Rhino, Graphisoft Archicad, Vectorworks',
    minGPU: 'NVIDIA GeForce GTX 900 / Quadro M series with 4 GB VRAM, or AMD Radeon RX 400 with 4 GB VRAM',
    recommendedGPU: 'NVIDIA GeForce RTX 4070 / RTX 4080 / RTX 4090 or NVIDIA RTX A4000/A5000 with 8GB+ VRAM (DLSS Support)',
    minRAM: '16 GB RAM minimum (32 GB or 64 GB recommended for large BIM files)',
    vrRequirements: 'SteamVR compatible headset, NVIDIA RTX 3070 / 4070 or higher recommended for 90 FPS VR rendering',
    officialDocUrl: 'https://learn.enscape3d.com/blog/knowledgebase/system-requirements/',
  },
  faqs: [
    {
      q: 'What is Chaos Enscape?',
      a: 'Enscape is a leading real-time rendering and virtual reality software developed by Chaos. It integrates directly into supported CAD and BIM applications, allowing architects, interior designers, and visualization artists to explore, iterate, and present their designs instantaneously without leaving their modeling tool.',
    },
    {
      q: 'Who is Enscape designed for?',
      a: 'It is engineered for architects, interior designers, landscape architects, BIM managers, and AEC professionals who require fast, high-quality visualization without complex disconnected rendering pipelines.',
    },
    {
      q: 'Does Enscape work inside CAD and BIM software?',
      a: 'Yes. Enscape operates as a direct plugin inside Autodesk Revit, Trimble SketchUp, McNeel Rhinoceros, Graphisoft Archicad, and Vectorworks. Live bi-directional synchronization ensures your active design model and visualization stay connected.',
    },
    {
      q: 'Can I see changes to my model in real time?',
      a: 'Absolutely. Whenever you add a wall, alter a window dimension, apply a new material, or shift sunlight angles in your CAD application, Enscape reflects the update in its rendered viewport instantly with zero export waiting times.',
    },
    {
      q: 'Does Enscape support Virtual Reality (VR)?',
      a: 'Yes. Enscape offers a seamless one-click VR mode. Connecting a compatible headset such as the Meta Quest (via Quest Link), HTC Vive, or Valve Index lets you immediately step into your project at 1:1 human scale.',
    },
    {
      q: 'Can I export walkthrough videos and 360° panoramas?',
      a: 'Yes. You can keyframe cinematic camera paths to render smooth MP4 videos up to 4K resolution at 60 fps, as well as export interactive 360° panoramas viewable in any modern web browser or mobile phone.',
    },
    {
      q: 'Can I share my project with clients who do not have Enscape installed?',
      a: 'Yes. Enscape allows you to export standalone executable files (.exe) or upload web standalone links to Chaos Cloud. Clients can orbit, walk through, and inspect the project in their web browser without installing CAD software or purchasing a license.',
    },
    {
      q: 'Does Enscape include ready-to-use 3D assets and materials?',
      a: 'Yes. Enscape features a comprehensive Asset Library containing thousands of high-quality, render-ready 3D models including furniture, vegetation, people, lighting, and vehicles, as well as an extensive library of physically accurate PBR materials.',
    },
    {
      q: 'Does Enscape include AI tools?',
      a: 'Supported Chaos AI capabilities, including Veras architectural ideation and AI material generation tools, are available through applicable plans and Chaos product collections. Check your selected plan details for exact inclusions.',
    },
    {
      q: 'Is there an official free trial available?',
      a: 'Yes, Chaos provides an official 14-day free trial of Enscape with full functionality. You can download and activate the trial directly from the official Chaos website.',
    },
    {
      q: 'How do I purchase Enscape through Leniva CAD Solutions?',
      a: 'Leniva CAD Solutions provides genuine commercial and educational Chaos Enscape subscriptions in India with full invoicing, GST compliance, deployment support, and certified technical guidance. Simply click "Request a Quote" or contact our sales team.',
    },
    {
      q: 'Where can I get technical support and onboarding?',
      a: 'Leniva CAD Solutions provides localized technical onboarding and workflow guidance for architecture teams across India. You also receive full access to official Chaos knowledge bases, video tutorials, and technical support forums.',
    },
  ],
}
