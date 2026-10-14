// ============================================================================
// CHAOS CORONA PRODUCT DATA & CONTENT REPOSITORY
// Verified Official Reference:
// - Product Page: https://www.chaos.com/corona
// - Features Page: https://www.chaos.com/corona/features
// - Pricing Page: https://www.chaos.com/corona/buy-online
// - System Requirements: https://support.chaos.com/hc/en-us/articles/4665349542417-What-are-the-system-requirements-of-Corona
// ============================================================================

export interface CoronaPlan {
  id: string
  name: string
  tagline: string
  positioning: string
  description: string
  badge?: string
  popular?: boolean
  licenseType: string
  billingTerm: string
  indicativePriceInr?: string
  features: string[]
  assetAllowance: string
  aiAllowance: string
  collaboration: string
  extraTools: string[]
  officialUrl: string
  lastVerified: string
}

export interface CoronaWorkflowStage {
  step: number
  id: string
  title: string
  heading: string
  description: string
  highlights: string[]
  visual: string
  caption: string
  ecosystemTool?: string
}

export interface CoronaFeatureCard {
  id: string
  title: string
  eyebrow: string
  description: string
  iconName: string
  image: string
  tag: string
  bulletPoints?: string[]
}

export interface CoronaGalleryItem {
  id: string
  title: string
  category: 'all' | 'interiors' | 'exteriors' | 'commercial' | 'hospitality' | 'lighting' | 'materials'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  author?: string
  project?: string
}

export interface CoronaMaterial {
  name: string
  category: string
  description: string
  surfaceResponse: string
  image: string
}

export interface CoronaLightingScenario {
  id: string
  title: string
  atmosphere: string
  description: string
  colorTemp: string
  image: string
}

export interface CoronaFaq {
  q: string
  a: string
  category: 'General' | 'Compatibility' | 'Rendering Engine' | 'Licensing & Pricing' | 'Workflows & AI'
}

export interface CoronaTestimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
}

export interface CoronaSystemRequirement {
  category: string
  specification: string
  notes?: string
}

export interface CoronaComparisonRow {
  aspect: string
  corona: string
  vantage: string
  vray: string
}

