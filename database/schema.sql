-- ═══════════════════════════════════════════════════════════
--  Shree Bhavani Trading Corporation – Database Schema
--  MySQL 8.0+
-- ═══════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS bhavani_trading
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE bhavani_trading;

-- ── Admin Users ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    email       VARCHAR(150) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('SUPER_ADMIN', 'ADMIN', 'MANAGER') NOT NULL DEFAULT 'ADMIN',
    is_active   TINYINT(1) NOT NULL DEFAULT 1,
    last_login  DATETIME,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Categories ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    icon        VARCHAR(10),
    image_url   VARCHAR(500),
    sort_order  INT NOT NULL DEFAULT 0,
    is_active   TINYINT(1) NOT NULL DEFAULT 1,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categories_slug (slug),
    INDEX idx_categories_active_order (is_active, sort_order)
);

-- ── Brands ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(120) NOT NULL UNIQUE,
    logo_url    VARCHAR(500),
    description TEXT,
    is_active   TINYINT(1) NOT NULL DEFAULT 1,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_brands_slug (slug)
);

-- ── Products ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(200) NOT NULL,
    slug                VARCHAR(250) NOT NULL UNIQUE,
    description         LONGTEXT,
    short_description   TEXT,
    category_id         BIGINT UNSIGNED,
    brand_id            BIGINT UNSIGNED,
    images              TEXT COMMENT 'JSON array of image paths',
    specifications      TEXT COMMENT 'JSON array of {label, value}',
    available_sizes     TEXT COMMENT 'JSON array of size strings',
    material            VARCHAR(100),
    application         VARCHAR(200),
    is_featured         TINYINT(1) NOT NULL DEFAULT 0,
    is_active           TINYINT(1) NOT NULL DEFAULT 1,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_products_brand    FOREIGN KEY (brand_id)    REFERENCES brands(id)     ON DELETE SET NULL,
    INDEX idx_product_slug      (slug),
    INDEX idx_product_category  (category_id),
    INDEX idx_product_brand     (brand_id),
    INDEX idx_product_active    (is_active),
    INDEX idx_product_featured  (is_featured),
    FULLTEXT INDEX ft_product_search (name, description, short_description)
);

-- ── Inquiries ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
    id                      BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                    VARCHAR(150) NOT NULL,
    email                   VARCHAR(150) NOT NULL,
    phone                   VARCHAR(20)  NOT NULL,
    company                 VARCHAR(200),
    message                 TEXT,
    items_json              TEXT COMMENT 'JSON array of quote items',
    delivery_address        TEXT,
    requirement_file_path   VARCHAR(500),
    additional_notes        TEXT,
    status                  ENUM('PENDING', 'REVIEWED', 'RESPONDED', 'CLOSED') NOT NULL DEFAULT 'PENDING',
    type                    ENUM('GENERAL', 'QUOTE', 'PRODUCT') NOT NULL DEFAULT 'GENERAL',
    created_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_inquiry_status     (status),
    INDEX idx_inquiry_created_at (created_at DESC)
);

-- ═══════════════════════════════════════════════════════════
-- Seed Data
-- ═══════════════════════════════════════════════════════════

-- Default admin (password: Bhavani@2024  — bcrypt hash)
INSERT IGNORE INTO admin_users (username, email, password, role) VALUES
('admin', 'bhavanitrading1994@gmail.com',
 '$2a$10$5RMXvX7Z7xqY5K5mPcB5tOjE8LQK3NzjGYYT3KxNOl5gImhNUKo9m',
 'SUPER_ADMIN');

-- Categories
INSERT IGNORE INTO categories (name, slug, icon, description, sort_order) VALUES
('UPVC Pipes & Fittings',     'upvc-pipes-fittings',      '🔧', 'High-pressure UPVC pipes for water supply and industrial use', 1),
('CPVC Pipes & Fittings',     'cpvc-pipes-fittings',      '🌡️', 'Hot & cold water CPVC piping systems',                        2),
('PVC Agri Pipes',            'pvc-agri-pipes',           '🌾', 'Agricultural irrigation PVC pipe solutions',                   3),
('SWR Pipes & Fittings',      'swr-pipes-fittings',       '🏗️', 'Soil, waste & rainwater drainage systems',                    4),
('Underground Drainage',      'underground-drainage',     '⬇️', 'Underground structured wall pipes & chambers',                 5),
('Fire Sprinkler Systems',    'fire-sprinkler-systems',   '🔥', 'Certified fire protection sprinkler systems',                  6),
('PP Low Noise Pipes',        'pp-low-noise-pipes',       '🔇', 'Polypropylene low-noise drainage systems',                    7),
('PEX Pipes',                 'pex-pipes',                '💧', 'Cross-linked polyethylene flexible piping',                   8),
('Brass Fittings',            'brass-fittings',           '🔩', 'Premium brass pipe fittings & connectors',                    9),
('Ball Valves',               'ball-valves',              '🚰', 'Industrial & domestic ball valves',                           10),
('Butterfly Valves',          'butterfly-valves',         '🦋', 'Flow control butterfly valves',                               11),
('Check Valves',              'check-valves',             '✅', 'Non-return check valves',                                     12),
('Plumbing Accessories',      'plumbing-accessories',     '🔨', 'Complete plumbing hardware accessories',                      13),
('Bathroom Fittings',         'bathroom-fittings',        '🚿', 'Designer bathroom fittings & fixtures',                       14),
('Waterproofing Chemicals',   'waterproofing-chemicals',  '🧪', 'Construction waterproofing solutions',                        15),
('Adhesives & Sealants',      'adhesives-sealants',       '🔐', 'Industrial adhesives and pipe sealants',                      16),
('Water Tanks',               'water-tanks',              '🫙', 'Overhead & underground storage tanks',                        17),
('Manhole Covers',            'manhole-covers',           '🔲', 'Heavy-duty manhole covers & frames',                          18),
('Drainage Products',         'drainage-products',        '🌊', 'Channel drains & drainage accessories',                       19),
('Pipe Clamps',               'pipe-clamps',              '🔗', 'Heavy-duty pipe clamps & supports',                           20),
('Industrial Valves',         'industrial-valves',        '⚙️', 'Gate, globe & pressure relief valves',                       21);

-- Brands
INSERT IGNORE INTO brands (name, slug, description) VALUES
('Supreme',    'supreme',    'India''s leading polymer products manufacturer'),
('Lifeline',   'lifeline',   'Premium plumbing systems'),
('Aqua Gold',  'aqua-gold',  'Quality water management solutions'),
('Formcore',   'formcore',   'Industrial piping solutions'),
('FlameGuard', 'flameguard', 'Fire protection systems'),
('Serene',     'serene',     'Sanitary and bathroom solutions'),
('e-Lite',     'e-lite',     'Modern electrical conduit systems'),
('NeoSeal',    'neoseal',    'Advanced sealing solutions'),
('Zoloto',     'zoloto',     'Premium valve manufacturer'),
('RBI',        'rbi',        'Reliable brass fittings'),
('Indiano',    'indiano',    'Agricultural piping systems'),
('Somex',      'somex',      'Drainage solutions'),
('Felice',     'felice',     'Bathroom accessories'),
('Thor',       'thor',       'Industrial strength fittings'),
('Dutron',     'dutron',     'UPVC pipe systems'),
('Simtex',     'simtex',     'Waterproofing solutions');
