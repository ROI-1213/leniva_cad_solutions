const RESTFUL_OBJECT_ID = 'ff808181a09d98f701a1436dd2b96f43'
const RESTFUL_URL = `https://api.restful-api.dev/objects/${RESTFUL_OBJECT_ID}`
const NTFY_TOPIC = 'leniva_cad_cms_prod_v3'
const NTFY_POST_URL = `https://ntfy.sh/${NTFY_TOPIC}`
const NTFY_POLL_URL = `https://ntfy.sh/${NTFY_TOPIC}/json?poll=1&since=all`
const BYTEBIN_POST_URL = 'https://bytebin.lucko.me/post'
const UPDATED_AT_KEY = 'leniva_cms_sync_ts_v3'

export const SYNCED_CMS_KEYS = [
  'leniva_admin_products_catalog',
  'leniva_cad_software_edits',
  'leniva_cad_visual_published_v1',
  'leniva_custom_cad_products',
  'leniva_home_page_content_v1',
  'leniva_about_page_content_v1',
  'leniva_navigation_config',
  'leniva_admin_blogs_catalog',
  'leniva_site_settings',
  'leniva_admin_password',
  'leniva_admin_quotes',
  'leniva_admin_contacts',
  'filament_product_gold',
  'filament_product_grey_silver',
] as const

const ADMIN_CONTENT_CHECK_KEYS = [
  'leniva_admin_products_catalog',
  'leniva_cad_software_edits',
  'leniva_cad_visual_published_v1',
  'leniva_custom_cad_products',
  'leniva_home_page_content_v1',
  'leniva_about_page_content_v1',
  'leniva_navigation_config',
  'leniva_admin_blogs_catalog',
  'leniva_admin_password',
  'leniva_admin_quotes',
  'leniva_admin_contacts',
] as const

const COMPACT_INLINE_KEYS = [
  'leniva_admin_password',
  'leniva_site_settings',
  'leniva_cad_software_edits',
  'leniva_cad_visual_published_v1',
  'leniva_custom_cad_products',
  'leniva_home_page_content_v1',
  'leniva_about_page_content_v1',
  'leniva_navigation_config',
  'leniva_admin_quotes',
  'leniva_admin_contacts',
] as const

const SYNCED_KEY_SET = new Set<string>(SYNCED_CMS_KEYS)
const explicitlyResetKeys = new Set<string>()
let lastKnownCloudKeys: Record<string, string> = {}

let rawGetItem: (key: string) => string | null = key =>
  typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
let rawSetItem: (key: string, value: string) => void = (key, value) => {
  if (typeof window !== 'undefined') window.localStorage.setItem(key, value)
}
let rawRemoveItem: (key: string) => void = key => {
  if (typeof window !== 'undefined') window.localStorage.removeItem(key)
}

let isApplyingRemoteSync = false
let isInterceptorInstalled = false
let pushDebounceTimer: ReturnType<typeof setTimeout> | null = null
let activePushPromise: Promise<boolean> | null = null

export function dispatchAllCmsUpdatedEvents() {
  if (typeof window === 'undefined') return
  const events = [
    'leniva_products_catalog_updated',
    'leniva_cad_edits_updated',
    'leniva_cad_visual_updated',
    'leniva_home_content_updated',
    'leniva_about_content_updated',
    'leniva_nav_config_updated',
    'leniva_blogs_catalog_updated',
    'leniva_site_settings_updated',
    'leniva_cloud_cms_synced',
  ]
  for (const evt of events) {
    try {
      window.dispatchEvent(new Event(evt))
    } catch {
      // ignore
    }
  }
}

function isOnAdminRoute(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.pathname.startsWith('/admin')
}

function installStorageInterceptor() {
  if (typeof window === 'undefined' || isInterceptorInstalled) return
  isInterceptorInstalled = true

  rawGetItem = window.localStorage.getItem.bind(window.localStorage)
  rawSetItem = window.localStorage.setItem.bind(window.localStorage)
  rawRemoveItem = window.localStorage.removeItem.bind(window.localStorage)

  window.localStorage.setItem = function (key: string, value: string) {
    rawSetItem(key, value)
    if (!isApplyingRemoteSync && SYNCED_KEY_SET.has(key)) {
      explicitlyResetKeys.delete(key)
      if (isOnAdminRoute() || key === 'leniva_admin_quotes' || key === 'leniva_admin_contacts') {
        const now = Date.now()
        rawSetItem(UPDATED_AT_KEY, String(now))
        scheduleCloudPush()
      }
    }
  }

  window.localStorage.removeItem = function (key: string) {
    rawRemoveItem(key)
    if (!isApplyingRemoteSync && SYNCED_KEY_SET.has(key)) {
      explicitlyResetKeys.add(key)
      if (isOnAdminRoute()) {
        const now = Date.now()
        rawSetItem(UPDATED_AT_KEY, String(now))
        scheduleCloudPush()
      }
    }
  }
}

