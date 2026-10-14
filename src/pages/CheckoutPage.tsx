import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'

export const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useApp()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    gstNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'bank_transfer',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-12">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center border border-slate-200 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Purchase Order Generated!</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Order Reference: <strong className="text-slate-900">#LEN-{(Date.now() % 100000)}</strong>. A commercial proforma invoice has been dispatched to <span className="font-semibold text-slate-800">{formData.email || 'your email address'}</span>. Our dispatch logistics desk will reach out for fulfillment confirmation.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/cart" className="text-xs font-bold text-red-600 hover:underline flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping Cart</span>
          </Link>
          <span className="text-xs text-slate-400">Secure 256-Bit SSL Checkout</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Billing and Shipping Information */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-3">
              Shipping & Tax Invoicing Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Primary contact"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">GSTIN Number (Optional for Tax Credit)</label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="27AAAAA0000A1Z5"
                  className="w-full p-2.5 border rounded-lg outline-none uppercase"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Shipping Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Factory / Office address, Street, Landmark"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City / Hub"
                  className="w-full p-2.5 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">State & PIN Code *</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full p-2.5 border rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full p-2.5 border rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-sm font-bold text-slate-950">Select Commercial Settlement Method</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="p-3 border rounded-xl flex items-center space-x-3 cursor-pointer bg-slate-50 border-red-300">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong className="block text-slate-900">Direct Corporate NEFT / RTGS</strong>
                    <span className="text-slate-500 text-[10px]">Official bank transfer upon proforma generation</span>
                  </div>
                </label>

                <label className="p-3 border rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi_card"
                    checked={formData.paymentMethod === 'upi_card'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong className="block text-slate-900">Corporate Card / UPI / NetBanking</strong>
                    <span className="text-slate-500 text-[10px]">Instant payment link sent upon confirmation</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">
              Order Review ({cartItems.length} Items)
            </h3>

            <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto text-xs">
              {cartItems.map(item => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div className="pr-2">
                    <strong className="block text-slate-900 truncate max-w-[180px]">{item.name}</strong>
                    <span className="text-slate-400 text-[10px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-slate-500">
                    Quote on Request
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Billing Model:</span>
                <span className="font-semibold text-slate-900">Official Proforma Quote</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST Invoicing:</span>
                <span className="font-semibold text-slate-900">Included on Dispatch</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Freight:</span>
                <span className="font-bold text-emerald-600 uppercase text-[10px]">FREE PAN-INDIA</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-slate-950">
                <span>Terms:</span>
                <span>Proforma Verification</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Generate Official Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CheckoutPage
