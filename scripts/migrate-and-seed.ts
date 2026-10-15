import pg from 'pg'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { productCategories } from '../src/data/categories'
import { products } from '../src/data/products'
import { services } from '../src/data/services'
import { materialsData } from '../src/data/materials'
import { blogPosts } from '../src/data/blogs'

const { Client } = pg

const client = new Client({
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'leniv698',
  password: process.env.PGPASSWORD || 'hhvu1A8IrRupKLdfEDhnsx9LQ',
  database: process.env.PGDATABASE || 'leniv698',
  ssl: false,
})

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_leniva_salt_2026').digest('hex')
}

async function run() {
  console.log('Connecting to PostgreSQL database...')
  await client.connect()
  console.log('Connected to PostgreSQL successfully!')

  // 1. Run Schema Definition
  const schemaPath = path.resolve('scripts/init-schema.sql')
  const schemaSql = fs.readFileSync(schemaPath, 'utf8')
  console.log('Executing database schema creation...')
  await client.query(schemaSql)
  console.log('All 12 tables and indexes created successfully.')

  // 2. Seed Admin User
  console.log('Seeding default administrator account...')
  const adminPasswordHash = hashPassword('Admin@Leniva2026!')
  await client.query(`
    INSERT INTO admin_users (username, email, password_hash, full_name, role)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (username) DO UPDATE 
    SET password_hash = EXCLUDED.password_hash,
        updated_at = CURRENT_TIMESTAMP;
  `, ['admin', 'admin@lenivacadsolution.in', adminPasswordHash, 'Leniva Master Admin', 'superadmin'])

  // 3. Seed Categories
  console.log(`Seeding ${productCategories.length} product categories...`)
  for (const cat of productCategories) {
    await client.query(`
      INSERT INTO categories (id, slug, title, subtitle, description, image, hero_banner, icon, key_benefits, common_applications, product_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          hero_banner = EXCLUDED.hero_banner,
          icon = EXCLUDED.icon,
          key_benefits = EXCLUDED.key_benefits,
          common_applications = EXCLUDED.common_applications,
          product_count = EXCLUDED.product_count;
    `, [
      cat.id,
      cat.slug,
      cat.title,
      cat.subtitle,
      cat.description,
      cat.image,
      cat.heroBanner,
      cat.icon,
      JSON.stringify(cat.keyBenefits || []),
      JSON.stringify(cat.commonApplications || []),
      cat.productCount || 0,
    ])
  }

  // 4. Seed Products
  console.log(`Seeding ${products.length} products & machines...`)
  for (const p of products) {
    await client.query(`
      INSERT INTO products (
        id, slug, name, brand, category, category_slug, technology, tagline,
        short_description, description, hero_image, images, price, original_price,
        rating, reviews_count, key_specs, specifications, features, applications,
        materials, in_stock, is_featured, is_quote_based
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          category = EXCLUDED.category,
          category_slug = EXCLUDED.category_slug,
          technology = EXCLUDED.technology,
          tagline = EXCLUDED.tagline,
          short_description = EXCLUDED.short_description,
          description = EXCLUDED.description,
          hero_image = EXCLUDED.hero_image,
          images = EXCLUDED.images,
          key_specs = EXCLUDED.key_specs,
          specifications = EXCLUDED.specifications,
          features = EXCLUDED.features,
          applications = EXCLUDED.applications,
          updated_at = CURRENT_TIMESTAMP;
    `, [
      p.id,
      p.slug,
      p.name,
      p.brand || 'Leniva',
      p.category,
      p.categorySlug,
      p.technology,
      p.tagline || '',
      p.shortDescription || '',
      p.description || '',
      p.heroImage || '',
      JSON.stringify(p.images || []),
      0, // quote based standard
      null,
      4.9,
      25,
      JSON.stringify(p.keySpecs || []),
      JSON.stringify(p.specifications || {}),
      JSON.stringify(p.features || []),
      JSON.stringify(p.applications || []),
      JSON.stringify(p.materials || []),
      true,
      true,
      true,
    ])
  }

  // 5. Seed Services
  console.log(`Seeding ${services.length} services...`)
  for (const s of services) {
    await client.query(`
      INSERT INTO services (
        id, slug, title, short_description, description, image, badge,
        applications, advantages, workflow, supported_materials, technologies_used
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          short_description = EXCLUDED.short_description,
          description = EXCLUDED.description,
          image = EXCLUDED.image,
          badge = EXCLUDED.badge,
          applications = EXCLUDED.applications,
          advantages = EXCLUDED.advantages,
          workflow = EXCLUDED.workflow,
          supported_materials = EXCLUDED.supported_materials,
          technologies_used = EXCLUDED.technologies_used;
    `, [
      s.id,
      s.slug,
      s.title,
      s.shortDescription || '',
      s.description || '',
      s.image || '',
      s.badge || '',
      JSON.stringify(s.applications || []),
      JSON.stringify(s.advantages || []),
      JSON.stringify(s.workflow || []),
      JSON.stringify(s.supportedMaterials || []),
      JSON.stringify(s.technologiesUsed || []),
    ])
  }

  // 6. Seed Materials
  console.log(`Seeding ${materialsData.length} material categories...`)
  for (const m of materialsData) {
    await client.query(`
      INSERT INTO materials (id, title, category, description, items)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          items = EXCLUDED.items;
    `, [
      m.id,
      m.title,
      m.category,
      m.description,
      JSON.stringify(m.items || []),
    ])
  }

  // 7. Seed Blogs
  console.log(`Seeding ${blogPosts.length} technical blog articles...`)
  for (const b of blogPosts) {
    await client.query(`
      INSERT INTO blogs (
        id, slug, title, category, read_time, date, author, image, excerpt, tags, content, published
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          category = EXCLUDED.category,
          read_time = EXCLUDED.read_time,
          date = EXCLUDED.date,
          author = EXCLUDED.author,
          image = EXCLUDED.image,
          excerpt = EXCLUDED.excerpt,
          tags = EXCLUDED.tags,
          content = EXCLUDED.content,
          published = EXCLUDED.published,
          updated_at = CURRENT_TIMESTAMP;
    `, [
      b.id,
      b.slug,
      b.title,
      b.category,
      b.readTime || '5 min read',
      b.date || 'March 2026',
      JSON.stringify(b.author || { name: 'Leniva Technical Team', role: 'Additive Engineering' }),
      b.image,
      b.excerpt,
      JSON.stringify(b.tags || []),
      b.content,
      true,
    ])
  }

  // 8. Seed Sample PostgreSQL Storage Buckets (Storage File Records)
  console.log('Seeding PostgreSQL storage bucket assets...')
  await client.query(`
    INSERT INTO storage_files (bucket, file_name, mime_type, size_bytes, data_base64, public_url, description)
    VALUES 
    (
      'media', 
      'leniva-logo.png', 
      'image/png', 
      12400, 
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 
      '/api/storage/media/leniva-logo.png', 
      'Leniva CAD Solutions Official Brandmark'
    ),
    (
      'catalogs', 
      'Leniva_3D_Printers_Master_Brochure_2026.pdf', 
      'application/pdf', 
      245000, 
      'JVBERi0xLjQKJcTl8uXr...', 
      '/api/storage/catalogs/Leniva_3D_Printers_Master_Brochure_2026.pdf', 
      'Full Equipment Product Brochure and Technical Tolerances 2026'
    )
    ON CONFLICT DO NOTHING;
  `)

  // 9. Seed Sample Quote Request & Contact Message for Admin Review
  console.log('Seeding sample quote request & contact message for Admin verification...')
  await client.query(`
    INSERT INTO quote_requests (name, email, phone, company, service_or_product, quantity, timeline, message, status)
    VALUES 
    (
      'Vikramaditya Sharma',
      'v.sharma@precisioneng.in',
      '+91 98765 43210',
      'Precision Aerospace Components Ltd.',
      '3DeVOK MQ Optical 3D Scanner & Reverse Engineering',
      '1 Unit + Onsite Metrology Training',
      'Within 2-3 Weeks',
      'We require a high-precision blue light inspection scanner with turntable for aero turbine blade reverse engineering and CMM inspection.',
      'pending'
    ),
    (
      'Dr. Ananya Sen',
      'ananya.sen@iitb.ac.in',
      '+91 98450 11223',
      'IIT Bombay Central Metrology Lab',
      'Industrial FDM 3D Printers (Pratham X)',
      '2 Units',
      'Immediate Procurement (Q1 Academic Grant)',
      'Looking for 1000mm build volume printer capable of printing continuous Carbon Fiber PA12.',
      'in_review'
    );
  `)

  await client.query(`
    INSERT INTO contact_messages (name, email, phone, subject, message, status)
    VALUES 
    (
      'Suresh K. Patel',
      'suresh.patel@automotive-jigs.com',
      '+91 94220 99887',
      'Inquiry regarding contract 3D scanning in Pune',
      'We have 15 injection-molded automotive dashboard components that need scan-to-CAD inspection reports.',
      'unread'
    );
  `)

  // 10. Seed Initial Site Settings
  await client.query(`
    INSERT INTO site_settings (key, value)
    VALUES 
    ('general_info', '{"companyName": "Leniva CAD Solutions", "phone": "+91 98441 16476", "secondaryPhone": "+91 96069 84210", "email": "viju@leniva3d.com", "whatsapp": "+91 98441 16476", "address": "No. 106, 1st Floor, Carmel Complex, 1/7, Geddalahalli, Hennur Main Road, Kothanur Post, Bengaluru, Karnataka - 560077", "workingHours": "Monday – Friday: 9:30 AM – 6:00 PM | Saturday: 9:30 AM – 1:30 PM"}'::jsonb),
    ('features_enabled', '{"quotes": true, "shop": true, "blog": true, "scanners": true, "onlineUploads": true}'::jsonb)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
  `)

  // 11. Print Verification Table
  console.log('\n=============================================')
  console.log('VERIFYING DATABASE TABLES & RECORD COUNTS:')
  console.log('=============================================')
  const countQueries = [
    'admin_users',
    'storage_files',
    'categories',
    'products',
    'services',
    'materials',
    'blogs',
    'quote_requests',
    'contact_messages',
    'orders',
    'subscribers',
    'site_settings',
  ]

  for (const t of countQueries) {
    const res = await client.query(`SELECT COUNT(*) FROM ${t}`)
    console.log(`Table: ${t.padEnd(20)} -> ${res.rows[0].count} records`)
  }

  await client.end()
  console.log('=============================================')
  console.log('Migration & database seeding completed successfully!')
}

run().catch(err => {
  console.error('Fatal migration error:', err)
  process.exit(1)
})