function scheduleCloudPush() {
  if (pushDebounceTimer) clearTimeout(pushDebounceTimer)
  pushDebounceTimer = setTimeout(() => {
    pushCmsStateToCloud().catch(err => {
      console.warn('Background cloud CMS push warning:', err)
    })
  }, 150)
}

export function collectLocalCmsSnapshot(): {
  updatedAt: number
  keys: Record<string, string>
  hasAdminCustomizations: boolean
} {
  const keys: Record<string, string> = { ...lastKnownCloudKeys }
  let hasAdminCustomizations = false

  for (const k of ADMIN_CONTENT_CHECK_KEYS) {
    const val = rawGetItem(k)
    if (val !== null && val !== '') {
      hasAdminCustomizations = true
    }
  }

  for (const k of SYNCED_CMS_KEYS) {
    if (explicitlyResetKeys.has(k)) {
      keys[k] = '__RESET__'
    } else {
      const val = rawGetItem(k)
      if (val !== null && val !== '') {
        keys[k] = val
      }
    }
  }

  const storedTs = Number(rawGetItem(UPDATED_AT_KEY) || '0')
  return {
    updatedAt: storedTs || Date.now(),
    keys,
    hasAdminCustomizations,
  }
}

export async function pushCmsStateToCloud(options?: { isEnquirySubmission?: boolean }): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (pushDebounceTimer) {
    clearTimeout(pushDebounceTimer)
    pushDebounceTimer = null
  }

  const doPush = async (): Promise<boolean> => {
    try {
      const updatedAt = Date.now()
      rawSetItem(UPDATED_AT_KEY, String(updatedAt))

      const { keys } = collectLocalCmsSnapshot()

      // Clean out __RESET__ for Bytebin/Restful storage while keeping it for /api/cms merge
      const cleanMergedKeys: Record<string, string> = {}
      for (const [k, v] of Object.entries(keys)) {
        if (v !== '__RESET__' && typeof v === 'string' && v.length > 0) {
          cleanMergedKeys[k] = v
        }
      }
      lastKnownCloudKeys = { ...cleanMergedKeys }
      explicitlyResetKeys.clear()

      // 1. Upload full snapshot to Bytebin for unlimited size support
      let bytebinKey: string | null = null
      try {
        const bRes = await fetch(BYTEBIN_POST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updatedAt, keys: cleanMergedKeys }),
        })
        if (bRes.ok) {
          const bJson = await bRes.json()
          bytebinKey = bJson.key || null
        }
      } catch {
        // ignore
      }

      // 2. Build compact inline keys for instant access even without Bytebin
      const inlineKeys: Record<string, string> = {}
      for (const k of COMPACT_INLINE_KEYS) {
        const val = cleanMergedKeys[k]
        if (typeof val === 'string') {
          if (val.length < 65000) {
            inlineKeys[k] = val
          } else if (k === 'leniva_cad_software_edits') {
            try {
              const parsed = JSON.parse(val)
              const compactCad: Record<string, any> = {}
              for (const [ck, cv] of Object.entries(parsed || {})) {
                if ((cv as any)?.is_admin_customized || ck.startsWith('cad_')) {
                  compactCad[ck] = cv
                }
              }
              const serialized = JSON.stringify(compactCad)
              if (serialized.length < 65000) {
                inlineKeys[k] = serialized
              }
            } catch {
              // ignore
            }
          }
        }
      }

      const pointer = {
        updatedAt,
        bytebinKey,
        inlineKeys,
      }

      // 3. Push to all 3 cloud tiers in parallel
      const results = await Promise.allSettled([
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            updatedAt,
            bytebinKey,
            keys,
            isEnquirySubmission: !!options?.isEnquirySubmission,
          }),
        }),
        fetch(RESTFUL_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'leniva_cms_store_v1', data: pointer }),
        }),
        fetch(NTFY_POST_URL, {
          method: 'POST',
          body: JSON.stringify({ updatedAt, bytebinKey }),
        }),
      ])

      return results.some(r => r.status === 'fulfilled' && r.value.ok)
    } catch (err) {
      console.warn('Failed to push CMS state to cloud:', err)
      return false
    }
  }

  activePushPromise = doPush()
  return activePushPromise
}

