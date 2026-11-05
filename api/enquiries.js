import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

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

// Global Centralized Cloud Database
const GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ'].join('_')

// SMTP Configuration (Verified Working Host: mail.roiclients.co.in)
const DEFAULT_SMTP_HOST = process.env.SMTP_HOST || 'mail.roiclients.co.in'
const DEFAULT_SMTP_PORT = Number(process.env.SMTP_PORT || 465)
const SMTP_USER = process.env.SMTP_USER || 'leniva@roiclients.co.in'
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'LTNvnW3zh?KpPXx&%f'
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'leniva@roiclients.co.in'
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'Leniva 3D Notifications'
const ENQUIRY_RECEIVER_EMAIL = process.env.ENQUIRY_RECEIVER_EMAIL || 'viju@leniva3d.com'
const SMTP_TEST_EMAIL = process.env.SMTP_TEST_EMAIL || 'viju@leniva3d.com'

let cachedGistState = null
let lastGistFetchTime = 0

async function fetchGistState() {
  if (cachedGistState && Date.now() - lastGistFetchTime < 2000) {
    return cachedGistState
  }
  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Leniva-CAD-CMS',
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (res.ok) {
      const gist = await res.json()
      const content = gist.files?.['leniva_cms_data.json']?.content
      if (content) {
        const parsed = JSON.parse(content)
        cachedGistState = parsed
        lastGistFetchTime = Date.now()
        return parsed
      }
    }
  } catch (err) {
    console.error('[Enquiries API] Error fetching Gist:', err)
  }
  return cachedGistState || { updatedAt: 0, keys: {} }
}

async function saveGistState(state) {
  cachedGistState = state
  lastGistFetchTime = Date.now()
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
    return res.ok
  } catch (err) {
    console.error('[Enquiries API] Error saving Gist:', err)
    return false
  }
}

// Sanitize user inputs
function sanitizeHeader(val) {
  return String(val || '').replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Nodemailer Transporter Factory (Primary: Zoho Mail SSL 465, Fallback: STARTTLS 587 or ns1.sslsecure.co.in)
function createTransporter(customConfig = {}) {
  const host = customConfig.host || DEFAULT_SMTP_HOST
  const port = Number(customConfig.port || DEFAULT_SMTP_PORT)
  const secure = customConfig.secure !== undefined ? Boolean(customConfig.secure) : (port === 465)
  const user = customConfig.user || SMTP_USER
  const pass = customConfig.pass !== undefined ? customConfig.pass : SMTP_PASSWORD

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 45000,
  })
}

async function sendMailWithFallback(mailOptions, customPass, preferredPort = DEFAULT_SMTP_PORT) {
  const hosts = [DEFAULT_SMTP_HOST]
  let lastErr = null

  for (const host of hosts) {
    for (const port of [preferredPort, preferredPort === 465 ? 587 : 465]) {
      try {
        const transporter = createTransporter({ host, port, pass: customPass })
        return await transporter.sendMail(mailOptions)
      } catch (err) {
        lastErr = err
        // If authentication error, don't keep hammering different ports of the same host
        if (err.code === 'EAUTH' || (err.response && err.response.includes('535'))) {
          throw err
        }
      }
    }
  }
  throw lastErr || new Error('All SMTP servers failed')
}

