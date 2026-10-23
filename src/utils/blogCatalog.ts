import { blogPosts as fallbackBlogs } from '../data/blogs'
import { BlogPost } from '../types'
import blogReverseEngineering from '../assets/blogs/blog-reverse-engineering.jpg'
import blogFdmLcdDlp from '../assets/blogs/blog-fdm-lcd-dlp.jpg'
import blog3dScanningInspection from '../assets/blogs/blog-3d-scanning-inspection.jpg'
import blogCadAdditiveManufacturing from '../assets/blogs/blog-cad-additive-manufacturing.jpg'
import blogIndustrial3dPrinting from '../assets/blogs/blog-industrial-3d-printing.jpg'

export const STORAGE_KEY_BLOGS = 'leniva_admin_blogs_catalog'

export const DEFAULT_BLOG_ASSETS: Record<string, string> = {
  'blog-1': blogReverseEngineering,
  'blog-2': blogFdmLcdDlp,
  'blog-3': blog3dScanningInspection,
  'blog-4': blogCadAdditiveManufacturing,
  'blog-5': blogIndustrial3dPrinting,
}

export const FALLBACK_PUBLIC_BLOG_IMAGES: Record<string, string> = {
  'blog-1': '/images/blogs/blog-reverse-engineering.jpg',
  'blog-2': '/images/blogs/blog-fdm-lcd-dlp.jpg',
  'blog-3': '/images/blogs/blog-3d-scanning-inspection.jpg',
  'blog-4': '/images/blogs/blog-cad-additive-manufacturing.jpg',
  'blog-5': '/images/blogs/blog-industrial-3d-printing.jpg',
}

export function resolveBlogImage(idOrSlug: string, currentImage?: string): string {
  const isDataUrl = typeof currentImage === 'string' && (currentImage.startsWith('data:') || currentImage.startsWith('blob:'))
  const isExternal = typeof currentImage === 'string' && (currentImage.startsWith('http://') || currentImage.startsWith('https://')) && !currentImage.includes('localhost')
  const isCustomPublic = typeof currentImage === 'string' && currentImage.startsWith('/images/')
  
  // Stale Vite bundle hashes (e.g. /assets/blog-reverse-engineering-xyz.jpg or /src/assets/blogs/...)
  const isStaleHash = typeof currentImage === 'string' && (currentImage.includes('/assets/blog-') || currentImage.includes('/src/assets/blogs/'))

  if (isDataUrl || isExternal || isCustomPublic) {
    return currentImage
  }
  if (!isStaleHash && currentImage && currentImage.trim() !== '') {
    return currentImage
  }

  return DEFAULT_BLOG_ASSETS[idOrSlug] || FALLBACK_PUBLIC_BLOG_IMAGES[idOrSlug] || '/images/blogs/blog-reverse-engineering.jpg'
}

export interface BlogPostItem {
  id: string
  slug: string
  title: string
  category: string
  read_time: string
  date: string
  excerpt?: string
  content?: string
  image?: string
  published: boolean
  author?: string
  author_role?: string
  tags?: string[]
}

export function buildDefaultBlogs(): BlogPostItem[] {
  return fallbackBlogs.map(b => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    category: b.category,
    read_time: b.readTime,
    date: b.date,
    excerpt: b.excerpt,
    content: b.content,
    image: resolveBlogImage(b.id, b.image),
    published: true,
    author: typeof b.author === 'string' ? b.author : (b.author?.name || 'Leniva Editorial Team'),
    author_role: typeof b.author === 'object' ? (b.author?.role || 'Additive Application Specialists') : 'Additive Application Specialists',
    tags: b.tags,
  }))
}

export function getStoredBlogItems(): BlogPostItem[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_BLOGS) : null
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: BlogPostItem) => ({
          ...item,
          image: resolveBlogImage(item.id || item.slug, item.image),
        }))
      }
    }
  } catch (e) {
    console.error('Failed to parse stored blogs', e)
  }
  return buildDefaultBlogs()
}

export function saveStoredBlogItems(items: BlogPostItem[]) {
  try {
    if (typeof window !== 'undefined') {
      const sanitized = items.map(item => {
        const isStaleHash = typeof item.image === 'string' && (item.image.includes('/assets/blog-') || item.image.includes('/src/assets/blogs/'))
        if (isStaleHash) {
          return {
            ...item,
            image: FALLBACK_PUBLIC_BLOG_IMAGES[item.id] || FALLBACK_PUBLIC_BLOG_IMAGES[item.slug] || '/images/blogs/blog-reverse-engineering.jpg',
          }
        }
        return item
      })
      localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(sanitized))
      window.dispatchEvent(new Event('leniva_blogs_catalog_updated'))
    }
  } catch (e) {
    console.error('Failed to save blogs to storage', e)
  }
}

export function resetStoredBlogItems(): BlogPostItem[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY_BLOGS)
      window.dispatchEvent(new Event('leniva_blogs_catalog_updated'))
    } catch (e) {}
  }
  return buildDefaultBlogs()
}

export function getStoredBlogsAsBlogPosts(): BlogPost[] {
  const items = getStoredBlogItems()
  return items
    .filter(item => item.published !== false)
    .map(item => ({
      id: item.id,
      slug: item.slug || item.id,
      title: item.title,
      excerpt: item.excerpt || '',
      content: item.content || item.excerpt || '',
      author: {
        name: item.author || 'Leniva Editorial Team',
        role: item.author_role || 'Additive Application Specialists',
      },
      date: item.date || new Date().toISOString().split('T')[0],
      readTime: item.read_time || '5 min read',
      category: item.category || 'General',
      image: resolveBlogImage(item.id || item.slug, item.image),
      tags: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : [item.category || '3D Printing'],
    }))
}