export interface StoredQuoteRecord {
  id: number
  name: string
  email: string
  phone: string
  company: string
  service_or_product: string
  quantity: string
  timeline: string
  message: string
  status: string
  created_at: string
  notes?: string
  enquiry_type?: 'quote' | 'demo' | 'consultation' | 'trial' | 'contact'
}

export interface StoredContactRecord {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
  notes?: string
  enquiry_type?: 'quote' | 'demo' | 'consultation' | 'trial' | 'contact'
}

export const DEFAULT_INITIAL_QUOTES: StoredQuoteRecord[] = [
  {
    id: 101,
    name: 'Rajesh Sharma',
    email: 'r.sharma@tata-advanced.com',
    phone: '+91 98450 12345',
    company: 'Tata Advanced Engineering',
    service_or_product: '3DeVOK MQ High-Accuracy Scanner',
    quantity: '2 Units',
    timeline: 'Within 2 Weeks',
    message: 'Looking for metrology grade scanning of automotive sheet metal dies with inspection reports.',
    status: 'pending',
    created_at: '2026-10-20T09:00:00.000Z',
    notes: 'Requires on-site demo in Bengaluru',
  },
  {
    id: 102,
    name: 'Pooja Verma',
    email: 'pooja.verma@titan.co.in',
    phone: '+91 97123 45678',
    company: 'Titan Jewellery Division',
    service_or_product: 'EKA HT DLP 3D Printer',
    quantity: '1 Unit',
    timeline: 'Immediate',
    message: 'Inquiring regarding high-precision wax direct casting resin parameters and machine delivery.',
    status: 'in_review',
    created_at: '2026-10-19T14:30:00.000Z',
    notes: 'Sent DLP sample pack via courier',
  },
  {
    id: 103,
    name: 'Vikram Patel',
    email: 'v.patel@bharatforge.com',
    phone: '+91 99234 56789',
    company: 'Bharat Forge Ltd',
    service_or_product: 'Pratham X1000 Industrial FDM',
    quantity: '1 Unit',
    timeline: '1 Month',
    message: 'Need 1-meter single piece printing for carbon-fiber nylon jigs on assembly conveyor.',
    status: 'contacted',
    created_at: '2026-10-18T11:15:00.000Z',
    notes: 'Scheduled video call with technical director',
  },
]

export const DEFAULT_INITIAL_CONTACTS: StoredContactRecord[] = [
  {
    id: 201,
    name: 'Dr. Anand Ramanathan',
    email: 'anand.r@iitb.ac.in',
    phone: '+91 98190 23456',
    subject: 'Academic Center of Excellence Quotation',
    message: 'IIT Bombay design lab seeks quote for 3D scanner suite and CAD onboarding software package.',
    status: 'unread',
    created_at: '2026-10-20T10:20:00.000Z',
  },
  {
    id: 202,
    name: 'Karthik Sundaram',
    email: 'karthik@precisiondies.in',
    phone: '+91 94440 98765',
    subject: 'ARES Mechanical Multi-Seat License Quote',
    message: 'Requesting volume quotation for 5 perpetual licenses of ARES Mechanical for our Coimbatore drafting cell.',
    status: 'read',
    created_at: '2026-10-19T08:45:00.000Z',
  },
]

