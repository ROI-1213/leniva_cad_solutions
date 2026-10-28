import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, WishlistItem, QuoteFormData } from '../types'
import { siteConfig } from '../data/siteConfig'
import { recordCustomerEnquiry } from '../utils/cloudSync'

export interface SiteSettingsType {
  companyName: string
  phone: string
  secondaryPhone?: string
  email: string
  address: string
  workingHours: string
  whatsapp: string
  bannerNotice: string
}

const defaultSiteSettings: SiteSettingsType = {
  companyName: siteConfig.name,
  phone: siteConfig.phone,
  secondaryPhone: siteConfig.supportPhone || '+91 96069 84210',
  email: siteConfig.email,
  address: siteConfig.address,
  workingHours: siteConfig.workingHours,
  whatsapp: siteConfig.whatsappNumber,
  bannerNotice: 'Now Delivering Advanced 3D Scanners & Industrial Printers PAN-India',
}

const getStoredSiteSettings = (): SiteSettingsType => {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('leniva_site_settings') : null
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object') {
        const merged = { ...defaultSiteSettings, ...parsed }
        if (!merged.workingHours || !merged.workingHours.includes('Saturday: 9:30 AM')) {
          merged.workingHours = defaultSiteSettings.workingHours
        }
        if (merged.address && /headquarters/i.test(merged.address)) {
          merged.address = merged.address.replace(/headquarters/gi, '').trim()
        }
        return merged
      }
    }
  } catch {
    // fallback
  }
  return defaultSiteSettings
}

interface AppContextType {
  // Cart
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number

  // Wishlist
  wishlistItems: WishlistItem[]
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  wishlistCount: number

  // Quote Modal
  isQuoteModalOpen: boolean
  quoteProduct: string
  openQuoteModal: (productName?: string) => void
  closeQuoteModal: () => void
  submitQuote: (data: QuoteFormData) => Promise<boolean>

  // Search Modal
  isSearchModalOpen: boolean
  openSearchModal: () => void
  closeSearchModal: () => void

  // Live Site Settings from PostgreSQL / localStorage
  liveSiteSettings: SiteSettingsType
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist state with localStorage
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  // Live Site Settings reactive state
  const [liveSiteSettings, setLiveSiteSettings] = useState<SiteSettingsType>(getStoredSiteSettings)

  // Listen to leniva_site_settings_updated event
  useEffect(() => {
    const handleUpdate = () => {
      setLiveSiteSettings(getStoredSiteSettings())
    }
    window.addEventListener('leniva_site_settings_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('leniva_site_settings_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  // Fetch live settings from PostgreSQL on mount and synchronize
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data?.general_info) {
          setLiveSiteSettings(prev => {
            const merged = { ...prev, ...data.general_info }
            try {
              localStorage.setItem('leniva_site_settings', JSON.stringify(merged))
            } catch {
              // ignore
            }
            return merged
          })
        }
      })
      .catch(() => {
        // Silently fall back to localStorage/siteConfig defaults
      })
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('leniva_cart', JSON.stringify(cartItems))
    } catch (e) {
      console.error(e)
    }
  }, [cartItems])

  useEffect(() => {
    try {
      localStorage.setItem('leniva_wishlist', JSON.stringify(wishlistItems))
    } catch (e) {
      console.error(e)
    }
  }, [wishlistItems])

  // Global Interceptor: Clicking "Download Brochure" / brochure links on ANY CAD Software page displays the Enquiry Form
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleDocumentClick = (e: MouseEvent) => {
      // Don't intercept inside admin panel editor
      if (window.location.pathname.startsWith('/admin')) return

      const target = (e.target as HTMLElement)?.closest('a, button') as HTMLElement | null
      if (!target) return

      // CRITICAL: NEVER intercept clicks inside QuoteModal or inside any form!
      if (target.closest('[data-leniva-quote-modal="true"], [data-leniva-handled="true"], form, [role="dialog"]')) return

      const pathname = window.location.pathname.toLowerCase()
      const isCadRoute =
        pathname.includes('ares') ||
        pathname.includes('sketchup') ||
        pathname.includes('enscape') ||
        pathname.includes('vray') ||
        pathname.includes('v-ray') ||
        pathname.includes('corona') ||
        pathname.includes('cad-software') ||
        target.closest('[data-cad-software="true"]') !== null

      // ONLY for CAD softwares - never intercept 3D printers or 3D scanners!
      if (!isCadRoute) return

      const text = (target.textContent || '').trim().toLowerCase()
      const href = (target.getAttribute('href') || '').toLowerCase()
      const title = (target.getAttribute('title') || '').toLowerCase()
      const downloadAttr = (target.getAttribute('download') || '').toLowerCase()

      const isBrochureClick =
        text.includes('brochure') ||
        href.includes('brochure') ||
        title.includes('brochure') ||
        downloadAttr.includes('brochure') ||
        target.hasAttribute('data-cad-pdf-id')

      if (isBrochureClick) {
        e.preventDefault()
        e.stopPropagation()

        // Derive product name from document title or H1
        let derivedProduct = document.title.split('|')[0].split('–')[0].trim() || 'CAD Software'
        if (derivedProduct.toLowerCase().includes('leniva') || derivedProduct.length < 3) {
          const h1 = document.querySelector('h1')?.textContent?.trim()
          if (h1) derivedProduct = h1
        }

        openQuoteModal(`${derivedProduct} - Official Brochure Download`)
      }
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCartItems(prev => {
      const existing = prev.find(
        i => i.shopItemId === item.shopItemId && i.selectedColor === item.selectedColor
      )
      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, { ...item, id: `${item.shopItemId}-${Date.now()}` }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const newQty = i.quantity + delta
            return newQty > 0 ? { ...i, quantity: newQty } : null
          }
          return i
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Wishlist operations
  const toggleWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.some(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInWishlist = (id: string) => wishlistItems.some(i => i.id === id)
  const wishlistCount = wishlistItems.length

  // Quote operations
  const openQuoteModal = (productName = '') => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/admin') &&
      document.querySelector('[data-cad-editor-canvas="true"][data-preview-mode="false"]')
    ) {
      return
    }
    setQuoteProduct(productName)
    setIsQuoteModalOpen(true)
  }

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false)
    setQuoteProduct('')
  }

  const submitQuote = async (data: QuoteFormData): Promise<boolean> => {
    try {
      const prodOrSvc = data.productOrService || quoteProduct || 'General Quotation / Demo Enquiry'
      let detectedType = data.enquiryType
      if (!detectedType) {
        const text = `${prodOrSvc} ${data.source || ''}`.toLowerCase()
        if (text.includes('demo') || text.includes('demonstration')) {
          detectedType = 'demo'
        } else if (text.includes('consultation') || text.includes('engineer') || text.includes('technical call') || text.includes('specialist')) {
          detectedType = 'consultation'
        } else if (text.includes('trial') || text.includes('evaluation')) {
          detectedType = 'trial'
        } else {
          detectedType = 'quote'
        }
      }

      await recordCustomerEnquiry({
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        productOrService: prodOrSvc,
        quantity: data.quantity || '1',
        application: data.application || 'Immediate',
        message: data.message,
        source: data.source || (detectedType === 'demo' ? 'Product Demo Request' : detectedType === 'consultation' ? 'Engineering Consultation' : 'Quote Request'),
        enquiryType: detectedType,
      })
    } catch (e) {
      console.warn('Enquiry cloud sync fallback:', e)
    }
    return true
  }

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isQuoteModalOpen,
        quoteProduct,
        openQuoteModal,
        closeQuoteModal,
        submitQuote,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        liveSiteSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
