export interface EkaProductSpec {
  property: string
  value: string
  note?: string
}

export interface EkaResin {
  id: string
  name: string
  tag: string
  pricePerKg: number
  packSizes: string
  description: string
  color: string
  properties: string[]
  application: string
  productLink: string
}

export interface EkaGalleryItem {
  id: string
  title: string
  category: 'rings' | 'bangles' | 'ornamental' | 'casting' | 'mechanical' | 'functional' | 'industrial'
  material: string
  image: string
  notes: string
}

export interface EkaInstallation {
  org: string
  city: string
  sector: string
  model: string
  highlight: string
}

export interface EkaFaq {
  q: string
  a: string
}

// -----------------------------------------------------------------------------
// 1. EKA HT DATA (Jewelry 3D Printer)
// -----------------------------------------------------------------------------
export const ekaHtData = {
  id: 'eka-ht',
  slug: 'eka-ht',
  name: 'EKA HT',
  title: 'EKA HT - Jewelry 3D Printer',
  category: 'Jewelry DLP 3D Printer',
  heroHeadline: 'EKA HT - Jewelry 3D Printer',
  primaryDesc: 'EKA HT is a New Age DLP 3D Printer with Advance Heating Tray Technology.',
  secondaryDesc:
    'EKA HT is a high speed DLP 3D Printer to improve your Jewelry production work by providing High Quality Jewelry wax pieces which can be direct cast into Gold/Silver.',
  platformSize: '130 × 73 × 150 mm',
  primaryApplication: 'Jewelry manufacturing',
  positioning: [
    'High precision Jewelry production',
    'Direct casting',
    'High quality wax patterns',
    'DLP resin printing',
  ],
  warrantyStatement: 'HEAVY DUTY PROJECTOR BASED 3D PRINTER WITH 3 YEARS OF WARRANTY',
  warrantyYears: 3,
  heroImage: '/images/products/eka-ht.png',
  brochureUrl: '/brochures/eka-ht.pdf',

  // Unique HT Features (Section 01, 02, 03)
  features: [
    {
      id: 'heated-tray',
      title: 'Heated Resin Tray',
      tagline: 'Thermal Stabilization for Flawless Wax Reaction',
      desc: 'Heating of resin during the print process improves Resin’s chemical reaction and remains in same state during the print which will reduce Print failures compare to the machine without heated tray. Specially it will helps to avoid print failures in Winter seasons when resin become more viscous.',
      details: [
        'Active temperature monitoring inside vat',
        'Maintains low viscosity for fluid layer recoating',
        'Eliminates winter cold-resin separation and peel delamination',
      ],
    },
    {
      id: 'filter-heater',
      title: 'Filter and Heater',
      tagline: 'Chamber Environmental Control & Air Purification',
      desc: 'Filter and Heater in the Print Chamber removes the moisture and helps for better use of resin. Filter also helps reducing the toxic fumes from print chamber which are generated during print process. This filter ensure betterment of working area.',
      details: [
        'Integrated carbon fume filter purifies indoor studio air',
        'Internal convection heating keeps resin tank at target 30–35°C',
        'Reduces VOC emissions for safe jeweler workbench placement',
      ],
    },
    {
      id: 'easy-leveling',
      title: 'Easy Print head Levelling',
      tagline: 'All-Metal CNC Cut Platform for Non-Technical Operators',
      desc: 'Very Easy Print head Levelling with Stable all Metal CNC cut head. Levelling of print head is very crucial part of DLP 3D Printer. With our advanced design of Print head it becomes very easy for non technical person to operate the machine without any trouble.',
      details: [
        'Precision 4-screw tramming system locks flat perpetually',
        'CNC anodized build surface ensures micro-micron adhesion',
        'Zero calibration drift even after dozens of consecutive print detachments',
      ],
    },
  ],

  targetUsers: ['Designer', 'Casting Provider', 'Manufacturer', 'Individuals'],

  serviceBenefits: [
    { title: 'Dedicated Service Support', desc: 'Direct factory engineering support for your additive operations.' },
    { title: 'Lifetime Free Software Update', desc: 'Continuous slicer enhancements, material resin profiles, and firmware patches.' },
    { title: 'Online Service Support', desc: 'Dedicated WhatsApp and hotline assistance for instant troubleshooting.' },
    { title: 'Proudly Made in India', desc: '100% indigenous design, local assembly, and immediate spare parts dispatch.' },
  ],

  specifications: [
    { property: 'Technology', value: 'DLP Projector' },
    { property: 'Platform Size', value: '130 × 73 × 150 mm' },
    { property: 'XY Resolution', value: '67 Micron' },
    { property: 'Z Resolution', value: '20 to 70 Micron' },
    { property: 'UV Source Life', value: '30,000+ Hours' },
    { property: 'Print Speed', value: 'Up to 2000 Layer/hr*' },
    { property: 'Input Files', value: 'STL / DPF' },
    { property: 'Operating System', value: 'Windows' },
    { property: 'Weight', value: '65 KG' },
    { property: 'Dimension', value: '470 × 450 × 970 mm' },
    { property: 'Print Head', value: 'CNC Anodize Head' },
    { property: 'UV Curing Oven', value: 'Yes Free' },
    { property: 'Resin Tray', value: '2 Tray Included' },
    { property: 'Resin Non Castable', value: '500 Gram Free' },
    { property: 'License Software', value: 'Yes Lifetime' },
    { property: 'Onsite Onboarding', value: 'Yes Free' },
    { property: 'Shipping', value: 'Yes Free' },
    { property: 'Shipping Insurance', value: 'Yes Free' },
  ] as EkaProductSpec[],

  softwareGuarantee:
    'We Provide Genuine License Software for Machine Operating and Slicing with Lifetime Validity and update.',

  faqs: [
    {
      q: 'Is it Indian Made 3D Printer ?',
      a: 'Yes, It is 100% ingenious 3D Printer, Design and Developed in India.',
    },
    {
      q: 'What is the Delivery Time ?',
      a: '7 Days after order confirmation.',
    },
    {
      q: 'Any Onboarding Provided ?',
      a: 'Yes, Onsite Onboarding of Hardware and Software to concern Person.',
    },
    {
      q: 'Any Extra Accessories Required to Run a Machine ?',
      a: 'No, We will supply Complete Package of Accessories and tools to Start your 3D Printing Journey.',
    },
  ] as EkaFaq[],
}

