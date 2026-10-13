import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ArrowRight, Send } from 'lucide-react'
import { useApp } from '../context/AppContext'

export const WishlistPage: React.FC = () => {
  const { wishlistItems, toggleWishlist, openQuoteModal } = useApp()

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-950">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the heart icon on any 3D printer, scanner, CAD software, or shop consumable to save it for quick review.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors shadow"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Saved Items & Equipment</h1>
          <p className="text-xs text-slate-500 mt-1">Review saved machines, software licenses, or workshop materials.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-rose-600 rounded-full shadow"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white rounded">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-slate-950 line-clamp-2">{item.name}</h3>
                  <div className="text-xs font-semibold text-slate-500">
                    Price on Request
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => openQuoteModal(item.name)}
                  className="w-full py-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default WishlistPage