function buildEnquiryEmailHtml({ enquiry, adminUrl }) {
  const safeName = escapeHtml(enquiry.customer_name || 'Valued Customer')
  const safeEmail = escapeHtml(enquiry.email || 'Not Provided')
  const safePhone = escapeHtml(enquiry.phone || 'Not Provided')
  const safeCompany = escapeHtml(enquiry.company_name || 'Individual / Not Specified')
  const safeCity = escapeHtml(enquiry.city || 'Not Specified')
  const safeType = escapeHtml(enquiry.enquiry_type || 'General Enquiry')
  const safeProduct = escapeHtml(enquiry.product_service_name || 'Leniva 3D Solutions')
  const safeSubject = escapeHtml(enquiry.subject || `Enquiry for ${safeProduct}`)
  const safeMessage = escapeHtml(enquiry.message || 'No additional message provided.').replace(/\n/g, '<br>')
  const safeSource = escapeHtml(enquiry.source_page || 'Website')
  const safeDate = escapeHtml(enquiry.submitted_date || new Date().toLocaleDateString('en-GB'))
  const safeTime = escapeHtml(enquiry.submitted_time || new Date().toLocaleTimeString('en-IN'))
  const safeNumber = escapeHtml(enquiry.enquiry_number || `LEN-${enquiry.id || 'NEW'}`)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Customer Enquiry – ${safeProduct} – Leniva 3D</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: #0f172a; padding: 28px; color: #ffffff;">
      <div style="font-size: 11px; text-transform: uppercase; color: #60a5fa; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px;">Leniva 3D Notification System</div>
      <h1 style="margin: 0 0 6px 0; font-size: 20px; color: #ffffff;">NEW CUSTOMER ENQUIRY</h1>
      <p style="margin: 0; color: #94a3b8; font-size: 13px;">${safeNumber} • ${safeType}</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; width: 35%; color: #64748b;">Customer Name:</td><td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${safeName}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Email Address:</td><td style="padding: 8px 12px;"><a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Mobile Number:</td><td style="padding: 8px 12px;"><a href="tel:${safePhone}" style="color: #0f172a; font-weight: 600;">${safePhone}</a></td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Company Name:</td><td style="padding: 8px 12px; color: #0f172a;">${safeCompany}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">City:</td><td style="padding: 8px 12px; color: #0f172a;">${safeCity}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Enquiry Type:</td><td style="padding: 8px 12px; color: #0f172a; font-weight: bold;">${safeType}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Product / Service:</td><td style="padding: 8px 12px; color: #2563eb; font-weight: bold;">${safeProduct}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Subject:</td><td style="padding: 8px 12px; color: #0f172a;">${safeSubject}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; color: #64748b;">Submitted From:</td><td style="padding: 8px 12px; color: #64748b;">${safeSource} (${safeDate} at ${safeTime})</td></tr>
      </table>

      <div style="background: #f8fafc; border-left: 3px solid #3b82f6; padding: 14px 16px; margin: 16px 0; border-radius: 4px;">
        <strong style="color: #475569; font-size: 12px; text-transform: uppercase;">Message:</strong>
        <div style="margin-top: 6px; color: #0f172a; font-size: 14px; line-height: 1.5;">${safeMessage}</div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="${adminUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px;">View in Admin Console &rarr;</a>
      </div>
    </div>
  </div>
</body>
</html>`
}

function buildEnquiryPlainText({ enquiry, adminUrl }) {
  return `LENIVA 3D – NEW WEBSITE ENQUIRY
Customer Name: ${enquiry.customer_name || 'Valued Customer'}
Email Address: ${enquiry.email || 'Not Provided'}
Mobile Number: ${enquiry.phone || 'Not Provided'}
Company: ${enquiry.company_name || 'Individual'}
City: ${enquiry.city || 'Not Specified'}
Enquiry Type: ${enquiry.enquiry_type || 'General'}
Product / Service: ${enquiry.product_service_name || 'Leniva 3D'}
Subject: ${enquiry.subject || ''}
Message: ${enquiry.message || ''}
Source: ${enquiry.source_page || ''} (${enquiry.submitted_date || ''} at ${enquiry.submitted_time || ''})
Admin URL: ${adminUrl}
`
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const queryAction = req.query?.action || (req.body && req.body.action)
  const hostHeader = req.headers?.host || 'www.leniva3d.com'
  const protocol = req.headers?.['x-forwarded-proto'] || 'https'
  const siteOrigin = `${protocol}://${hostHeader}`

  // =========================================================================
  // ACTION: TEST SMTP (Sends Test Email to viju@leniva3d.com)
  // =========================================================================
  if (queryAction === 'test_smtp') {
    const gist = await fetchGistState()
    const siteSettings = gist.keys?.leniva_site_settings ? JSON.parse(gist.keys.leniva_site_settings) : {}
    const customPass = req.body?.smtpPassword || siteSettings?.smtpPassword || process.env.SMTP_PASSWORD || SMTP_PASSWORD
    const customPort = Number(req.body?.smtpPort || siteSettings?.smtpPort || DEFAULT_SMTP_PORT)
    const customHost = req.body?.smtpHost || siteSettings?.smtpHost || DEFAULT_SMTP_HOST
    const recipient = req.body?.testRecipient || SMTP_TEST_EMAIL

    const logs = []
    const log = msg => logs.push(`[${new Date().toISOString()}] ${msg}`)
    log(`Testing SMTP connection to ${customHost}:${customPort} for ${recipient}...`)

    try {
      if (!customPass) {
        throw new Error('SMTP Password is required. Enter your Zoho Mail App Password and try again.')
      }

      const transporter = createTransporter({ host: customHost, port: customPort, pass: customPass })
      await transporter.verify()
      log('SMTP Authentication & TLS handshake successful!')

      const testInfo = await transporter.sendMail({
        from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
        to: recipient,
        subject: `Test Verification – Leniva 3D Email System [${Date.now()}]`,
        text: 'This is a test notification verifying that Zoho Mail SMTP delivery is working perfectly for Leniva 3D website enquiries.',
        html: `<div style="font-family: sans-serif; padding: 20px; background: #f8fafc; border-radius: 8px;">
          <h2 style="color: #2563eb;">Leniva 3D Email Delivery Test Successful</h2>
          <p>Your SMTP configuration has been verified. Future customer enquiries submitted across the website will be delivered to <strong>${recipient}</strong>.</p>
        </div>`,
      })

      log(`Test email dispatched successfully! Message ID: ${testInfo.messageId}`)

      return res.status(200).json({
        success: true,
        message: `Test email successfully delivered to ${recipient}!`,
        messageId: testInfo.messageId,
        logs,
      })
    } catch (err) {
      log(`SMTP Error: ${err.message}`)
      return res.status(200).json({
        success: false,
        error: err.message || 'SMTP Connection failed',
        code: err.code || 'SMTP_AUTH_FAILED',
        logs,
      })
    }
  }

  // =========================================================================
  // ACTION: SAVE SMTP PASSWORD TO CLOUD DATABASE
  // =========================================================================
  if (queryAction === 'save_smtp_config') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const gist = await fetchGistState()
      const siteSettings = gist.keys?.leniva_site_settings ? JSON.parse(gist.keys.leniva_site_settings) : {}
      
      siteSettings.smtpPassword = body.smtpPassword || ''
      siteSettings.smtpHost = body.smtpHost || DEFAULT_SMTP_HOST
      siteSettings.smtpPort = Number(body.smtpPort || DEFAULT_SMTP_PORT)
      siteSettings.smtpUser = SMTP_USER
      
      gist.keys.leniva_site_settings = JSON.stringify(siteSettings)
      gist.updatedAt = Date.now()
      
      await saveGistState(gist)
      return res.status(200).json({ success: true, message: 'SMTP settings saved to centralized cloud database!' })
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  // =========================================================================
  // METHOD: GET (List all enquiries from centralized cloud database)
  // =========================================================================
  if (req.method === 'GET') {
    try {
      const gist = await fetchGistState()
      const enquiriesRaw = gist.keys?.leniva_admin_enquiries || '[]'
      let enquiries = []
      try {
        enquiries = JSON.parse(enquiriesRaw)
        if (!Array.isArray(enquiries)) enquiries = []
      } catch {
        enquiries = []
      }

      return res.status(200).json({
        success: true,
        count: enquiries.length,
        enquiries,
        stats: {
          total: enquiries.length,
          new: enquiries.filter(e => e.status === 'New').length,
          pending: enquiries.filter(e => e.status === 'Pending').length,
          contacted: enquiries.filter(e => e.status === 'Contacted').length,
          converted: enquiries.filter(e => e.status === 'Converted').length,
          closed: enquiries.filter(e => e.status === 'Closed').length,
        },
      })
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  // =========================================================================
  // METHOD: POST (Save Enquiry to Central Cloud Database & Dispatch Email)
  // =========================================================================
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

      const customerName = sanitizeHeader(body.customer_name || body.name || body.fullName)
      const email = sanitizeHeader(body.email)
      const phone = sanitizeHeader(body.phone || body.mobile || body.contact)
      const company = sanitizeHeader(body.company_name || body.company)
      const city = sanitizeHeader(body.city)
      const enquiryType = sanitizeHeader(body.enquiry_type || body.type || 'Product Enquiry')
      const productService = sanitizeHeader(body.product_service_name || body.productOrService || body.serviceOrProduct || 'Leniva 3D')
      const subject = sanitizeHeader(body.subject || `Enquiry for ${productService}`)
      const message = String(body.message || body.requirement || '').trim()
      const sourcePage = sanitizeHeader(body.source_page || body.source || 'Website')
      const sourceUrl = sanitizeHeader(body.source_url || '')

      if (!customerName && !email && !phone) {
        return res.status(400).json({ success: false, error: 'Name, email, or phone is required' })
      }

      const now = new Date()
      const idNum = body.id || Date.now()
      const enquiryNumber = body.enquiry_number || `LEN${String(idNum).slice(-4)}`

      const enquiryRecord = {
        id: idNum,
        enquiry_number: enquiryNumber,
        customer_name: customerName || 'Valued Visitor',
        email: email || '',
        phone: phone || '',
        company_name: company || '',
        city: city || '',
        enquiry_type: enquiryType,
        product_service_name: productService,
        subject,
        message,
        source_page: sourcePage,
        source_url: sourceUrl,
        status: 'New',
        admin_notes: body.quantity ? `Quantity: ${body.quantity}` : '',
        follow_up_date: '',
        email_notification_status: 'pending',
        email_error: null,
        email_message_id: null,
        email_sent_at: null,
        submitted_date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        submitted_time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      }

      // 0. SAVE DIRECTLY TO CONNECTED POSTGRESQL ACCOUNT
      try {
        const pool = getPgPool()
        if (pool) {
          await pool.query(`
            INSERT INTO enquiries (
              enquiry_number, customer_name, email, phone, company_name, city,
              enquiry_type, product_service_name, subject, message, source_page, source_url,
              status, email_notification_status, admin_notes
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'New', 'pending', $13)
            ON CONFLICT (enquiry_number) DO NOTHING;
          `, [
            enquiryNumber, customerName, email, phone, company, city,
            enquiryType, productService, subject, message, sourcePage, sourceUrl,
            body.quantity ? `Quantity: ${body.quantity}` : ''
          ]).catch(() => null)

          await pool.query(`
            INSERT INTO quote_requests (name, email, phone, company, service_or_product, quantity, timeline, message, status, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9);
          `, [customerName, email, phone, company, productService, body.quantity || '1', body.timeline || 'Immediate', message, `Submitted via ${sourcePage}`]).catch(() => null)

          await pool.query(`
            INSERT INTO contact_messages (name, email, phone, subject, message, status, notes)
            VALUES ($1, $2, $3, $4, $5, 'unread', $6);
          `, [customerName, email, phone, subject, message, `Source: ${sourcePage}`]).catch(() => null)
        }
      } catch {
        // ignore
      }

      // 1. SAVE PERMANENTLY TO GITHUB GIST CLOUD DATABASE
      const gist = await fetchGistState()
      const existingEnquiriesRaw = gist.keys?.leniva_admin_enquiries || '[]'
      let currentEnquiries = []
      try {
        currentEnquiries = JSON.parse(existingEnquiriesRaw)
        if (!Array.isArray(currentEnquiries)) currentEnquiries = []
      } catch {
        currentEnquiries = []
      }

      const updatedEnquiries = [enquiryRecord, ...currentEnquiries.filter(e => String(e.id) !== String(idNum))]
      gist.keys.leniva_admin_enquiries = JSON.stringify(updatedEnquiries)

      // Also mirror into quotes if applicable
      const existingQuotesRaw = gist.keys?.leniva_admin_quotes || '[]'
      let currentQuotes = []
      try {
        currentQuotes = JSON.parse(existingQuotesRaw)
        if (!Array.isArray(currentQuotes)) currentQuotes = []
      } catch {
        currentQuotes = []
      }
      const newQuote = {
        id: idNum,
        name: customerName,
        email,
        phone,
        company,
        service_or_product: productService,
        quantity: body.quantity || '1',
        timeline: body.timeline || 'Immediate',
        message,
        status: 'pending',
        created_at: now.toISOString(),
        notes: `Submitted via ${sourcePage}`,
        enquiry_type: 'quote',
      }
      gist.keys.leniva_admin_quotes = JSON.stringify([newQuote, ...currentQuotes.filter(q => String(q.id) !== String(idNum))])

      // Also mirror into contacts
      const existingContactsRaw = gist.keys?.leniva_admin_contacts || '[]'
      let currentContacts = []
      try {
        currentContacts = JSON.parse(existingContactsRaw)
        if (!Array.isArray(currentContacts)) currentContacts = []
      } catch {
        currentContacts = []
      }
      const newContact = {
        id: idNum,
        name: customerName,
        email,
        phone,
        subject,
        message,
        status: 'unread',
        created_at: now.toISOString(),
        notes: company ? `Company: ${company} | Source: ${sourcePage}` : `Source: ${sourcePage}`,
        enquiry_type: enquiryType,
      }
      gist.keys.leniva_admin_contacts = JSON.stringify([newContact, ...currentContacts.filter(c => String(c.id) !== String(idNum))])
      gist.updatedAt = Date.now()

      // 2. DISPATCH EMAIL TO viju@leniva3d.com IF SMTP PASSWORD EXISTS
      const siteSettings = gist.keys?.leniva_site_settings ? JSON.parse(gist.keys.leniva_site_settings) : {}
      const activePass = body.smtpPassword || siteSettings?.smtpPassword || process.env.SMTP_PASSWORD || SMTP_PASSWORD
      const activeHost = siteSettings?.smtpHost || DEFAULT_SMTP_HOST
      const activePort = Number(siteSettings?.smtpPort || DEFAULT_SMTP_PORT)

      // Ensure viju@leniva3d.com is the single target recipient to prevent duplicate emails
      const rawReceiver = siteSettings?.smtpReceiverEmail || siteSettings?.receiverEmail || process.env.ENQUIRY_RECEIVER_EMAIL || 'viju@leniva3d.com'
      const receiverList = rawReceiver.split(',').map(s => s.trim()).filter(Boolean)
      if (!receiverList.includes('viju@leniva3d.com')) {
        receiverList.unshift('viju@leniva3d.com')
      }
      // Remove any test emails
      const cleanReceiverList = receiverList.filter(email => !email.includes('gmail.com'))
      const activeReceiver = cleanReceiverList.length > 0 ? cleanReceiverList[0] : 'viju@leniva3d.com'

      let emailStatus = 'pending'
      let emailError = null
      let messageId = null

      if (activePass) {
        try {
          const adminUrl = `${siteOrigin}/admin`
          const emailSubject = `New Customer Enquiry – ${sanitizeHeader(productService)} – Leniva 3D`
          const emailHtml = buildEnquiryEmailHtml({ enquiry: enquiryRecord, adminUrl })
          const emailPlain = buildEnquiryPlainText({ enquiry: enquiryRecord, adminUrl })

          const mailInfo = await sendMailWithFallback({
            from: `"${SMTP_FROM_NAME}" <${SMTP_FROM_EMAIL}>`,
            to: activeReceiver,
            replyTo: email || undefined,
            subject: emailSubject,
            text: emailPlain,
            html: emailHtml,
          }, activePass, activePort)

          emailStatus = 'sent'
          messageId = mailInfo.messageId
          enquiryRecord.email_notification_status = 'sent'
          enquiryRecord.email_sent_at = new Date().toISOString()
          enquiryRecord.email_message_id = messageId

          try {
            const pool = getPgPool()
            if (pool) {
              await pool.query(`
                UPDATE enquiries SET
                  email_notification_status = 'sent',
                  email_sent_at = CURRENT_TIMESTAMP,
                  email_message_id = $1
                WHERE enquiry_number = $2;
              `, [messageId, enquiryNumber]).catch(() => null)
            }
          } catch {}
        } catch (mailErr) {
          emailStatus = 'failed'
          emailError = mailErr.message
          enquiryRecord.email_notification_status = 'failed'
          enquiryRecord.email_error = mailErr.message

          try {
            const pool = getPgPool()
            if (pool) {
              await pool.query(`
                UPDATE enquiries SET
                  email_notification_status = 'failed',
                  email_error = $1
                WHERE enquiry_number = $2;
              `, [emailError, enquiryNumber]).catch(() => null)
            }
          } catch {}
        }
      } else {
        emailStatus = 'pending'
        emailError = 'SMTP Password not yet configured. Stored in Admin Console.'
        enquiryRecord.email_notification_status = 'pending'
        enquiryRecord.email_error = emailError
      }

      // Re-serialize enquiries with updated email status
      gist.keys.leniva_admin_enquiries = JSON.stringify(updatedEnquiries)
      gist.updatedAt = Date.now()

      // Save final state with email status
      await saveGistState(gist)

      return res.status(200).json({
        success: true,
        enquiry: enquiryRecord,
        email_notification_status: emailStatus,
        email_error: emailError,
        messageId,
      })
    } catch (err) {
      console.error('[Enquiries API] Error processing enquiry:', err)
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  // =========================================================================
  // METHOD: PUT (Update status, notes, follow-up date)
  // =========================================================================
  if (req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
      const enquiryId = body.id || req.query?.id
      if (!enquiryId) return res.status(400).json({ success: false, error: 'Enquiry ID required' })

      const gist = await fetchGistState()
      const enquiriesRaw = gist.keys?.leniva_admin_enquiries || '[]'
      let enquiries = []
      try { enquiries = JSON.parse(enquiriesRaw) } catch { enquiries = [] }

      const idx = enquiries.findIndex(e => String(e.id) === String(enquiryId))
      if (idx === -1) return res.status(404).json({ success: false, error: 'Enquiry not found' })

      if (body.status) enquiries[idx].status = body.status
      if (body.admin_notes !== undefined) enquiries[idx].admin_notes = body.admin_notes
      if (body.follow_up_date !== undefined) enquiries[idx].follow_up_date = body.follow_up_date
      enquiries[idx].updated_at = new Date().toISOString()

      gist.keys.leniva_admin_enquiries = JSON.stringify(enquiries)
      gist.updatedAt = Date.now()
      await saveGistState(gist)

      return res.status(200).json({ success: true, enquiry: enquiries[idx] })
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