// -----------------------------------------------------------------------------
// 2. EKA XL DATA (Entry-Level Jewelry 3D Printer)
// -----------------------------------------------------------------------------
export const ekaXlData = {
  id: 'eka-xl',
  slug: 'eka-xl',
  name: 'EKA XL',
  title: 'EKA XL - Jewelry 3D Printer',
  category: 'Jewelry DLP 3D Printer',
  heroHeadline: 'EKA XL - Jewelry 3D Printer',
  primaryDesc:
    'EKA XL is best entry level DLP 3D Printer based on LED Projector to start your 3D Printing journey, this is the highly affordable and economical 3D Printer model from whole EKA Series.',
  secondaryDesc:
    'EKA XL is a compact 3D Printer comes with legacy of DLP technology without any compromise in quality of output.',
  platformSize: '125 × 70 × 140 mm',
  primaryApplication: 'Jewelry manufacturing',
  positioningTitle: 'Heavy Duty Projector Based 3D Printer',
  warrantyStatement: '1 Year of Full Warranty',
  warrantyYears: 1,
  heroImage: '/images/products/eka-xl.png',
  brochureUrl: '/brochures/eka-xl.pdf',

  targetUsers: ['Designer', 'Casting Provider', 'Manufacturer', 'Individuals'],

  serviceBenefits: [
    { title: 'Dedicated Service Support', desc: 'Direct factory engineering support for your additive operations.' },
    { title: 'Lifetime Free Software Update', desc: 'Continuous slicer enhancements, material resin profiles, and firmware patches.' },
    { title: 'Online Service Support', desc: 'Dedicated WhatsApp and hotline assistance for instant troubleshooting.' },
    { title: 'Proudly Made in India', desc: '100% indigenous design, local assembly, and immediate spare parts dispatch.' },
  ],

  // IMPORTANT: The live XL page does NOT expose a full table.
  // ONLY verified live-page data:
  verifiedTechnicalData: [
    { property: 'Model', value: 'EKA XL' },
    { property: 'Technology', value: 'DLP / LED Projector' },
    { property: 'Platform Size', value: '125 × 70 × 140 mm' },
    { property: 'Warranty', value: '1 Year of Full Warranty' },
    { property: 'Service Support', value: 'Dedicated Service Support' },
    { property: 'Software Updates', value: 'Lifetime Free Software Update' },
    { property: 'Origin', value: 'Proudly Made in India' },
  ] as EkaProductSpec[],

  faqs: [
    {
      q: 'Is it Indian Made 3D Printer ?',
      a: 'Yes, It is 100% ingenious 3D Printer, Design and Developed in India.',
    },
    {
      q: 'What is the Delivery Time ?',
      a: '7 Days after order confirmation.',
    },
    {
      q: 'Any Onboarding Provided ?',
      a: 'Yes, Onsite Onboarding of Hardware and Software to concern Person.',
    },
    {
      q: 'Any Extra Accessories Required to Run a Machine ?',
      a: 'No, We will supply Complete Package of Accessories and tools to Start your 3D Printing Journey.',
    },
  ] as EkaFaq[],
}

