export interface VRayPlan {
  id: string
  name: string
  tagline: string
  positioning: string
  description: string
  popular?: boolean
  features: string[]
  assetAllowance: string
  aiAllowance: string
  targetUsers: string
  officialUrl: string
  lastVerified: string
}

export interface VRayIntegration {
  id: string
  name: string
  logoBadge: string
  description: string
  supportedVersions: string
  keyAdvantage: string
  image: string
}

export interface VRayFeatureCard {
  id: string
  title: string
  eyebrow: string
  description: string
  iconName: string
  image: string
  tag: string
  linkTarget: string
}

export interface VRayGalleryItem {
  id: string
  title: string
  category: 'architecture' | 'interiors' | 'product' | 'automotive' | 'animation' | 'vfx' | 'materials'
  categoryLabel: string
  caption: string
  image: string
  alt: string
  author?: string
}

export interface VRayApplication {
  id: string
  title: string
  description: string
  iconName: string
  deliverables: string[]
  image: string
}

export interface VRayFaq {
  q: string
  a: string
  category?: string
}

export interface VRayCmsData {
  seo: {
    title: string
    description: string
    canonical: string
  }
  hero: {
    eyebrow: string
    h1: string
    h1Highlight: string
    supportingHeading: string
    description: string
    officialUrl: string
    trialUrl: string
    pricingUrl: string
    gpuRenderingUrl: string
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
  whyVRay: {
    eyebrow: string
    heading: string
    cards: {
      title: string
      subtitle: string
      description: string
      iconName: string
      image: string
      linkAnchor: string
    }[]
  }
  rayTracing: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    materialCloseups: { name: string; desc: string; image: string }[]
    image: string
  }
  lighting: {
    eyebrow: string
    heading: string
    description: string
    cards: {
      title: string
      description: string
      iconName: string
    }[]
    image: string
  }
  engines: {
    eyebrow: string
    heading: string
    description: string
    disclaimer: string
    cpu: {
      title: string
      desc: string
      points: string[]
    }
    gpu: {
      title: string
      desc: string
      points: string[]
    }
    hybrid: {
      title: string
      desc: string
      points: string[]
    }
  }
  interactive: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    image: string
  }
  materials: {
    eyebrow: string
    heading: string
    description: string
    cards: {
      title: string
      description: string
      iconName: string
    }[]
  }
  cosmos: {
    eyebrow: string
    heading: string
    description: string
    categories: { name: string; count: string; desc: string }[]
    image: string
  }
  sceneManagement: {
    eyebrow: string
    heading: string
    description: string
    cards: {
      title: string
      description: string
      iconName: string
    }[]
  }
  postProcessing: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    image: string
  }
  renderElements: {
    eyebrow: string
    heading: string
    description: string
    passes: { name: string; desc: string }[]
  }
  animation: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    image: string
  }
  distributed: {
    eyebrow: string
    heading: string
    description: string
    steps: { number: string; title: string; desc: string }[]
    disclaimer: string
  }
  cloudRendering: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
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
  vantage: {
    eyebrow: string
    heading: string
    description: string
    highlights: string[]
    image: string
  }
  integrations: VRayIntegration[]
  vrayEnscapeWorkflow: {
    eyebrow: string
    heading: string
    description: string
    enscapeRole: string[]
    vrayRole: string[]
    pipelineSteps: { title: string; desc: string }[]
  }
  applications: VRayApplication[]
  showcases: {
    archViz: {
      eyebrow: string
      heading: string
      description: string
      items: { title: string; desc: string; image: string }[]
    }
    productDesign: {
      eyebrow: string
      heading: string
      description: string
      items: { title: string; desc: string; image: string }[]
    }
    vfxAnimation: {
      eyebrow: string
      heading: string
      description: string
      items: { title: string; desc: string; image: string }[]
    }
  }
  workflow: {
    eyebrow: string
    heading: string
    steps: { step: string; title: string; description: string }[]
  }
  plans: VRayPlan[]
  freeTrial: {
    eyebrow: string
    heading: string
    description: string
    trialUrl: string
  }
  systemRequirements: {
    eyebrow: string
    heading: string
    description: string
    os: string
    hosts: string
    cpu: string
    gpu: string
    gpuMemory: string
    ram: string
    storage: string
    officialUrl: string
  }
  learning: {
    eyebrow: string
    heading: string
    description: string
    resources: { title: string; desc: string; link: string }[]
  }
  gallery: VRayGalleryItem[]
  faqs: VRayFaq[]
}

