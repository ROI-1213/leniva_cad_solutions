export interface CategoryInfo {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  heroBanner: string
  icon: string
  productCount: number
  keyBenefits: string[]
  commonApplications: string[]
}

export const productCategories: CategoryInfo[] = [
  {
    id: 'fdm',
    slug: 'fdm-3d-printers',
    title: 'FDM 3D Printers',
    subtitle: 'Industrial & Professional Fused Deposition Modeling Systems',
    description: 'Professional FDM systems for functional prototypes, jigs, fixtures, tooling, and robust engineering-grade production parts with wide material compatibility.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    icon: 'Printer',
    productCount: 7,
    keyBenefits: [
      'Engineered for continuous 24/7 industrial production',
      'Wide build envelopes from desktop (120mm) to giant format (1000mm)',
      'Compatible with PLA, ABS, PETG, TPU, Nylon, and Carbon-Fiber composites',
      'High-speed kinematic motion options delivering up to 500 mm/s',
    ],
    commonApplications: ['Functional Prototyping', 'Jigs & Fixtures', 'Manufacturing Tooling', 'End-Use Enclosures', 'Automotive Assemblies'],
  },
  {
    id: 'dlp',
    slug: 'dlp-3d-printers',
    title: 'DLP 3D Printers',
    subtitle: 'High-Precision Digital Light Processing Systems',
    description: 'High-precision resin printing solutions engineered for jewellery casting patterns, dental models, micro-fluidics, and intricate engineering components with razor-sharp edges.',
    image: 'https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=800&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1631556097152-c39479cbfeab?auto=format&fit=crop&w=1600&q=80',
    icon: 'Layers',
    productCount: 4,
    keyBenefits: [
      'Industrial UV optical engine with uniform light distribution (>95%)',
      'Ultra-fine pixel pitch for near-invisible layer lines and crisp filigree',
      'Direct castable resin support with zero ash burnout for precious metals',
      'Optimized peeling technology for high-success miniature production',
    ],
    commonApplications: ['Jewellery Master Patterns', 'Dental Crowns & Aligners', 'Micro Engineering', 'Direct Investment Casting', 'Detailed Miniatures'],
  },
  {
    id: 'lcd',
    slug: 'industrial-lcd-3d-printers',
    title: 'Industrial LCD 3D Printers',
    subtitle: 'Ultra-High-Resolution Masked Stereolithography (MSLA)',
    description: 'High-resolution resin printing systems featuring 8K and 16K optical arrays for fine detail, exceptional surface smoothness, and productive batch production.',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1600&q=80',
    icon: 'Box',
    productCount: 2,
    keyBenefits: [
      'Up to 16K ultra-high resolution monochrome masking panels',
      'Uniform collimated matrix light source minimizing optical distortion',
      'High layer-by-layer cure speeds for rapid batch throughput',
      'Dual linear ball-screw Z-axis for maximum dimensional repeatability',
    ],
    commonApplications: ['Precision Engineering Prototypes', 'High-Detail Figurines & Collectibles', 'Jewellery Master Molds', 'Medical Device Components'],
  },
  {
    id: 'scanners',
    slug: '3d-scanners',
    title: '3D Scanners',
    subtitle: 'High-Precision Optical & Laser 3D Digitization',
    description: 'Professional 3D scanning systems for non-contact quality inspection, reverse engineering, legacy part recreation, and digital archiving.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=80',
    icon: 'Scan',
    productCount: 4,
    keyBenefits: [
      'High-precision accuracy down to 0.02 mm',
      'Hybrid blue laser and structured light scanning capabilities',
      'High scan speeds capturing millions of points per second',
      'Direct export to STEP, IGES, and mesh formats for seamless CAD modeling',
    ],
    commonApplications: ['Reverse Engineering', 'Deviation & Quality Inspection', 'Automotive Body Scanning', 'Heritage Preservation', 'Custom Ergonomic Design'],
  },
  {
    id: 'cad',
    slug: 'cad-software',
    title: 'CAD & Engineering Software',
    subtitle: 'Industry-Leading 2D/3D CAD, BIM & Photorealistic Rendering Suites',
    description: 'Official software licensing, deployment, onboarding, and workflow consulting for ARES (Graebert), SketchUp (Trimble), and Chaos (Enscape, V-Ray, Corona).',
    image: '/images/software/sketchup-pro.jpg',
    heroBanner: '/images/software/sketchup-pro.jpg',
    icon: 'Laptop',
    productCount: 12,
    keyBenefits: [
      'Authorized licenses with full technical support & updates',
      'Parametric CAD modeling and mesh-to-NURBS reverse engineering tools',
      'Real-time photorealistic ray-tracing and architectural walk-throughs',
      'Comprehensive corporate team onboarding and certified onboarding',
    ],
    commonApplications: ['Architectural Modeling', 'Photorealistic Rendering', 'Reverse Engineering Scanned Meshes', 'BIM & Interior Design', 'Industrial Product Styling'],
  },
  {
    id: 'materials',
    slug: 'materials',
    title: '3D Printing Materials',
    subtitle: 'High-Performance Engineering Filaments, Resins & Polymers',
    description: 'Extensive portfolio of verified engineering thermoplastics, castable photopolymers, tough biocompatible resins, and specialty carbon-fiber composite materials.',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1600&q=80',
    icon: 'Layers',
    productCount: 16,
    keyBenefits: [
      'Strict dimensional tolerance control (±0.02 mm for filaments)',
      'Verified print profiles optimized for industrial reliability',
      'Certified castable resins with clean, ash-free burnout profiles',
      'High heat deflection and tensile strength formulations',
    ],
    commonApplications: ['High-Strength Structural Parts', 'Jewellery Investment Casting', 'Flexible Gaskets & Seals', 'Functional Test Models'],
  },
]