// -----------------------------------------------------------------------------
// 3. EKA XLE DATA (Engineering DLP Resin 3D Printer)
// -----------------------------------------------------------------------------
export const ekaXleData = {
  id: 'eka-xle',
  slug: 'eka-xle',
  name: 'EKA XLE',
  title: 'EKA XLE - Resin 3D Printer',
  category: 'Engineering DLP Resin 3D Printer',
  topHeadline: 'India’s One and Only Resin 3D Printer Designed for Engineering Application',
  subHeadline: 'Made In India, Made for the World.',
  heroTitle: 'EKA XLE - Resin 3D Printer',
  heroDesc:
    'EKA XLE DLP 3D Printer is engineered to redefine precision and efficiency in the realm of engineering prototyping and small-scale manufacturing. Tailored specifically for engineering applications, this cutting-edge printer seamlessly integrates advanced technology with user-friendly design, empowering engineers to bring their ideas to life with unparalleled accuracy and speed.',
  platformSize: '202 × 113 × 200 mm',
  primaryApplication: 'Engineering prototyping & small-scale manufacturing',
  positioningTitle: 'Heavy Duty Projector Based 3D Printer',
  warrantyStatement: '1 Year of Full Warranty',
  warrantyYears: 1,
  heroImage: '/images/products/eka-xle.png',
  brochureUrl: '/brochures/eka-xle.pdf',

  engineeringDescription: {
    paragraph1:
      'The EKA XLE is a resin 3D printer for engineering that delivers industrial-grade precision and reliability for professionals. Designed as a Made in India resin 3D printer, it is ideal for prototyping mechanical parts and product design workflows. With advanced DLP technology, the EKA XLE stands out as a high-precision resin 3D printer built for demanding applications.',
    paragraph2:
      'Whether you are developing engineering-grade components or need a professional 3D printer for product design, this machine offers unmatched performance. The EKA XLE is positioned as a resin 3D printer for mechanical parts and industrial 3D printing solutions.',
  },

  dlpEngine: {
    title: 'DLP Projector Engine',
    desc: 'EKA XLE comes with HD DLP LED Projector engine which is industry leading and high performance system. DLP Projectors are used to cure photosensitive resin layer by layer to create a 3D object. It provides a blend of high resolution, speed, and versatility, making them suitable for applications requiring detailed and precise models. Compared to LCD and SLA 3D Printer it gives high speed and more precise work.',
    workflow: [
      { step: '01', title: 'DLP PROJECTOR', desc: 'Industrial UV LED digital light processing optical engine' },
      { step: '02', title: 'RESIN LAYER', desc: 'Controlled microns-thin engineering photopolymer recoating' },
      { step: '03', title: 'UV CURING', desc: 'Instantaneous planar pixel curing across entire layer area' },
      { step: '04', title: '3D OBJECT', desc: 'Isotropic, high-density mechanical component with glass-smooth finish' },
    ],
  },

  serviceBenefits: [
    { title: 'Dedicated Service Support', desc: 'Direct factory engineering support for your additive operations.' },
    { title: 'Lifetime Free Software Update', desc: 'Continuous slicer enhancements, material resin profiles, and firmware patches.' },
    { title: 'Online Service Support', desc: 'Dedicated WhatsApp and hotline assistance for instant troubleshooting.' },
    { title: 'Proudly Made in India', desc: '100% indigenous design, local assembly, and immediate spare parts dispatch.' },
  ],

  specifications: [
    { property: 'Technology', value: 'DLP Projector' },
    { property: 'Platform Size', value: '202 × 113 × 200 mm' },
    { property: 'XY Resolution', value: '48 Micron' },
    { property: 'Z Resolution', value: '20 to 70 Micron' },
    { property: 'UV Source Life', value: '20,000+ Hours' },
    { property: 'Print Speed', value: 'Up to 1500 Layer/hr*' },
    { property: 'Input Files', value: 'STL' },
    { property: 'Operating System', value: 'Windows' },
    { property: 'Weight', value: '40 KG' },
    { property: 'Dimension', value: '400 × 380 × 790 mm' },
    { property: 'Print Head', value: 'CNC Anodize Head' },
    { property: 'UV Curing Oven', value: 'Yes Free' },
    { property: 'Resin Tray', value: '1 Tray' },
    { property: 'License Software', value: 'Yes Lifetime' },
    { property: 'Onsite Onboarding', value: 'Yes Free' },
    { property: 'Shipping', value: 'Yes Free' },
    { property: 'Shipping Insurance', value: 'Yes Free' },
  ] as EkaProductSpec[],

  // 10 Supported Resins with editable brochure prices
  supportedResins: [
    {
      id: 'tough',
      name: 'Tough Resin',
      tag: 'General Engineering',
      pricePerKg: 5500,
      packSizes: '500g & 1000g',
      description: 'Durable polymer with high tensile strength and moderate elongation at break for mechanical enclosures.',
      color: 'Dark Gray / Opaque',
      properties: ['Tensile: 45 MPa', 'Elongation: 12%', 'Impact: 28 J/m'],
      application: 'Electronic housings, snap-fit assemblies, brackets',
      productLink: '/products/resins',
    },
    {
      id: 'tough-pro',
      name: 'Tough Pro',
      tag: 'High Impact',
      pricePerKg: 8000,
      packSizes: '500g & 1000g',
      description: 'Formulated for severe drop resistance and cyclic mechanical stress in demanding assemblies.',
      color: 'Charcoal Black',
      properties: ['Tensile: 52 MPa', 'Elongation: 18%', 'Impact: 38 J/m'],
      application: 'Robotic grippers, gears, functional automotive prototypes',
      productLink: '/products/resins',
    },
    {
      id: 'tough-flexible',
      name: 'Tough Flexible',
      tag: 'Elastomer / Bending',
      pricePerKg: 9500,
      packSizes: '500g & 1000g',
      description: 'Simulates semi-rigid polypropylene with elastic rebound and cyclic flexural endurance.',
      color: 'Semi-Translucent',
      properties: ['Shore: 80D', 'Flexural Yield: 65 MPa', 'Fatigue Resistant'],
      application: 'Living hinges, flexible couplings, wearable prototypes',
      productLink: '/products/resins',
    },
    {
      id: 'standard-model',
      name: 'Standard Model',
      tag: 'High Resolution Draft',
      pricePerKg: 4000,
      packSizes: '500g & 1000g',
      description: 'High-detail prototyping photopolymer designed for rapid visual confirmation and dimensional inspection.',
      color: 'Matte Gray / Beige',
      properties: ['Resolution: 48μm', 'Fast Curing', 'Ultra-clean edges'],
      application: 'Aesthetic mockups, ergonomic reviews, tooling masters',
      productLink: '/products/resins',
    },
    {
      id: 'high-temperature',
      name: 'High Temperature',
      tag: 'Thermal Resistance',
      pricePerKg: 9500,
      packSizes: '500g & 1000g',
      description: 'Withstands heat deflection up to 238°C at 0.45 MPa, ideal for hot fluid testing and thermoforming molds.',
      color: 'Amber Translucent',
      properties: ['HDT: 238°C', 'Stiffness: 3.5 GPa', 'Thermal Stability'],
      application: 'Hot gas ducting, low-pressure injection tooling, bake tests',
      productLink: '/products/resins',
    },
    {
      id: 'pla-pro',
      name: 'PLA Pro',
      tag: 'Rigid & Crisp',
      pricePerKg: 5500,
      packSizes: '500g & 1000g',
      description: 'Stiff and dimensionally stable photopolymer with zero shrinkage for architectural and fitment tests.',
      color: 'Bright White',
      properties: ['Tensile: 55 MPa', 'Zero Warp', 'Smooth Surface'],
      application: 'Architectural scale models, master gauges, display parts',
      productLink: '/products/resins',
    },
    {
      id: 'abs-pro',
      name: 'ABS Pro',
      tag: 'Simulated ABS',
      pricePerKg: 7000,
      packSizes: '500g & 1000g',
      description: 'Accurately mimics production-grade injection-molded ABS with balanced toughness, drillability, and tap strength.',
      color: 'Industrial Black / White',
      properties: ['Tensile: 48 MPa', 'Machinable', 'Tappable Threads'],
      application: 'Automotive interior components, appliance validation',
      productLink: '/products/resins',
    },
    {
      id: 'nylon-pro',
      name: 'Nylon Pro',
      tag: 'Wear Resistant',
      pricePerKg: 8500,
      packSizes: '500g & 1000g',
      description: 'Self-lubricating low-friction polymer designed for bearing surfaces, sliding bushings, and guide cams.',
      color: 'Natural Off-White',
      properties: ['Low Friction', 'Abrasion Resistant', 'High Elongation'],
      application: 'Bushings, drive sprockets, sliding mechanisms, conveyor cams',
      productLink: '/products/resins',
    },
    {
      id: 'tpu-rubber',
      name: 'TPU Rubber',
      tag: 'True Elastomer',
      pricePerKg: 9000,
      packSizes: '500g & 1000g',
      description: 'True elastomeric photopolymer with high elongation and tear strength mimicking vulcanized rubber.',
      color: 'Black / Translucent',
      properties: ['Shore: 70A', 'Elongation: >220%', 'Tear: 32 kN/m'],
      application: 'Gaskets, O-rings, vibration dampeners, soft touch grips',
      productLink: '/products/resins',
    },
    {
      id: 'ceramic-pro',
      name: 'Ceramic Pro',
      tag: 'Ultra-High Modulus',
      pricePerKg: 13000,
      packSizes: '500g & 1000g',
      description: 'Ceramic-nanoparticle reinforced resin offering stone-like rigidity, high chemical resistance, and dielectrics.',
      color: 'Porcelain White',
      properties: ['Modulus: 8.5 GPa', 'Chemical Proof', 'Flame Retardant'],
      application: 'High-voltage insulators, chemical fluid manifolds, microfluidics',
      productLink: '/products/resins',
    },
  ] as EkaResin[],

  faqs: [
    {
      q: 'Is it Indian Made 3D Printer ?',
      a: 'Yes, It is 100% ingenious 3D Printer, Design and Developed in India.',
    },
    {
      q: 'What is the Delivery Time ?',
      a: '7 Days after order confirmation.',
    },
    {
      q: 'Any Onboarding Provided ?',
      a: 'Yes, Onsite Onboarding of Hardware and Software to concern Person.',
    },
    {
      q: 'Any Extra Accessories Required to Run a Machine ?',
      a: 'No, We will supply Complete Package of Accessories and tools to Start your 3D Printing Journey.',
    },
  ] as EkaFaq[],
}

