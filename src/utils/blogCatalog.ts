import { blogPosts as fallbackBlogs } from '../data/blogs'
import { BlogPost } from '../types'

export const STORAGE_KEY_BLOGS = 'leniva_admin_blogs_catalog'

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
    image: b.image,
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
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {
    console.error('Failed to parse stored blogs', e)
  }
  return buildDefaultBlogs()
}

export function saveStoredBlogItems(items: BlogPostItem[]) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(items))
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
      image: item.image || '/images/showcase/pratham-showcase.png',
      tags: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : [item.category || '3D Printing'],
    }))
}
