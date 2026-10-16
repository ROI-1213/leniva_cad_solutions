import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Printer, Wrench, ShoppingBag, BookOpen } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import { services } from '../data/services'
import { shopItems } from '../data/shop'
import { blogPosts } from '../data/blogs'
import { getStoredProductsAsProducts, getStoredProductsAsShopItems } from '../utils/productCatalog'
import { getStoredBlogsAsBlogPosts } from '../utils/blogCatalog'

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal } = useApp()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isSearchModalOpen])

  const currentProducts = useMemo(() => {
    try {
      return getStoredProductsAsProducts()
    } catch {
      return products
    }
  }, [isSearchModalOpen])

  const currentShop = useMemo(() => {
    try {
      return getStoredProductsAsShopItems()
    } catch {
      return shopItems
    }
  }, [isSearchModalOpen])

  const currentBlogs = useMemo(() => {
    try {
      return getStoredBlogsAsBlogPosts()
    } catch {
      return blogPosts
    }
  }, [isSearchModalOpen])

  if (!isSearchModalOpen) return null

  const cleanQuery = query.toLowerCase().trim()

  const filteredProducts = cleanQuery
    ? currentProducts.filter(
        p =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.technology.toLowerCase().includes(cleanQuery) ||
          p.tagline.toLowerCase().includes(cleanQuery)
      )
    : []

  const filteredServices = cleanQuery
    ? services.filter(
        s =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : []

  const filteredShop = cleanQuery
    ? currentShop.filter(
        item =>
          item.name.toLowerCase().includes(cleanQuery) ||
          item.categoryName.toLowerCase().includes(cleanQuery)
      )
    : []

  const filteredBlogs = cleanQuery
    ? currentBlogs.filter(
        b =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.tags.some(t => t.toLowerCase().includes(cleanQuery))
      )
    : []

  const totalResults =
    filteredProducts.length + filteredServices.length + filteredShop.length + filteredBlogs.length

  const handleSelect = (path: string) => {
    closeSearchModal()
    navigate(path)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 3D printers, scanners, CAD software, services, materials..."
            className="flex-1 text-base bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {!query ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium text-slate-600">Search the Leniva Engineering Directory</p>
              <p className="text-xs text-slate-400">
                Try searching for "Pratham 3 Rapid", "EinScan", "SLA Printing", "SketchUp", or "Carbon Fiber"
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm">No engineering records found matching "<span className="font-semibold">{query}</span>".</p>
              <p className="text-xs text-slate-400 mt-1">Check for typos or contact our support desk for tailored inquiries.</p>
            </div>
          ) : (
            <>
              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    <Printer className="w-3.5 h-3.5 text-red-600" />
                    <span>3D Printers & CAD Hardware ({filteredProducts.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(`/products/${p.slug}`)}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={p.heroImage} alt={p.name} className="w-10 h-10 object-cover rounded-md border border-slate-200" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                              {p.name}
                            </div>
                            <div className="text-xs text-slate-500">{p.technology} • {p.tagline}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Section */}
              {filteredServices.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Engineering Services ({filteredServices.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {filteredServices.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect('/services')}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {s.title}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">{s.shortDescription}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shop Consumables Section */}
              {filteredShop.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Materials & Accessories ({filteredShop.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {filteredShop.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(`/shop`)}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-9 h-9 object-cover rounded-md border border-slate-200" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-500">{item.categoryName}</div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">View in Shop</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Section */}
              {filteredBlogs.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>Technical Articles & Guides ({filteredBlogs.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {filteredBlogs.map(b => (
                      <div
                        key={b.id}
                        onClick={() => handleSelect(`/blog/${b.slug}`)}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                            {b.title}
                          </div>
                          <div className="text-xs text-slate-500">{b.category} • {b.readTime}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default SearchModal