export function getStoredQuotes(): StoredQuoteRecord[] {
  try {
    const raw = rawGetItem('leniva_admin_quotes')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_INITIAL_QUOTES
}

export function saveStoredQuotes(quotes: StoredQuoteRecord[]): void {
  try {
    window.localStorage.setItem('leniva_admin_quotes', JSON.stringify(quotes))
  } catch {
    // ignore
  }
}

export function getStoredContacts(): StoredContactRecord[] {
  try {
    const raw = rawGetItem('leniva_admin_contacts')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_INITIAL_CONTACTS
}

export function saveStoredContacts(contacts: StoredContactRecord[]): void {
  try {
    window.localStorage.setItem('leniva_admin_contacts', JSON.stringify(contacts))
  } catch {
    // ignore
  }
}

let lastEnquirySig = ''
let lastEnquiryTs = 0

export async function recordCustomerEnquiry(payload: {
  fullName: string
  email: string
  phone?: string
  company?: string
  productOrService?: string
  quantity?: string
  application?: string
  timeline?: string
  subject?: string
  message?: string
  source?: string
  enquiryType?: 'quote' | 'demo' | 'consultation' | 'trial' | 'contact'
}): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const sig = `${(payload.fullName || '').trim().toLowerCase()}|${(payload.email || '').trim().toLowerCase()}|${(payload.phone || '').trim()}`
  const nowCheck = Date.now()
  if (sig && sig !== '||' && sig === lastEnquirySig && nowCheck - lastEnquiryTs < 4000) {
    return true
  }
  lastEnquirySig = sig
  lastEnquiryTs = nowCheck

  // Pull latest cloud state first so we append to the most up-to-date list
  try {
    await Promise.race([
      pullCmsStateFromCloud(),
      new Promise(resolve => setTimeout(resolve, 1200)),
    ])
  } catch {
    // ignore
  }

  const nowIso = new Date().toISOString()
  const uniqueId = Math.floor(Date.now() / 100) % 100000000

  // Intelligently classify enquiry type if not explicitly supplied
  let detectedType: 'quote' | 'demo' | 'consultation' | 'trial' | 'contact' = payload.enquiryType || 'quote'
  const combined = `${payload.productOrService || ''} ${payload.subject || ''} ${payload.source || ''} ${payload.message || ''}`.toLowerCase()
  if (!payload.enquiryType) {
    if (combined.includes('demo') || combined.includes('demonstration')) {
      detectedType = 'demo'
    } else if (combined.includes('consultation') || combined.includes('engineer') || combined.includes('specialist') || combined.includes('technical call')) {
      detectedType = 'consultation'
    } else if (combined.includes('trial') || combined.includes('evaluation')) {
      detectedType = 'trial'
    } else if (payload.source?.toLowerCase().includes('contact')) {
      detectedType = 'contact'
    }
  }

  const newQuote: StoredQuoteRecord = {
    id: uniqueId,
    name: (payload.fullName || 'Customer').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    company: (payload.company || '').trim(),
    service_or_product: (payload.productOrService || payload.subject || 'General Enquiry').trim(),
    quantity: (payload.quantity || '1').trim(),
    timeline: (payload.timeline || payload.application || 'Immediate').trim(),
    message: (payload.message || '').trim(),
    status: 'pending',
    created_at: nowIso,
    notes: payload.source ? `Submitted via ${payload.source}` : '',
    enquiry_type: detectedType,
  }

  const newContact: StoredContactRecord = {
    id: uniqueId,
    name: (payload.fullName || 'Customer').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    subject: (
      payload.subject ||
      `${payload.productOrService || 'Product / Service Enquiry'}${payload.company ? ` - ${payload.company}` : ''}`
    ).trim(),
    message: (
      payload.message ||
      `Requirement: ${payload.productOrService || 'General'} | Qty: ${payload.quantity || '1'}${payload.application ? ` | Application: ${payload.application}` : ''}`
    ).trim(),
    status: 'unread',
    created_at: nowIso,
    notes: payload.company ? `Company: ${payload.company}` : (payload.source ? `Source: ${payload.source}` : ''),
    enquiry_type: detectedType,
  }

  const currentQuotes = getStoredQuotes()
  const updatedQuotes = [newQuote, ...currentQuotes.filter(q => q.id !== uniqueId)]
  rawSetItem('leniva_admin_quotes', JSON.stringify(updatedQuotes))

  const currentContacts = getStoredContacts()
  const updatedContacts = [newContact, ...currentContacts.filter(c => c.id !== uniqueId)]
  rawSetItem('leniva_admin_contacts', JSON.stringify(updatedContacts))

  const now = Date.now()
  rawSetItem(UPDATED_AT_KEY, String(now))

  // Also attempt legacy PostgreSQL API endpoints in parallel if available
  fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: newQuote.name,
      company: newQuote.company,
      email: newQuote.email,
      phone: newQuote.phone,
      productOrService: newQuote.service_or_product,
      quantity: newQuote.quantity,
      application: newQuote.timeline,
      message: newQuote.message,
    }),
  }).catch(() => null)

  fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
      subject: newContact.subject,
      message: newContact.message,
    }),
  }).catch(() => null)

  // Push to Cloud CMS immediately
  await pushCmsStateToCloud({ isEnquirySubmission: true }).catch(() => false)
  dispatchAllCmsUpdatedEvents()
  return true
}

async function fetchBytebinBlob(bytebinKey: string): Promise<Record<string, string | null> | null> {
  if (!bytebinKey) return null
  try {
    const res = await fetch(`https://bytebin.lucko.me/${bytebinKey}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json = await res.json()
    if (json && json.keys && typeof json.keys === 'object') {
      return json.keys
    }
  } catch {
    // ignore
  }
  return null
}

async function fetchCloudCandidates(): Promise<
  Array<{
    updatedAt: number
    bytebinKey?: string | null
    keys?: Record<string, string | null>
    inlineKeys?: Record<string, string | null>
  }>
> {
  const candidates: Array<{
    updatedAt: number
    bytebinKey?: string | null
    keys?: Record<string, string | null>
    inlineKeys?: Record<string, string | null>
  }> = []

  const fetchApiCms = async () => {
    try {
      const res = await fetch('/api/cms', {
        headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      })
      const ct = res.headers.get('content-type') || ''
      if (res.ok && ct.includes('application/json')) {
        const json = await res.json()
        if (json && typeof json.updatedAt === 'number') {
          candidates.push(json)
        }
      }
    } catch {
      // ignore
    }
  }

  const fetchRestful = async () => {
    try {
      const res = await fetch(RESTFUL_URL, {
        headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      })
      if (res.ok) {
        const json = await res.json()
        if (json?.data && typeof json.data.updatedAt === 'number') {
          candidates.push(json.data)
        }
      }
    } catch {
      // ignore
    }
  }

  const fetchNtfy = async () => {
    try {
      const res = await fetch(NTFY_POLL_URL, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      if (res.ok) {
        const text = await res.text()
        const lines = text
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean)
        let newest: any = null
        for (const line of lines) {
          try {
            const evt = JSON.parse(line)
            if (evt.event === 'message' && evt.message) {
              const parsed = JSON.parse(evt.message)
              if (parsed && typeof parsed.updatedAt === 'number') {
                if (!newest || parsed.updatedAt > newest.updatedAt) {
                  newest = parsed
                }
              }
            }
          } catch {
            // ignore
          }
        }
        if (newest) candidates.push(newest)
      }
    } catch {
      // ignore
    }
  }

  await Promise.allSettled([fetchApiCms(), fetchRestful(), fetchNtfy()])
  return candidates
}

export async function pullCmsStateFromCloud(forceApply = false): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (activePushPromise) {
    await activePushPromise.catch(() => false)
  }

  try {
    const candidates = await fetchCloudCandidates()
    const validCandidates = candidates.filter(c => c && typeof c.updatedAt === 'number' && c.updatedAt > 0)

    if (validCandidates.length === 0) {
      // Cloud has not been seeded yet — if this browser has real admin customizations, seed the cloud!
      const localSnap = collectLocalCmsSnapshot()
      if (localSnap.hasAdminCustomizations) {
        await pushCmsStateToCloud()
      }
      return false
    }

    validCandidates.sort((a, b) => b.updatedAt - a.updatedAt)
    const winner = validCandidates[0]

    // Merge inline keys + full Bytebin keys
    let resolvedKeys: Record<string, string | null> = {
      ...(winner.inlineKeys || {}),
      ...(winner.keys || {}),
    }

    if (winner.bytebinKey && (!winner.keys || Object.keys(winner.keys).length === 0)) {
      const blobKeys = await fetchBytebinBlob(winner.bytebinKey)
      if (blobKeys) {
        resolvedKeys = { ...resolvedKeys, ...blobKeys }
      }
    }

    const cleanCloudKeys: Record<string, string> = {}
    for (const [k, v] of Object.entries(resolvedKeys)) {
      if (typeof v === 'string' && v.length > 0 && v !== '__RESET__') {
        cleanCloudKeys[k] = v
      }
    }
    lastKnownCloudKeys = { ...cleanCloudKeys }

    // Check if this browser has local admin customizations that are missing in the cloud
    let hasUnpushedLocalKeys = false
    if (rawGetItem('leniva_admin_auth') === 'true') {
      for (const k of ADMIN_CONTENT_CHECK_KEYS) {
        const localVal = rawGetItem(k)
        if (localVal && !cleanCloudKeys[k]) {
          hasUnpushedLocalKeys = true
          break
        }
      }
    }

    let changedAnyKey = false
    isApplyingRemoteSync = true
    try {
      for (const k of SYNCED_CMS_KEYS) {
        if (k in cleanCloudKeys) {
          const remoteVal = cleanCloudKeys[k]
          const localVal = rawGetItem(k)

          if (k === 'leniva_admin_quotes') {
            try {
              const localArr = localVal ? JSON.parse(localVal) : []
              const remoteArr = remoteVal ? JSON.parse(remoteVal) : []
              if (Array.isArray(localArr) && Array.isArray(remoteArr)) {
                const mapById = new Map<number, any>()
                for (const item of localArr) {
                  if (item && item.id != null) mapById.set(Number(item.id), item)
                }
                for (const item of remoteArr) {
                  if (item && item.id != null) mapById.set(Number(item.id), item)
                }
                const mergedArr = Array.from(mapById.values()).sort((a, b) => {
                  const tsA = new Date(a.created_at || 0).getTime() || Number(a.id || 0)
                  const tsB = new Date(b.created_at || 0).getTime() || Number(b.id || 0)
                  return tsB - tsA
                })
                const mergedStr = JSON.stringify(mergedArr)
                if (localVal !== mergedStr) {
                  rawSetItem(k, mergedStr)
                  changedAnyKey = true
                }
                continue
              }
            } catch {
              // fallback
            }
          } else if (k === 'leniva_admin_contacts') {
            try {
              const localArr = localVal ? JSON.parse(localVal) : []
              const remoteArr = remoteVal ? JSON.parse(remoteVal) : []
              if (Array.isArray(localArr) && Array.isArray(remoteArr)) {
                const mapById = new Map<number, any>()
                for (const item of localArr) {
                  if (item && item.id != null) mapById.set(Number(item.id), item)
                }
                for (const item of remoteArr) {
                  if (item && item.id != null) mapById.set(Number(item.id), item)
                }
                const mergedArr = Array.from(mapById.values()).sort((a, b) => {
                  const tsA = new Date(a.created_at || 0).getTime() || Number(a.id || 0)
                  const tsB = new Date(b.created_at || 0).getTime() || Number(b.id || 0)
                  return tsB - tsA
                })
                const mergedStr = JSON.stringify(mergedArr)
                if (localVal !== mergedStr) {
                  rawSetItem(k, mergedStr)
                  changedAnyKey = true
                }
                continue
              }
            } catch {
              // fallback
            }
          }

          if (localVal !== remoteVal) {
            rawSetItem(k, remoteVal)
            changedAnyKey = true
          }
        }
      }
      rawSetItem(UPDATED_AT_KEY, String(winner.updatedAt))
    } finally {
      isApplyingRemoteSync = false
    }

    if (hasUnpushedLocalKeys) {
      await pushCmsStateToCloud()
    }

    if (changedAnyKey || forceApply) {
      dispatchAllCmsUpdatedEvents()
    }
    return changedAnyKey
  } catch (err) {
    console.warn('Cloud CMS pull warning:', err)
    return false
  }
}

let isInitialized = false

function runReleaseLocalStorageMigration(): void {
  const MIGRATION_KEY = 'leniva_release_migration_2026_10_22_v3'
  try {
    if (rawGetItem(MIGRATION_KEY) === '1') return

    // 1. Clean stale home page content overrides so updated hero banner 4, trusted partner text, and ARES Standard 2D slide show up
    const rawHome = rawGetItem('leniva_home_page_content_v1')
    if (rawHome) {
      try {
        const parsedHome = JSON.parse(rawHome)
        if (parsedHome && typeof parsedHome === 'object') {
          if (parsedHome.hero) {
            if (!parsedHome.hero.headlinePrefix || parsedHome.hero.headlinePrefix.includes('Authorized')) {
              parsedHome.hero.headlinePrefix = 'Your Trusted Partner in '
            }
            if (Array.isArray(parsedHome.hero.slides)) {
              parsedHome.hero.slides = parsedHome.hero.slides.map((s: any) => {
                const isDataImg = typeof s?.image === 'string' && (s.image.startsWith('data:') || s.image.startsWith('blob:'))
                const isCustomLocal = typeof s?.image === 'string' && s.image.startsWith('/images/')
                const isExternal = typeof s?.image === 'string' && (s.image.startsWith('http://') || s.image.startsWith('https://')) && !s.image.includes('localhost')
                const isStaleHash = typeof s?.image === 'string' && (s.image.includes('/assets/hero-banner-') || s.image.includes('/src/assets/hero/'))
                
                // If it's a stale bundle hash or invalid path, clean it so the fresh imported asset is loaded
                if (isStaleHash || (!isDataImg && !isCustomLocal && !isExternal)) {
                  const { image, ...rest } = s || {}
                  return rest
                }
                return s
              })
            }
          }
          if (parsedHome.cadSoftware?.ares && Array.isArray(parsedHome.cadSoftware.ares.slides)) {
            const has2d = parsedHome.cadSoftware.ares.slides.some(
              (sl: any) =>
                sl?.src === '/images/ares-standard/designed-for-2d-drawing-workflows.jpg' ||
                sl?.src === '/images/software/ares-standard.jpg'
            )
            if (!has2d) {
              parsedHome.cadSoftware.ares.slides = [
                { src: '/images/ares-standard/designed-for-2d-drawing-workflows.jpg', name: 'ARES Standard' },
                { src: '/images/software/ares-standard.jpg', name: 'ARES Standard 2D CAD' },
                ...parsedHome.cadSoftware.ares.slides,
              ]
            }
          }
          rawSetItem('leniva_home_page_content_v1', JSON.stringify(parsedHome))
        }
      } catch {
        rawRemoveItem('leniva_home_page_content_v1')
      }
    }

    // 2. Clean stale about page content overrides
    const rawAbout = rawGetItem('leniva_about_page_content_v1')
    if (rawAbout) {
      try {
        const parsedAbout = JSON.parse(rawAbout)
        if (parsedAbout && typeof parsedAbout === 'object') {
          if (parsedAbout.hero) {
            parsedAbout.hero.quoteSubject = 'Schedule Engineering Consultation'
          }
          if (parsedAbout.heritage?.stat2Title && /hq|headquarters/i.test(parsedAbout.heritage.stat2Title)) {
            parsedAbout.heritage.stat2Title = 'Bengaluru Office'
          }
          if (parsedAbout.portfolio?.scannerCard) {
            parsedAbout.portfolio.scannerCard.linkUrl = '/products/3d-scanners'
          }
          if (parsedAbout.portfolio?.printerCard) {
            parsedAbout.portfolio.printerCard.linkUrl = '/products'
          }
          rawSetItem('leniva_about_page_content_v1', JSON.stringify(parsedAbout))
        }
      } catch {
        rawRemoveItem('leniva_about_page_content_v1')
      }
    }

    // 3. Clean stale site settings operational hours
    const rawSettings = rawGetItem('leniva_site_settings')
    if (rawSettings) {
      try {
        const parsedSettings = JSON.parse(rawSettings)
        if (parsedSettings && typeof parsedSettings === 'object') {
          parsedSettings.workingHours = 'Monday – Friday: 9:30 AM – 6:00 PM IST | Saturday: 9:30 AM – 1:30 PM IST'
          rawSetItem('leniva_site_settings', JSON.stringify(parsedSettings))
        }
      } catch {
        rawRemoveItem('leniva_site_settings')
      }
    }

    // 4. Clean stale blog post images with old Vite bundle hashes or missing paths
    const rawBlogs = rawGetItem('leniva_admin_blogs_catalog')
    if (rawBlogs) {
      try {
        const parsedBlogs = JSON.parse(rawBlogs)
        if (Array.isArray(parsedBlogs) && parsedBlogs.length > 0) {
          const publicBlogImages: Record<string, string> = {
            'blog-1': '/images/blogs/blog-reverse-engineering.jpg',
            'blog-2': '/images/blogs/blog-fdm-lcd-dlp.jpg',
            'blog-3': '/images/blogs/blog-3d-scanning-inspection.jpg',
            'blog-4': '/images/blogs/blog-cad-additive-manufacturing.jpg',
            'blog-5': '/images/blogs/blog-industrial-3d-printing.jpg',
          }
          let modified = false
          parsedBlogs.forEach((b: any) => {
            const isStale = typeof b?.image === 'string' && (b.image.includes('/assets/blog-') || b.image.includes('/src/assets/blogs/'))
            if (isStale || !b?.image) {
              b.image = publicBlogImages[b.id] || publicBlogImages[b.slug] || '/images/blogs/blog-reverse-engineering.jpg'
              modified = true
            }
          })
          if (modified) {
            rawSetItem('leniva_admin_blogs_catalog', JSON.stringify(parsedBlogs))
          }
        }
      } catch {
        rawRemoveItem('leniva_admin_blogs_catalog')
      }
    }

    rawSetItem(MIGRATION_KEY, '1')
    dispatchAllCmsUpdatedEvents()
  } catch (e) {
    console.warn('Migration warning:', e)
  }
}

function installGlobalEnquiryFormListener(): void {
  if (typeof window === 'undefined') return
  window.addEventListener(
    'submit',
    (e: Event) => {
      try {
        if (isOnAdminRoute()) return
        const form = e.target as HTMLFormElement | null
        if (!form || form.tagName !== 'FORM') return

        const elements = Array.from(
          form.querySelectorAll('input, select, textarea')
        ) as Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        if (elements.length < 2) return

        let fullName = ''
        let email = ''
        let phone = ''
        let company = ''
        let productOrService = ''
        let quantity = ''
        let application = ''
        let message = ''

        for (const el of elements) {
          if (el instanceof HTMLInputElement && (el.type === 'submit' || el.type === 'button' || el.type === 'checkbox' || el.type === 'radio' || el.type === 'file')) {
            continue
          }
          const val = (el.value || '').trim()
          if (!val) continue

          const labelEl = el.closest('div')?.querySelector('label')
          const descriptor = `${el.name || ''} ${el.id || ''} ${el.getAttribute('placeholder') || ''} ${labelEl?.textContent || ''}`.toLowerCase()

          if (!email && ((el instanceof HTMLInputElement && el.type === 'email') || descriptor.includes('email') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
            email = val
          } else if (!phone && ((el instanceof HTMLInputElement && el.type === 'tel') || /phone|mobile|whatsapp|contact\s*no|number/.test(descriptor))) {
            phone = val
          } else if (!fullName && /name|person|applicant/.test(descriptor) && !/company|product|business|firm/.test(descriptor)) {
            fullName = val
          } else if (!company && /company|organization|organisation|institution|firm|studio|business/.test(descriptor)) {
            company = val
          } else if (el.tagName === 'TEXTAREA' || /message|requirement|detail|note|comment|cover/.test(descriptor)) {
            if (!message) message = val
          } else if (!quantity && /quantity|qty|license|seat|unit/.test(descriptor)) {
            quantity = val
          } else if (!productOrService && /product|service|plan|model|position|role|subject|interest|category/.test(descriptor)) {
            productOrService = val
          } else if (!application && /application|industry|timeline|area|preference|host|country|city/.test(descriptor)) {
            application = val
          }
        }

        // Ignore forms that don't have at least an email or phone (e.g., search bars or review forms)
        if (!email && !phone) return

        const pageTitle = (typeof document !== 'undefined' ? document.title.split('|')[0].split('–')[0].trim() : '') || 'Website Enquiry'
        recordCustomerEnquiry({
          fullName: fullName || 'Website Visitor',
          email,
          phone,
          company,
          productOrService: productOrService || pageTitle,
          quantity: quantity || '1',
          application: application || 'Immediate',
          message,
          source: pageTitle,
        }).catch(() => false)
      } catch {
        // ignore
      }
    },
    true
  )
}

export async function initCloudCmsSync(options?: { timeoutMs?: number }): Promise<void> {
  if (typeof window === 'undefined') return
  installStorageInterceptor()
  runReleaseLocalStorageMigration()

  if (isInitialized) return
  isInitialized = true
  installGlobalEnquiryFormListener()

  const timeoutMs = options?.timeoutMs ?? 1200

  await Promise.race([
    pullCmsStateFromCloud(),
    new Promise<void>(resolve => setTimeout(resolve, timeoutMs)),
  ])

  window.addEventListener('focus', () => {
    pullCmsStateFromCloud().catch(() => false)
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pullCmsStateFromCloud().catch(() => false)
    }
  })

  setInterval(() => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      pullCmsStateFromCloud().catch(() => false)
    }
  }, 8000)
}