// -----------------------------------------------------------------------------
// WORK / GALLERY DATA (Jewelry vs Engineering)
// -----------------------------------------------------------------------------
export const jewelryWorkGallery: EkaGalleryItem[] = [
  {
    id: 'jw-1',
    title: 'Filigree Diamond Solitaire Ring Pattern',
    category: 'rings',
    material: 'Direct Castable Wax Resin',
    image: '/images/jewelry/jewelry-filigree-ring.jpg',
    notes: 'Micro-prong setting claws printed with zero ash residue burn-out.',
  },
  {
    id: 'jw-2',
    title: 'Intricate Traditional Indian Bangle',
    category: 'bangles',
    material: 'High-Precision Castable Wax',
    image: '/images/jewelry/jewelry-indian-bangle.jpg',
    notes: 'Complex floral lattice pattern spanning 65 mm inner diameter.',
  },
  {
    id: 'jw-3',
    title: 'Micro-Pave Halo Pendant',
    category: 'ornamental',
    material: 'Direct Castable Wax Resin',
    image: '/images/jewelry/jewelry-micro-pave-pendant.jpg',
    notes: 'Over 120 stone seatings rendered with razor-sharp 25-micron edges.',
  },
  {
    id: 'jw-4',
    title: 'High-Density Casting Tree Cluster',
    category: 'casting',
    material: 'Wax Polymer Blend',
    image: '/images/jewelry/jewelry-casting-tree.jpg',
    notes: 'Batch of 32 ring patterns arrayed on a single build plate in 1.5 hours.',
  },
  {
    id: 'jw-5',
    title: 'Modern Geometric Signet Ring',
    category: 'rings',
    material: 'Direct Castable Wax Resin',
    image: '/images/jewelry/jewelry-signet-ring.jpg',
    notes: 'Mirror-flat top facet with zero visible layer stepping under 10x loupe.',
  },
  {
    id: 'jw-6',
    title: 'Temple Jewelry Peacock Brooch',
    category: 'ornamental',
    material: 'Jewelry Wax Polymer',
    image: '/images/jewelry/jewelry-peacock-brooch.jpg',
    notes: 'Delicate feather textures and hollow undercuts for gold casting.',
  },
]

