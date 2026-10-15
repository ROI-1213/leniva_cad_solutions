import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Save,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  Eye,
  ShoppingBag,
} from 'lucide-react'
import {
  MasterNavigationConfig,
  CadMegaProduct,
  HardwareMegaProduct,
  getStoredNavigationConfig,
  saveStoredNavigationConfig,
  resetStoredNavigationConfig,
} from '../../utils/navigationConfig'

export const ShopAndNavigationEditor: React.FC = () => {
  const [navConfigData, setNavConfigData] = useState<MasterNavigationConfig>(getStoredNavigationConfig)
  const [navActiveTab, setNavActiveTab] = useState<'shop_dropdown' | 'cad_mega' | 'hardware_mega' | 'shop_page'>('shop_dropdown')
  const [navSavedMsg, setNavSavedMsg] = useState('')
  const [activeCadMegaBrand, setActiveCadMegaBrand] = useState<'ares' | 'sketchup' | 'chaos'>('ares')
  const [activeHardwareMegaCat, setActiveHardwareMegaCat] = useState<'fdm' | 'dlp' | 'lcd' | 'scanners' | 'filaments'>('fdm')

  // Quick Add Local States
  const [newShortcutLabel, setNewShortcutLabel] = useState('')
  const [newShortcutRoute, setNewShortcutRoute] = useState('')

  const [newCadProdName, setNewCadProdName] = useState('')
  const [newCadProdSlug, setNewCadProdSlug] = useState('')
  const [newCadProdSpec, setNewCadProdSpec] = useState('')
  const [newCadProdImage, setNewCadProdImage] = useState('')
  const [newCadProdBadge, setNewCadProdBadge] = useState('')

  const [newHwProdName, setNewHwProdName] = useState('')
  const [newHwProdSlug, setNewHwProdSlug] = useState('')
  const [newHwProdSpec, setNewHwProdSpec] = useState('')
  const [newHwProdBadge, setNewHwProdBadge] = useState('')

  const handleSaveNavConfig = () => {
    saveStoredNavigationConfig(navConfigData)
    setNavSavedMsg('Shop & Navigation Dropdown changes saved live across website!')
    setTimeout(() => setNavSavedMsg(''), 4000)
  }

  const handleResetNavConfig = () => {
    if (window.confirm('Are you sure you want to reset all navigation & shop dropdown items to factory defaults?')) {
      const def = resetStoredNavigationConfig()
      setNavConfigData(def)
      setNavSavedMsg('Reset to factory defaults successfully!')
      setTimeout(() => setNavSavedMsg(''), 4000)
    }
  }

  const curCadBrand = navConfigData.cadMegaMenu.categories.find(c => c.id === activeCadMegaBrand) || navConfigData.cadMegaMenu.categories[0]
  const curHwCat = navConfigData.hardwareMegaMenu.categories.find(c => c.id === activeHardwareMegaCat) || navConfigData.hardwareMegaMenu.categories[0]

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Shop &amp; Dropdown Navigation Editor
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visual CMS for the Shop dropdown, CAD Software mega menu, 3D Printers mega menu, and Shop storefront.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleResetNavConfig}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSaveNavConfig}
            className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* Saved Notification */}
      {navSavedMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2 shadow-xs animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{navSavedMsg}</span>
        </div>
      )}

      {/* Sub-Tabs Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setNavActiveTab('shop_dropdown')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            navActiveTab === 'shop_dropdown' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Shop Dropdown Flyout
        </button>
        <button
          type="button"
          onClick={() => setNavActiveTab('cad_mega')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            navActiveTab === 'cad_mega' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. CAD Software Mega Menu
        </button>
        <button
          type="button"
          onClick={() => setNavActiveTab('hardware_mega')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            navActiveTab === 'hardware_mega' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. 3D Printers Mega Menu
        </button>
        <button
          type="button"
          onClick={() => setNavActiveTab('shop_page')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
            navActiveTab === 'shop_page' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Shop Page Storefront
        </button>
      </div>

      {/* SUB-TAB 1: SHOP DROPDOWN FLYOUT */}
      {navActiveTab === 'shop_dropdown' && (
        <div className="space-y-6">
          {/* Banner Bar Config */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Dropdown Header Banner</h4>
              <p className="text-xs text-slate-500">Top strip shown when user hovers or clicks &quot;Shop&quot; in the navigation bar.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Title</label>
                <input
                  type="text"
                  value={navConfigData.shopDropdown.bannerTitle}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    shopDropdown: { ...navConfigData.shopDropdown, bannerTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Store Link Text</label>
                <input
                  type="text"
                  value={navConfigData.shopDropdown.allStoreLinkText}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    shopDropdown: { ...navConfigData.shopDropdown, allStoreLinkText: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Store Link Route</label>
                <input
                  type="text"
                  value={navConfigData.shopDropdown.allStoreRoute}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    shopDropdown: { ...navConfigData.shopDropdown, allStoreRoute: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>

          {/* 3 Showcase Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Showcase Cards (3 Cards)</h4>
              <p className="text-xs text-slate-500">Primary visual product and hardware cards presented directly in the Shop flyout menu.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {navConfigData.shopDropdown.cards.map((card, idx) => (
                <div key={card.id || idx} className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                      Card #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={card.badge}
                      onChange={e => {
                        const newCards = [...navConfigData.shopDropdown.cards]
                        newCards[idx] = { ...newCards[idx], badge: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, cards: newCards }
                        })
                      }}
                      placeholder="Badge"
                      className="text-[11px] px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Card Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={e => {
                        const newCards = [...navConfigData.shopDropdown.cards]
                        newCards[idx] = { ...newCards[idx], title: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, cards: newCards }
                        })
                      }}
                      className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={e => {
                        const newCards = [...navConfigData.shopDropdown.cards]
                        newCards[idx] = { ...newCards[idx], description: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, cards: newCards }
                        })
                      }}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Target Route</label>
                    <input
                      type="text"
                      value={card.route}
                      onChange={e => {
                        const newCards = [...navConfigData.shopDropdown.cards]
                        newCards[idx] = { ...newCards[idx], route: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, cards: newCards }
                        })
                      }}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Bottom Quick Shortcuts</h4>
                <p className="text-xs text-slate-500">Pills displayed at the bottom of the Shop dropdown flyout.</p>
              </div>
              <span className="text-xs font-bold text-slate-500">{navConfigData.shopDropdown.shortcuts.length} links</span>
            </div>

            <div className="space-y-3">
              {navConfigData.shopDropdown.shortcuts.map((sc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={sc.label}
                      onChange={e => {
                        const newSc = [...navConfigData.shopDropdown.shortcuts]
                        newSc[idx] = { ...newSc[idx], label: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, shortcuts: newSc }
                        })
                      }}
                      className="w-full text-xs font-bold px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Label"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={sc.route}
                      onChange={e => {
                        const newSc = [...navConfigData.shopDropdown.shortcuts]
                        newSc[idx] = { ...newSc[idx], route: e.target.value }
                        setNavConfigData({
                          ...navConfigData,
                          shopDropdown: { ...navConfigData.shopDropdown, shortcuts: newSc }
                        })
                      }}
                      className="w-full text-xs font-mono px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg"
                      placeholder="Route e.g. /shop?category=..."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSc = navConfigData.shopDropdown.shortcuts.filter((_, i) => i !== idx)
                      setNavConfigData({
                        ...navConfigData,
                        shopDropdown: { ...navConfigData.shopDropdown, shortcuts: newSc }
                      })
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                    title="Remove shortcut"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Shortcut */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={newShortcutLabel}
                onChange={e => setNewShortcutLabel(e.target.value)}
                placeholder="New shortcut label (e.g. FlashForge Printers)"
                className="flex-1 w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <input
                type="text"
                value={newShortcutRoute}
                onChange={e => setNewShortcutRoute(e.target.value)}
                placeholder="Target URL / Route (e.g. /shop?brand=flashforge)"
                className="flex-1 w-full text-xs font-mono px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newShortcutLabel.trim()) return
                  setNavConfigData({
                    ...navConfigData,
                    shopDropdown: {
                      ...navConfigData.shopDropdown,
                      shortcuts: [
                        ...navConfigData.shopDropdown.shortcuts,
                        { label: newShortcutLabel.trim(), route: newShortcutRoute.trim() || '/shop' }
                      ]
                    }
                  })
                  setNewShortcutLabel('')
                  setNewShortcutRoute('')
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Shortcut</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CAD SOFTWARE MEGA MENU */}
      {navActiveTab === 'cad_mega' && (
        <div className="space-y-6">
          {/* Consultation Footer Banner Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Mega-Menu Bottom Consultation Banner</h4>
              <p className="text-xs text-slate-500">Banner strip anchored at the bottom of the CAD Software mega-menu.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Description Text</label>
                <input
                  type="text"
                  value={navConfigData.cadMegaMenu.consultationText}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    cadMegaMenu: {
                      ...navConfigData.cadMegaMenu,
                      consultationText: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={navConfigData.cadMegaMenu.consultationBtnText}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    cadMegaMenu: {
                      ...navConfigData.cadMegaMenu,
                      consultationBtnText: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Brand Switcher */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">CAD Software Brands &amp; Products</h4>
              <p className="text-xs text-slate-500">Edit the software editions, specifications, badges, and routing for each brand column.</p>
            </div>

            <div className="flex space-x-2 border-b border-slate-200 pb-3">
              {navConfigData.cadMegaMenu.categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCadMegaBrand(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCadMegaBrand === cat.id
                      ? 'bg-violet-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label} ({cat.products.length})
                </button>
              ))}
            </div>

            {/* Current Brand Details */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Label</label>
                  <input
                    type="text"
                    value={curCadBrand.label}
                    onChange={e => {
                      const updated = navConfigData.cadMegaMenu.categories.map(c =>
                        c.id === curCadBrand.id ? { ...c, label: e.target.value } : c
                      )
                      setNavConfigData({
                        ...navConfigData,
                        cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                      })
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Description</label>
                  <input
                    type="text"
                    value={curCadBrand.description}
                    onChange={e => {
                      const updated = navConfigData.cadMegaMenu.categories.map(c =>
                        c.id === curCadBrand.id ? { ...c, description: e.target.value } : c
                      )
                      setNavConfigData({
                        ...navConfigData,
                        cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                      })
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Products List inside Current Brand */}
              <div className="space-y-3 pt-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Software Products in {curCadBrand.label} ({curCadBrand.products.length})
                </h5>

                <div className="space-y-3">
                  {curCadBrand.products.map((prod, pIdx) => (
                    <div key={pIdx} className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Software Name</label>
                          <input
                            type="text"
                            value={prod.name}
                            onChange={e => {
                              const newProds = [...curCadBrand.products]
                              newProds[pIdx] = { ...newProds[pIdx], name: e.target.value }
                              const updated = navConfigData.cadMegaMenu.categories.map(c =>
                                c.id === curCadBrand.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full font-bold px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">URL / Slug</label>
                          <input
                            type="text"
                            value={prod.slug}
                            onChange={e => {
                              const newProds = [...curCadBrand.products]
                              newProds[pIdx] = { ...newProds[pIdx], slug: e.target.value }
                              const updated = navConfigData.cadMegaMenu.categories.map(c =>
                                c.id === curCadBrand.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full font-mono px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Key Spec / Tagline</label>
                          <input
                            type="text"
                            value={prod.spec}
                            onChange={e => {
                              const newProds = [...curCadBrand.products]
                              newProds[pIdx] = { ...newProds[pIdx], spec: e.target.value }
                              const updated = navConfigData.cadMegaMenu.categories.map(c =>
                                c.id === curCadBrand.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Badge Text (Optional)</label>
                          <input
                            type="text"
                            value={prod.badge || ''}
                            onChange={e => {
                              const newProds = [...curCadBrand.products]
                              newProds[pIdx] = { ...newProds[pIdx], badge: e.target.value }
                              const updated = navConfigData.cadMegaMenu.categories.map(c =>
                                c.id === curCadBrand.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                              })
                            }}
                            placeholder="e.g. Popular, Lifetime"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            const newProds = curCadBrand.products.filter((_: CadMegaProduct, i: number) => i !== pIdx)
                            const updated = navConfigData.cadMegaMenu.categories.map(c =>
                              c.id === curCadBrand.id ? { ...c, products: newProds } : c
                            )
                            setNavConfigData({
                              ...navConfigData,
                              cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                            })
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete software"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New CAD Product to Current Brand */}
                <div className="bg-violet-50/50 border border-violet-200/70 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-violet-900 font-bold text-xs">
                    <Plus className="w-4 h-4" />
                    <span>Add New Software Product to {curCadBrand.label}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <input
                      type="text"
                      value={newCadProdName}
                      onChange={e => setNewCadProdName(e.target.value)}
                      placeholder="Product Name (e.g. ARES Trinity)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newCadProdSlug}
                      onChange={e => setNewCadProdSlug(e.target.value)}
                      placeholder="Slug / Route (/software/ares)"
                      className="font-mono px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newCadProdSpec}
                      onChange={e => setNewCadProdSpec(e.target.value)}
                      placeholder="Spec / Subtitle (2D/3D DWG)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newCadProdBadge}
                      onChange={e => setNewCadProdBadge(e.target.value)}
                      placeholder="Badge (e.g. Lifetime)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newCadProdName.trim()) return
                        const newItem: CadMegaProduct = {
                          name: newCadProdName.trim(),
                          slug: newCadProdSlug.trim() || `/software/${newCadProdName.toLowerCase().replace(/\s+/g, '-')}`,
                          spec: newCadProdSpec.trim() || 'Professional Edition',
                          image: newCadProdImage.trim() || '/images/software/ares-commander.png',
                          badge: newCadProdBadge.trim() || undefined,
                        }
                        const newProds = [...curCadBrand.products, newItem]
                        const updated = navConfigData.cadMegaMenu.categories.map(c =>
                          c.id === curCadBrand.id ? { ...c, products: newProds } : c
                        )
                        setNavConfigData({
                          ...navConfigData,
                          cadMegaMenu: { ...navConfigData.cadMegaMenu, categories: updated }
                        })
                        setNewCadProdName('')
                        setNewCadProdSlug('')
                        setNewCadProdSpec('')
                        setNewCadProdImage('')
                        setNewCadProdBadge('')
                      }}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product to {curCadBrand.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 3D PRINTERS MEGA MENU */}
      {navActiveTab === 'hardware_mega' && (
        <div className="space-y-6">
          {/* Hardware Footer Consultation Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Mega-Menu Bottom Consultation Banner</h4>
              <p className="text-xs text-slate-500">Banner strip anchored at the bottom of the 3D Printers mega-menu.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Banner Description Text</label>
                <input
                  type="text"
                  value={navConfigData.hardwareMegaMenu.consultationText}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    hardwareMegaMenu: {
                      ...navConfigData.hardwareMegaMenu,
                      consultationText: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={navConfigData.hardwareMegaMenu.consultationBtnText}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    hardwareMegaMenu: {
                      ...navConfigData.hardwareMegaMenu,
                      consultationBtnText: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Hardware Category Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Hardware Categories &amp; Machines</h4>
              <p className="text-xs text-slate-500">Edit machines, scanners, filaments, specs, badges, and slugs in each column.</p>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              {navConfigData.hardwareMegaMenu.categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveHardwareMegaCat(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeHardwareMegaCat === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label} ({cat.products.length})
                </button>
              ))}
            </div>

            {/* Current Hardware Category Info */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Column Label</label>
                  <input
                    type="text"
                    value={curHwCat.label}
                    onChange={e => {
                      const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                        c.id === curHwCat.id ? { ...c, label: e.target.value } : c
                      )
                      setNavConfigData({
                        ...navConfigData,
                        hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                      })
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Description</label>
                  <input
                    type="text"
                    value={curHwCat.description}
                    onChange={e => {
                      const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                        c.id === curHwCat.id ? { ...c, description: e.target.value } : c
                      )
                      setNavConfigData({
                        ...navConfigData,
                        hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                      })
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category Route</label>
                  <input
                    type="text"
                    value={curHwCat.route}
                    onChange={e => {
                      const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                        c.id === curHwCat.id ? { ...c, route: e.target.value } : c
                      )
                      setNavConfigData({
                        ...navConfigData,
                        hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                      })
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Products in Current Category */}
              <div className="space-y-3 pt-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Products in {curHwCat.label} ({curHwCat.products.length})
                </h5>

                <div className="space-y-3">
                  {curHwCat.products.map((prod, pIdx) => (
                    <div key={pIdx} className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full text-xs">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Machine / Item Name</label>
                          <input
                            type="text"
                            value={prod.name}
                            onChange={e => {
                              const newProds = [...curHwCat.products]
                              newProds[pIdx] = { ...newProds[pIdx], name: e.target.value }
                              const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                                c.id === curHwCat.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full font-bold px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">URL / Slug</label>
                          <input
                            type="text"
                            value={prod.slug}
                            onChange={e => {
                              const newProds = [...curHwCat.products]
                              newProds[pIdx] = { ...newProds[pIdx], slug: e.target.value }
                              const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                                c.id === curHwCat.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full font-mono px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Key Spec / Build Volume</label>
                          <input
                            type="text"
                            value={prod.spec}
                            onChange={e => {
                              const newProds = [...curHwCat.products]
                              newProds[pIdx] = { ...newProds[pIdx], spec: e.target.value }
                              const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                                c.id === curHwCat.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                              })
                            }}
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">Badge (e.g. Flagship, 0.02mm)</label>
                          <input
                            type="text"
                            value={prod.badge || ''}
                            onChange={e => {
                              const newProds = [...curHwCat.products]
                              newProds[pIdx] = { ...newProds[pIdx], badge: e.target.value }
                              const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                                c.id === curHwCat.id ? { ...c, products: newProds } : c
                              )
                              setNavConfigData({
                                ...navConfigData,
                                hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                              })
                            }}
                            placeholder="e.g. Flagship, High Speed"
                            className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => {
                            const newProds = curHwCat.products.filter((_: HardwareMegaProduct, i: number) => i !== pIdx)
                            const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                              c.id === curHwCat.id ? { ...c, products: newProds } : c
                            )
                            setNavConfigData({
                              ...navConfigData,
                              hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                            })
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Hardware Product to Category */}
                <div className="bg-blue-50/50 border border-blue-200/70 rounded-xl p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                    <Plus className="w-4 h-4" />
                    <span>Add New Machine / Item to {curHwCat.label}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <input
                      type="text"
                      value={newHwProdName}
                      onChange={e => setNewHwProdName(e.target.value)}
                      placeholder="Item Name (e.g. FlashForge Creator 4S)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newHwProdSlug}
                      onChange={e => setNewHwProdSlug(e.target.value)}
                      placeholder="Slug / Route (/products/...)"
                      className="font-mono px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newHwProdSpec}
                      onChange={e => setNewHwProdSpec(e.target.value)}
                      placeholder="Spec (e.g. 400x350x500mm)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={newHwProdBadge}
                      onChange={e => setNewHwProdBadge(e.target.value)}
                      placeholder="Badge (e.g. Flagship)"
                      className="px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newHwProdName.trim()) return
                        const newItem: HardwareMegaProduct = {
                          name: newHwProdName.trim(),
                          slug: newHwProdSlug.trim() || `/products/${newHwProdName.toLowerCase().replace(/\s+/g, '-')}`,
                          spec: newHwProdSpec.trim() || 'Industrial Grade',
                          badge: newHwProdBadge.trim() || undefined,
                        }
                        const newProds = [...curHwCat.products, newItem]
                        const updated = navConfigData.hardwareMegaMenu.categories.map(c =>
                          c.id === curHwCat.id ? { ...c, products: newProds } : c
                        )
                        setNavConfigData({
                          ...navConfigData,
                          hardwareMegaMenu: { ...navConfigData.hardwareMegaMenu, categories: updated }
                        })
                        setNewHwProdName('')
                        setNewHwProdSlug('')
                        setNewHwProdSpec('')
                        setNewHwProdBadge('')
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item to {curHwCat.label}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SHOP PAGE STOREFRONT */}
      {navActiveTab === 'shop_page' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900">Shop Page Storefront Header &amp; Announcement</h4>
              <p className="text-xs text-slate-500">Configure the top banner, promotional badge, and title shown at the top of /shop.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Announcement Badge Text</label>
                  <input
                    type="text"
                    value={navConfigData.shopPage.announcementBadge}
                    onChange={e => setNavConfigData({
                      ...navConfigData,
                      shopPage: { ...navConfigData.shopPage, announcementBadge: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Announcement Message</label>
                  <input
                    type="text"
                    value={navConfigData.shopPage.announcementText}
                    onChange={e => setNavConfigData({
                      ...navConfigData,
                      shopPage: { ...navConfigData.shopPage, announcementText: e.target.value }
                    })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Store Page Title</label>
                <input
                  type="text"
                  value={navConfigData.shopPage.pageTitle}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    shopPage: { ...navConfigData.shopPage, pageTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-black text-slate-900"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Store Page Subtitle / Description</label>
                <textarea
                  value={navConfigData.shopPage.pageSubtitle}
                  rows={3}
                  onChange={e => setNavConfigData({
                    ...navConfigData,
                    shopPage: { ...navConfigData.shopPage, pageSubtitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Quick Storefront Actions */}
          <div className="bg-violet-50/70 border border-violet-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-violet-950">Preview Live Storefront</h5>
                <p className="text-xs text-violet-700 mt-0.5">View your store catalog, filters, search, and live product cards.</p>
              </div>
            </div>
            <Link
              to="/shop"
              target="_blank"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow-sm transition-colors shrink-0"
            >
              <span>Open /shop in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
