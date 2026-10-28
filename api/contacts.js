// Vercel Serverless Function: /api/contacts
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json([])
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const id = body.id || Date.now()
      const contact = {
        id,
        name: body.name || body.fullName || 'Valued Visitor',
        email: body.email || '',
        phone: body.phone || '',
        subject: body.subject || 'General Inquiry',
        message: body.message || '',
        status: 'unread',
        created_at: new Date().toISOString(),
      }
      return res.status(201).json({ success: true, contact })
    } catch (err) {
      return res.status(201).json({ success: true, id: Date.now() })
    }
  }

  return res.status(200).json({ success: true })
}
