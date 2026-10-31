import fs from 'fs'
import os from 'os'
import path from 'path'

const RESTFUL_OBJECT_ID = 'ff808181a09d98f701a1436dd2b96f43'
const RESTFUL_URL = `https://api.restful-api.dev/objects/${RESTFUL_OBJECT_ID}`
const NTFY_TOPIC = 'leniva_cad_cms_prod_v3'
const NTFY_POST_URL = `https://ntfy.sh/${NTFY_TOPIC}`
const NTFY_POLL_URL = `https://ntfy.sh/${NTFY_TOPIC}/json?poll=1&since=all`
const BYTEBIN_POST_URL = 'https://bytebin.lucko.me/post'
const TMP_CACHE_FILE = path.join(os.tmpdir(), 'leniva_cms_state_v3.json')

let memoryCache = null

function readLocalCache() {
  if (memoryCache && memoryCache.updatedAt) return memoryCache
  try {
    if (fs.existsSync(TMP_CACHE_FILE)) {
      const raw = fs.readFileSync(TMP_CACHE_FILE, 'utf8')
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed.updatedAt === 'number') {
        memoryCache = parsed
        return parsed
      }
    }
  } catch {
    // ignore
  }
  return null
}

function writeLocalCache(state) {
  memoryCache = state
  try {
    fs.writeFileSync(TMP_CACHE_FILE, JSON.stringify(state), 'utf8')
  } catch {
    // ignore
  }
}

async function fetchBytebin(key) {
  if (!key) return null
  try {
    const res = await fetch(`https://bytebin.lucko.me/${key}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function fetchFromRestful() {
  try {
    const res = await fetch(RESTFUL_URL, {
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data || null
  } catch {
    return null
  }
}

async function fetchFromNtfy() {
  try {
    const res = await fetch(NTFY_POLL_URL, {
      headers: { 'Cache-Control': 'no-cache' },
    })
    if (!res.ok) return null
    const text = await res.text()
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
    let newest = null
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
        // ignore malformed line
      }
    }
    return newest
  } catch {
    return null
  }
}

async function getLatestCloudState() {
  const [restfulPtr, ntfyPtr] = await Promise.all([
    fetchFromRestful(),
    fetchFromNtfy(),
  ])
  const cached = readLocalCache()

  const candidates = [restfulPtr, ntfyPtr, cached].filter(
    c => c && typeof c.updatedAt === 'number' && c.updatedAt > 0
  )

  if (candidates.length === 0) {
    return { updatedAt: 0, bytebinKey: null, keys: {} }
  }

  candidates.sort((a, b) => b.updatedAt - a.updatedAt)
  const winner = candidates[0]

  let fullKeys = { ...(winner.inlineKeys || winner.keys || {}) }
  if (winner.bytebinKey) {
    const blob = await fetchBytebin(winner.bytebinKey)
    if (blob && blob.keys && typeof blob.keys === 'object') {
      fullKeys = { ...fullKeys, ...blob.keys }
    }
  }

  const finalState = {
    updatedAt: winner.updatedAt,
    bytebinKey: winner.bytebinKey || null,
    keys: fullKeys,
  }
  writeLocalCache(finalState)
  return finalState
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      const state = await getLatestCloudState()
      return res.status(200).json({
        success: true,
        updatedAt: state.updatedAt,
        bytebinKey: state.bytebinKey,
        keys: state.keys,
      })
    } catch (err) {
      return res.status(200).json({
        success: false,
        updatedAt: 0,
        keys: {},
        error: err?.message || 'Failed to load cloud CMS state',
      })
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const updatedAt = Number(body.updatedAt) || Date.now()
      const incomingKeys = body.keys && typeof body.keys === 'object' ? body.keys : {}

      // Merge with existing cloud keys so partial updates from any device preserve all other sections
      const existing = await getLatestCloudState().catch(() => ({ keys: {} }))
      const mergedKeys = { ...(existing.keys || {}) }

      for (const [k, v] of Object.entries(incomingKeys)) {
        if (v === '__RESET__') {
          delete mergedKeys[k]
        } else if (typeof v === 'string' && v.length > 0) {
          if (
            body.isEnquirySubmission &&
            (k === 'leniva_admin_quotes' || k === 'leniva_admin_contacts' || k === 'leniva_admin_enquiries') &&
            mergedKeys[k]
          ) {
            try {
              const existingArr = JSON.parse(mergedKeys[k])
              const incomingArr = JSON.parse(v)
              if (Array.isArray(existingArr) && Array.isArray(incomingArr)) {
                const mapById = new Map()
                for (const item of existingArr) {
                  if (item && item.id != null) mapById.set(String(item.id), item)
                }
                for (const item of incomingArr) {
                  if (item && item.id != null) mapById.set(String(item.id), item)
                }
                const combined = Array.from(mapById.values()).sort(
                  (a, b) => Number(b.id || 0) - Number(a.id || 0)
                )
                mergedKeys[k] = JSON.stringify(combined)
                continue
              }
            } catch {
              // fallback to direct assignment
            }
          }
          mergedKeys[k] = v
        }
      }

      let bytebinKey = null
      try {
        const bRes = await fetch(BYTEBIN_POST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updatedAt, keys: mergedKeys }),
        })
        if (bRes.ok) {
          const bJson = await bRes.json()
          bytebinKey = bJson.key || null
        }
      } catch {
        bytebinKey = body.bytebinKey || null
      }

      const inlineKeys = {}
      const compactKeyNames = [
        'leniva_admin_password',
        'leniva_site_settings',
        'leniva_cad_software_edits',
        'leniva_custom_cad_products',
        'leniva_home_page_content_v1',
        'leniva_about_page_content_v1',
        'leniva_navigation_config',
        'leniva_admin_quotes',
        'leniva_admin_contacts',
        'leniva_admin_enquiries',
      ]
      for (const k of compactKeyNames) {
        if (k in mergedKeys) {
          const val = mergedKeys[k]
          if (typeof val === 'string' && val.length < 35000) {
            inlineKeys[k] = val
          }
        }
      }

      const pointer = {
        updatedAt,
        bytebinKey,
        inlineKeys,
      }

      writeLocalCache({ updatedAt, bytebinKey, keys: mergedKeys })

      await Promise.allSettled([
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

      return res.status(200).json({
        success: true,
        updatedAt,
        bytebinKey,
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err?.message || 'Failed to save cloud CMS state',
      })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