export const vrayData: VRayCmsData = {
  seo: {
    title: 'Chaos V-Ray Photorealistic 3D Rendering Software | Leniva CAD Solutions',
    description:
      'Explore Chaos V-Ray: physically based ray tracing, CPU/GPU hybrid rendering, Chaos Cosmos asset library, and production workflows for 3ds Max, SketchUp, Rhino, Revit, Cinema 4D, and Maya. Commercial licensing & consultation by Leniva CAD Solutions.',
    canonical: 'https://lenivacadsolution.com/products/vray',
  },
  hero: {
    eyebrow: 'CHAOS V-RAY | PHOTOREALISTIC 3D RENDERING',
    h1: 'Create Your Most Realistic Work Yet with',
    h1Highlight: 'Chaos V-Ray',
    supportingHeading: 'Photorealistic rendering for design, visualization, and production.',
    description:
      'V-Ray is professional 3D rendering software that helps artists and designers transform complex 3D scenes into realistic images and animations. With physically based ray tracing, advanced lighting and material tools, and flexible CPU and GPU rendering options, V-Ray supports demanding visualization workflows across architecture, design, animation, and visual effects.',
    officialUrl: 'https://www.chaos.com/vray',
    trialUrl: 'https://www.chaos.com/vray/trial',
    pricingUrl: 'https://www.chaos.com/vray/buy-online',
    gpuRenderingUrl: 'https://www.chaos.com/vray-gpu',
    heroImage: '/images/software/chaos-vray.jpg',
    heroSecondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: 'Supported Host Applications', value: '9+', note: '3ds Max, SketchUp, Rhino, Revit, Cinema 4D, Maya...' },
      { label: 'Oscars & Engineering Emmys', value: 'Academy Award', note: 'Award-winning ray tracing technology' },
      { label: 'Cosmos Render-Ready Assets', value: '18,500+', note: 'Curated 3D models, PBR materials & HDRI skies' },
    ],
  },
  intro: {
    eyebrow: 'HIGH-END 3D VISUALIZATION',
    heading: 'The Rendering Engine Behind Photorealistic Results',
    description:
      'V-Ray combines physically based ray tracing with a comprehensive set of lighting, material, camera, and rendering tools. It gives professionals absolute control over how light interacts with a scene, how surfaces appear, and how the final image or cinematic animation is produced.',
    subDescription:
      'From single-frame high-resolution architectural hero images to massive Hollywood production shots with billions of polygons, V-Ray scales efficiently across available hardware, delivering benchmark color fidelity, depth, and physically accurate light transport.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  whyVRay: {
    eyebrow: 'WHY V-RAY',
    heading: 'One Renderer for Demanding Creative Workflows',
    cards: [
      {
        title: 'Award-Winning Photorealism',
        subtitle: 'Physically Based Light Transport',
        description:
          "V-Ray's ray-tracing technology supports highly realistic images by simulating the interaction of light, materials, reflections, refractions, and optical shadows.",
        iconName: 'Award',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'ray-tracing',
      },
      {
        title: 'Built to Scale',
        subtitle: 'Massive Scenes & Complex Geometry',
        description:
          'Work with detailed scenes, complex assets, and demanding visualization projects using rendering workflows that can make full use of available CPU and GPU hardware.',
        iconName: 'Cpu',
        image: '/images/software/sections/revit-integration.jpg',
        linkAnchor: 'rendering-engines',
      },
      {
        title: 'Creative Freedom and Control',
        subtitle: 'Granular Look Development',
        description:
          'Use physically based materials, lighting, cameras, textures, and post-processing controls in the V-Ray Frame Buffer to shape the exact visual identity of a project.',
        iconName: 'Maximize2',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'materials',
      },
      {
        title: 'AI-Assisted Creation',
        subtitle: 'Accelerated Ideation',
        description:
          'Use applicable Chaos AI capabilities to explore visual directions, generate realistic PBR materials, and enhance selected scene content where supported.',
        iconName: 'Sparkles',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
        linkAnchor: 'ai-creation',
      },
    ],
  },
  rayTracing: {
    eyebrow: 'REALISTIC LIGHT AND MATERIALS',
    heading: 'Bring Every Detail to Life',
    description:
      'V-Ray uses ray-tracing technology and physically based rendering techniques to create realistic representations of light, surfaces, and environments. It supports high-quality visualization for detailed architectural scenes, products, characters, and cinematic environments.',
    highlights: [
      'Physically based ray tracing simulating real optical principles',
      'Realistic light transport through global illumination and path tracing',
      'Natural contact shadows and ambient occlusion depth',
      'Physically accurate reflections, glossy dispersions, and refractions',
      'Subsurface scattering (SSS) for skin, wax, marble, and translucent plastics',
      'Sub-pixel anti-aliasing and fine edge geometry resolution',
    ],
    materialCloseups: [
      { name: 'Optical Glass', desc: 'True index of refraction (IOR) with dispersion and chromatic aberration.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80' },
      { name: 'Brushed Metals', desc: 'Anisotropic micro-scratches, roughness maps, and Fresnel metallic curves.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Hardwood Timber', desc: 'Normal mapping, clearcoat lacquers, and fine grain bump textures.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80' },
      { name: 'Architectural Concrete', desc: 'Micro-pores, formwork seams, and realistic surface weathering.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
  },
  lighting: {
    eyebrow: 'MASTER THE LIGHT',
    heading: 'Control Light, Mood, and Atmosphere',
    description:
      'V-Ray provides advanced lighting tools to help artists shape the mood, realism, and visual character of a scene across daylight exterior architecture, atmospheric interiors, and studio product setups.',
    cards: [
      {
        title: 'Sun and Sky System',
        description: 'Simulate natural sunlight and atmospheric sky conditions based on exact geographic location, date, and time of day.',
        iconName: 'Sun',
      },
      {
        title: 'Global Illumination',
        description: 'Advanced GI algorithms calculate indirect bounces of light, illuminating interior spaces naturally with true color bleeding.',
        iconName: 'Globe',
      },
      {
        title: 'Photometric & IES Lights',
        description: 'Load manufacturer-verified IES data files to simulate accurate real-world light distribution patterns and lumens.',
        iconName: 'Lightbulb',
      },
      {
        title: 'Volumetric & Atmospheric Effects',
        description: 'Simulate aerial perspective, fog, god rays, and haze to convey cinematic depth and atmospheric mood.',
        iconName: 'Cloud',
      },
      {
        title: 'Light Mix in VFB',
        description: 'Adjust the intensity and color of individual light sources in real time after rendering finishes without re-rendering.',
        iconName: 'Sliders',
      },
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  engines: {
    eyebrow: 'PERFORMANCE FLEXIBILITY',
    heading: 'Choose the Rendering Workflow That Fits Your Hardware',
    description:
      'V-Ray offers CPU and GPU rendering options, with supported hybrid workflows that can use compatible processors and graphics hardware. The most suitable option depends on scene complexity, hardware, supported features, and project requirements.',
    disclaimer:
      'Note: CPU and GPU render engines have differences in hardware utilization, feature support, memory handling, and interactivity. Feature parity depends on the selected engine and host integration.',
    cpu: {
      title: 'CPU Rendering',
      desc: 'The benchmark production path utilizing multi-core workstation processors and large system RAM pools.',
      points: [
        'Multi-core CPU scaling across AMD Threadripper, Intel Xeon, and Core processors',
        'Capable of addressing full system RAM (64 GB, 128 GB, 256 GB+) for massive polygon scenes',
        'Complete feature set including complex shaders, volumetrics, and procedural textures',
        'Ideal for final production rendering and batch frame delivery',
      ],
    },
    gpu: {
      title: 'V-Ray GPU',
      desc: 'Ultra-fast GPU-accelerated rendering utilizing NVIDIA CUDA and RTX hardware acceleration.',
      points: [
        'Dedicated ray-tracing cores (RT Cores) on modern NVIDIA RTX GPUs',
        'Interactive feedback during look development and lighting layout',
        'Out-of-core memory management to handle scenes exceeding dedicated VRAM',
        'Accelerated denoising with NVIDIA OptiX and Intel Open Image Denoise',
      ],
    },
    hybrid: {
      title: 'Hybrid Rendering',
      desc: 'Harness the combined compute power of your workstation CPU and GPU concurrently.',
      points: [
        'Simultaneous compute utilizing both processor cores and graphics cards',
        'Extracts maximum return on investment from high-end multi-hardware setups',
        'Flexible allocation suited for mixed hardware studio render nodes',
        'Configurable engine modes selectable directly within render setup',
      ],
    },
  },
  interactive: {
    eyebrow: 'INTERACTIVE VISUALIZATION',
    heading: 'Move From Iteration to Final-Quality Rendering',
    description:
      'V-Ray supports interactive rendering workflows that allow artists to evaluate materials, lighting, and scene appearance as they work. Real-time feedback accelerates visual exploration and presentation approvals.',
    highlights: [
      'Interactive rendering updates the viewport as you move cameras, edit geometry, or adjust lights',
      'V-Ray Vision provides a dedicated real-time window for rapid navigation in supported CAD apps',
      'Look development takes minutes instead of hours, empowering rapid design exploration',
      'Seamless transition from real-time interactive preview to final production ray tracing',
    ],
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
  },
  materials: {
    eyebrow: 'EVERY SURFACE MATTERS',
    heading: 'Create Rich, Physically Accurate Materials',
    description:
      'V-Ray provides an extensive suite of physically based shading tools, procedural maps, and layering workflows to reproduce any real-world surface with photographic accuracy.',
    cards: [
      {
        title: 'Physically Based Shading (V-Ray Mtl)',
        description: 'Industry-standard versatile material shader with energy conservation, metalness, and roughness channels.',
        iconName: 'Layers',
      },
      {
        title: 'Subsurface Scattering (SSS)',
        description: 'Simulates light penetration into translucent materials such as human skin, marble, jade, and liquids.',
        iconName: 'Droplet',
      },
      {
        title: 'Car Paint & Flakes Shader',
        description: 'Complex multi-layer automotive coatings with metallic flakes, pearl coats, and clear coat reflections.',
        iconName: 'Sparkles',
      },
      {
        title: 'V-Ray Decals',
        description: 'Project stickers, road markings, stains, and imperfections onto surfaces without modifying base UV coordinates.',
        iconName: 'Stamp',
      },
      {
        title: 'Procedural Dirt & Curvature',
        description: 'Automatically generate edge wear, crevices, dirt accumulation, and ambient grime in corners.',
        iconName: 'Compass',
      },
      {
        title: 'Hair, Fur & Fabric Shaders',
        description: 'Physically accurate micro-fibers, sheen parameters, and specialized hair shading models.',
        iconName: 'Feather',
      },
    ],
  },
  cosmos: {
    eyebrow: 'READY-TO-RENDER CONTENT',
    heading: 'Build Detailed Scenes With Chaos Cosmos',
    description:
      'Chaos Cosmos is a built-in content universe providing thousands of curated, render-ready 3D models, materials, and HDRI skies that integrate seamlessly into your V-Ray workflow.',
    categories: [
      { name: 'Furniture & Interiors', count: '4,000+ Assets', desc: 'Contemporary, luxury, and commercial designer furnishings' },
      { name: 'Vegetation & Trees', count: '3,200+ Assets', desc: 'Botanically verified trees, plants, and grasses with seasonal variants' },
      { name: 'People & Entourage', count: '1,500+ Assets', desc: 'Photorealistic scanned 3D characters in diverse everyday and professional attire' },
      { name: 'Vehicles & Transport', count: '800+ Assets', desc: 'Passenger cars, electric vehicles, industrial trucks, and transport' },
      { name: 'Lighting Fixtures', count: '1,200+ Assets', desc: 'Designer architectural luminaires with real-world photometric data' },
      { name: 'PBR Materials & Skies', count: '2,500+ Assets', desc: 'Seamless high-resolution surface textures and dynamic HDRI environments' },
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  sceneManagement: {
    eyebrow: 'COMPLEX SCENES, ORGANIZED WORKFLOWS',
    heading: 'Handle Massive Production Scenes Without Memory Bottlenecks',
    description:
      'V-Ray is built to handle scenes containing hundreds of millions of polygons through smart memory management, dynamic proxies, and advanced instancing tools.',
    cards: [
      {
        title: 'V-Ray Proxy Objects (.vrmesh)',
        description: 'Stream massive geometries from disk only at render time, keeping host CAD viewport lightweight and responsive.',
        iconName: 'Box',
      },
      {
        title: 'V-Ray Scatter',
        description: 'Easily scatter millions of trees, rocks, crowds, or furniture instances across terrains with natural randomness.',
        iconName: 'Maximize2',
      },
      {
        title: 'V-Ray Clipper & Section Fills',
        description: 'Create architectural cutaway section renders with automated solid capping without modifying the original 3D model.',
        iconName: 'Scissors',
      },
      {
        title: 'Smart Memory Caching',
        description: 'Dynamic tessellation and on-demand texture loading ensure large production scenes render within system limits.',
        iconName: 'Cpu',
      },
    ],
  },
  postProcessing: {
    eyebrow: 'REFINE THE FINAL IMAGE',
    heading: 'The V-Ray Frame Buffer (VFB): Complete Studio Post-Production',
    description:
      'The V-Ray Frame Buffer is more than a render preview window. It is a full post-production studio where you can adjust exposures, fine-tune color balance, add bloom and glare, and remix lights without touching external photo-editing tools.',
    highlights: [
      'Light Mix: change intensities and color temperatures of individual light groups live',
      'Layer-based compositing: exposure, white balance, LUTs, curves, and hue/saturation',
      'Hardware-accelerated Lens Effects: dynamic optical bloom, glare, and diffraction spikes',
      'Interactive denoisers: Intel OIDN and NVIDIA OptiX for instant noise reduction',
      'History and A/B compare slider: easily compare render iterations side-by-side',
    ],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  },
  renderElements: {
    eyebrow: 'MORE CONTROL AFTER RENDERING',
    heading: 'Render Elements for Professional Compositing',
    description:
      'Split your rendered beauty pass into individual lighting, reflection, refraction, and mask elements for complete control in Adobe Photoshop, Nuke, After Effects, or Fusion.',
    passes: [
      { name: 'Lighting & Global Illumination', desc: 'Direct and indirect lighting components isolated for selective boost or tinting.' },
      { name: 'Reflection & Refraction', desc: 'Specularity, mirror reflections, and glass transmission isolated for fine-tuning.' },
      { name: 'Cryptomatte & MultiMatte', desc: 'Automatic object and material ID masks for instant single-click selection in post.' },
      { name: 'Z-Depth & Normals', desc: 'Geometric surface normals and depth maps for post-process depth of field and fog.' },
      { name: 'Shadow & Ambient Occlusion', desc: 'Shadow density and contact occlusion passes for grounding objects.' },
      { name: 'Velocity Pass', desc: 'Motion vectors for calculating cinematic optical motion blur during compositing.' },
    ],
  },
  animation: {
    eyebrow: 'BEYOND STILL IMAGES',
    heading: 'Bring Your Scenes Into Motion With Cinematic Rendering',
    description:
      'V-Ray supports production rendering for architectural walkthroughs, product launch animations, and feature-film visual effects sequences with rock-solid temporal consistency and zero flicker.',
    highlights: [
      'Temporal consistency algorithms eliminate frame-to-frame GI flickering in camera animations',
      'Physical camera controls: shutter speed, ISO, depth of field, motion blur, and tilt-shift lenses',
      'Batch frame rendering with distributed network nodes or Chaos Cloud submission',
      'Full support for animated deforming meshes, characters, water simulations, and camera tracks',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  distributed: {
    eyebrow: 'SCALE YOUR RENDERING',
    heading: 'Distributed Rendering Across Your Network',
    description:
      'Harness the unused compute power of multiple computers across your local network to render high-resolution images together in a fraction of the time.',
    steps: [
      { number: '01', title: 'Main Workstation', desc: 'Artists set up the camera, materials, and lighting within their host application.' },
      { number: '02', title: 'Job Distribution', desc: 'V-Ray automatically tiles the image and distributes buckets to all connected node machines.' },
      { number: '03', title: 'Network Node Compute', desc: 'Worker machines compute their assigned buckets simultaneously using CPU or GPU cores.' },
      { number: '04', title: 'Final Assembly', desc: 'Completed buckets are assembled live in the primary workstation Frame Buffer.' },
    ],
    disclaimer: 'Distributed rendering performance depends on network bandwidth, scene asset transfer times, and hardware node parity.',
  },
  cloudRendering: {
    eyebrow: 'RENDER BEYOND YOUR WORKSTATION',
    heading: 'Extend Your Power With Chaos Cloud',
    description:
      'Submit complex animations and high-resolution stills to Chaos Cloud with a single click. Keep your primary workstation free for creative modeling while high-performance cloud clusters render your frames in parallel.',
    highlights: [
      'One-click submission directly from your host CAD toolbar',
      'No complex server configuration or third-party render farm plugins required',
      'Parallel animation rendering delivers hours of video footage in minutes',
      'Monitor render progress and preview frames from any mobile browser or tablet',
    ],
    image: '/images/software/chaos-vray.jpg',
  },
  aiCreation: {
    eyebrow: 'AI-ASSISTED WORKFLOWS',
    heading: 'Explore Ideas and Enhance Your Creative Process with AI',
    description:
      'Supported Chaos AI tools can help artists explore visual styles, generate custom seamless PBR textures, and enhance environmental realism while preserving full creative control over the final scene.',
    disclaimer:
      'Note: Veras integration, AI tools, and monthly AI credit allowances depend on the applicable Chaos V-Ray plan or collection. Check your plan details for exact inclusions.',
    cards: [
      {
        title: 'AI Ideation with Veras',
        tech: 'Veras Architecture AI',
        description: 'Explore alternative architectural styles, materials, and lighting moods from conceptual 3D massing while preserving geometry.',
        status: 'Included in eligible plans',
      },
      {
        title: 'AI Material Generator',
        tech: 'Text-to-PBR Synthesis',
        description: 'Generate tileable PBR materials complete with normal, roughness, and displacement maps using simple natural language prompts.',
        status: 'Chaos AI Service',
      },
      {
        title: 'AI Scene Enhancement',
        tech: 'Detail Refinement',
        description: 'Enhance background entourage, foliage details, and weathering accents using supported AI post-processing workflows.',
        status: 'Creative enhancement',
      },
      {
        title: 'AI-Accelerated Denoising',
        tech: 'OptiX & OIDN Denoise',
        description: 'Deep-learning neural networks remove ray-tracing noise instantly, cutting render times by up to 50% without detail loss.',
        status: 'Built-in Frame Buffer',
      },
    ],
  },
  vantage: {
    eyebrow: 'REAL-TIME SCENE EXPLORATION',
    heading: 'Explore Massive V-Ray Scenes in Real Time with Chaos Vantage',
    description:
      'Chaos Vantage is a companion product that enables 100% ray-traced real-time exploration of massive V-Ray scenes with zero geometry conversion, unwrapping, or baking.',
    highlights: [
      'Pure real-time ray tracing running on modern NVIDIA RTX hardware',
      'Direct live link with 3ds Max, SketchUp, Rhino, and Revit',
      'Navigate scenes with billions of polygons, animated characters, and physical cameras',
      'Render high-quality animation sequences at extraordinary interactive speeds',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  integrations: [
    {
      id: '3ds-max',
      name: 'Autodesk 3ds Max',
      logoBadge: 'Industry Standard',
      description: 'The definitive architectural visualization and VFX rendering setup, supporting complex scattering, TyFlow, Phoenix FD, and deep production pipelines.',
      supportedVersions: '3ds Max 2020, 2021, 2022, 2023, 2024, 2025',
      keyAdvantage: 'Deepest feature parity, advanced shader networks & particle support',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'sketchup',
      name: 'Trimble SketchUp',
      logoBadge: 'Architecture & Interior',
      description: 'Transform lightweight SketchUp models into photorealistic architectural presentations with intuitive material mapping and automatic sunlight sync.',
      supportedVersions: 'SketchUp 2020, 2021, 2022, 2023, 2024',
      keyAdvantage: 'Intuitive asset placement, V-Ray Vision live link & Light Mix',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rhino',
      name: 'McNeel Rhinoceros',
      logoBadge: 'Industrial & Marine',
      description: 'Render complex NURBS surfaces, marine vessels, jewelry pieces, and Grasshopper parametric geometry with physical accuracy.',
      supportedVersions: 'Rhino 6, Rhino 7, Rhino 8 (Windows & macOS)',
      keyAdvantage: 'Grasshopper component nodes & native NURBS ray tracing',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'revit',
      name: 'Autodesk Revit',
      logoBadge: 'BIM Visualization',
      description: 'Connect BIM design models to photorealistic marketing renders. Respects Revit families, phases, sun studies, and materials.',
      supportedVersions: 'Revit 2021, 2022, 2023, 2024, 2025',
      keyAdvantage: 'BIM phase synchronization & physical lighting verification',
      image: '/images/software/sections/revit-integration.jpg',
    },
    {
      id: 'cinema-4d',
      name: 'Maxon Cinema 4D',
      logoBadge: 'Motion Design',
      description: 'Render high-impact broadcast graphics, brand animations, and product visualization with MoGraph integration and node shaders.',
      supportedVersions: 'Cinema 4D R25, 2023, 2024, 2025',
      keyAdvantage: 'Seamless MoGraph particle instancing & node-based materials',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'maya',
      name: 'Autodesk Maya',
      logoBadge: 'Animation & VFX',
      description: 'Hollywood-grade production rendering for creature animation, digital characters, cloth simulations, and complex VFX shot pipelines.',
      supportedVersions: 'Maya 2020, 2021, 2022, 2023, 2024, 2025',
      keyAdvantage: 'Bifrost fluid simulation support, XGen hair & deep OpenEXR',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  ],
  vrayEnscapeWorkflow: {
    eyebrow: 'CONNECTED CHAOS ECOSYSTEM',
    heading: 'From Real-Time Exploration to Photorealistic Output',
    description:
      'Enscape and V-Ray complement different stages of the architectural visualization workflow. Use Enscape for real-time client walkthroughs during design iterations, then transition the exact scene to V-Ray for final photorealistic marketing imagery.',
    enscapeRole: [
      'Instantaneous real-time design exploration inside CAD',
      'Interactive client presentations & one-click Virtual Reality',
      'Fast iterative layout and spatial volume verification',
      'Standalone web links for client feedback',
    ],
    vrayRole: [
      'Hollywood-proven photorealistic ray tracing & global illumination',
      'Granular material shaders, micro-displacement, and complex SSS',
      'High-resolution still imagery up to 16K and cinematic animations',
      'Comprehensive compositing control via V-Ray Frame Buffer & passes',
    ],
    pipelineSteps: [
      { title: 'Model & Explore', desc: 'Design in Revit/SketchUp with Enscape real-time feedback.' },
      { title: 'Scene Transfer', desc: 'Enscape scene settings and Cosmos assets link smoothly into V-Ray.' },
      { title: 'Fine-Tune Look', desc: 'Adjust advanced V-Ray materials, Light Mix, and frame elements.' },
      { title: 'Final Production', desc: 'Output award-winning photorealistic frames for marketing.' },
    ],
  },
  applications: [
    {
      id: 'architecture',
      title: 'Architectural Visualization',
      description: 'Produce award-winning exterior renders, atmospheric daylight studies, and luxury interior compositions.',
      iconName: 'Building2',
      deliverables: ['Competition hero renders', 'Sun & shadow environmental studies', 'High-res marketing brochures', 'Public hearing presentations'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'interior',
      title: 'Interior Design & Lighting',
      description: 'Accurately simulate artificial luminaires, fabric sheen, mirror reflections, and timber grains.',
      iconName: 'Home',
      deliverables: ['Commercial workplace mockups', 'Bespoke joinery previews', 'Verified IES lighting layouts', 'Material board presentations'],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'product',
      title: 'Product Design & Packaging',
      description: 'Showcase consumer electronics, perfume bottles, packaging cartons, and luxury goods before manufacturing.',
      iconName: 'Box',
      deliverables: ['E-commerce product hero shots', 'Studio lighting turntable animations', 'Packaging foil & emboss previews', 'Exploded technical views'],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'automotive',
      title: 'Automotive & Transportation',
      description: 'Simulate metallic car paints, carbon fiber weaves, headlight caustics, and aerodynamic studio environments.',
      iconName: 'Car',
      deliverables: ['Concept vehicle styling reviews', 'Commercial automotive ads', 'Cockpit interior ergonomics', 'Color & trim variations'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'animation',
      title: 'Film, Animation & Commercials',
      description: 'Trusted by major film studios for photorealistic visual effects, character animation, and environmental CGI.',
      iconName: 'Film',
      deliverables: ['Feature film visual effects', 'Broadcast television spots', 'Cinematic video game trailers', 'Animated digital doubles'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'industrial',
      title: 'Industrial Equipment & Marine',
      description: 'Communicate complex mechanical assemblies, offshore platforms, and heavy machinery to stakeholders.',
      iconName: 'Wrench',
      deliverables: ['Technical sales visuals', 'Operator manual illustrations', 'Cutaway machinery views', 'Offshore facility mockups'],
      image: '/images/software/sections/ares-mech-assembly.jpg',
    },
  ],
  showcases: {
    archViz: {
      eyebrow: 'ARCHITECTURAL VISUALIZATION',
      heading: 'Visualize Architecture With Depth and Realism',
      description: 'V-Ray delivers photographic light fidelity across exterior daylight, dusk environments, and atmospheric interior scenes.',
      items: [
        { title: 'Suburban Villa at Sunset', desc: 'Physically calculated sun low on the horizon casting warm light through floor-to-ceiling glass.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
        { title: 'Minimalist Penthouse Living Space', desc: 'Natural diffuse indirect lighting showcasing oak parquet, acoustic slatted panels, and linen drapery.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
        { title: 'Biophilic Corporate Office', desc: 'Multi-story glass facade reflecting ambient sky with integrated indoor vertical garden illumination.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      ],
    },
    productDesign: {
      eyebrow: 'PRODUCT VISUALIZATION',
      heading: 'Make Every Product Detail Visible',
      description: 'Communicate material finishes, reflections, and manufacturing tolerances with studio-grade lighting precision.',
      items: [
        { title: 'High-End Audio Headphones', desc: 'Brushed aluminum earcups with micro-perforated leather cushions and gold-plated jack connections.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
        { title: 'Luxury Chronograph Timepiece', desc: 'Sapphire crystal reflections with anti-reflective coating, polished steel bezel, and guilloché dial.', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80' },
        { title: 'Ergonomic Task Chair Concept', desc: 'Textured breathable mesh fabric, die-cast aluminum frame, and molded nylon armrest ergonomics.', image: '/images/software/chaos-vray.jpg' },
      ],
    },
    vfxAnimation: {
      eyebrow: 'VISUAL EFFECTS AND ANIMATION',
      heading: 'Build Rich, Detailed Worlds',
      description: 'Scalable rendering pipelines supporting millions of proxy assets, dynamic particle simulations, and atmospheric volumetrics.',
      items: [
        { title: 'Cinematic Ancient Temple Ruins', desc: 'Volumetric god rays piercing through dense forest canopy onto weathered carved sandstone ruins.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80' },
        { title: 'Futuristic Sci-Fi Megacity', desc: 'Massive urban environment with illuminated aerial skyways, neon signage, and realistic atmospheric haze.', image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80' },
        { title: 'Fluid & Particle Explosions', desc: 'Photorealistic simulation of molten metal splashes with physical caustics and glowing embers.', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
      ],
    },
  },
  workflow: {
    eyebrow: 'FROM SCENE TO FINAL FRAME',
    heading: 'A Flexible Workflow From Creation to Delivery',
    steps: [
      { step: '01', title: 'Create', description: 'Model or assemble 3D geometry in 3ds Max, SketchUp, Rhino, Revit, Cinema 4D, or Maya.' },
      { step: '02', title: 'Prepare', description: 'Organize scene layers, apply Chaos Cosmos assets, setup physical materials, and position cameras.' },
      { step: '03', title: 'Configure', description: 'Choose your engine (CPU, GPU, or Hybrid) and adjust resolution, sampling, and global illumination.' },
      { step: '04', title: 'Preview', description: 'Use interactive rendering or V-Ray Vision for instant live feedback as you fine-tune details.' },
      { step: '05', title: 'Render', description: 'Compute final high-res frames locally, via distributed network nodes, or on Chaos Cloud.' },
      { step: '06', title: 'Refine & Deliver', description: 'Adjust Light Mix, color grades, and denoisers in the V-Ray Frame Buffer, or export compositing passes.' },
    ],
  },
  plans: [
    {
      id: 'vray-solo',
      name: 'V-Ray Solo',
      tagline: 'Single-Seat Fixed-Seat License',
      positioning: 'Photorealistic rendering for individual creators.',
      description: 'Ideal for independent visualizers, freelance 3D artists, and solo practitioners who work on a single designated machine.',
      features: [
        'V-Ray rendering engine for any 1 supported host application',
        'CPU, GPU, and Hybrid rendering capabilities',
        'Chaos Cosmos curated 3D asset library',
        'Integrated V-Ray Frame Buffer with Light Mix & post-processing',
        'Veras AI access and applicable monthly Chaos AI credits',
        'Cloud collaboration features for sharing reviews',
      ],
      assetAllowance: 'Standard Cosmos Library Access',
      aiAllowance: 'Standard Chaos AI Credits',
      targetUsers: 'Individual 3D Artists & Freelancers',
      officialUrl: 'https://www.chaos.com/vray/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'vray-premium',
      name: 'V-Ray Premium',
      tagline: 'Floating License for Dynamic Studios',
      positioning: 'Additional assets, materials, floating access, and AI capabilities.',
      description: 'Engineered for architecture firms, design studios, and visualization agencies where multiple artists need flexible shared access across workstations.',
      popular: true,
      features: [
        'Floating license shareable across multiple team members and computers',
        'Access to V-Ray across ALL supported host applications (3ds Max, SketchUp, Rhino, Revit, Cinema 4D, Maya, etc.)',
        'Chaos Vantage real-time ray-traced exploration tool included',
        'Expanded Chaos Cosmos 3D content and material library',
        'Increased monthly Chaos AI credit allowance compared to Solo',
        'Chaos Player (high-resolution image sequence player)',
        'Priority enterprise licensing administration',
      ],
      assetAllowance: 'Full Cosmos Library (18,500+ Assets)',
      aiAllowance: 'Expanded Chaos AI Credits',
      targetUsers: 'Architecture Practices & Creative Studios',
      officialUrl: 'https://www.chaos.com/vray/buy-online',
      lastVerified: 'October 2026',
    },
    {
      id: 'vray-collection',
      name: 'V-Ray Enterprise / Collection',
      tagline: 'The Ultimate ArchViz & Production Powerhouse',
      positioning: 'An expanded visualization and animation toolkit.',
      description: 'The ultimate creative bundle combining V-Ray with Chaos Vantage, Enscape, Phoenix fluid simulation, and Anima crowd animation.',
      features: [
        'V-Ray floating license with multi-host support',
        'Chaos Vantage real-time ray-tracing engine',
        'Chaos Phoenix for photorealistic fluid, fire, smoke, and ocean simulation',
        'Chaos Scans library of scanned ultra-realistic physical materials',
        'Chaos Player high-speed playback for film & commercial review',
        'Maximum Chaos AI credit allowance & Veras architectural ideation',
        'Chaos Cloud rendering credits bundle',
      ],
      assetAllowance: 'Full Cosmos + Chaos Scans Library',
      aiAllowance: 'Maximum Chaos AI Credits Allowance',
      targetUsers: 'Leading AEC Enterprises, VFX & Film Studios',
      officialUrl: 'https://www.chaos.com/vray/buy-online',
      lastVerified: 'October 2026',
    },
  ],
  freeTrial: {
    eyebrow: 'GET STARTED',
    heading: 'Try V-Ray Free for 30 Days',
    description:
      'Explore V-Ray with the official 30-day free trial offer and evaluate its physically based rendering workflows, creative controls, and host software integrations.',
    trialUrl: 'https://www.chaos.com/vray/trial',
  },
  systemRequirements: {
    eyebrow: 'TECHNICAL COMPATIBILITY',
    heading: 'Check Your System Before You Render',
    description:
      'Rendering performance and compatibility depend on your host application, operating system, GPU architecture, drivers, and selected rendering engine.',
    os: 'Windows 10 / 11 64-bit; macOS Monterey 12.0+ (Apple Silicon supported on compatible integrations); Linux 64-bit (CentOS / RHEL / Ubuntu for Maya/Houdini)',
    hosts: 'Autodesk 3ds Max, Trimble SketchUp, McNeel Rhino, Autodesk Revit, Maxon Cinema 4D, Autodesk Maya, SideFX Houdini, Foundry Nuke, Unreal Engine',
    cpu: 'Intel 64-bit or AMD 64-bit processor with SSE4.2 support (Multi-core Ryzen, Threadripper, Intel Core i7/i9 or Xeon recommended)',
    gpu: 'NVIDIA CUDA and RTX compatible GPU (GeForce RTX 3060 / 4070 / 4080 / 4090 or RTX A4000/A5000/A6000) with latest NVIDIA studio drivers',
    gpuMemory: 'Minimum 8 GB VRAM recommended for GPU rendering; 16 GB+ VRAM recommended for large architectural scenes and complex textures',
    ram: '16 GB RAM minimum; 32 GB to 64 GB+ RAM strongly recommended for large architectural BIM models and complex 3ds Max scenes',
    storage: 'SSD drive with at least 10 GB free space for installation and Chaos Cosmos asset caching',
    officialUrl: 'https://docs.chaos.com/display/VMAX/System+Requirements',
  },
  learning: {
    eyebrow: 'LEARN AND GROW',
    heading: 'Build Your V-Ray Skills with Official Resources',
    description:
      'Master physically based rendering with comprehensive tutorials, verified documentation, sample project scenes, and community discussion boards.',
    resources: [
      { title: 'Chaos Academy', desc: 'Free official learning paths, video courses, and certification curricula.', link: 'https://www.chaos.com' },
      { title: 'Official V-Ray Documentation', desc: 'Comprehensive technical manuals and parameter references for every host integration.', link: 'https://docs.chaos.com' },
      { title: 'Chaos Community Forums', desc: 'Connect with thousands of global 3D artists, share scenes, and get peer advice.', link: 'https://forums.chaos.com' },
      { title: 'ArchViz Deep Dive', desc: 'Specialized masterclasses covering advanced exterior lighting, materials, and Frame Buffer color grading.', link: 'https://www.chaos.com' },
    ],
  },
  gallery: [
    {
      id: 'vgal-1',
      title: 'Minimalist Concrete Residence at Dusk',
      category: 'architecture',
      categoryLabel: 'Architecture',
      caption: 'Physically calculated sunset illumination interacting with board-formed concrete and warm interior cove lighting.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Contemporary residence rendered at dusk in Chaos V-Ray',
      author: 'Studio ArchViz',
    },
    {
      id: 'vgal-2',
      title: 'Scandinavian Living & Dining Space',
      category: 'interiors',
      categoryLabel: 'Interiors',
      caption: 'Natural diffuse daylighting highlighting oak timber textures, linen fabrics, and brass architectural pendants.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      alt: 'Scandinavian interior open-plan space rendered with realistic global illumination',
      author: 'Atelier Interior Architecture',
    },
    {
      id: 'vgal-3',
      title: 'Precision Mechanical Chronograph',
      category: 'product',
      categoryLabel: 'Product Design',
      caption: 'Studio macro render showcasing sapphire crystal caustics, micro-machined gears, and brushed titanium bezel.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury mechanical watch rendered with studio lighting in V-Ray',
      author: 'Product Visualization Lab',
    },
    {
      id: 'vgal-4',
      title: 'Hypercar Studio Aero Study',
      category: 'automotive',
      categoryLabel: 'Automotive',
      caption: 'Multi-layer metallic car paint shader with dynamic clearcoat reflections and carbon fiber aerodynamic diffusers.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-performance supercar rendered in studio environment',
      author: 'Automotive CGI Studio',
    },
    {
      id: 'vgal-5',
      title: 'Biophilic Corporate Atrium',
      category: 'architecture',
      categoryLabel: 'Architecture',
      caption: 'High-density vegetation scattering with millions of instanced leaves rendered smoothly using V-Ray Proxy.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Commercial office atrium with indoor trees rendered in V-Ray',
      author: 'Urban Workspace Designers',
    },
    {
      id: 'vgal-6',
      title: 'Cinematic Ancient Temple Ruins',
      category: 'vfx',
      categoryLabel: 'VFX & Film',
      caption: 'Atmospheric volumetric fog and god rays penetrating through dense tropical jungle canopy onto mossy stone carvings.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      alt: 'Ancient temple environment rendered with atmospheric volumetrics in V-Ray',
      author: 'CGI Environment Artist',
    },
  ],
  faqs: [
    {
      q: 'What is Chaos V-Ray?',
      a: 'V-Ray is professional 3D rendering software developed by Chaos. It is widely considered the industry benchmark for physically based ray tracing, photorealism, and high-end visualization across architecture, product design, visual effects, and feature animation.',
    },
    {
      q: 'Who uses V-Ray?',
      a: 'V-Ray is utilized by architectural visualizers, interior designers, commercial 3D artists, industrial design consultancies, film VFX studios, automotive styling centers, and advertising agencies worldwide.',
    },
    {
      q: 'Which 3D and CAD software does V-Ray integrate with?',
      a: 'V-Ray integrates directly with Autodesk 3ds Max, Trimble SketchUp, McNeel Rhinoceros, Autodesk Revit, Maxon Cinema 4D, Autodesk Maya, SideFX Houdini, Foundry Nuke, and Unreal Engine.',
    },
    {
      q: 'Does V-Ray support GPU rendering?',
      a: 'Yes. V-Ray GPU is engineered specifically to harness the massive compute power of modern graphics hardware, utilizing dedicated NVIDIA RTX ray-tracing cores (RT Cores) and CUDA acceleration for fast interactive look development and production output.',
    },
    {
      q: 'Can V-Ray use both CPU and GPU simultaneously?',
      a: 'Yes. Supported hybrid rendering modes in V-Ray GPU can compute on compatible multi-core CPUs and NVIDIA GPUs at the same time, maximizing all available hardware resources within your workstation.',
    },
    {
      q: 'What is the difference between V-Ray and V-Ray GPU?',
      a: 'V-Ray typically refers to the CPU rendering engine, which can address unlimited system memory for massive scenes and supports deep production features. V-Ray GPU is the dedicated GPU-accelerated engine optimized for speed and interactive rendering on compatible graphics cards. Both engines share material setups and produce photorealistic results.',
    },
    {
      q: 'Can V-Ray render cinematic animations?',
      a: 'Yes. V-Ray features advanced temporal consistency algorithms that eliminate frame-to-frame global illumination flickering during camera and object animations. It supports motion blur, depth of field, and deforming meshes.',
    },
    {
      q: 'Does V-Ray support real-time rendering?',
      a: 'Yes. V-Ray offers interactive viewport rendering across all integrations. Furthermore, V-Ray scenes can be explored in 100% ray-traced real time using Chaos Vantage, which is included in V-Ray Premium and Collection licenses.',
    },
    {
      q: 'What is Chaos Cosmos?',
      a: 'Chaos Cosmos is a built-in content library providing over 18,500 curated, render-ready 3D models, PBR materials, and HDRI skies that can be dragged and dropped directly into your V-Ray scene without manual setup.',
    },
    {
      q: 'Does V-Ray include AI features?',
      a: 'Yes. Applicable V-Ray plans include access to Chaos AI features, including Veras architectural ideation, Text-to-PBR Material synthesis, and neural AI denoising via Intel OIDN and NVIDIA OptiX.',
    },
    {
      q: 'Can V-Ray render on multiple computers across a network?',
      a: 'Yes. V-Ray Distributed Rendering allows you to network multiple computers together so they collaborate on computing buckets for a single high-resolution image, drastically accelerating production deadlines.',
    },
    {
      q: 'Does V-Ray support cloud rendering?',
      a: 'Yes. Chaos Cloud allows you to submit render jobs directly from your CAD or 3D host software to supercomputing cloud clusters with a single click, keeping your local machine free for work.',
    },
    {
      q: 'Is there an official free trial available?',
      a: 'Yes. Chaos provides an official 30-day free trial of V-Ray. You can evaluate the software with full functionality by registering directly on the official Chaos website.',
    },
    {
      q: 'How do I purchase genuine V-Ray licenses in India?',
      a: 'Leniva CAD Solutions provides genuine commercial and educational Chaos V-Ray licenses in India with GST invoicing, floating license setup, volume deployment support, and certified technical onboarding.',
    },
  ],
}
