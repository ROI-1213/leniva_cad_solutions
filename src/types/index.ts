export type ProductTechnology = 
  | 'FDM 3D Printer'
  | 'DLP 3D Printer'
  | 'Industrial LCD'
  | '3D Scanner'
  | 'CAD Software'
  | 'Rendering Softwares'
  | 'Materials & Consumables'
  | 'Accessories'

export interface ProductOverviewCard {
  title: string
  subtitle?: string
  desc?: string
  description?: string
  icon?: string
  image?: string
}

export interface ProductFeatureCard {
  title: string
  subtitle?: string
  category?: string
  badge?: string
  highlight?: string
  desc?: string
  description?: string
  icon?: string
  image?: string
}

export interface ProductShowcaseItem {
  title: string
  category?: string
  material?: string
  specs?: string
  desc?: string
  description?: string
  image: string
}

export interface ProductSupportCard {
  title: string
  desc?: string
  description?: string
}

export interface ProductFaqItem {
  q?: string
  a?: string
  question?: string
  answer?: string
  category?: string
}

export interface ProductLicensingPlan {
  name: string
  badge?: string
  subtitle?: string
  term?: string
  duration?: string
  description?: string
  features: string[]
}

export interface ProductSystemRequirement {
  label?: string
  value?: string
  category?: string
  minimum?: string
  recommended?: string
  notes?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categorySlug: string
  technology: ProductTechnology
  badge?: string
  heroHeading?: string
  heroSubtitle?: string
  tagline: string
  description: string
  shortDescription: string
  heroImage: string
  images: string[]
  keySpecs: { label: string; value: string }[]
  specifications: Record<string, string>
  features: string[]
  featureCards?: ProductFeatureCard[]
  overviewHeading?: string
  overviewDescription?: string
  overviewCards?: ProductOverviewCard[]
  applications: string[]
  materials?: string[]
  whoIsItFor?: string[]
  printGallery?: ProductShowcaseItem[]
  supportCards?: ProductSupportCard[]
  faqs?: ProductFaqItem[]
  licensingPlans?: ProductLicensingPlan[]
  systemRequirements?: ProductSystemRequirement[]
  brochureUrl?: string
  videoUrl?: string
  price?: number
  priceDisplay?: string
  inStock?: boolean
  isNew?: boolean
  isFeatured?: boolean
  relatedProductSlugs?: string[]
}

export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  image: string
  badge?: string
  applications: string[]
  advantages: string[]
  workflow: { step: number; title: string; description: string }[]
  deliverables?: string[]
  supportedMaterials?: string[]
  technologiesUsed?: string[]
}

export interface ShopItem {
  id: string
  slug: string
  name: string
  category: string
  categoryName: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  inStock: boolean
  rating: number
  reviewsCount: number
  shortDescription: string
  weightOrVolume?: string
  colorOptions?: string[]
  specifications: Record<string, string>
  badge?: string
  isQuoteBased?: boolean
  productSlug?: string
  isContain?: boolean
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  author: { name: string; role: string }
  image: string
  excerpt: string
  content: string
  tags: string[]
}

export interface CartItem {
  id: string
  shopItemId: string
  name: string
  price: number
  image: string
  quantity: number
  selectedColor?: string
}

export interface WishlistItem {
  id: string
  type: 'product' | 'shop'
  name: string
  slug: string
  image: string
  category: string
  price?: number
  isQuoteRequired?: boolean
}

export interface QuoteFormData {
  fullName: string
  company: string
  email: string
  phone: string
  productOrService: string
  quantity: string
  application: string
  message: string
}