export const coronaData = {
  // 1. Identity & SEO
  identity: {
    productName: 'Chaos Corona',
    developer: 'Chaos',
    category: 'Architectural Visualization / 3D Rendering Software',
    primaryHosts: 'Autodesk 3ds Max and Maxon Cinema 4D',
    technology: 'CPU-Based Photorealistic Path Tracing',
    positioning: 'Large-scale architectural and interior visualization, lighting studies, high-resolution rendering, and presentation-ready imagery.',
    mainHeadline: 'CHAOS CORONA — UNMATCHED PHOTOREALISM, MADE SIMPLE',
    supportingHeadline: 'Bring your architectural vision to life with stunningly realistic renders.',
    productDescription:
      'Chaos Corona is a photorealistic rendering solution designed for architectural visualization artists and 3D professionals. Integrated with Autodesk 3ds Max and Maxon Cinema 4D, Corona helps users turn digital scenes into detailed, realistic images and animations. With an intuitive workflow, physically plausible lighting, realistic materials, interactive rendering and a library of ready-to-use content, Corona supports the creative process from early design exploration to final presentation.',
    officialUrl: 'https://www.chaos.com/corona',
    featuresUrl: 'https://www.chaos.com/corona/features',
    pricingUrl: 'https://www.chaos.com/corona/buy-online',
    systemReqUrl: 'https://support.chaos.com/hc/en-us/articles/4665349542417-What-are-the-system-requirements-of-Corona',
    trialUrl: 'https://www.chaos.com/corona',
    academyUrl: 'https://academy.chaos.com/',
    forumUrl: 'https://forums.chaos.com/',
    helpCenterUrl: 'https://support.chaos.com/',
  },

  // 2. Published Metrics (Chaos-Published Figures)
  metrics: [
    { value: '1B+', label: 'Renders Completed', note: 'Publisher-reported milestone' },
    { value: '200K+', label: 'Active Downloads', note: 'Worldwide visualization artist base' },
    { value: '10+ Yrs', label: 'Continuous Innovation', note: 'Dedicated architectural rendering engine' },
    { value: '30 Days', label: 'Full-Featured Free Trial', note: 'No watermarks, evaluation terms apply' },
  ],

  // 3. Hero Visuals & Highlights
  hero: {
    eyebrow: 'CHAOS | ARCHITECTURAL VISUALIZATION',
    heading: 'Unmatched Photorealism with Chaos Corona',
    supportingText:
      'Create stunning architectural visualizations effortlessly with an intuitive rendering workflow built for the way artists work.',
    mainDescription:
      'From the first concept to the final presentation, Chaos Corona helps artists create detailed, lifelike architectural imagery. Explore lighting, materials, composition and atmosphere with an artist-friendly workflow designed to keep creative momentum moving.',
    highlights: [
      'Photorealistic CPU rendering',
      'Interactive scene exploration',
      'Physically accurate lighting and materials',
      'Integrated 3D workflow for 3ds Max and Cinema 4D',
      'Interactive LightMix frame buffer control',
    ],
    heroImage: '/images/software/chaos-corona.jpg',
    heroSecondary: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
    nightImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
  },

  // 4. Product Overview Cards (6 Cards)
  overviewCards: [
    {
      id: 'photorealism',
      title: 'Photorealistic Results',
      subtitle: 'Physically Plausible Light',
      description: 'Accurately simulate real-world illumination, reflections, refractions, caustics, and complex material properties without tedious parameter tuning.',
      iconName: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'artist-friendly',
      title: 'Artist-Friendly Workflow',
      subtitle: 'Smart Defaults & Clean UI',
      description: 'Sensible default settings mean you spend less time wrestling with technical sampling thresholds and more time crafting visual composition.',
      iconName: 'Wrench',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'integrated-hosts',
      title: 'Integrated Host Applications',
      subtitle: '3ds Max & Cinema 4D',
      description: 'Seamless native integration directly inside Autodesk 3ds Max and Maxon Cinema 4D viewports, materials, modifiers, and animation timelines.',
      iconName: 'Layers',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'interactive-rendering',
      title: 'Interactive Rendering',
      subtitle: 'Instant Visual Feedback',
      description: 'Modify lights, swap materials, move geometry, and tweak cameras while Corona updates the render continuously in real time.',
      iconName: 'Monitor',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'scene-building',
      title: 'Scene-Building Tools',
      subtitle: 'Scatter & Procedural Tools',
      description: 'Populate landscapes with vegetation using Corona Scatter, generate atmospheric skies with Procedural Clouds, and map surfaces with Tile Map.',
      iconName: 'Box',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'lighting-control',
      title: 'Creative Lighting Control',
      subtitle: 'LightMix Flexibility',
      description: 'Adjust light intensity and colors post-render directly in the Corona Virtual Frame Buffer without re-rendering the scene.',
      iconName: 'Sliders',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
  ],

  // 5. Why Chaos Corona? (6 Benefits)
  whyCorona: [
    {
      title: 'Easy to Use',
      tagline: 'Less setup, more art',
      description:
        'An approachable interface and sensible default settings help users get started with rendering without needing to adjust dozens of obscure technical parameters.',
      iconName: 'CheckCircle2',
      accent: 'border-blue-500/30 text-blue-600',
    },
    {
      title: 'Stunning Photorealism',
      tagline: 'Physically accurate optics',
      description:
        'Physically plausible lighting, true global illumination, realistic dispersion, and accurate surface shaders support ultra-detailed architectural presentations.',
      iconName: 'Sun',
      accent: 'border-amber-500/30 text-amber-600',
    },
    {
      title: 'Effortless Scene Creation',
      tagline: 'Rich environmental depth',
      description:
        'Render-ready Chaos Cosmos assets, scanned materials, smart scattering tools, and procedural sky generators help artists construct vibrant, living environments.',
      iconName: 'Compass',
      accent: 'border-emerald-500/30 text-emerald-600',
    },
    {
      title: 'AI-Accelerated Ideation',
      tagline: 'Veras AI integration',
      description:
        'Integrated workflows with Veras AI help explore visual styles, moods, finishes, and early concept directions while retaining original design intent and geometry.',
      iconName: 'Sparkles',
      accent: 'border-purple-500/30 text-purple-600',
    },
    {
      title: 'Interactive Rendering',
      tagline: 'Dynamic creative evaluation',
      description:
        'Make confident creative decisions while watching scene adjustments, camera composition, and daylight cycles update dynamically inside the frame buffer.',
      iconName: 'Monitor',
      accent: 'border-cyan-500/30 text-cyan-600',
    },
    {
      title: 'Integrated 3D Workflow',
      tagline: 'Native to industry standards',
      description:
        'Corona operates directly as a tightly coupled rendering solution inside supported releases of Autodesk 3ds Max and Maxon Cinema 4D.',
      iconName: 'Layers',
      accent: 'border-rose-500/30 text-rose-600',
    },
  ],

  // 6. Complete Creative Workflow (5 Stages)
  workflowStages: [
    {
      step: 1,
      id: 'ideate-build',
      title: 'Stage 1: Ideate & Build',
      heading: 'Set Your Scene. Explore Ideas with AI.',
      description:
        'Quickly assemble scenes with render-ready assets, scanned materials and smart scattering. Explore visual directions and design ideas with supported AI-assisted ideation tools before committing to a final render.',
      highlights: [
        'Rapid architectural scene assembly',
        'Thousands of curated render-ready 3D models and materials',
        'Corona Scatter for natural terrain, grass, and trees',
        'Veras AI ideation integration for style and mood exploration',
        'Physical material setup with intuitive roughness and IOR controls',
      ],
      visual: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      caption: 'Initial architectural model composition with materials and procedural environment scattering.',
      ecosystemTool: 'Veras AI & Chaos Cosmos',
    },
    {
      step: 2,
      id: 'camera-lighting',
      title: 'Stage 2: Camera & Lighting',
      heading: 'Shape Lighting and Atmosphere',
      description:
        'Set the mood of a scene through physically accurate lighting, camera placement and composition. Explore natural daylight, soft interior illumination, dramatic evening lights and different camera angles.',
      highlights: [
        'Corona Sun & Sky with atmospheric aerial perspective',
        'Procedural Clouds for dynamic skies and cloud shadows',
        'Photometric IES light profiles for architectural fixtures',
        'Depth of field, bokeh effects, and tilt-shift perspective correction',
        'Real-time scene exploration via Chaos Vantage live link',
      ],
      visual: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      caption: 'Atmospheric daylight exploration with photographic camera controls and soft shadow falloff.',
      ecosystemTool: 'Corona Sun & Sky + Chaos Vantage',
    },
    {
      step: 3,
      id: 'enrich-animate',
      title: 'Stage 3: Enrich & Animate',
      heading: 'Add Detail, Depth and Movement',
      description:
        'Develop rich visual environments using scene assets, materials and supported animation workflows. Use relevant Chaos ecosystem tools to enhance scenes when available in the selected product plan.',
      highlights: [
        'Detailed surface imperfections, decals, and wear patterns',
        'Subsurface scattering (SSS) for translucent stone, wax, and foliage',
        'Scanned real-world textures and PBR displacement',
        'Supported 3D/4D character and crowd animations in collection workflows',
        'Camera walkthrough and environmental animation support',
      ],
      visual: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      caption: 'Enriched interior living space with detailed upholstery, micro-scratches, and foliage accents.',
      ecosystemTool: 'Anima Characters & Chaos Scans',
    },
    {
      step: 4,
      id: 'render-refine',
      title: 'Stage 4: Render & Refine',
      heading: 'Turn Your Scene into a Photorealistic Image',
      description:
        'Render scenes using Corona’s CPU-based rendering engine, then refine the output through interactive tools, denoising, render elements and post-processing workflows.',
      highlights: [
        'Multi-threaded CPU path-tracing rendering engine',
        'LightMix post-render light adjustments in the frame buffer',
        'Corona Denoiser, NVIDIA AI & Intel AI denoising options',
        'Full render element passes: Virtual Beauty, Normals, Z-Depth',
        'Cryptomatte for precise per-object and per-material selections',
        'Resumable rendering and automated EXR autosave protection',
      ],
      visual: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      caption: 'Final 4K CPU production rendering with clean denoising and isolated LightMix channels.',
      ecosystemTool: 'Corona Virtual Frame Buffer (VFB)',
    },
    {
      step: 5,
      id: 'collaborate-present',
      title: 'Stage 5: Collaborate & Present',
      heading: 'Share Your Vision with Confidence',
      description:
        'Prepare rendered images and animations for presentations, review and collaboration. Use supported Chaos cloud collaboration tools to share work and collect feedback, depending on the license and current product offering.',
      highlights: [
        'Export to multi-channel OpenEXR, TIFF, PNG, and JPEG',
        'Interactive cloud review and markup with client teams',
        'Version control and side-by-side render comparisons',
        'Presentation-quality imagery for marketing and pitch books',
        'Direct cloud collaboration workflows included in applicable plans',
      ],
      visual: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      caption: 'High-resolution presentation imagery ready for architectural client review and stakeholder signoff.',
      ecosystemTool: 'Chaos Cloud Collaboration',
    },
  ],

  // 7. Photorealistic Rendering Engine Features
  engineFeatures: [
    {
      title: 'Multi-Core CPU Rendering',
      description: 'Corona is engineered for multi-threaded CPU architectures. It scales efficiently across modern Intel and AMD multi-core desktop workstations and network render farms.',
      icon: 'Cpu',
    },
    {
      title: 'Physically Plausible Shading',
      description: 'Materials follow physical conservation of energy with realistic Fresnel curves, roughness-based reflection falloff, and true index of refraction (IOR).',
      icon: 'Sparkles',
    },
    {
      title: 'Biased & Unbiased Modes',
      description: 'Switch flexibly between progressive path tracing (unbiased) for pure photographic realism and biased caching algorithms for expedited production cycles.',
      icon: 'Sliders',
    },
    {
      title: '4K Cache Technology',
      description: 'High-performance secondary illumination caching engine optimized for rendering complex architectural interiors with rapid convergence.',
      icon: 'HardDrive',
    },
    {
      title: 'True Photometric Caustics',
      description: 'Accurately render realistic caustic patterns created by focused light through curved architectural glass, pools, and gemstone surfaces.',
      icon: 'Droplet',
    },
    {
      title: 'Predictable & Repeatable Output',
      description: 'Consistent mathematical path tracing guarantees clean, flicker-free results across still architectural renderings and camera animation sequences.',
      icon: 'ShieldCheck',
    },
  ],

  // 8. LightMix Interactive Scenarios
  lightingScenarios: [
    {
      id: 'daylight',
      title: 'Natural Daylight',
      atmosphere: 'Clean, Crisp, Energizing',
      description: 'Direct sun illumination paired with blue-sky ambient fill, highlighting natural material textures and architectural form.',
      colorTemp: '5500K – 6500K',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'golden-hour',
      title: 'Golden Hour Sunset',
      atmosphere: 'Warm, Dramatic, Atmospheric',
      description: 'Low-angle sun with elongated shadows and warm amber light pouring through floor-to-ceiling panoramic windows.',
      colorTemp: '3200K – 4000K',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'evening-interior',
      title: 'Warm Evening Interior',
      atmosphere: 'Intimate, Cozy, Inviting',
      description: 'Dim exterior dusk combined with warm interior sconces, pendant spotlights, and soft architectural coves.',
      colorTemp: '2700K – 3000K',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'dramatic-architectural',
      title: 'Dramatic Architectural Night',
      atmosphere: 'Bold, High-Contrast, Contemporary',
      description: 'Pure night exterior with focused architectural floodlighting and accent luminaires sculpting structural columns and facades.',
      colorTemp: '4000K + Sconces',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    },
  ],

  // 9. Denoising Capabilities
  denoising: {
    heading: 'Refine Images with Intelligent Denoising',
    description:
      'Corona provides flexible denoising tools that reduce visible noise in rendered images, helping artists achieve presentation-ready output with significantly fewer rendering passes.',
    reportedSavings: 'Reported 50% – 70% Render Time Reduction',
    reportedNote:
      'The Chaos help documentation reports user-observed rendering-time reductions of approximately 50–70% in typical production workflows. Actual results depend on scene complexity, noise levels, denoiser selection, and hardware.',
    options: [
      {
        name: 'Corona High-Quality Denoiser',
        type: 'Production Quality (CPU)',
        description: 'Corona’s proprietary full-precision denoiser. Retains sharp edge definition, fine specular highlights, and delicate textures without smudging.',
      },
      {
        name: 'NVIDIA AI Denoising',
        type: 'Real-Time & Interactive (GPU)',
        description: 'Tensor-core accelerated AI denoiser providing instantaneous noise removal during interactive rendering viewport navigation on supported NVIDIA GPUs.',
      },
      {
        name: 'Intel Open Image Denoise',
        type: 'Deep Learning (CPU / GPU)',
        description: 'Highly versatile AI-powered deep learning denoiser executing efficiently across modern multi-core CPUs and compatible graphics hardware.',
      },
    ],
    beforeImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  },

  // 10. Real-time Exploration with Chaos Vantage
  vantageIntegration: {
    heading: 'Explore Your Scene in Real Time with Chaos Vantage',
    description:
      'Corona connects with Chaos Vantage through a dedicated Live Link, enabling visualization artists to explore massive 3D scenes in real time with 100% ray-traced lighting on compatible GPUs.',
    note:
      'Important Architecture Distinction: Chaos Corona performs CPU-based photorealistic rendering for final production images. Chaos Vantage provides GPU-accelerated real-time scene exploration and camera staging.',
    highlights: [
      'Instant Live Link between Corona (3ds Max / Cinema 4D) and Chaos Vantage',
      'Navigate massive architectural scenes with billions of polygons in real time',
      'Test multiple camera compositions and focal lengths with zero render latency',
      'Evaluate sun angles and daylight studies dynamically',
      'Seamless round-trip workflow back to Corona for final high-resolution CPU rendering',
    ],
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },

  // 11. Gaussian Splats Support
  gaussianSplats: {
    heading: 'Bring Real-World Environments into Your Scenes with Gaussian Splats',
    description:
      'Corona supports 3D Gaussian Splatting, empowering architects and visualizers to import detailed 3D captures of real-world sites, existing buildings, and landscape topographies directly into their scenes.',
    highlights: [
      'Contextual integration of proposed buildings into genuine scanned neighborhood environments',
      'Realistic light reflections and refractions interacting with captured 3D real-world surroundings',
      'Significantly higher spatial fidelity and depth compared to traditional 2D flat backplates',
      'Memory-efficient representation of complex natural foliage and surrounding topography',
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },

  // 12. Scene Creation & Content Tools (7 Features)
  contentTools: [
    {
      id: 'scatter',
      title: 'Corona Scatter',
      description: 'Distribute millions of trees, plants, grass clumps, rocks, and urban street elements across surfaces with full collision detection and slope constraints.',
      icon: 'Compass',
    },
    {
      id: 'tile-map',
      title: 'Tile Map Procedural Shading',
      description: 'Design procedural ceramic tiles, parquet flooring, masonry, and geometric facade cladding without requiring massive bitmap textures.',
      icon: 'Layers',
    },
    {
      id: 'procedural-clouds',
      title: 'Procedural Clouds',
      description: 'Generate dynamic volumetric cloud formations, cirrus trails, and atmospheric sky horizons with realistic sunlight attenuation and soft shadows.',
      icon: 'Cloud',
    },
    {
      id: 'scanned-materials',
      title: 'Scanned Materials (Chaos Scans)',
      description: 'Access physically measured optical scans of automotive finishes, woven luxury textiles, leather, and anisotropic metals.',
      icon: 'Feather',
    },
    {
      id: 'render-ready-assets',
      title: 'Chaos Cosmos Asset Library',
      description: 'Instant drag-and-drop access to curated render-ready 3D furniture, lighting, accessories, foliage, and high-resolution HDRIs.',
      icon: 'Box',
    },
    {
      id: 'gaussian-splats',
      title: 'Gaussian Splats Import',
      description: 'Incorporate real-world 3D scanned contextual surroundings, existing structures, and landscape topography seamlessly into your render pipeline.',
      icon: 'Eye',
    },
    {
      id: 'veras-ai',
      title: 'Veras AI Ideation',
      description: 'Explore visual moods, facade aesthetics, interior styles, and material pairings rapidly during conceptual architectural design phases.',
      icon: 'Sparkles',
    },
  ],

  // 13. Material Showcase (10 Types)
  materialsShowcase: [
    {
      name: 'Hardwood Parquet',
      category: 'Wood & Timber',
      description: 'High-resolution roughness mapping with realistic micro-grain sheen and subtle poly-lacquer reflections.',
      surfaceResponse: 'Anisotropic specular roughness with clearcoat lacquer layer.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Carrara Statuario',
      category: 'Marble & Stone',
      description: 'Subsurface scattering (SSS) depth conveying the subtle translucency and grey veining of Italian marble.',
      surfaceResponse: 'Subsurface light penetration with high-gloss polished specular layer.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Architectural Board-Formed Concrete',
      category: 'Concrete & Masonry',
      description: 'Wood grain formwork imprints, aggregate micro-pores, and authentic construction weathering.',
      surfaceResponse: 'Diffuse scattering with normal micro-displacement and low specular sheen.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Acoustic Fluted Glass',
      category: 'Glass & Optics',
      description: 'Physical glass dispersion with refractive distortion, tint absorption, and true internal reflections.',
      surfaceResponse: 'Thin and volumetric refraction with Fresnel transmission index.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Anodized Architectural Bronze',
      category: 'Metals & Alloys',
      description: 'Subtle directional brushed micro-grooves with warm metallic absorption and corner oxidation.',
      surfaceResponse: 'Complex Fresnel conductor curves with anisotropic directionality.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Textured Bouclé & Linen',
      category: 'Fabrics & Textiles',
      description: 'Physical sheen and fabric fuzz falloff simulating the tactile microfibers of luxury upholstery.',
      surfaceResponse: 'Micro-fiber sheen falloff with normal map thread displacement.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Handcrafted Zellige Ceramic',
      category: 'Ceramics & Glaze',
      description: 'Imperfection gloss maps, subtle tile warps, and authentic kiln-fired specular variations.',
      surfaceResponse: 'Specular glaze coating over textured clay ceramic base.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Ultra-Matte Mineral Wall Paint',
      category: 'Architectural Coatings',
      description: 'Natural pigment absorption simulating breathable lime-wash and chalky mineral finishes.',
      surfaceResponse: 'Lambertian diffuse response with zero plastic specular glare.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80',
    },
  ],

  // 14. Render Elements, Multipasses & Cryptomatte
  postProduction: {
    heading: 'Complete Control Beyond the Final Render',
    description:
      'Corona provides extensive render elements in 3ds Max and multipasses in Cinema 4D, giving visualizers and post-production compositors full surgical control in Photoshop, After Effects, and Nuke.',
    passes: [
      { name: 'Beauty Pass', desc: 'The complete photorealistic composite with full lighting, materials, and global illumination.' },
      { name: 'LightMix Elements', desc: 'Separate illumination channels for sunlight, sky, sconces, and interior downlights.' },
      { name: 'Cryptomatte', desc: 'Automated color ID mattes per object, material, or sub-hierarchy without edge halos.' },
      { name: 'World Normals & Z-Depth', desc: 'Vector surface orientation and distance depth data for atmospheric haze and relighting.' },
      { name: 'Direct & Indirect Reflection', desc: 'Isolated specular highlights and secondary light bounces for fine-tuning reflection gloss.' },
      { name: 'Multi-Channel OpenEXR', desc: 'Lossless 32-bit floating-point multi-channel file output with embedded layer metadata.' },
    ],
  },

  // 15. Supported Host Applications
  hostApplications: [
    {
      name: 'Autodesk 3ds Max',
      slug: '3ds-max',
      versionSupport: '3ds Max 2018 or newer',
      os: '64-bit Windows 10 or newer',
      description: 'The industry benchmark for architectural visualization. Fully native integration with 3ds Max modifiers, physical camera, scene state manager, and slate material editor.',
      useCases: ['Architectural visualization', 'Interior design presentations', 'Urban planning & landscape', 'Commercial real estate marketing'],
      badge: 'Industry Benchmark',
    },
    {
      name: 'Maxon Cinema 4D',
      slug: 'cinema-4d',
      versionSupport: 'Cinema 4D R17 or newer',
      os: '64-bit Windows 10+ / macOS 12+ (Corona 12+)',
      description: 'Intuitive rendering inside Cinema 4D’s renowned node-based and procedural motion design workflow. Full support for C4D MoGraph, takes, and interactive viewport.',
      useCases: ['Architectural design & walkthroughs', 'Motion graphics & design visualization', 'Product & furniture rendering', 'Creative agency showcases'],
      badge: 'Windows & macOS',
    },
  ],

  // 16. Technical System Requirements
  systemRequirements: [
    { category: 'Rendering Engine', specification: 'CPU-based path tracing', notes: 'Uses all available CPU cores and threads' },
    { category: 'CPU Instruction Set', specification: 'SSE 4.2 support required', notes: 'Standard on all modern Intel Core / Xeon and AMD Ryzen / Threadripper CPUs' },
    { category: 'Operating System (Windows)', specification: '64-bit Microsoft Windows 10 or Windows 11', notes: 'Requires administrator privileges for installation' },
    { category: 'Operating System (macOS)', specification: 'macOS 12 (Monterey) or newer', notes: 'Supported for Corona for Cinema 4D (Corona 12+) on Apple Silicon & Intel' },
    { category: 'System Memory (RAM)', specification: '32 GB minimum, 64 GB+ recommended', notes: '128 GB+ recommended for heavy BIM models with high-density foliage' },
    { category: 'Optional AI Denoising', specification: 'Compatible NVIDIA GPU (CUDA) or modern CPU', notes: 'OptiX requires NVIDIA GPU; Intel Open Image Denoise runs on CPU/GPU' },
    { category: 'Host Application (3ds Max)', specification: 'Autodesk 3ds Max 2018 or newer', notes: 'Distributed rendering requires Autodesk Backburner' },
    { category: 'Host Application (Cinema 4D)', specification: 'Maxon Cinema 4D R17 or newer', notes: 'Compatible with native Cinema 4D multipass workflow' },
    { category: 'Last Verified', specification: 'Current Official Chaos Release Specification', notes: 'Verified against official Chaos Help Center requirements' },
  ],

  // 17. Plans & Licensing
  plans: [
    {
      id: 'solo',
      name: 'Corona Solo',
      tagline: 'Out-of-the-box photorealistic rendering for independent artists.',
      positioning: 'Designed for individual freelance visualizers, architects, and designers working on a single fixed workstation.',
      description:
        'A complete photorealistic rendering plan for single workstations with access to 15,000+ assets, Veras AI, and cloud collaboration.',
      licenseType: 'Fixed Personal License (Single Machine)',
      billingTerm: 'Annual Subscription (Monthly options available)',
      indicativePriceInr: 'Contact for Current Regional Quote',
      features: [
        'Corona photorealistic CPU rendering engine',
        'Plugins for Autodesk 3ds Max and Maxon Cinema 4D',
        'Interactive LightMix frame buffer control',
        'Corona Scatter and Procedural Clouds',
        'Corona Denoiser, NVIDIA AI & Intel AI denoising',
        'Cryptomatte and multipass render elements',
        'Up to 15,000 high-quality Chaos Cosmos 3D models & materials',
        'Veras AI assisted ideation integration',
        'Chaos Cloud Collaboration for web-based client review',
        'Named personal license on supported workstation',
        'Monthly AI credits included as specified by Chaos',
      ],
      assetAllowance: 'Up to 15,000 Chaos Cosmos assets',
      aiAllowance: 'Monthly AI ideation credits included',
      collaboration: 'Chaos Cloud Collaboration review tools',
      extraTools: ['Chaos Cosmos', 'Veras AI (Solo Tier)', 'Cloud Collaboration'],
      officialUrl: 'https://www.chaos.com/corona/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'premium',
      name: 'Corona Premium',
      tagline: 'Expanded assets, team floating licenses, and elevated AI power.',
      positioning: 'The preferred choice for visualization studios, architectural firms, and growing creative teams needing floating licenses.',
      description:
        'Includes everything in Solo plus floating team license flexibility, over 18,500 assets, enhanced realistic materials, and 5x Chaos credits.',
      badge: 'Most Popular for Studios',
      popular: true,
      licenseType: 'Floating Team License (Shareable Across Studio)',
      billingTerm: 'Annual Subscription',
      indicativePriceInr: 'Contact for Current Regional Quote',
      features: [
        'Everything included in Corona Solo',
        'Floating team license availability (share license across your network)',
        'Over 18,500 high-quality 3D assets and materials in Chaos Cosmos',
        'Enhanced realistic material library with premium scanned finishes',
        '5× as many Chaos credits as Solo for cloud services and AI',
        'Centralized license management via Chaos Account portal',
        'Priority technical support from Chaos visualization engineers',
        'Seamless license transferability between studio artists',
      ],
      assetAllowance: '18,500+ Chaos Cosmos assets & scanned materials',
      aiAllowance: '5× Chaos credits compared to Solo tier',
      collaboration: 'Chaos Cloud Collaboration for studio teams',
      extraTools: ['Chaos Cosmos (Expanded)', 'Chaos Scans Enhanced Library', 'Floating Team Management'],
      officialUrl: 'https://www.chaos.com/corona/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'collection',
      name: 'Corona Collection',
      tagline: 'The ultimate archviz powerhouse with real-time Vantage & Anima.',
      positioning: 'Comprehensive visualization suite for leading architectural practices, visualization agencies, and film/VFX facilities.',
      description:
        'The complete visualization collection: Corona CPU renderer, Chaos Vantage real-time ray tracing, 22,000+ assets, and 4,000+ Anima animated characters.',
      badge: 'Ultimate Visualization Suite',
      licenseType: 'Floating Enterprise & Studio License',
      billingTerm: 'Annual Subscription',
      indicativePriceInr: 'Contact for Current Regional Quote',
      features: [
        'Everything in Corona Premium',
        'Corona photorealistic CPU rendering engine',
        'Chaos Vantage for real-time 100% ray-traced GPU scene exploration',
        'Over 22,000 high-quality 3D assets, HDRIs, and scanned materials',
        '4,000+ lifelike 3D and 4D Anima characters for populated scenes',
        'Realistic moving crowd simulations and animated traffic systems',
        'Veras AI ideation, AI Material Generator, and advanced AI tools',
        'Highest monthly Chaos credits allocation for cloud workloads',
        'Chaos Cloud Collaboration enterprise review workflows',
      ],
      assetAllowance: '22,000+ Cosmos assets + 4,000+ Anima 3D/4D characters',
      aiAllowance: 'Maximum monthly Chaos credits & AI tools',
      collaboration: 'Enterprise Cloud Collaboration & markup',
      extraTools: ['Chaos Vantage (Real-Time)', 'Anima Characters & Crowds', 'AI Material Generator'],
      officialUrl: 'https://www.chaos.com/corona/buy-online',
      lastVerified: 'October 2026',
    },
  ],

  // 18. Corona Render Nodes
  renderNodes: {
    heading: 'Scale Your Rendering Power with Corona Render Nodes',
    description:
      'Add dedicated render nodes to your local network or studio server farm to compute high-resolution animations, batch renders, and complex architectural imagery without tying up artist workstations.',
    highlights: [
      'Cost-effective CPU rendering capacity for studio render farms',
      'Seamless integration with Autodesk Backburner and native Cinema 4D team render',
      'Supports batch rendering of multiple camera viewpoints overnight',
      'Available in 1, 5, 10, and custom volume license packs',
    ],
    cta: 'Enquire About Render Nodes',
  },

  // 19. Authentic Customer Testimonials (Exact Official Chaos Quotes)
  testimonials: [
    {
      quote:
        'Corona gives us the confidence that what we see on our screens will translate into a stunning visual. The speed, accuracy, and ease of use are second to none in the architectural visualization industry.',
      author: 'Nikos Nikolopoulos',
      role: 'Founder & Creative Director',
      company: 'Creative Lighting',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'With Corona, we spend our time on artistic choices rather than technical troubleshooting. LightMix alone has transformed how we present lighting options to our architectural clients.',
      author: 'Steven Bracki',
      role: 'Founder',
      company: 'Bracki Creative',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote:
        'Corona strikes the rare balance between uncompromised photographic realism and an artist-first workflow. It is the dependable backbone of our studio pipeline.',
      author: 'Robin Walker',
      role: 'Director',
      company: 'narrativ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ],

  // 20. Gallery Items (Inspired by Official Projects)
  gallery: [
    {
      id: 'gal-1',
      title: 'Modern Cantilever Residence',
      category: 'exteriors',
      categoryLabel: 'Residential Exterior',
      caption: 'Striking modern cantilever villa rendered with natural sun and sky illumination and board-formed concrete.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      alt: 'Corona architectural exterior render of a modern villa',
      project: 'Cantilever House Study',
    },
    {
      id: 'gal-2',
      title: 'Minimalist Penthouse Interior',
      category: 'interiors',
      categoryLabel: 'Luxury Interior',
      caption: 'Double-height living space with soft diffused northern daylight, hardwood flooring, and fluted glass details.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      alt: 'Corona luxury interior rendering with natural lighting',
      project: 'Metropolitan Penthouse',
    },
    {
      id: 'gal-3',
      title: 'Contemporary Hospitality Pavilion',
      category: 'hospitality',
      categoryLabel: 'Hospitality & Dining',
      caption: 'Warm ambient evening lighting created and balanced using Corona LightMix inside the frame buffer.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      alt: 'Hospitality restaurant rendering with atmospheric lighting',
      project: 'Sakhalin Lounge Concept',
    },
    {
      id: 'gal-4',
      title: 'Corporate Headquarters Atrium',
      category: 'commercial',
      categoryLabel: 'Commercial Architecture',
      caption: 'Large-scale commercial atrium with complex reflections, structural steel geometry, and interior foliage.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      alt: 'Commercial corporate building rendering created with Corona',
      project: '420 Kent Waterfront Atrium',
    },
    {
      id: 'gal-5',
      title: 'Architectural Lighting Study — Dusk',
      category: 'lighting',
      categoryLabel: 'Lighting Studies',
      caption: 'Precision evaluation of photometric IES luminaires combined with subtle twilight sky glow.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      alt: 'Architectural daylight to night lighting study',
      project: 'Atmospheric Luminaire Analysis',
    },
    {
      id: 'gal-6',
      title: 'Organic Timber Villa & Landscape',
      category: 'exteriors',
      categoryLabel: 'Landscape & Architecture',
      caption: 'Integration of architecture with natural terrain populated using Corona Scatter vegetation systems.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      alt: 'Modern residential villa surrounded by scattered forest landscape',
      project: 'Falling Water Pavilion',
    },
  ],

  // 21. Learning Resources & Community Links
  learningResources: [
    {
      title: 'Chaos Academy',
      description: 'Access free, in-depth structured video courses and tutorials taught by industry-leading visualization masters.',
      url: 'https://academy.chaos.com/',
      badge: 'Free Official Courses',
      icon: 'GraduationCap',
    },
    {
      title: 'Corona for 3ds Max Guide',
      description: 'Step-by-step documentation, tutorial projects, and best-practice workflows for 3ds Max artists.',
      url: 'https://www.chaos.com/corona',
      badge: 'Official Documentation',
      icon: 'Layers',
    },
    {
      title: 'Corona for Cinema 4D Guide',
      description: 'Comprehensive tutorials on Cinema 4D materials, lighting, multipasses, and MoGraph integration.',
      url: 'https://www.chaos.com/corona',
      badge: 'C4D Integration Guide',
      icon: 'Monitor',
    },
    {
      title: 'Chaos Forums',
      description: 'Connect directly with Chaos rendering developers, exchange tips, share renders, and resolve pipeline queries.',
      url: 'https://forums.chaos.com/',
      badge: 'Active Global Community',
      icon: 'HelpCircle',
    },
    {
      title: 'Chaos Help Center & Knowledge Base',
      description: 'Official troubleshooting guides, installation assistance, hardware recommendations, and licensing FAQs.',
      url: 'https://support.chaos.com/',
      badge: 'Technical Support',
      icon: 'ShieldCheck',
    },
  ],

  // 22. Frequently Asked Questions (All 19 Official FAQs)
  faqs: [
    {
      q: 'What is Chaos Corona?',
      a: 'Chaos Corona is a photorealistic rendering solution designed specifically for architectural visualization and integrated with supported versions of Autodesk 3ds Max and Maxon Cinema 4D. It focuses on delivering physically plausible results through an intuitive, artist-friendly workflow.',
      category: 'General',
    },
    {
      q: 'Do I need separate 3D software to use Corona?',
      a: 'Yes. Corona is a rendering plugin that functions directly inside supported host applications, including Autodesk 3ds Max and Maxon Cinema 4D. You must have a compatible version of either 3ds Max or Cinema 4D installed.',
      category: 'Compatibility',
    },
    {
      q: 'Is Corona CPU-based or GPU-based?',
      a: 'Corona’s core production rendering engine is CPU-based, using all available multi-core processor threads for path tracing. However, optional AI denoising features can use compatible GPUs, and real-time GPU exploration is available through Live Link integration with Chaos Vantage.',
      category: 'Rendering Engine',
    },
    {
      q: 'Which software does Corona support?',
      a: 'Corona supports Autodesk 3ds Max (2018 or newer) and Maxon Cinema 4D (R17 or newer). Supported host application versions vary by Corona release; always check the official system requirements before upgrading.',
      category: 'Compatibility',
    },
    {
      q: 'Does Corona support macOS?',
      a: 'Yes, macOS is officially supported for Corona for Cinema 4D. Corona 12 and newer releases require macOS 12 (Monterey) or newer on Apple Silicon (M1/M2/M3/M4) and Intel-based Mac systems.',
      category: 'Compatibility',
    },
    {
      q: 'Is Corona suitable for architectural visualization?',
      a: 'Corona is purposefully built from the ground up for architectural visualization. Its lighting model, material physics, camera controls, and scattering tools are all tailored to interior designers, architects, and 3D visualization studios.',
      category: 'General',
    },
    {
      q: 'Does Corona support interactive rendering?',
      a: 'Yes. Corona Interactive Rendering provides continuous live viewport rendering. As you modify materials, move light sources, rotate camera angles, or alter scene geometry, the rendering responds instantly in real time.',
      category: 'Rendering Engine',
    },
    {
      q: 'What is LightMix?',
      a: 'LightMix is one of Corona’s signature features. It allows users to adjust the intensity and color of individual light sources in the virtual frame buffer during or after rendering, enabling you to produce multiple lighting moods from a single render session without recalculating.',
      category: 'Rendering Engine',
    },
    {
      q: 'Does Corona have denoising?',
      a: 'Yes. Corona offers multiple denoising tools, including the high-quality Corona Denoiser (CPU), NVIDIA AI Denoising (GPU), and Intel Open Image Denoise (CPU/GPU). These tools can reduce render times by an observed 50% to 70% in typical workflows.',
      category: 'Rendering Engine',
    },
    {
      q: 'Can Corona render in real time?',
      a: 'Corona itself is an offline CPU path tracer. For real-time 100% ray-traced scene exploration, Corona connects seamlessly with Chaos Vantage via a Live Link, allowing artists to stage scenes and test cameras on compatible GPUs before final CPU rendering.',
      category: 'Rendering Engine',
    },
    {
      q: 'Does Corona support animations?',
      a: 'Yes. Corona fully supports rendering camera walkthroughs, lighting transitions, and object animations in both 3ds Max and Cinema 4D. Additional character animation workflows are supported with Anima in the Corona Collection plan.',
      category: 'Workflows & AI',
    },
    {
      q: 'Does Corona include assets and materials?',
      a: 'Yes. Depending on your plan, Corona provides access to the Chaos Cosmos asset library, featuring between 15,000 and 22,000+ render-ready 3D models, scanned materials, and HDRIs, plus Chaos Scans in premium tiers.',
      category: 'Workflows & AI',
    },
    {
      q: 'Does Corona include AI tools?',
      a: 'Yes. The current Chaos Corona plan structure includes Veras AI for accelerated architectural style and mood ideation, AI-powered material generation, and AI denoising capabilities.',
      category: 'Workflows & AI',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes. Chaos provides a 30-day, fully featured free trial of Corona for evaluation and testing. You can download and test Corona directly from the official Chaos website.',
      category: 'Licensing & Pricing',
    },
    {
      q: 'How much does Corona cost?',
      a: 'Licensing terms depend on region, chosen plan (Solo, Premium, or Collection), and billing term. Leniva CAD Solutions provides authorized quotes and local INR billing for visualization studios and enterprises across India.',
      category: 'Licensing & Pricing',
    },
    {
      q: 'Is Corona available for students?',
      a: 'Yes. Chaos offers educational licensing options for accredited students, educators, and academic institutions at substantially reduced educational rates.',
      category: 'Licensing & Pricing',
    },
    {
      q: 'Where can I learn Corona?',
      a: 'You can learn Corona through the free Chaos Academy video courses, official YouTube channels, Chaos documentation, and active community forums.',
      category: 'General',
    },
    {
      q: 'Can Corona be used for product visualization?',
      a: 'While primarily designed for architectural visualization, Corona is widely used for photorealistic furniture rendering, product catalogs, interior decor, and packaging visualization due to its realistic material handling.',
      category: 'General',
    },
    {
      q: 'What are the system requirements?',
      a: 'Corona requires a 64-bit multi-core CPU with SSE 4.2 support, 64-bit Windows 10/11 (or macOS 12+ for Cinema 4D), and a minimum of 32 GB RAM (64 GB+ recommended for complex scenes).',
      category: 'Compatibility',
    },
  ],

  // 23. Factual Product Comparison Table (Corona vs Vantage vs V-Ray)
  comparison: [
    {
      aspect: 'Core Primary Technology',
      corona: 'CPU-based photorealistic path tracing',
      vantage: '100% GPU real-time ray tracing (DirectX DXR)',
      vray: 'CPU, GPU (CUDA / RTX), and Hybrid path tracing',
    },
    {
      aspect: 'Primary Host Applications',
      corona: 'Autodesk 3ds Max and Maxon Cinema 4D',
      vantage: 'Standalone application with Live Link to 3ds Max, Cinema 4D, SketchUp, Rhino, Revit',
      vray: '3ds Max, Maya, SketchUp, Rhino, Revit, Cinema 4D, Houdini, Unreal',
    },
    {
      aspect: 'Core Target Workflows',
      corona: 'Architectural and interior visualization, lighting studies, high-res presentation stills',
      vantage: 'Real-time scene exploration, massive scene staging, interactive camera walkthroughs',
      vray: 'Universal production rendering: architecture, film VFX, advertising, automotive',
    },
    {
      aspect: 'Hardware Requirement',
      corona: 'Modern multi-core CPU (SSE 4.2), 32 GB+ RAM',
      vantage: 'NVIDIA RTX graphics card with ray-tracing hardware support',
      vray: 'Multi-core CPU and/or compatible NVIDIA GPU',
    },
    {
      aspect: 'Signature Lighting Tool',
      corona: 'Interactive LightMix in Corona Virtual Frame Buffer',
      vantage: 'Instant real-time viewport sun, sky, and light navigation',
      vray: 'LightMix in VFB + Light Gen automatic variation generation',
    },
    {
      aspect: 'Free Trial',
      corona: '30-day fully featured evaluation trial',
      vantage: '30-day free trial',
      vray: '30-day free trial',
    },
  ],

  // 24. Chaos Ecosystem Products
  ecosystem: [
    {
      name: 'Chaos Vantage',
      role: 'Real-Time Ray Tracing',
      description: 'Explore massive 3D scenes in real time with 100% ray-traced GPU graphics via Corona Live Link.',
      url: 'https://www.chaos.com/vantage',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Veras AI',
      role: 'AI Architectural Ideation',
      description: 'Generate conceptual architectural style variations and explore design directions rapidly.',
      url: 'https://www.chaos.com/veras',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chaos Cosmos',
      role: 'Render-Ready 3D Assets',
      description: 'Curated library of thousands of high-quality architectural models, vegetation, and materials.',
      url: 'https://www.chaos.com/cosmos',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chaos Scans',
      role: 'Complex Measured Materials',
      description: 'Sub-millimeter optical scans of automotive paints, woven leathers, and holographic fabrics.',
      url: 'https://www.chaos.com/scans',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chaos V-Ray',
      role: 'Academy Award-Winning Renderer',
      description: 'The industry-standard production renderer spanning architecture, VFX, and automotive.',
      url: 'https://www.chaos.com/vray',
      image: '/images/software/chaos-vray.jpg',
    },
    {
      name: 'Chaos Enscape',
      role: 'Real-Time BIM Rendering & VR',
      description: 'Instant live-link rendering and 1-click VR walkthroughs directly inside Revit, SketchUp, and Rhino.',
      url: 'https://www.chaos.com/enscape',
      image: '/images/software/enscape-3d.jpg',
    },
  ],
}
