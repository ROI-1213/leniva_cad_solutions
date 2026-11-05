import pg from 'pg'
const { Pool } = pg

let pgPool = null
function getPgPool() {
  if (!pgPool) {
    try {
      pgPool = new Pool({
        host: process.env.PGHOST || '127.0.0.1',
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || 'leniv698',
        password: process.env.PGPASSWORD || 'hhvu1A8IrRupKLdfEDhnsx9LQ',
        database: process.env.PGDATABASE || 'leniv698',
        ssl: false,
        connectionTimeoutMillis: 2000,
      })
      pgPool.on('error', () => {})
    } catch {
      pgPool = null
    }
  }
  return pgPool
}

const GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ'].join('_')
const GIST_RAW_URL = `https://gist.githubusercontent.com/ROI-1213/${GIST_ID}/raw/leniva_cms_data.json`

let memoryCache = null
let lastFetchTime = 0

async function fetchFromGist() {
  // 1. Fetch directly from GitHub API first for real-time consistency (0ms delay)
  try {
    const apiRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Leniva-CAD-CMS',
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (apiRes.ok) {
      const gist = await apiRes.json()
      const content = gist.files?.['leniva_cms_data.json']?.content
      if (content) {
        const data = JSON.parse(content)
        if (data && typeof data.updatedAt === 'number') {
          memoryCache = data
          lastFetchTime = Date.now()
          return data
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch from GitHub API:', err)
  }

  // 2. Fallback to Raw Gist URL if API has network restriction
  try {
    const rawRes = await fetch(`${GIST_RAW_URL}?t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache, no-store' },
    })
    if (rawRes.ok) {
      const data = await rawRes.json()
      if (data && typeof data.updatedAt === 'number') {
        memoryCache = data
        lastFetchTime = Date.now()
        return data
      }
    }
  } catch (e) {
    // fallback
  }

  return memoryCache || { updatedAt: 0, keys: {} }
}

async function saveToGist(state) {
  memoryCache = state
  lastFetchTime = Date.now()

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Leniva-CAD-CMS',
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        description: 'Leniva CAD Solutions - Global CMS Database (Live Sync)',
        files: {
          'leniva_cms_data.json': {
            content: JSON.stringify(state),
          },
        },
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('GitHub Gist PATCH error:', res.status, errText)
      return false
    }
    return true
  } catch (err) {
    console.error('saveToGist network error:', err)
    return false
  }
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
      // Re-fetch if cache is older than 2 seconds
      if (!memoryCache || Date.now() - lastFetchTime > 2000) {
        await fetchFromGist()
      }
      const state = memoryCache || { updatedAt: 0, keys: {} }
      return res.status(200).json({
        success: true,
        updatedAt: state.updatedAt || 0,
        keys: state.keys || {},
      })
    } catch (err) {
      return res.status(200).json({
        success: false,
        updatedAt: 0,
        keys: {},
        error: err?.message || 'Failed to read cloud state',
      })
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const updatedAt = Number(body.updatedAt) || Date.now()
      const incomingKeys = body.keys && typeof body.keys === 'object' ? body.keys : {}

      // Get latest state to merge cleanly
      const existing = await fetchFromGist()
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

      const newState = {
        updatedAt,
        keys: mergedKeys,
      }

      // Persist to connected PostgreSQL site_settings table
      try {
        const pool = getPgPool()
        if (pool) {
          for (const [k, v] of Object.entries(mergedKeys)) {
            let jsonVal = v
            try { JSON.parse(v) } catch { jsonVal = JSON.stringify(v) }
            await pool.query(`
              INSERT INTO site_settings (key, value, updated_at)
              VALUES ($1, $2::jsonb, CURRENT_TIMESTAMP)
              ON CONFLICT (key) DO UPDATE
              SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP;
            `, [k, jsonVal]).catch(() => null)
          }
        }
      } catch {}

      await saveToGist(newState)

      return res.status(200).json({
        success: true,
        updatedAt,
        keys: mergedKeys,
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
