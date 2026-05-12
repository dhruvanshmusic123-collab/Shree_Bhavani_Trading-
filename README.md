# Shree Bhavani Trading Corporation — Full Stack Website

**Total Piping Solution** | Authorized Distributors since 1994

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Backend | Java 17, Spring Boot 3.3, Spring Security, JWT |
| Database | MySQL 8.0 |
| Deployment | Docker, Docker Compose, Nginx |

---

## Project Structure

```
shree-bhavani-website/
├── frontend/               # Next.js + TypeScript frontend
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   │   ├── page.tsx    # Home page
│   │   │   ├── about/      # About page
│   │   │   ├── products/   # Product catalog + detail
│   │   │   ├── contact/    # Contact page
│   │   │   ├── quote/      # Quote request
│   │   │   └── admin/      # Admin panel (login, dashboard, products)
│   │   ├── components/     # Reusable React components
│   │   ├── lib/            # API client, constants, utils
│   │   └── types/          # TypeScript interfaces
│   └── Dockerfile
├── backend/                # Spring Boot API
│   └── src/main/java/com/bhavani/trading/
│       ├── controller/     # REST controllers
│       ├── model/          # JPA entities
│       ├── repository/     # Spring Data repos
│       ├── security/       # JWT auth
│       ├── config/         # Security, CORS, data seeding
│       └── dto/            # Data transfer objects
├── database/
│   └── schema.sql          # Complete DB schema + seed data
├── nginx/
│   └── nginx.conf          # Reverse proxy + rate limiting
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Quick Start

### Option 1: Docker (Recommended)

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit .env with your values (especially JWT_SECRET in production)

# 3. Start all services
docker compose up -d

# 4. Access:
#   Website:   http://localhost
#   API:       http://localhost:8080/api
#   Admin:     http://localhost/admin
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `Bhavani@2024`
- ⚠️ Change immediately after first login!

---

### Option 2: Manual Setup

#### Prerequisites
- Node.js 20+
- Java 17+
- Maven 3.8+
- MySQL 8.0+

#### Database
```bash
mysql -u root -p < database/schema.sql
```

#### Backend
```bash
cd backend
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your DB credentials

mvn spring-boot:run
# API starts at http://localhost:8080/api
```

#### Frontend
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api

npm install
npm run dev
# App starts at http://localhost:3000
```

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (paginated, filterable) |
| GET | `/api/products/{slug}` | Get product by slug |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/categories` | Get all categories |
| GET | `/api/brands` | Get all brands |
| POST | `/api/inquiries` | Submit general inquiry |
| POST | `/api/inquiries/quote` | Submit quote request |

### Admin (JWT Required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/admin/dashboard/stats` | Dashboard statistics |
| GET/POST/PUT/DELETE | `/api/admin/products` | Manage products |
| GET/POST/PUT/DELETE | `/api/admin/categories` | Manage categories |
| GET/POST/PUT/DELETE | `/api/admin/inquiries` | Manage inquiries |

---

## Features

### Website
- ✅ Premium animated hero section
- ✅ About company section (Est. 1994)
- ✅ 16 brand showcase with marquee animation
- ✅ 21 product categories grid
- ✅ Product catalog with search & multi-filter
- ✅ Product detail pages with specifications
- ✅ Quote request form with dynamic item list
- ✅ Contact page with business info
- ✅ Testimonials carousel
- ✅ Animated statistics counter
- ✅ Floating WhatsApp + call button
- ✅ Sticky navigation with dropdown
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ SEO optimized (metadata, schema.org)
- ✅ Dark industrial theme (orange/blue accents)

### Admin Panel
- ✅ JWT-protected login
- ✅ Dashboard with statistics
- ✅ Product CRUD with image upload
- ✅ Category management
- ✅ Brand management
- ✅ Inquiry management with status tracking
- ✅ Featured product toggle

### Security
- ✅ JWT authentication
- ✅ BCrypt password hashing
- ✅ CORS protection
- ✅ Rate limiting (Nginx)
- ✅ Security headers
- ✅ Input validation
- ✅ SQL injection prevention (JPA)

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `MYSQL_ROOT_PASSWORD` | MySQL root password |
| `JWT_SECRET` | JWT signing secret (min 256 bits) |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code |

---

## Customization

### Add Products
1. Log in to `/admin`
2. Go to **Products → Add Product**
3. Fill in name, description, category, brand, sizes, specifications
4. Upload product images
5. Save and publish

### Update Contact Info
Edit `frontend/src/lib/constants.ts` → `COMPANY` object.

### Add Brands
Use the admin panel or add directly to the database.

---

## Production Deployment

1. Set strong `JWT_SECRET` (32+ random characters)
2. Change default admin password immediately
3. Configure proper domain in `CORS_ORIGINS`
4. Add SSL certificates to Nginx
5. Set `NEXT_PUBLIC_API_URL` to your production API domain
6. Configure email SMTP for inquiry notifications (optional)

---

## Contact

**Shree Bhavani Trading Corporation**
3,4,5,6 Centre Plaza, Near Milk Palace, Sattadhar Cross Road, Sola Road, Ghatlodia, Ahmedabad – 380061

📞 +91 98240 17613 | +91 75750 01652
✉️ bhavanitrading1994@gmail.com
