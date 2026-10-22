import { Suspense, lazy, Component, ErrorInfo, ReactNode, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import QuoteModal from './components/QuoteModal'
import SearchModal from './components/SearchModal'
import ScrollToTop from './components/ScrollToTop'

// Lazy-loaded pages — each loads only when that route is visited
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const MaterialsPage = lazy(() => import('./pages/MaterialsPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const ResellerPage = lazy(() => import('./pages/ResellerPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const MyAccountPage = lazy(() => import('./pages/MyAccountPage'))
const ScannersCategoryPage = lazy(() => import('./pages/ScannersCategoryPage'))
const DevokMQPage = lazy(() => import('./pages/DevokMQPage'))
const DevokMTPage = lazy(() => import('./pages/DevokMTPage'))
const EinscanPage = lazy(() => import('./pages/EinscanPage'))
const EkaHtPage = lazy(() => import('./pages/EkaHtPage'))
const EkaXlPage = lazy(() => import('./pages/EkaXlPage'))
const EkaXlePage = lazy(() => import('./pages/EkaXlePage'))
const DlpCategoryPage = lazy(() => import('./pages/DlpCategoryPage'))
const IndustrialLcdCategoryPage = lazy(() => import('./pages/IndustrialLcdCategoryPage'))
const EkaGtMaxPage = lazy(() => import('./pages/EkaGtMaxPage'))
const EkaF116kPage = lazy(() => import('./pages/EkaF116kPage'))
const EnscapePage = lazy(() => import('./pages/EnscapePage'))
const VRayPage = lazy(() => import('./pages/VRayPage'))
const CoronaPage = lazy(() => import('./pages/CoronaPage'))
const SketchUpStudioPage = lazy(() => import('./pages/SketchUpStudioPage'))
const SketchUpProScanPage = lazy(() => import('./pages/SketchUpProScanPage'))
const SketchUpProPage = lazy(() => import('./pages/SketchUpProPage'))
const SketchUpProAdvancedPage = lazy(() => import('./pages/SketchUpProAdvancedPage'))
const AresMechanicalPage = lazy(() => import('./pages/AresMechanicalPage'))
const AresElectricalPage = lazy(() => import('./pages/AresElectricalPage'))
const AresStandardPage = lazy(() => import('./pages/AresStandardPage'))
const AresCommanderPage = lazy(() => import('./pages/AresCommanderPage'))
const AresKudoPage = lazy(() => import('./pages/AresKudoPage'))
const AresTouchPage = lazy(() => import('./pages/AresTouchPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const FilamentCategoryPage = lazy(() => import('./pages/FilamentCategoryPage'))
const FilamentDetailPage = lazy(() => import('./pages/FilamentCategoryPage').then(m => ({ default: m.FilamentDetailPage })))
const WhitePlaDetailPage = lazy(() => import('./pages/WhitePlaDetailPage'))
const GreySilverPlaPage = lazy(() => import('./pages/GreySilverPlaPage'))
const GoldPlaPage = lazy(() => import('./pages/GoldPlaPage'))

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-red-600 rounded-full animate-spin" />
      <span className="text-xs text-slate-400 font-medium">Loading...</span>
    </div>
  </div>
)

// Deployment chunk error boundary
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App caught an error:', error, errorInfo)
    const isChunkError =
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Importing a module script failed') ||
      error.name === 'ChunkLoadError'

    if (isChunkError) {
      const storageKey = 'leniva_chunk_reload'
      const lastReload = sessionStorage.getItem(storageKey)
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem(storageKey, now.toString())
        window.location.reload()
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-md text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Update Detected</h2>
            <p className="text-sm text-slate-600">
              A new update was deployed. Please refresh to load the latest version.
            </p>
            <button
              onClick={() => {
                sessionStorage.removeItem('leniva_chunk_reload')
                window.location.reload()
              }}
              className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition-all cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const [cloudSyncVersion, setCloudSyncVersion] = useState(0)

  useEffect(() => {
    const handleCloudSynced = () => {
      setCloudSyncVersion(v => v + 1)
    }
    window.addEventListener('leniva_cloud_cms_synced', handleCloudSynced)
    return () => window.removeEventListener('leniva_cloud_cms_synced', handleCloudSynced)
  }, [])

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-600 selection:text-white font-inter">
        <ScrollToTop />
        {!isAdminRoute && <Header />}

        <main className="flex-1" key={isAdminRoute ? 'admin' : `public-${cloudSyncVersion}`}>
          <AppErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
              {/* 1. Home */}
              <Route path="/" element={<HomePage />} />


            {/* Dedicated 3D Scanners Category & Product Sub-pages */}
            <Route path="/3d-scanners" element={<ScannersCategoryPage />} />
            <Route path="/products/3d-scanners" element={<ScannersCategoryPage />} />
            <Route path="/products/scanners" element={<ScannersCategoryPage />} />
            <Route path="/scanners" element={<ScannersCategoryPage />} />
            <Route path="/3d-scanners/3devok-mq" element={<DevokMQPage />} />
            <Route path="/products/3devok-mq" element={<DevokMQPage />} />
            <Route path="/3d-scanners/3devok-mt" element={<DevokMTPage />} />
            <Route path="/products/3devok-mt" element={<DevokMTPage />} />
            <Route path="/3d-scanners/einscan" element={<EinscanPage />} />
            <Route path="/products/einscan" element={<EinscanPage />} />
            <Route path="/einscan" element={<EinscanPage />} />

            {/* 2. Products Hub */}
            <Route path="/products" element={<ProductsPage />} />

            {/* Specific Categories */}
            <Route
              path="/products/fdm-3d-printers"
              element={<CategoryDetailPage forcedSlug="fdm-3d-printers" />}
            />
            <Route
              path="/products/dlp-3d-printers"
              element={<DlpCategoryPage />}
            />
            <Route
              path="/dlp-3d-printers"
              element={<DlpCategoryPage />}
            />
            <Route
              path="/products/industrial-lcd-3d-printers"
              element={<IndustrialLcdCategoryPage />}
            />
            <Route
              path="/industrial-lcd-3d-printers"
              element={<IndustrialLcdCategoryPage />}
            />
            <Route
              path="/industrial-lcd-resin-3d-printers-for-jewelry-engineering"
              element={<IndustrialLcdCategoryPage />}
            />
            <Route
              path="/industrial-lcd-resin-3d-printers-for-jewelry-engineering/"
              element={<IndustrialLcdCategoryPage />}
            />
            <Route
              path="/products/cad-software"
              element={<CategoryDetailPage forcedSlug="cad-software" />}
            />

            {/* Materials under /products */}
            <Route path="/products/materials" element={<MaterialsPage />} />
            <Route
              path="/products/filaments"
              element={<FilamentCategoryPage />}
            />
            <Route
              path="/products/filaments/:slug"
              element={<FilamentDetailPage />}
            />
            <Route
              path="/products/resins"
              element={<MaterialsPage forcedCategory="resins" />}
            />
            <Route
              path="/products/accessories"
              element={<MaterialsPage forcedCategory="accessories" />}
            />

            {/* Dedicated Product Pages (routed via ProductDetailPage so Admin Catalog customizations reflect live) */}
            <Route path="/products/pratham-mini" element={<ProductDetailPage forcedSlug="pratham-mini" />} />
            <Route path="/product/pratham-mini" element={<ProductDetailPage forcedSlug="pratham-mini" />} />
            <Route path="/pratham-mini" element={<ProductDetailPage forcedSlug="pratham-mini" />} />
            <Route path="/products/pratham-desktop" element={<ProductDetailPage forcedSlug="pratham-desktop" />} />
            <Route path="/product/pratham-desktop" element={<ProductDetailPage forcedSlug="pratham-desktop" />} />
            <Route path="/pratham-desktop" element={<ProductDetailPage forcedSlug="pratham-desktop" />} />
            <Route path="/products/pratham-3" element={<ProductDetailPage forcedSlug="pratham-3" />} />
            <Route path="/product/pratham-3" element={<ProductDetailPage forcedSlug="pratham-3" />} />
            <Route path="/pratham-3" element={<ProductDetailPage forcedSlug="pratham-3" />} />
            <Route path="/products/pratham-3-0" element={<ProductDetailPage forcedSlug="pratham-3" />} />
            <Route path="/product/pratham-3-0" element={<ProductDetailPage forcedSlug="pratham-3" />} />
            <Route path="/pratham-3-0" element={<ProductDetailPage forcedSlug="pratham-3" />} />

            {/* Dedicated Pratham 5.0 Large-Format Industrial FDM */}
            <Route path="/products/pratham-5" element={<ProductDetailPage forcedSlug="pratham-5" />} />
            <Route path="/product/pratham-5" element={<ProductDetailPage forcedSlug="pratham-5" />} />
            <Route path="/pratham-5" element={<ProductDetailPage forcedSlug="pratham-5" />} />
            <Route path="/products/pratham-5-0" element={<ProductDetailPage forcedSlug="pratham-5" />} />
            <Route path="/product/pratham-5-0" element={<ProductDetailPage forcedSlug="pratham-5" />} />
            <Route path="/pratham-5-0" element={<ProductDetailPage forcedSlug="pratham-5" />} />

            {/* Dedicated Pratham 6.0 Closed-Loop Servo FDM */}
            <Route path="/products/pratham-6" element={<ProductDetailPage forcedSlug="pratham-6" />} />
            <Route path="/product/pratham-6" element={<ProductDetailPage forcedSlug="pratham-6" />} />
            <Route path="/pratham-6" element={<ProductDetailPage forcedSlug="pratham-6" />} />
            <Route path="/products/pratham-6-0" element={<ProductDetailPage forcedSlug="pratham-6" />} />
            <Route path="/product/pratham-6-0" element={<ProductDetailPage forcedSlug="pratham-6" />} />
            <Route path="/pratham-6-0" element={<ProductDetailPage forcedSlug="pratham-6" />} />

            {/* Dedicated Pratham X (600) Jumbo FDM */}
            <Route path="/products/pratham-x-600" element={<ProductDetailPage forcedSlug="pratham-x-600" />} />
            <Route path="/product/pratham-x-600" element={<ProductDetailPage forcedSlug="pratham-x-600" />} />
            <Route path="/pratham-x-600" element={<ProductDetailPage forcedSlug="pratham-x-600" />} />

            {/* Dedicated Pratham X (1000) 1 m³ Giant FDM */}
            <Route path="/products/pratham-x" element={<ProductDetailPage forcedSlug="pratham-x" />} />
            <Route path="/product/pratham-x" element={<ProductDetailPage forcedSlug="pratham-x" />} />
            <Route path="/pratham-x" element={<ProductDetailPage forcedSlug="pratham-x" />} />
            <Route path="/products/pratham-x-1000" element={<ProductDetailPage forcedSlug="pratham-x" />} />
            <Route path="/product/pratham-x-1000" element={<ProductDetailPage forcedSlug="pratham-x" />} />
            <Route path="/pratham-x-1000" element={<ProductDetailPage forcedSlug="pratham-x" />} />

            {/* Dedicated Pratham 3 Rapid 500 mm/s CoreXY FDM */}
            <Route path="/products/pratham-3-rapid" element={<ProductDetailPage forcedSlug="pratham-3-rapid" />} />
            <Route path="/product/pratham-3-rapid" element={<ProductDetailPage forcedSlug="pratham-3-rapid" />} />
            <Route path="/pratham-3-rapid" element={<ProductDetailPage forcedSlug="pratham-3-rapid" />} />

            {/* Dedicated EKA Series DLP 3D Printers */}
            <Route path="/products/eka-ht" element={<EkaHtPage />} />
            <Route path="/product/eka-ht" element={<EkaHtPage />} />
            <Route path="/eka-ht" element={<EkaHtPage />} />
            <Route path="/products/eka-xl" element={<EkaXlPage />} />
            <Route path="/product/eka-xl" element={<EkaXlPage />} />
            <Route path="/eka-xl" element={<EkaXlPage />} />
            <Route path="/eka-xl-2" element={<EkaXlPage />} />
            <Route path="/products/eka-xle" element={<EkaXlePage />} />
            <Route path="/product/eka-xle" element={<EkaXlePage />} />
            <Route path="/eka-xle" element={<EkaXlePage />} />

            {/* Dedicated Industrial LCD 3D Printers */}
            <Route path="/products/eka-gt-max" element={<EkaGtMaxPage />} />
            <Route path="/product/eka-gt-max" element={<EkaGtMaxPage />} />
            <Route path="/eka-gt-max" element={<EkaGtMaxPage />} />
            <Route path="/industrial-lcd-3d-printers-eka-gt-max" element={<EkaGtMaxPage />} />
            <Route path="/industrial-lcd-3d-printers-eka-gt-max/" element={<EkaGtMaxPage />} />

            <Route path="/products/eka-f1-16k" element={<EkaF116kPage />} />
            <Route path="/product/eka-f1-16k" element={<EkaF116kPage />} />
            <Route path="/eka-f1-16k" element={<EkaF116kPage />} />
            <Route path="/eka-f1-16k-industrial-lcd-jewelry-3d-printer" element={<EkaF116kPage />} />
            <Route path="/eka-f1-16k-industrial-lcd-jewelry-3d-printer/" element={<EkaF116kPage />} />

            {/* Dedicated Chaos Enscape Product Page */}
            <Route path="/products/enscape" element={<EnscapePage />} />
            <Route path="/product/enscape" element={<EnscapePage />} />
            <Route path="/enscape" element={<EnscapePage />} />
            <Route path="/products/chaos-enscape" element={<EnscapePage />} />
            <Route path="/products/enscape-3d" element={<EnscapePage />} />

            {/* Dedicated Chaos V-Ray Product Page */}
            <Route path="/products/vray" element={<VRayPage />} />
            <Route path="/product/vray" element={<VRayPage />} />
            <Route path="/vray" element={<VRayPage />} />
            <Route path="/products/v-ray" element={<VRayPage />} />
            <Route path="/products/chaos-vray" element={<VRayPage />} />
            <Route path="/products/chaos-v-ray" element={<VRayPage />} />

            {/* Dedicated Chaos Corona Product Page */}
            <Route path="/products/corona" element={<CoronaPage />} />
            <Route path="/product/corona" element={<CoronaPage />} />
            <Route path="/corona" element={<CoronaPage />} />
            <Route path="/products/chaos-corona" element={<CoronaPage />} />
            <Route path="/product/chaos-corona" element={<CoronaPage />} />
            <Route path="/chaos-corona" element={<CoronaPage />} />

            {/* Dedicated SketchUp Pro Product Page */}
            <Route path="/products/sketchup-pro" element={<SketchUpProPage />} />
            <Route path="/product/sketchup-pro" element={<SketchUpProPage />} />
            <Route path="/sketchup-pro" element={<SketchUpProPage />} />
            <Route path="/products/sketchup" element={<SketchUpProPage />} />
            <Route path="/product/sketchup" element={<SketchUpProPage />} />
            <Route path="/sketchup" element={<SketchUpProPage />} />

            {/* Dedicated SketchUp Studio Product Page */}
            <Route path="/products/sketchup-studio" element={<SketchUpStudioPage />} />
            <Route path="/product/sketchup-studio" element={<SketchUpStudioPage />} />
            <Route path="/sketchup-studio" element={<SketchUpStudioPage />} />
            <Route path="/products/sketchupstudio" element={<SketchUpStudioPage />} />

            {/* Dedicated SketchUp Pro Scan Product Page */}
            <Route path="/products/sketchup-scan" element={<SketchUpProScanPage />} />
            <Route path="/product/sketchup-scan" element={<SketchUpProScanPage />} />
            <Route path="/sketchup-scan" element={<SketchUpProScanPage />} />
            <Route path="/products/sketchup-pro-scan" element={<SketchUpProScanPage />} />
            <Route path="/product/sketchup-pro-scan" element={<SketchUpProScanPage />} />
            <Route path="/sketchup-pro-scan" element={<SketchUpProScanPage />} />

            {/* Dedicated SketchUp Pro Advanced Workflows Product Page */}
            <Route path="/products/sketchup-pro-advanced-workflows" element={<SketchUpProAdvancedPage />} />
            <Route path="/product/sketchup-pro-advanced-workflows" element={<SketchUpProAdvancedPage />} />
            <Route path="/sketchup-pro-advanced-workflows" element={<SketchUpProAdvancedPage />} />
            <Route path="/products/sketchup-advanced" element={<SketchUpProAdvancedPage />} />
            <Route path="/product/sketchup-advanced" element={<SketchUpProAdvancedPage />} />
            <Route path="/sketchup-advanced" element={<SketchUpProAdvancedPage />} />

            {/* Dedicated ARES Mechanical Product Page */}
            <Route path="/products/ares-mechanical" element={<AresMechanicalPage />} />
            <Route path="/product/ares-mechanical" element={<AresMechanicalPage />} />
            <Route path="/ares-mechanical" element={<AresMechanicalPage />} />
            <Route path="/products/aresmechanical" element={<AresMechanicalPage />} />
            <Route path="/product/aresmechanical" element={<AresMechanicalPage />} />
            <Route path="/aresmechanical" element={<AresMechanicalPage />} />

            {/* Dedicated ARES Electrical Product Page */}
            <Route path="/products/ares-electrical" element={<AresElectricalPage />} />
            <Route path="/product/ares-electrical" element={<AresElectricalPage />} />
            <Route path="/ares-electrical" element={<AresElectricalPage />} />
            <Route path="/products/areselectrical" element={<AresElectricalPage />} />
            <Route path="/product/areselectrical" element={<AresElectricalPage />} />
            <Route path="/areselectrical" element={<AresElectricalPage />} />

            {/* Dedicated ARES Standard Product Page */}
            <Route path="/products/ares-standard" element={<AresStandardPage />} />
            <Route path="/product/ares-standard" element={<AresStandardPage />} />
            <Route path="/ares-standard" element={<AresStandardPage />} />
            <Route path="/software/ares-standard" element={<AresStandardPage />} />
            <Route path="/software/ares-standard/" element={<AresStandardPage />} />
            <Route path="/products/aresstandard" element={<AresStandardPage />} />
            <Route path="/product/aresstandard" element={<AresStandardPage />} />
            <Route path="/aresstandard" element={<AresStandardPage />} />

            {/* Dedicated ARES Commander Product Page */}
            <Route path="/products/ares-commander" element={<AresCommanderPage />} />
            <Route path="/product/ares-commander" element={<AresCommanderPage />} />
            <Route path="/ares-commander" element={<AresCommanderPage />} />
            <Route path="/software/ares-commander" element={<AresCommanderPage />} />
            <Route path="/products/arescommander" element={<AresCommanderPage />} />
            <Route path="/product/arescommander" element={<AresCommanderPage />} />
            <Route path="/arescommander" element={<AresCommanderPage />} />
            {/* Dedicated ARES Kudo Product Page */}
            <Route path="/cad-software/ares-kudo" element={<AresKudoPage />} />
            <Route path="/cad-software/ares-kudo/" element={<AresKudoPage />} />
            <Route path="/products/ares-kudo" element={<AresKudoPage />} />
            <Route path="/product/ares-kudo" element={<AresKudoPage />} />
            <Route path="/ares-kudo" element={<AresKudoPage />} />
            <Route path="/software/ares-kudo" element={<AresKudoPage />} />
            <Route path="/products/areskudo" element={<AresKudoPage />} />
            <Route path="/product/areskudo" element={<AresKudoPage />} />
            <Route path="/areskudo" element={<AresKudoPage />} />
            <Route path="/products/ares-trinity" element={<AresKudoPage />} />
            <Route path="/product/ares-trinity" element={<AresKudoPage />} />
            <Route path="/ares-trinity" element={<AresKudoPage />} />

            {/* Dedicated ARES Touch Mobile CAD Product Page */}
            <Route path="/cad-software/ares-touch" element={<AresTouchPage />} />
            <Route path="/cad-software/ares-touch/" element={<AresTouchPage />} />
            <Route path="/products/ares-touch" element={<AresTouchPage />} />
            <Route path="/product/ares-touch" element={<AresTouchPage />} />
            <Route path="/ares-touch" element={<AresTouchPage />} />
            <Route path="/software/ares-touch" element={<AresTouchPage />} />
            <Route path="/software/ares-touch/" element={<AresTouchPage />} />
            <Route path="/products/arestouch" element={<AresTouchPage />} />
            <Route path="/product/arestouch" element={<AresTouchPage />} />
            <Route path="/arestouch" element={<AresTouchPage />} />

            {/* Universal Product Detail (handles pratham-3-rapid, eka-ht, sketchup, etc.) */}
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />

            {/* 3. Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/*" element={<Navigate to="/services" replace />} />

            {/* 4. Shop */}
            <Route path="/shop" element={<ShopPage />} />
            <Route
              path="/shop/fdm"
              element={<ShopPage forcedCategory="fdm" />}
            />
            <Route
              path="/shop/dlp"
              element={<ShopPage forcedCategory="dlp" />}
            />
            <Route
              path="/shop/lcd"
              element={<ShopPage forcedCategory="lcd" />}
            />
            <Route
              path="/shop/scanners"
              element={<ShopPage forcedCategory="scanners" />}
            />
            <Route
              path="/shop/products"
              element={<ShopPage forcedCategory="products" />}
            />
            <Route
              path="/shop/make3d-filaments"
              element={<ShopPage forcedCategory="make3d-filaments" />}
            />
            <Route
              path="/shop/filaments"
              element={<FilamentCategoryPage />}
            />
            <Route
              path="/shop/filaments/:slug"
              element={<FilamentDetailPage />}
            />
            <Route
              path="/3d-printer-filament"
              element={<FilamentCategoryPage />}
            />
            <Route
              path="/3d-printer-filament/:slug"
              element={<FilamentDetailPage />}
            />
            <Route
              path="/product/pla-3d-printer-filament-white"
              element={<WhitePlaDetailPage />}
            />
            <Route
              path="/product/pla-3d-printer-filament-white/"
              element={<WhitePlaDetailPage />}
            />
            <Route
              path="/product/pla-plus-3d-printer-filament-grey-silver"
              element={<GreySilverPlaPage />}
            />
            <Route
              path="/product/pla-plus-3d-printer-filament-grey-silver/"
              element={<GreySilverPlaPage />}
            />
            <Route
              path="/product/plaplus-grey-silver-1kg-175mm"
              element={<GreySilverPlaPage />}
            />
            <Route
              path="/product/pla-plus-3d-printer-filament-gold"
              element={<GoldPlaPage />}
            />
            <Route
              path="/product/pla-plus-3d-printer-filament-gold/"
              element={<GoldPlaPage />}
            />
            <Route
              path="/product/plaplus-gold-1kg-175mm"
              element={<GoldPlaPage />}
            />
            <Route
              path="/product/:slug"
              element={<FilamentDetailPage />}
            />
            <Route
              path="/shop/special-filaments"
              element={<ShopPage forcedCategory="special-filaments" />}
            />
            <Route
              path="/shop/resin"
              element={<ShopPage forcedCategory="resin" />}
            />
            <Route
              path="/shop/accessories"
              element={<ShopPage forcedCategory="accessories" />}
            />
            <Route
              path="/shop/miniatures"
              element={<ShopPage forcedCategory="miniatures" />}
            />
            <Route path="/shop/:category" element={<ShopPage />} />

            {/* 5. Materials Hub */}
            <Route path="/materials" element={<MaterialsPage />} />

            {/* 6. Blogs */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blogs" element={<Navigate to="/blog" replace />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />

            {/* 7. Company & Support */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/become-a-reseller" element={<ResellerPage />} />

            {/* 8. Policies & Legal */}
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/return-policy" element={<LegalPage />} />
            <Route path="/warranty" element={<LegalPage />} />

            {/* 9. E-Commerce & Account */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />

            {/* 10. Admin Console (PostgreSQL Native Management) */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/*" element={<AdminPage />} />

            {/* 11. Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          </AppErrorBoundary>
        </main>


        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <WhatsAppButton />}
        <QuoteModal />
        <SearchModal />
      </div>
    </AppProvider>
  )
}
