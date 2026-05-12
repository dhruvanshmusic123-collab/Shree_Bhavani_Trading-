import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL } from "./constants";
import type {
  Product,
  Category,
  Brand,
  Inquiry,
  QuoteRequest,
  PaginatedResponse,
  ApiResponse,
  FilterParams,
  DashboardStats,
  AdminUser,
} from "@/types";

// Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor - attach JWT
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("bhavani_admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("bhavani_admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// ── PUBLIC APIs ──

export const productApi = {
  getAll: (params?: FilterParams): Promise<AxiosResponse<PaginatedResponse<Product>>> =>
    api.get("/products", { params }),
  getBySlug: (slug: string): Promise<AxiosResponse<ApiResponse<Product>>> =>
    api.get(`/products/${slug}`),
  getFeatured: (): Promise<AxiosResponse<ApiResponse<Product[]>>> =>
    api.get("/products/featured"),
  getByCategory: (categorySlug: string, params?: FilterParams) =>
    api.get(`/products/category/${categorySlug}`, { params }),
  getByBrand: (brandSlug: string, params?: FilterParams) =>
    api.get(`/products/brand/${brandSlug}`, { params }),
  search: (query: string, params?: FilterParams) =>
    api.get("/products/search", { params: { q: query, ...params } }),
  getRelated: (slug: string): Promise<AxiosResponse<ApiResponse<Product[]>>> =>
    api.get(`/products/${slug}/related`),
};

export const categoryApi = {
  getAll: (): Promise<AxiosResponse<ApiResponse<Category[]>>> =>
    api.get("/categories"),
  getBySlug: (slug: string): Promise<AxiosResponse<ApiResponse<Category>>> =>
    api.get(`/categories/${slug}`),
};

export const brandApi = {
  getAll: (): Promise<AxiosResponse<ApiResponse<Brand[]>>> =>
    api.get("/brands"),
  getBySlug: (slug: string): Promise<AxiosResponse<ApiResponse<Brand>>> =>
    api.get(`/brands/${slug}`),
};

export const inquiryApi = {
  submit: (data: Inquiry): Promise<AxiosResponse<ApiResponse<Inquiry>>> =>
    api.post("/inquiries", data),
  submitQuote: (data: QuoteRequest): Promise<AxiosResponse<ApiResponse<Inquiry>>> => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.requirementFile) formData.append("file", data.requirementFile);
    return api.post("/inquiries/quote", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// ── ADMIN APIs ──

export const authApi = {
  login: (username: string, password: string): Promise<AxiosResponse<ApiResponse<{ token: string; user: AdminUser }>>> =>
    api.post("/auth/login", { username, password }),
  logout: () => api.post("/auth/logout"),
  me: (): Promise<AxiosResponse<ApiResponse<AdminUser>>> => api.get("/auth/me"),
  refreshToken: () => api.post("/auth/refresh"),
};

export const adminProductApi = {
  getAll: (params?: FilterParams) => api.get("/admin/products", { params }),
  create: (data: FormData) =>
    api.post("/admin/products", data, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id: number, data: FormData) =>
    api.put(`/admin/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  delete: (id: number) => api.delete(`/admin/products/${id}`),
  toggleFeatured: (id: number) => api.patch(`/admin/products/${id}/featured`),
  toggleActive: (id: number) => api.patch(`/admin/products/${id}/active`),
};

export const adminCategoryApi = {
  getAll: () => api.get("/admin/categories"),
  create: (data: Partial<Category>) => api.post("/admin/categories", data),
  update: (id: number, data: Partial<Category>) => api.put(`/admin/categories/${id}`, data),
  delete: (id: number) => api.delete(`/admin/categories/${id}`),
};

export const adminBrandApi = {
  getAll: () => api.get("/admin/brands"),
  create: (data: FormData) =>
    api.post("/admin/brands", data, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id: number, data: FormData) =>
    api.put(`/admin/brands/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  delete: (id: number) => api.delete(`/admin/brands/${id}`),
};

export const adminInquiryApi = {
  getAll: (params?: { status?: string; page?: number }) =>
    api.get("/admin/inquiries", { params }),
  getById: (id: number) => api.get(`/admin/inquiries/${id}`),
  updateStatus: (id: number, status: string) =>
    api.patch(`/admin/inquiries/${id}/status`, { status }),
  delete: (id: number) => api.delete(`/admin/inquiries/${id}`),
};

export const adminDashboardApi = {
  getStats: (): Promise<AxiosResponse<ApiResponse<DashboardStats>>> =>
    api.get("/admin/dashboard/stats"),
  getRecentInquiries: () => api.get("/admin/dashboard/recent-inquiries"),
};

export default api;