export const engineeringWorkGallery: EkaGalleryItem[] = [
  {
    id: 'eng-2',
    title: 'Precision Planetary Gearbox Core',
    category: 'mechanical',
    material: 'Tough Pro Resin',
    image: '/images/ekaxle/ekaxle-planetary-gearbox.jpg',
    notes: 'Involute tooth profile with 48-micron XY accuracy for silent mechanical engagement.',
  },
  {
    id: 'eng-6',
    title: 'Automotive Snap-Fit Bezel Clip',
    category: 'mechanical',
    material: 'Tough Resin',
    image: '/images/ekaxle/ekaxle-automotive-clip.jpg',
    notes: 'High-fatigue cantilever arm withstands repeated assembly insertion testing.',
  },
]

// -----------------------------------------------------------------------------
// RECENT INSTALLATIONS (Shared across EKA family)
// -----------------------------------------------------------------------------
export const ekaInstallations: EkaInstallation[] = [
  {
    org: 'Zaveri Bazaar Master Casting Studio',
    city: 'Mumbai, Maharashtra',
    sector: 'Precious Gold & Diamond Jewelry',
    model: 'EKA HT / EKA XL',
    highlight: 'Daily high-density wax casting trees cast directly into 18K/22K gold',
  },
  {
    org: 'Leading Diamond Export Foundry',
    city: 'Surat, Gujarat',
    sector: 'High-Volume Export Manufacturing',
    model: 'EKA HT (Dual Unit Facility)',
    highlight: '24/7 continuous wax pattern production with zero-ash burnout',
  },
  {
    org: 'Autonomous Micro-Engineering Lab',
    city: 'Bengaluru, Karnataka',
    sector: 'Robotics & Precision Sensors',
    model: 'EKA XLE Engineering',
    highlight: 'Rapid functional testing of microfluidic manifolds & tough housings',
  },
  {
    org: 'Heritage Temple Ornament Designers',
    city: 'Coimbatore, Tamil Nadu',
    sector: 'Fine Filigree & Temple Artifacts',
    model: 'EKA XL Jewelry',
    highlight: 'Intricate micro-prong setting rings and hollow bangles',
  },
  {
    org: 'Defense Polymer Research Facility',
    city: 'Hyderabad, Telangana',
    sector: 'Advanced Materials R&D',
    model: 'EKA XLE Engineering',
    highlight: 'High-temperature & ceramic-loaded resin component evaluation',
  },
  {
    org: 'Appliance Prototype Proving Ground',
    city: 'Pune, Maharashtra',
    sector: 'Consumer Electronics & Fixtures',
    model: 'EKA XLE Engineering',
    highlight: 'Direct ABS-mimic snap fit validation and master silicone molds',
  },
]
