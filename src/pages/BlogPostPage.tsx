import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ChevronRight, Calendar, Clock, Share2, Tag } from 'lucide-react'
import { blogPosts } from '../data/blogs'
import { getStoredBlogsAsBlogPosts } from '../utils/blogCatalog'
import { BlogPost } from '../types'

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => {
    try {
      return getStoredBlogsAsBlogPosts()
    } catch {
      return blogPosts
    }
  })

  useEffect(() => {
    const handleUpdate = () => {
      try {
        setAllPosts(getStoredBlogsAsBlogPosts())
      } catch (err) {
        console.error('Failed to update live blogs in detail page', err)
      }
    }
    window.addEventListener('leniva_blogs_catalog_updated', handleUpdate)
    return () => window.removeEventListener('leniva_blogs_catalog_updated', handleUpdate)
  }, [])

  const post = allPosts.find(b => b.slug === slug || b.id === slug)
  const [copied, setCopied] = useState(false)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const relatedPosts = allPosts.filter(b => b.id !== post.id).slice(0, 2)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-slate-900">Blogs</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900 truncate">{post.title}</span>
        </nav>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
          {/* Header Info */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md border border-red-100">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">{post.author.name}</strong>
                    <span className="text-[10px] text-slate-400">{post.author.role}</span>
                  </div>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold relative transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Markdown/Content Body */}
          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <div className="font-semibold text-lg text-slate-900 italic border-l-4 border-red-500 pl-4 py-1">
              {post.excerpt}
            </div>
            <div 
              className="prose prose-slate max-w-none space-y-4 pt-4"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-slate-950 mt-6 mb-2">$1</h3>')
                  .replace(/#### (.*)/g, '<h4 class="text-base font-bold text-slate-900 mt-4 mb-1">$1</h4>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                  .replace(/- (.*)/g, '<li class="ml-4 list-disc text-sm text-slate-600">$1</li>')
                  .replace(/\n\n/g, '<p class="text-sm text-slate-700 leading-relaxed"></p>'),
              }}
            />
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center space-x-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Tags:</span>
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related Articles Strip */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-950">Related Engineering Reads</h3>
            <Link to="/blog" className="text-xs font-semibold text-red-600 hover:underline">View all articles →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map(rel => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-lg transition-all flex items-center space-x-4 group"
              >
                <img src={rel.image} alt={rel.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-red-600">{rel.category}</div>
                  <h4 className="text-xs font-bold text-slate-950 group-hover:text-red-600 line-clamp-2 transition-colors">
                    {rel.title}
                  </h4>
                  <div className="text-[10px] text-slate-400">{rel.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlogPostPage
