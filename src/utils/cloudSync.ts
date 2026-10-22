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
  'leniva_custom_cad_products',
  'leniva_home_page_content_v1',
  'leniva_about_page_content_v1',
  'leniva_navigation_config',
  'leniva_admin_blogs_catalog',
  'leniva_admin_password',
] as const

const COMPACT_INLINE_KEYS = [
  'leniva_admin_password',
  'leniva_site_settings',
  'leniva_cad_software_edits',
  'leniva_custom_cad_products',
  'leniva_home_page_content_v1',
  'leniva_about_page_content_v1',
  'leniva_navigation_config',
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
      if (isOnAdminRoute()) {
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

export async function pushCmsStateToCloud(): Promise<boolean> {
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
        if (typeof val === 'string' && val.length < 35000) {
          inlineKeys[k] = val
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
          body: JSON.stringify({ updatedAt, bytebinKey, keys }),
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

export async function initCloudCmsSync(options?: { timeoutMs?: number }): Promise<void> {
  if (typeof window === 'undefined') return
  installStorageInterceptor()

  if (isInitialized) return
  isInitialized = true

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
