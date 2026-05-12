export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: number;
  category: Category;
  brandId: number;
  brand: Brand;
  images: string[];
  specifications: Specification[];
  availableSizes: string[];
  material: string;
  application: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  isActive: boolean;
  productCount: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  productIds: number[];
  products?: Product[];
  status: "PENDING" | "REVIEWED" | "RESPONDED" | "CLOSED";
  type: "GENERAL" | "QUOTE" | "PRODUCT";
  createdAt: string;
  updatedAt: string;
  requirementFile?: string;
}

export interface QuoteItem {
  productId: number;
  productName: string;
  quantity: string;
  unit: string;
  specifications?: string;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  deliveryAddress: string;
  items: QuoteItem[];
  additionalNotes: string;
  requirementFile?: File;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MANAGER";
  lastLogin: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  totalInquiries: number;
  pendingInquiries: number;
  newInquiriesToday: number;
  featuredProducts: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface FilterParams {
  search?: string;
  categorySlug?: string;
  brandSlug?: string;
  material?: string;
  application?: string;
  size?: string;
  page?: number;
  size_per_page?: number;
  sort?: string;
}

export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  designation: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export interface ProjectCase {
  id: number;
  title: string;
  description: string;
  location: string;
  year: number;
  imageUrl: string;
  categoriesUsed: string[];
}
