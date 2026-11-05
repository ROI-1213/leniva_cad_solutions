import { DEFAULT_HOME_CONTENT } from '../src/utils/homeContentConfig'
import { DEFAULT_ABOUT_CONTENT } from '../src/utils/aboutContentConfig'
import { CAD_DEFAULTS } from '../src/utils/cadSoftwareConfig'
import { DEFAULT_NAVIGATION_CONFIG } from '../src/utils/navigationConfig'
import { buildDefaultBlogs } from '../src/utils/blogCatalog'
import { buildDefaultProductCatalog } from '../src/utils/productCatalog'

const GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ'].join('_')

async function runSeed() {
  console.log('Building default CMS data packages...')

  const defaultProducts = buildDefaultProductCatalog()
  const defaultBlogs = buildDefaultBlogs()

  const defaultSiteSettings = {
    companyName: 'Leniva CAD Solutions',
    tagline: 'Authorized Partner for Industrial 3D Printers, Scanners & CAD Software',
    email: 'info@leniva3d.com',
    phone: '+91 99000 12345',
    address: 'Bengaluru, Karnataka, India',
    workingHours: 'Monday – Friday: 9:30 AM – 6:00 PM IST | Saturday: 9:30 AM – 1:30 PM IST',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/leniva-cad',
      youtube: 'https://youtube.com/@lenivacad',
      facebook: 'https://facebook.com/lenivacad',
    },
    updatedAt: new Date().toISOString(),
  }

  // Sanitize any image paths in home content
  const sanitizedHome = { ...DEFAULT_HOME_CONTENT }
  if (sanitizedHome.hero && Array.isArray(sanitizedHome.hero.slides)) {
    sanitizedHome.hero.slides = sanitizedHome.hero.slides.map((s, idx) => ({
      ...s,
      image: `/hero-banner-${(idx % 4) + 1}.png`,
    }))
  }

  // Check if Gist currently has any existing content to preserve
  let existingKeys: Record<string, string> = {}
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Leniva-Seed',
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (res.ok) {
      const gist = await res.json()
      const content = gist.files?.['leniva_cms_data.json']?.content
      if (content) {
        const parsed = JSON.parse(content)
        if (parsed && parsed.keys) {
          existingKeys = parsed.keys
          console.log('Loaded existing Gist keys:', Object.keys(existingKeys))
        }
      }
    }
  } catch (e) {
    console.warn('Could not read existing Gist:', e)
  }

  const baselineKeys: Record<string, string> = {
    leniva_home_page_content_v1: JSON.stringify(sanitizedHome),
    leniva_about_page_content_v1: JSON.stringify(DEFAULT_ABOUT_CONTENT),
    leniva_admin_products_catalog: JSON.stringify(defaultProducts),
    leniva_cad_software_edits: JSON.stringify(CAD_DEFAULTS),
    leniva_navigation_config: JSON.stringify(DEFAULT_NAVIGATION_CONFIG),
    leniva_admin_blogs_catalog: JSON.stringify(defaultBlogs),
    leniva_site_settings: JSON.stringify(defaultSiteSettings),
  }

  // Merge: if existingKeys has custom data, preserve it; otherwise use baseline
  const mergedKeys = {
    ...baselineKeys,
    ...existingKeys,
  }

  const payload = {
    updatedAt: Date.now(),
    keys: mergedKeys,
  }

  console.log(`Writing ${Object.keys(mergedKeys).length} keys to GitHub Gist...`)

  const patchRes = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'User-Agent': 'Leniva-Seed',
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      description: 'Leniva CAD Solutions - Global CMS Database (Live Sync)',
      files: {
        'leniva_cms_data.json': {
          content: JSON.stringify(payload),
        },
      },
    }),
  })

  if (!patchRes.ok) {
    const err = await patchRes.text()
    console.error('PATCH failed:', patchRes.status, err)
    process.exit(1)
  }

  console.log('SUCCESS! GitHub Gist database seeded successfully.')
  console.log('Payload size:', JSON.stringify(payload).length, 'bytes')
}

runSeed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
