-- ====================================================================
-- LENIVA CAD SOLUTIONS - PostgreSQL Schema Definition
-- Database: leniv698 | User: leniv698 | Host: 127.0.0.1:5432 (localhost)
-- Production Domain: lenivacad.roiclients.co.in
-- ====================================================================

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) DEFAULT 'System Administrator',
    role VARCHAR(50) DEFAULT 'superadmin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PostgreSQL Storage Buckets (Direct binary/base64 media asset storage)
CREATE TABLE IF NOT EXISTS storage_files (
    id SERIAL PRIMARY KEY,
    bucket VARCHAR(100) NOT NULL DEFAULT 'media',
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes BIGINT NOT NULL,
    data_base64 TEXT NOT NULL,
    public_url VARCHAR(500),
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_storage_files_bucket ON storage_files(bucket);

-- 3. Product Categories
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    image TEXT,
    hero_banner TEXT,
    icon VARCHAR(100),
    key_benefits JSONB DEFAULT '[]'::jsonb,
    common_applications JSONB DEFAULT '[]'::jsonb,
    product_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products & Machines Catalog
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) DEFAULT 'Leniva',
    category VARCHAR(100) NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    technology VARCHAR(100),
    tagline VARCHAR(255),
    short_description TEXT,
    description TEXT,
    hero_image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    price NUMERIC(12, 2) DEFAULT 0,
    original_price NUMERIC(12, 2),
    rating NUMERIC(3, 2) DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 0,
    key_specs JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    applications JSONB DEFAULT '[]'::jsonb,
    materials JSONB DEFAULT '[]'::jsonb,
    in_stock BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_quote_based BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 5. Engineering & 3D Printing Services
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    description TEXT,
    image TEXT,
    badge VARCHAR(100),
    applications JSONB DEFAULT '[]'::jsonb,
    advantages JSONB DEFAULT '[]'::jsonb,
    workflow JSONB DEFAULT '[]'::jsonb,
    supported_materials JSONB DEFAULT '[]'::jsonb,
    technologies_used JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Engineering Materials
CREATE TABLE IF NOT EXISTS materials (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Engineering Blogs & Technical Articles
CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '5 min read',
    date VARCHAR(100),
    author JSONB DEFAULT '{"name": "Leniva Engineering Team", "role": "Additive Metrology"}'::jsonb,
    image TEXT,
    excerpt TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

-- 8. Customer Quote Requests / RFQs
CREATE TABLE IF NOT EXISTS quote_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_or_product VARCHAR(255),
    quantity VARCHAR(100),
    timeline VARCHAR(100),
    message TEXT,
    file_attachments JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quotes_status ON quote_requests(status);

-- 9. Contact Inquiries & Feedback
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);

-- 9.5. Centralized Customer Enquiries (All Website Forms & Automatic SMTP Tracking)
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    enquiry_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    city VARCHAR(100),
    enquiry_type VARCHAR(100) DEFAULT 'Product Enquiry',
    product_service_name VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    source_page VARCHAR(255),
    source_url TEXT,
    status VARCHAR(50) DEFAULT 'New',
    admin_notes TEXT,
    follow_up_date VARCHAR(50),
    email_notification_status VARCHAR(50) DEFAULT 'pending',
    email_error TEXT,
    email_message_id VARCHAR(255),
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);

-- 10. Orders (Store & Shop E-Commerce)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Direct Bank / Quotation',
    status VARCHAR(50) DEFAULT 'processing',
    tracking_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Site Configuration & CMS Blocks
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
