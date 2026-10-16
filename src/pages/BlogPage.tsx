import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react'
import { blogPosts } from '../data/blogs'
import { getStoredBlogsAsBlogPosts } from '../utils/blogCatalog'
import { BlogPost } from '../types'

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
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
        console.error('Failed to update live blogs', err)
      }
    }
    window.addEventListener('leniva_blogs_catalog_updated', handleUpdate)
    return () => window.removeEventListener('leniva_blogs_catalog_updated', handleUpdate)
  }, [])

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(allPosts.map(b => b.category)))]
  }, [allPosts])

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some(t => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [allPosts, selectedCategory, searchQuery])

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Technical Knowledge Hub</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            CAD, Additive Manufacturing & Metrology Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            In-depth guides, case studies, and practical workflows on reverse engineering, high-speed 3D printing, 3D scanning inspection, and parametric modeling.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search engineering articles..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-semibold ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block">
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-slate-600">
                    By {post.author.name}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-red-600 group-hover:text-red-800 flex items-center space-x-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BlogPage
