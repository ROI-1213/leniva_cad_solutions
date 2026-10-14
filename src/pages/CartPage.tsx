import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'

export const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, openQuoteModal } = useApp()

  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-950">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Browse our consumables, resins, filaments, and replacement accessories to stock up your workshop.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
          >
            <span>Explore Shop Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-rose-600 font-semibold"
          >
            Clear All Items
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {cartItems.map(item => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{item.name}</h3>
                    {item.selectedColor && (
                      <span className="text-[11px] text-slate-500 block">Color: {item.selectedColor}</span>
                    )}
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">
                      Quote on Request
                    </span>
                  </div>
                </div>

                {/* Quantity and Subtotal */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-slate-100 text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-xs font-semibold text-slate-600 w-28 text-right">
                    Quote on Request
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">Quote Request Summary</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Selected Items:</span>
                <span className="font-semibold text-slate-900">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} units</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Order Model:</span>
                <span className="font-semibold text-slate-900">Custom Commercial Quote</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Pan-India Fulfillment:</span>
                <span className="font-semibold text-emerald-600 uppercase text-[10px]">Express Logistics</span>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                All orders are confirmed via official proforma invoice with applicable GST and corporate volume discounts.
              </div>
            </div>

            <button
              onClick={() => openQuoteModal(`Cart Inquiry (${cartItems.map(i => `${i.name} x${i.quantity}`).join(', ')})`)}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Request Consolidated Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tax Invoice with Input GST Credit Provided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage
