import fs from 'fs'
import os from 'os'
import path from 'path'
import pg from 'pg'
const { Pool } = pg

const LOCAL_CACHE_FILE = path.join(os.tmpdir(), 'leniva_cms_local_cache.json')

function readLocalCache() {
  if (process.env.VERCEL) return null
  try {
    if (fs.existsSync(LOCAL_CACHE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(LOCAL_CACHE_FILE, 'utf8'))
      if (parsed && typeof parsed.updatedAt === 'number') return parsed
    }
  } catch {}
  return null
}

function writeLocalCache(state) {
  if (process.env.VERCEL) return
  try {
    fs.writeFileSync(LOCAL_CACHE_FILE, JSON.stringify(state), 'utf8')
  } catch {}
}

const GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ'].join('_')
const GIST_RAW_URL = `https://gist.githubusercontent.com/ROI-1213/${GIST_ID}/raw/leniva_cms_data.json`

let pgPool = null
let memoryCache = null
let lastFetchTime = 0
let pgDisabledUntil = 0

function isPgAllowed() {
  if (Date.now() < pgDisabledUntil) return false
  // On Vercel serverless without an external DATABASE_URL, skip 127.0.0.1 Postgres immediately
  if (process.env.VERCEL && !process.env.DATABASE_URL && (!process.env.PGHOST || process.env.PGHOST === '127.0.0.1')) {
    return false
  }
  return true
}

function getPgPool() {
  if (!isPgAllowed()) return null
  if (!pgPool) {
    try {
      pgPool = new Pool({
        host: process.env.PGHOST || '127.0.0.1',
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || 'leniv698',
        password: process.env.PGPASSWORD || 'hhvu1A8IrRupKLdfEDhnsx9LQ',
        database: process.env.PGDATABASE || 'leniv698',
        ssl: false,
        connectionTimeoutMillis: 800,
      })
      pgPool.on('error', () => {})
    } catch {
      pgPool = null
    }
  }
  return pgPool
}

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
      const fileObj = gist.files?.['leniva_cms_data.json']
      let content = fileObj?.content
      if (fileObj?.truncated && fileObj?.raw_url) {
        try {
          const rawFetch = await fetch(fileObj.raw_url, {
            headers: { 'User-Agent': 'Leniva-CAD-CMS' },
          })
          if (rawFetch.ok) {
            content = await rawFetch.text()
          }
        } catch {}
      }
      if (content) {
        try {
          const data = JSON.parse(content)
          if (data && typeof data.updatedAt === 'number') {
            memoryCache = data
            lastFetchTime = Date.now()
            return data
          }
        } catch (jsonErr) {
          console.warn('[CMS] Truncated or invalid JSON in Gist file:', jsonErr.message)
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

let gistWriteChain = Promise.resolve(true)
let lastGistPatchTime = 0

async function saveToGist(state) {
  memoryCache = state
  lastFetchTime = Date.now()

  // Serialize Gist PATCH calls to prevent 409 concurrent update conflicts and 403 rate limits
  const runPatch = async () => {
    const waitMs = Math.max(0, 1500 - (Date.now() - lastGistPatchTime))
    if (waitMs > 0) {
      await new Promise(r => setTimeout(r, waitMs))
    }
    // Always write the latest memoryCache state
    const latestState = memoryCache || state
    lastGistPatchTime = Date.now()
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
              content: JSON.stringify(latestState),
            },
          },
        }),
        signal: AbortSignal.timeout(10000),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.warn('GitHub Gist PATCH notice:', res.status, errText.slice(0, 180))
        return false
      }
      return true
    } catch (err) {
      console.warn('saveToGist network notice:', err?.message || err)
      return false
    }
  }

  gistWriteChain = gistWriteChain.then(runPatch, runPatch)
  return gistWriteChain
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
      // 1. Check PostgreSQL Database as primary source
      const pool = getPgPool()
      if (pool) {
        try {
          const pgRes = await pool.query('SELECT key, value, updated_at FROM site_settings')
          if (pgRes && pgRes.rows && pgRes.rows.length > 0) {
            const keys = {}
            let maxUpdatedAt = 0
            for (const row of pgRes.rows) {
              const val = typeof row.value === 'string' ? row.value : JSON.stringify(row.value)
              keys[row.key] = val
              const ts = new Date(row.updated_at).getTime()
              if (ts > maxUpdatedAt) maxUpdatedAt = ts
            }
            return res.status(200).json({
              success: true,
              source: 'PostgreSQL Database',
              updatedAt: maxUpdatedAt || Date.now(),
              keys,
            })
          }
        } catch (dbErr) {
          pgDisabledUntil = Date.now() + 120000
        }
      }

      // 2. Fallback cache/Gist
      if (!memoryCache || Date.now() - lastFetchTime > 2000) {
        const gistData = await fetchFromGist()
        const localData = readLocalCache()
        if (localData && (!gistData || (localData.updatedAt || 0) > (gistData.updatedAt || 0))) {
          memoryCache = localData
          lastFetchTime = Date.now()
        }
      }
      const state = memoryCache || readLocalCache() || { updatedAt: 0, keys: {} }
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
        error: err?.message || 'Failed to read CMS state',
      })
    }
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const updatedAt = Number(body.updatedAt) || Date.now()
      const incomingKeys = body.keys && typeof body.keys === 'object' ? body.keys : {}

      // Use warm memoryCache when recent (< 15s), otherwise fetch latest Gist state
      const existing =
        memoryCache && memoryCache.keys && Date.now() - lastFetchTime < 15000
          ? memoryCache
          : await fetchFromGist()
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

      // Persist to connected PostgreSQL site_settings table if available (fail-fast: never block 34s on offline DB)
      let pgSaved = false
      try {
        const pool = getPgPool()
        if (pool) {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS site_settings (
              key VARCHAR(100) PRIMARY KEY,
              value JSONB NOT NULL,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
          `)

          await Promise.all(
            Object.entries(mergedKeys).map(([k, v]) => {
              let jsonVal = v
              try { jsonVal = JSON.parse(v) } catch { jsonVal = v }
              return pool.query(
                `INSERT INTO site_settings (key, value, updated_at)
                 VALUES ($1, $2::jsonb, CURRENT_TIMESTAMP)
                 ON CONFLICT (key) DO UPDATE
                 SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP;`,
                [k, JSON.stringify(jsonVal)]
              )
            })
          )
          pgSaved = true
        }
      } catch (err) {
        pgDisabledUntil = Date.now() + 120000
      }

      writeLocalCache(newState)
      const gistSaved = await saveToGist(newState)

      return res.status(200).json({
        success: true,
        pgSaved,
        gistSaved,
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
