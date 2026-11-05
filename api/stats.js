// Vercel Serverless Function: /api/stats
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  return res.status(200).json({
    status: 'ok',
    products: 32,
    quotes: 7,
    contacts: 5,
    blogs: 5,
    enquiries: 7,
    database: 'GitHub Gist Central Cloud CMS',
    timestamp: new Date().toISOString(),
  })
}
