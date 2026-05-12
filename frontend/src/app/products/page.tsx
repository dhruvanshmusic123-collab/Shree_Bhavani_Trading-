"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, SlidersHorizontal, Package } from "lucide-react";
import { PRODUCT_CATEGORIES, BRANDS } from "@/lib/constants";
import type { Product, FilterParams } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { productApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const MATERIALS = ["PVC", "CPVC", "UPVC", "GI", "Brass", "PP", "HDPE", "PEX", "Rubber"];
const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt,desc" },
  { label: "Name A–Z", value: "name,asc" },
  { label: "Name Z–A", value: "name,desc" },
  { label: "Featured", value: "featured,desc" },
];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterParams>({
    search: searchParams.get("search") || "",
    categorySlug: searchParams.get("category") || "",
    brandSlug: searchParams.get("brand") || "",
    material: searchParams.get("material") || "",
    sort: "createdAt,desc",
    page: 0,
    size_per_page: 24,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll({ ...filters, page });
      setProducts(res.data.content);
      setTotal(res.data.totalElements);
    } catch {
      // Fallback to mock data when API is not connected
      setProducts(getMockProducts());
      setTotal(getMockProducts().length);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilter = (key: keyof FilterParams, value: string) => {
    setFilters((p) => ({ ...p, [key]: value }));
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      categorySlug: "",
      brandSlug: "",
      material: "",
      sort: "createdAt,desc",
      page: 0,
      size_per_page: 24,
    });
    setPage(0);
    router.push("/products");
  };

  const hasActiveFilters =
    !!filters.search || !!filters.categorySlug || !!filters.brandSlug || !!filters.material;

  return (
    <div className="min-h-screen bg-dark pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <p className="section-tag">
            <span className="w-6 h-px bg-brand-orange" />
            Product Catalog
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="heading-md text-white">
              {filters.categorySlug
                ? PRODUCT_CATEGORIES.find((c) => c.slug === filters.categorySlug)?.name || "Products"
                : "All Products"}
              {!loading && (
                <span className="ml-3 text-lg font-normal text-gray-500">({total})</span>
              )}
            </h1>
            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="input-field w-auto text-sm"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "w-64 flex-shrink-0 hidden lg:block"
            )}
          >
            <FilterSidebar
              filters={filters}
              onUpdate={updateFilter}
              onClear={clearFilters}
              hasActive={hasActiveFilters}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search products, brands, pipe sizes..."
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="input-field pl-9 text-sm"
                />
                {filters.search && (
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className={cn(
                  "lg:hidden btn-ghost px-3 gap-2",
                  hasActiveFilters && "border-brand-orange/50 text-brand-orange"
                )}
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                )}
              </button>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.categorySlug && (
                  <FilterChip
                    label={`Category: ${PRODUCT_CATEGORIES.find((c) => c.slug === filters.categorySlug)?.name}`}
                    onRemove={() => updateFilter("categorySlug", "")}
                  />
                )}
                {filters.brandSlug && (
                  <FilterChip
                    label={`Brand: ${BRANDS.find((b) => b.name.toLowerCase().replace(/\s/g, "-") === filters.brandSlug)?.name}`}
                    onRemove={() => updateFilter("brandSlug", "")}
                  />
                )}
                {filters.material && (
                  <FilterChip
                    label={`Material: ${filters.material}`}
                    onRemove={() => updateFilter("material", "")}
                  />
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-brand-orange transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(12)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your search or filters
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {total > (filters.size_per_page || 24) && (
              <div className="flex justify-center gap-2 mt-10">
                {[...Array(Math.ceil(total / (filters.size_per_page || 24)))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={cn(
                      "w-9 h-9 rounded-lg text-sm font-medium transition-all",
                      page === i
                        ? "bg-brand-orange text-white"
                        : "bg-dark-200 text-gray-400 hover:bg-dark-300"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-dark-100 z-50 overflow-y-auto p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onUpdate={updateFilter}
                onClear={clearFilters}
                hasActive={hasActiveFilters}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterSidebar({
  filters,
  onUpdate,
  onClear,
  hasActive,
}: {
  filters: FilterParams;
  onUpdate: (key: keyof FilterParams, value: string) => void;
  onClear: () => void;
  hasActive: boolean;
}) {
  return (
    <div className="space-y-6">
      {hasActive && (
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-brand-orange text-sm hover:underline"
        >
          <X size={14} />
          Clear all filters
        </button>
      )}

      {/* Category */}
      <FilterGroup title="Category">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={!filters.categorySlug}
              onChange={() => onUpdate("categorySlug", "")}
              className="accent-brand-orange"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              All Categories
            </span>
          </label>
          {PRODUCT_CATEGORIES.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={filters.categorySlug === cat.slug}
                onChange={() => onUpdate("categorySlug", cat.slug)}
                className="accent-brand-orange"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-gray-600">{cat.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Brand */}
      <FilterGroup title="Brand">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="brand"
              checked={!filters.brandSlug}
              onChange={() => onUpdate("brandSlug", "")}
              className="accent-brand-orange"
            />
            <span className="text-sm text-gray-300 group-hover:text-white">All Brands</span>
          </label>
          {BRANDS.map((brand) => {
            const slug = brand.name.toLowerCase().replace(/\s/g, "-");
            return (
              <label key={slug} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brandSlug === slug}
                  onChange={() => onUpdate("brandSlug", slug)}
                  className="accent-brand-orange"
                />
                <span className="text-sm text-gray-300 group-hover:text-white">{brand.name}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Material */}
      <FilterGroup title="Material">
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((mat) => (
            <button
              key={mat}
              onClick={() => onUpdate("material", filters.material === mat ? "" : mat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                filters.material === mat
                  ? "bg-brand-orange/10 border-brand-orange/50 text-brand-orange"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              )}
            >
              {mat}
            </button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
        <Filter size={12} className="text-brand-orange" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label?: string; onRemove: () => void }) {
  if (!label) return null;
  return (
    <span className="badge-orange flex items-center gap-1.5">
      {label}
      <button onClick={onRemove} className="hover:text-white">
        <X size={11} />
      </button>
    </span>
  );
}

// Mock data for when API is not connected
function getMockProducts(): Product[] {
  const categories = PRODUCT_CATEGORIES;
  const brands = BRANDS;
  return categories.flatMap((cat, ci) =>
    [1, 2, 3].map((n) => ({
      id: ci * 10 + n,
      name: `${cat.name} - Type ${n}`,
      slug: `${cat.slug}-type-${n}`,
      description: `Premium quality ${cat.name} for residential and commercial applications. Manufactured to IS standards.`,
      shortDescription: cat.description,
      categoryId: cat.id,
      category: { ...cat, imageUrl: "", productCount: cat.count, isActive: true, sortOrder: ci },
      brandId: brands[n % brands.length].id,
      brand: { ...brands[n % brands.length], slug: brands[n % brands.length].name.toLowerCase(), logoUrl: "", productCount: 10, isActive: true },
      images: [],
      specifications: [
        { label: "Standard", value: "IS 4985" },
        { label: "Pressure", value: "Class 4 / 6 / 10" },
      ],
      availableSizes: ['15mm', '20mm', '25mm', '32mm', '40mm', '50mm', '63mm', '75mm', '90mm', '110mm'],
      material: "UPVC",
      application: "Water Supply",
      isFeatured: n === 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );
}
