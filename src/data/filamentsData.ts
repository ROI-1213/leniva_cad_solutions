// Make3D 3D Printer Filament Product Data
// 8 main products: PLA White + 7 PLA+ colors
import filamentWhite from '../assets/filaments/filament-white.png'
import filamentGreySilver from '../assets/filaments/filament-grey-silver.png'
import filamentGold from '../assets/filaments/filament-gold.png'
import filamentOrange from '../assets/filaments/filament-orange.png'
import filamentYellow from '../assets/filaments/filament-yellow.png'
import filamentBlue from '../assets/filaments/filament-blue.png'
import filamentBlack from '../assets/filaments/filament-black.png'
import filamentRed from '../assets/filaments/filament-red.png'

export interface FilamentProduct {
  id: string
  slug: string
  name: string
  material: 'PLA' | 'PLA+'
  color: string
  colorHex: string          // For CSS color swatch display
  diameter: string
  weight: string
  price: number
  originalPrice: number
  rating: number
  reviewsCount: number
  badge?: string
  inStock: boolean
  image: string             // Spool image path
  shortDescription: string
  description: string
  printTemp: string
  bedTemp: string
  applications: string[]
  suitableFor: string[]
  features: string[]
  specifications: Record<string, string>
}

export const filamentProducts: FilamentProduct[] = [
  // ─── 1. PLA White ───────────────────────────────────────────────
  {
    id: 'filament-pla-white',
    slug: 'pla-white-1kg-175mm',
    name: 'PLA 3D Printer Filament – White',
    material: 'PLA',
    color: 'White',
    colorHex: '#F5F5F0',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 5.0,
    reviewsCount: 5,
    badge: 'Most Popular',
    inStock: true,
    image: filamentWhite,
    shortDescription: 'Easy-to-print, versatile PLA filament for everyday 3D printing. Smooth surface finish and reliable extrusion for beginners and professionals.',
    description:
      'Make3D PLA (Polylactic Acid) White is the go-to filament for everyday 3D printing. Made from renewable cornstarch-based materials, PLA offers minimal warping, excellent first-layer adhesion, and a smooth, clean surface finish. Ideal for beginners and professionals alike, this 1 KG spool delivers consistent, clog-free extrusion throughout.',
    printTemp: '190°C – 220°C',
    bedTemp: '50°C – 60°C',
    applications: [
      'Prototypes & Concept Models',
      'Educational Projects',
      'Decorative Parts & Figurines',
      'Architectural Models',
      'Functional Prints',
      'Creative & Hobby Projects',
    ],
    suitableFor: ['Beginners', 'Students', 'Educators', 'Makers', 'Designers', 'Professionals'],
    features: [
      'Easy to print – minimal calibration needed',
      'Low printing temperature (190°C–220°C)',
      'Smooth, consistent surface finish',
      'Good dimensional consistency (±0.03 mm)',
      'Eco-friendly biodegradable material',
      'Compatible with all 1.75 mm FDM printers',
      'Vacuum-sealed packaging with desiccant',
    ],
    specifications: {
      Material: 'PLA (Polylactic Acid)',
      Colour: 'White',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG (2.2 lbs)',
      'Printing Temperature': '190°C – 220°C',
      'Bed Temperature': '50°C – 60°C',
      'Printing Technology': 'FDM / FFF',
      'Application': 'Prototyping / Models / Functional Prints',
      'User Level': 'Beginner / Professional',
      'Spool Diameter': '200 mm',
      'Spool Hub Diameter': '50 mm',
      Packaging: 'Vacuum-sealed bag with silica gel desiccant',
    },
  },

  // ─── 2. PLA+ Grey / Silver ──────────────────────────────────────
  {
    id: 'filament-plaplus-grey',
    slug: 'plaplus-grey-silver-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Grey / Silver',
    material: 'PLA+',
    color: 'Grey / Silver',
    colorHex: '#9E9E9E',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.8,
    reviewsCount: 176,
    badge: 'Enhanced Toughness',
    inStock: true,
    image: filamentGreySilver,
    shortDescription: 'Enhanced PLA+ in Grey/Silver for stronger, tougher printed parts. Better impact resistance and smoother finish than standard PLA.',
    description:
      'Make3D PLA+ Grey/Silver is an enhanced-formula PLA designed for users who need more from their prints. With improved impact resistance, higher stiffness, and a clean metallic-grey appearance, PLA+ is perfect for functional prototypes, casing shells, and snap-fit components.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Functional Prototypes',
      'Snap-Fit Components',
      'Casing Shells & Enclosures',
      'Durable Models',
      'Engineering Parts',
      'General FDM Printing',
    ],
    suitableFor: ['Beginners', 'Makers', 'Designers', 'Engineers', 'Professionals'],
    features: [
      'Better strength than standard PLA',
      'Improved impact resistance',
      'Smoother matte-metallic surface finish',
      'Consistent extrusion performance',
      'Reliable printing with minimal stringing',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Grey / Silver',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 3. PLA+ Gold ───────────────────────────────────────────────
  {
    id: 'filament-plaplus-gold',
    slug: 'plaplus-gold-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Gold',
    material: 'PLA+',
    color: 'Gold',
    colorHex: '#D4AF37',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 132,
    badge: 'Premium Look',
    inStock: true,
    image: filamentGold,
    shortDescription: 'PLA+ in rich metallic Gold for decorative models and visually stunning prototypes. Better strength and smooth finish than standard PLA.',
    description:
      'Make3D PLA+ Gold delivers a striking metallic-gold appearance combined with the enhanced mechanical properties of PLA+. Perfect for decorative sculptures, award models, jewellery prototypes, and any application where aesthetics matter as much as strength.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Decorative Models & Sculptures',
      'Award & Trophy Prototypes',
      'Jewellery Design Models',
      'Visually Appealing Prototypes',
      'Architectural Detail Models',
      'General FDM Printing',
    ],
    suitableFor: ['Beginners', 'Designers', 'Jewellers', 'Artists', 'Professionals'],
    features: [
      'Rich metallic-gold appearance',
      'Better strength than standard PLA',
      'Smooth consistent surface finish',
      'Low warping for dimensional accuracy',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Gold',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 4. PLA+ Orange ─────────────────────────────────────────────
  {
    id: 'filament-plaplus-orange',
    slug: 'plaplus-orange-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Orange',
    material: 'PLA+',
    color: 'Orange',
    colorHex: '#FF6B2B',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.7,
    reviewsCount: 98,
    inStock: true,
    image: filamentOrange,
    shortDescription: 'Vibrant Orange PLA+ for colorful models and prototypes with improved strength and reliable printing performance vs standard PLA.',
    description:
      'Make3D PLA+ Orange brings vibrant energy to your 3D prints. With improved strength over standard PLA and reliable, consistent extrusion, this bright orange filament is ideal for attention-grabbing prototypes, colourful decorative parts, safety-indicator components, and creative projects.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Colourful Models & Prototypes',
      'Safety Indicator Components',
      'Decorative Parts',
      'Creative Projects',
      'Educational Prints',
      'General FDM Printing',
    ],
    suitableFor: ['Beginners', 'Makers', 'Students', 'Designers', 'Professionals'],
    features: [
      'Vibrant, consistent orange color',
      'Better strength than standard PLA',
      'Smooth surface finish',
      'Reliable, clog-free extrusion',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Orange',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 5. PLA+ Yellow ─────────────────────────────────────────────
  {
    id: 'filament-plaplus-yellow',
    slug: 'plaplus-yellow-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Yellow',
    material: 'PLA+',
    color: 'Yellow',
    colorHex: '#FFD600',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.7,
    reviewsCount: 87,
    inStock: true,
    image: filamentYellow,
    shortDescription: 'Bright Yellow PLA+ for vibrant models and decorative prints with improved strength and consistent performance over standard PLA.',
    description:
      'Make3D PLA+ Yellow is the go-to choice for bright, eye-catching prints. Whether you are making educational models, signage prototypes, or decorative pieces, this vibrant yellow filament provides excellent color consistency, smooth surface quality, and the enhanced toughness of PLA+.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Vibrant Decorative Models',
      'Educational Prints',
      'Signage & Display Prototypes',
      'Creative Hobby Projects',
      'Visual Models',
      'General FDM Printing',
    ],
    suitableFor: ['Beginners', 'Students', 'Makers', 'Designers', 'Professionals'],
    features: [
      'Bright, consistent yellow color',
      'Better strength than standard PLA',
      'Smooth print surface',
      'Minimal warping',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Yellow',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 6. PLA+ Blue ───────────────────────────────────────────────
  {
    id: 'filament-plaplus-blue',
    slug: 'plaplus-blue-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Blue',
    material: 'PLA+',
    color: 'Blue',
    colorHex: '#1565C0',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.8,
    reviewsCount: 143,
    badge: 'Best Seller',
    inStock: true,
    image: filamentBlue,
    shortDescription: 'Classic Blue PLA+ for decorative models and functional prototypes. Better strength, smooth finish and consistent printing performance.',
    description:
      'Make3D PLA+ Blue is a perennial bestseller—combining the enhanced mechanical properties of PLA+ with a rich, consistent blue colour. Suitable for functional prototypes, creative models, and decorative parts where both performance and appearance matter.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Decorative Models',
      'Functional Prototypes',
      'Creative Projects',
      'Engineering Parts',
      'Display Models',
      'General-Purpose FDM Printing',
    ],
    suitableFor: ['Beginners', 'Makers', 'Designers', 'Engineers', 'Professionals'],
    features: [
      'Rich, consistent blue color',
      'Better strength than standard PLA',
      'Smooth surface finish',
      'Reliable dimensional consistency',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Blue',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 7. PLA+ Black ──────────────────────────────────────────────
  {
    id: 'filament-plaplus-black',
    slug: 'plaplus-black-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Black',
    material: 'PLA+',
    color: 'Black',
    colorHex: '#212121',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.9,
    reviewsCount: 189,
    badge: 'Top Rated',
    inStock: true,
    image: filamentBlack,
    shortDescription: 'Professional Black PLA+ for durable prototypes and functional models. Better strength and consistent performance vs standard PLA.',
    description:
      'Make3D PLA+ Black is the professional choice, delivering a deep, uniform matte-black finish with the enhanced toughness and impact resistance of PLA+. Perfect for engineering prototypes, durable functional parts, product casings, and any application where a premium, professional appearance is essential.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Durable Prototypes',
      'Functional Models & Parts',
      'Product Casing Shells',
      'Engineering Components',
      'Decorative Parts',
      'General-Purpose Printing',
    ],
    suitableFor: ['Beginners', 'Engineers', 'Designers', 'Product Developers', 'Professionals'],
    features: [
      'Deep, uniform matte-black finish',
      'Better strength than standard PLA',
      'Excellent surface quality',
      'Consistent diameter for clog-free extrusion',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Black',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },

  // ─── 8. PLA+ Red ────────────────────────────────────────────────
  {
    id: 'filament-plaplus-red',
    slug: 'plaplus-red-1kg-175mm',
    name: 'PLA+ 3D Printer Filament – Red',
    material: 'PLA+',
    color: 'Red',
    colorHex: '#D32F2F',
    diameter: '1.75 mm',
    weight: '1 KG',
    price: 0,
    originalPrice: 0,
    rating: 4.8,
    reviewsCount: 121,
    inStock: true,
    image: filamentRed,
    shortDescription: 'Vibrant Red PLA+ for striking prototypes and decorative models. Improved strength, smooth finish and reliable printing performance.',
    description:
      'Make3D PLA+ Red combines vibrant, eye-catching colour with the enhanced toughness of PLA+. Whether you are printing creative hobby models, functional prototypes, or decorative parts, this bright red filament delivers reliable, consistent results with superior strength compared to standard PLA.',
    printTemp: '205°C – 225°C',
    bedTemp: '55°C – 65°C',
    applications: [
      'Vibrant Prototypes',
      'Decorative Models',
      'Functional Prints',
      'Creative Applications',
      'Educational Projects',
      'General FDM Printing',
    ],
    suitableFor: ['Beginners', 'Makers', 'Designers', 'Students', 'Professionals'],
    features: [
      'Vibrant, saturated red color',
      'Better strength than standard PLA',
      'Smooth surface finish',
      'Minimal warping',
      'Wide FDM printer compatibility',
    ],
    specifications: {
      Material: 'PLA+ (Enhanced PLA)',
      Colour: 'Red',
      'Filament Diameter': '1.75 mm ± 0.03 mm',
      'Net Weight': '1 KG',
      'Printing Temperature': '205°C – 225°C',
      'Bed Temperature': '55°C – 65°C',
      'Printing Technology': 'FDM / FFF',
      'User Level': 'Beginner / Professional',
    },
  },
]

// ─── PLA vs PLA+ comparison data ───────────────────────────────────
export const plaComparison = {
  pla: {
    label: 'PLA',
    tagline: 'Easy-Print Standard',
    description:
      'PLA (Polylactic Acid) is a plant-based biodegradable polymer. It is the easiest FDM material to print — low temperatures, minimal warping, and reliable surface finish make it the perfect first filament for beginners or the go-to material for concept models and decorative prints.',
    pros: [
      'Lowest printing temperature (190°C–220°C)',
      'No enclosure required — minimal warping',
      'Biodegradable & eco-friendly',
      'Smooth surface finish',
      'Ideal for beginners',
    ],
    bestFor: [
      'Beginners',
      'Educational projects',
      'Concept models',
      'Decorative objects',
      'Prototypes',
    ],
  },
  plaplus: {
    label: 'PLA+',
    tagline: 'Enhanced Performance',
    description:
      'PLA+ is an enhanced-formula PLA with improved additives that increase impact resistance, stiffness, and toughness over standard PLA — while retaining the same ease of printing. PLA+ is the upgrade path for users who need functional, durable parts without moving to engineering materials like PETG or ABS.',
    pros: [
      'Higher impact resistance than standard PLA',
      'Better stiffness and toughness',
      'Smoother, more professional surface finish',
      'Still easy to print — no enclosure needed',
      'Suitable for functional parts',
    ],
    bestFor: [
      'Functional prototypes',
      'Snap-fit components',
      'Durable models',
      'Professional-looking prints',
      'Beginners wanting an upgrade',
    ],
  },
}

// ─── Common specs for the full range ───────────────────────────────
export const commonFilamentSpecs = {
  diameter: '1.75 mm',
  weight: '1 KG',
  technology: 'FDM / FFF',
  compatibility: 'All major FDM 3D printers (Pratham series, Creality, Bambu, Prusa, etc.)',
  packaging: 'Vacuum-sealed with silica gel desiccant',
}

// ─── Application cards shown on the category page ──────────────────
export const filamentApplications = [
  {
    icon: '🖨️',
    title: 'Prototyping',
    description: 'Create fast, accurate concept models and product prototypes to validate design ideas.',
  },
  {
    icon: '🎓',
    title: 'Education',
    description: 'Suitable for schools, colleges, maker spaces, and STEM learning projects.',
  },
  {
    icon: '⚙️',
    title: 'Functional Parts',
    description: 'PLA+ can produce stronger everyday components like brackets, clips, and enclosures.',
  },
  {
    icon: '🎨',
    title: 'Decorative Models',
    description: 'Create detailed figurines, art objects, architectural details, and display models.',
  },
  {
    icon: '🏭',
    title: 'Product Development',
    description: 'Rapidly iterate on product designs with production-representative models.',
  },
  {
    icon: '✨',
    title: 'Creative Hobbies',
    description: 'Ideal for makers, hobbyists, cosplayers, and DIY enthusiasts.',
  },
]
